define([
	'jquery',
	'bluebird',
	'./util/newWidgetType.js',
	'./util/plugin.js'
], function ($, P, newWidgetType, plugin) {
	'use strict';


	/* create $.circuitboard object if it doesn't exist */
	$.circuitboard = { plugin };


	/* to define the widget classes after the proper plugins have been selected */
	newWidgetType('Circuitboard', {
		cssClass: "circuitboard",
		filter: () => P.resolve(true) // don't hide any entities
	}).then((Circuitboard) => {
		$.circuitboard.Circuitboard = Circuitboard;
	});

	newWidgetType('Tilemap', {
		cssClass: "tilemap"
	}).then((Tilemap) => {
		$.circuitboard.Tilemap = Tilemap;
	});

	newWidgetType('Tile', {
		cssClass: "tile"
	}).then((Tile) => {
		$.circuitboard.Tile = Tile;
	});


	/*  return the static `$.circuitboard` object,         */
	/*  through which plugins can be applied and selected  */
	return $.circuitboard;


});
