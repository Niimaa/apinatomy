(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U) {
	  'use strict';
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
	  var PLANE = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	  var PROJECTOR = new THREE.Projector();
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d',
	    requires: ['position-tracking', 'tile-hidden']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    if (!browserSupport()) {
	      console.warn("This browser doesn't seem to have WebGL support.");
	      return;
	    }
	    this.newObservable('threeDCanvasElement');
	    this.observe('threeDCanvasElement', (function(newCanvas, oldCanvas) {
	      if (oldCanvas) {
	        oldCanvas.removeClass('three-d-canvas');
	      }
	      if (newCanvas) {
	        newCanvas.addClass('three-d-canvas');
	      }
	    }));
	    this.threeDCanvasElement = this.options.threeDCanvasElement;
	    this.newObservable('threeDMode', {
	      initial: U.isDefined(this.options.threeDCanvasElement),
	      validation: (function(val) {
	        U.assert(!val || $__0.threeDCanvasElement, "You cannot turn on 3D mode when no 'threeDCanvasElement' has been set.");
	        return !!val;
	      })
	    });
	    this.newObservable('threeDCanvasSize');
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
	    this.newObservable('threeDControlsEnabled');
	    this.observe('threeDMode', (function(mode) {
	      if (mode) {
	        $__0._p_threeD_initialize();
	      }
	    }));
	  });
	  plugin.add('Circuitboard.prototype._p_threeD_initialize', function() {
	    var $__0 = this;
	    this._p_threeD_initialMargin = {};
	    this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
	    this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
	    this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
	    this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;
	    this.oneValue('threeDMode', false, (function() {
	      delete $__0._p_threeD_initialMargin;
	    }));
	    this._p_threeD_scene = new THREE.Scene();
	    this.oneValue('threeDMode', false, (function() {
	      delete $__0._p_threeD_scene;
	    }));
	    this.camera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
	    this.camera3D.position.z = 1;
	    this.oneValue('threeDMode', false, (function() {
	      delete $__0.camera3D;
	    }));
	    this.observe('threeDCanvasSize', (function(size) {
	      $__0.camera3D.aspect = size.width / size.height;
	      $__0.camera3D.updateProjectionMatrix();
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    var ambientLight = new THREE.AmbientLight(0x101030);
	    this._p_threeD_scene.add(ambientLight);
	    var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
	    directionalLight1.position.set(1, -1, 1);
	    this._p_threeD_scene.add(directionalLight1);
	    var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
	    directionalLight2.position.set(-1, 1, -1);
	    this._p_threeD_scene.add(directionalLight2);
	    this.oneValue('threeDMode', false, (function() {
	      ambientLight = undefined;
	      directionalLight1 = undefined;
	      directionalLight2 = undefined;
	    }));
	    this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({
	      alpha: true,
	      antialias: true
	    });
	    this._p_threeD_renderer_webgl.sortObjects = false;
	    this.on('3d-render', (function() {
	      $__0._p_threeD_renderer_webgl.render($__0._p_threeD_scene, $__0.camera3D);
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.observe('threeDCanvasSize', (function(size) {
	      $__0._p_threeD_renderer_webgl.setSize(size.width, size.height);
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.oneValue('threeDMode', false, (function() {
	      delete $__0._p_threeD_renderer_webgl;
	    }));
	    this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
	    $(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
	    this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
	    this.oneValue('threeDMode', false, (function() {
	      $__0.threeDCanvasElement.empty();
	      delete $__0._p_threeD_renderer_css;
	    }));
	    this.on('3d-render', (function() {
	      $__0._p_threeD_renderer_css.render($__0._p_threeD_scene, $__0.camera3D);
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.observe('threeDCanvasSize', (function(size) {
	      $__0._p_threeD_renderer_css.setSize(size.width, size.height);
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.on('size', (function() {
	      $__0.trigger('3d-render');
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    U.eachAnimationFrame((function() {
	      $__0.trigger('3d-render');
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this._p_threeD_controls = new THREE.TrackballControls(this.camera3D, this.threeDCanvasElement[0]);
	    U.extend(this._p_threeD_controls, {
	      rotateSpeed: 1.0,
	      zoomSpeed: 1.2,
	      panSpeed: 0.8
	    });
	    this._p_threeD_controls.addEventListener('change', (function() {
	      $__0.trigger('3d-render');
	    }));
	    this.oneValue('threeDMode', false, (function() {
	      delete $__0._p_threeD_controls;
	    }));
	    this.on('3d-render', (function() {
	      $__0._p_threeD_controls.update();
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.observe('size', (function() {
	      $__0._p_threeD_controls.handleResize();
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.observe('threeDControlsEnabled', (function(enabled) {
	      $__0._p_threeD_controls.enabled = enabled;
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.object3D = new THREE.Object3D();
	    this._p_threeD_scene.add(this.object3D);
	    this.object3D.scale.y = -1;
	    this.object3D.add = (function(subObj) {
	      THREE.Object3D.prototype.add.call($__0.object3D, subObj);
	      subObj.scale.y = -1;
	    });
	    this.observe('size', (function(size) {
	      $__0.object3D.position.x = -size.width / 2 + 1;
	      $__0.object3D.position.y = size.height / 2 - 1;
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	    this.oneValue('threeDMode', false, (function() {
	      delete $__0.object3D;
	    }));
	    var initialCircuitboardParent = this.element.parent();
	    var initialCircuitboardPositioning = {
	      left: this.element.css('left'),
	      top: this.element.css('top'),
	      right: this.element.css('right'),
	      bottom: this.element.css('bottom')
	    };
	    this.oneValue('threeDMode', false, (function() {
	      $__0.element.detach().appendTo(initialCircuitboardParent).css({
	        'width': 'auto',
	        'height': 'auto',
	        'position': 'absolute',
	        'transform': '',
	        '-webkit-transform': ''
	      }).css(initialCircuitboardPositioning);
	      delete $__0._p_threeD_circuitboard;
	    }));
	    this._p_threeD_circuitboard = new THREE.CSS3DObject(this.element[0]);
	    this.element.css({
	      left: 0,
	      top: 0,
	      bottom: 0,
	      right: 0
	    });
	    this._p_threeD_scene.add(this._p_threeD_circuitboard);
	    var backfaceElement = $('<div>').css({
	      position: 'absolute',
	      border: 'solid 1px black',
	      backfaceVisibility: 'hidden'
	    });
	    var backface = new THREE.CSS3DObject(backfaceElement[0]);
	    backface.rotation.set(Math.PI, 0, 0);
	    this._p_threeD_scene.add(backface);
	    this.observe('threeDCanvasSize', (function() {
	      var newCircuitboardSize = {
	        width: $__0.threeDCanvasSize.width - $__0._p_threeD_initialMargin.left - $__0._p_threeD_initialMargin.right,
	        height: $__0.threeDCanvasSize.height - $__0._p_threeD_initialMargin.top - $__0._p_threeD_initialMargin.bottom
	      };
	      var newCircuitboardPosition = {
	        x: 0.5 * ($__0._p_threeD_initialMargin.left - $__0._p_threeD_initialMargin.right),
	        y: 0.5 * ($__0._p_threeD_initialMargin.bottom - $__0._p_threeD_initialMargin.top)
	      };
	      $__0.element.css(newCircuitboardSize);
	      U.extend($__0._p_threeD_circuitboard.position, newCircuitboardPosition);
	      backfaceElement.css(newCircuitboardSize);
	      U.extend(backface.position, newCircuitboardPosition);
	      $__0._p_threeD_controls.setCameraDistance($__0.threeDCanvasSize.height / (2 * Math.tan(THREE.Math.degToRad($__0.camera3D.fov) / 2)));
	    })).unsubscribeOn(this.oneValue('threeDMode', false));
	  });
	  plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function(positionOnCanvas) {
	    this.camera3D.updateMatrixWorld();
	    this.camera3D.updateProjectionMatrix();
	    var mouse3D = new THREE.Vector3();
	    mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
	    mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
	    mouse3D.z = 0.5;
	    PROJECTOR.unprojectVector(mouse3D, this.camera3D);
	    var ray = new THREE.Ray(this.camera3D.position, mouse3D.sub(this.camera3D.position).normalize());
	    var intersects = ray.intersectPlane(PLANE);
	    if (!intersects) {
	      return;
	    }
	    return {
	      left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
	      top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
	    };
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.object3D = new THREE.Object3D();
	    this.circuitboard.object3D.add(this.object3D);
	    ((function(reset) {
	      reset();
	      $__0.on('position', reset);
	      $__0.on('size', reset);
	    }))((function() {
	      $__0.object3D.position.x = $__0.position.left + $__0.size.width / 2;
	      $__0.object3D.position.y = $__0.position.top + $__0.size.height / 2;
	    }));
	    this.observe('hidden', (function(hidden) {
	      $__0.object3D.visible = !hidden;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	    object: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = [];
	      }
	      return obj[name];
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
	    eachAnimationFrame: function(fn, context) {
	      var stop = false;
	      function iterationFn() {
	        fn.apply(context);
	        if (stop) {
	          return;
	        }
	        requestAnimationFrame(iterationFn);
	      }
	      iterationFn();
	      var unsubscribeFn = (function() {
	        if (unsubscribeFn.stillSubscribed) {
	          unsubscribeFn.stillSubscribed = false;
	          delete unsubscribeFn.unsubscribeOn;
	          stop = true;
	        }
	      });
	      unsubscribeFn.stillSubscribed = true;
	      unsubscribeFn.unsubscribeOn = (function(subscriber) {
	        subscriber(unsubscribeFn);
	        return unsubscribeFn;
	      });
	      return unsubscribeFn;
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
	    optionalCurry: function(fn) {
	      return function() {
	        if (fn.length <= arguments.length) {
	          return fn.apply(this, arguments);
	        } else {
	          return U.bindA(fn, this, arguments);
	        }
	      };
	    }
	  };
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.height === b.height && a.width === b.width;
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(7), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, DeltaModel, U) {
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
	  }).append('construct', function() {
	    this.enabled = true;
	  }).append('construct', function() {
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
	  }).add('reset', function() {
	    this._state = STATE.NONE;
	    this._targetCoordinates.copy(this._targetCoordinates0);
	    this._controlledObject.position.copy(this._position0);
	    this._controlledObject.up.copy(this._up0);
	    this._velocity.set(0, 0, 0);
	    this._eye.subVectors(this._controlledObject.position, this._targetCoordinates);
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
	    setTimeout((function() {
	      $__0._controlledObject.position.add($__0._velocity);
	      $__0._controlledObject.lookAt($__0._targetCoordinates);
	      $__0._lastPosition.copy($__0._controlledObject.position);
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
	      vector.copy(this._controlledObject.up).setLength(mouseOnBall.y);
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
	    if (!this.enabled) {
	      return;
	    }
	    if (this._state !== STATE.NONE) {
	      return;
	    }
	    console.log('keydown:', event.keyCode);
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
	    console.log('keyup:', event.keyCode);
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
	    window.addEventListener('keydown', (function(e) {
	      $__0.keydown(e);
	    }));
	    window.addEventListener('keyup', (function(e) {
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
	        pan.add(objectUp.copy(this._controlledObject.up).setLength(mouseChange.y));
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
	  new dm.Delta('apinatomy-specific', {if: true}).modify('TrackballControls.prototype').add('setCameraDistance', function setCameraDistance(distance) {
	    this._controlledObject.position.normalize().multiplyScalar(distance);
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

/***/ },
/* 10 */
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
/* 11 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0N2M0ZTgyNzQ2YWQzYjU5NzQzYiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzcz81ZGFjIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHO0FBQ3RCLGNBQVcsQ0FBQztBQUlaLFVBQVMsZUFBYSxDQUFFLENBQUU7QUFDckIsY0FBSyxDQUFDO0FBQ1YsT0FBSTtBQUNILFlBQUssRUFBSSxFQUFDLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDdEIsWUFBTyxFQUFDLENBQUMsQ0FBQyxNQUFLLENBQUUsRUFBQyxXQUFZLENBQUMsT0FBTSxDQUFDLEdBQUssT0FBSyxDQUFFLEVBQUMsV0FBWSxDQUFDLG9CQUFtQixDQUFDLENBQUMsQ0FBQztLQUN2RixDQUFFLE9BQU8sRUFBQyxDQUFHO0FBQ1osWUFBTyxNQUFJLENBQUM7S0FDYixDQUFFLE9BQVE7QUFDVCxZQUFLLEVBQUksVUFBUSxDQUFDO0tBQ25CO0FBQUEsR0FDRDtBQUlJLFdBQUksRUFBSSxJQUFJLE1BQUksTUFBTyxDQUFDLEdBQUksTUFBSSxRQUFTLENBQUMsRUFBRyxHQUFHLEdBQUMsQ0FBRyxHQUFDLENBQUM7QUFDdEQsZUFBUSxFQUFJLElBQUksTUFBSSxVQUFXLEVBQUMsQ0FB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QkFBdUI7QUFDL0I7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxpQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0REFBMkQ7QUFDM0QsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImJsdWViaXJkXCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDdjNGU4Mjc0NmFkM2I1OTc0M2JcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzJyxcblx0Jy4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qcycsXG5cdCcuL3AtdGhyZWUtZC5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRlc3QgZm9yIGJyb3dzZXIgM0Qgc3VwcG9ydCAqL1xuXHRmdW5jdGlvbiBicm93c2VyU3VwcG9ydCgpIHtcblx0XHR2YXIgY2FudmFzO1xuXHRcdHRyeSB7XG5cdFx0XHRjYW52YXMgPSAkKCc8Y2FudmFzPicpO1xuXHRcdFx0cmV0dXJuICEhKGNhbnZhc1swXS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhc1swXS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSk7XG5cdFx0fSBjYXRjaCAoX18pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y2FudmFzID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cblx0Lyogc29tZSB1c2VmdWwgY29uc3RhbnRzIGZvciBtYWtpbmcgaW50ZXJzZWN0aW9uIGNoZWNrcyAqL1xuXHR2YXIgUExBTkUgPSBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIDApO1xuXHR2YXIgUFJPSkVDVE9SID0gbmV3IFRIUkVFLlByb2plY3RvcigpO1xuXG5cblx0LyogdGhlIHBsdWdpbiAqL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZCcsXG5cdFx0cmVxdWlyZXM6IFsncG9zaXRpb24tdHJhY2tpbmcnLCAndGlsZS1oaWRkZW4nXVxuXHR9KTtcblxuXG5cdC8qIHRoZSBjb25zdHJ1Y3RvciBpcyBydW4gb25jZSB0byBpbml0aWFsaXplIHBvdGVudGlhbCAzRC1uZXNzICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cblx0XHQvKiAgdGVzdCBmb3IgYnJvd3NlciBzdXBwb3J0ICovXG5cdFx0aWYgKCFicm93c2VyU3VwcG9ydCgpKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzZWVtIHRvIGhhdmUgV2ViR0wgc3VwcG9ydC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENhbnZhc0VsZW1lbnQnIHByb3BlcnR5ICovXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCd0aHJlZURDYW52YXNFbGVtZW50Jyk7XG5cdFx0dGhpcy5vYnNlcnZlKCd0aHJlZURDYW52YXNFbGVtZW50JywgKG5ld0NhbnZhcywgb2xkQ2FudmFzKSA9PiB7XG5cdFx0XHRpZiAob2xkQ2FudmFzKSB7IG9sZENhbnZhcy5yZW1vdmVDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0XHRpZiAobmV3Q2FudmFzKSB7IG5ld0NhbnZhcy5hZGRDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8qIHdhcyBhIGNhbnZhcyBnaXZlbiB0aHJvdWdoIHRoZSBvcHRpb25zPyAqL1xuXHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCA9IHRoaXMub3B0aW9ucy50aHJlZURDYW52YXNFbGVtZW50O1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5ICovXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCd0aHJlZURNb2RlJywge1xuXHRcdFx0aW5pdGlhbDogVS5pc0RlZmluZWQodGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQpLFxuXHRcdFx0dmFsaWRhdGlvbjogKHZhbCkgPT4ge1xuXHRcdFx0XHRVLmFzc2VydCghdmFsIHx8IHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCxcblx0XHRcdFx0XHRcdGBZb3UgY2Fubm90IHR1cm4gb24gM0QgbW9kZSB3aGVuIG5vICd0aHJlZURDYW52YXNFbGVtZW50JyBoYXMgYmVlbiBzZXQuYCk7XG5cdFx0XHRcdHJldHVybiAhIXZhbDtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0LyogdGhlICd0aHJlZURDYW52YXNTaXplJyBvYnNlcnZhYmxlICovXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCd0aHJlZURDYW52YXNTaXplJyk7XG5cdFx0KChjYWNoZSkgPT4ge1xuXHRcdFx0dGhpcy50aHJlZURDYW52YXNTaXplID0gY2FjaGUoKTtcblx0XHRcdGNhY2hlLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudGhyZWVEQ2FudmFzU2l6ZSA9IG5ld1NpemUgfSk7XG5cdFx0XHQoIHRoaXMub3B0aW9ucy5jYW52YXNSZXNpemVFdmVudCB8fCAkKHdpbmRvdykucmVzaXplLmJpbmQoJCh3aW5kb3cpKSApKGNhY2hlKTtcblx0XHR9KShVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCAmJiBuZXcgVS5TaXplKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSxcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKVxuXHRcdFx0KSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkpO1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcgcHJvcGVydHkgKi9cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcpO1xuXG5cblx0XHQvKiBpbml0aWFsaXplIHdoZW4gM0QgbW9kZSBpcyB0dXJuZWQgb24gKi9cblx0XHR0aGlzLm9ic2VydmUoJ3RocmVlRE1vZGUnLCAobW9kZSkgPT4geyAvLyBUT0RPOiB0aGlzIGNhbiBiZSBtb3ZlZCB0byB0aGUgZW5kLCBub3cgdGhhdCAnb2JzZXJ2ZScgaXMgdXNlZCByYXRoZXIgdGhhbiAnb24nXG5cdFx0XHRpZiAobW9kZSkgeyB0aGlzLl9wX3RocmVlRF9pbml0aWFsaXplKCkgfVxuXHRcdH0pO1xuXG5cblx0fSk7XG5cblx0LyogYF9wX3RocmVlRF9pbml0aWFsaXplYCBpcyBydW4gZXZlcnkgdGltZSAzRC1uZXNzIGlzIHR1cm5lZCBvbiAqL1xuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLl9wX3RocmVlRF9pbml0aWFsaXplJywgZnVuY3Rpb24gKCkge1xuXG5cblx0XHQvLyBUT0RPOiBmaXggYnVnOiB3aGVuIDNEIG1vZGUgaXMgdHVybmVkIG9mZiwgdGhlbiBvbiwgdGlsZXMgbm8gbG9uZ2VyIHJlc3BvbmQgdG8gY2xpY2tzXG5cblxuXHRcdC8qIGFuIGVhc3kgd2F5IHRvIGFjdCBvbiAzRCBtb2RlIGJlaW5nIHR1cm5lZCBvZmYgKi9cblx0XHQvKiByZW1lbWJlciB0aGUgaW5pdGlhbCBtYXJnaW4gKi9cblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luID0ge307XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0ID0gdGhpcy5lbGVtZW50Lm9mZnNldCgpLmxlZnQgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkubGVmdDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS50b3AgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkudG9wO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQgPSB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLnNpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gPSB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC0gdGhpcy5zaXplLmhlaWdodCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wO1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbiB9KTtcblxuXG5cdFx0Lyogc2NlbmUgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfc2NlbmUgfSk7XG5cblxuXHRcdC8qIGNhbWVyYSAqL1xuXHRcdHRoaXMuY2FtZXJhM0QgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQsIDEsIDEwMDAwKTtcblx0XHR0aGlzLmNhbWVyYTNELnBvc2l0aW9uLnogPSAxO1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5jYW1lcmEzRCB9KTtcblx0XHR0aGlzLm9ic2VydmUoJ3RocmVlRENhbnZhc1NpemUnLCAoc2l6ZSkgPT4ge1xuXHRcdFx0dGhpcy5jYW1lcmEzRC5hc3BlY3QgPSBzaXplLndpZHRoIC8gc2l6ZS5oZWlnaHQ7XG5cdFx0XHR0aGlzLmNhbWVyYTNELnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblx0XHR9KS51bnN1YnNjcmliZU9uKHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSkpO1xuXG5cblx0XHQvKiBsaWdodGluZyAqL1xuXHRcdHZhciBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MTAxMDMwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MSA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0MS5wb3NpdGlvbi5zZXQoMSwgLTEsIDEpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MSk7XG5cdFx0Ly9cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodDIgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24uc2V0KC0xLCAxLCAtMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQyKTtcblx0XHQvL1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4ge1xuXHRcdFx0YW1iaWVudExpZ2h0ID0gdW5kZWZpbmVkO1xuXHRcdFx0ZGlyZWN0aW9uYWxMaWdodDEgPSB1bmRlZmluZWQ7XG5cdFx0XHRkaXJlY3Rpb25hbExpZ2h0MiA9IHVuZGVmaW5lZDtcblx0XHR9KTtcblxuXG5cdFx0LyogcmVuZGVyZXI6IFdlYkdMICovXG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IHRydWUgfSk7XG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc29ydE9iamVjdHMgPSBmYWxzZTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuY2FtZXJhM0QpO1xuXHRcdH0pLnVuc3Vic2NyaWJlT24odGhpcy5vbmVWYWx1ZSgndGhyZWVETW9kZScsIGZhbHNlKSk7XG5cdFx0dGhpcy5vYnNlcnZlKCd0aHJlZURDYW52YXNTaXplJywgKHNpemUpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH0pLnVuc3Vic2NyaWJlT24odGhpcy5vbmVWYWx1ZSgndGhyZWVETW9kZScsIGZhbHNlKSk7XG5cdFx0dGhpcy5vbmVWYWx1ZSgndGhyZWVETW9kZScsIGZhbHNlLCAoKSA9PiB7IGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbCB9KTtcblxuXG5cdFx0LyogcmVuZGVyZXI6IENTUyAqL1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2NzcyA9IG5ldyBUSFJFRS5DU1MzRFJlbmRlcmVyKCk7XG5cdFx0JCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MuZG9tRWxlbWVudCkuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLmRvbUVsZW1lbnQpO1xuXHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5hcHBlbmQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpO1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4ge1xuXHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmVtcHR5KCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzO1xuXHRcdH0pO1xuXHRcdHRoaXMub24oJzNkLXJlbmRlcicsICgpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuY2FtZXJhM0QpO1xuXHRcdH0pLnVuc3Vic2NyaWJlT24odGhpcy5vbmVWYWx1ZSgndGhyZWVETW9kZScsIGZhbHNlKSk7XG5cdFx0dGhpcy5vYnNlcnZlKCd0aHJlZURDYW52YXNTaXplJywgKHNpemUpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblx0XHR9KS51bnN1YnNjcmliZU9uKHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSkpO1xuXG5cblx0XHQvKiByZW5kZXIgb24gc2l6ZS1jaGFuZ2UgYW5kIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZSAqL1xuXHRcdHRoaXMub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfSkudW5zdWJzY3JpYmVPbih0aGlzLm9uZVZhbHVlKCd0aHJlZURNb2RlJywgZmFsc2UpKTtcblx0XHRVLmVhY2hBbmltYXRpb25GcmFtZSgoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfSkudW5zdWJzY3JpYmVPbih0aGlzLm9uZVZhbHVlKCd0aHJlZURNb2RlJywgZmFsc2UpKTtcblxuXG5cdFx0LyogY29udHJvbHMgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9jb250cm9scyA9IG5ldyBUSFJFRS5UcmFja2JhbGxDb250cm9scyh0aGlzLmNhbWVyYTNELCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnRbMF0pO1xuXHRcdFUuZXh0ZW5kKHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLCB7XG5cdFx0XHRyb3RhdGVTcGVlZDogMS4wLFxuXHRcdFx0em9vbVNwZWVkOiAxLjIsXG5cdFx0XHRwYW5TcGVlZDogMC44XG5cdFx0fSk7XG5cdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfY29udHJvbHMgfSk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJywgKCkgPT4geyB0aGlzLl9wX3RocmVlRF9jb250cm9scy51cGRhdGUoKSB9KS51bnN1YnNjcmliZU9uKHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSkpO1xuXHRcdHRoaXMub2JzZXJ2ZSgnc2l6ZScsICgpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMuaGFuZGxlUmVzaXplKCkgfSkudW5zdWJzY3JpYmVPbih0aGlzLm9uZVZhbHVlKCd0aHJlZURNb2RlJywgZmFsc2UpKTtcblx0XHR0aGlzLm9ic2VydmUoJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcsIChlbmFibGVkKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9jb250cm9scy5lbmFibGVkID0gZW5hYmxlZDtcblx0XHR9KS51bnN1YnNjcmliZU9uKHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSkpO1xuXG5cblx0XHQvKiAgdGhlIGNpcmN1aXRib2FyZCBvYmplY3QgaGFzIGEgY29vcmRpbmF0ZSBzeXN0ZW0gICAgICAgICAgICovXG5cdFx0LyogIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGh0bWwgYW5kIHN2ZyBvZiB0aGUgY2lyY3VpdGJvYXJkICAqL1xuXHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhpcy5vYmplY3QzRCk7XG5cdFx0dGhpcy5vYmplY3QzRC5zY2FsZS55ID0gLTE7ICAgICAgIC8vIGludmVydCB5IGF4aXNcblx0XHR0aGlzLm9iamVjdDNELmFkZCA9IChzdWJPYmopID0+IHsgLy8gYW5kIHJlLWludmVydCB0aGUgeSBheGlzIG9mIGl0cyBjaGlsZHJlblxuXHRcdFx0VEhSRUUuT2JqZWN0M0QucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMub2JqZWN0M0QsIHN1Yk9iaik7XG5cdFx0XHRzdWJPYmouc2NhbGUueSA9IC0xO1xuXHRcdH07XG5cdFx0dGhpcy5vYnNlcnZlKCdzaXplJywgKHNpemUpID0+IHtcblx0XHRcdHRoaXMub2JqZWN0M0QucG9zaXRpb24ueCA9IC1zaXplLndpZHRoIC8gMiArIDE7XG5cdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnkgPSBzaXplLmhlaWdodCAvIDIgLSAxO1xuXHRcdH0pLnVuc3Vic2NyaWJlT24odGhpcy5vbmVWYWx1ZSgndGhyZWVETW9kZScsIGZhbHNlKSk7XG5cdFx0dGhpcy5vbmVWYWx1ZSgndGhyZWVETW9kZScsIGZhbHNlLCAoKSA9PiB7IGRlbGV0ZSB0aGlzLm9iamVjdDNEIH0pO1xuXG5cblx0XHQvKiBmbG9hdGluZyB0aWxlbWFwICovXG5cdFx0dmFyIGluaXRpYWxDaXJjdWl0Ym9hcmRQYXJlbnQgPSB0aGlzLmVsZW1lbnQucGFyZW50KCk7XG5cdFx0dmFyIGluaXRpYWxDaXJjdWl0Ym9hcmRQb3NpdGlvbmluZyA9IHtcblx0XHRcdGxlZnQ6IHRoaXMuZWxlbWVudC5jc3MoJ2xlZnQnKSxcblx0XHRcdHRvcDogdGhpcy5lbGVtZW50LmNzcygndG9wJyksXG5cdFx0XHRyaWdodDogdGhpcy5lbGVtZW50LmNzcygncmlnaHQnKSxcblx0XHRcdGJvdHRvbTogdGhpcy5lbGVtZW50LmNzcygnYm90dG9tJylcblx0XHR9O1xuXHRcdHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4ge1xuXHRcdFx0dGhpcy5lbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKGluaXRpYWxDaXJjdWl0Ym9hcmRQYXJlbnQpXG5cdFx0XHRcdFx0LmNzcyh7XG5cdFx0XHRcdFx0XHQnd2lkdGgnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQnaGVpZ2h0JzogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nOiAnJyxcblx0XHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybSc6ICcnXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY3NzKGluaXRpYWxDaXJjdWl0Ym9hcmRQb3NpdGlvbmluZyk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkO1xuXHRcdH0pO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZCA9IG5ldyBUSFJFRS5DU1MzRE9iamVjdCh0aGlzLmVsZW1lbnRbMF0pO1xuXHRcdHRoaXMuZWxlbWVudC5jc3MoeyBsZWZ0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAgfSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZCk7XG5cblxuXHRcdC8qIHRpbGVtYXAgYmFja2ZhY2UgKi9cblx0XHR2YXIgYmFja2ZhY2VFbGVtZW50ID0gJCgnPGRpdj4nKS5jc3Moe1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHRib3JkZXI6ICdzb2xpZCAxcHggYmxhY2snLFxuXHRcdFx0YmFja2ZhY2VWaXNpYmlsaXR5OiAnaGlkZGVuJ1xuXHRcdH0pO1xuXHRcdHZhciBiYWNrZmFjZSA9IG5ldyBUSFJFRS5DU1MzRE9iamVjdChiYWNrZmFjZUVsZW1lbnRbMF0pO1xuXHRcdGJhY2tmYWNlLnJvdGF0aW9uLnNldChNYXRoLlBJLCAwLCAwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYmFja2ZhY2UpO1xuXG5cblx0XHQvKiByZXNwb25kIHRvIHJlc2l6ZSAqL1xuXHRcdHRoaXMub2JzZXJ2ZSgndGhyZWVEQ2FudmFzU2l6ZScsICgpID0+IHtcblxuXHRcdFx0Lyogc2l6aW5nIGFuZCBwb3NpdGlvbmluZyBvZiB0aGUgY2lyY3VpdC1ib2FyZCBhbmQgYmFja2ZhY2UgKi9cblx0XHRcdHZhciBuZXdDaXJjdWl0Ym9hcmRTaXplID0ge1xuXHRcdFx0XHR3aWR0aDogdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3AgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbVxuXHRcdFx0fTtcblx0XHRcdHZhciBuZXdDaXJjdWl0Ym9hcmRQb3NpdGlvbiA9IHtcblx0XHRcdFx0eDogMC41ICogKHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQpLFxuXHRcdFx0XHR5OiAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcClcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZWxlbWVudC5jc3MobmV3Q2lyY3VpdGJvYXJkU2l6ZSk7XG5cdFx0XHRVLmV4dGVuZCh0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQucG9zaXRpb24sIG5ld0NpcmN1aXRib2FyZFBvc2l0aW9uKTtcblxuXHRcdFx0YmFja2ZhY2VFbGVtZW50LmNzcyhuZXdDaXJjdWl0Ym9hcmRTaXplKTtcblx0XHRcdFUuZXh0ZW5kKGJhY2tmYWNlLnBvc2l0aW9uLCBuZXdDaXJjdWl0Ym9hcmRQb3NpdGlvbik7XG5cblx0XHRcdC8qIHNldCB0aGUgY2FtZXJhIGRpc3RhbmNlIHRvIGNvcnJlc3BvbmQgKi9cblx0XHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnNldENhbWVyYURpc3RhbmNlKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgL1xuXHRcdFx0XHRcdCgyICogTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZCh0aGlzLmNhbWVyYTNELmZvdikgLyAyKSlcblx0XHRcdCk7XG5cblx0XHR9KS51bnN1YnNjcmliZU9uKHRoaXMub25lVmFsdWUoJ3RocmVlRE1vZGUnLCBmYWxzZSkpO1xuXG5cdH0pO1xuXG5cblx0LyogYHRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkYCBoYXMgbm8gc2lkZS1lZmZlY3RzIGFuZCBjYW4gYmUgdXNlZCAgICovXG5cdC8qICBmcm9tIHRoZSBvdXRzaWRlIHRvIHRyYW5zbGF0ZSBsZWZ0L3RvcCBjb29yZGluYXRlcyBvbiB0aGUgc2NyZWVuIHRvIGxlZnQvdG9wICAgICAqL1xuXHQvKiAgY29vcmRpbmF0ZXMgb2YgdGhlIHByaXZhdGUgY29vcmRpbmF0ZS1zeXN0ZW0gb2YgdGhlIGNpcmN1aXRib2FyZCwgaG93ZXZlciBpdCBpcyAgKi9cblx0LyogIG9yaWVudGVkIGluIDNEIHNwYWNlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUudHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmQnLCBmdW5jdGlvbiAocG9zaXRpb25PbkNhbnZhcykge1xuXG5cdFx0dGhpcy5jYW1lcmEzRC51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdHRoaXMuY2FtZXJhM0QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdFx0dmFyIG1vdXNlM0QgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdG1vdXNlM0QueCA9IHBvc2l0aW9uT25DYW52YXMubGVmdCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAqIDIgLSAxO1xuXHRcdG1vdXNlM0QueSA9IC1wb3NpdGlvbk9uQ2FudmFzLnRvcCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgKiAyICsgMTtcblx0XHRtb3VzZTNELnogPSAwLjU7XG5cdFx0UFJPSkVDVE9SLnVucHJvamVjdFZlY3Rvcihtb3VzZTNELCB0aGlzLmNhbWVyYTNEKTtcblx0XHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheSh0aGlzLmNhbWVyYTNELnBvc2l0aW9uLCBtb3VzZTNELnN1Yih0aGlzLmNhbWVyYTNELnBvc2l0aW9uKS5ub3JtYWxpemUoKSk7XG5cdFx0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0UGxhbmUoUExBTkUpO1xuXG5cdFx0LyogaWYgdGhlIHRlc3RlZCBpbnRlcnNlY3Rpb24gaXMgb3V0IG9mIHJhbmdlLCByZXR1cm4gdW5kZWZpbmVkICovXG5cdFx0aWYgKCFpbnRlcnNlY3RzKSB7IHJldHVybiB9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bGVmdDogaW50ZXJzZWN0cy54ICsgdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC8gMiAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCxcblx0XHRcdHRvcDogLWludGVyc2VjdHMueSArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3Bcblx0XHR9O1xuXG5cdH0pO1xuXG5cblx0LyogYXJ0ZWZhY3Qtc3BlY2lmaWMgb2JqZWN0M0Qgb2JqZWN0cyAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiBjcmVhdGUgdGhlIDNEIG9iamVjdCBmb3IgdGhpcyB0aWxlICovXG5cdFx0dGhpcy5vYmplY3QzRCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuXHRcdHRoaXMuY2lyY3VpdGJvYXJkLm9iamVjdDNELmFkZCh0aGlzLm9iamVjdDNEKTtcblxuXHRcdC8qIHBvc2l0aW9uIGl0IGFsd2F5cyBpbiB0aGUgY2VudGVyIG9mIHRoZSB0aWxlICovXG5cdFx0KChyZXNldCkgPT4ge1xuXHRcdFx0cmVzZXQoKTtcblx0XHRcdHRoaXMub24oJ3Bvc2l0aW9uJywgcmVzZXQpO1xuXHRcdFx0dGhpcy5vbignc2l6ZScsIHJlc2V0KTtcblx0XHR9KSgoKSA9PiB7XG5cdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLmxlZnQgKyB0aGlzLnNpemUud2lkdGggLyAyO1xuXHRcdFx0dGhpcy5vYmplY3QzRC5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi50b3AgKyB0aGlzLnNpemUuaGVpZ2h0IC8gMjtcblx0XHR9KTtcblxuXHRcdC8qIGhpZGUgaXQgd2hlbiB0aGUgdGlsZSBpcyBoaWRkZW4gKi9cblx0XHR0aGlzLm9ic2VydmUoJ2hpZGRlbicsIChoaWRkZW4pID0+IHtcblx0XHRcdHRoaXMub2JqZWN0M0QudmlzaWJsZSA9ICFoaWRkZW47XG5cdFx0fSk7XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGhyZWUtZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKFN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtTdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5iaW5kKHRoaXMpXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cblx0XHRcdHZhciB1bnN1YnNjcmliZUZuID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAodW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQpIHtcblx0XHRcdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGRlbGV0ZSB1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT247XG5cdFx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHR1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT24gPSAoc3Vic2NyaWJlcikgPT4ge1xuXHRcdFx0XHRzdWJzY3JpYmVyKHVuc3Vic2NyaWJlRm4pO1xuXHRcdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0b3B0aW9uYWxDdXJyeShmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKGZuLmxlbmd0aCA8PSBhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIFUuYmluZEEoZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBodHRwOi8vd3d3LmVtYWdpeC5uZXQvYWNhZGVtaWMvbXNjcy1wcm9qZWN0L2l0ZW0vY2FtZXJhLXN5bmMtd2l0aC1jc3MzLWFuZC13ZWJnbC10aHJlZWpzXG5cdCAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG5cdCAqL1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0ID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuT2JqZWN0M0QuY2FsbCggdGhpcyApO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncmVtb3ZlZCcsIGZ1bmN0aW9uICggLypldmVudCovICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsICkge1xuXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlICk7XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5DU1MzRE9iamVjdC5jYWxsKCB0aGlzLCBlbGVtZW50ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgKTtcblxuXHQvL1xuXG5cdFRIUkVFLkNTUzNEUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLmxvZyggJ1RIUkVFLkNTUzNEUmVuZGVyZXInLCBUSFJFRS5SRVZJU0lPTiApO1xuXG5cdFx0dmFyIF93aWR0aCwgX2hlaWdodDtcblx0XHR2YXIgX3dpZHRoSGFsZiwgX2hlaWdodEhhbGY7XG5cblx0XHR2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdHZhciBjYWNoZSA9IHtcblx0XHRcdGNhbWVyYTogeyBmb3Y6IDAsIHN0eWxlOiAnJyB9LFxuXHRcdFx0b2JqZWN0czoge31cblx0XHR9O1xuXG5cdFx0dmFyIGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRkb21FbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cblx0XHR2YXIgY2FtZXJhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHRkb21FbGVtZW50LmFwcGVuZENoaWxkKCBjYW1lcmFFbGVtZW50ICk7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG5cdFx0XHRfd2lkdGggPSB3aWR0aDtcblx0XHRcdF9oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHRcdF93aWR0aEhhbGYgPSBfd2lkdGggLyAyO1xuXHRcdFx0X2hlaWdodEhhbGYgPSBfaGVpZ2h0IC8gMjtcblxuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdH07XG5cblx0XHR2YXIgZXBzaWxvbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLmFicyggdmFsdWUgKSA8IDAuMDAwMDAxID8gMCA6IHZhbHVlO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRDYW1lcmFDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ21hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldE9iamVjdENTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAndHJhbnNsYXRlM2QoLTUwJSwtNTAlLDApIG1hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIHJlbmRlck9iamVjdCA9IGZ1bmN0aW9uICggb2JqZWN0LCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RPYmplY3QgKSB7XG5cblx0XHRcdFx0dmFyIHN0eWxlO1xuXG5cdFx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RTcHJpdGUgKSB7XG5cblx0XHRcdFx0XHQvLyBodHRwOi8vc3dpZnRjb2Rlci53b3JkcHJlc3MuY29tLzIwMDgvMTEvMjUvY29uc3RydWN0aW5nLWEtYmlsbGJvYXJkLW1hdHJpeC9cblxuXHRcdFx0XHRcdG1hdHJpeC5jb3B5KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICk7XG5cdFx0XHRcdFx0bWF0cml4LnRyYW5zcG9zZSgpO1xuXHRcdFx0XHRcdG1hdHJpeC5jb3B5UG9zaXRpb24oIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXHRcdFx0XHRcdG1hdHJpeC5zY2FsZSggb2JqZWN0LnNjYWxlICk7XG5cblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDMgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyA3IF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTEgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxNSBdID0gMTtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBtYXRyaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGVsZW1lbnQgPSBvYmplY3QuZWxlbWVudDtcblx0XHRcdFx0dmFyIGNhY2hlZFN0eWxlID0gY2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF07XG5cblx0XHRcdFx0aWYgKCBjYWNoZWRTdHlsZSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlZFN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdFx0Y2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF0gPSBzdHlsZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBlbGVtZW50LnBhcmVudE5vZGUgIT09IGNhbWVyYUVsZW1lbnQgKSB7XG5cblx0XHRcdFx0XHRjYW1lcmFFbGVtZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgbCA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRcdHJlbmRlck9iamVjdCggb2JqZWN0LmNoaWxkcmVuWyBpIF0sIGNhbWVyYSApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbiAoIHNjZW5lLCBjYW1lcmEgKSB7XG5cblx0XHRcdHZhciBmb3YgPSAwLjUgLyBNYXRoLnRhbiggVEhSRUUuTWF0aC5kZWdUb1JhZCggY2FtZXJhLmZvdiAqIDAuNSApICkgKiBfaGVpZ2h0O1xuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5mb3YgIT09IGZvdiApIHtcblxuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuV2Via2l0UGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5Nb3pQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLm9QZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5wZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuZm92ID0gZm92O1xuXG5cdFx0XHR9XG5cblx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gdW5kZWZpbmVkICkgeyBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKSB9XG5cblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UuZ2V0SW52ZXJzZSggY2FtZXJhLm1hdHJpeFdvcmxkICk7XG5cblx0XHRcdHZhciBzdHlsZSA9IFwidHJhbnNsYXRlM2QoMCwwLFwiICsgZm92ICsgXCJweClcIiArIGdldENhbWVyYUNTU01hdHJpeCggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApICtcblx0XHRcdFx0XCIgdHJhbnNsYXRlM2QoXCIgKyBfd2lkdGhIYWxmICsgXCJweCxcIiArIF9oZWlnaHRIYWxmICsgXCJweCwgMClcIjtcblxuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5zdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLnN0eWxlID0gc3R5bGU7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyT2JqZWN0KCBzY2VuZSwgY2FtZXJhICk7XG5cblx0XHR9O1xuXG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzXG4gKiovIiwiLyoqXG4gKiBAYXV0aG9yIEViZXJoYXJkIEdyYWV0aGVyICAgICAoaHR0cDovL2VncmFldGhlci5jb20pXG4gKiBAYXV0aG9yIE1hcmsgTHVuZGluICAgICAgICAgICAoaHR0cDovL21hcmstbHVuZGluLmNvbSlcbiAqIEBhdXRob3IgTWljaGllbCBIZWx2ZW5zdGVpam4gIChodHRwOi8vbWhlbHZlbnMubmV0KVxuICovXG5cbmRlZmluZShbJ2pxdWVyeScsICd0aHJlZS1qcycsICdkZWx0YS1qcycsICcuL21pc2MuanMnXSwgKCQsIFRIUkVFLCBEZWx0YU1vZGVsLCBVKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGNvbnN0YW50cyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgU1RBVEUgPSB7IE5PTkU6IC0xLCBST1RBVEU6IDAsIFpPT006IDEsIFBBTjogMiwgVE9VQ0hfUk9UQVRFOiAzLCBUT1VDSF9aT09NX1BBTjogNCB9O1xuXHR2YXIgQ0hBTkdFX0VWRU5UID0geyB0eXBlOiAnY2hhbmdlJyB9O1xuXHR2YXIgU1RBUlRfRVZFTlQgID0geyB0eXBlOiAnc3RhcnQnIH07XG5cdHZhciBFTkRfRVZFTlQgICAgPSB7IHR5cGU6ICdlbmQnIH07XG5cblxuXHQvKiBkZWx0YSBtb2RlbCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdHZhciBkbSA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cblxuXHQvKiBjb3JlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnY29yZScsIHtcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogJ2NvbnN0cnVjdCcgbWV0aG9kIGNvcmUgKi9cblx0XHRcdC5hZGQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uIChjb250cm9sbGVkT2JqZWN0LCBkb21FbGVtZW50KSB7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QgPSBjb250cm9sbGVkT2JqZWN0O1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblx0XHRcdH0pXG5cdFx0LyogQVBJICovXG5cdFx0XHQuYXBwZW5kKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0fSlcblx0XHQvKiBwcml2YXRlIGZpZWxkcyAqL1xuXHRcdFx0LmFwcGVuZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fdmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdHRoaXMuX2V5ZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwO1xuXHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cdFx0XHRcdHRoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fc2NyZWVuID0geyBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMwID0gdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY2xvbmUoKTtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb24wID0gdGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdFx0XHR0aGlzLl91cDAgPSB0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNsb25lKCk7XG5cblx0XHRcdH0pXG5cdFx0LyogcHVibGljIG1ldGhvZHMgKi9cblx0XHRcdC5hZGQoJ3Jlc2V0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcy5jb3B5KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzMCk7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uY29weSh0aGlzLl9wb3NpdGlvbjApO1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNvcHkodGhpcy5fdXAwKTtcblxuXHRcdFx0XHR0aGlzLl92ZWxvY2l0eS5zZXQoMCwgMCwgMCk7XG5cblx0XHRcdFx0dGhpcy5fZXllLnN1YlZlY3RvcnModGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbiwgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ0hBTkdFX0VWRU5UKTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdFx0fSkuYWRkKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZXllLnN1YlZlY3RvcnModGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbiwgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMucm90YXRlQ2FtZXJhKCk7XG5cdFx0XHRcdHRoaXMuem9vbUNhbWVyYSgpO1xuXHRcdFx0XHR0aGlzLnBhbkNhbWVyYSgpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uYWRkVmVjdG9ycyh0aGlzLl90YXJnZXRDb29yZGluYXRlcywgdGhpcy5fZXllKTtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0Lmxvb2tBdCh0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2xhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKSA+IEVQUykge1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDSEFOR0VfRVZFTlQpO1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGQodGhpcy5fdmVsb2NpdHkpO1xuXHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmFkZCgnaGFuZGxlUmVzaXplJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9kb21FbGVtZW50ID09PSBkb2N1bWVudCkge1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5sZWZ0ID0gMDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4udG9wID0gMDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4uaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBib3ggPSB0aGlzLl9kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdC8vIGFkanVzdG1lbnRzIGNvbWUgZnJvbSBzaW1pbGFyIGNvZGUgaW4gdGhlIGpxdWVyeSBvZmZzZXQoKSBmdW5jdGlvblxuXHRcdFx0XHRcdHZhciBkID0gdGhpcy5fZG9tRWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ubGVmdCA9IGJveC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0IC0gZC5jbGllbnRMZWZ0O1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgPSBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gZC5jbGllbnRUb3A7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLndpZHRoID0gYm94LndpZHRoO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSBib3guaGVpZ2h0O1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cblx0LyogbW91c2UgZXZlbnQgbWV0aG9kIGNvcmVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ21vdXNlLWV2ZW50cycsIHtcblx0XHRhZnRlcjogWydjb3JlJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLk5PTkUpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IHtcblx0XHRcdFx0XHRcdDA6IFNUQVRFLlJPVEFURSxcblx0XHRcdFx0XHRcdDE6IFNUQVRFLlpPT00sXG5cdFx0XHRcdFx0XHQyOiBTVEFURS5QQU5cblx0XHRcdFx0XHR9W2V2ZW50LmJ1dHRvbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgbW91c2Vtb3ZlID0gKGUpID0+IHsgdGhpcy5tb3VzZW1vdmUoZSkgfTtcblx0XHRcdFx0dmFyIG1vdXNldXAgPSAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KEVORF9FVkVOVCk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cblx0XHRcdH0pLmFkZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cblx0XHRcdH0pLmFkZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoIDwgMSB8fCBldmVudC50b3VjaGVzLmxlbmd0aCA+IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoU1RBUlRfRVZFTlQpO1xuXG5cdFx0XHR9KS5hZGQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoIDwgMSB8fCBldmVudC50b3VjaGVzLmxlbmd0aCA+IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KEVORF9FVkVOVCk7XG5cblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBnZXRNb3VzZU9uU2NyZWVuXG5cblx0XHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuZ2V0TW91c2VPblNjcmVlbiA9IGZ1bmN0aW9uIGdldE1vdXNlT25TY3JlZW4ocGFnZVgsIHBhZ2VZKSB7XG5cdFx0XHRcdFx0dmVjdG9yLnNldChcblx0XHRcdFx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gdGhpcy5fc2NyZWVuLndpZHRoLFxuXHRcdFx0XHRcdFx0XHQocGFnZVkgLSB0aGlzLl9zY3JlZW4udG9wKSAvIHRoaXMuX3NjcmVlbi5oZWlnaHRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiB2ZWN0b3I7XG5cdFx0XHRcdH07XG5cblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBnZXRNb3VzZVByb2plY3Rpb25PbkJhbGxcblx0XHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBtb3VzZU9uQmFsbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsID0gZnVuY3Rpb24gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKHBhZ2VYLCBwYWdlWSkge1xuXG5cdFx0XHRcdFx0bW91c2VPbkJhbGwuc2V0KFxuXHRcdFx0XHRcdFx0XHQocGFnZVggLSB0aGlzLl9zY3JlZW4ud2lkdGggKiAwLjUgLSB0aGlzLl9zY3JlZW4ubGVmdCkgLyAodGhpcy5fc2NyZWVuLndpZHRoICogMC41KSxcblx0XHRcdFx0XHRcdFx0KHRoaXMuX3NjcmVlbi5oZWlnaHQgKiAwLjUgKyB0aGlzLl9zY3JlZW4udG9wIC0gcGFnZVkpIC8gKHRoaXMuX3NjcmVlbi5oZWlnaHQgKiAwLjUpLFxuXHRcdFx0XHRcdFx0XHQwLjBcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0dmFyIGxlbmd0aCA9IG1vdXNlT25CYWxsLmxlbmd0aCgpO1xuXG5cdFx0XHRcdFx0aWYgKGxlbmd0aCA+IDEuMCkge1xuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwubm9ybWFsaXplKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1vdXNlT25CYWxsLnogPSBNYXRoLnNxcnQoMS4wIC0gbGVuZ3RoICogbGVuZ3RoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl9leWUuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKS5zdWIodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdFx0dmVjdG9yLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLnkpO1xuXHRcdFx0XHRcdHZlY3Rvci5hZGQob2JqZWN0VXAuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5jcm9zcyh0aGlzLl9leWUpLnNldExlbmd0aChtb3VzZU9uQmFsbC54KSk7XG5cdFx0XHRcdFx0dmVjdG9yLmFkZCh0aGlzLl9leWUuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLnopKTtcblxuXHRcdFx0XHRcdHJldHVybiB2ZWN0b3I7XG5cblx0XHRcdFx0fTtcblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHsgdGhpcy5tb3VzZWRvd24oZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7IHRoaXMudG91Y2hzdGFydChlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4geyB0aGlzLnRvdWNobW92ZShlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7IHRoaXMudG91Y2hlbmQoZSkgfSk7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyoga2V5Ym9hcmQgZXZlbnQgbWV0aG9kIGNvcmVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ2tleWJvYXJkLWV2ZW50cycsIHtcblx0XHRhZnRlcjogWydjb3JlJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgna2V5Ym9hcmRWZWxvY2l0eScsICgpID0+IDEwKVxuXHRcdFx0LmFkZCgna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlICE9PSBTVEFURS5OT05FKSB7IHJldHVybiB9XG5cblx0XHRcdFx0Y29uc29sZS5sb2coJ2tleWRvd246JywgZXZlbnQua2V5Q29kZSk7XG5cblx0XHRcdFx0dmFyIGQgPSB0aGlzLmtleWJvYXJkVmVsb2NpdHkoKTtcblx0XHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdFx0Y2FzZSAzNzogeyB0aGlzLl92ZWxvY2l0eS54ID0gIGQgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDM4OiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAgZCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMzk6IHsgdGhpcy5fdmVsb2NpdHkueCA9IC1kIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSA0MDogeyB0aGlzLl92ZWxvY2l0eS55ID0gLWQgfSBicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ2tleXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0Y29uc29sZS5sb2coJ2tleXVwOicsIGV2ZW50LmtleUNvZGUpO1xuXG5cdFx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRcdGNhc2UgMzc6IHsgdGhpcy5fdmVsb2NpdHkueCA9IDAgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDM4OiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAwIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzOTogeyB0aGlzLl92ZWxvY2l0eS54ID0gMCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgNDA6IHsgdGhpcy5fdmVsb2NpdHkueSA9IDAgfSBicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoZSkgPT4geyB0aGlzLmtleWRvd24oZSkgfSk7XG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCAoZSkgPT4geyB0aGlzLmtleXVwKGUpIH0pO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHJvdGF0ZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdyb3RhdGUnLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZScsICdtb3VzZS1ldmVudHMnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5fcm90YXRlU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLl9yb3RhdGVTdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLl9yb3RhdGVFbmQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0Lyogcm90YXRpbmcgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gcm90YXRlQ2FtZXJhXG5cdFx0XHRcdHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXHRcdFx0XHR0aGlzLnJvdGF0ZUNhbWVyYSA9IGZ1bmN0aW9uIHJvdGF0ZUNhbWVyYSgpIHtcblxuXHRcdFx0XHRcdHZhciBhbmdsZSA9IE1hdGguYWNvcyhcblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuZG90KHRoaXMuX3JvdGF0ZUVuZCkgL1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5sZW5ndGgoKSAvXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5sZW5ndGgoKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKGFuZ2xlKSB7XG5cdFx0XHRcdFx0XHRheGlzLmNyb3NzVmVjdG9ycyh0aGlzLl9yb3RhdGVTdGFydCwgdGhpcy5fcm90YXRlRW5kKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHRcdFx0YW5nbGUgKj0gdGhpcy5yb3RhdGVTcGVlZDtcblxuXHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fTtcblx0XHRcdH0pXG5cdFx0Lyogcm90YXRpbmcgb3B0aW9ucyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMucm90YXRlU3BlZWQgPSAxLjA7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyogem9vbSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3pvb20nLCB7XG5cdFx0YWZ0ZXI6IFsnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5aT09NKSB7XG5cdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3pvb21FbmQuY29weSh0aGlzLl96b29tU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuWk9PTSkge1xuXHRcdFx0XHRcdHRoaXMuX3pvb21FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHR2YXIgZGlmZiA9IDA7XG5cdFx0XHRcdGlmIChldmVudC53aGVlbERlbHRhKSB7IC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXHRcdFx0XHRcdGRpZmYgPSBldmVudC53aGVlbERlbHRhIC8gNDA7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7IC8vIEZpcmVmb3hcblx0XHRcdFx0XHRkaWZmID0gLWV2ZW50LmRldGFpbCAvIDM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl96b29tU3RhcnQueSArPSBkaWZmICogMC4wMTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KEVORF9FVkVOVCk7XG5cblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIChlKSA9PiB7IHRoaXMubW91c2V3aGVlbChlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIChlKSA9PiB7IHRoaXMubW91c2V3aGVlbChlKSB9KTsgLy8gZmlyZWZveFxuXG5cdFx0XHR9KVxuXHRcdC8qIHpvb21pbmcgKi9cblx0XHRcdC5hZGQoJ3pvb21DYW1lcmEnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5UT1VDSF9aT09NX1BBTikge1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZDtcblx0XHRcdFx0XHR0aGlzLl9leWUubXVsdGlwbHlTY2FsYXIodGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCAvIHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZmFjdG9yID0gMS4wICsgKCB0aGlzLl96b29tRW5kLnkgLSB0aGlzLl96b29tU3RhcnQueSApICogdGhpcy56b29tU3BlZWQ7XG5cdFx0XHRcdFx0aWYgKGZhY3RvciAhPT0gMS4wICYmIGZhY3RvciA+IDAuMCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG5cdFx0XHRcdFx0XHR0aGlzLl96b29tU3RhcnQuY29weSh0aGlzLl96b29tRW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHQvKiB6b29taW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnpvb21TcGVlZCA9IDEuMjtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiBwYW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgncGFuJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnLCAnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHQvKiBwYW5uaW5nICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIHBhbkNhbWVyYVxuXHRcdFx0XHR2YXIgbW91c2VDaGFuZ2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgcGFuID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5wYW5DYW1lcmEgPSBmdW5jdGlvbiBwYW5DYW1lcmEoKSB7XG5cblx0XHRcdFx0XHRtb3VzZUNoYW5nZS5jb3B5KHRoaXMuX3BhbkVuZCkuc3ViKHRoaXMuX3BhblN0YXJ0KTtcblx0XHRcdFx0XHRpZiAobW91c2VDaGFuZ2UubGVuZ3RoU3EoKSkge1xuXHRcdFx0XHRcdFx0bW91c2VDaGFuZ2UubXVsdGlwbHlTY2FsYXIodGhpcy5fZXllLmxlbmd0aCgpICogdGhpcy5wYW5TcGVlZCk7XG5cdFx0XHRcdFx0XHRwYW4uY29weSh0aGlzLl9leWUpLmNyb3NzKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS54KTtcblx0XHRcdFx0XHRcdHBhbi5hZGQob2JqZWN0VXAuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueSkpO1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGQocGFuKTtcblx0XHRcdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLl9wYW5FbmQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHQvKiBwYW5uaW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnBhblNwZWVkID0gMC4zO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHpvb20gKyBwYW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCd6b29tK3BhbicsIHtcblx0XHRhZnRlcjogWyd6b29tJywgJ3BhbiddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLlRPVUNIX1pPT01fUEFOO1xuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSAwO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5fcGFuRW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXG5cdC8qIGxpdHRsZSBoYWNrIGZvciBhcGluYXRvbXktc3BlY2lmaWMgZnVuY3Rpb25hbGl0eSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdhcGluYXRvbXktc3BlY2lmaWMnLCB7XG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgnc2V0Q2FtZXJhRGlzdGFuY2UnLCBmdW5jdGlvbiBzZXRDYW1lcmFEaXN0YW5jZShkaXN0YW5jZSkge1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24ubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHRoZSBUcmFja2JhbGxDb250cm9scyBjbGFzcyAodmFyaWF0aW9uIHBvaW50KSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0VEhSRUUuVHJhY2tiYWxsQ29udHJvbHMgPSBkbS52cCgnVHJhY2tiYWxsQ29udHJvbHMnLFxuXHRcdFx0VS5uZXdDbGFzcyhmdW5jdGlvbiBUcmFja2JhbGxDb250cm9scyhjb250cm9sbGVkT2JqZWN0LCBkb21FbGVtZW50ID0gZG9jdW1lbnQpIHtcblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgY29uc3RydWN0IG1ldGhvZCBwb3B1bGF0ZWQgYnkgZGVsdGFzICovXG5cdFx0XHRcdHRoaXMuY29uc3RydWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0LyogZXhwbGljaXRseSB1cGRhdGUgaW4gdGhlIGJlZ2lubmluZyAqL1xuXHRcdFx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0XHR9LCBPYmplY3QuY3JlYXRlKFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUpKVxuXHQpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGhyZWUtZC1jYW52YXM+ZGl2PmRpdntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MDtwb2ludGVyLWV2ZW50czpub25lO30udGhyZWUtZC1jYW52YXM+ZGl2PmRpdj4uY2lyY3VpdGJvYXJke3BvaW50ZXItZXZlbnRzOnZpc2libGU7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt9LnRocmVlLWQtY2FudmFzPmRpdj5jYW52YXN7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjE7cG9pbnRlci1ldmVudHM6bm9uZTt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQuanMifQ==