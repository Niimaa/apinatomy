define([
	'jquery',
	'bluebird',
	'../util/kefir-and-eggs.es6.js',
	'../util/misc.es6.js',
	'velocity'
], function ($, P, Kefir, U) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-shrink-when-hidden', {
		requires: ['tile-hidden']
	}).modify('Tile.prototype');


	/* default DOM manipulation */
	plugin.add('shrinkWhenHidden', function (hidden) {
		let flexGrowFrom = parseFloat(U.defOr(this.element.data('amyFlexGrowTarget'), 1));
		let flexGrowTo = hidden ? 0 : (this.open ? this.weightWhenOpen() : this.weightWhenClosed());
		this.element.data('amyFlexGrowTarget', flexGrowTo);
		let rowFlexGrowTo = 0;
		this.element.parent().children()
			.each(function () { rowFlexGrowTo += parseFloat(U.defOr($(this).data('amyFlexGrowTarget'), 1)) });
		let rowFlexGrowFrom = rowFlexGrowTo - flexGrowTo + flexGrowFrom;
		if (flexGrowTo    > 0) { this.element         .css('display', 'flex') }
		if (rowFlexGrowTo > 0) { this.element.parent().css('display', 'flex') }
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
		]).tap(() => {
			if (flexGrowTo    === 0) { this.element         .css('display', 'none') }
			if (rowFlexGrowTo === 0) { this.element.parent().css('display', 'none') }
		});
	});


	/* react to a tile opening or closing by changing its weight accordingly */
	plugin.append('construct', function () {

		/* make the tile grow/shrink based on hidden-ness */
		this.p('hidden').changes().onValue((hidden) => {
			this.shrinkWhenHidden(hidden).then(() => {
				if (hidden) {
					finishedHidingBus.emit();
				} else {
					finishedShowingBus.emit();
				}
			});
		});

		var finishedHidingBus  = Kefir.bus();
		var finishedShowingBus = Kefir.bus();

		/* create a property that tells if a tile is 'fully open', i.e., also the animation is done */
		this.newProperty('fullyHidden', { settable: false, initial: this.hidden })
			.plug(this.p('hidden').value(false))
			.plug(finishedHidingBus.mapTo(true));

		/* create a property that tells if a tile is 'fully open', i.e., also the animation is done */
		this.newProperty('fullyVisible', { settable: false, initial: !this.hidden })
			.plug(this.p('hidden').not().value(false))
			.plug(finishedShowingBus.mapTo(true));

	});
});
