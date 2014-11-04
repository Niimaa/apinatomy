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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNGFjNGEzZTBhZTJiYjA0MzkzMiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3M/NWRhYyIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLE1BQUksQ0FBRztBQUN0QixjQUFXLENBQUM7QUFJWixVQUFTLGVBQWEsQ0FBRSxDQUFFO0FBQ3JCLGNBQUssQ0FBQztBQUNWLE9BQUk7QUFDSCxZQUFLLEVBQUksRUFBQyxDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQ3RCLFlBQU8sRUFBQyxDQUFDLENBQUMsTUFBSyxDQUFFLEVBQUMsV0FBWSxDQUFDLE9BQU0sQ0FBQyxHQUFLLE9BQUssQ0FBRSxFQUFDLFdBQVksQ0FBQyxvQkFBbUIsQ0FBQyxDQUFDLENBQUM7S0FDdkYsQ0FBRSxPQUFPLEVBQUMsQ0FBRztBQUNaLFlBQU8sTUFBSSxDQUFDO0tBQ2IsQ0FBRSxPQUFRO0FBQ1QsWUFBSyxFQUFJLFVBQVEsQ0FBQztLQUNuQjtBQUFBLEdBQ0Q7QUFJSSxXQUFJLEVBQUksSUFBSSxNQUFJLE1BQU8sQ0FBQyxHQUFJLE1BQUksUUFBUyxDQUFDLEVBQUcsR0FBRyxHQUFDLENBQUcsR0FBQyxDQUFDO0FBQ3RELGVBQVEsRUFBSSxJQUFJLE1BQUksVUFBVyxFQUFDLENBQUM7QUFJakMsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxVQUFRO0FBQ2QsWUFBTyxDQUFHLEVBQUMsbUJBQWtCLENBQUM7QUFBQSxHQUMvQixDQUFDLE9BQVEsQ0FBQyx3QkFBdUIsQ0FBQyxDQUFDO0FBSW5DLFFBQUssT0FBUSxDQUFDLFdBQVUsQ0FBRyxVQUFVOztBQUlwQyxRQUFJLENBQUMsY0FBYyxFQUFDLENBQUc7QUFDdEIsYUFBTSxLQUFNLENBQUMsa0RBQWlELENBQUMsQ0FBQztBQUNoRSxhQUFNO0tBQ1A7QUFJQSxnQkFBWSxDQUFDLElBQUcsQ0FBRyxFQUFFLElBQUcsQ0FBRyxzQkFBb0IsQ0FBRSxDQUFDLENBQUM7QUFDbkQsUUFBRyxHQUFJLENBQUMscUJBQW9CLEdBQUcsU0FBQyxTQUFRLENBQUcsVUFBUSxDQUFNO0FBQ3hELFVBQUksU0FBUSxDQUFHO0FBQUUsaUJBQVEsWUFBYSxDQUFDLGdCQUFlLENBQUM7T0FBRTtBQUN6RCxVQUFJLFNBQVEsQ0FBRztBQUFFLGlCQUFRLFNBQVUsQ0FBQyxnQkFBZSxDQUFDO09BQUU7QUFBQSxLQUN2RCxFQUFDLENBQUM7QUFJRixnQkFBWSxDQUFDLElBQUcsQ0FBRztBQUNsQixVQUFHLENBQUcsYUFBVztBQUNqQixhQUFNLENBQUcsTUFBSTtBQUNiLGdCQUFTLEdBQUcsU0FBQyxHQUFFLENBQU07QUFDcEIsZ0JBQVEsQ0FBQyxDQUFDLEdBQUUsR0FBSyxhQUFXLG9CQUFvQixDQUM5QywwRUFBd0UsQ0FBQyxDQUFDO0FBQzVFLGNBQU8sRUFBQyxDQUFDLEdBQUUsQ0FBQztPQUNiO0tBQ0QsQ0FBQyxDQUFDO0FBSUUsbUJBQVUsRUFBSSxTQUFRLENBQUM7QUFDMUIsY0FBTyxHQUFHLFNBQUM7Y0FBSyxFQUFDLHdCQUF1QixHQUFLLElBQUksT0FBTSxDQUNyRCx3QkFBdUIsT0FBUSxFQUFDLENBQ2hDLHlCQUF1QixNQUFPLEVBQUMsQ0FDakMsQ0FBQztPQUFBO0FBQ0QsYUFBTSxDQUFHLE9BQUssT0FBTztBQUFBLEtBQ3RCLENBQUMsQ0FBQztBQUNGLFVBQUssZUFBZ0IsQ0FBQyxJQUFHLENBQUcsbUJBQWlCLENBQUcsRUFBRSxHQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsY0FBTyxZQUFXLEVBQUM7T0FBRSxDQUFFLENBQUMsQ0FBQztBQUNuRixlQUFVLFNBQVUsRUFBQyxTQUFDLE9BQU0sQ0FBTTtBQUFFLGtCQUFZLENBQUMsa0JBQWlCLENBQUcsUUFBTSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBSWhGLEtBQUUsSUFBRyxRQUFRLGtCQUFrQixHQUFLLEVBQUMsQ0FBQyxNQUFLLENBQUMsT0FBTyxLQUFNLENBQUMsQ0FBQyxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUcsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQUluRixnQkFBWSxDQUFDLElBQUcsQ0FBRyxFQUFFLElBQUcsQ0FBRyx3QkFBc0IsQ0FBRSxDQUFDLENBQUM7QUFJckQsUUFBRyxHQUFJLENBQUMsWUFBVyxHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQy9CLFVBQUksSUFBRyxDQUFHO0FBQUUsaUNBQXlCLEVBQUM7T0FBRTtBQUFBLEtBQ3pDLEVBQUMsQ0FBQztBQUlGLFFBQUcsb0JBQW9CLEVBQUksS0FBRyxRQUFRLG9CQUFvQixDQUFDO0FBQzNELFFBQUksSUFBRyxvQkFBb0IsQ0FBRztBQUM3QixVQUFHLFdBQVcsRUFBSSxLQUFHLENBQUM7S0FDdkI7QUFBQSxHQUdELENBQUMsQ0FBQztBQUdGLFFBQUssSUFBSyxDQUFDLHNCQUFxQixDQUFHLFVBQVU7O0FBR3hDLHVCQUFjLElBQUksU0FBQyxFQUFDO0FBQ25CLGVBQUksSUFBSSxTQUFDLElBQUcsQ0FBTTtBQUNyQixZQUFJLENBQUMsSUFBRyxDQUFHO0FBQ1Ysa0JBQVEsQ0FBQyxZQUFXLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDN0IsWUFBRSxFQUFDLENBQUM7U0FDTDtBQUFBLE9BQ0QsRUFBQztBQUNELGFBQU8sQ0FBQyxZQUFXLENBQUcsTUFBSSxDQUFDLENBQUM7S0FDN0IsRUFBQztBQUlELFFBQUcsd0JBQXdCLEVBQUksR0FBQyxDQUFDO0FBQ2pDLFFBQUcsd0JBQXdCLEtBQUssRUFBSSxLQUFHLFFBQVEsT0FBUSxFQUFDLEtBQUssRUFBSSxLQUFHLG9CQUFvQixPQUFRLEVBQUMsS0FBSyxDQUFDO0FBQ3ZHLFFBQUcsd0JBQXdCLElBQUksRUFBSSxLQUFHLFFBQVEsT0FBUSxFQUFDLElBQUksRUFBSSxLQUFHLG9CQUFvQixPQUFRLEVBQUMsSUFBSSxDQUFDO0FBQ3BHLFFBQUcsd0JBQXdCLE1BQU0sRUFBSSxLQUFHLGlCQUFpQixNQUFNLEVBQUksS0FBRyxLQUFLLE1BQU0sRUFBSSxLQUFHLHdCQUF3QixLQUFLLENBQUM7QUFDdEgsUUFBRyx3QkFBd0IsT0FBTyxFQUFJLEtBQUcsaUJBQWlCLE9BQU8sRUFBSSxLQUFHLEtBQUssT0FBTyxFQUFJLEtBQUcsd0JBQXdCLElBQUksQ0FBQztBQUN4SCxtQkFBZSxFQUFDLFNBQUMsQ0FBSztBQUNyQixZQUFPLDZCQUEyQixDQUFDO0tBQ3BDLEVBQUMsQ0FBQztBQUlGLFFBQUcsZ0JBQWdCLEVBQUksSUFBSSxNQUFJLE1BQU8sRUFBQyxDQUFDO0FBQ3hDLFFBQUcsSUFBSyxDQUFDLFlBQVcsR0FBRyxTQUFDLElBQUcsQ0FBTTtBQUNoQyxVQUFJLENBQUMsSUFBRyxDQUFHO0FBQUUsY0FBTyxxQkFBbUI7T0FBRTtBQUFBLEtBQzFDLEVBQUMsQ0FBQztBQUlGLFFBQUcsaUJBQWlCLEVBQ2xCLElBQUksTUFBSSxrQkFBbUIsQ0FBQyxFQUFDLENBQUcsS0FBRyxpQkFBaUIsTUFBTSxFQUFJLEtBQUcsaUJBQWlCLE9BQU8sQ0FBRyxHQUFHLE1BQUksQ0FBQyxDQUFDO0FBQ25HLHVCQUFjLElBQUksU0FBQyxJQUFHLENBQU07QUFBRSwyQkFBb0IsT0FBTyxFQUFJLEtBQUcsTUFBTSxFQUFJLEtBQUcsT0FBTztLQUFFLEVBQUM7QUFDM0YsUUFBRyxHQUFJLENBQUMsa0JBQWlCLENBQUcsZ0JBQWMsQ0FBQyxDQUFDO0FBQzVDLFFBQUcsaUJBQWlCLFNBQVMsRUFBRSxFQUFJLEdBQUM7QUFDcEMsbUJBQWUsRUFBQyxTQUFDLENBQUs7QUFDckIsY0FBUSxDQUFDLGtCQUFpQixDQUFHLGdCQUFjLENBQUMsQ0FBQztBQUM3QyxZQUFPLHNCQUFvQixDQUFDO0tBQzdCLEVBQUMsQ0FBQztBQUlFLG9CQUFXLEVBQUksSUFBSSxNQUFJLGFBQWMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUNuRCxRQUFHLGdCQUFnQixJQUFLLENBQUMsWUFBVyxDQUFDLENBQUM7QUFFbEMseUJBQWdCLEVBQUksSUFBSSxNQUFJLGlCQUFrQixDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBQzVELHFCQUFnQixTQUFTLElBQUssQ0FBQyxFQUFHLEVBQUMsRUFBRyxHQUFDLENBQUM7QUFDeEMsUUFBRyxnQkFBZ0IsSUFBSyxDQUFDLGlCQUFnQixDQUFDLENBQUM7QUFFdkMseUJBQWdCLEVBQUksSUFBSSxNQUFJLGlCQUFrQixDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBQzVELHFCQUFnQixTQUFTLElBQUssQ0FBQyxDQUFDLEVBQUcsR0FBRyxFQUFDLEVBQUMsQ0FBQztBQUN6QyxRQUFHLGdCQUFnQixJQUFLLENBQUMsaUJBQWdCLENBQUMsQ0FBQztBQUUzQyxtQkFBZSxFQUFDLFNBQUMsQ0FBSztBQUNyQixrQkFBVyxFQUFJLFVBQVEsQ0FBQztBQUN4Qix1QkFBZ0IsRUFBSSxVQUFRLENBQUM7QUFDN0IsdUJBQWdCLEVBQUksVUFBUSxDQUFDO0tBQzlCLEVBQUMsQ0FBQztBQUlGLFFBQUcseUJBQXlCLEVBQUksSUFBSSxNQUFJLGNBQWUsQ0FBQztBQUFFLFdBQUksQ0FBRyxLQUFHO0FBQUcsZUFBUSxDQUFHLEtBQUc7QUFBQSxLQUFFLENBQUMsQ0FBQztBQUN6RixRQUFHLHlCQUF5QixZQUFZLEVBQUksTUFBSSxDQUFDO0FBQ2pELFFBQUcseUJBQXlCLFFBQVMsQ0FBQyxJQUFHLG9CQUFvQixNQUFPLEVBQUMsQ0FBRyxLQUFHLG9CQUFvQixPQUFRLEVBQUMsQ0FBQyxDQUFDO0FBQ3RHLG1CQUFVLElBQUksU0FBQyxDQUFLO0FBQUUsbUNBQTRCLE9BQVEsQ0FBQyxvQkFBbUIsQ0FBRyxzQkFBb0IsQ0FBQztLQUFFLEVBQUM7QUFDekcsMEJBQWlCLElBQUksU0FBQyxJQUFHLENBQU07QUFBRSxtQ0FBNEIsUUFBUyxDQUFDLElBQUcsTUFBTSxDQUFHLEtBQUcsT0FBTyxDQUFDO0tBQUUsRUFBQztBQUNyRyxRQUFHLEdBQUksQ0FBQyxXQUFVLENBQUcsWUFBVSxDQUFDLENBQUM7QUFDakMsUUFBRyxHQUFJLENBQUMsa0JBQWlCLENBQUcsbUJBQWlCLENBQUMsQ0FBQztBQUMvQyxtQkFBZSxFQUFDLFNBQUMsQ0FBSztBQUNyQixjQUFRLENBQUMsV0FBVSxDQUFHLFlBQVUsQ0FBQyxDQUFDO0FBQ2xDLGNBQVEsQ0FBQyxrQkFBaUIsQ0FBRyxtQkFBaUIsQ0FBQyxDQUFDO0FBQ2hELFlBQU8sOEJBQTRCLENBQUM7S0FDckMsRUFBQyxDQUFDO0FBSUYsUUFBRyx1QkFBdUIsRUFBSSxJQUFJLE1BQUksY0FBZSxFQUFDLENBQUM7QUFDdkQsS0FBQyxDQUFDLElBQUcsdUJBQXVCLFdBQVcsQ0FBQyxPQUFRLENBQUMsSUFBRyx5QkFBeUIsV0FBVyxDQUFDLENBQUM7QUFDMUYsUUFBRyxvQkFBb0IsT0FBUSxDQUFDLElBQUcsdUJBQXVCLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZFLFFBQUcsdUJBQXVCLFFBQVMsQ0FBQyxJQUFHLG9CQUFvQixNQUFPLEVBQUMsQ0FBRyxLQUFHLG9CQUFvQixPQUFRLEVBQUMsQ0FBQyxDQUFDO0FBQ3BHLGlCQUFRLElBQUksU0FBQyxDQUFLO0FBQUUsaUNBQTBCLE9BQVEsQ0FBQyxvQkFBbUIsQ0FBRyxzQkFBb0IsQ0FBQztLQUFFLEVBQUM7QUFDckcscUJBQVksSUFBSSxTQUFDLElBQUcsQ0FBTTtBQUFFLGlDQUEwQixRQUFTLENBQUMsSUFBRyxNQUFNLENBQUcsS0FBRyxPQUFPLENBQUM7S0FBRSxFQUFDO0FBQzlGLFFBQUcsR0FBSSxDQUFDLFdBQVUsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUMvQixRQUFHLEdBQUksQ0FBQyxrQkFBaUIsQ0FBRyxjQUFZLENBQUMsQ0FBQztBQUMxQyxtQkFBZSxFQUFDLFNBQUMsQ0FBSztBQUNyQixjQUFRLENBQUMsV0FBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQ2hDLGNBQVEsQ0FBQyxrQkFBaUIsQ0FBRyxjQUFZLENBQUMsQ0FBQztBQUMzQyw4QkFBdUIsTUFBTyxFQUFDLENBQUM7QUFDaEMsWUFBTyw0QkFBMEIsQ0FBQztLQUNuQyxFQUFDLENBQUM7QUFJRSx1QkFBYyxJQUFJLFNBQUMsQ0FBSztBQUFFLGtCQUFZLENBQUMsV0FBVSxDQUFDO0tBQUUsRUFBQztBQUN6RCxRQUFHLEdBQUksQ0FBQyxNQUFLLENBQUcsZ0JBQWMsQ0FBQyxDQUFDO0FBQzVCLDhCQUFxQixFQUFJLHFCQUFvQixFQUFDLFNBQUMsQ0FBSztBQUFFLGtCQUFZLENBQUMsV0FBVSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBQ3RGLG1CQUFlLEVBQUMsU0FBQyxDQUFLO0FBQ3JCLGNBQVEsQ0FBQyxNQUFLLENBQUcsZ0JBQWMsQ0FBQyxDQUFDO0FBQ2pDLDRCQUFzQixFQUFDLENBQUM7S0FDekIsRUFBQyxDQUFDO0FBSUYsUUFBRyxtQkFBbUIsRUFBSSxJQUFJLE1BQUksa0JBQW1CLENBQUMsSUFBRyxpQkFBaUIsQ0FBRyxLQUFHLG9CQUFvQixDQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ3pHLFlBQVEsQ0FBQyxJQUFHLG1CQUFtQixDQUFHO0FBQ2pDLGlCQUFVLENBQUcsSUFBRTtBQUNmLGVBQVEsQ0FBRyxJQUFFO0FBQ2IsY0FBTyxDQUFHLElBQUU7QUFBQSxLQUNiLENBQUMsQ0FBQztBQUNGLFFBQUcsbUJBQW1CLGlCQUFrQixDQUFDLFFBQU8sR0FBRyxTQUFDLENBQUs7QUFBRSxrQkFBWSxDQUFDLFdBQVUsQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUNuRiwrQkFBc0IsSUFBSSxTQUFDLENBQUs7QUFBRSw2QkFBc0IsYUFBYyxFQUFDO0tBQUUsRUFBQztBQUMxRSxzQkFBYSxJQUFJLFNBQUMsQ0FBSztBQUFFLDZCQUFzQixPQUFRLEVBQUM7S0FBRSxFQUFDO0FBQzNELDBCQUFpQixJQUFJLFNBQUMsT0FBTSxDQUFNO0FBQUUsNkJBQXNCLFFBQVEsRUFBSSxRQUFNO0tBQUUsRUFBQztBQUNuRixRQUFHLEdBQUksQ0FBQyxNQUFLLENBQUcsd0JBQXNCLENBQUMsQ0FBQztBQUN4QyxRQUFHLEdBQUksQ0FBQyxXQUFVLENBQUcsZUFBYSxDQUFDLENBQUM7QUFDcEMsUUFBRyxHQUFJLENBQUMsdUJBQXNCLENBQUcsbUJBQWlCLENBQUMsQ0FBQztBQUNwRCxtQkFBZSxFQUFDLFNBQUMsQ0FBSztBQUNyQixjQUFRLENBQUMsTUFBSyxDQUFHLHdCQUFzQixDQUFDLENBQUM7QUFDekMsY0FBUSxDQUFDLFdBQVUsQ0FBRyxlQUFhLENBQUMsQ0FBQztBQUNyQyxjQUFRLENBQUMsdUJBQXNCLENBQUcsbUJBQWlCLENBQUMsQ0FBQztBQUNyRCxZQUFPLHdCQUFzQixDQUFDO0tBQy9CLEVBQUMsQ0FBQztBQUlFLGlDQUF3QixFQUFJLEtBQUcsUUFBUSxPQUFRLEVBQUMsQ0FBQztBQUNqRCxzQ0FBNkIsRUFBSTtBQUNwQyxVQUFHLENBQUcsS0FBRyxRQUFRLElBQUssQ0FBQyxNQUFLLENBQUM7QUFDN0IsU0FBRSxDQUFHLEtBQUcsUUFBUSxJQUFLLENBQUMsS0FBSSxDQUFDO0FBQzNCLFdBQUksQ0FBRyxLQUFHLFFBQVEsSUFBSyxDQUFDLE9BQU0sQ0FBQztBQUMvQixZQUFLLENBQUcsS0FBRyxRQUFRLElBQUssQ0FBQyxRQUFPLENBQUM7QUFBQSxLQUNsQyxDQUFDO0FBQ0QsUUFBRyx1QkFBdUIsRUFBSSxJQUFJLE1BQUksWUFBYSxDQUFDLElBQUcsUUFBUSxDQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ3BFLFFBQUcsUUFBUSxJQUFLLENBQUM7QUFBRSxVQUFHLENBQUc7QUFBRyxTQUFFLENBQUc7QUFBRyxZQUFLLENBQUc7QUFBRyxXQUFJLENBQUc7QUFBQSxLQUFFLENBQUMsQ0FBQztBQUMxRCxRQUFHLGdCQUFnQixJQUFLLENBQUMsSUFBRyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JELG1CQUFlLEVBQUMsU0FBQyxDQUFLO0FBQ3JCLGtCQUFXLFNBQ0EsQ0FBQyx5QkFBd0IsQ0FBQyxJQUMvQixDQUFDO0FBQ0osZUFBTSxDQUFHLE9BQUs7QUFDZCxnQkFBTyxDQUFHLE9BQUs7QUFDZixrQkFBUyxDQUFHLFdBQVM7QUFDckIsbUJBQVUsQ0FBRyxHQUFDO0FBQ2QsMkJBQWtCLENBQUcsR0FBQztBQUFBLE9BQ3ZCLENBQUMsSUFDRyxDQUFDLDhCQUE2QixDQUFDLENBQUM7QUFDdEMsWUFBTyw0QkFBMEIsQ0FBQztLQUNuQyxFQUFDLENBQUM7QUFJRSx1QkFBYyxFQUFJLEVBQUMsQ0FBQyxPQUFNLENBQUMsSUFBSyxDQUFDO0FBQ3BDLGNBQU8sQ0FBRyxXQUFTO0FBQ25CLFlBQUssQ0FBRyxrQkFBZ0I7QUFDeEIsd0JBQWlCLENBQUcsU0FBTztBQUFBLEtBQzVCLENBQUMsQ0FBQztBQUNFLGdCQUFPLEVBQUksSUFBSSxNQUFJLFlBQWEsQ0FBQyxlQUFjLENBQUUsRUFBQyxDQUFDLENBQUM7QUFDeEQsWUFBTyxTQUFTLElBQUssQ0FBQyxJQUFHLEdBQUcsQ0FBRyxHQUFHLEdBQUMsQ0FBQztBQUNwQyxRQUFHLGdCQUFnQixJQUFLLENBQUMsUUFBTyxDQUFDLENBQUM7QUFJOUIsc0JBQWEsSUFBSSxTQUFDLENBQUs7QUFHdEIsY0FBRyxFQUFJO0FBQ1YsYUFBSSxDQUFHLHNCQUFvQixNQUFNLEVBQUksNkJBQTJCLEtBQUssRUFBSSw2QkFBMkIsTUFBTTtBQUMxRyxjQUFLLENBQUcsc0JBQW9CLE9BQU8sRUFBSSw2QkFBMkIsSUFBSSxFQUFJLDZCQUEyQixPQUFPO0FBQUEsT0FDN0csQ0FBQztBQUNELGtCQUFXLElBQUssQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUN0QixxQkFBYyxJQUFLLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDekIsY0FBTyxTQUFTLEVBQUUsRUFBSSw0QkFBMEIsU0FBUyxFQUFFLEVBQUksSUFBRSxFQUFJLEVBQUMsNEJBQTJCLEtBQUssRUFBSSw2QkFBMkIsTUFBTSxDQUFDLENBQUM7QUFDN0ksY0FBTyxTQUFTLEVBQUUsRUFBSSw0QkFBMEIsU0FBUyxFQUFFLEVBQUksSUFBRSxFQUFJLEVBQUMsNEJBQTJCLE9BQU8sRUFBSSw2QkFBMkIsSUFBSSxDQUFDLENBQUM7QUFHN0ksNkJBQXNCLGtCQUFtQixDQUN2QyxxQkFBb0IsT0FBTyxFQUMzQixFQUFDLEdBQUksS0FBRyxJQUFLLENBQUMsS0FBSSxLQUFLLFNBQVUsQ0FBQyxxQkFBb0IsSUFBSSxDQUFDLEVBQUksR0FBQyxDQUFDLENBQ25FLENBQUM7S0FFRixFQUFDO0FBQ0QsUUFBRyxHQUFJLENBQUMsa0JBQWlCLENBQUcsZUFBYSxDQUFDLENBQUM7QUFDM0Msa0JBQWMsRUFBQyxDQUFDO0FBQ2hCLG1CQUFlLEVBQUMsU0FBQyxDQUFLO0FBQ3JCLGNBQVEsQ0FBQyxrQkFBaUIsQ0FBRyxlQUFhLENBQUMsQ0FBQztLQUM3QyxFQUFDLENBQUM7R0FFSCxDQUFDLENBQUM7QUFPRixRQUFLLElBQUssQ0FBQywyQ0FBMEMsQ0FBRyxVQUFVLGdCQUFlLENBQUc7QUFFbkYsUUFBRyxpQkFBaUIsa0JBQW1CLEVBQUMsQ0FBQztBQUN6QyxRQUFHLGlCQUFpQix1QkFBd0IsRUFBQyxDQUFDO0FBRTFDLGVBQU0sRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDakMsV0FBTSxFQUFFLEVBQUksaUJBQWUsS0FBSyxFQUFJLEtBQUcsaUJBQWlCLE1BQU0sRUFBSSxJQUFJLEdBQUM7QUFDdkUsV0FBTSxFQUFFLEVBQUksRUFBQyxnQkFBZSxJQUFJLEVBQUksS0FBRyxpQkFBaUIsT0FBTyxFQUFJLElBQUksR0FBQztBQUN4RSxXQUFNLEVBQUUsRUFBSSxJQUFFLENBQUM7QUFDZixhQUFRLGdCQUFpQixDQUFDLE9BQU0sQ0FBRyxLQUFHLGlCQUFpQixDQUFDLENBQUM7QUFDckQsV0FBRSxFQUFJLElBQUksTUFBSSxJQUFLLENBQUMsSUFBRyxpQkFBaUIsU0FBUyxDQUFHLFFBQU0sSUFBSyxDQUFDLElBQUcsaUJBQWlCLFNBQVMsQ0FBQyxVQUFXLEVBQUMsQ0FBQyxDQUFDO0FBQzVHLGtCQUFTLEVBQUksSUFBRSxlQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO0FBRzFDLFFBQUksQ0FBQyxVQUFTLENBQUc7QUFBRSxhQUFLO0tBQUU7QUFFMUIsVUFBTztBQUNOLFVBQUcsQ0FBRyxXQUFTLEVBQUUsRUFBSSxLQUFHLGlCQUFpQixNQUFNLEVBQUksSUFBSSxLQUFHLHdCQUF3QixLQUFLO0FBQ3ZGLFNBQUUsQ0FBRyxFQUFDLFVBQVMsRUFBRSxFQUFJLEtBQUcsaUJBQWlCLE9BQU8sRUFBSSxJQUFJLEtBQUcsd0JBQXdCLElBQUk7QUFBQSxLQUN4RixDQUFDO0dBRUYsQ0FBQyxDQUFDO0FBR0gsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDdFVBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O21DQ0FBLGtDQUFPLFFBQUM7QUFDUCxjQUFXLENBQUM7QUFFUixTQUFJO0FBR1AsWUFBTyxDQUFQLFVBQVMsV0FBVSxDQUFHLFVBQVE7QUFDN0IsZUFBUSxFQUFJLFVBQVEsR0FBSyxHQUFDLENBQUM7QUFDdkIsYUFBRSxFQUFJLFVBQWdCLENBQUc7QUNQcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRE03RSxtQkFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQzlCLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDekIsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUdBLGVBQVUsQ0FBVixVQUFZLFVBQVMsQ0FBRyxZQUFVLENBQUcsVUFBUTtBQUM1QyxlQUFRLEVBQUksVUFBUSxHQUFLLEdBQUMsQ0FBQztBQUN2QixhQUFFLEVBQUksVUFBZ0IsQ0FBRztBQ2xCcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRGlCN0UsbUJBQVUsTUFBTyxDQUFDLElBQUcsQ0FBRyxFQUFDLFVBQVMsVUFBVSxZQUFZLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7T0FDekUsQ0FBQztBQUNELFNBQUUsVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFDLFVBQVMsVUFBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQzlELFNBQUUsVUFBVSxZQUFZLEVBQUksSUFBRSxDQUFDO0FBQy9CLFlBQU8sSUFBRSxDQUFDO0tBQ1g7QUFLQSxVQUFLLENBQUwsVUFBTyxJQUFZO0FFN0JULFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FGNEJsRyxVQUFHLFFBQVMsRUFBQyxTQUFDLEdBQUUsQ0FBTTtBQUNyQixhQUFTLE9BQUUsR0FBSyxJQUFFLENBQUc7QUFDcEIsY0FBSSxHQUFFLGVBQWdCLENBQUMsR0FBRSxDQUFDLENBQUc7QUFDNUIsZ0JBQUcsQ0FBRSxHQUFFLENBQUMsRUFBSSxJQUFFLENBQUUsR0FBRSxDQUFDLENBQUM7V0FDckI7QUFBQSxTQUNEO0FBQUEsT0FDRCxFQUFDLENBQUM7QUFDRixZQUFPLEtBQUcsQ0FBQztLQUNaO0FBSUEsU0FBSSxDQUFKLFVBQU0sSUFBRztBQUFLLGNBQU8sU0FBQyxHQUFFLENBQU07QUFBRSxjQUFPLElBQUUsQ0FBRSxJQUFHLENBQUM7T0FBRTtLQUFFO0FBSW5ELFVBQUssQ0FBTCxVQUFPLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDakIsVUFBSSxhQUFhLENBQUMsR0FBRSxDQUFFLElBQUcsQ0FBQyxDQUFDLENBQUc7QUFBRSxXQUFFLENBQUUsSUFBRyxDQUFDLEVBQUksR0FBQztPQUFFO0FBQy9DLFlBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBSUEsU0FBSSxDQUFKLFVBQU0sR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQixVQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBRztBQUFFLFdBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxHQUFDO09BQUU7QUFDL0MsWUFBTyxJQUFFLENBQUUsSUFBRyxDQUFDLENBQUM7S0FDakI7QUFHQSxRQUFHLENBQUgsVUFBSyxHQUFFLENBQUcsSUFBRSxDQUFHO0FBQ1YsYUFBSSxJQUFFLFFBQVMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUN4QixVQUFJLEtBQU0sRUFBQyxFQUFHO0FBQUUsV0FBRSxPQUFRLENBQUMsRUFBQztPQUFFO0FBQUEsS0FDL0I7QUFHQSxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFDZCxhQUFPLEdBQUUsT0FBTyxFQUFJLEdBQUc7QUFBRSxXQUFFLElBQUssRUFBQztPQUFFO0FBQUEsS0FDcEM7QUFHQSxTQUFJLENBQUosVUFBTSxFQUFDLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBRztBQUFFLFlBQU8sR0FBQyxLQUFLLE1BQU8sQ0FBQyxFQUFDLENBQUcsRUFBQyxHQUFFLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDO0tBQUU7QUFHcEUsUUFBRyxDQUFILFVBQUssR0FBRSxDQUFHLEVBQVMsQ0FBRztBRXpFWixXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRnVFM0UsWUFBTyxRQUFPLENBQUMsR0FBRSxDQUFFLEVBQUMsQ0FBRyxJQUFFLENBQUcsS0FBRyxDQUFDO0tBQUU7QUFJMUQsb0JBQWUsQ0FBZixVQUFpQixhQUFZLENBQUcsS0FBRyxDQUFHO0FBQ2pDLDBCQUFlLEVBQUksY0FBWSxLQUFLLE1BQU8sQ0FBQyxhQUFZLENBQUcsRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkYsWUFBTyxJQUFJLGlCQUFnQixFQUFDLENBQUM7S0FDOUI7QUFJQSxVQUFLLENBQUwsVUFBTyxTQUFRLENBQUcsUUFBTSxDQUFHO0FBQzFCLFVBQUksQ0FBQyxTQUFRLENBQUc7QUFBRSxhQUFNLElBQUksTUFBSyxDQUFDLE9BQU0sR0FBSyxtQkFBaUIsQ0FBQztPQUFFO0FBQUEsS0FDbEU7QUFHQSxlQUFVLENBQVYsVUFBWSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUduRCxhQUFRLENBQVIsVUFBVSxHQUFFO0FBQUssWUFBTyxPQUFLLEtBQU0sQ0FBQyxHQUFFLENBQUMsSUFBSyxFQUFDLFlBQUU7Y0FBSyxJQUFFLENBQUUsR0FBRSxDQUFDO09BQUEsRUFBQztLQUFFO0FBRzlELGtCQUFhLENBQWIsVUFBZSxPQUFNLENBQUc7QUFDdkIsVUFBSSxPQUFNLElBQUssQ0FBQyxVQUFTLENBQUMsSUFBTSxTQUFPLENBQUc7QUFDekMsZUFBTSxJQUFLLENBQUMsVUFBUyxDQUFHLFdBQVMsQ0FBQyxDQUFDO09BQ3BDO0FBQUEsS0FDRDtBQUdBLFNBQUksQ0FBSixVQUFjLENBQUc7QUN6R1AsV0FBUyxZQUFvQixHQUFDO0FBQUcsZ0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRHdHOUUsV0FBUyxPQUFJLEdBQUcsSUFBSSxPQUFLLE9BQU8sQ0FBRyxLQUFLLEdBQUc7QUFDMUMsWUFBSSxXQUFXLENBQUMsTUFBSyxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQUUsZ0JBQU8sT0FBSyxDQUFFLEVBQUM7U0FBRTtBQUFBLE9BQ2hEO0FBQUEsS0FDRDtBQUtBLFlBQU8sQ0FBUCxVQUFTLElBQUcsQ0FBRyxLQUFHLENBQUcsUUFBTTtBQUN0QixpQkFBTSxDQUFDO0FBQ1gsWUFBTyxVQUFnQjtBQ3BIZCxhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FEbUh6RSxtQkFBTSxJQUFJLFNBQUMsQ0FBSztBQUNuQixpQkFBTSxFQUFJLEtBQUcsQ0FBQztBQUNkLGNBQUcsTUFBTyxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztTQUMxQixFQUFDO0FBQ0Qsb0JBQVksQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUNyQixlQUFNLEVBQUksV0FBVSxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztPQUNwQyxDQUFDO0tBQ0Y7QUFJQSxzQkFBaUIsQ0FBakIsVUFBbUIsRUFBQyxDQUFHLFFBQU0sQ0FBRztBQUMzQixjQUFHLEVBQUksTUFBSSxDQUFDO0FBQ2hCLGNBQVMsWUFBVSxDQUFFLENBQUU7QUFDdEIsVUFBQyxNQUFPLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDakIsWUFBSSxJQUFHLENBQUc7QUFBRSxpQkFBSztTQUFFO0FBQ25CLDZCQUFxQixDQUFDLFdBQVUsQ0FBQyxDQUFDO09BQ25DO0FBQ0EsaUJBQVcsRUFBQyxDQUFDO0FBQ2IsWUFBTyxTQUFTLHVCQUFxQixDQUFFLENBQUU7QUFDeEMsWUFBRyxFQUFJLEtBQUcsQ0FBQztPQUNaLENBQUM7S0FDRjtBQUdBLGdCQUFXLENBQVgsVUFBYSxJQUFHLENBQUcsUUFBTTtBQUNwQixtQkFBUSxFQUFJLEtBQUcsQ0FBQztBQUNwQixZQUFPLFVBQWdCO0FDaEpkLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUQrSTdFLFlBQUksU0FBUSxDQUFHO0FBQ2QsbUJBQVEsRUFBSSxNQUFJLENBQUM7QUFDakIsb0JBQVUsRUFBQyxTQUFDLENBQUs7QUFBRSxxQkFBUSxFQUFJLEtBQUc7V0FBRSxFQUFHLEdBQUMsQ0FBQztBQUN6QyxjQUFHLE1BQU8sQ0FBQyxPQUFNLENBQUcsS0FBRyxDQUFDLENBQUM7U0FDMUI7QUFBQSxPQUNELENBQUM7S0FDRjtBQVlBLGNBQVMsQ0FBVCxVQUFXLEdBQUUsQ0FBRyxLQUEwQjs7QUFBekIsY0FBRztBQUFHLGlCQUFNO0FBQUcsb0JBQVM7QUFDcEMsZUFBSSxFQUFJLFFBQU0sQ0FBQztBQUNuQixZQUFLLGVBQWdCLENBQUMsR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQyxXQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsZ0JBQU8sTUFBSTtTQUFFO0FBQ3JCLFdBQUUsQ0FBRixVQUFJLFFBQU8sQ0FBRztBQUNULHNCQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLGNBQUksVUFBUyxDQUFHO0FBQUUsb0JBQU8sRUFBSSxXQUFVLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQztXQUFFO0FBQzVELGNBQUksUUFBTyxJQUFNLFNBQU8sQ0FBRztBQUMxQixpQkFBSSxFQUFJLFNBQU8sQ0FBQztBQUNoQixnQkFBRyxRQUFTLENBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBRyxTQUFPLENBQUMsQ0FBQztXQUN2QztBQUFBLFNBQ0Q7QUFBQSxPQUNELENBQUMsQ0FBQztLQUNIO0FBT0EsVUFBSyxDQUFMLFVBQU8sT0FBTTtBQUVSLGtCQUFPLEVBQUksUUFBTSxTQUFTO0FBQzVCLGlCQUFNLEVBQUksUUFBTSxRQUFRLEdBQUssR0FBQyxTQUFDLEVBQUc7a0JBQU0sRUFBQyxLQUFNLEdBQUM7V0FBQSxFQUFDLENBQUM7QUFHaEQsZUFBSSxDQUFDO0FBQ1QsY0FBUyxTQUFPLENBQUUsQ0FBRTtBQUNmLG9CQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLGFBQUksRUFBSSxTQUFRLEVBQUMsQ0FBQztBQUNsQixZQUFJLFFBQU8sR0FBSyxFQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUc7QUFDMUMsa0JBQVEsQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUM7U0FDMUI7QUFBQSxPQUNEO0FBQ0EsZ0JBQVUsQ0FBQyxRQUFPLENBQUcsR0FBQyxDQUFDO0FBSW5CLDhCQUFtQixFQUFJLGVBQWMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUkvQyxrQkFBTyxJQUFJLFNBQUMsQ0FBSztBQUNwQiw0QkFBb0IsRUFBQyxDQUFDO0FBQ3RCLGNBQU8sTUFBSSxDQUFDO09BQ2IsRUFBQztBQUlHLGtCQUFPLENBQUM7QUFDWixjQUFPLFNBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBTTtBQUFFLGdCQUFPLEVBQUksR0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRS9ELFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUlELFlBQVMsRUFBSSxXQUFVLENBQUMsU0FBVSxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQzVDLFFBQUcsSUFBSSxFQUFJLElBQUUsQ0FBQztBQUNkLFFBQUcsS0FBSyxFQUFJLEtBQUcsQ0FBQztHQUNqQixDQUFDLENBQUM7QUFDRixZQUFTLFNBQVMsSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUMvQixVQUFPLElBQUksV0FBVSxDQUFDLEtBQUksRUFBSSxNQUFJLENBQUcsT0FBSyxFQUFJLE9BQUssQ0FBQyxDQUFDO0dBQ3RELEVBQUM7QUFDRCxZQUFTLE9BQU8sSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUM3QixVQUFPLEtBQUssS0FBSyxNQUFJLElBQU0sTUFBSSxHQUFLLE9BQUssSUFBTSxPQUFLLENBQUM7R0FDdEQsRUFBQztBQUlELFFBQUssRUFBSSxXQUFVLENBQUMsU0FBVSxNQUFLLENBQUcsTUFBSSxDQUFHO0FBQzVDLFFBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixRQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7R0FDbkIsQ0FBQyxDQUFDO0FBQ0YsWUFBUyxPQUFPLElBQUksU0FBQyxFQUFHLEdBQU07QUFDN0IsVUFBTyxLQUFLLEtBQUssU0FBTyxJQUFNLFNBQU8sR0FBSyxRQUFNLElBQU0sUUFBTSxDQUFDO0dBQzlELEVBQUM7QUFHRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGOzs7Ozs7O2lFR3ZQQSxpQ0FBUSx1QkFBVSxDQUFHLDBDQUFVLEtBQUksQ0FBRztBQUNyQyxjQUFXLENBQUM7QUFPWixPQUFJLFlBQVksRUFBSSxVQUFXLE9BQU0sQ0FBSTtBQUV4QyxTQUFJLFNBQVMsS0FBTSxDQUFFLElBQUcsQ0FBRSxDQUFDO0FBRTNCLFFBQUcsUUFBUSxFQUFJLFFBQU0sQ0FBQztBQUN0QixRQUFHLFFBQVEsTUFBTSxTQUFTLEVBQUksV0FBUyxDQUFDO0FBRXhDLFFBQUcsaUJBQWtCLENBQUUsU0FBUSxDQUFHLFVBQXFCLENBQUU7QUFFeEQsVUFBSyxJQUFHLFFBQVEsV0FBVyxJQUFNLEtBQUcsQ0FBSTtBQUV2QyxZQUFHLFFBQVEsV0FBVyxZQUFhLENBQUUsSUFBRyxRQUFRLENBQUUsQ0FBQztPQUVwRDtBQUFBLEtBRUQsQ0FBRSxDQUFDO0dBRUosQ0FBQztBQUVELE9BQUksWUFBWSxVQUFVLEVBQUksT0FBSyxPQUFRLENBQUUsS0FBSSxTQUFTLFVBQVUsQ0FBRSxDQUFDO0FBRXZFLE9BQUksWUFBWSxFQUFJLFVBQVcsT0FBTSxDQUFJO0FBRXhDLFNBQUksWUFBWSxLQUFNLENBQUUsSUFBRyxDQUFHLFFBQU0sQ0FBRSxDQUFDO0dBRXhDLENBQUM7QUFFRCxPQUFJLFlBQVksVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFFLEtBQUksWUFBWSxVQUFVLENBQUUsQ0FBQztBQUkxRSxPQUFJLGNBQWMsRUFBSSxVQUFVLENBQUU7QUFFakMsV0FBTSxJQUFLLENBQUUscUJBQW9CLENBQUcsTUFBSSxTQUFTLENBQUUsQ0FBQztBQUVoRCxjQUFLO0FBQUcsZUFBTSxDQUFDO0FBQ2Ysa0JBQVM7QUFBRyxtQkFBVSxDQUFDO0FBRXZCLGNBQUssRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFFNUIsYUFBSSxFQUFJO0FBQ1gsWUFBSyxDQUFHO0FBQUUsV0FBRSxDQUFHO0FBQUcsYUFBSSxDQUFHLEdBQUM7QUFBQSxPQUFFO0FBQzVCLGFBQU0sQ0FBRyxHQUFDO0FBQUEsS0FDWCxDQUFDO0FBRUcsa0JBQVMsRUFBSSxTQUFPLGNBQWUsQ0FBRSxLQUFJLENBQUUsQ0FBQztBQUNoRCxjQUFTLE1BQU0sU0FBUyxFQUFJLFNBQU8sQ0FBQztBQUtwQyxjQUFTLE1BQU0sZUFBZSxFQUFJLGNBQVksQ0FBQztBQUcvQyxRQUFHLFdBQVcsRUFBSSxXQUFTLENBQUM7QUFFeEIscUJBQVksRUFBSSxTQUFPLGNBQWUsQ0FBRSxLQUFJLENBQUUsQ0FBQztBQUtuRCxpQkFBWSxNQUFNLGVBQWUsRUFBSSxjQUFZLENBQUM7QUFFbEQsY0FBUyxZQUFhLENBQUUsYUFBWSxDQUFFLENBQUM7QUFHdkMsUUFBRyxjQUFjLEVBQUksVUFBVSxDQUFFLEdBRWpDLENBQUM7QUFHRCxRQUFHLFFBQVEsRUFBSSxVQUFXLEtBQUksQ0FBRyxPQUFLLENBQUk7QUFFekMsWUFBSyxFQUFJLE1BQUksQ0FBQztBQUNkLGFBQU0sRUFBSSxPQUFLLENBQUM7QUFFaEIsZ0JBQVMsRUFBSSxPQUFLLEVBQUksR0FBQztBQUN2QixpQkFBVSxFQUFJLFFBQU0sRUFBSSxHQUFDO0FBRXpCLGdCQUFTLE1BQU0sTUFBTSxFQUFJLE1BQUksRUFBSSxLQUFHLENBQUM7QUFDckMsZ0JBQVMsTUFBTSxPQUFPLEVBQUksT0FBSyxFQUFJLEtBQUcsQ0FBQztBQUV2QyxtQkFBWSxNQUFNLE1BQU0sRUFBSSxNQUFJLEVBQUksS0FBRyxDQUFDO0FBQ3hDLG1CQUFZLE1BQU0sT0FBTyxFQUFJLE9BQUssRUFBSSxLQUFHLENBQUM7S0FFM0MsQ0FBQztBQUVHLGVBQU0sRUFBSSxVQUFXLEtBQUksQ0FBSTtBQUVoQyxZQUFPLEtBQUcsSUFBSyxDQUFFLEtBQUksQ0FBRSxFQUFJLFNBQU8sRUFBSSxJQUFJLE1BQUksQ0FBQztLQUVoRCxDQUFDO0FBRUcsMEJBQWlCLEVBQUksVUFBVyxNQUFLLENBQUk7QUFFeEMsa0JBQU8sRUFBSSxPQUFLLFNBQVMsQ0FBQztBQUU5QixZQUFPLFlBQVUsRUFDaEIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDaEMsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUN6QixJQUFFLENBQUM7S0FFSixDQUFDO0FBRUcsMEJBQWlCLEVBQUksVUFBVyxNQUFLLENBQUk7QUFFeEMsa0JBQU8sRUFBSSxPQUFLLFNBQVMsQ0FBQztBQUU5QixZQUFPLHFDQUFtQyxFQUN6QyxRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQ3pCLElBQUUsQ0FBQztLQUVKLENBQUM7QUFFRyxvQkFBVyxFQUFJLFVBQVcsTUFBSyxDQUFHLE9BQUssQ0FBSTtBQUU5QyxVQUFLLE1BQUssV0FBYSxNQUFJLFlBQVksQ0FBSTtBQUV0QyxpQkFBSSxDQUFDO0FBRVQsWUFBSyxNQUFLLFdBQWEsTUFBSSxZQUFZLENBQUk7QUFJMUMsZ0JBQUssS0FBTSxDQUFFLE1BQUssbUJBQW1CLENBQUUsQ0FBQztBQUN4QyxnQkFBSyxVQUFXLEVBQUMsQ0FBQztBQUNsQixnQkFBSyxhQUFjLENBQUUsTUFBSyxZQUFZLENBQUUsQ0FBQztBQUN6QyxnQkFBSyxNQUFPLENBQUUsTUFBSyxNQUFNLENBQUUsQ0FBQztBQUU1QixnQkFBSyxTQUFTLENBQUcsRUFBRSxFQUFJLEdBQUM7QUFDeEIsZ0JBQUssU0FBUyxDQUFHLEVBQUUsRUFBSSxHQUFDO0FBQ3hCLGdCQUFLLFNBQVMsQ0FBRyxFQUFDLENBQUUsRUFBSSxHQUFDO0FBQ3pCLGdCQUFLLFNBQVMsQ0FBRyxFQUFDLENBQUUsRUFBSSxHQUFDO0FBRXpCLGVBQUksRUFBSSxtQkFBa0IsQ0FBRSxNQUFLLENBQUUsQ0FBQztTQUVyQyxLQUFPO0FBRU4sZUFBSSxFQUFJLG1CQUFrQixDQUFFLE1BQUssWUFBWSxDQUFFLENBQUM7U0FJakQ7QUFFSSxtQkFBTSxFQUFJLE9BQUssUUFBUSxDQUFDO0FBQ3hCLHVCQUFVLEVBQUksTUFBSSxRQUFRLENBQUcsTUFBSyxHQUFHLENBQUUsQ0FBQztBQUU1QyxZQUFLLFdBQVUsSUFBTSxVQUFRLEdBQUssWUFBVSxJQUFNLE1BQUksQ0FBSTtBQUt6RCxpQkFBTSxNQUFNLFVBQVUsRUFBSSxNQUFJLENBQUM7QUFFL0IsZUFBSSxRQUFRLENBQUcsTUFBSyxHQUFHLENBQUUsRUFBSSxNQUFJLENBQUM7U0FFbkM7QUFFQSxZQUFLLE9BQU0sV0FBVyxJQUFNLGNBQVksQ0FBSTtBQUUzQyx1QkFBWSxZQUFhLENBQUUsT0FBTSxDQUFFLENBQUM7U0FFckM7QUFBQSxPQUVEO0FBRUEsV0FBVSxPQUFJO0FBQUcsYUFBSSxPQUFLLFNBQVMsT0FBTyxDQUFHLElBQUksR0FBRyxJQUFHLENBQUk7QUFFMUQsb0JBQVksQ0FBRSxNQUFLLFNBQVMsQ0FBRyxFQUFFLENBQUcsT0FBSyxDQUFFLENBQUM7T0FFN0M7QUFBQSxLQUVELENBQUM7QUFHRCxRQUFHLE9BQU8sRUFBSSxVQUFXLEtBQUksQ0FBRyxPQUFLLENBQUk7QUFFcEMsYUFBRSxFQUFJLElBQUUsRUFBSSxLQUFHLElBQUssQ0FBRSxLQUFJLEtBQUssU0FBVSxDQUFFLE1BQUssSUFBSSxFQUFJLElBQUUsQ0FBRSxDQUFFLEVBQUksUUFBTSxDQUFDO0FBRTdFLFVBQUssS0FBSSxPQUFPLElBQUksSUFBTSxJQUFFLENBQUk7QUFLL0Isa0JBQVMsTUFBTSxZQUFZLEVBQUksSUFBRSxFQUFJLEtBQUcsQ0FBQztBQUV6QyxhQUFJLE9BQU8sSUFBSSxFQUFJLElBQUUsQ0FBQztPQUV2QjtBQUVBLFdBQUksa0JBQW1CLEVBQUMsQ0FBQztBQUV6QixVQUFLLE1BQUssT0FBTyxJQUFNLFVBQVEsQ0FBSTtBQUFFLGNBQUssa0JBQW1CLEVBQUM7T0FBRTtBQUVoRSxZQUFLLG1CQUFtQixXQUFZLENBQUUsTUFBSyxZQUFZLENBQUUsQ0FBQztBQUV0RCxlQUFJLEVBQUksbUJBQWlCLEVBQUksSUFBRSxFQUFJLE1BQUksRUFBSSxtQkFBa0IsQ0FBRSxNQUFLLG1CQUFtQixDQUFFLEVBQzVGLGdCQUFjLEVBQUksV0FBUyxFQUFJLE1BQUksRUFBSSxZQUFVLEVBQUksU0FBTyxDQUFDO0FBRzlELFVBQUssS0FBSSxPQUFPLE1BQU0sSUFBTSxNQUFJLENBQUk7QUFLbkMscUJBQVksTUFBTSxVQUFVLEVBQUksTUFBSSxDQUFDO0FBRXJDLGFBQUksT0FBTyxNQUFNLEVBQUksTUFBSSxDQUFDO09BRTNCO0FBRUEsa0JBQVksQ0FBRSxLQUFJLENBQUcsT0FBSyxDQUFFLENBQUM7S0FFOUIsQ0FBQztHQUVGLENBQUM7QUFFRixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7aUVDelBBLGlDQUFRLHVCQUFVLHdCQUFZLHdCQUFZLHdCQUFXLG1DQUFHLFFBQUMsRUFBRyxNQUFJLENBQUcsV0FBUyxDQUFHO0FBQzlFLGNBQVcsQ0FBQztBQUtSLFNBQUUsRUFBSSxTQUFPLENBQUM7QUFDZCxXQUFJLEVBQUk7QUFBRSxRQUFHLENBQUcsRUFBQztBQUFHLFVBQUssQ0FBRztBQUFHLFFBQUcsQ0FBRztBQUFHLE9BQUUsQ0FBRztBQUFHLGdCQUFXLENBQUc7QUFBRyxrQkFBYSxDQUFHO0FBQUEsR0FBRSxDQUFDO0FBQ3BGLGtCQUFXLEVBQUksRUFBRSxJQUFHLENBQUcsU0FBTyxDQUFFLENBQUM7QUFDakMsaUJBQVUsRUFBSyxFQUFFLElBQUcsQ0FBRyxRQUFNLENBQUUsQ0FBQztBQUNoQyxlQUFRLEVBQU8sRUFBRSxJQUFHLENBQUcsTUFBSSxDQUFFLENBQUM7QUFLOUIsUUFBQyxFQUFJLElBQUksV0FBVSxFQUFDLENBQUM7QUFLekIsS0FBSSxHQUFDLE1BQU8sQ0FBQyxNQUFLLENBQUcsRUFDcEIsRUFBQyxDQUFHLEtBQUcsQ0FDUixDQUFDLE9BQVEsQ0FBQyw2QkFBNEIsQ0FBQyxJQUVqQyxDQUFDLFdBQVUsQ0FBRyxVQUFVLGdCQUFlLENBQUcsV0FBUyxDQUFHO0FBQ3pELFFBQUcsa0JBQWtCLEVBQUksaUJBQWUsQ0FBQztBQUN6QyxRQUFHLFlBQVksRUFBSSxXQUFTLENBQUM7R0FDOUIsQ0FBQyxPQUVNLENBQUMsV0FBVSxDQUFHLFVBQVUsQ0FBRTtBQUVoQyxRQUFHLFFBQVEsRUFBSSxLQUFHLENBQUM7R0FFcEIsQ0FBQyxPQUVNLENBQUMsV0FBVSxDQUFHLFVBQVUsQ0FBRTtBQUVoQyxRQUFHLG1CQUFtQixFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUM3QyxRQUFHLGNBQWMsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDeEMsUUFBRyxPQUFPLEVBQUksTUFBSSxLQUFLLENBQUM7QUFDeEIsUUFBRyxLQUFLLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQy9CLFFBQUcsYUFBYSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUN2QyxRQUFHLFdBQVcsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDckMsUUFBRyxXQUFXLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQ3JDLFFBQUcsU0FBUyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUNuQyxRQUFHLHdCQUF3QixFQUFJLEdBQUM7QUFDaEMsUUFBRyxzQkFBc0IsRUFBSSxHQUFDO0FBQzlCLFFBQUcsVUFBVSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUNwQyxRQUFHLFFBQVEsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDbEMsUUFBRyxRQUFRLEVBQUk7QUFBRSxVQUFHLENBQUc7QUFBRyxTQUFFLENBQUc7QUFBRyxXQUFJLENBQUc7QUFBRyxZQUFLLENBQUc7QUFBQSxLQUFFLENBQUM7QUFDdkQsUUFBRyxvQkFBb0IsRUFBSSxLQUFHLG1CQUFtQixNQUFPLEVBQUMsQ0FBQztBQUMxRCxRQUFHLFdBQVcsRUFBSSxLQUFHLGtCQUFrQixTQUFTLE1BQU8sRUFBQyxDQUFDO0FBQ3pELFFBQUcsS0FBSyxFQUFJLEtBQUcsa0JBQWtCLEdBQUcsTUFBTyxFQUFDLENBQUM7R0FFOUMsQ0FBQyxJQUVHLENBQUMsUUFBTyxDQUFHLFVBQVUsQ0FBRTtBQUUxQixRQUFHLEtBQUssV0FBWSxDQUFDLElBQUcsa0JBQWtCLFNBQVMsQ0FBRyxLQUFHLG1CQUFtQixDQUFDLENBQUM7QUFFOUUsUUFBRyxhQUFjLEVBQUMsQ0FBQztBQUNuQixRQUFHLFdBQVksRUFBQyxDQUFDO0FBQ2pCLFFBQUcsVUFBVyxFQUFDLENBQUM7QUFFaEIsUUFBRyxrQkFBa0IsU0FBUyxXQUFZLENBQUMsSUFBRyxtQkFBbUIsQ0FBRyxLQUFHLEtBQUssQ0FBQyxDQUFDO0FBRTlFLFFBQUcsa0JBQWtCLE9BQVEsQ0FBQyxJQUFHLG1CQUFtQixDQUFDLENBQUM7QUFFdEQsUUFBSSxJQUFHLGNBQWMsa0JBQW1CLENBQUMsSUFBRyxrQkFBa0IsU0FBUyxDQUFDLEVBQUksSUFBRSxDQUFHO0FBQ2hGLFVBQUcsY0FBZSxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ2hDLFVBQUcsY0FBYyxLQUFNLENBQUMsSUFBRyxrQkFBa0IsU0FBUyxDQUFDLENBQUM7S0FDekQ7QUFBQSxHQUVELENBQUMsSUFBSyxDQUFDLE9BQU0sQ0FBRyxVQUFVLENBQUU7QUFFM0IsUUFBRyxPQUFPLEVBQUksTUFBSSxLQUFLLENBQUM7QUFFeEIsUUFBRyxtQkFBbUIsS0FBTSxDQUFDLElBQUcsb0JBQW9CLENBQUMsQ0FBQztBQUN0RCxRQUFHLGtCQUFrQixTQUFTLEtBQU0sQ0FBQyxJQUFHLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELFFBQUcsa0JBQWtCLEdBQUcsS0FBTSxDQUFDLElBQUcsS0FBSyxDQUFDLENBQUM7QUFFekMsUUFBRyxLQUFLLFdBQVksQ0FBQyxJQUFHLGtCQUFrQixTQUFTLENBQUcsS0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0FBRTlFLFFBQUcsa0JBQWtCLE9BQVEsQ0FBQyxJQUFHLG1CQUFtQixDQUFDLENBQUM7QUFFdEQsUUFBRyxjQUFlLENBQUMsWUFBVyxDQUFDLENBQUM7QUFFaEMsUUFBRyxjQUFjLEtBQU0sQ0FBQyxJQUFHLGtCQUFrQixTQUFTLENBQUMsQ0FBQztHQUV6RCxDQUFDLElBQUssQ0FBQyxjQUFhLENBQUcsVUFBVSxDQUFFO0FBRWxDLFFBQUksSUFBRyxZQUFZLElBQU0sU0FBTyxDQUFHO0FBQ2xDLFVBQUcsUUFBUSxLQUFLLEVBQUksR0FBQztBQUNyQixVQUFHLFFBQVEsSUFBSSxFQUFJLEdBQUM7QUFDcEIsVUFBRyxRQUFRLE1BQU0sRUFBSSxPQUFLLFdBQVcsQ0FBQztBQUN0QyxVQUFHLFFBQVEsT0FBTyxFQUFJLE9BQUssWUFBWSxDQUFDO0tBQ3pDLEtBQU87QUFDRixhQUFFLEVBQUksS0FBRyxZQUFZLHNCQUF1QixFQUFDLENBQUM7QUFFOUMsYUFBSSxLQUFHLFlBQVksY0FBYyxnQkFBZ0IsQ0FBQztBQUN0RCxVQUFHLFFBQVEsS0FBSyxFQUFJLElBQUUsS0FBSyxFQUFJLE9BQUssWUFBWSxFQUFJLGFBQVcsQ0FBQztBQUNoRSxVQUFHLFFBQVEsSUFBSSxFQUFJLElBQUUsSUFBSSxFQUFJLE9BQUssWUFBWSxFQUFJLFlBQVUsQ0FBQztBQUM3RCxVQUFHLFFBQVEsTUFBTSxFQUFJLElBQUUsTUFBTSxDQUFDO0FBQzlCLFVBQUcsUUFBUSxPQUFPLEVBQUksSUFBRSxPQUFPLENBQUM7S0FDakM7QUFBQSxHQUVELENBQUMsQ0FBQztBQUtKLEtBQUksR0FBQyxNQUFPLENBQUMsY0FBYSxDQUFHO0FBQzVCLFNBQUksQ0FBRyxFQUFDLE1BQUssQ0FBQztBQUNkLE1BQUMsQ0FBRyxLQUFHO0FBQUEsR0FDUixDQUFDLE9BQVEsQ0FBQyw2QkFBNEIsQ0FBQyxJQUNqQyxDQUFDLFdBQVUsQ0FBRyxVQUFVLEtBQUk7O0FBRS9CLFFBQUksQ0FBQyxJQUFHLFFBQVEsQ0FBRztBQUFFLGFBQUs7S0FBRTtBQUM1QixRQUFJLElBQUcsT0FBTyxJQUFNLE1BQUksS0FBSyxDQUFHO0FBQUUsVUFBRyxPQUFPLEVBQUksTUFBSSxPQUFPO0tBQUU7QUFFekQsaUJBQVEsSUFBSSxTQUFDLEVBQU07QUFBRSxvQkFBYyxDQUFDLEVBQUM7S0FBRSxFQUFDO0FBQ3hDLGVBQU0sSUFBSSxTQUFDLENBQUs7QUFDbkIsVUFBSSxZQUFXLElBQU0sTUFBSSxDQUFHO0FBQUUsZUFBSztPQUFFO0FBQ3JDLGlCQUFVLEVBQUksTUFBSSxLQUFLLENBQUM7QUFDeEIsY0FBTyxvQkFBcUIsQ0FBQyxXQUFVLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDcEQsY0FBTyxvQkFBcUIsQ0FBQyxTQUFRLENBQUcsUUFBTSxDQUFDLENBQUM7QUFDaEQsd0JBQWtCLENBQUMsU0FBUSxDQUFDLENBQUM7S0FDOUIsRUFBQztBQUVELFlBQU8saUJBQWtCLENBQUMsV0FBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQ2pELFlBQU8saUJBQWtCLENBQUMsU0FBUSxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBRTdDLFFBQUcsY0FBZSxDQUFDLFdBQVUsQ0FBQyxDQUFDO0dBRWhDLENBQUMsSUFBSyxDQUFDLFdBQVUsQ0FBRyxVQUFVLENBQUU7QUFFL0IsUUFBSSxJQUFHLFFBQVEsSUFBTSxNQUFJLENBQUc7QUFBRSxhQUFLO0tBQUU7QUFBQSxHQUV0QyxDQUFDLElBQUssQ0FBQyxZQUFXLENBQUcsVUFBVSxLQUFJLENBQUc7QUFFckMsUUFBSSxDQUFDLElBQUcsUUFBUSxDQUFHO0FBQUUsYUFBSztLQUFFO0FBRTVCLFFBQUksS0FBSSxRQUFRLE9BQU8sRUFBSSxLQUFLLE1BQUksUUFBUSxPQUFPLEVBQUksR0FBRztBQUN6RCxVQUFHLE9BQU8sRUFBSSxNQUFJLEtBQUssQ0FBQztLQUN6QjtBQUVBLFFBQUcsY0FBZSxDQUFDLFdBQVUsQ0FBQyxDQUFDO0dBRWhDLENBQUMsSUFBSyxDQUFDLFdBQVUsQ0FBRyxVQUFVLEtBQUksQ0FBRztBQUVwQyxRQUFJLENBQUMsSUFBRyxRQUFRLENBQUc7QUFBRSxhQUFLO0tBQUU7QUFFNUIsUUFBSSxLQUFJLFFBQVEsT0FBTyxFQUFJLEtBQUssTUFBSSxRQUFRLE9BQU8sRUFBSSxHQUFHO0FBQ3pELFVBQUcsT0FBTyxFQUFJLE1BQUksS0FBSyxDQUFDO0tBQ3pCO0FBQUEsR0FFRCxDQUFDLElBQUssQ0FBQyxVQUFTLENBQUcsVUFBVSxDQUFFO0FBRTlCLFFBQUksQ0FBQyxJQUFHLFFBQVEsQ0FBRztBQUFFLGFBQUs7S0FBRTtBQUU1QixRQUFHLE9BQU8sRUFBSSxNQUFJLEtBQUssQ0FBQztBQUN4QixRQUFHLGNBQWUsQ0FBQyxTQUFRLENBQUMsQ0FBQztHQUU5QixDQUFDLE9BQVEsQ0FBQyxXQUFVLENBQUcsVUFBVSxDQUFFO0FBRTlCLGNBQUssRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDaEMsUUFBRyxpQkFBaUIsRUFBSSxTQUFTLGlCQUFlLENBQUUsS0FBSSxDQUFHLE1BQUksQ0FBRztBQUMvRCxZQUFLLElBQUssQ0FDUixDQUFDLEtBQUksRUFBSSxLQUFHLFFBQVEsS0FBSyxDQUFDLEVBQUksS0FBRyxRQUFRLE1BQU0sQ0FDL0MsRUFBQyxLQUFJLEVBQUksS0FBRyxRQUFRLElBQUksQ0FBQyxFQUFJLEtBQUcsUUFBUSxPQUFPLENBQ2pELENBQUM7QUFDRCxZQUFPLE9BQUssQ0FBQztLQUNkLENBQUM7R0FFRixDQUFDLE9BQVEsQ0FBQyxXQUFVLENBQUcsVUFBVSxDQUFFO0FBQzlCLGNBQUssRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDNUIsZ0JBQU8sRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDOUIsbUJBQVUsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDckMsUUFBRyx5QkFBeUIsRUFBSSxTQUFTLHlCQUF1QixDQUFFLEtBQUksQ0FBRyxNQUFJLENBQUc7QUFFL0UsaUJBQVUsSUFBSyxDQUNiLENBQUMsS0FBSSxFQUFJLEtBQUcsUUFBUSxNQUFNLEVBQUksSUFBRSxFQUFJLEtBQUcsUUFBUSxLQUFLLENBQUMsRUFBSSxFQUFDLElBQUcsUUFBUSxNQUFNLEVBQUksSUFBRSxDQUFDLENBQ2xGLEVBQUMsSUFBRyxRQUFRLE9BQU8sRUFBSSxJQUFFLEVBQUksS0FBRyxRQUFRLElBQUksRUFBSSxNQUFJLENBQUMsRUFBSSxFQUFDLElBQUcsUUFBUSxPQUFPLEVBQUksSUFBRSxDQUFDLENBQ25GLElBQUUsQ0FDSixDQUFDO0FBRUcsZ0JBQUssRUFBSSxZQUFVLE9BQVEsRUFBQyxDQUFDO0FBRWpDLFVBQUksTUFBSyxFQUFJLElBQUUsQ0FBRztBQUNqQixtQkFBVSxVQUFXLEVBQUMsQ0FBQztPQUN4QixLQUFPO0FBQ04sbUJBQVUsRUFBRSxFQUFJLEtBQUcsS0FBTSxDQUFDLEdBQUUsRUFBSSxPQUFLLEVBQUksT0FBSyxDQUFDLENBQUM7T0FDakQ7QUFFQSxVQUFHLEtBQUssS0FBTSxDQUFDLElBQUcsa0JBQWtCLFNBQVMsQ0FBQyxJQUFLLENBQUMsSUFBRyxtQkFBbUIsQ0FBQyxDQUFDO0FBRTVFLFlBQUssS0FBTSxDQUFDLElBQUcsa0JBQWtCLEdBQUcsQ0FBQyxVQUFXLENBQUMsV0FBVSxFQUFFLENBQUMsQ0FBQztBQUMvRCxZQUFLLElBQUssQ0FBQyxRQUFPLEtBQU0sQ0FBQyxJQUFHLGtCQUFrQixHQUFHLENBQUMsTUFBTyxDQUFDLElBQUcsS0FBSyxDQUFDLFVBQVcsQ0FBQyxXQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUYsWUFBSyxJQUFLLENBQUMsSUFBRyxLQUFLLFVBQVcsQ0FBQyxXQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFOUMsWUFBTyxPQUFLLENBQUM7S0FFZCxDQUFDO0dBQ0YsQ0FBQyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBRWhDLFFBQUcsWUFBWSxpQkFBa0IsQ0FBQyxhQUFZLEdBQUcsU0FBQyxFQUFNO0FBQUUsc0JBQWdCLEVBQUM7S0FBRSxFQUFDLENBQUM7QUFDL0UsUUFBRyxZQUFZLGlCQUFrQixDQUFDLFdBQVUsR0FBRyxTQUFDLEVBQU07QUFBRSxvQkFBYyxDQUFDLEVBQUM7S0FBRSxFQUFDLENBQUM7QUFDNUUsUUFBRyxZQUFZLGlCQUFrQixDQUFDLFlBQVcsR0FBRyxTQUFDLEVBQU07QUFBRSxxQkFBZSxDQUFDLEVBQUM7S0FBRSxFQUFDLENBQUM7QUFDOUUsUUFBRyxZQUFZLGlCQUFrQixDQUFDLFdBQVUsR0FBRyxTQUFDLEVBQU07QUFBRSxvQkFBYyxDQUFDLEVBQUM7S0FBRSxFQUFDLENBQUM7QUFDNUUsUUFBRyxZQUFZLGlCQUFrQixDQUFDLFVBQVMsR0FBRyxTQUFDLEVBQU07QUFBRSxtQkFBYSxDQUFDLEVBQUM7S0FBRSxFQUFDLENBQUM7R0FFM0UsQ0FBQyxDQUFDO0FBS0osS0FBSSxHQUFDLE1BQU8sQ0FBQyxRQUFPLENBQUc7QUFDdEIsU0FBSSxDQUFHLEVBQUMsTUFBSyxDQUFHLGVBQWEsQ0FBQztBQUM5QixNQUFDLENBQUcsS0FBRztBQUFBLEdBQ1IsQ0FBQyxPQUFRLENBQUMsNkJBQTRCLENBQUMsT0FFOUIsQ0FBQyxXQUFVLENBQUcsVUFBVSxLQUFJLENBQUc7QUFFckMsUUFBSSxJQUFHLE9BQU8sSUFBTSxNQUFJLE9BQU8sQ0FBRztBQUNqQyxVQUFHLGFBQWEsS0FBTSxDQUFDLElBQUcseUJBQTBCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQy9FLFVBQUcsV0FBVyxLQUFNLENBQUMsSUFBRyxhQUFhLENBQUMsQ0FBQztLQUN4QztBQUFBLEdBRUQsQ0FBQyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVUsS0FBSSxDQUFHO0FBRXZDLFFBQUksSUFBRyxPQUFPLElBQU0sTUFBSSxPQUFPLENBQUc7QUFDakMsVUFBRyxXQUFXLEtBQU0sQ0FBQyxJQUFHLHlCQUEwQixDQUFDLEtBQUksTUFBTSxDQUFHLE1BQUksTUFBTSxDQUFDLENBQUMsQ0FBQztLQUM5RTtBQUFBLEdBRUQsQ0FBQyxPQUFRLENBQUMsWUFBVyxDQUFHLFVBQVUsS0FBSSxDQUFHO0FBRXhDLFFBQUksS0FBSSxRQUFRLE9BQU8sSUFBTSxHQUFHO0FBQy9CLFVBQUcsT0FBTyxFQUFJLE1BQUksYUFBYSxDQUFDO0FBQ2hDLFVBQUcsYUFBYSxLQUFNLENBQUMsSUFBRyx5QkFBMEIsQ0FBQyxLQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sQ0FBRyxNQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckcsVUFBRyxXQUFXLEtBQU0sQ0FBQyxJQUFHLGFBQWEsQ0FBQyxDQUFDO0tBQ3hDO0FBQUEsR0FFRCxDQUFDLE9BQVEsQ0FBQyxXQUFVLENBQUcsVUFBVSxLQUFJLENBQUc7QUFFdkMsUUFBSSxLQUFJLFFBQVEsT0FBTyxJQUFNLEdBQUc7QUFDL0IsVUFBRyxXQUFXLEtBQU0sQ0FBQyxJQUFHLHlCQUEwQixDQUFDLEtBQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxDQUFHLE1BQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNwRztBQUFBLEdBRUQsQ0FBQyxPQUFRLENBQUMsVUFBUyxDQUFHLFVBQVUsQ0FBRTtBQUVqQyxRQUFJLEtBQUksUUFBUSxPQUFPLElBQU0sR0FBRztBQUMvQixVQUFHLFdBQVcsS0FBTSxDQUFDLElBQUcseUJBQTBCLENBQUMsS0FBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUcsTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ25HLFVBQUcsYUFBYSxLQUFNLENBQUMsSUFBRyxXQUFXLENBQUMsQ0FBQztLQUN4QztBQUFBLEdBRUQsQ0FBQyxPQUVNLENBQUMsV0FBVSxDQUFHLFVBQVUsQ0FBRTtBQUM1QixZQUFHLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQzFCLGtCQUFTLEVBQUksSUFBSSxNQUFJLFdBQVksRUFBQyxDQUFDO0FBQ3ZDLFFBQUcsYUFBYSxFQUFJLFNBQVMsYUFBVyxDQUFFLENBQUU7QUFFdkMsZUFBSSxFQUFJLEtBQUcsS0FBTSxDQUNuQixJQUFHLGFBQWEsSUFBSyxDQUFDLElBQUcsV0FBVyxDQUFDLEVBQ3JDLEtBQUcsYUFBYSxPQUFRLEVBQUMsRUFDekIsS0FBRyxXQUFXLE9BQVEsRUFBQyxDQUN6QixDQUFDO0FBQ0QsVUFBSSxLQUFJLENBQUc7QUFDVixZQUFHLGFBQWMsQ0FBQyxJQUFHLGFBQWEsQ0FBRyxLQUFHLFdBQVcsQ0FBQyxVQUFXLEVBQUMsQ0FBQztBQUVqRSxhQUFJLEdBQUssS0FBRyxZQUFZLENBQUM7QUFFekIsa0JBQVMsaUJBQWtCLENBQUMsSUFBRyxDQUFHLEVBQUMsS0FBSSxDQUFDLENBQUM7QUFFekMsWUFBRyxLQUFLLGdCQUFpQixDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQ3JDLFlBQUcsa0JBQWtCLEdBQUcsZ0JBQWlCLENBQUMsVUFBUyxDQUFDLENBQUM7QUFFckQsWUFBRyxXQUFXLGdCQUFpQixDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQzNDLFlBQUcsYUFBYSxLQUFNLENBQUMsSUFBRyxXQUFXLENBQUMsQ0FBQztPQUN4QztBQUFBLEtBRUQsQ0FBQztHQUNGLENBQUMsT0FFTSxDQUFDLFdBQVUsQ0FBRyxVQUFVLENBQUU7QUFFaEMsUUFBRyxZQUFZLEVBQUksSUFBRSxDQUFDO0dBRXZCLENBQUMsQ0FBQztBQUtKLEtBQUksR0FBQyxNQUFPLENBQUMsTUFBSyxDQUFHO0FBQ3BCLFNBQUksQ0FBRyxFQUFDLGNBQWEsQ0FBQztBQUN0QixNQUFDLENBQUcsS0FBRztBQUFBLEdBQ1IsQ0FBQyxPQUFRLENBQUMsNkJBQTRCLENBQUMsT0FFOUIsQ0FBQyxXQUFVLENBQUcsVUFBVSxLQUFJLENBQUc7QUFFckMsUUFBSSxJQUFHLE9BQU8sSUFBTSxNQUFJLEtBQUssQ0FBRztBQUMvQixVQUFHLFdBQVcsS0FBTSxDQUFDLElBQUcsaUJBQWtCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLFVBQUcsU0FBUyxLQUFNLENBQUMsSUFBRyxXQUFXLENBQUMsQ0FBQztLQUNwQztBQUFBLEdBRUQsQ0FBQyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVUsQ0FBRTtBQUVsQyxRQUFJLElBQUcsT0FBTyxJQUFNLE1BQUksS0FBSyxDQUFHO0FBQy9CLFVBQUcsU0FBUyxLQUFNLENBQUMsSUFBRyxpQkFBa0IsQ0FBQyxLQUFJLE1BQU0sQ0FBRyxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDcEU7QUFBQSxHQUVELENBQUMsSUFBSyxDQUFDLFlBQVcsQ0FBRyxVQUFVLEtBQUksQ0FBRztBQUVyQyxRQUFJLElBQUcsUUFBUSxJQUFNLE1BQUksQ0FBRztBQUFFLGFBQUs7S0FBRTtBQUVyQyxTQUFJLGVBQWdCLEVBQUMsQ0FBQztBQUN0QixTQUFJLGdCQUFpQixFQUFDLENBQUM7QUFFbkIsWUFBRyxFQUFJLEdBQUM7QUFDWixRQUFJLEtBQUksV0FBVyxDQUFHO0FBQ3JCLFVBQUcsRUFBSSxNQUFJLFdBQVcsRUFBSSxHQUFDLENBQUM7S0FDN0IsS0FBTyxLQUFJLEtBQUksT0FBTyxDQUFHO0FBQ3hCLFVBQUcsRUFBSSxFQUFDLEtBQUksT0FBTyxFQUFJLEdBQUM7S0FDekI7QUFFQSxRQUFHLFdBQVcsRUFBRSxHQUFLLEtBQUcsRUFBSSxLQUFHLENBQUM7QUFDaEMsUUFBRyxjQUFlLENBQUMsV0FBVSxDQUFDLENBQUM7QUFDL0IsUUFBRyxjQUFlLENBQUMsU0FBUSxDQUFDLENBQUM7R0FFOUIsQ0FBQyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBRWhDLFFBQUcsWUFBWSxpQkFBa0IsQ0FBQyxZQUFXLEdBQUcsU0FBQyxFQUFNO0FBQUUscUJBQWUsQ0FBQyxFQUFDO0tBQUUsRUFBQyxDQUFDO0FBQzlFLFFBQUcsWUFBWSxpQkFBa0IsQ0FBQyxnQkFBZSxHQUFHLFNBQUMsRUFBTTtBQUFFLHFCQUFlLENBQUMsRUFBQztLQUFFLEVBQUMsQ0FBQztHQUVuRixDQUFDLElBRUcsQ0FBQyxZQUFXLENBQUcsVUFBVSxDQUFFO0FBRTlCLFFBQUksSUFBRyxPQUFPLElBQU0sTUFBSSxlQUFlLENBQUc7QUFDekMsVUFBRyx3QkFBd0IsRUFBSSxLQUFHLHNCQUFzQixDQUFDO0FBQ3pELFVBQUcsS0FBSyxlQUFnQixDQUFDLElBQUcsd0JBQXdCLEVBQUksS0FBRyxzQkFBc0IsQ0FBQyxDQUFDO0tBQ3BGLEtBQU87QUFDRixnQkFBSyxFQUFJLElBQUUsRUFBSSxFQUFFLElBQUcsU0FBUyxFQUFFLEVBQUksS0FBRyxXQUFXLEVBQUUsQ0FBRSxFQUFJLEtBQUcsVUFBVSxDQUFDO0FBQzNFLFVBQUksTUFBSyxJQUFNLElBQUUsR0FBSyxPQUFLLEVBQUksSUFBRSxDQUFHO0FBQ25DLFlBQUcsS0FBSyxlQUFnQixDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQ2hDLFlBQUcsV0FBVyxLQUFNLENBQUMsSUFBRyxTQUFTLENBQUMsQ0FBQztPQUNwQztBQUFBLEtBQ0Q7QUFBQSxHQUVELENBQUMsT0FFTSxDQUFDLFdBQVUsQ0FBRyxVQUFVLENBQUU7QUFFaEMsUUFBRyxVQUFVLEVBQUksSUFBRSxDQUFDO0dBRXJCLENBQUMsQ0FBQztBQUtKLEtBQUksR0FBQyxNQUFPLENBQUMsS0FBSSxDQUFHO0FBQ25CLFNBQUksQ0FBRyxFQUFDLE1BQUssQ0FBRyxlQUFhLENBQUM7QUFDOUIsTUFBQyxDQUFHLEtBQUc7QUFBQSxHQUNSLENBQUMsT0FBUSxDQUFDLDZCQUE0QixDQUFDLE9BRTlCLENBQUMsV0FBVSxDQUFHLFVBQVUsS0FBSSxDQUFHO0FBRXJDLFFBQUksSUFBRyxPQUFPLElBQU0sTUFBSSxJQUFJLENBQUc7QUFDOUIsVUFBRyxVQUFVLEtBQU0sQ0FBQyxJQUFHLGlCQUFrQixDQUFDLEtBQUksTUFBTSxDQUFHLE1BQUksTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNwRSxVQUFHLFFBQVEsS0FBTSxDQUFDLElBQUcsVUFBVSxDQUFDLENBQUM7S0FDbEM7QUFBQSxHQUVELENBQUMsT0FBUSxDQUFDLFdBQVUsQ0FBRyxVQUFVLENBQUU7QUFFbEMsUUFBSSxJQUFHLE9BQU8sSUFBTSxNQUFJLElBQUksQ0FBRztBQUM5QixVQUFHLFFBQVEsS0FBTSxDQUFDLElBQUcsaUJBQWtCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ25FO0FBQUEsR0FFRCxDQUFDLE9BRU0sQ0FBQyxXQUFVLENBQUcsVUFBVSxDQUFFO0FBQzVCLG1CQUFVLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQ2pDLGdCQUFPLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQzlCLFdBQUUsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDN0IsUUFBRyxVQUFVLEVBQUksU0FBUyxVQUFRLENBQUUsQ0FBRTtBQUVyQyxpQkFBVSxLQUFNLENBQUMsSUFBRyxRQUFRLENBQUMsSUFBSyxDQUFDLElBQUcsVUFBVSxDQUFDLENBQUM7QUFDbEQsVUFBSSxXQUFVLFNBQVUsRUFBQyxDQUFHO0FBQzNCLG1CQUFVLGVBQWdCLENBQUMsSUFBRyxLQUFLLE9BQVEsRUFBQyxFQUFJLEtBQUcsU0FBUyxDQUFDLENBQUM7QUFDOUQsV0FBRSxLQUFNLENBQUMsSUFBRyxLQUFLLENBQUMsTUFBTyxDQUFDLElBQUcsa0JBQWtCLEdBQUcsQ0FBQyxVQUFXLENBQUMsV0FBVSxFQUFFLENBQUMsQ0FBQztBQUM3RSxXQUFFLElBQUssQ0FBQyxRQUFPLEtBQU0sQ0FBQyxJQUFHLGtCQUFrQixHQUFHLENBQUMsVUFBVyxDQUFDLFdBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRSxZQUFHLGtCQUFrQixTQUFTLElBQUssQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUN4QyxZQUFHLG1CQUFtQixJQUFLLENBQUMsR0FBRSxDQUFDLENBQUM7QUFDaEMsWUFBRyxVQUFVLEtBQU0sQ0FBQyxJQUFHLFFBQVEsQ0FBQyxDQUFDO09BQ2xDO0FBQUEsS0FFRCxDQUFDO0dBQ0YsQ0FBQyxPQUVNLENBQUMsV0FBVSxDQUFHLFVBQVUsQ0FBRTtBQUVoQyxRQUFHLFNBQVMsRUFBSSxJQUFFLENBQUM7R0FFcEIsQ0FBQyxDQUFDO0FBS0osS0FBSSxHQUFDLE1BQU8sQ0FBQyxVQUFTLENBQUc7QUFDeEIsU0FBSSxDQUFHLEVBQUMsTUFBSyxDQUFHLE1BQUksQ0FBQztBQUNyQixNQUFDLENBQUcsS0FBRztBQUFBLEdBQ1IsQ0FBQyxPQUFRLENBQUMsNkJBQTRCLENBQUMsT0FFOUIsQ0FBQyxZQUFXLENBQUcsVUFBVSxLQUFJLENBQUc7QUFFdEMsUUFBSSxLQUFJLFFBQVEsT0FBTyxJQUFNLEdBQUc7QUFDL0IsVUFBRyxPQUFPLEVBQUksTUFBSSxlQUFlLENBQUM7QUFDOUIsWUFBQyxFQUFJLE1BQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxDQUFDO0FBQ3BELFlBQUMsRUFBSSxNQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sQ0FBQztBQUN4RCxVQUFHLHNCQUFzQixFQUFJLEtBQUcsd0JBQXdCLEVBQUksS0FBRyxLQUFNLENBQUMsRUFBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxDQUFDLENBQUM7QUFFcEYsYUFBSSxFQUFFLEtBQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxDQUFFLEVBQUksR0FBQztBQUMzRCxhQUFJLEVBQUUsS0FBSSxRQUFRLENBQUUsRUFBQyxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQy9ELFVBQUcsVUFBVSxLQUFNLENBQUMsSUFBRyxpQkFBa0IsQ0FBQyxFQUFHLEdBQUMsQ0FBQyxDQUFDO0FBQ2hELFVBQUcsUUFBUSxLQUFNLENBQUMsSUFBRyxVQUFVLENBQUMsQ0FBQztLQUNsQztBQUFBLEdBRUQsQ0FBQyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVUsS0FBSSxDQUFHO0FBRXZDLFFBQUksS0FBSSxRQUFRLE9BQU8sSUFBTSxHQUFHO0FBQzNCLFlBQUMsRUFBSSxNQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sQ0FBQztBQUNwRCxZQUFDLEVBQUksTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUM7QUFDeEQsVUFBRyxzQkFBc0IsRUFBSSxLQUFHLEtBQU0sQ0FBQyxFQUFDLEVBQUksR0FBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQztBQUVyRCxhQUFJLEVBQUUsS0FBSSxRQUFRLENBQUUsRUFBQyxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQzNELGFBQUksRUFBRSxLQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRSxFQUFDLE1BQU0sQ0FBRSxFQUFJLEdBQUM7QUFDL0QsVUFBRyxRQUFRLEtBQU0sQ0FBQyxJQUFHLGlCQUFrQixDQUFDLEVBQUcsR0FBQyxDQUFDLENBQUM7S0FDL0M7QUFBQSxHQUVELENBQUMsT0FBUSxDQUFDLFVBQVMsQ0FBRyxVQUFVLENBQUU7QUFFakMsUUFBSSxLQUFJLFFBQVEsT0FBTyxJQUFNLEdBQUc7QUFDL0IsVUFBRyx3QkFBd0IsRUFBSSxLQUFHLHNCQUFzQixFQUFJLEdBQUM7QUFFekQsYUFBSSxFQUFFLEtBQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFFLEVBQUMsTUFBTSxDQUFFLEVBQUksR0FBQztBQUMzRCxhQUFJLEVBQUUsS0FBSSxRQUFRLENBQUUsRUFBQyxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUUsRUFBQyxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQy9ELFVBQUcsUUFBUSxLQUFNLENBQUMsSUFBRyxpQkFBa0IsQ0FBQyxFQUFHLEdBQUMsQ0FBQyxDQUFDO0FBQzlDLFVBQUcsVUFBVSxLQUFNLENBQUMsSUFBRyxRQUFRLENBQUMsQ0FBQztLQUNsQztBQUFBLEdBRUQsQ0FBQyxDQUFDO0FBS0osS0FBSSxHQUFDLE1BQU8sQ0FBQyxvQkFBbUIsQ0FBRyxFQUNsQyxFQUFDLENBQUcsS0FBRyxDQUNSLENBQUMsT0FBUSxDQUFDLDZCQUE0QixDQUFDLElBQ2pDLENBQUMsbUJBQWtCLENBQUcsU0FBUyxrQkFBZ0IsQ0FBRSxRQUFPLENBQUc7QUFFOUQsUUFBRyxrQkFBa0IsU0FBUyxVQUFXLEVBQUMsZUFBZ0IsQ0FBQyxRQUFPLENBQUMsQ0FBQztHQUVyRSxDQUFDLENBQUM7QUFLSixPQUFJLGtCQUFrQixFQUFJLEdBQUMsR0FBSSxDQUFDLG1CQUFrQixDQUNoRCxXQUFVLENBQUMsUUFBUyxrQkFBZ0IsQ0FBRSxnQkFBc0MsQ0FBRztPQUF2QixXQUFTLDZDQUFJLFNBQU87QUFHM0UsUUFBRyxVQUFVLE1BQU8sQ0FBQyxJQUFHLENBQUcsVUFBUSxDQUFDLENBQUM7QUFHckMsUUFBRyxhQUFjLEVBQUMsQ0FBQztBQUNuQixRQUFHLE9BQVEsRUFBQyxDQUFDO0dBRWQsQ0FBRyxPQUFLLE9BQVEsQ0FBQyxLQUFJLGdCQUFnQixVQUFVLENBQUMsQ0FBQyxDQUNuRCxDQUFDO0FBR0YsaUpBQUU7QUFDRjs7Ozs7OztBQ3hlQSxnRDs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNqQkE7QUFDQSxtREFBa0QsY0FBYyxrQkFBa0IsTUFBTSxPQUFPLFFBQVEsU0FBUyxTQUFTLFVBQVUscUJBQXFCLHNDQUFzQyx1QkFBdUIsbUNBQW1DLDRCQUE0QiwyQkFBMkIsY0FBYyxrQkFBa0IsTUFBTSxPQUFPLFFBQVEsU0FBUyxTQUFTLFVBQVUscUJBQXFCLFE7Ozs7OztBQ0RyWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBLG1CQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0EsU0FBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxpQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0REFBMkQ7QUFDM0QsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIkRlbHRhTW9kZWxcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDM0YWM0YTNlMGFlMmJiMDQzOTMyXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvQ1NTM0RSZW5kZXJlci5qcycsXG5cdCcuL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanMnLFxuXHQnLi9wLXRocmVlLWQuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBUSFJFRSwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiB0ZXN0IGZvciBicm93c2VyIDNEIHN1cHBvcnQgKi9cblx0ZnVuY3Rpb24gYnJvd3NlclN1cHBvcnQoKSB7XG5cdFx0dmFyIGNhbnZhcztcblx0XHR0cnkge1xuXHRcdFx0Y2FudmFzID0gJCgnPGNhbnZhcz4nKTtcblx0XHRcdHJldHVybiAhIShjYW52YXNbMF0uZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXNbMF0uZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJykpO1xuXHRcdH0gY2F0Y2ggKF9fKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGNhbnZhcyA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXG5cdC8qIHNvbWUgdXNlZnVsIGNvbnN0YW50cyBmb3IgbWFraW5nIGludGVyc2VjdGlvbiBjaGVja3MgKi9cblx0dmFyIFBMQU5FID0gbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAwKTtcblx0dmFyIFBST0pFQ1RPUiA9IG5ldyBUSFJFRS5Qcm9qZWN0b3IoKTtcblxuXG5cdC8qIHRoZSBwbHVnaW4gKi9cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQnLFxuXHRcdHJlcXVpcmVzOiBbJ3Bvc2l0aW9uLXRyYWNraW5nJ11cblx0fSkubW9kaWZ5KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlJyk7XG5cblxuXHQvKiB0aGUgY29uc3RydWN0b3IgaXMgcnVuIG9uY2UgdG8gaW5pdGlhbGl6ZSBwb3RlbnRpYWwgM0QtbmVzcyAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblxuXHRcdC8qICB0ZXN0IGZvciBicm93c2VyIHN1cHBvcnQgKi9cblx0XHRpZiAoIWJyb3dzZXJTdXBwb3J0KCkpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHNlZW0gdG8gaGF2ZSBXZWJHTCBzdXBwb3J0LlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ2FudmFzRWxlbWVudCcgcHJvcGVydHkgKi9cblx0XHRVLm9ic2VydmFibGUodGhpcywgeyBuYW1lOiAndGhyZWVEQ2FudmFzRWxlbWVudCcgfSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzRWxlbWVudCcsIChuZXdDYW52YXMsIG9sZENhbnZhcykgPT4ge1xuXHRcdFx0aWYgKG9sZENhbnZhcykgeyBvbGRDYW52YXMucmVtb3ZlQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdFx0aWYgKG5ld0NhbnZhcykgeyBuZXdDYW52YXMuYWRkQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5ICovXG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsIHtcblx0XHRcdG5hbWU6ICd0aHJlZURNb2RlJyxcblx0XHRcdGluaXRpYWw6IGZhbHNlLFxuXHRcdFx0dmFsaWRhdGlvbjogKHZhbCkgPT4ge1xuXHRcdFx0XHRVLmFzc2VydCghdmFsIHx8IHRoaXMub3B0aW9ucy50aHJlZURDYW52YXNFbGVtZW50LFxuXHRcdFx0XHRcdFx0YFlvdSBjYW5ub3QgdHVybiBvbiAzRCBtb2RlICB3aGVuIG5vICd0aHJlZURDYW52YXNFbGVtZW50JyBoYXMgYmVlbiBzZXQuYCk7XG5cdFx0XHRcdHJldHVybiAhIXZhbDtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0LyogdGhlICd0aHJlZURDYW52YXNTaXplJyBwcm9wZXJ0eSAqL1xuXHRcdHZhciBfY2FudmFzU2l6ZSA9IFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAodGhpcy50aHJlZURDYW52YXNFbGVtZW50ICYmIG5ldyBVLlNpemUoXG5cdFx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpLFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC53aWR0aCgpXG5cdFx0XHQpKSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3RocmVlRENhbnZhc1NpemUnLCB7IGdldCgpIHsgcmV0dXJuIF9jYW52YXNTaXplKCkgfSB9KTtcblx0XHRfY2FudmFzU2l6ZS5vbkNoYW5nZSgobmV3U2l6ZSkgPT4geyB0aGlzLnRyaWdnZXIoJ3RocmVlRENhbnZhc1NpemUnLCBuZXdTaXplKSB9KTtcblxuXG5cdFx0LyogcmVhY3QgdG8gY2FudmFzIHJlc2l6ZSAqL1xuXHRcdCggdGhpcy5vcHRpb25zLmNhbnZhc1Jlc2l6ZUV2ZW50IHx8ICQod2luZG93KS5yZXNpemUuYmluZCgkKHdpbmRvdykpICkoX2NhbnZhc1NpemUpO1xuXG5cblx0XHQvKiB0aGUgJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcgcHJvcGVydHkgKi9cblx0XHRVLm9ic2VydmFibGUodGhpcywgeyBuYW1lOiAndGhyZWVEQ29udHJvbHNFbmFibGVkJyB9KTtcblxuXG5cdFx0LyogaW5pdGlhbGl6ZSB3aGVuIDNEIG1vZGUgaXMgdHVybmVkIG9uICovXG5cdFx0dGhpcy5vbigndGhyZWVETW9kZScsIChtb2RlKSA9PiB7XG5cdFx0XHRpZiAobW9kZSkgeyB0aGlzLl9wX3RocmVlRF9pbml0aWFsaXplKCkgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiB3YXMgYSBjYW52YXMgZ2l2ZW4gdGhyb3VnaCB0aGUgb3B0aW9ucz8gKi9cblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgPSB0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudDtcblx0XHRpZiAodGhpcy50aHJlZURDYW52YXNFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnRocmVlRE1vZGUgPSB0cnVlO1xuXHRcdH1cblxuXG5cdH0pO1xuXG5cdC8qIGBfcF90aHJlZURfaW5pdGlhbGl6ZWAgaXMgcnVuIGV2ZXJ5IHRpbWUgM0QtbmVzcyBpcyB0dXJuZWQgb24gKi9cblx0cGx1Z2luLmFkZCgnX3BfdGhyZWVEX2luaXRpYWxpemUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiBhbiBlYXN5IHdheSB0byBhY3Qgb24gM0QgbW9kZSBiZWluZyB0dXJuZWQgb2ZmICovXG5cdFx0dmFyIG9uVGhyZWVETW9kZU9mZiA9IChjYikgPT4ge1xuXHRcdFx0dmFyIGF1eENiID0gKG1vZGUpID0+IHtcblx0XHRcdFx0aWYgKCFtb2RlKSB7XG5cdFx0XHRcdFx0dGhpcy5vZmYoJ3RocmVlRE1vZGUnLCBhdXhDYik7XG5cdFx0XHRcdFx0Y2IoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCBhdXhDYik7XG5cdFx0fTtcblxuXG5cdFx0LyogcmVtZW1iZXIgdGhlIGluaXRpYWwgbWFyZ2luICovXG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbiA9IHt9O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS5sZWZ0IC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLmxlZnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3AgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCkudG9wIC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0ID0gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC0gdGhpcy5zaXplLndpZHRoIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tID0gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuc2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcDtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW47XG5cdFx0fSk7XG5cblxuXHRcdC8qIHNjZW5lICovXG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLm9uZSgndGhyZWVETW9kZScsIChtb2RlKSA9PiB7XG5cdFx0XHRpZiAoIW1vZGUpIHsgZGVsZXRlIHRoaXMuX3BfdGhyZWVEX3NjZW5lIH1cblx0XHR9KTtcblxuXG5cdFx0LyogY2FtZXJhICovXG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhID1cblx0XHRcdFx0bmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0LCAxLCAxMDAwMCk7XG5cdFx0dmFyIHNldENhbWVyYUFzcGVjdCA9IChzaXplKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5hc3BlY3QgPSBzaXplLndpZHRoIC8gc2l6ZS5oZWlnaHQgfTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgc2V0Q2FtZXJhQXNwZWN0KTtcblx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24ueiA9IDE7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdHRoaXMub2ZmKCd0aHJlZURDYW52YXNTaXplJywgc2V0Q2FtZXJhQXNwZWN0KTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9jYW1lcmE7XG5cdFx0fSk7XG5cblxuXHRcdC8qIGxpZ2h0aW5nICovXG5cdFx0dmFyIGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHgxMDEwMzApO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXHRcdC8vXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQxID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmVlZGQpO1xuXHRcdGRpcmVjdGlvbmFsTGlnaHQxLnBvc2l0aW9uLnNldCgxLCAtMSwgMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQxKTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MiA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTEsIDEsIC0xKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoZGlyZWN0aW9uYWxMaWdodDIpO1xuXHRcdC8vXG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdGFtYmllbnRMaWdodCA9IHVuZGVmaW5lZDtcblx0XHRcdGRpcmVjdGlvbmFsTGlnaHQxID0gdW5kZWZpbmVkO1xuXHRcdFx0ZGlyZWN0aW9uYWxMaWdodDIgPSB1bmRlZmluZWQ7XG5cdFx0fSk7XG5cblxuXHRcdC8qIHJlbmRlcmVyOiBXZWJHTCAqL1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbHBoYTogdHJ1ZSwgYW50aWFsaWFzOiB0cnVlIH0pO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNvcnRPYmplY3RzID0gZmFsc2U7XG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc2V0U2l6ZSh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpKTtcblx0XHR2YXIgcmVuZGVyV2ViR0wgPSAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnJlbmRlcih0aGlzLl9wX3RocmVlRF9zY2VuZSwgdGhpcy5fcF90aHJlZURfY2FtZXJhKSB9O1xuXHRcdHZhciBzZXRXZWJHTENhbnZhc1NpemUgPSAoc2l6ZSkgPT4geyB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KSB9O1xuXHRcdHRoaXMub24oJzNkLXJlbmRlcicsIHJlbmRlcldlYkdMKTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgc2V0V2ViR0xDYW52YXNTaXplKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJzNkLXJlbmRlcicsIHJlbmRlcldlYkdMKTtcblx0XHRcdHRoaXMub2ZmKCd0aHJlZURDYW52YXNTaXplJywgc2V0V2ViR0xDYW52YXNTaXplKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbDtcblx0XHR9KTtcblxuXG5cdFx0LyogcmVuZGVyZXI6IENTUyAqL1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2NzcyA9IG5ldyBUSFJFRS5DU1MzRFJlbmRlcmVyKCk7XG5cdFx0JCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MuZG9tRWxlbWVudCkuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLmRvbUVsZW1lbnQpO1xuXHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5hcHBlbmQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5zZXRTaXplKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC53aWR0aCgpLCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuaGVpZ2h0KCkpO1xuXHRcdHZhciByZW5kZXJDU1MgPSAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSkgfTtcblx0XHR2YXIgc2V0V2ViQ1NTU2l6ZSA9IChzaXplKSA9PiB7IHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KSB9O1xuXHRcdHRoaXMub24oJzNkLXJlbmRlcicsIHJlbmRlckNTUyk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIHNldFdlYkNTU1NpemUpO1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHR0aGlzLm9mZignM2QtcmVuZGVyJywgcmVuZGVyQ1NTKTtcblx0XHRcdHRoaXMub2ZmKCd0aHJlZURDYW52YXNTaXplJywgc2V0V2ViQ1NTU2l6ZSk7XG5cdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuZW1wdHkoKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3M7XG5cdFx0fSk7XG5cblxuXHRcdC8qIHJlbmRlciBvbiBzaXplLWNoYW5nZSBhbmQgZXZlcnkgYW5pbWF0aW9uIGZyYW1lICovXG5cdFx0dmFyIHRyaWdnZXIzRFJlbmRlciA9ICgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9O1xuXHRcdHRoaXMub24oJ3NpemUnLCB0cmlnZ2VyM0RSZW5kZXIpO1xuXHRcdHZhciBzdG9wVHJpZ2dlcmluZzNEUmVuZGVyID0gVS5lYWNoQW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXHRcdG9uVGhyZWVETW9kZU9mZigoKSA9PiB7XG5cdFx0XHR0aGlzLm9mZignc2l6ZScsIHRyaWdnZXIzRFJlbmRlcik7XG5cdFx0XHRzdG9wVHJpZ2dlcmluZzNEUmVuZGVyKCk7XG5cdFx0fSk7XG5cblxuXHRcdC8qIGNvbnRyb2xzICovXG5cdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMgPSBuZXcgVEhSRUUuVHJhY2tiYWxsQ29udHJvbHModGhpcy5fcF90aHJlZURfY2FtZXJhLCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnRbMF0pO1xuXHRcdCQuZXh0ZW5kKHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLCB7XG5cdFx0XHRyb3RhdGVTcGVlZDogMS4wLFxuXHRcdFx0em9vbVNwZWVkOiAxLjIsXG5cdFx0XHRwYW5TcGVlZDogMC44XG5cdFx0fSk7XG5cdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXHRcdHZhciBoYW5kbGVSZXNpemVGb3JDb250cm9scyA9ICgpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMuaGFuZGxlUmVzaXplKCkgfTtcblx0XHR2YXIgdXBkYXRlQ29udHJvbHMgPSAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnVwZGF0ZSgpIH07XG5cdFx0dmFyIHNldENvbnRyb2xzRW5hYmxlZCA9IChlbmFibGVkKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmVuYWJsZWQgPSBlbmFibGVkIH07XG5cdFx0dGhpcy5vbignc2l6ZScsIGhhbmRsZVJlc2l6ZUZvckNvbnRyb2xzKTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCB1cGRhdGVDb250cm9scyk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ29udHJvbHNFbmFibGVkJywgc2V0Q29udHJvbHNFbmFibGVkKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5vZmYoJ3NpemUnLCBoYW5kbGVSZXNpemVGb3JDb250cm9scyk7XG5cdFx0XHR0aGlzLm9mZignM2QtcmVuZGVyJywgdXBkYXRlQ29udHJvbHMpO1xuXHRcdFx0dGhpcy5vZmYoJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcsIHNldENvbnRyb2xzRW5hYmxlZCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY29udHJvbHM7XG5cdFx0fSk7XG5cblxuXHRcdC8qIGZsb2F0aW5nIHRpbGVtYXAgKi9cblx0XHR2YXIgaW5pdGlhbENpcmN1aXRib2FyZFBhcmVudCA9IHRoaXMuZWxlbWVudC5wYXJlbnQoKTtcblx0XHR2YXIgaW5pdGlhbENpcmN1aXRib2FyZFBvc2l0aW9uaW5nID0ge1xuXHRcdFx0bGVmdDogdGhpcy5lbGVtZW50LmNzcygnbGVmdCcpLFxuXHRcdFx0dG9wOiB0aGlzLmVsZW1lbnQuY3NzKCd0b3AnKSxcblx0XHRcdHJpZ2h0OiB0aGlzLmVsZW1lbnQuY3NzKCdyaWdodCcpLFxuXHRcdFx0Ym90dG9tOiB0aGlzLmVsZW1lbnQuY3NzKCdib3R0b20nKVxuXHRcdH07XG5cdFx0dGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KHRoaXMuZWxlbWVudFswXSk7XG5cdFx0dGhpcy5lbGVtZW50LmNzcyh7IGxlZnQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogMCB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkKTtcblx0XHRvblRocmVlRE1vZGVPZmYoKCkgPT4ge1xuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0LmFwcGVuZFRvKGluaXRpYWxDaXJjdWl0Ym9hcmRQYXJlbnQpXG5cdFx0XHRcdFx0LmNzcyh7XG5cdFx0XHRcdFx0XHQnd2lkdGgnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQnaGVpZ2h0JzogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nOiAnJyxcblx0XHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybSc6ICcnXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY3NzKGluaXRpYWxDaXJjdWl0Ym9hcmRQb3NpdGlvbmluZyk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkO1xuXHRcdH0pO1xuXG5cblx0XHQvKiB0aWxlbWFwIGJhY2tmYWNlICovXG5cdFx0dmFyIGJhY2tmYWNlRWxlbWVudCA9ICQoJzxkaXY+JykuY3NzKHtcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0Ym9yZGVyOiAnc29saWQgMXB4IGJsYWNrJyxcblx0XHRcdGJhY2tmYWNlVmlzaWJpbGl0eTogJ2hpZGRlbidcblx0XHR9KTtcblx0XHR2YXIgYmFja2ZhY2UgPSBuZXcgVEhSRUUuQ1NTM0RPYmplY3QoYmFja2ZhY2VFbGVtZW50WzBdKTtcblx0XHRiYWNrZmFjZS5yb3RhdGlvbi5zZXQoTWF0aC5QSSwgMCwgMCk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGJhY2tmYWNlKTtcblxuXG5cdFx0LyogcmVzcG9uZCB0byByZXNpemUgKi9cblx0XHR2YXIgb25DYW52YXNSZXNpemUgPSAoKSA9PiB7XG5cblx0XHRcdC8qIHNpemluZyBhbmQgcG9zaXRpb25pbmcgb2YgdGhlIGNpcmN1aXQtYm9hcmQgYW5kIGJhY2tmYWNlICovXG5cdFx0XHR2YXIgc2l6ZSA9IHtcblx0XHRcdFx0d2lkdGg6IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQsXG5cdFx0XHRcdGhlaWdodDogdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b21cblx0XHRcdH07XG5cdFx0XHR0aGlzLmVsZW1lbnQuY3NzKHNpemUpO1xuXHRcdFx0YmFja2ZhY2VFbGVtZW50LmNzcyhzaXplKTtcblx0XHRcdGJhY2tmYWNlLnBvc2l0aW9uLnggPSB0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQucG9zaXRpb24ueCA9IDAuNSAqICh0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0KTtcblx0XHRcdGJhY2tmYWNlLnBvc2l0aW9uLnkgPSB0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQucG9zaXRpb24ueSA9IDAuNSAqICh0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbSAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wKTtcblxuXHRcdFx0Lyogc2V0IHRoZSBjYW1lcmEgZGlzdGFuY2UgdG8gY29ycmVzcG9uZCAqL1xuXHRcdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuc2V0Q2FtZXJhRGlzdGFuY2UoXG5cdFx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAvXG5cdFx0XHRcdFx0KDIgKiBNYXRoLnRhbihUSFJFRS5NYXRoLmRlZ1RvUmFkKHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5mb3YpIC8gMikpXG5cdFx0XHQpO1xuXG5cdFx0fTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgb25DYW52YXNSZXNpemUpO1xuXHRcdG9uQ2FudmFzUmVzaXplKCk7XG5cdFx0b25UaHJlZURNb2RlT2ZmKCgpID0+IHtcblx0XHRcdHRoaXMub2ZmKCd0aHJlZURDYW52YXNTaXplJywgb25DYW52YXNSZXNpemUpO1xuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyogYHRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkYCBoYXMgbm8gc2lkZS1lZmZlY3RzIGFuZCBjYW4gYmUgdXNlZCAgICovXG5cdC8qICBmcm9tIHRoZSBvdXRzaWRlIHRvIHRyYW5zbGF0ZSBsZWZ0L3RvcCBjb29yZGluYXRlcyBvbiB0aGUgc2NyZWVuIHRvIGxlZnQvdG9wICAgICAqL1xuXHQvKiAgY29vcmRpbmF0ZXMgb2YgdGhlIHByaXZhdGUgY29vcmRpbmF0ZS1zeXN0ZW0gb2YgdGhlIGNpcmN1aXRib2FyZCwgaG93ZXZlciBpdCBpcyAgKi9cblx0LyogIG9yaWVudGVkIGluIDNEIHNwYWNlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdHBsdWdpbi5hZGQoJ3RyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkJywgZnVuY3Rpb24gKHBvc2l0aW9uT25DYW52YXMpIHtcblxuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHR2YXIgbW91c2UzRCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0bW91c2UzRC54ID0gcG9zaXRpb25PbkNhbnZhcy5sZWZ0IC8gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoICogMiAtIDE7XG5cdFx0bW91c2UzRC55ID0gLXBvc2l0aW9uT25DYW52YXMudG9wIC8gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAqIDIgKyAxO1xuXHRcdG1vdXNlM0QueiA9IDAuNTtcblx0XHRQUk9KRUNUT1IudW5wcm9qZWN0VmVjdG9yKG1vdXNlM0QsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSk7XG5cdFx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkodGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uLCBtb3VzZTNELnN1Yih0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24pLm5vcm1hbGl6ZSgpKTtcblx0XHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RQbGFuZShQTEFORSk7XG5cblx0XHQvKiBpZiB0aGUgdGVzdGVkIGludGVyc2VjdGlvbiBpcyBvdXQgb2YgcmFuZ2UsIHJldHVybiB1bmRlZmluZWQgKi9cblx0XHRpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRsZWZ0OiBpbnRlcnNlY3RzLnggKyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0LFxuXHRcdFx0dG9wOiAtaW50ZXJzZWN0cy55ICsgdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcFxuXHRcdH07XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGhyZWUtZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvLyBIVE1MIGVsZW1lbnQgcG9zaXRpb25cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBhICYmIGIgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHNpemVcblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gYSAmJiBiICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKFsndGhyZWUtanMnXSwgZnVuY3Rpb24gKFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQmFzZWQgb24gaHR0cDovL3d3dy5lbWFnaXgubmV0L2FjYWRlbWljL21zY3MtcHJvamVjdC9pdGVtL2NhbWVyYS1zeW5jLXdpdGgtY3NzMy1hbmQtd2ViZ2wtdGhyZWVqc1xuXHQgKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuXHQgKi9cblxuXHRUSFJFRS5DU1MzRE9iamVjdCA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLk9iamVjdDNELmNhbGwoIHRoaXMgKTtcblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3JlbW92ZWQnLCBmdW5jdGlvbiAoIC8qZXZlbnQqLyApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLk9iamVjdDNELnByb3RvdHlwZSApO1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuQ1NTM0RPYmplY3QuY2FsbCggdGhpcywgZWxlbWVudCApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlICk7XG5cblx0Ly9cblxuXHRUSFJFRS5DU1MzRFJlbmRlcmVyID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS5sb2coICdUSFJFRS5DU1MzRFJlbmRlcmVyJywgVEhSRUUuUkVWSVNJT04gKTtcblxuXHRcdHZhciBfd2lkdGgsIF9oZWlnaHQ7XG5cdFx0dmFyIF93aWR0aEhhbGYsIF9oZWlnaHRIYWxmO1xuXG5cdFx0dmFyIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0XHR2YXIgY2FjaGUgPSB7XG5cdFx0XHRjYW1lcmE6IHsgZm92OiAwLCBzdHlsZTogJycgfSxcblx0XHRcdG9iamVjdHM6IHt9XG5cdFx0fTtcblxuXHRcdHZhciBkb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRkb21FbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuXG5cdFx0dmFyIGNhbWVyYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0ZG9tRWxlbWVudC5hcHBlbmRDaGlsZCggY2FtZXJhRWxlbWVudCApO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcblxuXHRcdFx0X3dpZHRoID0gd2lkdGg7XG5cdFx0XHRfaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0XHRfd2lkdGhIYWxmID0gX3dpZHRoIC8gMjtcblx0XHRcdF9oZWlnaHRIYWxmID0gX2hlaWdodCAvIDI7XG5cblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGVwc2lsb24gPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5hYnMoIHZhbHVlICkgPCAwLjAwMDAwMSA/IDAgOiB2YWx1ZTtcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0Q2FtZXJhQ1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICdtYXRyaXgzZCgnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgMTMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuXHRcdFx0JyknO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRPYmplY3RDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ3RyYW5zbGF0ZTNkKC01MCUsLTUwJSwwKSBtYXRyaXgzZCgnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuXHRcdFx0JyknO1xuXG5cdFx0fTtcblxuXHRcdHZhciByZW5kZXJPYmplY3QgPSBmdW5jdGlvbiAoIG9iamVjdCwgY2FtZXJhICkge1xuXG5cdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkNTUzNET2JqZWN0ICkge1xuXG5cdFx0XHRcdHZhciBzdHlsZTtcblxuXHRcdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkNTUzNEU3ByaXRlICkge1xuXG5cdFx0XHRcdFx0Ly8gaHR0cDovL3N3aWZ0Y29kZXIud29yZHByZXNzLmNvbS8yMDA4LzExLzI1L2NvbnN0cnVjdGluZy1hLWJpbGxib2FyZC1tYXRyaXgvXG5cblx0XHRcdFx0XHRtYXRyaXguY29weSggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuXHRcdFx0XHRcdG1hdHJpeC50cmFuc3Bvc2UoKTtcblx0XHRcdFx0XHRtYXRyaXguY29weVBvc2l0aW9uKCBvYmplY3QubWF0cml4V29ybGQgKTtcblx0XHRcdFx0XHRtYXRyaXguc2NhbGUoIG9iamVjdC5zY2FsZSApO1xuXG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAzIF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDExIF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTUgXSA9IDE7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggbWF0cml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBvYmplY3QubWF0cml4V29ybGQgKTtcblxuXG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBlbGVtZW50ID0gb2JqZWN0LmVsZW1lbnQ7XG5cdFx0XHRcdHZhciBjYWNoZWRTdHlsZSA9IGNhY2hlLm9iamVjdHNbIG9iamVjdC5pZCBdO1xuXG5cdFx0XHRcdGlmICggY2FjaGVkU3R5bGUgPT09IHVuZGVmaW5lZCB8fCBjYWNoZWRTdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRcdGNhY2hlLm9iamVjdHNbIG9iamVjdC5pZCBdID0gc3R5bGU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggZWxlbWVudC5wYXJlbnROb2RlICE9PSBjYW1lcmFFbGVtZW50ICkge1xuXG5cdFx0XHRcdFx0Y2FtZXJhRWxlbWVudC5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0XHRyZW5kZXJPYmplY3QoIG9iamVjdC5jaGlsZHJlblsgaSBdLCBjYW1lcmEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG5cdFx0XHR2YXIgZm92ID0gMC41IC8gTWF0aC50YW4oIFRIUkVFLk1hdGguZGVnVG9SYWQoIGNhbWVyYS5mb3YgKiAwLjUgKSApICogX2hlaWdodDtcblxuXHRcdFx0aWYgKCBjYWNoZS5jYW1lcmEuZm92ICE9PSBmb3YgKSB7XG5cblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLldlYmtpdFBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuTW96UGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5vUGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdGRvbUVsZW1lbnQuc3R5bGUucGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLmZvdiA9IGZvdjtcblxuXHRcdFx0fVxuXG5cdFx0XHRzY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IHVuZGVmaW5lZCApIHsgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCkgfVxuXG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlLmdldEludmVyc2UoIGNhbWVyYS5tYXRyaXhXb3JsZCApO1xuXG5cdFx0XHR2YXIgc3R5bGUgPSBcInRyYW5zbGF0ZTNkKDAsMCxcIiArIGZvdiArIFwicHgpXCIgKyBnZXRDYW1lcmFDU1NNYXRyaXgoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKSArXG5cdFx0XHRcdFwiIHRyYW5zbGF0ZTNkKFwiICsgX3dpZHRoSGFsZiArIFwicHgsXCIgKyBfaGVpZ2h0SGFsZiArIFwicHgsIDApXCI7XG5cblxuXHRcdFx0aWYgKCBjYWNoZS5jYW1lcmEuc3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5zdHlsZSA9IHN0eWxlO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlck9iamVjdCggc2NlbmUsIGNhbWVyYSApO1xuXG5cdFx0fTtcblxuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvQ1NTM0RSZW5kZXJlci5qc1xuICoqLyIsIi8qKlxuICogQGF1dGhvciBFYmVyaGFyZCBHcmFldGhlciAgICAgKGh0dHA6Ly9lZ3JhZXRoZXIuY29tKVxuICogQGF1dGhvciBNYXJrIEx1bmRpbiAgICAgICAgICAgKGh0dHA6Ly9tYXJrLWx1bmRpbi5jb20pXG4gKiBAYXV0aG9yIE1pY2hpZWwgSGVsdmVuc3RlaWpuICAoaHR0cDovL21oZWx2ZW5zLm5ldClcbiAqL1xuXG5kZWZpbmUoWydqcXVlcnknLCAndGhyZWUtanMnLCAnZGVsdGEtanMnLCAnLi9taXNjLmpzJ10sICgkLCBUSFJFRSwgRGVsdGFNb2RlbCwgVSkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBjb25zdGFudHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIFNUQVRFID0geyBOT05FOiAtMSwgUk9UQVRFOiAwLCBaT09NOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfWk9PTV9QQU46IDQgfTtcblx0dmFyIENIQU5HRV9FVkVOVCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblx0dmFyIFNUQVJUX0VWRU5UICA9IHsgdHlwZTogJ3N0YXJ0JyB9O1xuXHR2YXIgRU5EX0VWRU5UICAgID0geyB0eXBlOiAnZW5kJyB9O1xuXG5cblx0LyogZGVsdGEgbW9kZWwgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgZG0gPSBuZXcgRGVsdGFNb2RlbCgpO1xuXG5cblx0LyogY29yZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ2NvcmUnLCB7XG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qICdjb25zdHJ1Y3QnIG1ldGhvZCBjb3JlICovXG5cdFx0XHQuYWRkKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoY29udHJvbGxlZE9iamVjdCwgZG9tRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0ID0gY29udHJvbGxlZE9iamVjdDtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cdFx0XHR9KVxuXHRcdC8qIEFQSSAqL1xuXHRcdFx0LmFwcGVuZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdH0pXG5cdFx0LyogcHJpdmF0ZSBmaWVsZHMgKi9cblx0XHRcdC5hcHBlbmQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0dGhpcy5fZXllID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl96b29tU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IDA7XG5cdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMDtcblx0XHRcdFx0dGhpcy5fcGFuU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl9wYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl9zY3JlZW4gPSB7IGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlczAgPSB0aGlzLl90YXJnZXRDb29yZGluYXRlcy5jbG9uZSgpO1xuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbjAgPSB0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG5cdFx0XHRcdHRoaXMuX3VwMCA9IHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXAuY2xvbmUoKTtcblxuXHRcdFx0fSlcblx0XHQvKiBwdWJsaWMgbWV0aG9kcyAqL1xuXHRcdFx0LmFkZCgndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX2V5ZS5zdWJWZWN0b3JzKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24sIHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHR0aGlzLnJvdGF0ZUNhbWVyYSgpO1xuXHRcdFx0XHR0aGlzLnpvb21DYW1lcmEoKTtcblx0XHRcdFx0dGhpcy5wYW5DYW1lcmEoKTtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmFkZFZlY3RvcnModGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMsIHRoaXMuX2V5ZSk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5sb29rQXQodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9sYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbikgPiBFUFMpIHtcblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ0hBTkdFX0VWRU5UKTtcblx0XHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ3Jlc2V0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcy5jb3B5KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzMCk7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uY29weSh0aGlzLl9wb3NpdGlvbjApO1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNvcHkodGhpcy5fdXAwKTtcblxuXHRcdFx0XHR0aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLCB0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5sb29rQXQodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDSEFOR0VfRVZFTlQpO1xuXG5cdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pO1xuXG5cdFx0XHR9KS5hZGQoJ2hhbmRsZVJlc2l6ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ubGVmdCA9IDA7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLnRvcCA9IDA7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgYm94ID0gdGhpcy5fZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0XHQvLyBhZGp1c3RtZW50cyBjb21lIGZyb20gc2ltaWxhciBjb2RlIGluIHRoZSBqcXVlcnkgb2Zmc2V0KCkgZnVuY3Rpb25cblx0XHRcdFx0XHR2YXIgZCA9IHRoaXMuX2RvbUVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGQuY2xpZW50TGVmdDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4udG9wID0gYm94LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGQuY2xpZW50VG9wO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IGJveC53aWR0aDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4uaGVpZ2h0ID0gYm94LmhlaWdodDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXG5cdC8qIG1vdXNlIGV2ZW50IG1ldGhvZCBjb3JlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdtb3VzZS1ldmVudHMnLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZSddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuTk9ORSkgeyB0aGlzLl9zdGF0ZSA9IGV2ZW50LmJ1dHRvbiB9XG5cblx0XHRcdFx0dmFyIG1vdXNlbW92ZSA9IChlKSA9PiB7IHRoaXMubW91c2Vtb3ZlKGUpIH07XG5cdFx0XHRcdHZhciBtb3VzZXVwID0gKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoU1RBUlRfRVZFTlQpO1xuXG5cdFx0XHR9KS5hZGQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG5cdFx0XHR9KS5hZGQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA8IDEgfHwgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblxuXHRcdFx0fSkuYWRkKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA8IDEgfHwgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gZ2V0TW91c2VPblNjcmVlblxuXG5cdFx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLmdldE1vdXNlT25TY3JlZW4gPSBmdW5jdGlvbiBnZXRNb3VzZU9uU2NyZWVuKHBhZ2VYLCBwYWdlWSkge1xuXHRcdFx0XHRcdHZlY3Rvci5zZXQoXG5cdFx0XHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvIHRoaXMuX3NjcmVlbi53aWR0aCxcblx0XHRcdFx0XHRcdFx0KHBhZ2VZIC0gdGhpcy5fc2NyZWVuLnRvcCkgLyB0aGlzLl9zY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsXG5cdFx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgbW91c2VPbkJhbGwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbCA9IGZ1bmN0aW9uIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChwYWdlWCwgcGFnZVkpIHtcblxuXHRcdFx0XHRcdG1vdXNlT25CYWxsLnNldChcblx0XHRcdFx0XHRcdFx0KHBhZ2VYIC0gdGhpcy5fc2NyZWVuLndpZHRoICogMC41IC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gKHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSksXG5cdFx0XHRcdFx0XHRcdCh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41ICsgdGhpcy5fc2NyZWVuLnRvcCAtIHBhZ2VZKSAvICh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41KSxcblx0XHRcdFx0XHRcdFx0MC4wXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHZhciBsZW5ndGggPSBtb3VzZU9uQmFsbC5sZW5ndGgoKTtcblxuXHRcdFx0XHRcdGlmIChsZW5ndGggPiAxLjApIHtcblx0XHRcdFx0XHRcdG1vdXNlT25CYWxsLm5vcm1hbGl6ZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fZXllLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbikuc3ViKHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHRcdHZlY3Rvci5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLnNldExlbmd0aChtb3VzZU9uQmFsbC55KTtcblx0XHRcdFx0XHR2ZWN0b3IuYWRkKG9iamVjdFVwLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuY3Jvc3ModGhpcy5fZXllKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueCkpO1xuXHRcdFx0XHRcdHZlY3Rvci5hZGQodGhpcy5fZXllLnNldExlbmd0aChtb3VzZU9uQmFsbC56KSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdFx0XHRcdH07XG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7IHRoaXMubW91c2Vkb3duKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4geyB0aGlzLnRvdWNoc3RhcnQoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHsgdGhpcy50b3VjaG1vdmUoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4geyB0aGlzLnRvdWNoZW5kKGUpIH0pO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHJvdGF0ZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdyb3RhdGUnLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZScsICdtb3VzZS1ldmVudHMnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5fcm90YXRlU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLl9yb3RhdGVTdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLl9yb3RhdGVFbmQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0Lyogcm90YXRpbmcgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gcm90YXRlQ2FtZXJhXG5cdFx0XHRcdHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXHRcdFx0XHR0aGlzLnJvdGF0ZUNhbWVyYSA9IGZ1bmN0aW9uIHJvdGF0ZUNhbWVyYSgpIHtcblxuXHRcdFx0XHRcdHZhciBhbmdsZSA9IE1hdGguYWNvcyhcblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuZG90KHRoaXMuX3JvdGF0ZUVuZCkgL1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5sZW5ndGgoKSAvXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5sZW5ndGgoKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKGFuZ2xlKSB7XG5cdFx0XHRcdFx0XHRheGlzLmNyb3NzVmVjdG9ycyh0aGlzLl9yb3RhdGVTdGFydCwgdGhpcy5fcm90YXRlRW5kKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHRcdFx0YW5nbGUgKj0gdGhpcy5yb3RhdGVTcGVlZDtcblxuXHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fTtcblx0XHRcdH0pXG5cdFx0Lyogcm90YXRpbmcgb3B0aW9ucyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMucm90YXRlU3BlZWQgPSAxLjA7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyogem9vbSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3pvb20nLCB7XG5cdFx0YWZ0ZXI6IFsnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5aT09NKSB7XG5cdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3pvb21FbmQuY29weSh0aGlzLl96b29tU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuWk9PTSkge1xuXHRcdFx0XHRcdHRoaXMuX3pvb21FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHR2YXIgZGlmZiA9IDA7XG5cdFx0XHRcdGlmIChldmVudC53aGVlbERlbHRhKSB7IC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXHRcdFx0XHRcdGRpZmYgPSBldmVudC53aGVlbERlbHRhIC8gNDA7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7IC8vIEZpcmVmb3hcblx0XHRcdFx0XHRkaWZmID0gLWV2ZW50LmRldGFpbCAvIDM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl96b29tU3RhcnQueSArPSBkaWZmICogMC4wMTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KEVORF9FVkVOVCk7XG5cblx0XHRcdH0pLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIChlKSA9PiB7IHRoaXMubW91c2V3aGVlbChlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIChlKSA9PiB7IHRoaXMubW91c2V3aGVlbChlKSB9KTsgLy8gZmlyZWZveFxuXG5cdFx0XHR9KVxuXHRcdC8qIHpvb21pbmcgKi9cblx0XHRcdC5hZGQoJ3pvb21DYW1lcmEnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5UT1VDSF9aT09NX1BBTikge1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZDtcblx0XHRcdFx0XHR0aGlzLl9leWUubXVsdGlwbHlTY2FsYXIodGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCAvIHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgZmFjdG9yID0gMS4wICsgKCB0aGlzLl96b29tRW5kLnkgLSB0aGlzLl96b29tU3RhcnQueSApICogdGhpcy56b29tU3BlZWQ7XG5cdFx0XHRcdFx0aWYgKGZhY3RvciAhPT0gMS4wICYmIGZhY3RvciA+IDAuMCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG5cdFx0XHRcdFx0XHR0aGlzLl96b29tU3RhcnQuY29weSh0aGlzLl96b29tRW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHQvKiB6b29taW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnpvb21TcGVlZCA9IDEuMjtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiBwYW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgncGFuJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnLCAnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHQvKiBwYW5uaW5nICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIHBhbkNhbWVyYVxuXHRcdFx0XHR2YXIgbW91c2VDaGFuZ2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgcGFuID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5wYW5DYW1lcmEgPSBmdW5jdGlvbiBwYW5DYW1lcmEoKSB7XG5cblx0XHRcdFx0XHRtb3VzZUNoYW5nZS5jb3B5KHRoaXMuX3BhbkVuZCkuc3ViKHRoaXMuX3BhblN0YXJ0KTtcblx0XHRcdFx0XHRpZiAobW91c2VDaGFuZ2UubGVuZ3RoU3EoKSkge1xuXHRcdFx0XHRcdFx0bW91c2VDaGFuZ2UubXVsdGlwbHlTY2FsYXIodGhpcy5fZXllLmxlbmd0aCgpICogdGhpcy5wYW5TcGVlZCk7XG5cdFx0XHRcdFx0XHRwYW4uY29weSh0aGlzLl9leWUpLmNyb3NzKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS54KTtcblx0XHRcdFx0XHRcdHBhbi5hZGQob2JqZWN0VXAuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueSkpO1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGQocGFuKTtcblx0XHRcdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLl9wYW5FbmQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHQvKiBwYW5uaW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnBhblNwZWVkID0gMC4zO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHpvb20gKyBwYW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCd6b29tK3BhbicsIHtcblx0XHRhZnRlcjogWyd6b29tJywgJ3BhbiddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLlRPVUNIX1pPT01fUEFOO1xuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSAwO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5fcGFuRW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXG5cdC8qIGxpdHRsZSBoYWNrIGZvciBhcGluYXRvbXktc3BlY2lmaWMgZnVuY3Rpb25hbGl0eSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdhcGluYXRvbXktc3BlY2lmaWMnLCB7XG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgnc2V0Q2FtZXJhRGlzdGFuY2UnLCBmdW5jdGlvbiBzZXRDYW1lcmFEaXN0YW5jZShkaXN0YW5jZSkge1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24ubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHRoZSBUcmFja2JhbGxDb250cm9scyBjbGFzcyAodmFyaWF0aW9uIHBvaW50KSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0VEhSRUUuVHJhY2tiYWxsQ29udHJvbHMgPSBkbS52cCgnVHJhY2tiYWxsQ29udHJvbHMnLFxuXHRcdFx0VS5uZXdDbGFzcyhmdW5jdGlvbiBUcmFja2JhbGxDb250cm9scyhjb250cm9sbGVkT2JqZWN0LCBkb21FbGVtZW50ID0gZG9jdW1lbnQpIHtcblxuXHRcdFx0XHQvKiBhcHBseSB0aGUgY29uc3RydWN0IG1ldGhvZCBwb3B1bGF0ZWQgYnkgZGVsdGFzICovXG5cdFx0XHRcdHRoaXMuY29uc3RydWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdFx0LyogZXhwbGljaXRseSB1cGRhdGUgaW4gdGhlIGJlZ2lubmluZyAqL1xuXHRcdFx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0XHR9LCBPYmplY3QuY3JlYXRlKFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUpKVxuXHQpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2e2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2Pi5jaXJjdWl0Ym9hcmR7cG9pbnRlci1ldmVudHM6dmlzaWJsZTstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO30udGhyZWUtZC1jYW52YXM+ZGl2PmNhbnZhc3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MTtwb2ludGVyLWV2ZW50czpub25lO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLmpzIn0=