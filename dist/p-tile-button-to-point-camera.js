(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-button-to-point-camera',
	    requires: ['tile-buttons', 'three-d']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('cameraTargetTile', {initial: null});
	    var newTarget = this.p('cameraTargetTile').changes();
	    var newTileTarget = newTarget.filter((function(t) {
	      return t !== null;
	    }));
	    this.p('cameraTargetTile').plug(newTileTarget.flatMapLatest((function(tile) {
	      return tile.p('hidden').value(true).merge($__0.on('destroy')).takeUntilBy($__0.p('cameraTargetTile').value(null));
	    })).mapTo(null));
	    newTarget.flatMapLatest((function(tile) {
	      if (!tile) {
	        return Kefir.never();
	      }
	      return Kefir.merge([Kefir.once(), tile.p('size').changes(), tile.p('position').changes()]).mapTo(tile);
	    })).onValue((function(tile) {
	      $__0.camera3D.userData.target = $__0.object3D.localToWorld(tile.object3D.position.clone());
	      $__0.camera3D.userData.semanticTarget = tile;
	    }));
	    newTarget.value(null).onValue((function() {
	      delete $__0.camera3D.userData.semanticTarget;
	    }));
	    Kefir.fromArray([null, null]).concat(newTarget).slidingWindow(2).map((function($__1) {
	      var $__2 = $__1,
	          a = $__2[0],
	          b = $__2[1];
	      return [b, a];
	    })).onValue((function($__1) {
	      var $__2 = $__1,
	          newTarget = $__2[0],
	          oldTarget = $__2[1];
	      if (newTarget) {
	        newTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(4) + ")")});
	      }
	      if (oldTarget) {
	        oldTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(5) + ")")});
	      }
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.addButton({
	      name: 'pointCamera',
	      icon: __webpack_require__(5)
	    }).onValue((function() {
	      if ($__0.circuitboard.cameraTargetTile === $__0) {
	        $__0.circuitboard.cameraTargetTile = null;
	      } else {
	        $__0.circuitboard.cameraTargetTile = $__0;
	      }
	    }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
	  __webpack_require__(9).init(Kefir, $);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

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

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZWNhZGVlYjM2ZjZmZGJiYzk1MCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtYmxhY2sucG5nIiwid2VicGFjazovLy8uL3NyYy91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8v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QztBQUNoRCxnQkFBQyxFQUFJLGVBQWEsTUFBTSxFQUFJLGVBQWEsTUFBTSxDQUFDO0FBQ3BELGNBQUksRUFBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxFQUFJLFVBQVEsRUFBSSxVQUFRLENBQUc7QUFBRSxrQkFBTyxRQUFNLEVBQUksS0FBRztXQUFFO0FBQ3ZFLGdCQUFPLE1BQUksQ0FBQztTQUNiLEVBQUMsQ0FBQztPQUNIO0FBQ0EsWUFBTyxFQUFDLENBQUMsUUFBTyxDQUFDLGNBQWUsQ0FBQyxTQUFRLENBQUMsS0FBTSxDQUFDLEVBQUMsWUFBYSxDQUFDLFdBQVUsQ0FBQyxDQUFDO0tBQzdFLEVBQUMsQ0FBQztHQUNILENBQUM7QUFHRCxNQUFHLFdBQVcsRUFBSSxTQUFTLFdBQVMsQ0FBRSxDQUFFO0FBQ3ZDLFVBQU8sRUFBQyxDQUFDLElBQUcsQ0FBQyxjQUFlLENBQUMsMkJBQTBCLENBQUMsQ0FBQztHQUMxRCxDQUFDO0FBR0QsUUFBTyxNQUFJLENBQUM7QUFHYixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7O0FDcFFBLGtDQUFpQyxvaU07Ozs7OztBQ0FqQyxrQ0FBaUMsNGlKOzs7Ozs7QUNBakMsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJrZWZpci1qcXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYmVjYWRlZWIzNmY2ZmRiYmM5NTBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBLZWZpcikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1idXR0b24tdG8tcG9pbnQtY2FtZXJhJyxcblx0XHRyZXF1aXJlczogWyd0aWxlLWJ1dHRvbnMnLCAndGhyZWUtZCddXG5cdH0pO1xuXG5cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdjYW1lcmFUYXJnZXRUaWxlJywgeyBpbml0aWFsOiBudWxsIH0pO1xuXG5cdFx0dmFyIG5ld1RhcmdldCA9IHRoaXMucCgnY2FtZXJhVGFyZ2V0VGlsZScpLmNoYW5nZXMoKTtcblx0XHR2YXIgbmV3VGlsZVRhcmdldCA9IG5ld1RhcmdldC5maWx0ZXIodCA9PiB0ICE9PSBudWxsKTtcblxuXG5cdFx0LyogdW4tdGFyZ2V0IHRpbGUgd2hlbiB0YXJnZXRlZCB0aWxlIGlzIGhpZGRlbiAqL1xuXHRcdHRoaXMucCgnY2FtZXJhVGFyZ2V0VGlsZScpLnBsdWcobmV3VGlsZVRhcmdldC5mbGF0TWFwTGF0ZXN0KCh0aWxlKSA9PiB7XG5cdFx0XHRyZXR1cm4gdGlsZS5wKCdoaWRkZW4nKS52YWx1ZSh0cnVlKS5tZXJnZSh0aGlzLm9uKCdkZXN0cm95JykpXG5cdFx0XHRcdC50YWtlVW50aWxCeSh0aGlzLnAoJ2NhbWVyYVRhcmdldFRpbGUnKS52YWx1ZShudWxsKSk7XG5cdFx0fSkubWFwVG8obnVsbCkpO1xuXG5cblx0XHQvKiB3aGVuIGEgdGlsZSBpcyB0YXJnZXRlZCwgY29uc2lzdGVudGx5IHBvaW50IHRoZSBjYW1lcmEgdGhlcmUgKi9cblx0XHRuZXdUYXJnZXQuZmxhdE1hcExhdGVzdCgodGlsZSkgPT4ge1xuXHRcdFx0aWYgKCF0aWxlKSB7IHJldHVybiBLZWZpci5uZXZlcigpIH1cblx0XHRcdHJldHVybiBLZWZpci5tZXJnZShbXG5cdFx0XHRcdEtlZmlyLm9uY2UoKSxcblx0XHRcdFx0dGlsZS5wKCdzaXplJykuY2hhbmdlcygpLFxuXHRcdFx0XHR0aWxlLnAoJ3Bvc2l0aW9uJykuY2hhbmdlcygpXG5cdFx0XHRdKS5tYXBUbyh0aWxlKTtcblx0XHR9KS5vblZhbHVlKCh0aWxlKSA9PiB7XG5cdFx0XHR0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCA9IHRoaXMub2JqZWN0M0QubG9jYWxUb1dvcmxkKHRpbGUub2JqZWN0M0QucG9zaXRpb24uY2xvbmUoKSk7XG5cdFx0XHR0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnNlbWFudGljVGFyZ2V0ID0gdGlsZTtcblx0XHR9KTtcblx0XHRuZXdUYXJnZXQudmFsdWUobnVsbCkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRkZWxldGUgdGhpcy5jYW1lcmEzRC51c2VyRGF0YS5zZW1hbnRpY1RhcmdldDtcblx0XHR9KTtcblxuXG5cdFx0Lyogd2hlbiBhIG5ldyB0aWxlIGlzIHRhcmdldGVkLCBjaGFuZ2UgdGhlIGNvbG9yIG9mIGl0cyBjYW1lcmEgYnV0dG9uICovXG5cdFx0S2VmaXIuZnJvbUFycmF5KFtudWxsLCBudWxsXSkuY29uY2F0KG5ld1RhcmdldCkuc2xpZGluZ1dpbmRvdygyKS5tYXAoKFthLCBiXSkgPT4gW2IsIGFdKS5vblZhbHVlKChbbmV3VGFyZ2V0LCBvbGRUYXJnZXRdKSA9PiB7IC8vIFRPRE86IHVzZSAnLmRpZmYnXG5cdFx0XHRpZiAobmV3VGFyZ2V0KSB7XG5cdFx0XHRcdG5ld1RhcmdldC5lbGVtZW50LmZpbmQoJz4gLnRpbGUtYnV0dG9uLWhvbGRlciA+IC50aWxlLWJ1dHRvbi5wb2ludENhbWVyYScpLmNzcyh7XG5cdFx0XHRcdFx0YmFja2dyb3VuZEltYWdlOiBgdXJsKCR7cmVxdWlyZSgndXJsIS4vdXRpbC9pY29ucy9jYW1lcmEtYmxhY2sucG5nJyl9KWBcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAob2xkVGFyZ2V0KSB7XG5cdFx0XHRcdG9sZFRhcmdldC5lbGVtZW50LmZpbmQoJz4gLnRpbGUtYnV0dG9uLWhvbGRlciA+IC50aWxlLWJ1dHRvbi5wb2ludENhbWVyYScpLmNzcyh7XG5cdFx0XHRcdFx0YmFja2dyb3VuZEltYWdlOiBgdXJsKCR7cmVxdWlyZSgndXJsIS4vdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nJyl9KWBcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSkuaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmFkZEJ1dHRvbih7IG5hbWU6ICdwb2ludENhbWVyYScsIGljb246IHJlcXVpcmUoJ3VybCEuL3V0aWwvaWNvbnMvY2FtZXJhLXdoaXRlLnBuZycpIH0pLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHRpZiAodGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhVGFyZ2V0VGlsZSA9PT0gdGhpcykge1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmFUYXJnZXRUaWxlID0gbnVsbDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYVRhcmdldFRpbGUgPSB0aGlzO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wLXRpbGUtYnV0dG9uLXRvLXBvaW50LWNhbWVyYS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBLZWZpciwgVFdFRU4pIHtcblxuXHQvKiBLZWZpciBqUXVlcnkgcGx1Z2luICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFx0cmVxdWlyZSgna2VmaXItanF1ZXJ5JykuaW5pdChLZWZpciwgJCk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRLZWZpci5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoKTtcblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBlbWl0dGVyLmVtaXQodGhpcykgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEtlZmlyLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Q29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNLZWZpclN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Q29kZSk7XG5cdH07XG5cblxuXHRLZWZpci5vbmNlID0gZnVuY3Rpb24gb25jZSh2YWx1ZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRlbWl0dGVyLmVtaXQodmFsdWUpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0XHQvL3JldHVybiBLZWZpci5jb25zdGFudCh2YWx1ZSk7IC8vIFRPRE86IHJlcGxhY2UgYWxsICdvbmNlJyBjYWxscyB3aXRoICdjb25zdGFudCcgY2FsbHM7IHRoZW4gcmVtb3ZlICdvbmNlJ1xuXHR9O1xuXG5cblx0S2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcblx0XHRcdGVtaXR0ZXIuZW5kKCk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBLZWZpci5idXMoKTtcblx0XHR2YXIgb3BlbiA9ICAgICAgS2VmaXIuYnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gICAgIEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRoYW5kbGVyKCgpID0+IHtcblx0XHRcdFx0b3Blbi5lbWl0KCk7XG5cdFx0XHRcdHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcblx0XHRcdFx0Y2xvc2UuZW1pdCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcblx0XHRcdHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2godmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkb05vdGhpbmcgPSAoKT0+e307XG5cdFx0dGhpcy5vblZhbHVlKGRvTm90aGluZyk7XG5cdFx0cmV0dXJuICgpID0+IHsgdGhpcy5vZmZWYWx1ZShkb05vdGhpbmcpIH07XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24gKGJ1dHRvbklkKSB7XG5cdFx0dmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoYiA9PiBiID09PSBidXR0b25JZCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChlKSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbEJ5KHVudGlsU3RyZWFtKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEtlZmlyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQVlBQUFERFBtSExBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVIM2d3WEFSc0wwL2d0L1FBQUVhSkpSRUZVZU5ydG5YbFFrMWUveDc4SkFSUk1TQUlKQm1SVGlNdUFFaFZsVXp1OWpDdmpCcmkwcnEvYXZvNUx0V01IZmUydDcxUjdXNlZqdlRNdDFKbFd2V3FyVmREQ0tKYXh0NVU2UXFzZFpITUJWRWhrMDFBaVN3UUVjdTRmeGx5bFBFOGlXNTZFODVrNU04QTVKTDl6enZkNW5yUDh6dThCS0JRS2hVS2hVQ2dVQ29WQ29WQW9GQXFGUXFGUUtCUUtoV0tIOEd6RXpva0E1Z0VJQmVBTndKbUR0aE1BYlFDcUFOd0VrQWtnajBxc2QwUUIrQmxBUFlDbkFEcU5EYzNsMUdtMHRkNW9leFR0eHRlOWxBZ1pBdUFqQUswQUREYlE2VXpKWUt6RFI4WTZVU3pvZkZjQUtUYmM2VXdwMlZnM0Nrdm5Pd0g0VHp2cy9CZHB0N0dPbEc0Nm53Y2cwbzQ3LzBXS05OYVYwczNWbnpNSUJKRExwYnNBbDVRWUNlQWFXd0daVEFhWlRBWkhSMGRPaXJpOXZSMWFyUlphcmRhU3V1YlN5LzVWenJKZE9TcVZpcHc1YzRaMGRIUVFydExSMFVIT25EbERWQ3FWdWJ2QUdkcmRyekljd0RPbUJ2UDM5eWRYcmx3aHRzS3Z2LzVLL1B6ODJBVHdESUFuRnhxZXp4RUJyQWZBZUY5ZnVIQWhvcU9qYlViTjA2Wk53OEtGQzltS09CcnJUQVZBQ09FRCtBZFR2bHd1eDdScDArRGc0R0F6QW5Cd2NNQzBhZE1nbDh2Wml2MkRDN01CcXd1QXgrUE5CUkRBbEI4V0ZvWVpNMmJZM0ROdHhvd1ptRHg1TWx1UmtjYTZEL3BId0h2RzUrTGZjSFoyUm5SME5OemQzVzFPQUI0ZUhvaU9qb2F6c3pQanpjOVk5MEV0QUNXQU1LYnBxRktweE96WnMyMTJaRHQ3OW13b2xVcTJLWGdZZ0tEQkxJQU5BRnlZTWlkT25JalEwRkNiRllCS3BZSktwV0lyNG1wc2c4RW5BRUtJQU1BaXB0Ry9RcUhBdkhuemJINStPMi9lUEF3ZlBweHROckRJMkJhRGpwVUFHcGpteWhFUkVhU3RyWTNZT20xdGJTUWlJb0p0VGFBQndJckIrQWhZQVVEWTdYM1IxUld6WnMyQ2s1UHRiNXc1T1RsaDFxeFpjSEZoZk5JSmpSZURmVU1JNFJubi9EQU9malJNVjBWQVFBQXBLU2toOXNMZHUzZEpRRUFBMjExQVkyd1RFRUw0QTdrK0lPaVBqZ2JnOEZMaTgzaThZVHdlTHhCQUNJQXhBUDREZ0ZlM3R5UStINkdob1d5alo1dGo5T2pSbURCaEF0UnFOUXdHUTNkRnZBQWNCZkMvUEI3dkxvQWlBUGNJSWMxNDdsWFUrU0x4ZUR6Q3BhdGFRQWh4TVJnTTR2VDBkRGtBSHdCVDhYeGw3eUNBTEFDVmVJM3RVckZZVERJeU1vaTlrWjZlVHNSaThldHVIVmNhMi9BZ2dIWEd0dlZKVDArWEd3d0dNU0hFcGJjRFNONXJkcmdMajhlVEdLY3ZIc1o1L0ppWDB1amVpaW80T0JoRlJVVjIrUmdNQ1FsQmNYRnhYM3hVQ1lDN0w2VlNBSFVBOUlRUUhZL0hlOXJYVjdvSXdIUUEvd2J3Rzl2b3ZUZkowZEdSZlBMSko4UmUyYmR2SDNGMGRPd3ZSNU1HWTkvOEc4QjBRb2l3ejRRTDRMOEJOS09mdldYYzNkMUpWVldWM1FxZ3FxcUt1THU3RDRUWFViT3h6MEo2Mi9reEFLNWpnTnlsRWhJU2lMMFRGeGMza081bjE0MTkyS05aUUNTQXJ3R002dGRwaUVBQWhVSUJMeTh2dlBkZS8reU4xTmZYUTZQUm9McTZHblYxZFhqeTVBbjBlajA2T2pwTU5yaTZ1a0lzRnNQRHd3TmVYbDd3OWZXRlZDcnRjMXUyYmR1R3lzcEtWRmRYbzZhbXhtUkRQeEZtN01OVmVPNXZhZGtnTUQwOVhiNWd3WUpMZUg0a2k2Q1BmQWZsY2puOC9Qemc2K3NMYjI5ditQcjZRcUZRbUh6OXhvOGZEejYvYjlhbTd0eTVnOXpjWEJRVUZPREJnd2VvcmEyRlZxdUZUcWREVTFNVENIbDFOc1hqOFNBVUNpR1JTQ0NUeWFCUUtCQVFFSUFKRXlZZ01qSVNZOGFNNlJPN0RBWURDZ3NMVGI2RE5UVTEwR2cwcUtxcWdrYWpnVnF0eHVQSGovdHMrR2JzdXp5ZFRqZGJJcEZvTFowRmZBTGdYejM5VmxkWFZ5aVZTZ1FFQkdEa3lKRUlDQWlBbDVjWHBGSXBKQklKcEZJcHhHSXhYRjM3OXB4RVIwY0gwdExTY09IQ0JkeStmUnNWRlJXb3I2L3YxV2RLcFZMNCsvc2pPRGdZc2JHeFdMeDRjWjg3cCtqMWVqeDU4Z1QxOWZYUTZYU29yNjlIZFhVMXlzdkw4ZURCQTVTWGw2TzB0QlI2dmI0M1gvTmZBSFpiSWdCUEFPVUFocHBkUitiek1YcjBhQ2lWU2dRRkJTRW9LQWdCQVFGd2MzT0RtNXNiaEVLaEtmVTNodzhmeHZmZmY0K1NraEk4ZXZTb1g3NWorUERoVUNxVmVQdnR0L0hPTysvMGU1MmFtcHBNcWFHaEFRME5EU2d2TDBkWldSbkt5c3BRV2xxS2twSVNwc1dscnJUZ3VlT04yY2I1Sjl2QWdzZmprZFdyVjVPc3JDeFNYRnhNeXN2TFNXMXRMV2xzYkNUdDdlMERQcWk2ZVBFaUNROFA3OGtpUzQrVFdDd200ZUhoSkRNemM4RHIyOTdlVGhvYkcwbHRiUzBwTHk4bnhjWEZKQ3NyaTZ4YXRZb1lWd25aMHJ1V0tDV0Q2UVA0ZkQ3NTdMUFBTSE56czlWSDAzcTlucXhaczRaSXBWS3JIZktRU3FWazdkcTFSSy9YVzcwOW1wdWJ5YWVmZm1wT0JCbVdDSUJ4a3lZMk5wWm9OQnFyVnpZbko0ZU1IVHVXQ0FRQ3E1LzBFUWdFWk55NGNTUTNOOWZxN2FKV3EwbHNiQ3lidldwTEJNRG9uNStZbUdqMVNoNDVjb1RJWkRMT0hmbVN5V1RrNk5HalZtK2Z4TVJFTmp2YkxGa0hZUFRQSHpwMEtLeEpVbElTOXU3ZGk2YW1Kc3MyT25qUHg3Z2lrUWhUcGt6QkcyKzhBWlZLaGNEQVFDZ1VDZ3diTnN3MDJIcjA2QkhLeXNxUWw1ZUg3T3hzL1BISEg2YnY2VHBsN0E2dFZvdXRXN2VpcnE0T08zYnNzRm9ibWVraml4d3NHQlcwWjg4ZXF5bjd3SUVEeE1YRnhhS3JrYy9uRTVGSVJHSmlZa2hxYWlwcGJXMTk3ZTlyYVdraFo4NmNJVEV4TVVRa0VoRStuMi9SZDd1NnVwSURCdzVZclozMjdObGp6a2JiRThEWFgzOU5SQ0tSeGZzSmNYRng1T2JObTMzMi9YbDVlU1ErUHA1NGVIaFlaSU9ibXhzNWZQZ3dGVUJmN2FON2VYbVpiWFFuSnljU0dSbEpMbDI2MUcrMi9QVFRUeVF5TXBJNE9UbVp0Y2ZiMjlzcWZnMTJKWURDd2tJeVpjb1VpNlpqVzdac0lTMHRMZjF1VTB0TEM5bTBhUk9SU0NSbTdabzZkU29wTEN5a0F1Z0pPcDJPckZ1M3pxSXJMVGs1ZWNDdnRDKy8vSktNR0RIQ3JIM3IxNjhuT3AyT0N1QjF6OWtmUDM3Y2JPT09HREdDbkQxNzFtb0RydFRVVk9MajQyUFd6aE1uVHBET3prNU9Db0NUQnhJMEdnMzI3OS9QV2tZc0Z1UFFvVU9JaTR1eitITzFXaTF1Mzc0TnRWcU51cm82NlBWNkNJVkNMRnUyak8zd0JpTnhjWEhnOC9sWXQyNGRkRG9kWTdrREJ3NGdPam9hL3Y3K25HdHJ6Z21ncmEwTlo4K2V4YTFidDFqTDdkKy8zK0xPdjNuekp0TFQwL0hubjMvaS92MzdxSzZ1Um1Oam95bS9xS2dJMzM3N2JZL3NYYlJvRWVycTZsZzNoNHFLaXBDYW1vcXRXN2ZheEZrSHF6NENOQnFOMlpXKzdkdTNXelRncTZtcElidDI3U0xCd2NHczgzaFBUODllRHd6ZmYvOTlWcHM5UFQzSnc0Y1BPZmNJNEhOSmVlM3Q3VGgvL2p4cmtDV1ZTb1dOR3pkaXlCRDJ3SnM1T1RtSWo0L0g1NTkvanVMaVlzWXRVd2NIQit6Y3ViTlhkZzhaTWdRYk4yN0V4SWtUR2NzOGV2UUk1ODZkUTN0N083MERNUEgwNlZNU0dCaklxdUJUcDA0Umc4SEEramxaV1ZtTWc3TlpzMmFScEtRa2twbVpTWDcvL1hkeTY5YXRQdHZOTzNYcUZLdnRTcVd5MzNjT2JYWVdZREFZeUpVclYxaU5uenQzcnRuZHlKeWNuRzVYN0ZhdVhFbnk4L09KVHFjanJhMnRaa1hVMDhmWDNMbHpXZXR3OWVyVmZ2bHVtMzhFRUVKdzl1eFoxakxMbHkrSGo0OFBZMzVWVlJYZWV1c3QxTlhWbWY3bTdlMk4wNmRQNDV0dnZzR0VDUk1nRm92aDdPeHMyaWpxUzN4OGZMQnMyVExXTWovODhJTkZtMHNEQmFjRWtKSEI3Szh3WmNvVTFtQVJyYTJ0K1BEREQxRlJVV0g2VzFCUUVJNGRPNGFsUzVjTzJPZzdORFFVWVdGaHpONDJHUmxVQU4yaFZxdng4T0ZEeHZ6cDA2Y2pNRENRVVR3M2I5N0VzV1BIVEg5VEtCVFl1M2N2WW1KaUJyUWVnWUdCbUQ1OU91c2FoMGFqb1FMb3l0V3JWMW4zOVVORFF4bEgvcDJkbmRpM2I5Ly9MMjRJQkZpK2ZEbVdMbDFxbGYxNGxVckYrb2o1N2JmZnFBQzZrcGZIL0hhVk1XUEdzSzZpMWRUVUlETXowL1I3Y0hBd3RtelpZclc2K1B2N1kvVG8wYXdMVTFRQVhiaHo1dzVqbnArZkg3eTh2Qmp6ejUwN1ovclowZEVSVVZGUlZsMTJWU2dVOFBQejYxRmRCNjBBWGg2OGRXWDQ4T0h3OFBCZ3pQL2xsMTlNUDd1N3Uxczl1SlNIaHdmcjNnSmJYUWV0QU5oVy95UVNDZXZoa3BmakNRaUZRdFlWdVlGQUpCSkJJcEV3NXZmaDBTLzdFY0RMbXpOZFlRbXdCQUNvckt3MC9lems1QVJQVCtzSDRtYXoyVktuMWtFbEFMYmpUUUlCKzZibHkrdnJYTmx0WTdPNXM3T1RDdUJ2aHJDY0NqWjNoUHJkZDk4MVRjRldyVnJGaWZxdzJkeFhKNkQ3UktoY01VUWtFdUhKa3lmZDVqMTl5aDd5NXVPUFA4YWNPWE13ZE9oUVJFUkVjS0krYkRhN3VibFJBWFJGSnBNeEN1REZtWDZtZ2FCY0xzZUNCUXM0MDZoTlRVMnNIa0l5bVl3K0FycGJQR0dpdHJiMmxRMGVybE5YVjRmYTJ0b2UxWFhRQ21EY3VIR01lV3ExR3RYVjFUWWpnT3JxYXFqVnpPY3d4NDRkU3dYUUZiYWR2cnQzNzNKcThjUWNGUlVWS0NrcFljdzNFMEorY0FxQWJRZU5FSUw4L0h5MHRyWnl2dk5iVzF1Um41L1B1dVhMVnRkQkt3QS9QejlXWjQvczdHeVVsWlZ4WGdCbFpXWEl6czVtelBmMTlZV3ZyeThWUUZkNFBCN216NS9QbUgvanhnMFVGQlJ3WGdENStmbTRjZU1HWS83OCtmUDd4UnZKTGdTd1pNa1MxaktuVDU5bWRScXhOZzhmUHNUcDA2ZFp5eXhac29RS2dFa0FZV0ZoQ0FwaWZvZlN4WXNYY2UzYU5VNjVWTDA4VHJsMjdkb3JmZ2xkVVNxVm1EeDVNaFVBRXdLQkFKczNiMll0azVTVWhQdjM3M05PQVBmdTNVTlNVaEpybWMyYk41dmQxeGpVQW5CMGRNVGl4WXRaMzdpWmw1ZUhsSlFVVHMwSVdscGFrSnljek9yVjVPbnBpVVdMRm5IdXplZDhybDFKY3JuY2JJeWRnd2NQNHVUSms1eXgrY1NKRXpoMDZCQnJtUjA3ZHBoN2xTd1ZBUEI4T3pjK1BoNGhJZXlSemhNVEU1R1dsbVoxZTlQUzByQnIxeTdXTWlFaElZaVBqK2Zrd1ZET0NlREZta0JpWWlKcm1mcjZlbXpidHMzc1laTCtKRFUxRmR1MmJUTWJqM2puenAyY212dHpYZ0I4UGgreHNiRll2NTc5RGV1VmxaWFl2bjA3dnZycXF3RzNNVGs1MlJUNm5ZME5HelpnM3J4NW5QSUJNRHVqQVVkaUJCVVZGWkdwVTZlYWpjQWhrVWpJcGsyYkJpUmthMHRMQzltOGViTkZNWUxDdzhOSlVWRVJqUkhVR3pJeU1vaTN0N2RGN3hzS0R3L3YxeWhobHk1ZEloRVJFUlpGQ1JzeFlnU05FdFpYcEtTa0VLRlFhSEdjd0lTRUJGSlFVTkJuMzUrZm4wOFNFaElzamhNb0ZBcEpTa29LalJObzdVaWhNMmZPSk9mT25ldFJwTkRXMWxhU2xwWkdaczZjYWRlUlFtM21yZFVmZlBBQkFGZ1VLOWhnTUtDeHNSR1hMMS9HNWN1WElSS0pFQjRlampmZmZCT2hvYUVZTldvVVBEMDlUVzhzMGV2MXFLbXB3YjE3OTFCUVVJRHM3R3prNXVhYVhOVXRYWG9XQ29YNDZLT1ByQm9yMks0R2dkMXgvUGh4SXBmTE9SY3RYQzZYa3hNblRsaTlmV3c2UnBBbHJGeTVFaGN2WGtSd2NEQW4xdFVGQWdGQ1FrSnc0Y0lGckZpeHd1YXVkcjR0M3FJbVQ1Nk1HemR1WU1XS0ZmM3lhamRMa1VxbFdMbHlKYTVmdjg0YUZJSUtvQjhZTW1RSWpoNDlpcE1uVHlJeU1wTDFMRjVmSTVGSUVCVVZoZSsrK3c1SGpod3hHN0dNeXdoZzQ4eVpNd2R6NXN6QjBhTkhjZXpZTVpTV2xySzZaUGVHRjI4Tlc3Tm1EZGF1WFF0N1FBQTdZZTNhdFZpOWVqWFMwdEtRbVptSm9xSWlWRlJVNEsrLy91clY1N3E3dThQZjN4OGhJU0dZTzNjdTR1UGpPZVhRUVFYUVpROGhJU0VCQ1FrSktDMHR4YlZyMTFCWVdHZ0tEL3Y0OFdQb2REbzBOemQzKy8vRGhnMkRSQ0tCWEM2SGw1Y1hSbzBhaGZIanh5TXFLZ3BLcFJMMmlBQjJpbEtwTkhXYVRxZkRnd2NQVE84T2JteHN4Tk9uVDAybmloMGRIZUhpNGdLUlNHUjZkL0RJa1NNSGRGeEJCZERQZzdaSmt5WmgwcVJKb05qSkxJQmlCUUhZMCtESFhubmRQdXBPQUl6aEs3Z1UyWUxTb3o3cXNFUUFqUE9taW9vS05EUTAwRmJtS0MvZUxzN0NYNVlJZ0RHSTNmbno1MWtQUGxDc1MyWm1Kbjc4OFVlMkluL3JXNGR1Q28wQThHWjMvLzNzMlRQOC9QUFBhRzl2eDdoeDQwemJxUlRyb3RWcThjVVhYMkQzN3QzbXRzcS9BZkJLVE43dVJneitBTXBwczlvbEFRQXF6RDBDTkFDK3AyMWxkM3huN0Z1WXV3TUFnQitBZkFCaTJtNTJ3Uk1Bb1FEVWxxNERhQUJzQU5CSzI4N21hUUd3dnJ1cjMreWFBb0IzQUdqQk1mY3JtaXhPV3VPRjNLc1Z2QVVBY2dDMDBRYTFtZFJtN0xQNTVqclh3UUlCbEFESUF0QmdYRWx5QU9CcTRmOVNCbzUyQUE4QlhBZndQd0IyQS9qVGt0djg2NkFBTU1FNG5aQUFjT3p0N1lYU2E0aXg4M1hHNlhzK2dGcmFMQlFLaFVLaFVDZ1VDb1ZDb1ZBb0ZBcUZRakh5ZjVidGxvT3JmOWgvQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXJsLWxvYWRlciEuL3NyYy91dGlsL2ljb25zL2NhbWVyYS1ibGFjay5wbmdcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FZQUFBRERQbUhMQUFBQUJtSkxSMFFBQUFBQUFBRDVRN3QvQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDNnd1hBQTBzYTZoSGRnQUFEU1pKUkVGVWVOcnRuWHVRWFZXVmg3L1Y2VHdrQmtnTTVJR1FaSlFBUWtpSW9nSXFsb01PRXhDRmlGb3pvS2dvSUdWSnFZaWxncGJsQXdVZFJXcW9HUjhSUVVWZU9neElVVExVakdOQVVaTkFnbUlJSkdsTU9nbEpkNTdrMmZuNXgxNWR1ZW51czgvcDd0djNubnQ3ZjFXbnVwTjcrdHkxOWw1blA5ZGFHeEtKUkNLUlNDUVNpVVFpa1Vna0VvbEVJcEZJSkJLSlJDTFJoRmdqQ0NscExuQU9NQWM0Q2hoZFF0a0Y3QWJXQUl1Qlg1blpvbVJpZzZ2NE15UTlMS2xEMG91U3VsUit1bHpXRHBmOWpGU1QvYS80TVpLdWs3UkwwbjQxTHZ0ZGgrc2tqVWsxVzZ6eXgwcTZSYzNIdjBzYVc3YnliaWxaNVk4Q1BnRmMzb1MyZlFWd2xldVlCb0Y5Vkw0QnB3RUxtN3lST3dONHpNeVVXb0NER1FuY09BeDZ1Vys2cnFrRjZORUNuRjdnN1gvQnI3MGxyZHlSd0JGK3hUamR6QjVMSTc2RERlQ3VuRUhVSWtrWFNocFJZaDFHdUl5TGNuUzVNOVg0d1FVM1dkS2VTSUd0bEhSbUErbnpaa21ySXZyc2tUUXBqUUVPY0dsT3YvaEw0TGNOWk5QLzd6TEh1b3BMMDZzUGRIVjF0VWg2THZLMnJKZDBRUU8yYXZOZDlpeWViVzl2dDJGdkFKTE96ZWt2NzVmMHNnYlVhNktrQjNKME95ZDFBZkJ4d2taS1grd0dmbXRtbXhyTkFNeHNvM2RidTdOc3hIVWYxbS8vVEVtYkkyL0lrNUxtTkxCK3A3Z09XWFJLT25ZNHR3QWZCZzZKZkw3SXpKWTBxZ0dZMldMQzFuQVdZNzBNaHVYYjN5cHBSZVR0V0N2cHdpYlE4OTJTMmlONlBpT3BkVGdhd01XU3RrUUs1dEd5Ylp3TVVNOVJya3NXV3lSZE5CeTdnSXVBY1JtZjdRQWVNck05alc0QXJzTkR3SXNadDR3RExoNE9iN3hKYXZIZlQ1WFVGbmtybnBNMHM0bDBQeTVucmFOTjBxbCtiNHZ2ak5hRTFxR29hR0JFeGRVQ3ZCUjRKVEJMMHZIQVB3SlRNeDZ4SDFoaVpzdWJ4UURNN0srU25nQ21aYlM2VTRFRmt2NEhlQnBZS21rRnNOM0xvNnY3cXZZMmN1c2dLN3NWR0ZWeGpYWmxUZ1JPOHA4bkVodzVpN0lWV05DRWplQUM0TTNBNFgxOE5xS2lyQ3BaQXp4VmNTMlR0TmJYRnZaMFgyYTJiOERHMmM4S1B3UVk3OU9YaWNCTTRQaUs2N2dxRk5ReU01dlZwTjNnVW44eEJzdGZ2YVhvdnBZREczM3MxR2xtTDFhMUJaQjBLTUVsK3kxK3pRWU9IWUl5Mmd2OHJJbUhRbmNBWDJEd0RpSEgrZldPSGkzbkU4QWpraDRCRnB2WnRtcFk3U3hKMzVHMHZRYU9reHNsVFczaWdmQlUxM0dvMmU1MU5tdXdBcDhsNmZFYWVzNDJ2YU9FcEx0cldKNlBTenByUUdNQWQ5SDZNZkNLSVM2VGZVQTdzQmI0cEprdEhJSkNud0FjNHdQVWlUNFFHMXZSQmU3ei9uT3o5NlZyZ1RZejZ4Z0NXZDVBOEgyY0Nrd1ppcGxZRDU0RjNtZG1qeFkyQUVsSEFnOENjd203VnRXYWwyNEFWZ050UHNKdDg4cnY5dlY3MHN6MlY2bWdUeUI0R2M4Ry9nR1lUUERWRysrTEx6MTFFckFONkhSWjJvR1YzcTgrYW1aUFYwbXVGdUJrRHZnT1RuSGpQTXAvVGdPT3JKYTl1WjZMZ0xQTjdJV2lCdkFWNExPRCtPSWRQakpkQ1R6blA5Y0NIVjdBSGNCbU05dFI1YmVyRlpnUG5BdThDcGdPVEJqa1l6dUFWY0F5NEg3Z1hqUHJxckxjWTcxVm11QUdPc0ZiaUJsdXZETjh4aldZd0pLdm10bm5jZzNBZmRWV0FpOHA4TkQ5UGlWWkRqemoxMHBnaTEvYmdHMVZHWTNtRitKbHdMLzQ2SGlvL08zV3VhNC9NYlAvcklGTzQ3eTFHZ2NjNXRjTTRGaS9acnErUlpiMGR3SXp6R3g5M3BkZVhpRGU3VWVTM2licFJFblRKVTJTTks0ZXUxcVM1a2w2elBmV2EwV25mK2MvMTBIZlZpL3JTVjcySjNwZDNGb2dqdkt5SWw5d1gwN2s2elZsaUhHVGRJaWtCWkkyMVRIZWI1T2tIL29DV2IzTFk2eWt6K1FZd1gxRkhoVGJwUGx2U1VlWFFOblRKUDFaMHQ0U0JIM3VsZlNVcE5lWG9GeU84VHJLWW5YUHYrbXI3NWdjK1k2bnpPejVPaXY1QWVDL2dCTnFNSVVxdXByNkt1QStTWmZVVXhBemF5UHNHV1F4dWNoUzhNaWNnVVE5Sy85cTRGcXkvUWo2bWdaMUw1TStEdnd2d1VWckJkQnVadHNyQmx1VGZHQTFGemdUZUYzRjl4U1pCaDhCM0NScG9wblZNOFl4VmtlamloUnlqQy9Xcy9JbDdlaEhsbzR0a243dC92bWpCL0I5WXp6TTY5ZitySzUrTE1OZVhjZHkrbUpNdUlZMEFFbVg1YmlQOWR4UHVMdWEzc1R1M1h1WHBCY0t5ckJaMGtlU0FWUkhvZk1rclNsUTZMc2xMWlIwOWhESzhrLytIYnNMeVBNM1NXOVBCakE0WldaSituM0I2ZGhOdGNqRDQxM0R6WjRFS28vZkRYcEhicmdhZ0tUREpYMi80SnQyUlIzZXRDc2xQVjlBdnU5Sk9qd1pRUCtVR09GdTQzazhMK2xkZFJ4d3pjOVpOK25tb202SDJMSVpRRmtERW80QnJzbTVaek53bFpuZDA0L0NPY0xuN05NSTI4SmpDZnNWZDVqWnVnSE11KytSdEIvNEFXRVRKNHRQRStJRVY1V3RvRXRuQUQ1bHU1RGVEcEk5dWFabzVVczZoZUErOVJxQ2Y4TlVEblpwbXdWOGFJQ0xMNytRTkJHSWJRN05BdDRsNmFiU3h6clV1d3VRZExTa0RUbHlmS3ZJZ004emozeFYwdEtjZWZ5NlFjbzhSdEkzYzJSZUorbmxaZXNDeXBZbmNDUndQdkVrUzR1Qlc4eHNWODZ6VGdmdUJqNUY4TVROMHJVTHVINlFTN0M3Z0ZzSWpoZFpUQUl1Y0IxVEZ4Q1I1Mk01OTN6RGwzSmpsZjgyNFB0QVh4dFhEd0VQRTliTU8zd01NT2krMmN4V1NMcUJ1RmZ6bFM1WFdiT2MxYThMOE5DeE0zTysvNEc4M1VqZktleHJ4ZTdIa21iNzlITDBVSVJmZWZlVmx4WGtEVU1aK3RYSVhZRDU0Qy9HejJLN2taS09BbjdxSS94dTFnRHZCUzQxc3lmTWJMT1o3UjZLVEowdTJ4MDV0NzJIRXVWbkxKc0JuQmY1L0hGZ1NXd2dCbnlaNEFmWXpUUEFKV2IyOHhxT3ZwY0FmNGg4Zmw0eWdMNlpsdEZuZC9PYnJMN2ZtOVJUZ0VzcS9yc2R1TmJNSHE2eEhpdGMxdGdheHpISkFIcnp4bGpYUm9nWXpocjVqd0ErWC9IdmZkNWQvTHptelpqWlRwK3B4THFZTnlVRDZNM2N5R2RQNTR6VXB3RHpLdjY5RFBodUhYVlpSZkNXenVLVVpBQzlPU0h5MldwQ1hFRVdsWWtrOXdJTHpXeFZIWFZwZDVrSG91dXdOWURwa2MvV0VVSzJzbmhMeGUrYmdBZnFyTXRHbDNrZ3VnNWJBNGl0L25YbUJKZFU3cmx2STc0aVY0dHh3RlpDQkZRV1J5WUQ2RTBzMzBCZXdvUEtOZlk5dWRFdnRTRW04N2hrQVAyVEpTOEZTdVg2ZWxsMjIySXlqMGdHMEp0WVZIRGVuc1YvK00rZGhKRDJNdEE2UUYxTEkyU3QyVXJmQ1pRZ25rNFc0RHBDT1B0T29DeEhzY1JrM3BJTW9EY3ZSQXhndktSeFdRTkJNOXRBaUJZcUJSNW9NajVIMTlRRjlDQTJiNS9Nd1JzOFpXY2k4UkM3VmNrQWV2UG55R2ZUeUU0c1dVYW11c3haL0NVWlFHOWlhZUdQcDBTTEp3V1lUanhuNHVKa0FMMko3YUFaTUtjUkRtQjJHZWNRMy9MOVRUS0EzcXdHWXFIblp4S2lkOHZPc1M1ckZtMStKUVBvK2ZJQXNRd1dweEl5ZnBXZE9TNXJGdmNSM3lvZTFnYVFseWp5dldYSVVCSnAvbzhtdUovRnVETVpRTjl6ZVJGY3FaNkozSFlPY0VZdDgrbjNvL0tOY0RMNHZNaHR5NEUvbHVYazhMSzFBQkRXejIvT3VlZHFoajU3NlVCNHBjc1c0MmJ5OXpXR3J3R1kyVjdnWGtKRzBTem1BbGVVYVVZZzZTWEFSNGw3TmEwSGZ1RTZKZ09Jc0lHUVN6ZkdKd2huRHBXRmk0R3JjdTY1TWNld2t3RjRLN0NIRU5LMU5PZldyMHVhWDRLM2Z6N3d0WnpibGdKM2x6RXd0SXd0UVBlYXdOZHo3cGtBZkx1ZVp3dDZib0p2azUrUCtQb3l6ZjFMYndDZU1meCtRaHhkakpjRC95YnB5anBVL2tlOTh2TWlmcjhIUEZDdExPaTFVS3hNT1lKTzhqdzdlWFI0M3A1RGFpRFRHRW5mTFpnajZERkpKOVc0ekpvdVM5amJQUTlRSG51OHdJY3lTOWpaZmdybzdvTHBhMUtXc0NvcGRibWtyZjNJRTNpbnBKT3IrUDJ6L1psRjh3UnVsWFI1bmNxcStRekE1UnBJcHRDSEpKMC93RXlob3lWZDRNOW8ya3loRFhOcXRabmQ0UElYeVJYY1FuQXpmNnRmV3lYOURuaUU0SGZ3TExDK3M3Tnp4L2p4NHlFa2k1cmlxM216Q2J0NXAzSEFWYjNvMHZNMjRFdDF6aFhjUElQQURQa3VsclJlNVdOOVBVOEJIMmdMME5Kb0JtcG10eEUyaFpaUmpuWDFmYjdRYzY2WjNkNW81ZG5TaUsyVW1mMlJzT2QrT3lIUFQ3M29BRzREWG10bWYyakVzbXhJQTNBajJHVm1IeURzQ1R4S1BCYXYyblFDQzRGL05iTVA1bVVzS3pPdE5EaG05aUR3b0o4a2NnbmhKSzNKUS9SMTNhZUcvY2pNbXVLRTgxYWFCRE5iSU9sV3dybUI4d2dSdzlPQmx3M3kwWnNJZnZ4TGdWOFJOblhVTE9YV05BYmdSckFmdUF1NFM5Sk1nb2ZPeVJ4SUQzc2tJV0xucFJtUDJPN04rd1pDUW9wbmdTY0pDU2VXMDRTMDBxUjRoUzMzcWRGNHdnbWMzV2NISDBxSTNldU9LdDVMQ09mZXlvR3pnNTh6czA2YW5GYUdBVjZSZi9JcjBReXpnRVI5REVDcHlFcVBCbXNBc1pPeFI2VHlMVDJ4T3RwWHhBQTJSUjR3WGRKaHFZeEwrdXFIdXBtUk02WE5OWUJZNlBMNXhBTWZFdlZsSHZET3lPZC9LV0pGbnk5d0tPSzFmdjVPb2h4di9oRmViNXR6NnU1enZXWklmVHhzT3JBeUZXdFRNcU5uQnRXK3VvQTJRczc5UkhQeEUvcHdUYmVNSm1VYXdYUG04RlJ1VGNGbVlJNlpyUzY2RHRBR2ZCallsY3F1NGRrSlhFcEdZRXFmQnVDN1hmY0FIeWVlcERsUmJqWjZIZDZidFlPWjYrd282UjJFVXp4ZkRZeEtaZG9RN0NIc2UxeHZackdzSzhXOFhmM0F3L2NUVHJxWUNSekZ3Zmw1RS9WbkwrR0FyT1hBL3dHM210bWF2RC9xVjZZTlNWTUlidE16Q1B2cUl5blJBVWpEZFJuQUs3L1RwKzlMQm5JT2NpS1JTQ1FTaVVRaWtVZ2tFb2xFSXBGSUpKcVd2d01oYWpSdTFrQWx2QUFBQUFCSlJVNUVya0pnZ2c9PVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXJsLWxvYWRlciEuL3NyYy91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmdcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImtlZmlyLWpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMifQ==