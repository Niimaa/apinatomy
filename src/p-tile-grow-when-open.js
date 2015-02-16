define([
	'jquery',
	'./util/kefir-and-eggs.js',
	'./p-tile-grow-when-open.scss'
], function ($, Kefir) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-grow-when-open',
		requires: ['tile-open', 'tile-weight']
	}).modify('Tile.prototype');

	/* default weights for open / closed tiles */
	plugin.add('weightWhenOpen', function () { return this.circuitboard.options.weightWhenOpen || 2 });
	plugin.add('weightWhenClosed', () => 1);

	/* react to a tile opening or closing by changing its weight accordingly */
	plugin.insert('construct', function () {

		/* make the tile grow/shrink based on open-ness */
		this.p('open').onValue((open) => {
			if (open) {
				this.weight = this.weightWhenOpen();
			} else if (this.weight !== 0) {
				this.weight = this.weightWhenClosed();
			}
		});

		/* create a property that tells if a tile is 'fully open', i.e., also the animation is done */
		this.newProperty('fullyOpen', { settable: false })
			.plug(this.p('open').value(false))
			.plug(this.p('open').flatMapLatest((open) => {
				if (!open) { return Kefir.never() }
				return this.element
					.asKefirStream('transitionend webkitTransitionEnd') // after an opening transition
					.merge(Kefir.later(500))                            // fallback after 500ms
					.take(1).mapTo(true);
			}));

		/* create a property that tells if a tile is 'fully open', i.e., also the animation is done */
		this.newProperty('fullyClosed', { settable: false })
			.plug(this.p('open').not().value(false))
			.plug(this.p('open').not().flatMapLatest((closed) => {
				if (!closed) { return Kefir.never() }
				return this.element
					.asKefirStream('transitionend webkitTransitionEnd') // after an opening transition
					.merge(Kefir.later(500))                            // fallback after 500ms
					.take(1).mapTo(true);
			}));

	});
});
