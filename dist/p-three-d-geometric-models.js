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
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-geometric-models',
	    requires: ['three-d']
	  }).modify('Tile.prototype');
	  plugin.append('construct', function() {});
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiYWRiN2VlODg1NjEyN2I1M2E3YyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQtZ2VvbWV0cmljLW1vZGVscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi91dGlsL0NTUzNEUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzcz81ZGFjIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8v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Q0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTJEO0FBQzNELE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiYWRiN2VlODg1NjEyN2I1M2E3Y1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQndGhyZWUtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL0NTUzNEUmVuZGVyZXIuanMnLFxuXHQnLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzJyxcblx0Jy4vcC10aHJlZS1kLnNjc3MnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogdGhlIHBsdWdpbiAqL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzJyxcblx0XHRyZXF1aXJlczogWyd0aHJlZS1kJ11cblx0fSkubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpO1xuXG5cblx0cGx1Z2luLmFwcGVuZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gVE9ET1xuXG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRocmVlLWQtZ2VvbWV0cmljLW1vZGVscy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gbmFtZSAobWFuZGF0b3J5KSAgIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly8gb3B0aW9ucy5pbml0aWFsICAgIC0gdGhlIGluaXRpYWwgdmFsdWU7IGRlZmF1bHRzIHRvIHVuZGVmaW5lZFxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIG5hbWUsIHtpbml0aWFsLCB2YWxpZGF0aW9ufSA9IHt9KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHR2YXIgcmV0cmlldmUgPSBvcHRpb25zLnJldHJpZXZlLFxuXHRcdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0dmFyIGNhY2hlO1xuXHRcdFx0ZnVuY3Rpb24gc2V0VmFsdWUoKSB7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRjYWNoZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdGlmICghaXNFcXVhbChjYWNoZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKGNhY2hlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlKTtcblxuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UucHVzaChjYik7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHBvc2l0aW9uXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHNpemVcblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uIChUSFJFRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGh0dHA6Ly93d3cuZW1hZ2l4Lm5ldC9hY2FkZW1pYy9tc2NzLXByb2plY3QvaXRlbS9jYW1lcmEtc3luYy13aXRoLWNzczMtYW5kLXdlYmdsLXRocmVlanNcblx0ICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cblx0ICovXG5cblx0VEhSRUUuQ1NTM0RPYmplY3QgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5PYmplY3QzRC5jYWxsKCB0aGlzICk7XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdyZW1vdmVkJywgZnVuY3Rpb24gKCAvKmV2ZW50Ki8gKSB7XG5cblx0XHRcdGlmICggdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUgKTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZSA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLkNTUzNET2JqZWN0LmNhbGwoIHRoaXMsIGVsZW1lbnQgKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSApO1xuXG5cdC8vXG5cblx0VEhSRUUuQ1NTM0RSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUubG9nKCAnVEhSRUUuQ1NTM0RSZW5kZXJlcicsIFRIUkVFLlJFVklTSU9OICk7XG5cblx0XHR2YXIgX3dpZHRoLCBfaGVpZ2h0O1xuXHRcdHZhciBfd2lkdGhIYWxmLCBfaGVpZ2h0SGFsZjtcblxuXHRcdHZhciBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0dmFyIGNhY2hlID0ge1xuXHRcdFx0Y2FtZXJhOiB7IGZvdjogMCwgc3R5bGU6ICcnIH0sXG5cdFx0XHRvYmplY3RzOiB7fVxuXHRcdH07XG5cblx0XHR2YXIgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblxuXHRcdHZhciBjYW1lcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdGRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNhbWVyYUVsZW1lbnQgKTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRcdF93aWR0aCA9IHdpZHRoO1xuXHRcdFx0X2hlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0X3dpZHRoSGFsZiA9IF93aWR0aCAvIDI7XG5cdFx0XHRfaGVpZ2h0SGFsZiA9IF9oZWlnaHQgLyAyO1xuXG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0fTtcblxuXHRcdHZhciBlcHNpbG9uID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldENhbWVyYUNTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAnbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0T2JqZWN0Q1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICd0cmFuc2xhdGUzZCgtNTAlLC01MCUsMCkgbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgcmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKCBvYmplY3QsIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRE9iamVjdCApIHtcblxuXHRcdFx0XHR2YXIgc3R5bGU7XG5cblx0XHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRFNwcml0ZSApIHtcblxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9zd2lmdGNvZGVyLndvcmRwcmVzcy5jb20vMjAwOC8xMS8yNS9jb25zdHJ1Y3RpbmctYS1iaWxsYm9hcmQtbWF0cml4L1xuXG5cdFx0XHRcdFx0bWF0cml4LmNvcHkoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcblx0XHRcdFx0XHRtYXRyaXgudHJhbnNwb3NlKCk7XG5cdFx0XHRcdFx0bWF0cml4LmNvcHlQb3NpdGlvbiggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cdFx0XHRcdFx0bWF0cml4LnNjYWxlKCBvYmplY3Quc2NhbGUgKTtcblxuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDcgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMSBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDE1IF0gPSAxO1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZWxlbWVudCA9IG9iamVjdC5lbGVtZW50O1xuXHRcdFx0XHR2YXIgY2FjaGVkU3R5bGUgPSBjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXTtcblxuXHRcdFx0XHRpZiAoIGNhY2hlZFN0eWxlID09PSB1bmRlZmluZWQgfHwgY2FjaGVkU3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0XHRjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXSA9IHN0eWxlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY2FtZXJhRWxlbWVudCApIHtcblxuXHRcdFx0XHRcdGNhbWVyYUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRcdFx0cmVuZGVyT2JqZWN0KCBvYmplY3QuY2hpbGRyZW5bIGkgXSwgY2FtZXJhICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdFx0dmFyIGZvdiA9IDAuNSAvIE1hdGgudGFuKCBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBjYW1lcmEuZm92ICogMC41ICkgKSAqIF9oZWlnaHQ7XG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLmZvdiAhPT0gZm92ICkge1xuXG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5XZWJraXRQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLk1velBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUub1BlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5mb3YgPSBmb3Y7XG5cblx0XHRcdH1cblxuXHRcdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0aWYgKCBjYW1lcmEucGFyZW50ID09PSB1bmRlZmluZWQgKSB7IGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpIH1cblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZS5nZXRJbnZlcnNlKCBjYW1lcmEubWF0cml4V29ybGQgKTtcblxuXHRcdFx0dmFyIHN0eWxlID0gXCJ0cmFuc2xhdGUzZCgwLDAsXCIgKyBmb3YgKyBcInB4KVwiICsgZ2V0Q2FtZXJhQ1NTTWF0cml4KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICkgK1xuXHRcdFx0XHRcIiB0cmFuc2xhdGUzZChcIiArIF93aWR0aEhhbGYgKyBcInB4LFwiICsgX2hlaWdodEhhbGYgKyBcInB4LCAwKVwiO1xuXG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLnN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuc3R5bGUgPSBzdHlsZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJPYmplY3QoIHNjZW5lLCBjYW1lcmEgKTtcblxuXHRcdH07XG5cblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL0NTUzNEUmVuZGVyZXIuanNcbiAqKi8iLCIvKipcbiAqIEBhdXRob3IgRWJlcmhhcmQgR3JhZXRoZXIgICAgIChodHRwOi8vZWdyYWV0aGVyLmNvbSlcbiAqIEBhdXRob3IgTWFyayBMdW5kaW4gICAgICAgICAgIChodHRwOi8vbWFyay1sdW5kaW4uY29tKVxuICogQGF1dGhvciBNaWNoaWVsIEhlbHZlbnN0ZWlqbiAgKGh0dHA6Ly9taGVsdmVucy5uZXQpXG4gKi9cblxuZGVmaW5lKFsnanF1ZXJ5JywgJ3RocmVlLWpzJywgJ2RlbHRhLWpzJywgJy4vbWlzYy5qcyddLCAoJCwgVEhSRUUsIERlbHRhTW9kZWwsIFUpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogY29uc3RhbnRzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBTVEFURSA9IHsgTk9ORTogLTEsIFJPVEFURTogMCwgWk9PTTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX1pPT01fUEFOOiA0IH07XG5cdHZhciBDSEFOR0VfRVZFTlQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cdHZhciBTVEFSVF9FVkVOVCAgPSB7IHR5cGU6ICdzdGFydCcgfTtcblx0dmFyIEVORF9FVkVOVCAgICA9IHsgdHlwZTogJ2VuZCcgfTtcblxuXG5cdC8qIGRlbHRhIG1vZGVsICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0dmFyIGRtID0gbmV3IERlbHRhTW9kZWwoKTtcblxuXG5cdC8qIGNvcmUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdjb3JlJywge1xuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiAnY29uc3RydWN0JyBtZXRob2QgY29yZSAqL1xuXHRcdFx0LmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKGNvbnRyb2xsZWRPYmplY3QsIGRvbUVsZW1lbnQpIHtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdCA9IGNvbnRyb2xsZWRPYmplY3Q7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuXHRcdFx0fSlcblx0XHQvKiBBUEkgKi9cblx0XHRcdC5hcHBlbmQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHR9KVxuXHRcdC8qIHByaXZhdGUgZmllbGRzICovXG5cdFx0XHQuYXBwZW5kKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cdFx0XHRcdHRoaXMuX2V5ZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fem9vbUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSAwO1xuXHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cdFx0XHRcdHRoaXMuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fcGFuRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fc2NyZWVuID0geyBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMwID0gdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY2xvbmUoKTtcblx0XHRcdFx0dGhpcy5fcG9zaXRpb24wID0gdGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5jbG9uZSgpO1xuXHRcdFx0XHR0aGlzLl91cDAgPSB0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwLmNsb25lKCk7XG5cblx0XHRcdH0pXG5cdFx0LyogcHVibGljIG1ldGhvZHMgKi9cblx0XHRcdC5hZGQoJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLCB0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0dGhpcy5yb3RhdGVDYW1lcmEoKTtcblx0XHRcdFx0dGhpcy56b29tQ2FtZXJhKCk7XG5cdFx0XHRcdHRoaXMucGFuQ2FtZXJhKCk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLCB0aGlzLl9leWUpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pID4gRVBTKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENIQU5HRV9FVkVOVCk7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFBvc2l0aW9uLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYWRkKCdyZXNldCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9zdGF0ZSA9IFNUQVRFLk5PTkU7XG5cblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuY29weSh0aGlzLl90YXJnZXRDb29yZGluYXRlczApO1xuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmNvcHkodGhpcy5fcG9zaXRpb24wKTtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5jb3B5KHRoaXMuX3VwMCk7XG5cblx0XHRcdFx0dGhpcy5fZXllLnN1YlZlY3RvcnModGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbiwgdGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ0hBTkdFX0VWRU5UKTtcblxuXHRcdFx0XHR0aGlzLl9sYXN0UG9zaXRpb24uY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uKTtcblxuXHRcdFx0fSkuYWRkKCdoYW5kbGVSZXNpemUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RvbUVsZW1lbnQgPT09IGRvY3VtZW50KSB7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSAwO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgPSAwO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGJveCA9IHRoaXMuX2RvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0Ly8gYWRqdXN0bWVudHMgY29tZSBmcm9tIHNpbWlsYXIgY29kZSBpbiB0aGUganF1ZXJ5IG9mZnNldCgpIGZ1bmN0aW9uXG5cdFx0XHRcdFx0dmFyIGQgPSB0aGlzLl9kb21FbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5sZWZ0ID0gYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkLmNsaWVudExlZnQ7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLnRvcCA9IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBkLmNsaWVudFRvcDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ud2lkdGggPSBib3gud2lkdGg7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmhlaWdodCA9IGJveC5oZWlnaHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblxuXHQvKiBtb3VzZSBldmVudCBtZXRob2QgY29yZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnbW91c2UtZXZlbnRzJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLk5PTkUpIHsgdGhpcy5fc3RhdGUgPSBldmVudC5idXR0b24gfVxuXG5cdFx0XHRcdHZhciBtb3VzZW1vdmUgPSAoZSkgPT4geyB0aGlzLm1vdXNlbW92ZShlKSB9O1xuXHRcdFx0XHR2YXIgbW91c2V1cCA9ICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblxuXHRcdFx0fSkuYWRkKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuXHRcdFx0fSkuYWRkKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cblx0XHRcdH0pLmFkZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIGdldE1vdXNlT25TY3JlZW5cblxuXHRcdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5nZXRNb3VzZU9uU2NyZWVuID0gZnVuY3Rpb24gZ2V0TW91c2VPblNjcmVlbihwYWdlWCwgcGFnZVkpIHtcblx0XHRcdFx0XHR2ZWN0b3Iuc2V0KFxuXHRcdFx0XHRcdFx0XHQocGFnZVggLSB0aGlzLl9zY3JlZW4ubGVmdCkgLyB0aGlzLl9zY3JlZW4ud2lkdGgsXG5cdFx0XHRcdFx0XHRcdChwYWdlWSAtIHRoaXMuX3NjcmVlbi50b3ApIC8gdGhpcy5fc2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuIHZlY3Rvcjtcblx0XHRcdFx0fTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbFxuXHRcdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwgPSBmdW5jdGlvbiBnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0XHRtb3VzZU9uQmFsbC5zZXQoXG5cdFx0XHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvICh0aGlzLl9zY3JlZW4ud2lkdGggKiAwLjUpLFxuXHRcdFx0XHRcdFx0XHQodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSArIHRoaXMuX3NjcmVlbi50b3AgLSBwYWdlWSkgLyAodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSksXG5cdFx0XHRcdFx0XHRcdDAuMFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHR2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG5cblx0XHRcdFx0XHRpZiAobGVuZ3RoID4gMS4wKSB7XG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC5ub3JtYWxpemUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwueiA9IE1hdGguc3FydCgxLjAgLSBsZW5ndGggKiBsZW5ndGgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX2V5ZS5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pLnN1Yih0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0XHR2ZWN0b3IuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueSk7XG5cdFx0XHRcdFx0dmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLmNyb3NzKHRoaXMuX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcblx0XHRcdFx0XHR2ZWN0b3IuYWRkKHRoaXMuX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZlY3RvcjtcblxuXHRcdFx0XHR9O1xuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4geyB0aGlzLm1vdXNlZG93bihlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHsgdGhpcy50b3VjaHN0YXJ0KGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7IHRoaXMudG91Y2htb3ZlKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHsgdGhpcy50b3VjaGVuZChlKSB9KTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiByb3RhdGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgncm90YXRlJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnLCAnbW91c2UtZXZlbnRzJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5ST1RBVEUpIHtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5UT1VDSF9ST1RBVEU7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5fcm90YXRlU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5fcm90YXRlRW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHJvdGF0aW5nICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIHJvdGF0ZUNhbWVyYVxuXHRcdFx0XHR2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblx0XHRcdFx0dGhpcy5yb3RhdGVDYW1lcmEgPSBmdW5jdGlvbiByb3RhdGVDYW1lcmEoKSB7XG5cblx0XHRcdFx0XHR2YXIgYW5nbGUgPSBNYXRoLmFjb3MoXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmRvdCh0aGlzLl9yb3RhdGVFbmQpIC9cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQubGVuZ3RoKCkgL1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQubGVuZ3RoKClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChhbmdsZSkge1xuXHRcdFx0XHRcdFx0YXhpcy5jcm9zc1ZlY3RvcnModGhpcy5fcm90YXRlU3RhcnQsIHRoaXMuX3JvdGF0ZUVuZCkubm9ybWFsaXplKCk7XG5cblx0XHRcdFx0XHRcdGFuZ2xlICo9IHRoaXMucm90YXRlU3BlZWQ7XG5cblx0XHRcdFx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9leWUuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cblx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH07XG5cdFx0XHR9KVxuXHRcdC8qIHJvdGF0aW5nIG9wdGlvbnMgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLnJvdGF0ZVNwZWVkID0gMS4wO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHpvb20gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCd6b29tJywge1xuXHRcdGFmdGVyOiBbJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuWk9PTSkge1xuXHRcdFx0XHRcdHRoaXMuX3pvb21TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5fem9vbVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlpPT00pIHtcblx0XHRcdFx0XHR0aGlzLl96b29tRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgnbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLmVuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0dmFyIGRpZmYgPSAwO1xuXHRcdFx0XHRpZiAoZXZlbnQud2hlZWxEZWx0YSkgeyAvLyBXZWJLaXQgLyBPcGVyYSAvIEV4cGxvcmVyIDlcblx0XHRcdFx0XHRkaWZmID0gZXZlbnQud2hlZWxEZWx0YSAvIDQwO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LmRldGFpbCkgeyAvLyBGaXJlZm94XG5cdFx0XHRcdFx0ZGlmZiA9IC1ldmVudC5kZXRhaWwgLyAzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LnkgKz0gZGlmZiAqIDAuMDE7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChFTkRfRVZFTlQpO1xuXG5cdFx0XHR9KS5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCAoZSkgPT4geyB0aGlzLm1vdXNld2hlZWwoZSkgfSk7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCAoZSkgPT4geyB0aGlzLm1vdXNld2hlZWwoZSkgfSk7IC8vIGZpcmVmb3hcblxuXHRcdFx0fSlcblx0XHQvKiB6b29taW5nICovXG5cdFx0XHQuYWRkKCd6b29tQ2FtZXJhJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuVE9VQ0hfWk9PTV9QQU4pIHtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQ7XG5cdFx0XHRcdFx0dGhpcy5fZXllLm11bHRpcGx5U2NhbGFyKHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgLyB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGZhY3RvciA9IDEuMCArICggdGhpcy5fem9vbUVuZC55IC0gdGhpcy5fem9vbVN0YXJ0LnkgKSAqIHRoaXMuem9vbVNwZWVkO1xuXHRcdFx0XHRcdGlmIChmYWN0b3IgIT09IDEuMCAmJiBmYWN0b3IgPiAwLjApIHtcblx0XHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcihmYWN0b3IpO1xuXHRcdFx0XHRcdFx0dGhpcy5fem9vbVN0YXJ0LmNvcHkodGhpcy5fem9vbUVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0Lyogem9vbWluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy56b29tU3BlZWQgPSAxLjI7XG5cblx0XHRcdH0pO1xuXG5cblx0LyogcGFuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3BhbicsIHtcblx0XHRhZnRlcjogWydjb3JlJywgJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0LyogcGFubmluZyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyBwYW5DYW1lcmFcblx0XHRcdFx0dmFyIG1vdXNlQ2hhbmdlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMucGFuQ2FtZXJhID0gZnVuY3Rpb24gcGFuQ2FtZXJhKCkge1xuXG5cdFx0XHRcdFx0bW91c2VDaGFuZ2UuY29weSh0aGlzLl9wYW5FbmQpLnN1Yih0aGlzLl9wYW5TdGFydCk7XG5cdFx0XHRcdFx0aWYgKG1vdXNlQ2hhbmdlLmxlbmd0aFNxKCkpIHtcblx0XHRcdFx0XHRcdG1vdXNlQ2hhbmdlLm11bHRpcGx5U2NhbGFyKHRoaXMuX2V5ZS5sZW5ndGgoKSAqIHRoaXMucGFuU3BlZWQpO1xuXHRcdFx0XHRcdFx0cGFuLmNvcHkodGhpcy5fZXllKS5jcm9zcyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VDaGFuZ2UueCk7XG5cdFx0XHRcdFx0XHRwYW4uYWRkKG9iamVjdFVwLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLnkpKTtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24uYWRkKHBhbik7XG5cdFx0XHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlcy5hZGQocGFuKTtcblx0XHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5fcGFuRW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fTtcblx0XHRcdH0pXG5cdFx0LyogcGFubmluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5wYW5TcGVlZCA9IDAuMztcblxuXHRcdFx0fSk7XG5cblxuXHQvKiB6b29tICsgcGFuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnem9vbStwYW4nLCB7XG5cdFx0YWZ0ZXI6IFsnem9vbScsICdwYW4nXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5UT1VDSF9aT09NX1BBTjtcblx0XHRcdFx0XHR2YXIgZHggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sxXS5wYWdlWTtcblx0XHRcdFx0XHR0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG5cdFx0XHRcdFx0dmFyIHggPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggKyBldmVudC50b3VjaGVzWzFdLnBhZ2VYICkgLyAyO1xuXHRcdFx0XHRcdHZhciB5ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSApIC8gMjtcblx0XHRcdFx0XHR0aGlzLl9wYW5FbmQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMDtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuX3BhbkVuZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblxuXHQvKiBsaXR0bGUgaGFjayBmb3IgYXBpbmF0b215LXNwZWNpZmljIGZ1bmN0aW9uYWxpdHkgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnYXBpbmF0b215LXNwZWNpZmljJywge1xuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ3NldENhbWVyYURpc3RhbmNlJywgZnVuY3Rpb24gc2V0Q2FtZXJhRGlzdGFuY2UoZGlzdGFuY2UpIHtcblxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKGRpc3RhbmNlKTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiB0aGUgVHJhY2tiYWxsQ29udHJvbHMgY2xhc3MgKHZhcmlhdGlvbiBwb2ludCkgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFRIUkVFLlRyYWNrYmFsbENvbnRyb2xzID0gZG0udnAoJ1RyYWNrYmFsbENvbnRyb2xzJyxcblx0XHRcdFUubmV3Q2xhc3MoZnVuY3Rpb24gVHJhY2tiYWxsQ29udHJvbHMoY29udHJvbGxlZE9iamVjdCwgZG9tRWxlbWVudCA9IGRvY3VtZW50KSB7XG5cblx0XHRcdFx0LyogYXBwbHkgdGhlIGNvbnN0cnVjdCBtZXRob2QgcG9wdWxhdGVkIGJ5IGRlbHRhcyAqL1xuXHRcdFx0XHR0aGlzLmNvbnN0cnVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHRcdC8qIGV4cGxpY2l0bHkgdXBkYXRlIGluIHRoZSBiZWdpbm5pbmcgKi9cblx0XHRcdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcblxuXHRcdFx0fSwgT2JqZWN0LmNyZWF0ZShUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlKSlcblx0KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvVHJhY2tiYWxsQ29udHJvbHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGhyZWUtZC1jYW52YXM+ZGl2PmRpdntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3otaW5kZXg6MDtwb2ludGVyLWV2ZW50czpub25lO30udGhyZWUtZC1jYW52YXM+ZGl2PmRpdj4uY2lyY3VpdGJvYXJke3BvaW50ZXItZXZlbnRzOnZpc2libGU7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt9LnRocmVlLWQtY2FudmFzPmRpdj5jYW52YXN7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjE7cG9pbnRlci1ldmVudHM6bm9uZTt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzIn0=