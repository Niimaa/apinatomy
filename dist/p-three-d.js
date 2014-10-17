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
	  function sizeEqual(sizeA, sizeB) {
	    return sizeA && sizeB && sizeA.width === sizeB.width && sizeA.height === sizeB.height;
	  }
	  var PLANE = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	  var PROJECTOR = new THREE.Projector();
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d',
	    require: ['position-tracking'],
	    after: ['position-tracking']
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
	    Object.defineProperty(this, 'threeDMode', {
	      get: function() {
	        return !!this.threeDCanvasElement;
	      },
	      set: function(newThreeDMode) {
	        if (!!newThreeDMode) {
	          throw new Error("You cannot turn on 3D mode through the 'threeDMode' property. Do so by setting the 'threeDCanvasElement'.");
	        } else {
	          this.threeDCanvasElement = null;
	        }
	      }
	    });
	    this.on('threeDCanvasElement', (function(newCanvas, oldCanvas) {
	      if (newCanvas || oldCanvas) {
	        $__0.trigger('threeDMode', !!newCanvas);
	      }
	    }));
	    var _canvasSize = U.cached({
	      retrieve: (function() {
	        return ($__0.threeDCanvasElement && {
	          width: $__0.threeDCanvasElement.width(),
	          height: $__0.threeDCanvasElement.height()
	        });
	      }),
	      isEqual: sizeEqual
	    });
	    Object.defineProperty(this, 'threeDCanvasSize', {get: function() {
	        return _canvasSize();
	      }});
	    _canvasSize.onChange((function(newSize) {
	      $__0.trigger('threeDCanvasSize', newSize);
	    }));
	    $(window).resize(_canvasSize);
	    U.observable(this, {name: 'threeDControlsEnabled'});
	    this.on('threeDMode', (function(mode) {
	      if (mode) {
	        $__0._p_threeD_initialize();
	      }
	    }));
	    this.threeDCanvasElement = this.options.threeDCanvasElement;
	  });
	  plugin.add('_p_threeD_initialize', function() {
	    var $__0 = this;
	    this._p_threeD_initialMargin = {};
	    this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
	    this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
	    this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
	    this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;
	    this._p_threeD_scene = new THREE.Scene();
	    this._p_threeD_camera = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
	    this.on('threeDCanvasSize', (function(size) {
	      $__0._p_threeD_camera.aspect = size.width / size.height;
	    }));
	    this._p_threeD_camera.position.z = 1;
	    var ambientLight = new THREE.AmbientLight(0x101030);
	    this._p_threeD_scene.add(ambientLight);
	    var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
	    directionalLight1.position.set(1, -1, 1);
	    this._p_threeD_scene.add(directionalLight1);
	    var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
	    directionalLight2.position.set(-1, 1, -1);
	    this._p_threeD_scene.add(directionalLight2);
	    this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({
	      alpha: true,
	      antialias: true
	    });
	    this._p_threeD_renderer_webgl.sortObjects = false;
	    this._p_threeD_renderer_webgl.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
	    this.on('3d-render', (function() {
	      $__0._p_threeD_renderer_webgl.render($__0._p_threeD_scene, $__0._p_threeD_camera);
	    }));
	    this.on('threeDCanvasSize', (function(size) {
	      $__0._p_threeD_renderer_webgl.setSize(size.width, size.height);
	    }));
	    this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
	    $(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
	    this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
	    this._p_threeD_renderer_css.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
	    this.on('3d-render', (function() {
	      $__0._p_threeD_renderer_css.render($__0._p_threeD_scene, $__0._p_threeD_camera);
	    }));
	    this.on('threeDCanvasSize', (function(size) {
	      $__0._p_threeD_renderer_css.setSize(size.width, size.height);
	    }));
	    this.on('size', (function() {
	      $__0.trigger('3d-render');
	    }));
	    U.eachAnimationFrame((function() {
	      $__0.trigger('3d-render');
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
	    this.on('size', (function() {
	      $__0._p_threeD_controls.handleResize();
	    }));
	    this.on('3d-render', (function() {
	      $__0._p_threeD_controls.update();
	    }));
	    this.on('threeDControlsEnabled', (function(enabled) {
	      $__0._p_threeD_controls.enabled = enabled;
	    }));
	    var flatCircuitBoardElement = this.element;
	    this._p_threeD_circuitboard = new THREE.CSS3DObject(flatCircuitBoardElement[0]);
	    flatCircuitBoardElement.css({
	      left: 0,
	      top: 0,
	      bottom: 0,
	      right: 0
	    });
	    flatCircuitBoardElement.css('backfaceVisibility', 'hidden');
	    this._p_threeD_scene.add(this._p_threeD_circuitboard);
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
	      flatCircuitBoardElement.css(size);
	      backfaceElement.css(size);
	      backface.position.x = $__0._p_threeD_circuitboard.position.x = 0.5 * ($__0._p_threeD_initialMargin.left - $__0._p_threeD_initialMargin.right);
	      backface.position.y = $__0._p_threeD_circuitboard.position.y = 0.5 * ($__0._p_threeD_initialMargin.bottom - $__0._p_threeD_initialMargin.top);
	      $__0._p_threeD_controls.setCameraDistance($__0.threeDCanvasSize.height / (2 * Math.tan(THREE.Math.degToRad($__0._p_threeD_camera.fov) / 2)));
	    });
	    this.on('threeDCanvasSize', onCanvasResize);
	    onCanvasResize();
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var U = {
	    approx: function(val1, val2, epsilon) {
	      if (U.isUndefined(epsilon)) {
	        epsilon = 1e-5;
	      }
	      return (Math.abs(val1 - val2) < epsilon);
	    },
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    object: function(obj, name) {
	      if (!$.isPlainObject(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (!$.isArray(obj[name])) {
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
	          $__0 = 2; $__0 < arguments.length; $__0++)
	        args[$__0 - 2] = arguments[$__0];
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
	          $__1 = 0; $__1 < arguments.length; $__1++)
	        values[$__1] = arguments[$__1];
	      for (var i = 0; i < values.length; i += 1) {
	        if (U.isDefined(values[i])) {
	          return values[i];
	        }
	      }
	    },
	    forEachReverse: function(A, fn) {
	      var i = A.length;
	      while (i--) {
	        fn(A[i], i, A);
	      }
	    },
	    debounce: function(func, wait, context) {
	      var timeout;
	      return function() {
	        for (var args = [],
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          args[$__2] = arguments[$__2];
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
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          args[$__2] = arguments[$__2];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context, args);
	        }
	      };
	    },
	    observable: function(obj, $__3) {
	      var $__4 = $__3,
	          name = $__4.name,
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
	exports.push([module.id, ".three-d-canvas>div>div{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:0;pointer-events:none;}.three-d-canvas>div>div>.circuitboard{pointer-events:visible;}.three-d-canvas>div>canvas{display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0;z-index:1;pointer-events:none;}", ""]);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiODFiYWE5MmQ0YzE5MDVkNzFjMCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7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QjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiODFiYWE5MmQ0YzE5MDVkNzFjMFxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQndGhyZWUtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL0NTUzNEUmVuZGVyZXIuanMnLFxuXHQnLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzJyxcblx0Jy4vcC10aHJlZS1kLnNjc3MnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIHRlc3QgZm9yIGJyb3dzZXIgM0Qgc3VwcG9ydFxuXHQvL1xuXHRmdW5jdGlvbiBicm93c2VyU3VwcG9ydCgpIHtcblx0XHR2YXIgY2FudmFzO1xuXHRcdHRyeSB7XG5cdFx0XHRjYW52YXMgPSAkKCc8Y2FudmFzPicpO1xuXHRcdFx0cmV0dXJuICEhKGNhbnZhc1swXS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhc1swXS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSk7XG5cdFx0fSBjYXRjaCAoX18pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y2FudmFzID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdC8vXG5cdC8vIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciB0ZXN0aW5nIGVxdWFsaXR5IG9mIHNpemUgb2JqZWN0c1xuXHQvL1xuXHRmdW5jdGlvbiBzaXplRXF1YWwoc2l6ZUEsIHNpemVCKSB7XG5cdFx0cmV0dXJuIHNpemVBICYmIHNpemVCICYmIHNpemVBLndpZHRoID09PSBzaXplQi53aWR0aCAmJiBzaXplQS5oZWlnaHQgPT09IHNpemVCLmhlaWdodDtcblx0fVxuXG5cdC8vXG5cdC8vIHNvbWUgdXNlZnVsIGNvbnN0YW50cyBmb3IgbWFraW5nIGludGVyc2VjdGlvbiBjaGVja3Ncblx0Ly9cblx0dmFyIFBMQU5FID0gbmV3IFRIUkVFLlBsYW5lKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCAwKTtcblx0dmFyIFBST0pFQ1RPUiA9IG5ldyBUSFJFRS5Qcm9qZWN0b3IoKTtcblxuXHQvL1xuXHQvLyB0aGUgcGx1Z2luXG5cdC8vXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aHJlZS1kJyxcblx0XHRyZXF1aXJlOiBbJ3Bvc2l0aW9uLXRyYWNraW5nJ10sXG5cdFx0YWZ0ZXI6IFsncG9zaXRpb24tdHJhY2tpbmcnXVxuXHR9KS5tb2RpZnkoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUnKTtcblxuXHQvL1xuXHQvLyB0aGUgY29uc3RydWN0b3IgaXMgcnVuIG9uY2UgdG8gaW5pdGlhbGl6ZSBwb3RlbnRpYWwgM0QtbmVzc1xuXHQvL1xuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gdGVzdCBmb3IgYnJvd3NlciBzdXBwb3J0XG5cdFx0Ly9cblx0XHRpZiAoIWJyb3dzZXJTdXBwb3J0KCkpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHNlZW0gdG8gaGF2ZSBXZWJHTCBzdXBwb3J0LlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gdGhlICd0aHJlZURDYW52YXNFbGVtZW50JyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsIHsgbmFtZTogJ3RocmVlRENhbnZhc0VsZW1lbnQnIH0pO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc0VsZW1lbnQnLCAobmV3Q2FudmFzLCBvbGRDYW52YXMpID0+IHtcblx0XHRcdGlmIChvbGRDYW52YXMpIHsgb2xkQ2FudmFzLnJlbW92ZUNsYXNzKCd0aHJlZS1kLWNhbnZhcycpIH1cblx0XHRcdGlmIChuZXdDYW52YXMpIHsgbmV3Q2FudmFzLmFkZENsYXNzKCd0aHJlZS1kLWNhbnZhcycpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIHRoZSAndGhyZWVETW9kZScgcHJvcGVydHlcblx0XHQvL1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGhyZWVETW9kZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuICEhdGhpcy50aHJlZURDYW52YXNFbGVtZW50IH0sXG5cdFx0XHRzZXQobmV3VGhyZWVETW9kZSkge1xuXHRcdFx0XHRpZiAoISFuZXdUaHJlZURNb2RlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbm5vdCB0dXJuIG9uIDNEIG1vZGUgdGhyb3VnaCB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5LiBEbyBzbyBieSBzZXR0aW5nIHRoZSAndGhyZWVEQ2FudmFzRWxlbWVudCcuXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNFbGVtZW50JywgKG5ld0NhbnZhcywgb2xkQ2FudmFzKSA9PiB7XG5cdFx0XHRpZiAobmV3Q2FudmFzIHx8IG9sZENhbnZhcykge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3RocmVlRE1vZGUnLCAhIW5ld0NhbnZhcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBUaGUgJ3RocmVlRENhbnZhc1NpemUnIHByb3BlcnR5XG5cdFx0Ly9cblx0XHR2YXIgX2NhbnZhc1NpemUgPSBVLmNhY2hlZCh7XG5cdFx0XHRyZXRyaWV2ZTogKCkgPT4gKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCAmJiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKSxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuaGVpZ2h0KClcblx0XHRcdH0pLFxuXHRcdFx0aXNFcXVhbDogc2l6ZUVxdWFsXG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0aHJlZURDYW52YXNTaXplJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gX2NhbnZhc1NpemUoKSB9XG5cdFx0fSk7XG5cdFx0X2NhbnZhc1NpemUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50cmlnZ2VyKCd0aHJlZURDYW52YXNTaXplJywgbmV3U2l6ZSkgfSk7XG5cdFx0Ly9cblx0XHQvLyBmb3Igbm93LCB1c2luZyB3aW5kb3cgcmVzaXplIHRvIHRyaWdnZXIgY2FudmFzIHJlc2l6ZVxuXHRcdC8vXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZShfY2FudmFzU2l6ZSk7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gdGhlICd0aHJlZURDb250cm9sc0VuYWJsZWQnIHByb3BlcnR5XG5cdFx0Ly9cblx0XHRVLm9ic2VydmFibGUodGhpcywgeyBuYW1lOiAndGhyZWVEQ29udHJvbHNFbmFibGVkJyB9KTtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBJbml0aWFsaXplIHdoZW4gM0QgbW9kZSBpcyB0dXJuZWQgb25cblx0XHQvL1xuXHRcdHRoaXMub24oJ3RocmVlRE1vZGUnLCAobW9kZSkgPT4ge1xuXHRcdFx0aWYgKG1vZGUpIHsgdGhpcy5fcF90aHJlZURfaW5pdGlhbGl6ZSgpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIFdhcyBhIGNhbnZhcyBnaXZlbiB0aHJvdWdoIHRoZSBvcHRpb25zP1xuXHRcdC8vXG5cdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50ID0gdGhpcy5vcHRpb25zLnRocmVlRENhbnZhc0VsZW1lbnQ7XG5cblx0fSk7XG5cblx0Ly9cblx0Ly8gYF9wX3RocmVlRF9pbml0aWFsaXplYCBpcyBydW4gZXZlcnkgdGltZSAzRC1uZXNzIGlzIHR1cm5lZCBvblxuXHQvL1xuXHRwbHVnaW4uYWRkKCdfcF90aHJlZURfaW5pdGlhbGl6ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBEZXRlcm1pbmUgaW5pdGlhbCBjaXJjdWl0Ym9hcmQgcG9zaXRpb25pbmcgaW5zaWRlIHRoZSBjYW52YXNcblx0XHQvL1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4gPSB7fTtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCkubGVmdCAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS5sZWZ0O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wID0gdGhpcy5lbGVtZW50Lm9mZnNldCgpLnRvcCAtIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5vZmZzZXQoKS50b3A7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCA9IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAtIHRoaXMuc2l6ZS53aWR0aCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbSA9IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLSB0aGlzLnNpemUuaGVpZ2h0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3A7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBTY2VuZVxuXHRcdC8vXG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIENhbWVyYVxuXHRcdC8vXG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhID1cblx0XHRcdFx0bmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0LCAxLCAxMDAwMCk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIChzaXplKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5hc3BlY3QgPSBzaXplLndpZHRoIC8gc2l6ZS5oZWlnaHQgfSk7XG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uLnogPSAxO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gTGlnaHRpbmdcblx0XHQvL1xuXHRcdHZhciBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MTAxMDMwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MSA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0MS5wb3NpdGlvbi5zZXQoMSwgLTEsIDEpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MSk7XG5cdFx0Ly9cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodDIgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24uc2V0KC0xLCAxLCAtMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQyKTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIFJlbmRlcmVyOiBXZWJHTFxuXHRcdC8vXG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IHRydWUgfSk7XG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc29ydE9iamVjdHMgPSBmYWxzZTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5zZXRTaXplKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC53aWR0aCgpLCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuaGVpZ2h0KCkpO1xuXHRcdHRoaXMub24oJzNkLXJlbmRlcicsICgpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnJlbmRlcih0aGlzLl9wX3RocmVlRF9zY2VuZSwgdGhpcy5fcF90aHJlZURfY2FtZXJhKTtcblx0XHR9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgKHNpemUpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gUmVuZGVyZXI6IENTU1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2NzcyA9IG5ldyBUSFJFRS5DU1MzRFJlbmRlcmVyKCk7XG5cdFx0JCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MuZG9tRWxlbWVudCkuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLmRvbUVsZW1lbnQpO1xuXHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5hcHBlbmQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5zZXRTaXplKHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC53aWR0aCgpLCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuaGVpZ2h0KCkpO1xuXHRcdHRoaXMub24oJzNkLXJlbmRlcicsICgpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3Muc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBSZW5kZXIgb24gc2l6ZS1jaGFuZ2UgYW5kIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vXG5cdFx0dGhpcy5vbignc2l6ZScsICgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblx0XHRVLmVhY2hBbmltYXRpb25GcmFtZSgoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBDb250cm9sc1xuXHRcdC8vXG5cdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMgPSBuZXcgVEhSRUUuVHJhY2tiYWxsQ29udHJvbHModGhpcy5fcF90aHJlZURfY2FtZXJhLCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnRbMF0pO1xuXHRcdCQuZXh0ZW5kKHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLCB7XG5cdFx0XHRyb3RhdGVTcGVlZDogMS4wLFxuXHRcdFx0em9vbVNwZWVkOiAxLjIsXG5cdFx0XHRwYW5TcGVlZDogMC44LFxuXHRcdFx0bm9ab29tOiBmYWxzZSxcblx0XHRcdG5vUGFuOiBmYWxzZSxcblx0XHRcdHN0YXRpY01vdmluZzogdHJ1ZSxcblx0XHRcdGR5bmFtaWNEYW1waW5nRmFjdG9yOiAwLjMsXG5cdFx0XHRrZXlzOiBbNjUsIDgzLCA2OF1cblx0XHR9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfSk7XG5cdFx0dGhpcy5vbignc2l6ZScsICgpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMuaGFuZGxlUmVzaXplKCkgfSk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJywgKCkgPT4geyB0aGlzLl9wX3RocmVlRF9jb250cm9scy51cGRhdGUoKSB9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDb250cm9sc0VuYWJsZWQnLCAoZW5hYmxlZCkgPT4geyB0aGlzLl9wX3RocmVlRF9jb250cm9scy5lbmFibGVkID0gZW5hYmxlZCB9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIEZsb2F0aW5nIFRpbGVtYXBcblx0XHQvL1xuXHRcdHZhciBmbGF0Q2lyY3VpdEJvYXJkRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblx0XHR0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQgPSBuZXcgVEhSRUUuQ1NTM0RPYmplY3QoZmxhdENpcmN1aXRCb2FyZEVsZW1lbnRbMF0pO1xuXHRcdGZsYXRDaXJjdWl0Qm9hcmRFbGVtZW50LmNzcyh7IGxlZnQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogMCB9KTsgLy8gVE9ETzogc2F2ZSBhbmQgcmVzdG9yZSBsYXRlclxuXHRcdGZsYXRDaXJjdWl0Qm9hcmRFbGVtZW50LmNzcygnYmFja2ZhY2VWaXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZCh0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQpO1xuXHRcdC8vXG5cdFx0Ly8gVGlsZW1hcCBCYWNrZmFjZVxuXHRcdHZhciBiYWNrZmFjZUVsZW1lbnQgPSAkKCc8ZGl2PicpLmNzcyh7XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdGJvcmRlcjogJ3NvbGlkIDFweCBibGFjaycsXG5cdFx0XHRiYWNrZmFjZVZpc2liaWxpdHk6ICdoaWRkZW4nXG5cdFx0fSk7XG5cdFx0dmFyIGJhY2tmYWNlID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KGJhY2tmYWNlRWxlbWVudFswXSk7XG5cdFx0YmFja2ZhY2Uucm90YXRpb24uc2V0KE1hdGguUEksIDAsIDApO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChiYWNrZmFjZSk7XG5cdFx0Ly9cblx0XHQvLyByZXNwb25kIHRvIHJlc2l6ZVxuXHRcdHZhciBvbkNhbnZhc1Jlc2l6ZSA9ICgpID0+IHtcblx0XHRcdC8vIHNpemluZyBhbmQgcG9zaXRpb25pbmcgb2YgdGhlIGNpcmN1aXQtYm9hcmQgYW5kIGJhY2tmYWNlXG5cdFx0XHR2YXIgc2l6ZSA9IHtcblx0XHRcdFx0d2lkdGg6IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQsXG5cdFx0XHRcdGhlaWdodDogdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b21cblx0XHRcdH07XG5cdFx0XHRmbGF0Q2lyY3VpdEJvYXJkRWxlbWVudC5jc3Moc2l6ZSk7XG5cdFx0XHRiYWNrZmFjZUVsZW1lbnQuY3NzKHNpemUpO1xuXHRcdFx0YmFja2ZhY2UucG9zaXRpb24ueCA9IHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZC5wb3NpdGlvbi54ID0gMC41ICogKHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQpO1xuXHRcdFx0YmFja2ZhY2UucG9zaXRpb24ueSA9IHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZC5wb3NpdGlvbi55ID0gMC41ICogKHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3ApO1xuXG5cdFx0XHQvLyBzZXQgdGhlIGNhbWVyYSBkaXN0YW5jZSB0byBjb3JyZXNwb25kXG5cdFx0XHR0aGlzLl9wX3RocmVlRF9jb250cm9scy5zZXRDYW1lcmFEaXN0YW5jZShcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC9cblx0XHRcdFx0XHQoMiAqIE1hdGgudGFuKFRIUkVFLk1hdGguZGVnVG9SYWQodGhpcy5fcF90aHJlZURfY2FtZXJhLmZvdikgLyAyKSlcblx0XHRcdCk7XG5cdFx0fTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgb25DYW52YXNSZXNpemUpO1xuXHRcdG9uQ2FudmFzUmVzaXplKCk7XG5cblx0fSk7XG5cblx0Ly9cblx0Ly8gYHRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkYCBoYXMgbm8gc2lkZS1lZmZlY3RzIGFuZCBjYW4gYmUgdXNlZFxuXHQvLyBmcm9tIHRoZSBvdXRzaWRlIHRvIHRyYW5zbGF0ZSBsZWZ0L3RvcCBjb29yZGluYXRlcyBvbiB0aGUgc2NyZWVuIHRvIGxlZnQvdG9wXG5cdC8vIGNvb3JkaW5hdGVzIG9mIHRoZSBwcml2YXRlIGNvb3JkaW5hdGUtc3lzdGVtIG9mIHRoZSBjaXJjdWl0Ym9hcmQsIGhvd2V2ZXIgaXQgaXNcblx0Ly8gb3JpZW50ZWQgaW4gM0Qgc3BhY2UuXG5cdC8vXG5cdHBsdWdpbi5hZGQoJ3RyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkJywgZnVuY3Rpb24gKHBvc2l0aW9uT25DYW52YXMpIHtcblxuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHR2YXIgbW91c2UzRCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0bW91c2UzRC54ID0gcG9zaXRpb25PbkNhbnZhcy5sZWZ0IC8gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoICogMiAtIDE7XG5cdFx0bW91c2UzRC55ID0gLXBvc2l0aW9uT25DYW52YXMudG9wIC8gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAqIDIgKyAxO1xuXHRcdG1vdXNlM0QueiA9IDAuNTtcblx0XHRQUk9KRUNUT1IudW5wcm9qZWN0VmVjdG9yKG1vdXNlM0QsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSk7XG5cdFx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkodGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uLCBtb3VzZTNELnN1Yih0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24pLm5vcm1hbGl6ZSgpKTtcblx0XHR2YXIgaW50ZXJzZWN0cyA9IHJheS5pbnRlcnNlY3RQbGFuZShQTEFORSk7XG5cblx0XHQvLyBpZiB0aGUgdGVzdGVkIGludGVyc2VjdGlvbiBpcyBvdXQgb2YgcmFuZ2UsIHJldHVybiB1bmRlZmluZWRcblx0XHRpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRsZWZ0OiBpbnRlcnNlY3RzLnggKyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0LFxuXHRcdFx0dG9wOiAtaW50ZXJzZWN0cy55ICsgdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcFxuXHRcdH07XG5cblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRocmVlLWQuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGVxdWFsaXR5IHdpdGggYSB0b2xlcmFuY2Ugb2YgZXBzaWxvblxuXHRcdC8vXG5cdFx0YXBwcm94OiBmdW5jdGlvbiAodmFsMSwgdmFsMiwgZXBzaWxvbikge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZXBzaWxvbikpIHsgZXBzaWxvbiA9IDFlLTUgfVxuXHRcdFx0cmV0dXJuIChNYXRoLmFicyh2YWwxIC0gdmFsMikgPCBlcHNpbG9uKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHQvL1xuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc1BsYWluT2JqZWN0KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdC8vXG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNBcnJheShvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHQvL1xuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHQvL1xuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdC8vXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0Ly9cblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdC8vXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0Ly9cblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdC8vXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdC8vXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHQvL1xuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdC8vXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdC8vXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBgQS5mb3JFYWNoYCwgZXhjZXB0IGl0IGl0ZXJhdGVzIGZyb20gcmlnaHQgdG8gbGVmdFxuXHRcdC8vXG5cdFx0Zm9yRWFjaFJldmVyc2UoQSwgZm4pIHtcblx0XHRcdHZhciBpID0gQS5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaS0tKSB7IGZuKEFbaV0sIGksIEEpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdC8vXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdC8vXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHQvL1xuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhlIGdpdmVuIG9iamVjdDtcblx0XHQvLyB0aGlzIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmUgYSBgdHJpZ2dlcmAgbWV0aG9kXG5cdFx0Ly9cblx0XHQvLyBvcHRpb25zLm5hbWUgKG1hbmRhdG9yeSkgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcblx0XHQvLyBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgb3IgYW55IHRyYW5zZm9ybWF0aW9uLiBJdCBjYW4gYWxzbyB0aHJvdyBhbiBleGNlcHRpb24sIHdoaWNoIHdpbGwganVzdCBiZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLlxuXHRcdC8vXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Ly9cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Ly9cblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0Ly9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKFsndGhyZWUtanMnXSwgZnVuY3Rpb24gKFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQmFzZWQgb24gaHR0cDovL3d3dy5lbWFnaXgubmV0L2FjYWRlbWljL21zY3MtcHJvamVjdC9pdGVtL2NhbWVyYS1zeW5jLXdpdGgtY3NzMy1hbmQtd2ViZ2wtdGhyZWVqc1xuXHQgKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuXHQgKi9cblxuXHRUSFJFRS5DU1MzRE9iamVjdCA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLk9iamVjdDNELmNhbGwoIHRoaXMgKTtcblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3JlbW92ZWQnLCBmdW5jdGlvbiAoIC8qZXZlbnQqLyApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLk9iamVjdDNELnByb3RvdHlwZSApO1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuQ1NTM0RPYmplY3QuY2FsbCggdGhpcywgZWxlbWVudCApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlICk7XG5cblx0Ly9cblxuXHRUSFJFRS5DU1MzRFJlbmRlcmVyID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0Y29uc29sZS5sb2coICdUSFJFRS5DU1MzRFJlbmRlcmVyJywgVEhSRUUuUkVWSVNJT04gKTtcblxuXHRcdHZhciBfd2lkdGgsIF9oZWlnaHQ7XG5cdFx0dmFyIF93aWR0aEhhbGYsIF9oZWlnaHRIYWxmO1xuXG5cdFx0dmFyIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0XHR2YXIgY2FjaGUgPSB7XG5cdFx0XHRjYW1lcmE6IHsgZm92OiAwLCBzdHlsZTogJycgfSxcblx0XHRcdG9iamVjdHM6IHt9XG5cdFx0fTtcblxuXHRcdHZhciBkb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0XHRkb21FbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cblx0XHRkb21FbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRkb21FbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRkb21FbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuXG5cdFx0dmFyIGNhbWVyYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0ZG9tRWxlbWVudC5hcHBlbmRDaGlsZCggY2FtZXJhRWxlbWVudCApO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0U2l6ZSA9IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcblxuXHRcdFx0X3dpZHRoID0gd2lkdGg7XG5cdFx0XHRfaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0XHRfd2lkdGhIYWxmID0gX3dpZHRoIC8gMjtcblx0XHRcdF9oZWlnaHRIYWxmID0gX2hlaWdodCAvIDI7XG5cblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGVwc2lsb24gPSBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5hYnMoIHZhbHVlICkgPCAwLjAwMDAwMSA/IDAgOiB2YWx1ZTtcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0Q2FtZXJhQ1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICdtYXRyaXgzZCgnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgMTMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuXHRcdFx0JyknO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRPYmplY3RDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ3RyYW5zbGF0ZTNkKC01MCUsLTUwJSwwKSBtYXRyaXgzZCgnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuXHRcdFx0JyknO1xuXG5cdFx0fTtcblxuXHRcdHZhciByZW5kZXJPYmplY3QgPSBmdW5jdGlvbiAoIG9iamVjdCwgY2FtZXJhICkge1xuXG5cdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkNTUzNET2JqZWN0ICkge1xuXG5cdFx0XHRcdHZhciBzdHlsZTtcblxuXHRcdFx0XHRpZiAoIG9iamVjdCBpbnN0YW5jZW9mIFRIUkVFLkNTUzNEU3ByaXRlICkge1xuXG5cdFx0XHRcdFx0Ly8gaHR0cDovL3N3aWZ0Y29kZXIud29yZHByZXNzLmNvbS8yMDA4LzExLzI1L2NvbnN0cnVjdGluZy1hLWJpbGxib2FyZC1tYXRyaXgvXG5cblx0XHRcdFx0XHRtYXRyaXguY29weSggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuXHRcdFx0XHRcdG1hdHJpeC50cmFuc3Bvc2UoKTtcblx0XHRcdFx0XHRtYXRyaXguY29weVBvc2l0aW9uKCBvYmplY3QubWF0cml4V29ybGQgKTtcblx0XHRcdFx0XHRtYXRyaXguc2NhbGUoIG9iamVjdC5zY2FsZSApO1xuXG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAzIF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDExIF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTUgXSA9IDE7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggbWF0cml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBvYmplY3QubWF0cml4V29ybGQgKTtcblxuXG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBlbGVtZW50ID0gb2JqZWN0LmVsZW1lbnQ7XG5cdFx0XHRcdHZhciBjYWNoZWRTdHlsZSA9IGNhY2hlLm9iamVjdHNbIG9iamVjdC5pZCBdO1xuXG5cdFx0XHRcdGlmICggY2FjaGVkU3R5bGUgPT09IHVuZGVmaW5lZCB8fCBjYWNoZWRTdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRcdGNhY2hlLm9iamVjdHNbIG9iamVjdC5pZCBdID0gc3R5bGU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggZWxlbWVudC5wYXJlbnROb2RlICE9PSBjYW1lcmFFbGVtZW50ICkge1xuXG5cdFx0XHRcdFx0Y2FtZXJhRWxlbWVudC5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0XHRyZW5kZXJPYmplY3QoIG9iamVjdC5jaGlsZHJlblsgaSBdLCBjYW1lcmEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCBzY2VuZSwgY2FtZXJhICkge1xuXG5cdFx0XHR2YXIgZm92ID0gMC41IC8gTWF0aC50YW4oIFRIUkVFLk1hdGguZGVnVG9SYWQoIGNhbWVyYS5mb3YgKiAwLjUgKSApICogX2hlaWdodDtcblxuXHRcdFx0aWYgKCBjYWNoZS5jYW1lcmEuZm92ICE9PSBmb3YgKSB7XG5cblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5XZWJraXRQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5Nb3pQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5vUGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdGRvbUVsZW1lbnQuc3R5bGUucGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLmZvdiA9IGZvdjtcblxuXHRcdFx0fVxuXG5cdFx0XHRzY2VuZS51cGRhdGVNYXRyaXhXb3JsZCgpO1xuXG5cdFx0XHRpZiAoIGNhbWVyYS5wYXJlbnQgPT09IHVuZGVmaW5lZCApIHsgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCkgfVxuXG5cdFx0XHRjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlLmdldEludmVyc2UoIGNhbWVyYS5tYXRyaXhXb3JsZCApO1xuXG5cdFx0XHR2YXIgc3R5bGUgPSBcInRyYW5zbGF0ZTNkKDAsMCxcIiArIGZvdiArIFwicHgpXCIgKyBnZXRDYW1lcmFDU1NNYXRyaXgoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKSArXG5cdFx0XHRcdFwiIHRyYW5zbGF0ZTNkKFwiICsgX3dpZHRoSGFsZiArIFwicHgsXCIgKyBfaGVpZ2h0SGFsZiArIFwicHgsIDApXCI7XG5cblxuXHRcdFx0aWYgKCBjYWNoZS5jYW1lcmEuc3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5zdHlsZSA9IHN0eWxlO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJlbmRlck9iamVjdCggc2NlbmUsIGNhbWVyYSApO1xuXG5cdFx0fTtcblxuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvQ1NTM0RSZW5kZXJlci5qc1xuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uIChUSFJFRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5cdC8qKlxuXHQgKiBAYXV0aG9yIEViZXJoYXJkIEdyYWV0aGVyIC8gaHR0cDovL2VncmFldGhlci5jb20vXG5cdCAqIEBhdXRob3IgTWFyayBMdW5kaW4gICAgLyBodHRwOi8vbWFyay1sdW5kaW4uY29tXG5cdCAqL1xuXG5cdFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzID0gZnVuY3Rpb24gKG9iamVjdCwgZG9tRWxlbWVudCkge1xuXG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHR2YXIgU1RBVEUgPSB7IE5PTkU6IC0xLCBST1RBVEU6IDAsIFpPT006IDEsIFBBTjogMiwgVE9VQ0hfUk9UQVRFOiAzLCBUT1VDSF9aT09NX1BBTjogNCB9O1xuXG5cdFx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdFx0dGhpcy5kb21FbGVtZW50ID0gKCBkb21FbGVtZW50ICE9PSB1bmRlZmluZWQgKSA/IGRvbUVsZW1lbnQgOiBkb2N1bWVudDtcblxuXHRcdC8vIEFQSVxuXG5cdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdHRoaXMuc2NyZWVuID0geyBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcblxuXHRcdHRoaXMucm90YXRlU3BlZWQgPSAxLjA7XG5cdFx0dGhpcy56b29tU3BlZWQgPSAxLjI7XG5cdFx0dGhpcy5wYW5TcGVlZCA9IDAuMztcblxuXHRcdHRoaXMubm9Sb3RhdGUgPSBmYWxzZTtcblx0XHR0aGlzLm5vWm9vbSA9IGZhbHNlO1xuXHRcdHRoaXMubm9QYW4gPSBmYWxzZTtcblx0XHR0aGlzLm5vUm9sbCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5zdGF0aWNNb3ZpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmR5bmFtaWNEYW1waW5nRmFjdG9yID0gMC4yO1xuXG5cdFx0dGhpcy5taW5EaXN0YW5jZSA9IDA7XG5cdFx0dGhpcy5tYXhEaXN0YW5jZSA9IEluZmluaXR5O1xuXG5cdFx0dGhpcy5rZXlzID0gWyA2NSAvKkEqLywgODMgLypTKi8sIDY4IC8qRCovIF07XG5cblx0XHQvLyBpbnRlcm5hbHNcblxuXHRcdHRoaXMudGFyZ2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHZhciBFUFMgPSAwLjAwMDAwMTtcblxuXHRcdHZhciBsYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0dmFyIF9zdGF0ZSA9IFNUQVRFLk5PTkUsXG5cdFx0XHRfcHJldlN0YXRlID0gU1RBVEUuTk9ORSxcblxuXHRcdFx0X2V5ZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cblx0XHRcdF9yb3RhdGVTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRfcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblxuXHRcdFx0X3pvb21TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRfem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cblx0XHRcdF90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gMCxcblx0XHRcdF90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDAsXG5cblx0XHRcdF9wYW5TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRfcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdC8vIGZvciByZXNldFxuXG5cdFx0dGhpcy50YXJnZXQwID0gdGhpcy50YXJnZXQuY2xvbmUoKTtcblx0XHR0aGlzLnBvc2l0aW9uMCA9IHRoaXMub2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG5cdFx0dGhpcy51cDAgPSB0aGlzLm9iamVjdC51cC5jbG9uZSgpO1xuXG5cdFx0Ly8gZXZlbnRzXG5cblx0XHR2YXIgY2hhbmdlRXZlbnQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cdFx0dmFyIHN0YXJ0RXZlbnQgPSB7IHR5cGU6ICdzdGFydCd9O1xuXHRcdHZhciBlbmRFdmVudCA9IHsgdHlwZTogJ2VuZCd9O1xuXG5cblx0XHQvLyBtZXRob2RzXG5cblx0XHR0aGlzLmhhbmRsZVJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKHRoaXMuZG9tRWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcblxuXHRcdFx0XHR0aGlzLnNjcmVlbi5sZWZ0ID0gMDtcblx0XHRcdFx0dGhpcy5zY3JlZW4udG9wID0gMDtcblx0XHRcdFx0dGhpcy5zY3JlZW4ud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdFx0dGhpcy5zY3JlZW4uaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHZhciBib3ggPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdC8vIGFkanVzdG1lbnRzIGNvbWUgZnJvbSBzaW1pbGFyIGNvZGUgaW4gdGhlIGpxdWVyeSBvZmZzZXQoKSBmdW5jdGlvblxuXHRcdFx0XHR2YXIgZCA9IHRoaXMuZG9tRWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XHRcdFx0dGhpcy5zY3JlZW4ubGVmdCA9IGJveC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0IC0gZC5jbGllbnRMZWZ0O1xuXHRcdFx0XHR0aGlzLnNjcmVlbi50b3AgPSBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gZC5jbGllbnRUb3A7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLndpZHRoID0gYm94LndpZHRoO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5oZWlnaHQgPSBib3guaGVpZ2h0O1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRpZiAodHlwZW9mIHRoaXNbIGV2ZW50LnR5cGUgXSA9PSAnZnVuY3Rpb24nKSB7XG5cblx0XHRcdFx0dGhpc1sgZXZlbnQudHlwZSBdKGV2ZW50KTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRNb3VzZU9uU2NyZWVuID0gKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHBhZ2VYLCBwYWdlWSkge1xuXG5cdFx0XHRcdHZlY3Rvci5zZXQoXG5cdFx0XHRcdFx0XHQoIHBhZ2VYIC0gX3RoaXMuc2NyZWVuLmxlZnQgKSAvIF90aGlzLnNjcmVlbi53aWR0aCxcblx0XHRcdFx0XHRcdCggcGFnZVkgLSBfdGhpcy5zY3JlZW4udG9wICkgLyBfdGhpcy5zY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0cmV0dXJuIHZlY3RvcjtcblxuXHRcdFx0fTtcblxuXHRcdH0oKSApO1xuXG5cdFx0dmFyIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbCA9ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHR2YXIgbW91c2VPbkJhbGwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHBhZ2VYLCBwYWdlWSkge1xuXG5cdFx0XHRcdG1vdXNlT25CYWxsLnNldChcblx0XHRcdFx0XHRcdCggcGFnZVggLSBfdGhpcy5zY3JlZW4ud2lkdGggKiAwLjUgLSBfdGhpcy5zY3JlZW4ubGVmdCApIC8gKF90aGlzLnNjcmVlbi53aWR0aCAqIC41KSxcblx0XHRcdFx0XHRcdCggX3RoaXMuc2NyZWVuLmhlaWdodCAqIDAuNSArIF90aGlzLnNjcmVlbi50b3AgLSBwYWdlWSApIC8gKF90aGlzLnNjcmVlbi5oZWlnaHQgKiAuNSksXG5cdFx0XHRcdFx0MC4wXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0dmFyIGxlbmd0aCA9IG1vdXNlT25CYWxsLmxlbmd0aCgpO1xuXG5cdFx0XHRcdGlmIChfdGhpcy5ub1JvbGwpIHtcblxuXHRcdFx0XHRcdGlmIChsZW5ndGggPCBNYXRoLlNRUlQxXzIpIHtcblxuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwueiA9IE1hdGguc3FydCgxLjAgLSBsZW5ndGggKiBsZW5ndGgpO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwueiA9IC41IC8gbGVuZ3RoO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSBpZiAobGVuZ3RoID4gMS4wKSB7XG5cblx0XHRcdFx0XHRtb3VzZU9uQmFsbC5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0bW91c2VPbkJhbGwueiA9IE1hdGguc3FydCgxLjAgLSBsZW5ndGggKiBsZW5ndGgpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfZXllLmNvcHkoX3RoaXMub2JqZWN0LnBvc2l0aW9uKS5zdWIoX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0XHR2ZWN0b3IuY29weShfdGhpcy5vYmplY3QudXApLnNldExlbmd0aChtb3VzZU9uQmFsbC55KTtcblx0XHRcdFx0dmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KF90aGlzLm9iamVjdC51cCkuY3Jvc3MoX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcblx0XHRcdFx0dmVjdG9yLmFkZChfZXllLnNldExlbmd0aChtb3VzZU9uQmFsbC56KSk7XG5cblx0XHRcdFx0cmV0dXJuIHZlY3RvcjtcblxuXHRcdFx0fTtcblxuXHRcdH0oKSApO1xuXG5cdFx0dGhpcy5yb3RhdGVDYW1lcmEgPSAoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRcdHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dmFyIGFuZ2xlID0gTWF0aC5hY29zKF9yb3RhdGVTdGFydC5kb3QoX3JvdGF0ZUVuZCkgLyBfcm90YXRlU3RhcnQubGVuZ3RoKCkgLyBfcm90YXRlRW5kLmxlbmd0aCgpKTtcblxuXHRcdFx0XHRpZiAoYW5nbGUpIHtcblxuXHRcdFx0XHRcdGF4aXMuY3Jvc3NWZWN0b3JzKF9yb3RhdGVTdGFydCwgX3JvdGF0ZUVuZCkubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0XHRhbmdsZSAqPSBfdGhpcy5yb3RhdGVTcGVlZDtcblxuXHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuXG5cdFx0XHRcdFx0X2V5ZS5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0X3RoaXMub2JqZWN0LnVwLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblxuXHRcdFx0XHRcdF9yb3RhdGVFbmQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0aWYgKF90aGlzLnN0YXRpY01vdmluZykge1xuXG5cdFx0XHRcdFx0XHRfcm90YXRlU3RhcnQuY29weShfcm90YXRlRW5kKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCBhbmdsZSAqICggX3RoaXMuZHluYW1pY0RhbXBpbmdGYWN0b3IgLSAxLjAgKSk7XG5cdFx0XHRcdFx0XHRfcm90YXRlU3RhcnQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0oKSk7XG5cblx0XHR0aGlzLnpvb21DYW1lcmEgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmIChfc3RhdGUgPT09IFNUQVRFLlRPVUNIX1pPT01fUEFOKSB7XG5cblx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNEdXBsaWNhdGVkRGVjbGFyYXRpb25cblx0XHRcdFx0dmFyIGZhY3RvciA9IF90b3VjaFpvb21EaXN0YW5jZVN0YXJ0IC8gX3RvdWNoWm9vbURpc3RhbmNlRW5kO1xuXHRcdFx0XHRfdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IF90b3VjaFpvb21EaXN0YW5jZUVuZDtcblx0XHRcdFx0X2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTRHVwbGljYXRlZERlY2xhcmF0aW9uXG5cdFx0XHRcdHZhciBmYWN0b3IgPSAxLjAgKyAoIF96b29tRW5kLnkgLSBfem9vbVN0YXJ0LnkgKSAqIF90aGlzLnpvb21TcGVlZDtcblxuXHRcdFx0XHRpZiAoZmFjdG9yICE9PSAxLjAgJiYgZmFjdG9yID4gMC4wKSB7XG5cblx0XHRcdFx0XHRfZXllLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG5cblx0XHRcdFx0XHRpZiAoX3RoaXMuc3RhdGljTW92aW5nKSB7XG5cblx0XHRcdFx0XHRcdF96b29tU3RhcnQuY29weShfem9vbUVuZCk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRfem9vbVN0YXJ0LnkgKz0gKCBfem9vbUVuZC55IC0gX3pvb21TdGFydC55ICkgKiB0aGlzLmR5bmFtaWNEYW1waW5nRmFjdG9yO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMucGFuQ2FtZXJhID0gKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIG1vdXNlQ2hhbmdlID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0b2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0XHRwYW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdG1vdXNlQ2hhbmdlLmNvcHkoX3BhbkVuZCkuc3ViKF9wYW5TdGFydCk7XG5cblx0XHRcdFx0aWYgKG1vdXNlQ2hhbmdlLmxlbmd0aFNxKCkpIHtcblxuXHRcdFx0XHRcdG1vdXNlQ2hhbmdlLm11bHRpcGx5U2NhbGFyKF9leWUubGVuZ3RoKCkgKiBfdGhpcy5wYW5TcGVlZCk7XG5cblx0XHRcdFx0XHRwYW4uY29weShfZXllKS5jcm9zcyhfdGhpcy5vYmplY3QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS54KTtcblx0XHRcdFx0XHRwYW4uYWRkKG9iamVjdFVwLmNvcHkoX3RoaXMub2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueSkpO1xuXG5cdFx0XHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLmFkZChwYW4pO1xuXHRcdFx0XHRcdF90aGlzLnRhcmdldC5hZGQocGFuKTtcblxuXHRcdFx0XHRcdGlmIChfdGhpcy5zdGF0aWNNb3ZpbmcpIHtcblxuXHRcdFx0XHRcdFx0X3BhblN0YXJ0LmNvcHkoX3BhbkVuZCk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRfcGFuU3RhcnQuYWRkKG1vdXNlQ2hhbmdlLnN1YlZlY3RvcnMoX3BhbkVuZCwgX3BhblN0YXJ0KS5tdWx0aXBseVNjYWxhcihfdGhpcy5keW5hbWljRGFtcGluZ0ZhY3RvcikpO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0oKSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBBZGRlZCBmb3IgQXBpTkFUT01ZXG5cdFx0Ly9cblx0XHR0aGlzLnNldENhbWVyYURpc3RhbmNlID0gZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG5cdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24ubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpO1xuXHRcdH07XG5cdFx0Ly8vLy8vXG5cblxuXHRcdHRoaXMuY2hlY2tEaXN0YW5jZXMgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmICghX3RoaXMubm9ab29tIHx8ICFfdGhpcy5ub1Bhbikge1xuXG5cdFx0XHRcdGlmIChfZXllLmxlbmd0aFNxKCkgPiBfdGhpcy5tYXhEaXN0YW5jZSAqIF90aGlzLm1heERpc3RhbmNlKSB7XG5cblx0XHRcdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uYWRkVmVjdG9ycyhfdGhpcy50YXJnZXQsIF9leWUuc2V0TGVuZ3RoKF90aGlzLm1heERpc3RhbmNlKSk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfZXllLmxlbmd0aFNxKCkgPCBfdGhpcy5taW5EaXN0YW5jZSAqIF90aGlzLm1pbkRpc3RhbmNlKSB7XG5cblx0XHRcdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uYWRkVmVjdG9ycyhfdGhpcy50YXJnZXQsIF9leWUuc2V0TGVuZ3RoKF90aGlzLm1pbkRpc3RhbmNlKSk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdF9leWUuc3ViVmVjdG9ycyhfdGhpcy5vYmplY3QucG9zaXRpb24sIF90aGlzLnRhcmdldCk7XG5cblx0XHRcdGlmICghX3RoaXMubm9Sb3RhdGUpIHtcblxuXHRcdFx0XHRfdGhpcy5yb3RhdGVDYW1lcmEoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIV90aGlzLm5vWm9vbSkge1xuXG5cdFx0XHRcdF90aGlzLnpvb21DYW1lcmEoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIV90aGlzLm5vUGFuKSB7XG5cblx0XHRcdFx0X3RoaXMucGFuQ2FtZXJhKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLmFkZFZlY3RvcnMoX3RoaXMudGFyZ2V0LCBfZXllKTtcblxuXHRcdFx0X3RoaXMuY2hlY2tEaXN0YW5jZXMoKTtcblxuXHRcdFx0X3RoaXMub2JqZWN0Lmxvb2tBdChfdGhpcy50YXJnZXQpO1xuXG5cdFx0XHRpZiAobGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKF90aGlzLm9iamVjdC5wb3NpdGlvbikgPiBFUFMpIHtcblxuXHRcdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuXHRcdFx0XHRsYXN0UG9zaXRpb24uY29weShfdGhpcy5vYmplY3QucG9zaXRpb24pO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0X3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdF9wcmV2U3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0XHRfdGhpcy50YXJnZXQuY29weShfdGhpcy50YXJnZXQwKTtcblx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5jb3B5KF90aGlzLnBvc2l0aW9uMCk7XG5cdFx0XHRfdGhpcy5vYmplY3QudXAuY29weShfdGhpcy51cDApO1xuXG5cdFx0XHRfZXllLnN1YlZlY3RvcnMoX3RoaXMub2JqZWN0LnBvc2l0aW9uLCBfdGhpcy50YXJnZXQpO1xuXG5cdFx0XHRfdGhpcy5vYmplY3QubG9va0F0KF90aGlzLnRhcmdldCk7XG5cblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG5cdFx0XHRsYXN0UG9zaXRpb24uY29weShfdGhpcy5vYmplY3QucG9zaXRpb24pO1xuXG5cdFx0fTtcblxuXHRcdC8vIGxpc3RlbmVyc1xuXG4vLyAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8vIGFkZGVkIGZyb20gaHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHMuanMgZm9yIEFwaU5BVE9NWVxuXHRcdHZhciBfYW15X3ZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHZhciBLRVlCT0FSRF9WRUxPQ0lUWSA9IDU7XG5cblx0XHQvLyBhZGRlZCBmcm9tIGh0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy9qcy9jb250cm9scy9Qb2ludGVyTG9ja0NvbnRyb2xzLmpzXG5cdFx0ZnVuY3Rpb24ga2V5ZG93biggZXZlbnQgKSB7XG5cblx0XHRcdC8vbm9pbnNwZWN0aW9uIENvZmZlZVNjcmlwdFN3aXRjaFN0YXRlbWVudFdpdGhOb0RlZmF1bHRCcmFuY2hcblx0XHRcdHN3aXRjaCAoIGV2ZW50LmtleUNvZGUgKSB7XG5cblx0XHRcdFx0Y2FzZSAzODogLy8gdXBcblx0XHRcdFx0Y2FzZSA4NzogLy8gd1xuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueSA9IEtFWUJPQVJEX1ZFTE9DSVRZO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMzc6IC8vIGxlZnRcblx0XHRcdFx0Y2FzZSA2NTogLy8gYVxuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueCA9IC1LRVlCT0FSRF9WRUxPQ0lUWTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDQwOiAvLyBkb3duXG5cdFx0XHRcdGNhc2UgODM6IC8vIHNcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnkgPSAtS0VZQk9BUkRfVkVMT0NJVFk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzOTogLy8gcmlnaHRcblx0XHRcdFx0Y2FzZSA2ODogLy8gZFxuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueCA9IEtFWUJPQVJEX1ZFTE9DSVRZO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBhZGRlZCBmcm9tIGh0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy9qcy9jb250cm9scy9Qb2ludGVyTG9ja0NvbnRyb2xzLmpzXG5cdFx0ZnVuY3Rpb24ga2V5dXAoIGV2ZW50ICkge1xuXG5cdFx0XHQvL25vaW5zcGVjdGlvbiBDb2ZmZWVTY3JpcHRTd2l0Y2hTdGF0ZW1lbnRXaXRoTm9EZWZhdWx0QnJhbmNoXG5cdFx0XHRzd2l0Y2goIGV2ZW50LmtleUNvZGUgKSB7XG5cblx0XHRcdFx0Y2FzZSAzODogLy8gdXBcblx0XHRcdFx0Y2FzZSA4NzogLy8gd1xuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueSA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzNzogLy8gbGVmdFxuXHRcdFx0XHRjYXNlIDY1OiAvLyBhXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS54ID0gMDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDQwOiAvLyBkb3duXG5cdFx0XHRcdGNhc2UgODM6IC8vIHNcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnkgPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMzk6IC8vIHJpZ2h0XG5cdFx0XHRcdGNhc2UgNjg6IC8vIGRcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnggPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0Ly8gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0ZnVuY3Rpb24gbW91c2Vkb3duKGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG5cdFx0XHQvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvL2V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpZiAoX3N0YXRlID09PSBTVEFURS5OT05FKSB7XG5cblx0XHRcdFx0X3N0YXRlID0gZXZlbnQuYnV0dG9uO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmIChfc3RhdGUgPT09IFNUQVRFLlJPVEFURSAmJiAhX3RoaXMubm9Sb3RhdGUpIHtcblxuXHRcdFx0XHRfcm90YXRlU3RhcnQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdF9yb3RhdGVFbmQuY29weShfcm90YXRlU3RhcnQpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKF9zdGF0ZSA9PT0gU1RBVEUuWk9PTSAmJiAhX3RoaXMubm9ab29tKSB7XG5cblx0XHRcdFx0X3pvb21TdGFydC5jb3B5KGdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdF96b29tRW5kLmNvcHkoX3pvb21TdGFydCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5QQU4gJiYgIV90aGlzLm5vUGFuKSB7XG5cblx0XHRcdFx0X3BhblN0YXJ0LmNvcHkoZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0X3BhbkVuZC5jb3B5KF9wYW5TdGFydClcblxuXHRcdFx0fVxuXG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUsIGZhbHNlKTtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwLCBmYWxzZSk7XG5cblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBtb3VzZW1vdmUoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmIChfc3RhdGUgPT09IFNUQVRFLlJPVEFURSAmJiAhX3RoaXMubm9Sb3RhdGUpIHtcblxuXHRcdFx0XHRfcm90YXRlRW5kLmNvcHkoZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKF9zdGF0ZSA9PT0gU1RBVEUuWk9PTSAmJiAhX3RoaXMubm9ab29tKSB7XG5cblx0XHRcdFx0X3pvb21FbmQuY29weShnZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKF9zdGF0ZSA9PT0gU1RBVEUuUEFOICYmICFfdGhpcy5ub1Bhbikge1xuXG5cdFx0XHRcdF9wYW5FbmQuY29weShnZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBtb3VzZXVwKGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG5cdFx0XHQvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvL2V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBtb3VzZXdoZWVsKGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHZhciBkZWx0YSA9IDA7XG5cblx0XHRcdGlmIChldmVudC53aGVlbERlbHRhKSB7IC8vIFdlYktpdCAvIE9wZXJhIC8gRXhwbG9yZXIgOVxuXG5cdFx0XHRcdGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YSAvIDQwO1xuXG5cdFx0XHR9IGVsc2UgaWYgKGV2ZW50LmRldGFpbCkgeyAvLyBGaXJlZm94XG5cblx0XHRcdFx0ZGVsdGEgPSAtZXZlbnQuZGV0YWlsIC8gMztcblxuXHRcdFx0fVxuXG5cdFx0XHRfem9vbVN0YXJ0LnkgKz0gZGVsdGEgKiAwLjAxO1xuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG91Y2hzdGFydChldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuXHRcdFx0c3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuXG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRfc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cdFx0XHRcdFx0X3JvdGF0ZVN0YXJ0LmNvcHkoZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KF9yb3RhdGVTdGFydCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdF9zdGF0ZSA9IFNUQVRFLlRPVUNIX1pPT01fUEFOO1xuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG5cdFx0XHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlRW5kID0gX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdF9wYW5TdGFydC5jb3B5KGdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdF9wYW5FbmQuY29weShfcGFuU3RhcnQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0X3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0fVxuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcblxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG91Y2htb3ZlKGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG5cdFx0XHQvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvL2V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG5cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdF9yb3RhdGVFbmQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkpKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcblx0XHRcdFx0XHRfdG91Y2hab29tRGlzdGFuY2VFbmQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdF9wYW5FbmQuY29weShnZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvdWNoZW5kKGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG5cdFx0XHQvL25vaW5zcGVjdGlvbiBDb2ZmZWVTY3JpcHRTd2l0Y2hTdGF0ZW1lbnRXaXRoTm9EZWZhdWx0QnJhbmNoXG5cdFx0XHRzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG5cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdF9yb3RhdGVFbmQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkpKTtcblx0XHRcdFx0XHRfcm90YXRlU3RhcnQuY29weShfcm90YXRlRW5kKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSBfdG91Y2hab29tRGlzdGFuY2VFbmQgPSAwO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdF9wYW5FbmQuY29weShnZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHRfcGFuU3RhcnQuY29weShfcGFuRW5kKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0fVxuXG5cdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cblx0XHR9XG5cblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uIChldmVudCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9LCBmYWxzZSk7XG5cblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duLCBmYWxzZSk7XG5cblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIG1vdXNld2hlZWwsIGZhbHNlKTtcblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBtb3VzZXdoZWVsLCBmYWxzZSk7IC8vIGZpcmVmb3hcblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydCwgZmFsc2UpO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kLCBmYWxzZSk7XG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZSwgZmFsc2UpO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duLCBmYWxzZSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5dXAsIGZhbHNlKTtcblxuXHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XG5cblx0XHQvLyBmb3JjZSBhbiB1cGRhdGUgYXQgc3RhcnRcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cblx0fTtcblxuXHRUSFJFRS5UcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRIUkVFLkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUpO1xuXG5cdC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRocmVlLWQtY2FudmFzPmRpdj5kaXZ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjA7cG9pbnRlci1ldmVudHM6bm9uZTt9LnRocmVlLWQtY2FudmFzPmRpdj5kaXY+LmNpcmN1aXRib2FyZHtwb2ludGVyLWV2ZW50czp2aXNpYmxlO30udGhyZWUtZC1jYW52YXM+ZGl2PmNhbnZhc3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MTtwb2ludGVyLWV2ZW50czpub25lO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQuanMifQ==