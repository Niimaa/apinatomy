(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, THREE, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-manual-controls',
	    requires: ['three-d']
	  });
	  var MOUSE_BUTTON = {
	    LEFT: 1,
	    MIDDLE: 2,
	    RIGHT: 3
	  };
	  plugin.append('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('threeDManualControlsEnabled', {initial: true});
	    this.newEvent('three-d-manual-controls-used');
	    this.on('threeDMode').value(true).onValue((function() {
	      var somethingChanged = false;
	      $__0._screen = {};
	      $__0.on('threeDCanvasSize').onValue((function(size) {
	        $__0._screen.width = size.width;
	        $__0._screen.height = size.height;
	        $__0._screen.left = parseFloat($__0.threeDCanvasElement.css('left'));
	        $__0._screen.top = parseFloat($__0.threeDCanvasElement.css('top'));
	      }));
	      $__0.getMouseOnScreen = (function(pageX, pageY) {
	        return new THREE.Vector2((pageX - $__0._screen.left) / $__0._screen.width, (pageY - $__0._screen.top) / $__0._screen.height);
	      });
	      $__0.threeDCanvasElement.asKefirStream('contextmenu').onValue((function(event) {
	        event.preventDefault();
	      }));
	      var dragging = $__0.threeDCanvasElement.mouseDrag({threshold: $__0.options.dragThreshold}).filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var keydown = $(window).asKefirStream('keydown').filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var keyup = $(window).asKefirStream('keyup');
	      var scrolling = $__0.threeDCanvasElement.mouseWheel().filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var button = (function(b) {
	        return (function($__1) {
	          var mouseDownEvent = $__1.mouseDownEvent;
	          return (mouseDownEvent.which === b);
	        });
	      });
	      var key = (function(from, to) {
	        return (function(event) {
	          return (event.which >= from && event.which <= (to || from));
	        });
	      });
	      $__0._rotateStart = new THREE.Vector3();
	      $__0._rotateEnd = new THREE.Vector3();
	      dragging.filter(button(MOUSE_BUTTON.LEFT)).onValue((function($__1) {
	        var $__2 = $__1,
	            mouseDownEvent = $__2.mouseDownEvent,
	            mouseMoveEvent = $__2.mouseMoveEvent;
	        somethingChanged = true;
	        if (!mouseDownEvent._pastFirst) {
	          mouseDownEvent._pastFirst = true;
	          $__0._rotateStart.copy($__0.getMouseProjectionOnBall(mouseDownEvent.pageX, mouseDownEvent.pageY));
	        }
	        $__0._rotateEnd.copy($__0.getMouseProjectionOnBall(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
	      }));
	      $__0.newProperty('currentArrowKey', {initial: false}).plug(keydown.filter(key(37, 40)).flatMapLatest((function(keydownEvent) {
	        return Kefir.merge([Kefir.once(keydownEvent.which), keyup.filter(key(keydownEvent.which)).mapTo(false).take(1)]);
	      })));
	      $__0.on('currentArrowKey').onValue((function() {
	        somethingChanged = true;
	      }));
	      $__0._zoomStart = new THREE.Vector2();
	      $__0._zoomEnd = new THREE.Vector2();
	      dragging.filter(button(MOUSE_BUTTON.MIDDLE)).onValue((function($__1) {
	        var $__2 = $__1,
	            mouseDownEvent = $__2.mouseDownEvent,
	            mouseMoveEvent = $__2.mouseMoveEvent;
	        somethingChanged = true;
	        if (!mouseDownEvent._pastFirst) {
	          mouseDownEvent._pastFirst = true;
	          $__0._zoomStart.copy($__0.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
	        }
	        $__0._zoomEnd.copy($__0.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
	      }));
	      scrolling.onValue((function(event) {
	        somethingChanged = true;
	        event.preventDefault();
	        event.stopPropagation();
	        event = event.originalEvent;
	        var diff = 0;
	        if (event.wheelDelta) {
	          diff = event.wheelDelta / 40;
	        } else if (event.detail) {
	          diff = -event.detail / 3;
	        }
	        $__0._zoomStart.y += diff * 0.01;
	      }));
	      $__0._panStart = new THREE.Vector2();
	      $__0._panEnd = new THREE.Vector2();
	      dragging.filter(button(MOUSE_BUTTON.RIGHT)).onValue((function($__1) {
	        var $__2 = $__1,
	            mouseDownEvent = $__2.mouseDownEvent,
	            mouseMoveEvent = $__2.mouseMoveEvent;
	        somethingChanged = true;
	        if (!mouseDownEvent._pastFirst) {
	          mouseDownEvent._pastFirst = true;
	          $__0._panStart.copy($__0.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
	        }
	        $__0._panEnd.copy($__0.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
	      }));
	      $__0._eye = new THREE.Vector3();
	      $__0._panSpeed = 1.0;
	      $__0._rotateSpeed = 1.0;
	      $__0.zoomSpeed = 1.0;
	      $__0.on('3d-render').takeWhileBy($__0.p('threeDMode')).onValue((function() {
	        if (somethingChanged || $__0.currentArrowKey) {
	          somethingChanged = false;
	          $__0.event('three-d-manual-controls-used').emit();
	          $__0._eye.subVectors($__0.camera3D.position, $__0.camera3D.userData.target);
	          ((function() {
	            var mouseChange = new THREE.Vector2();
	            var objectUp = new THREE.Vector3();
	            var pan = new THREE.Vector3();
	            mouseChange.copy($__0._panEnd).sub($__0._panStart);
	            if (mouseChange.lengthSq()) {
	              mouseChange.multiplyScalar($__0._eye.length() * $__0._panSpeed);
	              pan.copy($__0._eye);
	              pan.cross($__0.camera3D.up);
	              pan.setLength(mouseChange.x);
	              pan.add(objectUp.copy($__0.camera3D.up).setLength(mouseChange.y));
	              $__0.camera3D.position.add(pan);
	              if (!$__0.camera3D.userData.semanticTarget) {
	                $__0.camera3D.userData.target.add(pan);
	              }
	              $__0._panStart.copy($__0._panEnd);
	            }
	          }))();
	          ((function() {
	            var axis = new THREE.Vector3();
	            var quaternion = new THREE.Quaternion();
	            var angle = Math.acos($__0._rotateStart.dot($__0._rotateEnd) / $__0._rotateStart.length() / $__0._rotateEnd.length());
	            if (angle) {
	              axis.crossVectors($__0._rotateStart, $__0._rotateEnd).normalize();
	              angle *= $__0._rotateSpeed;
	              quaternion.setFromAxisAngle(axis, -angle);
	              $__0._eye.applyQuaternion(quaternion);
	              $__0.camera3D.up.applyQuaternion(quaternion);
	              $__0._rotateEnd.applyQuaternion(quaternion);
	              $__0._rotateStart.copy($__0._rotateEnd);
	            }
	          }))();
	          ((function() {
	            if ($__0.currentArrowKey) {
	              var quaternion = new THREE.Quaternion();
	              var axis = new THREE.Vector3(+($__0.currentArrowKey === 38 || $__0.currentArrowKey === 40), +($__0.currentArrowKey === 37 || $__0.currentArrowKey === 39));
	              var angle = 0.015 * Math.PI * $__0._rotateSpeed;
	              if ($__0.currentArrowKey === 39 || $__0.currentArrowKey === 40) {
	                angle *= -1;
	              }
	              quaternion.setFromAxisAngle(axis, -angle);
	              $__0._eye.applyQuaternion(quaternion);
	              $__0.camera3D.up.applyQuaternion(quaternion);
	            }
	          }))();
	          ((function() {
	            var factor = 1.0 + ($__0._zoomEnd.y - $__0._zoomStart.y) * $__0.zoomSpeed;
	            if (factor !== 1.0 && factor > 0.0) {
	              $__0._eye.multiplyScalar(factor);
	              $__0._zoomStart.copy($__0._zoomEnd);
	            }
	          }))();
	          $__0.camera3D.position.addVectors($__0.camera3D.userData.target, $__0._eye);
	        }
	        $__0.camera3D.lookAt($__0.camera3D.userData.target);
	      }));
	    }));
	  });
	  plugin.add('Circuitboard.prototype.getMouseProjectionOnBall', function getMouseProjectionOnBall(pageX, pageY) {
	    var vector = new THREE.Vector3();
	    var objectUp = new THREE.Vector3();
	    var mouseOnBall = new THREE.Vector3();
	    mouseOnBall.set((pageX - this._screen.width * 0.5 - this._screen.left) / (this._screen.width * 0.5), (this._screen.height * 0.5 + this._screen.top - pageY) / (this._screen.height * 0.5), 0.0);
	    var length = mouseOnBall.length();
	    if (length > 1.0) {
	      mouseOnBall.normalize();
	    } else {
	      mouseOnBall.z = Math.sqrt(1.0 - length * length);
	    }
	    this._eye.copy(this.camera3D.position).sub(this.camera3D.userData.target);
	    vector.copy(this.camera3D.up).setLength(mouseOnBall.y);
	    vector.add(objectUp.copy(this.camera3D.up).cross(this._eye).setLength(mouseOnBall.x));
	    vector.add(this._eye.setLength(mouseOnBall.z));
	    return vector;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
	  __webpack_require__(8).init(Kefir, $);
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMzdiOGRhYzZiMjc1MDA0YTgxMiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLW1hbnVhbC1jb250cm9scy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVu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Z0JBQUMsRUFBSSxlQUFhLE1BQU0sRUFBSSxlQUFhLE1BQU0sQ0FBQztBQUNoRCxnQkFBQyxFQUFJLGVBQWEsTUFBTSxFQUFJLGVBQWEsTUFBTSxDQUFDO0FBQ3BELGNBQUksRUFBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxFQUFJLFVBQVEsRUFBSSxVQUFRLENBQUc7QUFBRSxrQkFBTyxRQUFNLEVBQUksS0FBRztXQUFFO0FBQ3ZFLGdCQUFPLE1BQUksQ0FBQztTQUNiLEVBQUMsQ0FBQztPQUNIO0FBQ0EsWUFBTyxFQUFDLENBQUMsUUFBTyxDQUFDLGNBQWUsQ0FBQyxTQUFRLENBQUMsS0FBTSxDQUFDLEVBQUMsWUFBYSxDQUFDLFdBQVUsQ0FBQyxDQUFDO0tBQzdFLEVBQUMsQ0FBQztHQUNILENBQUM7QUFHRCxNQUFHLFdBQVcsRUFBSSxTQUFTLFdBQVMsQ0FBRSxDQUFFO0FBQ3ZDLFVBQU8sRUFBQyxDQUFDLElBQUcsQ0FBQyxjQUFlLENBQUMsMkJBQTBCLENBQUMsQ0FBQztHQUMxRCxDQUFDO0FBR0QsUUFBTyxNQUFJLENBQUM7QUFHYixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7O0FDcFFBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImJsdWViaXJkXCIsIFwia2VmaXJcIiwgXCJ0d2VlbmpzXCIsIFwia2VmaXItanF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXItanF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJrZWZpci1qcXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQzN2I4ZGFjNmIyNzUwMDRhODEyXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJ3RocmVlLWpzJywgJy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbiAoJCwgVSwgVEhSRUUsIEtlZmlyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aHJlZS1kLW1hbnVhbC1jb250cm9scycsXG5cdFx0cmVxdWlyZXM6IFsndGhyZWUtZCddXG5cdH0pO1xuXG5cblx0LyogY29uc3RhbnRzICovXG5cdC8vdmFyIEVQUyA9IDAuMDAwMDAxO1xuXHQvL3ZhciBTVEFURSA9IHsgTk9ORTogLTEsIFJPVEFURTogMCwgWk9PTTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX1pPT01fUEFOOiA0IH07XG5cdHZhciBNT1VTRV9CVVRUT04gPSB7IExFRlQ6IDEsIE1JRERMRTogMiwgUklHSFQ6IDMgfTtcblxuXG5cdHBsdWdpbi5hcHBlbmQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogdGhlICd0aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQnIHByb3BlcnR5ICovXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgndGhyZWVETWFudWFsQ29udHJvbHNFbmFibGVkJywgeyBpbml0aWFsOiB0cnVlIH0pO1xuXG5cdFx0LyogdGhlICd0aHJlZS1kLW1hbnVhbC1jb250cm9scy11c2VkJyBldmVudCAqL1xuXHRcdHRoaXMubmV3RXZlbnQoJ3RocmVlLWQtbWFudWFsLWNvbnRyb2xzLXVzZWQnKTtcblxuXHRcdHRoaXMub24oJ3RocmVlRE1vZGUnKS52YWx1ZSh0cnVlKS5vblZhbHVlKCgpID0+IHtcblxuXG5cdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXG5cblx0XHRcdC8qIHNjcmVlbiBwb3NpdGlvbiBhbmQgc2l6ZSAqLy8vIFRPRE86IHJlZmFjdG9yIC0gY3V0IG91dCB0aGUgbWlkZGxlbWFuXG5cdFx0XHR0aGlzLl9zY3JlZW4gPSB7fTtcblx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS5vblZhbHVlKChzaXplKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IHNpemUud2lkdGg7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSBzaXplLmhlaWdodDtcblx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSBwYXJzZUZsb2F0KHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5jc3MoJ2xlZnQnKSk7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgID0gcGFyc2VGbG9hdCh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuY3NzKCd0b3AnKSk7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuZ2V0TW91c2VPblNjcmVlbiA9IChwYWdlWCwgcGFnZVkpID0+IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKFxuXHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvIHRoaXMuX3NjcmVlbi53aWR0aCxcblx0XHRcdFx0XHQocGFnZVkgLSB0aGlzLl9zY3JlZW4udG9wKSAvIHRoaXMuX3NjcmVlbi5oZWlnaHRcblx0XHRcdFx0KTtcblx0XHRcdH07XG5cblxuXHRcdFx0LyogY3JlYXRpbmcgdmFyaW91cyBldmVudCBzdHJlYW1zICovXG5cdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuYXNLZWZpclN0cmVhbSgnY29udGV4dG1lbnUnKS5vblZhbHVlKChldmVudCkgPT4geyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIH0pO1xuXHRcdFx0dmFyIGRyYWdnaW5nID0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm1vdXNlRHJhZyh7IHRocmVzaG9sZDogdGhpcy5vcHRpb25zLmRyYWdUaHJlc2hvbGQgfSkuZmlsdGVyKCgpID0+IHRoaXMudGhyZWVETWFudWFsQ29udHJvbHNFbmFibGVkKTtcblx0XHRcdHZhciBrZXlkb3duID0gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleWRvd24nKS5maWx0ZXIoKCkgPT4gdGhpcy50aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQpO1xuXHRcdFx0dmFyIGtleXVwID0gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXVwJyk7XG5cdFx0XHR2YXIgc2Nyb2xsaW5nID0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm1vdXNlV2hlZWwoKS5maWx0ZXIoKCkgPT4gdGhpcy50aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQpO1xuXHRcdFx0dmFyIGJ1dHRvbiA9IChiKSA9PiAoe21vdXNlRG93bkV2ZW50fSkgPT4gKG1vdXNlRG93bkV2ZW50LndoaWNoID09PSBiKTtcblx0XHRcdHZhciBrZXkgPSAoZnJvbSwgdG8pID0+IChldmVudCkgPT4gKGV2ZW50LndoaWNoID49IGZyb20gJiYgZXZlbnQud2hpY2ggPD0gKHRvIHx8IGZyb20pKTtcblxuXG5cdFx0XHQvKiByb3RhdGluZyB3aXRoIHRoZSBsZWZ0IG1vdXNlIGJ1dHRvbiAqL1xuXHRcdFx0dGhpcy5fcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0dGhpcy5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGRyYWdnaW5nLmZpbHRlcihidXR0b24oTU9VU0VfQlVUVE9OLkxFRlQpKS5vblZhbHVlKCh7bW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50fSkgPT4geyAvLyBUT0RPOiB0b3VjaFxuXG5cdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmICghbW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCkge1xuXHRcdFx0XHRcdG1vdXNlRG93bkV2ZW50Ll9wYXN0Rmlyc3QgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwobW91c2VEb3duRXZlbnQucGFnZVgsIG1vdXNlRG93bkV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwobW91c2VNb3ZlRXZlbnQucGFnZVgsIG1vdXNlTW92ZUV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiByb3RhdGluZyB3aXRoIHRoZSBrZXlib2FyZCAqL1xuXHRcdFx0dGhpcy5uZXdQcm9wZXJ0eSgnY3VycmVudEFycm93S2V5Jywge1xuXHRcdFx0XHRpbml0aWFsOiBmYWxzZVxuXHRcdFx0fSkucGx1ZyhrZXlkb3duLmZpbHRlcihrZXkoMzcsIDQwKSkuZmxhdE1hcExhdGVzdCgoa2V5ZG93bkV2ZW50KSA9PiBLZWZpci5tZXJnZShbXG5cdFx0XHRcdEtlZmlyLm9uY2Uoa2V5ZG93bkV2ZW50LndoaWNoKSxcblx0XHRcdFx0a2V5dXAuZmlsdGVyKGtleShrZXlkb3duRXZlbnQud2hpY2gpKS5tYXBUbyhmYWxzZSkudGFrZSgxKVxuXHRcdFx0XSkpKTtcblx0XHRcdHRoaXMub24oJ2N1cnJlbnRBcnJvd0tleScpLm9uVmFsdWUoKCkgPT4geyBzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZSB9KTtcblxuXG5cdFx0XHQvKiB6b29taW5nIHdpdGggdGhlIG1pZGRsZSBtb3VzZSBidXR0b24gKi9cblx0XHRcdHRoaXMuX3pvb21TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHR0aGlzLl96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdGRyYWdnaW5nLmZpbHRlcihidXR0b24oTU9VU0VfQlVUVE9OLk1JRERMRSkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7XG5cblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlRG93bkV2ZW50LnBhZ2VYLCBtb3VzZURvd25FdmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3pvb21FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4obW91c2VNb3ZlRXZlbnQucGFnZVgsIG1vdXNlTW92ZUV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0pO1xuXHRcdFx0Lyogem9vbWluZyB3aXRoIHRoZSBzY3JvbGwtd2hlZWwgKi9cblx0XHRcdHNjcm9sbGluZy5vblZhbHVlKChldmVudCkgPT4ge1xuXG5cdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudDtcblxuXHRcdFx0XHR2YXIgZGlmZiA9IDA7XG5cblx0XHRcdFx0aWYgKGV2ZW50LndoZWVsRGVsdGEpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cdFx0XHRcdFx0ZGlmZiA9IGV2ZW50LndoZWVsRGVsdGEgLyA0MDtcblx0XHRcdFx0fSBlbHNlIGlmIChldmVudC5kZXRhaWwpIHsgLy8gRmlyZWZveFxuXHRcdFx0XHRcdGRpZmYgPSAtZXZlbnQuZGV0YWlsIC8gMztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3pvb21TdGFydC55ICs9IGRpZmYgKiAwLjAxO1xuXG5cdFx0XHR9KTtcblxuXG5cblxuXHRcdFx0LyogcGFubmluZyB3aXRoIHRoZSByaWdodCBtb3VzZSBidXR0b24gKi9cblx0XHRcdHRoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdHRoaXMuX3BhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRkcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5SSUdIVCkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7XG5cblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4obW91c2VEb3duRXZlbnQucGFnZVgsIG1vdXNlRG93bkV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlTW92ZUV2ZW50LnBhZ2VYLCBtb3VzZU1vdmVFdmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvKiB1cGRhdGluZyBhbGwgdGhlIHN0dWZmICovXG5cdFx0XHR0aGlzLl9leWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0dGhpcy5fcGFuU3BlZWQgPSAxLjA7XG5cdFx0XHR0aGlzLl9yb3RhdGVTcGVlZCA9IDEuMDtcblx0XHRcdHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXHRcdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlQnkodGhpcy5wKCd0aHJlZURNb2RlJykpLm9uVmFsdWUoKCkgPT4geyAvLyBUT0RPOiB0aGlzIGRvZXNuJ3QgcmVhY3RpdmF0ZSB3aGVuIHRocmVlRE1vZGUgaXMgdHVybmVkIG9mZiBhbmQgdGhlbiBvbiBhZ2FpbiFcblxuXHRcdFx0XHRpZiAoc29tZXRoaW5nQ2hhbmdlZCB8fCB0aGlzLmN1cnJlbnRBcnJvd0tleSkge1xuXHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblxuXG5cdFx0XHRcdFx0LyogdHJpZ2dlciBldmVudCBmb3IgbWFudWFsIGNvbnRyb2xzIHVzZWQgKi9cblx0XHRcdFx0XHR0aGlzLmV2ZW50KCd0aHJlZS1kLW1hbnVhbC1jb250cm9scy11c2VkJykuZW1pdCgpO1xuXG5cblx0XHRcdFx0XHQvKiBzZXR1cCAqL1xuXHRcdFx0XHRcdHRoaXMuX2V5ZS5zdWJWZWN0b3JzKHRoaXMuY2FtZXJhM0QucG9zaXRpb24sIHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblxuXG5cdFx0XHRcdFx0LyogcGFubmluZyAqL1xuXHRcdFx0XHRcdCgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0dmFyIG1vdXNlQ2hhbmdlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0XHRcdFx0dmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdFx0XHRcdG1vdXNlQ2hhbmdlLmNvcHkodGhpcy5fcGFuRW5kKS5zdWIodGhpcy5fcGFuU3RhcnQpOyAvLyBUT0RPOiBqdXN0IHN0b3JlIHRoaXMgZGlyZWN0bHk/XG5cdFx0XHRcdFx0XHRcdGlmIChtb3VzZUNoYW5nZS5sZW5ndGhTcSgpKSB7XG5cdFx0XHRcdFx0XHRcdFx0bW91c2VDaGFuZ2UubXVsdGlwbHlTY2FsYXIodGhpcy5fZXllLmxlbmd0aCgpICogdGhpcy5fcGFuU3BlZWQpO1xuXHRcdFx0XHRcdFx0XHRcdHBhbi5jb3B5KHRoaXMuX2V5ZSk7XG5cdFx0XHRcdFx0XHRcdFx0cGFuLmNyb3NzKHRoaXMuY2FtZXJhM0QudXApO1xuXHRcdFx0XHRcdFx0XHRcdHBhbi5zZXRMZW5ndGgobW91c2VDaGFuZ2UueCk7XG5cdFx0XHRcdFx0XHRcdFx0cGFuLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuY2FtZXJhM0QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS55KSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi5hZGQocGFuKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuY2FtZXJhM0QudXNlckRhdGEuc2VtYW50aWNUYXJnZXQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0LmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuX3BhbkVuZCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0Lyogcm90YXRpbmcgYnkgbW91c2UgKi9cblx0XHRcdFx0XHQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHRcdFx0dmFyIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXHRcdFx0XHRcdFx0dmFyIGFuZ2xlID0gTWF0aC5hY29zKFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmRvdCh0aGlzLl9yb3RhdGVFbmQpIC9cblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5sZW5ndGgoKSAvXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmxlbmd0aCgpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKGFuZ2xlKSB7XG5cdFx0XHRcdFx0XHRcdGF4aXMuY3Jvc3NWZWN0b3JzKHRoaXMuX3JvdGF0ZVN0YXJ0LCB0aGlzLl9yb3RhdGVFbmQpLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdFx0XHRcdGFuZ2xlICo9IHRoaXMuX3JvdGF0ZVNwZWVkO1xuXG5cdFx0XHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdC8qIHJvdGF0aW5nIGJ5IGtleWJvYXJkICovXG5cdFx0XHRcdFx0KCgpID0+IHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmN1cnJlbnRBcnJvd0tleSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdFx0XHRcdFx0XHRcdHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoXG5cdFx0XHRcdFx0XHRcdFx0XHQrKHRoaXMuY3VycmVudEFycm93S2V5ID09PSAzOCB8fCB0aGlzLmN1cnJlbnRBcnJvd0tleSA9PT0gNDApLCAvLyB4XG5cdFx0XHRcdFx0XHRcdFx0XHQrKHRoaXMuY3VycmVudEFycm93S2V5ID09PSAzNyB8fCB0aGlzLmN1cnJlbnRBcnJvd0tleSA9PT0gMzkpICAvLyB5XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHZhciBhbmdsZSA9IDAuMDE1ICogTWF0aC5QSSAqIHRoaXMuX3JvdGF0ZVNwZWVkO1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5jdXJyZW50QXJyb3dLZXkgPT09IDM5IHx8IHRoaXMuY3VycmVudEFycm93S2V5ID09PSA0MCkgeyBhbmdsZSAqPSAtMSB9XG5cblx0XHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0Lyogem9vbWluZyAqL1xuXHRcdFx0XHRcdCgoKSA9PiB7XG5cdFx0XHRcdFx0XHQvL2lmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblx0XHRcdFx0XHRcdC8vXHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdFx0XHQvL1x0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCk7XG5cdFx0XHRcdFx0XHQvL30gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL31cblxuXHRcdFx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggdGhpcy5fem9vbUVuZC55IC0gdGhpcy5fem9vbVN0YXJ0LnkgKSAqIHRoaXMuem9vbVNwZWVkOyAvLyBzZXQgZmFjdG9yXG5cdFx0XHRcdFx0XHRpZiAoZmFjdG9yICE9PSAxLjAgJiYgZmFjdG9yID4gMC4wKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl96b29tU3RhcnQuY29weSh0aGlzLl96b29tRW5kKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0pKCk7XG5cblxuXG5cdFx0XHRcdFx0LyogYnJlYWtkb3duICovXG5cdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi5hZGRWZWN0b3JzKHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0LCB0aGlzLl9leWUpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNhbWVyYTNELmxvb2tBdCh0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cblxuXG5cblxuXHRcdFx0fSk7XG5cblxuXHRcdFx0Ly8vKiBwYW5uaW5nIHdpdGggdGhlIHJpZ2h0IG1vdXNlIGJ1dHRvbiAqL1xuXHRcdFx0Ly9kcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5SSUdIVCkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7XG5cdFx0XHQvL1xuXHRcdFx0Ly9cdGlmICghbW91c2VEb3duRXZlbnQuX2NhbWVyYVBvc2l0aW9uMCkge1xuXHRcdFx0Ly9cdFx0bW91c2VEb3duRXZlbnQuX2NhbWVyYVBvc2l0aW9uMCA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuY29weSh0aGlzLmNhbWVyYTNELnBvc2l0aW9uKTtcblx0XHRcdC8vXHR9XG5cdFx0XHQvL1xuXHRcdFx0Ly9cdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ueCA9IG1vdXNlRG93bkV2ZW50Ll9jYW1lcmFQb3NpdGlvbjAueCArIG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHQvL1x0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi55ID0gbW91c2VEb3duRXZlbnQuX2NhbWVyYVBvc2l0aW9uMC55ICsgbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdC8vXG5cdFx0XHQvL30pO1xuXG5cblxuXHRcdH0pO1xuXHR9KTtcblxuXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsJywgZnVuY3Rpb24gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKHBhZ2VYLCBwYWdlWSkge1xuXHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdG1vdXNlT25CYWxsLnNldChcblx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLndpZHRoICogMC41IC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gKHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSksXG5cdFx0XHRcdCh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41ICsgdGhpcy5fc2NyZWVuLnRvcCAtIHBhZ2VZKSAvICh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41KSxcblx0XHRcdFx0MC4wXG5cdFx0KTtcblxuXHRcdHZhciBsZW5ndGggPSBtb3VzZU9uQmFsbC5sZW5ndGgoKTtcblxuXHRcdGlmIChsZW5ndGggPiAxLjApIHtcblx0XHRcdG1vdXNlT25CYWxsLm5vcm1hbGl6ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZXllLmNvcHkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikuc3ViKHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblxuXHRcdHZlY3Rvci5jb3B5KHRoaXMuY2FtZXJhM0QudXApLnNldExlbmd0aChtb3VzZU9uQmFsbC55KTtcblx0XHR2ZWN0b3IuYWRkKG9iamVjdFVwLmNvcHkodGhpcy5jYW1lcmEzRC51cCkuY3Jvc3ModGhpcy5fZXllKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueCkpO1xuXHRcdHZlY3Rvci5hZGQodGhpcy5fZXllLnNldExlbmd0aChtb3VzZU9uQmFsbC56KSk7XG5cblx0XHRyZXR1cm4gdmVjdG9yO1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGhyZWUtZC1tYW51YWwtY29udHJvbHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBLZWZpciwgVFdFRU4pIHtcblxuXHQvKiBLZWZpciBqUXVlcnkgcGx1Z2luICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFx0cmVxdWlyZSgna2VmaXItanF1ZXJ5JykuaW5pdChLZWZpciwgJCk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRLZWZpci5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoKTtcblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBlbWl0dGVyLmVtaXQodGhpcykgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEtlZmlyLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Q29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNLZWZpclN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Q29kZSk7XG5cdH07XG5cblxuXHRLZWZpci5vbmNlID0gZnVuY3Rpb24gb25jZSh2YWx1ZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRlbWl0dGVyLmVtaXQodmFsdWUpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0XHQvL3JldHVybiBLZWZpci5jb25zdGFudCh2YWx1ZSk7IC8vIFRPRE86IHJlcGxhY2UgYWxsICdvbmNlJyBjYWxscyB3aXRoICdjb25zdGFudCcgY2FsbHM7IHRoZW4gcmVtb3ZlICdvbmNlJ1xuXHR9O1xuXG5cblx0S2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcblx0XHRcdGVtaXR0ZXIuZW5kKCk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBLZWZpci5idXMoKTtcblx0XHR2YXIgb3BlbiA9ICAgICAgS2VmaXIuYnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gICAgIEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRoYW5kbGVyKCgpID0+IHtcblx0XHRcdFx0b3Blbi5lbWl0KCk7XG5cdFx0XHRcdHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcblx0XHRcdFx0Y2xvc2UuZW1pdCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcblx0XHRcdHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2godmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkb05vdGhpbmcgPSAoKT0+e307XG5cdFx0dGhpcy5vblZhbHVlKGRvTm90aGluZyk7XG5cdFx0cmV0dXJuICgpID0+IHsgdGhpcy5vZmZWYWx1ZShkb05vdGhpbmcpIH07XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24gKGJ1dHRvbklkKSB7XG5cdFx0dmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoYiA9PiBiID09PSBidXR0b25JZCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChlKSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbEJ5KHVudGlsU3RyZWFtKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEtlZmlyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwia2VmaXItanF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQtbWFudWFsLWNvbnRyb2xzLmpzIn0=