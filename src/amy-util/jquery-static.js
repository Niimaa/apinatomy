define(['jquery'], function ($) {
	'use strict';

	$.extend({
		//
		// create a function that returns the value of
		// a specific field from a given object
		//
		field(name) { return (obj) => { return obj[name] } },

		//
		// get the object `obj[name]`; if `obj[name]` is not
		// a (plain) object, make it an empty object first
		//
		object(obj, name) {
			if (!$.isPlainObject(obj[name])) { obj[name] = {} }
			return obj[name];
		},

		//
		// get the array `obj[name]`; if `obj[name]` is not
		// an array, make it an empty array first
		//
		array(obj, name) {
			if (!$.isArray(obj[name])) { obj[name] = [] }
			return obj[name];
		},

		//
		// `Function.bind`, but taking an array like `Function.apply` does
		//
		bindA(fn, ctx, args) { return fn.bind.apply(fn, [ctx].concat(args)) },

		//
		// `Function.bind`, but only having to specify the context-object once
		//
		bind(obj, m, ...args) { return $.bindA(obj[m], obj, args) },

		//
		// a simple `assert` function, to express a
		// condition that is expected to be true
		//
		assert(condition, message) {
			if (!condition) { throw new Error(message || "Assertion failed") }
		},

		//
		// test if a value is undefined
		//
		isUndefined(val) { return typeof val === 'undefined' },

		//
		// test if a value is defined
		//
		isDefined(val) { return typeof val !== 'undefined' }

	});
});
