define(['jquery', './util.js', './amy-tile.js'], function ($) {
	'use strict';

	$.CSS('.circuitboard.tilemap, .circuitboard .tilemap')
		.addRule('display', 'flex')
		.addRule('flex-direction', 'column');
	$.CSS('.circuitboard .tilerow')
		.addRule('display', 'flex')
		.addRule('flex-direction', 'row')
		.addRule('margin', 0)
		.addRule('padding', 0)
		.addRule('height', 0);
	$.CSS('.tilerow:last-child') // to overwrite tile spacing
		.addRule('margin-bottom', 0, true);

	$.amyWidget('tilemap', {
		cssClass:    "tilemap",
		filter: $.returns(true),
		model:       null,
		tileSpacing: 0,
		_cb:         null
	}, function Tilemap(that) {

		that._refreshTiles = function () {
			//// if there's no model, empty out and return
			if (!that.model || !that.model.getChildIds || !that.model.getChild) {
				that.element.empty();
				return;
			}

			//// load the models of children that ought be displayed
			var childrenToDisplay = [];
			$.each(that.model.getChildIds(), function (index, childId) {
				function getChild() {
					if (!that.options._cb.options.entityCache[childId]) {
						that.options._cb.options.entityCache[childId] =
							that.model.getChild(childId);
					}
					return that.options._cb.options.entityCache[childId];
				}

				if (that.options.filter(childId, getChild)) {
					childrenToDisplay.push(getChild());
				}
			});

			//// (re)layout the tiles
			that.element.children().empty(); // TODO: maintain reference to tile elements
			that.element.empty();
			var rowCount = Math.round(Math.sqrt(childrenToDisplay.length));
			var colCount = Math.ceil(childrenToDisplay.length / rowCount);
			while (rowCount--) {
				var row = $('<div/>').addClass('tilerow').appendTo(that.element);
				for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
					var tile = $('<div/>').tile({
						filter:      that.options.filter,
						model:       childrenToDisplay.pop(),
						tileSpacing: that.options.tileSpacing,
						_cb:         that.options._cb
					}).appendTo(row).nestedFlexGrow(1).tile('instance');
					tile.one('destroy', tile.destroy.bind(tile));
				}
			}
		};

		that._refreshTileSpacing = function () {
			var that = this;
			that.element.children().css('margin-bottom', that.options.tileSpacing);
			that.element.children().children().css('margin-right', that.options.tileSpacing);
		};

		that._refreshTiles();
		that._refreshTileSpacing();

	});

});
