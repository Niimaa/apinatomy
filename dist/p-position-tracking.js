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
	    id: 'position-tracking',
	    expects: ['circuitboard-core', 'tilemap-core', 'tile-core']
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2MmNiMDRlNDVlZWNkZmFjZmZmYSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUc7QUFDZixjQUFXLENBQUM7QUFFWixVQUFTLFlBQVUsQ0FBRSxJQUFHLENBQUcsS0FBRyxDQUFHO0FBQ2hDLFVBQU87QUFDTixTQUFFLENBQUcsS0FBRyxJQUFJLEVBQUksS0FBRyxJQUFJO0FBQ3ZCLFVBQUcsQ0FBRyxLQUFHLEtBQUssRUFBSSxLQUFHLEtBQUs7QUFBQSxLQUMzQixDQUFDO0dBQ0Y7QUFFQSxVQUFTLFNBQU8sQ0FBRSxJQUFHLENB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QUFPLFNBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBTTtBQUFFLGdCQUFPLEVBQUksR0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRS9ELFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjJjYjA0ZTQ1ZWVjZGZhY2ZmZmFcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0Jy4vdXRpbC9taXNjLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIHBvc1N1YnRyYWN0KHBvc0EsIHBvc0IpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBwb3NBLnRvcCAtIHBvc0IudG9wLFxuXHRcdFx0bGVmdDogcG9zQS5sZWZ0IC0gcG9zQi5sZWZ0XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIHBvc0VxdWFsKHBvc0EsIHBvc0IpIHtcblx0XHRyZXR1cm4gcG9zQSAmJiBwb3NCICYmIHBvc0EudG9wID09PSBwb3NCLnRvcCAmJiBwb3NBLmxlZnQgPT09IHBvc0IubGVmdDtcblx0fVxuXG5cdGZ1bmN0aW9uIHNpemVFcXVhbChzaXplQSwgc2l6ZUIpIHtcblx0XHRyZXR1cm4gc2l6ZUEgJiYgc2l6ZUIgJiYgc2l6ZUEud2lkdGggPT09IHNpemVCLndpZHRoICYmIHNpemVBLmhlaWdodCA9PT0gc2l6ZUIuaGVpZ2h0O1xuXHR9XG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0aWQ6ICdwb3NpdGlvbi10cmFja2luZycsXG5cdFx0ZXhwZWN0czogWydjaXJjdWl0Ym9hcmQtY29yZScsICd0aWxlbWFwLWNvcmUnLCAndGlsZS1jb3JlJ11cblx0fSk7XG5cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF90aWxlUG9zaXRpb25fb2Zmc2V0ID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+IHRoaXMuZWxlbWVudC5vZmZzZXQoKVxuXHRcdH0pO1xuXHRcdHZhciBfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0aXNFcXVhbDogc2l6ZUVxdWFsXG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIGRlZmluZSAnc2l6ZScgcHJvcGVydHlcblx0XHQvL1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2l6ZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIF9zaXplKCkgfVxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBkZWZpbmUgJ3Bvc2l0aW9uJyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwb3NpdGlvbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHsgbGVmdDogMCwgdG9wOiAwIH0gfVxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyB0cmlnZ2VyIGV2ZW50c1xuXHRcdC8vXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZSgoKSA9PiB7IHNldFRpbWVvdXQoX3NpemUsIDApIH0pO1xuXHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXHR9KTtcblxuXHRwbHVnaW4uaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpLFxuXHRcdFx0aXNFcXVhbDogcG9zRXF1YWxcblx0XHR9KTtcblx0XHR2YXIgX3NpemUgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHsgd2lkdGg6IHRoaXMuZWxlbWVudC53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuZWxlbWVudC5oZWlnaHQoKSB9KSxcblx0XHRcdGlzRXF1YWw6IHNpemVFcXVhbFxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBkZWZpbmUgcHJvcGVydGllc1xuXHRcdC8vXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwb3NpdGlvbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHBvc1N1YnRyYWN0KF9vZmZzZXQoKSwgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfdGlsZVBvc2l0aW9uX29mZnNldCgpKSB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzaXplJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gX3NpemUoKSB9XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIHRyaWdnZXIgZXZlbnRzXG5cdFx0Ly9cblx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScsICgpID0+IHsgX29mZnNldCgpOyBfc2l6ZSgpOyB9KTtcblx0XHRfb2Zmc2V0Lm9uQ2hhbmdlKCgpID0+IHsgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbicsIHRoaXMucG9zaXRpb24pIH0pO1xuXHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXHR9KTtcblxuXHRwbHVnaW4ubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpXG5cdC5hZGQoJ3Jlc2V0UG9zaXRpb25pbmcnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF9wb3NpdGlvblRyYWNraW5nX29mZnNldCgpO1xuXHRcdHRoaXMuX3BfcG9zaXRpb25UcmFja2luZ19zaXplKCk7XG5cdH0pXG5cdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX29mZnNldCA9IHRoaXMuX3BfcG9zaXRpb25UcmFja2luZ19vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpLFxuXHRcdFx0aXNFcXVhbDogcG9zRXF1YWxcblx0XHR9KTtcblx0XHR2YXIgX3NpemUgPSB0aGlzLl9wX3Bvc2l0aW9uVHJhY2tpbmdfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0aXNFcXVhbDogc2l6ZUVxdWFsXG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIGRlZmluZSBwcm9wZXJ0aWVzXG5cdFx0Ly9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Bvc2l0aW9uJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gcG9zU3VidHJhY3QoX29mZnNldCgpLCB0aGlzLmNpcmN1aXRib2FyZC5fcF90aWxlUG9zaXRpb25fb2Zmc2V0KCkpIH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NpemUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiBfc2l6ZSgpIH1cblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gdHJpZ2dlciBldmVudHNcblx0XHQvL1xuXHRcdHRoaXMucGFyZW50Lm9uKCdwb3NpdGlvbicsIF9vZmZzZXQpO1xuXHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdHRoaXMub24oJ3dlaWdodCcsICgpID0+IHsgX29mZnNldCgpOyBfc2l6ZSgpOyB9KTtcblx0XHRfb2Zmc2V0Lm9uQ2hhbmdlKCgpID0+IHsgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbicsIHRoaXMucG9zaXRpb24pIH0pO1xuXHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBpZiB0aGUgc2l6ZSBvZiBhbnkgdGlsZSBjaGFuZ2VzLCB0cmlnZ2VyIHRoZSBgcmVvcmdhbml6ZWBcblx0XHQvLyBldmVudCBvbiB0aGUgcGFyZW50IHRpbGVtYXAsIHNvIHRoYXQgc2libGluZyB0aWxlcyBjYW4gcmVhY3Rcblx0XHQvL1xuXHRcdHRoaXMub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMucGFyZW50LnRyaWdnZXIoJ3Jlb3JnYW5pemUnKSB9KTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC1wb3NpdGlvbi10cmFja2luZy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0c3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgZXF1YWxpdHkgd2l0aCBhIHRvbGVyYW5jZSBvZiBlcHNpbG9uXG5cdFx0YXBwcm94KHZhbDEsIHZhbDIsIGVwc2lsb24pIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGVwc2lsb24pKSB7IGVwc2lsb24gPSAxZS01IH1cblx0XHRcdHJldHVybiAoTWF0aC5hYnModmFsMSAtIHZhbDIpIDwgZXBzaWxvbik7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBgQS5mb3JFYWNoYCwgZXhjZXB0IGl0IGl0ZXJhdGVzIGZyb20gcmlnaHQgdG8gbGVmdFxuXHRcdGZvckVhY2hSZXZlcnNlKEEsIGZuKSB7XG5cdFx0XHR2YXIgaSA9IEEubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGktLSkgeyBmbihBW2ldLCBpLCBBKSB9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdC8vXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0Ly9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0Ly9cblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtcG9zaXRpb24tdHJhY2tpbmcuanMifQ==