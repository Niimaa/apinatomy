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
	var update = __webpack_require__(11)(content);
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

	exports = module.exports = __webpack_require__(12)();
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
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
				addStylesToDom(newStyles);
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
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
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
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 12 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2YjkzZTFmMTU3MWQzMDc3YmRmNyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3M/NWRhYyIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLE1BQUksQ0FBRyxHQUFHLE1BQUk7QUFDN0IsY0FBVyxDQUFDO0FBSVIsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxVQUFRO0FBQ2QsWUFBTyxDQUFHLEVBQUMsbUJBQWtCLENBQUcsY0FBWSxDQUFHLGlCQUFlLENBQUM7QUFBQSxHQUNoRSxDQUFDLENBQUM7QUFJRixVQUFTLGVBQWEsQ0FBRSxDQUFFO0FBQ3JCLGNBQUssQ0FBQztBQUNWLE9BQUk7QUFDSCxZQUFLLEVBQUksRUFBQyxDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQ3RCLFlBQU8sRUFBQyxDQUFDLENBQUMsTUFBSyxDQUFFLEVBQUMsV0FBWSxDQUFDLE9BQU0sQ0FBQyxHQUFLLE9BQUssQ0FBRSxFQUFDLFdBQVksQ0FBQyxvQkFBbUIsQ0FBQyxDQUFD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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBLGlDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUEyRDtBQUMzRCxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImJsdWViaXJkXCIsIFwiYmFjb25cIiwgXCJ0d2VlbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdLCByb290W1wiVFdFRU5cIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmI5M2UxZjE1NzFkMzA3N2JkZjdcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcycsXG5cdCcuL3V0aWwvQ1NTM0RSZW5kZXJlci5qcycsXG5cdCcuL3AtdGhyZWUtZC5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFLCBVLCBCYWNvbikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiB0aGUgcGx1Z2luICovXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aHJlZS1kJyxcblx0XHRyZXF1aXJlczogWydwb3NpdGlvbi10cmFja2luZycsICd0aWxlLWhpZGRlbicsICdhbmltYXRpb24tbG9vcCddXG5cdH0pO1xuXG5cblx0LyogdGVzdCBmb3IgYnJvd3NlciAzRCBzdXBwb3J0ICovXG5cdGZ1bmN0aW9uIGJyb3dzZXJTdXBwb3J0KCkge1xuXHRcdHZhciBjYW52YXM7XG5cdFx0dHJ5IHtcblx0XHRcdGNhbnZhcyA9ICQoJzxjYW52YXM+Jyk7XG5cdFx0XHRyZXR1cm4gISEoY2FudmFzWzBdLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzWzBdLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpKTtcblx0XHR9IGNhdGNoIChfXykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRjYW52YXMgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblxuXHQvKiB0aGUgY29uc3RydWN0b3IgaXMgcnVuIG9uY2UgdG8gaW5pdGlhbGl6ZSBwb3RlbnRpYWwgM0QtbmVzcyAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXG5cdFx0LyogdGVzdCBmb3IgYnJvd3NlciBzdXBwb3J0ICovXG5cdFx0aWYgKCFicm93c2VyU3VwcG9ydCgpKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzZWVtIHRvIGhhdmUgV2ViR0wgc3VwcG9ydC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENhbnZhc0VsZW1lbnQnIHByb3BlcnR5ICovXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgndGhyZWVEQ2FudmFzRWxlbWVudCcpO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc0VsZW1lbnQnKS5zbGlkaW5nV2luZG93KDIpLm1hcCgnLnJldmVyc2UnKS5vblZhbHVlcygobmV3Q2FudmFzLCBvbGRDYW52YXMpID0+IHtcblx0XHRcdGlmIChvbGRDYW52YXMpIHsgb2xkQ2FudmFzLnJlbW92ZUNsYXNzKCd0aHJlZS1kLWNhbnZhcycpIH1cblx0XHRcdGlmIChuZXdDYW52YXMpIHsgbmV3Q2FudmFzLmFkZENsYXNzKCd0aHJlZS1kLWNhbnZhcycpIH1cblx0XHR9KTtcblxuXG5cdFx0Lyogd2FzIGEgY2FudmFzIGdpdmVuIHRocm91Z2ggdGhlIG9wdGlvbnM/ICovXG5cdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50ID0gdGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQ7XG5cblxuXHRcdC8qIHRoZSAndGhyZWVETW9kZScgcHJvcGVydHkgKi9cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCd0aHJlZURNb2RlJywge1xuXHRcdFx0aW5pdGlhbDogVS5pc0RlZmluZWQodGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQpXG5cdFx0fSk7IC8vIFRPRE86IGVycm9yIGlmIG5vIGNhbnZhcyBlbGVtZW50IGlzIHNldFxuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENhbnZhc1NpemUnIG9ic2VydmFibGUgKi9cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCd0aHJlZURDYW52YXNTaXplJyk7XG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy50aHJlZURDYW52YXNTaXplID0gY2FjaGUoKTtcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudGhyZWVEQ2FudmFzU2l6ZSA9IG5ld1NpemUgfSk7XG5cdFx0XHQoIHRoaXMub3B0aW9ucy5jYW52YXNSZXNpemVFdmVudCB8fCAkKHdpbmRvdykucmVzaXplLmJpbmQoJCh3aW5kb3cpKSApKGNhY2hlKTtcblx0XHR9KShVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCAmJiBuZXcgVS5TaXplKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSxcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKVxuXHRcdFx0KSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkpO1xuXG5cblx0fSk7XG5cblx0LyogdGhlIGNvZGUgdG8gcnVuIGV2ZXJ5IHRpbWUgM0QtbmVzcyBpcyB0dXJuZWQgb24gKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm5ld0V2ZW50KCczZC1yZW5kZXInKTtcblxuXHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCB0cnVlKS5vblZhbHVlKCgpID0+IHtcblxuXG5cdFx0XHQvLyBUT0RPOiBmaXggYnVnOiB3aGVuIDNEIG1vZGUgaXMgdHVybmVkIG9mZiwgdGhlbiBvbiwgdGlsZXMgbm8gbG9uZ2VyIHJlc3BvbmQgdG8gY2xpY2tzXG5cblxuXHRcdFx0LyogYSBzaG9ydCBub3RhdGlvbiBmb3IgdGhlIGV2ZW50IG9mIDNELW1vZGUgYmVpbmcgdHVybmVkIG9mZiAqL1xuXHRcdFx0dmFyIG9uVGhyZWVETW9kZU9mZiA9IHRoaXMub24oJ3RocmVlRE1vZGUnKS52YWx1ZShmYWxzZSkudGFrZSgxKTtcblxuXG5cdFx0XHQvKiBzY2VuZSAqL1xuXHRcdFx0dGhpcy5fcF90aHJlZURfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHRcdG9uVGhyZWVETW9kZU9mZi5vblZhbHVlKCgpID0+IHsgZGVsZXRlIHRoaXMuX3BfdGhyZWVEX3NjZW5lIH0pO1xuXG5cblx0XHRcdC8qIGNhbWVyYSAqL1xuXHRcdFx0dGhpcy5jYW1lcmEzRCA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC8gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCwgMSwgMTAwMDApO1xuXHRcdFx0Ly90aGlzLmNhbWVyYTNELnNjYWxlLnkgPSAtMTsgLy8gVE9ETzogPz8/P1xuXHRcdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi56ID0gMTAwMDtcblx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKS5jb3B5KHRoaXMuY2FtZXJhM0QucG9zaXRpb24pLnNldFooMCk7XG5cdFx0XHR0aGlzLmNhbWVyYTNELmxvb2tBdCh0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG5cdFx0XHRvblRocmVlRE1vZGVPZmYub25WYWx1ZSgoKSA9PiB7IGRlbGV0ZSB0aGlzLmNhbWVyYTNEIH0pO1xuXHRcdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpLm9uVmFsdWUoKGNhbnZhc1NpemUpID0+IHtcblx0XHRcdFx0dGhpcy5jYW1lcmEzRC5hc3BlY3QgPSBjYW52YXNTaXplLndpZHRoIC8gY2FudmFzU2l6ZS5oZWlnaHQ7XG5cdFx0XHRcdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ubm9ybWFsaXplKClcblx0XHRcdFx0XHRcdC5tdWx0aXBseVNjYWxhcihjYW52YXNTaXplLmhlaWdodCAvIE1hdGgudGFuKFRIUkVFLk1hdGguZGVnVG9SYWQodGhpcy5jYW1lcmEzRC5mb3YpIC8gMikgLyAyKTtcblx0XHRcdFx0dGhpcy5jYW1lcmEzRC51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvKiBsaWdodGluZyAqL1xuXHRcdFx0dGhpcy5fcF90aHJlZURfc2NlbmVcblx0XHRcdFx0XHQuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHgxMDEwMzApKVxuXHRcdFx0XHRcdC5hZGQobmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmVlZGQpLnRyYW5zbGF0ZVgoMSkudHJhbnNsYXRlWSgtMSkudHJhbnNsYXRlWigxKSlcblx0XHRcdFx0XHQuYWRkKG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKS50cmFuc2xhdGVYKC0xKS50cmFuc2xhdGVZKDEpLnRyYW5zbGF0ZVooLTEpKTtcblxuXG5cdFx0XHQvKiByZW5kZXJlcnMgKi9cblx0XHRcdCgoKT0+e1xuXHRcdFx0XHQvKiBXZWJHTCByZW5kZXJlciAqL1xuXHRcdFx0XHR2YXIgd2ViZ2xSZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYWxwaGE6IHRydWUsIGFudGlhbGlhczogdHJ1ZSB9KTtcblx0XHRcdFx0d2ViZ2xSZW5kZXJlci5zb3J0T2JqZWN0cyA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLm9uKCczZC1yZW5kZXInKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKVxuXHRcdFx0XHRcdFx0Lm9uVmFsdWUoKCkgPT4geyB3ZWJnbFJlbmRlcmVyLnJlbmRlcih0aGlzLl9wX3RocmVlRF9zY2VuZSwgdGhpcy5jYW1lcmEzRCkgfSk7XG5cdFx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKVxuXHRcdFx0XHRcdFx0Lm9uVmFsdWUoKGNhbnZhc1NpemUpID0+IHsgd2ViZ2xSZW5kZXJlci5zZXRTaXplKGNhbnZhc1NpemUud2lkdGgsIGNhbnZhc1NpemUuaGVpZ2h0KSB9KTtcblxuXHRcdFx0XHQvKiBDU1MgcmVuZGVyZXIgKi9cblx0XHRcdFx0dmFyIGNzc1JlbmRlcmVyID0gbmV3IFRIUkVFLkNTUzNEUmVuZGVyZXIoKTtcblx0XHRcdFx0JChjc3NSZW5kZXJlci5kb21FbGVtZW50KS5hcHBlbmQod2ViZ2xSZW5kZXJlci5kb21FbGVtZW50KTtcblx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmFwcGVuZChjc3NSZW5kZXJlci5kb21FbGVtZW50KTtcblx0XHRcdFx0b25UaHJlZURNb2RlT2ZmLm9uVmFsdWUoKCkgPT4geyB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuZW1wdHkoKSB9KTtcblx0XHRcdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSlcblx0XHRcdFx0XHRcdC5vblZhbHVlKCgpID0+IHsgY3NzUmVuZGVyZXIucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLmNhbWVyYTNEKSB9KTtcblx0XHRcdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpXG5cdFx0XHRcdFx0XHQub25WYWx1ZSgoY2FudmFzU2l6ZSkgPT4geyBjc3NSZW5kZXJlci5zZXRTaXplKGNhbnZhc1NpemUud2lkdGgsIGNhbnZhc1NpemUuaGVpZ2h0KSB9KTtcblx0XHRcdH0pKCk7XG5cblxuXHRcdFx0LyogcmVuZGVyIG9uIHNpemUtY2hhbmdlIGFuZCBldmVyeSBhbmltYXRpb24gZnJhbWUgKi9cblx0XHRcdEJhY29uLm1lcmdlQWxsKFxuXHRcdFx0XHRcdHRoaXMub24oJ2FuaW1hdGlvbi1mcmFtZScpLFxuXHRcdFx0XHRcdHRoaXMub24oJ3NpemUnKS5jaGFuZ2VzKClcblx0XHRcdCkudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkuYXNzaWduKHRoaXMsICd0cmlnZ2VyJywgJzNkLXJlbmRlcicpO1xuXG5cblx0XHRcdC8qIHRoZSBjaXJjdWl0Ym9hcmQgZmxvYXRpbmcgaW4gM0Qgc3BhY2UgKi9cblx0XHRcdCgoe3BhcmVudDAsIHBvc2l0aW9uMCwgbWFyZ2luMH0pID0+IHtcblxuXHRcdFx0XHQvKiB0aGUgY2lyY3VpdGJvYXJkIGl0c2VsZiAqL1xuXHRcdFx0XHR2YXIgdGhyZWVEQ2lyY3VpdGJvYXJkID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KHRoaXMuZWxlbWVudFxuXHRcdFx0XHRcdFx0LmNzcyh7IGxlZnQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogMCB9KVswXSk7XG5cdFx0XHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZCh0aHJlZURDaXJjdWl0Ym9hcmQpO1xuXHRcdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoY2FudmFzU2l6ZSkgPT4ge1xuXHRcdFx0XHRcdCQodGhyZWVEQ2lyY3VpdGJvYXJkLmVsZW1lbnQpLmNzcyh7XG5cdFx0XHRcdFx0XHR3aWR0aDogY2FudmFzU2l6ZS53aWR0aCAtIG1hcmdpbjAubGVmdCAtIG1hcmdpbjAucmlnaHQsXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGNhbnZhc1NpemUuaGVpZ2h0IC0gbWFyZ2luMC50b3AgLSBtYXJnaW4wLmJvdHRvbVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFUuZXh0ZW5kKHRocmVlRENpcmN1aXRib2FyZC5wb3NpdGlvbiwge1xuXHRcdFx0XHRcdFx0eDogMC41ICogKG1hcmdpbjAubGVmdCAtIG1hcmdpbjAucmlnaHQpLFxuXHRcdFx0XHRcdFx0eTogMC41ICogKG1hcmdpbjAuYm90dG9tIC0gbWFyZ2luMC50b3ApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRvblRocmVlRE1vZGVPZmYub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKHBhcmVudDApLmNzcyhwb3NpdGlvbjApLmNzcyh7XG5cdFx0XHRcdFx0XHQnd2lkdGgnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQnaGVpZ2h0JzogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nOiAnJyxcblx0XHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybSc6ICcnXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0LyogaXRzIGJhY2tmYWNlICovXG5cdFx0XHRcdHZhciB0aHJlZURCYWNrZmFjZSA9IG5ldyBUSFJFRS5DU1MzRE9iamVjdCgkKCc8ZGl2PicpLmNzcyh7XG5cdFx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHRcdFx0Ym9yZGVyOiAnc29saWQgMXB4IGJsYWNrJyxcblx0XHRcdFx0XHRiYWNrZmFjZVZpc2liaWxpdHk6ICdoaWRkZW4nLFxuXHRcdFx0XHRcdGxlZnQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogMFxuXHRcdFx0XHR9KVswXSk7XG5cdFx0XHRcdHRocmVlREJhY2tmYWNlLnJvdGF0aW9uLnggPSBNYXRoLlBJOyAvLyAxODDCsFxuXHRcdFx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhyZWVEQmFja2ZhY2UpO1xuXHRcdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoY2FudmFzU2l6ZSkgPT4ge1xuXHRcdFx0XHRcdCQodGhyZWVEQmFja2ZhY2UuZWxlbWVudCkuY3NzKHtcblx0XHRcdFx0XHRcdHdpZHRoOiBjYW52YXNTaXplLndpZHRoIC0gbWFyZ2luMC5sZWZ0IC0gbWFyZ2luMC5yaWdodCxcblx0XHRcdFx0XHRcdGhlaWdodDogY2FudmFzU2l6ZS5oZWlnaHQgLSBtYXJnaW4wLnRvcCAtIG1hcmdpbjAuYm90dG9tXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0VS5leHRlbmQodGhyZWVEQmFja2ZhY2UucG9zaXRpb24sIHtcblx0XHRcdFx0XHRcdHg6IDAuNSAqIChtYXJnaW4wLmxlZnQgLSBtYXJnaW4wLnJpZ2h0KSxcblx0XHRcdFx0XHRcdHk6IDAuNSAqIChtYXJnaW4wLmJvdHRvbSAtIG1hcmdpbjAudG9wKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdC8qICB0aGUgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIDNEIHRoaW5ncyBjby1sb2NhdGVkIHdpdGggdGhlIGNpcmN1aXRib2FyZCAqL1xuXHRcdFx0XHR0aGlzLm9iamVjdDNEID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG5cdFx0XHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZCh0aGlzLm9iamVjdDNEKTtcblx0XHRcdFx0Ly90aGlzLm9iamVjdDNELnJvdGF0aW9uLnggPSBNYXRoLlBJOyAvLyAxODDCsCAvLyBUT0RPOiBkb2VzIHRoaXMgd29yaz9cblx0XHRcdFx0dGhpcy5vbignc2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpLm9uVmFsdWUoKHNpemUpID0+IHtcblx0XHRcdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSAtc2l6ZS53aWR0aCAvIDIgKyAxO1xuXHRcdFx0XHRcdHRoaXMub2JqZWN0M0QucG9zaXRpb24ueSA9IC1zaXplLmhlaWdodCAvIDIgKyAxO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRcdFUuZXh0ZW5kKHRoaXMub2JqZWN0M0QucG9zaXRpb24sIHtcblx0XHRcdFx0XHRcdHg6IDAuNSAqIChtYXJnaW4wLmxlZnQgLSBtYXJnaW4wLnJpZ2h0KSAtIHRoaXMuc2l6ZS53aWR0aCAvIDIsXG5cdFx0XHRcdFx0XHR5OiAwLjUgKiAobWFyZ2luMC5ib3R0b20gLSBtYXJnaW4wLnRvcCkgKyB0aGlzLnNpemUuaGVpZ2h0IC8gMlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXG5cdFx0XHR9KSh7IC8vIHJlbWVtYmVyIHNvbWUgcHJlLTNEIERPTSBzdGF0ZVxuXHRcdFx0XHRwYXJlbnQwOiB0aGlzLmVsZW1lbnQucGFyZW50KCksXG5cdFx0XHRcdHBvc2l0aW9uMDoge1xuXHRcdFx0XHRcdGxlZnQ6IHRoaXMuZWxlbWVudC5jc3MoJ2xlZnQnKSxcblx0XHRcdFx0XHR0b3A6IHRoaXMuZWxlbWVudC5jc3MoJ3RvcCcpLFxuXHRcdFx0XHRcdHJpZ2h0OiB0aGlzLmVsZW1lbnQuY3NzKCdyaWdodCcpLFxuXHRcdFx0XHRcdGJvdHRvbTogdGhpcy5lbGVtZW50LmNzcygnYm90dG9tJylcblx0XHRcdFx0fSxcblx0XHRcdFx0bWFyZ2luMDoge1xuXHRcdFx0XHRcdGxlZnQ6ICAgdGhpcy5vZmZzZXQubGVmdCAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS5sZWZ0LFxuXHRcdFx0XHRcdHRvcDogICAgdGhpcy5vZmZzZXQudG9wICAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS50b3AsXG5cdFx0XHRcdFx0cmlnaHQ6ICB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggIC0gdGhpcy5zaXplLndpZHRoICAtICh0aGlzLm9mZnNldC5sZWZ0IC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLmxlZnQpLFxuXHRcdFx0XHRcdGJvdHRvbTogdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuc2l6ZS5oZWlnaHQgLSAodGhpcy5vZmZzZXQudG9wICAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS50b3ApXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cblxuXG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0Ly8vKiBgdHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmRgIGhhcyBubyBzaWRlLWVmZmVjdHMgYW5kIGNhbiBiZSB1c2VkICAgKi9cblx0Ly8vKiAgZnJvbSB0aGUgb3V0c2lkZSB0byB0cmFuc2xhdGUgbGVmdC90b3AgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlbiB0byBsZWZ0L3RvcCAgICAgKi9cblx0Ly8vKiAgY29vcmRpbmF0ZXMgb2YgdGhlIHByaXZhdGUgY29vcmRpbmF0ZS1zeXN0ZW0gb2YgdGhlIGNpcmN1aXRib2FyZCwgaG93ZXZlciBpdCBpcyAgKi9cblx0Ly8vKiAgb3JpZW50ZWQgaW4gM0Qgc3BhY2UuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0Ly9wbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLnRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkJywgZnVuY3Rpb24gKHBvc2l0aW9uT25DYW52YXMpIHtcblx0Ly9cblx0Ly9cdHRoaXMuY2FtZXJhM0QudXBkYXRlTWF0cml4V29ybGQoKTtcblx0Ly9cdHRoaXMuY2FtZXJhM0QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHQvL1xuXHQvL1x0dmFyIG1vdXNlM0QgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHQvL1x0bW91c2UzRC54ID0gcG9zaXRpb25PbkNhbnZhcy5sZWZ0IC8gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoICogMiAtIDE7XG5cdC8vXHRtb3VzZTNELnkgPSAtcG9zaXRpb25PbkNhbnZhcy50b3AgLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0ICogMiArIDE7XG5cdC8vXHRtb3VzZTNELnogPSAwLjU7XG5cdC8vXHRQUk9KRUNUT1IudW5wcm9qZWN0VmVjdG9yKG1vdXNlM0QsIHRoaXMuY2FtZXJhM0QpO1xuXHQvL1x0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbiwgbW91c2UzRC5zdWIodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikubm9ybWFsaXplKCkpO1xuXHQvL1x0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0UGxhbmUoUExBTkUpO1xuXHQvL1xuXHQvL1x0LyogaWYgdGhlIHRlc3RlZCBpbnRlcnNlY3Rpb24gaXMgb3V0IG9mIHJhbmdlLCByZXR1cm4gdW5kZWZpbmVkICovXG5cdC8vXHRpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIH1cblx0Ly9cblx0Ly9cdHJldHVybiB7XG5cdC8vXHRcdGxlZnQ6IGludGVyc2VjdHMueCArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQsXG5cdC8vXHRcdHRvcDogLWludGVyc2VjdHMueSArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3Bcblx0Ly9cdH07XG5cdC8vXG5cdC8vfSk7XG5cblxuXHQvKiBhcnRlZmFjdC1zcGVjaWZpYyBvYmplY3QzRCBvYmplY3RzICovXG5cdHBsdWdpbi5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmNpcmN1aXRib2FyZC5vbigndGhyZWVETW9kZScsIHRydWUpLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIDNEIG9iamVjdCBmb3IgdGhpcyB0aWxlICovXG5cdFx0XHR0aGlzLm9iamVjdDNEID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5vYmplY3QzRC5hZGQodGhpcy5vYmplY3QzRCk7XG5cblx0XHRcdC8qIHBvc2l0aW9uIGl0IGFsd2F5cyBpbiB0aGUgY2VudGVyIG9mIHRoZSB0aWxlICovXG5cdFx0XHRCYWNvbi5tZXJnZUFsbCh0aGlzLm9uKCdwb3NpdGlvbicpLCB0aGlzLm9uKCdzaXplJykpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLmxlZnQgKyB0aGlzLnNpemUud2lkdGggLyAyO1xuXHRcdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnRvcCArIHRoaXMuc2l6ZS5oZWlnaHQgLyAyO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGhpZGUgaXQgd2hlbiB0aGUgdGlsZSBpcyBoaWRkZW4gKi9cblx0XHRcdHRoaXMub24oJ3Zpc2libGUnKS5vblZhbHVlKCh2aXNpYmxlKSA9PiB7IHRoaXMub2JqZWN0M0QudmlzaWJsZSA9IHZpc2libGUgfSk7XG5cblx0XHR9KTtcblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGhyZWUtZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnYmFjb24nLCAnQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3MoU3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW1N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmJpbmQodGhpcyldLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2JhY29uJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEJhY29uLCBUV0VFTikge1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRCYWNvbi5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgKHYpID0+IHsgc2luayhuZXcgQmFjb24uTmV4dCh2KSkgfSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBvYmoub24oZXZlbnROYW1lLCBudWxsKSB9O1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cdEJhY29uLmFuaW1hdGlvbkZyYW1lcyA9IFUubWVtb2l6ZShmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdCgoZikgPT4gd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSk7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0dmFyIGl0ZXJhdGlvbkZuID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRzaW5rKCk7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHN0YXJ0IGl0IG5vdyAqL1xuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblxuXHRcdFx0LyogdW5zdWJzY3JpYmUgZnVuY3Rpb24gKi9cblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHRzaW5rKG5ldyBCYWNvbi5FbmQoKSk7XG5cdFx0XHR9O1xuXG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0QmFjb24udHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBzaW5rKG5ldyBCYWNvbi5OZXh0KCgpID0+IHRoaXMpKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoKCkgPT4geyBzaW5rKG5ldyBCYWNvbi5FbmQoKSkgfSk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRCYWNvbi5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleWNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzRXZlbnRTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleWNvZGUpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRCYWNvbi5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBvcGVuID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBjbG9zZSA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXIod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKGhhbmRsZXIsICgpID0+IHtcblx0XHRcdG9wZW4ucHVzaCgpO1xuXHRcdFx0d2FudGVkQnVzLnB1c2goZmFsc2UpO1xuXHRcdFx0Y2xvc2UucHVzaCgpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXAodHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIGNsb3NlLnN0YXJ0V2l0aCh0cnVlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsKG9wZW4pLnJlZHVjZShbXSwgYWNjdW11bGF0b3IpLmZsYXRNYXAoQmFjb24uZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaChuZXcgQmFjb24uTmV4dCgoKSA9PiB2YWx1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRzaW5rKG9sZEJ1ZmZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3Vic2NyaWJlKCgpPT57fSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNlbW92ZScpLnRha2VVbnRpbCgkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHRzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4geyAvLyBUT0RPOiBkb24ndCB1c2UgJ2ZpbHRlcicsIGJ1dCBzb21ldGhpbmcgbGlrZSAnc2tpcFVudGlsJyBvciAnZmxhdE1hcCdcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyZWFtLm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBCYWNvbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvYmFjb24tYW5kLWVnZ3MuanNcbiAqKi8iLCJkZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBodHRwOi8vd3d3LmVtYWdpeC5uZXQvYWNhZGVtaWMvbXNjcy1wcm9qZWN0L2l0ZW0vY2FtZXJhLXN5bmMtd2l0aC1jc3MzLWFuZC13ZWJnbC10aHJlZWpzXG5cdCAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG5cdCAqL1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0ID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuT2JqZWN0M0QuY2FsbCggdGhpcyApO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncmVtb3ZlZCcsIGZ1bmN0aW9uICggLypldmVudCovICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsICkge1xuXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlICk7XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5DU1MzRE9iamVjdC5jYWxsKCB0aGlzLCBlbGVtZW50ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgKTtcblxuXHQvL1xuXG5cdFRIUkVFLkNTUzNEUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLmxvZyggJ1RIUkVFLkNTUzNEUmVuZGVyZXInLCBUSFJFRS5SRVZJU0lPTiApO1xuXG5cdFx0dmFyIF93aWR0aCwgX2hlaWdodDtcblx0XHR2YXIgX3dpZHRoSGFsZiwgX2hlaWdodEhhbGY7XG5cblx0XHR2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdHZhciBjYWNoZSA9IHtcblx0XHRcdGNhbWVyYTogeyBmb3Y6IDAsIHN0eWxlOiAnJyB9LFxuXHRcdFx0b2JqZWN0czoge31cblx0XHR9O1xuXG5cdFx0dmFyIGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRkb21FbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cblx0XHR2YXIgY2FtZXJhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHRkb21FbGVtZW50LmFwcGVuZENoaWxkKCBjYW1lcmFFbGVtZW50ICk7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG5cdFx0XHRfd2lkdGggPSB3aWR0aDtcblx0XHRcdF9oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHRcdF93aWR0aEhhbGYgPSBfd2lkdGggLyAyO1xuXHRcdFx0X2hlaWdodEhhbGYgPSBfaGVpZ2h0IC8gMjtcblxuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdH07XG5cblx0XHR2YXIgZXBzaWxvbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLmFicyggdmFsdWUgKSA8IDAuMDAwMDAxID8gMCA6IHZhbHVlO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRDYW1lcmFDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ21hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldE9iamVjdENTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAndHJhbnNsYXRlM2QoLTUwJSwtNTAlLDApIG1hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIHJlbmRlck9iamVjdCA9IGZ1bmN0aW9uICggb2JqZWN0LCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RPYmplY3QgKSB7XG5cblx0XHRcdFx0dmFyIHN0eWxlO1xuXG5cdFx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RTcHJpdGUgKSB7XG5cblx0XHRcdFx0XHQvLyBodHRwOi8vc3dpZnRjb2Rlci53b3JkcHJlc3MuY29tLzIwMDgvMTEvMjUvY29uc3RydWN0aW5nLWEtYmlsbGJvYXJkLW1hdHJpeC9cblxuXHRcdFx0XHRcdG1hdHJpeC5jb3B5KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICk7XG5cdFx0XHRcdFx0bWF0cml4LnRyYW5zcG9zZSgpO1xuXHRcdFx0XHRcdG1hdHJpeC5jb3B5UG9zaXRpb24oIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXHRcdFx0XHRcdG1hdHJpeC5zY2FsZSggb2JqZWN0LnNjYWxlICk7XG5cblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDMgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyA3IF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTEgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxNSBdID0gMTtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBtYXRyaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGVsZW1lbnQgPSBvYmplY3QuZWxlbWVudDtcblx0XHRcdFx0dmFyIGNhY2hlZFN0eWxlID0gY2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF07XG5cblx0XHRcdFx0aWYgKCBjYWNoZWRTdHlsZSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlZFN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdFx0Y2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF0gPSBzdHlsZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBlbGVtZW50LnBhcmVudE5vZGUgIT09IGNhbWVyYUVsZW1lbnQgKSB7XG5cblx0XHRcdFx0XHRjYW1lcmFFbGVtZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgbCA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRcdHJlbmRlck9iamVjdCggb2JqZWN0LmNoaWxkcmVuWyBpIF0sIGNhbWVyYSApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbiAoIHNjZW5lLCBjYW1lcmEgKSB7XG5cblx0XHRcdHZhciBmb3YgPSAwLjUgLyBNYXRoLnRhbiggVEhSRUUuTWF0aC5kZWdUb1JhZCggY2FtZXJhLmZvdiAqIDAuNSApICkgKiBfaGVpZ2h0O1xuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5mb3YgIT09IGZvdiApIHtcblxuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuV2Via2l0UGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5Nb3pQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLm9QZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5wZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuZm92ID0gZm92O1xuXG5cdFx0XHR9XG5cblx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gdW5kZWZpbmVkICkgeyBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKSB9XG5cblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UuZ2V0SW52ZXJzZSggY2FtZXJhLm1hdHJpeFdvcmxkICk7XG5cblx0XHRcdHZhciBzdHlsZSA9IFwidHJhbnNsYXRlM2QoMCwwLFwiICsgZm92ICsgXCJweClcIiArIGdldENhbWVyYUNTU01hdHJpeCggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApICtcblx0XHRcdFx0XCIgdHJhbnNsYXRlM2QoXCIgKyBfd2lkdGhIYWxmICsgXCJweCxcIiArIF9oZWlnaHRIYWxmICsgXCJweCwgMClcIjtcblxuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5zdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLnN0eWxlID0gc3R5bGU7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyT2JqZWN0KCBzY2VuZSwgY2FtZXJhICk7XG5cblx0XHR9O1xuXG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2e2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2Pi5jaXJjdWl0Ym9hcmR7cG9pbnRlci1ldmVudHM6dmlzaWJsZTstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO30udGhyZWUtZC1jYW52YXM+ZGl2PmNhbnZhc3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MTtwb2ludGVyLWV2ZW50czpub25lO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQuanMifQ==