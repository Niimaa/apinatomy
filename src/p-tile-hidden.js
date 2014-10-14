define(['jquery', './p-tile-hidden.scss'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-hidden',
		require: ['tile-open', 'tile-weight'],
		after: ['tile-open', 'tile-weight'],

		'modify tile.prototype': {

			'add _p_tileHidden': false,

			'insert construct': function () {

				Object.defineProperty(this, 'hidden', {
					get() {
						return this._p_tileHidden;
					},
					set(newHidden) {
						if (newHidden === this._p_tileHidden) { return }

						this._p_tileHidden = newHidden;

						if (newHidden) {
							this.element.addClass('hidden');
							this.open = false; // first close the tile, then set weight to 0
							this.weight = 0;   // (because the `open` property may reset the `weight`)
						} else {
							this.element.removeClass('hidden');
							this.weight = this.weightWhenClosed();
						}

						this.trigger('hidden', newHidden);
					}

				});

			}
		}
	});
});
