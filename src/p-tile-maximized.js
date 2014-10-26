define(['jquery', './p-tile-maximized.scss'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-maximized',
		requires: ['tile-hidden']
	}).modify('Tile.prototype');

	//
	// allows a tile to be `maximized` (by hiding all other tiles)
	//
	plugin.insert('construct', function () {
		this._p_tileMaximized = false;

		Object.defineProperty(this, 'maximized', {
			get() {
				return this._p_tileMaximized;
			},
			set(newMaximized) {
				if (newMaximized === this._p_tileMaximized) { return }

				this._p_tileMaximized = newMaximized;

				if (newMaximized) {
					this.element.addClass('maximized')
							.parent().addClass('maximized');
					this.closestAncestorByType('Tilemap').tiles.forEach((sibling) => {
						if (sibling === this) { return }
						sibling.hidden = true;
					});
				} else if (!newMaximized) {
					this.element.removeClass('maximized')
							.parent().removeClass('maximized');
					this.closestAncestorByType('Tilemap').tiles.forEach((sibling) => {
						if (sibling === this) { return }
						sibling.hidden = false;
					});
				}
			}
		});

	});

});
