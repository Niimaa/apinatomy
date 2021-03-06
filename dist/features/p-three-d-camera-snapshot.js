(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jquery"], root["bluebird"], root["kefir"], root["tweenjs"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (P, defer) {
		'use strict';
	
		var U = {
	
			//// create a new class, given a constructor and possible prototype
			//newClass(constructor, prototype = {}) {
			//	constructor.prototype = prototype;
			//	constructor.prototype.constructor = constructor;
			//	return constructor;
			//}, // Already made redundant by ES6; TODO: do same for `newSubclass`
	
			// create a new subclass, given a superclass, constructor and possible prototype
			newSubclass: function newSubclass(superClass, constructorMaker) {
				var prototype = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
				var constructor = constructorMaker(superClass.prototype.constructor);
				constructor.prototype = Object.create(superClass.prototype);
				U.extend(constructor.prototype, prototype);
				constructor.prototype.constructor = constructor;
				return constructor;
			},
	
			// extend the first passed object with the properties
			// of the other objects, from left to right, and returns
			// the first passed object
			extend: function extend(obj1) {
				for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					rest[_key - 1] = arguments[_key];
				}
	
				rest.forEach(function (obj) {
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
						}
					}
				});
				return obj1;
			},
	
			// create a function that returns the value of
			// a specific field from a given object
			field: function field(name) {
				return function (obj) {
					return obj[name];
				};
			},
	
			// create a function that returns the value of
			// a specific field from a given object
			call: function call(fn) {
				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					args[_key2 - 1] = arguments[_key2];
				}
	
				return fn.apply(undefined, args);
			},
	
			// a function that returns its first argument
			id: function id(v) {
				return v;
			},
	
			// get the object `obj[name]`; if `obj[name]` is not
			// defined, give it a default value first; if the given value
			// is a function, it is called, and its result is used
			getDef: function getDef(obj, name, value) {
				if (U.isUndefined(obj[name])) {
					if (typeof value === 'function') {
						value = value();
					}
					obj[name] = value;
				}
				return obj[name];
			},
	
			// get the object `obj[name]`; if `obj[name]` is not
			// a (plain) object, make it an empty object first
			object: function object(obj, name) {
				return U.getDef(obj, name, {});
			},
	
			// get the array `obj[name]`; if `obj[name]` is not
			// an array, make it an empty array first
			array: function array(obj, name) {
				return U.getDef(obj, name, []);
			},
	
			// pull a value from an array
			pull: function pull(arr, val) {
				var i = arr.indexOf(val);
				if (i !== -1) {
					arr.splice(i);
				}
			},
	
			// empty out an array
			makeEmpty: function makeEmpty(arr) {
				while (arr.length > 0) {
					arr.pop();
				}
			},
	
			// `Function.bind`, but taking an array like `Function.apply` does
			bindA: function bindA(fn, ctx, args) {
				return fn.bind.apply(fn, [ctx].concat(args));
			},
	
			// `Function.bind`, but only having to specify the context-object once
			bind: function bind(obj, m) {
				for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
					args[_key3 - 2] = arguments[_key3];
				}
	
				return U.bindA(obj[m], obj, args);
			},
	
			// allows the Function constructor to be used
			// with an array of formal parameters
			applyConstructor: function applyConstructor(ConstructorFn, args) {
				var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
				return new NewConstructorFn();
			},
	
			// a simple `assert` function, to express a
			// condition that is expected to be true
			assert: function assert(condition, message) {
				if (!condition) {
					throw new Error(message || "Assertion failed");
				}
			},
	
			// test if a value is `undefined`
			isUndefined: function isUndefined(val) {
				return typeof val === 'undefined';
			},
	
			// test if a value is defined (not `undefined`)
			isDefined: function isDefined(val) {
				return typeof val !== 'undefined';
			},
	
			// test if a value is a plain object
			isPlainObject: function isPlainObject(val) {
				return typeof val === 'object' && val.constructor === Object;
			},
	
			// test if a value is a function
			isFunction: function isFunction(val) {
				return typeof val === 'function';
			},
	
			// extract an array of values from an object
			objValues: function objValues(obj) {
				return Object.keys(obj).map(function (key) {
					return obj[key];
				});
			},
	
			// enable an HTML element to serve as anchor for absolutely positioned children
			makePositioned: function makePositioned(element) {
				if (element.css('position') === 'static') {
					element.css('position', 'relative');
				}
			},
	
			// return the first parameter that is not 'undefined'
			defOr: function defOr() {
				for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					values[_key4] = arguments[_key4];
				}
	
				for (var i = 0; i < values.length; i += 1) {
					if (U.isDefined(values[i])) {
						return values[i];
					}
				}
			},
	
			// Returns a function, that, as long as it continues to be invoked, will not
			// be triggered. The function will actually be invoked after it stops being called
			// for N milliseconds. Every invocation returns a promise to the eventual result.
			debounce: function debounce(func, wait, context) {
				var timeout;
				var deferred = defer();
				return function () {
					var _this = this;
	
					for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
						args[_key5] = arguments[_key5];
					}
	
					var laterFn = function laterFn() {
						timeout = null;
						deferred.resolve(func.apply(context || _this, args));
						deferred = defer();
					};
					clearTimeout(timeout);
					timeout = setTimeout(laterFn, wait);
					return deferred.promise;
				};
			},
	
			// Returns a function, that will only be triggered once per synchronous 'stack'.
			oncePerStack: function oncePerStack(func, context) {
				var notRunYet = true;
				var result = function result() {
					if (notRunYet) {
						notRunYet = false;
						setTimeout(function () {
							notRunYet = true;
						}, 0);
	
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
							args[_key6] = arguments[_key6];
						}
	
						func.apply(context || this, args);
					}
				};
				result.allowAdditionalCall = function () {
					notRunYet = true;
				};
				return result;
			},
	
			/*  Create a new cache to manage a specific value that is costly to compute or retrieve.    */
			/*  It ensures that the retrieval function is not called only once per stack, and uses a    */
			/*  cache to return a known value in between. It is also able to notify you when the value  */
			/*  has actually changed. It does so using `===` comparison, but you can provide your own   */
			/*  comparison function.                                                                    */
			cached: function cached(_ref) {
				var retrieve = _ref.retrieve;
				var isEqual = _ref.isEqual;
	
				/* normalize parameters */
				isEqual = isEqual || function (a, b) {
					return a === b;
				};
	
				/* keep a cache and give it an initial value */
				var cache;
	
				/* how to retrieve a new value, and process it if it is new */
				function retrieveValue() {
					var newValue = retrieve();
					var oldValue = cache;
					if (!isEqual(newValue, oldValue)) {
						cache = newValue;
						onChange.forEach(function (fn) {
							return fn(newValue, oldValue);
						});
					}
				}
	
				/* retrieve a value at most once per stack */
				var oncePerStackSetValue = U.oncePerStack(retrieveValue);
	
				/*  the resulting function possibly performs retrieval,             */
				/*  and always returns the cache (which may contain the new value)  */
				var resultFn = function resultFn() {
					oncePerStackSetValue();
					return cache;
				};
	
				/* allow an onChange callback to be set */
				var onChange = [];
				resultFn.onChange = function (cb) {
					onChange.push(cb);
					return resultFn;
				};
	
				/* allow breaking of the cache, allowing multiple calls per stack */
				resultFn.allowAdditionalCall = function () {
					oncePerStackSetValue.allowAdditionalCall();
				};
	
				/* retrieve the first value right now */
				oncePerStackSetValue();
	
				return resultFn;
			},
	
			promisify: function promisify(obj, method) {
				return function () {
					for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
						args[_key7] = arguments[_key7];
					}
	
					return new P(function (resolve, reject) {
						try {
							obj[method].apply(obj, args.concat(resolve));
						} catch (error) {
							reject(error);
						}
					});
				};
			},
	
			findIndex: function findIndex(array, pred) {
				for (var i = 0; i < array.length; ++i) {
					if (pred(array[i], i, array)) {
						return i;
					}
				}
				return -1;
			},
	
			// this `memoize` function is SLOW, as it uses linear search
			memoize: function memoize(fn) {
				var keys = [];
				var cache = [];
				return function () {
					for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
						args[_key8] = arguments[_key8];
					}
	
					/* check the cache */
					var index = U.findIndex(keys, function (key) {
						return key.every(function (v, i) {
							return v === args[i];
						});
					});
					if (index >= 0) {
						return cache[index];
					}
	
					/* no cache hit; compute value, store and return */
					var result = fn.apply(this, args);
					keys.push(args);
					cache.push(result);
					return result;
				};
			},
	
			getQueryVariable: function getQueryVariable(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split('&');
				for (var i = 0; i < vars.length; ++i) {
					var pair = vars[i].split('=');
					if (pair[0] === variable) {
						return pair[1];
					}
				}
				return null;
			}
	
		};
	
		var EPS = 0.000001;
		var sortOfEqual = function sortOfEqual(a, b) {
			return b - EPS < a && a < b + EPS;
		};
	
		/* HTML element position */
		U.Position = function Position(top, left) {
			_classCallCheck(this, Position);
	
			this.top = top;
			this.left = left;
		};
		U.Position.subtract = function (a, b) {
			return new U.Position(a.top - b.top, a.left - b.left);
		};
		U.Position.equals = function (a, b) {
			return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.top, b.top) && sortOfEqual(a.left, b.left);
		};
	
		/* HTML element size */
		U.Size = function Size(height, width) {
			_classCallCheck(this, Size);
	
			this.height = height;
			this.width = width;
		};
		U.Size.equals = function (a, b) {
			return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.height, b.height) && sortOfEqual(a.width, b.width);
		};
	
		return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (P) {
		'use strict';
	
		return function defer() {
			var resolve, reject;
			var promise = new P(function () {
				resolve = arguments[0];
				reject = arguments[1];
			});
			//noinspection JSUnusedAssignment
			return {
				resolve: resolve,
				reject: reject,
				promise: promise
			};
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, Kefir, TWEEN, KefirJQuery) {
	
		/* Kefir jQuery plugin ********************************************************************************************/
	
		KefirJQuery.init(Kefir, $);
	
		/* EventStream generators *****************************************************************************************/
	
		// This method works with events that can have only one subscriber,
		// that can be un-subscribed by setting the subscriber to `null`.
		// This function is memoized, so only one subscription is taken,
		// and the same stream for it returned for each request.
		Kefir.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
			return Kefir.fromBinder(function (emitter) {
				obj.on(eventName, emitter.emit);
				return function () {
					obj.on(eventName, null);
				};
			});
		});
	
		var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (f) {
			window.setTimeout(f, 1000 / 60);
		};
		Kefir.animationFrames = function animationFrames() {
			return Kefir.fromBinder(function (emitter) {
	
				/* self-calling animation-frame loop */
				var subscribed = true;
				(function iterationFn() {
					requestAnimationFrameFn(function () {
						emitter.emit();
						if (subscribed) {
							iterationFn();
						}
					});
				})();
	
				/* unsubscribe function */
				return function () {
					subscribed = false;
				};
			});
		};
	
		Kefir.tween = function tween(objStart, objEnd, _ref) {
			var duration = _ref.duration;
			var delay = _ref.delay;
			var easing = _ref.easing;
	
			/* the tween */
			var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	
			/* the returned bus */
			var bus = Kefir.bus();
	
			/* a local function to plug in other streams, keeping track in order to 'end' the bus */
			var addStream = (function () {
				var chainedStreams = 0;
				return function (stream) {
					chainedStreams += 1;
					bus.plug(stream);
					stream.onEnd(function () {
						chainedStreams -= 1;
						if (chainedStreams === 0) {
							bus.end();
						}
					});
				};
			})();
	
			/* main stream */
			addStream(Kefir.fromBinder(function (emitter) {
				if (easing) {
					tw.easing(easing);
				}
				if (delay) {
					tw.delay(delay);
				}
				tw.onUpdate(function () {
					emitter.emit(this);
				});
				tw.onComplete(emitter.end);
			}));
	
			/* adding tween-specific properties to the returned bus */
			bus.tween = tw;
			bus.start = function () {
				tw.start();
				return bus;
			};
			bus.chain = function (other) {
				addStream(other);
				tw.chain(other.tween);
				return bus;
			};
	
			/* returning the bus */
			return bus;
		};
	
		Kefir.keyPress = function keyPress(keyCode) {
			return $(window).asKefirStream('keypress').filter(function (e) {
				return e.keyCode === keyCode;
			});
		};
	
		Kefir.once = function once(value) {
			return Kefir.fromBinder(function (emitter) {
				emitter.emit(value);
				emitter.end();
			});
			//return Kefir.constant(value); // TODO: replace all 'once' calls with 'constant' calls; then remove 'once'
		};
	
		Kefir.fromArray = function fromArray(array) {
			return Kefir.fromBinder(function (emitter) {
				array.forEach(emitter.emit);
				emitter.end();
			});
		};
	
		/* EventStream converters *****************************************************************************************/
	
		// This creates a 'window of opportunity' to limit other streams by.
		// This window is provided by the `pacing` observable. An optional `handler`
		// parameter can be given to do some setup and some breakdown. It is passed a function as an argument
		// that should be called *once* in the place where other streams can do their
		// thing. It returns a function used to wrap other streams. It does not
		// return a stream.
		Kefir.limiter = function limiter(pacing) {
			var handler = arguments.length <= 1 || arguments[1] === undefined ? U.call : arguments[1];
	
			var wantedBus = Kefir.bus();
			var open = Kefir.bus();
			var close = Kefir.bus();
	
			/* takes 'this' stream as pacing for a window of opportunity for other streams */
			pacing.filterBy(wantedBus.toProperty(false)).onValue(function () {
				handler(function () {
					open.emit();
					wantedBus.emit(false);
					close.emit();
				});
			});
	
			/* returns a function to wrap a stream in this wrapper */
			return function (stream) {
				var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
				var buffer = _ref2.buffer;
	
				wantedBus.plug(stream.mapTo(true));
				return Kefir.constant(true).take(1).concat(close).flatMapLatest(function () {
					var accumulator = function accumulator(arr, val) {
						return buffer ? arr.concat([val]) : [val];
					};
					return stream.takeUntilBy(open).reduce(accumulator, []).flatMap(Kefir.fromArray);
				});
			};
		};
	
		// This restricts a given stream to a wrapper stream created with the method above.
		// All its original events are now fired inside the provided window. Set `options.buffer`
		// to `true` if all its events should be buffered and released inside the next window.
		// Otherwise, only the last event is retained.
		Kefir.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
			return wrapper(this, options);
		};
	
		// convert to a stream of 1-or-2 element arrays;
		// the first is just the element at that point in the stream
		// the second is the previous element in the stream, if there is one
		Kefir.Observable.prototype.newOld = function newOld() {
			return Kefir.fromArray([null, null]).concat(this).slidingWindow(2).map(function (_ref3) {
				var _ref32 = _slicedToArray(_ref3, 2);
	
				var a = _ref32[0];
				var b = _ref32[1];
				return [b, a];
			});
		};
	
		// This is a cheap version of the limiter defined above. TODO: use the limiter where this is now used
		Kefir.Stream.prototype.holdUntil = function holdUntil(pacing) {
			var _this = this;
	
			return Kefir.fromBinder(function (emitter) {
				var buffer = [];
				var unsubscribeToThis = _this.onValue(function (value) {
					buffer.push(value);
				});
				var unsubscribeToPacing = pacing.onValue(function () {
					if (buffer.length > 0) {
						var oldBuffer = buffer;
						buffer = [];
						oldBuffer.forEach(emitter.emit);
					}
				});
				return function () {
					unsubscribeToThis();
					unsubscribeToPacing();
					buffer = null;
				};
			});
		};
	
		// This filters an observable to only let through values equal to the given value.
		Kefir.Observable.prototype.value = function (value, comparator) {
			comparator = comparator || function (e) {
				return e === value;
			};
			return this.skipDuplicates().filter(comparator);
		};
	
		// This makes a subscription to an observable that doesn't do anything
		Kefir.Observable.prototype.run = function () {
			var _this2 = this;
	
			var doNothing = function doNothing() {};
			this.onValue(doNothing);
			return function () {
				_this2.offValue(doNothing);
			};
		};
	
		// This is a 'smart' .stopPropagation, marking events with a label
		// and skipping those that already have that label.
		Kefir.Stream.prototype.skipPropagation = function (label) {
			return this.filter(function (event) {
				return !U.array(event.originalEvent, '_onlyOnceFor')[label];
			}).map(function (event) {
				U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
			});
		};
	
		// Filter events to only certain keys / buttons. Can be a predicate function or single number.
		Kefir.Stream.prototype.which = function (buttonId) {
			var pred = typeof buttonId === 'function' ? buttonId : function (b) {
				return b === buttonId;
			};
			return this.filter(function (e) {
				return pred(e.which);
			});
		};
	
		/* EventStream generators *****************************************************************************************/
	
		$.fn.mouseDrag = function mouseDrag() {
			var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			var threshold = _ref4.threshold;
	
			return $(this).asKefirStream('mousedown').flatMap(function (mouseDownEvent) {
				var stream = $(document).asKefirStream('mousemove');
				if (threshold) {
					var crossed = false;
					stream = stream.filter(function (mouseMoveEvent) {
						// TODO: don't use 'filter', but something like 'skipUntil' or 'flatMap'
						if (crossed) {
							return true;
						}
						var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
						var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
						if (dx * dx + dy * dy > threshold * threshold) {
							return crossed = true;
						}
						return false;
					});
				}
				return stream.takeUntilBy($(document).asKefirStream('mouseup')).map(function (mouseMoveEvent) {
					return { mouseDownEvent: mouseDownEvent, mouseMoveEvent: mouseMoveEvent };
				});
			});
		};
	
		$.fn.mouseClick = function mouseClick() {
			var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			var threshold = _ref5.threshold;
	
			return $(this).asKefirStream('mousedown').flatMap(function (mouseDownEvent) {
				var untilStream = $(document).asKefirStream('mousemove');
				if (threshold) {
					var crossed = false;
					untilStream = untilStream.filter(function (mouseMoveEvent) {
						if (crossed) {
							return true;
						}
						var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
						var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
						if (dx * dx + dy * dy > threshold * threshold) {
							return crossed = true;
						}
						return false;
					});
				}
				return $(document).asKefirStream('mouseup').take(1).takeUntilBy(untilStream);
			});
		};
	
		$.fn.mouseWheel = function mouseWheel() {
			return $(this).asKefirStream('mousewheel DOMMouseScroll');
		};
	
		return Kefir;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, P, U, Kefir, TWEEN) {
		'use strict';
	
		var plugin = $.circuitboard.plugin['do']('three-d-camera-snapshot', {
			resolves: ['three-d', 'snapshot'],
			requires: ['three-d-auto-controls']
		});
	
		plugin.append('Snapshot.prototype.take', function () {
	
			if (!this.options.camera3D) {
				return;
			}
	
			this.object.camera3D = {
				position: {
					x: this.circuitboard.camera3D.position.x,
					y: this.circuitboard.camera3D.position.y,
					z: this.circuitboard.camera3D.position.z
				},
				rotation: {
					x: this.circuitboard.camera3D.rotation.x,
					y: this.circuitboard.camera3D.rotation.y,
					z: this.circuitboard.camera3D.rotation.z
				},
				up: {
					x: this.circuitboard.camera3D.up.x,
					y: this.circuitboard.camera3D.up.y,
					z: this.circuitboard.camera3D.up.z
				}
			};
	
			var semanticTarget = this.circuitboard.camera3D.userData.semanticTarget;
			if (semanticTarget) {
				U.assert(semanticTarget.type === 'Tile', 'At this point in development, the only semantic camera target should be a Tile. But it\'s a ' + semanticTarget.type + '!');
	
				this.object.camera3D.semanticTarget = semanticTarget.model.id;
			} else {
				this.object.camera3D.target = {
					x: this.circuitboard.camera3D.userData.target.x,
					y: this.circuitboard.camera3D.userData.target.y,
					z: this.circuitboard.camera3D.userData.target.z
				};
			}
		}).append('Snapshot.prototype.restore', function () {
			var _this = this;
	
			if (!this.options.camera3D) {
				return;
			}
	
			/* turn off any currently existing semantic targets */
			this.circuitboard.cameraTargetTile = null;
	
			/* determine the new target, which can either have a semantic source (a tile)  */
			/* or a syntactic source (an explicit set of coordinates) */
			var targetP;
			if (this.object.camera3D.semanticTarget) {
				targetP = this.circuitboard.tile(this.object.camera3D.semanticTarget).then(function (tile) {
					return _this.circuitboard.object3D.localToWorld(tile.object3D.position.clone());
				});
			} else {
				targetP = P.resolve(this.object.camera3D.target);
			}
	
			/* smoothly transition the camera to its new target */
			targetP.then(function (target) {
	
				// TODO: in order to work smoothly with both syntactic and semantic targets,
				//     : we should perform manipulations and corrections on a dummy camera in the three.js world;
				//     : this will work better than 'just changing the target' as we do below
	
				var easing = { duration: 800, easing: TWEEN.Easing.Sinusoidal.InOut };
	
				var from = _this.circuitboard.camera3D;
				var to = _this.object.camera3D;
	
				var tweenPosition = Kefir.tween(from.position, to.position, easing);
				var tweenRotation = Kefir.tween(from.rotation, to.rotation, easing);
				var tweenUp = Kefir.tween(from.up, to.up, easing);
				var tweenTarget = Kefir.tween(from.userData.target, target, easing);
	
				Kefir.merge([tweenPosition.start(), tweenRotation.start(), tweenUp.start(), tweenTarget.start()]);
			});
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

/******/ })
});
;
//# sourceMappingURL=p-three-d-camera-snapshot.js.map