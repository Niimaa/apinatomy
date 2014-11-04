define([
	'jquery',
	'./util/misc.js'
], function ($, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core'],
		requires: ['refresh']
	});


	/* offset tracking */
	plugin.insert('Circuitboard.prototype.construct', function () {
		this._p_posTracking_offset = U.cached({
			retrieve: () => {
				// we're using `e[0].style.transform` instead of `e.css('transform')`,
				// because the jQuery way gives some unexplained side-effects
				var restoreTransforms = [this.element, this.element.parent()].map((e) => {
					var originalTransform = e[0].style.transform;
					e[0].style.transform = '';
					return () => { e[0].style.transform = originalTransform };
				});
				var result = this.element.offset();
				this.children.forEach((c) => {
					if (c._p_posTracking_setOffset) {
						c._p_posTracking_setOffset();
					}
				});
				restoreTransforms.forEach((restore) => { restore() });
				return result;
			},
			isEqual: U.Position.equals
		});
	}).add('Tilemap.prototype._p_posTracking_setOffset', function () {
		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});
	}).insert('Tilemap.prototype.construct', function () {
		this._p_posTracking_offset = U.cached({
			retrieve: () => {
				this.circuitboard._p_posTracking_offset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		});
	}).add('Tile.prototype._p_posTracking_setOffset', function () {
		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});
	}).insert('Tile.prototype.construct', function () {
		this._p_posTracking_offset = U.cached({
			retrieve: () => {
				this.circuitboard._p_posTracking_offset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		});
	});







	/* circuitboard */
	plugin.insert('Circuitboard.prototype.construct', function () {

		/* keeping track of the metrics */
		this._p_posTracking_size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		/* define 'size' property */
		Object.defineProperty(this, 'size', {
			get() { return this._p_posTracking_size() }
		});

		/* define 'position' property */
		Object.defineProperty(this, 'position', {
			get() { return new U.Position(0, 0) }
		});

		/* trigger events */
		( this.options.resizeEvent || U.bind($(window), 'resize') )(() => { setTimeout(this._p_posTracking_size) });
		this._p_posTracking_size.onChange((newSize) => { this.trigger('size', newSize) });

		/* on refresh */
		this.on('refresh', () => { setTimeout(this._p_posTracking_size) });

	});


	/* tilemap */
	plugin.insert('Tilemap.prototype.construct', function () {

		/* keeping track of the metrics */
		var _size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		/* define properties */
		Object.defineProperty(this, 'position', {
			get() { return U.Position.subtract(
					this._p_posTracking_offset(),
					this.circuitboard._p_posTracking_offset()
			) }
		});
		Object.defineProperty(this, 'size', {
			get() { return _size() }
		});

		/* trigger events */
		this.parent.on('size', () => {
			this._p_posTracking_offset();
			_size();
		});
		this._p_posTracking_offset.onChange(() => { this.trigger('position', this.position) });
		_size.onChange((newSize) => { this.trigger('size', newSize) });

		/* on refresh */
		this.on('refresh', () => { setTimeout(_size) });

	});


	/* tile */
	plugin.modify('Tile.prototype').add('resetPositioning', function () {

		this._p_posTracking_offset();
		this._p_posTracking_size();

	}).insert('construct', function () {

		/* keeping track of the metrics */
		var _size = this._p_posTracking_size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		/* define properties */
		Object.defineProperty(this, 'position', {
			get() { return U.Position.subtract(
					this._p_posTracking_offset(),
					this.circuitboard._p_posTracking_offset()
			) }
		});
		Object.defineProperty(this, 'size', {
			get() { return _size() }
		});

		/* trigger events */
		this.parent.on('position', this._p_posTracking_offset);
		this.parent.on('size', () => {
			this._p_posTracking_offset();
			_size();
		});
		this.parent.on('reorganize', () => {
			this._p_posTracking_offset();
			_size();
		});
		this.on('weight', () => {
			this._p_posTracking_offset();
			_size();
		});
		this._p_posTracking_offset.onChange(() => { this.trigger('position', this.position) });
		_size.onChange((newSize) => { this.trigger('size', newSize) });

		/*  if the size of any tile changes, trigger the `reorganize`     */
		/*  event on the parent tilemap, so that sibling tiles can react  */
		this.on('size', () => { this.parent.trigger('reorganize') });

		/* on refresh */
		this.on('refresh', () => { setTimeout(_size) });

	});
});
