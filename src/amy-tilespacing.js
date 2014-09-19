define(function () {
	'use strict';

	return {
		name: 'tilespacing',
		after: ['tilemap-core'],
		'modify tilemap': {
			'add refreshTileSpacing': function () {
				this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
				this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
				this.trigger('tilespacing-refreshed');
			},
			'after refreshTiles': function () {
				this.refreshTileSpacing();
			}
		}
	};
});
