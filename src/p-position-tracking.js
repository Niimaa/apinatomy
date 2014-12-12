define(['jquery', './util/misc.js', 'bacon'], function ($, U, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core', 'tile-weight']
	});


	/* a tile method to trigger position/size recheck */
	plugin.insert('Tile.prototype.construct', function () {

		this.newEvent('reset-positioning');

	}).add('Tile.prototype.resetPositioning', function () {

		this.trigger('reset-positioning');

	});


	/* a stream limiter, setting up a window for calculating element offsets */
	plugin.insert('Circuitboard.prototype.construct', function () {
		this._p_posTracking_limiter = Bacon.limiter(Bacon.mergeAll([
			Bacon.once(),
			Bacon.interval(100)
		]), (window) => {

			/* setup: temporarily undoes all (3D) transformations on the circuitboard */
			var transform0 = this.element.css('transform');
			var parentTransform0 = this.element.parent().css('transform');
			this.element.css('transform', '');
			this.element.parent().css('transform', '');

			/* the window for computing any tile's offset */
			window();

			/* breakdown: restore the (3D) transformations */
			this.element.css('transform', transform0);
			this.element.parent().css('transform', parentTransform0);

		});
	});


	// TODO: find the proper way to keep things updated other than the interval(100) used... eight times below


	/* the 'offset' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('offset', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100)
			]).limitedBy(this._p_posTracking_limiter).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('offset', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.parent.on('size').changes(),
				this.parent.on('offset').changes()
			]).limitedBy(this.circuitboard._p_posTracking_limiter).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('offset', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.parent.on('size').changes(),
				this.parent.on('offset').changes(),
				this.parent.on('reorganize'),
				this.on('weight').changes(),
				this.on('reset-positioning')
			]).limitedBy(this.circuitboard._p_posTracking_limiter).map(() => this.element.offset()),
			isEqual: U.Position.equals,
			initial: this.element.offset()
		});

	});


	/* the 'position' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		// for completeness sake; it's (0, 0) by definition
		this.newProperty('position', {
			source: Bacon.constant(new U.Position(0, 0)),
			isEqual: U.Position.equals
		});

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('position', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.on('offset').changes(),
				this.circuitboard.on('offset').changes()
			]).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)),
			isEqual: U.Position.equals
		});

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('position', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.on('offset').changes(),
				this.circuitboard.on('offset').changes()
			]).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)),
			isEqual: U.Position.equals
		});

	});


	/* the 'size' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('size', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.options.resizeEvent || $(window).asEventStream('resize')
			]).map(() => new U.Size(this.element.height(), this.element.width())),
			isEqual: U.Size.equals
		});

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('size', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.parent.on('size').changes()
			]).map(() => new U.Size(this.element.height(), this.element.width())),
			isEqual: U.Size.equals
		});

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('size', {
			source: Bacon.mergeAll([
				Bacon.once(),
				Bacon.interval(100),
				this.on('weight').changes(),
				this.parent.on('size').changes(),
				this.parent.on('reorganize'),
				this.on('reset-positioning')
			]).map(() => new U.Size(this.element.height(), this.element.width())),
			isEqual: U.Size.equals
		});

	});


	/*  if the size of any tile changes, trigger the 'reorganize'     */
	/*  event on the parent tilemap, so that sibling tiles can react  */
	plugin.insert('Tilemap.prototype.construct', function () {

		this.newEvent('reorganize');

	}).insert('Tile.prototype.construct', function () {

		this.on('size', () => { this.parent.trigger('reorganize') });

	});

});

