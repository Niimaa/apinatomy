(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-active',
	    requires: ['tile-core']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    if (!this.model) {
	      return;
	    }
	    U.array(this.model, '_p_tileActive_amyActiveTileQueue').push(this);
	    this.on('destroy', (function() {
	      var index = $__0.model._p_tileActive_amyActiveTileQueue.indexOf($__0);
	      $__0.model._p_tileActive_amyActiveTileQueue.splice(index, 1);
	    }));
	    Object.defineProperty(this, 'active', {
	      get: function() {
	        return this.model._p_tileActive_amyActiveTileQueue[0] === this;
	      },
	      set: function(shouldBeActive) {
	        if (shouldBeActive) {
	          var index = this.model._p_tileActive_amyActiveTileQueue.indexOf(this);
	          if (index !== 0) {
	            this.model._p_tileActive_amyActiveTileQueue.splice(index, 1);
	            this.model._p_tileActive_amyActiveTileQueue.unshift(this);
	            this.model._p_tileActive_amyActiveTileQueue[1].trigger('active', false);
	            this.model._p_tileActive_amyActiveTileQueue[0].trigger('active', true);
	          }
	        } else {
	          throw new Error("You can't directly set tile activeness to false.");
	        }
	      }
	    });
	    this.on('active', (function() {
	      $__0.element.toggleClass('active', $__0.active);
	    }));
	    this.trigger('active', this.active);
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MWMzNDUyMzJlNjAwY2JlZDU3NCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtYWN0aXZlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBZ0IsQ0FBRywwQ0FBVSxFQUFHO0FBQ2pELGNBQVcsQ0FBQztBQUVSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsY0FBWTtBQUNsQixZQUFPLENBQUcsRUFBQyxXQUFVLENBQUM7QUFBQSxHQUN2QixDQUFDLE9BQVEsQ0FBQyxnQkFBZSxDQUFDLENBQUM7QUFNM0IsUUFBSyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBR3BDLFFBQUksQ0FBQyxJQUFHLE1B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LFNBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBTTtBQUFFLGdCQUFPLEVBQUksR0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRS9ELFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTFjMzQ1MjMyZTYwMGNiZWQ1NzRcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aWxlLWFjdGl2ZScsXG5cdFx0cmVxdWlyZXM6IFsndGlsZS1jb3JlJ11cblx0fSkubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpO1xuXG5cdC8vXG5cdC8vIEZvciBhbGwgdGlsZXMgdGhhdCBzaGFyZSB0aGUgc2FtZSBtb2RlbCwgb25seSBvbmUgY2FuIGJlIGBhY3RpdmVgLlxuXHQvLyBJZiBvbmUgb2YgdGhlbSBpcyB2aXNpYmxlLCBvbmUgb2YgdGhlbSBpcyBhY3RpdmUuXG5cdC8vXG5cdHBsdWdpbi5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIG9ubHkgaW50ZXJlc3RpbmcgaWYgdGhlIHRpbGUgaGFzIGEgbW9kZWxcblx0XHRpZiAoIXRoaXMubW9kZWwpIHsgcmV0dXJuIH1cblxuXHRcdC8vIHB1dCB0aGlzIHRpbGUgaW4gdGhlIHF1ZXVlIG9mIHBvdGVudGlhbGx5IGFjdGl2ZSB0aWxlc1xuXHRcdFUuYXJyYXkodGhpcy5tb2RlbCwgJ19wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlJykucHVzaCh0aGlzKTtcblx0XHR0aGlzLm9uKCdkZXN0cm95JywgKCk9PiB7XG5cdFx0XHR2YXIgaW5kZXggPSB0aGlzLm1vZGVsLl9wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlLmluZGV4T2YodGhpcyk7XG5cdFx0XHR0aGlzLm1vZGVsLl9wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG5cdFx0fSk7XG5cblx0XHQvLyBtYWtlIHRoZSAnYWN0aXZlJyBwcm9wZXJ0eSBhdmFpbGFibGVcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2FjdGl2ZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWVbMF0gPT09IHRoaXMgfSxcblx0XHRcdHNldChzaG91bGRCZUFjdGl2ZSkge1xuXHRcdFx0XHRpZiAoc2hvdWxkQmVBY3RpdmUpIHtcblx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGlzLm1vZGVsLl9wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlLmluZGV4T2YodGhpcyk7XG5cdFx0XHRcdFx0aWYgKGluZGV4ICE9PSAwKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm1vZGVsLl9wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0XHR0aGlzLm1vZGVsLl9wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlLnVuc2hpZnQodGhpcyk7XG5cdFx0XHRcdFx0XHR0aGlzLm1vZGVsLl9wX3RpbGVBY3RpdmVfYW15QWN0aXZlVGlsZVF1ZXVlWzFdLnRyaWdnZXIoJ2FjdGl2ZScsIGZhbHNlKTtcblx0XHRcdFx0XHRcdHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWVbMF0udHJpZ2dlcignYWN0aXZlJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4ndCBkaXJlY3RseSBzZXQgdGlsZSBhY3RpdmVuZXNzIHRvIGZhbHNlLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gYXV0b21hdGljYWxseSAodW4pc2V0IHRoZSBDU1MgY2xhc3MgJ2FjdGl2ZSdcblx0XHR0aGlzLm9uKCdhY3RpdmUnLCAoKSA9PiB7IHRoaXMuZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJywgdGhpcy5hY3RpdmUpIH0pO1xuXG5cdFx0Ly8gaW5pdGlhbCAnYWN0aXZlJyBzaWduYWxcblx0XHR0aGlzLnRyaWdnZXIoJ2FjdGl2ZScsIHRoaXMuYWN0aXZlKTtcblxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRpbGUtYWN0aXZlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdC8vXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0Ly9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0Ly9cblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1hY3RpdmUuanMifQ==