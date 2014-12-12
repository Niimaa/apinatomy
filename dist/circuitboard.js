(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("bacon"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "bacon", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("bacon"), require("delta-js")) : factory(root["jQuery"], root["P"], root["Bacon"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, amyWidget, U, dm) {
	  'use strict';
	  U.extend(U.object($, 'circuitboard'), {plugin: function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        dm.select.apply(dm, pluginOrSelection);
	        defineWidgetClasses();
	      }
	    }});
	  function defineWidgetClasses() {
	    $.circuitboard.Circuitboard = amyWidget('Circuitboard', {
	      cssClass: "circuitboard",
	      filter: (function() {
	        return P.resolve(true);
	      })
	    });
	    $.circuitboard.Tilemap = amyWidget('Tilemap', {cssClass: "tilemap"});
	    $.circuitboard.Tile = amyWidget('Tile', {cssClass: 'tile'});
	  }
	  $.circuitboard.plugin.graph = (function() {
	    return dm.graph();
	  });
	  $.circuitboard.plugin.dm = dm;
	  return $.circuitboard;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, Artefact) {
	  'use strict';
	  function amyWidget(typeName, optionDefaults) {
	    var Widget = Artefact.newSubclass(typeName, function Widget($__1) {
	      var cssClass = $__1.cssClass;
	      var $__0 = this;
	      if (U.isDefined(cssClass)) {
	        this.element.addClass(cssClass);
	      }
	      this.element.one('remove', (function() {
	        $__0.destroy();
	      }));
	      this.constructed = P.resolve();
	      this.beforeConstruction(this.options.beforeConstruction);
	      this.constructed.then((function() {
	        if ($.isFunction($__0.construct)) {
	          $__0.beforeConstruction($__0.construct());
	        }
	      }));
	    }, {
	      get model() {
	        return this.options.model;
	      },
	      get element() {
	        return this.options.element;
	      },
	      beforeConstruction: function(possiblePromise) {
	        this.constructed = this.constructed.return(P.resolve(possiblePromise)).return(this);
	      }
	    }, optionDefaults);
	    var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
	    $.fn[lowercaseName] = function(options) {
	      if (options === 'instance') {
	        return this.data(("-amy-" + lowercaseName));
	      }
	      var newWidget = new Widget(U.extend(options, {element: this}));
	      this.data(("-amy-" + lowercaseName), newWidget.constructed);
	      return this;
	    };
	    return Widget;
	  }
	  return amyWidget;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	    id: function(v) {
	      return v;
	    },
	    getDef: function(obj, name, value) {
	      if (U.isUndefined(obj[name])) {
	        if (typeof value === 'function') {
	          value = value();
	        }
	        obj[name] = value;
	      }
	      return obj[name];
	    },
	    object: function(obj, name) {
	      return U.getDef(obj, name, {});
	    },
	    array: function(obj, name) {
	      return U.getDef(obj, name, []);
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
	    isPlainObject: function(val) {
	      return typeof val === 'object' && val.constructor === Object;
	    },
	    isFunction: function(val) {
	      return typeof val === 'function';
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
	    findIndex: function(array, pred) {
	      for (var i = 0; i < array.length; ++i) {
	        if (pred(array[i], i, array)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    memoize: function(fn) {
	      var keys = [];
	      var cache = [];
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var index = U.findIndex(keys, (function(key) {
	          return key.every((function(v, i) {
	            return v === args[i];
	          }));
	        }));
	        if (index >= 0) {
	          return cache[index];
	        }
	        var result = fn.apply(this, args);
	        keys.push(args);
	        cache.push(result);
	        return result;
	      };
	    }
	  };
	  var EPS = 0.000001;
	  var sortOfEqual = (function(a, b) {
	    return (b - EPS < a && a < b + EPS);
	  });
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.top, b.top) && sortOfEqual(a.left, b.left);
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.height, b.height) && sortOfEqual(a.width, b.width);
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(9), __webpack_require__(10), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm) {
	  'use strict';
	  var Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, function Artefact(superFn, options) {
	    superFn();
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
	    this.newEvent('destroy');
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
	  var BaconSignalHandler = U.newClass(function BaconSignalHandler() {
	    this._events = {};
	    this._properties = {};
	    this._propertyBusses = {};
	  }, {
	    newEvent: function(name) {
	      var source = (arguments[1] !== (void 0) ? arguments[1] : {}).source;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      var bus = new Bacon.Bus();
	      if (source) {
	        bus.plug(source);
	      }
	      return this._events[name] = bus.name(name);
	    },
	    event: function(name) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      return this._events[name];
	    },
	    property: function(name) {
	      if (!this._properties[name]) {
	        this._propertyBusses[name] = new Bacon.Bus();
	        this._properties[name] = this._propertyBusses[name].toProperty().name(name);
	        this._properties[name].appendModifier = function(modifier) {
	          for (var args = [],
	              $__0 = 1; $__0 < arguments.length; $__0++)
	            args[$__0 - 1] = arguments[$__0];
	          this._properties[name] = this._properties[name][modifier].apply(this._properties[name], args);
	        };
	      }
	      return this._properties[name];
	    },
	    newProperty: function(name) {
	      var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
	          source = $__1.source,
	          settable = $__1.settable,
	          initial = $__1.initial,
	          isEqual = $__1.isEqual;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name] || !this._properties[name]._amy_plugged, ("There is already a property '" + name + "' on this object."));
	      this.property(name)._amy_plugged = true;
	      var innerBus = new Bacon.Bus();
	      if (source) {
	        innerBus.plug(source);
	      } else if (settable !== false) {
	        settable = true;
	      }
	      var value;
	      Object.defineProperty(this, name, settable ? {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          innerBus.push(newValue);
	        }
	      } : {get: function() {
	          return value;
	        }});
	      var innerProperty = innerBus.skipDuplicates(isEqual);
	      this._propertyBusses[name].plug(innerProperty);
	      this.property(name).onValue((function(v) {
	        value = v;
	      }));
	      if (U.isDefined(initial)) {
	        innerBus.push(initial);
	      }
	    },
	    trigger: function(name, value) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      this._events[name].push(value);
	    },
	    on: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      return this._on(argsObj);
	    },
	    one: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      U.object(argsObj, 'options').once = true;
	      return this._on(argsObj);
	    },
	    _on: function($__1) {
	      var $__2 = $__1,
	          name = $__2.name,
	          expectedValue = $__2.expectedValue,
	          options = $__2.options,
	          callback = $__2.callback;
	      U.assert(this._events[name] || this._properties[name], ("There is no event or property '" + name + "' on this object."));
	      var result = this._events[name] || this._properties[name];
	      if (U.isDefined(expectedValue)) {
	        result = result.filter((function(v) {
	          return v === expectedValue;
	        }));
	      }
	      if (options && options.once) {
	        result = result.take(1);
	      }
	      if (callback) {
	        result = result.onValue(callback);
	      }
	      return result;
	    },
	    _gatherOnArguments: function() {
	      for (var args = [],
	          $__0 = 0; $__0 < arguments.length; $__0++)
	        args[$__0] = arguments[$__0];
	      var result = {name: args.shift()};
	      if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
	        result.expectedValue = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isPlainObject(args[0])) {
	        result.options = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isFunction(args[0])) {
	        result.callback = args.shift();
	      }
	      return result;
	    }
	  });
	  return BaconSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNjM4ZWI0MTZmMWVmZWMyODAyMiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYXJ0ZWZhY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tc2lnbmFsLWhhbmRsZXIuanMiLCJ3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RSxDQUFDO0FBR25DLFVBQUksV0FBVyxDQUFDLElBQUcsQ0FBRSxFQUFDLENBQUMsR0FBSyxFQUFDLFlBQVksQ0FBQyxJQUFHLENBQUUsRUFBQyxDQUFDLEdBQUssRUFBQyxlQUFlLENBQUMsSUFBRyxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQ2hGLGNBQUssY0FBYyxFQUFJLEtBQUcsTUFBTyxFQUFDLENBQUM7T0FDcEM7QUFHQSxVQUFJLFdBQVcsQ0FBQyxJQUFHLENBQUUsRUFBQyxDQUFDLEdBQUssZ0JBQWUsQ0FBQyxJQUFHLENBQUUsRUFBQyxDQUFDLENBQUc7QUFDckQsY0FBSyxRQUFRLEVBQUksS0FBRyxNQUFPLEVBQUMsQ0FBQztPQUM5QjtBQUdBLFVBQUksV0FBVyxDQUFDLElBQUcsQ0FBRSxFQUFDLENBQUMsR0FBSyxhQUFZLENBQUMsSUFBRyxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQ2xELGNBQUssU0FBUyxFQUFJLEtBQUcsTUFBTyxFQUFDLENBQUM7T0FDL0I7QUFFQSxZQUFPLE9BQUssQ0FBQztLQUNkO0FBQUEsR0FHRCxDQUFDLENBQUM7QUFHRixRQUFPLG1CQUFpQixDQUFDO0FBRzFCLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztpRUMxUUEsaUNBQU8sQ0FBQyxDQUFHLDBDQUFVLENBQUU7QUFDdEIsY0FBVyxDQUFDO0FBRVIsYUFBTSxFQUFJLEdBQUM7QUFFZixRQUFPLFNBQVMsU0FBTyxDQUFFLE1BQUssQ0FBRztBQUNoQyxhQUFVLE1BQUssR0FBRyxZQUFVLEdBQUMsSUFBRyxFQUFDLFFBQU0sRUFBRSxFQUFHO0dBQzdDLENBQUM7QUFDRixFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJiYWNvblwiLCBcImRlbHRhLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGI2MzhlYjQxNmYxZWZlYzI4MDIyXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vdXRpbC93aWRnZXQuanMnLCAnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMnIF0sIGZ1bmN0aW9uICgkLCBQLCBhbXlXaWRnZXQsIFUsIGRtKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGFsbG93ICckLmNpcmN1aXRib2FyZCcgdG8gYWNjZXB0IHBsdWdpbnMgKi9cblx0VS5leHRlbmQoVS5vYmplY3QoJCwgJ2NpcmN1aXRib2FyZCcpLCB7XG5cdFx0cGx1Z2luKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG5cdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW5cblx0XHRcdFx0cmV0dXJuIG5ldyBkbS5EZWx0YShwbHVnaW5PclNlbGVjdGlvbi5uYW1lLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byBzZWxlY3QgcGx1Z2lucyB0byBiZSBhcHBsaWVkXG5cdFx0XHRcdGRtLnNlbGVjdC5hcHBseShkbSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0XHRkZWZpbmVXaWRnZXRDbGFzc2VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8qIHRvIGRlZmluZSB0aGUgd2lkZ2V0IGNsYXNzZXMgYWZ0ZXIgdGhlIHByb3BlciBwbHVnaW5zIGhhdmUgYmVlbiBzZWxlY3RlZCAqL1xuXHRmdW5jdGlvbiBkZWZpbmVXaWRnZXRDbGFzc2VzKCkge1xuXHRcdCQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZCA9IGFteVdpZGdldCgnQ2lyY3VpdGJvYXJkJywge1xuXHRcdFx0Y3NzQ2xhc3M6IFwiY2lyY3VpdGJvYXJkXCIsXG5cdFx0XHRmaWx0ZXI6ICgpPT5QLnJlc29sdmUodHJ1ZSlcblx0XHR9KTtcblxuXHRcdCQuY2lyY3VpdGJvYXJkLlRpbGVtYXAgPSBhbXlXaWRnZXQoJ1RpbGVtYXAnLCB7XG5cdFx0XHRjc3NDbGFzczogXCJ0aWxlbWFwXCJcblx0XHR9KTtcblxuXHRcdCQuY2lyY3VpdGJvYXJkLlRpbGUgPSBhbXlXaWRnZXQoJ1RpbGUnLCB7XG5cdFx0XHRjc3NDbGFzczogJ3RpbGUnXG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGZvciBnZXR0aW5nIHRoZSBwbHVnaW4gZ3JhcGggKi9cblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luLmdyYXBoID0gKCkgPT4gZG0uZ3JhcGgoKTtcblxuXHQvKiBmb3IgZ2V0dGluZyB0aGUgbWFpbiBkZWx0YSBtb2RlbCAqL1xuXHQkLmNpcmN1aXRib2FyZC5wbHVnaW4uZG0gPSBkbTtcblxuXG5cdC8qICByZXR1cm4gdGhlIHN0YXRpYyBgJC5jaXJjdWl0Ym9hcmRgIG9iamVjdCwgICAgICAgICAqL1xuXHQvKiAgdGhyb3VnaCB3aGljaCBwbHVnaW5zIGNhbiBiZSBhcHBsaWVkIGFuZCBzZWxlY3RlZCAgKi9cblx0cmV0dXJuICQuY2lyY3VpdGJvYXJkO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvY2lyY3VpdGJvYXJkLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL21pc2MuanMnLCAnLi9hcnRlZmFjdC5qcyddLCBmdW5jdGlvbiAoJCwgUCwgVSwgQXJ0ZWZhY3QpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGFwaW5hdG9teSBjb21wb25lbnQgKHdpZGdldCkgICAgICAgICAgKi9cblx0LyogIGFzIGEgalF1ZXJ5IGVsZW1lbnQgcGx1Z2luOyB0aGlzIGlzIHJldHVybmVkIGZyb20gdGhlIG1vZHVsZSAgKi9cblx0ZnVuY3Rpb24gYW15V2lkZ2V0KHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cykge1xuXG5cdFx0LyogdGhlIHNwZWNpZmljIHdpZGdldCBjbGFzcyAqL1xuXHRcdHZhciBXaWRnZXQgPSBBcnRlZmFjdC5uZXdTdWJjbGFzcyh0eXBlTmFtZSwgZnVuY3Rpb24gV2lkZ2V0KHtjc3NDbGFzc30pIHtcblxuXHRcdFx0Lyogc2V0IHRoZSBlbGVtZW50IGNsYXNzICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoY3NzQ2xhc3MpKSB7IHRoaXMuZWxlbWVudC5hZGRDbGFzcyhjc3NDbGFzcykgfVxuXG5cdFx0XHQvKiBpZiB0aGUganF1ZXJ5IGVsZW1lbnQgaXMgcmVtb3ZlZCwgZGVzdHJveSB0aGUgYXJ0ZWZhY3QgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5vbmUoJ3JlbW92ZScsICgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSk7XG5cblx0XHRcdC8qIHdhaXQgZm9yIHNvbWV0aGluZyBiZWZvcmUgY29uc3RydWN0aW9uIChsaWtlIHBsdWdpbnMpPyAqL1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSgpO1xuXHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5vcHRpb25zLmJlZm9yZUNvbnN0cnVjdGlvbik7XG5cblx0XHRcdC8qICBpZiBwcmVzZW50LCBydW4gdGhlIGNvbnN0cnVjdCBtZXRob2QgYWZ0ZXIgICAgKi9cblx0XHRcdC8qIGB0aGlzLm9wdGlvbnMuYmVmb3JlQ29uc3RydWN0aW9uYCBpcyBmaW5pc2hlZCAgKi9cblx0XHRcdC8qICBhbmQgdGhlbiB3YWl0IG9uIGl0ICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdHRoaXMuY29uc3RydWN0ZWQudGhlbigoKSA9PiB7XG5cdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3QoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0fSwge1xuXG5cdFx0XHRnZXQgbW9kZWwoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfSxcblxuXHRcdFx0Z2V0IGVsZW1lbnQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMuZWxlbWVudCB9LFxuXG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cdFx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkXG5cdFx0XHRcdFx0XHQucmV0dXJuKFAucmVzb2x2ZShwb3NzaWJsZVByb21pc2UpKVxuXHRcdFx0XHRcdFx0LnJldHVybih0aGlzKTtcblx0XHRcdH1cblxuXHRcdH0sIG9wdGlvbkRlZmF1bHRzKTtcblxuXHRcdC8qIG5vdyBkZWZpbmUgdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiBhcyBhIGpRdWVyeSBwbHVnaW4gKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IHR5cGVOYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyB0eXBlTmFtZS5zbGljZSgxKTtcblx0XHQkLmZuW2xvd2VyY2FzZU5hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuXHRcdFx0LyogaWYgdGhlIHdvcmQgJ2luc3RhbmNlJyBpcyBwYXNzZWQsIHJldHVybiB0aGUgKGFscmVhZHkgY3JlYXRlZCkgd2lkZ2V0IHByb21pc2UgKi9cblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWApIH1cblxuXHRcdFx0LyogZWxzZSwgY3JlYXRlIGEgbmV3IHdpZGdldCBhbmQgc2V0IGEgcHJvbWlzZSB0byBpdCAqL1xuXHRcdFx0dmFyIG5ld1dpZGdldCA9IG5ldyBXaWRnZXQoVS5leHRlbmQob3B0aW9ucywgeyBlbGVtZW50OiB0aGlzIH0pKTtcblx0XHRcdHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCwgbmV3V2lkZ2V0LmNvbnN0cnVjdGVkKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb24gKi9cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHRcdC8qIHJldHVybiB0aGUgd2lkZ2V0IGFydGVmYWN0IGNsYXNzICovXG5cdFx0cmV0dXJuIFdpZGdldDtcblxuXHR9XG5cblx0cmV0dXJuIGFteVdpZGdldDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3dpZGdldC5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2JhY29uJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdkZWx0YS1qcycgXSwgZnVuY3Rpb24gKFAsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGFscmVhZHkgY2FjaGVkPyAqL1xuXHRpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwpIHsgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsIH1cblxuXG5cdC8qIHRlbGwgZGVsdGEuanMgYWJvdXQgYmx1ZWJpcmQgKi9cblx0RE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcblxuXG5cdC8qIHNldCB0aGUgY2FjaGUgKi9cblx0d2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgPSBuZXcgRE0oKTtcblxuXG5cdC8qIHJldHVybiB0aGUgZGVsdGEgbW9kZWwgdGhhdCBtYW5hZ2VzIGFsbCBwbHVnaW5zICg9IGRlbHRhcykgKi9cblx0cmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL21pc2MuanMnLFxuXHQnLi9iYWNvbi1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL3VuaXF1ZS1pZC5qcycsXG5cdCcuL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgQmFjb25TaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAZXhwb3J0IEBjbGFzcyBBcnRlZmFjdCBAZXh0ZW5kcyBCYWNvblNpZ25hbEhhbmRsZXJ9XG5cdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggQmFjb24uanMuXG5cdCAqL1xuXHR2YXIgQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEJhY29uU2lnbmFsSGFuZGxlciwgZnVuY3Rpb24gQXJ0ZWZhY3Qoc3VwZXJGbiwgb3B0aW9ucykge1xuXHRcdHN1cGVyRm4oKTtcblxuXHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudH0gPSB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHNldCBoaWVyYXJjaHkgc3R1ZmYgKi9cblx0XHR0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuXHRcdHRoaXMuX3R5cGUgPSB0eXBlO1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHRcdGlmIChwYXJlbnQpIHsgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpIH1cblxuXHRcdC8qIGNyZWF0ZSBldmVudHMgKi9cblx0XHR0aGlzLm5ld0V2ZW50KCdkZXN0cm95Jyk7XG5cblx0fSwgLyoqIEBsZW5kcyBBcnRlZmFjdC5wcm90b3R5cGUgKi8ge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgcHJvdmlkZWQgdGhyb3VnaCB0aGUgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnMgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB1bmlxdWUgaWRlbnRpZmllciBiZWxvbmdpbmcgdG8gdGhpcyBhcnRlZmFjdFxuXHRcdCAqL1xuXHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdHlwZSBvZiB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgcGFyZW50IG9mIHRoaXMgYXJ0ZWZhY3QsIHVubGVzcyB0aGlzIGlzIHRoZSByb290XG5cdFx0ICovXG5cdFx0Z2V0IHBhcmVudCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IGNoaWxkcmVuKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIChwYXJlbnQsIHBhcmVudCdzIHBhcmVudCwgLi4uKVxuXHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gdHlwZSwgdW5sZXNzIHRoZXJlIGlzIG5vbmVcblx0XHQgKi9cblx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnQgKGNoaWxkcmVuLCBjaGlsZHJlbidzIGNoaWxkcmVuLCAuLi4pXG5cdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50cyBvZiB0aGUgZ2l2ZW4gdHlwZTsgbm9uZSBvZiB0aGVtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVzY2VuZGFudCBmcm9tIGFueSBvdGhlclxuXHRcdCAqL1xuXHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBJbmRpY2F0ZSB0aGF0IHRoaXMgYXJ0ZWZhY3Qgd2lsbCBuZXZlciBiZSB1c2VkIGFnYWluLCBhbGxvd2luZyBpdFxuXHRcdCAqIHRvIGRvIGFueSBuZWNlc3NhcnkgY2xlYW51cC5cblx0XHQgKi9cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmRlc3Ryb3koKSB9KTtcblx0XHR9XG5cblx0fSkpO1xuXG5cblx0LyoqIHtAZnVuY3Rpb24gQXJ0ZWZhY3QubmV3U3ViY2xhc3N9XG5cdCAqIEEgc3RhdGljIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1YmNsYXNzIG9mIHtAbGluayBBcnRlZmFjdH0uXG5cdCAqL1xuXHRBcnRlZmFjdC5uZXdTdWJjbGFzcyA9IGZ1bmN0aW9uIG5ld1N1YkNsYXNzKG5hbWUsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXHRcdHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKEFydGVmYWN0LCBmdW5jdGlvbiAoc3VwZXJGbiwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucyAqL1xuXHRcdFx0dmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0T2JqZWN0LmtleXMob3B0aW9uRGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRwcm9jZXNzZWRPcHRpb25zLnR5cGUgPSBuYW1lO1xuXG5cdFx0XHQvKiBjYWxsIHN1cGVyLWNvbnN0cnVjdG9yICovXG5cdFx0XHRzdXBlckZuKFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0LyogY2FsbCB0aGlzIGNvbnN0cnVjdG9yICovXG5cdFx0XHRjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0Z2V0IGNpcmN1aXRib2FyZCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcblx0XHRcdH1cblx0XHR9KSkpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEFydGVmYWN0O1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9hcnRlZmFjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdiYWNvbiddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24pIHtcblxuXG5cdC8qKiB7QGV4cG9ydH17QGNsYXNzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBCYWNvbi5qcy5cblx0ICovXG5cdHZhciBCYWNvblNpZ25hbEhhbmRsZXIgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEJhY29uU2lnbmFsSGFuZGxlcigpIHtcblxuXHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuXG5cdH0sIC8qKiBAbGVuZHMgQmFjb25TaWduYWxIYW5kbGVyLnByb3RvdHlwZSAqLyB7XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEZWNsYXJlcyBhIG5ldyBldmVudCBzdHJlYW0gZm9yIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICBuYW1lICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50LCB1c2VkIHRvIHRyaWdnZXIgb3Igc3Vic2NyaWJlIHRvIGl0XG5cdFx0ICogQHBhcmFtICB7QmFjb24uRXZlbnRTdHJlYW19IFtzb3VyY2VdIC0gYW5vdGhlciBldmVudCBzdHJlYW0gdG8gYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoaXMgZXZlbnRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLkJ1c30gLSB0aGUgY3JlYXRlZCBldmVudCBzdHJlYW1cblx0XHQgKi9cblx0XHRuZXdFdmVudChuYW1lLCB7c291cmNlfSA9IHt9KSB7XG5cdFx0XHQvKiBpcyB0aGUgZXZlbnQgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBldmVudCBzdHJlYW0gKi9cblx0XHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRpZiAoc291cmNlKSB7IGJ1cy5wbHVnKHNvdXJjZSkgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cy5uYW1lKG5hbWUpO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhbiBldmVudCBzdHJlYW0gYnkgbmFtZS4gSWYgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSBpcyBnaXZlbiwgYSBzdHJlYW1cblx0XHQgKiBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoYXQgcHJvcGVydHkgaXMgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7QmFjb24uRXZlbnRTdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiByZXR1cm4gaXQgKi9cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGxhemlseSBjcmVhdGVzIGFuZCByZXR1cm5zIHRoaXMgcHJvcGVydHksIHdpdGhcblx0XHQgKiBhbiBlbXB0eSB7QmFjb24uQnVzfSBhdCB0aGUgYmFzZS4gVGhpcyBhbGxvd3MgYSBwcm9wZXJ0eSB0byBiZSByZWZlcmVuY2VkXG5cdFx0ICogYmVmb3JlIGl0IGlzIGRlZmluZWQ6XG5cdFx0ICpcblx0XHQgKiAgICAgICAgICDilZTilZDilZDilZDilZDilZDilZcgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJAgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0XHQgKiAgICDii68g4rip4pSA4pSA4pSA4pWiIEJ1cyDilZ/ilIDilIDilIDilKQgLnRvUHJvcGVydHkoKSDilJzilIDilIDilIDilKQgLm5hbWUoIG5hbWUgKSDilIJcblx0XHQgKiAgICAgICAgICDilZrilZDilZDilZDilZDilZDilZ0gICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJggICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkge1xuXHRcdFx0LyogaWYgaXQgZG9lc24ndCBleGlzdCAqL1xuXHRcdFx0aWYgKCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdKSB7XG5cdFx0XHRcdC8qIGNyZWF0ZSBpdCBub3cgKi9cblx0XHRcdFx0dGhpcy5fcHJvcGVydHlCdXNzZXNbbmFtZV0gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSB0aGlzLl9wcm9wZXJ0eUJ1c3Nlc1tuYW1lXS50b1Byb3BlcnR5KCkubmFtZShuYW1lKTtcblxuXHRcdFx0XHQvKiBhbGxvdyBtb2RpZmllcnMgdG8gYmUgYWRkZWQgdG8gdGhlIHN0cmVhbSAqLyAvLyBUT0RPOiB0ZXN0XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0uYXBwZW5kTW9kaWZpZXIgPSBmdW5jdGlvbiAobW9kaWZpZXIsIC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXVttb2RpZmllcl0uYXBwbHkodGhpcy5fcHJvcGVydGllc1tuYW1lXSwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblxuXHRcdFx0LyogcmV0dXJuIGl0ICovXG5cdFx0XHRyZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgYWN0dWFsbHkgZGVmaW5lcyBhIHByb3BlcnR5IGJ5IGJhY2tpbmdcblx0XHQgKiBgcHJvcGVydHkobmFtZSlgIGJ1cyBhYm92ZSB3aXRoIHRoZSBmb2xsb3dpbmcgY29uc3RydWN0aW9uOlxuXHRcdCAqXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVreKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVrlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVreKUiOKUiOKUiOKUpCAucHVzaCggaW5pdGlhbCApIOKUilxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUij8gIOKVsOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVr1xuXHRcdCAqICAg4pWU4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWXICAgICAgICDilZTilZDilZDilafilZDilZDilZcgICAgICAgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHRcdCAqICAg4pWRIG9ic2VydmFibGUg4pWf4pSA4pSA4pSA4pev4rip4pSA4pSA4pSA4pWiIEJ1cyDilZ/ilIDilIDilIDilIDilIDilIDilIDilIDilKQgLnNraXBEdXBsaWNhdGVzKCBpc0VxdWFsICkg4pSc4pSA4pSA4pSA4pevIOKLr1xuXHRcdCAqICAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdICAgICAgICDilZrilZDilZDilaTilZDilZDilZ0gICAgICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUiiogIOKVreKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVrlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVsOKUiOKUiOKUiOKUpCAucHVzaCggbmV3VmFsdWUgKSDilIpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWw4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pWvXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEBwYXJhbSAge0JhY29uLk9ic2VydmFibGV9ICAgICAgICBbc291cmNlXSAgICAgICAgLSBhIHNvdXJjZSBzdHJlYW0gdG8gYXV0b21hdGljYWxseSBzZXQgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgICAgICAgICAgICBbc2V0dGFibGU9dHJ1ZV0gLSB3aGV0aGVyIHRoZSB2YWx1ZSBjYW4gYmUgbWFudWFsbHkgc2V0IChpZiBgc291cmNlYCBpcyBnaXZlbiwgZGVmYXVsdHMgdG8gZmFsc2UpXG5cdFx0ICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgICAgICAgICAgIFtpbml0aWFsXSAgICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgcHJvcGVydHlcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbigqLCopOkJvb2xlYW59ICAgW2lzRXF1YWxdICAgICAgIC0gYSBwcmVkaWNhdGUgZnVuY3Rpb24gYnkgd2hpY2ggdG8gdGVzdCBmb3IgZHVwbGljYXRlIHZhbHVlc1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uUHJvcGVydHl9IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRuZXdQcm9wZXJ0eShuYW1lLCB7c291cmNlLCBzZXR0YWJsZSwgaW5pdGlhbCwgaXNFcXVhbH0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgcHJvcGVydHkgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSB8fCAhdGhpcy5fcHJvcGVydGllc1tuYW1lXS5fYW15X3BsdWdnZWQsXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGluaXRpYWxpemUgdGhlIHB1YmxpYyBwcm9wZXJ0eSBhbmQgb3V0ZXIgYnVzLCBhbmQgbWFyayBpdCBhcyBwbHVnZ2VkICovXG5cdFx0XHR0aGlzLnByb3BlcnR5KG5hbWUpLl9hbXlfcGx1Z2dlZCA9IHRydWU7XG5cblx0XHRcdC8qIGludGVybmFsIGJ1cywgYWN0aW5nIGFzIGEgaHViIGZvciBhbGwgbmV3IHZhbHVlcyAqL1xuXHRcdFx0dmFyIGlubmVyQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0XHQvKiBpZiBhIHNvdXJjZSBpcyBnaXZlbiwgcGx1ZyBpdCBpbjsgaWYgbm90LCB0aGUgcHJvcGVydHkgYmVjb21lcyBtYW51YWxseSBzZXR0YWJsZSBieSBkZWZhdWx0ICovXG5cdFx0XHRpZiAoc291cmNlKSB7XG5cdFx0XHRcdGlubmVyQnVzLnBsdWcoc291cmNlKTtcblx0XHRcdH0gZWxzZSBpZiAoc2V0dGFibGUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdHNldHRhYmxlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0LyogY2FjaGluZyB0aGUgY3VycmVudCB2YWx1ZSAqL1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHQvKiBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBvYmplY3QgaW50ZXJmYWNlLCB3cml0YWJsZSB0aHJvdWdoIHRoZSBpbnRlcm5hbCBidXMgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBzZXR0YWJsZSA/IHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7IGlubmVyQnVzLnB1c2gobmV3VmFsdWUpIH1cblx0XHRcdH0gOiB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBmaW5pc2ggdXAgdGhlIHByb3BlcnR5IGZvciBwdWJsaWMgY29uc3VtcHRpb24gKi9cblx0XHRcdHZhciBpbm5lclByb3BlcnR5ID0gaW5uZXJCdXMuc2tpcER1cGxpY2F0ZXMoaXNFcXVhbCk7XG5cdFx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3Nlc1tuYW1lXS5wbHVnKGlubmVyUHJvcGVydHkpO1xuXG5cdFx0XHQvKiBrZWVwIG91ciB2YWx1ZSBpbiBzeW5jIHdpdGggdGhlIHN0cmVhbSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0eShuYW1lKS5vblZhbHVlKCh2KSA9PiB7IHZhbHVlID0gdiB9KTtcblxuXHRcdFx0LyogaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGluaXRpYWwpKSB7IGlubmVyQnVzLnB1c2goaW5pdGlhbCkgfVxuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFsbCBzdWJzY3JpYmVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gdHJpZ2dlclxuXHRcdCAqIEB2YWx1ZSB7Kn0gICAgICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBhdHRhY2ggdG8gdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlcihuYW1lLCB2YWx1ZSkge1xuXHRcdFx0LyogZG9lcyB0aGUgZXZlbnQgc3RyZWFtIGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0ucHVzaCh2YWx1ZSk7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNlbGVjdHMgYW4gZXhpc3Rpbmcgc3RyZWFtIG9yIHByb3BlcnR5LCBhbmQgdGhlblxuXHRcdCAqIGVpdGhlciByZXR1cm5zIGl0LCBvciBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHRvIGl0LCBkZXBlbmRpbmdcblx0XHQgKiBvbiB3aGV0aGVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQuXG5cdFx0ICpcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgb3IgcHJvcGVydHkgdG8gc3Vic2NyaWJlIHRvXG5cdFx0ICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgICBbZXhwZWN0ZWRWYWx1ZV0gICAgICAtIGlmIHByb3ZpZGVkLCBmaWx0ZXJzIHRoZSBzdHJlYW0gYnkgPT09IGVxdWFsaXR5IHdpdGggdGhpcyB2YWx1ZTtcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAtIGEgcGxhaW4gb2JqZWN0IGZvciBwcm92aWRpbmcgYWRkaXRpb25hbCBvcHRpb25zXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICBbb3B0aW9ucy5vbmNlPWZhbHNlXSAtIHdoZXRoZXIgdGhlIHN0cmVhbSBlbmRzIGFmdGVyIG9uZSBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6dm9pZH0gW2NhbGxiYWNrXSAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dm9pZH0gLSBpZiBubyBgY2FsbGJhY2tgIGlzIHByb3ZpZGVkLCB0aGUgc3BlY2lmaWVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHByb3BlcnR5OyBvdGhlcndpc2UsIGEgZnVuY3Rpb24gdG8gdW5zdWJzY3JpYmUgdG8gc2FpZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaXMgYSBzaG9ydGhhbmQgZm9yIHRoZSB7QGxpbmsgb259IG1ldGhvZCB3aXRoIHRoZSBgb25jZWAgb3B0aW9uIGVuYWJsZWQuXG5cdFx0ICogSW4gb3RoZXIgd29yZHMsIGFueSBzdHJlYW0gcmV0dXJuZWQgd2lsbCBzZW5kIG9ubHkgb25lIGV2ZW50LCBhbmQgYW55IGNhbGxiYWNrXG5cdFx0ICogcHJvdmlkZWQgd2lsbCBvbmx5IGZpcmUgb25jZS5cblx0XHQgKi9cblx0XHRvbmUobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhcmdzT2JqID0gdGhpcy5fZ2F0aGVyT25Bcmd1bWVudHMobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXHRcdFx0VS5vYmplY3QoYXJnc09iaiwgJ29wdGlvbnMnKS5vbmNlID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSBvciB7QGxpbmsgb25lfSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucy5vbmNlICovXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uY2UpIHsgcmVzdWx0ID0gcmVzdWx0LnRha2UoMSkgfVxuXG5cdFx0XHQvKiBwcm9jZXNzIGNhbGxiYWNrICovXG5cdFx0XHRpZiAoY2FsbGJhY2spIHsgcmVzdWx0ID0gcmVzdWx0Lm9uVmFsdWUoY2FsbGJhY2spIH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFByb2Nlc3MgdGhlIGFyZ3VtZW50cyBhY2NlcHRlZCBieSB7QGxpbmsgb259IGFuZCB7QGxpbmsgb25lfS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfZ2F0aGVyT25Bcmd1bWVudHMoLi4uYXJncykge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHsgbmFtZTogYXJncy5zaGlmdCgpIH07XG5cblx0XHRcdC8qIHRlc3QgZm9yIGV4cGVjdGVkIHZhbHVlIGFyZ3VtZW50ICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgIVUuaXNGdW5jdGlvbihhcmdzWzBdKSAmJiAhVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5leHBlY3RlZFZhbHVlID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBvcHRpb25zICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5vcHRpb25zID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBjYWxsYmFjayBmdW5jdGlvbiAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmIFUuaXNGdW5jdGlvbihhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gQmFjb25TaWduYWxIYW5kbGVyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9iYWNvbi1zaWduYWwtaGFuZGxlci5qc1xuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNpcmN1aXRib2FyZC5qcyJ9