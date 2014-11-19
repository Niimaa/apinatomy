(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), require("jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["bluebird", "jquery", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("bluebird"), require("jquery"), require("delta-js")) : factory(root["P"], root["jQuery"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	    U.extend(this, {
	      vertices: [],
	      edges: []
	    });
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
	      vertex.groupVertexIndex = this.vertices.length;
	      this.vertices.push(vertex);
	      vertex.graphId = vertex.id;
	      this.circuitboard._p_d3_vertices[vertex.graphId] = vertex;
	      this.trigger('vertex-added', vertex);
	      this.circuitboard.updateGraph();
	    },
	    removeVertex: function(vertex) {
	      if (vertex) {
	        delete this.circuitboard._p_d3_vertices[vertex.graphId];
	        U.pull(this.vertices, vertex);
	        this.vertices.forEach(function(vertex, i) {
	          vertex.groupVertexIndex = i;
	        });
	        this.trigger('vertex-removed', vertex);
	        this.circuitboard.updateGraph();
	      }
	    },
	    addEdge: function(edge) {
	      edge.group = this;
	      this.edges.push(edge);
	      edge.graphId = this.id + ':' + edge.id;
	      this.circuitboard._p_d3_edges[edge.graphId] = edge;
	      this.trigger('edge-added', edge);
	      this.circuitboard.updateGraph();
	    },
	    removeEdge: function(edge) {
	      if (edge) {
	        delete this.circuitboard._p_d3_edges[edge.graphId];
	        U.pull(this.edges, edge);
	        this.trigger('edge-removed', edge);
	        this.circuitboard.updateGraph();
	      }
	    },
	    removeAllEdgesAndVertices: function() {
	      var $__0 = this;
	      this.edges.forEach((function(edge) {
	        if (edge) {
	          $__0.removeEdge(edge);
	        }
	      }));
	      this.vertices.forEach((function(vertex) {
	        if (vertex) {
	          $__0.removeVertex(vertex);
	        }
	      }));
	      U.makeEmpty(this.edges);
	      U.makeEmpty(this.vertices);
	      this.circuitboard.updateGraph();
	    },
	    vertexCount: function() {
	      return this.vertices.length;
	    },
	    vertices: function() {
	      return this.vertices.slice();
	    },
	    edges: function() {
	      return this.vertices.slice();
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(3), __webpack_require__(1), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, SignalHandler, uniqueID, dm) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  DM.registerPromiseResolver(P.resolve);
	  return new DM();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMGUzZjJjNzJjOTJlZDYyYTc1ZiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9EM0dyb3VwLmpzIiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9hcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9zaWduYWwtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC91bmlxdWUtaWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWtCLHdCQUFvQixDQUFHLDBDQUFVLEVBQUcsU0FBTztBQUNwRSxjQUFXLENBQUM7QUFHWixRQUFPLFNBQU8sWUFBYSxDQUFDLFNBQVEsQ0FBRyxTQUFTLFFBQU0sQ0FBRSxDQUFFO0FBRXpELFlBQVEsQ0FBQyxJQUFHLENBQUc7QUFDZCxjQUFPLENBQUcsR0FBQztBQUNYLFdBQUksQ0FBRyxHQUFDO0FBQUEsS0FDVCxDQUFDLENBQUM7R0FFSCxDQUFHO0FBRUYsT0FBSSxjQUFZLEVBQVM7QUFBRSxZQUFPLEtBQUcsUUFBUSxjQUFjO0tBQU87QUFDbEUsT0FBSSxhQUFXLEVBQVU7QUFBRSxZQUFPLEtBQUcsUUFBUSxhQUFhO0tBQVE7QUFDbEUsT0FBSSxtQkFBaUIsRUFBSTtBQUFFLFlBQU8sS0FBRyxRQUFRLG1CQUFtQjtLQUFFO0FBRWxFLGFBQVEsQ0FBUixVQUFVLE1BQUssQ0FBRztBQUNqQixVQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsVUFBRyxhQUFhLFlBQWEsRUFBQyxDQUFDO0tBQ2hDO0FBRUEsYUFBUSxDQUFSLFVBQVUsTUFBSyxDQUFHO0FBQ2pCLFlBQUssTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUNuQixZQUFLLGlCQUFpQixFQUFJLEtBQUcsU0FBUyxPQUFPLENBQUM7QUFDOUMsVUFBRyxTQUFTLEtBQU0sQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUMxQixZQUFLLFFBQVEsRUFBSSxPQUFLLEdBQUcsQ0FBQztBQUMxQixVQUFHLGFBQWEsZUFBZSxDQUFFLE1BQUssUUFBUSxDQUFDLEVBQUksT0FBSyxDQUFDO0FBQ3pELFVBQUcsUUFBUyxDQUFDLGNBQWEsQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUNwQyxVQUFHLGFBQWEsWUFBYSxFQUFDLENBQUM7S0FDaEM7QUFFQSxnQkFBVyxDQUFYLFVBQWEsTUFBSyxDQUFHO0FBQ3BCLFVBQUksTUFBSyxDQUFHO0FBQ1gsY0FBTyxLQUFHLGFBQWEsZUFBZSxDQUFFLE1BQUssUUFBUSxDQUFDLENBQUM7QUFDdkQsY0FBTSxDQUFDLElBQUcsU0FBUyxDQUFHLE9BQUssQ0FBQyxDQUFDO0FBQzdCLFlBQUcsU0FBUyxRQUFTLENBQUMsU0FBVSxNQUFLLENBQUcsR0FBRztBQUMxQyxnQkFBSyxpQkFBaUIsRUFBSSxHQUFDO1NBQzVCLENBQUMsQ0FBQztBQUNGLFlBQUcsUUFBUyxDQUFDLGdCQUFlLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDdEMsWUFBRyxhQUFhLFlBQWEsRUFBQyxDQUFDO09BQ2hDO0FBQUEsS0FDRDtBQUVBLFdBQU0sQ0FBTixVQUFRLElBQUcsQ0FBRztBQUNiLFVBQUcsTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUNqQixVQUFHLE1BQU0sS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQ3JCLFVBQUcsUUFBUSxFQUFJLEtBQUcsR0FBRyxFQUFJLElBQUUsRUFBSSxLQUFHLEdBQUcsQ0FBQztBQUN0QyxVQUFHLGFBQWEsWUFBWSxDQUFFLElBQUcsUUFBUSxDQUFDLEVBQUksS0FBRyxDQUFDO0FBQ2xELFVBQUcsUUFBUyxDQUFDLFlBQVcsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUNoQyxVQUFHLGFBQWEsWUFBYSxFQUFDLENBQUM7S0FDaEM7QUFFQSxjQUFTLENBQVQsVUFBVyxJQUFHLENBQUc7QUFDaEIsVUFBSSxJQUFHLENBQUc7QUFDVCxjQUFPLEtBQUcsYUFBYSxZQUFZLENBQUUsSUFBRyxRQUFRLENBQUMsQ0FBQztBQUNsRCxjQUFNLENBQUMsSUFBRyxNQUFNLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDeEIsWUFBRyxRQUFTLENBQUMsY0FBYSxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQ2xDLFlBQUcsYUFBYSxZQUFhLEVBQUMsQ0FBQztPQUNoQztBQUFBLEtBQ0Q7QUFFQSw2QkFBd0IsQ0FBeEIsVUFBMEI7O0FBQ3pCLFVBQUcsTUFBTSxRQUFTLEVBQUMsU0FBQyxJQUFHLENBQU07QUFDNUIsWUFBSSxJQUFHLENBQUc7QUFBRSx5QkFBZSxDQUFDLElBQUcsQ0FBQyxDQUFDO1NBQUU7QUFBQSxPQUNwQyxFQUFDLENBQUM7QUFDRixVQUFHLFNBQVMsUUFBUyxFQUFDLFNBQUMsTUFBSyxDQUFNO0FBQ2pDLFlBQUksTUFBSyxDQUFHO0FBQUUsMkJBQWlCLENBQUMsTUFBSyxDQUFDLENBQUM7U0FBRTtBQUFBLE9BQzFDLEVBQUMsQ0FBQztBQUNGLGlCQUFXLENBQUMsSUFBRyxNQUFNLENBQUMsQ0FBQztBQUN2QixpQkFBVyxDQUFDLElBQUcsU0FBUyxDQUFDLENBQUM7QUFDMUIsVUFBRyxhQUFhLFlBQWEsRUFBQyxDQUFDO0tBQ2hDO0FBRUEsZUFBVSxDQUFWLFVBQVksQ0FBRTtBQUFFLFlBQU8sS0FBRyxTQUFTLE9BQU87S0FBRTtBQUU1QyxZQUFPLENBQVAsVUFBUyxDQUFFO0FBQUUsWUFBTyxLQUFHLFNBQVMsTUFBTyxFQUFDO0tBQUU7QUFFMUMsU0FBSSxDQUFKLFVBQU0sQ0FBRTtBQUFFLFlBQU8sS0FBRyxTQUFTLE1BQU8sRUFBQztLQUFFO0FBQUEsR0FFeEMsQ0FBRztBQUNGLGlCQUFZLENBQUc7QUFDZixnQkFBVyxDQUFHO0FBQ2Qsc0JBQWlCLENBQUc7QUFDcEIsVUFBSyxDQUFHO0FBQ1AsU0FBRSxDQUFHLEdBQUM7QUFDTixVQUFHLENBQUcsR0FBQztBQUNQLFNBQUksTUFBSSxFQUFJO0FBQUUsY0FBTyxLQUFHLGFBQWEsS0FBSyxNQUFNLEVBQUksR0FBQztPQUFFO0FBQ3ZELFNBQUksT0FBSyxFQUFJO0FBQUUsY0FBTyxLQUFHLGFBQWEsS0FBSyxPQUFPLEVBQUksR0FBQztPQUFFO0FBQUEsS0FDMUQ7QUFBQSxHQUNELENBQUMsQ0FBQztBQUdILEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztpRUM5RkEsaUNBQVEsdUJBQVUsbUNBQUcsUUFBQztBQUNyQixjQUFXLENBQUM7QUFFUixTQUFJO0FBR1AsWUFBTyxDQUFQLFVBQVMsV0FBVSxDQUFHLFVBQVE7QUFDN0IsZUFBUSxFQUFJLFVBQVEsR0FBSyxHQUFDLENBQUM7QUFDdkIsYUFBRSxFQUFJLFVBQWdCLENBQUc7QUNQcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRE03RSxtQkFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQzlCLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDekIsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUdBLGVBQVUsQ0FBVixVQUFZLFVBQVMsQ0FBRyxZQUEwQjtTQUFiLFVBQVEsNkNBQUksR0FBQztBQUM3QyxhQUFFLEVBQUksVUFBZ0IsQ0FBRztBQ2pCcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRGdCN0UsbUJBQVUsTUFBTyxDQUFDLElBQUcsQ0FBRyxFQUFDLFVBQVMsVUFBVSxZQUFZLEtBQU0sQ0FBQyxJQUFHLENBQUMsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztPQUNwRixDQUFDO0FBQ0QsU0FBRSxVQUFVLEVBQUksT0FBSyxPQUFRLENBQUMsVUFBUyxVQUFVLENBQUMsQ0FBQztBQUNuRCxjQUFRLENBQUMsR0FBRSxVQUFVLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDbEMsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUtBLFVBQUssQ0FBTCxVQUFPLElBQVk7QUU3QlQsV0FBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9DLENBQ2hFLE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELGFBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUY0QmxHLFVBQUcsUUFBUyxFQUFDLFNBQUMsR0FBRSxDQUFNO0FBQ3JCLGFBQVMsT0FBRSxHQUFLLElBQUUsQ0FBRztBQUNwQixjQUFJLEdBQUUsZUFBZ0IsQ0FBQyxHQUFFLENBQUMsQ0FBRztBQUM1QixrQkFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxJQUFFLENBQUcsT0FBSyx5QkFBMEIsQ0FBQyxHQUFFLENBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztXQUM1RTtBQUFBLFNBQ0Q7QUFBQSxPQUNELEVBQUMsQ0FBQztBQUNGLFlBQU8sS0FBRyxDQUFDO0tBQ1o7QUFJQSxTQUFJLENBQUosVUFBTSxJQUFHO0FBQUssY0FBTyxTQUFDLEdBQUUsQ0FBTTtBQUFFLGNBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQztPQUFFO0tBQUU7QUFJbkQsUUFBRyxDQUFILFVBQUssRUFBVSxDQUFHO0FFOUNSLFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FGNEMvRSxZQUFPLEdBQUMsTUFBTyxDQUFDLFNBQVEsQ0FBRyxLQUFHLENBQUM7S0FBRTtBQUlyRCxVQUFLLENBQUwsVUFBTyxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQ2pCLFVBQUksYUFBYSxDQUFDLEdBQUUsQ0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFHO0FBQUUsV0FBRSxDQUFFLElBQUcsQ0FBQyxFQUFJLEdBQUM7T0FBRTtBQUMvQyxZQUFPLElBQUUsQ0FBRSxJQUFHLENBQUMsQ0FBQztLQUNqQjtBQUlBLFNBQUksQ0FBSixVQUFNLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDaEIsVUFBSSxhQUFhLENBQUMsR0FBRSxDQUFFLElBQUcsQ0FBQyxDQUFDLENBQUc7QUFBRSxXQUFFLENBQUUsSUFBRyxDQUFDLEVBQUksR0FBQztPQUFFO0FBQy9DLFlBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBR0EsUUFBRyxDQUFILFVBQUssR0FBRSxDQUFHLElBQUUsQ0FBRztBQUNWLGFBQUksSUFBRSxRQUFTLENBQUMsR0FBRSxDQUFDLENBQUM7QUFDeEIsVUFBSSxLQUFNLEVBQUMsRUFBRztBQUFFLFdBQUUsT0FBUSxDQUFDLEVBQUM7T0FBRTtBQUFBLEtBQy9CO0FBR0EsYUFBUSxDQUFSLFVBQVUsR0FBRSxDQUFHO0FBQ2QsYUFBTyxHQUFFLE9BQU8sRUFBSSxHQUFHO0FBQUUsV0FBRSxJQUFLLEVBQUM7T0FBRTtBQUFBLEtBQ3BDO0FBR0EsU0FBSSxDQUFKLFVBQU0sRUFBQyxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUc7QUFBRSxZQUFPLEdBQUMsS0FBSyxNQUFPLENBQUMsRUFBQyxDQUFHLEVBQUMsR0FBRSxDQUFDLE9BQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQztLQUFFO0FBR3BFLFFBQUcsQ0FBSCxVQUFLLEdBQUUsQ0FBRyxFQUFTLENBQUc7QUU3RVosV0FBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9DLENBQ2hFLE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELGFBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUYyRTNFLFlBQU8sUUFBTyxDQUFDLEdBQUUsQ0FBRSxFQUFDLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBQztLQUFFO0FBSTFELG9CQUFlLENBQWYsVUFBaUIsYUFBWSxDQUFHLEtBQUcsQ0FBRztBQUNqQywwQkFBZSxFQUFJLGNBQVksS0FBSyxNQUFPLENBQUMsYUFBWSxDQUFHLEVBQUMsSUFBRyxDQUFDLE9BQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25GLFlBQU8sSUFBSSxpQkFBZ0IsRUFBQyxDQUFDO0tBQzlCO0FBSUEsVUFBSyxDQUFMLFVBQU8sU0FBUSxDQUFHLFFBQU0sQ0FBRztBQUMxQixVQUFJLENBQUMsU0FBUSxDQUFHO0FBQUUsYUFBTSxJQUFJLE1BQUssQ0FBQyxPQUFNLEdBQUssbUJBQWlCLENBQUM7T0FBRTtBQUFBLEtBQ2xFO0FBR0EsZUFBVSxDQUFWLFVBQVksR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHckQsYUFBUSxDQUFSLFVBQVUsR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHbkQsYUFBUSxDQUFSLFVBQVUsR0FBRTtBQUFLLFlBQU8sT0FBSyxLQUFNLENBQUMsR0FBRSxDQUFDLElBQUssRUFBQyxZQUFFO2NBQUssSUFBRSxDQUFFLEdBQUUsQ0FBQztPQUFBLEVBQUM7S0FBRTtBQUc5RCxrQkFBYSxDQUFiLFVBQWUsT0FBTSxDQUFHO0FBQ3ZCLFVBQUksT0FBTSxJQUFLLENBQUMsVUFBUyxDQUFDLElBQU0sU0FBTyxDQUFHO0FBQ3pDLGVBQU0sSUFBSyxDQUFDLFVBQVMsQ0FBRyxXQUFTLENBQUMsQ0FBQztPQUNwQztBQUFBLEtBQ0Q7QUFHQSxTQUFJLENBQUosVUFBYyxDQUFHO0FDN0dQLFdBQVMsWUFBb0IsR0FBQztBQUFHLGdCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUQ0RzlFLFdBQVMsT0FBSSxHQUFHLElBQUksT0FBSyxPQUFPLENBQUcsS0FBSyxHQUFHO0FBQzFDLFlBQUksV0FBVyxDQUFDLE1BQUssQ0FBRSxFQUFDLENBQUMsQ0FBRztBQUFFLGdCQUFPLE9BQUssQ0FBRSxFQUFDO1NBQUU7QUFBQSxPQUNoRDtBQUFBLEtBQ0Q7QUFLQSxZQUFPLENBQVAsVUFBUyxJQUFHLENBQUcsS0FBRyxDQUFHLFFBQU07QUFDdEIsaUJBQU0sQ0FBQztBQUNYLFlBQU8sVUFBZ0I7QUN4SGQsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBO0FEdUh6RSxtQkFBTSxJQUFJLFNBQUMsQ0FBSztBQUNuQixpQkFBTSxFQUFJLEtBQUcsQ0FBQztBQUNkLGNBQUcsTUFBTyxDQUFDLE9BQU0sUUFBUSxDQUFHLEtBQUcsQ0FBQyxDQUFDO1NBQ2xDLEVBQUM7QUFDRCxvQkFBWSxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3JCLGVBQU0sRUFBSSxXQUFVLENBQUMsT0FBTSxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQ3BDLENBQUM7S0FDRjtBQUlBLHNCQUFpQixDQUFqQixVQUFtQixFQUFDLENBQUcsUUFBTTtBQUN4QixjQUFHLEVBQUksTUFBSSxDQUFDO0FBRWhCLGNBQVMsWUFBVSxDQUFFLENBQUU7QUFDdEIsVUFBQyxNQUFPLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDakIsWUFBSSxJQUFHLENBQUc7QUFBRSxpQkFBSztTQUFFO0FBQ25CLDZCQUFxQixDQUFDLFdBQVUsQ0FBQyxDQUFDO09BQ25DO0FBRUEsaUJBQVcsRUFBQyxDQUFDO0FBRVQsdUJBQVksSUFBSSxTQUFDLENBQUs7QUFDekIsWUFBSSxhQUFZLGdCQUFnQixDQUFHO0FBQ2xDLHVCQUFZLGdCQUFnQixFQUFJLE1BQUksQ0FBQztBQUNyQyxnQkFBTyxjQUFZLGNBQWMsQ0FBQztBQUNsQyxjQUFHLEVBQUksS0FBRyxDQUFDO1NBQ1o7QUFBQSxPQUNELEVBQUM7QUFDRCxtQkFBWSxnQkFBZ0IsRUFBSSxLQUFHLENBQUM7QUFDcEMsbUJBQVksY0FBYyxJQUFJLFNBQUMsVUFBUyxDQUFNO0FBQzdDLGtCQUFVLENBQUMsYUFBWSxDQUFDLENBQUM7QUFDekIsY0FBTyxjQUFZLENBQUM7T0FDckIsRUFBQztBQUNELFlBQU8sY0FBWSxDQUFDO0tBQ3JCO0FBR0EsZ0JBQVcsQ0FBWCxVQUFhLElBQUcsQ0FBRyxRQUFNO0FBQ3BCLG1CQUFRLEVBQUksS0FBRyxDQUFDO0FBQ2hCLGdCQUFLLEVBQUksVUFBZ0I7QUNqS3BCLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QURnSzdFLFlBQUksU0FBUSxDQUFHO0FBQ2QsbUJBQVEsRUFBSSxNQUFJLENBQUM7QUFDakIsb0JBQVUsRUFBQyxTQUFDLENBQUs7QUFBRSxxQkFBUSxFQUFJLEtBQUc7V0FBRSxFQUFHLEdBQUMsQ0FBQztBQUN6QyxjQUFHLE1BQU8sQ0FBQyxPQUFNLEdBQUssS0FBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO1NBQ2xDO0FBQUEsT0FDRCxDQUFDO0FBQ0QsWUFBSyxvQkFBb0IsSUFBSSxTQUFDLENBQUs7QUFDbEMsaUJBQVEsRUFBSSxLQUFHLENBQUM7T0FDakIsRUFBQztBQUNELFlBQU8sT0FBSyxDQUFDO0tBQ2Q7QUFPQSxVQUFLLENBQUwsVUFBTyxJQUFrQjs7QUFBakIsa0JBQU87QUFBRyxpQkFBTTtBQUd2QixhQUFNLEVBQUksUUFBTSxHQUFLLEdBQUMsU0FBQyxFQUFHO2NBQU0sRUFBQyxLQUFNLEdBQUM7T0FBQSxFQUFDLENBQUM7QUFHdEMsZUFBSSxDQUFDO0FBR1QsY0FBUyxjQUFZLENBQUU7QUFDbEIsb0JBQU8sRUFBSSxTQUFRLEVBQUMsQ0FBQztBQUNyQixvQkFBTyxFQUFJLE1BQUksQ0FBQztBQUNwQixZQUFJLENBQUMsT0FBTyxDQUFDLFFBQU8sQ0FBRyxTQUFPLENBQUMsQ0FBRztBQUNqQyxlQUFJLEVBQUksU0FBTyxDQUFDO0FBQ2hCLGtCQUFPLFFBQVMsRUFBQyxTQUFDLEVBQUM7a0JBQU0sR0FBRSxDQUFDLFFBQU8sQ0FBRyxTQUFPLENBQUM7V0FBQSxFQUFDLENBQUM7U0FDakQ7QUFBQSxPQUNEO0FBR0ksOEJBQW1CLEVBQUksZUFBYyxDQUFDLGFBQVksQ0FBQyxDQUFDO0FBSXBELGtCQUFPLElBQUksU0FBQyxDQUFLO0FBQ3BCLDRCQUFvQixFQUFDLENBQUM7QUFDdEIsY0FBTyxNQUFJLENBQUM7T0FDYixFQUFDO0FBR0csa0JBQU8sRUFBSSxHQUFDLENBQUM7QUFDakIsY0FBTyxTQUFTLElBQUksU0FBQyxFQUFDLENBQU07QUFDM0IsZ0JBQU8sS0FBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ2pCLGNBQU8sU0FBTyxDQUFDO09BQ2hCLEVBQUM7QUFHRCxjQUFPLG9CQUFvQixJQUFJLFNBQUMsQ0FBSztBQUNwQyw0QkFBbUIsb0JBQXFCLEVBQUMsQ0FBQztPQUMzQyxFQUFDO0FBR0QsMEJBQW9CLEVBQUMsQ0FBQztBQUV0QixZQUFPLFNBQU8sQ0FBQztLQUNoQjtBQUVBLGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRyxPQUFLO0FBQ25CLFlBQU8sVUFBZ0I7QUNsT2QsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRGlPN0UsY0FBTyxJQUFJLEVBQUMsRUFBQyxTQUFDLE9BQU0sQ0FBRyxPQUFLLENBQU07QUFDakMsYUFBSTtBQUNILGVBQUUsQ0FBRSxNQUFLLENBQUMsTUFBTyxDQUFDLEdBQUUsQ0FBRyxLQUFHLE9BQVEsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDO1dBQzdDLENBQUUsT0FBTyxLQUFJLENBQUc7QUFDZixrQkFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDO1dBQ2Q7QUFBQSxTQUNELEVBQUMsQ0FBQztPQUNILENBQUM7S0FDRjtBQUVBLGlCQUFZLENBQVosVUFBYyxFQUFDLENBQUc7QUFDakIsWUFBTyxVQUFVLENBQUU7QUFDbEIsWUFBSSxFQUFDLE9BQU8sR0FBSyxVQUFRLE9BQU8sQ0FBRztBQUNsQyxnQkFBTyxHQUFDLE1BQU8sQ0FBQyxJQUFHLENBQUcsVUFBUSxDQUFDLENBQUM7U0FDakMsS0FBTztBQUNOLGdCQUFPLFFBQU8sQ0FBQyxFQUFDLENBQUcsS0FBRyxDQUFHLFVBQVEsQ0FBQyxDQUFDO1NBQ3BDO0FBQUEsT0FDRCxDQUFDO0tBQ0Y7QUFBQSxHQUVELENBQUM7QUFJRCxZQUFTLEVBQUksV0FBVSxDQUFDLFNBQVUsR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUM1QyxRQUFHLElBQUksRUFBSSxJQUFFLENBQUM7QUFDZCxRQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7R0FDakIsQ0FBQyxDQUFDO0FBQ0YsWUFBUyxTQUFTLElBQUksU0FBQyxFQUFHLEdBQU07QUFDL0IsVUFBTyxJQUFJLFdBQVUsQ0FBQyxLQUFJLEVBQUksTUFBSSxDQUFHLE9BQUssRUFBSSxPQUFLLENBQUMsQ0FBQztHQUN0RCxFQUFDO0FBQ0QsWUFBUyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDN0IsVUFBTyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxFQUFDLEdBQUssTUFBSSxJQUFNLE1BQUksR0FBSyxPQUFLLElBQU0sT0FBSyxDQUFDO0dBQ2hGLEVBQUM7QUFJRCxRQUFLLEVBQUksV0FBVSxDQUFDLFNBQVUsTUFBSyxDQUFHLE1BQUksQ0FBRztBQUM1QyxRQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsUUFBRyxNQUFNLEVBQUksTUFBSSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNGLFFBQUssT0FBTyxJQUFJLFNBQUMsRUFBRyxHQUFNO0FBQ3pCLFVBQU8sWUFBVyxDQUFDLEVBQUMsR0FBSyxZQUFXLENBQUMsRUFBQyxHQUFLLFNBQU8sSUFBTSxTQUFPLEdBQUssUUFBTSxJQUFNLFFBQU0sQ0FBQztHQUN4RixFQUFDO0FBR0QsUUFBTyxHQUFDO0FBRVQsaUpBQUU7QUFDRjs7Ozs7OztpRUdyUkEsaUNBQVEsdUJBQVUsd0JBQVksd0JBQWEsd0JBQXVCLHdCQUFrQix3QkFBdUIsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsR0FBRyxjQUFZLENBQUcsU0FBTyxDQUFHLEdBQUM7QUFDMUosY0FBVyxDQUFDO0FBR1IsY0FBTyxFQUFJLEdBQUMsR0FBSSxDQUFDLFVBQVMsQ0FBRyxXQUFVLENBQUMsUUFBUyxTQUFPLENBQUUsT0FBTTtBQUNuRSxjQUF5QixLQUFHLFNBQVMsRUFBSSxRQUFNO0FBQTFDLFVBQUM7QUFBRyxZQUFHO0FBQUcsY0FBSyxlQUE0QjtBQUdoRCxRQUFHLElBQUksRUFBSSxHQUFDLEdBQUssU0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQy9CLFFBQUcsTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUNqQixRQUFHLFFBQVEsRUFBSSxPQUFLLENBQUM7QUFDckIsUUFBRyxVQUFVLEVBQUksR0FBQyxDQUFDO0FBQ25CLFFBQUksTUFBSyxDQUFHO0FBQUUsYUFBTyxDQUFDLE1BQUssQ0FBRyxZQUFVLENBQUMsS0FBTSxDQUFDLElBQUcsQ0FBQztLQUFFO0FBQUEsR0FFdkQsQ0FBRztBQUVGLE9BQUksUUFBTSxFQUFJO0FBQUUsWUFBTyxLQUFHLFNBQVM7S0FBRTtBQUVyQyxPQUFJLEdBQUMsRUFBSTtBQUFFLFlBQU8sS0FBRyxJQUFJO0tBQUU7QUFFM0IsT0FBSSxLQUFHLEVBQUk7QUFBRSxZQUFPLEtBQUcsTUFBTTtLQUFFO0FBRS9CLE9BQUksT0FBSyxFQUFJO0FBQUUsWUFBTyxLQUFHLFFBQVE7S0FBRTtBQUVuQyxPQUFJLFNBQU8sRUFBSTtBQUFFLFlBQU8sS0FBRyxVQUFVO0tBQUU7QUFFdkMseUJBQW9CLENBQXBCLFVBQXNCLElBQUcsQ0FBRztBQUN2QixnQkFBSyxFQUFJLEtBQUcsQ0FBQztBQUNqQixRQUFHO0FBQUUsY0FBSyxFQUFJLE9BQUssT0FBTztPQUFFLFFBQVMsTUFBSyxHQUFLLE9BQUssS0FBSyxHQUFLLE9BQUssS0FBSyxJQUFNLEtBQUcsRUFBRTtBQUNuRixZQUFPLE9BQUssQ0FBQztLQUNkO0FBRUEsNEJBQXVCLENBQXZCLFVBQXlCLElBQUc7QUFDdkIsZ0JBQUssRUFBSSxHQUFDLENBQUM7QUFDZixVQUFHLFNBQVMsUUFBUyxFQUFDLFNBQUMsS0FBSSxDQUFNO0FBQ2hDLFlBQUksS0FBSSxLQUFLLElBQU0sS0FBRyxDQUFHO0FBQ3hCLGdCQUFLLEtBQU0sQ0FBQyxLQUFJLENBQUMsQ0FBQztTQUNuQixLQUFPO0FBQ04sZ0JBQUssRUFBSSxPQUFLLE9BQVEsQ0FBQyxLQUFJLHlCQUEwQixDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7QUFBQSxPQUNELEVBQUMsQ0FBQztBQUNGLFlBQU8sT0FBSyxDQUFDO0tBQ2Q7QUFFQSxXQUFNLENBQU4sVUFBUTtBQUNQLFVBQUcsUUFBUyxDQUFDLFNBQVEsQ0FBQyxDQUFDO0FBQ3ZCLFVBQUcsU0FBUyxRQUFTLEVBQUMsU0FBQyxLQUFJLENBQU07QUFBRSxhQUFJLFFBQVMsRUFBQztPQUFFLEVBQUMsQ0FBQztLQUN0RDtHQUVELENBQUMsQ0FBQyxDQUFDO0FBR0gsVUFBUSxDQUFDLFFBQU8sVUFBVSxDQUFHLGNBQVksQ0FBQyxDQUFDO0FBRzNDLFVBQU8sWUFBWSxFQUFJLFNBQVMsWUFBVSxDQUFFLElBQUcsQ0FBRyxZQUErQztPQUFsQyxVQUFRLDZDQUFJLEdBQUM7T0FBRyxlQUFhLDZDQUFJLEdBQUM7QUFDaEcsVUFBTyxHQUFDLEdBQUksQ0FBQyxJQUFHLENBQUcsY0FBYSxDQUFDLFFBQU8sQ0FBRyxVQUFVLE9BQW9CO1NBQVgsUUFBTSw2Q0FBSSxHQUFDO0FBR3BFLDBCQUFlLEVBQUksUUFBTSxDQUFDO0FBQzlCLFlBQUssS0FBTSxDQUFDLGNBQWEsQ0FBQyxRQUFTLEVBQUMsU0FBQyxHQUFFLENBQU07QUFDNUMsWUFBSSxhQUFhLENBQUMsZ0JBQWUsQ0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFHO0FBQ3pDLDBCQUFlLENBQUUsR0FBRSxDQUFDLEVBQUksZUFBYSxDQUFFLEdBQUUsQ0FBQyxDQUFDO1NBQzVDO0FBQUEsT0FDRCxFQUFDLENBQUM7QUFDRixzQkFBZSxLQUFLLEVBQUksS0FBRyxDQUFDO0FBRzVCLGFBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTSxDQUFHLGlCQUFlLENBQUMsQ0FBQyxDQUFDO0FBRzVDLGlCQUFVLEtBQU0sQ0FBQyxJQUFHLENBQUcsaUJBQWUsQ0FBQyxDQUFDO0tBRXpDLENBQUcsU0FBUSxDQUFDLEVBQUMsQ0FBRyxVQUFRLENBQUcsRUFDMUIsR0FBSSxhQUFXLEVBQUk7QUFDbEIsWUFBSSxDQUFDLElBQUcsY0FBYyxDQUFHO0FBQUUsY0FBRyxjQUFjLEVBQUksS0FBRyxzQkFBdUIsQ0FBQyxjQUFhLENBQUM7U0FBRTtBQUMzRixjQUFPLEtBQUcsY0FBYyxDQUFDO09BQzFCLENBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNMLENBQUM7QUFHRCxRQUFPLFNBQU8sQ0FBQztBQUdoQixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUN0RkEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSw0RUFBVyxDQUFDO0FBRVosa0NBQVEsdUJBQVUsd0JBQVcsQ0FBRywwQ0FBVSxFQUFHO0FBRXhDLG1CQUFZLEVBQUksR0FBQyxDQUFDO0FBRXRCLGVBQVksY0FBYyxFQUFJLFNBQVMsY0FBWSxDQUFFLE1BQUssQ0FBRztBQUM1RCxRQUFJLGFBQWEsQ0FBQyxJQUFHLFdBQVcsQ0FBQyxDQUFHO0FBQUUsVUFBRyxXQUFXLEVBQUksR0FBQztLQUFFO0FBQzNELFFBQUksYUFBYSxDQUFDLElBQUcsV0FBVyxDQUFFLE1BQUssQ0FBQyxDQUFDLENBQUc7QUFBRSxVQUFHLFdBQVcsQ0FBRSxNQUFLLENBQUMsRUFBSSxZQUFXLEVBQUM7S0FBRTtBQUN0RixVQUFPLEtBQUcsV0FBVyxDQUFFLE1BQUssQ0FBQyxDQUFDO0dBQy9CLENBQUM7QUFHRCxlQUFZLEdBQUcsRUFBSSxnQkFBZSxDQUFDLFFBQVMsR0FBQyxDQUFFLE1BQUssQ0FBRyxHQUFDOztBQUN2RCxRQUFHLGNBQWUsQ0FBQyxNQUFLLENBQUMsSUFBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQzlCLHFCQUFZLElBQUksU0FBQyxDQUFLO0FBQ3pCLFVBQUksYUFBWSxnQkFBZ0IsQ0FBRztBQUNsQyxxQkFBWSxnQkFBZ0IsRUFBSSxNQUFJLENBQUM7QUFDckMsMEJBQWtCLENBQUMsTUFBSyxDQUFDLE9BQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQztPQUN0QztBQUFBLEtBQ0QsRUFBQztBQUNELGlCQUFZLGdCQUFnQixFQUFJLEtBQUcsQ0FBQztBQUNwQyxpQkFBWSxjQUFjLElBQUksU0FBQyxVQUFTLENBQU07QUFDN0MsZ0JBQVUsQ0FBQyxhQUFZLENBQUMsQ0FBQztBQUN6QixZQUFPLGNBQVksQ0FBQztLQUNyQixFQUFDO0FBQ0QsaUJBQVksa0JBQWtCLElBQUksU0FBQyxVQUFTO0FBQzNDLGdCQUFVLEVBQUMsU0FBQyxHQUFFLENBQU07QUFBRSwwQkFBa0IsQ0FBQyxNQUFLLENBQUMsQ0FBRSxHQUFFLEVBQUksTUFBSSxFQUFJLFNBQU8sQ0FBRSxDQUFDLEVBQUMsQ0FBQztPQUFFLEVBQUMsQ0FBQztBQUMvRSxZQUFPLGNBQVksQ0FBQztLQUNyQixFQUFDO0FBQ0QsVUFBTyxjQUFZLENBQUM7R0FDckIsQ0FBQyxDQUFDO0FBQ0YsZUFBWSxRQUFRLEVBQUksZ0JBQWUsQ0FBQyxRQUFTLFFBQU0sQ0FBRSxNQUFLLENBQUcsaUJBQWUsQ0FBRyxHQUFDO0FBQ25GLFVBQU8sS0FBRyxHQUFJLENBQUMsTUFBSyxHQUFHLFNBQUMsS0FBSSxDQUFNO0FBQ2pDLFVBQUksS0FBSSxJQUFNLGlCQUFlLENBQUc7QUFBRSxVQUFFLEVBQUM7T0FBRTtBQUFBLEtBQ3hDLEVBQUMsQ0FBQztHQUNILENBQUMsQ0FBQztBQUdGLGVBQVksSUFBSSxFQUFJLGdCQUFlLENBQUMsUUFBUyxJQUFFLENBQUUsTUFBSyxDQUFHLEdBQUM7QUFDckQscUJBQVksRUFBSSxLQUFHLEdBQUksQ0FBQyxNQUFLLENBQUcsVUFBZ0IsQ0FBRztBTHZDN0MsV0FBUyxVQUFvQixHQUFDO0FBQUcsZ0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELGtCQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBS3NDOUUsbUJBQWEsRUFBQyxDQUFDO0FBQ2YsUUFBQyxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0tBQ3JCLENBQUMsQ0FBQztBQUNGLFVBQU8sY0FBWSxDQUFDO0dBQ3JCLENBQUMsQ0FBQztBQUNGLGVBQVksU0FBUyxFQUFJLGdCQUFlLENBQUMsUUFBUyxTQUFPLENBQUUsTUFBSyxDQUFHLGlCQUFlLENBQUcsR0FBQztBQUNqRixxQkFBWSxFQUFJLEtBQUcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLEtBQUksQ0FBTTtBQUM5QyxVQUFJLEtBQUksSUFBTSxpQkFBZSxDQUFHO0FBQy9CLHFCQUFhLEVBQUMsQ0FBQztBQUNmLFVBQUUsRUFBQyxDQUFDO09BQ0w7QUFBQSxLQUNELEVBQUMsQ0FBQztBQUNGLFVBQU8sY0FBWSxDQUFDO0dBQ3JCLENBQUMsQ0FBQztBQUVGLGVBQVksS0FBSyxFQUFJLGNBQVksSUFBSSxDQUFDO0FBR3RDLGVBQVksUUFBUSxFQUFJLFNBQVMsUUFBTSxDQUFFLE1BQWMsQ0FBRztBSjFEL0MsU0FBUyxVQUFvQixHQUFDO0FBQUcsZ0JBQW9DLENBQ2hFLE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELFdBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUl5RC9GLGlCQUFRLEVBQUksS0FBRyxjQUFlLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDMUMsUUFBSSxTQUFRLENBQUc7QUFBRSxlQUFRLFNBQVUsQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDO0tBQUU7QUFBQSxHQUNqRCxDQUFDO0FBWUQsZUFBWSxjQUFjLEVBQUksU0FBUyxjQUFZLENBQUUsSUFBK0I7eURBQUQsR0FBQztBQUF4QixlQUFNO0FBQUcsa0JBQVM7QUFHekUsYUFBSSxDQUFDO0FBR1QsVUFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUc7QUFDakMsU0FBRSxDQUFGLFVBQUksQ0FBRTtBQUFFLGNBQU8sTUFBSTtPQUFFO0FBQ3JCLFNBQUUsQ0FBRixVQUFJLFFBQU8sQ0FBRztBQUNULG9CQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLFlBQUksVUFBUyxDQUFHO0FBQUUsa0JBQU8sRUFBSSxXQUFVLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQztTQUFFO0FBQzVELFlBQUksUUFBTyxJQUFNLFNBQU8sQ0FBRztBQUMxQixlQUFJLEVBQUksU0FBTyxDQUFDO0FBQ2hCLGNBQUcsUUFBUyxDQUFDLElBQUcsQ0FBRyxTQUFPLENBQUcsU0FBTyxDQUFDLENBQUM7U0FDdkM7QUFBQSxPQUNEO0FBQUEsS0FDRCxDQUFDLENBQUM7QUFHRixRQUFHLENBQUUsSUFBRyxDQUFDLEVBQUksUUFBTSxDQUFDO0dBRXJCLENBQUM7QUFHRCxlQUFZLFFBQVEsRUFBSSxnQkFBZSxDQUFDLFFBQVMsUUFBTSxDQUFFLFVBQVMsQ0FBRyxHQUFDLENBQUc7QUFFcEUscUJBQVksRUFBSSxLQUFHLEdBQUksQ0FBQyxVQUFTLENBQUcsR0FBQyxDQUFDLENBQUM7QUFHM0MsUUFBSSxXQUFXLENBQUMsSUFBRyxDQUFFLFVBQVMsQ0FBQyxDQUFDLENBQUc7QUFBRSxRQUFFLENBQUMsSUFBRyxDQUFFLFVBQVMsQ0FBQyxDQUFDO0tBQUU7QUFHMUQsVUFBTyxjQUFZLENBQUM7R0FDckIsQ0FBQyxDQUFDO0FBQ0YsZUFBWSxhQUFhLEVBQUksZ0JBQWUsQ0FBQyxRQUFTLGFBQVcsQ0FBRSxNQUFLLENBQUcsaUJBQWUsQ0FBRyxHQUFDO0FBQzdGLFVBQU8sS0FBRyxRQUFTLENBQUMsTUFBSyxHQUFHLFNBQUMsS0FBSSxDQUFNO0FBQ3RDLFVBQUksS0FBSSxJQUFNLGlCQUFlLENBQUc7QUFBRSxVQUFFLEVBQUM7T0FBRTtBQUFBLEtBQ3hDLEVBQUMsQ0FBQztHQUNILENBQUMsQ0FBQztBQUdGLFFBQU8sY0FBWSxDQUFDO0FBRXJCLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztpRUN0SEEsaUNBQU8sQ0FBQyxDQUFHLDBDQUFVLENBQUU7QUFDdEIsY0FBVyxDQUFDO0FBRVIsYUFBTSxFQUFJLEdBQUM7QUFFZixRQUFPLFNBQVMsU0FBTyxDQUFFLE1BQUssQ0FBRztBQUNoQyxhQUFVLE1BQUssR0FBRyxZQUFVLEdBQUMsSUFBRyxFQUFDLFFBQU0sRUFBRSxFQUFHO0dBQzdDLENBQUM7QUFDRixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7aUVDVEEsaUNBQVEsdUJBQVksd0JBQVcsQ0FBRywwQ0FBVSxFQUFHLEdBQUMsQ0FBRztBQUNsRCxjQUFXLENBQUM7QUFJWixJQUFDLHdCQUF5QixDQUFDLFNBQVEsQ0FBQyxDQUFDO0FBSXJDLFFBQU8sSUFBSSxHQUFFLEVBQUMsQ0FBQztBQUdoQixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUNiQSxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYmx1ZWJpcmRcIiwgXCJqcXVlcnlcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJQXCJdLCByb290W1wialF1ZXJ5XCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzBlM2YyYzcyYzkyZWQ2MmE3NWZcbiAqKi8iLCJkZWZpbmUoWycuL3V0aWwvbWlzYy5qcycsICcuL3V0aWwvYXJ0ZWZhY3QuanMnXSwgZnVuY3Rpb24gKFUsIEFydGVmYWN0KSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHJldHVybiBBcnRlZmFjdC5uZXdTdWJjbGFzcygnRDNHcm91cCcsIGZ1bmN0aW9uIEQzR3JvdXAoKSB7XG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHR2ZXJ0aWNlczogW10sXG5cdFx0XHRlZGdlczogW11cblx0XHR9KTtcblxuXHR9LCB7XG5cblx0XHRnZXQgZ3Jhdml0eUZhY3RvcigpICAgICAgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdyYXZpdHlGYWN0b3IgICAgICB9LFxuXHRcdGdldCBjaGFyZ2VGYWN0b3IoKSAgICAgICB7IHJldHVybiB0aGlzLm9wdGlvbnMuY2hhcmdlRmFjdG9yICAgICAgIH0sXG5cdFx0Z2V0IGxpbmtEaXN0YW5jZUZhY3RvcigpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5saW5rRGlzdGFuY2VGYWN0b3IgfSxcblxuXHRcdHNldFJlZ2lvbihyZWdpb24pIHtcblx0XHRcdHRoaXMucmVnaW9uID0gcmVnaW9uO1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHR9LFxuXG5cdFx0YWRkVmVydGV4KHZlcnRleCkge1xuXHRcdFx0dmVydGV4Lmdyb3VwID0gdGhpcztcblx0XHRcdHZlcnRleC5ncm91cFZlcnRleEluZGV4ID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XG5cdFx0XHR0aGlzLnZlcnRpY2VzLnB1c2godmVydGV4KTtcblx0XHRcdHZlcnRleC5ncmFwaElkID0gdmVydGV4LmlkO1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdID0gdmVydGV4O1xuXHRcdFx0dGhpcy50cmlnZ2VyKCd2ZXJ0ZXgtYWRkZWQnLCB2ZXJ0ZXgpO1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHR9LFxuXG5cdFx0cmVtb3ZlVmVydGV4KHZlcnRleCkge1xuXHRcdFx0aWYgKHZlcnRleCkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdO1xuXHRcdFx0XHRVLnB1bGwodGhpcy52ZXJ0aWNlcywgdmVydGV4KTtcblx0XHRcdFx0dGhpcy52ZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uICh2ZXJ0ZXgsIGkpIHtcblx0XHRcdFx0XHR2ZXJ0ZXguZ3JvdXBWZXJ0ZXhJbmRleCA9IGk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3ZlcnRleC1yZW1vdmVkJywgdmVydGV4KTtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YWRkRWRnZShlZGdlKSB7XG5cdFx0XHRlZGdlLmdyb3VwID0gdGhpcztcblx0XHRcdHRoaXMuZWRnZXMucHVzaChlZGdlKTtcblx0XHRcdGVkZ2UuZ3JhcGhJZCA9IHRoaXMuaWQgKyAnOicgKyBlZGdlLmlkO1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXSA9IGVkZ2U7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2VkZ2UtYWRkZWQnLCBlZGdlKTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0fSxcblxuXHRcdHJlbW92ZUVkZ2UoZWRnZSkge1xuXHRcdFx0aWYgKGVkZ2UpIHtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuY2lyY3VpdGJvYXJkLl9wX2QzX2VkZ2VzW2VkZ2UuZ3JhcGhJZF07XG5cdFx0XHRcdFUucHVsbCh0aGlzLmVkZ2VzLCBlZGdlKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdlZGdlLXJlbW92ZWQnLCBlZGdlKTtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0cmVtb3ZlQWxsRWRnZXNBbmRWZXJ0aWNlcygpIHtcblx0XHRcdHRoaXMuZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuXHRcdFx0XHRpZiAoZWRnZSkgeyB0aGlzLnJlbW92ZUVkZ2UoZWRnZSk7IH1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy52ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHtcblx0XHRcdFx0aWYgKHZlcnRleCkgeyB0aGlzLnJlbW92ZVZlcnRleCh2ZXJ0ZXgpOyB9XG5cdFx0XHR9KTtcblx0XHRcdFUubWFrZUVtcHR5KHRoaXMuZWRnZXMpO1xuXHRcdFx0VS5tYWtlRW1wdHkodGhpcy52ZXJ0aWNlcyk7XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuXHRcdH0sXG5cblx0XHR2ZXJ0ZXhDb3VudCgpIHsgcmV0dXJuIHRoaXMudmVydGljZXMubGVuZ3RoIH0sXG5cblx0XHR2ZXJ0aWNlcygpIHsgcmV0dXJuIHRoaXMudmVydGljZXMuc2xpY2UoKSB9LFxuXG5cdFx0ZWRnZXMoKSB7IHJldHVybiB0aGlzLnZlcnRpY2VzLnNsaWNlKCkgfVxuXG5cdH0sIHtcblx0XHRncmF2aXR5RmFjdG9yOiAxLFxuXHRcdGNoYXJnZUZhY3RvcjogMSxcblx0XHRsaW5rRGlzdGFuY2VGYWN0b3I6IDEsXG5cdFx0cmVnaW9uOiB7IC8vIHRoZSB3aG9sZSBjYW52YXMgd2l0aCBhIHNtYWxsIHBhZGRpbmdcblx0XHRcdHRvcDogMTAsXG5cdFx0XHRsZWZ0OiAxMCxcblx0XHRcdGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuY2lyY3VpdGJvYXJkLnNpemUud2lkdGggLSAyMCB9LFxuXHRcdFx0Z2V0IGhlaWdodCgpIHsgcmV0dXJuIHRoaXMuY2lyY3VpdGJvYXJkLnNpemUuaGVpZ2h0IC0gMjAgfVxuXHRcdH1cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL0QzR3JvdXAuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3MoU3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW1N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmJpbmQodGhpcyldLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblxuXHRcdFx0dmFyIHVuc3Vic2NyaWJlRm4gPSAoKSA9PiB7XG5cdFx0XHRcdGlmICh1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCkge1xuXHRcdFx0XHRcdHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkID0gZmFsc2U7XG5cdFx0XHRcdFx0ZGVsZXRlIHVuc3Vic2NyaWJlRm4udW5zdWJzY3JpYmVPbjtcblx0XHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdHVuc3Vic2NyaWJlRm4udW5zdWJzY3JpYmVPbiA9IChzdWJzY3JpYmVyKSA9PiB7XG5cdFx0XHRcdHN1YnNjcmliZXIodW5zdWJzY3JpYmVGbik7XG5cdFx0XHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRvcHRpb25hbEN1cnJ5KGZuKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoZm4ubGVuZ3RoIDw9IGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gVS5iaW5kQShmbiwgdGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEudG9wID09PSBiLnRvcCAmJiBhLmxlZnQgPT09IGIubGVmdDtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL21pc2MuanMnLCAnLi9zaWduYWwtaGFuZGxlci5qcycsICcuL3VuaXF1ZS1pZC5qcycsICcuL21haW4tZGVsdGEtbW9kZWwuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUsIFNpZ25hbEhhbmRsZXIsIHVuaXF1ZUlELCBkbSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld0NsYXNzKGZ1bmN0aW9uIEFydGVmYWN0KG9wdGlvbnMpIHtcblx0XHR2YXIge2lkLCB0eXBlLCBwYXJlbnR9ID0gdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvKiBzZXQgaGllcmFyY2h5IHN0dWZmICovXG5cdFx0dGhpcy5faWQgPSBpZCB8fCB1bmlxdWVJRCh0eXBlKTtcblx0XHR0aGlzLl90eXBlID0gdHlwZTtcblx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5fY2hpbGRyZW4gPSBbXTtcblx0XHRpZiAocGFyZW50KSB7IFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKSB9XG5cblx0fSwge1xuXG5cdFx0Z2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zIH0sXG5cblx0XHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZCB9LFxuXG5cdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHRnZXQgcGFyZW50KCkgeyByZXR1cm4gdGhpcy5fcGFyZW50IH0sXG5cblx0XHRnZXQgY2hpbGRyZW4oKSB7IHJldHVybiB0aGlzLl9jaGlsZHJlbiB9LFxuXG5cdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdHZhciByZXN1bHQgPSB0aGlzO1xuXHRcdFx0ZG8geyByZXN1bHQgPSByZXN1bHQucGFyZW50IH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHRjbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRpZiAoY2hpbGQudHlwZSA9PT0gdHlwZSkge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0ZGVzdHJveSgpIHtcblx0XHRcdHRoaXMudHJpZ2dlcignZGVzdHJveScpO1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4geyBjaGlsZC5kZXN0cm95KCkgfSk7XG5cdFx0fVxuXG5cdH0pKTtcblxuXG5cdFUuZXh0ZW5kKEFydGVmYWN0LnByb3RvdHlwZSwgU2lnbmFsSGFuZGxlcik7XG5cblxuXHRBcnRlZmFjdC5uZXdTdWJjbGFzcyA9IGZ1bmN0aW9uIG5ld1N1YkNsYXNzKG5hbWUsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXHRcdHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKEFydGVmYWN0LCBmdW5jdGlvbiAoc3VwZXJGbiwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucyAqL1xuXHRcdFx0dmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0T2JqZWN0LmtleXMob3B0aW9uRGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRwcm9jZXNzZWRPcHRpb25zLnR5cGUgPSBuYW1lO1xuXG5cdFx0XHQvKiBjYWxsIHN1cGVyLWNvbnN0cnVjdG9yICovXG5cdFx0XHRzdXBlckZuKFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0LyogY2FsbCB0aGlzIGNvbnN0cnVjdG9yICovXG5cdFx0XHRjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0Z2V0IGNpcmN1aXRib2FyZCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcblx0XHRcdH1cblx0XHR9KSkpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEFydGVmYWN0O1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9hcnRlZmFjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFUpIHtcblxuXHR2YXIgU2lnbmFsSGFuZGxlciA9IHt9O1xuXG5cdFNpZ25hbEhhbmRsZXIuX2dldENhbGxiYWNrcyA9IGZ1bmN0aW9uIF9nZXRDYWxsYmFja3Moc2lnbmFsKSB7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQodGhpcy5fY2FsbGJhY2tzKSkgeyB0aGlzLl9jYWxsYmFja3MgPSB7fSB9XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQodGhpcy5fY2FsbGJhY2tzW3NpZ25hbF0pKSB7IHRoaXMuX2NhbGxiYWNrc1tzaWduYWxdID0gJC5DYWxsYmFja3MoKSB9XG5cdFx0cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tzaWduYWxdO1xuXHR9O1xuXG5cdC8qIGhvdyB0byBzdWJzY3JpYmUgdG8gYSBzaWduYWwgKi9cblx0U2lnbmFsSGFuZGxlci5vbiA9IFUub3B0aW9uYWxDdXJyeShmdW5jdGlvbiBvbihzaWduYWwsIGZuKSB7XG5cdFx0dGhpcy5fZ2V0Q2FsbGJhY2tzKHNpZ25hbCkuYWRkKGZuKTtcblx0XHR2YXIgdW5zdWJzY3JpYmVGbiA9ICgpID0+IHtcblx0XHRcdGlmICh1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCkge1xuXHRcdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9nZXRDYWxsYmFja3Moc2lnbmFsKS5yZW1vdmUoZm4pO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdHVuc3Vic2NyaWJlRm4udW5zdWJzY3JpYmVPbiA9IChzdWJzY3JpYmVyKSA9PiB7XG5cdFx0XHRzdWJzY3JpYmVyKHVuc3Vic2NyaWJlRm4pO1xuXHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0fTtcblx0XHR1bnN1YnNjcmliZUZuLnN1YnNjcmliZVdoZW5ldmVyID0gKHN1YnNjcmliZXIpID0+IHtcblx0XHRcdHN1YnNjcmliZXIoKHZhbCkgPT4geyB0aGlzLl9nZXRDYWxsYmFja3Moc2lnbmFsKVt2YWwgPyAnYWRkJyA6ICdyZW1vdmUnXShmbikgfSk7XG5cdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHR9O1xuXHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHR9KTtcblx0U2lnbmFsSGFuZGxlci5vblZhbHVlID0gVS5vcHRpb25hbEN1cnJ5KGZ1bmN0aW9uIG9uVmFsdWUoc2lnbmFsLCBhbnRpY2lwYXRlZFZhbHVlLCBmbikge1xuXHRcdHJldHVybiB0aGlzLm9uKHNpZ25hbCwgKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAodmFsdWUgPT09IGFudGljaXBhdGVkVmFsdWUpIHsgZm4oKSB9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8qIGhvdyB0byBzdWJzY3JpYmUgdG8gYSBvbmUtdGltZSBzaWduYWwgKi9cblx0U2lnbmFsSGFuZGxlci5vbmUgPSBVLm9wdGlvbmFsQ3VycnkoZnVuY3Rpb24gb25lKHNpZ25hbCwgZm4pIHtcblx0XHR2YXIgdW5zdWJzY3JpYmVGbiA9IHRoaXMub24oc2lnbmFsLCBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0dW5zdWJzY3JpYmVGbigpO1xuXHRcdFx0Zm4uYXBwbHkobnVsbCwgYXJncyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdH0pO1xuXHRTaWduYWxIYW5kbGVyLm9uZVZhbHVlID0gVS5vcHRpb25hbEN1cnJ5KGZ1bmN0aW9uIG9uZVZhbHVlKHNpZ25hbCwgYW50aWNpcGF0ZWRWYWx1ZSwgZm4pIHtcblx0XHR2YXIgdW5zdWJzY3JpYmVGbiA9IHRoaXMub24oc2lnbmFsLCAodmFsdWUpID0+IHtcblx0XHRcdGlmICh2YWx1ZSA9PT0gYW50aWNpcGF0ZWRWYWx1ZSkge1xuXHRcdFx0XHR1bnN1YnNjcmliZUZuKCk7XG5cdFx0XHRcdGZuKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdH0pO1xuXG5cdFNpZ25hbEhhbmRsZXIub25jZSA9IFNpZ25hbEhhbmRsZXIub25lO1xuXG5cdC8qIGhvdyB0byB0cmlnZ2VyIGEgc2lnbmFsIHdpdGggYW55IG51bWJlciBvZiBhcmd1bWVudHMgKi9cblx0U2lnbmFsSGFuZGxlci50cmlnZ2VyID0gZnVuY3Rpb24gdHJpZ2dlcihzaWduYWwsIC4uLmFyZ3MpIHtcblx0XHR2YXIgY2FsbGJhY2tzID0gdGhpcy5fZ2V0Q2FsbGJhY2tzKHNpZ25hbCk7XG5cdFx0aWYgKGNhbGxiYWNrcykgeyBjYWxsYmFja3MuZmlyZVdpdGgodGhpcywgYXJncykgfVxuXHR9O1xuXG5cdC8qICBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhpcyBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKiAgbmFtZSAobWFuZGF0b3J5KSAgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qICBvcHRpb25zLmluaXRpYWwgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZTsgZGVmYXVsdHMgdG8gdW5kZWZpbmVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyogIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC4gICAgICAqL1xuXHQvKiAgICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWwgICovXG5cdC8qICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksICAgICAgKi9cblx0LyogICAgICAgICAgICAgICAgICAgICAgIG9yIGFueSB0cmFuc2Zvcm1hdGlvbi4gSXQgY2FuIGFsc28gdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaCB3aWxsIGp1c3QgYmUgICAqL1xuXHQvKiAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb20gICAgICovXG5cdC8qICAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0U2lnbmFsSGFuZGxlci5uZXdPYnNlcnZhYmxlID0gZnVuY3Rpb24gbmV3T2JzZXJ2YWJsZShuYW1lLCB7aW5pdGlhbCwgdmFsaWRhdGlvbn0gPSB7fSkge1xuXG5cdFx0Lyogc3RvcmUgdGhlIHZhbHVlICovXG5cdFx0dmFyIGNhY2hlO1xuXG5cdFx0LyogZGVmaW5lIGdldHRlcnMgYW5kIHNldHRlcnMgKi9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gY2FjaGUgfSxcblx0XHRcdHNldChuZXdWYWx1ZSkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Lyogc2V0IHRoZSBpbml0aWFsIHZhbHVlIG5vdyAocG9zc2libHkgdHJpZ2dlcmluZyBleGlzdGluZyBjYWxsYmFja3MpICovXG5cdFx0dGhpc1tuYW1lXSA9IGluaXRpYWw7XG5cblx0fTtcblxuXHQvKiBvYnNlcnZlIGFuIG9ic2VydmFibGU7IGlmIGl0IGFscmVhZHkgaGFzIGEgdmFsdWUsIHRoZSBjYWxsYmFjayBpcyBpbW1lZGlhdGVseSBjYWxsZWQgKi9cblx0U2lnbmFsSGFuZGxlci5vYnNlcnZlID0gVS5vcHRpb25hbEN1cnJ5KGZ1bmN0aW9uIG9ic2VydmUob2JzZXJ2YWJsZSwgZm4pIHtcblx0XHQvKiBzdWJzY3JpYmUgdG8gdGhlIHZhbHVlIG9mIHRoZSBvYnNlcnZhYmxlICovXG5cdFx0dmFyIHVuc3Vic2NyaWJlRm4gPSB0aGlzLm9uKG9ic2VydmFibGUsIGZuKTtcblxuXHRcdC8qIGlmIHRoZSBvYnNlcnZhYmxlIGhhcyBhIHZhbHVlIGFscmVhZHksIHRyaWdnZXIgdGhlIGNhbGxiYWNrIG5vdyAqL1xuXHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzW29ic2VydmFibGVdKSkgeyBmbih0aGlzW29ic2VydmFibGVdKSB9XG5cblx0XHQvKiByZXR1cm4gdGhlIHVuc3Vic2NyaWJlIGNhbGxiYWNrICovXG5cdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdH0pO1xuXHRTaWduYWxIYW5kbGVyLm9ic2VydmVWYWx1ZSA9IFUub3B0aW9uYWxDdXJyeShmdW5jdGlvbiBvYnNlcnZlVmFsdWUoc2lnbmFsLCBhbnRpY2lwYXRlZFZhbHVlLCBmbikge1xuXHRcdHJldHVybiB0aGlzLm9ic2VydmUoc2lnbmFsLCAodmFsdWUpID0+IHtcblx0XHRcdGlmICh2YWx1ZSA9PT0gYW50aWNpcGF0ZWRWYWx1ZSkgeyBmbigpIH1cblx0XHR9KTtcblx0fSk7XG5cblx0LyogcmV0dXJuIHRoZSBvYmplY3QgdGhhdCBjYW4gYmUgbWl4ZWQgaW50byBvdGhlciBvYmplY3RzICovXG5cdHJldHVybiBTaWduYWxIYW5kbGVyO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvc2lnbmFsLWhhbmRsZXIuanNcbiAqKi8iLCJkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfbmV4dElkID0gMDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG5cdFx0cmV0dXJuIGAke3ByZWZpeHx8XCJ1bmlxdWUtaWRcIn0tJHtfbmV4dElkKyt9YDtcblx0fTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdkZWx0YS1qcycgXSwgZnVuY3Rpb24gKFAsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRlbGwgZGVsdGEuanMgYWJvdXQgYmx1ZWJpcmQgKi9cblx0RE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcblxuXG5cdC8qIGNyZWF0ZSB0aGUgZGVsdGEgbW9kZWwgdGhhdCBtYW5hZ2VzIGFsbCBwbHVnaW5zICg9IGRlbHRhcykgKi9cblx0cmV0dXJuIG5ldyBETSgpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IkQzR3JvdXAuanMifQ==