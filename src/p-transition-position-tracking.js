define([
	'jquery',
	'./util/bacon-and-eggs.js',
	'./util/misc.js'
], function ($, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'transition-position-tracking',
		resolves: ['position-tracking', 'tile-grow-when-open', 'animation-loop']
	});


	/* make sure that positioning is updated during CSS3 transition animations */
	plugin.insert('Tile.prototype.construct', function () {
		this.on('weight', () => {

			this.circuitboard.on('animation-frame')
					.takeUntil(this.element.asEventStream('transitionend').merge(Bacon.later(500)))
					.onValue(() => { this.resetPositioning() });

		});
	});


});
