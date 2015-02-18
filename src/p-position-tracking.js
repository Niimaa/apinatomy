define(['jquery', './util/misc.js', './util/kefir-and-eggs.js'], function ($, U, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'position-tracking',
		expects: ['core', 'tile-grow-when-open', 'tile-grow-when-maximized']
	});


	/* a stream limiter, setting up a window for calculating element offsets */
	plugin.add('Circuitboard.prototype._posTrackingWindow', function (window) { window() });
	plugin.insert('Circuitboard.prototype.construct', function () {
		this._posTrackingLimiter = Kefir.limiter(Kefir.merge([
			Kefir.once(),
			Kefir.interval(100)
		]), this._posTrackingWindow.bind(this));
	});


	/* the 'offset' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).plug(Kefir.merge([
			Kefir.once(),
			Kefir.interval(1000)
			// TODO: allow outside stream to trigger this
		]).limitedBy(this._posTrackingLimiter).map(() => this.element.offset()));

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes(),
			this.parent.p('offset').changes()
		]).limitedBy(this.circuitboard._posTrackingLimiter).map(() => this.element.offset()));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes(),
			this.parent.p('offset').changes(),
			this.parent.on('reorganize'),
			//this.p('weight').changes(),
			this.p('fullyOpen').changes(),
			this.p('fullyClosed').changes(),
			this.p('fullyMaximized').changes(),
			this.p('fullyNotMaximized').changes(),
			//Kefir.interval(100)
		]).limitedBy(this.circuitboard._posTrackingLimiter).map(() => this.element.offset()));

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
		}).plug(Kefir.merge([
			Kefir.once(),
			this.p('offset').changes(),
			this.circuitboard.p('offset').changes()
		]).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('position', {
			settable: false,
			isEqual: U.Position.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			//Kefir.interval(100),
			this.p('offset').changes(),
			this.circuitboard.p('offset').changes()
		]).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)));

	});


	/* the 'size' observable */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.options.resizeEvent || $(window).asKefirStream('resize')
		]).map(() => new U.Size(this.element.height(), this.element.width())));

	}).insert('Tilemap.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes()
		]).map(() => new U.Size(this.element.height(), this.element.width())));

	}).insert('Tile.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			//this.p('weight').changes(),
			this.p('fullyOpen').changes(),
			this.p('fullyClosed').changes(),
			this.p('fullyMaximized').changes(),
			this.p('fullyNotMaximized').changes(),
			//Kefir.interval(100),
			this.parent.p('size').changes(),
			this.parent.on('reorganize')
		]).map(() => new U.Size(this.element.height(), this.element.width())));

	});


	/*  if the size of any tile changes, trigger the 'reorganize'     */
	/*  event on the parent tilemap, so that sibling tiles can react  */
	plugin.insert('Tilemap.prototype.construct', function () {

		this.newEvent('reorganize');

	}).insert('Tile.prototype.construct', function () {

		this.p('size').onValue(() => { this.parent.trigger('reorganize') });

	});

});

