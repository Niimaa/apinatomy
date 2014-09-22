define(['jquery', './amy-util/jquery-static'], function ($) {
	'use strict';

	//
	// define the plugin
	//
	function plugin(/*options = {}*/) {
		return {
			name: 'tile-active',
			after: ['tile-core'],

			'modify tile': {

				'after constructor': function () {
					// only interesting if the tile has a model
					if (!this.model) { return; }

					//
					// put this tile in the queue of potentially active tiles
					//
					$.array(this.model, '_amyActiveTileQueue').push(this);
					this.on('destroy', ()=>{
						var index = this.model._amyActiveTileQueue.indexOf(this);
						this.model._amyActiveTileQueue.splice(index, 1);
					});

					//
					// make the 'active' property available
					//
					Object.defineProperty(this, 'active', {
						get() { return this.model._amyActiveTileQueue[0] === this },
						set(shouldBeActive) {
							if (shouldBeActive) {
								var index = this.model._amyActiveTileQueue.indexOf(this);
								if (index !== 0) {
									this.model._amyActiveTileQueue.splice(index, 1);
									this.model._amyActiveTileQueue.unshift(this);
									this.model._amyActiveTileQueue[1].trigger('active', false);
									this.model._amyActiveTileQueue[0].trigger('active', true);
								}
							} else {
								throw new Error("You can't directly set tile activeness to false.");
							}
						}
					});

					//
					// automatically (un)set the CSS class 'active'
					//
					this.on('active', ()=>{ this.element.toggleClass('active', this.active) });
				}

			}
		};
	}

	//
	// make the plugin available in the `$.circuitboard.p` object
	//
	if (!$.circuitboard) { $.circuitboard = {} }
	if (!$.circuitboard.p) { $.circuitboard.p = {} }
	$.circuitboard.p[plugin().name] = plugin;

	//
	// return the plugin for use by certain package loaders
	//
	return plugin;
});
