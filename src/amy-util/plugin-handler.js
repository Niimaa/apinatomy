define(['jquery', 'js-graph'], function ($, JsGraph) {

	return function pluginHandler(options) {

		//
		// gather the published components
		//
		var components = {};
		$.each(options.components, (key, component) => {
			components[key] = $.extend({}, component, {
				plugins: new JsGraph(),
				pluginResults: {}
			});
		});

		//
		// place the 'plugin' method in the object
		//
		function plugin(config) {

			//
			// if an array is passed, process each item as a separate plugin configuration
			//
			if ($.isArray(config)) {
				$.each(config, (__, subConfig) => { plugin(subConfig) });
				return;
			}

			//
			// normalize plugin configuration
			//
			if (typeof config.name !== 'string') { config.name = config.decorator.name }
			if (typeof config.after === 'string') { config.after = [config.after] }
			if (!$.isArray(config.after)) { config.after = [] }

			//
			// perform sanity checks
			//
			$.assert(typeof config.name === 'string',
				`An ApiNATOMY plugin should have a name.`);
			$.assert($.isFunction(config.decorator),
				`The ApiNATOMY plugin '${config.name}' should have a decorator function.`);
			$.assert(components[config.component],
				`The ApiNATOMY plugin '${config.name}' should specify a component.`);

			//
			// set the component
			//
			var c = components[config.component];

			//
			// register the plugin
			//
			c.plugins.addVertex(config.name, config.decorator);
			$.each(config.after, (__, v) => { c.plugins.createEdge(v, config.name) });

			//
			// check for a cycle
			//
			try { // TODO: write a hasCycle method in the js-graph library
				c.plugins.topologically(()=>{});
			} catch (cycleError) {
				throw new Error("The plugin application order has a cycle: " + cycleError.cycle);
			}

		}

		plugin._apply = function _apply(component, obj, constructor) {
			var c = components[component];



			function processPlugin(name, fn) {
				if (fn) {
					fn.call(obj, c.pluginResults[name], c.pluginResults);
				}
				$.extend(obj, c.pluginResults[name]);
			}

			processPlugin('core', constructor);
			c.plugins.topologically(processPlugin);
		};

		return plugin;
	};

});
