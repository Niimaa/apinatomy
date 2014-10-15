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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  'use strict';
	  var DEBOUNCE_TIMEOUT = 16;
	  function posSubtract(posA, posB) {
	    return {
	      top: posA.top - posB.top,
	      left: posA.left - posB.left
	    };
	  }
	  function posEqual(posA, posB) {
	    return posA && posB && posA.top === posB.top && posA.left === posB.left;
	  }
	  function sizeEqual(sizeA, sizeB) {
	    return sizeA && sizeB && sizeA.width === sizeB.width && sizeA.height === sizeB.height;
	  }
	  $.circuitboard.plugin({
	    name: 'position-tracking',
	    after: ['circuitboard-core', 'tilemap-core', 'tile-core'],
	    'modify circuitboard': {
	      'add _p_tilePosition_offset': null,
	      'insert constructor': function() {
	        var $__0 = this;
	        this._p_tilePosition_offset = U.cached({
	          retrieve: (function() {
	            return $__0.element.offset();
	          }),
	          debounce: DEBOUNCE_TIMEOUT
	        });
	        var _size = U.cached({
	          retrieve: (function() {
	            return ({
	              width: $__0.element.width(),
	              height: $__0.element.height()
	            });
	          }),
	          debounce: DEBOUNCE_TIMEOUT,
	          isEqual: sizeEqual
	        });
	        Object.defineProperty(this, 'size', {get: function() {
	            return _size();
	          }});
	        $(window).resize((function() {
	          setTimeout(_size, 0);
	        }));
	        _size.onChange((function(newSize) {
	          $__0.trigger('size', newSize);
	        }));
	      }
	    },
	    'modify tilemap': {'insert constructor': function() {
	        var $__0 = this;
	        var _offset = U.cached({
	          retrieve: (function() {
	            return $__0.element.offset();
	          }),
	          debounce: DEBOUNCE_TIMEOUT,
	          isEqual: posEqual
	        });
	        var _size = U.cached({
	          retrieve: (function() {
	            return ({
	              width: $__0.element.width(),
	              height: $__0.element.height()
	            });
	          }),
	          debounce: DEBOUNCE_TIMEOUT,
	          isEqual: sizeEqual
	        });
	        Object.defineProperty(this, 'position', {get: function() {
	            return posSubtract(_offset(), this.circuitboard._p_tilePosition_offset());
	          }});
	        Object.defineProperty(this, 'size', {get: function() {
	            return _size();
	          }});
	        this.parent.on('size', (function() {
	          _offset();
	          _size();
	        }));
	        _offset.onChange((function() {
	          $__0.trigger('position', $__0.position);
	        }));
	        _size.onChange((function(newSize) {
	          $__0.trigger('size', newSize);
	        }));
	      }},
	    'modify tile': {
	      'add _p_positionTracking_offset': null,
	      'add _p_positionTracking_size': null,
	      'add resetPositioning': function() {
	        this._p_positionTracking_offset();
	        this._p_positionTracking_size();
	      },
	      'insert constructor': function() {
	        var $__0 = this;
	        var _offset = this._p_positionTracking_offset = U.cached({
	          retrieve: (function() {
	            return $__0.element.offset();
	          }),
	          debounce: DEBOUNCE_TIMEOUT,
	          isEqual: posEqual
	        });
	        var _size = this._p_positionTracking_size = U.cached({
	          retrieve: (function() {
	            return ({
	              width: $__0.element.width(),
	              height: $__0.element.height()
	            });
	          }),
	          debounce: DEBOUNCE_TIMEOUT,
	          isEqual: sizeEqual
	        });
	        Object.defineProperty(this, 'position', {get: function() {
	            return posSubtract(_offset(), this.circuitboard._p_tilePosition_offset());
	          }});
	        Object.defineProperty(this, 'size', {get: function() {
	            return _size();
	          }});
	        this.parent.on('position', _offset);
	        this.parent.on('size', (function() {
	          _offset();
	          _size();
	        }));
	        this.parent.on('reorganize', (function() {
	          _offset();
	          _size();
	        }));
	        this.on('weight', (function() {
	          _offset();
	          _size();
	        }));
	        _offset.onChange((function() {
	          $__0.trigger('position', $__0.position);
	        }));
	        _size.onChange((function(newSize) {
	          $__0.trigger('size', newSize);
	        }));
	        this.on('size', (function() {
	          $__0.parent.trigger('reorganize');
	        }));
	      }
	    }
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  if (!$.circuitboard) {
	    $.circuitboard = {
	      prematurePlugins: [],
	      plugin: function(newPlugin) {
	        $.circuitboard.prematurePlugins.push(newPlugin);
	      }
	    };
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMjZlZTdmNmQ3ZjhmODZmYTk0OCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC1wb3NpdGlvbi10cmFja2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHO0FBQ2YsY0FBVyxDQUFDO0FBRVIsc0JBQWUsRUFBSSxHQUFDLENBQUM7QUFFekIsVUFBUyxZQUFVLENBQUUsSUFBRyxDQUFHLEtBQUcsQ0FBRztBQUNoQyxVQUFPO0FBQ04sU0FBRSxDQUFHLEtBQUcsSUFBSSxFQUFJLEtBQUcs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QUFFL0QsWUFBTyxTQUFPLENBQUM7S0FDaEI7R0FFRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1QsRUFBQywrSUFBQztBQUNGOzs7Ozs7O2lFR3RNQSxpQ0FBUSx1QkFBUSxDQUFHLDBDQUFVLEVBQUc7QUFDL0IsY0FBVyxDQUFDO0FBT1osTUFBSSxDQUFDLGNBQWEsQ0FBRztBQUNwQixrQkFBYSxFQUFJO0FBQ2hCLHNCQUFlLENBQUcsR0FBQztBQUNuQixZQUFLLENBQUcsVUFBVSxTQUFRLENBQUc7QUFDNUIsc0JBQWEsaUJBQWlCLEtBQU0sQ0FBQyxTQUFRLENBQUMsQ0FBQztPQUNoRDtBQUFBLEtBQ0QsQ0FBQztHQUNGO0FBRUQsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMyNmVlN2Y2ZDdmOGY4NmZhOTQ4XG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCcuL2FteS11dGlsL21pc2MuanMnLFxuXHQnLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanMnXG5dLCBmdW5jdGlvbiAoJCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIERFQk9VTkNFX1RJTUVPVVQgPSAxNjtcblxuXHRmdW5jdGlvbiBwb3NTdWJ0cmFjdChwb3NBLCBwb3NCKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogcG9zQS50b3AgLSBwb3NCLnRvcCxcblx0XHRcdGxlZnQ6IHBvc0EubGVmdCAtIHBvc0IubGVmdFxuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBwb3NFcXVhbChwb3NBLCBwb3NCKSB7XG5cdFx0cmV0dXJuIHBvc0EgJiYgcG9zQiAmJiBwb3NBLnRvcCA9PT0gcG9zQi50b3AgJiYgcG9zQS5sZWZ0ID09PSBwb3NCLmxlZnQ7XG5cdH1cblxuXHRmdW5jdGlvbiBzaXplRXF1YWwoc2l6ZUEsIHNpemVCKSB7XG5cdFx0cmV0dXJuIHNpemVBICYmIHNpemVCICYmIHNpemVBLndpZHRoID09PSBzaXplQi53aWR0aCAmJiBzaXplQS5oZWlnaHQgPT09IHNpemVCLmhlaWdodDtcblx0fVxuXG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3Bvc2l0aW9uLXRyYWNraW5nJyxcblx0XHRhZnRlcjogWydjaXJjdWl0Ym9hcmQtY29yZScsICd0aWxlbWFwLWNvcmUnLCAndGlsZS1jb3JlJ10sXG5cblx0XHQnbW9kaWZ5IGNpcmN1aXRib2FyZCc6IHtcblx0XHRcdCdhZGQgX3BfdGlsZVBvc2l0aW9uX29mZnNldCc6IG51bGwsXG5cdFx0XHQnaW5zZXJ0IGNvbnN0cnVjdG9yJzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLl9wX3RpbGVQb3NpdGlvbl9vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRcdFx0cmV0cmlldmU6ICgpID0+IHRoaXMuZWxlbWVudC5vZmZzZXQoKSxcblx0XHRcdFx0XHRkZWJvdW5jZTogREVCT1VOQ0VfVElNRU9VVFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dmFyIF9zaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0XHRcdGRlYm91bmNlOiBERUJPVU5DRV9USU1FT1VULFxuXHRcdFx0XHRcdGlzRXF1YWw6IHNpemVFcXVhbFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBkZWZpbmUgJ3NpemUnIHByb3BlcnR5XG5cdFx0XHRcdC8vXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2l6ZScsIHtcblx0XHRcdFx0XHRnZXQoKSB7IHJldHVybiBfc2l6ZSgpIH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gdHJpZ2dlciBldmVudHNcblx0XHRcdFx0Ly9cblx0XHRcdFx0JCh3aW5kb3cpLnJlc2l6ZSgoKSA9PiB7IHNldFRpbWVvdXQoX3NpemUsIDApIH0pO1xuXHRcdFx0XHRfc2l6ZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnRyaWdnZXIoJ3NpemUnLCBuZXdTaXplKSB9KTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0J21vZGlmeSB0aWxlbWFwJzoge1xuXHRcdFx0J2luc2VydCBjb25zdHJ1Y3Rvcic6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIF9vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRcdFx0cmV0cmlldmU6ICgpID0+IHRoaXMuZWxlbWVudC5vZmZzZXQoKSxcblx0XHRcdFx0XHRkZWJvdW5jZTogREVCT1VOQ0VfVElNRU9VVCxcblx0XHRcdFx0XHRpc0VxdWFsOiBwb3NFcXVhbFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dmFyIF9zaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0XHRcdGRlYm91bmNlOiBERUJPVU5DRV9USU1FT1VULFxuXHRcdFx0XHRcdGlzRXF1YWw6IHNpemVFcXVhbFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBkZWZpbmUgcHJvcGVydGllc1xuXHRcdFx0XHQvL1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Bvc2l0aW9uJywge1xuXHRcdFx0XHRcdGdldCgpIHsgcmV0dXJuIHBvc1N1YnRyYWN0KF9vZmZzZXQoKSwgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfdGlsZVBvc2l0aW9uX29mZnNldCgpKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NpemUnLCB7XG5cdFx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gX3NpemUoKSB9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHRyaWdnZXIgZXZlbnRzXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdFx0XHRfb2Zmc2V0Lm9uQ2hhbmdlKCgpID0+IHsgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbicsIHRoaXMucG9zaXRpb24pIH0pO1xuXHRcdFx0XHRfc2l6ZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnRyaWdnZXIoJ3NpemUnLCBuZXdTaXplKSB9KTtcblxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQnbW9kaWZ5IHRpbGUnOiB7XG5cdFx0XHQnYWRkIF9wX3Bvc2l0aW9uVHJhY2tpbmdfb2Zmc2V0JzogbnVsbCxcblx0XHRcdCdhZGQgX3BfcG9zaXRpb25UcmFja2luZ19zaXplJzogbnVsbCxcblx0XHRcdCdhZGQgcmVzZXRQb3NpdGlvbmluZyc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhpcy5fcF9wb3NpdGlvblRyYWNraW5nX29mZnNldCgpO1xuXHRcdFx0XHR0aGlzLl9wX3Bvc2l0aW9uVHJhY2tpbmdfc2l6ZSgpO1xuXHRcdFx0fSxcblx0XHRcdCdpbnNlcnQgY29uc3RydWN0b3InOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBfb2Zmc2V0ID0gdGhpcy5fcF9wb3NpdGlvblRyYWNraW5nX29mZnNldCA9IFUuY2FjaGVkKHtcblx0XHRcdFx0XHRyZXRyaWV2ZTogKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpLFxuXHRcdFx0XHRcdGRlYm91bmNlOiBERUJPVU5DRV9USU1FT1VULFxuXHRcdFx0XHRcdGlzRXF1YWw6IHBvc0VxdWFsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR2YXIgX3NpemUgPSB0aGlzLl9wX3Bvc2l0aW9uVHJhY2tpbmdfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHsgd2lkdGg6IHRoaXMuZWxlbWVudC53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuZWxlbWVudC5oZWlnaHQoKSB9KSxcblx0XHRcdFx0XHRkZWJvdW5jZTogREVCT1VOQ0VfVElNRU9VVCxcblx0XHRcdFx0XHRpc0VxdWFsOiBzaXplRXF1YWxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gZGVmaW5lIHByb3BlcnRpZXNcblx0XHRcdFx0Ly9cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwb3NpdGlvbicsIHtcblx0XHRcdFx0XHRnZXQoKSB7IHJldHVybiBwb3NTdWJ0cmFjdChfb2Zmc2V0KCksIHRoaXMuY2lyY3VpdGJvYXJkLl9wX3RpbGVQb3NpdGlvbl9vZmZzZXQoKSkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzaXplJywge1xuXHRcdFx0XHRcdGdldCgpIHsgcmV0dXJuIF9zaXplKCkgfVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyB0cmlnZ2VyIGV2ZW50c1xuXHRcdFx0XHQvL1xuXHRcdFx0XHR0aGlzLnBhcmVudC5vbigncG9zaXRpb24nLCBfb2Zmc2V0KTtcblx0XHRcdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnLCAoKSA9PiB7IF9vZmZzZXQoKTsgX3NpemUoKTsgfSk7XG5cdFx0XHRcdHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdFx0XHR0aGlzLm9uKCd3ZWlnaHQnLCAoKSA9PiB7IF9vZmZzZXQoKTsgX3NpemUoKTsgfSk7XG5cdFx0XHRcdF9vZmZzZXQub25DaGFuZ2UoKCkgPT4geyB0aGlzLnRyaWdnZXIoJ3Bvc2l0aW9uJywgdGhpcy5wb3NpdGlvbikgfSk7XG5cdFx0XHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGlmIHRoZSBzaXplIG9mIGFueSB0aWxlIGNoYW5nZXMsIHRyaWdnZXIgdGhlIGByZW9yZ2FuaXplYFxuXHRcdFx0XHQvLyBldmVudCBvbiB0aGUgcGFyZW50IHRpbGVtYXAsIHNvIHRoYXQgc2libGluZyB0aWxlcyBjYW4gcmVhY3Rcblx0XHRcdFx0Ly9cblx0XHRcdFx0dGhpcy5vbignc2l6ZScsICgpID0+IHsgdGhpcy5wYXJlbnQudHJpZ2dlcigncmVvcmdhbml6ZScpIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvYW15LXAtcG9zaXRpb24tdHJhY2tpbmcuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXHRcdC8vXG5cdFx0Ly8gdGVzdCBlcXVhbGl0eSB3aXRoIGEgdG9sZXJhbmNlIG9mIGVwc2lsb25cblx0XHQvL1xuXHRcdGFwcHJveDogZnVuY3Rpb24gKHZhbDEsIHZhbDIsIGVwc2lsb24pIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGVwc2lsb24pKSB7IGVwc2lsb24gPSAxZS01IH1cblx0XHRcdHJldHVybiAoTWF0aC5hYnModmFsMSAtIHZhbDIpIDwgZXBzaWxvbik7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdC8vXG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0Ly9cblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNQbGFpbk9iamVjdChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHQvL1xuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzQXJyYXkob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0Ly9cblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0Ly9cblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHQvL1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdC8vXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHQvL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdC8vXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHQvL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHQvL1xuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvL1xuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHQvL1xuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHQvL1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHQvL1xuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0Ly9cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuXG5cdFx0Ly8gSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhIGNhY2hlXG5cdFx0Ly8gdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWVcblx0XHQvLyBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duXG5cdFx0Ly8gY29tcGFyaXNvbiBmdW5jdGlvbi5cblx0XHQvL1xuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlXG5cdFx0XHQvL1xuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdC8vIE5PVEU6IG9ubHkgb25lIGNhbGxiYWNrIGlzIHN0b3JlZCFcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vYW15LXV0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyB0aGlzIGNhbiBiZSBsb2FkZWQgYmVmb3JlIGEgcGx1Z2luIGZpbGUgdG8gZWxlZ2FudGx5IGhhbmRsZVxuXHQvLyB0aGUgc2l0dWF0aW9uIHdoZXJlIHRoZSBjaXJjdWl0Ym9hcmQgbW9kdWxlIGlzIG5vdCB5ZXQgbG9hZGVkXG5cdC8vIHRvIHJlY2VpdmUgaXRcblx0Ly9cblx0aWYgKCEkLmNpcmN1aXRib2FyZCkge1xuXHRcdCQuY2lyY3VpdGJvYXJkID0ge1xuXHRcdFx0cHJlbWF0dXJlUGx1Z2luczogW10sXG5cdFx0XHRwbHVnaW46IGZ1bmN0aW9uIChuZXdQbHVnaW4pIHtcblx0XHRcdFx0JC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucy5wdXNoKG5ld1BsdWdpbik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFteS1wLXBvc2l0aW9uLXRyYWNraW5nLmpzIn0=