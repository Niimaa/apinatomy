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
			return pluginHandler.select(plugins);
		}
	};
	$.circuitboard.plugin._apply = pluginHandler.apply.bind(pluginHandler);

	//
	// fetch plugins that were already loaded and register them
	//
	($.circuitboard.prematurePlugins || []).forEach($.circuitboard.plugin);
	delete $.circuitboard.prematurePlugins;

});
