define(() => {
	'use strict';

	var U = {

		// create a new class, given a constructor and possible prototype
		newClass(constructor, prototype) {
			prototype = prototype || {};
			var cls = function (...args) {
				constructor.apply(this, args);
			};
			cls.prototype = prototype;
			cls.prototype.constructor = cls;
			return cls;
		},

		// create a new subclass, given a superclass, constructor and possible prototype
		newSubclass(superClass, constructor, prototype) {
			prototype = prototype || {};
			var cls = function (...args) {
				constructor.apply(this, [superClass.prototype.constructor].concat(args));
			};
			cls.prototype = Object.create(superClass.prototype, prototype);
			cls.prototype.constructor = cls;
			return cls;
		},

		// extend the first passed object with the properties
		// of the other objects, from left to right, and returns
		// the first passed object
		extend(obj1, ...rest) {
			rest.forEach((obj) => {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						obj1[key] = obj[key];
					}
				}
			});
			return obj1;
		},

		// create a function that returns the value of
		// a specific field from a given object
		field(name) { return (obj) => { return obj[name] } },

		// get the object `obj[name]`; if `obj[name]` is not
		// a (plain) object, make it an empty object first
		object(obj, name) {
			if (U.isUndefined(obj[name])) { obj[name] = {} }
			return obj[name];
		},

		// get the array `obj[name]`; if `obj[name]` is not
		// an array, make it an empty array first
		array(obj, name) {
			if (U.isUndefined(obj[name])) { obj[name] = [] }
			return obj[name];
		},

		// pull a value from an array
		pull(arr, val) {
			var i = arr.indexOf(val);
			if (i !== -1) { arr.splice(i) }
		},

		// empty out an array
		makeEmpty(arr) {
			while (arr.length > 0) { arr.pop() }
		},

		// `Function.bind`, but taking an array like `Function.apply` does
		bindA(fn, ctx, args) { return fn.bind.apply(fn, [ctx].concat(args)) },

		// `Function.bind`, but only having to specify the context-object once
		bind(obj, m, ...args) { return U.bindA(obj[m], obj, args) },

		// allows the Function constructor to be used
		// with an array of formal parameters
		applyConstructor(ConstructorFn, args) {
			var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
			return new NewConstructorFn();
		},

		// a simple `assert` function, to express a
		// condition that is expected to be true
		assert(condition, message) {
			if (!condition) { throw new Error(message || "Assertion failed") }
		},

		// test if a value is `undefined`
		isUndefined(val) { return typeof val === 'undefined' },

		// test if a value is defined (not `undefined`)
		isDefined(val) { return typeof val !== 'undefined' },

		// extract an array of values from an object
		objValues(obj) { return Object.keys(obj).map(key => obj[key]) },

		// enable an HTML element to serve as anchor for absolutely positioned children
		makePositioned(element) {
			if (element.css('position') === 'static') {
				element.css('position', 'relative');
			}
		},

		// return the first parameter that is not 'undefined'
		defOr(...values) {
			for (var i = 0; i < values.length; i += 1) {
				if (U.isDefined(values[i])) { return values[i] }
			}
		},

		// Returns a function, that, as long as it continues to be invoked, will not
		// be triggered. The function will be called after it stops being called for
		// N milliseconds.
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

		// runs a function every animation frame
		// returns a function that can be called to stop the loop
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

		// Returns a function, that will only be triggered once per synchronous 'stack'.
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

		// creates a new observable property to the given object;
		// this object is assumed to have a `trigger` method
		//
		// options.name (mandatory) - the name of the property
		// options.validation - if specified, this function is run before a new value is actually set.
		//                      It is passed the new value and the old value, and should return the actual
		//                      value that should be set. This could be the new or old value directly,
		//                      or any transformation. It can also throw an exception, which will just be
		//                      allowed to pass through. Returning the old value prevents a signal from
		//                      being triggered.
		observable(obj, {name, initial, validation}) {
			var value = initial;
			Object.defineProperty(obj, name, {
				get() { return value },
				set(newValue) {
					var oldValue = value;
					if (validation) { newValue = validation(newValue, oldValue) }
					if (newValue !== oldValue) {
						value = newValue;
						this.trigger(name, newValue, oldValue);
					}
				}
			});
		},

		// Create a new cache to manage a specific value that is costly to compute or retrieve.
		// It ensures that the retrieval function is not called only once per stack, and uses a cache
		// to return a known value in between. It is also able to notify you when the value
		// has actually changed. It does so using `===` comparison, but you can provide your own
		// comparison function.
		cached(options) {
			// normalize parameters
			var retrieve = options.retrieve,
					isEqual = options.isEqual || ((a, b) => (a === b));

			// keep a cache and give it an initial value
			var cache;
			function setValue() {
				var oldValue = cache;
				cache = retrieve();
				if (onChange && !isEqual(cache, oldValue)) {
					onChange(cache, oldValue);
				}
			}
			setTimeout(setValue, 0);

			// retrieve a value at most once per stack and
			// invoke the callback whenever the value is new
			var oncePerStackSetValue = U.oncePerStack(setValue);

			// the resulting function possibly performs retrieval,
			// and always returns the cache (which may contain the new value)
			var resultFn = () => {
				oncePerStackSetValue();
				return cache;
			};

			// allow the onChange callback to be set after creation;
			// NOTE: only one callback is stored!
			var onChange;
			resultFn.onChange = (cb) => { onChange = cb; return resultFn; };

			return resultFn;
		}

	};


	// HTML element position
	U.Position = U.newClass(function (top, left) {
		this.top = top;
		this.left = left;
	});
	U.Position.subtract = (a, b) => {
		return new U.Position(a.top - b.top, a.left - b.left);
	};
	U.Position.equals = (a, b) => {
		return a && b && a.top === b.top && a.left === b.left;
	};


	// HTML element size
	U.Size = U.newClass(function (height, width) {
		this.height = height;
		this.width = width;
	});
	U.Position.equals = (a, b) => {
		return a && b && a.height === b.height && a.width === b.width;
	};


	return U;
});
