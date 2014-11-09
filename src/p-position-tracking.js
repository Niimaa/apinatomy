define(['jquery', './util/misc.js'], function ($, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core']
	});


	/* private methods for calculating and caching element offset */
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
		restoreTransforms.forEach(U.call);

	})).insert('Tilemap.prototype.construct', function () {

		this.circuitboard._p_posTracking_setOffset.allowAdditionalCall();

	}).insert('Tile.prototype.construct', function () {

		this.circuitboard._p_posTracking_setOffset.allowAdditionalCall();

	}).add('Tilemap.prototype._p_posTracking_setOffset', function () {

		// only to be called (indirectly) by Circuitboard.prototype._p_posTracking_setOffset

		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});

	}).add('Tile.prototype._p_posTracking_setOffset', function () {

		// only to be called (indirectly) by Circuitboard.prototype._p_posTracking_setOffset

		this._p_posTracking_offset_cache = this.element.offset();
		this.children.forEach((c) => {
			if (c._p_posTracking_setOffset) {
				c._p_posTracking_setOffset();
			}
		});

	});


	/* the 'offset' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newObservable('offset');

		((cache) => {
			this.offset = cache();
			setInterval(cache, 100); // TODO: find the proper way to keep this updated
			cache.onChange((newOffset) => { this.offset = newOffset });
			this.on('reset-positioning', cache);
		})(U.cached({
			retrieve: () => {
				this._p_posTracking_setOffset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		}));

	}).insert('Tilemap.prototype.construct', function () {

		this.newObservable('offset');

		((cache) => {
			this.offset = cache();
			setInterval(cache, 100); // TODO: find the proper way to keep this updated
			cache.onChange((newOffset) => { this.offset = newOffset });
			this.parent.observe('size', cache);
			this.parent.on('offset', cache);
			this.on('reset-positioning', cache);
		})(U.cached({
			retrieve: () => {
				this.circuitboard._p_posTracking_setOffset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		}));

	}).insert('Tile.prototype.construct', function () {

		this.newObservable('offset');

		((cache) => {
			this.offset = cache();
			setInterval(cache, 100); // TODO: find the proper way to keep this updated
			cache.onChange((newOffset) => { this.offset = newOffset });
			this.on('weight', cache);
			this.parent.on('size', cache);
			this.parent.on('reorganize', cache);
			this.parent.on('offset', cache);
			this.on('reset-positioning', cache);
		})(U.cached({
			retrieve: () => {
				this.circuitboard._p_posTracking_setOffset();
				return this._p_posTracking_offset_cache;
			},
			isEqual: U.Position.equals
		}));

	});


	/* the 'position' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		// for completeness sake; it's (0, 0) by definition
		this.newObservable('position', { initial: new U.Position(0, 0) });

	}).insert('Tilemap.prototype.construct', function () {

		this.newObservable('position');

		((setPosition) => {
			setPosition();
			this.on('offset', setPosition);
			this.circuitboard.on('offset', setPosition);
		})(() => {
			this.position = U.Position.subtract(this.offset, this.circuitboard.offset);
		});

	}).insert('Tile.prototype.construct', function () {

		this.newObservable('position');

		((setPosition) => {
			setPosition();
			this.on('offset', setPosition);
			this.circuitboard.on('offset', setPosition);
		})(() => {
			this.position = U.Position.subtract(this.offset, this.circuitboard.offset);
		});

	});


	/* the 'size' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newObservable('size');

		((cache) => {
			this.size = cache();
			setInterval(cache, 100); // TODO: find the proper way to keep this updated
			cache.onChange((newSize) => { this.size = newSize });
			( this.options.resizeEvent || U.bind($(window), 'resize') )(cache);
			this.on('reset-positioning', cache);
		})(U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		}));

	}).insert('Tilemap.prototype.construct', function () {

		this.newObservable('size');

		((cache) => {
			this.size = cache();
			setInterval(cache, 100); // TODO: find the proper way to keep this updated
			cache.onChange((newSize) => { this.size = newSize });
			this.parent.on('size', cache);
			this.on('reset-positioning', cache);
		})(U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		}));

	}).insert('Tile.prototype.construct', function () {

		this.newObservable('size');

		((cache) => {
			this.size = cache();
			setInterval(cache, 100); // TODO: find the proper way to keep this updated
			cache.onChange((newSize) => { this.size = newSize });
			this.on('weight', cache);
			this.parent.on('size', cache);
			this.parent.on('reorganize', cache);
			this.on('reset-positioning', cache);
		})(U.cached({
			retrieve: () => new U.Size(this.element.height(), this.element.width()),
			isEqual: U.Size.equals
		}));

	});


	/*  if the size of any tile changes, trigger the 'reorganize'     */
	/*  event on the parent tilemap, so that sibling tiles can react  */
	plugin.insert('Tile.prototype.construct', function () {

		this.on('size', () => { this.parent.trigger('reorganize') });

	});


	/* a method to trigger position/size recheck */
	plugin.add('Tile.prototype.resetPositioning', function () {

		this.trigger('reset-positioning');

	});

});

