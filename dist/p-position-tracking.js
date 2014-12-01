(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bacon"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bacon", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bacon"), require("bluebird")) : factory(root["jQuery"], root["Bacon"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'position-tracking',
	    expects: ['core', 'tile-weight']
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    this.newEvent('reset-positioning');
	  }).add('Tile.prototype.resetPositioning', function() {
	    this.trigger('reset-positioning');
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    var PACING = Bacon.interval(500).merge(Bacon.once());
	    var limiter = new Bacon.Bus();
	    var windowWanted = false;
	    PACING.filter((function() {
	      return windowWanted;
	    })).onValue((function() {
	      try {
	        var restoreTransforms = [$__0.element, $__0.element.parent()].map((function(e) {
	          var originalTransform = e[0].style.transform;
	          e[0].style.transform = '';
	          return (function() {
	            e[0].style.transform = originalTransform;
	          });
	        }));
	        limiter.push();
	        windowWanted = false;
	        restoreTransforms.forEach(U.call);
	      } catch (e) {
	        console.error(e);
	      }
	    }));
	    this._p_posTracking_offsetLimiter = function() {
	      for (var pacing = [],
	          $__1 = 0; $__1 < arguments.length; $__1++)
	        pacing[$__1] = arguments[$__1];
	      pacing = Bacon.mergeAll(pacing);
	      var resultBus = new Bacon.Bus();
	      var wantWindow = false;
	      pacing.onValue((function() {
	        wantWindow = windowWanted = true;
	      }));
	      limiter.filter((function() {
	        return wantWindow;
	      })).onValue((function() {
	        resultBus.push();
	        wantWindow = false;
	      }));
	      return resultBus;
	    };
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      source: this._p_posTracking_offsetLimiter(Bacon.once(), Bacon.interval(100)).map((function() {
	        return $__0.element.offset();
	      })),
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    });
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      source: this.circuitboard._p_posTracking_offsetLimiter(Bacon.once(), Bacon.interval(100), this.parent.on('size'), this.parent.on('offset')).map((function() {
	        return $__0.element.offset();
	      })),
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    });
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      source: this.circuitboard._p_posTracking_offsetLimiter(Bacon.once(), Bacon.interval(100), this.parent.on('size'), this.parent.on('offset'), this.parent.on('reorganize'), this.on('weight').changes(), this.on('reset-positioning')).map((function() {
	        return $__0.element.offset();
	      })),
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    });
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    this.newProperty('position', {source: Bacon.constant(new U.Position(0, 0))});
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position');
	    ((function(setPosition) {
	      setPosition();
	      $__0.on('offset', setPosition);
	      $__0.circuitboard.on('offset', setPosition);
	    }))((function() {
	      $__0.position = U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position');
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
	    this.newProperty('size');
	    ((function(cache) {
	      $__0.size = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newSize) {
	        $__0.size = newSize;
	      }));
	      ($__0.options.resizeEvent || U.bind($(window), 'resize'))(cache);
	    }))(U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    }));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size');
	    ((function(cache) {
	      $__0.size = cache();
	      setInterval(cache, 100);
	      cache.onChange((function(newSize) {
	        $__0.size = newSize;
	      }));
	      $__0.parent.on('size', cache);
	    }))(U.cached({
	      retrieve: (function() {
	        return new U.Size($__0.element.height(), $__0.element.width());
	      }),
	      isEqual: U.Size.equals
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size');
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
	  plugin.insert('Tilemap.prototype.construct', function() {
	    this.newEvent('reorganize');
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, Bacon) {
	  'use strict';
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    return window.setTimeout(f, 1000 / 60);
	  }));
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
	    isPlainObject: function(val) {
	      return typeof val === 'object' && val.constructor === Object;
	    },
	    isFunction: function(val) {
	      return typeof val === 'function';
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
	    animationFrames: function() {
	      return Bacon.fromBinder((function(sink) {
	        var stop = false;
	        var iterationFn = (function() {
	          if (stop) {
	            return;
	          }
	          sink();
	          requestAnimationFrameFn(iterationFn);
	        });
	        iterationFn();
	        return (function() {
	          stop = true;
	          sink(new Bacon.End());
	        });
	      }));
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NWVlZWM5YTcyNTZjYWI2OGM1MSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy8vc291cmNlL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25cIixcImNvbW1vbmpzXCI6XCJiYWNvblwiLFwiYW1kXCI6XCJiYWNvblwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7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TyxJQUFJLFdBQVUsQ0FBQyxLQUFJLEVBQUksTUFBSSxDQUFHLE9BQUssRUFBSSxPQUFLLENBQUMsQ0FBQztHQUN0RCxFQUFDO0FBQ0QsWUFBUyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDN0IsVUFBTyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxFQUFDLEdBQUssTUFBSSxJQUFNLE1BQUksR0FBSyxPQUFLLElBQU0sT0FBSyxDQUFDO0dBQ2hGLEVBQUM7QUFJRCxRQUFLLEVBQUksV0FBVSxDQUFDLFNBQVUsTUFBSyxDQUFHLE1BQUksQ0FBRztBQUM1QyxRQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsUUFBRyxNQUFNLEVBQUksTUFBSSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNGLFFBQUssT0FBTyxJQUFJLFNBQUMsRUFBRyxHQUFNO0FBQ3pCLFVBQU8sWUFBVyxDQUFDLEVBQUMsR0FBSyxZQUFXLENBQUMsRUFBQyxHQUFLLFNBQU8sSUFBTSxTQUFPLEdBQUssUUFBTSxJQUFNLFFBQU0sQ0FBQztHQUN4RixFQUFDO0FBR0QsUUFBTyxHQUFDO0FBRVQsaUpBQUU7QUFDRjs7Ozs7OztBR3RSQSxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmFjb25cIiwgXCJibHVlYmlyZFwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJCYWNvblwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ1ZWVlYzlhNzI1NmNhYjY4YzUxXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJ2JhY29uJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAncG9zaXRpb24tdHJhY2tpbmcnLFxuXHRcdGV4cGVjdHM6IFsnY29yZScsICd0aWxlLXdlaWdodCddXG5cdH0pO1xuXG5cblxuXHQvKiBhIG1ldGhvZCB0byB0cmlnZ2VyIHBvc2l0aW9uL3NpemUgcmVjaGVjayAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld0V2ZW50KCdyZXNldC1wb3NpdGlvbmluZycpO1xuXG5cdH0pLmFkZCgnVGlsZS5wcm90b3R5cGUucmVzZXRQb3NpdGlvbmluZycsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMudHJpZ2dlcigncmVzZXQtcG9zaXRpb25pbmcnKTtcblxuXHR9KTtcblxuXG5cdC8qIGNhbGN1bGF0aW5nIGFuZCBjYWNoaW5nIGVsZW1lbnQgb2Zmc2V0ICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIFBBQ0lORyA9IEJhY29uLmludGVydmFsKDUwMCkubWVyZ2UoQmFjb24ub25jZSgpKTtcblxuXHRcdHZhciBsaW1pdGVyID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciB3aW5kb3dXYW50ZWQgPSBmYWxzZTtcblxuXHRcdFBBQ0lORy5maWx0ZXIoKCkgPT4gd2luZG93V2FudGVkKS5vblZhbHVlKCgpID0+IHtcblxuXHRcdFx0dHJ5IHtcblxuXHRcdFx0XHQvKiBzZXR1cDogdGVtcG9yYXJpbHkgdW5kb2VzIGFsbCAoM0QpIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY2lyY3VpdGJvYXJkICovXG5cdFx0XHRcdHZhciByZXN0b3JlVHJhbnNmb3JtcyA9IFt0aGlzLmVsZW1lbnQsIHRoaXMuZWxlbWVudC5wYXJlbnQoKV0ubWFwKChlKSA9PiB7XG5cdFx0XHRcdFx0Ly8gd2UncmUgdXNpbmcgYGVbMF0uc3R5bGUudHJhbnNmb3JtYCBpbnN0ZWFkIG9mIGBlLmNzcygndHJhbnNmb3JtJylgLFxuXHRcdFx0XHRcdC8vIGJlY2F1c2UgdGhlIGpRdWVyeSB3YXkgY2F1c2VzIHNvbWUgdW5leHBsYWluZWQgc2lkZS1lZmZlY3RzLlxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbFRyYW5zZm9ybSA9IGVbMF0uc3R5bGUudHJhbnNmb3JtO1xuXHRcdFx0XHRcdGVbMF0uc3R5bGUudHJhbnNmb3JtID0gJyc7XG5cdFx0XHRcdFx0cmV0dXJuICgpID0+IHsgZVswXS5zdHlsZS50cmFuc2Zvcm0gPSBvcmlnaW5hbFRyYW5zZm9ybSB9O1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiB0aGUgd2luZG93IGZvciBjb21wdXRpbmcgYW55IHRpbGUncyBvZmZzZXQgKi9cblx0XHRcdFx0bGltaXRlci5wdXNoKCk7XG5cdFx0XHRcdHdpbmRvd1dhbnRlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdC8qIGJyZWFrZG93bjogcmVzdG9yZSB0aGUgKDNEKSB0cmFuc2Zvcm1hdGlvbnMgKi9cblx0XHRcdFx0cmVzdG9yZVRyYW5zZm9ybXMuZm9yRWFjaChVLmNhbGwpO1xuXG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdHRoaXMuX3BfcG9zVHJhY2tpbmdfb2Zmc2V0TGltaXRlciA9IGZ1bmN0aW9uICguLi5wYWNpbmcpIHtcblx0XHRcdHBhY2luZyA9IEJhY29uLm1lcmdlQWxsKHBhY2luZyk7XG5cblx0XHRcdHZhciByZXN1bHRCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHR2YXIgd2FudFdpbmRvdyA9IGZhbHNlO1xuXG5cdFx0XHRwYWNpbmcub25WYWx1ZSgoKSA9PiB7IHdhbnRXaW5kb3cgPSB3aW5kb3dXYW50ZWQgPSB0cnVlIH0pO1xuXG5cdFx0XHRsaW1pdGVyLmZpbHRlcigoKSA9PiB3YW50V2luZG93KS5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0cmVzdWx0QnVzLnB1c2goKTtcblx0XHRcdFx0d2FudFdpbmRvdyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByZXN1bHRCdXM7XG5cdFx0fTtcblxuXHR9KTtcblxuXG5cdC8qIHRoZSAnb2Zmc2V0JyBvYnNlcnZhYmxlICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnb2Zmc2V0Jywge1xuXHRcdFx0c291cmNlOiB0aGlzLl9wX3Bvc1RyYWNraW5nX29mZnNldExpbWl0ZXIoXG5cdFx0XHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0XHRcdEJhY29uLmludGVydmFsKDEwMCkgLy8gVE9ETzogZmluZCB0aGUgcHJvcGVyIHdheSB0byBrZWVwIHRoaXMgdXBkYXRlZFxuXHRcdFx0KS5tYXAoKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpKSxcblx0XHRcdGlzRXF1YWw6IFUuUG9zaXRpb24uZXF1YWxzLFxuXHRcdFx0aW5pdGlhbDogdGhpcy5lbGVtZW50Lm9mZnNldCgpXG5cdFx0fSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdvZmZzZXQnLCB7XG5cdFx0XHRzb3VyY2U6IHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX29mZnNldExpbWl0ZXIoXG5cdFx0XHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0XHRcdEJhY29uLmludGVydmFsKDEwMCksIC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdFx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScpLFxuXHRcdFx0XHRcdHRoaXMucGFyZW50Lm9uKCdvZmZzZXQnKVxuXHRcdFx0KS5tYXAoKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpKSxcblx0XHRcdGlzRXF1YWw6IFUuUG9zaXRpb24uZXF1YWxzLFxuXHRcdFx0aW5pdGlhbDogdGhpcy5lbGVtZW50Lm9mZnNldCgpXG5cdFx0fSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdvZmZzZXQnLCB7XG5cdFx0XHRzb3VyY2U6IHRoaXMuY2lyY3VpdGJvYXJkLl9wX3Bvc1RyYWNraW5nX29mZnNldExpbWl0ZXIoXG5cdFx0XHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0XHRcdEJhY29uLmludGVydmFsKDEwMCksIC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdFx0XHR0aGlzLnBhcmVudC5vbignc2l6ZScpLFxuXHRcdFx0XHRcdHRoaXMucGFyZW50Lm9uKCdvZmZzZXQnKSxcblx0XHRcdFx0XHR0aGlzLnBhcmVudC5vbigncmVvcmdhbml6ZScpLFxuXHRcdFx0XHRcdHRoaXMub24oJ3dlaWdodCcpLmNoYW5nZXMoKSxcblx0XHRcdFx0XHR0aGlzLm9uKCdyZXNldC1wb3NpdGlvbmluZycpXG5cdFx0XHQpLm1hcCgoKSA9PiB0aGlzLmVsZW1lbnQub2Zmc2V0KCkpLFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHMsXG5cdFx0XHRpbml0aWFsOiB0aGlzLmVsZW1lbnQub2Zmc2V0KClcblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qIHRoZSAncG9zaXRpb24nIG9ic2VydmFibGUgKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBmb3IgY29tcGxldGVuZXNzIHNha2U7IGl0J3MgKDAsIDApIGJ5IGRlZmluaXRpb25cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdwb3NpdGlvbicsIHsgc291cmNlOiBCYWNvbi5jb25zdGFudChuZXcgVS5Qb3NpdGlvbigwLCAwKSkgfSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdwb3NpdGlvbicpO1xuXG5cdFx0KChzZXRQb3NpdGlvbikgPT4ge1xuXHRcdFx0c2V0UG9zaXRpb24oKTtcblx0XHRcdHRoaXMub24oJ29mZnNldCcsIHNldFBvc2l0aW9uKTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLm9uKCdvZmZzZXQnLCBzZXRQb3NpdGlvbik7XG5cdFx0fSkoKCkgPT4ge1xuXHRcdFx0dGhpcy5wb3NpdGlvbiA9IFUuUG9zaXRpb24uc3VidHJhY3QodGhpcy5vZmZzZXQsIHRoaXMuY2lyY3VpdGJvYXJkLm9mZnNldCk7XG5cdFx0fSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdwb3NpdGlvbicpO1xuXG5cdFx0KChzZXRQb3NpdGlvbikgPT4ge1xuXHRcdFx0c2V0UG9zaXRpb24oKTtcblx0XHRcdHRoaXMub24oJ29mZnNldCcsIHNldFBvc2l0aW9uKTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLm9uKCdvZmZzZXQnLCBzZXRQb3NpdGlvbik7XG5cdFx0fSkoKCkgPT4ge1xuXHRcdFx0dGhpcy5wb3NpdGlvbiA9IFUuUG9zaXRpb24uc3VidHJhY3QodGhpcy5vZmZzZXQsIHRoaXMuY2lyY3VpdGJvYXJkLm9mZnNldCk7XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHQvKiB0aGUgJ3NpemUnIG9ic2VydmFibGUgKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdzaXplJyk7XG5cblx0XHQoKGNhY2hlKSA9PiB7XG5cdFx0XHR0aGlzLnNpemUgPSBjYWNoZSgpO1xuXHRcdFx0c2V0SW50ZXJ2YWwoY2FjaGUsIDEwMCk7IC8vIFRPRE86IGZpbmQgdGhlIHByb3BlciB3YXkgdG8ga2VlcCB0aGlzIHVwZGF0ZWRcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMuc2l6ZSA9IG5ld1NpemUgfSk7XG5cdFx0XHQoIHRoaXMub3B0aW9ucy5yZXNpemVFdmVudCB8fCBVLmJpbmQoJCh3aW5kb3cpLCAncmVzaXplJykgKShjYWNoZSk7XG5cdFx0fSkoVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+IG5ldyBVLlNpemUodGhpcy5lbGVtZW50LmhlaWdodCgpLCB0aGlzLmVsZW1lbnQud2lkdGgoKSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZW1hcC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScpO1xuXG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy5zaXplID0gY2FjaGUoKTtcblx0XHRcdHNldEludGVydmFsKGNhY2hlLCAxMDApOyAvLyBUT0RPOiBmaW5kIHRoZSBwcm9wZXIgd2F5IHRvIGtlZXAgdGhpcyB1cGRhdGVkXG5cdFx0XHRjYWNoZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnNpemUgPSBuZXdTaXplIH0pO1xuXHRcdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnLCBjYWNoZSk7XG5cdFx0fSkoVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+IG5ldyBVLlNpemUodGhpcy5lbGVtZW50LmhlaWdodCgpLCB0aGlzLmVsZW1lbnQud2lkdGgoKSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScpO1xuXG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy5zaXplID0gY2FjaGUoKTtcblx0XHRcdHNldEludGVydmFsKGNhY2hlLCAxMDApOyAvLyBUT0RPOiBmaW5kIHRoZSBwcm9wZXIgd2F5IHRvIGtlZXAgdGhpcyB1cGRhdGVkXG5cdFx0XHRjYWNoZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnNpemUgPSBuZXdTaXplIH0pO1xuXHRcdFx0dGhpcy5vbignd2VpZ2h0JywgY2FjaGUpO1xuXHRcdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnLCBjYWNoZSk7XG5cdFx0XHR0aGlzLnBhcmVudC5vbigncmVvcmdhbml6ZScsIGNhY2hlKTtcblx0XHRcdHRoaXMub24oJ3Jlc2V0LXBvc2l0aW9uaW5nJywgY2FjaGUpO1xuXHRcdH0pKFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiBuZXcgVS5TaXplKHRoaXMuZWxlbWVudC5oZWlnaHQoKSwgdGhpcy5lbGVtZW50LndpZHRoKCkpLFxuXHRcdFx0aXNFcXVhbDogVS5TaXplLmVxdWFsc1xuXHRcdH0pKTtcblxuXHR9KTtcblxuXG5cdC8qICBpZiB0aGUgc2l6ZSBvZiBhbnkgdGlsZSBjaGFuZ2VzLCB0cmlnZ2VyIHRoZSAncmVvcmdhbml6ZScgICAgICovXG5cdC8qICBldmVudCBvbiB0aGUgcGFyZW50IHRpbGVtYXAsIHNvIHRoYXQgc2libGluZyB0aWxlcyBjYW4gcmVhY3QgICovXG5cdHBsdWdpbi5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3RXZlbnQoJ3Jlb3JnYW5pemUnKTtcblxuXHR9KS5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMucGFyZW50LnRyaWdnZXIoJ3Jlb3JnYW5pemUnKSB9KTtcblxuXHR9KTtcblxufSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC1wb3NpdGlvbi10cmFja2luZy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnYmFjb24nXSwgKFAsIEJhY29uKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0KChmKSA9PiB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApKTtcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0YW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdFx0dmFyIGl0ZXJhdGlvbkZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0c2luaygpO1xuXHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKGl0ZXJhdGlvbkZuKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvKiBzdGFydCBpdCBub3cgKi9cblx0XHRcdFx0aXRlcmF0aW9uRm4oKTtcblxuXHRcdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHRcdHNpbmsobmV3IEJhY29uLkVuZCgpKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC1wb3NpdGlvbi10cmFja2luZy5qcyJ9