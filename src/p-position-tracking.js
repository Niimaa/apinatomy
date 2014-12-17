define(['jquery', './util/misc.js', './util/bacon-and-eggs.js'], function ($, U, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core', 'tile-weight']
	});


	/* a tile method to programmatically trigger position/size recheck */
	plugin.insert('Tile.prototype.construct', function () {

		this.newEvent('reset-positioning');

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




	/* the 'offset' observable */
	function catchUp() {
		return Bacon.once()
				.concat(Bacon.later(10))
				.concat(Bacon.later(50))
				.concat(Bacon.later(100))
				.concat(Bacon.later(500))
				.concat(Bacon.later(1000));
	}
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			Bacon.interval(1000)
			// TODO: allow outside stream to trigger this
		]).flatMapLatest(catchUp).limitedBy(this._p_posTracking_limiter).map(() => this.element.offset()));

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.parent.on('size').changes(),
			this.parent.on('offset').changes()
		]).flatMapLatest(catchUp).limitedBy(this.circuitboard._p_posTracking_limiter).map(() => this.element.offset()));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.parent.on('size').changes(),
			this.parent.on('offset').changes(),
			this.parent.on('reorganize'),
			this.on('weight').changes(),
			this.on('reset-positioning')
		]).flatMapLatest(catchUp).limitedBy(this.circuitboard._p_posTracking_limiter).map(() => this.element.offset()));

	});


	/* the 'position' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		/* for completeness sake; it's (0, 0) by definition */
		this.newProperty('position', {
			settable: false,
			initial: new U.Position(0, 0)
		});

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('position', {
			settable: false,
			isEqual: U.Position.equals
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.on('offset').changes(),
			this.circuitboard.on('offset').changes()
		]).flatMapLatest(catchUp).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('position', {
			settable: false,
			isEqual: U.Position.equals
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.on('offset').changes(),
			this.circuitboard.on('offset').changes()
		]).flatMapLatest(catchUp).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)));

	});


	/* the 'size' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.options.resizeEvent || $(window).asEventStream('resize')
		]).flatMapLatest(catchUp).map(() => new U.Size(this.element.height(), this.element.width())));

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.parent.on('size').changes()
		]).flatMapLatest(catchUp).map(() => new U.Size(this.element.height(), this.element.width())));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).addSource(Bacon.mergeAll([
			Bacon.once(),
			this.on('weight').changes(),
			this.parent.on('size').changes(),
			this.parent.on('reorganize'),
			this.on('reset-positioning')
		]).flatMapLatest(catchUp).map(() => new U.Size(this.element.height(), this.element.width())));

	});


	/*  if the size of any tile changes, trigger the 'reorganize'     */
	/*  event on the parent tilemap, so that sibling tiles can react  */
	plugin.insert('Tilemap.prototype.construct', function () {

		this.newEvent('reorganize');

	}).insert('Tile.prototype.construct', function () {

		this.on('size').onValue(() => { this.parent.trigger('reorganize') });

	});

});

