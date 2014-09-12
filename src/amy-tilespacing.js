define(['jquery'], function ($) {
	return {
		component: 'tilemap',
		name: 'tilespacing',
		decorator() {
			$.extend(this, {
				refreshTileSpacing() {
					this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
					this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
					this.trigger('tilespacing-refreshed');
				}
			});
			this.on('tiles-refreshed', ()=>{ this.refreshTileSpacing() });
			// TODO: do this by extending this.refreshTiles, delta-modeling style,
			// TODO: rather than reacting to a signal
		}
	};
});
