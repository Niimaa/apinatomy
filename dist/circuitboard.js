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
	    observable: function(obj, options) {
	      var value;
	      Object.defineProperty(obj, options.name, {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          if (newValue !== value) {
	            var oldValue = value;
	            value = newValue;
	            this.trigger(options.name, newValue, oldValue);
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
	  var opTypes = {};
	  var composeFns = [];
	  function addOperationType($__2) {
	    var $__3 = $__2,
	        name = $__3.name,
	        constructorFn = $__3.constructor,
	        applyFn = $__3.apply,
	        prototype = $__3.prototype,
	        method = $__3.method;
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
	        composeFns.some((function($__3) {
	          var $__4 = $__3,
	              op1Type = $__4.op1Type,
	              op2Type = $__4.op2Type,
	              composeFn = $__4.composeFn;
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
	    name: 'insert',
	    constructor: function Insert(value) {
	      this.value = value;
	    },
	    apply: function(obj, property) {
	      U.assert($.isFunction(obj[property]), "The operation 'insert' expects the property to be a function.");
	      var partOne = obj[property];
	      var partTwo = this.value;
	      obj[property] = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        partOne.apply(this, args);
	        partTwo.apply(this, args);
	      };
	    }
	  });
	  addCompositionRule('insert', 'replace', keepSecond);
	  addCompositionRule('insert', 'remove', (function(d1, p) {
	    d1[p] = new opTypes['forbid'].Delta();
	  }));
	  addCompositionRule('add', 'insert', (function(d1, p, d2) {
	    U.assert($.isFunction(d1[p].value), "The operation 'insert' expects the property it acts on to be a function.");
	    d2.apply(d1[p], 'value');
	  }));
	  addCompositionRule('replace', 'insert', (function(d1, p, d2) {
	    U.assert($.isFunction(d1[p].value), "The operation 'insert' expects the property it acts on to be a function.");
	    d2.apply(d1[p], 'value');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1NTUwMmExZTM4MTU4NDQxMzNlZiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9wbHVnaW4taGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL3RyYXZlcnNlLWRhZy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWx0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7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UyxDQUFDLENBQUM7QUFDbEQsb0JBQWtCLENBQUMsS0FBSSxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUNqRCxZQUFRLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBRSxFQUFDLE1BQU0sQ0FBQyxDQUMvQix1RkFBcUYsQ0FBQyxDQUFDO0FBQ3pGLE1BQUMsTUFBTyxDQUFDLEVBQUMsQ0FBRSxFQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7R0FDekIsRUFBQyxDQUFDO0FBQ0Ysb0JBQWtCLENBQUMsU0FBUSxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUNyRCxZQUFRLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBRSxFQUFDLE1BQU0sQ0FBQyxDQUMvQix1RkFBcUYsQ0FBQyxDQUFDO0FBQ3pGLE1BQUMsTUFBTyxDQUFDLEVBQUMsQ0FBRSxFQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7R0FDekIsRUFBQyxDQUFDO0FBQ0Ysb0JBQWtCLENBQUMsUUFBTyxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsTUFBTyxDQUFDLEVBQUMsQ0FBRSxFQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7R0FBRSxFQUFDLENBQUM7QUFDbkYsb0JBQWtCLENBQUMsT0FBTSxDQUFHLFNBQU8sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsTUFBTyxDQUFDLEVBQUMsQ0FBRSxFQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7R0FBRSxFQUFDLENBQUM7QUFTbkYsUUFBTyxRQUFNLENBQUUsUUFBTyxDQUFDLE1BQU0sQ0FBQztBQUUvQixFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCIsIFwianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwianMtZ3JhcGhcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkpzR3JhcGhcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDU1NTAyYTFlMzgxNTg0NDEzM2VmXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvd2lkZ2V0LmpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9wbHVnaW4taGFuZGxlci5qcycsXG5cdCcuL3V0aWwvZGVmZXIuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgYW15V2lkZ2V0LCBVLCBQbHVnaW5IYW5kbGVyLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gc2V0IHVwIGEgcHJvbWlzZSBjaGFpbiBmb3IgZ3VpZGluZyB3aWRnZXQgY29uc3RydWN0aW9uXG5cdC8vXG5cdHZhciBiZWZvcmVDb25zdHJ1Y3Rpb24gPSBkZWZlcigpO1xuXG5cdC8vXG5cdC8vIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgdGhlIHRocmVlIHR5cGVzIG9mIHdpZGdldDpcblx0Ly8gQ2lyY3VpdGJvYXJkLCB0aWxlbWFwIGFuZCB0aWxlXG5cdC8vXG5cdHZhciB3aWRnZXRBcnRlZmFjdHMgPSB7XG5cdFx0Q2lyY3VpdGJvYXJkOiBhbXlXaWRnZXQoJ0NpcmN1aXRib2FyZCcsIHtcblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbjogYmVmb3JlQ29uc3RydWN0aW9uLnByb21pc2UsXG5cdFx0XHRjc3NDbGFzczogXCJjaXJjdWl0Ym9hcmRcIixcblx0XHRcdGZpbHRlcjogKCk9PlAucmVzb2x2ZSh0cnVlKSxcblx0XHRcdG1vZGVsOiBudWxsXG5cdFx0fSksXG5cdFx0VGlsZW1hcDogYW15V2lkZ2V0KCdUaWxlbWFwJywge1xuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uOiBiZWZvcmVDb25zdHJ1Y3Rpb24ucHJvbWlzZSxcblx0XHRcdGNzc0NsYXNzOiBcInRpbGVtYXBcIixcblx0XHRcdG1vZGVsOiBudWxsLFxuXHRcdFx0X2NpcmN1aXRib2FyZDogbnVsbFxuXHRcdH0pLFxuXHRcdFRpbGU6IGFteVdpZGdldCgnVGlsZScsIHtcblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbjogYmVmb3JlQ29uc3RydWN0aW9uLnByb21pc2UsXG5cdFx0XHRjc3NDbGFzczogJ3RpbGUnLFxuXHRcdFx0bW9kZWw6IG51bGwsXG5cdFx0XHRfY2lyY3VpdGJvYXJkOiBudWxsXG5cdFx0fSlcblx0fTtcblxuXHQvL1xuXHQvLyBhbGxvdyAnJC5jaXJjdWl0Ym9hcmQnIHRvIGFjY2VwdCBwbHVnaW5zXG5cdC8vXG5cdHZhciBwbHVnaW5IYW5kbGVyID0gbmV3IFBsdWdpbkhhbmRsZXIoKTtcblx0VS5vYmplY3QoJCwgJ2NpcmN1aXRib2FyZCcpLnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbihwbHVnaW5PclNlbGVjdGlvbikge1xuXHRcdGlmICgkLmlzUGxhaW5PYmplY3QocGx1Z2luT3JTZWxlY3Rpb24pKSB7XG5cdFx0XHQvLy8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlZ2lzdGVyIGEgbmV3IHBsdWdpblxuXHRcdFx0cmV0dXJuIHBsdWdpbkhhbmRsZXIucmVnaXN0ZXIocGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLy8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHNlbGVjdCBwbHVnaW5zIHRvIGJlIGFwcGxpZWRcblx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKHdpZGdldEFydGVmYWN0cyksXG5cdFx0XHRcdFx0YFRoZSBwbHVnaW5zIGFyZSBiZWluZyBzZWxlY3RlZCBiZWZvcmUgdGhlIGNpcmN1aXRib2FyZCBhcnRlZmFjdHMgd2VyZSByZWdpc3RlcmVkLiBgICtcblx0XHRcdFx0XHRgSGF2ZSB5b3UgbG9hZGVkIHRoZSBBcGlOQVRPTVkgZmlsZXMgaW4gYSBzdHJhbmdlIG9yZGVyP2ApO1xuXHRcdFx0cGx1Z2luSGFuZGxlci5zZWxlY3QocGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0cmV0dXJuIHBsdWdpbkhhbmRsZXIuYXBwbHkod2lkZ2V0QXJ0ZWZhY3RzKVxuXHRcdFx0XHRcdC50aGVuKGJlZm9yZUNvbnN0cnVjdGlvbi5yZXNvbHZlLCBiZWZvcmVDb25zdHJ1Y3Rpb24ucmVqZWN0KVxuXHRcdFx0XHRcdC5yZXR1cm4oKTtcblx0XHR9XG5cdH07XG5cblx0Ly9cblx0Ly8gcmV0dXJuIHRoZSBzdGF0aWMgYCQuY2lyY3VpdGJvYXJkYCBvYmplY3QsXG5cdC8vIHRocm91Z2ggd2hpY2ggcGx1Z2lucyBjYW4gYmUgYXBwbGllZCBhbmQgc2VsZWN0ZWRcblx0Ly9cblx0cmV0dXJuICQuY2lyY3VpdGJvYXJkO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvY2lyY3VpdGJvYXJkLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gYWRkIHNpZ25hbCBoYW5kbGluZyBtZXRob2RzIHRvIGFuIG9iamVjdFxuXHQvL1xuXHRmdW5jdGlvbiBlbmFibGVTaWduYWxIYW5kbGluZyhvYmopIHtcblx0XHR2YXIgX2NhbGxiYWNrcyA9IHt9O1xuXG5cdFx0ZnVuY3Rpb24gX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpIHtcblx0XHRcdGlmICghX2NhbGxiYWNrc1tzaWduYWxdKSB7XG5cdFx0XHRcdF9jYWxsYmFja3Nbc2lnbmFsXSA9ICQuQ2FsbGJhY2tzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX2NhbGxiYWNrc1tzaWduYWxdO1xuXHRcdH1cblxuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0b24oc2lnbmFsLCBmbikgeyBfc2lnbmFsQ2FsbGJhY2tzKHNpZ25hbCkuYWRkKGZuKSB9LFxuXHRcdFx0b2ZmKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLnJlbW92ZShmbikgfSxcblx0XHRcdG9uZShzaWduYWwsIGZuKSB7XG5cdFx0XHRcdHZhciBwYWRkZWRGbiA9ICgpID0+IHtcblx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRcdHRoaXMub2ZmKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLm9uKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0fSxcblx0XHRcdG9uY2Uoc2lnbmFsLCBmbikgeyB0aGlzLm9uZShzaWduYWwsIGZuKSB9LFxuXHRcdFx0dHJpZ2dlcihzaWduYWwsIC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF9jYWxsYmFja3Nbc2lnbmFsXTtcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykgeyBjYWxsYmFja3MuZmlyZVdpdGgodGhpcywgYXJncykgfVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBpbXBsZW1lbnQgYXJ0ZWZhY3QgaGllcmFyY2h5IG1ldGhvZHNcblx0Ly9cblx0ZnVuY3Rpb24gZGVmaW5lSGllcmFyY2h5TWV0aG9kcyhvYmosIHR5cGUpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAndHlwZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHR5cGUgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdwYXJlbnQnLCB7XG5cdFx0XHRzZXQocGFyZW50KSB7XG5cdFx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdFx0VS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuXHRcdFx0fSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ2NoaWxkcmVuJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfVxuXHRcdH0pO1xuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0KHRoaXMuY2hpbGRyZW4gfHwgW10pLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIG1ha2Ugc29tZSBpbXBvcnRhbnQgcmVmZXJlbmNlcyB0aGF0IGFyZSBwYXJ0XG5cdC8vIG9mIHRoZSBvcHRpb25zIHByb3BlcnR5IGF2YWlsYWJsZSBpbiB0aGUgb2JqZWN0IGl0c2VsZlxuXHQvL1xuXHRmdW5jdGlvbiBkZWZpbmVEZWZhdWx0UHJvcGVydGllcyhvYmopIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbW9kZWwnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KVxuXHQvLyBhcyBhIGpRdWVyeSBlbGVtZW50IHBsdWdpbjsgdGhpcyBpcyByZXR1cm5lZCBmcm9tIHRoZSBtb2R1bGVcblx0Ly9cblx0ZnVuY3Rpb24gYW15V2lkZ2V0KHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cykge1xuXHRcdC8vXG5cdFx0Ly8gdGhlIHNwZWNpZmljIHdpZGdldCBjbGFzc1xuXHRcdC8vXG5cdFx0ZnVuY3Rpb24gV2lkZ2V0KHtvcHRpb25zLCBlbGVtZW50fSkge1xuXHRcdFx0JC5leHRlbmQodGhpcywge1xuXHRcdFx0XHRvcHRpb25zOiAkLmV4dGVuZCh7fSwgb3B0aW9uRGVmYXVsdHMsIG9wdGlvbnMpLFxuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRkZXN0cm95KCkgeyB0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKSB9XG5cdFx0XHR9KTtcblx0XHRcdGVuYWJsZVNpZ25hbEhhbmRsaW5nKHRoaXMpO1xuXG5cdFx0XHQvLy8vIHNldCB0aGUgZWxlbWVudCBjbGFzc1xuXHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5jc3NDbGFzcyk7XG5cdFx0XHR0aGlzLmVsZW1lbnQub25lKCdyZW1vdmUnLCAoKSA9PiB7IHRoaXMuZGVzdHJveSgpIH0pO1xuXG5cdFx0XHQvLy8vIGNvbm5lY3QgdG8gdGhlIHBhcmVudCBhcnRlZmFjdFxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5wYXJlbnQpIHsgdGhpcy5wYXJlbnQgPSB0aGlzLm9wdGlvbnMucGFyZW50IH1cblxuXHRcdFx0Ly8vLyBjYWNoZSBhIHJlZmVyZW5jZSB0byB0aGUgY2lyY3VpdGJvYXJkIChpdCBpcyB1c2VkIG9mdGVuKVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8vLyB3YWl0IGZvciBzb21ldGhpbmcgYmVmb3JlIGNvbnN0cnVjdGlvbiAobGlrZSBwbHVnaW5zKT9cblx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSBQLnJlc29sdmUoKTtcblx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMub3B0aW9ucy5iZWZvcmVDb25zdHJ1Y3Rpb24pO1xuXG5cdFx0XHQvLy8vIGlmIHByZXNlbnQsIHJ1biB0aGUgY29uc3RydWN0IG1ldGhvZCBhZnRlclxuXHRcdFx0Ly8vLyBgdGhpcy5vcHRpb25zLmJlZm9yZUNvbnN0cnVjdGlvbmAgaXMgZmluaXNoZWRcblx0XHRcdC8vLy8gYW5kIHRoZW4gd2FpdCBvbiBpdFxuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdCgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0V2lkZ2V0LnByb3RvdHlwZS5iZWZvcmVDb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdC5yZXR1cm4oUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSkpXG5cdFx0XHRcdFx0LnJldHVybih0aGlzKTtcblx0XHR9O1xuXG5cdFx0ZGVmaW5lRGVmYXVsdFByb3BlcnRpZXMoV2lkZ2V0LnByb3RvdHlwZSk7XG5cdFx0ZGVmaW5lSGllcmFyY2h5TWV0aG9kcyhXaWRnZXQucHJvdG90eXBlLCB0eXBlTmFtZSk7XG5cblx0XHQvL1xuXHRcdC8vIG5vdyBkZWZpbmUgdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiBhcyBhIGpRdWVyeSBwbHVnaW5cblx0XHQvL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gdHlwZU5hbWVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGVOYW1lLnNsaWNlKDEpO1xuXHRcdCQuZm5bbG93ZXJjYXNlTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0Ly8vLyBpZiB0aGUgd29yZCAnaW5zdGFuY2UnIGlzIHBhc3NlZCwgcmV0dXJuIHRoZSAoYWxyZWFkeSBjcmVhdGVkKSB3aWRnZXQgcHJvbWlzZVxuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdpbnN0YW5jZScpIHsgcmV0dXJuIHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCkgfVxuXG5cdFx0XHQvLy8vIGVsc2UsIGNyZWF0ZSBhIG5ldyB3aWRnZXQgYW5kIHNldCBhIHByb21pc2UgdG8gaXRcblx0XHRcdHZhciBuZXdXaWRnZXQgPSBuZXcgV2lkZ2V0KHsgb3B0aW9uczogb3B0aW9ucywgZWxlbWVudDogdGhpcyB9KTtcblx0XHRcdHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCwgbmV3V2lkZ2V0LmNvbnN0cnVjdGVkKTtcblxuXHRcdFx0Ly8vLyByZXR1cm4gdGhlIGpRdWVyeSBlbGVtZW50IGluc3RhbmNlLCBieSBqUXVlcnkgY29udmVudGlvblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdC8vLy8gcmV0dXJuIHRoZSB3aWRnZXQgYXJ0ZWZhY3QgY2xhc3Ncblx0XHRyZXR1cm4gV2lkZ2V0O1xuXHR9XG5cblx0cmV0dXJuIGFteVdpZGdldDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3dpZGdldC5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXHRcdC8vXG5cdFx0Ly8gdGVzdCBlcXVhbGl0eSB3aXRoIGEgdG9sZXJhbmNlIG9mIGVwc2lsb25cblx0XHQvL1xuXHRcdGFwcHJveDogZnVuY3Rpb24gKHZhbDEsIHZhbDIsIGVwc2lsb24pIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGVwc2lsb24pKSB7IGVwc2lsb24gPSAxZS01IH1cblx0XHRcdHJldHVybiAoTWF0aC5hYnModmFsMSAtIHZhbDIpIDwgZXBzaWxvbik7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdC8vXG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0Ly9cblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNQbGFpbk9iamVjdChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHQvL1xuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzQXJyYXkob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0Ly9cblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0Ly9cblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHQvL1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdC8vXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHQvL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdC8vXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHQvL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHQvL1xuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvL1xuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHQvL1xuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHQvL1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHQvL1xuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHQvL1xuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gc3RvcEVhY2hBbmltYXRpb25GcmFtZSgpIHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0Ly9cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gb3B0aW9ucy5uYW1lIChtYW5kYXRvcnkpIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly9cblx0XHRvYnNlcnZhYmxlKG9iaiwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHZhbHVlO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgb3B0aW9ucy5uYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH0sXG5cdFx0XHRcdHNldChuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihvcHRpb25zLm5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdC8vXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vXG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0Ly9cblx0XHRcdHZhciByZXRyaWV2ZSA9IG9wdGlvbnMucmV0cmlldmUsXG5cdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdC8vXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0Ly9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0Ly9cblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2pzLWdyYXBoJywgJ2JsdWViaXJkJywgJy4vdHJhdmVyc2UtZGFnLmpzJywgJy4vbWlzYy5qcycsICcuL2RlbHRhLmpzJ10sIGZ1bmN0aW9uICgkLCBKc0dyYXBoLCBQLCB0cmF2ZXJzZSwgVSwgRGVsdGEpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiBQbHVnaW5IYW5kbGVyKCkge1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8vLyBQcml2YXRlIFZhcmlhYmxlcyAvLy8vXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvL1xuXHRcdC8vIGtlZXAgdHJhY2sgb2YgcGx1Z2lucyBhbmQgdGhlaXIgcGFydGlhbCBhcHBsaWNhdGlvbiBvcmRlclxuXHRcdC8vXG5cdFx0dmFyIF9wbHVnaW5zID0gbmV3IEpzR3JhcGgoKTtcblx0XHR2YXIgX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbiA9IHt9O1xuXHRcdHZhciBfZmVhdHVyZUNvbmZpZ3VyYXRpb25DYWNoZSA9IHt9O1xuXHRcdHZhciBfcGx1Z2luUHJlZGljYXRlcyA9IHt9O1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8vLyBQcml2YXRlIEZ1bmN0aW9ucyAvLy8vXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvL1xuXHRcdC8vIHRvIHByb2Nlc3MgYSBjb25kaXRpb24gZGlzanVuY3QgZm9yIGEgcGx1Z2luXG5cdFx0Ly9cblx0XHRmdW5jdGlvbiBfYWRkUGx1Z2luQ29uZGl0aW9uRGlzanVuY3QobmFtZSwgY29uZGl0aW9uKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gdG8gYWNjdW11bGF0ZSBjb25kaXRpb24gZGlzanVuY3RzIGludG8gcnVubmFibGUgcHJlZGljYXRlc1xuXHRcdFx0Ly9cblx0XHRcdGZ1bmN0aW9uIGFjY3VtdWxhdGUobGF6eUNvbmRpdGlvbikge1xuXHRcdFx0XHR2YXIgb2xkUHJlZGljYXRlID0gX3BsdWdpblByZWRpY2F0ZXNbbmFtZV07XG5cdFx0XHRcdF9wbHVnaW5QcmVkaWNhdGVzW25hbWVdID0gKGNvbnRleHQpID0+IHtcblx0XHRcdFx0XHRpZiAoX2ZlYXR1cmVDb25maWd1cmF0aW9uQ2FjaGVbbmFtZV0pIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdF9mZWF0dXJlQ29uZmlndXJhdGlvbkNhY2hlW25hbWVdID1cblx0XHRcdFx0XHRcdFx0KG9sZFByZWRpY2F0ZSAmJiBvbGRQcmVkaWNhdGUoY29udGV4dCkpIHx8XG5cdFx0XHRcdFx0XHRcdGxhenlDb25kaXRpb24oY29udGV4dCk7XG5cdFx0XHRcdFx0cmV0dXJuIF9mZWF0dXJlQ29uZmlndXJhdGlvbkNhY2hlW25hbWVdO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gaW50ZXJwcmV0IHRoZSBnaXZlbiBjb25kaXRpb24gYnkgdHlwZVxuXHRcdFx0Ly9cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGNvbmRpdGlvbikpIHsgLy8gZG8gbm90IGxvYWQgYSBwbHVnaW4gYnkgZGVmYXVsdFxuXHRcdFx0XHRhY2N1bXVsYXRlKCgpID0+IGZhbHNlKTtcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvbmRpdGlvbiA9PT0gJ3N0cmluZycpIHsgLy8gYSBwbHVnaW4gbmFtZVxuXHRcdFx0XHRhY2N1bXVsYXRlKCgpID0+IF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb25bY29uZGl0aW9uXSk7XG5cdFx0XHR9IGVsc2UgaWYgKCQuaXNBcnJheShjb25kaXRpb24pKSB7IC8vIGEgY29uanVuY3Rpb25cblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBjb25kaXRpb24uZXZlcnkoKGNvbmp1bmN0KSA9PiBfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uW2Nvbmp1bmN0XSkpO1xuXHRcdFx0fSBlbHNlIGlmICgkLmlzRnVuY3Rpb24oY29uZGl0aW9uKSkgeyAvLyBhIHByZWRpY2F0ZVxuXHRcdFx0XHRhY2N1bXVsYXRlKCgpID0+IGNvbmRpdGlvbihfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uKSk7XG5cdFx0XHR9IGVsc2UgeyAvLyBhIGxpdGVyYWwgQm9vbGVhbiB2YWx1ZVxuXHRcdFx0XHRhY2N1bXVsYXRlKCgpID0+ICEhY29uZGl0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIHRvIHByb2Nlc3MgYSBjb25kaXRpb24gZGlzanVuY3QgZm9yIGEgcGx1Z2luXG5cdFx0Ly9cblx0XHRmdW5jdGlvbiBfYWRkUGx1Z2luUmVxdWlyZW1lbnRzKHBsdWdpbk5hbWUsIG90aGVyUGx1Z2lucykge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3RoZXJQbHVnaW5zKSkgeyByZXR1cm4gfVxuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcGVyZm9ybSBzYW5pdHkgY2hlY2tzXG5cdFx0XHQvL1xuXHRcdFx0VS5hc3NlcnQoJC5pc0FycmF5KG90aGVyUGx1Z2lucyksXG5cdFx0XHRcdFx0YFRoZSAncmVxdWlyZXMnIGNsYXVzZSBvZiBhIHBsdWdpbiBzaG91bGQgYmUgYW4gYXJyYXkgb2YgcGx1Z2luIG5hbWVzLmApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWRkIHRoaXMgcGx1Z2luIGFzIGEgbG9hZGluZyBjb25kaXRpb24gZm9yIHRoZSBvdGhlciBzcGVjaWZpZWQgcGx1Z2luc1xuXHRcdFx0Ly9cblx0XHRcdG90aGVyUGx1Z2lucy5mb3JFYWNoKChvdGhlclBsdWdpbikgPT4ge1xuXHRcdFx0XHRfYWRkUGx1Z2luQ29uZGl0aW9uRGlzanVuY3Qob3RoZXJQbHVnaW4sIHBsdWdpbk5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8vLyBQdWJsaWMgTWV0aG9kcyAvLy8vXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvL1xuXHRcdC8vIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYnkgcGx1Z2luIHdyaXRlcnMsXG5cdFx0Ly8gY29udGFpbmluZyAocGFydCBvZikgYSBuZXcgcGx1Z2luIHRvIGJlIHJlZ2lzdGVyZWRcblx0XHQvL1xuXHRcdHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihwbHVnaW4pIHtcblx0XHRcdC8vXG5cdFx0XHQvLyBwZXJmb3JtIHNhbml0eSBjaGVja3Ncblx0XHRcdC8vXG5cdFx0XHRVLmFzc2VydCgkLmlzUGxhaW5PYmplY3QocGx1Z2luKSxcblx0XHRcdFx0XHRgQW4gQXBpTkFUT01ZIHBsdWdpbiBzaG91bGQgYmUgYSBwbGFpbiBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCh0eXBlb2YgcGx1Z2luLm5hbWUgPT09ICdzdHJpbmcnLFxuXHRcdFx0XHRcdGBBbiBBcGlOQVRPTVkgcGx1Z2luIHNob3VsZCBoYXZlIGEgbmFtZS5gKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwbHVnaW4gY29uZmlndXJhdGlvblxuXHRcdFx0Ly9cblx0XHRcdGlmICghJC5pc0FycmF5KHBsdWdpbi5hZnRlcikpIHsgcGx1Z2luLmFmdGVyID0gW10gfVxuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcHJvY2VzcyB0aGUgcGx1Z2luIGNvbmRpdGlvblxuXHRcdFx0Ly9cblx0XHRcdF9hZGRQbHVnaW5Db25kaXRpb25EaXNqdW5jdChwbHVnaW4ubmFtZSwgcGx1Z2luLmlmKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uLCBwbHVnaW4ubmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiBfcGx1Z2luUHJlZGljYXRlc1twbHVnaW4ubmFtZV0oX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbikgfVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBwcm9jZXNzIHRoZSBwbHVnaW4gcmVxdWlyZW1lbnRzXG5cdFx0XHQvL1xuXHRcdFx0X2FkZFBsdWdpblJlcXVpcmVtZW50cyhwbHVnaW4ubmFtZSwgcGx1Z2luLnJlcXVpcmUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmVnaXN0ZXIgdGhlIHBsdWdpblxuXHRcdFx0Ly9cblx0XHRcdF9wbHVnaW5zLmFkZFZlcnRleChwbHVnaW4ubmFtZSwgcGx1Z2luKTtcblx0XHRcdCQuZWFjaChwbHVnaW4uYWZ0ZXIsIChfXywgdikgPT4geyBfcGx1Z2lucy5jcmVhdGVFZGdlKHYsIHBsdWdpbi5uYW1lKSB9KTtcblx0XHRcdGlmIChfcGx1Z2lucy5oYXNDeWNsZSgpKSB7IHRocm93IG5ldyBFcnJvcihgVGhlIHBsdWdpbiBhcHBsaWNhdGlvbiBvcmRlciBoYXMgYSBjeWNsZS5gKSB9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBjcmVhdGUgdGhlIGRlbHRhIHRoYXQgZW1ib2RpZXMgdGhlIHBsdWdpblxuXHRcdFx0Ly9cblx0XHRcdHBsdWdpbi5kZWx0YSA9IG5ldyBEZWx0YShwbHVnaW4pO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0dXJuIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBhZGRpdGlvbmFsIG9wZXJhdGlvbnNcblx0XHRcdC8vXG5cdFx0XHRyZXR1cm4gcGx1Z2luLmRlbHRhO1xuXHRcdH07XG5cblx0XHQvL1xuXHRcdC8vIHNlbGVjdCB0aGUgcGx1Z2lucyB0byBiZSBlbmFibGVkXG5cdFx0Ly9cblx0XHR0aGlzLnNlbGVjdCA9IGZ1bmN0aW9uIHNlbGVjdChwbHVnaW5OYW1lcykge1xuXG5cdFx0XHQvLy8vIGFjY2VwdCBhbiBhcnJheSBvZiBwbHVnaW4gbmFtZXMsIHJhdGhlciB0aGFuIGp1c3Qgb25lIG5hbWVcblx0XHRcdGlmICgkLmlzQXJyYXkocGx1Z2luTmFtZXMpKSB7IHBsdWdpbk5hbWVzLmZvckVhY2goc2VsZWN0KSB9XG5cblx0XHRcdC8vLy8gcHJvY2VzcyBzaW5nbGUgcGx1Z2luIG5hbWUgYnkgbWFraW5nIGl0cyBjb25kaXRpb24gJ3RydWUnXG5cdFx0XHRfYWRkUGx1Z2luQ29uZGl0aW9uRGlzanVuY3QocGx1Z2luTmFtZXMsIHRydWUpO1xuXG5cdFx0fTtcblxuXHRcdC8vXG5cdFx0Ly8gYXBwbHkgYWxsIHJlbGV2YW50IHBsdWdpbnMgdG8gYSBnaXZlbiBvYmplY3Rcblx0XHQvL1xuXHRcdHRoaXMuYXBwbHkgPSBmdW5jdGlvbiBhcHBseShvYmopIHtcblx0XHRcdHJldHVybiBQLmFsbCh0cmF2ZXJzZShfcGx1Z2lucywgKHBsdWdpbk5hbWUsIHBsdWdpbikgPT4ge1xuXG5cdFx0XHRcdC8vLy8gaWYgdGhlIHBsdWdpbiBpcyBub3Qgc2VsZWN0ZWQsIHJldHVyblxuXHRcdFx0XHRpZiAoIV9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb25bcGx1Z2luTmFtZV0pIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvLy8vIGlmIHRoZSBwbHVnaW4gZG9lc24ndCBleGlzdCwgdGhyb3cgYW4gZXJyb3Jcblx0XHRcdFx0VS5hc3NlcnQocGx1Z2luLCBgSSBkb24ndCBrbm93IHRoZSAnJHtwbHVnaW5OYW1lfScgcGx1Z2luLmApO1xuXG5cdFx0XHRcdC8vLy8gYXBwbHkgdGhlIGRlbHRhLCBhbmQgcmV0dXJuIGEgcHJvbWlzZSBmb3IgaXQgdG8gYmUgZG9uZVxuXHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHBsdWdpbi5kZWx0YS5hcHBseShvYmopKTtcblxuXHRcdFx0fSkpO1xuXHRcdH07XG5cdH07XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvcGx1Z2luLWhhbmRsZXIuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbiAoUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHZhciByZXNvbHZlLCByZWplY3Q7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcblx0XHRcdHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRyZWplY3QgPSBhcmd1bWVudHNbMV07XG5cdFx0fSk7XG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG5cdFx0XHRyZWplY3Q6IHJlamVjdCxcblx0XHRcdHByb21pc2U6IHByb21pc2Vcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvZGVmZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnLi9kZWZlci5qcyddLCBmdW5jdGlvbiAoUCwgZGVmZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiB0cmF2ZXJzZURBRyhncmFwaCwgZm4pIHtcblx0XHQvL1xuXHRcdC8vIGtlZXBpbmcgdHJhY2sgb2YgdGhlIGRlZmVycmVkcyBvZiBhbGwgbm9kZXNcblx0XHQvL1xuXHRcdHZhciBub2RlRGVmZXJyZWRzID0ge307XG5cdFx0ZnVuY3Rpb24gbm9kZURlZmVycmVkKGlkKSB7XG5cdFx0XHRpZiAoIW5vZGVEZWZlcnJlZHNbaWRdKSB7IG5vZGVEZWZlcnJlZHNbaWRdID0gZGVmZXIoKSB9XG5cdFx0XHRyZXR1cm4gbm9kZURlZmVycmVkc1tpZF07XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBrZWVwaW5nIHRyYWNrIG9mIHRoZSBzb3VyY2VzIGFuZCBzaW5rc1xuXHRcdC8vXG5cdFx0dmFyIHNpbmtQcm9taXNlcyA9IFtdO1xuXG5cdFx0Ly9cblx0XHQvLyBjb25uZWN0IGFsbCB0aGUgcHJvbWlzZXNcblx0XHQvL1xuXHRcdGdyYXBoLmVhY2hWZXJ0ZXgoKGtleSwgdmFsKSA9PiB7XG5cdFx0XHR2YXIgcHJlZHMgPSBncmFwaC5wcmVkZWNlc3NvcnMoa2V5KTtcblx0XHRcdHZhciBzdWNjcyA9IGdyYXBoLnN1Y2Nlc3NvcnMoa2V5KTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRlc3QgZm9yIHNpbmstaG9vZFxuXHRcdFx0Ly9cblx0XHRcdGlmIChzdWNjcy5sZW5ndGggPT09IDApIHsgc2lua1Byb21pc2VzLnB1c2gobm9kZURlZmVycmVkKGtleSkucHJvbWlzZSkgfVxuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gc2V0IHVwIHByb21pc2UgdG8gcmVzb2x2ZSB3aGVuIHByZWRlY2Vzc29ycyBhcmUgZG9uZVxuXHRcdFx0Ly9cblx0XHRcdFAuYWxsKHByZWRzLm1hcCgocHJlZCkgPT4geyByZXR1cm4gbm9kZURlZmVycmVkKHByZWQpLnByb21pc2UgfSkpLnRoZW4oKHByZWRSZXN1bHRzKSA9PiB7XG5cdFx0XHRcdG5vZGVEZWZlcnJlZChrZXkpLnJlc29sdmUoZm4oa2V5LCB2YWwsIHByZWRSZXN1bHRzKSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gcmV0dXJuIHByb21pc2VzIG9mIHRoZSBzaW5rIG5vZGUgcmVzdWx0c1xuXHRcdC8vXG5cdFx0cmV0dXJuIHNpbmtQcm9taXNlcztcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3RyYXZlcnNlLWRhZy5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdqcy1ncmFwaCcsICdibHVlYmlyZCcsICcuL3RyYXZlcnNlLWRhZy5qcycsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIEpzR3JhcGgsIFAsIHRyYXZlcnNlLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyBBY2N1bXVsYXRlZCBkYXRhIGZvciB0aGUgYXZhaWxhYmxlIGRlbHRhIG9wZXJhdGlvbiB0eXBlc1xuXHQvL1xuXHR2YXIgb3BUeXBlcyA9IHt9OyAgICAvLyB0aGUgbmFtZSBhbmQgZGVsdGEgY2xhc3Nlc1xuXHR2YXIgY29tcG9zZUZucyA9IFtdOyAvLyB0aGUgY2FzZSBkaXN0aW5jdGlvbnMgb2YgZGVsdGEgY29tcG9zaXRpb25cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIGZ1bGx5IGRlZmluZSBhIG5ldyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHQvL1xuXHRmdW5jdGlvbiBhZGRPcGVyYXRpb25UeXBlKHtuYW1lLCBjb25zdHJ1Y3RvcjogY29uc3RydWN0b3JGbiwgYXBwbHk6IGFwcGx5Rm4sIHByb3RvdHlwZSwgbWV0aG9kfSkge1xuXG5cdFx0Ly9cblx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0Ly9cblx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXHRcdGlmIChVLmlzRGVmaW5lZChtZXRob2QpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0V2l0aE1ldGhvZCwgbmFtZSwge1xuXHRcdFx0XHR2YWx1ZTogbWV0aG9kXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdFdpdGhNZXRob2QsIG5hbWUsIHtcblx0XHRcdFx0dmFsdWUocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihvcFR5cGVzW25hbWVdLCBwcm9wZXJ0eSwgdmFsdWVzKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBkZWZpbmUgdGhlIERlbHRhIGNsYXNzXG5cdFx0Ly9cblx0XHRvcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdERlbHRhOiBjb25zdHJ1Y3RvckZuLFxuXHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0fTtcblx0XHQkLmV4dGVuZChvcFR5cGVzW25hbWVdLkRlbHRhLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3RvcjogY29uc3RydWN0b3JGbixcblx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRhcHBseTogYXBwbHlGbixcblx0XHRcdGNvbXBvc2UocHJvcGVydHksIG9wMikge1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcDIpKSB7IHJldHVybiB0aGlzIH1cblx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRjb21wb3NlRm5zLnNvbWUoKHtvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm59KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMudHlwZSA9PT0gb3AxVHlwZSAmJiBvcDIudHlwZSA9PT0gb3AyVHlwZSkge1xuXHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4gPSBjb21wb3NlRm47XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoZm91bmRDb21wb3NlRm4pIHtcblx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbih0aGlzLCBwcm9wZXJ0eSwgb3AyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRgWW91IGNhbm5vdCBmb2xsb3cgYSAnJHt0aGlzLnR5cGV9JyBvcGVyYXRpb24gYCArXG5cdFx0XHRcdFx0XHRcdGB3aXRoIGEgJyR7b3AyLnR5cGV9JyBvcGVyYXRpb24gb24gdGhlIHNhbWUgcHJvcGVydHkuYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0ZXJyLm9wMSA9IHRoaXMudHlwZTtcblx0XHRcdFx0XHRlcnIub3AyID0gb3AyLnR5cGU7XG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIG1ha2UgdGhlIG9wZXJhdGlvbiBtZXRob2QgYXZhaWxhYmxlIG9uIHRoZSAnbW9kaWZ5JyBkZWx0YSAoYXNzdW1lcyB0aGF0ICdtb2RpZnknIGlzIGRlZmluZWQgZmlyc3QpXG5cdFx0Ly9cblx0XHRvcFR5cGVzWydtb2RpZnknXS5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPSBvcFR5cGVzW25hbWVdLm1ldGhvZDtcblx0fVxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gYWRkIG5ldyB2YWxpZCBjYXNlIGRpc3RpbmN0aW9ucyBmb3IgZGVsdGEgY29tcG9zaXRpb25cblx0Ly9cblx0ZnVuY3Rpb24gYWRkQ29tcG9zaXRpb25SdWxlKG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbikge1xuXHRcdGNvbXBvc2VGbnMucHVzaCh7IG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbiB9KTtcblx0fVxuXHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdHZhciBrZWVwU2Vjb25kID0gKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IGQyIH07XG5cblx0Ly9cblx0Ly8gdGhlIG1vZGlmeSBvcGVyYXRpb24gKE1VU1QgQkUgVEhFIEZJUlNUIE9QRVJBVElPTiBUWVBFIFRPIEJFIERFRklORUQpXG5cdC8vXG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdtb2RpZnknLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBNb2RpZnkoZGVsdGFEZXNjcmlwdGlvbiwgb3BlcmF0aW9ucykge1xuXHRcdFx0ZGVsdGFEZXNjcmlwdGlvbiA9IGRlbHRhRGVzY3JpcHRpb24gfHwge307XG5cdFx0XHR0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zIHx8IHt9O1xuXHRcdFx0Ly9cblx0XHRcdC8vIHByb2Nlc3MgcG9zc2libGUgZGVsdGEgZGVzY3JpcHRpb25cblx0XHRcdC8vXG5cdFx0XHQkLmVhY2goZGVsdGFEZXNjcmlwdGlvbiwgKGtleSwgdmFsdWUpID0+IHtcblx0XHRcdFx0dmFyIG1hdGNoID0ga2V5Lm1hdGNoKC9eKFxcdyspXFxzKyhbXFx3XFwuXSspJC8pO1xuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHR2YXIgb3BlcmF0aW9uID0gbWF0Y2hbMV07XG5cdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gbWF0Y2hbMl07XG5cdFx0XHRcdFx0VS5hc3NlcnQob3BlcmF0aW9uIGluIG9wVHlwZXMsXG5cdFx0XHRcdFx0XHRcdGBJIGRvbid0IGtub3cgdGhlICcke29wZXJhdGlvbn0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0XHR0aGlzW29wZXJhdGlvbl0ocHJvcGVydHksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRhcHBseShvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcGVydHkpKSB7XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9ialtwcm9wZXJ0eV1gXG5cdFx0XHRcdC8vXG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseShvYmpbcHJvcGVydHldLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0Ly9cblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqKSxcblx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHkob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcGVydHksIHZhbHVlcykge1xuXHRcdFx0XHR2YXIgZG90SW5kZXggPSBwcm9wZXJ0eS5pbmRleE9mKCcuJyk7XG5cdFx0XHRcdGlmIChkb3RJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIGRvdC1zZXBhcmF0ZWQgcGF0aDsgcmVjdXJzaXZlbHkgY3JlYXRlIGEgbW9kaWZ5LWNoYWluXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHR2YXIgYWN0dWFsUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZSgwLCBkb3RJbmRleCk7XG5cdFx0XHRcdFx0dmFyIHJlc3RPZlByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoZG90SW5kZXgrMSk7XG5cdFx0XHRcdFx0dmFyIG5ld01vZGlmeURlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZXNbJ21vZGlmeSddLCBhY3R1YWxQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0cmV0dXJuIG5ld01vZGlmeURlbHRhW29wVHlwZS5uYW1lXS5hcHBseShuZXdNb2RpZnlEZWx0YSwgW3Jlc3RPZlByb3BlcnR5XS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBzaW5nbGUgbmFtZTsgYWRkIHRoZSBuZXcgZGVsdGEgZGlyZWN0bHlcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IFUuYXBwbHlDb25zdHJ1Y3RvcihvcFR5cGUuRGVsdGEsIHZhbHVlcyk7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3BlcmF0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiYgVS5pc0RlZmluZWQodGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XSkpIHtcblx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShwcm9wZXJ0eSwgbmV3RGVsdGEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldID0gbmV3RGVsdGE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRtZXRob2QocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb24pIHtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24ob3BUeXBlc1snbW9kaWZ5J10sIHByb3BlcnR5LCBbZGVsdGFEZXNjcmlwdGlvbl0pO1xuXHRcdH1cblx0fSk7XG5cblx0Ly9cblx0Ly8gdGhlIG90aGVyIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHQvL1xuXHRhZGRPcGVyYXRpb25UeXBlKHtcblx0XHRuYW1lOiAnYWRkJyxcblx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWRkKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0YFRoZSAnYWRkJyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gZmlyc3QgYmUgdW5kZWZpbmVkLmApO1xuXHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0fVxuXHR9KTtcblx0YWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0bmFtZTogJ3JlcGxhY2UnLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZXBsYWNlKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdGBUaGUgJ3JlcGxhY2UnIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHR9XG5cdH0pO1xuXHRhZGRPcGVyYXRpb25UeXBlKHtcblx0XHRuYW1lOiAncmVtb3ZlJyxcblx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gUmVtb3ZlKCkge30sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0YFRoZSAncmVtb3ZlJyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gZmlyc3QgYmUgZGVmaW5lZC5gKTtcblx0XHRcdGRlbGV0ZSBvYmpbcHJvcGVydHldO1xuXHRcdH1cblx0fSk7XG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdmb3JiaWQnLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBGb3JiaWQoKSB7fSxcblx0XHRhcHBseShvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdGBUaGUgJ2ZvcmJpZCcgb3BlcmF0aW9uIHJlcXVpcmVzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvL1xuXHQvLyBjb21wb3NpdGlvbiBvZiB0aGUgc3RhbmRhcmQgb3BlcmF0aW9uIHR5cGVzXG5cdC8vXG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlcGxhY2UnLCAgICAgKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IG5ldyBvcFR5cGVzWydhZGQnXS5EZWx0YShkMi52YWx1ZSkgfSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ21vZGlmeScsICAgICAgKGQxLCBwLCBkMikgPT4geyBkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJykgfSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlbW92ZScsICAgICAgKGQxLCBwKSAgICAgPT4geyBkMVtwXSA9IG5ldyBvcFR5cGVzWydmb3JiaWQnXS5EZWx0YSgpIH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnbW9kaWZ5JywgIChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpIH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVtb3ZlJywgIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdyZXBsYWNlJywgIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdtb2RpZnknLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0T2JqZWN0LmtleXMoZDIub3BlcmF0aW9ucykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5vcGVyYXRpb25zW3Byb3BdKTtcblx0XHR9KTtcblx0fSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdhZGQnLCAgICAoZDEsIHAsIGQyKSA9PiB7IGQxW3BdID0gbmV3IG9wVHlwZXNbJ3JlcGxhY2UnXS5EZWx0YShkMi52YWx1ZSkgfSk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2FkZCcsICAgIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2ZvcmJpZCcsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXG5cblx0Ly9cblx0Ly8gaW5zZXJ0IG9wZXJhdGlvbiB0eXBlXG5cdC8vXG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdpbnNlcnQnLFxuXHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBJbnNlcnQodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0YXBwbHkob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0VS5hc3NlcnQoJC5pc0Z1bmN0aW9uKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdpbnNlcnQnIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHR2YXIgcGFydFR3byA9IHRoaXMudmFsdWU7XG5cdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdpbnNlcnQnLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2luc2VydCcsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDFbcF0gPSBuZXcgb3BUeXBlc1snZm9yYmlkJ10uRGVsdGEoKSB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnaW5zZXJ0JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihkMVtwXS52YWx1ZSksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdpbnNlcnQnIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJyk7XG5cdH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnaW5zZXJ0JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihkMVtwXS52YWx1ZSksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdpbnNlcnQnIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJyk7XG5cdH0pO1xuXG5cblx0Ly9cblx0Ly8gaW5zZXJ0IG9wZXJhdGlvbiB0eXBlXG5cdC8vXG5cdGFkZE9wZXJhdGlvblR5cGUoe1xuXHRcdG5hbWU6ICdhZnRlcicsXG5cdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFmdGVyKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdGFwcGx5KG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWZ0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHR2YXIgcGFydFR3byA9IHRoaXMudmFsdWU7XG5cdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZShwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gcGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdGFkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVtb3ZlJywgIGtlZXBTZWNvbmQpO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRVLmFzc2VydCgkLmlzRnVuY3Rpb24oZDFbcF0udmFsdWUpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnYWZ0ZXInIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24uYCk7XG5cdFx0ZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpO1xuXHR9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFUuYXNzZXJ0KCQuaXNGdW5jdGlvbihkMVtwXS52YWx1ZSksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdhZnRlcicgZXhwZWN0cyB0aGUgcHJvcGVydHkgaXQgYWN0cyBvbiB0byBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbi5gKTtcblx0XHRkMi5hcHBseShkMVtwXSwgJ3ZhbHVlJyk7XG5cdH0pO1xuXHRhZGRDb21wb3NpdGlvblJ1bGUoJ2luc2VydCcsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHkoZDFbcF0sICd2YWx1ZScpOyB9KTtcblx0YWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdpbnNlcnQnLCAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5KGQxW3BdLCAndmFsdWUnKTsgfSk7XG5cblx0Ly8gVE9ETzogdGhlIGFib3ZlIGNvbXBvc2l0aW9ucyBvZiAnaW5zZXJ0JyBhbmQgJ2FmdGVyJyBhcmUgbm90IGFjdHVhbGx5XG5cdC8vICAgICA6IGNvcnJlY3Q7IG5vdCBhc3NvY2lhdGl2ZSwgaW4gZmFjdC4gUmF0aGVyIHRoYW4gY29sbGFwc2luZyB0aGVtXG5cdC8vICAgICA6IGF0IHRoaXMgc3RhZ2UsIGEgbGlzdCBvZiBvcGVyYXRpb25zIHNob3VsZCBiZSBrZXB0LlxuXG5cdC8vXG5cdC8vIHJldHVybiB0aGUgbW9kaWZ5IGRlbHRhIGNsYXNzXG5cdC8vXG5cdHJldHVybiBvcFR5cGVzWydtb2RpZnknXS5EZWx0YTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlbHRhLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiY2lyY3VpdGJvYXJkLmpzIn0=