define([
	'jquery',
	'./util/kefir-and-eggs.js',
	'./util/misc.js'
], function ($, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'transition-position-tracking',
		resolves: ['position-tracking', 'tile-grow-when-open']
	});


	/* make sure that positioning is updated during CSS3 transition animations */
	plugin.insert('Tile.prototype.construct', function () {

		this.on('weight').changes().flatMapLatest(
			() => Kefir.animationFrames().takeUntilBy(this.element.asKefirStream('transitionend webkitTransitionEnd').merge(Kefir.later(300)))
		).onValue(() => { this.trigger('reset-positioning') });

	});


});
