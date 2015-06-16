(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("three-js"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "three-js", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("three-js"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jquery"], root["bluebird"], root["three-js"], root["kefir"], root["tweenjs"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_66__, __WEBPACK_EXTERNAL_MODULE_67__) {
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

	module.exports = __webpack_require__(26);


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
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(15), __webpack_require__(65), __webpack_require__(66), __webpack_require__(67)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, Kefir, TWEEN, KefirJQuery) {
	
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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(64), __webpack_require__(15), __webpack_require__(12), __webpack_require__(72), __webpack_require__(86)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, THREE, U, Kefir) {
		'use strict';
	
		/* the plugin */
		var plugin = $.circuitboard.plugin['do']('three-d', {
			requires: ['position-tracking', 'tile-shrink-when-hidden']
		});
	
		/* test for browser 3D support */
		function browserSupport() {
			// TODO: use THREE.js function for this that already exists
			var canvas;
			try {
				canvas = $('<canvas>');
				return !!(canvas[0].getContext('webgl') || canvas[0].getContext('experimental-webgl'));
			} catch (__) {
				return false;
			} finally {
				canvas = undefined;
			}
		}
	
		/* the constructor is run once to initialize potential 3D-ness */
		plugin.append('Circuitboard.prototype.construct', function () {
			var _this = this;
	
			/* test for browser support */
			if (!browserSupport()) {
				console.warn('This browser doesn\'t seem to have WebGL support.'); // TODO: add "ApiNATOMY will not be 3D"
				return;
			}
	
			/* the 'threeDCanvasElement' property */
			this.newProperty('threeDCanvasElement');
			this.p('threeDCanvasElement').diff().onValue(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var oldCanvas = _ref2[0];
				var newCanvas = _ref2[1];
				// TODO: use '.diff'
				if (oldCanvas) {
					oldCanvas.removeClass('three-d-canvas');
				}
				if (newCanvas) {
					newCanvas.addClass('three-d-canvas');
				}
			});
	
			/* was a canvas given through the options? */
			this.threeDCanvasElement = this.options.threeDCanvasElement;
	
			/* the 'threeDMode' property */
			this.newProperty('threeDMode', {
				initial: U.isDefined(this.options.threeDCanvasElement)
			}); // TODO: error if no canvas element is set
	
			/* the 'threeDCanvasSize' observable */
			this.newProperty('threeDCanvasSize').plug(Kefir.merge([Kefir.once(), this.options.canvasResizeEvent || $(window).asKefirStream('resize')]).map(function () {
				if (_this.threeDCanvasElement) {
					return new U.Size(_this.threeDCanvasElement.height(), _this.threeDCanvasElement.width());
				}
			}));
	
			/* the render event that will be emitted at frame-rate */
			this.newEvent('3d-render');
	
			/* the code to run every time 3D-ness is turned on */
			this.p('threeDMode').value(true).skipWhileBy(this.p('threeDCanvasSize').not()).onValue(function () {
	
				// TODO: fix bug: when 3D mode is turned off, then on, tiles no longer respond to clicks (SEE COMMENT BELOW: 'takeWhileBy' doesn't reactivate!!!)
	
				/* a short notation for the event of 3D-mode being turned off */
				var onThreeDModeOff = _this.on('threeDMode').value(false).take(1);
	
				/* scene */
				_this._p_threeD_scene = new THREE.Scene();
				onThreeDModeOff.onValue(function () {
					delete _this._p_threeD_scene;
				});
	
				/* camera */
				_this.camera3D = new THREE.PerspectiveCamera(60, _this.threeDCanvasSize.width / _this.threeDCanvasSize.height, 1, 10000);
				_this.camera3D.userData.target = new THREE.Vector3().copy(_this.camera3D.position).setZ(0);
				_this.camera3D.lookAt(_this.camera3D.userData.target);
				onThreeDModeOff.onValue(function () {
					delete _this.camera3D;
				});
				_this.p('threeDCanvasSize').takeWhileBy(_this.p('threeDMode')).onValue(function (canvasSize) {
					_this.camera3D.aspect = canvasSize.width / canvasSize.height;
					if (_this.camera3D.position.z === 0) {
						_this.camera3D.position.z = 1;
					}
					_this.camera3D.position.normalize().multiplyScalar(canvasSize.height / Math.tan(THREE.Math.degToRad(_this.camera3D.fov) / 2) / 2);
					_this.camera3D.updateProjectionMatrix();
				});
	
				/* lighting */
				_this._p_threeD_scene.add(new THREE.AmbientLight(1052720)).add((function () {
					var light = new THREE.PointLight(16777215, 2, 0);
					light.position.set(-2000, -2000, 2000);
					return light;
				})()).add((function () {
					var light = new THREE.PointLight(16777215, 1, 0);
					light.position.set(2000, 2000, -1000);
					return light;
				})());
	
				/* renderers */
				(function () {
					/* WebGL renderer */
					var webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
					webglRenderer.sortObjects = false;
					webglRenderer.shadowMapEnabled = true;
					webglRenderer.shadowMapSoft = true;
					_this.p('threeDCanvasSize').takeWhileBy(_this.p('threeDMode')).onValue(function (canvasSize) {
						webglRenderer.setSize(canvasSize.width, canvasSize.height);
					});
					_this.on('3d-render').takeWhileBy(_this.p('threeDMode')).onValue(function () {
						webglRenderer.render(_this._p_threeD_scene, _this.camera3D);
					});
	
					/* CSS renderer */
					var cssRenderer = new THREE.CSS3DRenderer();
					_this._cssRenderer = cssRenderer; // for access later
					$(cssRenderer.domElement).append(webglRenderer.domElement);
					_this.threeDCanvasElement.append(cssRenderer.domElement);
					onThreeDModeOff.onValue(function () {
						_this.threeDCanvasElement.empty();
					});
					_this.p('threeDCanvasSize').takeWhileBy(_this.p('threeDMode')).onValue(function (canvasSize) {
						cssRenderer.setSize(canvasSize.width, canvasSize.height);
					});
					_this.on('3d-render').takeWhileBy(_this.p('threeDMode')).onValue(function () {
						cssRenderer.render(_this._p_threeD_scene, _this.camera3D);
					});
				})();
	
				/* render on every animation frame */
				_this.event('3d-render').plug(Kefir.animationFrames().takeWhileBy(_this.p('threeDMode')));
	
				/* the circuitboard floating in 3D space */
				(function (_ref3) {
					var parent0 = _ref3.parent0;
					var position0 = _ref3.position0;
					var margin0 = _ref3.margin0;
	
					/* the circuitboard itself */
					var threeDCircuitboard = new THREE.CSS3DObject(_this.element.css({ left: 0, top: 0, bottom: 0, right: 0 })[0]);
					_this._p_threeD_scene.add(threeDCircuitboard);
					_this.on('threeDCanvasSize').takeWhileBy(_this.p('threeDMode')).onValue(function (canvasSize) {
						$(threeDCircuitboard.element).css({
							width: canvasSize.width - margin0.left - margin0.right,
							height: canvasSize.height - margin0.top - margin0.bottom
						});
					});
					onThreeDModeOff.onValue(function () {
						_this.element.detach().appendTo(parent0).css(position0).css({
							'width': 'auto',
							'height': 'auto',
							'position': 'absolute',
							'transform': '',
							'-webkit-transform': ''
						});
					});
	
					/* WebGL stand-in for the circuitboard - obscures objects and receives cast shadows */
					_this._p_threeD_scene.add((function () {
						var planeFragmentShader = '\n\t\t\t\t\t\tuniform vec3 diffuse;\n\t\t\t\t\t\tuniform float opacity;\n\t\t\t\t\t\t' + THREE.ShaderChunk['color_pars_fragment'] + '\n\t\t\t\t\t\t' + THREE.ShaderChunk['map_pars_fragment'] + '\n\t\t\t\t\t\t' + THREE.ShaderChunk['lightmap_pars_fragment'] + '\n\t\t\t\t\t\t' + THREE.ShaderChunk['envmap_pars_fragment'] + '\n\t\t\t\t\t\t' + THREE.ShaderChunk['fog_pars_fragment'] + '\n\t\t\t\t\t\t' + THREE.ShaderChunk['shadowmap_pars_fragment'] + '\n\t\t\t\t\t\t' + THREE.ShaderChunk['specularmap_pars_fragment'] + '\n\t\t\t\t\t\tvoid main() {\n\t\t\t\t\t\t\tgl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['map_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['alphatest_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['specularmap_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['lightmap_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['color_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['envmap_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['shadowmap_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['linear_to_gamma_fragment'] + '\n\t\t\t\t\t\t\t' + THREE.ShaderChunk['fog_fragment'] + '\n\t\t\t\t\t\t\tgl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - shadowColor.x);\n\t\t\t\t\t\t}\n\t\t\t\t\t';
						var threeDCircuitboardMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.ShaderMaterial({
							uniforms: THREE.ShaderLib['basic'].uniforms,
							vertexShader: THREE.ShaderLib['basic'].vertexShader,
							fragmentShader: planeFragmentShader
						}));
						threeDCircuitboardMesh.receiveShadow = true;
						threeDCircuitboardMesh.castShadow = false;
						_this.on('threeDCanvasSize').takeWhileBy(_this.p('threeDMode')).onValue(function (canvasSize) {
							threeDCircuitboardMesh.scale.x = canvasSize.width - margin0.left - margin0.right;
							threeDCircuitboardMesh.scale.y = canvasSize.height - margin0.top - margin0.bottom;
						});
						return threeDCircuitboardMesh;
					})());
	
					/* directional light to cast shadows */
					_this._p_threeD_scene.add((function () {
						var light = new THREE.DirectionalLight(16777215);
						light.position.set(0, 0, 1000);
						light.castShadow = true;
						light.onlyShadow = true;
						light.shadowMapWidth = 6000;
						light.shadowMapHeight = 6000;
						light.shadowCameraFar = 1001;
						// The shadow camera should always be larger than the circuitboard.
						// Unfortunately, lights cannot be updated at runtime, so 6000x6000 it is.
						light.shadowCameraLeft = -3000;
						light.shadowCameraRight = 3000;
						light.shadowCameraTop = -3000;
						light.shadowCameraBottom = 3000;
						return light;
					})());
	
					/* the circuit board backface */
					var backfaceGeometry = new THREE.Geometry();
					backfaceGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5, 0), new THREE.Vector3(0.5, -0.5, 0), new THREE.Vector3(0.5, 0.5, 0), new THREE.Vector3(-0.5, 0.5, 0), new THREE.Vector3(-0.5, -0.5, 0));
					var backface = new THREE.Line(backfaceGeometry, new THREE.LineBasicMaterial({ color: 'black' }));
					backface.position.z -= 0.1;
					_this._p_threeD_scene.add(backface);
					_this.p('threeDCanvasSize').takeWhileBy(_this.p('threeDMode')).onValue(function (canvasSize) {
						backface.scale.x = canvasSize.width - margin0.left - margin0.right - 1;
						backface.scale.y = canvasSize.height - margin0.top - margin0.bottom - 1;
					});
	
					/*  the object containing all 3D things co-located with the circuitboard */
					_this.object3D = new THREE.Object3D();
					_this._p_threeD_scene.add(_this.object3D);
					Kefir.merge([Kefir.once(), _this.p('threeDCanvasSize').changes(), _this.p('size').changes(), Kefir.interval(10) // backup; TODO: this actually seems necessary; Why doesn't stuff propagate properly?
					]).takeWhileBy(_this.p('threeDMode')).onValue(function () {
						_this.object3D.position.x = 0.5 * (margin0.left - margin0.right) - _this.size.width / 2 + 1;
						_this.object3D.position.y = 0.5 * (margin0.bottom - margin0.top) - _this.size.height / 2 + 1;
					});
				})({ // remember some pre-3D DOM state
					parent0: _this.element.parent(),
					position0: {
						left: _this.element.css('left'),
						top: _this.element.css('top'),
						right: _this.element.css('right'),
						bottom: _this.element.css('bottom')
					},
					margin0: {
						left: _this.offset.left - _this.threeDCanvasElement.offset().left,
						top: _this.offset.top - _this.threeDCanvasElement.offset().top,
						right: _this.threeDCanvasSize.width - _this.size.width - (_this.offset.left - _this.threeDCanvasElement.offset().left),
						bottom: _this.threeDCanvasSize.height - _this.size.height - (_this.offset.top - _this.threeDCanvasElement.offset().top)
					}
				});
			});
		});
	
		///* `translatePositionFromCanvasToCircuitboard` has no side-effects and can be used   */
		///*  from the outside to translate left/top coordinates on the screen to left/top     */
		///*  coordinates of the private coordinate-system of the circuitboard, however it is  */
		///*  oriented in 3D space.                                                            */
		//plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function (positionOnCanvas) {
		//
		//	this.camera3D.updateMatrixWorld();
		//	this.camera3D.updateProjectionMatrix();
		//
		//	var mouse3D = new THREE.Vector3();
		//	mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
		//	mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
		//	mouse3D.z = 0.5;
		//	PROJECTOR.unprojectVector(mouse3D, this.camera3D);
		//	var ray = new THREE.Ray(this.camera3D.position, mouse3D.sub(this.camera3D.position).normalize());
		//	var intersects = ray.intersectPlane(PLANE);
		//
		//	/* if the tested intersection is out of range, return undefined */
		//	if (!intersects) { return }
		//
		//	return {
		//		left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
		//		top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
		//	};
		//
		//});
		// TODO: have a look here: http://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
	
		/* artefact-specific object3D objects */
		plugin.append('Tile.prototype.construct', function () {
			var _this2 = this;
	
			this.circuitboard.on('threeDMode').value(true).onValue(function () {
	
				/* create the 3D object for this tile */
				_this2.object3D = new THREE.Object3D();
				_this2.circuitboard.object3D.add(_this2.object3D);
	
				/* position it always in the center of the tile */
				Kefir.merge([Kefir.once(), _this2.p('position'), _this2.p('size'), _this2.circuitboard.p('size'), Kefir.interval(1000)]).onValue(function () {
					_this2.object3D.position.x = _this2.position.left + _this2.size.width / 2;
					_this2.object3D.position.y = _this2.circuitboard.size.height - _this2.position.top - _this2.size.height / 2;
				});
	
				/* hide it when the tile is hidden */
				_this2.p('fullyVisible').onValue(function (v) {
					_this2.object3D.visible = v;
				});
				var parentTile = _this2.closestAncestorByType('Tile');
				if (parentTile) {
					parentTile.p('open').onValue(function (v) {
						_this2.object3D.visible = v && _this2.fullyVisible;
					});
				}
	
				//// DEBUGGING CODE
				//(()=>{
				//	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
				//	var material = new THREE.MeshPhongMaterial( {color: 0xff0000} );
				//	let sphere0 = new THREE.Mesh( geometry, material );
				//	let sphere1 = new THREE.Mesh( geometry, material );
				//	let sphere2 = new THREE.Mesh( geometry, material );
				//	let sphere3 = new THREE.Mesh( geometry, material );
				//	let sphere4 = new THREE.Mesh( geometry, material );
				//	this.object3D.add( sphere0 );
				//	this.object3D.add( sphere1 );
				//	this.object3D.add( sphere2 );
				//	this.object3D.add( sphere3 );
				//	this.object3D.add( sphere4 );
				//	this.p('size').onValue(({ width, height }) => {
				//		sphere1.position.set(-0.5 * width,  0.5 * height, 0);
				//		sphere2.position.set( 0.5 * width,  0.5 * height, 0);
				//		sphere3.position.set( 0.5 * width, -0.5 * height, 0);
				//		sphere4.position.set(-0.5 * width, -0.5 * height, 0);
				//	});
				//})();
			});
		});
	
		/* necessary setup and breakdown for querying an element's 'offset' in the context of a 3D environment */
		plugin.append('Circuitboard.prototype.construct', function () {
			var _this3 = this;
	
			/* set up another camera that always stays at a circuitboard-looks-not-3D position */
			this._originalCamera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
			this._originalCamera3D.lookAt(new THREE.Vector3(0, 0, 0));
			this.on('threeDMode').value(false).take(1).onValue(function () {
				delete _this3._originalCamera3D;
			});
			this.on('threeDCanvasSize').takeWhileBy(this.p('threeDMode')).onValue(function (canvasSize) {
				_this3._originalCamera3D.aspect = canvasSize.width / canvasSize.height;
				if (_this3._originalCamera3D.position.z === 0) {
					_this3._originalCamera3D.position.z = 1;
				}
				_this3._originalCamera3D.position.normalize().multiplyScalar(canvasSize.height / Math.tan(THREE.Math.degToRad(_this3._originalCamera3D.fov) / 2) / 2);
				_this3._originalCamera3D.updateProjectionMatrix();
			});
		}).replace('Circuitboard.prototype._posTrackingWindow', function (window) {
	
			/* the 'offset' property is only reliable when the circuitboard is not rotated / positioned / scaled */
			this._cssRenderer.render(this._p_threeD_scene, this._originalCamera3D);
			window();
			this._cssRenderer.render(this._p_threeD_scene, this.camera3D);
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

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_67__;

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(64)], __WEBPACK_AMD_DEFINE_RESULT__ = function (THREE) {
		'use strict';
	
		/**
		 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
		 * @author mrdoob / http://mrdoob.com/
		 */
	
		THREE.CSS3DObject = function ( element ) {
	
			THREE.Object3D.call( this );
	
			this.element = element;
			this.element.style.position = 'absolute';
	
			this.addEventListener( 'removed', function ( /*event*/ ) {
	
				if ( this.element.parentNode !== null ) {
	
					this.element.parentNode.removeChild( this.element );
	
				}
	
			} );
	
		};
	
		THREE.CSS3DObject.prototype = Object.create( THREE.Object3D.prototype );
	
		THREE.CSS3DSprite = function ( element ) {
	
			THREE.CSS3DObject.call( this, element );
	
		};
	
		THREE.CSS3DSprite.prototype = Object.create( THREE.CSS3DObject.prototype );
	
		THREE.CSS3DRenderer = function () {
	
			console.log( 'THREE.CSS3DRenderer', THREE.REVISION );
	
			var _width, _height;
			var _widthHalf, _heightHalf;
	
			var matrix = new THREE.Matrix4();
	
			var cache = {
				camera: { fov: 0, style: '' },
				objects: {}
			};
	
			var domElement = document.createElement( 'div' );
			domElement.style.overflow = 'hidden';
	
			domElement.style.WebkitTransformStyle = 'preserve-3d';
			domElement.style.MozTransformStyle = 'preserve-3d';
			domElement.style.oTransformStyle = 'preserve-3d';
			domElement.style.transformStyle = 'preserve-3d';
	
			this.domElement = domElement;
	
			var cameraElement = document.createElement( 'div' );
	
			cameraElement.style.WebkitTransformStyle = 'preserve-3d';
			cameraElement.style.MozTransformStyle = 'preserve-3d';
			cameraElement.style.oTransformStyle = 'preserve-3d';
			cameraElement.style.transformStyle = 'preserve-3d';
	
			domElement.appendChild( cameraElement );
	
			this.setClearColor = function () {
	
			};
	
			this.setSize = function ( width, height ) {
	
				_width = width;
				_height = height;
	
				_widthHalf = _width / 2;
				_heightHalf = _height / 2;
	
				domElement.style.width = width + 'px';
				domElement.style.height = height + 'px';
	
				cameraElement.style.width = width + 'px';
				cameraElement.style.height = height + 'px';
	
			};
	
			var epsilon = function ( value ) {
	
				return Math.abs( value ) < 0.000001 ? 0 : value;
	
			};
	
			var getCameraCSSMatrix = function ( matrix ) {
	
				var elements = matrix.elements;
	
				return 'matrix3d(' +
					epsilon( elements[ 0 ] ) + ',' +
					epsilon( - elements[ 1 ] ) + ',' +
					epsilon( elements[ 2 ] ) + ',' +
					epsilon( elements[ 3 ] ) + ',' +
					epsilon( elements[ 4 ] ) + ',' +
					epsilon( - elements[ 5 ] ) + ',' +
					epsilon( elements[ 6 ] ) + ',' +
					epsilon( elements[ 7 ] ) + ',' +
					epsilon( elements[ 8 ] ) + ',' +
					epsilon( - elements[ 9 ] ) + ',' +
					epsilon( elements[ 10 ] ) + ',' +
					epsilon( elements[ 11 ] ) + ',' +
					epsilon( elements[ 12 ] ) + ',' +
					epsilon( - elements[ 13 ] ) + ',' +
					epsilon( elements[ 14 ] ) + ',' +
					epsilon( elements[ 15 ] ) +
				')';
	
			};
	
			var getObjectCSSMatrix = function ( matrix ) {
	
				var elements = matrix.elements;
	
				return 'translate3d(-50%,-50%,0) matrix3d(' +
					epsilon( elements[ 0 ] ) + ',' +
					epsilon( elements[ 1 ] ) + ',' +
					epsilon( elements[ 2 ] ) + ',' +
					epsilon( elements[ 3 ] ) + ',' +
					epsilon( - elements[ 4 ] ) + ',' +
					epsilon( - elements[ 5 ] ) + ',' +
					epsilon( - elements[ 6 ] ) + ',' +
					epsilon( - elements[ 7 ] ) + ',' +
					epsilon( elements[ 8 ] ) + ',' +
					epsilon( elements[ 9 ] ) + ',' +
					epsilon( elements[ 10 ] ) + ',' +
					epsilon( elements[ 11 ] ) + ',' +
					epsilon( elements[ 12 ] ) + ',' +
					epsilon( elements[ 13 ] ) + ',' +
					epsilon( elements[ 14 ] ) + ',' +
					epsilon( elements[ 15 ] ) +
				')';
	
			};
	
			var renderObject = function ( object, camera ) {
	
				if ( object instanceof THREE.CSS3DObject ) {
	
					var style;
	
					if ( object instanceof THREE.CSS3DSprite ) {
	
						// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/
	
						matrix.copy( camera.matrixWorldInverse );
						matrix.transpose();
						matrix.copyPosition( object.matrixWorld );
						matrix.scale( object.scale );
	
						matrix.elements[ 3 ] = 0;
						matrix.elements[ 7 ] = 0;
						matrix.elements[ 11 ] = 0;
						matrix.elements[ 15 ] = 1;
	
						style = getObjectCSSMatrix( matrix );
	
					} else {
	
						style = getObjectCSSMatrix( object.matrixWorld );
	
	
	
					}
	
					var element = object.element;
					var cachedStyle = cache.objects[ object.id ];
	
					if ( cachedStyle === undefined || cachedStyle !== style ) {
	
						element.style.WebkitTransform = style;
						element.style.MozTransform = style;
						element.style.oTransform = style;
						element.style.transform = style;
	
						cache.objects[ object.id ] = style;
	
					}
	
					if ( element.parentNode !== cameraElement ) {
	
						cameraElement.appendChild( element );
	
					}
	
				}
	
				for ( var i = 0, l = object.children.length; i < l; i ++ ) {
	
					renderObject( object.children[ i ], camera );
	
				}
	
			};
	
			this.render = function ( scene, camera ) {
	
				var fov = 0.5 / Math.tan( THREE.Math.degToRad( camera.fov * 0.5 ) ) * _height;
	
				if ( cache.camera.fov !== fov ) {
	
					domElement.style.WebkitPerspective = fov + "px";
					domElement.style.MozPerspective = fov + "px";
					domElement.style.oPerspective = fov + "px";
					domElement.style.perspective = fov + "px";
	
					cache.camera.fov = fov;
	
				}
	
				scene.updateMatrixWorld();
	
				if ( camera.parent === undefined ) { camera.updateMatrixWorld() }
	
				camera.matrixWorldInverse.getInverse( camera.matrixWorld );
	
				var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix( camera.matrixWorldInverse ) +
					" translate3d(" + _widthHalf + "px," + _heightHalf + "px, 0)";
	
	
				if ( cache.camera.style !== style ) {
	
					cameraElement.style.WebkitTransform = style;
					cameraElement.style.MozTransform = style;
					cameraElement.style.oTransform = style;
					cameraElement.style.transform = style;
	
					cache.camera.style = style;
	
				}
	
				renderObject( scene, camera );
	
			};
	
		};
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(108)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/features/p-three-d.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/features/p-three-d.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(109)();
	exports.push([module.id, ".three-d-canvas>div>div{z-index:0;}.three-d-canvas>div>canvas{z-index:1;}.three-d-canvas>div>canvas,.three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;pointer-events:none;}.three-d-canvas>div>canvas>.circuitboard,.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}", ""]);

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }

/******/ })
});
;
//# sourceMappingURL=p-three-d.js.map