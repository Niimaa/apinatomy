(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U) {
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
	    requires: ['position-tracking']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    if (!browserSupport()) {
	      console.warn("This browser doesn't seem to have WebGL support.");
	      return;
	    }
	    U.observable(this, 'threeDCanvasElement');
	    this.on('threeDCanvasElement', (function(newCanvas, oldCanvas) {
	      if (oldCanvas) {
	        oldCanvas.removeClass('three-d-canvas');
	      }
	      if (newCanvas) {
	        newCanvas.addClass('three-d-canvas');
	      }
	    }));
	    U.observable(this, 'threeDMode', {
	      initial: false,
	      validation: (function(val) {
	        U.assert(!val || $__0.options.threeDCanvasElement, "You cannot turn on 3D mode  when no 'threeDCanvasElement' has been set.");
	        return !!val;
	      })
	    });
	    var _canvasSize = U.cached({
	      retrieve: (function() {
	        return ($__0.threeDCanvasElement && new U.Size($__0.threeDCanvasElement.height(), $__0.threeDCanvasElement.width()));
	      }),
	      isEqual: U.Size.equals
	    });
	    Object.defineProperty(this, 'threeDCanvasSize', {get: function() {
	        return _canvasSize();
	      }});
	    _canvasSize.onChange((function(newSize) {
	      $__0.trigger('threeDCanvasSize', newSize);
	    }));
	    (this.options.canvasResizeEvent || $(window).resize.bind($(window)))(_canvasSize);
	    U.observable(this, 'threeDControlsEnabled');
	    this.on('threeDMode', (function(mode) {
	      if (mode) {
	        $__0._p_threeD_initialize();
	      }
	    }));
	    this.threeDCanvasElement = this.options.threeDCanvasElement;
	    if (this.threeDCanvasElement) {
	      this.threeDMode = true;
	    }
	  });
	  plugin.add('Circuitboard.prototype._p_threeD_initialize', function() {
	    var $__0 = this;
	    var onThreeDModeOff = (function(cb) {
	      var auxCb = (function(mode) {
	        if (!mode) {
	          $__0.off('threeDMode', auxCb);
	          cb();
	        }
	      });
	      $__0.on('threeDMode', auxCb);
	    });
	    this._p_threeD_initialMargin = {};
	    this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
	    this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
	    this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
	    this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;
	    onThreeDModeOff((function() {
	      delete $__0._p_threeD_initialMargin;
	    }));
	    this._p_threeD_scene = new THREE.Scene();
	    this.one('threeDMode', (function(mode) {
	      if (!mode) {
	        delete $__0._p_threeD_scene;
	      }
	    }));
	    this._p_threeD_camera = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
	    var setCameraAspect = (function(size) {
	      $__0._p_threeD_camera.aspect = size.width / size.height;
	      $__0._p_threeD_camera.updateProjectionMatrix();
	    });
	    this.on('threeDCanvasSize', setCameraAspect);
	    this._p_threeD_camera.position.z = 1;
	    onThreeDModeOff((function() {
	      $__0.off('threeDCanvasSize', setCameraAspect);
	      delete $__0._p_threeD_camera;
	    }));
	    var ambientLight = new THREE.AmbientLight(0x101030);
	    this._p_threeD_scene.add(ambientLight);
	    var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
	    directionalLight1.position.set(1, -1, 1);
	    this._p_threeD_scene.add(directionalLight1);
	    var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
	    directionalLight2.position.set(-1, 1, -1);
	    this._p_threeD_scene.add(directionalLight2);
	    onThreeDModeOff((function() {
	      ambientLight = undefined;
	      directionalLight1 = undefined;
	      directionalLight2 = undefined;
	    }));
	    this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({
	      alpha: true,
	      antialias: true
	    });
	    this._p_threeD_renderer_webgl.sortObjects = false;
	    this._p_threeD_renderer_webgl.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
	    var renderWebGL = (function() {
	      $__0._p_threeD_renderer_webgl.render($__0._p_threeD_scene, $__0._p_threeD_camera);
	    });
	    var setWebGLCanvasSize = (function(size) {
	      $__0._p_threeD_renderer_webgl.setSize(size.width, size.height);
	    });
	    this.on('3d-render', renderWebGL);
	    this.on('threeDCanvasSize', setWebGLCanvasSize);
	    onThreeDModeOff((function() {
	      $__0.off('3d-render', renderWebGL);
	      $__0.off('threeDCanvasSize', setWebGLCanvasSize);
	      delete $__0._p_threeD_renderer_webgl;
	    }));
	    this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
	    $(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
	    this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
	    this._p_threeD_renderer_css.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
	    var renderCSS = (function() {
	      $__0._p_threeD_renderer_css.render($__0._p_threeD_scene, $__0._p_threeD_camera);
	    });
	    var setWebCSSSize = (function(size) {
	      $__0._p_threeD_renderer_css.setSize(size.width, size.height);
	    });
	    this.on('3d-render', renderCSS);
	    this.on('threeDCanvasSize', setWebCSSSize);
	    onThreeDModeOff((function() {
	      $__0.off('3d-render', renderCSS);
	      $__0.off('threeDCanvasSize', setWebCSSSize);
	      $__0.threeDCanvasElement.empty();
	      delete $__0._p_threeD_renderer_css;
	    }));
	    var trigger3DRender = (function() {
	      $__0.trigger('3d-render');
	    });
	    this.on('size', trigger3DRender);
	    var stopTriggering3DRender = U.eachAnimationFrame((function() {
	      $__0.trigger('3d-render');
	    }));
	    onThreeDModeOff((function() {
	      $__0.off('size', trigger3DRender);
	      stopTriggering3DRender();
	    }));
	    this._p_threeD_controls = new THREE.TrackballControls(this._p_threeD_camera, this.threeDCanvasElement[0]);
	    $.extend(this._p_threeD_controls, {
	      rotateSpeed: 1.0,
	      zoomSpeed: 1.2,
	      panSpeed: 0.8
	    });
	    this._p_threeD_controls.addEventListener('change', (function() {
	      $__0.trigger('3d-render');
	    }));
	    var handleResizeForControls = (function() {
	      $__0._p_threeD_controls.handleResize();
	    });
	    var updateControls = (function() {
	      $__0._p_threeD_controls.update();
	    });
	    var setControlsEnabled = (function(enabled) {
	      $__0._p_threeD_controls.enabled = enabled;
	    });
	    this.on('size', handleResizeForControls);
	    this.on('3d-render', updateControls);
	    this.on('threeDControlsEnabled', setControlsEnabled);
	    onThreeDModeOff((function() {
	      $__0.off('size', handleResizeForControls);
	      $__0.off('3d-render', updateControls);
	      $__0.off('threeDControlsEnabled', setControlsEnabled);
	      delete $__0._p_threeD_controls;
	    }));
	    var initialCircuitboardParent = this.element.parent();
	    var initialCircuitboardPositioning = {
	      left: this.element.css('left'),
	      top: this.element.css('top'),
	      right: this.element.css('right'),
	      bottom: this.element.css('bottom')
	    };
	    this._p_threeD_circuitboard = new THREE.CSS3DObject(this.element[0]);
	    this.element.css({
	      left: 0,
	      top: 0,
	      bottom: 0,
	      right: 0
	    });
	    this._p_threeD_scene.add(this._p_threeD_circuitboard);
	    onThreeDModeOff((function() {
	      $__0.element.appendTo(initialCircuitboardParent).css({
	        'width': 'auto',
	        'height': 'auto',
	        'position': 'absolute',
	        'transform': '',
	        '-webkit-transform': ''
	      }).css(initialCircuitboardPositioning);
	      delete $__0._p_threeD_circuitboard;
	    }));
	    var backfaceElement = $('<div>').css({
	      position: 'absolute',
	      border: 'solid 1px black',
	      backfaceVisibility: 'hidden'
	    });
	    var backface = new THREE.CSS3DObject(backfaceElement[0]);
	    backface.rotation.set(Math.PI, 0, 0);
	    this._p_threeD_scene.add(backface);
	    this.object3D = new THREE.Object3D();
	    this._p_threeD_scene.add(this.object3D);
	    this.object3D.scale.y = -1;
	    this.on('size', (function(size) {
	      $__0.object3D.position.x = -size.width / 2;
	      $__0.object3D.position.y = size.height / 2;
	    }));
	    var onCanvasResize = (function() {
	      var size = {
	        width: $__0.threeDCanvasSize.width - $__0._p_threeD_initialMargin.left - $__0._p_threeD_initialMargin.right,
	        height: $__0.threeDCanvasSize.height - $__0._p_threeD_initialMargin.top - $__0._p_threeD_initialMargin.bottom
	      };
	      $__0.element.css(size);
	      backfaceElement.css(size);
	      backface.position.x = $__0._p_threeD_circuitboard.position.x = 0.5 * ($__0._p_threeD_initialMargin.left - $__0._p_threeD_initialMargin.right);
	      backface.position.y = $__0._p_threeD_circuitboard.position.y = 0.5 * ($__0._p_threeD_initialMargin.bottom - $__0._p_threeD_initialMargin.top);
	      $__0._p_threeD_controls.setCameraDistance($__0.threeDCanvasSize.height / (2 * Math.tan(THREE.Math.degToRad($__0._p_threeD_camera.fov) / 2)));
	    });
	    this.on('threeDCanvasSize', onCanvasResize);
	    onCanvasResize();
	    onThreeDModeOff((function() {
	      $__0.off('threeDCanvasSize', onCanvasResize);
	    }));
	  });
	  plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function(positionOnCanvas) {
	    this._p_threeD_camera.updateMatrixWorld();
	    this._p_threeD_camera.updateProjectionMatrix();
	    var mouse3D = new THREE.Vector3();
	    mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
	    mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
	    mouse3D.z = 0.5;
	    PROJECTOR.unprojectVector(mouse3D, this._p_threeD_camera);
	    var ray = new THREE.Ray(this._p_threeD_camera.position, mouse3D.sub(this._p_threeD_camera.position).normalize());
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
	      $__0.on('position', reset);
	      $__0.on('size', reset);
	      reset($__0.position);
	    }))((function() {
	      $__0.object3D.position.x = $__0.position.left + $__0.size.width / 2;
	      $__0.object3D.position.y = $__0.position.top + $__0.size.height / 2;
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

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var U = {
	    newClass: function(constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__0 = 0; $__0 < arguments.length; $__0++)
	          args[$__0] = arguments[$__0];
	        constructor.apply(this, args);
	      };
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(superClass, constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__0 = 0; $__0 < arguments.length; $__0++)
	          args[$__0] = arguments[$__0];
	        constructor.apply(this, [superClass.prototype.constructor].concat(args));
	      };
	      cls.prototype = Object.create(superClass.prototype, prototype);
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__0 = 1; $__0 < arguments.length; $__0++)
	        rest[$__0 - 1] = arguments[$__0];
	      rest.forEach((function(obj) {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            obj1[key] = obj[key];
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
	          $__1 = 2; $__1 < arguments.length; $__1++)
	        args[$__1 - 2] = arguments[$__1];
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
	          $__2 = 0; $__2 < arguments.length; $__2++)
	        values[$__2] = arguments[$__2];
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
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
	        var laterFn = (function() {
	          timeout = null;
	          func.apply(context, args);
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
	      return function stopEachAnimationFrame() {
	        stop = true;
	      };
	    },
	    oncePerStack: function(func, context) {
	      var notRunYet = true;
	      return function() {
	        for (var args = [],
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context || this, args);
	        }
	      };
	    },
	    observable: function(obj, name) {
	      var $__4 = arguments[2] !== (void 0) ? arguments[2] : {},
	          initial = $__4.initial,
	          validation = $__4.validation;
	      var value = initial;
	      Object.defineProperty(obj, name, {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          var oldValue = value;
	          if (validation) {
	            newValue = validation(newValue, oldValue);
	          }
	          if (newValue !== oldValue) {
	            value = newValue;
	            this.trigger(name, newValue, oldValue);
	          }
	        }
	      });
	    },
	    cached: function(options) {
	      var retrieve = options.retrieve,
	          isEqual = options.isEqual || ((function(a, b) {
	            return (a === b);
	          }));
	      var cache;
	      function setValue() {
	        var oldValue = cache;
	        cache = retrieve();
	        if (!isEqual(cache, oldValue)) {
	          onChange.forEach((function(fn) {
	            return fn(cache, oldValue);
	          }));
	        }
	      }
	      setTimeout(setValue);
	      var oncePerStackSetValue = U.oncePerStack(setValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange = [];
	      resultFn.onChange = (function(cb) {
	        onChange.push(cb);
	        return resultFn;
	      });
	      return resultFn;
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(6), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, DeltaModel, U) {
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
	  }).add('update', function() {
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
	  }).add('reset', function() {
	    this._state = STATE.NONE;
	    this._targetCoordinates.copy(this._targetCoordinates0);
	    this._controlledObject.position.copy(this._position0);
	    this._controlledObject.up.copy(this._up0);
	    this._eye.subVectors(this._controlledObject.position, this._targetCoordinates);
	    this._controlledObject.lookAt(this._targetCoordinates);
	    this.dispatchEvent(CHANGE_EVENT);
	    this._lastPosition.copy(this._controlledObject.position);
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
	      this._state = event.button;
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

/***/ },
/* 9 */
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
/* 10 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNjhhOTFhZjJlNGUwYTg2MzZiZCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3M/NWRhYyIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nz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Y2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImRlbHRhLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDY4YTkxYWYyZTRlMGE4NjM2YmRcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzJyxcblx0Jy4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qcycsXG5cdCcuL3AtdGhyZWUtZC5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRlc3QgZm9yIGJyb3dzZXIgM0Qgc3VwcG9ydCAqL1xuXHRmdW5jdGlvbiBicm93c2VyU3VwcG9ydCgpIHtcblx0XHR2YXIgY2FudmFzO1xuXHRcdHRyeSB7XG5cdFx0XHRjYW52YXMgPSAkKCc8Y2FudmFzPicpO1xuXHRcdFx0cmV0dXJuICEhKGNhbnZhc1swXS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhc1swXS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSk7XG5cdFx0fSBjYXRjaCAoX18pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y2FudmFzID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cblx0Lyogc29tZSB1c2VmdWwgY29uc3RhbnRzIGZvciBtYWtpbmcgaW50ZXJzZWN0aW9uIGNoZWNrcyAqL1xuXHR2YXIgUExBTkUgPSBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIDApO1xuXHR2YXIgUFJPSkVDVE9SID0gbmV3IFRIUkVFLlByb2plY3RvcigpO1xuXG5cblx0LyogdGhlIHBsdWdpbiAqL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZCcsXG5cdFx0cmVxdWlyZXM6IFsncG9zaXRpb24tdHJhY2tpbmcnXVxuXHR9KTtcblxuXG5cdC8qIHRoZSBjb25zdHJ1Y3RvciBpcyBydW4gb25jZSB0byBpbml0aWFsaXplIHBvdGVudGlhbCAzRC1uZXNzICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cblx0XHQvKiAgdGVzdCBmb3IgYnJvd3NlciBzdXBwb3J0ICovXG5cdFx0aWYgKCFicm93c2VyU3VwcG9ydCgpKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzZWVtIHRvIGhhdmUgV2ViR0wgc3VwcG9ydC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENhbnZhc0VsZW1lbnQnIHByb3BlcnR5ICovXG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsICd0aHJlZURDYW52YXNFbGVtZW50Jyk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzRWxlbWVudCcsIChuZXdDYW52YXMsIG9sZENhbnZhcykgPT4ge1xuXHRcdFx0aWYgKG9sZENhbnZhcykgeyBvbGRDYW52YXMucmVtb3ZlQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdFx0aWYgKG5ld0NhbnZhcykgeyBuZXdDYW52YXMuYWRkQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5ICovXG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsICd0aHJlZURNb2RlJywge1xuXHRcdFx0aW5pdGlhbDogZmFsc2UsXG5cdFx0XHR2YWxpZGF0aW9uOiAodmFsKSA9PiB7XG5cdFx0XHRcdFUuYXNzZXJ0KCF2YWwgfHwgdGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQsXG5cdFx0XHRcdFx0XHRgWW91IGNhbm5vdCB0dXJuIG9uIDNEIG1vZGUgIHdoZW4gbm8gJ3RocmVlRENhbnZhc0VsZW1lbnQnIGhhcyBiZWVuIHNldC5gKTtcblx0XHRcdFx0cmV0dXJuICEhdmFsO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENhbnZhc1NpemUnIHByb3BlcnR5ICovXG5cdFx0dmFyIF9jYW52YXNTaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+ICh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgJiYgbmV3IFUuU2l6ZShcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuaGVpZ2h0KCksXG5cdFx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKClcblx0XHRcdCkpLFxuXHRcdFx0aXNFcXVhbDogVS5TaXplLmVxdWFsc1xuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGhyZWVEQ2FudmFzU2l6ZScsIHsgZ2V0KCkgeyByZXR1cm4gX2NhbnZhc1NpemUoKSB9IH0pO1xuXHRcdF9jYW52YXNTaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcigndGhyZWVEQ2FudmFzU2l6ZScsIG5ld1NpemUpIH0pO1xuXG5cblx0XHQvKiByZWFjdCB0byBjYW52YXMgcmVzaXplICovXG5cdFx0KCB0aGlzLm9wdGlvbnMuY2FudmFzUmVzaXplRXZlbnQgfHwgJCh3aW5kb3cpLnJlc2l6ZS5iaW5kKCQod2luZG93KSkgKShfY2FudmFzU2l6ZSk7XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ29udHJvbHNFbmFibGVkJyBwcm9wZXJ0eSAqL1xuXHRcdFUub2JzZXJ2YWJsZSh0aGlzLCAndGhyZWVEQ29udHJvbHNFbmFibGVkJyk7XG5cblxuXHRcdC8qIGluaXRpYWxpemUgd2hlbiAzRCBtb2RlIGlzIHR1cm5lZCBvbiAqL1xuXHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCAobW9kZSkgPT4ge1xuXHRcdFx0aWYgKG1vZGUpIHsgdGhpcy5fcF90aHJlZURfaW5pdGlhbGl6ZSgpIH1cblx0XHR9KTtcblxuXG5cdFx0Lyogd2FzIGEgY2FudmFzIGdpdmVuIHRocm91Z2ggdGhlIG9wdGlvbnM/ICovXG5cdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50ID0gdGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQ7XG5cdFx0aWYgKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCkge1xuXHRcdFx0dGhpcy50aHJlZURNb2RlID0gdHJ1ZTtcblx0XHR9XG5cblxuXHR9KTtcblxuXHQvKiBgX3BfdGhyZWVEX2luaXRpYWxpemVgIGlzIHJ1biBldmVyeSB0aW1lIDNELW5lc3MgaXMgdHVybmVkIG9uICovXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuX3BfdGhyZWVEX2luaXRpYWxpemUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiBhbiBlYXN5IHdheSB0byBhY3Qgb24gM0QgbW9kZSBiZWluZyB0dXJuZWQgb2ZmICovXG5cdFx0dmFyIG9uVGhyZWVETW9kZU9mZiA9IChjYikgPT4ge1xuXHRcdFx0dmFyIGF1eENiID0gKG1vZGUpID0+IHtcblx0XHRcdFx0aWYgKCFtb2RlKSB7XG5cdFx0XHRcdFx0dGhpcy5vZmYoJ3RocmVlRE1vZGUnLCBhdXhDYik7XG5cdFx0XHRcdFx0Y2IoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCBhdXhDYik7XG5cdFx0fTtcblxuXG5cdFx0LyogcmVtZW1iZXIgdGhlIGluaXRpYWwgbWFyZ2luICovXG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbiA9IHt9O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS5sZWZ0IC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLmxlZnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3AgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCkudG9wIC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0ID0gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC0gdGhpcy5zaXplLndpZHRoIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tID0gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuc2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcDtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW47XG5cdFx0fSk7XG5cblxuXHRcdC8qIHNjZW5lICovXG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLm9uZSgndGhyZWVETW9kZScsIChtb2RlKSA9PiB7XG5cdFx0XHRpZiAoIW1vZGUpIHsgZGVsZXRlIHRoaXMuX3BfdGhyZWVEX3NjZW5lIH1cblx0XHR9KTtcblxuXG5cblx0XHQvKiBjYW1lcmEgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEgPVxuXHRcdFx0XHRuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQsIDEsIDEwMDAwKTtcblx0XHR2YXIgc2V0Q2FtZXJhQXNwZWN0ID0gKHNpemUpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5hc3BlY3QgPSBzaXplLndpZHRoIC8gc2l6ZS5oZWlnaHQ7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHRcdH07XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIHNldENhbWVyYUFzcGVjdCk7XG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uLnogPSAxO1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIHNldENhbWVyYUFzcGVjdCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY2FtZXJhO1xuXHRcdH0pO1xuXG5cblx0XHQvKiBsaWdodGluZyAqL1xuXHRcdHZhciBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MTAxMDMwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MSA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0MS5wb3NpdGlvbi5zZXQoMSwgLTEsIDEpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MSk7XG5cdFx0Ly9cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodDIgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24uc2V0KC0xLCAxLCAtMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQyKTtcblx0XHQvL1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHRhbWJpZW50TGlnaHQgPSB1bmRlZmluZWQ7XG5cdFx0XHRkaXJlY3Rpb25hbExpZ2h0MSA9IHVuZGVmaW5lZDtcblx0XHRcdGRpcmVjdGlvbmFsTGlnaHQyID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXG5cblx0XHQvKiByZW5kZXJlcjogV2ViR0wgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbCA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYWxwaGE6IHRydWUsIGFudGlhbGlhczogdHJ1ZSB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5zb3J0T2JqZWN0cyA9IGZhbHNlO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNldFNpemUodGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKCksIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSk7XG5cdFx0dmFyIHJlbmRlcldlYkdMID0gKCkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSkgfTtcblx0XHR2YXIgc2V0V2ViR0xDYW52YXNTaXplID0gKHNpemUpID0+IHsgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCkgfTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCByZW5kZXJXZWJHTCk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkdMQ2FudmFzU2l6ZSk7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdHRoaXMub2ZmKCczZC1yZW5kZXInLCByZW5kZXJXZWJHTCk7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkdMQ2FudmFzU2l6ZSk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2w7XG5cdFx0fSk7XG5cblxuXHRcdC8qIHJlbmRlcmVyOiBDU1MgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MgPSBuZXcgVEhSRUUuQ1NTM0RSZW5kZXJlcigpO1xuXHRcdCQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpLmFwcGVuZCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5kb21FbGVtZW50KTtcblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5kb21FbGVtZW50KTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3Muc2V0U2l6ZSh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpKTtcblx0XHR2YXIgcmVuZGVyQ1NTID0gKCkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLl9wX3RocmVlRF9jYW1lcmEpIH07XG5cdFx0dmFyIHNldFdlYkNTU1NpemUgPSAoc2l6ZSkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3Muc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCkgfTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCByZW5kZXJDU1MpO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCBzZXRXZWJDU1NTaXplKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJzNkLXJlbmRlcicsIHJlbmRlckNTUyk7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkNTU1NpemUpO1xuXHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmVtcHR5KCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzO1xuXHRcdH0pO1xuXG5cblx0XHQvKiByZW5kZXIgb24gc2l6ZS1jaGFuZ2UgYW5kIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZSAqL1xuXHRcdHZhciB0cmlnZ2VyM0RSZW5kZXIgPSAoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfTtcblx0XHR0aGlzLm9uKCdzaXplJywgdHJpZ2dlcjNEUmVuZGVyKTtcblx0XHR2YXIgc3RvcFRyaWdnZXJpbmczRFJlbmRlciA9IFUuZWFjaEFuaW1hdGlvbkZyYW1lKCgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJ3NpemUnLCB0cmlnZ2VyM0RSZW5kZXIpO1xuXHRcdFx0c3RvcFRyaWdnZXJpbmczRFJlbmRlcigpO1xuXHRcdH0pO1xuXG5cblx0XHQvKiBjb250cm9scyAqL1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzID0gbmV3IFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzKHRoaXMuX3BfdGhyZWVEX2NhbWVyYSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50WzBdKTtcblx0XHQkLmV4dGVuZCh0aGlzLl9wX3RocmVlRF9jb250cm9scywge1xuXHRcdFx0cm90YXRlU3BlZWQ6IDEuMCxcblx0XHRcdHpvb21TcGVlZDogMS4yLFxuXHRcdFx0cGFuU3BlZWQ6IDAuOFxuXHRcdH0pO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblx0XHR2YXIgaGFuZGxlUmVzaXplRm9yQ29udHJvbHMgPSAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmhhbmRsZVJlc2l6ZSgpIH07XG5cdFx0dmFyIHVwZGF0ZUNvbnRyb2xzID0gKCkgPT4geyB0aGlzLl9wX3RocmVlRF9jb250cm9scy51cGRhdGUoKSB9O1xuXHRcdHZhciBzZXRDb250cm9sc0VuYWJsZWQgPSAoZW5hYmxlZCkgPT4geyB0aGlzLl9wX3RocmVlRF9jb250cm9scy5lbmFibGVkID0gZW5hYmxlZCB9O1xuXHRcdHRoaXMub24oJ3NpemUnLCBoYW5kbGVSZXNpemVGb3JDb250cm9scyk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJywgdXBkYXRlQ29udHJvbHMpO1xuXHRcdHRoaXMub24oJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcsIHNldENvbnRyb2xzRW5hYmxlZCk7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdHRoaXMub2ZmKCdzaXplJywgaGFuZGxlUmVzaXplRm9yQ29udHJvbHMpO1xuXHRcdFx0dGhpcy5vZmYoJzNkLXJlbmRlcicsIHVwZGF0ZUNvbnRyb2xzKTtcblx0XHRcdHRoaXMub2ZmKCd0aHJlZURDb250cm9sc0VuYWJsZWQnLCBzZXRDb250cm9sc0VuYWJsZWQpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzO1xuXHRcdH0pO1xuXG5cblx0XHQvKiBmbG9hdGluZyB0aWxlbWFwICovXG5cdFx0dmFyIGluaXRpYWxDaXJjdWl0Ym9hcmRQYXJlbnQgPSB0aGlzLmVsZW1lbnQucGFyZW50KCk7XG5cdFx0dmFyIGluaXRpYWxDaXJjdWl0Ym9hcmRQb3NpdGlvbmluZyA9IHtcblx0XHRcdGxlZnQ6IHRoaXMuZWxlbWVudC5jc3MoJ2xlZnQnKSxcblx0XHRcdHRvcDogdGhpcy5lbGVtZW50LmNzcygndG9wJyksXG5cdFx0XHRyaWdodDogdGhpcy5lbGVtZW50LmNzcygncmlnaHQnKSxcblx0XHRcdGJvdHRvbTogdGhpcy5lbGVtZW50LmNzcygnYm90dG9tJylcblx0XHR9O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZCA9IG5ldyBUSFJFRS5DU1MzRE9iamVjdCh0aGlzLmVsZW1lbnRbMF0pO1xuXHRcdHRoaXMuZWxlbWVudC5jc3MoeyBsZWZ0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAgfSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZCk7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRUbyhpbml0aWFsQ2lyY3VpdGJvYXJkUGFyZW50KVxuXHRcdFx0XHRcdC5jc3Moe1xuXHRcdFx0XHRcdFx0J3dpZHRoJzogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0J2hlaWdodCc6ICdhdXRvJyxcblx0XHRcdFx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG5cdFx0XHRcdFx0XHQndHJhbnNmb3JtJzogJycsXG5cdFx0XHRcdFx0XHQnLXdlYmtpdC10cmFuc2Zvcm0nOiAnJ1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNzcyhpbml0aWFsQ2lyY3VpdGJvYXJkUG9zaXRpb25pbmcpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZDtcblx0XHR9KTtcblxuXG5cdFx0LyogdGlsZW1hcCBiYWNrZmFjZSAqL1xuXHRcdHZhciBiYWNrZmFjZUVsZW1lbnQgPSAkKCc8ZGl2PicpLmNzcyh7XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdGJvcmRlcjogJ3NvbGlkIDFweCBibGFjaycsXG5cdFx0XHRiYWNrZmFjZVZpc2liaWxpdHk6ICdoaWRkZW4nXG5cdFx0fSk7XG5cdFx0dmFyIGJhY2tmYWNlID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KGJhY2tmYWNlRWxlbWVudFswXSk7XG5cdFx0YmFja2ZhY2Uucm90YXRpb24uc2V0KE1hdGguUEksIDAsIDApO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChiYWNrZmFjZSk7XG5cblxuXHRcdC8qIGEgdGhyZWUuanMgb2JqZWN0IHdpdGggYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBodG1sIGFuZCBzdmcgb2YgdGhlIGNpcmN1aXRib2FyZCAqL1xuXHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhpcy5vYmplY3QzRCk7XG5cdFx0dGhpcy5vYmplY3QzRC5zY2FsZS55ID0gLTE7IC8vIGZsaXAgeSBheGlzXG5cdFx0dGhpcy5vbignc2l6ZScsIChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSAtc2l6ZS53aWR0aCAvIDI7XG5cdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnkgPSBzaXplLmhlaWdodCAvIDI7XG5cdFx0fSk7XG5cblxuXHRcdC8qIHJlc3BvbmQgdG8gcmVzaXplICovXG5cdFx0dmFyIG9uQ2FudmFzUmVzaXplID0gKCkgPT4ge1xuXG5cdFx0XHQvKiBzaXppbmcgYW5kIHBvc2l0aW9uaW5nIG9mIHRoZSBjaXJjdWl0LWJvYXJkIGFuZCBiYWNrZmFjZSAqL1xuXHRcdFx0dmFyIHNpemUgPSB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0LFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5lbGVtZW50LmNzcyhzaXplKTtcblx0XHRcdGJhY2tmYWNlRWxlbWVudC5jc3Moc2l6ZSk7XG5cdFx0XHRiYWNrZmFjZS5wb3NpdGlvbi54ID0gdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkLnBvc2l0aW9uLnggPSAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCk7XG5cdFx0XHRiYWNrZmFjZS5wb3NpdGlvbi55ID0gdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkLnBvc2l0aW9uLnkgPSAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCk7XG5cblx0XHRcdC8qIHNldCB0aGUgY2FtZXJhIGRpc3RhbmNlIHRvIGNvcnJlc3BvbmQgKi9cblx0XHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnNldENhbWVyYURpc3RhbmNlKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgL1xuXHRcdFx0XHRcdCgyICogTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZCh0aGlzLl9wX3RocmVlRF9jYW1lcmEuZm92KSAvIDIpKVxuXHRcdFx0KTtcblxuXHRcdH07XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIG9uQ2FudmFzUmVzaXplKTtcblx0XHRvbkNhbnZhc1Jlc2l6ZSgpO1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIG9uQ2FudmFzUmVzaXplKTtcblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qIGB0cmFuc2xhdGVQb3NpdGlvbkZyb21DYW52YXNUb0NpcmN1aXRib2FyZGAgaGFzIG5vIHNpZGUtZWZmZWN0cyBhbmQgY2FuIGJlIHVzZWQgICAqL1xuXHQvKiAgZnJvbSB0aGUgb3V0c2lkZSB0byB0cmFuc2xhdGUgbGVmdC90b3AgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlbiB0byBsZWZ0L3RvcCAgICAgKi9cblx0LyogIGNvb3JkaW5hdGVzIG9mIHRoZSBwcml2YXRlIGNvb3JkaW5hdGUtc3lzdGVtIG9mIHRoZSBjaXJjdWl0Ym9hcmQsIGhvd2V2ZXIgaXQgaXMgICovXG5cdC8qICBvcmllbnRlZCBpbiAzRCBzcGFjZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLnRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkJywgZnVuY3Rpb24gKHBvc2l0aW9uT25DYW52YXMpIHtcblxuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHR2YXIgbW91c2UzRCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0bW91c2UzRC54ID0gcG9zaXRpb25PbkNhbnZhcy5sZWZ0IC8gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoICogMiAtIDE7XG5cdFx0bW91c2UzRC55ID0gLXBvc2l0aW9uT25DYW52YXMudG9wIC8gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAqIDIgKyAxO1xuXHRcdG1vdXNlM0QueiA9IDAuNTtcblx0XHRQUk9KRUNUT1IudW5wcm9qZWN0VmVjdG9yKG1vdXNlM0QsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSk7XG5cdFx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkodGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uLCBtb3VzZTNELnN1Yih0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24pLm5vcm1hbGl6ZSgpKTtcblx0XHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RQbGFuZShQTEFORSk7XG5cblx0XHQvKiBpZiB0aGUgdGVzdGVkIGludGVyc2VjdGlvbiBpcyBvdXQgb2YgcmFuZ2UsIHJldHVybiB1bmRlZmluZWQgKi9cblx0XHRpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRsZWZ0OiBpbnRlcnNlY3RzLnggKyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0LFxuXHRcdFx0dG9wOiAtaW50ZXJzZWN0cy55ICsgdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcFxuXHRcdH07XG5cblx0fSk7XG5cblxuXHRwbHVnaW4uaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiBjcmVhdGUgdGhlIDNEIG9iamVjdCBmb3IgdGhpcyB0aWxlICovXG5cdFx0dGhpcy5vYmplY3QzRCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuXHRcdHRoaXMuY2lyY3VpdGJvYXJkLm9iamVjdDNELmFkZCh0aGlzLm9iamVjdDNEKTtcblxuXHRcdC8qIHBvc2l0aW9uIGl0IGFsd2F5cyBpbiB0aGUgY2VudGVyIG9mIHRoZSB0aWxlICovXG5cdFx0KChyZXNldCkgPT4ge1xuXHRcdFx0dGhpcy5vbigncG9zaXRpb24nLCByZXNldCk7XG5cdFx0XHR0aGlzLm9uKCdzaXplJywgcmVzZXQpO1xuXHRcdFx0cmVzZXQodGhpcy5wb3NpdGlvbik7XG5cdFx0fSkoKCkgPT4ge1xuXHRcdFx0dGhpcy5vYmplY3QzRC5wb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvbi5sZWZ0ICsgdGhpcy5zaXplLndpZHRoIC8gMjtcblx0XHRcdHRoaXMub2JqZWN0M0QucG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24udG9wICsgdGhpcy5zaXplLmhlaWdodCAvIDI7XG5cdFx0fSk7XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGhyZWUtZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gbmFtZSAobWFuZGF0b3J5KSAgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly8gb3B0aW9ucy5pbml0aWFsICAgIC0gdGhlIGluaXRpYWwgdmFsdWU7IGRlZmF1bHRzIHRvIHVuZGVmaW5lZFxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIG5hbWUsIHtpbml0aWFsLCB2YWxpZGF0aW9ufSA9IHt9KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmICghaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKGNhY2hlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlKTtcblxuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UucHVzaChjYik7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHBvc2l0aW9uXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHNpemVcblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uIChUSFJFRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGh0dHA6Ly93d3cuZW1hZ2l4Lm5ldC9hY2FkZW1pYy9tc2NzLXByb2plY3QvaXRlbS9jYW1lcmEtc3luYy13aXRoLWNzczMtYW5kLXdlYmdsLXRocmVlanNcblx0ICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cblx0ICovXG5cblx0VEhSRUUuQ1NTM0RPYmplY3QgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5PYmplY3QzRC5jYWxsKCB0aGlzICk7XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdyZW1vdmVkJywgZnVuY3Rpb24gKCAvKmV2ZW50Ki8gKSB7XG5cblx0XHRcdGlmICggdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUgKTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZSA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLkNTUzNET2JqZWN0LmNhbGwoIHRoaXMsIGVsZW1lbnQgKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSApO1xuXG5cdC8vXG5cblx0VEhSRUUuQ1NTM0RSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUubG9nKCAnVEhSRUUuQ1NTM0RSZW5kZXJlcicsIFRIUkVFLlJFVklTSU9OICk7XG5cblx0XHR2YXIgX3dpZHRoLCBfaGVpZ2h0O1xuXHRcdHZhciBfd2lkdGhIYWxmLCBfaGVpZ2h0SGFsZjtcblxuXHRcdHZhciBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0dmFyIGNhY2hlID0ge1xuXHRcdFx0Y2FtZXJhOiB7IGZvdjogMCwgc3R5bGU6ICcnIH0sXG5cdFx0XHRvYmplY3RzOiB7fVxuXHRcdH07XG5cblx0XHR2YXIgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblxuXHRcdHZhciBjYW1lcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdGRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNhbWVyYUVsZW1lbnQgKTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRcdF93aWR0aCA9IHdpZHRoO1xuXHRcdFx0X2hlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0X3dpZHRoSGFsZiA9IF93aWR0aCAvIDI7XG5cdFx0XHRfaGVpZ2h0SGFsZiA9IF9oZWlnaHQgLyAyO1xuXG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0fTtcblxuXHRcdHZhciBlcHNpbG9uID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldENhbWVyYUNTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAnbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0T2JqZWN0Q1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICd0cmFuc2xhdGUzZCgtNTAlLC01MCUsMCkgbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgcmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKCBvYmplY3QsIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRE9iamVjdCApIHtcblxuXHRcdFx0XHR2YXIgc3R5bGU7XG5cblx0XHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRFNwcml0ZSApIHtcblxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9zd2lmdGNvZGVyLndvcmRwcmVzcy5jb20vMjAwOC8xMS8yNS9jb25zdHJ1Y3RpbmctYS1iaWxsYm9hcmQtbWF0cml4L1xuXG5cdFx0XHRcdFx0bWF0cml4LmNvcHkoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcblx0XHRcdFx0XHRtYXRyaXgudHJhbnNwb3NlKCk7XG5cdFx0XHRcdFx0bWF0cml4LmNvcHlQb3NpdGlvbiggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cdFx0XHRcdFx0bWF0cml4LnNjYWxlKCBvYmplY3Quc2NhbGUgKTtcblxuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDcgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMSBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDE1IF0gPSAxO1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZWxlbWVudCA9IG9iamVjdC5lbGVtZW50O1xuXHRcdFx0XHR2YXIgY2FjaGVkU3R5bGUgPSBjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXTtcblxuXHRcdFx0XHRpZiAoIGNhY2hlZFN0eWxlID09PSB1bmRlZmluZWQgfHwgY2FjaGVkU3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0XHRjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXSA9IHN0eWxlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY2FtZXJhRWxlbWVudCApIHtcblxuXHRcdFx0XHRcdGNhbWVyYUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRcdFx0cmVuZGVyT2JqZWN0KCBvYmplY3QuY2hpbGRyZW5bIGkgXSwgY2FtZXJhICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdFx0dmFyIGZvdiA9IDAuNSAvIE1hdGgudGFuKCBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBjYW1lcmEuZm92ICogMC41ICkgKSAqIF9oZWlnaHQ7XG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLmZvdiAhPT0gZm92ICkge1xuXG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5XZWJraXRQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLk1velBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUub1BlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5mb3YgPSBmb3Y7XG5cblx0XHRcdH1cblxuXHRcdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0aWYgKCBjYW1lcmEucGFyZW50ID09PSB1bmRlZmluZWQgKSB7IGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpIH1cblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZS5nZXRJbnZlcnNlKCBjYW1lcmEubWF0cml4V29ybGQgKTtcblxuXHRcdFx0dmFyIHN0eWxlID0gXCJ0cmFuc2xhdGUzZCgwLDAsXCIgKyBmb3YgKyBcInB4KVwiICsgZ2V0Q2FtZXJhQ1NTTWF0cml4KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICkgK1xuXHRcdFx0XHRcIiB0cmFuc2xhdGUzZChcIiArIF93aWR0aEhhbGYgKyBcInB4LFwiICsgX2hlaWdodEhhbGYgKyBcInB4LCAwKVwiO1xuXG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLnN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuc3R5bGUgPSBzdHlsZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJPYmplY3QoIHNjZW5lLCBjYW1lcmEgKTtcblxuXHRcdH07XG5cblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL0NTUzNEUmVuZGVyZXIuanNcbiAqKi8iLCIvKipcbiAqIEBhdXRob3IgRWJlcmhhcmQgR3JhZXRoZXIgICAgIChodHRwOi8vZWdyYWV0aGVyLmNvbSlcbiAqIEBhdXRob3IgTWFyayBMdW5kaW4gICAgICAgICAgIChodHRwOi8vbWFyay1sdW5kaW4uY29tKVxuICogQGF1dGhvciBNaWNoaWVsIEhlbHZlbnN0ZWlqbiAgKGh0dHA6Ly9taGVsdmVucy5uZXQpXG4gKi9cblxuZGVmaW5lKFsnanF1ZXJ5JywgJ3RocmVlLWpzJywgJ2RlbHRhLWpzJywgJy4vbWlzYy5qcyddLCAoJCwgVEhSRUUsIERlbHRhTW9kZWwsIFUpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogY29uc3RhbnRzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBTVEFURSA9IHsgTk9ORTogLTEsIFJPVEFURTogMCwgWk9PTTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX1pPT01fUEFOOiA0IH07XG5cdHZhciBDSEFOR0VfRVZFTlQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cdHZhciBTVEFSVF9FVkVOVCAgPSB7IHR5cGU6ICdzdGFydCcgfTtcblx0dmFyIEVORF9FVkVOVCAgICA9IHsgdHlwZTogJ2VuZCcgfTtcblxuXG5cdC8qIGRlbHRhIG1vZGVsICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0dmFyIGRtID0gbmV3IERlbHRhTW9kZWwoKTtcblxuXG5cdC8qIGNvcmUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdjb3JlJywge1xuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiAnY29uc3RydWN0JyBtZXRob2QgY29yZSAqL1xuXHRcdFx0LmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKGNvbnRyb2xsZWRPYmplY3QsIGRvbUVsZW1lbnQpIHtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdCA9IGNvbnRyb2xsZWRPYmplY3Q7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuXHRcdFx0fSlcblx0XHQvKiBBUEkgKi9cblx0XHRcdC5hcHBlbmQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHR9KVxuXHRcdC8qIHByaXZhdGUgZmllbGRzICovXG5cdFx0XHQuYXBwZW5kKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdHRoaXMuX2V5ZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwO1xuXHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cdFx0XHRcdHRoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fc2NyZWVuID0geyBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMwID0gdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY2xvbmUoKTtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb24wID0gdGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdFx0XHR0aGlzLl91cDAgPSB0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNsb25lKCk7XG5cblx0XHRcdH0pXG5cdFx0LyogcHVibGljIG1ldGhvZHMgKi9cblx0XHRcdC5hZGQoJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLCB0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0dGhpcy5yb3RhdGVDYW1lcmEoKTtcblx0XHRcdFx0dGhpcy56b29tQ2FtZXJhKCk7XG5cdFx0XHRcdHRoaXMucGFuQ2FtZXJhKCk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLCB0aGlzLl9leWUpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pID4gRVBTKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENIQU5HRV9FVkVOVCk7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFBvc2l0aW9uLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCdyZXNldCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY29weSh0aGlzLl90YXJnZXRDb29yZGluYXRlczApO1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmNvcHkodGhpcy5fcG9zaXRpb24wKTtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5jb3B5KHRoaXMuX3VwMCk7XG5cblx0XHRcdFx0dGhpcy5fZXllLnN1YlZlY3RvcnModGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbiwgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ0hBTkdFX0VWRU5UKTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdFx0fSkuYWRkKCdoYW5kbGVSZXNpemUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RvbUVsZW1lbnQgPT09IGRvY3VtZW50KSB7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSAwO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgPSAwO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGJveCA9IHRoaXMuX2RvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0Ly8gYWRqdXN0bWVudHMgY29tZSBmcm9tIHNpbWlsYXIgY29kZSBpbiB0aGUganF1ZXJ5IG9mZnNldCgpIGZ1bmN0aW9uXG5cdFx0XHRcdFx0dmFyIGQgPSB0aGlzLl9kb21FbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5sZWZ0ID0gYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkLmNsaWVudExlZnQ7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLnRvcCA9IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBkLmNsaWVudFRvcDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ud2lkdGggPSBib3gud2lkdGg7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmhlaWdodCA9IGJveC5oZWlnaHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblxuXHQvKiBtb3VzZSBldmVudCBtZXRob2QgY29yZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnbW91c2UtZXZlbnRzJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLk5PTkUpIHsgdGhpcy5fc3RhdGUgPSBldmVudC5idXR0b24gfVxuXG5cdFx0XHRcdHZhciBtb3VzZW1vdmUgPSAoZSkgPT4geyB0aGlzLm1vdXNlbW92ZShlKSB9O1xuXHRcdFx0XHR2YXIgbW91c2V1cCA9ICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblxuXHRcdFx0fSkuYWRkKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuXHRcdFx0fSkuYWRkKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cblx0XHRcdH0pLmFkZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIGdldE1vdXNlT25TY3JlZW5cblxuXHRcdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5nZXRNb3VzZU9uU2NyZWVuID0gZnVuY3Rpb24gZ2V0TW91c2VPblNjcmVlbihwYWdlWCwgcGFnZVkpIHtcblx0XHRcdFx0XHR2ZWN0b3Iuc2V0KFxuXHRcdFx0XHRcdFx0XHQocGFnZVggLSB0aGlzLl9zY3JlZW4ubGVmdCkgLyB0aGlzLl9zY3JlZW4ud2lkdGgsXG5cdFx0XHRcdFx0XHRcdChwYWdlWSAtIHRoaXMuX3NjcmVlbi50b3ApIC8gdGhpcy5fc2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuIHZlY3Rvcjtcblx0XHRcdFx0fTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbFxuXHRcdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwgPSBmdW5jdGlvbiBnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0XHRtb3VzZU9uQmFsbC5zZXQoXG5cdFx0XHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvICh0aGlzLl9zY3JlZW4ud2lkdGggKiAwLjUpLFxuXHRcdFx0XHRcdFx0XHQodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSArIHRoaXMuX3NjcmVlbi50b3AgLSBwYWdlWSkgLyAodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSksXG5cdFx0XHRcdFx0XHRcdDAuMFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHR2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG5cblx0XHRcdFx0XHRpZiAobGVuZ3RoID4gMS4wKSB7XG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC5ub3JtYWxpemUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwueiA9IE1hdGguc3FydCgxLjAgLSBsZW5ndGggKiBsZW5ndGgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX2V5ZS5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pLnN1Yih0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0XHR2ZWN0b3IuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueSk7XG5cdFx0XHRcdFx0dmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLmNyb3NzKHRoaXMuX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcblx0XHRcdFx0XHR2ZWN0b3IuYWRkKHRoaXMuX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZlY3RvcjtcblxuXHRcdFx0XHR9O1xuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4geyB0aGlzLm1vdXNlZG93bihlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHsgdGhpcy50b3VjaHN0YXJ0KGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7IHRoaXMudG91Y2htb3ZlKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHsgdGhpcy50b3VjaGVuZChlKSB9KTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiByb3RhdGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgncm90YXRlJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnLCAnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5fcm90YXRlU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHJvdGF0aW5nICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIHJvdGF0ZUNhbWVyYVxuXHRcdFx0XHR2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0XHRcdFx0dGhpcy5yb3RhdGVDYW1lcmEgPSBmdW5jdGlvbiByb3RhdGVDYW1lcmEoKSB7XG5cblx0XHRcdFx0XHR2YXIgYW5nbGUgPSBNYXRoLmFjb3MoXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmRvdCh0aGlzLl9yb3RhdGVFbmQpIC9cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQubGVuZ3RoKCkgL1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQubGVuZ3RoKClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChhbmdsZSkge1xuXHRcdFx0XHRcdFx0YXhpcy5jcm9zc1ZlY3RvcnModGhpcy5fcm90YXRlU3RhcnQsIHRoaXMuX3JvdGF0ZUVuZCkubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0XHRcdGFuZ2xlICo9IHRoaXMucm90YXRlU3BlZWQ7XG5cblx0XHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9leWUuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH07XG5cdFx0XHR9KVxuXHRcdC8qIHJvdGF0aW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHpvb20gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCd6b29tJywge1xuXHRcdGFmdGVyOiBbJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuWk9PTSkge1xuXHRcdFx0XHRcdHRoaXMuX3pvb21TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5fem9vbVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlpPT00pIHtcblx0XHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgnbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0dmFyIGRpZmYgPSAwO1xuXHRcdFx0XHRpZiAoZXZlbnQud2hlZWxEZWx0YSkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblx0XHRcdFx0XHRkaWZmID0gZXZlbnQud2hlZWxEZWx0YSAvIDQwO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LmRldGFpbCkgeyAvLyBGaXJlZm94XG5cdFx0XHRcdFx0ZGlmZiA9IC1ldmVudC5kZXRhaWwgLyAzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LnkgKz0gZGlmZiAqIDAuMDE7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCAoZSkgPT4geyB0aGlzLm1vdXNld2hlZWwoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCAoZSkgPT4geyB0aGlzLm1vdXNld2hlZWwoZSkgfSk7IC8vIGZpcmVmb3hcblxuXHRcdFx0fSlcblx0XHQvKiB6b29taW5nICovXG5cdFx0XHQuYWRkKCd6b29tQ2FtZXJhJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdFx0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggdGhpcy5fem9vbUVuZC55IC0gdGhpcy5fem9vbVN0YXJ0LnkgKSAqIHRoaXMuem9vbVNwZWVkO1xuXHRcdFx0XHRcdGlmIChmYWN0b3IgIT09IDEuMCAmJiBmYWN0b3IgPiAwLjApIHtcblx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXHRcdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5fem9vbUVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0Lyogem9vbWluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy56b29tU3BlZWQgPSAxLjI7XG5cblx0XHRcdH0pO1xuXG5cblx0LyogcGFuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3BhbicsIHtcblx0XHRhZnRlcjogWydjb3JlJywgJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0LyogcGFubmluZyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBwYW5DYW1lcmFcblx0XHRcdFx0dmFyIG1vdXNlQ2hhbmdlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMucGFuQ2FtZXJhID0gZnVuY3Rpb24gcGFuQ2FtZXJhKCkge1xuXG5cdFx0XHRcdFx0bW91c2VDaGFuZ2UuY29weSh0aGlzLl9wYW5FbmQpLnN1Yih0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdFx0aWYgKG1vdXNlQ2hhbmdlLmxlbmd0aFNxKCkpIHtcblx0XHRcdFx0XHRcdG1vdXNlQ2hhbmdlLm11bHRpcGx5U2NhbGFyKHRoaXMuX2V5ZS5sZW5ndGgoKSAqIHRoaXMucGFuU3BlZWQpO1xuXHRcdFx0XHRcdFx0cGFuLmNvcHkodGhpcy5fZXllKS5jcm9zcyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueCk7XG5cdFx0XHRcdFx0XHRwYW4uYWRkKG9iamVjdFVwLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLnkpKTtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uYWRkKHBhbik7XG5cdFx0XHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcy5hZGQocGFuKTtcblx0XHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5fcGFuRW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fTtcblx0XHRcdH0pXG5cdFx0LyogcGFubmluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5wYW5TcGVlZCA9IDAuMztcblxuXHRcdFx0fSk7XG5cblxuXHQvKiB6b29tICsgcGFuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnem9vbStwYW4nLCB7XG5cdFx0YWZ0ZXI6IFsnem9vbScsICdwYW4nXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5UT1VDSF9aT09NX1BBTjtcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMDtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuX3BhbkVuZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblxuXHQvKiBsaXR0bGUgaGFjayBmb3IgYXBpbmF0b215LXNwZWNpZmljIGZ1bmN0aW9uYWxpdHkgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnYXBpbmF0b215LXNwZWNpZmljJywge1xuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ3NldENhbWVyYURpc3RhbmNlJywgZnVuY3Rpb24gc2V0Q2FtZXJhRGlzdGFuY2UoZGlzdGFuY2UpIHtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiB0aGUgVHJhY2tiYWxsQ29udHJvbHMgY2xhc3MgKHZhcmlhdGlvbiBwb2ludCkgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzID0gZG0udnAoJ1RyYWNrYmFsbENvbnRyb2xzJyxcblx0XHRcdFUubmV3Q2xhc3MoZnVuY3Rpb24gVHJhY2tiYWxsQ29udHJvbHMoY29udHJvbGxlZE9iamVjdCwgZG9tRWxlbWVudCA9IGRvY3VtZW50KSB7XG5cblx0XHRcdFx0LyogYXBwbHkgdGhlIGNvbnN0cnVjdCBtZXRob2QgcG9wdWxhdGVkIGJ5IGRlbHRhcyAqL1xuXHRcdFx0XHR0aGlzLmNvbnN0cnVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdC8qIGV4cGxpY2l0bHkgdXBkYXRlIGluIHRoZSBiZWdpbm5pbmcgKi9cblx0XHRcdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblxuXHRcdFx0fSwgT2JqZWN0LmNyZWF0ZShUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlKSlcblx0KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGhyZWUtZC1jYW52YXM+ZGl2PmRpdntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MDtwb2ludGVyLWV2ZW50czpub25lO30udGhyZWUtZC1jYW52YXM+ZGl2PmRpdj4uY2lyY3VpdGJvYXJke3BvaW50ZXItZXZlbnRzOnZpc2libGU7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt9LnRocmVlLWQtY2FudmFzPmRpdj5jYW52YXN7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjE7cG9pbnRlci1ldmVudHM6bm9uZTt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC5qcyJ9