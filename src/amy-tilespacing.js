define(['jquery'], function ($) {
	'use strict';

	return {
		name: 'tilespacing',
		after: ['tilemap-core'],

		'modify tilemap': {
			'append constructor': function () {

				//
				// applying tilespacing inside the tilemap
				//
				$.extend(this, {
					refreshTileSpacing() {
						this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
						this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
						this.trigger('tilespacing-refreshed');
					}
				});

				//
				// apply tilespacing automatically when the tiles are refreshed
				// TODO: do this by extending this.refreshTiles, delta-modeling style,
				// TODO: rather than reacting to a signal
				//
				this.on('tiles-refreshed', ()=>{ this.refreshTileSpacing() });

			}
		}
	};
});
