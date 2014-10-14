define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-middleclick-to-maximize',
		require: ['tile-maximized'],
		after: ['tile-maximized']
	}).modify('tile.prototype');

	//
	// allows a tile to be maximized by middle-clicking on it
	//
	plugin.insert('construct', function () {
		this.on('click', function (event) {
			if (event.which !== 2) { return }
			this.maximized = !this.maximized;
		});
	});
});
