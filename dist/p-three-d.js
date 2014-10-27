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
	    (this.options.canvasResizeEvent || this.options.resizeEvent || $(window).resize)(_canvasSize);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYTVmYjI1NGU5NWUyNGI5NWMzYiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUNDLHVCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNELENBQUcsMENBQVUsRUFBRyxNQUFJLENBQUc7QUFDdEIsY0FBVyxDQUFDO0FBS1osVUFBUyxlQUFhLENBQUUsQ0FBRTtBQUNyQixjQUFLLENBQUM7QUFDVixPQUFJO0FBQ0gsWUFBSyxFQUFJLEVBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUN0QixZQUFPLEVBQUMsQ0FBQyxDQUFDLE1BQUssQ0FBRSxFQUFDLFdBQVksQ0FBQyxPQUFNLENBQUMsR0FBSyxPQUFLLENBQUUsRUFBQyxXQUFZLENBQUMsb0JBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQ3ZGLENBQUUsT0FBTyxFQUFDLENBQUc7QUFDWixZQUFPLE1BQUksQ0FBQztLQUNiLENBQUUsT0FBUTtBQUNULFlBQUssRUFBSSxVQUFRLENBQUM7S0FDbkI7QUFBQSxHQUNEO0FBS0EsVUFBUyxVQUFRLENBQUUsS0FBSSxDQUFHLE1BQUksQ0FBRztBQUNoQyxVQUFPLE1BQUksR0FBSyxNQUFJLEdBQUssTUFBSSxNQUFNLElBQU0sTUFBSSxNQUFNLEdBQUssTUFBSSxPQUFPLElBQU0sTUFBSSxPQUFPLENBQUM7R0FDdEY7QUFLSSxXQUFJLEVBQUksSUFBSSxNQUFJLE1BQU8sQ0FBQyxHQUFJLE1BQUksUUFBUyxDQUFDLEVBQUcsR0FBRyxHQUFDLENBQUcsR0FBQyxDQUFDO0FBQ3RELGVBQVEsRUFBSSxJQUFJLE1BQUksVUFBVyxFQUFDLENBQUM7QUFLakMsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxVQUFRO0FBQ2QsWUFBTyxDQUFHLEVBQUMsbUJBQWtCLENBQUM7QUFBQSxHQUMvQixDQUFDLE9BQVEsQ0FBQyx3QkFBdUIsQ0FBQyxDQUFDO0FBS25DLFFBQUssT0FBUSxDQUFDLFdBQVUsQ0FBRyxVQUFVOztBQUtwQyxRQUFJLENBQUMsY0FBYyxFQUFDLENBQUc7QUFDdEIsYUFBTSxLQUFNLENBQUMsa0RBQWlELENBQUMsQ0FBQztBQUNoRSxhQUFNO0tBQ1A7QUFLQSxnQkFBWSxDQUFDLElBQUcsQ0FBRyxFQUFFLElBQUcsQ0FBRyxzQkFBb0IsQ0FBRSxDQUFDLENBQUM7QUFDbkQsUUFBRyxHQUFJLENBQUMscUJBQW9CLEdBQUcsU0FBQyxTQUFRLENBQUcsVUFBUSxDQUFNO0FBQ3hELFVBQUksU0FBUSxDQUFHO0FBQUUsaUJBQVEsWUFBYSxDQUFDLGdCQUFlLENBQUM7T0FBRTtBQUN6RCxVQUFJLFNBQVEsQ0FBRztBQUFFLGlCQUFRLFNBQVUsQ0FBQyxnQkFBZSxDQUFDO09BQUU7QUFBQSxLQUN2RCxFQUFDLENBQUM7QUFNRixVQUFLLGVBQWdCLENBQUMsSUFBRyxDQUFHLGFBQVcsQ0FBRztBQUN6QyxTQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsY0FBTyxFQUFDLENBQUMsSUFBRyxvQkFBb0I7T0FBRTtBQUMxQyxTQUFFLENBQUYsVUFBSSxhQUFZLENBQUc7QUFDbEIsWUFBSSxDQUFDLENBQUMsYUFBWSxDQUFHO0FBQ3BCLGVBQU0sSUFBSSxNQUFLLENBQUMsMkdBQTBHLENBQUMsQ0FBQztTQUM3SCxLQUFPO0FBQ04sY0FBRyxvQkFBb0IsRUFBSSxLQUFHLENBQUM7U0FDaEM7QUFBQSxPQUNEO0FBQUEsS0FDRCxDQUFDLENBQUM7QUFDRixRQUFHLEdBQUksQ0FBQyxxQkFBb0IsR0FBRyxTQUFDLFNBQVEsQ0FBRyxVQUFRLENBQU07QUFDeEQsVUFBSSxTQUFRLEdBQUssVUFBUSxDQUFHO0FBQzNCLG9CQUFZLENBQUMsWUFBVyxDQUFHLEVBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQztPQUN4QztBQUFBLEtBQ0QsRUFBQyxDQUFDO0FBTUUsbUJBQVUsRUFBSSxTQUFRLENBQUM7QUFDMUIsY0FBTyxHQUFHLFNBQUM7Y0FBSyxFQUFDLHdCQUF1QixHQUFLO0FBQzVDLGVBQUksQ0FBRyx5QkFBdUIsTUFBTyxFQUFDO0FBQ3RDLGdCQUFLLENBQUcseUJBQXVCLE9BQVEsRUFBQztBQUFBLFNBQ3pDLENBQUM7T0FBQTtBQUNELGFBQU0sQ0FBRyxVQUFRO0FBQUEsS0FDbEIsQ0FBQyxDQUFDO0FBQ0YsVUFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxtQkFBaUIsQ0FBRyxFQUMvQyxHQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsY0FBTyxZQUFXLEVBQUM7T0FBRSxDQUM5QixDQUFDLENBQUM7QUFDRixlQUFVLFNBQVUsRUFBQyxTQUFDLE9BQU0sQ0FBTTtBQUFFLGtCQUFZLENBQUMsa0JBQWlCLENBQUcsUUFBTSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBR2hGLEtBQUMsSUFBRyxRQUFRLGtCQUFrQixHQUFLLEtBQUcsUUFBUSxZQUFZLEdBQUssRUFBQyxDQUFDLE1BQUssQ0FBQyxPQUFPLENBQUUsQ0FBQyxXQUFVLENBQUMsQ0FBQztBQUs3RixnQkFBWSxDQUFDLElBQUcsQ0FBRyxFQUFFLElBQUcsQ0FBRyx3QkFBc0IsQ0FBRSxDQUFDLENBQUM7QUFLckQsUUFBRyxHQUFJLENBQUMsWUFBVyxHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQy9CLFVBQUksSUFBRyxDQUFHO0FBQUUsaUNBQXlCLEVBQUM7T0FBRTtBQUFBLEtBQ3pDLEVBQUMsQ0FBQztBQU1GLFFBQUcsb0JBQW9CLEVBQUksS0FBRyxRQUFRLG9CQUFvQixDQUFDO0dBRTVELENBQUMsQ0FBQztBQUtGLFFBQUssSUFBSyxDQUFDLHNCQUFxQixDQUFHLFVBQVU7O0FBSzVDLFFBQUcsd0JBQXdCLEVBQUksR0FBQyxDQUFDO0FBQ2pDLFFBQUcsd0JBQXdCLEtBQUssRUFBSSxLQUFHLFFBQVEsT0FBUSxFQUFDLEtBQUssRUFBSSxLQUFHLG9CQUFvQixPQUFRLEVBQUMsS0FBSyxDQUFDO0FBQ3ZHLFFBQUcsd0JBQXdCLElBQUksRUFBSSxLQUFHLFFBQVEsT0FBUSxFQUFDLElBQUksRUFBSSxLQUFHLG9CQUFvQixPQUFRLEVBQUMsSUFBSSxDQUFDO0FBQ3BHLFFBQUcsd0JBQXdCLE1BQU0sRUFBSSxLQUFHLGlCQUFpQixNQUFNLEVBQUksS0FBRyxLQUFLLE1BQU0sRUFBSSxLQUFHLHdCQUF3QixLQUFLLENBQUM7QUFDdEgsUUFBRyx3QkFBd0IsT0FBTyxFQUFJLEtBQUcsaUJBQWlCLE9BQU8sRUFBSSxLQUFHLEtBQUssT0FBTyxFQUFJLEtBQUcsd0JBQXdCLElBQUksQ0FBQztBQU14SCxRQUFHLGdCQUFnQixFQUFJLElBQUksTUFBSSxNQUFPLEVBQUMsQ0FBQztBQU14QyxRQUFHLGlCQUFpQixFQUNsQixJQUFJLE1BQUksa0JBQW1CLENBQUMsRUFBQyxDQUFHLEtBQUcsaUJBQWlCLE1BQU0sRUFBSSxLQUFHLGlCQUFpQixPQUFPLENBQUcsR0FBRyxNQUFJLENBQUMsQ0FBQztBQUN2RyxRQUFHLEdBQUksQ0FBQyxrQkFBaUIsR0FBRyxTQUFDLElBQUcsQ0FBTTtBQUFFLDJCQUFvQixPQUFPLEVBQUksS0FBRyxNQUFNLEVBQUksS0FBRyxPQUFPO0tBQUUsRUFBQyxDQUFDO0FBQ2xHLFFBQUcsaUJBQWlCLFNBQVMsRUFBRSxFQUFJLEdBQUM7QUFNaEMsb0JBQVcsRUFBSSxJQUFJLE1BQUksYUFBYyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBQ25ELFFBQUcsZ0JBQWdCLElBQUssQ0FBQyxZQUFXLENBQUMsQ0FBQztBQUVsQyx5QkFBZ0IsRUFBSSxJQUFJLE1BQUksaUJBQWtCLENBQUMsUUFBTyxDQUFDLENBQUM7QUFDNUQscUJBQWdCLFNBQVMsSUFBSyxDQUFDLEVBQUcsRUFBQyxFQUFHLEdBQUMsQ0FBQztBQUN4QyxRQUFHLGdCQUFnQixJQUFLLENBQUMsaUJBQWdCLENBQUMsQ0FBQztBQUV2Qyx5QkFBZ0IsRUFBSSxJQUFJLE1BQUksaUJBQWtCLENBQUMsUUFBTyxDQUFDLENBQUM7QUFDNUQscUJBQWdCLFNBQVMsSUFBSyxDQUFDLENBQUMsRUFBRyxHQUFHLEVBQUMsRUFBQyxDQUFDO0FBQ3pDLFFBQUcsZ0JBQWdCLElBQUssQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFDO0FBTTNDLFFBQUcseUJBQXlCLEVBQUksSUFBSSxNQUFJLGNBQWUsQ0FBQztBQUFFLFdBQUksQ0FBRyxLQUFHO0FBQUcsZUFBUSxDQUFHLEtBQUc7QUFBQSxLQUFFLENBQUMsQ0FBQztBQUN6RixRQUFHLHlCQUF5QixZQUFZLEVBQUksTUFBSSxDQUFDO0FBQ2pELFFBQUcseUJBQXlCLFFBQVMsQ0FBQyxJQUFHLG9CQUFvQixNQUFPLEVBQUMsQ0FBRyxLQUFHLG9CQUFvQixPQUFRLEVBQUMsQ0FBQyxDQUFDO0FBQzFHLFFBQUcsR0FBSSxDQUFDLFdBQVUsR0FBRyxTQUFDLENBQUs7QUFDMUIsbUNBQTRCLE9BQVEsQ0FBQyxvQkFBbUIsQ0FBRyxzQkFBb0IsQ0FBQyxDQUFDO0tBQ2xGLEVBQUMsQ0FBQztBQUNGLFFBQUcsR0FBSSxDQUFDLGtCQUFpQixHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQ3JDLG1DQUE0QixRQUFTLENBQUMsSUFBRyxNQUFNLENBQUcsS0FBRyxPQUFPLENBQUMsQ0FBQztLQUMvRCxFQUFDLENBQUM7QUFHRixRQUFHLHVCQUF1QixFQUFJLElBQUksTUFBSSxjQUFlLEVBQUMsQ0FBQztBQUN2RCxLQUFDLENBQUMsSUFBRyx1QkFBdUIsV0FBVyxDQUFDLE9BQVEsQ0FBQyxJQUFHLHlCQUF5QixXQUFXLENBQUMsQ0FBQztBQUMxRixRQUFHLG9CQUFvQixPQUFRLENBQUMsSUFBRyx1QkFBdUIsV0FBVyxDQUFDLENBQUM7QUFDdkUsUUFBRyx1QkFBdUIsUUFBUyxDQUFDLElBQUcsb0JBQW9CLE1BQU8sRUFBQyxDQUFHLEtBQUcsb0JBQW9CLE9BQVEsRUFBQyxDQUFDLENBQUM7QUFDeEcsUUFBRyxHQUFJLENBQUMsV0FBVSxHQUFHLFNBQUMsQ0FBSztBQUMxQixpQ0FBMEIsT0FBUSxDQUFDLG9CQUFtQixDQUFHLHNCQUFvQixDQUFDLENBQUM7S0FDaEYsRUFBQyxDQUFDO0FBQ0YsUUFBRyxHQUFJLENBQUMsa0JBQWlCLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDckMsaUNBQTBCLFFBQVMsQ0FBQyxJQUFHLE1BQU0sQ0FBRyxLQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQzdELEVBQUMsQ0FBQztBQU1GLFFBQUcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLENBQUs7QUFBRSxrQkFBWSxDQUFDLFdBQVUsQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUNwRCx3QkFBb0IsRUFBQyxTQUFDLENBQUs7QUFBRSxrQkFBWSxDQUFDLFdBQVUsQ0FBQztLQUFFLEVBQUMsQ0FBQztBQU16RCxRQUFHLG1CQUFtQixFQUFJLElBQUksTUFBSSxrQkFBbUIsQ0FBQyxJQUFHLGlCQUFpQixDQUFHLEtBQUcsb0JBQW9CLENBQUUsRUFBQyxDQUFDLENBQUM7QUFDekcsWUFBUSxDQUFDLElBQUcsbUJBQW1CLENBQUc7QUFDakMsaUJBQVUsQ0FBRyxJQUFFO0FBQ2YsZUFBUSxDQUFHLElBQUU7QUFDYixjQUFPLENBQUcsSUFBRTtBQUNaLFlBQUssQ0FBRyxNQUFJO0FBQ1osV0FBSSxDQUFHLE1BQUk7QUFDWCxrQkFBVyxDQUFHLEtBQUc7QUFDakIsMEJBQW1CLENBQUcsSUFBRTtBQUN4QixVQUFHLENBQUcsRUFBQyxFQUFDLENBQUcsR0FBQyxDQUFHLEdBQUMsQ0FBQztBQUFBLEtBQ2xCLENBQUMsQ0FBQztBQUNGLFFBQUcsbUJBQW1CLGlCQUFrQixDQUFDLFFBQU8sR0FBRyxTQUFDLENBQUs7QUFBRSxrQkFBWSxDQUFDLFdBQVUsQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUN2RixRQUFHLEdBQUksQ0FBQyxNQUFLLEdBQUcsU0FBQyxDQUFLO0FBQUUsNkJBQXNCLGFBQWMsRUFBQztLQUFFLEVBQUMsQ0FBQztBQUNqRSxRQUFHLEdBQUksQ0FBQyxXQUFVLEdBQUcsU0FBQyxDQUFLO0FBQUUsNkJBQXNCLE9BQVEsRUFBQztLQUFFLEVBQUMsQ0FBQztBQUNoRSxRQUFHLEdBQUksQ0FBQyx1QkFBc0IsR0FBRyxTQUFDLE9BQU0sQ0FBTTtBQUFFLDZCQUFzQixRQUFRLEVBQUksUUFBTTtLQUFFLEVBQUMsQ0FBQztBQU14RiwrQkFBc0IsRUFBSSxLQUFHLFFBQVEsQ0FBQztBQUMxQyxRQUFHLHVCQUF1QixFQUFJLElBQUksTUFBSSxZQUFhLENBQUMsdUJBQXNCLENBQUUsRUFBQyxDQUFDLENBQUM7QUFDL0UsMkJBQXNCLElBQUssQ0FBQztBQUFFLFVBQUcsQ0FBRztBQUFHLFNBQUUsQ0FBRztBQUFHLFlBQUssQ0FBRztBQUFHLFdBQUksQ0FBRztBQUFBLEtBQUUsQ0FBQyxDQUFDO0FBQ3JFLDJCQUFzQixJQUFLLENBQUMsb0JBQW1CLENBQUcsU0FBTyxDQUFDLENBQUM7QUFDM0QsUUFBRyxnQkFBZ0IsSUFBSyxDQUFDLElBQUcsdUJBQXVCLENBQUMsQ0FBQztBQUdqRCx1QkFBYyxFQUFJLEVBQUMsQ0FBQyxPQUFNLENBQUMsSUFBSyxDQUFDO0FBQ3BDLGNBQU8sQ0FBRyxXQUFTO0FBQ25CLFlBQUssQ0FBRyxrQkFBZ0I7QUFDeEIsd0JBQWlCLENBQUcsU0FBTztBQUFBLEtBQzVCLENBQUMsQ0FBQztBQUNFLGdCQUFPLEVBQUksSUFBSSxNQUFJLFlBQWEsQ0FBQyxlQUFjLENBQUUsRUFBQyxDQUFDLENBQUM7QUFDeEQsWUFBTyxTQUFTLElBQUssQ0FBQyxJQUFHLEdBQUcsQ0FBRyxHQUFHLEdBQUMsQ0FBQztBQUNwQyxRQUFHLGdCQUFnQixJQUFLLENBQUMsUUFBTyxDQUFDLENBQUM7QUFHOUIsc0JBQWEsSUFBSSxTQUFDLENBQUs7QUFFdEIsY0FBRyxFQUFJO0FBQ1YsYUFBSSxDQUFHLHNCQUFvQixNQUFNLEVBQUksNkJBQTJCLEtBQUssRUFBSSw2QkFBMkIsTUFBTTtBQUMxRyxjQUFLLENBQUcsc0JBQW9CLE9BQU8sRUFBSSw2QkFBMkIsSUFBSSxFQUFJLDZCQUEyQixPQUFPO0FBQUEsT0FDN0csQ0FBQztBQUNELDZCQUFzQixJQUFLLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDakMscUJBQWMsSUFBSyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQ3pCLGNBQU8sU0FBUyxFQUFFLEVBQUksNEJBQTBCLFNBQVMsRUFBRSxFQUFJLElBQUUsRUFBSSxFQUFDLDRCQUEyQixLQUFLLEVBQUksNkJBQTJCLE1BQU0sQ0FBQyxDQUFDO0FBQzdJLGNBQU8sU0FBUyxFQUFFLEVBQUksNEJBQTBCLFNBQVMsRUFBRSxFQUFJLElBQUUsRUFBSSxFQUFDLDRCQUEyQixPQUFPLEVBQUksNkJBQTJCLElBQUksQ0FBQyxDQUFDO0FBRzdJLDZCQUFzQixrQkFBbUIsQ0FDdkMscUJBQW9CLE9BQU8sRUFDM0IsRUFBQyxHQUFJLEtBQUcsSUFBSyxDQUFDLEtBQUksS0FBSyxTQUFVLENBQUMscUJBQW9CLElBQUksQ0FBQyxFQUFJLEdBQUMsQ0FBQyxDQUNuRSxDQUFDO0tBQ0YsRUFBQztBQUNELFFBQUcsR0FBSSxDQUFDLGtCQUFpQixDQUFHLGVBQWEsQ0FBQyxDQUFDO0FBQzNDLGtCQUFjLEVBQUMsQ0FBQztHQUVqQixDQUFDLENBQUM7QUFRRixRQUFLLElBQUssQ0FBQywyQ0FBMEMsQ0FBRyxVQUFVLGdCQUFlLENBQUc7QUFFbkYsUUFBRyxpQkFBaUIsa0JBQW1CLEVBQUMsQ0FBQztBQUN6QyxRQUFHLGlCQUFpQix1QkFBd0IsRUFBQyxDQUFDO0FBRTFDLGVBQU0sRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFDakMsV0FBTSxFQUFFLEVBQUksaUJBQWUsS0FBSyxFQUFJLEtBQUcsaUJBQWlCLE1BQU0sRUFBSSxJQUFJLEdBQUM7QUFDdkUsV0FBTSxFQUFFLEVBQUksRUFBQyxnQkFBZSxJQUFJLEVBQUksS0FBRyxpQkFBaUIsT0FBTyxFQUFJLElBQUksR0FBQztBQUN4RSxXQUFNLEVBQUUsRUFBSSxJQUFFLENBQUM7QUFDZixhQUFRLGdCQUFpQixDQUFDLE9BQU0sQ0FBRyxLQUFHLGlCQUFpQixDQUFDLENBQUM7QUFDckQsV0FBRSxFQUFJLElBQUksTUFBSSxJQUFLLENBQUMsSUFBRyxpQkFBaUIsU0FBUyxDQUFHLFFBQU0sSUFBSyxDQUFDLElBQUcsaUJBQWlCLFNBQVMsQ0FBQyxVQUFXLEVBQUMsQ0FBQyxDQUFDO0FBQzVHLGtCQUFTLEVBQUksSUFBRSxlQUFnQixDQUFDLEtBQUksQ0FBQyxDQUFDO0FBRzFDLFFBQUksQ0FBQyxVQUFTLENBQUc7QUFBRSxhQUFLO0tBQUU7QUFFMUIsVUFBTztBQUNOLFVBQUcsQ0FBRyxXQUFTLEVBQUUsRUFBSSxLQUFHLGlCQUFpQixNQUFNLEVBQUksSUFBSSxLQUFHLHdCQUF3QixLQUFLO0FBQ3ZGLFNBQUUsQ0FBRyxFQUFDLFVBQVMsRUFBRSxFQUFJLEtBQUcsaUJBQWlCLE9BQU8sRUFBSSxJQUFJLEtBQUcsd0JBQXdCLElBQUk7QUFBQSxLQUN4RixDQUFDO0dBRUYsQ0FBQyxDQUFDO0FBRUgsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDelNBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O21DQ0FBLGtDQUFPLFFBQUM7QUFDUCxjQUFXLENBQUM7QUFFUixTQUFJO0FBR1AsWUFBTyxDQUFQLFVBQVMsV0FBVSxDQUFHLFVBQVE7QUFDN0IsZUFBUSxFQUFJLFVBQVEsR0FBSyxHQUFDLENBQUM7QUFDdkIsYUFBRSxFQUFJLFVBQWdCLENBQUc7QUNQcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRE03RSxtQkFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQzlCLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDekIsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUdBLGVBQVUsQ0FBVixVQUFZLFVBQVMsQ0FBRyxZQUFVLENBQUcsVUFBUTtBQUM1QyxlQUFRLEVBQUksVUFBUSxHQUFLLEdBQUMsQ0FBQztBQUN2QixhQUFFLEVBQUksVUFBZ0IsQ0FBRztBQ2xCcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRGlCN0UsbUJBQVUsTUFBTyxDQUFDLElBQUcsQ0FBRyxFQUFDLFVBQVMsVUFBVSxZQUFZLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7T0FDekUsQ0FBQztBQUNELFNBQUUsVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFDLFVBQVMsVUFBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQzlELFNBQUUsVUFBVSxZQUFZLEVBQUksSUFBRSxDQUFDO0FBQy9CLFlBQU8sSUFBRSxDQUFDO0tBQ1g7QUFLQSxVQUFLLENBQUwsVUFBTyxJQUFZO0FFN0JULFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FGNEJsRyxVQUFHLFFBQVMsRUFBQyxTQUFDLEdBQUUsQ0FBTTtBQUNyQixhQUFTLE9BQUUsR0FBSyxJQUFFLENBQUc7QUFDcEIsY0FBSSxHQUFFLGVBQWdCLENBQUMsR0FBRSxDQUFDLENBQUc7QUFDNUIsZ0JBQUcsQ0FBRSxHQUFFLENBQUMsRUFBSSxJQUFFLENBQUUsR0FBRSxDQUFDLENBQUM7V0FDckI7QUFBQSxTQUNEO0FBQUEsT0FDRCxFQUFDLENBQUM7QUFDRixZQUFPLEtBQUcsQ0FBQztLQUNaO0FBSUEsU0FBSSxDQUFKLFVBQU0sSUFBRztBQUFLLGNBQU8sU0FBQyxHQUFFLENBQU07QUFBRSxjQUFPLElBQUUsQ0FBRSxJQUFHLENBQUM7T0FBRTtLQUFFO0FBSW5ELFVBQUssQ0FBTCxVQUFPLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDakIsVUFBSSxhQUFhLENBQUMsR0FBRSxDQUFFLElBQUcsQ0FBQyxDQUFDLENBQUc7QUFBRSxXQUFFLENBQUUsSUFBRyxDQUFDLEVBQUksR0FBQztPQUFFO0FBQy9DLFlBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBSUEsU0FBSSxDQUFKLFVBQU0sR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQixVQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBRztBQUFFLFdBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxHQUFDO09BQUU7QUFDL0MsWUFBTyxJQUFFLENBQUUsSUFBRyxDQUFDLENBQUM7S0FDakI7QUFHQSxRQUFHLENBQUgsVUFBSyxHQUFFLENBQUcsSUFBRSxDQUFHO0FBQ1YsYUFBSSxJQUFFLFFBQVMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUN4QixVQUFJLEtBQU0sRUFBQyxFQUFHO0FBQUUsV0FBRSxPQUFRLENBQUMsRUFBQztPQUFFO0FBQUEsS0FDL0I7QUFHQSxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFDZCxhQUFPLEdBQUUsT0FBTyxFQUFJLEdBQUc7QUFBRSxXQUFFLElBQUssRUFBQztPQUFFO0FBQUEsS0FDcEM7QUFHQSxTQUFJLENBQUosVUFBTSxFQUFDLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBRztBQUFFLFlBQU8sR0FBQyxLQUFLLE1BQU8sQ0FBQyxFQUFDLENBQUcsRUFBQyxHQUFFLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDO0tBQUU7QUFHcEUsUUFBRyxDQUFILFVBQUssR0FBRSxDQUFHLEVBQVMsQ0FBRztBRXpFWixXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRnVFM0UsWUFBTyxRQUFPLENBQUMsR0FBRSxDQUFFLEVBQUMsQ0FBRyxJQUFFLENBQUcsS0FBRyxDQUFDO0tBQUU7QUFJMUQsb0JBQWUsQ0FBZixVQUFpQixhQUFZLENBQUcsS0FBRyxDQUFHO0FBQ2pDLDBCQUFlLEVBQUksY0FBWSxLQUFLLE1BQU8sQ0FBQyxhQUFZLENBQUcsRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkYsWUFBTyxJQUFJLGlCQUFnQixFQUFDLENBQUM7S0FDOUI7QUFJQSxVQUFLLENBQUwsVUFBTyxTQUFRLENBQUcsUUFBTSxDQUFHO0FBQzFCLFVBQUksQ0FBQyxTQUFRLENBQUc7QUFBRSxhQUFNLElBQUksTUFBSyxDQUFDLE9BQU0sR0FBSyxtQkFBaUIsQ0FBQztPQUFFO0FBQUEsS0FDbEU7QUFHQSxlQUFVLENBQVYsVUFBWSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUduRCxhQUFRLENBQVIsVUFBVSxHQUFFO0FBQUssWUFBTyxPQUFLLEtBQU0sQ0FBQyxHQUFFLENBQUMsSUFBSyxFQUFDLFlBQUU7Y0FBSyxJQUFFLENBQUUsR0FBRSxDQUFDO09BQUEsRUFBQztLQUFFO0FBRzlELGtCQUFhLENBQWIsVUFBZSxPQUFNLENBQUc7QUFDdkIsVUFBSSxPQUFNLElBQUssQ0FBQyxVQUFTLENBQUMsSUFBTSxTQUFPLENBQUc7QUFDekMsZUFBTSxJQUFLLENBQUMsVUFBUyxDQUFHLFdBQVMsQ0FBQyxDQUFDO09BQ3BDO0FBQUEsS0FDRDtBQUdBLFNBQUksQ0FBSixVQUFjLENBQUc7QUN6R1AsV0FBUyxZQUFvQixHQUFDO0FBQUcsZ0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRHdHOUUsV0FBUyxPQUFJLEdBQUcsSUFBSSxPQUFLLE9BQU8sQ0FBRyxLQUFLLEdBQUc7QUFDMUMsWUFBSSxXQUFXLENBQUMsTUFBSyxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQUUsZ0JBQU8sT0FBSyxDQUFFLEVBQUM7U0FBRTtBQUFBLE9BQ2hEO0FBQUEsS0FDRDtBQUtBLFlBQU8sQ0FBUCxVQUFTLElBQUcsQ0FBRyxLQUFHLENBQUcsUUFBTTtBQUN0QixpQkFBTSxDQUFDO0FBQ1gsWUFBTyxVQUFnQjtBQ3BIZCxhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FEbUh6RSxtQkFBTSxJQUFJLFNBQUMsQ0FBSztBQUNuQixpQkFBTSxFQUFJLEtBQUcsQ0FBQztBQUNkLGNBQUcsTUFBTyxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztTQUMxQixFQUFDO0FBQ0Qsb0JBQVksQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUNyQixlQUFNLEVBQUksV0FBVSxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztPQUNwQyxDQUFDO0tBQ0Y7QUFJQSxzQkFBaUIsQ0FBakIsVUFBbUIsRUFBQyxDQUFHLFFBQU0sQ0FBRztBQUMzQixjQUFHLEVBQUksTUFBSSxDQUFDO0FBQ2hCLGNBQVMsWUFBVSxDQUFFLENBQUU7QUFDdEIsVUFBQyxNQUFPLENBQUMsT0FBTSxDQUFDLENBQUM7QUFDakIsWUFBSSxJQUFHLENBQUc7QUFBRSxpQkFBSztTQUFFO0FBQ25CLDZCQUFxQixDQUFDLFdBQVUsQ0FBQyxDQUFDO09BQ25DO0FBQ0EsaUJBQVcsRUFBQyxDQUFDO0FBQ2IsWUFBTyxTQUFTLHVCQUFxQixDQUFFLENBQUU7QUFDeEMsWUFBRyxFQUFJLEtBQUcsQ0FBQztPQUNaLENBQUM7S0FDRjtBQUdBLGdCQUFXLENBQVgsVUFBYSxJQUFHLENBQUcsUUFBTTtBQUNwQixtQkFBUSxFQUFJLEtBQUcsQ0FBQztBQUNwQixZQUFPLFVBQWdCO0FDaEpkLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUQrSTdFLFlBQUksU0FBUSxDQUFHO0FBQ2QsbUJBQVEsRUFBSSxNQUFJLENBQUM7QUFDakIsb0JBQVUsRUFBQyxTQUFDLENBQUs7QUFBRSxxQkFBUSxFQUFJLEtBQUc7V0FBRSxFQUFHLEdBQUMsQ0FBQztBQUN6QyxjQUFHLE1BQU8sQ0FBQyxPQUFNLENBQUcsS0FBRyxDQUFDLENBQUM7U0FDMUI7QUFBQSxPQUNELENBQUM7S0FDRjtBQVlBLGNBQVMsQ0FBVCxVQUFXLEdBQUUsQ0FBRyxLQUEwQjs7QUFBekIsY0FBRztBQUFHLGlCQUFNO0FBQUcsb0JBQVM7QUFDcEMsZUFBSSxFQUFJLFFBQU0sQ0FBQztBQUNuQixZQUFLLGVBQWdCLENBQUMsR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQyxXQUFFLENBQUYsVUFBSSxDQUFFO0FBQUUsZ0JBQU8sTUFBSTtTQUFFO0FBQ3JCLFdBQUUsQ0FBRixVQUFJLFFBQU8sQ0FBRztBQUNULHNCQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLGNBQUksVUFBUyxDQUFHO0FBQUUsb0JBQU8sRUFBSSxXQUFVLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQztXQUFFO0FBQzVELGNBQUksUUFBTyxJQUFNLFNBQU8sQ0FBRztBQUMxQixpQkFBSSxFQUFJLFNBQU8sQ0FBQztBQUNoQixnQkFBRyxRQUFTLENBQUMsSUFBRyxDQUFHLFNBQU8sQ0FBRyxTQUFPLENBQUMsQ0FBQztXQUN2QztBQUFBLFNBQ0Q7QUFBQSxPQUNELENBQUMsQ0FBQztLQUNIO0FBT0EsVUFBSyxDQUFMLFVBQU8sT0FBTTtBQUlSLGtCQUFPLEVBQUksUUFBTSxTQUFTO0FBQzVCLGlCQUFNLEVBQUksUUFBTSxRQUFRLEdBQUssR0FBQyxTQUFDLEVBQUc7a0JBQU0sRUFBQyxLQUFNLEdBQUM7V0FBQSxFQUFDLENBQUM7QUFLaEQsZUFBSSxDQUFDO0FBQ1QsY0FBUyxTQUFPLENBQUUsQ0FBRTtBQUNmLG9CQUFPLEVBQUksTUFBSSxDQUFDO0FBQ3BCLGFBQUksRUFBSSxTQUFRLEVBQUMsQ0FBQztBQUNsQixZQUFJLFFBQU8sR0FBSyxFQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUc7QUFDMUMsa0JBQVEsQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFDLENBQUM7U0FDMUI7QUFBQSxPQUNEO0FBQ0EsZ0JBQVUsQ0FBQyxRQUFPLENBQUcsR0FBQyxDQUFDO0FBTW5CLDhCQUFtQixFQUFJLGVBQWMsQ0FBQyxRQUFPLENBQUMsQ0FBQztBQU0vQyxrQkFBTyxJQUFJLFNBQUMsQ0FBSztBQUNwQiw0QkFBb0IsRUFBQyxDQUFDO0FBQ3RCLGNBQU8sTUFBSSxDQUFDO09BQ2IsRUFBQztBQU1HLGtCQUFPLENBQUM7QUFDWixjQUFPLFNBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBTTtBQUFFLGdCQUFPLEVBQUksR0FBQyxDQUFDO0FBQUUsY0FBTyxTQUFPLENBQUM7T0FBRSxFQUFDO0FBRS9ELFlBQU8sU0FBTyxDQUFDO0tBQ2hCO0dBRUQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0Y7Ozs7Ozs7aUVHek9BLGlDQUFRLHVCQUFVLENBQUcsMENBQVUsS0FBSSxDQUFHO0FBQ3JDLGNBQVcsQ0FBQztBQU9aLE9BQUksWUFBWSxFQUFJLFVBQVcsT0FBTSxDQUFJO0FBRXhDLFNBQUksU0FBUyxLQUFNLENBQUUsSUFBRyxDQUFFLENBQUM7QUFFM0IsUUFBRyxRQUFRLEVBQUksUUFBTSxDQUFDO0FBQ3RCLFFBQUcsUUFBUSxNQUFNLFNBQVMsRUFBSSxXQUFTLENBQUM7QUFFeEMsUUFBRyxpQkFBa0IsQ0FBRSxTQUFRLENBQUcsVUFBcUIsQ0FBRTtBQUV4RCxVQUFLLElBQUcsUUFBUSxXQUFXLElBQU0sS0FBRyxDQUFJO0FBRXZDLFlBQUcsUUFBUSxXQUFXLFlBQWEsQ0FBRSxJQUFHLFFBQVEsQ0FBRSxDQUFDO09BRXBEO0FBQUEsS0FFRCxDQUFFLENBQUM7R0FFSixDQUFDO0FBRUQsT0FBSSxZQUFZLFVBQVUsRUFBSSxPQUFLLE9BQVEsQ0FBRSxLQUFJLFNBQVMsVUFBVSxDQUFFLENBQUM7QUFFdkUsT0FBSSxZQUFZLEVBQUksVUFBVyxPQUFNLENBQUk7QUFFeEMsU0FBSSxZQUFZLEtBQU0sQ0FBRSxJQUFHLENBQUcsUUFBTSxDQUFFLENBQUM7R0FFeEMsQ0FBQztBQUVELE9BQUksWUFBWSxVQUFVLEVBQUksT0FBSyxPQUFRLENBQUUsS0FBSSxZQUFZLFVBQVUsQ0FBRSxDQUFDO0FBSTFFLE9BQUksY0FBYyxFQUFJLFVBQVUsQ0FBRTtBQUVqQyxXQUFNLElBQUssQ0FBRSxxQkFBb0IsQ0FBRyxNQUFJLFNBQVMsQ0FBRSxDQUFDO0FBRWhELGNBQUs7QUFBRyxlQUFNLENBQUM7QUFDZixrQkFBUztBQUFHLG1CQUFVLENBQUM7QUFFdkIsY0FBSyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUU1QixhQUFJLEVBQUk7QUFDWCxZQUFLLENBQUc7QUFBRSxXQUFFLENBQUc7QUFBRyxhQUFJLENBQUcsR0FBQztBQUFBLE9BQUU7QUFDNUIsYUFBTSxDQUFHLEdBQUM7QUFBQSxLQUNYLENBQUM7QUFFRyxrQkFBUyxFQUFJLFNBQU8sY0FBZSxDQUFFLEtBQUksQ0FBRSxDQUFDO0FBQ2hELGNBQVMsTUFBTSxTQUFTLEVBQUksU0FBTyxDQUFDO0FBRXBDLGNBQVMsTUFBTSxxQkFBcUIsRUFBSSxjQUFZLENBQUM7QUFDckQsY0FBUyxNQUFNLGtCQUFrQixFQUFJLGNBQVksQ0FBQztBQUNsRCxjQUFTLE1BQU0sZ0JBQWdCLEVBQUksY0FBWSxDQUFDO0FBQ2hELGNBQVMsTUFBTSxlQUFlLEVBQUksY0FBWSxDQUFDO0FBRy9DLFFBQUcsV0FBVyxFQUFJLFdBQVMsQ0FBQztBQUV4QixxQkFBWSxFQUFJLFNBQU8sY0FBZSxDQUFFLEtBQUksQ0FBRSxDQUFDO0FBRW5ELGlCQUFZLE1BQU0scUJBQXFCLEVBQUksY0FBWSxDQUFDO0FBQ3hELGlCQUFZLE1BQU0sa0JBQWtCLEVBQUksY0FBWSxDQUFDO0FBQ3JELGlCQUFZLE1BQU0sZ0JBQWdCLEVBQUksY0FBWSxDQUFDO0FBQ25ELGlCQUFZLE1BQU0sZUFBZSxFQUFJLGNBQVksQ0FBQztBQUVsRCxjQUFTLFlBQWEsQ0FBRSxhQUFZLENBQUUsQ0FBQztBQUd2QyxRQUFHLGNBQWMsRUFBSSxVQUFVLENBQUUsR0FFakMsQ0FBQztBQUdELFFBQUcsUUFBUSxFQUFJLFVBQVcsS0FBSSxDQUFHLE9BQUssQ0FBSTtBQUV6QyxZQUFLLEVBQUksTUFBSSxDQUFDO0FBQ2QsYUFBTSxFQUFJLE9BQUssQ0FBQztBQUVoQixnQkFBUyxFQUFJLE9BQUssRUFBSSxHQUFDO0FBQ3ZCLGlCQUFVLEVBQUksUUFBTSxFQUFJLEdBQUM7QUFFekIsZ0JBQVMsTUFBTSxNQUFNLEVBQUksTUFBSSxFQUFJLEtBQUcsQ0FBQztBQUNyQyxnQkFBUyxNQUFNLE9BQU8sRUFBSSxPQUFLLEVBQUksS0FBRyxDQUFDO0FBRXZDLG1CQUFZLE1BQU0sTUFBTSxFQUFJLE1BQUksRUFBSSxLQUFHLENBQUM7QUFDeEMsbUJBQVksTUFBTSxPQUFPLEVBQUksT0FBSyxFQUFJLEtBQUcsQ0FBQztLQUUzQyxDQUFDO0FBRUcsZUFBTSxFQUFJLFVBQVcsS0FBSSxDQUFJO0FBRWhDLFlBQU8sS0FBRyxJQUFLLENBQUUsS0FBSSxDQUFFLEVBQUksU0FBTyxFQUFJLElBQUksTUFBSSxDQUFDO0tBRWhELENBQUM7QUFFRywwQkFBaUIsRUFBSSxVQUFXLE1BQUssQ0FBSTtBQUV4QyxrQkFBTyxFQUFJLE9BQUssU0FBUyxDQUFDO0FBRTlCLFlBQU8sWUFBVSxFQUNoQixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUNoQyxRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQ3pCLElBQUUsQ0FBQztLQUVKLENBQUM7QUFFRywwQkFBaUIsRUFBSSxVQUFXLE1BQUssQ0FBSTtBQUV4QyxrQkFBTyxFQUFJLE9BQUssU0FBUyxDQUFDO0FBRTlCLFlBQU8scUNBQW1DLEVBQ3pDLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUMvQixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFDekIsSUFBRSxDQUFDO0tBRUosQ0FBQztBQUVHLG9CQUFXLEVBQUksVUFBVyxNQUFLLENBQUcsT0FBSyxDQUFJO0FBRTlDLFVBQUssTUFBSyxXQUFhLE1BQUksWUFBWSxDQUFJO0FBRXRDLGlCQUFJLENBQUM7QUFFVCxZQUFLLE1BQUssV0FBYSxNQUFJLFlBQVksQ0FBSTtBQUkxQyxnQkFBSyxLQUFNLENBQUUsTUFBSyxtQkFBbUIsQ0FBRSxDQUFDO0FBQ3hDLGdCQUFLLFVBQVcsRUFBQyxDQUFDO0FBQ2xCLGdCQUFLLGFBQWMsQ0FBRSxNQUFLLFlBQVksQ0FBRSxDQUFDO0FBQ3pDLGdCQUFLLE1BQU8sQ0FBRSxNQUFLLE1BQU0sQ0FBRSxDQUFDO0FBRTVCLGdCQUFLLFNBQVMsQ0FBRyxFQUFFLEVBQUksR0FBQztBQUN4QixnQkFBSyxTQUFTLENBQUcsRUFBRSxFQUFJLEdBQUM7QUFDeEIsZ0JBQUssU0FBUyxDQUFHLEVBQUMsQ0FBRSxFQUFJLEdBQUM7QUFDekIsZ0JBQUssU0FBUyxDQUFHLEVBQUMsQ0FBRSxFQUFJLEdBQUM7QUFFekIsZUFBSSxFQUFJLG1CQUFrQixDQUFFLE1BQUssQ0FBRSxDQUFDO1NBRXJDLEtBQU87QUFFTixlQUFJLEVBQUksbUJBQWtCLENBQUUsTUFBSyxZQUFZLENBQUUsQ0FBQztTQUlqRDtBQUVJLG1CQUFNLEVBQUksT0FBSyxRQUFRLENBQUM7QUFDeEIsdUJBQVUsRUFBSSxNQUFJLFFBQVEsQ0FBRyxNQUFLLEdBQUcsQ0FBRSxDQUFDO0FBRTVDLFlBQUssV0FBVSxJQUFNLFVBQVEsR0FBSyxZQUFVLElBQU0sTUFBSSxDQUFJO0FBRXpELGlCQUFNLE1BQU0sZ0JBQWdCLEVBQUksTUFBSSxDQUFDO0FBQ3JDLGlCQUFNLE1BQU0sYUFBYSxFQUFJLE1BQUksQ0FBQztBQUNsQyxpQkFBTSxNQUFNLFdBQVcsRUFBSSxNQUFJLENBQUM7QUFDaEMsaUJBQU0sTUFBTSxVQUFVLEVBQUksTUFBSSxDQUFDO0FBRS9CLGVBQUksUUFBUSxDQUFHLE1BQUssR0FBRyxDQUFFLEVBQUksTUFBSSxDQUFDO1NBRW5DO0FBRUEsWUFBSyxPQUFNLFdBQVcsSUFBTSxjQUFZLENBQUk7QUFFM0MsdUJBQVksWUFBYSxDQUFFLE9BQU0sQ0FBRSxDQUFDO1NBRXJDO0FBQUEsT0FFRDtBQUVBLFdBQVUsT0FBSTtBQUFHLGFBQUksT0FBSyxTQUFTLE9BQU8sQ0FBRyxJQUFJLEdBQUcsSUFBRyxDQUFJO0FBRTFELG9CQUFZLENBQUUsTUFBSyxTQUFTLENBQUcsRUFBRSxDQUFHLE9BQUssQ0FBRSxDQUFDO09BRTdDO0FBQUEsS0FFRCxDQUFDO0FBR0QsUUFBRyxPQUFPLEVBQUksVUFBVyxLQUFJLENBQUcsT0FBSyxDQUFJO0FBRXBDLGFBQUUsRUFBSSxJQUFFLEVBQUksS0FBRyxJQUFLLENBQUUsS0FBSSxLQUFLLFNBQVUsQ0FBRSxNQUFLLElBQUksRUFBSSxJQUFFLENBQUUsQ0FBRSxFQUFJLFFBQU0sQ0FBQztBQUU3RSxVQUFLLEtBQUksT0FBTyxJQUFJLElBQU0sSUFBRSxDQUFJO0FBRS9CLGtCQUFTLE1BQU0sa0JBQWtCLEVBQUksSUFBRSxFQUFJLEtBQUcsQ0FBQztBQUMvQyxrQkFBUyxNQUFNLGVBQWUsRUFBSSxJQUFFLEVBQUksS0FBRyxDQUFDO0FBQzVDLGtCQUFTLE1BQU0sYUFBYSxFQUFJLElBQUUsRUFBSSxLQUFHLENBQUM7QUFDMUMsa0JBQVMsTUFBTSxZQUFZLEVBQUksSUFBRSxFQUFJLEtBQUcsQ0FBQztBQUV6QyxhQUFJLE9BQU8sSUFBSSxFQUFJLElBQUUsQ0FBQztPQUV2QjtBQUVBLFdBQUksa0JBQW1CLEVBQUMsQ0FBQztBQUV6QixVQUFLLE1BQUssT0FBTyxJQUFNLFVBQVEsQ0FBSTtBQUFFLGNBQUssa0JBQW1CLEVBQUM7T0FBRTtBQUVoRSxZQUFLLG1CQUFtQixXQUFZLENBQUUsTUFBSyxZQUFZLENBQUUsQ0FBQztBQUV0RCxlQUFJLEVBQUksbUJBQWlCLEVBQUksSUFBRSxFQUFJLE1BQUksRUFBSSxtQkFBa0IsQ0FBRSxNQUFLLG1CQUFtQixDQUFFLEVBQzVGLGdCQUFjLEVBQUksV0FBUyxFQUFJLE1BQUksRUFBSSxZQUFVLEVBQUksU0FBTyxDQUFDO0FBRzlELFVBQUssS0FBSSxPQUFPLE1BQU0sSUFBTSxNQUFJLENBQUk7QUFFbkMscUJBQVksTUFBTSxnQkFBZ0IsRUFBSSxNQUFJLENBQUM7QUFDM0MscUJBQVksTUFBTSxhQUFhLEVBQUksTUFBSSxDQUFDO0FBQ3hDLHFCQUFZLE1BQU0sV0FBVyxFQUFJLE1BQUksQ0FBQztBQUN0QyxxQkFBWSxNQUFNLFVBQVUsRUFBSSxNQUFJLENBQUM7QUFFckMsYUFBSSxPQUFPLE1BQU0sRUFBSSxNQUFJLENBQUM7T0FFM0I7QUFFQSxrQkFBWSxDQUFFLEtBQUksQ0FBRyxPQUFLLENBQUUsQ0FBQztLQUU5QixDQUFDO0dBRUYsQ0FBQztBQUVGLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztpRUMvUEEsaUNBQVEsdUJBQVUsQ0FBRywwQ0FBVSxLQUFJLENBQUc7QUFDckMsY0FBVyxDQUFDO0FBU1osT0FBSSxrQkFBa0IsRUFBSSxVQUFVLE1BQUssQ0FBRyxXQUFTLENBQUc7QUFFbkQsYUFBSSxFQUFJLEtBQUcsQ0FBQztBQUNaLGFBQUksRUFBSTtBQUFFLFVBQUcsQ0FBRyxFQUFDO0FBQUcsWUFBSyxDQUFHO0FBQUcsVUFBRyxDQUFHO0FBQUcsU0FBRSxDQUFHO0FBQUcsa0JBQVcsQ0FBRztBQUFHLG9CQUFhLENBQUc7QUFBQSxLQUFFLENBQUM7QUFFeEYsUUFBRyxPQUFPLEVBQUksT0FBSyxDQUFDO0FBQ3BCLFFBQUcsV0FBVyxFQUFJLEVBQUUsVUFBUyxJQUFNLFVBQVEsQ0FBRSxFQUFJLFdBQVMsRUFBSSxTQUFPLENBQUM7QUFJdEUsUUFBRyxRQUFRLEVBQUksS0FBRyxDQUFDO0FBRW5CLFFBQUcsT0FBTyxFQUFJO0FBQUUsVUFBRyxDQUFHO0FBQUcsU0FBRSxDQUFHO0FBQUcsV0FBSSxDQUFHO0FBQUcsWUFBSyxDQUFHO0FBQUEsS0FBRSxDQUFDO0FBRXRELFFBQUcsWUFBWSxFQUFJLElBQUUsQ0FBQztBQUN0QixRQUFHLFVBQVUsRUFBSSxJQUFFLENBQUM7QUFDcEIsUUFBRyxTQUFTLEVBQUksSUFBRSxDQUFDO0FBRW5CLFFBQUcsU0FBUyxFQUFJLE1BQUksQ0FBQztBQUNyQixRQUFHLE9BQU8sRUFBSSxNQUFJLENBQUM7QUFDbkIsUUFBRyxNQUFNLEVBQUksTUFBSSxDQUFDO0FBQ2xCLFFBQUcsT0FBTyxFQUFJLE1BQUksQ0FBQztBQUVuQixRQUFHLGFBQWEsRUFBSSxNQUFJLENBQUM7QUFDekIsUUFBRyxxQkFBcUIsRUFBSSxJQUFFLENBQUM7QUFFL0IsUUFBRyxZQUFZLEVBQUksR0FBQztBQUNwQixRQUFHLFlBQVksRUFBSSxTQUFPLENBQUM7QUFFM0IsUUFBRyxLQUFLLEVBQUksRUFBRSxFQUFDLENBQVMsR0FBQyxDQUFTLEdBQUMsQ0FBUSxDQUFDO0FBSTVDLFFBQUcsT0FBTyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUU3QixXQUFFLEVBQUksU0FBTyxDQUFDO0FBRWQsb0JBQVcsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFFbEMsY0FBSyxFQUFJLE1BQUksS0FBSztBQUNyQixrQkFBUyxFQUFJLE1BQUksS0FBSztBQUV0QixZQUFHLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQztBQUV6QixvQkFBVyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUM7QUFDakMsa0JBQVMsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDO0FBRS9CLGtCQUFTLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQztBQUMvQixnQkFBTyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUM7QUFFN0IsK0JBQXNCLEVBQUk7QUFDMUIsNkJBQW9CLEVBQUk7QUFFeEIsaUJBQVEsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDO0FBQzlCLGVBQU0sRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFJOUIsUUFBRyxRQUFRLEVBQUksS0FBRyxPQUFPLE1BQU8sRUFBQyxDQUFDO0FBQ2xDLFFBQUcsVUFBVSxFQUFJLEtBQUcsT0FBTyxTQUFTLE1BQU8sRUFBQyxDQUFDO0FBQzdDLFFBQUcsSUFBSSxFQUFJLEtBQUcsT0FBTyxHQUFHLE1BQU8sRUFBQyxDQUFDO0FBSTdCLG1CQUFVLEVBQUksRUFBRSxJQUFHLENBQUcsU0FBTyxDQUFFLENBQUM7QUFDaEMsa0JBQVMsRUFBSSxFQUFFLElBQUcsQ0FBRyxRQUFNLENBQUMsQ0FBQztBQUM3QixnQkFBTyxFQUFJLEVBQUUsSUFBRyxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBSzdCLFFBQUcsYUFBYSxFQUFJLFVBQVUsQ0FBRTtBQUUvQixVQUFJLElBQUcsV0FBVyxJQUFNLFNBQU8sQ0FBRztBQUVqQyxZQUFHLE9BQU8sS0FBSyxFQUFJLEdBQUM7QUFDcEIsWUFBRyxPQUFPLElBQUksRUFBSSxHQUFDO0FBQ25CLFlBQUcsT0FBTyxNQUFNLEVBQUksT0FBSyxXQUFXLENBQUM7QUFDckMsWUFBRyxPQUFPLE9BQU8sRUFBSSxPQUFLLFlBQVksQ0FBQztPQUV4QyxLQUFPO0FBRUYsZUFBRSxFQUFJLEtBQUcsV0FBVyxzQkFBdUIsRUFBQyxDQUFDO0FBRTdDLGVBQUksS0FBRyxXQUFXLGNBQWMsZ0JBQWdCLENBQUM7QUFDckQsWUFBRyxPQUFPLEtBQUssRUFBSSxJQUFFLEtBQUssRUFBSSxPQUFLLFlBQVksRUFBSSxhQUFXLENBQUM7QUFDL0QsWUFBRyxPQUFPLElBQUksRUFBSSxJQUFFLElBQUksRUFBSSxPQUFLLFlBQVksRUFBSSxZQUFVLENBQUM7QUFDNUQsWUFBRyxPQUFPLE1BQU0sRUFBSSxJQUFFLE1BQU0sQ0FBQztBQUM3QixZQUFHLE9BQU8sT0FBTyxFQUFJLElBQUUsT0FBTyxDQUFDO09BRWhDO0FBQUEsS0FFRCxDQUFDO0FBR0QsUUFBRyxZQUFZLEVBQUksVUFBVSxLQUFJLENBQUc7QUFFbkMsVUFBSSxNQUFPLEtBQUcsQ0FBRyxLQUFJLEtBQUssQ0FBRSxHQUFLLFdBQVMsQ0FBRztBQUU1QyxZQUFHLENBQUcsS0FBSSxLQUFLLENBQUcsQ0FBQyxLQUFJLENBQUMsQ0FBQztPQUUxQjtBQUFBLEtBRUQsQ0FBQztBQUVHLHdCQUFlLEVBQUksRUFBRSxTQUFVLENBQUU7QUFFaEMsZ0JBQUssRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFFaEMsWUFBTyxVQUFVLEtBQUksQ0FBRyxNQUFJLENBQUc7QUFFOUIsY0FBSyxJQUFLLENBQ1IsQ0FBRSxLQUFJLEVBQUksTUFBSSxPQUFPLEtBQUssQ0FBRSxFQUFJLE1BQUksT0FBTyxNQUFNLENBQ2pELEVBQUUsS0FBSSxFQUFJLE1BQUksT0FBTyxJQUFJLENBQUUsRUFBSSxNQUFJLE9BQU8sT0FBTyxDQUNuRCxDQUFDO0FBRUQsY0FBTyxPQUFLLENBQUM7T0FFZCxDQUFDO0tBRUQsRUFBQyxDQUFFLENBQUM7QUFFRCxnQ0FBdUIsRUFBSSxFQUFFLFNBQVUsQ0FBRTtBQUV4QyxnQkFBSyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUM1QixrQkFBTyxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUM5QixxQkFBVSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUMsQ0FBQztBQUVyQyxZQUFPLFVBQVUsS0FBSSxDQUFHLE1BQUksQ0FBRztBQUU5QixtQkFBVSxJQUFLLENBQ2IsQ0FBRSxLQUFJLEVBQUksTUFBSSxPQUFPLE1BQU0sRUFBSSxJQUFFLEVBQUksTUFBSSxPQUFPLEtBQUssQ0FBRSxFQUFJLEVBQUMsS0FBSSxPQUFPLE1BQU0sRUFBSSxHQUFDLENBQUMsQ0FDbkYsRUFBRSxLQUFJLE9BQU8sT0FBTyxFQUFJLElBQUUsRUFBSSxNQUFJLE9BQU8sSUFBSSxFQUFJLE1BQUksQ0FBRSxFQUFJLEVBQUMsS0FBSSxPQUFPLE9BQU8sRUFBSSxHQUFDLENBQUMsQ0FDckYsSUFBRSxDQUNILENBQUM7QUFFRyxrQkFBSyxFQUFJLFlBQVUsT0FBUSxFQUFDLENBQUM7QUFFakMsWUFBSSxLQUFJLE9BQU8sQ0FBRztBQUVqQixjQUFJLE1BQUssRUFBSSxLQUFHLFFBQVEsQ0FBRztBQUUxQix1QkFBVSxFQUFFLEVBQUksS0FBRyxLQUFNLENBQUMsR0FBRSxFQUFJLE9BQUssRUFBSSxPQUFLLENBQUMsQ0FBQztXQUVqRCxLQUFPO0FBRU4sdUJBQVUsRUFBRSxFQUFJLEdBQUMsRUFBSSxPQUFLLENBQUM7V0FFNUI7QUFBQSxTQUVELEtBQU8sS0FBSSxNQUFLLEVBQUksSUFBRSxDQUFHO0FBRXhCLHFCQUFVLFVBQVcsRUFBQyxDQUFDO1NBRXhCLEtBQU87QUFFTixxQkFBVSxFQUFFLEVBQUksS0FBRyxLQUFNLENBQUMsR0FBRSxFQUFJLE9BQUssRUFBSSxPQUFLLENBQUMsQ0FBQztTQUVqRDtBQUVBLFlBQUcsS0FBTSxDQUFDLEtBQUksT0FBTyxTQUFTLENBQUMsSUFBSyxDQUFDLEtBQUksT0FBTyxDQUFDLENBQUM7QUFFbEQsY0FBSyxLQUFNLENBQUMsS0FBSSxPQUFPLEdBQUcsQ0FBQyxVQUFXLENBQUMsV0FBVSxFQUFFLENBQUMsQ0FBQztBQUNyRCxjQUFLLElBQUssQ0FBQyxRQUFPLEtBQU0sQ0FBQyxLQUFJLE9BQU8sR0FBRyxDQUFDLE1BQU8sQ0FBQyxJQUFHLENBQUMsVUFBVyxDQUFDLFdBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvRSxjQUFLLElBQUssQ0FBQyxJQUFHLFVBQVcsQ0FBQyxXQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFekMsY0FBTyxPQUFLLENBQUM7T0FFZCxDQUFDO0tBRUQsRUFBQyxDQUFFLENBQUM7QUFFTCxRQUFHLGFBQWEsRUFBSSxFQUFDLFNBQVUsQ0FBRTtBQUU1QixjQUFHLEVBQUksSUFBSSxNQUFJLFFBQVMsRUFBQztBQUM1QixvQkFBUyxFQUFJLElBQUksTUFBSSxXQUFZLEVBQUMsQ0FBQztBQUdwQyxZQUFPLFVBQVUsQ0FBRTtBQUVkLGlCQUFJLEVBQUksS0FBRyxLQUFNLENBQUMsWUFBVyxJQUFLLENBQUMsVUFBUyxDQUFDLEVBQUksYUFBVyxPQUFRLEVBQUMsRUFBSSxXQUFTLE9BQVEsRUFBQyxDQUFDLENBQUM7QUFFakcsWUFBSSxLQUFJLENBQUc7QUFFVixjQUFHLGFBQWMsQ0FBQyxZQUFXLENBQUcsV0FBUyxDQUFDLFVBQVcsRUFBQyxDQUFDO0FBRXZELGVBQUksR0FBSyxNQUFJLFlBQVksQ0FBQztBQUUxQixvQkFBUyxpQkFBa0IsQ0FBQyxJQUFHLENBQUcsRUFBQyxLQUFJLENBQUMsQ0FBQztBQUV6QyxjQUFHLGdCQUFpQixDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQ2hDLGVBQUksT0FBTyxHQUFHLGdCQUFpQixDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBRTNDLG9CQUFTLGdCQUFpQixDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBRXRDLGNBQUksS0FBSSxhQUFhLENBQUc7QUFFdkIsd0JBQVcsS0FBTSxDQUFDLFVBQVMsQ0FBQyxDQUFDO1dBRTlCLEtBQU87QUFFTixzQkFBUyxpQkFBa0IsQ0FBQyxJQUFHLENBQUcsTUFBSSxFQUFJLEVBQUUsS0FBSSxxQkFBcUIsRUFBSSxJQUFFLENBQUUsQ0FBQyxDQUFDO0FBQy9FLHdCQUFXLGdCQUFpQixDQUFDLFVBQVMsQ0FBQyxDQUFDO1dBRXpDO0FBQUEsU0FFRDtBQUFBLE9BQ0Q7S0FFQSxFQUFDLENBQUMsQ0FBQztBQUVKLFFBQUcsV0FBVyxFQUFJLFVBQVUsQ0FBRTtBQUU3QixVQUFJLE1BQUssSUFBTSxNQUFJLGVBQWUsQ0FBRztBQUdoQyxrQkFBSyxFQUFJLHdCQUFzQixFQUFJLHNCQUFvQixDQUFDO0FBQzVELCtCQUFzQixFQUFJLHNCQUFvQixDQUFDO0FBQy9DLFlBQUcsZUFBZ0IsQ0FBQyxNQUFLLENBQUMsQ0FBQztPQUU1QixLQUFPO0FBR0Ysa0JBQUssRUFBSSxJQUFFLEVBQUksRUFBRSxRQUFPLEVBQUUsRUFBSSxXQUFTLEVBQUUsQ0FBRSxFQUFJLE1BQUksVUFBVSxDQUFDO0FBRWxFLFlBQUksTUFBSyxJQUFNLElBQUUsR0FBSyxPQUFLLEVBQUksSUFBRSxDQUFHO0FBRW5DLGNBQUcsZUFBZ0IsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUUzQixjQUFJLEtBQUksYUFBYSxDQUFHO0FBRXZCLHNCQUFTLEtBQU0sQ0FBQyxRQUFPLENBQUMsQ0FBQztXQUUxQixLQUFPO0FBRU4sc0JBQVMsRUFBRSxHQUFLLEVBQUUsUUFBTyxFQUFFLEVBQUksV0FBUyxFQUFFLENBQUUsRUFBSSxLQUFHLHFCQUFxQixDQUFDO1dBRTFFO0FBQUEsU0FFRDtBQUFBLE9BRUQ7QUFBQSxLQUVELENBQUM7QUFFRCxRQUFHLFVBQVUsRUFBSSxFQUFDLFNBQVUsQ0FBRTtBQUV6QixxQkFBVSxFQUFJLElBQUksTUFBSSxRQUFTLEVBQUM7QUFDbkMsa0JBQU8sRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDO0FBQzdCLGFBQUUsRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFFMUIsWUFBTyxVQUFVLENBQUU7QUFFbEIsbUJBQVUsS0FBTSxDQUFDLE9BQU0sQ0FBQyxJQUFLLENBQUMsU0FBUSxDQUFDLENBQUM7QUFFeEMsWUFBSSxXQUFVLFNBQVUsRUFBQyxDQUFHO0FBRTNCLHFCQUFVLGVBQWdCLENBQUMsSUFBRyxPQUFRLEVBQUMsRUFBSSxNQUFJLFNBQVMsQ0FBQyxDQUFDO0FBRTFELGFBQUUsS0FBTSxDQUFDLElBQUcsQ0FBQyxNQUFPLENBQUMsS0FBSSxPQUFPLEdBQUcsQ0FBQyxVQUFXLENBQUMsV0FBVSxFQUFFLENBQUMsQ0FBQztBQUM5RCxhQUFFLElBQUssQ0FBQyxRQUFPLEtBQU0sQ0FBQyxLQUFJLE9BQU8sR0FBRyxDQUFDLFVBQVcsQ0FBQyxXQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFaEUsZUFBSSxPQUFPLFNBQVMsSUFBSyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQzlCLGVBQUksT0FBTyxJQUFLLENBQUMsR0FBRSxDQUFDLENBQUM7QUFFckIsY0FBSSxLQUFJLGFBQWEsQ0FBRztBQUV2QixxQkFBUSxLQUFNLENBQUMsT0FBTSxDQUFDLENBQUM7V0FFeEIsS0FBTztBQUVOLHFCQUFRLElBQUssQ0FBQyxXQUFVLFdBQVksQ0FBQyxPQUFNLENBQUcsVUFBUSxDQUFDLGVBQWdCLENBQUMsS0FBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7V0FFckc7QUFBQSxTQUVEO0FBQUEsT0FDRDtLQUVBLEVBQUMsQ0FBQyxDQUFDO0FBTUosUUFBRyxrQkFBa0IsRUFBSSxVQUFVLFFBQU8sQ0FBRztBQUM1QyxXQUFJLE9BQU8sU0FBUyxVQUFXLEVBQUMsZUFBZ0IsQ0FBQyxRQUFPLENBQUMsQ0FBQztLQUMzRCxDQUFDO0FBSUQsUUFBRyxlQUFlLEVBQUksVUFBVSxDQUFFO0FBRWpDLFVBQUksQ0FBQyxLQUFJLE9BQU8sR0FBSyxFQUFDLEtBQUksTUFBTSxDQUFHO0FBRWxDLFlBQUksSUFBRyxTQUFVLEVBQUMsRUFBSSxNQUFJLFlBQVksRUFBSSxNQUFJLFlBQVksQ0FBRztBQUU1RCxlQUFJLE9BQU8sU0FBUyxXQUFZLENBQUMsS0FBSSxPQUFPLENBQUcsS0FBRyxVQUFXLENBQUMsS0FBSSxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBRWxGO0FBRUEsWUFBSSxJQUFHLFNBQVUsRUFBQyxFQUFJLE1BQUksWUFBWSxFQUFJLE1BQUksWUFBWSxDQUFHO0FBRTVELGVBQUksT0FBTyxTQUFTLFdBQVksQ0FBQyxLQUFJLE9BQU8sQ0FBRyxLQUFHLFVBQVcsQ0FBQyxLQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FFbEY7QUFBQSxPQUVEO0FBQUEsS0FFRCxDQUFDO0FBRUQsUUFBRyxPQUFPLEVBQUksVUFBVSxDQUFFO0FBRXpCLFVBQUcsV0FBWSxDQUFDLEtBQUksT0FBTyxTQUFTLENBQUcsTUFBSSxPQUFPLENBQUMsQ0FBQztBQUVwRCxVQUFJLENBQUMsS0FBSSxTQUFTLENBQUc7QUFFcEIsYUFBSSxhQUFjLEVBQUMsQ0FBQztPQUVyQjtBQUVBLFVBQUksQ0FBQyxLQUFJLE9BQU8sQ0FBRztBQUVsQixhQUFJLFdBQVksRUFBQyxDQUFDO09BRW5CO0FBRUEsVUFBSSxDQUFDLEtBQUksTUFBTSxDQUFHO0FBRWpCLGFBQUksVUFBVyxFQUFDLENBQUM7T0FFbEI7QUFFQSxXQUFJLE9BQU8sU0FBUyxXQUFZLENBQUMsS0FBSSxPQUFPLENBQUcsS0FBRyxDQUFDLENBQUM7QUFFcEQsV0FBSSxlQUFnQixFQUFDLENBQUM7QUFFdEIsV0FBSSxPQUFPLE9BQVEsQ0FBQyxLQUFJLE9BQU8sQ0FBQyxDQUFDO0FBRWpDLFVBQUksWUFBVyxrQkFBbUIsQ0FBQyxLQUFJLE9BQU8sU0FBUyxDQUFDLEVBQUksSUFBRSxDQUFHO0FBRWhFLGFBQUksY0FBZSxDQUFDLFdBQVUsQ0FBQyxDQUFDO0FBRWhDLG9CQUFXLEtBQU0sQ0FBQyxLQUFJLE9BQU8sU0FBUyxDQUFDLENBQUM7T0FFekM7QUFBQSxLQUVELENBQUM7QUFHRCxRQUFHLE1BQU0sRUFBSSxVQUFVLENBQUU7QUFFeEIsWUFBSyxFQUFJLE1BQUksS0FBSyxDQUFDO0FBQ25CLGdCQUFTLEVBQUksTUFBSSxLQUFLLENBQUM7QUFFdkIsV0FBSSxPQUFPLEtBQU0sQ0FBQyxLQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLFdBQUksT0FBTyxTQUFTLEtBQU0sQ0FBQyxLQUFJLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLFdBQUksT0FBTyxHQUFHLEtBQU0sQ0FBQyxLQUFJLElBQUksQ0FBQyxDQUFDO0FBRS9CLFVBQUcsV0FBWSxDQUFDLEtBQUksT0FBTyxTQUFTLENBQUcsTUFBSSxPQUFPLENBQUMsQ0FBQztBQUVwRCxXQUFJLE9BQU8sT0FBUSxDQUFDLEtBQUksT0FBTyxDQUFDLENBQUM7QUFFakMsV0FBSSxjQUFlLENBQUMsV0FBVSxDQUFDLENBQUM7QUFFaEMsa0JBQVcsS0FBTSxDQUFDLEtBQUksT0FBTyxTQUFTLENBQUMsQ0FBQztLQUV6QyxDQUFDO0FBT0cscUJBQVksRUFBSSxJQUFJLE1BQUksUUFBUyxFQUFDLENBQUM7QUFFbkMseUJBQWdCLEVBQUksR0FBQztBQUd6QixZQUFTLFFBQU0sQ0FBRyxLQUFJLENBQUk7QUFHekIsY0FBUyxLQUFJLFFBQVE7QUFFcEIsWUFBSyxHQUFDLENBQUM7QUFDUCxZQUFLLEdBQUM7QUFDTCx1QkFBWSxFQUFFLEVBQUksa0JBQWdCLENBQUM7QUFDbkMsZ0JBQUs7QUFFTixZQUFLLEdBQUMsQ0FBQztBQUNQLFlBQUssR0FBQztBQUNMLHVCQUFZLEVBQUUsRUFBSSxFQUFDLGlCQUFnQixDQUFDO0FBQ3BDLGdCQUFLO0FBRU4sWUFBSyxHQUFDLENBQUM7QUFDUCxZQUFLLEdBQUM7QUFDTCx1QkFBWSxFQUFFLEVBQUksRUFBQyxpQkFBZ0IsQ0FBQztBQUNwQyxnQkFBSztBQUVOLFlBQUssR0FBQyxDQUFDO0FBQ1AsWUFBSyxHQUFDO0FBQ0wsdUJBQVksRUFBRSxFQUFJLGtCQUFnQixDQUFDO0FBQ25DLGdCQUFLO0FBQUEsT0FFUDtLQUVEO0FBR0EsWUFBUyxNQUFJLENBQUcsS0FBSSxDQUFJO0FBR3ZCLGNBQVEsS0FBSSxRQUFRO0FBRW5CLFlBQUssR0FBQyxDQUFDO0FBQ1AsWUFBSyxHQUFDO0FBQ0wsdUJBQVksRUFBRSxFQUFJLEdBQUM7QUFDbkIsZ0JBQUs7QUFFTixZQUFLLEdBQUMsQ0FBQztBQUNQLFlBQUssR0FBQztBQUNMLHVCQUFZLEVBQUUsRUFBSSxHQUFDO0FBQ25CLGdCQUFLO0FBRU4sWUFBSyxHQUFDLENBQUM7QUFDUCxZQUFLLEdBQUM7QUFDTCx1QkFBWSxFQUFFLEVBQUksR0FBQztBQUNuQixnQkFBSztBQUVOLFlBQUssR0FBQyxDQUFDO0FBQ1AsWUFBSyxHQUFDO0FBQ0wsdUJBQVksRUFBRSxFQUFJLEdBQUM7QUFDbkIsZ0JBQUs7QUFBQSxPQUVQO0tBRUQ7QUFLQSxZQUFTLFVBQVEsQ0FBRSxLQUFJLENBQUc7QUFFekIsVUFBSSxLQUFJLFFBQVEsSUFBTSxNQUFJO0FBQUcsZUFBTTtBQUtuQyxVQUFJLE1BQUssSUFBTSxNQUFJLEtBQUssQ0FBRztBQUUxQixjQUFLLEVBQUksTUFBSSxPQUFPLENBQUM7T0FFdEI7QUFFQSxVQUFJLE1BQUssSUFBTSxNQUFJLE9BQU8sR0FBSyxFQUFDLEtBQUksU0FBUyxDQUFHO0FBRS9DLG9CQUFXLEtBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLE1BQU0sQ0FBRyxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckUsa0JBQVMsS0FBTSxDQUFDLFlBQVcsQ0FBQyxDQUFDO09BRTlCLEtBQU8sS0FBSSxNQUFLLElBQU0sTUFBSSxLQUFLLEdBQUssRUFBQyxLQUFJLE9BQU8sQ0FBRztBQUVsRCxrQkFBUyxLQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzNELGdCQUFPLEtBQU0sQ0FBQyxVQUFTLENBQUMsQ0FBQztPQUUxQixLQUFPLEtBQUksTUFBSyxJQUFNLE1BQUksSUFBSSxHQUFLLEVBQUMsS0FBSSxNQUFNLENBQUc7QUFFaEQsaUJBQVEsS0FBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUksTUFBTSxDQUFHLE1BQUksTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMxRCxlQUFNLEtBQU0sQ0FBQyxTQUFRLENBQUM7T0FFdkI7QUFFQSxjQUFPLGlCQUFrQixDQUFDLFdBQVUsQ0FBRyxVQUFRLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDeEQsY0FBTyxpQkFBa0IsQ0FBQyxTQUFRLENBQUcsUUFBTSxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBRXBELFdBQUksY0FBZSxDQUFDLFVBQVMsQ0FBQyxDQUFDO0tBRWhDO0FBRUEsWUFBUyxVQUFRLENBQUUsS0FBSSxDQUFHO0FBRXpCLFVBQUksS0FBSSxRQUFRLElBQU0sTUFBSTtBQUFHLGVBQU07QUFLbkMsVUFBSSxNQUFLLElBQU0sTUFBSSxPQUFPLEdBQUssRUFBQyxLQUFJLFNBQVMsQ0FBRztBQUUvQyxrQkFBUyxLQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO09BRXBFLEtBQU8sS0FBSSxNQUFLLElBQU0sTUFBSSxLQUFLLEdBQUssRUFBQyxLQUFJLE9BQU8sQ0FBRztBQUVsRCxnQkFBTyxLQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxNQUFNLENBQUcsTUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO09BRTFELEtBQU8sS0FBSSxNQUFLLElBQU0sTUFBSSxJQUFJLEdBQUssRUFBQyxLQUFJLE1BQU0sQ0FBRztBQUVoRCxlQUFNLEtBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLE1BQU0sQ0FBRyxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7T0FFekQ7QUFBQSxLQUVEO0FBRUEsWUFBUyxRQUFNLENBQUUsS0FBSSxDQUFHO0FBRXZCLFVBQUksS0FBSSxRQUFRLElBQU0sTUFBSTtBQUFHLGVBQU07QUFLbkMsWUFBSyxFQUFJLE1BQUksS0FBSyxDQUFDO0FBRW5CLGNBQU8sb0JBQXFCLENBQUMsV0FBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQ3BELGNBQU8sb0JBQXFCLENBQUMsU0FBUSxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQ2hELFdBQUksY0FBZSxDQUFDLFFBQU8sQ0FBQyxDQUFDO0tBRTlCO0FBRUEsWUFBUyxXQUFTLENBQUUsS0FBSSxDQUFHO0FBRTFCLFVBQUksS0FBSSxRQUFRLElBQU0sTUFBSTtBQUFHLGVBQU07QUFFbkMsV0FBSSxlQUFnQixFQUFDLENBQUM7QUFDdEIsV0FBSSxnQkFBaUIsRUFBQyxDQUFDO0FBRW5CLGVBQUksRUFBSSxHQUFDO0FBRWIsVUFBSSxLQUFJLFdBQVcsQ0FBRztBQUVyQixhQUFJLEVBQUksTUFBSSxXQUFXLEVBQUksR0FBQyxDQUFDO09BRTlCLEtBQU8sS0FBSSxLQUFJLE9BQU8sQ0FBRztBQUV4QixhQUFJLEVBQUksRUFBQyxLQUFJLE9BQU8sRUFBSSxHQUFDO09BRTFCO0FBRUEsZ0JBQVMsRUFBRSxHQUFLLE1BQUksRUFBSSxLQUFHLENBQUM7QUFDNUIsV0FBSSxjQUFlLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDL0IsV0FBSSxjQUFlLENBQUMsUUFBTyxDQUFDLENBQUM7S0FFOUI7QUFFQSxZQUFTLFdBQVMsQ0FBRSxLQUFJLENBQUc7QUFFMUIsVUFBSSxLQUFJLFFBQVEsSUFBTSxNQUFJLENBQUc7QUFBRSxlQUFLO09BQUU7QUFFdEMsY0FBUSxLQUFJLFFBQVEsT0FBTztBQUUxQixZQUFLO0FBQ0osZ0JBQUssRUFBSSxNQUFJLGFBQWEsQ0FBQztBQUMzQixzQkFBVyxLQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUcsTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQy9GLG9CQUFTLEtBQU0sQ0FBQyxZQUFXLENBQUMsQ0FBQztBQUM3QixnQkFBSztBQUVOLFlBQUs7QUFDSixnQkFBSyxFQUFJLE1BQUksZUFBZSxDQUFDO0FBQ3pCLGdCQUFDLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUM7QUFDeEQsZ0JBQUMsRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQztBQUM1RCwrQkFBb0IsRUFBSSx3QkFBc0IsRUFBSSxLQUFHLEtBQU0sQ0FBQyxFQUFDLEVBQUksR0FBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQztBQUUxRSxpQkFBSSxFQUFFLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFFLEVBQUksR0FBQztBQUMvRCxpQkFBSSxFQUFFLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFFLEVBQUksR0FBQztBQUNuRSxtQkFBUSxLQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRyxHQUFDLENBQUMsQ0FBQztBQUN0QyxpQkFBTSxLQUFNLENBQUMsU0FBUSxDQUFDLENBQUM7QUFDdkIsZ0JBQUs7QUFFTjtBQUNDLGdCQUFLLEVBQUksTUFBSSxLQUFLLENBQUM7QUFEYixPQUdSO0FBQ0EsV0FBSSxjQUFlLENBQUMsVUFBUyxDQUFDLENBQUM7S0FHaEM7QUFFQSxZQUFTLFVBQVEsQ0FBRSxLQUFJLENBQUc7QUFFekIsVUFBSSxLQUFJLFFBQVEsSUFBTSxNQUFJO0FBQUcsZUFBTTtBQUtuQyxjQUFRLEtBQUksUUFBUSxPQUFPO0FBRTFCLFlBQUs7QUFDSixvQkFBUyxLQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUcsTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzdGLGdCQUFLO0FBRU4sWUFBSztBQUNBLGdCQUFDLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLEVBQUksTUFBSSxRQUFRLENBQUcsRUFBRSxNQUFNLENBQUM7QUFDeEQsZ0JBQUMsRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQztBQUM1RCwrQkFBb0IsRUFBSSxLQUFHLEtBQU0sQ0FBQyxFQUFDLEVBQUksR0FBQyxFQUFJLEdBQUMsRUFBSSxHQUFDLENBQUMsQ0FBQztBQUVoRCxpQkFBSSxFQUFFLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFFLEVBQUksR0FBQztBQUMvRCxpQkFBSSxFQUFFLEtBQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxFQUFJLE1BQUksUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFFLEVBQUksR0FBQztBQUNuRSxpQkFBTSxLQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRyxHQUFDLENBQUMsQ0FBQztBQUNwQyxnQkFBSztBQUVOO0FBQ0MsZ0JBQUssRUFBSSxNQUFJLEtBQUssQ0FBQztBQURiLE9BR1I7S0FFRDtBQUVBLFlBQVMsU0FBTyxDQUFFLEtBQUksQ0FBRztBQUV4QixVQUFJLEtBQUksUUFBUSxJQUFNLE1BQUk7QUFBRyxlQUFNO0FBR25DLGNBQVEsS0FBSSxRQUFRLE9BQU87QUFFMUIsWUFBSztBQUNKLG9CQUFTLEtBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBRyxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDN0Ysc0JBQVcsS0FBTSxDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBQzdCLGdCQUFLO0FBRU4sWUFBSztBQUNKLGlDQUFzQixFQUFJLHNCQUFvQixFQUFJLEdBQUM7QUFFL0MsaUJBQUksRUFBRSxLQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBRSxFQUFJLEdBQUM7QUFDL0QsaUJBQUksRUFBRSxLQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sRUFBSSxNQUFJLFFBQVEsQ0FBRyxFQUFFLE1BQU0sQ0FBRSxFQUFJLEdBQUM7QUFDbkUsaUJBQU0sS0FBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUcsR0FBQyxDQUFDLENBQUM7QUFDcEMsbUJBQVEsS0FBTSxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFLO0FBQUEsT0FFUDtBQUVBLFlBQUssRUFBSSxNQUFJLEtBQUssQ0FBQztBQUNuQixXQUFJLGNBQWUsQ0FBQyxRQUFPLENBQUMsQ0FBQztLQUU5QjtBQUdBLFFBQUcsV0FBVyxpQkFBa0IsQ0FBQyxhQUFZLENBQUcsVUFBVSxLQUFJLENBQUc7QUFBRSxXQUFJLGVBQWdCLEVBQUMsQ0FBQztLQUFFLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFcEcsUUFBRyxXQUFXLGlCQUFrQixDQUFDLFdBQVUsQ0FBRyxVQUFRLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFL0QsUUFBRyxXQUFXLGlCQUFrQixDQUFDLFlBQVcsQ0FBRyxXQUFTLENBQUcsTUFBSSxDQUFDLENBQUM7QUFDakUsUUFBRyxXQUFXLGlCQUFrQixDQUFDLGdCQUFlLENBQUcsV0FBUyxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBRXJFLFFBQUcsV0FBVyxpQkFBa0IsQ0FBQyxZQUFXLENBQUcsV0FBUyxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBQ2pFLFFBQUcsV0FBVyxpQkFBa0IsQ0FBQyxVQUFTLENBQUcsU0FBTyxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBQzdELFFBQUcsV0FBVyxpQkFBa0IsQ0FBQyxXQUFVLENBQUcsVUFBUSxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBRS9ELFVBQUssaUJBQWtCLENBQUMsU0FBUSxDQUFHLFFBQU0sQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUNsRCxVQUFLLGlCQUFrQixDQUFDLE9BQU0sQ0FBRyxNQUFJLENBQUcsTUFBSSxDQUFDLENBQUM7QUFFOUMsUUFBRyxhQUFjLEVBQUMsQ0FBQztBQUduQixRQUFHLE9BQVEsRUFBQyxDQUFDO0dBR2QsQ0FBQztBQUVELE9BQUksa0JBQWtCLFVBQVUsRUFBSSxPQUFLLE9BQVEsQ0FBQyxLQUFJLGdCQUFnQixVQUFVLENBQUMsQ0FBQztBQUluRixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUM3cEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDakJBO0FBQ0EsbURBQWtELGNBQWMsa0JBQWtCLE1BQU0sT0FBTyxRQUFRLFNBQVMsU0FBUyxVQUFVLHFCQUFxQixzQ0FBc0Msd0JBQXdCLDJCQUEyQixjQUFjLGtCQUFrQixNQUFNLE9BQU8sUUFBUSxTQUFTLFNBQVMsVUFBVSxxQkFBcUIsUTs7Ozs7O0FDRHZWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0EsbUJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7QUFDQSxTQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0Esa0JBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBLGlDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUEyRDtBQUMzRCxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJhNWZiMjU0ZTk1ZTI0Yjk1YzNiXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvQ1NTM0RSZW5kZXJlci5qcycsXG5cdCcuL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanMnLFxuXHQnLi9wLXRocmVlLWQuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBUSFJFRSwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGVzdCBmb3IgYnJvd3NlciAzRCBzdXBwb3J0XG5cdC8vXG5cdGZ1bmN0aW9uIGJyb3dzZXJTdXBwb3J0KCkge1xuXHRcdHZhciBjYW52YXM7XG5cdFx0dHJ5IHtcblx0XHRcdGNhbnZhcyA9ICQoJzxjYW52YXM+Jyk7XG5cdFx0XHRyZXR1cm4gISEoY2FudmFzWzBdLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzWzBdLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpKTtcblx0XHR9IGNhdGNoIChfXykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRjYW52YXMgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0Ly9cblx0Ly8gY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIHRlc3RpbmcgZXF1YWxpdHkgb2Ygc2l6ZSBvYmplY3RzXG5cdC8vXG5cdGZ1bmN0aW9uIHNpemVFcXVhbChzaXplQSwgc2l6ZUIpIHtcblx0XHRyZXR1cm4gc2l6ZUEgJiYgc2l6ZUIgJiYgc2l6ZUEud2lkdGggPT09IHNpemVCLndpZHRoICYmIHNpemVBLmhlaWdodCA9PT0gc2l6ZUIuaGVpZ2h0O1xuXHR9XG5cblx0Ly9cblx0Ly8gc29tZSB1c2VmdWwgY29uc3RhbnRzIGZvciBtYWtpbmcgaW50ZXJzZWN0aW9uIGNoZWNrc1xuXHQvL1xuXHR2YXIgUExBTkUgPSBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIDApO1xuXHR2YXIgUFJPSkVDVE9SID0gbmV3IFRIUkVFLlByb2plY3RvcigpO1xuXG5cdC8vXG5cdC8vIHRoZSBwbHVnaW5cblx0Ly9cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQnLFxuXHRcdHJlcXVpcmVzOiBbJ3Bvc2l0aW9uLXRyYWNraW5nJ11cblx0fSkubW9kaWZ5KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlJyk7XG5cblx0Ly9cblx0Ly8gdGhlIGNvbnN0cnVjdG9yIGlzIHJ1biBvbmNlIHRvIGluaXRpYWxpemUgcG90ZW50aWFsIDNELW5lc3Ncblx0Ly9cblx0cGx1Z2luLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIHRlc3QgZm9yIGJyb3dzZXIgc3VwcG9ydFxuXHRcdC8vXG5cdFx0aWYgKCFicm93c2VyU3VwcG9ydCgpKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzZWVtIHRvIGhhdmUgV2ViR0wgc3VwcG9ydC5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIHRoZSAndGhyZWVEQ2FudmFzRWxlbWVudCcgcHJvcGVydHlcblx0XHQvL1xuXHRcdFUub2JzZXJ2YWJsZSh0aGlzLCB7IG5hbWU6ICd0aHJlZURDYW52YXNFbGVtZW50JyB9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNFbGVtZW50JywgKG5ld0NhbnZhcywgb2xkQ2FudmFzKSA9PiB7XG5cdFx0XHRpZiAob2xkQ2FudmFzKSB7IG9sZENhbnZhcy5yZW1vdmVDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0XHRpZiAobmV3Q2FudmFzKSB7IG5ld0NhbnZhcy5hZGRDbGFzcygndGhyZWUtZC1jYW52YXMnKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyB0aGUgJ3RocmVlRE1vZGUnIHByb3BlcnR5XG5cdFx0Ly9cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3RocmVlRE1vZGUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiAhIXRoaXMudGhyZWVEQ2FudmFzRWxlbWVudCB9LFxuXHRcdFx0c2V0KG5ld1RocmVlRE1vZGUpIHtcblx0XHRcdFx0aWYgKCEhbmV3VGhyZWVETW9kZSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgdHVybiBvbiAzRCBtb2RlIHRocm91Z2ggdGhlICd0aHJlZURNb2RlJyBwcm9wZXJ0eS4gRG8gc28gYnkgc2V0dGluZyB0aGUgJ3RocmVlRENhbnZhc0VsZW1lbnQnLlwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzRWxlbWVudCcsIChuZXdDYW52YXMsIG9sZENhbnZhcykgPT4ge1xuXHRcdFx0aWYgKG5ld0NhbnZhcyB8fCBvbGRDYW52YXMpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCd0aHJlZURNb2RlJywgISFuZXdDYW52YXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gVGhlICd0aHJlZURDYW52YXNTaXplJyBwcm9wZXJ0eVxuXHRcdC8vXG5cdFx0dmFyIF9jYW52YXNTaXplID0gVS5jYWNoZWQoe1xuXHRcdFx0cmV0cmlldmU6ICgpID0+ICh0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgJiYge1xuXHRcdFx0XHR3aWR0aDogdGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKCksXG5cdFx0XHRcdGhlaWdodDogdGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpXG5cdFx0XHR9KSxcblx0XHRcdGlzRXF1YWw6IHNpemVFcXVhbFxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGhyZWVEQ2FudmFzU2l6ZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIF9jYW52YXNTaXplKCkgfVxuXHRcdH0pO1xuXHRcdF9jYW52YXNTaXplLm9uQ2hhbmdlKChuZXdTaXplKSA9PiB7IHRoaXMudHJpZ2dlcigndGhyZWVEQ2FudmFzU2l6ZScsIG5ld1NpemUpIH0pO1xuXG5cdFx0Ly8gcmVhY3QgdG8gY2FudmFzIHJlc2l6ZVxuXHRcdCh0aGlzLm9wdGlvbnMuY2FudmFzUmVzaXplRXZlbnQgfHwgdGhpcy5vcHRpb25zLnJlc2l6ZUV2ZW50IHx8ICQod2luZG93KS5yZXNpemUpKF9jYW52YXNTaXplKTtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyB0aGUgJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcgcHJvcGVydHlcblx0XHQvL1xuXHRcdFUub2JzZXJ2YWJsZSh0aGlzLCB7IG5hbWU6ICd0aHJlZURDb250cm9sc0VuYWJsZWQnIH0pO1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIEluaXRpYWxpemUgd2hlbiAzRCBtb2RlIGlzIHR1cm5lZCBvblxuXHRcdC8vXG5cdFx0dGhpcy5vbigndGhyZWVETW9kZScsIChtb2RlKSA9PiB7XG5cdFx0XHRpZiAobW9kZSkgeyB0aGlzLl9wX3RocmVlRF9pbml0aWFsaXplKCkgfVxuXHRcdH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gV2FzIGEgY2FudmFzIGdpdmVuIHRocm91Z2ggdGhlIG9wdGlvbnM/XG5cdFx0Ly9cblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgPSB0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudDtcblxuXHR9KTtcblxuXHQvL1xuXHQvLyBgX3BfdGhyZWVEX2luaXRpYWxpemVgIGlzIHJ1biBldmVyeSB0aW1lIDNELW5lc3MgaXMgdHVybmVkIG9uXG5cdC8vXG5cdHBsdWdpbi5hZGQoJ19wX3RocmVlRF9pbml0aWFsaXplJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIERldGVybWluZSBpbml0aWFsIGNpcmN1aXRib2FyZCBwb3NpdGlvbmluZyBpbnNpZGUgdGhlIGNhbnZhc1xuXHRcdC8vXG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbiA9IHt9O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ubGVmdCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS5sZWZ0IC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLmxlZnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3AgPSB0aGlzLmVsZW1lbnQub2Zmc2V0KCkudG9wIC0gdGhpcy50aHJlZURDYW52YXNFbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0ID0gdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC0gdGhpcy5zaXplLndpZHRoIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tID0gdGhpcy50aHJlZURDYW52YXNTaXplLmhlaWdodCAtIHRoaXMuc2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcDtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIFNjZW5lXG5cdFx0Ly9cblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gQ2FtZXJhXG5cdFx0Ly9cblx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEgPVxuXHRcdFx0XHRuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQsIDEsIDEwMDAwKTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgKHNpemUpID0+IHsgdGhpcy5fcF90aHJlZURfY2FtZXJhLmFzcGVjdCA9IHNpemUud2lkdGggLyBzaXplLmhlaWdodCB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24ueiA9IDE7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBMaWdodGluZ1xuXHRcdC8vXG5cdFx0dmFyIGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHgxMDEwMzApO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXHRcdC8vXG5cdFx0dmFyIGRpcmVjdGlvbmFsTGlnaHQxID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmVlZGQpO1xuXHRcdGRpcmVjdGlvbmFsTGlnaHQxLnBvc2l0aW9uLnNldCgxLCAtMSwgMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQxKTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MiA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0Mi5wb3NpdGlvbi5zZXQoLTEsIDEsIC0xKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoZGlyZWN0aW9uYWxMaWdodDIpO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gUmVuZGVyZXI6IFdlYkdMXG5cdFx0Ly9cblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbCA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYWxwaGE6IHRydWUsIGFudGlhbGlhczogdHJ1ZSB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5zb3J0T2JqZWN0cyA9IGZhbHNlO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnNldFNpemUodGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKCksIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLl9wX3RocmVlRF9jYW1lcmEpO1xuXHRcdH0pO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCAoc2l6ZSkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdFx0fSk7XG5cdFx0Ly9cblx0XHQvLyBSZW5kZXJlcjogQ1NTXG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzID0gbmV3IFRIUkVFLkNTUzNEUmVuZGVyZXIoKTtcblx0XHQkKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5kb21FbGVtZW50KS5hcHBlbmQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuZG9tRWxlbWVudCk7XG5cdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmFwcGVuZCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MuZG9tRWxlbWVudCk7XG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLnNldFNpemUodGhpcy50aHJlZURDYW52YXNFbGVtZW50LndpZHRoKCksIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC5oZWlnaHQoKSk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLnJlbmRlcih0aGlzLl9wX3RocmVlRF9zY2VuZSwgdGhpcy5fcF90aHJlZURfY2FtZXJhKTtcblx0XHR9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJywgKHNpemUpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblx0XHR9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIFJlbmRlciBvbiBzaXplLWNoYW5nZSBhbmQgZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly9cblx0XHR0aGlzLm9uKCdzaXplJywgKCkgPT4geyB0aGlzLnRyaWdnZXIoJzNkLXJlbmRlcicpIH0pO1xuXHRcdFUuZWFjaEFuaW1hdGlvbkZyYW1lKCgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIENvbnRyb2xzXG5cdFx0Ly9cblx0XHR0aGlzLl9wX3RocmVlRF9jb250cm9scyA9IG5ldyBUSFJFRS5UcmFja2JhbGxDb250cm9scyh0aGlzLl9wX3RocmVlRF9jYW1lcmEsIHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudFswXSk7XG5cdFx0JC5leHRlbmQodGhpcy5fcF90aHJlZURfY29udHJvbHMsIHtcblx0XHRcdHJvdGF0ZVNwZWVkOiAxLjAsXG5cdFx0XHR6b29tU3BlZWQ6IDEuMixcblx0XHRcdHBhblNwZWVkOiAwLjgsXG5cdFx0XHRub1pvb206IGZhbHNlLFxuXHRcdFx0bm9QYW46IGZhbHNlLFxuXHRcdFx0c3RhdGljTW92aW5nOiB0cnVlLFxuXHRcdFx0ZHluYW1pY0RhbXBpbmdGYWN0b3I6IDAuMyxcblx0XHRcdGtleXM6IFs2NSwgODMsIDY4XVxuXHRcdH0pO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblx0XHR0aGlzLm9uKCdzaXplJywgKCkgPT4geyB0aGlzLl9wX3RocmVlRF9jb250cm9scy5oYW5kbGVSZXNpemUoKSB9KTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInLCAoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnVwZGF0ZSgpIH0pO1xuXHRcdHRoaXMub24oJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcsIChlbmFibGVkKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLmVuYWJsZWQgPSBlbmFibGVkIH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gRmxvYXRpbmcgVGlsZW1hcFxuXHRcdC8vXG5cdFx0dmFyIGZsYXRDaXJjdWl0Qm9hcmRFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuXHRcdHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZCA9IG5ldyBUSFJFRS5DU1MzRE9iamVjdChmbGF0Q2lyY3VpdEJvYXJkRWxlbWVudFswXSk7XG5cdFx0ZmxhdENpcmN1aXRCb2FyZEVsZW1lbnQuY3NzKHsgbGVmdDogMCwgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAwIH0pOyAvLyBUT0RPOiBzYXZlIGFuZCByZXN0b3JlIGxhdGVyXG5cdFx0ZmxhdENpcmN1aXRCb2FyZEVsZW1lbnQuY3NzKCdiYWNrZmFjZVZpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZCk7XG5cdFx0Ly9cblx0XHQvLyBUaWxlbWFwIEJhY2tmYWNlXG5cdFx0dmFyIGJhY2tmYWNlRWxlbWVudCA9ICQoJzxkaXY+JykuY3NzKHtcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0Ym9yZGVyOiAnc29saWQgMXB4IGJsYWNrJyxcblx0XHRcdGJhY2tmYWNlVmlzaWJpbGl0eTogJ2hpZGRlbidcblx0XHR9KTtcblx0XHR2YXIgYmFja2ZhY2UgPSBuZXcgVEhSRUUuQ1NTM0RPYmplY3QoYmFja2ZhY2VFbGVtZW50WzBdKTtcblx0XHRiYWNrZmFjZS5yb3RhdGlvbi5zZXQoTWF0aC5QSSwgMCwgMCk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGJhY2tmYWNlKTtcblx0XHQvL1xuXHRcdC8vIHJlc3BvbmQgdG8gcmVzaXplXG5cdFx0dmFyIG9uQ2FudmFzUmVzaXplID0gKCkgPT4ge1xuXHRcdFx0Ly8gc2l6aW5nIGFuZCBwb3NpdGlvbmluZyBvZiB0aGUgY2lyY3VpdC1ib2FyZCBhbmQgYmFja2ZhY2Vcblx0XHRcdHZhciBzaXplID0ge1xuXHRcdFx0XHR3aWR0aDogdGhpcy50aHJlZURDYW52YXNTaXplLndpZHRoIC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi50b3AgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbVxuXHRcdFx0fTtcblx0XHRcdGZsYXRDaXJjdWl0Qm9hcmRFbGVtZW50LmNzcyhzaXplKTtcblx0XHRcdGJhY2tmYWNlRWxlbWVudC5jc3Moc2l6ZSk7XG5cdFx0XHRiYWNrZmFjZS5wb3NpdGlvbi54ID0gdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkLnBvc2l0aW9uLnggPSAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCk7XG5cdFx0XHRiYWNrZmFjZS5wb3NpdGlvbi55ID0gdGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkLnBvc2l0aW9uLnkgPSAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCk7XG5cblx0XHRcdC8vIHNldCB0aGUgY2FtZXJhIGRpc3RhbmNlIHRvIGNvcnJlc3BvbmRcblx0XHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnNldENhbWVyYURpc3RhbmNlKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgL1xuXHRcdFx0XHRcdCgyICogTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZCh0aGlzLl9wX3RocmVlRF9jYW1lcmEuZm92KSAvIDIpKVxuXHRcdFx0KTtcblx0XHR9O1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnLCBvbkNhbnZhc1Jlc2l6ZSk7XG5cdFx0b25DYW52YXNSZXNpemUoKTtcblxuXHR9KTtcblxuXHQvL1xuXHQvLyBgdHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmRgIGhhcyBubyBzaWRlLWVmZmVjdHMgYW5kIGNhbiBiZSB1c2VkXG5cdC8vIGZyb20gdGhlIG91dHNpZGUgdG8gdHJhbnNsYXRlIGxlZnQvdG9wIGNvb3JkaW5hdGVzIG9uIHRoZSBzY3JlZW4gdG8gbGVmdC90b3Bcblx0Ly8gY29vcmRpbmF0ZXMgb2YgdGhlIHByaXZhdGUgY29vcmRpbmF0ZS1zeXN0ZW0gb2YgdGhlIGNpcmN1aXRib2FyZCwgaG93ZXZlciBpdCBpc1xuXHQvLyBvcmllbnRlZCBpbiAzRCBzcGFjZS5cblx0Ly9cblx0cGx1Z2luLmFkZCgndHJhbnNsYXRlUG9zaXRpb25Gcm9tQ2FudmFzVG9DaXJjdWl0Ym9hcmQnLCBmdW5jdGlvbiAocG9zaXRpb25PbkNhbnZhcykge1xuXG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG5cdFx0dGhpcy5fcF90aHJlZURfY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdHZhciBtb3VzZTNEID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRtb3VzZTNELnggPSBwb3NpdGlvbk9uQ2FudmFzLmxlZnQgLyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggKiAyIC0gMTtcblx0XHRtb3VzZTNELnkgPSAtcG9zaXRpb25PbkNhbnZhcy50b3AgLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0ICogMiArIDE7XG5cdFx0bW91c2UzRC56ID0gMC41O1xuXHRcdFBST0pFQ1RPUi51bnByb2plY3RWZWN0b3IobW91c2UzRCwgdGhpcy5fcF90aHJlZURfY2FtZXJhKTtcblx0XHR2YXIgcmF5ID0gbmV3IFRIUkVFLlJheSh0aGlzLl9wX3RocmVlRF9jYW1lcmEucG9zaXRpb24sIG1vdXNlM0Quc3ViKHRoaXMuX3BfdGhyZWVEX2NhbWVyYS5wb3NpdGlvbikubm9ybWFsaXplKCkpO1xuXHRcdHZhciBpbnRlcnNlY3RzID0gcmF5LmludGVyc2VjdFBsYW5lKFBMQU5FKTtcblxuXHRcdC8vIGlmIHRoZSB0ZXN0ZWQgaW50ZXJzZWN0aW9uIGlzIG91dCBvZiByYW5nZSwgcmV0dXJuIHVuZGVmaW5lZFxuXHRcdGlmICghaW50ZXJzZWN0cykgeyByZXR1cm4gfVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGxlZnQ6IGludGVyc2VjdHMueCArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQsXG5cdFx0XHR0b3A6IC1pbnRlcnNlY3RzLnkgKyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC8gMiAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wXG5cdFx0fTtcblxuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGhyZWUtZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdC8vXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0Ly9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0Ly9cblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uIChUSFJFRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGh0dHA6Ly93d3cuZW1hZ2l4Lm5ldC9hY2FkZW1pYy9tc2NzLXByb2plY3QvaXRlbS9jYW1lcmEtc3luYy13aXRoLWNzczMtYW5kLXdlYmdsLXRocmVlanNcblx0ICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cblx0ICovXG5cblx0VEhSRUUuQ1NTM0RPYmplY3QgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5PYmplY3QzRC5jYWxsKCB0aGlzICk7XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdyZW1vdmVkJywgZnVuY3Rpb24gKCAvKmV2ZW50Ki8gKSB7XG5cblx0XHRcdGlmICggdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUgKTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZSA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLkNTUzNET2JqZWN0LmNhbGwoIHRoaXMsIGVsZW1lbnQgKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSApO1xuXG5cdC8vXG5cblx0VEhSRUUuQ1NTM0RSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUubG9nKCAnVEhSRUUuQ1NTM0RSZW5kZXJlcicsIFRIUkVFLlJFVklTSU9OICk7XG5cblx0XHR2YXIgX3dpZHRoLCBfaGVpZ2h0O1xuXHRcdHZhciBfd2lkdGhIYWxmLCBfaGVpZ2h0SGFsZjtcblxuXHRcdHZhciBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0dmFyIGNhY2hlID0ge1xuXHRcdFx0Y2FtZXJhOiB7IGZvdjogMCwgc3R5bGU6ICcnIH0sXG5cdFx0XHRvYmplY3RzOiB7fVxuXHRcdH07XG5cblx0XHR2YXIgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblxuXHRcdHZhciBjYW1lcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuXHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGNhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdGRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNhbWVyYUVsZW1lbnQgKTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRcdF93aWR0aCA9IHdpZHRoO1xuXHRcdFx0X2hlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0X3dpZHRoSGFsZiA9IF93aWR0aCAvIDI7XG5cdFx0XHRfaGVpZ2h0SGFsZiA9IF9oZWlnaHQgLyAyO1xuXG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0fTtcblxuXHRcdHZhciBlcHNpbG9uID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldENhbWVyYUNTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAnbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0T2JqZWN0Q1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICd0cmFuc2xhdGUzZCgtNTAlLC01MCUsMCkgbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgcmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKCBvYmplY3QsIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRE9iamVjdCApIHtcblxuXHRcdFx0XHR2YXIgc3R5bGU7XG5cblx0XHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRFNwcml0ZSApIHtcblxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9zd2lmdGNvZGVyLndvcmRwcmVzcy5jb20vMjAwOC8xMS8yNS9jb25zdHJ1Y3RpbmctYS1iaWxsYm9hcmQtbWF0cml4L1xuXG5cdFx0XHRcdFx0bWF0cml4LmNvcHkoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcblx0XHRcdFx0XHRtYXRyaXgudHJhbnNwb3NlKCk7XG5cdFx0XHRcdFx0bWF0cml4LmNvcHlQb3NpdGlvbiggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cdFx0XHRcdFx0bWF0cml4LnNjYWxlKCBvYmplY3Quc2NhbGUgKTtcblxuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDcgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMSBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDE1IF0gPSAxO1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZWxlbWVudCA9IG9iamVjdC5lbGVtZW50O1xuXHRcdFx0XHR2YXIgY2FjaGVkU3R5bGUgPSBjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXTtcblxuXHRcdFx0XHRpZiAoIGNhY2hlZFN0eWxlID09PSB1bmRlZmluZWQgfHwgY2FjaGVkU3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0XHRjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXSA9IHN0eWxlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY2FtZXJhRWxlbWVudCApIHtcblxuXHRcdFx0XHRcdGNhbWVyYUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRcdFx0cmVuZGVyT2JqZWN0KCBvYmplY3QuY2hpbGRyZW5bIGkgXSwgY2FtZXJhICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdFx0dmFyIGZvdiA9IDAuNSAvIE1hdGgudGFuKCBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBjYW1lcmEuZm92ICogMC41ICkgKSAqIF9oZWlnaHQ7XG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLmZvdiAhPT0gZm92ICkge1xuXG5cdFx0XHRcdGRvbUVsZW1lbnQuc3R5bGUuV2Via2l0UGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdGRvbUVsZW1lbnQuc3R5bGUuTW96UGVyc3BlY3RpdmUgPSBmb3YgKyBcInB4XCI7XG5cdFx0XHRcdGRvbUVsZW1lbnQuc3R5bGUub1BlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5mb3YgPSBmb3Y7XG5cblx0XHRcdH1cblxuXHRcdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0aWYgKCBjYW1lcmEucGFyZW50ID09PSB1bmRlZmluZWQgKSB7IGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpIH1cblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZS5nZXRJbnZlcnNlKCBjYW1lcmEubWF0cml4V29ybGQgKTtcblxuXHRcdFx0dmFyIHN0eWxlID0gXCJ0cmFuc2xhdGUzZCgwLDAsXCIgKyBmb3YgKyBcInB4KVwiICsgZ2V0Q2FtZXJhQ1NTTWF0cml4KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICkgK1xuXHRcdFx0XHRcIiB0cmFuc2xhdGUzZChcIiArIF93aWR0aEhhbGYgKyBcInB4LFwiICsgX2hlaWdodEhhbGYgKyBcInB4LCAwKVwiO1xuXG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLnN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuc3R5bGUgPSBzdHlsZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJPYmplY3QoIHNjZW5lLCBjYW1lcmEgKTtcblxuXHRcdH07XG5cblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL0NTUzNEUmVuZGVyZXIuanNcbiAqKi8iLCJkZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cblxuXHQvKipcblx0ICogQGF1dGhvciBFYmVyaGFyZCBHcmFldGhlciAvIGh0dHA6Ly9lZ3JhZXRoZXIuY29tL1xuXHQgKiBAYXV0aG9yIE1hcmsgTHVuZGluICAgIC8gaHR0cDovL21hcmstbHVuZGluLmNvbVxuXHQgKi9cblxuXHRUSFJFRS5UcmFja2JhbGxDb250cm9scyA9IGZ1bmN0aW9uIChvYmplY3QsIGRvbUVsZW1lbnQpIHtcblxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dmFyIFNUQVRFID0geyBOT05FOiAtMSwgUk9UQVRFOiAwLCBaT09NOiAxLCBQQU46IDIsIFRPVUNIX1JPVEFURTogMywgVE9VQ0hfWk9PTV9QQU46IDQgfTtcblxuXHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHRcdHRoaXMuZG9tRWxlbWVudCA9ICggZG9tRWxlbWVudCAhPT0gdW5kZWZpbmVkICkgPyBkb21FbGVtZW50IDogZG9jdW1lbnQ7XG5cblx0XHQvLyBBUElcblxuXHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cblx0XHR0aGlzLnNjcmVlbiA9IHsgbGVmdDogMCwgdG9wOiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XG5cblx0XHR0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xuXHRcdHRoaXMuem9vbVNwZWVkID0gMS4yO1xuXHRcdHRoaXMucGFuU3BlZWQgPSAwLjM7XG5cblx0XHR0aGlzLm5vUm90YXRlID0gZmFsc2U7XG5cdFx0dGhpcy5ub1pvb20gPSBmYWxzZTtcblx0XHR0aGlzLm5vUGFuID0gZmFsc2U7XG5cdFx0dGhpcy5ub1JvbGwgPSBmYWxzZTtcblxuXHRcdHRoaXMuc3RhdGljTW92aW5nID0gZmFsc2U7XG5cdFx0dGhpcy5keW5hbWljRGFtcGluZ0ZhY3RvciA9IDAuMjtcblxuXHRcdHRoaXMubWluRGlzdGFuY2UgPSAwO1xuXHRcdHRoaXMubWF4RGlzdGFuY2UgPSBJbmZpbml0eTtcblxuXHRcdHRoaXMua2V5cyA9IFsgNjUgLypBKi8sIDgzIC8qUyovLCA2OCAvKkQqLyBdO1xuXG5cdFx0Ly8gaW50ZXJuYWxzXG5cblx0XHR0aGlzLnRhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cblx0XHR2YXIgbGFzdFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHZhciBfc3RhdGUgPSBTVEFURS5OT05FLFxuXHRcdFx0X3ByZXZTdGF0ZSA9IFNUQVRFLk5PTkUsXG5cblx0XHRcdF9leWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXG5cdFx0XHRfcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0X3JvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cblx0XHRcdF96b29tU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0X3pvb21FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXG5cdFx0XHRfdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IDAsXG5cdFx0XHRfdG91Y2hab29tRGlzdGFuY2VFbmQgPSAwLFxuXG5cdFx0XHRfcGFuU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0X3BhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHQvLyBmb3IgcmVzZXRcblxuXHRcdHRoaXMudGFyZ2V0MCA9IHRoaXMudGFyZ2V0LmNsb25lKCk7XG5cdFx0dGhpcy5wb3NpdGlvbjAgPSB0aGlzLm9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdHRoaXMudXAwID0gdGhpcy5vYmplY3QudXAuY2xvbmUoKTtcblxuXHRcdC8vIGV2ZW50c1xuXG5cdFx0dmFyIGNoYW5nZUV2ZW50ID0geyB0eXBlOiAnY2hhbmdlJyB9O1xuXHRcdHZhciBzdGFydEV2ZW50ID0geyB0eXBlOiAnc3RhcnQnfTtcblx0XHR2YXIgZW5kRXZlbnQgPSB7IHR5cGU6ICdlbmQnfTtcblxuXG5cdFx0Ly8gbWV0aG9kc1xuXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmICh0aGlzLmRvbUVsZW1lbnQgPT09IGRvY3VtZW50KSB7XG5cblx0XHRcdFx0dGhpcy5zY3JlZW4ubGVmdCA9IDA7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLnRvcCA9IDA7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR2YXIgYm94ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHQvLyBhZGp1c3RtZW50cyBjb21lIGZyb20gc2ltaWxhciBjb2RlIGluIHRoZSBqcXVlcnkgb2Zmc2V0KCkgZnVuY3Rpb25cblx0XHRcdFx0dmFyIGQgPSB0aGlzLmRvbUVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHRcdHRoaXMuc2NyZWVuLmxlZnQgPSBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGQuY2xpZW50TGVmdDtcblx0XHRcdFx0dGhpcy5zY3JlZW4udG9wID0gYm94LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGQuY2xpZW50VG9wO1xuXHRcdFx0XHR0aGlzLnNjcmVlbi53aWR0aCA9IGJveC53aWR0aDtcblx0XHRcdFx0dGhpcy5zY3JlZW4uaGVpZ2h0ID0gYm94LmhlaWdodDtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzWyBldmVudC50eXBlIF0gPT0gJ2Z1bmN0aW9uJykge1xuXG5cdFx0XHRcdHRoaXNbIGV2ZW50LnR5cGUgXShldmVudCk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0TW91c2VPblNjcmVlbiA9ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChwYWdlWCwgcGFnZVkpIHtcblxuXHRcdFx0XHR2ZWN0b3Iuc2V0KFxuXHRcdFx0XHRcdFx0KCBwYWdlWCAtIF90aGlzLnNjcmVlbi5sZWZ0ICkgLyBfdGhpcy5zY3JlZW4ud2lkdGgsXG5cdFx0XHRcdFx0XHQoIHBhZ2VZIC0gX3RoaXMuc2NyZWVuLnRvcCApIC8gX3RoaXMuc2NyZWVuLmhlaWdodFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHJldHVybiB2ZWN0b3I7XG5cblx0XHRcdH07XG5cblx0XHR9KCkgKTtcblxuXHRcdHZhciBnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwgPSAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHR2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0dmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChwYWdlWCwgcGFnZVkpIHtcblxuXHRcdFx0XHRtb3VzZU9uQmFsbC5zZXQoXG5cdFx0XHRcdFx0XHQoIHBhZ2VYIC0gX3RoaXMuc2NyZWVuLndpZHRoICogMC41IC0gX3RoaXMuc2NyZWVuLmxlZnQgKSAvIChfdGhpcy5zY3JlZW4ud2lkdGggKiAuNSksXG5cdFx0XHRcdFx0XHQoIF90aGlzLnNjcmVlbi5oZWlnaHQgKiAwLjUgKyBfdGhpcy5zY3JlZW4udG9wIC0gcGFnZVkgKSAvIChfdGhpcy5zY3JlZW4uaGVpZ2h0ICogLjUpLFxuXHRcdFx0XHRcdDAuMFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHZhciBsZW5ndGggPSBtb3VzZU9uQmFsbC5sZW5ndGgoKTtcblxuXHRcdFx0XHRpZiAoX3RoaXMubm9Sb2xsKSB7XG5cblx0XHRcdFx0XHRpZiAobGVuZ3RoIDwgTWF0aC5TUVJUMV8yKSB7XG5cblx0XHRcdFx0XHRcdG1vdXNlT25CYWxsLnogPSBNYXRoLnNxcnQoMS4wIC0gbGVuZ3RoICogbGVuZ3RoKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdG1vdXNlT25CYWxsLnogPSAuNSAvIGxlbmd0aDtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2UgaWYgKGxlbmd0aCA+IDEuMCkge1xuXG5cdFx0XHRcdFx0bW91c2VPbkJhbGwubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdG1vdXNlT25CYWxsLnogPSBNYXRoLnNxcnQoMS4wIC0gbGVuZ3RoICogbGVuZ3RoKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0X2V5ZS5jb3B5KF90aGlzLm9iamVjdC5wb3NpdGlvbikuc3ViKF90aGlzLnRhcmdldCk7XG5cblx0XHRcdFx0dmVjdG9yLmNvcHkoX3RoaXMub2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueSk7XG5cdFx0XHRcdHZlY3Rvci5hZGQob2JqZWN0VXAuY29weShfdGhpcy5vYmplY3QudXApLmNyb3NzKF9leWUpLnNldExlbmd0aChtb3VzZU9uQmFsbC54KSk7XG5cdFx0XHRcdHZlY3Rvci5hZGQoX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuXG5cdFx0XHRcdHJldHVybiB2ZWN0b3I7XG5cblx0XHRcdH07XG5cblx0XHR9KCkgKTtcblxuXHRcdHRoaXMucm90YXRlQ2FtZXJhID0gKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0XHRxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciBhbmdsZSA9IE1hdGguYWNvcyhfcm90YXRlU3RhcnQuZG90KF9yb3RhdGVFbmQpIC8gX3JvdGF0ZVN0YXJ0Lmxlbmd0aCgpIC8gX3JvdGF0ZUVuZC5sZW5ndGgoKSk7XG5cblx0XHRcdFx0aWYgKGFuZ2xlKSB7XG5cblx0XHRcdFx0XHRheGlzLmNyb3NzVmVjdG9ycyhfcm90YXRlU3RhcnQsIF9yb3RhdGVFbmQpLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdFx0YW5nbGUgKj0gX3RoaXMucm90YXRlU3BlZWQ7XG5cblx0XHRcdFx0XHRxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoYXhpcywgLWFuZ2xlKTtcblxuXHRcdFx0XHRcdF9leWUuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdF90aGlzLm9iamVjdC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRfcm90YXRlRW5kLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblxuXHRcdFx0XHRcdGlmIChfdGhpcy5zdGF0aWNNb3ZpbmcpIHtcblxuXHRcdFx0XHRcdFx0X3JvdGF0ZVN0YXJ0LmNvcHkoX3JvdGF0ZUVuZCk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoYXhpcywgYW5nbGUgKiAoIF90aGlzLmR5bmFtaWNEYW1waW5nRmFjdG9yIC0gMS4wICkpO1xuXHRcdFx0XHRcdFx0X3JvdGF0ZVN0YXJ0LmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9KCkpO1xuXG5cdFx0dGhpcy56b29tQ2FtZXJhID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAoX3N0YXRlID09PSBTVEFURS5UT1VDSF9aT09NX1BBTikge1xuXG5cdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTRHVwbGljYXRlZERlY2xhcmF0aW9uXG5cdFx0XHRcdHZhciBmYWN0b3IgPSBfdG91Y2hab29tRGlzdGFuY2VTdGFydCAvIF90b3VjaFpvb21EaXN0YW5jZUVuZDtcblx0XHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSBfdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdF9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU0R1cGxpY2F0ZWREZWNsYXJhdGlvblxuXHRcdFx0XHR2YXIgZmFjdG9yID0gMS4wICsgKCBfem9vbUVuZC55IC0gX3pvb21TdGFydC55ICkgKiBfdGhpcy56b29tU3BlZWQ7XG5cblx0XHRcdFx0aWYgKGZhY3RvciAhPT0gMS4wICYmIGZhY3RvciA+IDAuMCkge1xuXG5cdFx0XHRcdFx0X2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXG5cdFx0XHRcdFx0aWYgKF90aGlzLnN0YXRpY01vdmluZykge1xuXG5cdFx0XHRcdFx0XHRfem9vbVN0YXJ0LmNvcHkoX3pvb21FbmQpO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0X3pvb21TdGFydC55ICs9ICggX3pvb21FbmQueSAtIF96b29tU3RhcnQueSApICogdGhpcy5keW5hbWljRGFtcGluZ0ZhY3RvcjtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLnBhbkNhbWVyYSA9IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBtb3VzZUNoYW5nZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdFx0cGFuID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRtb3VzZUNoYW5nZS5jb3B5KF9wYW5FbmQpLnN1YihfcGFuU3RhcnQpO1xuXG5cdFx0XHRcdGlmIChtb3VzZUNoYW5nZS5sZW5ndGhTcSgpKSB7XG5cblx0XHRcdFx0XHRtb3VzZUNoYW5nZS5tdWx0aXBseVNjYWxhcihfZXllLmxlbmd0aCgpICogX3RoaXMucGFuU3BlZWQpO1xuXG5cdFx0XHRcdFx0cGFuLmNvcHkoX2V5ZSkuY3Jvc3MoX3RoaXMub2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueCk7XG5cdFx0XHRcdFx0cGFuLmFkZChvYmplY3RVcC5jb3B5KF90aGlzLm9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLnkpKTtcblxuXHRcdFx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5hZGQocGFuKTtcblx0XHRcdFx0XHRfdGhpcy50YXJnZXQuYWRkKHBhbik7XG5cblx0XHRcdFx0XHRpZiAoX3RoaXMuc3RhdGljTW92aW5nKSB7XG5cblx0XHRcdFx0XHRcdF9wYW5TdGFydC5jb3B5KF9wYW5FbmQpO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0X3BhblN0YXJ0LmFkZChtb3VzZUNoYW5nZS5zdWJWZWN0b3JzKF9wYW5FbmQsIF9wYW5TdGFydCkubXVsdGlwbHlTY2FsYXIoX3RoaXMuZHluYW1pY0RhbXBpbmdGYWN0b3IpKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9KCkpO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8gQWRkZWQgZm9yIEFwaU5BVE9NWVxuXHRcdC8vXG5cdFx0dGhpcy5zZXRDYW1lcmFEaXN0YW5jZSA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuXHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcblx0XHR9O1xuXHRcdC8vLy8vL1xuXG5cblx0XHR0aGlzLmNoZWNrRGlzdGFuY2VzID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAoIV90aGlzLm5vWm9vbSB8fCAhX3RoaXMubm9QYW4pIHtcblxuXHRcdFx0XHRpZiAoX2V5ZS5sZW5ndGhTcSgpID4gX3RoaXMubWF4RGlzdGFuY2UgKiBfdGhpcy5tYXhEaXN0YW5jZSkge1xuXG5cdFx0XHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLmFkZFZlY3RvcnMoX3RoaXMudGFyZ2V0LCBfZXllLnNldExlbmd0aChfdGhpcy5tYXhEaXN0YW5jZSkpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX2V5ZS5sZW5ndGhTcSgpIDwgX3RoaXMubWluRGlzdGFuY2UgKiBfdGhpcy5taW5EaXN0YW5jZSkge1xuXG5cdFx0XHRcdFx0X3RoaXMub2JqZWN0LnBvc2l0aW9uLmFkZFZlY3RvcnMoX3RoaXMudGFyZ2V0LCBfZXllLnNldExlbmd0aChfdGhpcy5taW5EaXN0YW5jZSkpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRfZXllLnN1YlZlY3RvcnMoX3RoaXMub2JqZWN0LnBvc2l0aW9uLCBfdGhpcy50YXJnZXQpO1xuXG5cdFx0XHRpZiAoIV90aGlzLm5vUm90YXRlKSB7XG5cblx0XHRcdFx0X3RoaXMucm90YXRlQ2FtZXJhKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFfdGhpcy5ub1pvb20pIHtcblxuXHRcdFx0XHRfdGhpcy56b29tQ2FtZXJhKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFfdGhpcy5ub1Bhbikge1xuXG5cdFx0XHRcdF90aGlzLnBhbkNhbWVyYSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdF90aGlzLm9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKF90aGlzLnRhcmdldCwgX2V5ZSk7XG5cblx0XHRcdF90aGlzLmNoZWNrRGlzdGFuY2VzKCk7XG5cblx0XHRcdF90aGlzLm9iamVjdC5sb29rQXQoX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0aWYgKGxhc3RQb3NpdGlvbi5kaXN0YW5jZVRvU3F1YXJlZChfdGhpcy5vYmplY3QucG9zaXRpb24pID4gRVBTKSB7XG5cblx0XHRcdFx0X3RoaXMuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cblx0XHRcdFx0bGFzdFBvc2l0aW9uLmNvcHkoX3RoaXMub2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRfcHJldlN0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0X3RoaXMudGFyZ2V0LmNvcHkoX3RoaXMudGFyZ2V0MCk7XG5cdFx0XHRfdGhpcy5vYmplY3QucG9zaXRpb24uY29weShfdGhpcy5wb3NpdGlvbjApO1xuXHRcdFx0X3RoaXMub2JqZWN0LnVwLmNvcHkoX3RoaXMudXAwKTtcblxuXHRcdFx0X2V5ZS5zdWJWZWN0b3JzKF90aGlzLm9iamVjdC5wb3NpdGlvbiwgX3RoaXMudGFyZ2V0KTtcblxuXHRcdFx0X3RoaXMub2JqZWN0Lmxvb2tBdChfdGhpcy50YXJnZXQpO1xuXG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGNoYW5nZUV2ZW50KTtcblxuXHRcdFx0bGFzdFBvc2l0aW9uLmNvcHkoX3RoaXMub2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdH07XG5cblx0XHQvLyBsaXN0ZW5lcnNcblxuLy8gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvLyBhZGRlZCBmcm9tIGh0dHA6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy9qcy9jb250cm9scy9Qb2ludGVyTG9ja0NvbnRyb2xzLmpzIGZvciBBcGlOQVRPTVlcblx0XHR2YXIgX2FteV92ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHR2YXIgS0VZQk9BUkRfVkVMT0NJVFkgPSA1O1xuXG5cdFx0Ly8gYWRkZWQgZnJvbSBodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvanMvY29udHJvbHMvUG9pbnRlckxvY2tDb250cm9scy5qc1xuXHRcdGZ1bmN0aW9uIGtleWRvd24oIGV2ZW50ICkge1xuXG5cdFx0XHQvL25vaW5zcGVjdGlvbiBDb2ZmZWVTY3JpcHRTd2l0Y2hTdGF0ZW1lbnRXaXRoTm9EZWZhdWx0QnJhbmNoXG5cdFx0XHRzd2l0Y2ggKCBldmVudC5rZXlDb2RlICkge1xuXG5cdFx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdGNhc2UgODc6IC8vIHdcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnkgPSBLRVlCT0FSRF9WRUxPQ0lUWTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM3OiAvLyBsZWZ0XG5cdFx0XHRcdGNhc2UgNjU6IC8vIGFcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnggPSAtS0VZQk9BUkRfVkVMT0NJVFk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSA0MDogLy8gZG93blxuXHRcdFx0XHRjYXNlIDgzOiAvLyBzXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS55ID0gLUtFWUJPQVJEX1ZFTE9DSVRZO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMzk6IC8vIHJpZ2h0XG5cdFx0XHRcdGNhc2UgNjg6IC8vIGRcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnggPSBLRVlCT0FSRF9WRUxPQ0lUWTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0Ly8gYWRkZWQgZnJvbSBodHRwOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvanMvY29udHJvbHMvUG9pbnRlckxvY2tDb250cm9scy5qc1xuXHRcdGZ1bmN0aW9uIGtleXVwKCBldmVudCApIHtcblxuXHRcdFx0Ly9ub2luc3BlY3Rpb24gQ29mZmVlU2NyaXB0U3dpdGNoU3RhdGVtZW50V2l0aE5vRGVmYXVsdEJyYW5jaFxuXHRcdFx0c3dpdGNoKCBldmVudC5rZXlDb2RlICkge1xuXG5cdFx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdGNhc2UgODc6IC8vIHdcblx0XHRcdFx0XHRfYW15X3ZlbG9jaXR5LnkgPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMzc6IC8vIGxlZnRcblx0XHRcdFx0Y2FzZSA2NTogLy8gYVxuXHRcdFx0XHRcdF9hbXlfdmVsb2NpdHkueCA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSA0MDogLy8gZG93blxuXHRcdFx0XHRjYXNlIDgzOiAvLyBzXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS55ID0gMDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM5OiAvLyByaWdodFxuXHRcdFx0XHRjYXNlIDY4OiAvLyBkXG5cdFx0XHRcdFx0X2FteV92ZWxvY2l0eS54ID0gMDtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdC8vICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdGZ1bmN0aW9uIG1vdXNlZG93bihldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0Ly9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0aWYgKF9zdGF0ZSA9PT0gU1RBVEUuTk9ORSkge1xuXG5cdFx0XHRcdF9zdGF0ZSA9IGV2ZW50LmJ1dHRvbjtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3N0YXRlID09PSBTVEFURS5ST1RBVEUgJiYgIV90aGlzLm5vUm90YXRlKSB7XG5cblx0XHRcdFx0X3JvdGF0ZVN0YXJ0LmNvcHkoZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRfcm90YXRlRW5kLmNvcHkoX3JvdGF0ZVN0YXJ0KTtcblxuXHRcdFx0fSBlbHNlIGlmIChfc3RhdGUgPT09IFNUQVRFLlpPT00gJiYgIV90aGlzLm5vWm9vbSkge1xuXG5cdFx0XHRcdF96b29tU3RhcnQuY29weShnZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRfem9vbUVuZC5jb3B5KF96b29tU3RhcnQpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKF9zdGF0ZSA9PT0gU1RBVEUuUEFOICYmICFfdGhpcy5ub1Bhbikge1xuXG5cdFx0XHRcdF9wYW5TdGFydC5jb3B5KGdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdF9wYW5FbmQuY29weShfcGFuU3RhcnQpXG5cblx0XHRcdH1cblxuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlLCBmYWxzZSk7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCwgZmFsc2UpO1xuXG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbW91c2Vtb3ZlKGV2ZW50KSB7XG5cblx0XHRcdGlmIChfdGhpcy5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG5cdFx0XHQvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvL2V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpZiAoX3N0YXRlID09PSBTVEFURS5ST1RBVEUgJiYgIV90aGlzLm5vUm90YXRlKSB7XG5cblx0XHRcdFx0X3JvdGF0ZUVuZC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblxuXHRcdFx0fSBlbHNlIGlmIChfc3RhdGUgPT09IFNUQVRFLlpPT00gJiYgIV90aGlzLm5vWm9vbSkge1xuXG5cdFx0XHRcdF96b29tRW5kLmNvcHkoZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblxuXHRcdFx0fSBlbHNlIGlmIChfc3RhdGUgPT09IFNUQVRFLlBBTiAmJiAhX3RoaXMubm9QYW4pIHtcblxuXHRcdFx0XHRfcGFuRW5kLmNvcHkoZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbW91c2V1cChldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0Ly9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0X3N0YXRlID0gU1RBVEUuTk9ORTtcblxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbW91c2V3aGVlbChldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHR2YXIgZGVsdGEgPSAwO1xuXG5cdFx0XHRpZiAoZXZlbnQud2hlZWxEZWx0YSkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblxuXHRcdFx0XHRkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgLyA0MDtcblxuXHRcdFx0fSBlbHNlIGlmIChldmVudC5kZXRhaWwpIHsgLy8gRmlyZWZveFxuXG5cdFx0XHRcdGRlbHRhID0gLWV2ZW50LmRldGFpbCAvIDM7XG5cblx0XHRcdH1cblxuXHRcdFx0X3pvb21TdGFydC55ICs9IGRlbHRhICogMC4wMTtcblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG5cdFx0XHRfdGhpcy5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvdWNoc3RhcnQoZXZlbnQpIHtcblxuXHRcdFx0aWYgKF90aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cblx0XHRcdHN3aXRjaCAoZXZlbnQudG91Y2hlcy5sZW5ndGgpIHtcblxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0X3N0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuXHRcdFx0XHRcdF9yb3RhdGVTdGFydC5jb3B5KGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSkpO1xuXHRcdFx0XHRcdF9yb3RhdGVFbmQuY29weShfcm90YXRlU3RhcnQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRfc3RhdGUgPSBTVEFURS5UT1VDSF9aT09NX1BBTjtcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xuXHRcdFx0XHRcdF90b3VjaFpvb21EaXN0YW5jZUVuZCA9IF90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHRfcGFuU3RhcnQuY29weShnZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHRfcGFuRW5kLmNvcHkoX3BhblN0YXJ0KTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdF9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdH1cblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG5cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRvdWNobW92ZShldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0Ly9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly9ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0c3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuXG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRfcm90YXRlRW5kLmNvcHkoZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XG5cdFx0XHRcdFx0X3RvdWNoWm9vbURpc3RhbmNlRW5kID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHRfcGFuRW5kLmNvcHkoZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRfc3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0b3VjaGVuZChldmVudCkge1xuXG5cdFx0XHRpZiAoX3RoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuXHRcdFx0Ly9ub2luc3BlY3Rpb24gQ29mZmVlU2NyaXB0U3dpdGNoU3RhdGVtZW50V2l0aE5vRGVmYXVsdEJyYW5jaFxuXHRcdFx0c3dpdGNoIChldmVudC50b3VjaGVzLmxlbmd0aCkge1xuXG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRfcm90YXRlRW5kLmNvcHkoZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0X3JvdGF0ZVN0YXJ0LmNvcHkoX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdF90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMDtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggKyBldmVudC50b3VjaGVzWyAxIF0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbIDEgXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHRfcGFuRW5kLmNvcHkoZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0X3BhblN0YXJ0LmNvcHkoX3BhbkVuZCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdFx0X3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdF90aGlzLmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG5cdFx0fVxuXG5cblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZXZlbnQpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfSwgZmFsc2UpO1xuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlZG93biwgZmFsc2UpO1xuXG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBtb3VzZXdoZWVsLCBmYWxzZSk7XG5cdFx0dGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgbW91c2V3aGVlbCwgZmFsc2UpOyAvLyBmaXJlZm94XG5cblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQsIGZhbHNlKTtcblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZCwgZmFsc2UpO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUsIGZhbHNlKTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93biwgZmFsc2UpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleXVwLCBmYWxzZSk7XG5cblx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuXG5cdFx0Ly8gZm9yY2UgYW4gdXBkYXRlIGF0IHN0YXJ0XG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXG5cdH07XG5cblx0VEhSRUUuVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlKTtcblxuXHQvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2e2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS50aHJlZS1kLWNhbnZhcz5kaXY+ZGl2Pi5jaXJjdWl0Ym9hcmR7cG9pbnRlci1ldmVudHM6dmlzaWJsZTt9LnRocmVlLWQtY2FudmFzPmRpdj5jYW52YXN7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjE7cG9pbnRlci1ldmVudHM6bm9uZTt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLmpzIn0=