define([
	'jquery',
	'./util/unique-id.js',
	'./util/nested-flex-grow.js'
], function ($, uniqueID) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-core',
		if: true
	}).modify('tile.prototype');

	plugin.add('populateInnerTilemap', function populateInnerTilemap() {
		if (!this._p_tileCore_tilemap) {
			this._p_tileCore_tilemap = this.dom.tilemap({
				model: this.options.model,
				parent: this
			}).tilemap('instance').then((tilemap) => {
				this.one('destroy', ()=> { tilemap.destroy() });
			});
		}
	});

	plugin.add('construct', function () {
		this._p_tileCore_tilemap = null;

		// support certain DOM-event subscriptions from the tile object itself
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
		this.element.clickNotDrop((event) => {
			event.stopPropagation();
			this.trigger('click-not-drop', event);
		});

		// public access to the HTML element
		var _domContent = this.element;
		Object.defineProperty(this, 'dom', {
			get() { return _domContent },
			set(newDOM) { _domContent = newDOM }
		});

		// an element id for quick lookups
		this.id = uniqueID('tile');
		this.element.attr('id', this.id);

		// inform circuitboard of new tile
		this.circuitboard._registerTile(this);
	});

});
