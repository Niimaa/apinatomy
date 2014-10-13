define(['jquery', './plugin-handler.js', './misc.js'], function ($, PluginHandler) {
	'use strict';

	//
	// let '$.circuitboard' accept plugins
	//
	var pluginHandler = new PluginHandler();
	if (!$.circuitboard) { $.circuitboard = {} }
	$.circuitboard.plugin = function plugin(plugins) {
		if ($.isPlainObject(plugins)) {
			return pluginHandler.register(plugins);
		} else {
			pluginHandler.select(plugins);
		}
	};

	//
	// fetch plugins that were already loaded and register them
	//
	($.circuitboard.prematurePlugins || []).forEach($.circuitboard.plugin);
	delete $.circuitboard.prematurePlugins;

	//
	// return a function which can be used to apply the plugins
	// and get a promise to wait for that to finish
	//
	return function applyCbPlugins(widgetArtefacts) {
		return pluginHandler.apply(widgetArtefacts);
	};

});
