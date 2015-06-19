define(['jquery', '../util/misc.es6.js', './p-tile-hidden.scss'], function ($, U) {
	'use strict';

	var plugin = $.circuitboard.plugin.do('tile-hidden', {
		requires: ['tile-open']
	}).modify('Tile.prototype');

	/* allows a tile to be `hidden` */
	plugin.append('construct', function () {



		/* the 'visible' and 'hidden' properties */
		this.newProperty('visible', { initial: U.defOr(this.circuitboard.options.initialTileVisibility, true) });
		this.newProperty('hidden').plug(this.p('visible').not());
		this.p('visible').plug(this.p('hidden').not());


		/* set initial visibility */
		if (this.hidden) {
			var flexGrowTo = 0;
			this.element.data('amyFlexGrowTarget', flexGrowTo);
			this.element.css('display', 'none');
			this.element.css('flexGrow', flexGrowTo);
			var rowFlexGrowTo = 0;
			this.element.parent().children()
				.each(function () { rowFlexGrowTo += parseFloat(U.defOr($(this).data('amyFlexGrowTarget'), 0)) });
			this.element.parent().css('flexGrow', rowFlexGrowTo);
			if (rowFlexGrowTo > 0) {
				this.element.parent().css('display', 'flex');
			} else {
				this.element.parent().css('display', 'none');
			}
		}


		/* enact tile hiding on the DOM */
		this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue((hidden) => {

			this.element.toggleClass('hidden', hidden);

			///* assign the .right-most class */
			//let ch = this.element.parent().children().filter(`:not(.hidden)`);
			//ch.removeClass('right-most');
			//ch.last().addClass('right-most');
		});

	});
});
