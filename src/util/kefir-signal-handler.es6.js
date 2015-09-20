'use strict';

define(['jquery', './misc.es6.js', './kefir-and-eggs.es6.js'], function ($, U, Kefir) {


	/** {@export}{@class KefirSignalHandler}
	 * Use this as a subclass (or just mix it in) to provide support for
	 * events and observable properties through Kefir.js.
	 */
	var KefirSignalHandler = class KefirSignalHandler {

		constructor() {
			this._events = {};
			this._properties = {};
			this._propertyBusses = {};
		}

		/** {@public}{@method}
		 * Declares a new event stream for this object.
		 *
		 * @param  {String}        name    - the name of the event, used to trigger or subscribe to it
		 * @param  {Kefir.Stream} [source] - another event stream to automatically trigger this event
		 *
		 * @return {Kefir.Bus} - the created event stream
		 */
		newEvent(name, {source} = {}) {

			/* is the event name already taken? */
			U.assert(!this._events[name],
					`There is already an event '${name}' on this object.`);
			U.assert(!this._properties[name],
					`There is already a property '${name}' on this object.`);

			/* define the event stream */
			var bus = Kefir.bus();
			if (source) { bus.plug(source) }
			return this._events[name] = bus;

		}


		/** {@public}{@method}
		 * Retrieve an event stream by name. If the name of a property is given, a stream
		 * based on changes to that property is returned.
		 *
		 * @param  {String}  name - the name of the event stream to retrieve
		 * @return {Kefir.Stream} - the event stream associated with the given name
		 */
		event(name) {

			/* does the event exist? */
			U.assert(this._events[name],
					`There is no event '${name}' on this object.`);

			/* return it */
			return this._events[name];

		}

		/** @alias event */
		e(name) { return this.event(name) }


		/** {@public}{@method}
		 * This method defines a new property on this object.
		 *
		 * @param  {String}                   name           - the name of the event stream to retrieve
		 * @param  {Boolean}                 [settable=true] - whether the value can be manually set
		 * @param  {*}                       [initial]       - the initial value of this property
		 * @param  {function(*,*):Boolean}   [isEqual]       - a predicate function by which to test for duplicate values
		 * @param  {function(*):*}           [map]           - a function to map incoming values to other values
		 * @param  {[Kefir.Property]}        [mapWith]       - other properties used in the given 'map' function
		 *
		 * @return {Kefir.Property} - the property associated with the given name
		 */
		newProperty(name, {settable, initial, isEqual, map, mapWith} = {}) {

			/* is the property name already taken? */
			U.assert(!this._events[name],
					`There is already an event '${name}' on this object.`);
			U.assert(!this._properties[name],
					`There is already a property '${name}' on this object.`);

			/* default values */
			if (U.isUndefined(settable)) { settable = true }

			/* define the bus which manages the property */
			let bus = Kefir.bus();

			/* define the property itself */
			let property;
			if (map && mapWith) {
				property = this._properties[name] = Kefir
					.combine([ bus.toProperty(initial).skipDuplicates(isEqual), ...mapWith ], map)
					.toProperty(initial) // TODO: use map here too
					.skipDuplicates(isEqual);
			} else if (map && !mapWith) {
				property = this._properties[name] =
					bus
					.toProperty(map(initial))
					.map(map)
					.skipDuplicates(isEqual);
			} else {
				property = this._properties[name] =
					bus
					.toProperty(initial)
					.skipDuplicates(isEqual);
			}

			/* give the property additional methods */
			property.plug   = (observable) => { bus.plug(observable);   return property };
			property.unplug = (observable) => { bus.unplug(observable); return property };
			property.get = (() => {
				let currentValue = initial;
				property.onValue((value) => { currentValue = value });
				return () => currentValue;
			})();
			if (settable) {
				property.set = (value) => { bus.emit(value); return property };
			}

			/* add the property to the object interface */
			Object.defineProperty(this, name, {
				get: property.get,
				set: settable ? property.set : undefined
			});

			/* make the property active; it doesn't work if this isn't done (the nature of Kefir.js) */
			property.run();
			if (this._events['destroy']) {
				this.event('destroy').onValue(() => { bus.end() });
			}

			/* return the property */
			return property;

		}


		/** {@public}{@method}
		 * Retrieve a property by name.
		 *
		 * @param  {String} name - the name of the property to retrieve
		 * @return {Kefir.Property} - the property associated with the given name
		 */
		property(name) { return this._properties[name] }

		/** @alias property */
		p(name) { return this.property(name) }


		/** {@public}{@method}
		 * Trigger an event for all subscribers.
		 *
		 * @param {String} name  - the name of the event stream to trigger
		 * @param {*}      value - the value to attach to the event
		 */
		trigger(name, value) {

			/* does the event stream exist? */
			U.assert(this._events[name],
					`There is no event '${name}' on this object.`);

			/* push the value to the stream */
			this._events[name].emit(value);

		}


		/** {@public}{@method}
		 * This method selects an existing stream or property, and then
		 * either returns it, or creates a subscription to it, depending
		 * on whether a callback is provided.
		 *
		 * @param {String}            name                 - the name of the event or property to subscribe to
		 * @param {*}                [expectedValue]       - if provided, filters the stream by === equality with this value;
		 *                                                   this may not be a plain object
		 * @param {Object}           [options]             - a plain object for providing additional options
		 * @param {Boolean}          [options.once=false]  - whether the stream ends after one event
		 * @param {function(*):void} [callback]            - if provided, subscribes to this stream with the this callback
		 *
		 * @return {Kefir.Observable|function():undefined} - if no `callback` is provided, the specified event stream
		 *                                                   or property; otherwise, a function to unsubscribe to said
		 *                                                   stream or property
		 */
		on(name, expectedValue, options, callback) {
			var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
			return this._on(argsObj);
		}


		/** {@private}{@method}
		 * This method does the main work for {@link on}, but accepts
		 * the parameters as one object, so it doesn't have to deal with parameter ordering.
		 *
		 * @return {Kefir.Observable|function():void}
		 */
		_on({name, expectedValue, callback}) {
			/* does an event or property by this name exist? */
			U.assert(this._events[name] || this._properties[name],
					`There is no event or property '${name}' on this object.`);

			/* process name */
			var result = this._events[name] || this._properties[name];

			/* process expectedValue */
			if (U.isDefined(expectedValue)) { result = result.filter((v) => v === expectedValue) }

			/* process callback */
			if (callback) { result = result.onValue(callback) }

			return result;
		}


		/** {@private}{@method}
		 * Process the arguments accepted by {@link on}.
		 *
		 * @return {Object}
		 */
		_gatherOnArguments(...args) {
			var result = { name: args.shift() };

			/* test for expected value argument */
			if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
				result.expectedValue = args.shift();
			}

			/* test for callback function */
			if (U.isDefined(args[0]) && U.isFunction(args[0])) {
				result.callback = args.shift();
			}

			return result;
		}

	};


	return KefirSignalHandler;


});
