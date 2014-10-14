define(['jquery', './util/handle-premature-plugins.js'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-spacing',
		after: ['tilemap-core'],

		'modify tilemap.prototype': {
			//
			// reset the tile-spacing in the DOM
			//
			'add refreshTileSpacing': function () {
				this.element.css('margin', this.circuitboard.options.tilemapMargin);
				this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
				this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
			},

			//
			// refresh tile-spacing after tiles are refreshed
			//
			'after refreshTiles': function () {
				this.refreshTileSpacing();
			}
		}
	});
});
