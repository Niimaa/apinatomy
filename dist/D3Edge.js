(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("delta-js")) : factory(root["jQuery"], root["P"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_11__) {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Artefact) {
	  'use strict';
	  return Artefact.newSubclass('D3Edge', function D3Edge($__0) {
	    var $__1 = $__0,
	        source = $__1.source,
	        target = $__1.target;
	    this._source = source;
	    this._target = target;
	  }, {
	    get source() {
	      return this._source;
	    },
	    get target() {
	      return this._target;
	    },
	    get element() {
	      if (!this._element) {
	        this._element = $(("<svg><line class=\"edge " + this.options.cssClass + "\"></line></svg>")).children();
	      }
	      return this._element;
	    },
	    get graphZIndex() {
	      return this.options.graphZIndex;
	    }
	  }, {
	    graphZIndex: 100,
	    cssClass: ''
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  var U = {
	    newClass: function(constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, args);
	      };
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(SuperClass, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, [SuperClass.prototype.constructor.bind(this)].concat(args));
	      };
	      cls.prototype = Object.create(SuperClass.prototype);
	      U.extend(cls.prototype, prototype);
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__1 = 1; $__1 < arguments.length; $__1++)
	        rest[$__1 - 1] = arguments[$__1];
	      rest.forEach((function(obj) {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
	          }
	        }
	      }));
	      return obj1;
	    },
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    call: function(fn) {
	      for (var args = [],
	          $__2 = 1; $__2 < arguments.length; $__2++)
	        args[$__2 - 1] = arguments[$__2];
	      return fn.apply(undefined, args);
	    },
	    object: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = [];
	      }
	      return obj[name];
	    },
	    pull: function(arr, val) {
	      var i = arr.indexOf(val);
	      if (i !== -1) {
	        arr.splice(i);
	      }
	    },
	    makeEmpty: function(arr) {
	      while (arr.length > 0) {
	        arr.pop();
	      }
	    },
	    bindA: function(fn, ctx, args) {
	      return fn.bind.apply(fn, [ctx].concat(args));
	    },
	    bind: function(obj, m) {
	      for (var args = [],
	          $__3 = 2; $__3 < arguments.length; $__3++)
	        args[$__3 - 2] = arguments[$__3];
	      return U.bindA(obj[m], obj, args);
	    },
	    applyConstructor: function(ConstructorFn, args) {
	      var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
	      return new NewConstructorFn();
	    },
	    assert: function(condition, message) {
	      if (!condition) {
	        throw new Error(message || "Assertion failed");
	      }
	    },
	    isUndefined: function(val) {
	      return typeof val === 'undefined';
	    },
	    isDefined: function(val) {
	      return typeof val !== 'undefined';
	    },
	    objValues: function(obj) {
	      return Object.keys(obj).map((function(key) {
	        return obj[key];
	      }));
	    },
	    makePositioned: function(element) {
	      if (element.css('position') === 'static') {
	        element.css('position', 'relative');
	      }
	    },
	    defOr: function() {
	      for (var values = [],
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        values[$__4] = arguments[$__4];
	      for (var i = 0; i < values.length; i += 1) {
	        if (U.isDefined(values[i])) {
	          return values[i];
	        }
	      }
	    },
	    debounce: function(func, wait, context) {
	      var timeout;
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var $__0 = this;
	        var laterFn = (function() {
	          timeout = null;
	          func.apply(context || $__0, args);
	        });
	        clearTimeout(timeout);
	        timeout = setTimeout(laterFn, wait);
	      };
	    },
	    eachAnimationFrame: function(fn, context) {
	      var stop = false;
	      function iterationFn() {
	        fn.apply(context);
	        if (stop) {
	          return;
	        }
	        requestAnimationFrame(iterationFn);
	      }
	      iterationFn();
	      var unsubscribeFn = (function() {
	        if (unsubscribeFn.stillSubscribed) {
	          unsubscribeFn.stillSubscribed = false;
	          delete unsubscribeFn.unsubscribeOn;
	          stop = true;
	        }
	      });
	      unsubscribeFn.stillSubscribed = true;
	      unsubscribeFn.unsubscribeOn = (function(subscriber) {
	        subscriber(unsubscribeFn);
	        return unsubscribeFn;
	      });
	      return unsubscribeFn;
	    },
	    oncePerStack: function(func, context) {
	      var notRunYet = true;
	      var result = function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context || this, args);
	        }
	      };
	      result.allowAdditionalCall = (function() {
	        notRunYet = true;
	      });
	      return result;
	    },
	    cached: function($__6) {
	      var $__7 = $__6,
	          retrieve = $__7.retrieve,
	          isEqual = $__7.isEqual;
	      isEqual = isEqual || ((function(a, b) {
	        return (a === b);
	      }));
	      var cache;
	      function retrieveValue() {
	        var newValue = retrieve();
	        var oldValue = cache;
	        if (!isEqual(newValue, oldValue)) {
	          cache = newValue;
	          onChange.forEach((function(fn) {
	            return fn(newValue, oldValue);
	          }));
	        }
	      }
	      var oncePerStackSetValue = U.oncePerStack(retrieveValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange = [];
	      resultFn.onChange = (function(cb) {
	        onChange.push(cb);
	        return resultFn;
	      });
	      resultFn.allowAdditionalCall = (function() {
	        oncePerStackSetValue.allowAdditionalCall();
	      });
	      oncePerStackSetValue();
	      return resultFn;
	    },
	    promisify: function(obj, method) {
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        return new P((function(resolve, reject) {
	          try {
	            obj[method].apply(obj, args.concat(resolve));
	          } catch (error) {
	            reject(error);
	          }
	        }));
	      };
	    },
	    optionalCurry: function(fn) {
	      return function() {
	        if (fn.length <= arguments.length) {
	          return fn.apply(this, arguments);
	        } else {
	          return U.bindA(fn, this, arguments);
	        }
	      };
	    }
	  };
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.height === b.height && a.width === b.width;
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(2), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, SignalHandler, uniqueID, dm) {
	  'use strict';
	  var Artefact = dm.vp('Artefact', U.newClass(function Artefact(options) {
	    var $__0 = this._options = options,
	        id = $__0.id,
	        type = $__0.type,
	        parent = $__0.parent;
	    this._id = id || uniqueID(type);
	    this._type = type;
	    this._parent = parent;
	    this._children = [];
	    if (parent) {
	      U.array(parent, '_children').push(this);
	    }
	  }, {
	    get options() {
	      return this._options;
	    },
	    get id() {
	      return this._id;
	    },
	    get type() {
	      return this._type;
	    },
	    get parent() {
	      return this._parent;
	    },
	    get children() {
	      return this._children;
	    },
	    closestAncestorByType: function(type) {
	      var result = this;
	      do {
	        result = result.parent;
	      } while (result && result.type && result.type !== type);
	      return result;
	    },
	    closestDescendantsByType: function(type) {
	      var result = [];
	      this.children.forEach((function(child) {
	        if (child.type === type) {
	          result.push(child);
	        } else {
	          result = result.concat(child.closestDescendantsByType(type));
	        }
	      }));
	      return result;
	    },
	    destroy: function() {
	      this.trigger('destroy');
	      this.children.forEach((function(child) {
	        child.destroy();
	      }));
	    }
	  }));
	  U.extend(Artefact.prototype, SignalHandler);
	  Artefact.newSubclass = function newSubClass(name, constructor) {
	    var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	    var optionDefaults = arguments[3] !== (void 0) ? arguments[3] : {};
	    return dm.vp(name, U.newSubclass(Artefact, function(superFn) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      var processedOptions = options;
	      Object.keys(optionDefaults).forEach((function(key) {
	        if (U.isUndefined(processedOptions[key])) {
	          processedOptions[key] = optionDefaults[key];
	        }
	      }));
	      processedOptions.type = name;
	      superFn(U.extend(options, processedOptions));
	      constructor.call(this, processedOptions);
	    }, U.extend({}, prototype, {get circuitboard() {
	        if (!this._circuitboard) {
	          this._circuitboard = this.closestAncestorByType('Circuitboard');
	        }
	        return this._circuitboard;
	      }})));
	  };
	  return Artefact;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/D3Edge.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/D3Edge.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	exports.push([module.id, "", ""]);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  var SignalHandler = {};
	  SignalHandler._getCallbacks = function _getCallbacks(signal) {
	    if (U.isUndefined(this._callbacks)) {
	      this._callbacks = {};
	    }
	    if (U.isUndefined(this._callbacks[signal])) {
	      this._callbacks[signal] = $.Callbacks();
	    }
	    return this._callbacks[signal];
	  };
	  SignalHandler.on = U.optionalCurry(function on(signal, fn) {
	    var $__0 = this;
	    this._getCallbacks(signal).add(fn);
	    var unsubscribeFn = (function() {
	      if (unsubscribeFn.stillSubscribed) {
	        unsubscribeFn.stillSubscribed = false;
	        $__0._getCallbacks(signal).remove(fn);
	      }
	    });
	    unsubscribeFn.stillSubscribed = true;
	    unsubscribeFn.unsubscribeOn = (function(subscriber) {
	      subscriber(unsubscribeFn);
	      return unsubscribeFn;
	    });
	    unsubscribeFn.subscribeWhenever = (function(subscriber) {
	      subscriber((function(val) {
	        $__0._getCallbacks(signal)[val ? 'add' : 'remove'](fn);
	      }));
	      return unsubscribeFn;
	    });
	    return unsubscribeFn;
	  });
	  SignalHandler.onValue = U.optionalCurry(function onValue(signal, anticipatedValue, fn) {
	    return this.on(signal, (function(value) {
	      if (value === anticipatedValue) {
	        fn();
	      }
	    }));
	  });
	  SignalHandler.one = U.optionalCurry(function one(signal, fn) {
	    var unsubscribeFn = this.on(signal, function() {
	      for (var args = [],
	          $__1 = 0; $__1 < arguments.length; $__1++)
	        args[$__1] = arguments[$__1];
	      unsubscribeFn();
	      fn.apply(null, args);
	    });
	    return unsubscribeFn;
	  });
	  SignalHandler.oneValue = U.optionalCurry(function oneValue(signal, anticipatedValue, fn) {
	    var unsubscribeFn = this.on(signal, (function(value) {
	      if (value === anticipatedValue) {
	        unsubscribeFn();
	        fn();
	      }
	    }));
	    return unsubscribeFn;
	  });
	  SignalHandler.once = SignalHandler.one;
	  SignalHandler.trigger = function trigger(signal) {
	    for (var args = [],
	        $__1 = 1; $__1 < arguments.length; $__1++)
	      args[$__1 - 1] = arguments[$__1];
	    var callbacks = this._getCallbacks(signal);
	    if (callbacks) {
	      callbacks.fireWith(this, args);
	    }
	  };
	  SignalHandler.newObservable = function newObservable(name) {
	    var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
	        initial = $__2.initial,
	        validation = $__2.validation;
	    var cache;
	    Object.defineProperty(this, name, {
	      get: function() {
	        return cache;
	      },
	      set: function(newValue) {
	        var oldValue = cache;
	        if (validation) {
	          newValue = validation(newValue, oldValue);
	        }
	        if (newValue !== oldValue) {
	          cache = newValue;
	          this.trigger(name, newValue, oldValue);
	        }
	      }
	    });
	    this[name] = initial;
	  };
	  SignalHandler.observe = U.optionalCurry(function observe(observable, fn) {
	    var unsubscribeFn = this.on(observable, fn);
	    if (U.isDefined(this[observable])) {
	      fn(this[observable]);
	    }
	    return unsubscribeFn;
	  });
	  SignalHandler.observeValue = U.optionalCurry(function observeValue(signal, anticipatedValue, fn) {
	    return this.observe(signal, (function(value) {
	      if (value === anticipatedValue) {
	        fn();
	      }
	    }));
	  });
	  return SignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
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
				addStylesToDom(newStyles);
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
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
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
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
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
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZWE5MzgyZTFhYmVlODUxYWU5OSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9EM0VkZ2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9hcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L0QzRWRnZS5zY3NzPzFjODMiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvRDNFZGdlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvc2lnbmFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsU0FBTztBQUN6QixjQUFXLENBQUM7QUFHWixRQUFPLFNBQU8sWUFBYSxDQUFDLFFBQU8sQ0FBRyxTQUFTLE9BQUssQ0FBRSxJQUFlOztBQUFkLGNBQUs7QUFBRyxjQUFLO0FBQ25FLFFBQUcsUUFBUSxFQUFJLE9BQUssQ0FBQztBQUNyQixRQUFHLFFBQVEsRUFBSSxPQUFLLENBQUM7R0FDdEIsQ0FBRztBQUVGLE9BQUksT0FBSyxFQUFJO0FBQUUsWUFBTyxLQUFHLFFBQVE7S0FBRTtBQUVuQyxPQUFJLE9BQUssRUFBSTtBQUFFLFlBQU8sS0FBRyxRQUFRO0tBQUU7QUFFbkMsT0FBSSxRQUFNLEVBQUk7QUFDYixVQUFJLENBQUMsSUFBRyxTQUFTLENBQUc7QUFFbkIsWUFBRyxTQUFTLEVBQUksRUFBQyxFQUFDLDBCQUF5QixFQUFDLEtBQUcsUUFBUSxTQUFTLEVBQUMsbUJBQWdCLEVBQUMsU0FBVSxFQUFDLENBQUM7T0FDL0Y7QUFDQSxZQUFPLEtBQUcsU0FBUyxDQUFDO0tBQ3JCO0FBRUEsT0FBSSxZQUFVLEVBQUk7QUFBRSxZQUFPLEtBQUcsUUFBUSxZQUFZO0tBQUU7QUFBQSxHQUVyRCxDQUFHO0FBQ0YsZUFBVSxDQUFHLElB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QWM7QUFDZDtBQUNBLGlDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUEyRDtBQUMzRCxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuSEEsaUQ7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDZlYTkzODJlMWFiZWU4NTFhZTk5XG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvYXJ0ZWZhY3QuanMnLFxuXHQnLi9EM0VkZ2Uuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBVLCBBcnRlZmFjdCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ0QzRWRnZScsIGZ1bmN0aW9uIEQzRWRnZSh7c291cmNlLCB0YXJnZXR9KSB7XG5cdFx0dGhpcy5fc291cmNlID0gc291cmNlO1xuXHRcdHRoaXMuX3RhcmdldCA9IHRhcmdldDtcblx0fSwge1xuXG5cdFx0Z2V0IHNvdXJjZSgpIHsgcmV0dXJuIHRoaXMuX3NvdXJjZSB9LFxuXG5cdFx0Z2V0IHRhcmdldCgpIHsgcmV0dXJuIHRoaXMuX3RhcmdldCB9LFxuXG5cdFx0Z2V0IGVsZW1lbnQoKSB7XG5cdFx0XHRpZiAoIXRoaXMuX2VsZW1lbnQpIHtcblx0XHRcdFx0Ly8gYWRkaW5nIGFuZCBkaXNjYXJkaW5nIGFuICdzdmcnIGVsZW1lbnQgcHJldmVudHMgYSBidWcgd2hlcmUgdGhlIGxpbmUgd291bGQgbm90IGFwcGVhclxuXHRcdFx0XHR0aGlzLl9lbGVtZW50ID0gJChgPHN2Zz48bGluZSBjbGFzcz1cImVkZ2UgJHt0aGlzLm9wdGlvbnMuY3NzQ2xhc3N9XCI+PC9saW5lPjwvc3ZnPmApLmNoaWxkcmVuKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5fZWxlbWVudDtcblx0XHR9LFxuXG5cdFx0Z2V0IGdyYXBoWkluZGV4KCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdyYXBoWkluZGV4IH1cblxuXHR9LCB7XG5cdFx0Z3JhcGhaSW5kZXg6IDEwMCxcblx0XHRjc3NDbGFzczogJydcblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL0QzRWRnZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblxuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVGbiA9ICgpID0+IHtcblx0XHRcdFx0aWYgKHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkKSB7XG5cdFx0XHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRkZWxldGUgdW5zdWJzY3JpYmVGbi51bnN1YnNjcmliZU9uO1xuXHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0dW5zdWJzY3JpYmVGbi51bnN1YnNjcmliZU9uID0gKHN1YnNjcmliZXIpID0+IHtcblx0XHRcdFx0c3Vic2NyaWJlcih1bnN1YnNjcmliZUZuKTtcblx0XHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdG9wdGlvbmFsQ3VycnkoZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChmbi5sZW5ndGggPD0gYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBVLmJpbmRBKGZuLCB0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vbWlzYy5qcycsICcuL3NpZ25hbC1oYW5kbGVyLmpzJywgJy4vdW5pcXVlLWlkLmpzJywgJy4vbWFpbi1kZWx0YS1tb2RlbC5qcyddLCBmdW5jdGlvbiAoJCwgUCwgVSwgU2lnbmFsSGFuZGxlciwgdW5pcXVlSUQsIGRtKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBBcnRlZmFjdCA9IGRtLnZwKCdBcnRlZmFjdCcsIFUubmV3Q2xhc3MoZnVuY3Rpb24gQXJ0ZWZhY3Qob3B0aW9ucykge1xuXHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudH0gPSB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHNldCBoaWVyYXJjaHkgc3R1ZmYgKi9cblx0XHR0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuXHRcdHRoaXMuX3R5cGUgPSB0eXBlO1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHRcdGlmIChwYXJlbnQpIHsgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpIH1cblxuXHR9LCB7XG5cblx0XHRnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnMgfSxcblxuXHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH0sXG5cblx0XHRnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGUgfSxcblxuXHRcdGdldCBwYXJlbnQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfSxcblxuXHRcdGdldCBjaGlsZHJlbigpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIH0sXG5cblx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmRlc3Ryb3koKSB9KTtcblx0XHR9XG5cblx0fSkpO1xuXG5cblx0VS5leHRlbmQoQXJ0ZWZhY3QucHJvdG90eXBlLCBTaWduYWxIYW5kbGVyKTtcblxuXG5cdEFydGVmYWN0Lm5ld1N1YmNsYXNzID0gZnVuY3Rpb24gbmV3U3ViQ2xhc3MobmFtZSwgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9LCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cdFx0cmV0dXJuIGRtLnZwKG5hbWUsIFUubmV3U3ViY2xhc3MoQXJ0ZWZhY3QsIGZ1bmN0aW9uIChzdXBlckZuLCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0LyogcHJvY2VzcyBvcHRpb25zICovXG5cdFx0XHR2YXIgcHJvY2Vzc2VkT3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHRPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHByb2Nlc3NlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zW2tleV0gPSBvcHRpb25EZWZhdWx0c1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG5cblx0XHRcdC8qIGNhbGwgc3VwZXItY29uc3RydWN0b3IgKi9cblx0XHRcdHN1cGVyRm4oVS5leHRlbmQob3B0aW9ucywgcHJvY2Vzc2VkT3B0aW9ucykpO1xuXG5cdFx0XHQvKiBjYWxsIHRoaXMgY29uc3RydWN0b3IgKi9cblx0XHRcdGNvbnN0cnVjdG9yLmNhbGwodGhpcywgcHJvY2Vzc2VkT3B0aW9ucyk7XG5cblx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRnZXQgY2lyY3VpdGJvYXJkKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX2NpcmN1aXRib2FyZCkgeyB0aGlzLl9jaXJjdWl0Ym9hcmQgPSB0aGlzLmNsb3Nlc3RBbmNlc3RvckJ5VHlwZSgnQ2lyY3VpdGJvYXJkJykgfVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY2lyY3VpdGJvYXJkO1xuXHRcdFx0fVxuXHRcdH0pKSk7XG5cdH07XG5cblxuXHRyZXR1cm4gQXJ0ZWZhY3Q7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2FydGVmYWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvRDNFZGdlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L0QzRWRnZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L0QzRWRnZS5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9EM0VkZ2Uuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L0QzRWRnZS5zY3NzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBVKSB7XG5cblx0dmFyIFNpZ25hbEhhbmRsZXIgPSB7fTtcblxuXHRTaWduYWxIYW5kbGVyLl9nZXRDYWxsYmFja3MgPSBmdW5jdGlvbiBfZ2V0Q2FsbGJhY2tzKHNpZ25hbCkge1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKHRoaXMuX2NhbGxiYWNrcykpIHsgdGhpcy5fY2FsbGJhY2tzID0ge30gfVxuXHRcdGlmIChVLmlzVW5kZWZpbmVkKHRoaXMuX2NhbGxiYWNrc1tzaWduYWxdKSkgeyB0aGlzLl9jYWxsYmFja3Nbc2lnbmFsXSA9ICQuQ2FsbGJhY2tzKCkgfVxuXHRcdHJldHVybiB0aGlzLl9jYWxsYmFja3Nbc2lnbmFsXTtcblx0fTtcblxuXHQvKiBob3cgdG8gc3Vic2NyaWJlIHRvIGEgc2lnbmFsICovXG5cdFNpZ25hbEhhbmRsZXIub24gPSBVLm9wdGlvbmFsQ3VycnkoZnVuY3Rpb24gb24oc2lnbmFsLCBmbikge1xuXHRcdHRoaXMuX2dldENhbGxiYWNrcyhzaWduYWwpLmFkZChmbik7XG5cdFx0dmFyIHVuc3Vic2NyaWJlRm4gPSAoKSA9PiB7XG5cdFx0XHRpZiAodW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQpIHtcblx0XHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5fZ2V0Q2FsbGJhY2tzKHNpZ25hbCkucmVtb3ZlKGZuKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHR1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT24gPSAoc3Vic2NyaWJlcikgPT4ge1xuXHRcdFx0c3Vic2NyaWJlcih1bnN1YnNjcmliZUZuKTtcblx0XHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHRcdH07XG5cdFx0dW5zdWJzY3JpYmVGbi5zdWJzY3JpYmVXaGVuZXZlciA9IChzdWJzY3JpYmVyKSA9PiB7XG5cdFx0XHRzdWJzY3JpYmVyKCh2YWwpID0+IHsgdGhpcy5fZ2V0Q2FsbGJhY2tzKHNpZ25hbClbdmFsID8gJ2FkZCcgOiAncmVtb3ZlJ10oZm4pIH0pO1xuXHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0fTtcblx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0fSk7XG5cdFNpZ25hbEhhbmRsZXIub25WYWx1ZSA9IFUub3B0aW9uYWxDdXJyeShmdW5jdGlvbiBvblZhbHVlKHNpZ25hbCwgYW50aWNpcGF0ZWRWYWx1ZSwgZm4pIHtcblx0XHRyZXR1cm4gdGhpcy5vbihzaWduYWwsICh2YWx1ZSkgPT4ge1xuXHRcdFx0aWYgKHZhbHVlID09PSBhbnRpY2lwYXRlZFZhbHVlKSB7IGZuKCkgfVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvKiBob3cgdG8gc3Vic2NyaWJlIHRvIGEgb25lLXRpbWUgc2lnbmFsICovXG5cdFNpZ25hbEhhbmRsZXIub25lID0gVS5vcHRpb25hbEN1cnJ5KGZ1bmN0aW9uIG9uZShzaWduYWwsIGZuKSB7XG5cdFx0dmFyIHVuc3Vic2NyaWJlRm4gPSB0aGlzLm9uKHNpZ25hbCwgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdHVuc3Vic2NyaWJlRm4oKTtcblx0XHRcdGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHR9KTtcblx0U2lnbmFsSGFuZGxlci5vbmVWYWx1ZSA9IFUub3B0aW9uYWxDdXJyeShmdW5jdGlvbiBvbmVWYWx1ZShzaWduYWwsIGFudGljaXBhdGVkVmFsdWUsIGZuKSB7XG5cdFx0dmFyIHVuc3Vic2NyaWJlRm4gPSB0aGlzLm9uKHNpZ25hbCwgKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUgPT09IGFudGljaXBhdGVkVmFsdWUpIHtcblx0XHRcdFx0dW5zdWJzY3JpYmVGbigpO1xuXHRcdFx0XHRmbigpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHR9KTtcblxuXHRTaWduYWxIYW5kbGVyLm9uY2UgPSBTaWduYWxIYW5kbGVyLm9uZTtcblxuXHQvKiBob3cgdG8gdHJpZ2dlciBhIHNpZ25hbCB3aXRoIGFueSBudW1iZXIgb2YgYXJndW1lbnRzICovXG5cdFNpZ25hbEhhbmRsZXIudHJpZ2dlciA9IGZ1bmN0aW9uIHRyaWdnZXIoc2lnbmFsLCAuLi5hcmdzKSB7XG5cdFx0dmFyIGNhbGxiYWNrcyA9IHRoaXMuX2dldENhbGxiYWNrcyhzaWduYWwpO1xuXHRcdGlmIChjYWxsYmFja3MpIHsgY2FsbGJhY2tzLmZpcmVXaXRoKHRoaXMsIGFyZ3MpIH1cblx0fTtcblxuXHQvKiAgY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoaXMgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyogIG5hbWUgKG1hbmRhdG9yeSkgICAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKiAgb3B0aW9ucy5pbml0aWFsICAgIC0gdGhlIGluaXRpYWwgdmFsdWU7IGRlZmF1bHRzIHRvIHVuZGVmaW5lZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qICBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuICAgICAgKi9cblx0LyogICAgICAgICAgICAgICAgICAgICAgIEl0IGlzIHBhc3NlZCB0aGUgbmV3IHZhbHVlIGFuZCB0aGUgb2xkIHZhbHVlLCBhbmQgc2hvdWxkIHJldHVybiB0aGUgYWN0dWFsICAqL1xuXHQvKiAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgdGhhdCBzaG91bGQgYmUgc2V0LiBUaGlzIGNvdWxkIGJlIHRoZSBuZXcgb3Igb2xkIHZhbHVlIGRpcmVjdGx5LCAgICAgICovXG5cdC8qICAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlICAgKi9cblx0LyogICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tICAgICAqL1xuXHQvKiAgICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFNpZ25hbEhhbmRsZXIubmV3T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIG5ld09ic2VydmFibGUobmFtZSwge2luaXRpYWwsIHZhbGlkYXRpb259ID0ge30pIHtcblxuXHRcdC8qIHN0b3JlIHRoZSB2YWx1ZSAqL1xuXHRcdHZhciBjYWNoZTtcblxuXHRcdC8qIGRlZmluZSBnZXR0ZXJzIGFuZCBzZXR0ZXJzICovXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIGNhY2hlIH0sXG5cdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICh2YWxpZGF0aW9uKSB7IG5ld1ZhbHVlID0gdmFsaWRhdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIH1cblx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKG5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBub3cgKHBvc3NpYmx5IHRyaWdnZXJpbmcgZXhpc3RpbmcgY2FsbGJhY2tzKSAqL1xuXHRcdHRoaXNbbmFtZV0gPSBpbml0aWFsO1xuXG5cdH07XG5cblx0Lyogb2JzZXJ2ZSBhbiBvYnNlcnZhYmxlOyBpZiBpdCBhbHJlYWR5IGhhcyBhIHZhbHVlLCB0aGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkICovXG5cdFNpZ25hbEhhbmRsZXIub2JzZXJ2ZSA9IFUub3B0aW9uYWxDdXJyeShmdW5jdGlvbiBvYnNlcnZlKG9ic2VydmFibGUsIGZuKSB7XG5cdFx0Lyogc3Vic2NyaWJlIHRvIHRoZSB2YWx1ZSBvZiB0aGUgb2JzZXJ2YWJsZSAqL1xuXHRcdHZhciB1bnN1YnNjcmliZUZuID0gdGhpcy5vbihvYnNlcnZhYmxlLCBmbik7XG5cblx0XHQvKiBpZiB0aGUgb2JzZXJ2YWJsZSBoYXMgYSB2YWx1ZSBhbHJlYWR5LCB0cmlnZ2VyIHRoZSBjYWxsYmFjayBub3cgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQodGhpc1tvYnNlcnZhYmxlXSkpIHsgZm4odGhpc1tvYnNlcnZhYmxlXSkgfVxuXG5cdFx0LyogcmV0dXJuIHRoZSB1bnN1YnNjcmliZSBjYWxsYmFjayAqL1xuXHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHR9KTtcblx0U2lnbmFsSGFuZGxlci5vYnNlcnZlVmFsdWUgPSBVLm9wdGlvbmFsQ3VycnkoZnVuY3Rpb24gb2JzZXJ2ZVZhbHVlKHNpZ25hbCwgYW50aWNpcGF0ZWRWYWx1ZSwgZm4pIHtcblx0XHRyZXR1cm4gdGhpcy5vYnNlcnZlKHNpZ25hbCwgKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUgPT09IGFudGljaXBhdGVkVmFsdWUpIHsgZm4oKSB9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8qIHJldHVybiB0aGUgb2JqZWN0IHRoYXQgY2FuIGJlIG1peGVkIGludG8gb3RoZXIgb2JqZWN0cyAqL1xuXHRyZXR1cm4gU2lnbmFsSGFuZGxlcjtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3NpZ25hbC1oYW5kbGVyLmpzXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX25leHRJZCA9IDA7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xuXHRcdHJldHVybiBgJHtwcmVmaXh8fFwidW5pcXVlLWlkXCJ9LSR7X25leHRJZCsrfWA7XG5cdH07XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvdW5pcXVlLWlkLmpzXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnZGVsdGEtanMnIF0sIGZ1bmN0aW9uIChQLCBETSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBhbHJlYWR5IGNhY2hlZD8gKi9cblx0aWYgKHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsKSB7IHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCB9XG5cblxuXHQvKiB0ZWxsIGRlbHRhLmpzIGFib3V0IGJsdWViaXJkICovXG5cdERNLnJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKFAucmVzb2x2ZSk7XG5cblxuXHQvKiBzZXQgdGhlIGNhY2hlICovXG5cdHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsID0gbmV3IERNKCk7XG5cblxuXHQvKiByZXR1cm4gdGhlIGRlbHRhIG1vZGVsIHRoYXQgbWFuYWdlcyBhbGwgcGx1Z2lucyAoPSBkZWx0YXMpICovXG5cdHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbDtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qc1xuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMpO1xyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdC8vIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYS8qLCBzb3VyY2VNYXA6IHNvdXJjZU1hcCovfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaikge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaik7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgLyomJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKi8pXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHQvLyB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0Ly8gTm8gYnJvd3NlciBzdXBwb3J0XHJcblx0Ly8gaWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdC8vIHRyeSB7XHJcblx0XHRcdC8vIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdC8vIH0gY2F0Y2goZSkge31cclxuXHQvLyB9XHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxuXHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiRDNFZGdlLmpzIn0=