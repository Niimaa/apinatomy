define(['jquery', 'js-graph', 'bluebird', './traverse-dag.js', './misc.js', './delta.js'], function ($, JsGraph, P, traverse, U, Delta) {
	'use strict';

	return function PluginHandler() {

		///////////////////////////
		//// Private Variables ////
		///////////////////////////

		//
		// keep track of plugins and their partial application order
		//
		var _plugins = new JsGraph();
		var _dynamicFeatureConfiguration = {};
		var _featureConfigurationCache = {};
		var _pluginPredicates = {};

		///////////////////////////
		//// Private Functions ////
		///////////////////////////

		//
		// to process a condition disjunct for a plugin
		//
		function _addPluginConditionDisjunct(name, condition) {
			//
			// to accumulate condition disjuncts into runnable predicates
			//
			function accumulate(lazyCondition) {
				var oldPredicate = _pluginPredicates[name];
				_pluginPredicates[name] = (context) => {
					if (_featureConfigurationCache[name]) { return true }
					_featureConfigurationCache[name] =
							(oldPredicate && oldPredicate(context)) ||
							lazyCondition(context);
					return _featureConfigurationCache[name];
				};
			}

			//
			// interpret the given condition by type
			//
			if (U.isUndefined(condition)) { // do not load a plugin by default
				accumulate(() => false);
			} else if (typeof condition === 'string') { // a plugin name
				accumulate(() => _dynamicFeatureConfiguration[condition]);
			} else if ($.isArray(condition)) { // a conjunction
				accumulate(() => condition.every((conjunct) => _dynamicFeatureConfiguration[conjunct]));
			} else if ($.isFunction(condition)) { // a predicate
				accumulate(() => condition(_dynamicFeatureConfiguration));
			} else { // a literal Boolean value
				accumulate(() => !!condition);
			}
		}

		//
		// to process a condition disjunct for a plugin
		//
		function _addPluginRequirements(pluginName, otherPlugins) {
			if (U.isUndefined(otherPlugins)) { return }

			//
			// perform sanity checks
			//
			U.assert($.isArray(otherPlugins),
					`The 'requires' clause of a plugin should be an array of plugin names.`);

			//
			// add this plugin as a loading condition for the other specified plugins
			//
			otherPlugins.forEach((otherPlugin) => {
				_addPluginConditionDisjunct(otherPlugin, pluginName);
			});
		}

		////////////////////////
		//// Public Methods ////
		////////////////////////

		//
		// the function to be called by plugin writers,
		// containing (part of) a new plugin to be registered
		//
		this.register = function register(plugin) {
			//
			// perform sanity checks
			//
			U.assert($.isPlainObject(plugin),
					`An ApiNATOMY plugin should be a plain object.`);
			U.assert(typeof plugin.name === 'string',
					`An ApiNATOMY plugin should have a name.`);

			//// normalize plugin configuration
			if (!$.isArray(plugin.after)) { plugin.after = [] }

			//
			// process the plugin condition
			//
			_addPluginConditionDisjunct(plugin.name, plugin.if);
			Object.defineProperty(_dynamicFeatureConfiguration, plugin.name, {
				get() { return _pluginPredicates[plugin.name](_dynamicFeatureConfiguration) }
			});

			//// process the plugin requirements
			_addPluginRequirements(plugin.name, plugin.require);

			//
			// register the plugin
			//
			_plugins.addVertex(plugin.name, plugin);
			$.each(plugin.after, (__, v) => { _plugins.createEdge(v, plugin.name) });
			if (_plugins.hasCycle()) { throw new Error(`The plugin application order has a cycle.`) }

			//// pre-process operations (for now, only 'modify' for the top-level)
			plugin.delta = new Delta.Modify(plugin);

			//// return an object that can be used to add additional operations
			return plugin.delta;
		};

		//
		// register (part of) a new plugin
		//
		this.select = function select(pluginNames) {

			//// accept an array of plugin names, rather than just one name
			if ($.isArray(pluginNames)) { pluginNames.forEach(select) }

			//// process single plugin name by making its condition 'true'
			_addPluginConditionDisjunct(pluginNames, true);

		};

		//
		// apply all relevant plugins to a given object
		//
		this.apply = function apply(obj) {
			return traverse(_plugins, (pluginName, plugin) => {

				//// if the plugin is not selected, return
				if (!_dynamicFeatureConfiguration[pluginName]) { return }

				//// if the plugin doesn't exist, throw an error
				U.assert(plugin, `I don't know the '${pluginName}' plugin.`);

				//// apply the delta
				$.extend(obj, plugin.delta.apply(obj));

			});
		};
	};
});
