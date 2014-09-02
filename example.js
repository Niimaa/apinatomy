//// RequireJS Configuration
requirejs.config({
	paths: {
		'domReady': 'bower_components/requirejs-domready/domReady',
		'jquery': 'bower_components/jquery/dist/jquery',
		'jquery-ui': 'bower_components/jquery-ui/jquery-ui'
	},
	shim: {
		'jquery': { exports: '$' },
		'jquery-ui': ['jquery']
	}
});

//// Example application
require(['jquery', 'jquery-ui', 'dist/amy-core.min', 'domReady!'], function ($) {

	function Model(id, children) {
		this.id = id;
		this._children = children;
		this.getChild = function (id) {
			return this._children[id];
		};
		this.getChildIds = function () {
			return Object.keys(this._children);
		};
	}

	var model = new Model('q', {
		a: { id: 'a' },
		b: { id: 'b' },
		c: { id: 'c' },
		d: new Model('d', {
			x: { id: 'x' },
			y: { id: 'y' },
			z: { id: 'z' }
		}),
		e: { id: 'e' }
	});

	var cbe = $('#circuitboard');

	var cb = cbe.circuitboard({
		model: model,
		tileSpacing: 4
	}).circuitboard('instance');

	cb.onTileCreated(function (tile) {
		tile.element.css({
			padding: '10px',
			display: 'flex',
			alignItems: 'stretch'
		});
		tile.element.append(
					'<div style="flex-grow: 1; display: flex; flex-direction: column; background: red; padding: 5px;">' +
					'    <div style="flex-grow: 1; border: dotted 1px white;"></div>' +
					'    <div class="inner-container" style="flex-grow: 1; border: dotted 1px white;"></div>' +
					'</div>'
		);
		tile.element = tile.element.find('.inner-container');
	});

	cb.onTileCreated(function (tile) {
		tile.on('click', function () {
			tile.element.css({
				padding: '5px',
				display: 'flex',
				alignItems: 'stretch'
			});
			tile.element.append('<div style="flex-grow: 1; background: green;"/>');
		})
	});

//	cb.onTileCreated(function (tile) {
//		tile.on('click', function () {
//			tile.open = !tile.open;
////			tile.weight = 4 - tile.weight;
//		})
//	});

});
