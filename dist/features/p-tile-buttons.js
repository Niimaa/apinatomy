(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("chroma-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "chroma-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("chroma-js")) : factory(root["jquery"], root["bluebird"], root["chroma-js"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_69__) {
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

	module.exports = __webpack_require__(43);


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	!(module.exports = {
	
		button: {
			LEFT: 1,
			MIDDLE: 2,
			RIGHT: 3
		},
	
		key: {
			BACKSPACE: 8,
			TAB: 9,
			ENTER: 13,
			SHIFT: 16,
			CTRL: 17,
			ALT: 18,
			PAUSE: 19,
			CAPS_LOCK: 20,
			ESCAPE: 27,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			LEFT_ARROW: 37,
			UP_ARROW: 38,
			RIGHT_ARROW: 39,
			DOWN_ARROW: 40,
			INSERT: 45,
			DELETE: 46,
			0: 48,
			1: 49,
			2: 50,
			3: 51,
			4: 52,
			5: 53,
			6: 54,
			7: 55,
			8: 56,
			9: 57,
			A: 65,
			B: 66,
			C: 67,
			D: 68,
			E: 69,
			F: 70,
			G: 71,
			H: 72,
			I: 73,
			J: 74,
			K: 75,
			L: 76,
			M: 77,
			N: 78,
			O: 79,
			P: 80,
			Q: 81,
			R: 82,
			S: 83,
			T: 84,
			U: 85,
			V: 86,
			W: 87,
			X: 88,
			Y: 89,
			Z: 90,
			LEFT_META: 91,
			RIGHT_META: 92,
			SELECT: 93,
			NUMPAD_0: 96,
			NUMPAD_1: 97,
			NUMPAD_2: 98,
			NUMPAD_3: 99,
			NUMPAD_4: 100,
			NUMPAD_5: 101,
			NUMPAD_6: 102,
			NUMPAD_7: 103,
			NUMPAD_8: 104,
			NUMPAD_9: 105,
			MULTIPLY: 106,
			ADD: 107,
			SUBTRACT: 109,
			DECIMAL: 110,
			DIVIDE: 111,
			F1: 112,
			F2: 113,
			F3: 114,
			F4: 115,
			F5: 116,
			F6: 117,
			F7: 118,
			F8: 119,
			F9: 120,
			F10: 121,
			F11: 122,
			F12: 123,
			NUM_LOCK: 144,
			SCROLL_LOCK: 145,
			SEMICOLON: 186,
			EQUALS: 187,
			COMMA: 188,
			DASH: 189,
			PERIOD: 190,
			FORWARD_SLASH: 191,
			GRAVE_ACCENT: 192,
			OPEN_BRACKET: 219,
			BACK_SLASH: 220,
			CLOSE_BRACKET: 221,
			SINGLE_QUOTE: 222
		}
	
	});

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

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(63), __webpack_require__(69), __webpack_require__(15), __webpack_require__(9), __webpack_require__(88)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, P, color, U, _ref) {
		'use strict';
	
		var button = _ref.button;
		/* the plugin */
		var plugin = $.circuitboard.plugin['do']('tile-buttons', {
			requires: ['core'],
			after: ['tile-skin']
		});
	
		plugin.add('Tile.prototype.addButton', function (_ref2) {
			var name = _ref2.name;
			var icon = _ref2.icon;
	
			/* if it's not there yet, create a <div> that holds all the buttons */
			if (!this._buttonHolder) {
				U.makePositioned(this.element);
				this._buttonHolder = $('<div class="tile-button-holder">').appendTo(this.element);
			}
	
			/* create the button itself */
			var buttonElement = $('<div class="tile-button ' + name + '">').appendTo(this._buttonHolder);
	
			/* determine the icon coloring based on background color */
			(this.skinnedElement || P.resolve(this.element)).then(function (element) {
				if (typeof icon === 'string') {
					buttonElement.css('background-image', 'url(' + icon + ')');
				} else {
					var lightBackground = color(element.css('backgroundColor')).luminance() > 0.5;
					buttonElement.addClass(lightBackground ? 'black' : 'white').css('background-image', 'url(' + (lightBackground ? icon.black : icon.white) + ')');
				}
			});
	
			/* create the button-click-event */
			this.newEvent('tile-button:' + name, {
				source: buttonElement.mouseClick({ threshold: this.circuitboard.options.dragTheshold }).which(button.LEFT).skipPropagation('tile-left-click') // only register this event for the inner-most element
			});
	
			/* return the event-stream for convenient chaining-notation */
			return this.event('tile-button:' + name);
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

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_69__;

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(89);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(108)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/features/p-tile-buttons.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy/src/features/p-tile-buttons.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(109)();
	exports.push([module.id, ".tile>.tile-button-holder{position:absolute;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;top:2px;right:2px;margin:0;padding:0;}.tile>.tile-button-holder>.tile-button{display:block;background-size:18px;background-repeat:no-repeat;background-position:center;width:20px;height:20px;margin-left:2px;border:solid 1px transparent;}.tile>.tile-button-holder>.tile-button.white:hover{border:dotted 1px white;}.tile>.tile-button-holder>.tile-button.black:hover,.tile>.tile-button-holder>.tile-button:hover{border:dotted 1px black;}.tile:not(:hover)>.tile-button-holder{display:none;}", ""]);

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
//# sourceMappingURL=p-tile-buttons.js.map