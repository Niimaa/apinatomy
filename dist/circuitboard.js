(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "js-graph"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("js-graph")) : factory(root["jQuery"], root["P"], root["JsGraph"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, amyWidget, U, PluginHandler, defer) {
	  'use strict';
	  var beforeConstruction = defer();
	  var widgetArtefacts = {
	    Circuitboard: amyWidget('Circuitboard', {
	      beforeConstruction: beforeConstruction.promise,
	      cssClass: "circuitboard",
	      filter: (function() {
	        return P.resolve(true);
	      }),
	      model: null
	    }),
	    Tilemap: amyWidget('Tilemap', {
	      beforeConstruction: beforeConstruction.promise,
	      cssClass: "tilemap",
	      model: null,
	      _circuitboard: null
	    }),
	    Tile: amyWidget('Tile', {
	      beforeConstruction: beforeConstruction.promise,
	      cssClass: 'tile',
	      model: null,
	      _circuitboard: null
	    })
	  };
	  var pluginHandler = new PluginHandler();
	  U.object($, 'circuitboard').plugin = function plugin(pluginOrSelection) {
	    if ($.isPlainObject(pluginOrSelection)) {
	      return pluginHandler.register(pluginOrSelection);
	    } else {
	      U.assert(U.isDefined(widgetArtefacts), "The plugins are being selected before the circuitboard artefacts were registered. " + "Have you loaded the ApiNATOMY files in a strange order?");
	      pluginHandler.select(pluginOrSelection);
	      return pluginHandler.apply(widgetArtefacts).then(beforeConstruction.resolve, beforeConstruction.reject).return();
	    }
	  };
	  $.circuitboard.plugin.graph = (function() {
	    return pluginHandler.graph();
	  });
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U) {
	  'use strict';
	  function enableSignalHandling(obj) {
	    var _callbacks = {};
	    function _signalCallbacks(signal) {
	      if (!_callbacks[signal]) {
	        _callbacks[signal] = $.Callbacks();
	      }
	      return _callbacks[signal];
	    }
	    $.extend(obj, {
	      on: function(signal, fn) {
	        _signalCallbacks(signal).add(fn);
	      },
	      off: function(signal, fn) {
	        _signalCallbacks(signal).remove(fn);
	      },
	      one: function(signal, fn) {
	        var $__0 = arguments,
	            $__1 = this;
	        var paddedFn = (function() {
	          fn.apply(null, $__0);
	          $__1.off(signal, paddedFn);
	        });
	        this.on(signal, paddedFn);
	      },
	      once: function(signal, fn) {
	        this.one(signal, fn);
	      },
	      trigger: function(signal) {
	        for (var args = [],
	            $__2 = 1; $__2 < arguments.length; $__2++)
	          args[$__2 - 1] = arguments[$__2];
	        var callbacks = _callbacks[signal];
	        if (callbacks) {
	          callbacks.fireWith(this, args);
	        }
	      }
	    });
	  }
	  function defineHierarchyMethods(obj, type) {
	    Object.defineProperty(obj, 'type', {get: function() {
	        return type;
	      }});
	    Object.defineProperty(obj, 'parent', {
	      set: function(parent) {
	        this._parent = parent;
	        U.array(parent, '_children').push(this);
	      },
	      get: function() {
	        return this._parent;
	      }
	    });
	    Object.defineProperty(obj, 'children', {get: function() {
	        return this._children;
	      }});
	    $.extend(obj, {
	      closestAncestorByType: function(type) {
	        var result = this;
	        do {
	          result = result.parent;
	        } while (result && result.type && result.type !== type);
	        return result;
	      },
	      closestDescendantsByType: function(type) {
	        var result = [];
	        (this.children || []).forEach((function(child) {
	          if (child.type === type) {
	            result.push(child);
	          } else {
	            result = result.concat(child.closestDescendantsByType(type));
	          }
	        }));
	        return result;
	      }
	    });
	  }
	  function defineDefaultProperties(obj) {
	    Object.defineProperty(obj, 'model', {get: function() {
	        return this.options.model;
	      }});
	  }
	  function amyWidget(typeName, optionDefaults) {
	    function Widget($__3) {
	      var $__4 = $__3,
	          options = $__4.options,
	          element = $__4.element;
	      var $__0 = this;
	      $.extend(this, {
	        options: $.extend({}, optionDefaults, options),
	        element: element,
	        destroy: function() {
	          this.trigger('destroy');
	        }
	      });
	      enableSignalHandling(this);
	      this.element.addClass(this.options.cssClass);
	      this.element.one('remove', (function() {
	        $__0.destroy();
	      }));
	      if (this.options.parent) {
	        this.parent = this.options.parent;
	      }
	      Object.defineProperty(this, 'circuitboard', {get: function() {
	          return this.closestAncestorByType('Circuitboard');
	        }});
	      this.constructed = P.resolve();
	      this.beforeConstruction(this.options.beforeConstruction);
	      this.constructed.then((function() {
	        if ($.isFunction($__0.construct)) {
	          $__0.beforeConstruction($__0.construct());
	        }
	      }));
	    }
	    Widget.prototype.beforeConstruction = function beforeConstruction(possiblePromise) {
	      this.constructed = this.constructed.return(P.resolve(possiblePromise)).return(this);
	    };
	    defineDefaultProperties(Widget.prototype);
	    defineHierarchyMethods(Widget.prototype, typeName);
	    var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
	    $.fn[lowercaseName] = function(options) {
	      if (options === 'instance') {
	        return this.data(("-amy-" + lowercaseName));
	      }
	      var newWidget = new Widget({
	        options: options,
	        element: this
	      });
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var U = {
	    approx: function(val1, val2, epsilon) {
	      if (U.isUndefined(epsilon)) {
	        epsilon = 1e-5;
	      }
	      return (Math.abs(val1 - val2) < epsilon);
	    },
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    object: function(obj, name) {
	      if (!$.isPlainObject(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (!$.isArray(obj[name])) {
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
	          $__0 = 2; $__0 < arguments.length; $__0++)
	        args[$__0 - 2] = arguments[$__0];
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
	          $__1 = 0; $__1 < arguments.length; $__1++)
	        values[$__1] = arguments[$__1];
	      for (var i = 0; i < values.length; i += 1) {
	        if (U.isDefined(values[i])) {
	          return values[i];
	        }
	      }
	    },
	    forEachReverse: function(A, fn) {
	      var i = A.length;
	      while (i--) {
	        fn(A[i], i, A);
	      }
	    },
	    debounce: function(func, wait, context) {
	      var timeout;
	      return function() {
	        for (var args = [],
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          args[$__2] = arguments[$__2];
	        var laterFn = (function() {
	          timeout = null;
	          func.apply(context, args);
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
	      return function stopEachAnimationFrame() {
	        stop = true;
	      };
	    },
	    oncePerStack: function(func, context) {
	      var notRunYet = true;
	      return function() {
	        for (var args = [],
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          args[$__2] = arguments[$__2];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context, args);
	        }
	      };
	    },
	    observable: function(obj, $__3) {
	      var $__4 = $__3,
	          name = $__4.name,
	          initial = $__4.initial,
	          validation = $__4.validation;
	      var value = initial;
	      Object.defineProperty(obj, name, {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          var oldValue = value;
	          if (validation) {
	            newValue = validation(newValue, oldValue);
	          }
	          if (newValue !== oldValue) {
	            value = newValue;
	            this.trigger(name, newValue, oldValue);
	          }
	        }
	      });
	    },
	    cached: function(options) {
	      var retrieve = options.retrieve,
	          isEqual = options.isEqual || ((function(a, b) {
	            return (a === b);
	          }));
	      var cache;
	      function setValue() {
	        var oldValue = cache;
	        cache = retrieve();
	        if (onChange && !isEqual(cache, oldValue)) {
	          onChange(cache, oldValue);
	        }
	      }
	      setTimeout(setValue, 0);
	      var oncePerStackSetValue = U.oncePerStack(setValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange;
	      resultFn.onChange = (function(cb) {
	        onChange = cb;
	        return resultFn;
	      });
	      return resultFn;
	    }
	  };
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(2), __webpack_require__(8), __webpack_require__(4), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, JsGraph, P, traverse, U, Delta) {
	  'use strict';
	  return function PluginHandler() {
	    var _plugins = new JsGraph();
	    var _dynamicFeatureConfiguration = {};
	    var _featureConfigurationCache = {};
	    var _pluginPredicates = {};
	    function _addPluginConditionDisjunct(name, condition) {
	      function accumulate(lazyCondition) {
	        var oldPredicate = _pluginPredicates[name];
	        _pluginPredicates[name] = (function(context) {
	          if (_featureConfigurationCache[name]) {
	            return true;
	          }
	          _featureConfigurationCache[name] = (oldPredicate && oldPredicate(context)) || lazyCondition(context);
	          return _featureConfigurationCache[name];
	        });
	      }
	      if (U.isUndefined(condition)) {
	        accumulate((function() {
	          return false;
	        }));
	      } else if (typeof condition === 'string') {
	        accumulate((function() {
	          return _dynamicFeatureConfiguration[condition];
	        }));
	      } else if ($.isArray(condition)) {
	        accumulate((function() {
	          return condition.every((function(conjunct) {
	            return _dynamicFeatureConfiguration[conjunct];
	          }));
	        }));
	      } else if ($.isFunction(condition)) {
	        accumulate((function() {
	          return condition(_dynamicFeatureConfiguration);
	        }));
	      } else {
	        accumulate((function() {
	          return !!condition;
	        }));
	      }
	    }
	    function _addPluginRequirements(pluginName, otherPlugins) {
	      if (U.isUndefined(otherPlugins)) {
	        return;
	      }
	      U.assert($.isArray(otherPlugins), "The 'requires' clause of a plugin should be an array of plugin names.");
	      otherPlugins.forEach((function(otherPlugin) {
	        _addPluginConditionDisjunct(otherPlugin, pluginName);
	      }));
	    }
	    this.graph = function() {
	      return _plugins;
	    };
	    this.register = function register(plugin) {
	      U.assert($.isPlainObject(plugin), "An ApiNATOMY plugin should be a plain object.");
	      U.assert(typeof plugin.name === 'string', "An ApiNATOMY plugin should have a name.");
	      if (!$.isArray(plugin.after)) {
	        plugin.after = [];
	      }
	      _addPluginConditionDisjunct(plugin.name, plugin.if);
	      Object.defineProperty(_dynamicFeatureConfiguration, plugin.name, {get: function() {
	          return _pluginPredicates[plugin.name](_dynamicFeatureConfiguration);
	        }});
	      _addPluginRequirements(plugin.name, plugin.require);
	      _plugins.addVertex(plugin.name, plugin);
	      $.each(plugin.after, (function(__, v) {
	        _plugins.createEdge(v, plugin.name);
	      }));
	      if (_plugins.hasCycle()) {
	        throw new Error("The plugin application order has a cycle.");
	      }
	      plugin.delta = new Delta(plugin);
	      return plugin.delta;
	    };
	    this.select = function select(pluginNames) {
	      if ($.isArray(pluginNames)) {
	        pluginNames.forEach(select);
	      }
	      _addPluginConditionDisjunct(pluginNames, true);
	    };
	    this.apply = function apply(obj) {
	      return P.all(traverse(_plugins, (function(pluginName, plugin) {
	        if (!_dynamicFeatureConfiguration[pluginName]) {
	          return;
	        }
	        U.assert(plugin, ("I don't know the '" + pluginName + "' plugin."));
	        return P.resolve(plugin.delta.apply(obj));
	      })));
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, defer) {
	  'use strict';
	  return function traverseDAG(graph, fn) {
	    var nodeDeferreds = {};
	    function nodeDeferred(id) {
	      if (!nodeDeferreds[id]) {
	        nodeDeferreds[id] = defer();
	      }
	      return nodeDeferreds[id];
	    }
	    var sinkPromises = [];
	    graph.eachVertex((function(key, val) {
	      var preds = graph.predecessors(key);
	      var succs = graph.successors(key);
	      if (succs.length === 0) {
	        sinkPromises.push(nodeDeferred(key).promise);
	      }
	      P.all(preds.map((function(pred) {
	        return nodeDeferred(pred).promise;
	      }))).then((function(predResults) {
	        nodeDeferred(key).resolve(fn(key, val, predResults));
	      }));
	    }));
	    return sinkPromises;
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(2), __webpack_require__(8), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, JsGraph, P, traverse, U) {
	  'use strict';
	  var $__0 = this;
	  var opTypes = {};
	  var composeFns = [];
	  function addOperationType($__3) {
	    var $__4 = $__3,
	        name = $__4.name,
	        constructorFn = $__4.constructor,
	        applyFn = $__4.apply,
	        prototype = $__4.prototype,
	        method = $__4.method;
	    var objectWithMethod = {};
	    if (U.isDefined(method)) {
	      Object.defineProperty(objectWithMethod, name, {value: method});
	    } else {
	      Object.defineProperty(objectWithMethod, name, {value: function(property) {
	          for (var values = [],
	              $__1 = 1; $__1 < arguments.length; $__1++)
	            values[$__1 - 1] = arguments[$__1];
	          this._addOperation(opTypes[name], property, values);
	          return this;
	        }});
	    }
	    opTypes[name] = {
	      name: name,
	      Delta: constructorFn,
	      method: objectWithMethod[name]
	    };
	    $.extend(opTypes[name].Delta.prototype, prototype, {
	      constructor: constructorFn,
	      type: name,
	      apply: applyFn,
	      compose: function(property, op2) {
	        var $__0 = this;
	        if (U.isUndefined(op2)) {
	          return this;
	        }
	        var foundComposeFn;
	        composeFns.some((function($__4) {
	          var $__5 = $__4,
	              op1Type = $__5.op1Type,
	              op2Type = $__5.op2Type,
	              composeFn = $__5.composeFn;
	          if ($__0.type === op1Type && op2.type === op2Type) {
	            foundComposeFn = composeFn;
	            return true;
	          }
	        }));
	        if (foundComposeFn) {
	          foundComposeFn(this, property, op2);
	        } else {
	          var err = new Error(("You cannot follow a '" + this.type + "' operation ") + ("with a '" + op2.type + "' operation on the same property."));
	          err.op1 = this.type;
	          err.op2 = op2.type;
	          throw err;
	        }
	      }
	    });
	    opTypes['modify'].Delta.prototype[name] = opTypes[name].method;
	  }
	  function addOperationAlias($__3) {
	    var $__4 = $__3,
	        name = $__4.name,
	        target = $__4.target,
	        transform = $__4.transform;
	    var objectWithMethod = {};
	    Object.defineProperty(objectWithMethod, name, {value: function(property) {
	        for (var values = [],
	            $__1 = 1; $__1 < arguments.length; $__1++)
	          values[$__1 - 1] = arguments[$__1];
	        this._addOperation(opTypes[target], property, transform(values));
	        return this;
	      }});
	    opTypes[name] = {
	      name: name,
	      method: objectWithMethod[name]
	    };
	    opTypes['modify'].Delta.prototype[name] = opTypes[name].method;
	  }
	  function addCompositionRule(op1Type, op2Type, composeFn) {
	    composeFns.push({
	      op1Type: op1Type,
	      op2Type: op2Type,
	      composeFn: composeFn
	    });
	  }
	  var keepFirst = (function() {});
	  var keepSecond = (function(d1, p, d2) {
	    d1[p] = d2;
	  });
	  addOperationType({
	    name: 'modify',
	    constructor: function Modify(deltaDescription, operations) {
	      var $__0 = this;
	      deltaDescription = deltaDescription || {};
	      this.operations = operations || {};
	      $.each(deltaDescription, (function(key, value) {
	        var match = key.match(/^(\w+)\s+([\w\.]+)$/);
	        if (match) {
	          var operation = match[1];
	          var property = match[2];
	          U.assert(operation in opTypes, ("I don't know the '" + operation + "' operation."));
	          $__0[operation](property, value);
	        }
	      }));
	    },
	    apply: function(obj, property) {
	      var $__0 = this;
	      if (U.isDefined(property)) {
	        U.assert(U.isDefined(obj[property]), "The 'modify' operation expects the property to be already defined.");
	        Object.keys(this.operations).forEach((function(subProperty) {
	          $__0.operations[subProperty].apply(obj[property], subProperty);
	        }));
	      } else {
	        U.assert(U.isDefined(obj), "The 'modify' operation expects the property to be already defined.");
	        Object.keys(this.operations).forEach((function(subProperty) {
	          $__0.operations[subProperty].apply(obj, subProperty);
	        }));
	      }
	    },
	    prototype: {_addOperation: function(opType, property, values) {
	        var dotIndex = property.indexOf('.');
	        if (dotIndex !== -1) {
	          var actualProperty = property.slice(0, dotIndex);
	          var restOfProperty = property.slice(dotIndex + 1);
	          var newModifyDelta = this._addOperation(opTypes['modify'], actualProperty);
	          return newModifyDelta[opType.name].apply(newModifyDelta, [restOfProperty].concat(values));
	        } else {
	          var newDelta = U.applyConstructor(opType.Delta, values);
	          if (this.operations.hasOwnProperty(property) && U.isDefined(this.operations[property])) {
	            this.compose(property, newDelta);
	          } else {
	            this.operations[property] = newDelta;
	          }
	          return this.operations[property];
	        }
	      }},
	    method: function(property, deltaDescription) {
	      return this._addOperation(opTypes['modify'], property, [deltaDescription]);
	    }
	  });
	  addOperationType({
	    name: 'add',
	    constructor: function Add(value) {
	      this.value = value;
	    },
	    apply: function(obj, property) {
	      U.assert(U.isUndefined(obj[property]), "The 'add' operation expects the property to first be undefined.");
	      obj[property] = this.value;
	    }
	  });
	  addOperationType({
	    name: 'replace',
	    constructor: function Replace(value) {
	      this.value = value;
	    },
	    apply: function(obj, property) {
	      U.assert(U.isDefined(obj[property]), "The 'replace' operation expects the property to be already defined.");
	      obj[property] = this.value;
	    }
	  });
	  addOperationType({
	    name: 'remove',
	    constructor: function Remove() {},
	    apply: function(obj, property) {
	      U.assert(U.isDefined(obj[property]), "The 'remove' operation expects the property to first be defined.");
	      delete obj[property];
	    }
	  });
	  addOperationType({
	    name: 'forbid',
	    constructor: function Forbid() {},
	    apply: function(obj, property) {
	      U.assert(U.isUndefined(obj[property]), "The 'forbid' operation requires the property to be undefined.");
	    }
	  });
	  addCompositionRule('add', 'replace', (function(d1, p, d2) {
	    d1[p] = new opTypes['add'].Delta(d2.value);
	  }));
	  addCompositionRule('add', 'modify', (function(d1, p, d2) {
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('add', 'remove', (function(d1, p) {
	    d1[p] = new opTypes['forbid'].Delta();
	  }));
	  addCompositionRule('replace', 'replace', keepSecond);
	  addCompositionRule('replace', 'modify', (function(d1, p, d2) {
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('replace', 'remove', keepSecond);
	  addCompositionRule('modify', 'replace', keepSecond);
	  addCompositionRule('modify', 'modify', (function(d1, p, d2) {
	    Object.keys(d2.operations).forEach((function(prop) {
	      d1.compose(prop, d2.operations[prop]);
	    }));
	  }));
	  addCompositionRule('modify', 'remove', keepSecond);
	  addCompositionRule('remove', 'add', (function(d1, p, d2) {
	    d1[p] = new opTypes['replace'].Delta(d2.value);
	  }));
	  addCompositionRule('remove', 'forbid', keepFirst);
	  addCompositionRule('forbid', 'add', keepSecond);
	  addCompositionRule('forbid', 'forbid', keepFirst);
	  addOperationType({
	    name: 'alter',
	    constructor: function Alter(value) {
	      this.value = value || [];
	    },
	    apply: function(obj, property) {
	      U.assert($.isFunction(obj[property]), "The operation 'alter' expects the property to be a function.");
	      this.value.forEach((function(subOp) {
	        var partOne = obj[property];
	        var partTwo = subOp.value;
	        if (subOp.type === 'prepend') {
	          obj[property] = function() {
	            for (var args = [],
	                $__1 = 0; $__1 < arguments.length; $__1++)
	              args[$__1] = arguments[$__1];
	            partTwo.apply(this, args);
	            partOne.apply(this, args);
	          };
	        } else {
	          obj[property] = function() {
	            for (var args = [],
	                $__2 = 0; $__2 < arguments.length; $__2++)
	              args[$__2] = arguments[$__2];
	            partOne.apply(this, args);
	            partTwo.apply(this, args);
	          };
	        }
	      }));
	    }
	  });
	  addCompositionRule('alter', 'alter', (function(d1, p, d2) {
	    [].push.apply(d1[p].value, $__0.value);
	  }));
	  addCompositionRule('alter', 'replace', keepSecond);
	  addCompositionRule('alter', 'remove', (function(d1, p) {
	    d1[p] = new opTypes['forbid'].Delta();
	  }));
	  addCompositionRule('add', 'alter', (function(d1, p, d2) {
	    U.assert($.isFunction(d1[p].value), "The operation 'alter' expects the property it acts on to be a function.");
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('replace', 'alter', (function(d1, p, d2) {
	    U.assert($.isFunction(d1[p].value), "The operation 'alter' expects the property it acts on to be a function.");
	    d2.apply(d1[p], 'value');
	  }));
	  ['prepend', 'insert', 'append'].forEach((function(opType) {
	    addOperationAlias({
	      name: opType,
	      target: 'alter',
	      transform: (function(args) {
	        return [[{
	          type: opType,
	          value: args[0]
	        }]];
	      })
	    });
	  }));
	  addOperationType({
	    name: 'after',
	    constructor: function After(value) {
	      this.value = value;
	    },
	    apply: function(obj, property) {
	      U.assert($.isFunction(obj[property]), "The operation 'after' expects the property to be a function.");
	      var partOne = obj[property];
	      var partTwo = this.value;
	      obj[property] = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        return P.resolve(partOne.apply(this, args)).then(function() {
	          return partTwo.apply(this, args);
	        }.bind(this));
	      };
	    }
	  });
	  addCompositionRule('after', 'replace', keepSecond);
	  addCompositionRule('after', 'remove', keepSecond);
	  addCompositionRule('add', 'after', (function(d1, p, d2) {
	    U.assert($.isFunction(d1[p].value), "The operation 'after' expects the property it acts on to be undefined or a function.");
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('replace', 'after', (function(d1, p, d2) {
	    U.assert($.isFunction(d1[p].value), "The operation 'after' expects the property it acts on to be undefined or a function.");
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('insert', 'after', (function(d1, p, d2) {
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('after', 'insert', (function(d1, p, d2) {
	    d2.apply(d1[p], 'value');
	  }));
	  return opTypes['modify'].Delta;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4YzExYTllYWFlMDc4NDlkMDMwZCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9wbHVnaW4taGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL3RyYXZlcnNlLWRhZy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWx0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7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QUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQ2pELFlBQVEsQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFFLEVBQUMsTUFBTSxDQUFDLENBQy9CLHVGQUFxRixDQUFDLENBQUM7QUFDekYsTUFBQyxNQUFPLENBQUMsRUFBQyxDQUFFLEVBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztHQUN6QixFQUFDLENBQUM7QUFDRixvQkFBa0IsQ0FBQyxTQUFRLENBQUcsUUFBTSxHQUFHLFNBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQ3JELFlBQVEsQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFFLEVBQUMsTUFBTSxDQUFDLENBQy9CLHVGQUFxRixDQUFDLENBQUM7QUFDekYsTUFBQyxNQUFPLENBQUMsRUFBQyxDQUFFLEVBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztHQUN6QixFQUFDLENBQUM7QUFDRixvQkFBa0IsQ0FBQyxRQUFPLENBQUcsUUFBTSxHQUFHLFNBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQUUsTUFBQyxNQUFPLENBQUMsRUFBQyxDQUFFLEVBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztHQUFFLEVBQUMsQ0FBQztBQUNuRixvQkFBa0IsQ0FBQyxPQUFNLENBQUcsU0FBTyxHQUFHLFNBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQUUsTUFBQyxNQUFPLENBQUMsRUFBQyxDQUFFLEVBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztHQUFFLEVBQUMsQ0FBQztBQVNuRixRQUFPLFFBQU0sQ0FBRSxRQUFPLENBQUMsTUFBTSxDQUFDO0FBRS9CLEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJqcy1ncmFwaFwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiSnNHcmFwaFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOGMxMWE5ZWFhZTA3ODQ5ZDAzMGRcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vdXRpbC93aWRnZXQuanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL3BsdWdpbi1oYW5kbGVyLmpzJyxcblx0Jy4vdXRpbC9kZWZlci5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBhbXlXaWRnZXQsIFUsIFBsdWdpbkhhbmRsZXIsIGRlZmVyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyBzZXQgdXAgYSBwcm9taXNlIGNoYWluIGZvciBndWlkaW5nIHdpZGdldCBjb25zdHJ1Y3Rpb25cblx0Ly9cblx0dmFyIGJlZm9yZUNvbnN0cnVjdGlvbiA9IGRlZmVyKCk7XG5cblx0Ly9cblx0Ly8gY3JlYXRlIGFuZCByZWdpc3RlciB0aGUgdGhyZWUgdHlwZXMgb2Ygd2lkZ2V0OlxuXHQvLyBDaXJjdWl0Ym9hcmQsIHRpbGVtYXAgYW5kIHRpbGVcblx0Ly9cblx0dmFyIHdpZGdldEFydGVmYWN0cyA9IHtcblx0XHRDaXJjdWl0Ym9hcmQ6IGFteVdpZGdldCgnQ2lyY3VpdGJvYXJkJywge1xuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uOiBiZWZvcmVDb25zdHJ1Y3Rpb24ucHJvbWlzZSxcblx0XHRcdGNzc0NsYXNzOiBcImNpcmN1aXRib2FyZFwiLFxuXHRcdFx0ZmlsdGVyOiAoKT0+UC5yZXNvbHZlKHRydWUpLFxuXHRcdFx0bW9kZWw6IG51bGxcblx0XHR9KSxcblx0XHRUaWxlbWFwOiBhbXlXaWRnZXQoJ1RpbGVtYXAnLCB7XG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb246IGJlZm9yZUNvbnN0cnVjdGlvbi5wcm9taXNlLFxuXHRcdFx0Y3NzQ2xhc3M6IFwidGlsZW1hcFwiLFxuXHRcdFx0bW9kZWw6IG51bGwsXG5cdFx0XHRfY2lyY3VpdGJvYXJkOiBudWxsXG5cdFx0fSksXG5cdFx0VGlsZTogYW15V2lkZ2V0KCdUaWxlJywge1xuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uOiBiZWZvcmVDb25zdHJ1Y3Rpb24ucHJvbWlzZSxcblx0XHRcdGNzc0NsYXNzOiAndGlsZScsXG5cdFx0XHRtb2RlbDogbnVsbCxcblx0XHRcdF9jaXJjdWl0Ym9hcmQ6IG51bGxcblx0XHR9KVxuXHR9O1xuXG5cdC8vXG5cdC8vIGFsbG93ICckLmNpcmN1aXRib2FyZCcgdG8gYWNjZXB0IHBsdWdpbnNcblx0Ly9cblx0dmFyIHBsdWdpbkhhbmRsZXIgPSBuZXcgUGx1Z2luSGFuZGxlcigpO1xuXHRVLm9iamVjdCgkLCAnY2lyY3VpdGJvYXJkJykucGx1Z2luID0gZnVuY3Rpb24gcGx1Z2luKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG5cdFx0aWYgKCQuaXNQbGFpbk9iamVjdChwbHVnaW5PclNlbGVjdGlvbikpIHtcblx0XHRcdC8vLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVnaXN0ZXIgYSBuZXcgcGx1Z2luXG5cdFx0XHRyZXR1cm4gcGx1Z2luSGFuZGxlci5yZWdpc3RlcihwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2VsZWN0IHBsdWdpbnMgdG8gYmUgYXBwbGllZFxuXHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQod2lkZ2V0QXJ0ZWZhY3RzKSxcblx0XHRcdFx0XHRgVGhlIHBsdWdpbnMgYXJlIGJlaW5nIHNlbGVjdGVkIGJlZm9yZSB0aGUgY2lyY3VpdGJvYXJkIGFydGVmYWN0cyB3ZXJlIHJlZ2lzdGVyZWQuIGAgK1xuXHRcdFx0XHRcdGBIYXZlIHlvdSBsb2FkZWQgdGhlIEFwaU5BVE9NWSBmaWxlcyBpbiBhIHN0cmFuZ2Ugb3JkZXI/YCk7XG5cdFx0XHRwbHVnaW5IYW5kbGVyLnNlbGVjdChwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHRyZXR1cm4gcGx1Z2luSGFuZGxlci5hcHBseSh3aWRnZXRBcnRlZmFjdHMpXG5cdFx0XHRcdFx0LnRoZW4oYmVmb3JlQ29uc3RydWN0aW9uLnJlc29sdmUsIGJlZm9yZUNvbnN0cnVjdGlvbi5yZWplY3QpXG5cdFx0XHRcdFx0LnJldHVybigpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBmb3IgZ2V0dGluZyB0aGUgcGx1Z2luIGdyYXBoXG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbi5ncmFwaCA9ICgpID0+IHBsdWdpbkhhbmRsZXIuZ3JhcGgoKTtcblxuXHQvL1xuXHQvLyByZXR1cm4gdGhlIHN0YXRpYyBgJC5jaXJjdWl0Ym9hcmRgIG9iamVjdCxcblx0Ly8gdGhyb3VnaCB3aGljaCBwbHVnaW5zIGNhbiBiZSBhcHBsaWVkIGFuZCBzZWxlY3RlZFxuXHQvL1xuXHRyZXR1cm4gJC5jaXJjdWl0Ym9hcmQ7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoJCwgUCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBhZGQgc2lnbmFsIGhhbmRsaW5nIG1ldGhvZHMgdG8gYW4gb2JqZWN0XG5cdC8vXG5cdGZ1bmN0aW9uIGVuYWJsZVNpZ25hbEhhbmRsaW5nKG9iaikge1xuXHRcdHZhciBfY2FsbGJhY2tzID0ge307XG5cblx0XHRmdW5jdGlvbiBfc2lnbmFsQ2FsbGJhY2tzKHNpZ25hbCkge1xuXHRcdFx0aWYgKCFfY2FsbGJhY2tzW3NpZ25hbF0pIHtcblx0XHRcdFx0X2NhbGxiYWNrc1tzaWduYWxdID0gJC5DYWxsYmFja3MoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfY2FsbGJhY2tzW3NpZ25hbF07XG5cdFx0fVxuXG5cdFx0JC5leHRlbmQob2JqLCB7XG5cdFx0XHRvbihzaWduYWwsIGZuKSB7IF9zaWduYWxDYWxsYmFja3Moc2lnbmFsKS5hZGQoZm4pIH0sXG5cdFx0XHRvZmYoc2lnbmFsLCBmbikgeyBfc2lnbmFsQ2FsbGJhY2tzKHNpZ25hbCkucmVtb3ZlKGZuKSB9LFxuXHRcdFx0b25lKHNpZ25hbCwgZm4pIHtcblx0XHRcdFx0dmFyIHBhZGRlZEZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0dGhpcy5vZmYoc2lnbmFsLCBwYWRkZWRGbik7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMub24oc2lnbmFsLCBwYWRkZWRGbik7XG5cdFx0XHR9LFxuXHRcdFx0b25jZShzaWduYWwsIGZuKSB7IHRoaXMub25lKHNpZ25hbCwgZm4pIH0sXG5cdFx0XHR0cmlnZ2VyKHNpZ25hbCwgLi4uYXJncykge1xuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gX2NhbGxiYWNrc1tzaWduYWxdO1xuXHRcdFx0XHRpZiAoY2FsbGJhY2tzKSB7IGNhbGxiYWNrcy5maXJlV2l0aCh0aGlzLCBhcmdzKSB9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIGltcGxlbWVudCBhcnRlZmFjdCBoaWVyYXJjaHkgbWV0aG9kc1xuXHQvL1xuXHRmdW5jdGlvbiBkZWZpbmVIaWVyYXJjaHlNZXRob2RzKG9iaiwgdHlwZSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICd0eXBlJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdHlwZSB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ3BhcmVudCcsIHtcblx0XHRcdHNldChwYXJlbnQpIHtcblx0XHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0XHRVLmFycmF5KHBhcmVudCwgJ19jaGlsZHJlbicpLnB1c2godGhpcyk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fcGFyZW50IH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnY2hpbGRyZW4nLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl9jaGlsZHJlbiB9XG5cdFx0fSk7XG5cdFx0JC5leHRlbmQob2JqLCB7XG5cdFx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcztcblx0XHRcdFx0ZG8geyByZXN1bHQgPSByZXN1bHQucGFyZW50IH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0Y2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0XHQodGhpcy5jaGlsZHJlbiB8fCBbXSkuZm9yRWFjaCgoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRpZiAoY2hpbGQudHlwZSA9PT0gdHlwZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gbWFrZSBzb21lIGltcG9ydGFudCByZWZlcmVuY2VzIHRoYXQgYXJlIHBhcnRcblx0Ly8gb2YgdGhlIG9wdGlvbnMgcHJvcGVydHkgYXZhaWxhYmxlIGluIHRoZSBvYmplY3QgaXRzZWxmXG5cdC8vXG5cdGZ1bmN0aW9uIGRlZmluZURlZmF1bHRQcm9wZXJ0aWVzKG9iaikge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtb2RlbCcsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tb2RlbCB9XG5cdFx0fSk7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbiBhcGluYXRvbXkgY29tcG9uZW50ICh3aWRnZXQpXG5cdC8vIGFzIGEgalF1ZXJ5IGVsZW1lbnQgcGx1Z2luOyB0aGlzIGlzIHJldHVybmVkIGZyb20gdGhlIG1vZHVsZVxuXHQvL1xuXHRmdW5jdGlvbiBhbXlXaWRnZXQodHlwZU5hbWUsIG9wdGlvbkRlZmF1bHRzKSB7XG5cdFx0Ly9cblx0XHQvLyB0aGUgc3BlY2lmaWMgd2lkZ2V0IGNsYXNzXG5cdFx0Ly9cblx0XHRmdW5jdGlvbiBXaWRnZXQoe29wdGlvbnMsIGVsZW1lbnR9KSB7XG5cdFx0XHQkLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHRcdG9wdGlvbnM6ICQuZXh0ZW5kKHt9LCBvcHRpb25EZWZhdWx0cywgb3B0aW9ucyksXG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGRlc3Ryb3koKSB7IHRoaXMudHJpZ2dlcignZGVzdHJveScpIH1cblx0XHRcdH0pO1xuXHRcdFx0ZW5hYmxlU2lnbmFsSGFuZGxpbmcodGhpcyk7XG5cblx0XHRcdC8vLy8gc2V0IHRoZSBlbGVtZW50IGNsYXNzXG5cdFx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmNzc0NsYXNzKTtcblx0XHRcdHRoaXMuZWxlbWVudC5vbmUoJ3JlbW92ZScsICgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSk7XG5cblx0XHRcdC8vLy8gY29ubmVjdCB0byB0aGUgcGFyZW50IGFydGVmYWN0XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnBhcmVudCkgeyB0aGlzLnBhcmVudCA9IHRoaXMub3B0aW9ucy5wYXJlbnQgfVxuXG5cdFx0XHQvLy8vIGNhY2hlIGEgcmVmZXJlbmNlIHRvIHRoZSBjaXJjdWl0Ym9hcmQgKGl0IGlzIHVzZWQgb2Z0ZW4pXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NpcmN1aXRib2FyZCcsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLy8vIHdhaXQgZm9yIHNvbWV0aGluZyBiZWZvcmUgY29uc3RydWN0aW9uIChsaWtlIHBsdWdpbnMpP1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSgpO1xuXHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5vcHRpb25zLmJlZm9yZUNvbnN0cnVjdGlvbik7XG5cblx0XHRcdC8vLy8gaWYgcHJlc2VudCwgcnVuIHRoZSBjb25zdHJ1Y3QgbWV0aG9kIGFmdGVyXG5cdFx0XHQvLy8vIGB0aGlzLm9wdGlvbnMuYmVmb3JlQ29uc3RydWN0aW9uYCBpcyBmaW5pc2hlZFxuXHRcdFx0Ly8vLyBhbmQgdGhlbiB3YWl0IG9uIGl0XG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMuY29uc3RydWN0KCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRXaWRnZXQucHJvdG90eXBlLmJlZm9yZUNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGJlZm9yZUNvbnN0cnVjdGlvbihwb3NzaWJsZVByb21pc2UpIHtcblx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkXG5cdFx0XHRcdFx0LnJldHVybihQLnJlc29sdmUocG9zc2libGVQcm9taXNlKSlcblx0XHRcdFx0XHQucmV0dXJuKHRoaXMpO1xuXHRcdH07XG5cblx0XHRkZWZpbmVEZWZhdWx0UHJvcGVydGllcyhXaWRnZXQucHJvdG90eXBlKTtcblx0XHRkZWZpbmVIaWVyYXJjaHlNZXRob2RzKFdpZGdldC5wcm90b3R5cGUsIHR5cGVOYW1lKTtcblxuXHRcdC8vXG5cdFx0Ly8gbm93IGRlZmluZSB0aGUgd2lkZ2V0IGNyZWF0aW9uICYgcmV0cmlldmFsIGZ1bmN0aW9uIGFzIGEgalF1ZXJ5IHBsdWdpblxuXHRcdC8vXG5cdFx0dmFyIGxvd2VyY2FzZU5hbWUgPSB0eXBlTmFtZVswXS50b0xvd2VyQ2FzZSgpICsgdHlwZU5hbWUuc2xpY2UoMSk7XG5cdFx0JC5mbltsb3dlcmNhc2VOYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0XHQvLy8vIGlmIHRoZSB3b3JkICdpbnN0YW5jZScgaXMgcGFzc2VkLCByZXR1cm4gdGhlIChhbHJlYWR5IGNyZWF0ZWQpIHdpZGdldCBwcm9taXNlXG5cdFx0XHRpZiAob3B0aW9ucyA9PT0gJ2luc3RhbmNlJykgeyByZXR1cm4gdGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gKSB9XG5cblx0XHRcdC8vLy8gZWxzZSwgY3JlYXRlIGEgbmV3IHdpZGdldCBhbmQgc2V0IGEgcHJvbWlzZSB0byBpdFxuXHRcdFx0dmFyIG5ld1dpZGdldCA9IG5ldyBXaWRnZXQoeyBvcHRpb25zOiBvcHRpb25zLCBlbGVtZW50OiB0aGlzIH0pO1xuXHRcdFx0dGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gLCBuZXdXaWRnZXQuY29uc3RydWN0ZWQpO1xuXG5cdFx0XHQvLy8vIHJldHVybiB0aGUgalF1ZXJ5IGVsZW1lbnQgaW5zdGFuY2UsIGJ5IGpRdWVyeSBjb252ZW50aW9uXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0Ly8vLyByZXR1cm4gdGhlIHdpZGdldCBhcnRlZmFjdCBjbGFzc1xuXHRcdHJldHVybiBXaWRnZXQ7XG5cdH1cblxuXHRyZXR1cm4gYW15V2lkZ2V0O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvd2lkZ2V0LmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGVxdWFsaXR5IHdpdGggYSB0b2xlcmFuY2Ugb2YgZXBzaWxvblxuXHRcdC8vXG5cdFx0YXBwcm94OiBmdW5jdGlvbiAodmFsMSwgdmFsMiwgZXBzaWxvbikge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZXBzaWxvbikpIHsgZXBzaWxvbiA9IDFlLTUgfVxuXHRcdFx0cmV0dXJuIChNYXRoLmFicyh2YWwxIC0gdmFsMikgPCBlcHNpbG9uKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHQvL1xuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc1BsYWluT2JqZWN0KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdC8vXG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNBcnJheShvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHQvL1xuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHQvL1xuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdC8vXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0Ly9cblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdC8vXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0Ly9cblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdC8vXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdC8vXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHQvL1xuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdC8vXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdC8vXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBgQS5mb3JFYWNoYCwgZXhjZXB0IGl0IGl0ZXJhdGVzIGZyb20gcmlnaHQgdG8gbGVmdFxuXHRcdC8vXG5cdFx0Zm9yRWFjaFJldmVyc2UoQSwgZm4pIHtcblx0XHRcdHZhciBpID0gQS5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaS0tKSB7IGZuKEFbaV0sIGksIEEpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdC8vXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdC8vXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHQvL1xuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhlIGdpdmVuIG9iamVjdDtcblx0XHQvLyB0aGlzIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmUgYSBgdHJpZ2dlcmAgbWV0aG9kXG5cdFx0Ly9cblx0XHQvLyBvcHRpb25zLm5hbWUgKG1hbmRhdG9yeSkgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcblx0XHQvLyBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgb3IgYW55IHRyYW5zZm9ybWF0aW9uLiBJdCBjYW4gYWxzbyB0aHJvdyBhbiBleGNlcHRpb24sIHdoaWNoIHdpbGwganVzdCBiZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLlxuXHRcdC8vXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Ly9cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Ly9cblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0Ly9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnanMtZ3JhcGgnLCAnYmx1ZWJpcmQnLCAnLi90cmF2ZXJzZS1kYWcuanMnLCAnLi9taXNjLmpzJywgJy4vZGVsdGEuanMnXSwgZnVuY3Rpb24gKCQsIEpzR3JhcGgsIFAsIHRyYXZlcnNlLCBVLCBEZWx0YSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIFBsdWdpbkhhbmRsZXIoKSB7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLy8vIFByaXZhdGUgVmFyaWFibGVzIC8vLy9cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8vXG5cdFx0Ly8ga2VlcCB0cmFjayBvZiBwbHVnaW5zIGFuZCB0aGVpciBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9yZGVyXG5cdFx0Ly9cblx0XHR2YXIgX3BsdWdpbnMgPSBuZXcgSnNHcmFwaCgpO1xuXHRcdHZhciBfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uID0ge307XG5cdFx0dmFyIF9mZWF0dXJlQ29uZmlndXJhdGlvbkNhY2hlID0ge307XG5cdFx0dmFyIF9wbHVnaW5QcmVkaWNhdGVzID0ge307XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLy8vIFByaXZhdGUgRnVuY3Rpb25zIC8vLy9cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8vXG5cdFx0Ly8gdG8gcHJvY2VzcyBhIGNvbmRpdGlvbiBkaXNqdW5jdCBmb3IgYSBwbHVnaW5cblx0XHQvL1xuXHRcdGZ1bmN0aW9uIF9hZGRQbHVnaW5Db25kaXRpb25EaXNqdW5jdChuYW1lLCBjb25kaXRpb24pIHtcblx0XHRcdC8vXG5cdFx0XHQvLyB0byBhY2N1bXVsYXRlIGNvbmRpdGlvbiBkaXNqdW5jdHMgaW50byBydW5uYWJsZSBwcmVkaWNhdGVzXG5cdFx0XHQvL1xuXHRcdFx0ZnVuY3Rpb24gYWNjdW11bGF0ZShsYXp5Q29uZGl0aW9uKSB7XG5cdFx0XHRcdHZhciBvbGRQcmVkaWNhdGUgPSBfcGx1Z2luUHJlZGljYXRlc1tuYW1lXTtcblx0XHRcdFx0X3BsdWdpblByZWRpY2F0ZXNbbmFtZV0gPSAoY29udGV4dCkgPT4ge1xuXHRcdFx0XHRcdGlmIChfZmVhdHVyZUNvbmZpZ3VyYXRpb25DYWNoZVtuYW1lXSkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0X2ZlYXR1cmVDb25maWd1cmF0aW9uQ2FjaGVbbmFtZV0gPVxuXHRcdFx0XHRcdFx0XHQob2xkUHJlZGljYXRlICYmIG9sZFByZWRpY2F0ZShjb250ZXh0KSkgfHxcblx0XHRcdFx0XHRcdFx0bGF6eUNvbmRpdGlvbihjb250ZXh0KTtcblx0XHRcdFx0XHRyZXR1cm4gX2ZlYXR1cmVDb25maWd1cmF0aW9uQ2FjaGVbbmFtZV07XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBpbnRlcnByZXQgdGhlIGdpdmVuIGNvbmRpdGlvbiBieSB0eXBlXG5cdFx0XHQvL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoY29uZGl0aW9uKSkgeyAvLyBkbyBub3QgbG9hZCBhIHBsdWdpbiBieSBkZWZhdWx0XG5cdFx0XHRcdGFjY3VtdWxhdGUoKCkgPT4gZmFsc2UpO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29uZGl0aW9uID09PSAnc3RyaW5nJykgeyAvLyBhIHBsdWdpbiBuYW1lXG5cdFx0XHRcdGFjY3VtdWxhdGUoKCkgPT4gX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbltjb25kaXRpb25dKTtcblx0XHRcdH0gZWxzZSBpZiAoJC5pc0FycmF5KGNvbmRpdGlvbikpIHsgLy8gYSBjb25qdW5jdGlvblxuXHRcdFx0XHRhY2N1bXVsYXRlKCgpID0+IGNvbmRpdGlvbi5ldmVyeSgoY29uanVuY3QpID0+IF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb25bY29uanVuY3RdKSk7XG5cdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbihjb25kaXRpb24pKSB7IC8vIGEgcHJlZGljYXRlXG5cdFx0XHRcdGFjY3VtdWxhdGUoKCkgPT4gY29uZGl0aW9uKF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb24pKTtcblx0XHRcdH0gZWxzZSB7IC8vIGEgbGl0ZXJhbCBCb29sZWFuIHZhbHVlXG5cdFx0XHRcdGFjY3VtdWxhdGUoKCkgPT4gISFjb25kaXRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vXG5cdFx0Ly8gdG8gcHJvY2VzcyBhIGNvbmRpdGlvbiBkaXNqdW5jdCBmb3IgYSBwbHVnaW5cblx0XHQvL1xuXHRcdGZ1bmN0aW9uIF9hZGRQbHVnaW5SZXF1aXJlbWVudHMocGx1Z2luTmFtZSwgb3RoZXJQbHVnaW5zKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvdGhlclBsdWdpbnMpKSB7IHJldHVybiB9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBwZXJmb3JtIHNhbml0eSBjaGVja3Ncblx0XHRcdC8vXG5cdFx0XHRVLmFzc2VydCgkLmlzQXJyYXkob3RoZXJQbHVnaW5zKSxcblx0XHRcdFx0XHRgVGhlICdyZXF1aXJlcycgY2xhdXNlIG9mIGEgcGx1Z2luIHNob3VsZCBiZSBhbiBhcnJheSBvZiBwbHVnaW4gbmFtZXMuYCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhZGQgdGhpcyBwbHVnaW4gYXMgYSBsb2FkaW5nIGNvbmRpdGlvbiBmb3IgdGhlIG90aGVyIHNwZWNpZmllZCBwbHVnaW5zXG5cdFx0XHQvL1xuXHRcdFx0b3RoZXJQbHVnaW5zLmZvckVhY2goKG90aGVyUGx1Z2luKSA9PiB7XG5cdFx0XHRcdF9hZGRQbHVnaW5Db25kaXRpb25EaXNqdW5jdChvdGhlclBsdWdpbiwgcGx1Z2luTmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLy8vIFB1YmxpYyBNZXRob2RzIC8vLy9cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8vXG5cdFx0Ly8gcmV0cmlldmUgdGhlIGdyYXBoIG9mIGFsbCByZWdpc3RlcmVkIHBsdWdpbnNcblx0XHQvL1xuXHRcdHRoaXMuZ3JhcGggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gX3BsdWdpbnM7XG5cdFx0fTtcblxuXHRcdC8vXG5cdFx0Ly8gdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBieSBwbHVnaW4gd3JpdGVycyxcblx0XHQvLyBjb250YWluaW5nIChwYXJ0IG9mKSBhIG5ldyBwbHVnaW4gdG8gYmUgcmVnaXN0ZXJlZFxuXHRcdC8vXG5cdFx0dGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyKHBsdWdpbikge1xuXHRcdFx0Ly9cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0Ly9cblx0XHRcdFUuYXNzZXJ0KCQuaXNQbGFpbk9iamVjdChwbHVnaW4pLFxuXHRcdFx0XHRcdGBBbiBBcGlOQVRPTVkgcGx1Z2luIHNob3VsZCBiZSBhIHBsYWluIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KHR5cGVvZiBwbHVnaW4ubmFtZSA9PT0gJ3N0cmluZycsXG5cdFx0XHRcdFx0YEFuIEFwaU5BVE9NWSBwbHVnaW4gc2hvdWxkIGhhdmUgYSBuYW1lLmApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBsdWdpbiBjb25maWd1cmF0aW9uXG5cdFx0XHQvL1xuXHRcdFx0aWYgKCEkLmlzQXJyYXkocGx1Z2luLmFmdGVyKSkgeyBwbHVnaW4uYWZ0ZXIgPSBbXSB9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBwcm9jZXNzIHRoZSBwbHVnaW4gY29uZGl0aW9uXG5cdFx0XHQvL1xuXHRcdFx0X2FkZFBsdWdpbkNvbmRpdGlvbkRpc2p1bmN0KHBsdWdpbi5uYW1lLCBwbHVnaW4uaWYpO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb24sIHBsdWdpbi5uYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIF9wbHVnaW5QcmVkaWNhdGVzW3BsdWdpbi5uYW1lXShfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHByb2Nlc3MgdGhlIHBsdWdpbiByZXF1aXJlbWVudHNcblx0XHRcdC8vXG5cdFx0XHRfYWRkUGx1Z2luUmVxdWlyZW1lbnRzKHBsdWdpbi5uYW1lLCBwbHVnaW4ucmVxdWlyZSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZWdpc3RlciB0aGUgcGx1Z2luXG5cdFx0XHQvL1xuXHRcdFx0X3BsdWdpbnMuYWRkVmVydGV4KHBsdWdpbi5uYW1lLCBwbHVnaW4pO1xuXHRcdFx0JC5lYWNoKHBsdWdpbi5hZnRlciwgKF9fLCB2KSA9PiB7IF9wbHVnaW5zLmNyZWF0ZUVkZ2UodiwgcGx1Z2luLm5hbWUpIH0pO1xuXHRcdFx0aWYgKF9wbHVnaW5zLmhhc0N5Y2xlKCkpIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgcGx1Z2luIGFwcGxpY2F0aW9uIG9yZGVyIGhhcyBhIGN5Y2xlLmApIH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIGNyZWF0ZSB0aGUgZGVsdGEgdGhhdCBlbWJvZGllcyB0aGUgcGx1Z2luXG5cdFx0XHQvL1xuXHRcdFx0cGx1Z2luLmRlbHRhID0gbmV3IERlbHRhKHBsdWdpbik7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZXR1cm4gYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gYWRkIGFkZGl0aW9uYWwgb3BlcmF0aW9uc1xuXHRcdFx0Ly9cblx0XHRcdHJldHVybiBwbHVnaW4uZGVsdGE7XG5cdFx0fTtcblxuXHRcdC8vXG5cdFx0Ly8gc2VsZWN0IHRoZSBwbHVnaW5zIHRvIGJlIGVuYWJsZWRcblx0XHQvL1xuXHRcdHRoaXMuc2VsZWN0ID0gZnVuY3Rpb24gc2VsZWN0KHBsdWdpbk5hbWVzKSB7XG5cblx0XHRcdC8vLy8gYWNjZXB0IGFuIGFycmF5IG9mIHBsdWdpbiBuYW1lcywgcmF0aGVyIHRoYW4ganVzdCBvbmUgbmFtZVxuXHRcdFx0aWYgKCQuaXNBcnJheShwbHVnaW5OYW1lcykpIHsgcGx1Z2luTmFtZXMuZm9yRWFjaChzZWxlY3QpIH1cblxuXHRcdFx0Ly8vLyBwcm9jZXNzIHNpbmdsZSBwbHVnaW4gbmFtZSBieSBtYWtpbmcgaXRzIGNvbmRpdGlvbiAndHJ1ZSdcblx0XHRcdF9hZGRQbHVnaW5Db25kaXRpb25EaXNqdW5jdChwbHVnaW5OYW1lcywgdHJ1ZSk7XG5cblx0XHR9O1xuXG5cdFx0Ly9cblx0XHQvLyBhcHBseSBhbGwgcmVsZXZhbnQgcGx1Z2lucyB0byBhIGdpdmVuIG9iamVjdFxuXHRcdC8vXG5cdFx0dGhpcy5hcHBseSA9IGZ1bmN0aW9uIGFwcGx5KG9iaikge1xuXHRcdFx0cmV0dXJuIFAuYWxsKHRyYXZlcnNlKF9wbHVnaW5zLCAocGx1Z2luTmFtZSwgcGx1Z2luKSA9PiB7XG5cblx0XHRcdFx0Ly8vLyBpZiB0aGUgcGx1Z2luIGlzIG5vdCBzZWxlY3RlZCwgcmV0dXJuXG5cdFx0XHRcdGlmICghX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbltwbHVnaW5OYW1lXSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8vLy8gaWYgdGhlIHBsdWdpbiBkb2Vzbid0IGV4aXN0LCB0aHJvdyBhbiBlcnJvclxuXHRcdFx0XHRVLmFzc2VydChwbHVnaW4sIGBJIGRvbid0IGtub3cgdGhlICcke3BsdWdpbk5hbWV9JyBwbHVnaW4uYCk7XG5cblx0XHRcdFx0Ly8vLyBhcHBseSB0aGUgZGVsdGEsIGFuZCByZXR1cm4gYSBwcm9taXNlIGZvciBpdCB0byBiZSBkb25lXG5cdFx0XHRcdHJldHVybiBQLnJlc29sdmUocGx1Z2luLmRlbHRhLmFwcGx5KG9iaikpO1xuXG5cdFx0XHR9KSk7XG5cdFx0fTtcblx0fTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9wbHVnaW4taGFuZGxlci5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9kZWZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICcuL2RlZmVyLmpzJ10sIGZ1bmN0aW9uIChQLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHRyYXZlcnNlREFHKGdyYXBoLCBmbikge1xuXHRcdC8vXG5cdFx0Ly8ga2VlcGluZyB0cmFjayBvZiB0aGUgZGVmZXJyZWRzIG9mIGFsbCBub2Rlc1xuXHRcdC8vXG5cdFx0dmFyIG5vZGVEZWZlcnJlZHMgPSB7fTtcblx0XHRmdW5jdGlvbiBub2RlRGVmZXJyZWQoaWQpIHtcblx0XHRcdGlmICghbm9kZURlZmVycmVkc1tpZF0pIHsgbm9kZURlZmVycmVkc1tpZF0gPSBkZWZlcigpIH1cblx0XHRcdHJldHVybiBub2RlRGVmZXJyZWRzW2lkXTtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIGtlZXBpbmcgdHJhY2sgb2YgdGhlIHNvdXJjZXMgYW5kIHNpbmtzXG5cdFx0Ly9cblx0XHR2YXIgc2lua1Byb21pc2VzID0gW107XG5cblx0XHQvL1xuXHRcdC8vIGNvbm5lY3QgYWxsIHRoZSBwcm9taXNlc1xuXHRcdC8vXG5cdFx0Z3JhcGguZWFjaFZlcnRleCgoa2V5LCB2YWwpID0+IHtcblx0XHRcdHZhciBwcmVkcyA9IGdyYXBoLnByZWRlY2Vzc29ycyhrZXkpO1xuXHRcdFx0dmFyIHN1Y2NzID0gZ3JhcGguc3VjY2Vzc29ycyhrZXkpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGVzdCBmb3Igc2luay1ob29kXG5cdFx0XHQvL1xuXHRcdFx0aWYgKHN1Y2NzLmxlbmd0aCA9PT0gMCkgeyBzaW5rUHJvbWlzZXMucHVzaChub2RlRGVmZXJyZWQoa2V5KS5wcm9taXNlKSB9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBzZXQgdXAgcHJvbWlzZSB0byByZXNvbHZlIHdoZW4gcHJlZGVjZXNzb3JzIGFyZSBkb25lXG5cdFx0XHQvL1xuXHRcdFx0UC5hbGwocHJlZHMubWFwKChwcmVkKSA9PiB7IHJldHVybiBub2RlRGVmZXJyZWQocHJlZCkucHJvbWlzZSB9KSkudGhlbigocHJlZFJlc3VsdHMpID0+IHtcblx0XHRcdFx0bm9kZURlZmVycmVkKGtleSkucmVzb2x2ZShmbihrZXksIHZhbCwgcHJlZFJlc3VsdHMpKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyByZXR1cm4gcHJvbWlzZXMgb2YgdGhlIHNpbmsgbm9kZSByZXN1bHRzXG5cdFx0Ly9cblx0XHRyZXR1cm4gc2lua1Byb21pc2VzO1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvdHJhdmVyc2UtZGFnLmpzXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2pzLWdyYXBoJywgJ2JsdWViaXJkJywgJy4vdHJhdmVyc2UtZGFnLmpzJywgJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoJCwgSnNHcmFwaCwgUCwgdHJhdmVyc2UsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIEFjY3VtdWxhdGVkIGRhdGEgZm9yIHRoZSBhdmFpbGFibGUgZGVsdGEgb3BlcmF0aW9uIHR5cGVzXG5cdC8vXG5cdHZhciBvcFR5cGVzID0ge307ICAgIC8vIHRoZSBuYW1lIGFuZCBkZWx0YSBjbGFzc2VzXG5cdHZhciBjb21wb3NlRm5zID0gW107IC8vIHRoZSBjYXNlIGRpc3RpbmN0aW9ucyBvZiBkZWx0YSBjb21wb3NpdGlvblxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gZnVsbHkgZGVmaW5lIGEgbmV3IGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdC8vXG5cdGZ1bmN0aW9uIGFkZE9wZXJhdGlvblR5cGUoe25hbWUsIGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3RvckZuLCBhcHBseTogYXBwbHlGbiwgcHJvdG90eXBlLCBtZXRob2R9KSB7XG5cdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YVxuXHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cdFx0aWYgKFUuaXNEZWZpbmVkKG1ldGhvZCkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHRcdHZhbHVlOiBtZXRob2Rcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0V2l0aE1ldGhvZCwgbmFtZSwge1xuXHRcdFx0XHR2YWx1ZShwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZXNbbmFtZV0sIHByb3BlcnR5LCB2YWx1ZXMpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBkZWZpbmUgdGhlIG9wZXJhdGlvbiB0eXBlXG5cdFx0b3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHREZWx0YTogY29uc3RydWN0b3JGbixcblx0XHRcdG1ldGhvZDogb2JqZWN0V2l0aE1ldGhvZFtuYW1lXVxuXHRcdH07XG5cblx0XHQvLyBkZWZpbmUgdGhlIERlbHRhIGNsYXNzXG5cdFx0JC5leHRlbmQob3BUeXBlc1tuYW1lXS5EZWx0YS5wcm90b3R5cGUsIHByb3RvdHlwZSwge1xuXHRcdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yRm4sXG5cdFx0XHR0eXBlOiBuYW1lLFxuXHRcdFx0YXBwbHk6IGFwcGx5Rm4sXG5cdFx0XHRjb21wb3NlKHByb3BlcnR5LCBvcDIpIHtcblx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3AyKSkgeyByZXR1cm4gdGhpcyB9XG5cdFx0XHRcdHZhciBmb3VuZENvbXBvc2VGbjtcblx0XHRcdFx0Y29tcG9zZUZucy5zb21lKCh7b3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZufSkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLnR5cGUgPT09IG9wMVR5cGUgJiYgb3AyLnR5cGUgPT09IG9wMlR5cGUpIHtcblx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuID0gY29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKGZvdW5kQ29tcG9zZUZuKSB7XG5cdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4odGhpcywgcHJvcGVydHksIG9wMik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YFlvdSBjYW5ub3QgZm9sbG93IGEgJyR7dGhpcy50eXBlfScgb3BlcmF0aW9uIGAgK1xuXHRcdFx0XHRcdFx0XHRgd2l0aCBhICcke29wMi50eXBlfScgb3BlcmF0aW9uIG9uIHRoZSBzYW1lIHByb3BlcnR5LmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGVyci5vcDEgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdFx0ZXJyLm9wMiA9IG9wMi50eXBlO1xuXHRcdFx0XHRcdHRocm93IGVycjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgZGVmaW5lZCBmaXJzdClcblx0XHRvcFR5cGVzWydtb2RpZnknXS5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPSBvcFR5cGVzW25hbWVdLm1ldGhvZDtcblx0fVxuXHRmdW5jdGlvbiBhZGRPcGVyYXRpb25BbGlhcyh7bmFtZSwgdGFyZ2V0LCB0cmFuc2Zvcm19KSB7XG5cblx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0dmFyIG9iamVjdFdpdGhNZXRob2QgPSB7fTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0V2l0aE1ldGhvZCwgbmFtZSwge1xuXHRcdFx0dmFsdWUocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlc1t0YXJnZXRdLCBwcm9wZXJ0eSwgdHJhbnNmb3JtKHZhbHVlcykpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRvcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdG1ldGhvZDogb2JqZWN0V2l0aE1ldGhvZFtuYW1lXVxuXHRcdH07XG5cblx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGEgKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyBkZWZpbmVkIGZpcnN0KVxuXHRcdG9wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9IG9wVHlwZXNbbmFtZV0ubWV0aG9kO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBhZGQgbmV3IHZhbGlkIGNhc2UgZGlzdGluY3Rpb25zIGZvciBkZWx0YSBjb21wb3NpdGlvblxuXHQvL1xuXHRmdW5jdGlvbiBhZGRDb21wb3NpdGlvblJ1bGUob3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuKSB7XG5cdFx0Y29tcG9zZUZucy5wdXNoKHsgb3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuIH0pO1xuXHR9XG5cdHZhciBrZWVwRmlyc3QgPSAoKSA9PiB7fTtcblx0dmFyIGtlZXBTZWNvbmQgPSAoZDEsIHAsIGQyKSA9PiB7IGQxW3BdID0gZDIgfTtcblxuXHQvL1xuXHQvLyB0aGUgbW9kaWZ5IG9wZXJhdGlvbiAoTVVTVCBCRSBUSEUgRklSU1QgT1BFUkFUSU9OIFRZUEUgVE8gQkUgREVGSU5FRClcblx0Ly9cblx0YWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0bmFtZTogJ21vZGlmeScsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIE1vZGlmeShkZWx0YURlc2NyaXB0aW9uLCBvcGVyYXRpb25zKSB7XG5cdFx0XHRkZWx0YURlc2NyaXB0aW9uID0gZGVsdGFEZXNjcmlwdGlvbiB8fCB7fTtcblx0XHRcdHRoaXMub3BlcmF0aW9ucyA9IG9wZXJhdGlvbnMgfHwge307XG5cdFx0XHQvL1xuXHRcdFx0Ly8gcHJvY2VzcyBwb3NzaWJsZSBkZWx0YSBkZXNjcmlwdGlvblxuXHRcdFx0Ly9cblx0XHRcdCQuZWFjaChkZWx0YURlc2NyaXB0aW9uLCAoa2V5LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHR2YXIgbWF0Y2ggPSBrZXkubWF0Y2goL14oXFx3KylcXHMrKFtcXHdcXC5dKykkLyk7XG5cdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdHZhciBvcGVyYXRpb24gPSBtYXRjaFsxXTtcblx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBtYXRjaFsyXTtcblx0XHRcdFx0XHRVLmFzc2VydChvcGVyYXRpb24gaW4gb3BUeXBlcyxcblx0XHRcdFx0XHRcdFx0YEkgZG9uJ3Qga25vdyB0aGUgJyR7b3BlcmF0aW9ufScgb3BlcmF0aW9uLmApO1xuXHRcdFx0XHRcdHRoaXNbb3BlcmF0aW9uXShwcm9wZXJ0eSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wZXJ0eSkpIHtcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BlcnR5XWBcblx0XHRcdFx0Ly9cblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5KG9ialtwcm9wZXJ0eV0sIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHQvL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseShvYmosIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRwcm90b3R5cGU6IHtcblx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XG5cdFx0XHRcdHZhciBkb3RJbmRleCA9IHByb3BlcnR5LmluZGV4T2YoJy4nKTtcblx0XHRcdFx0aWYgKGRvdEluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gdGhlIHByb3BlcnR5IGlzIGEgZG90LXNlcGFyYXRlZCBwYXRoOyByZWN1cnNpdmVseSBjcmVhdGUgYSBtb2RpZnktY2hhaW5cblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHZhciBhY3R1YWxQcm9wZXJ0eSA9IHByb3BlcnR5LnNsaWNlKDAsIGRvdEluZGV4KTtcblx0XHRcdFx0XHR2YXIgcmVzdE9mUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZShkb3RJbmRleCsxKTtcblx0XHRcdFx0XHR2YXIgbmV3TW9kaWZ5RGVsdGEgPSB0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlc1snbW9kaWZ5J10sIGFjdHVhbFByb3BlcnR5KTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3TW9kaWZ5RGVsdGFbb3BUeXBlLm5hbWVdLmFwcGx5KG5ld01vZGlmeURlbHRhLCBbcmVzdE9mUHJvcGVydHldLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIHNpbmdsZSBuYW1lOyBhZGQgdGhlIG5ldyBkZWx0YSBkaXJlY3RseVxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gVS5hcHBseUNvbnN0cnVjdG9yKG9wVHlwZS5EZWx0YSwgdmFsdWVzKTtcblx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5jb21wb3NlKHByb3BlcnR5LCBuZXdEZWx0YSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0gPSBuZXdEZWx0YTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdG1ldGhvZChwcm9wZXJ0eSwgZGVsdGFEZXNjcmlwdGlvbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGVzWydtb2RpZnknXSwgcHJvcGVydHksIFtkZWx0YURlc2NyaXB0aW9uXSk7XG5cdFx0fVxuXHR9KTtcblxuXHQvL1xuXHQvLyB0aGUgb3RoZXIgc3RhbmRhcmQgb3BlcmF0aW9uIHR5cGVzXG5cdC8vXG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdhZGQnLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBZGQodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlICdhZGQnIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBmaXJzdCBiZSB1bmRlZmluZWQuYCk7XG5cdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHR9XG5cdH0pO1xuXHRhZGRPcGVyYXRpb25UeXBlKHtcblx0XHRuYW1lOiAncmVwbGFjZScsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlcGxhY2UodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0YFRoZSAncmVwbGFjZScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdH1cblx0fSk7XG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdyZW1vdmUnLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZW1vdmUoKSB7fSxcblx0XHRhcHBseShvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlICdyZW1vdmUnIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBmaXJzdCBiZSBkZWZpbmVkLmApO1xuXHRcdFx0ZGVsZXRlIG9ialtwcm9wZXJ0eV07XG5cdFx0fVxuXHR9KTtcblx0YWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0bmFtZTogJ2ZvcmJpZCcsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEZvcmJpZCgpIHt9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0YFRoZSAnZm9yYmlkJyBvcGVyYXRpb24gcmVxdWlyZXMgdGhlIHByb3BlcnR5IHRvIGJlIHVuZGVmaW5lZC5gKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vXG5cdC8vIGNvbXBvc2l0aW9uIG9mIHRoZSBzdGFuZGFyZCBvcGVyYXRpb24gdHlwZXNcblx0Ly9cblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVwbGFjZScsICAgICAoZDEsIHAsIGQyKSA9PiB7IGQxW3BdID0gbmV3IG9wVHlwZXNbJ2FkZCddLkRlbHRhKGQyLnZhbHVlKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnbW9kaWZ5JywgICAgICAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVtb3ZlJywgICAgICAoZDEsIHApICAgICA9PiB7IGQxW3BdID0gbmV3IG9wVHlwZXNbJ2ZvcmJpZCddLkRlbHRhKCkgfSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdtb2RpZnknLCAgKGQxLCBwLCBkMikgPT4geyBkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJykgfSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZW1vdmUnLCAga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlcGxhY2UnLCAga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRPYmplY3Qua2V5cyhkMi5vcGVyYXRpb25zKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRkMS5jb21wb3NlKHByb3AsIGQyLm9wZXJhdGlvbnNbcHJvcF0pO1xuXHRcdH0pO1xuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2FkZCcsICAgIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBuZXcgb3BUeXBlc1sncmVwbGFjZSddLkRlbHRhKGQyLnZhbHVlKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZW1vdmUnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnYWRkJywgICAga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cblxuXHQvL1xuXHQvLyAnYWx0ZXInIG9wZXJhdGlvbiB0eXBlXG5cdC8vXG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdhbHRlcicsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFsdGVyKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBbXSB9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWx0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0XHR0aGlzLnZhbHVlLmZvckVhY2goKHN1Yk9wKSA9PiB7XG5cdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0dmFyIHBhcnRUd28gPSBzdWJPcC52YWx1ZTtcblx0XHRcdFx0aWYgKHN1Yk9wLnR5cGUgPT09ICdwcmVwZW5kJykge1xuXHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBlbHNlIHsgLy8gJ2FwcGVuZCcgb3IgJ2luc2VydCdcblx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0W10ucHVzaC5hcHBseShkMVtwXS52YWx1ZSwgdGhpcy52YWx1ZSk7XG5cdH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDFbcF0gPSBuZXcgb3BUeXBlc1snZm9yYmlkJ10uRGVsdGEoKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0VS5hc3NlcnQoJC5pc0Z1bmN0aW9uKGQxW3BdLnZhbHVlKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJ2FsdGVyJyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0ZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpO1xuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihkMVtwXS52YWx1ZSksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdhbHRlcicgZXhwZWN0cyB0aGUgcHJvcGVydHkgaXQgYWN0cyBvbiB0byBiZSBhIGZ1bmN0aW9uLmApO1xuXHRcdGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKTtcblx0fSk7XG5cblxuXHQvL1xuXHQvLyB0aGUgJ3ByZXBlbmQnLCAnaW5zZXJ0JyBhbmQgJ2FwcGVuZCcgb3BlcmF0aW9uIHR5cGVzXG5cdC8vXG5cdFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ10uZm9yRWFjaCgob3BUeXBlKSA9PiB7XG5cdFx0YWRkT3BlcmF0aW9uQWxpYXMoe1xuXHRcdFx0bmFtZTogb3BUeXBlLFxuXHRcdFx0dGFyZ2V0OiAnYWx0ZXInLFxuXHRcdFx0dHJhbnNmb3JtOiAoYXJncykgPT4gW1t7IHR5cGU6IG9wVHlwZSwgdmFsdWU6IGFyZ3NbMF0gfV1dXG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0Ly9cblx0Ly8gJ2FmdGVyJyBvcGVyYXRpb24gdHlwZVxuXHQvL1xuXHRhZGRPcGVyYXRpb25UeXBlKHtcblx0XHRuYW1lOiAnYWZ0ZXInLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBZnRlcih2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRhcHBseShvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRVLmFzc2VydCgkLmlzRnVuY3Rpb24ob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJ2FmdGVyJyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhIGZ1bmN0aW9uLmApO1xuXHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0dmFyIHBhcnRUd28gPSB0aGlzLnZhbHVlO1xuXHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBQLnJlc29sdmUocGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlbW92ZScsICBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0VS5hc3NlcnQoJC5pc0Z1bmN0aW9uKGQxW3BdLnZhbHVlKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJ2FmdGVyJyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uLmApO1xuXHRcdGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKTtcblx0fSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRVLmFzc2VydCgkLmlzRnVuY3Rpb24oZDFbcF0udmFsdWUpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWZ0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24uYCk7XG5cdFx0ZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpO1xuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdpbnNlcnQnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKTsgfSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAnaW5zZXJ0JywgKGQxLCBwLCBkMikgPT4geyBkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJyk7IH0pO1xuXG5cdC8vIFRPRE86IHRoZSBhYm92ZSBjb21wb3NpdGlvbnMgb2YgJ2luc2VydCcgYW5kICdhZnRlcicgYXJlIG5vdCBhY3R1YWxseVxuXHQvLyAgICAgOiBjb3JyZWN0OyBub3QgYXNzb2NpYXRpdmUsIGluIGZhY3QuIFJhdGhlciB0aGFuIGNvbGxhcHNpbmcgdGhlbVxuXHQvLyAgICAgOiBhdCB0aGlzIHN0YWdlLCBhIGxpc3Qgb2Ygb3BlcmF0aW9ucyBzaG91bGQgYmUga2VwdC5cblxuXHQvL1xuXHQvLyByZXR1cm4gdGhlIG1vZGlmeSBkZWx0YSBjbGFzc1xuXHQvL1xuXHRyZXR1cm4gb3BUeXBlc1snbW9kaWZ5J10uRGVsdGE7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9kZWx0YS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNpcmN1aXRib2FyZC5qcyJ9