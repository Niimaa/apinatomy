define(['jquery', './p-tile-maximized.scss'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-maximized',
		require: ['tile-hidden'],
		after: ['tile-hidden'],

		'modify tile.prototype': {

			'add _p_tileMaximized': false,

			'insert construct': function () {

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
							this.closestAncestorByType('tilemap').tiles.forEach((sibling) => {
								if (sibling === this) { return }
								sibling.hidden = true;
							});
						} else if (!newMaximized) {
							this.element.removeClass('maximized')
								.parent().removeClass('maximized');
							this.closestAncestorByType('tilemap').tiles.forEach((sibling) => {
								if (sibling === this) { return }
								sibling.hidden = false;
							});
						}
					}
				});

			}
		}
	});
});
