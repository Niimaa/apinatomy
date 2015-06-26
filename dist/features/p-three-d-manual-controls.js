(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("three-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery", "three-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("three-js")) : factory(root["jquery"], root["bluebird"], root["kefir"], root["tweenjs"], root["kefir-jquery"], root["three-js"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_66__, __WEBPACK_EXTERNAL_MODULE_68__) {
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

	module.exports = __webpack_require__(34);


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(63)], __WEBPACK_AMD_DEFINE_RESULT__ = function (P) {
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

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(15), __webpack_require__(64), __webpack_require__(65), __webpack_require__(66)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, Kefir, TWEEN, KefirJQuery) {
	
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
			var handler = arguments[1] === undefined ? U.call : arguments[1];
	
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
				var _ref2 = arguments[1] === undefined ? {} : arguments[1];
	
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
			var _ref4 = arguments[0] === undefined ? {} : arguments[0];
	
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
			var _ref5 = arguments[0] === undefined ? {} : arguments[0];
	
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

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(63), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (P, defer) {
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
				var prototype = arguments[2] === undefined ? {} : arguments[2];
	
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
					throw new Error(message || 'Assertion failed');
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
					for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
						args[_key6] = arguments[_key6];
					}
	
					if (notRunYet) {
						notRunYet = false;
						setTimeout(function () {
							notRunYet = true;
						}, 0);
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
					if (pair[0] == variable) {
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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(15), __webpack_require__(68), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, THREE, Kefir) {
		'use strict';
	
		var plugin = $.circuitboard.plugin['do']('three-d-manual-controls', {
			requires: ['three-d']
		});
	
		/* constants */
		//var EPS = 0.000001;
		//var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
		var MOUSE_BUTTON = { LEFT: 1, MIDDLE: 2, RIGHT: 3 };
	
		plugin.append('Circuitboard.prototype.construct', function () {
			var _this = this;
	
			/* the 'threeDManualControlsEnabled' property */
			this.newProperty('threeDManualControlsEnabled', { initial: true });
	
			/* the 'three-d-manual-controls-used' event */
			this.newEvent('three-d-manual-controls-used');
	
			this.on('threeDMode').value(true).onValue(function () {
	
				var somethingChanged = false;
	
				/* screen position and size */ // TODO: refactor - cut out the middleman
				_this._screen = {};
				_this.on('threeDCanvasSize').onValue(function (size) {
					_this._screen.width = size.width;
					_this._screen.height = size.height;
					_this._screen.left = parseFloat(_this.threeDCanvasElement.css('left'));
					_this._screen.top = parseFloat(_this.threeDCanvasElement.css('top'));
				});
				_this.getMouseOnScreen = function (pageX, pageY) {
					return new THREE.Vector2((pageX - _this._screen.left) / _this._screen.width, (pageY - _this._screen.top) / _this._screen.height);
				};
	
				/* disable context menu on right-click */
				_this.threeDCanvasElement.asKefirStream('contextmenu').onValue(function (event) {
					event.preventDefault();
				});
	
				/* creating various event streams */
				var dragging = _this.threeDCanvasElement.mouseDrag({ threshold: _this.options.dragThreshold }).filter(function () {
					return _this.threeDManualControlsEnabled;
				});
				var keydown = $(window).asKefirStream('keydown').filter(function () {
					return _this.threeDManualControlsEnabled;
				});
				var keyup = $(window).asKefirStream('keyup');
				var scrolling = _this.threeDCanvasElement.mouseWheel().filter(function () {
					return _this.threeDManualControlsEnabled;
				});
				var button = function button(b) {
					return function (_ref) {
						var mouseDownEvent = _ref.mouseDownEvent;
						return mouseDownEvent.which === b;
					};
				};
				var key = function key(from, to) {
					return function (event) {
						return event.which >= from && event.which <= (to || from);
					};
				};
	
				/* rotating with the left mouse button */
				_this._rotateStart = new THREE.Vector3();
				_this._rotateEnd = new THREE.Vector3();
				var canvasOffset = _this.threeDCanvasElement.offset();
				dragging.filter(button(MOUSE_BUTTON.LEFT)).onValue(function (_ref2) {
					var mouseDownEvent = _ref2.mouseDownEvent;
					var mouseMoveEvent = _ref2.mouseMoveEvent;
					// TODO: touch
	
					somethingChanged = true;
	
					if (!mouseDownEvent._pastFirst) {
						mouseDownEvent._pastFirst = true;
						_this._rotateStart.copy(_this.getMouseProjectionOnBall(mouseDownEvent.pageX - canvasOffset.left, mouseDownEvent.pageY - canvasOffset.top));
					}
					_this._rotateEnd.copy(_this.getMouseProjectionOnBall(mouseMoveEvent.pageX - canvasOffset.left, mouseMoveEvent.pageY - canvasOffset.top));
				});
	
				/* rotating with the keyboard */
				_this.newProperty('currentArrowKey', {
					initial: false
				}).plug(keydown.filter(key(37, 40)).flatMapLatest(function (keydownEvent) {
					return Kefir.merge([Kefir.once(keydownEvent), keyup.filter(key(keydownEvent.which)).mapTo(false).take(1)]);
				}));
				_this.on('currentArrowKey').changes().onValue(function () {
					somethingChanged = true;
				});
	
				/* zooming with the middle mouse button */
				_this._zoomStart = new THREE.Vector2();
				_this._zoomEnd = new THREE.Vector2();
				dragging.filter(button(MOUSE_BUTTON.MIDDLE)).onValue(function (_ref3) {
					var mouseDownEvent = _ref3.mouseDownEvent;
					var mouseMoveEvent = _ref3.mouseMoveEvent;
	
					somethingChanged = true;
	
					if (!mouseDownEvent._pastFirst) {
						mouseDownEvent._pastFirst = true;
						_this._zoomStart.copy(_this.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
					}
					_this._zoomEnd.copy(_this.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
				});
				/* zooming with the scroll-wheel */
				scrolling.onValue(function (event) {
	
					somethingChanged = true;
	
					event.preventDefault();
					event.stopPropagation();
	
					event = event.originalEvent;
	
					var diff = 0;
	
					if (event.wheelDelta) {
						// WebKit / Opera / Explorer 9
						diff = event.wheelDelta / 40;
					} else if (event.detail) {
						// Firefox
						diff = -event.detail / 3;
					}
	
					_this._zoomStart.y += diff * 0.01;
				});
	
				/* panning with the right mouse button */
				_this._panStart = new THREE.Vector2();
				_this._panEnd = new THREE.Vector2();
				dragging.filter(button(MOUSE_BUTTON.RIGHT)).onValue(function (_ref4) {
					var mouseDownEvent = _ref4.mouseDownEvent;
					var mouseMoveEvent = _ref4.mouseMoveEvent;
	
					somethingChanged = true;
	
					if (!mouseDownEvent._pastFirst) {
						mouseDownEvent._pastFirst = true;
						_this._panStart.copy(_this.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
					}
					_this._panEnd.copy(_this.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
				});
	
				/* updating all the stuff */
				_this._eye = new THREE.Vector3();
				_this._panSpeed = 1;
				_this._rotateSpeed = 1;
				_this.zoomSpeed = 1;
				_this.on('3d-render').takeWhileBy(_this.p('threeDMode')).onValue(function () {
					// TODO: this doesn't reactivate when threeDMode is turned off and then on again!
	
					if (somethingChanged || _this.currentArrowKey) {
						somethingChanged = false;
	
						/* trigger event for manual controls used */
						_this.event('three-d-manual-controls-used').emit();
	
						/* setup */
						_this._eye.subVectors(_this.camera3D.position, _this.camera3D.userData.target);
	
						/* panning */
						(function () {
							var mouseChange = new THREE.Vector2();
							var objectUp = new THREE.Vector3();
							var pan = new THREE.Vector3();
							mouseChange.copy(_this._panEnd).sub(_this._panStart); // TODO: just store this directly?
							if (mouseChange.lengthSq()) {
								mouseChange.multiplyScalar(_this._eye.length() * _this._panSpeed);
								pan.copy(_this._eye);
								pan.cross(_this.camera3D.up);
								pan.setLength(mouseChange.x);
								pan.add(objectUp.copy(_this.camera3D.up).setLength(mouseChange.y));
								_this.camera3D.position.add(pan);
								if (!_this.camera3D.userData.semanticTarget) {
									_this.camera3D.userData.target.add(pan);
								}
								_this._panStart.copy(_this._panEnd);
							}
						})();
	
						/* rotating by mouse */
						(function () {
							var axis = new THREE.Vector3();
							var quaternion = new THREE.Quaternion();
							var angle = Math.acos(_this._rotateStart.dot(_this._rotateEnd) / _this._rotateStart.length() / _this._rotateEnd.length());
							if (angle) {
								axis.crossVectors(_this._rotateStart, _this._rotateEnd).normalize();
	
								angle *= _this._rotateSpeed;
	
								quaternion.setFromAxisAngle(axis, -angle);
	
								_this._eye.applyQuaternion(quaternion);
								_this.camera3D.up.applyQuaternion(quaternion);
								_this._rotateEnd.applyQuaternion(quaternion);
								_this._rotateStart.copy(_this._rotateEnd);
							}
						})();
	
						/* rotating by keyboard */
						(function () {
							if (_this.currentArrowKey) {
								var _currentArrowKey = _this.currentArrowKey;
								var which = _currentArrowKey.which;
								var ctrlKey = _currentArrowKey.ctrlKey;
	
								var axis = new THREE.Vector3();
								if ((which === 38 || which === 40) && !ctrlKey) {
									axis.set(1, 0, 0);
								} // x: up,down
								else if ((which === 37 || which === 39) && !ctrlKey) {
									axis.set(0, 1, 0);
								} // y: left,right
								else if ((which === 37 || which === 39) && ctrlKey) {
									axis.set(0, 0, 1);
								} // z: ctrl+left,right
								else {
									return;
								}
								var angle = 0.015 * Math.PI * _this._rotateSpeed;
								if (which === 39 || which === 40) {
									angle *= -1;
								}
	
								var quaternion = new THREE.Quaternion();
								quaternion.setFromAxisAngle(axis, -angle);
								_this._eye.applyQuaternion(quaternion);
								_this.camera3D.up.applyQuaternion(quaternion);
							}
						})();
	
						/* zooming by keyboard */
						// leave this before the 'zooming by mouse' section
						(function () {
							if (_this.currentArrowKey) {
								var _currentArrowKey2 = _this.currentArrowKey;
								var which = _currentArrowKey2.which;
								var ctrlKey = _currentArrowKey2.ctrlKey;
	
								if (which === 38 && ctrlKey) {
									// ctrl+up
									_this._zoomStart.y += 0.02;
								} else if (which === 40 && ctrlKey) {
									// ctrl+down
									_this._zoomStart.y -= 0.02;
								}
							}
						})();
	
						/* zooming by mouse */
						(function () {
							//if (this._state === STATE.TOUCH_ZOOM_PAN) {
							//	this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
							//	this._eye.multiplyScalar(this._touchZoomDistanceStart / this._touchZoomDistanceEnd);
							//} else {
							//}
	
							var factor = 1 + (_this._zoomEnd.y - _this._zoomStart.y) * _this.zoomSpeed; // set factor
							if (factor !== 1 && factor > 0) {
								_this._eye.multiplyScalar(factor);
								_this._zoomStart.copy(_this._zoomEnd);
							}
						})();
	
						/* z-axis restriction */
						if (_this.options.forbidSubZeroZ) {
							var eyeLength = _this._eye.length();
							if (_this.camera3D.userData.target.z < 0) {
								_this.camera3D.userData.target.z = 0;
							}
							if (_this._eye.z < 0) {
								_this._eye.z = 0;
							}
							_this._eye.setLength(eyeLength);
						}
	
						/* breakdown */
						_this.camera3D.position.addVectors(_this.camera3D.userData.target, _this._eye);
					}
	
					_this.camera3D.lookAt(_this.camera3D.userData.target);
				});
	
				///* panning with the right mouse button */
				//dragging.filter(button(MOUSE_BUTTON.RIGHT)).onValue(({mouseDownEvent, mouseMoveEvent}) => {
				//
				//	if (!mouseDownEvent._cameraPosition0) {
				//		mouseDownEvent._cameraPosition0 = new THREE.Vector3().copy(this.camera3D.position);
				//	}
				//
				//	this.camera3D.position.x = mouseDownEvent._cameraPosition0.x + mouseDownEvent.pageX - mouseMoveEvent.pageX;
				//	this.camera3D.position.y = mouseDownEvent._cameraPosition0.y + mouseDownEvent.pageY - mouseMoveEvent.pageY;
				//
				//});
			});
		});
	
		plugin.add('Circuitboard.prototype.getMouseProjectionOnBall', function getMouseProjectionOnBall(pageX, pageY) {
			var vector = new THREE.Vector3();
			var objectUp = new THREE.Vector3();
			var mouseOnBall = new THREE.Vector3();
	
			mouseOnBall.set((pageX - this._screen.width * 0.5 - this._screen.left) / (this._screen.width * 0.5), (this._screen.height * 0.5 + this._screen.top - pageY) / (this._screen.height * 0.5), 0);
	
			var length = mouseOnBall.length();
	
			if (length > 1) {
				mouseOnBall.normalize();
			} else {
				mouseOnBall.z = Math.sqrt(1 - length * length);
			}
	
			this._eye.copy(this.camera3D.position).sub(this.camera3D.userData.target);
	
			vector.copy(this.camera3D.up).setLength(mouseOnBall.y);
			vector.add(objectUp.copy(this.camera3D.up).cross(this._eye).setLength(mouseOnBall.x));
			vector.add(this._eye.setLength(mouseOnBall.z));
	
			return vector;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_63__;

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_64__;

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_65__;

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_66__;

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_68__;

/***/ }

/******/ })
});
;
//# sourceMappingURL=p-three-d-manual-controls.js.map