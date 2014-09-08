//
// RequireJS Configuration
//
requirejs.config({
	paths: {
		'domReady': '../bower_components/requirejs-domready/domReady',
        'jquery': '../bower_components/jquery/dist/jquery',
        'jquery-ui': '../bower_components/jquery-ui/jquery-ui'
	},
	shim: {
		'jquery': { exports: '$' },
		'jquery-ui': ['jquery']
	}
});

//
// Example application
//
require(['jquery', '../dist/amy-skin.min', 'jquery-ui', '../dist/amy-circuitboard.min', 'domReady!'], function ($, skin) {

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
			a: { css: { backgroundColor: 'red' } },
			b: { css: { backgroundColor: 'blue' } },
			c: { css: { backgroundColor: 'gray' } },
			d: {
				css: { backgroundColor: 'green' },
				children: {
					d1: { css: { backgroundColor: 'lightgreen' } },
					d2: { css: { backgroundColor: 'lightgreen' } },
					d3: { css: { backgroundColor: 'lightgreen' } }
				}
			},
			e: { css: { backgroundColor: 'purple' } }
		}
	});

	//
	// Use the $.fn.circuitboard method to instantiate the circuit-board
	//
	var cb = $('#circuitboard').circuitboard({
		model: model,
		tileSpacing: 4
	}).circuitboard('instance');

	//
	// Apply the 'skin' plugin, which gives tiles a header
	// and applies css from the model
	//
	cb.onTileCreated(skin);

	//
	// Open and close tiles by a click.
	// Make open tiles twice as large as closed ones.
	//
	cb.onTileCreated(function (tile) {
		tile.on('click', function () {
			tile.open = !tile.open;
			tile.weight = tile.open ? 2 : 1;
		});
	});

});
