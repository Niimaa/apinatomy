//
// RequireJS Configuration
//
requirejs.config({
	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
		'jquery': '../bower_components/jquery/dist/jquery',
		'js-graph': '../bower_components/js-graph/dist/js-graph',
		'bluebird': '../bower_components/bluebird/js/browser/bluebird',
		'chroma-js': '../bower_components/chroma-js/chroma',
		'd3': '../bower_components/d3/d3',
		'three-js': '../bower_components/three.js/three'
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
require([
	'jquery',
	'bluebird',
	'../dist/fma-model.js',
	'../dist/circuitboard.js',
	'../dist/p-circuitboard-core.js',
	'../dist/p-tilemap-core.js',
	'../dist/p-tile-core.js',
	'../dist/p-tile-skin.js',
	'../dist/p-tile-spacing.js',
	'../dist/p-tile-click-to-open.js',
	'../dist/p-tile-weight.js',
	'../dist/p-tile-active.js',
	'../dist/p-tile-open.js',
	'../dist/p-tile-grow-when-open.js',
	'../dist/p-tile-open-active.js',
	'../dist/p-tile-skin-grow-when-open.js',
	'../dist/p-position-tracking.js',
	'../dist/p-transition-position-tracking.js',
	'../dist/p-tile-hidden.js',
	'../dist/p-tile-maximized.js',
	'../dist/p-tile-middleclick-to-maximize.js',
	'../dist/p-d3.js',
	'../dist/p-ppi.js',
	'../dist/p-three-d.js',
	'domReady!'
], function ($, P, getFmaModels) {
	'use strict';

	//
	// Select plugins to activate them;
	// Note that these must already be *loaded* at this point
	//
	$.circuitboard.plugin([
		'tile-skin',
		'tile-click-to-open',
		'tile-maximized',
		'tile-middleclick-to-maximize',
		'tile-hidden',
		'tile-spacing',
		'tile-open',
		'tile-active',
		'tile-weight',
		'tile-grow-when-open',
		'position-tracking',
		'd3',
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
		weightWhenOpen: 8,
		threeDCanvasElement: $('#three-d-canvas')
	}).circuitboard('instance').then(function (circuitboard) {
		console.info('circuitboard loaded');

		//$('body').mousemove(function (event) {
		//	var pos = {
		//		left: event.pageX,
		//		top: event.pageY
		//	};
		//	var tPos = circuitboard.translatePositionFromCanvasToCircuitboard(pos);
		//	var str = JSON.stringify(pos);
		//	str += (new Array(30-str.length)).join(' ');
		//	str += JSON.stringify(tPos);
		//	console.log(str);
		//});

	});


});
