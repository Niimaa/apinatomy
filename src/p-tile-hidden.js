define(['jquery', './p-tile-hidden.scss'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-hidden',
		requires: ['tile-open', 'tile-weight']
	}).modify('Tile.prototype');

	/* allows a tile to be `hidden` */
	plugin.insert('construct', function () {

		/* the 'visible' and 'hidden' properties */
		this.newProperty('visible', { initial: true });
		this.newProperty('hidden').plug(this.p('visible').not());
		this.p('visible').plug(this.p('hidden').not());

		/* enact tile hiding on the DOM */
		this.on('hidden').onValue((hidden) => {
			this.open = false;
			if (hidden) {
				this.element.addClass('hidden');
				this.weight = 0;
			} else {
				this.element.removeClass('hidden');
				this.weight = this.weightWhenClosed();
			}
		});

		///* when the tile is destroyed, it is also hidden */ // TODO: we don't need this, right?
		//this.on('destroy').take(1).onValue(() => { this.hidden = true });

		///* when the parent tile is closed, this tile is hidden */ // TODO: we don't need this, right?
		//var parentTile = this.closestAncestorByType('Tile');
		//if (parentTile) { parentTile.on('open').onValue((open) => { this.hidden = !open }) }

	});
});
