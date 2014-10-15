define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-open-active',
		if: ['tile-open', 'tile-active'],
		after: ['tile-open', 'tile-active']
	}).modify('Tile.prototype');

	//
	// makes a tile active when it is open,
	// and closes tiles that are deactivated
	//
	plugin.insert('construct', function () {
		// only interesting if the tile has an `active` property
		if (!this.model) { return; }

		// when a tile is opened, it becomes active
		this.on('open', function (open) {
			if (open) { this.active = true }
		});

		// when a tile is de-activated, it becomes closed
		this.on('active', function (active) {
			if (!active) { this.open = false }
		});
	});

});
