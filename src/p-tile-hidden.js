define(['jquery', './p-tile-hidden.scss'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-hidden',
		requires: ['tile-open', 'tile-weight']
	}).modify('Tile.prototype');

	/* allows a tile to be `hidden` */
	plugin.insert('construct', function () {

		this.newObservable('hidden', {
			initial: false,
			validation: (v) => !!v
		});

		this.observe('hidden', (hidden) => {
			this.open = false;
			if (hidden) {
				this.element.addClass('hidden');
				this.weight = 0;
			} else {
				this.element.removeClass('hidden');
				this.weight = this.weightWhenClosed();
			}
		});

		var parentTile = this.closestAncestorByType('Tile');
		if (parentTile) {
			parentTile.observe('open', (open) => {
				this.hidden = !open;
			});
		}

	});
});
