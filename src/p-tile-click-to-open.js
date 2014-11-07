define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-click-to-open',
		requires: ['tile-open']
	}).modify('Tile.prototype');


	/* When a tile is clicked, it is opened/closed. */
	plugin.insert('construct', function () {
		this.on('click-not-drop', function (event) {
			if (event.which !== 1) { return }
			this.open = !this.open;
		});
	});


});
