define(['jquery', './amy-util/plugin-handler.js'], function ($, PluginHandler) {
	'use strict';

	//
	// let '$.circuitboard' accept plugins
	//
	var pluginHandler = new PluginHandler();
	if (!$.circuitboard) { $.circuitboard = {} }
	$.circuitboard.plugin = pluginHandler.register.bind(pluginHandler);
	$.circuitboard.plugin._apply = pluginHandler.apply.bind(pluginHandler);

	//
	// fetch plugins that were already loaded and register them
	//
	($.circuitboard.prematurePlugins || []).forEach($.circuitboard.plugin);
	delete $.circuitboard.prematurePlugins;

});
