define([
	'jquery',
	'./util/misc.js'
], function ($, U) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'refresh',
		expects: ['core']
	});

	['Tile', 'Tilemap', 'Circuitboard'].forEach((cls) => {

		plugin.add(`${cls}.prototype.refresh`, function () {
			this.trigger('refresh');
			(this.children || []).forEach((child) => {
				if (typeof child.refresh === 'function') {
					child.refresh();
				}
			});
		});

	});

});
