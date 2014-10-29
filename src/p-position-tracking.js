define([
	'jquery',
	'./util/misc.js'
], function ($, U) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['circuitboard-core', 'tilemap-core', 'tile-core'],
		requires: ['refresh']
	});

	plugin.insert('Circuitboard.prototype.construct', function () {
		this._p_tilePosition_offset = U.cached({
			retrieve: () => this.element.offset()
		});
		var _size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		// define 'size' property
		Object.defineProperty(this, 'size', {
			get() { return _size() }
		});

		// define 'position' property
		Object.defineProperty(this, 'position', {
			get() { return new U.Position(0, 0) }
		});

		// trigger events
		( this.options.resizeEvent || $(window).resize.bind($(window)) )(() => { setTimeout(_size) });
		_size.onChange((newSize) => { this.trigger('size', newSize) });

		// on refresh
		this.on('refresh', () => { setTimeout(_size) });
	});

	plugin.insert('Tilemap.prototype.construct', function () {
		var _offset = U.cached({
			retrieve: () => this.element.offset(),
			isEqual: U.Position.equals
		});
		var _size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		// define properties
		Object.defineProperty(this, 'position', {
			get() { return U.Position.subtract(_offset(), this.circuitboard._p_tilePosition_offset()) }
		});
		Object.defineProperty(this, 'size', {
			get() { return _size() }
		});

		// trigger events
		this.parent.on('size', () => { _offset(); _size(); });
		_offset.onChange(() => { this.trigger('position', this.position) });
		_size.onChange((newSize) => { this.trigger('size', newSize) });

		// on refresh
		this.on('refresh', () => { setTimeout(_size) });
	});

	plugin.modify('Tile.prototype')
	.add('resetPositioning', function () {
		this._p_positionTracking_offset();
		this._p_positionTracking_size();
	})
	.insert('construct', function () {
		var _offset = this._p_positionTracking_offset = U.cached({
			retrieve: () => this.element.offset(),
			isEqual: U.Position.equals
		});
		var _size = this._p_positionTracking_size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		// define properties
		Object.defineProperty(this, 'position', {
			get() { return U.Position.subtract(_offset(), this.circuitboard._p_tilePosition_offset()) }
		});
		Object.defineProperty(this, 'size', {
			get() { return _size() }
		});

		// trigger events
		this.parent.on('position', _offset);
		this.parent.on('size', () => { _offset(); _size(); });
		this.parent.on('reorganize', () => { _offset(); _size(); });
		this.on('weight', () => { _offset(); _size(); });
		_offset.onChange(() => { this.trigger('position', this.position) });
		_size.onChange((newSize) => { this.trigger('size', newSize) });

		// if the size of any tile changes, trigger the `reorganize`
		// event on the parent tilemap, so that sibling tiles can react
		this.on('size', () => { this.parent.trigger('reorganize') });

		// on refresh
		this.on('refresh', () => { setTimeout(_size) });
	});
});
