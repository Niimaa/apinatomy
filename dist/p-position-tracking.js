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
	  var plugin = $.circuitboard.plugin({
	    name: 'position-tracking',
	    after: ['circuitboard-core', 'tilemap-core', 'tile-core']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this._p_tilePosition_offset = U.cached({retrieve: (function() {
	        return $__0.element.offset();
	      })});
	    var _size = U.cached({
	      retrieve: (function() {
	        return ({
	          width: $__0.element.width(),
	          height: $__0.element.height()
	        });
	      }),
	      isEqual: sizeEqual
	    });
	    Object.defineProperty(this, 'size', {get: function() {
	        return _size();
	      }});
	    Object.defineProperty(this, 'position', {get: function() {
	        return {
	          left: 0,
	          top: 0
	        };
	      }});
	    $(window).resize((function() {
	      setTimeout(_size, 0);
	    }));
	    _size.onChange((function(newSize) {
	      $__0.trigger('size', newSize);
	    }));
	  });
	  plugin.insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    var _offset = U.cached({
	      retrieve: (function() {
	        return $__0.element.offset();
	      }),
	      isEqual: posEqual
	    });
	    var _size = U.cached({
	      retrieve: (function() {
	        return ({
	          width: $__0.element.width(),
	          height: $__0.element.height()
	        });
	      }),
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
	  });
	  plugin.modify('Tile.prototype').add('resetPositioning', function() {
	    this._p_positionTracking_offset();
	    this._p_positionTracking_size();
	  }).insert('construct', function() {
	    var $__0 = this;
	    var _offset = this._p_positionTracking_offset = U.cached({
	      retrieve: (function() {
	        return $__0.element.offset();
	      }),
	      isEqual: posEqual
	    });
	    var _size = this._p_positionTracking_size = U.cached({
	      retrieve: (function() {
	        return ({
	          width: $__0.element.width(),
	          height: $__0.element.height()
	        });
	      }),
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
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4NjIyZTYxYzBjNGVlM2Y5NzM0NiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUc7QUFDZixjQUFXLENBQUM7QUFFWixVQUFTLFlBQVUsQ0FBRSxJQUFHLENBQUcsS0FBRyxDQUFHO0FBQ2hDLFVBQU87QUFDTixTQUFFLENBQUcsS0FBRyxJQUFJLEVBQUksS0FBRyxJQUFJO0FBQ3ZCLFVBQUcsQ0FBRyxLQUFHLEtBQUssRUFBSSxLQUFHLEtBQUs7QUFBQSxLQUMzQixDQUFDO0dBQ0Y7QUFFQSxVQUFTLFNBQU8sQ0FBRSxJQUFHLENB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QUMxQixpQkFBSSxFQUFJLFNBQU8sQ0FBQztBQUNoQixnQkFBRyxRQUFTLENBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBRyxTQUFPLENBQUMsQ0FBQztXQUN2QztBQUFBLFNBQ0Q7QUFBQSxPQUNELENBQUMsQ0FBQztLQUNIO0FBU0EsVUFBSyxDQUFMLFVBQU8sT0FBTTtBQUlSLGtCQUFPLEVBQUksUUFBTSxTQUFTO0FBQzdCLGlCQUFNLEVBQUksUUFBTSxRQUFRLEdBQUssR0FBQyxTQUFDLEVBQUc7a0JBQU0sRUFBQyxLQUFNLEdBQUM7V0FBQSxFQUFDLENBQUM7QUFLL0MsZUFBSSxDQUFDO0FBQ1QsY0FBUyxTQUFPLENBQUUsQ0FBRTtBQUNmLG9CQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLGFBQUksRUFBSSxTQUFRLEVBQUMsQ0FBQztBQUNsQixZQUFJLFFBQU8sR0FBSyxFQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUc7QUFDMUMsa0JBQVEsQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUM7U0FDMUI7QUFBQSxPQUNEO0FBQ0EsZ0JBQVUsQ0FBQyxRQUFPLENBQUcsR0FBQyxDQUFDO0FBTW5CLDhCQUFtQixFQUFJLGVBQWMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQU0vQyxrQkFBTyxJQUFJLFNBQUMsQ0FBSztBQUNwQiw0QkFBb0IsRUFBQyxDQUFDO0FBQ3RCLGNBQU8sTUFBSSxDQUFDO09BQ2IsRUFBQztBQU1HLGtCQUFPLENBQUM7QUFDWixjQUFPLFNBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBTTtBQUFFLGdCQUFPLEVBQUksR0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRS9ELFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4NjIyZTYxYzBjNGVlM2Y5NzM0NlxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnLi91dGlsL21pc2MuanMnXG5dLCBmdW5jdGlvbiAoJCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZnVuY3Rpb24gcG9zU3VidHJhY3QocG9zQSwgcG9zQikge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IHBvc0EudG9wIC0gcG9zQi50b3AsXG5cdFx0XHRsZWZ0OiBwb3NBLmxlZnQgLSBwb3NCLmxlZnRcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gcG9zRXF1YWwocG9zQSwgcG9zQikge1xuXHRcdHJldHVybiBwb3NBICYmIHBvc0IgJiYgcG9zQS50b3AgPT09IHBvc0IudG9wICYmIHBvc0EubGVmdCA9PT0gcG9zQi5sZWZ0O1xuXHR9XG5cblx0ZnVuY3Rpb24gc2l6ZUVxdWFsKHNpemVBLCBzaXplQikge1xuXHRcdHJldHVybiBzaXplQSAmJiBzaXplQiAmJiBzaXplQS53aWR0aCA9PT0gc2l6ZUIud2lkdGggJiYgc2l6ZUEuaGVpZ2h0ID09PSBzaXplQi5oZWlnaHQ7XG5cdH1cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAncG9zaXRpb24tdHJhY2tpbmcnLFxuXHRcdGFmdGVyOiBbJ2NpcmN1aXRib2FyZC1jb3JlJywgJ3RpbGVtYXAtY29yZScsICd0aWxlLWNvcmUnXVxuXHR9KTtcblxuXHRwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9wX3RpbGVQb3NpdGlvbl9vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpXG5cdFx0fSk7XG5cdFx0dmFyIF9zaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+ICh7IHdpZHRoOiB0aGlzLmVsZW1lbnQud2lkdGgoKSwgaGVpZ2h0OiB0aGlzLmVsZW1lbnQuaGVpZ2h0KCkgfSksXG5cdFx0XHRpc0VxdWFsOiBzaXplRXF1YWxcblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gZGVmaW5lICdzaXplJyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzaXplJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gX3NpemUoKSB9XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIGRlZmluZSAncG9zaXRpb24nIHByb3BlcnR5XG5cdFx0Ly9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Bvc2l0aW9uJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4geyBsZWZ0OiAwLCB0b3A6IDAgfSB9XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIHRyaWdnZXIgZXZlbnRzXG5cdFx0Ly9cblx0XHQkKHdpbmRvdykucmVzaXplKCgpID0+IHsgc2V0VGltZW91dChfc2l6ZSwgMCkgfSk7XG5cdFx0X3NpemUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50cmlnZ2VyKCdzaXplJywgbmV3U2l6ZSkgfSk7XG5cdH0pO1xuXG5cdHBsdWdpbi5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX29mZnNldCA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiB0aGlzLmVsZW1lbnQub2Zmc2V0KCksXG5cdFx0XHRpc0VxdWFsOiBwb3NFcXVhbFxuXHRcdH0pO1xuXHRcdHZhciBfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0aXNFcXVhbDogc2l6ZUVxdWFsXG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIGRlZmluZSBwcm9wZXJ0aWVzXG5cdFx0Ly9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Bvc2l0aW9uJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gcG9zU3VidHJhY3QoX29mZnNldCgpLCB0aGlzLmNpcmN1aXRib2FyZC5fcF90aWxlUG9zaXRpb25fb2Zmc2V0KCkpIH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NpemUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiBfc2l6ZSgpIH1cblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gdHJpZ2dlciBldmVudHNcblx0XHQvL1xuXHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdF9vZmZzZXQub25DaGFuZ2UoKCkgPT4geyB0aGlzLnRyaWdnZXIoJ3Bvc2l0aW9uJywgdGhpcy5wb3NpdGlvbikgfSk7XG5cdFx0X3NpemUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50cmlnZ2VyKCdzaXplJywgbmV3U2l6ZSkgfSk7XG5cdH0pO1xuXG5cdHBsdWdpbi5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJylcblx0LmFkZCgncmVzZXRQb3NpdGlvbmluZycsIGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9wX3Bvc2l0aW9uVHJhY2tpbmdfb2Zmc2V0KCk7XG5cdFx0dGhpcy5fcF9wb3NpdGlvblRyYWNraW5nX3NpemUoKTtcblx0fSlcblx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfb2Zmc2V0ID0gdGhpcy5fcF9wb3NpdGlvblRyYWNraW5nX29mZnNldCA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiB0aGlzLmVsZW1lbnQub2Zmc2V0KCksXG5cdFx0XHRpc0VxdWFsOiBwb3NFcXVhbFxuXHRcdH0pO1xuXHRcdHZhciBfc2l6ZSA9IHRoaXMuX3BfcG9zaXRpb25UcmFja2luZ19zaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+ICh7IHdpZHRoOiB0aGlzLmVsZW1lbnQud2lkdGgoKSwgaGVpZ2h0OiB0aGlzLmVsZW1lbnQuaGVpZ2h0KCkgfSksXG5cdFx0XHRpc0VxdWFsOiBzaXplRXF1YWxcblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gZGVmaW5lIHByb3BlcnRpZXNcblx0XHQvL1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncG9zaXRpb24nLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiBwb3NTdWJ0cmFjdChfb2Zmc2V0KCksIHRoaXMuY2lyY3VpdGJvYXJkLl9wX3RpbGVQb3NpdGlvbl9vZmZzZXQoKSkgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2l6ZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIF9zaXplKCkgfVxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyB0cmlnZ2VyIGV2ZW50c1xuXHRcdC8vXG5cdFx0dGhpcy5wYXJlbnQub24oJ3Bvc2l0aW9uJywgX29mZnNldCk7XG5cdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnLCAoKSA9PiB7IF9vZmZzZXQoKTsgX3NpemUoKTsgfSk7XG5cdFx0dGhpcy5wYXJlbnQub24oJ3Jlb3JnYW5pemUnLCAoKSA9PiB7IF9vZmZzZXQoKTsgX3NpemUoKTsgfSk7XG5cdFx0dGhpcy5vbignd2VpZ2h0JywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdF9vZmZzZXQub25DaGFuZ2UoKCkgPT4geyB0aGlzLnRyaWdnZXIoJ3Bvc2l0aW9uJywgdGhpcy5wb3NpdGlvbikgfSk7XG5cdFx0X3NpemUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50cmlnZ2VyKCdzaXplJywgbmV3U2l6ZSkgfSk7XG5cblx0XHQvL1xuXHRcdC8vIGlmIHRoZSBzaXplIG9mIGFueSB0aWxlIGNoYW5nZXMsIHRyaWdnZXIgdGhlIGByZW9yZ2FuaXplYFxuXHRcdC8vIGV2ZW50IG9uIHRoZSBwYXJlbnQgdGlsZW1hcCwgc28gdGhhdCBzaWJsaW5nIHRpbGVzIGNhbiByZWFjdFxuXHRcdC8vXG5cdFx0dGhpcy5vbignc2l6ZScsICgpID0+IHsgdGhpcy5wYXJlbnQudHJpZ2dlcigncmVvcmdhbml6ZScpIH0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblx0XHQvL1xuXHRcdC8vIHRlc3QgZXF1YWxpdHkgd2l0aCBhIHRvbGVyYW5jZSBvZiBlcHNpbG9uXG5cdFx0Ly9cblx0XHRhcHByb3g6IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBlcHNpbG9uKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChlcHNpbG9uKSkgeyBlcHNpbG9uID0gMWUtNSB9XG5cdFx0XHRyZXR1cm4gKE1hdGguYWJzKHZhbDEgLSB2YWwyKSA8IGVwc2lsb24pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHQvL1xuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdC8vXG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzUGxhaW5PYmplY3Qob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0Ly9cblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc0FycmF5KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdC8vXG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdC8vXG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0Ly9cblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHQvL1xuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0Ly9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHQvL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0Ly9cblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0Ly9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdC8vXG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0Ly9cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0Ly9cblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGBBLmZvckVhY2hgLCBleGNlcHQgaXQgaXRlcmF0ZXMgZnJvbSByaWdodCB0byBsZWZ0XG5cdFx0Ly9cblx0XHRmb3JFYWNoUmV2ZXJzZShBLCBmbikge1xuXHRcdFx0dmFyIGkgPSBBLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHsgZm4oQVtpXSwgaSwgQSkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0Ly9cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0Ly9cblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdC8vXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0Ly9cblx0XHRvYnNlcnZhYmxlKG9iaiwge25hbWUsIGluaXRpYWwsIHZhbGlkYXRpb259KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuXG5cdFx0Ly8gSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhIGNhY2hlXG5cdFx0Ly8gdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWVcblx0XHQvLyBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duXG5cdFx0Ly8gY29tcGFyaXNvbiBmdW5jdGlvbi5cblx0XHQvL1xuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlXG5cdFx0XHQvL1xuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdC8vIE5PVEU6IG9ubHkgb25lIGNhbGxiYWNrIGlzIHN0b3JlZCFcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXBvc2l0aW9uLXRyYWNraW5nLmpzIn0=