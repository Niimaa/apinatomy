(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird")) : factory(root["jQuery"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	    name: 'tile-open-active',
	    resolves: ['tile-open', 'tile-active']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    if (U.isUndefined(this.active)) {
	      return;
	    }
	    this.observe('open', (function(open) {
	      if (open) {
	        $__0.active = true;
	      }
	    }));
	    this.observe('active', (function(active) {
	      if (!active) {
	        $__0.open = false;
	      }
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
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
	    newSubclass: function(superClass, constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, [superClass.prototype.constructor].concat(args));
	      };
	      cls.prototype = Object.create(superClass.prototype, prototype);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ZGE1Zjc5MmE3ZjBkN2VjMTdjNSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtb3Blbi1hY3RpdmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVUsd0JBQWdCLENBQUcsMENBQVUsRUFBRztBQUNqRCxjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLG1CQUFpQjtBQUN2QixZQUFPLENB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O0FBQ0YsUUFBSyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDekIsVUFBTyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxFQUFDLEdBQUssU0FBTyxJQUFNLFNBQU8sR0FBSyxRQUFNLElBQU0sUUFBTSxDQUFDO0dBQ3hGLEVBQUM7QUFHRCxRQUFPLEdBQUM7QUFFVCxpSkFBRTtBQUNGOzs7Ozs7O0FHclJBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWRhNWY3OTJhN2YwZDdlYzE3YzVcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtb3Blbi1hY3RpdmUnLFxuXHRcdHJlc29sdmVzOiBbJ3RpbGUtb3BlbicsICd0aWxlLWFjdGl2ZSddXG5cdH0pLm1vZGlmeSgnVGlsZS5wcm90b3R5cGUnKTtcblxuXG5cdC8qIG1ha2VzIGEgdGlsZSBhY3RpdmUgd2hlbiBpdCBpcyBvcGVuLCBhbmQgY2xvc2VzIHRpbGVzIHRoYXQgYXJlIGRlYWN0aXZhdGVkICovXG5cdHBsdWdpbi5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qIG9ubHkgaW50ZXJlc3RpbmcgaWYgdGhlIHRpbGUgaGFzIGFuIGBhY3RpdmVgIHByb3BlcnR5ICovXG5cdFx0aWYgKFUuaXNVbmRlZmluZWQodGhpcy5hY3RpdmUpKSB7IHJldHVybjsgfVxuXG5cdFx0Lyogd2hlbiBhIHRpbGUgaXMgb3BlbmVkLCBpdCBiZWNvbWVzIGFjdGl2ZSAqL1xuXHRcdHRoaXMub2JzZXJ2ZSgnb3BlbicsIChvcGVuKSA9PiB7XG5cdFx0XHRpZiAob3BlbikgeyB0aGlzLmFjdGl2ZSA9IHRydWUgfVxuXHRcdH0pO1xuXG5cdFx0Lyogd2hlbiBhIHRpbGUgaXMgZGUtYWN0aXZhdGVkLCBpdCBiZWNvbWVzIGNsb3NlZCAqL1xuXHRcdHRoaXMub2JzZXJ2ZSgnYWN0aXZlJywgKGFjdGl2ZSkgPT4ge1xuXHRcdFx0aWYgKCFhY3RpdmUpIHsgdGhpcy5vcGVuID0gZmFsc2UgfVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRpbGUtb3Blbi1hY3RpdmUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcl0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblxuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVGbiA9ICgpID0+IHtcblx0XHRcdFx0aWYgKHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkKSB7XG5cdFx0XHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRkZWxldGUgdW5zdWJzY3JpYmVGbi51bnN1YnNjcmliZU9uO1xuXHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0dW5zdWJzY3JpYmVGbi51bnN1YnNjcmliZU9uID0gKHN1YnNjcmliZXIpID0+IHtcblx0XHRcdFx0c3Vic2NyaWJlcih1bnN1YnNjcmliZUZuKTtcblx0XHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdG9wdGlvbmFsQ3VycnkoZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChmbi5sZW5ndGggPD0gYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBVLmJpbmRBKGZuLCB0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1vcGVuLWFjdGl2ZS5qcyJ9