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
		'd3': '../bower_components/d3/d3'
	},
	shim: {
		'jquery': { exports: 'jQuery' },
		'bluebird': { init: function () { this.longStackTraces() } }
	}
});

//
// Example application
//
require([
	'jquery',
	'bluebird',
	'../dist/amy-fma-model.js',
	'../dist/amy-circuitboard.js',
	'../dist/amy-p-circuitboard-core.js',
	'../dist/amy-p-tilemap-core.js',
	'../dist/amy-p-tile-core.js',
	'../dist/amy-p-tile-skin.js',
	'../dist/amy-p-tile-spacing.js',
	'../dist/amy-p-tile-click-to-open.js',
	'../dist/amy-p-tile-weight.js',
	'../dist/amy-p-tile-active.js',
	'../dist/amy-p-tile-open.js',
	'../dist/amy-p-tile-grow-when-open.js',
	'../dist/amy-p-tile-open-active.js',
	'../dist/amy-p-tile-skin-grow-when-open.js',
	'../dist/amy-p-position-tracking.js',
	'../dist/amy-p-transition-position-tracking.js',
	'../dist/amy-p-d3.js',
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
		'tile-spacing',
		'tile-open',
		'tile-active',
		'tile-weight',
		'tile-grow-when-open',
		'position-tracking',
		'd3'
	]);

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	$('#circuitboard').circuitboard({
		model: getFmaModels(['24tile:60000000'])[0],
		tileSpacing: 1,
		tilemapMargin: 3,
		weightWhenOpen: 8
	}).circuitboard('instance').then(function (/*circuitboard*/) {
		console.info('circuitboard loaded');
	});


});
