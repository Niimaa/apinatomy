define([
	'jquery',
	'./util/misc.js'
], function ($, U) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'transition-position-tracking',
		resolves: ['position-tracking', 'tile-grow-when-open']
	}).modify('Tile.prototype');

	//
	// make sure that positioning is updated during
	// CSS3 transition animations
	//
	plugin.insert('construct', function () {
		this.on('weight', () => {
			setTimeout(() => {
				var stopUpdatingPosition = U.eachAnimationFrame(() => { this.resetPositioning() });
				this.element.one('transitionend', () => { stopUpdatingPosition() });
			});
		});
	});

});
