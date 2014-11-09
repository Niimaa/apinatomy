define(['jquery', './p-tile-hidden.scss'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-hidden',
		requires: ['tile-open', 'tile-weight']
	}).modify('Tile.prototype');

	/* allows a tile to be `hidden` */
	plugin.insert('construct', function () {

		/* the 'hidden' observable */
		this.newObservable('hidden', {
			initial: false,
			validation: (v) => !!v
		});

		/* the 'visible' observable */
		this.newObservable('visible', {
			initial: !this.hidden,
			validation: (v) => !!v
		});

		/* the two are continual opposites */
		this.on('hidden', (hidden) => { this.visible = !hidden });
		this.on('visible', (visible) => { this.hidden = !visible });

		/* enact tile hiding on the DOM */
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

		/* when the tile is destroyed, it is also hidden */
		this.one('destroy', () => { this.hidden = true });

		/* when the parent tile is closed, this tile is hidden */
		var parentTile = this.closestAncestorByType('Tile');
		if (parentTile) {
			parentTile.observe('open', (open) => {
				this.hidden = !open;
			});
		}

	});
});
