define(['jquery', 'js-graph', 'bluebird', './traverse-dag.js', './misc.js'], function ($, JsGraph, P, traverse, U) {
	'use strict';

	//
	// a utility function to extract operations from a plugin
	//
	function _processInObjectOperations(obj) {
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


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//
	// methods for the available operation-types in a ModifyDelta
	//
	var OPERATION_METHODS = {
		modify(property, deltaDescription) {
			return this.operations[property] = composedDelta(
					this.operations[property],
					new ModifyDelta({}, deltaDescription)
			);
		},
		add(property, value) {
			this._addOperation(property, new AddDelta(value));
			return this;
		},
		remove(property, __) {
			this._addOperation(property, new RemoveDelta());
			return this;
		},
		replace(property, value) {
			this._addOperation(property, new ReplaceDelta(value));
			return this;
		},
		forbid(property, __) {
			this._addOperation(property, new ForbidDelta());
			return this;
		}
	};

	//
	// the delta classes
	//
	function AddDelta(value) { this.value = value }
	function RemoveDelta() {}
	function ReplaceDelta(value) { this.value = value }
	function ForbidDelta() {}
	function ModifyDelta(operations, deltaDescription) {
		this.operations = operations;

		//
		// how to add an operation to this delta
		//
		this._addOperation = function _addOperation(property, leafDelta) {
			this.operations[property] = composedDelta(this.operations[property], leafDelta);
		};

		//
		// process possible delta description
		//
		deltaDescription = deltaDescription || {};
		$.each(deltaDescription, (key, value)=> {
			var match = key.match(/^(\w+)\s+(\w+)$/);
			if (match) {
				var operation = match[1];
				var property = match[2];
				U.assert(operation in OPERATION_METHODS,
						`I don't know the '${operation}' operation.`);
				this[operation](property, value);
			}
		});
	}
	$.extend(ModifyDelta.prototype, OPERATION_METHODS);


	//
	// how to compose deltas
	//
	function composedDelta(d1, d2) {

		if (U.isUndefined(d1)) { return d2 }
		if (U.isUndefined(d2)) { return d1 }

		function error(op1, op2) {
			var err = new Error(`Cannot follow a '${op1}' operation with a '${op2}' operation on the same property.`);
			err.op1 = op1;
			err.op2 = op2;
			return err;
		}

		function composeOpMaps(map1, map2) {
			var result = $.extend({}, map1);
			Object.keys(map2).forEach((prop) => {
				result = composedDelta(map1[prop], map2[prop]);
			});
			return result;
		}

		if (d1 instanceof AddDelta) {
			if (d2 instanceof AddDelta)     { throw error('modify', 'add') }
			if (d2 instanceof ReplaceDelta) { return new AddDelta(d2.value) }
			if (d2 instanceof ModifyDelta)  { return new AddDelta(appliedDelta(d2, d1.value)) }
			if (d2 instanceof RemoveDelta)  { return new ForbidDelta() }
			if (d2 instanceof ForbidDelta)  { throw error('modify', 'forbid') }
		}
		if (d1 instanceof ReplaceDelta) {
			if (d2 instanceof AddDelta)     { throw error('replace', 'add') }
			if (d2 instanceof ReplaceDelta) { return new ReplaceDelta(d2.value) }
			if (d2 instanceof ModifyDelta)  { return new ReplaceDelta(appliedDelta(d2, d1.value)) }
			if (d2 instanceof RemoveDelta)  { return new RemoveDelta() }
			if (d2 instanceof ForbidDelta)  { throw error('replace', 'forbid') }
		}
		if (d1 instanceof ModifyDelta) {
			if (d2 instanceof AddDelta)     { throw error('modify', 'add') }
			if (d2 instanceof ReplaceDelta) { return new ReplaceDelta(d2.value) }
			if (d2 instanceof ModifyDelta)  { return new ModifyDelta(composeOpMaps(d1.operations, d2.operations)) }
			if (d2 instanceof RemoveDelta)  { return new RemoveDelta() }
			if (d2 instanceof ForbidDelta)  { throw error('modify', 'forbid') }
		}
		if (d1 instanceof RemoveDelta) {
			if (d2 instanceof AddDelta)     { return new ReplaceDelta(d2.value) }
			if (d2 instanceof ReplaceDelta) { throw error('remove', 'replace') }
			if (d2 instanceof ModifyDelta)  { throw error('remove', 'modify') }
			if (d2 instanceof RemoveDelta)  { throw error('remove', 'remove') }
			if (d2 instanceof ForbidDelta)  { return new RemoveDelta() }
		}
		if (d1 instanceof ForbidDelta) {
			if (d2 instanceof AddDelta)     { return new AddDelta(d2.value) }
			if (d2 instanceof ReplaceDelta) { throw error('forbid', 'replace') }
			if (d2 instanceof ModifyDelta)  { throw error('forbid', 'modify') }
			if (d2 instanceof RemoveDelta)  { throw error('forbid', 'remove') }
			if (d2 instanceof ForbidDelta)  { return new ForbidDelta() }
		}

		throw new Error('This point in the code should not be reachable.');

	}


	//
	// how to apply deltas
	//
	function appliedDelta(d, value) {

		if (U.isUndefined(d)) { return value }

		if (d instanceof AddDelta) {
			U.assert(U.isUndefined(value),
					`The 'add' operation expects the property to first be undefined.`);
			return d.value;
		}
		if (d instanceof ReplaceDelta) {
			U.assert(U.isDefined(value),
					`The 'replace' operation expects the property to be already defined.`);
			return d.value;
		}
		if (d instanceof ModifyDelta) {
			U.assert(U.isDefined(value),
					`The 'modify' operation expects the property to be already defined.`);
			U.assert($.isPlainObject(value),
					`The 'modify' operation expects the property have a plain object value.`);
			var newObj = $.extend({}, value);
			Object.keys(d.operations).forEach((property) => {
				newObj[property] = appliedDelta(d.operations[property], newObj[property]);
			});
			return newObj;
		}
		if (d instanceof RemoveDelta) {
			U.assert(U.isDefined(value),
					`The 'remove' operation expects the property to first be defined.`);
			return undefined;
		}
		if (d instanceof ForbidDelta) {
			U.assert(U.isUndefined(value),
					`The 'forbid' operation requires the property to be undefined.`);
			return undefined;
		}

		throw new Error('This point in the code should not be reachable.');

	}


	//
	// create an object that can be used to add new operations to a plugin
	//
	function _objectToRegisterOperations(plugin) {
		// TODO
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
			// process the plugin requirements
			//
			_addPluginRequirements(plugin.name, plugin.require);

			//
			// register the plugin
			//
			_plugins.addVertex(plugin.name, plugin);
			$.each(plugin.after, (__, v) => { _plugins.createEdge(v, plugin.name) });
			if (_plugins.hasCycle()) { throw new Error(`The plugin application order has a cycle.`) }

			//
			// pre-process operations (for now, only 'modify' for the top-level)
			//
			plugin._operations = _processInObjectOperations(plugin);

			//
			// return an object that can be used to add additional operations
			//
			return _objectToRegisterOperations(plugin);
		};

		//
		// register (part of) a new plugin
		//
		this.select = function select(pluginNames) {
			//
			// accept an array of plugin names, rather than just one name
			//
			if ($.isArray(pluginNames)) { pluginNames.forEach(select) }

			//
			// process single plugin name by making its condition 'true'
			//
			_addPluginConditionDisjunct(pluginNames, true);
		};

		//
		// apply all relevant plugins to a given object
		//
		this.apply = function apply(component, obj) {
			return traverse(_plugins, (pluginName, plugin) => {
				//
				// if the plugin doesn't exist, throw an error
				//
				U.assert(plugin, `I don't know the '${pluginName}' plugin.`);

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
				var subOps = _processInObjectOperations(op.value);
				$.each(subOps, (field, subOp) => {
					switch (subOp.operation) {

						//
						// add a new key/value pair to the object
						//
						case 'add':
						{///////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isUndefined(obj[field]),
									`The operation 'add ${field}' expects ${component}.${field} to first be undefined.`);

							obj[field] = subOp.value;

						}
							break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// remove an existing key/value pair from the object
						//
						case 'remove':
						{////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isDefined(obj[field]),
									`The operation 'remove ${field}' expects ${component}.${field} to first be defined.`);

							delete obj[field];

						}
							break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// replace an existing key/value pair in the object
						//
						case 'replace':
						{///////////////////////////////////////////////////////////////////////////////

							U.assert(U.isDefined(obj[field]),
									`The operation 'replace ${field}' expects ${component}.${field} to first be defined.`);

							obj[field] = subOp.value;

						}
							break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// insert a set of statements into an existing method of the object
						//
						case 'insert':
						{////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isUndefined(obj[field]) || $.isFunction(obj[field]),
									`The operation 'insert ${field}' expects ${component}.${field} to be undefined or a function.`);

							var restOfFunction = obj[field];
							obj[field] = function (...args) {
								restOfFunction.apply(this, args);
								return subOp.value.apply(this, args);
							};

						}
							break;////////////////////////////////////////////////////////////////////////////////////////


						//
						// have a set of statements executed after an existing
						// (possibly asynchronous) method of the object
						//
						case 'after':
						{/////////////////////////////////////////////////////////////////////////////////

							U.assert(U.isUndefined(obj[field]) || $.isFunction(obj[field]),
									`The operation 'after ${field}' expects ${component}.${field} to be undefined or a function.`);

							var beforeFunction = obj[field];
							obj[field] = function (...args) {
								return P.resolve(beforeFunction.apply(this, args)).then(function (promiseValue) {
									return subOp.value.apply(this, [promiseValue].concat(args));
								}.bind(this));
							};

						}
							break;////////////////////////////////////////////////////////////////////////////////////////

						default:
						{
							throw new Error(`The ${subOp.operation} operation is not known.`);
						}
							break;
					}
				});
			});
		};
	};
});
