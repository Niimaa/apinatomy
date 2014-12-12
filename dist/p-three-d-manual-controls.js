(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("bacon"), require("tweenjs"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "bacon", "tweenjs", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("bacon"), require("tweenjs"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["Bacon"], root["TWEEN"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, THREE, Bacon) {
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
	    this.on('threeDMode', true).onValue((function() {
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
	      $__0.threeDCanvasElement.asEventStream('contextmenu').onValue('.preventDefault');
	      var dragging = $__0.threeDCanvasElement.mouseDrag({threshold: 5}).filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var keydown = $(window).asEventStream('keydown').filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var keyup = $(window).asEventStream('keyup');
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
	      $__0.newProperty('currentArrowKey', {
	        source: keydown.filter(key(37, 40)).flatMapLatest((function(keydownEvent) {
	          return Bacon.mergeAll([Bacon.once(keydownEvent.which), keyup.filter(key(keydownEvent.which)).map(false).take(1)]);
	        })),
	        initial: false
	      });
	      $__0.on('currentArrowKey').onValue((function(v) {
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
	      $__0.on('3d-render').takeWhile($__0.on('threeDMode')).onValue((function() {
	        if (somethingChanged || $__0.currentArrowKey) {
	          somethingChanged = false;
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
	              $__0.camera3D.userData.target.add(pan);
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
	            var axis = new THREE.Vector3();
	            var quaternion = new THREE.Quaternion();
	            var angle = 0.015 * Math.PI;
	            if ($__0.currentArrowKey === 37) {
	              axis.setY(1);
	            } else if ($__0.currentArrowKey === 39) {
	              angle = -angle;
	              axis.setY(1);
	            } else if ($__0.currentArrowKey === 38) {
	              axis.setX(1);
	            } else if ($__0.currentArrowKey === 40) {
	              angle = -angle;
	              axis.setX(1);
	            } else {
	              angle = 0;
	            }
	            if (angle) {
	              axis.normalize();
	              angle *= $__0._rotateSpeed;
	              quaternion.setFromAxisAngle(axis, -angle);
	              $__0._eye.applyQuaternion(quaternion);
	              $__0.camera3D.up.applyQuaternion(quaternion);
	              $__0._rotateEnd.applyQuaternion(quaternion);
	              $__0._rotateStart.copy($__0._rotateEnd);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(7), !(function webpackMissingModule() { var e = new Error("Cannot find module \"Array.prototype.findIndex\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
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
	  Bacon.animationFrames = U.memoize(function animationFrames() {
	    var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	      return window.setTimeout(f, 1000 / 60);
	    }));
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
	  });
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
	  $.fn.mouseDrag = function mouseDrag($__1) {
	    var threshold = $__1.threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove').takeUntil($(document).asEventStream('mouseup'));
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
	      return stream.map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asEventStream('mousewheel DOMMouseScroll');
	  };
	  return Bacon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(9), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, DeltaModel, U) {
	  'use strict';
	  var EPS = 0.000001;
	  var STATE = {
	    NONE: -1,
	    ROTATE: 0,
	    ZOOM: 1,
	    PAN: 2,
	    TOUCH_ROTATE: 3,
	    TOUCH_ZOOM_PAN: 4
	  };
	  var CHANGE_EVENT = {type: 'change'};
	  var START_EVENT = {type: 'start'};
	  var END_EVENT = {type: 'end'};
	  var dm = new DeltaModel();
	  new dm.Delta('core', {if: true}).modify('TrackballControls.prototype').add('construct', function(controlledObject, domElement) {
	    this._controlledObject = controlledObject;
	    this._domElement = domElement;
	    this._scene = controlledObject.parent;
	  }).append('construct', function() {
	    this.enabled = true;
	  }).append('construct', function() {
	    var $__0 = this;
	    this._targetCoordinates = new THREE.Vector3();
	    this._velocity = new THREE.Vector3();
	    this._lastPosition = new THREE.Vector3();
	    this._state = STATE.NONE;
	    this._eye = new THREE.Vector3();
	    this._rotateStart = new THREE.Vector3();
	    this._rotateEnd = new THREE.Vector3();
	    this._zoomStart = new THREE.Vector2();
	    this._zoomEnd = new THREE.Vector2();
	    this._touchZoomDistanceStart = 0;
	    this._touchZoomDistanceEnd = 0;
	    this._panStart = new THREE.Vector2();
	    this._panEnd = new THREE.Vector2();
	    this._screen = {
	      left: 0,
	      top: 0,
	      width: 0,
	      height: 0
	    };
	    this._targetCoordinates0 = this._targetCoordinates.clone();
	    this._position0 = this._controlledObject.position.clone();
	    this._up0 = this._controlledObject.up.clone();
	    var newHelper = (function(name, obj, color) {
	      var geometry = new THREE.SphereGeometry(5, 64, 64);
	      var material = new THREE.MeshLambertMaterial({color: color});
	      var sphere = new THREE.Mesh(geometry, material);
	      $__0._scene.add(sphere);
	      return (function() {
	        sphere.position.copy(obj);
	      });
	    });
	    this._refreshHelper2 = newHelper('target', this._targetCoordinates, 0x00ff00);
	  }).add('reset', function() {
	    this._state = STATE.NONE;
	    this._targetCoordinates.copy(this._targetCoordinates0);
	    this._controlledObject.position.copy(this._position0);
	    this._controlledObject.up.copy(this._up0);
	    this._velocity.set(0, 0, 0);
	    this._eye.subVectors(this._controlledObject.position, this._targetCoordinates);
	    this._refreshHelper2();
	    this._controlledObject.lookAt(this._targetCoordinates);
	    this.dispatchEvent(CHANGE_EVENT);
	    this._lastPosition.copy(this._controlledObject.position);
	  }).add('update', function() {
	    var $__0 = this;
	    this._eye.subVectors(this._controlledObject.position, this._targetCoordinates);
	    this.rotateCamera();
	    this.zoomCamera();
	    this.panCamera();
	    this._controlledObject.position.addVectors(this._targetCoordinates, this._eye);
	    this._controlledObject.lookAt(this._targetCoordinates);
	    if (this._lastPosition.distanceToSquared(this._controlledObject.position) > EPS) {
	      this.dispatchEvent(CHANGE_EVENT);
	      this._lastPosition.copy(this._controlledObject.position);
	    }
	    this._refreshHelper2();
	    setTimeout((function() {
	      $__0._controlledObject.position.add($__0._velocity);
	      $__0._controlledObject.lookAt($__0._targetCoordinates);
	      $__0._lastPosition.copy($__0._controlledObject.position);
	      $__0._refreshHelper2();
	    }));
	  }).add('handleResize', function() {
	    if (this._domElement === document) {
	      this._screen.left = 0;
	      this._screen.top = 0;
	      this._screen.width = window.innerWidth;
	      this._screen.height = window.innerHeight;
	    } else {
	      var box = this._domElement.getBoundingClientRect();
	      var d = this._domElement.ownerDocument.documentElement;
	      this._screen.left = box.left + window.pageXOffset - d.clientLeft;
	      this._screen.top = box.top + window.pageYOffset - d.clientTop;
	      this._screen.width = box.width;
	      this._screen.height = box.height;
	    }
	  });
	  new dm.Delta('mouse-events', {
	    after: ['core'],
	    if: true
	  }).modify('TrackballControls.prototype').add('mousedown', function(event) {
	    var $__0 = this;
	    if (!this.enabled) {
	      return;
	    }
	    if (this._state === STATE.NONE) {
	      this._state = {
	        0: STATE.ROTATE,
	        1: STATE.ZOOM,
	        2: STATE.PAN
	      }[event.button];
	    }
	    var mousemove = (function(e) {
	      $__0.mousemove(e);
	    });
	    var mouseup = (function() {
	      if ($__0.enabled === false) {
	        return;
	      }
	      $__0._state = STATE.NONE;
	      document.removeEventListener('mousemove', mousemove);
	      document.removeEventListener('mouseup', mouseup);
	      $__0.dispatchEvent(END_EVENT);
	    });
	    document.addEventListener('mousemove', mousemove);
	    document.addEventListener('mouseup', mouseup);
	    this.dispatchEvent(START_EVENT);
	  }).add('mousemove', function() {
	    if (this.enabled === false) {
	      return;
	    }
	  }).add('touchstart', function(event) {
	    if (!this.enabled) {
	      return;
	    }
	    if (event.touches.length < 1 || event.touches.length > 2) {
	      this._state = STATE.NONE;
	    }
	    this.dispatchEvent(START_EVENT);
	  }).add('touchmove', function(event) {
	    if (!this.enabled) {
	      return;
	    }
	    if (event.touches.length < 1 || event.touches.length > 2) {
	      this._state = STATE.NONE;
	    }
	  }).add('touchend', function() {
	    if (!this.enabled) {
	      return;
	    }
	    this._state = STATE.NONE;
	    this.dispatchEvent(END_EVENT);
	  }).insert('construct', function() {
	    var vector = new THREE.Vector2();
	    this.getMouseOnScreen = function getMouseOnScreen(pageX, pageY) {
	      vector.set((pageX - this._screen.left) / this._screen.width, (pageY - this._screen.top) / this._screen.height);
	      return vector;
	    };
	  }).insert('construct', function() {
	    var vector = new THREE.Vector3();
	    var objectUp = new THREE.Vector3();
	    var mouseOnBall = new THREE.Vector3();
	    this.getMouseProjectionOnBall = function getMouseProjectionOnBall(pageX, pageY) {
	      mouseOnBall.set((pageX - this._screen.width * 0.5 - this._screen.left) / (this._screen.width * 0.5), (this._screen.height * 0.5 + this._screen.top - pageY) / (this._screen.height * 0.5), 0.0);
	      var length = mouseOnBall.length();
	      if (length > 1.0) {
	        mouseOnBall.normalize();
	      } else {
	        mouseOnBall.z = Math.sqrt(1.0 - length * length);
	      }
	      this._eye.copy(this._controlledObject.position).sub(this._targetCoordinates);
	      vector.copy(this._controlledObject.up).setLength(-mouseOnBall.y);
	      vector.add(objectUp.copy(this._controlledObject.up).cross(this._eye).setLength(mouseOnBall.x));
	      vector.add(this._eye.setLength(mouseOnBall.z));
	      return vector;
	    };
	  }).insert('construct', function() {
	    var $__0 = this;
	    this._domElement.addEventListener('contextmenu', (function(e) {
	      e.preventDefault();
	    }));
	    this._domElement.addEventListener('mousedown', (function(e) {
	      $__0.mousedown(e);
	    }));
	    this._domElement.addEventListener('touchstart', (function(e) {
	      $__0.touchstart(e);
	    }));
	    this._domElement.addEventListener('touchmove', (function(e) {
	      $__0.touchmove(e);
	    }));
	    this._domElement.addEventListener('touchend', (function(e) {
	      $__0.touchend(e);
	    }));
	  });
	  new dm.Delta('keyboard-events', {
	    after: ['core'],
	    if: true
	  }).modify('TrackballControls.prototype').add('keyboardVelocity', (function() {
	    return 10;
	  })).add('keydown', function(event) {
	    if (!this.enabled || this._state !== STATE.NONE) {
	      return;
	    }
	    var d = this.keyboardVelocity();
	    switch (event.keyCode) {
	      case 37:
	        {
	          this._velocity.x = d;
	        }
	        break;
	      case 38:
	        {
	          this._velocity.y = d;
	        }
	        break;
	      case 39:
	        {
	          this._velocity.x = -d;
	        }
	        break;
	      case 40:
	        {
	          this._velocity.y = -d;
	        }
	        break;
	    }
	  }).add('keyup', function(event) {
	    switch (event.keyCode) {
	      case 37:
	        {
	          this._velocity.x = 0;
	        }
	        break;
	      case 38:
	        {
	          this._velocity.y = 0;
	        }
	        break;
	      case 39:
	        {
	          this._velocity.x = 0;
	        }
	        break;
	      case 40:
	        {
	          this._velocity.y = 0;
	        }
	        break;
	    }
	  }).insert('construct', function() {
	    var $__0 = this;
	    $(window).on('keydown', (function(e) {
	      $__0.keydown(e);
	    }));
	    $(window).on('keyup', (function(e) {
	      $__0.keyup(e);
	    }));
	  });
	  new dm.Delta('rotate', {
	    after: ['core', 'mouse-events'],
	    if: true
	  }).modify('TrackballControls.prototype').append('mousedown', function(event) {
	    if (this._state === STATE.ROTATE) {
	      this._rotateStart.copy(this.getMouseProjectionOnBall(event.pageX, event.pageY));
	      this._rotateEnd.copy(this._rotateStart);
	    }
	  }).append('mousemove', function(event) {
	    if (this._state === STATE.ROTATE) {
	      this._rotateEnd.copy(this.getMouseProjectionOnBall(event.pageX, event.pageY));
	    }
	  }).append('touchstart', function(event) {
	    if (event.touches.length === 1) {
	      this._state = STATE.TOUCH_ROTATE;
	      this._rotateStart.copy(this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
	      this._rotateEnd.copy(this._rotateStart);
	    }
	  }).append('touchmove', function(event) {
	    if (event.touches.length === 1) {
	      this._rotateEnd.copy(this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
	    }
	  }).append('touchend', function() {
	    if (event.touches.length === 1) {
	      this._rotateEnd.copy(this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
	      this._rotateStart.copy(this._rotateEnd);
	    }
	  }).insert('construct', function() {
	    var axis = new THREE.Vector3();
	    var quaternion = new THREE.Quaternion();
	    this.rotateCamera = function rotateCamera() {
	      var angle = Math.acos(this._rotateStart.dot(this._rotateEnd) / this._rotateStart.length() / this._rotateEnd.length());
	      if (angle) {
	        axis.crossVectors(this._rotateStart, this._rotateEnd).normalize();
	        angle *= this.rotateSpeed;
	        quaternion.setFromAxisAngle(axis, -angle);
	        this._eye.applyQuaternion(quaternion);
	        this._controlledObject.up.applyQuaternion(quaternion);
	        this._rotateEnd.applyQuaternion(quaternion);
	        this._rotateStart.copy(this._rotateEnd);
	      }
	    };
	  }).insert('construct', function() {
	    this.rotateSpeed = 1.0;
	  });
	  new dm.Delta('zoom', {
	    after: ['mouse-events'],
	    if: true
	  }).modify('TrackballControls.prototype').append('mousedown', function(event) {
	    if (this._state === STATE.ZOOM) {
	      this._zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
	      this._zoomEnd.copy(this._zoomStart);
	    }
	  }).append('mousemove', function() {
	    if (this._state === STATE.ZOOM) {
	      this._zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
	    }
	  }).add('mousewheel', function(event) {
	    if (this.enabled === false) {
	      return;
	    }
	    event.preventDefault();
	    event.stopPropagation();
	    var diff = 0;
	    if (event.wheelDelta) {
	      diff = event.wheelDelta / 40;
	    } else if (event.detail) {
	      diff = -event.detail / 3;
	    }
	    this._zoomStart.y += diff * 0.01;
	    this.dispatchEvent(START_EVENT);
	    this.dispatchEvent(END_EVENT);
	  }).insert('construct', function() {
	    var $__0 = this;
	    this._domElement.addEventListener('mousewheel', (function(e) {
	      $__0.mousewheel(e);
	    }));
	    this._domElement.addEventListener('DOMMouseScroll', (function(e) {
	      $__0.mousewheel(e);
	    }));
	  }).add('zoomCamera', function() {
	    if (this._state === STATE.TOUCH_ZOOM_PAN) {
	      this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
	      this._eye.multiplyScalar(this._touchZoomDistanceStart / this._touchZoomDistanceEnd);
	    } else {
	      var factor = 1.0 + (this._zoomEnd.y - this._zoomStart.y) * this.zoomSpeed;
	      if (factor !== 1.0 && factor > 0.0) {
	        this._eye.multiplyScalar(factor);
	        this._zoomStart.copy(this._zoomEnd);
	      }
	    }
	  }).insert('construct', function() {
	    this.zoomSpeed = 1.2;
	  });
	  new dm.Delta('pan', {
	    after: ['core', 'mouse-events'],
	    if: true
	  }).modify('TrackballControls.prototype').append('mousedown', function(event) {
	    if (this._state === STATE.PAN) {
	      this._panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
	      this._panEnd.copy(this._panStart);
	    }
	  }).append('mousemove', function() {
	    if (this._state === STATE.PAN) {
	      this._panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
	    }
	  }).insert('construct', function() {
	    var mouseChange = new THREE.Vector2();
	    var objectUp = new THREE.Vector3();
	    var pan = new THREE.Vector3();
	    this.panCamera = function panCamera() {
	      mouseChange.copy(this._panEnd).sub(this._panStart);
	      if (mouseChange.lengthSq()) {
	        mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);
	        pan.copy(this._eye).cross(this._controlledObject.up).setLength(mouseChange.x);
	        pan.add(objectUp.copy(this._controlledObject.up).setLength(-mouseChange.y));
	        this._controlledObject.position.add(pan);
	        this._targetCoordinates.add(pan);
	        this._panStart.copy(this._panEnd);
	      }
	    };
	  }).insert('construct', function() {
	    this.panSpeed = 0.3;
	  });
	  new dm.Delta('zoom+pan', {
	    after: ['zoom', 'pan'],
	    if: true
	  }).modify('TrackballControls.prototype').append('touchstart', function(event) {
	    if (event.touches.length === 2) {
	      this._state = STATE.TOUCH_ZOOM_PAN;
	      var dx = event.touches[0].pageX - event.touches[1].pageX;
	      var dy = event.touches[0].pageY - event.touches[1].pageY;
	      this._touchZoomDistanceEnd = this._touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
	      var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	      var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	      this._panStart.copy(this.getMouseOnScreen(x, y));
	      this._panEnd.copy(this._panStart);
	    }
	  }).append('touchmove', function(event) {
	    if (event.touches.length === 2) {
	      var dx = event.touches[0].pageX - event.touches[1].pageX;
	      var dy = event.touches[0].pageY - event.touches[1].pageY;
	      this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
	      var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	      var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	      this._panEnd.copy(this.getMouseOnScreen(x, y));
	    }
	  }).append('touchend', function() {
	    if (event.touches.length === 2) {
	      this._touchZoomDistanceStart = this._touchZoomDistanceEnd = 0;
	      var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	      var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	      this._panEnd.copy(this.getMouseOnScreen(x, y));
	      this._panStart.copy(this._panEnd);
	    }
	  });
	  THREE.TrackballControls = dm.vp('TrackballControls', U.newClass(function TrackballControls(controlledObject) {
	    var domElement = arguments[1] !== (void 0) ? arguments[1] : document;
	    this.construct.apply(this, arguments);
	    this.handleResize();
	    this.update();
	  }, Object.create(THREE.EventDispatcher.prototype)));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMzZhOWIxZDBjMzBiMTZhOTQxYiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQtbWFudWFsLWNvbnRyb2xzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25cIixcImNvbW1vbmpzXCI6XCJiYWNvblwiLFwiYW1kXCI6XCJiYWNvblwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVUsd0JBQWtCLHdCQUFZLHdCQUE0Qix3QkFBNkIsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsTUFBSSxDQUFHLE1BQUk7QUFDdEksY0FBVyxDQUFDO0FBR1IsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRywwQkFBd0I7QUFDOUIsWUFBTyxDQUFHLEVBQUMsU0FBUSxDQUFDO0FBQUEsR0FDckIsQ0FBQyxDQUFDO0FBTUUsa0JBQVcsRUFBSTtBQUFFLFFBQUcsQ0FBRztBQUFHLFVBQUssQ0FBRztBQUFHLFNBQUksQ0FBRztBQUFBLEdBQUUsQ0FBQztBQUduRCxRQUFLLE9BQVEsQ0FBQyxrQ0FBaUMsQ0FBRyxVQUFVOztBQUczRCxRQUFHLFlBQWEsQ0FBQyw2QkFBNEIsQ0FBRyxFQUFFLE9BQU0sQ0FBRyxLQUFHLENBQUUsQ0FBQyxDQUFDO0FBRWxFLFFBQUcsR0FBSSxDQUFDLFlBQVcsQ0FBRyxLQUFHLENBQUMsUUFBUyxFQUFDLFNBQUM7QUE0QmhDLDBCQUFlLEVBQUksTUFBSSxDQUFDO0FBSTVC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QUFFLEVBQUMsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxDQUFFLEVBQUksR0FBQztBQUMzRCxhQUFJLEVBQUUsS0FBSSxRQUFRLENBQUUsRUFBQyxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQy9ELFVBQUcsUUFBUSxLQUFNLENBQUMsSUFBRyxpQkFBa0IsQ0FBQyxFQUFHLEdBQUMsQ0FBQyxDQUFDO0FBQzlDLFVBQUcsVUFBVSxLQUFNLENBQUMsSUFBRyxRQUFRLENBQUMsQ0FBQztLQUNsQztBQUFBLEdBRUQsQ0FBQyxDQUFDO0FBS0osT0FBSSxrQkFBa0IsRUFBSSxHQUFDLEdBQUksQ0FBQyxtQkFBa0IsQ0FDaEQsV0FBVSxDQUFDLFFBQVMsa0JBQWdCLENBQUUsZ0JBQXNDLENBQUc7T0FBdkIsV0FBUyw2Q0FBSSxTQUFPO0FBRzNFLFFBQUcsVUFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBR3JDLFFBQUcsYUFBYyxFQUFDLENBQUM7QUFDbkIsUUFBRyxPQUFRLEVBQUMsQ0FBQztHQUVkLENBQUcsT0FBSyxPQUFRLENBQUMsS0FBSSxnQkFBZ0IsVUFBVSxDQUFDLENBQUMsQ0FDbkQsQ0FBQztBQUdGLGlKQUFFO0FBQ0Y7Ozs7Ozs7QUNyaUJBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJiYWNvblwiLCBcInR3ZWVuanNcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjMzZhOWIxZDBjMzBiMTZhOTQxYlxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL3V0aWwvbWlzYy5qcycsICd0aHJlZS1qcycsICcuL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMnLCAnLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBUSFJFRSwgQmFjb24pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQtbWFudWFsLWNvbnRyb2xzJyxcblx0XHRyZXF1aXJlczogWyd0aHJlZS1kJ11cblx0fSk7XG5cblxuXHQvKiBjb25zdGFudHMgKi9cblx0Ly92YXIgRVBTID0gMC4wMDAwMDE7XG5cdC8vdmFyIFNUQVRFID0geyBOT05FOiAtMSwgUk9UQVRFOiAwLCBaT09NOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfWk9PTV9QQU46IDQgfTtcblx0dmFyIE1PVVNFX0JVVFRPTiA9IHsgTEVGVDogMSwgTUlERExFOiAyLCBSSUdIVDogMyB9O1xuXG5cblx0cGx1Z2luLmFwcGVuZCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiB0aGUgJ3RocmVlRE1hbnVhbENvbnRyb2xzRW5hYmxlZCcgcHJvcGVydHkgKi9cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCd0aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQnLCB7IGluaXRpYWw6IHRydWUgfSk7XG5cblx0XHR0aGlzLm9uKCd0aHJlZURNb2RlJywgdHJ1ZSkub25WYWx1ZSgoKSA9PiB7XG5cblx0XHRcdC8qIGluaXRpYWxpemF0aW9uICovXG5cdFx0XHQvL3RoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoXG5cdFx0XHQvL1x0XHR0aGlzLmNhbWVyYTNELnBvc2l0aW9uLngsXG5cdFx0XHQvL1x0XHR0aGlzLmNhbWVyYTNELnBvc2l0aW9uLnksXG5cdFx0XHQvL1x0XHQwXG5cdFx0XHQvLyk7XG5cdFx0XHQvL3RoaXMuY2FtZXJhM0QubG9va0F0KHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblx0XHRcdC8vdGhpcy5fdmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Ly90aGlzLl9sYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Ly90aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLmNhbWVyYTNELnBvc2l0aW9uKTtcblx0XHRcdC8vdGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0Ly90aGlzLl9leWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Ly90aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLmNhbWVyYTNELnBvc2l0aW9uLCB0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cdFx0XHQvL3RoaXMuX3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdC8vdGhpcy5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdC8vdGhpcy5fem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdC8vdGhpcy5fem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHQvL3RoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwO1xuXHRcdFx0Ly90aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cdFx0XHQvL3RoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdC8vdGhpcy5fcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdC8vdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMwID0gdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY2xvbmUoKTtcblx0XHRcdC8vdGhpcy5fcG9zaXRpb24wID0gdGhpcy5jYW1lcmEzRC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdFx0Ly90aGlzLl91cDAgPSB0aGlzLmNhbWVyYTNELnVwLmNsb25lKCk7XG5cblxuXHRcdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblxuXG5cdFx0XHQvKiBzY3JlZW4gcG9zaXRpb24gYW5kIHNpemUgKi8vLyBUT0RPOiByZWZhY3RvciAtIGN1dCBvdXQgdGhlIG1pZGRsZW1hblxuXHRcdFx0dGhpcy5fc2NyZWVuID0ge307XG5cdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykub25WYWx1ZSgoc2l6ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLl9zY3JlZW4ud2lkdGggPSBzaXplLndpZHRoO1xuXHRcdFx0XHR0aGlzLl9zY3JlZW4uaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi5sZWZ0ID0gcGFyc2VGbG9hdCh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuY3NzKCdsZWZ0JykpO1xuXHRcdFx0XHR0aGlzLl9zY3JlZW4udG9wICA9IHBhcnNlRmxvYXQodGhpcy50aHJlZURDYW52YXNFbGVtZW50LmNzcygndG9wJykpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmdldE1vdXNlT25TY3JlZW4gPSAocGFnZVgsIHBhZ2VZKSA9PiB7XG5cdFx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMihcblx0XHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvIHRoaXMuX3NjcmVlbi53aWR0aCxcblx0XHRcdFx0XHRcdChwYWdlWSAtIHRoaXMuX3NjcmVlbi50b3ApIC8gdGhpcy5fc2NyZWVuLmhlaWdodFxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblxuXG5cdFx0XHQvKiBjcmVhdGluZyB2YXJpb3VzIGV2ZW50IHN0cmVhbXMgKi9cblx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5hc0V2ZW50U3RyZWFtKCdjb250ZXh0bWVudScpLm9uVmFsdWUoJy5wcmV2ZW50RGVmYXVsdCcpO1xuXHRcdFx0dmFyIGRyYWdnaW5nID0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm1vdXNlRHJhZyh7IHRocmVzaG9sZDogNSB9KS5maWx0ZXIoKCkgPT4gdGhpcy50aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQpO1xuXHRcdFx0dmFyIGtleWRvd24gPSAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgna2V5ZG93bicpLmZpbHRlcigoKSA9PiB0aGlzLnRocmVlRE1hbnVhbENvbnRyb2xzRW5hYmxlZCk7XG5cdFx0XHR2YXIga2V5dXAgPSAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgna2V5dXAnKTtcblx0XHRcdHZhciBzY3JvbGxpbmcgPSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQubW91c2VXaGVlbCgpLmZpbHRlcigoKSA9PiB0aGlzLnRocmVlRE1hbnVhbENvbnRyb2xzRW5hYmxlZCk7XG5cdFx0XHR2YXIgYnV0dG9uID0gKGIpID0+ICh7bW91c2VEb3duRXZlbnR9KSA9PiAobW91c2VEb3duRXZlbnQud2hpY2ggPT09IGIpO1xuXHRcdFx0dmFyIGtleSA9IChmcm9tLCB0bykgPT4gKGV2ZW50KSA9PiAoZXZlbnQud2hpY2ggPj0gZnJvbSAmJiBldmVudC53aGljaCA8PSAodG8gfHwgZnJvbSkpO1xuXG5cblx0XHRcdC8qIHJvdGF0aW5nIHdpdGggdGhlIGxlZnQgbW91c2UgYnV0dG9uICovXG5cdFx0XHR0aGlzLl9yb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHR0aGlzLl9yb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0ZHJhZ2dpbmcuZmlsdGVyKGJ1dHRvbihNT1VTRV9CVVRUT04uTEVGVCkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7IC8vIFRPRE86IHRvdWNoXG5cblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChtb3VzZURvd25FdmVudC5wYWdlWCwgbW91c2VEb3duRXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChtb3VzZU1vdmVFdmVudC5wYWdlWCwgbW91c2VNb3ZlRXZlbnQucGFnZVkpKTtcblxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIHJvdGF0aW5nIHdpdGggdGhlIGtleWJvYXJkICovXG5cdFx0XHR0aGlzLm5ld1Byb3BlcnR5KCdjdXJyZW50QXJyb3dLZXknLCB7XG5cdFx0XHRcdHNvdXJjZToga2V5ZG93bi5maWx0ZXIoa2V5KDM3LCA0MCkpLmZsYXRNYXBMYXRlc3QoKGtleWRvd25FdmVudCkgPT4gQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0XHRcdEJhY29uLm9uY2Uoa2V5ZG93bkV2ZW50LndoaWNoKSxcblx0XHRcdFx0XHRrZXl1cC5maWx0ZXIoa2V5KGtleWRvd25FdmVudC53aGljaCkpLm1hcChmYWxzZSkudGFrZSgxKVxuXHRcdFx0XHRdKSksXG5cdFx0XHRcdGluaXRpYWw6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMub24oJ2N1cnJlbnRBcnJvd0tleScpLm9uVmFsdWUoKHYpID0+IHsgc29tZXRoaW5nQ2hhbmdlZCA9IHRydWUgfSk7XG5cblxuXHRcdFx0Lyogem9vbWluZyB3aXRoIHRoZSBtaWRkbGUgbW91c2UgYnV0dG9uICovXG5cdFx0XHR0aGlzLl96b29tU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0dGhpcy5fem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRkcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5NSURETEUpKS5vblZhbHVlKCh7bW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50fSkgPT4ge1xuXG5cdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmICghbW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCkge1xuXHRcdFx0XHRcdG1vdXNlRG93bkV2ZW50Ll9wYXN0Rmlyc3QgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuX3pvb21TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihtb3VzZURvd25FdmVudC5wYWdlWCwgbW91c2VEb3duRXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlTW92ZUV2ZW50LnBhZ2VYLCBtb3VzZU1vdmVFdmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9KTtcblx0XHRcdC8qIHpvb21pbmcgd2l0aCB0aGUgc2Nyb2xsLXdoZWVsICovXG5cdFx0XHRzY3JvbGxpbmcub25WYWx1ZSgoZXZlbnQpID0+IHtcblxuXHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRldmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG5cblx0XHRcdFx0dmFyIGRpZmYgPSAwO1xuXG5cdFx0XHRcdGlmIChldmVudC53aGVlbERlbHRhKSB7IC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXHRcdFx0XHRcdGRpZmYgPSBldmVudC53aGVlbERlbHRhIC8gNDA7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7IC8vIEZpcmVmb3hcblx0XHRcdFx0XHRkaWZmID0gLWV2ZW50LmRldGFpbCAvIDM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl96b29tU3RhcnQueSArPSBkaWZmICogMC4wMTtcblxuXHRcdFx0fSk7XG5cblxuXG5cblx0XHRcdC8qIHBhbm5pbmcgd2l0aCB0aGUgcmlnaHQgbW91c2UgYnV0dG9uICovXG5cdFx0XHR0aGlzLl9wYW5TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHR0aGlzLl9wYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0ZHJhZ2dpbmcuZmlsdGVyKGJ1dHRvbihNT1VTRV9CVVRUT04uUklHSFQpKS5vblZhbHVlKCh7bW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50fSkgPT4ge1xuXG5cdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGlmICghbW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCkge1xuXHRcdFx0XHRcdG1vdXNlRG93bkV2ZW50Ll9wYXN0Rmlyc3QgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlRG93bkV2ZW50LnBhZ2VYLCBtb3VzZURvd25FdmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihtb3VzZU1vdmVFdmVudC5wYWdlWCwgbW91c2VNb3ZlRXZlbnQucGFnZVkpKTtcblxuXHRcdFx0fSk7XG5cblxuXHRcdFx0LyogdXBkYXRpbmcgYWxsIHRoZSBzdHVmZiAqL1xuXHRcdFx0dGhpcy5fZXllID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdHRoaXMuX3BhblNwZWVkID0gMS4wO1xuXHRcdFx0dGhpcy5fcm90YXRlU3BlZWQgPSAxLjA7XG5cdFx0XHR0aGlzLnpvb21TcGVlZCA9IDEuMDtcblx0XHRcdHRoaXMub24oJzNkLXJlbmRlcicpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHRcdGlmIChzb21ldGhpbmdDaGFuZ2VkIHx8IHRoaXMuY3VycmVudEFycm93S2V5KSB7XG5cdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0Lyogc2V0dXAgKi9cblx0XHRcdFx0XHR0aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLmNhbWVyYTNELnBvc2l0aW9uLCB0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cblxuXHRcdFx0XHRcdC8qIHBhbm5pbmcgKi9cblx0XHRcdFx0XHQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dmFyIG1vdXNlQ2hhbmdlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0XHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdFx0XHR2YXIgcGFuID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0XHRcdG1vdXNlQ2hhbmdlLmNvcHkodGhpcy5fcGFuRW5kKS5zdWIodGhpcy5fcGFuU3RhcnQpOyAvLyBUT0RPOiBqdXN0IHN0b3JlIHRoaXMgZGlyZWN0bHk/XG5cdFx0XHRcdFx0XHRpZiAobW91c2VDaGFuZ2UubGVuZ3RoU3EoKSkge1xuXHRcdFx0XHRcdFx0XHRtb3VzZUNoYW5nZS5tdWx0aXBseVNjYWxhcih0aGlzLl9leWUubGVuZ3RoKCkgKiB0aGlzLl9wYW5TcGVlZCk7XG5cdFx0XHRcdFx0XHRcdHBhbi5jb3B5KHRoaXMuX2V5ZSk7XG5cdFx0XHRcdFx0XHRcdHBhbi5jcm9zcyh0aGlzLmNhbWVyYTNELnVwKTtcblx0XHRcdFx0XHRcdFx0cGFuLnNldExlbmd0aChtb3VzZUNoYW5nZS54KTtcblx0XHRcdFx0XHRcdFx0cGFuLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuY2FtZXJhM0QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS55KSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QucG9zaXRpb24uYWRkKHBhbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0LmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuX3BhbkVuZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0XHQvKiByb3RhdGluZyBieSBtb3VzZSAqL1xuXHRcdFx0XHRcdCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdFx0XHR2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdFx0XHRcdFx0XHR2YXIgYW5nbGUgPSBNYXRoLmFjb3MoXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuZG90KHRoaXMuX3JvdGF0ZUVuZCkgL1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0Lmxlbmd0aCgpIC9cblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQubGVuZ3RoKClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRcdFx0YXhpcy5jcm9zc1ZlY3RvcnModGhpcy5fcm90YXRlU3RhcnQsIHRoaXMuX3JvdGF0ZUVuZCkubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0XHRcdFx0YW5nbGUgKj0gdGhpcy5fcm90YXRlU3BlZWQ7XG5cblx0XHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLl9yb3RhdGVFbmQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0Lyogcm90YXRpbmcgYnkga2V5Ym9hcmQgKi9cblx0XHRcdFx0XHQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHRcdFx0dmFyIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXHRcdFx0XHRcdFx0dmFyIGFuZ2xlID0gMC4wMTUgKiBNYXRoLlBJO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY3VycmVudEFycm93S2V5ID09PSAzNykge1xuXHRcdFx0XHRcdFx0XHRheGlzLnNldFkoMSk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudEFycm93S2V5ID09PSAzOSkge1xuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IC1hbmdsZTtcblx0XHRcdFx0XHRcdFx0YXhpcy5zZXRZKDEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmN1cnJlbnRBcnJvd0tleSA9PT0gMzgpIHtcblx0XHRcdFx0XHRcdFx0YXhpcy5zZXRYKDEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmN1cnJlbnRBcnJvd0tleSA9PT0gNDApIHtcblx0XHRcdFx0XHRcdFx0YW5nbGUgPSAtYW5nbGU7XG5cdFx0XHRcdFx0XHRcdGF4aXMuc2V0WCgxKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGFuZ2xlID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChhbmdsZSkge1xuXHRcdFx0XHRcdFx0XHRheGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdFx0XHRcdGFuZ2xlICo9IHRoaXMuX3JvdGF0ZVNwZWVkO1xuXG5cdFx0XHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdC8qIHpvb21pbmcgKi9cblx0XHRcdFx0XHQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0Ly9pZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlRPVUNIX1pPT01fUEFOKSB7XG5cdFx0XHRcdFx0XHQvL1x0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kO1xuXHRcdFx0XHRcdFx0Ly9cdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcih0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0IC8gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQpO1xuXHRcdFx0XHRcdFx0Ly99IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly99XG5cblx0XHRcdFx0XHRcdHZhciBmYWN0b3IgPSAxLjAgKyAoIHRoaXMuX3pvb21FbmQueSAtIHRoaXMuX3pvb21TdGFydC55ICkgKiB0aGlzLnpvb21TcGVlZDsgLy8gc2V0IGZhY3RvclxuXHRcdFx0XHRcdFx0aWYgKGZhY3RvciAhPT0gMS4wICYmIGZhY3RvciA+IDAuMCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5fem9vbUVuZCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9KSgpO1xuXG5cblxuXHRcdFx0XHRcdC8qIGJyZWFrZG93biAqL1xuXHRcdFx0XHRcdHRoaXMuY2FtZXJhM0QucG9zaXRpb24uYWRkVmVjdG9ycyh0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCwgdGhpcy5fZXllKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jYW1lcmEzRC5sb29rQXQodGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQpO1xuXG5cblxuXG5cblx0XHRcdH0pO1xuXG5cblx0XHRcdC8vLyogcGFubmluZyB3aXRoIHRoZSByaWdodCBtb3VzZSBidXR0b24gKi9cblx0XHRcdC8vZHJhZ2dpbmcuZmlsdGVyKGJ1dHRvbihNT1VTRV9CVVRUT04uUklHSFQpKS5vblZhbHVlKCh7bW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50fSkgPT4ge1xuXHRcdFx0Ly9cblx0XHRcdC8vXHRpZiAoIW1vdXNlRG93bkV2ZW50Ll9jYW1lcmFQb3NpdGlvbjApIHtcblx0XHRcdC8vXHRcdG1vdXNlRG93bkV2ZW50Ll9jYW1lcmFQb3NpdGlvbjAgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbik7XG5cdFx0XHQvL1x0fVxuXHRcdFx0Ly9cblx0XHRcdC8vXHR0aGlzLmNhbWVyYTNELnBvc2l0aW9uLnggPSBtb3VzZURvd25FdmVudC5fY2FtZXJhUG9zaXRpb24wLnggKyBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0Ly9cdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ueSA9IG1vdXNlRG93bkV2ZW50Ll9jYW1lcmFQb3NpdGlvbjAueSArIG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHQvL1xuXHRcdFx0Ly99KTtcblxuXG5cblx0XHR9KTtcblx0fSk7XG5cblxuXG5cblxuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbCcsIGZ1bmN0aW9uIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChwYWdlWCwgcGFnZVkpIHtcblx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBtb3VzZU9uQmFsbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRtb3VzZU9uQmFsbC5zZXQoXG5cdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvICh0aGlzLl9zY3JlZW4ud2lkdGggKiAwLjUpLFxuXHRcdFx0XHQodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSArIHRoaXMuX3NjcmVlbi50b3AgLSBwYWdlWSkgLyAodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSksXG5cdFx0XHRcdDAuMFxuXHRcdCk7XG5cblx0XHR2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG5cblx0XHRpZiAobGVuZ3RoID4gMS4wKSB7XG5cdFx0XHRtb3VzZU9uQmFsbC5ub3JtYWxpemUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bW91c2VPbkJhbGwueiA9IE1hdGguc3FydCgxLjAgLSBsZW5ndGggKiBsZW5ndGgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2V5ZS5jb3B5KHRoaXMuY2FtZXJhM0QucG9zaXRpb24pLnN1Yih0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cblx0XHR2ZWN0b3IuY29weSh0aGlzLmNhbWVyYTNELnVwKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueSk7XG5cdFx0dmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuY2FtZXJhM0QudXApLmNyb3NzKHRoaXMuX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcblx0XHR2ZWN0b3IuYWRkKHRoaXMuX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuXG5cdFx0cmV0dXJuIHZlY3Rvcjtcblx0fSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXHQvL3BsdWdpbi5hcHBlbmQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXHQvL1x0dGhpcy5vbigndGhyZWVETW9kZScsIHRydWUpLm9uVmFsdWUoKCkgPT4ge1xuXHQvL1xuXHQvL1xuXHQvL1xuXHQvL1x0XHQvKiBpbXBsZW1lbnRpbmcgdGhlIGNvbnRyb2xzICovXG5cdC8vXHRcdHZhciBjb250cm9scyA9IG5ldyBUSFJFRS5UcmFja2JhbGxDb250cm9scyh0aGlzLmNhbWVyYTNELCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnRbMF0pO1xuXHQvL1x0XHRVLmV4dGVuZChjb250cm9scywge1xuXHQvL1x0XHRcdHJvdGF0ZVNwZWVkOiAxLjAsXG5cdC8vXHRcdFx0em9vbVNwZWVkOiAxLjIsXG5cdC8vXHRcdFx0cGFuU3BlZWQ6IDAuOFxuXHQvL1x0XHR9KTtcblx0Ly9cdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkuYXNzaWduKGNvbnRyb2xzLCAndXBkYXRlJyk7XG5cdC8vXHRcdHRoaXMub24oJ3NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5hc3NpZ24oY29udHJvbHMsICdoYW5kbGVSZXNpemUnKTtcblx0Ly9cdFx0dGhpcy5vbigndGhyZWVEQ29udHJvbHNFbmFibGVkJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoZW5hYmxlZCkgPT4geyBjb250cm9scy5lbmFibGVkID0gZW5hYmxlZCB9KTtcblx0Ly9cblx0Ly9cdH0pO1xuXHQvL30pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRocmVlLWQtbWFudWFsLWNvbnRyb2xzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdiYWNvbicsICdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4J10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnYmFjb24nLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24sIFRXRUVOKSB7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEJhY29uLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCAodikgPT4geyBzaW5rKG5ldyBCYWNvbi5OZXh0KHYpKSB9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0QmFjb24uYW5pbWF0aW9uRnJhbWVzID0gVS5tZW1vaXplKGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0KChmKSA9PiB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApKTtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHR2YXIgaXRlcmF0aW9uRm4gPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHNpbmsoKTtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oaXRlcmF0aW9uRm4pO1xuXHRcdFx0fTtcblxuXHRcdFx0Lyogc3RhcnQgaXQgbm93ICovXG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdHNpbmsobmV3IEJhY29uLkVuZCgpKTtcblx0XHRcdH07XG5cblx0XHR9KTtcblx0fSk7XG5cblxuXHRCYWNvbi50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ30pIHtcblxuXHRcdC8qIHRoZSB0d2VlbiAqL1xuXHRcdHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG5cblx0XHQvKiB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0dmFyIGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IHNpbmsobmV3IEJhY29uLk5leHQoKCkgPT4gdGhpcykpIH0pO1xuXHRcdFx0dHcub25Db21wbGV0ZSgoKSA9PiB7IHNpbmsobmV3IEJhY29uLkVuZCgpKSB9KTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEJhY29uLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Y29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Y29kZSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEJhY29uLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIG9wZW4gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlcih3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoaGFuZGxlciwgKCkgPT4ge1xuXHRcdFx0b3Blbi5wdXNoKCk7XG5cdFx0XHR3YW50ZWRCdXMucHVzaChmYWxzZSk7XG5cdFx0XHRjbG9zZS5wdXNoKCk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcCh0cnVlKSk7XG5cdFx0XHRyZXR1cm4gY2xvc2Uuc3RhcnRXaXRoKHRydWUpLmZsYXRNYXBMYXRlc3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgYWNjdW11bGF0b3IgPSAoYXJyLCB2YWwpID0+IChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcblx0XHRcdFx0cmV0dXJuIHN0cmVhbS50YWtlVW50aWwob3BlbikucmVkdWNlKFtdLCBhY2N1bXVsYXRvcikuZmxhdE1hcChCYWNvbi5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHR2YXIgYnVmZmVyID0gW107XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSB0aGlzLm9uVmFsdWUoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGJ1ZmZlci5wdXNoKG5ldyBCYWNvbi5OZXh0KCgpID0+IHZhbHVlKSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdHNpbmsob2xkQnVmZmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvVGhpcygpO1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG5cdFx0XHRcdGJ1ZmZlciA9IG51bGw7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFRoaXMgZmlsdGVycyBhbiBvYnNlcnZhYmxlIHRvIG9ubHkgbGV0IHRocm91Z2ggdmFsdWVzIGVxdWFsIHRvIHRoZSBnaXZlbiB2YWx1ZS5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbXBhcmF0b3IpIHtcblx0XHRjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGUpID0+IGUgPT09IHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcblx0fTtcblxuXHQvLyBUaGlzIG1ha2VzIGEgc3Vic2NyaXB0aW9uIHRvIGFuIG9ic2VydmFibGUgdGhhdCBkb2Vzbid0IGRvIGFueXRoaW5nXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdWJzY3JpYmUoKCk9Pnt9KTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJykudGFrZVVudGlsKCQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKSk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW0ubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEJhY29uO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9iYWNvbi1hbmQtZWdncy5qc1xuICoqLyIsIi8qKlxuICogQGF1dGhvciBFYmVyaGFyZCBHcmFldGhlciAgICAgKGh0dHA6Ly9lZ3JhZXRoZXIuY29tKVxuICogQGF1dGhvciBNYXJrIEx1bmRpbiAgICAgICAgICAgKGh0dHA6Ly9tYXJrLWx1bmRpbi5jb20pXG4gKiBAYXV0aG9yIE1pY2hpZWwgSGVsdmVuc3RlaWpuICAoaHR0cDovL21oZWx2ZW5zLm5ldClcbiAqL1xuXG5kZWZpbmUoWydqcXVlcnknLCAndGhyZWUtanMnLCAnZGVsdGEtanMnLCAnLi9taXNjLmpzJ10sICgkLCBUSFJFRSwgRGVsdGFNb2RlbCwgVSkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBjb25zdGFudHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIFNUQVRFID0geyBOT05FOiAtMSwgUk9UQVRFOiAwLCBaT09NOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfWk9PTV9QQU46IDQgfTtcblx0dmFyIENIQU5HRV9FVkVOVCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblx0dmFyIFNUQVJUX0VWRU5UICA9IHsgdHlwZTogJ3N0YXJ0JyB9O1xuXHR2YXIgRU5EX0VWRU5UICAgID0geyB0eXBlOiAnZW5kJyB9O1xuXG5cblx0LyogZGVsdGEgbW9kZWwgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgZG0gPSBuZXcgRGVsdGFNb2RlbCgpO1xuXG5cblx0LyogY29yZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ2NvcmUnLCB7XG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qICdjb25zdHJ1Y3QnIG1ldGhvZCBjb3JlICovXG5cdFx0XHQuYWRkKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoY29udHJvbGxlZE9iamVjdCwgZG9tRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0ID0gY29udHJvbGxlZE9iamVjdDtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cdFx0XHRcdHRoaXMuX3NjZW5lID0gY29udHJvbGxlZE9iamVjdC5wYXJlbnQ7XG5cdFx0XHR9KVxuXHRcdC8qIEFQSSAqL1xuXHRcdFx0LmFwcGVuZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdH0pXG5cdFx0LyogcHJpdmF0ZSBmaWVsZHMgKi9cblx0XHRcdC5hcHBlbmQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3ZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fbGFzdFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR0aGlzLl9leWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3pvb21TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3pvb21FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gMDtcblx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSAwO1xuXHRcdFx0XHR0aGlzLl9wYW5TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3BhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbiA9IHsgbGVmdDogMCwgdG9wOiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XG5cdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzMCA9IHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLmNsb25lKCk7XG5cdFx0XHRcdHRoaXMuX3Bvc2l0aW9uMCA9IHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uY2xvbmUoKTtcblx0XHRcdFx0dGhpcy5fdXAwID0gdGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5jbG9uZSgpO1xuXG5cblxuXHRcdFx0XHR2YXIgbmV3SGVscGVyID0gKG5hbWUsIG9iaiwgY29sb3IpID0+IHtcblx0XHRcdFx0XHR2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNSwgNjQsIDY0KTtcblx0XHRcdFx0XHR2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiBjb2xvciB9KTtcblx0XHRcdFx0XHR2YXIgc3BoZXJlID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXHRcdFx0XHRcdHRoaXMuX3NjZW5lLmFkZChzcGhlcmUpO1xuXHRcdFx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRzcGhlcmUucG9zaXRpb24uY29weShvYmopO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cdFx0XHRcdC8vdGhpcy5fcmVmcmVzaEhlbHBlcjEgPSBuZXdIZWxwZXIoJ2V5ZScsIHRoaXMuX2V5ZSwgMHhmZjAwMDApO1xuXHRcdFx0XHR0aGlzLl9yZWZyZXNoSGVscGVyMiA9IG5ld0hlbHBlcigndGFyZ2V0JywgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMsIDB4MDBmZjAwKTtcblxuXG5cdFx0XHR9KVxuXHRcdC8qIHB1YmxpYyBtZXRob2RzICovXG5cdFx0XHQuYWRkKCdyZXNldCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY29weSh0aGlzLl90YXJnZXRDb29yZGluYXRlczApO1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmNvcHkodGhpcy5fcG9zaXRpb24wKTtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5jb3B5KHRoaXMuX3VwMCk7XG5cblx0XHRcdFx0dGhpcy5fdmVsb2NpdHkuc2V0KDAsIDAsIDApO1xuXG5cdFx0XHRcdHRoaXMuX2V5ZS5zdWJWZWN0b3JzKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24sIHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblx0XHRcdFx0dGhpcy5fcmVmcmVzaEhlbHBlcjIoKTtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0Lmxvb2tBdCh0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENIQU5HRV9FVkVOVCk7XG5cblx0XHRcdFx0dGhpcy5fbGFzdFBvc2l0aW9uLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbik7XG5cblx0XHRcdH0pLmFkZCgndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX2V5ZS5zdWJWZWN0b3JzKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24sIHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHR0aGlzLnJvdGF0ZUNhbWVyYSgpO1xuXHRcdFx0XHR0aGlzLnpvb21DYW1lcmEoKTtcblx0XHRcdFx0dGhpcy5wYW5DYW1lcmEoKTtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmFkZFZlY3RvcnModGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMsIHRoaXMuX2V5ZSk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5sb29rQXQodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9sYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbikgPiBFUFMpIHtcblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ0hBTkdFX0VWRU5UKTtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hIZWxwZXIyKCk7XG5cblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGQodGhpcy5fdmVsb2NpdHkpO1xuXHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdFx0XHRcdHRoaXMuX3JlZnJlc2hIZWxwZXIyKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5hZGQoJ2hhbmRsZVJlc2l6ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ubGVmdCA9IDA7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLnRvcCA9IDA7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgYm94ID0gdGhpcy5fZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0XHQvLyBhZGp1c3RtZW50cyBjb21lIGZyb20gc2ltaWxhciBjb2RlIGluIHRoZSBqcXVlcnkgb2Zmc2V0KCkgZnVuY3Rpb25cblx0XHRcdFx0XHR2YXIgZCA9IHRoaXMuX2RvbUVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGQuY2xpZW50TGVmdDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4udG9wID0gYm94LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGQuY2xpZW50VG9wO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IGJveC53aWR0aDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4uaGVpZ2h0ID0gYm94LmhlaWdodDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXG5cdC8qIG1vdXNlIGV2ZW50IG1ldGhvZCBjb3JlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdtb3VzZS1ldmVudHMnLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZSddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5OT05FKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSB7XG5cdFx0XHRcdFx0XHQwOiBTVEFURS5ST1RBVEUsXG5cdFx0XHRcdFx0XHQxOiBTVEFURS5aT09NLFxuXHRcdFx0XHRcdFx0MjogU1RBVEUuUEFOXG5cdFx0XHRcdFx0fVtldmVudC5idXR0b25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG1vdXNlbW92ZSA9IChlKSA9PiB7IHRoaXMubW91c2Vtb3ZlKGUpIH07XG5cdFx0XHRcdHZhciBtb3VzZXVwID0gKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoU1RBUlRfRVZFTlQpO1xuXG5cdFx0XHR9KS5hZGQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG5cdFx0XHR9KS5hZGQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA8IDEgfHwgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblxuXHRcdFx0fSkuYWRkKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA8IDEgfHwgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gZ2V0TW91c2VPblNjcmVlblxuXG5cdFx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLmdldE1vdXNlT25TY3JlZW4gPSBmdW5jdGlvbiBnZXRNb3VzZU9uU2NyZWVuKHBhZ2VYLCBwYWdlWSkge1xuXHRcdFx0XHRcdHZlY3Rvci5zZXQoXG5cdFx0XHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvIHRoaXMuX3NjcmVlbi53aWR0aCxcblx0XHRcdFx0XHRcdFx0KHBhZ2VZIC0gdGhpcy5fc2NyZWVuLnRvcCkgLyB0aGlzLl9zY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsXG5cdFx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgbW91c2VPbkJhbGwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbCA9IGZ1bmN0aW9uIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChwYWdlWCwgcGFnZVkpIHtcblxuXHRcdFx0XHRcdG1vdXNlT25CYWxsLnNldChcblx0XHRcdFx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLndpZHRoICogMC41IC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gKHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSksXG5cdFx0XHRcdFx0XHRcdCh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41ICsgdGhpcy5fc2NyZWVuLnRvcCAtIHBhZ2VZKSAvICh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41KSxcblx0XHRcdFx0XHRcdFx0MC4wXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHZhciBsZW5ndGggPSBtb3VzZU9uQmFsbC5sZW5ndGgoKTtcblxuXHRcdFx0XHRcdGlmIChsZW5ndGggPiAxLjApIHtcblx0XHRcdFx0XHRcdG1vdXNlT25CYWxsLm5vcm1hbGl6ZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fZXllLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbikuc3ViKHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHRcdHZlY3Rvci5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLnNldExlbmd0aCgtbW91c2VPbkJhbGwueSk7XG5cdFx0XHRcdFx0dmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLmNyb3NzKHRoaXMuX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcblx0XHRcdFx0XHR2ZWN0b3IuYWRkKHRoaXMuX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZlY3RvcjtcblxuXHRcdFx0XHR9O1xuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4geyB0aGlzLm1vdXNlZG93bihlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHsgdGhpcy50b3VjaHN0YXJ0KGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7IHRoaXMudG91Y2htb3ZlKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHsgdGhpcy50b3VjaGVuZChlKSB9KTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiBrZXlib2FyZCBldmVudCBtZXRob2QgY29yZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgna2V5Ym9hcmQtZXZlbnRzJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdrZXlib2FyZFZlbG9jaXR5JywgKCkgPT4gMTApXG5cdFx0XHQuYWRkKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5fc3RhdGUgIT09IFNUQVRFLk5PTkUpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHR2YXIgZCA9IHRoaXMua2V5Ym9hcmRWZWxvY2l0eSgpO1xuXHRcdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0XHRjYXNlIDM3OiB7IHRoaXMuX3ZlbG9jaXR5LnggPSAgZCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMzg6IHsgdGhpcy5fdmVsb2NpdHkueSA9ICBkIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzOTogeyB0aGlzLl92ZWxvY2l0eS54ID0gLWQgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDQwOiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAtZCB9IGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0XHRjYXNlIDM3OiB7IHRoaXMuX3ZlbG9jaXR5LnggPSAwIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzODogeyB0aGlzLl92ZWxvY2l0eS55ID0gMCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMzk6IHsgdGhpcy5fdmVsb2NpdHkueCA9IDAgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDQwOiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAwIH0gYnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0JCh3aW5kb3cpLm9uKCdrZXlkb3duJywgKGUpID0+IHsgdGhpcy5rZXlkb3duKGUpIH0pO1xuXHRcdFx0XHQkKHdpbmRvdykub24oJ2tleXVwJywgICAoZSkgPT4geyB0aGlzLmtleXVwKGUpICAgfSk7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyogcm90YXRlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3JvdGF0ZScsIHtcblx0XHRhZnRlcjogWydjb3JlJywgJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLl9yb3RhdGVTdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHQvKiByb3RhdGluZyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyByb3RhdGVDYW1lcmFcblx0XHRcdFx0dmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdFx0XHRcdHRoaXMucm90YXRlQ2FtZXJhID0gZnVuY3Rpb24gcm90YXRlQ2FtZXJhKCkge1xuXG5cdFx0XHRcdFx0dmFyIGFuZ2xlID0gTWF0aC5hY29zKFxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5kb3QodGhpcy5fcm90YXRlRW5kKSAvXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0Lmxlbmd0aCgpIC9cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmxlbmd0aCgpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRcdGF4aXMuY3Jvc3NWZWN0b3JzKHRoaXMuX3JvdGF0ZVN0YXJ0LCB0aGlzLl9yb3RhdGVFbmQpLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdFx0XHRhbmdsZSAqPSB0aGlzLnJvdGF0ZVNwZWVkO1xuXG5cdFx0XHRcdFx0XHRxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoYXhpcywgLWFuZ2xlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLl9yb3RhdGVFbmQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHQvKiByb3RhdGluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiB6b29tICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnem9vbScsIHtcblx0XHRhZnRlcjogWydtb3VzZS1ldmVudHMnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlpPT00pIHtcblx0XHRcdFx0XHR0aGlzLl96b29tU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fem9vbUVuZC5jb3B5KHRoaXMuX3pvb21TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5aT09NKSB7XG5cdFx0XHRcdFx0dGhpcy5fem9vbUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ21vdXNld2hlZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdHZhciBkaWZmID0gMDtcblx0XHRcdFx0aWYgKGV2ZW50LndoZWVsRGVsdGEpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cdFx0XHRcdFx0ZGlmZiA9IGV2ZW50LndoZWVsRGVsdGEgLyA0MDtcblx0XHRcdFx0fSBlbHNlIGlmIChldmVudC5kZXRhaWwpIHsgLy8gRmlyZWZveFxuXHRcdFx0XHRcdGRpZmYgPSAtZXZlbnQuZGV0YWlsIC8gMztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3pvb21TdGFydC55ICs9IGRpZmYgKiAwLjAxO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoU1RBUlRfRVZFTlQpO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKGUpID0+IHsgdGhpcy5tb3VzZXdoZWVsKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgKGUpID0+IHsgdGhpcy5tb3VzZXdoZWVsKGUpIH0pOyAvLyBmaXJlZm94XG5cblx0XHRcdH0pXG5cdFx0Lyogem9vbWluZyAqL1xuXHRcdFx0LmFkZCgnem9vbUNhbWVyYScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlRPVUNIX1pPT01fUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kO1xuXHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcih0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0IC8gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBmYWN0b3IgPSAxLjAgKyAoIHRoaXMuX3pvb21FbmQueSAtIHRoaXMuX3pvb21TdGFydC55ICkgKiB0aGlzLnpvb21TcGVlZDtcblx0XHRcdFx0XHRpZiAoZmFjdG9yICE9PSAxLjAgJiYgZmFjdG9yID4gMC4wKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcblx0XHRcdFx0XHRcdHRoaXMuX3pvb21TdGFydC5jb3B5KHRoaXMuX3pvb21FbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHpvb21pbmcgb3B0aW9ucyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuem9vbVNwZWVkID0gMS4yO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHBhbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdwYW4nLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZScsICdtb3VzZS1ldmVudHMnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlBBTikge1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuX3BhblN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlBBTikge1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHBhbm5pbmcgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gcGFuQ2FtZXJhXG5cdFx0XHRcdHZhciBtb3VzZUNoYW5nZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBwYW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLnBhbkNhbWVyYSA9IGZ1bmN0aW9uIHBhbkNhbWVyYSgpIHtcblxuXHRcdFx0XHRcdG1vdXNlQ2hhbmdlLmNvcHkodGhpcy5fcGFuRW5kKS5zdWIodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHRcdGlmIChtb3VzZUNoYW5nZS5sZW5ndGhTcSgpKSB7XG5cdFx0XHRcdFx0XHRtb3VzZUNoYW5nZS5tdWx0aXBseVNjYWxhcih0aGlzLl9leWUubGVuZ3RoKCkgKiB0aGlzLnBhblNwZWVkKTtcblx0XHRcdFx0XHRcdHBhbi5jb3B5KHRoaXMuX2V5ZSkuY3Jvc3ModGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLngpO1xuXHRcdFx0XHRcdFx0cGFuLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLnNldExlbmd0aCgtbW91c2VDaGFuZ2UueSkpO1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGQocGFuKTtcblx0XHRcdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLl9wYW5FbmQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHQvKiBwYW5uaW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnBhblNwZWVkID0gMC4zO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHpvb20gKyBwYW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCd6b29tK3BhbicsIHtcblx0XHRhZnRlcjogWyd6b29tJywgJ3BhbiddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLlRPVUNIX1pPT01fUEFOO1xuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSAwO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5fcGFuRW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHRoZSBUcmFja2JhbGxDb250cm9scyBjbGFzcyAodmFyaWF0aW9uIHBvaW50KSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0VEhSRUUuVHJhY2tiYWxsQ29udHJvbHMgPSBkbS52cCgnVHJhY2tiYWxsQ29udHJvbHMnLFxuXHRcdFx0VS5uZXdDbGFzcyhmdW5jdGlvbiBUcmFja2JhbGxDb250cm9scyhjb250cm9sbGVkT2JqZWN0LCBkb21FbGVtZW50ID0gZG9jdW1lbnQpIHtcblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgY29uc3RydWN0IG1ldGhvZCBwb3B1bGF0ZWQgYnkgZGVsdGFzICovXG5cdFx0XHRcdHRoaXMuY29uc3RydWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0LyogZXhwbGljaXRseSB1cGRhdGUgaW4gdGhlIGJlZ2lubmluZyAqL1xuXHRcdFx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0XHR9LCBPYmplY3QuY3JlYXRlKFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUpKVxuXHQpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25cIixcImNvbW1vbmpzXCI6XCJiYWNvblwiLFwiYW1kXCI6XCJiYWNvblwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1tYW51YWwtY29udHJvbHMuanMifQ==