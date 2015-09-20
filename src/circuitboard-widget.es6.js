define([
	'jquery',
	'bluebird',
	'./util/newWidgetType.es6.js',
	'./util/main-deltajs.es6.js',
	'./Artefact.es6.js'
], function ($, P, newWidgetType, deltaJs, ArtefactP) {
	'use strict';


	/* create $.circuitboard object */
	$.circuitboard = { plugin: deltaJs };

	/* create the three main classes */
	let CircuitboardP = newWidgetType('Circuitboard', { cssClass: 'circuitboard' });
	let TilemapP = ArtefactP.then(Artefact => Artefact.newSubclass('Tilemap', () => {}));
	let TileP    = ArtefactP.then(Artefact => Artefact.newSubclass('Tile',    () => {}));


	/* put those classes on the $.circuitboard object */
	CircuitboardP.then((c) => { $.circuitboard.Circuitboard = c });
	TilemapP     .then((c) => { $.circuitboard.Tilemap      = c });
	TileP        .then((c) => { $.circuitboard.Tile         = c });


	/*  return the static `$.circuitboard` object,         */
	/*  through which plugins can be applied and selected  */
	return $.circuitboard;


});
