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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(3), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Bacon, ArtefactP) {
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
	      this._isPart = this.parent.type === 'ThreeDModel';
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm, plugin, defer) {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(17), __webpack_require__(4), __webpack_require__(11), __webpack_require__(15), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYzc5ZTU4NzRmNDg1MmY1YThhYiIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy91dGlsL2JhY29uLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNvbi5tb2RlbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLmpxdWVyeVwiIiwid2VicGFjazovLy8uL3NyYy91dGlsL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3BsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9kZWZlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL25ld1dpZGdldFR5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHLEdBQUcsR0FBRyxNQUFJLENBQUcsVUFBUTtBQUMzQyxjQUFXLENBQUM7QUFJWixVQUFTLFdBQVMsQ0FBRSxFQUFHO0FBQUUsVUFBTyxhQUFhLE1BQUksU0FBUyxHQUFLLGFBQWEsTUFBSSxl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TSxDQUFFLENBQUMsQ0FBQyxZQUFZO09BQUEsRUFBQyxDQUFDLENBQUM7QUFHbEYsWUFBTyxLQUFHLENBQUM7S0FFWixDQUFDO0FBR0QsVUFBTyxRQUFNLENBQUM7R0FFZjtBQUlBLFFBQU8sY0FBWSxDQUFDO0FBR3JCLEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIiwgXCJibHVlYmlyZFwiLCBcImJhY29uanNcIiwgXCJ0d2VlbmpzXCIsIFwiYmFjb24ubW9kZWxcIiwgXCJiYWNvbi5qcXVlcnlcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJUaHJlZURNb2RlbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlRocmVlRE1vZGVsXCJdID0gZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImJhY29uLm1vZGVsXCJdLCByb290W1wiYmFjb24uanF1ZXJ5XCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDFjNzllNTg3NGY0ODUyZjVhOGFiXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMnLFxuXHQnLi9BcnRlZmFjdC5qcydcbl0sIGZ1bmN0aW9uICgkLCBUSFJFRSwgVSwgUCwgQmFjb24sIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBjb252ZW5pZW5jZSBwcmVkaWNhdGUgZnVuY3Rpb25zICovXG5cdGZ1bmN0aW9uIGlzR2VvbWV0cnkodikgeyByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLkdlb21ldHJ5IHx8IHYgaW5zdGFuY2VvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeSB9XG5cdGZ1bmN0aW9uIGlzT2JqZWN0M0QodikgeyByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLk9iamVjdDNEIH1cblx0ZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHsgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMSB9XG5cblx0LyogY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gdmlzaXQgYWxsIGdlb21ldHJpZXMgaW4gYW4gT2JqZWN0M0QgKi9cblx0ZnVuY3Rpb24gdHJhdmVyc2VHZW9tZXRyaWVzKG9iaiwgZm4pIHtcblx0XHRvYmoudHJhdmVyc2UoKHN1Yk9iaikgPT4ge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoc3ViT2JqLmdlb21ldHJ5KSkgeyByZXR1cm4gfVxuXHRcdFx0Zm4oc3ViT2JqLmdlb21ldHJ5KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBvdmVyYWxsIGJvdW5kaW5nIGJveCBvZiBhbiBvYmplY3QzRCAqL1xuXHRmdW5jdGlvbiBjYWxjdWxhdGVCb3VuZGluZ0JveChvYmopIHtcblx0XHRvYmoudXNlckRhdGEuYm91bmRpbmdCb3ggPSBuZXcgVEhSRUUuQm94MygpO1xuXHRcdHRyYXZlcnNlR2VvbWV0cmllcyhvYmosIChnZW9tZXRyeSkgPT4ge1xuXHRcdFx0aWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgVEhSRUUuQnVmZmVyR2VvbWV0cnkpIHtcblx0XHRcdFx0Z2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cdFx0XHRcdG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5leHBhbmRCeVBvaW50KGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1pbik7XG5cdFx0XHRcdG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5leHBhbmRCeVBvaW50KGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heCk7XG5cdFx0XHR9XG5cdFx0XHQoZ2VvbWV0cnkubW9ycGhUYXJnZXRzIHx8IFtdKS5jb25jYXQoW2dlb21ldHJ5XSkuZm9yRWFjaCgoe3ZlcnRpY2VzfSkgPT4ge1xuXHRcdFx0XHQodmVydGljZXMgfHwgW10pLmZvckVhY2goKHBvaW50KSA9PiB7XG5cdFx0XHRcdFx0b2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LmV4cGFuZEJ5UG9pbnQocG9pbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyogY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gY2VudGVyIGFsbCB0aGUgZ2VvbWV0cnkgb2YgYW4gb2JqZWN0IG9uIGl0cyAoMCwgMCwgMCkgcG9pbnQgKi9cblx0ZnVuY3Rpb24gc3RhcnRUaHJlZURBbmltYXRpb24ob2JqKSB7XG5cdFx0dmFyIGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cdFx0dmFyIG1vcnBoT2JqcyA9IFtdO1xuXHRcdG9iai50cmF2ZXJzZSgoc3ViT2JqKSA9PiB7XG5cdFx0XHRpZiAoc3ViT2JqIGluc3RhbmNlb2YgVEhSRUUuTW9ycGhBbmltTWVzaCkge1xuXHRcdFx0XHRtb3JwaE9ianMucHVzaChzdWJPYmopO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdEJhY29uLmFuaW1hdGlvbkZyYW1lcygpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0dmFyIGRUaW1lID0gY2xvY2suZ2V0RGVsdGEoKTtcblx0XHRcdG1vcnBoT2Jqcy5mb3JFYWNoKChtb3JwaE9iaikgPT4ge1xuXHRcdFx0XHRtb3JwaE9iai51cGRhdGVBbmltYXRpb24oMTAwMCAqIGRUaW1lKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBhIHByb21pc2UgdG8gdGhlIG5ldyBUaHJlZURNb2RlbCBjbGFzcyAqL1xuXHRyZXR1cm4gQXJ0ZWZhY3RQLnRoZW4oKEFydGVmYWN0KSA9PiB7XG5cblxuXHRcdC8qIGhvd2V2ZXIgKG9mdGVuKSB0aGlzIGlzIGxvYWRlZCwgY3JlYXRlIHRoZSBjbGFzcyBvbmx5IG9uY2UgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfVGhyZWVETW9kZWwpKSB7IHJldHVybiB3aW5kb3cuX2FteV9UaHJlZURNb2RlbCB9XG5cblxuXHRcdHZhciBUaHJlZURNb2RlbCA9IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ1RocmVlRE1vZGVsJywgZnVuY3Rpb24gVGhyZWVETW9kZWwoe3Zpc2libGV9KSB7XG5cblx0XHRcdC8qIGNoZWNrIGlmIHRoaXMgaXMgYSBtb2RlbCBwYXJ0IG9yIHRoZSByb290ICovXG5cdFx0XHR0aGlzLl9pc1BhcnQgPSB0aGlzLnBhcmVudC50eXBlID09PSAnVGhyZWVETW9kZWwnO1xuXG5cdFx0XHQvKiB0aGUgJ3Zpc2libGUnIGFuZCAnaGlkZGVuJyBwcm9wZXJ0aWVzICovXG5cdFx0XHR0aGlzLm5ld1Byb3BlcnR5KCd2aXNpYmxlJywgeyBpbml0aWFsOiB2aXNpYmxlIH0pO1xuXHRcdFx0dGhpcy5uZXdQcm9wZXJ0eSgnaGlkZGVuJyk7XG5cdFx0XHR0aGlzLnAoJ3Zpc2libGUnKS5hZGRTb3VyY2UodGhpcy5wcm9wZXJ0eSgnaGlkZGVuJykubm90KCkpO1xuXHRcdFx0dGhpcy5wKCdoaWRkZW4nKS5hZGRTb3VyY2UodGhpcy5wcm9wZXJ0eSgndmlzaWJsZScpLm5vdCgpKTtcblxuXHRcdFx0LyogbWFuaWZlc3QgdGhpcyB2aXNpYmlsaXR5IG9uIHRoZSBjYW52YXMgKi9cblx0XHRcdHRoaXMucCgndmlzaWJsZScpLnZhbHVlKHRydWUpLmZsYXRNYXAodGhpcy5wKCd2aXNpYmxlJykpLm9uVmFsdWUoKHZpc2libGUpID0+IHtcblx0XHRcdFx0dGhpcy5vYmplY3QzRC50aGVuKChvYmopID0+IHsgb2JqLnZpc2libGUgPSB2aXNpYmxlIH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIHdoZW4gdGhlIDNEIG1vZGVsIGlzIGRlc3Ryb3llZCwgaXQgaXMgYWxzbyBoaWRkZW4gKi9cblx0XHRcdHRoaXMucCgnaGlkZGVuJykuYWRkU291cmNlKHRoaXMub24oJ2Rlc3Ryb3knKS50YWtlKDEpLm1hcCh0cnVlKSk7XG5cblx0XHRcdC8qIHdoZW4gdGhlIHBhcmVudCBpcyBoaWRkZW4sIGhpZGUgdGhpcyBtb2RlbCB0b28gKi9cblx0XHRcdHRoaXMucCgnaGlkZGVuJykuYWRkU291cmNlKHRoaXMucGFyZW50LnAoJ2hpZGRlbicpLnZhbHVlKHRydWUpKTtcblxuXHRcdFx0LyogZ3JhYiBhIGxpbmsgdG8gdGhlIGNsb3Nlc3QgYW5jZXN0b3IgdGlsZSAqL1xuXHRcdFx0Ly8gVE9ETzogM0QgbW9kZWxzIGFyZSBub3cgdGllZCB0byBhIHBhcmVudCB0aWxlOyB0aGlzIGlzIG5vdCBlbGVnYW50XG5cdFx0XHR0aGlzLl90aWxlID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ1RpbGUnKTtcblxuXG5cdFx0XHQvKiBjcmVhdGUgYWxsIGRlc2NlbmRhbnQgVGhyZWVETW9kZWwncyAod2l0aG91dCBuZWNlc3NhcmlseSBsb2FkaW5nIHRoZWlyIG9iamVjdDNEKSAqL1xuXHRcdFx0dmFyIElOSEVSSVRFRF9PUFRJT05TID0gWydjb2xvcicsICdhbmltYXRpb24nXTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5wYXJ0cyB8fCB7fSkuZm9yRWFjaCgoaWQpID0+IHtcblxuXHRcdFx0XHQvKiB0aGUgb3B0aW9ucyBvZiB0aGUgbmV3IFRocmVlRE1vZGVsICovXG5cdFx0XHRcdHZhciBwYXJ0ID0gdGhpcy5vcHRpb25zLnBhcnRzW2lkXTtcblxuXHRcdFx0XHQvKiBkZWZpbmUgdGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNoaWxkIGFydGVmYWN0ICovXG5cdFx0XHRcdHZhciBuZXdDaGlsZE9wdGlvbnMgPSBVLmV4dGVuZCh7IGlkLCBwYXJlbnQ6IHRoaXMgfSwgcGFydCk7XG5cdFx0XHRcdElOSEVSSVRFRF9PUFRJT05TLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChuZXdDaGlsZE9wdGlvbnNbcHJvcF0pKSB7XG5cdFx0XHRcdFx0XHRuZXdDaGlsZE9wdGlvbnNbcHJvcF0gPSB0aGlzLm9wdGlvbnNbcHJvcF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBjb25zdHJ1Y3QgdGhlIGNoaWxkIFRocmVlRE1vZGVsICovXG5cdFx0XHRcdHJldHVybiBuZXcgd2luZG93Ll9hbXlfVGhyZWVETW9kZWwobmV3Q2hpbGRPcHRpb25zKTtcblxuXHRcdFx0fSk7XG5cblxuXG5cdFx0fSwge1xuXG5cdFx0XHRnZXQgb2JqZWN0M0QoKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fb2JqZWN0M0QpIHsgdGhpcy5fb2JqZWN0M0QgPSB0aGlzLl9sb2FkKCkgfVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fb2JqZWN0M0Q7XG5cdFx0XHR9LFxuXG5cblx0XHRcdF9jZW50ZXJHZW9tZXRyaWVzKG9iaikge1xuXHRcdFx0XHRpZiAoIXRoaXMuZ2VvbWV0cnlDb3JyZWN0aW9uKSB7IHRoaXMuZ2VvbWV0cnlDb3JyZWN0aW9uID0gdGhpcy5vcHRpb25zLmdlb21ldHJ5Q29ycmVjdGlvbiB9XG5cdFx0XHRcdGlmICghdGhpcy5nZW9tZXRyeUNvcnJlY3Rpb24pIHsgdGhpcy5nZW9tZXRyeUNvcnJlY3Rpb24gPSBvYmoudXNlckRhdGEuYm91bmRpbmdCb3guY2VudGVyKCkubmVnYXRlKCkgfVxuXHRcdFx0XHR0cmF2ZXJzZUdlb21ldHJpZXMob2JqLCAoZ2VvbWV0cnkpID0+IHtcblx0XHRcdFx0XHR2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5zZXRQb3NpdGlvbih0aGlzLmdlb21ldHJ5Q29ycmVjdGlvbik7XG5cdFx0XHRcdFx0KGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cyB8fCBbXSkuZm9yRWFjaCgoe3ZlcnRpY2VzfSkgPT4ge1xuXHRcdFx0XHRcdFx0dmVydGljZXMuZm9yRWFjaCgocG9pbnQpID0+IHtcblx0XHRcdFx0XHRcdFx0cG9pbnQuYXBwbHlNYXRyaXg0KG1hdHJpeCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRnZW9tZXRyeS5hcHBseU1hdHJpeChtYXRyaXgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblxuXHRcdFx0X2xvYWQoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMuZmlsZSkpICB7IHJlc3VsdCA9IHRoaXMuX2xvYWRGaWxlKCkgIH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3B0aW9ucy5wYXJ0cykpIHsgcmVzdWx0ID0gdGhpcy5fbG9hZFBhcnRzKCkgfVxuXG5cdFx0XHRcdGlmICghdGhpcy5faXNQYXJ0KSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0XG5cdFx0XHRcdFx0XHQvKiBwcm9jZXNzIHRoZSBnZW9tZXRyaWVzIGFuZCBjZW50ZXIgdGhlbSBvbiAoMCwgMCwgMCkgKi9cblx0XHRcdFx0XHRcdC50YXAoY2FsY3VsYXRlQm91bmRpbmdCb3gpXG5cdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHsgdGhpcy5fY2VudGVyR2VvbWV0cmllcyhvYmopIH0pXG5cdFx0XHRcdFx0XHQvKiByZXNpemUgLyByb3RhdGUgdGhlIG9iamVjdCBiYXNlZCBvbiB0aGUgc2hhcGUgb2YgdGhlIHRpbGUgKi9cblx0XHRcdFx0XHRcdC50YXAoKG9iaikgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnAoJ3Zpc2libGUnKS52YWx1ZSh0cnVlKS5mbGF0TWFwKCgpID0+XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fdGlsZS5wKCdzaXplJykudGFrZVdoaWxlKHRoaXMucCgndmlzaWJsZScpKSkub25WYWx1ZSgoc2l6ZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0LyogYWJicmV2aWF0ZSAzRC1vYmplY3Qgd2lkdGggYW5kIGhlaWdodCAqL1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvYmpXaWR0aCA9IG9iai51c2VyRGF0YS5ib3VuZGluZ0JveC5zaXplKCkueDtcblx0XHRcdFx0XHRcdFx0XHR2YXIgb2JqSGVpZ2h0ID0gb2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LnNpemUoKS55O1xuXG5cdFx0XHRcdFx0XHRcdFx0Lyogcm90YXRlIDkwwrAgb24gdGhlIHotYXhpcyBpZiB0aGlzIGdpdmVzIGEgYmV0dGVyIGZpdCAqL1xuXHRcdFx0XHRcdFx0XHRcdGlmICgoc2l6ZS53aWR0aCA8IHNpemUuaGVpZ2h0KSAhPT0gKG9ialdpZHRoIDwgb2JqSGVpZ2h0KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0b2JqLnJvdGF0aW9uLnogPSAwLjUgKiBNYXRoLlBJO1xuXHRcdFx0XHRcdFx0XHRcdFx0W29ialdpZHRoLCBvYmpIZWlnaHRdID0gW29iakhlaWdodCwgb2JqV2lkdGhdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvYmoucm90YXRpb24ueiA9IDA7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0LyogZGV0ZXJtaW5lIHRoZSBzY2FsZSByYXRpbyAqL1xuXHRcdFx0XHRcdFx0XHRcdHZhciByYXRpbyA9IDAuOCAqIE1hdGgubWluKHNpemUud2lkdGggLyBvYmpXaWR0aCwgc2l6ZS5oZWlnaHQgLyBvYmpIZWlnaHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0LyogYWRqdXN0IHNpemUgKi9cblx0XHRcdFx0XHRcdFx0XHRvYmouc2NhbGUuc2V0KHJhdGlvLCByYXRpbywgcmF0aW8pO1xuXG5cdFx0XHRcdFx0XHRcdFx0LyogYWRqdXN0ICdhbHRpdHVkZScgKi9cblx0XHRcdFx0XHRcdFx0XHR2YXIgZWxldmF0aW9uID0gVS5kZWZPcih0aGlzLm9wdGlvbnMuZWxldmF0aW9uLCBNYXRoLm1pbihzaXplLndpZHRoLCBzaXplLmhlaWdodCkgLyA0KTtcblx0XHRcdFx0XHRcdFx0XHRvYmoucG9zaXRpb24ueiA9IDAuNSAqIHJhdGlvICogb2JqLnVzZXJEYXRhLmJvdW5kaW5nQm94LnNpemUoKS56ICsgZWxldmF0aW9uO1xuXG5cdFx0XHRcdFx0XHRcdFx0LyogYW55IGN1c3RvbSAncm90YXRpb24nPyAqL1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMucm90YXRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKG9iai5yb3RhdGlvbiwgdGhpcy5vcHRpb25zLnJvdGF0aW9uKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LyogYmFjay1saW5rIHRoZSBhcnRlZmFjdCB0byB0aGUgb2JqZWN0M0QgKi9cblx0XHRcdFx0XHRcdC50YXAoKG9iaikgPT4geyBvYmoudXNlckRhdGEuYXJ0ZWZhY3QgPSB0aGlzIH0pXG5cdFx0XHRcdFx0XHQvKiBhZGQgdGhpcyBvYmplY3QgdG8gdGhlIHNjZW5lICovXG5cdFx0XHRcdFx0XHQudGFwKChvYmopID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fdGlsZS5vYmplY3QzRC5hZGQob2JqKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQvKiBzdGFydCB0aGUgYW5pbWF0aW9uIG9mIHRoaXMgb2JqZWN0LCBpZiBhcHBsaWNhYmxlICovXG5cdFx0XHRcdFx0XHQudGFwKHN0YXJ0VGhyZWVEQW5pbWF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHRfbG9hZEZpbGUoKSB7XG5cdFx0XHRcdHZhciB7ZmlsZSwgY29sb3IsIGFuaW1hdGlvbn0gPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRcdFx0Lyogc2VsZWN0IHRoZSBsb25nZXN0IGV4dGVuc2lvbiB0aGF0IGZpdHMgdGhlIGZpbGVuYW1lICovXG5cdFx0XHRcdC8vIGUuZy4sIFwicG9pbnRzLmpzb25cIiBoYXMgcHJpb3JpdHkgb3ZlciBcImpzb25cIlxuXHRcdFx0XHR2YXIgZXh0ID0gJyc7XG5cdFx0XHRcdE9iamVjdC5rZXlzKCQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycykuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGV4dGVuc2lvbi5sZW5ndGggPiBleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kc1dpdGgoZmlsZSwgYC4ke2V4dGVuc2lvbn1gKSkge1xuXHRcdFx0XHRcdFx0XHRleHQgPSBleHRlbnNpb247XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiB3YXMgYW4gZXh0ZW5zaW9uIGZvdW5kPyAqL1xuXHRcdFx0XHRVLmFzc2VydChleHQubGVuZ3RoID4gMCwgYFRoZSBmaWxlICcke2ZpbGV9JyBpcyBub3QgcmVjb2duaXplZCBhcyBhIDNEIG1vZGVsLmApO1xuXG5cdFx0XHRcdC8qIGZldGNoIHRoZSBsb2FkZXIgZm9yIHRoYXQgZmlsZSBleHRlbnNpb24gKi9cblx0XHRcdFx0dmFyIExvYWRlciA9ICQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVyc1tleHRdO1xuXG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayAqL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChMb2FkZXIpLCBgU29tZXRoaW5nIHdlbnQgd3JvbmcgcmV0cmlldmluZyB0aGUgM0QgbW9kZWwgbG9hZGVyLmApO1xuXG5cdFx0XHRcdC8qIHJldHVybiBhIHByb21pc2UgdG8gdGhlIDNEIG9iamVjdCAqL1xuXHRcdFx0XHRyZXR1cm4gVS5wcm9taXNpZnkobmV3IExvYWRlcigpLCAnbG9hZCcpKGZpbGUpLnRoZW4oKG9iaikgPT4ge1xuXG5cdFx0XHRcdFx0LyogZm9yIG5vdywgd2Ugb25seSBhY2NlcHQgR2VvbWV0cnkncyBhbmQgT2JqZWN0M0QncyBmcm9tIGEgbG9hZGVyICovXG5cdFx0XHRcdFx0VS5hc3NlcnQoaXNHZW9tZXRyeShvYmopIHx8IGlzT2JqZWN0M0Qob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAzRCBtb2RlbCBsb2FkZXIgZm9yIHRoZSAnJHtleHR9JyBleHRlbnNpb24gcmV0dXJuZWQgYW4gdW5zdXBwb3J0ZWQgdmFsdWUuYCk7XG5cblx0XHRcdFx0XHQvKiBpZiBhIEdlb21ldHJ5IGlzIHJldHVybmVkLCBjcmVhdGUgYW4gT2JqZWN0M0QgYXJvdW5kIGl0ICovXG5cdFx0XHRcdFx0aWYgKGlzR2VvbWV0cnkob2JqKSkge1xuXHRcdFx0XHRcdFx0dmFyIGdlb21ldHJ5ID0gb2JqO1xuXHRcdFx0XHRcdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY29sb3IgfHwgJ3doaXRlJyB9KTtcblx0XHRcdFx0XHRcdG1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuXHRcdFx0XHRcdFx0aWYgKGFuaW1hdGlvbikge1xuXHRcdFx0XHRcdFx0XHRvYmogPSBuZXcgVEhSRUUuTW9ycGhBbmltTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuXHRcdFx0XHRcdFx0XHRvYmouZHVyYXRpb24gPSBhbmltYXRpb24uZHVyYXRpb247XG5cdFx0XHRcdFx0XHRcdG1hdGVyaWFsLm1vcnBoVGFyZ2V0cyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGdlb21ldHJ5LmNvbXB1dGVNb3JwaE5vcm1hbHMob2JqKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG9iaiA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogcmV0dXJuIHRoZSBvYmplY3QgKi9cblx0XHRcdFx0XHRyZXR1cm4gb2JqO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblx0XHRcdF9sb2FkUGFydHMoKSB7XG5cdFx0XHRcdHJldHVybiBQLmFsbCh0aGlzLmNoaWxkcmVuKS5tYXAoKGNoaWxkKSA9PiAoY2hpbGQuX29iamVjdDNEID0gY2hpbGQuX2xvYWQoKSkpXG5cdFx0XHRcdFx0XHQucmVkdWNlKChwYXJlbnQsIGNoaWxkKSA9PiB7IHBhcmVudC5hZGQoY2hpbGQpOyByZXR1cm4gcGFyZW50IH0sIG5ldyBUSFJFRS5PYmplY3QzRCgpKTtcblx0XHRcdH1cblxuXHRcdH0sIHtcblxuXHRcdFx0dmlzaWJsZTogZmFsc2VcblxuXHRcdH0pO1xuXG5cblx0XHQvKiBzdGF0aWMgbG9jYXRpb24gdG8gY29sbGVjdCB0aHJlZS5qcyBsb2FkZXJzIGZvciBkaWZmZXJlbnQgZmlsZSBmb3JtYXRzICovXG5cdFx0Ly8gVE9ETzogdHJhbnNmZXIgdGhpcyB0YXNrIGZyb20gQ2lyY3VpdGJvYXJkIHRvIGhlcmUsIGV2ZXJ5d2hlcmUgaW4gdGhlIGNvZGVcblx0XHR3aW5kb3cuX2FteV9UaHJlZURNb2RlbC5sb2FkZXJzID0ge307XG5cblxuXHRcdHJldHVybiB3aW5kb3cuX2FteV9UaHJlZURNb2RlbDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5UaHJlZURNb2RlbCA9IGMgfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UaHJlZURNb2RlbC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdiYWNvbmpzJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEJhY29uLCBUV0VFTikge1xuXG5cdHJlcXVpcmUoJ2JhY29uLm1vZGVsJyk7XG5cdHJlcXVpcmUoJ2JhY29uLmpxdWVyeScpO1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRCYWNvbi5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgKHYpID0+IHsgc2luayhuZXcgQmFjb24uTmV4dCh2KSkgfSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBvYmoub24oZXZlbnROYW1lLCBudWxsKSB9O1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG5cdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG5cdFx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG5cdFx0XHQoKGYpID0+IHsgd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSB9KTtcblx0QmFjb24uYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cblx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0dmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0KGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHNpbmsoKSA9PT0gQmFjb24ubm9Nb3JlKSB7IHN1YnNjcmliZWQgPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKHN1YnNjcmliZWQpIHsgaXRlcmF0aW9uRm4oKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0LyogdW5zdWJzY3JpYmUgZnVuY3Rpb24gKi9cblx0XHRcdHJldHVybiAoKSA9PiB7IHN1YnNjcmliZWQgPSBmYWxzZSB9O1xuXG5cdFx0fSk7XG5cdH07XG5cblxuXHRCYWNvbi50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ30pIHtcblxuXHRcdC8qIHRoZSB0d2VlbiAqL1xuXHRcdHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG5cblx0XHQvKiB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0dmFyIGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IHNpbmsobmV3IEJhY29uLk5leHQoKCkgPT4gdGhpcykpIH0pO1xuXHRcdFx0dHcub25Db21wbGV0ZSgoKSA9PiB7IHNpbmsobmV3IEJhY29uLkVuZCgpKSB9KTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEJhY29uLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Y29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNFdmVudFN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Y29kZSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEJhY29uLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIG9wZW4gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlcih3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoaGFuZGxlciwgKCkgPT4ge1xuXHRcdFx0b3Blbi5wdXNoKCk7XG5cdFx0XHR3YW50ZWRCdXMucHVzaChmYWxzZSk7XG5cdFx0XHRjbG9zZS5wdXNoKCk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcCh0cnVlKSk7XG5cdFx0XHRyZXR1cm4gY2xvc2Uuc3RhcnRXaXRoKHRydWUpLmZsYXRNYXBMYXRlc3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgYWNjdW11bGF0b3IgPSAoYXJyLCB2YWwpID0+IChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcblx0XHRcdFx0cmV0dXJuIHN0cmVhbS50YWtlVW50aWwob3BlbikucmVkdWNlKFtdLCBhY2N1bXVsYXRvcikuZmxhdE1hcChCYWNvbi5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuXHRcdHJldHVybiBCYWNvbi5mcm9tQmluZGVyKChzaW5rKSA9PiB7XG5cdFx0XHR2YXIgYnVmZmVyID0gW107XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSB0aGlzLm9uVmFsdWUoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGJ1ZmZlci5wdXNoKG5ldyBCYWNvbi5OZXh0KCgpID0+IHZhbHVlKSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdHNpbmsob2xkQnVmZmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvVGhpcygpO1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG5cdFx0XHRcdGJ1ZmZlciA9IG51bGw7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFRoaXMgZmlsdGVycyBhbiBvYnNlcnZhYmxlIHRvIG9ubHkgbGV0IHRocm91Z2ggdmFsdWVzIGVxdWFsIHRvIHRoZSBnaXZlbiB2YWx1ZS5cblx0QmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbXBhcmF0b3IpIHtcblx0XHRjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGUpID0+IGUgPT09IHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcblx0fTtcblxuXHQvLyBUaGlzIG1ha2VzIGEgc3Vic2NyaXB0aW9uIHRvIGFuIG9ic2VydmFibGUgdGhhdCBkb2Vzbid0IGRvIGFueXRoaW5nXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdWJzY3JpYmUoKCk9Pnt9KTtcblx0fTtcblxuXHQvLyBUaGlzIGlzIGEgJ3NtYXJ0JyAuc3RvcFByb3BhZ2F0aW9uLCBtYXJraW5nIGV2ZW50cyB3aXRoIGEgbGFiZWxcblx0Ly8gYW5kIHNraXBwaW5nIHRob3NlIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgbGFiZWwuXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAobGFiZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGV2ZW50KSA9PiB7XG5cdFx0XHRyZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcblx0XHR9KS5tYXAoKGV2ZW50KSA9PiB7XG5cdFx0XHRVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF0gPSB0cnVlO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIEZpbHRlciBldmVudHMgdG8gb25seSBjZXJ0YWluIGtleXMgLyBidXR0b25zLiBDYW4gYmUgYSBwcmVkaWNhdGUgZnVuY3Rpb24gb3Igc2luZ2xlIG51bWJlci5cblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24gKGJ1dHRvbklkKSB7XG5cdFx0dmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoYiA9PiBiID09PSBidXR0b25JZCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKGUgPT4gcHJlZChlLndoaWNoKSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdCQuZm4ubW91c2VEcmFnID0gZnVuY3Rpb24gbW91c2VEcmFnKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHRzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4geyAvLyBUT0RPOiBkb24ndCB1c2UgJ2ZpbHRlcicsIGJ1dCBzb21ldGhpbmcgbGlrZSAnc2tpcFVudGlsJyBvciAnZmxhdE1hcCdcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyZWFtXG5cdFx0XHRcdFx0LnRha2VVbnRpbCgkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykpXG5cdFx0XHRcdFx0Lm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5mbi5tb3VzZUNsaWNrID0gZnVuY3Rpb24gbW91c2VDbGljayh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHR1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHtcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsKHVudGlsU3RyZWFtKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEJhY29uO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9iYWNvbi1hbmQtZWdncy5qc1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzJyxcblx0Jy4vdXRpbC91bmlxdWUtaWQuanMnLFxuXHQnLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMnLFxuXHQnLi91dGlsL3BsdWdpbi5qcycsXG5cdCcuL3V0aWwvZGVmZXIuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgQmFjb25TaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0sIHBsdWdpbiwgZGVmZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0cmV0dXJuIHBsdWdpbi5zZWxlY3RlZC50aGVuKCgpID0+IHtcblxuXG5cdFx0LyogaG93ZXZlciAob2Z0ZW4pIHRoaXMgaXMgbG9hZGVkLCBjcmVhdGUgdGhlIGNsYXNzIG9ubHkgb25jZSAqL1xuXHRcdGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9BcnRlZmFjdCkpIHsgcmV0dXJuIHdpbmRvdy5fYW15X0FydGVmYWN0IH1cblxuXG5cdFx0LyoqIHtAZXhwb3J0IEBjbGFzcyBBcnRlZmFjdCBAZXh0ZW5kcyBCYWNvblNpZ25hbEhhbmRsZXJ9XG5cdFx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0XHQgKiBldmVudHMgYW5kIG9ic2VydmFibGUgcHJvcGVydGllcyB0aHJvdWdoIEJhY29uLmpzLlxuXHRcdCAqXG5cdFx0ICogVXNlcnMgY2FuIHBhc3MgYSBwcm9taXNlIHRocm91Z2ggdGhlICdiZWZvcmVDb25zdHJ1Y3Rpb24nIG9wdGlvbi4gSWYgZG9uZSwgdGhlXG5cdFx0ICogYXJ0ZWZhY3Qgd2FpdHMgb24gdGhhdCBwcm9taXNlIGJlZm9yZSBjYWxsaW5nIGl0cyAnY29uc3RydWN0JyBtZXRob2QuXG5cdFx0ICogU2ltaWxhcmx5LCB1c2VycyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBjbGFzcyBzaG91bGQgdGVzdCB0aGUgJ2NvbnN0cnVjdGVkJyBwcm9wZXJ0eS5cblx0XHQgKiBJZiBpdCBpcyBkZWZpbmVkLCBpdCBpcyBhIHByb21pc2UgdGhhdCBoYXMgdG8gYmUgd2FpdGVkIGZvci5cblx0XHQgKiBJZiBub3QsIHRoZSBvYmplY3QgaW5zdGFuY2UgY2FuIGJlIHVzZWQgc3luY2hyb25vdXNseSBhZnRlciBjb25zdHJ1Y3Rpb24uXG5cdFx0ICovXG5cdFx0d2luZG93Ll9hbXlfQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEJhY29uU2lnbmFsSGFuZGxlciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFydGVmYWN0KG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdFx0dGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHR2YXIge2lkLCB0eXBlLCBwYXJlbnQsIGJlZm9yZUNvbnN0cnVjdGlvbn0gPSBvcHRpb25zO1xuXG5cdFx0XHQvKiBzZXQgaGllcmFyY2h5IHN0dWZmICovXG5cdFx0XHR0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuXHRcdFx0dGhpcy5fdHlwZSA9IHR5cGU7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHRcdFx0aWYgKHBhcmVudCkgeyBVLmFycmF5KHBhcmVudCwgJ19jaGlsZHJlbicpLnB1c2godGhpcykgfVxuXG5cdFx0XHQvKiBjcmVhdGUgZXZlbnRzICovXG5cdFx0XHR0aGlzLm5ld0V2ZW50KCdkZXN0cm95Jyk7XG5cblx0XHRcdC8qIHBvc3NpYmx5IHdhaXQgZm9yIHNvbWV0aGluZyBiZWZvcmUgY29uc3RydWN0aW9uIChsaWtlIHBsdWdpbnMpPyAqL1xuXHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24oYmVmb3JlQ29uc3RydWN0aW9uKTtcblxuXHRcdFx0LyogZ2l2ZSB0aGUgcm9vdCBhcnRlZmFjdCBhIHdheSB0byByZWdpc3RlciBvdGhlciBhcnRlZmFjdHMgYnkgSUQgKi9cblx0XHRcdGlmICh0aGlzLnJvb3QgPT09IHRoaXMpIHtcblx0XHRcdFx0dGhpcy5fYXJ0ZWZhY3RzQnlJRCA9IHt9O1xuXHRcdFx0XHR0aGlzLl9yZWdpc3RlckFydGVmYWN0ID0gZnVuY3Rpb24gKGFydGVmYWN0KSB7XG5cdFx0XHRcdFx0VS5nZXREZWYodGhpcy5fYXJ0ZWZhY3RzQnlJRCwgYXJ0ZWZhY3QuaWQsIGRlZmVyKS5yZXNvbHZlKGFydGVmYWN0KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdH0sIC8qKiBAbGVuZHMgQXJ0ZWZhY3QucHJvdG90eXBlICovIHtcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQWxsb3cgYSBwcm9taXNlIHRvIGJlIGluc2VydGVkIG9uIHdoaWNoIHRoZSByZXN0IG9mIGNvbnN0cnVjdGlvbiBzaG91bGQgd2FpdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gcG9zc2libGVQcm9taXNlIHsqfSAgLSBhIHZhbHVlIHRoYXQgbWlnaHQgYmUgYSBwcm9taXNlXG5cdFx0XHQgKi9cblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbihwb3NzaWJsZVByb21pc2UpIHtcblxuXHRcdFx0XHQvKiBpZiBubyBwcm9taXNlIGlzIHBhc3NlZCBpbiwgaWdub3JlLCB0byBrZWVwIGNvbnN0cnVjdGlvbiBzeW5jaHJvbm91cyAqL1xuXHRcdFx0XHRpZiAoIXBvc3NpYmxlUHJvbWlzZSB8fCAhJC5pc0Z1bmN0aW9uKHBvc3NpYmxlUHJvbWlzZS50aGVuKSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHByb21pc2UgcGFzc2VkIGluLCBpbml0aWFsaXplICd0aGlzLmNvbnN0cnVjdGVkJyAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuY29uc3RydWN0ZWQpIHsgdGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSh0aGlzKSB9XG5cblx0XHRcdFx0LyogaW5zZXJ0IHRoZSBuZXcgcHJvbWlzZSBpbnRvIHRoZSBjaGFpbiBmb3IgJ3RoaXMuY29uc3RydWN0ZWQnIHJlc29sdXRpb24gKi9cblx0XHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWQudGFwKCgpID0+IFAucmVzb2x2ZShwb3NzaWJsZVByb21pc2UpKTtcblxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBvcHRpb25zIHByb3ZpZGVkIHRocm91Z2ggdGhlIGNvbnN0cnVjdG9yXG5cdFx0XHQgKi9cblx0XHRcdGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9ucyB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gdGhlIHVuaXF1ZSBpZGVudGlmaWVyIGJlbG9uZ2luZyB0byB0aGlzIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdHlwZSBvZiB0aGlzIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdGdldCB0eXBlKCkgeyByZXR1cm4gdGhpcy5fdHlwZSB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnRlZmFjdHx1bmRlZmluZWR9IC0gdGhlIHBhcmVudCBvZiB0aGlzIGFydGVmYWN0LCB1bmxlc3MgdGhpcyBpcyB0aGUgcm9vdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgcGFyZW50KCkgeyByZXR1cm4gdGhpcy5fcGFyZW50IH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1tBcnRlZmFjdF19IC0gdGhlIGNoaWxkcmVuIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IGNoaWxkcmVuKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R9IC0gdGhlIHJvb3Qgb2YgdGhlIGFydGVmYWN0IGhpZXJhcmNoeVxuXHRcdFx0ICovXG5cdFx0XHRnZXQgcm9vdCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9yb290KSB7IHRoaXMuX3Jvb3QgPSB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnJvb3QgOiB0aGlzIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogR2V0IGEgcHJvbWlzZSB0byBhbiBhcnRlZmFjdCBnaXZlbiBpdHMgSUQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtICBpZCB7U3RyaW5nfSAgIC0gdGhlIGlkIG9mIHRoZSByZXF1aXJlZCBhcnRlZmFjdFxuXHRcdFx0ICogQHJldHVybiB7UDxBcnRlZmFjdD59IC0gdGhlIHByb21pc2UgdG8gdGhlIGFydGVmYWN0IHRoYXQgaGFzIHRoZSBnaXZlbiBpZFxuXHRcdFx0ICovXG5cdFx0XHRhcnRlZmFjdEJ5SWQoaWQpIHtcblx0XHRcdFx0cmV0dXJuIFUuZ2V0RGVmKHRoaXMucm9vdC5fYXJ0ZWZhY3RzQnlJRCwgaWQsIGRlZmVyKS5wcm9taXNlO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFRyYXZlcnNlIHRoZSBBcnRlZmFjdCBoaWVyYXJjaHkgd2l0aCB0aGlzIGFzIHJvb3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIGZuIHsoQXJ0ZWZhY3QpID0+IEJvb2xlYW59IC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHR0cmF2ZXJzZUFydGVmYWN0cyhmbiwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciB7b3JkZXJ9ID0gb3B0aW9ucztcblx0XHRcdFx0aWYgKCFvcmRlcikgeyBvcmRlciA9ICdwcmVmaXgnIH1cblxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwcmVmaXgnKSB7IGZuKHRoaXMpIH1cblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGNoaWxkLnRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3Bvc3RmaXgnKSB7IGZuKHRoaXMpIH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBUcmF2ZXJzZSB0aGUgQXJ0ZWZhY3QgaGllcmFyY2h5IHdpdGggdGhpcyBhcyByb290LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBmbiB7KEFydGVmYWN0KSA9PiBCb29sZWFufSAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0dHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR2YXIge29yZGVyfSA9IG9wdGlvbnM7XG5cdFx0XHRcdGlmICghb3JkZXIpIHsgb3JkZXIgPSAncHJlZml4JyB9XG5cblx0XHRcdFx0aWYgKG9yZGVyID09PSAncHJlZml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHsgZm4odGhpcykgfVxuXHRcdFx0XHRpZiAob3B0aW9ucy5iZWZvcmVHb2luZ0luKSB7IG9wdGlvbnMuYmVmb3JlR29pbmdJbih0aGlzKSB9XG5cdFx0XHRcdHRoaXMuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpLmZvckVhY2goKGRlc2NlbmRlbnQpID0+IHtcblx0XHRcdFx0XHRkZXNjZW5kZW50LnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKHR5cGUsIGZuLCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChvcHRpb25zLmJlZm9yZUdvaW5nT3V0KSB7IG9wdGlvbnMuYmVmb3JlR29pbmdPdXQodGhpcykgfVxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwb3N0Zml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHsgZm4odGhpcykgfVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIChwYXJlbnQsIHBhcmVudCdzIHBhcmVudCwgLi4uKVxuXHRcdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gdHlwZSwgdW5sZXNzIHRoZXJlIGlzIG5vbmVcblx0XHRcdCAqL1xuXHRcdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnQgKGNoaWxkcmVuLCBjaGlsZHJlbidzIGNoaWxkcmVuLCAuLi4pXG5cdFx0XHQgKiBvZiB0aGlzIGFydGVmYWN0IHdpdGggdGhlIGdpdmVuIHR5cGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50cyBvZiB0aGUgZ2l2ZW4gdHlwZTsgbm9uZSBvZiB0aGVtXG5cdFx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkZXNjZW5kYW50IGZyb20gYW55IG90aGVyXG5cdFx0XHQgKi9cblx0XHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEluZGljYXRlIHRoYXQgdGhpcyBhcnRlZmFjdCB3aWxsIG5ldmVyIGJlIHVzZWQgYWdhaW4sIGFsbG93aW5nIGl0XG5cdFx0XHQgKiB0byBkbyBhbnkgbmVjZXNzYXJ5IGNsZWFudXAuXG5cdFx0XHQgKi9cblx0XHRcdGRlc3Ryb3koKSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignZGVzdHJveScpO1xuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmRlc3Ryb3koKSB9KTtcblx0XHRcdH1cblxuXHRcdH0pKTtcblxuXG5cdFx0LyoqIHtAZnVuY3Rpb24gQXJ0ZWZhY3QubmV3U3ViY2xhc3N9XG5cdFx0ICogQSBzdGF0aWMgY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgc3ViY2xhc3Mgb2Yge0BsaW5rIEFydGVmYWN0fS5cblx0XHQgKi9cblx0XHR3aW5kb3cuX2FteV9BcnRlZmFjdC5uZXdTdWJjbGFzcyA9IGZ1bmN0aW9uIG5ld1N1YkNsYXNzKG5hbWUsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXHRcdFx0cmV0dXJuIGRtLnZwKG5hbWUsIFUubmV3U3ViY2xhc3Mod2luZG93Ll9hbXlfQXJ0ZWZhY3QsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdFx0LyogcHJvY2VzcyBvcHRpb25zICovXG5cdFx0XHRcdHZhciBwcm9jZXNzZWRPcHRpb25zID0gb3B0aW9ucztcblx0XHRcdFx0T2JqZWN0LmtleXMob3B0aW9uRGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHByb2Nlc3NlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NlZE9wdGlvbnNba2V5XSA9IG9wdGlvbkRlZmF1bHRzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9ucy50eXBlID0gbmFtZTtcblxuXHRcdFx0XHQvKiBjYWxsIHN1cGVyLWNvbnN0cnVjdG9yICovXG5cdFx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBVLmV4dGVuZChvcHRpb25zLCBwcm9jZXNzZWRPcHRpb25zKSk7XG5cblx0XHRcdFx0LyogY2FsbCB0aGlzIGNvbnN0cnVjdG9yICovXG5cdFx0XHRcdGNvbnN0cnVjdG9yLmNhbGwodGhpcywgcHJvY2Vzc2VkT3B0aW9ucyk7XG5cblx0XHRcdFx0LyogdGhlbiBydW4gdGhlICdjb25zdHJ1Y3QnIG1ldGhvZCAqL1xuXHRcdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3RlZCkgeyAvLyBjb25zdHJ1Y3QgYXN5bmNocm9ub3VzbHlcblx0XHRcdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBQLnJlc29sdmUodGhpcy5jb25zdHJ1Y3Qob3B0aW9ucykpLnJldHVybih0aGlzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdChvcHRpb25zKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiByZWdpc3RlciB0aGlzIGFydGVmYWN0IHRvIHRoZSBjaXJjdWl0Ym9hcmQgKi9cblx0XHRcdFx0KHRoaXMuY29uc3RydWN0ZWQgfHwgUC5yZXNvbHZlKCkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucm9vdC5fcmVnaXN0ZXJBcnRlZmFjdCh0aGlzKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdFx0Z2V0IGNpcmN1aXRib2FyZCgpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuX2NpcmN1aXRib2FyZCkgeyB0aGlzLl9jaXJjdWl0Ym9hcmQgPSB0aGlzLmNsb3Nlc3RBbmNlc3RvckJ5VHlwZSgnQ2lyY3VpdGJvYXJkJykgfVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9jaXJjdWl0Ym9hcmQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pKSk7XG5cdFx0fTtcblxuXG5cdFx0cmV0dXJuIHdpbmRvdy5fYW15X0FydGVmYWN0O1xuXG5cblx0fSkudGFwKChjKSA9PiB7ICQuY2lyY3VpdGJvYXJkLkFydGVmYWN0ID0gYyB9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0FydGVmYWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uanNcIixcImNvbW1vbmpzXCI6XCJiYWNvbmpzXCIsXCJhbWRcIjpcImJhY29uanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhY29uLm1vZGVsXCJcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJy4vYmFjb24tYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEJhY29uKSB7XG5cblxuXHQvKioge0BleHBvcnR9e0BjbGFzcyBCYWNvblNpZ25hbEhhbmRsZXJ9XG5cdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggQmFjb24uanMuXG5cdCAqL1xuXHR2YXIgQmFjb25TaWduYWxIYW5kbGVyID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBCYWNvblNpZ25hbEhhbmRsZXIoKSB7XG5cblx0XHR0aGlzLl9ldmVudHMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0aWVzID0ge307XG5cdFx0dGhpcy5fcHJvcGVydHlCdXNzZXMgPSB7fTtcblxuXHR9LCAvKiogQGxlbmRzIEJhY29uU2lnbmFsSGFuZGxlci5wcm90b3R5cGUgKi8ge1xuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRGVjbGFyZXMgYSBuZXcgZXZlbnQgc3RyZWFtIGZvciB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgbmFtZSAgICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCwgdXNlZCB0byB0cmlnZ2VyIG9yIHN1YnNjcmliZSB0byBpdFxuXHRcdCAqIEBwYXJhbSAge0JhY29uLkV2ZW50U3RyZWFtfSBbc291cmNlXSAtIGFub3RoZXIgZXZlbnQgc3RyZWFtIHRvIGF1dG9tYXRpY2FsbHkgdHJpZ2dlciB0aGlzIGV2ZW50XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5CdXN9IC0gdGhlIGNyZWF0ZWQgZXZlbnQgc3RyZWFtXG5cdFx0ICovXG5cdFx0bmV3RXZlbnQobmFtZSwge3NvdXJjZX0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgZXZlbnQgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBldmVudCBzdHJlYW0gKi9cblx0XHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRpZiAoc291cmNlKSB7IGJ1cy5wbHVnKHNvdXJjZSkgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cy5uYW1lKG5hbWUpO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFJldHJpZXZlIGFuIGV2ZW50IHN0cmVhbSBieSBuYW1lLiBJZiB0aGUgbmFtZSBvZiBhIHByb3BlcnR5IGlzIGdpdmVuLCBhIHN0cmVhbVxuXHRcdCAqIGJhc2VkIG9uIGNoYW5nZXMgdG8gdGhhdCBwcm9wZXJ0eSBpcyByZXR1cm5lZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5FdmVudFN0cmVhbX0gLSB0aGUgZXZlbnQgc3RyZWFtIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuXHRcdCAqL1xuXHRcdGV2ZW50KG5hbWUpIHtcblxuXHRcdFx0LyogZG9lcyB0aGUgZXZlbnQgZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcmV0dXJuIGl0ICovXG5cdFx0XHRyZXR1cm4gdGhpcy5fZXZlbnRzW25hbWVdO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFJldHJpZXZlIGEgcHJvcGVydHkgYnkgbmFtZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byByZXRyaWV2ZVxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk1vZGVsfSAtIHRoZSBwcm9wZXJ0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRwcm9wZXJ0eShuYW1lKSB7IHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdIH0sXG5cblx0XHQvKiogQGFsaWFzIHByb3BlcnR5ICovXG5cdFx0cChuYW1lKSB7IHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdIH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBkZWZpbmVzIGEgbmV3IHByb3BlcnR5IG9uIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgICAgICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSAgICAgICAgICAgICAgICAgW3NldHRhYmxlPXRydWVdIC0gd2hldGhlciB0aGUgdmFsdWUgY2FuIGJlIG1hbnVhbGx5IHNldFxuXHRcdCAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgICAgICAgICAgICBbaW5pdGlhbF0gICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5XG5cdFx0ICogQHBhcmFtICB7ZnVuY3Rpb24oKiwqKTpCb29sZWFufSAgIFtpc0VxdWFsXSAgICAgICAtIGEgcHJlZGljYXRlIGZ1bmN0aW9uIGJ5IHdoaWNoIHRvIHRlc3QgZm9yIGR1cGxpY2F0ZSB2YWx1ZXNcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk1vZGVsfSAtIHRoZSBwcm9wZXJ0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRuZXdQcm9wZXJ0eShuYW1lLCB7c2V0dGFibGUsIGluaXRpYWwsIGlzRXF1YWx9ID0ge30pIHtcblxuXHRcdFx0LyogaXMgdGhlIHByb3BlcnR5IG5hbWUgYWxyZWFkeSB0YWtlbj8gKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGRlZmF1bHQgdmFsdWUgZm9yICdzZXR0YWJsZScgKi9cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHNldHRhYmxlKSkgeyBzZXR0YWJsZSA9IHRydWUgfVxuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIEJhY29uLk1vZGVsIHdoaWNoIHN0b3JlcyB0aGUgcHJvcGVydHkgKi9cblx0XHRcdHZhciBwcm9wZXJ0eSA9IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSBuZXcgQmFjb24uTW9kZWwoaW5pdGlhbCwgeyBpc0VxdWFsIH0pO1xuXG5cdFx0XHQvKiBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBvYmplY3QgaW50ZXJmYWNlICovXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuXHRcdFx0XHRnZXQ6IHByb3BlcnR5LmdldCxcblx0XHRcdFx0c2V0OiBzZXR0YWJsZSA/IHByb3BlcnR5LnNldCA6IHVuZGVmaW5lZFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgcHJvcGVydHkgKi9cblx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUcmlnZ2VyIGFuIGV2ZW50IGZvciBhbGwgc3Vic2NyaWJlcnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHRyaWdnZXJcblx0XHQgKiBAdmFsdWUgeyp9ICAgICAgdmFsdWUgLSB0aGUgdmFsdWUgdG8gYXR0YWNoIHRvIHRoZSBldmVudFxuXHRcdCAqL1xuXHRcdHRyaWdnZXIobmFtZSwgdmFsdWUpIHtcblxuXHRcdFx0LyogZG9lcyB0aGUgZXZlbnQgc3RyZWFtIGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHB1c2ggdGhlIHZhbHVlIHRvIHRoZSBzdHJlYW0gKi9cblx0XHRcdHRoaXMuX2V2ZW50c1tuYW1lXS5wdXNoKHZhbHVlKTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBzZWxlY3RzIGFuIGV4aXN0aW5nIHN0cmVhbSBvciBwcm9wZXJ0eSwgYW5kIHRoZW5cblx0XHQgKiBlaXRoZXIgcmV0dXJucyBpdCwgb3IgY3JlYXRlcyBhIHN1YnNjcmlwdGlvbiB0byBpdCwgZGVwZW5kaW5nXG5cdFx0ICogb24gd2hldGhlciBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkLlxuXHRcdCAqXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICBuYW1lICAgICAgICAgICAgICAgICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBvciBwcm9wZXJ0eSB0byBzdWJzY3JpYmUgdG9cblx0XHQgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgIFtleHBlY3RlZFZhbHVlXSAgICAgICAtIGlmIHByb3ZpZGVkLCBmaWx0ZXJzIHRoZSBzdHJlYW0gYnkgPT09IGVxdWFsaXR5IHdpdGggdGhpcyB2YWx1ZTtcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgbWF5IG5vdCBiZSBhIHBsYWluIG9iamVjdFxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgW29wdGlvbnNdICAgICAgICAgICAgIC0gYSBwbGFpbiBvYmplY3QgZm9yIHByb3ZpZGluZyBhZGRpdGlvbmFsIG9wdGlvbnNcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgIFtvcHRpb25zLm9uY2U9ZmFsc2VdICAtIHdoZXRoZXIgdGhlIHN0cmVhbSBlbmRzIGFmdGVyIG9uZSBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6dm9pZH0gW2NhbGxiYWNrXSAgICAgICAgICAgIC0gaWYgcHJvdmlkZWQsIHN1YnNjcmliZXMgdG8gdGhpcyBzdHJlYW0gd2l0aCB0aGUgdGhpcyBjYWxsYmFja1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uT2JzZXJ2YWJsZXxmdW5jdGlvbigpOnVuZGVmaW5lZH0gLSBpZiBubyBgY2FsbGJhY2tgIGlzIHByb3ZpZGVkLCB0aGUgc3BlY2lmaWVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgcHJvcGVydHk7IG90aGVyd2lzZSwgYSBmdW5jdGlvbiB0byB1bnN1YnNjcmliZSB0byBzYWlkXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0gb3IgcHJvcGVydHlcblx0XHQgKi9cblx0XHRvbihuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGFyZ3NPYmogPSB0aGlzLl9nYXRoZXJPbkFyZ3VtZW50cyhuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjayk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fb24oYXJnc09iaik7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGlzIGEgc2hvcnRoYW5kIGZvciB0aGUge0BsaW5rIG9ufSBtZXRob2Qgd2l0aCB0aGUgYG9uY2VgIG9wdGlvbiBlbmFibGVkLlxuXHRcdCAqIEluIG90aGVyIHdvcmRzLCBhbnkgc3RyZWFtIHJldHVybmVkIHdpbGwgc2VuZCBvbmx5IG9uZSBldmVudCwgYW5kIGFueSBjYWxsYmFja1xuXHRcdCAqIHByb3ZpZGVkIHdpbGwgb25seSBmaXJlIG9uY2UuXG5cdFx0ICovXG5cdFx0b25lKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdFUub2JqZWN0KGFyZ3NPYmosICdvcHRpb25zJykub25jZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gdGhpcy5fb24oYXJnc09iaik7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBkb2VzIHRoZSBtYWluIHdvcmsgZm9yIHtAbGluayBvbn0gb3Ige0BsaW5rIG9uZX0sIGJ1dCBhY2NlcHRzXG5cdFx0ICogdGhlIHBhcmFtZXRlcnMgYXMgb25lIG9iamVjdCwgc28gaXQgZG9lc24ndCBoYXZlIHRvIGRlYWwgd2l0aCBwYXJhbWV0ZXIgb3JkZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dm9pZH1cblx0XHQgKi9cblx0XHRfb24oe25hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrfSkge1xuXHRcdFx0LyogZG9lcyBhbiBldmVudCBvciBwcm9wZXJ0eSBieSB0aGlzIG5hbWUgZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgb3IgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBwcm9jZXNzIG5hbWUgKi9cblx0XHRcdHZhciByZXN1bHQgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcblxuXHRcdFx0LyogcHJvY2VzcyBleHBlY3RlZFZhbHVlICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoZXhwZWN0ZWRWYWx1ZSkpIHsgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcigodikgPT4gdiA9PT0gZXhwZWN0ZWRWYWx1ZSkgfVxuXG5cdFx0XHQvKiBwcm9jZXNzIG9wdGlvbnMub25jZSAqL1xuXHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbmNlKSB7IHJlc3VsdCA9IHJlc3VsdC50YWtlKDEpIH1cblxuXHRcdFx0LyogcHJvY2VzcyBjYWxsYmFjayAqL1xuXHRcdFx0aWYgKGNhbGxiYWNrKSB7IHJlc3VsdCA9IHJlc3VsdC5vblZhbHVlKGNhbGxiYWNrKSB9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBQcm9jZXNzIHRoZSBhcmd1bWVudHMgYWNjZXB0ZWQgYnkge0BsaW5rIG9ufSBhbmQge0BsaW5rIG9uZX0uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0X2dhdGhlck9uQXJndW1lbnRzKC4uLmFyZ3MpIHtcblx0XHRcdHZhciByZXN1bHQgPSB7IG5hbWU6IGFyZ3Muc2hpZnQoKSB9O1xuXG5cdFx0XHQvKiB0ZXN0IGZvciBleHBlY3RlZCB2YWx1ZSBhcmd1bWVudCAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmICFVLmlzRnVuY3Rpb24oYXJnc1swXSkgJiYgIVUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuZXhwZWN0ZWRWYWx1ZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGVzdCBmb3Igb3B0aW9ucyAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmIFUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQub3B0aW9ucyA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGVzdCBmb3IgY2FsbGJhY2sgZnVuY3Rpb24gKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzRnVuY3Rpb24oYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdH0pO1xuXG5cblx0cmV0dXJuIEJhY29uU2lnbmFsSGFuZGxlcjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvYmFjb24tc2lnbmFsLWhhbmRsZXIuanNcbiAqKi8iLCJkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfbmV4dElkID0gMDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG5cdFx0cmV0dXJuIGAke3ByZWZpeHx8XCJ1bmlxdWUtaWRcIn0tJHtfbmV4dElkKyt9YDtcblx0fTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdkZWx0YS1qcycgXSwgZnVuY3Rpb24gKFAsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGFscmVhZHkgY2FjaGVkPyAqL1xuXHRpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwpIHsgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsIH1cblxuXG5cdC8qIHRlbGwgZGVsdGEuanMgYWJvdXQgYmx1ZWJpcmQgKi9cblx0RE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcblxuXG5cdC8qIHNldCB0aGUgY2FjaGUgKi9cblx0d2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgPSBuZXcgRE0oKTtcblxuXG5cdC8qIHJldHVybiB0aGUgZGVsdGEgbW9kZWwgdGhhdCBtYW5hZ2VzIGFsbCBwbHVnaW5zICg9IGRlbHRhcykgKi9cblx0cmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL25ld1dpZGdldFR5cGUuanMnLFxuXHQnLi9taXNjLmpzJyxcblx0Jy4vYmFjb24tc2lnbmFsLWhhbmRsZXIuanMnLFxuXHQnLi9kZWZlci5qcycsXG5cdCcuL21haW4tZGVsdGEtbW9kZWwuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgbmV3V2lkZ2V0VHlwZSwgVSwgU2lnbmFsSGFuZGxlciwgZGVmZXIsIGRtKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdGlmICghd2luZG93Ll9hbXlQbHVnaW4pIHtcblx0XHR3aW5kb3cuX2FteVBsdWdpbiA9IGZ1bmN0aW9uIChwbHVnaW5PclNlbGVjdGlvbikge1xuXHRcdFx0aWYgKCQuaXNQbGFpbk9iamVjdChwbHVnaW5PclNlbGVjdGlvbikpIHtcblxuXHRcdFx0XHQvKiB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW4gKi9cblx0XHRcdFx0cmV0dXJuIG5ldyBkbS5EZWx0YShwbHVnaW5PclNlbGVjdGlvbi5uYW1lLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0VS5hc3NlcnQoIV9zZWxlY3RlZERlZmVycmVkLmRvbmUsXG5cdFx0XHRcdFx0XHRgQXBpTkFUT01ZIHBsdWdpbnMgY2FuIG9ubHkgYmUgc2VsZWN0ZWQgb25jZSwgYWZ0ZXIgd2hpY2ggdGhleSBhcmUgZml4ZWQuYCk7XG5cdFx0XHRcdF9zZWxlY3RlZERlZmVycmVkLmRvbmUgPSB0cnVlO1xuXG5cdFx0XHRcdC8qIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHNlbGVjdCBwbHVnaW5zIHRvIGJlIGFwcGxpZWQgKi9cblx0XHRcdFx0ZG0uc2VsZWN0LmFwcGx5KGRtLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHRcdF9zZWxlY3RlZERlZmVycmVkLnJlc29sdmUodGhpcyk7XG5cblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkO1xuXG5cdFx0XHR9XG5cdFx0fTtcblx0XHR2YXIgX3NlbGVjdGVkRGVmZXJyZWQgPSBkZWZlcigpO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkID0gX3NlbGVjdGVkRGVmZXJyZWQucHJvbWlzZTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5ncmFwaCA9ICgpID0+IGRtLmdyYXBoKCk7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uZG0gPSBkbTtcblx0fVxuXG5cblx0cmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9wbHVnaW4uanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbiAoUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHZhciByZXNvbHZlLCByZWplY3Q7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcblx0XHRcdHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRyZWplY3QgPSBhcmd1bWVudHNbMV07XG5cdFx0fSk7XG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG5cdFx0XHRyZWplY3Q6IHJlamVjdCxcblx0XHRcdHByb21pc2U6IHByb21pc2Vcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvZGVmZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJywgJy4uL0FydGVmYWN0LmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBVLCBBcnRlZmFjdFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGFwaW5hdG9teSBjb21wb25lbnQgKHdpZGdldCkgICAgICAgICAgKi9cblx0LyogIGFzIGEgalF1ZXJ5IGVsZW1lbnQgcGx1Z2luOyB0aGlzIGlzIHJldHVybmVkIGZyb20gdGhlIG1vZHVsZSAgKi9cblx0ZnVuY3Rpb24gbmV3V2lkZ2V0VHlwZSh0eXBlTmFtZSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXG5cdFx0LyogdGhlIHNwZWNpZmljIHdpZGdldCBjbGFzcyAqL1xuXHRcdHZhciBXaWRnZXRQID0gQXJ0ZWZhY3RQLnRoZW4oKEFydGVmYWN0KSA9PiBBcnRlZmFjdC5uZXdTdWJjbGFzcyh0eXBlTmFtZSwgZnVuY3Rpb24gKHtjc3NDbGFzc30pIHtcblxuXHRcdFx0Lyogc2V0IHRoZSBlbGVtZW50IENTUyBjbGFzcyAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGNzc0NsYXNzKSkgeyB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoY3NzQ2xhc3MpIH1cblxuXHRcdFx0LyogaWYgdGhlIGpxdWVyeSBlbGVtZW50IGlzIHJlbW92ZWQsIGRlc3Ryb3kgdGhlIGFydGVmYWN0ICovXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXNFdmVudFN0cmVhbSgncmVtb3ZlJykub25WYWx1ZSgoKSA9PiB7IHRoaXMuZGVzdHJveSgpIH0pO1xuXG5cdFx0fSwge1xuXG5cdFx0XHRnZXQgbW9kZWwoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfSxcblxuXHRcdFx0Z2V0IGVsZW1lbnQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMuZWxlbWVudCB9XG5cblx0XHR9LCBVLmV4dGVuZCh7XG5cblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbjogUC5yZXNvbHZlKCkgLy8gZ3VhcmFudGVlIGFsbCB3aWRnZXQgY29uc3RydWN0aW9uIHRvIGJlIGFzeW5jaHJvbm91c1xuXG5cdFx0fSwgb3B0aW9uRGVmYXVsdHMpKSk7XG5cblx0XHQvKiBjcmVhdGUgYSBsb3dlcmNhc2UgbmFtZSBmb3IgdGhpcyB3aWRnZXQgdHlwZSAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gdHlwZU5hbWVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGVOYW1lLnNsaWNlKDEpO1xuXG5cdFx0LyogalF1ZXJ5IHBsdWdpbjogdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiAgKi9cblx0XHQkLmZuW2xvd2VyY2FzZU5hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuXHRcdFx0LyogaWYgdGhlIHdvcmQgJ2luc3RhbmNlJyBpcyBwYXNzZWQsIHJldHVybiB0aGUgKGFscmVhZHkgY3JlYXRlZCkgd2lkZ2V0IHByb21pc2UgKi9cblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWApIH1cblxuXHRcdFx0LyogZWxzZSwgY3JlYXRlIGEgbmV3IHdpZGdldCBhbmQgc2V0IGEgcHJvbWlzZSB0byBpdCAqL1xuXHRcdFx0dGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gLCBXaWRnZXRQXG5cdFx0XHRcdFx0LnRoZW4oKFdpZGdldCkgPT4gbmV3IFdpZGdldChVLmV4dGVuZChvcHRpb25zLCB7IGVsZW1lbnQ6IHRoaXMgfSkpLmNvbnN0cnVjdGVkKSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgalF1ZXJ5IGVsZW1lbnQgaW5zdGFuY2UsIGJ5IGpRdWVyeSBjb252ZW50aW9uICovXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0XHQvKiByZXR1cm4gYSBwcm9taXNlIHRvIHRoZSB3aWRnZXQgYXJ0ZWZhY3QgY2xhc3MgKi9cblx0XHRyZXR1cm4gV2lkZ2V0UDtcblxuXHR9XG5cblxuXHQvKiBleHBvc2UgdGhlIHdpZGdldCBjbGFzcyBjcmVhdG9yIGZ1bmN0aW9uICovXG5cdHJldHVybiBuZXdXaWRnZXRUeXBlO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9uZXdXaWRnZXRUeXBlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiVGhyZWVETW9kZWwuanMifQ==