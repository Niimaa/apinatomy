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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(10), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, defer) {
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
	      var deferred = defer();
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var $__0 = this;
	        var laterFn = (function() {
	          timeout = null;
	          deferred.resolve(func.apply(context || $__0, args));
	          deferred = defer();
	        });
	        clearTimeout(timeout);
	        timeout = setTimeout(laterFn, wait);
	        return deferred.promise;
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  return function defer() {
	    var resolve,
	        reject;
	    var promise = new P(function() {
	      resolve = arguments[0];
	      reject = arguments[1];
	    });
	    return {
	      resolve: resolve,
	      reject: reject,
	      promise: promise
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyODA1ZjlkMjlhOThjNjlkYmVhYyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQtbWFudWFsLWNvbnRyb2xzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25cIixcImNvbW1vbmpzXCI6XCJiYWNvblwiLFwiYW1kXCI6XCJiYWNvblwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL2RlZmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVUsd0JBQWtCLHdCQUFZLHdCQUE0Qix3QkFBNkIsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsTUFBSSxDQUFHLE1BQUk7QUFDdEksY0FBVyxDQUFDO0FBR1IsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRywwQkFBd0I7QUFDOUIsWUFBTyxDQUFHLEVBQUMsU0FBUSxDQUFDO0FBQUEsR0FDckIsQ0FBQyxDQUFDO0FBTUUsa0JBQVcsRUFBSTtBQUFFLFFBQUcsQ0FBRztBQUFHLFVBQUssQ0FBRztBQUFHLFNBQUksQ0FBRztBQUFBLEdBQUUsQ0FBQztBQUduRCxRQUFLLE9BQVEsQ0FBQyxrQ0FBaUMsQ0FBRyxVQUFVOztBQUczRCxRQUFHLFlBQWEsQ0FBQyw2QkFBNEIsQ0FBRyxFQUFFLE9BQU0sQ0FBRyxLQUFHLENBQUUsQ0FBQyxDQUFDO0FBRWxFLFFBQUcsR0FBSSxDQUFDLFlBQVcsQ0FBRyxLQUFHLENBQUMsUUFBUyxFQUFDLFNBQUM7QUE0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QUFJLElBQUksRUFBQyxDQUFDLFNBQVMsQ0FBRTtBQUM5QixhQUFNLEVBQUksVUFBUSxDQUFFLEVBQUMsQ0FBQztBQUN0QixZQUFLLEVBQUksVUFBUSxDQUFFLEVBQUMsQ0FBQztLQUN0QixDQUFDLENBQUM7QUFFRixVQUFPO0FBQ04sYUFBTSxDQUFHLFFBQU07QUFDZixZQUFLLENBQUcsT0FBSztBQUNiLGFBQU0sQ0FBRyxRQUFNO0FBQUEsS0FDaEIsQ0FBQztHQUNGLENBQUM7QUFFRixFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIiwgXCJibHVlYmlyZFwiLCBcImJhY29uXCIsIFwidHdlZW5qc1wiLCBcImRlbHRhLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcIkRlbHRhTW9kZWxcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDI4MDVmOWQyOWE5OGM2OWRiZWFjXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJ3RocmVlLWpzJywgJy4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcycsICcuL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanMnXSwgZnVuY3Rpb24gKCQsIFUsIFRIUkVFLCBCYWNvbikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZC1tYW51YWwtY29udHJvbHMnLFxuXHRcdHJlcXVpcmVzOiBbJ3RocmVlLWQnXVxuXHR9KTtcblxuXG5cdC8qIGNvbnN0YW50cyAqL1xuXHQvL3ZhciBFUFMgPSAwLjAwMDAwMTtcblx0Ly92YXIgU1RBVEUgPSB7IE5PTkU6IC0xLCBST1RBVEU6IDAsIFpPT006IDEsIFBBTjogMiwgVE9VQ0hfUk9UQVRFOiAzLCBUT1VDSF9aT09NX1BBTjogNCB9O1xuXHR2YXIgTU9VU0VfQlVUVE9OID0geyBMRUZUOiAxLCBNSURETEU6IDIsIFJJR0hUOiAzIH07XG5cblxuXHRwbHVnaW4uYXBwZW5kKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qIHRoZSAndGhyZWVETWFudWFsQ29udHJvbHNFbmFibGVkJyBwcm9wZXJ0eSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRE1hbnVhbENvbnRyb2xzRW5hYmxlZCcsIHsgaW5pdGlhbDogdHJ1ZSB9KTtcblxuXHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCB0cnVlKS5vblZhbHVlKCgpID0+IHtcblxuXHRcdFx0LyogaW5pdGlhbGl6YXRpb24gKi9cblx0XHRcdC8vdGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMyhcblx0XHRcdC8vXHRcdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ueCxcblx0XHRcdC8vXHRcdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ueSxcblx0XHRcdC8vXHRcdDBcblx0XHRcdC8vKTtcblx0XHRcdC8vdGhpcy5jYW1lcmEzRC5sb29rQXQodGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQpO1xuXHRcdFx0Ly90aGlzLl92ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHQvL3RoaXMuX2xhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHQvL3RoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuY2FtZXJhM0QucG9zaXRpb24pO1xuXHRcdFx0Ly90aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHQvL3RoaXMuX2V5ZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHQvL3RoaXMuX2V5ZS5zdWJWZWN0b3JzKHRoaXMuY2FtZXJhM0QucG9zaXRpb24sIHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblx0XHRcdC8vdGhpcy5fcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Ly90aGlzLl9yb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Ly90aGlzLl96b29tU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0Ly90aGlzLl96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdC8vdGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IDA7XG5cdFx0XHQvL3RoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMDtcblx0XHRcdC8vdGhpcy5fcGFuU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0Ly90aGlzLl9wYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0Ly90aGlzLl90YXJnZXRDb29yZGluYXRlczAgPSB0aGlzLl90YXJnZXRDb29yZGluYXRlcy5jbG9uZSgpO1xuXHRcdFx0Ly90aGlzLl9wb3NpdGlvbjAgPSB0aGlzLmNhbWVyYTNELnBvc2l0aW9uLmNsb25lKCk7XG5cdFx0XHQvL3RoaXMuX3VwMCA9IHRoaXMuY2FtZXJhM0QudXAuY2xvbmUoKTtcblxuXG5cdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXG5cblx0XHRcdC8qIHNjcmVlbiBwb3NpdGlvbiBhbmQgc2l6ZSAqLy8vIFRPRE86IHJlZmFjdG9yIC0gY3V0IG91dCB0aGUgbWlkZGxlbWFuXG5cdFx0XHR0aGlzLl9zY3JlZW4gPSB7fTtcblx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS5vblZhbHVlKChzaXplKSA9PiB7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IHNpemUud2lkdGg7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSBzaXplLmhlaWdodDtcblx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSBwYXJzZUZsb2F0KHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5jc3MoJ2xlZnQnKSk7XG5cdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgID0gcGFyc2VGbG9hdCh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuY3NzKCd0b3AnKSk7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuZ2V0TW91c2VPblNjcmVlbiA9IChwYWdlWCwgcGFnZVkpID0+IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKFxuXHRcdFx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gdGhpcy5fc2NyZWVuLndpZHRoLFxuXHRcdFx0XHRcdFx0KHBhZ2VZIC0gdGhpcy5fc2NyZWVuLnRvcCkgLyB0aGlzLl9zY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXG5cblx0XHRcdC8qIGNyZWF0aW5nIHZhcmlvdXMgZXZlbnQgc3RyZWFtcyAqL1xuXHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmFzRXZlbnRTdHJlYW0oJ2NvbnRleHRtZW51Jykub25WYWx1ZSgnLnByZXZlbnREZWZhdWx0Jyk7XG5cdFx0XHR2YXIgZHJhZ2dpbmcgPSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQubW91c2VEcmFnKHsgdGhyZXNob2xkOiA1IH0pLmZpbHRlcigoKSA9PiB0aGlzLnRocmVlRE1hbnVhbENvbnRyb2xzRW5hYmxlZCk7XG5cdFx0XHR2YXIga2V5ZG93biA9ICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdrZXlkb3duJykuZmlsdGVyKCgpID0+IHRoaXMudGhyZWVETWFudWFsQ29udHJvbHNFbmFibGVkKTtcblx0XHRcdHZhciBrZXl1cCA9ICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdrZXl1cCcpO1xuXHRcdFx0dmFyIHNjcm9sbGluZyA9IHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5tb3VzZVdoZWVsKCkuZmlsdGVyKCgpID0+IHRoaXMudGhyZWVETWFudWFsQ29udHJvbHNFbmFibGVkKTtcblx0XHRcdHZhciBidXR0b24gPSAoYikgPT4gKHttb3VzZURvd25FdmVudH0pID0+IChtb3VzZURvd25FdmVudC53aGljaCA9PT0gYik7XG5cdFx0XHR2YXIga2V5ID0gKGZyb20sIHRvKSA9PiAoZXZlbnQpID0+IChldmVudC53aGljaCA+PSBmcm9tICYmIGV2ZW50LndoaWNoIDw9ICh0byB8fCBmcm9tKSk7XG5cblxuXHRcdFx0Lyogcm90YXRpbmcgd2l0aCB0aGUgbGVmdCBtb3VzZSBidXR0b24gKi9cblx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdHRoaXMuX3JvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRkcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5MRUZUKSkub25WYWx1ZSgoe21vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudH0pID0+IHsgLy8gVE9ETzogdG91Y2hcblxuXHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoIW1vdXNlRG93bkV2ZW50Ll9wYXN0Rmlyc3QpIHtcblx0XHRcdFx0XHRtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0ID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKG1vdXNlRG93bkV2ZW50LnBhZ2VYLCBtb3VzZURvd25FdmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKG1vdXNlTW92ZUV2ZW50LnBhZ2VYLCBtb3VzZU1vdmVFdmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9KTtcblxuXHRcdFx0Lyogcm90YXRpbmcgd2l0aCB0aGUga2V5Ym9hcmQgKi9cblx0XHRcdHRoaXMubmV3UHJvcGVydHkoJ2N1cnJlbnRBcnJvd0tleScsIHtcblx0XHRcdFx0c291cmNlOiBrZXlkb3duLmZpbHRlcihrZXkoMzcsIDQwKSkuZmxhdE1hcExhdGVzdCgoa2V5ZG93bkV2ZW50KSA9PiBCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRcdFx0QmFjb24ub25jZShrZXlkb3duRXZlbnQud2hpY2gpLFxuXHRcdFx0XHRcdGtleXVwLmZpbHRlcihrZXkoa2V5ZG93bkV2ZW50LndoaWNoKSkubWFwKGZhbHNlKS50YWtlKDEpXG5cdFx0XHRcdF0pKSxcblx0XHRcdFx0aW5pdGlhbDogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5vbignY3VycmVudEFycm93S2V5Jykub25WYWx1ZSgodikgPT4geyBzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZSB9KTtcblxuXG5cdFx0XHQvKiB6b29taW5nIHdpdGggdGhlIG1pZGRsZSBtb3VzZSBidXR0b24gKi9cblx0XHRcdHRoaXMuX3pvb21TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHR0aGlzLl96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdGRyYWdnaW5nLmZpbHRlcihidXR0b24oTU9VU0VfQlVUVE9OLk1JRERMRSkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7XG5cblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlRG93bkV2ZW50LnBhZ2VYLCBtb3VzZURvd25FdmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3pvb21FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4obW91c2VNb3ZlRXZlbnQucGFnZVgsIG1vdXNlTW92ZUV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0pO1xuXHRcdFx0Lyogem9vbWluZyB3aXRoIHRoZSBzY3JvbGwtd2hlZWwgKi9cblx0XHRcdHNjcm9sbGluZy5vblZhbHVlKChldmVudCkgPT4ge1xuXG5cdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudDtcblxuXHRcdFx0XHR2YXIgZGlmZiA9IDA7XG5cblx0XHRcdFx0aWYgKGV2ZW50LndoZWVsRGVsdGEpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cdFx0XHRcdFx0ZGlmZiA9IGV2ZW50LndoZWVsRGVsdGEgLyA0MDtcblx0XHRcdFx0fSBlbHNlIGlmIChldmVudC5kZXRhaWwpIHsgLy8gRmlyZWZveFxuXHRcdFx0XHRcdGRpZmYgPSAtZXZlbnQuZGV0YWlsIC8gMztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3pvb21TdGFydC55ICs9IGRpZmYgKiAwLjAxO1xuXG5cdFx0XHR9KTtcblxuXG5cblxuXHRcdFx0LyogcGFubmluZyB3aXRoIHRoZSByaWdodCBtb3VzZSBidXR0b24gKi9cblx0XHRcdHRoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdHRoaXMuX3BhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRkcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5SSUdIVCkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7XG5cblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4obW91c2VEb3duRXZlbnQucGFnZVgsIG1vdXNlRG93bkV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlTW92ZUV2ZW50LnBhZ2VYLCBtb3VzZU1vdmVFdmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvKiB1cGRhdGluZyBhbGwgdGhlIHN0dWZmICovXG5cdFx0XHR0aGlzLl9leWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0dGhpcy5fcGFuU3BlZWQgPSAxLjA7XG5cdFx0XHR0aGlzLl9yb3RhdGVTcGVlZCA9IDEuMDtcblx0XHRcdHRoaXMuem9vbVNwZWVkID0gMS4wO1xuXHRcdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoKSA9PiB7XG5cblx0XHRcdFx0aWYgKHNvbWV0aGluZ0NoYW5nZWQgfHwgdGhpcy5jdXJyZW50QXJyb3dLZXkpIHtcblx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cblx0XHRcdFx0XHQvKiBzZXR1cCAqL1xuXHRcdFx0XHRcdHRoaXMuX2V5ZS5zdWJWZWN0b3JzKHRoaXMuY2FtZXJhM0QucG9zaXRpb24sIHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblxuXG5cdFx0XHRcdFx0LyogcGFubmluZyAqL1xuXHRcdFx0XHRcdCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR2YXIgbW91c2VDaGFuZ2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0XHRcdHZhciBwYW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHRcdFx0bW91c2VDaGFuZ2UuY29weSh0aGlzLl9wYW5FbmQpLnN1Yih0aGlzLl9wYW5TdGFydCk7IC8vIFRPRE86IGp1c3Qgc3RvcmUgdGhpcyBkaXJlY3RseT9cblx0XHRcdFx0XHRcdGlmIChtb3VzZUNoYW5nZS5sZW5ndGhTcSgpKSB7XG5cdFx0XHRcdFx0XHRcdG1vdXNlQ2hhbmdlLm11bHRpcGx5U2NhbGFyKHRoaXMuX2V5ZS5sZW5ndGgoKSAqIHRoaXMuX3BhblNwZWVkKTtcblx0XHRcdFx0XHRcdFx0cGFuLmNvcHkodGhpcy5fZXllKTtcblx0XHRcdFx0XHRcdFx0cGFuLmNyb3NzKHRoaXMuY2FtZXJhM0QudXApO1xuXHRcdFx0XHRcdFx0XHRwYW4uc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLngpO1xuXHRcdFx0XHRcdFx0XHRwYW4uYWRkKG9iamVjdFVwLmNvcHkodGhpcy5jYW1lcmEzRC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLnkpKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi5hZGQocGFuKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQuYWRkKHBhbik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5fcGFuRW5kKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdC8qIHJvdGF0aW5nIGJ5IG1vdXNlICovXG5cdFx0XHRcdFx0KCgpID0+IHtcblx0XHRcdFx0XHRcdHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0XHRcdHZhciBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0XHRcdFx0XHRcdHZhciBhbmdsZSA9IE1hdGguYWNvcyhcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5kb3QodGhpcy5fcm90YXRlRW5kKSAvXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQubGVuZ3RoKCkgL1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5sZW5ndGgoKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGlmIChhbmdsZSkge1xuXHRcdFx0XHRcdFx0XHRheGlzLmNyb3NzVmVjdG9ycyh0aGlzLl9yb3RhdGVTdGFydCwgdGhpcy5fcm90YXRlRW5kKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHRcdFx0XHRhbmdsZSAqPSB0aGlzLl9yb3RhdGVTcGVlZDtcblxuXHRcdFx0XHRcdFx0XHRxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoYXhpcywgLWFuZ2xlKTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLl9leWUuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNhbWVyYTNELnVwLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0XHQvKiByb3RhdGluZyBieSBrZXlib2FyZCAqL1xuXHRcdFx0XHRcdCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdFx0XHR2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdFx0XHRcdFx0XHR2YXIgYW5nbGUgPSAwLjAxNSAqIE1hdGguUEk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jdXJyZW50QXJyb3dLZXkgPT09IDM3KSB7XG5cdFx0XHRcdFx0XHRcdGF4aXMuc2V0WSgxKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5jdXJyZW50QXJyb3dLZXkgPT09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdGFuZ2xlID0gLWFuZ2xlO1xuXHRcdFx0XHRcdFx0XHRheGlzLnNldFkoMSk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudEFycm93S2V5ID09PSAzOCkge1xuXHRcdFx0XHRcdFx0XHRheGlzLnNldFgoMSk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudEFycm93S2V5ID09PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IC1hbmdsZTtcblx0XHRcdFx0XHRcdFx0YXhpcy5zZXRYKDEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YW5nbGUgPSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGFuZ2xlKSB7XG5cdFx0XHRcdFx0XHRcdGF4aXMubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0XHRcdFx0YW5nbGUgKj0gdGhpcy5fcm90YXRlU3BlZWQ7XG5cblx0XHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLl9yb3RhdGVFbmQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0Lyogem9vbWluZyAqL1xuXHRcdFx0XHRcdCgoKSA9PiB7XG5cdFx0XHRcdFx0XHQvL2lmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblx0XHRcdFx0XHRcdC8vXHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdFx0XHQvL1x0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCk7XG5cdFx0XHRcdFx0XHQvL30gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL31cblxuXHRcdFx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggdGhpcy5fem9vbUVuZC55IC0gdGhpcy5fem9vbVN0YXJ0LnkgKSAqIHRoaXMuem9vbVNwZWVkOyAvLyBzZXQgZmFjdG9yXG5cdFx0XHRcdFx0XHRpZiAoZmFjdG9yICE9PSAxLjAgJiYgZmFjdG9yID4gMC4wKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl96b29tU3RhcnQuY29weSh0aGlzLl96b29tRW5kKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0pKCk7XG5cblxuXG5cdFx0XHRcdFx0LyogYnJlYWtkb3duICovXG5cdFx0XHRcdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi5hZGRWZWN0b3JzKHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0LCB0aGlzLl9leWUpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNhbWVyYTNELmxvb2tBdCh0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cblxuXG5cblxuXHRcdFx0fSk7XG5cblxuXHRcdFx0Ly8vKiBwYW5uaW5nIHdpdGggdGhlIHJpZ2h0IG1vdXNlIGJ1dHRvbiAqL1xuXHRcdFx0Ly9kcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5SSUdIVCkpLm9uVmFsdWUoKHttb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnR9KSA9PiB7XG5cdFx0XHQvL1xuXHRcdFx0Ly9cdGlmICghbW91c2VEb3duRXZlbnQuX2NhbWVyYVBvc2l0aW9uMCkge1xuXHRcdFx0Ly9cdFx0bW91c2VEb3duRXZlbnQuX2NhbWVyYVBvc2l0aW9uMCA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuY29weSh0aGlzLmNhbWVyYTNELnBvc2l0aW9uKTtcblx0XHRcdC8vXHR9XG5cdFx0XHQvL1xuXHRcdFx0Ly9cdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ueCA9IG1vdXNlRG93bkV2ZW50Ll9jYW1lcmFQb3NpdGlvbjAueCArIG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHQvL1x0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi55ID0gbW91c2VEb3duRXZlbnQuX2NhbWVyYVBvc2l0aW9uMC55ICsgbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdC8vXG5cdFx0XHQvL30pO1xuXG5cblxuXHRcdH0pO1xuXHR9KTtcblxuXG5cblxuXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsJywgZnVuY3Rpb24gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKHBhZ2VYLCBwYWdlWSkge1xuXHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdG1vdXNlT25CYWxsLnNldChcblx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLndpZHRoICogMC41IC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gKHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSksXG5cdFx0XHRcdCh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41ICsgdGhpcy5fc2NyZWVuLnRvcCAtIHBhZ2VZKSAvICh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41KSxcblx0XHRcdFx0MC4wXG5cdFx0KTtcblxuXHRcdHZhciBsZW5ndGggPSBtb3VzZU9uQmFsbC5sZW5ndGgoKTtcblxuXHRcdGlmIChsZW5ndGggPiAxLjApIHtcblx0XHRcdG1vdXNlT25CYWxsLm5vcm1hbGl6ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZXllLmNvcHkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikuc3ViKHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblxuXHRcdHZlY3Rvci5jb3B5KHRoaXMuY2FtZXJhM0QudXApLnNldExlbmd0aChtb3VzZU9uQmFsbC55KTtcblx0XHR2ZWN0b3IuYWRkKG9iamVjdFVwLmNvcHkodGhpcy5jYW1lcmEzRC51cCkuY3Jvc3ModGhpcy5fZXllKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueCkpO1xuXHRcdHZlY3Rvci5hZGQodGhpcy5fZXllLnNldExlbmd0aChtb3VzZU9uQmFsbC56KSk7XG5cblx0XHRyZXR1cm4gdmVjdG9yO1xuXHR9KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdC8vcGx1Z2luLmFwcGVuZCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdC8vXHR0aGlzLm9uKCd0aHJlZURNb2RlJywgdHJ1ZSkub25WYWx1ZSgoKSA9PiB7XG5cdC8vXG5cdC8vXG5cdC8vXG5cdC8vXHRcdC8qIGltcGxlbWVudGluZyB0aGUgY29udHJvbHMgKi9cblx0Ly9cdFx0dmFyIGNvbnRyb2xzID0gbmV3IFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzKHRoaXMuY2FtZXJhM0QsIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudFswXSk7XG5cdC8vXHRcdFUuZXh0ZW5kKGNvbnRyb2xzLCB7XG5cdC8vXHRcdFx0cm90YXRlU3BlZWQ6IDEuMCxcblx0Ly9cdFx0XHR6b29tU3BlZWQ6IDEuMixcblx0Ly9cdFx0XHRwYW5TcGVlZDogMC44XG5cdC8vXHRcdH0pO1xuXHQvL1x0XHR0aGlzLm9uKCczZC1yZW5kZXInKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5hc3NpZ24oY29udHJvbHMsICd1cGRhdGUnKTtcblx0Ly9cdFx0dGhpcy5vbignc2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpLmFzc2lnbihjb250cm9scywgJ2hhbmRsZVJlc2l6ZScpO1xuXHQvL1x0XHR0aGlzLm9uKCd0aHJlZURDb250cm9sc0VuYWJsZWQnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChlbmFibGVkKSA9PiB7IGNvbnRyb2xzLmVuYWJsZWQgPSBlbmFibGVkIH0pO1xuXHQvL1xuXHQvL1x0fSk7XG5cdC8vfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGhyZWUtZC1tYW51YWwtY29udHJvbHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJy4vZGVmZXIuanMnLCAnYmFjb24nXSwgKFAsIGRlZmVyKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuIEV2ZXJ5IGludm9jYXRpb24gcmV0dXJucyBhIHByb21pc2UgdG8gdGhlIGV2ZW50dWFsIHJlc3VsdC5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncykpO1xuXHRcdFx0XHRcdGRlZmVycmVkID0gZGVmZXIoKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRmaW5kSW5kZXgoYXJyYXksIHByZWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkgeyByZXR1cm4gaSB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblxuXHRcdC8vIHRoaXMgYG1lbW9pemVgIGZ1bmN0aW9uIGlzIFNMT1csIGFzIGl0IHVzZXMgbGluZWFyIHNlYXJjaFxuXHRcdG1lbW9pemUoZm4pIHtcblx0XHRcdHZhciBrZXlzID0gW107XG5cdFx0XHR2YXIgY2FjaGUgPSBbXTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBjaGVjayB0aGUgY2FjaGUgKi9cblx0XHRcdFx0dmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGtleSkgPT4ga2V5LmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcmdzW2ldKSk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7IHJldHVybiBjYWNoZVtpbmRleF0gfVxuXG5cdFx0XHRcdC8qIG5vIGNhY2hlIGhpdDsgY29tcHV0ZSB2YWx1ZSwgc3RvcmUgYW5kIHJldHVybiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGtleXMucHVzaChhcmdzKTtcblx0XHRcdFx0Y2FjaGUucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIHNvcnRPZkVxdWFsID0gKGEsIGIpID0+IChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdiYWNvbicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbiwgVFdFRU4pIHtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIG1ldGhvZCB3b3JrcyB3aXRoIGV2ZW50cyB0aGF0IGNhbiBoYXZlIG9ubHkgb25lIHN1YnNjcmliZXIsXG5cdC8vIHRoYXQgY2FuIGJlIHVuLXN1YnNjcmliZWQgYnkgc2V0dGluZyB0aGUgc3Vic2NyaWJlciB0byBgbnVsbGAuXG5cdC8vIFRoaXMgZnVuY3Rpb24gaXMgbWVtb2l6ZWQsIHNvIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBpcyB0YWtlbixcblx0Ly8gYW5kIHRoZSBzYW1lIHN0cmVhbSBmb3IgaXQgcmV0dXJuZWQgZm9yIGVhY2ggcmVxdWVzdC5cblx0QmFjb24uZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdG9iai5vbihldmVudE5hbWUsICh2KSA9PiB7IHNpbmsobmV3IEJhY29uLk5leHQodikpIH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHRCYWNvbi5hbmltYXRpb25GcmFtZXMgPSBVLm1lbW9pemUoZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHQoKGYpID0+IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkpO1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cblx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdHZhciBpdGVyYXRpb25GbiA9ICgpID0+IHtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0c2luaygpO1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbihpdGVyYXRpb25Gbik7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBzdGFydCBpdCBub3cgKi9cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdFx0c2luayhuZXcgQmFjb24uRW5kKCkpO1xuXHRcdFx0fTtcblxuXHRcdH0pO1xuXHR9KTtcblxuXG5cdEJhY29uLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogYSBsb2NhbCBmdW5jdGlvbiB0byBwbHVnIGluIG90aGVyIHN0cmVhbXMsIGtlZXBpbmcgdHJhY2sgaW4gb3JkZXIgdG8gJ2VuZCcgdGhlIGJ1cyAqL1xuXHRcdHZhciBhZGRTdHJlYW0gPSAoKCkgPT4ge1xuXHRcdFx0dmFyIGNoYWluZWRTdHJlYW1zID0gMDtcblx0XHRcdHJldHVybiAoc3RyZWFtKSA9PiB7XG5cdFx0XHRcdGNoYWluZWRTdHJlYW1zICs9IDE7XG5cdFx0XHRcdGJ1cy5wbHVnKHN0cmVhbSk7XG5cdFx0XHRcdHN0cmVhbS5vbkVuZCgoKSA9PiB7XG5cdFx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgLT0gMTtcblx0XHRcdFx0XHRpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHsgYnVzLmVuZCgpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cblx0XHQvKiBtYWluIHN0cmVhbSAqL1xuXHRcdGFkZFN0cmVhbShCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRpZiAoZWFzaW5nKSB7IHR3LmVhc2luZyhlYXNpbmcpIH1cblx0XHRcdGlmIChkZWxheSkgIHsgdHcuZGVsYXkoZGVsYXkpIH1cblx0XHRcdHR3Lm9uVXBkYXRlKGZ1bmN0aW9uICgpIHsgc2luayhuZXcgQmFjb24uTmV4dCgoKSA9PiB0aGlzKSkgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKCgpID0+IHsgc2luayhuZXcgQmFjb24uRW5kKCkpIH0pO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0QmFjb24ua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXljb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXljb2RlKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0QmFjb24ubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgb3BlbiA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgY2xvc2UgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyKHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZShoYW5kbGVyLCAoKSA9PiB7XG5cdFx0XHRvcGVuLnB1c2goKTtcblx0XHRcdHdhbnRlZEJ1cy5wdXNoKGZhbHNlKTtcblx0XHRcdGNsb3NlLnB1c2goKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwKHRydWUpKTtcblx0XHRcdHJldHVybiBjbG9zZS5zdGFydFdpdGgodHJ1ZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbChvcGVuKS5yZWR1Y2UoW10sIGFjY3VtdWxhdG9yKS5mbGF0TWFwKEJhY29uLmZyb21BcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoaXMgcmVzdHJpY3RzIGEgZ2l2ZW4gc3RyZWFtIHRvIGEgd3JhcHBlciBzdHJlYW0gY3JlYXRlZCB3aXRoIHRoZSBtZXRob2QgYWJvdmUuXG5cdC8vIEFsbCBpdHMgb3JpZ2luYWwgZXZlbnRzIGFyZSBub3cgZmlyZWQgaW5zaWRlIHRoZSBwcm92aWRlZCB3aW5kb3cuIFNldCBgb3B0aW9ucy5idWZmZXJgXG5cdC8vIHRvIGB0cnVlYCBpZiBhbGwgaXRzIGV2ZW50cyBzaG91bGQgYmUgYnVmZmVyZWQgYW5kIHJlbGVhc2VkIGluc2lkZSB0aGUgbmV4dCB3aW5kb3cuXG5cdC8vIE90aGVyd2lzZSwgb25seSB0aGUgbGFzdCBldmVudCBpcyByZXRhaW5lZC5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIFRoaXMgaXMgYSBjaGVhcCB2ZXJzaW9uIG9mIHRoZSBsaW1pdGVyIGRlZmluZWQgYWJvdmUuIFRPRE86IHVzZSB0aGUgbGltaXRlciB3aGVyZSB0aGlzIGlzIG5vdyB1c2VkXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2gobmV3IEJhY29uLk5leHQoKCkgPT4gdmFsdWUpKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG5cdFx0XHRcdFx0YnVmZmVyID0gW107XG5cdFx0XHRcdFx0c2luayhvbGRCdWZmZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnN1YnNjcmliZSgoKT0+e30pO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdCQuZm4ubW91c2VEcmFnID0gZnVuY3Rpb24gbW91c2VEcmFnKHt0aHJlc2hvbGR9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKS50YWtlVW50aWwoJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2V1cCcpKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbS5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gQmFjb247XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2JhY29uLWFuZC1lZ2dzLmpzXG4gKiovIiwiLyoqXG4gKiBAYXV0aG9yIEViZXJoYXJkIEdyYWV0aGVyICAgICAoaHR0cDovL2VncmFldGhlci5jb20pXG4gKiBAYXV0aG9yIE1hcmsgTHVuZGluICAgICAgICAgICAoaHR0cDovL21hcmstbHVuZGluLmNvbSlcbiAqIEBhdXRob3IgTWljaGllbCBIZWx2ZW5zdGVpam4gIChodHRwOi8vbWhlbHZlbnMubmV0KVxuICovXG5cbmRlZmluZShbJ2pxdWVyeScsICd0aHJlZS1qcycsICdkZWx0YS1qcycsICcuL21pc2MuanMnXSwgKCQsIFRIUkVFLCBEZWx0YU1vZGVsLCBVKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGNvbnN0YW50cyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgU1RBVEUgPSB7IE5PTkU6IC0xLCBST1RBVEU6IDAsIFpPT006IDEsIFBBTjogMiwgVE9VQ0hfUk9UQVRFOiAzLCBUT1VDSF9aT09NX1BBTjogNCB9O1xuXHR2YXIgQ0hBTkdFX0VWRU5UID0geyB0eXBlOiAnY2hhbmdlJyB9O1xuXHR2YXIgU1RBUlRfRVZFTlQgID0geyB0eXBlOiAnc3RhcnQnIH07XG5cdHZhciBFTkRfRVZFTlQgICAgPSB7IHR5cGU6ICdlbmQnIH07XG5cblxuXHQvKiBkZWx0YSBtb2RlbCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdHZhciBkbSA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cblxuXHQvKiBjb3JlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnY29yZScsIHtcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogJ2NvbnN0cnVjdCcgbWV0aG9kIGNvcmUgKi9cblx0XHRcdC5hZGQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uIChjb250cm9sbGVkT2JqZWN0LCBkb21FbGVtZW50KSB7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QgPSBjb250cm9sbGVkT2JqZWN0O1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblx0XHRcdFx0dGhpcy5fc2NlbmUgPSBjb250cm9sbGVkT2JqZWN0LnBhcmVudDtcblx0XHRcdH0pXG5cdFx0LyogQVBJICovXG5cdFx0XHQuYXBwZW5kKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0fSlcblx0XHQvKiBwcml2YXRlIGZpZWxkcyAqL1xuXHRcdFx0LmFwcGVuZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fdmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdHRoaXMuX2V5ZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwO1xuXHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cdFx0XHRcdHRoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fc2NyZWVuID0geyBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMwID0gdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY2xvbmUoKTtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb24wID0gdGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdFx0XHR0aGlzLl91cDAgPSB0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNsb25lKCk7XG5cblxuXG5cdFx0XHRcdHZhciBuZXdIZWxwZXIgPSAobmFtZSwgb2JqLCBjb2xvcikgPT4ge1xuXHRcdFx0XHRcdHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg1LCA2NCwgNjQpO1xuXHRcdFx0XHRcdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGNvbG9yIH0pO1xuXHRcdFx0XHRcdHZhciBzcGhlcmUgPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cdFx0XHRcdFx0dGhpcy5fc2NlbmUuYWRkKHNwaGVyZSk7XG5cdFx0XHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0XHRcdHNwaGVyZS5wb3NpdGlvbi5jb3B5KG9iaik7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Ly90aGlzLl9yZWZyZXNoSGVscGVyMSA9IG5ld0hlbHBlcignZXllJywgdGhpcy5fZXllLCAweGZmMDAwMCk7XG5cdFx0XHRcdHRoaXMuX3JlZnJlc2hIZWxwZXIyID0gbmV3SGVscGVyKCd0YXJnZXQnLCB0aGlzLl90YXJnZXRDb29yZGluYXRlcywgMHgwMGZmMDApO1xuXG5cblx0XHRcdH0pXG5cdFx0LyogcHVibGljIG1ldGhvZHMgKi9cblx0XHRcdC5hZGQoJ3Jlc2V0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcy5jb3B5KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzMCk7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uY29weSh0aGlzLl9wb3NpdGlvbjApO1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNvcHkodGhpcy5fdXAwKTtcblxuXHRcdFx0XHR0aGlzLl92ZWxvY2l0eS5zZXQoMCwgMCwgMCk7XG5cblx0XHRcdFx0dGhpcy5fZXllLnN1YlZlY3RvcnModGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbiwgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXHRcdFx0XHR0aGlzLl9yZWZyZXNoSGVscGVyMigpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ0hBTkdFX0VWRU5UKTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdFx0fSkuYWRkKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZXllLnN1YlZlY3RvcnModGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbiwgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMucm90YXRlQ2FtZXJhKCk7XG5cdFx0XHRcdHRoaXMuem9vbUNhbWVyYSgpO1xuXHRcdFx0XHR0aGlzLnBhbkNhbWVyYSgpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uYWRkVmVjdG9ycyh0aGlzLl90YXJnZXRDb29yZGluYXRlcywgdGhpcy5fZXllKTtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0Lmxvb2tBdCh0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2xhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKSA+IEVQUykge1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDSEFOR0VfRVZFTlQpO1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fcmVmcmVzaEhlbHBlcjIoKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmFkZCh0aGlzLl92ZWxvY2l0eSk7XG5cdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5sb29rQXQodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pO1xuXG5cdFx0XHRcdFx0dGhpcy5fcmVmcmVzaEhlbHBlcjIoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmFkZCgnaGFuZGxlUmVzaXplJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9kb21FbGVtZW50ID09PSBkb2N1bWVudCkge1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5sZWZ0ID0gMDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4udG9wID0gMDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4uaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBib3ggPSB0aGlzLl9kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdC8vIGFkanVzdG1lbnRzIGNvbWUgZnJvbSBzaW1pbGFyIGNvZGUgaW4gdGhlIGpxdWVyeSBvZmZzZXQoKSBmdW5jdGlvblxuXHRcdFx0XHRcdHZhciBkID0gdGhpcy5fZG9tRWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ubGVmdCA9IGJveC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0IC0gZC5jbGllbnRMZWZ0O1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgPSBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gZC5jbGllbnRUb3A7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLndpZHRoID0gYm94LndpZHRoO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSBib3guaGVpZ2h0O1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cblx0LyogbW91c2UgZXZlbnQgbWV0aG9kIGNvcmVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ21vdXNlLWV2ZW50cycsIHtcblx0XHRhZnRlcjogWydjb3JlJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLk5PTkUpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IHtcblx0XHRcdFx0XHRcdDA6IFNUQVRFLlJPVEFURSxcblx0XHRcdFx0XHRcdDE6IFNUQVRFLlpPT00sXG5cdFx0XHRcdFx0XHQyOiBTVEFURS5QQU5cblx0XHRcdFx0XHR9W2V2ZW50LmJ1dHRvbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgbW91c2Vtb3ZlID0gKGUpID0+IHsgdGhpcy5tb3VzZW1vdmUoZSkgfTtcblx0XHRcdFx0dmFyIG1vdXNldXAgPSAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KEVORF9FVkVOVCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cblx0XHRcdH0pLmFkZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cblx0XHRcdH0pLmFkZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoIDwgMSB8fCBldmVudC50b3VjaGVzLmxlbmd0aCA+IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoU1RBUlRfRVZFTlQpO1xuXG5cdFx0XHR9KS5hZGQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoIDwgMSB8fCBldmVudC50b3VjaGVzLmxlbmd0aCA+IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KEVORF9FVkVOVCk7XG5cblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBnZXRNb3VzZU9uU2NyZWVuXG5cblx0XHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuZ2V0TW91c2VPblNjcmVlbiA9IGZ1bmN0aW9uIGdldE1vdXNlT25TY3JlZW4ocGFnZVgsIHBhZ2VZKSB7XG5cdFx0XHRcdFx0dmVjdG9yLnNldChcblx0XHRcdFx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gdGhpcy5fc2NyZWVuLndpZHRoLFxuXHRcdFx0XHRcdFx0XHQocGFnZVkgLSB0aGlzLl9zY3JlZW4udG9wKSAvIHRoaXMuX3NjcmVlbi5oZWlnaHRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiB2ZWN0b3I7XG5cdFx0XHRcdH07XG5cblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBnZXRNb3VzZVByb2plY3Rpb25PbkJhbGxcblx0XHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBtb3VzZU9uQmFsbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsID0gZnVuY3Rpb24gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKHBhZ2VYLCBwYWdlWSkge1xuXG5cdFx0XHRcdFx0bW91c2VPbkJhbGwuc2V0KFxuXHRcdFx0XHRcdFx0XHQocGFnZVggLSB0aGlzLl9zY3JlZW4ud2lkdGggKiAwLjUgLSB0aGlzLl9zY3JlZW4ubGVmdCkgLyAodGhpcy5fc2NyZWVuLndpZHRoICogMC41KSxcblx0XHRcdFx0XHRcdFx0KHRoaXMuX3NjcmVlbi5oZWlnaHQgKiAwLjUgKyB0aGlzLl9zY3JlZW4udG9wIC0gcGFnZVkpIC8gKHRoaXMuX3NjcmVlbi5oZWlnaHQgKiAwLjUpLFxuXHRcdFx0XHRcdFx0XHQwLjBcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0dmFyIGxlbmd0aCA9IG1vdXNlT25CYWxsLmxlbmd0aCgpO1xuXG5cdFx0XHRcdFx0aWYgKGxlbmd0aCA+IDEuMCkge1xuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwubm9ybWFsaXplKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1vdXNlT25CYWxsLnogPSBNYXRoLnNxcnQoMS4wIC0gbGVuZ3RoICogbGVuZ3RoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl9leWUuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKS5zdWIodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdFx0dmVjdG9yLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKC1tb3VzZU9uQmFsbC55KTtcblx0XHRcdFx0XHR2ZWN0b3IuYWRkKG9iamVjdFVwLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuY3Jvc3ModGhpcy5fZXllKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueCkpO1xuXHRcdFx0XHRcdHZlY3Rvci5hZGQodGhpcy5fZXllLnNldExlbmd0aChtb3VzZU9uQmFsbC56KSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdFx0XHRcdH07XG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7IHRoaXMubW91c2Vkb3duKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4geyB0aGlzLnRvdWNoc3RhcnQoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHsgdGhpcy50b3VjaG1vdmUoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4geyB0aGlzLnRvdWNoZW5kKGUpIH0pO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIGtleWJvYXJkIGV2ZW50IG1ldGhvZCBjb3JlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdrZXlib2FyZC1ldmVudHMnLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZSddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ2tleWJvYXJkVmVsb2NpdHknLCAoKSA9PiAxMClcblx0XHRcdC5hZGQoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLl9zdGF0ZSAhPT0gU1RBVEUuTk9ORSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdHZhciBkID0gdGhpcy5rZXlib2FyZFZlbG9jaXR5KCk7XG5cdFx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRcdGNhc2UgMzc6IHsgdGhpcy5fdmVsb2NpdHkueCA9ICBkIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzODogeyB0aGlzLl92ZWxvY2l0eS55ID0gIGQgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDM5OiB7IHRoaXMuX3ZlbG9jaXR5LnggPSAtZCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgNDA6IHsgdGhpcy5fdmVsb2NpdHkueSA9IC1kIH0gYnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCdrZXl1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRcdGNhc2UgMzc6IHsgdGhpcy5fdmVsb2NpdHkueCA9IDAgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDM4OiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAwIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzOTogeyB0aGlzLl92ZWxvY2l0eS54ID0gMCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgNDA6IHsgdGhpcy5fdmVsb2NpdHkueSA9IDAgfSBicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHQkKHdpbmRvdykub24oJ2tleWRvd24nLCAoZSkgPT4geyB0aGlzLmtleWRvd24oZSkgfSk7XG5cdFx0XHRcdCQod2luZG93KS5vbigna2V5dXAnLCAgIChlKSA9PiB7IHRoaXMua2V5dXAoZSkgICB9KTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiByb3RhdGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgncm90YXRlJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnLCAnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5fcm90YXRlU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHJvdGF0aW5nICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIHJvdGF0ZUNhbWVyYVxuXHRcdFx0XHR2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0XHRcdFx0dGhpcy5yb3RhdGVDYW1lcmEgPSBmdW5jdGlvbiByb3RhdGVDYW1lcmEoKSB7XG5cblx0XHRcdFx0XHR2YXIgYW5nbGUgPSBNYXRoLmFjb3MoXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmRvdCh0aGlzLl9yb3RhdGVFbmQpIC9cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQubGVuZ3RoKCkgL1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQubGVuZ3RoKClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChhbmdsZSkge1xuXHRcdFx0XHRcdFx0YXhpcy5jcm9zc1ZlY3RvcnModGhpcy5fcm90YXRlU3RhcnQsIHRoaXMuX3JvdGF0ZUVuZCkubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0XHRcdGFuZ2xlICo9IHRoaXMucm90YXRlU3BlZWQ7XG5cblx0XHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9leWUuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH07XG5cdFx0XHR9KVxuXHRcdC8qIHJvdGF0aW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHpvb20gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCd6b29tJywge1xuXHRcdGFmdGVyOiBbJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuWk9PTSkge1xuXHRcdFx0XHRcdHRoaXMuX3pvb21TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5fem9vbVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlpPT00pIHtcblx0XHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgnbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0dmFyIGRpZmYgPSAwO1xuXHRcdFx0XHRpZiAoZXZlbnQud2hlZWxEZWx0YSkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblx0XHRcdFx0XHRkaWZmID0gZXZlbnQud2hlZWxEZWx0YSAvIDQwO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LmRldGFpbCkgeyAvLyBGaXJlZm94XG5cdFx0XHRcdFx0ZGlmZiA9IC1ldmVudC5kZXRhaWwgLyAzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LnkgKz0gZGlmZiAqIDAuMDE7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCAoZSkgPT4geyB0aGlzLm1vdXNld2hlZWwoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCAoZSkgPT4geyB0aGlzLm1vdXNld2hlZWwoZSkgfSk7IC8vIGZpcmVmb3hcblxuXHRcdFx0fSlcblx0XHQvKiB6b29taW5nICovXG5cdFx0XHQuYWRkKCd6b29tQ2FtZXJhJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdFx0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggdGhpcy5fem9vbUVuZC55IC0gdGhpcy5fem9vbVN0YXJ0LnkgKSAqIHRoaXMuem9vbVNwZWVkO1xuXHRcdFx0XHRcdGlmIChmYWN0b3IgIT09IDEuMCAmJiBmYWN0b3IgPiAwLjApIHtcblx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXHRcdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5fem9vbUVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0Lyogem9vbWluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy56b29tU3BlZWQgPSAxLjI7XG5cblx0XHRcdH0pO1xuXG5cblx0LyogcGFuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3BhbicsIHtcblx0XHRhZnRlcjogWydjb3JlJywgJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0LyogcGFubmluZyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBwYW5DYW1lcmFcblx0XHRcdFx0dmFyIG1vdXNlQ2hhbmdlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMucGFuQ2FtZXJhID0gZnVuY3Rpb24gcGFuQ2FtZXJhKCkge1xuXG5cdFx0XHRcdFx0bW91c2VDaGFuZ2UuY29weSh0aGlzLl9wYW5FbmQpLnN1Yih0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdFx0aWYgKG1vdXNlQ2hhbmdlLmxlbmd0aFNxKCkpIHtcblx0XHRcdFx0XHRcdG1vdXNlQ2hhbmdlLm11bHRpcGx5U2NhbGFyKHRoaXMuX2V5ZS5sZW5ndGgoKSAqIHRoaXMucGFuU3BlZWQpO1xuXHRcdFx0XHRcdFx0cGFuLmNvcHkodGhpcy5fZXllKS5jcm9zcyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueCk7XG5cdFx0XHRcdFx0XHRwYW4uYWRkKG9iamVjdFVwLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKC1tb3VzZUNoYW5nZS55KSk7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuYWRkKHBhbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuX3BhbkVuZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH07XG5cdFx0XHR9KVxuXHRcdC8qIHBhbm5pbmcgb3B0aW9ucyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMucGFuU3BlZWQgPSAwLjM7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyogem9vbSArIHBhbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3pvb20rcGFuJywge1xuXHRcdGFmdGVyOiBbJ3pvb20nLCAncGFuJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuVE9VQ0hfWk9PTV9QQU47XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSB0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuX3BhblN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLl9wYW5FbmQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cblx0LyogdGhlIFRyYWNrYmFsbENvbnRyb2xzIGNsYXNzICh2YXJpYXRpb24gcG9pbnQpICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRUSFJFRS5UcmFja2JhbGxDb250cm9scyA9IGRtLnZwKCdUcmFja2JhbGxDb250cm9scycsXG5cdFx0XHRVLm5ld0NsYXNzKGZ1bmN0aW9uIFRyYWNrYmFsbENvbnRyb2xzKGNvbnRyb2xsZWRPYmplY3QsIGRvbUVsZW1lbnQgPSBkb2N1bWVudCkge1xuXG5cdFx0XHRcdC8qIGFwcGx5IHRoZSBjb25zdHJ1Y3QgbWV0aG9kIHBvcHVsYXRlZCBieSBkZWx0YXMgKi9cblx0XHRcdFx0dGhpcy5jb25zdHJ1Y3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdFx0XHQvKiBleHBsaWNpdGx5IHVwZGF0ZSBpbiB0aGUgYmVnaW5uaW5nICovXG5cdFx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cblx0XHRcdH0sIE9iamVjdC5jcmVhdGUoVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSkpXG5cdCk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24gKFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcblx0XHR2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuXHRcdHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0cmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuXHRcdH0pO1xuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuXHRcdFx0cmVqZWN0OiByZWplY3QsXG5cdFx0XHRwcm9taXNlOiBwcm9taXNlXG5cdFx0fTtcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlZmVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLW1hbnVhbC1jb250cm9scy5qcyJ9