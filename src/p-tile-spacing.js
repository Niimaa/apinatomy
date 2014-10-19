define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		id: 'tile-spacing',
		requires: ['tilemap-core']
	}).modify('Tilemap.prototype');

	//
	// reset the tile-spacing in the DOM
	//
	plugin.add('refreshTileSpacing', function () {
		this.element.css('margin', this.circuitboard.options.tilemapMargin);
		this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
		this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
	});

	//
	// refresh tile-spacing after tiles are refreshed
	//
	plugin.after('refreshTiles', function () {
		this.refreshTileSpacing();
	});
});
