(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "baconjs", "tweenjs", "bacon.model", "bacon.jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery")) : factory(root["jQuery"], root["THREE"], root["P"], root["Bacon"], root["TWEEN"], root["bacon.model"], root["bacon.jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, Bacon) {
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
	    this.newProperty('threeDCanvasSize').addSource(Bacon.mergeAll([Bacon.once(), (this.options.canvasResizeEvent || $(window).asEventStream('resize'))]).map((function() {
	      return $__0.threeDCanvasElement && new U.Size($__0.threeDCanvasElement.height(), $__0.threeDCanvasElement.width());
	    })));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newEvent('3d-render');
	    this.on('threeDMode').value(true).onValue((function() {
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
	      Bacon.mergeAll([$__0.on('animation-frame'), $__0.on('size').changes()]).takeWhile($__0.on('threeDMode')).assign($__0, 'trigger', '3d-render');
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
	        Bacon.mergeAll([$__0.on('threeDCanvasSize'), $__0.on('size')]).takeWhile($__0.on('threeDMode')).onValue((function() {
	          $__0.object3D.position.x = 0.5 * (margin0.left - margin0.right) - $__0.size.width / 2 + 1;
	          $__0.object3D.position.y = 0.5 * (margin0.bottom - margin0.top) - $__0.size.height / 2 + 1;
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
	    this.circuitboard.on('threeDMode').value(true).onValue((function() {
	      $__0.object3D = new THREE.Object3D();
	      $__0.circuitboard.object3D.add($__0.object3D);
	      Bacon.mergeAll($__0.on('position'), $__0.on('size')).onValue((function() {
	        $__0.object3D.position.x = $__0.position.left + $__0.size.width / 2;
	        $__0.object3D.position.y = $__0.circuitboard.threeDCanvasSize.height - $__0.position.top - $__0.size.height / 2;
	      }));
	      $__0.on('visible').onValue((function(visible) {
	        $__0.object3D.visible = visible;
	      }));
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(9);
	  __webpack_require__(10);
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
	
	//# sourceMappingURL=<compileOutput>


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

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-three-d.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-three-d.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  var list = [];
	  list.toString = function toString() {
	    var result = [];
	    for (var i = 0; i < this.length; i++) {
	      var item = this[i];
	      if (item[2]) {
	        result.push("@media " + item[2] + "{" + item[1] + "}");
	      } else {
	        result.push(item[1]);
	      }
	    }
	    return result.join("");
	  };
	  return list;
	};
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNjlhNzU4OTc3NzgxY2IyNzFlNiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvQ1NTM0RSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLm1vZGVsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3AtdGhyZWUtZC5zY3NzP2E4YzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3AtdGhyZWUtZC5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx5QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHLEdBQUcsTUFBSTtBQUM3QixjQUFXLENBQUM7QUFJUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLFVBQVE7QUFDZCxZQUFPLENBQUcsRUFBQyxtQkFBa0IsQ0FBRyxjQUFZLENBQUcsaUJBQWUsQ0FBQztBQUFBLEdBQ2hFLENBQUMsQ0FBQztBQUlGLFVBQVMsZUFBYSxDQUFFLENBQUU7QUFDckIsY0FBSyxDQUFDO0FBQ1YsT0FBSTtBQUNILFlBQUssRUFBSSxFQUFDLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDdEIsWUFBTyxFQUFDLENBQUMsQ0FBQyxNQUFLLENBQUUsRUFBQyxXQUFZLENBQUMsT0FBTSxD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TSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0dBQ3ZCLENBQUM7QUFDRCxRQUFPLEtBQUcsQ0FBQztBQUNaO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25qc1wiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJiYWNvbi5tb2RlbFwiKSwgcmVxdWlyZShcImJhY29uLmpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImJsdWViaXJkXCIsIFwiYmFjb25qc1wiLCBcInR3ZWVuanNcIiwgXCJiYWNvbi5tb2RlbFwiLCBcImJhY29uLmpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uanNcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiYmFjb24ubW9kZWxcIiksIHJlcXVpcmUoXCJiYWNvbi5qcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImJhY29uLm1vZGVsXCJdLCByb290W1wiYmFjb24uanF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ2OWE3NTg5Nzc3ODFjYjI3MWU2XG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMnLFxuXHQnLi91dGlsL0NTUzNEUmVuZGVyZXIuanMnLFxuXHQnLi9wLXRocmVlLWQuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBUSFJFRSwgVSwgQmFjb24pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogdGhlIHBsdWdpbiAqL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZCcsXG5cdFx0cmVxdWlyZXM6IFsncG9zaXRpb24tdHJhY2tpbmcnLCAndGlsZS1oaWRkZW4nLCAnYW5pbWF0aW9uLWxvb3AnXVxuXHR9KTtcblxuXG5cdC8qIHRlc3QgZm9yIGJyb3dzZXIgM0Qgc3VwcG9ydCAqL1xuXHRmdW5jdGlvbiBicm93c2VyU3VwcG9ydCgpIHtcblx0XHR2YXIgY2FudmFzO1xuXHRcdHRyeSB7XG5cdFx0XHRjYW52YXMgPSAkKCc8Y2FudmFzPicpO1xuXHRcdFx0cmV0dXJuICEhKGNhbnZhc1swXS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhc1swXS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSk7XG5cdFx0fSBjYXRjaCAoX18pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y2FudmFzID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cblx0LyogdGhlIGNvbnN0cnVjdG9yIGlzIHJ1biBvbmNlIHRvIGluaXRpYWxpemUgcG90ZW50aWFsIDNELW5lc3MgKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblxuXHRcdC8qIHRlc3QgZm9yIGJyb3dzZXIgc3VwcG9ydCAqL1xuXHRcdGlmICghYnJvd3NlclN1cHBvcnQoKSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiVGhpcyBicm93c2VyIGRvZXNuJ3Qgc2VlbSB0byBoYXZlIFdlYkdMIHN1cHBvcnQuXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXG5cdFx0LyogdGhlICd0aHJlZURDYW52YXNFbGVtZW50JyBwcm9wZXJ0eSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRENhbnZhc0VsZW1lbnQnKTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNFbGVtZW50Jykuc2xpZGluZ1dpbmRvdygyKS5tYXAoJy5yZXZlcnNlJykub25WYWx1ZXMoKG5ld0NhbnZhcywgb2xkQ2FudmFzKSA9PiB7XG5cdFx0XHRpZiAob2xkQ2FudmFzKSB7IG9sZENhbnZhcy5yZW1vdmVDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0XHRpZiAobmV3Q2FudmFzKSB7IG5ld0NhbnZhcy5hZGRDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8qIHdhcyBhIGNhbnZhcyBnaXZlbiB0aHJvdWdoIHRoZSBvcHRpb25zPyAqL1xuXHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCA9IHRoaXMub3B0aW9ucy50aHJlZURDYW52YXNFbGVtZW50O1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5ICovXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgndGhyZWVETW9kZScsIHtcblx0XHRcdGluaXRpYWw6IFUuaXNEZWZpbmVkKHRoaXMub3B0aW9ucy50aHJlZURDYW52YXNFbGVtZW50KVxuXHRcdH0pOyAvLyBUT0RPOiBlcnJvciBpZiBubyBjYW52YXMgZWxlbWVudCBpcyBzZXRcblxuXG5cdFx0LyogdGhlICd0aHJlZURDYW52YXNTaXplJyBvYnNlcnZhYmxlICovXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgndGhyZWVEQ2FudmFzU2l6ZScpLmFkZFNvdXJjZShCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRCYWNvbi5vbmNlKCksXG5cdFx0XHQoIHRoaXMub3B0aW9ucy5jYW52YXNSZXNpemVFdmVudCB8fCAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgncmVzaXplJykgKVxuXHRcdF0pLm1hcCgoKSA9PiB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgJiYgbmV3IFUuU2l6ZShcblx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpLFxuXHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKVxuXHRcdCkpKTtcblxuXG5cdH0pO1xuXG5cdC8qIHRoZSBjb2RlIHRvIHJ1biBldmVyeSB0aW1lIDNELW5lc3MgaXMgdHVybmVkIG9uICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdFdmVudCgnM2QtcmVuZGVyJyk7XG5cblx0XHR0aGlzLm9uKCd0aHJlZURNb2RlJykudmFsdWUodHJ1ZSkub25WYWx1ZSgoKSA9PiB7XG5cblxuXHRcdFx0Ly8gVE9ETzogZml4IGJ1Zzogd2hlbiAzRCBtb2RlIGlzIHR1cm5lZCBvZmYsIHRoZW4gb24sIHRpbGVzIG5vIGxvbmdlciByZXNwb25kIHRvIGNsaWNrc1xuXG5cblx0XHRcdC8qIGEgc2hvcnQgbm90YXRpb24gZm9yIHRoZSBldmVudCBvZiAzRC1tb2RlIGJlaW5nIHR1cm5lZCBvZmYgKi9cblx0XHRcdHZhciBvblRocmVlRE1vZGVPZmYgPSB0aGlzLm9uKCd0aHJlZURNb2RlJykudmFsdWUoZmFsc2UpLnRha2UoMSk7XG5cblxuXHRcdFx0Lyogc2NlbmUgKi9cblx0XHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0XHRvblRocmVlRE1vZGVPZmYub25WYWx1ZSgoKSA9PiB7IGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9zY2VuZSB9KTtcblxuXG5cdFx0XHQvKiBjYW1lcmEgKi9cblx0XHRcdHRoaXMuY2FtZXJhM0QgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQsIDEsIDEwMDAwKTtcblx0XHRcdC8vdGhpcy5jYW1lcmEzRC5zY2FsZS55ID0gLTE7IC8vIFRPRE86ID8/Pz9cblx0XHRcdHRoaXMuY2FtZXJhM0QucG9zaXRpb24ueiA9IDEwMDA7XG5cdFx0XHR0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuY29weSh0aGlzLmNhbWVyYTNELnBvc2l0aW9uKS5zZXRaKDApO1xuXHRcdFx0dGhpcy5jYW1lcmEzRC5sb29rQXQodGhpcy5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQpO1xuXHRcdFx0b25UaHJlZURNb2RlT2ZmLm9uVmFsdWUoKCkgPT4geyBkZWxldGUgdGhpcy5jYW1lcmEzRCB9KTtcblx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2FtZXJhM0QuYXNwZWN0ID0gY2FudmFzU2l6ZS53aWR0aCAvIGNhbnZhc1NpemUuaGVpZ2h0O1xuXHRcdFx0XHR0aGlzLmNhbWVyYTNELnBvc2l0aW9uLm5vcm1hbGl6ZSgpXG5cdFx0XHRcdFx0XHQubXVsdGlwbHlTY2FsYXIoY2FudmFzU2l6ZS5oZWlnaHQgLyBNYXRoLnRhbihUSFJFRS5NYXRoLmRlZ1RvUmFkKHRoaXMuY2FtZXJhM0QuZm92KSAvIDIpIC8gMik7XG5cdFx0XHRcdHRoaXMuY2FtZXJhM0QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHRcdFx0fSk7XG5cblxuXHRcdFx0LyogbGlnaHRpbmcgKi9cblx0XHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lXG5cdFx0XHRcdFx0LmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MTAxMDMwKSlcblx0XHRcdFx0XHQuYWRkKG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKS50cmFuc2xhdGVYKDEpLnRyYW5zbGF0ZVkoLTEpLnRyYW5zbGF0ZVooMSkpXG5cdFx0XHRcdFx0LmFkZChuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCkudHJhbnNsYXRlWCgtMSkudHJhbnNsYXRlWSgxKS50cmFuc2xhdGVaKC0xKSk7XG5cblxuXHRcdFx0LyogcmVuZGVyZXJzICovXG5cdFx0XHQoKCk9Pntcblx0XHRcdFx0LyogV2ViR0wgcmVuZGVyZXIgKi9cblx0XHRcdFx0dmFyIHdlYmdsUmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IHRydWUgfSk7XG5cdFx0XHRcdHdlYmdsUmVuZGVyZXIuc29ydE9iamVjdHMgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSlcblx0XHRcdFx0XHRcdC5vblZhbHVlKCgpID0+IHsgd2ViZ2xSZW5kZXJlci5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuY2FtZXJhM0QpIH0pO1xuXHRcdFx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSlcblx0XHRcdFx0XHRcdC5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7IHdlYmdsUmVuZGVyZXIuc2V0U2l6ZShjYW52YXNTaXplLndpZHRoLCBjYW52YXNTaXplLmhlaWdodCkgfSk7XG5cblx0XHRcdFx0LyogQ1NTIHJlbmRlcmVyICovXG5cdFx0XHRcdHZhciBjc3NSZW5kZXJlciA9IG5ldyBUSFJFRS5DU1MzRFJlbmRlcmVyKCk7XG5cdFx0XHRcdCQoY3NzUmVuZGVyZXIuZG9tRWxlbWVudCkuYXBwZW5kKHdlYmdsUmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5hcHBlbmQoY3NzUmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cdFx0XHRcdG9uVGhyZWVETW9kZU9mZi5vblZhbHVlKCgpID0+IHsgdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmVtcHR5KCkgfSk7XG5cdFx0XHRcdHRoaXMub24oJzNkLXJlbmRlcicpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpXG5cdFx0XHRcdFx0XHQub25WYWx1ZSgoKSA9PiB7IGNzc1JlbmRlcmVyLnJlbmRlcih0aGlzLl9wX3RocmVlRF9zY2VuZSwgdGhpcy5jYW1lcmEzRCkgfSk7XG5cdFx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKVxuXHRcdFx0XHRcdFx0Lm9uVmFsdWUoKGNhbnZhc1NpemUpID0+IHsgY3NzUmVuZGVyZXIuc2V0U2l6ZShjYW52YXNTaXplLndpZHRoLCBjYW52YXNTaXplLmhlaWdodCkgfSk7XG5cdFx0XHR9KSgpO1xuXG5cblx0XHRcdC8qIHJlbmRlciBvbiBzaXplLWNoYW5nZSBhbmQgZXZlcnkgYW5pbWF0aW9uIGZyYW1lICovXG5cdFx0XHRCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRcdHRoaXMub24oJ2FuaW1hdGlvbi1mcmFtZScpLFxuXHRcdFx0XHR0aGlzLm9uKCdzaXplJykuY2hhbmdlcygpXG5cdFx0XHRdKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5hc3NpZ24odGhpcywgJ3RyaWdnZXInLCAnM2QtcmVuZGVyJyk7XG5cblxuXHRcdFx0LyogdGhlIGNpcmN1aXRib2FyZCBmbG9hdGluZyBpbiAzRCBzcGFjZSAqL1xuXHRcdFx0KCh7cGFyZW50MCwgcG9zaXRpb24wLCBtYXJnaW4wfSkgPT4ge1xuXG5cdFx0XHRcdC8qIHRoZSBjaXJjdWl0Ym9hcmQgaXRzZWxmICovXG5cdFx0XHRcdHZhciB0aHJlZURDaXJjdWl0Ym9hcmQgPSBuZXcgVEhSRUUuQ1NTM0RPYmplY3QodGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0XHQuY3NzKHsgbGVmdDogMCwgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAwIH0pWzBdKTtcblx0XHRcdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRocmVlRENpcmN1aXRib2FyZCk7XG5cdFx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7XG5cdFx0XHRcdFx0JCh0aHJlZURDaXJjdWl0Ym9hcmQuZWxlbWVudCkuY3NzKHtcblx0XHRcdFx0XHRcdHdpZHRoOiBjYW52YXNTaXplLndpZHRoIC0gbWFyZ2luMC5sZWZ0IC0gbWFyZ2luMC5yaWdodCxcblx0XHRcdFx0XHRcdGhlaWdodDogY2FudmFzU2l6ZS5oZWlnaHQgLSBtYXJnaW4wLnRvcCAtIG1hcmdpbjAuYm90dG9tXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0VS5leHRlbmQodGhyZWVEQ2lyY3VpdGJvYXJkLnBvc2l0aW9uLCB7XG5cdFx0XHRcdFx0XHR4OiAwLjUgKiAobWFyZ2luMC5sZWZ0IC0gbWFyZ2luMC5yaWdodCksXG5cdFx0XHRcdFx0XHR5OiAwLjUgKiAobWFyZ2luMC5ib3R0b20gLSBtYXJnaW4wLnRvcClcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdG9uVGhyZWVETW9kZU9mZi5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZGV0YWNoKCkuYXBwZW5kVG8ocGFyZW50MCkuY3NzKHBvc2l0aW9uMCkuY3NzKHtcblx0XHRcdFx0XHRcdCd3aWR0aCc6ICdhdXRvJyxcblx0XHRcdFx0XHRcdCdoZWlnaHQnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybSc6ICcnLFxuXHRcdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtJzogJydcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblxuXHRcdFx0XHQvKiBpdHMgYmFja2ZhY2UgKi9cblx0XHRcdFx0dmFyIHRocmVlREJhY2tmYWNlID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KCQoJzxkaXY+JykuY3NzKHtcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHRib3JkZXI6ICdzb2xpZCAxcHggYmxhY2snLFxuXHRcdFx0XHRcdGJhY2tmYWNlVmlzaWJpbGl0eTogJ2hpZGRlbicsXG5cdFx0XHRcdFx0bGVmdDogMCwgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAwXG5cdFx0XHRcdH0pWzBdKTtcblx0XHRcdFx0dGhyZWVEQmFja2ZhY2Uucm90YXRpb24ueCA9IE1hdGguUEk7IC8vIDE4MMKwXG5cdFx0XHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZCh0aHJlZURCYWNrZmFjZSk7XG5cdFx0XHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChjYW52YXNTaXplKSA9PiB7XG5cdFx0XHRcdFx0JCh0aHJlZURCYWNrZmFjZS5lbGVtZW50KS5jc3Moe1xuXHRcdFx0XHRcdFx0d2lkdGg6IGNhbnZhc1NpemUud2lkdGggLSBtYXJnaW4wLmxlZnQgLSBtYXJnaW4wLnJpZ2h0LFxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBjYW52YXNTaXplLmhlaWdodCAtIG1hcmdpbjAudG9wIC0gbWFyZ2luMC5ib3R0b21cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRVLmV4dGVuZCh0aHJlZURCYWNrZmFjZS5wb3NpdGlvbiwge1xuXHRcdFx0XHRcdFx0eDogMC41ICogKG1hcmdpbjAubGVmdCAtIG1hcmdpbjAucmlnaHQpLFxuXHRcdFx0XHRcdFx0eTogMC41ICogKG1hcmdpbjAuYm90dG9tIC0gbWFyZ2luMC50b3ApXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdFx0LyogIHRoZSBvYmplY3QgY29udGFpbmluZyBhbGwgM0QgdGhpbmdzIGNvLWxvY2F0ZWQgd2l0aCB0aGUgY2lyY3VpdGJvYXJkICovXG5cdFx0XHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHRcdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRoaXMub2JqZWN0M0QpO1xuXHRcdFx0XHRCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRcdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScpLFxuXHRcdFx0XHRcdHRoaXMub24oJ3NpemUnKVxuXHRcdFx0XHRdKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSAwLjUgKiAobWFyZ2luMC5sZWZ0IC0gbWFyZ2luMC5yaWdodCkgLSB0aGlzLnNpemUud2lkdGggIC8gMiArIDE7XG5cdFx0XHRcdFx0dGhpcy5vYmplY3QzRC5wb3NpdGlvbi55ID0gMC41ICogKG1hcmdpbjAuYm90dG9tIC0gbWFyZ2luMC50b3ApIC0gdGhpcy5zaXplLmhlaWdodCAvIDIgKyAxO1xuXHRcdFx0XHR9KTtcblxuXG5cdFx0XHR9KSh7IC8vIHJlbWVtYmVyIHNvbWUgcHJlLTNEIERPTSBzdGF0ZVxuXHRcdFx0XHRwYXJlbnQwOiB0aGlzLmVsZW1lbnQucGFyZW50KCksXG5cdFx0XHRcdHBvc2l0aW9uMDoge1xuXHRcdFx0XHRcdGxlZnQ6IHRoaXMuZWxlbWVudC5jc3MoJ2xlZnQnKSxcblx0XHRcdFx0XHR0b3A6IHRoaXMuZWxlbWVudC5jc3MoJ3RvcCcpLFxuXHRcdFx0XHRcdHJpZ2h0OiB0aGlzLmVsZW1lbnQuY3NzKCdyaWdodCcpLFxuXHRcdFx0XHRcdGJvdHRvbTogdGhpcy5lbGVtZW50LmNzcygnYm90dG9tJylcblx0XHRcdFx0fSxcblx0XHRcdFx0bWFyZ2luMDoge1xuXHRcdFx0XHRcdGxlZnQ6ICAgdGhpcy5vZmZzZXQubGVmdCAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS5sZWZ0LFxuXHRcdFx0XHRcdHRvcDogICAgdGhpcy5vZmZzZXQudG9wICAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS50b3AsXG5cdFx0XHRcdFx0cmlnaHQ6ICB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggIC0gdGhpcy5zaXplLndpZHRoICAtICh0aGlzLm9mZnNldC5sZWZ0IC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLmxlZnQpLFxuXHRcdFx0XHRcdGJvdHRvbTogdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuc2l6ZS5oZWlnaHQgLSAodGhpcy5vZmZzZXQudG9wICAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS50b3ApXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cblxuXG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0Ly8vKiBgdHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmRgIGhhcyBubyBzaWRlLWVmZmVjdHMgYW5kIGNhbiBiZSB1c2VkICAgKi9cblx0Ly8vKiAgZnJvbSB0aGUgb3V0c2lkZSB0byB0cmFuc2xhdGUgbGVmdC90b3AgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlbiB0byBsZWZ0L3RvcCAgICAgKi9cblx0Ly8vKiAgY29vcmRpbmF0ZXMgb2YgdGhlIHByaXZhdGUgY29vcmRpbmF0ZS1zeXN0ZW0gb2YgdGhlIGNpcmN1aXRib2FyZCwgaG93ZXZlciBpdCBpcyAgKi9cblx0Ly8vKiAgb3JpZW50ZWQgaW4gM0Qgc3BhY2UuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0Ly9wbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLnRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkJywgZnVuY3Rpb24gKHBvc2l0aW9uT25DYW52YXMpIHtcblx0Ly9cblx0Ly9cdHRoaXMuY2FtZXJhM0QudXBkYXRlTWF0cml4V29ybGQoKTtcblx0Ly9cdHRoaXMuY2FtZXJhM0QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHQvL1xuXHQvL1x0dmFyIG1vdXNlM0QgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHQvL1x0bW91c2UzRC54ID0gcG9zaXRpb25PbkNhbnZhcy5sZWZ0IC8gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoICogMiAtIDE7XG5cdC8vXHRtb3VzZTNELnkgPSAtcG9zaXRpb25PbkNhbnZhcy50b3AgLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0ICogMiArIDE7XG5cdC8vXHRtb3VzZTNELnogPSAwLjU7XG5cdC8vXHRQUk9KRUNUT1IudW5wcm9qZWN0VmVjdG9yKG1vdXNlM0QsIHRoaXMuY2FtZXJhM0QpO1xuXHQvL1x0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbiwgbW91c2UzRC5zdWIodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikubm9ybWFsaXplKCkpO1xuXHQvL1x0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0UGxhbmUoUExBTkUpO1xuXHQvL1xuXHQvL1x0LyogaWYgdGhlIHRlc3RlZCBpbnRlcnNlY3Rpb24gaXMgb3V0IG9mIHJhbmdlLCByZXR1cm4gdW5kZWZpbmVkICovXG5cdC8vXHRpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIH1cblx0Ly9cblx0Ly9cdHJldHVybiB7XG5cdC8vXHRcdGxlZnQ6IGludGVyc2VjdHMueCArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQsXG5cdC8vXHRcdHRvcDogLWludGVyc2VjdHMueSArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3Bcblx0Ly9cdH07XG5cdC8vXG5cdC8vfSk7XG5cblxuXHQvKiBhcnRlZmFjdC1zcGVjaWZpYyBvYmplY3QzRCBvYmplY3RzICovXG5cdHBsdWdpbi5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLmNpcmN1aXRib2FyZC5vbigndGhyZWVETW9kZScpLnZhbHVlKHRydWUpLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIDNEIG9iamVjdCBmb3IgdGhpcyB0aWxlICovXG5cdFx0XHR0aGlzLm9iamVjdDNEID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5vYmplY3QzRC5hZGQodGhpcy5vYmplY3QzRCk7XG5cblx0XHRcdC8qIHBvc2l0aW9uIGl0IGFsd2F5cyBpbiB0aGUgY2VudGVyIG9mIHRoZSB0aWxlICovXG5cdFx0XHRCYWNvbi5tZXJnZUFsbCh0aGlzLm9uKCdwb3NpdGlvbicpLCB0aGlzLm9uKCdzaXplJykpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLmxlZnQgKyB0aGlzLnNpemUud2lkdGggLyAyO1xuXHRcdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnkgPSB0aGlzLmNpcmN1aXRib2FyZC50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMucG9zaXRpb24udG9wIC0gdGhpcy5zaXplLmhlaWdodCAvIDI7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogaGlkZSBpdCB3aGVuIHRoZSB0aWxlIGlzIGhpZGRlbiAqL1xuXHRcdFx0dGhpcy5vbigndmlzaWJsZScpLm9uVmFsdWUoKHZpc2libGUpID0+IHsgdGhpcy5vYmplY3QzRC52aXNpYmxlID0gdmlzaWJsZSB9KTtcblxuXHRcdH0pO1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGhyZWUtZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2JhY29uanMnLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24sIFRXRUVOKSB7XG5cblx0cmVxdWlyZSgnYmFjb24ubW9kZWwnKTtcblx0cmVxdWlyZSgnYmFjb24uanF1ZXJ5Jyk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEJhY29uLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCAodikgPT4geyBzaW5rKG5ldyBCYWNvbi5OZXh0KHYpKSB9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRCYWNvbi5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRpZiAoc2luaygpID09PSBCYWNvbi5ub01vcmUpIHsgc3Vic2NyaWJlZCA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEJhY29uLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogYSBsb2NhbCBmdW5jdGlvbiB0byBwbHVnIGluIG90aGVyIHN0cmVhbXMsIGtlZXBpbmcgdHJhY2sgaW4gb3JkZXIgdG8gJ2VuZCcgdGhlIGJ1cyAqL1xuXHRcdHZhciBhZGRTdHJlYW0gPSAoKCkgPT4ge1xuXHRcdFx0dmFyIGNoYWluZWRTdHJlYW1zID0gMDtcblx0XHRcdHJldHVybiAoc3RyZWFtKSA9PiB7XG5cdFx0XHRcdGNoYWluZWRTdHJlYW1zICs9IDE7XG5cdFx0XHRcdGJ1cy5wbHVnKHN0cmVhbSk7XG5cdFx0XHRcdHN0cmVhbS5vbkVuZCgoKSA9PiB7XG5cdFx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgLT0gMTtcblx0XHRcdFx0XHRpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHsgYnVzLmVuZCgpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cblx0XHQvKiBtYWluIHN0cmVhbSAqL1xuXHRcdGFkZFN0cmVhbShCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHRpZiAoZWFzaW5nKSB7IHR3LmVhc2luZyhlYXNpbmcpIH1cblx0XHRcdGlmIChkZWxheSkgIHsgdHcuZGVsYXkoZGVsYXkpIH1cblx0XHRcdHR3Lm9uVXBkYXRlKGZ1bmN0aW9uICgpIHsgc2luayhuZXcgQmFjb24uTmV4dCgoKSA9PiB0aGlzKSkgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKCgpID0+IHsgc2luayhuZXcgQmFjb24uRW5kKCkpIH0pO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0QmFjb24ua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXljb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXljb2RlKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0QmFjb24ubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgb3BlbiA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHR2YXIgY2xvc2UgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyKHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZShoYW5kbGVyLCAoKSA9PiB7XG5cdFx0XHRvcGVuLnB1c2goKTtcblx0XHRcdHdhbnRlZEJ1cy5wdXNoKGZhbHNlKTtcblx0XHRcdGNsb3NlLnB1c2goKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwKHRydWUpKTtcblx0XHRcdHJldHVybiBjbG9zZS5zdGFydFdpdGgodHJ1ZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbChvcGVuKS5yZWR1Y2UoW10sIGFjY3VtdWxhdG9yKS5mbGF0TWFwKEJhY29uLmZyb21BcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoaXMgcmVzdHJpY3RzIGEgZ2l2ZW4gc3RyZWFtIHRvIGEgd3JhcHBlciBzdHJlYW0gY3JlYXRlZCB3aXRoIHRoZSBtZXRob2QgYWJvdmUuXG5cdC8vIEFsbCBpdHMgb3JpZ2luYWwgZXZlbnRzIGFyZSBub3cgZmlyZWQgaW5zaWRlIHRoZSBwcm92aWRlZCB3aW5kb3cuIFNldCBgb3B0aW9ucy5idWZmZXJgXG5cdC8vIHRvIGB0cnVlYCBpZiBhbGwgaXRzIGV2ZW50cyBzaG91bGQgYmUgYnVmZmVyZWQgYW5kIHJlbGVhc2VkIGluc2lkZSB0aGUgbmV4dCB3aW5kb3cuXG5cdC8vIE90aGVyd2lzZSwgb25seSB0aGUgbGFzdCBldmVudCBpcyByZXRhaW5lZC5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIFRoaXMgaXMgYSBjaGVhcCB2ZXJzaW9uIG9mIHRoZSBsaW1pdGVyIGRlZmluZWQgYWJvdmUuIFRPRE86IHVzZSB0aGUgbGltaXRlciB3aGVyZSB0aGlzIGlzIG5vdyB1c2VkXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2gobmV3IEJhY29uLk5leHQoKCkgPT4gdmFsdWUpKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG5cdFx0XHRcdFx0YnVmZmVyID0gW107XG5cdFx0XHRcdFx0c2luayhvbGRCdWZmZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnN1YnNjcmliZSgoKT0+e30pO1xuXHR9O1xuXG5cdC8vIFRoaXMgaXMgYSAnc21hcnQnIC5zdG9wUHJvcGFnYXRpb24sIG1hcmtpbmcgZXZlbnRzIHdpdGggYSBsYWJlbFxuXHQvLyBhbmQgc2tpcHBpbmcgdGhvc2UgdGhhdCBhbHJlYWR5IGhhdmUgdGhhdCBsYWJlbC5cblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbiAoYnV0dG9uSWQpIHtcblx0XHR2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6IChiID0+IGIgPT09IGJ1dHRvbklkKTtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoZSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsKCQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKSlcblx0XHRcdFx0XHQubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWwodW50aWxTdHJlYW0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gQmFjb247XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2JhY29uLWFuZC1lZ2dzLmpzXG4gKiovIiwiZGVmaW5lKFsndGhyZWUtanMnXSwgZnVuY3Rpb24gKFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQmFzZWQgb24gaHR0cDovL3d3dy5lbWFnaXgubmV0L2FjYWRlbWljL21zY3MtcHJvamVjdC9pdGVtL2NhbWVyYS1zeW5jLXdpdGgtY3NzMy1hbmQtd2ViZ2wtdGhyZWVqc1xuXHQgKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuXHQgKi9cblxuXHRUSFJFRS5DU1MzRE9iamVjdCA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLk9iamVjdDNELmNhbGwoIHRoaXMgKTtcblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3JlbW92ZWQnLCBmdW5jdGlvbiAoIC8qZXZlbnQqLyApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLk9iamVjdDNELnByb3RvdHlwZSApO1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuQ1NTM0RPYmplY3QuY2FsbCggdGhpcywgZWxlbWVudCApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlICk7XG5cblx0Ly9cblxuXHRUSFJFRS5DU1MzRFJlbmRlcmVyID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS5sb2coICdUSFJFRS5DU1MzRFJlbmRlcmVyJywgVEhSRUUuUkVWSVNJT04gKTtcblxuXHRcdHZhciBfd2lkdGgsIF9oZWlnaHQ7XG5cdFx0dmFyIF93aWR0aEhhbGYsIF9oZWlnaHRIYWxmO1xuXG5cdFx0dmFyIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0XHR2YXIgY2FjaGUgPSB7XG5cdFx0XHRjYW1lcmE6IHsgZm92OiAwLCBzdHlsZTogJycgfSxcblx0XHRcdG9iamVjdHM6IHt9XG5cdFx0fTtcblxuXHRcdHZhciBkb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRkb21FbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuXG5cdFx0dmFyIGNhbWVyYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0ZG9tRWxlbWVudC5hcHBlbmRDaGlsZCggY2FtZXJhRWxlbWVudCApO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcblxuXHRcdFx0X3dpZHRoID0gd2lkdGg7XG5cdFx0XHRfaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0XHRfd2lkdGhIYWxmID0gX3dpZHRoIC8gMjtcblx0XHRcdF9oZWlnaHRIYWxmID0gX2hlaWdodCAvIDI7XG5cblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGVwc2lsb24gPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5hYnMoIHZhbHVlICkgPCAwLjAwMDAwMSA/IDAgOiB2YWx1ZTtcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0Q2FtZXJhQ1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICdtYXRyaXgzZCgnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgMTMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuXHRcdFx0JyknO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRPYmplY3RDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ3RyYW5zbGF0ZTNkKC01MCUsLTUwJSwwKSBtYXRyaXgzZCgnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuXHRcdFx0JyknO1xuXG5cdFx0fTtcblxuXHRcdHZhciByZW5kZXJPYmplY3QgPSBmdW5jdGlvbiAoIG9iamVjdCwgY2FtZXJhICkge1xuXG5cdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkNTUzNET2JqZWN0ICkge1xuXG5cdFx0XHRcdHZhciBzdHlsZTtcblxuXHRcdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkNTUzNEU3ByaXRlICkge1xuXG5cdFx0XHRcdFx0Ly8gaHR0cDovL3N3aWZ0Y29kZXIud29yZHByZXNzLmNvbS8yMDA4LzExLzI1L2NvbnN0cnVjdGluZy1hLWJpbGxib2FyZC1tYXRyaXgvXG5cblx0XHRcdFx0XHRtYXRyaXguY29weSggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuXHRcdFx0XHRcdG1hdHJpeC50cmFuc3Bvc2UoKTtcblx0XHRcdFx0XHRtYXRyaXguY29weVBvc2l0aW9uKCBvYmplY3QubWF0cml4V29ybGQgKTtcblx0XHRcdFx0XHRtYXRyaXguc2NhbGUoIG9iamVjdC5zY2FsZSApO1xuXG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAzIF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDExIF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTUgXSA9IDE7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggbWF0cml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBvYmplY3QubWF0cml4V29ybGQgKTtcblxuXG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBlbGVtZW50ID0gb2JqZWN0LmVsZW1lbnQ7XG5cdFx0XHRcdHZhciBjYWNoZWRTdHlsZSA9IGNhY2hlLm9iamVjdHNbIG9iamVjdC5pZCBdO1xuXG5cdFx0XHRcdGlmICggY2FjaGVkU3R5bGUgPT09IHVuZGVmaW5lZCB8fCBjYWNoZWRTdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRcdGNhY2hlLm9iamVjdHNbIG9iamVjdC5pZCBdID0gc3R5bGU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggZWxlbWVudC5wYXJlbnROb2RlICE9PSBjYW1lcmFFbGVtZW50ICkge1xuXG5cdFx0XHRcdFx0Y2FtZXJhRWxlbWVudC5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0XHRyZW5kZXJPYmplY3QoIG9iamVjdC5jaGlsZHJlblsgaSBdLCBjYW1lcmEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG5cdFx0XHR2YXIgZm92ID0gMC41IC8gTWF0aC50YW4oIFRIUkVFLk1hdGguZGVnVG9SYWQoIGNhbWVyYS5mb3YgKiAwLjUgKSApICogX2hlaWdodDtcblxuXHRcdFx0aWYgKCBjYWNoZS5jYW1lcmEuZm92ICE9PSBmb3YgKSB7XG5cblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLldlYmtpdFBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuTW96UGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5vUGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdGRvbUVsZW1lbnQuc3R5bGUucGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLmZvdiA9IGZvdjtcblxuXHRcdFx0fVxuXG5cdFx0XHRzY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IHVuZGVmaW5lZCApIHsgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCkgfVxuXG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlLmdldEludmVyc2UoIGNhbWVyYS5tYXRyaXhXb3JsZCApO1xuXG5cdFx0XHR2YXIgc3R5bGUgPSBcInRyYW5zbGF0ZTNkKDAsMCxcIiArIGZvdiArIFwicHgpXCIgKyBnZXRDYW1lcmFDU1NNYXRyaXgoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKSArXG5cdFx0XHRcdFwiIHRyYW5zbGF0ZTNkKFwiICsgX3dpZHRoSGFsZiArIFwicHgsXCIgKyBfaGVpZ2h0SGFsZiArIFwicHgsIDApXCI7XG5cblxuXHRcdFx0aWYgKCBjYWNoZS5jYW1lcmEuc3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5zdHlsZSA9IHN0eWxlO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlck9iamVjdCggc2NlbmUsIGNhbWVyYSApO1xuXG5cdFx0fTtcblxuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvQ1NTM0RSZW5kZXJlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24ubW9kZWxcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWNvbi5qcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL3NyYy9wLXRocmVlLWQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL3NyYy9wLXRocmVlLWQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9zcmMvcC10aHJlZS1kLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRocmVlLWQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2e2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2Pi5jaXJjdWl0Ym9hcmR7cG9pbnRlci1ldmVudHM6dmlzaWJsZTstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO30udGhyZWUtZC1jYW52YXM+ZGl2PmNhbnZhc3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MTtwb2ludGVyLWV2ZW50czpub25lO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vc3JjL3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc0lFOSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgOVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU5LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc0lFOSgpO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KCkge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZVRleHQoc291cmNlLCBpZCwgcmVwbGFjZW1lbnQpIHtcclxuXHR2YXIgYm91bmRhcmllcyA9IFtcIi8qKiA+PlwiICsgaWQgKyBcIiAqKi9cIiwgXCIvKiogXCIgKyBpZCArIFwiPDwgKiovXCJdO1xyXG5cdHZhciBzdGFydCA9IHNvdXJjZS5sYXN0SW5kZXhPZihib3VuZGFyaWVzWzBdKTtcclxuXHR2YXIgd3JhcHBlZFJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnRcclxuXHRcdD8gKGJvdW5kYXJpZXNbMF0gKyByZXBsYWNlbWVudCArIGJvdW5kYXJpZXNbMV0pXHJcblx0XHQ6IFwiXCI7XHJcblx0aWYgKHNvdXJjZS5sYXN0SW5kZXhPZihib3VuZGFyaWVzWzBdKSA+PSAwKSB7XHJcblx0XHR2YXIgZW5kID0gc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMV0pICsgYm91bmRhcmllc1sxXS5sZW5ndGg7XHJcblx0XHRyZXR1cm4gc291cmNlLnNsaWNlKDAsIHN0YXJ0KSArIHdyYXBwZWRSZXBsYWNlbWVudCArIHNvdXJjZS5zbGljZShlbmQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gc291cmNlICsgd3JhcHBlZFJlcGxhY2VtZW50O1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0LCBpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHRcdGNzcyA9IFwiQGltcG9ydCB1cmwoXFxcImRhdGE6c3R5bGVzaGVldC9jc3M7YmFzZTY0LFwiICsgYnRvYShjc3MpICsgXCJcXFwiKVwiO1xyXG5cdFx0fSBjYXRjaChlKSB7fVxyXG5cdH1cclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQuanMifQ==