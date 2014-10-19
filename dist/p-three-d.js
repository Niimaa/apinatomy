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
	    id: 'three-d',
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
	        superClass.prototype.constructor.apply(this, args);
	        constructor.apply(this, args);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMDM3OTE1ZjAyZjRmYTViYjgwMCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUNDLHVCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNELENBQUcsMENBQVUsRUFBRyxNQUFJLENBQUc7QUFDdEIsY0FBVyxDQUFDO0FBS1osVUFBUyxlQUFhLENBQUUsQ0FBRTtBQUNyQixjQUFLLENBQUM7QUFDVixPQUFJO0FBQ0gsWUFBSyxFQUFJLEVBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUN0QixZQUFPLEVBQUMsQ0FBQyxDQUFDLE1BQUssQ0FBRSxFQUFDLFdBQVksQ0FBQyxPQUFNLENBQUMsR0FBSyxPQUFLLENBQUUsRUFBQyxXQUFZLENBQUMsb0JBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQ3ZGLENBQUUsT0FBTyxFQUFDLENBQUc7QUFDWixZQUFPLE1BQUksQ0FBQztLQUNiLENBQUUsT0FBUTtBQUNULFlBQUssRUFBSSxVQUFRLENBQUM7S0FDbkI7QUFBQSxHQUNEO0FBS0EsVUFBUyxVQUFRLENBQUUsS0FBSSxDQUFHLE1BQUksQ0FBRztBQUNoQyxVQUFPLE1BQUksR0FBSyxNQUFJLEdBQUssTUFBSSxNQUFNLElBQU0sTUFBSSxNQUFNLEdBQUssTUFBSSxPQUFPLElBQU0sTUFBSSxPQUFPLENBQUM7R0FDdEY7QUFLSSxXQUFJLEVBQUksSUFBSSxNQUFJLE1BQU8sQ0FBQyxHQUFJLE1BQUksUUFBUyxDQUFDLEVBQUcsR0FBRyxHQUFDLENBQUcsR0FBQyxDQUFDO0FBQ3RELGVBQVEsRUFBSSxJQUFJLE1BQUksVUFBVyxFQUFDLENBQUM7QUFLakMsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLE1BQUMsQ0FBRyxVQUFRO0FBQ1osWUFBTyxDQUFHLEVBQUMsbUJBQWtCLENBQUM7QUFBQSxHQUMvQixDQUFDLE9BQVEsQ0FBQyx3QkFBdUIsQ0FBQyxDQUFDO0FBS25DLFFBQUssT0FBUSxDQUFDLFdBQVUsQ0FBRyxVQUFVOztBQUtwQyxRQUFJLENBQUMsY0FBYyxFQUFDLENBQUc7QUFDdEIsYUFBTSxLQUFNLENBQUMsa0RBQWlELENBQUMsQ0FBQztBQUNoRSxhQUFNO0tBQ1A7QUFLQSxnQkFBWSxDQUFDLElBQUcsQ0FBRyxFQUFFLElBQUcsQ0FBRyxzQkFBb0IsQ0FBRSxDQUFDLENBQUM7QUFDbkQsUUFBRyxHQUFJLENBQUMscUJBQW9CLEdBQUcsU0FBQyxTQUFRLENBQUcsVUFBUSxDQUFNO0FBQ3hELFVBQUksU0FBUSxDQUFHO0FBQUUsaUJBQVEsWUFBYSxDQUFDLGdCQUFlLENBQUM7T0FBRTtBQUN6RCxVQUFJLFNBQVEsQ0FBRztBQUFFLGlCQUFRLFNBQVUsQ0FBQyxnQkFBZSxDQUFDO09BQUU7QUFBQSxLQUN2RCxFQUFDLENBQUM7QUFNRixVQUFLLGVBQWdCLENBQUMsSUFBRyxDQUFHLGFBQVcsQ0FBRztBQUN6QyxTQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsY0FBTyxFQUFDLENBQUMsSUFBRyxvQkFBb0I7T0FBRTtBQUMxQyxTQUFFLENBQUYsVUFBSSxhQUFZLENBQUc7QUFDbEIsWUFBSSxDQUFDLENBQUMsYUFBWSxDQUFHO0FBQ3BCLGVBQU0sSUFBSSxNQUFLLENBQUMsMkdBQTBHLENBQUMsQ0FBQztTQUM3SCxLQUFPO0FBQ04sY0FBRyxvQkFBb0IsRUFBSSxLQUFHLENBQUM7U0FDaEM7QUFBQSxPQUNEO0FBQUEsS0FDRCxDQUFDLENBQUM7QUFDRixRQUFHLEdBQUksQ0FBQyxxQkFBb0IsR0FBRyxTQUFDLFNBQVEsQ0FBRyxVQUFRLENBQU07QUFDeEQsVUFBSSxTQUFRLEdBQUssVUFBUSxDQUFHO0FBQzNCLG9CQUFZLENBQUMsWUFBVyxDQUFHLEVBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztPQUN4QztBQUFBLEtBQ0QsRUFBQyxDQUFDO0FBTUUsbUJBQVUsRUFBSSxTQUFRLENBQUM7QUFDMUIsY0FBTyxHQUFHLFNBQUM7Y0FBSyxFQUFDLHdCQUF1QixHQUFLO0FBQzVDLGVBQUksQ0FBRyx5QkFBdUIsTUFBTyxFQUFDO0FBQ3RDLGdCQUFLLENBQUcseUJBQXVCLE9BQVEsRUFBQztBQUFBLFNBQ3pDLENBQUM7T0FBQTtBQUNELGFBQU0sQ0FBRyxVQUFRO0FBQUEsS0FDbEIsQ0FBQyxDQUFDO0FBQ0YsVUFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxtQkFBaUIsQ0FBRyxFQUMvQyxHQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsY0FBTyxZQUFXLEVBQUM7T0FBRSxDQUM5QixDQUFDLENBQUM7QUFDRixlQUFVLFNBQVUsRUFBQyxTQUFDLE9BQU0sQ0FBTTtBQUFFLGtCQUFZLENBQUMsa0JBQWlCLENBQUcsUUFBTSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBSWhGLEtBQUMsQ0FBQyxNQUFLLENBQUMsT0FBUSxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBSzdCLGdCQUFZLENBQUMsSUFBRyxDQUFHLEVBQUUsSUFBRyxDQUFHLHdCQUFzQixDQUFFLENBQUMsQ0FBQztBQUtyRCxRQUFHLEdBQUksQ0FBQyxZQUFXLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDL0IsVUFBSSxJQUFHLENBQUc7QUFBRSxpQ0FBeUIsRUFBQztPQUFFO0FBQUEsS0FDekMsRUFBQyxDQUFDO0FBTUYsUUFBRyxvQkFBb0IsRUFBSSxLQUFHLFFBQVEsb0JBQW9CLENBQUM7R0FFNUQsQ0FBQyxDQUFDO0FBS0YsUUFBSyxJQUFLLENBQUMsc0JBQXFCLENBQUcsVUFBVTs7QUFLNUMsUUFBRyx3QkFBd0IsRUFBSSxHQUFDLENBQUM7QUFDakMsUUFBRyx3QkFBd0IsS0FBSyxFQUFJLEtBQUcsUUFBUSxPQUFRLEVBQUMsS0FBSyxFQUFJLEtBQUcsb0JBQW9CLE9BQVEsRUFBQyxLQUFLLENBQUM7QUFDdkcsUUFBRyx3QkFBd0IsSUFBSSxFQUFJLEtBQUcsUUFBUSxPQUFRLEVBQUMsSUFBSSxFQUFJLEtBQUcsb0JBQW9CLE9BQVEsRUFBQyxJQUFJLENBQUM7QUFDcEcsUUFBRyx3QkFBd0IsTUFBTSxFQUFJLEtBQUcsaUJBQWlCLE1BQU0sRUFBSSxLQUFHLEtBQUssTUFBTSxFQUFJLEtBQUcsd0JBQXdCLEtBQUssQ0FBQztBQUN0SCxRQUFHLHdCQUF3QixPQUFPLEVBQUksS0FBRyxpQkFBaUIsT0FBTyxFQUFJLEtBQUcsS0FBSyxPQUFPLEVBQUksS0FBRyx3QkFBd0IsSUFBSSxDQUFDO0FBTXhILFFBQUcsZ0JBQWdCLEVBQUksSUFBSSxNQUFJLE1BQU8sRUFBQyxDQUFDO0FBTXhDLFFBQUcsaUJBQWlCLEVBQ2xCLElBQUksTUFBSSxrQkFBbUIsQ0FBQyxFQUFDLENBQUcsS0FBRyxpQkFBaUIsTUFBTSxFQUFJLEtBQUcsaUJBQWlCLE9BQU8sQ0FBRyxHQUFHLE1BQUksQ0FBQyxDQUFDO0FBQ3ZHLFFBQUcsR0FBSSxDQUFDLGtCQUFpQixHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQUUsMkJBQW9CLE9BQU8sRUFBSSxLQUFHLE1BQU0sRUFBSSxLQUFHLE9BQU87S0FBRSxFQUFDLENBQUM7QUFDbEcsUUFBRyxpQkFBaUIsU0FBUyxFQUFFLEVBQUksR0FBQztBQU1oQyxvQkFBVyxFQUFJLElBQUksTUFBSSxhQUFjLENBQUMsUUFBTyxDQUFDLENBQUM7QUFDbkQsUUFBRyxnQkFBZ0IsSUFBSyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBRWxDLHlCQUFnQixFQUFJLElBQUksTUFBSSxpQkFBa0IsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUM1RCxxQkFBZ0IsU0FBUyxJQUFLLENBQUMsRUFBRyxFQUFDLEVBQUcsR0FBQyxDQUFDO0FBQ3hDLFFBQUcsZ0JBQWdCLElBQUssQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFDO0FBRXZDLHlCQUFnQixFQUFJLElBQUksTUFBSSxpQkFBa0IsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUM1RCxxQkFBZ0IsU0FBUyxJQUFLLENBQUMsQ0FBQyxFQUFHLEdBQUcsRUFBQyxFQUFDLENBQUM7QUFDekMsUUFBRyxnQkFBZ0IsSUFBSyxDQUFDLGlCQUFnQixDQUFDLENBQUM7QUFNM0MsUUFBRyx5QkFBeUIsRUFBSSxJQUFJLE1BQUksY0FBZSxDQUFDO0FBQUUsV0FBSSxDQUFHLEtBQUc7QUFBRyxlQUFRLENBQUcsS0FBRztBQUFBLEtBQUUsQ0FBQyxDQUFDO0FBQ3pGLFFBQUcseUJBQXlCLFlBQVksRUFBSSxNQUFJLENBQUM7QUFDakQsUUFBRyx5QkFBeUIsUUFBUyxDQUFDLElBQUcsb0JBQW9CLE1BQU8sRUFBQyxDQUFHLEtBQUcsb0JBQW9CLE9BQVEsRUFBQyxDQUFDLENBQUM7QUFDMUcsUUFBRyxHQUFJLENBQUMsV0FBVSxHQUFHLFNBQUMsQ0FBSztBQUMxQixtQ0FBNEIsT0FBUSxDQUFDLG9CQUFtQixDQUFHLHNCQUFvQixDQUFDLENBQUM7S0FDbEYsRUFBQyxDQUFDO0FBQ0YsUUFBRyxHQUFJLENBQUMsa0JBQWlCLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDckMsbUNBQTRCLFFBQVMsQ0FBQyxJQUFHLE1BQU0sQ0FBRyxLQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQy9ELEVBQUMsQ0FBQztBQUdGLFFBQUcsdUJBQXVCLEVBQUksSUFBSSxNQUFJLGNBQWUsRUFBQyxDQUFDO0FBQ3ZELEtBQUMsQ0FBQyxJQUFHLHVCQUF1QixXQUFXLENBQUMsT0FBUSxDQUFDLElBQUcseUJBQXlCLFdBQVcsQ0FBQyxDQUFDO0FBQzFGLFFBQUcsb0JBQW9CLE9BQVEsQ0FBQyxJQUFHLHVCQUF1QixXQUFXLENBQUMsQ0FBQztBQUN2RSxRQUFHLHVCQUF1QixRQUFTLENBQUMsSUFBRyxvQkFBb0IsTUFBTyxFQUFDLENBQUcsS0FBRyxvQkFBb0IsT0FBUSxFQUFDLENBQUMsQ0FBQztBQUN4RyxRQUFHLEdBQUksQ0FBQyxXQUFVLEdBQUcsU0FBQyxDQUFLO0FBQzFCLGlDQUEwQixPQUFRLENBQUMsb0JBQW1CLENBQUcsc0JBQW9CLENBQUMsQ0FBQztLQUNoRixFQUFDLENBQUM7QUFDRixRQUFHLEdBQUksQ0FBQyxrQkFBaUIsR0FBRyxTQUFDLElBQUcsQ0FBTTtBQUNyQyxpQ0FBMEIsUUFBUyxDQUFDLElBQUcsTUFBTSxDQUFHLEtBQUcsT0FBTyxDQUFDLENBQUM7S0FDN0QsRUFBQyxDQUFDO0FBTUYsUUFBRyxHQUFJLENBQUMsTUFBSyxHQUFHLFNBQUMsQ0FBSztBQUFFLGtCQUFZLENBQUMsV0FBVSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBQ3BELHdCQUFvQixFQUFDLFNBQUMsQ0FBSztBQUFFLGtCQUFZLENBQUMsV0FBVSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBTXpELFFBQUcsbUJBQW1CLEVBQUksSUFBSSxNQUFJLGtCQUFtQixDQUFDLElBQUcsaUJBQWlCLENBQUcsS0FBRyxvQkFBb0IsQ0FBRSxFQUFDLENBQUMsQ0FBQztBQUN6RyxZQUFRLENBQUMsSUFBRyxtQkFBbUIsQ0FBRztBQUNqQyxpQkFBVSxDQUFHLElBQUU7QUFDZixlQUFRLENBQUcsSUFBRTtBQUNiLGNBQU8sQ0FBRyxJQUFFO0FBQ1osWUFBSyxDQUFHLE1BQUk7QUFDWixXQUFJLENBQUcsTUFBSTtBQUNYLGtCQUFXLENBQUcsS0FBRztBQUNqQiwwQkFBbUIsQ0FBRyxJQUFFO0FBQ3hCLFVBQUcsQ0FBRyxFQUFDLEVBQUMsQ0FBRyxHQUFDLENBQUcsR0FBQyxDQUFDO0FBQUEsS0FDbEIsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxtQkFBbUIsaUJBQWtCLENBQUMsUUFBTyxHQUFHLFNBQUMsQ0FBSztBQUFFLGtCQUFZLENBQUMsV0FBVSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBQ3ZGLFFBQUcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLENBQUs7QUFBRSw2QkFBc0IsYUFBYyxFQUFDO0tBQUUsRUFBQyxDQUFDO0FBQ2pFLFFBQUcsR0FBSSxDQUFDLFdBQVUsR0FBRyxTQUFDLENBQUs7QUFBRSw2QkFBc0IsT0FBUSxFQUFDO0tBQUUsRUFBQyxDQUFDO0FBQ2hFLFFBQUcsR0FBSSxDQUFDLHVCQUFzQixHQUFHLFNBQUMsT0FBTSxDQUFNO0FBQUUsNkJBQXNCLFFBQVEsRUFBSSxRQUFNO0tBQUUsRUFBQyxDQUFDO0FBTXhGLCtCQUFzQixFQUFJLEtBQUcsUUFBUSxDQUFDO0FBQzFDLFFBQUcsdUJBQXVCLEVBQUksSUFBSSxNQUFJLFlBQWEsQ0FBQyx1QkFBc0IsQ0FBRSxFQUFDLENBQUMsQ0FBQztBQUMvRSwyQkFBc0IsSUFBSyxDQUFDO0FBQUUsVUFBRyxDQUFHO0FBQUcsU0FBRSxDQUFHO0FBQUcsWUFBSyxDQUFHO0FBQUcsV0FBSSxDQUFHO0FBQUEsS0FBRSxDQUFDLENBQUM7QUFDckUsMkJBQXNCLElBQUssQ0FBQyxvQkFBbUIsQ0FBRyxTQUFPLENBQUMsQ0FBQztBQUMzRCxRQUFHLGdCQUFnQixJQUFLLENBQUMsSUFBRyx1QkFBdUIsQ0FBQyxDQUFDO0FBR2pELHVCQUFjLEVBQUksRUFBQyxDQUFDLE9BQU0sQ0FBQyxJQUFLLENBQUM7QUFDcEMsY0FBTyxDQUFHLFdBQVM7QUFDbkIsWUFBSyxDQUFHLGtCQUFnQjtBQUN4Qix3QkFBaUIsQ0FBRyxTQUFPO0FBQUEsS0FDNUIsQ0FBQyxDQUFDO0FBQ0UsZ0JBQU8sRUFBSSxJQUFJLE1BQUksWUFBYSxDQUFDLGVBQWMsQ0FBRSxFQUFDLENBQUMsQ0FBQztBQUN4RCxZQUFPLFNBQVMsSUFBSyxDQUFDLElBQUcsR0FBRyxDQUFHLEdBQUcsR0FBQyxDQUFDO0FBQ3BDLFFBQUcsZ0JBQWdCLElBQUssQ0FBQyxRQUFPLENBQUMsQ0FBQztBQUc5QixzQkFBYSxJQUFJLFNBQUMsQ0FBSztBQUV0QixjQUFHLEVBQUk7QUFDVixhQUFJLENBQUcsc0JBQW9CLE1BQU0sRUFBSSw2QkFBMkIsS0FBSyxFQUFJLDZCQUEyQixNQUFNO0FBQzFHLGNBQUssQ0FBRyxzQkFBb0IsT0FBTyxFQUFJLDZCQUEyQixJQUFJLEVBQUksNkJBQTJCLE9BQU87QUFBQSxPQUM3RyxDQUFDO0FBQ0QsNkJBQXNCLElBQUssQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUNqQyxxQkFBYyxJQUFLLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDekIsY0FBTyxTQUFTLEVBQUUsRUFBSSw0QkFBMEIsU0FBUyxFQUFFLEVBQUksSUFBRSxFQUFJLEVBQUMsNEJBQTJCLEtBQUssRUFBSSw2QkFBMkIsTUFBTSxDQUFDLENBQUM7QUFDN0ksY0FBTyxTQUFTLEVBQUUsRUFBSSw0QkFBMEIsU0FBUyxFQUFFLEVBQUksSUFBRSxFQUFJLEVBQUMsNEJBQTJCLE9BQU8sRUFBSSw2QkFBMkIsSUFBSSxDQUFDLENBQUM7QUFHN0ksNkJBQXNCLGtCQUFtQixDQUN2QyxxQkFBb0IsT0FBTyxFQUMzQixFQUFDLEdBQUksS0FBRyxJQUFLLENBQUMsS0FBSSxLQUFLLFNBQVUsQ0FBQyxxQkFBb0IsSUFBSSxDQUFDLEVBQUksR0FBQyxDQUFDLENBQ25FLENBQUM7S0FDRixFQUFDO0FBQ0QsUUFBRyxHQUFJLENBQUMsa0JBQWlCLENBQUcsZUFBYSxDQUFDLENBQUM7QUFDM0Msa0JBQWMsRUFBQyxDQUFDO0dBRWpCLENBQUMsQ0FBQztBQVFGLFFBQUssSUFBSyxDQUFDLDJDQUEwQyxDQUFHLFVBQVUsZ0JBQWUsQ0FBRztBQUVuRixRQUFHLGlCQUFpQixrQkFBbUIsRUFBQyxDQUFDO0FBQ3pDLFFBQUcsaUJBQWlCLHVCQUF3QixFQUFDLENBQUM7QUFFMUMsZUFBTSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUNqQyxXQUFNLEVBQUUsRUFBSSxpQkFBZSxLQUFLLEVBQUksS0FBRyxpQkFBaUIsTUFBTSxFQUFJLElBQUksR0FBQztBQUN2RSxXQUFNLEVBQUUsRUFBSSxFQUFDLGdCQUFlLElBQUksRUFBSSxLQUFHLGlCQUFpQixPQUFPLEVBQUksSUFBSSxHQUFDO0FBQ3hFLFdBQU0sRUFBRSxFQUFJLElBQUUsQ0FBQztBQUNmLGFBQVEsZ0JBQWlCLENBQUMsT0FBTSxDQUFHLEtBQUcsaUJBQWlCLENBQUMsQ0FBQztBQUNyRCxXQUFFLEVBQUksSUFBSSxNQUFJLElBQUssQ0FBQyxJQUFHLGlCQUFpQixTQUFTLENBQUcsUUFBTSxJQUFLLENBQUMsSUFBRyxpQkFBaUIsU0FBUyxDQUFDLFVBQVcsRUFBQyxDQUFDLENBQUM7QUFDNUcsa0JBQVMsRUFBSSxJQUFFLGVBQWdCLENBQUMsS0FBSSxDQUFDLENBQUM7QUFHMUMsUUFBSSxDQUFDLFVBQVMsQ0FBRztBQUFFLGFBQUs7S0FBRTtBQUUxQixVQUFPO0FBQ04sVUFBRyxDQUFHLFdBQVMsRUFBRSxFQUFJLEtBQUcsaUJBQWlCLE1BQU0sRUFBSSxJQUFJLEtBQUcsd0JBQXdCLEtBQUs7QUFDdkYsU0FBRSxDQUFHLEVBQUMsVUFBUyxFQUFFLEVBQUksS0FBRyxpQkFBaUIsT0FBTyxFQUFJLElBQUksS0FBRyx3QkFBd0IsSUFBSTtBQUFBLEtBQ3hGLENBQUM7R0FFRixDQUFDLENBQUM7QUFFSCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUMxU0EsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7bUNDQUEsa0NBQU8sUUFBQztBQUNQLGNBQVcsQ0FBQztBQUVSLFNBQUk7QUFHUCxZQUFPLENBQVAsVUFBUyxXQUFVLENBQUcsVUFBUTtBQUM3QixlQUFRLEVBQUksVUFBUSxHQUFLLEdBQUMsQ0FBQztBQUN2QixhQUFFLEVBQUksVUFBZ0IsQ0FBRztBQ1BwQixhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FETTdFLG1CQUFVLE1BQU8sQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7T0FDOUIsQ0FBQztBQUNELFNBQUUsVUFBVSxFQUFJLFVBQVEsQ0FBQztBQUN6QixTQUFFLFVBQVUsWUFBWSxFQUFJLElBQUUsQ0FBQztBQUMvQixZQUFPLElBQUUsQ0FBQztLQUNYO0FBR0EsZUFBVSxDQUFWLFVBQVksVUFBUyxDQUFHLFlBQVUsQ0FBRyxVQUFRO0FBQzVDLGVBQVEsRUFBSSxVQUFRLEdBQUssR0FBQyxDQUFDO0FBQ3ZCLGFBQUUsRUFBSSxVQUFnQixDQUFHO0FDbEJwQixhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FEaUI3RSxrQkFBUyxVQUFVLFlBQVksTUFBTyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUNsRCxtQkFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQzlCLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxPQUFLLE9BQVEsQ0FBQyxVQUFTLFVBQVUsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUM5RCxTQUFFLFVBQVUsWUFBWSxFQUFJLElBQUUsQ0FBQztBQUMvQixZQUFPLElBQUUsQ0FBQztLQUNYO0FBS0EsVUFBSyxDQUFMLFVBQU8sSUFBWTtBRTlCVCxXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRjZCbEcsVUFBRyxRQUFTLEVBQUMsU0FBQyxHQUFFLENBQU07QUFDckIsYUFBUyxPQUFFLEdBQUssSUFBRSxDQUFHO0FBQ3BCLGNBQUksR0FBRSxlQUFnQixDQUFDLEdBQUUsQ0FBQyxDQUFHO0FBQzVCLGdCQUFHLENBQUUsR0FBRSxDQUFDLEVBQUksSUFBRSxDQUFFLEdBQUUsQ0FBQyxDQUFDO1dBQ3JCO0FBQUEsU0FDRDtBQUFBLE9BQ0QsRUFBQyxDQUFDO0FBQ0YsWUFBTyxLQUFHLENBQUM7S0FDWjtBQUdBLFVBQUssQ0FBTCxVQUFPLElBQUcsQ0FBRyxLQUFHLENBQUcsUUFBTSxDQUFHO0FBQzNCLFVBQUksYUFBYSxDQUFDLE9BQU0sQ0FBQyxDQUFHO0FBQUUsZUFBTSxFQUFJLEtBQUc7T0FBRTtBQUM3QyxZQUFPLEVBQUMsSUFBRyxJQUFLLENBQUMsSUFBRyxFQUFJLEtBQUcsQ0FBQyxFQUFJLFFBQU0sQ0FBQyxDQUFDO0tBQ3pDO0FBSUEsU0FBSSxDQUFKLFVBQU0sSUFBRztBQUFLLGNBQU8sU0FBQyxHQUFFLENBQU07QUFBRSxjQUFPLElBQUUsQ0FBRSxJQUFHLENBQUM7T0FBRTtLQUFFO0FBSW5ELFVBQUssQ0FBTCxVQUFPLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDakIsVUFBSSxhQUFhLENBQUMsR0FBRSxDQUFFLElBQUcsQ0FBQyxDQUFDLENBQUc7QUFBRSxXQUFFLENBQUUsSUFBRyxDQUFDLEVBQUksR0FBQztPQUFFO0FBQy9DLFlBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBSUEsU0FBSSxDQUFKLFVBQU0sR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQixVQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBRztBQUFFLFdBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxHQUFDO09BQUU7QUFDL0MsWUFBTyxJQUFFLENBQUUsSUFBRyxDQUFDLENBQUM7S0FDakI7QUFHQSxRQUFHLENBQUgsVUFBSyxHQUFFLENBQUcsSUFBRSxDQUFHO0FBQ1YsYUFBSSxJQUFFLFFBQVMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUN4QixVQUFJLEtBQU0sRUFBQyxFQUFHO0FBQUUsV0FBRSxPQUFRLENBQUMsRUFBQztPQUFFO0FBQUEsS0FDL0I7QUFHQSxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFDZCxhQUFPLEdBQUUsT0FBTyxFQUFJLEdBQUc7QUFBRSxXQUFFLElBQUssRUFBQztPQUFFO0FBQUEsS0FDcEM7QUFHQSxTQUFJLENBQUosVUFBTSxFQUFDLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBRztBQUFFLFlBQU8sR0FBQyxLQUFLLE1BQU8sQ0FBQyxFQUFDLENBQUcsRUFBQyxHQUFFLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDO0tBQUU7QUFHcEUsUUFBRyxDQUFILFVBQUssR0FBRSxDQUFHLEVBQVMsQ0FBRztBRWhGWixXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRjhFM0UsWUFBTyxRQUFPLENBQUMsR0FBRSxDQUFFLEVBQUMsQ0FBRyxJQUFFLENBQUcsS0FBRyxDQUFDO0tBQUU7QUFJMUQsb0JBQWUsQ0FBZixVQUFpQixhQUFZLENBQUcsS0FBRyxDQUFHO0FBQ2pDLDBCQUFlLEVBQUksY0FBWSxLQUFLLE1BQU8sQ0FBQyxhQUFZLENBQUcsRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkYsWUFBTyxJQUFJLGlCQUFnQixFQUFDLENBQUM7S0FDOUI7QUFJQSxVQUFLLENBQUwsVUFBTyxTQUFRLENBQUcsUUFBTSxDQUFHO0FBQzFCLFVBQUksQ0FBQyxTQUFRLENBQUc7QUFBRSxhQUFNLElBQUksTUFBSyxDQUFDLE9BQU0sR0FBSyxtQkFBaUIsQ0FBQztPQUFFO0FBQUEsS0FDbEU7QUFHQSxlQUFVLENBQVYsVUFBWSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUduRCxhQUFRLENBQVIsVUFBVSxHQUFFO0FBQUssWUFBTyxPQUFLLEtBQU0sQ0FBQyxHQUFFLENBQUMsSUFBSyxFQUFDLFlBQUU7Y0FBSyxJQUFFLENBQUUsR0FBRSxDQUFDO09BQUEsRUFBQztLQUFFO0FBRzlELGtCQUFhLENBQWIsVUFBZSxPQUFNLENBQUc7QUFDdkIsVUFBSSxPQUFNLElBQUssQ0FBQyxVQUFTLENBQUMsSUFBTSxTQUFPLENBQUc7QUFDekMsZUFBTSxJQUFLLENBQUMsVUFBUyxDQUFHLFdBQVMsQ0FBQyxDQUFDO09BQ3BDO0FBQUEsS0FDRDtBQUdBLFNBQUksQ0FBSixVQUFjLENBQUc7QUNoSFAsV0FBUyxZQUFvQixHQUFDO0FBQUcsZ0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRCtHOUUsV0FBUyxPQUFJLEdBQUcsSUFBSSxPQUFLLE9BQU8sQ0FBRyxLQUFLLEdBQUc7QUFDMUMsWUFBSSxXQUFXLENBQUMsTUFBSyxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQUUsZ0JBQU8sT0FBSyxDQUFFLEVBQUM7U0FBRTtBQUFBLE9BQ2hEO0FBQUEsS0FDRDtBQUdBLGtCQUFhLENBQWIsVUFBZSxFQUFHLEdBQUMsQ0FBRztBQUNqQixhQUFJLFNBQU8sQ0FBQztBQUNoQixhQUFPLEdBQUUsQ0FBRztBQUFFLFVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBRyxHQUFHLEdBQUM7T0FBRTtBQUFBLEtBQzlCO0FBS0EsWUFBTyxDQUFQLFVBQVMsSUFBRyxDQUFHLEtBQUcsQ0FBRyxRQUFNO0FBQ3RCLGlCQUFNLENBQUM7QUFDWCxZQUFPLFVBQWdCO0FDaklkLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QURnSXpFLG1CQUFNLElBQUksU0FBQyxDQUFLO0FBQ25CLGlCQUFNLEVBQUksS0FBRyxDQUFDO0FBQ2QsY0FBRyxNQUFPLENBQUMsT0FBTSxDQUFHLEtBQUcsQ0FBQyxDQUFDO1NBQzFCLEVBQUM7QUFDRCxvQkFBWSxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3JCLGVBQU0sRUFBSSxXQUFVLENBQUMsT0FBTSxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQ3BDLENBQUM7S0FDRjtBQUlBLHNCQUFpQixDQUFqQixVQUFtQixFQUFDLENBQUcsUUFBTSxDQUFHO0FBQzNCLGNBQUcsRUFBSSxNQUFJLENBQUM7QUFDaEIsY0FBUyxZQUFVLENBQUUsQ0FBRTtBQUN0QixVQUFDLE1BQU8sQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUNqQixZQUFJLElBQUcsQ0FBRztBQUFFLGlCQUFLO1NBQUU7QUFDbkIsNkJBQXFCLENBQUMsV0FBVSxDQUFDLENBQUM7T0FDbkM7QUFDQSxpQkFBVyxFQUFDLENBQUM7QUFDYixZQUFPLFNBQVMsdUJBQXFCLENBQUUsQ0FBRTtBQUN4QyxZQUFHLEVBQUksS0FBRyxDQUFDO09BQ1osQ0FBQztLQUNGO0FBR0EsZ0JBQVcsQ0FBWCxVQUFhLElBQUcsQ0FBRyxRQUFNO0FBQ3BCLG1CQUFRLEVBQUksS0FBRyxDQUFDO0FBQ3BCLFlBQU8sVUFBZ0I7QUM3SmQsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRDRKN0UsWUFBSSxTQUFRLENBQUc7QUFDZCxtQkFBUSxFQUFJLE1BQUksQ0FBQztBQUNqQixvQkFBVSxFQUFDLFNBQUMsQ0FBSztBQUFFLHFCQUFRLEVBQUksS0FBRztXQUFFLEVBQUcsR0FBQyxDQUFDO0FBQ3pDLGNBQUcsTUFBTyxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztTQUMxQjtBQUFBLE9BQ0QsQ0FBQztLQUNGO0FBWUEsY0FBUyxDQUFULFVBQVcsR0FBRSxDQUFHLEtBQTBCOztBQUF6QixjQUFHO0FBQUcsaUJBQU07QUFBRyxvQkFBUztBQUNwQyxlQUFJLEVBQUksUUFBTSxDQUFDO0FBQ25CLFlBQUssZUFBZ0IsQ0FBQyxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQ2hDLFdBQUUsQ0FBRixVQUFJLENBQUU7QUFBRSxnQkFBTyxNQUFJO1NBQUU7QUFDckIsV0FBRSxDQUFGLFVBQUksUUFBTyxDQUFHO0FBQ1Qsc0JBQU8sRUFBSSxNQUFJLENBQUM7QUFDcEIsY0FBSSxVQUFTLENBQUc7QUFBRSxvQkFBTyxFQUFJLFdBQVUsQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDO1dBQUU7QUFDNUQsY0FBSSxRQUFPLElBQU0sU0FBTyxDQUFHO0FBQzFCLGlCQUFJLEVBQUksU0FBTyxDQUFDO0FBQ2hCLGdCQUFHLFFBQVMsQ0FBQyxJQUFHLENBQUcsU0FBTyxDQUFHLFNBQU8sQ0FBQyxDQUFDO1dBQ3ZDO0FBQUEsU0FDRDtBQUFBLE9BQ0QsQ0FBQyxDQUFDO0tBQ0g7QUFPQSxVQUFLLENBQUwsVUFBTyxPQUFNO0FBSVIsa0JBQU8sRUFBSSxRQUFNLFNBQVM7QUFDNUIsaUJBQU0sRUFBSSxRQUFNLFFBQVEsR0FBSyxHQUFDLFNBQUMsRUFBRztrQkFBTSxFQUFDLEtBQU0sR0FBQztXQUFBLEVBQUMsQ0FBQztBQUtoRCxlQUFJLENBQUM7QUFDVCxjQUFTLFNBQU8sQ0FBRSxDQUFFO0FBQ2Ysb0JBQU8sRUFBSSxNQUFJLENBQUM7QUFDcEIsYUFBSSxFQUFJLFNBQVEsRUFBQyxDQUFDO0FBQ2xCLFlBQUksUUFBTyxHQUFLLEVBQUMsT0FBTyxDQUFDLEtBQUksQ0FBRyxTQUFPLENBQUMsQ0FBRztBQUMxQyxrQkFBUSxDQUFDLEtBQUksQ0FBRyxTQUFPLENBQUMsQ0FBQztTQUMxQjtBQUFBLE9BQ0Q7QUFDQSxnQkFBVSxDQUFDLFFBQU8sQ0FBRyxHQUFDLENBQUM7QUFNbkIsOEJBQW1CLEVBQUksZUFBYyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBTS9DLGtCQUFPLElBQUksU0FBQyxDQUFLO0FBQ3BCLDRCQUFvQixFQUFDLENBQUM7QUFDdEIsY0FBTyxNQUFJLENBQUM7T0FDYixFQUFDO0FBTUcsa0JBQU8sQ0FBQztBQUNaLGNBQU8sU0FBUyxJQUFJLFNBQUMsRUFBQyxDQUFNO0FBQUUsZ0JBQU8sRUFBSSxHQUFDLENBQUM7QUFBRSxjQUFPLFNBQU8sQ0FBQztPQUFFLEVBQUM7QUFFL0QsWUFBTyxTQUFPLENBQUM7S0FDaEI7R0FFRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRjs7Ozs7OztpRUd0UEEsaUNBQVEsdUJBQVUsQ0FBRywwQ0FBVSxLQUFJLENBQUc7QUFDckMsY0FBVyxDQUFDO0FBT1osT0FBSSxZQUFZLEVBQUksVUFBVyxPQUFNLENBQUk7QUFFeEMsU0FBSSxTQUFTLEtBQU0sQ0FBRSxJQUFHLENBQUUsQ0FBQztBQUUzQixRQUFHLFFBQVEsRUFBSSxRQUFNLENBQUM7QUFDdEIsUUFBRyxRQUFRLE1BQU0sU0FBUyxFQUFJLFdBQVMsQ0FBQztBQUV4QyxRQUFHLGlCQUFrQixDQUFFLFNBQVEsQ0FBRyxVQUFxQixDQUFFO0FBRXhELFVBQUssSUFBRyxRQUFRLFdBQVcsSUFBTSxLQUFHLENBQUk7QUFFdkMsWUFBRyxRQUFRLFdBQVcsWUFBYSxDQUFFLElBQUcsUUFBUSxDQUFFLENBQUM7T0FFcEQ7QUFBQSxLQUVELENBQUUsQ0FBQztHQUVKLENBQUM7QUFFRCxPQUFJLFlBQVksVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFFLEtBQUksU0FBUyxVQUFVLENBQUUsQ0FBQztBQUV2RSxPQUFJLFlBQVksRUFBSSxVQUFXLE9BQU0sQ0FBSTtBQUV4QyxTQUFJLFlBQVksS0FBTSxDQUFFLElBQUcsQ0FBRyxRQUFNLENBQUUsQ0FBQztHQUV4QyxDQUFDO0FBRUQsT0FBSSxZQUFZLFVBQVUsRUFBSSxPQUFLLE9BQVEsQ0FBRSxLQUFJLFlBQVksVUFBVSxDQUFFLENBQUM7QUFJMUUsT0FBSSxjQUFjLEVBQUksVUFBVSxDQUFFO0FBRWpDLFdBQU0sSUFBSyxDQUFFLHFCQUFvQixDQUFHLE1BQUksU0FBUyxDQUFFLENBQUM7QUFFaEQsY0FBSztBQUFHLGVBQU0sQ0FBQztBQUNmLGtCQUFTO0FBQUcsbUJBQVUsQ0FBQztBQUV2QixjQUFLLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBRTVCLGFBQUksRUFBSTtBQUNYLFlBQUssQ0FBRztBQUFFLFdBQUUsQ0FBRztBQUFHLGFBQUksQ0FBRyxHQUFDO0FBQUEsT0FBRTtBQUM1QixhQUFNLENBQUcsR0FBQztBQUFBLEtBQ1gsQ0FBQztBQUVHLGtCQUFTLEVBQUksU0FBTyxjQUFlLENBQUUsS0FBSSxDQUFFLENBQUM7QUFDaEQsY0FBUyxNQUFNLFNBQVMsRUFBSSxTQUFPLENBQUM7QUFFcEMsY0FBUyxNQUFNLHFCQUFxQixFQUFJLGNBQVksQ0FBQztBQUNyRCxjQUFTLE1BQU0sa0JBQWtCLEVBQUksY0FBWSxDQUFDO0FBQ2xELGNBQVMsTUFBTSxnQkFBZ0IsRUFBSSxjQUFZLENBQUM7QUFDaEQsY0FBUyxNQUFNLGVBQWUsRUFBSSxjQUFZLENBQUM7QUFHL0MsUUFBRyxXQUFXLEVBQUksV0FBUyxDQUFDO0FBRXhCLHFCQUFZLEVBQUksU0FBTyxjQUFlLENBQUUsS0FBSSxDQUFFLENBQUM7QUFFbkQsaUJBQVksTUFBTSxxQkFBcUIsRUFBSSxjQUFZLENBQUM7QUFDeEQsaUJBQVksTUFBTSxrQkFBa0IsRUFBSSxjQUFZLENBQUM7QUFDckQsaUJBQVksTUFBTSxnQkFBZ0IsRUFBSSxjQUFZLENBQUM7QUFDbkQsaUJBQVksTUFBTSxlQUFlLEVBQUksY0FBWSxDQUFDO0FBRWxELGNBQVMsWUFBYSxDQUFFLGFBQVksQ0FBRSxDQUFDO0FBR3ZDLFFBQUcsY0FBYyxFQUFJLFVBQVUsQ0FBRSxHQUVqQyxDQUFDO0FBR0QsUUFBRyxRQUFRLEVBQUksVUFBVyxLQUFJLENBQUcsT0FBSyxDQUFJO0FBRXpDLFlBQUssRUFBSSxNQUFJLENBQUM7QUFDZCxhQUFNLEVBQUksT0FBSyxDQUFDO0FBRWhCLGdCQUFTLEVBQUksT0FBSyxFQUFJLEdBQUM7QUFDdkIsaUJBQVUsRUFBSSxRQUFNLEVBQUksR0FBQztBQUV6QixnQkFBUyxNQUFNLE1BQU0sRUFBSSxNQUFJLEVBQUksS0FBRyxDQUFDO0FBQ3JDLGdCQUFTLE1BQU0sT0FBTyxFQUFJLE9BQUssRUFBSSxLQUFHLENBQUM7QUFFdkMsbUJBQVksTUFBTSxNQUFNLEVBQUksTUFBSSxFQUFJLEtBQUcsQ0FBQztBQUN4QyxtQkFBWSxNQUFNLE9BQU8sRUFBSSxPQUFLLEVBQUksS0FBRyxDQUFDO0tBRTNDLENBQUM7QUFFRyxlQUFNLEVBQUksVUFBVyxLQUFJLENBQUk7QUFFaEMsWUFBTyxLQUFHLElBQUssQ0FBRSxLQUFJLENBQUUsRUFBSSxTQUFPLEVBQUksSUFBSSxNQUFJLENBQUM7S0FFaEQsQ0FBQztBQUVHLDBCQUFpQixFQUFJLFVBQVcsTUFBSyxDQUFJO0FBRXhDLGtCQUFPLEVBQUksT0FBSyxTQUFTLENBQUM7QUFFOUIsWUFBTyxZQUFVLEVBQ2hCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQ2hDLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFDekIsSUFBRSxDQUFDO0tBRUosQ0FBQztBQUVHLDBCQUFpQixFQUFJLFVBQVcsTUFBSyxDQUFJO0FBRXhDLGtCQUFPLEVBQUksT0FBSyxTQUFTLENBQUM7QUFFOUIsWUFBTyxxQ0FBbUMsRUFDekMsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQy9CLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUN6QixJQUFFLENBQUM7S0FFSixDQUFDO0FBRUcsb0JBQVcsRUFBSSxVQUFXLE1BQUssQ0FBRyxPQUFLLENBQUk7QUFFOUMsVUFBSyxNQUFLLFdBQWEsTUFBSSxZQUFZLENBQUk7QUFFdEMsaUJBQUksQ0FBQztBQUVULFlBQUssTUFBSyxXQUFhLE1BQUksWUFBWSxDQUFJO0FBSTFDLGdCQUFLLEtBQU0sQ0FBRSxNQUFLLG1CQUFtQixDQUFFLENBQUM7QUFDeEMsZ0JBQUssVUFBVyxFQUFDLENBQUM7QUFDbEIsZ0JBQUssYUFBYyxDQUFFLE1BQUssWUFBWSxDQUFFLENBQUM7QUFDekMsZ0JBQUssTUFBTyxDQUFFLE1BQUssTUFBTSxDQUFFLENBQUM7QUFFNUIsZ0JBQUssU0FBUyxDQUFHLEVBQUUsRUFBSSxHQUFDO0FBQ3hCLGdCQUFLLFNBQVMsQ0FBRyxFQUFFLEVBQUksR0FBQztBQUN4QixnQkFBSyxTQUFTLENBQUcsRUFBQyxDQUFFLEVBQUksR0FBQztBQUN6QixnQkFBSyxTQUFTLENBQUcsRUFBQyxDQUFFLEVBQUksR0FBQztBQUV6QixlQUFJLEVBQUksbUJBQWtCLENBQUUsTUFBSyxDQUFFLENBQUM7U0FFckMsS0FBTztBQUVOLGVBQUksRUFBSSxtQkFBa0IsQ0FBRSxNQUFLLFlBQVksQ0FBRSxDQUFDO1NBSWpEO0FBRUksbUJBQU0sRUFBSSxPQUFLLFFBQVEsQ0FBQztBQUN4Qix1QkFBVSxFQUFJLE1BQUksUUFBUSxDQUFHLE1BQUssR0FBRyxDQUFFLENBQUM7QUFFNUMsWUFBSyxXQUFVLElBQU0sVUFBUSxHQUFLLFlBQVUsSUFBTSxNQUFJLENBQUk7QUFFekQsaUJBQU0sTUFBTSxnQkFBZ0IsRUFBSSxNQUFJLENBQUM7QUFDckMsaUJBQU0sTUFBTSxhQUFhLEVBQUksTUFBSSxDQUFDO0FBQ2xDLGlCQUFNLE1BQU0sV0FBVyxFQUFJLE1BQUksQ0FBQztBQUNoQyxpQkFBTSxNQUFNLFVBQVUsRUFBSSxNQUFJLENBQUM7QUFFL0IsZUFBSSxRQUFRLENBQUcsTUFBSyxHQUFHLENBQUUsRUFBSSxNQUFJLENBQUM7U0FFbkM7QUFFQSxZQUFLLE9BQU0sV0FBVyxJQUFNLGNBQVksQ0FBSTtBQUUzQyx1QkFBWSxZQUFhLENBQUUsT0FBTSxDQUFFLENBQUM7U0FFckM7QUFBQSxPQUVEO0FBRUEsV0FBVSxPQUFJO0FBQUcsYUFBSSxPQUFLLFNBQVMsT0FBTyxDQUFHLElBQUksR0FBRyxJQUFHLENBQUk7QUFFMUQsb0JBQVksQ0FBRSxNQUFLLFNBQVMsQ0FBRyxFQUFFLENBQUcsT0FBSyxDQUFFLENBQUM7T0FFN0M7QUFBQSxLQUVELENBQUM7QUFHRCxRQUFHLE9BQU8sRUFBSSxVQUFXLEtBQUksQ0FBRyxPQUFLLENBQUk7QUFFcEMsYUFBRSxFQUFJLElBQUUsRUFBSSxLQUFHLElBQUssQ0FBRSxLQUFJLEtBQUssU0FBVSxDQUFFLE1BQUssSUFBSSxFQUFJLElBQUUsQ0FBRSxDQUFFLEVBQUksUUFBTSxDQUFDO0FBRTdFLFVBQUssS0FBSSxPQUFPLElBQUksSUFBTSxJQUFFLENBQUk7QUFFL0Isa0JBQVMsTUFBTSxrQkFBa0IsRUFBSSxJQUFFLEVBQUksS0FBRyxDQUFDO0FBQy9DLGtCQUFTLE1BQU0sZUFBZSxFQUFJLElBQUUsRUFBSSxLQUFHLENBQUM7QUFDNUMsa0JBQVMsTUFBTSxhQUFhLEVBQUksSUFBRSxFQUFJLEtBQUcsQ0FBQztBQUMxQyxrQkFBUyxNQUFNLFlBQVksRUFBSSxJQUFFLEVBQUksS0FBRyxDQUFDO0FBRXpDLGFBQUksT0FBTyxJQUFJLEVBQUksSUFBRSxDQUFDO09BRXZCO0FBRUEsV0FBSSxrQkFBbUIsRUFBQyxDQUFDO0FBRXpCLFVBQUssTUFBSyxPQUFPLElBQU0sVUFBUSxDQUFJO0FBQUUsY0FBSyxrQkFBbUIsRUFBQztPQUFFO0FBRWhFLFlBQUssbUJBQW1CLFdBQVksQ0FBRSxNQUFLLFlBQVksQ0FBRSxDQUFDO0FBRXRELGVBQUksRUFBSSxtQkFBaUIsRUFBSSxJQUFFLEVBQUksTUFBSSxFQUFJLG1CQUFrQixDQUFFLE1BQUssbUJBQW1CLENBQUUsRUFDNUYsZ0JBQWMsRUFBSSxXQUFTLEVBQUksTUFBSSxFQUFJLFlBQVUsRUFBSSxTQUFPLENBQUM7QUFHOUQsVUFBSyxLQUFJLE9BQU8sTUFBTSxJQUFNLE1BQUksQ0FBSTtBQUVuQyxxQkFBWSxNQUFNLGdCQUFnQixFQUFJLE1BQUksQ0FBQztBQUMzQyxxQkFBWSxNQUFNLGFBQWEsRUFBSSxNQUFJLENBQUM7QUFDeEMscUJBQVksTUFBTSxXQUFXLEVBQUksTUFBSSxDQUFDO0FBQ3RDLHFCQUFZLE1BQU0sVUFBVSxFQUFJLE1BQUksQ0FBQztBQUVyQyxhQUFJLE9BQU8sTUFBTSxFQUFJLE1BQUksQ0FBQztPQUUzQjtBQUVBLGtCQUFZLENBQUUsS0FBSSxDQUFHLE9BQUssQ0FBRSxDQUFDO0tBRTlCLENBQUM7R0FFRixDQUFDO0FBRUYsRUFBQywrSUFBQztBQUNGOzs7Ozs7O2lFQy9QQSxpQ0FBUSx1QkFBVSxDQUFHLDBDQUFVLEtBQUksQ0FBRztBQUNyQyxjQUFXLENBQUM7QUFTWixPQUFJLGtCQUFrQixFQUFJLFVBQVUsTUFBSyxDQUFHLFdBQVMsQ0FBRztBQUVuRCxhQUFJLEVBQUksS0FBRyxDQUFDO0FBQ1osYUFBSSxFQUFJO0FBQUUsVUFBRyxDQUFHLEVBQUM7QUFBRyxZQUFLLENBQUc7QUFBRyxVQUFHLENBQUc7QUFBRyxTQUFFLENBQUc7QUFBRyxrQkFBVyxDQUFHO0FBQUcsb0JBQWEsQ0FBRztBQUFBLEtBQUUsQ0FBQztBQUV4RixRQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDcEIsUUFBRyxXQUFXLEVBQUksRUFBRSxVQUFTLElBQU0sVUFBUSxDQUFFLEVBQUksV0FBUyxFQUFJLFNBQU8sQ0FBQztBQUl0RSxRQUFHLFFBQVEsRUFBSSxLQUFHLENBQUM7QUFFbkIsUUFBRyxPQUFPLEVBQUk7QUFBRSxVQUFHLENBQUc7QUFBRyxTQUFFLENBQUc7QUFBRyxXQUFJLENBQUc7QUFBRyxZQUFLLENBQUc7QUFBQSxLQUFFLENBQUM7QUFFdEQsUUFBRyxZQUFZLEVBQUksSUFBRSxDQUFDO0FBQ3RCLFFBQUcsVUFBVSxFQUFJLElBQUUsQ0FBQztBQUNwQixRQUFHLFNBQVMsRUFBSSxJQUFFLENBQUM7QUFFbkIsUUFBRyxTQUFTLEVBQUksTUFBSSxDQUFDO0FBQ3JCLFFBQUcsT0FBTyxFQUFJLE1BQUksQ0FBQztBQUNuQixRQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7QUFDbEIsUUFBRyxPQUFPLEVBQUksTUFBSSxDQUFDO0FBRW5CLFFBQUcsYUFBYSxFQUFJLE1BQUksQ0FBQztBQUN6QixRQUFHLHFCQUFxQixFQUFJLElBQUUsQ0FBQztBQUUvQixRQUFHLFlBQVksRUFBSSxHQUFDO0FBQ3BCLFFBQUcsWUFBWSxFQUFJLFNBQU8sQ0FBQztBQUUzQixRQUFHLEtBQUssRUFBSSxFQUFFLEVBQUMsQ0FBUyxHQUFDLENBQVMsR0FBQyxDQUFRLENBQUM7QUFJNUMsUUFBRyxPQUFPLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBRTdCLFdBQUUsRUFBSSxTQUFPLENBQUM7QUFFZCxvQkFBVyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUVsQyxjQUFLLEVBQUksTUFBSSxLQUFLO0FBQ3JCLGtCQUFTLEVBQUksTUFBSSxLQUFLO0FBRXRCLFlBQUcsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDO0FBRXpCLG9CQUFXLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQztBQUNqQyxrQkFBUyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUM7QUFFL0Isa0JBQVMsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDO0FBQy9CLGdCQUFPLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQztBQUU3QiwrQkFBc0IsRUFBSTtBQUMxQiw2QkFBb0IsRUFBSTtBQUV4QixpQkFBUSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUM7QUFDOUIsZUFBTSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUk5QixRQUFHLFFBQVEsRUFBSSxLQUFHLE9BQU8sTUFBTyxFQUFDLENBQUM7QUFDbEMsUUFBRyxVQUFVLEVBQUksS0FBRyxPQUFPLFNBQVMsTUFBTyxFQUFDLENBQUM7QUFDN0MsUUFBRyxJQUFJLEVBQUksS0FBRyxPQUFPLEdBQUcsTUFBTyxFQUFDLENBQUM7QUFJN0IsbUJBQVUsRUFBSSxFQUFFLElBQUcsQ0FBRyxTQUFPLENBQUUsQ0FBQztBQUNoQyxrQkFBUyxFQUFJLEVBQUUsSUFBRyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQzdCLGdCQUFPLEVBQUksRUFBRSxJQUFHLENBQUcsTUFBSSxDQUFDLENBQUM7QUFLN0IsUUFBRyxhQUFhLEVBQUksVUFBVSxDQUFFO0FBRS9CLFVBQUksSUFBRyxXQUFXLElBQU0sU0FBTyxDQUFHO0FBRWpDLFlBQUcsT0FBTyxLQUFLLEVBQUksR0FBQztBQUNwQixZQUFHLE9BQU8sSUFBSSxFQUFJLEdBQUM7QUFDbkIsWUFBRyxPQUFPLE1BQU0sRUFBSSxPQUFLLFdBQVcsQ0FBQztBQUNyQyxZQUFHLE9BQU8sT0FBTyxFQUFJLE9BQUssWUFBWSxDQUFDO09BRXhDLEtBQU87QUFFRixlQUFFLEVBQUksS0FBRyxXQUFXLHNCQUF1QixFQUFDLENBQUM7QUFFN0MsZUFBSSxLQUFHLFdBQVcsY0FBYyxnQkFBZ0IsQ0FBQztBQUNyRCxZQUFHLE9BQU8sS0FBSyxFQUFJLElBQUUsS0FBSyxFQUFJLE9BQUssWUFBWSxFQUFJLGFBQVcsQ0FBQztBQUMvRCxZQUFHLE9BQU8sSUFBSSxFQUFJLElBQUUsSUFBSSxFQUFJLE9BQUssWUFBWSxFQUFJLFlBQVUsQ0FBQztBQUM1RCxZQUFHLE9BQU8sTUFBTSxFQUFJLElBQUUsTUFBTSxDQUFDO0FBQzdCLFlBQUcsT0FBTyxPQUFPLEVBQUksSUFBRSxPQUFPLENBQUM7T0FFaEM7QUFBQSxLQUVELENBQUM7QUFHRCxRQUFHLFlBQVksRUFBSSxVQUFVLEtBQUksQ0FBRztBQUVuQyxVQUFJLE1BQU8sS0FBRyxDQUFHLEtBQUksS0FBSyxDQUFFLEdBQUssV0FBUyxDQUFHO0FBRTVDLFlBQUcsQ0FBRyxLQUFJLEtBQUssQ0FBRyxDQUFDLEtBQUksQ0FBQyxDQUFDO09BRTFCO0FBQUEsS0FFRCxDQUFDO0FBRUcsd0JBQWUsRUFBSSxFQUFFLFNBQVUsQ0FBRTtBQUVoQyxnQkFBSyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUVoQyxZQUFPLFVBQVUsS0FBSSxDQUFHLE1BQUksQ0FBRztBQUU5QixjQUFLLElBQUssQ0FDUixDQUFFLEtBQUksRUFBSSxNQUFJLE9BQU8sS0FBSyxDQUFFLEVBQUksTUFBSSxPQUFPLE1BQU0sQ0FDakQsRUFBRSxLQUFJLEVBQUksTUFBSSxPQUFPLElBQUksQ0FBRSxFQUFJLE1BQUksT0FBTyxPQUFPLENBQ25ELENBQUM7QUFFRCxjQUFPLE9BQUssQ0FBQztPQUVkLENBQUM7S0FFRCxFQUFDLENBQUUsQ0FBQztBQUVELGdDQUF1QixFQUFJLEVBQUUsU0FBVSxDQUFFO0FBRXhDLGdCQUFLLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQzVCLGtCQUFPLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBQzlCLHFCQUFVLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQyxDQUFDO0FBRXJDLFlBQU8sVUFBVSxLQUFJLENBQUcsTUFBSSxDQUFHO0FBRTlCLG1CQUFVLElBQUssQ0FDYixDQUFFLEtBQUksRUFBSSxNQUFJLE9BQU8sTUFBTSxFQUFJLElBQUUsRUFBSSxNQUFJLE9BQU8sS0FBSyxDQUFFLEVBQUksRUFBQyxLQUFJLE9BQU8sTUFBTSxFQUFJLEdBQUMsQ0FBQyxDQUNuRixFQUFFLEtBQUksT0FBTyxPQUFPLEVBQUksSUFBRSxFQUFJLE1BQUksT0FBTyxJQUFJLEVBQUksTUFBSSxDQUFFLEVBQUksRUFBQyxLQUFJLE9BQU8sT0FBTyxFQUFJLEdBQUMsQ0FBQyxDQUNyRixJQUFFLENBQ0gsQ0FBQztBQUVHLGtCQUFLLEVBQUksWUFBVSxPQUFRLEVBQUMsQ0FBQztBQUVqQyxZQUFJLEtBQUksT0FBTyxDQUFHO0FBRWpCLGNBQUksTUFBSyxFQUFJLEtBQUcsUUFBUSxDQUFHO0FBRTFCLHVCQUFVLEVBQUUsRUFBSSxLQUFHLEtBQU0sQ0FBQyxHQUFFLEVBQUksT0FBSyxFQUFJLE9BQUssQ0FBQyxDQUFDO1dBRWpELEtBQU87QUFFTix1QkFBVSxFQUFFLEVBQUksR0FBQyxFQUFJLE9BQUssQ0FBQztXQUU1QjtBQUFBLFNBRUQsS0FBTyxLQUFJLE1BQUssRUFBSSxJQUFFLENBQUc7QUFFeEIscUJBQVUsVUFBVyxFQUFDLENBQUM7U0FFeEIsS0FBTztBQUVOLHFCQUFVLEVBQUUsRUFBSSxLQUFHLEtBQU0sQ0FBQyxHQUFFLEVBQUksT0FBSyxFQUFJLE9BQUssQ0FBQyxDQUFDO1NBRWpEO0FBRUEsWUFBRyxLQUFNLENBQUMsS0FBSSxPQUFPLFNBQVMsQ0FBQyxJQUFLLENBQUMsS0FBSSxPQUFPLENBQUMsQ0FBQztBQUVsRCxjQUFLLEtBQU0sQ0FBQyxLQUFJLE9BQU8sR0FBRyxDQUFDLFVBQVcsQ0FBQyxXQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELGNBQUssSUFBSyxDQUFDLFFBQU8sS0FBTSxDQUFDLEtBQUksT0FBTyxHQUFHLENBQUMsTUFBTyxDQUFDLElBQUcsQ0FBQyxVQUFXLENBQUMsV0FBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9FLGNBQUssSUFBSyxDQUFDLElBQUcsVUFBVyxDQUFDLFdBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUV6QyxjQUFPLE9BQUssQ0FBQztPQUVkLENBQUM7S0FFRCxFQUFDLENBQUUsQ0FBQztBQUVMLFFBQUcsYUFBYSxFQUFJLEVBQUMsU0FBVSxDQUFFO0FBRTVCLGNBQUcsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDO0FBQzVCLG9CQUFTLEVBQUksSUFBSSxNQUFJLFdBQVksRUFBQyxDQUFDO0FBR3BDLFlBQU8sVUFBVSxDQUFFO0FBRWQsaUJBQUksRUFBSSxLQUFHLEtBQU0sQ0FBQyxZQUFXLElBQUssQ0FBQyxVQUFTLENBQUMsRUFBSSxhQUFXLE9BQVEsRUFBQyxFQUFJLFdBQVMsT0FBUSxFQUFDLENBQUMsQ0FBQztBQUVqRyxZQUFJLEtBQUksQ0FBRztBQUVWLGNBQUcsYUFBYyxDQUFDLFlBQVcsQ0FBRyxXQUFTLENBQUMsVUFBVyxFQUFDLENBQUM7QUFFdkQsZUFBSSxHQUFLLE1BQUksWUFBWSxDQUFDO0FBRTFCLG9CQUFTLGlCQUFrQixDQUFDLElBQUcsQ0FBRyxFQUFDLEtBQUksQ0FBQyxDQUFDO0FBRXpDLGNBQUcsZ0JBQWlCLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDaEMsZUFBSSxPQUFPLEdBQUcsZ0JBQWlCLENBQUMsVUFBUyxDQUFDLENBQUM7QUFFM0Msb0JBQVMsZ0JBQWlCLENBQUMsVUFBUyxDQUFDLENBQUM7QUFFdEMsY0FBSSxLQUFJLGFBQWEsQ0FBRztBQUV2Qix3QkFBVyxLQUFNLENBQUMsVUFBUyxDQUFDLENBQUM7V0FFOUIsS0FBTztBQUVOLHNCQUFTLGlCQUFrQixDQUFDLElBQUcsQ0FBRyxNQUFJLEVBQUksRUFBRSxLQUFJLHFCQUFxQixFQUFJLElBQUUsQ0FBRSxDQUFDLENBQUM7QUFDL0Usd0JBQVcsZ0JBQWlCLENBQUMsVUFBUyxDQUFDLENBQUM7V0FFekM7QUFBQSxTQUVEO0FBQUEsT0FDRDtLQUVBLEVBQUMsQ0FBQyxDQUFDO0FBRUosUUFBRyxXQUFXLEVBQUksVUFBVSxDQUFFO0FBRTdCLFVBQUksTUFBSyxJQUFNLE1BQUksZUFBZSxDQUFHO0FBR2hDLGtCQUFLLEVBQUksd0JBQXNCLEVBQUksc0JBQW9CLENBQUM7QUFDNUQsK0JBQXNCLEVBQUksc0JBQW9CLENBQUM7QUFDL0MsWUFBRyxlQUFnQixDQUFDLE1BQUssQ0FBQyxDQUFDO09BRTVCLEtBQU87QUFHRixrQkFBSyxFQUFJLElBQUUsRUFBSSxFQUFFLFFBQU8sRUFBRSxFQUFJLFdBQVMsRUFBRSxDQUFFLEVBQUksTUFBSSxVQUFVLENBQUM7QUFFbEUsWUFBSSxNQUFLLElBQU0sSUFBRSxHQUFLLE9BQUssRUFBSSxJQUFFLENBQUc7QUFFbkMsY0FBRyxlQUFnQixDQUFDLE1BQUssQ0FBQyxDQUFDO0FBRTNCLGNBQUksS0FBSSxhQUFhLENBQUc7QUFFdkIsc0JBQVMsS0FBTSxDQUFDLFFBQU8sQ0FBQyxDQUFDO1dBRTFCLEtBQU87QUFFTixzQkFBUyxFQUFFLEdBQUssRUFBRSxRQUFPLEVBQUUsRUFBSSxXQUFTLEVBQUUsQ0FBRSxFQUFJLEtBQUcscUJBQXFCLENBQUM7V0FFMUU7QUFBQSxTQUVEO0FBQUEsT0FFRDtBQUFBLEtBRUQsQ0FBQztBQUVELFFBQUcsVUFBVSxFQUFJLEVBQUMsU0FBVSxDQUFFO0FBRXpCLHFCQUFVLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQztBQUNuQyxrQkFBTyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUM7QUFDN0IsYUFBRSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUUxQixZQUFPLFVBQVUsQ0FBRTtBQUVsQixtQkFBVSxLQUFNLENBQUMsT0FBTSxDQUFDLElBQUssQ0FBQyxTQUFRLENBQUMsQ0FBQztBQUV4QyxZQUFJLFdBQVUsU0FBVSxFQUFDLENBQUc7QUFFM0IscUJBQVUsZUFBZ0IsQ0FBQyxJQUFHLE9BQVEsRUFBQyxFQUFJLE1BQUksU0FBUyxDQUFDLENBQUM7QUFFMUQsYUFBRSxLQUFNLENBQUMsSUFBRyxDQUFDLE1BQU8sQ0FBQyxLQUFJLE9BQU8sR0FBRyxDQUFDLFVBQVcsQ0FBQyxXQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQzlELGFBQUUsSUFBSyxDQUFDLFFBQU8sS0FBTSxDQUFDLEtBQUksT0FBTyxHQUFHLENBQUMsVUFBVyxDQUFDLFdBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVoRSxlQUFJLE9BQU8sU0FBUyxJQUFLLENBQUMsR0FBRSxDQUFDLENBQUM7QUFDOUIsZUFBSSxPQUFPLElBQUssQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUVyQixjQUFJLEtBQUksYUFBYSxDQUFHO0FBRXZCLHFCQUFRLEtBQU0sQ0FBQyxPQUFNLENBQUMsQ0FBQztXQUV4QixLQUFPO0FBRU4scUJBQVEsSUFBSyxDQUFDLFdBQVUsV0FBWSxDQUFDLE9BQU0sQ0FBRyxVQUFRLENBQUMsZUFBZ0IsQ0FBQyxLQUFJLHFCQUFxQixDQUFDLENBQUMsQ0FBQztXQUVyRztBQUFBLFNBRUQ7QUFBQSxPQUNEO0tBRUEsRUFBQyxDQUFDLENBQUM7QUFNSixRQUFHLGtCQUFrQixFQUFJLFVBQVUsUUFBTyxDQUFHO0FBQzVDLFdBQUksT0FBTyxTQUFTLFVBQVcsRUFBQyxlQUFnQixDQUFDLFFBQU8sQ0FBQyxDQUFDO0tBQzNELENBQUM7QUFJRCxRQUFHLGVBQWUsRUFBSSxVQUFVLENBQUU7QUFFakMsVUFBSSxDQUFDLEtBQUksT0FBTyxHQUFLLEVBQUMsS0FBSSxNQUFNLENBQUc7QUFFbEMsWUFBSSxJQUFHLFNBQVUsRUFBQyxFQUFJLE1BQUksWUFBWSxFQUFJLE1BQUksWUFBWSxDQUFHO0FBRTVELGVBQUksT0FBTyxTQUFTLFdBQVksQ0FBQyxLQUFJLE9BQU8sQ0FBRyxLQUFHLFVBQVcsQ0FBQyxLQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FFbEY7QUFFQSxZQUFJLElBQUcsU0FBVSxFQUFDLEVBQUksTUFBSSxZQUFZLEVBQUksTUFBSSxZQUFZLENBQUc7QUFFNUQsZUFBSSxPQUFPLFNBQVMsV0FBWSxDQUFDLEtBQUksT0FBTyxDQUFHLEtBQUcsVUFBVyxDQUFDLEtBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztTQUVsRjtBQUFBLE9BRUQ7QUFBQSxLQUVELENBQUM7QUFFRCxRQUFHLE9BQU8sRUFBSSxVQUFVLENBQUU7QUFFekIsVUFBRyxXQUFZLENBQUMsS0FBSSxPQUFPLFNBQVMsQ0FBRyxNQUFJLE9BQU8sQ0FBQyxDQUFDO0FBRXBELFVBQUksQ0FBQyxLQUFJLFNBQVMsQ0FBRztBQUVwQixhQUFJLGFBQWMsRUFBQyxDQUFDO09BRXJCO0FBRUEsVUFBSSxDQUFDLEtBQUksT0FBTyxDQUFHO0FBRWxCLGFBQUksV0FBWSxFQUFDLENBQUM7T0FFbkI7QUFFQSxVQUFJLENBQUMsS0FBSSxNQUFNLENBQUc7QUFFakIsYUFBSSxVQUFXLEVBQUMsQ0FBQztPQUVsQjtBQUVBLFdBQUksT0FBTyxTQUFTLFdBQVksQ0FBQyxLQUFJLE9BQU8sQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUVwRCxXQUFJLGVBQWdCLEVBQUMsQ0FBQztBQUV0QixXQUFJLE9BQU8sT0FBUSxDQUFDLEtBQUksT0FBTyxDQUFDLENBQUM7QUFFakMsVUFBSSxZQUFXLGtCQUFtQixDQUFDLEtBQUksT0FBTyxTQUFTLENBQUMsRUFBSSxJQUFFLENBQUc7QUFFaEUsYUFBSSxjQUFlLENBQUMsV0FBVSxDQUFDLENBQUM7QUFFaEMsb0JBQVcsS0FBTSxDQUFDLEtBQUksT0FBTyxTQUFTLENBQUMsQ0FBQztPQUV6QztBQUFBLEtBRUQsQ0FBQztBQUdELFFBQUcsTUFBTSxFQUFJLFVBQVUsQ0FBRTtBQUV4QixZQUFLLEVBQUksTUFBSSxLQUFLLENBQUM7QUFDbkIsZ0JBQVMsRUFBSSxNQUFJLEtBQUssQ0FBQztBQUV2QixXQUFJLE9BQU8sS0FBTSxDQUFDLEtBQUksUUFBUSxDQUFDLENBQUM7QUFDaEMsV0FBSSxPQUFPLFNBQVMsS0FBTSxDQUFDLEtBQUksVUFBVSxDQUFDLENBQUM7QUFDM0MsV0FBSSxPQUFPLEdBQUcsS0FBTSxDQUFDLEtBQUksSUFBSSxDQUFDLENBQUM7QUFFL0IsVUFBRyxXQUFZLENBQUMsS0FBSSxPQUFPLFNBQVMsQ0FBRyxNQUFJLE9BQU8sQ0FBQyxDQUFDO0FBRXBELFdBQUksT0FBTyxPQUFRLENBQUMsS0FBSSxPQUFPLENBQUMsQ0FBQztBQUVqQyxXQUFJLGNBQWUsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQUVoQyxrQkFBVyxLQUFNLENBQUMsS0FBSSxPQUFPLFNBQVMsQ0FBQyxDQUFDO0tBRXpDLENBQUM7QUFPRyxxQkFBWSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUVuQyx5QkFBZ0IsRUFBSSxHQUFDO0FBR3pCLFlBQVMsUUFBTSxDQUFHLEtBQUksQ0FBSTtBQUd6QixjQUFTLEtBQUksUUFBUTtBQUVwQixZQUFLLEdBQUMsQ0FBQztBQUNQLFlBQUssR0FBQztBQUNMLHVCQUFZLEVBQUUsRUFBSSxrQkFBZ0IsQ0FBQztBQUNuQyxnQkFBSztBQUVOLFlBQUssR0FBQyxDQUFDO0FBQ1AsWUFBSyxHQUFDO0FBQ0wsdUJBQVksRUFBRSxFQUFJLEVBQUMsaUJBQWdCLENBQUM7QUFDcEMsZ0JBQUs7QUFFTixZQUFLLEdBQUMsQ0FBQztBQUNQLFlBQUssR0FBQztBQUNMLHVCQUFZLEVBQUUsRUFBSSxFQUFDLGlCQUFnQixDQUFDO0FBQ3BDLGdCQUFLO0FBRU4sWUFBSyxHQUFDLENBQUM7QUFDUCxZQUFLLEdBQUM7QUFDTCx1QkFBWSxFQUFFLEVBQUksa0JBQWdCLENBQUM7QUFDbkMsZ0JBQUs7QUFBQSxPQUVQO0tBRUQ7QUFHQSxZQUFTLE1BQUksQ0FBRyxLQUFJLENBQUk7QUFHdkIsY0FBUSxLQUFJLFFBQVE7QUFFbkIsWUFBSyxHQUFDLENBQUM7QUFDUCxZQUFLLEdBQUM7QUFDTCx1QkFBWSxFQUFFLEVBQUksR0FBQztBQUNuQixnQkFBSztBQUVOLFlBQUssR0FBQyxDQUFDO0FBQ1AsWUFBSyxHQUFDO0FBQ0wsdUJBQVksRUFBRSxFQUFJLEdBQUM7QUFDbkIsZ0JBQUs7QUFFTixZQUFLLEdBQUMsQ0FBQztBQUNQLFlBQUssR0FBQztBQUNMLHVCQUFZLEVBQUUsRUFBSSxHQUFDO0FBQ25CLGdCQUFLO0FBRU4sWUFBSyxHQUFDLENBQUM7QUFDUCxZQUFLLEdBQUM7QUFDTCx1QkFBWSxFQUFFLEVBQUksR0FBQztBQUNuQixnQkFBSztBQUFBLE9BRVA7S0FFRDtBQUtBLFlBQVMsVUFBUSxDQUFFLEtBQUksQ0FBRztBQUV6QixVQUFJLEtBQUksUUFBUSxJQUFNLE1BQUk7QUFBRyxlQUFNO0FBS25DLFVBQUksTUFBSyxJQUFNLE1BQUksS0FBSyxDQUFHO0FBRTFCLGNBQUssRUFBSSxNQUFJLE9BQU8sQ0FBQztPQUV0QjtBQUVBLFVBQUksTUFBSyxJQUFNLE1BQUksT0FBTyxHQUFLLEVBQUMsS0FBSSxTQUFTLENBQUc7QUFFL0Msb0JBQVcsS0FBTSxDQUFDLHdCQUF3QixDQUFDLEtBQUksTUFBTSxDQUFHLE1BQUksTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNyRSxrQkFBUyxLQUFNLENBQUMsWUFBVyxDQUFDLENBQUM7T0FFOUIsS0FBTyxLQUFJLE1BQUssSUFBTSxNQUFJLEtBQUssR0FBSyxFQUFDLEtBQUksT0FBTyxDQUFHO0FBRWxELGtCQUFTLEtBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLE1BQU0sQ0FBRyxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDM0QsZ0JBQU8sS0FBTSxDQUFDLFVBQVMsQ0FBQyxDQUFDO09BRTFCLEtBQU8sS0FBSSxNQUFLLElBQU0sTUFBSSxJQUFJLEdBQUssRUFBQyxLQUFJLE1BQU0sQ0FBRztBQUVoRCxpQkFBUSxLQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFELGVBQU0sS0FBTSxDQUFDLFNBQVEsQ0FBQztPQUV2QjtBQUVBLGNBQU8saUJBQWtCLENBQUMsV0FBVSxDQUFHLFVBQVEsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUN4RCxjQUFPLGlCQUFrQixDQUFDLFNBQVEsQ0FBRyxRQUFNLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFcEQsV0FBSSxjQUFlLENBQUMsVUFBUyxDQUFDLENBQUM7S0FFaEM7QUFFQSxZQUFTLFVBQVEsQ0FBRSxLQUFJLENBQUc7QUFFekIsVUFBSSxLQUFJLFFBQVEsSUFBTSxNQUFJO0FBQUcsZUFBTTtBQUtuQyxVQUFJLE1BQUssSUFBTSxNQUFJLE9BQU8sR0FBSyxFQUFDLEtBQUksU0FBUyxDQUFHO0FBRS9DLGtCQUFTLEtBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLE1BQU0sQ0FBRyxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7T0FFcEUsS0FBTyxLQUFJLE1BQUssSUFBTSxNQUFJLEtBQUssR0FBSyxFQUFDLEtBQUksT0FBTyxDQUFHO0FBRWxELGdCQUFPLEtBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLE1BQU0sQ0FBRyxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7T0FFMUQsS0FBTyxLQUFJLE1BQUssSUFBTSxNQUFJLElBQUksR0FBSyxFQUFDLEtBQUksTUFBTSxDQUFHO0FBRWhELGVBQU0sS0FBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUksTUFBTSxDQUFHLE1BQUksTUFBTSxDQUFDLENBQUMsQ0FBQztPQUV6RDtBQUFBLEtBRUQ7QUFFQSxZQUFTLFFBQU0sQ0FBRSxLQUFJLENBQUc7QUFFdkIsVUFBSSxLQUFJLFFBQVEsSUFBTSxNQUFJO0FBQUcsZUFBTTtBQUtuQyxZQUFLLEVBQUksTUFBSSxLQUFLLENBQUM7QUFFbkIsY0FBTyxvQkFBcUIsQ0FBQyxXQUFVLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDcEQsY0FBTyxvQkFBcUIsQ0FBQyxTQUFRLENBQUcsUUFBTSxDQUFDLENBQUM7QUFDaEQsV0FBSSxjQUFlLENBQUMsUUFBTyxDQUFDLENBQUM7S0FFOUI7QUFFQSxZQUFTLFdBQVMsQ0FBRSxLQUFJLENBQUc7QUFFMUIsVUFBSSxLQUFJLFFBQVEsSUFBTSxNQUFJO0FBQUcsZUFBTTtBQUVuQyxXQUFJLGVBQWdCLEVBQUMsQ0FBQztBQUN0QixXQUFJLGdCQUFpQixFQUFDLENBQUM7QUFFbkIsZUFBSSxFQUFJLEdBQUM7QUFFYixVQUFJLEtBQUksV0FBVyxDQUFHO0FBRXJCLGFBQUksRUFBSSxNQUFJLFdBQVcsRUFBSSxHQUFDLENBQUM7T0FFOUIsS0FBTyxLQUFJLEtBQUksT0FBTyxDQUFHO0FBRXhCLGFBQUksRUFBSSxFQUFDLEtBQUksT0FBTyxFQUFJLEdBQUM7T0FFMUI7QUFFQSxnQkFBUyxFQUFFLEdBQUssTUFBSSxFQUFJLEtBQUcsQ0FBQztBQUM1QixXQUFJLGNBQWUsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUMvQixXQUFJLGNBQWUsQ0FBQyxRQUFPLENBQUMsQ0FBQztLQUU5QjtBQUVBLFlBQVMsV0FBUyxDQUFFLEtBQUksQ0FBRztBQUUxQixVQUFJLEtBQUksUUFBUSxJQUFNLE1BQUksQ0FBRztBQUFFLGVBQUs7T0FBRTtBQUV0QyxjQUFRLEtBQUksUUFBUSxPQUFPO0FBRTFCLFlBQUs7QUFDSixnQkFBSyxFQUFJLE1BQUksYUFBYSxDQUFDO0FBQzNCLHNCQUFXLEtBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBRyxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDL0Ysb0JBQVMsS0FBTSxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQzdCLGdCQUFLO0FBRU4sWUFBSztBQUNKLGdCQUFLLEVBQUksTUFBSSxlQUFlLENBQUM7QUFDekIsZ0JBQUMsRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQztBQUN4RCxnQkFBQyxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFDO0FBQzVELCtCQUFvQixFQUFJLHdCQUFzQixFQUFJLEtBQUcsS0FBTSxDQUFDLEVBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxFQUFJLEdBQUMsQ0FBQyxDQUFDO0FBRTFFLGlCQUFJLEVBQUUsS0FBSSxRQUFRLENBQUcsRUFBRSxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQy9ELGlCQUFJLEVBQUUsS0FBSSxRQUFRLENBQUcsRUFBRSxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQ25FLG1CQUFRLEtBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFHLEdBQUMsQ0FBQyxDQUFDO0FBQ3RDLGlCQUFNLEtBQU0sQ0FBQyxTQUFRLENBQUMsQ0FBQztBQUN2QixnQkFBSztBQUVOO0FBQ0MsZ0JBQUssRUFBSSxNQUFJLEtBQUssQ0FBQztBQURiLE9BR1I7QUFDQSxXQUFJLGNBQWUsQ0FBQyxVQUFTLENBQUMsQ0FBQztLQUdoQztBQUVBLFlBQVMsVUFBUSxDQUFFLEtBQUksQ0FBRztBQUV6QixVQUFJLEtBQUksUUFBUSxJQUFNLE1BQUk7QUFBRyxlQUFNO0FBS25DLGNBQVEsS0FBSSxRQUFRLE9BQU87QUFFMUIsWUFBSztBQUNKLG9CQUFTLEtBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBRyxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDN0YsZ0JBQUs7QUFFTixZQUFLO0FBQ0EsZ0JBQUMsRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQztBQUN4RCxnQkFBQyxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFDO0FBQzVELCtCQUFvQixFQUFJLEtBQUcsS0FBTSxDQUFDLEVBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxFQUFJLEdBQUMsQ0FBQyxDQUFDO0FBRWhELGlCQUFJLEVBQUUsS0FBSSxRQUFRLENBQUcsRUFBRSxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQy9ELGlCQUFJLEVBQUUsS0FBSSxRQUFRLENBQUcsRUFBRSxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUUsRUFBSSxHQUFDO0FBQ25FLGlCQUFNLEtBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFHLEdBQUMsQ0FBQyxDQUFDO0FBQ3BDLGdCQUFLO0FBRU47QUFDQyxnQkFBSyxFQUFJLE1BQUksS0FBSyxDQUFDO0FBRGIsT0FHUjtLQUVEO0FBRUEsWUFBUyxTQUFPLENBQUUsS0FBSSxDQUFHO0FBRXhCLFVBQUksS0FBSSxRQUFRLElBQU0sTUFBSTtBQUFHLGVBQU07QUFHbkMsY0FBUSxLQUFJLFFBQVEsT0FBTztBQUUxQixZQUFLO0FBQ0osb0JBQVMsS0FBTSxDQUFDLHdCQUF3QixDQUFDLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFHLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM3RixzQkFBVyxLQUFNLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDN0IsZ0JBQUs7QUFFTixZQUFLO0FBQ0osaUNBQXNCLEVBQUksc0JBQW9CLEVBQUksR0FBQztBQUUvQyxpQkFBSSxFQUFFLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFFLEVBQUksR0FBQztBQUMvRCxpQkFBSSxFQUFFLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFFLEVBQUksR0FBQztBQUNuRSxpQkFBTSxLQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRyxHQUFDLENBQUMsQ0FBQztBQUNwQyxtQkFBUSxLQUFNLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDdkIsZ0JBQUs7QUFBQSxPQUVQO0FBRUEsWUFBSyxFQUFJLE1BQUksS0FBSyxDQUFDO0FBQ25CLFdBQUksY0FBZSxDQUFDLFFBQU8sQ0FBQyxDQUFDO0tBRTlCO0FBR0EsUUFBRyxXQUFXLGlCQUFrQixDQUFDLGFBQVksQ0FBRyxVQUFVLEtBQUksQ0FBRztBQUFFLFdBQUksZUFBZ0IsRUFBQyxDQUFDO0tBQUUsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUVwRyxRQUFHLFdBQVcsaUJBQWtCLENBQUMsV0FBVSxDQUFHLFVBQVEsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUUvRCxRQUFHLFdBQVcsaUJBQWtCLENBQUMsWUFBVyxDQUFHLFdBQVMsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUNqRSxRQUFHLFdBQVcsaUJBQWtCLENBQUMsZ0JBQWUsQ0FBRyxXQUFTLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFckUsUUFBRyxXQUFXLGlCQUFrQixDQUFDLFlBQVcsQ0FBRyxXQUFTLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDakUsUUFBRyxXQUFXLGlCQUFrQixDQUFDLFVBQVMsQ0FBRyxTQUFPLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDN0QsUUFBRyxXQUFXLGlCQUFrQixDQUFDLFdBQVUsQ0FBRyxVQUFRLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFL0QsVUFBSyxpQkFBa0IsQ0FBQyxTQUFRLENBQUcsUUFBTSxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBQ2xELFVBQUssaUJBQWtCLENBQUMsT0FBTSxDQUFHLE1BQUksQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUU5QyxRQUFHLGFBQWMsRUFBQyxDQUFDO0FBR25CLFFBQUcsT0FBUSxFQUFDLENBQUM7R0FHZCxDQUFDO0FBRUQsT0FBSSxrQkFBa0IsVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFDLEtBQUksZ0JBQWdCLFVBQVUsQ0FBQyxDQUFDO0FBSW5GLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztBQzdwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNqQkE7QUFDQSxtREFBa0QsY0FBYyxrQkFBa0IsTUFBTSxPQUFPLFFBQVEsU0FBUyxTQUFTLFVBQVUscUJBQXFCLHNDQUFzQyx3QkFBd0IsMkJBQTJCLGNBQWMsa0JBQWtCLE1BQU0sT0FBTyxRQUFRLFNBQVMsU0FBUyxVQUFVLHFCQUFxQixROzs7Ozs7QUNEdlY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxtQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTJEO0FBQzNELE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYjAzNzkxNWYwMmY0ZmE1YmI4MDBcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzJyxcblx0Jy4vdXRpbC9UcmFja2JhbGxDb250cm9scy5qcycsXG5cdCcuL3AtdGhyZWUtZC5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyB0ZXN0IGZvciBicm93c2VyIDNEIHN1cHBvcnRcblx0Ly9cblx0ZnVuY3Rpb24gYnJvd3NlclN1cHBvcnQoKSB7XG5cdFx0dmFyIGNhbnZhcztcblx0XHR0cnkge1xuXHRcdFx0Y2FudmFzID0gJCgnPGNhbnZhcz4nKTtcblx0XHRcdHJldHVybiAhIShjYW52YXNbMF0uZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXNbMF0uZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJykpO1xuXHRcdH0gY2F0Y2ggKF9fKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGNhbnZhcyA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHQvL1xuXHQvLyBjb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgdGVzdGluZyBlcXVhbGl0eSBvZiBzaXplIG9iamVjdHNcblx0Ly9cblx0ZnVuY3Rpb24gc2l6ZUVxdWFsKHNpemVBLCBzaXplQikge1xuXHRcdHJldHVybiBzaXplQSAmJiBzaXplQiAmJiBzaXplQS53aWR0aCA9PT0gc2l6ZUIud2lkdGggJiYgc2l6ZUEuaGVpZ2h0ID09PSBzaXplQi5oZWlnaHQ7XG5cdH1cblxuXHQvL1xuXHQvLyBzb21lIHVzZWZ1bCBjb25zdGFudHMgZm9yIG1ha2luZyBpbnRlcnNlY3Rpb24gY2hlY2tzXG5cdC8vXG5cdHZhciBQTEFORSA9IG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKSwgMCk7XG5cdHZhciBQUk9KRUNUT1IgPSBuZXcgVEhSRUUuUHJvamVjdG9yKCk7XG5cblx0Ly9cblx0Ly8gdGhlIHBsdWdpblxuXHQvL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRpZDogJ3RocmVlLWQnLFxuXHRcdHJlcXVpcmVzOiBbJ3Bvc2l0aW9uLXRyYWNraW5nJ11cblx0fSkubW9kaWZ5KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlJyk7XG5cblx0Ly9cblx0Ly8gdGhlIGNvbnN0cnVjdG9yIGlzIHJ1biBvbmNlIHRvIGluaXRpYWxpemUgcG90ZW50aWFsIDNELW5lc3Ncblx0Ly9cblx0cGx1Z2luLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIHRlc3QgZm9yIGJyb3dzZXIgc3VwcG9ydFxuXHRcdC8vXG5cdFx0aWYgKCFicm93c2VyU3VwcG9ydCgpKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzZWVtIHRvIGhhdmUgV2ViR0wgc3VwcG9ydC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIHRoZSAndGhyZWVEQ2FudmFzRWxlbWVudCcgcHJvcGVydHlcblx0XHQvL1xuXHRcdFUub2JzZXJ2YWJsZSh0aGlzLCB7IG5hbWU6ICd0aHJlZURDYW52YXNFbGVtZW50JyB9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNFbGVtZW50JywgKG5ld0NhbnZhcywgb2xkQ2FudmFzKSA9PiB7XG5cdFx0XHRpZiAob2xkQ2FudmFzKSB7IG9sZENhbnZhcy5yZW1vdmVDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0XHRpZiAobmV3Q2FudmFzKSB7IG5ld0NhbnZhcy5hZGRDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5XG5cdFx0Ly9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3RocmVlRE1vZGUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiAhIXRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCB9LFxuXHRcdFx0c2V0KG5ld1RocmVlRE1vZGUpIHtcblx0XHRcdFx0aWYgKCEhbmV3VGhyZWVETW9kZSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgdHVybiBvbiAzRCBtb2RlIHRocm91Z2ggdGhlICd0aHJlZURNb2RlJyBwcm9wZXJ0eS4gRG8gc28gYnkgc2V0dGluZyB0aGUgJ3RocmVlRENhbnZhc0VsZW1lbnQnLlwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzRWxlbWVudCcsIChuZXdDYW52YXMsIG9sZENhbnZhcykgPT4ge1xuXHRcdFx0aWYgKG5ld0NhbnZhcyB8fCBvbGRDYW52YXMpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCd0aHJlZURNb2RlJywgISFuZXdDYW52YXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gVGhlICd0aHJlZURDYW52YXNTaXplJyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0dmFyIF9jYW52YXNTaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+ICh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgJiYge1xuXHRcdFx0XHR3aWR0aDogdGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKCksXG5cdFx0XHRcdGhlaWdodDogdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpXG5cdFx0XHR9KSxcblx0XHRcdGlzRXF1YWw6IHNpemVFcXVhbFxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGhyZWVEQ2FudmFzU2l6ZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIF9jYW52YXNTaXplKCkgfVxuXHRcdH0pO1xuXHRcdF9jYW52YXNTaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcigndGhyZWVEQ2FudmFzU2l6ZScsIG5ld1NpemUpIH0pO1xuXHRcdC8vXG5cdFx0Ly8gZm9yIG5vdywgdXNpbmcgd2luZG93IHJlc2l6ZSB0byB0cmlnZ2VyIGNhbnZhcyByZXNpemVcblx0XHQvL1xuXHRcdCQod2luZG93KS5yZXNpemUoX2NhbnZhc1NpemUpO1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIHRoZSAndGhyZWVEQ29udHJvbHNFbmFibGVkJyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0VS5vYnNlcnZhYmxlKHRoaXMsIHsgbmFtZTogJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcgfSk7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gSW5pdGlhbGl6ZSB3aGVuIDNEIG1vZGUgaXMgdHVybmVkIG9uXG5cdFx0Ly9cblx0XHR0aGlzLm9uKCd0aHJlZURNb2RlJywgKG1vZGUpID0+IHtcblx0XHRcdGlmIChtb2RlKSB7IHRoaXMuX3BfdGhyZWVEX2luaXRpYWxpemUoKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBXYXMgYSBjYW52YXMgZ2l2ZW4gdGhyb3VnaCB0aGUgb3B0aW9ucz9cblx0XHQvL1xuXHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCA9IHRoaXMub3B0aW9ucy50aHJlZURDYW52YXNFbGVtZW50O1xuXG5cdH0pO1xuXG5cdC8vXG5cdC8vIGBfcF90aHJlZURfaW5pdGlhbGl6ZWAgaXMgcnVuIGV2ZXJ5IHRpbWUgM0QtbmVzcyBpcyB0dXJuZWQgb25cblx0Ly9cblx0cGx1Z2luLmFkZCgnX3BfdGhyZWVEX2luaXRpYWxpemUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gRGV0ZXJtaW5lIGluaXRpYWwgY2lyY3VpdGJvYXJkIHBvc2l0aW9uaW5nIGluc2lkZSB0aGUgY2FudmFzXG5cdFx0Ly9cblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luID0ge307XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0ID0gdGhpcy5lbGVtZW50Lm9mZnNldCgpLmxlZnQgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkubGVmdDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS50b3AgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkudG9wO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQgPSB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLnNpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gPSB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC0gdGhpcy5zaXplLmhlaWdodCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gU2NlbmVcblx0XHQvL1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBDYW1lcmFcblx0XHQvL1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYSA9XG5cdFx0XHRcdG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC8gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCwgMSwgMTAwMDApO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCAoc2l6ZSkgPT4geyB0aGlzLl9wX3RocmVlRF9jYW1lcmEuYXNwZWN0ID0gc2l6ZS53aWR0aCAvIHNpemUuaGVpZ2h0IH0pO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5wb3NpdGlvbi56ID0gMTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIExpZ2h0aW5nXG5cdFx0Ly9cblx0XHR2YXIgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDEwMTAzMCk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG5cdFx0Ly9cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodDEgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDEucG9zaXRpb24uc2V0KDEsIC0xLCAxKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoZGlyZWN0aW9uYWxMaWdodDEpO1xuXHRcdC8vXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQyID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmVlZGQpO1xuXHRcdGRpcmVjdGlvbmFsTGlnaHQyLnBvc2l0aW9uLnNldCgtMSwgMSwgLTEpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0Mik7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBSZW5kZXJlcjogV2ViR0xcblx0XHQvL1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbHBoYTogdHJ1ZSwgYW50aWFsaWFzOiB0cnVlIH0pO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNvcnRPYmplY3RzID0gZmFsc2U7XG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc2V0U2l6ZSh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpKTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5yZW5kZXIodGhpcy5fcF90aHJlZURfc2NlbmUsIHRoaXMuX3BfdGhyZWVEX2NhbWVyYSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblx0XHR9KTtcblx0XHQvL1xuXHRcdC8vIFJlbmRlcmVyOiBDU1Ncblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MgPSBuZXcgVEhSRUUuQ1NTM0RSZW5kZXJlcigpO1xuXHRcdCQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpLmFwcGVuZCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5kb21FbGVtZW50KTtcblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5kb21FbGVtZW50KTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3Muc2V0U2l6ZSh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQud2lkdGgoKSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpKTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLl9wX3RocmVlRF9jYW1lcmEpO1xuXHRcdH0pO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCAoc2l6ZSkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gUmVuZGVyIG9uIHNpemUtY2hhbmdlIGFuZCBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvL1xuXHRcdHRoaXMub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMudHJpZ2dlcignM2QtcmVuZGVyJykgfSk7XG5cdFx0VS5lYWNoQW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gQ29udHJvbHNcblx0XHQvL1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzID0gbmV3IFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzKHRoaXMuX3BfdGhyZWVEX2NhbWVyYSwgdGhpcy50aHJlZURDYW52YXNFbGVtZW50WzBdKTtcblx0XHQkLmV4dGVuZCh0aGlzLl9wX3RocmVlRF9jb250cm9scywge1xuXHRcdFx0cm90YXRlU3BlZWQ6IDEuMCxcblx0XHRcdHpvb21TcGVlZDogMS4yLFxuXHRcdFx0cGFuU3BlZWQ6IDAuOCxcblx0XHRcdG5vWm9vbTogZmFsc2UsXG5cdFx0XHRub1BhbjogZmFsc2UsXG5cdFx0XHRzdGF0aWNNb3Zpbmc6IHRydWUsXG5cdFx0XHRkeW5hbWljRGFtcGluZ0ZhY3RvcjogMC4zLFxuXHRcdFx0a2V5czogWzY1LCA4MywgNjhdXG5cdFx0fSk7XG5cdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXHRcdHRoaXMub24oJ3NpemUnLCAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmhhbmRsZVJlc2l6ZSgpIH0pO1xuXHRcdHRoaXMub24oJzNkLXJlbmRlcicsICgpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMudXBkYXRlKCkgfSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ29udHJvbHNFbmFibGVkJywgKGVuYWJsZWQpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMuZW5hYmxlZCA9IGVuYWJsZWQgfSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBGbG9hdGluZyBUaWxlbWFwXG5cdFx0Ly9cblx0XHR2YXIgZmxhdENpcmN1aXRCb2FyZEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KGZsYXRDaXJjdWl0Qm9hcmRFbGVtZW50WzBdKTtcblx0XHRmbGF0Q2lyY3VpdEJvYXJkRWxlbWVudC5jc3MoeyBsZWZ0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAgfSk7IC8vIFRPRE86IHNhdmUgYW5kIHJlc3RvcmUgbGF0ZXJcblx0XHRmbGF0Q2lyY3VpdEJvYXJkRWxlbWVudC5jc3MoJ2JhY2tmYWNlVmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkKTtcblx0XHQvL1xuXHRcdC8vIFRpbGVtYXAgQmFja2ZhY2Vcblx0XHR2YXIgYmFja2ZhY2VFbGVtZW50ID0gJCgnPGRpdj4nKS5jc3Moe1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHRib3JkZXI6ICdzb2xpZCAxcHggYmxhY2snLFxuXHRcdFx0YmFja2ZhY2VWaXNpYmlsaXR5OiAnaGlkZGVuJ1xuXHRcdH0pO1xuXHRcdHZhciBiYWNrZmFjZSA9IG5ldyBUSFJFRS5DU1MzRE9iamVjdChiYWNrZmFjZUVsZW1lbnRbMF0pO1xuXHRcdGJhY2tmYWNlLnJvdGF0aW9uLnNldChNYXRoLlBJLCAwLCAwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYmFja2ZhY2UpO1xuXHRcdC8vXG5cdFx0Ly8gcmVzcG9uZCB0byByZXNpemVcblx0XHR2YXIgb25DYW52YXNSZXNpemUgPSAoKSA9PiB7XG5cdFx0XHQvLyBzaXppbmcgYW5kIHBvc2l0aW9uaW5nIG9mIHRoZSBjaXJjdWl0LWJvYXJkIGFuZCBiYWNrZmFjZVxuXHRcdFx0dmFyIHNpemUgPSB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0LFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tXG5cdFx0XHR9O1xuXHRcdFx0ZmxhdENpcmN1aXRCb2FyZEVsZW1lbnQuY3NzKHNpemUpO1xuXHRcdFx0YmFja2ZhY2VFbGVtZW50LmNzcyhzaXplKTtcblx0XHRcdGJhY2tmYWNlLnBvc2l0aW9uLnggPSB0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQucG9zaXRpb24ueCA9IDAuNSAqICh0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0KTtcblx0XHRcdGJhY2tmYWNlLnBvc2l0aW9uLnkgPSB0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQucG9zaXRpb24ueSA9IDAuNSAqICh0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbSAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wKTtcblxuXHRcdFx0Ly8gc2V0IHRoZSBjYW1lcmEgZGlzdGFuY2UgdG8gY29ycmVzcG9uZFxuXHRcdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuc2V0Q2FtZXJhRGlzdGFuY2UoXG5cdFx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAvXG5cdFx0XHRcdFx0KDIgKiBNYXRoLnRhbihUSFJFRS5NYXRoLmRlZ1RvUmFkKHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5mb3YpIC8gMikpXG5cdFx0XHQpO1xuXHRcdH07XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScsIG9uQ2FudmFzUmVzaXplKTtcblx0XHRvbkNhbnZhc1Jlc2l6ZSgpO1xuXG5cdH0pO1xuXG5cdC8vXG5cdC8vIGB0cmFuc2xhdGVQb3NpdGlvbkZyb21DYW52YXNUb0NpcmN1aXRib2FyZGAgaGFzIG5vIHNpZGUtZWZmZWN0cyBhbmQgY2FuIGJlIHVzZWRcblx0Ly8gZnJvbSB0aGUgb3V0c2lkZSB0byB0cmFuc2xhdGUgbGVmdC90b3AgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlbiB0byBsZWZ0L3RvcFxuXHQvLyBjb29yZGluYXRlcyBvZiB0aGUgcHJpdmF0ZSBjb29yZGluYXRlLXN5c3RlbSBvZiB0aGUgY2lyY3VpdGJvYXJkLCBob3dldmVyIGl0IGlzXG5cdC8vIG9yaWVudGVkIGluIDNEIHNwYWNlLlxuXHQvL1xuXHRwbHVnaW4uYWRkKCd0cmFuc2xhdGVQb3NpdGlvbkZyb21DYW52YXNUb0NpcmN1aXRib2FyZCcsIGZ1bmN0aW9uIChwb3NpdGlvbk9uQ2FudmFzKSB7XG5cblx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKTtcblx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdFx0dmFyIG1vdXNlM0QgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdG1vdXNlM0QueCA9IHBvc2l0aW9uT25DYW52YXMubGVmdCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAqIDIgLSAxO1xuXHRcdG1vdXNlM0QueSA9IC1wb3NpdGlvbk9uQ2FudmFzLnRvcCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgKiAyICsgMTtcblx0XHRtb3VzZTNELnogPSAwLjU7XG5cdFx0UFJPSkVDVE9SLnVucHJvamVjdFZlY3Rvcihtb3VzZTNELCB0aGlzLl9wX3RocmVlRF9jYW1lcmEpO1xuXHRcdHZhciByYXkgPSBuZXcgVEhSRUUuUmF5KHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5wb3NpdGlvbiwgbW91c2UzRC5zdWIodGhpcy5fcF90aHJlZURfY2FtZXJhLnBvc2l0aW9uKS5ub3JtYWxpemUoKSk7XG5cdFx0dmFyIGludGVyc2VjdHMgPSByYXkuaW50ZXJzZWN0UGxhbmUoUExBTkUpO1xuXG5cdFx0Ly8gaWYgdGhlIHRlc3RlZCBpbnRlcnNlY3Rpb24gaXMgb3V0IG9mIHJhbmdlLCByZXR1cm4gdW5kZWZpbmVkXG5cdFx0aWYgKCFpbnRlcnNlY3RzKSB7IHJldHVybiB9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bGVmdDogaW50ZXJzZWN0cy54ICsgdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC8gMiAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCxcblx0XHRcdHRvcDogLWludGVyc2VjdHMueSArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLyAyIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3Bcblx0XHR9O1xuXG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC10aHJlZS1kLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGVxdWFsaXR5IHdpdGggYSB0b2xlcmFuY2Ugb2YgZXBzaWxvblxuXHRcdGFwcHJveCh2YWwxLCB2YWwyLCBlcHNpbG9uKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChlcHNpbG9uKSkgeyBlcHNpbG9uID0gMWUtNSB9XG5cdFx0XHRyZXR1cm4gKE1hdGguYWJzKHZhbDEgLSB2YWwyKSA8IGVwc2lsb24pO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gYEEuZm9yRWFjaGAsIGV4Y2VwdCBpdCBpdGVyYXRlcyBmcm9tIHJpZ2h0IHRvIGxlZnRcblx0XHRmb3JFYWNoUmV2ZXJzZShBLCBmbikge1xuXHRcdFx0dmFyIGkgPSBBLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHsgZm4oQVtpXSwgaSwgQSkgfVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhlIGdpdmVuIG9iamVjdDtcblx0XHQvLyB0aGlzIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmUgYSBgdHJpZ2dlcmAgbWV0aG9kXG5cdFx0Ly9cblx0XHQvLyBvcHRpb25zLm5hbWUgKG1hbmRhdG9yeSkgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcblx0XHQvLyBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgb3IgYW55IHRyYW5zZm9ybWF0aW9uLiBJdCBjYW4gYWxzbyB0aHJvdyBhbiBleGNlcHRpb24sIHdoaWNoIHdpbGwganVzdCBiZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLlxuXHRcdG9ic2VydmFibGUob2JqLCB7bmFtZSwgaW5pdGlhbCwgdmFsaWRhdGlvbn0pIHtcblx0XHRcdHZhciB2YWx1ZSA9IGluaXRpYWw7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH0sXG5cdFx0XHRcdHNldChuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdGlmICh2YWxpZGF0aW9uKSB7IG5ld1ZhbHVlID0gdmFsaWRhdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIH1cblx0XHRcdFx0XHRpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKG5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuXG5cdFx0Ly8gSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhIGNhY2hlXG5cdFx0Ly8gdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWVcblx0XHQvLyBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duXG5cdFx0Ly8gY29tcGFyaXNvbiBmdW5jdGlvbi5cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlXG5cdFx0XHQvL1xuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmIChvbkNoYW5nZSAmJiAhaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UoY2FjaGUsIG9sZFZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChzZXRWYWx1ZSwgMCk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCxcblx0XHRcdC8vIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdC8vIE5PVEU6IG9ubHkgb25lIGNhbGxiYWNrIGlzIHN0b3JlZCFcblx0XHRcdC8vXG5cdFx0XHR2YXIgb25DaGFuZ2U7XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4geyBvbkNoYW5nZSA9IGNiOyByZXR1cm4gcmVzdWx0Rm47IH07XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9XG5cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJkZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBodHRwOi8vd3d3LmVtYWdpeC5uZXQvYWNhZGVtaWMvbXNjcy1wcm9qZWN0L2l0ZW0vY2FtZXJhLXN5bmMtd2l0aC1jc3MzLWFuZC13ZWJnbC10aHJlZWpzXG5cdCAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG5cdCAqL1xuXG5cdFRIUkVFLkNTUzNET2JqZWN0ID0gZnVuY3Rpb24gKCBlbGVtZW50ICkge1xuXG5cdFx0VEhSRUUuT2JqZWN0M0QuY2FsbCggdGhpcyApO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAncmVtb3ZlZCcsIGZ1bmN0aW9uICggLypldmVudCovICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsICkge1xuXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdH07XG5cblx0VEhSRUUuQ1NTM0RPYmplY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVEhSRUUuT2JqZWN0M0QucHJvdG90eXBlICk7XG5cblx0VEhSRUUuQ1NTM0RTcHJpdGUgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5DU1MzRE9iamVjdC5jYWxsKCB0aGlzLCBlbGVtZW50ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgKTtcblxuXHQvL1xuXG5cdFRIUkVFLkNTUzNEUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRjb25zb2xlLmxvZyggJ1RIUkVFLkNTUzNEUmVuZGVyZXInLCBUSFJFRS5SRVZJU0lPTiApO1xuXG5cdFx0dmFyIF93aWR0aCwgX2hlaWdodDtcblx0XHR2YXIgX3dpZHRoSGFsZiwgX2hlaWdodEhhbGY7XG5cblx0XHR2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdHZhciBjYWNoZSA9IHtcblx0XHRcdGNhbWVyYTogeyBmb3Y6IDAsIHN0eWxlOiAnJyB9LFxuXHRcdFx0b2JqZWN0czoge31cblx0XHR9O1xuXG5cdFx0dmFyIGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuXHRcdGRvbUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRkb21FbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cblx0XHR2YXIgY2FtZXJhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cblx0XHRkb21FbGVtZW50LmFwcGVuZENoaWxkKCBjYW1lcmFFbGVtZW50ICk7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCB3aWR0aCwgaGVpZ2h0ICkge1xuXG5cdFx0XHRfd2lkdGggPSB3aWR0aDtcblx0XHRcdF9oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHRcdF93aWR0aEhhbGYgPSBfd2lkdGggLyAyO1xuXHRcdFx0X2hlaWdodEhhbGYgPSBfaGVpZ2h0IC8gMjtcblxuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4Jztcblx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuXHRcdH07XG5cblx0XHR2YXIgZXBzaWxvbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLmFicyggdmFsdWUgKSA8IDAuMDAwMDAxID8gMCA6IHZhbHVlO1xuXG5cdFx0fTtcblxuXHRcdHZhciBnZXRDYW1lcmFDU1NNYXRyaXggPSBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0dmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0XHRyZXR1cm4gJ21hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDYgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldE9iamVjdENTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAndHJhbnNsYXRlM2QoLTUwJSwtNTAlLDApIG1hdHJpeDNkKCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDUgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG5cdFx0XHQnKSc7XG5cblx0XHR9O1xuXG5cdFx0dmFyIHJlbmRlck9iamVjdCA9IGZ1bmN0aW9uICggb2JqZWN0LCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RPYmplY3QgKSB7XG5cblx0XHRcdFx0dmFyIHN0eWxlO1xuXG5cdFx0XHRcdGlmICggb2JqZWN0IGluc3RhbmNlb2YgVEhSRUUuQ1NTM0RTcHJpdGUgKSB7XG5cblx0XHRcdFx0XHQvLyBodHRwOi8vc3dpZnRjb2Rlci53b3JkcHJlc3MuY29tLzIwMDgvMTEvMjUvY29uc3RydWN0aW5nLWEtYmlsbGJvYXJkLW1hdHJpeC9cblxuXHRcdFx0XHRcdG1hdHJpeC5jb3B5KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICk7XG5cdFx0XHRcdFx0bWF0cml4LnRyYW5zcG9zZSgpO1xuXHRcdFx0XHRcdG1hdHJpeC5jb3B5UG9zaXRpb24oIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXHRcdFx0XHRcdG1hdHJpeC5zY2FsZSggb2JqZWN0LnNjYWxlICk7XG5cblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDMgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyA3IF0gPSAwO1xuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTEgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxNSBdID0gMTtcblxuXHRcdFx0XHRcdHN0eWxlID0gZ2V0T2JqZWN0Q1NTTWF0cml4KCBtYXRyaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGVsZW1lbnQgPSBvYmplY3QuZWxlbWVudDtcblx0XHRcdFx0dmFyIGNhY2hlZFN0eWxlID0gY2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF07XG5cblx0XHRcdFx0aWYgKCBjYWNoZWRTdHlsZSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlZFN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xuXG5cdFx0XHRcdFx0Y2FjaGUub2JqZWN0c1sgb2JqZWN0LmlkIF0gPSBzdHlsZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBlbGVtZW50LnBhcmVudE5vZGUgIT09IGNhbWVyYUVsZW1lbnQgKSB7XG5cblx0XHRcdFx0XHRjYW1lcmFFbGVtZW50LmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgbCA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRcdHJlbmRlck9iamVjdCggb2JqZWN0LmNoaWxkcmVuWyBpIF0sIGNhbWVyYSApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbiAoIHNjZW5lLCBjYW1lcmEgKSB7XG5cblx0XHRcdHZhciBmb3YgPSAwLjUgLyBNYXRoLnRhbiggVEhSRUUuTWF0aC5kZWdUb1JhZCggY2FtZXJhLmZvdiAqIDAuNSApICkgKiBfaGVpZ2h0O1xuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5mb3YgIT09IGZvdiApIHtcblxuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLldlYmtpdFBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLk1velBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLm9QZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5wZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuZm92ID0gZm92O1xuXG5cdFx0XHR9XG5cblx0XHRcdHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cblx0XHRcdGlmICggY2FtZXJhLnBhcmVudCA9PT0gdW5kZWZpbmVkICkgeyBjYW1lcmEudXBkYXRlTWF0cml4V29ybGQoKSB9XG5cblx0XHRcdGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UuZ2V0SW52ZXJzZSggY2FtZXJhLm1hdHJpeFdvcmxkICk7XG5cblx0XHRcdHZhciBzdHlsZSA9IFwidHJhbnNsYXRlM2QoMCwwLFwiICsgZm92ICsgXCJweClcIiArIGdldENhbWVyYUNTU01hdHJpeCggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApICtcblx0XHRcdFx0XCIgdHJhbnNsYXRlM2QoXCIgKyBfd2lkdGhIYWxmICsgXCJweCxcIiArIF9oZWlnaHRIYWxmICsgXCJweCwgMClcIjtcblxuXG5cdFx0XHRpZiAoIGNhY2hlLmNhbWVyYS5zdHlsZSAhPT0gc3R5bGUgKSB7XG5cblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0Y2FjaGUuY2FtZXJhLnN0eWxlID0gc3R5bGU7XG5cblx0XHRcdH1cblxuXHRcdFx0cmVuZGVyT2JqZWN0KCBzY2VuZSwgY2FtZXJhICk7XG5cblx0XHR9O1xuXG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzXG4gKiovIiwiZGVmaW5lKFsndGhyZWUtanMnXSwgZnVuY3Rpb24gKFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cblx0LyoqXG5cdCAqIEBhdXRob3IgRWJlcmhhcmQgR3JhZXRoZXIgLyBodHRwOi8vZWdyYWV0aGVyLmNvbS9cblx0ICogQGF1dGhvciBNYXJrIEx1bmRpbiAgICAvIGh0dHA6Ly9tYXJrLWx1bmRpbi5jb21cblx0ICovXG5cblx0VEhSRUUuVHJhY2tiYWxsQ29udHJvbHMgPSBmdW5jdGlvbiAob2JqZWN0LCBkb21FbGVtZW50KSB7XG5cblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHZhciBTVEFURSA9IHsgTk9ORTogLTEsIFJPVEFURTogMCwgWk9PTTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX1pPT01fUEFOOiA0IH07XG5cblx0XHR0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0XHR0aGlzLmRvbUVsZW1lbnQgPSAoIGRvbUVsZW1lbnQgIT09IHVuZGVmaW5lZCApID8gZG9tRWxlbWVudCA6IGRvY3VtZW50O1xuXG5cdFx0Ly8gQVBJXG5cblx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0dGhpcy5zY3JlZW4gPSB7IGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuXG5cdFx0dGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblx0XHR0aGlzLnpvb21TcGVlZCA9IDEuMjtcblx0XHR0aGlzLnBhblNwZWVkID0gMC4zO1xuXG5cdFx0dGhpcy5ub1JvdGF0ZSA9IGZhbHNlO1xuXHRcdHRoaXMubm9ab29tID0gZmFsc2U7XG5cdFx0dGhpcy5ub1BhbiA9IGZhbHNlO1xuXHRcdHRoaXMubm9Sb2xsID0gZmFsc2U7XG5cblx0XHR0aGlzLnN0YXRpY01vdmluZyA9IGZhbHNlO1xuXHRcdHRoaXMuZHluYW1pY0RhbXBpbmdGYWN0b3IgPSAwLjI7XG5cblx0XHR0aGlzLm1pbkRpc3RhbmNlID0gMDtcblx0XHR0aGlzLm1heERpc3RhbmNlID0gSW5maW5pdHk7XG5cblx0XHR0aGlzLmtleXMgPSBbIDY1IC8qQSovLCA4MyAvKlMqLywgNjggLypEKi8gXTtcblxuXHRcdC8vIGludGVybmFsc1xuXG5cdFx0dGhpcy50YXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXG5cdFx0dmFyIGxhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHR2YXIgX3N0YXRlID0gU1RBVEUuTk9ORSxcblx0XHRcdF9wcmV2U3RhdGUgPSBTVEFURS5OT05FLFxuXG5cdFx0XHRfZXllID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblxuXHRcdFx0X3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdF9yb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXG5cdFx0XHRfem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdF96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblxuXHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwLFxuXHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMCxcblxuXHRcdFx0X3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdF9wYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0Ly8gZm9yIHJlc2V0XG5cblx0XHR0aGlzLnRhcmdldDAgPSB0aGlzLnRhcmdldC5jbG9uZSgpO1xuXHRcdHRoaXMucG9zaXRpb24wID0gdGhpcy5vYmplY3QucG9zaXRpb24uY2xvbmUoKTtcblx0XHR0aGlzLnVwMCA9IHRoaXMub2JqZWN0LnVwLmNsb25lKCk7XG5cblx0XHQvLyBldmVudHNcblxuXHRcdHZhciBjaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblx0XHR2YXIgc3RhcnRFdmVudCA9IHsgdHlwZTogJ3N0YXJ0J307XG5cdFx0dmFyIGVuZEV2ZW50ID0geyB0eXBlOiAnZW5kJ307XG5cblxuXHRcdC8vIG1ldGhvZHNcblxuXHRcdHRoaXMuaGFuZGxlUmVzaXplID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAodGhpcy5kb21FbGVtZW50ID09PSBkb2N1bWVudCkge1xuXG5cdFx0XHRcdHRoaXMuc2NyZWVuLmxlZnQgPSAwO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi50b3AgPSAwO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dmFyIGJveCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0Ly8gYWRqdXN0bWVudHMgY29tZSBmcm9tIHNpbWlsYXIgY29kZSBpbiB0aGUganF1ZXJ5IG9mZnNldCgpIGZ1bmN0aW9uXG5cdFx0XHRcdHZhciBkID0gdGhpcy5kb21FbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHR0aGlzLnNjcmVlbi5sZWZ0ID0gYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkLmNsaWVudExlZnQ7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLnRvcCA9IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBkLmNsaWVudFRvcDtcblx0XHRcdFx0dGhpcy5zY3JlZW4ud2lkdGggPSBib3gud2lkdGg7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLmhlaWdodCA9IGJveC5oZWlnaHQ7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdGlmICh0eXBlb2YgdGhpc1sgZXZlbnQudHlwZSBdID09ICdmdW5jdGlvbicpIHtcblxuXHRcdFx0XHR0aGlzWyBldmVudC50eXBlIF0oZXZlbnQpO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldE1vdXNlT25TY3JlZW4gPSAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0dmVjdG9yLnNldChcblx0XHRcdFx0XHRcdCggcGFnZVggLSBfdGhpcy5zY3JlZW4ubGVmdCApIC8gX3RoaXMuc2NyZWVuLndpZHRoLFxuXHRcdFx0XHRcdFx0KCBwYWdlWSAtIF90aGlzLnNjcmVlbi50b3AgKSAvIF90aGlzLnNjcmVlbi5oZWlnaHRcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSgpICk7XG5cblx0XHR2YXIgZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsID0gKCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdHZhciBtb3VzZU9uQmFsbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0bW91c2VPbkJhbGwuc2V0KFxuXHRcdFx0XHRcdFx0KCBwYWdlWCAtIF90aGlzLnNjcmVlbi53aWR0aCAqIDAuNSAtIF90aGlzLnNjcmVlbi5sZWZ0ICkgLyAoX3RoaXMuc2NyZWVuLndpZHRoICogLjUpLFxuXHRcdFx0XHRcdFx0KCBfdGhpcy5zY3JlZW4uaGVpZ2h0ICogMC41ICsgX3RoaXMuc2NyZWVuLnRvcCAtIHBhZ2VZICkgLyAoX3RoaXMuc2NyZWVuLmhlaWdodCAqIC41KSxcblx0XHRcdFx0XHQwLjBcblx0XHRcdFx0KTtcblxuXHRcdFx0XHR2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG5cblx0XHRcdFx0aWYgKF90aGlzLm5vUm9sbCkge1xuXG5cdFx0XHRcdFx0aWYgKGxlbmd0aCA8IE1hdGguU1FSVDFfMikge1xuXG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gLjUgLyBsZW5ndGg7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIGlmIChsZW5ndGggPiAxLjApIHtcblxuXHRcdFx0XHRcdG1vdXNlT25CYWxsLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRtb3VzZU9uQmFsbC56ID0gTWF0aC5zcXJ0KDEuMCAtIGxlbmd0aCAqIGxlbmd0aCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9leWUuY29weShfdGhpcy5vYmplY3QucG9zaXRpb24pLnN1YihfdGhpcy50YXJnZXQpO1xuXG5cdFx0XHRcdHZlY3Rvci5jb3B5KF90aGlzLm9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLnkpO1xuXHRcdFx0XHR2ZWN0b3IuYWRkKG9iamVjdFVwLmNvcHkoX3RoaXMub2JqZWN0LnVwKS5jcm9zcyhfZXllKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueCkpO1xuXHRcdFx0XHR2ZWN0b3IuYWRkKF9leWUuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLnopKTtcblxuXHRcdFx0XHRyZXR1cm4gdmVjdG9yO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSgpICk7XG5cblx0XHR0aGlzLnJvdGF0ZUNhbWVyYSA9IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdFx0cXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR2YXIgYW5nbGUgPSBNYXRoLmFjb3MoX3JvdGF0ZVN0YXJ0LmRvdChfcm90YXRlRW5kKSAvIF9yb3RhdGVTdGFydC5sZW5ndGgoKSAvIF9yb3RhdGVFbmQubGVuZ3RoKCkpO1xuXG5cdFx0XHRcdGlmIChhbmdsZSkge1xuXG5cdFx0XHRcdFx0YXhpcy5jcm9zc1ZlY3RvcnMoX3JvdGF0ZVN0YXJ0LCBfcm90YXRlRW5kKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHRcdGFuZ2xlICo9IF90aGlzLnJvdGF0ZVNwZWVkO1xuXG5cdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIC1hbmdsZSk7XG5cblx0XHRcdFx0XHRfZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRfdGhpcy5vYmplY3QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRpZiAoX3RoaXMuc3RhdGljTW92aW5nKSB7XG5cblx0XHRcdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KF9yb3RhdGVFbmQpO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKGF4aXMsIGFuZ2xlICogKCBfdGhpcy5keW5hbWljRGFtcGluZ0ZhY3RvciAtIDEuMCApKTtcblx0XHRcdFx0XHRcdF9yb3RhdGVTdGFydC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSgpKTtcblxuXHRcdHRoaXMuem9vbUNhbWVyYSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblxuXHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU0R1cGxpY2F0ZWREZWNsYXJhdGlvblxuXHRcdFx0XHR2YXIgZmFjdG9yID0gX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyBfdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdF90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gX3RvdWNoWm9vbURpc3RhbmNlRW5kO1xuXHRcdFx0XHRfZXllLm11bHRpcGx5U2NhbGFyKGZhY3Rvcik7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNEdXBsaWNhdGVkRGVjbGFyYXRpb25cblx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggX3pvb21FbmQueSAtIF96b29tU3RhcnQueSApICogX3RoaXMuem9vbVNwZWVkO1xuXG5cdFx0XHRcdGlmIChmYWN0b3IgIT09IDEuMCAmJiBmYWN0b3IgPiAwLjApIHtcblxuXHRcdFx0XHRcdF9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcblxuXHRcdFx0XHRcdGlmIChfdGhpcy5zdGF0aWNNb3ZpbmcpIHtcblxuXHRcdFx0XHRcdFx0X3pvb21TdGFydC5jb3B5KF96b29tRW5kKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdF96b29tU3RhcnQueSArPSAoIF96b29tRW5kLnkgLSBfem9vbVN0YXJ0LnkgKSAqIHRoaXMuZHluYW1pY0RhbXBpbmdGYWN0b3I7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5wYW5DYW1lcmEgPSAoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgbW91c2VDaGFuZ2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRcdHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0bW91c2VDaGFuZ2UuY29weShfcGFuRW5kKS5zdWIoX3BhblN0YXJ0KTtcblxuXHRcdFx0XHRpZiAobW91c2VDaGFuZ2UubGVuZ3RoU3EoKSkge1xuXG5cdFx0XHRcdFx0bW91c2VDaGFuZ2UubXVsdGlwbHlTY2FsYXIoX2V5ZS5sZW5ndGgoKSAqIF90aGlzLnBhblNwZWVkKTtcblxuXHRcdFx0XHRcdHBhbi5jb3B5KF9leWUpLmNyb3NzKF90aGlzLm9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLngpO1xuXHRcdFx0XHRcdHBhbi5hZGQob2JqZWN0VXAuY29weShfdGhpcy5vYmplY3QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS55KSk7XG5cblx0XHRcdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uYWRkKHBhbik7XG5cdFx0XHRcdFx0X3RoaXMudGFyZ2V0LmFkZChwYW4pO1xuXG5cdFx0XHRcdFx0aWYgKF90aGlzLnN0YXRpY01vdmluZykge1xuXG5cdFx0XHRcdFx0XHRfcGFuU3RhcnQuY29weShfcGFuRW5kKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdF9wYW5TdGFydC5hZGQobW91c2VDaGFuZ2Uuc3ViVmVjdG9ycyhfcGFuRW5kLCBfcGFuU3RhcnQpLm11bHRpcGx5U2NhbGFyKF90aGlzLmR5bmFtaWNEYW1waW5nRmFjdG9yKSk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSgpKTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIEFkZGVkIGZvciBBcGlOQVRPTVlcblx0XHQvL1xuXHRcdHRoaXMuc2V0Q2FtZXJhRGlzdGFuY2UgPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcblx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG5cdFx0fTtcblx0XHQvLy8vLy9cblxuXG5cdFx0dGhpcy5jaGVja0Rpc3RhbmNlcyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKCFfdGhpcy5ub1pvb20gfHwgIV90aGlzLm5vUGFuKSB7XG5cblx0XHRcdFx0aWYgKF9leWUubGVuZ3RoU3EoKSA+IF90aGlzLm1heERpc3RhbmNlICogX3RoaXMubWF4RGlzdGFuY2UpIHtcblxuXHRcdFx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKF90aGlzLnRhcmdldCwgX2V5ZS5zZXRMZW5ndGgoX3RoaXMubWF4RGlzdGFuY2UpKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKF9leWUubGVuZ3RoU3EoKSA8IF90aGlzLm1pbkRpc3RhbmNlICogX3RoaXMubWluRGlzdGFuY2UpIHtcblxuXHRcdFx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKF90aGlzLnRhcmdldCwgX2V5ZS5zZXRMZW5ndGgoX3RoaXMubWluRGlzdGFuY2UpKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0X2V5ZS5zdWJWZWN0b3JzKF90aGlzLm9iamVjdC5wb3NpdGlvbiwgX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0aWYgKCFfdGhpcy5ub1JvdGF0ZSkge1xuXG5cdFx0XHRcdF90aGlzLnJvdGF0ZUNhbWVyYSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICghX3RoaXMubm9ab29tKSB7XG5cblx0XHRcdFx0X3RoaXMuem9vbUNhbWVyYSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICghX3RoaXMubm9QYW4pIHtcblxuXHRcdFx0XHRfdGhpcy5wYW5DYW1lcmEoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uYWRkVmVjdG9ycyhfdGhpcy50YXJnZXQsIF9leWUpO1xuXG5cdFx0XHRfdGhpcy5jaGVja0Rpc3RhbmNlcygpO1xuXG5cdFx0XHRfdGhpcy5vYmplY3QubG9va0F0KF90aGlzLnRhcmdldCk7XG5cblx0XHRcdGlmIChsYXN0UG9zaXRpb24uZGlzdGFuY2VUb1NxdWFyZWQoX3RoaXMub2JqZWN0LnBvc2l0aW9uKSA+IEVQUykge1xuXG5cdFx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoY2hhbmdlRXZlbnQpO1xuXG5cdFx0XHRcdGxhc3RQb3NpdGlvbi5jb3B5KF90aGlzLm9iamVjdC5wb3NpdGlvbik7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0X3ByZXZTdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdF90aGlzLnRhcmdldC5jb3B5KF90aGlzLnRhcmdldDApO1xuXHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLmNvcHkoX3RoaXMucG9zaXRpb24wKTtcblx0XHRcdF90aGlzLm9iamVjdC51cC5jb3B5KF90aGlzLnVwMCk7XG5cblx0XHRcdF9leWUuc3ViVmVjdG9ycyhfdGhpcy5vYmplY3QucG9zaXRpb24sIF90aGlzLnRhcmdldCk7XG5cblx0XHRcdF90aGlzLm9iamVjdC5sb29rQXQoX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cblx0XHRcdGxhc3RQb3NpdGlvbi5jb3B5KF90aGlzLm9iamVjdC5wb3NpdGlvbik7XG5cblx0XHR9O1xuXG5cdFx0Ly8gbGlzdGVuZXJzXG5cbi8vICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0Ly8gYWRkZWQgZnJvbSBodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvanMvY29udHJvbHMvUG9pbnRlckxvY2tDb250cm9scy5qcyBmb3IgQXBpTkFUT01ZXG5cdFx0dmFyIF9hbXlfdmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0dmFyIEtFWUJPQVJEX1ZFTE9DSVRZID0gNTtcblxuXHRcdC8vIGFkZGVkIGZyb20gaHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHMuanNcblx0XHRmdW5jdGlvbiBrZXlkb3duKCBldmVudCApIHtcblxuXHRcdFx0Ly9ub2luc3BlY3Rpb24gQ29mZmVlU2NyaXB0U3dpdGNoU3RhdGVtZW50V2l0aE5vRGVmYXVsdEJyYW5jaFxuXHRcdFx0c3dpdGNoICggZXZlbnQua2V5Q29kZSApIHtcblxuXHRcdFx0XHRjYXNlIDM4OiAvLyB1cFxuXHRcdFx0XHRjYXNlIDg3OiAvLyB3XG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS55ID0gS0VZQk9BUkRfVkVMT0NJVFk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzNzogLy8gbGVmdFxuXHRcdFx0XHRjYXNlIDY1OiAvLyBhXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS54ID0gLUtFWUJPQVJEX1ZFTE9DSVRZO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0Y2FzZSA4MzogLy8gc1xuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueSA9IC1LRVlCT0FSRF9WRUxPQ0lUWTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM5OiAvLyByaWdodFxuXHRcdFx0XHRjYXNlIDY4OiAvLyBkXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS54ID0gS0VZQk9BUkRfVkVMT0NJVFk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIGFkZGVkIGZyb20gaHR0cDovL3RocmVlanMub3JnL2V4YW1wbGVzL2pzL2NvbnRyb2xzL1BvaW50ZXJMb2NrQ29udHJvbHMuanNcblx0XHRmdW5jdGlvbiBrZXl1cCggZXZlbnQgKSB7XG5cblx0XHRcdC8vbm9pbnNwZWN0aW9uIENvZmZlZVNjcmlwdFN3aXRjaFN0YXRlbWVudFdpdGhOb0RlZmF1bHRCcmFuY2hcblx0XHRcdHN3aXRjaCggZXZlbnQua2V5Q29kZSApIHtcblxuXHRcdFx0XHRjYXNlIDM4OiAvLyB1cFxuXHRcdFx0XHRjYXNlIDg3OiAvLyB3XG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS55ID0gMDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM3OiAvLyBsZWZ0XG5cdFx0XHRcdGNhc2UgNjU6IC8vIGFcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnggPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0Y2FzZSA4MzogLy8gc1xuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueSA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAzOTogLy8gcmlnaHRcblx0XHRcdFx0Y2FzZSA2ODogLy8gZFxuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueCA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHQvLyAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRmdW5jdGlvbiBtb3VzZWRvd24oZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmIChfc3RhdGUgPT09IFNUQVRFLk5PTkUpIHtcblxuXHRcdFx0XHRfc3RhdGUgPSBldmVudC5idXR0b247XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFICYmICFfdGhpcy5ub1JvdGF0ZSkge1xuXG5cdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KF9yb3RhdGVTdGFydCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5aT09NICYmICFfdGhpcy5ub1pvb20pIHtcblxuXHRcdFx0XHRfem9vbVN0YXJ0LmNvcHkoZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0X3pvb21FbmQuY29weShfem9vbVN0YXJ0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChfc3RhdGUgPT09IFNUQVRFLlBBTiAmJiAhX3RoaXMubm9QYW4pIHtcblxuXHRcdFx0XHRfcGFuU3RhcnQuY29weShnZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRfcGFuRW5kLmNvcHkoX3BhblN0YXJ0KVxuXG5cdFx0XHR9XG5cblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSwgZmFsc2UpO1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXAsIGZhbHNlKTtcblxuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG1vdXNlbW92ZShldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0Ly9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFICYmICFfdGhpcy5ub1JvdGF0ZSkge1xuXG5cdFx0XHRcdF9yb3RhdGVFbmQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5aT09NICYmICFfdGhpcy5ub1pvb20pIHtcblxuXHRcdFx0XHRfem9vbUVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH0gZWxzZSBpZiAoX3N0YXRlID09PSBTVEFURS5QQU4gJiYgIV90aGlzLm5vUGFuKSB7XG5cblx0XHRcdFx0X3BhbkVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG1vdXNldXAoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZSk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG1vdXNld2hlZWwoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dmFyIGRlbHRhID0gMDtcblxuXHRcdFx0aWYgKGV2ZW50LndoZWVsRGVsdGEpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cblx0XHRcdFx0ZGVsdGEgPSBldmVudC53aGVlbERlbHRhIC8gNDA7XG5cblx0XHRcdH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsKSB7IC8vIEZpcmVmb3hcblxuXHRcdFx0XHRkZWx0YSA9IC1ldmVudC5kZXRhaWwgLyAzO1xuXG5cdFx0XHR9XG5cblx0XHRcdF96b29tU3RhcnQueSArPSBkZWx0YSAqIDAuMDE7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuXHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b3VjaHN0YXJ0KGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG5cdFx0XHRzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XG5cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdF9zdGF0ZSA9IFNUQVRFLlRPVUNIX1JPVEFURTtcblx0XHRcdFx0XHRfcm90YXRlU3RhcnQuY29weShnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkpKTtcblx0XHRcdFx0XHRfcm90YXRlRW5kLmNvcHkoX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0X3N0YXRlID0gU1RBVEUuVE9VQ0hfWk9PTV9QQU47XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWTtcblx0XHRcdFx0XHRfdG91Y2hab29tRGlzdGFuY2VFbmQgPSBfdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0X3BhblN0YXJ0LmNvcHkoZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0X3BhbkVuZC5jb3B5KF9wYW5TdGFydCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuXG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b3VjaG1vdmUoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcblxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHRcdF90b3VjaFpvb21EaXN0YW5jZUVuZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0X3BhbkVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0X3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdG91Y2hlbmQoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSByZXR1cm47XG5cblx0XHRcdC8vbm9pbnNwZWN0aW9uIENvZmZlZVNjcmlwdFN3aXRjaFN0YXRlbWVudFdpdGhOb0RlZmF1bHRCcmFuY2hcblx0XHRcdHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcblxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSkpO1xuXHRcdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KF9yb3RhdGVFbmQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRfdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IF90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0X3BhbkVuZC5jb3B5KGdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdF9wYW5TdGFydC5jb3B5KF9wYW5FbmQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHR9XG5cblx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuXHRcdH1cblxuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZnVuY3Rpb24gKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH0sIGZhbHNlKTtcblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZWRvd24sIGZhbHNlKTtcblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgbW91c2V3aGVlbCwgZmFsc2UpO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIG1vdXNld2hlZWwsIGZhbHNlKTsgLy8gZmlyZWZveFxuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0LCBmYWxzZSk7XG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmQsIGZhbHNlKTtcblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlLCBmYWxzZSk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd24sIGZhbHNlKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cCwgZmFsc2UpO1xuXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcblxuXHRcdC8vIGZvcmNlIGFuIHVwZGF0ZSBhdCBzdGFydFxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblxuXHR9O1xuXG5cdFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSk7XG5cblx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGhyZWUtZC1jYW52YXM+ZGl2PmRpdntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MDtwb2ludGVyLWV2ZW50czpub25lO30udGhyZWUtZC1jYW52YXM+ZGl2PmRpdj4uY2lyY3VpdGJvYXJke3BvaW50ZXItZXZlbnRzOnZpc2libGU7fS50aHJlZS1kLWNhbnZhcz5kaXY+Y2FudmFze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDoxO3BvaW50ZXItZXZlbnRzOm5vbmU7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMpO1xyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdC8vIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYS8qLCBzb3VyY2VNYXA6IHNvdXJjZU1hcCovfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaikge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaik7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgLyomJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKi8pXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHQvLyB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0Ly8gTm8gYnJvd3NlciBzdXBwb3J0XHJcblx0Ly8gaWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdC8vIHRyeSB7XHJcblx0XHRcdC8vIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdC8vIH0gY2F0Y2goZSkge31cclxuXHQvLyB9XHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxuXHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC5qcyJ9