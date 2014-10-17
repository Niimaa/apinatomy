//
// things to be loaded by webpack
//
require('./example.scss');

//
// RequireJS Configuration
// Using an extra variable to stop webpack from messing with it
//
var requireJs = requirejs;
requireJs.config({
	paths: {
		'domReady': '../../bower_components/requirejs-domready/domReady',
		'jquery': '../../bower_components/jquery/dist/jquery',
		'js-graph': '../../bower_components/js-graph/dist/js-graph',
		'bluebird': '../../bower_components/bluebird/js/browser/bluebird',
		'chroma-js': '../../bower_components/chroma-js/chroma',
		'd3': '../../bower_components/d3/d3',
		'three-js': '../../bower_components/three.js/three'
	},
	shim: {
		'jquery': { exports: 'jQuery' },
		'bluebird': { init: function () { this.longStackTraces() } },
		'three-js': { exports: 'THREE' }
	}
});


//
// Example application
//
requirejs(['../circuitboard.js'], function (circuitboard) { // circuitboard.js has to be loaded first
	requirejs([
		'jquery',
		'../fma-model.min.js',
		'../p-circuitboard-core.min.js',
		'../p-tilemap-core.min.js',
		'../p-tile-core.min.js',
		'../p-tile-skin.min.js',
		'../p-tile-spacing.min.js',
		'../p-tile-click-to-open.min.js',
		'../p-tile-weight.min.js',
		'../p-tile-active.min.js',
		'../p-tile-open.min.js',
		'../p-tile-grow-when-open.min.js',
		'../p-tile-open-active.min.js',
		'../p-tile-skin-grow-when-open.min.js',
		'../p-position-tracking.min.js',
		'../p-transition-position-tracking.min.js',
		'../p-tile-hidden.min.js',
		'../p-tile-maximized.min.js',
		'../p-tile-middleclick-to-maximize.min.js',
		'../p-d3.min.js',
		'../p-ppi.min.js',
		'../p-three-d.min.js',
		'../p-d3-three-d.min.js',
		'domReady!'
	], function ($, getFmaModels) {
		'use strict';

		//
		// Select plugins to activate them;
		// Note that these must already be *loaded* at this point
		//
		circuitboard.plugin([
			'tile-skin',
			'tile-click-to-open',
			'tile-grow-when-open',
			'tile-middleclick-to-maximize',
			'tile-spacing',
			'tile-active',
			'ppi',
			'three-d'
		]);

		//
		// Use the $.fn.circuitboard method to instantiate the circuit-board
		//
		$('#circuitboard').circuitboard({
			model: getFmaModels(['24tile:60000000'])[0],
			tileSpacing: 1,
			tilemapMargin: 0,
			weightWhenOpen: 8
			//threeDCanvasElement: $('#three-d-canvas')
		}).circuitboard('instance').then(function (circuitboard) {
			console.info('circuitboard loaded');


		});


	});
});

