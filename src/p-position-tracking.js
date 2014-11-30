define(['jquery', './util/misc.js', 'bacon'], function ($, U, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core']
	});


	/* private methods for calculating and caching element offset */
	plugin.insert('Circuitboard.prototype.construct', function () {

		var PACING = U.animationFrames().merge(Bacon.once());

		var limiter = new Bacon.Bus();
		var windowWanted = false;
		PACING.filter(() => windowWanted).onValue(() => {
			/* setup: temporarily undoes all (3D) transformations on the circuitboard */
			var restoreTransforms = [this.element, this.element.parent()].map((e) => {
				// we're using `e[0].style.transform` instead of `e.css('transform')`,
				// because the jQuery way causes some unexplained side-effects.
				var originalTransform = e[0].style.transform;
				e[0].style.transform = '';
				return () => { e[0].style.transform = originalTransform };
			});

			/* the window for computing any tile's offset */
			console.log('<window>'); // TODO: remove
			limiter.push();
			windowWanted = false;
			console.log('</window>'); // TODO: remove

			/* breakdown: restore the (3D) transformations */
			restoreTransforms.forEach(U.call);
		});

		this._p_posTracking_offsetLimiter = function (...pacing) {
			pacing = Bacon.mergeAll(pacing);
			var wantBus = new Bacon.Bus();
			var want = wantBus.skipDuplicates().toProperty(false);
			wantBus.plug(pacing.map(true));
			pacing.onValue(() => { windowWanted = true });

			var resultBus = new Bacon.Bus();

			limiter.filter(want).onValue(() => {
				console.log('--- computation'); // TODO: remove
				resultBus.push();
				wantBus.push(false);
			});

			return resultBus;
		};

	});


	/* the 'offset' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('offset', {
			source: this._p_posTracking_offsetLimiter(
					Bacon.once(),
					Bacon.interval(100), // TODO: find the proper way to keep this updated
					this.on('reset-positioning')
			).map(() => this.element.offset()).log('----------'),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

		console.log('==========', this.offset);

		//((cache) => {
		//	this.offset = cache();
		//	setInterval(cache, 100);
		//	cache.onChange((newOffset) => { this.offset = newOffset });
		//	this.on('reset-positioning', cache);
		//})(U.cached({
		//	retrieve: () => {
		//		this._p_posTracking_setOffset();
		//		return this._p_posTracking_offset_cache;
		//	},
		//	isEqual: U.Position.equals
		//}));

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('offset', {
			source: this.circuitboard._p_posTracking_offsetLimiter(
					Bacon.once(),
					Bacon.interval(100), // TODO: find the proper way to keep this updated
					this.parent.on('size'),
					this.parent.on('offset'),
					this.on('reset-positioning')
			).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

		//this.newProperty('offset');
		//
		//((cache) => {
		//	this.offset = cache();
		//	setInterval(cache, 100);
		//	cache.onChange((newOffset) => { this.offset = newOffset });
		//	this.parent.on('size', cache);
		//	this.parent.on('offset', cache);
		//	this.on('reset-positioning', cache);
		//})(U.cached({
		//	retrieve: () => {
		//		this.circuitboard._p_posTracking_setOffset();
		//		return this._p_posTracking_offset_cache;
		//	},
		//	isEqual: U.Position.equals
		//}));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('offset', {
			source: this.circuitboard._p_posTracking_offsetLimiter(
					Bacon.once(),
					Bacon.interval(100), // TODO: find the proper way to keep this updated
					this.parent.on('size'),
					this.parent.on('offset'),
					this.parent.on('reorganize'),
					this.on('weight').changes(),
					this.on('reset-positioning')
			).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

		//this.newProperty('offset');
		//
		//((cache) => {
		//	this.offset = cache();
		//	setInterval(cache, 100);
		//	cache.onChange((newOffset) => { this.offset = newOffset });
		//	this.on('weight', cache);
		//	this.parent.on('size', cache);
		//	this.parent.on('reorganize', cache);
		//	this.parent.on('offset', cache);
		//	this.on('reset-positioning', cache);
		//})(U.cached({
		//	retrieve: () => {
		//		this.circuitboard._p_posTracking_setOffset();
		//		return this._p_posTracking_offset_cache;
		//	},
		//	isEqual: U.Position.equals
		//}));

	});


	/* the 'position' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		// for completeness sake; it's (0, 0) by definition
		this.newProperty('position', { source: Bacon.constant(new U.Position(0, 0)) });

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('position');

		((setPosition) => {
			setPosition();
			this.on('offset', setPosition);
			this.circuitboard.on('offset', setPosition);
		})(() => {
			this.position = U.Position.subtract(this.offset, this.circuitboard.offset);
		});

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('position');

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

		this.newProperty('size');

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

		this.newProperty('size');

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

		this.newProperty('size');

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
	plugin.insert('Tilemap.prototype.construct', function () {

		this.newEvent('reorganize');

	}).insert('Tile.prototype.construct', function () {

		this.on('size', () => { this.parent.trigger('reorganize') });

	});


	/* a method to trigger position/size recheck */
	plugin.insert('Tile.prototype.construct', function () {

		this.newEvent('reset-positioning');

	}).add('Tile.prototype.resetPositioning', function () {

		this.trigger('reset-positioning');

	});

});

