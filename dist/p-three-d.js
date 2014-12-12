(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("bacon"), require("tweenjs"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "bacon", "tweenjs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("bacon"), require("tweenjs")) : factory(root["jQuery"], root["THREE"], root["P"], root["Bacon"], root["TWEEN"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, Bacon) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d',
	    requires: ['position-tracking', 'tile-hidden', 'animation-loop']
	  });
	  function browserSupport() {
	    var canvas;
	    try {
	      canvas = $('<canvas>');
	      return !!(canvas[0].getContext('webgl') || canvas[0].getContext('experimental-webgl'));
	    } catch (__) {
	      return false;
	    } finally {
	      canvas = undefined;
	    }
	  }
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    if (!browserSupport()) {
	      console.warn("This browser doesn't seem to have WebGL support.");
	      return;
	    }
	    this.newProperty('threeDCanvasElement');
	    this.on('threeDCanvasElement').slidingWindow(2).map('.reverse').onValues((function(newCanvas, oldCanvas) {
	      if (oldCanvas) {
	        oldCanvas.removeClass('three-d-canvas');
	      }
	      if (newCanvas) {
	        newCanvas.addClass('three-d-canvas');
	      }
	    }));
	    this.threeDCanvasElement = this.options.threeDCanvasElement;
	    this.newProperty('threeDMode', {initial: U.isDefined(this.options.threeDCanvasElement)});
	    this.newProperty('threeDCanvasSize');
	    ((function(cache) {
	      $__0.threeDCanvasSize = cache();
	      cache.onChange((function(newSize) {
	        $__0.threeDCanvasSize = newSize;
	      }));
	      ($__0.options.canvasResizeEvent || $(window).resize.bind($(window)))(cache);
	    }))(U.cached({
	      retrieve: (function() {
	        return ($__0.threeDCanvasElement && new U.Size($__0.threeDCanvasElement.height(), $__0.threeDCanvasElement.width()));
	      }),
	      isEqual: U.Size.equals
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newEvent('3d-render');
	    this.on('threeDMode', true).onValue((function() {
	      var onThreeDModeOff = $__0.on('threeDMode').value(false).take(1);
	      $__0._p_threeD_scene = new THREE.Scene();
	      onThreeDModeOff.onValue((function() {
	        delete $__0._p_threeD_scene;
	      }));
	      $__0.camera3D = new THREE.PerspectiveCamera(60, $__0.threeDCanvasSize.width / $__0.threeDCanvasSize.height, 1, 10000);
	      $__0.camera3D.position.z = 1000;
	      $__0.camera3D.userData.target = new THREE.Vector3().copy($__0.camera3D.position).setZ(0);
	      $__0.camera3D.lookAt($__0.camera3D.userData.target);
	      onThreeDModeOff.onValue((function() {
	        delete $__0.camera3D;
	      }));
	      $__0.on('threeDCanvasSize').takeWhile($__0.on('threeDMode')).onValue((function(canvasSize) {
	        $__0.camera3D.aspect = canvasSize.width / canvasSize.height;
	        $__0.camera3D.position.normalize().multiplyScalar(canvasSize.height / Math.tan(THREE.Math.degToRad($__0.camera3D.fov) / 2) / 2);
	        $__0.camera3D.updateProjectionMatrix();
	      }));
	      $__0._p_threeD_scene.add(new THREE.AmbientLight(0x101030)).add(new THREE.DirectionalLight(0xffeedd).translateX(1).translateY(-1).translateZ(1)).add(new THREE.DirectionalLight(0xffeedd).translateX(-1).translateY(1).translateZ(-1));
	      ((function() {
	        var webglRenderer = new THREE.WebGLRenderer({
	          alpha: true,
	          antialias: true
	        });
	        webglRenderer.sortObjects = false;
	        $__0.on('3d-render').takeWhile($__0.on('threeDMode')).onValue((function() {
	          webglRenderer.render($__0._p_threeD_scene, $__0.camera3D);
	        }));
	        $__0.on('threeDCanvasSize').takeWhile($__0.on('threeDMode')).onValue((function(canvasSize) {
	          webglRenderer.setSize(canvasSize.width, canvasSize.height);
	        }));
	        var cssRenderer = new THREE.CSS3DRenderer();
	        $(cssRenderer.domElement).append(webglRenderer.domElement);
	        $__0.threeDCanvasElement.append(cssRenderer.domElement);
	        onThreeDModeOff.onValue((function() {
	          $__0.threeDCanvasElement.empty();
	        }));
	        $__0.on('3d-render').takeWhile($__0.on('threeDMode')).onValue((function() {
	          cssRenderer.render($__0._p_threeD_scene, $__0.camera3D);
	        }));
	        $__0.on('threeDCanvasSize').takeWhile($__0.on('threeDMode')).onValue((function(canvasSize) {
	          cssRenderer.setSize(canvasSize.width, canvasSize.height);
	        }));
	      }))();
	      Bacon.mergeAll($__0.on('animation-frame'), $__0.on('size').changes()).takeWhile($__0.on('threeDMode')).assign($__0, 'trigger', '3d-render');
	      ((function($__1) {
	        var $__2 = $__1,
	            parent0 = $__2.parent0,
	            position0 = $__2.position0,
	            margin0 = $__2.margin0;
	        var threeDCircuitboard = new THREE.CSS3DObject($__0.element.css({
	          left: 0,
	          top: 0,
	          bottom: 0,
	          right: 0
	        })[0]);
	        $__0._p_threeD_scene.add(threeDCircuitboard);
	        $__0.on('threeDCanvasSize').takeWhile($__0.on('threeDMode')).onValue((function(canvasSize) {
	          $(threeDCircuitboard.element).css({
	            width: canvasSize.width - margin0.left - margin0.right,
	            height: canvasSize.height - margin0.top - margin0.bottom
	          });
	          U.extend(threeDCircuitboard.position, {
	            x: 0.5 * (margin0.left - margin0.right),
	            y: 0.5 * (margin0.bottom - margin0.top)
	          });
	        }));
	        onThreeDModeOff.onValue((function() {
	          $__0.element.detach().appendTo(parent0).css(position0).css({
	            'width': 'auto',
	            'height': 'auto',
	            'position': 'absolute',
	            'transform': '',
	            '-webkit-transform': ''
	          });
	        }));
	        var threeDBackface = new THREE.CSS3DObject($('<div>').css({
	          position: 'absolute',
	          border: 'solid 1px black',
	          backfaceVisibility: 'hidden',
	          left: 0,
	          top: 0,
	          bottom: 0,
	          right: 0
	        })[0]);
	        threeDBackface.rotation.x = Math.PI;
	        $__0._p_threeD_scene.add(threeDBackface);
	        $__0.on('threeDCanvasSize').takeWhile($__0.on('threeDMode')).onValue((function(canvasSize) {
	          $(threeDBackface.element).css({
	            width: canvasSize.width - margin0.left - margin0.right,
	            height: canvasSize.height - margin0.top - margin0.bottom
	          });
	          U.extend(threeDBackface.position, {
	            x: 0.5 * (margin0.left - margin0.right),
	            y: 0.5 * (margin0.bottom - margin0.top)
	          });
	        }));
	        $__0.object3D = new THREE.Object3D();
	        $__0._p_threeD_scene.add($__0.object3D);
	        $__0.on('size').takeWhile($__0.on('threeDMode')).onValue((function(size) {
	          $__0.object3D.position.x = -size.width / 2 + 1;
	          $__0.object3D.position.y = -size.height / 2 + 1;
	        }));
	        $__0.on('threeDCanvasSize').takeWhile($__0.on('threeDMode')).onValue((function() {
	          U.extend($__0.object3D.position, {
	            x: 0.5 * (margin0.left - margin0.right) - $__0.size.width / 2,
	            y: 0.5 * (margin0.bottom - margin0.top) + $__0.size.height / 2
	          });
	        }));
	      }))({
	        parent0: $__0.element.parent(),
	        position0: {
	          left: $__0.element.css('left'),
	          top: $__0.element.css('top'),
	          right: $__0.element.css('right'),
	          bottom: $__0.element.css('bottom')
	        },
	        margin0: {
	          left: $__0.offset.left - $__0.threeDCanvasElement.offset().left,
	          top: $__0.offset.top - $__0.threeDCanvasElement.offset().top,
	          right: $__0.threeDCanvasSize.width - $__0.size.width - ($__0.offset.left - $__0.threeDCanvasElement.offset().left),
	          bottom: $__0.threeDCanvasSize.height - $__0.size.height - ($__0.offset.top - $__0.threeDCanvasElement.offset().top)
	        }
	      });
	    }));
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.circuitboard.on('threeDMode', true).onValue((function() {
	      $__0.object3D = new THREE.Object3D();
	      $__0.circuitboard.object3D.add($__0.object3D);
	      Bacon.mergeAll($__0.on('position'), $__0.on('size')).onValue((function() {
	        $__0.object3D.position.x = $__0.position.left + $__0.size.width / 2;
	        $__0.object3D.position.y = $__0.position.top + $__0.size.height / 2;
	      }));
	      $__0.on('visible').onValue((function(visible) {
	        $__0.object3D.visible = visible;
	      }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(11), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, defer) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(THREE) {
	  'use strict';
	  THREE.CSS3DObject = function(element) {
	    THREE.Object3D.call(this);
	    this.element = element;
	    this.element.style.position = 'absolute';
	    this.addEventListener('removed', function() {
	      if (this.element.parentNode !== null) {
	        this.element.parentNode.removeChild(this.element);
	      }
	    });
	  };
	  THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
	  THREE.CSS3DSprite = function(element) {
	    THREE.CSS3DObject.call(this, element);
	  };
	  THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype);
	  THREE.CSS3DRenderer = function() {
	    console.log('THREE.CSS3DRenderer', THREE.REVISION);
	    var _width,
	        _height;
	    var _widthHalf,
	        _heightHalf;
	    var matrix = new THREE.Matrix4();
	    var cache = {
	      camera: {
	        fov: 0,
	        style: ''
	      },
	      objects: {}
	    };
	    var domElement = document.createElement('div');
	    domElement.style.overflow = 'hidden';
	    domElement.style.transformStyle = 'preserve-3d';
	    this.domElement = domElement;
	    var cameraElement = document.createElement('div');
	    cameraElement.style.transformStyle = 'preserve-3d';
	    domElement.appendChild(cameraElement);
	    this.setClearColor = function() {};
	    this.setSize = function(width, height) {
	      _width = width;
	      _height = height;
	      _widthHalf = _width / 2;
	      _heightHalf = _height / 2;
	      domElement.style.width = width + 'px';
	      domElement.style.height = height + 'px';
	      cameraElement.style.width = width + 'px';
	      cameraElement.style.height = height + 'px';
	    };
	    var epsilon = function(value) {
	      return Math.abs(value) < 0.000001 ? 0 : value;
	    };
	    var getCameraCSSMatrix = function(matrix) {
	      var elements = matrix.elements;
	      return 'matrix3d(' + epsilon(elements[0]) + ',' + epsilon(-elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(elements[6]) + ',' + epsilon(elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(-elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(-elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
	    };
	    var getObjectCSSMatrix = function(matrix) {
	      var elements = matrix.elements;
	      return 'translate3d(-50%,-50%,0) matrix3d(' + epsilon(elements[0]) + ',' + epsilon(elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(-elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(-elements[6]) + ',' + epsilon(-elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
	    };
	    var renderObject = function(object, camera) {
	      if (object instanceof THREE.CSS3DObject) {
	        var style;
	        if (object instanceof THREE.CSS3DSprite) {
	          matrix.copy(camera.matrixWorldInverse);
	          matrix.transpose();
	          matrix.copyPosition(object.matrixWorld);
	          matrix.scale(object.scale);
	          matrix.elements[3] = 0;
	          matrix.elements[7] = 0;
	          matrix.elements[11] = 0;
	          matrix.elements[15] = 1;
	          style = getObjectCSSMatrix(matrix);
	        } else {
	          style = getObjectCSSMatrix(object.matrixWorld);
	        }
	        var element = object.element;
	        var cachedStyle = cache.objects[object.id];
	        if (cachedStyle === undefined || cachedStyle !== style) {
	          element.style.transform = style;
	          cache.objects[object.id] = style;
	        }
	        if (element.parentNode !== cameraElement) {
	          cameraElement.appendChild(element);
	        }
	      }
	      for (var i = 0,
	          l = object.children.length; i < l; i++) {
	        renderObject(object.children[i], camera);
	      }
	    };
	    this.render = function(scene, camera) {
	      var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * _height;
	      if (cache.camera.fov !== fov) {
	        domElement.style.perspective = fov + "px";
	        cache.camera.fov = fov;
	      }
	      scene.updateMatrixWorld();
	      if (camera.parent === undefined) {
	        camera.updateMatrixWorld();
	      }
	      camera.matrixWorldInverse.getInverse(camera.matrixWorld);
	      var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) + " translate3d(" + _widthHalf + "px," + _heightHalf + "px, 0)";
	      if (cache.camera.style !== style) {
	        cameraElement.style.transform = style;
	        cache.camera.style = style;
	      }
	      renderObject(scene, camera);
	    };
	  };
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-three-d.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-three-d.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

/***/ },
/* 11 */
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
	


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhMTdhOTQxODI2NDM3MGJkMDlkNyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3M/NWRhYyIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2NzcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLE1BQUksQ0FBRyxHQUFHLE1BQUk7QUFDN0IsY0FBVyxDQUFDO0FBSVIsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxVQUFRO0FBQ2QsWUFBTyxDQUFHLEVBQUMsbUJBQWtCLENBQUcsY0FBWSxDQUFHLGlCQUFlLENBQUM7QUFBQSxHQUNoRSxDQUFDLENBQUM7QUFJRixVQUFTLGVBQWEsQ0FBRSxDQUFFO0FBQ3JCLGNBQUssQ0FBQztBQUNWLE9BQUk7QUFDSCxZQUFLLEVBQUksRUFBQyxDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQ3RCLFlBQU8sRUFBQyxDQUFDLENBQUMsTUFBSyxDQUFFLEVBQUMsV0FBWSxDQUFDLE9BQU0sQ0FBQyxHQUFLLE9BQUssQ0FBRSxF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Q0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUF3RDtBQUN4RCw2Q0FBNEM7QUFDNUMsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJiYWNvblwiLCBcInR3ZWVuanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvblwiKSwgcmVxdWlyZShcInR3ZWVuanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhMTdhOTQxODI2NDM3MGJkMDlkN1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQndGhyZWUtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL2JhY29uLWFuZC1lZ2dzLmpzJyxcblx0Jy4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzJyxcblx0Jy4vcC10aHJlZS1kLnNjc3MnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUsIFUsIEJhY29uKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRoZSBwbHVnaW4gKi9cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQnLFxuXHRcdHJlcXVpcmVzOiBbJ3Bvc2l0aW9uLXRyYWNraW5nJywgJ3RpbGUtaGlkZGVuJywgJ2FuaW1hdGlvbi1sb29wJ11cblx0fSk7XG5cblxuXHQvKiB0ZXN0IGZvciBicm93c2VyIDNEIHN1cHBvcnQgKi9cblx0ZnVuY3Rpb24gYnJvd3NlclN1cHBvcnQoKSB7XG5cdFx0dmFyIGNhbnZhcztcblx0XHR0cnkge1xuXHRcdFx0Y2FudmFzID0gJCgnPGNhbnZhcz4nKTtcblx0XHRcdHJldHVybiAhIShjYW52YXNbMF0uZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXNbMF0uZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJykpO1xuXHRcdH0gY2F0Y2ggKF9fKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGNhbnZhcyA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXG5cdC8qIHRoZSBjb25zdHJ1Y3RvciBpcyBydW4gb25jZSB0byBpbml0aWFsaXplIHBvdGVudGlhbCAzRC1uZXNzICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cblx0XHQvKiB0ZXN0IGZvciBicm93c2VyIHN1cHBvcnQgKi9cblx0XHRpZiAoIWJyb3dzZXJTdXBwb3J0KCkpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHNlZW0gdG8gaGF2ZSBXZWJHTCBzdXBwb3J0LlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ2FudmFzRWxlbWVudCcgcHJvcGVydHkgKi9cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCd0aHJlZURDYW52YXNFbGVtZW50Jyk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzRWxlbWVudCcpLnNsaWRpbmdXaW5kb3coMikubWFwKCcucmV2ZXJzZScpLm9uVmFsdWVzKChuZXdDYW52YXMsIG9sZENhbnZhcykgPT4ge1xuXHRcdFx0aWYgKG9sZENhbnZhcykgeyBvbGRDYW52YXMucmVtb3ZlQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdFx0aWYgKG5ld0NhbnZhcykgeyBuZXdDYW52YXMuYWRkQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiB3YXMgYSBjYW52YXMgZ2l2ZW4gdGhyb3VnaCB0aGUgb3B0aW9ucz8gKi9cblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgPSB0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudDtcblxuXG5cdFx0LyogdGhlICd0aHJlZURNb2RlJyBwcm9wZXJ0eSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRE1vZGUnLCB7XG5cdFx0XHRpbml0aWFsOiBVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudClcblx0XHR9KTsgLy8gVE9ETzogZXJyb3IgaWYgbm8gY2FudmFzIGVsZW1lbnQgaXMgc2V0XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ2FudmFzU2l6ZScgb2JzZXJ2YWJsZSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRENhbnZhc1NpemUnKTtcblx0XHQoKGNhY2hlKSA9PiB7XG5cdFx0XHR0aGlzLnRocmVlRENhbnZhc1NpemUgPSBjYWNoZSgpO1xuXHRcdFx0Y2FjaGUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50aHJlZURDYW52YXNTaXplID0gbmV3U2l6ZSB9KTtcblx0XHRcdCggdGhpcy5vcHRpb25zLmNhbnZhc1Jlc2l6ZUV2ZW50IHx8ICQod2luZG93KS5yZXNpemUuYmluZCgkKHdpbmRvdykpICkoY2FjaGUpO1xuXHRcdH0pKFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAodGhpcy50aHJlZURDYW52YXNFbGVtZW50ICYmIG5ldyBVLlNpemUoXG5cdFx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpLFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC53aWR0aCgpXG5cdFx0XHQpKSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KSk7XG5cblxuXHR9KTtcblxuXHQvKiB0aGUgY29kZSB0byBydW4gZXZlcnkgdGltZSAzRC1uZXNzIGlzIHR1cm5lZCBvbiAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3RXZlbnQoJzNkLXJlbmRlcicpO1xuXG5cdFx0dGhpcy5vbigndGhyZWVETW9kZScsIHRydWUpLm9uVmFsdWUoKCkgPT4ge1xuXG5cblx0XHRcdC8vIFRPRE86IGZpeCBidWc6IHdoZW4gM0QgbW9kZSBpcyB0dXJuZWQgb2ZmLCB0aGVuIG9uLCB0aWxlcyBubyBsb25nZXIgcmVzcG9uZCB0byBjbGlja3NcblxuXG5cdFx0XHQvKiBhIHNob3J0IG5vdGF0aW9uIGZvciB0aGUgZXZlbnQgb2YgM0QtbW9kZSBiZWluZyB0dXJuZWQgb2ZmICovXG5cdFx0XHR2YXIgb25UaHJlZURNb2RlT2ZmID0gdGhpcy5vbigndGhyZWVETW9kZScpLnZhbHVlKGZhbHNlKS50YWtlKDEpO1xuXG5cblx0XHRcdC8qIHNjZW5lICovXG5cdFx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHRcdFx0b25UaHJlZURNb2RlT2ZmLm9uVmFsdWUoKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfc2NlbmUgfSk7XG5cblxuXHRcdFx0LyogY2FtZXJhICovXG5cdFx0XHR0aGlzLmNhbWVyYTNEID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0LCAxLCAxMDAwMCk7XG5cdFx0XHQvL3RoaXMuY2FtZXJhM0Quc2NhbGUueSA9IC0xOyAvLyBUT0RPOiA/Pz8/XG5cdFx0XHR0aGlzLmNhbWVyYTNELnBvc2l0aW9uLnogPSAxMDAwO1xuXHRcdFx0dGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikuc2V0WigwKTtcblx0XHRcdHRoaXMuY2FtZXJhM0QubG9va0F0KHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcblx0XHRcdG9uVGhyZWVETW9kZU9mZi5vblZhbHVlKCgpID0+IHsgZGVsZXRlIHRoaXMuY2FtZXJhM0QgfSk7XG5cdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoY2FudmFzU2l6ZSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNhbWVyYTNELmFzcGVjdCA9IGNhbnZhc1NpemUud2lkdGggLyBjYW52YXNTaXplLmhlaWdodDtcblx0XHRcdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi5ub3JtYWxpemUoKVxuXHRcdFx0XHRcdFx0Lm11bHRpcGx5U2NhbGFyKGNhbnZhc1NpemUuaGVpZ2h0IC8gTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZCh0aGlzLmNhbWVyYTNELmZvdikgLyAyKSAvIDIpO1xuXHRcdFx0XHR0aGlzLmNhbWVyYTNELnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdC8qIGxpZ2h0aW5nICovXG5cdFx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZVxuXHRcdFx0XHRcdC5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDEwMTAzMCkpXG5cdFx0XHRcdFx0LmFkZChuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCkudHJhbnNsYXRlWCgxKS50cmFuc2xhdGVZKC0xKS50cmFuc2xhdGVaKDEpKVxuXHRcdFx0XHRcdC5hZGQobmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmVlZGQpLnRyYW5zbGF0ZVgoLTEpLnRyYW5zbGF0ZVkoMSkudHJhbnNsYXRlWigtMSkpO1xuXG5cblx0XHRcdC8qIHJlbmRlcmVycyAqL1xuXHRcdFx0KCgpPT57XG5cdFx0XHRcdC8qIFdlYkdMIHJlbmRlcmVyICovXG5cdFx0XHRcdHZhciB3ZWJnbFJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbHBoYTogdHJ1ZSwgYW50aWFsaWFzOiB0cnVlIH0pO1xuXHRcdFx0XHR3ZWJnbFJlbmRlcmVyLnNvcnRPYmplY3RzID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMub24oJzNkLXJlbmRlcicpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpXG5cdFx0XHRcdFx0XHQub25WYWx1ZSgoKSA9PiB7IHdlYmdsUmVuZGVyZXIucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLmNhbWVyYTNEKSB9KTtcblx0XHRcdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpXG5cdFx0XHRcdFx0XHQub25WYWx1ZSgoY2FudmFzU2l6ZSkgPT4geyB3ZWJnbFJlbmRlcmVyLnNldFNpemUoY2FudmFzU2l6ZS53aWR0aCwgY2FudmFzU2l6ZS5oZWlnaHQpIH0pO1xuXG5cdFx0XHRcdC8qIENTUyByZW5kZXJlciAqL1xuXHRcdFx0XHR2YXIgY3NzUmVuZGVyZXIgPSBuZXcgVEhSRUUuQ1NTM0RSZW5kZXJlcigpO1xuXHRcdFx0XHQkKGNzc1JlbmRlcmVyLmRvbUVsZW1lbnQpLmFwcGVuZCh3ZWJnbFJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuYXBwZW5kKGNzc1JlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXHRcdFx0XHRvblRocmVlRE1vZGVPZmYub25WYWx1ZSgoKSA9PiB7IHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5lbXB0eSgpIH0pO1xuXHRcdFx0XHR0aGlzLm9uKCczZC1yZW5kZXInKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKVxuXHRcdFx0XHRcdFx0Lm9uVmFsdWUoKCkgPT4geyBjc3NSZW5kZXJlci5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuY2FtZXJhM0QpIH0pO1xuXHRcdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSlcblx0XHRcdFx0XHRcdC5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7IGNzc1JlbmRlcmVyLnNldFNpemUoY2FudmFzU2l6ZS53aWR0aCwgY2FudmFzU2l6ZS5oZWlnaHQpIH0pO1xuXHRcdFx0fSkoKTtcblxuXG5cdFx0XHQvKiByZW5kZXIgb24gc2l6ZS1jaGFuZ2UgYW5kIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZSAqL1xuXHRcdFx0QmFjb24ubWVyZ2VBbGwoXG5cdFx0XHRcdFx0dGhpcy5vbignYW5pbWF0aW9uLWZyYW1lJyksXG5cdFx0XHRcdFx0dGhpcy5vbignc2l6ZScpLmNoYW5nZXMoKVxuXHRcdFx0KS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5hc3NpZ24odGhpcywgJ3RyaWdnZXInLCAnM2QtcmVuZGVyJyk7XG5cblxuXHRcdFx0LyogdGhlIGNpcmN1aXRib2FyZCBmbG9hdGluZyBpbiAzRCBzcGFjZSAqL1xuXHRcdFx0KCh7cGFyZW50MCwgcG9zaXRpb24wLCBtYXJnaW4wfSkgPT4ge1xuXG5cdFx0XHRcdC8qIHRoZSBjaXJjdWl0Ym9hcmQgaXRzZWxmICovXG5cdFx0XHRcdHZhciB0aHJlZURDaXJjdWl0Ym9hcmQgPSBuZXcgVEhSRUUuQ1NTM0RPYmplY3QodGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0XHQuY3NzKHsgbGVmdDogMCwgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAwIH0pWzBdKTtcblx0XHRcdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRocmVlRENpcmN1aXRib2FyZCk7XG5cdFx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7XG5cdFx0XHRcdFx0JCh0aHJlZURDaXJjdWl0Ym9hcmQuZWxlbWVudCkuY3NzKHtcblx0XHRcdFx0XHRcdHdpZHRoOiBjYW52YXNTaXplLndpZHRoIC0gbWFyZ2luMC5sZWZ0IC0gbWFyZ2luMC5yaWdodCxcblx0XHRcdFx0XHRcdGhlaWdodDogY2FudmFzU2l6ZS5oZWlnaHQgLSBtYXJnaW4wLnRvcCAtIG1hcmdpbjAuYm90dG9tXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0VS5leHRlbmQodGhyZWVEQ2lyY3VpdGJvYXJkLnBvc2l0aW9uLCB7XG5cdFx0XHRcdFx0XHR4OiAwLjUgKiAobWFyZ2luMC5sZWZ0IC0gbWFyZ2luMC5yaWdodCksXG5cdFx0XHRcdFx0XHR5OiAwLjUgKiAobWFyZ2luMC5ib3R0b20gLSBtYXJnaW4wLnRvcClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdG9uVGhyZWVETW9kZU9mZi5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZGV0YWNoKCkuYXBwZW5kVG8ocGFyZW50MCkuY3NzKHBvc2l0aW9uMCkuY3NzKHtcblx0XHRcdFx0XHRcdCd3aWR0aCc6ICdhdXRvJyxcblx0XHRcdFx0XHRcdCdoZWlnaHQnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybSc6ICcnLFxuXHRcdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtJzogJydcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblxuXHRcdFx0XHQvKiBpdHMgYmFja2ZhY2UgKi9cblx0XHRcdFx0dmFyIHRocmVlREJhY2tmYWNlID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KCQoJzxkaXY+JykuY3NzKHtcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHRib3JkZXI6ICdzb2xpZCAxcHggYmxhY2snLFxuXHRcdFx0XHRcdGJhY2tmYWNlVmlzaWJpbGl0eTogJ2hpZGRlbicsXG5cdFx0XHRcdFx0bGVmdDogMCwgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAwXG5cdFx0XHRcdH0pWzBdKTtcblx0XHRcdFx0dGhyZWVEQmFja2ZhY2Uucm90YXRpb24ueCA9IE1hdGguUEk7IC8vIDE4MMKwXG5cdFx0XHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZCh0aHJlZURCYWNrZmFjZSk7XG5cdFx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7XG5cdFx0XHRcdFx0JCh0aHJlZURCYWNrZmFjZS5lbGVtZW50KS5jc3Moe1xuXHRcdFx0XHRcdFx0d2lkdGg6IGNhbnZhc1NpemUud2lkdGggLSBtYXJnaW4wLmxlZnQgLSBtYXJnaW4wLnJpZ2h0LFxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBjYW52YXNTaXplLmhlaWdodCAtIG1hcmdpbjAudG9wIC0gbWFyZ2luMC5ib3R0b21cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRVLmV4dGVuZCh0aHJlZURCYWNrZmFjZS5wb3NpdGlvbiwge1xuXHRcdFx0XHRcdFx0eDogMC41ICogKG1hcmdpbjAubGVmdCAtIG1hcmdpbjAucmlnaHQpLFxuXHRcdFx0XHRcdFx0eTogMC41ICogKG1hcmdpbjAuYm90dG9tIC0gbWFyZ2luMC50b3ApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0LyogIHRoZSBvYmplY3QgY29udGFpbmluZyBhbGwgM0QgdGhpbmdzIGNvLWxvY2F0ZWQgd2l0aCB0aGUgY2lyY3VpdGJvYXJkICovXG5cdFx0XHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHRcdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRoaXMub2JqZWN0M0QpO1xuXHRcdFx0XHQvL3RoaXMub2JqZWN0M0Qucm90YXRpb24ueCA9IE1hdGguUEk7IC8vIDE4MMKwIC8vIFRPRE86IGRvZXMgdGhpcyB3b3JrP1xuXHRcdFx0XHR0aGlzLm9uKCdzaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoc2l6ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMub2JqZWN0M0QucG9zaXRpb24ueCA9IC1zaXplLndpZHRoIC8gMiArIDE7XG5cdFx0XHRcdFx0dGhpcy5vYmplY3QzRC5wb3NpdGlvbi55ID0gLXNpemUuaGVpZ2h0IC8gMiArIDE7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdFx0VS5leHRlbmQodGhpcy5vYmplY3QzRC5wb3NpdGlvbiwge1xuXHRcdFx0XHRcdFx0eDogMC41ICogKG1hcmdpbjAubGVmdCAtIG1hcmdpbjAucmlnaHQpIC0gdGhpcy5zaXplLndpZHRoIC8gMixcblx0XHRcdFx0XHRcdHk6IDAuNSAqIChtYXJnaW4wLmJvdHRvbSAtIG1hcmdpbjAudG9wKSArIHRoaXMuc2l6ZS5oZWlnaHQgLyAyXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdH0pKHsgLy8gcmVtZW1iZXIgc29tZSBwcmUtM0QgRE9NIHN0YXRlXG5cdFx0XHRcdHBhcmVudDA6IHRoaXMuZWxlbWVudC5wYXJlbnQoKSxcblx0XHRcdFx0cG9zaXRpb24wOiB7XG5cdFx0XHRcdFx0bGVmdDogdGhpcy5lbGVtZW50LmNzcygnbGVmdCcpLFxuXHRcdFx0XHRcdHRvcDogdGhpcy5lbGVtZW50LmNzcygndG9wJyksXG5cdFx0XHRcdFx0cmlnaHQ6IHRoaXMuZWxlbWVudC5jc3MoJ3JpZ2h0JyksXG5cdFx0XHRcdFx0Ym90dG9tOiB0aGlzLmVsZW1lbnQuY3NzKCdib3R0b20nKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRtYXJnaW4wOiB7XG5cdFx0XHRcdFx0bGVmdDogICB0aGlzLm9mZnNldC5sZWZ0IC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLmxlZnQsXG5cdFx0XHRcdFx0dG9wOiAgICB0aGlzLm9mZnNldC50b3AgIC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLnRvcCxcblx0XHRcdFx0XHRyaWdodDogIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAgLSB0aGlzLnNpemUud2lkdGggIC0gKHRoaXMub2Zmc2V0LmxlZnQgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkubGVmdCksXG5cdFx0XHRcdFx0Ym90dG9tOiB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC0gdGhpcy5zaXplLmhlaWdodCAtICh0aGlzLm9mZnNldC50b3AgIC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLnRvcClcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblxuXG5cblx0XHR9KTtcblx0fSk7XG5cblxuXHQvLy8qIGB0cmFuc2xhdGVQb3NpdGlvbkZyb21DYW52YXNUb0NpcmN1aXRib2FyZGAgaGFzIG5vIHNpZGUtZWZmZWN0cyBhbmQgY2FuIGJlIHVzZWQgICAqL1xuXHQvLy8qICBmcm9tIHRoZSBvdXRzaWRlIHRvIHRyYW5zbGF0ZSBsZWZ0L3RvcCBjb29yZGluYXRlcyBvbiB0aGUgc2NyZWVuIHRvIGxlZnQvdG9wICAgICAqL1xuXHQvLy8qICBjb29yZGluYXRlcyBvZiB0aGUgcHJpdmF0ZSBjb29yZGluYXRlLXN5c3RlbSBvZiB0aGUgY2lyY3VpdGJvYXJkLCBob3dldmVyIGl0IGlzICAqL1xuXHQvLy8qICBvcmllbnRlZCBpbiAzRCBzcGFjZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvL3BsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUudHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmQnLCBmdW5jdGlvbiAocG9zaXRpb25PbkNhbnZhcykge1xuXHQvL1xuXHQvL1x0dGhpcy5jYW1lcmEzRC51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHQvL1x0dGhpcy5jYW1lcmEzRC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdC8vXG5cdC8vXHR2YXIgbW91c2UzRCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdC8vXHRtb3VzZTNELnggPSBwb3NpdGlvbk9uQ2FudmFzLmxlZnQgLyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggKiAyIC0gMTtcblx0Ly9cdG1vdXNlM0QueSA9IC1wb3NpdGlvbk9uQ2FudmFzLnRvcCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgKiAyICsgMTtcblx0Ly9cdG1vdXNlM0QueiA9IDAuNTtcblx0Ly9cdFBST0pFQ1RPUi51bnByb2plY3RWZWN0b3IobW91c2UzRCwgdGhpcy5jYW1lcmEzRCk7XG5cdC8vXHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheSh0aGlzLmNhbWVyYTNELnBvc2l0aW9uLCBtb3VzZTNELnN1Yih0aGlzLmNhbWVyYTNELnBvc2l0aW9uKS5ub3JtYWxpemUoKSk7XG5cdC8vXHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RQbGFuZShQTEFORSk7XG5cdC8vXG5cdC8vXHQvKiBpZiB0aGUgdGVzdGVkIGludGVyc2VjdGlvbiBpcyBvdXQgb2YgcmFuZ2UsIHJldHVybiB1bmRlZmluZWQgKi9cblx0Ly9cdGlmICghaW50ZXJzZWN0cykgeyByZXR1cm4gfVxuXHQvL1xuXHQvL1x0cmV0dXJuIHtcblx0Ly9cdFx0bGVmdDogaW50ZXJzZWN0cy54ICsgdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC8gMiAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCxcblx0Ly9cdFx0dG9wOiAtaW50ZXJzZWN0cy55ICsgdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcFxuXHQvL1x0fTtcblx0Ly9cblx0Ly99KTtcblxuXG5cdC8qIGFydGVmYWN0LXNwZWNpZmljIG9iamVjdDNEIG9iamVjdHMgKi9cblx0cGx1Z2luLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuY2lyY3VpdGJvYXJkLm9uKCd0aHJlZURNb2RlJywgdHJ1ZSkub25WYWx1ZSgoKSA9PiB7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgM0Qgb2JqZWN0IGZvciB0aGlzIHRpbGUgKi9cblx0XHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLm9iamVjdDNELmFkZCh0aGlzLm9iamVjdDNEKTtcblxuXHRcdFx0LyogcG9zaXRpb24gaXQgYWx3YXlzIGluIHRoZSBjZW50ZXIgb2YgdGhlIHRpbGUgKi9cblx0XHRcdEJhY29uLm1lcmdlQWxsKHRoaXMub24oJ3Bvc2l0aW9uJyksIHRoaXMub24oJ3NpemUnKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMub2JqZWN0M0QucG9zaXRpb24ueCA9IHRoaXMucG9zaXRpb24ubGVmdCArIHRoaXMuc2l6ZS53aWR0aCAvIDI7XG5cdFx0XHRcdHRoaXMub2JqZWN0M0QucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24udG9wICsgdGhpcy5zaXplLmhlaWdodCAvIDI7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogaGlkZSBpdCB3aGVuIHRoZSB0aWxlIGlzIGhpZGRlbiAqL1xuXHRcdFx0dGhpcy5vbigndmlzaWJsZScpLm9uVmFsdWUoKHZpc2libGUpID0+IHsgdGhpcy5vYmplY3QzRC52aXNpYmxlID0gdmlzaWJsZSB9KTtcblxuXHRcdH0pO1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC10aHJlZS1kLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICcuL2RlZmVyLmpzJywgJ2JhY29uJ10sIChQLCBkZWZlcikgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3MoU3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW1N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmJpbmQodGhpcyldLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLiBFdmVyeSBpbnZvY2F0aW9uIHJldHVybnMgYSBwcm9taXNlIHRvIHRoZSBldmVudHVhbCByZXN1bHQuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHR2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpKTtcblx0XHRcdFx0XHRkZWZlcnJlZCA9IGRlZmVyKCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnYmFjb24nLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24sIFRXRUVOKSB7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEJhY29uLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCAodikgPT4geyBzaW5rKG5ldyBCYWNvbi5OZXh0KHYpKSB9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0QmFjb24uYW5pbWF0aW9uRnJhbWVzID0gVS5tZW1vaXplKGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0KChmKSA9PiB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApKTtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHR2YXIgaXRlcmF0aW9uRm4gPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHNpbmsoKTtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oaXRlcmF0aW9uRm4pO1xuXHRcdFx0fTtcblxuXHRcdFx0Lyogc3RhcnQgaXQgbm93ICovXG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdHNpbmsobmV3IEJhY29uLkVuZCgpKTtcblx0XHRcdH07XG5cblx0XHR9KTtcblx0fSk7XG5cblxuXHRCYWNvbi50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ30pIHtcblxuXHRcdC8qIHRoZSB0d2VlbiAqL1xuXHRcdHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG5cblx0XHQvKiB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0dmFyIGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IHNpbmsobmV3IEJhY29uLk5leHQoKCkgPT4gdGhpcykpIH0pO1xuXHRcdFx0dHcub25Db21wbGV0ZSgoKSA9PiB7IHNpbmsobmV3IEJhY29uLkVuZCgpKSB9KTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEJhY29uLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Y29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Y29kZSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEJhY29uLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIG9wZW4gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlcih3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoaGFuZGxlciwgKCkgPT4ge1xuXHRcdFx0b3Blbi5wdXNoKCk7XG5cdFx0XHR3YW50ZWRCdXMucHVzaChmYWxzZSk7XG5cdFx0XHRjbG9zZS5wdXNoKCk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcCh0cnVlKSk7XG5cdFx0XHRyZXR1cm4gY2xvc2Uuc3RhcnRXaXRoKHRydWUpLmZsYXRNYXBMYXRlc3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgYWNjdW11bGF0b3IgPSAoYXJyLCB2YWwpID0+IChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcblx0XHRcdFx0cmV0dXJuIHN0cmVhbS50YWtlVW50aWwob3BlbikucmVkdWNlKFtdLCBhY2N1bXVsYXRvcikuZmxhdE1hcChCYWNvbi5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHR2YXIgYnVmZmVyID0gW107XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSB0aGlzLm9uVmFsdWUoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGJ1ZmZlci5wdXNoKG5ldyBCYWNvbi5OZXh0KCgpID0+IHZhbHVlKSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdHNpbmsob2xkQnVmZmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvVGhpcygpO1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG5cdFx0XHRcdGJ1ZmZlciA9IG51bGw7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFRoaXMgZmlsdGVycyBhbiBvYnNlcnZhYmxlIHRvIG9ubHkgbGV0IHRocm91Z2ggdmFsdWVzIGVxdWFsIHRvIHRoZSBnaXZlbiB2YWx1ZS5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbXBhcmF0b3IpIHtcblx0XHRjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGUpID0+IGUgPT09IHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcblx0fTtcblxuXHQvLyBUaGlzIG1ha2VzIGEgc3Vic2NyaXB0aW9uIHRvIGFuIG9ic2VydmFibGUgdGhhdCBkb2Vzbid0IGRvIGFueXRoaW5nXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdWJzY3JpYmUoKCk9Pnt9KTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJykudGFrZVVudGlsKCQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKSk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW0ubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEJhY29uO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9iYWNvbi1hbmQtZWdncy5qc1xuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uIChUSFJFRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGh0dHA6Ly93d3cuZW1hZ2l4Lm5ldC9hY2FkZW1pYy9tc2NzLXByb2plY3QvaXRlbS9jYW1lcmEtc3luYy13aXRoLWNzczMtYW5kLXdlYmdsLXRocmVlanNcblx0ICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cblx0ICovXG5cblx0VEhSRUUuQ1NTM0RPYmplY3QgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5PYmplY3QzRC5jYWxsKCB0aGlzICk7XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdyZW1vdmVkJywgZnVuY3Rpb24gKCAvKmV2ZW50Ki8gKSB7XG5cblx0XHRcdGlmICggdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUgKTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZSA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLkNTUzNET2JqZWN0LmNhbGwoIHRoaXMsIGVsZW1lbnQgKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSApO1xuXG5cdC8vXG5cblx0VEhSRUUuQ1NTM0RSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUubG9nKCAnVEhSRUUuQ1NTM0RSZW5kZXJlcicsIFRIUkVFLlJFVklTSU9OICk7XG5cblx0XHR2YXIgX3dpZHRoLCBfaGVpZ2h0O1xuXHRcdHZhciBfd2lkdGhIYWxmLCBfaGVpZ2h0SGFsZjtcblxuXHRcdHZhciBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0dmFyIGNhY2hlID0ge1xuXHRcdFx0Y2FtZXJhOiB7IGZvdjogMCwgc3R5bGU6ICcnIH0sXG5cdFx0XHRvYmplY3RzOiB7fVxuXHRcdH07XG5cblx0XHR2YXIgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblxuXHRcdHZhciBjYW1lcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdGRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNhbWVyYUVsZW1lbnQgKTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRcdF93aWR0aCA9IHdpZHRoO1xuXHRcdFx0X2hlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0X3dpZHRoSGFsZiA9IF93aWR0aCAvIDI7XG5cdFx0XHRfaGVpZ2h0SGFsZiA9IF9oZWlnaHQgLyAyO1xuXG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0fTtcblxuXHRcdHZhciBlcHNpbG9uID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldENhbWVyYUNTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAnbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0T2JqZWN0Q1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICd0cmFuc2xhdGUzZCgtNTAlLC01MCUsMCkgbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgcmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKCBvYmplY3QsIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRE9iamVjdCApIHtcblxuXHRcdFx0XHR2YXIgc3R5bGU7XG5cblx0XHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRFNwcml0ZSApIHtcblxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9zd2lmdGNvZGVyLndvcmRwcmVzcy5jb20vMjAwOC8xMS8yNS9jb25zdHJ1Y3RpbmctYS1iaWxsYm9hcmQtbWF0cml4L1xuXG5cdFx0XHRcdFx0bWF0cml4LmNvcHkoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcblx0XHRcdFx0XHRtYXRyaXgudHJhbnNwb3NlKCk7XG5cdFx0XHRcdFx0bWF0cml4LmNvcHlQb3NpdGlvbiggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cdFx0XHRcdFx0bWF0cml4LnNjYWxlKCBvYmplY3Quc2NhbGUgKTtcblxuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDcgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMSBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDE1IF0gPSAxO1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZWxlbWVudCA9IG9iamVjdC5lbGVtZW50O1xuXHRcdFx0XHR2YXIgY2FjaGVkU3R5bGUgPSBjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXTtcblxuXHRcdFx0XHRpZiAoIGNhY2hlZFN0eWxlID09PSB1bmRlZmluZWQgfHwgY2FjaGVkU3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0XHRjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXSA9IHN0eWxlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY2FtZXJhRWxlbWVudCApIHtcblxuXHRcdFx0XHRcdGNhbWVyYUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRcdFx0cmVuZGVyT2JqZWN0KCBvYmplY3QuY2hpbGRyZW5bIGkgXSwgY2FtZXJhICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdFx0dmFyIGZvdiA9IDAuNSAvIE1hdGgudGFuKCBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBjYW1lcmEuZm92ICogMC41ICkgKSAqIF9oZWlnaHQ7XG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLmZvdiAhPT0gZm92ICkge1xuXG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5XZWJraXRQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLk1velBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUub1BlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5mb3YgPSBmb3Y7XG5cblx0XHRcdH1cblxuXHRcdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0aWYgKCBjYW1lcmEucGFyZW50ID09PSB1bmRlZmluZWQgKSB7IGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpIH1cblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZS5nZXRJbnZlcnNlKCBjYW1lcmEubWF0cml4V29ybGQgKTtcblxuXHRcdFx0dmFyIHN0eWxlID0gXCJ0cmFuc2xhdGUzZCgwLDAsXCIgKyBmb3YgKyBcInB4KVwiICsgZ2V0Q2FtZXJhQ1NTTWF0cml4KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICkgK1xuXHRcdFx0XHRcIiB0cmFuc2xhdGUzZChcIiArIF93aWR0aEhhbGYgKyBcInB4LFwiICsgX2hlaWdodEhhbGYgKyBcInB4LCAwKVwiO1xuXG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLnN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuc3R5bGUgPSBzdHlsZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJPYmplY3QoIHNjZW5lLCBjYW1lcmEgKTtcblxuXHRcdH07XG5cblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL0NTUzNEUmVuZGVyZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2e2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2Pi5jaXJjdWl0Ym9hcmR7cG9pbnRlci1ldmVudHM6dmlzaWJsZTstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO30udGhyZWUtZC1jYW52YXM+ZGl2PmNhbnZhc3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MTtwb2ludGVyLWV2ZW50czpub25lO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24gKFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcblx0XHR2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuXHRcdHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0cmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuXHRcdH0pO1xuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuXHRcdFx0cmVqZWN0OiByZWplY3QsXG5cdFx0XHRwcm9taXNlOiBwcm9taXNlXG5cdFx0fTtcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlZmVyLmpzXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzSUU5ID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSA5XFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzSUU5KCk7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlVGV4dChzb3VyY2UsIGlkLCByZXBsYWNlbWVudCkge1xyXG5cdHZhciBib3VuZGFyaWVzID0gW1wiLyoqID4+XCIgKyBpZCArIFwiICoqL1wiLCBcIi8qKiBcIiArIGlkICsgXCI8PCAqKi9cIl07XHJcblx0dmFyIHN0YXJ0ID0gc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMF0pO1xyXG5cdHZhciB3cmFwcGVkUmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudFxyXG5cdFx0PyAoYm91bmRhcmllc1swXSArIHJlcGxhY2VtZW50ICsgYm91bmRhcmllc1sxXSlcclxuXHRcdDogXCJcIjtcclxuXHRpZiAoc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMF0pID49IDApIHtcclxuXHRcdHZhciBlbmQgPSBzb3VyY2UubGFzdEluZGV4T2YoYm91bmRhcmllc1sxXSkgKyBib3VuZGFyaWVzWzFdLmxlbmd0aDtcclxuXHRcdHJldHVybiBzb3VyY2Uuc2xpY2UoMCwgc3RhcnQpICsgd3JhcHBlZFJlcGxhY2VtZW50ICsgc291cmNlLnNsaWNlKGVuZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBzb3VyY2UgKyB3cmFwcGVkUmVwbGFjZW1lbnQ7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQsIGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdFx0Y3NzID0gXCJAaW1wb3J0IHVybChcXFwiZGF0YTpzdHlsZXNoZWV0L2NzcztiYXNlNjQsXCIgKyBidG9hKGNzcykgKyBcIlxcXCIpXCI7XHJcblx0XHR9IGNhdGNoKGUpIHt9XHJcblx0fVxyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC5qcyJ9