define(['jquery', './util/misc.js', './util/handle-premature-plugins.js'], function ($, U) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-active',
		after: ['tile-core'],

		'modify tile': {
			'insert constructor': function () {
				//
				// only interesting if the tile has a model
				//
				if (!this.model) { return }

				//
				// put this tile in the queue of potentially active tiles
				//
				U.array(this.model, '_p_tileActive_amyActiveTileQueue').push(this);
				this.on('destroy', ()=> {
					var index = this.model._p_tileActive_amyActiveTileQueue.indexOf(this);
					this.model._p_tileActive_amyActiveTileQueue.splice(index, 1);
				});

				//
				// make the 'active' property available
				//
				Object.defineProperty(this, 'active', {
					get() { return this.model._p_tileActive_amyActiveTileQueue[0] === this },
					set(shouldBeActive) {
						if (shouldBeActive) {
							var index = this.model._p_tileActive_amyActiveTileQueue.indexOf(this);
							if (index !== 0) {
								this.model._p_tileActive_amyActiveTileQueue.splice(index, 1);
								this.model._p_tileActive_amyActiveTileQueue.unshift(this);
								this.model._p_tileActive_amyActiveTileQueue[1].trigger('active', false);
								this.model._p_tileActive_amyActiveTileQueue[0].trigger('active', true);
							}
						} else {
							throw new Error("You can't directly set tile activeness to false.");
						}
					}
				});

				//
				// automatically (un)set the CSS class 'active'
				//
				this.on('active', () => { this.element.toggleClass('active', this.active) });

				//
				// initial 'active' signal
				//
				this.trigger('active', this.active);
			}
		}
	});
});