define(['jquery', 'js-graph', 'bluebird'], function ($, JsGraph, P) {
	'use strict';

	function processOperations(obj, targetObj) {
		$.each(obj, (key, value)=> {
			var match = key.match(/^(\w+)\s+(\w+)$/);
			if (match) {
				targetObj[match[2]] = {
					operation: match[1],
					value: value
				};
			}
		});
	}

	return function pluginHandler() {
		//
		// keep track of plugins and their partial application order
		//
		var _plugins = new JsGraph();
		var _dynamicFeatureConfiguration = {};
		var _featureConfigurationCache = {};
		var _pluginPredicates = {};

		//
		// the 'plugin' function returned from this module;
		// it is called by plugin-writers, and can take an array
		//
		function registerPlugin(plugin) {
			if ($.isArray(plugin)) {
				// process each plugin separately
				$.each(plugin, (__, subConfig)=>{ registerPlugin(subConfig) });
			} else if ($.isPlainObject(plugin)) {
				// register a single plugin
				registerSinglePlugin(plugin);
			} else if (typeof plugin === 'string') {
				// register a single plugin
				addPluginConditionDisjunct(plugin, true);
			}
		}

		//
		// to process a condition disjunct for a plugin
		//
		function addPluginConditionDisjunct(name, condition) {
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
			if ($.isUndefined(condition)) { // do not load a plugin by default
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

		function registerSinglePlugin(plugin) {
			//
			// perform sanity checks
			//
			$.assert(typeof plugin.name === 'string',
				"An ApiNATOMY plugin should have a name.");

			//
			// normalize plugin configuration
			//
			if (!$.isArray(plugin.after)) { plugin.after = [] }

			//
			// process the plugin condition
			//
			addPluginConditionDisjunct(plugin.name, plugin.if);
			Object.defineProperty(_dynamicFeatureConfiguration, plugin.name, {
				get() { return _pluginPredicates[plugin.name](_dynamicFeatureConfiguration) }
			});

			//
			// register the plugin
			//
			_plugins.addVertex(plugin.name, plugin);
			$.each(plugin.after, (__, v) => { _plugins.createEdge(v, plugin.name) });
			try { _plugins.topologically(()=> {}) } catch (cycleError) {
				throw new Error(`The plugin application order has a cycle: ${cycleError.cycle}`);
			}

			//
			// pre-process operations (for now, only 'modify' for the top-level)
			//
			plugin._operations = {};
			processOperations(plugin, plugin._operations);
		}

		//
		// apply all relevant plugins to a given object
		//
		registerPlugin._apply = function _apply(component, obj) {
			_plugins.topologically((pluginName, plugin) => {
				// if the plugin doesn't exist, return
				if (!plugin) { return }

				// if the plugin is not selected, return
				if (!_dynamicFeatureConfiguration[pluginName]) { return }

				//
				// get changes targeted at this component
				//
				var op = plugin._operations[component];
				if (!op) { return }

				//
				// we only support 'modify' for the top level for now
				//
				$.assert(op.operation === 'modify',
					`Any top-level operation on '${component}' must be 'modify'.`);

				//
				// perform the sub-operations
				//
				var subOps = {};
				processOperations(op.value, subOps);
				$.each(subOps, (field, subOp) => {
					switch (subOp.operation) {
						//
						// add a new key/value pair to the object
						//
						case 'add': {
							$.assert($.isUndefined(obj[field]),
								`The operation 'add ${field}' expects ${component}.${field} to first be undefined.`);
							obj[field] = subOp.value;
						} break;

						//
						// remove an existing key/value pair from the object
						//
						case 'remove': {
							$.assert($.isDefined(obj[field]),
								`The operation 'remove ${field}' expects ${component}.${field} to first be defined.`);
							delete obj[field];
						} break;

						//
						// replace an existing key/value pair in the object
						//
						case 'replace': {
							$.assert($.isDefined(obj[field]),
								`The operation 'replace ${field}' expects ${component}.${field} to first be defined.`);
							obj[field] = subOp.value;
						} break;

						//
						// insert a set of statements into an existing method of the object
						//
						case 'insert': {
							$.assert($.isUndefined(obj[field]) || $.isFunction(obj[field]),
								`The operation 'insert ${field}' expects ${component}.${field} to be undefined or a function.`);
							var restOfFunction = obj[field];
							obj[field] = function (...args) {
								restOfFunction.apply(this, args);
								return subOp.value.apply(this, args);
							};
						} break;

						//
						// have a set of statements executed after an existing
						// (possibly asynchronous) method of the object
						//
						case 'after': {
							$.assert($.isUndefined(obj[field]) || $.isFunction(obj[field]),
								`The operation 'after ${field}' expects ${component}.${field} to be undefined or a function.`);
							var beforeFunction = obj[field];
							obj[field] = function (...args) {
								return P.resolve(beforeFunction.apply(this, args)).then(function (promiseValue) {
									return subOp.value.apply(this, [promiseValue].concat(args));
								}.bind(this));
							};
						} break;
					}
				});
			});
		};

		return registerPlugin;
	};
});
