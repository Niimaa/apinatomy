(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("delta-js"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "delta-js", "baconjs", "tweenjs", "bacon.model", "bacon.jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("delta-js"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery")) : factory(root["jQuery"], root["P"], root["DeltaModel"], root["Bacon"], root["TWEEN"], root["bacon.model"], root["bacon.jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, SnapshotP) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'snapshot',
	    requires: ['core']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var Snapshot = SnapshotP.value();
	    var circuitboard = this;
	    this.Snapshot = U.newSubclass(Snapshot, (function(superFn) {
	      return function(options) {
	        superFn.call(this, U.extend({}, options, {parent: circuitboard}));
	      };
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, ArtefactP, U) {
	  'use strict';
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_Snapshot)) {
	      return window._amy_Snapshot;
	    }
	    window._amy_Snapshot = Artefact.newSubclass('Snapshot', function Snapshot() {
	      this.object = {};
	    }, {
	      set: function(key, value) {
	        U.assert(U.isUndefined(this.object[key]), ("The key '" + key + "' already has a value in this snapshot."));
	        this.object[key] = value;
	      },
	      get: function(key) {
	        return this.object[key];
	      },
	      serialize: function() {
	        return JSON.stringify(this.object);
	      },
	      deserialize: function(str) {
	        this.object = JSON.parse(str);
	      },
	      take: function() {},
	      restore: function() {}
	    });
	    return window._amy_Snapshot;
	  })).tap((function(c) {
	    $.circuitboard.Snapshot = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(3), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm, plugin) {
	  'use strict';
	  return plugin.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, (function(superFn) {
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
	      traverseArtefacts: function(fn) {
	        var options = arguments[1] !== (void 0) ? arguments[1] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix') {
	          fn(this);
	        }
	        this.children.forEach((function(child) {
	          child.traverseArtefacts(fn, options);
	        }));
	        if (order === 'postfix') {
	          fn(this);
	        }
	      },
	      traverseArtefactsByType: function(type, fn) {
	        var options = arguments[2] !== (void 0) ? arguments[2] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix' && this.type === type) {
	          fn(this);
	        }
	        this.closestDescendantsByType(type).forEach((function(descendent) {
	          descendent.traverseArtefactsByType(type, fn, options);
	        }));
	        if (order === 'postfix' && this.type === type) {
	          fn(this);
	        }
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
	    window._amy_Artefact.newSubclass = function newSubClass(name, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var optionDefaults = arguments[3] !== (void 0) ? arguments[3] : {};
	      return dm.vp(name, U.newSubclass(window._amy_Artefact, (function(superFn) {
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
	    return window._amy_Artefact;
	  })).tap((function(c) {
	    $.circuitboard.Artefact = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(12), __webpack_require__(3), __webpack_require__(6), __webpack_require__(13), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
	  'use strict';
	  if (!window._amyPlugin) {
	    window._amyPlugin = function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        U.assert(!_selectedDeferred.done, "ApiNATOMY plugins can only be selected once, after which they are fixed.");
	        _selectedDeferred.done = true;
	        dm.select.apply(dm, pluginOrSelection);
	        _selectedDeferred.resolve(this);
	        return window._amyPlugin.selected;
	      }
	    };
	    var _selectedDeferred = defer();
	    window._amyPlugin.selected = _selectedDeferred.promise;
	    window._amyPlugin.graph = (function() {
	      return dm.graph();
	    });
	    window._amyPlugin.dm = dm;
	  }
	  return window._amyPlugin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(16);
	  __webpack_require__(17);
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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
	  'use strict';
	  function newWidgetType(typeName) {
	    var optionDefaults = arguments[1] !== (void 0) ? arguments[1] : {};
	    var WidgetP = ArtefactP.then((function(Artefact) {
	      return Artefact.newSubclass(typeName, function($__1) {
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
	    }));
	    var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
	    $.fn[lowercaseName] = function(options) {
	      var $__0 = this;
	      if (options === 'instance') {
	        return this.data(("-amy-" + lowercaseName));
	      }
	      this.data(("-amy-" + lowercaseName), WidgetP.then((function(Widget) {
	        return new Widget(U.extend(options, {element: $__0})).constructed;
	      })));
	      return this;
	    };
	    return WidgetP;
	  }
	  return newWidgetType;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  return function defer() {
	    var resolve,
	        reject;
	    var promise = new P(function() {
	      resolve = arguments[0];
	      reject = arguments[1];
	    });
	    return {
	      resolve: resolve,
	      reject: reject,
	      promise: promise
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NTNmMzNkNWIzNjFhMWFiZTIzZiIsIndlYnBhY2s6Ly8vLi9zcmMvcC1zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL1NuYXBzaG90LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy8uL3NyYy9BcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9iYWNvbi1zaWduYWwtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC91bmlxdWUtaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9iYWNvbi1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9uZXdXaWRnZXRUeXBlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2RlZmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLm1vZGVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBa0Isd0JBQWUsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsVUFBUTtBQUM3RSxjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLFdBQVM7QUFDZixZQUFPLENBQUcsRUFBQyxNQUFLLENBQUM7QUFBQSxHQUNsQixDQUFDLENBQUM7QUFHRixRQUFLLE9BQVEsQ0FBQyxrQ0FBaUMsQ0FBRyxVQUFVO0FBRXZELGdCQUFPLEVBQUksVUFBUSxNQUFPLEVBQUMsQ0FBQztBQUU1QixvQkFBVyxFQUFJLEtB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T0FBSztBQUNiLGFBQU0sQ0FBRyxRQUFNO0FBQUEsS0FDaEIsQ0FBQztHQUNGLENBQUM7QUFFRixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7O0FDbEJBLGlEOzs7Ozs7QUNBQSxpRDs7Ozs7O0FDQUEsaUQ7Ozs7OztBQ0FBLGlEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSwgcmVxdWlyZShcImJhY29uanNcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiYmFjb24ubW9kZWxcIiksIHJlcXVpcmUoXCJiYWNvbi5qcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJkZWx0YS1qc1wiLCBcImJhY29uanNcIiwgXCJ0d2VlbmpzXCIsIFwiYmFjb24ubW9kZWxcIiwgXCJiYWNvbi5qcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImJhY29uLm1vZGVsXCJdLCByb290W1wiYmFjb24uanF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NTNmMzNkNWIzNjFhMWFiZTIzZlxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL3V0aWwvbWlzYy5qcycsICcuL1NuYXBzaG90LmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBTbmFwc2hvdFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3NuYXBzaG90Jyxcblx0XHRyZXF1aXJlczogWydjb3JlJ11cblx0fSk7XG5cblxuXHRwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBTbmFwc2hvdCA9IFNuYXBzaG90UC52YWx1ZSgpO1xuXG5cdFx0dmFyIGNpcmN1aXRib2FyZCA9IHRoaXM7XG5cdFx0dGhpcy5TbmFwc2hvdCA9IFUubmV3U3ViY2xhc3MoU25hcHNob3QsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob3B0aW9ucykge1xuXG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgVS5leHRlbmQoe30sIG9wdGlvbnMsIHtcblx0XHRcdFx0cGFyZW50OiBjaXJjdWl0Ym9hcmRcblx0XHRcdH0pKTtcblxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcC1zbmFwc2hvdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnLi9BcnRlZmFjdC5qcycsXG5cdCcuL3V0aWwvbWlzYy5qcydcbl0sIGZ1bmN0aW9uICgkLCBBcnRlZmFjdFAsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0cmV0dXJuIEFydGVmYWN0UC50aGVuKChBcnRlZmFjdCkgPT4ge1xuXG5cblx0XHQvKiBob3dldmVyIChvZnRlbikgdGhpcyBpcyBsb2FkZWQsIGNyZWF0ZSB0aGUgY2xhc3Mgb25seSBvbmNlICovXG5cdFx0aWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X1NuYXBzaG90KSkgeyByZXR1cm4gd2luZG93Ll9hbXlfU25hcHNob3QgfVxuXG5cblx0XHR3aW5kb3cuX2FteV9TbmFwc2hvdCA9IEFydGVmYWN0Lm5ld1N1YmNsYXNzKCdTbmFwc2hvdCcsIGZ1bmN0aW9uIFNuYXBzaG90KC8qb3B0aW9ucyovKSB7XG5cblx0XHRcdHRoaXMub2JqZWN0ID0ge307XG5cblx0XHR9LCAvKiogQGxlbmRzIFNuYXBzaG90LnByb3RvdHlwZSAqLyB7XG5cblx0XHRcdHNldChrZXksIHZhbHVlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5vYmplY3Rba2V5XSksXG5cdFx0XHRcdFx0XHRgVGhlIGtleSAnJHtrZXl9JyBhbHJlYWR5IGhhcyBhIHZhbHVlIGluIHRoaXMgc25hcHNob3QuYCk7XG5cdFx0XHRcdHRoaXMub2JqZWN0W2tleV0gPSB2YWx1ZTtcblx0XHRcdH0sXG5cblx0XHRcdGdldChrZXkpIHsgcmV0dXJuIHRoaXMub2JqZWN0W2tleV0gfSxcblxuXHRcdFx0c2VyaWFsaXplKCkgeyByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5vYmplY3QpIH0sXG5cblx0XHRcdGRlc2VyaWFsaXplKHN0cikgeyB0aGlzLm9iamVjdCA9IEpTT04ucGFyc2Uoc3RyKSB9LFxuXG5cdFx0XHQvKiogdG8gYmUgZXh0ZW5kZWQgYnkgZGVsdGFzICovXG5cdFx0XHR0YWtlKCkge30sXG5cblx0XHRcdC8qKiB0byBiZSBleHRlbmRlZCBieSBkZWx0YXMgKi9cblx0XHRcdHJlc3RvcmUoKSB7fVxuXG5cdFx0fSk7XG5cblxuXHRcdHJldHVybiB3aW5kb3cuX2FteV9TbmFwc2hvdDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5TbmFwc2hvdCA9IGMgfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9TbmFwc2hvdC5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9iYWNvbi1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL3V0aWwvdW5pcXVlLWlkLmpzJyxcblx0Jy4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzJyxcblx0Jy4vdXRpbC9wbHVnaW4uanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgQmFjb25TaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0sIHBsdWdpbikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gcGx1Z2luLnNlbGVjdGVkLnRoZW4oKCkgPT4ge1xuXG5cblx0XHQvKiBob3dldmVyIChvZnRlbikgdGhpcyBpcyBsb2FkZWQsIGNyZWF0ZSB0aGUgY2xhc3Mgb25seSBvbmNlICovXG5cdFx0aWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X0FydGVmYWN0KSkgeyByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3QgfVxuXG5cblx0XHQvKioge0BleHBvcnQgQGNsYXNzIEFydGVmYWN0IEBleHRlbmRzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0XHQgKiBVc2UgdGhpcyBhcyBhIHN1YmNsYXNzIChvciBqdXN0IG1peCBpdCBpbikgdG8gcHJvdmlkZSBzdXBwb3J0IGZvclxuXHRcdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggQmFjb24uanMuXG5cdFx0ICpcblx0XHQgKiBVc2VycyBjYW4gcGFzcyBhIHByb21pc2UgdGhyb3VnaCB0aGUgJ2JlZm9yZUNvbnN0cnVjdGlvbicgb3B0aW9uLiBJZiBkb25lLCB0aGVcblx0XHQgKiBhcnRlZmFjdCB3YWl0cyBvbiB0aGF0IHByb21pc2UgYmVmb3JlIGNhbGxpbmcgaXRzICdjb25zdHJ1Y3QnIG1ldGhvZC5cblx0XHQgKiBTaW1pbGFybHksIHVzZXJzIG9mIGluc3RhbmNlcyBvZiB0aGlzIGNsYXNzIHNob3VsZCB0ZXN0IHRoZSAnY29uc3RydWN0ZWQnIHByb3BlcnR5LlxuXHRcdCAqIElmIGl0IGlzIGRlZmluZWQsIGl0IGlzIGEgcHJvbWlzZSB0aGF0IGhhcyB0byBiZSB3YWl0ZWQgZm9yLlxuXHRcdCAqIElmIG5vdCwgdGhlIG9iamVjdCBpbnN0YW5jZSBjYW4gYmUgdXNlZCBzeW5jaHJvbm91c2x5IGFmdGVyIGNvbnN0cnVjdGlvbi5cblx0XHQgKi9cblx0XHR3aW5kb3cuX2FteV9BcnRlZmFjdCA9IGRtLnZwKCdBcnRlZmFjdCcsIFUubmV3U3ViY2xhc3MoQmFjb25TaWduYWxIYW5kbGVyLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXJ0ZWZhY3Qob3B0aW9ucykge1xuXHRcdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblx0XHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudCwgYmVmb3JlQ29uc3RydWN0aW9ufSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIHNldCBoaWVyYXJjaHkgc3R1ZmYgKi9cblx0XHRcdHRoaXMuX2lkID0gaWQgfHwgdW5pcXVlSUQodHlwZSk7XG5cdFx0XHR0aGlzLl90eXBlID0gdHlwZTtcblx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdFx0XHRpZiAocGFyZW50KSB7IFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBldmVudHMgKi9cblx0XHRcdHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcblxuXHRcdFx0LyogcG9zc2libHkgd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/ICovXG5cdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbihiZWZvcmVDb25zdHJ1Y3Rpb24pO1xuXG5cdFx0fSwgLyoqIEBsZW5kcyBBcnRlZmFjdC5wcm90b3R5cGUgKi8ge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBBbGxvdyBhIHByb21pc2UgdG8gYmUgaW5zZXJ0ZWQgb24gd2hpY2ggdGhlIHJlc3Qgb2YgY29uc3RydWN0aW9uIHNob3VsZCB3YWl0LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBwb3NzaWJsZVByb21pc2Ugeyp9ICAtIGEgdmFsdWUgdGhhdCBtaWdodCBiZSBhIHByb21pc2Vcblx0XHRcdCAqL1xuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uKHBvc3NpYmxlUHJvbWlzZSkge1xuXG5cdFx0XHRcdC8qIGlmIG5vIHByb21pc2UgaXMgcGFzc2VkIGluLCBpZ25vcmUsIHRvIGtlZXAgY29uc3RydWN0aW9uIHN5bmNocm9ub3VzICovXG5cdFx0XHRcdGlmICghcG9zc2libGVQcm9taXNlIHx8ICEkLmlzRnVuY3Rpb24ocG9zc2libGVQcm9taXNlLnRoZW4pKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogaWYgdGhpcyBpcyB0aGUgZmlyc3QgcHJvbWlzZSBwYXNzZWQgaW4sIGluaXRpYWxpemUgJ3RoaXMuY29uc3RydWN0ZWQnICovXG5cdFx0XHRcdGlmICghdGhpcy5jb25zdHJ1Y3RlZCkgeyB0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKHRoaXMpIH1cblxuXHRcdFx0XHQvKiBpbnNlcnQgdGhlIG5ldyBwcm9taXNlIGludG8gdGhlIGNoYWluIGZvciAndGhpcy5jb25zdHJ1Y3RlZCcgcmVzb2x1dGlvbiAqL1xuXHRcdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50YXAoKCkgPT4gUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSkpO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgcHJvdmlkZWQgdGhyb3VnaCB0aGUgY29uc3RydWN0b3Jcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdW5pcXVlIGlkZW50aWZpZXIgYmVsb25naW5nIHRvIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB0eXBlIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgcGFyZW50IG9mIHRoaXMgYXJ0ZWZhY3QsIHVubGVzcyB0aGlzIGlzIHRoZSByb290XG5cdFx0XHQgKi9cblx0XHRcdGdldCBwYXJlbnQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2hpbGRyZW4gb2YgdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgY2hpbGRyZW4oKSB7IHJldHVybiB0aGlzLl9jaGlsZHJlbiB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogVHJhdmVyc2UgdGhlIEFydGVmYWN0IGhpZXJhcmNoeSB3aXRoIHRoaXMgYXMgcm9vdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gZm4geyhBcnRlZmFjdCkgPT4gQm9vbGVhbn0gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdHRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0dmFyIHtvcmRlcn0gPSBvcHRpb25zO1xuXHRcdFx0XHRpZiAoIW9yZGVyKSB7IG9yZGVyID0gJ3ByZWZpeCcgfVxuXG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3ByZWZpeCcpIHsgZm4odGhpcykgfVxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0Y2hpbGQudHJhdmVyc2VBcnRlZmFjdHMoZm4sIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKG9yZGVyID09PSAncG9zdGZpeCcpIHsgZm4odGhpcykgfVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFRyYXZlcnNlIHRoZSBBcnRlZmFjdCBoaWVyYXJjaHkgd2l0aCB0aGlzIGFzIHJvb3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIGZuIHsoQXJ0ZWZhY3QpID0+IEJvb2xlYW59IC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHR0cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSh0eXBlLCBmbiwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciB7b3JkZXJ9ID0gb3B0aW9ucztcblx0XHRcdFx0aWYgKCFvcmRlcikgeyBvcmRlciA9ICdwcmVmaXgnIH1cblxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwcmVmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkgeyBmbih0aGlzKSB9XG5cdFx0XHRcdHRoaXMuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpLmZvckVhY2goKGRlc2NlbmRlbnQpID0+IHtcblx0XHRcdFx0XHRkZXNjZW5kZW50LnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKHR5cGUsIGZuLCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3Bvc3RmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkgeyBmbih0aGlzKSB9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgKHBhcmVudCwgcGFyZW50J3MgcGFyZW50LCAuLi4pXG5cdFx0XHQgKiBvZiB0aGlzIGFydGVmYWN0IHdpdGggdGhlIGdpdmVuIHR5cGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIHRoZSBnaXZlbiB0eXBlLCB1bmxlc3MgdGhlcmUgaXMgbm9uZVxuXHRcdFx0ICovXG5cdFx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcztcblx0XHRcdFx0ZG8geyByZXN1bHQgPSByZXN1bHQucGFyZW50IH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgZGVzY2VuZGFudCAoY2hpbGRyZW4sIGNoaWxkcmVuJ3MgY2hpbGRyZW4sIC4uLilcblx0XHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnRzIG9mIHRoZSBnaXZlbiB0eXBlOyBub25lIG9mIHRoZW1cblx0XHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRlc2NlbmRhbnQgZnJvbSBhbnkgb3RoZXJcblx0XHRcdCAqL1xuXHRcdFx0Y2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogSW5kaWNhdGUgdGhhdCB0aGlzIGFydGVmYWN0IHdpbGwgbmV2ZXIgYmUgdXNlZCBhZ2FpbiwgYWxsb3dpbmcgaXRcblx0XHRcdCAqIHRvIGRvIGFueSBuZWNlc3NhcnkgY2xlYW51cC5cblx0XHRcdCAqL1xuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHsgY2hpbGQuZGVzdHJveSgpIH0pO1xuXHRcdFx0fVxuXG5cdFx0fSkpO1xuXG5cblx0XHQvKioge0BmdW5jdGlvbiBBcnRlZmFjdC5uZXdTdWJjbGFzc31cblx0XHQgKiBBIHN0YXRpYyBjb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzdWJjbGFzcyBvZiB7QGxpbmsgQXJ0ZWZhY3R9LlxuXHRcdCAqL1xuXHRcdHdpbmRvdy5fYW15X0FydGVmYWN0Lm5ld1N1YmNsYXNzID0gZnVuY3Rpb24gbmV3U3ViQ2xhc3MobmFtZSwgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9LCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cdFx0XHRyZXR1cm4gZG0udnAobmFtZSwgVS5uZXdTdWJjbGFzcyh3aW5kb3cuX2FteV9BcnRlZmFjdCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBwcm9jZXNzIG9wdGlvbnMgKi9cblx0XHRcdFx0dmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQocHJvY2Vzc2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zLnR5cGUgPSBuYW1lO1xuXG5cdFx0XHRcdC8qIGNhbGwgc3VwZXItY29uc3RydWN0b3IgKi9cblx0XHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0XHQvKiBjYWxsIHRoaXMgY29uc3RydWN0b3IgKi9cblx0XHRcdFx0Y29uc3RydWN0b3IuY2FsbCh0aGlzLCBwcm9jZXNzZWRPcHRpb25zKTtcblxuXHRcdFx0XHQvKiB0aGVuIHJ1biB0aGUgJ2NvbnN0cnVjdCcgbWV0aG9kICovXG5cdFx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdGVkKSB7IC8vIGNvbnN0cnVjdCBhc3luY2hyb25vdXNseVxuXHRcdFx0XHRcdHRoaXMuY29uc3RydWN0ZWQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdChvcHRpb25zKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMuY29uc3RydWN0KG9wdGlvbnMpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdGdldCBjaXJjdWl0Ym9hcmQoKSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2lyY3VpdGJvYXJkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSkpO1xuXHRcdH07XG5cblxuXHRcdHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5BcnRlZmFjdCA9IGMgfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9BcnRlZmFjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICcuL2JhY29uLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbikge1xuXG5cblx0LyoqIHtAZXhwb3J0fXtAY2xhc3MgQmFjb25TaWduYWxIYW5kbGVyfVxuXHQgKiBVc2UgdGhpcyBhcyBhIHN1YmNsYXNzIChvciBqdXN0IG1peCBpdCBpbikgdG8gcHJvdmlkZSBzdXBwb3J0IGZvclxuXHQgKiBldmVudHMgYW5kIG9ic2VydmFibGUgcHJvcGVydGllcyB0aHJvdWdoIEJhY29uLmpzLlxuXHQgKi9cblx0dmFyIEJhY29uU2lnbmFsSGFuZGxlciA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gQmFjb25TaWduYWxIYW5kbGVyKCkge1xuXG5cdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0dGhpcy5fcHJvcGVydGllcyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnR5QnVzc2VzID0ge307XG5cblx0fSwgLyoqIEBsZW5kcyBCYWNvblNpZ25hbEhhbmRsZXIucHJvdG90eXBlICovIHtcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIERlY2xhcmVzIGEgbmV3IGV2ZW50IHN0cmVhbSBmb3IgdGhpcyBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgIG5hbWUgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQsIHVzZWQgdG8gdHJpZ2dlciBvciBzdWJzY3JpYmUgdG8gaXRcblx0XHQgKiBAcGFyYW0gIHtCYWNvbi5FdmVudFN0cmVhbX0gW3NvdXJjZV0gLSBhbm90aGVyIGV2ZW50IHN0cmVhbSB0byBhdXRvbWF0aWNhbGx5IHRyaWdnZXIgdGhpcyBldmVudFxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uQnVzfSAtIHRoZSBjcmVhdGVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqL1xuXHRcdG5ld0V2ZW50KG5hbWUsIHtzb3VyY2V9ID0ge30pIHtcblxuXHRcdFx0LyogaXMgdGhlIGV2ZW50IG5hbWUgYWxyZWFkeSB0YWtlbj8gKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgZXZlbnQgc3RyZWFtICovXG5cdFx0XHR2YXIgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdFx0aWYgKHNvdXJjZSkgeyBidXMucGx1Zyhzb3VyY2UpIH1cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV0gPSBidXMubmFtZShuYW1lKTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhbiBldmVudCBzdHJlYW0gYnkgbmFtZS4gSWYgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSBpcyBnaXZlbiwgYSBzdHJlYW1cblx0XHQgKiBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoYXQgcHJvcGVydHkgaXMgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7QmFjb24uRXZlbnRTdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHJldHVybiBpdCAqL1xuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhIHByb3BlcnR5IGJ5IG5hbWUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Nb2RlbH0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cdFx0LyoqIEBhbGlhcyBwcm9wZXJ0eSAqL1xuXHRcdHAobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgZGVmaW5lcyBhIG5ldyBwcm9wZXJ0eSBvbiB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgIFtzZXR0YWJsZT10cnVlXSAtIHdoZXRoZXIgdGhlIHZhbHVlIGNhbiBiZSBtYW51YWxseSBzZXRcblx0XHQgKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICAgICAgICAgICAgW2luaXRpYWxdICAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9uKCosKik6Qm9vbGVhbn0gICBbaXNFcXVhbF0gICAgICAgLSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBieSB3aGljaCB0byB0ZXN0IGZvciBkdXBsaWNhdGUgdmFsdWVzXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Nb2RlbH0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0bmV3UHJvcGVydHkobmFtZSwge3NldHRhYmxlLCBpbml0aWFsLCBpc0VxdWFsfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBwcm9wZXJ0eSBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZhdWx0IHZhbHVlIGZvciAnc2V0dGFibGUnICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChzZXR0YWJsZSkpIHsgc2V0dGFibGUgPSB0cnVlIH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBCYWNvbi5Nb2RlbCB3aGljaCBzdG9yZXMgdGhlIHByb3BlcnR5ICovXG5cdFx0XHR2YXIgcHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gbmV3IEJhY29uLk1vZGVsKGluaXRpYWwsIHsgaXNFcXVhbCB9KTtcblxuXHRcdFx0LyogYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgb2JqZWN0IGludGVyZmFjZSAqL1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcblx0XHRcdFx0Z2V0OiBwcm9wZXJ0eS5nZXQsXG5cdFx0XHRcdHNldDogc2V0dGFibGUgPyBwcm9wZXJ0eS5zZXQgOiB1bmRlZmluZWRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHByb3BlcnR5ICovXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVHJpZ2dlciBhbiBldmVudCBmb3IgYWxsIHN1YnNjcmliZXJzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byB0cmlnZ2VyXG5cdFx0ICogQHZhbHVlIHsqfSAgICAgIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGF0dGFjaCB0byB0aGUgZXZlbnRcblx0XHQgKi9cblx0XHR0cmlnZ2VyKG5hbWUsIHZhbHVlKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IHN0cmVhbSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0ucHVzaCh2YWx1ZSk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2VsZWN0cyBhbiBleGlzdGluZyBzdHJlYW0gb3IgcHJvcGVydHksIGFuZCB0aGVuXG5cdFx0ICogZWl0aGVyIHJldHVybnMgaXQsIG9yIGNyZWF0ZXMgYSBzdWJzY3JpcHRpb24gdG8gaXQsIGRlcGVuZGluZ1xuXHRcdCAqIG9uIHdoZXRoZXIgYSBjYWxsYmFjayBpcyBwcm92aWRlZC5cblx0XHQgKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgbmFtZSAgICAgICAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgb3IgcHJvcGVydHkgdG8gc3Vic2NyaWJlIHRvXG5cdFx0ICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgICBbZXhwZWN0ZWRWYWx1ZV0gICAgICAgLSBpZiBwcm92aWRlZCwgZmlsdGVycyB0aGUgc3RyZWFtIGJ5ID09PSBlcXVhbGl0eSB3aXRoIHRoaXMgdmFsdWU7XG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG1heSBub3QgYmUgYSBwbGFpbiBvYmplY3Rcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgIFtvcHRpb25zXSAgICAgICAgICAgICAtIGEgcGxhaW4gb2JqZWN0IGZvciBwcm92aWRpbmcgYWRkaXRpb25hbCBvcHRpb25zXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICBbb3B0aW9ucy5vbmNlPWZhbHNlXSAgLSB3aGV0aGVyIHRoZSBzdHJlYW0gZW5kcyBhZnRlciBvbmUgZXZlbnRcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9uKCopOnZvaWR9IFtjYWxsYmFja10gICAgICAgICAgICAtIGlmIHByb3ZpZGVkLCBzdWJzY3JpYmVzIHRvIHRoaXMgc3RyZWFtIHdpdGggdGhlIHRoaXMgY2FsbGJhY2tcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp1bmRlZmluZWR9IC0gaWYgbm8gYGNhbGxiYWNrYCBpcyBwcm92aWRlZCwgdGhlIHNwZWNpZmllZCBldmVudCBzdHJlYW1cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHByb3BlcnR5OyBvdGhlcndpc2UsIGEgZnVuY3Rpb24gdG8gdW5zdWJzY3JpYmUgdG8gc2FpZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtIG9yIHByb3BlcnR5XG5cdFx0ICovXG5cdFx0b24obmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhcmdzT2JqID0gdGhpcy5fZ2F0aGVyT25Bcmd1bWVudHMobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXHRcdFx0cmV0dXJuIHRoaXMuX29uKGFyZ3NPYmopO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpcyBhIHNob3J0aGFuZCBmb3IgdGhlIHtAbGluayBvbn0gbWV0aG9kIHdpdGggdGhlIGBvbmNlYCBvcHRpb24gZW5hYmxlZC5cblx0XHQgKiBJbiBvdGhlciB3b3JkcywgYW55IHN0cmVhbSByZXR1cm5lZCB3aWxsIHNlbmQgb25seSBvbmUgZXZlbnQsIGFuZCBhbnkgY2FsbGJhY2tcblx0XHQgKiBwcm92aWRlZCB3aWxsIG9ubHkgZmlyZSBvbmNlLlxuXHRcdCAqL1xuXHRcdG9uZShuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGFyZ3NPYmogPSB0aGlzLl9nYXRoZXJPbkFyZ3VtZW50cyhuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjayk7XG5cdFx0XHRVLm9iamVjdChhcmdzT2JqLCAnb3B0aW9ucycpLm9uY2UgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRoaXMuX29uKGFyZ3NPYmopO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgZG9lcyB0aGUgbWFpbiB3b3JrIGZvciB7QGxpbmsgb259IG9yIHtAbGluayBvbmV9LCBidXQgYWNjZXB0c1xuXHRcdCAqIHRoZSBwYXJhbWV0ZXJzIGFzIG9uZSBvYmplY3QsIHNvIGl0IGRvZXNuJ3QgaGF2ZSB0byBkZWFsIHdpdGggcGFyYW1ldGVyIG9yZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uT2JzZXJ2YWJsZXxmdW5jdGlvbigpOnZvaWR9XG5cdFx0ICovXG5cdFx0X29uKHtuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFja30pIHtcblx0XHRcdC8qIGRvZXMgYW4gZXZlbnQgb3IgcHJvcGVydHkgYnkgdGhpcyBuYW1lIGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdIHx8IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50IG9yIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcHJvY2VzcyBuYW1lICovXG5cdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV07XG5cblx0XHRcdC8qIHByb2Nlc3MgZXhwZWN0ZWRWYWx1ZSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGV4cGVjdGVkVmFsdWUpKSB7IHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoKHYpID0+IHYgPT09IGV4cGVjdGVkVmFsdWUpIH1cblxuXHRcdFx0LyogcHJvY2VzcyBvcHRpb25zLm9uY2UgKi9cblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMub25jZSkgeyByZXN1bHQgPSByZXN1bHQudGFrZSgxKSB9XG5cblx0XHRcdC8qIHByb2Nlc3MgY2FsbGJhY2sgKi9cblx0XHRcdGlmIChjYWxsYmFjaykgeyByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjaykgfVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogUHJvY2VzcyB0aGUgYXJndW1lbnRzIGFjY2VwdGVkIGJ5IHtAbGluayBvbn0gYW5kIHtAbGluayBvbmV9LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdF9nYXRoZXJPbkFyZ3VtZW50cyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0geyBuYW1lOiBhcmdzLnNoaWZ0KCkgfTtcblxuXHRcdFx0LyogdGVzdCBmb3IgZXhwZWN0ZWQgdmFsdWUgYXJndW1lbnQgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiAhVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pICYmICFVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmV4cGVjdGVkVmFsdWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRlc3QgZm9yIG9wdGlvbnMgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRlc3QgZm9yIGNhbGxiYWNrIGZ1bmN0aW9uICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5jYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHR9KTtcblxuXG5cdHJldHVybiBCYWNvblNpZ25hbEhhbmRsZXI7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX25leHRJZCA9IDA7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xuXHRcdHJldHVybiBgJHtwcmVmaXh8fFwidW5pcXVlLWlkXCJ9LSR7X25leHRJZCsrfWA7XG5cdH07XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvdW5pcXVlLWlkLmpzXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnZGVsdGEtanMnIF0sIGZ1bmN0aW9uIChQLCBETSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBhbHJlYWR5IGNhY2hlZD8gKi9cblx0aWYgKHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsKSB7IHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCB9XG5cblxuXHQvKiB0ZWxsIGRlbHRhLmpzIGFib3V0IGJsdWViaXJkICovXG5cdERNLnJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKFAucmVzb2x2ZSk7XG5cblxuXHQvKiBzZXQgdGhlIGNhY2hlICovXG5cdHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsID0gbmV3IERNKCk7XG5cblxuXHQvKiByZXR1cm4gdGhlIGRlbHRhIG1vZGVsIHRoYXQgbWFuYWdlcyBhbGwgcGx1Z2lucyAoPSBkZWx0YXMpICovXG5cdHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbDtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qc1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi9uZXdXaWRnZXRUeXBlLmpzJyxcblx0Jy4vbWlzYy5qcycsXG5cdCcuL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzJyxcblx0Jy4vZGVmZXIuanMnLFxuXHQnLi9tYWluLWRlbHRhLW1vZGVsLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFAsIG5ld1dpZGdldFR5cGUsIFUsIFNpZ25hbEhhbmRsZXIsIGRlZmVyLCBkbSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRpZiAoIXdpbmRvdy5fYW15UGx1Z2luKSB7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4gPSBmdW5jdGlvbiAocGx1Z2luT3JTZWxlY3Rpb24pIHtcblx0XHRcdGlmICgkLmlzUGxhaW5PYmplY3QocGx1Z2luT3JTZWxlY3Rpb24pKSB7XG5cblx0XHRcdFx0LyogdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVnaXN0ZXIgYSBuZXcgcGx1Z2luICovXG5cdFx0XHRcdHJldHVybiBuZXcgZG0uRGVsdGEocGx1Z2luT3JTZWxlY3Rpb24ubmFtZSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFUuYXNzZXJ0KCFfc2VsZWN0ZWREZWZlcnJlZC5kb25lLFxuXHRcdFx0XHRcdFx0YEFwaU5BVE9NWSBwbHVnaW5zIGNhbiBvbmx5IGJlIHNlbGVjdGVkIG9uY2UsIGFmdGVyIHdoaWNoIHRoZXkgYXJlIGZpeGVkLmApO1xuXHRcdFx0XHRfc2VsZWN0ZWREZWZlcnJlZC5kb25lID0gdHJ1ZTtcblxuXHRcdFx0XHQvKiB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byBzZWxlY3QgcGx1Z2lucyB0byBiZSBhcHBsaWVkICovXG5cdFx0XHRcdGRtLnNlbGVjdC5hcHBseShkbSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0XHRfc2VsZWN0ZWREZWZlcnJlZC5yZXNvbHZlKHRoaXMpO1xuXG5cdFx0XHRcdHJldHVybiB3aW5kb3cuX2FteVBsdWdpbi5zZWxlY3RlZDtcblxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIF9zZWxlY3RlZERlZmVycmVkID0gZGVmZXIoKTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5zZWxlY3RlZCA9IF9zZWxlY3RlZERlZmVycmVkLnByb21pc2U7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uZ3JhcGggPSAoKSA9PiBkbS5ncmFwaCgpO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLmRtID0gZG07XG5cdH1cblxuXG5cdHJldHVybiB3aW5kb3cuX2FteVBsdWdpbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvcGx1Z2luLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2JhY29uanMnLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24sIFRXRUVOKSB7XG5cblx0cmVxdWlyZSgnYmFjb24ubW9kZWwnKTtcblx0cmVxdWlyZSgnYmFjb24uanF1ZXJ5Jyk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEJhY29uLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCAodikgPT4geyBzaW5rKG5ldyBCYWNvbi5OZXh0KHYpKSB9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRCYWNvbi5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoc2luaygpID09PSBCYWNvbi5ub01vcmUpIHsgc3Vic2NyaWJlZCA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEJhY29uLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogYSBsb2NhbCBmdW5jdGlvbiB0byBwbHVnIGluIG90aGVyIHN0cmVhbXMsIGtlZXBpbmcgdHJhY2sgaW4gb3JkZXIgdG8gJ2VuZCcgdGhlIGJ1cyAqL1xuXHRcdHZhciBhZGRTdHJlYW0gPSAoKCkgPT4ge1xuXHRcdFx0dmFyIGNoYWluZWRTdHJlYW1zID0gMDtcblx0XHRcdHJldHVybiAoc3RyZWFtKSA9PiB7XG5cdFx0XHRcdGNoYWluZWRTdHJlYW1zICs9IDE7XG5cdFx0XHRcdGJ1cy5wbHVnKHN0cmVhbSk7XG5cdFx0XHRcdHN0cmVhbS5vbkVuZCgoKSA9PiB7XG5cdFx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgLT0gMTtcblx0XHRcdFx0XHRpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHsgYnVzLmVuZCgpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cblx0XHQvKiBtYWluIHN0cmVhbSAqL1xuXHRcdGFkZFN0cmVhbShCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRpZiAoZWFzaW5nKSB7IHR3LmVhc2luZyhlYXNpbmcpIH1cblx0XHRcdGlmIChkZWxheSkgIHsgdHcuZGVsYXkoZGVsYXkpIH1cblx0XHRcdHR3Lm9uVXBkYXRlKGZ1bmN0aW9uICgpIHsgc2luayhuZXcgQmFjb24uTmV4dCgoKSA9PiB0aGlzKSkgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKCgpID0+IHsgc2luayhuZXcgQmFjb24uRW5kKCkpIH0pO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0QmFjb24ua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXljb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXljb2RlKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0QmFjb24ubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgb3BlbiA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgY2xvc2UgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyKHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZShoYW5kbGVyLCAoKSA9PiB7XG5cdFx0XHRvcGVuLnB1c2goKTtcblx0XHRcdHdhbnRlZEJ1cy5wdXNoKGZhbHNlKTtcblx0XHRcdGNsb3NlLnB1c2goKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwKHRydWUpKTtcblx0XHRcdHJldHVybiBjbG9zZS5zdGFydFdpdGgodHJ1ZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbChvcGVuKS5yZWR1Y2UoW10sIGFjY3VtdWxhdG9yKS5mbGF0TWFwKEJhY29uLmZyb21BcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoaXMgcmVzdHJpY3RzIGEgZ2l2ZW4gc3RyZWFtIHRvIGEgd3JhcHBlciBzdHJlYW0gY3JlYXRlZCB3aXRoIHRoZSBtZXRob2QgYWJvdmUuXG5cdC8vIEFsbCBpdHMgb3JpZ2luYWwgZXZlbnRzIGFyZSBub3cgZmlyZWQgaW5zaWRlIHRoZSBwcm92aWRlZCB3aW5kb3cuIFNldCBgb3B0aW9ucy5idWZmZXJgXG5cdC8vIHRvIGB0cnVlYCBpZiBhbGwgaXRzIGV2ZW50cyBzaG91bGQgYmUgYnVmZmVyZWQgYW5kIHJlbGVhc2VkIGluc2lkZSB0aGUgbmV4dCB3aW5kb3cuXG5cdC8vIE90aGVyd2lzZSwgb25seSB0aGUgbGFzdCBldmVudCBpcyByZXRhaW5lZC5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIFRoaXMgaXMgYSBjaGVhcCB2ZXJzaW9uIG9mIHRoZSBsaW1pdGVyIGRlZmluZWQgYWJvdmUuIFRPRE86IHVzZSB0aGUgbGltaXRlciB3aGVyZSB0aGlzIGlzIG5vdyB1c2VkXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2gobmV3IEJhY29uLk5leHQoKCkgPT4gdmFsdWUpKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG5cdFx0XHRcdFx0YnVmZmVyID0gW107XG5cdFx0XHRcdFx0c2luayhvbGRCdWZmZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnN1YnNjcmliZSgoKT0+e30pO1xuXHR9O1xuXG5cdC8vIFRoaXMgaXMgYSAnc21hcnQnIC5zdG9wUHJvcGFnYXRpb24sIG1hcmtpbmcgZXZlbnRzIHdpdGggYSBsYWJlbFxuXHQvLyBhbmQgc2tpcHBpbmcgdGhvc2UgdGhhdCBhbHJlYWR5IGhhdmUgdGhhdCBsYWJlbC5cblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbiAoYnV0dG9uSWQpIHtcblx0XHR2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6IChiID0+IGIgPT09IGJ1dHRvbklkKTtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoZSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsKCQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKSlcblx0XHRcdFx0XHQubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWwodW50aWxTdHJlYW0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gQmFjb247XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2JhY29uLWFuZC1lZ2dzLmpzXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vbWlzYy5qcycsICcuLi9BcnRlZmFjdC5qcyddLCBmdW5jdGlvbiAoJCwgUCwgVSwgQXJ0ZWZhY3RQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qICBhIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbiBhcGluYXRvbXkgY29tcG9uZW50ICh3aWRnZXQpICAgICAgICAgICovXG5cdC8qICBhcyBhIGpRdWVyeSBlbGVtZW50IHBsdWdpbjsgdGhpcyBpcyByZXR1cm5lZCBmcm9tIHRoZSBtb2R1bGUgICovXG5cdGZ1bmN0aW9uIG5ld1dpZGdldFR5cGUodHlwZU5hbWUsIG9wdGlvbkRlZmF1bHRzID0ge30pIHtcblxuXHRcdC8qIHRoZSBzcGVjaWZpYyB3aWRnZXQgY2xhc3MgKi9cblx0XHR2YXIgV2lkZ2V0UCA9IEFydGVmYWN0UC50aGVuKChBcnRlZmFjdCkgPT4gQXJ0ZWZhY3QubmV3U3ViY2xhc3ModHlwZU5hbWUsIGZ1bmN0aW9uICh7Y3NzQ2xhc3N9KSB7XG5cblx0XHRcdC8qIHNldCB0aGUgZWxlbWVudCBDU1MgY2xhc3MgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChjc3NDbGFzcykpIHsgdGhpcy5lbGVtZW50LmFkZENsYXNzKGNzc0NsYXNzKSB9XG5cblx0XHRcdC8qIGlmIHRoZSBqcXVlcnkgZWxlbWVudCBpcyByZW1vdmVkLCBkZXN0cm95IHRoZSBhcnRlZmFjdCAqL1xuXHRcdFx0dGhpcy5lbGVtZW50LmFzRXZlbnRTdHJlYW0oJ3JlbW92ZScpLm9uVmFsdWUoKCkgPT4geyB0aGlzLmRlc3Ryb3koKSB9KTtcblxuXHRcdH0sIHtcblxuXHRcdFx0Z2V0IG1vZGVsKCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLm1vZGVsIH0sXG5cblx0XHRcdGdldCBlbGVtZW50KCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmVsZW1lbnQgfVxuXG5cdFx0fSwgVS5leHRlbmQoe1xuXG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb246IFAucmVzb2x2ZSgpIC8vIGd1YXJhbnRlZSBhbGwgd2lkZ2V0IGNvbnN0cnVjdGlvbiB0byBiZSBhc3luY2hyb25vdXNcblxuXHRcdH0sIG9wdGlvbkRlZmF1bHRzKSkpO1xuXG5cdFx0LyogY3JlYXRlIGEgbG93ZXJjYXNlIG5hbWUgZm9yIHRoaXMgd2lkZ2V0IHR5cGUgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IHR5cGVOYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyB0eXBlTmFtZS5zbGljZSgxKTtcblxuXHRcdC8qIGpRdWVyeSBwbHVnaW46IHRoZSB3aWRnZXQgY3JlYXRpb24gJiByZXRyaWV2YWwgZnVuY3Rpb24gICovXG5cdFx0JC5mbltsb3dlcmNhc2VOYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cblx0XHRcdC8qIGlmIHRoZSB3b3JkICdpbnN0YW5jZScgaXMgcGFzc2VkLCByZXR1cm4gdGhlIChhbHJlYWR5IGNyZWF0ZWQpIHdpZGdldCBwcm9taXNlICovXG5cdFx0XHRpZiAob3B0aW9ucyA9PT0gJ2luc3RhbmNlJykgeyByZXR1cm4gdGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gKSB9XG5cblx0XHRcdC8qIGVsc2UsIGNyZWF0ZSBhIG5ldyB3aWRnZXQgYW5kIHNldCBhIHByb21pc2UgdG8gaXQgKi9cblx0XHRcdHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCwgV2lkZ2V0UFxuXHRcdFx0XHRcdC50aGVuKChXaWRnZXQpID0+IG5ldyBXaWRnZXQoVS5leHRlbmQob3B0aW9ucywgeyBlbGVtZW50OiB0aGlzIH0pKS5jb25zdHJ1Y3RlZCkpO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGpRdWVyeSBlbGVtZW50IGluc3RhbmNlLCBieSBqUXVlcnkgY29udmVudGlvbiAqL1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuIGEgcHJvbWlzZSB0byB0aGUgd2lkZ2V0IGFydGVmYWN0IGNsYXNzICovXG5cdFx0cmV0dXJuIFdpZGdldFA7XG5cblx0fVxuXG5cblx0LyogZXhwb3NlIHRoZSB3aWRnZXQgY2xhc3MgY3JlYXRvciBmdW5jdGlvbiAqL1xuXHRyZXR1cm4gbmV3V2lkZ2V0VHlwZTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbmV3V2lkZ2V0VHlwZS5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9kZWZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifVxuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE2X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhY29uLm1vZGVsXCJcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhY29uLmpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtc25hcHNob3QuanMifQ==