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
	    name: 'position-tracking',
	    expects: ['core']
	  });
	  plugin.add('Circuitboard.prototype._p_posTracking_setOffset', U.oncePerStack(function() {
	    var restoreTransforms = [this.element, this.element.parent()].map((function(e) {
	      var originalTransform = e[0].style.transform;
	      e[0].style.transform = '';
	      return (function() {
	        e[0].style.transform = originalTransform;
	      });
	    }));
	    this._p_posTracking_offset_cache = this.element.offset();
	    this.children.forEach((function(c) {
	      if (c._p_posTracking_setOffset) {
	        c._p_posTracking_setOffset();
	      }
	    }));
	    restoreTransforms.forEach(U.call);
	  })).insert('Tilemap.prototype.construct', function() {
	    this.circuitboard._p_posTracking_setOffset.allowAdditionalCall();
	  }).insert('Tile.prototype.construct', function() {
	    this.circuitboard._p_posTracking_setOffset.allowAdditionalCall();
	  }).add('Tilemap.prototype._p_posTracking_setOffset', function() {
	    this._p_posTracking_offset_cache = this.element.offset();
	    this.children.forEach((function(c) {
	      if (c._p_posTracking_setOffset) {
	        c._p_posTracking_setOffset();
	      }
	    }));
	  }).add('Tile.prototype._p_posTracking_setOffset', function() {
	    this._p_posTracking_offset_cache = this.element.offset();
	    this.children.forEach((function(c) {
	      if (c._p_posTracking_setOffset) {
	        c._p_posTracking_setOffset();
	      }
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('offset');
	    ((function(cache) {
	      $__0.offset = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newOffset) {
	        $__0.offset = newOffset;
	      }));
	      $__0.on('reset-positioning', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        $__0._p_posTracking_setOffset();
	        return $__0._p_posTracking_offset_cache;
	      }),
	      isEqual: U.Position.equals
	    }));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('offset');
	    ((function(cache) {
	      $__0.offset = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newOffset) {
	        $__0.offset = newOffset;
	      }));
	      $__0.parent.observe('size', cache);
	      $__0.parent.on('offset', cache);
	      $__0.on('reset-positioning', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        $__0.circuitboard._p_posTracking_setOffset();
	        return $__0._p_posTracking_offset_cache;
	      }),
	      isEqual: U.Position.equals
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('offset');
	    ((function(cache) {
	      $__0.offset = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newOffset) {
	        $__0.offset = newOffset;
	      }));
	      $__0.on('weight', cache);
	      $__0.parent.on('size', cache);
	      $__0.parent.on('reorganize', cache);
	      $__0.parent.on('offset', cache);
	      $__0.on('reset-positioning', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        $__0.circuitboard._p_posTracking_setOffset();
	        return $__0._p_posTracking_offset_cache;
	      }),
	      isEqual: U.Position.equals
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    this.newObservable('position', {initial: new U.Position(0, 0)});
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('position');
	    ((function(setPosition) {
	      setPosition();
	      $__0.on('offset', setPosition);
	      $__0.circuitboard.on('offset', setPosition);
	    }))((function() {
	      $__0.position = U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('position');
	    ((function(setPosition) {
	      setPosition();
	      $__0.on('offset', setPosition);
	      $__0.circuitboard.on('offset', setPosition);
	    }))((function() {
	      $__0.position = U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('size');
	    ((function(cache) {
	      $__0.size = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newSize) {
	        $__0.size = newSize;
	      }));
	      ($__0.options.resizeEvent || U.bind($(window), 'resize'))(cache);
	      $__0.on('reset-positioning', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    }));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('size');
	    ((function(cache) {
	      $__0.size = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newSize) {
	        $__0.size = newSize;
	      }));
	      $__0.parent.on('size', cache);
	      $__0.on('reset-positioning', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newObservable('size');
	    ((function(cache) {
	      $__0.size = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newSize) {
	        $__0.size = newSize;
	      }));
	      $__0.on('weight', cache);
	      $__0.parent.on('size', cache);
	      $__0.parent.on('reorganize', cache);
	      $__0.on('reset-positioning', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    }));
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.on('size', (function() {
	      $__0.parent.trigger('reorganize');
	    }));
	  });
	  plugin.add('Tile.prototype.resetPositioning', function() {
	    this.trigger('reset-positioning');
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
	    newSubclass: function(SuperClass, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, [SuperClass.prototype.constructor.bind(this)].concat(args));
	      };
	      cls.prototype = Object.create(SuperClass.prototype);
	      U.extend(cls.prototype, prototype);
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
	            Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ZGE3MjZiMDI2ZDEzYmY0NzJmNCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFVLHdCQUFnQixDQUFHLDBDQUFVLEVBQUc7QUFDakQsY0FBVyxDQUFDO0FBR1IsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxvQkFBa0I7QUFDeEIsV0FBTSxD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RCxZQUFTLEVBQUksV0FBVSxDQUFDLFNBQVUsR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUM1QyxRQUFHLElBQUksRUFBSSxJQUFFLENBQUM7QUFDZCxRQUFHLEtBQUssRUFBSSxLQUFHLENBQUM7R0FDakIsQ0FBQyxDQUFDO0FBQ0YsWUFBUyxTQUFTLElBQUksU0FBQyxFQUFHLEdBQU07QUFDL0IsVUFBTyxJQUFJLFdBQVUsQ0FBQyxLQUFJLEVBQUksTUFBSSxDQUFHLE9BQUssRUFBSSxPQUFLLENBQUMsQ0FBQztHQUN0RCxFQUFDO0FBQ0QsWUFBUyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDN0IsVUFBTyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxFQUFDLEdBQUssTUFBSSxJQUFNLE1BQUksR0FBSyxPQUFLLElBQU0sT0FBSyxDQUFDO0dBQ2hGLEVBQUM7QUFJRCxRQUFLLEVBQUksV0FBVSxDQUFDLFNBQVUsTUFBSyxDQUFHLE1BQUksQ0FBRztBQUM1QyxRQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsUUFBRyxNQUFNLEVBQUksTUFBSSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNGLFFBQUssT0FBTyxJQUFJLFNBQUMsRUFBRyxHQUFNO0FBQ3pCLFVBQU8sWUFBVyxDQUFDLEVBQUMsR0FBSyxZQUFXLENBQUMsRUFBQyxHQUFLLFNBQU8sSUFBTSxTQUFPLEdBQUssUUFBTSxJQUFNLFFBQU0sQ0FBQztHQUN4RixFQUFDO0FBR0QsUUFBTyxHQUFDO0FBRVQsaUpBQUU7QUFDRjs7Ozs7OztBR3JSQSxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVkYTcyNmIwMjZkMTNiZjQ3MmY0XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICdwb3NpdGlvbi10cmFja2luZycsXG5cdFx0ZXhwZWN0czogWydjb3JlJ11cblx0fSk7XG5cblxuXHQvKiBwcml2YXRlIG1ldGhvZHMgZm9yIGNhbGN1bGF0aW5nIGFuZCBjYWNoaW5nIGVsZW1lbnQgb2Zmc2V0ICovXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0JywgVS5vbmNlUGVyU3RhY2soZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiB0ZW1wb3JhcmlseSB1bmRvZXMgYWxsICgzRCkgdHJhbnNmb3JtYXRpb25zIG9uIHRoZVxuXHRcdC8vIGNpcmN1aXRib2FyZCBhbmQgcGFyZW50IHRvIG1lYXN1cmUgdGhlIGxlZnQvdG9wIG9mZnNldHMgb2YgYWxsIGFydGVmYWN0cy5cblx0XHQvLyB3ZSdyZSB1c2luZyBgZVswXS5zdHlsZS50cmFuc2Zvcm1gIGluc3RlYWQgb2YgYGUuY3NzKCd0cmFuc2Zvcm0nKWAsXG5cdFx0Ly8gYmVjYXVzZSB0aGUgalF1ZXJ5IHdheSBjYXVzZXMgc29tZSB1bmV4cGxhaW5lZCBzaWRlLWVmZmVjdHMuXG5cblx0XHR2YXIgcmVzdG9yZVRyYW5zZm9ybXMgPSBbdGhpcy5lbGVtZW50LCB0aGlzLmVsZW1lbnQucGFyZW50KCldLm1hcCgoZSkgPT4ge1xuXHRcdFx0dmFyIG9yaWdpbmFsVHJhbnNmb3JtID0gZVswXS5zdHlsZS50cmFuc2Zvcm07XG5cdFx0XHRlWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgZVswXS5zdHlsZS50cmFuc2Zvcm0gPSBvcmlnaW5hbFRyYW5zZm9ybSB9O1xuXHRcdH0pO1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0X2NhY2hlID0gdGhpcy5lbGVtZW50Lm9mZnNldCgpO1xuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoYykgPT4ge1xuXHRcdFx0aWYgKGMuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0KSB7XG5cdFx0XHRcdGMuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmVzdG9yZVRyYW5zZm9ybXMuZm9yRWFjaChVLmNhbGwpO1xuXG5cdH0pKS5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldC5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNpcmN1aXRib2FyZC5fcF9wb3NUcmFja2luZ19zZXRPZmZzZXQuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXG5cdH0pLmFkZCgnVGlsZW1hcC5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gb25seSB0byBiZSBjYWxsZWQgKGluZGlyZWN0bHkpIGJ5IENpcmN1aXRib2FyZC5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0XG5cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldF9jYWNoZSA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKTtcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcblx0XHRcdGlmIChjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCkge1xuXHRcdFx0XHRjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pLmFkZCgnVGlsZS5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gb25seSB0byBiZSBjYWxsZWQgKGluZGlyZWN0bHkpIGJ5IENpcmN1aXRib2FyZC5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0XG5cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldF9jYWNoZSA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKTtcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcblx0XHRcdGlmIChjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCkge1xuXHRcdFx0XHRjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyogdGhlICdvZmZzZXQnIG9ic2VydmFibGUgKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ29mZnNldCcpO1xuXG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy5vZmZzZXQgPSBjYWNoZSgpO1xuXHRcdFx0c2V0SW50ZXJ2YWwoY2FjaGUsIDEwMCk7IC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdPZmZzZXQpID0+IHsgdGhpcy5vZmZzZXQgPSBuZXdPZmZzZXQgfSk7XG5cdFx0XHR0aGlzLm9uKCdyZXNldC1wb3NpdGlvbmluZycsIGNhY2hlKTtcblx0XHR9KShVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcblx0XHR9KSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ29mZnNldCcpO1xuXG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy5vZmZzZXQgPSBjYWNoZSgpO1xuXHRcdFx0c2V0SW50ZXJ2YWwoY2FjaGUsIDEwMCk7IC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdPZmZzZXQpID0+IHsgdGhpcy5vZmZzZXQgPSBuZXdPZmZzZXQgfSk7XG5cdFx0XHR0aGlzLnBhcmVudC5vYnNlcnZlKCdzaXplJywgY2FjaGUpO1xuXHRcdFx0dGhpcy5wYXJlbnQub24oJ29mZnNldCcsIGNhY2hlKTtcblx0XHRcdHRoaXMub24oJ3Jlc2V0LXBvc2l0aW9uaW5nJywgY2FjaGUpO1xuXHRcdH0pKFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcblx0XHR9KSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ29mZnNldCcpO1xuXG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy5vZmZzZXQgPSBjYWNoZSgpO1xuXHRcdFx0c2V0SW50ZXJ2YWwoY2FjaGUsIDEwMCk7IC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdPZmZzZXQpID0+IHsgdGhpcy5vZmZzZXQgPSBuZXdPZmZzZXQgfSk7XG5cdFx0XHR0aGlzLm9uKCd3ZWlnaHQnLCBjYWNoZSk7XG5cdFx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScsIGNhY2hlKTtcblx0XHRcdHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJywgY2FjaGUpO1xuXHRcdFx0dGhpcy5wYXJlbnQub24oJ29mZnNldCcsIGNhY2hlKTtcblx0XHRcdHRoaXMub24oJ3Jlc2V0LXBvc2l0aW9uaW5nJywgY2FjaGUpO1xuXHRcdH0pKFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcblx0XHR9KSk7XG5cblx0fSk7XG5cblxuXHQvKiB0aGUgJ3Bvc2l0aW9uJyBvYnNlcnZhYmxlICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gZm9yIGNvbXBsZXRlbmVzcyBzYWtlOyBpdCdzICgwLCAwKSBieSBkZWZpbml0aW9uXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCdwb3NpdGlvbicsIHsgaW5pdGlhbDogbmV3IFUuUG9zaXRpb24oMCwgMCkgfSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ3Bvc2l0aW9uJyk7XG5cblx0XHQoKHNldFBvc2l0aW9uKSA9PiB7XG5cdFx0XHRzZXRQb3NpdGlvbigpO1xuXHRcdFx0dGhpcy5vbignb2Zmc2V0Jywgc2V0UG9zaXRpb24pO1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQub24oJ29mZnNldCcsIHNldFBvc2l0aW9uKTtcblx0XHR9KSgoKSA9PiB7XG5cdFx0XHR0aGlzLnBvc2l0aW9uID0gVS5Qb3NpdGlvbi5zdWJ0cmFjdCh0aGlzLm9mZnNldCwgdGhpcy5jaXJjdWl0Ym9hcmQub2Zmc2V0KTtcblx0XHR9KTtcblxuXHR9KS5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3T2JzZXJ2YWJsZSgncG9zaXRpb24nKTtcblxuXHRcdCgoc2V0UG9zaXRpb24pID0+IHtcblx0XHRcdHNldFBvc2l0aW9uKCk7XG5cdFx0XHR0aGlzLm9uKCdvZmZzZXQnLCBzZXRQb3NpdGlvbik7XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5vbignb2Zmc2V0Jywgc2V0UG9zaXRpb24pO1xuXHRcdH0pKCgpID0+IHtcblx0XHRcdHRoaXMucG9zaXRpb24gPSBVLlBvc2l0aW9uLnN1YnRyYWN0KHRoaXMub2Zmc2V0LCB0aGlzLmNpcmN1aXRib2FyZC5vZmZzZXQpO1xuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyogdGhlICdzaXplJyBvYnNlcnZhYmxlICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCdzaXplJyk7XG5cblx0XHQoKGNhY2hlKSA9PiB7XG5cdFx0XHR0aGlzLnNpemUgPSBjYWNoZSgpO1xuXHRcdFx0c2V0SW50ZXJ2YWwoY2FjaGUsIDEwMCk7IC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMuc2l6ZSA9IG5ld1NpemUgfSk7XG5cdFx0XHQoIHRoaXMub3B0aW9ucy5yZXNpemVFdmVudCB8fCBVLmJpbmQoJCh3aW5kb3cpLCAncmVzaXplJykgKShjYWNoZSk7XG5cdFx0XHR0aGlzLm9uKCdyZXNldC1wb3NpdGlvbmluZycsIGNhY2hlKTtcblx0XHR9KShVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gbmV3IFUuU2l6ZSh0aGlzLmVsZW1lbnQuaGVpZ2h0KCksIHRoaXMuZWxlbWVudC53aWR0aCgpKSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ3NpemUnKTtcblxuXHRcdCgoY2FjaGUpID0+IHtcblx0XHRcdHRoaXMuc2l6ZSA9IGNhY2hlKCk7XG5cdFx0XHRzZXRJbnRlcnZhbChjYWNoZSwgMTAwKTsgLy8gVE9ETzogZmluZCB0aGUgcHJvcGVyIHdheSB0byBrZWVwIHRoaXMgdXBkYXRlZFxuXHRcdFx0Y2FjaGUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy5zaXplID0gbmV3U2l6ZSB9KTtcblx0XHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgY2FjaGUpO1xuXHRcdFx0dGhpcy5vbigncmVzZXQtcG9zaXRpb25pbmcnLCBjYWNoZSk7XG5cdFx0fSkoVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+IG5ldyBVLlNpemUodGhpcy5lbGVtZW50LmhlaWdodCgpLCB0aGlzLmVsZW1lbnQud2lkdGgoKSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCdzaXplJyk7XG5cblx0XHQoKGNhY2hlKSA9PiB7XG5cdFx0XHR0aGlzLnNpemUgPSBjYWNoZSgpO1xuXHRcdFx0c2V0SW50ZXJ2YWwoY2FjaGUsIDEwMCk7IC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMuc2l6ZSA9IG5ld1NpemUgfSk7XG5cdFx0XHR0aGlzLm9uKCd3ZWlnaHQnLCBjYWNoZSk7XG5cdFx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScsIGNhY2hlKTtcblx0XHRcdHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJywgY2FjaGUpO1xuXHRcdFx0dGhpcy5vbigncmVzZXQtcG9zaXRpb25pbmcnLCBjYWNoZSk7XG5cdFx0fSkoVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+IG5ldyBVLlNpemUodGhpcy5lbGVtZW50LmhlaWdodCgpLCB0aGlzLmVsZW1lbnQud2lkdGgoKSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkpO1xuXG5cdH0pO1xuXG5cblx0LyogIGlmIHRoZSBzaXplIG9mIGFueSB0aWxlIGNoYW5nZXMsIHRyaWdnZXIgdGhlICdyZW9yZ2FuaXplJyAgICAgKi9cblx0LyogIGV2ZW50IG9uIHRoZSBwYXJlbnQgdGlsZW1hcCwgc28gdGhhdCBzaWJsaW5nIHRpbGVzIGNhbiByZWFjdCAgKi9cblx0cGx1Z2luLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5vbignc2l6ZScsICgpID0+IHsgdGhpcy5wYXJlbnQudHJpZ2dlcigncmVvcmdhbml6ZScpIH0pO1xuXG5cdH0pO1xuXG5cblx0LyogYSBtZXRob2QgdG8gdHJpZ2dlciBwb3NpdGlvbi9zaXplIHJlY2hlY2sgKi9cblx0cGx1Z2luLmFkZCgnVGlsZS5wcm90b3R5cGUucmVzZXRQb3NpdGlvbmluZycsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMudHJpZ2dlcigncmVzZXQtcG9zaXRpb25pbmcnKTtcblxuXHR9KTtcblxufSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC1wb3NpdGlvbi10cmFja2luZy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblxuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVGbiA9ICgpID0+IHtcblx0XHRcdFx0aWYgKHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkKSB7XG5cdFx0XHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRkZWxldGUgdW5zdWJzY3JpYmVGbi51bnN1YnNjcmliZU9uO1xuXHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0dW5zdWJzY3JpYmVGbi51bnN1YnNjcmliZU9uID0gKHN1YnNjcmliZXIpID0+IHtcblx0XHRcdFx0c3Vic2NyaWJlcih1bnN1YnNjcmliZUZuKTtcblx0XHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHVuc3Vic2NyaWJlRm47XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdG9wdGlvbmFsQ3VycnkoZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChmbi5sZW5ndGggPD0gYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBVLmJpbmRBKGZuLCB0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtcG9zaXRpb24tdHJhY2tpbmcuanMifQ==