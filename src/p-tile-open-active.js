define(['jquery', './util/handle-premature-plugins.js'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-open-active',
		if: ['tile-open', 'tile-active'],
		after: ['tile-open', 'tile-active'],

		'modify tile.prototype': {
			'insert construct': function () {
				// only interesting if the tile has a model
				if (!this.model) { return; }

				//
				// when a tile is opened, it becomes active
				//
				this.on('open', function (open) {
					if (open) { this.active = true }
				});

				//
				// when a tile is de-activated, it becomes closed
				//
				this.on('active', function (active) {
					if (!active) { this.open = false }
				});
			}
		}
	});
});
