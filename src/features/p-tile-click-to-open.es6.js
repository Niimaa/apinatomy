define(['jquery', '../util/codes.es6.js', '../util/kefir-and-eggs.es6.js'], function ($, {button}) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-click-to-open', {
		requires: ['tile-open']
	}).modify('Tile.prototype');


	/* When a tile is clicked, it is opened/closed. */
	plugin.append('construct', function () {

		this.on('click').which(button.LEFT)
				.skipPropagation('tile-left-click')  // only register this event for the inner-most tile
				.onValue(() => { this.open = !this.open });

	});


});
