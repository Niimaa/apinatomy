define([
	'jquery',
	'bluebird',
	'./util/widget.js',
	'./util/cb-plugins.js'
], function ($, P, amyWidget, applyCbPlugins) {
	'use strict';

	//
	// create and register the three types of widget:
	// circuitboard, tilemap and tile
	//
	var widgetArtefacts = {
		circuitboard: amyWidget('circuitboard', {
			cssClass: "circuitboard",
			filter: ()=>P.resolve(true),
			model: null
		}),
		tilemap: amyWidget('tilemap', {
			cssClass: "tilemap",
			model: null,
			_circuitboard: null
		}),
		tile: amyWidget('tile', {
			cssClass: 'tile',
			model: null,
			_circuitboard: null
		})
	};

	//
	// extend the widget classes by plugins, and give the widget module a promise
	// to wait on before instantiating widgets
	//
	amyWidget.waitFor(applyCbPlugins(widgetArtefacts));

	//
	// return the static `$.circuitboard` object,
	// through which plugins can be applied and selected
	//
	return $.circuitboard;

});
