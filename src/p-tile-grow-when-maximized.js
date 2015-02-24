define([
	'jquery',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./util/misc.js',
	'velocity'
], function ($, P, Kefir, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-grow-when-maximized',
		requires: ['tile-maximized']
	}).modify('Tile.prototype');


	plugin.add('growWhenMaximized', function (maximized) {
		/* check current flex-grow for all tile rows */
		this.closestAncestorByType('Tilemap').element.children().each((__, rowElement) => {
			var rowPrevFlexGrow = 0;
			$(rowElement).children().each((__, e) => {
				rowPrevFlexGrow += parseFloat(U.defOr($(e).data('amyFlexGrowTarget'), 1));
			});
			$(rowElement).data('amyPrevFlexGrow', rowPrevFlexGrow);
		});

		/* create animations for every tile except this one */
		var promises = [];
		this.closestAncestorByType('Tilemap').children.filter(t => t !== this).forEach((sibling) => {
			var flexGrowFrom = parseFloat(U.defOr(sibling.element.data('amyFlexGrowTarget'), 1));
			var flexGrowTo = maximized ? 0 :
				(sibling.hidden ? 0 :
					(sibling.open ? sibling.weightWhenOpen() :
						sibling.weightWhenClosed()));
			sibling.element.data('amyFlexGrowTarget', flexGrowTo);
			if (flexGrowTo > 0) {
				sibling.element.css({
					display: 'flex',
					marginRight: '1px'
				});
			}
			promises.push(new P((resolve) => {
				sibling.element.velocity(
					{ flexGrow: [flexGrowTo, flexGrowFrom] },
					{ complete: resolve, duration: 300 }
				);
			}).tap(() => {
				if (flexGrowTo === 0) {
					sibling.element.css({
						display: 'none',
						marginRight: '0'
					});
				}
			}));
		});

		/* create animations for all tile rows */
		this.closestAncestorByType('Tilemap').element.children().each((__, rowElement) => {
			var rowFlexGrowTo = 0;
			$(rowElement).children().each((__, e) => {
				rowFlexGrowTo += parseFloat(U.defOr($(e).data('amyFlexGrowTarget'), 1));
			});
			var rowFlexGrowFrom = $(rowElement).data('amyPrevFlexGrow');
			if (rowFlexGrowTo > 0) {
				$(rowElement).css('display', 'flex');
			}
			if (!maximized) {
				$(rowElement).css('marginBottom', '1px');
			}
			promises.push(new P((resolve) => {
				$(rowElement).velocity(
					{ flexGrow: [rowFlexGrowTo, rowFlexGrowFrom] },
					{ complete: resolve, duration: 300 }
				);
			}).tap(() => {
				if (rowFlexGrowTo === 0) {
					$(rowElement).css('display', 'none');
				}
				if (maximized) {
					$(rowElement).css('marginBottom', '0');
				}
			}));
		});

		if (!maximized) {
			this.element.css('marginRight', '1px');
		}
		return P.all(promises).tap(() => {
			if (maximized) {
				this.element.css('marginRight', '0');
			}
		});
	});


	plugin.insert('construct', function () {
		/* make the tile grow/shrink based on maximized-ness */
		this.p('maximized').changes().onValue((maximized) => {
			this.growWhenMaximized(maximized).then(() => {
				if (maximized) {
					finishedMaximizingBus.emit();
				} else {
					finishedNotMaximizingBus.emit();
				}
			});
		});

		var finishedMaximizingBus    = Kefir.bus();
		var finishedNotMaximizingBus = Kefir.bus();

		/* create a property that tells if a tile is 'fully maximized', i.e., also the animation is done */
		this.newProperty('fullyMaximized', { settable: false, initial: this.maximized })
			.plug(this.p('maximized').value(false))
			.plug(finishedMaximizingBus.mapTo(true));

		/* create a property that tells if a tile is 'fully not maximized', i.e., also the animation is done */
		this.newProperty('fullyNotMaximized', { settable: false, initial: !this.maximized })
			.plug(this.p('maximized').not().value(false))
			.plug(finishedNotMaximizingBus.mapTo(true));
	});


});
