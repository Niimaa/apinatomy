(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("delta-js"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "delta-js", "kefir", "tweenjs", "kefir-jquery"], factory);
	else if(typeof exports === 'object')
		exports["D3Group"] = factory(require("jquery"), require("bluebird"), require("delta-js"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else
		root["D3Group"] = factory(root["jQuery"], root["P"], root["DeltaModel"], root["Kefir"], root["TWEEN"], root["kefir-jquery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, ArtefactP) {
	  'use strict';
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_D3Group)) {
	      return window._amy_D3Group;
	    }
	    window._amy_D3Group = Artefact.newSubclass('D3Group', function D3Group() {
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
	    return window._amy_D3Group;
	  })).tap((function(c) {
	    $.circuitboard.D3Group = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(2), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, dm, plugin, defer) {
	  'use strict';
	  return plugin.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = dm.vp('Artefact', U.newSubclass(KefirSignalHandler, (function(superFn) {
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
	        if (this.root === this) {
	          this._artefactsByID = {};
	          this._registerArtefact = function(artefact) {
	            U.getDef(this._artefactsByID, artefact.id, defer).resolve(artefact);
	          };
	        }
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
	      get root() {
	        if (!this._root) {
	          this._root = this.parent ? this.parent.root : this;
	        }
	        return this._root;
	      },
	      artefactById: function(id) {
	        return U.getDef(this.root._artefactsByID, id, defer).promise;
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
	        if (options.beforeGoingIn) {
	          options.beforeGoingIn(this);
	        }
	        this.closestDescendantsByType(type).forEach((function(descendent) {
	          descendent.traverseArtefactsByType(type, fn, options);
	        }));
	        if (options.beforeGoingOut) {
	          options.beforeGoingOut(this);
	        }
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
	            this.constructed = this.constructed.then((function() {
	              if ($.isFunction($__0.construct)) {
	                return P.resolve($__0.construct(options)).return($__0);
	              }
	              return $__0;
	            }));
	          } else if ($.isFunction(this.construct)) {
	            this.beforeConstruction(this.construct(options));
	          }
	          (this.constructed || P.resolve()).then((function() {
	            $__0.root._registerArtefact($__0);
	          }));
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
	  var KefirSignalHandler = U.newClass(function KefirSignalHandler() {
	    this._events = {};
	    this._properties = {};
	    this._propertyBusses = {};
	  }, {
	    newEvent: function(name) {
	      var source = (arguments[1] !== (void 0) ? arguments[1] : {}).source;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      var bus = Kefir.bus();
	      if (source) {
	        bus.plug(source);
	      }
	      return this._events[name] = bus;
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
	      var bus = Kefir.bus();
	      var property = this._properties[name] = bus.toProperty(initial).skipDuplicates(isEqual);
	      property.plug = (function(observable) {
	        bus.plug(observable);
	        return property;
	      });
	      property.unplug = (function(observable) {
	        bus.unplug(observable);
	        return property;
	      });
	      property.get = (function() {
	        return property._current;
	      });
	      if (settable) {
	        property.set = (function(value) {
	          bus.emit(value);
	          return property;
	        });
	      }
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      property.run();
	      this.event('destroy').onValue((function() {
	        bus.end();
	      }));
	      return property;
	    },
	    trigger: function(name, value) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      this._events[name].emit(value);
	    },
	    on: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      return this._on(argsObj);
	    },
	    _on: function($__1) {
	      var $__2 = $__1,
	          name = $__2.name,
	          expectedValue = $__2.expectedValue,
	          callback = $__2.callback;
	      U.assert(this._events[name] || this._properties[name], ("There is no event or property '" + name + "' on this object."));
	      var result = this._events[name] || this._properties[name];
	      if (U.isDefined(expectedValue)) {
	        result = result.filter((function(v) {
	          return v === expectedValue;
	        }));
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
	      if (U.isDefined(args[0]) && U.isFunction(args[0])) {
	        result.callback = args.shift();
	      }
	      return result;
	    }
	  });
	  return KefirSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(12), __webpack_require__(2), __webpack_require__(5), __webpack_require__(9), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(13), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
	  __webpack_require__(15).init(Kefir, $);
	  Kefir.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Kefir.fromBinder((function(emitter) {
	      obj.on(eventName, emitter.emit);
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Kefir.animationFrames = function animationFrames() {
	    return Kefir.fromBinder((function(emitter) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          emitter.emit();
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
	  Kefir.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = Kefir.bus();
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
	    addStream(Kefir.fromBinder((function(emitter) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        emitter.emit(this);
	      });
	      tw.onComplete(emitter.end);
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
	  Kefir.keyPress = function keyPress(keyCode) {
	    return $(window).asKefirStream('keypress').filter((function(e) {
	      return e.keyCode === keyCode;
	    }));
	  };
	  Kefir.once = function once(value) {
	    return Kefir.fromBinder((function(emitter) {
	      emitter.emit(value);
	      emitter.end();
	    }));
	  };
	  Kefir.fromArray = function fromArray(array) {
	    return Kefir.fromBinder((function(emitter) {
	      array.forEach(emitter.emit);
	      emitter.end();
	    }));
	  };
	  Kefir.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = Kefir.bus();
	    var open = Kefir.bus();
	    var close = Kefir.bus();
	    pacing.filterBy(wantedBus.toProperty(false)).onValue((function() {
	      handler((function() {
	        open.emit();
	        wantedBus.emit(false);
	        close.emit();
	      }));
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.mapTo(true));
	      return Kefir.constant(true).take(1).concat(close).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntilBy(open).reduce(accumulator, []).flatMap(Kefir.fromArray);
	      }));
	    };
	  };
	  Kefir.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Kefir.Stream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Kefir.fromBinder((function(emitter) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(value);
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          oldBuffer.forEach(emitter.emit);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Kefir.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Kefir.Observable.prototype.run = function() {
	    var $__0 = this;
	    var doNothing = (function() {});
	    this.onValue(doNothing);
	    return (function() {
	      $__0.offValue(doNothing);
	    });
	  };
	  Kefir.Stream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Kefir.Stream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asKefirStream('mousemove');
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
	      return stream.takeUntilBy($(document).asKefirStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asKefirStream('mousemove');
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
	      return $(document).asKefirStream('mouseup').take(1).takeUntilBy(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asKefirStream('mousewheel DOMMouseScroll');
	  };
	  return Kefir;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(2), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
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
	        this.element.asKefirStream('remove').onValue((function() {
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYjRjNzAzMjc5MzA2MmMwYTQ0NiIsIndlYnBhY2s6Ly8vLi9zcmMvRDNHcm91cC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9BcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3BsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL25ld1dpZGdldFR5cGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia2VmaXItanF1ZXJ5XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBa0Isd0JBQWUsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsVUFBUTtBQUM3RSxjQUFXLENBQUM7QUFHWixRQUFPLFVBQVEsS0FBTSxFQUFDLFNBQUMsUUFBTztBQUk3QixRQUFJLFdBQVcsQ0FBQyxNQUFLLGFBQWEsQ0FBQyxDQUFHO0FBQUUsWUFBTyxPQUFLLGFBQWE7S0FBRTtBQUduRSxVQUFLLGFBQWEsRUFBSSxTQUFPLFlBQWEsQ0FBQyxTQUFRLENBQUcsU0FBUyxRQUFNLENBQUU7O0FBRXRFLGNBQVEsQ0FBQyxJQUFHLENBQUc7QUFDZCxnQkFBTyxDQUFHLEdBQUM7QUFDWCxhQUFJLENBQUcsR0FBQztBQUFBLE9BQ1QsQ0FBQyxDQUFDO0FBRUYsVUFBRyxTQUFVLENBQUMsY0FB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dXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJkZWx0YS1qc1wiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEM0dyb3VwXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRDNHcm91cFwiXSA9IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdLCByb290W1wiS2VmaXJcIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImtlZmlyLWpxdWVyeVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTVfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDFiNGM3MDMyNzkzMDYyYzBhNDQ2XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJy4vQXJ0ZWZhY3QuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gQXJ0ZWZhY3RQLnRoZW4oKEFydGVmYWN0KSA9PiB7XG5cblxuXHRcdC8qIGhvd2V2ZXIgKG9mdGVuKSB0aGlzIGlzIGxvYWRlZCwgY3JlYXRlIHRoZSBjbGFzcyBvbmx5IG9uY2UgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfRDNHcm91cCkpIHsgcmV0dXJuIHdpbmRvdy5fYW15X0QzR3JvdXAgfVxuXG5cblx0XHR3aW5kb3cuX2FteV9EM0dyb3VwID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ0QzR3JvdXAnLCBmdW5jdGlvbiBEM0dyb3VwKCkge1xuXG5cdFx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHRcdHZlcnRpY2VzOiB7fSxcblx0XHRcdFx0ZWRnZXM6IHt9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5uZXdFdmVudCgndmVydGV4LWFkZGVkJyk7XG5cdFx0XHR0aGlzLm5ld0V2ZW50KCd2ZXJ0ZXgtcmVtb3ZlZCcpO1xuXHRcdFx0dGhpcy5uZXdFdmVudCgnZWRnZS1hZGRlZCcpO1xuXHRcdFx0dGhpcy5uZXdFdmVudCgnZWRnZS1yZW1vdmVkJyk7XG5cblx0XHRcdHRoaXMub24oJ2Rlc3Ryb3knKS50YWtlKDEpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnZlcnRpY2VzLmZvckVhY2goKHYpID0+IHsgdi5kZXN0cm95KCkgfSk7XG5cdFx0XHRcdC8vIGVkZ2VzIHdpbGwgYmUgZGVzdHJveWVkIHdoZW4gdGhlaXIgdmVydGljZXMgYXJlIGRlc3Ryb3llZFxuXHRcdFx0fSk7XG5cblx0XHR9LCB7XG5cblx0XHRcdGdldCBncmF2aXR5RmFjdG9yKCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmdyYXZpdHlGYWN0b3IgfSxcblx0XHRcdGdldCBjaGFyZ2VGYWN0b3IoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMuY2hhcmdlRmFjdG9yIH0sXG5cdFx0XHRnZXQgbGlua0Rpc3RhbmNlRmFjdG9yKCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLmxpbmtEaXN0YW5jZUZhY3RvciB9LFxuXG5cdFx0XHRzZXRSZWdpb24ocmVnaW9uKSB7XG5cdFx0XHRcdHRoaXMucmVnaW9uID0gcmVnaW9uO1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuXHRcdFx0fSxcblxuXHRcdFx0YWRkVmVydGV4KHZlcnRleCkge1xuXHRcdFx0XHR2ZXJ0ZXguZ3JvdXAgPSB0aGlzO1xuXHRcdFx0XHR0aGlzLnZlcnRpY2VzW3ZlcnRleC5pZF0gPSB2ZXJ0ZXg7XG5cdFx0XHRcdHZlcnRleC5ncmFwaElkID0gdmVydGV4LmlkO1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF0gPSB2ZXJ0ZXg7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcigndmVydGV4LWFkZGVkJywgdmVydGV4KTtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0cmV0dXJuIHZlcnRleDtcblx0XHRcdH0sXG5cblx0XHRcdHJlbW92ZVZlcnRleCh2ZXJ0ZXgpIHtcblx0XHRcdFx0aWYgKHZlcnRleCkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmVydGV4ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dmVydGV4ID0gdGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2ZXJ0ZXguZGVzdHJveSgpO1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmNpcmN1aXRib2FyZC5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF07XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMudmVydGljZXNbdmVydGV4XTtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3ZlcnRleC1yZW1vdmVkJywgdmVydGV4KTtcblx0XHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRhZGRFZGdlKGVkZ2UpIHtcblx0XHRcdFx0ZWRnZS5ncm91cCA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuZWRnZXNbZWRnZS5pZF0gPSBlZGdlO1xuXHRcdFx0XHRlZGdlLmdyYXBoSWQgPSB0aGlzLmlkICsgJzonICsgZWRnZS5pZDtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXSA9IGVkZ2U7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignZWRnZS1hZGRlZCcsIGVkZ2UpO1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuXHRcdFx0XHRyZXR1cm4gZWRnZTtcblx0XHRcdH0sXG5cblx0XHRcdHJlbW92ZUVkZ2UoZWRnZSkge1xuXHRcdFx0XHRpZiAoZWRnZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmVydGV4ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0ZWRnZSA9IHRoaXMuZWRnZXNbZWRnZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVkZ2UuZGVzdHJveSgpO1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmNpcmN1aXRib2FyZC5fcF9kM19lZGdlc1tlZGdlLmdyYXBoSWRdO1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmVkZ2VzW2VkZ2UuaWRdO1xuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcignZWRnZS1yZW1vdmVkJywgZWRnZSk7XG5cdFx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0cmVtb3ZlQWxsRWRnZXNBbmRWZXJ0aWNlcygpIHtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5lZGdlcykuZm9yRWFjaCgoZWRnZUlkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZWRnZXNbZWRnZUlkXSkgeyB0aGlzLnJlbW92ZUVkZ2UodGhpcy5lZGdlc1tlZGdlSWRdKTsgfVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy52ZXJ0aWNlcykuZm9yRWFjaCgodmVydGV4SWQpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhJZF0pIHsgdGhpcy5yZW1vdmVWZXJ0ZXgodGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhJZF0pOyB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuXHRcdFx0fVxuXG5cdFx0fSwge1xuXHRcdFx0Z3Jhdml0eUZhY3RvcjogMSxcblx0XHRcdGNoYXJnZUZhY3RvcjogMSxcblx0XHRcdGxpbmtEaXN0YW5jZUZhY3RvcjogMSxcblx0XHRcdHJlZ2lvbjogeyAvLyB0aGUgd2hvbGUgY2FudmFzIHdpdGggYSBzbWFsbCBwYWRkaW5nXG5cdFx0XHRcdHRvcDogMTAsXG5cdFx0XHRcdGxlZnQ6IDEwLFxuXHRcdFx0XHRnZXQgd2lkdGgoKSB7IHJldHVybiB0aGlzLmNpcmN1aXRib2FyZC5zaXplLndpZHRoIC0gMjAgfSxcblx0XHRcdFx0Z2V0IGhlaWdodCgpIHsgcmV0dXJuIHRoaXMuY2lyY3VpdGJvYXJkLnNpemUuaGVpZ2h0IC0gMjAgfVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0XHRyZXR1cm4gd2luZG93Ll9hbXlfRDNHcm91cDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5EM0dyb3VwID0gYyB9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0QzR3JvdXAuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGl0cyBmaXJzdCBhcmd1bWVudFxuXHRcdGlkKHYpIHsgcmV0dXJuIHYgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBkZWZpbmVkLCBnaXZlIGl0IGEgZGVmYXVsdCB2YWx1ZSBmaXJzdDsgaWYgdGhlIGdpdmVuIHZhbHVlXG5cdFx0Ly8gaXMgYSBmdW5jdGlvbiwgaXQgaXMgY2FsbGVkLCBhbmQgaXRzIHJlc3VsdCBpcyB1c2VkXG5cdFx0Z2V0RGVmKG9iaiwgbmFtZSwgdmFsdWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlKCkgfVxuXHRcdFx0XHRvYmpbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pIH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSkgfSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRmaW5kSW5kZXgoYXJyYXksIHByZWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkgeyByZXR1cm4gaSB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblxuXHRcdC8vIHRoaXMgYG1lbW9pemVgIGZ1bmN0aW9uIGlzIFNMT1csIGFzIGl0IHVzZXMgbGluZWFyIHNlYXJjaFxuXHRcdG1lbW9pemUoZm4pIHtcblx0XHRcdHZhciBrZXlzID0gW107XG5cdFx0XHR2YXIgY2FjaGUgPSBbXTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBjaGVjayB0aGUgY2FjaGUgKi9cblx0XHRcdFx0dmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGtleSkgPT4ga2V5LmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcmdzW2ldKSk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7IHJldHVybiBjYWNoZVtpbmRleF0gfVxuXG5cdFx0XHRcdC8qIG5vIGNhY2hlIGhpdDsgY29tcHV0ZSB2YWx1ZSwgc3RvcmUgYW5kIHJldHVybiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGtleXMucHVzaChhcmdzKTtcblx0XHRcdFx0Y2FjaGUucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIHNvcnRPZkVxdWFsID0gKGEsIGIpID0+IChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9rZWZpci1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL3V0aWwvdW5pcXVlLWlkLmpzJyxcblx0Jy4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzJyxcblx0Jy4vdXRpbC9wbHVnaW4uanMnLFxuXHQnLi91dGlsL2RlZmVyLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFAsIFUsIEtlZmlyU2lnbmFsSGFuZGxlciwgdW5pcXVlSUQsIGRtLCBwbHVnaW4sIGRlZmVyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHJldHVybiBwbHVnaW4uc2VsZWN0ZWQudGhlbigoKSA9PiB7XG5cblxuXHRcdC8qIGhvd2V2ZXIgKG9mdGVuKSB0aGlzIGlzIGxvYWRlZCwgY3JlYXRlIHRoZSBjbGFzcyBvbmx5IG9uY2UgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfQXJ0ZWZhY3QpKSB7IHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdCB9XG5cblxuXHRcdC8qKiB7QGV4cG9ydCBAY2xhc3MgQXJ0ZWZhY3QgQGV4dGVuZHMgS2VmaXJTaWduYWxIYW5kbGVyfVxuXHRcdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdFx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBLZWZpci5qcy5cblx0XHQgKlxuXHRcdCAqIFVzZXJzIGNhbiBwYXNzIGEgcHJvbWlzZSB0aHJvdWdoIHRoZSAnYmVmb3JlQ29uc3RydWN0aW9uJyBvcHRpb24uIElmIGRvbmUsIHRoZVxuXHRcdCAqIGFydGVmYWN0IHdhaXRzIG9uIHRoYXQgcHJvbWlzZSBiZWZvcmUgY2FsbGluZyBpdHMgJ2NvbnN0cnVjdCcgbWV0aG9kLlxuXHRcdCAqIFNpbWlsYXJseSwgdXNlcnMgb2YgaW5zdGFuY2VzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIHRlc3QgdGhlICdjb25zdHJ1Y3RlZCcgcHJvcGVydHkuXG5cdFx0ICogSWYgaXQgaXMgZGVmaW5lZCwgaXQgaXMgYSBwcm9taXNlIHRoYXQgaGFzIHRvIGJlIHdhaXRlZCBmb3IuXG5cdFx0ICogSWYgbm90LCB0aGUgb2JqZWN0IGluc3RhbmNlIGNhbiBiZSB1c2VkIHN5bmNocm9ub3VzbHkgYWZ0ZXIgY29uc3RydWN0aW9uLlxuXHRcdCAqL1xuXHRcdHdpbmRvdy5fYW15X0FydGVmYWN0ID0gZG0udnAoJ0FydGVmYWN0JywgVS5uZXdTdWJjbGFzcyhLZWZpclNpZ25hbEhhbmRsZXIsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcnRlZmFjdChvcHRpb25zKSB7XG5cdFx0XHRzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0dmFyIHtpZCwgdHlwZSwgcGFyZW50LCBiZWZvcmVDb25zdHJ1Y3Rpb259ID0gb3B0aW9ucztcblxuXHRcdFx0Lyogc2V0IGhpZXJhcmNoeSBzdHVmZiAqL1xuXHRcdFx0dGhpcy5faWQgPSBpZCB8fCB1bmlxdWVJRCh0eXBlKTtcblx0XHRcdHRoaXMuX3R5cGUgPSB0eXBlO1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fY2hpbGRyZW4gPSBbXTtcblx0XHRcdGlmIChwYXJlbnQpIHsgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpIH1cblxuXHRcdFx0LyogY3JlYXRlIGV2ZW50cyAqL1xuXHRcdFx0dGhpcy5uZXdFdmVudCgnZGVzdHJveScpO1xuXG5cdFx0XHQvKiBwb3NzaWJseSB3YWl0IGZvciBzb21ldGhpbmcgYmVmb3JlIGNvbnN0cnVjdGlvbiAobGlrZSBwbHVnaW5zKT8gKi9cblx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKGJlZm9yZUNvbnN0cnVjdGlvbik7XG5cblx0XHRcdC8qIGdpdmUgdGhlIHJvb3QgYXJ0ZWZhY3QgYSB3YXkgdG8gcmVnaXN0ZXIgb3RoZXIgYXJ0ZWZhY3RzIGJ5IElEICovXG5cdFx0XHRpZiAodGhpcy5yb290ID09PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuX2FydGVmYWN0c0J5SUQgPSB7fTtcblx0XHRcdFx0dGhpcy5fcmVnaXN0ZXJBcnRlZmFjdCA9IGZ1bmN0aW9uIChhcnRlZmFjdCkge1xuXHRcdFx0XHRcdFUuZ2V0RGVmKHRoaXMuX2FydGVmYWN0c0J5SUQsIGFydGVmYWN0LmlkLCBkZWZlcikucmVzb2x2ZShhcnRlZmFjdCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHR9LCAvKiogQGxlbmRzIEFydGVmYWN0LnByb3RvdHlwZSAqLyB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEFsbG93IGEgcHJvbWlzZSB0byBiZSBpbnNlcnRlZCBvbiB3aGljaCB0aGUgcmVzdCBvZiBjb25zdHJ1Y3Rpb24gc2hvdWxkIHdhaXQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHBvc3NpYmxlUHJvbWlzZSB7Kn0gIC0gYSB2YWx1ZSB0aGF0IG1pZ2h0IGJlIGEgcHJvbWlzZVxuXHRcdFx0ICovXG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cblx0XHRcdFx0LyogaWYgbm8gcHJvbWlzZSBpcyBwYXNzZWQgaW4sIGlnbm9yZSwgdG8ga2VlcCBjb25zdHJ1Y3Rpb24gc3luY2hyb25vdXMgKi9cblx0XHRcdFx0aWYgKCFwb3NzaWJsZVByb21pc2UgfHwgISQuaXNGdW5jdGlvbihwb3NzaWJsZVByb21pc2UudGhlbikpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBpZiB0aGlzIGlzIHRoZSBmaXJzdCBwcm9taXNlIHBhc3NlZCBpbiwgaW5pdGlhbGl6ZSAndGhpcy5jb25zdHJ1Y3RlZCcgKi9cblx0XHRcdFx0aWYgKCF0aGlzLmNvbnN0cnVjdGVkKSB7IHRoaXMuY29uc3RydWN0ZWQgPSBQLnJlc29sdmUodGhpcykgfVxuXG5cdFx0XHRcdC8qIGluc2VydCB0aGUgbmV3IHByb21pc2UgaW50byB0aGUgY2hhaW4gZm9yICd0aGlzLmNvbnN0cnVjdGVkJyByZXNvbHV0aW9uICovXG5cdFx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkLnRhcCgoKSA9PiBQLnJlc29sdmUocG9zc2libGVQcm9taXNlKSk7XG5cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgb3B0aW9ucyBwcm92aWRlZCB0aHJvdWdoIHRoZSBjb25zdHJ1Y3RvclxuXHRcdFx0ICovXG5cdFx0XHRnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnMgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB1bmlxdWUgaWRlbnRpZmllciBiZWxvbmdpbmcgdG8gdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZCB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gdGhlIHR5cGUgb2YgdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGUgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBwYXJlbnQgb2YgdGhpcyBhcnRlZmFjdCwgdW5sZXNzIHRoaXMgaXMgdGhlIHJvb3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHBhcmVudCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdGdldCBjaGlsZHJlbigpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fSAtIHRoZSByb290IG9mIHRoZSBhcnRlZmFjdCBoaWVyYXJjaHlcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHJvb3QoKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fcm9vdCkgeyB0aGlzLl9yb290ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5yb290IDogdGhpcyB9XG5cdFx0XHRcdHJldHVybiB0aGlzLl9yb290O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEdldCBhIHByb21pc2UgdG8gYW4gYXJ0ZWZhY3QgZ2l2ZW4gaXRzIElELlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSAgaWQge1N0cmluZ30gICAtIHRoZSBpZCBvZiB0aGUgcmVxdWlyZWQgYXJ0ZWZhY3Rcblx0XHRcdCAqIEByZXR1cm4ge1A8QXJ0ZWZhY3Q+fSAtIHRoZSBwcm9taXNlIHRvIHRoZSBhcnRlZmFjdCB0aGF0IGhhcyB0aGUgZ2l2ZW4gaWRcblx0XHRcdCAqL1xuXHRcdFx0YXJ0ZWZhY3RCeUlkKGlkKSB7XG5cdFx0XHRcdHJldHVybiBVLmdldERlZih0aGlzLnJvb3QuX2FydGVmYWN0c0J5SUQsIGlkLCBkZWZlcikucHJvbWlzZTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBUcmF2ZXJzZSB0aGUgQXJ0ZWZhY3QgaGllcmFyY2h5IHdpdGggdGhpcyBhcyByb290LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBmbiB7KEFydGVmYWN0KSA9PiBCb29sZWFufSAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0dHJhdmVyc2VBcnRlZmFjdHMoZm4sIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR2YXIge29yZGVyfSA9IG9wdGlvbnM7XG5cdFx0XHRcdGlmICghb3JkZXIpIHsgb3JkZXIgPSAncHJlZml4JyB9XG5cblx0XHRcdFx0aWYgKG9yZGVyID09PSAncHJlZml4JykgeyBmbih0aGlzKSB9XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRjaGlsZC50cmF2ZXJzZUFydGVmYWN0cyhmbiwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwb3N0Zml4JykgeyBmbih0aGlzKSB9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogVHJhdmVyc2UgdGhlIEFydGVmYWN0IGhpZXJhcmNoeSB3aXRoIHRoaXMgYXMgcm9vdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gZm4geyhBcnRlZmFjdCkgPT4gQm9vbGVhbn0gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdHRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKHR5cGUsIGZuLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0dmFyIHtvcmRlcn0gPSBvcHRpb25zO1xuXHRcdFx0XHRpZiAoIW9yZGVyKSB7IG9yZGVyID0gJ3ByZWZpeCcgfVxuXG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3ByZWZpeCcgJiYgdGhpcy50eXBlID09PSB0eXBlKSB7IGZuKHRoaXMpIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuYmVmb3JlR29pbmdJbikgeyBvcHRpb25zLmJlZm9yZUdvaW5nSW4odGhpcykgfVxuXHRcdFx0XHR0aGlzLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKS5mb3JFYWNoKChkZXNjZW5kZW50KSA9PiB7XG5cdFx0XHRcdFx0ZGVzY2VuZGVudC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSh0eXBlLCBmbiwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5iZWZvcmVHb2luZ091dCkgeyBvcHRpb25zLmJlZm9yZUdvaW5nT3V0KHRoaXMpIH1cblx0XHRcdFx0aWYgKG9yZGVyID09PSAncG9zdGZpeCcgJiYgdGhpcy50eXBlID09PSB0eXBlKSB7IGZuKHRoaXMpIH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBSZXRyaWV2ZSB0aGUgY2xvc2VzdCBhbmNlc3RvciAocGFyZW50LCBwYXJlbnQncyBwYXJlbnQsIC4uLilcblx0XHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnRlZmFjdHx1bmRlZmluZWR9IC0gdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgdGhlIGdpdmVuIHR5cGUsIHVubGVzcyB0aGVyZSBpcyBub25lXG5cdFx0XHQgKi9cblx0XHRcdGNsb3Nlc3RBbmNlc3RvckJ5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzO1xuXHRcdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBSZXRyaWV2ZSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50IChjaGlsZHJlbiwgY2hpbGRyZW4ncyBjaGlsZHJlbiwgLi4uKVxuXHRcdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1tBcnRlZmFjdF19IC0gdGhlIGNsb3Nlc3QgZGVzY2VuZGFudHMgb2YgdGhlIGdpdmVuIHR5cGU7IG5vbmUgb2YgdGhlbVxuXHRcdFx0ICogICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVzY2VuZGFudCBmcm9tIGFueSBvdGhlclxuXHRcdFx0ICovXG5cdFx0XHRjbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRpZiAoY2hpbGQudHlwZSA9PT0gdHlwZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBJbmRpY2F0ZSB0aGF0IHRoaXMgYXJ0ZWZhY3Qgd2lsbCBuZXZlciBiZSB1c2VkIGFnYWluLCBhbGxvd2luZyBpdFxuXHRcdFx0ICogdG8gZG8gYW55IG5lY2Vzc2FyeSBjbGVhbnVwLlxuXHRcdFx0ICovXG5cdFx0XHRkZXN0cm95KCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKTtcblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4geyBjaGlsZC5kZXN0cm95KCkgfSk7XG5cdFx0XHR9XG5cblx0XHR9KSk7XG5cblxuXHRcdC8qKiB7QGZ1bmN0aW9uIEFydGVmYWN0Lm5ld1N1YmNsYXNzfVxuXHRcdCAqIEEgc3RhdGljIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1YmNsYXNzIG9mIHtAbGluayBBcnRlZmFjdH0uXG5cdFx0ICovXG5cdFx0d2luZG93Ll9hbXlfQXJ0ZWZhY3QubmV3U3ViY2xhc3MgPSBmdW5jdGlvbiBuZXdTdWJDbGFzcyhuYW1lLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30sIG9wdGlvbkRlZmF1bHRzID0ge30pIHtcblx0XHRcdHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKHdpbmRvdy5fYW15X0FydGVmYWN0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucyAqL1xuXHRcdFx0XHR2YXIgcHJvY2Vzc2VkT3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbkRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zW2tleV0gPSBvcHRpb25EZWZhdWx0c1trZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG5cblx0XHRcdFx0LyogY2FsbCBzdXBlci1jb25zdHJ1Y3RvciAqL1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgVS5leHRlbmQob3B0aW9ucywgcHJvY2Vzc2VkT3B0aW9ucykpO1xuXG5cdFx0XHRcdC8qIGNhbGwgdGhpcyBjb25zdHJ1Y3RvciAqL1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdFx0XHRcdC8qIHRoZW4gcnVuIHRoZSAnY29uc3RydWN0JyBtZXRob2QgKi9cblx0XHRcdFx0aWYgKHRoaXMuY29uc3RydWN0ZWQpIHsgLy8gY29uc3RydWN0IGFzeW5jaHJvbm91c2x5XG5cdFx0XHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHRoaXMuY29uc3RydWN0KG9wdGlvbnMpKS5yZXR1cm4odGhpcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3Qob3B0aW9ucykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogcmVnaXN0ZXIgdGhpcyBhcnRlZmFjdCB0byB0aGUgY2lyY3VpdGJvYXJkICovXG5cdFx0XHRcdCh0aGlzLmNvbnN0cnVjdGVkIHx8IFAucmVzb2x2ZSgpKS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJvb3QuX3JlZ2lzdGVyQXJ0ZWZhY3QodGhpcyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdGdldCBjaXJjdWl0Ym9hcmQoKSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2lyY3VpdGJvYXJkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSkpO1xuXHRcdH07XG5cblxuXHRcdHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5BcnRlZmFjdCA9IGMgfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9BcnRlZmFjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnLi9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbiAoJCwgVSwgS2VmaXIpIHtcblxuXG5cdC8qKiB7QGV4cG9ydH17QGNsYXNzIEtlZmlyU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBLZWZpci5qcy5cblx0ICovXG5cdHZhciBLZWZpclNpZ25hbEhhbmRsZXIgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEtlZmlyU2lnbmFsSGFuZGxlcigpIHtcblxuXHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuXG5cdH0sIC8qKiBAbGVuZHMgS2VmaXJTaWduYWxIYW5kbGVyLnByb3RvdHlwZSAqLyB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRGVjbGFyZXMgYSBuZXcgZXZlbnQgc3RyZWFtIGZvciB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgIG5hbWUgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQsIHVzZWQgdG8gdHJpZ2dlciBvciBzdWJzY3JpYmUgdG8gaXRcblx0XHQgKiBAcGFyYW0gIHtLZWZpci5TdHJlYW19IFtzb3VyY2VdIC0gYW5vdGhlciBldmVudCBzdHJlYW0gdG8gYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoaXMgZXZlbnRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLkJ1c30gLSB0aGUgY3JlYXRlZCBldmVudCBzdHJlYW1cblx0XHQgKi9cblx0XHRuZXdFdmVudChuYW1lLCB7c291cmNlfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBldmVudCBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGV2ZW50IHN0cmVhbSAqL1xuXHRcdFx0dmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuXHRcdFx0aWYgKHNvdXJjZSkgeyBidXMucGx1Zyhzb3VyY2UpIH1cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV0gPSBidXM7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0cmlldmUgYW4gZXZlbnQgc3RyZWFtIGJ5IG5hbWUuIElmIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgaXMgZ2l2ZW4sIGEgc3RyZWFtXG5cdFx0ICogYmFzZWQgb24gY2hhbmdlcyB0byB0aGF0IHByb3BlcnR5IGlzIHJldHVybmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5TdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHJldHVybiBpdCAqL1xuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhIHByb3BlcnR5IGJ5IG5hbWUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cdFx0LyoqIEBhbGlhcyBwcm9wZXJ0eSAqL1xuXHRcdHAobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgZGVmaW5lcyBhIG5ldyBwcm9wZXJ0eSBvbiB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgIFtzZXR0YWJsZT10cnVlXSAtIHdoZXRoZXIgdGhlIHZhbHVlIGNhbiBiZSBtYW51YWxseSBzZXRcblx0XHQgKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICAgICAgICAgICAgW2luaXRpYWxdICAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9uKCosKik6Qm9vbGVhbn0gICBbaXNFcXVhbF0gICAgICAgLSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBieSB3aGljaCB0byB0ZXN0IGZvciBkdXBsaWNhdGUgdmFsdWVzXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0bmV3UHJvcGVydHkobmFtZSwge3NldHRhYmxlLCBpbml0aWFsLCBpc0VxdWFsfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBwcm9wZXJ0eSBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZhdWx0IHZhbHVlIGZvciAnc2V0dGFibGUnICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChzZXR0YWJsZSkpIHsgc2V0dGFibGUgPSB0cnVlIH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBidXMgd2hpY2ggbWFuYWdlcyB0aGUgcHJvcGVydHkgKi9cblx0XHRcdHZhciBidXMgPSBLZWZpci5idXMoKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBwcm9wZXJ0eSBpdHNlbGYsIGFuZCBnaXZlIGl0IGFkZGl0aW9uYWwgbWV0aG9kcyAqL1xuXHRcdFx0dmFyIHByb3BlcnR5ID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXSA9IGJ1cy50b1Byb3BlcnR5KGluaXRpYWwpLnNraXBEdXBsaWNhdGVzKGlzRXF1YWwpO1xuXHRcdFx0cHJvcGVydHkucGx1ZyAgID0gKG9ic2VydmFibGUpID0+IHsgYnVzLnBsdWcob2JzZXJ2YWJsZSk7ICAgcmV0dXJuIHByb3BlcnR5IH07XG5cdFx0XHRwcm9wZXJ0eS51bnBsdWcgPSAob2JzZXJ2YWJsZSkgPT4geyBidXMudW5wbHVnKG9ic2VydmFibGUpOyByZXR1cm4gcHJvcGVydHkgfTtcblx0XHRcdHByb3BlcnR5LmdldCA9ICgpID0+IHByb3BlcnR5Ll9jdXJyZW50OyAvLyBUT0RPOiBhY2Nlc3NpbmcgcHJpdmF0ZSBmaWVsZCBvZiBLZWZpciBwcm9wZXJ0eTsgZG9uJ3Rcblx0XHRcdGlmIChzZXR0YWJsZSkge1xuXHRcdFx0XHRwcm9wZXJ0eS5zZXQgPSAodmFsdWUpID0+IHsgYnVzLmVtaXQodmFsdWUpOyByZXR1cm4gcHJvcGVydHkgfTtcblx0XHRcdH1cblxuXHRcdFx0LyogYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgb2JqZWN0IGludGVyZmFjZSAqL1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcblx0XHRcdFx0Z2V0OiBwcm9wZXJ0eS5nZXQsXG5cdFx0XHRcdHNldDogc2V0dGFibGUgPyBwcm9wZXJ0eS5zZXQgOiB1bmRlZmluZWRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBtYWtlIHRoZSBwcm9wZXJ0eSBhY3RpdmU7IGl0IGRvZXNuJ3Qgd29yayBpZiB0aGlzIGlzbid0IGRvbmUgKHRoZSBuYXR1cmUgb2YgS2VmaXIuanMpICovXG5cdFx0XHRwcm9wZXJ0eS5ydW4oKTtcblx0XHRcdHRoaXMuZXZlbnQoJ2Rlc3Ryb3knKS5vblZhbHVlKCgpID0+IHsgYnVzLmVuZCgpIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHByb3BlcnR5ICovXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVHJpZ2dlciBhbiBldmVudCBmb3IgYWxsIHN1YnNjcmliZXJzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byB0cmlnZ2VyXG5cdFx0ICogQHZhbHVlIHsqfSAgICAgIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGF0dGFjaCB0byB0aGUgZXZlbnRcblx0XHQgKi9cblx0XHR0cmlnZ2VyKG5hbWUsIHZhbHVlKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IHN0cmVhbSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0uZW1pdCh2YWx1ZSk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2VsZWN0cyBhbiBleGlzdGluZyBzdHJlYW0gb3IgcHJvcGVydHksIGFuZCB0aGVuXG5cdFx0ICogZWl0aGVyIHJldHVybnMgaXQsIG9yIGNyZWF0ZXMgYSBzdWJzY3JpcHRpb24gdG8gaXQsIGRlcGVuZGluZ1xuXHRcdCAqIG9uIHdoZXRoZXIgYSBjYWxsYmFjayBpcyBwcm92aWRlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IG9yIHByb3BlcnR5IHRvIHN1YnNjcmliZSB0b1xuXHRcdCAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgW2V4cGVjdGVkVmFsdWVdICAgICAgIC0gaWYgcHJvdmlkZWQsIGZpbHRlcnMgdGhlIHN0cmVhbSBieSA9PT0gZXF1YWxpdHkgd2l0aCB0aGlzIHZhbHVlO1xuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAgLSBhIHBsYWluIG9iamVjdCBmb3IgcHJvdmlkaW5nIGFkZGl0aW9uYWwgb3B0aW9uc1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgW29wdGlvbnMub25jZT1mYWxzZV0gIC0gd2hldGhlciB0aGUgc3RyZWFtIGVuZHMgYWZ0ZXIgb25lIGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbigqKTp2b2lkfSBbY2FsbGJhY2tdICAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dW5kZWZpbmVkfSAtIGlmIG5vIGBjYWxsYmFja2AgaXMgcHJvdmlkZWQsIHRoZSBzcGVjaWZpZWQgZXZlbnQgc3RyZWFtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBwcm9wZXJ0eTsgb3RoZXJ3aXNlLCBhIGZ1bmN0aW9uIHRvIHVuc3Vic2NyaWJlIHRvIHNhaWRcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3MgY2FsbGJhY2sgKi9cblx0XHRcdGlmIChjYWxsYmFjaykgeyByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjaykgfVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogUHJvY2VzcyB0aGUgYXJndW1lbnRzIGFjY2VwdGVkIGJ5IHtAbGluayBvbn0uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0X2dhdGhlck9uQXJndW1lbnRzKC4uLmFyZ3MpIHtcblx0XHRcdHZhciByZXN1bHQgPSB7IG5hbWU6IGFyZ3Muc2hpZnQoKSB9O1xuXG5cdFx0XHQvKiB0ZXN0IGZvciBleHBlY3RlZCB2YWx1ZSBhcmd1bWVudCAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmICFVLmlzRnVuY3Rpb24oYXJnc1swXSkgJiYgIVUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuZXhwZWN0ZWRWYWx1ZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGVzdCBmb3IgY2FsbGJhY2sgZnVuY3Rpb24gKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzRnVuY3Rpb24oYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdH0pO1xuXG5cblx0cmV0dXJuIEtlZmlyU2lnbmFsSGFuZGxlcjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanNcbiAqKi8iLCJkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfbmV4dElkID0gMDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG5cdFx0cmV0dXJuIGAke3ByZWZpeHx8XCJ1bmlxdWUtaWRcIn0tJHtfbmV4dElkKyt9YDtcblx0fTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdkZWx0YS1qcycgXSwgZnVuY3Rpb24gKFAsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGFscmVhZHkgY2FjaGVkPyAqL1xuXHRpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwpIHsgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsIH1cblxuXG5cdC8qIHRlbGwgZGVsdGEuanMgYWJvdXQgYmx1ZWJpcmQgKi9cblx0RE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcblxuXG5cdC8qIHNldCB0aGUgY2FjaGUgKi9cblx0d2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgPSBuZXcgRE0oKTtcblxuXG5cdC8qIHJldHVybiB0aGUgZGVsdGEgbW9kZWwgdGhhdCBtYW5hZ2VzIGFsbCBwbHVnaW5zICg9IGRlbHRhcykgKi9cblx0cmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL25ld1dpZGdldFR5cGUuanMnLFxuXHQnLi9taXNjLmpzJyxcblx0Jy4va2VmaXItc2lnbmFsLWhhbmRsZXIuanMnLFxuXHQnLi9kZWZlci5qcycsXG5cdCcuL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgbmV3V2lkZ2V0VHlwZSwgVSwgU2lnbmFsSGFuZGxlciwgZGVmZXIsIGRtKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdGlmICghd2luZG93Ll9hbXlQbHVnaW4pIHtcblx0XHR3aW5kb3cuX2FteVBsdWdpbiA9IGZ1bmN0aW9uIChwbHVnaW5PclNlbGVjdGlvbikge1xuXHRcdFx0aWYgKCQuaXNQbGFpbk9iamVjdChwbHVnaW5PclNlbGVjdGlvbikpIHtcblxuXHRcdFx0XHQvKiB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW4gKi9cblx0XHRcdFx0cmV0dXJuIG5ldyBkbS5EZWx0YShwbHVnaW5PclNlbGVjdGlvbi5uYW1lLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0VS5hc3NlcnQoIV9zZWxlY3RlZERlZmVycmVkLmRvbmUsXG5cdFx0XHRcdFx0XHRgQXBpTkFUT01ZIHBsdWdpbnMgY2FuIG9ubHkgYmUgc2VsZWN0ZWQgb25jZSwgYWZ0ZXIgd2hpY2ggdGhleSBhcmUgZml4ZWQuYCk7XG5cdFx0XHRcdF9zZWxlY3RlZERlZmVycmVkLmRvbmUgPSB0cnVlO1xuXG5cdFx0XHRcdC8qIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHNlbGVjdCBwbHVnaW5zIHRvIGJlIGFwcGxpZWQgKi9cblx0XHRcdFx0ZG0uc2VsZWN0LmFwcGx5KGRtLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHRcdF9zZWxlY3RlZERlZmVycmVkLnJlc29sdmUodGhpcyk7XG5cblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkO1xuXG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgX3NlbGVjdGVkRGVmZXJyZWQgPSBkZWZlcigpO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkID0gX3NlbGVjdGVkRGVmZXJyZWQucHJvbWlzZTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5ncmFwaCA9ICgpID0+IGRtLmdyYXBoKCk7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uZG0gPSBkbTtcblx0fVxuXG5cblx0cmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9wbHVnaW4uanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbiAoUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHZhciByZXNvbHZlLCByZWplY3Q7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcblx0XHRcdHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRyZWplY3QgPSBhcmd1bWVudHNbMV07XG5cdFx0fSk7XG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG5cdFx0XHRyZWplY3Q6IHJlamVjdCxcblx0XHRcdHByb21pc2U6IHByb21pc2Vcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvZGVmZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAna2VmaXInLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgS2VmaXIsIFRXRUVOKSB7XG5cblx0LyogS2VmaXIgalF1ZXJ5IHBsdWdpbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRcdHJlcXVpcmUoJ2tlZmlyLWpxdWVyeScpLmluaXQoS2VmaXIsICQpO1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQvLyBUaGlzIG1ldGhvZCB3b3JrcyB3aXRoIGV2ZW50cyB0aGF0IGNhbiBoYXZlIG9ubHkgb25lIHN1YnNjcmliZXIsXG5cdC8vIHRoYXQgY2FuIGJlIHVuLXN1YnNjcmliZWQgYnkgc2V0dGluZyB0aGUgc3Vic2NyaWJlciB0byBgbnVsbGAuXG5cdC8vIFRoaXMgZnVuY3Rpb24gaXMgbWVtb2l6ZWQsIHNvIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBpcyB0YWtlbixcblx0Ly8gYW5kIHRoZSBzYW1lIHN0cmVhbSBmb3IgaXQgcmV0dXJuZWQgZm9yIGVhY2ggcmVxdWVzdC5cblx0S2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBvYmoub24oZXZlbnROYW1lLCBudWxsKSB9O1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG5cdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG5cdFx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG5cdFx0XHQoKGYpID0+IHsgd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSB9KTtcblx0S2VmaXIuYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cblx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0dmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0KGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoKSA9PiB7XG5cdFx0XHRcdFx0ZW1pdHRlci5lbWl0KCk7XG5cdFx0XHRcdFx0aWYgKHN1YnNjcmliZWQpIHsgaXRlcmF0aW9uRm4oKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0LyogdW5zdWJzY3JpYmUgZnVuY3Rpb24gKi9cblx0XHRcdHJldHVybiAoKSA9PiB7IHN1YnNjcmliZWQgPSBmYWxzZSB9O1xuXG5cdFx0fSk7XG5cdH07XG5cblxuXHRLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ30pIHtcblxuXHRcdC8qIHRoZSB0d2VlbiAqL1xuXHRcdHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG5cblx0XHQvKiB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0dmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogYSBsb2NhbCBmdW5jdGlvbiB0byBwbHVnIGluIG90aGVyIHN0cmVhbXMsIGtlZXBpbmcgdHJhY2sgaW4gb3JkZXIgdG8gJ2VuZCcgdGhlIGJ1cyAqL1xuXHRcdHZhciBhZGRTdHJlYW0gPSAoKCkgPT4ge1xuXHRcdFx0dmFyIGNoYWluZWRTdHJlYW1zID0gMDtcblx0XHRcdHJldHVybiAoc3RyZWFtKSA9PiB7XG5cdFx0XHRcdGNoYWluZWRTdHJlYW1zICs9IDE7XG5cdFx0XHRcdGJ1cy5wbHVnKHN0cmVhbSk7XG5cdFx0XHRcdHN0cmVhbS5vbkVuZCgoKSA9PiB7XG5cdFx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgLT0gMTtcblx0XHRcdFx0XHRpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHsgYnVzLmVuZCgpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cblx0XHQvKiBtYWluIHN0cmVhbSAqL1xuXHRcdGFkZFN0cmVhbShLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRpZiAoZWFzaW5nKSB7IHR3LmVhc2luZyhlYXNpbmcpIH1cblx0XHRcdGlmIChkZWxheSkgIHsgdHcuZGVsYXkoZGVsYXkpIH1cblx0XHRcdHR3Lm9uVXBkYXRlKGZ1bmN0aW9uICgpIHsgZW1pdHRlci5lbWl0KHRoaXMpIH0pO1xuXHRcdFx0dHcub25Db21wbGV0ZShlbWl0dGVyLmVuZCk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRLZWZpci5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleUNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleUNvZGUpO1xuXHR9O1xuXG5cblx0S2VmaXIub25jZSA9IGZ1bmN0aW9uIG9uY2UodmFsdWUpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0ZW1pdHRlci5lbWl0KHZhbHVlKTtcblx0XHRcdGVtaXR0ZXIuZW5kKCk7XG5cdFx0fSk7XG5cdFx0Ly9yZXR1cm4gS2VmaXIuY29uc3RhbnQodmFsdWUpOyAvLyBUT0RPOiByZXBsYWNlIGFsbCAnb25jZScgY2FsbHMgd2l0aCAnY29uc3RhbnQnIGNhbGxzOyB0aGVuIHJlbW92ZSAnb25jZSdcblx0fTtcblxuXG5cdEtlZmlyLmZyb21BcnJheSA9IGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRhcnJheS5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRlbWl0dGVyLmVuZCgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gS2VmaXIuYnVzKCk7XG5cdFx0dmFyIG9wZW4gPSAgICAgIEtlZmlyLmJ1cygpO1xuXHRcdHZhciBjbG9zZSA9ICAgICBLZWZpci5idXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXJCeSh3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0aGFuZGxlcigoKSA9PiB7XG5cdFx0XHRcdG9wZW4uZW1pdCgpO1xuXHRcdFx0XHR3YW50ZWRCdXMuZW1pdChmYWxzZSk7XG5cdFx0XHRcdGNsb3NlLmVtaXQoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXBUbyh0cnVlKSk7XG5cdFx0XHRyZXR1cm4gS2VmaXIuY29uc3RhbnQodHJ1ZSkudGFrZSgxKS5jb25jYXQoY2xvc2UpLmZsYXRNYXBMYXRlc3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgYWNjdW11bGF0b3IgPSAoYXJyLCB2YWwpID0+IChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcblx0XHRcdFx0cmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeShvcGVuKS5yZWR1Y2UoYWNjdW11bGF0b3IsIFtdKS5mbGF0TWFwKEtlZmlyLmZyb21BcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoaXMgcmVzdHJpY3RzIGEgZ2l2ZW4gc3RyZWFtIHRvIGEgd3JhcHBlciBzdHJlYW0gY3JlYXRlZCB3aXRoIHRoZSBtZXRob2QgYWJvdmUuXG5cdC8vIEFsbCBpdHMgb3JpZ2luYWwgZXZlbnRzIGFyZSBub3cgZmlyZWQgaW5zaWRlIHRoZSBwcm92aWRlZCB3aW5kb3cuIFNldCBgb3B0aW9ucy5idWZmZXJgXG5cdC8vIHRvIGB0cnVlYCBpZiBhbGwgaXRzIGV2ZW50cyBzaG91bGQgYmUgYnVmZmVyZWQgYW5kIHJlbGVhc2VkIGluc2lkZSB0aGUgbmV4dCB3aW5kb3cuXG5cdC8vIE90aGVyd2lzZSwgb25seSB0aGUgbGFzdCBldmVudCBpcyByZXRhaW5lZC5cblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIFRoaXMgaXMgYSBjaGVhcCB2ZXJzaW9uIG9mIHRoZSBsaW1pdGVyIGRlZmluZWQgYWJvdmUuIFRPRE86IHVzZSB0aGUgbGltaXRlciB3aGVyZSB0aGlzIGlzIG5vdyB1c2VkXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHR2YXIgYnVmZmVyID0gW107XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSB0aGlzLm9uVmFsdWUoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGJ1ZmZlci5wdXNoKHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG5cdFx0XHRcdFx0YnVmZmVyID0gW107XG5cdFx0XHRcdFx0b2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvVGhpcygpO1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG5cdFx0XHRcdGJ1ZmZlciA9IG51bGw7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFRoaXMgZmlsdGVycyBhbiBvYnNlcnZhYmxlIHRvIG9ubHkgbGV0IHRocm91Z2ggdmFsdWVzIGVxdWFsIHRvIHRoZSBnaXZlbiB2YWx1ZS5cblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbXBhcmF0b3IpIHtcblx0XHRjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGUpID0+IGUgPT09IHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcblx0fTtcblxuXHQvLyBUaGlzIG1ha2VzIGEgc3Vic2NyaXB0aW9uIHRvIGFuIG9ic2VydmFibGUgdGhhdCBkb2Vzbid0IGRvIGFueXRoaW5nXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZG9Ob3RoaW5nID0gKCk9Pnt9O1xuXHRcdHRoaXMub25WYWx1ZShkb05vdGhpbmcpO1xuXHRcdHJldHVybiAoKSA9PiB7IHRoaXMub2ZmVmFsdWUoZG9Ob3RoaW5nKSB9O1xuXHR9O1xuXG5cdC8vIFRoaXMgaXMgYSAnc21hcnQnIC5zdG9wUHJvcGFnYXRpb24sIG1hcmtpbmcgZXZlbnRzIHdpdGggYSBsYWJlbFxuXHQvLyBhbmQgc2tpcHBpbmcgdGhvc2UgdGhhdCBhbHJlYWR5IGhhdmUgdGhhdCBsYWJlbC5cblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS5za2lwUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAobGFiZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGV2ZW50KSA9PiB7XG5cdFx0XHRyZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcblx0XHR9KS5tYXAoKGV2ZW50KSA9PiB7XG5cdFx0XHRVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF0gPSB0cnVlO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIEZpbHRlciBldmVudHMgdG8gb25seSBjZXJ0YWluIGtleXMgLyBidXR0b25zLiBDYW4gYmUgYSBwcmVkaWNhdGUgZnVuY3Rpb24gb3Igc2luZ2xlIG51bWJlci5cblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS53aGljaCA9IGZ1bmN0aW9uIChidXR0b25JZCkge1xuXHRcdHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKGIgPT4gYiA9PT0gYnV0dG9uSWQpO1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZSkgPT4gcHJlZChlLndoaWNoKSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdCQuZm4ubW91c2VEcmFnID0gZnVuY3Rpb24gbW91c2VEcmFnKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHRzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4geyAvLyBUT0RPOiBkb24ndCB1c2UgJ2ZpbHRlcicsIGJ1dCBzb21ldGhpbmcgbGlrZSAnc2tpcFVudGlsJyBvciAnZmxhdE1hcCdcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyZWFtXG5cdFx0XHRcdFx0LnRha2VVbnRpbEJ5KCQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKSlcblx0XHRcdFx0XHQubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWxCeSh1bnRpbFN0cmVhbSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBLZWZpcjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJywgJy4uL0FydGVmYWN0LmpzJywgJy4va2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUsIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiAgYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KSAgICAgICAgICAqL1xuXHQvKiAgYXMgYSBqUXVlcnkgZWxlbWVudCBwbHVnaW47IHRoaXMgaXMgcmV0dXJuZWQgZnJvbSB0aGUgbW9kdWxlICAqL1xuXHRmdW5jdGlvbiBuZXdXaWRnZXRUeXBlKHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cblx0XHQvKiB0aGUgc3BlY2lmaWMgd2lkZ2V0IGNsYXNzICovXG5cdFx0dmFyIFdpZGdldFAgPSBBcnRlZmFjdFAudGhlbigoQXJ0ZWZhY3QpID0+IEFydGVmYWN0Lm5ld1N1YmNsYXNzKHR5cGVOYW1lLCBmdW5jdGlvbiAoe2Nzc0NsYXNzfSkge1xuXG5cdFx0XHQvKiBzZXQgdGhlIGVsZW1lbnQgQ1NTIGNsYXNzICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoY3NzQ2xhc3MpKSB7IHRoaXMuZWxlbWVudC5hZGRDbGFzcyhjc3NDbGFzcykgfVxuXG5cdFx0XHQvKiBpZiB0aGUganF1ZXJ5IGVsZW1lbnQgaXMgcmVtb3ZlZCwgZGVzdHJveSB0aGUgYXJ0ZWZhY3QgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5hc0tlZmlyU3RyZWFtKCdyZW1vdmUnKS5vblZhbHVlKCgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSk7XG5cblx0XHR9LCB7XG5cblx0XHRcdGdldCBtb2RlbCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tb2RlbCB9LFxuXG5cdFx0XHRnZXQgZWxlbWVudCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5lbGVtZW50IH1cblxuXHRcdH0sIFUuZXh0ZW5kKHtcblxuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uOiBQLnJlc29sdmUoKSAvLyBndWFyYW50ZWUgYWxsIHdpZGdldCBjb25zdHJ1Y3Rpb24gdG8gYmUgYXN5bmNocm9ub3VzXG5cblx0XHR9LCBvcHRpb25EZWZhdWx0cykpKTtcblxuXHRcdC8qIGNyZWF0ZSBhIGxvd2VyY2FzZSBuYW1lIGZvciB0aGlzIHdpZGdldCB0eXBlICovXG5cdFx0dmFyIGxvd2VyY2FzZU5hbWUgPSB0eXBlTmFtZVswXS50b0xvd2VyQ2FzZSgpICsgdHlwZU5hbWUuc2xpY2UoMSk7XG5cblx0XHQvKiBqUXVlcnkgcGx1Z2luOiB0aGUgd2lkZ2V0IGNyZWF0aW9uICYgcmV0cmlldmFsIGZ1bmN0aW9uICAqL1xuXHRcdCQuZm5bbG93ZXJjYXNlTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG5cdFx0XHQvKiBpZiB0aGUgd29yZCAnaW5zdGFuY2UnIGlzIHBhc3NlZCwgcmV0dXJuIHRoZSAoYWxyZWFkeSBjcmVhdGVkKSB3aWRnZXQgcHJvbWlzZSAqL1xuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdpbnN0YW5jZScpIHsgcmV0dXJuIHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCkgfVxuXG5cdFx0XHQvKiBlbHNlLCBjcmVhdGUgYSBuZXcgd2lkZ2V0IGFuZCBzZXQgYSBwcm9taXNlIHRvIGl0ICovXG5cdFx0XHR0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWAsIFdpZGdldFBcblx0XHRcdFx0XHQudGhlbigoV2lkZ2V0KSA9PiBuZXcgV2lkZ2V0KFUuZXh0ZW5kKG9wdGlvbnMsIHsgZWxlbWVudDogdGhpcyB9KSkuY29uc3RydWN0ZWQpKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb24gKi9cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHRcdC8qIHJldHVybiBhIHByb21pc2UgdG8gdGhlIHdpZGdldCBhcnRlZmFjdCBjbGFzcyAqL1xuXHRcdHJldHVybiBXaWRnZXRQO1xuXG5cdH1cblxuXG5cdC8qIGV4cG9zZSB0aGUgd2lkZ2V0IGNsYXNzIGNyZWF0b3IgZnVuY3Rpb24gKi9cblx0cmV0dXJuIG5ld1dpZGdldFR5cGU7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL25ld1dpZGdldFR5cGUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE0X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJrZWZpci1qcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJEM0dyb3VwLmpzIn0=