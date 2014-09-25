//
// RequireJS Configuration
//
requirejs.config({
	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
		'jquery': '../bower_components/jquery/dist/jquery',
		'js-graph': '../bower_components/js-graph/dist/js-graph',
		'bluebird': '../bower_components/bluebird/js/browser/bluebird'
	},
	shim: {
		'jquery': { exports: 'jQuery' }
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
	'../dist/amy-p-tileskin.js',
	'../dist/amy-p-tilespacing.js',
	'../dist/amy-p-tile-click-to-open.js',
	'../dist/amy-p-tile-active.js',
	'../dist/amy-p-tile-open.js',
	'../dist/amy-p-tile-grow-when-open.js',
	'../dist/amy-p-tile-open-active.js',
	'domReady!'
], function ($, P, getFmaModels) {
	'use strict';

	//
	// Define a manual plugin
	//
	$.circuitboard.plugin({
		name: 'big-border',
		if: true,
		after: ['circuitboard-core'],
		'modify circuitboard': {
			'insert constructor': function () {
				this.element.css({
					border: 'solid 5px black',
					padding: this.options.tileSpacing
				});
			}
		}
	});

	//
	// Select predefined plugins
	//
	$.circuitboard.plugin([
		'tileskin',
		'tile-click-to-open',
		'tilespacing',
		'tile-open',
		'tile-active',
		'tile-grow-when-open'
	]);

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	$('#circuitboard').circuitboard({
		model: getFmaModels(['24tile:60000000'])[0],
		tileSpacing: 1
	});


});
