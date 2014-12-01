define(['jquery', './util/misc.js'], function ($, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-open-active',
		resolves: ['tile-open', 'tile-active']
	}).modify('Tile.prototype');


	/* makes a tile active when it is open, and closes tiles that are deactivated */
	plugin.insert('construct', function () {

		/* only interesting if the tile has an `active` property */
		if (U.isUndefined(this.active)) { return; }

		/* when a tile is opened, it becomes active */
		this.on('open', true, () => { this.active = true });

		/* when a tile is de-activated, it becomes closed */
		this.on('active', false, () => { this.open = false });

	});


});
