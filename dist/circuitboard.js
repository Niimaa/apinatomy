(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("delta-js")) : factory(root["jQuery"], root["P"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, amyWidget, U, DM) {
	  'use strict';
	  DM.registerPromiseResolver(P.resolve);
	  var dm = new DM();
	  U.extend(U.object($, 'circuitboard'), {plugin: function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        dm.select.apply(dm, pluginOrSelection);
	        defineWidgetClasses();
	      }
	    }});
	  function defineWidgetClasses() {
	    dm.vp('Circuitboard', amyWidget('Circuitboard', {
	      cssClass: "circuitboard",
	      filter: (function() {
	        return P.resolve(true);
	      }),
	      model: null
	    }));
	    dm.vp('Tilemap', amyWidget('Tilemap', {
	      cssClass: "tilemap",
	      model: null,
	      _circuitboard: null
	    }));
	    dm.vp('Tile', amyWidget('Tile', {
	      cssClass: 'tile',
	      model: null,
	      _circuitboard: null
	    }));
	  }
	  $.circuitboard.plugin.graph = (function() {
	    return dm.graph();
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
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
	        return this._children || [];
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var U = {
	    newClass: function(constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__0 = 0; $__0 < arguments.length; $__0++)
	          args[$__0] = arguments[$__0];
	        constructor.apply(this, args);
	      };
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(superClass, constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__0 = 0; $__0 < arguments.length; $__0++)
	          args[$__0] = arguments[$__0];
	        constructor.apply(this, [superClass.prototype.constructor].concat(args));
	      };
	      cls.prototype = Object.create(superClass.prototype, prototype);
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__0 = 1; $__0 < arguments.length; $__0++)
	        rest[$__0 - 1] = arguments[$__0];
	      rest.forEach((function(obj) {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            obj1[key] = obj[key];
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
	          $__1 = 2; $__1 < arguments.length; $__1++)
	        args[$__1 - 2] = arguments[$__1];
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
	          $__2 = 0; $__2 < arguments.length; $__2++)
	        values[$__2] = arguments[$__2];
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
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
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
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context || this, args);
	        }
	      };
	    },
	    observable: function(obj, name) {
	      var $__4 = arguments[2] !== (void 0) ? arguments[2] : {},
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
	        if (!isEqual(cache, oldValue)) {
	          onChange.forEach((function(fn) {
	            return fn(cache, oldValue);
	          }));
	        }
	      }
	      setTimeout(setValue);
	      var oncePerStackSetValue = U.oncePerStack(setValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange = [];
	      resultFn.onChange = (function(cb) {
	        onChange.push(cb);
	        return resultFn;
	      });
	      return resultFn;
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlM2ZlNzhmMDgwNmU3YTZlYmE3YSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC93aWRnZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsVUFBUSxDQUFHLEdBQUcsR0FBQztBQUNqQyxjQUFXLENBQUM7QUFHWixJQUFDLHdCQUF5QixDQUFDLFNBQVEsQ0FBQyxDQUFDO0FBR2pDLFFBQUMsRUFBSSxJQUFJLEdBQUUsRUFBQyxDQUFDO0FBQ2pCLFVBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRyxlQUFhLENBQUMsQ0FBRyxFQUNyQyxNQUFLLENBQUwsVUFBTyxpQkFBZ0IsQ0FBRztBQUN6QixVQUFJLGVBQWUsQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFHO0FBRXZDLGNBQU8sSUFBSSxHQUFDLE1BQU8sQ0FBQyxpQkFBZ0IsS0FBSyxDQUFHLGtCQUFnQixDQUFDLENBQUM7T0FDL0QsS0FBTztBQUVOLFVBQUMsT0FBTyxNQUFPLENBQUMsRUFBQyxDQUFHLGtCQUFnQixDQUFDLENBQUM7QUFDdEMsMkJBQW1CLEVBQUMsQ0FBQztPQUN0QjtBQUFBLEtBQ0QsQ0FDRCxDQUFDLENBQUM7QUFHRixVQUFTLG9CQUFrQixDQUFFO0FBQzVCLE1BQUMsR0FBSSxDQUFDLGNBQWEsQ0FBRyxVQUFTLENBQUMsY0FBYSxDQUFHO0FBQy9DLGNBQU8sQ0FBRyxlQUFhO0FBQ3ZCLFlBQUssR0FBRyxTQUFDO2NBQUcsVUFBUyxDQUFDLElBQUcsQ0FBQztPQUFBO0FBQzFCLFdBQUksQ0FBRyxLQUFHO0FBQUEsS0FDWCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQUMsR0FBSSxDQUFDLFNBQVEsQ0FBRyxVQUFTLENBQUMsU0FBUSxDQUFHO0FBQ3JDLGNBQU8sQ0FBRyxVQUFRO0FBQ2xCLFdBQUksQ0FBRyxLQUFHO0FBQ1YsbUJBQVksQ0FBRyxLQUFHO0FBQUEsS0FDbkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFDLEdBQUksQ0FBQyxNQUFLLENBQUcsVUFBUyxDQUFDLE1BQUssQ0FBRztBQUMvQixjQUFPLENBQUcsT0FBSztBQUNmLFdBQUksQ0FBRyxLQUFHO0FBQ1YsbUJBQVksQ0FBRyxLQUFHO0FBQUEsS0FDbkIsQ0FBQyxDQUFDLENBQUM7R0FDSjtBQUdBLGdCQUFhLE9BQU8sTUFBTSxJQUFJLFNBQUM7VUFBSyxHQUFDLE1BQU8sRUFBQztHQUFBLEVBQUM7QUFJOUMsUUFBTyxlQUFhLENBQUM7QUFFdEIsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDeERBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztpRUNBQSxpQ0FBUSx1QkFBVSx3QkFBWSx3QkFBVyxDQUFHLDBDQUFVLEVBQUcsR0FBRztBQUMzRCxjQUFXLENBQUM7QUFHWixVQUFTLHFCQUFtQixDQUFFLEdBQUU7QUFFM0Isa0JBQVMsRUFBSSxHQUFDLENBQUM7QUFFbkIsWUFBUyxpQkFBZSxDQUFFLE1BQUssQ0FBRztBQUNqQyxVQUFJLENBQUMsVUFBUyxDQUFFLE1BQUssQ0FBQyxDQUFHO0FBQ3hCLGtCQUFTLENBQUUsTUFBSyxDQUFDLEVBQUksWUFBVyxFQUFDLENBQUM7T0FDbkM7QUFDQSxZQUFPLFdBQVMsQ0FBRSxNQUFLLENBQUMsQ0FBQztLQUMxQjtBQUVBLFlBQVEsQ0FBQyxHQUFFLENBQUc7QUFDYixRQUFDLENBQUQsVUFBRyxNQUFLLENBQUcsR0FBQyxDQUFHO0FBQUUsd0JBQWdCLENBQUMsTUFBSyxDQUFDLElBQUssQ0FBQyxFQUFDLENBQUM7T0FBRTtBQUNsRCxTQUFFLENBQUYsVUFBSSxNQUFLLENBQUcsR0FBQyxDQUFHO0FBQUUsd0JBQWdCLENBQUMsTUFBSyxDQUFDLE9BQVEsQ0FBQyxFQUFDLENBQUM7T0FBRTtBQUN0RCxTQUFFLENBQUYsVUFBSSxNQUFLLENBQUcsR0FBQzs7O0FBQ1Isb0JBQU8sSUFBSSxTQUFDLENBQUs7QUFDcEIsWUFBQyxNQUFPLENBQUMsSUFBRyxPQUFZLENBQUM7QUFDekIsa0JBQVEsQ0FBQyxNQUFLLENBQUcsU0FBTyxDQUFDLENBQUM7U0FDM0IsRUFBQztBQUNELFlBQUcsR0FBSSxDQUFDLE1BQUssQ0FBRyxTQUFPLENBQUMsQ0FBQztPQUMxQjtBQUNBLFVBQUcsQ0FBSCxVQUFLLE1BQUssQ0FBRyxHQUFDLENBQUc7QUFBRSxZQUFHLElBQUssQ0FBQyxNQUFLLENBQUcsR0FBQyxDQUFDO09BQUU7QUFDeEMsYUFBTSxDQUFOLFVBQVEsTUFBYyxDQUFHO0FDekJoQixhQUFTLFVBQW9CLEdBQUM7QUFBRyxvQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsZUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRHdCN0YscUJBQVEsRUFBSSxXQUFTLENBQUUsTUFBSyxDQUFDLENBQUM7QUFDbEMsWUFBSSxTQUFRLENBQUc7QUFBRSxtQkFBUSxTQUFVLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQztTQUFFO0FBQUEsT0FDakQ7QUFBQSxLQUNELENBQUMsQ0FBQztHQUVIO0FBR0EsVUFBUyx1QkFBcUIsQ0FBRSxHQUFFLENBQUcsS0FBRztBQUV2QyxVQUFLLGVBQWdCLENBQUMsR0FBRSxDQUFHLE9BQUssQ0FBRyxFQUNsQyxHQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsY0FBTyxLQUFHO09BQUUsQ0FDckIsQ0FBQyxDQUFDO0FBQ0YsVUFBSyxlQUFnQixDQUFDLEdBQUUsQ0FBRyxTQUFPLENBQUc7QUFDcEMsU0FBRSxDQUFGLFVBQUksTUFBSyxDQUFHO0FBQ1gsWUFBRyxRQUFRLEVBQUksT0FBSyxDQUFDO0FBQ3JCLGVBQU8sQ0FBQyxNQUFLLENBQUcsWUFBVSxDQUFDLEtBQU0sQ0FBQyxJQUFHLENBQUMsQ0FBQztPQUN4QztBQUNBLFNBQUUsQ0FBRixVQUFJLENBQUU7QUFBRSxjQUFPLEtBQUcsUUFBUTtPQUFFO0FBQUEsS0FDN0IsQ0FBQyxDQUFDO0FBQ0YsVUFBSyxlQUFnQixDQUFDLEdBQUUsQ0FBRyxXQUFTLENBQUcsRUFDdEMsR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUFFLGNBQU8sS0FBRyxVQUFVLEdBQUssR0FBQztPQUFFLENBQ3JDLENBQUMsQ0FBQztBQUNGLFlBQVEsQ0FBQyxHQUFFLENBQUc7QUFDYiwyQkFBb0IsQ0FBcEIsVUFBc0IsSUFBRyxDQUFHO0FBQ3ZCLGtCQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2pCLFVBQUc7QUFBRSxnQkFBSyxFQUFJLE9BQUssT0FBTztTQUFFLFFBQVMsTUFBSyxHQUFLLE9BQUssS0FBSyxHQUFLLE9BQUssS0FBSyxJQUFNLEtBQUcsRUFBRTtBQUNuRixjQUFPLE9BQUssQ0FBQztPQUNkO0FBQ0EsOEJBQXVCLENBQXZCLFVBQXlCLElBQUc7QUFDdkIsa0JBQUssRUFBSSxHQUFDLENBQUM7QUFDZixTQUFDLElBQUcsU0FBUyxHQUFLLEdBQUMsQ0FBQyxRQUFTLEVBQUMsU0FBQyxLQUFJLENBQU07QUFDeEMsY0FBSSxLQUFJLEtBQUssSUFBTSxLQUFHLENBQUc7QUFDeEIsa0JBQUssS0FBTSxDQUFDLEtBQUksQ0FBQyxDQUFDO1dBQ25CLEtBQU87QUFDTixrQkFBSyxFQUFJLE9BQUssT0FBUSxDQUFDLEtBQUkseUJBQTBCLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztXQUM3RDtBQUFBLFNBQ0QsRUFBQyxDQUFDO0FBQ0YsY0FBTyxPQUFLLENBQUM7T0FDZDtLQUNELENBQUMsQ0FBQztHQUVIO0FBSUEsVUFBUyx3QkFBc0IsQ0FBRSxHQUFFO0FBRWxDLFVBQUssZUFBZ0IsQ0FBQyxHQUFFLENBQUcsUUFBTSxDQUFHLEVBQ25DLEdBQUUsQ0FBRixVQUFJLENBQUU7QUFBRSxjQUFPLEtBQUcsUUFBUSxNQUFNO09BQUUsQ0FDbkMsQ0FBQyxDQUFDO0dBRUg7QUFJQSxVQUFTLFVBQVEsQ0FBRSxRQUFPLENBQUcsZUFBYTtBQUd6QyxZQUFTLE9BQUssQ0FBRSxJQUFpQjs7QUFBaEIsaUJBQU07QUFBRyxpQkFBTTs7QUFFL0IsY0FBUSxDQUFDLElBQUcsQ0FBRztBQUNkLGVBQU0sQ0FBRyxTQUFRLENBQUMsRUFBQyxDQUFHLGVBQWEsQ0FBRyxRQUFNLENBQUM7QUFDN0MsZUFBTSxDQUFHLFFBQU07QUFDZixlQUFNLENBQU4sVUFBUSxDQUFFO0FBQUUsY0FBRyxRQUFTLENBQUMsU0FBUSxDQUFDO1NBQUU7QUFBQSxPQUNyQyxDQUFDLENBQUM7QUFDRiwwQkFBb0IsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUcxQixVQUFHLFFBQVEsU0FBVSxDQUFDLElBQUcsUUFBUSxTQUFTLENBQUMsQ0FBQztBQUM1QyxVQUFHLFFBQVEsSUFBSyxDQUFDLFFBQU8sR0FBRyxTQUFDLENBQUs7QUFBRSxvQkFBWSxFQUFDO09BQUUsRUFBQyxDQUFDO0FBR3BELFVBQUksSUFBRyxRQUFRLE9BQU8sQ0FBRztBQUFFLFlBQUcsT0FBTyxFQUFJLEtBQUcsUUFBUSxPQUFPO09BQUU7QUFHN0QsWUFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxlQUFhLENBQUcsRUFDM0MsR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUFFLGdCQUFPLEtBQUcsc0JBQXVCLENBQUMsY0FBYSxDQUFDO1NBQUUsQ0FDM0QsQ0FBQyxDQUFDO0FBR0YsVUFBRyxZQUFZLEVBQUksVUFBUyxFQUFDLENBQUM7QUFDOUIsVUFBRyxtQkFBb0IsQ0FBQyxJQUFHLFFBQVEsbUJBQW1CLENBQUMsQ0FBQztBQUt4RCxVQUFHLFlBQVksS0FBTSxFQUFDLFNBQUMsQ0FBSztBQUMzQixZQUFJLFlBQVksQ0FBQyxjQUFhLENBQUMsQ0FBRztBQUNqQyxpQ0FBdUIsQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO1NBQzFDO0FBQUEsT0FDRCxFQUFDLENBQUM7S0FFSDtBQUVBLFVBQUssVUFBVSxtQkFBbUIsRUFBSSxTQUFTLG1CQUFpQixDQUFFLGVBQWMsQ0FBRztBQUNsRixVQUFHLFlBQVksRUFBSSxLQUFHLFlBQVksT0FDekIsQ0FBQyxTQUFTLENBQUMsZUFBYyxDQUFDLENBQUMsT0FDM0IsQ0FBQyxJQUFHLENBQUMsQ0FBQztLQUNoQixDQUFDO0FBRUQsMkJBQXVCLENBQUMsTUFBSyxVQUFVLENBQUMsQ0FBQztBQUN6QywwQkFBc0IsQ0FBQyxNQUFLLFVBQVUsQ0FBRyxTQUFPLENBQUMsQ0FBQztBQUc5QyxxQkFBWSxFQUFJLFNBQU8sQ0FBRSxFQUFDLFlBQWEsRUFBQyxFQUFJLFNBQU8sTUFBTyxDQUFDLEVBQUMsQ0FBQztBQUNqRSxRQUFHLENBQUUsYUFBWSxDQUFDLEVBQUksVUFBVSxPQUFNLENBQUc7QUFFeEMsVUFBSSxPQUFNLElBQU0sV0FBUyxDQUFHO0FBQUUsY0FBTyxLQUFHLEtBQU0sRUFBQyxPQUFPLEVBQUMsY0FBWSxFQUFHO09BQUU7QUFHcEUsbUJBQVEsRUFBSSxJQUFJLE9BQU0sQ0FBQztBQUFFLGVBQU0sQ0FBRyxRQUFNO0FBQUcsZUFBTSxDQUFHLEtBQUc7QUFBQSxPQUFFLENBQUMsQ0FBQztBQUMvRCxVQUFHLEtBQU0sRUFBQyxPQUFPLEVBQUMsY0FBWSxFQUFLLFVBQVEsWUFBWSxDQUFDLENBQUM7QUFHekQsWUFBTyxLQUFHLENBQUM7S0FDWixDQUFDO0FBR0QsVUFBTyxPQUFLLENBQUM7R0FFZDtBQUVBLFFBQU8sVUFBUSxDQUFDO0FBRWpCLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OzttQ0V6SkEsa0NBQU8sUUFBQztBQUNQLGNBQVcsQ0FBQztBQUVSLFNBQUk7QUFHUCxZQUFPLENBQVAsVUFBUyxXQUFVLENBQUcsVUFBUTtBQUM3QixlQUFRLEVBQUksVUFBUSxHQUFLLEdBQUMsQ0FBQztBQUN2QixhQUFFLEVBQUksVUFBZ0IsQ0FBRztBQ1BwQixhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FETTdFLG1CQUFVLE1BQU8sQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7T0FDOUIsQ0FBQztBQUNELFNBQUUsVUFBVSxFQUFJLFVBQVEsQ0FBQztBQUN6QixTQUFFLFVBQVUsWUFBWSxFQUFJLElBQUUsQ0FBQztBQUMvQixZQUFPLElBQUUsQ0FBQztLQUNYO0FBR0EsZUFBVSxDQUFWLFVBQVksVUFBUyxDQUFHLFlBQVUsQ0FBRyxVQUFRO0FBQzVDLGVBQVEsRUFBSSxVQUFRLEdBQUssR0FBQyxDQUFDO0FBQ3ZCLGFBQUUsRUFBSSxVQUFnQixDQUFHO0FDbEJwQixhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FEaUI3RSxtQkFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLEVBQUMsVUFBUyxVQUFVLFlBQVksQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztPQUN6RSxDQUFDO0FBQ0QsU0FBRSxVQUFVLEVBQUksT0FBSyxPQUFRLENBQUMsVUFBUyxVQUFVLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDOUQsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUtBLFVBQUssQ0FBTCxVQUFPLElBQVk7QUQ3QlQsV0FBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9DLENBQ2hFLE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELGFBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUM0QmxHLFVBQUcsUUFBUyxFQUFDLFNBQUMsR0FBRSxDQUFNO0FBQ3JCLGFBQVMsT0FBRSxHQUFLLElBQUUsQ0FBRztBQUNwQixjQUFJLEdBQUUsZUFBZ0IsQ0FBQyxHQUFFLENBQUMsQ0FBRztBQUM1QixnQkFBRyxDQUFFLEdBQUUsQ0FBQyxFQUFJLElBQUUsQ0FBRSxHQUFFLENBQUMsQ0FBQztXQUNyQjtBQUFBLFNBQ0Q7QUFBQSxPQUNELEVBQUMsQ0FBQztBQUNGLFlBQU8sS0FBRyxDQUFDO0tBQ1o7QUFJQSxTQUFJLENBQUosVUFBTSxJQUFHO0FBQUssY0FBTyxTQUFDLEdBQUUsQ0FBTTtBQUFFLGNBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQztPQUFFO0tBQUU7QUFJbkQsVUFBSyxDQUFMLFVBQU8sR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNqQixVQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBRztBQUFFLFdBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxHQUFDO09BQUU7QUFDL0MsWUFBTyxJQUFFLENBQUUsSUFBRyxDQUFDLENBQUM7S0FDakI7QUFJQSxTQUFJLENBQUosVUFBTSxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQ2hCLFVBQUksYUFBYSxDQUFDLEdBQUUsQ0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFHO0FBQUUsV0FBRSxDQUFFLElBQUcsQ0FBQyxFQUFJLEdBQUM7T0FBRTtBQUMvQyxZQUFPLElBQUUsQ0FBRSxJQUFHLENBQUMsQ0FBQztLQUNqQjtBQUdBLFFBQUcsQ0FBSCxVQUFLLEdBQUUsQ0FBRyxJQUFFLENBQUc7QUFDVixhQUFJLElBQUUsUUFBUyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQ3hCLFVBQUksS0FBTSxFQUFDLEVBQUc7QUFBRSxXQUFFLE9BQVEsQ0FBQyxFQUFDO09BQUU7QUFBQSxLQUMvQjtBQUdBLGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUNkLGFBQU8sR0FBRSxPQUFPLEVBQUksR0FBRztBQUFFLFdBQUUsSUFBSyxFQUFDO09BQUU7QUFBQSxLQUNwQztBQUdBLFNBQUksQ0FBSixVQUFNLEVBQUMsQ0FBRyxJQUFFLENBQUcsS0FBRyxDQUFHO0FBQUUsWUFBTyxHQUFDLEtBQUssTUFBTyxDQUFDLEVBQUMsQ0FBRyxFQUFDLEdBQUUsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUM7S0FBRTtBQUdwRSxRQUFHLENBQUgsVUFBSyxHQUFFLENBQUcsRUFBUyxDQUFHO0FEekVaLFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FDdUUzRSxZQUFPLFFBQU8sQ0FBQyxHQUFFLENBQUUsRUFBQyxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUM7S0FBRTtBQUkxRCxvQkFBZSxDQUFmLFVBQWlCLGFBQVksQ0FBRyxLQUFHLENBQUc7QUFDakMsMEJBQWUsRUFBSSxjQUFZLEtBQUssTUFBTyxDQUFDLGFBQVksQ0FBRyxFQUFDLElBQUcsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztBQUNuRixZQUFPLElBQUksaUJBQWdCLEVBQUMsQ0FBQztLQUM5QjtBQUlBLFVBQUssQ0FBTCxVQUFPLFNBQVEsQ0FBRyxRQUFNLENBQUc7QUFDMUIsVUFBSSxDQUFDLFNBQVEsQ0FBRztBQUFFLGFBQU0sSUFBSSxNQUFLLENBQUMsT0FBTSxHQUFLLG1CQUFpQixDQUFDO09BQUU7QUFBQSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR25ELGFBQVEsQ0FBUixVQUFVLEdBQUU7QUFBSyxZQUFPLE9BQUssS0FBTSxDQUFDLEdBQUUsQ0FBQyxJQUFLLEVBQUMsWUFBRTtjQUFLLElBQUUsQ0FBRSxHQUFFLENBQUM7T0FBQSxFQUFDO0tBQUU7QUFHOUQsa0JBQWEsQ0FBYixVQUFlLE9BQU0sQ0FBRztBQUN2QixVQUFJLE9BQU0sSUFBSyxDQUFDLFVBQVMsQ0FBQyxJQUFNLFNBQU8sQ0FBRztBQUN6QyxlQUFNLElBQUssQ0FBQyxVQUFTLENBQUcsV0FBUyxDQUFDLENBQUM7T0FDcEM7QUFBQSxLQUNEO0FBR0EsU0FBSSxDQUFKLFVBQWMsQ0FBRztBQ3pHUCxXQUFTLFlBQW9CLEdBQUM7QUFBRyxnQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FEd0c5RSxXQUFTLE9BQUksR0FBRyxJQUFJLE9BQUssT0FBTyxDQUFHLEtBQUssR0FBRztBQUMxQyxZQUFJLFdBQVcsQ0FBQyxNQUFLLENBQUUsRUFBQyxDQUFDLENBQUc7QUFBRSxnQkFBTyxPQUFLLENBQUUsRUFBQztTQUFFO0FBQUEsT0FDaEQ7QUFBQSxLQUNEO0FBS0EsWUFBTyxDQUFQLFVBQVMsSUFBRyxDQUFHLEtBQUcsQ0FBRyxRQUFNO0FBQ3RCLGlCQUFNLENBQUM7QUFDWCxZQUFPLFVBQWdCO0FDcEhkLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QURtSHpFLG1CQUFNLElBQUksU0FBQyxDQUFLO0FBQ25CLGlCQUFNLEVBQUksS0FBRyxDQUFDO0FBQ2QsY0FBRyxNQUFPLENBQUMsT0FBTSxDQUFHLEtBQUcsQ0FBQyxDQUFDO1NBQzFCLEVBQUM7QUFDRCxvQkFBWSxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3JCLGVBQU0sRUFBSSxXQUFVLENBQUMsT0FBTSxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQ3BDLENBQUM7S0FDRjtBQUlBLHNCQUFpQixDQUFqQixVQUFtQixFQUFDLENBQUcsUUFBTSxDQUFHO0FBQzNCLGNBQUcsRUFBSSxNQUFJLENBQUM7QUFDaEIsY0FBUyxZQUFVLENBQUUsQ0FBRTtBQUN0QixVQUFDLE1BQU8sQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUNqQixZQUFJLElBQUcsQ0FBRztBQUFFLGlCQUFLO1NBQUU7QUFDbkIsNkJBQXFCLENBQUMsV0FBVSxDQUFDLENBQUM7T0FDbkM7QUFDQSxpQkFBVyxFQUFDLENBQUM7QUFDYixZQUFPLFNBQVMsdUJBQXFCLENBQUUsQ0FBRTtBQUN4QyxZQUFHLEVBQUksS0FBRyxDQUFDO09BQ1osQ0FBQztLQUNGO0FBR0EsZ0JBQVcsQ0FBWCxVQUFhLElBQUcsQ0FBRyxRQUFNO0FBQ3BCLG1CQUFRLEVBQUksS0FBRyxDQUFDO0FBQ3BCLFlBQU8sVUFBZ0I7QUNoSmQsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRCtJN0UsWUFBSSxTQUFRLENBQUc7QUFDZCxtQkFBUSxFQUFJLE1BQUksQ0FBQztBQUNqQixvQkFBVSxFQUFDLFNBQUMsQ0FBSztBQUFFLHFCQUFRLEVBQUksS0FBRztXQUFFLEVBQUcsR0FBQyxDQUFDO0FBQ3pDLGNBQUcsTUFBTyxDQUFDLE9BQU0sR0FBSyxLQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7U0FDbEM7QUFBQSxPQUNELENBQUM7S0FDRjtBQWFBLGNBQVMsQ0FBVCxVQUFXLEdBQUUsQ0FBRyxLQUErQjsyREFBRCxHQUFDO0FBQXhCLGlCQUFNO0FBQUcsb0JBQVM7QUFDcEMsZUFBSSxFQUFJLFFBQU0sQ0FBQztBQUNuQixZQUFLLGVBQWdCLENBQUMsR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQyxXQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsZ0JBQU8sTUFBSTtTQUFFO0FBQ3JCLFdBQUUsQ0FBRixVQUFJLFFBQU8sQ0FBRztBQUNULHNCQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLGNBQUksVUFBUyxDQUFHO0FBQUUsb0JBQU8sRUFBSSxXQUFVLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQztXQUFFO0FBQzVELGNBQUksUUFBTyxJQUFNLFNBQU8sQ0FBRztBQUMxQixpQkFBSSxFQUFJLFNBQU8sQ0FBQztBQUNoQixnQkFBRyxRQUFTLENBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBRyxTQUFPLENBQUMsQ0FBQztXQUN2QztBQUFBLFNBQ0Q7QUFBQSxPQUNELENBQUMsQ0FBQztLQUNIO0FBT0EsVUFBSyxDQUFMLFVBQU8sT0FBTTtBQUVSLGtCQUFPLEVBQUksUUFBTSxTQUFTO0FBQzVCLGlCQUFNLEVBQUksUUFBTSxRQUFRLEdBQUssR0FBQyxTQUFDLEVBQUc7a0JBQU0sRUFBQyxLQUFNLEdBQUM7V0FBQSxFQUFDLENBQUM7QUFHaEQsZUFBSSxDQUFDO0FBQ1QsY0FBUyxTQUFPLENBQUU7QUFDYixvQkFBTyxFQUFJLE1BQUksQ0FBQztBQUNwQixhQUFJLEVBQUksU0FBUSxFQUFDLENBQUM7QUFDbEIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUc7QUFDOUIsa0JBQU8sUUFBUyxFQUFDLFNBQUMsRUFBQztrQkFBTSxHQUFFLENBQUMsS0FBSSxDQUFHLFNBQU8sQ0FBQztXQUFBLEVBQUMsQ0FBQztTQUM5QztBQUFBLE9BQ0Q7QUFDQSxnQkFBVSxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBSWhCLDhCQUFtQixFQUFJLGVBQWMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUkvQyxrQkFBTyxJQUFJLFNBQUMsQ0FBSztBQUNwQiw0QkFBb0IsRUFBQyxDQUFDO0FBQ3RCLGNBQU8sTUFBSSxDQUFDO09BQ2IsRUFBQztBQUdHLGtCQUFPLEVBQUksR0FBQyxDQUFDO0FBQ2pCLGNBQU8sU0FBUyxJQUFJLFNBQUMsRUFBQyxDQUFNO0FBQUUsZ0JBQU8sS0FBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRW5FLFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUlELFlBQVMsRUFBSSxXQUFVLENBQUMsU0FBVSxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQzVDLFFBQUcsSUFBSSxFQUFJLElBQUUsQ0FBQztBQUNkLFFBQUcsS0FBSyxFQUFJLEtBQUcsQ0FBQztHQUNqQixDQUFDLENBQUM7QUFDRixZQUFTLFNBQVMsSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUMvQixVQUFPLElBQUksV0FBVSxDQUFDLEtBQUksRUFBSSxNQUFJLENBQUcsT0FBSyxFQUFJLE9BQUssQ0FBQyxDQUFDO0dBQ3RELEVBQUM7QUFDRCxZQUFTLE9BQU8sSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUM3QixVQUFPLFlBQVcsQ0FBQyxFQUFDLEdBQUssWUFBVyxDQUFDLEVBQUMsR0FBSyxNQUFJLElBQU0sTUFBSSxHQUFLLE9BQUssSUFBTSxPQUFLLENBQUM7R0FDaEYsRUFBQztBQUlELFFBQUssRUFBSSxXQUFVLENBQUMsU0FBVSxNQUFLLENBQUcsTUFBSSxDQUFHO0FBQzVDLFFBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixRQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7R0FDbkIsQ0FBQyxDQUFDO0FBQ0YsUUFBSyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDekIsVUFBTyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxFQUFDLEdBQUssU0FBTyxJQUFNLFNBQU8sR0FBSyxRQUFNLElBQU0sUUFBTSxDQUFDO0dBQ3hGLEVBQUM7QUFHRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImRlbHRhLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlM2ZlNzhmMDgwNmU3YTZlYmE3YVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL3dpZGdldC5qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCdkZWx0YS1qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBhbXlXaWRnZXQsIFUsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyB0ZWxsIGRlbHRhLmpzIGFib3V0IGJsdWViaXJkXG5cdERNLnJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKFAucmVzb2x2ZSk7XG5cblx0Ly8gYWxsb3cgJyQuY2lyY3VpdGJvYXJkJyB0byBhY2NlcHQgcGx1Z2luc1xuXHR2YXIgZG0gPSBuZXcgRE0oKTtcblx0VS5leHRlbmQoVS5vYmplY3QoJCwgJ2NpcmN1aXRib2FyZCcpLCB7XG5cdFx0cGx1Z2luKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG5cdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW5cblx0XHRcdFx0cmV0dXJuIG5ldyBkbS5EZWx0YShwbHVnaW5PclNlbGVjdGlvbi5uYW1lLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byBzZWxlY3QgcGx1Z2lucyB0byBiZSBhcHBsaWVkXG5cdFx0XHRcdGRtLnNlbGVjdC5hcHBseShkbSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0XHRkZWZpbmVXaWRnZXRDbGFzc2VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyB0byBkZWZpbmUgdGhlIHdpZGdldCBjbGFzc2VzIGFmdGVyIHRoZSBwcm9wZXIgcGx1Z2lucyBoYXZlIGJlZW4gc2VsZWN0ZWRcblx0ZnVuY3Rpb24gZGVmaW5lV2lkZ2V0Q2xhc3NlcygpIHtcblx0XHRkbS52cCgnQ2lyY3VpdGJvYXJkJywgYW15V2lkZ2V0KCdDaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRjc3NDbGFzczogXCJjaXJjdWl0Ym9hcmRcIixcblx0XHRcdGZpbHRlcjogKCk9PlAucmVzb2x2ZSh0cnVlKSxcblx0XHRcdG1vZGVsOiBudWxsXG5cdFx0fSkpO1xuXG5cdFx0ZG0udnAoJ1RpbGVtYXAnLCBhbXlXaWRnZXQoJ1RpbGVtYXAnLCB7XG5cdFx0XHRjc3NDbGFzczogXCJ0aWxlbWFwXCIsXG5cdFx0XHRtb2RlbDogbnVsbCxcblx0XHRcdF9jaXJjdWl0Ym9hcmQ6IG51bGxcblx0XHR9KSk7XG5cblx0XHRkbS52cCgnVGlsZScsIGFteVdpZGdldCgnVGlsZScsIHtcblx0XHRcdGNzc0NsYXNzOiAndGlsZScsXG5cdFx0XHRtb2RlbDogbnVsbCxcblx0XHRcdF9jaXJjdWl0Ym9hcmQ6IG51bGxcblx0XHR9KSk7XG5cdH1cblxuXHQvLyBmb3IgZ2V0dGluZyB0aGUgcGx1Z2luIGdyYXBoXG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbi5ncmFwaCA9ICgpID0+IGRtLmdyYXBoKCk7XG5cblx0Ly8gcmV0dXJuIHRoZSBzdGF0aWMgYCQuY2lyY3VpdGJvYXJkYCBvYmplY3QsXG5cdC8vIHRocm91Z2ggd2hpY2ggcGx1Z2lucyBjYW4gYmUgYXBwbGllZCBhbmQgc2VsZWN0ZWRcblx0cmV0dXJuICQuY2lyY3VpdGJvYXJkO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvY2lyY3VpdGJvYXJkLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKiBhIGZ1bmN0aW9uIHRvIGFkZCBzaWduYWwgaGFuZGxpbmcgbWV0aG9kcyB0byBhbiBvYmplY3QgKi9cblx0ZnVuY3Rpb24gZW5hYmxlU2lnbmFsSGFuZGxpbmcob2JqKSB7XG5cblx0XHR2YXIgX2NhbGxiYWNrcyA9IHt9O1xuXG5cdFx0ZnVuY3Rpb24gX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpIHtcblx0XHRcdGlmICghX2NhbGxiYWNrc1tzaWduYWxdKSB7XG5cdFx0XHRcdF9jYWxsYmFja3Nbc2lnbmFsXSA9ICQuQ2FsbGJhY2tzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX2NhbGxiYWNrc1tzaWduYWxdO1xuXHRcdH1cblxuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0b24oc2lnbmFsLCBmbikgeyBfc2lnbmFsQ2FsbGJhY2tzKHNpZ25hbCkuYWRkKGZuKSB9LFxuXHRcdFx0b2ZmKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLnJlbW92ZShmbikgfSxcblx0XHRcdG9uZShzaWduYWwsIGZuKSB7XG5cdFx0XHRcdHZhciBwYWRkZWRGbiA9ICgpID0+IHtcblx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRcdHRoaXMub2ZmKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLm9uKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0fSxcblx0XHRcdG9uY2Uoc2lnbmFsLCBmbikgeyB0aGlzLm9uZShzaWduYWwsIGZuKSB9LFxuXHRcdFx0dHJpZ2dlcihzaWduYWwsIC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF9jYWxsYmFja3Nbc2lnbmFsXTtcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykgeyBjYWxsYmFja3MuZmlyZVdpdGgodGhpcywgYXJncykgfVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHQvKiBhIGZ1bmN0aW9uIHRvIGltcGxlbWVudCBhcnRlZmFjdCBoaWVyYXJjaHkgbWV0aG9kcyAqL1xuXHRmdW5jdGlvbiBkZWZpbmVIaWVyYXJjaHlNZXRob2RzKG9iaiwgdHlwZSkge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ3R5cGUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0eXBlIH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAncGFyZW50Jywge1xuXHRcdFx0c2V0KHBhcmVudCkge1xuXHRcdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHRcdFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKTtcblx0XHRcdH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdjaGlsZHJlbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIHx8IFtdIH1cblx0XHR9KTtcblx0XHQkLmV4dGVuZChvYmosIHtcblx0XHRcdGNsb3Nlc3RBbmNlc3RvckJ5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzO1xuXHRcdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRjbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdCh0aGlzLmNoaWxkcmVuIHx8IFtdKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHQvKiAgYSBmdW5jdGlvbiB0byBtYWtlIHNvbWUgaW1wb3J0YW50IHJlZmVyZW5jZXMgdGhhdCBhcmUgcGFydCAgKi9cblx0LyogIG9mIHRoZSBvcHRpb25zIHByb3BlcnR5IGF2YWlsYWJsZSBpbiB0aGUgb2JqZWN0IGl0c2VsZiAgICAgICovXG5cdGZ1bmN0aW9uIGRlZmluZURlZmF1bHRQcm9wZXJ0aWVzKG9iaikge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21vZGVsJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLm1vZGVsIH1cblx0XHR9KTtcblxuXHR9XG5cblx0LyogIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGFwaW5hdG9teSBjb21wb25lbnQgKHdpZGdldCkgICAgICAgICAgKi9cblx0LyogIGFzIGEgalF1ZXJ5IGVsZW1lbnQgcGx1Z2luOyB0aGlzIGlzIHJldHVybmVkIGZyb20gdGhlIG1vZHVsZSAgKi9cblx0ZnVuY3Rpb24gYW15V2lkZ2V0KHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cykge1xuXG5cdFx0LyogdGhlIHNwZWNpZmljIHdpZGdldCBjbGFzcyAqL1xuXHRcdGZ1bmN0aW9uIFdpZGdldCh7b3B0aW9ucywgZWxlbWVudH0pIHtcblxuXHRcdFx0JC5leHRlbmQodGhpcywge1xuXHRcdFx0XHRvcHRpb25zOiAkLmV4dGVuZCh7fSwgb3B0aW9uRGVmYXVsdHMsIG9wdGlvbnMpLFxuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRkZXN0cm95KCkgeyB0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKSB9XG5cdFx0XHR9KTtcblx0XHRcdGVuYWJsZVNpZ25hbEhhbmRsaW5nKHRoaXMpO1xuXG5cdFx0XHQvKiBzZXQgdGhlIGVsZW1lbnQgY2xhc3MgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY3NzQ2xhc3MpO1xuXHRcdFx0dGhpcy5lbGVtZW50Lm9uZSgncmVtb3ZlJywgKCkgPT4geyB0aGlzLmRlc3Ryb3koKSB9KTtcblxuXHRcdFx0LyogY29ubmVjdCB0byB0aGUgcGFyZW50IGFydGVmYWN0ICovXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnBhcmVudCkgeyB0aGlzLnBhcmVudCA9IHRoaXMub3B0aW9ucy5wYXJlbnQgfVxuXG5cdFx0XHQvKiBjYWNoZSBhIHJlZmVyZW5jZSB0byB0aGUgY2lyY3VpdGJvYXJkIChpdCBpcyB1c2VkIG9mdGVuKSAqL1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0Lyogd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/ICovXG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKCk7XG5cdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLm9wdGlvbnMuYmVmb3JlQ29uc3RydWN0aW9uKTtcblxuXHRcdFx0LyogIGlmIHByZXNlbnQsIHJ1biB0aGUgY29uc3RydWN0IG1ldGhvZCBhZnRlciAgICAqL1xuXHRcdFx0LyogYHRoaXMub3B0aW9ucy5iZWZvcmVDb25zdHJ1Y3Rpb25gIGlzIGZpbmlzaGVkICAqL1xuXHRcdFx0LyogIGFuZCB0aGVuIHdhaXQgb24gaXQgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdCgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0XHRXaWRnZXQucHJvdG90eXBlLmJlZm9yZUNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGJlZm9yZUNvbnN0cnVjdGlvbihwb3NzaWJsZVByb21pc2UpIHtcblx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkXG5cdFx0XHRcdFx0LnJldHVybihQLnJlc29sdmUocG9zc2libGVQcm9taXNlKSlcblx0XHRcdFx0XHQucmV0dXJuKHRoaXMpO1xuXHRcdH07XG5cblx0XHRkZWZpbmVEZWZhdWx0UHJvcGVydGllcyhXaWRnZXQucHJvdG90eXBlKTtcblx0XHRkZWZpbmVIaWVyYXJjaHlNZXRob2RzKFdpZGdldC5wcm90b3R5cGUsIHR5cGVOYW1lKTtcblxuXHRcdC8qIG5vdyBkZWZpbmUgdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiBhcyBhIGpRdWVyeSBwbHVnaW4gKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IHR5cGVOYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyB0eXBlTmFtZS5zbGljZSgxKTtcblx0XHQkLmZuW2xvd2VyY2FzZU5hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdC8qIGlmIHRoZSB3b3JkICdpbnN0YW5jZScgaXMgcGFzc2VkLCByZXR1cm4gdGhlIChhbHJlYWR5IGNyZWF0ZWQpIHdpZGdldCBwcm9taXNlICovXG5cdFx0XHRpZiAob3B0aW9ucyA9PT0gJ2luc3RhbmNlJykgeyByZXR1cm4gdGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gKSB9XG5cblx0XHRcdC8qIGVsc2UsIGNyZWF0ZSBhIG5ldyB3aWRnZXQgYW5kIHNldCBhIHByb21pc2UgdG8gaXQgKi9cblx0XHRcdHZhciBuZXdXaWRnZXQgPSBuZXcgV2lkZ2V0KHsgb3B0aW9uczogb3B0aW9ucywgZWxlbWVudDogdGhpcyB9KTtcblx0XHRcdHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCwgbmV3V2lkZ2V0LmNvbnN0cnVjdGVkKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb24gKi9cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm4gdGhlIHdpZGdldCBhcnRlZmFjdCBjbGFzcyAqL1xuXHRcdHJldHVybiBXaWRnZXQ7XG5cblx0fVxuXG5cdHJldHVybiBhbXlXaWRnZXQ7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC93aWRnZXQuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gbmFtZSAobWFuZGF0b3J5KSAgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly8gb3B0aW9ucy5pbml0aWFsICAgIC0gdGhlIGluaXRpYWwgdmFsdWU7IGRlZmF1bHRzIHRvIHVuZGVmaW5lZFxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIG5hbWUsIHtpbml0aWFsLCB2YWxpZGF0aW9ufSA9IHt9KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmICghaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKGNhY2hlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlKTtcblxuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UucHVzaChjYik7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHBvc2l0aW9uXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHNpemVcblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiY2lyY3VpdGJvYXJkLmpzIn0=