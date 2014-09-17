//
// RequireJS Configuration
//
requirejs.config({
	paths: {
		'domReady':  '../bower_components/requirejs-domready/domReady',
		'jquery':    '../bower_components/jquery/dist/jquery',
		'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
		'js-graph':  '../bower_components/js-graph/dist/js-graph',
		'bluebird':  '../bower_components/bluebird/js/browser/bluebird'
	},
	shim:  {
		'jquery':    { exports: '$' },
		'jquery-ui': ['jquery']
	}
});

//
// Example application
//
require(['jquery', 'bluebird', '../dist/amy-skin', '../dist/amy-tilespacing', 'jquery-ui', '../dist/amy-circuitboard', 'domReady!'], function ($, P, skinPlugin, tilespacingPlugin) {
	'use strict';

	//
	// Apply some plugins
	//
	$.circuitboard.plugin(skinPlugin);
	$.circuitboard.plugin(tilespacingPlugin);
	$.circuitboard.plugin({
		name: 'click-to-open',
		after: ['tile-core'],
		'modify tile': {
			'append constructor': function () {
				this.on('click', function () {
					this.open = !this.open;
					this.weight = this.open ? 2 : 1;
				});
			}
		}
	});
	$.circuitboard.plugin({
		name: 'big-border',
		after: ['circuitboard-core'],
		'modify circuitboard': {
			'append constructor': function () {
				this.element.css({
					border:  'solid 5px black',
					padding: this.options.tileSpacing
				});
			}
		}
	});

	//
	// Set up a model that offers the required API (which is still under design)
	//
	function equipWithAPI(obj) {
		obj.getChildren = function (ids) {
			return P.resolve(ids.map(function (id) {
				return P.resolve(obj.children[id]);
			}));
		};
		obj.getChildIds = function () {
			return P.resolve(obj.children ? Object.keys(obj.children) : []);
		};
		if (obj.children) {
			$.each(obj.children, function (id, child) {
				child.id = id;
				equipWithAPI(child);
			});
		}
		return P.resolve(obj);
	}

	var model = equipWithAPI({
		id:       's',
		children: {
			a: { name: 'Tile A', css: {
				'&':        { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			b: { name: 'Tile B', css: {
				'&':        { backgroundColor: 'blue', borderColor: 'lightblue', color: 'white' },
				'& header': { borderColor: 'lightblue' }
			}},
			c: { name: 'Tile C', css: {
				'&':        { backgroundColor: 'gray', borderColor: 'lightgray', color: 'white' },
				'& header': { borderColor: 'lightgray' }
			}},
			d: { name:    'Tile D',
				css:      {
					'&':        { backgroundColor: 'green', borderColor: 'lightgreen', color: 'white' },
					'& header': { borderColor: 'lightgreen' }
				},
				children: {
					d1: { name: 'Tile D1', css: {
						'&':        { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
						'& header': { borderColor: 'green' }
					}},
					d2: { name: 'Tile D2', css: {
						'&':        { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
						'& header': { borderColor: 'green' }
					}},
					d3: { name: 'Tile D3', css: {
						'&':        { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
						'& header': { borderColor: 'green' }
					}}
				}
			},
			e: { name: 'Tile E', css: {
				'&':        { backgroundColor: 'purple', borderColor: 'orchid', color: 'white' },
				'& header': { borderColor: 'orchid' }
			}}
		}
	});

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	$('#circuitboard').circuitboard({
		model:       model,
		tileSpacing: 4
	});

});
