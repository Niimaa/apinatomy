(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"), require("three-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery", "delta-js", "three-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"), require("three-js")) : factory(root["jquery"], root["bluebird"], root["kefir"], root["tweenjs"], root["kefir-jquery"], root["delta-js"], root["three-js"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_15__) {
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
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(38);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(6), __webpack_require__(11), __webpack_require__(12), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, P, U, KefirSignalHandler, uniqueID, deltaJs, defer) {
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
					var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
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
					var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
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
	    * Retrieve the closest descendants (children, children's children, ...)
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
	    * Retrieve the closest descendant (children, children's children, ...)
	    * of this artefact with the given type.
	    *
	    * @return {Artefact} - the closest descendant of the given type
	    */
				closestDescendantByType: function closestDescendantByType(type) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var child = _step.value;
	
							if (child.type === type) {
								return child;
							} else {
								var result = child.closestDescendantByType(type);
								if (result) {
									return result;
								}
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					return null;
				},
	
				/** {@public}{@method}
	    *
	    * Indicate that this artefact will never be used again, allowing it
	    * to do any necessary cleanup.
	    */
				destroy: function destroy() {
					this.destroyed = true; // TODO: make this a property?
					this.trigger('destroy');
					this.children.forEach(function (child) {
						child.destroy();
					});
				}
	
			}, {
				model: {
	
					/* quick access to the model of an artifact */
	
					get: function get() {
						return this.options.model;
					},
					configurable: true,
					enumerable: true
				},
				options: { /** {@public}{@property}
	               *
	               * @return {Object} - the options provided through the constructor
	               */
	
					get: function get() {
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
	
					get: function get() {
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
	
					get: function get() {
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
	
					get: function get() {
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
	
					get: function get() {
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
	
					get: function get() {
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
			window._amy_Artefact.newSubclass = function newSubclass(name, constructor) {
				var prototype = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
				var optionDefaults = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
				return deltaJs.vp(name, U.newSubclass(window._amy_Artefact, function (superFn) {
					return function () {
						var _this = this;
	
						var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
						/* process options */
						var processedOptions = options;
						Object.keys(optionDefaults).forEach(function (key) {
							if (U.isUndefined(processedOptions[key])) {
								processedOptions[key] = optionDefaults[key];
							}
						});
						processedOptions.type = name;
	
						var _afterConstructDeferred = defer();
						this.afterConstruct = _afterConstructDeferred.promise;
	
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
							_this.afterConstruct.then(function () {
								_this.root._registerArtefact(_this);
							});
							_afterConstructDeferred.resolve();
						});
					};
				}, U.extend({}, prototype, Object.defineProperties({}, {
					circuitboard: {
						get: function get() {
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
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, Kefir) {
	
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
	
			/** {@public}{@method}
	   * Declares a new event stream for this object.
	   *
	   * @param  {String}        name    - the name of the event, used to trigger or subscribe to it
	   * @param  {Kefir.Stream} [source] - another event stream to automatically trigger this event
	   *
	   * @return {Kefir.Bus} - the created event stream
	   */
	
			_createClass(KefirSignalHandler, [{
				key: 'newEvent',
				value: function newEvent(name) {
					var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
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
	
				/** {@public}{@method}
	    * Retrieve an event stream by name. If the name of a property is given, a stream
	    * based on changes to that property is returned.
	    *
	    * @param  {String}  name - the name of the event stream to retrieve
	    * @return {Kefir.Stream} - the event stream associated with the given name
	    */
			}, {
				key: 'event',
				value: function event(name) {
	
					/* does the event exist? */
					U.assert(this._events[name], 'There is no event \'' + name + '\' on this object.');
	
					/* return it */
					return this._events[name];
				}
	
				/** @alias event */
			}, {
				key: 'e',
				value: function e(name) {
					return this.event(name);
				}
	
				/** {@public}{@method}
	    * This method defines a new property on this object.
	    *
	    * @param  {String}                   name           - the name of the event stream to retrieve
	    * @param  {Boolean}                 [settable=true] - whether the value can be manually set
	    * @param  {*}                       [initial]       - the initial value of this property
	    * @param  {function(*,*):Boolean}   [isEqual]       - a predicate function by which to test for duplicate values
	    * @param  {function(*):*}           [map]           - a function to map incoming values to other values
	    * @param  {[Kefir.Property]}        [mapWith]       - other properties used in the given 'map' function
	    *
	    * @return {Kefir.Property} - the property associated with the given name
	    */
			}, {
				key: 'newProperty',
				value: function newProperty(name) {
					var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
					var settable = _ref2.settable;
					var initial = _ref2.initial;
					var isEqual = _ref2.isEqual;
					var map = _ref2.map;
					var mapWith = _ref2.mapWith;
	
					/* is the property name already taken? */
					U.assert(!this._events[name], 'There is already an event \'' + name + '\' on this object.');
					U.assert(!this._properties[name], 'There is already a property \'' + name + '\' on this object.');
	
					/* default values */
					if (U.isUndefined(settable)) {
						settable = true;
					}
	
					/* define the bus which manages the property */
					var bus = Kefir.bus();
	
					/* define the property itself */
					var property = undefined;
					if (map && mapWith) {
						property = this._properties[name] = Kefir.combine([bus.toProperty(initial).skipDuplicates(isEqual)].concat(_toConsumableArray(mapWith)), map).toProperty(initial) // TODO: use map here too
						.skipDuplicates(isEqual);
					} else if (map && !mapWith) {
						property = this._properties[name] = bus.toProperty(map(initial)).map(map).skipDuplicates(isEqual);
					} else {
						property = this._properties[name] = bus.toProperty(initial).skipDuplicates(isEqual);
					}
	
					/* give the property additional methods */
					property.plug = function (observable) {
						bus.plug(observable);return property;
					};
					property.unplug = function (observable) {
						bus.unplug(observable);return property;
					};
					property.get = (function () {
						var currentValue = initial;
						property.onValue(function (value) {
							currentValue = value;
						});
						return function () {
							return currentValue;
						};
					})();
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
					if (this._events['destroy']) {
						this.event('destroy').onValue(function () {
							bus.end();
						});
					}
	
					/* return the property */
					return property;
				}
	
				/** {@public}{@method}
	    * Retrieve a property by name.
	    *
	    * @param  {String} name - the name of the property to retrieve
	    * @return {Kefir.Property} - the property associated with the given name
	    */
			}, {
				key: 'property',
				value: function property(name) {
					return this._properties[name];
				}
	
				/** @alias property */
			}, {
				key: 'p',
				value: function p(name) {
					return this.property(name);
				}
	
				/** {@public}{@method}
	    * Trigger an event for all subscribers.
	    *
	    * @param {String} name  - the name of the event stream to trigger
	    * @param {*}      value - the value to attach to the event
	    */
			}, {
				key: 'trigger',
				value: function trigger(name, value) {
	
					/* does the event stream exist? */
					U.assert(this._events[name], 'There is no event \'' + name + '\' on this object.');
	
					/* push the value to the stream */
					this._events[name].emit(value);
				}
	
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
			}, {
				key: 'on',
				value: function on(name, expectedValue, options, callback) {
					var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
					return this._on(argsObj);
				}
	
				/** {@private}{@method}
	    * This method does the main work for {@link on}, but accepts
	    * the parameters as one object, so it doesn't have to deal with parameter ordering.
	    *
	    * @return {Kefir.Observable|function():void}
	    */
			}, {
				key: '_on',
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
	
				/** {@private}{@method}
	    * Process the arguments accepted by {@link on}.
	    *
	    * @return {Object}
	    */
			}, {
				key: '_gatherOnArguments',
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
		'use strict';
	
		var _nextId = 0;
	
		return function uniqueId(prefix) {
			return (prefix || "unique-id") + "-" + _nextId++;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(13), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (P, DeltaJs, defer) {
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
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(15), __webpack_require__(4), __webpack_require__(7), __webpack_require__(1), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, THREE, U, Kefir, ArtefactP) {
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
				var graphEdge = _ref.graphEdge;
				var visible = _ref.visible;
	
				/* when one of the vertices is destroyed, so is this edge */
				this.source = source;
				this.target = target;
				this.graphEdge = graphEdge;
				Kefir.merge([this.source.on('destroy'), this.target.on('destroy')]).take(1).onValue(function () {
					_this.destroy();
				});
	
				/* the 'visible' and 'hidden' properties */
				this.newProperty('visible', { initial: visible });
				this.newProperty('hidden').plug(this.p('visible').not());
				this.p('visible').plug(this.p('hidden').not());
	
				/* enact vertex hiding on the DOM */
				this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue(function (h) {
					_this.element.toggleClass('hidden', h).toggleClass('visible', !h);
				});
			}, Object.defineProperties({
	
				/* update whichever visual representation is active (d3 or 3d) */
				updateVisualization: function updateVisualization() {
					if (!this.destroyed) {
						this.element.attr('x1', this.source.x);
						this.element.attr('y1', this.source.y);
						this.element.attr('x2', this.target.x);
						this.element.attr('y2', this.target.y);
						//let curve = this.object3d.updateTube().curve;
						//let center = curve.getPoint(0.5);
						//if (this._flag) {
						//	this._flag.position.set(center.x, center.y, center.z);
						//	this._flag.rotation.z = Math.atan2(
						//		curve.getPoint(1).y - curve.getPoint(0).y,
						//		curve.getPoint(1).x - curve.getPoint(0).x
						//	);
						//}
					}
				}
	
			}, {
				element: { /* D3 representation*/
	
					get: function get() {
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
					get: function get() {
						return this.options.graphZIndex;
					},
					configurable: true,
					enumerable: true
				}
			}),
	
			///* 3D representation */
			//get object3d() {
			//	if (!this._object3d) {
			//
			//		/* create the 3D tube */
			//		this._object3d = this.circuitboard.newTubeFromVertexToVertex(this.graphEdge, 0xff0000);
			//		this.on('destroy').take(1).onValue(() => { this.object3d.removeTube() });
			//
			//
			//		/* create a flag */
			//		const layer = (offset, height, color) => {
			//			const WIDTH = 15;
			//			const DEPTH = 2;
			//			let geometry = new THREE.BoxGeometry(WIDTH, DEPTH, height);
			//			geometry.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(0, 0, -0.5 * height - offset - 1)));
			//			let material = new THREE.MeshPhongMaterial({ color });
			//			return new THREE.Mesh(geometry, material);
			//		};
			//
			//
			//		/* hang the flag off the 3D tube */
			//		let template = this.graphEdge.value.lyphTemplate;
			//		if (template) {
			//			this._flag = new THREE.Object3D();
			//			let currentOffset = 0;
			//			for (let l of template.layers) {
			//				let THICKNESS_FACTOR = 6;
			//				this._flag.add(layer(currentOffset, THICKNESS_FACTOR * l.thickness, THREE.Math.randInt(0x000000, 0xffffff)));
			//				currentOffset += THICKNESS_FACTOR + 0.1;
			//			}
			//			this.circuitboard.object3D.add(this._flag);
			//		}
			//
			//	}
			//
			//
			//	return this._object3d;
			//}
	
			{
				graphZIndex: 100,
				cssClass: ''
			});
	
			return window._amy_D3Edge;
		}).tap(function (c) {
			$.circuitboard.D3Edge = c;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	exports.push([module.id, "\n", ""]);

/***/ },
/* 18 */
/***/ function(module, exports) {

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

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, ArtefactP) {
		'use strict';
	
		return ArtefactP.then(function (Artefact) {
	
			/* however (often) this is loaded, create the class only once */
			if (U.isDefined(window._amy_D3Group)) {
				return window._amy_D3Group;
			}
	
			window._amy_D3Group = Artefact.newSubclass('D3Group', function D3Group() {
				var _this = this;
	
				U.extend(this, {
					vertices: {},
					edges: {}
				});
	
				this.on('destroy').take(1).onValue(function () {
					_this.vertices.forEach(function (v) {
						v.destroy();
					});
					// edges are destroyed when either of their vertices is destroyed
				});
			}, Object.defineProperties({
	
				setRegion: function setRegion(region) {
					this.region = region;
					this.circuitboard.updateGraph();
				},
	
				addVertex: function addVertex(vertex) {
					var _this2 = this;
	
					vertex.group = this;
					this.vertices[vertex.id] = vertex;
					vertex.graphId = vertex.id;
					this.circuitboard._p_d3_vertices[vertex.graphId] = vertex;
					vertex.p('visible').onValue(function () {
						_this2.circuitboard.updateGraph();
					});
					return vertex;
				},
	
				removeVertex: function removeVertex(vertex) {
					if (vertex) {
						if (typeof vertex === 'string') {
							vertex = this.vertices[vertex];
						}
						vertex.destroy();
						delete this.circuitboard._p_d3_vertices[vertex.graphId];
						delete this.vertices[vertex];
						this.circuitboard.updateGraph();
					}
				},
	
				addEdge: function addEdge(edge) {
					var _this3 = this;
	
					edge.group = this;
					this.edges[edge.id] = edge;
					edge.graphId = this.id + ':' + edge.id;
					this.circuitboard._p_d3_edges[edge.graphId] = edge;
					edge.p('visible').onValue(function () {
						_this3.circuitboard.updateGraph();
					});
					return edge;
				},
	
				removeEdge: function removeEdge(edge) {
					if (edge) {
						if (typeof edge === 'string') {
							edge = this.edges[edge];
						}
						edge.destroy();
						delete this.circuitboard._p_d3_edges[edge.graphId];
						delete this.edges[edge.id];
						this.circuitboard.updateGraph();
					}
				},
	
				removeAllEdgesAndVertices: function removeAllEdgesAndVertices() {
					var _this4 = this;
	
					Object.keys(this.edges).forEach(function (edgeId) {
						if (_this4.edges[edgeId]) {
							_this4.removeEdge(_this4.edges[edgeId]);
						}
					});
					Object.keys(this.vertices).forEach(function (vertexId) {
						if (_this4.vertices[vertexId]) {
							_this4.removeVertex(_this4.vertices[vertexId]);
						}
					});
					this.circuitboard.updateGraph();
				}
	
			}, {
				gravityFactor: {
					get: function get() {
						return this.options.gravityFactor;
					},
					configurable: true,
					enumerable: true
				},
				chargeFactor: {
					get: function get() {
						return this.options.chargeFactor;
					},
					configurable: true,
					enumerable: true
				},
				linkDistanceFactor: {
					get: function get() {
						return this.options.linkDistanceFactor;
					},
					configurable: true,
					enumerable: true
				}
			}), {
				gravityFactor: 1,
				chargeFactor: 1,
				linkDistanceFactor: 1,
				region: Object.defineProperties({ // default to the whole canvas with a small padding
					top: 10,
					left: 10
				}, {
					width: {
						get: function get() {
							return this.circuitboard.size.width - 20;
						},
						configurable: true,
						enumerable: true
					},
					height: {
						get: function get() {
							return this.circuitboard.size.height - 20;
						},
						configurable: true,
						enumerable: true
					}
				})
			});
	
			return window._amy_D3Group;
		}).tap(function (c) {
			$.circuitboard.D3Group = c;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(1), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, U, ArtefactP) {
		'use strict';
	
		return ArtefactP.then(function (Artefact) {
	
			/* however (often) this is loaded, create the class only once */
			if (U.isDefined(window._amy_D3Vertex)) {
				return window._amy_D3Vertex;
			}
	
			window._amy_D3Vertex = Artefact.newSubclass('D3Vertex', function D3Vertex(_ref) {
				var _this = this;
	
				var visible = _ref.visible;
				var z = _ref.z;
	
				/* the coordinate properties */
				this.newProperty('x', { initial: Math.random() * 10000 });
				this.newProperty('y', { initial: Math.random() * 10000 });
				this.newProperty('z', { initial: z || 0 });
	
				/* the 'visible' and 'hidden' properties */
				this.newProperty('visible', { initial: visible });
				this.newProperty('hidden').plug(this.p('visible').not());
				this.p('visible').plug(this.p('hidden').not());
	
				/* enact vertex hiding on the DOM */
				this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue(function (h) {
					_this.element.toggleClass('hidden', h).toggleClass('visible', !h);
				});
			}, Object.defineProperties({
	
				updateVisualization: function updateVisualization() {
					if (!this.destroyed) {
						this.element.attr('x', this.x);
						this.element.attr('y', this.y);
					}
				}
	
			}, {
				element: {
					get: function get() {
						if (!this._element) {
							if (this.options.shape === 'square') {
								this._element = $('\n\t\t\t\t\t\t\t<svg x="' + this.x + '" y="' + this.y + '" class="vertex ' + this.options.cssClass + '">\n\t\t\t\t\t\t\t\t<rect class="core" x="' + -this.options.radius / 2 + '" y="' + -this.options.radius / 2 + '"\n\t\t\t\t\t\t\t\t      width="' + this.options.radius + '" height="' + this.options.radius + '"></rect>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t');
							} else {
								this._element = $('\n\t\t\t\t\t\t\t<svg x="' + this.x + '" y="' + this.y + '" class="vertex ' + this.options.cssClass + '">\n\t\t\t\t\t\t\t\t<circle class="core" r="' + this.options.radius / 2 + '"></circle>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t');
							}
						}
						return this._element;
					},
					configurable: true,
					enumerable: true
				},
				graphZIndex: {
					get: function get() {
						return this.options.graphZIndex;
					},
					configurable: true,
					enumerable: true
				}
			}), {
				graphZIndex: 200,
				cssClass: '',
				radius: 5,
				visible: true
			});
	
			return window._amy_D3Vertex;
		}).tap(function (c) {
			$.circuitboard.D3Vertex = c;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/D3Vertex.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/D3Vertex.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
17,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(20), __webpack_require__(21), __webpack_require__(14), __webpack_require__(7), __webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, D3GroupP, D3VertexP, D3EdgeP, Kefir) {
		'use strict';
	
		var plugin = $.circuitboard.plugin['do']('ppi', {
			requires: ['d3']
		});
	
		// TODO: implement this properly; this is just for testing purposes
		plugin.append('Tile.prototype.construct', function () {
			var _this = this;
	
			var D3Group = D3GroupP.value();
			var D3Vertex = D3VertexP.value();
			var D3Edge = D3EdgeP.value();
	
			var graphGroup = new D3Group({
				parent: this,
				gravityFactor: 1,
				chargeFactor: 0.1,
				linkDistanceFactor: 0.3
			});
	
			Kefir.merge([Kefir.once(), this.on('size').changes(), this.on('position').changes()]).onValue(function () {
				var AREA_MARGIN = 5;
				graphGroup.setRegion({
					top: _this.position.top + AREA_MARGIN,
					left: _this.position.left + AREA_MARGIN,
					height: _this.size.height - 2 * AREA_MARGIN,
					width: _this.size.width - 2 * AREA_MARGIN
				});
			});
	
			var constructExampleProteins = function constructExampleProteins() {
				graphGroup.addEdge(new D3Edge({
					parent: graphGroup,
					source: graphGroup.addVertex(new D3Vertex({
						parent: graphGroup,
						cssClass: 'example'
					})),
					target: graphGroup.addVertex(new D3Vertex({
						parent: graphGroup,
						cssClass: 'example'
					})),
					cssClass: 'example'
				}));
			};
	
			this.on('open').not().and(this.on('visible')).onValue(function (showProteins) {
				if (showProteins) {
					constructExampleProteins();
				} else {
					graphGroup.removeAllEdgesAndVertices();
				}
			});
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/features/p-ppi.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/features/p-ppi.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	exports.push([module.id, ".circuitboard > svg.d3 .example.vertex > .core {\n  pointer-events: visiblePainted;\n  fill: #e600e6;\n  stroke: purple; }\n\n.circuitboard > svg.d3 .example.edge {\n  pointer-events: visiblePainted;\n  cursor: pointer;\n  stroke: purple;\n  stroke-width: 2px;\n  stroke-linecap: round; }\n", ""]);

/***/ }
/******/ ])))
});
;
//# sourceMappingURL=p-ppi.js.map