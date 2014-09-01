define(['jquery', './util.js', './amy-tilemap.js'], function ($) {
	'use strict';

	$.amyWidget('circuitboard', {
		cssClass:    "circuitboard",
		filter:      $.returns(true),
		model:       null,
		entityCache: {},
		tileSpacing: 0
	}, function Circuitboard(that) {

		//// keeping track of tiles
		var _tilesByModelId = {};
		that._registerTile = function _registerTile(tile) { // used by tiles
			if (!_tilesByModelId[tile.model.id]) {
				_tilesByModelId[tile.model.id] = [];
			}
			_tilesByModelId[tile.model.id].push(tile);
			that.trigger('tilecreated', tile);
		};
		that.onTileCreated = function onTileCreated(tileSelector, fn) {
			//// `tileSelector` is optional, i.e., a single argument is `fn`
			if (typeof arguments[1] === 'undefined') {
				fn = arguments[0];
				tileSelector = null;
			}

			//// build the filter based on the selector
			var filter = null;
			if (!tileSelector) { // no tile selector = all tiles
				filter = $.returns(true);
			} else if (typeof tileSelector === 'string') { // model.id
				filter = function (tile) { return tile.model.id === tileSelector };
			}

			//// apply the callback for existing tiles
			$.each(_tilesByModelId, function (modelId, tiles) {
				$.each(tiles, function (index, tile) {
					if (filter(tile)) { fn(tile) }
				});
			});

			//// set up the callbacks for future tiles
			that.on('tilecreated', function (tile) {
				if (filter(tile)) { fn(tile) }
			});
		};

		//// the root tilemap
		var _tilemap = that.element.tilemap({
			filter:      that.options.filter,
			model:       that.options.model,
			tileSpacing: that.options.tileSpacing,
			_cb:         that
		}).tilemap('instance');
		that.one('destroy', _tilemap.destroy.bind(_tilemap));

	});

});
