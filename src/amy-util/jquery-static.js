define(['jquery'], function ($) {
	'use strict';

	var U = {
		//
		// test equality with a tolerance of epsilon
		//
		approx: function (val1, val2, epsilon) {
			if (U.isUndefined(epsilon)) { epsilon = 1e-5 }
			return (Math.abs(val1 - val2) < epsilon);
		},

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
		bind(obj, m, ...args) { return U.bindA(obj[m], obj, args) },

		//
		// allows the Function constructor to be used
		// with an array of formal parameters
		//
		applyConstructor(ConstructorFn, args) {
			var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
			return new NewConstructorFn();
		},

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

	};

	return U;
});
