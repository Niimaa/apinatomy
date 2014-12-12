define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-middleclick-to-maximize',
		requires: ['tile-maximized']
	}).modify('Tile.prototype');


	/* allows a tile to be maximized by middle-clicking on it */
	plugin.insert('construct', function () {

		this.on('click').filter((e) => e.which === 2).onValue(() => { this.maximized = !this.maximized });

	});


});
