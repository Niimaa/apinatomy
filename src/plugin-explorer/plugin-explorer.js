/* RequireJS Configuration */
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


/* load the circuitboard code and style */
require('../circuitboard.js');
require('./plugin-explorer.scss');


/* the application itself */
require([

	/* libraries that return a variable */
	'jquery',
	'js-graph',
	'./delta-diagram.js',

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
	'../p-animation-loop.js', // TODO: figure out why we get an error when this is moved down one line
	'../p-ppi.js',
	'../p-three-d.js',
	'../p-three-d-geometric-models.js',
	'../p-three-d-geometric-models-stl.js',
	'../p-d3-three-d.js',
	'../p-three-d-manual-controls.js',
	'../p-three-d-auto-controls.js'

], function ($, JsGraph, createDiagram) {
	'use strict';

	createDiagram(
			$('body > svg'),
			$.circuitboard.plugin.graph()
	);

});
