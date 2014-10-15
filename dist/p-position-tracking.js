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
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNTExMzMyYmIxYmFjMTNhZTNlYSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUc7QUFDZixjQUFXLENBQUM7QUFFWixVQUFTLFlBQVUsQ0FBRSxJQUFHLENBQUcsS0FBRyxDQUFHO0FBQ2hDLFVBQU87QUFDTixTQUFFLENBQUcsS0FBRyxJQUFJLEVBQUksS0FBRyxJQUFJO0FBQ3ZCLFVBQUcsQ0FBRyxLQUFHLEtBQUssRUFBSSxLQUFHLEtBQUs7QUFBQSxLQUMzQixDQUFDO0dBQ0Y7QUFFQSxVQUFTLFNBQU8sQ0FBRSxJQUFHLENB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O1dBQUEsRUFBQyxDQUFDO0FBSy9DLGVBQUksQ0FBQztBQUNULGNBQVMsU0FBTyxDQUFFLENBQUU7QUFDZixvQkFBTyxFQUFJLE1BQUksQ0FBQztBQUNwQixhQUFJLEVBQUksU0FBUSxFQUFDLENBQUM7QUFDbEIsWUFBSSxRQUFPLEdBQUssRUFBQyxPQUFPLENBQUMsS0FBSSxDQUFHLFNBQU8sQ0FBQyxDQUFHO0FBQzFDLGtCQUFRLENBQUMsS0FBSSxDQUFHLFNBQU8sQ0FBQyxDQUFDO1NBQzFCO0FBQUEsT0FDRDtBQUNBLGdCQUFVLENBQUMsUUFBTyxDQUFHLEdBQUMsQ0FBQztBQU1uQiw4QkFBbUIsRUFBSSxlQUFjLENBQUMsUUFBTyxDQUFDLENBQUM7QUFNL0Msa0JBQU8sSUFBSSxTQUFDLENBQUs7QUFDcEIsNEJBQW9CLEVBQUMsQ0FBQztBQUN0QixjQUFPLE1BQUksQ0FBQztPQUNiLEVBQUM7QUFNRyxrQkFBTyxDQUFDO0FBQ1osY0FBTyxTQUFTLElBQUksU0FBQyxFQUFDLENBQU07QUFBRSxnQkFBTyxFQUFJLEdBQUMsQ0FBQztBQUFFLGNBQU8sU0FBTyxDQUFDO09BQUUsRUFBQztBQUUvRCxZQUFPLFNBQU8sQ0FBQztLQUNoQjtHQUVELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCxFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYjUxMTMzMmJiMWJhYzEzYWUzZWFcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0Jy4vdXRpbC9taXNjLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIHBvc1N1YnRyYWN0KHBvc0EsIHBvc0IpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBwb3NBLnRvcCAtIHBvc0IudG9wLFxuXHRcdFx0bGVmdDogcG9zQS5sZWZ0IC0gcG9zQi5sZWZ0XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIHBvc0VxdWFsKHBvc0EsIHBvc0IpIHtcblx0XHRyZXR1cm4gcG9zQSAmJiBwb3NCICYmIHBvc0EudG9wID09PSBwb3NCLnRvcCAmJiBwb3NBLmxlZnQgPT09IHBvc0IubGVmdDtcblx0fVxuXG5cdGZ1bmN0aW9uIHNpemVFcXVhbChzaXplQSwgc2l6ZUIpIHtcblx0XHRyZXR1cm4gc2l6ZUEgJiYgc2l6ZUIgJiYgc2l6ZUEud2lkdGggPT09IHNpemVCLndpZHRoICYmIHNpemVBLmhlaWdodCA9PT0gc2l6ZUIuaGVpZ2h0O1xuXHR9XG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3Bvc2l0aW9uLXRyYWNraW5nJyxcblx0XHRhZnRlcjogWydjaXJjdWl0Ym9hcmQtY29yZScsICd0aWxlbWFwLWNvcmUnLCAndGlsZS1jb3JlJ11cblx0fSk7XG5cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF90aWxlUG9zaXRpb25fb2Zmc2V0ID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+IHRoaXMuZWxlbWVudC5vZmZzZXQoKVxuXHRcdH0pO1xuXHRcdHZhciBfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0aXNFcXVhbDogc2l6ZUVxdWFsXG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIGRlZmluZSAnc2l6ZScgcHJvcGVydHlcblx0XHQvL1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2l6ZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIF9zaXplKCkgfVxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBkZWZpbmUgJ3Bvc2l0aW9uJyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwb3NpdGlvbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHsgbGVmdDogMCwgdG9wOiAwIH0gfVxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyB0cmlnZ2VyIGV2ZW50c1xuXHRcdC8vXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZSgoKSA9PiB7IHNldFRpbWVvdXQoX3NpemUsIDApIH0pO1xuXHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXHR9KTtcblxuXHRwbHVnaW4uaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpLFxuXHRcdFx0aXNFcXVhbDogcG9zRXF1YWxcblx0XHR9KTtcblx0XHR2YXIgX3NpemUgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHsgd2lkdGg6IHRoaXMuZWxlbWVudC53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuZWxlbWVudC5oZWlnaHQoKSB9KSxcblx0XHRcdGlzRXF1YWw6IHNpemVFcXVhbFxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBkZWZpbmUgcHJvcGVydGllc1xuXHRcdC8vXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwb3NpdGlvbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHBvc1N1YnRyYWN0KF9vZmZzZXQoKSwgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfdGlsZVBvc2l0aW9uX29mZnNldCgpKSB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzaXplJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gX3NpemUoKSB9XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIHRyaWdnZXIgZXZlbnRzXG5cdFx0Ly9cblx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScsICgpID0+IHsgX29mZnNldCgpOyBfc2l6ZSgpOyB9KTtcblx0XHRfb2Zmc2V0Lm9uQ2hhbmdlKCgpID0+IHsgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbicsIHRoaXMucG9zaXRpb24pIH0pO1xuXHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXHR9KTtcblxuXHRwbHVnaW4ubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpXG5cdC5hZGQoJ3Jlc2V0UG9zaXRpb25pbmcnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF9wb3NpdGlvblRyYWNraW5nX29mZnNldCgpO1xuXHRcdHRoaXMuX3BfcG9zaXRpb25UcmFja2luZ19zaXplKCk7XG5cdH0pXG5cdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX29mZnNldCA9IHRoaXMuX3BfcG9zaXRpb25UcmFja2luZ19vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpLFxuXHRcdFx0aXNFcXVhbDogcG9zRXF1YWxcblx0XHR9KTtcblx0XHR2YXIgX3NpemUgPSB0aGlzLl9wX3Bvc2l0aW9uVHJhY2tpbmdfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAoeyB3aWR0aDogdGhpcy5lbGVtZW50LndpZHRoKCksIGhlaWdodDogdGhpcy5lbGVtZW50LmhlaWdodCgpIH0pLFxuXHRcdFx0aXNFcXVhbDogc2l6ZUVxdWFsXG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIGRlZmluZSBwcm9wZXJ0aWVzXG5cdFx0Ly9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Bvc2l0aW9uJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gcG9zU3VidHJhY3QoX29mZnNldCgpLCB0aGlzLmNpcmN1aXRib2FyZC5fcF90aWxlUG9zaXRpb25fb2Zmc2V0KCkpIH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NpemUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiBfc2l6ZSgpIH1cblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gdHJpZ2dlciBldmVudHNcblx0XHQvL1xuXHRcdHRoaXMucGFyZW50Lm9uKCdwb3NpdGlvbicsIF9vZmZzZXQpO1xuXHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJywgKCkgPT4geyBfb2Zmc2V0KCk7IF9zaXplKCk7IH0pO1xuXHRcdHRoaXMub24oJ3dlaWdodCcsICgpID0+IHsgX29mZnNldCgpOyBfc2l6ZSgpOyB9KTtcblx0XHRfb2Zmc2V0Lm9uQ2hhbmdlKCgpID0+IHsgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbicsIHRoaXMucG9zaXRpb24pIH0pO1xuXHRcdF9zaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcignc2l6ZScsIG5ld1NpemUpIH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBpZiB0aGUgc2l6ZSBvZiBhbnkgdGlsZSBjaGFuZ2VzLCB0cmlnZ2VyIHRoZSBgcmVvcmdhbml6ZWBcblx0XHQvLyBldmVudCBvbiB0aGUgcGFyZW50IHRpbGVtYXAsIHNvIHRoYXQgc2libGluZyB0aWxlcyBjYW4gcmVhY3Rcblx0XHQvL1xuXHRcdHRoaXMub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMucGFyZW50LnRyaWdnZXIoJ3Jlb3JnYW5pemUnKSB9KTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC1wb3NpdGlvbi10cmFja2luZy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGVxdWFsaXR5IHdpdGggYSB0b2xlcmFuY2Ugb2YgZXBzaWxvblxuXHRcdC8vXG5cdFx0YXBwcm94OiBmdW5jdGlvbiAodmFsMSwgdmFsMiwgZXBzaWxvbikge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZXBzaWxvbikpIHsgZXBzaWxvbiA9IDFlLTUgfVxuXHRcdFx0cmV0dXJuIChNYXRoLmFicyh2YWwxIC0gdmFsMikgPCBlcHNpbG9uKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHQvL1xuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc1BsYWluT2JqZWN0KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdC8vXG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNBcnJheShvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHQvL1xuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHQvL1xuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdC8vXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0Ly9cblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdC8vXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0Ly9cblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdC8vXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdC8vXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHQvL1xuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdC8vXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdC8vXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdC8vXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdC8vXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHQvL1xuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhlIGdpdmVuIG9iamVjdDtcblx0XHQvLyB0aGlzIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmUgYSBgdHJpZ2dlcmAgbWV0aG9kXG5cdFx0Ly9cblx0XHQvLyBvcHRpb25zLm5hbWUgKG1hbmRhdG9yeSkgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcblx0XHQvL1xuXHRcdG9ic2VydmFibGUob2JqLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIgdmFsdWU7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBvcHRpb25zLm5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKG9wdGlvbnMubmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Ly9cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Ly9cblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0Ly9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC1wb3NpdGlvbi10cmFja2luZy5qcyJ9