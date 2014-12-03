'use strict';

define(['jquery', './misc.js', 'bacon'], function ($, U, Bacon) {


	/** {@export}{@class BaconSignalHandler}
	 * Use this as a subclass (or just mix it in) to provide support for
	 * events and observable properties through Bacon.js.
	 */
	var BaconSignalHandler = U.newClass(function BaconSignalHandler() {

		this._events = {};
		this._properties = {};
		this._propertyBusses = {};

	}, /** @lends BaconSignalHandler.prototype */ {


		/** {@public}{@method}
		 * Declares a new event stream for this object.
		 *
		 * @param  {String}             name    - the name of the event, used to trigger or subscribe to it
		 * @param  {Bacon.EventStream} [source] - another event stream to automatically trigger this event
		 *
		 * @return {Bacon.Bus} - the created event stream
		 */
		newEvent(name, {source} = {}) {
			/* is the event name already taken? */
			U.assert(!this._events[name],
					`There is already an event '${name}' on this object.`);
			U.assert(!this._properties[name],
					`There is already a property '${name}' on this object.`);

			/* define the event stream */
			var bus = new Bacon.Bus();
			if (source) { bus.plug(source) }
			return this._events[name] = bus.name(name);
		},


		/** {@public}{@method}
		 * Retrieve an event stream by name. If the name of a property is given, a stream
		 * based on changes to that property is returned.
		 *
		 * @param  {String}       name - the name of the event stream to retrieve
		 * @return {Bacon.EventStream} - the event stream associated with the given name
		 */
		event(name) {
			/* does the event exist? */
			U.assert(this._events[name],
					`There is no event '${name}' on this object.`);

			/* return it */
			return this._events[name];
		},


		/** {@public}{@method}
		 * This method lazily creates and returns this property, with
		 * an empty {Bacon.Bus} at the base. This allows a property to be referenced
		 * before it is defined:
		 *
		 *          ╔═════╗   ┌───────────────┐   ┌───────────────┐
		 *    ⋯ ⸩───╢ Bus ╟───┤ .toProperty() ├───┤ .name( name ) │
		 *          ╚═════╝   └───────────────┘   └───────────────┘
		 *
		 * @param  {String}    name - the name of the event stream to retrieve
		 * @return {Bacon.Property} - the property associated with the given name
		 */
		property(name) {
			/* if it doesn't exist, create it now */
			if (!this._properties[name]) {
				this._propertyBusses[name] = new Bacon.Bus();
				this._properties[name] = this._propertyBusses[name].toProperty().name(name);
			}

			/* return it */
			return this._properties[name];
		},


		/** {@public}{@method}
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
		 * @param  {String}                   name           - the name of the event stream to retrieve
		 * @param  {Bacon.Observable}        [source]        - a source stream to automatically set this property
		 * @param  {Boolean}                 [settable=true] - whether the value can be manually set (if `source` is given, defaults to false)
		 * @param  {*}                       [initial]       - the initial value of this property
		 * @param  {function(*,*):Boolean}   [isEqual]       - a predicate function by which to test for duplicate values
		 *
		 * @return {Bacon.Property} - the event stream associated with the given name
		 */
		newProperty(name, {source, settable, initial, isEqual} = {}) {

			/* is the property name already taken? */
			U.assert(!this._events[name],
					`There is already an event '${name}' on this object.`);
			U.assert(!this._properties[name] || !this._properties[name]._amy_plugged,
					`There is already a property '${name}' on this object.`);

			/* initialize the public property and outer bus, and mark it as plugged */
			this.property(name)._amy_plugged = true;

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
				set(newValue) { innerBus.push(newValue) }
			} : {
				get() { return value }
			});

			/* finish up the property for public consumption */
			var innerProperty = innerBus.skipDuplicates(isEqual);
			this._propertyBusses[name].plug(innerProperty);

			/* keep our value in sync with the stream */
			this.property(name).onValue((v) => { value = v });

			/* initial value */
			if (U.isDefined(initial)) { innerBus.push(initial) }

		},


		/** {@public}{@method}
		 * Trigger an event for all subscribers.
		 *
		 * @param {String} name  - the name of the event stream to trigger
		 * @value {*}      value - the value to attach to the event
		 */
		trigger(name, value) {
			/* does the event stream exist? */
			U.assert(this._events[name],
					`There is no event '${name}' on this object.`);
			/* push the value to the stream */
			this._events[name].push(value);
		},


		/** {@public}{@method}
		 * This method selects an existing stream or property, and then
		 * either returns it, or creates a subscription to it, depending
		 * on whether a callback is provided.
		 *
		 *
		 * @param {String}            name                - the name of the event or property to subscribe to
		 * @param {*}                [expectedValue]      - if provided, filters the stream by === equality with this value;
		 *                                                  this may not be a plain object
		 * @param {Object}           [options]            - a plain object for providing additional options
		 * @param {Boolean}          [options.once=false] - whether the stream ends after one event
		 * @param {function(*):void} [callback]           - if provided, subscribes to this stream with the this callback
		 *
		 * @return {Bacon.Observable|function():void} - if no `callback` is provided, the specified event stream
		 *                                              or property; otherwise, a function to unsubscribe to said
		 *                                              stream or property
		 */
		on(name, expectedValue, options, callback) {
			var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
			return this._on(argsObj);
		},


		/** {@public}{@method}
		 * This method is a shorthand for the {@link on} method with the `once` option enabled.
		 * In other words, any stream returned will send only one event, and any callback
		 * provided will only fire once.
		 */
		one(name, expectedValue, options, callback) {
			var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
			U.object(argsObj, 'options').once = true;
			return this._on(argsObj);
		},


		/** {@private}{@method}
		 * This method does the main work for {@link on} or {@link one}, but accepts
		 * the parameters as one object, so it doesn't have to deal with parameter ordering.
		 *
		 * @return {Bacon.Observable|function():void}
		 */
		_on({name, expectedValue, options, callback}) {
			/* does an event or property by this name exist? */
			U.assert(this._events[name] || this._properties[name],
					`There is no event or property '${name}' on this object.`);

			/* process name */
			var result = this._events[name] || this._properties[name];

			/* process expectedValue */
			if (U.isDefined(expectedValue)) { result = result.filter((v) => v === expectedValue) }

			/* process options.once */
			if (options && options.once) { result = result.take(1) }

			/* process callback */
			if (callback) { result = result.onValue(callback) }

			return result;
		},


		/** {@private}{@method}
		 * Process the arguments accepted by {@link on} and {@link one}.
		 *
		 * @return {Object}
		 */
		_gatherOnArguments(...args) {
			var result = { name: args.shift() };

			/* test for expected value argument */
			if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
				result.expectedValue = args.shift();
			}

			/* test for options */
			if (U.isDefined(args[0]) && U.isPlainObject(args[0])) {
				result.options = args.shift();
			}

			/* test for callback function */
			if (U.isDefined(args[0]) && U.isFunction(args[0])) {
				result.callback = args.shift();
			}

			return result;
		}


	});


	return BaconSignalHandler;


});
