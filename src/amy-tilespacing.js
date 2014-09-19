define(['jquery'], function ($) {
	'use strict';

	//
	// define the plugin
	//
	function plugin(/*options = {}*/) {
		return {
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
		};
	}

	//
	// make the plugin available in the `$.circuitboard.p` object
	//
	if (!$.circuitboard) { $.circuitboard = {} }
	if (!$.circuitboard.p) { $.circuitboard.p = {} }
	$.circuitboard.p[plugin().name] = plugin;

	//
	// return the plugin for use by certain package loaders
	//
	return plugin;
});
