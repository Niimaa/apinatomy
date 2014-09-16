define(['jquery', 'js-graph'], function ($, JsGraph) {

	function processOperations(sourceObj, operation, targetObj, field) {
		if (!targetObj[field]) {
			targetObj[field] = {};
			$.each(sourceObj, (key, value)=> {
				var k = key.match(/^(\w+)\s+(\w+)$/);
				if (k && k[1] === operation) {
					targetObj[field][k[2]] = value;
				}
			});
		}
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
			processOperations(plugin, 'modify', plugin, '_modifications');
		}

		//
		// apply all relevant plugins to a given object
		//
		plugin._apply = function _apply(component, obj) {
			plugins.topologically((pluginName, plugin) => {
				if (!plugin) { return }

				// get changes targeted at this component
				var changes = plugin._modifications[component];
				if (!changes) { return }

//				// allow changes to depend on previous changes // TODO
//				if ($.isFunction(changes)) { changes = changes(prev) }

				// for now, only support 'append constructor' // TODO: support other operations
				if (changes['append constructor']) {
					changes['append constructor'].call(obj);
				}
			});
		};

		return plugin;
	};
});
