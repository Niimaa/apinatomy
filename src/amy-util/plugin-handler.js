define(['jquery', 'js-graph'], function ($, JsGraph) {

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
		var plugins = new JsGraph();

		//
		// the 'plugin' function returned from this module;
		// it is called by plugin-writers, and can take an array
		//
		function plugin(config) {
			if ($.isArray(config)) {
				// process each plugin separately
				$.each(config, (__, subConfig)=>{ plugin(subConfig) });
			} else {
				// register a single plugin
				registerPlugin(config);
			}
		}

		//
		// register a single plugin
		//
		function registerPlugin(plugin) {
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
			// register the plugin
			//
			plugins.addNewVertex(plugin.name, plugin);
			$.each(plugin.after, (__, v) => { plugins.createEdge(v, plugin.name) });
			try { plugins.topologically(()=>{}) } catch (cycleError) {
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
		plugin._apply = function _apply(component, obj) {
			plugins.topologically((pluginName, plugin) => {
				if (!plugin) { return }

				// get changes targeted at this component
				var op = plugin._operations[component];
				if (!op) { return }

				// we only support 'modify' for the top level for now
				$.assert(op.operation === 'modify',
					`Any top-level operation on '${component}' must be 'modify'.`);

//				// allow changes to depend on previous changes // TODO
//				if ($.isFunction(changes)) { changes = changes(prev) }

				var subOps = {};
				processOperations(op.value, subOps);

//				$.each(subOps, (field, subOp) => { // TODO: finish
//					if (field !== 'constructor') { // constructor is handled last
//						switch (subOp.operation) {
//							case 'add': {
//								$.assert($.isUndefined(obj[field]),
//									`The operation 'add ${field}' expects ${component}.${field} to first be undefined.`);
//								obj[field] = subOp.value;
//							} break;
//							case 'remove': {
//								$.assert($.isUndefined(obj[field]),
//									`The operation 'remove ${field}' expects ${component}.${field} to first be defined.`);
//								delete obj[field];
//							} break;
//							case '': {} break;
//							case '': {} break;
//						}
//					}
//				});

				// for now, only support 'append constructor' // TODO: support other operations
				if (op.value['append constructor']) {
					op.value['append constructor'].call(obj);
				}
			});
		};

		return plugin;
	};
});
