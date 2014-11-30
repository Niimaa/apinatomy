define([
	'jquery',
	'bacon',
	'./util/misc.js'
], function ($, Bacon, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'transition-position-tracking',
		resolves: ['position-tracking', 'tile-grow-when-open']
	}).modify('Tile.prototype');


	/* make sure that positioning is updated during CSS3 transition animations */
	plugin.insert('construct', function () {
		this.on('weight', () => {

			U.animationFrames()
					.takeUntil(this.element.asEventStream('transitionend').merge(Bacon.later(500)))
					.onValue(() => { this.resetPositioning() });

		});
	});


});
