'use strict';

define(['jquery', './misc.js', 'bacon'], function ($, U, Bacon) {


	// It's called eggs because eggs go well with bacon. Get it? :-)


	Bacon.fromOn = function fromOn(obj, eventName) {
		return Bacon.fromBinder((sink) => {
			return obj.on(eventName, (v) => { sink(new Bacon.Next(v)) });
		});
	};


	Bacon.fromOnNull = function fromOn(obj, eventName) {
		return Bacon.fromBinder((sink) => {
			obj.on(eventName, (v) => { sink(new Bacon.Next(v)) });
			return () => { obj.on(eventName, null) };
		});
	};


	Bacon.fromOnOff = function fromOnOff(obj, eventName) {
		return Bacon.fromBinder((sink) => {
			var callback = (v) => { sink(new Bacon.Next(v)) };
			obj.on(eventName, callback);
			return () => { obj.off(eventName, callback) };
		});
	};


});
