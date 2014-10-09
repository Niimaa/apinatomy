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
		// pull a value from an array
		//
		pull(arr, val) {
			var i = arr.indexOf(val);
			if (i !== -1) { arr.splice(i) }
		},

		//
		// empty out an array
		//
		makeEmpty(arr) {
			while (arr.length > 0) { arr.pop() }
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
		// test if a value is `undefined`
		//
		isUndefined(val) { return typeof val === 'undefined' },

		//
		// test if a value is defined (not `undefined`)
		//
		isDefined(val) { return typeof val !== 'undefined' },

		//
		// extract an array of values from an object
		//
		objValues(obj) { return Object.keys(obj).map(key => obj[key]) },

		//
		// enable an HTML element to serve as anchor for absolutely positioned children
		//
		makePositioned(element) {
			if (element.css('position') === 'static') {
				element.css('position', 'relative');
			}
		},

		//
		// return the first parameter that is not 'undefined'
		//
		defOr(...values) {
			for (var i = 0; i < values.length; i += 1) {
				if (U.isDefined(values[i])) { return values[i] }
			}
		},

		//
		// Returns a function, that, as long as it continues to be invoked, will not
		// be triggered. The function will be called after it stops being called for
		// N milliseconds.
		//
		debounce(func, wait, context) {
			var timeout;
			return function (...args) {
				var laterFn = () => {
					timeout = null;
					func.apply(context, args);
				};
				clearTimeout(timeout);
				timeout = setTimeout(laterFn, wait);
			};
		},

		//
		// runs a function every animation frame
		// returns a function that can be called to stop the loop
		//
		eachAnimationFrame(fn, context) {
			var stop = false;
			function iterationFn() {
				fn.apply(context);
				if (stop) { return }
				requestAnimationFrame(iterationFn);
			}
			iterationFn();
			return function stopEachAnimationFrame() {
				stop = true;
			};
		},

		//
		// Returns a function, that will only be triggered once per synchronous 'stack'.
		//
		oncePerStack(func, context) {
			var notRunYet = true;
			return function (...args) {
				if (notRunYet) {
					notRunYet = false;
					setTimeout(() => { notRunYet = true }, 0);
					func.apply(context, args);
				}
			};
		},

		//
		// creates a new observable property to the given object;
		// this object is assumed to have a `trigger` method
		//
		// options.name (mandatory) - the name of the property
		//
		observable(obj, options) {
			var value;
			Object.defineProperty(obj, options.name, {
				get() { return value },
				set(newValue) {
					if (newValue !== value) {
						var oldValue = value;
						value = newValue;
						this.trigger(options.name, newValue, oldValue);
					}
				}
			});
		},

		//
		// Create a new cache to manage a specific value that is costly to compute or retrieve.
		// It ensures that the retrieval function is not called only once per stack, and uses a cache
		// to return a known value in between. It is also able to notify you when the value
		// has actually changed. It does so using `===` comparison, but you can provide your own
		// comparison function.
		//
		cached(options) {
			//
			// normalize parameters
			//
			var retrieve = options.retrieve,
				isEqual = options.isEqual || ((a, b) => (a === b));

			//
			// keep a cache and give it an initial value
			//
			var cache;
			function setValue() {
				var oldValue = cache;
				cache = retrieve();
				if (onChange && !isEqual(cache, oldValue)) {
					onChange(cache, oldValue);
				}
			}
			setTimeout(setValue, 0);

			//
			// retrieve a value at most once per stack and
			// invoke the callback whenever the value is new
			//
			var oncePerStackSetValue = U.oncePerStack(setValue);

			//
			// the resulting function possibly performs retrieval,
			// and always returns the cache (which may contain the new value)
			//
			var resultFn = () => {
				oncePerStackSetValue();
				return cache;
			};

			//
			// allow the onChange callback to be set after creation;
			// NOTE: only one callback is stored!
			//
			var onChange;
			resultFn.onChange = (cb) => { onChange = cb; return resultFn; };

			return resultFn;
		}

	};

	return U;
});
