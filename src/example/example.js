/*  RequireJS Configuration */
requirejs.config({
	paths: {
		'domReady':  '../../bower_components/requirejs-domready/domReady',
		'jquery':    '../../bower_components/jquery/dist/jquery',
		'js-graph':  '../../bower_components/js-graph/dist/js-graph',
		'delta-js':  '../../bower_components/delta.js/dist/delta',
		'bluebird':  '../../bower_components/bluebird/js/browser/bluebird',
		'chroma-js': '../../bower_components/chroma-js/chroma',
		'd3':        '../../bower_components/d3/d3',
		'three-js':  '../../bower_components/three.js/three'
	},
	shim: {
		'jquery':   { exports: 'jQuery' },
		'bluebird': { init: function () { this.longStackTraces() } },
		'three-js': { exports: 'THREE' }
	}
});


/* load the circuitboard code and style */
require('../circuitboard.js');
require('./example.scss');


/* example application  (circuitboard.js has to be loaded first) */
require([

	/* libraries that return a variable */
	'jquery',
	'../fma-model.js',

	/* plugins */
	'../p-core.js',
	'../p-tile-skin.js',
	'../p-tile-spacing.js',
	'../p-tile-click-to-open.js',
	'../p-tile-weight.js',
	'../p-tile-active.js',
	'../p-tile-open.js',
	'../p-tile-grow-when-open.js',
	'../p-tile-open-active.js',
	'../p-tile-skin-grow-when-open.js',
	'../p-position-tracking.js',
	'../p-transition-position-tracking.js',
	'../p-tile-hidden.js',
	'../p-tile-maximized.js',
	'../p-tile-middleclick-to-maximize.js',
	'../p-d3.js',
	'../p-ppi.js',
	'../p-three-d.js',
	'../p-three-d-geometric-models.js',
	'../p-d3-three-d.js'

], function ($, getFmaModels) {
	'use strict';


	/* select plugins to activate them  (note that these must already be *loaded* at this point) */
	$.circuitboard.plugin([
		'tile-skin',
		'tile-click-to-open',
		'tile-grow-when-open',
		'tile-middleclick-to-maximize',
		'tile-spacing',
		'tile-active',
		'ppi',
		'three-d',
		'three-d-geometric-models'
	]);


	/* use the $.fn.circuitboard method to instantiate the circuit-board */
	$(document).ready(() => {
		$('#circuitboard').circuitboard({
			model: getFmaModels(['24tile:60000000'])[0],
			tileSpacing: 1,
			tilemapMargin: 0,
			weightWhenOpen: 8,
			threeDCanvasElement: $('#three-d-canvas')
		}).circuitboard('instance').then(function (circuitboard) {
			console.info('circuitboard loaded');

			window.setThreeDMode = function (mode) {
				circuitboard.threeDMode = mode;
			};
		});
	});


});
