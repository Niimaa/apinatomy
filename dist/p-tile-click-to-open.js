(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "kefir", "tweenjs", "kefir-jquery", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("bluebird")) : factory(root["jQuery"], root["Kefir"], root["TWEEN"], root["KefirJQuery"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, $__1) {
	  'use strict';
	  var button = $__1.button;
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-click-to-open',
	    requires: ['tile-open']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this.on('click').which(button.LEFT).skipPropagation('tile-left-click').onValue((function() {
	      $__0.open = !$__0.open;
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

	!(module.exports = {
	  button: {
	    LEFT: 1,
	    MIDDLE: 2,
	    RIGHT: 3
	  },
	  key: {
	    BACKSPACE: 8,
	    TAB: 9,
	    ENTER: 13,
	    SHIFT: 16,
	    CTRL: 17,
	    ALT: 18,
	    PAUSE: 19,
	    CAPS_LOCK: 20,
	    ESCAPE: 27,
	    SPACE: 32,
	    PAGE_UP: 33,
	    PAGE_DOWN: 34,
	    END: 35,
	    HOME: 36,
	    LEFT_ARROW: 37,
	    UP_ARROW: 38,
	    RIGHT_ARROW: 39,
	    DOWN_ARROW: 40,
	    INSERT: 45,
	    DELETE: 46,
	    0: 48,
	    1: 49,
	    2: 50,
	    3: 51,
	    4: 52,
	    5: 53,
	    6: 54,
	    7: 55,
	    8: 56,
	    9: 57,
	    A: 65,
	    B: 66,
	    C: 67,
	    D: 68,
	    E: 69,
	    F: 70,
	    G: 71,
	    H: 72,
	    I: 73,
	    J: 74,
	    K: 75,
	    L: 76,
	    M: 77,
	    N: 78,
	    O: 79,
	    P: 80,
	    Q: 81,
	    R: 82,
	    S: 83,
	    T: 84,
	    U: 85,
	    V: 86,
	    W: 87,
	    X: 88,
	    Y: 89,
	    Z: 90,
	    LEFT_META: 91,
	    RIGHT_META: 92,
	    SELECT: 93,
	    NUMPAD_0: 96,
	    NUMPAD_1: 97,
	    NUMPAD_2: 98,
	    NUMPAD_3: 99,
	    NUMPAD_4: 100,
	    NUMPAD_5: 101,
	    NUMPAD_6: 102,
	    NUMPAD_7: 103,
	    NUMPAD_8: 104,
	    NUMPAD_9: 105,
	    MULTIPLY: 106,
	    ADD: 107,
	    SUBTRACT: 109,
	    DECIMAL: 110,
	    DIVIDE: 111,
	    F1: 112,
	    F2: 113,
	    F3: 114,
	    F4: 115,
	    F5: 116,
	    F6: 117,
	    F7: 118,
	    F8: 119,
	    F9: 120,
	    F10: 121,
	    F11: 122,
	    F12: 123,
	    NUM_LOCK: 144,
	    SCROLL_LOCK: 145,
	    SEMICOLON: 186,
	    EQUALS: 187,
	    COMMA: 188,
	    DASH: 189,
	    PERIOD: 190,
	    FORWARD_SLASH: 191,
	    GRAVE_ACCENT: 192,
	    OPEN_BRACKET: 219,
	    BACK_SLASH: 220,
	    CLOSE_BRACKET: 221,
	    SINGLE_QUOTE: 222
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN, KefirJQuery) {
	  KefirJQuery.init(Kefir, $);
	  Kefir.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Kefir.fromBinder((function(emitter) {
	      obj.on(eventName, emitter.emit);
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Kefir.animationFrames = function animationFrames() {
	    return Kefir.fromBinder((function(emitter) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          emitter.emit();
	          if (subscribed) {
	            iterationFn();
	          }
	        }));
	      })();
	      return (function() {
	        subscribed = false;
	      });
	    }));
	  };
	  Kefir.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = Kefir.bus();
	    var addStream = ((function() {
	      var chainedStreams = 0;
	      return (function(stream) {
	        chainedStreams += 1;
	        bus.plug(stream);
	        stream.onEnd((function() {
	          chainedStreams -= 1;
	          if (chainedStreams === 0) {
	            bus.end();
	          }
	        }));
	      });
	    }))();
	    addStream(Kefir.fromBinder((function(emitter) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        emitter.emit(this);
	      });
	      tw.onComplete(emitter.end);
	    })));
	    bus.tween = tw;
	    bus.start = (function() {
	      tw.start();
	      return bus;
	    });
	    bus.chain = (function(other) {
	      addStream(other);
	      tw.chain(other.tween);
	      return bus;
	    });
	    return bus;
	  };
	  Kefir.keyPress = function keyPress(keyCode) {
	    return $(window).asKefirStream('keypress').filter((function(e) {
	      return e.keyCode === keyCode;
	    }));
	  };
	  Kefir.once = function once(value) {
	    return Kefir.fromBinder((function(emitter) {
	      emitter.emit(value);
	      emitter.end();
	    }));
	  };
	  Kefir.fromArray = function fromArray(array) {
	    return Kefir.fromBinder((function(emitter) {
	      array.forEach(emitter.emit);
	      emitter.end();
	    }));
	  };
	  Kefir.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = Kefir.bus();
	    var open = Kefir.bus();
	    var close = Kefir.bus();
	    pacing.filterBy(wantedBus.toProperty(false)).onValue((function() {
	      handler((function() {
	        open.emit();
	        wantedBus.emit(false);
	        close.emit();
	      }));
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.mapTo(true));
	      return Kefir.constant(true).take(1).concat(close).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntilBy(open).reduce(accumulator, []).flatMap(Kefir.fromArray);
	      }));
	    };
	  };
	  Kefir.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Kefir.Stream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Kefir.fromBinder((function(emitter) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(value);
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          oldBuffer.forEach(emitter.emit);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Kefir.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Kefir.Observable.prototype.run = function() {
	    var $__0 = this;
	    var doNothing = (function() {});
	    this.onValue(doNothing);
	    return (function() {
	      $__0.offValue(doNothing);
	    });
	  };
	  Kefir.Stream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Kefir.Stream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asKefirStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        stream = stream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return stream.takeUntilBy($(document).asKefirStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asKefirStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        untilStream = untilStream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return $(document).asKefirStream('mouseup').take(1).takeUntilBy(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asKefirStream('mousewheel DOMMouseScroll');
	  };
	  return Kefir;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  var U = {
	    newClass: function(constructor) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      constructor.prototype = prototype;
	      constructor.prototype.constructor = constructor;
	      return constructor;
	    },
	    newSubclass: function(superClass, constructorMaker) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var constructor = constructorMaker(superClass.prototype.constructor);
	      constructor.prototype = Object.create(superClass.prototype);
	      U.extend(constructor.prototype, prototype);
	      constructor.prototype.constructor = constructor;
	      return constructor;
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
	    id: function(v) {
	      return v;
	    },
	    getDef: function(obj, name, value) {
	      if (U.isUndefined(obj[name])) {
	        if (typeof value === 'function') {
	          value = value();
	        }
	        obj[name] = value;
	      }
	      return obj[name];
	    },
	    object: function(obj, name) {
	      return U.getDef(obj, name, {});
	    },
	    array: function(obj, name) {
	      return U.getDef(obj, name, []);
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
	    findIndex: function(array, pred) {
	      for (var i = 0; i < array.length; ++i) {
	        if (pred(array[i], i, array)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    memoize: function(fn) {
	      var keys = [];
	      var cache = [];
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var index = U.findIndex(keys, (function(key) {
	          return key.every((function(v, i) {
	            return v === args[i];
	          }));
	        }));
	        if (index >= 0) {
	          return cache[index];
	        }
	        var result = fn.apply(this, args);
	        keys.push(args);
	        cache.push(result);
	        return result;
	      };
	    }
	  };
	  var EPS = 0.000001;
	  var sortOfEqual = (function(a, b) {
	    return (b - EPS < a && a < b + EPS);
	  });
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.top, b.top) && sortOfEqual(a.left, b.left);
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.height, b.height) && sortOfEqual(a.width, b.width);
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwMzAxZjQxNDY4ZTcyYTMwNTA2NyIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWNsaWNrLXRvLW9wZW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL2NvZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpckpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJrZWZpci1qcXVlcnlcIixcImNvbW1vbmpzXCI6XCJrZWZpci1qcXVlcnlcIixcImFtZFwiOlwia2VmaXItanF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQ2JELGdEOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDM0dEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0Esa0VBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNB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O0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQix5QkFBeUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxFQUFDOzs7Ozs7O0FDOVBELGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXItanF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwia2VmaXJcIiwgXCJ0d2VlbmpzXCIsIFwia2VmaXItanF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJLZWZpckpRdWVyeVwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDMwMWY0MTQ2OGU3MmEzMDUwNjdcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL2NvZGVzLmpzJywgJy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbigkLCAkX18xKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGJ1dHRvbiA9ICRfXzEuYnV0dG9uO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcbiAgICBuYW1lOiAndGlsZS1jbGljay10by1vcGVuJyxcbiAgICByZXF1aXJlczogWyd0aWxlLW9wZW4nXVxuICB9KS5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJyk7XG4gIHBsdWdpbi5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB0aGlzLm9uKCdjbGljaycpLndoaWNoKGJ1dHRvbi5MRUZUKS5za2lwUHJvcGFnYXRpb24oJ3RpbGUtbGVmdC1jbGljaycpLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5vcGVuID0gISRfXzAub3BlbjtcbiAgICB9KSk7XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGlsZS1jbGljay10by1vcGVuLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKHtcbiAgYnV0dG9uOiB7XG4gICAgTEVGVDogMSxcbiAgICBNSURETEU6IDIsXG4gICAgUklHSFQ6IDNcbiAgfSxcbiAga2V5OiB7XG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIFRBQjogOSxcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENUUkw6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgUEFVU0U6IDE5LFxuICAgIENBUFNfTE9DSzogMjAsXG4gICAgRVNDQVBFOiAyNyxcbiAgICBTUEFDRTogMzIsXG4gICAgUEFHRV9VUDogMzMsXG4gICAgUEFHRV9ET1dOOiAzNCxcbiAgICBFTkQ6IDM1LFxuICAgIEhPTUU6IDM2LFxuICAgIExFRlRfQVJST1c6IDM3LFxuICAgIFVQX0FSUk9XOiAzOCxcbiAgICBSSUdIVF9BUlJPVzogMzksXG4gICAgRE9XTl9BUlJPVzogNDAsXG4gICAgSU5TRVJUOiA0NSxcbiAgICBERUxFVEU6IDQ2LFxuICAgIDA6IDQ4LFxuICAgIDE6IDQ5LFxuICAgIDI6IDUwLFxuICAgIDM6IDUxLFxuICAgIDQ6IDUyLFxuICAgIDU6IDUzLFxuICAgIDY6IDU0LFxuICAgIDc6IDU1LFxuICAgIDg6IDU2LFxuICAgIDk6IDU3LFxuICAgIEE6IDY1LFxuICAgIEI6IDY2LFxuICAgIEM6IDY3LFxuICAgIEQ6IDY4LFxuICAgIEU6IDY5LFxuICAgIEY6IDcwLFxuICAgIEc6IDcxLFxuICAgIEg6IDcyLFxuICAgIEk6IDczLFxuICAgIEo6IDc0LFxuICAgIEs6IDc1LFxuICAgIEw6IDc2LFxuICAgIE06IDc3LFxuICAgIE46IDc4LFxuICAgIE86IDc5LFxuICAgIFA6IDgwLFxuICAgIFE6IDgxLFxuICAgIFI6IDgyLFxuICAgIFM6IDgzLFxuICAgIFQ6IDg0LFxuICAgIFU6IDg1LFxuICAgIFY6IDg2LFxuICAgIFc6IDg3LFxuICAgIFg6IDg4LFxuICAgIFk6IDg5LFxuICAgIFo6IDkwLFxuICAgIExFRlRfTUVUQTogOTEsXG4gICAgUklHSFRfTUVUQTogOTIsXG4gICAgU0VMRUNUOiA5MyxcbiAgICBOVU1QQURfMDogOTYsXG4gICAgTlVNUEFEXzE6IDk3LFxuICAgIE5VTVBBRF8yOiA5OCxcbiAgICBOVU1QQURfMzogOTksXG4gICAgTlVNUEFEXzQ6IDEwMCxcbiAgICBOVU1QQURfNTogMTAxLFxuICAgIE5VTVBBRF82OiAxMDIsXG4gICAgTlVNUEFEXzc6IDEwMyxcbiAgICBOVU1QQURfODogMTA0LFxuICAgIE5VTVBBRF85OiAxMDUsXG4gICAgTVVMVElQTFk6IDEwNixcbiAgICBBREQ6IDEwNyxcbiAgICBTVUJUUkFDVDogMTA5LFxuICAgIERFQ0lNQUw6IDExMCxcbiAgICBESVZJREU6IDExMSxcbiAgICBGMTogMTEyLFxuICAgIEYyOiAxMTMsXG4gICAgRjM6IDExNCxcbiAgICBGNDogMTE1LFxuICAgIEY1OiAxMTYsXG4gICAgRjY6IDExNyxcbiAgICBGNzogMTE4LFxuICAgIEY4OiAxMTksXG4gICAgRjk6IDEyMCxcbiAgICBGMTA6IDEyMSxcbiAgICBGMTE6IDEyMixcbiAgICBGMTI6IDEyMyxcbiAgICBOVU1fTE9DSzogMTQ0LFxuICAgIFNDUk9MTF9MT0NLOiAxNDUsXG4gICAgU0VNSUNPTE9OOiAxODYsXG4gICAgRVFVQUxTOiAxODcsXG4gICAgQ09NTUE6IDE4OCxcbiAgICBEQVNIOiAxODksXG4gICAgUEVSSU9EOiAxOTAsXG4gICAgRk9SV0FSRF9TTEFTSDogMTkxLFxuICAgIEdSQVZFX0FDQ0VOVDogMTkyLFxuICAgIE9QRU5fQlJBQ0tFVDogMjE5LFxuICAgIEJBQ0tfU0xBU0g6IDIyMCxcbiAgICBDTE9TRV9CUkFDS0VUOiAyMjEsXG4gICAgU0lOR0xFX1FVT1RFOiAyMjJcbiAgfVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvY29kZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2tlZmlyJywgJ3R3ZWVuanMnLCAna2VmaXItanF1ZXJ5J10sIGZ1bmN0aW9uKCQsIFUsIEtlZmlyLCBUV0VFTiwgS2VmaXJKUXVlcnkpIHtcbiAgS2VmaXJKUXVlcnkuaW5pdChLZWZpciwgJCk7XG4gIEtlZmlyLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBvYmoub24oZXZlbnROYW1lLCBlbWl0dGVyLmVtaXQpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH0pO1xuICB2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgKChmdW5jdGlvbihmKSB7XG4gICAgd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKTtcbiAgfSkpO1xuICBLZWZpci5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdCgpO1xuICAgICAgICAgIGlmIChzdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICBpdGVyYXRpb25GbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSkoKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIudHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCAkX18xKSB7XG4gICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICBkdXJhdGlvbiA9ICRfXzIuZHVyYXRpb24sXG4gICAgICAgIGRlbGF5ID0gJF9fMi5kZWxheSxcbiAgICAgICAgZWFzaW5nID0gJF9fMi5lYXNpbmc7XG4gICAgdmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcbiAgICB2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIGFkZFN0cmVhbSA9ICgoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgY2hhaW5lZFN0cmVhbXMgKz0gMTtcbiAgICAgICAgYnVzLnBsdWcoc3RyZWFtKTtcbiAgICAgICAgc3RyZWFtLm9uRW5kKChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjaGFpbmVkU3RyZWFtcyAtPSAxO1xuICAgICAgICAgIGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkge1xuICAgICAgICAgICAgYnVzLmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfSkpKCk7XG4gICAgYWRkU3RyZWFtKEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGlmIChlYXNpbmcpIHtcbiAgICAgICAgdHcuZWFzaW5nKGVhc2luZyk7XG4gICAgICB9XG4gICAgICBpZiAoZGVsYXkpIHtcbiAgICAgICAgdHcuZGVsYXkoZGVsYXkpO1xuICAgICAgfVxuICAgICAgdHcub25VcGRhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCh0aGlzKTtcbiAgICAgIH0pO1xuICAgICAgdHcub25Db21wbGV0ZShlbWl0dGVyLmVuZCk7XG4gICAgfSkpKTtcbiAgICBidXMudHdlZW4gPSB0dztcbiAgICBidXMuc3RhcnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB0dy5zdGFydCgpO1xuICAgICAgcmV0dXJuIGJ1cztcbiAgICB9KTtcbiAgICBidXMuY2hhaW4gPSAoZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIGFkZFN0cmVhbShvdGhlcik7XG4gICAgICB0dy5jaGFpbihvdGhlci50d2Vlbik7XG4gICAgICByZXR1cm4gYnVzO1xuICAgIH0pO1xuICAgIHJldHVybiBidXM7XG4gIH07XG4gIEtlZmlyLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Q29kZSkge1xuICAgIHJldHVybiAkKHdpbmRvdykuYXNLZWZpclN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBlLmtleUNvZGUgPT09IGtleUNvZGU7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5vbmNlID0gZnVuY3Rpb24gb25jZSh2YWx1ZSkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBlbWl0dGVyLmVtaXQodmFsdWUpO1xuICAgICAgZW1pdHRlci5lbmQoKTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLmZyb21BcnJheSA9IGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBhcnJheS5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG4gICAgICBlbWl0dGVyLmVuZCgpO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nKSB7XG4gICAgdmFyIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDogVS5jYWxsO1xuICAgIHZhciB3YW50ZWRCdXMgPSBLZWZpci5idXMoKTtcbiAgICB2YXIgb3BlbiA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBjbG9zZSA9IEtlZmlyLmJ1cygpO1xuICAgIHBhY2luZy5maWx0ZXJCeSh3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlcigoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9wZW4uZW1pdCgpO1xuICAgICAgICB3YW50ZWRCdXMuZW1pdChmYWxzZSk7XG4gICAgICAgIGNsb3NlLmVtaXQoKTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIGJ1ZmZlciA9IChhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge30pLmJ1ZmZlcjtcbiAgICAgIHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXBUbyh0cnVlKSk7XG4gICAgICByZXR1cm4gS2VmaXIuY29uc3RhbnQodHJ1ZSkudGFrZSgxKS5jb25jYXQoY2xvc2UpLmZsYXRNYXBMYXRlc3QoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWNjdW11bGF0b3IgPSAoZnVuY3Rpb24oYXJyLCB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeShvcGVuKS5yZWR1Y2UoYWNjdW11bGF0b3IsIFtdKS5mbGF0TWFwKEtlZmlyLmZyb21BcnJheSk7XG4gICAgICB9KSk7XG4gICAgfTtcbiAgfTtcbiAgS2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcbiAgfTtcbiAgS2VmaXIuU3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICB2YXIgYnVmZmVyID0gW107XG4gICAgICB2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSAkX18wLm9uVmFsdWUoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgIG9sZEJ1ZmZlci5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlVG9UaGlzKCk7XG4gICAgICAgIHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcbiAgICAgICAgYnVmZmVyID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgY29tcGFyYXRvcikge1xuICAgIGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUgPT09IHZhbHVlO1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgfTtcbiAgS2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHZhciBkb05vdGhpbmcgPSAoZnVuY3Rpb24oKSB7fSk7XG4gICAgdGhpcy5vblZhbHVlKGRvTm90aGluZyk7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICRfXzAub2ZmVmFsdWUoZG9Ob3RoaW5nKTtcbiAgICB9KTtcbiAgfTtcbiAgS2VmaXIuU3RyZWFtLnByb3RvdHlwZS5za2lwUHJvcGFnYXRpb24gPSBmdW5jdGlvbihsYWJlbCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuICAgIH0pKS5tYXAoKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF0gPSB0cnVlO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuU3RyZWFtLnByb3RvdHlwZS53aGljaCA9IGZ1bmN0aW9uKGJ1dHRvbklkKSB7XG4gICAgdmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoKGZ1bmN0aW9uKGIpIHtcbiAgICAgIHJldHVybiBiID09PSBidXR0b25JZDtcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gcHJlZChlLndoaWNoKTtcbiAgICB9KSk7XG4gIH07XG4gICQuZm4ubW91c2VEcmFnID0gZnVuY3Rpb24gbW91c2VEcmFnKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSAoYXJndW1lbnRzWzBdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1swXSA6IHt9KS50aHJlc2hvbGQ7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgoZnVuY3Rpb24obW91c2VEb3duRXZlbnQpIHtcbiAgICAgIHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcbiAgICAgIGlmICh0aHJlc2hvbGQpIHtcbiAgICAgICAgdmFyIGNyb3NzZWQgPSBmYWxzZTtcbiAgICAgICAgc3RyZWFtID0gc3RyZWFtLmZpbHRlcigoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICBpZiAoY3Jvc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG4gICAgICAgICAgdmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjcm9zc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KCQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKSkubWFwKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICBtb3VzZURvd25FdmVudDogbW91c2VEb3duRXZlbnQsXG4gICAgICAgICAgbW91c2VNb3ZlRXZlbnQ6IG1vdXNlTW92ZUV2ZW50XG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZUNsaWNrID0gZnVuY3Rpb24gbW91c2VDbGljaygpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gKGFyZ3VtZW50c1swXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMF0gOiB7fSkudGhyZXNob2xkO1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKGZ1bmN0aW9uKG1vdXNlRG93bkV2ZW50KSB7XG4gICAgICB2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcbiAgICAgIGlmICh0aHJlc2hvbGQpIHtcbiAgICAgICAgdmFyIGNyb3NzZWQgPSBmYWxzZTtcbiAgICAgICAgdW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgICAgaWYgKGNyb3NzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuICAgICAgICAgIHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG4gICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gY3Jvc3NlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbEJ5KHVudGlsU3RyZWFtKTtcbiAgICB9KSk7XG4gIH07XG4gICQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuICB9O1xuICByZXR1cm4gS2VmaXI7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9XG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJKUXVlcnlcIixcImNvbW1vbmpzMlwiOlwia2VmaXItanF1ZXJ5XCIsXCJjb21tb25qc1wiOlwia2VmaXItanF1ZXJ5XCIsXCJhbWRcIjpcImtlZmlyLWpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChmdW5jdGlvbihQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIFUgPSB7XG4gICAgbmV3Q2xhc3M6IGZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBuZXdTdWJjbGFzczogZnVuY3Rpb24oc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gICAgICBVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIGV4dGVuZDogZnVuY3Rpb24ob2JqMSkge1xuICAgICAgZm9yICh2YXIgcmVzdCA9IFtdLFxuICAgICAgICAgICRfXzEgPSAxOyAkX18xIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMSsrKVxuICAgICAgICByZXN0WyRfXzEgLSAxXSA9IGFyZ3VtZW50c1skX18xXTtcbiAgICAgIHJlc3QuZm9yRWFjaCgoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBvYmoxO1xuICAgIH0sXG4gICAgZmllbGQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbGw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgJF9fMiA9IDE7ICRfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18yKyspXG4gICAgICAgIGFyZ3NbJF9fMiAtIDFdID0gYXJndW1lbnRzWyRfXzJdO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSxcbiAgICBpZDogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSxcbiAgICBnZXREZWY6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBvYmplY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pO1xuICAgIH0sXG4gICAgYXJyYXk6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pO1xuICAgIH0sXG4gICAgcHVsbDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcbiAgICAgIHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFrZUVtcHR5OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgIHdoaWxlIChhcnIubGVuZ3RoID4gMCkge1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBiaW5kQTogZnVuY3Rpb24oZm4sIGN0eCwgYXJncykge1xuICAgICAgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSk7XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbihvYmosIG0pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18zID0gMjsgJF9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzMrKylcbiAgICAgICAgYXJnc1skX18zIC0gMl0gPSBhcmd1bWVudHNbJF9fM107XG4gICAgICByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncyk7XG4gICAgfSxcbiAgICBhcHBseUNvbnN0cnVjdG9yOiBmdW5jdGlvbihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG4gICAgICB2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuICAgIH0sXG4gICAgYXNzZXJ0OiBmdW5jdGlvbihjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzRGVmaW5lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfSxcbiAgICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9LFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG4gICAgfSxcbiAgICBvYmpWYWx1ZXM6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgbWFrZVBvc2l0aW9uZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWZPcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciB2YWx1ZXMgPSBbXSxcbiAgICAgICAgICAkX180ID0gMDsgJF9fNCA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzQrKylcbiAgICAgICAgdmFsdWVzWyRfXzRdID0gYXJndW1lbnRzWyRfXzRdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgY29udGV4dCkge1xuICAgICAgdmFyIHRpbWVvdXQ7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgdmFyIGxhdGVyRm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8ICRfXzAsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBvbmNlUGVyU3RhY2s6IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICAgIHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICBpZiAobm90UnVuWWV0KSB7XG4gICAgICAgICAgbm90UnVuWWV0ID0gZmFsc2U7XG4gICAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgICAgIH0pLCAwKTtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIGNhY2hlZDogZnVuY3Rpb24oJF9fNikge1xuICAgICAgdmFyICRfXzcgPSAkX182LFxuICAgICAgICAgIHJldHJpZXZlID0gJF9fNy5yZXRyaWV2ZSxcbiAgICAgICAgICBpc0VxdWFsID0gJF9fNy5pc0VxdWFsO1xuICAgICAgaXNFcXVhbCA9IGlzRXF1YWwgfHwgKChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSA9PT0gYik7XG4gICAgICB9KSk7XG4gICAgICB2YXIgY2FjaGU7XG4gICAgICBmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBjYWNoZTtcbiAgICAgICAgaWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgICAgICBjYWNoZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIG9uQ2hhbmdlLmZvckVhY2goKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuICAgICAgdmFyIHJlc3VsdEZuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgICB9KTtcbiAgICAgIHZhciBvbkNoYW5nZSA9IFtdO1xuICAgICAgcmVzdWx0Rm4ub25DaGFuZ2UgPSAoZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgb25DaGFuZ2UucHVzaChjYik7XG4gICAgICAgIHJldHVybiByZXN1bHRGbjtcbiAgICAgIH0pO1xuICAgICAgcmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuICAgICAgfSk7XG4gICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgIH0sXG4gICAgcHJvbWlzaWZ5OiBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICByZXR1cm4gbmV3IFAoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBmaW5kSW5kZXg6IGZ1bmN0aW9uKGFycmF5LCBwcmVkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgbWVtb2l6ZTogZnVuY3Rpb24oZm4pIHtcbiAgICAgIHZhciBrZXlzID0gW107XG4gICAgICB2YXIgY2FjaGUgPSBbXTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBrZXkuZXZlcnkoKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB2ID09PSBhcmdzW2ldO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHJldHVybiBjYWNoZVtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBrZXlzLnB1c2goYXJncyk7XG4gICAgICAgIGNhY2hlLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICB2YXIgRVBTID0gMC4wMDAwMDE7XG4gIHZhciBzb3J0T2ZFcXVhbCA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG4gIH0pO1xuICBVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbih0b3AsIGxlZnQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9KTtcbiAgVS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG4gIH0pO1xuICBVLlBvc2l0aW9uLmVxdWFscyA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuICB9KTtcbiAgVS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbihoZWlnaHQsIHdpZHRoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICB9KTtcbiAgVS5TaXplLmVxdWFscyA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG4gIH0pO1xuICByZXR1cm4gVTtcbn0pKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1jbGljay10by1vcGVuLmpzIn0=