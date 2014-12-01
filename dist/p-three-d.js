(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("bacon"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "bacon", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("bacon"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["Bacon"], root["DeltaModel"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U) {
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
	    this.newProperty('threeDControlsEnabled', {initial: true});
	    this.object3D = new THREE.Object3D();
	    this.newEvent('3d-render');
	    this.on('threeDMode', true, (function() {
	      $__0._p_threeD_initialize();
	    }));
	  });
	  plugin.add('Circuitboard.prototype._p_threeD_initialize', function() {
	    var $__0 = this;
	    this._p_threeD_initialMargin = {};
	    this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
	    this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
	    this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
	    this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;
	    this.one('threeDMode', false, (function() {
	      delete $__0._p_threeD_initialMargin;
	    }));
	    this._p_threeD_scene = new THREE.Scene();
	    this.one('threeDMode', false, (function() {
	      delete $__0._p_threeD_scene;
	    }));
	    this.camera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
	    this.camera3D.position.z = 1;
	    this.one('threeDMode', false, (function() {
	      delete $__0.camera3D;
	    }));
	    this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((function(size) {
	      $__0.camera3D.aspect = size.width / size.height;
	      $__0.camera3D.updateProjectionMatrix();
	    }));
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
	    this.on('3d-render').takeWhile(this.on('threeDMode')).onValue((function() {
	      $__0._p_threeD_renderer_webgl.render($__0._p_threeD_scene, $__0.camera3D);
	    }));
	    this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((function(size) {
	      $__0._p_threeD_renderer_webgl.setSize(size.width, size.height);
	    }));
	    this.one('threeDMode', false, (function() {
	      delete $__0._p_threeD_renderer_webgl;
	    }));
	    this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
	    $(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
	    this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
	    this.one('threeDMode', false, (function() {
	      $__0.threeDCanvasElement.empty();
	      delete $__0._p_threeD_renderer_css;
	    }));
	    this.on('3d-render').takeWhile(this.on('threeDMode')).onValue((function() {
	      $__0._p_threeD_renderer_css.render($__0._p_threeD_scene, $__0.camera3D);
	    }));
	    this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((function(size) {
	      $__0._p_threeD_renderer_css.setSize(size.width, size.height);
	    }));
	    U.animationFrames().merge(this.property('size').changes()).takeWhile(this.on('threeDMode')).onValue((function() {
	      $__0.trigger('3d-render');
	    }));
	    this._p_threeD_controls = new THREE.TrackballControls(this.camera3D, this.threeDCanvasElement[0]);
	    U.extend(this._p_threeD_controls, {
	      rotateSpeed: 1.0,
	      zoomSpeed: 1.2,
	      panSpeed: 0.8
	    });
	    this.one('threeDMode', false, (function() {
	      delete $__0._p_threeD_controls;
	    }));
	    this.on('3d-render').takeWhile(this.on('threeDMode')).onValue((function() {
	      $__0._p_threeD_controls.update();
	    }));
	    this.on('size').takeWhile(this.on('threeDMode')).onValue((function() {
	      $__0._p_threeD_controls.handleResize();
	    }));
	    this.on('threeDControlsEnabled').takeWhile(this.on('threeDMode')).onValue((function(enabled) {
	      $__0._p_threeD_controls.enabled = enabled;
	    }));
	    this._p_threeD_scene.add(this.object3D);
	    this.object3D.scale.y = -1;
	    this.object3D.add = (function(subObj) {
	      THREE.Object3D.prototype.add.call($__0.object3D, subObj);
	      subObj.scale.y = -1;
	    });
	    this.on('size').takeWhile(this.on('threeDMode')).onValue((function(size) {
	      $__0.object3D.position.x = -size.width / 2 + 1;
	      $__0.object3D.position.y = size.height / 2 - 1;
	    }));
	    var initialCircuitboardParent = this.element.parent();
	    var initialCircuitboardPositioning = {
	      left: this.element.css('left'),
	      top: this.element.css('top'),
	      right: this.element.css('right'),
	      bottom: this.element.css('bottom')
	    };
	    this.one('threeDMode', false, (function() {
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
	    this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((function() {
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
	      U.extend($__0.object3D.position, {
	        x: newCircuitboardPosition.x - $__0.size.width / 2,
	        y: newCircuitboardPosition.y + $__0.size.height / 2
	      });
	      backfaceElement.css(newCircuitboardSize);
	      U.extend(backface.position, newCircuitboardPosition);
	      $__0._p_threeD_controls.setCameraDistance($__0.threeDCanvasSize.height / (2 * Math.tan(THREE.Math.degToRad($__0.camera3D.fov) / 2)));
	    }));
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
	      $__0.on('position', reset);
	      $__0.on('size', reset);
	    }))((function() {
	      $__0.object3D.position.x = $__0.position.left + $__0.size.width / 2;
	      $__0.object3D.position.y = $__0.position.top + $__0.size.height / 2;
	    }));
	    this.on('visible', (function(visible) {
	      $__0.object3D.visible = visible;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, Bacon) {
	  'use strict';
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    return window.setTimeout(f, 1000 / 60);
	  }));
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
	    animationFrames: function() {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(8), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, DeltaModel, U) {
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
	    if (!this.enabled || this._state !== STATE.NONE) {
	      return;
	    }
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
	    $(window).on('keydown', (function(e) {
	      $__0.keydown(e);
	    }));
	    $(window).on('keyup', (function(e) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MDY3NjdjMTNjOGQxZjVjZTEyOSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9DU1MzRFJlbmRlcmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzcz81ZGFjIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHO0FBQ3RCLGNBQVcsQ0FBQztBQUlaLFVBQVMsZUFBYSxDQUFFLENBQUU7QUFDckIsY0FBSyxDQUFDO0FBQ1YsT0FBSTtBQUNILFlBQUssRUFBSSxFQUFDLENBQUMsVUFBUyxDQUFDLENBQUM7QUFDdEIsWUFBTyxFQUFDLENBQUMsQ0FBQyxNQUFLLENBQUUsRUFBQyxXQUFZLENBQUMsT0FBTSxDQUFDLEdBQUssT0FBSyxDQUFFLEVBQUMsV0FBWSxDQUFDLG9CQUFtQixDQUFDLENBQUMsQ0FBQztLQUN2RixDQUFFLE9BQU8sRUFBQyxDQUFHO0FBQ1osWUFBTyxNQUFJLENBQUM7S0FDYixDQUFFLE9BQVE7QUFDVCxZQUFLLEVBQUksVUFBUSxDQUFDO0tBQ25CO0FBQUEsR0FDRDtBQUlJLFdBQUksRUFBSSxJ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QUFPLENBQUcsRUFBQyxDQUFFLENBQUUsRUFBSSxJQUFFLEVBQzlCLFFBQU8sQ0FBRSxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDaEMsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUFJLElBQUUsRUFDOUIsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFDLENBQUUsQ0FBRSxFQUN6QixJQUFFLENBQUM7S0FFSixDQUFDO0FBRUcsMEJBQWlCLEVBQUksVUFBVyxNQUFLLENBQUk7QUFFeEMsa0JBQU8sRUFBSSxPQUFLLFNBQVMsQ0FBQztBQUU5QixZQUFPLHFDQUFtQyxFQUN6QyxRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDN0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLENBQUUsUUFBTyxDQUFHLEVBQUUsQ0FBRSxFQUFJLElBQUUsRUFDL0IsUUFBTyxDQUFFLFFBQU8sQ0FBRyxFQUFFLENBQUUsRUFBSSxJQUFFLEVBQzdCLFFBQU8sQ0FBRSxRQUFPLENBQUcsRUFBRSxDQUFFLEVBQUksSUFBRSxFQUM3QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVBQUMsQ0FBRSxDQUFFLEVBQUksSUFBRSxFQUM5QixRQUFPLENBQUUsUUFBTyxDQUFHLEVB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QTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIiwgXCJibHVlYmlyZFwiLCBcImJhY29uXCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvblwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5MDY3NjdjMTNjOGQxZjVjZTEyOVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQndGhyZWUtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL0NTUzNEUmVuZGVyZXIuanMnLFxuXHQnLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzJyxcblx0Jy4vcC10aHJlZS1kLnNjc3MnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogdGVzdCBmb3IgYnJvd3NlciAzRCBzdXBwb3J0ICovXG5cdGZ1bmN0aW9uIGJyb3dzZXJTdXBwb3J0KCkge1xuXHRcdHZhciBjYW52YXM7XG5cdFx0dHJ5IHtcblx0XHRcdGNhbnZhcyA9ICQoJzxjYW52YXM+Jyk7XG5cdFx0XHRyZXR1cm4gISEoY2FudmFzWzBdLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzWzBdLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpKTtcblx0XHR9IGNhdGNoIChfXykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRjYW52YXMgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblxuXHQvKiBzb21lIHVzZWZ1bCBjb25zdGFudHMgZm9yIG1ha2luZyBpbnRlcnNlY3Rpb24gY2hlY2tzICovXG5cdHZhciBQTEFORSA9IG5ldyBUSFJFRS5QbGFuZShuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKSwgMCk7XG5cdHZhciBQUk9KRUNUT1IgPSBuZXcgVEhSRUUuUHJvamVjdG9yKCk7XG5cblxuXHQvKiB0aGUgcGx1Z2luICovXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aHJlZS1kJyxcblx0XHRyZXF1aXJlczogWydwb3NpdGlvbi10cmFja2luZycsICd0aWxlLWhpZGRlbiddXG5cdH0pO1xuXG5cblx0LyogdGhlIGNvbnN0cnVjdG9yIGlzIHJ1biBvbmNlIHRvIGluaXRpYWxpemUgcG90ZW50aWFsIDNELW5lc3MgKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblxuXHRcdC8qICB0ZXN0IGZvciBicm93c2VyIHN1cHBvcnQgKi9cblx0XHRpZiAoIWJyb3dzZXJTdXBwb3J0KCkpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHNlZW0gdG8gaGF2ZSBXZWJHTCBzdXBwb3J0LlwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ2FudmFzRWxlbWVudCcgcHJvcGVydHkgKi9cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCd0aHJlZURDYW52YXNFbGVtZW50Jyk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzRWxlbWVudCcpLnNsaWRpbmdXaW5kb3coMikubWFwKCcucmV2ZXJzZScpLm9uVmFsdWVzKChuZXdDYW52YXMsIG9sZENhbnZhcykgPT4ge1xuXHRcdFx0aWYgKG9sZENhbnZhcykgeyBvbGRDYW52YXMucmVtb3ZlQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdFx0aWYgKG5ld0NhbnZhcykgeyBuZXdDYW52YXMuYWRkQ2xhc3MoJ3RocmVlLWQtY2FudmFzJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiB3YXMgYSBjYW52YXMgZ2l2ZW4gdGhyb3VnaCB0aGUgb3B0aW9ucz8gKi9cblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQgPSB0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudDtcblxuXG5cdFx0LyogdGhlICd0aHJlZURNb2RlJyBwcm9wZXJ0eSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRE1vZGUnLCB7XG5cdFx0XHRpbml0aWFsOiBVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMudGhyZWVEQ2FudmFzRWxlbWVudClcblx0XHR9KTsgLy8gVE9ETzogZXJyb3IgaWYgbm8gY2FudmFzIGVsZW1lbnQgaXMgc2V0XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ2FudmFzU2l6ZScgb2JzZXJ2YWJsZSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRENhbnZhc1NpemUnKTtcblx0XHQoKGNhY2hlKSA9PiB7XG5cdFx0XHR0aGlzLnRocmVlRENhbnZhc1NpemUgPSBjYWNoZSgpO1xuXHRcdFx0Y2FjaGUub25DaGFuZ2UoKG5ld1NpemUpID0+IHsgdGhpcy50aHJlZURDYW52YXNTaXplID0gbmV3U2l6ZSB9KTtcblx0XHRcdCggdGhpcy5vcHRpb25zLmNhbnZhc1Jlc2l6ZUV2ZW50IHx8ICQod2luZG93KS5yZXNpemUuYmluZCgkKHdpbmRvdykpICkoY2FjaGUpO1xuXHRcdH0pKFUuY2FjaGVkKHtcblx0XHRcdHJldHJpZXZlOiAoKSA9PiAodGhpcy50aHJlZURDYW52YXNFbGVtZW50ICYmIG5ldyBVLlNpemUoXG5cdFx0XHRcdFx0dGhpcy50aHJlZURDYW52YXNFbGVtZW50LmhlaWdodCgpLFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzRWxlbWVudC53aWR0aCgpXG5cdFx0XHQpKSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KSk7XG5cblxuXHRcdC8qIHRoZSAndGhyZWVEQ29udHJvbHNFbmFibGVkJyBwcm9wZXJ0eSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRENvbnRyb2xzRW5hYmxlZCcsIHsgaW5pdGlhbDogdHJ1ZSB9KTtcblxuXG5cblx0XHQvKiBwcmVlbXB0aXZlbHkgc2V0IHRoZSBvYmplY3QzRCBwcm9wZXJ0eSAqL1xuXHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTsgLy8gVE9ETzogbW92ZSBiYWNrXG5cblxuXG5cdFx0dGhpcy5uZXdFdmVudCgnM2QtcmVuZGVyJyk7IC8vIFRPRE86IHNlZWsgb3V0IGFsbCB0cmlnZ2VyIG1ldGhvZHM7IHNlZSB0aGF0IGVhY2ggaGFzIGFuIGV2ZW50IGRlZmluaXRpb25cblxuXG5cdFx0LyogaW5pdGlhbGl6ZSB3aGVuIDNEIG1vZGUgaXMgdHVybmVkIG9uICovXG5cdFx0dGhpcy5vbigndGhyZWVETW9kZScsIHRydWUsICgpID0+IHsgdGhpcy5fcF90aHJlZURfaW5pdGlhbGl6ZSgpIH0pO1xuXG5cblx0fSk7XG5cblx0LyogYF9wX3RocmVlRF9pbml0aWFsaXplYCBpcyBydW4gZXZlcnkgdGltZSAzRC1uZXNzIGlzIHR1cm5lZCBvbiAqL1xuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLl9wX3RocmVlRF9pbml0aWFsaXplJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gVE9ETzogZml4IGJ1Zzogd2hlbiAzRCBtb2RlIGlzIHR1cm5lZCBvZmYsIHRoZW4gb24sIHRpbGVzIG5vIGxvbmdlciByZXNwb25kIHRvIGNsaWNrc1xuXG5cblx0XHQvKiByZW1lbWJlciB0aGUgaW5pdGlhbCBtYXJnaW4gKi9cblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luID0ge307XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0ID0gdGhpcy5lbGVtZW50Lm9mZnNldCgpLmxlZnQgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkubGVmdDtcblx0XHR0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCA9IHRoaXMuZWxlbWVudC5vZmZzZXQoKS50b3AgLSB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCkudG9wO1xuXHRcdHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4ucmlnaHQgPSB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLnNpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQ7XG5cdFx0dGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5ib3R0b20gPSB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC0gdGhpcy5zaXplLmhlaWdodCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wO1xuXG5cdFx0dGhpcy5vbmUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbiB9KTtcblxuXG5cdFx0Lyogc2NlbmUgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHRcdHRoaXMub25lKCd0aHJlZURNb2RlJywgZmFsc2UsICgpID0+IHsgZGVsZXRlIHRoaXMuX3BfdGhyZWVEX3NjZW5lIH0pO1xuXG5cblx0XHQvKiBjYW1lcmEgKi9cblx0XHR0aGlzLmNhbWVyYTNEID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0LCAxLCAxMDAwMCk7XG5cdFx0dGhpcy5jYW1lcmEzRC5wb3NpdGlvbi56ID0gMTtcblx0XHR0aGlzLm9uZSgndGhyZWVETW9kZScsIGZhbHNlLCAoKSA9PiB7IGRlbGV0ZSB0aGlzLmNhbWVyYTNEIH0pO1xuXHRcdHRoaXMub24oJ3RocmVlRENhbnZhc1NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLmNhbWVyYTNELmFzcGVjdCA9IHNpemUud2lkdGggLyBzaXplLmhlaWdodDtcblx0XHRcdHRoaXMuY2FtZXJhM0QudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXHRcdH0pO1xuXG5cblx0XHQvKiBsaWdodGluZyAqL1xuXHRcdHZhciBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MTAxMDMwKTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblx0XHQvL1xuXHRcdHZhciBkaXJlY3Rpb25hbExpZ2h0MSA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZWRkKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0MS5wb3NpdGlvbi5zZXQoMSwgLTEsIDEpO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MSk7XG5cdFx0Ly9cblx0XHR2YXIgZGlyZWN0aW9uYWxMaWdodDIgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWVkZCk7XG5cdFx0ZGlyZWN0aW9uYWxMaWdodDIucG9zaXRpb24uc2V0KC0xLCAxLCAtMSk7XG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQyKTtcblxuXG5cdFx0LyogcmVuZGVyZXI6IFdlYkdMICovXG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IHRydWUgfSk7XG5cdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc29ydE9iamVjdHMgPSBmYWxzZTtcblx0XHR0aGlzLm9uKCczZC1yZW5kZXInKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX3dlYmdsLnJlbmRlcih0aGlzLl9wX3RocmVlRF9zY2VuZSwgdGhpcy5jYW1lcmEzRCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoc2l6ZSkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wuc2V0U2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdFx0fSk7XG5cdFx0dGhpcy5vbmUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfcmVuZGVyZXJfd2ViZ2wgfSk7XG5cblxuXHRcdC8qIHJlbmRlcmVyOiBDU1MgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MgPSBuZXcgVEhSRUUuQ1NTM0RSZW5kZXJlcigpO1xuXHRcdCQodGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLmRvbUVsZW1lbnQpLmFwcGVuZCh0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl93ZWJnbC5kb21FbGVtZW50KTtcblx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuYXBwZW5kKHRoaXMuX3BfdGhyZWVEX3JlbmRlcmVyX2Nzcy5kb21FbGVtZW50KTtcblx0XHR0aGlzLm9uZSgndGhyZWVETW9kZScsIGZhbHNlLCAoKSA9PiB7XG5cdFx0XHR0aGlzLnRocmVlRENhbnZhc0VsZW1lbnQuZW1wdHkoKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3M7XG5cdFx0fSk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RocmVlRF9yZW5kZXJlcl9jc3MucmVuZGVyKHRoaXMuX3BfdGhyZWVEX3NjZW5lLCB0aGlzLmNhbWVyYTNEKTtcblx0XHR9KTtcblx0XHR0aGlzLm9uKCd0aHJlZURDYW52YXNTaXplJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoc2l6ZSkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfcmVuZGVyZXJfY3NzLnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH0pO1xuXG5cblx0XHQvKiByZW5kZXIgb24gc2l6ZS1jaGFuZ2UgYW5kIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZSAqL1xuXHRcdFUuYW5pbWF0aW9uRnJhbWVzKCkubWVyZ2UodGhpcy5wcm9wZXJ0eSgnc2l6ZScpLmNoYW5nZXMoKSlcblx0XHRcdFx0LnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpXG5cdFx0XHRcdC5vblZhbHVlKCgpID0+IHsgdGhpcy50cmlnZ2VyKCczZC1yZW5kZXInKSB9KTtcblxuXG5cdFx0LyogY29udHJvbHMgKi9cblx0XHR0aGlzLl9wX3RocmVlRF9jb250cm9scyA9IG5ldyBUSFJFRS5UcmFja2JhbGxDb250cm9scyh0aGlzLmNhbWVyYTNELCB0aGlzLnRocmVlRENhbnZhc0VsZW1lbnRbMF0pO1xuXHRcdFUuZXh0ZW5kKHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLCB7XG5cdFx0XHRyb3RhdGVTcGVlZDogMS4wLFxuXHRcdFx0em9vbVNwZWVkOiAxLjIsXG5cdFx0XHRwYW5TcGVlZDogMC44XG5cdFx0fSk7XG5cdFx0dGhpcy5vbmUoJ3RocmVlRE1vZGUnLCBmYWxzZSwgKCkgPT4geyBkZWxldGUgdGhpcy5fcF90aHJlZURfY29udHJvbHMgfSk7XG5cdFx0dGhpcy5vbignM2QtcmVuZGVyJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoKSA9PiB7IHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnVwZGF0ZSgpIH0pO1xuXHRcdHRoaXMub24oJ3NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKCgpID0+IHsgdGhpcy5fcF90aHJlZURfY29udHJvbHMuaGFuZGxlUmVzaXplKCkgfSk7XG5cdFx0dGhpcy5vbigndGhyZWVEQ29udHJvbHNFbmFibGVkJykudGFrZVdoaWxlKHRoaXMub24oJ3RocmVlRE1vZGUnKSkub25WYWx1ZSgoZW5hYmxlZCkgPT4ge1xuXHRcdFx0dGhpcy5fcF90aHJlZURfY29udHJvbHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdFx0fSk7XG5cblxuXHRcdC8qICB0aGUgY2lyY3VpdGJvYXJkIG9iamVjdCBoYXMgYSBjb29yZGluYXRlIHN5c3RlbSAgICAgICAgICAgKi9cblx0XHQvKiAgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgaHRtbCBhbmQgc3ZnIG9mIHRoZSBjaXJjdWl0Ym9hcmQgICovXG5cdFx0dGhpcy5fcF90aHJlZURfc2NlbmUuYWRkKHRoaXMub2JqZWN0M0QpO1xuXHRcdHRoaXMub2JqZWN0M0Quc2NhbGUueSA9IC0xOyAgICAgICAvLyBpbnZlcnQgeSBheGlzXG5cdFx0dGhpcy5vYmplY3QzRC5hZGQgPSAoc3ViT2JqKSA9PiB7IC8vIGFuZCByZS1pbnZlcnQgdGhlIHkgYXhpcyBvZiBpdHMgY2hpbGRyZW5cblx0XHRcdFRIUkVFLk9iamVjdDNELnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLm9iamVjdDNELCBzdWJPYmopO1xuXHRcdFx0c3ViT2JqLnNjYWxlLnkgPSAtMTtcblx0XHR9O1xuXHRcdHRoaXMub24oJ3NpemUnKS50YWtlV2hpbGUodGhpcy5vbigndGhyZWVETW9kZScpKS5vblZhbHVlKChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSAtc2l6ZS53aWR0aCAvIDIgKyAxO1xuXHRcdFx0dGhpcy5vYmplY3QzRC5wb3NpdGlvbi55ID0gc2l6ZS5oZWlnaHQgLyAyIC0gMTtcblx0XHR9KTtcblxuXG5cdFx0LyogZmxvYXRpbmcgdGlsZW1hcCAqL1xuXHRcdHZhciBpbml0aWFsQ2lyY3VpdGJvYXJkUGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudCgpO1xuXHRcdHZhciBpbml0aWFsQ2lyY3VpdGJvYXJkUG9zaXRpb25pbmcgPSB7XG5cdFx0XHRsZWZ0OiB0aGlzLmVsZW1lbnQuY3NzKCdsZWZ0JyksXG5cdFx0XHR0b3A6IHRoaXMuZWxlbWVudC5jc3MoJ3RvcCcpLFxuXHRcdFx0cmlnaHQ6IHRoaXMuZWxlbWVudC5jc3MoJ3JpZ2h0JyksXG5cdFx0XHRib3R0b206IHRoaXMuZWxlbWVudC5jc3MoJ2JvdHRvbScpXG5cdFx0fTtcblx0XHR0aGlzLm9uZSgndGhyZWVETW9kZScsIGZhbHNlLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmVsZW1lbnQuZGV0YWNoKCkuYXBwZW5kVG8oaW5pdGlhbENpcmN1aXRib2FyZFBhcmVudClcblx0XHRcdFx0XHQuY3NzKHtcblx0XHRcdFx0XHRcdCd3aWR0aCc6ICdhdXRvJyxcblx0XHRcdFx0XHRcdCdoZWlnaHQnOiAnYXV0bycsXG5cdFx0XHRcdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybSc6ICcnLFxuXHRcdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtJzogJydcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jc3MoaW5pdGlhbENpcmN1aXRib2FyZFBvc2l0aW9uaW5nKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wX3RocmVlRF9jaXJjdWl0Ym9hcmQ7XG5cdFx0fSk7XG5cdFx0dGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KHRoaXMuZWxlbWVudFswXSk7XG5cdFx0dGhpcy5lbGVtZW50LmNzcyh7IGxlZnQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogMCB9KTtcblx0XHR0aGlzLl9wX3RocmVlRF9zY2VuZS5hZGQodGhpcy5fcF90aHJlZURfY2lyY3VpdGJvYXJkKTtcblxuXG5cdFx0LyogdGlsZW1hcCBiYWNrZmFjZSAqL1xuXHRcdHZhciBiYWNrZmFjZUVsZW1lbnQgPSAkKCc8ZGl2PicpLmNzcyh7XG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdGJvcmRlcjogJ3NvbGlkIDFweCBibGFjaycsXG5cdFx0XHRiYWNrZmFjZVZpc2liaWxpdHk6ICdoaWRkZW4nXG5cdFx0fSk7XG5cdFx0dmFyIGJhY2tmYWNlID0gbmV3IFRIUkVFLkNTUzNET2JqZWN0KGJhY2tmYWNlRWxlbWVudFswXSk7XG5cdFx0YmFja2ZhY2Uucm90YXRpb24uc2V0KE1hdGguUEksIDAsIDApO1xuXHRcdHRoaXMuX3BfdGhyZWVEX3NjZW5lLmFkZChiYWNrZmFjZSk7XG5cblxuXHRcdC8qIHJlc3BvbmQgdG8gcmVzaXplICovXG5cdFx0dGhpcy5vbigndGhyZWVEQ2FudmFzU2l6ZScpLnRha2VXaGlsZSh0aGlzLm9uKCd0aHJlZURNb2RlJykpLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHQvKiBzaXppbmcgYW5kIHBvc2l0aW9uaW5nIG9mIHRoZSBjaXJjdWl0LWJvYXJkIGFuZCBiYWNrZmFjZSAqL1xuXHRcdFx0dmFyIG5ld0NpcmN1aXRib2FyZFNpemUgPSB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnJpZ2h0LFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLnRvcCAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4uYm90dG9tXG5cdFx0XHR9O1xuXHRcdFx0dmFyIG5ld0NpcmN1aXRib2FyZFBvc2l0aW9uID0ge1xuXHRcdFx0XHR4OiAwLjUgKiAodGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5sZWZ0IC0gdGhpcy5fcF90aHJlZURfaW5pdGlhbE1hcmdpbi5yaWdodCksXG5cdFx0XHRcdHk6IDAuNSAqICh0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmJvdHRvbSAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wKVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5lbGVtZW50LmNzcyhuZXdDaXJjdWl0Ym9hcmRTaXplKTtcblx0XHRcdFUuZXh0ZW5kKHRoaXMuX3BfdGhyZWVEX2NpcmN1aXRib2FyZC5wb3NpdGlvbiwgbmV3Q2lyY3VpdGJvYXJkUG9zaXRpb24pO1xuXHRcdFx0VS5leHRlbmQodGhpcy5vYmplY3QzRC5wb3NpdGlvbiwge1xuXHRcdFx0XHR4OiBuZXdDaXJjdWl0Ym9hcmRQb3NpdGlvbi54IC0gdGhpcy5zaXplLndpZHRoIC8gMixcblx0XHRcdFx0eTogbmV3Q2lyY3VpdGJvYXJkUG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHQgLyAyXG5cdFx0XHR9KTtcblxuXHRcdFx0YmFja2ZhY2VFbGVtZW50LmNzcyhuZXdDaXJjdWl0Ym9hcmRTaXplKTtcblx0XHRcdFUuZXh0ZW5kKGJhY2tmYWNlLnBvc2l0aW9uLCBuZXdDaXJjdWl0Ym9hcmRQb3NpdGlvbik7XG5cblx0XHRcdC8qIHNldCB0aGUgY2FtZXJhIGRpc3RhbmNlIHRvIGNvcnJlc3BvbmQgKi9cblx0XHRcdHRoaXMuX3BfdGhyZWVEX2NvbnRyb2xzLnNldENhbWVyYURpc3RhbmNlKFxuXHRcdFx0XHRcdHRoaXMudGhyZWVEQ2FudmFzU2l6ZS5oZWlnaHQgL1xuXHRcdFx0XHRcdCgyICogTWF0aC50YW4oVEhSRUUuTWF0aC5kZWdUb1JhZCh0aGlzLmNhbWVyYTNELmZvdikgLyAyKSlcblx0XHRcdCk7XG5cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qIGB0cmFuc2xhdGVQb3NpdGlvbkZyb21DYW52YXNUb0NpcmN1aXRib2FyZGAgaGFzIG5vIHNpZGUtZWZmZWN0cyBhbmQgY2FuIGJlIHVzZWQgICAqL1xuXHQvKiAgZnJvbSB0aGUgb3V0c2lkZSB0byB0cmFuc2xhdGUgbGVmdC90b3AgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlbiB0byBsZWZ0L3RvcCAgICAgKi9cblx0LyogIGNvb3JkaW5hdGVzIG9mIHRoZSBwcml2YXRlIGNvb3JkaW5hdGUtc3lzdGVtIG9mIHRoZSBjaXJjdWl0Ym9hcmQsIGhvd2V2ZXIgaXQgaXMgICovXG5cdC8qICBvcmllbnRlZCBpbiAzRCBzcGFjZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLnRyYW5zbGF0ZVBvc2l0aW9uRnJvbUNhbnZhc1RvQ2lyY3VpdGJvYXJkJywgZnVuY3Rpb24gKHBvc2l0aW9uT25DYW52YXMpIHtcblxuXHRcdHRoaXMuY2FtZXJhM0QudXBkYXRlTWF0cml4V29ybGQoKTtcblx0XHR0aGlzLmNhbWVyYTNELnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdHZhciBtb3VzZTNEID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRtb3VzZTNELnggPSBwb3NpdGlvbk9uQ2FudmFzLmxlZnQgLyB0aGlzLnRocmVlRENhbnZhc1NpemUud2lkdGggKiAyIC0gMTtcblx0XHRtb3VzZTNELnkgPSAtcG9zaXRpb25PbkNhbnZhcy50b3AgLyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0ICogMiArIDE7XG5cdFx0bW91c2UzRC56ID0gMC41O1xuXHRcdFBST0pFQ1RPUi51bnByb2plY3RWZWN0b3IobW91c2UzRCwgdGhpcy5jYW1lcmEzRCk7XG5cdFx0dmFyIHJheSA9IG5ldyBUSFJFRS5SYXkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbiwgbW91c2UzRC5zdWIodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikubm9ybWFsaXplKCkpO1xuXHRcdHZhciBpbnRlcnNlY3RzID0gcmF5LmludGVyc2VjdFBsYW5lKFBMQU5FKTtcblxuXHRcdC8qIGlmIHRoZSB0ZXN0ZWQgaW50ZXJzZWN0aW9uIGlzIG91dCBvZiByYW5nZSwgcmV0dXJuIHVuZGVmaW5lZCAqL1xuXHRcdGlmICghaW50ZXJzZWN0cykgeyByZXR1cm4gfVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGxlZnQ6IGludGVyc2VjdHMueCArIHRoaXMudGhyZWVEQ2FudmFzU2l6ZS53aWR0aCAvIDIgLSB0aGlzLl9wX3RocmVlRF9pbml0aWFsTWFyZ2luLmxlZnQsXG5cdFx0XHR0b3A6IC1pbnRlcnNlY3RzLnkgKyB0aGlzLnRocmVlRENhbnZhc1NpemUuaGVpZ2h0IC8gMiAtIHRoaXMuX3BfdGhyZWVEX2luaXRpYWxNYXJnaW4udG9wXG5cdFx0fTtcblxuXHR9KTtcblxuXG5cdC8qIGFydGVmYWN0LXNwZWNpZmljIG9iamVjdDNEIG9iamVjdHMgKi9cblx0cGx1Z2luLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogY3JlYXRlIHRoZSAzRCBvYmplY3QgZm9yIHRoaXMgdGlsZSAqL1xuXHRcdHRoaXMub2JqZWN0M0QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHR0aGlzLmNpcmN1aXRib2FyZC5vYmplY3QzRC5hZGQodGhpcy5vYmplY3QzRCk7XG5cblx0XHQvKiBwb3NpdGlvbiBpdCBhbHdheXMgaW4gdGhlIGNlbnRlciBvZiB0aGUgdGlsZSAqL1xuXHRcdCgocmVzZXQpID0+IHtcblx0XHRcdHRoaXMub24oJ3Bvc2l0aW9uJywgcmVzZXQpO1xuXHRcdFx0dGhpcy5vbignc2l6ZScsIHJlc2V0KTtcblx0XHR9KSgoKSA9PiB7XG5cdFx0XHR0aGlzLm9iamVjdDNELnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLmxlZnQgKyB0aGlzLnNpemUud2lkdGggLyAyO1xuXHRcdFx0dGhpcy5vYmplY3QzRC5wb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi50b3AgKyB0aGlzLnNpemUuaGVpZ2h0IC8gMjtcblx0XHR9KTtcblxuXHRcdC8qIGhpZGUgaXQgd2hlbiB0aGUgdGlsZSBpcyBoaWRkZW4gKi9cblx0XHR0aGlzLm9uKCd2aXNpYmxlJywgKHZpc2libGUpID0+IHsgdGhpcy5vYmplY3QzRC52aXNpYmxlID0gdmlzaWJsZSB9KTtcblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC10aHJlZS1kLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdiYWNvbiddLCAoUCwgQmFjb24pID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHQoKGYpID0+IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkpO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKFN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtTdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5iaW5kKHRoaXMpXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgaXRlcmF0aW9uRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRzaW5rKCk7XG5cdFx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oaXRlcmF0aW9uRm4pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8qIHN0YXJ0IGl0IG5vdyAqL1xuXHRcdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdFx0c2luayhuZXcgQmFjb24uRW5kKCkpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEudG9wID09PSBiLnRvcCAmJiBhLmxlZnQgPT09IGIubGVmdDtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uIChUSFJFRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGh0dHA6Ly93d3cuZW1hZ2l4Lm5ldC9hY2FkZW1pYy9tc2NzLXByb2plY3QvaXRlbS9jYW1lcmEtc3luYy13aXRoLWNzczMtYW5kLXdlYmdsLXRocmVlanNcblx0ICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cblx0ICovXG5cblx0VEhSRUUuQ1NTM0RPYmplY3QgPSBmdW5jdGlvbiAoIGVsZW1lbnQgKSB7XG5cblx0XHRUSFJFRS5PYmplY3QzRC5jYWxsKCB0aGlzICk7XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdyZW1vdmVkJywgZnVuY3Rpb24gKCAvKmV2ZW50Ki8gKSB7XG5cblx0XHRcdGlmICggdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0fTtcblxuXHRUSFJFRS5DU1MzRE9iamVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUSFJFRS5PYmplY3QzRC5wcm90b3R5cGUgKTtcblxuXHRUSFJFRS5DU1MzRFNwcml0ZSA9IGZ1bmN0aW9uICggZWxlbWVudCApIHtcblxuXHRcdFRIUkVFLkNTUzNET2JqZWN0LmNhbGwoIHRoaXMsIGVsZW1lbnQgKTtcblxuXHR9O1xuXG5cdFRIUkVFLkNTUzNEU3ByaXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFRIUkVFLkNTUzNET2JqZWN0LnByb3RvdHlwZSApO1xuXG5cdC8vXG5cblx0VEhSRUUuQ1NTM0RSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGNvbnNvbGUubG9nKCAnVEhSRUUuQ1NTM0RSZW5kZXJlcicsIFRIUkVFLlJFVklTSU9OICk7XG5cblx0XHR2YXIgX3dpZHRoLCBfaGVpZ2h0O1xuXHRcdHZhciBfd2lkdGhIYWxmLCBfaGVpZ2h0SGFsZjtcblxuXHRcdHZhciBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0dmFyIGNhY2hlID0ge1xuXHRcdFx0Y2FtZXJhOiB7IGZvdjogMCwgc3R5bGU6ICcnIH0sXG5cdFx0XHRvYmplY3RzOiB7fVxuXHRcdH07XG5cblx0XHR2YXIgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdFx0ZG9tRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cdFx0Ly9kb21FbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2RvbUVsZW1lbnQuc3R5bGUuTW96VHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdC8vZG9tRWxlbWVudC5zdHlsZS5vVHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXHRcdGRvbUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSAncHJlc2VydmUtM2QnO1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFx0dGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcblxuXHRcdHZhciBjYW1lcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuXHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5XZWJraXRUcmFuc2Zvcm1TdHlsZSA9ICdwcmVzZXJ2ZS0zZCc7XG5cdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLk1velRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUub1RyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcblxuXHRcdGRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNhbWVyYUVsZW1lbnQgKTtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXHRcdHRoaXMuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoIHdpZHRoLCBoZWlnaHQgKSB7XG5cblx0XHRcdF93aWR0aCA9IHdpZHRoO1xuXHRcdFx0X2hlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0X3dpZHRoSGFsZiA9IF93aWR0aCAvIDI7XG5cdFx0XHRfaGVpZ2h0SGFsZiA9IF9oZWlnaHQgLyAyO1xuXG5cdFx0XHRkb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0ZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0XHRjYW1lcmFFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuXHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG5cdFx0fTtcblxuXHRcdHZhciBlcHNpbG9uID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG5cblx0XHR9O1xuXG5cdFx0dmFyIGdldENhbWVyYUNTU01hdHJpeCA9IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRcdHJldHVybiAnbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgZ2V0T2JqZWN0Q1NTTWF0cml4ID0gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdFx0cmV0dXJuICd0cmFuc2xhdGUzZCgtNTAlLC01MCUsMCkgbWF0cml4M2QoJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDQgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggLSBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCAtIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIC0gZWxlbWVudHNbIDcgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDkgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcblx0XHRcdFx0ZXBzaWxvbiggZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG5cdFx0XHRcdGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuXHRcdFx0XHRlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcblx0XHRcdCcpJztcblxuXHRcdH07XG5cblx0XHR2YXIgcmVuZGVyT2JqZWN0ID0gZnVuY3Rpb24gKCBvYmplY3QsIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRE9iamVjdCApIHtcblxuXHRcdFx0XHR2YXIgc3R5bGU7XG5cblx0XHRcdFx0aWYgKCBvYmplY3QgaW5zdGFuY2VvZiBUSFJFRS5DU1MzRFNwcml0ZSApIHtcblxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9zd2lmdGNvZGVyLndvcmRwcmVzcy5jb20vMjAwOC8xMS8yNS9jb25zdHJ1Y3RpbmctYS1iaWxsYm9hcmQtbWF0cml4L1xuXG5cdFx0XHRcdFx0bWF0cml4LmNvcHkoIGNhbWVyYS5tYXRyaXhXb3JsZEludmVyc2UgKTtcblx0XHRcdFx0XHRtYXRyaXgudHJhbnNwb3NlKCk7XG5cdFx0XHRcdFx0bWF0cml4LmNvcHlQb3NpdGlvbiggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cdFx0XHRcdFx0bWF0cml4LnNjYWxlKCBvYmplY3Quc2NhbGUgKTtcblxuXHRcdFx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMyBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDcgXSA9IDA7XG5cdFx0XHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMSBdID0gMDtcblx0XHRcdFx0XHRtYXRyaXguZWxlbWVudHNbIDE1IF0gPSAxO1xuXG5cdFx0XHRcdFx0c3R5bGUgPSBnZXRPYmplY3RDU1NNYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRzdHlsZSA9IGdldE9iamVjdENTU01hdHJpeCggb2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZWxlbWVudCA9IG9iamVjdC5lbGVtZW50O1xuXHRcdFx0XHR2YXIgY2FjaGVkU3R5bGUgPSBjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXTtcblxuXHRcdFx0XHRpZiAoIGNhY2hlZFN0eWxlID09PSB1bmRlZmluZWQgfHwgY2FjaGVkU3R5bGUgIT09IHN0eWxlICkge1xuXG5cdFx0XHRcdFx0Ly9lbGVtZW50LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdC8vZWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0XHQvL2VsZW1lbnQuc3R5bGUub1RyYW5zZm9ybSA9IHN0eWxlO1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gc3R5bGU7XG5cblx0XHRcdFx0XHRjYWNoZS5vYmplY3RzWyBvYmplY3QuaWQgXSA9IHN0eWxlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY2FtZXJhRWxlbWVudCApIHtcblxuXHRcdFx0XHRcdGNhbWVyYUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRcdFx0cmVuZGVyT2JqZWN0KCBvYmplY3QuY2hpbGRyZW5bIGkgXSwgY2FtZXJhICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0XHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICggc2NlbmUsIGNhbWVyYSApIHtcblxuXHRcdFx0dmFyIGZvdiA9IDAuNSAvIE1hdGgudGFuKCBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBjYW1lcmEuZm92ICogMC41ICkgKSAqIF9oZWlnaHQ7XG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLmZvdiAhPT0gZm92ICkge1xuXG5cdFx0XHRcdC8vZG9tRWxlbWVudC5zdHlsZS5XZWJraXRQZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcblx0XHRcdFx0Ly9kb21FbGVtZW50LnN0eWxlLk1velBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHQvL2RvbUVsZW1lbnQuc3R5bGUub1BlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXHRcdFx0XHRkb21FbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xuXG5cdFx0XHRcdGNhY2hlLmNhbWVyYS5mb3YgPSBmb3Y7XG5cblx0XHRcdH1cblxuXHRcdFx0c2NlbmUudXBkYXRlTWF0cml4V29ybGQoKTtcblxuXHRcdFx0aWYgKCBjYW1lcmEucGFyZW50ID09PSB1bmRlZmluZWQgKSB7IGNhbWVyYS51cGRhdGVNYXRyaXhXb3JsZCgpIH1cblxuXHRcdFx0Y2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZS5nZXRJbnZlcnNlKCBjYW1lcmEubWF0cml4V29ybGQgKTtcblxuXHRcdFx0dmFyIHN0eWxlID0gXCJ0cmFuc2xhdGUzZCgwLDAsXCIgKyBmb3YgKyBcInB4KVwiICsgZ2V0Q2FtZXJhQ1NTTWF0cml4KCBjYW1lcmEubWF0cml4V29ybGRJbnZlcnNlICkgK1xuXHRcdFx0XHRcIiB0cmFuc2xhdGUzZChcIiArIF93aWR0aEhhbGYgKyBcInB4LFwiICsgX2hlaWdodEhhbGYgKyBcInB4LCAwKVwiO1xuXG5cblx0XHRcdGlmICggY2FjaGUuY2FtZXJhLnN0eWxlICE9PSBzdHlsZSApIHtcblxuXHRcdFx0XHQvL2NhbWVyYUVsZW1lbnQuc3R5bGUuV2Via2l0VHJhbnNmb3JtID0gc3R5bGU7XG5cdFx0XHRcdC8vY2FtZXJhRWxlbWVudC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Ly9jYW1lcmFFbGVtZW50LnN0eWxlLm9UcmFuc2Zvcm0gPSBzdHlsZTtcblx0XHRcdFx0Y2FtZXJhRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcblxuXHRcdFx0XHRjYWNoZS5jYW1lcmEuc3R5bGUgPSBzdHlsZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZW5kZXJPYmplY3QoIHNjZW5lLCBjYW1lcmEgKTtcblxuXHRcdH07XG5cblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL0NTUzNEUmVuZGVyZXIuanNcbiAqKi8iLCIvKipcbiAqIEBhdXRob3IgRWJlcmhhcmQgR3JhZXRoZXIgICAgIChodHRwOi8vZWdyYWV0aGVyLmNvbSlcbiAqIEBhdXRob3IgTWFyayBMdW5kaW4gICAgICAgICAgIChodHRwOi8vbWFyay1sdW5kaW4uY29tKVxuICogQGF1dGhvciBNaWNoaWVsIEhlbHZlbnN0ZWlqbiAgKGh0dHA6Ly9taGVsdmVucy5uZXQpXG4gKi9cblxuZGVmaW5lKFsnanF1ZXJ5JywgJ3RocmVlLWpzJywgJ2RlbHRhLWpzJywgJy4vbWlzYy5qcyddLCAoJCwgVEhSRUUsIERlbHRhTW9kZWwsIFUpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogY29uc3RhbnRzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBTVEFURSA9IHsgTk9ORTogLTEsIFJPVEFURTogMCwgWk9PTTogMSwgUEFOOiAyLCBUT1VDSF9ST1RBVEU6IDMsIFRPVUNIX1pPT01fUEFOOiA0IH07XG5cdHZhciBDSEFOR0VfRVZFTlQgPSB7IHR5cGU6ICdjaGFuZ2UnIH07XG5cdHZhciBTVEFSVF9FVkVOVCAgPSB7IHR5cGU6ICdzdGFydCcgfTtcblx0dmFyIEVORF9FVkVOVCAgICA9IHsgdHlwZTogJ2VuZCcgfTtcblxuXG5cdC8qIGRlbHRhIG1vZGVsICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0dmFyIGRtID0gbmV3IERlbHRhTW9kZWwoKTtcblxuXG5cdC8qIGNvcmUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdjb3JlJywge1xuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiAnY29uc3RydWN0JyBtZXRob2QgY29yZSAqL1xuXHRcdFx0LmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKGNvbnRyb2xsZWRPYmplY3QsIGRvbUVsZW1lbnQpIHtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdCA9IGNvbnRyb2xsZWRPYmplY3Q7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuXHRcdFx0fSlcblx0XHQvKiBBUEkgKi9cblx0XHRcdC5hcHBlbmQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG5cdFx0XHR9KVxuXHRcdC8qIHByaXZhdGUgZmllbGRzICovXG5cdFx0XHQuYXBwZW5kKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl92ZWxvY2l0eSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0dGhpcy5fZXllID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLl96b29tU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IDA7XG5cdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gMDtcblx0XHRcdFx0dGhpcy5fcGFuU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl9wYW5FbmQgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHR0aGlzLl9zY3JlZW4gPSB7IGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuXHRcdFx0XHR0aGlzLl90YXJnZXRDb29yZGluYXRlczAgPSB0aGlzLl90YXJnZXRDb29yZGluYXRlcy5jbG9uZSgpO1xuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbjAgPSB0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmNsb25lKCk7XG5cdFx0XHRcdHRoaXMuX3VwMCA9IHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXAuY2xvbmUoKTtcblxuXHRcdFx0fSlcblx0XHQvKiBwdWJsaWMgbWV0aG9kcyAqL1xuXHRcdFx0LmFkZCgncmVzZXQnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXG5cdFx0XHRcdHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLmNvcHkodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMwKTtcblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5jb3B5KHRoaXMuX3Bvc2l0aW9uMCk7XG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXAuY29weSh0aGlzLl91cDApO1xuXG5cdFx0XHRcdHRoaXMuX3ZlbG9jaXR5LnNldCgwLCAwLCAwKTtcblxuXHRcdFx0XHR0aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLCB0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5sb29rQXQodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDSEFOR0VfRVZFTlQpO1xuXG5cdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pO1xuXG5cdFx0XHR9KS5hZGQoJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9leWUuc3ViVmVjdG9ycyh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLCB0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0dGhpcy5yb3RhdGVDYW1lcmEoKTtcblx0XHRcdFx0dGhpcy56b29tQ2FtZXJhKCk7XG5cdFx0XHRcdHRoaXMucGFuQ2FtZXJhKCk7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5hZGRWZWN0b3JzKHRoaXMuX3RhcmdldENvb3JkaW5hdGVzLCB0aGlzLl9leWUpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QubG9va0F0KHRoaXMuX3RhcmdldENvb3JkaW5hdGVzKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fbGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pID4gRVBTKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENIQU5HRV9FVkVOVCk7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdFBvc2l0aW9uLmNvcHkodGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmFkZCh0aGlzLl92ZWxvY2l0eSk7XG5cdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5sb29rQXQodGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMpO1xuXHRcdFx0XHRcdHRoaXMuX2xhc3RQb3NpdGlvbi5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuYWRkKCdoYW5kbGVSZXNpemUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2RvbUVsZW1lbnQgPT09IGRvY3VtZW50KSB7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmxlZnQgPSAwO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi50b3AgPSAwO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGJveCA9IHRoaXMuX2RvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0Ly8gYWRqdXN0bWVudHMgY29tZSBmcm9tIHNpbWlsYXIgY29kZSBpbiB0aGUganF1ZXJ5IG9mZnNldCgpIGZ1bmN0aW9uXG5cdFx0XHRcdFx0dmFyIGQgPSB0aGlzLl9kb21FbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRcdHRoaXMuX3NjcmVlbi5sZWZ0ID0gYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkLmNsaWVudExlZnQ7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLnRvcCA9IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBkLmNsaWVudFRvcDtcblx0XHRcdFx0XHR0aGlzLl9zY3JlZW4ud2lkdGggPSBib3gud2lkdGg7XG5cdFx0XHRcdFx0dGhpcy5fc2NyZWVuLmhlaWdodCA9IGJveC5oZWlnaHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cblxuXHQvKiBtb3VzZSBldmVudCBtZXRob2QgY29yZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnbW91c2UtZXZlbnRzJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuZW5hYmxlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuTk9ORSkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0ge1xuXHRcdFx0XHRcdFx0MDogU1RBVEUuUk9UQVRFLFxuXHRcdFx0XHRcdFx0MTogU1RBVEUuWk9PTSxcblx0XHRcdFx0XHRcdDI6IFNUQVRFLlBBTlxuXHRcdFx0XHRcdH1bZXZlbnQuYnV0dG9uXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBtb3VzZW1vdmUgPSAoZSkgPT4geyB0aGlzLm1vdXNlbW92ZShlKSB9O1xuXHRcdFx0XHR2YXIgbW91c2V1cCA9ICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cCk7XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KFNUQVJUX0VWRU5UKTtcblxuXHRcdFx0fSkuYWRkKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuXHRcdFx0fSkuYWRkKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChTVEFSVF9FVkVOVCk7XG5cblx0XHRcdH0pLmFkZCgndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHRpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuTk9ORTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5lbmFibGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0dGhpcy5fc3RhdGUgPSBTVEFURS5OT05FO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIGdldE1vdXNlT25TY3JlZW5cblxuXHRcdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0dGhpcy5nZXRNb3VzZU9uU2NyZWVuID0gZnVuY3Rpb24gZ2V0TW91c2VPblNjcmVlbihwYWdlWCwgcGFnZVkpIHtcblx0XHRcdFx0XHR2ZWN0b3Iuc2V0KFxuXHRcdFx0XHRcdFx0XHQocGFnZVggLSB0aGlzLl9zY3JlZW4ubGVmdCkgLyB0aGlzLl9zY3JlZW4ud2lkdGgsXG5cdFx0XHRcdFx0XHRcdChwYWdlWSAtIHRoaXMuX3NjcmVlbi50b3ApIC8gdGhpcy5fc2NyZWVuLmhlaWdodFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuIHZlY3Rvcjtcblx0XHRcdFx0fTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7IC8vIGdldE1vdXNlUHJvamVjdGlvbk9uQmFsbFxuXHRcdFx0XHR2YXIgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIG9iamVjdFVwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0dGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwgPSBmdW5jdGlvbiBnZXRNb3VzZVByb2plY3Rpb25PbkJhbGwocGFnZVgsIHBhZ2VZKSB7XG5cblx0XHRcdFx0XHRtb3VzZU9uQmFsbC5zZXQoXG5cdFx0XHRcdFx0XHRcdChwYWdlWCAtIHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSAtIHRoaXMuX3NjcmVlbi5sZWZ0KSAvICh0aGlzLl9zY3JlZW4ud2lkdGggKiAwLjUpLFxuXHRcdFx0XHRcdFx0XHQodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSArIHRoaXMuX3NjcmVlbi50b3AgLSBwYWdlWSkgLyAodGhpcy5fc2NyZWVuLmhlaWdodCAqIDAuNSksXG5cdFx0XHRcdFx0XHRcdDAuMFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHR2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG5cblx0XHRcdFx0XHRpZiAobGVuZ3RoID4gMS4wKSB7XG5cdFx0XHRcdFx0XHRtb3VzZU9uQmFsbC5ub3JtYWxpemUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bW91c2VPbkJhbGwueiA9IE1hdGguc3FydCgxLjAgLSBsZW5ndGggKiBsZW5ndGgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX2V5ZS5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QucG9zaXRpb24pLnN1Yih0aGlzLl90YXJnZXRDb29yZGluYXRlcyk7XG5cblx0XHRcdFx0XHR2ZWN0b3IuY29weSh0aGlzLl9jb250cm9sbGVkT2JqZWN0LnVwKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueSk7XG5cdFx0XHRcdFx0dmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLmNyb3NzKHRoaXMuX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcblx0XHRcdFx0XHR2ZWN0b3IuYWRkKHRoaXMuX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZlY3RvcjtcblxuXHRcdFx0XHR9O1xuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4geyB0aGlzLm1vdXNlZG93bihlKSB9KTtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHsgdGhpcy50b3VjaHN0YXJ0KGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7IHRoaXMudG91Y2htb3ZlKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHsgdGhpcy50b3VjaGVuZChlKSB9KTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiBrZXlib2FyZCBldmVudCBtZXRob2QgY29yZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgna2V5Ym9hcmQtZXZlbnRzJywge1xuXHRcdGFmdGVyOiBbJ2NvcmUnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdrZXlib2FyZFZlbG9jaXR5JywgKCkgPT4gMTApXG5cdFx0XHQuYWRkKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5fc3RhdGUgIT09IFNUQVRFLk5PTkUpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHR2YXIgZCA9IHRoaXMua2V5Ym9hcmRWZWxvY2l0eSgpO1xuXHRcdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0XHRjYXNlIDM3OiB7IHRoaXMuX3ZlbG9jaXR5LnggPSAgZCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMzg6IHsgdGhpcy5fdmVsb2NpdHkueSA9ICBkIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzOTogeyB0aGlzLl92ZWxvY2l0eS54ID0gLWQgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDQwOiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAtZCB9IGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0XHRjYXNlIDM3OiB7IHRoaXMuX3ZlbG9jaXR5LnggPSAwIH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAzODogeyB0aGlzLl92ZWxvY2l0eS55ID0gMCB9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMzk6IHsgdGhpcy5fdmVsb2NpdHkueCA9IDAgfSBicmVhaztcblx0XHRcdFx0XHRjYXNlIDQwOiB7IHRoaXMuX3ZlbG9jaXR5LnkgPSAwIH0gYnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0JCh3aW5kb3cpLm9uKCdrZXlkb3duJywgKGUpID0+IHsgdGhpcy5rZXlkb3duKGUpIH0pO1xuXHRcdFx0XHQkKHdpbmRvdykub24oJ2tleXVwJywgICAoZSkgPT4geyB0aGlzLmtleXVwKGUpICAgfSk7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyogcm90YXRlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3JvdGF0ZScsIHtcblx0XHRhZnRlcjogWydjb3JlJywgJ21vdXNlLWV2ZW50cyddLFxuXHRcdGlmOiB0cnVlXG5cdH0pLm1vZGlmeSgnVHJhY2tiYWxsQ29udHJvbHMucHJvdG90eXBlJylcblx0XHQvKiBtb3VzZSBldmVudHMgKi9cblx0XHRcdC5hcHBlbmQoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9zdGF0ZSA9PT0gU1RBVEUuUk9UQVRFKSB7XG5cdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLmdldE1vdXNlUHJvamVjdGlvbk9uQmFsbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuY29weSh0aGlzLl9yb3RhdGVTdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlJPVEFURSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFwcGVuZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuVE9VQ0hfUk9UQVRFO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZVByb2plY3Rpb25PbkJhbGwoZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuX3JvdGF0ZVN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdGF0ZUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpKTtcblx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5jb3B5KHRoaXMuX3JvdGF0ZUVuZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSlcblx0XHQvKiByb3RhdGluZyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkgeyAvLyByb3RhdGVDYW1lcmFcblx0XHRcdFx0dmFyIGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cdFx0XHRcdHRoaXMucm90YXRlQ2FtZXJhID0gZnVuY3Rpb24gcm90YXRlQ2FtZXJhKCkge1xuXG5cdFx0XHRcdFx0dmFyIGFuZ2xlID0gTWF0aC5hY29zKFxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVTdGFydC5kb3QodGhpcy5fcm90YXRlRW5kKSAvXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JvdGF0ZVN0YXJ0Lmxlbmd0aCgpIC9cblx0XHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlRW5kLmxlbmd0aCgpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRcdGF4aXMuY3Jvc3NWZWN0b3JzKHRoaXMuX3JvdGF0ZVN0YXJ0LCB0aGlzLl9yb3RhdGVFbmQpLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRcdFx0XHRhbmdsZSAqPSB0aGlzLnJvdGF0ZVNwZWVkO1xuXG5cdFx0XHRcdFx0XHRxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoYXhpcywgLWFuZ2xlKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcblx0XHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXAuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9yb3RhdGVFbmQuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuXHRcdFx0XHRcdFx0dGhpcy5fcm90YXRlU3RhcnQuY29weSh0aGlzLl9yb3RhdGVFbmQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHQvKiByb3RhdGluZyBvcHRpb25zICovXG5cdFx0XHQuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5yb3RhdGVTcGVlZCA9IDEuMDtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiB6b29tICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdG5ldyBkbS5EZWx0YSgnem9vbScsIHtcblx0XHRhZnRlcjogWydtb3VzZS1ldmVudHMnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlpPT00pIHtcblx0XHRcdFx0XHR0aGlzLl96b29tU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKSk7XG5cdFx0XHRcdFx0dGhpcy5fem9vbUVuZC5jb3B5KHRoaXMuX3pvb21TdGFydCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuYXBwZW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3N0YXRlID09PSBTVEFURS5aT09NKSB7XG5cdFx0XHRcdFx0dGhpcy5fem9vbUVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ21vdXNld2hlZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5lbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdHZhciBkaWZmID0gMDtcblx0XHRcdFx0aWYgKGV2ZW50LndoZWVsRGVsdGEpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XG5cdFx0XHRcdFx0ZGlmZiA9IGV2ZW50LndoZWVsRGVsdGEgLyA0MDtcblx0XHRcdFx0fSBlbHNlIGlmIChldmVudC5kZXRhaWwpIHsgLy8gRmlyZWZveFxuXHRcdFx0XHRcdGRpZmYgPSAtZXZlbnQuZGV0YWlsIC8gMztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3pvb21TdGFydC55ICs9IGRpZmYgKiAwLjAxO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoU1RBUlRfRVZFTlQpO1xuXHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoRU5EX0VWRU5UKTtcblxuXHRcdFx0fSkuaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKGUpID0+IHsgdGhpcy5tb3VzZXdoZWVsKGUpIH0pO1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgKGUpID0+IHsgdGhpcy5tb3VzZXdoZWVsKGUpIH0pOyAvLyBmaXJlZm94XG5cblx0XHRcdH0pXG5cdFx0Lyogem9vbWluZyAqL1xuXHRcdFx0LmFkZCgnem9vbUNhbWVyYScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlRPVUNIX1pPT01fUEFOKSB7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VTdGFydCA9IHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kO1xuXHRcdFx0XHRcdHRoaXMuX2V5ZS5tdWx0aXBseVNjYWxhcih0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0IC8gdGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBmYWN0b3IgPSAxLjAgKyAoIHRoaXMuX3pvb21FbmQueSAtIHRoaXMuX3pvb21TdGFydC55ICkgKiB0aGlzLnpvb21TcGVlZDtcblx0XHRcdFx0XHRpZiAoZmFjdG9yICE9PSAxLjAgJiYgZmFjdG9yID4gMC4wKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcblx0XHRcdFx0XHRcdHRoaXMuX3pvb21TdGFydC5jb3B5KHRoaXMuX3pvb21FbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHpvb21pbmcgb3B0aW9ucyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuem9vbVNwZWVkID0gMS4yO1xuXG5cdFx0XHR9KTtcblxuXG5cdC8qIHBhbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0bmV3IGRtLkRlbHRhKCdwYW4nLCB7XG5cdFx0YWZ0ZXI6IFsnY29yZScsICdtb3VzZS1ldmVudHMnXSxcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0LyogbW91c2UgZXZlbnRzICovXG5cdFx0XHQuYXBwZW5kKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlBBTikge1xuXHRcdFx0XHRcdHRoaXMuX3BhblN0YXJ0LmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuX3BhblN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fc3RhdGUgPT09IFNUQVRFLlBBTikge1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KVxuXHRcdC8qIHBhbm5pbmcgKi9cblx0XHRcdC5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHsgLy8gcGFuQ2FtZXJhXG5cdFx0XHRcdHZhciBtb3VzZUNoYW5nZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdHZhciBwYW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHR0aGlzLnBhbkNhbWVyYSA9IGZ1bmN0aW9uIHBhbkNhbWVyYSgpIHtcblxuXHRcdFx0XHRcdG1vdXNlQ2hhbmdlLmNvcHkodGhpcy5fcGFuRW5kKS5zdWIodGhpcy5fcGFuU3RhcnQpO1xuXHRcdFx0XHRcdGlmIChtb3VzZUNoYW5nZS5sZW5ndGhTcSgpKSB7XG5cdFx0XHRcdFx0XHRtb3VzZUNoYW5nZS5tdWx0aXBseVNjYWxhcih0aGlzLl9leWUubGVuZ3RoKCkgKiB0aGlzLnBhblNwZWVkKTtcblx0XHRcdFx0XHRcdHBhbi5jb3B5KHRoaXMuX2V5ZSkuY3Jvc3ModGhpcy5fY29udHJvbGxlZE9iamVjdC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLngpO1xuXHRcdFx0XHRcdFx0cGFuLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuX2NvbnRyb2xsZWRPYmplY3QudXApLnNldExlbmd0aChtb3VzZUNoYW5nZS55KSk7XG5cdFx0XHRcdFx0XHR0aGlzLl9jb250cm9sbGVkT2JqZWN0LnBvc2l0aW9uLmFkZChwYW4pO1xuXHRcdFx0XHRcdFx0dGhpcy5fdGFyZ2V0Q29vcmRpbmF0ZXMuYWRkKHBhbik7XG5cdFx0XHRcdFx0XHR0aGlzLl9wYW5TdGFydC5jb3B5KHRoaXMuX3BhbkVuZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH07XG5cdFx0XHR9KVxuXHRcdC8qIHBhbm5pbmcgb3B0aW9ucyAqL1xuXHRcdFx0Lmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMucGFuU3BlZWQgPSAwLjM7XG5cblx0XHRcdH0pO1xuXG5cblx0Lyogem9vbSArIHBhbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ3pvb20rcGFuJywge1xuXHRcdGFmdGVyOiBbJ3pvb20nLCAncGFuJ10sXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdUcmFja2JhbGxDb250cm9scy5wcm90b3R5cGUnKVxuXHRcdC8qIG1vdXNlIGV2ZW50cyAqL1xuXHRcdFx0LmFwcGVuZCgndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXRlID0gU1RBVEUuVE9VQ0hfWk9PTV9QQU47XG5cdFx0XHRcdFx0dmFyIGR4ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVk7XG5cdFx0XHRcdFx0dGhpcy5fdG91Y2hab29tRGlzdGFuY2VFbmQgPSB0aGlzLl90b3VjaFpvb21EaXN0YW5jZVN0YXJ0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLmdldE1vdXNlT25TY3JlZW4oeCwgeSkpO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuX3BhblN0YXJ0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdHZhciBkeCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSBldmVudC50b3VjaGVzWzFdLnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSBldmVudC50b3VjaGVzWzFdLnBhZ2VZO1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlRW5kID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuXHRcdFx0XHRcdHZhciB4ID0gKCBldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCApIC8gMjtcblx0XHRcdFx0XHR2YXIgeSA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgKSAvIDI7XG5cdFx0XHRcdFx0dGhpcy5fcGFuRW5kLmNvcHkodGhpcy5nZXRNb3VzZU9uU2NyZWVuKHgsIHkpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hcHBlbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRcdHRoaXMuX3RvdWNoWm9vbURpc3RhbmNlU3RhcnQgPSB0aGlzLl90b3VjaFpvb21EaXN0YW5jZUVuZCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgeCA9ICggZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggKSAvIDI7XG5cdFx0XHRcdFx0dmFyIHkgPSAoIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgKyBldmVudC50b3VjaGVzWzFdLnBhZ2VZICkgLyAyO1xuXHRcdFx0XHRcdHRoaXMuX3BhbkVuZC5jb3B5KHRoaXMuZ2V0TW91c2VPblNjcmVlbih4LCB5KSk7XG5cdFx0XHRcdFx0dGhpcy5fcGFuU3RhcnQuY29weSh0aGlzLl9wYW5FbmQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cblx0LyogbGl0dGxlIGhhY2sgZm9yIGFwaW5hdG9teS1zcGVjaWZpYyBmdW5jdGlvbmFsaXR5ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRuZXcgZG0uRGVsdGEoJ2FwaW5hdG9teS1zcGVjaWZpYycsIHtcblx0XHRpZjogdHJ1ZVxuXHR9KS5tb2RpZnkoJ1RyYWNrYmFsbENvbnRyb2xzLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdzZXRDYW1lcmFEaXN0YW5jZScsIGZ1bmN0aW9uIHNldENhbWVyYURpc3RhbmNlKGRpc3RhbmNlKSB7XG5cblx0XHRcdFx0dGhpcy5fY29udHJvbGxlZE9iamVjdC5wb3NpdGlvbi5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihkaXN0YW5jZSk7XG5cblx0XHRcdH0pO1xuXG5cblx0LyogdGhlIFRyYWNrYmFsbENvbnRyb2xzIGNsYXNzICh2YXJpYXRpb24gcG9pbnQpICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRUSFJFRS5UcmFja2JhbGxDb250cm9scyA9IGRtLnZwKCdUcmFja2JhbGxDb250cm9scycsXG5cdFx0XHRVLm5ld0NsYXNzKGZ1bmN0aW9uIFRyYWNrYmFsbENvbnRyb2xzKGNvbnRyb2xsZWRPYmplY3QsIGRvbUVsZW1lbnQgPSBkb2N1bWVudCkge1xuXG5cdFx0XHRcdC8qIGFwcGx5IHRoZSBjb25zdHJ1Y3QgbWV0aG9kIHBvcHVsYXRlZCBieSBkZWx0YXMgKi9cblx0XHRcdFx0dGhpcy5jb25zdHJ1Y3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdFx0XHQvKiBleHBsaWNpdGx5IHVwZGF0ZSBpbiB0aGUgYmVnaW5uaW5nICovXG5cdFx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cblx0XHRcdH0sIE9iamVjdC5jcmVhdGUoVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZSkpXG5cdCk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL1RyYWNrYmFsbENvbnRyb2xzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aHJlZS1kLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGhyZWUtZC5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRocmVlLWQtY2FudmFzPmRpdj5kaXZ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDttYXJnaW46MDt6LWluZGV4OjA7cG9pbnRlci1ldmVudHM6bm9uZTt9LnRocmVlLWQtY2FudmFzPmRpdj5kaXY+LmNpcmN1aXRib2FyZHtwb2ludGVyLWV2ZW50czp2aXNpYmxlOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47fS50aHJlZS1kLWNhbnZhcz5kaXY+Y2FudmFze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7ei1pbmRleDoxO3BvaW50ZXItZXZlbnRzOm5vbmU7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRocmVlLWQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC5qcyJ9