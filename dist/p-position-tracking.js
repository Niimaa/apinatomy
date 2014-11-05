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
	    restoreTransforms.forEach((function(restore) {
	      restore();
	    }));
	  })).insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_offset = U.cached({
	      retrieve: (function() {
	        $__0._p_posTracking_setOffset();
	        return $__0._p_posTracking_offset_cache;
	      }),
	      isEqual: U.Position.equals
	    });
	    U.observable(this, 'position', {initial: new U.Position(0, 0)});
	    setTimeout((function() {
	      $__0._p_posTracking_offset();
	      $__0.trigger('position', $__0.position);
	    }));
	  }).add('Tilemap.prototype._p_posTracking_setOffset', function() {
	    this._p_posTracking_offset_cache = this.element.offset();
	    this.children.forEach((function(c) {
	      if (c._p_posTracking_setOffset) {
	        c._p_posTracking_setOffset();
	      }
	    }));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_offset = U.cached({
	      retrieve: (function() {
	        $__0.circuitboard._p_posTracking_setOffset();
	        return $__0._p_posTracking_offset_cache;
	      }),
	      isEqual: U.Position.equals
	    });
	    setTimeout((function() {
	      $__0._p_posTracking_offset();
	      $__0.trigger('position', $__0.position);
	    }));
	    this.parent.on('size', (function() {
	      $__0._p_posTracking_offset();
	    }));
	    var _getPos = (function() {
	      return U.Position.subtract($__0._p_posTracking_offset(), $__0.circuitboard._p_posTracking_offset());
	    });
	    U.observable(this, 'position', {initial: new U.Position(0, 0)});
	    this._p_posTracking_offset.onChange((function() {
	      $__0.position = _getPos();
	    }));
	  }).add('Tile.prototype._p_posTracking_setOffset', function() {
	    this._p_posTracking_offset_cache = this.element.offset();
	    this.children.forEach((function(c) {
	      if (c._p_posTracking_setOffset) {
	        c._p_posTracking_setOffset();
	      }
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_offset = U.cached({
	      retrieve: (function() {
	        $__0.circuitboard._p_posTracking_setOffset();
	        return $__0._p_posTracking_offset_cache;
	      }),
	      isEqual: U.Position.equals
	    });
	    setTimeout((function() {
	      $__0._p_posTracking_offset();
	      $__0.trigger('position', $__0.position);
	    }));
	    this.on('weight', (function() {
	      $__0._p_posTracking_offset();
	    }));
	    this.parent.on('position', (function() {
	      $__0._p_posTracking_offset();
	    }));
	    this.parent.on('size', (function() {
	      $__0._p_posTracking_offset();
	    }));
	    this.parent.on('reorganize', (function() {
	      $__0._p_posTracking_offset();
	    }));
	    var _getPos = (function() {
	      return U.Position.subtract($__0._p_posTracking_offset(), $__0.circuitboard._p_posTracking_offset());
	    });
	    U.observable(this, 'position', {initial: new U.Position(0, 0)});
	    this._p_posTracking_offset.onChange((function() {
	      $__0.position = _getPos();
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_size = U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    });
	    setTimeout((function() {
	      $__0._p_posTracking_size();
	      $__0.trigger('size', $__0.size);
	    }));
	    (this.options.resizeEvent || U.bind($(window), 'resize'))((function() {
	      setTimeout($__0._p_posTracking_size);
	    }));
	    U.observable(this, 'size', {initial: this._p_posTracking_size()});
	    this._p_posTracking_size.onChange((function(newSize) {
	      $__0.size = newSize;
	    }));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_size = U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    });
	    setTimeout((function() {
	      $__0._p_posTracking_size();
	      $__0.trigger('size', $__0.size);
	    }));
	    this.parent.on('size', (function() {
	      $__0._p_posTracking_size();
	    }));
	    U.observable(this, 'size', {initial: this._p_posTracking_size()});
	    this._p_posTracking_size.onChange((function(newSize) {
	      $__0.size = newSize;
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_size = U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    });
	    setTimeout((function() {
	      $__0._p_posTracking_size();
	      $__0.trigger('size', $__0.size);
	    }));
	    this.on('weight', (function() {
	      $__0._p_posTracking_size();
	    }));
	    this.parent.on('size', (function() {
	      $__0._p_posTracking_size();
	    }));
	    this.parent.on('reorganize', (function() {
	      $__0._p_posTracking_size();
	    }));
	    U.observable(this, 'size', {initial: this._p_posTracking_size()});
	    this._p_posTracking_size.onChange((function(newSize) {
	      $__0.size = newSize;
	    }));
	    this.on('size', (function() {
	      $__0.parent.trigger('reorganize');
	    }));
	  });
	  plugin.add('Tile.prototype.resetPositioning', function() {
	    this._p_posTracking_offset();
	    this._p_posTracking_size();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhMTZlYmFjNWE5NGVmZjFlZTc3MyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUc7QUFDZixjQUFXLENBQUM7QUFJUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLG9CQUFrQjtBQUN4QixXQUFNLENBQUcsRUFBQyxNQUFLLENBQUM7QUFBQSxHQUNqQixDQUFDLENBQUM7QUFJRixRQUFLLElBQUssQ0FBQyxpREFBZ0QsQ0FBRyxlQUFjLENBQUMsU0FBVTtBQU9sRix5QkFBZ0IsRUFBSSxFQUFDLElBQUcs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QztHQUNuQixDQUFDLENBQUM7QUFDRixRQUFLLE9BQU8sSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUN6QixVQUFPLFlBQVcsQ0FBQyxFQUFDLEdBQUssWUFBVyxDQUFDLEVBQUMsR0FBSyxTQUFPLElBQU0sU0FBTyxHQUFLLFFBQU0sSUFBTSxRQUFNLENBQUM7R0FDeEYsRUFBQztBQUdELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYTE2ZWJhYzVhOTRlZmYxZWU3NzNcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0Jy4vdXRpbC9taXNjLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogdGhlIHBsdWdpbiAqL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAncG9zaXRpb24tdHJhY2tpbmcnLFxuXHRcdGV4cGVjdHM6IFsnY29yZSddXG5cdH0pO1xuXG5cblx0LyogcG9zaXRpb24gdHJhY2tpbmcgKi9cblx0cGx1Z2luLmFkZCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5fcF9wb3NUcmFja2luZ19zZXRPZmZzZXQnLCBVLm9uY2VQZXJTdGFjayhmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIHRlbXBvcmFyaWx5IHVuZG9lcyBhbGwgKDNEKSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlXG5cdFx0Ly8gY2lyY3VpdGJvYXJkIGFuZCBwYXJlbnQgdG8gbWVhc3VyZSB0aGUgbGVmdC90b3Agb2Zmc2V0cyBvZiBhbGwgYXJ0ZWZhY3RzLlxuXHRcdC8vIHdlJ3JlIHVzaW5nIGBlWzBdLnN0eWxlLnRyYW5zZm9ybWAgaW5zdGVhZCBvZiBgZS5jc3MoJ3RyYW5zZm9ybScpYCxcblx0XHQvLyBiZWNhdXNlIHRoZSBqUXVlcnkgd2F5IGNhdXNlcyBzb21lIHVuZXhwbGFpbmVkIHNpZGUtZWZmZWN0cy5cblxuXHRcdHZhciByZXN0b3JlVHJhbnNmb3JtcyA9IFt0aGlzLmVsZW1lbnQsIHRoaXMuZWxlbWVudC5wYXJlbnQoKV0ubWFwKChlKSA9PiB7XG5cdFx0XHR2YXIgb3JpZ2luYWxUcmFuc2Zvcm0gPSBlWzBdLnN0eWxlLnRyYW5zZm9ybTtcblx0XHRcdGVbMF0uc3R5bGUudHJhbnNmb3JtID0gJyc7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBlWzBdLnN0eWxlLnRyYW5zZm9ybSA9IG9yaWdpbmFsVHJhbnNmb3JtIH07XG5cdFx0fSk7XG5cdFx0dGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGUgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCk7XG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjKSA9PiB7XG5cdFx0XHRpZiAoYy5fcF9wb3NUcmFja2luZ19zZXRPZmZzZXQpIHtcblx0XHRcdFx0Yy5fcF9wb3NUcmFja2luZ19zZXRPZmZzZXQoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXN0b3JlVHJhbnNmb3Jtcy5mb3JFYWNoKChyZXN0b3JlKSA9PiB7IHJlc3RvcmUoKSB9KTtcblxuXHR9KSkuaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qIGNhY2hpbmcgb2Zmc2V0ICovXG5cdFx0dGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXQgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcblx0XHR9KTtcblxuXHRcdC8qIGRlZmluZSAncG9zaXRpb24nIHByb3BlcnR5ICovXG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsICdwb3NpdGlvbicsIHsgaW5pdGlhbDogbmV3IFUuUG9zaXRpb24oMCwgMCkgfSk7XG5cblx0XHQvKiB3aGVuIHRvIHRyaWdnZXIgYSBjaGFuZ2UgKi9cblx0XHRzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXQoKTsgdGhpcy50cmlnZ2VyKCdwb3NpdGlvbicsIHRoaXMucG9zaXRpb24pOyB9KTtcblxuXHR9KS5hZGQoJ1RpbGVtYXAucHJvdG90eXBlLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIG9ubHkgdG8gYmUgY2FsbGVkIGJ5IENpcmN1aXRib2FyZC5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0XG5cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldF9jYWNoZSA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKTtcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcblx0XHRcdGlmIChjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCkge1xuXHRcdFx0XHRjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pLmluc2VydCgnVGlsZW1hcC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogY2FjaGluZyBvZmZzZXQgKi9cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldCA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcblx0XHR9KTtcblxuXHRcdC8qIHdoZW4gdG8gdHJpZ2dlciBhIGNoYW5nZSAqL1xuXHRcdHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldCgpOyB0aGlzLnRyaWdnZXIoJ3Bvc2l0aW9uJywgdGhpcy5wb3NpdGlvbik7IH0pO1xuXHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgKCkgPT4geyB0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldCgpIH0pO1xuXG5cdFx0LyogZGVmaW5lICdwb3NpdGlvbicgcHJvcGVydHkgKi9cblx0XHR2YXIgX2dldFBvcyA9ICgpID0+IFUuUG9zaXRpb24uc3VidHJhY3QodGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXQoKSwgdGhpcy5jaXJjdWl0Ym9hcmQuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0KCkpO1xuXHRcdFUub2JzZXJ2YWJsZSh0aGlzLCAncG9zaXRpb24nLCB7IGluaXRpYWw6IG5ldyBVLlBvc2l0aW9uKDAsIDApIH0pO1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0Lm9uQ2hhbmdlKCgpID0+IHsgdGhpcy5wb3NpdGlvbiA9IF9nZXRQb3MoKSB9KTtcblxuXHR9KS5hZGQoJ1RpbGUucHJvdG90eXBlLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIG9ubHkgdG8gYmUgY2FsbGVkIGJ5IENpcmN1aXRib2FyZC5wcm90b3R5cGUuX3BfcG9zVHJhY2tpbmdfc2V0T2Zmc2V0XG5cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldF9jYWNoZSA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKTtcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcblx0XHRcdGlmIChjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCkge1xuXHRcdFx0XHRjLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogY2FjaGluZyBvZmZzZXQgKi9cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldCA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX3NldE9mZnNldCgpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXRfY2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcblx0XHR9KTtcblxuXHRcdC8qIHdoZW4gdG8gdHJpZ2dlciBhIGNoYW5nZSAqL1xuXHRcdHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldCgpOyB0aGlzLnRyaWdnZXIoJ3Bvc2l0aW9uJywgdGhpcy5wb3NpdGlvbik7IH0pO1xuXHRcdHRoaXMub24oJ3dlaWdodCcsICgpID0+IHsgdGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXQoKSB9KTtcblx0XHR0aGlzLnBhcmVudC5vbigncG9zaXRpb24nLCAoKSA9PiB7IHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0KCkgfSk7XG5cdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0KCkgfSk7XG5cdFx0dGhpcy5wYXJlbnQub24oJ3Jlb3JnYW5pemUnLCAoKSA9PiB7IHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0KCkgfSk7XG5cblx0XHQvKiBkZWZpbmUgJ3Bvc2l0aW9uJyBwcm9wZXJ0eSAqL1xuXHRcdHZhciBfZ2V0UG9zID0gKCkgPT4gVS5Qb3NpdGlvbi5zdWJ0cmFjdCh0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldCgpLCB0aGlzLmNpcmN1aXRib2FyZC5fcF9wb3NUcmFja2luZ19vZmZzZXQoKSk7XG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsICdwb3NpdGlvbicsIHsgaW5pdGlhbDogbmV3IFUuUG9zaXRpb24oMCwgMCkgfSk7XG5cdFx0dGhpcy5fcF9wb3NUcmFja2luZ19vZmZzZXQub25DaGFuZ2UoKCkgPT4geyB0aGlzLnBvc2l0aW9uID0gX2dldFBvcygpIH0pO1xuXG5cdH0pO1xuXG5cblx0Lyogc2l6ZSB0cmFja2luZyAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qIGNhY2hpbmcgdGhlIHNpemUgKi9cblx0XHR0aGlzLl9wX3Bvc1RyYWNraW5nX3NpemUgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gbmV3IFUuU2l6ZSh0aGlzLmVsZW1lbnQuaGVpZ2h0KCksIHRoaXMuZWxlbWVudC53aWR0aCgpKSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KTtcblxuXHRcdC8qIHdoZW4gdG8gdHJpZ2dlciBhIGNoYW5nZSAqL1xuXHRcdHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLl9wX3Bvc1RyYWNraW5nX3NpemUoKTsgdGhpcy50cmlnZ2VyKCdzaXplJywgdGhpcy5zaXplKTsgfSk7XG5cdFx0KHRoaXMub3B0aW9ucy5yZXNpemVFdmVudCB8fCBVLmJpbmQoJCh3aW5kb3cpLCAncmVzaXplJykpKCgpID0+IHtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5fcF9wb3NUcmFja2luZ19zaXplKTtcblx0XHR9KTtcblxuXHRcdC8qIGRlZmluZSAnc2l6ZScgcHJvcGVydHkgKi9cblx0XHRVLm9ic2VydmFibGUodGhpcywgJ3NpemUnLCB7IGluaXRpYWw6IHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSgpIH0pO1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnNpemUgPSBuZXdTaXplIH0pO1xuXG5cdH0pLmluc2VydCgnVGlsZW1hcC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogY2FjaGluZyB0aGUgc2l6ZSAqL1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiBuZXcgVS5TaXplKHRoaXMuZWxlbWVudC5oZWlnaHQoKSwgdGhpcy5lbGVtZW50LndpZHRoKCkpLFxuXHRcdFx0aXNFcXVhbDogVS5TaXplLmVxdWFsc1xuXHRcdH0pO1xuXG5cdFx0Lyogd2hlbiB0byB0cmlnZ2VyIGEgY2hhbmdlICovXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7IHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSgpOyB0aGlzLnRyaWdnZXIoJ3NpemUnLCB0aGlzLnNpemUpOyB9KTtcblx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScsICgpID0+IHsgdGhpcy5fcF9wb3NUcmFja2luZ19zaXplKCkgfSk7XG5cblxuXHRcdC8qIGRlZmluZSAnc2l6ZScgcHJvcGVydHkgKi9cblx0XHRVLm9ic2VydmFibGUodGhpcywgJ3NpemUnLCB7IGluaXRpYWw6IHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSgpIH0pO1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnNpemUgPSBuZXdTaXplIH0pO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogY2FjaGluZyB0aGUgc2l6ZSAqL1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiBuZXcgVS5TaXplKHRoaXMuZWxlbWVudC5oZWlnaHQoKSwgdGhpcy5lbGVtZW50LndpZHRoKCkpLFxuXHRcdFx0aXNFcXVhbDogVS5TaXplLmVxdWFsc1xuXHRcdH0pO1xuXG5cdFx0Lyogd2hlbiB0byB0cmlnZ2VyIGEgY2hhbmdlICovXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7IHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSgpOyB0aGlzLnRyaWdnZXIoJ3NpemUnLCB0aGlzLnNpemUpOyB9KTtcblx0XHR0aGlzLm9uKCd3ZWlnaHQnLCAoKSA9PiB7IHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSgpIH0pO1xuXHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJywgKCkgPT4geyB0aGlzLl9wX3Bvc1RyYWNraW5nX3NpemUoKSB9KTtcblx0XHR0aGlzLnBhcmVudC5vbigncmVvcmdhbml6ZScsICgpID0+IHsgdGhpcy5fcF9wb3NUcmFja2luZ19zaXplKCkgfSk7XG5cblxuXHRcdC8qIGRlZmluZSAnc2l6ZScgcHJvcGVydHkgKi9cblx0XHRVLm9ic2VydmFibGUodGhpcywgJ3NpemUnLCB7IGluaXRpYWw6IHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZSgpIH0pO1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfc2l6ZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnNpemUgPSBuZXdTaXplIH0pO1xuXG5cblx0XHQvKiAgaWYgdGhlIHNpemUgb2YgYW55IHRpbGUgY2hhbmdlcywgdHJpZ2dlciB0aGUgYHJlb3JnYW5pemVgICAgICAqL1xuXHRcdC8qICBldmVudCBvbiB0aGUgcGFyZW50IHRpbGVtYXAsIHNvIHRoYXQgc2libGluZyB0aWxlcyBjYW4gcmVhY3QgICovXG5cdFx0dGhpcy5vbignc2l6ZScsICgpID0+IHsgdGhpcy5wYXJlbnQudHJpZ2dlcigncmVvcmdhbml6ZScpIH0pO1xuXG5cdH0pO1xuXG5cblx0LyogYSBtZXRob2QgdG8gdHJpZ2dlciBwb3NpdGlvbiAvIHNpemUgcmVjaGVjayAqL1xuXHRwbHVnaW4uYWRkKCdUaWxlLnByb3RvdHlwZS5yZXNldFBvc2l0aW9uaW5nJywgZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0KCk7XG5cdFx0dGhpcy5fcF9wb3NUcmFja2luZ19zaXplKCk7XG5cdH0pO1xufSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC1wb3NpdGlvbi10cmFja2luZy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW3N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG5hbWUgKG1hbmRhdG9yeSkgICAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMuaW5pdGlhbCAgICAtIHRoZSBpbml0aWFsIHZhbHVlOyBkZWZhdWx0cyB0byB1bmRlZmluZWRcblx0XHQvLyBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgb3IgYW55IHRyYW5zZm9ybWF0aW9uLiBJdCBjYW4gYWxzbyB0aHJvdyBhbiBleGNlcHRpb24sIHdoaWNoIHdpbGwganVzdCBiZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLlxuXHRcdG9ic2VydmFibGUob2JqLCBuYW1lLCB7aW5pdGlhbCwgdmFsaWRhdGlvbn0gPSB7fSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihjYWNoZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSk7XG5cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlLnB1c2goY2IpOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8vIEhUTUwgZWxlbWVudCBwb3NpdGlvblxuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEudG9wID09PSBiLnRvcCAmJiBhLmxlZnQgPT09IGIubGVmdDtcblx0fTtcblxuXG5cdC8vIEhUTUwgZWxlbWVudCBzaXplXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXBvc2l0aW9uLXRyYWNraW5nLmpzIn0=