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
require(['jquery', 'dist/amy-tileskin', 'jquery-ui', 'dist/amy-core.min', 'domReady!'], function ($, skin) {

	function Model(fields, children) {
        $.extend(this, fields);
		this._children = children;
		this.getChild = function (id) {
			return this._children[id];
		};
		this.getChildIds = function () {
			return Object.keys(this._children);
		};
	}

	var model = new Model({
        id: 's'
    }, {
		a: { id: 'a', color: 'red' },
		b: { id: 'b', color: 'blue' },
		c: { id: 'c', color: 'gray' },
		d: new Model({ id: 'd', color: 'green' }, {
			x: { id: 'x' },
			y: { id: 'y' },
			z: { id: 'z' }
		}),
		e: { id: 'e', color: 'purple' }
	});

	var cb = $('#circuitboard').circuitboard({
		model: model,
		tileSpacing: 4
	}).circuitboard('instance');





//	cb.onTileCreated(function (tile) {
//        if (tile.model.id !== 'c') {
//            tile.html.css({
//                padding: '10px',
//                display: 'flex',
//                alignItems: 'stretch'
//            });
//            tile.html.append(
//                    '<div style="flex-grow: 1; display: flex; flex-direction: column; background: red; padding: 5px;">' +
//                    '    <div style="flex-grow: 1; border: dotted 1px white;"></div>' +
//                    '    <div class="inner-container" style="flex-grow: 1; border: dotted 1px white;"></div>' +
//                    '</div>'
//            );
//            tile.html = tile.html.find('.inner-container');
//        }
//	});
//
//	cb.onTileCreated(function (tile) {
//		tile.on('click', function () {
//			tile.html.css({
//				padding: '5px',
//				display: 'flex',
//				alignItems: 'stretch'
//			});
//			tile.html.append('<div style="flex-grow: 1; background: green;"/>');
//		})
//	});

});
