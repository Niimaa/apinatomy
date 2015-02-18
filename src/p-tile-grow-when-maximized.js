define([
	'jquery',
	'./util/kefir-and-eggs.js',
	'velocity',
	//'./p-tile-grow-when-maximized.scss'
], function ($, Kefir) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-grow-when-maximized',
		requires: ['tile-maximized']
	}).modify('Tile.prototype');

	/* react to a tile opening or closing by changing its weight accordingly */
	plugin.insert('construct', function () {

		/* create a property that tells if a tile is 'fully maximized', i.e., also the animation is done */
		this.newProperty('fullyMaximized', { settable: false })
			.plug(this.p('maximized').value(false))
			.plug(this.p('maximized').flatMapLatest((open) => {
				if (!open) { return Kefir.never() }
				return this.element
					.asKefirStream('transitionend webkitTransitionEnd') // after a maximizing transition
					.merge(Kefir.later(500))                            // fallback after 500ms
					.take(1).mapTo(true);
			}));

		/* create a property that tells if a tile is 'fully maximized', i.e., also the animation is done */
		this.newProperty('fullyNotMaximized', { settable: false })
			.plug(this.p('maximized').not().value(false))
			.plug(this.p('maximized').not().flatMapLatest((notMaximized) => {
				if (!notMaximized) { return Kefir.never() }
				return this.element
					.asKefirStream('transitionend webkitTransitionEnd') // after a maximizing transition
					.merge(Kefir.later(500))                            // fallback after 500ms
					.take(1).mapTo(true);
			}));

	});
});
