// RequireJS Configuration
requirejs.config({
	paths: {
		'domReady':  '../../bower_components/requirejs-domready/domReady',
		'jquery':    '../../bower_components/jquery/dist/jquery',
		'js-graph':  '../../bower_components/js-graph/dist/js-graph',
		'bluebird':  '../../bower_components/bluebird/js/browser/bluebird',
		'chroma-js': '../../bower_components/chroma-js/chroma',
		'd3':        '../../bower_components/d3/d3',
		'three-js':  '../../bower_components/three.js/three',
		'lodash':    '../../bower_components/lodash/dist/lodash.min'
	},
	shim: {
		'jquery':   { exports: 'jQuery' },
		'bluebird': { init: function () { this.longStackTraces() } },
		'three-js': { exports: 'THREE' },
		'lodash':   { exports: '_' }
	}
});


// the application itself
require([
	'jquery',
	'js-graph',
	'../circuitboard.js',
	'./delta-diagram.js',
	'./plugin-explorer.scss',
	// plugins:
	'../p-circuitboard-core.js',
	'../p-tilemap-core.js',
	'../p-tile-core.js',
	'../p-refresh.js',
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
	'../p-d3-three-d.js'
], function ($, JsGraph, circuitboard, createDiagram) {
	'use strict';

	createDiagram(
			$('body > svg'),
			circuitboard.plugin.graph()
	);

});
