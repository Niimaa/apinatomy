define(['jquery', './util/bacon-and-eggs.js'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-middleclick-to-maximize',
		requires: ['tile-maximized']
	}).modify('Tile.prototype');


	/* allows a tile to be maximized by middle-clicking on it */
	plugin.insert('construct', function () {

		this.on('click')
				.filter(e => e.which === 2)       // only middle clicks
				.onlyOnceFor('tile-middle-click') // only for the inner-most tile (smart '.stopPropagation')
				.onValue(() => { this.maximized = !this.maximized });

	});


});
