define([
	'jquery',
	'./util/misc.js'
], function ($, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core']
	});


	/* position tracking */
	plugin.add('Circuitboard.prototype._p_posTracking_setOffset', U.oncePerStack(function () {

		// This function temporarily undoes all (3D) transformations on the
		// circuitboard and parent to measure the left/top offsets of all artefacts.
		// we're using `e[0].style.transform` instead of `e.css('transform')`,
		// because the jQuery way causes some unexplained side-effects.

		var restoreTransforms = [this.element, this.element.parent()].map((e) => {
			var originalTransform = e[0].style.transform;
			e[0].style.transform = '';
			return () => { e[0].style.transform = originalTransform };
		});
		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});
		restoreTransforms.forEach((restore) => { restore() });

	})).insert('Circuitboard.prototype.construct', function () {

		/* caching offset */
		this._p_posTracking_offset = U.cached({
			retrieve: () => {
				this._p_posTracking_setOffset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		});

		/* define 'position' property */
		U.observable(this, 'position', { initial: new U.Position(0, 0) });

		/* when to trigger a change */
		setTimeout(() => { this._p_posTracking_offset(); this.trigger('position', this.position); });

	}).add('Tilemap.prototype._p_posTracking_setOffset', function () {

		// only to be called by Circuitboard.prototype._p_posTracking_setOffset

		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});

	}).insert('Tilemap.prototype.construct', function () {

		/* caching offset */
		this._p_posTracking_offset = U.cached({
			retrieve: () => {
				this.circuitboard._p_posTracking_setOffset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		});

		/* when to trigger a change */
		setTimeout(() => { this._p_posTracking_offset(); this.trigger('position', this.position); });
		this.parent.on('size', () => { this._p_posTracking_offset() });

		/* define 'position' property */
		var _getPos = () => U.Position.subtract(this._p_posTracking_offset(), this.circuitboard._p_posTracking_offset());
		U.observable(this, 'position', { initial: new U.Position(0, 0) });
		this._p_posTracking_offset.onChange(() => { this.position = _getPos() });

	}).add('Tile.prototype._p_posTracking_setOffset', function () {

		// only to be called by Circuitboard.prototype._p_posTracking_setOffset

		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});

	}).insert('Tile.prototype.construct', function () {

		/* caching offset */
		this._p_posTracking_offset = U.cached({
			retrieve: () => {
				this.circuitboard._p_posTracking_setOffset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		});

		/* when to trigger a change */
		setTimeout(() => { this._p_posTracking_offset(); this.trigger('position', this.position); });
		this.on('weight', () => { this._p_posTracking_offset() });
		this.parent.on('position', () => { this._p_posTracking_offset() });
		this.parent.on('size', () => { this._p_posTracking_offset() });
		this.parent.on('reorganize', () => { this._p_posTracking_offset() });

		/* define 'position' property */
		var _getPos = () => U.Position.subtract(this._p_posTracking_offset(), this.circuitboard._p_posTracking_offset());
		U.observable(this, 'position', { initial: new U.Position(0, 0) });
		this._p_posTracking_offset.onChange(() => { this.position = _getPos() });

	});


	/* size tracking */
	plugin.insert('Circuitboard.prototype.construct', function () {

		/* caching the size */
		this._p_posTracking_size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		/* when to trigger a change */
		setTimeout(() => { this._p_posTracking_size(); this.trigger('size', this.size); });
		(this.options.resizeEvent || U.bind($(window), 'resize'))(() => {
			setTimeout(this._p_posTracking_size);
		});

		/* define 'size' property */
		U.observable(this, 'size', { initial: this._p_posTracking_size() });
		this._p_posTracking_size.onChange((newSize) => { this.size = newSize });

	}).insert('Tilemap.prototype.construct', function () {

		/* caching the size */
		this._p_posTracking_size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		/* when to trigger a change */
		setTimeout(() => { this._p_posTracking_size(); this.trigger('size', this.size); });
		this.parent.on('size', () => { this._p_posTracking_size() });


		/* define 'size' property */
		U.observable(this, 'size', { initial: this._p_posTracking_size() });
		this._p_posTracking_size.onChange((newSize) => { this.size = newSize });

	}).insert('Tile.prototype.construct', function () {

		/* caching the size */
		this._p_posTracking_size = U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		});

		/* when to trigger a change */
		setTimeout(() => { this._p_posTracking_size(); this.trigger('size', this.size); });
		this.on('weight', () => { this._p_posTracking_size() });
		this.parent.on('size', () => { this._p_posTracking_size() });
		this.parent.on('reorganize', () => { this._p_posTracking_size() });


		/* define 'size' property */
		U.observable(this, 'size', { initial: this._p_posTracking_size() });
		this._p_posTracking_size.onChange((newSize) => { this.size = newSize });


		/*  if the size of any tile changes, trigger the `reorganize`     */
		/*  event on the parent tilemap, so that sibling tiles can react  */
		this.on('size', () => { this.parent.trigger('reorganize') });

	});


	/* a method to trigger position / size recheck */
	plugin.add('Tile.prototype.resetPositioning', function () {
		this._p_posTracking_offset();
		this._p_posTracking_size();
	});
});

