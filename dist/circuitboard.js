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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZTJjMjNiZjg3YzMzNWY4YWJlYyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9wbHVnaW4taGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL3RyYXZlcnNlLWRhZy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWx0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7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QUFDLENBQUUsRUFBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0dBQ3pCLEVBQUMsQ0FBQztBQUNGLG9CQUFrQixDQUFDLFNBQVEsQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFDckQsWUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUUsRUFBQyxNQUFNLENBQUMsQ0FDL0IsdUZBQXFGLENBQUMsQ0FBQztBQUN6RixNQUFDLE1BQU8sQ0FBQyxFQUFDLENBQUUsRUFBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0dBQ3pCLEVBQUMsQ0FBQztBQUNGLG9CQUFrQixDQUFDLFFBQU8sQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFBRSxNQUFDLE1BQU8sQ0FBQyxFQUFDLENBQUUsRUFBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0dBQUUsRUFBQyxDQUFDO0FBQ25GLG9CQUFrQixDQUFDLE9BQU0sQ0FBRyxTQUFPLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFBRSxNQUFDLE1BQU8sQ0FBQyxFQUFDLENBQUUsRUFBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0dBQUUsRUFBQyxDQUFDO0FBU25GLFFBQU8sUUFBTSxDQUFFLFFBQU8sQ0FBQyxNQUFNLENBQUM7QUFFL0IsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImpzLWdyYXBoXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJKc0dyYXBoXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiZTJjMjNiZjg3YzMzNWY4YWJlY1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL3dpZGdldC5qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvcGx1Z2luLWhhbmRsZXIuanMnLFxuXHQnLi91dGlsL2RlZmVyLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFAsIGFteVdpZGdldCwgVSwgUGx1Z2luSGFuZGxlciwgZGVmZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIHNldCB1cCBhIHByb21pc2UgY2hhaW4gZm9yIGd1aWRpbmcgd2lkZ2V0IGNvbnN0cnVjdGlvblxuXHQvL1xuXHR2YXIgYmVmb3JlQ29uc3RydWN0aW9uID0gZGVmZXIoKTtcblxuXHQvL1xuXHQvLyBjcmVhdGUgYW5kIHJlZ2lzdGVyIHRoZSB0aHJlZSB0eXBlcyBvZiB3aWRnZXQ6XG5cdC8vIENpcmN1aXRib2FyZCwgdGlsZW1hcCBhbmQgdGlsZVxuXHQvL1xuXHR2YXIgd2lkZ2V0QXJ0ZWZhY3RzID0ge1xuXHRcdENpcmN1aXRib2FyZDogYW15V2lkZ2V0KCdDaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb246IGJlZm9yZUNvbnN0cnVjdGlvbi5wcm9taXNlLFxuXHRcdFx0Y3NzQ2xhc3M6IFwiY2lyY3VpdGJvYXJkXCIsXG5cdFx0XHRmaWx0ZXI6ICgpPT5QLnJlc29sdmUodHJ1ZSksXG5cdFx0XHRtb2RlbDogbnVsbFxuXHRcdH0pLFxuXHRcdFRpbGVtYXA6IGFteVdpZGdldCgnVGlsZW1hcCcsIHtcblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbjogYmVmb3JlQ29uc3RydWN0aW9uLnByb21pc2UsXG5cdFx0XHRjc3NDbGFzczogXCJ0aWxlbWFwXCIsXG5cdFx0XHRtb2RlbDogbnVsbCxcblx0XHRcdF9jaXJjdWl0Ym9hcmQ6IG51bGxcblx0XHR9KSxcblx0XHRUaWxlOiBhbXlXaWRnZXQoJ1RpbGUnLCB7XG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb246IGJlZm9yZUNvbnN0cnVjdGlvbi5wcm9taXNlLFxuXHRcdFx0Y3NzQ2xhc3M6ICd0aWxlJyxcblx0XHRcdG1vZGVsOiBudWxsLFxuXHRcdFx0X2NpcmN1aXRib2FyZDogbnVsbFxuXHRcdH0pXG5cdH07XG5cblx0Ly9cblx0Ly8gYWxsb3cgJyQuY2lyY3VpdGJvYXJkJyB0byBhY2NlcHQgcGx1Z2luc1xuXHQvL1xuXHR2YXIgcGx1Z2luSGFuZGxlciA9IG5ldyBQbHVnaW5IYW5kbGVyKCk7XG5cdFUub2JqZWN0KCQsICdjaXJjdWl0Ym9hcmQnKS5wbHVnaW4gPSBmdW5jdGlvbiBwbHVnaW4ocGx1Z2luT3JTZWxlY3Rpb24pIHtcblx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuXHRcdFx0Ly8vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW5cblx0XHRcdHJldHVybiBwbHVnaW5IYW5kbGVyLnJlZ2lzdGVyKHBsdWdpbk9yU2VsZWN0aW9uKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byBzZWxlY3QgcGx1Z2lucyB0byBiZSBhcHBsaWVkXG5cdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh3aWRnZXRBcnRlZmFjdHMpLFxuXHRcdFx0XHRcdGBUaGUgcGx1Z2lucyBhcmUgYmVpbmcgc2VsZWN0ZWQgYmVmb3JlIHRoZSBjaXJjdWl0Ym9hcmQgYXJ0ZWZhY3RzIHdlcmUgcmVnaXN0ZXJlZC4gYCArXG5cdFx0XHRcdFx0YEhhdmUgeW91IGxvYWRlZCB0aGUgQXBpTkFUT01ZIGZpbGVzIGluIGEgc3RyYW5nZSBvcmRlcj9gKTtcblx0XHRcdHBsdWdpbkhhbmRsZXIuc2VsZWN0KHBsdWdpbk9yU2VsZWN0aW9uKTtcblx0XHRcdHJldHVybiBwbHVnaW5IYW5kbGVyLmFwcGx5KHdpZGdldEFydGVmYWN0cylcblx0XHRcdFx0XHQudGhlbihiZWZvcmVDb25zdHJ1Y3Rpb24ucmVzb2x2ZSwgYmVmb3JlQ29uc3RydWN0aW9uLnJlamVjdClcblx0XHRcdFx0XHQucmV0dXJuKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vXG5cdC8vIHJldHVybiB0aGUgc3RhdGljIGAkLmNpcmN1aXRib2FyZGAgb2JqZWN0LFxuXHQvLyB0aHJvdWdoIHdoaWNoIHBsdWdpbnMgY2FuIGJlIGFwcGxpZWQgYW5kIHNlbGVjdGVkXG5cdC8vXG5cdHJldHVybiAkLmNpcmN1aXRib2FyZDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2NpcmN1aXRib2FyZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBzaWduYWwgaGFuZGxpbmcgbWV0aG9kcyB0byBhbiBvYmplY3Rcblx0Ly9cblx0ZnVuY3Rpb24gZW5hYmxlU2lnbmFsSGFuZGxpbmcob2JqKSB7XG5cdFx0dmFyIF9jYWxsYmFja3MgPSB7fTtcblxuXHRcdGZ1bmN0aW9uIF9zaWduYWxDYWxsYmFja3Moc2lnbmFsKSB7XG5cdFx0XHRpZiAoIV9jYWxsYmFja3Nbc2lnbmFsXSkge1xuXHRcdFx0XHRfY2FsbGJhY2tzW3NpZ25hbF0gPSAkLkNhbGxiYWNrcygpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9jYWxsYmFja3Nbc2lnbmFsXTtcblx0XHR9XG5cblx0XHQkLmV4dGVuZChvYmosIHtcblx0XHRcdG9uKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLmFkZChmbikgfSxcblx0XHRcdG9mZihzaWduYWwsIGZuKSB7IF9zaWduYWxDYWxsYmFja3Moc2lnbmFsKS5yZW1vdmUoZm4pIH0sXG5cdFx0XHRvbmUoc2lnbmFsLCBmbikge1xuXHRcdFx0XHR2YXIgcGFkZGVkRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0Zm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblx0XHRcdFx0XHR0aGlzLm9mZihzaWduYWwsIHBhZGRlZEZuKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy5vbihzaWduYWwsIHBhZGRlZEZuKTtcblx0XHRcdH0sXG5cdFx0XHRvbmNlKHNpZ25hbCwgZm4pIHsgdGhpcy5vbmUoc2lnbmFsLCBmbikgfSxcblx0XHRcdHRyaWdnZXIoc2lnbmFsLCAuLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBjYWxsYmFja3MgPSBfY2FsbGJhY2tzW3NpZ25hbF07XG5cdFx0XHRcdGlmIChjYWxsYmFja3MpIHsgY2FsbGJhY2tzLmZpcmVXaXRoKHRoaXMsIGFyZ3MpIH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gaW1wbGVtZW50IGFydGVmYWN0IGhpZXJhcmNoeSBtZXRob2RzXG5cdC8vXG5cdGZ1bmN0aW9uIGRlZmluZUhpZXJhcmNoeU1ldGhvZHMob2JqLCB0eXBlKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ3R5cGUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0eXBlIH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAncGFyZW50Jywge1xuXHRcdFx0c2V0KHBhcmVudCkge1xuXHRcdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHRcdFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKTtcblx0XHRcdH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdjaGlsZHJlbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIH1cblx0XHR9KTtcblx0XHQkLmV4dGVuZChvYmosIHtcblx0XHRcdGNsb3Nlc3RBbmNlc3RvckJ5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzO1xuXHRcdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRjbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdCh0aGlzLmNoaWxkcmVuIHx8IFtdKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBtYWtlIHNvbWUgaW1wb3J0YW50IHJlZmVyZW5jZXMgdGhhdCBhcmUgcGFydFxuXHQvLyBvZiB0aGUgb3B0aW9ucyBwcm9wZXJ0eSBhdmFpbGFibGUgaW4gdGhlIG9iamVjdCBpdHNlbGZcblx0Ly9cblx0ZnVuY3Rpb24gZGVmaW5lRGVmYXVsdFByb3BlcnRpZXMob2JqKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21vZGVsJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLm1vZGVsIH1cblx0XHR9KTtcblx0fVxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGFwaW5hdG9teSBjb21wb25lbnQgKHdpZGdldClcblx0Ly8gYXMgYSBqUXVlcnkgZWxlbWVudCBwbHVnaW47IHRoaXMgaXMgcmV0dXJuZWQgZnJvbSB0aGUgbW9kdWxlXG5cdC8vXG5cdGZ1bmN0aW9uIGFteVdpZGdldCh0eXBlTmFtZSwgb3B0aW9uRGVmYXVsdHMpIHtcblx0XHQvL1xuXHRcdC8vIHRoZSBzcGVjaWZpYyB3aWRnZXQgY2xhc3Ncblx0XHQvL1xuXHRcdGZ1bmN0aW9uIFdpZGdldCh7b3B0aW9ucywgZWxlbWVudH0pIHtcblx0XHRcdCQuZXh0ZW5kKHRoaXMsIHtcblx0XHRcdFx0b3B0aW9uczogJC5leHRlbmQoe30sIG9wdGlvbkRlZmF1bHRzLCBvcHRpb25zKSxcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0ZGVzdHJveSgpIHsgdGhpcy50cmlnZ2VyKCdkZXN0cm95JykgfVxuXHRcdFx0fSk7XG5cdFx0XHRlbmFibGVTaWduYWxIYW5kbGluZyh0aGlzKTtcblxuXHRcdFx0Ly8vLyBzZXQgdGhlIGVsZW1lbnQgY2xhc3Ncblx0XHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY3NzQ2xhc3MpO1xuXHRcdFx0dGhpcy5lbGVtZW50Lm9uZSgncmVtb3ZlJywgKCkgPT4geyB0aGlzLmRlc3Ryb3koKSB9KTtcblxuXHRcdFx0Ly8vLyBjb25uZWN0IHRvIHRoZSBwYXJlbnQgYXJ0ZWZhY3Rcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7IHRoaXMucGFyZW50ID0gdGhpcy5vcHRpb25zLnBhcmVudCB9XG5cblx0XHRcdC8vLy8gY2FjaGUgYSByZWZlcmVuY2UgdG8gdGhlIGNpcmN1aXRib2FyZCAoaXQgaXMgdXNlZCBvZnRlbilcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY2lyY3VpdGJvYXJkJywge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLmNsb3Nlc3RBbmNlc3RvckJ5VHlwZSgnQ2lyY3VpdGJvYXJkJykgfVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vLy8gd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/XG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKCk7XG5cdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLm9wdGlvbnMuYmVmb3JlQ29uc3RydWN0aW9uKTtcblxuXHRcdFx0Ly8vLyBpZiBwcmVzZW50LCBydW4gdGhlIGNvbnN0cnVjdCBtZXRob2QgYWZ0ZXJcblx0XHRcdC8vLy8gYHRoaXMub3B0aW9ucy5iZWZvcmVDb25zdHJ1Y3Rpb25gIGlzIGZpbmlzaGVkXG5cdFx0XHQvLy8vIGFuZCB0aGVuIHdhaXQgb24gaXRcblx0XHRcdHRoaXMuY29uc3RydWN0ZWQudGhlbigoKSA9PiB7XG5cdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3QoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdFdpZGdldC5wcm90b3R5cGUuYmVmb3JlQ29uc3RydWN0aW9uID0gZnVuY3Rpb24gYmVmb3JlQ29uc3RydWN0aW9uKHBvc3NpYmxlUHJvbWlzZSkge1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWRcblx0XHRcdFx0XHQucmV0dXJuKFAucmVzb2x2ZShwb3NzaWJsZVByb21pc2UpKVxuXHRcdFx0XHRcdC5yZXR1cm4odGhpcyk7XG5cdFx0fTtcblxuXHRcdGRlZmluZURlZmF1bHRQcm9wZXJ0aWVzKFdpZGdldC5wcm90b3R5cGUpO1xuXHRcdGRlZmluZUhpZXJhcmNoeU1ldGhvZHMoV2lkZ2V0LnByb3RvdHlwZSwgdHlwZU5hbWUpO1xuXG5cdFx0Ly9cblx0XHQvLyBub3cgZGVmaW5lIHRoZSB3aWRnZXQgY3JlYXRpb24gJiByZXRyaWV2YWwgZnVuY3Rpb24gYXMgYSBqUXVlcnkgcGx1Z2luXG5cdFx0Ly9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IHR5cGVOYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyB0eXBlTmFtZS5zbGljZSgxKTtcblx0XHQkLmZuW2xvd2VyY2FzZU5hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdC8vLy8gaWYgdGhlIHdvcmQgJ2luc3RhbmNlJyBpcyBwYXNzZWQsIHJldHVybiB0aGUgKGFscmVhZHkgY3JlYXRlZCkgd2lkZ2V0IHByb21pc2Vcblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWApIH1cblxuXHRcdFx0Ly8vLyBlbHNlLCBjcmVhdGUgYSBuZXcgd2lkZ2V0IGFuZCBzZXQgYSBwcm9taXNlIHRvIGl0XG5cdFx0XHR2YXIgbmV3V2lkZ2V0ID0gbmV3IFdpZGdldCh7IG9wdGlvbnM6IG9wdGlvbnMsIGVsZW1lbnQ6IHRoaXMgfSk7XG5cdFx0XHR0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWAsIG5ld1dpZGdldC5jb25zdHJ1Y3RlZCk7XG5cblx0XHRcdC8vLy8gcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb25cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHQvLy8vIHJldHVybiB0aGUgd2lkZ2V0IGFydGVmYWN0IGNsYXNzXG5cdFx0cmV0dXJuIFdpZGdldDtcblx0fVxuXG5cdHJldHVybiBhbXlXaWRnZXQ7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC93aWRnZXQuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblx0XHQvL1xuXHRcdC8vIHRlc3QgZXF1YWxpdHkgd2l0aCBhIHRvbGVyYW5jZSBvZiBlcHNpbG9uXG5cdFx0Ly9cblx0XHRhcHByb3g6IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBlcHNpbG9uKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChlcHNpbG9uKSkgeyBlcHNpbG9uID0gMWUtNSB9XG5cdFx0XHRyZXR1cm4gKE1hdGguYWJzKHZhbDEgLSB2YWwyKSA8IGVwc2lsb24pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHQvL1xuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdC8vXG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzUGxhaW5PYmplY3Qob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0Ly9cblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc0FycmF5KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdC8vXG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdC8vXG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0Ly9cblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHQvL1xuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0Ly9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHQvL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0Ly9cblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0Ly9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdC8vXG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0Ly9cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0Ly9cblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGBBLmZvckVhY2hgLCBleGNlcHQgaXQgaXRlcmF0ZXMgZnJvbSByaWdodCB0byBsZWZ0XG5cdFx0Ly9cblx0XHRmb3JFYWNoUmV2ZXJzZShBLCBmbikge1xuXHRcdFx0dmFyIGkgPSBBLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHsgZm4oQVtpXSwgaSwgQSkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0Ly9cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0Ly9cblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdC8vXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0Ly9cblx0XHRvYnNlcnZhYmxlKG9iaiwge25hbWUsIGluaXRpYWwsIHZhbGlkYXRpb259KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuXG5cdFx0Ly8gSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhIGNhY2hlXG5cdFx0Ly8gdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWVcblx0XHQvLyBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duXG5cdFx0Ly8gY29tcGFyaXNvbiBmdW5jdGlvbi5cblx0XHQvL1xuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlXG5cdFx0XHQvL1xuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdC8vIE5PVEU6IG9ubHkgb25lIGNhbGxiYWNrIGlzIHN0b3JlZCFcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdqcy1ncmFwaCcsICdibHVlYmlyZCcsICcuL3RyYXZlcnNlLWRhZy5qcycsICcuL21pc2MuanMnLCAnLi9kZWx0YS5qcyddLCBmdW5jdGlvbiAoJCwgSnNHcmFwaCwgUCwgdHJhdmVyc2UsIFUsIERlbHRhKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gUGx1Z2luSGFuZGxlcigpIHtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLy8gUHJpdmF0ZSBWYXJpYWJsZXMgLy8vL1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0Ly9cblx0XHQvLyBrZWVwIHRyYWNrIG9mIHBsdWdpbnMgYW5kIHRoZWlyIHBhcnRpYWwgYXBwbGljYXRpb24gb3JkZXJcblx0XHQvL1xuXHRcdHZhciBfcGx1Z2lucyA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0dmFyIF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb24gPSB7fTtcblx0XHR2YXIgX2ZlYXR1cmVDb25maWd1cmF0aW9uQ2FjaGUgPSB7fTtcblx0XHR2YXIgX3BsdWdpblByZWRpY2F0ZXMgPSB7fTtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLy8gUHJpdmF0ZSBGdW5jdGlvbnMgLy8vL1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0Ly9cblx0XHQvLyB0byBwcm9jZXNzIGEgY29uZGl0aW9uIGRpc2p1bmN0IGZvciBhIHBsdWdpblxuXHRcdC8vXG5cdFx0ZnVuY3Rpb24gX2FkZFBsdWdpbkNvbmRpdGlvbkRpc2p1bmN0KG5hbWUsIGNvbmRpdGlvbikge1xuXHRcdFx0Ly9cblx0XHRcdC8vIHRvIGFjY3VtdWxhdGUgY29uZGl0aW9uIGRpc2p1bmN0cyBpbnRvIHJ1bm5hYmxlIHByZWRpY2F0ZXNcblx0XHRcdC8vXG5cdFx0XHRmdW5jdGlvbiBhY2N1bXVsYXRlKGxhenlDb25kaXRpb24pIHtcblx0XHRcdFx0dmFyIG9sZFByZWRpY2F0ZSA9IF9wbHVnaW5QcmVkaWNhdGVzW25hbWVdO1xuXHRcdFx0XHRfcGx1Z2luUHJlZGljYXRlc1tuYW1lXSA9IChjb250ZXh0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKF9mZWF0dXJlQ29uZmlndXJhdGlvbkNhY2hlW25hbWVdKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHRfZmVhdHVyZUNvbmZpZ3VyYXRpb25DYWNoZVtuYW1lXSA9XG5cdFx0XHRcdFx0XHRcdChvbGRQcmVkaWNhdGUgJiYgb2xkUHJlZGljYXRlKGNvbnRleHQpKSB8fFxuXHRcdFx0XHRcdFx0XHRsYXp5Q29uZGl0aW9uKGNvbnRleHQpO1xuXHRcdFx0XHRcdHJldHVybiBfZmVhdHVyZUNvbmZpZ3VyYXRpb25DYWNoZVtuYW1lXTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIGludGVycHJldCB0aGUgZ2l2ZW4gY29uZGl0aW9uIGJ5IHR5cGVcblx0XHRcdC8vXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChjb25kaXRpb24pKSB7IC8vIGRvIG5vdCBsb2FkIGEgcGx1Z2luIGJ5IGRlZmF1bHRcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBmYWxzZSk7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09ICdzdHJpbmcnKSB7IC8vIGEgcGx1Z2luIG5hbWVcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uW2NvbmRpdGlvbl0pO1xuXHRcdFx0fSBlbHNlIGlmICgkLmlzQXJyYXkoY29uZGl0aW9uKSkgeyAvLyBhIGNvbmp1bmN0aW9uXG5cdFx0XHRcdGFjY3VtdWxhdGUoKCkgPT4gY29uZGl0aW9uLmV2ZXJ5KChjb25qdW5jdCkgPT4gX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbltjb25qdW5jdF0pKTtcblx0XHRcdH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKGNvbmRpdGlvbikpIHsgLy8gYSBwcmVkaWNhdGVcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBjb25kaXRpb24oX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbikpO1xuXHRcdFx0fSBlbHNlIHsgLy8gYSBsaXRlcmFsIEJvb2xlYW4gdmFsdWVcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiAhIWNvbmRpdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyB0byBwcm9jZXNzIGEgY29uZGl0aW9uIGRpc2p1bmN0IGZvciBhIHBsdWdpblxuXHRcdC8vXG5cdFx0ZnVuY3Rpb24gX2FkZFBsdWdpblJlcXVpcmVtZW50cyhwbHVnaW5OYW1lLCBvdGhlclBsdWdpbnMpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG90aGVyUGx1Z2lucykpIHsgcmV0dXJuIH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0Ly9cblx0XHRcdFUuYXNzZXJ0KCQuaXNBcnJheShvdGhlclBsdWdpbnMpLFxuXHRcdFx0XHRcdGBUaGUgJ3JlcXVpcmVzJyBjbGF1c2Ugb2YgYSBwbHVnaW4gc2hvdWxkIGJlIGFuIGFycmF5IG9mIHBsdWdpbiBuYW1lcy5gKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFkZCB0aGlzIHBsdWdpbiBhcyBhIGxvYWRpbmcgY29uZGl0aW9uIGZvciB0aGUgb3RoZXIgc3BlY2lmaWVkIHBsdWdpbnNcblx0XHRcdC8vXG5cdFx0XHRvdGhlclBsdWdpbnMuZm9yRWFjaCgob3RoZXJQbHVnaW4pID0+IHtcblx0XHRcdFx0X2FkZFBsdWdpbkNvbmRpdGlvbkRpc2p1bmN0KG90aGVyUGx1Z2luLCBwbHVnaW5OYW1lKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLy8gUHVibGljIE1ldGhvZHMgLy8vL1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0Ly9cblx0XHQvLyB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGJ5IHBsdWdpbiB3cml0ZXJzLFxuXHRcdC8vIGNvbnRhaW5pbmcgKHBhcnQgb2YpIGEgbmV3IHBsdWdpbiB0byBiZSByZWdpc3RlcmVkXG5cdFx0Ly9cblx0XHR0aGlzLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIocGx1Z2luKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gcGVyZm9ybSBzYW5pdHkgY2hlY2tzXG5cdFx0XHQvL1xuXHRcdFx0VS5hc3NlcnQoJC5pc1BsYWluT2JqZWN0KHBsdWdpbiksXG5cdFx0XHRcdFx0YEFuIEFwaU5BVE9NWSBwbHVnaW4gc2hvdWxkIGJlIGEgcGxhaW4gb2JqZWN0LmApO1xuXHRcdFx0VS5hc3NlcnQodHlwZW9mIHBsdWdpbi5uYW1lID09PSAnc3RyaW5nJyxcblx0XHRcdFx0XHRgQW4gQXBpTkFUT01ZIHBsdWdpbiBzaG91bGQgaGF2ZSBhIG5hbWUuYCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBub3JtYWxpemUgcGx1Z2luIGNvbmZpZ3VyYXRpb25cblx0XHRcdC8vXG5cdFx0XHRpZiAoISQuaXNBcnJheShwbHVnaW4uYWZ0ZXIpKSB7IHBsdWdpbi5hZnRlciA9IFtdIH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIHByb2Nlc3MgdGhlIHBsdWdpbiBjb25kaXRpb25cblx0XHRcdC8vXG5cdFx0XHRfYWRkUGx1Z2luQ29uZGl0aW9uRGlzanVuY3QocGx1Z2luLm5hbWUsIHBsdWdpbi5pZik7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbiwgcGx1Z2luLm5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gX3BsdWdpblByZWRpY2F0ZXNbcGx1Z2luLm5hbWVdKF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb24pIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcHJvY2VzcyB0aGUgcGx1Z2luIHJlcXVpcmVtZW50c1xuXHRcdFx0Ly9cblx0XHRcdF9hZGRQbHVnaW5SZXF1aXJlbWVudHMocGx1Z2luLm5hbWUsIHBsdWdpbi5yZXF1aXJlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJlZ2lzdGVyIHRoZSBwbHVnaW5cblx0XHRcdC8vXG5cdFx0XHRfcGx1Z2lucy5hZGRWZXJ0ZXgocGx1Z2luLm5hbWUsIHBsdWdpbik7XG5cdFx0XHQkLmVhY2gocGx1Z2luLmFmdGVyLCAoX18sIHYpID0+IHsgX3BsdWdpbnMuY3JlYXRlRWRnZSh2LCBwbHVnaW4ubmFtZSkgfSk7XG5cdFx0XHRpZiAoX3BsdWdpbnMuaGFzQ3ljbGUoKSkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBwbHVnaW4gYXBwbGljYXRpb24gb3JkZXIgaGFzIGEgY3ljbGUuYCkgfVxuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gY3JlYXRlIHRoZSBkZWx0YSB0aGF0IGVtYm9kaWVzIHRoZSBwbHVnaW5cblx0XHRcdC8vXG5cdFx0XHRwbHVnaW4uZGVsdGEgPSBuZXcgRGVsdGEocGx1Z2luKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHVybiBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgYWRkaXRpb25hbCBvcGVyYXRpb25zXG5cdFx0XHQvL1xuXHRcdFx0cmV0dXJuIHBsdWdpbi5kZWx0YTtcblx0XHR9O1xuXG5cdFx0Ly9cblx0XHQvLyBzZWxlY3QgdGhlIHBsdWdpbnMgdG8gYmUgZW5hYmxlZFxuXHRcdC8vXG5cdFx0dGhpcy5zZWxlY3QgPSBmdW5jdGlvbiBzZWxlY3QocGx1Z2luTmFtZXMpIHtcblxuXHRcdFx0Ly8vLyBhY2NlcHQgYW4gYXJyYXkgb2YgcGx1Z2luIG5hbWVzLCByYXRoZXIgdGhhbiBqdXN0IG9uZSBuYW1lXG5cdFx0XHRpZiAoJC5pc0FycmF5KHBsdWdpbk5hbWVzKSkgeyBwbHVnaW5OYW1lcy5mb3JFYWNoKHNlbGVjdCkgfVxuXG5cdFx0XHQvLy8vIHByb2Nlc3Mgc2luZ2xlIHBsdWdpbiBuYW1lIGJ5IG1ha2luZyBpdHMgY29uZGl0aW9uICd0cnVlJ1xuXHRcdFx0X2FkZFBsdWdpbkNvbmRpdGlvbkRpc2p1bmN0KHBsdWdpbk5hbWVzLCB0cnVlKTtcblxuXHRcdH07XG5cblx0XHQvL1xuXHRcdC8vIGFwcGx5IGFsbCByZWxldmFudCBwbHVnaW5zIHRvIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Ly9cblx0XHR0aGlzLmFwcGx5ID0gZnVuY3Rpb24gYXBwbHkob2JqKSB7XG5cdFx0XHRyZXR1cm4gUC5hbGwodHJhdmVyc2UoX3BsdWdpbnMsIChwbHVnaW5OYW1lLCBwbHVnaW4pID0+IHtcblxuXHRcdFx0XHQvLy8vIGlmIHRoZSBwbHVnaW4gaXMgbm90IHNlbGVjdGVkLCByZXR1cm5cblx0XHRcdFx0aWYgKCFfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uW3BsdWdpbk5hbWVdKSB7IHJldHVybiB9XG5cblx0XHRcdFx0Ly8vLyBpZiB0aGUgcGx1Z2luIGRvZXNuJ3QgZXhpc3QsIHRocm93IGFuIGVycm9yXG5cdFx0XHRcdFUuYXNzZXJ0KHBsdWdpbiwgYEkgZG9uJ3Qga25vdyB0aGUgJyR7cGx1Z2luTmFtZX0nIHBsdWdpbi5gKTtcblxuXHRcdFx0XHQvLy8vIGFwcGx5IHRoZSBkZWx0YSwgYW5kIHJldHVybiBhIHByb21pc2UgZm9yIGl0IHRvIGJlIGRvbmVcblx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZShwbHVnaW4uZGVsdGEuYXBwbHkob2JqKSk7XG5cblx0XHRcdH0pKTtcblx0XHR9O1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3BsdWdpbi1oYW5kbGVyLmpzXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24gKFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcblx0XHR2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuXHRcdHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0cmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuXHRcdH0pO1xuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuXHRcdFx0cmVqZWN0OiByZWplY3QsXG5cdFx0XHRwcm9taXNlOiBwcm9taXNlXG5cdFx0fTtcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlZmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJy4vZGVmZXIuanMnXSwgZnVuY3Rpb24gKFAsIGRlZmVyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gdHJhdmVyc2VEQUcoZ3JhcGgsIGZuKSB7XG5cdFx0Ly9cblx0XHQvLyBrZWVwaW5nIHRyYWNrIG9mIHRoZSBkZWZlcnJlZHMgb2YgYWxsIG5vZGVzXG5cdFx0Ly9cblx0XHR2YXIgbm9kZURlZmVycmVkcyA9IHt9O1xuXHRcdGZ1bmN0aW9uIG5vZGVEZWZlcnJlZChpZCkge1xuXHRcdFx0aWYgKCFub2RlRGVmZXJyZWRzW2lkXSkgeyBub2RlRGVmZXJyZWRzW2lkXSA9IGRlZmVyKCkgfVxuXHRcdFx0cmV0dXJuIG5vZGVEZWZlcnJlZHNbaWRdO1xuXHRcdH1cblxuXHRcdC8vXG5cdFx0Ly8ga2VlcGluZyB0cmFjayBvZiB0aGUgc291cmNlcyBhbmQgc2lua3Ncblx0XHQvL1xuXHRcdHZhciBzaW5rUHJvbWlzZXMgPSBbXTtcblxuXHRcdC8vXG5cdFx0Ly8gY29ubmVjdCBhbGwgdGhlIHByb21pc2VzXG5cdFx0Ly9cblx0XHRncmFwaC5lYWNoVmVydGV4KChrZXksIHZhbCkgPT4ge1xuXHRcdFx0dmFyIHByZWRzID0gZ3JhcGgucHJlZGVjZXNzb3JzKGtleSk7XG5cdFx0XHR2YXIgc3VjY3MgPSBncmFwaC5zdWNjZXNzb3JzKGtleSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyB0ZXN0IGZvciBzaW5rLWhvb2Rcblx0XHRcdC8vXG5cdFx0XHRpZiAoc3VjY3MubGVuZ3RoID09PSAwKSB7IHNpbmtQcm9taXNlcy5wdXNoKG5vZGVEZWZlcnJlZChrZXkpLnByb21pc2UpIH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIHNldCB1cCBwcm9taXNlIHRvIHJlc29sdmUgd2hlbiBwcmVkZWNlc3NvcnMgYXJlIGRvbmVcblx0XHRcdC8vXG5cdFx0XHRQLmFsbChwcmVkcy5tYXAoKHByZWQpID0+IHsgcmV0dXJuIG5vZGVEZWZlcnJlZChwcmVkKS5wcm9taXNlIH0pKS50aGVuKChwcmVkUmVzdWx0cykgPT4ge1xuXHRcdFx0XHRub2RlRGVmZXJyZWQoa2V5KS5yZXNvbHZlKGZuKGtleSwgdmFsLCBwcmVkUmVzdWx0cykpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIHJldHVybiBwcm9taXNlcyBvZiB0aGUgc2luayBub2RlIHJlc3VsdHNcblx0XHQvL1xuXHRcdHJldHVybiBzaW5rUHJvbWlzZXM7XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC90cmF2ZXJzZS1kYWcuanNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnanMtZ3JhcGgnLCAnYmx1ZWJpcmQnLCAnLi90cmF2ZXJzZS1kYWcuanMnLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBKc0dyYXBoLCBQLCB0cmF2ZXJzZSwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gQWNjdW11bGF0ZWQgZGF0YSBmb3IgdGhlIGF2YWlsYWJsZSBkZWx0YSBvcGVyYXRpb24gdHlwZXNcblx0Ly9cblx0dmFyIG9wVHlwZXMgPSB7fTsgICAgLy8gdGhlIG5hbWUgYW5kIGRlbHRhIGNsYXNzZXNcblx0dmFyIGNvbXBvc2VGbnMgPSBbXTsgLy8gdGhlIGNhc2UgZGlzdGluY3Rpb25zIG9mIGRlbHRhIGNvbXBvc2l0aW9uXG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBmdWxseSBkZWZpbmUgYSBuZXcgZGVsdGEgb3BlcmF0aW9uIHR5cGVcblx0Ly9cblx0ZnVuY3Rpb24gYWRkT3BlcmF0aW9uVHlwZSh7bmFtZSwgY29uc3RydWN0b3I6IGNvbnN0cnVjdG9yRm4sIGFwcGx5OiBhcHBseUZuLCBwcm90b3R5cGUsIG1ldGhvZH0pIHtcblx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0dmFyIG9iamVjdFdpdGhNZXRob2QgPSB7fTtcblx0XHRpZiAoVS5pc0RlZmluZWQobWV0aG9kKSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdFdpdGhNZXRob2QsIG5hbWUsIHtcblx0XHRcdFx0dmFsdWU6IG1ldGhvZFxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHRcdHZhbHVlKHByb3BlcnR5LCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlc1tuYW1lXSwgcHJvcGVydHksIHZhbHVlcyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRvcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdERlbHRhOiBjb25zdHJ1Y3RvckZuLFxuXHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0fTtcblxuXHRcdC8vIGRlZmluZSB0aGUgRGVsdGEgY2xhc3Ncblx0XHQkLmV4dGVuZChvcFR5cGVzW25hbWVdLkRlbHRhLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3RvcjogY29uc3RydWN0b3JGbixcblx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRhcHBseTogYXBwbHlGbixcblx0XHRcdGNvbXBvc2UocHJvcGVydHksIG9wMikge1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcDIpKSB7IHJldHVybiB0aGlzIH1cblx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRjb21wb3NlRm5zLnNvbWUoKHtvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm59KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMudHlwZSA9PT0gb3AxVHlwZSAmJiBvcDIudHlwZSA9PT0gb3AyVHlwZSkge1xuXHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4gPSBjb21wb3NlRm47XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoZm91bmRDb21wb3NlRm4pIHtcblx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbih0aGlzLCBwcm9wZXJ0eSwgb3AyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRgWW91IGNhbm5vdCBmb2xsb3cgYSAnJHt0aGlzLnR5cGV9JyBvcGVyYXRpb24gYCArXG5cdFx0XHRcdFx0XHRcdGB3aXRoIGEgJyR7b3AyLnR5cGV9JyBvcGVyYXRpb24gb24gdGhlIHNhbWUgcHJvcGVydHkuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0ZXJyLm9wMSA9IHRoaXMudHlwZTtcblx0XHRcdFx0XHRlcnIub3AyID0gb3AyLnR5cGU7XG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGEgKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyBkZWZpbmVkIGZpcnN0KVxuXHRcdG9wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9IG9wVHlwZXNbbmFtZV0ubWV0aG9kO1xuXHR9XG5cdGZ1bmN0aW9uIGFkZE9wZXJhdGlvbkFsaWFzKHtuYW1lLCB0YXJnZXQsIHRyYW5zZm9ybX0pIHtcblxuXHRcdC8vIGRlZmluZSB0aGUgbWV0aG9kIGZvciBhZGRpbmcgdGhlIG5ldyBvcGVyYXRpb24gdG8gYSBNb2RpZnkgZGVsdGFcblx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHR2YWx1ZShwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGVzW3RhcmdldF0sIHByb3BlcnR5LCB0cmFuc2Zvcm0odmFsdWVzKSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdG9wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0fTtcblxuXHRcdC8vIG1ha2UgdGhlIG9wZXJhdGlvbiBtZXRob2QgYXZhaWxhYmxlIG9uIHRoZSAnbW9kaWZ5JyBkZWx0YSAoYXNzdW1lcyB0aGF0ICdtb2RpZnknIGlzIGRlZmluZWQgZmlyc3QpXG5cdFx0b3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID0gb3BUeXBlc1tuYW1lXS5tZXRob2Q7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBuZXcgdmFsaWQgY2FzZSBkaXN0aW5jdGlvbnMgZm9yIGRlbHRhIGNvbXBvc2l0aW9uXG5cdC8vXG5cdGZ1bmN0aW9uIGFkZENvbXBvc2l0aW9uUnVsZShvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4pIHtcblx0XHRjb21wb3NlRm5zLnB1c2goeyBvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4gfSk7XG5cdH1cblx0dmFyIGtlZXBGaXJzdCA9ICgpID0+IHt9O1xuXHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBkMiB9O1xuXG5cdC8vXG5cdC8vIHRoZSBtb2RpZnkgb3BlcmF0aW9uIChNVVNUIEJFIFRIRSBGSVJTVCBPUEVSQVRJT04gVFlQRSBUTyBCRSBERUZJTkVEKVxuXHQvL1xuXHRhZGRPcGVyYXRpb25UeXBlKHtcblx0XHRuYW1lOiAnbW9kaWZ5Jyxcblx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gTW9kaWZ5KGRlbHRhRGVzY3JpcHRpb24sIG9wZXJhdGlvbnMpIHtcblx0XHRcdGRlbHRhRGVzY3JpcHRpb24gPSBkZWx0YURlc2NyaXB0aW9uIHx8IHt9O1xuXHRcdFx0dGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucyB8fCB7fTtcblx0XHRcdC8vXG5cdFx0XHQvLyBwcm9jZXNzIHBvc3NpYmxlIGRlbHRhIGRlc2NyaXB0aW9uXG5cdFx0XHQvL1xuXHRcdFx0JC5lYWNoKGRlbHRhRGVzY3JpcHRpb24sIChrZXksIHZhbHVlKSA9PiB7XG5cdFx0XHRcdHZhciBtYXRjaCA9IGtleS5tYXRjaCgvXihcXHcrKVxccysoW1xcd1xcLl0rKSQvKTtcblx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0dmFyIG9wZXJhdGlvbiA9IG1hdGNoWzFdO1xuXHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFUuYXNzZXJ0KG9wZXJhdGlvbiBpbiBvcFR5cGVzLFxuXHRcdFx0XHRcdFx0XHRgSSBkb24ndCBrbm93IHRoZSAnJHtvcGVyYXRpb259JyBvcGVyYXRpb24uYCk7XG5cdFx0XHRcdFx0dGhpc1tvcGVyYXRpb25dKHByb3BlcnR5LCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3BlcnR5KSkge1xuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpbcHJvcGVydHldYFxuXHRcdFx0XHQvL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHkob2JqW3Byb3BlcnR5XSwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpgXG5cdFx0XHRcdC8vXG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5KG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHByb3RvdHlwZToge1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHByb3BlcnR5LCB2YWx1ZXMpIHtcblx0XHRcdFx0dmFyIGRvdEluZGV4ID0gcHJvcGVydHkuaW5kZXhPZignLicpO1xuXHRcdFx0XHRpZiAoZG90SW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBkb3Qtc2VwYXJhdGVkIHBhdGg7IHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIG1vZGlmeS1jaGFpblxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0dmFyIGFjdHVhbFByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoMCwgZG90SW5kZXgpO1xuXHRcdFx0XHRcdHZhciByZXN0T2ZQcm9wZXJ0eSA9IHByb3BlcnR5LnNsaWNlKGRvdEluZGV4KzEpO1xuXHRcdFx0XHRcdHZhciBuZXdNb2RpZnlEZWx0YSA9IHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGVzWydtb2RpZnknXSwgYWN0dWFsUHJvcGVydHkpO1xuXHRcdFx0XHRcdHJldHVybiBuZXdNb2RpZnlEZWx0YVtvcFR5cGUubmFtZV0uYXBwbHkobmV3TW9kaWZ5RGVsdGEsIFtyZXN0T2ZQcm9wZXJ0eV0uY29uY2F0KHZhbHVlcykpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gdGhlIHByb3BlcnR5IGlzIGEgc2luZ2xlIG5hbWU7IGFkZCB0aGUgbmV3IGRlbHRhIGRpcmVjdGx5XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHR2YXIgbmV3RGVsdGEgPSBVLmFwcGx5Q29uc3RydWN0b3Iob3BUeXBlLkRlbHRhLCB2YWx1ZXMpO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNvbXBvc2UocHJvcGVydHksIG5ld0RlbHRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XSA9IG5ld0RlbHRhO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bWV0aG9kKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZXNbJ21vZGlmeSddLCBwcm9wZXJ0eSwgW2RlbHRhRGVzY3JpcHRpb25dKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vXG5cdC8vIHRoZSBvdGhlciBzdGFuZGFyZCBvcGVyYXRpb24gdHlwZXNcblx0Ly9cblx0YWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0bmFtZTogJ2FkZCcsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFkZCh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRhcHBseShvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdGBUaGUgJ2FkZCcgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGZpcnN0IGJlIHVuZGVmaW5lZC5gKTtcblx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdH1cblx0fSk7XG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdyZXBsYWNlJyxcblx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gUmVwbGFjZSh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRhcHBseShvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlICdyZXBsYWNlJyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0fVxuXHR9KTtcblx0YWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0bmFtZTogJ3JlbW92ZScsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlbW92ZSgpIHt9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdGBUaGUgJ3JlbW92ZScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGZpcnN0IGJlIGRlZmluZWQuYCk7XG5cdFx0XHRkZWxldGUgb2JqW3Byb3BlcnR5XTtcblx0XHR9XG5cdH0pO1xuXHRhZGRPcGVyYXRpb25UeXBlKHtcblx0XHRuYW1lOiAnZm9yYmlkJyxcblx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gRm9yYmlkKCkge30sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlICdmb3JiaWQnIG9wZXJhdGlvbiByZXF1aXJlcyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHRcdH1cblx0fSk7XG5cblx0Ly9cblx0Ly8gY29tcG9zaXRpb24gb2YgdGhlIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHQvL1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZXBsYWNlJywgICAgIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBuZXcgb3BUeXBlc1snYWRkJ10uRGVsdGEoZDIudmFsdWUpIH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdtb2RpZnknLCAgICAgIChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpIH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZW1vdmUnLCAgICAgIChkMSwgcCkgICAgID0+IHsgZDFbcF0gPSBuZXcgb3BUeXBlc1snZm9yYmlkJ10uRGVsdGEoKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ21vZGlmeScsICAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlbW92ZScsICBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVwbGFjZScsICBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdE9iamVjdC5rZXlzKGQyLm9wZXJhdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdGQxLmNvbXBvc2UocHJvcCwgZDIub3BlcmF0aW9uc1twcm9wXSk7XG5cdFx0fSk7XG5cdH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZW1vdmUnLCAnYWRkJywgICAgKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IG5ldyBvcFR5cGVzWydyZXBsYWNlJ10uRGVsdGEoZDIudmFsdWUpIH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2ZvcmJpZCcsICdhZGQnLCAgICBrZWVwU2Vjb25kKTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblxuXG5cdC8vXG5cdC8vICdhbHRlcicgb3BlcmF0aW9uIHR5cGVcblx0Ly9cblx0YWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0bmFtZTogJ2FsdGVyJyxcblx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWx0ZXIodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIHx8IFtdIH0sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0VS5hc3NlcnQoJC5pc0Z1bmN0aW9uKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdhbHRlcicgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRcdHRoaXMudmFsdWUuZm9yRWFjaCgoc3ViT3ApID0+IHtcblx0XHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0XHR2YXIgcGFydFR3byA9IHN1Yk9wLnZhbHVlO1xuXHRcdFx0XHRpZiAoc3ViT3AudHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG5cdFx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9IGVsc2UgeyAvLyAnYXBwZW5kJyBvciAnaW5zZXJ0J1xuXHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRbXS5wdXNoLmFwcGx5KGQxW3BdLnZhbHVlLCB0aGlzLnZhbHVlKTtcblx0fSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ3JlbW92ZScsIChkMSwgcCkgPT4geyBkMVtwXSA9IG5ldyBvcFR5cGVzWydmb3JiaWQnXS5EZWx0YSgpIH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRVLmFzc2VydCgkLmlzRnVuY3Rpb24oZDFbcF0udmFsdWUpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWx0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJyk7XG5cdH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0VS5hc3NlcnQoJC5pc0Z1bmN0aW9uKGQxW3BdLnZhbHVlKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJ2FsdGVyJyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0ZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpO1xuXHR9KTtcblxuXG5cdC8vXG5cdC8vIHRoZSAncHJlcGVuZCcsICdpbnNlcnQnIGFuZCAnYXBwZW5kJyBvcGVyYXRpb24gdHlwZXNcblx0Ly9cblx0WydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXS5mb3JFYWNoKChvcFR5cGUpID0+IHtcblx0XHRhZGRPcGVyYXRpb25BbGlhcyh7XG5cdFx0XHRuYW1lOiBvcFR5cGUsXG5cdFx0XHR0YXJnZXQ6ICdhbHRlcicsXG5cdFx0XHR0cmFuc2Zvcm06IChhcmdzKSA9PiBbW3sgdHlwZTogb3BUeXBlLCB2YWx1ZTogYXJnc1swXSB9XV1cblx0XHR9KTtcblx0fSk7XG5cblxuXHQvL1xuXHQvLyAnYWZ0ZXInIG9wZXJhdGlvbiB0eXBlXG5cdC8vXG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdhZnRlcicsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFmdGVyKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWZ0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHR2YXIgcGFydFR3byA9IHRoaXMudmFsdWU7XG5cdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZShwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gcGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVtb3ZlJywgIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRVLmFzc2VydCgkLmlzRnVuY3Rpb24oZDFbcF0udmFsdWUpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWZ0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24uYCk7XG5cdFx0ZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpO1xuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihkMVtwXS52YWx1ZSksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdhZnRlcicgZXhwZWN0cyB0aGUgcHJvcGVydHkgaXQgYWN0cyBvbiB0byBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbi5gKTtcblx0XHRkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJyk7XG5cdH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2luc2VydCcsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpOyB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdpbnNlcnQnLCAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKTsgfSk7XG5cblx0Ly8gVE9ETzogdGhlIGFib3ZlIGNvbXBvc2l0aW9ucyBvZiAnaW5zZXJ0JyBhbmQgJ2FmdGVyJyBhcmUgbm90IGFjdHVhbGx5XG5cdC8vICAgICA6IGNvcnJlY3Q7IG5vdCBhc3NvY2lhdGl2ZSwgaW4gZmFjdC4gUmF0aGVyIHRoYW4gY29sbGFwc2luZyB0aGVtXG5cdC8vICAgICA6IGF0IHRoaXMgc3RhZ2UsIGEgbGlzdCBvZiBvcGVyYXRpb25zIHNob3VsZCBiZSBrZXB0LlxuXG5cdC8vXG5cdC8vIHJldHVybiB0aGUgbW9kaWZ5IGRlbHRhIGNsYXNzXG5cdC8vXG5cdHJldHVybiBvcFR5cGVzWydtb2RpZnknXS5EZWx0YTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlbHRhLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiY2lyY3VpdGJvYXJkLmpzIn0=