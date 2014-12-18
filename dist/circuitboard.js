(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("delta-js"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "delta-js", "baconjs", "tweenjs", "bacon.model", "bacon.jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("delta-js"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery")) : factory(root["jQuery"], root["P"], root["DeltaModel"], root["Bacon"], root["TWEEN"], root["bacon.model"], root["bacon.jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, dm) {
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
	    $.circuitboard.Circuitboard = newWidgetType('Circuitboard', {
	      cssClass: "circuitboard",
	      filter: (function() {
	        return P.resolve(true);
	      })
	    });
	    $.circuitboard.Tilemap = newWidgetType('Tilemap', {cssClass: "tilemap"});
	    $.circuitboard.Tile = newWidgetType('Tile', {cssClass: 'tile'});
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, Artefact) {
	  'use strict';
	  function newWidgetType(typeName, optionDefaults) {
	    var Widget = Artefact.newSubclass(typeName, function Widget($__1) {
	      var cssClass = $__1.cssClass;
	      var $__0 = this;
	      if (U.isDefined(cssClass)) {
	        this.element.addClass(cssClass);
	      }
	      this.element.asEventStream('remove').onValue((function() {
	        $__0.destroy();
	      }));
	    }, {
	      get model() {
	        return this.options.model;
	      },
	      get element() {
	        return this.options.element;
	      }
	    }, U.extend({beforeConstruction: P.resolve()}, optionDefaults));
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
	  return newWidgetType;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  var U = {
	    newClass: function(constructor) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      constructor.prototype = prototype;
	      constructor.prototype.constructor = constructor;
	      return constructor;
	    },
	    newSubclass: function(superClass, constructorMaker) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var constructor = constructorMaker(superClass.prototype.constructor);
	      constructor.prototype = Object.create(superClass.prototype);
	      U.extend(constructor.prototype, prototype);
	      constructor.prototype.constructor = constructor;
	      return constructor;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(8), __webpack_require__(9), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm) {
	  'use strict';
	  var Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, (function(superFn) {
	    return function Artefact(options) {
	      superFn.apply(this, arguments);
	      this._options = options;
	      var $__1 = options,
	          id = $__1.id,
	          type = $__1.type,
	          parent = $__1.parent,
	          beforeConstruction = $__1.beforeConstruction;
	      this._id = id || uniqueID(type);
	      this._type = type;
	      this._parent = parent;
	      this._children = [];
	      if (parent) {
	        U.array(parent, '_children').push(this);
	      }
	      this.newEvent('destroy');
	      this.beforeConstruction(beforeConstruction);
	    };
	  }), {
	    beforeConstruction: function(possiblePromise) {
	      if (!possiblePromise || !$.isFunction(possiblePromise.then)) {
	        return;
	      }
	      if (!this.constructed) {
	        this.constructed = P.resolve(this);
	      }
	      this.constructed = this.constructed.tap((function() {
	        return P.resolve(possiblePromise);
	      }));
	    },
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
	    return dm.vp(name, U.newSubclass(Artefact, (function(superFn) {
	      return function() {
	        var options = arguments[0] !== (void 0) ? arguments[0] : {};
	        var $__0 = this;
	        var processedOptions = options;
	        Object.keys(optionDefaults).forEach((function(key) {
	          if (U.isUndefined(processedOptions[key])) {
	            processedOptions[key] = optionDefaults[key];
	          }
	        }));
	        processedOptions.type = name;
	        superFn.call(this, U.extend(options, processedOptions));
	        constructor.call(this, processedOptions);
	        if (this.constructed) {
	          this.constructed.then((function() {
	            if ($.isFunction($__0.construct)) {
	              $__0.beforeConstruction($__0.construct(options));
	            }
	          }));
	        } else if ($.isFunction(this.construct)) {
	          this.beforeConstruction(this.construct(options));
	        }
	      };
	    }), U.extend({}, prototype, {get circuitboard() {
	        if (!this._circuitboard) {
	          this._circuitboard = this.closestAncestorByType('Circuitboard');
	        }
	        return this._circuitboard;
	      }})));
	  };
	  return Artefact;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
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
	      return this._properties[name];
	    },
	    p: function(name) {
	      return this._properties[name];
	    },
	    newProperty: function(name) {
	      var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
	          settable = $__1.settable,
	          initial = $__1.initial,
	          isEqual = $__1.isEqual;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      if (U.isUndefined(settable)) {
	        settable = true;
	      }
	      var property = this._properties[name] = new Bacon.Model(initial, {isEqual: isEqual});
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      return property;
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(11), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(13);
	  __webpack_require__(14);
	  Bacon.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Bacon.fromBinder((function(sink) {
	      obj.on(eventName, (function(v) {
	        sink(new Bacon.Next(v));
	      }));
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Bacon.animationFrames = function animationFrames() {
	    return Bacon.fromBinder((function(sink) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          if (sink() === Bacon.noMore) {
	            subscribed = false;
	          }
	          if (subscribed) {
	            iterationFn();
	          }
	        }));
	      })();
	      return (function() {
	        subscribed = false;
	      });
	    }));
	  };
	  Bacon.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = new Bacon.Bus();
	    var addStream = ((function() {
	      var chainedStreams = 0;
	      return (function(stream) {
	        chainedStreams += 1;
	        bus.plug(stream);
	        stream.onEnd((function() {
	          chainedStreams -= 1;
	          if (chainedStreams === 0) {
	            bus.end();
	          }
	        }));
	      });
	    }))();
	    addStream(Bacon.fromBinder((function(sink) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        var $__0 = this;
	        sink(new Bacon.Next((function() {
	          return $__0;
	        })));
	      });
	      tw.onComplete((function() {
	        sink(new Bacon.End());
	      }));
	    })));
	    bus.tween = tw;
	    bus.start = (function() {
	      tw.start();
	      return bus;
	    });
	    bus.chain = (function(other) {
	      addStream(other);
	      tw.chain(other.tween);
	      return bus;
	    });
	    return bus;
	  };
	  Bacon.keyPress = function keyPress(keycode) {
	    return $(window).asEventStream('keypress').filter((function(e) {
	      return e.keyCode === keycode;
	    }));
	  };
	  Bacon.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = new Bacon.Bus();
	    var open = new Bacon.Bus();
	    var close = new Bacon.Bus();
	    pacing.filter(wantedBus.toProperty(false)).onValue(handler, (function() {
	      open.push();
	      wantedBus.push(false);
	      close.push();
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.map(true));
	      return close.startWith(true).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntil(open).reduce([], accumulator).flatMap(Bacon.fromArray);
	      }));
	    };
	  };
	  Bacon.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Bacon.EventStream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Bacon.fromBinder((function(sink) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(new Bacon.Next((function() {
	          return value;
	        })));
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          sink(oldBuffer);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Bacon.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Bacon.Observable.prototype.run = function() {
	    return this.subscribe((function() {}));
	  };
	  Bacon.EventStream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Bacon.EventStream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        stream = stream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return stream.takeUntil($(document).asEventStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asEventStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        untilStream = untilStream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return $(document).asEventStream('mouseup').take(1).takeUntil(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asEventStream('mousewheel DOMMouseScroll');
	  };
	  return Bacon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYzk4YWE5MDQyYTA5ZDgwNzFjYSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYXJ0ZWZhY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tc2lnbmFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLi91dGlsL2JhY29uLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLm1vZGVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsR0FBRyxjQUFZLENBQUcsR0FBRyxHQUFDO0FBQ3JDLGNBQVcsQ0FBQztBQUlaLFVBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRyxlQUFhLENBQUMsQ0FBRyxFQUNyQyxNQUFLLENBQUwsVUFBTyxpQkFBZ0IsQ0FBRztBQUN6QixVQUFJLGVBQWUsQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFHO0FBRXZDLGNBQU8sSUFBSSxHQUFDLE1BQU8sQ0FBQyxpQkFBZ0IsS0FBSyxDQUFHLGtCQUFnQixDQUFDLENBQUM7T0FDL0QsS0FBTztBQUVOLFVBQUMsT0FBTyxNQUFPLENBQUMsRUFBQyxDQUFHLGtCQUFnQixDQUFDLENBQUM7QUFDdEMsMkJBQW1CLEVBQUMsQ0FBQztPQUN0QjtBQUFBLEtB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RUFBQyxDQUFDLElBQUcsQ0FBQyxjQUFlLENBQUMsV0FBVSxDQUFDLFFBQVMsRUFBQyxTQUFDLGNBQWE7QUFDM0QscUJBQVUsRUFBSSxFQUFDLENBQUMsUUFBTyxDQUFDLGNBQWUsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQUN4RCxVQUFJLFNBQVEsQ0FBRztBQUNWLG1CQUFNLEVBQUksTUFBSSxDQUFDO0FBQ25CLG1CQUFVLEVBQUksWUFBVSxPQUFRLEVBQUMsU0FBQyxjQUFhLENBQU07QUFDcEQsY0FBSSxPQUFNLENBQUc7QUFBRSxrQkFBTyxLQUFHO1dBQUU7QUFDdkIsZ0JBQUMsRUFBSSxlQUFhLE1BQU0sRUFBSSxlQUFhLE1BQU0sQ0FBQztBQUNoRCxnQkFBQyxFQUFJLGVBQWEsTUFBTSxFQUFJLGVBQWEsTUFBTSxDQUFDO0FBQ3BELGNBQUksRUFBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxFQUFJLFVBQVEsRUFBSSxVQUFRLENBQUc7QUFBRSxrQkFBTyxRQUFNLEVBQUksS0FBRztXQUFFO0FBQ3ZFLGdCQUFPLE1BQUksQ0FBQztTQUNiLEVBQUMsQ0FBQztPQUNIO0FBQ0EsWUFBTyxFQUFDLENBQUMsUUFBTyxDQUFDLGNBQWUsQ0FBQyxTQUFRLENBQUMsS0FBTSxDQUFDLEVBQUMsVUFBVyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0tBQzNFLEVBQUMsQ0FBQztHQUNILENBQUM7QUFHRCxNQUFHLFdBQVcsRUFBSSxTQUFTLFdBQVMsQ0FBRSxDQUFFO0FBQ3ZDLFVBQU8sRUFBQyxDQUFDLElBQUcsQ0FBQyxjQUFlLENBQUMsMkJBQTBCLENBQUMsQ0FBQztHQUMxRCxDQUFDO0FBR0QsUUFBTyxNQUFJLENBQUM7QUFHYixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUMvT0EsaUQ7Ozs7OztBQ0FBLGlEOzs7Ozs7QUNBQSxpRDs7Ozs7O0FDQUEsaUQiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpLCByZXF1aXJlKFwiYmFjb25qc1wiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJiYWNvbi5tb2RlbFwiKSwgcmVxdWlyZShcImJhY29uLmpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImRlbHRhLWpzXCIsIFwiYmFjb25qc1wiLCBcInR3ZWVuanNcIiwgXCJiYWNvbi5tb2RlbFwiLCBcImJhY29uLmpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSwgcmVxdWlyZShcImJhY29uanNcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiYmFjb24ubW9kZWxcIiksIHJlcXVpcmUoXCJiYWNvbi5qcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkRlbHRhTW9kZWxcIl0sIHJvb3RbXCJCYWNvblwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wiYmFjb24ubW9kZWxcIl0sIHJvb3RbXCJiYWNvbi5qcXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmM5OGFhOTA0MmEwOWQ4MDcxY2FcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vdXRpbC93aWRnZXQuanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgbmV3V2lkZ2V0VHlwZSwgVSwgZG0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogYWxsb3cgJyQuY2lyY3VpdGJvYXJkJyB0byBhY2NlcHQgcGx1Z2lucyAqL1xuXHRVLmV4dGVuZChVLm9iamVjdCgkLCAnY2lyY3VpdGJvYXJkJyksIHtcblx0XHRwbHVnaW4ocGx1Z2luT3JTZWxlY3Rpb24pIHtcblx0XHRcdGlmICgkLmlzUGxhaW5PYmplY3QocGx1Z2luT3JTZWxlY3Rpb24pKSB7XG5cdFx0XHRcdC8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlZ2lzdGVyIGEgbmV3IHBsdWdpblxuXHRcdFx0XHRyZXR1cm4gbmV3IGRtLkRlbHRhKHBsdWdpbk9yU2VsZWN0aW9uLm5hbWUsIHBsdWdpbk9yU2VsZWN0aW9uKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHNlbGVjdCBwbHVnaW5zIHRvIGJlIGFwcGxpZWRcblx0XHRcdFx0ZG0uc2VsZWN0LmFwcGx5KGRtLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHRcdGRlZmluZVdpZGdldENsYXNzZXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cblx0LyogdG8gZGVmaW5lIHRoZSB3aWRnZXQgY2xhc3NlcyBhZnRlciB0aGUgcHJvcGVyIHBsdWdpbnMgaGF2ZSBiZWVuIHNlbGVjdGVkICovXG5cdGZ1bmN0aW9uIGRlZmluZVdpZGdldENsYXNzZXMoKSB7XG5cblx0XHQkLmNpcmN1aXRib2FyZC5DaXJjdWl0Ym9hcmQgPVxuXHRcdFx0XHRuZXdXaWRnZXRUeXBlKCdDaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRcdFx0Y3NzQ2xhc3M6IFwiY2lyY3VpdGJvYXJkXCIsXG5cdFx0XHRcdFx0ZmlsdGVyOiAoKSA9PiBQLnJlc29sdmUodHJ1ZSkgLy8gZG9uJ3QgaGlkZSBhbnkgZW50aXRpZXNcblx0XHRcdFx0fSk7XG5cblx0XHQkLmNpcmN1aXRib2FyZC5UaWxlbWFwID1cblx0XHRcdFx0bmV3V2lkZ2V0VHlwZSgnVGlsZW1hcCcsIHtcblx0XHRcdFx0XHRjc3NDbGFzczogXCJ0aWxlbWFwXCJcblx0XHRcdFx0fSk7XG5cblx0XHQkLmNpcmN1aXRib2FyZC5UaWxlID1cblx0XHRcdFx0bmV3V2lkZ2V0VHlwZSgnVGlsZScsIHtcblx0XHRcdFx0XHRjc3NDbGFzczogJ3RpbGUnXG5cdFx0XHRcdH0pO1xuXG5cdH1cblxuXG5cdC8qIGZvciByZXRyaWV2YWwgb2YgY2VydGFpbiBvYmplY3RzICovXG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbi5ncmFwaCA9ICgpID0+IGRtLmdyYXBoKCk7XG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbi5kbSA9IGRtO1xuXG5cblx0LyogIHJldHVybiB0aGUgc3RhdGljIGAkLmNpcmN1aXRib2FyZGAgb2JqZWN0LCAgICAgICAgICovXG5cdC8qICB0aHJvdWdoIHdoaWNoIHBsdWdpbnMgY2FuIGJlIGFwcGxpZWQgYW5kIHNlbGVjdGVkICAqL1xuXHRyZXR1cm4gJC5jaXJjdWl0Ym9hcmQ7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2NpcmN1aXRib2FyZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJywgJy4vYXJ0ZWZhY3QuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUsIEFydGVmYWN0KSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qICBhIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbiBhcGluYXRvbXkgY29tcG9uZW50ICh3aWRnZXQpICAgICAgICAgICovXG5cdC8qICBhcyBhIGpRdWVyeSBlbGVtZW50IHBsdWdpbjsgdGhpcyBpcyByZXR1cm5lZCBmcm9tIHRoZSBtb2R1bGUgICovXG5cdGZ1bmN0aW9uIG5ld1dpZGdldFR5cGUodHlwZU5hbWUsIG9wdGlvbkRlZmF1bHRzKSB7XG5cblx0XHQvKiB0aGUgc3BlY2lmaWMgd2lkZ2V0IGNsYXNzICovXG5cdFx0dmFyIFdpZGdldCA9IEFydGVmYWN0Lm5ld1N1YmNsYXNzKHR5cGVOYW1lLCBmdW5jdGlvbiBXaWRnZXQoe2Nzc0NsYXNzfSkge1xuXG5cdFx0XHQvKiBzZXQgdGhlIGVsZW1lbnQgQ1NTIGNsYXNzICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoY3NzQ2xhc3MpKSB7IHRoaXMuZWxlbWVudC5hZGRDbGFzcyhjc3NDbGFzcykgfVxuXG5cdFx0XHQvKiBpZiB0aGUganF1ZXJ5IGVsZW1lbnQgaXMgcmVtb3ZlZCwgZGVzdHJveSB0aGUgYXJ0ZWZhY3QgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5hc0V2ZW50U3RyZWFtKCdyZW1vdmUnKS5vblZhbHVlKCgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSk7XG5cblx0XHR9LCB7XG5cblx0XHRcdGdldCBtb2RlbCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tb2RlbCB9LFxuXG5cdFx0XHRnZXQgZWxlbWVudCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5lbGVtZW50IH1cblxuXHRcdH0sIFUuZXh0ZW5kKHtcblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbjogUC5yZXNvbHZlKCkgLy8gZ3VhcmFudGVlIGFsbCB3aWRnZXQgY29uc3RydWN0aW9uIHRvIGJlIGFzeW5jaHJvbm91c1xuXHRcdH0sIG9wdGlvbkRlZmF1bHRzKSk7XG5cblx0XHQvKiBjcmVhdGUgYSBsb3dlcmNhc2UgbmFtZSBmb3IgdGhpcyB3aWRnZXQgdHlwZSAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gdHlwZU5hbWVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGVOYW1lLnNsaWNlKDEpO1xuXG5cdFx0LyogalF1ZXJ5IHBsdWdpbjogdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiAgKi9cblx0XHQkLmZuW2xvd2VyY2FzZU5hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuXHRcdFx0LyogaWYgdGhlIHdvcmQgJ2luc3RhbmNlJyBpcyBwYXNzZWQsIHJldHVybiB0aGUgKGFscmVhZHkgY3JlYXRlZCkgd2lkZ2V0IHByb21pc2UgKi9cblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWApIH1cblxuXHRcdFx0LyogZWxzZSwgY3JlYXRlIGEgbmV3IHdpZGdldCBhbmQgc2V0IGEgcHJvbWlzZSB0byBpdCAqL1xuXHRcdFx0dmFyIG5ld1dpZGdldCA9IG5ldyBXaWRnZXQoVS5leHRlbmQob3B0aW9ucywgeyBlbGVtZW50OiB0aGlzIH0pKTtcblx0XHRcdHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCwgbmV3V2lkZ2V0LmNvbnN0cnVjdGVkKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb24gKi9cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHRcdC8qIHJldHVybiB0aGUgd2lkZ2V0IGFydGVmYWN0IGNsYXNzICovXG5cdFx0cmV0dXJuIFdpZGdldDtcblxuXHR9XG5cblxuXHQvKiBleHBvc2UgdGhlIHdpZGdldCBjbGFzcyBjcmVhdG9yIGZ1bmN0aW9uICovXG5cdHJldHVybiBuZXdXaWRnZXRUeXBlO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC93aWRnZXQuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGl0cyBmaXJzdCBhcmd1bWVudFxuXHRcdGlkKHYpIHsgcmV0dXJuIHYgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBkZWZpbmVkLCBnaXZlIGl0IGEgZGVmYXVsdCB2YWx1ZSBmaXJzdDsgaWYgdGhlIGdpdmVuIHZhbHVlXG5cdFx0Ly8gaXMgYSBmdW5jdGlvbiwgaXQgaXMgY2FsbGVkLCBhbmQgaXRzIHJlc3VsdCBpcyB1c2VkXG5cdFx0Z2V0RGVmKG9iaiwgbmFtZSwgdmFsdWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlKCkgfVxuXHRcdFx0XHRvYmpbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pIH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSkgfSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRmaW5kSW5kZXgoYXJyYXksIHByZWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkgeyByZXR1cm4gaSB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblxuXHRcdC8vIHRoaXMgYG1lbW9pemVgIGZ1bmN0aW9uIGlzIFNMT1csIGFzIGl0IHVzZXMgbGluZWFyIHNlYXJjaFxuXHRcdG1lbW9pemUoZm4pIHtcblx0XHRcdHZhciBrZXlzID0gW107XG5cdFx0XHR2YXIgY2FjaGUgPSBbXTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBjaGVjayB0aGUgY2FjaGUgKi9cblx0XHRcdFx0dmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGtleSkgPT4ga2V5LmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcmdzW2ldKSk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7IHJldHVybiBjYWNoZVtpbmRleF0gfVxuXG5cdFx0XHRcdC8qIG5vIGNhY2hlIGhpdDsgY29tcHV0ZSB2YWx1ZSwgc3RvcmUgYW5kIHJldHVybiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGtleXMucHVzaChhcmdzKTtcblx0XHRcdFx0Y2FjaGUucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIHNvcnRPZkVxdWFsID0gKGEsIGIpID0+IChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2RlbHRhLWpzJyBdLCBmdW5jdGlvbiAoUCwgRE0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogYWxyZWFkeSBjYWNoZWQ/ICovXG5cdGlmICh3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCkgeyByZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgfVxuXG5cblx0LyogdGVsbCBkZWx0YS5qcyBhYm91dCBibHVlYmlyZCAqL1xuXHRETS5yZWdpc3RlclByb21pc2VSZXNvbHZlcihQLnJlc29sdmUpO1xuXG5cblx0Lyogc2V0IHRoZSBjYWNoZSAqL1xuXHR3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCA9IG5ldyBETSgpO1xuXG5cblx0LyogcmV0dXJuIHRoZSBkZWx0YSBtb2RlbCB0aGF0IG1hbmFnZXMgYWxsIHBsdWdpbnMgKD0gZGVsdGFzKSAqL1xuXHRyZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWw7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL21pc2MuanMnLFxuXHQnLi9iYWNvbi1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL3VuaXF1ZS1pZC5qcycsXG5cdCcuL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgQmFjb25TaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAZXhwb3J0IEBjbGFzcyBBcnRlZmFjdCBAZXh0ZW5kcyBCYWNvblNpZ25hbEhhbmRsZXJ9XG5cdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggQmFjb24uanMuXG5cdCAqXG5cdCAqIFVzZXJzIGNhbiBwYXNzIGEgcHJvbWlzZSB0aHJvdWdoIHRoZSAnYmVmb3JlQ29uc3RydWN0aW9uJyBvcHRpb24uIElmIGRvbmUsIHRoZVxuXHQgKiBhcnRlZmFjdCB3YWl0cyBvbiB0aGF0IHByb21pc2UgYmVmb3JlIGNhbGxpbmcgaXRzICdjb25zdHJ1Y3QnIG1ldGhvZC5cblx0ICogU2ltaWxhcmx5LCB1c2VycyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBjbGFzcyBzaG91bGQgdGVzdCB0aGUgJ2NvbnN0cnVjdGVkJyBwcm9wZXJ0eS5cblx0ICogSWYgaXQgaXMgZGVmaW5lZCwgaXQgaXMgYSBwcm9taXNlIHRoYXQgaGFzIHRvIGJlIHdhaXRlZCBmb3IuXG5cdCAqIElmIG5vdCwgdGhlIG9iamVjdCBpbnN0YW5jZSBjYW4gYmUgdXNlZCBzeW5jaHJvbm91c2x5IGFmdGVyIGNvbnN0cnVjdGlvbi5cblx0ICovXG5cdHZhciBBcnRlZmFjdCA9IGRtLnZwKCdBcnRlZmFjdCcsIFUubmV3U3ViY2xhc3MoQmFjb25TaWduYWxIYW5kbGVyLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXJ0ZWZhY3Qob3B0aW9ucykge1xuXHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudCwgYmVmb3JlQ29uc3RydWN0aW9ufSA9IG9wdGlvbnM7XG5cblx0XHQvKiBzZXQgaGllcmFyY2h5IHN0dWZmICovXG5cdFx0dGhpcy5faWQgPSBpZCB8fCB1bmlxdWVJRCh0eXBlKTtcblx0XHR0aGlzLl90eXBlID0gdHlwZTtcblx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5fY2hpbGRyZW4gPSBbXTtcblx0XHRpZiAocGFyZW50KSB7IFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKSB9XG5cblx0XHQvKiBjcmVhdGUgZXZlbnRzICovXG5cdFx0dGhpcy5uZXdFdmVudCgnZGVzdHJveScpO1xuXG5cdFx0LyogcG9zc2libHkgd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/ICovXG5cdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24oYmVmb3JlQ29uc3RydWN0aW9uKTtcblxuXHR9LCAvKiogQGxlbmRzIEFydGVmYWN0LnByb3RvdHlwZSAqLyB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQWxsb3cgYSBwcm9taXNlIHRvIGJlIGluc2VydGVkIG9uIHdoaWNoIHRoZSByZXN0IG9mIGNvbnN0cnVjdGlvbiBzaG91bGQgd2FpdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBwb3NzaWJsZVByb21pc2Ugeyp9ICAtIGEgdmFsdWUgdGhhdCBtaWdodCBiZSBhIHByb21pc2Vcblx0XHQgKi9cblx0XHRiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cblx0XHRcdC8qIGlmIG5vIHByb21pc2UgaXMgcGFzc2VkIGluLCBpZ25vcmUsIHRvIGtlZXAgY29uc3RydWN0aW9uIHN5bmNocm9ub3VzICovXG5cdFx0XHRpZiAoIXBvc3NpYmxlUHJvbWlzZSB8fCAhJC5pc0Z1bmN0aW9uKHBvc3NpYmxlUHJvbWlzZS50aGVuKSkgeyByZXR1cm4gfVxuXG5cdFx0XHQvKiBpZiB0aGlzIGlzIHRoZSBmaXJzdCBwcm9taXNlIHBhc3NlZCBpbiwgaW5pdGlhbGl6ZSAndGhpcy5jb25zdHJ1Y3RlZCcgKi9cblx0XHRcdGlmICghdGhpcy5jb25zdHJ1Y3RlZCkgeyB0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKHRoaXMpIH1cblxuXHRcdFx0LyogaW5zZXJ0IHRoZSBuZXcgcHJvbWlzZSBpbnRvIHRoZSBjaGFpbiBmb3IgJ3RoaXMuY29uc3RydWN0ZWQnIHJlc29sdXRpb24gKi9cblx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkLnRhcCgoKSA9PiBQLnJlc29sdmUocG9zc2libGVQcm9taXNlKSk7XG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgcHJvdmlkZWQgdGhyb3VnaCB0aGUgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnMgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB1bmlxdWUgaWRlbnRpZmllciBiZWxvbmdpbmcgdG8gdGhpcyBhcnRlZmFjdFxuXHRcdCAqL1xuXHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdHlwZSBvZiB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgcGFyZW50IG9mIHRoaXMgYXJ0ZWZhY3QsIHVubGVzcyB0aGlzIGlzIHRoZSByb290XG5cdFx0ICovXG5cdFx0Z2V0IHBhcmVudCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IGNoaWxkcmVuKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIChwYXJlbnQsIHBhcmVudCdzIHBhcmVudCwgLi4uKVxuXHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gdHlwZSwgdW5sZXNzIHRoZXJlIGlzIG5vbmVcblx0XHQgKi9cblx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnQgKGNoaWxkcmVuLCBjaGlsZHJlbidzIGNoaWxkcmVuLCAuLi4pXG5cdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50cyBvZiB0aGUgZ2l2ZW4gdHlwZTsgbm9uZSBvZiB0aGVtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVzY2VuZGFudCBmcm9tIGFueSBvdGhlclxuXHRcdCAqL1xuXHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBJbmRpY2F0ZSB0aGF0IHRoaXMgYXJ0ZWZhY3Qgd2lsbCBuZXZlciBiZSB1c2VkIGFnYWluLCBhbGxvd2luZyBpdFxuXHRcdCAqIHRvIGRvIGFueSBuZWNlc3NhcnkgY2xlYW51cC5cblx0XHQgKi9cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmRlc3Ryb3koKSB9KTtcblx0XHR9XG5cblx0fSkpO1xuXG5cblx0LyoqIHtAZnVuY3Rpb24gQXJ0ZWZhY3QubmV3U3ViY2xhc3N9XG5cdCAqIEEgc3RhdGljIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1YmNsYXNzIG9mIHtAbGluayBBcnRlZmFjdH0uXG5cdCAqL1xuXHRBcnRlZmFjdC5uZXdTdWJjbGFzcyA9IGZ1bmN0aW9uIG5ld1N1YkNsYXNzKG5hbWUsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXHRcdHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKEFydGVmYWN0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHQvKiBwcm9jZXNzIG9wdGlvbnMgKi9cblx0XHRcdHZhciBwcm9jZXNzZWRPcHRpb25zID0gb3B0aW9ucztcblx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbkRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQocHJvY2Vzc2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdHByb2Nlc3NlZE9wdGlvbnNba2V5XSA9IG9wdGlvbkRlZmF1bHRzW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cHJvY2Vzc2VkT3B0aW9ucy50eXBlID0gbmFtZTtcblxuXHRcdFx0LyogY2FsbCBzdXBlci1jb25zdHJ1Y3RvciAqL1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0LyogY2FsbCB0aGlzIGNvbnN0cnVjdG9yICovXG5cdFx0XHRjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdFx0XHQvKiB0aGVuIHJ1biB0aGUgJ2NvbnN0cnVjdCcgbWV0aG9kICovXG5cdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3RlZCkgeyAvLyBjb25zdHJ1Y3QgYXN5bmNocm9ub3VzbHlcblx0XHRcdFx0dGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3Qob3B0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3Qob3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0Z2V0IGNpcmN1aXRib2FyZCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcblx0XHRcdH1cblx0XHR9KSkpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEFydGVmYWN0O1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9hcnRlZmFjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICcuL2JhY29uLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbikge1xuXG5cblx0LyoqIHtAZXhwb3J0fXtAY2xhc3MgQmFjb25TaWduYWxIYW5kbGVyfVxuXHQgKiBVc2UgdGhpcyBhcyBhIHN1YmNsYXNzIChvciBqdXN0IG1peCBpdCBpbikgdG8gcHJvdmlkZSBzdXBwb3J0IGZvclxuXHQgKiBldmVudHMgYW5kIG9ic2VydmFibGUgcHJvcGVydGllcyB0aHJvdWdoIEJhY29uLmpzLlxuXHQgKi9cblx0dmFyIEJhY29uU2lnbmFsSGFuZGxlciA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gQmFjb25TaWduYWxIYW5kbGVyKCkge1xuXG5cdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0dGhpcy5fcHJvcGVydGllcyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnR5QnVzc2VzID0ge307XG5cblx0fSwgLyoqIEBsZW5kcyBCYWNvblNpZ25hbEhhbmRsZXIucHJvdG90eXBlICovIHtcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIERlY2xhcmVzIGEgbmV3IGV2ZW50IHN0cmVhbSBmb3IgdGhpcyBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgIG5hbWUgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQsIHVzZWQgdG8gdHJpZ2dlciBvciBzdWJzY3JpYmUgdG8gaXRcblx0XHQgKiBAcGFyYW0gIHtCYWNvbi5FdmVudFN0cmVhbX0gW3NvdXJjZV0gLSBhbm90aGVyIGV2ZW50IHN0cmVhbSB0byBhdXRvbWF0aWNhbGx5IHRyaWdnZXIgdGhpcyBldmVudFxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uQnVzfSAtIHRoZSBjcmVhdGVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqL1xuXHRcdG5ld0V2ZW50KG5hbWUsIHtzb3VyY2V9ID0ge30pIHtcblxuXHRcdFx0LyogaXMgdGhlIGV2ZW50IG5hbWUgYWxyZWFkeSB0YWtlbj8gKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgZXZlbnQgc3RyZWFtICovXG5cdFx0XHR2YXIgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdFx0aWYgKHNvdXJjZSkgeyBidXMucGx1Zyhzb3VyY2UpIH1cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV0gPSBidXMubmFtZShuYW1lKTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhbiBldmVudCBzdHJlYW0gYnkgbmFtZS4gSWYgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSBpcyBnaXZlbiwgYSBzdHJlYW1cblx0XHQgKiBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoYXQgcHJvcGVydHkgaXMgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7QmFjb24uRXZlbnRTdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHJldHVybiBpdCAqL1xuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhIHByb3BlcnR5IGJ5IG5hbWUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Nb2RlbH0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cdFx0LyoqIEBhbGlhcyBwcm9wZXJ0eSAqL1xuXHRcdHAobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgZGVmaW5lcyBhIG5ldyBwcm9wZXJ0eSBvbiB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgIFtzZXR0YWJsZT10cnVlXSAtIHdoZXRoZXIgdGhlIHZhbHVlIGNhbiBiZSBtYW51YWxseSBzZXRcblx0XHQgKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICAgICAgICAgICAgW2luaXRpYWxdICAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9uKCosKik6Qm9vbGVhbn0gICBbaXNFcXVhbF0gICAgICAgLSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBieSB3aGljaCB0byB0ZXN0IGZvciBkdXBsaWNhdGUgdmFsdWVzXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Nb2RlbH0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0bmV3UHJvcGVydHkobmFtZSwge3NldHRhYmxlLCBpbml0aWFsLCBpc0VxdWFsfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBwcm9wZXJ0eSBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZhdWx0IHZhbHVlIGZvciAnc2V0dGFibGUnICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChzZXR0YWJsZSkpIHsgc2V0dGFibGUgPSB0cnVlIH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBCYWNvbi5Nb2RlbCB3aGljaCBzdG9yZXMgdGhlIHByb3BlcnR5ICovXG5cdFx0XHR2YXIgcHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gbmV3IEJhY29uLk1vZGVsKGluaXRpYWwsIHsgaXNFcXVhbCB9KTtcblxuXHRcdFx0LyogYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgb2JqZWN0IGludGVyZmFjZSAqL1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcblx0XHRcdFx0Z2V0OiBwcm9wZXJ0eS5nZXQsXG5cdFx0XHRcdHNldDogc2V0dGFibGUgPyBwcm9wZXJ0eS5zZXQgOiB1bmRlZmluZWRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHByb3BlcnR5ICovXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVHJpZ2dlciBhbiBldmVudCBmb3IgYWxsIHN1YnNjcmliZXJzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byB0cmlnZ2VyXG5cdFx0ICogQHZhbHVlIHsqfSAgICAgIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGF0dGFjaCB0byB0aGUgZXZlbnRcblx0XHQgKi9cblx0XHR0cmlnZ2VyKG5hbWUsIHZhbHVlKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IHN0cmVhbSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0ucHVzaCh2YWx1ZSk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2VsZWN0cyBhbiBleGlzdGluZyBzdHJlYW0gb3IgcHJvcGVydHksIGFuZCB0aGVuXG5cdFx0ICogZWl0aGVyIHJldHVybnMgaXQsIG9yIGNyZWF0ZXMgYSBzdWJzY3JpcHRpb24gdG8gaXQsIGRlcGVuZGluZ1xuXHRcdCAqIG9uIHdoZXRoZXIgYSBjYWxsYmFjayBpcyBwcm92aWRlZC5cblx0XHQgKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgbmFtZSAgICAgICAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgb3IgcHJvcGVydHkgdG8gc3Vic2NyaWJlIHRvXG5cdFx0ICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgICBbZXhwZWN0ZWRWYWx1ZV0gICAgICAgLSBpZiBwcm92aWRlZCwgZmlsdGVycyB0aGUgc3RyZWFtIGJ5ID09PSBlcXVhbGl0eSB3aXRoIHRoaXMgdmFsdWU7XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG1heSBub3QgYmUgYSBwbGFpbiBvYmplY3Rcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgIFtvcHRpb25zXSAgICAgICAgICAgICAtIGEgcGxhaW4gb2JqZWN0IGZvciBwcm92aWRpbmcgYWRkaXRpb25hbCBvcHRpb25zXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICBbb3B0aW9ucy5vbmNlPWZhbHNlXSAgLSB3aGV0aGVyIHRoZSBzdHJlYW0gZW5kcyBhZnRlciBvbmUgZXZlbnRcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9uKCopOnZvaWR9IFtjYWxsYmFja10gICAgICAgICAgICAtIGlmIHByb3ZpZGVkLCBzdWJzY3JpYmVzIHRvIHRoaXMgc3RyZWFtIHdpdGggdGhlIHRoaXMgY2FsbGJhY2tcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp1bmRlZmluZWR9IC0gaWYgbm8gYGNhbGxiYWNrYCBpcyBwcm92aWRlZCwgdGhlIHNwZWNpZmllZCBldmVudCBzdHJlYW1cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHByb3BlcnR5OyBvdGhlcndpc2UsIGEgZnVuY3Rpb24gdG8gdW5zdWJzY3JpYmUgdG8gc2FpZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtIG9yIHByb3BlcnR5XG5cdFx0ICovXG5cdFx0b24obmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhcmdzT2JqID0gdGhpcy5fZ2F0aGVyT25Bcmd1bWVudHMobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXHRcdFx0cmV0dXJuIHRoaXMuX29uKGFyZ3NPYmopO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpcyBhIHNob3J0aGFuZCBmb3IgdGhlIHtAbGluayBvbn0gbWV0aG9kIHdpdGggdGhlIGBvbmNlYCBvcHRpb24gZW5hYmxlZC5cblx0XHQgKiBJbiBvdGhlciB3b3JkcywgYW55IHN0cmVhbSByZXR1cm5lZCB3aWxsIHNlbmQgb25seSBvbmUgZXZlbnQsIGFuZCBhbnkgY2FsbGJhY2tcblx0XHQgKiBwcm92aWRlZCB3aWxsIG9ubHkgZmlyZSBvbmNlLlxuXHRcdCAqL1xuXHRcdG9uZShuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGFyZ3NPYmogPSB0aGlzLl9nYXRoZXJPbkFyZ3VtZW50cyhuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjayk7XG5cdFx0XHRVLm9iamVjdChhcmdzT2JqLCAnb3B0aW9ucycpLm9uY2UgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuX29uKGFyZ3NPYmopO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgZG9lcyB0aGUgbWFpbiB3b3JrIGZvciB7QGxpbmsgb259IG9yIHtAbGluayBvbmV9LCBidXQgYWNjZXB0c1xuXHRcdCAqIHRoZSBwYXJhbWV0ZXJzIGFzIG9uZSBvYmplY3QsIHNvIGl0IGRvZXNuJ3QgaGF2ZSB0byBkZWFsIHdpdGggcGFyYW1ldGVyIG9yZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uT2JzZXJ2YWJsZXxmdW5jdGlvbigpOnZvaWR9XG5cdFx0ICovXG5cdFx0X29uKHtuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFja30pIHtcblx0XHRcdC8qIGRvZXMgYW4gZXZlbnQgb3IgcHJvcGVydHkgYnkgdGhpcyBuYW1lIGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdIHx8IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50IG9yIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcHJvY2VzcyBuYW1lICovXG5cdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV07XG5cblx0XHRcdC8qIHByb2Nlc3MgZXhwZWN0ZWRWYWx1ZSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGV4cGVjdGVkVmFsdWUpKSB7IHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoKHYpID0+IHYgPT09IGV4cGVjdGVkVmFsdWUpIH1cblxuXHRcdFx0LyogcHJvY2VzcyBvcHRpb25zLm9uY2UgKi9cblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMub25jZSkgeyByZXN1bHQgPSByZXN1bHQudGFrZSgxKSB9XG5cblx0XHRcdC8qIHByb2Nlc3MgY2FsbGJhY2sgKi9cblx0XHRcdGlmIChjYWxsYmFjaykgeyByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjaykgfVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogUHJvY2VzcyB0aGUgYXJndW1lbnRzIGFjY2VwdGVkIGJ5IHtAbGluayBvbn0gYW5kIHtAbGluayBvbmV9LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdF9nYXRoZXJPbkFyZ3VtZW50cyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0geyBuYW1lOiBhcmdzLnNoaWZ0KCkgfTtcblxuXHRcdFx0LyogdGVzdCBmb3IgZXhwZWN0ZWQgdmFsdWUgYXJndW1lbnQgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiAhVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pICYmICFVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmV4cGVjdGVkVmFsdWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRlc3QgZm9yIG9wdGlvbnMgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRlc3QgZm9yIGNhbGxiYWNrIGZ1bmN0aW9uICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5jYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHR9KTtcblxuXG5cdHJldHVybiBCYWNvblNpZ25hbEhhbmRsZXI7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX25leHRJZCA9IDA7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xuXHRcdHJldHVybiBgJHtwcmVmaXh8fFwidW5pcXVlLWlkXCJ9LSR7X25leHRJZCsrfWA7XG5cdH07XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvdW5pcXVlLWlkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2JhY29uanMnLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24sIFRXRUVOKSB7XG5cblx0cmVxdWlyZSgnYmFjb24ubW9kZWwnKTtcblx0cmVxdWlyZSgnYmFjb24uanF1ZXJ5Jyk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEJhY29uLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCAodikgPT4geyBzaW5rKG5ldyBCYWNvbi5OZXh0KHYpKSB9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRCYWNvbi5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoc2luaygpID09PSBCYWNvbi5ub01vcmUpIHsgc3Vic2NyaWJlZCA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEJhY29uLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogYSBsb2NhbCBmdW5jdGlvbiB0byBwbHVnIGluIG90aGVyIHN0cmVhbXMsIGtlZXBpbmcgdHJhY2sgaW4gb3JkZXIgdG8gJ2VuZCcgdGhlIGJ1cyAqL1xuXHRcdHZhciBhZGRTdHJlYW0gPSAoKCkgPT4ge1xuXHRcdFx0dmFyIGNoYWluZWRTdHJlYW1zID0gMDtcblx0XHRcdHJldHVybiAoc3RyZWFtKSA9PiB7XG5cdFx0XHRcdGNoYWluZWRTdHJlYW1zICs9IDE7XG5cdFx0XHRcdGJ1cy5wbHVnKHN0cmVhbSk7XG5cdFx0XHRcdHN0cmVhbS5vbkVuZCgoKSA9PiB7XG5cdFx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgLT0gMTtcblx0XHRcdFx0XHRpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHsgYnVzLmVuZCgpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cblx0XHQvKiBtYWluIHN0cmVhbSAqL1xuXHRcdGFkZFN0cmVhbShCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRpZiAoZWFzaW5nKSB7IHR3LmVhc2luZyhlYXNpbmcpIH1cblx0XHRcdGlmIChkZWxheSkgIHsgdHcuZGVsYXkoZGVsYXkpIH1cblx0XHRcdHR3Lm9uVXBkYXRlKGZ1bmN0aW9uICgpIHsgc2luayhuZXcgQmFjb24uTmV4dCgoKSA9PiB0aGlzKSkgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKCgpID0+IHsgc2luayhuZXcgQmFjb24uRW5kKCkpIH0pO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0QmFjb24ua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXljb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXljb2RlKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0QmFjb24ubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgb3BlbiA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgY2xvc2UgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyKHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZShoYW5kbGVyLCAoKSA9PiB7XG5cdFx0XHRvcGVuLnB1c2goKTtcblx0XHRcdHdhbnRlZEJ1cy5wdXNoKGZhbHNlKTtcblx0XHRcdGNsb3NlLnB1c2goKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwKHRydWUpKTtcblx0XHRcdHJldHVybiBjbG9zZS5zdGFydFdpdGgodHJ1ZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbChvcGVuKS5yZWR1Y2UoW10sIGFjY3VtdWxhdG9yKS5mbGF0TWFwKEJhY29uLmZyb21BcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoaXMgcmVzdHJpY3RzIGEgZ2l2ZW4gc3RyZWFtIHRvIGEgd3JhcHBlciBzdHJlYW0gY3JlYXRlZCB3aXRoIHRoZSBtZXRob2QgYWJvdmUuXG5cdC8vIEFsbCBpdHMgb3JpZ2luYWwgZXZlbnRzIGFyZSBub3cgZmlyZWQgaW5zaWRlIHRoZSBwcm92aWRlZCB3aW5kb3cuIFNldCBgb3B0aW9ucy5idWZmZXJgXG5cdC8vIHRvIGB0cnVlYCBpZiBhbGwgaXRzIGV2ZW50cyBzaG91bGQgYmUgYnVmZmVyZWQgYW5kIHJlbGVhc2VkIGluc2lkZSB0aGUgbmV4dCB3aW5kb3cuXG5cdC8vIE90aGVyd2lzZSwgb25seSB0aGUgbGFzdCBldmVudCBpcyByZXRhaW5lZC5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIFRoaXMgaXMgYSBjaGVhcCB2ZXJzaW9uIG9mIHRoZSBsaW1pdGVyIGRlZmluZWQgYWJvdmUuIFRPRE86IHVzZSB0aGUgbGltaXRlciB3aGVyZSB0aGlzIGlzIG5vdyB1c2VkXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2gobmV3IEJhY29uLk5leHQoKCkgPT4gdmFsdWUpKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG5cdFx0XHRcdFx0YnVmZmVyID0gW107XG5cdFx0XHRcdFx0c2luayhvbGRCdWZmZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnN1YnNjcmliZSgoKT0+e30pO1xuXHR9O1xuXG5cdC8vIFRoaXMgaXMgYSAnc21hcnQnIC5zdG9wUHJvcGFnYXRpb24sIG1hcmtpbmcgZXZlbnRzIHdpdGggYSBsYWJlbFxuXHQvLyBhbmQgc2tpcHBpbmcgdGhvc2UgdGhhdCBhbHJlYWR5IGhhdmUgdGhhdCBsYWJlbC5cblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbiAoYnV0dG9uSWQpIHtcblx0XHR2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6IChiID0+IGIgPT09IGJ1dHRvbklkKTtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoZSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsKCQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKSlcblx0XHRcdFx0XHQubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWwodW50aWxTdHJlYW0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gQmFjb247XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2JhY29uLWFuZC1lZ2dzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzExX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24ubW9kZWxcIlxuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTRfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiY2lyY3VpdGJvYXJkLmpzIn0=