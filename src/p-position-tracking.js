define(['jquery', './util/misc.js', 'bacon'], function ($, U, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core', 'tile-weight']
	});



	/* a method to trigger position/size recheck */
	plugin.insert('Tile.prototype.construct', function () {

		this.newEvent('reset-positioning');

	}).add('Tile.prototype.resetPositioning', function () {

		this.trigger('reset-positioning');

	});


	/* calculating and caching element offset */
	plugin.insert('Circuitboard.prototype.construct', function () {

		var PACING = Bacon.interval(500).merge(Bacon.once());

		var limiter = new Bacon.Bus();
		var windowWanted = false;

		PACING.filter(() => windowWanted).onValue(() => {

			try {

				/* setup: temporarily undoes all (3D) transformations on the circuitboard */
				var restoreTransforms = [this.element, this.element.parent()].map((e) => {
					// we're using `e[0].style.transform` instead of `e.css('transform')`,
					// because the jQuery way causes some unexplained side-effects.
					var originalTransform = e[0].style.transform;
					e[0].style.transform = '';
					return () => { e[0].style.transform = originalTransform };
				});

				/* the window for computing any tile's offset */
				limiter.push();
				windowWanted = false;

				/* breakdown: restore the (3D) transformations */
				restoreTransforms.forEach(U.call);

			} catch (e) {
				console.error(e);
			}

		});

		this._p_posTracking_offsetLimiter = function (...pacing) {
			pacing = Bacon.mergeAll(pacing);

			var resultBus = new Bacon.Bus();
			var wantWindow = false;

			pacing.onValue(() => { wantWindow = windowWanted = true });

			limiter.filter(() => wantWindow).onValue(() => {
				resultBus.push();
				wantWindow = false;
			});

			return resultBus;
		};

	});


	/* the 'offset' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('offset', {
			source: this._p_posTracking_offsetLimiter(
					Bacon.once(),
					Bacon.interval(100) // TODO: find the proper way to keep this updated
			).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('offset', {
			source: this.circuitboard._p_posTracking_offsetLimiter(
					Bacon.once(),
					Bacon.interval(100), // TODO: find the proper way to keep this updated
					this.parent.on('size'),
					this.parent.on('offset')
			).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

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

});

