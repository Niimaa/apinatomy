define(['jquery', './util/bacon-and-eggs.js'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-click-to-open',
		requires: ['tile-open']
	}).modify('Tile.prototype');


	/* When a tile is clicked, it is opened/closed. */
	plugin.insert('construct', function () {

		this.on('click')
				.filter(e => e.which === 1)     // only left clicks
				.onlyOnceFor('tile-left-click') // only for the inner-most tile (smart '.stopPropagation')
				.onValue(() => { this.open = !this.open });

	});


});
