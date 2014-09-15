define(['jquery', 'js-graph'], function ($, JsGraph) {

	return function acceptPlugins(obj, options) {

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
		// normalize options
		//
		var pluginFnName = options.fnName || 'plugin';

		//
		// place the 'plugin' method in the object
		//
		$.extend(obj, {
			[pluginFnName](config) {

				//
				// if an array is passed, process each item as a separate plugin configuration
				//
				if ($.isArray(config)) {
					$.each(config, (__, subConfig) => { obj[pluginFnName](subConfig) });
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
		});

		return function applyPlugins(component, obj, constructor) {
			var c = components[component];

			//
			// process the constructor itself as the 'core' plugin
			//
			constructor.call(obj, c.pluginResults.core);
			$.extend(obj, c.pluginResults.core);

			//
			// apply the other plugins for this component
			//
			c.plugins.topologically((name, fn) => {
				fn && fn.call(obj, c.pluginResults[name], c.pluginResults);
				$.extend(obj, c.pluginResults[name]);
			});
		}
	};

});
