define([
	'jquery',
	'bluebird',
	'./util/widget.js',
	'./util/misc.js',
	'./util/plugin-handler.js',
	'./util/defer.js'
], function ($, P, amyWidget, U, PluginHandler, defer) {
	'use strict';

	//
	// set up a promise chain for guiding widget construction
	//
	var beforeConstruction = defer();

	//
	// create and register the three types of widget:
	// Circuitboard, tilemap and tile
	//
	var widgetArtefacts = {
		Circuitboard: amyWidget('Circuitboard', {
			beforeConstruction: beforeConstruction.promise,
			cssClass: "circuitboard",
			filter: ()=>P.resolve(true),
			model: null
		}),
		Tilemap: amyWidget('Tilemap', {
			beforeConstruction: beforeConstruction.promise,
			cssClass: "tilemap",
			model: null,
			_circuitboard: null
		}),
		Tile: amyWidget('Tile', {
			beforeConstruction: beforeConstruction.promise,
			cssClass: 'tile',
			model: null,
			_circuitboard: null
		})
	};

	//
	// allow '$.circuitboard' to accept plugins
	//
	var pluginHandler = new PluginHandler();
	U.object($, 'circuitboard').plugin = function plugin(pluginOrSelection) {
		if ($.isPlainObject(pluginOrSelection)) {
			//// the function is used to register a new plugin
			return pluginHandler.register(pluginOrSelection);
		} else {
			//// the function is used to select plugins to be applied
			U.assert(U.isDefined(widgetArtefacts),
					`The plugins are being selected before the circuitboard artefacts were registered. ` +
					`Have you loaded the ApiNATOMY files in a strange order?`);
			pluginHandler.select(pluginOrSelection);
			return pluginHandler.apply(widgetArtefacts)
					.then(beforeConstruction.resolve, beforeConstruction.reject)
					.return();
		}
	};

	// for getting the plugin graph
	$.circuitboard.plugin.graph = () => pluginHandler.graph();

	//
	// return the static `$.circuitboard` object,
	// through which plugins can be applied and selected
	//
	return $.circuitboard;

});
