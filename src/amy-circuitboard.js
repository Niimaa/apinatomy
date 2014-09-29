define([
	'jquery',
	'bluebird',
	'./amy-util/widget.js',
	'./amy-cb-plugins.js'
], function ($, P, amyWidget) {
	'use strict';

	//
	// create and register the three types of widget:
	// circuitboard, tilemap and tile
	// NOTE: these need to be extended by plugins
	//
	amyWidget('circuitboard', 'circuitboard', {
		cssClass: "circuitboard",
		filter: ()=>P.resolve(true),
		model: null
	});
	amyWidget('tilemap', 'tilemap', {
		cssClass: "tilemap",
		model: null,
		_circuitboard: null
	});
	amyWidget('tile', 'tile', {
		cssClass: 'tile',
		model: null,
		_circuitboard: null
	});

	//
	// return the static `$.circuitboard` object,
	// through which plugins can be applied and selected
	//
	return $.circuitboard;

});
