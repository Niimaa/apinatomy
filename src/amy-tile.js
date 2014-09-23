define([
	'jquery',
	'./amy-util/widget.js',
	'./amy-cb-plugins.js',
	'./amy-util/jquery-instance.js'
], function ($, amyWidget) {
	'use strict';

	//
	// declare the tile widget
	//
	amyWidget('tile', 'tile', {
		cssClass: 'tile',
		model: null,
		_circuitboard: null
	});

	//
	// define the tile constructor as the 'core' plugin
	//
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
				// the inner tilemap
				//
				var _tilemap = null;
				$.extend(this, {
					populateInnerTilemap() {
						if (!_tilemap) {
							_tilemap = this.dom.tilemap({
								model: this.options.model,
								_circuitboard: this.options._circuitboard
							}).tilemap('instance');
							this.one('destroy', ()=> { _tilemap.destroy() });
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
