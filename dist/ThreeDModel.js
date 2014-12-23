(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "baconjs", "tweenjs", "bacon.model", "bacon.jquery", "delta-js"], factory);
	else if(typeof exports === 'object')
		exports["ThreeDModel"] = factory(require("jquery"), require("three-js"), require("bluebird"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"), require("delta-js"));
	else
		root["ThreeDModel"] = factory(root["jQuery"], root["THREE"], root["P"], root["Bacon"], root["TWEEN"], root["bacon.model"], root["bacon.jquery"], root["DeltaModel"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_16__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(3), __webpack_require__(6), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Bacon, ArtefactP) {
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
	      geometry.morphTargets.concat([geometry]).forEach((function($__1) {
	        var vertices = $__1.vertices;
	        vertices.forEach((function(point) {
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
	    Bacon.animationFrames().onValue((function() {
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
	      this.newProperty('visible', {initial: visible});
	      this.newProperty('hidden');
	      this.p('visible').addSource(this.property('hidden').not());
	      this.p('hidden').addSource(this.property('visible').not());
	      this.p('visible').value(true).flatMap(this.p('visible')).onValue((function(visible) {
	        $__0.object3D.then((function(obj) {
	          obj.visible = visible;
	        }));
	      }));
	      this.p('hidden').addSource(this.on('destroy').take(1).map(true));
	      this.p('hidden').addSource(this.parent.p('hidden').value(true));
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
	        var $__0 = this;
	        if (!this._object3D) {
	          this._object3D = this._load().tap(calculateBoundingBox).tap((function(obj) {
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
	            }));
	          })).tap((function(obj) {
	            obj.userData.artefact = $__0;
	          })).tap((function(obj) {
	            $__0._tile.object3D.add(obj);
	          })).tap(startThreeDAnimation);
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
	          geometry.morphTargets.forEach((function($__1) {
	            var vertices = $__1.vertices;
	            vertices.forEach((function(point) {
	              point.applyMatrix4(matrix);
	            }));
	          }));
	          geometry.applyMatrix(matrix);
	        }));
	      },
	      _load: function() {
	        if (U.isDefined(this.options.file)) {
	          return this._loadFile();
	        }
	        if (U.isDefined(this.options.parts)) {
	          return this._loadParts();
	        }
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
	    }, {visible: true});
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm, plugin, defer) {
	  'use strict';
	  return plugin.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, (function(superFn) {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(9);
	  __webpack_require__(10);
	  Bacon.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Bacon.fromBinder((function(sink) {
	      obj.on(eventName, (function(v) {
	        sink(new Bacon.Next(v));
	      }));
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Bacon.animationFrames = function animationFrames() {
	    return Bacon.fromBinder((function(sink) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          if (sink() === Bacon.noMore) {
	            subscribed = false;
	          }
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
	  Bacon.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = new Bacon.Bus();
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
	    addStream(Bacon.fromBinder((function(sink) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        var $__0 = this;
	        sink(new Bacon.Next((function() {
	          return $__0;
	        })));
	      });
	      tw.onComplete((function() {
	        sink(new Bacon.End());
	      }));
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
	  Bacon.keyPress = function keyPress(keycode) {
	    return $(window).asEventStream('keypress').filter((function(e) {
	      return e.keyCode === keycode;
	    }));
	  };
	  Bacon.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = new Bacon.Bus();
	    var open = new Bacon.Bus();
	    var close = new Bacon.Bus();
	    pacing.filter(wantedBus.toProperty(false)).onValue(handler, (function() {
	      open.push();
	      wantedBus.push(false);
	      close.push();
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.map(true));
	      return close.startWith(true).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntil(open).reduce([], accumulator).flatMap(Bacon.fromArray);
	      }));
	    };
	  };
	  Bacon.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Bacon.EventStream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Bacon.fromBinder((function(sink) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(new Bacon.Next((function() {
	          return value;
	        })));
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          sink(oldBuffer);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Bacon.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Bacon.Observable.prototype.run = function() {
	    return this.subscribe((function() {}));
	  };
	  Bacon.EventStream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Bacon.EventStream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove');
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
	      return stream.takeUntil($(document).asEventStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asEventStream('mousemove');
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
	      return $(document).asEventStream('mouseup').take(1).takeUntil(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asEventStream('mousewheel DOMMouseScroll');
	  };
	  return Bacon;
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
	  var BaconSignalHandler = U.newClass(function BaconSignalHandler() {
	    this._events = {};
	    this._properties = {};
	    this._propertyBusses = {};
	  }, {
	    newEvent: function(name) {
	      var source = (arguments[1] !== (void 0) ? arguments[1] : {}).source;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      var bus = new Bacon.Bus();
	      if (source) {
	        bus.plug(source);
	      }
	      return this._events[name] = bus.name(name);
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
	      var property = this._properties[name] = new Bacon.Model(initial, {isEqual: isEqual});
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      return property;
	    },
	    trigger: function(name, value) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      this._events[name].push(value);
	    },
	    on: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      return this._on(argsObj);
	    },
	    one: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      U.object(argsObj, 'options').once = true;
	      return this._on(argsObj);
	    },
	    _on: function($__1) {
	      var $__2 = $__1,
	          name = $__2.name,
	          expectedValue = $__2.expectedValue,
	          options = $__2.options,
	          callback = $__2.callback;
	      U.assert(this._events[name] || this._properties[name], ("There is no event or property '" + name + "' on this object."));
	      var result = this._events[name] || this._properties[name];
	      if (U.isDefined(expectedValue)) {
	        result = result.filter((function(v) {
	          return v === expectedValue;
	        }));
	      }
	      if (options && options.once) {
	        result = result.take(1);
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
	      if (U.isDefined(args[0]) && U.isPlainObject(args[0])) {
	        result.options = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isFunction(args[0])) {
	        result.callback = args.shift();
	      }
	      return result;
	    }
	  });
	  return BaconSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(17), __webpack_require__(5), __webpack_require__(11), __webpack_require__(15), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
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
	        this.element.asEventStream('remove').onValue((function() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzOTJkZTQ2ODAxNjUzOGM3NGViNiIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL0FydGVmYWN0LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9iYWNvbi1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNvbi5tb2RlbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLmpxdWVyeVwiIiwid2VicGFjazovLy8uL3NyYy91dGlsL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3BsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL25ld1dpZGdldFR5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHLEdBQUcsR0FBRyxNQUFJLENBQUcsVUFBUTtBQUMzQyxjQUFXLENBQUM7QUFJWixVQUFTLFdBQVMsQ0FBRSxFQUFHO0FBQUUsVUFBTyxhQUFhLE1BQUksU0FBUyxHQUFLLGFBQWEsTUFBSSxl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QUFRLFFBQVE7U0FBRTtBQUFBLE9BRTdDLENBQUcsU0FBUSxDQUFDLENBRVgsa0JBQWlCLENBQUcsVUFBUyxFQUFDLENBRS9CLENBQUcsZUFBYSxDQUFDLENBQUM7S0FBQSxFQUFDLENBQUM7QUFHaEIscUJBQVksRUFBSSxTQUFPLENBQUUsRUFBQyxZQUFhLEVBQUMsRUFBSSxTQUFPLE1BQU8sQ0FBQyxFQUFDLENBQUM7QUFHakUsUUFBRyxDQUFFLGFBQVksQ0FBQyxFQUFJLFVBQVUsT0FBTTs7QUFHckMsVUFBSSxPQUFNLElBQU0sV0FBUyxDQUFHO0FBQUUsY0FBTyxLQUFHLEtBQU0sRUFBQyxPQUFPLEVBQUMsY0FBWSxFQUFHO09BQUU7QUFHeEUsVUFBRyxLQUFNLEVBQUMsT0FBTyxFQUFDLGNBQVksRUFBSyxRQUFNLEtBQ2xDLEVBQUMsU0FBQyxNQUFLO2NBQU0sSUFBSSxPQUFNLENBQUMsUUFBUSxDQUFDLE9BQU0sQ0FBRyxFQUFFLE9BQU0sTUFBTSxDQUFFLENBQUMsQ0FBQyxZQUFZO09BQUEsRUFBQyxDQUFDLENBQUM7QUFHbEYsWUFBTyxLQUFHLENBQUM7S0FFWixDQUFDO0FBR0QsVUFBTyxRQUFNLENBQUM7R0FFZjtBQUlBLFFBQU8sY0FBWSxDQUFDO0FBR3JCLEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIiwgXCJibHVlYmlyZFwiLCBcImJhY29uanNcIiwgXCJ0d2VlbmpzXCIsIFwiYmFjb24ubW9kZWxcIiwgXCJiYWNvbi5qcXVlcnlcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJUaHJlZURNb2RlbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlRocmVlRE1vZGVsXCJdID0gZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImJhY29uLm1vZGVsXCJdLCByb290W1wiYmFjb24uanF1ZXJ5XCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDM5MmRlNDY4MDE2NTM4Yzc0ZWI2XG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMnLFxuXHQnLi9BcnRlZmFjdC5qcydcbl0sIGZ1bmN0aW9uICgkLCBUSFJFRSwgVSwgUCwgQmFjb24sIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBjb252ZW5pZW5jZSBwcmVkaWNhdGUgZnVuY3Rpb25zICovXG5cdGZ1bmN0aW9uIGlzR2VvbWV0cnkodikgeyByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLkdlb21ldHJ5IHx8IHYgaW5zdGFuY2VvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeSB9XG5cdGZ1bmN0aW9uIGlzT2JqZWN0M0QodikgeyByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLk9iamVjdDNEIH1cblx0ZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHsgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMSB9XG5cblx0LyogY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gdmlzaXQgYWxsIGdlb21ldHJpZXMgaW4gYW4gT2JqZWN0M0QgKi9cblx0ZnVuY3Rpb24gdHJhdmVyc2VHZW9tZXRyaWVzKG9iaiwgZm4pIHtcblx0XHRvYmoudHJhdmVyc2UoKHN1Yk9iaikgPT4ge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoc3ViT2JqLmdlb21ldHJ5KSkgeyByZXR1cm4gfVxuXHRcdFx0Zm4oc3ViT2JqLmdlb21ldHJ5KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBvdmVyYWxsIGJvdW5kaW5nIGJveCBvZiBhbiBvYmplY3QzRCAqL1xuXHRmdW5jdGlvbiBjYWxjdWxhdGVCb3VuZGluZ0JveChvYmopIHtcblx0XHRvYmoudXNlckRhdGEuYm91bmRpbmdCb3ggPSBuZXcgVEhSRUUuQm94MygpO1xuXHRcdHRyYXZlcnNlR2VvbWV0cmllcyhvYmosIChnZW9tZXRyeSkgPT4ge1xuXHRcdFx0Z2VvbWV0cnkubW9ycGhUYXJnZXRzLmNvbmNhdChbZ2VvbWV0cnldKS5mb3JFYWNoKCh7dmVydGljZXN9KSA9PiB7XG5cdFx0XHRcdHZlcnRpY2VzLmZvckVhY2goKHBvaW50KSA9PiB7XG5cdFx0XHRcdFx0b2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LmV4cGFuZEJ5UG9pbnQocG9pbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyogY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gY2VudGVyIGFsbCB0aGUgZ2VvbWV0cnkgb2YgYW4gb2JqZWN0IG9uIGl0cyAoMCwgMCwgMCkgcG9pbnQgKi9cblx0ZnVuY3Rpb24gc3RhcnRUaHJlZURBbmltYXRpb24ob2JqKSB7XG5cdFx0dmFyIGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cdFx0dmFyIG1vcnBoT2JqcyA9IFtdO1xuXHRcdG9iai50cmF2ZXJzZSgoc3ViT2JqKSA9PiB7XG5cdFx0XHRpZiAoc3ViT2JqIGluc3RhbmNlb2YgVEhSRUUuTW9ycGhBbmltTWVzaCkge1xuXHRcdFx0XHRtb3JwaE9ianMucHVzaChzdWJPYmopO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdEJhY29uLmFuaW1hdGlvbkZyYW1lcygpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0dmFyIGRUaW1lID0gY2xvY2suZ2V0RGVsdGEoKTtcblx0XHRcdG1vcnBoT2Jqcy5mb3JFYWNoKChtb3JwaE9iaikgPT4ge1xuXHRcdFx0XHRtb3JwaE9iai51cGRhdGVBbmltYXRpb24oMTAwMCAqIGRUaW1lKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBhIHByb21pc2UgdG8gdGhlIG5ldyBUaHJlZURNb2RlbCBjbGFzcyAqL1xuXHRyZXR1cm4gQXJ0ZWZhY3RQLnRoZW4oKEFydGVmYWN0KSA9PiB7XG5cblxuXHRcdC8qIGhvd2V2ZXIgKG9mdGVuKSB0aGlzIGlzIGxvYWRlZCwgY3JlYXRlIHRoZSBjbGFzcyBvbmx5IG9uY2UgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfVGhyZWVETW9kZWwpKSB7IHJldHVybiB3aW5kb3cuX2FteV9UaHJlZURNb2RlbCB9XG5cblxuXHRcdHZhciBUaHJlZURNb2RlbCA9IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ1RocmVlRE1vZGVsJywgZnVuY3Rpb24gVGhyZWVETW9kZWwoe3Zpc2libGV9KSB7XG5cblx0XHRcdC8qIHRoZSAndmlzaWJsZScgYW5kICdoaWRkZW4nIHByb3BlcnRpZXMgKi9cblx0XHRcdHRoaXMubmV3UHJvcGVydHkoJ3Zpc2libGUnLCB7IGluaXRpYWw6IHZpc2libGUgfSk7XG5cdFx0XHR0aGlzLm5ld1Byb3BlcnR5KCdoaWRkZW4nKTtcblx0XHRcdHRoaXMucCgndmlzaWJsZScpLmFkZFNvdXJjZSh0aGlzLnByb3BlcnR5KCdoaWRkZW4nKS5ub3QoKSk7XG5cdFx0XHR0aGlzLnAoJ2hpZGRlbicpLmFkZFNvdXJjZSh0aGlzLnByb3BlcnR5KCd2aXNpYmxlJykubm90KCkpO1xuXG5cdFx0XHQvKiBtYW5pZmVzdCB0aGlzIHZpc2liaWxpdHkgb24gdGhlIGNhbnZhcyAqL1xuXHRcdFx0dGhpcy5wKCd2aXNpYmxlJykudmFsdWUodHJ1ZSkuZmxhdE1hcCh0aGlzLnAoJ3Zpc2libGUnKSkub25WYWx1ZSgodmlzaWJsZSkgPT4ge1xuXHRcdFx0XHR0aGlzLm9iamVjdDNELnRoZW4oKG9iaikgPT4geyBvYmoudmlzaWJsZSA9IHZpc2libGUgfSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Lyogd2hlbiB0aGUgM0QgbW9kZWwgaXMgZGVzdHJveWVkLCBpdCBpcyBhbHNvIGhpZGRlbiAqL1xuXHRcdFx0dGhpcy5wKCdoaWRkZW4nKS5hZGRTb3VyY2UodGhpcy5vbignZGVzdHJveScpLnRha2UoMSkubWFwKHRydWUpKTtcblxuXHRcdFx0Lyogd2hlbiB0aGUgcGFyZW50IGlzIGhpZGRlbiwgaGlkZSB0aGlzIG1vZGVsIHRvbyAqL1xuXHRcdFx0dGhpcy5wKCdoaWRkZW4nKS5hZGRTb3VyY2UodGhpcy5wYXJlbnQucCgnaGlkZGVuJykudmFsdWUodHJ1ZSkpO1xuXG5cdFx0XHQvKiBncmFiIGEgbGluayB0byB0aGUgY2xvc2VzdCBhbmNlc3RvciB0aWxlICovXG5cdFx0XHQvLyBUT0RPOiAzRCBtb2RlbHMgYXJlIG5vdyB0aWVkIHRvIGEgcGFyZW50IHRpbGU7IHRoaXMgaXMgbm90IGVsZWdhbnRcblx0XHRcdHRoaXMuX3RpbGUgPSB0aGlzLmNsb3Nlc3RBbmNlc3RvckJ5VHlwZSgnVGlsZScpO1xuXG5cblx0XHRcdC8qIGNyZWF0ZSBhbGwgZGVzY2VuZGFudCBUaHJlZURNb2RlbCdzICh3aXRob3V0IG5lY2Vzc2FyaWx5IGxvYWRpbmcgdGhlaXIgb2JqZWN0M0QpICovXG5cdFx0XHR2YXIgSU5IRVJJVEVEX09QVElPTlMgPSBbJ2NvbG9yJywgJ2FuaW1hdGlvbiddO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5vcHRpb25zLnBhcnRzIHx8IHt9KS5mb3JFYWNoKChpZCkgPT4ge1xuXG5cdFx0XHRcdC8qIHRoZSBvcHRpb25zIG9mIHRoZSBuZXcgVGhyZWVETW9kZWwgKi9cblx0XHRcdFx0dmFyIHBhcnQgPSB0aGlzLm9wdGlvbnMucGFydHNbaWRdO1xuXG5cdFx0XHRcdC8qIGRlZmluZSB0aGUgb3B0aW9ucyB3ZSB3YW50IHRvIHBhc3MgdG8gdGhlIGNvcnJlc3BvbmRpbmcgY2hpbGQgYXJ0ZWZhY3QgKi9cblx0XHRcdFx0dmFyIG5ld0NoaWxkT3B0aW9ucyA9IFUuZXh0ZW5kKHsgaWQsIHBhcmVudDogdGhpcyB9LCBwYXJ0KTtcblx0XHRcdFx0SU5IRVJJVEVEX09QVElPTlMuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG5ld0NoaWxkT3B0aW9uc1twcm9wXSkpIHtcblx0XHRcdFx0XHRcdG5ld0NoaWxkT3B0aW9uc1twcm9wXSA9IHRoaXMub3B0aW9uc1twcm9wXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGNvbnN0cnVjdCB0aGUgY2hpbGQgVGhyZWVETW9kZWwgKi9cblx0XHRcdFx0cmV0dXJuIG5ldyB3aW5kb3cuX2FteV9UaHJlZURNb2RlbChuZXdDaGlsZE9wdGlvbnMpO1xuXG5cdFx0XHR9KTtcblxuXG5cblx0XHR9LCB7XG5cblx0XHRcdGdldCBvYmplY3QzRCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9vYmplY3QzRCkge1xuXHRcdFx0XHRcdHRoaXMuX29iamVjdDNEID0gdGhpcy5fbG9hZCgpXG5cblx0XHRcdFx0XHRcdC8qIHByb2Nlc3MgdGhlIGdlb21ldHJpZXMgYW5kIGNlbnRlciB0aGVtIG9uICgwLCAwLCAwKSAqL1xuXHRcdFx0XHRcdFx0XHQudGFwKGNhbGN1bGF0ZUJvdW5kaW5nQm94KVxuXHRcdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHsgdGhpcy5fY2VudGVyR2VvbWV0cmllcyhvYmopIH0pXG5cblx0XHRcdFx0XHRcdC8qIHJlc2l6ZSAvIHJvdGF0ZSB0aGUgb2JqZWN0IGJhc2VkIG9uIHRoZSBzaGFwZSBvZiB0aGUgdGlsZSAqL1xuXHRcdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnAoJ3Zpc2libGUnKS52YWx1ZSh0cnVlKS5mbGF0TWFwKCgpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX3RpbGUucCgnc2l6ZScpLnRha2VXaGlsZSh0aGlzLnAoJ3Zpc2libGUnKSkpLm9uVmFsdWUoKHNpemUpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0LyogYWJicmV2aWF0ZSAzRC1vYmplY3Qgd2lkdGggYW5kIGhlaWdodCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIG9ialdpZHRoID0gb2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LnNpemUoKS54O1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIG9iakhlaWdodCA9IG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5zaXplKCkueTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Lyogcm90YXRlIDkwwrAgb24gdGhlIHotYXhpcyBpZiB0aGlzIGdpdmVzIGEgYmV0dGVyIGZpdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKChzaXplLndpZHRoIDwgc2l6ZS5oZWlnaHQpICE9PSAob2JqV2lkdGggPCBvYmpIZWlnaHQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9iai5yb3RhdGlvbi56ID0gMC41ICogTWF0aC5QSTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0W29ialdpZHRoLCBvYmpIZWlnaHRdID0gW29iakhlaWdodCwgb2JqV2lkdGhdO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b2JqLnJvdGF0aW9uLnogPSAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvKiBkZXRlcm1pbmUgdGhlIHNjYWxlIHJhdGlvICovXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmF0aW8gPSAwLjggKiBNYXRoLm1pbihzaXplLndpZHRoIC8gb2JqV2lkdGgsIHNpemUuaGVpZ2h0IC8gb2JqSGVpZ2h0KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0LyogYWRqdXN0IHNpemUgKi9cblx0XHRcdFx0XHRcdFx0XHRcdG9iai5zY2FsZS5zZXQocmF0aW8sIHJhdGlvLCByYXRpbyk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8qIGFkanVzdCAnYWx0aXR1ZGUnICovXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZWxldmF0aW9uID0gVS5kZWZPcih0aGlzLm9wdGlvbnMuZWxldmF0aW9uLCBNYXRoLm1pbihzaXplLndpZHRoLCBzaXplLmhlaWdodCkgLyA0KTtcblx0XHRcdFx0XHRcdFx0XHRcdG9iai5wb3NpdGlvbi56ID0gMC41ICogcmF0aW8gKiBvYmoudXNlckRhdGEuYm91bmRpbmdCb3guc2l6ZSgpLnogKyBlbGV2YXRpb247XG5cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSlcblxuXHRcdFx0XHRcdFx0LyogYmFjay1saW5rIHRoZSBhcnRlZmFjdCB0byB0aGUgb2JqZWN0M0QgKi9cblx0XHRcdFx0XHRcdFx0LnRhcCgob2JqKSA9PiB7IG9iai51c2VyRGF0YS5hcnRlZmFjdCA9IHRoaXMgfSlcblxuXHRcdFx0XHRcdFx0LyogYWRkIHRoaXMgb2JqZWN0IHRvIHRoZSBzY2VuZSAqL1xuXHRcdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl90aWxlLm9iamVjdDNELmFkZChvYmopO1xuXHRcdFx0XHRcdFx0XHR9KVxuXG5cdFx0XHRcdFx0XHQvKiBzdGFydCB0aGUgYW5pbWF0aW9uIG9mIHRoaXMgb2JqZWN0LCBpZiBhcHBsaWNhYmxlICovXG5cdFx0XHRcdFx0XHRcdC50YXAoc3RhcnRUaHJlZURBbmltYXRpb24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuX29iamVjdDNEO1xuXHRcdFx0fSxcblxuXG5cdFx0XHRfY2VudGVyR2VvbWV0cmllcyhvYmopIHtcblx0XHRcdFx0aWYgKCF0aGlzLmdlb21ldHJ5Q29ycmVjdGlvbikgeyB0aGlzLmdlb21ldHJ5Q29ycmVjdGlvbiA9IHRoaXMub3B0aW9ucy5nZW9tZXRyeUNvcnJlY3Rpb24gfVxuXHRcdFx0XHRpZiAoIXRoaXMuZ2VvbWV0cnlDb3JyZWN0aW9uKSB7IHRoaXMuZ2VvbWV0cnlDb3JyZWN0aW9uID0gb2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LmNlbnRlcigpLm5lZ2F0ZSgpIH1cblx0XHRcdFx0dHJhdmVyc2VHZW9tZXRyaWVzKG9iaiwgKGdlb21ldHJ5KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCkuc2V0UG9zaXRpb24odGhpcy5nZW9tZXRyeUNvcnJlY3Rpb24pO1xuXHRcdFx0XHRcdGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cy5mb3JFYWNoKCh7dmVydGljZXN9KSA9PiB7XG5cdFx0XHRcdFx0XHR2ZXJ0aWNlcy5mb3JFYWNoKChwb2ludCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRwb2ludC5hcHBseU1hdHJpeDQobWF0cml4KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGdlb21ldHJ5LmFwcGx5TWF0cml4KG1hdHJpeCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXG5cdFx0XHRfbG9hZCgpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3B0aW9ucy5maWxlKSkgeyByZXR1cm4gdGhpcy5fbG9hZEZpbGUoKSB9XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMucGFydHMpKSB7IHJldHVybiB0aGlzLl9sb2FkUGFydHMoKSB9XG5cdFx0XHR9LFxuXG5cdFx0XHRfbG9hZEZpbGUoKSB7XG5cdFx0XHRcdHZhciB7ZmlsZSwgY29sb3IsIGFuaW1hdGlvbn0gPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdFx0Lyogc2VsZWN0IHRoZSBsb25nZXN0IGV4dGVuc2lvbiB0aGF0IGZpdHMgdGhlIGZpbGVuYW1lICovXG5cdFx0XHRcdC8vIGUuZy4sIFwicG9pbnRzLmpzb25cIiBoYXMgcHJpb3JpdHkgb3ZlciBcImpzb25cIlxuXHRcdFx0XHR2YXIgZXh0ID0gJyc7XG5cdFx0XHRcdE9iamVjdC5rZXlzKCQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycykuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGV4dGVuc2lvbi5sZW5ndGggPiBleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kc1dpdGgoZmlsZSwgYC4ke2V4dGVuc2lvbn1gKSkge1xuXHRcdFx0XHRcdFx0XHRleHQgPSBleHRlbnNpb247XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiB3YXMgYW4gZXh0ZW5zaW9uIGZvdW5kPyAqL1xuXHRcdFx0XHRVLmFzc2VydChleHQubGVuZ3RoID4gMCwgYFRoZSBmaWxlICcke2ZpbGV9JyBpcyBub3QgcmVjb2duaXplZCBhcyBhIDNEIG1vZGVsLmApO1xuXG5cdFx0XHRcdC8qIGZldGNoIHRoZSBsb2FkZXIgZm9yIHRoYXQgZmlsZSBleHRlbnNpb24gKi9cblx0XHRcdFx0dmFyIExvYWRlciA9ICQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVyc1tleHRdO1xuXG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayAqL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChMb2FkZXIpLCBgU29tZXRoaW5nIHdlbnQgd3JvbmcgcmV0cmlldmluZyB0aGUgM0QgbW9kZWwgbG9hZGVyLmApO1xuXG5cdFx0XHRcdC8qIHJldHVybiBhIHByb21pc2UgdG8gdGhlIDNEIG9iamVjdCAqL1xuXHRcdFx0XHRyZXR1cm4gVS5wcm9taXNpZnkobmV3IExvYWRlcigpLCAnbG9hZCcpKGZpbGUpLnRoZW4oKG9iaikgPT4ge1xuXG5cdFx0XHRcdFx0LyogZm9yIG5vdywgd2Ugb25seSBhY2NlcHQgR2VvbWV0cnkncyBhbmQgT2JqZWN0M0QncyBmcm9tIGEgbG9hZGVyICovXG5cdFx0XHRcdFx0VS5hc3NlcnQoaXNHZW9tZXRyeShvYmopIHx8IGlzT2JqZWN0M0Qob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAzRCBtb2RlbCBsb2FkZXIgZm9yIHRoZSAnJHtleHR9JyBleHRlbnNpb24gcmV0dXJuZWQgYW4gdW5zdXBwb3J0ZWQgdmFsdWUuYCk7XG5cblx0XHRcdFx0XHQvKiBpZiBhIEdlb21ldHJ5IGlzIHJldHVybmVkLCBjcmVhdGUgYW4gT2JqZWN0M0QgYXJvdW5kIGl0ICovXG5cdFx0XHRcdFx0aWYgKGlzR2VvbWV0cnkob2JqKSkge1xuXHRcdFx0XHRcdFx0dmFyIGdlb21ldHJ5ID0gb2JqO1xuXHRcdFx0XHRcdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY29sb3IgfHwgJ3doaXRlJyB9KTtcblx0XHRcdFx0XHRcdG1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuXHRcdFx0XHRcdFx0aWYgKGFuaW1hdGlvbikge1xuXHRcdFx0XHRcdFx0XHRvYmogPSBuZXcgVEhSRUUuTW9ycGhBbmltTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuXHRcdFx0XHRcdFx0XHRvYmouZHVyYXRpb24gPSBhbmltYXRpb24uZHVyYXRpb247XG5cdFx0XHRcdFx0XHRcdG1hdGVyaWFsLm1vcnBoVGFyZ2V0cyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGdlb21ldHJ5LmNvbXB1dGVNb3JwaE5vcm1hbHMob2JqKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG9iaiA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogcmV0dXJuIHRoZSBvYmplY3QgKi9cblx0XHRcdFx0XHRyZXR1cm4gb2JqO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblx0XHRcdF9sb2FkUGFydHMoKSB7XG5cdFx0XHRcdHJldHVybiBQLmFsbCh0aGlzLmNoaWxkcmVuKS5tYXAoKGNoaWxkKSA9PiAoY2hpbGQuX29iamVjdDNEID0gY2hpbGQuX2xvYWQoKSkpXG5cdFx0XHRcdFx0XHQucmVkdWNlKChwYXJlbnQsIGNoaWxkKSA9PiB7IHBhcmVudC5hZGQoY2hpbGQpOyByZXR1cm4gcGFyZW50IH0sIG5ldyBUSFJFRS5PYmplY3QzRCgpKTtcblx0XHRcdH1cblxuXHRcdH0sIHtcblxuXHRcdFx0dmlzaWJsZTogdHJ1ZVxuXG5cdFx0fSk7XG5cblxuXHRcdC8qIHN0YXRpYyBsb2NhdGlvbiB0byBjb2xsZWN0IHRocmVlLmpzIGxvYWRlcnMgZm9yIGRpZmZlcmVudCBmaWxlIGZvcm1hdHMgKi9cblx0XHQvLyBUT0RPOiB0cmFuc2ZlciB0aGlzIHRhc2sgZnJvbSBDaXJjdWl0Ym9hcmQgdG8gaGVyZSwgZXZlcnl3aGVyZSBpbiB0aGUgY29kZVxuXHRcdHdpbmRvdy5fYW15X1RocmVlRE1vZGVsLmxvYWRlcnMgPSB7fTtcblxuXG5cdFx0cmV0dXJuIHdpbmRvdy5fYW15X1RocmVlRE1vZGVsO1xuXG5cblx0fSkudGFwKChjKSA9PiB7ICQuY2lyY3VpdGJvYXJkLlRocmVlRE1vZGVsID0gYyB9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RocmVlRE1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvYmFjb24tc2lnbmFsLWhhbmRsZXIuanMnLFxuXHQnLi91dGlsL3VuaXF1ZS1pZC5qcycsXG5cdCcuL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcycsXG5cdCcuL3V0aWwvcGx1Z2luLmpzJyxcblx0Jy4vdXRpbC9kZWZlci5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBVLCBCYWNvblNpZ25hbEhhbmRsZXIsIHVuaXF1ZUlELCBkbSwgcGx1Z2luLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gcGx1Z2luLnNlbGVjdGVkLnRoZW4oKCkgPT4ge1xuXG5cblx0XHQvKiBob3dldmVyIChvZnRlbikgdGhpcyBpcyBsb2FkZWQsIGNyZWF0ZSB0aGUgY2xhc3Mgb25seSBvbmNlICovXG5cdFx0aWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X0FydGVmYWN0KSkgeyByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3QgfVxuXG5cblx0XHQvKioge0BleHBvcnQgQGNsYXNzIEFydGVmYWN0IEBleHRlbmRzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0XHQgKiBVc2UgdGhpcyBhcyBhIHN1YmNsYXNzIChvciBqdXN0IG1peCBpdCBpbikgdG8gcHJvdmlkZSBzdXBwb3J0IGZvclxuXHRcdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggQmFjb24uanMuXG5cdFx0ICpcblx0XHQgKiBVc2VycyBjYW4gcGFzcyBhIHByb21pc2UgdGhyb3VnaCB0aGUgJ2JlZm9yZUNvbnN0cnVjdGlvbicgb3B0aW9uLiBJZiBkb25lLCB0aGVcblx0XHQgKiBhcnRlZmFjdCB3YWl0cyBvbiB0aGF0IHByb21pc2UgYmVmb3JlIGNhbGxpbmcgaXRzICdjb25zdHJ1Y3QnIG1ldGhvZC5cblx0XHQgKiBTaW1pbGFybHksIHVzZXJzIG9mIGluc3RhbmNlcyBvZiB0aGlzIGNsYXNzIHNob3VsZCB0ZXN0IHRoZSAnY29uc3RydWN0ZWQnIHByb3BlcnR5LlxuXHRcdCAqIElmIGl0IGlzIGRlZmluZWQsIGl0IGlzIGEgcHJvbWlzZSB0aGF0IGhhcyB0byBiZSB3YWl0ZWQgZm9yLlxuXHRcdCAqIElmIG5vdCwgdGhlIG9iamVjdCBpbnN0YW5jZSBjYW4gYmUgdXNlZCBzeW5jaHJvbm91c2x5IGFmdGVyIGNvbnN0cnVjdGlvbi5cblx0XHQgKi9cblx0XHR3aW5kb3cuX2FteV9BcnRlZmFjdCA9IGRtLnZwKCdBcnRlZmFjdCcsIFUubmV3U3ViY2xhc3MoQmFjb25TaWduYWxIYW5kbGVyLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXJ0ZWZhY3Qob3B0aW9ucykge1xuXHRcdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblx0XHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudCwgYmVmb3JlQ29uc3RydWN0aW9ufSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIHNldCBoaWVyYXJjaHkgc3R1ZmYgKi9cblx0XHRcdHRoaXMuX2lkID0gaWQgfHwgdW5pcXVlSUQodHlwZSk7XG5cdFx0XHR0aGlzLl90eXBlID0gdHlwZTtcblx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdFx0XHRpZiAocGFyZW50KSB7IFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBldmVudHMgKi9cblx0XHRcdHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcblxuXHRcdFx0LyogcG9zc2libHkgd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/ICovXG5cdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbihiZWZvcmVDb25zdHJ1Y3Rpb24pO1xuXG5cdFx0XHQvKiBnaXZlIHRoZSByb290IGFydGVmYWN0IGEgd2F5IHRvIHJlZ2lzdGVyIG90aGVyIGFydGVmYWN0cyBieSBJRCAqL1xuXHRcdFx0aWYgKHRoaXMucm9vdCA9PT0gdGhpcykge1xuXHRcdFx0XHR0aGlzLl9hcnRlZmFjdHNCeUlEID0ge307XG5cdFx0XHRcdHRoaXMuX3JlZ2lzdGVyQXJ0ZWZhY3QgPSBmdW5jdGlvbiAoYXJ0ZWZhY3QpIHtcblx0XHRcdFx0XHRVLmdldERlZih0aGlzLl9hcnRlZmFjdHNCeUlELCBhcnRlZmFjdC5pZCwgZGVmZXIpLnJlc29sdmUoYXJ0ZWZhY3QpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0fSwgLyoqIEBsZW5kcyBBcnRlZmFjdC5wcm90b3R5cGUgKi8ge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBBbGxvdyBhIHByb21pc2UgdG8gYmUgaW5zZXJ0ZWQgb24gd2hpY2ggdGhlIHJlc3Qgb2YgY29uc3RydWN0aW9uIHNob3VsZCB3YWl0LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBwb3NzaWJsZVByb21pc2Ugeyp9ICAtIGEgdmFsdWUgdGhhdCBtaWdodCBiZSBhIHByb21pc2Vcblx0XHRcdCAqL1xuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uKHBvc3NpYmxlUHJvbWlzZSkge1xuXG5cdFx0XHRcdC8qIGlmIG5vIHByb21pc2UgaXMgcGFzc2VkIGluLCBpZ25vcmUsIHRvIGtlZXAgY29uc3RydWN0aW9uIHN5bmNocm9ub3VzICovXG5cdFx0XHRcdGlmICghcG9zc2libGVQcm9taXNlIHx8ICEkLmlzRnVuY3Rpb24ocG9zc2libGVQcm9taXNlLnRoZW4pKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogaWYgdGhpcyBpcyB0aGUgZmlyc3QgcHJvbWlzZSBwYXNzZWQgaW4sIGluaXRpYWxpemUgJ3RoaXMuY29uc3RydWN0ZWQnICovXG5cdFx0XHRcdGlmICghdGhpcy5jb25zdHJ1Y3RlZCkgeyB0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKHRoaXMpIH1cblxuXHRcdFx0XHQvKiBpbnNlcnQgdGhlIG5ldyBwcm9taXNlIGludG8gdGhlIGNoYWluIGZvciAndGhpcy5jb25zdHJ1Y3RlZCcgcmVzb2x1dGlvbiAqL1xuXHRcdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50YXAoKCkgPT4gUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSkpO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgcHJvdmlkZWQgdGhyb3VnaCB0aGUgY29uc3RydWN0b3Jcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdW5pcXVlIGlkZW50aWZpZXIgYmVsb25naW5nIHRvIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB0eXBlIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgcGFyZW50IG9mIHRoaXMgYXJ0ZWZhY3QsIHVubGVzcyB0aGlzIGlzIHRoZSByb290XG5cdFx0XHQgKi9cblx0XHRcdGdldCBwYXJlbnQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2hpbGRyZW4gb2YgdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgY2hpbGRyZW4oKSB7IHJldHVybiB0aGlzLl9jaGlsZHJlbiB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnRlZmFjdH0gLSB0aGUgcm9vdCBvZiB0aGUgYXJ0ZWZhY3QgaGllcmFyY2h5XG5cdFx0XHQgKi9cblx0XHRcdGdldCByb290KCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX3Jvb3QpIHsgdGhpcy5fcm9vdCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQucm9vdCA6IHRoaXMgfVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBHZXQgYSBwcm9taXNlIHRvIGFuIGFydGVmYWN0IGdpdmVuIGl0cyBJRC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIGlkIHtTdHJpbmd9ICAgLSB0aGUgaWQgb2YgdGhlIHJlcXVpcmVkIGFydGVmYWN0XG5cdFx0XHQgKiBAcmV0dXJuIHtQPEFydGVmYWN0Pn0gLSB0aGUgcHJvbWlzZSB0byB0aGUgYXJ0ZWZhY3QgdGhhdCBoYXMgdGhlIGdpdmVuIGlkXG5cdFx0XHQgKi9cblx0XHRcdGFydGVmYWN0QnlJZChpZCkge1xuXHRcdFx0XHRyZXR1cm4gVS5nZXREZWYodGhpcy5yb290Ll9hcnRlZmFjdHNCeUlELCBpZCwgZGVmZXIpLnByb21pc2U7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogVHJhdmVyc2UgdGhlIEFydGVmYWN0IGhpZXJhcmNoeSB3aXRoIHRoaXMgYXMgcm9vdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gZm4geyhBcnRlZmFjdCkgPT4gQm9vbGVhbn0gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdHRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0dmFyIHtvcmRlcn0gPSBvcHRpb25zO1xuXHRcdFx0XHRpZiAoIW9yZGVyKSB7IG9yZGVyID0gJ3ByZWZpeCcgfVxuXG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3ByZWZpeCcpIHsgZm4odGhpcykgfVxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0Y2hpbGQudHJhdmVyc2VBcnRlZmFjdHMoZm4sIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKG9yZGVyID09PSAncG9zdGZpeCcpIHsgZm4odGhpcykgfVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFRyYXZlcnNlIHRoZSBBcnRlZmFjdCBoaWVyYXJjaHkgd2l0aCB0aGlzIGFzIHJvb3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIGZuIHsoQXJ0ZWZhY3QpID0+IEJvb2xlYW59IC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHR0cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSh0eXBlLCBmbiwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciB7b3JkZXJ9ID0gb3B0aW9ucztcblx0XHRcdFx0aWYgKCFvcmRlcikgeyBvcmRlciA9ICdwcmVmaXgnIH1cblxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwcmVmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkgeyBmbih0aGlzKSB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmJlZm9yZUdvaW5nSW4pIHsgb3B0aW9ucy5iZWZvcmVHb2luZ0luKHRoaXMpIH1cblx0XHRcdFx0dGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkuZm9yRWFjaCgoZGVzY2VuZGVudCkgPT4ge1xuXHRcdFx0XHRcdGRlc2NlbmRlbnQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKG9wdGlvbnMuYmVmb3JlR29pbmdPdXQpIHsgb3B0aW9ucy5iZWZvcmVHb2luZ091dCh0aGlzKSB9XG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3Bvc3RmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkgeyBmbih0aGlzKSB9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgKHBhcmVudCwgcGFyZW50J3MgcGFyZW50LCAuLi4pXG5cdFx0XHQgKiBvZiB0aGlzIGFydGVmYWN0IHdpdGggdGhlIGdpdmVuIHR5cGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIHRoZSBnaXZlbiB0eXBlLCB1bmxlc3MgdGhlcmUgaXMgbm9uZVxuXHRcdFx0ICovXG5cdFx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcztcblx0XHRcdFx0ZG8geyByZXN1bHQgPSByZXN1bHQucGFyZW50IH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgZGVzY2VuZGFudCAoY2hpbGRyZW4sIGNoaWxkcmVuJ3MgY2hpbGRyZW4sIC4uLilcblx0XHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnRzIG9mIHRoZSBnaXZlbiB0eXBlOyBub25lIG9mIHRoZW1cblx0XHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRlc2NlbmRhbnQgZnJvbSBhbnkgb3RoZXJcblx0XHRcdCAqL1xuXHRcdFx0Y2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogSW5kaWNhdGUgdGhhdCB0aGlzIGFydGVmYWN0IHdpbGwgbmV2ZXIgYmUgdXNlZCBhZ2FpbiwgYWxsb3dpbmcgaXRcblx0XHRcdCAqIHRvIGRvIGFueSBuZWNlc3NhcnkgY2xlYW51cC5cblx0XHRcdCAqL1xuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHsgY2hpbGQuZGVzdHJveSgpIH0pO1xuXHRcdFx0fVxuXG5cdFx0fSkpO1xuXG5cblx0XHQvKioge0BmdW5jdGlvbiBBcnRlZmFjdC5uZXdTdWJjbGFzc31cblx0XHQgKiBBIHN0YXRpYyBjb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzdWJjbGFzcyBvZiB7QGxpbmsgQXJ0ZWZhY3R9LlxuXHRcdCAqL1xuXHRcdHdpbmRvdy5fYW15X0FydGVmYWN0Lm5ld1N1YmNsYXNzID0gZnVuY3Rpb24gbmV3U3ViQ2xhc3MobmFtZSwgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9LCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cdFx0XHRyZXR1cm4gZG0udnAobmFtZSwgVS5uZXdTdWJjbGFzcyh3aW5kb3cuX2FteV9BcnRlZmFjdCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBwcm9jZXNzIG9wdGlvbnMgKi9cblx0XHRcdFx0dmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQocHJvY2Vzc2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zLnR5cGUgPSBuYW1lO1xuXG5cdFx0XHRcdC8qIGNhbGwgc3VwZXItY29uc3RydWN0b3IgKi9cblx0XHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0XHQvKiBjYWxsIHRoaXMgY29uc3RydWN0b3IgKi9cblx0XHRcdFx0Y29uc3RydWN0b3IuY2FsbCh0aGlzLCBwcm9jZXNzZWRPcHRpb25zKTtcblxuXHRcdFx0XHQvKiB0aGVuIHJ1biB0aGUgJ2NvbnN0cnVjdCcgbWV0aG9kICovXG5cdFx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdGVkKSB7IC8vIGNvbnN0cnVjdCBhc3luY2hyb25vdXNseVxuXHRcdFx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZSh0aGlzLmNvbnN0cnVjdChvcHRpb25zKSkucmV0dXJuKHRoaXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMuY29uc3RydWN0KG9wdGlvbnMpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHJlZ2lzdGVyIHRoaXMgYXJ0ZWZhY3QgdG8gdGhlIGNpcmN1aXRib2FyZCAqL1xuXHRcdFx0XHQodGhpcy5jb25zdHJ1Y3RlZCB8fCBQLnJlc29sdmUoKSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yb290Ll9yZWdpc3RlckFydGVmYWN0KHRoaXMpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0XHRnZXQgY2lyY3VpdGJvYXJkKCkge1xuXHRcdFx0XHRcdGlmICghdGhpcy5fY2lyY3VpdGJvYXJkKSB7IHRoaXMuX2NpcmN1aXRib2FyZCA9IHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKSB9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcblx0XHRcdFx0fVxuXHRcdFx0fSkpKTtcblx0XHR9O1xuXG5cblx0XHRyZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3Q7XG5cblxuXHR9KS50YXAoKGMpID0+IHsgJC5jaXJjdWl0Ym9hcmQuQXJ0ZWZhY3QgPSBjIH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQXJ0ZWZhY3QuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGl0cyBmaXJzdCBhcmd1bWVudFxuXHRcdGlkKHYpIHsgcmV0dXJuIHYgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBkZWZpbmVkLCBnaXZlIGl0IGEgZGVmYXVsdCB2YWx1ZSBmaXJzdDsgaWYgdGhlIGdpdmVuIHZhbHVlXG5cdFx0Ly8gaXMgYSBmdW5jdGlvbiwgaXQgaXMgY2FsbGVkLCBhbmQgaXRzIHJlc3VsdCBpcyB1c2VkXG5cdFx0Z2V0RGVmKG9iaiwgbmFtZSwgdmFsdWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlKCkgfVxuXHRcdFx0XHRvYmpbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pIH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSkgfSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRmaW5kSW5kZXgoYXJyYXksIHByZWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkgeyByZXR1cm4gaSB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblxuXHRcdC8vIHRoaXMgYG1lbW9pemVgIGZ1bmN0aW9uIGlzIFNMT1csIGFzIGl0IHVzZXMgbGluZWFyIHNlYXJjaFxuXHRcdG1lbW9pemUoZm4pIHtcblx0XHRcdHZhciBrZXlzID0gW107XG5cdFx0XHR2YXIgY2FjaGUgPSBbXTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBjaGVjayB0aGUgY2FjaGUgKi9cblx0XHRcdFx0dmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGtleSkgPT4ga2V5LmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcmdzW2ldKSk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7IHJldHVybiBjYWNoZVtpbmRleF0gfVxuXG5cdFx0XHRcdC8qIG5vIGNhY2hlIGhpdDsgY29tcHV0ZSB2YWx1ZSwgc3RvcmUgYW5kIHJldHVybiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGtleXMucHVzaChhcmdzKTtcblx0XHRcdFx0Y2FjaGUucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIHNvcnRPZkVxdWFsID0gKGEsIGIpID0+IChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnYmFjb25qcycsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbiwgVFdFRU4pIHtcblxuXHRyZXF1aXJlKCdiYWNvbi5tb2RlbCcpO1xuXHRyZXF1aXJlKCdiYWNvbi5qcXVlcnknKTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIG1ldGhvZCB3b3JrcyB3aXRoIGV2ZW50cyB0aGF0IGNhbiBoYXZlIG9ubHkgb25lIHN1YnNjcmliZXIsXG5cdC8vIHRoYXQgY2FuIGJlIHVuLXN1YnNjcmliZWQgYnkgc2V0dGluZyB0aGUgc3Vic2NyaWJlciB0byBgbnVsbGAuXG5cdC8vIFRoaXMgZnVuY3Rpb24gaXMgbWVtb2l6ZWQsIHNvIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBpcyB0YWtlbixcblx0Ly8gYW5kIHRoZSBzYW1lIHN0cmVhbSBmb3IgaXQgcmV0dXJuZWQgZm9yIGVhY2ggcmVxdWVzdC5cblx0QmFjb24uZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdG9iai5vbihldmVudE5hbWUsICh2KSA9PiB7IHNpbmsobmV3IEJhY29uLk5leHQodikpIH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuXHRcdFx0KChmKSA9PiB7IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfSk7XG5cdEJhY29uLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChzaW5rKCkgPT09IEJhY29uLm5vTW9yZSkgeyBzdWJzY3JpYmVkID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmIChzdWJzY3JpYmVkKSB7IGl0ZXJhdGlvbkZuKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4geyBzdWJzY3JpYmVkID0gZmFsc2UgfTtcblxuXHRcdH0pO1xuXHR9O1xuXG5cblx0QmFjb24udHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBzaW5rKG5ldyBCYWNvbi5OZXh0KCgpID0+IHRoaXMpKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoKCkgPT4geyBzaW5rKG5ldyBCYWNvbi5FbmQoKSkgfSk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRCYWNvbi5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleWNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzRXZlbnRTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleWNvZGUpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRCYWNvbi5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBvcGVuID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBjbG9zZSA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXIod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKGhhbmRsZXIsICgpID0+IHtcblx0XHRcdG9wZW4ucHVzaCgpO1xuXHRcdFx0d2FudGVkQnVzLnB1c2goZmFsc2UpO1xuXHRcdFx0Y2xvc2UucHVzaCgpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXAodHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIGNsb3NlLnN0YXJ0V2l0aCh0cnVlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsKG9wZW4pLnJlZHVjZShbXSwgYWNjdW11bGF0b3IpLmZsYXRNYXAoQmFjb24uZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaChuZXcgQmFjb24uTmV4dCgoKSA9PiB2YWx1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRzaW5rKG9sZEJ1ZmZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3Vic2NyaWJlKCgpPT57fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGxhYmVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChldmVudCkgPT4ge1xuXHRcdFx0cmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG5cdFx0fSkubWFwKChldmVudCkgPT4ge1xuXHRcdFx0VS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBGaWx0ZXIgZXZlbnRzIHRvIG9ubHkgY2VydGFpbiBrZXlzIC8gYnV0dG9ucy4gQ2FuIGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uIG9yIHNpbmdsZSBudW1iZXIuXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS53aGljaCA9IGZ1bmN0aW9uIChidXR0b25JZCkge1xuXHRcdHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKGIgPT4gYiA9PT0gYnV0dG9uSWQpO1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcihlID0+IHByZWQoZS53aGljaCkpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbVxuXHRcdFx0XHRcdC50YWtlVW50aWwoJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbCh1bnRpbFN0cmVhbSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBCYWNvbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvYmFjb24tYW5kLWVnZ3MuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24ubW9kZWxcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWNvbi5qcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnLi9iYWNvbi1hbmQtZWdncy5qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24pIHtcblxuXG5cdC8qKiB7QGV4cG9ydH17QGNsYXNzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBCYWNvbi5qcy5cblx0ICovXG5cdHZhciBCYWNvblNpZ25hbEhhbmRsZXIgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEJhY29uU2lnbmFsSGFuZGxlcigpIHtcblxuXHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuXG5cdH0sIC8qKiBAbGVuZHMgQmFjb25TaWduYWxIYW5kbGVyLnByb3RvdHlwZSAqLyB7XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEZWNsYXJlcyBhIG5ldyBldmVudCBzdHJlYW0gZm9yIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICBuYW1lICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50LCB1c2VkIHRvIHRyaWdnZXIgb3Igc3Vic2NyaWJlIHRvIGl0XG5cdFx0ICogQHBhcmFtICB7QmFjb24uRXZlbnRTdHJlYW19IFtzb3VyY2VdIC0gYW5vdGhlciBldmVudCBzdHJlYW0gdG8gYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoaXMgZXZlbnRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLkJ1c30gLSB0aGUgY3JlYXRlZCBldmVudCBzdHJlYW1cblx0XHQgKi9cblx0XHRuZXdFdmVudChuYW1lLCB7c291cmNlfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBldmVudCBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGV2ZW50IHN0cmVhbSAqL1xuXHRcdFx0dmFyIGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblx0XHRcdGlmIChzb3VyY2UpIHsgYnVzLnBsdWcoc291cmNlKSB9XG5cdFx0XHRyZXR1cm4gdGhpcy5fZXZlbnRzW25hbWVdID0gYnVzLm5hbWUobmFtZSk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0cmlldmUgYW4gZXZlbnQgc3RyZWFtIGJ5IG5hbWUuIElmIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgaXMgZ2l2ZW4sIGEgc3RyZWFtXG5cdFx0ICogYmFzZWQgb24gY2hhbmdlcyB0byB0aGF0IHByb3BlcnR5IGlzIHJldHVybmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEByZXR1cm4ge0JhY29uLkV2ZW50U3RyZWFtfSAtIHRoZSBldmVudCBzdHJlYW0gYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0ZXZlbnQobmFtZSkge1xuXG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiByZXR1cm4gaXQgKi9cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0cmlldmUgYSBwcm9wZXJ0eSBieSBuYW1lLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7QmFjb24uTW9kZWx9IC0gdGhlIHByb3BlcnR5IGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuXHRcdCAqL1xuXHRcdHByb3BlcnR5KG5hbWUpIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gfSxcblxuXHRcdC8qKiBAYWxpYXMgcHJvcGVydHkgKi9cblx0XHRwKG5hbWUpIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gfSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRlZmluZXMgYSBuZXcgcHJvcGVydHkgb24gdGhpcyBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgICAgICAgICAgICBbc2V0dGFibGU9dHJ1ZV0gLSB3aGV0aGVyIHRoZSB2YWx1ZSBjYW4gYmUgbWFudWFsbHkgc2V0XG5cdFx0ICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgICAgICAgICAgIFtpbml0aWFsXSAgICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgcHJvcGVydHlcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbigqLCopOkJvb2xlYW59ICAgW2lzRXF1YWxdICAgICAgIC0gYSBwcmVkaWNhdGUgZnVuY3Rpb24gYnkgd2hpY2ggdG8gdGVzdCBmb3IgZHVwbGljYXRlIHZhbHVlc1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uTW9kZWx9IC0gdGhlIHByb3BlcnR5IGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuXHRcdCAqL1xuXHRcdG5ld1Byb3BlcnR5KG5hbWUsIHtzZXR0YWJsZSwgaW5pdGlhbCwgaXNFcXVhbH0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgcHJvcGVydHkgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmYXVsdCB2YWx1ZSBmb3IgJ3NldHRhYmxlJyAqL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoc2V0dGFibGUpKSB7IHNldHRhYmxlID0gdHJ1ZSB9XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgQmFjb24uTW9kZWwgd2hpY2ggc3RvcmVzIHRoZSBwcm9wZXJ0eSAqL1xuXHRcdFx0dmFyIHByb3BlcnR5ID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXSA9IG5ldyBCYWNvbi5Nb2RlbChpbml0aWFsLCB7IGlzRXF1YWwgfSk7XG5cblx0XHRcdC8qIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIG9iamVjdCBpbnRlcmZhY2UgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdGdldDogcHJvcGVydHkuZ2V0LFxuXHRcdFx0XHRzZXQ6IHNldHRhYmxlID8gcHJvcGVydHkuc2V0IDogdW5kZWZpbmVkXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBwcm9wZXJ0eSAqL1xuXHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFsbCBzdWJzY3JpYmVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gdHJpZ2dlclxuXHRcdCAqIEB2YWx1ZSB7Kn0gICAgICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBhdHRhY2ggdG8gdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlcihuYW1lLCB2YWx1ZSkge1xuXG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBzdHJlYW0gZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcHVzaCB0aGUgdmFsdWUgdG8gdGhlIHN0cmVhbSAqL1xuXHRcdFx0dGhpcy5fZXZlbnRzW25hbWVdLnB1c2godmFsdWUpO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNlbGVjdHMgYW4gZXhpc3Rpbmcgc3RyZWFtIG9yIHByb3BlcnR5LCBhbmQgdGhlblxuXHRcdCAqIGVpdGhlciByZXR1cm5zIGl0LCBvciBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHRvIGl0LCBkZXBlbmRpbmdcblx0XHQgKiBvbiB3aGV0aGVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQuXG5cdFx0ICpcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IG9yIHByb3BlcnR5IHRvIHN1YnNjcmliZSB0b1xuXHRcdCAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgW2V4cGVjdGVkVmFsdWVdICAgICAgIC0gaWYgcHJvdmlkZWQsIGZpbHRlcnMgdGhlIHN0cmVhbSBieSA9PT0gZXF1YWxpdHkgd2l0aCB0aGlzIHZhbHVlO1xuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAgLSBhIHBsYWluIG9iamVjdCBmb3IgcHJvdmlkaW5nIGFkZGl0aW9uYWwgb3B0aW9uc1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgW29wdGlvbnMub25jZT1mYWxzZV0gIC0gd2hldGhlciB0aGUgc3RyZWFtIGVuZHMgYWZ0ZXIgb25lIGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbigqKTp2b2lkfSBbY2FsbGJhY2tdICAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dW5kZWZpbmVkfSAtIGlmIG5vIGBjYWxsYmFja2AgaXMgcHJvdmlkZWQsIHRoZSBzcGVjaWZpZWQgZXZlbnQgc3RyZWFtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBwcm9wZXJ0eTsgb3RoZXJ3aXNlLCBhIGZ1bmN0aW9uIHRvIHVuc3Vic2NyaWJlIHRvIHNhaWRcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaXMgYSBzaG9ydGhhbmQgZm9yIHRoZSB7QGxpbmsgb259IG1ldGhvZCB3aXRoIHRoZSBgb25jZWAgb3B0aW9uIGVuYWJsZWQuXG5cdFx0ICogSW4gb3RoZXIgd29yZHMsIGFueSBzdHJlYW0gcmV0dXJuZWQgd2lsbCBzZW5kIG9ubHkgb25lIGV2ZW50LCBhbmQgYW55IGNhbGxiYWNrXG5cdFx0ICogcHJvdmlkZWQgd2lsbCBvbmx5IGZpcmUgb25jZS5cblx0XHQgKi9cblx0XHRvbmUobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhcmdzT2JqID0gdGhpcy5fZ2F0aGVyT25Bcmd1bWVudHMobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXHRcdFx0VS5vYmplY3QoYXJnc09iaiwgJ29wdGlvbnMnKS5vbmNlID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSBvciB7QGxpbmsgb25lfSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucy5vbmNlICovXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uY2UpIHsgcmVzdWx0ID0gcmVzdWx0LnRha2UoMSkgfVxuXG5cdFx0XHQvKiBwcm9jZXNzIGNhbGxiYWNrICovXG5cdFx0XHRpZiAoY2FsbGJhY2spIHsgcmVzdWx0ID0gcmVzdWx0Lm9uVmFsdWUoY2FsbGJhY2spIH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFByb2Nlc3MgdGhlIGFyZ3VtZW50cyBhY2NlcHRlZCBieSB7QGxpbmsgb259IGFuZCB7QGxpbmsgb25lfS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfZ2F0aGVyT25Bcmd1bWVudHMoLi4uYXJncykge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHsgbmFtZTogYXJncy5zaGlmdCgpIH07XG5cblx0XHRcdC8qIHRlc3QgZm9yIGV4cGVjdGVkIHZhbHVlIGFyZ3VtZW50ICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgIVUuaXNGdW5jdGlvbihhcmdzWzBdKSAmJiAhVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5leHBlY3RlZFZhbHVlID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBvcHRpb25zICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5vcHRpb25zID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBjYWxsYmFjayBmdW5jdGlvbiAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmIFUuaXNGdW5jdGlvbihhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gQmFjb25TaWduYWxIYW5kbGVyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9iYWNvbi1zaWduYWwtaGFuZGxlci5qc1xuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2RlbHRhLWpzJyBdLCBmdW5jdGlvbiAoUCwgRE0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogYWxyZWFkeSBjYWNoZWQ/ICovXG5cdGlmICh3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCkgeyByZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgfVxuXG5cblx0LyogdGVsbCBkZWx0YS5qcyBhYm91dCBibHVlYmlyZCAqL1xuXHRETS5yZWdpc3RlclByb21pc2VSZXNvbHZlcihQLnJlc29sdmUpO1xuXG5cblx0Lyogc2V0IHRoZSBjYWNoZSAqL1xuXHR3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCA9IG5ldyBETSgpO1xuXG5cblx0LyogcmV0dXJuIHRoZSBkZWx0YSBtb2RlbCB0aGF0IG1hbmFnZXMgYWxsIHBsdWdpbnMgKD0gZGVsdGFzKSAqL1xuXHRyZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWw7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL21haW4tZGVsdGEtbW9kZWwuanNcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vbmV3V2lkZ2V0VHlwZS5qcycsXG5cdCcuL21pc2MuanMnLFxuXHQnLi9iYWNvbi1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL2RlZmVyLmpzJyxcblx0Jy4vbWFpbi1kZWx0YS1tb2RlbC5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBuZXdXaWRnZXRUeXBlLCBVLCBTaWduYWxIYW5kbGVyLCBkZWZlciwgZG0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0aWYgKCF3aW5kb3cuX2FteVBsdWdpbikge1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luID0gZnVuY3Rpb24gKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG5cdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuXG5cdFx0XHRcdC8qIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlZ2lzdGVyIGEgbmV3IHBsdWdpbiAqL1xuXHRcdFx0XHRyZXR1cm4gbmV3IGRtLkRlbHRhKHBsdWdpbk9yU2VsZWN0aW9uLm5hbWUsIHBsdWdpbk9yU2VsZWN0aW9uKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRVLmFzc2VydCghX3NlbGVjdGVkRGVmZXJyZWQuZG9uZSxcblx0XHRcdFx0XHRcdGBBcGlOQVRPTVkgcGx1Z2lucyBjYW4gb25seSBiZSBzZWxlY3RlZCBvbmNlLCBhZnRlciB3aGljaCB0aGV5IGFyZSBmaXhlZC5gKTtcblx0XHRcdFx0X3NlbGVjdGVkRGVmZXJyZWQuZG9uZSA9IHRydWU7XG5cblx0XHRcdFx0LyogdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2VsZWN0IHBsdWdpbnMgdG8gYmUgYXBwbGllZCAqL1xuXHRcdFx0XHRkbS5zZWxlY3QuYXBwbHkoZG0sIHBsdWdpbk9yU2VsZWN0aW9uKTtcblx0XHRcdFx0X3NlbGVjdGVkRGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcblxuXHRcdFx0XHRyZXR1cm4gd2luZG93Ll9hbXlQbHVnaW4uc2VsZWN0ZWQ7XG5cblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciBfc2VsZWN0ZWREZWZlcnJlZCA9IGRlZmVyKCk7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uc2VsZWN0ZWQgPSBfc2VsZWN0ZWREZWZlcnJlZC5wcm9taXNlO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLmdyYXBoID0gKCkgPT4gZG0uZ3JhcGgoKTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5kbSA9IGRtO1xuXHR9XG5cblxuXHRyZXR1cm4gd2luZG93Ll9hbXlQbHVnaW47XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3BsdWdpbi5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9kZWZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL21pc2MuanMnLCAnLi4vQXJ0ZWZhY3QuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUsIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiAgYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KSAgICAgICAgICAqL1xuXHQvKiAgYXMgYSBqUXVlcnkgZWxlbWVudCBwbHVnaW47IHRoaXMgaXMgcmV0dXJuZWQgZnJvbSB0aGUgbW9kdWxlICAqL1xuXHRmdW5jdGlvbiBuZXdXaWRnZXRUeXBlKHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cblx0XHQvKiB0aGUgc3BlY2lmaWMgd2lkZ2V0IGNsYXNzICovXG5cdFx0dmFyIFdpZGdldFAgPSBBcnRlZmFjdFAudGhlbigoQXJ0ZWZhY3QpID0+IEFydGVmYWN0Lm5ld1N1YmNsYXNzKHR5cGVOYW1lLCBmdW5jdGlvbiAoe2Nzc0NsYXNzfSkge1xuXG5cdFx0XHQvKiBzZXQgdGhlIGVsZW1lbnQgQ1NTIGNsYXNzICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoY3NzQ2xhc3MpKSB7IHRoaXMuZWxlbWVudC5hZGRDbGFzcyhjc3NDbGFzcykgfVxuXG5cdFx0XHQvKiBpZiB0aGUganF1ZXJ5IGVsZW1lbnQgaXMgcmVtb3ZlZCwgZGVzdHJveSB0aGUgYXJ0ZWZhY3QgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5hc0V2ZW50U3RyZWFtKCdyZW1vdmUnKS5vblZhbHVlKCgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSk7XG5cblx0XHR9LCB7XG5cblx0XHRcdGdldCBtb2RlbCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tb2RlbCB9LFxuXG5cdFx0XHRnZXQgZWxlbWVudCgpIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5lbGVtZW50IH1cblxuXHRcdH0sIFUuZXh0ZW5kKHtcblxuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uOiBQLnJlc29sdmUoKSAvLyBndWFyYW50ZWUgYWxsIHdpZGdldCBjb25zdHJ1Y3Rpb24gdG8gYmUgYXN5bmNocm9ub3VzXG5cblx0XHR9LCBvcHRpb25EZWZhdWx0cykpKTtcblxuXHRcdC8qIGNyZWF0ZSBhIGxvd2VyY2FzZSBuYW1lIGZvciB0aGlzIHdpZGdldCB0eXBlICovXG5cdFx0dmFyIGxvd2VyY2FzZU5hbWUgPSB0eXBlTmFtZVswXS50b0xvd2VyQ2FzZSgpICsgdHlwZU5hbWUuc2xpY2UoMSk7XG5cblx0XHQvKiBqUXVlcnkgcGx1Z2luOiB0aGUgd2lkZ2V0IGNyZWF0aW9uICYgcmV0cmlldmFsIGZ1bmN0aW9uICAqL1xuXHRcdCQuZm5bbG93ZXJjYXNlTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG5cdFx0XHQvKiBpZiB0aGUgd29yZCAnaW5zdGFuY2UnIGlzIHBhc3NlZCwgcmV0dXJuIHRoZSAoYWxyZWFkeSBjcmVhdGVkKSB3aWRnZXQgcHJvbWlzZSAqL1xuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdpbnN0YW5jZScpIHsgcmV0dXJuIHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCkgfVxuXG5cdFx0XHQvKiBlbHNlLCBjcmVhdGUgYSBuZXcgd2lkZ2V0IGFuZCBzZXQgYSBwcm9taXNlIHRvIGl0ICovXG5cdFx0XHR0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWAsIFdpZGdldFBcblx0XHRcdFx0XHQudGhlbigoV2lkZ2V0KSA9PiBuZXcgV2lkZ2V0KFUuZXh0ZW5kKG9wdGlvbnMsIHsgZWxlbWVudDogdGhpcyB9KSkuY29uc3RydWN0ZWQpKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBqUXVlcnkgZWxlbWVudCBpbnN0YW5jZSwgYnkgalF1ZXJ5IGNvbnZlbnRpb24gKi9cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHRcdC8qIHJldHVybiBhIHByb21pc2UgdG8gdGhlIHdpZGdldCBhcnRlZmFjdCBjbGFzcyAqL1xuXHRcdHJldHVybiBXaWRnZXRQO1xuXG5cdH1cblxuXG5cdC8qIGV4cG9zZSB0aGUgd2lkZ2V0IGNsYXNzIGNyZWF0b3IgZnVuY3Rpb24gKi9cblx0cmV0dXJuIG5ld1dpZGdldFR5cGU7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL25ld1dpZGdldFR5cGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJUaHJlZURNb2RlbC5qcyJ9