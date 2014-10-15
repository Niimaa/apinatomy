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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, amyWidget) {
	  'use strict';
	  amyWidget('circuitboard', 'circuitboard', {
	    cssClass: "circuitboard",
	    filter: (function() {
	      return P.resolve(true);
	    }),
	    model: null
	  });
	  amyWidget('tilemap', 'tilemap', {
	    cssClass: "tilemap",
	    model: null,
	    _circuitboard: null
	  });
	  amyWidget('tile', 'tile', {
	    cssClass: 'tile',
	    model: null,
	    _circuitboard: null
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U) {
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
	  function defineHierarchyMethods(obj) {
	    Object.defineProperty(obj, 'type', {
	      set: function(type) {
	        this._artefactType = type;
	      },
	      get: function() {
	        return this._artefactType;
	      }
	    });
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
	  return function amyWidget(name, pluginHandle, optionDefaults) {
	    var _prototypeP = null;
	    function prototypeP() {
	      if (!_prototypeP) {
	        var objPrototype = {};
	        _prototypeP = P.all($.circuitboard.plugin._apply(pluginHandle, objPrototype)).return(objPrototype).tap(defineDefaultProperties).tap(defineHierarchyMethods).tap((function(obj) {
	          obj.type = name;
	        }));
	      }
	      return _prototypeP;
	    }
	    $.fn[name] = function(options) {
	      var $__0 = this;
	      if (options === 'instance') {
	        return this.data(("-amy-" + name));
	      }
	      this.data(("-amy-" + name), prototypeP().then((function(prototype) {
	        var obj = Object.create(prototype);
	        $.extend(obj, {
	          options: $.extend({}, optionDefaults, options),
	          element: $__0,
	          destroy: function() {
	            obj.trigger('destroy');
	          }
	        });
	        enableSignalHandling(obj);
	        obj.element.addClass(obj.options.cssClass);
	        obj.element.one('remove', (function() {
	          obj.destroy();
	        }));
	        if (obj.options.parent) {
	          obj.parent = obj.options.parent;
	        }
	        obj.circuitboard = obj.closestAncestorByType('circuitboard');
	        if ($.isFunction(obj.constructor)) {
	          obj.constructor.call(obj);
	        }
	        return obj;
	      })));
	      return this;
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, PluginHandler) {
	  'use strict';
	  var pluginHandler = new PluginHandler();
	  if (!$.circuitboard) {
	    $.circuitboard = {};
	  }
	  $.circuitboard.plugin = pluginHandler.register.bind(pluginHandler);
	  $.circuitboard.plugin._apply = pluginHandler.apply.bind(pluginHandler);
	  ($.circuitboard.prematurePlugins || []).forEach($.circuitboard.plugin);
	  delete $.circuitboard.prematurePlugins;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(2), __webpack_require__(8), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, JsGraph, P, traverse, U) {
	  'use strict';
	  function processOperations(obj) {
	    var result = {};
	    $.each(obj, (function(key, value) {
	      var match = key.match(/^(\w+)\s+(\w+)$/);
	      if (match) {
	        result[match[2]] = {
	          operation: match[1],
	          value: value
	        };
	      }
	    }));
	    return result;
	  }
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
	    function _registerSinglePlugin(plugin) {
	      U.assert(typeof plugin.name === 'string', "An ApiNATOMY plugin should have a name.");
	      if (!$.isArray(plugin.after)) {
	        plugin.after = [];
	      }
	      _addPluginConditionDisjunct(plugin.name, plugin.if);
	      Object.defineProperty(_dynamicFeatureConfiguration, plugin.name, {get: function() {
	          return _pluginPredicates[plugin.name](_dynamicFeatureConfiguration);
	        }});
	      _plugins.addVertex(plugin.name, plugin);
	      $.each(plugin.after, (function(__, v) {
	        _plugins.createEdge(v, plugin.name);
	      }));
	      try {
	        _plugins.topologically((function() {}));
	      } catch (cycleError) {
	        throw new Error(("The plugin application order has a cycle: " + cycleError.cycle));
	      }
	      plugin._operations = processOperations(plugin);
	    }
	    this.register = function register(plugin) {
	      var $__0 = this;
	      if ($.isArray(plugin)) {
	        $.each(plugin, (function(__, subConfig) {
	          $__0.register(subConfig);
	        }));
	      } else if ($.isPlainObject(plugin)) {
	        _registerSinglePlugin(plugin);
	      } else if (typeof plugin === 'string') {
	        _addPluginConditionDisjunct(plugin, true);
	      }
	    };
	    this.apply = function apply(component, obj) {
	      return traverse(_plugins, (function(pluginName, plugin) {
	        if (!plugin) {
	          throw new Error(("I don't know the '" + pluginName + "' plugin."));
	        }
	        if (!_dynamicFeatureConfiguration[pluginName]) {
	          return;
	        }
	        var op = plugin._operations[component];
	        if (!op) {
	          return;
	        }
	        U.assert(op.operation === 'modify', ("Any top-level operation on '" + component + "' must be 'modify'."));
	        var subOps = processOperations(op.value);
	        $.each(subOps, (function(field, subOp) {
	          switch (subOp.operation) {
	            case 'add':
	              {
	                U.assert(U.isUndefined(obj[field]), ("The operation 'add " + field + "' expects " + component + "." + field + " to first be undefined."));
	                obj[field] = subOp.value;
	              }
	              break;
	            case 'remove':
	              {
	                U.assert(U.isDefined(obj[field]), ("The operation 'remove " + field + "' expects " + component + "." + field + " to first be defined."));
	                delete obj[field];
	              }
	              break;
	            case 'replace':
	              {
	                U.assert(U.isDefined(obj[field]), ("The operation 'replace " + field + "' expects " + component + "." + field + " to first be defined."));
	                obj[field] = subOp.value;
	              }
	              break;
	            case 'insert':
	              {
	                U.assert(U.isUndefined(obj[field]) || $.isFunction(obj[field]), ("The operation 'insert " + field + "' expects " + component + "." + field + " to be undefined or a function."));
	                var restOfFunction = obj[field];
	                obj[field] = function() {
	                  for (var args = [],
	                      $__1 = 0; $__1 < arguments.length; $__1++)
	                    args[$__1] = arguments[$__1];
	                  restOfFunction.apply(this, args);
	                  return subOp.value.apply(this, args);
	                };
	              }
	              break;
	            case 'after':
	              {
	                U.assert(U.isUndefined(obj[field]) || $.isFunction(obj[field]), ("The operation 'after " + field + "' expects " + component + "." + field + " to be undefined or a function."));
	                var beforeFunction = obj[field];
	                obj[field] = function() {
	                  for (var args = [],
	                      $__2 = 0; $__2 < arguments.length; $__2++)
	                    args[$__2] = arguments[$__2];
	                  return P.resolve(beforeFunction.apply(this, args)).then(function(promiseValue) {
	                    return subOp.value.apply(this, [promiseValue].concat(args));
	                  }.bind(this));
	                };
	              }
	              break;
	          }
	        }));
	      }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, defer) {
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
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMTc5MjgxNDBhYzE5ZTZmYTczOSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktY2lyY3VpdGJvYXJkLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy8uLi9hbXktdXRpbC93aWRnZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9hbXktdXRpbC9hbXktY2ItcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL3BsdWdpbi1oYW5kbGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn0iLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL3RyYXZlcnNlLWRhZy5qcyIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvZGVmZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUMsQ0FBQyxTQUFTLENBQUU7QUFDOUIsYUFBTSxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7QUFDdEIsWUFBSyxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0FBRUYsVUFBTztBQUNOLGFBQU0sQ0FBRyxRQUFNO0FBQ2YsWUFBSyxDQUFHLE9BQUs7QUFDYixhQUFNLENBQUcsUUFBTTtBQUFBLEtBQ2hCLENBQUM7R0FDRixDQUFDO0FBRUYsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImpzLWdyYXBoXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJKc0dyYXBoXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkMTc5MjgxNDBhYzE5ZTZmYTczOVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi9hbXktdXRpbC93aWRnZXQuanMnLFxuXHQnLi9hbXktdXRpbC9hbXktY2ItcGx1Z2lucy5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBhbXlXaWRnZXQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgdGhlIHRocmVlIHR5cGVzIG9mIHdpZGdldDpcblx0Ly8gY2lyY3VpdGJvYXJkLCB0aWxlbWFwIGFuZCB0aWxlXG5cdC8vIE5PVEU6IHRoZXNlIG5lZWQgdG8gYmUgZXh0ZW5kZWQgYnkgcGx1Z2luc1xuXHQvL1xuXHRhbXlXaWRnZXQoJ2NpcmN1aXRib2FyZCcsICdjaXJjdWl0Ym9hcmQnLCB7XG5cdFx0Y3NzQ2xhc3M6IFwiY2lyY3VpdGJvYXJkXCIsXG5cdFx0ZmlsdGVyOiAoKT0+UC5yZXNvbHZlKHRydWUpLFxuXHRcdG1vZGVsOiBudWxsXG5cdH0pO1xuXHRhbXlXaWRnZXQoJ3RpbGVtYXAnLCAndGlsZW1hcCcsIHtcblx0XHRjc3NDbGFzczogXCJ0aWxlbWFwXCIsXG5cdFx0bW9kZWw6IG51bGwsXG5cdFx0X2NpcmN1aXRib2FyZDogbnVsbFxuXHR9KTtcblx0YW15V2lkZ2V0KCd0aWxlJywgJ3RpbGUnLCB7XG5cdFx0Y3NzQ2xhc3M6ICd0aWxlJyxcblx0XHRtb2RlbDogbnVsbCxcblx0XHRfY2lyY3VpdGJvYXJkOiBudWxsXG5cdH0pO1xuXG5cdC8vXG5cdC8vIHJldHVybiB0aGUgc3RhdGljIGAkLmNpcmN1aXRib2FyZGAgb2JqZWN0LFxuXHQvLyB0aHJvdWdoIHdoaWNoIHBsdWdpbnMgY2FuIGJlIGFwcGxpZWQgYW5kIHNlbGVjdGVkXG5cdC8vXG5cdHJldHVybiAkLmNpcmN1aXRib2FyZDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2FteS1jaXJjdWl0Ym9hcmQuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoJCwgUCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBhZGQgc2lnbmFsIGhhbmRsaW5nIG1ldGhvZHMgdG8gYW4gb2JqZWN0XG5cdC8vXG5cdGZ1bmN0aW9uIGVuYWJsZVNpZ25hbEhhbmRsaW5nKG9iaikge1xuXHRcdHZhciBfY2FsbGJhY2tzID0ge307XG5cdFx0ZnVuY3Rpb24gX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpIHtcblx0XHRcdGlmICghX2NhbGxiYWNrc1tzaWduYWxdKSB7XG5cdFx0XHRcdF9jYWxsYmFja3Nbc2lnbmFsXSA9ICQuQ2FsbGJhY2tzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX2NhbGxiYWNrc1tzaWduYWxdO1xuXHRcdH1cblx0XHQkLmV4dGVuZChvYmosIHtcblx0XHRcdG9uKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLmFkZChmbikgfSxcblx0XHRcdG9mZihzaWduYWwsIGZuKSB7IF9zaWduYWxDYWxsYmFja3Moc2lnbmFsKS5yZW1vdmUoZm4pIH0sXG5cdFx0XHRvbmUoc2lnbmFsLCBmbikge1xuXHRcdFx0XHR2YXIgcGFkZGVkRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0Zm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblx0XHRcdFx0XHR0aGlzLm9mZihzaWduYWwsIHBhZGRlZEZuKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy5vbihzaWduYWwsIHBhZGRlZEZuKTtcblx0XHRcdH0sXG5cdFx0XHRvbmNlKHNpZ25hbCwgZm4pIHsgdGhpcy5vbmUoc2lnbmFsLCBmbikgfSxcblx0XHRcdHRyaWdnZXIoc2lnbmFsLCAuLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBjYWxsYmFja3MgPSBfY2FsbGJhY2tzW3NpZ25hbF07XG5cdFx0XHRcdGlmIChjYWxsYmFja3MpIHsgY2FsbGJhY2tzLmZpcmVXaXRoKHRoaXMsIGFyZ3MpIH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gaW1wbGVtZW50IGFydGVmYWN0IGhpZXJhcmNoeSBtZXRob2RzXG5cdC8vXG5cdGZ1bmN0aW9uIGRlZmluZUhpZXJhcmNoeU1ldGhvZHMob2JqKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ3R5cGUnLCB7XG5cdFx0XHRzZXQodHlwZSkgeyB0aGlzLl9hcnRlZmFjdFR5cGUgPSB0eXBlIH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl9hcnRlZmFjdFR5cGUgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdwYXJlbnQnLCB7XG5cdFx0XHRzZXQocGFyZW50KSB7XG5cdFx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdFx0VS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuXHRcdFx0fSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ2NoaWxkcmVuJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfVxuXHRcdH0pO1xuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0KHRoaXMuY2hpbGRyZW4gfHwgW10pLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIG1ha2Ugc29tZSBpbXBvcnRhbnQgcmVmZXJlbmNlcyB0aGF0IGFyZSBwYXJ0XG5cdC8vIG9mIHRoZSBvcHRpb25zIHByb3BlcnR5IGF2YWlsYWJsZSBpbiB0aGUgb2JqZWN0IGl0c2VsZlxuXHQvL1xuXHRmdW5jdGlvbiBkZWZpbmVEZWZhdWx0UHJvcGVydGllcyhvYmopIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbW9kZWwnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KVxuXHQvLyBhcyBhIGpRdWVyeSBlbGVtZW50IHBsdWdpbjsgdGhpcyBpcyByZXR1cm5lZCBmcm9tIHRoZSBtb2R1bGVcblx0Ly9cblx0cmV0dXJuIGZ1bmN0aW9uIGFteVdpZGdldChuYW1lLCBwbHVnaW5IYW5kbGUsIG9wdGlvbkRlZmF1bHRzKSB7XG5cblx0XHQvL1xuXHRcdC8vIGEgd2F5IHRvIGxhemlseSBhcHBseSB0aGUgcGx1Z2lucyB0byBhbiBlbXB0eSBwcm90b3R5cGUgKE9OQ0UpLFxuXHRcdC8vIGFwcGx5IHNvbWUgc3RhbmRhcmQgdXRpbGl0eSBwcm9wZXJ0aWVzIHRvIGl0IChPTkNFKSxcblx0XHQvLyBhbmQgZ2V0IHRoZSBwcm9taXNlIG9mIHRoZSBwcm90b3R5cGUgb2JqZWN0IGJhY2tcblx0XHQvL1xuXHRcdHZhciBfcHJvdG90eXBlUCA9IG51bGw7XG5cdFx0ZnVuY3Rpb24gcHJvdG90eXBlUCgpIHtcblx0XHRcdGlmICghX3Byb3RvdHlwZVApIHtcblx0XHRcdFx0dmFyIG9ialByb3RvdHlwZSA9IHt9O1xuXHRcdFx0XHRfcHJvdG90eXBlUCA9IFBcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC8vIGF3YWl0IHRoZSBhcHBsaWNhdGlvbiBvZiBhbGwgc2VsZWN0ZWQgcGx1Z2lucyB0byB0aGUgcHJvdG90eXBlXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQuYWxsKCQuY2lyY3VpdGJvYXJkLnBsdWdpbi5fYXBwbHkocGx1Z2luSGFuZGxlLCBvYmpQcm90b3R5cGUpKVxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gcmV0dXJuIHRoZSBwcm90b3R5cGUgZnJvbSB0aGUgcHJvbWlzZVxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0LnJldHVybihvYmpQcm90b3R5cGUpXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBkZWZpbmUgZGVmYXVsdCBwcm9wZXJ0aWVzIGluIHRoZSBwcm90b3R5cGVcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC50YXAoZGVmaW5lRGVmYXVsdFByb3BlcnRpZXMpXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBkZWZpbmUgbWV0aG9kcyB0byBtYW5hZ2UgYXJ0ZWZhY3QgaGllcmFyY2h5XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQudGFwKGRlZmluZUhpZXJhcmNoeU1ldGhvZHMpXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyByZWdpc3RlciB0aGUgdHlwZVxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0LnRhcCgob2JqKSA9PiB7IG9iai50eXBlID0gbmFtZSB9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfcHJvdG90eXBlUDtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIG5vdyBkZWZpbmUgdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiBhcyBhIGpRdWVyeSBwbHVnaW5cblx0XHQvL1xuXHRcdCQuZm5bbmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIGlmIHRoZSB3b3JkICdpbnN0YW5jZScgaXMgcGFzc2VkLCByZXR1cm4gdGhlIChhbHJlYWR5IGNyZWF0ZWQpIHdpZGdldFxuXHRcdFx0Ly9cblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtuYW1lfWApIH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIGVsc2UsIGNyZWF0ZSBhIG5ldyB3aWRnZXQgYmFzZWQgb24gdGhlIHByb3RvdHlwZVxuXHRcdFx0Ly8gYW5kIHJldHVybiBhIHByb21pc2UgdG8gaXRcblx0XHRcdC8vXG5cdFx0XHR0aGlzLmRhdGEoYC1hbXktJHtuYW1lfWAsIHByb3RvdHlwZVAoKS50aGVuKChwcm90b3R5cGUpID0+IHtcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gY3JlYXRlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRpbGVcblx0XHRcdFx0Ly9cblx0XHRcdFx0dmFyIG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblx0XHRcdFx0JC5leHRlbmQob2JqLCB7XG5cdFx0XHRcdFx0b3B0aW9uczogJC5leHRlbmQoe30sIG9wdGlvbkRlZmF1bHRzLCBvcHRpb25zKSxcblx0XHRcdFx0XHRlbGVtZW50OiB0aGlzLFxuXHRcdFx0XHRcdGRlc3Ryb3koKSB7IG9iai50cmlnZ2VyKCdkZXN0cm95JykgfVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBhZGQgc2lnbmFsLWhhbmRsaW5nIG1ldGhvZHMgdG8gdGhlIG9iamVjdFxuXHRcdFx0XHQvL1xuXHRcdFx0XHRlbmFibGVTaWduYWxIYW5kbGluZyhvYmopO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHNldCB0aGUgZWxlbWVudCBjbGFzc1xuXHRcdFx0XHQvL1xuXHRcdFx0XHRvYmouZWxlbWVudC5hZGRDbGFzcyhvYmoub3B0aW9ucy5jc3NDbGFzcyk7XG5cdFx0XHRcdG9iai5lbGVtZW50Lm9uZSgncmVtb3ZlJywgKCkgPT4geyBvYmouZGVzdHJveSgpIH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGNvbm5lY3QgdG8gdGhlIHBhcmVudCBhcnRlZmFjdFxuXHRcdFx0XHQvL1xuXHRcdFx0XHRpZiAob2JqLm9wdGlvbnMucGFyZW50KSB7XG5cdFx0XHRcdFx0b2JqLnBhcmVudCA9IG9iai5vcHRpb25zLnBhcmVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGNhY2hlIGEgcmVmZXJlbmNlIHRvIHRoZSBjaXJjdWl0Ym9hcmQgKGl0IGlzIHVzZWQgb2Z0ZW4pXG5cdFx0XHRcdC8vXG5cdFx0XHRcdG9iai5jaXJjdWl0Ym9hcmQgPSBvYmouY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdjaXJjdWl0Ym9hcmQnKTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBpZiBwcmVzZW50LCBydW4gdGhlIGNvbnN0cnVjdG9yIG1ldGhvZFxuXHRcdFx0XHQvL1xuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKG9iai5jb25zdHJ1Y3RvcikpIHsgb2JqLmNvbnN0cnVjdG9yLmNhbGwob2JqKTsgfVxuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHJldHVybiB0aGUgd2lkZ2V0IG9iamVjdCBmcm9tIHRoZSBwcm9taXNlXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHJldHVybiBvYmo7XG5cdFx0XHR9KSk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vYW15LXV0aWwvd2lkZ2V0LmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL3BsdWdpbi1oYW5kbGVyLmpzJ10sIGZ1bmN0aW9uICgkLCBQbHVnaW5IYW5kbGVyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyBsZXQgJyQuY2lyY3VpdGJvYXJkJyBhY2NlcHQgcGx1Z2luc1xuXHQvL1xuXHR2YXIgcGx1Z2luSGFuZGxlciA9IG5ldyBQbHVnaW5IYW5kbGVyKCk7XG5cdGlmICghJC5jaXJjdWl0Ym9hcmQpIHsgJC5jaXJjdWl0Ym9hcmQgPSB7fSB9XG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbiA9IHBsdWdpbkhhbmRsZXIucmVnaXN0ZXIuYmluZChwbHVnaW5IYW5kbGVyKTtcblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luLl9hcHBseSA9IHBsdWdpbkhhbmRsZXIuYXBwbHkuYmluZChwbHVnaW5IYW5kbGVyKTtcblxuXHQvL1xuXHQvLyBmZXRjaCBwbHVnaW5zIHRoYXQgd2VyZSBhbHJlYWR5IGxvYWRlZCBhbmQgcmVnaXN0ZXIgdGhlbVxuXHQvL1xuXHQoJC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucyB8fCBbXSkuZm9yRWFjaCgkLmNpcmN1aXRib2FyZC5wbHVnaW4pO1xuXHRkZWxldGUgJC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucztcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9hbXktY2ItcGx1Z2lucy5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGVxdWFsaXR5IHdpdGggYSB0b2xlcmFuY2Ugb2YgZXBzaWxvblxuXHRcdC8vXG5cdFx0YXBwcm94OiBmdW5jdGlvbiAodmFsMSwgdmFsMiwgZXBzaWxvbikge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZXBzaWxvbikpIHsgZXBzaWxvbiA9IDFlLTUgfVxuXHRcdFx0cmV0dXJuIChNYXRoLmFicyh2YWwxIC0gdmFsMikgPCBlcHNpbG9uKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHQvL1xuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc1BsYWluT2JqZWN0KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdC8vXG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNBcnJheShvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHQvL1xuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHQvL1xuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdC8vXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0Ly9cblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdC8vXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0Ly9cblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdC8vXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdC8vXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHQvL1xuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdC8vXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdC8vXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdC8vXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHQvL1xuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdC8vXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vXG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0Ly9cblx0XHRcdHZhciByZXRyaWV2ZSA9IG9wdGlvbnMucmV0cmlldmUsXG5cdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdC8vXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0Ly9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0Ly9cblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdqcy1ncmFwaCcsICdibHVlYmlyZCcsICcuL3RyYXZlcnNlLWRhZy5qcycsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIEpzR3JhcGgsIFAsIHRyYXZlcnNlLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyBhIHV0aWxpdHkgZnVuY3Rpb24gdG8gZXh0cmFjdCBvcGVyYXRpb25zIGZyb20gYSBwbHVnaW5cblx0Ly9cblx0ZnVuY3Rpb24gcHJvY2Vzc09wZXJhdGlvbnMob2JqKSB7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdCQuZWFjaChvYmosIChrZXksIHZhbHVlKT0+IHtcblx0XHRcdHZhciBtYXRjaCA9IGtleS5tYXRjaCgvXihcXHcrKVxccysoXFx3KykkLyk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0cmVzdWx0W21hdGNoWzJdXSA9IHtcblx0XHRcdFx0XHRvcGVyYXRpb246IG1hdGNoWzFdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvL1xuXHQvLyBkZWZpbmUgdGhlIFBsdWdpbkhhbmRsZXIgY2xhc3Ncblx0Ly9cblx0cmV0dXJuIGZ1bmN0aW9uIFBsdWdpbkhhbmRsZXIoKSB7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLy8vIFByaXZhdGUgVmFyaWFibGVzIC8vLy9cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8vXG5cdFx0Ly8ga2VlcCB0cmFjayBvZiBwbHVnaW5zIGFuZCB0aGVpciBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9yZGVyXG5cdFx0Ly9cblx0XHR2YXIgX3BsdWdpbnMgPSBuZXcgSnNHcmFwaCgpO1xuXHRcdHZhciBfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uID0ge307XG5cdFx0dmFyIF9mZWF0dXJlQ29uZmlndXJhdGlvbkNhY2hlID0ge307XG5cdFx0dmFyIF9wbHVnaW5QcmVkaWNhdGVzID0ge307XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLy8vIFByaXZhdGUgRnVuY3Rpb25zIC8vLy9cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8vXG5cdFx0Ly8gdG8gcHJvY2VzcyBhIGNvbmRpdGlvbiBkaXNqdW5jdCBmb3IgYSBwbHVnaW5cblx0XHQvL1xuXHRcdGZ1bmN0aW9uIF9hZGRQbHVnaW5Db25kaXRpb25EaXNqdW5jdChuYW1lLCBjb25kaXRpb24pIHtcblx0XHRcdC8vXG5cdFx0XHQvLyB0byBhY2N1bXVsYXRlIGNvbmRpdGlvbiBkaXNqdW5jdHMgaW50byBydW5uYWJsZSBwcmVkaWNhdGVzXG5cdFx0XHQvL1xuXHRcdFx0ZnVuY3Rpb24gYWNjdW11bGF0ZShsYXp5Q29uZGl0aW9uKSB7XG5cdFx0XHRcdHZhciBvbGRQcmVkaWNhdGUgPSBfcGx1Z2luUHJlZGljYXRlc1tuYW1lXTtcblx0XHRcdFx0X3BsdWdpblByZWRpY2F0ZXNbbmFtZV0gPSAoY29udGV4dCkgPT4ge1xuXHRcdFx0XHRcdGlmIChfZmVhdHVyZUNvbmZpZ3VyYXRpb25DYWNoZVtuYW1lXSkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0X2ZlYXR1cmVDb25maWd1cmF0aW9uQ2FjaGVbbmFtZV0gPVxuXHRcdFx0XHRcdFx0KG9sZFByZWRpY2F0ZSAmJiBvbGRQcmVkaWNhdGUoY29udGV4dCkpIHx8XG5cdFx0XHRcdFx0XHRsYXp5Q29uZGl0aW9uKGNvbnRleHQpO1xuXHRcdFx0XHRcdHJldHVybiBfZmVhdHVyZUNvbmZpZ3VyYXRpb25DYWNoZVtuYW1lXTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0Ly9cblx0XHRcdC8vIGludGVycHJldCB0aGUgZ2l2ZW4gY29uZGl0aW9uIGJ5IHR5cGVcblx0XHRcdC8vXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChjb25kaXRpb24pKSB7IC8vIGRvIG5vdCBsb2FkIGEgcGx1Z2luIGJ5IGRlZmF1bHRcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBmYWxzZSk7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09ICdzdHJpbmcnKSB7IC8vIGEgcGx1Z2luIG5hbWVcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uW2NvbmRpdGlvbl0pO1xuXHRcdFx0fSBlbHNlIGlmICgkLmlzQXJyYXkoY29uZGl0aW9uKSkgeyAvLyBhIGNvbmp1bmN0aW9uXG5cdFx0XHRcdGFjY3VtdWxhdGUoKCkgPT4gY29uZGl0aW9uLmV2ZXJ5KChjb25qdW5jdCkgPT4gX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbltjb25qdW5jdF0pKTtcblx0XHRcdH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKGNvbmRpdGlvbikpIHsgLy8gYSBwcmVkaWNhdGVcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiBjb25kaXRpb24oX2R5bmFtaWNGZWF0dXJlQ29uZmlndXJhdGlvbikpO1xuXHRcdFx0fSBlbHNlIHsgLy8gYSBsaXRlcmFsIEJvb2xlYW4gdmFsdWVcblx0XHRcdFx0YWNjdW11bGF0ZSgoKSA9PiAhIWNvbmRpdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX3JlZ2lzdGVyU2luZ2xlUGx1Z2luKHBsdWdpbikge1xuXHRcdFx0Ly9cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0Ly9cblx0XHRcdFUuYXNzZXJ0KHR5cGVvZiBwbHVnaW4ubmFtZSA9PT0gJ3N0cmluZycsXG5cdFx0XHRcdFwiQW4gQXBpTkFUT01ZIHBsdWdpbiBzaG91bGQgaGF2ZSBhIG5hbWUuXCIpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBsdWdpbiBjb25maWd1cmF0aW9uXG5cdFx0XHQvL1xuXHRcdFx0aWYgKCEkLmlzQXJyYXkocGx1Z2luLmFmdGVyKSkgeyBwbHVnaW4uYWZ0ZXIgPSBbXSB9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBwcm9jZXNzIHRoZSBwbHVnaW4gY29uZGl0aW9uXG5cdFx0XHQvL1xuXHRcdFx0X2FkZFBsdWdpbkNvbmRpdGlvbkRpc2p1bmN0KHBsdWdpbi5uYW1lLCBwbHVnaW4uaWYpO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KF9keW5hbWljRmVhdHVyZUNvbmZpZ3VyYXRpb24sIHBsdWdpbi5uYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIF9wbHVnaW5QcmVkaWNhdGVzW3BsdWdpbi5uYW1lXShfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJlZ2lzdGVyIHRoZSBwbHVnaW5cblx0XHRcdC8vXG5cdFx0XHRfcGx1Z2lucy5hZGRWZXJ0ZXgocGx1Z2luLm5hbWUsIHBsdWdpbik7XG5cdFx0XHQkLmVhY2gocGx1Z2luLmFmdGVyLCAoX18sIHYpID0+IHsgX3BsdWdpbnMuY3JlYXRlRWRnZSh2LCBwbHVnaW4ubmFtZSkgfSk7XG5cdFx0XHR0cnkgeyBfcGx1Z2lucy50b3BvbG9naWNhbGx5KCgpPT4ge30pIH0gY2F0Y2ggKGN5Y2xlRXJyb3IpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgcGx1Z2luIGFwcGxpY2F0aW9uIG9yZGVyIGhhcyBhIGN5Y2xlOiAke2N5Y2xlRXJyb3IuY3ljbGV9YCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBwcmUtcHJvY2VzcyBvcGVyYXRpb25zIChmb3Igbm93LCBvbmx5ICdtb2RpZnknIGZvciB0aGUgdG9wLWxldmVsKVxuXHRcdFx0Ly9cblx0XHRcdHBsdWdpbi5fb3BlcmF0aW9ucyA9IHByb2Nlc3NPcGVyYXRpb25zKHBsdWdpbik7XG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8vLyBQdWJsaWMgTWV0aG9kcyAvLy8vXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvL1xuXHRcdC8vIHRoZSAncGx1Z2luJyBmdW5jdGlvbiB1bHRpbWF0ZWx5IHJldHVybmVkIGZyb20gdGhpcyBtb2R1bGU7XG5cdFx0Ly8gaXQgaXMgY2FsbGVkIGJ5IHBsdWdpbi13cml0ZXJzIHdpdGggYW4gb2JqZWN0LCBhbmQgYnkgcGx1Z2luXG5cdFx0Ly8gdXNlcnMgdG8gJ3NlbGVjdCcgcGx1Z2lucyBieSBuYW1lLCBhbmQgY2FuIHRha2UgYW4gYXJyYXlcblx0XHQvL1xuXHRcdHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihwbHVnaW4pIHtcblx0XHRcdGlmICgkLmlzQXJyYXkocGx1Z2luKSkge1xuXHRcdFx0XHQvLyBwcm9jZXNzIGVhY2ggcGx1Z2luIHNlcGFyYXRlbHlcblx0XHRcdFx0JC5lYWNoKHBsdWdpbiwgKF9fLCBzdWJDb25maWcpPT57IHRoaXMucmVnaXN0ZXIoc3ViQ29uZmlnKSB9KTtcblx0XHRcdH0gZWxzZSBpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbikpIHtcblx0XHRcdFx0Ly8gcmVnaXN0ZXIgYSBzaW5nbGUgcGx1Z2luXG5cdFx0XHRcdF9yZWdpc3RlclNpbmdsZVBsdWdpbihwbHVnaW4pO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHQvLyByZWdpc3RlciBhIHNpbmdsZSBwbHVnaW5cblx0XHRcdFx0X2FkZFBsdWdpbkNvbmRpdGlvbkRpc2p1bmN0KHBsdWdpbiwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vXG5cdFx0Ly8gYXBwbHkgYWxsIHJlbGV2YW50IHBsdWdpbnMgdG8gYSBnaXZlbiBvYmplY3Rcblx0XHQvL1xuXHRcdHRoaXMuYXBwbHkgPSBmdW5jdGlvbiBhcHBseShjb21wb25lbnQsIG9iaikge1xuXHRcdFx0cmV0dXJuIHRyYXZlcnNlKF9wbHVnaW5zLCAocGx1Z2luTmFtZSwgcGx1Z2luKSA9PiB7XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGlmIHRoZSBwbHVnaW4gZG9lc24ndCBleGlzdCwgdGhyb3cgYW4gZXJyb3Jcblx0XHRcdFx0Ly9cblx0XHRcdFx0aWYgKCFwbHVnaW4pIHsgdGhyb3cgbmV3IEVycm9yKGBJIGRvbid0IGtub3cgdGhlICcke3BsdWdpbk5hbWV9JyBwbHVnaW4uYCkgfVxuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGlmIHRoZSBwbHVnaW4gaXMgbm90IHNlbGVjdGVkLCByZXR1cm5cblx0XHRcdFx0Ly9cblx0XHRcdFx0aWYgKCFfZHluYW1pY0ZlYXR1cmVDb25maWd1cmF0aW9uW3BsdWdpbk5hbWVdKSB7IHJldHVybiB9XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gZ2V0IGNoYW5nZXMgdGFyZ2V0ZWQgYXQgdGhpcyBjb21wb25lbnRcblx0XHRcdFx0Ly9cblx0XHRcdFx0dmFyIG9wID0gcGx1Z2luLl9vcGVyYXRpb25zW2NvbXBvbmVudF07XG5cdFx0XHRcdGlmICghb3ApIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyB3ZSBvbmx5IHN1cHBvcnQgJ21vZGlmeScgZm9yIHRoZSB0b3AgbGV2ZWwgZm9yIG5vd1xuXHRcdFx0XHQvL1xuXHRcdFx0XHRVLmFzc2VydChvcC5vcGVyYXRpb24gPT09ICdtb2RpZnknLFxuXHRcdFx0XHRcdGBBbnkgdG9wLWxldmVsIG9wZXJhdGlvbiBvbiAnJHtjb21wb25lbnR9JyBtdXN0IGJlICdtb2RpZnknLmApO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHBlcmZvcm0gdGhlIHN1Yi1vcGVyYXRpb25zXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHZhciBzdWJPcHMgPSBwcm9jZXNzT3BlcmF0aW9ucyhvcC52YWx1ZSk7XG5cdFx0XHRcdCQuZWFjaChzdWJPcHMsIChmaWVsZCwgc3ViT3ApID0+IHtcblx0XHRcdFx0XHRzd2l0Y2ggKHN1Yk9wLm9wZXJhdGlvbikge1xuXG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0Ly8gYWRkIGEgbmV3IGtleS92YWx1ZSBwYWlyIHRvIHRoZSBvYmplY3Rcblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRjYXNlICdhZGQnOiB7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdFx0XHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKG9ialtmaWVsZF0pLFxuXHRcdFx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdhZGQgJHtmaWVsZH0nIGV4cGVjdHMgJHtjb21wb25lbnR9LiR7ZmllbGR9IHRvIGZpcnN0IGJlIHVuZGVmaW5lZC5gKTtcblxuXHRcdFx0XHRcdFx0XHRvYmpbZmllbGRdID0gc3ViT3AudmFsdWU7XG5cblx0XHRcdFx0XHRcdH0gYnJlYWs7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHQvLyByZW1vdmUgYW4gZXhpc3Rpbmcga2V5L3ZhbHVlIHBhaXIgZnJvbSB0aGUgb2JqZWN0XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0Y2FzZSAncmVtb3ZlJzogey8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHRcdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW2ZpZWxkXSksXG5cdFx0XHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJ3JlbW92ZSAke2ZpZWxkfScgZXhwZWN0cyAke2NvbXBvbmVudH0uJHtmaWVsZH0gdG8gZmlyc3QgYmUgZGVmaW5lZC5gKTtcblxuXHRcdFx0XHRcdFx0XHRkZWxldGUgb2JqW2ZpZWxkXTtcblxuXHRcdFx0XHRcdFx0fSBicmVhazsvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdC8vIHJlcGxhY2UgYW4gZXhpc3Rpbmcga2V5L3ZhbHVlIHBhaXIgaW4gdGhlIG9iamVjdFxuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdGNhc2UgJ3JlcGxhY2UnOiB7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0XHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtmaWVsZF0pLFxuXHRcdFx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICdyZXBsYWNlICR7ZmllbGR9JyBleHBlY3RzICR7Y29tcG9uZW50fS4ke2ZpZWxkfSB0byBmaXJzdCBiZSBkZWZpbmVkLmApO1xuXG5cdFx0XHRcdFx0XHRcdG9ialtmaWVsZF0gPSBzdWJPcC52YWx1ZTtcblxuXHRcdFx0XHRcdFx0fSBicmVhazsvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdC8vIGluc2VydCBhIHNldCBvZiBzdGF0ZW1lbnRzIGludG8gYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSBvYmplY3Rcblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdFx0XHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKG9ialtmaWVsZF0pIHx8ICQuaXNGdW5jdGlvbihvYmpbZmllbGRdKSxcblx0XHRcdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnaW5zZXJ0ICR7ZmllbGR9JyBleHBlY3RzICR7Y29tcG9uZW50fS4ke2ZpZWxkfSB0byBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbi5gKTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdE9mRnVuY3Rpb24gPSBvYmpbZmllbGRdO1xuXHRcdFx0XHRcdFx0XHRvYmpbZmllbGRdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN0T2ZGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc3ViT3AudmFsdWUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdH0gYnJlYWs7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHQvLyBoYXZlIGEgc2V0IG9mIHN0YXRlbWVudHMgZXhlY3V0ZWQgYWZ0ZXIgYW4gZXhpc3Rpbmdcblx0XHRcdFx0XHRcdC8vIChwb3NzaWJseSBhc3luY2hyb25vdXMpIG1ldGhvZCBvZiB0aGUgb2JqZWN0XG5cdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0Y2FzZSAnYWZ0ZXInOiB7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHRcdFx0XHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZChvYmpbZmllbGRdKSB8fCAkLmlzRnVuY3Rpb24ob2JqW2ZpZWxkXSksXG5cdFx0XHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJ2FmdGVyICR7ZmllbGR9JyBleHBlY3RzICR7Y29tcG9uZW50fS4ke2ZpZWxkfSB0byBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbi5gKTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgYmVmb3JlRnVuY3Rpb24gPSBvYmpbZmllbGRdO1xuXHRcdFx0XHRcdFx0XHRvYmpbZmllbGRdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKGJlZm9yZUZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpKS50aGVuKGZ1bmN0aW9uIChwcm9taXNlVmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBzdWJPcC52YWx1ZS5hcHBseSh0aGlzLCBbcHJvbWlzZVZhbHVlXS5jb25jYXQoYXJncykpO1xuXHRcdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdH0gYnJlYWs7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9wbHVnaW4taGFuZGxlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICcuL2RlZmVyLmpzJ10sIGZ1bmN0aW9uIChQLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHRyYXZlcnNlREFHKGdyYXBoLCBmbikge1xuXHRcdC8vXG5cdFx0Ly8ga2VlcGluZyB0cmFjayBvZiB0aGUgZGVmZXJyZWRzIG9mIGFsbCBub2Rlc1xuXHRcdC8vXG5cdFx0dmFyIG5vZGVEZWZlcnJlZHMgPSB7fTtcblx0XHRmdW5jdGlvbiBub2RlRGVmZXJyZWQoaWQpIHtcblx0XHRcdGlmICghbm9kZURlZmVycmVkc1tpZF0pIHsgbm9kZURlZmVycmVkc1tpZF0gPSBkZWZlcigpIH1cblx0XHRcdHJldHVybiBub2RlRGVmZXJyZWRzW2lkXTtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIGtlZXBpbmcgdHJhY2sgb2YgdGhlIHNvdXJjZXMgYW5kIHNpbmtzXG5cdFx0Ly9cblx0XHR2YXIgc2lua1Byb21pc2VzID0gW107XG5cblx0XHQvL1xuXHRcdC8vIGNvbm5lY3QgYWxsIHRoZSBwcm9taXNlc1xuXHRcdC8vXG5cdFx0Z3JhcGguZWFjaFZlcnRleCgoa2V5LCB2YWwpID0+IHtcblx0XHRcdHZhciBwcmVkcyA9IGdyYXBoLnByZWRlY2Vzc29ycyhrZXkpO1xuXHRcdFx0dmFyIHN1Y2NzID0gZ3JhcGguc3VjY2Vzc29ycyhrZXkpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGVzdCBmb3Igc2luay1ob29kXG5cdFx0XHQvL1xuXHRcdFx0aWYgKHN1Y2NzLmxlbmd0aCA9PT0gMCkgeyBzaW5rUHJvbWlzZXMucHVzaChub2RlRGVmZXJyZWQoa2V5KS5wcm9taXNlKSB9XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBzZXQgdXAgcHJvbWlzZSB0byByZXNvbHZlIHdoZW4gcHJlZGVjZXNzb3JzIGFyZSBkb25lXG5cdFx0XHQvL1xuXHRcdFx0UC5hbGwocHJlZHMubWFwKChwcmVkKSA9PiB7IHJldHVybiBub2RlRGVmZXJyZWQocHJlZCkucHJvbWlzZSB9KSkudGhlbigocHJlZFJlc3VsdHMpID0+IHtcblx0XHRcdFx0bm9kZURlZmVycmVkKGtleSkucmVzb2x2ZShmbihrZXksIHZhbCwgcHJlZFJlc3VsdHMpKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyByZXR1cm4gcHJvbWlzZXMgb2YgdGhlIHNpbmsgbm9kZSByZXN1bHRzXG5cdFx0Ly9cblx0XHRyZXR1cm4gc2lua1Byb21pc2VzO1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL3RyYXZlcnNlLWRhZy5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vYW15LXV0aWwvZGVmZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhbXktY2lyY3VpdGJvYXJkLmpzIn0=