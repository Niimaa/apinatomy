define([
	'jquery',
	'./util/bacon-and-eggs.js',
	'./util/misc.js'
], function ($, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'transition-position-tracking',
		requires: ['animation-loop'],
		resolves: ['position-tracking', 'tile-grow-when-open']
	});


	/* make sure that positioning is updated during CSS3 transition animations */
	plugin.insert('Tile.prototype.construct', function () {

		this.on('weight').changes().flatMapLatest(
			() => Bacon.animationFrames().takeUntil(this.element.asEventStream('transitionend webkitTransitionEnd'))
		).onValue(() => { this.trigger('reset-positioning') });

	});


});
