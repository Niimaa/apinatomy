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
	    requires: ['core']
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
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return a && b && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Position.equals = (function(a, b) {
	    return a && b && a.height === b.height && a.width === b.width;
	  });
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ZDM3ZWU5YTYwMmEzYzEyYWYzZCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtYWN0aXZlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBZ0IsQ0FBRywwQ0FBVSxFQUFHO0FBQ2pELGNBQVcsQ0FBQztBQUVSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsY0FBWTtBQUNsQixZQUFPLENBQUcsRUFBQyxNQUFLLENBQUM7QUFBQSxHQUNsQixDQUFDLE9BQVEsQ0FBQyxnQkFBZSxDQUFDLENBQUM7QUFNM0IsUUFBSyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBR3BDLFFBQUksQ0FBQyxJQUFHLE1B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LFNBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBTTtBQUFFLGdCQUFPLEVBQUksR0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRS9ELFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUlELFlBQVMsRUFBSSxXQUFVLENBQUMsU0FBVSxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQzVDLFFBQUcsSUFBSSxFQUFJLElBQUUsQ0FBQztBQUNkLFFBQUcsS0FBSyxFQUFJLEtBQUcsQ0FBQztHQUNqQixDQUFDLENBQUM7QUFDRixZQUFTLFNBQVMsSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUMvQixVQUFPLElBQUksV0FBVSxDQUFDLEtBQUksRUFBSSxNQUFJLENBQUcsT0FBSyxFQUFJLE9BQUssQ0FBQyxDQUFDO0dBQ3RELEVBQUM7QUFDRCxZQUFTLE9BQU8sSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUM3QixVQUFPLEtBQUssS0FBSyxNQUFJLElBQU0sTUFBSSxHQUFLLE9BQUssSUFBTSxPQUFLLENBQUM7R0FDdEQsRUFBQztBQUlELFFBQUssRUFBSSxXQUFVLENBQUMsU0FBVSxNQUFLLENBQUcsTUFBSSxDQUFHO0FBQzVDLFFBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixRQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7R0FDbkIsQ0FBQyxDQUFDO0FBQ0YsWUFBUyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDN0IsVUFBTyxLQUFLLEtBQUssU0FBTyxJQUFNLFNBQU8sR0FBSyxRQUFNLElBQU0sUUFBTSxDQUFDO0dBQzlELEVBQUM7QUFHRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVkMzdlZTlhNjAyYTNjMTJhZjNkXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1hY3RpdmUnLFxuXHRcdHJlcXVpcmVzOiBbJ2NvcmUnXVxuXHR9KS5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJyk7XG5cblx0Ly9cblx0Ly8gRm9yIGFsbCB0aWxlcyB0aGF0IHNoYXJlIHRoZSBzYW1lIG1vZGVsLCBvbmx5IG9uZSBjYW4gYmUgYGFjdGl2ZWAuXG5cdC8vIElmIG9uZSBvZiB0aGVtIGlzIHZpc2libGUsIG9uZSBvZiB0aGVtIGlzIGFjdGl2ZS5cblx0Ly9cblx0cGx1Z2luLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gb25seSBpbnRlcmVzdGluZyBpZiB0aGUgdGlsZSBoYXMgYSBtb2RlbFxuXHRcdGlmICghdGhpcy5tb2RlbCkgeyByZXR1cm4gfVxuXG5cdFx0Ly8gcHV0IHRoaXMgdGlsZSBpbiB0aGUgcXVldWUgb2YgcG90ZW50aWFsbHkgYWN0aXZlIHRpbGVzXG5cdFx0VS5hcnJheSh0aGlzLm1vZGVsLCAnX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWUnKS5wdXNoKHRoaXMpO1xuXHRcdHRoaXMub24oJ2Rlc3Ryb3knLCAoKT0+IHtcblx0XHRcdHZhciBpbmRleCA9IHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWUuaW5kZXhPZih0aGlzKTtcblx0XHRcdHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWUuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR9KTtcblxuXHRcdC8vIG1ha2UgdGhlICdhY3RpdmUnIHByb3BlcnR5IGF2YWlsYWJsZVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYWN0aXZlJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5tb2RlbC5fcF90aWxlQWN0aXZlX2FteUFjdGl2ZVRpbGVRdWV1ZVswXSA9PT0gdGhpcyB9LFxuXHRcdFx0c2V0KHNob3VsZEJlQWN0aXZlKSB7XG5cdFx0XHRcdGlmIChzaG91bGRCZUFjdGl2ZSkge1xuXHRcdFx0XHRcdHZhciBpbmRleCA9IHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWUuaW5kZXhPZih0aGlzKTtcblx0XHRcdFx0XHRpZiAoaW5kZXggIT09IDApIHtcblx0XHRcdFx0XHRcdHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWUuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWUudW5zaGlmdCh0aGlzKTtcblx0XHRcdFx0XHRcdHRoaXMubW9kZWwuX3BfdGlsZUFjdGl2ZV9hbXlBY3RpdmVUaWxlUXVldWVbMV0udHJpZ2dlcignYWN0aXZlJywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0dGhpcy5tb2RlbC5fcF90aWxlQWN0aXZlX2FteUFjdGl2ZVRpbGVRdWV1ZVswXS50cmlnZ2VyKCdhY3RpdmUnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbid0IGRpcmVjdGx5IHNldCB0aWxlIGFjdGl2ZW5lc3MgdG8gZmFsc2UuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBhdXRvbWF0aWNhbGx5ICh1bilzZXQgdGhlIENTUyBjbGFzcyAnYWN0aXZlJ1xuXHRcdHRoaXMub24oJ2FjdGl2ZScsICgpID0+IHsgdGhpcy5lbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCB0aGlzLmFjdGl2ZSkgfSk7XG5cblx0XHQvLyBpbml0aWFsICdhY3RpdmUnIHNpZ25hbFxuXHRcdHRoaXMudHJpZ2dlcignYWN0aXZlJywgdGhpcy5hY3RpdmUpO1xuXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGlsZS1hY3RpdmUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcl0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gc3RvcEVhY2hBbmltYXRpb25GcmFtZSgpIHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gb3B0aW9ucy5uYW1lIChtYW5kYXRvcnkpIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly8gb3B0aW9ucy52YWxpZGF0aW9uIC0gaWYgc3BlY2lmaWVkLCB0aGlzIGZ1bmN0aW9uIGlzIHJ1biBiZWZvcmUgYSBuZXcgdmFsdWUgaXMgYWN0dWFsbHkgc2V0LlxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIEl0IGlzIHBhc3NlZCB0aGUgbmV3IHZhbHVlIGFuZCB0aGUgb2xkIHZhbHVlLCBhbmQgc2hvdWxkIHJldHVybiB0aGUgYWN0dWFsXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgdmFsdWUgdGhhdCBzaG91bGQgYmUgc2V0LiBUaGlzIGNvdWxkIGJlIHRoZSBuZXcgb3Igb2xkIHZhbHVlIGRpcmVjdGx5LFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIG9yIGFueSB0cmFuc2Zvcm1hdGlvbi4gSXQgY2FuIGFsc28gdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaCB3aWxsIGp1c3QgYmVcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBhbGxvd2VkIHRvIHBhc3MgdGhyb3VnaC4gUmV0dXJuaW5nIHRoZSBvbGQgdmFsdWUgcHJldmVudHMgYSBzaWduYWwgZnJvbVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGJlaW5nIHRyaWdnZXJlZC5cblx0XHRvYnNlcnZhYmxlKG9iaiwge25hbWUsIGluaXRpYWwsIHZhbGlkYXRpb259KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8vIEhUTUwgZWxlbWVudCBwb3NpdGlvblxuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIGEgJiYgYiAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvLyBIVE1MIGVsZW1lbnQgc2l6ZVxuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBhICYmIGIgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRpbGUtYWN0aXZlLmpzIn0=