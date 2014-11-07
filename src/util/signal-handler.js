'use strict';

define(['jquery', './misc.js'], function ($, U) {

	var SignalHandler = {};

	SignalHandler._getCallbacks = function _getCallbacks(signal) {
		if (U.isUndefined(this._callbacks)) { this._callbacks = {} }
		if (U.isUndefined(this._callbacks[signal])) { this._callbacks[signal] = $.Callbacks() }
		return this._callbacks[signal];
	};

	/* how to subscribe to a signal */
	SignalHandler.on = function on(signal, fn) {
		var behavior = (fn) => {
			this._getCallbacks(signal).add(fn);
			var unsubscribeFn = () => {
				if (unsubscribeFn.stillSubscribed) {
					unsubscribeFn.stillSubscribed = false;
					delete unsubscribeFn.unsubscribeOn;
					this._getCallbacks(signal).remove(fn);
				}
			};
			unsubscribeFn.stillSubscribed = true;
			unsubscribeFn.unsubscribeOn = (subscriber) => {
				subscriber(unsubscribeFn);
				return unsubscribeFn;
			};
			return unsubscribeFn;
		};

		/* optional currying based on whether fn is already given */
		return U.isDefined(fn) ? behavior(fn) : behavior;
	};

	/* how to subscribe to a one-time signal */
	SignalHandler.one = function one(signal, fn) {
		var behavior = (fn) => {
			var unsubscribeFn = this.on(signal, function (...args) {
				unsubscribeFn();
				fn.apply(null, args);
			});
			return unsubscribeFn;
		};

		/* optional currying based on whether fn is already given */
		return U.isDefined(fn) ? behavior(fn) : behavior;
	};

	SignalHandler.once = SignalHandler.one;

	/* how to trigger a signal with any number of arguments */
	SignalHandler.trigger = function trigger(signal, ...args) {
		var callbacks = this._getCallbacks(signal);
		if (callbacks) { callbacks.fireWith(this, args) }
	};

	/*  creates a new observable property to this object                                                 */
	/*                                                                                                   */
	/*  name (mandatory)   - the name of the property                                                    */
	/*  options.initial    - the initial value; defaults to undefined                                    */
	/*  options.validation - if specified, this function is run before a new value is actually set.      */
	/*                       It is passed the new value and the old value, and should return the actual  */
	/*                       value that should be set. This could be the new or old value directly,      */
	/*                       or any transformation. It can also throw an exception, which will just be   */
	/*                       allowed to pass through. Returning the old value prevents a signal from     */
	/*                       being triggered.                                                            */
	SignalHandler.newObservable = function newObservable(name, {initial, validation} = {}) {

		/* store the value */
		var cache;

		/* define getters and setters */
		Object.defineProperty(this, name, {
			get() { return cache },
			set(newValue) {
				var oldValue = cache;
				if (validation) { newValue = validation(newValue, oldValue) }
				if (newValue !== oldValue) {
					cache = newValue;
					this.trigger(name, newValue, oldValue);
				}
			}
		});

		/* set the initial value now (possibly triggering existing callbacks) */
		this[name] = initial;

	};

	/* observe an observable; if it already has a value, the callback is immediately called */
	SignalHandler.observe = function observe(observable, fn) {

		/* subscribe to the value of the observable */
		var unsubscribeFn = this.on(observable, fn);

		/* if the observable has a value already, trigger the callback now */
		if (U.isDefined(this[observable])) { fn(this[observable]) }

		/* return the unsubscribe callback */
		return unsubscribeFn;

	};

	/* return the object that can be mixed into other objects */
	return SignalHandler;

});
