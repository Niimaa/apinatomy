(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("delta-js")) : factory(root["jQuery"], root["P"], root["DeltaJs"]);
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
	  var dm = new DM();
	  U.extend(U.object($, 'circuitboard'), {plugin: function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return dm.register(pluginOrSelection);
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
	        superClass.prototype.constructor.apply(this, args);
	        constructor.apply(this, args);
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
	          func.apply(context, args);
	        }
	      };
	    },
	    observable: function(obj, $__4) {
	      var $__5 = $__4,
	          name = $__5.name,
	          initial = $__5.initial,
	          validation = $__5.validation;
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYTZiODFmYTM1NTUyNDlkMjQwZiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhSnNcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC93aWRnZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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QSxTQUNEO0FBQUEsT0FDRCxDQUFDLENBQUM7S0FDSDtBQU9BLFVBQUssQ0FBTCxVQUFPLE9BQU07QUFJUixrQkFBTyxFQUFJLFFBQU0sU0FBUztBQUM1QixpQkFBTSxFQUFJLFFBQU0sUUFBUSxHQUFLLEdBQUMsU0FBQyxFQUFHO2tCQUFNLEVBQUMsS0FBTSxHQUFDO1dBQUEsRUFBQyxDQUFDO0FBS2hELGVBQUksQ0FBQztBQUNULGNBQVMsU0FBTyxDQUFFLENBQUU7QUFDZixvQkFBTyxFQUFJLE1BQUksQ0FBQztBQUNwQixhQUFJLEVBQUksU0FBUSxFQUFDLENBQUM7QUFDbEIsWUFBSSxRQUFPLEdBQUssRUFBQyxPQUFPLENBQUMsS0FBSSxDQUFHLFNBQU8sQ0FBQyxDQUFHO0FBQzFDLGtCQUFRLENBQUMsS0FBSSxDQUFHLFNBQU8sQ0FBQyxDQUFDO1NBQzFCO0FBQUEsT0FDRDtBQUNBLGdCQUFVLENBQUMsUUFBTyxDQUFHLEdBQUMsQ0FBQztBQU1uQiw4QkFBbUIsRUFBSSxlQUFjLENBQUMsUUFBTyxDQUFDLENBQUM7QUFNL0Msa0JBQU8sSUFBSSxTQUFDLENBQUs7QUFDcEIsNEJBQW9CLEVBQUMsQ0FBQztBQUN0QixjQUFPLE1BQUksQ0FBQztPQUNiLEVBQUM7QUFNRyxrQkFBTyxDQUFDO0FBQ1osY0FBTyxTQUFTLElBQUksU0FBQyxFQUFDLENBQU07QUFBRSxnQkFBTyxFQUFJLEdBQUMsQ0FBQztBQUFFLGNBQU8sU0FBTyxDQUFDO09BQUUsRUFBQztBQUUvRCxZQUFPLFNBQU8sQ0FBQztLQUNoQjtHQUVELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImRlbHRhLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJEZWx0YUpzXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxYTZiODFmYTM1NTUyNDlkMjQwZlxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL3dpZGdldC5qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCdkZWx0YS1qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBhbXlXaWRnZXQsIFUsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyBhbGxvdyAnJC5jaXJjdWl0Ym9hcmQnIHRvIGFjY2VwdCBwbHVnaW5zXG5cdHZhciBkbSA9IG5ldyBETSgpO1xuXHRVLmV4dGVuZChVLm9iamVjdCgkLCAnY2lyY3VpdGJvYXJkJyksIHtcblx0XHRwbHVnaW4ocGx1Z2luT3JTZWxlY3Rpb24pIHtcblx0XHRcdGlmICgkLmlzUGxhaW5PYmplY3QocGx1Z2luT3JTZWxlY3Rpb24pKSB7XG5cdFx0XHRcdC8vLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVnaXN0ZXIgYSBuZXcgcGx1Z2luXG5cdFx0XHRcdHJldHVybiBkbS5yZWdpc3RlcihwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLy8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHNlbGVjdCBwbHVnaW5zIHRvIGJlIGFwcGxpZWRcblx0XHRcdFx0ZG0uc2VsZWN0LmFwcGx5KGRtLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHRcdGRlZmluZVdpZGdldENsYXNzZXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8vIHRvIGRlZmluZSB0aGUgd2lkZ2V0IGNsYXNzZXMgYWZ0ZXIgdGhlIHByb3BlciBwbHVnaW5zIGhhdmUgYmVlbiBzZWxlY3RlZFxuXHRmdW5jdGlvbiBkZWZpbmVXaWRnZXRDbGFzc2VzKCkge1xuXHRcdGRtLnZwKCdDaXJjdWl0Ym9hcmQnLCBhbXlXaWRnZXQoJ0NpcmN1aXRib2FyZCcsIHtcblx0XHRcdGNzc0NsYXNzOiBcImNpcmN1aXRib2FyZFwiLFxuXHRcdFx0ZmlsdGVyOiAoKT0+UC5yZXNvbHZlKHRydWUpLFxuXHRcdFx0bW9kZWw6IG51bGxcblx0XHR9KSk7XG5cblx0XHRkbS52cCgnVGlsZW1hcCcsIGFteVdpZGdldCgnVGlsZW1hcCcsIHtcblx0XHRcdGNzc0NsYXNzOiBcInRpbGVtYXBcIixcblx0XHRcdG1vZGVsOiBudWxsLFxuXHRcdFx0X2NpcmN1aXRib2FyZDogbnVsbFxuXHRcdH0pKTtcblxuXHRcdGRtLnZwKCdUaWxlJywgYW15V2lkZ2V0KCdUaWxlJywge1xuXHRcdFx0Y3NzQ2xhc3M6ICd0aWxlJyxcblx0XHRcdG1vZGVsOiBudWxsLFxuXHRcdFx0X2NpcmN1aXRib2FyZDogbnVsbFxuXHRcdH0pKTtcblx0fVxuXG5cdC8vIGZvciBnZXR0aW5nIHRoZSBwbHVnaW4gZ3JhcGhcblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luLmdyYXBoID0gKCkgPT4gZG0uZ3JhcGgoKTtcblxuXHQvLyByZXR1cm4gdGhlIHN0YXRpYyBgJC5jaXJjdWl0Ym9hcmRgIG9iamVjdCxcblx0Ly8gdGhyb3VnaCB3aGljaCBwbHVnaW5zIGNhbiBiZSBhcHBsaWVkIGFuZCBzZWxlY3RlZFxuXHRyZXR1cm4gJC5jaXJjdWl0Ym9hcmQ7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhSnNcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gYWRkIHNpZ25hbCBoYW5kbGluZyBtZXRob2RzIHRvIGFuIG9iamVjdFxuXHQvL1xuXHRmdW5jdGlvbiBlbmFibGVTaWduYWxIYW5kbGluZyhvYmopIHtcblx0XHR2YXIgX2NhbGxiYWNrcyA9IHt9O1xuXG5cdFx0ZnVuY3Rpb24gX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpIHtcblx0XHRcdGlmICghX2NhbGxiYWNrc1tzaWduYWxdKSB7XG5cdFx0XHRcdF9jYWxsYmFja3Nbc2lnbmFsXSA9ICQuQ2FsbGJhY2tzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX2NhbGxiYWNrc1tzaWduYWxdO1xuXHRcdH1cblxuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0b24oc2lnbmFsLCBmbikgeyBfc2lnbmFsQ2FsbGJhY2tzKHNpZ25hbCkuYWRkKGZuKSB9LFxuXHRcdFx0b2ZmKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLnJlbW92ZShmbikgfSxcblx0XHRcdG9uZShzaWduYWwsIGZuKSB7XG5cdFx0XHRcdHZhciBwYWRkZWRGbiA9ICgpID0+IHtcblx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRcdHRoaXMub2ZmKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLm9uKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0fSxcblx0XHRcdG9uY2Uoc2lnbmFsLCBmbikgeyB0aGlzLm9uZShzaWduYWwsIGZuKSB9LFxuXHRcdFx0dHJpZ2dlcihzaWduYWwsIC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF9jYWxsYmFja3Nbc2lnbmFsXTtcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykgeyBjYWxsYmFja3MuZmlyZVdpdGgodGhpcywgYXJncykgfVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBpbXBsZW1lbnQgYXJ0ZWZhY3QgaGllcmFyY2h5IG1ldGhvZHNcblx0Ly9cblx0ZnVuY3Rpb24gZGVmaW5lSGllcmFyY2h5TWV0aG9kcyhvYmosIHR5cGUpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAndHlwZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHR5cGUgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdwYXJlbnQnLCB7XG5cdFx0XHRzZXQocGFyZW50KSB7XG5cdFx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdFx0VS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuXHRcdFx0fSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ2NoaWxkcmVuJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfVxuXHRcdH0pO1xuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0KHRoaXMuY2hpbGRyZW4gfHwgW10pLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIG1ha2Ugc29tZSBpbXBvcnRhbnQgcmVmZXJlbmNlcyB0aGF0IGFyZSBwYXJ0XG5cdC8vIG9mIHRoZSBvcHRpb25zIHByb3BlcnR5IGF2YWlsYWJsZSBpbiB0aGUgb2JqZWN0IGl0c2VsZlxuXHQvL1xuXHRmdW5jdGlvbiBkZWZpbmVEZWZhdWx0UHJvcGVydGllcyhvYmopIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbW9kZWwnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KVxuXHQvLyBhcyBhIGpRdWVyeSBlbGVtZW50IHBsdWdpbjsgdGhpcyBpcyByZXR1cm5lZCBmcm9tIHRoZSBtb2R1bGVcblx0Ly9cblx0ZnVuY3Rpb24gYW15V2lkZ2V0KHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cykge1xuXHRcdC8vXG5cdFx0Ly8gdGhlIHNwZWNpZmljIHdpZGdldCBjbGFzc1xuXHRcdC8vXG5cdFx0ZnVuY3Rpb24gV2lkZ2V0KHtvcHRpb25zLCBlbGVtZW50fSkge1xuXHRcdFx0JC5leHRlbmQodGhpcywge1xuXHRcdFx0XHRvcHRpb25zOiAkLmV4dGVuZCh7fSwgb3B0aW9uRGVmYXVsdHMsIG9wdGlvbnMpLFxuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRkZXN0cm95KCkgeyB0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKSB9XG5cdFx0XHR9KTtcblx0XHRcdGVuYWJsZVNpZ25hbEhhbmRsaW5nKHRoaXMpO1xuXG5cdFx0XHQvLy8vIHNldCB0aGUgZWxlbWVudCBjbGFzc1xuXHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5jc3NDbGFzcyk7XG5cdFx0XHR0aGlzLmVsZW1lbnQub25lKCdyZW1vdmUnLCAoKSA9PiB7IHRoaXMuZGVzdHJveSgpIH0pO1xuXG5cdFx0XHQvLy8vIGNvbm5lY3QgdG8gdGhlIHBhcmVudCBhcnRlZmFjdFxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5wYXJlbnQpIHsgdGhpcy5wYXJlbnQgPSB0aGlzLm9wdGlvbnMucGFyZW50IH1cblxuXHRcdFx0Ly8vLyBjYWNoZSBhIHJlZmVyZW5jZSB0byB0aGUgY2lyY3VpdGJvYXJkIChpdCBpcyB1c2VkIG9mdGVuKVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8vLyB3YWl0IGZvciBzb21ldGhpbmcgYmVmb3JlIGNvbnN0cnVjdGlvbiAobGlrZSBwbHVnaW5zKT9cblx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSBQLnJlc29sdmUoKTtcblx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMub3B0aW9ucy5iZWZvcmVDb25zdHJ1Y3Rpb24pO1xuXG5cdFx0XHQvLy8vIGlmIHByZXNlbnQsIHJ1biB0aGUgY29uc3RydWN0IG1ldGhvZCBhZnRlclxuXHRcdFx0Ly8vLyBgdGhpcy5vcHRpb25zLmJlZm9yZUNvbnN0cnVjdGlvbmAgaXMgZmluaXNoZWRcblx0XHRcdC8vLy8gYW5kIHRoZW4gd2FpdCBvbiBpdFxuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdCgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0V2lkZ2V0LnByb3RvdHlwZS5iZWZvcmVDb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdC5yZXR1cm4oUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSkpXG5cdFx0XHRcdFx0LnJldHVybih0aGlzKTtcblx0XHR9O1xuXG5cdFx0ZGVmaW5lRGVmYXVsdFByb3BlcnRpZXMoV2lkZ2V0LnByb3RvdHlwZSk7XG5cdFx0ZGVmaW5lSGllcmFyY2h5TWV0aG9kcyhXaWRnZXQucHJvdG90eXBlLCB0eXBlTmFtZSk7XG5cblx0XHQvL1xuXHRcdC8vIG5vdyBkZWZpbmUgdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiBhcyBhIGpRdWVyeSBwbHVnaW5cblx0XHQvL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gdHlwZU5hbWVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGVOYW1lLnNsaWNlKDEpO1xuXHRcdCQuZm5bbG93ZXJjYXNlTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0Ly8vLyBpZiB0aGUgd29yZCAnaW5zdGFuY2UnIGlzIHBhc3NlZCwgcmV0dXJuIHRoZSAoYWxyZWFkeSBjcmVhdGVkKSB3aWRnZXQgcHJvbWlzZVxuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdpbnN0YW5jZScpIHsgcmV0dXJuIHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCkgfVxuXG5cdFx0XHQvLy8vIGVsc2UsIGNyZWF0ZSBhIG5ldyB3aWRnZXQgYW5kIHNldCBhIHByb21pc2UgdG8gaXRcblx0XHRcdHZhciBuZXdXaWRnZXQgPSBuZXcgV2lkZ2V0KHsgb3B0aW9uczogb3B0aW9ucywgZWxlbWVudDogdGhpcyB9KTtcblx0XHRcdHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCwgbmV3V2lkZ2V0LmNvbnN0cnVjdGVkKTtcblxuXHRcdFx0Ly8vLyByZXR1cm4gdGhlIGpRdWVyeSBlbGVtZW50IGluc3RhbmNlLCBieSBqUXVlcnkgY29udmVudGlvblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdC8vLy8gcmV0dXJuIHRoZSB3aWRnZXQgYXJ0ZWZhY3QgY2xhc3Ncblx0XHRyZXR1cm4gV2lkZ2V0O1xuXHR9XG5cblx0cmV0dXJuIGFteVdpZGdldDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3dpZGdldC5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGVxdWFsaXR5IHdpdGggYSB0b2xlcmFuY2Ugb2YgZXBzaWxvblxuXHRcdGFwcHJveCh2YWwxLCB2YWwyLCBlcHNpbG9uKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChlcHNpbG9uKSkgeyBlcHNpbG9uID0gMWUtNSB9XG5cdFx0XHRyZXR1cm4gKE1hdGguYWJzKHZhbDEgLSB2YWwyKSA8IGVwc2lsb24pO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gYEEuZm9yRWFjaGAsIGV4Y2VwdCBpdCBpdGVyYXRlcyBmcm9tIHJpZ2h0IHRvIGxlZnRcblx0XHRmb3JFYWNoUmV2ZXJzZShBLCBmbikge1xuXHRcdFx0dmFyIGkgPSBBLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHsgZm4oQVtpXSwgaSwgQSkgfVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhlIGdpdmVuIG9iamVjdDtcblx0XHQvLyB0aGlzIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmUgYSBgdHJpZ2dlcmAgbWV0aG9kXG5cdFx0Ly9cblx0XHQvLyBvcHRpb25zLm5hbWUgKG1hbmRhdG9yeSkgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcblx0XHQvLyBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgb3IgYW55IHRyYW5zZm9ybWF0aW9uLiBJdCBjYW4gYWxzbyB0aHJvdyBhbiBleGNlcHRpb24sIHdoaWNoIHdpbGwganVzdCBiZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLlxuXHRcdG9ic2VydmFibGUob2JqLCB7bmFtZSwgaW5pdGlhbCwgdmFsaWRhdGlvbn0pIHtcblx0XHRcdHZhciB2YWx1ZSA9IGluaXRpYWw7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH0sXG5cdFx0XHRcdHNldChuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdGlmICh2YWxpZGF0aW9uKSB7IG5ld1ZhbHVlID0gdmFsaWRhdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIH1cblx0XHRcdFx0XHRpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKG5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuXG5cdFx0Ly8gSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhIGNhY2hlXG5cdFx0Ly8gdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWVcblx0XHQvLyBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duXG5cdFx0Ly8gY29tcGFyaXNvbiBmdW5jdGlvbi5cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlXG5cdFx0XHQvL1xuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdC8vIE5PVEU6IG9ubHkgb25lIGNhbGxiYWNrIGlzIHN0b3JlZCFcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNpcmN1aXRib2FyZC5qcyJ9