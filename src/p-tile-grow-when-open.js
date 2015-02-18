define([
	'jquery',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'velocity',
	//'./p-tile-grow-when-open.scss'
], function ($, P, Kefir) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-grow-when-open',
		requires: ['tile-open']
	}).modify('Tile.prototype');

	/* default weights for open / closed tiles */
	plugin.modify('Tile.prototype')
		.add('weightWhenOpen', function () { return this.circuitboard.options.weightWhenOpen || 2 })
		.add('weightWhenClosed', () => 1);

	/* default DOM manipulation */
	plugin.add('Tile.prototype.growWhenOpen', function (open) {
		var flexGrowFrom = parseFloat(this.element.data('amyFlexGrowTarget') || 1);
		var flexGrowTo = open ? this.weightWhenOpen() : this.weightWhenClosed();
		this.element.data('amyFlexGrowTarget', flexGrowTo);
		var rowFlexGrowTo = 0;
		this.element.parent().children().each(function () {
			rowFlexGrowTo += parseFloat($(this).data('amyFlexGrowTarget') || 1);
		});
		var rowFlexGrowFrom = rowFlexGrowTo - flexGrowTo + flexGrowFrom;
		return P.all([
			new P((resolve) => {
				this.element.velocity(
					{ flexGrow: [flexGrowTo, flexGrowFrom] },
					{ complete: resolve, duration: 300 }
				);
			}), new P((resolve) => {
				this.element.parent().velocity(
					{ flexGrow: [rowFlexGrowTo, rowFlexGrowFrom] },
					{ complete: resolve, duration: 300 }
				);
			})
		]);
	});

	/* react to a tile opening or closing by changing its weight accordingly */
	plugin.insert('Tile.prototype.construct', function () {

		/* make the tile grow/shrink based on open-ness */
		this.p('open').changes().onValue((open) => {
			this.growWhenOpen(open).then(() => {
				if (open) {
					finishedOpeningBus.emit();
				} else {
					finishedClosingBus.emit();
				}
			});
		});

		var finishedOpeningBus = Kefir.bus();
		var finishedClosingBus = Kefir.bus();

		/* create a property that tells if a tile is 'fully open', i.e., also the animation is done */
		this.newProperty('fullyOpen', { settable: false })
			.plug(this.p('open').value(false))
			.plug(finishedOpeningBus.mapTo(true));

		/* create a property that tells if a tile is 'fully open', i.e., also the animation is done */
		this.newProperty('fullyClosed', { settable: false })
			.plug(this.p('open').not().value(false))
			.plug(finishedClosingBus.mapTo(true));

	});
});
