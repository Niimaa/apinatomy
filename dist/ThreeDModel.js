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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(3), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Kefir, ArtefactP) {
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
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_ThreeDModel)) {
	      return window._amy_ThreeDModel;
	    }
	    var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel($__1) {
	      var $__2 = $__1,
	          rootThreeDModel = $__2.rootThreeDModel,
	          visible = $__2.visible,
	          file = $__2.file,
	          parts = $__2.parts;
	      var $__0 = this;
	      if (U.isUndefined(rootThreeDModel)) {
	        rootThreeDModel = this;
	      }
	      this.rootThreeDModel = rootThreeDModel;
	      this.newProperty('visible', {initial: visible});
	      this.newProperty('hidden').plug(this.p('visible').not());
	      this.p('visible').plug(this.p('hidden').not());
	      Object.keys(parts || {}).map((function(id) {
	        var newChildOptions = U.extend({}, parts[id], {
	          id: id,
	          parent: $__0,
	          visible: visible,
	          rootThreeDModel: $__0.rootThreeDModel
	        });
	        ['color', 'animation', 'clock'].forEach((function(prop) {
	          if (U.isUndefined(newChildOptions[prop])) {
	            newChildOptions[prop] = $__0.options[prop];
	          }
	        }));
	        new window._amy_ThreeDModel(newChildOptions);
	      }));
	      this.object3D.then((function(object3D) {
	        $__0.p('visible').merge($__0.on('destroy').mapTo(false)).onValue((function(visible) {
	          object3D.visible = visible;
	        }));
	      }));
	    }, {
	      get geometry3D() {
	        var $__0 = this;
	        if (!this._geometry3D) {
	          this._geometry3D = new P((function(resolve, reject) {
	            if (U.isDefined($__0.options.file)) {
	              $__0.rootThreeDModel.p('visible').value(true).take(1).onValue((function() {
	                $__0._loadGeometryFromFile().then(resolve, reject);
	              }));
	            } else {
	              resolve(null);
	            }
	          }));
	        }
	        return this._geometry3D;
	      },
	      get originalBoundingBox() {
	        var $__0 = this;
	        if (!this._originalBoundingBox) {
	          this._originalBoundingBox = new P((function(resolve, reject) {
	            if (U.isDefined($__0.options.file)) {
	              $__0.geometry3D.then((function(geometry) {
	                var boxFromFile = new THREE.Box3();
	                if (geometry instanceof THREE.BufferGeometry) {
	                  geometry.computeBoundingBox();
	                  boxFromFile.expandByPoint(geometry.boundingBox.min);
	                  boxFromFile.expandByPoint(geometry.boundingBox.max);
	                }
	                (geometry.morphTargets || []).concat([geometry]).forEach((function($__1) {
	                  var vertices = $__1.vertices;
	                  (vertices || []).forEach((function(point) {
	                    boxFromFile.expandByPoint(point);
	                  }));
	                }));
	                return boxFromFile;
	              })).then(resolve, reject);
	            } else if (U.isDefined($__0.options.parts)) {
	              P.all($__0.children).map((function(part) {
	                return part.originalBoundingBox;
	              })).reduce((function(result, bbox) {
	                return result.expandByPoint(bbox.min).expandByPoint(bbox.max);
	              }), new THREE.Box3()).then(resolve, reject);
	            }
	          }));
	        }
	        return this._originalBoundingBox;
	      },
	      get object3D() {
	        var $__0 = this;
	        if (!this._object3D) {
	          this._object3D = this.geometry3D.then((function(geometry3D) {
	            if (geometry3D) {
	              return $__0.rootThreeDModel.originalBoundingBox.then((function(originalBoundingBox) {
	                var correction = originalBoundingBox.center().negate();
	                var correctionMatrix = new THREE.Matrix4().setPosition(correction);
	                (geometry3D.morphTargets || []).forEach((function($__1) {
	                  var vertices = $__1.vertices;
	                  vertices.forEach((function(point) {
	                    point.applyMatrix4(correctionMatrix);
	                  }));
	                }));
	                geometry3D.applyMatrix(correctionMatrix);
	                var $__1 = $__0.options,
	                    animation = $__1.animation,
	                    color = $__1.color;
	                var material = new THREE.MeshLambertMaterial({color: color || 'white'});
	                material.side = THREE.DoubleSide;
	                var object;
	                if (animation) {
	                  object = new THREE.MorphAnimMesh(geometry3D, material);
	                  object.duration = animation.duration;
	                  material.morphTargets = true;
	                  geometry3D.computeMorphNormals();
	                  var clock = $__0.options.clock;
	                  var lastTime = 0;
	                  clock.takeUntilBy($__0.event('destroy')).onValue((function(time) {
	                    object.updateAnimation(1000 * (time - lastTime));
	                    lastTime = time;
	                  }));
	                } else {
	                  object = new THREE.Mesh(geometry3D, material);
	                }
	                return object;
	              }));
	            } else {
	              var object = new THREE.Object3D();
	              $__0.children.map((function(part) {
	                return part.object3D;
	              })).forEach((function(partObjectP) {
	                partObjectP.then((function(partObject) {
	                  object.add(partObject);
	                }));
	              }));
	              return P.all($__0.children.map((function(part) {
	                return part.object3D;
	              }))).each((function(subObject) {
	                object.add(subObject);
	              })).return(object);
	            }
	          }));
	        }
	        return this._object3D;
	      },
	      adaptToSurfaceArea: function(size) {
	        var $__0 = this;
	        U.assert(this.rootThreeDModel === this, "The 'adaptToSurfaceArea' method should only be called on a root ThreeDModel.");
	        P.all([this.object3D, this.originalBoundingBox]).spread((function(obj, boundingBox) {
	          var $__1;
	          var objWidth = boundingBox.size().x;
	          var objHeight = boundingBox.size().y;
	          if ((size.width < size.height) !== (objWidth < objHeight)) {
	            obj.rotation.z = 0.5 * Math.PI;
	            ($__1 = [objHeight, objWidth], objWidth = $__1[0], objHeight = $__1[1], $__1);
	          } else {
	            obj.rotation.z = 0;
	          }
	          var ratio = 0.8 * Math.min(size.width / objWidth, size.height / objHeight);
	          obj.scale.set(ratio, ratio, ratio);
	          var elevation = U.defOr($__0.options.elevation, Math.min(size.width, size.height) / 4);
	          obj.position.z = 0.5 * ratio * boundingBox.size().z + elevation;
	        }));
	      },
	      _loadGeometryFromFile: function() {
	        var file = this.options.file;
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
	        return U.promisify(new Loader(), 'load')(file).then((function(geometry) {
	          U.assert(isGeometry(geometry) || isObject3D(geometry), ("The 3D model loader for the '" + ext + "' extension returned an unsupported value."));
	          if (!isGeometry(geometry)) {
	            geometry = geometry.geometry || geometry.children[0].geometry;
	          }
	          return geometry;
	        }));
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, dm, plugin, defer) {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
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
	      var property = this._properties[name] = bus.toProperty(initial).skipDuplicates(isEqual);
	      property.plug = (function(observable) {
	        bus.plug(observable);
	        return property;
	      });
	      property.unplug = (function(observable) {
	        bus.unplug(observable);
	        return property;
	      });
	      property.get = (function() {
	        return property._current;
	      });
	      if (settable) {
	        property.set = (function(value) {
	          bus.emit(value);
	          return property;
	        });
	      }
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      property.run();
	      this.event('destroy').onValue((function() {
	        bus.end();
	      }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(16), __webpack_require__(4), __webpack_require__(10), __webpack_require__(14), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(6), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMDljNWQ3Yzc5ZjUyOWNlYzMwMSIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrZWZpci1qcXVlcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1zaWduYWwtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC91bmlxdWUtaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9uZXdXaWRnZXRUeXBlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLE1BQUksQ0FBRyxHQUFHLEdBQUcsTUFBSSxDQUFHLFVBQVE7QUFDM0MsY0FBVyxDQUFDO0FBSVosVUFBUyxXQUFTLENBQUUsRUFBRztBQUFFLFVBQU8sYUFBYSxNQUFJLFNBQVMsR0FBSyxhQUFhLE1BQUksZUFBZTtHQUFFO0FBQ2pHLFVBQVMsV0FBUyxDQUFFLEVBQUc7QUFBRSxVQUFP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QUFRLENBQUMsT0FBTSxDQUFHLEVBQUUsT0FBTSxNQUFNLENBQUUsQ0FBQyxDQUFDLFlBQVk7T0FBQSxFQUFDLENBQUMsQ0FBQztBQUdsRixZQUFPLEtBQUcsQ0FBQztLQUVaLENBQUM7QUFHRCxVQUFPLFFBQU0sQ0FBQztHQUVmO0FBSUEsUUFBTyxjQUFZLENBQUM7QUFHckIsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJrZWZpclwiLCBcInR3ZWVuanNcIiwgXCJrZWZpci1qcXVlcnlcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJUaHJlZURNb2RlbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiVGhyZWVETW9kZWxcIl0gPSBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJLZWZpclwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wia2VmaXItanF1ZXJ5XCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE1X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxMDljNWQ3Yzc5ZjUyOWNlYzMwMVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQndGhyZWUtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJyxcblx0Jy4vQXJ0ZWZhY3QuanMnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUsIFUsIFAsIEtlZmlyLCBBcnRlZmFjdFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogY29udmVuaWVuY2UgcHJlZGljYXRlIGZ1bmN0aW9ucyAqL1xuXHRmdW5jdGlvbiBpc0dlb21ldHJ5KHYpIHsgcmV0dXJuIHYgaW5zdGFuY2VvZiBUSFJFRS5HZW9tZXRyeSB8fCB2IGluc3RhbmNlb2YgVEhSRUUuQnVmZmVyR2VvbWV0cnkgfVxuXHRmdW5jdGlvbiBpc09iamVjdDNEKHYpIHsgcmV0dXJuIHYgaW5zdGFuY2VvZiBUSFJFRS5PYmplY3QzRCB9XG5cdGZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc3VmZml4KSB7IHJldHVybiBzdHIuaW5kZXhPZihzdWZmaXgsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTEgfVxuXG5cblx0Ly8vKiBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byB2aXNpdCBhbGwgZ2VvbWV0cmllcyBpbiBhbiBPYmplY3QzRCAqLyAvLyBUT0RPOiByZW1vdmUgb3IgdXNlP1xuXHQvL2Z1bmN0aW9uIHRyYXZlcnNlR2VvbWV0cmllcyhvYmosIGZuKSB7XG5cdC8vXHRvYmoudHJhdmVyc2UoKHN1Yk9iaikgPT4ge1xuXHQvL1x0XHRpZiAoVS5pc1VuZGVmaW5lZChzdWJPYmouZ2VvbWV0cnkpKSB7IHJldHVybiB9XG5cdC8vXHRcdGZuKHN1Yk9iai5nZW9tZXRyeSk7XG5cdC8vXHR9KTtcblx0Ly99XG5cdC8vZnVuY3Rpb24gdHJhdmVyc2VNZXNoZXMob2JqLCBmbikge1xuXHQvL1x0b2JqLnRyYXZlcnNlKChzdWJPYmopID0+IHtcblx0Ly9cdFx0aWYgKFUuaXNEZWZpbmVkKHN1Yk9iai5nZW9tZXRyeSkpIHsgZm4oc3ViT2JqKSB9XG5cdC8vXHR9KTtcblx0Ly99XG5cblxuXHQvKiBhIHByb21pc2UgdG8gdGhlIG5ldyBUaHJlZURNb2RlbCBjbGFzcyAqL1xuXHRyZXR1cm4gQXJ0ZWZhY3RQLnRoZW4oKEFydGVmYWN0KSA9PiB7XG5cblxuXHRcdC8qIGhvd2V2ZXIgKG9mdGVuKSB0aGlzIGlzIGxvYWRlZCwgY3JlYXRlIHRoZSBjbGFzcyBvbmx5IG9uY2UgKi9cblx0XHRpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfVGhyZWVETW9kZWwpKSB7IHJldHVybiB3aW5kb3cuX2FteV9UaHJlZURNb2RlbCB9XG5cblxuXHRcdC8qIGNyZWF0ZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgVGhyZWVETW9kZWwgPSB3aW5kb3cuX2FteV9UaHJlZURNb2RlbCA9IEFydGVmYWN0Lm5ld1N1YmNsYXNzKCdUaHJlZURNb2RlbCcsIGZ1bmN0aW9uIFRocmVlRE1vZGVsKHtyb290VGhyZWVETW9kZWwsIHZpc2libGUsIGZpbGUsIHBhcnRzfSkge1xuXG5cblx0XHRcdC8qIHdoYXQgaXMgdGhlICdyb290JyAzRCBtb2RlbD8gKi9cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHJvb3RUaHJlZURNb2RlbCkpIHsgcm9vdFRocmVlRE1vZGVsID0gdGhpcyB9XG5cdFx0XHR0aGlzLnJvb3RUaHJlZURNb2RlbCA9IHJvb3RUaHJlZURNb2RlbDtcblxuXG5cdFx0XHQvKiB0aGUgJ3Zpc2libGUnIGFuZCAnaGlkZGVuJyBwcm9wZXJ0aWVzICovXG5cdFx0XHR0aGlzLm5ld1Byb3BlcnR5KCd2aXNpYmxlJywgeyBpbml0aWFsOiB2aXNpYmxlIH0pO1xuXHRcdFx0dGhpcy5uZXdQcm9wZXJ0eSgnaGlkZGVuJykucGx1Zyh0aGlzLnAoJ3Zpc2libGUnKS5ub3QoKSk7XG5cdFx0XHR0aGlzLnAoJ3Zpc2libGUnKS5wbHVnKHRoaXMucCgnaGlkZGVuJykubm90KCkpO1xuXG5cblx0XHRcdC8qIGNyZWF0ZSBhbnkgVGhyZWVETW9kZWxzIHBhcnRzICh3aXRob3V0ICh5ZXQpIGxvYWRpbmcgdGhlaXIgb2JqZWN0M0QpICovXG5cdFx0XHRPYmplY3Qua2V5cyhwYXJ0c3x8IHt9KS5tYXAoKGlkKSA9PiB7XG5cblx0XHRcdFx0LyogZGVmaW5lIHRoZSBvcHRpb25zIHdlIHdhbnQgdG8gcGFzcyB0byB0aGUgY29ycmVzcG9uZGluZyBjaGlsZCBhcnRlZmFjdCAqL1xuXHRcdFx0XHR2YXIgbmV3Q2hpbGRPcHRpb25zID0gVS5leHRlbmQoe30sIHBhcnRzW2lkXSwge1xuXHRcdFx0XHRcdGlkOiAgICAgICAgICAgICAgaWQsXG5cdFx0XHRcdFx0cGFyZW50OiAgICAgICAgICB0aGlzLFxuXHRcdFx0XHRcdHZpc2libGU6ICAgICAgICAgdmlzaWJsZSxcblx0XHRcdFx0XHRyb290VGhyZWVETW9kZWw6IHRoaXMucm9vdFRocmVlRE1vZGVsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRbJ2NvbG9yJywgJ2FuaW1hdGlvbicsICdjbG9jayddLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChuZXdDaGlsZE9wdGlvbnNbcHJvcF0pKSB7XG5cdFx0XHRcdFx0XHRuZXdDaGlsZE9wdGlvbnNbcHJvcF0gPSB0aGlzLm9wdGlvbnNbcHJvcF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBjb25zdHJ1Y3QgdGhlIGNoaWxkIFRocmVlRE1vZGVsICovLy8ganNoaW50IC1XMDMxXG5cdFx0XHRcdG5ldyB3aW5kb3cuX2FteV9UaHJlZURNb2RlbChuZXdDaGlsZE9wdGlvbnMpO1xuXG5cdFx0XHR9KTtcblxuXG5cdFx0XHQvKiBtYW5pZmVzdCB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIG1vZGVsIG9uIHRoZSBvYmplY3QzRCAqL1xuXHRcdFx0dGhpcy5vYmplY3QzRC50aGVuKChvYmplY3QzRCkgPT4ge1xuXHRcdFx0XHR0aGlzLnAoJ3Zpc2libGUnKS5tZXJnZSh0aGlzLm9uKCdkZXN0cm95JykubWFwVG8oZmFsc2UpKVxuXHRcdFx0XHRcdC5vblZhbHVlKCh2aXNpYmxlKSA9PiB7IG9iamVjdDNELnZpc2libGUgPSB2aXNpYmxlIH0pO1xuXHRcdFx0fSk7XG5cblxuXHRcdH0sIHtcblxuXHRcdFx0Z2V0IGdlb21ldHJ5M0QoKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fZ2VvbWV0cnkzRCkge1xuXHRcdFx0XHRcdHRoaXMuX2dlb21ldHJ5M0QgPSBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5vcHRpb25zLmZpbGUpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucm9vdFRocmVlRE1vZGVsLnAoJ3Zpc2libGUnKS52YWx1ZSh0cnVlKS50YWtlKDEpLm9uVmFsdWUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0LyogcmVzb2x2ZSB0aGlzIHByb21pc2UgYnkgbG9hZGluZyB0aGUgcHJvcGVyIGZpbGUsIHdoZW4gdGhlIHJvb3QgbW9kZWwgZmlyc3QgYmVjb21lcyB2aXNpYmxlICovXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fbG9hZEdlb21ldHJ5RnJvbUZpbGUoKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvKiB0aGlzIFRocmVlRE1vZGVsIGhhcyBubyBnZW9tZXRyeSAqL1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzLl9nZW9tZXRyeTNEO1xuXHRcdFx0fSxcblxuXG5cdFx0XHRnZXQgb3JpZ2luYWxCb3VuZGluZ0JveCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9vcmlnaW5hbEJvdW5kaW5nQm94KSB7XG5cdFx0XHRcdFx0dGhpcy5fb3JpZ2luYWxCb3VuZGluZ0JveCA9IG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMuZmlsZSkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZW9tZXRyeTNELnRoZW4oKGdlb21ldHJ5KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGJveEZyb21GaWxlID0gbmV3IFRIUkVFLkJveDMoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Z2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRib3hGcm9tRmlsZS5leHBhbmRCeVBvaW50KGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1pbik7XG5cdFx0XHRcdFx0XHRcdFx0XHRib3hGcm9tRmlsZS5leHBhbmRCeVBvaW50KGdlb21ldHJ5LmJvdW5kaW5nQm94Lm1heCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdChnZW9tZXRyeS5tb3JwaFRhcmdldHMgfHwgW10pLmNvbmNhdChbZ2VvbWV0cnldKS5mb3JFYWNoKCh7dmVydGljZXN9KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHQodmVydGljZXMgfHwgW10pLmZvckVhY2goKHBvaW50KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJveEZyb21GaWxlLmV4cGFuZEJ5UG9pbnQocG9pbnQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGJveEZyb21GaWxlO1xuXHRcdFx0XHRcdFx0XHR9KS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKHRoaXMub3B0aW9ucy5wYXJ0cykpIHtcblx0XHRcdFx0XHRcdFx0UC5hbGwodGhpcy5jaGlsZHJlbikubWFwKHBhcnQgPT4gcGFydC5vcmlnaW5hbEJvdW5kaW5nQm94KS5yZWR1Y2UoKHJlc3VsdCwgYmJveCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQuZXhwYW5kQnlQb2ludChiYm94Lm1pbikuZXhwYW5kQnlQb2ludChiYm94Lm1heCk7XG5cdFx0XHRcdFx0XHRcdH0sIG5ldyBUSFJFRS5Cb3gzKCkpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fb3JpZ2luYWxCb3VuZGluZ0JveDtcblx0XHRcdH0sXG5cblxuXHRcdFx0Z2V0IG9iamVjdDNEKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX29iamVjdDNEKSB7XG5cdFx0XHRcdFx0dGhpcy5fb2JqZWN0M0QgPSB0aGlzLmdlb21ldHJ5M0QudGhlbigoZ2VvbWV0cnkzRCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRpZiAoZ2VvbWV0cnkzRCkgeyAvLyB3ZSBoYXZlIGxvYWRlZCBhIGZpbGVcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5yb290VGhyZWVETW9kZWwub3JpZ2luYWxCb3VuZGluZ0JveC50aGVuKChvcmlnaW5hbEJvdW5kaW5nQm94KSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHQvKiBjZW50ZXIgdGhlIGdlb21ldHJ5IGJhc2VkIG9uIHRoZSByb290IG1vZGVsJ3MgYm91bmRpbmcgYm94ICovXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNvcnJlY3Rpb24gPSBvcmlnaW5hbEJvdW5kaW5nQm94LmNlbnRlcigpLm5lZ2F0ZSgpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjb3JyZWN0aW9uTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5zZXRQb3NpdGlvbihjb3JyZWN0aW9uKTtcblx0XHRcdFx0XHRcdFx0XHQoZ2VvbWV0cnkzRC5tb3JwaFRhcmdldHMgfHwgW10pLmZvckVhY2goKHt2ZXJ0aWNlc30pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdHZlcnRpY2VzLmZvckVhY2goKHBvaW50KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBvaW50LmFwcGx5TWF0cml4NChjb3JyZWN0aW9uTWF0cml4KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdGdlb21ldHJ5M0QuYXBwbHlNYXRyaXgoY29ycmVjdGlvbk1hdHJpeCk7XG5cblx0XHRcdFx0XHRcdFx0XHQvKiBjcmVhdGUgbWF0ZXJpYWwgKi9cblx0XHRcdFx0XHRcdFx0XHR2YXIge2FuaW1hdGlvbiwgY29sb3J9ID0gdGhpcy5vcHRpb25zO1xuXHRcdFx0XHRcdFx0XHRcdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IGNvbG9yIHx8ICd3aGl0ZScgfSk7XG5cdFx0XHRcdFx0XHRcdFx0bWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG5cblx0XHRcdFx0XHRcdFx0XHQvKiBjcmVhdGUgdGhlIG9iamVjdDNELCBlaXRoZXIgYW5pbWF0ZWQgb3Igbm90ICovXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG9iamVjdDtcblx0XHRcdFx0XHRcdFx0XHRpZiAoYW5pbWF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvKiBjcmVhdGUgYSBtZXNoIHRoYXQgY2FuIGJlIGFuaW1hdGVkICovXG5cdFx0XHRcdFx0XHRcdFx0XHRvYmplY3QgPSBuZXcgVEhSRUUuTW9ycGhBbmltTWVzaChnZW9tZXRyeTNELCBtYXRlcmlhbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRvYmplY3QuZHVyYXRpb24gPSBhbmltYXRpb24uZHVyYXRpb247XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXRlcmlhbC5tb3JwaFRhcmdldHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0Z2VvbWV0cnkzRC5jb21wdXRlTW9ycGhOb3JtYWxzKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8qIHN1YnNjcmliZSB0byB0aGUgY2xvY2sgKi9cblx0XHRcdFx0XHRcdFx0XHRcdHZhciB7Y2xvY2t9ID0gdGhpcy5vcHRpb25zO1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGxhc3RUaW1lID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdGNsb2NrLnRha2VVbnRpbEJ5KHRoaXMuZXZlbnQoJ2Rlc3Ryb3knKSkub25WYWx1ZSgodGltZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvYmplY3QudXBkYXRlQW5pbWF0aW9uKDEwMDAgKiAodGltZSAtIGxhc3RUaW1lKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhc3RUaW1lID0gdGltZTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvKiBzaW1wbGUsIHN0YXRpYyBtZXNoICovXG5cdFx0XHRcdFx0XHRcdFx0XHRvYmplY3QgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeTNELCBtYXRlcmlhbCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIHRoaXMgaXMgYSBncm91cCB3aXRoIHBhcnRzXG5cblx0XHRcdFx0XHRcdFx0LyogY3JlYXRlIGJhc2Ugb2JqZWN0M0QgZm9yIG1vZGVsIHBhcnRzICovXG5cdFx0XHRcdFx0XHRcdHZhciBvYmplY3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblxuXHRcdFx0XHRcdFx0XHQvKiB3aGVuZXZlciBlYWNoIHBhcnQgaXMgbG9hZGVkLCBhZGQgdGhlbSBhcyBhIGNoaWxkIG9mIHRoZSBiYXNlIG9iamVjdCAqL1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuLm1hcCgocGFydCkgPT4gcGFydC5vYmplY3QzRCkuZm9yRWFjaCgocGFydE9iamVjdFApID0+IHtcblx0XHRcdFx0XHRcdFx0XHRwYXJ0T2JqZWN0UC50aGVuKChwYXJ0T2JqZWN0KSA9PiB7IG9iamVjdC5hZGQocGFydE9iamVjdCkgfSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRcdC8qIHJlc29sdmUgdGhpcyBwcm9taXNlIHdpdGggdGhlIGJhc2Ugb2JqZWN0ICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBQLmFsbCh0aGlzLmNoaWxkcmVuLm1hcCgocGFydCkgPT4gcGFydC5vYmplY3QzRCkpLmVhY2goKHN1Yk9iamVjdCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdG9iamVjdC5hZGQoc3ViT2JqZWN0KTtcblx0XHRcdFx0XHRcdFx0fSkucmV0dXJuKG9iamVjdCk7XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vYmplY3QzRDtcblx0XHRcdH0sXG5cblxuXHRcdFx0YWRhcHRUb1N1cmZhY2VBcmVhKHNpemUpIHtcblxuXHRcdFx0XHRVLmFzc2VydCh0aGlzLnJvb3RUaHJlZURNb2RlbCA9PT0gdGhpcyxcblx0XHRcdFx0XHRgVGhlICdhZGFwdFRvU3VyZmFjZUFyZWEnIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSByb290IFRocmVlRE1vZGVsLmApO1xuXG5cdFx0XHRcdFAuYWxsKFt0aGlzLm9iamVjdDNELCB0aGlzLm9yaWdpbmFsQm91bmRpbmdCb3hdKS5zcHJlYWQoKG9iaiwgYm91bmRpbmdCb3gpID0+IHtcblx0XHRcdFx0XHQvKiBhYmJyZXZpYXRlIDNELW9iamVjdCB3aWR0aCBhbmQgaGVpZ2h0ICovXG5cdFx0XHRcdFx0dmFyIG9ialdpZHRoID0gYm91bmRpbmdCb3guc2l6ZSgpLng7XG5cdFx0XHRcdFx0dmFyIG9iakhlaWdodCA9IGJvdW5kaW5nQm94LnNpemUoKS55O1xuXG5cdFx0XHRcdFx0Lyogcm90YXRlIDkwwrAgb24gdGhlIHotYXhpcyBpZiB0aGlzIGdpdmVzIGEgYmV0dGVyIGZpdCAqL1xuXHRcdFx0XHRcdGlmICgoc2l6ZS53aWR0aCA8IHNpemUuaGVpZ2h0KSAhPT0gKG9ialdpZHRoIDwgb2JqSGVpZ2h0KSkge1xuXHRcdFx0XHRcdFx0b2JqLnJvdGF0aW9uLnogPSAwLjUgKiBNYXRoLlBJO1xuXHRcdFx0XHRcdFx0W29ialdpZHRoLCBvYmpIZWlnaHRdID0gW29iakhlaWdodCwgb2JqV2lkdGhdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvYmoucm90YXRpb24ueiA9IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogZGV0ZXJtaW5lIHRoZSBzY2FsZSByYXRpbyAqL1xuXHRcdFx0XHRcdHZhciByYXRpbyA9IDAuOCAqIE1hdGgubWluKHNpemUud2lkdGggLyBvYmpXaWR0aCwgc2l6ZS5oZWlnaHQgLyBvYmpIZWlnaHQpO1xuXG5cdFx0XHRcdFx0LyogYWRqdXN0IHNpemUgKi9cblx0XHRcdFx0XHRvYmouc2NhbGUuc2V0KHJhdGlvLCByYXRpbywgcmF0aW8pO1xuXG5cdFx0XHRcdFx0LyogYW55IGN1c3RvbSAnZWxldmF0aW9uJyAqL1xuXHRcdFx0XHRcdHZhciBlbGV2YXRpb24gPSBVLmRlZk9yKHRoaXMub3B0aW9ucy5lbGV2YXRpb24sIE1hdGgubWluKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KSAvIDQpO1xuXHRcdFx0XHRcdG9iai5wb3NpdGlvbi56ID0gMC41ICogcmF0aW8gKiBib3VuZGluZ0JveC5zaXplKCkueiArIGVsZXZhdGlvbjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sXG5cblxuXHRcdFx0X2xvYWRHZW9tZXRyeUZyb21GaWxlKCkge1xuXG5cdFx0XHRcdC8qIHNlbGVjdCB0aGUgbG9uZ2VzdCBleHRlbnNpb24gdGhhdCBmaXRzIHRoZSBmaWxlbmFtZSAqL1xuXHRcdFx0XHQvLyBlLmcuLCBcInBvaW50cy5qc29uXCIgaGFzIHByaW9yaXR5IG92ZXIgXCJqc29uXCJcblx0XHRcdFx0dmFyIHtmaWxlfSA9IHRoaXMub3B0aW9ucztcblx0XHRcdFx0dmFyIGV4dCA9ICcnO1xuXHRcdFx0XHRPYmplY3Qua2V5cygkLmNpcmN1aXRib2FyZC5DaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMpLmZvckVhY2goKGV4dGVuc2lvbikgPT4ge1xuXHRcdFx0XHRcdGlmIChleHRlbnNpb24ubGVuZ3RoID4gZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0aWYgKGVuZHNXaXRoKGZpbGUsIGAuJHtleHRlbnNpb259YCkpIHtcblx0XHRcdFx0XHRcdFx0ZXh0ID0gZXh0ZW5zaW9uO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Lyogd2FzIGFuIGV4dGVuc2lvbiBmb3VuZD8gKi9cblx0XHRcdFx0VS5hc3NlcnQoZXh0Lmxlbmd0aCA+IDAsIGBUaGUgZmlsZSAnJHtmaWxlfScgaXMgbm90IHJlY29nbml6ZWQgYXMgYSAzRCBtb2RlbC5gKTtcblxuXHRcdFx0XHQvKiBmZXRjaCB0aGUgbG9hZGVyIGZvciB0aGF0IGZpbGUgZXh0ZW5zaW9uICovXG5cdFx0XHRcdHZhciBMb2FkZXIgPSAkLmNpcmN1aXRib2FyZC5DaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnNbZXh0XTtcblxuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sgKi9cblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQoTG9hZGVyKSwgYFNvbWV0aGluZyB3ZW50IHdyb25nIHJldHJpZXZpbmcgdGhlIDNEIG1vZGVsIGxvYWRlci5gKTtcblxuXHRcdFx0XHQvKiByZXR1cm4gYSBwcm9taXNlIHRvIHRoZSAzRCBvYmplY3QgKi9cblx0XHRcdFx0cmV0dXJuIFUucHJvbWlzaWZ5KG5ldyBMb2FkZXIoKSwgJ2xvYWQnKShmaWxlKS50aGVuKChnZW9tZXRyeSkgPT4ge1xuXG5cdFx0XHRcdFx0LyogZm9yIG5vdywgd2Ugb25seSBhY2NlcHQgR2VvbWV0cnkncyBhbmQgT2JqZWN0M0QncyBmcm9tIGEgbG9hZGVyICovXG5cdFx0XHRcdFx0VS5hc3NlcnQoaXNHZW9tZXRyeShnZW9tZXRyeSkgfHwgaXNPYmplY3QzRChnZW9tZXRyeSksXG5cdFx0XHRcdFx0XHRgVGhlIDNEIG1vZGVsIGxvYWRlciBmb3IgdGhlICcke2V4dH0nIGV4dGVuc2lvbiByZXR1cm5lZCBhbiB1bnN1cHBvcnRlZCB2YWx1ZS5gKTtcblxuXHRcdFx0XHRcdC8qIGlmIGFuIE9iamVjdDNEIGlzIHJldHVybmVkLCB0YWtlIG9ubHkgaXRzIGdlb21ldHJ5ICovXG5cdFx0XHRcdFx0aWYgKCFpc0dlb21ldHJ5KGdlb21ldHJ5KSkgeyBnZW9tZXRyeSA9IGdlb21ldHJ5Lmdlb21ldHJ5IHx8IGdlb21ldHJ5LmNoaWxkcmVuWzBdLmdlb21ldHJ5IH1cblxuXHRcdFx0XHRcdC8qIHJldHVybiB0aGUgb2JqZWN0ICovXG5cdFx0XHRcdFx0cmV0dXJuIGdlb21ldHJ5O1xuXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXG5cdFx0XHQvLyBVTkNPTU1FTlQgVEhJUyBGT1IgSEVMUCBERUJVR0dJTkcgT0JKRUNUIFBMQUNFTUVOVFxuXHRcdFx0Ly9fc2hvd1Zpc2libGVCb3VuZGluZ0JveCgpIHtcblx0XHRcdC8vXHRpZiAodGhpcy5yb290VGhyZWVETW9kZWwgPT09IHRoaXMpIHtcblx0XHRcdC8vXHRcdHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKTtcblx0XHRcdC8vXHRcdHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDAwZmYwMCwgd2lyZWZyYW1lOiB0cnVlIH0pO1xuXHRcdFx0Ly9cdFx0dmFyIGJveCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG5cdFx0XHQvL1x0XHR0aGlzLm9iamVjdDNELnRoZW4oKG9iamVjdDNEKSA9PiB7IG9iamVjdDNELmFkZChib3gpIH0pO1xuXHRcdFx0Ly9cdFx0dGhpcy5vcmlnaW5hbEJvdW5kaW5nQm94LnRoZW4oKGJiKSA9PiB7XG5cdFx0XHQvL1x0XHRcdGlmIChiYi5lbXB0eSgpKSB7IHJldHVybiB9XG5cdFx0XHQvL1x0XHRcdGJveC5wb3NpdGlvbi54ID0gMC41ICogKGJiLm1heC54ICsgYmIubWluLngpO1xuXHRcdFx0Ly9cdFx0XHRib3gucG9zaXRpb24ueSA9IDAuNSAqIChiYi5tYXgueSArIGJiLm1pbi55KTtcblx0XHRcdC8vXHRcdFx0Ym94LnBvc2l0aW9uLnogPSAwLjUgKiAoYmIubWF4LnogKyBiYi5taW4ueik7XG5cdFx0XHQvL1x0XHRcdGJveC5zY2FsZS54ID0gKGJiLm1heC54IC0gYmIubWluLngpO1xuXHRcdFx0Ly9cdFx0XHRib3guc2NhbGUueSA9IChiYi5tYXgueSAtIGJiLm1pbi55KTtcblx0XHRcdC8vXHRcdFx0Ym94LnNjYWxlLnogPSAoYmIubWF4LnogLSBiYi5taW4ueik7XG5cdFx0XHQvL1x0XHR9KTtcblx0XHRcdC8vXHR9XG5cdFx0XHQvL30sXG5cblxuXHRcdH0sIHtcblxuXHRcdFx0dmlzaWJsZTogZmFsc2VcblxuXHRcdH0pO1xuXG5cblx0XHQvKiBzdGF0aWMgbG9jYXRpb24gdG8gY29sbGVjdCB0aHJlZS5qcyBsb2FkZXJzIGZvciBkaWZmZXJlbnQgZmlsZSBmb3JtYXRzICovXG5cdFx0Ly8gVE9ETzogdHJhbnNmZXIgdGhpcyB0YXNrIGZyb20gQ2lyY3VpdGJvYXJkIHRvIGhlcmUsIGV2ZXJ5d2hlcmUgaW4gdGhlIGNvZGVcblx0XHR3aW5kb3cuX2FteV9UaHJlZURNb2RlbC5sb2FkZXJzID0ge307XG5cblxuXHRcdHJldHVybiB3aW5kb3cuX2FteV9UaHJlZURNb2RlbDtcblxuXG5cdH0pLnRhcCgoYykgPT4geyAkLmNpcmN1aXRib2FyZC5UaHJlZURNb2RlbCA9IGMgfSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UaHJlZURNb2RlbC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBLZWZpciwgVFdFRU4pIHtcblxuXHQvKiBLZWZpciBqUXVlcnkgcGx1Z2luICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFx0cmVxdWlyZSgna2VmaXItanF1ZXJ5JykuaW5pdChLZWZpciwgJCk7XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcblx0XHRcdHJldHVybiAoKSA9PiB7IG9iai5vbihldmVudE5hbWUsIG51bGwpIH07XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcblx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcblx0XHRcdHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcblx0XHRcdCgoZikgPT4geyB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApIH0pO1xuXHRLZWZpci5hbmltYXRpb25GcmFtZXMgPSBmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHQoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKCgpID0+IHtcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoKTtcblx0XHRcdFx0XHRpZiAoc3Vic2NyaWJlZCkgeyBpdGVyYXRpb25GbigpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0cmV0dXJuICgpID0+IHsgc3Vic2NyaWJlZCA9IGZhbHNlIH07XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwge2R1cmF0aW9uLCBkZWxheSwgZWFzaW5nfSkge1xuXG5cdFx0LyogdGhlIHR3ZWVuICovXG5cdFx0dmFyIHR3ID0gbmV3IFRXRUVOLlR3ZWVuKG9ialN0YXJ0KS50byhvYmpFbmQsIGR1cmF0aW9uKTtcblxuXHRcdC8qIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHR2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBlbWl0dGVyLmVtaXQodGhpcykgfSk7XG5cdFx0XHR0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcblx0XHR9KSk7XG5cblx0XHQvKiBhZGRpbmcgdHdlZW4tc3BlY2lmaWMgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0YnVzLnR3ZWVuID0gdHc7XG5cdFx0YnVzLnN0YXJ0ID0gKCkgPT4ge1xuXHRcdFx0dHcuc3RhcnQoKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblx0XHRidXMuY2hhaW4gPSAob3RoZXIpID0+IHtcblx0XHRcdGFkZFN0cmVhbShvdGhlcik7XG5cdFx0XHR0dy5jaGFpbihvdGhlci50d2Vlbik7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cblx0XHQvKiByZXR1cm5pbmcgdGhlIGJ1cyAqL1xuXHRcdHJldHVybiBidXM7XG5cblx0fTtcblxuXG5cdEtlZmlyLmtleVByZXNzID0gZnVuY3Rpb24ga2V5UHJlc3Moa2V5Q29kZSkge1xuXHRcdHJldHVybiAkKHdpbmRvdykuYXNLZWZpclN0cmVhbSgna2V5cHJlc3MnKS5maWx0ZXIoKGUpID0+IGUua2V5Q29kZSA9PT0ga2V5Q29kZSk7XG5cdH07XG5cblxuXHRLZWZpci5vbmNlID0gZnVuY3Rpb24gb25jZSh2YWx1ZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRlbWl0dGVyLmVtaXQodmFsdWUpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0XHQvL3JldHVybiBLZWZpci5jb25zdGFudCh2YWx1ZSk7IC8vIFRPRE86IHJlcGxhY2UgYWxsICdvbmNlJyBjYWxscyB3aXRoICdjb25zdGFudCcgY2FsbHM7IHRoZW4gcmVtb3ZlICdvbmNlJ1xuXHR9O1xuXG5cblx0S2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcblx0XHRcdGVtaXR0ZXIuZW5kKCk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBjb252ZXJ0ZXJzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gVGhpcyBjcmVhdGVzIGEgJ3dpbmRvdyBvZiBvcHBvcnR1bml0eScgdG8gbGltaXQgb3RoZXIgc3RyZWFtcyBieS5cblx0Ly8gVGhpcyB3aW5kb3cgaXMgcHJvdmlkZWQgYnkgdGhlIGBwYWNpbmdgIG9ic2VydmFibGUuIEFuIG9wdGlvbmFsIGBoYW5kbGVyYFxuXHQvLyBwYXJhbWV0ZXIgY2FuIGJlIGdpdmVuIHRvIGRvIHNvbWUgc2V0dXAgYW5kIHNvbWUgYnJlYWtkb3duLiBJdCBpcyBwYXNzZWQgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudFxuXHQvLyB0aGF0IHNob3VsZCBiZSBjYWxsZWQgKm9uY2UqIGluIHRoZSBwbGFjZSB3aGVyZSBvdGhlciBzdHJlYW1zIGNhbiBkbyB0aGVpclxuXHQvLyB0aGluZy4gSXQgcmV0dXJucyBhIGZ1bmN0aW9uIHVzZWQgdG8gd3JhcCBvdGhlciBzdHJlYW1zLiBJdCBkb2VzIG5vdFxuXHQvLyByZXR1cm4gYSBzdHJlYW0uXG5cdEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZywgaGFuZGxlciA9IFUuY2FsbCkge1xuXHRcdHZhciB3YW50ZWRCdXMgPSBLZWZpci5idXMoKTtcblx0XHR2YXIgb3BlbiA9ICAgICAgS2VmaXIuYnVzKCk7XG5cdFx0dmFyIGNsb3NlID0gICAgIEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogdGFrZXMgJ3RoaXMnIHN0cmVhbSBhcyBwYWNpbmcgZm9yIGEgd2luZG93IG9mIG9wcG9ydHVuaXR5IGZvciBvdGhlciBzdHJlYW1zICovXG5cdFx0cGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRoYW5kbGVyKCgpID0+IHtcblx0XHRcdFx0b3Blbi5lbWl0KCk7XG5cdFx0XHRcdHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcblx0XHRcdFx0Y2xvc2UuZW1pdCgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gd3JhcCBhIHN0cmVhbSBpbiB0aGlzIHdyYXBwZXIgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwge2J1ZmZlcn0gPSB7fSkge1xuXHRcdFx0d2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcblx0XHRcdHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoKSA9PiB7XG5cdFx0XHRcdHZhciBhY2N1bXVsYXRvciA9IChhcnIsIHZhbCkgPT4gKGJ1ZmZlciA/IGFyci5jb25jYXQoW3ZhbF0pIDogW3ZhbF0pO1xuXHRcdFx0XHRyZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS5ob2xkVW50aWwgPSBmdW5jdGlvbiBob2xkVW50aWwocGFjaW5nKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdHZhciBidWZmZXIgPSBbXTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvVGhpcyA9IHRoaXMub25WYWx1ZSgodmFsdWUpID0+IHtcblx0XHRcdFx0YnVmZmVyLnB1c2godmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9UaGlzKCk7XG5cdFx0XHRcdHVuc3Vic2NyaWJlVG9QYWNpbmcoKTtcblx0XHRcdFx0YnVmZmVyID0gbnVsbDtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBmaWx0ZXJzIGFuIG9ic2VydmFibGUgdG8gb25seSBsZXQgdGhyb3VnaCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLlxuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29tcGFyYXRvcikge1xuXHRcdGNvbXBhcmF0b3IgPSBjb21wYXJhdG9yIHx8ICgoZSkgPT4gZSA9PT0gdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuXHR9O1xuXG5cdC8vIFRoaXMgbWFrZXMgYSBzdWJzY3JpcHRpb24gdG8gYW4gb2JzZXJ2YWJsZSB0aGF0IGRvZXNuJ3QgZG8gYW55dGhpbmdcblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkb05vdGhpbmcgPSAoKT0+e307XG5cdFx0dGhpcy5vblZhbHVlKGRvTm90aGluZyk7XG5cdFx0cmV0dXJuICgpID0+IHsgdGhpcy5vZmZWYWx1ZShkb05vdGhpbmcpIH07XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIChsYWJlbCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZXZlbnQpID0+IHtcblx0XHRcdHJldHVybiAhVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdO1xuXHRcdH0pLm1hcCgoZXZlbnQpID0+IHtcblx0XHRcdFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmlsdGVyIGV2ZW50cyB0byBvbmx5IGNlcnRhaW4ga2V5cyAvIGJ1dHRvbnMuIENhbiBiZSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBvciBzaW5nbGUgbnVtYmVyLlxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24gKGJ1dHRvbklkKSB7XG5cdFx0dmFyIHByZWQgPSAodHlwZW9mIGJ1dHRvbklkID09PSAnZnVuY3Rpb24nKSA/IChidXR0b25JZCkgOiAoYiA9PiBiID09PSBidXR0b25JZCk7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChlKSA9PiBwcmVkKGUud2hpY2gpKTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7IC8vIFRPRE86IGRvbid0IHVzZSAnZmlsdGVyJywgYnV0IHNvbWV0aGluZyBsaWtlICdza2lwVW50aWwnIG9yICdmbGF0TWFwJ1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHJlYW1cblx0XHRcdFx0XHQudGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbEJ5KHVudGlsU3RyZWFtKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdCQuZm4ubW91c2VXaGVlbCA9IGZ1bmN0aW9uIG1vdXNlV2hlZWwoKSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpO1xuXHR9O1xuXG5cblx0cmV0dXJuIEtlZmlyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qc1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzJyxcblx0Jy4vdXRpbC91bmlxdWUtaWQuanMnLFxuXHQnLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMnLFxuXHQnLi91dGlsL3BsdWdpbi5qcycsXG5cdCcuL3V0aWwvZGVmZXIuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgS2VmaXJTaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0sIHBsdWdpbiwgZGVmZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0cmV0dXJuIHBsdWdpbi5zZWxlY3RlZC50aGVuKCgpID0+IHtcblxuXG5cdFx0LyogaG93ZXZlciAob2Z0ZW4pIHRoaXMgaXMgbG9hZGVkLCBjcmVhdGUgdGhlIGNsYXNzIG9ubHkgb25jZSAqL1xuXHRcdGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9BcnRlZmFjdCkpIHsgcmV0dXJuIHdpbmRvdy5fYW15X0FydGVmYWN0IH1cblxuXG5cdFx0LyoqIHtAZXhwb3J0IEBjbGFzcyBBcnRlZmFjdCBAZXh0ZW5kcyBLZWZpclNpZ25hbEhhbmRsZXJ9XG5cdFx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0XHQgKiBldmVudHMgYW5kIG9ic2VydmFibGUgcHJvcGVydGllcyB0aHJvdWdoIEtlZmlyLmpzLlxuXHRcdCAqXG5cdFx0ICogVXNlcnMgY2FuIHBhc3MgYSBwcm9taXNlIHRocm91Z2ggdGhlICdiZWZvcmVDb25zdHJ1Y3Rpb24nIG9wdGlvbi4gSWYgZG9uZSwgdGhlXG5cdFx0ICogYXJ0ZWZhY3Qgd2FpdHMgb24gdGhhdCBwcm9taXNlIGJlZm9yZSBjYWxsaW5nIGl0cyAnY29uc3RydWN0JyBtZXRob2QuXG5cdFx0ICogU2ltaWxhcmx5LCB1c2VycyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBjbGFzcyBzaG91bGQgdGVzdCB0aGUgJ2NvbnN0cnVjdGVkJyBwcm9wZXJ0eS5cblx0XHQgKiBJZiBpdCBpcyBkZWZpbmVkLCBpdCBpcyBhIHByb21pc2UgdGhhdCBoYXMgdG8gYmUgd2FpdGVkIGZvci5cblx0XHQgKiBJZiBub3QsIHRoZSBvYmplY3QgaW5zdGFuY2UgY2FuIGJlIHVzZWQgc3luY2hyb25vdXNseSBhZnRlciBjb25zdHJ1Y3Rpb24uXG5cdFx0ICovXG5cdFx0d2luZG93Ll9hbXlfQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEtlZmlyU2lnbmFsSGFuZGxlciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFydGVmYWN0KG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdFx0dGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHR2YXIge2lkLCB0eXBlLCBwYXJlbnQsIGJlZm9yZUNvbnN0cnVjdGlvbn0gPSBvcHRpb25zO1xuXG5cdFx0XHQvKiBzZXQgaGllcmFyY2h5IHN0dWZmICovXG5cdFx0XHR0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuXHRcdFx0dGhpcy5fdHlwZSA9IHR5cGU7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHRcdFx0aWYgKHBhcmVudCkgeyBVLmFycmF5KHBhcmVudCwgJ19jaGlsZHJlbicpLnB1c2godGhpcykgfVxuXG5cdFx0XHQvKiBjcmVhdGUgZXZlbnRzICovXG5cdFx0XHR0aGlzLm5ld0V2ZW50KCdkZXN0cm95Jyk7XG5cblx0XHRcdC8qIHBvc3NpYmx5IHdhaXQgZm9yIHNvbWV0aGluZyBiZWZvcmUgY29uc3RydWN0aW9uIChsaWtlIHBsdWdpbnMpPyAqL1xuXHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24oYmVmb3JlQ29uc3RydWN0aW9uKTtcblxuXHRcdFx0LyogZ2l2ZSB0aGUgcm9vdCBhcnRlZmFjdCBhIHdheSB0byByZWdpc3RlciBvdGhlciBhcnRlZmFjdHMgYnkgSUQgKi9cblx0XHRcdGlmICh0aGlzLnJvb3QgPT09IHRoaXMpIHtcblx0XHRcdFx0dGhpcy5fYXJ0ZWZhY3RzQnlJRCA9IHt9O1xuXHRcdFx0XHR0aGlzLl9yZWdpc3RlckFydGVmYWN0ID0gZnVuY3Rpb24gKGFydGVmYWN0KSB7XG5cdFx0XHRcdFx0VS5nZXREZWYodGhpcy5fYXJ0ZWZhY3RzQnlJRCwgYXJ0ZWZhY3QuaWQsIGRlZmVyKS5yZXNvbHZlKGFydGVmYWN0KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdH0sIC8qKiBAbGVuZHMgQXJ0ZWZhY3QucHJvdG90eXBlICovIHtcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQWxsb3cgYSBwcm9taXNlIHRvIGJlIGluc2VydGVkIG9uIHdoaWNoIHRoZSByZXN0IG9mIGNvbnN0cnVjdGlvbiBzaG91bGQgd2FpdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gcG9zc2libGVQcm9taXNlIHsqfSAgLSBhIHZhbHVlIHRoYXQgbWlnaHQgYmUgYSBwcm9taXNlXG5cdFx0XHQgKi9cblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbihwb3NzaWJsZVByb21pc2UpIHtcblxuXHRcdFx0XHQvKiBpZiBubyBwcm9taXNlIGlzIHBhc3NlZCBpbiwgaWdub3JlLCB0byBrZWVwIGNvbnN0cnVjdGlvbiBzeW5jaHJvbm91cyAqL1xuXHRcdFx0XHRpZiAoIXBvc3NpYmxlUHJvbWlzZSB8fCAhJC5pc0Z1bmN0aW9uKHBvc3NpYmxlUHJvbWlzZS50aGVuKSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHByb21pc2UgcGFzc2VkIGluLCBpbml0aWFsaXplICd0aGlzLmNvbnN0cnVjdGVkJyAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuY29uc3RydWN0ZWQpIHsgdGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSh0aGlzKSB9XG5cblx0XHRcdFx0LyogaW5zZXJ0IHRoZSBuZXcgcHJvbWlzZSBpbnRvIHRoZSBjaGFpbiBmb3IgJ3RoaXMuY29uc3RydWN0ZWQnIHJlc29sdXRpb24gKi9cblx0XHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWQudGFwKCgpID0+IFAucmVzb2x2ZShwb3NzaWJsZVByb21pc2UpKTtcblxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7T2JqZWN0fSAtIHRoZSBvcHRpb25zIHByb3ZpZGVkIHRocm91Z2ggdGhlIGNvbnN0cnVjdG9yXG5cdFx0XHQgKi9cblx0XHRcdGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9ucyB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gdGhlIHVuaXF1ZSBpZGVudGlmaWVyIGJlbG9uZ2luZyB0byB0aGlzIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdHlwZSBvZiB0aGlzIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdGdldCB0eXBlKCkgeyByZXR1cm4gdGhpcy5fdHlwZSB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnRlZmFjdHx1bmRlZmluZWR9IC0gdGhlIHBhcmVudCBvZiB0aGlzIGFydGVmYWN0LCB1bmxlc3MgdGhpcyBpcyB0aGUgcm9vdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgcGFyZW50KCkgeyByZXR1cm4gdGhpcy5fcGFyZW50IH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1tBcnRlZmFjdF19IC0gdGhlIGNoaWxkcmVuIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IGNoaWxkcmVuKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R9IC0gdGhlIHJvb3Qgb2YgdGhlIGFydGVmYWN0IGhpZXJhcmNoeVxuXHRcdFx0ICovXG5cdFx0XHRnZXQgcm9vdCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9yb290KSB7IHRoaXMuX3Jvb3QgPSB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnJvb3QgOiB0aGlzIH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogR2V0IGEgcHJvbWlzZSB0byBhbiBhcnRlZmFjdCBnaXZlbiBpdHMgSUQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtICBpZCB7U3RyaW5nfSAgIC0gdGhlIGlkIG9mIHRoZSByZXF1aXJlZCBhcnRlZmFjdFxuXHRcdFx0ICogQHJldHVybiB7UDxBcnRlZmFjdD59IC0gdGhlIHByb21pc2UgdG8gdGhlIGFydGVmYWN0IHRoYXQgaGFzIHRoZSBnaXZlbiBpZFxuXHRcdFx0ICovXG5cdFx0XHRhcnRlZmFjdEJ5SWQoaWQpIHtcblx0XHRcdFx0cmV0dXJuIFUuZ2V0RGVmKHRoaXMucm9vdC5fYXJ0ZWZhY3RzQnlJRCwgaWQsIGRlZmVyKS5wcm9taXNlO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFRyYXZlcnNlIHRoZSBBcnRlZmFjdCBoaWVyYXJjaHkgd2l0aCB0aGlzIGFzIHJvb3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIGZuIHsoQXJ0ZWZhY3QpID0+IEJvb2xlYW59IC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHR0cmF2ZXJzZUFydGVmYWN0cyhmbiwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciB7b3JkZXJ9ID0gb3B0aW9ucztcblx0XHRcdFx0aWYgKCFvcmRlcikgeyBvcmRlciA9ICdwcmVmaXgnIH1cblxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwcmVmaXgnKSB7IGZuKHRoaXMpIH1cblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGNoaWxkLnRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3Bvc3RmaXgnKSB7IGZuKHRoaXMpIH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBUcmF2ZXJzZSB0aGUgQXJ0ZWZhY3QgaGllcmFyY2h5IHdpdGggdGhpcyBhcyByb290LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBmbiB7KEFydGVmYWN0KSA9PiBCb29sZWFufSAtIHRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0dHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR2YXIge29yZGVyfSA9IG9wdGlvbnM7XG5cdFx0XHRcdGlmICghb3JkZXIpIHsgb3JkZXIgPSAncHJlZml4JyB9XG5cblx0XHRcdFx0aWYgKG9yZGVyID09PSAncHJlZml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHsgZm4odGhpcykgfVxuXHRcdFx0XHRpZiAob3B0aW9ucy5iZWZvcmVHb2luZ0luKSB7IG9wdGlvbnMuYmVmb3JlR29pbmdJbih0aGlzKSB9XG5cdFx0XHRcdHRoaXMuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpLmZvckVhY2goKGRlc2NlbmRlbnQpID0+IHtcblx0XHRcdFx0XHRkZXNjZW5kZW50LnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKHR5cGUsIGZuLCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChvcHRpb25zLmJlZm9yZUdvaW5nT3V0KSB7IG9wdGlvbnMuYmVmb3JlR29pbmdPdXQodGhpcykgfVxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwb3N0Zml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHsgZm4odGhpcykgfVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIChwYXJlbnQsIHBhcmVudCdzIHBhcmVudCwgLi4uKVxuXHRcdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gdHlwZSwgdW5sZXNzIHRoZXJlIGlzIG5vbmVcblx0XHRcdCAqL1xuXHRcdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFJldHJpZXZlIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnQgKGNoaWxkcmVuLCBjaGlsZHJlbidzIGNoaWxkcmVuLCAuLi4pXG5cdFx0XHQgKiBvZiB0aGlzIGFydGVmYWN0IHdpdGggdGhlIGdpdmVuIHR5cGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2xvc2VzdCBkZXNjZW5kYW50cyBvZiB0aGUgZ2l2ZW4gdHlwZTsgbm9uZSBvZiB0aGVtXG5cdFx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkZXNjZW5kYW50IGZyb20gYW55IG90aGVyXG5cdFx0XHQgKi9cblx0XHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEluZGljYXRlIHRoYXQgdGhpcyBhcnRlZmFjdCB3aWxsIG5ldmVyIGJlIHVzZWQgYWdhaW4sIGFsbG93aW5nIGl0XG5cdFx0XHQgKiB0byBkbyBhbnkgbmVjZXNzYXJ5IGNsZWFudXAuXG5cdFx0XHQgKi9cblx0XHRcdGRlc3Ryb3koKSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignZGVzdHJveScpO1xuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7IGNoaWxkLmRlc3Ryb3koKSB9KTtcblx0XHRcdH1cblxuXHRcdH0pKTtcblxuXG5cdFx0LyoqIHtAZnVuY3Rpb24gQXJ0ZWZhY3QubmV3U3ViY2xhc3N9XG5cdFx0ICogQSBzdGF0aWMgY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgc3ViY2xhc3Mgb2Yge0BsaW5rIEFydGVmYWN0fS5cblx0XHQgKi9cblx0XHR3aW5kb3cuX2FteV9BcnRlZmFjdC5uZXdTdWJjbGFzcyA9IGZ1bmN0aW9uIG5ld1N1YkNsYXNzKG5hbWUsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXHRcdFx0cmV0dXJuIGRtLnZwKG5hbWUsIFUubmV3U3ViY2xhc3Mod2luZG93Ll9hbXlfQXJ0ZWZhY3QsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdFx0LyogcHJvY2VzcyBvcHRpb25zICovXG5cdFx0XHRcdHZhciBwcm9jZXNzZWRPcHRpb25zID0gb3B0aW9ucztcblx0XHRcdFx0T2JqZWN0LmtleXMob3B0aW9uRGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHByb2Nlc3NlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NlZE9wdGlvbnNba2V5XSA9IG9wdGlvbkRlZmF1bHRzW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9ucy50eXBlID0gbmFtZTtcblxuXHRcdFx0XHQvKiBjYWxsIHN1cGVyLWNvbnN0cnVjdG9yICovXG5cdFx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBVLmV4dGVuZChvcHRpb25zLCBwcm9jZXNzZWRPcHRpb25zKSk7XG5cblx0XHRcdFx0LyogY2FsbCB0aGlzIGNvbnN0cnVjdG9yICovXG5cdFx0XHRcdGNvbnN0cnVjdG9yLmNhbGwodGhpcywgcHJvY2Vzc2VkT3B0aW9ucyk7XG5cblx0XHRcdFx0LyogdGhlbiBydW4gdGhlICdjb25zdHJ1Y3QnIG1ldGhvZCAqL1xuXHRcdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3RlZCkgeyAvLyBjb25zdHJ1Y3QgYXN5bmNocm9ub3VzbHlcblx0XHRcdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBQLnJlc29sdmUodGhpcy5jb25zdHJ1Y3Qob3B0aW9ucykpLnJldHVybih0aGlzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdChvcHRpb25zKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiByZWdpc3RlciB0aGlzIGFydGVmYWN0IHRvIHRoZSBjaXJjdWl0Ym9hcmQgKi9cblx0XHRcdFx0KHRoaXMuY29uc3RydWN0ZWQgfHwgUC5yZXNvbHZlKCkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucm9vdC5fcmVnaXN0ZXJBcnRlZmFjdCh0aGlzKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdFx0Z2V0IGNpcmN1aXRib2FyZCgpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuX2NpcmN1aXRib2FyZCkgeyB0aGlzLl9jaXJjdWl0Ym9hcmQgPSB0aGlzLmNsb3Nlc3RBbmNlc3RvckJ5VHlwZSgnQ2lyY3VpdGJvYXJkJykgfVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9jaXJjdWl0Ym9hcmQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pKSk7XG5cdFx0fTtcblxuXG5cdFx0cmV0dXJuIHdpbmRvdy5fYW15X0FydGVmYWN0O1xuXG5cblx0fSkudGFwKChjKSA9PiB7ICQuY2lyY3VpdGJvYXJkLkFydGVmYWN0ID0gYyB9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0FydGVmYWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImtlZmlyLWpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJy4va2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEtlZmlyKSB7XG5cblxuXHQvKioge0BleHBvcnR9e0BjbGFzcyBLZWZpclNpZ25hbEhhbmRsZXJ9XG5cdCAqIFVzZSB0aGlzIGFzIGEgc3ViY2xhc3MgKG9yIGp1c3QgbWl4IGl0IGluKSB0byBwcm92aWRlIHN1cHBvcnQgZm9yXG5cdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggS2VmaXIuanMuXG5cdCAqL1xuXHR2YXIgS2VmaXJTaWduYWxIYW5kbGVyID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBLZWZpclNpZ25hbEhhbmRsZXIoKSB7XG5cblx0XHR0aGlzLl9ldmVudHMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0aWVzID0ge307XG5cdFx0dGhpcy5fcHJvcGVydHlCdXNzZXMgPSB7fTtcblxuXHR9LCAvKiogQGxlbmRzIEtlZmlyU2lnbmFsSGFuZGxlci5wcm90b3R5cGUgKi8ge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIERlY2xhcmVzIGEgbmV3IGV2ZW50IHN0cmVhbSBmb3IgdGhpcyBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICBuYW1lICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50LCB1c2VkIHRvIHRyaWdnZXIgb3Igc3Vic2NyaWJlIHRvIGl0XG5cdFx0ICogQHBhcmFtICB7S2VmaXIuU3RyZWFtfSBbc291cmNlXSAtIGFub3RoZXIgZXZlbnQgc3RyZWFtIHRvIGF1dG9tYXRpY2FsbHkgdHJpZ2dlciB0aGlzIGV2ZW50XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5CdXN9IC0gdGhlIGNyZWF0ZWQgZXZlbnQgc3RyZWFtXG5cdFx0ICovXG5cdFx0bmV3RXZlbnQobmFtZSwge3NvdXJjZX0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgZXZlbnQgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBldmVudCBzdHJlYW0gKi9cblx0XHRcdHZhciBidXMgPSBLZWZpci5idXMoKTtcblx0XHRcdGlmIChzb3VyY2UpIHsgYnVzLnBsdWcoc291cmNlKSB9XG5cdFx0XHRyZXR1cm4gdGhpcy5fZXZlbnRzW25hbWVdID0gYnVzO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFJldHJpZXZlIGFuIGV2ZW50IHN0cmVhbSBieSBuYW1lLiBJZiB0aGUgbmFtZSBvZiBhIHByb3BlcnR5IGlzIGdpdmVuLCBhIHN0cmVhbVxuXHRcdCAqIGJhc2VkIG9uIGNoYW5nZXMgdG8gdGhhdCBwcm9wZXJ0eSBpcyByZXR1cm5lZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gIG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7S2VmaXIuU3RyZWFtfSAtIHRoZSBldmVudCBzdHJlYW0gYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0ZXZlbnQobmFtZSkge1xuXG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiByZXR1cm4gaXQgKi9cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0cmlldmUgYSBwcm9wZXJ0eSBieSBuYW1lLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7S2VmaXIuUHJvcGVydHl9IC0gdGhlIHByb3BlcnR5IGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuXHRcdCAqL1xuXHRcdHByb3BlcnR5KG5hbWUpIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gfSxcblxuXHRcdC8qKiBAYWxpYXMgcHJvcGVydHkgKi9cblx0XHRwKG5hbWUpIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gfSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRlZmluZXMgYSBuZXcgcHJvcGVydHkgb24gdGhpcyBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgICAgICAgICAgICBbc2V0dGFibGU9dHJ1ZV0gLSB3aGV0aGVyIHRoZSB2YWx1ZSBjYW4gYmUgbWFudWFsbHkgc2V0XG5cdFx0ICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgICAgICAgICAgIFtpbml0aWFsXSAgICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgcHJvcGVydHlcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbigqLCopOkJvb2xlYW59ICAgW2lzRXF1YWxdICAgICAgIC0gYSBwcmVkaWNhdGUgZnVuY3Rpb24gYnkgd2hpY2ggdG8gdGVzdCBmb3IgZHVwbGljYXRlIHZhbHVlc1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7S2VmaXIuUHJvcGVydHl9IC0gdGhlIHByb3BlcnR5IGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuXHRcdCAqL1xuXHRcdG5ld1Byb3BlcnR5KG5hbWUsIHtzZXR0YWJsZSwgaW5pdGlhbCwgaXNFcXVhbH0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgcHJvcGVydHkgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmYXVsdCB2YWx1ZSBmb3IgJ3NldHRhYmxlJyAqL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoc2V0dGFibGUpKSB7IHNldHRhYmxlID0gdHJ1ZSB9XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgYnVzIHdoaWNoIG1hbmFnZXMgdGhlIHByb3BlcnR5ICovXG5cdFx0XHR2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgcHJvcGVydHkgaXRzZWxmLCBhbmQgZ2l2ZSBpdCBhZGRpdGlvbmFsIG1ldGhvZHMgKi9cblx0XHRcdHZhciBwcm9wZXJ0eSA9IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSBidXMudG9Qcm9wZXJ0eShpbml0aWFsKS5za2lwRHVwbGljYXRlcyhpc0VxdWFsKTtcblx0XHRcdHByb3BlcnR5LnBsdWcgICA9IChvYnNlcnZhYmxlKSA9PiB7IGJ1cy5wbHVnKG9ic2VydmFibGUpOyAgIHJldHVybiBwcm9wZXJ0eSB9O1xuXHRcdFx0cHJvcGVydHkudW5wbHVnID0gKG9ic2VydmFibGUpID0+IHsgYnVzLnVucGx1ZyhvYnNlcnZhYmxlKTsgcmV0dXJuIHByb3BlcnR5IH07XG5cdFx0XHRwcm9wZXJ0eS5nZXQgPSAoKSA9PiBwcm9wZXJ0eS5fY3VycmVudDsgLy8gVE9ETzogYWNjZXNzaW5nIHByaXZhdGUgZmllbGQgb2YgS2VmaXIgcHJvcGVydHk7IGRvbid0XG5cdFx0XHRpZiAoc2V0dGFibGUpIHtcblx0XHRcdFx0cHJvcGVydHkuc2V0ID0gKHZhbHVlKSA9PiB7IGJ1cy5lbWl0KHZhbHVlKTsgcmV0dXJuIHByb3BlcnR5IH07XG5cdFx0XHR9XG5cblx0XHRcdC8qIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIG9iamVjdCBpbnRlcmZhY2UgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdGdldDogcHJvcGVydHkuZ2V0LFxuXHRcdFx0XHRzZXQ6IHNldHRhYmxlID8gcHJvcGVydHkuc2V0IDogdW5kZWZpbmVkXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogbWFrZSB0aGUgcHJvcGVydHkgYWN0aXZlOyBpdCBkb2Vzbid0IHdvcmsgaWYgdGhpcyBpc24ndCBkb25lICh0aGUgbmF0dXJlIG9mIEtlZmlyLmpzKSAqL1xuXHRcdFx0cHJvcGVydHkucnVuKCk7XG5cdFx0XHR0aGlzLmV2ZW50KCdkZXN0cm95Jykub25WYWx1ZSgoKSA9PiB7IGJ1cy5lbmQoKSB9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBwcm9wZXJ0eSAqL1xuXHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFsbCBzdWJzY3JpYmVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gdHJpZ2dlclxuXHRcdCAqIEB2YWx1ZSB7Kn0gICAgICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBhdHRhY2ggdG8gdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlcihuYW1lLCB2YWx1ZSkge1xuXG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBzdHJlYW0gZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZXJlIGlzIG5vIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogcHVzaCB0aGUgdmFsdWUgdG8gdGhlIHN0cmVhbSAqL1xuXHRcdFx0dGhpcy5fZXZlbnRzW25hbWVdLmVtaXQodmFsdWUpO1xuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNlbGVjdHMgYW4gZXhpc3Rpbmcgc3RyZWFtIG9yIHByb3BlcnR5LCBhbmQgdGhlblxuXHRcdCAqIGVpdGhlciByZXR1cm5zIGl0LCBvciBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHRvIGl0LCBkZXBlbmRpbmdcblx0XHQgKiBvbiB3aGV0aGVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICBuYW1lICAgICAgICAgICAgICAgICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBvciBwcm9wZXJ0eSB0byBzdWJzY3JpYmUgdG9cblx0XHQgKiBAcGFyYW0geyp9ICAgICAgICAgICAgICAgIFtleHBlY3RlZFZhbHVlXSAgICAgICAtIGlmIHByb3ZpZGVkLCBmaWx0ZXJzIHRoZSBzdHJlYW0gYnkgPT09IGVxdWFsaXR5IHdpdGggdGhpcyB2YWx1ZTtcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgbWF5IG5vdCBiZSBhIHBsYWluIG9iamVjdFxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgW29wdGlvbnNdICAgICAgICAgICAgIC0gYSBwbGFpbiBvYmplY3QgZm9yIHByb3ZpZGluZyBhZGRpdGlvbmFsIG9wdGlvbnNcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59ICAgICAgICAgIFtvcHRpb25zLm9uY2U9ZmFsc2VdICAtIHdoZXRoZXIgdGhlIHN0cmVhbSBlbmRzIGFmdGVyIG9uZSBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6dm9pZH0gW2NhbGxiYWNrXSAgICAgICAgICAgIC0gaWYgcHJvdmlkZWQsIHN1YnNjcmliZXMgdG8gdGhpcyBzdHJlYW0gd2l0aCB0aGUgdGhpcyBjYWxsYmFja1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7S2VmaXIuT2JzZXJ2YWJsZXxmdW5jdGlvbigpOnVuZGVmaW5lZH0gLSBpZiBubyBgY2FsbGJhY2tgIGlzIHByb3ZpZGVkLCB0aGUgc3BlY2lmaWVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgcHJvcGVydHk7IG90aGVyd2lzZSwgYSBmdW5jdGlvbiB0byB1bnN1YnNjcmliZSB0byBzYWlkXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0gb3IgcHJvcGVydHlcblx0XHQgKi9cblx0XHRvbihuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGFyZ3NPYmogPSB0aGlzLl9nYXRoZXJPbkFyZ3VtZW50cyhuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjayk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fb24oYXJnc09iaik7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBkb2VzIHRoZSBtYWluIHdvcmsgZm9yIHtAbGluayBvbn0sIGJ1dCBhY2NlcHRzXG5cdFx0ICogdGhlIHBhcmFtZXRlcnMgYXMgb25lIG9iamVjdCwgc28gaXQgZG9lc24ndCBoYXZlIHRvIGRlYWwgd2l0aCBwYXJhbWV0ZXIgb3JkZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dm9pZH1cblx0XHQgKi9cblx0XHRfb24oe25hbWUsIGV4cGVjdGVkVmFsdWUsIGNhbGxiYWNrfSkge1xuXHRcdFx0LyogZG9lcyBhbiBldmVudCBvciBwcm9wZXJ0eSBieSB0aGlzIG5hbWUgZXhpc3Q/ICovXG5cdFx0XHRVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgb3IgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBwcm9jZXNzIG5hbWUgKi9cblx0XHRcdHZhciByZXN1bHQgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcblxuXHRcdFx0LyogcHJvY2VzcyBleHBlY3RlZFZhbHVlICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoZXhwZWN0ZWRWYWx1ZSkpIHsgcmVzdWx0ID0gcmVzdWx0LmZpbHRlcigodikgPT4gdiA9PT0gZXhwZWN0ZWRWYWx1ZSkgfVxuXG5cdFx0XHQvKiBwcm9jZXNzIGNhbGxiYWNrICovXG5cdFx0XHRpZiAoY2FsbGJhY2spIHsgcmVzdWx0ID0gcmVzdWx0Lm9uVmFsdWUoY2FsbGJhY2spIH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFByb2Nlc3MgdGhlIGFyZ3VtZW50cyBhY2NlcHRlZCBieSB7QGxpbmsgb259LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdF9nYXRoZXJPbkFyZ3VtZW50cyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0geyBuYW1lOiBhcmdzLnNoaWZ0KCkgfTtcblxuXHRcdFx0LyogdGVzdCBmb3IgZXhwZWN0ZWQgdmFsdWUgYXJndW1lbnQgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiAhVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pICYmICFVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmV4cGVjdGVkVmFsdWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRlc3QgZm9yIGNhbGxiYWNrIGZ1bmN0aW9uICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5jYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHR9KTtcblxuXG5cdHJldHVybiBLZWZpclNpZ25hbEhhbmRsZXI7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX25leHRJZCA9IDA7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xuXHRcdHJldHVybiBgJHtwcmVmaXh8fFwidW5pcXVlLWlkXCJ9LSR7X25leHRJZCsrfWA7XG5cdH07XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvdW5pcXVlLWlkLmpzXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnZGVsdGEtanMnIF0sIGZ1bmN0aW9uIChQLCBETSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBhbHJlYWR5IGNhY2hlZD8gKi9cblx0aWYgKHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsKSB7IHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCB9XG5cblxuXHQvKiB0ZWxsIGRlbHRhLmpzIGFib3V0IGJsdWViaXJkICovXG5cdERNLnJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKFAucmVzb2x2ZSk7XG5cblxuXHQvKiBzZXQgdGhlIGNhY2hlICovXG5cdHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsID0gbmV3IERNKCk7XG5cblxuXHQvKiByZXR1cm4gdGhlIGRlbHRhIG1vZGVsIHRoYXQgbWFuYWdlcyBhbGwgcGx1Z2lucyAoPSBkZWx0YXMpICovXG5cdHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbDtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qc1xuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi9uZXdXaWRnZXRUeXBlLmpzJyxcblx0Jy4vbWlzYy5qcycsXG5cdCcuL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzJyxcblx0Jy4vZGVmZXIuanMnLFxuXHQnLi9tYWluLWRlbHRhLW1vZGVsLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFAsIG5ld1dpZGdldFR5cGUsIFUsIFNpZ25hbEhhbmRsZXIsIGRlZmVyLCBkbSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRpZiAoIXdpbmRvdy5fYW15UGx1Z2luKSB7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4gPSBmdW5jdGlvbiAocGx1Z2luT3JTZWxlY3Rpb24pIHtcblx0XHRcdGlmICgkLmlzUGxhaW5PYmplY3QocGx1Z2luT3JTZWxlY3Rpb24pKSB7XG5cblx0XHRcdFx0LyogdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVnaXN0ZXIgYSBuZXcgcGx1Z2luICovXG5cdFx0XHRcdHJldHVybiBuZXcgZG0uRGVsdGEocGx1Z2luT3JTZWxlY3Rpb24ubmFtZSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFUuYXNzZXJ0KCFfc2VsZWN0ZWREZWZlcnJlZC5kb25lLFxuXHRcdFx0XHRcdFx0YEFwaU5BVE9NWSBwbHVnaW5zIGNhbiBvbmx5IGJlIHNlbGVjdGVkIG9uY2UsIGFmdGVyIHdoaWNoIHRoZXkgYXJlIGZpeGVkLmApO1xuXHRcdFx0XHRfc2VsZWN0ZWREZWZlcnJlZC5kb25lID0gdHJ1ZTtcblxuXHRcdFx0XHQvKiB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byBzZWxlY3QgcGx1Z2lucyB0byBiZSBhcHBsaWVkICovXG5cdFx0XHRcdGRtLnNlbGVjdC5hcHBseShkbSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0XHRfc2VsZWN0ZWREZWZlcnJlZC5yZXNvbHZlKHRoaXMpO1xuXG5cdFx0XHRcdHJldHVybiB3aW5kb3cuX2FteVBsdWdpbi5zZWxlY3RlZDtcblxuXHRcdFx0fVxuXHRcdH07XG5cdFx0dmFyIF9zZWxlY3RlZERlZmVycmVkID0gZGVmZXIoKTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5zZWxlY3RlZCA9IF9zZWxlY3RlZERlZmVycmVkLnByb21pc2U7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uZ3JhcGggPSAoKSA9PiBkbS5ncmFwaCgpO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLmRtID0gZG07XG5cdH1cblxuXG5cdHJldHVybiB3aW5kb3cuX2FteVBsdWdpbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvcGx1Z2luLmpzXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24gKFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcblx0XHR2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuXHRcdHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0cmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuXHRcdH0pO1xuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuXHRcdFx0cmVqZWN0OiByZWplY3QsXG5cdFx0XHRwcm9taXNlOiBwcm9taXNlXG5cdFx0fTtcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2RlZmVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE1X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vbWlzYy5qcycsICcuLi9BcnRlZmFjdC5qcycsICcuL2tlZmlyLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBVLCBBcnRlZmFjdFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGFwaW5hdG9teSBjb21wb25lbnQgKHdpZGdldCkgICAgICAgICAgKi9cblx0LyogIGFzIGEgalF1ZXJ5IGVsZW1lbnQgcGx1Z2luOyB0aGlzIGlzIHJldHVybmVkIGZyb20gdGhlIG1vZHVsZSAgKi9cblx0ZnVuY3Rpb24gbmV3V2lkZ2V0VHlwZSh0eXBlTmFtZSwgb3B0aW9uRGVmYXVsdHMgPSB7fSkge1xuXG5cdFx0LyogdGhlIHNwZWNpZmljIHdpZGdldCBjbGFzcyAqL1xuXHRcdHZhciBXaWRnZXRQID0gQXJ0ZWZhY3RQLnRoZW4oKEFydGVmYWN0KSA9PiBBcnRlZmFjdC5uZXdTdWJjbGFzcyh0eXBlTmFtZSwgZnVuY3Rpb24gKHtjc3NDbGFzc30pIHtcblxuXHRcdFx0Lyogc2V0IHRoZSBlbGVtZW50IENTUyBjbGFzcyAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGNzc0NsYXNzKSkgeyB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoY3NzQ2xhc3MpIH1cblxuXHRcdFx0LyogaWYgdGhlIGpxdWVyeSBlbGVtZW50IGlzIHJlbW92ZWQsIGRlc3Ryb3kgdGhlIGFydGVmYWN0ICovXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXNLZWZpclN0cmVhbSgncmVtb3ZlJykub25WYWx1ZSgoKSA9PiB7IHRoaXMuZGVzdHJveSgpIH0pO1xuXG5cdFx0fSwge1xuXG5cdFx0XHRnZXQgbW9kZWwoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfSxcblxuXHRcdFx0Z2V0IGVsZW1lbnQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMuZWxlbWVudCB9XG5cblx0XHR9LCBVLmV4dGVuZCh7XG5cblx0XHRcdGJlZm9yZUNvbnN0cnVjdGlvbjogUC5yZXNvbHZlKCkgLy8gZ3VhcmFudGVlIGFsbCB3aWRnZXQgY29uc3RydWN0aW9uIHRvIGJlIGFzeW5jaHJvbm91c1xuXG5cdFx0fSwgb3B0aW9uRGVmYXVsdHMpKSk7XG5cblx0XHQvKiBjcmVhdGUgYSBsb3dlcmNhc2UgbmFtZSBmb3IgdGhpcyB3aWRnZXQgdHlwZSAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gdHlwZU5hbWVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGVOYW1lLnNsaWNlKDEpO1xuXG5cdFx0LyogalF1ZXJ5IHBsdWdpbjogdGhlIHdpZGdldCBjcmVhdGlvbiAmIHJldHJpZXZhbCBmdW5jdGlvbiAgKi9cblx0XHQkLmZuW2xvd2VyY2FzZU5hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuXHRcdFx0LyogaWYgdGhlIHdvcmQgJ2luc3RhbmNlJyBpcyBwYXNzZWQsIHJldHVybiB0aGUgKGFscmVhZHkgY3JlYXRlZCkgd2lkZ2V0IHByb21pc2UgKi9cblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWApIH1cblxuXHRcdFx0LyogZWxzZSwgY3JlYXRlIGEgbmV3IHdpZGdldCBhbmQgc2V0IGEgcHJvbWlzZSB0byBpdCAqL1xuXHRcdFx0dGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gLCBXaWRnZXRQXG5cdFx0XHRcdFx0LnRoZW4oKFdpZGdldCkgPT4gbmV3IFdpZGdldChVLmV4dGVuZChvcHRpb25zLCB7IGVsZW1lbnQ6IHRoaXMgfSkpLmNvbnN0cnVjdGVkKSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgalF1ZXJ5IGVsZW1lbnQgaW5zdGFuY2UsIGJ5IGpRdWVyeSBjb252ZW50aW9uICovXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0XHQvKiByZXR1cm4gYSBwcm9taXNlIHRvIHRoZSB3aWRnZXQgYXJ0ZWZhY3QgY2xhc3MgKi9cblx0XHRyZXR1cm4gV2lkZ2V0UDtcblxuXHR9XG5cblxuXHQvKiBleHBvc2UgdGhlIHdpZGdldCBjbGFzcyBjcmVhdG9yIGZ1bmN0aW9uICovXG5cdHJldHVybiBuZXdXaWRnZXRUeXBlO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9uZXdXaWRnZXRUeXBlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiVGhyZWVETW9kZWwuanMifQ==