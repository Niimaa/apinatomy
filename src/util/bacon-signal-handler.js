'use strict';

define(['jquery', './misc.js', 'bacon'], function ($, U, Bacon) {


	/**
	 * @class
	 *
	 * Use this as a subclass (or just mix it in) to provide support for
	 * events and observable properties through Bacon.js.
	 */
	var BaconSignalHandler = U.newClass(function BaconSignalHandler() {

		this._events = {};
		this._properties = {};
		this._propertyBusses = {};

	}, /** @lends BaconSignalHandler.prototype */ {

		/**
		 * Declares a new event stream for this object.
		 *
		 * @param  {String}             name         - the name of the event, used to trigger or subscribe to it
		 * @param  {Bacon.EventStream} [eventStream] - another event stream to automatically trigger this event
		 * @return {Bacon.Bus}                       - the created event stream
		 */
		newEvent(name, {eventStream} = {}) {
			var bus = new Bacon.Bus();
			if (eventStream) { bus.plug(eventStream) }
			return this._events[name] = bus.name(name);
		},

		/**
		 * Retrieve an event stream by name. If the name of a property is given, a stream
		 * based on changes to that property is returned.
		 *
		 * @param  {String} name       - the name of the event stream to retrieve
		 * @return {Bacon.EventStream} - the event stream associated with the given name
		 */
		event(name) { return this._events[name] },

		/**
		 * This method lazily creates and returns this property, with
		 * an empty {Bacon.Bus} at the base. This allows a property to be referenced
		 * before it is defined:
		 *
		 *          ╔═════╗   ┌───────────────┐   ┌───────────────┐
		 *    ⋯ ⸩───╢ Bus ╟───┤ .toProperty() ├───┤ .name( name ) │
		 *          ╚═════╝   └───────────────┘   └───────────────┘
		 *
		 * @param  {String} name    - the name of the event stream to retrieve
		 * @return {Bacon.Property} - the property associated with the given name
		 */
		property(name) {
			if (!this._properties[name]) {
				this._propertyBusses[name] = new Bacon.Bus();
				this._properties[name] = this._propertyBusses[name].toProperty().name(name);
			}
			return this._properties[name];
		},

		/**
		 * This method actually defines a property by backing
		 * `property(name)` bus above with the following construction:
		 *
		 *                                ╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
		 *                            ╭┈┈┈┤ .push( initial ) ┊
		 *                            ┊?  ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
		 *   ╔════════════╗        ╔══╧══╗        ┌────────────────────────────┐
		 *   ║ observable ╟───◯⸩───╢ Bus ╟────────┤ .skipDuplicates( isEqual ) ├───◯ ⋯
		 *   ╚════════════╝        ╚══╤══╝        └────────────────────────────┘
		 *                            ┊*  ╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
		 *                            ╰┈┈┈┤ .push( newValue ) ┊
		 *                                ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
		 *
		 * @param  {String}                 name           - the name of the event stream to retrieve
		 * @param  {Bacon.Observable}      [source]        - a source stream to automatically set this property
		 * @param  {Boolean}               [settable=true] - whether the value can be manually set (if `source` is given, defaults to false)
		 * @param  {*}                     [initial]       - the initial value of this property
		 * @param  {function(*,*):Boolean} [isEqual]       - a predicate function by which to test for duplicate values
		 *
		 * @return {Bacon.Property} - the event stream associated with the given name
		 */
		newProperty(name, {source, settable, initial, isEqual} = {}) {

			/* internal bus, acting as a hub for all new values */
			var innerBus = new Bacon.Bus();

			/* if a source is given, plug it in; if not, the property becomes manually settable by default */
			if (source) {
				innerBus.plug(source);
			} else if (settable !== false) {
				settable = true;
			}

			/* caching the current value */
			var value;

			/* add the property to the object interface, writable through the internal bus */
			Object.defineProperty(this, name, settable ? {
				get() { return value },
				set(newValue) {
					innerBus.push(newValue);
				}
			} : {
				get() { return value }
			});

			/* finish up the property for public consumption */
			this.property(name); // initialize the public property and outer bus
			var innerProperty = innerBus.skipDuplicates(isEqual);
			this._propertyBusses[name].plug(innerProperty);

			/* keep our value in sync with the stream */
			this.property(name).onValue((v) => { value = v });

			/* initial value */
			if (U.isDefined(initial)) { innerBus.push(initial) }

		},

		/**
		 * Trigger an event for all subscribers.
		 *
		 *
		 */
		trigger(name, value) { this._events[name].push(value) },


		/**
		 *
		 *
		 *
		 */
		_on({name, expectedValue, fn, options}) {
			var result = this.property(name) || this.event(name);
			if (U.isDefined(expectedValue)) { result = result.filter((v) => v === expectedValue) }
			if (options && options.once) { result = result.take(1) }
			if (fn) { result = result.onValue(fn) }
			return result;
		},


		/**
		 *
		 *
		 *
		 */
		on(name, ...rest) {
			/* collect arguments for this._on */
			var args = {name};

			/* test for expected value argument */
			if (U.isDefined(rest[0]) && !U.isFunction(rest[0]) && !U.isPlainObject(rest[0])) {
				args.expectedValue = rest.shift();
			}

			/* test for callback function */
			if (U.isDefined(rest[0]) && U.isFunction(rest[0])) {
				args.fn = rest.shift();
			}

			/* test for options */
			if (U.isDefined(rest[0]) && U.isPlainObject(rest[0])) {
				args.options = rest.shift();
			}

			return this._on(args);
		},


		/**
		 *
		 *
		 *
		 */
		one(name, ...rest) {
			/* collect arguments for this._on */
			var args = {name};

			/* test for expected value argument */
			if (U.isDefined(rest[0]) && !U.isFunction(rest[0]) && !U.isPlainObject(rest[0])) {
				args.expectedValue = rest.shift();
			}

			/* test for callback function */
			if (U.isDefined(rest[0]) && U.isFunction(rest[0])) {
				args.fn = rest.shift();
			}

			/* test for options */
			if (U.isDefined(rest[0]) && U.isPlainObject(rest[0])) {
				args.options = rest.shift();
			} else {
				args.options = {};
			}

			args.options.once = true;

			return this._on(args);
		}

	});


	return BaconSignalHandler;


});
