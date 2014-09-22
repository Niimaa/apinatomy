define(['jquery', './amy-circuitboard.js'], function ($) {
	'use strict';

	//
	// expect $.circuitboard to be defined
	//
	if (!$.circuitboard) {
		throw Error(
				"Can't access '$.circuitboard'. " +
				"Please load the core circuitboard module before loading any plugins."
		);
	}

	//
	// define the plugin
	//
	$.circuitboard.plugin({
		name: 'tilespacing',
		after: ['tilemap-core'],

		'modify tilemap': {
			//
			// reset the tile-spacing in the DOM
			//
			'add refreshTileSpacing': function () {
				this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
				this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
				this.trigger('tilespacing-refreshed');
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
