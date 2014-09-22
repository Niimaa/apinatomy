define(['jquery', './amy-util/jquery-static.js', './amy-circuitboard.js'], function ($) {
	'use strict';

	//
	// expect $.circuitboard to be defined
	//
	if (!$.circuitboard) {
		throw Error(
				"Can't access '$.circuitboard'. " +
				"Please load the core circuitboard module before loading any plugins."
		);
	}

	//
	// define the plugin
	//
	$.circuitboard.plugin({
		name: 'tile-open-active',
		if: ['tile-open', 'tile-active'],
		after: ['tile-open', 'tile-active'],

		'modify tile': {
			'after constructor': function () {
				// only interesting if the tile has a model
				if (!this.model) { return; }

				//
				// when a tile is opened, it becomes active
				//
				this.on('open', function () {
					if (this.open) { this.active = true }
				});

				//
				// when a tile is de-activated, it becomes closed
				//
				this.on('active', function () {
					if (!this.active) { this.open = false }
				});
			}
		}
	});
});
