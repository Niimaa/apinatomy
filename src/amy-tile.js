define(['jquery', './util.js'], function ($) {
	'use strict';

	$.CSS('.circuitboard .tile')
		.addRule('margin', 0)
		.addRule('padding', 0)
		.addRule('width', 0);
	$.CSS('.tile:last-child') // to overwrite tile spacing
		.addRule('margin-right', 0, true);

	$.amyWidget('tile', {
		cssClass:    'tile',
		filter:      $.returns(true),
		model:       null,
		tileSpacing: 0,
		_cb:         null
	}, function Tile(that) {

		//// inform circuitboard of new tile
		that.options._cb._registerTile(that);

		//// Creates the mouse-related events on this tile object
		$.each(['click', 'mouseover', 'mouseout'], function (index, signal) {
			that.element.on(signal, function (event) {
				event.stopPropagation();
				that.trigger(signal, event);
			});
		});

		//// 'active' property
		that.element.addClass('active');
		// TODO: getter, setter

		//// 'weight' property
		var _weight = 1;
		Object.defineProperty(that, 'weight', {
			get: function () { return _weight },
			set: function (newWeight) {
				// TODO: allow Infinity
				_weight = newWeight;
				this.element.nestedFlexGrow(newWeight);
			}
		});

		//// 'open' property
		var _open = false;
		Object.defineProperty(that, 'open', {
			get: function () { return _open },
			set: function (shouldBeOpen) {
				_open = shouldBeOpen;
				that.element.toggleClass("open", _open);
				if (_open) { _populateInnerTilemap() }
			}
		});

		//// inner tilemap
		var _tilemap = null;

		function _populateInnerTilemap() {
			if (!_tilemap) {
				_tilemap = that.element.tilemap({
					filter:      that.options.filter,
					model:       that.options.model,
					tileSpacing: that.options.tileSpacing,
					_cb:         that.options._cb
				}).tilemap('instance');
				that.one('destroy', _tilemap.destroy.bind(_tilemap));
			}
		}

	});

});
