(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js")) : factory(root["jquery"], root["bluebird"], root["kefir"], root["tweenjs"], root["kefir-jquery"], root["delta-js"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_66__, __WEBPACK_EXTERNAL_MODULE_67__, __WEBPACK_EXTERNAL_MODULE_68__) {
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

	module.exports = __webpack_require__(4);


/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(63), __webpack_require__(15), __webpack_require__(13), __webpack_require__(20), __webpack_require__(14), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, P, U, KefirSignalHandler, uniqueID, deltaJs, defer) {
		'use strict';
	
		return deltaJs.selected.then(function () {
	
			/* however (often) this is loaded, create the class only once */
			if (U.isDefined(window._amy_Artefact)) {
				return window._amy_Artefact;
			}
	
			/** {@export @class Artefact @extends KefirSignalHandler}
	   * Use this as a subclass (or just mix it in) to provide support for
	   * events and observable properties through Kefir.js.
	   *
	   * Users can pass a promise through the 'beforeConstruction' option. If done, the
	   * artefact waits on that promise before calling its 'construct' method.
	   * Similarly, users of instances of this class should test the 'constructed' property.
	   * If it is defined, it is a promise that has to be waited for.
	   * If not, the object instance can be used synchronously after construction.
	   */
			window._amy_Artefact = deltaJs.vp('Artefact', U.newSubclass(KefirSignalHandler, function (superFn) {
				return function Artefact(options) {
					superFn.apply(this, arguments);
	
					this._options = options;
					var id = options.id;
					var type = options.type;
					var parent = options.parent;
					var beforeConstruction = options.beforeConstruction;
	
					/* set hierarchy stuff */
					this._id = id || uniqueID(type);
					this._type = type;
					this._parent = parent;
					this._children = [];
					if (parent) {
						U.array(parent, '_children').push(this);
					}
	
					/* create events */
					this.newEvent('destroy');
	
					/* possibly wait for something before construction (like plugins)? */
					this.beforeConstruction(beforeConstruction);
	
					/* give the root artefact a way to register other artefacts by ID */
					if (this.root === this) {
						this._artefactsByID = {};
						this._registerArtefact = function (artefact) {
							U.getDef(this._artefactsByID, artefact.id, defer).resolve(artefact);
						};
					}
				};
			}, /** @lends Artefact.prototype */Object.defineProperties({
	
				/** {@public}{@method}
	    * Allow a promise to be inserted on which the rest of construction should wait.
	    *
	    * @param possiblePromise {*}  - a value that might be a promise
	    */
				beforeConstruction: function beforeConstruction(possiblePromise) {
	
					/* if no promise is passed in, ignore, to keep construction synchronous */
					if (!possiblePromise || !$.isFunction(possiblePromise.then)) {
						return;
					}
	
					/* if this is the first promise passed in, initialize 'this.constructed' */
					if (!this.constructed) {
						this.constructed = P.resolve(this);
					}
	
					/* insert the new promise into the chain for 'this.constructed' resolution */
					this.constructed = this.constructed.tap(function () {
						return P.resolve(possiblePromise);
					});
				},
	
				/** {@public}{@method}
	    *
	    * Get a promise to an artefact given its ID.
	    *
	    * @param  id {String}   - the id of the required artefact
	    * @return {P<Artefact>} - the promise to the artefact that has the given id
	    */
				artefactById: function artefactById(id) {
					return U.getDef(this.root._artefactsByID, id, defer).promise;
				},
	
				/** {@public}{@method}
	    *
	    * Traverse the Artefact hierarchy with this as root.
	    *
	    * @param fn {(Artefact) => Boolean} - the function to call on each artefact
	    */
				traverseArtefacts: function traverseArtefacts(fn) {
					var options = arguments[1] === undefined ? {} : arguments[1];
					var order = options.order;
	
					if (!order) {
						order = 'prefix';
					}
	
					if (order === 'prefix') {
						fn(this);
					}
					this.children.forEach(function (child) {
						child.traverseArtefacts(fn, options);
					});
					if (order === 'postfix') {
						fn(this);
					}
				},
	
				/** {@public}{@method}
	    *
	    * Traverse the Artefact hierarchy with this as root.
	    *
	    * @param fn {(Artefact) => Boolean} - the function to call on each artefact
	    */
				traverseArtefactsByType: function traverseArtefactsByType(type, fn) {
					var options = arguments[2] === undefined ? {} : arguments[2];
					var order = options.order;
	
					if (!order) {
						order = 'prefix';
					}
	
					if (order === 'prefix' && this.type === type) {
						fn(this);
					}
					if (options.beforeGoingIn) {
						options.beforeGoingIn(this);
					}
					this.closestDescendantsByType(type).forEach(function (descendent) {
						descendent.traverseArtefactsByType(type, fn, options);
					});
					if (options.beforeGoingOut) {
						options.beforeGoingOut(this);
					}
					if (order === 'postfix' && this.type === type) {
						fn(this);
					}
				},
	
				/** {@public}{@method}
	    *
	    * Retrieve the closest ancestor (parent, parent's parent, ...)
	    * of this artefact with the given type.
	    *
	    * @return {Artefact|undefined} - the closest ancestor of the given type, unless there is none
	    */
				closestAncestorByType: function closestAncestorByType(type) {
					var result = this;
					do {
						result = result.parent;
					} while (result && result.type && result.type !== type);
					return result;
				},
	
				/** {@public}{@method}
	    *
	    * Retrieve the closest descendant (children, children's children, ...)
	    * of this artefact with the given type.
	    *
	    * @return {[Artefact]} - the closest descendants of the given type; none of them
	    *                        are descendant from any other
	    */
				closestDescendantsByType: function closestDescendantsByType(type) {
					var result = [];
					this.children.forEach(function (child) {
						if (child.type === type) {
							result.push(child);
						} else {
							result = result.concat(child.closestDescendantsByType(type));
						}
					});
					return result;
				},
	
				/** {@public}{@method}
	    *
	    * Indicate that this artefact will never be used again, allowing it
	    * to do any necessary cleanup.
	    */
				destroy: function destroy() {
					this.trigger('destroy');
					this.children.forEach(function (child) {
						child.destroy();
					});
				}
	
			}, {
				options: {
	
					/** {@public}{@property}
	     *
	     * @return {Object} - the options provided through the constructor
	     */
	
					get: function () {
						return this._options;
					},
					configurable: true,
					enumerable: true
				},
				id: {
	
					/** {@public}{@property}
	     *
	     * @return {String} - the unique identifier belonging to this artefact
	     */
	
					get: function () {
						return this._id;
					},
					configurable: true,
					enumerable: true
				},
				type: {
	
					/** {@public}{@property}
	     *
	     * @return {String} - the type of this artefact
	     */
	
					get: function () {
						return this._type;
					},
					configurable: true,
					enumerable: true
				},
				parent: {
	
					/** {@public}{@property}
	     *
	     * @return {Artefact|undefined} - the parent of this artefact, unless this is the root
	     */
	
					get: function () {
						return this._parent;
					},
					configurable: true,
					enumerable: true
				},
				children: {
	
					/** {@public}{@property}
	     *
	     * @return {[Artefact]} - the children of this artefact
	     */
	
					get: function () {
						return this._children;
					},
					configurable: true,
					enumerable: true
				},
				root: {
	
					/** {@public}{@property}
	     *
	     * @return {Artefact} - the root of the artefact hierarchy
	     */
	
					get: function () {
						if (!this._root) {
							this._root = this.parent ? this.parent.root : this;
						}
						return this._root;
					},
					configurable: true,
					enumerable: true
				}
			})));
	
			/** {@function Artefact.newSubclass}
	   * A static convenience function for creating a subclass of {@link Artefact}.
	   */
			window._amy_Artefact.newSubclass = function newSubClass(name, constructor) {
				var prototype = arguments[2] === undefined ? {} : arguments[2];
				var optionDefaults = arguments[3] === undefined ? {} : arguments[3];
	
				return deltaJs.vp(name, U.newSubclass(window._amy_Artefact, function (superFn) {
					return function () {
						var _this = this;
	
						var options = arguments[0] === undefined ? {} : arguments[0];
	
						/* process options */
						var processedOptions = options;
						Object.keys(optionDefaults).forEach(function (key) {
							if (U.isUndefined(processedOptions[key])) {
								processedOptions[key] = optionDefaults[key];
							}
						});
						processedOptions.type = name;
	
						/* call super-constructor */
						superFn.call(this, U.extend(options, processedOptions));
	
						/* call this constructor */
						constructor.call(this, processedOptions);
	
						/* then run the 'construct' method */
						if (this.constructed) {
							// construct asynchronously
							this.constructed = this.constructed.then(function () {
								if ($.isFunction(_this.construct)) {
									return P.resolve(_this.construct(options))['return'](_this);
								}
								return _this;
							});
						} else if ($.isFunction(this.construct)) {
							this.beforeConstruction(this.construct(options));
						}
	
						/* register this artefact to the circuitboard */
						(this.constructed || P.resolve()).then(function () {
							_this.root._registerArtefact(_this);
						});
					};
				}, U.extend({}, prototype, Object.defineProperties({}, {
					circuitboard: {
						get: function () {
							if (!this._circuitboard) {
								this._circuitboard = this.closestAncestorByType('Circuitboard');
							}
							return this._circuitboard;
						},
						configurable: true,
						enumerable: true
					}
				}))));
			};
	
			return window._amy_Artefact;
		}).tap(function (c) {
			$.circuitboard.Artefact = c;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(15), __webpack_require__(12), __webpack_require__(3), __webpack_require__(75)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, Kefir, ArtefactP) {
		'use strict';
	
		return ArtefactP.then(function (Artefact) {
	
			/* however (often) this is loaded, create the class only once */
			if (U.isDefined(window._amy_D3Edge)) {
				return window._amy_D3Edge;
			}
	
			window._amy_D3Edge = Artefact.newSubclass('D3Edge', function D3Edge(_ref) {
				var _this = this;
	
				var source = _ref.source;
				var target = _ref.target;
	
				/* store references to the two vertices */
				this._source = source;
				this._target = target;
	
				/* when one of the vertices is destroyed, so is this edge */
				Kefir.merge([source.on('destroy'), target.on('destroy')]).take(1).onValue(function () {
					_this.destroy();
				});
			}, Object.defineProperties({}, {
				source: {
					get: function () {
						return this._source;
					},
					configurable: true,
					enumerable: true
				},
				target: {
					get: function () {
						return this._target;
					},
					configurable: true,
					enumerable: true
				},
				element: {
					get: function () {
						if (!this._element) {
							// adding and discarding an 'svg' element prevents a bug where the line would not appear
							this._element = $('<svg><line class="edge ' + this.options.cssClass + '"></line></svg>').children();
						}
						return this._element;
					},
					configurable: true,
					enumerable: true
				},
				graphZIndex: {
					get: function () {
						return this.options.graphZIndex;
					},
					configurable: true,
					enumerable: true
				}
			}), {
				graphZIndex: 100,
				cssClass: ''
			});
	
			return window._amy_D3Edge;
		}).tap(function (c) {
			$.circuitboard.D3Edge = c;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

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
			var _ref3 = arguments[0] === undefined ? {} : arguments[0];
	
			var threshold = _ref3.threshold;
	
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
			var _ref4 = arguments[0] === undefined ? {} : arguments[0];
	
			var threshold = _ref4.threshold;
	
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

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(15), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, Kefir) {
	
		/** {@export}{@class KefirSignalHandler}
	  * Use this as a subclass (or just mix it in) to provide support for
	  * events and observable properties through Kefir.js.
	  */
		var KefirSignalHandler = (function () {
			function KefirSignalHandler() {
				_classCallCheck(this, KefirSignalHandler);
	
				this._events = {};
				this._properties = {};
				this._propertyBusses = {};
			}
	
			_createClass(KefirSignalHandler, [{
				key: 'newEvent',
	
				/** {@public}{@method}
	    * Declares a new event stream for this object.
	    *
	    * @param  {String}        name    - the name of the event, used to trigger or subscribe to it
	    * @param  {Kefir.Stream} [source] - another event stream to automatically trigger this event
	    *
	    * @return {Kefir.Bus} - the created event stream
	    */
				value: function newEvent(name) {
					var _ref = arguments[1] === undefined ? {} : arguments[1];
	
					var source = _ref.source;
	
					/* is the event name already taken? */
					U.assert(!this._events[name], 'There is already an event \'' + name + '\' on this object.');
					U.assert(!this._properties[name], 'There is already a property \'' + name + '\' on this object.');
	
					/* define the event stream */
					var bus = Kefir.bus();
					if (source) {
						bus.plug(source);
					}
					return this._events[name] = bus;
				}
			}, {
				key: 'event',
	
				/** {@public}{@method}
	    * Retrieve an event stream by name. If the name of a property is given, a stream
	    * based on changes to that property is returned.
	    *
	    * @param  {String}  name - the name of the event stream to retrieve
	    * @return {Kefir.Stream} - the event stream associated with the given name
	    */
				value: function event(name) {
	
					/* does the event exist? */
					U.assert(this._events[name], 'There is no event \'' + name + '\' on this object.');
	
					/* return it */
					return this._events[name];
				}
			}, {
				key: 'property',
	
				/** {@public}{@method}
	    * Retrieve a property by name.
	    *
	    * @param  {String} name - the name of the property to retrieve
	    * @return {Kefir.Property} - the property associated with the given name
	    */
				value: function property(name) {
					return this._properties[name];
				}
			}, {
				key: 'p',
	
				/** @alias property */
				value: function p(name) {
					return this._properties[name];
				}
			}, {
				key: 'newProperty',
	
				/** {@public}{@method}
	    * This method defines a new property on this object.
	    *
	    * @param  {String}                   name           - the name of the event stream to retrieve
	    * @param  {Boolean}                 [settable=true] - whether the value can be manually set
	    * @param  {*}                       [initial]       - the initial value of this property
	    * @param  {function(*,*):Boolean}   [isEqual]       - a predicate function by which to test for duplicate values
	    *
	    * @return {Kefir.Property} - the property associated with the given name
	    */
				value: function newProperty(name) {
					var _ref2 = arguments[1] === undefined ? {} : arguments[1];
	
					var settable = _ref2.settable;
					var initial = _ref2.initial;
					var isEqual = _ref2.isEqual;
	
					/* is the property name already taken? */
					U.assert(!this._events[name], 'There is already an event \'' + name + '\' on this object.');
					U.assert(!this._properties[name], 'There is already a property \'' + name + '\' on this object.');
	
					/* default value for 'settable' */
					if (U.isUndefined(settable)) {
						settable = true;
					}
	
					/* define the bus which manages the property */
					var bus = Kefir.bus();
	
					/* define the property itself, and give it additional methods */
					var property = this._properties[name] = bus.toProperty(initial).skipDuplicates(isEqual);
					property.plug = function (observable) {
						bus.plug(observable);return property;
					};
					property.unplug = function (observable) {
						bus.unplug(observable);return property;
					};
					property.get = function () {
						return property._current;
					}; // TODO: accessing private field of Kefir property; don't
					if (settable) {
						property.set = function (value) {
							bus.emit(value);return property;
						};
					}
	
					/* add the property to the object interface */
					Object.defineProperty(this, name, {
						get: property.get,
						set: settable ? property.set : undefined
					});
	
					/* make the property active; it doesn't work if this isn't done (the nature of Kefir.js) */
					property.run();
					this.event('destroy').onValue(function () {
						bus.end();
					});
	
					/* return the property */
					return property;
				}
			}, {
				key: 'trigger',
	
				/** {@public}{@method}
	    * Trigger an event for all subscribers.
	    *
	    * @param {String} name  - the name of the event stream to trigger
	    * @value {*}      value - the value to attach to the event
	    */
				value: function trigger(name, value) {
	
					/* does the event stream exist? */
					U.assert(this._events[name], 'There is no event \'' + name + '\' on this object.');
	
					/* push the value to the stream */
					this._events[name].emit(value);
				}
			}, {
				key: 'on',
	
				/** {@public}{@method}
	    * This method selects an existing stream or property, and then
	    * either returns it, or creates a subscription to it, depending
	    * on whether a callback is provided.
	    *
	    * @param {String}            name                 - the name of the event or property to subscribe to
	    * @param {*}                [expectedValue]       - if provided, filters the stream by === equality with this value;
	    *                                                   this may not be a plain object
	    * @param {Object}           [options]             - a plain object for providing additional options
	    * @param {Boolean}          [options.once=false]  - whether the stream ends after one event
	    * @param {function(*):void} [callback]            - if provided, subscribes to this stream with the this callback
	    *
	    * @return {Kefir.Observable|function():undefined} - if no `callback` is provided, the specified event stream
	    *                                                   or property; otherwise, a function to unsubscribe to said
	    *                                                   stream or property
	    */
				value: function on(name, expectedValue, options, callback) {
					var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
					return this._on(argsObj);
				}
			}, {
				key: '_on',
	
				/** {@private}{@method}
	    * This method does the main work for {@link on}, but accepts
	    * the parameters as one object, so it doesn't have to deal with parameter ordering.
	    *
	    * @return {Kefir.Observable|function():void}
	    */
				value: function _on(_ref3) {
					var name = _ref3.name;
					var expectedValue = _ref3.expectedValue;
					var callback = _ref3.callback;
	
					/* does an event or property by this name exist? */
					U.assert(this._events[name] || this._properties[name], 'There is no event or property \'' + name + '\' on this object.');
	
					/* process name */
					var result = this._events[name] || this._properties[name];
	
					/* process expectedValue */
					if (U.isDefined(expectedValue)) {
						result = result.filter(function (v) {
							return v === expectedValue;
						});
					}
	
					/* process callback */
					if (callback) {
						result = result.onValue(callback);
					}
	
					return result;
				}
			}, {
				key: '_gatherOnArguments',
	
				/** {@private}{@method}
	    * Process the arguments accepted by {@link on}.
	    *
	    * @return {Object}
	    */
				value: function _gatherOnArguments() {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					var result = { name: args.shift() };
	
					/* test for expected value argument */
					if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
						result.expectedValue = args.shift();
					}
	
					/* test for callback function */
					if (U.isDefined(args[0]) && U.isFunction(args[0])) {
						result.callback = args.shift();
					}
	
					return result;
				}
			}]);
	
			return KefirSignalHandler;
		})();
	
		return KefirSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(63), __webpack_require__(68), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (P, DeltaJs, defer) {
		'use strict';
	
		/* already cached? */
		if (window.__apinatomy_core_deltajs) {
			return window.__apinatomy_core_deltajs;
		}
	
		/* set the cache */
		var deltaJs = window.__apinatomy_core_deltajs = new DeltaJs();
		var deferred = defer();
		deltaJs.selected = deferred.promise;
		var oldSelect = deltaJs.select;
		deltaJs.select = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			oldSelect.apply(this, args);
			deferred.resolve(args);
		};
	
		/* return the delta model that manages all plugins (= deltas) */
		return window.__apinatomy_core_deltajs;
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

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
		"use strict";
	
		var _nextId = 0;
	
		return function uniqueId(prefix) {
			return "" + (prefix || "unique-id") + "-" + _nextId++;
		};
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

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_68__;

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(104)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/D3Edge.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/D3Edge.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(105)();
	exports.push([module.id, "", ""]);

/***/ },

/***/ 104:
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

/***/ 105:
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
//# sourceMappingURL=D3Edge.js.map