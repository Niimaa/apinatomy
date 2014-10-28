(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js")) : factory(root["jQuery"], root["THREE"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U) {
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
	  }).modify('Circuitboard.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    if (!browserSupport()) {
	      console.warn("This browser doesn't seem to have WebGL support.");
	      return;
	    }
	    U.observable(this, {name: 'threeDCanvasElement'});
	    this.on('threeDCanvasElement', (function(newCanvas, oldCanvas) {
	      if (oldCanvas) {
	        oldCanvas.removeClass('three-d-canvas');
	      }
	      if (newCanvas) {
	        newCanvas.addClass('three-d-canvas');
	      }
	    }));
	    U.observable(this, {
	      name: 'threeDMode',
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
	    U.observable(this, {name: 'threeDControlsEnabled'});
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
	  plugin.add('_p_threeD_initialize', function() {
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
	      panSpeed: 0.8,
	      noZoom: false,
	      noPan: false,
	      staticMoving: true,
	      dynamicDampingFactor: 0.3,
	      keys: [65, 83, 68]
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
	  plugin.add('translatePositionFromCanvasToCircuitboard', function(positionOnCanvas) {
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
	          func.apply(context, args);
	        }
	      };
	    },
	    observable: function(obj, $__4) {
	      var $__5 = $__4,
	          name = $__5.name,
	          initial = $__5.initial,
	          validation = $__5.validation;
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
	        if (onChange && !isEqual(cache, oldValue)) {
	          onChange(cache, oldValue);
	        }
	      }
	      setTimeout(setValue, 0);
	      var oncePerStackSetValue = U.oncePerStack(setValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange;
	      resultFn.onChange = (function(cb) {
	        onChange = cb;
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
	    return a && b && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Position.equals = (function(a, b) {
	    return a && b && a.height === b.height && a.width === b.width;
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
	    domElement.style.WebkitTransformStyle = 'preserve-3d';
	    domElement.style.MozTransformStyle = 'preserve-3d';
	    domElement.style.oTransformStyle = 'preserve-3d';
	    domElement.style.transformStyle = 'preserve-3d';
	    this.domElement = domElement;
	    var cameraElement = document.createElement('div');
	    cameraElement.style.WebkitTransformStyle = 'preserve-3d';
	    cameraElement.style.MozTransformStyle = 'preserve-3d';
	    cameraElement.style.oTransformStyle = 'preserve-3d';
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
	          element.style.WebkitTransform = style;
	          element.style.MozTransform = style;
	          element.style.oTransform = style;
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
	        domElement.style.WebkitPerspective = fov + "px";
	        domElement.style.MozPerspective = fov + "px";
	        domElement.style.oPerspective = fov + "px";
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
	        cameraElement.style.WebkitTransform = style;
	        cameraElement.style.MozTransform = style;
	        cameraElement.style.oTransform = style;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(THREE) {
	  'use strict';
	  THREE.TrackballControls = function(object, domElement) {
	    var _this = this;
	    var STATE = {
	      NONE: -1,
	      ROTATE: 0,
	      ZOOM: 1,
	      PAN: 2,
	      TOUCH_ROTATE: 3,
	      TOUCH_ZOOM_PAN: 4
	    };
	    this.object = object;
	    this.domElement = (domElement !== undefined) ? domElement : document;
	    this.enabled = true;
	    this.screen = {
	      left: 0,
	      top: 0,
	      width: 0,
	      height: 0
	    };
	    this.rotateSpeed = 1.0;
	    this.zoomSpeed = 1.2;
	    this.panSpeed = 0.3;
	    this.noRotate = false;
	    this.noZoom = false;
	    this.noPan = false;
	    this.noRoll = false;
	    this.staticMoving = false;
	    this.dynamicDampingFactor = 0.2;
	    this.minDistance = 0;
	    this.maxDistance = Infinity;
	    this.keys = [65, 83, 68];
	    this.target = new THREE.Vector3();
	    var EPS = 0.000001;
	    var lastPosition = new THREE.Vector3();
	    var _state = STATE.NONE,
	        _prevState = STATE.NONE,
	        _eye = new THREE.Vector3(),
	        _rotateStart = new THREE.Vector3(),
	        _rotateEnd = new THREE.Vector3(),
	        _zoomStart = new THREE.Vector2(),
	        _zoomEnd = new THREE.Vector2(),
	        _touchZoomDistanceStart = 0,
	        _touchZoomDistanceEnd = 0,
	        _panStart = new THREE.Vector2(),
	        _panEnd = new THREE.Vector2();
	    this.target0 = this.target.clone();
	    this.position0 = this.object.position.clone();
	    this.up0 = this.object.up.clone();
	    var changeEvent = {type: 'change'};
	    var startEvent = {type: 'start'};
	    var endEvent = {type: 'end'};
	    this.handleResize = function() {
	      if (this.domElement === document) {
	        this.screen.left = 0;
	        this.screen.top = 0;
	        this.screen.width = window.innerWidth;
	        this.screen.height = window.innerHeight;
	      } else {
	        var box = this.domElement.getBoundingClientRect();
	        var d = this.domElement.ownerDocument.documentElement;
	        this.screen.left = box.left + window.pageXOffset - d.clientLeft;
	        this.screen.top = box.top + window.pageYOffset - d.clientTop;
	        this.screen.width = box.width;
	        this.screen.height = box.height;
	      }
	    };
	    this.handleEvent = function(event) {
	      if (typeof this[event.type] == 'function') {
	        this[event.type](event);
	      }
	    };
	    var getMouseOnScreen = (function() {
	      var vector = new THREE.Vector2();
	      return function(pageX, pageY) {
	        vector.set((pageX - _this.screen.left) / _this.screen.width, (pageY - _this.screen.top) / _this.screen.height);
	        return vector;
	      };
	    }());
	    var getMouseProjectionOnBall = (function() {
	      var vector = new THREE.Vector3();
	      var objectUp = new THREE.Vector3();
	      var mouseOnBall = new THREE.Vector3();
	      return function(pageX, pageY) {
	        mouseOnBall.set((pageX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * .5), (_this.screen.height * 0.5 + _this.screen.top - pageY) / (_this.screen.height * .5), 0.0);
	        var length = mouseOnBall.length();
	        if (_this.noRoll) {
	          if (length < Math.SQRT1_2) {
	            mouseOnBall.z = Math.sqrt(1.0 - length * length);
	          } else {
	            mouseOnBall.z = .5 / length;
	          }
	        } else if (length > 1.0) {
	          mouseOnBall.normalize();
	        } else {
	          mouseOnBall.z = Math.sqrt(1.0 - length * length);
	        }
	        _eye.copy(_this.object.position).sub(_this.target);
	        vector.copy(_this.object.up).setLength(mouseOnBall.y);
	        vector.add(objectUp.copy(_this.object.up).cross(_eye).setLength(mouseOnBall.x));
	        vector.add(_eye.setLength(mouseOnBall.z));
	        return vector;
	      };
	    }());
	    this.rotateCamera = (function() {
	      var axis = new THREE.Vector3(),
	          quaternion = new THREE.Quaternion();
	      return function() {
	        var angle = Math.acos(_rotateStart.dot(_rotateEnd) / _rotateStart.length() / _rotateEnd.length());
	        if (angle) {
	          axis.crossVectors(_rotateStart, _rotateEnd).normalize();
	          angle *= _this.rotateSpeed;
	          quaternion.setFromAxisAngle(axis, -angle);
	          _eye.applyQuaternion(quaternion);
	          _this.object.up.applyQuaternion(quaternion);
	          _rotateEnd.applyQuaternion(quaternion);
	          if (_this.staticMoving) {
	            _rotateStart.copy(_rotateEnd);
	          } else {
	            quaternion.setFromAxisAngle(axis, angle * (_this.dynamicDampingFactor - 1.0));
	            _rotateStart.applyQuaternion(quaternion);
	          }
	        }
	      };
	    }());
	    this.zoomCamera = function() {
	      if (_state === STATE.TOUCH_ZOOM_PAN) {
	        var factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
	        _touchZoomDistanceStart = _touchZoomDistanceEnd;
	        _eye.multiplyScalar(factor);
	      } else {
	        var factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;
	        if (factor !== 1.0 && factor > 0.0) {
	          _eye.multiplyScalar(factor);
	          if (_this.staticMoving) {
	            _zoomStart.copy(_zoomEnd);
	          } else {
	            _zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
	          }
	        }
	      }
	    };
	    this.panCamera = (function() {
	      var mouseChange = new THREE.Vector2(),
	          objectUp = new THREE.Vector3(),
	          pan = new THREE.Vector3();
	      return function() {
	        mouseChange.copy(_panEnd).sub(_panStart);
	        if (mouseChange.lengthSq()) {
	          mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);
	          pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
	          pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));
	          _this.object.position.add(pan);
	          _this.target.add(pan);
	          if (_this.staticMoving) {
	            _panStart.copy(_panEnd);
	          } else {
	            _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
	          }
	        }
	      };
	    }());
	    this.setCameraDistance = function(distance) {
	      _this.object.position.normalize().multiplyScalar(distance);
	    };
	    this.checkDistances = function() {
	      if (!_this.noZoom || !_this.noPan) {
	        if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {
	          _this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
	        }
	        if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {
	          _this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
	        }
	      }
	    };
	    this.update = function() {
	      _eye.subVectors(_this.object.position, _this.target);
	      if (!_this.noRotate) {
	        _this.rotateCamera();
	      }
	      if (!_this.noZoom) {
	        _this.zoomCamera();
	      }
	      if (!_this.noPan) {
	        _this.panCamera();
	      }
	      _this.object.position.addVectors(_this.target, _eye);
	      _this.checkDistances();
	      _this.object.lookAt(_this.target);
	      if (lastPosition.distanceToSquared(_this.object.position) > EPS) {
	        _this.dispatchEvent(changeEvent);
	        lastPosition.copy(_this.object.position);
	      }
	    };
	    this.reset = function() {
	      _state = STATE.NONE;
	      _prevState = STATE.NONE;
	      _this.target.copy(_this.target0);
	      _this.object.position.copy(_this.position0);
	      _this.object.up.copy(_this.up0);
	      _eye.subVectors(_this.object.position, _this.target);
	      _this.object.lookAt(_this.target);
	      _this.dispatchEvent(changeEvent);
	      lastPosition.copy(_this.object.position);
	    };
	    var _amy_velocity = new THREE.Vector3();
	    var KEYBOARD_VELOCITY = 5;
	    function keydown(event) {
	      switch (event.keyCode) {
	        case 38:
	        case 87:
	          _amy_velocity.y = KEYBOARD_VELOCITY;
	          break;
	        case 37:
	        case 65:
	          _amy_velocity.x = -KEYBOARD_VELOCITY;
	          break;
	        case 40:
	        case 83:
	          _amy_velocity.y = -KEYBOARD_VELOCITY;
	          break;
	        case 39:
	        case 68:
	          _amy_velocity.x = KEYBOARD_VELOCITY;
	          break;
	      }
	    }
	    function keyup(event) {
	      switch (event.keyCode) {
	        case 38:
	        case 87:
	          _amy_velocity.y = 0;
	          break;
	        case 37:
	        case 65:
	          _amy_velocity.x = 0;
	          break;
	        case 40:
	        case 83:
	          _amy_velocity.y = 0;
	          break;
	        case 39:
	        case 68:
	          _amy_velocity.x = 0;
	          break;
	      }
	    }
	    function mousedown(event) {
	      if (_this.enabled === false)
	        return;
	      if (_state === STATE.NONE) {
	        _state = event.button;
	      }
	      if (_state === STATE.ROTATE && !_this.noRotate) {
	        _rotateStart.copy(getMouseProjectionOnBall(event.pageX, event.pageY));
	        _rotateEnd.copy(_rotateStart);
	      } else if (_state === STATE.ZOOM && !_this.noZoom) {
	        _zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
	        _zoomEnd.copy(_zoomStart);
	      } else if (_state === STATE.PAN && !_this.noPan) {
	        _panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
	        _panEnd.copy(_panStart);
	      }
	      document.addEventListener('mousemove', mousemove, false);
	      document.addEventListener('mouseup', mouseup, false);
	      _this.dispatchEvent(startEvent);
	    }
	    function mousemove(event) {
	      if (_this.enabled === false)
	        return;
	      if (_state === STATE.ROTATE && !_this.noRotate) {
	        _rotateEnd.copy(getMouseProjectionOnBall(event.pageX, event.pageY));
	      } else if (_state === STATE.ZOOM && !_this.noZoom) {
	        _zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
	      } else if (_state === STATE.PAN && !_this.noPan) {
	        _panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
	      }
	    }
	    function mouseup(event) {
	      if (_this.enabled === false)
	        return;
	      _state = STATE.NONE;
	      document.removeEventListener('mousemove', mousemove);
	      document.removeEventListener('mouseup', mouseup);
	      _this.dispatchEvent(endEvent);
	    }
	    function mousewheel(event) {
	      if (_this.enabled === false)
	        return;
	      event.preventDefault();
	      event.stopPropagation();
	      var delta = 0;
	      if (event.wheelDelta) {
	        delta = event.wheelDelta / 40;
	      } else if (event.detail) {
	        delta = -event.detail / 3;
	      }
	      _zoomStart.y += delta * 0.01;
	      _this.dispatchEvent(startEvent);
	      _this.dispatchEvent(endEvent);
	    }
	    function touchstart(event) {
	      if (_this.enabled === false) {
	        return;
	      }
	      switch (event.touches.length) {
	        case 1:
	          _state = STATE.TOUCH_ROTATE;
	          _rotateStart.copy(getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
	          _rotateEnd.copy(_rotateStart);
	          break;
	        case 2:
	          _state = STATE.TOUCH_ZOOM_PAN;
	          var dx = event.touches[0].pageX - event.touches[1].pageX;
	          var dy = event.touches[0].pageY - event.touches[1].pageY;
	          _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
	          var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	          var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	          _panStart.copy(getMouseOnScreen(x, y));
	          _panEnd.copy(_panStart);
	          break;
	        default:
	          _state = STATE.NONE;
	      }
	      _this.dispatchEvent(startEvent);
	    }
	    function touchmove(event) {
	      if (_this.enabled === false)
	        return;
	      switch (event.touches.length) {
	        case 1:
	          _rotateEnd.copy(getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
	          break;
	        case 2:
	          var dx = event.touches[0].pageX - event.touches[1].pageX;
	          var dy = event.touches[0].pageY - event.touches[1].pageY;
	          _touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
	          var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	          var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	          _panEnd.copy(getMouseOnScreen(x, y));
	          break;
	        default:
	          _state = STATE.NONE;
	      }
	    }
	    function touchend(event) {
	      if (_this.enabled === false)
	        return;
	      switch (event.touches.length) {
	        case 1:
	          _rotateEnd.copy(getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
	          _rotateStart.copy(_rotateEnd);
	          break;
	        case 2:
	          _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
	          var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
	          var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
	          _panEnd.copy(getMouseOnScreen(x, y));
	          _panStart.copy(_panEnd);
	          break;
	      }
	      _state = STATE.NONE;
	      _this.dispatchEvent(endEvent);
	    }
	    this.domElement.addEventListener('contextmenu', function(event) {
	      event.preventDefault();
	    }, false);
	    this.domElement.addEventListener('mousedown', mousedown, false);
	    this.domElement.addEventListener('mousewheel', mousewheel, false);
	    this.domElement.addEventListener('DOMMouseScroll', mousewheel, false);
	    this.domElement.addEventListener('touchstart', touchstart, false);
	    this.domElement.addEventListener('touchend', touchend, false);
	    this.domElement.addEventListener('touchmove', touchmove, false);
	    window.addEventListener('keydown', keydown, false);
	    window.addEventListener('keyup', keyup, false);
	    this.handleResize();
	    this.update();
	  };
	  THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

/***/ },
/* 8 */
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
/* 9 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzOWRiZjU5MzA0YmJlNGE4ZjRiZiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7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Q0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTJEO0FBQzNELE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzlkYmY1OTMwNGJiZTRhOGY0YmZcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzJyxcblx0Jy4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qcycsXG5cdCcuL3AtdGhyZWUtZC5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8vIHRlc3QgZm9yIGJyb3dzZXIgM0Qgc3VwcG9ydFxuXHRmdW5jdGlvbiBicm93c2VyU3VwcG9ydCgpIHtcblx0XHR2YXIgY2FudmFzO1xuXHRcdHRyeSB7XG5cdFx0XHRjYW52YXMgPSAkKCc8Y2FudmFzPicpO1xuXHRcdFx0cmV0dXJuICEhKGNhbnZhc1swXS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhc1swXS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSk7XG5cdFx0fSBjYXRjaCAoX18pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y2FudmFzID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cblx0Ly8gc29tZSB1c2VmdWwgY29uc3RhbnRzIGZvciBtYWtpbmcgaW50ZXJzZWN0aW9uIGNoZWNrc1xuXHR2YXIgUExBTkUgPSBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIDApO1xuXHR2YXIgUFJPSkVDVE9SID0gbmV3IFRIUkVFLlByb2plY3RvcigpO1xuXG5cblx0Ly8gdGhlIHBsdWdpblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZCcsXG5cdFx0cmVxdWlyZXM6IFsncG9zaXRpb24tdHJhY2tpbmcnXVxuXHR9KS5tb2RpZnkoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUnKTtcblxuXG5cdC8vIHRoZSBjb25zdHJ1Y3RvciBpcyBydW4gb25jZSB0byBpbml0aWFsaXplIHBvdGVudGlhbCAzRC1uZXNzXG5cdHBsdWdpbi5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXG5cdFx0Ly8gdGVzdCBmb3IgYnJvd3NlciBzdXBwb3J0XG5cdFx0aWYgKCFicm93c2VyU3VwcG9ydCgpKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzZWVtIHRvIGhhdmUgV2ViR0wgc3VwcG9ydC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cblx0XHQvLyB0aGUgJ3RocmVlRENhbnZhc0VsZW1lbnQnIHByb3BlcnR5XG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsIHsgbmFtZTogJ3RocmVlRENhbnZhc0VsZW1lbnQnIH0pO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc0VsZW1lbnQnLCAobmV3Q2FudmFzLCBvbGRDYW52YXMpID0+IHtcblx0XHRcdGlmIChvbGRDYW52YXMpIHsgb2xkQ2FudmFzLnJlbW92ZUNsYXNzKCd0aHJlZS1kLWNhbnZhcycpIH1cblx0XHRcdGlmIChuZXdDYW52YXMpIHsgbmV3Q2FudmFzLmFkZENsYXNzKCd0aHJlZS1kLWNhbnZhcycpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gdGhlICd0aHJlZURNb2RlJyBwcm9wZXJ0eVxuXHRcdFUub2JzZXJ2YWJsZSh0aGlzLCB7XG5cdFx0XHRuYW1lOiAndGhyZWVETW9kZScsXG5cdFx0XHRpbml0aWFsOiBmYWxzZSxcblx0XHRcdHZhbGlkYXRpb246ICh2YWwpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXZhbCB8fCB0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudCxcblx0XHRcdFx0XHRcdGBZb3UgY2Fubm90IHR1cm4gb24gM0QgbW9kZSAgd2hlbiBubyAndGhyZWVEQ2FudmFzRWxlbWVudCcgaGFzIGJlZW4gc2V0LmApO1xuXHRcdFx0XHRyZXR1cm4gISF2YWw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vIHRoZSAndGhyZWVEQ2FudmFzU2l6ZScgcHJvcGVydHlcblx0XHR2YXIgX2NhbnZhc1NpemUgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCAmJiBuZXcgVS5TaXplKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSxcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKVxuXHRcdFx0KSksXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0aHJlZURDYW52YXNTaXplJywgeyBnZXQoKSB7IHJldHVybiBfY2FudmFzU2l6ZSgpIH0gfSk7XG5cdFx0X2NhbnZhc1NpemUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50cmlnZ2VyKCd0aHJlZURDYW52YXNTaXplJywgbmV3U2l6ZSkgfSk7XG5cblxuXHRcdC8vIHJlYWN0IHRvIGNhbnZhcyByZXNpemVcblx0XHQoIHRoaXMub3B0aW9ucy5jYW52YXNSZXNpemVFdmVudCB8fCAkKHdpbmRvdykucmVzaXplLmJpbmQoJCh3aW5kb3cpKSApKF9jYW52YXNTaXplKTtcblxuXG5cdFx0Ly8gdGhlICd0aHJlZURDb250cm9sc0VuYWJsZWQnIHByb3BlcnR5XG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsIHsgbmFtZTogJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcgfSk7XG5cblxuXHRcdC8vIEluaXRpYWxpemUgd2hlbiAzRCBtb2RlIGlzIHR1cm5lZCBvblxuXHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCAobW9kZSkgPT4ge1xuXHRcdFx0aWYgKG1vZGUpIHsgdGhpcy5fcF90aHJlZURfaW5pdGlhbGl6ZSgpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gV2FzIGEgY2FudmFzIGdpdmVuIHRocm91Z2ggdGhlIG9wdGlvbnM/XG5cdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50ID0gdGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQ7XG5cdFx0aWYgKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCkge1xuXHRcdFx0dGhpcy50aHJlZURNb2RlID0gdHJ1ZTtcblx0XHR9XG5cblxuXHR9KTtcblxuXHQvLyBgX3BfdGhyZWVEX2luaXRpYWxpemVgIGlzIHJ1biBldmVyeSB0aW1lIDNELW5lc3MgaXMgdHVybmVkIG9uXG5cdHBsdWdpbi5hZGQoJ19wX3RocmVlRF9pbml0aWFsaXplJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gYW4gZWFzeSB3YXkgdG8gYWN0IG9uIDNEIG1vZGUgYmVpbmcgdHVybmVkIG9mZlxuXHRcdHZhciBvblRocmVlRE1vZGVPZmYgPSAoY2IpID0+IHtcblx0XHRcdHZhciBhdXhDYiA9IChtb2RlKSA9PiB7XG5cdFx0XHRcdGlmICghbW9kZSkge1xuXHRcdFx0XHRcdHRoaXMub2ZmKCd0aHJlZURNb2RlJywgYXV4Q2IpO1xuXHRcdFx0XHRcdGNiKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR0aGlzLm9uKCd0aHJlZURNb2RlJywgYXV4Q2IpO1xuXHRcdH07XG5cblxuXHRcdC8vIFJlbWVtYmVyIHRoZSBpbml0aWFsIG1hcmdpblxuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4gPSB7fTtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCkubGVmdCAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS5sZWZ0O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wID0gdGhpcy5lbGVtZW50Lm9mZnNldCgpLnRvcCAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS50b3A7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCA9IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAtIHRoaXMuc2l6ZS53aWR0aCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbSA9IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLSB0aGlzLnNpemUuaGVpZ2h0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3A7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBTY2VuZVxuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0dGhpcy5vbmUoJ3RocmVlRE1vZGUnLCAobW9kZSkgPT4ge1xuXHRcdFx0aWYgKCFtb2RlKSB7IGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9zY2VuZSB9XG5cdFx0fSk7XG5cblxuXHRcdC8vIENhbWVyYVxuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYSA9XG5cdFx0XHRcdG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC8gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCwgMSwgMTAwMDApO1xuXHRcdHZhciBzZXRDYW1lcmFBc3BlY3QgPSAoc2l6ZSkgPT4geyB0aGlzLl9wX3RocmVlRF9jYW1lcmEuYXNwZWN0ID0gc2l6ZS53aWR0aCAvIHNpemUuaGVpZ2h0IH07XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIHNldENhbWVyYUFzcGVjdCk7XG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uLnogPSAxO1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIHNldENhbWVyYUFzcGVjdCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY2FtZXJhO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBMaWdodGluZ1xuXHRcdHZhciBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MTAxMDMwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MSA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0MS5wb3NpdGlvbi5zZXQoMSwgLTEsIDEpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MSk7XG5cdFx0Ly9cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodDIgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24uc2V0KC0xLCAxLCAtMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQyKTtcblx0XHQvL1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHRhbWJpZW50TGlnaHQgPSB1bmRlZmluZWQ7XG5cdFx0XHRkaXJlY3Rpb25hbExpZ2h0MSA9IHVuZGVmaW5lZDtcblx0XHRcdGRpcmVjdGlvbmFsTGlnaHQyID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBSZW5kZXJlcjogV2ViR0xcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbCA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYWxwaGE6IHRydWUsIGFudGlhbGlhczogdHJ1ZSB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5zb3J0T2JqZWN0cyA9IGZhbHNlO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNldFNpemUodGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKCksIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSk7XG5cdFx0dmFyIHJlbmRlcldlYkdMID0gKCkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSkgfTtcblx0XHR2YXIgc2V0V2ViR0xDYW52YXNTaXplID0gKHNpemUpID0+IHsgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCkgfTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCByZW5kZXJXZWJHTCk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkdMQ2FudmFzU2l6ZSk7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdHRoaXMub2ZmKCczZC1yZW5kZXInLCByZW5kZXJXZWJHTCk7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkdMQ2FudmFzU2l6ZSk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2w7XG5cdFx0fSk7XG5cblxuXHRcdC8vIFJlbmRlcmVyOiBDU1Ncblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MgPSBuZXcgVEhSRUUuQ1NTM0RSZW5kZXJlcigpO1xuXHRcdCQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpLmFwcGVuZCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5kb21FbGVtZW50KTtcblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5kb21FbGVtZW50KTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3Muc2V0U2l6ZSh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpKTtcblx0XHR2YXIgcmVuZGVyQ1NTID0gKCkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLl9wX3RocmVlRF9jYW1lcmEpIH07XG5cdFx0dmFyIHNldFdlYkNTU1NpemUgPSAoc2l6ZSkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3Muc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCkgfTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCByZW5kZXJDU1MpO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCBzZXRXZWJDU1NTaXplKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJzNkLXJlbmRlcicsIHJlbmRlckNTUyk7XG5cdFx0XHR0aGlzLm9mZigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkNTU1NpemUpO1xuXHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmVtcHR5KCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBSZW5kZXIgb24gc2l6ZS1jaGFuZ2UgYW5kIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdHZhciB0cmlnZ2VyM0RSZW5kZXIgPSAoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfTtcblx0XHR0aGlzLm9uKCdzaXplJywgdHJpZ2dlcjNEUmVuZGVyKTtcblx0XHR2YXIgc3RvcFRyaWdnZXJpbmczRFJlbmRlciA9IFUuZWFjaEFuaW1hdGlvbkZyYW1lKCgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJ3NpemUnLCB0cmlnZ2VyM0RSZW5kZXIpO1xuXHRcdFx0c3RvcFRyaWdnZXJpbmczRFJlbmRlcigpO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBDb250cm9sc1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzID0gbmV3IFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzKHRoaXMuX3BfdGhyZWVEX2NhbWVyYSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50WzBdKTtcblx0XHQkLmV4dGVuZCh0aGlzLl9wX3RocmVlRF9jb250cm9scywge1xuXHRcdFx0cm90YXRlU3BlZWQ6IDEuMCxcblx0XHRcdHpvb21TcGVlZDogMS4yLFxuXHRcdFx0cGFuU3BlZWQ6IDAuOCxcblx0XHRcdG5vWm9vbTogZmFsc2UsXG5cdFx0XHRub1BhbjogZmFsc2UsXG5cdFx0XHRzdGF0aWNNb3Zpbmc6IHRydWUsXG5cdFx0XHRkeW5hbWljRGFtcGluZ0ZhY3RvcjogMC4zLFxuXHRcdFx0a2V5czogWzY1LCA4MywgNjhdXG5cdFx0fSk7XG5cdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXHRcdHZhciBoYW5kbGVSZXNpemVGb3JDb250cm9scyA9ICgpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMuaGFuZGxlUmVzaXplKCkgfTtcblx0XHR2YXIgdXBkYXRlQ29udHJvbHMgPSAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnVwZGF0ZSgpIH07XG5cdFx0dmFyIHNldENvbnRyb2xzRW5hYmxlZCA9IChlbmFibGVkKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmVuYWJsZWQgPSBlbmFibGVkIH07XG5cdFx0dGhpcy5vbignc2l6ZScsIGhhbmRsZVJlc2l6ZUZvckNvbnRyb2xzKTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCB1cGRhdGVDb250cm9scyk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ29udHJvbHNFbmFibGVkJywgc2V0Q29udHJvbHNFbmFibGVkKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJ3NpemUnLCBoYW5kbGVSZXNpemVGb3JDb250cm9scyk7XG5cdFx0XHR0aGlzLm9mZignM2QtcmVuZGVyJywgdXBkYXRlQ29udHJvbHMpO1xuXHRcdFx0dGhpcy5vZmYoJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcsIHNldENvbnRyb2xzRW5hYmxlZCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY29udHJvbHM7XG5cdFx0fSk7XG5cblxuXHRcdC8vIEZsb2F0aW5nIFRpbGVtYXBcblx0XHR2YXIgaW5pdGlhbENpcmN1aXRib2FyZFBhcmVudCA9IHRoaXMuZWxlbWVudC5wYXJlbnQoKTtcblx0XHR2YXIgaW5pdGlhbENpcmN1aXRib2FyZFBvc2l0aW9uaW5nID0ge1xuXHRcdFx0bGVmdDogdGhpcy5lbGVtZW50LmNzcygnbGVmdCcpLFxuXHRcdFx0dG9wOiB0aGlzLmVsZW1lbnQuY3NzKCd0b3AnKSxcblx0XHRcdHJpZ2h0OiB0aGlzLmVsZW1lbnQuY3NzKCdyaWdodCcpLFxuXHRcdFx0Ym90dG9tOiB0aGlzLmVsZW1lbnQuY3NzKCdib3R0b20nKVxuXHRcdH07XG5cdFx0dGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KHRoaXMuZWxlbWVudFswXSk7XG5cdFx0dGhpcy5lbGVtZW50LmNzcyh7IGxlZnQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogMCB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0LmFwcGVuZFRvKGluaXRpYWxDaXJjdWl0Ym9hcmRQYXJlbnQpXG5cdFx0XHRcdFx0LmNzcyh7XG5cdFx0XHRcdFx0XHQnd2lkdGgnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQnaGVpZ2h0JzogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nOiAnJyxcblx0XHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybSc6ICcnXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY3NzKGluaXRpYWxDaXJjdWl0Ym9hcmRQb3NpdGlvbmluZyk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkO1xuXHRcdH0pO1xuXG5cblx0XHQvLyBUaWxlbWFwIEJhY2tmYWNlXG5cdFx0dmFyIGJhY2tmYWNlRWxlbWVudCA9ICQoJzxkaXY+JykuY3NzKHtcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0Ym9yZGVyOiAnc29saWQgMXB4IGJsYWNrJyxcblx0XHRcdGJhY2tmYWNlVmlzaWJpbGl0eTogJ2hpZGRlbidcblx0XHR9KTtcblx0XHR2YXIgYmFja2ZhY2UgPSBuZXcgVEhSRUUuQ1NTM0RPYmplY3QoYmFja2ZhY2VFbGVtZW50WzBdKTtcblx0XHRiYWNrZmFjZS5yb3RhdGlvbi5zZXQoTWF0aC5QSSwgMCwgMCk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGJhY2tmYWNlKTtcblxuXG5cdFx0Ly8gcmVzcG9uZCB0byByZXNpemVcblx0XHR2YXIgb25DYW52YXNSZXNpemUgPSAoKSA9PiB7XG5cdFx0XHQvLyBzaXppbmcgYW5kIHBvc2l0aW9uaW5nIG9mIHRoZSBjaXJjdWl0LWJvYXJkIGFuZCBiYWNrZmFjZVxuXHRcdFx0dmFyIHNpemUgPSB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0LFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5lbGVtZW50LmNzcyhzaXplKTtcblx0XHRcdGJhY2tmYWNlRWxlbWVudC5jc3Moc2l6ZSk7XG5cdFx0XHRiYWNrZmFjZS5wb3NpdGlvbi54ID0gdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkLnBvc2l0aW9uLnggPSAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCk7XG5cdFx0XHRiYWNrZmFjZS5wb3NpdGlvbi55ID0gdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkLnBvc2l0aW9uLnkgPSAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCk7XG5cblx0XHRcdC8vIHNldCB0aGUgY2FtZXJhIGRpc3RhbmNlIHRvIGNvcnJlc3BvbmRcblx0XHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnNldENhbWVyYURpc3RhbmNlKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgL1xuXHRcdFx0XHRcdCgyICogTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZCh0aGlzLl9wX3RocmVlRF9jYW1lcmEuZm92KSAvIDIpKVxuXHRcdFx0KTtcblx0XHR9O1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCBvbkNhbnZhc1Jlc2l6ZSk7XG5cdFx0b25DYW52YXNSZXNpemUoKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJ3RocmVlRENhbnZhc1NpemUnLCBvbkNhbnZhc1Jlc2l6ZSk7XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHQvLyBgdHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmRgIGhhcyBubyBzaWRlLWVmZmVjdHMgYW5kIGNhbiBiZSB1c2VkXG5cdC8vIGZyb20gdGhlIG91dHNpZGUgdG8gdHJhbnNsYXRlIGxlZnQvdG9wIGNvb3JkaW5hdGVzIG9uIHRoZSBzY3JlZW4gdG8gbGVmdC90b3Bcblx0Ly8gY29vcmRpbmF0ZXMgb2YgdGhlIHByaXZhdGUgY29vcmRpbmF0ZS1zeXN0ZW0gb2YgdGhlIGNpcmN1aXRib2FyZCwgaG93ZXZlciBpdCBpc1xuXHQvLyBvcmllbnRlZCBpbiAzRCBzcGFjZS5cblx0cGx1Z2luLmFkZCgndHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmQnLCBmdW5jdGlvbiAocG9zaXRpb25PbkNhbnZhcykge1xuXG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdHZhciBtb3VzZTNEID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRtb3VzZTNELnggPSBwb3NpdGlvbk9uQ2FudmFzLmxlZnQgLyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggKiAyIC0gMTtcblx0XHRtb3VzZTNELnkgPSAtcG9zaXRpb25PbkNhbnZhcy50b3AgLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0ICogMiArIDE7XG5cdFx0bW91c2UzRC56ID0gMC41O1xuXHRcdFBST0pFQ1RPUi51bnByb2plY3RWZWN0b3IobW91c2UzRCwgdGhpcy5fcF90aHJlZURfY2FtZXJhKTtcblx0XHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheSh0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24sIG1vdXNlM0Quc3ViKHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5wb3NpdGlvbikubm9ybWFsaXplKCkpO1xuXHRcdHZhciBpbnRlcnNlY3RzID0gcmF5LmludGVyc2VjdFBsYW5lKFBMQU5FKTtcblxuXHRcdC8vIGlmIHRoZSB0ZXN0ZWQgaW50ZXJzZWN0aW9uIGlzIG91dCBvZiByYW5nZSwgcmV0dXJuIHVuZGVmaW5lZFxuXHRcdGlmICghaW50ZXJzZWN0cykgeyByZXR1cm4gfVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGxlZnQ6IGludGVyc2VjdHMueCArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQsXG5cdFx0XHR0b3A6IC1pbnRlcnNlY3RzLnkgKyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC8gMiAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wXG5cdFx0fTtcblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC10aHJlZS1kLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcl0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gc3RvcEVhY2hBbmltYXRpb25GcmFtZSgpIHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gb3B0aW9ucy5uYW1lIChtYW5kYXRvcnkpIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly8gb3B0aW9ucy52YWxpZGF0aW9uIC0gaWYgc3BlY2lmaWVkLCB0aGlzIGZ1bmN0aW9uIGlzIHJ1biBiZWZvcmUgYSBuZXcgdmFsdWUgaXMgYWN0dWFsbHkgc2V0LlxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIEl0IGlzIHBhc3NlZCB0aGUgbmV3IHZhbHVlIGFuZCB0aGUgb2xkIHZhbHVlLCBhbmQgc2hvdWxkIHJldHVybiB0aGUgYWN0dWFsXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgdmFsdWUgdGhhdCBzaG91bGQgYmUgc2V0LiBUaGlzIGNvdWxkIGJlIHRoZSBuZXcgb3Igb2xkIHZhbHVlIGRpcmVjdGx5LFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIG9yIGFueSB0cmFuc2Zvcm1hdGlvbi4gSXQgY2FuIGFsc28gdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaCB3aWxsIGp1c3QgYmVcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBhbGxvd2VkIHRvIHBhc3MgdGhyb3VnaC4gUmV0dXJuaW5nIHRoZSBvbGQgdmFsdWUgcHJldmVudHMgYSBzaWduYWwgZnJvbVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGJlaW5nIHRyaWdnZXJlZC5cblx0XHRvYnNlcnZhYmxlKG9iaiwge25hbWUsIGluaXRpYWwsIHZhbGlkYXRpb259KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8vIEhUTUwgZWxlbWVudCBwb3NpdGlvblxuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIGEgJiYgYiAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvLyBIVE1MIGVsZW1lbnQgc2l6ZVxuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBhICYmIGIgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJkZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBodHRwOi8vd3d3LmVtYWdpeC5uZXQvYWNhZGVtaWMvbXNjcy1wcm9qZWN0L2l0ZW0vY2FtZXJhLXN5bmMtd2l0aC1jc3MzLWFuZC13ZWJnbC10aHJlZWpzXG5cdCAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG5cdCAqL1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0ID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuT2JqZWN0M0QuY2FsbCggdGhpcyApO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncmVtb3ZlZCcsIGZ1bmN0aW9uICggLypldmVudCovICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsICkge1xuXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlICk7XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5DU1MzRE9iamVjdC5jYWxsKCB0aGlzLCBlbGVtZW50ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgKTtcblxuXHQvL1xuXG5cdFRIUkVFLkNTUzNEUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLmxvZyggJ1RIUkVFLkNTUzNEUmVuZGVyZXInLCBUSFJFRS5SRVZJU0lPTiApO1xuXG5cdFx0dmFyIF93aWR0aCwgX2hlaWdodDtcblx0XHR2YXIgX3dpZHRoSGFsZiwgX2hlaWdodEhhbGY7XG5cblx0XHR2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdHZhciBjYWNoZSA9IHtcblx0XHRcdGNhbWVyYTogeyBmb3Y6IDAsIHN0eWxlOiAnJyB9LFxuXHRcdFx0b2JqZWN0czoge31cblx0XHR9O1xuXG5cdFx0dmFyIGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuXHRcdGRvbUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRkb21FbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cblx0XHR2YXIgY2FtZXJhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHRkb21FbGVtZW50LmFwcGVuZENoaWxkKCBjYW1lcmFFbGVtZW50ICk7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG5cdFx0XHRfd2lkdGggPSB3aWR0aDtcblx0XHRcdF9oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHRcdF93aWR0aEhhbGYgPSBfd2lkdGggLyAyO1xuXHRcdFx0X2hlaWdodEhhbGYgPSBfaGVpZ2h0IC8gMjtcblxuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdH07XG5cblx0XHR2YXIgZXBzaWxvbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLmFicyggdmFsdWUgKSA8IDAuMDAwMDAxID8gMCA6IHZhbHVlO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRDYW1lcmFDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ21hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldE9iamVjdENTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAndHJhbnNsYXRlM2QoLTUwJSwtNTAlLDApIG1hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIHJlbmRlck9iamVjdCA9IGZ1bmN0aW9uICggb2JqZWN0LCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RPYmplY3QgKSB7XG5cblx0XHRcdFx0dmFyIHN0eWxlO1xuXG5cdFx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RTcHJpdGUgKSB7XG5cblx0XHRcdFx0XHQvLyBodHRwOi8vc3dpZnRjb2Rlci53b3JkcHJlc3MuY29tLzIwMDgvMTEvMjUvY29uc3RydWN0aW5nLWEtYmlsbGJvYXJkLW1hdHJpeC9cblxuXHRcdFx0XHRcdG1hdHJpeC5jb3B5KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICk7XG5cdFx0XHRcdFx0bWF0cml4LnRyYW5zcG9zZSgpO1xuXHRcdFx0XHRcdG1hdHJpeC5jb3B5UG9zaXRpb24oIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXHRcdFx0XHRcdG1hdHJpeC5zY2FsZSggb2JqZWN0LnNjYWxlICk7XG5cblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDMgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyA3IF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTEgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxNSBdID0gMTtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBtYXRyaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGVsZW1lbnQgPSBvYmplY3QuZWxlbWVudDtcblx0XHRcdFx0dmFyIGNhY2hlZFN0eWxlID0gY2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF07XG5cblx0XHRcdFx0aWYgKCBjYWNoZWRTdHlsZSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlZFN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdFx0Y2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF0gPSBzdHlsZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBlbGVtZW50LnBhcmVudE5vZGUgIT09IGNhbWVyYUVsZW1lbnQgKSB7XG5cblx0XHRcdFx0XHRjYW1lcmFFbGVtZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgbCA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRcdHJlbmRlck9iamVjdCggb2JqZWN0LmNoaWxkcmVuWyBpIF0sIGNhbWVyYSApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbiAoIHNjZW5lLCBjYW1lcmEgKSB7XG5cblx0XHRcdHZhciBmb3YgPSAwLjUgLyBNYXRoLnRhbiggVEhSRUUuTWF0aC5kZWdUb1JhZCggY2FtZXJhLmZvdiAqIDAuNSApICkgKiBfaGVpZ2h0O1xuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5mb3YgIT09IGZvdiApIHtcblxuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLldlYmtpdFBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLk1velBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLm9QZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5wZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuZm92ID0gZm92O1xuXG5cdFx0XHR9XG5cblx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gdW5kZWZpbmVkICkgeyBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKSB9XG5cblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UuZ2V0SW52ZXJzZSggY2FtZXJhLm1hdHJpeFdvcmxkICk7XG5cblx0XHRcdHZhciBzdHlsZSA9IFwidHJhbnNsYXRlM2QoMCwwLFwiICsgZm92ICsgXCJweClcIiArIGdldENhbWVyYUNTU01hdHJpeCggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApICtcblx0XHRcdFx0XCIgdHJhbnNsYXRlM2QoXCIgKyBfd2lkdGhIYWxmICsgXCJweCxcIiArIF9oZWlnaHRIYWxmICsgXCJweCwgMClcIjtcblxuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5zdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLnN0eWxlID0gc3R5bGU7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyT2JqZWN0KCBzY2VuZSwgY2FtZXJhICk7XG5cblx0XHR9O1xuXG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzXG4gKiovIiwiZGVmaW5lKFsndGhyZWUtanMnXSwgZnVuY3Rpb24gKFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblx0LyoqXG5cdCAqIEBhdXRob3IgRWJlcmhhcmQgR3JhZXRoZXIgLyBodHRwOi8vZWdyYWV0aGVyLmNvbS9cblx0ICogQGF1dGhvciBNYXJrIEx1bmRpbiAgICAvIGh0dHA6Ly9tYXJrLWx1bmRpbi5jb21cblx0ICovXG5cblx0VEhSRUUuVHJhY2tiYWxsQ29udHJvbHMgPSBmdW5jdGlvbiAob2JqZWN0LCBkb21FbGVtZW50KSB7XG5cblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHZhciBTVEFURSA9IHsgTk9ORTogLTEsIFJPVEFURTogMCwgWk9PTTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX1pPT01fUEFOOiA0IH07XG5cblx0XHR0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0XHR0aGlzLmRvbUVsZW1lbnQgPSAoIGRvbUVsZW1lbnQgIT09IHVuZGVmaW5lZCApID8gZG9tRWxlbWVudCA6IGRvY3VtZW50O1xuXG5cdFx0Ly8gQVBJXG5cblx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0dGhpcy5zY3JlZW4gPSB7IGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuXG5cdFx0dGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblx0XHR0aGlzLnpvb21TcGVlZCA9IDEuMjtcblx0XHR0aGlzLnBhblNwZWVkID0gMC4zO1xuXG5cdFx0dGhpcy5ub1JvdGF0ZSA9IGZhbHNlO1xuXHRcdHRoaXMubm9ab29tID0gZmFsc2U7XG5cdFx0dGhpcy5ub1BhbiA9IGZhbHNlO1xuXHRcdHRoaXMubm9Sb2xsID0gZmFsc2U7XG5cblx0XHR0aGlzLnN0YXRpY01vdmluZyA9IGZhbHNlO1xuXHRcdHRoaXMuZHluYW1pY0RhbXBpbmdGYWN0b3IgPSAwLjI7XG5cblx0XHR0aGlzLm1pbkRpc3RhbmNlID0gMDtcblx0XHR0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cblx0XHR0aGlzLmtleXMgPSBbIDY1IC8qQSovLCA4MyAvKlMqLywgNjggLypEKi8gXTtcblxuXHRcdC8vIGludGVybmFsc1xuXG5cdFx0dGhpcy50YXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXG5cdFx0dmFyIGxhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHR2YXIgX3N0YXRlID0gU1RBVEUuTk9ORSxcblx0XHRcdF9wcmV2U3RhdGUgPSBTVEFURS5OT05FLFxuXG5cdFx0XHRfZXllID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblxuXHRcdFx0X3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdF9yb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXG5cdFx0XHRfem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdF96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblxuXHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwLFxuXHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMCxcblxuXHRcdFx0X3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdF9wYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0Ly8gZm9yIHJlc2V0XG5cblx0XHR0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuXHRcdHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcblx0XHR0aGlzLnVwMCA9IHRoaXMub2JqZWN0LnVwLmNsb25lKCk7XG5cblx0XHQvLyBldmVudHNcblxuXHRcdHZhciBjaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblx0XHR2YXIgc3RhcnRFdmVudCA9IHsgdHlwZTogJ3N0YXJ0J307XG5cdFx0dmFyIGVuZEV2ZW50ID0geyB0eXBlOiAnZW5kJ307XG5cblxuXHRcdC8vIG1ldGhvZHNcblxuXHRcdHRoaXMuaGFuZGxlUmVzaXplID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAodGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCkge1xuXG5cdFx0XHRcdHRoaXMuc2NyZWVuLmxlZnQgPSAwO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi50b3AgPSAwO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dmFyIGJveCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0Ly8gYWRqdXN0bWVudHMgY29tZSBmcm9tIHNpbWlsYXIgY29kZSBpbiB0aGUganF1ZXJ5IG9mZnNldCgpIGZ1bmN0aW9uXG5cdFx0XHRcdHZhciBkID0gdGhpcy5kb21FbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5sZWZ0ID0gYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkLmNsaWVudExlZnQ7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLnRvcCA9IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBkLmNsaWVudFRvcDtcblx0XHRcdFx0dGhpcy5zY3JlZW4ud2lkdGggPSBib3gud2lkdGg7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLmhlaWdodCA9IGJveC5oZWlnaHQ7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdGlmICh0eXBlb2YgdGhpc1sgZXZlbnQudHlwZSBdID09ICdmdW5jdGlvbicpIHtcblxuXHRcdFx0XHR0aGlzWyBldmVudC50eXBlIF0oZXZlbnQpO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldE1vdXNlT25TY3JlZW4gPSAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0dmVjdG9yLnNldChcblx0XHRcdFx0XHRcdCggcGFnZVggLSBfdGhpcy5zY3JlZW4ubGVmdCApIC8gX3RoaXMuc2NyZWVuLndpZHRoLFxuXHRcdFx0XHRcdFx0KCBwYWdlWSAtIF90aGlzLnNjcmVlbi50b3AgKSAvIF90aGlzLnNjcmVlbi5oZWlnaHRcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSgpICk7XG5cblx0XHR2YXIgZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsID0gKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdHZhciBtb3VzZU9uQmFsbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0bW91c2VPbkJhbGwuc2V0KFxuXHRcdFx0XHRcdFx0KCBwYWdlWCAtIF90aGlzLnNjcmVlbi53aWR0aCAqIDAuNSAtIF90aGlzLnNjcmVlbi5sZWZ0ICkgLyAoX3RoaXMuc2NyZWVuLndpZHRoICogLjUpLFxuXHRcdFx0XHRcdFx0KCBfdGhpcy5zY3JlZW4uaGVpZ2h0ICogMC41ICsgX3RoaXMuc2NyZWVuLnRvcCAtIHBhZ2VZICkgLyAoX3RoaXMuc2NyZWVuLmhlaWdodCAqIC41KSxcblx0XHRcdFx0XHQwLjBcblx0XHRcdFx0KTtcblxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG5cblx0XHRcdFx0aWYgKF90aGlzLm5vUm9sbCkge1xuXG5cdFx0XHRcdFx0aWYgKGxlbmd0aCA8IE1hdGguU1FSVDFfMikge1xuXG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gLjUgLyBsZW5ndGg7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIGlmIChsZW5ndGggPiAxLjApIHtcblxuXHRcdFx0XHRcdG1vdXNlT25CYWxsLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9leWUuY29weShfdGhpcy5vYmplY3QucG9zaXRpb24pLnN1YihfdGhpcy50YXJnZXQpO1xuXG5cdFx0XHRcdHZlY3Rvci5jb3B5KF90aGlzLm9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLnkpO1xuXHRcdFx0XHR2ZWN0b3IuYWRkKG9iamVjdFVwLmNvcHkoX3RoaXMub2JqZWN0LnVwKS5jcm9zcyhfZXllKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueCkpO1xuXHRcdFx0XHR2ZWN0b3IuYWRkKF9leWUuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLnopKTtcblxuXHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSgpICk7XG5cblx0XHR0aGlzLnJvdGF0ZUNhbWVyYSA9IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdFx0cXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgYW5nbGUgPSBNYXRoLmFjb3MoX3JvdGF0ZVN0YXJ0LmRvdChfcm90YXRlRW5kKSAvIF9yb3RhdGVTdGFydC5sZW5ndGgoKSAvIF9yb3RhdGVFbmQubGVuZ3RoKCkpO1xuXG5cdFx0XHRcdGlmIChhbmdsZSkge1xuXG5cdFx0XHRcdFx0YXhpcy5jcm9zc1ZlY3RvcnMoX3JvdGF0ZVN0YXJ0LCBfcm90YXRlRW5kKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHRcdGFuZ2xlICo9IF90aGlzLnJvdGF0ZVNwZWVkO1xuXG5cdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cblx0XHRcdFx0XHRfZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRfdGhpcy5vYmplY3QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRpZiAoX3RoaXMuc3RhdGljTW92aW5nKSB7XG5cblx0XHRcdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KF9yb3RhdGVFbmQpO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIGFuZ2xlICogKCBfdGhpcy5keW5hbWljRGFtcGluZ0ZhY3RvciAtIDEuMCApKTtcblx0XHRcdFx0XHRcdF9yb3RhdGVTdGFydC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSgpKTtcblxuXHRcdHRoaXMuem9vbUNhbWVyYSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblxuXHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU0R1cGxpY2F0ZWREZWNsYXJhdGlvblxuXHRcdFx0XHR2YXIgZmFjdG9yID0gX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyBfdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdF90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gX3RvdWNoWm9vbURpc3RhbmNlRW5kO1xuXHRcdFx0XHRfZXllLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNEdXBsaWNhdGVkRGVjbGFyYXRpb25cblx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggX3pvb21FbmQueSAtIF96b29tU3RhcnQueSApICogX3RoaXMuem9vbVNwZWVkO1xuXG5cdFx0XHRcdGlmIChmYWN0b3IgIT09IDEuMCAmJiBmYWN0b3IgPiAwLjApIHtcblxuXHRcdFx0XHRcdF9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcblxuXHRcdFx0XHRcdGlmIChfdGhpcy5zdGF0aWNNb3ZpbmcpIHtcblxuXHRcdFx0XHRcdFx0X3pvb21TdGFydC5jb3B5KF96b29tRW5kKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdF96b29tU3RhcnQueSArPSAoIF96b29tRW5kLnkgLSBfem9vbVN0YXJ0LnkgKSAqIHRoaXMuZHluYW1pY0RhbXBpbmdGYWN0b3I7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5wYW5DYW1lcmEgPSAoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgbW91c2VDaGFuZ2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRcdHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0bW91c2VDaGFuZ2UuY29weShfcGFuRW5kKS5zdWIoX3BhblN0YXJ0KTtcblxuXHRcdFx0XHRpZiAobW91c2VDaGFuZ2UubGVuZ3RoU3EoKSkge1xuXG5cdFx0XHRcdFx0bW91c2VDaGFuZ2UubXVsdGlwbHlTY2FsYXIoX2V5ZS5sZW5ndGgoKSAqIF90aGlzLnBhblNwZWVkKTtcblxuXHRcdFx0XHRcdHBhbi5jb3B5KF9leWUpLmNyb3NzKF90aGlzLm9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLngpO1xuXHRcdFx0XHRcdHBhbi5hZGQob2JqZWN0VXAuY29weShfdGhpcy5vYmplY3QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS55KSk7XG5cblx0XHRcdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uYWRkKHBhbik7XG5cdFx0XHRcdFx0X3RoaXMudGFyZ2V0LmFkZChwYW4pO1xuXG5cdFx0XHRcdFx0aWYgKF90aGlzLnN0YXRpY01vdmluZykge1xuXG5cdFx0XHRcdFx0XHRfcGFuU3RhcnQuY29weShfcGFuRW5kKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdF9wYW5TdGFydC5hZGQobW91c2VDaGFuZ2Uuc3ViVmVjdG9ycyhfcGFuRW5kLCBfcGFuU3RhcnQpLm11bHRpcGx5U2NhbGFyKF90aGlzLmR5bmFtaWNEYW1waW5nRmFjdG9yKSk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSgpKTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIEFkZGVkIGZvciBBcGlOQVRPTVlcblx0XHQvL1xuXHRcdHRoaXMuc2V0Q2FtZXJhRGlzdGFuY2UgPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcblx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG5cdFx0fTtcblx0XHQvLy8vLy9cblxuXG5cdFx0dGhpcy5jaGVja0Rpc3RhbmNlcyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKCFfdGhpcy5ub1pvb20gfHwgIV90aGlzLm5vUGFuKSB7XG5cblx0XHRcdFx0aWYgKF9leWUubGVuZ3RoU3EoKSA+IF90aGlzLm1heERpc3RhbmNlICogX3RoaXMubWF4RGlzdGFuY2UpIHtcblxuXHRcdFx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKF90aGlzLnRhcmdldCwgX2V5ZS5zZXRMZW5ndGgoX3RoaXMubWF4RGlzdGFuY2UpKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKF9leWUubGVuZ3RoU3EoKSA8IF90aGlzLm1pbkRpc3RhbmNlICogX3RoaXMubWluRGlzdGFuY2UpIHtcblxuXHRcdFx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKF90aGlzLnRhcmdldCwgX2V5ZS5zZXRMZW5ndGgoX3RoaXMubWluRGlzdGFuY2UpKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0X2V5ZS5zdWJWZWN0b3JzKF90aGlzLm9iamVjdC5wb3NpdGlvbiwgX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0aWYgKCFfdGhpcy5ub1JvdGF0ZSkge1xuXG5cdFx0XHRcdF90aGlzLnJvdGF0ZUNhbWVyYSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICghX3RoaXMubm9ab29tKSB7XG5cblx0XHRcdFx0X3RoaXMuem9vbUNhbWVyYSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICghX3RoaXMubm9QYW4pIHtcblxuXHRcdFx0XHRfdGhpcy5wYW5DYW1lcmEoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uYWRkVmVjdG9ycyhfdGhpcy50YXJnZXQsIF9leWUpO1xuXG5cdFx0XHRfdGhpcy5jaGVja0Rpc3RhbmNlcygpO1xuXG5cdFx0XHRfdGhpcy5vYmplY3QubG9va0F0KF90aGlzLnRhcmdldCk7XG5cblx0XHRcdGlmIChsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQoX3RoaXMub2JqZWN0LnBvc2l0aW9uKSA+IEVQUykge1xuXG5cdFx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG5cdFx0XHRcdGxhc3RQb3NpdGlvbi5jb3B5KF90aGlzLm9iamVjdC5wb3NpdGlvbik7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0X3ByZXZTdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdF90aGlzLnRhcmdldC5jb3B5KF90aGlzLnRhcmdldDApO1xuXHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkoX3RoaXMucG9zaXRpb24wKTtcblx0XHRcdF90aGlzLm9iamVjdC51cC5jb3B5KF90aGlzLnVwMCk7XG5cblx0XHRcdF9leWUuc3ViVmVjdG9ycyhfdGhpcy5vYmplY3QucG9zaXRpb24sIF90aGlzLnRhcmdldCk7XG5cblx0XHRcdF90aGlzLm9iamVjdC5sb29rQXQoX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cblx0XHRcdGxhc3RQb3NpdGlvbi5jb3B5KF90aGlzLm9iamVjdC5wb3NpdGlvbik7XG5cblx0XHR9O1xuXG5cdFx0Ly8gbGlzdGVuZXJzXG5cbi8vICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0Ly8gYWRkZWQgZnJvbSBodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvanMvY29udHJvbHMvUG9pbnRlckxvY2tDb250cm9scy5qcyBmb3IgQXBpTkFUT01ZXG5cdFx0dmFyIF9hbXlfdmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0dmFyIEtFWUJPQVJEX1ZFTE9DSVRZID0gNTtcblxuXHRcdC8vIGFkZGVkIGZyb20gaHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHMuanNcblx0XHRmdW5jdGlvbiBrZXlkb3duKCBldmVudCApIHtcblxuXHRcdFx0Ly9ub2luc3BlY3Rpb24gQ29mZmVlU2NyaXB0U3dpdGNoU3RhdGVtZW50V2l0aE5vRGVmYXVsdEJyYW5jaFxuXHRcdFx0c3dpdGNoICggZXZlbnQua2V5Q29kZSApIHtcblxuXHRcdFx0XHRjYXNlIDM4OiAvLyB1cFxuXHRcdFx0XHRjYXNlIDg3OiAvLyB3XG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS55ID0gS0VZQk9BUkRfVkVMT0NJVFk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzNzogLy8gbGVmdFxuXHRcdFx0XHRjYXNlIDY1OiAvLyBhXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS54ID0gLUtFWUJPQVJEX1ZFTE9DSVRZO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0Y2FzZSA4MzogLy8gc1xuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueSA9IC1LRVlCT0FSRF9WRUxPQ0lUWTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM5OiAvLyByaWdodFxuXHRcdFx0XHRjYXNlIDY4OiAvLyBkXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS54ID0gS0VZQk9BUkRfVkVMT0NJVFk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIGFkZGVkIGZyb20gaHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHMuanNcblx0XHRmdW5jdGlvbiBrZXl1cCggZXZlbnQgKSB7XG5cblx0XHRcdC8vbm9pbnNwZWN0aW9uIENvZmZlZVNjcmlwdFN3aXRjaFN0YXRlbWVudFdpdGhOb0RlZmF1bHRCcmFuY2hcblx0XHRcdHN3aXRjaCggZXZlbnQua2V5Q29kZSApIHtcblxuXHRcdFx0XHRjYXNlIDM4OiAvLyB1cFxuXHRcdFx0XHRjYXNlIDg3OiAvLyB3XG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS55ID0gMDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM3OiAvLyBsZWZ0XG5cdFx0XHRcdGNhc2UgNjU6IC8vIGFcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnggPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0Y2FzZSA4MzogLy8gc1xuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueSA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzOTogLy8gcmlnaHRcblx0XHRcdFx0Y2FzZSA2ODogLy8gZFxuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueCA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHQvLyAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRmdW5jdGlvbiBtb3VzZWRvd24oZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmIChfc3RhdGUgPT09IFNUQVRFLk5PTkUpIHtcblxuXHRcdFx0XHRfc3RhdGUgPSBldmVudC5idXR0b247XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFICYmICFfdGhpcy5ub1JvdGF0ZSkge1xuXG5cdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KF9yb3RhdGVTdGFydCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5aT09NICYmICFfdGhpcy5ub1pvb20pIHtcblxuXHRcdFx0XHRfem9vbVN0YXJ0LmNvcHkoZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0X3pvb21FbmQuY29weShfem9vbVN0YXJ0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChfc3RhdGUgPT09IFNUQVRFLlBBTiAmJiAhX3RoaXMubm9QYW4pIHtcblxuXHRcdFx0XHRfcGFuU3RhcnQuY29weShnZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRfcGFuRW5kLmNvcHkoX3BhblN0YXJ0KVxuXG5cdFx0XHR9XG5cblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSwgZmFsc2UpO1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXAsIGZhbHNlKTtcblxuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG1vdXNlbW92ZShldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0Ly9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFICYmICFfdGhpcy5ub1JvdGF0ZSkge1xuXG5cdFx0XHRcdF9yb3RhdGVFbmQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5aT09NICYmICFfdGhpcy5ub1pvb20pIHtcblxuXHRcdFx0XHRfem9vbUVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5QQU4gJiYgIV90aGlzLm5vUGFuKSB7XG5cblx0XHRcdFx0X3BhbkVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG1vdXNldXAoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG1vdXNld2hlZWwoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dmFyIGRlbHRhID0gMDtcblxuXHRcdFx0aWYgKGV2ZW50LndoZWVsRGVsdGEpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cblx0XHRcdFx0ZGVsdGEgPSBldmVudC53aGVlbERlbHRhIC8gNDA7XG5cblx0XHRcdH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7IC8vIEZpcmVmb3hcblxuXHRcdFx0XHRkZWx0YSA9IC1ldmVudC5kZXRhaWwgLyAzO1xuXG5cdFx0XHR9XG5cblx0XHRcdF96b29tU3RhcnQueSArPSBkZWx0YSAqIDAuMDE7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b3VjaHN0YXJ0KGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG5cdFx0XHRzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG5cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdF9zdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblx0XHRcdFx0XHRfcm90YXRlU3RhcnQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkpKTtcblx0XHRcdFx0XHRfcm90YXRlRW5kLmNvcHkoX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0X3N0YXRlID0gU1RBVEUuVE9VQ0hfWk9PTV9QQU47XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcblx0XHRcdFx0XHRfdG91Y2hab29tRGlzdGFuY2VFbmQgPSBfdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0X3BhblN0YXJ0LmNvcHkoZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0X3BhbkVuZC5jb3B5KF9wYW5TdGFydCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuXG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b3VjaG1vdmUoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcblxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHRcdF90b3VjaFpvb21EaXN0YW5jZUVuZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0X3BhbkVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0X3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG91Y2hlbmQoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vbm9pbnNwZWN0aW9uIENvZmZlZVNjcmlwdFN3aXRjaFN0YXRlbWVudFdpdGhOb0RlZmF1bHRCcmFuY2hcblx0XHRcdHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcblxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSkpO1xuXHRcdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KF9yb3RhdGVFbmQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRfdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IF90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0X3BhbkVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdF9wYW5TdGFydC5jb3B5KF9wYW5FbmQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHR9XG5cblx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuXHRcdH1cblxuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH0sIGZhbHNlKTtcblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZWRvd24sIGZhbHNlKTtcblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgbW91c2V3aGVlbCwgZmFsc2UpO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIG1vdXNld2hlZWwsIGZhbHNlKTsgLy8gZmlyZWZveFxuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0LCBmYWxzZSk7XG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmQsIGZhbHNlKTtcblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlLCBmYWxzZSk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd24sIGZhbHNlKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cCwgZmFsc2UpO1xuXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcblxuXHRcdC8vIGZvcmNlIGFuIHVwZGF0ZSBhdCBzdGFydFxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblxuXHR9O1xuXG5cdFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSk7XG5cblx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGhyZWUtZC1jYW52YXM+ZGl2PmRpdntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MDtwb2ludGVyLWV2ZW50czpub25lO30udGhyZWUtZC1jYW52YXM+ZGl2PmRpdj4uY2lyY3VpdGJvYXJke3BvaW50ZXItZXZlbnRzOnZpc2libGU7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt9LnRocmVlLWQtY2FudmFzPmRpdj5jYW52YXN7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjE7cG9pbnRlci1ldmVudHM6bm9uZTt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLmpzIn0=