define(['jquery', './amy-util/handle-premature-plugins.js'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-open',
		after: ['tile-core'],

		'modify tile': {
			'insert constructor': function () {
				//
				// the 'open' property
				//
				var _open = false;
				Object.defineProperty(this, 'open', {
					get() { return _open },
					set(shouldBeOpen) {
						shouldBeOpen = !!shouldBeOpen;
						if (_open !== shouldBeOpen) {
							_open = shouldBeOpen;
							this.trigger('open', _open);
						}
					}
				});

				//
				// when the tile opens, populate the inner tilemap
				//
				this.on('open', (open) => {
					if (open) {
						this.populateInnerTilemap();
					}
				});

				//
				// automatically (un)set the CSS class 'open'
				//
				this.on('open', (open)=>{ this.element.toggleClass("open", open) });

				//
				// if you close, all your children close
				//
				this.on('open', (open) => {
					if (!open) {
						this.closestDescendantsByType('tile')
							.forEach((tile) => { tile.open = false });
					}
				});

				//
				// initial 'open' signal
				//
				this.trigger('open', _open);
			}
		}
	});
});