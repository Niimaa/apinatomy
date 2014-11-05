define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/CSS3DRenderer.js',
	'./util/TrackballControls.js',
	'./p-three-d.scss'
], function ($, THREE, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-geometric-models',
		requires: ['three-d']
	}).modify('Tile.prototype');


	plugin.append('construct', function () {

		// TODO

	});


});
