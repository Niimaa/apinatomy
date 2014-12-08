(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), require("bacon"), require("Array.prototype.findIndex"), require("jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["bluebird", "bacon", "Array.prototype.findIndex", "jquery", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("bluebird"), require("bacon"), require("Array.prototype.findIndex"), require("jquery"), require("delta-js")) : factory(root["P"], root["Bacon"], root["Array.prototype.findIndex"], root["jQuery"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_10__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(U, Artefact) {
	  'use strict';
	  return Artefact.newSubclass('D3Group', function D3Group() {
	    var $__0 = this;
	    U.extend(this, {
	      vertices: {},
	      edges: {}
	    });
	    this.newEvent('vertex-added');
	    this.newEvent('vertex-removed');
	    this.newEvent('edge-added');
	    this.newEvent('edge-removed');
	    this.on('destroy').take(1).onValue((function() {
	      $__0.vertices.forEach((function(v) {
	        v.destroy();
	      }));
	    }));
	  }, {
	    get gravityFactor() {
	      return this.options.gravityFactor;
	    },
	    get chargeFactor() {
	      return this.options.chargeFactor;
	    },
	    get linkDistanceFactor() {
	      return this.options.linkDistanceFactor;
	    },
	    setRegion: function(region) {
	      this.region = region;
	      this.circuitboard.updateGraph();
	    },
	    addVertex: function(vertex) {
	      vertex.group = this;
	      this.vertices[vertex.id] = vertex;
	      vertex.graphId = vertex.id;
	      this.circuitboard._p_d3_vertices[vertex.graphId] = vertex;
	      this.trigger('vertex-added', vertex);
	      this.circuitboard.updateGraph();
	      return vertex;
	    },
	    removeVertex: function(vertex) {
	      if (vertex) {
	        if (typeof vertex === 'string') {
	          vertex = this.vertices[vertex];
	        }
	        vertex.destroy();
	        delete this.circuitboard._p_d3_vertices[vertex.graphId];
	        delete this.vertices[vertex];
	        this.trigger('vertex-removed', vertex);
	        this.circuitboard.updateGraph();
	      }
	    },
	    addEdge: function(edge) {
	      edge.group = this;
	      this.edges[edge.id] = edge;
	      edge.graphId = this.id + ':' + edge.id;
	      this.circuitboard._p_d3_edges[edge.graphId] = edge;
	      this.trigger('edge-added', edge);
	      this.circuitboard.updateGraph();
	      return edge;
	    },
	    removeEdge: function(edge) {
	      if (edge) {
	        if (typeof vertex === 'string') {
	          edge = this.edges[edge];
	        }
	        edge.destroy();
	        delete this.circuitboard._p_d3_edges[edge.graphId];
	        delete this.edges[edge.id];
	        this.trigger('edge-removed', edge);
	        this.circuitboard.updateGraph();
	      }
	    },
	    removeAllEdgesAndVertices: function() {
	      var $__0 = this;
	      Object.keys(this.edges).forEach((function(edgeId) {
	        if ($__0.edges[edgeId]) {
	          $__0.removeEdge($__0.edges[edgeId]);
	        }
	      }));
	      Object.keys(this.vertices).forEach((function(vertexId) {
	        if ($__0.vertices[vertexId]) {
	          $__0.removeVertex($__0.vertices[vertexId]);
	        }
	      }));
	      this.circuitboard.updateGraph();
	    }
	  }, {
	    gravityFactor: 1,
	    chargeFactor: 1,
	    linkDistanceFactor: 1,
	    region: {
	      top: 10,
	      left: 10,
	      get width() {
	        return this.circuitboard.size.width - 20;
	      },
	      get height() {
	        return this.circuitboard.size.height - 20;
	      }
	    }
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	    memoize: function(fn) {
	      var keys = [];
	      var cache = [];
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var index = keys.findIndex((function(key) {
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(3), __webpack_require__(1), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(1), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMGJkZjliYzAwZmE1ZDdlNjA0MyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9EM0dyb3VwLmpzIiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9hcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcIkFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tc2lnbmFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFrQix3QkFBb0IsQ0FBRywwQ0FBVSxFQUFHLFNBQU87QUFDcEUsY0FBVyxDQUFDO0FBR1osUUFBTyxTQUFPLFlBQWEsQ0FBQyxTQUFRLENBQUcsU0FBUyxRQUFNLENBQUU7O0FBRXZELFlBQVEsQ0FBQyxJQUFHLENBQUc7QUFDZCxjQUFPLENBQUcsR0FBQztBQUNYLFdBQUksQ0FBRyxHQUFDO0FBQUEsS0FDVCxDQUFDLENBQUM7QUFFRixRQUFHLFNBQVUsQ0FBQyxjQUFhLENBQUMsQ0FBQztBQUM3QixRQUFHLFNBQVUsQ0FBQyxnQkFBZSxDQUFDLENBQUM7QUFDL0IsUUFBRyxTQUFVLENBQUMsWUFBVyxDQUFDLENBQUM7QUFDM0IsUUFBRyxTQUFVLENBQUMsY0FBYSxDQUFDLENBQUM7QUFFN0IsUUFBRyxHQUFJLENBQUMsU0FBUSxDQUFDLEtBQU0sQ0FBQyxFQUFDLFFBQVMsRUFBQyxTQUFDO0FBQ25DLG1CQUFZLFFBQVMsRUFBQyxTQUFDLEVBQU07QUFBRSxpQkFBUyxFQUFDO09BQUUsRUFBQyxDQUFDO0tBRTlDLEVBQUMsQ0FBQztHQUVILENBQUc7QUFFRixPQUFJLGNBQVksRUFBUztBQUFFLFlBQU8sS0FBRyxRQUFRLGNBQWM7S0FBTztBQUNsRSxPQUFJLGFBQVcsRUFBVTtBQUFFLFlBQU8sS0FBRyxRQUFRLGFBQWE7S0FBUTtBQUNs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RUFBQywrSUFBQztBQUNGOzs7Ozs7O2lFQ1RBLGlDQUFRLHVCQUFZLHlCQUFXLENBQUcsMENBQVUsRUFBRyxHQUFDLENBQUc7QUFDbEQsY0FBVyxDQUFDO0FBSVosTUFBSSxNQUFLLDZCQUE2QixDQUFHO0FBQUUsVUFBTyxPQUFLLDZCQUE2QjtHQUFFO0FBSXRGLElBQUMsd0JBQXlCLENBQUMsU0FBUSxDQUFDLENBQUM7QUFJckMsUUFBSyw2QkFBNkIsRUFBSSxJQUFJLEdBQUUsRUFBQyxDQUFDO0FBSTlDLFFBQU8sT0FBSyw2QkFBNkIsQ0FBQztBQUczQyxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUNyQkEsaUQiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwiQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleFwiKSwgcmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImJsdWViaXJkXCIsIFwiYmFjb25cIiwgXCJBcnJheS5wcm90b3R5cGUuZmluZEluZGV4XCIsIFwianF1ZXJ5XCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJBcnJheS5wcm90b3R5cGUuZmluZEluZGV4XCIpLCByZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdLCByb290W1wiQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleFwiXSwgcm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIkRlbHRhTW9kZWxcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGIwYmRmOWJjMDBmYTVkN2U2MDQzXG4gKiovIiwiZGVmaW5lKFsnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL2FydGVmYWN0LmpzJ10sIGZ1bmN0aW9uIChVLCBBcnRlZmFjdCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ0QzR3JvdXAnLCBmdW5jdGlvbiBEM0dyb3VwKCkge1xuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0dmVydGljZXM6IHt9LFxuXHRcdFx0ZWRnZXM6IHt9XG5cdFx0fSk7XG5cblx0XHR0aGlzLm5ld0V2ZW50KCd2ZXJ0ZXgtYWRkZWQnKTtcblx0XHR0aGlzLm5ld0V2ZW50KCd2ZXJ0ZXgtcmVtb3ZlZCcpO1xuXHRcdHRoaXMubmV3RXZlbnQoJ2VkZ2UtYWRkZWQnKTtcblx0XHR0aGlzLm5ld0V2ZW50KCdlZGdlLXJlbW92ZWQnKTtcblxuXHRcdHRoaXMub24oJ2Rlc3Ryb3knKS50YWtlKDEpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0dGhpcy52ZXJ0aWNlcy5mb3JFYWNoKCh2KSA9PiB7IHYuZGVzdHJveSgpIH0pO1xuXHRcdFx0Ly8gZWRnZXMgd2lsbCBiZSBkZXN0cm95ZWQgd2hlbiB0aGVpciB2ZXJ0aWNlcyBhcmUgZGVzdHJveWVkXG5cdFx0fSk7XG5cblx0fSwge1xuXG5cdFx0Z2V0IGdyYXZpdHlGYWN0b3IoKSAgICAgIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5ncmF2aXR5RmFjdG9yICAgICAgfSxcblx0XHRnZXQgY2hhcmdlRmFjdG9yKCkgICAgICAgeyByZXR1cm4gdGhpcy5vcHRpb25zLmNoYXJnZUZhY3RvciAgICAgICB9LFxuXHRcdGdldCBsaW5rRGlzdGFuY2VGYWN0b3IoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubGlua0Rpc3RhbmNlRmFjdG9yIH0sXG5cblx0XHRzZXRSZWdpb24ocmVnaW9uKSB7XG5cdFx0XHR0aGlzLnJlZ2lvbiA9IHJlZ2lvbjtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0fSxcblxuXHRcdGFkZFZlcnRleCh2ZXJ0ZXgpIHtcblx0XHRcdHZlcnRleC5ncm91cCA9IHRoaXM7XG5cdFx0XHR0aGlzLnZlcnRpY2VzW3ZlcnRleC5pZF0gPSB2ZXJ0ZXg7XG5cdFx0XHR2ZXJ0ZXguZ3JhcGhJZCA9IHZlcnRleC5pZDtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9wX2QzX3ZlcnRpY2VzW3ZlcnRleC5ncmFwaElkXSA9IHZlcnRleDtcblx0XHRcdHRoaXMudHJpZ2dlcigndmVydGV4LWFkZGVkJywgdmVydGV4KTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRyZXR1cm4gdmVydGV4O1xuXHRcdH0sXG5cblx0XHRyZW1vdmVWZXJ0ZXgodmVydGV4KSB7XG5cdFx0XHRpZiAodmVydGV4KSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmVydGV4ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHZlcnRleCA9IHRoaXMudmVydGljZXNbdmVydGV4XTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2ZXJ0ZXguZGVzdHJveSgpO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdO1xuXHRcdFx0XHRkZWxldGUgdGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhdO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3ZlcnRleC1yZW1vdmVkJywgdmVydGV4KTtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YWRkRWRnZShlZGdlKSB7XG5cdFx0XHRlZGdlLmdyb3VwID0gdGhpcztcblx0XHRcdHRoaXMuZWRnZXNbZWRnZS5pZF0gPSBlZGdlO1xuXHRcdFx0ZWRnZS5ncmFwaElkID0gdGhpcy5pZCArICc6JyArIGVkZ2UuaWQ7XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5fcF9kM19lZGdlc1tlZGdlLmdyYXBoSWRdID0gZWRnZTtcblx0XHRcdHRoaXMudHJpZ2dlcignZWRnZS1hZGRlZCcsIGVkZ2UpO1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdHJldHVybiBlZGdlO1xuXHRcdH0sXG5cblx0XHRyZW1vdmVFZGdlKGVkZ2UpIHtcblx0XHRcdGlmIChlZGdlKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmVydGV4ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdGVkZ2UgPSB0aGlzLmVkZ2VzW2VkZ2VdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVkZ2UuZGVzdHJveSgpO1xuXHRcdFx0XHRkZWxldGUgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuZWRnZXNbZWRnZS5pZF07XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignZWRnZS1yZW1vdmVkJywgZWRnZSk7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHJlbW92ZUFsbEVkZ2VzQW5kVmVydGljZXMoKSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmVkZ2VzKS5mb3JFYWNoKChlZGdlSWQpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuZWRnZXNbZWRnZUlkXSkgeyB0aGlzLnJlbW92ZUVkZ2UodGhpcy5lZGdlc1tlZGdlSWRdKTsgfVxuXHRcdFx0fSk7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnZlcnRpY2VzKS5mb3JFYWNoKCh2ZXJ0ZXhJZCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhJZF0pIHsgdGhpcy5yZW1vdmVWZXJ0ZXgodGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhJZF0pOyB9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0fVxuXG5cdH0sIHtcblx0XHRncmF2aXR5RmFjdG9yOiAxLFxuXHRcdGNoYXJnZUZhY3RvcjogMSxcblx0XHRsaW5rRGlzdGFuY2VGYWN0b3I6IDEsXG5cdFx0cmVnaW9uOiB7IC8vIHRoZSB3aG9sZSBjYW52YXMgd2l0aCBhIHNtYWxsIHBhZGRpbmdcblx0XHRcdHRvcDogMTAsXG5cdFx0XHRsZWZ0OiAxMCxcblx0XHRcdGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuY2lyY3VpdGJvYXJkLnNpemUud2lkdGggLSAyMCB9LFxuXHRcdFx0Z2V0IGhlaWdodCgpIHsgcmV0dXJuIHRoaXMuY2lyY3VpdGJvYXJkLnNpemUuaGVpZ2h0IC0gMjAgfVxuXHRcdH1cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL0QzR3JvdXAuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdiYWNvbicsICdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4J10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBrZXlzLmZpbmRJbmRleCgoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL21pc2MuanMnLFxuXHQnLi9iYWNvbi1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL3VuaXF1ZS1pZC5qcycsXG5cdCcuL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgQmFjb25TaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAZXhwb3J0IEBjbGFzcyBBcnRlZmFjdCBAZXh0ZW5kcyBCYWNvblNpZ25hbEhhbmRsZXJ9XG5cdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggQmFjb24uanMuXG5cdCAqL1xuXHR2YXIgQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEJhY29uU2lnbmFsSGFuZGxlciwgZnVuY3Rpb24gQXJ0ZWZhY3Qoc3VwZXJGbiwgb3B0aW9ucykge1xuXHRcdHN1cGVyRm4oKTtcblxuXHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudH0gPSB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHNldCBoaWVyYXJjaHkgc3R1ZmYgKi9cblx0XHR0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuXHRcdHRoaXMuX3R5cGUgPSB0eXBlO1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHRcdGlmIChwYXJlbnQpIHsgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpIH1cblxuXHRcdC8qIGNyZWF0ZSBldmVudHMgKi9cblx0XHR0aGlzLm5ld0V2ZW50KCdkZXN0cm95Jyk7XG5cblx0fSwgLyoqIEBsZW5kcyBBcnRlZmFjdC5wcm90b3R5cGUgKi8ge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgcHJvdmlkZWQgdGhyb3VnaCB0aGUgY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnMgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB1bmlxdWUgaWRlbnRpZmllciBiZWxvbmdpbmcgdG8gdGhpcyBhcnRlZmFjdFxuXHRcdCAqL1xuXHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdHlwZSBvZiB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgcGFyZW50IG9mIHRoaXMgYXJ0ZWZhY3QsIHVubGVzcyB0aGlzIGlzIHRoZSByb290XG5cdFx0ICovXG5cdFx0Z2V0IHBhcmVudCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IGNoaWxkcmVuKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIChwYXJlbnQsIHBhcmVudCdzIHBhcmVudCwgLi4uKVxuXHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gdHlwZSwgdW5sZXNzIHRoZXJlIGlzIG5vbmVcblx0XHQgKi9cblx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnQgKGNoaWxkcmVuLCBjaGlsZHJlbidzIGNoaWxkcmVuLCAuLi4pXG5cdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50cyBvZiB0aGUgZ2l2ZW4gdHlwZTsgbm9uZSBvZiB0aGVtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVzY2VuZGFudCBmcm9tIGFueSBvdGhlclxuXHRcdCAqL1xuXHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBJbmRpY2F0ZSB0aGF0IHRoaXMgYXJ0ZWZhY3Qgd2lsbCBuZXZlciBiZSB1c2VkIGFnYWluLCBhbGxvd2luZyBpdFxuXHRcdCAqIHRvIGRvIGFueSBuZWNlc3NhcnkgY2xlYW51cC5cblx0XHQgKi9cblx0XHRkZXN0cm95KCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmRlc3Ryb3koKSB9KTtcblx0XHR9XG5cblx0fSkpO1xuXG5cblx0LyoqIHtAZnVuY3Rpb24gQXJ0ZWZhY3QubmV3U3ViY2xhc3N9XG5cdCAqIEEgc3RhdGljIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1YmNsYXNzIG9mIHtAbGluayBBcnRlZmFjdH0uXG5cdCAqL1xuXHRBcnRlZmFjdC5uZXdTdWJjbGFzcyA9IGZ1bmN0aW9uIG5ld1N1YkNsYXNzKG5hbWUsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXHRcdHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKEFydGVmYWN0LCBmdW5jdGlvbiAoc3VwZXJGbiwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucyAqL1xuXHRcdFx0dmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0T2JqZWN0LmtleXMob3B0aW9uRGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRwcm9jZXNzZWRPcHRpb25zLnR5cGUgPSBuYW1lO1xuXG5cdFx0XHQvKiBjYWxsIHN1cGVyLWNvbnN0cnVjdG9yICovXG5cdFx0XHRzdXBlckZuKFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0LyogY2FsbCB0aGlzIGNvbnN0cnVjdG9yICovXG5cdFx0XHRjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0Z2V0IGNpcmN1aXRib2FyZCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcblx0XHRcdH1cblx0XHR9KSkpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEFydGVmYWN0O1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9hcnRlZmFjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25cIixcImNvbW1vbmpzXCI6XCJiYWNvblwiLFwiYW1kXCI6XCJiYWNvblwifVxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIkFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcIlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdiYWNvbiddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24pIHtcblxuXG5cdC8qKiB7QGV4cG9ydH17QGNsYXNzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBCYWNvbi5qcy5cblx0ICovXG5cdHZhciBCYWNvblNpZ25hbEhhbmRsZXIgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEJhY29uU2lnbmFsSGFuZGxlcigpIHtcblxuXHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuXG5cdH0sIC8qKiBAbGVuZHMgQmFjb25TaWduYWxIYW5kbGVyLnByb3RvdHlwZSAqLyB7XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEZWNsYXJlcyBhIG5ldyBldmVudCBzdHJlYW0gZm9yIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICBuYW1lICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50LCB1c2VkIHRvIHRyaWdnZXIgb3Igc3Vic2NyaWJlIHRvIGl0XG5cdFx0ICogQHBhcmFtICB7QmFjb24uRXZlbnRTdHJlYW19IFtzb3VyY2VdIC0gYW5vdGhlciBldmVudCBzdHJlYW0gdG8gYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoaXMgZXZlbnRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLkJ1c30gLSB0aGUgY3JlYXRlZCBldmVudCBzdHJlYW1cblx0XHQgKi9cblx0XHRuZXdFdmVudChuYW1lLCB7c291cmNlfSA9IHt9KSB7XG5cdFx0XHQvKiBpcyB0aGUgZXZlbnQgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBldmVudCBzdHJlYW0gKi9cblx0XHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRpZiAoc291cmNlKSB7IGJ1cy5wbHVnKHNvdXJjZSkgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cy5uYW1lKG5hbWUpO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhbiBldmVudCBzdHJlYW0gYnkgbmFtZS4gSWYgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSBpcyBnaXZlbiwgYSBzdHJlYW1cblx0XHQgKiBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoYXQgcHJvcGVydHkgaXMgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7QmFjb24uRXZlbnRTdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiByZXR1cm4gaXQgKi9cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGxhemlseSBjcmVhdGVzIGFuZCByZXR1cm5zIHRoaXMgcHJvcGVydHksIHdpdGhcblx0XHQgKiBhbiBlbXB0eSB7QmFjb24uQnVzfSBhdCB0aGUgYmFzZS4gVGhpcyBhbGxvd3MgYSBwcm9wZXJ0eSB0byBiZSByZWZlcmVuY2VkXG5cdFx0ICogYmVmb3JlIGl0IGlzIGRlZmluZWQ6XG5cdFx0ICpcblx0XHQgKiAgICAgICAgICDilZTilZDilZDilZDilZDilZDilZcgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJAgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0XHQgKiAgICDii68g4rip4pSA4pSA4pSA4pWiIEJ1cyDilZ/ilIDilIDilIDilKQgLnRvUHJvcGVydHkoKSDilJzilIDilIDilIDilKQgLm5hbWUoIG5hbWUgKSDilIJcblx0XHQgKiAgICAgICAgICDilZrilZDilZDilZDilZDilZDilZ0gICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJggICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkge1xuXHRcdFx0LyogaWYgaXQgZG9lc24ndCBleGlzdCAqL1xuXHRcdFx0aWYgKCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdKSB7XG5cdFx0XHRcdC8qIGNyZWF0ZSBpdCBub3cgKi9cblx0XHRcdFx0dGhpcy5fcHJvcGVydHlCdXNzZXNbbmFtZV0gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSB0aGlzLl9wcm9wZXJ0eUJ1c3Nlc1tuYW1lXS50b1Byb3BlcnR5KCkubmFtZShuYW1lKTtcblxuXHRcdFx0XHQvKiBhbGxvdyBtb2RpZmllcnMgdG8gYmUgYWRkZWQgdG8gdGhlIHN0cmVhbSAqLyAvLyBUT0RPOiB0ZXN0XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0uYXBwZW5kTW9kaWZpZXIgPSBmdW5jdGlvbiAobW9kaWZpZXIsIC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXVttb2RpZmllcl0uYXBwbHkodGhpcy5fcHJvcGVydGllc1tuYW1lXSwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblxuXHRcdFx0LyogcmV0dXJuIGl0ICovXG5cdFx0XHRyZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgYWN0dWFsbHkgZGVmaW5lcyBhIHByb3BlcnR5IGJ5IGJhY2tpbmdcblx0XHQgKiBgcHJvcGVydHkobmFtZSlgIGJ1cyBhYm92ZSB3aXRoIHRoZSBmb2xsb3dpbmcgY29uc3RydWN0aW9uOlxuXHRcdCAqXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVreKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVrlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVreKUiOKUiOKUiOKUpCAucHVzaCggaW5pdGlhbCApIOKUilxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUij8gIOKVsOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVr1xuXHRcdCAqICAg4pWU4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWXICAgICAgICDilZTilZDilZDilafilZDilZDilZcgICAgICAgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHRcdCAqICAg4pWRIG9ic2VydmFibGUg4pWf4pSA4pSA4pSA4pev4rip4pSA4pSA4pSA4pWiIEJ1cyDilZ/ilIDilIDilIDilIDilIDilIDilIDilIDilKQgLnNraXBEdXBsaWNhdGVzKCBpc0VxdWFsICkg4pSc4pSA4pSA4pSA4pevIOKLr1xuXHRcdCAqICAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdICAgICAgICDilZrilZDilZDilaTilZDilZDilZ0gICAgICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUiiogIOKVreKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVrlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVsOKUiOKUiOKUiOKUpCAucHVzaCggbmV3VmFsdWUgKSDilIpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWw4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pWvXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEBwYXJhbSAge0JhY29uLk9ic2VydmFibGV9ICAgICAgICBbc291cmNlXSAgICAgICAgLSBhIHNvdXJjZSBzdHJlYW0gdG8gYXV0b21hdGljYWxseSBzZXQgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgICAgICAgICAgICBbc2V0dGFibGU9dHJ1ZV0gLSB3aGV0aGVyIHRoZSB2YWx1ZSBjYW4gYmUgbWFudWFsbHkgc2V0IChpZiBgc291cmNlYCBpcyBnaXZlbiwgZGVmYXVsdHMgdG8gZmFsc2UpXG5cdFx0ICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgICAgICAgICAgIFtpbml0aWFsXSAgICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgcHJvcGVydHlcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbigqLCopOkJvb2xlYW59ICAgW2lzRXF1YWxdICAgICAgIC0gYSBwcmVkaWNhdGUgZnVuY3Rpb24gYnkgd2hpY2ggdG8gdGVzdCBmb3IgZHVwbGljYXRlIHZhbHVlc1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uUHJvcGVydHl9IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRuZXdQcm9wZXJ0eShuYW1lLCB7c291cmNlLCBzZXR0YWJsZSwgaW5pdGlhbCwgaXNFcXVhbH0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgcHJvcGVydHkgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSB8fCAhdGhpcy5fcHJvcGVydGllc1tuYW1lXS5fYW15X3BsdWdnZWQsXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGluaXRpYWxpemUgdGhlIHB1YmxpYyBwcm9wZXJ0eSBhbmQgb3V0ZXIgYnVzLCBhbmQgbWFyayBpdCBhcyBwbHVnZ2VkICovXG5cdFx0XHR0aGlzLnByb3BlcnR5KG5hbWUpLl9hbXlfcGx1Z2dlZCA9IHRydWU7XG5cblx0XHRcdC8qIGludGVybmFsIGJ1cywgYWN0aW5nIGFzIGEgaHViIGZvciBhbGwgbmV3IHZhbHVlcyAqL1xuXHRcdFx0dmFyIGlubmVyQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0XHQvKiBpZiBhIHNvdXJjZSBpcyBnaXZlbiwgcGx1ZyBpdCBpbjsgaWYgbm90LCB0aGUgcHJvcGVydHkgYmVjb21lcyBtYW51YWxseSBzZXR0YWJsZSBieSBkZWZhdWx0ICovXG5cdFx0XHRpZiAoc291cmNlKSB7XG5cdFx0XHRcdGlubmVyQnVzLnBsdWcoc291cmNlKTtcblx0XHRcdH0gZWxzZSBpZiAoc2V0dGFibGUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdHNldHRhYmxlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0LyogY2FjaGluZyB0aGUgY3VycmVudCB2YWx1ZSAqL1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHQvKiBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBvYmplY3QgaW50ZXJmYWNlLCB3cml0YWJsZSB0aHJvdWdoIHRoZSBpbnRlcm5hbCBidXMgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBzZXR0YWJsZSA/IHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7IGlubmVyQnVzLnB1c2gobmV3VmFsdWUpIH1cblx0XHRcdH0gOiB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBmaW5pc2ggdXAgdGhlIHByb3BlcnR5IGZvciBwdWJsaWMgY29uc3VtcHRpb24gKi9cblx0XHRcdHZhciBpbm5lclByb3BlcnR5ID0gaW5uZXJCdXMuc2tpcER1cGxpY2F0ZXMoaXNFcXVhbCk7XG5cdFx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3Nlc1tuYW1lXS5wbHVnKGlubmVyUHJvcGVydHkpO1xuXG5cdFx0XHQvKiBrZWVwIG91ciB2YWx1ZSBpbiBzeW5jIHdpdGggdGhlIHN0cmVhbSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0eShuYW1lKS5vblZhbHVlKCh2KSA9PiB7IHZhbHVlID0gdiB9KTtcblxuXHRcdFx0LyogaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGluaXRpYWwpKSB7IGlubmVyQnVzLnB1c2goaW5pdGlhbCkgfVxuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFsbCBzdWJzY3JpYmVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gdHJpZ2dlclxuXHRcdCAqIEB2YWx1ZSB7Kn0gICAgICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBhdHRhY2ggdG8gdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlcihuYW1lLCB2YWx1ZSkge1xuXHRcdFx0LyogZG9lcyB0aGUgZXZlbnQgc3RyZWFtIGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0ucHVzaCh2YWx1ZSk7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNlbGVjdHMgYW4gZXhpc3Rpbmcgc3RyZWFtIG9yIHByb3BlcnR5LCBhbmQgdGhlblxuXHRcdCAqIGVpdGhlciByZXR1cm5zIGl0LCBvciBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHRvIGl0LCBkZXBlbmRpbmdcblx0XHQgKiBvbiB3aGV0aGVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQuXG5cdFx0ICpcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgb3IgcHJvcGVydHkgdG8gc3Vic2NyaWJlIHRvXG5cdFx0ICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgICBbZXhwZWN0ZWRWYWx1ZV0gICAgICAtIGlmIHByb3ZpZGVkLCBmaWx0ZXJzIHRoZSBzdHJlYW0gYnkgPT09IGVxdWFsaXR5IHdpdGggdGhpcyB2YWx1ZTtcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAtIGEgcGxhaW4gb2JqZWN0IGZvciBwcm92aWRpbmcgYWRkaXRpb25hbCBvcHRpb25zXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICBbb3B0aW9ucy5vbmNlPWZhbHNlXSAtIHdoZXRoZXIgdGhlIHN0cmVhbSBlbmRzIGFmdGVyIG9uZSBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6dm9pZH0gW2NhbGxiYWNrXSAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dm9pZH0gLSBpZiBubyBgY2FsbGJhY2tgIGlzIHByb3ZpZGVkLCB0aGUgc3BlY2lmaWVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHByb3BlcnR5OyBvdGhlcndpc2UsIGEgZnVuY3Rpb24gdG8gdW5zdWJzY3JpYmUgdG8gc2FpZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaXMgYSBzaG9ydGhhbmQgZm9yIHRoZSB7QGxpbmsgb259IG1ldGhvZCB3aXRoIHRoZSBgb25jZWAgb3B0aW9uIGVuYWJsZWQuXG5cdFx0ICogSW4gb3RoZXIgd29yZHMsIGFueSBzdHJlYW0gcmV0dXJuZWQgd2lsbCBzZW5kIG9ubHkgb25lIGV2ZW50LCBhbmQgYW55IGNhbGxiYWNrXG5cdFx0ICogcHJvdmlkZWQgd2lsbCBvbmx5IGZpcmUgb25jZS5cblx0XHQgKi9cblx0XHRvbmUobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhcmdzT2JqID0gdGhpcy5fZ2F0aGVyT25Bcmd1bWVudHMobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXHRcdFx0VS5vYmplY3QoYXJnc09iaiwgJ29wdGlvbnMnKS5vbmNlID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSBvciB7QGxpbmsgb25lfSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucy5vbmNlICovXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uY2UpIHsgcmVzdWx0ID0gcmVzdWx0LnRha2UoMSkgfVxuXG5cdFx0XHQvKiBwcm9jZXNzIGNhbGxiYWNrICovXG5cdFx0XHRpZiAoY2FsbGJhY2spIHsgcmVzdWx0ID0gcmVzdWx0Lm9uVmFsdWUoY2FsbGJhY2spIH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFByb2Nlc3MgdGhlIGFyZ3VtZW50cyBhY2NlcHRlZCBieSB7QGxpbmsgb259IGFuZCB7QGxpbmsgb25lfS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfZ2F0aGVyT25Bcmd1bWVudHMoLi4uYXJncykge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHsgbmFtZTogYXJncy5zaGlmdCgpIH07XG5cblx0XHRcdC8qIHRlc3QgZm9yIGV4cGVjdGVkIHZhbHVlIGFyZ3VtZW50ICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgIVUuaXNGdW5jdGlvbihhcmdzWzBdKSAmJiAhVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5leHBlY3RlZFZhbHVlID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBvcHRpb25zICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5vcHRpb25zID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBjYWxsYmFjayBmdW5jdGlvbiAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmIFUuaXNGdW5jdGlvbihhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gQmFjb25TaWduYWxIYW5kbGVyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9iYWNvbi1zaWduYWwtaGFuZGxlci5qc1xuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2RlbHRhLWpzJyBdLCBmdW5jdGlvbiAoUCwgRE0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogYWxyZWFkeSBjYWNoZWQ/ICovXG5cdGlmICh3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCkgeyByZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgfVxuXG5cblx0LyogdGVsbCBkZWx0YS5qcyBhYm91dCBibHVlYmlyZCAqL1xuXHRETS5yZWdpc3RlclByb21pc2VSZXNvbHZlcihQLnJlc29sdmUpO1xuXG5cblx0Lyogc2V0IHRoZSBjYWNoZSAqL1xuXHR3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCA9IG5ldyBETSgpO1xuXG5cblx0LyogcmV0dXJuIHRoZSBkZWx0YSBtb2RlbCB0aGF0IG1hbmFnZXMgYWxsIHBsdWdpbnMgKD0gZGVsdGFzKSAqL1xuXHRyZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWw7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJEM0dyb3VwLmpzIn0=