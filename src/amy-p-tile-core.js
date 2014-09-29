define([
	'jquery',
	'./amy-util/unique-id.js',
	'./amy-util/jquery-instance.js',
	'./amy-util/handle-premature-plugins.js'
], function ($, uniqueID) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-core',
		if: true,
		'modify tile': {
			'insert constructor': function () {
				//
				// support certain DOM-event subscriptions from the tile object itself
				//
				$.each(['click', 'mouseover', 'mouseout'], (index, signal) => {
					this.element.on(signal, (event) => {
						event.stopPropagation();
						this.trigger(signal, event);
					});
				});
				$.each(['mouseenter', 'mouseleave'], (index, signal) => {
					this.element.on(signal, (event) => {
						this.trigger(signal, event);
					});
				});

				//
				// public access to the HTML element
				//
				var _domContent = this.element;
				Object.defineProperty(this, 'dom', {
					get() { return _domContent },
					set(newDOM) { _domContent = newDOM }
				});

				//
				// the 'weight' property
				//
				var _weight = 1;
				Object.defineProperty(this, 'weight', {
					get() { return _weight },
					set(newWeight) {
						// TODO: allow Infinity
						_weight = newWeight;
						this.element.amyNestedFlexGrow(newWeight);
					}
				});

				//
				// an element id for quick lookups
				//
				this.id = uniqueID('tile');
				this.element.attr('id', this.id);

				//
				// the inner tilemap
				//
				var _tilemap = null;
				$.extend(this, {
					populateInnerTilemap() {
						if (!_tilemap) {
							_tilemap = this.dom.tilemap({
								model: this.options.model,
								_circuitboard: this.options._circuitboard
							}).tilemap('instance').then((tilemap) => {
								tilemap.parent = this;
								this.one('destroy', ()=> { tilemap.destroy() });
							});
						}
					}
				});

				//
				// inform circuitboard of new tile
				//
				this.circuitboard._registerTile(this);
			}
		}
	});

});
