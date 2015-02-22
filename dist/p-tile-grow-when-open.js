(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("velocity"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "velocity", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("velocity"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["P"], root["velocity"], root["Kefir"], root["TWEEN"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-grow-when-open',
	    requires: ['tile-open']
	  }).modify('Tile.prototype');
	  plugin.add('weightWhenOpen', function() {
	    return this.circuitboard.options.weightWhenOpen || 2;
	  }).add('weightWhenClosed', (function() {
	    return 1;
	  }));
	  plugin.add('growWhenOpen', function(open) {
	    var $__0 = this;
	    var flexGrowFrom = parseFloat(this.element.data('amyFlexGrowTarget') || 1);
	    var flexGrowTo = open ? this.weightWhenOpen() : this.weightWhenClosed();
	    this.element.data('amyFlexGrowTarget', flexGrowTo);
	    var rowFlexGrowTo = 0;
	    this.element.parent().children().each(function() {
	      rowFlexGrowTo += parseFloat($(this).data('amyFlexGrowTarget') || 1);
	    });
	    var rowFlexGrowFrom = rowFlexGrowTo - flexGrowTo + flexGrowFrom;
	    return P.all([new P((function(resolve) {
	      $__0.element.velocity({flexGrow: [flexGrowTo, flexGrowFrom]}, {
	        complete: resolve,
	        duration: 300
	      });
	    })), new P((function(resolve) {
	      $__0.element.parent().velocity({flexGrow: [rowFlexGrowTo, rowFlexGrowFrom]}, {
	        complete: resolve,
	        duration: 300
	      });
	    }))]);
	  });
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this.p('open').changes().onValue((function(open) {
	      $__0.growWhenOpen(open).then((function() {
	        if (open) {
	          finishedOpeningBus.emit();
	        } else {
	          finishedClosingBus.emit();
	        }
	      }));
	    }));
	    var finishedOpeningBus = Kefir.bus();
	    var finishedClosingBus = Kefir.bus();
	    this.newProperty('fullyOpen', {
	      settable: false,
	      initial: this.open
	    }).plug(this.p('open').value(false)).plug(finishedOpeningBus.mapTo(true));
	    this.newProperty('fullyClosed', {
	      settable: false,
	      initial: !this.open
	    }).plug(this.p('open').not().value(false)).plug(finishedClosingBus.mapTo(true));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(8), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
	  __webpack_require__(7).init(Kefir, $);
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
	
	//# sourceMappingURL=<compileOutput>


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

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwYTZmZDI3MzNmZDc2YjdiYWMzMiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWdyb3ctd2hlbi1vcGVuLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcInZlbG9jaXR5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia2VmaXItanF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtB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LElBQUksU0FBQyxFQUFHLEdBQU07QUFDN0IsVUFBTyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxFQUFDLEdBQUssWUFBVyxDQUFDLEtBQUksQ0FBRyxNQUFJLENBQUMsR0FBSyxZQUFXLENBQUMsTUFBSyxDQUFHLE9BQUssQ0FBQyxDQUFDO0dBQ3BHLEVBQUM7QUFJRCxRQUFLLEVBQUksV0FBVSxDQUFDLFNBQVUsTUFBSyxDQUFHLE1BQUksQ0FBRztBQUM1QyxRQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsUUFBRyxNQUFNLEVBQUksTUFBSSxDQUFDO0dBQ25CLENBQUMsQ0FBQztBQUNGLFFBQUssT0FBTyxJQUFJLFNBQUMsRUFBRyxHQUFNO0FBQ3pCLFVBQU8sWUFBVyxDQUFDLEVBQUMsR0FBSyxZQUFXLENBQUMsRUFBQyxHQUFLLFlBQVcsQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDLEdBQUssWUFBVyxDQUFDLE9BQU0sQ0FBRyxRQUFNLENBQUMsQ0FBQztHQUM1RyxFQUFDO0FBR0QsUUFBTyxHQUFDO0FBRVQsaUpBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwidmVsb2NpdHlcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJ2ZWxvY2l0eVwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJ2ZWxvY2l0eVwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdLCByb290W1widmVsb2NpdHlcIl0sIHJvb3RbXCJLZWZpclwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wia2VmaXItanF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwYTZmZDI3MzNmZDc2YjdiYWMzMlxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJyxcblx0J3ZlbG9jaXR5J1xuXSwgZnVuY3Rpb24gKCQsIFAsIEtlZmlyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aWxlLWdyb3ctd2hlbi1vcGVuJyxcblx0XHRyZXF1aXJlczogWyd0aWxlLW9wZW4nXVxuXHR9KS5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJyk7XG5cblxuXHQvKiBkZWZhdWx0IGZsZXgtZ3JvdyB2YWx1ZXMgZm9yIG9wZW4gLyBjbG9zZWQgdGlsZXMgKi9cblx0cGx1Z2luXG5cdFx0LmFkZCgnd2VpZ2h0V2hlbk9wZW4nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmNpcmN1aXRib2FyZC5vcHRpb25zLndlaWdodFdoZW5PcGVuIHx8IDIgfSlcblx0XHQuYWRkKCd3ZWlnaHRXaGVuQ2xvc2VkJywgKCkgPT4gMSk7XG5cblxuXHRwbHVnaW4uYWRkKCdncm93V2hlbk9wZW4nLCBmdW5jdGlvbiAob3Blbikge1xuXHRcdHZhciBmbGV4R3Jvd0Zyb20gPSBwYXJzZUZsb2F0KHRoaXMuZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpIHx8IDEpO1xuXHRcdHZhciBmbGV4R3Jvd1RvID0gb3BlbiA/IHRoaXMud2VpZ2h0V2hlbk9wZW4oKSA6IHRoaXMud2VpZ2h0V2hlbkNsb3NlZCgpO1xuXHRcdHRoaXMuZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcsIGZsZXhHcm93VG8pO1xuXHRcdHZhciByb3dGbGV4R3Jvd1RvID0gMDtcblx0XHR0aGlzLmVsZW1lbnQucGFyZW50KCkuY2hpbGRyZW4oKVxuXHRcdFx0LmVhY2goZnVuY3Rpb24gKCkgeyByb3dGbGV4R3Jvd1RvICs9IHBhcnNlRmxvYXQoJCh0aGlzKS5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpIHx8IDEpIH0pO1xuXHRcdHZhciByb3dGbGV4R3Jvd0Zyb20gPSByb3dGbGV4R3Jvd1RvIC0gZmxleEdyb3dUbyArIGZsZXhHcm93RnJvbTtcblx0XHRyZXR1cm4gUC5hbGwoW1xuXHRcdFx0bmV3IFAoKHJlc29sdmUpID0+IHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnZlbG9jaXR5KFxuXHRcdFx0XHRcdHsgZmxleEdyb3c6IFtmbGV4R3Jvd1RvLCBmbGV4R3Jvd0Zyb21dIH0sXG5cdFx0XHRcdFx0eyBjb21wbGV0ZTogcmVzb2x2ZSwgZHVyYXRpb246IDMwMCB9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KSwgbmV3IFAoKHJlc29sdmUpID0+IHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudCgpLnZlbG9jaXR5KFxuXHRcdFx0XHRcdHsgZmxleEdyb3c6IFtyb3dGbGV4R3Jvd1RvLCByb3dGbGV4R3Jvd0Zyb21dIH0sXG5cdFx0XHRcdFx0eyBjb21wbGV0ZTogcmVzb2x2ZSwgZHVyYXRpb246IDMwMCB9XG5cdFx0XHRcdCk7XG5cdFx0XHR9KVxuXHRcdF0pO1xuXHR9KTtcblxuXG5cdHBsdWdpbi5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qIG1ha2UgdGhlIHRpbGUgZ3Jvdy9zaHJpbmsgYmFzZWQgb24gb3Blbi1uZXNzICovXG5cdFx0dGhpcy5wKCdvcGVuJykuY2hhbmdlcygpLm9uVmFsdWUoKG9wZW4pID0+IHtcblx0XHRcdHRoaXMuZ3Jvd1doZW5PcGVuKG9wZW4pLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRpZiAob3Blbikge1xuXHRcdFx0XHRcdGZpbmlzaGVkT3BlbmluZ0J1cy5lbWl0KCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZmluaXNoZWRDbG9zaW5nQnVzLmVtaXQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR2YXIgZmluaXNoZWRPcGVuaW5nQnVzID0gS2VmaXIuYnVzKCk7XG5cdFx0dmFyIGZpbmlzaGVkQ2xvc2luZ0J1cyA9IEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogY3JlYXRlIGEgcHJvcGVydHkgdGhhdCB0ZWxscyBpZiBhIHRpbGUgaXMgJ2Z1bGx5IG9wZW4nLCBpLmUuLCBhbHNvIHRoZSBhbmltYXRpb24gaXMgZG9uZSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ2Z1bGx5T3BlbicsIHsgc2V0dGFibGU6IGZhbHNlLCBpbml0aWFsOiB0aGlzLm9wZW4gfSlcblx0XHRcdC5wbHVnKHRoaXMucCgnb3BlbicpLnZhbHVlKGZhbHNlKSlcblx0XHRcdC5wbHVnKGZpbmlzaGVkT3BlbmluZ0J1cy5tYXBUbyh0cnVlKSk7XG5cblx0XHQvKiBjcmVhdGUgYSBwcm9wZXJ0eSB0aGF0IHRlbGxzIGlmIGEgdGlsZSBpcyAnZnVsbHkgb3BlbicsIGkuZS4sIGFsc28gdGhlIGFuaW1hdGlvbiBpcyBkb25lICovXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnZnVsbHlDbG9zZWQnLCB7IHNldHRhYmxlOiBmYWxzZSwgaW5pdGlhbDogIXRoaXMub3BlbiB9KVxuXHRcdFx0LnBsdWcodGhpcy5wKCdvcGVuJykubm90KCkudmFsdWUoZmFsc2UpKVxuXHRcdFx0LnBsdWcoZmluaXNoZWRDbG9zaW5nQnVzLm1hcFRvKHRydWUpKTtcblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGlsZS1ncm93LXdoZW4tb3Blbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ2ZWxvY2l0eVwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2tlZmlyJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEtlZmlyLCBUV0VFTikge1xuXG5cdC8qIEtlZmlyIGpRdWVyeSBwbHVnaW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0XHRyZXF1aXJlKCdrZWZpci1qcXVlcnknKS5pbml0KEtlZmlyLCAkKTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEtlZmlyLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCBlbWl0dGVyLmVtaXQpO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuXHRcdFx0KChmKSA9PiB7IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfSk7XG5cdEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKCkgPT4ge1xuXHRcdFx0XHRcdGVtaXR0ZXIuZW1pdCgpO1xuXHRcdFx0XHRcdGlmIChzdWJzY3JpYmVkKSB7IGl0ZXJhdGlvbkZuKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4geyBzdWJzY3JpYmVkID0gZmFsc2UgfTtcblxuXHRcdH0pO1xuXHR9O1xuXG5cblx0S2VmaXIudHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBLZWZpci5idXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IGVtaXR0ZXIuZW1pdCh0aGlzKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0S2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXlDb2RlKTtcblx0fTtcblxuXG5cdEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG5cdFx0XHRlbWl0dGVyLmVuZCgpO1xuXHRcdH0pO1xuXHRcdC8vcmV0dXJuIEtlZmlyLmNvbnN0YW50KHZhbHVlKTsgLy8gVE9ETzogcmVwbGFjZSBhbGwgJ29uY2UnIGNhbGxzIHdpdGggJ2NvbnN0YW50JyBjYWxsczsgdGhlbiByZW1vdmUgJ29uY2UnXG5cdH07XG5cblxuXHRLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0YXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0S2VmaXIubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuXHRcdHZhciBvcGVuID0gICAgICBLZWZpci5idXMoKTtcblx0XHR2YXIgY2xvc2UgPSAgICAgS2VmaXIuYnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdGhhbmRsZXIoKCkgPT4ge1xuXHRcdFx0XHRvcGVuLmVtaXQoKTtcblx0XHRcdFx0d2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuXHRcdFx0XHRjbG9zZS5lbWl0KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaCh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdG9sZEJ1ZmZlci5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRvTm90aGluZyA9ICgpPT57fTtcblx0XHR0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcblx0XHRyZXR1cm4gKCkgPT4geyB0aGlzLm9mZlZhbHVlKGRvTm90aGluZykgfTtcblx0fTtcblxuXHQvLyBUaGlzIGlzIGEgJ3NtYXJ0JyAuc3RvcFByb3BhZ2F0aW9uLCBtYXJraW5nIGV2ZW50cyB3aXRoIGEgbGFiZWxcblx0Ly8gYW5kIHNraXBwaW5nIHRob3NlIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgbGFiZWwuXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGxhYmVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChldmVudCkgPT4ge1xuXHRcdFx0cmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG5cdFx0fSkubWFwKChldmVudCkgPT4ge1xuXHRcdFx0VS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBGaWx0ZXIgZXZlbnRzIHRvIG9ubHkgY2VydGFpbiBrZXlzIC8gYnV0dG9ucy4gQ2FuIGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uIG9yIHNpbmdsZSBudW1iZXIuXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbiAoYnV0dG9uSWQpIHtcblx0XHR2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6IChiID0+IGIgPT09IGJ1dHRvbklkKTtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGUpID0+IHByZWQoZS53aGljaCkpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbVxuXHRcdFx0XHRcdC50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpXG5cdFx0XHRcdFx0Lm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5mbi5tb3VzZUNsaWNrID0gZnVuY3Rpb24gbW91c2VDbGljayh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHR1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHtcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gS2VmaXI7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImtlZmlyLWpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLWdyb3ctd2hlbi1vcGVuLmpzIn0=