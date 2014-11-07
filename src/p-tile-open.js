define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-open',
		requires: ['core']
	}).modify('Tile.prototype');


	/* allow a tile to be `open` (or closed) */
	plugin.insert('construct', function () {

		/* the 'open' observable */
		this.newObservable('open', {
			initial: false,
			validation: (v) => !!v
		});

		/* when the tile opens, populate the inner tilemap */
		this.observe('open', (open) => {
			if (open) { this.populateInnerTilemap() }
		});

		/* manage the CSS class 'open' */
		this.observe('open', (open) => { this.element.toggleClass("open", open) });

		/* if this tile closes, all its children close */
		this.observe('open', (open) => {
			if (!open) {
				this.closestDescendantsByType('tile')
						.forEach((tile) => { tile.open = false });
			}
		});

	});
});
