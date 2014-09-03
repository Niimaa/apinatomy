//// RequireJS Configuration
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

//// Example application
require(['jquery', '../dist/plugins/amy-tileskin', 'jquery-ui', '../dist/amy-core.min', 'domReady!'], function ($, skin) {

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

    cb.onTileCreated(skin);

    cb.onTileCreated(function (tile) {
        tile.on('click', function () {
            tile.open = !tile.open;
            tile.weight = tile.open ? 2 : 1;
        });
    });

//    cb.onTileCreated(function (tile) {
//        tile.on('mouseenter', function () { tile.weight = 2; });
//        tile.on('mouseleave', function () { tile.weight = 1; });
//    });


});
