//
// RequireJS Configuration
//
requirejs.config({
	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
		'jquery': '../bower_components/jquery/dist/jquery',
		'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
		'js-graph': '../bower_components/js-graph/dist/js-graph'
	},
	shim: {
		'jquery': { exports: '$' },
		'jquery-ui': ['jquery']
	}
});

//
// Example application
//
require(['jquery', '../dist/amy-skin', 'jquery-ui', '../dist/amy-circuitboard', 'domReady!'], function ($, skin) {

	//
	// Apply some plugins to ApiNATOMY tiles
	//
	$.tile.plugin(skin);
	$.tile.plugin('clicker', function () {
		var that = this;
		that.on('click', function () {
			that.open = !that.open;
			that.weight = that.open ? 2 : 1;
		});
	});

	//
	// Set up a model offering the required API (which is still under design)
	//
	function equipWithAPI(obj) {
		obj.getChild = function (id) {
			return obj.children[id];
		};
		obj.getChildIds = function () {
			return obj.children ? Object.keys(obj.children) : 0;
		};
		if (obj.children) {
			$.each(obj.children, function (childId, child) {
				child.id = childId;
				equipWithAPI(child);
			});
		}
		return obj;
	}

	var model = equipWithAPI({
		id: 's',
		children: {
			a: { name: 'Tile A', css: {
				'&': { backgroundColor: 'red', borderColor: '#ffbbbb', color: 'white' },
				'& header': { borderColor: '#ffbbbb' }
			}},
			b: { name: 'Tile B', css: {
				'&': { backgroundColor: 'blue', borderColor: 'lightblue', color: 'white' },
				'& header': { borderColor: 'lightblue' }
			}},
			c: { name: 'Tile C', css: {
				'&': { backgroundColor: 'gray', borderColor: 'lightgray', color: 'white' },
				'& header': { borderColor: 'lightgray' }
			}},
			d: { name: 'Tile D',
				css: {
					'&': { backgroundColor: 'green', borderColor: 'lightgreen', color: 'white' },
					'& header': { borderColor: 'lightgreen' }
				},
				children: {
					d1: { name: 'Tile D1', css: {
						'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
						'& header': { borderColor: 'green' }
					}},
					d2: { name: 'Tile D2', css: {
						'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
						'& header': { borderColor: 'green' }
					}},
					d3: { name: 'Tile D3', css: {
						'&': { backgroundColor: 'lightgreen', borderColor: 'green', color: 'black' },
						'& header': { borderColor: 'green' }
					}}
				}
			},
			e: { name: 'Tile E', css: {
				'&': { backgroundColor: 'purple', borderColor: 'orchid', color: 'white' },
				'& header': { borderColor: 'orchid' }
			}}
		}
	});

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	$('#circuitboard').circuitboard({
		model: model,
		tileSpacing: 4
	});

});
