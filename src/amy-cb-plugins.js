define(['jquery', './amy-util/plugin-handler.js'], function ($, pluginHandler) {
	'use strict';

	//
	// let '$.circuitboard' accept plugins
	//
	if (!$.circuitboard) { $.circuitboard = {} }
	$.circuitboard.plugin = pluginHandler();

});
