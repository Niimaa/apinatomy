(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("three-js"), require("tweenjs"), require("baconjs"), require("bacon.model"), require("bacon.jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "three-js", "tweenjs", "baconjs", "bacon.model", "bacon.jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("three-js"), require("tweenjs"), require("baconjs"), require("bacon.model"), require("bacon.jquery")) : factory(root["jQuery"], root["P"], root["THREE"], root["TWEEN"], root["Bacon"], root["bacon.model"], root["bacon.jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(2), __webpack_require__(6), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, P, Bacon, THREE, TWEEN) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-auto-controls',
	    requires: ['three-d']
	  });
	  plugin.add('Circuitboard.prototype.animateCameraTo', function(coordinatesOrTileId) {
	    var $__0 = this;
	    return (typeof coordinatesOrTileId === 'string' ? this.tile(coordinatesOrTileId).then((function(tile) {
	      var pos = tile.position;
	      var size = tile.size;
	      return {
	        x: pos.left + size.width / 2 - $__0.size.width / 2,
	        y: -pos.top - size.height / 2 + $__0.size.height / 2
	      };
	    })) : P.resolve(coordinatesOrTileId)).then((function(coords) {
	      var initialZ = $__0.camera3D.position.z;
	      var tweenXY = Bacon.tween($__0.camera3D.position, coords, {
	        duration: 800,
	        easing: TWEEN.Easing.Sinusoidal.Out
	      });
	      var tweenZ = Bacon.tween($__0.camera3D.position, {z: 1.5 * initialZ}, {
	        duration: 600,
	        easing: TWEEN.Easing.Sinusoidal.Out
	      }).chain(Bacon.tween($__0.camera3D.position, {z: initialZ}, {
	        duration: 200,
	        easing: TWEEN.Easing.Sinusoidal.In
	      }));
	      var animation = Bacon.mergeAll([tweenZ.start(), tweenXY.start()]);
	      animation.onValue((function($__1) {
	        var $__2 = $__1,
	            x = $__2.x,
	            y = $__2.y;
	        $__0.camera3D.userData.target.x = x;
	        $__0.camera3D.userData.target.y = y;
	        $__0.camera3D.lookAt($__0.camera3D.userData.target);
	      }));
	      return animation;
	    }));
	  }).append('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.on('threeDMode', true).onValue((function() {
	      $__0.on('3d-render').assign(TWEEN, 'update');
	    }));
	  });
	  plugin.insert('Snapshot.prototype.take', function() {
	    if (this.options.camera3D) {
	      this.object.camera3D = {
	        position: {
	          x: this.circuitboard.camera3D.position.x,
	          y: this.circuitboard.camera3D.position.y,
	          z: this.circuitboard.camera3D.position.z
	        },
	        rotation: {
	          x: this.circuitboard.camera3D.rotation.x,
	          y: this.circuitboard.camera3D.rotation.y,
	          z: this.circuitboard.camera3D.rotation.z
	        },
	        up: {
	          x: this.circuitboard.camera3D.up.x,
	          y: this.circuitboard.camera3D.up.y,
	          z: this.circuitboard.camera3D.up.z
	        },
	        target: {
	          x: this.circuitboard.camera3D.userData.target.x,
	          y: this.circuitboard.camera3D.userData.target.y,
	          z: this.circuitboard.camera3D.userData.target.z
	        }
	      };
	    }
	  }).insert('Snapshot.prototype.restore', function() {
	    var easing = {
	      duration: 800,
	      easing: TWEEN.Easing.Sinusoidal.InOut
	    };
	    var tweenPosition = Bacon.tween(this.circuitboard.camera3D.position, this.object.camera3D.position, easing);
	    var tweenRotation = Bacon.tween(this.circuitboard.camera3D.rotation, this.object.camera3D.rotation, easing);
	    var tweenUp = Bacon.tween(this.circuitboard.camera3D.up, this.object.camera3D.up, easing);
	    var tweenTarget = Bacon.tween(this.circuitboard.camera3D.userData.target, this.object.camera3D.target, easing);
	    return Bacon.mergeAll([tweenPosition.start(), tweenRotation.start(), tweenUp.start(), tweenTarget.start()]);
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(7), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(8);
	  __webpack_require__(9);
	  Bacon.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Bacon.fromBinder((function(sink) {
	      obj.on(eventName, (function(v) {
	        sink(new Bacon.Next(v));
	      }));
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Bacon.animationFrames = function animationFrames() {
	    return Bacon.fromBinder((function(sink) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          if (sink() === Bacon.noMore) {
	            subscribed = false;
	          }
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
	  Bacon.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = new Bacon.Bus();
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
	    addStream(Bacon.fromBinder((function(sink) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        var $__0 = this;
	        sink(new Bacon.Next((function() {
	          return $__0;
	        })));
	      });
	      tw.onComplete((function() {
	        sink(new Bacon.End());
	      }));
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
	  Bacon.keyPress = function keyPress(keycode) {
	    return $(window).asEventStream('keypress').filter((function(e) {
	      return e.keyCode === keycode;
	    }));
	  };
	  Bacon.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = new Bacon.Bus();
	    var open = new Bacon.Bus();
	    var close = new Bacon.Bus();
	    pacing.filter(wantedBus.toProperty(false)).onValue(handler, (function() {
	      open.push();
	      wantedBus.push(false);
	      close.push();
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.map(true));
	      return close.startWith(true).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntil(open).reduce([], accumulator).flatMap(Bacon.fromArray);
	      }));
	    };
	  };
	  Bacon.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Bacon.EventStream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Bacon.fromBinder((function(sink) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(new Bacon.Next((function() {
	          return value;
	        })));
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          sink(oldBuffer);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Bacon.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Bacon.Observable.prototype.run = function() {
	    return this.subscribe((function() {}));
	  };
	  Bacon.EventStream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Bacon.EventStream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove');
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
	      return stream.takeUntil($(document).asEventStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asEventStream('mousemove');
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
	      return $(document).asEventStream('mouseup').take(1).takeUntil(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asEventStream('mousewheel DOMMouseScroll');
	  };
	  return Bacon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMTllNmQ4ODhlY2VmYTM1NTkwNiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWF1dG8tY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy91dGlsL2JhY29uLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLm1vZGVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBa0Isd0JBQVksd0JBQTRCLHdCQUFZLHdCQUFTLENBQUcsMENBQVUsRUFBRyxHQUFHLEdBQUcsTUFBSSxDQUFHLE1BQUksQ0FBRyxNQUFJO0FBQ3hJLGNBQVcsQ0FBQztBQUdSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsd0JBQXNCO0FBQzVCLFlBQU8sQ0FBRyxFQUFDLFNBQVEsQ0FBQztBQUFBLEdBQ3JCLENBQUMsQ0FBQztBQUdGLFFBQUssSUFBSyxDQUFDLHdDQUF1QyxDQUFHLFVBQVUsbUJBQWtCOztBQUVoRixVQUFPLEVBQUMsTUFBTyxvQkFBa0IsSUFBTSxTQUFPLEVBQUksS0FBRyxLQUFNLENBQUMsbUJBQWtCLENBQUMsS0FBTSxFQUFDLFNBQUMsSUFBRyxDQUFNO0FBQzNGLGFBQUUsRUFBSSxLQUFHLFNBQVMsQ0FBQztBQUNuQixjQUFHLEVBQUksS0FBRyxLQUFLLENBQUM7QUFDcEIsWUFBTztBQUNOLFVBQUcsSUFBRSxLQUFLLEVBQUksS0FBRyxNQUFNLEVBQUksSUFBSSxVQUFRLE1BQU0sRUFBSTtBQUNqRCxVQUFHLEVBQUMsR0FBRSxJQUFJLEVBQUksS0FBRyxPQUFPLEVBQUksSUFBSSxVQUFRLE9BQU8sRUFB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TSxFQUFJLEtBQUc7V0FBRTtBQUN2RSxnQkFBTyxNQUFJLENBQUM7U0FDYixFQUFDLENBQUM7T0FDSDtBQUNBLFlBQU8sRUFBQyxDQUFDLFFBQU8sQ0FBQyxjQUFlLENBQUMsU0FBUSxDQUFDLEtBQU0sQ0FBQyxFQUFDLFVBQVcsQ0FBQyxXQUFVLENBQUMsQ0FBQztLQUMzRSxFQUFDLENBQUM7R0FDSCxDQUFDO0FBR0QsTUFBRyxXQUFXLEVBQUksU0FBUyxXQUFTLENBQUUsQ0FBRTtBQUN2QyxVQUFPLEVBQUMsQ0FBQyxJQUFHLENBQUMsY0FBZSxDQUFDLDJCQUEwQixDQUFDLENBQUM7R0FDMUQsQ0FBQztBQUdELFFBQU8sTUFBSSxDQUFDO0FBR2IsRUFBQywrSUFBQztBQUNGOzs7Ozs7OztBQy9PQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwiYmFjb24ubW9kZWxcIiksIHJlcXVpcmUoXCJiYWNvbi5qcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJ0aHJlZS1qc1wiLCBcInR3ZWVuanNcIiwgXCJiYWNvbmpzXCIsIFwiYmFjb24ubW9kZWxcIiwgXCJiYWNvbi5qcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiYmFjb25qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJiYWNvbi5tb2RlbFwiXSwgcm9vdFtcImJhY29uLmpxdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMxOWU2ZDg4OGVjZWZhMzU1OTA2XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJ2JsdWViaXJkJywgJy4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcycsICd0aHJlZS1qcycsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBQLCBCYWNvbiwgVEhSRUUsIFRXRUVOKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aHJlZS1kLWF1dG8tY29udHJvbHMnLFxuXHRcdHJlcXVpcmVzOiBbJ3RocmVlLWQnXVxuXHR9KTtcblxuXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuYW5pbWF0ZUNhbWVyYVRvJywgZnVuY3Rpb24gKGNvb3JkaW5hdGVzT3JUaWxlSWQpIHtcblxuXHRcdHJldHVybiAodHlwZW9mIGNvb3JkaW5hdGVzT3JUaWxlSWQgPT09ICdzdHJpbmcnID8gdGhpcy50aWxlKGNvb3JkaW5hdGVzT3JUaWxlSWQpLnRoZW4oKHRpbGUpID0+IHtcblx0XHRcdHZhciBwb3MgPSB0aWxlLnBvc2l0aW9uO1xuXHRcdFx0dmFyIHNpemUgPSB0aWxlLnNpemU7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR4OiBwb3MubGVmdCArIHNpemUud2lkdGggLyAyIC0gdGhpcy5zaXplLndpZHRoIC8gMixcblx0XHRcdFx0eTogLXBvcy50b3AgLSBzaXplLmhlaWdodCAvIDIgKyB0aGlzLnNpemUuaGVpZ2h0IC8gMlxuXHRcdFx0fTtcblx0XHR9KSA6IFAucmVzb2x2ZShjb29yZGluYXRlc09yVGlsZUlkKSkudGhlbigoY29vcmRzKSA9PiB7XG5cblx0XHRcdHZhciBpbml0aWFsWiA9IHRoaXMuY2FtZXJhM0QucG9zaXRpb24uejtcblxuXHRcdFx0dmFyIHR3ZWVuWFkgPSBCYWNvbi50d2Vlbih0aGlzLmNhbWVyYTNELnBvc2l0aW9uLCBjb29yZHMsIHsgZHVyYXRpb246IDgwMCwgZWFzaW5nOiBUV0VFTi5FYXNpbmcuU2ludXNvaWRhbC5PdXQgfSk7XG5cdFx0XHR2YXIgdHdlZW5aID0gQmFjb24udHdlZW4odGhpcy5jYW1lcmEzRC5wb3NpdGlvbiwgeyB6OiAxLjUgKiBpbml0aWFsWiB9LCB7IGR1cmF0aW9uOiA2MDAsIGVhc2luZzogVFdFRU4uRWFzaW5nLlNpbnVzb2lkYWwuT3V0IH0pXG5cdFx0XHRcdFx0LmNoYWluKEJhY29uLnR3ZWVuKHRoaXMuY2FtZXJhM0QucG9zaXRpb24sIHsgejogaW5pdGlhbFogfSwgeyBkdXJhdGlvbjogMjAwLCBlYXNpbmc6IFRXRUVOLkVhc2luZy5TaW51c29pZGFsLkluIH0pKTtcblxuXHRcdFx0dmFyIGFuaW1hdGlvbiA9IEJhY29uLm1lcmdlQWxsKFtcblx0XHRcdFx0dHdlZW5aLnN0YXJ0KCksXG5cdFx0XHRcdHR3ZWVuWFkuc3RhcnQoKVxuXHRcdFx0XSk7XG5cblx0XHRcdGFuaW1hdGlvbi5vblZhbHVlKCh7eCwgeX0pID0+IHtcblx0XHRcdFx0dGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQueCA9IHg7XG5cdFx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0LnkgPSB5O1xuXHRcdFx0XHR0aGlzLmNhbWVyYTNELmxvb2tBdCh0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGFuaW1hdGlvbjtcblxuXHRcdH0pO1xuXG5cdH0pLmFwcGVuZCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5vbigndGhyZWVETW9kZScsIHRydWUpLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHR0aGlzLm9uKCczZC1yZW5kZXInKS5hc3NpZ24oVFdFRU4sICd1cGRhdGUnKTtcblxuXHRcdH0pO1xuXHR9KTtcblxuXG5cdHBsdWdpbi5pbnNlcnQoJ1NuYXBzaG90LnByb3RvdHlwZS50YWtlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jYW1lcmEzRCkge1xuXHRcdFx0dGhpcy5vYmplY3QuY2FtZXJhM0QgPSB7XG5cdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0eDogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0QucG9zaXRpb24ueCxcblx0XHRcdFx0XHR5OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC5wb3NpdGlvbi55LFxuXHRcdFx0XHRcdHo6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnBvc2l0aW9uLnpcblx0XHRcdFx0fSxcblx0XHRcdFx0cm90YXRpb246IHtcblx0XHRcdFx0XHR4OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC5yb3RhdGlvbi54LFxuXHRcdFx0XHRcdHk6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnJvdGF0aW9uLnksXG5cdFx0XHRcdFx0ejogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0Qucm90YXRpb24uelxuXHRcdFx0XHR9LFxuXHRcdFx0XHR1cDoge1xuXHRcdFx0XHRcdHg6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVwLngsXG5cdFx0XHRcdFx0eTogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0QudXAueSxcblx0XHRcdFx0XHR6OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC51cC56XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRhcmdldDoge1xuXHRcdFx0XHRcdHg6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldC54LFxuXHRcdFx0XHRcdHk6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldC55LFxuXHRcdFx0XHRcdHo6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldC56XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdH0pLmluc2VydCgnU25hcHNob3QucHJvdG90eXBlLnJlc3RvcmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgZWFzaW5nID0geyBkdXJhdGlvbjogODAwLCBlYXNpbmc6IFRXRUVOLkVhc2luZy5TaW51c29pZGFsLkluT3V0IH07XG5cblx0XHR2YXIgdHdlZW5Qb3NpdGlvbiA9IEJhY29uLnR3ZWVuKHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnBvc2l0aW9uLCAgICAgICAgdGhpcy5vYmplY3QuY2FtZXJhM0QucG9zaXRpb24sIGVhc2luZyk7XG5cdFx0dmFyIHR3ZWVuUm90YXRpb24gPSBCYWNvbi50d2Vlbih0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC5yb3RhdGlvbiwgICAgICAgIHRoaXMub2JqZWN0LmNhbWVyYTNELnJvdGF0aW9uLCBlYXNpbmcpO1xuXHRcdHZhciB0d2VlblVwICAgICAgID0gQmFjb24udHdlZW4odGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0QudXAsICAgICAgICAgICAgICB0aGlzLm9iamVjdC5jYW1lcmEzRC51cCwgICAgICAgZWFzaW5nKTtcblx0XHR2YXIgdHdlZW5UYXJnZXQgICA9IEJhY29uLnR3ZWVuKHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCwgdGhpcy5vYmplY3QuY2FtZXJhM0QudGFyZ2V0LCAgIGVhc2luZyk7XG5cblx0XHRyZXR1cm4gQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0dHdlZW5Qb3NpdGlvbi5zdGFydCgpLFxuXHRcdFx0dHdlZW5Sb3RhdGlvbi5zdGFydCgpLFxuXHRcdFx0dHdlZW5VcC5zdGFydCgpLFxuXHRcdFx0dHdlZW5UYXJnZXQuc3RhcnQoKVxuXHRcdF0pO1xuXG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcC10aHJlZS1kLWF1dG8tY29udHJvbHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdiYWNvbmpzJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEJhY29uLCBUV0VFTikge1xuXG5cdHJlcXVpcmUoJ2JhY29uLm1vZGVsJyk7XG5cdHJlcXVpcmUoJ2JhY29uLmpxdWVyeScpO1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRCYWNvbi5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgKHYpID0+IHsgc2luayhuZXcgQmFjb24uTmV4dCh2KSkgfSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBvYmoub24oZXZlbnROYW1lLCBudWxsKSB9O1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG5cdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG5cdFx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG5cdFx0XHQoKGYpID0+IHsgd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSB9KTtcblx0QmFjb24uYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cblx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0dmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0KGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHNpbmsoKSA9PT0gQmFjb24ubm9Nb3JlKSB7IHN1YnNjcmliZWQgPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKHN1YnNjcmliZWQpIHsgaXRlcmF0aW9uRm4oKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0LyogdW5zdWJzY3JpYmUgZnVuY3Rpb24gKi9cblx0XHRcdHJldHVybiAoKSA9PiB7IHN1YnNjcmliZWQgPSBmYWxzZSB9O1xuXG5cdFx0fSk7XG5cdH07XG5cblxuXHRCYWNvbi50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ30pIHtcblxuXHRcdC8qIHRoZSB0d2VlbiAqL1xuXHRcdHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG5cblx0XHQvKiB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0dmFyIGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IHNpbmsobmV3IEJhY29uLk5leHQoKCkgPT4gdGhpcykpIH0pO1xuXHRcdFx0dHcub25Db21wbGV0ZSgoKSA9PiB7IHNpbmsobmV3IEJhY29uLkVuZCgpKSB9KTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEJhY29uLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Y29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Y29kZSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEJhY29uLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIG9wZW4gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlcih3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoaGFuZGxlciwgKCkgPT4ge1xuXHRcdFx0b3Blbi5wdXNoKCk7XG5cdFx0XHR3YW50ZWRCdXMucHVzaChmYWxzZSk7XG5cdFx0XHRjbG9zZS5wdXNoKCk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcCh0cnVlKSk7XG5cdFx0XHRyZXR1cm4gY2xvc2Uuc3RhcnRXaXRoKHRydWUpLmZsYXRNYXBMYXRlc3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgYWNjdW11bGF0b3IgPSAoYXJyLCB2YWwpID0+IChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcblx0XHRcdFx0cmV0dXJuIHN0cmVhbS50YWtlVW50aWwob3BlbikucmVkdWNlKFtdLCBhY2N1bXVsYXRvcikuZmxhdE1hcChCYWNvbi5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHR2YXIgYnVmZmVyID0gW107XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSB0aGlzLm9uVmFsdWUoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGJ1ZmZlci5wdXNoKG5ldyBCYWNvbi5OZXh0KCgpID0+IHZhbHVlKSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdHNpbmsob2xkQnVmZmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvVGhpcygpO1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG5cdFx0XHRcdGJ1ZmZlciA9IG51bGw7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFRoaXMgZmlsdGVycyBhbiBvYnNlcnZhYmxlIHRvIG9ubHkgbGV0IHRocm91Z2ggdmFsdWVzIGVxdWFsIHRvIHRoZSBnaXZlbiB2YWx1ZS5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbXBhcmF0b3IpIHtcblx0XHRjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGUpID0+IGUgPT09IHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcblx0fTtcblxuXHQvLyBUaGlzIG1ha2VzIGEgc3Vic2NyaXB0aW9uIHRvIGFuIG9ic2VydmFibGUgdGhhdCBkb2Vzbid0IGRvIGFueXRoaW5nXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdWJzY3JpYmUoKCk9Pnt9KTtcblx0fTtcblxuXHQvLyBUaGlzIGlzIGEgJ3NtYXJ0JyAuc3RvcFByb3BhZ2F0aW9uLCBtYXJraW5nIGV2ZW50cyB3aXRoIGEgbGFiZWxcblx0Ly8gYW5kIHNraXBwaW5nIHRob3NlIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgbGFiZWwuXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAobGFiZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGV2ZW50KSA9PiB7XG5cdFx0XHRyZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcblx0XHR9KS5tYXAoKGV2ZW50KSA9PiB7XG5cdFx0XHRVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF0gPSB0cnVlO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIEZpbHRlciBldmVudHMgdG8gb25seSBjZXJ0YWluIGtleXMgLyBidXR0b25zLiBDYW4gYmUgYSBwcmVkaWNhdGUgZnVuY3Rpb24gb3Igc2luZ2xlIG51bWJlci5cblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24gKGJ1dHRvbklkKSB7XG5cdFx0dmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoYiA9PiBiID09PSBidXR0b25JZCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKGUgPT4gcHJlZChlLndoaWNoKSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdCQuZm4ubW91c2VEcmFnID0gZnVuY3Rpb24gbW91c2VEcmFnKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHRzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4geyAvLyBUT0RPOiBkb24ndCB1c2UgJ2ZpbHRlcicsIGJ1dCBzb21ldGhpbmcgbGlrZSAnc2tpcFVudGlsJyBvciAnZmxhdE1hcCdcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyZWFtXG5cdFx0XHRcdFx0LnRha2VVbnRpbCgkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykpXG5cdFx0XHRcdFx0Lm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5mbi5tb3VzZUNsaWNrID0gZnVuY3Rpb24gbW91c2VDbGljayh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHR1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHtcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsKHVudGlsU3RyZWFtKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEJhY29uO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9iYWNvbi1hbmQtZWdncy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24ubW9kZWxcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhY29uLmpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLWF1dG8tY29udHJvbHMuanMifQ==