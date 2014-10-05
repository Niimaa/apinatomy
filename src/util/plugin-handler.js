define(['jquery', 'js-graph', 'bluebird', './traverse-dag.js', './misc.js'], function ($, JsGraph, P, traverse, U) {
	'use strict';

	//
	// a utility function to extract operations from a plugin
	//
	function processOperations(obj) {
		var result = {};
		$.each(obj, (key, value)=> {
			var match = key.match(/^(\w+)\s+(\w+)$/);
			if (match) {
				result[match[2]] = {
					operation: match[1],
					value: value
				};
			}
		});
		return result;
	}

	//
	// define the PluginHandler class
	//
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

		function _registerSinglePlugin(plugin) {
			//
			// perform sanity checks
			//
			U.assert(typeof plugin.name === 'string',
				"An ApiNATOMY plugin should have a name.");

			//
			// normalize plugin configuration
			//
			if (!$.isArray(plugin.after)) { plugin.after = [] }

			//
			// process the plugin condition
			//
			_addPluginConditionDisjunct(plugin.name, plugin.if);
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
			plugin._operations = processOperations(plugin);
		}

		////////////////////////
		//// Public Methods ////
		////////////////////////

		//
		// the 'plugin' function ultimately returned from this module;
		// it is called by plugin-writers with an object, and by plugin
		// users to 'select' plugins by name, and can take an array
		//
		this.register = function register(plugin) {
			if ($.isArray(plugin)) {
				// process each plugin separately
				$.each(plugin, (__, subConfig)=>{ this.register(subConfig) });
			} else if ($.isPlainObject(plugin)) {
				// register a single plugin
				_registerSinglePlugin(plugin);
			} else if (typeof plugin === 'string') {
				// register a single plugin
				_addPluginConditionDisjunct(plugin, true);
			}
		};

		//
		// apply all relevant plugins to a given object
		//
		this.apply = function apply(component, obj) {
			return traverse(_plugins, (pluginName, plugin) => {
				//
				// if the plugin doesn't exist, throw an error
				//
				if (!plugin) { throw new Error(`I don't know the '${pluginName}' plugin.`) }

				//
				// if the plugin is not selected, return
				//
				if (!_dynamicFeatureConfiguration[pluginName]) { return }

				//
				// get changes targeted at this component
				//
				var op = plugin._operations[component];
				if (!op) { return }

				//
				// we only support 'modify' for the top level for now
				//
				U.assert(op.operation === 'modify',
					`Any top-level operation on '${component}' must be 'modify'.`);

				//
				// perform the sub-operations
				//
				var subOps = processOperations(op.value);
				$.each(subOps, (field, subOp) => {
					switch (subOp.operation) {

						//
						// add a new key/value pair to the object
						//
						case 'add': {///////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isUndefined(obj[field]),
								`The operation 'add ${field}' expects ${component}.${field} to first be undefined.`);

							obj[field] = subOp.value;

						} break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// remove an existing key/value pair from the object
						//
						case 'remove': {////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isDefined(obj[field]),
								`The operation 'remove ${field}' expects ${component}.${field} to first be defined.`);

							delete obj[field];

						} break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// replace an existing key/value pair in the object
						//
						case 'replace': {///////////////////////////////////////////////////////////////////////////////

							U.assert(U.isDefined(obj[field]),
								`The operation 'replace ${field}' expects ${component}.${field} to first be defined.`);

							obj[field] = subOp.value;

						} break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// insert a set of statements into an existing method of the object
						//
						case 'insert': {////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isUndefined(obj[field]) || $.isFunction(obj[field]),
								`The operation 'insert ${field}' expects ${component}.${field} to be undefined or a function.`);

							var restOfFunction = obj[field];
							obj[field] = function (...args) {
								restOfFunction.apply(this, args);
								return subOp.value.apply(this, args);
							};

						} break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// have a set of statements executed after an existing
						// (possibly asynchronous) method of the object
						//
						case 'after': {/////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isUndefined(obj[field]) || $.isFunction(obj[field]),
								`The operation 'after ${field}' expects ${component}.${field} to be undefined or a function.`);

							var beforeFunction = obj[field];
							obj[field] = function (...args) {
								return P.resolve(beforeFunction.apply(this, args)).then(function (promiseValue) {
									return subOp.value.apply(this, [promiseValue].concat(args));
								}.bind(this));
							};

						} break;////////////////////////////////////////////////////////////////////////////////////////
					}
				});
			});
		};
	};
});
