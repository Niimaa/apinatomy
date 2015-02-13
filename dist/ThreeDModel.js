(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs", "kefir-jquery", "delta-js"], factory);
	else if(typeof exports === 'object')
		exports["ThreeDModel"] = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"));
	else
		root["ThreeDModel"] = factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"], root["DeltaModel"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_15__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(3), __webpack_require__(6), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Kefir, ArtefactP) {
	  'use strict';
	  function isGeometry(v) {
	    return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry;
	  }
	  function isObject3D(v) {
	    return v instanceof THREE.Object3D;
	  }
	  function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	  }
	  function traverseGeometries(obj, fn) {
	    obj.traverse((function(subObj) {
	      if (U.isUndefined(subObj.geometry)) {
	        return;
	      }
	      fn(subObj.geometry);
	    }));
	  }
	  function calculateBoundingBox(obj) {
	    obj.userData.boundingBox = new THREE.Box3();
	    traverseGeometries(obj, (function(geometry) {
	      if (geometry instanceof THREE.BufferGeometry) {
	        geometry.computeBoundingBox();
	        obj.userData.boundingBox.expandByPoint(geometry.boundingBox.min);
	        obj.userData.boundingBox.expandByPoint(geometry.boundingBox.max);
	      }
	      (geometry.morphTargets || []).concat([geometry]).forEach((function($__1) {
	        var vertices = $__1.vertices;
	        (vertices || []).forEach((function(point) {
	          obj.userData.boundingBox.expandByPoint(point);
	        }));
	      }));
	    }));
	  }
	  function startThreeDAnimation(obj) {
	    var clock = new THREE.Clock();
	    var morphObjs = [];
	    obj.traverse((function(subObj) {
	      if (subObj instanceof THREE.MorphAnimMesh) {
	        morphObjs.push(subObj);
	      }
	    }));
	    Kefir.animationFrames().onValue((function() {
	      var dTime = clock.getDelta();
	      morphObjs.forEach((function(morphObj) {
	        morphObj.updateAnimation(1000 * dTime);
	      }));
	    }));
	  }
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_ThreeDModel)) {
	      return window._amy_ThreeDModel;
	    }
	    var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel($__1) {
	      var visible = $__1.visible;
	      var $__0 = this;
	      this._isPart = this.parent.type === 'ThreeDModel';
	      this.newProperty('visible', {initial: visible});
	      this.newProperty('hidden');
	      this.p('visible').plug(this.property('hidden').not());
	      this.p('hidden').plug(this.property('visible').not());
	      this.p('visible').value(true).flatMap(this.p('visible')).onValue((function(visible) {
	        $__0.object3D.then((function(obj) {
	          obj.visible = visible;
	        }));
	      }));
	      this.p('hidden').plug(this.on('destroy').take(1).mapTo(true));
	      this.p('hidden').plug(this.parent.p('hidden').value(true));
	      this._tile = this.closestAncestorByType('Tile');
	      var INHERITED_OPTIONS = ['color', 'animation'];
	      Object.keys(this.options.parts || {}).forEach((function(id) {
	        var part = $__0.options.parts[id];
	        var newChildOptions = U.extend({
	          id: id,
	          parent: $__0
	        }, part);
	        INHERITED_OPTIONS.forEach((function(prop) {
	          if (U.isUndefined(newChildOptions[prop])) {
	            newChildOptions[prop] = $__0.options[prop];
	          }
	        }));
	        return new window._amy_ThreeDModel(newChildOptions);
	      }));
	    }, {
	      get object3D() {
	        if (!this._object3D) {
	          this._object3D = this._load();
	        }
	        return this._object3D;
	      },
	      _centerGeometries: function(obj) {
	        var $__0 = this;
	        if (!this.geometryCorrection) {
	          this.geometryCorrection = this.options.geometryCorrection;
	        }
	        if (!this.geometryCorrection) {
	          this.geometryCorrection = obj.userData.boundingBox.center().negate();
	        }
	        traverseGeometries(obj, (function(geometry) {
	          var matrix = new THREE.Matrix4().setPosition($__0.geometryCorrection);
	          (geometry.morphTargets || []).forEach((function($__1) {
	            var vertices = $__1.vertices;
	            vertices.forEach((function(point) {
	              point.applyMatrix4(matrix);
	            }));
	          }));
	          geometry.applyMatrix(matrix);
	        }));
	      },
	      _load: function() {
	        var $__0 = this;
	        var result;
	        if (U.isDefined(this.options.file)) {
	          result = this._loadFile();
	        }
	        if (U.isDefined(this.options.parts)) {
	          result = this._loadParts();
	        }
	        if (!this._isPart) {
	          result = result.tap(calculateBoundingBox).tap((function(obj) {
	            $__0._centerGeometries(obj);
	          })).tap((function(obj) {
	            $__0.p('visible').value(true).flatMap((function() {
	              return $__0._tile.p('size').takeWhile($__0.p('visible'));
	            })).onValue((function(size) {
	              var $__1;
	              var objWidth = obj.userData.boundingBox.size().x;
	              var objHeight = obj.userData.boundingBox.size().y;
	              if ((size.width < size.height) !== (objWidth < objHeight)) {
	                obj.rotation.z = 0.5 * Math.PI;
	                ($__1 = [objHeight, objWidth], objWidth = $__1[0], objHeight = $__1[1], $__1);
	              } else {
	                obj.rotation.z = 0;
	              }
	              var ratio = 0.8 * Math.min(size.width / objWidth, size.height / objHeight);
	              obj.scale.set(ratio, ratio, ratio);
	              var elevation = U.defOr($__0.options.elevation, Math.min(size.width, size.height) / 4);
	              obj.position.z = 0.5 * ratio * obj.userData.boundingBox.size().z + elevation;
	              if ($__0.options.rotation) {
	                U.extend(obj.rotation, $__0.options.rotation);
	              }
	            }));
	          })).tap((function(obj) {
	            obj.userData.artefact = $__0;
	          })).tap((function(obj) {
	            $__0._tile.object3D.add(obj);
	          })).tap(startThreeDAnimation);
	        }
	        return result;
	      },
	      _loadFile: function() {
	        var $__1 = this.options,
	            file = $__1.file,
	            color = $__1.color,
	            animation = $__1.animation;
	        var ext = '';
	        Object.keys($.circuitboard.Circuitboard.threeJsLoaders).forEach((function(extension) {
	          if (extension.length > ext.length) {
	            if (endsWith(file, ("." + extension))) {
	              ext = extension;
	            }
	          }
	        }));
	        U.assert(ext.length > 0, ("The file '" + file + "' is not recognized as a 3D model."));
	        var Loader = $.circuitboard.Circuitboard.threeJsLoaders[ext];
	        U.assert(U.isDefined(Loader), "Something went wrong retrieving the 3D model loader.");
	        return U.promisify(new Loader(), 'load')(file).then((function(obj) {
	          U.assert(isGeometry(obj) || isObject3D(obj), ("The 3D model loader for the '" + ext + "' extension returned an unsupported value."));
	          if (isGeometry(obj)) {
	            var geometry = obj;
	            var material = new THREE.MeshLambertMaterial({color: color || 'white'});
	            material.side = THREE.DoubleSide;
	            if (animation) {
	              obj = new THREE.MorphAnimMesh(geometry, material);
	              obj.duration = animation.duration;
	              material.morphTargets = true;
	              geometry.computeMorphNormals(obj);
	            } else {
	              obj = new THREE.Mesh(geometry, material);
	            }
	          }
	          return obj;
	        }));
	      },
	      _loadParts: function() {
	        return P.all(this.children).map((function(child) {
	          return (child._object3D = child._load());
	        })).reduce((function(parent, child) {
	          parent.add(child);
	          return parent;
	        }), new THREE.Object3D());
	      }
	    }, {visible: false});
	    window._amy_ThreeDModel.loaders = {};
	    return window._amy_ThreeDModel;
	  })).tap((function(c) {
	    $.circuitboard.ThreeDModel = c;
	  }));
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, dm, plugin, defer) {
	  'use strict';
	  return plugin.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = dm.vp('Artefact', U.newSubclass(KefirSignalHandler, (function(superFn) {
	      return function Artefact(options) {
	        superFn.apply(this, arguments);
	        this._options = options;
	        var $__1 = options,
	            id = $__1.id,
	            type = $__1.type,
	            parent = $__1.parent,
	            beforeConstruction = $__1.beforeConstruction;
	        this._id = id || uniqueID(type);
	        this._type = type;
	        this._parent = parent;
	        this._children = [];
	        if (parent) {
	          U.array(parent, '_children').push(this);
	        }
	        this.newEvent('destroy');
	        this.beforeConstruction(beforeConstruction);
	        if (this.root === this) {
	          this._artefactsByID = {};
	          this._registerArtefact = function(artefact) {
	            U.getDef(this._artefactsByID, artefact.id, defer).resolve(artefact);
	          };
	        }
	      };
	    }), {
	      beforeConstruction: function(possiblePromise) {
	        if (!possiblePromise || !$.isFunction(possiblePromise.then)) {
	          return;
	        }
	        if (!this.constructed) {
	          this.constructed = P.resolve(this);
	        }
	        this.constructed = this.constructed.tap((function() {
	          return P.resolve(possiblePromise);
	        }));
	      },
	      get options() {
	        return this._options;
	      },
	      get id() {
	        return this._id;
	      },
	      get type() {
	        return this._type;
	      },
	      get parent() {
	        return this._parent;
	      },
	      get children() {
	        return this._children;
	      },
	      get root() {
	        if (!this._root) {
	          this._root = this.parent ? this.parent.root : this;
	        }
	        return this._root;
	      },
	      artefactById: function(id) {
	        return U.getDef(this.root._artefactsByID, id, defer).promise;
	      },
	      traverseArtefacts: function(fn) {
	        var options = arguments[1] !== (void 0) ? arguments[1] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix') {
	          fn(this);
	        }
	        this.children.forEach((function(child) {
	          child.traverseArtefacts(fn, options);
	        }));
	        if (order === 'postfix') {
	          fn(this);
	        }
	      },
	      traverseArtefactsByType: function(type, fn) {
	        var options = arguments[2] !== (void 0) ? arguments[2] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix' && this.type === type) {
	          fn(this);
	        }
	        if (options.beforeGoingIn) {
	          options.beforeGoingIn(this);
	        }
	        this.closestDescendantsByType(type).forEach((function(descendent) {
	          descendent.traverseArtefactsByType(type, fn, options);
	        }));
	        if (options.beforeGoingOut) {
	          options.beforeGoingOut(this);
	        }
	        if (order === 'postfix' && this.type === type) {
	          fn(this);
	        }
	      },
	      closestAncestorByType: function(type) {
	        var result = this;
	        do {
	          result = result.parent;
	        } while (result && result.type && result.type !== type);
	        return result;
	      },
	      closestDescendantsByType: function(type) {
	        var result = [];
	        this.children.forEach((function(child) {
	          if (child.type === type) {
	            result.push(child);
	          } else {
	            result = result.concat(child.closestDescendantsByType(type));
	          }
	        }));
	        return result;
	      },
	      destroy: function() {
	        this.trigger('destroy');
	        this.children.forEach((function(child) {
	          child.destroy();
	        }));
	      }
	    }));
	    window._amy_Artefact.newSubclass = function newSubClass(name, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var optionDefaults = arguments[3] !== (void 0) ? arguments[3] : {};
	      return dm.vp(name, U.newSubclass(window._amy_Artefact, (function(superFn) {
	        return function() {
	          var options = arguments[0] !== (void 0) ? arguments[0] : {};
	          var $__0 = this;
	          var processedOptions = options;
	          Object.keys(optionDefaults).forEach((function(key) {
	            if (U.isUndefined(processedOptions[key])) {
	              processedOptions[key] = optionDefaults[key];
	            }
	          }));
	          processedOptions.type = name;
	          superFn.call(this, U.extend(options, processedOptions));
	          constructor.call(this, processedOptions);
	          if (this.constructed) {
	            this.constructed = this.constructed.then((function() {
	              if ($.isFunction($__0.construct)) {
	                return P.resolve($__0.construct(options)).return($__0);
	              }
	              return $__0;
	            }));
	          } else if ($.isFunction(this.construct)) {
	            this.beforeConstruction(this.construct(options));
	          }
	          (this.constructed || P.resolve()).then((function() {
	            $__0.root._registerArtefact($__0);
	          }));
	        };
	      }), U.extend({}, prototype, {get circuitboard() {
	          if (!this._circuitboard) {
	            this._circuitboard = this.closestAncestorByType('Circuitboard');
	          }
	          return this._circuitboard;
	        }})));
	    };
	    return window._amy_Artefact;
	  })).tap((function(c) {
	    $.circuitboard.Artefact = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
	  __webpack_require__(9).init(Kefir, $);
	  Kefir.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Kefir.fromBinder((function(emitter) {
	      obj.on(eventName, emitter.emit);
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Kefir.animationFrames = function animationFrames() {
	    return Kefir.fromBinder((function(emitter) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          emitter.emit();
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
	  Kefir.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = Kefir.bus();
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
	    addStream(Kefir.fromBinder((function(emitter) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        emitter.emit(this);
	      });
	      tw.onComplete(emitter.end);
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
	  Kefir.keyPress = function keyPress(keyCode) {
	    return $(window).asKefirStream('keypress').filter((function(e) {
	      return e.keyCode === keyCode;
	    }));
	  };
	  Kefir.once = function once(value) {
	    return Kefir.fromBinder((function(emitter) {
	      emitter.emit(value);
	      emitter.end();
	    }));
	  };
	  Kefir.fromArray = function fromArray(array) {
	    return Kefir.fromBinder((function(emitter) {
	      array.forEach(emitter.emit);
	      emitter.end();
	    }));
	  };
	  Kefir.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = Kefir.bus();
	    var open = Kefir.bus();
	    var close = Kefir.bus();
	    pacing.filterBy(wantedBus.toProperty(false)).onValue((function() {
	      handler((function() {
	        open.emit();
	        wantedBus.emit(false);
	        close.emit();
	      }));
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.mapTo(true));
	      return Kefir.constant(true).take(1).concat(close).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntilBy(open).reduce(accumulator, []).flatMap(Kefir.fromArray);
	      }));
	    };
	  };
	  Kefir.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Kefir.Stream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Kefir.fromBinder((function(emitter) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(value);
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          oldBuffer.forEach(emitter.emit);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Kefir.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Kefir.Observable.prototype.run = function() {
	    var $__0 = this;
	    var doNothing = (function() {});
	    this.onValue(doNothing);
	    return (function() {
	      $__0.offValue(doNothing);
	    });
	  };
	  Kefir.Stream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Kefir.Stream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asKefirStream('mousemove');
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
	      return stream.takeUntilBy($(document).asKefirStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asKefirStream('mousemove');
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
	      return $(document).asKefirStream('mouseup').take(1).takeUntilBy(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asKefirStream('mousewheel DOMMouseScroll');
	  };
	  return Kefir;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
	  var KefirSignalHandler = U.newClass(function KefirSignalHandler() {
	    this._events = {};
	    this._properties = {};
	    this._propertyBusses = {};
	  }, {
	    newEvent: function(name) {
	      var source = (arguments[1] !== (void 0) ? arguments[1] : {}).source;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      var bus = Kefir.bus();
	      if (source) {
	        bus.plug(source);
	      }
	      return this._events[name] = bus;
	    },
	    event: function(name) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      return this._events[name];
	    },
	    property: function(name) {
	      return this._properties[name];
	    },
	    p: function(name) {
	      return this._properties[name];
	    },
	    newProperty: function(name) {
	      var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
	          settable = $__1.settable,
	          initial = $__1.initial,
	          isEqual = $__1.isEqual;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      if (U.isUndefined(settable)) {
	        settable = true;
	      }
	      var bus = Kefir.bus();
	      var property = this._properties[name] = bus.skipDuplicates(isEqual).toProperty(initial);
	      property.plug = bus.plug.bind(bus);
	      property.unplug = bus.unplug.bind(bus);
	      property.get = (function() {
	        return property._current;
	      });
	      if (settable) {
	        property.set = (function(value) {
	          bus.emit(value);
	        });
	      }
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      return property;
	    },
	    trigger: function(name, value) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      this._events[name].emit(value);
	    },
	    on: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      return this._on(argsObj);
	    },
	    _on: function($__1) {
	      var $__2 = $__1,
	          name = $__2.name,
	          expectedValue = $__2.expectedValue,
	          callback = $__2.callback;
	      U.assert(this._events[name] || this._properties[name], ("There is no event or property '" + name + "' on this object."));
	      var result = this._events[name] || this._properties[name];
	      if (U.isDefined(expectedValue)) {
	        result = result.filter((function(v) {
	          return v === expectedValue;
	        }));
	      }
	      if (callback) {
	        result = result.onValue(callback);
	      }
	      return result;
	    },
	    _gatherOnArguments: function() {
	      for (var args = [],
	          $__0 = 0; $__0 < arguments.length; $__0++)
	        args[$__0] = arguments[$__0];
	      var result = {name: args.shift()};
	      if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
	        result.expectedValue = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isFunction(args[0])) {
	        result.callback = args.shift();
	      }
	      return result;
	    }
	  });
	  return KefirSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(16), __webpack_require__(5), __webpack_require__(10), __webpack_require__(14), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
	  'use strict';
	  if (!window._amyPlugin) {
	    window._amyPlugin = function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        U.assert(!_selectedDeferred.done, "ApiNATOMY plugins can only be selected once, after which they are fixed.");
	        _selectedDeferred.done = true;
	        dm.select.apply(dm, pluginOrSelection);
	        _selectedDeferred.resolve(this);
	        return window._amyPlugin.selected;
	      }
	    };
	    var _selectedDeferred = defer();
	    window._amyPlugin.selected = _selectedDeferred.promise;
	    window._amyPlugin.graph = (function() {
	      return dm.graph();
	    });
	    window._amyPlugin.dm = dm;
	  }
	  return window._amyPlugin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  return function defer() {
	    var resolve,
	        reject;
	    var promise = new P(function() {
	      resolve = arguments[0];
	      reject = arguments[1];
	    });
	    return {
	      resolve: resolve,
	      reject: reject,
	      promise: promise
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
	  'use strict';
	  function newWidgetType(typeName) {
	    var optionDefaults = arguments[1] !== (void 0) ? arguments[1] : {};
	    var WidgetP = ArtefactP.then((function(Artefact) {
	      return Artefact.newSubclass(typeName, function($__1) {
	        var cssClass = $__1.cssClass;
	        var $__0 = this;
	        if (U.isDefined(cssClass)) {
	          this.element.addClass(cssClass);
	        }
	        this.element.asKefirStream('remove').onValue((function() {
	          $__0.destroy();
	        }));
	      }, {
	        get model() {
	          return this.options.model;
	        },
	        get element() {
	          return this.options.element;
	        }
	      }, U.extend({beforeConstruction: P.resolve()}, optionDefaults));
	    }));
	    var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
	    $.fn[lowercaseName] = function(options) {
	      var $__0 = this;
	      if (options === 'instance') {
	        return this.data(("-amy-" + lowercaseName));
	      }
	      this.data(("-amy-" + lowercaseName), WidgetP.then((function(Widget) {
	        return new Widget(U.extend(options, {element: $__0})).constructed;
	      })));
	      return this;
	    };
	    return WidgetP;
	  }
	  return newWidgetType;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0YmUyY2IzMTM4ODk4Nzg1ZWRiMSIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL0FydGVmYWN0LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrZWZpci1qcXVlcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1zaWduYWwtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC91bmlxdWUtaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9uZXdXaWRnZXRUeXBlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLE1BQUksQ0FBRyxHQUFHLEdBQUcsTUFBSSxDQUFHLFVBQVE7QUFDM0MsY0FBVyxDQUFDO0FBSVosVUFBUyxXQUFTLENBQUUsRUFBRztBQUFFLFVBQU8sYUFBYSxNQUFJLFNBQVMsR0FBSyxhQUFhLE1BQUksZUFBZTtHQUFFO0FBQ2pHLFVBQVMsV0FBUyxDQUFFLEVBQUc7QUFBRSxVQUFP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QUFJLE9BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTSxDQUFHLEVBQUUsT0FBTSxNQUFNLENBQUUsQ0FBQyxDQUFDLFlBQVk7T0FBQSxFQUFDLENBQUMsQ0FBQztBQUdsRixZQUFPLEtBQUcsQ0FBQztLQUVaLENBQUM7QUFHRCxVQUFPLFFBQU0sQ0FBQztHQUVmO0FBSUEsUUFBTyxjQUFZLENBQUM7QUFHckIsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJrZWZpclwiLCBcInR3ZWVuanNcIiwgXCJrZWZpci1qcXVlcnlcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJUaHJlZURNb2RlbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiVGhyZWVETW9kZWxcIl0gPSBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJLZWZpclwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wia2VmaXItanF1ZXJ5XCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE1X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0YmUyY2IzMTM4ODk4Nzg1ZWRiMVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQndGhyZWUtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJyxcblx0Jy4vQXJ0ZWZhY3QuanMnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUsIFUsIFAsIEtlZmlyLCBBcnRlZmFjdFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogY29udmVuaWVuY2UgcHJlZGljYXRlIGZ1bmN0aW9ucyAqL1xuXHRmdW5jdGlvbiBpc0dlb21ldHJ5KHYpIHsgcmV0dXJuIHYgaW5zdGFuY2VvZiBUSFJFRS5HZW9tZXRyeSB8fCB2IGluc3RhbmNlb2YgVEhSRUUuQnVmZmVyR2VvbWV0cnkgfVxuXHRmdW5jdGlvbiBpc09iamVjdDNEKHYpIHsgcmV0dXJuIHYgaW5zdGFuY2VvZiBUSFJFRS5PYmplY3QzRCB9XG5cdGZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc3VmZml4KSB7IHJldHVybiBzdHIuaW5kZXhPZihzdWZmaXgsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTEgfVxuXG5cdC8qIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIHZpc2l0IGFsbCBnZW9tZXRyaWVzIGluIGFuIE9iamVjdDNEICovXG5cdGZ1bmN0aW9uIHRyYXZlcnNlR2VvbWV0cmllcyhvYmosIGZuKSB7XG5cdFx0b2JqLnRyYXZlcnNlKChzdWJPYmopID0+IHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHN1Yk9iai5nZW9tZXRyeSkpIHsgcmV0dXJuIH1cblx0XHRcdGZuKHN1Yk9iai5nZW9tZXRyeSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKiBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byBjYWxjdWxhdGUgb3ZlcmFsbCBib3VuZGluZyBib3ggb2YgYW4gb2JqZWN0M0QgKi9cblx0ZnVuY3Rpb24gY2FsY3VsYXRlQm91bmRpbmdCb3gob2JqKSB7XG5cdFx0b2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94ID0gbmV3IFRIUkVFLkJveDMoKTtcblx0XHR0cmF2ZXJzZUdlb21ldHJpZXMob2JqLCAoZ2VvbWV0cnkpID0+IHtcblx0XHRcdGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIFRIUkVFLkJ1ZmZlckdlb21ldHJ5KSB7XG5cdFx0XHRcdGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuXHRcdFx0XHRvYmoudXNlckRhdGEuYm91bmRpbmdCb3guZXhwYW5kQnlQb2ludChnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4pO1xuXHRcdFx0XHRvYmoudXNlckRhdGEuYm91bmRpbmdCb3guZXhwYW5kQnlQb2ludChnZW9tZXRyeS5ib3VuZGluZ0JveC5tYXgpO1xuXHRcdFx0fVxuXHRcdFx0KGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cyB8fCBbXSkuY29uY2F0KFtnZW9tZXRyeV0pLmZvckVhY2goKHt2ZXJ0aWNlc30pID0+IHtcblx0XHRcdFx0KHZlcnRpY2VzIHx8IFtdKS5mb3JFYWNoKChwb2ludCkgPT4ge1xuXHRcdFx0XHRcdG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5leHBhbmRCeVBvaW50KHBvaW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGNlbnRlciBhbGwgdGhlIGdlb21ldHJ5IG9mIGFuIG9iamVjdCBvbiBpdHMgKDAsIDAsIDApIHBvaW50ICovXG5cdGZ1bmN0aW9uIHN0YXJ0VGhyZWVEQW5pbWF0aW9uKG9iaikge1xuXHRcdHZhciBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuXHRcdHZhciBtb3JwaE9ianMgPSBbXTtcblx0XHRvYmoudHJhdmVyc2UoKHN1Yk9iaikgPT4ge1xuXHRcdFx0aWYgKHN1Yk9iaiBpbnN0YW5jZW9mIFRIUkVFLk1vcnBoQW5pbU1lc2gpIHtcblx0XHRcdFx0bW9ycGhPYmpzLnB1c2goc3ViT2JqKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRLZWZpci5hbmltYXRpb25GcmFtZXMoKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdHZhciBkVGltZSA9IGNsb2NrLmdldERlbHRhKCk7XG5cdFx0XHRtb3JwaE9ianMuZm9yRWFjaCgobW9ycGhPYmopID0+IHtcblx0XHRcdFx0bW9ycGhPYmoudXBkYXRlQW5pbWF0aW9uKDEwMDAgKiBkVGltZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogYSBwcm9taXNlIHRvIHRoZSBuZXcgVGhyZWVETW9kZWwgY2xhc3MgKi9cblx0cmV0dXJuIEFydGVmYWN0UC50aGVuKChBcnRlZmFjdCkgPT4ge1xuXG5cblx0XHQvKiBob3dldmVyIChvZnRlbikgdGhpcyBpcyBsb2FkZWQsIGNyZWF0ZSB0aGUgY2xhc3Mgb25seSBvbmNlICovXG5cdFx0aWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X1RocmVlRE1vZGVsKSkgeyByZXR1cm4gd2luZG93Ll9hbXlfVGhyZWVETW9kZWwgfVxuXG5cblx0XHR2YXIgVGhyZWVETW9kZWwgPSB3aW5kb3cuX2FteV9UaHJlZURNb2RlbCA9IEFydGVmYWN0Lm5ld1N1YmNsYXNzKCdUaHJlZURNb2RlbCcsIGZ1bmN0aW9uIFRocmVlRE1vZGVsKHt2aXNpYmxlfSkge1xuXG5cdFx0XHQvKiBjaGVjayBpZiB0aGlzIGlzIGEgbW9kZWwgcGFydCBvciB0aGUgcm9vdCAqL1xuXHRcdFx0dGhpcy5faXNQYXJ0ID0gdGhpcy5wYXJlbnQudHlwZSA9PT0gJ1RocmVlRE1vZGVsJztcblxuXHRcdFx0LyogdGhlICd2aXNpYmxlJyBhbmQgJ2hpZGRlbicgcHJvcGVydGllcyAqL1xuXHRcdFx0dGhpcy5uZXdQcm9wZXJ0eSgndmlzaWJsZScsIHsgaW5pdGlhbDogdmlzaWJsZSB9KTtcblx0XHRcdHRoaXMubmV3UHJvcGVydHkoJ2hpZGRlbicpO1xuXHRcdFx0dGhpcy5wKCd2aXNpYmxlJykucGx1Zyh0aGlzLnByb3BlcnR5KCdoaWRkZW4nKS5ub3QoKSk7XG5cdFx0XHR0aGlzLnAoJ2hpZGRlbicpLnBsdWcodGhpcy5wcm9wZXJ0eSgndmlzaWJsZScpLm5vdCgpKTtcblxuXHRcdFx0LyogbWFuaWZlc3QgdGhpcyB2aXNpYmlsaXR5IG9uIHRoZSBjYW52YXMgKi9cblx0XHRcdHRoaXMucCgndmlzaWJsZScpLnZhbHVlKHRydWUpLmZsYXRNYXAodGhpcy5wKCd2aXNpYmxlJykpLm9uVmFsdWUoKHZpc2libGUpID0+IHtcblx0XHRcdFx0dGhpcy5vYmplY3QzRC50aGVuKChvYmopID0+IHsgb2JqLnZpc2libGUgPSB2aXNpYmxlIH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIHdoZW4gdGhlIDNEIG1vZGVsIGlzIGRlc3Ryb3llZCwgaXQgaXMgYWxzbyBoaWRkZW4gKi9cblx0XHRcdHRoaXMucCgnaGlkZGVuJykucGx1Zyh0aGlzLm9uKCdkZXN0cm95JykudGFrZSgxKS5tYXBUbyh0cnVlKSk7XG5cblx0XHRcdC8qIHdoZW4gdGhlIHBhcmVudCBpcyBoaWRkZW4sIGhpZGUgdGhpcyBtb2RlbCB0b28gKi9cblx0XHRcdHRoaXMucCgnaGlkZGVuJykucGx1Zyh0aGlzLnBhcmVudC5wKCdoaWRkZW4nKS52YWx1ZSh0cnVlKSk7XG5cblx0XHRcdC8qIGdyYWIgYSBsaW5rIHRvIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHRpbGUgKi9cblx0XHRcdC8vIFRPRE86IDNEIG1vZGVscyBhcmUgbm93IHRpZWQgdG8gYSBwYXJlbnQgdGlsZTsgdGhpcyBpcyBub3QgZWxlZ2FudFxuXHRcdFx0dGhpcy5fdGlsZSA9IHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdUaWxlJyk7XG5cblxuXHRcdFx0LyogY3JlYXRlIGFsbCBkZXNjZW5kYW50IFRocmVlRE1vZGVsJ3MgKHdpdGhvdXQgbmVjZXNzYXJpbHkgbG9hZGluZyB0aGVpciBvYmplY3QzRCkgKi9cblx0XHRcdHZhciBJTkhFUklURURfT1BUSU9OUyA9IFsnY29sb3InLCAnYW5pbWF0aW9uJ107XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucGFydHMgfHwge30pLmZvckVhY2goKGlkKSA9PiB7XG5cblx0XHRcdFx0LyogdGhlIG9wdGlvbnMgb2YgdGhlIG5ldyBUaHJlZURNb2RlbCAqL1xuXHRcdFx0XHR2YXIgcGFydCA9IHRoaXMub3B0aW9ucy5wYXJ0c1tpZF07XG5cblx0XHRcdFx0LyogZGVmaW5lIHRoZSBvcHRpb25zIHdlIHdhbnQgdG8gcGFzcyB0byB0aGUgY29ycmVzcG9uZGluZyBjaGlsZCBhcnRlZmFjdCAqL1xuXHRcdFx0XHR2YXIgbmV3Q2hpbGRPcHRpb25zID0gVS5leHRlbmQoeyBpZCwgcGFyZW50OiB0aGlzIH0sIHBhcnQpO1xuXHRcdFx0XHRJTkhFUklURURfT1BUSU9OUy5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQobmV3Q2hpbGRPcHRpb25zW3Byb3BdKSkge1xuXHRcdFx0XHRcdFx0bmV3Q2hpbGRPcHRpb25zW3Byb3BdID0gdGhpcy5vcHRpb25zW3Byb3BdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogY29uc3RydWN0IHRoZSBjaGlsZCBUaHJlZURNb2RlbCAqL1xuXHRcdFx0XHRyZXR1cm4gbmV3IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsKG5ld0NoaWxkT3B0aW9ucyk7XG5cblx0XHRcdH0pO1xuXG5cblxuXHRcdH0sIHtcblxuXHRcdFx0Z2V0IG9iamVjdDNEKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX29iamVjdDNEKSB7IHRoaXMuX29iamVjdDNEID0gdGhpcy5fbG9hZCgpIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX29iamVjdDNEO1xuXHRcdFx0fSxcblxuXG5cdFx0XHRfY2VudGVyR2VvbWV0cmllcyhvYmopIHtcblx0XHRcdFx0aWYgKCF0aGlzLmdlb21ldHJ5Q29ycmVjdGlvbikgeyB0aGlzLmdlb21ldHJ5Q29ycmVjdGlvbiA9IHRoaXMub3B0aW9ucy5nZW9tZXRyeUNvcnJlY3Rpb24gfVxuXHRcdFx0XHRpZiAoIXRoaXMuZ2VvbWV0cnlDb3JyZWN0aW9uKSB7IHRoaXMuZ2VvbWV0cnlDb3JyZWN0aW9uID0gb2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LmNlbnRlcigpLm5lZ2F0ZSgpIH1cblx0XHRcdFx0dHJhdmVyc2VHZW9tZXRyaWVzKG9iaiwgKGdlb21ldHJ5KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCkuc2V0UG9zaXRpb24odGhpcy5nZW9tZXRyeUNvcnJlY3Rpb24pO1xuXHRcdFx0XHRcdChnZW9tZXRyeS5tb3JwaFRhcmdldHMgfHwgW10pLmZvckVhY2goKHt2ZXJ0aWNlc30pID0+IHtcblx0XHRcdFx0XHRcdHZlcnRpY2VzLmZvckVhY2goKHBvaW50KSA9PiB7XG5cdFx0XHRcdFx0XHRcdHBvaW50LmFwcGx5TWF0cml4NChtYXRyaXgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Z2VvbWV0cnkuYXBwbHlNYXRyaXgobWF0cml4KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cblx0XHRcdF9sb2FkKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5vcHRpb25zLmZpbGUpKSAgeyByZXN1bHQgPSB0aGlzLl9sb2FkRmlsZSgpICB9XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMucGFydHMpKSB7IHJlc3VsdCA9IHRoaXMuX2xvYWRQYXJ0cygpIH1cblxuXHRcdFx0XHRpZiAoIXRoaXMuX2lzUGFydCkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdFxuXHRcdFx0XHRcdFx0LyogcHJvY2VzcyB0aGUgZ2VvbWV0cmllcyBhbmQgY2VudGVyIHRoZW0gb24gKDAsIDAsIDApICovXG5cdFx0XHRcdFx0XHQudGFwKGNhbGN1bGF0ZUJvdW5kaW5nQm94KVxuXHRcdFx0XHRcdFx0LnRhcCgob2JqKSA9PiB7IHRoaXMuX2NlbnRlckdlb21ldHJpZXMob2JqKSB9KVxuXHRcdFx0XHRcdFx0LyogcmVzaXplIC8gcm90YXRlIHRoZSBvYmplY3QgYmFzZWQgb24gdGhlIHNoYXBlIG9mIHRoZSB0aWxlICovXG5cdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wKCd2aXNpYmxlJykudmFsdWUodHJ1ZSkuZmxhdE1hcCgoKSA9PlxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3RpbGUucCgnc2l6ZScpLnRha2VXaGlsZSh0aGlzLnAoJ3Zpc2libGUnKSkpLm9uVmFsdWUoKHNpemUpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGFiYnJldmlhdGUgM0Qtb2JqZWN0IHdpZHRoIGFuZCBoZWlnaHQgKi9cblx0XHRcdFx0XHRcdFx0XHR2YXIgb2JqV2lkdGggPSBvYmoudXNlckRhdGEuYm91bmRpbmdCb3guc2l6ZSgpLng7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG9iakhlaWdodCA9IG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5zaXplKCkueTtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIHJvdGF0ZSA5MMKwIG9uIHRoZSB6LWF4aXMgaWYgdGhpcyBnaXZlcyBhIGJldHRlciBmaXQgKi9cblx0XHRcdFx0XHRcdFx0XHRpZiAoKHNpemUud2lkdGggPCBzaXplLmhlaWdodCkgIT09IChvYmpXaWR0aCA8IG9iakhlaWdodCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9iai5yb3RhdGlvbi56ID0gMC41ICogTWF0aC5QSTtcblx0XHRcdFx0XHRcdFx0XHRcdFtvYmpXaWR0aCwgb2JqSGVpZ2h0XSA9IFtvYmpIZWlnaHQsIG9ialdpZHRoXTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0b2JqLnJvdGF0aW9uLnogPSAwO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8qIGRldGVybWluZSB0aGUgc2NhbGUgcmF0aW8gKi9cblx0XHRcdFx0XHRcdFx0XHR2YXIgcmF0aW8gPSAwLjggKiBNYXRoLm1pbihzaXplLndpZHRoIC8gb2JqV2lkdGgsIHNpemUuaGVpZ2h0IC8gb2JqSGVpZ2h0KTtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGFkanVzdCBzaXplICovXG5cdFx0XHRcdFx0XHRcdFx0b2JqLnNjYWxlLnNldChyYXRpbywgcmF0aW8sIHJhdGlvKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGFkanVzdCAnYWx0aXR1ZGUnICovXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVsZXZhdGlvbiA9IFUuZGVmT3IodGhpcy5vcHRpb25zLmVsZXZhdGlvbiwgTWF0aC5taW4oc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpIC8gNCk7XG5cdFx0XHRcdFx0XHRcdFx0b2JqLnBvc2l0aW9uLnogPSAwLjUgKiByYXRpbyAqIG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5zaXplKCkueiArIGVsZXZhdGlvbjtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGFueSBjdXN0b20gJ3JvdGF0aW9uJz8gKi9cblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnJvdGF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRVLmV4dGVuZChvYmoucm90YXRpb24sIHRoaXMub3B0aW9ucy5yb3RhdGlvbik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC8qIGJhY2stbGluayB0aGUgYXJ0ZWZhY3QgdG8gdGhlIG9iamVjdDNEICovXG5cdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHsgb2JqLnVzZXJEYXRhLmFydGVmYWN0ID0gdGhpcyB9KVxuXHRcdFx0XHRcdFx0LyogYWRkIHRoaXMgb2JqZWN0IHRvIHRoZSBzY2VuZSAqL1xuXHRcdFx0XHRcdFx0LnRhcCgob2JqKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3RpbGUub2JqZWN0M0QuYWRkKG9iaik7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0Lyogc3RhcnQgdGhlIGFuaW1hdGlvbiBvZiB0aGlzIG9iamVjdCwgaWYgYXBwbGljYWJsZSAqL1xuXHRcdFx0XHRcdFx0LnRhcChzdGFydFRocmVlREFuaW1hdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0X2xvYWRGaWxlKCkge1xuXHRcdFx0XHR2YXIge2ZpbGUsIGNvbG9yLCBhbmltYXRpb259ID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0XHRcdC8qIHNlbGVjdCB0aGUgbG9uZ2VzdCBleHRlbnNpb24gdGhhdCBmaXRzIHRoZSBmaWxlbmFtZSAqL1xuXHRcdFx0XHQvLyBlLmcuLCBcInBvaW50cy5qc29uXCIgaGFzIHByaW9yaXR5IG92ZXIgXCJqc29uXCJcblx0XHRcdFx0dmFyIGV4dCA9ICcnO1xuXHRcdFx0XHRPYmplY3Qua2V5cygkLmNpcmN1aXRib2FyZC5DaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMpLmZvckVhY2goKGV4dGVuc2lvbikgPT4ge1xuXHRcdFx0XHRcdGlmIChleHRlbnNpb24ubGVuZ3RoID4gZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0aWYgKGVuZHNXaXRoKGZpbGUsIGAuJHtleHRlbnNpb259YCkpIHtcblx0XHRcdFx0XHRcdFx0ZXh0ID0gZXh0ZW5zaW9uO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Lyogd2FzIGFuIGV4dGVuc2lvbiBmb3VuZD8gKi9cblx0XHRcdFx0VS5hc3NlcnQoZXh0Lmxlbmd0aCA+IDAsIGBUaGUgZmlsZSAnJHtmaWxlfScgaXMgbm90IHJlY29nbml6ZWQgYXMgYSAzRCBtb2RlbC5gKTtcblxuXHRcdFx0XHQvKiBmZXRjaCB0aGUgbG9hZGVyIGZvciB0aGF0IGZpbGUgZXh0ZW5zaW9uICovXG5cdFx0XHRcdHZhciBMb2FkZXIgPSAkLmNpcmN1aXRib2FyZC5DaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnNbZXh0XTtcblxuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sgKi9cblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQoTG9hZGVyKSwgYFNvbWV0aGluZyB3ZW50IHdyb25nIHJldHJpZXZpbmcgdGhlIDNEIG1vZGVsIGxvYWRlci5gKTtcblxuXHRcdFx0XHQvKiByZXR1cm4gYSBwcm9taXNlIHRvIHRoZSAzRCBvYmplY3QgKi9cblx0XHRcdFx0cmV0dXJuIFUucHJvbWlzaWZ5KG5ldyBMb2FkZXIoKSwgJ2xvYWQnKShmaWxlKS50aGVuKChvYmopID0+IHtcblxuXHRcdFx0XHRcdC8qIGZvciBub3csIHdlIG9ubHkgYWNjZXB0IEdlb21ldHJ5J3MgYW5kIE9iamVjdDNEJ3MgZnJvbSBhIGxvYWRlciAqL1xuXHRcdFx0XHRcdFUuYXNzZXJ0KGlzR2VvbWV0cnkob2JqKSB8fCBpc09iamVjdDNEKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgM0QgbW9kZWwgbG9hZGVyIGZvciB0aGUgJyR7ZXh0fScgZXh0ZW5zaW9uIHJldHVybmVkIGFuIHVuc3VwcG9ydGVkIHZhbHVlLmApO1xuXG5cdFx0XHRcdFx0LyogaWYgYSBHZW9tZXRyeSBpcyByZXR1cm5lZCwgY3JlYXRlIGFuIE9iamVjdDNEIGFyb3VuZCBpdCAqL1xuXHRcdFx0XHRcdGlmIChpc0dlb21ldHJ5KG9iaikpIHtcblx0XHRcdFx0XHRcdHZhciBnZW9tZXRyeSA9IG9iajtcblx0XHRcdFx0XHRcdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGNvbG9yIHx8ICd3aGl0ZScgfSk7XG5cdFx0XHRcdFx0XHRtYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcblx0XHRcdFx0XHRcdGlmIChhbmltYXRpb24pIHtcblx0XHRcdFx0XHRcdFx0b2JqID0gbmV3IFRIUkVFLk1vcnBoQW5pbU1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcblx0XHRcdFx0XHRcdFx0b2JqLmR1cmF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uO1xuXHRcdFx0XHRcdFx0XHRtYXRlcmlhbC5tb3JwaFRhcmdldHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRnZW9tZXRyeS5jb21wdXRlTW9ycGhOb3JtYWxzKG9iaik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRvYmogPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIHJldHVybiB0aGUgb2JqZWN0ICovXG5cdFx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRfbG9hZFBhcnRzKCkge1xuXHRcdFx0XHRyZXR1cm4gUC5hbGwodGhpcy5jaGlsZHJlbikubWFwKChjaGlsZCkgPT4gKGNoaWxkLl9vYmplY3QzRCA9IGNoaWxkLl9sb2FkKCkpKVxuXHRcdFx0XHRcdFx0LnJlZHVjZSgocGFyZW50LCBjaGlsZCkgPT4geyBwYXJlbnQuYWRkKGNoaWxkKTsgcmV0dXJuIHBhcmVudCB9LCBuZXcgVEhSRUUuT2JqZWN0M0QoKSk7XG5cdFx0XHR9XG5cblx0XHR9LCB7XG5cblx0XHRcdHZpc2libGU6IGZhbHNlXG5cblx0XHR9KTtcblxuXG5cdFx0Lyogc3RhdGljIGxvY2F0aW9uIHRvIGNvbGxlY3QgdGhyZWUuanMgbG9hZGVycyBmb3IgZGlmZmVyZW50IGZpbGUgZm9ybWF0cyAqL1xuXHRcdC8vIFRPRE86IHRyYW5zZmVyIHRoaXMgdGFzayBmcm9tIENpcmN1aXRib2FyZCB0byBoZXJlLCBldmVyeXdoZXJlIGluIHRoZSBjb2RlXG5cdFx0d2luZG93Ll9hbXlfVGhyZWVETW9kZWwubG9hZGVycyA9IHt9O1xuXG5cblx0XHRyZXR1cm4gd2luZG93Ll9hbXlfVGhyZWVETW9kZWw7XG5cblxuXHR9KS50YXAoKGMpID0+IHsgJC5jaXJjdWl0Ym9hcmQuVGhyZWVETW9kZWwgPSBjIH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGhyZWVETW9kZWwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9rZWZpci1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL3V0aWwvdW5pcXVlLWlkLmpzJyxcblx0Jy4vdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzJyxcblx0Jy4vdXRpbC9wbHVnaW4uanMnLFxuXHQnLi91dGlsL2RlZmVyLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFAsIFUsIEtlZmlyU2lnbmFsSGFuZGxlciwgdW5pcXVlSUQsIGRtLCBwbHVnaW4sIGRlZmVyKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHJldHVybiBwbHVnaW4uc2VsZWN0ZWQudGhlbigoKSA9PiB7XG5cblxuXHRcdC8qIGhvd2V2ZXIgKG9mdGVuKSB0aGlzIGlzIGxvYWRlZCwgY3JlYXRlIHRoZSBjbGFzcyBvbmx5IG9uY2UgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfQXJ0ZWZhY3QpKSB7IHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdCB9XG5cblxuXHRcdC8qKiB7QGV4cG9ydCBAY2xhc3MgQXJ0ZWZhY3QgQGV4dGVuZHMgS2VmaXJTaWduYWxIYW5kbGVyfVxuXHRcdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdFx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBLZWZpci5qcy5cblx0XHQgKlxuXHRcdCAqIFVzZXJzIGNhbiBwYXNzIGEgcHJvbWlzZSB0aHJvdWdoIHRoZSAnYmVmb3JlQ29uc3RydWN0aW9uJyBvcHRpb24uIElmIGRvbmUsIHRoZVxuXHRcdCAqIGFydGVmYWN0IHdhaXRzIG9uIHRoYXQgcHJvbWlzZSBiZWZvcmUgY2FsbGluZyBpdHMgJ2NvbnN0cnVjdCcgbWV0aG9kLlxuXHRcdCAqIFNpbWlsYXJseSwgdXNlcnMgb2YgaW5zdGFuY2VzIG9mIHRoaXMgY2xhc3Mgc2hvdWxkIHRlc3QgdGhlICdjb25zdHJ1Y3RlZCcgcHJvcGVydHkuXG5cdFx0ICogSWYgaXQgaXMgZGVmaW5lZCwgaXQgaXMgYSBwcm9taXNlIHRoYXQgaGFzIHRvIGJlIHdhaXRlZCBmb3IuXG5cdFx0ICogSWYgbm90LCB0aGUgb2JqZWN0IGluc3RhbmNlIGNhbiBiZSB1c2VkIHN5bmNocm9ub3VzbHkgYWZ0ZXIgY29uc3RydWN0aW9uLlxuXHRcdCAqL1xuXHRcdHdpbmRvdy5fYW15X0FydGVmYWN0ID0gZG0udnAoJ0FydGVmYWN0JywgVS5uZXdTdWJjbGFzcyhLZWZpclNpZ25hbEhhbmRsZXIsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcnRlZmFjdChvcHRpb25zKSB7XG5cdFx0XHRzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0dmFyIHtpZCwgdHlwZSwgcGFyZW50LCBiZWZvcmVDb25zdHJ1Y3Rpb259ID0gb3B0aW9ucztcblxuXHRcdFx0Lyogc2V0IGhpZXJhcmNoeSBzdHVmZiAqL1xuXHRcdFx0dGhpcy5faWQgPSBpZCB8fCB1bmlxdWVJRCh0eXBlKTtcblx0XHRcdHRoaXMuX3R5cGUgPSB0eXBlO1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fY2hpbGRyZW4gPSBbXTtcblx0XHRcdGlmIChwYXJlbnQpIHsgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpIH1cblxuXHRcdFx0LyogY3JlYXRlIGV2ZW50cyAqL1xuXHRcdFx0dGhpcy5uZXdFdmVudCgnZGVzdHJveScpO1xuXG5cdFx0XHQvKiBwb3NzaWJseSB3YWl0IGZvciBzb21ldGhpbmcgYmVmb3JlIGNvbnN0cnVjdGlvbiAobGlrZSBwbHVnaW5zKT8gKi9cblx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKGJlZm9yZUNvbnN0cnVjdGlvbik7XG5cblx0XHRcdC8qIGdpdmUgdGhlIHJvb3QgYXJ0ZWZhY3QgYSB3YXkgdG8gcmVnaXN0ZXIgb3RoZXIgYXJ0ZWZhY3RzIGJ5IElEICovXG5cdFx0XHRpZiAodGhpcy5yb290ID09PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuX2FydGVmYWN0c0J5SUQgPSB7fTtcblx0XHRcdFx0dGhpcy5fcmVnaXN0ZXJBcnRlZmFjdCA9IGZ1bmN0aW9uIChhcnRlZmFjdCkge1xuXHRcdFx0XHRcdFUuZ2V0RGVmKHRoaXMuX2FydGVmYWN0c0J5SUQsIGFydGVmYWN0LmlkLCBkZWZlcikucmVzb2x2ZShhcnRlZmFjdCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHR9LCAvKiogQGxlbmRzIEFydGVmYWN0LnByb3RvdHlwZSAqLyB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEFsbG93IGEgcHJvbWlzZSB0byBiZSBpbnNlcnRlZCBvbiB3aGljaCB0aGUgcmVzdCBvZiBjb25zdHJ1Y3Rpb24gc2hvdWxkIHdhaXQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHBvc3NpYmxlUHJvbWlzZSB7Kn0gIC0gYSB2YWx1ZSB0aGF0IG1pZ2h0IGJlIGEgcHJvbWlzZVxuXHRcdFx0ICovXG5cdFx0XHRiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cblx0XHRcdFx0LyogaWYgbm8gcHJvbWlzZSBpcyBwYXNzZWQgaW4sIGlnbm9yZSwgdG8ga2VlcCBjb25zdHJ1Y3Rpb24gc3luY2hyb25vdXMgKi9cblx0XHRcdFx0aWYgKCFwb3NzaWJsZVByb21pc2UgfHwgISQuaXNGdW5jdGlvbihwb3NzaWJsZVByb21pc2UudGhlbikpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBpZiB0aGlzIGlzIHRoZSBmaXJzdCBwcm9taXNlIHBhc3NlZCBpbiwgaW5pdGlhbGl6ZSAndGhpcy5jb25zdHJ1Y3RlZCcgKi9cblx0XHRcdFx0aWYgKCF0aGlzLmNvbnN0cnVjdGVkKSB7IHRoaXMuY29uc3RydWN0ZWQgPSBQLnJlc29sdmUodGhpcykgfVxuXG5cdFx0XHRcdC8qIGluc2VydCB0aGUgbmV3IHByb21pc2UgaW50byB0aGUgY2hhaW4gZm9yICd0aGlzLmNvbnN0cnVjdGVkJyByZXNvbHV0aW9uICovXG5cdFx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkLnRhcCgoKSA9PiBQLnJlc29sdmUocG9zc2libGVQcm9taXNlKSk7XG5cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgb3B0aW9ucyBwcm92aWRlZCB0aHJvdWdoIHRoZSBjb25zdHJ1Y3RvclxuXHRcdFx0ICovXG5cdFx0XHRnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnMgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB1bmlxdWUgaWRlbnRpZmllciBiZWxvbmdpbmcgdG8gdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZCB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gdGhlIHR5cGUgb2YgdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGUgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBwYXJlbnQgb2YgdGhpcyBhcnRlZmFjdCwgdW5sZXNzIHRoaXMgaXMgdGhlIHJvb3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHBhcmVudCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdGdldCBjaGlsZHJlbigpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fSAtIHRoZSByb290IG9mIHRoZSBhcnRlZmFjdCBoaWVyYXJjaHlcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHJvb3QoKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fcm9vdCkgeyB0aGlzLl9yb290ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5yb290IDogdGhpcyB9XG5cdFx0XHRcdHJldHVybiB0aGlzLl9yb290O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEdldCBhIHByb21pc2UgdG8gYW4gYXJ0ZWZhY3QgZ2l2ZW4gaXRzIElELlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSAgaWQge1N0cmluZ30gICAtIHRoZSBpZCBvZiB0aGUgcmVxdWlyZWQgYXJ0ZWZhY3Rcblx0XHRcdCAqIEByZXR1cm4ge1A8QXJ0ZWZhY3Q+fSAtIHRoZSBwcm9taXNlIHRvIHRoZSBhcnRlZmFjdCB0aGF0IGhhcyB0aGUgZ2l2ZW4gaWRcblx0XHRcdCAqL1xuXHRcdFx0YXJ0ZWZhY3RCeUlkKGlkKSB7XG5cdFx0XHRcdHJldHVybiBVLmdldERlZih0aGlzLnJvb3QuX2FydGVmYWN0c0J5SUQsIGlkLCBkZWZlcikucHJvbWlzZTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBUcmF2ZXJzZSB0aGUgQXJ0ZWZhY3QgaGllcmFyY2h5IHdpdGggdGhpcyBhcyByb290LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBmbiB7KEFydGVmYWN0KSA9PiBCb29sZWFufSAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0dHJhdmVyc2VBcnRlZmFjdHMoZm4sIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR2YXIge29yZGVyfSA9IG9wdGlvbnM7XG5cdFx0XHRcdGlmICghb3JkZXIpIHsgb3JkZXIgPSAncHJlZml4JyB9XG5cblx0XHRcdFx0aWYgKG9yZGVyID09PSAncHJlZml4JykgeyBmbih0aGlzKSB9XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRjaGlsZC50cmF2ZXJzZUFydGVmYWN0cyhmbiwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwb3N0Zml4JykgeyBmbih0aGlzKSB9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogVHJhdmVyc2UgdGhlIEFydGVmYWN0IGhpZXJhcmNoeSB3aXRoIHRoaXMgYXMgcm9vdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gZm4geyhBcnRlZmFjdCkgPT4gQm9vbGVhbn0gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdHRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKHR5cGUsIGZuLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0dmFyIHtvcmRlcn0gPSBvcHRpb25zO1xuXHRcdFx0XHRpZiAoIW9yZGVyKSB7IG9yZGVyID0gJ3ByZWZpeCcgfVxuXG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3ByZWZpeCcgJiYgdGhpcy50eXBlID09PSB0eXBlKSB7IGZuKHRoaXMpIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuYmVmb3JlR29pbmdJbikgeyBvcHRpb25zLmJlZm9yZUdvaW5nSW4odGhpcykgfVxuXHRcdFx0XHR0aGlzLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKS5mb3JFYWNoKChkZXNjZW5kZW50KSA9PiB7XG5cdFx0XHRcdFx0ZGVzY2VuZGVudC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSh0eXBlLCBmbiwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5iZWZvcmVHb2luZ091dCkgeyBvcHRpb25zLmJlZm9yZUdvaW5nT3V0KHRoaXMpIH1cblx0XHRcdFx0aWYgKG9yZGVyID09PSAncG9zdGZpeCcgJiYgdGhpcy50eXBlID09PSB0eXBlKSB7IGZuKHRoaXMpIH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBSZXRyaWV2ZSB0aGUgY2xvc2VzdCBhbmNlc3RvciAocGFyZW50LCBwYXJlbnQncyBwYXJlbnQsIC4uLilcblx0XHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnRlZmFjdHx1bmRlZmluZWR9IC0gdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgdGhlIGdpdmVuIHR5cGUsIHVubGVzcyB0aGVyZSBpcyBub25lXG5cdFx0XHQgKi9cblx0XHRcdGNsb3Nlc3RBbmNlc3RvckJ5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzO1xuXHRcdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBSZXRyaWV2ZSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50IChjaGlsZHJlbiwgY2hpbGRyZW4ncyBjaGlsZHJlbiwgLi4uKVxuXHRcdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1tBcnRlZmFjdF19IC0gdGhlIGNsb3Nlc3QgZGVzY2VuZGFudHMgb2YgdGhlIGdpdmVuIHR5cGU7IG5vbmUgb2YgdGhlbVxuXHRcdFx0ICogICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGVzY2VuZGFudCBmcm9tIGFueSBvdGhlclxuXHRcdFx0ICovXG5cdFx0XHRjbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRpZiAoY2hpbGQudHlwZSA9PT0gdHlwZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goY2hpbGQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBJbmRpY2F0ZSB0aGF0IHRoaXMgYXJ0ZWZhY3Qgd2lsbCBuZXZlciBiZSB1c2VkIGFnYWluLCBhbGxvd2luZyBpdFxuXHRcdFx0ICogdG8gZG8gYW55IG5lY2Vzc2FyeSBjbGVhbnVwLlxuXHRcdFx0ICovXG5cdFx0XHRkZXN0cm95KCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKTtcblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4geyBjaGlsZC5kZXN0cm95KCkgfSk7XG5cdFx0XHR9XG5cblx0XHR9KSk7XG5cblxuXHRcdC8qKiB7QGZ1bmN0aW9uIEFydGVmYWN0Lm5ld1N1YmNsYXNzfVxuXHRcdCAqIEEgc3RhdGljIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHN1YmNsYXNzIG9mIHtAbGluayBBcnRlZmFjdH0uXG5cdFx0ICovXG5cdFx0d2luZG93Ll9hbXlfQXJ0ZWZhY3QubmV3U3ViY2xhc3MgPSBmdW5jdGlvbiBuZXdTdWJDbGFzcyhuYW1lLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30sIG9wdGlvbkRlZmF1bHRzID0ge30pIHtcblx0XHRcdHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKHdpbmRvdy5fYW15X0FydGVmYWN0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucyAqL1xuXHRcdFx0XHR2YXIgcHJvY2Vzc2VkT3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbkRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zW2tleV0gPSBvcHRpb25EZWZhdWx0c1trZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG5cblx0XHRcdFx0LyogY2FsbCBzdXBlci1jb25zdHJ1Y3RvciAqL1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgVS5leHRlbmQob3B0aW9ucywgcHJvY2Vzc2VkT3B0aW9ucykpO1xuXG5cdFx0XHRcdC8qIGNhbGwgdGhpcyBjb25zdHJ1Y3RvciAqL1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuXG5cdFx0XHRcdC8qIHRoZW4gcnVuIHRoZSAnY29uc3RydWN0JyBtZXRob2QgKi9cblx0XHRcdFx0aWYgKHRoaXMuY29uc3RydWN0ZWQpIHsgLy8gY29uc3RydWN0IGFzeW5jaHJvbm91c2x5XG5cdFx0XHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHRoaXMuY29uc3RydWN0KG9wdGlvbnMpKS5yZXR1cm4odGhpcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3Qob3B0aW9ucykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogcmVnaXN0ZXIgdGhpcyBhcnRlZmFjdCB0byB0aGUgY2lyY3VpdGJvYXJkICovXG5cdFx0XHRcdCh0aGlzLmNvbnN0cnVjdGVkIHx8IFAucmVzb2x2ZSgpKS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJvb3QuX3JlZ2lzdGVyQXJ0ZWZhY3QodGhpcyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdGdldCBjaXJjdWl0Ym9hcmQoKSB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHsgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2lyY3VpdGJvYXJkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSkpO1xuXHRcdH07XG5cblxuXHRcdHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5BcnRlZmFjdCA9IGMgfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9BcnRlZmFjdC5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBLZWZpciwgVFdFRU4pIHtcblxuXHQvKiBLZWZpciBqUXVlcnkgcGx1Z2luICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFx0cmVxdWlyZSgna2VmaXItanF1ZXJ5JykuaW5pdChLZWZpciwgJCk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRLZWZpci5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoKTtcblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBlbWl0dGVyLmVtaXQodGhpcykgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEtlZmlyLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Q29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNLZWZpclN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Q29kZSk7XG5cdH07XG5cblxuXHRLZWZpci5vbmNlID0gZnVuY3Rpb24gb25jZSh2YWx1ZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRlbWl0dGVyLmVtaXQodmFsdWUpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0XHQvL3JldHVybiBLZWZpci5jb25zdGFudCh2YWx1ZSk7IC8vIFRPRE86IHJlcGxhY2UgYWxsICdvbmNlJyBjYWxscyB3aXRoICdjb25zdGFudCcgY2FsbHM7IHRoZW4gcmVtb3ZlICdvbmNlJ1xuXHR9O1xuXG5cblx0S2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcblx0XHRcdGVtaXR0ZXIuZW5kKCk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBLZWZpci5idXMoKTtcblx0XHR2YXIgb3BlbiA9ICAgICAgS2VmaXIuYnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gICAgIEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRoYW5kbGVyKCgpID0+IHtcblx0XHRcdFx0b3Blbi5lbWl0KCk7XG5cdFx0XHRcdHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcblx0XHRcdFx0Y2xvc2UuZW1pdCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcblx0XHRcdHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2godmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkb05vdGhpbmcgPSAoKT0+e307XG5cdFx0dGhpcy5vblZhbHVlKGRvTm90aGluZyk7XG5cdFx0cmV0dXJuICgpID0+IHsgdGhpcy5vZmZWYWx1ZShkb05vdGhpbmcpIH07XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24gKGJ1dHRvbklkKSB7XG5cdFx0dmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoYiA9PiBiID09PSBidXR0b25JZCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChlKSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbEJ5KHVudGlsU3RyZWFtKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEtlZmlyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJrZWZpci1qcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICcuL2tlZmlyLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBLZWZpcikge1xuXG5cblx0LyoqIHtAZXhwb3J0fXtAY2xhc3MgS2VmaXJTaWduYWxIYW5kbGVyfVxuXHQgKiBVc2UgdGhpcyBhcyBhIHN1YmNsYXNzIChvciBqdXN0IG1peCBpdCBpbikgdG8gcHJvdmlkZSBzdXBwb3J0IGZvclxuXHQgKiBldmVudHMgYW5kIG9ic2VydmFibGUgcHJvcGVydGllcyB0aHJvdWdoIEtlZmlyLmpzLlxuXHQgKi9cblx0dmFyIEtlZmlyU2lnbmFsSGFuZGxlciA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gS2VmaXJTaWduYWxIYW5kbGVyKCkge1xuXG5cdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0dGhpcy5fcHJvcGVydGllcyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnR5QnVzc2VzID0ge307XG5cblx0fSwgLyoqIEBsZW5kcyBLZWZpclNpZ25hbEhhbmRsZXIucHJvdG90eXBlICovIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEZWNsYXJlcyBhIG5ldyBldmVudCBzdHJlYW0gZm9yIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgbmFtZSAgICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCwgdXNlZCB0byB0cmlnZ2VyIG9yIHN1YnNjcmliZSB0byBpdFxuXHRcdCAqIEBwYXJhbSAge0tlZmlyLlN0cmVhbX0gW3NvdXJjZV0gLSBhbm90aGVyIGV2ZW50IHN0cmVhbSB0byBhdXRvbWF0aWNhbGx5IHRyaWdnZXIgdGhpcyBldmVudFxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7S2VmaXIuQnVzfSAtIHRoZSBjcmVhdGVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqL1xuXHRcdG5ld0V2ZW50KG5hbWUsIHtzb3VyY2V9ID0ge30pIHtcblxuXHRcdFx0LyogaXMgdGhlIGV2ZW50IG5hbWUgYWxyZWFkeSB0YWtlbj8gKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgZXZlbnQgc3RyZWFtICovXG5cdFx0XHR2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG5cdFx0XHRpZiAoc291cmNlKSB7IGJ1cy5wbHVnKHNvdXJjZSkgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cztcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhbiBldmVudCBzdHJlYW0gYnkgbmFtZS4gSWYgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSBpcyBnaXZlbiwgYSBzdHJlYW1cblx0XHQgKiBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoYXQgcHJvcGVydHkgaXMgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLlN0cmVhbX0gLSB0aGUgZXZlbnQgc3RyZWFtIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuXHRcdCAqL1xuXHRcdGV2ZW50KG5hbWUpIHtcblxuXHRcdFx0LyogZG9lcyB0aGUgZXZlbnQgZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcmV0dXJuIGl0ICovXG5cdFx0XHRyZXR1cm4gdGhpcy5fZXZlbnRzW25hbWVdO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFJldHJpZXZlIGEgcHJvcGVydHkgYnkgbmFtZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byByZXRyaWV2ZVxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLlByb3BlcnR5fSAtIHRoZSBwcm9wZXJ0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRwcm9wZXJ0eShuYW1lKSB7IHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdIH0sXG5cblx0XHQvKiogQGFsaWFzIHByb3BlcnR5ICovXG5cdFx0cChuYW1lKSB7IHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdIH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBkZWZpbmVzIGEgbmV3IHByb3BlcnR5IG9uIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgICAgICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSAgICAgICAgICAgICAgICAgW3NldHRhYmxlPXRydWVdIC0gd2hldGhlciB0aGUgdmFsdWUgY2FuIGJlIG1hbnVhbGx5IHNldFxuXHRcdCAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgICAgICAgICAgICBbaW5pdGlhbF0gICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5XG5cdFx0ICogQHBhcmFtICB7ZnVuY3Rpb24oKiwqKTpCb29sZWFufSAgIFtpc0VxdWFsXSAgICAgICAtIGEgcHJlZGljYXRlIGZ1bmN0aW9uIGJ5IHdoaWNoIHRvIHRlc3QgZm9yIGR1cGxpY2F0ZSB2YWx1ZXNcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLlByb3BlcnR5fSAtIHRoZSBwcm9wZXJ0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRuZXdQcm9wZXJ0eShuYW1lLCB7c2V0dGFibGUsIGluaXRpYWwsIGlzRXF1YWx9ID0ge30pIHtcblxuXHRcdFx0LyogaXMgdGhlIHByb3BlcnR5IG5hbWUgYWxyZWFkeSB0YWtlbj8gKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGRlZmF1bHQgdmFsdWUgZm9yICdzZXR0YWJsZScgKi9cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHNldHRhYmxlKSkgeyBzZXR0YWJsZSA9IHRydWUgfVxuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGJ1cyB3aGljaCBtYW5hZ2VzIHRoZSBwcm9wZXJ0eSAqL1xuXHRcdFx0dmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIHByb3BlcnR5IGl0c2VsZiwgYW5kIGdpdmUgaXQgYWRkaXRpb25hbCBtZXRob2RzICovXG5cdFx0XHR2YXIgcHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gYnVzLnNraXBEdXBsaWNhdGVzKGlzRXF1YWwpLnRvUHJvcGVydHkoaW5pdGlhbCk7XG5cdFx0XHRwcm9wZXJ0eS5wbHVnID0gYnVzLnBsdWcuYmluZChidXMpO1xuXHRcdFx0cHJvcGVydHkudW5wbHVnID0gYnVzLnVucGx1Zy5iaW5kKGJ1cyk7XG5cdFx0XHRwcm9wZXJ0eS5nZXQgPSAoKSA9PiBwcm9wZXJ0eS5fY3VycmVudDtcblx0XHRcdGlmIChzZXR0YWJsZSkge1xuXHRcdFx0XHRwcm9wZXJ0eS5zZXQgPSAodmFsdWUpID0+IHsgYnVzLmVtaXQodmFsdWUpIH07XG5cdFx0XHR9XG5cblx0XHRcdC8qIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIG9iamVjdCBpbnRlcmZhY2UgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdGdldDogcHJvcGVydHkuZ2V0LFxuXHRcdFx0XHRzZXQ6IHNldHRhYmxlID8gcHJvcGVydHkuc2V0IDogdW5kZWZpbmVkXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBwcm9wZXJ0eSAqL1xuXHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFsbCBzdWJzY3JpYmVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gdHJpZ2dlclxuXHRcdCAqIEB2YWx1ZSB7Kn0gICAgICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBhdHRhY2ggdG8gdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlcihuYW1lLCB2YWx1ZSkge1xuXG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBzdHJlYW0gZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcHVzaCB0aGUgdmFsdWUgdG8gdGhlIHN0cmVhbSAqL1xuXHRcdFx0dGhpcy5fZXZlbnRzW25hbWVdLmVtaXQodmFsdWUpO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNlbGVjdHMgYW4gZXhpc3Rpbmcgc3RyZWFtIG9yIHByb3BlcnR5LCBhbmQgdGhlblxuXHRcdCAqIGVpdGhlciByZXR1cm5zIGl0LCBvciBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHRvIGl0LCBkZXBlbmRpbmdcblx0XHQgKiBvbiB3aGV0aGVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQuXG5cdFx0ICpcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IG9yIHByb3BlcnR5IHRvIHN1YnNjcmliZSB0b1xuXHRcdCAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgW2V4cGVjdGVkVmFsdWVdICAgICAgIC0gaWYgcHJvdmlkZWQsIGZpbHRlcnMgdGhlIHN0cmVhbSBieSA9PT0gZXF1YWxpdHkgd2l0aCB0aGlzIHZhbHVlO1xuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAgLSBhIHBsYWluIG9iamVjdCBmb3IgcHJvdmlkaW5nIGFkZGl0aW9uYWwgb3B0aW9uc1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgW29wdGlvbnMub25jZT1mYWxzZV0gIC0gd2hldGhlciB0aGUgc3RyZWFtIGVuZHMgYWZ0ZXIgb25lIGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbigqKTp2b2lkfSBbY2FsbGJhY2tdICAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dW5kZWZpbmVkfSAtIGlmIG5vIGBjYWxsYmFja2AgaXMgcHJvdmlkZWQsIHRoZSBzcGVjaWZpZWQgZXZlbnQgc3RyZWFtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBwcm9wZXJ0eTsgb3RoZXJ3aXNlLCBhIGZ1bmN0aW9uIHRvIHVuc3Vic2NyaWJlIHRvIHNhaWRcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3MgY2FsbGJhY2sgKi9cblx0XHRcdGlmIChjYWxsYmFjaykgeyByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjaykgfVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogUHJvY2VzcyB0aGUgYXJndW1lbnRzIGFjY2VwdGVkIGJ5IHtAbGluayBvbn0uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0X2dhdGhlck9uQXJndW1lbnRzKC4uLmFyZ3MpIHtcblx0XHRcdHZhciByZXN1bHQgPSB7IG5hbWU6IGFyZ3Muc2hpZnQoKSB9O1xuXG5cdFx0XHQvKiB0ZXN0IGZvciBleHBlY3RlZCB2YWx1ZSBhcmd1bWVudCAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmICFVLmlzRnVuY3Rpb24oYXJnc1swXSkgJiYgIVUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuZXhwZWN0ZWRWYWx1ZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGVzdCBmb3IgY2FsbGJhY2sgZnVuY3Rpb24gKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzRnVuY3Rpb24oYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdH0pO1xuXG5cblx0cmV0dXJuIEtlZmlyU2lnbmFsSGFuZGxlcjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanNcbiAqKi8iLCJkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfbmV4dElkID0gMDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG5cdFx0cmV0dXJuIGAke3ByZWZpeHx8XCJ1bmlxdWUtaWRcIn0tJHtfbmV4dElkKyt9YDtcblx0fTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdkZWx0YS1qcycgXSwgZnVuY3Rpb24gKFAsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGFscmVhZHkgY2FjaGVkPyAqL1xuXHRpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwpIHsgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsIH1cblxuXG5cdC8qIHRlbGwgZGVsdGEuanMgYWJvdXQgYmx1ZWJpcmQgKi9cblx0RE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcblxuXG5cdC8qIHNldCB0aGUgY2FjaGUgKi9cblx0d2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgPSBuZXcgRE0oKTtcblxuXG5cdC8qIHJldHVybiB0aGUgZGVsdGEgbW9kZWwgdGhhdCBtYW5hZ2VzIGFsbCBwbHVnaW5zICg9IGRlbHRhcykgKi9cblx0cmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL25ld1dpZGdldFR5cGUuanMnLFxuXHQnLi9taXNjLmpzJyxcblx0Jy4va2VmaXItc2lnbmFsLWhhbmRsZXIuanMnLFxuXHQnLi9kZWZlci5qcycsXG5cdCcuL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgbmV3V2lkZ2V0VHlwZSwgVSwgU2lnbmFsSGFuZGxlciwgZGVmZXIsIGRtKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdGlmICghd2luZG93Ll9hbXlQbHVnaW4pIHtcblx0XHR3aW5kb3cuX2FteVBsdWdpbiA9IGZ1bmN0aW9uIChwbHVnaW5PclNlbGVjdGlvbikge1xuXHRcdFx0aWYgKCQuaXNQbGFpbk9iamVjdChwbHVnaW5PclNlbGVjdGlvbikpIHtcblxuXHRcdFx0XHQvKiB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW4gKi9cblx0XHRcdFx0cmV0dXJuIG5ldyBkbS5EZWx0YShwbHVnaW5PclNlbGVjdGlvbi5uYW1lLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0VS5hc3NlcnQoIV9zZWxlY3RlZERlZmVycmVkLmRvbmUsXG5cdFx0XHRcdFx0XHRgQXBpTkFUT01ZIHBsdWdpbnMgY2FuIG9ubHkgYmUgc2VsZWN0ZWQgb25jZSwgYWZ0ZXIgd2hpY2ggdGhleSBhcmUgZml4ZWQuYCk7XG5cdFx0XHRcdF9zZWxlY3RlZERlZmVycmVkLmRvbmUgPSB0cnVlO1xuXG5cdFx0XHRcdC8qIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHNlbGVjdCBwbHVnaW5zIHRvIGJlIGFwcGxpZWQgKi9cblx0XHRcdFx0ZG0uc2VsZWN0LmFwcGx5KGRtLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHRcdF9zZWxlY3RlZERlZmVycmVkLnJlc29sdmUodGhpcyk7XG5cblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkO1xuXG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgX3NlbGVjdGVkRGVmZXJyZWQgPSBkZWZlcigpO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkID0gX3NlbGVjdGVkRGVmZXJyZWQucHJvbWlzZTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5ncmFwaCA9ICgpID0+IGRtLmdyYXBoKCk7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uZG0gPSBkbTtcblx0fVxuXG5cblx0cmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9wbHVnaW4uanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbiAoUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHZhciByZXNvbHZlLCByZWplY3Q7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcblx0XHRcdHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRyZWplY3QgPSBhcmd1bWVudHNbMV07XG5cdFx0fSk7XG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG5cdFx0XHRyZWplY3Q6IHJlamVjdCxcblx0XHRcdHByb21pc2U6IHByb21pc2Vcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvZGVmZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJywgJy4uL0FydGVmYWN0LmpzJywgJy4va2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUsIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiAgYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KSAgICAgICAgICAqL1xuXHQvKiAgYXMgYSBqUXVlcnkgZWxlbWVudCBwbHVnaW47IHRoaXMgaXMgcmV0dXJuZWQgZnJvbSB0aGUgbW9kdWxlICAqL1xuXHRmdW5jdGlvbiBuZXdXaWRnZXRUeXBlKHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cblx0XHQvKiB0aGUgc3BlY2lmaWMgd2lkZ2V0IGNsYXNzICovXG5cdFx0dmFyIFdpZGdldFAgPSBBcnRlZmFjdFAudGhlbigoQXJ0ZWZhY3QpID0+IEFydGVmYWN0Lm5ld1N1YmNsYXNzKHR5cGVOYW1lLCBmdW5jdGlvbiAoe2Nzc0NsYXNzfSkge1xuXG5cdFx0XHQvKiBzZXQgdGhlIGVsZW1lbnQgQ1NTIGNsYXNzICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoY3NzQ2xhc3MpKSB7IHRoaXMuZWxlbWVudC5hZGRDbGFzcyhjc3NDbGFzcykgfVxuXG5cdFx0XHQvKiBpZiB0aGUganF1ZXJ5IGVsZW1lbnQgaXMgcmVtb3ZlZCwgZGVzdHJveSB0aGUgYXJ0ZWZhY3QgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5hc0tlZmlyU3RyZWFtKCdyZW1vdmUnKS5vblZhbHVlKCgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSk7XG5cblx0XHR9LCB7XG5cblx0XHRcdGdldCBtb2RlbCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tb2RlbCB9LFxuXG5cdFx0XHRnZXQgZWxlbWVudCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5lbGVtZW50IH1cblxuXHRcdH0sIFUuZXh0ZW5kKHtcblxuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uOiBQLnJlc29sdmUoKSAvLyBndWFyYW50ZWUgYWxsIHdpZGdldCBjb25zdHJ1Y3Rpb24gdG8gYmUgYXN5bmNocm9ub3VzXG5cblx0XHR9LCBvcHRpb25EZWZhdWx0cykpKTtcblxuXHRcdC8qIGNyZWF0ZSBhIGxvd2VyY2FzZSBuYW1lIGZvciB0aGlzIHdpZGdldCB0eXBlICovXG5cdFx0dmFyIGxvd2VyY2FzZU5hbWUgPSB0eXBlTmFtZVswXS50b0xvd2VyQ2FzZSgpICsgdHlwZU5hbWUuc2xpY2UoMSk7XG5cblx0XHQvKiBqUXVlcnkgcGx1Z2luOiB0aGUgd2lkZ2V0IGNyZWF0aW9uICYgcmV0cmlldmFsIGZ1bmN0aW9uICAqL1xuXHRcdCQuZm5bbG93ZXJjYXNlTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG5cdFx0XHQvKiBpZiB0aGUgd29yZCAnaW5zdGFuY2UnIGlzIHBhc3NlZCwgcmV0dXJuIHRoZSAoYWxyZWFkeSBjcmVhdGVkKSB3aWRnZXQgcHJvbWlzZSAqL1xuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdpbnN0YW5jZScpIHsgcmV0dXJuIHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCkgfVxuXG5cdFx0XHQvKiBlbHNlLCBjcmVhdGUgYSBuZXcgd2lkZ2V0IGFuZCBzZXQgYSBwcm9taXNlIHRvIGl0ICovXG5cdFx0XHR0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWAsIFdpZGdldFBcblx0XHRcdFx0XHQudGhlbigoV2lkZ2V0KSA9PiBuZXcgV2lkZ2V0KFUuZXh0ZW5kKG9wdGlvbnMsIHsgZWxlbWVudDogdGhpcyB9KSkuY29uc3RydWN0ZWQpKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb24gKi9cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHRcdC8qIHJldHVybiBhIHByb21pc2UgdG8gdGhlIHdpZGdldCBhcnRlZmFjdCBjbGFzcyAqL1xuXHRcdHJldHVybiBXaWRnZXRQO1xuXG5cdH1cblxuXG5cdC8qIGV4cG9zZSB0aGUgd2lkZ2V0IGNsYXNzIGNyZWF0b3IgZnVuY3Rpb24gKi9cblx0cmV0dXJuIG5ld1dpZGdldFR5cGU7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL25ld1dpZGdldFR5cGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJUaHJlZURNb2RlbC5qcyJ9