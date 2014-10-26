define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-open',
		requires: ['tile-core']
	}).modify('Tile.prototype');

	//
	// allow a tile to be `open` (or closed)
	//
	plugin.insert('construct', function () {
		this._p_tileOpen_open = false;

		// the 'open' property
		Object.defineProperty(this, 'open', {
			get() { return this._p_tileOpen_open },
			set(shouldBeOpen) {
				shouldBeOpen = !!shouldBeOpen;
				if (this._p_tileOpen_open !== shouldBeOpen) {
					this._p_tileOpen_open = shouldBeOpen;
					this.trigger('open', this._p_tileOpen_open);
				}
			}
		});

		// when the tile opens, populate the inner tilemap
		this.on('open', (open) => {
			if (open) {
				this.populateInnerTilemap();
			}
		});

		// automatically (un)set the CSS class 'open'
		this.on('open', (open)=> { this.element.toggleClass("open", open) });

		// if you close, all your children close
		this.on('open', (open) => {
			if (!open) {
				this.closestDescendantsByType('tile')
						.forEach((tile) => { tile.open = false });
			}
		});

		// initial 'open' signal
		this.trigger('open', this._p_tileOpen_open);
	});
});
