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
	'../dist/amy-circuitboard',
	'../dist/amy-p-tileskin',
	'../dist/amy-p-tilespacing',
	'../dist/amy-p-tile-click-to-open',
	'../dist/amy-p-tile-active',
	'../dist/amy-p-tile-open',
	'../dist/amy-p-tile-grow-when-open',
	'../dist/amy-p-tile-open-active',
	'domReady!'
], function ($, P) {
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

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var nodes = {
		s: {
			id: 's',
			children: ['a', 'b', 'c', 'd', 'e']
		},
		a: {
			id: 'a',
			name: 'Tile A',
			css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			},
			children: ['d1', 'b', 'd3']
		},
		b: {
			id: 'b',
			name: 'Tile B',
			css: {
				'&': { backgroundColor: 'blue', borderColor: 'lightblue', color: 'white' },
				'& header': { borderColor: 'lightblue' }
			}
		},
		c: {
			id: 'c',
			name: 'Tile C',
			css: {
				'&': { backgroundColor: 'gray', borderColor: 'lightgray', color: 'white' },
				'& header': { borderColor: 'lightgray' }
			}
		},
		d: {
			id: 'd',
			name: 'Tile D',
			css: {
				'&': { backgroundColor: 'green', borderColor: 'lightgreen', color: 'white' },
				'& header': { borderColor: 'lightgreen' }
			},
			children: ['d1', 'd2', 'd3']
		},
		d1: {
			id: 'd1',
			name: 'Tile D1',
			css: {
				'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
				'& header': { borderColor: 'green' }
			}
		},
		d2: {
			id: 'd2',
			name: 'Tile D2',
			css: {
				'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
				'& header': { borderColor: 'green' }
			}
		},
		d3: {
			id: 'd3',
			name: 'Tile D3',
			css: {
				'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
				'& header': { borderColor: 'green' }
			}
		},
		e: {
			id: 'e',
			name: 'Tile E',
			css: {
				'&': { backgroundColor: 'purple', borderColor: 'orchid', color: 'white' },
				'& header': { borderColor: 'orchid' }
			}
		}
	};

	var nodePromises = {};

	function modelWithApi(obj) {
		obj.getChildren = function (ids) {
			return ids.map(function (id) {
				if (!nodePromises[id]) { nodePromises[id] = P.resolve(modelWithApi(nodes[id])) }
				return nodePromises[id];
			});
		};
		obj.getChildIds = function () {
			return P.resolve(obj.children || []);
		};
		return P.resolve(obj);
	}

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	$('#circuitboard').circuitboard({
		model: modelWithApi(nodes['s']),
		tileSpacing: 4
	});


});
