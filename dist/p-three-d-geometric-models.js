(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs", "kefir-jquery", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_16__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, P, Kefir, U, ThreeDModelP) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-geometric-models',
	    requires: ['three-d']
	  });
	  plugin.add('Circuitboard.threeJsLoaders', {});
	  plugin.insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    if (!this.model) {
	      return;
	    }
	    var threeDModels = this.circuitboard.options.threeDModels;
	    if (threeDModels && threeDModels[this.model.id]) {
	      this.newProperty('currentThreeDModelID', {initial: null});
	      this.threeDModels = {};
	      ThreeDModelP.then((function(ThreeDModel) {
	        Object.keys(threeDModels[$__0.model.id]).forEach((function(modelID) {
	          var clock = new THREE.Clock();
	          $__0.threeDModels[modelID] = new ThreeDModel(U.extend({}, threeDModels[$__0.model.id][modelID], {
	            id: modelID,
	            parent: $__0,
	            clock: Kefir.animationFrames().map((function() {
	              return clock.getElapsedTime();
	            }))
	          }));
	          $__0.threeDModels[modelID].object3D.then((function(object) {
	            $__0.object3D.add(object);
	            $__0.p('size').onValue((function(size) {
	              $__0.threeDModels[modelID].adaptToSurfaceArea(size);
	            }));
	          }));
	        }));
	      }));
	    }
	  });
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(3), __webpack_require__(4), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Kefir, ArtefactP) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, dm, plugin, defer) {
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(11), __webpack_require__(15), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, SignalHandler, defer, dm) {
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYTY3NjY2ZDM4OTQzYWY5OTVhZCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9UaHJlZURNb2RlbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrZWZpci1qcXVlcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvQXJ0ZWZhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21haW4tZGVsdGEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvcGx1Z2luLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2RlZmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHLEdBQUcsTUFBSSxDQUFHLEdBQUcsYUFBVztBQUM5QyxjQUFXLENBQUM7QUFJUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLDJCQUF5QjtBQUMvQixZQUFPLENBQUcsRUFBQyxTQUFRLENBQUM7QUFBQSxHQUNyQixDQUFDLENB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USx1QkFBVSxDQUFHLDBDQUFVLEVBQUc7QUFDakMsY0FBVyxDQUFDO0FBRVosUUFBTyxTQUFTLE1BQUksQ0FBRSxDQUFFO0FBQ25CLGVBQU07QUFBRyxjQUFLLENBQUM7QUFDZixlQUFNLEVBQUksSUFBSSxFQUFDLENBQUMsU0FBUyxDQUFFO0FBQzlCLGFBQU0sRUFBSSxVQUFRLENBQUUsRUFBQyxDQUFDO0FBQ3RCLFlBQUssRUFBSSxVQUFRLENBQUUsRUFBQyxDQUFDO0tBQ3RCLENBQUMsQ0FBQztBQUVGLFVBQU87QUFDTixhQUFNLENBQUcsUUFBTTtBQUNmLFlBQUssQ0FBRyxPQUFLO0FBQ2IsYUFBTSxDQUFHLFFBQU07QUFBQSxLQUNoQixDQUFDO0dBQ0YsQ0FBQztBQUVGLEVBQUMsK0lBQUM7QUFDRjs7Ozs7Ozs7QUNsQkEsaUQiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXItanF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIiwgXCJibHVlYmlyZFwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiLCBcImRlbHRhLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXItanF1ZXJ5XCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiS2VmaXJcIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImtlZmlyLWpxdWVyeVwiXSwgcm9vdFtcIkRlbHRhTW9kZWxcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgY2E2NzY2NmQzODk0M2FmOTk1YWRcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0J2JsdWViaXJkJyxcblx0Jy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL1RocmVlRE1vZGVsLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFLCBQLCBLZWZpciwgVSwgVGhyZWVETW9kZWxQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRoZSBwbHVnaW4gKi9cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscycsXG5cdFx0cmVxdWlyZXM6IFsndGhyZWUtZCddXG5cdH0pO1xuXG5cblx0LyogYW4gb2JqZWN0IHdoZXJlIHRocmVlLmpzIGxvYWRlcnMgZm9yIGRpZmZlcmVudCBmaWxlIGZvcm1hdHMgY2FuIGJlIHBsdWdnZWQgaW4gKi9cblx0cGx1Z2luLmFkZCgnQ2lyY3VpdGJvYXJkLnRocmVlSnNMb2FkZXJzJywge30pO1xuXG5cblx0LyogbG9hZCBhbnkgM0QgbW9kZWxzIGFzc29jaWF0ZWQgd2l0aCBhIHRpbGUgKi9cblx0cGx1Z2luLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCF0aGlzLm1vZGVsKSB7IHJldHVybiB9XG5cblx0XHR2YXIgdGhyZWVETW9kZWxzID0gdGhpcy5jaXJjdWl0Ym9hcmQub3B0aW9ucy50aHJlZURNb2RlbHM7XG5cdFx0aWYgKHRocmVlRE1vZGVscyAmJiB0aHJlZURNb2RlbHNbdGhpcy5tb2RlbC5pZF0pIHtcblxuXHRcdFx0dGhpcy5uZXdQcm9wZXJ0eSgnY3VycmVudFRocmVlRE1vZGVsSUQnLCB7IGluaXRpYWw6IG51bGwgfSk7XG5cblx0XHRcdHRoaXMudGhyZWVETW9kZWxzID0ge307XG5cblx0XHRcdFRocmVlRE1vZGVsUC50aGVuKChUaHJlZURNb2RlbCkgPT4ge1xuXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRocmVlRE1vZGVsc1t0aGlzLm1vZGVsLmlkXSkuZm9yRWFjaCgobW9kZWxJRCkgPT4ge1xuXG5cdFx0XHRcdFx0dmFyIGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7IC8vIFRPRE86IGF0IHNvbWUgcG9pbnQsIHdlIGNoYW5nZSB0aGlzIHRvIGEgbW9yZSBnbG9iYWwgY2xvY2tcblxuXHRcdFx0XHRcdHRoaXMudGhyZWVETW9kZWxzW21vZGVsSURdID0gbmV3IFRocmVlRE1vZGVsKFUuZXh0ZW5kKHt9LCB0aHJlZURNb2RlbHNbdGhpcy5tb2RlbC5pZF1bbW9kZWxJRF0sIHtcblx0XHRcdFx0XHRcdGlkOiBtb2RlbElELFxuXHRcdFx0XHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0XHRcdFx0Y2xvY2s6IEtlZmlyLmFuaW1hdGlvbkZyYW1lcygpLm1hcCgoKSA9PiBjbG9jay5nZXRFbGFwc2VkVGltZSgpKVxuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRcdHRoaXMudGhyZWVETW9kZWxzW21vZGVsSURdLm9iamVjdDNELnRoZW4oKG9iamVjdCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vYmplY3QzRC5hZGQob2JqZWN0KTtcblx0XHRcdFx0XHRcdHRoaXMucCgnc2l6ZScpLm9uVmFsdWUoKHNpemUpID0+IHsgdGhpcy50aHJlZURNb2RlbHNbbW9kZWxJRF0uYWRhcHRUb1N1cmZhY2VBcmVhKHNpemUpIH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2tlZmlyJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEtlZmlyLCBUV0VFTikge1xuXG5cdC8qIEtlZmlyIGpRdWVyeSBwbHVnaW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0XHRyZXF1aXJlKCdrZWZpci1qcXVlcnknKS5pbml0KEtlZmlyLCAkKTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEtlZmlyLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCBlbWl0dGVyLmVtaXQpO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuXHRcdFx0KChmKSA9PiB7IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfSk7XG5cdEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKCkgPT4ge1xuXHRcdFx0XHRcdGVtaXR0ZXIuZW1pdCgpO1xuXHRcdFx0XHRcdGlmIChzdWJzY3JpYmVkKSB7IGl0ZXJhdGlvbkZuKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4geyBzdWJzY3JpYmVkID0gZmFsc2UgfTtcblxuXHRcdH0pO1xuXHR9O1xuXG5cblx0S2VmaXIudHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBLZWZpci5idXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IGVtaXR0ZXIuZW1pdCh0aGlzKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0S2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXlDb2RlKTtcblx0fTtcblxuXG5cdEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG5cdFx0XHRlbWl0dGVyLmVuZCgpO1xuXHRcdH0pO1xuXHRcdC8vcmV0dXJuIEtlZmlyLmNvbnN0YW50KHZhbHVlKTsgLy8gVE9ETzogcmVwbGFjZSBhbGwgJ29uY2UnIGNhbGxzIHdpdGggJ2NvbnN0YW50JyBjYWxsczsgdGhlbiByZW1vdmUgJ29uY2UnXG5cdH07XG5cblxuXHRLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0YXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0S2VmaXIubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuXHRcdHZhciBvcGVuID0gICAgICBLZWZpci5idXMoKTtcblx0XHR2YXIgY2xvc2UgPSAgICAgS2VmaXIuYnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdGhhbmRsZXIoKCkgPT4ge1xuXHRcdFx0XHRvcGVuLmVtaXQoKTtcblx0XHRcdFx0d2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuXHRcdFx0XHRjbG9zZS5lbWl0KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaCh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdG9sZEJ1ZmZlci5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRvTm90aGluZyA9ICgpPT57fTtcblx0XHR0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcblx0XHRyZXR1cm4gKCkgPT4geyB0aGlzLm9mZlZhbHVlKGRvTm90aGluZykgfTtcblx0fTtcblxuXHQvLyBUaGlzIGlzIGEgJ3NtYXJ0JyAuc3RvcFByb3BhZ2F0aW9uLCBtYXJraW5nIGV2ZW50cyB3aXRoIGEgbGFiZWxcblx0Ly8gYW5kIHNraXBwaW5nIHRob3NlIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgbGFiZWwuXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGxhYmVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChldmVudCkgPT4ge1xuXHRcdFx0cmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG5cdFx0fSkubWFwKChldmVudCkgPT4ge1xuXHRcdFx0VS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBGaWx0ZXIgZXZlbnRzIHRvIG9ubHkgY2VydGFpbiBrZXlzIC8gYnV0dG9ucy4gQ2FuIGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uIG9yIHNpbmdsZSBudW1iZXIuXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbiAoYnV0dG9uSWQpIHtcblx0XHR2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6IChiID0+IGIgPT09IGJ1dHRvbklkKTtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGUpID0+IHByZWQoZS53aGljaCkpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbVxuXHRcdFx0XHRcdC50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpXG5cdFx0XHRcdFx0Lm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5mbi5tb3VzZUNsaWNrID0gZnVuY3Rpb24gbW91c2VDbGljayh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHR1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHtcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gS2VmaXI7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwva2VmaXItYW5kLWVnZ3MuanMnLFxuXHQnLi9BcnRlZmFjdC5qcydcbl0sIGZ1bmN0aW9uICgkLCBUSFJFRSwgVSwgUCwgS2VmaXIsIEFydGVmYWN0UCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKiBjb252ZW5pZW5jZSBwcmVkaWNhdGUgZnVuY3Rpb25zICovXG5cdGZ1bmN0aW9uIGlzR2VvbWV0cnkodikgeyByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLkdlb21ldHJ5IHx8IHYgaW5zdGFuY2VvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeSB9XG5cdGZ1bmN0aW9uIGlzT2JqZWN0M0QodikgeyByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLk9iamVjdDNEIH1cblx0ZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHsgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMSB9XG5cblxuXHQvLy8qIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIHZpc2l0IGFsbCBnZW9tZXRyaWVzIGluIGFuIE9iamVjdDNEICovIC8vIFRPRE86IHJlbW92ZSBvciB1c2U/XG5cdC8vZnVuY3Rpb24gdHJhdmVyc2VHZW9tZXRyaWVzKG9iaiwgZm4pIHtcblx0Ly9cdG9iai50cmF2ZXJzZSgoc3ViT2JqKSA9PiB7XG5cdC8vXHRcdGlmIChVLmlzVW5kZWZpbmVkKHN1Yk9iai5nZW9tZXRyeSkpIHsgcmV0dXJuIH1cblx0Ly9cdFx0Zm4oc3ViT2JqLmdlb21ldHJ5KTtcblx0Ly9cdH0pO1xuXHQvL31cblx0Ly9mdW5jdGlvbiB0cmF2ZXJzZU1lc2hlcyhvYmosIGZuKSB7XG5cdC8vXHRvYmoudHJhdmVyc2UoKHN1Yk9iaikgPT4ge1xuXHQvL1x0XHRpZiAoVS5pc0RlZmluZWQoc3ViT2JqLmdlb21ldHJ5KSkgeyBmbihzdWJPYmopIH1cblx0Ly9cdH0pO1xuXHQvL31cblxuXG5cdC8qIGEgcHJvbWlzZSB0byB0aGUgbmV3IFRocmVlRE1vZGVsIGNsYXNzICovXG5cdHJldHVybiBBcnRlZmFjdFAudGhlbigoQXJ0ZWZhY3QpID0+IHtcblxuXG5cdFx0LyogaG93ZXZlciAob2Z0ZW4pIHRoaXMgaXMgbG9hZGVkLCBjcmVhdGUgdGhlIGNsYXNzIG9ubHkgb25jZSAqL1xuXHRcdGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9UaHJlZURNb2RlbCkpIHsgcmV0dXJuIHdpbmRvdy5fYW15X1RocmVlRE1vZGVsIH1cblxuXG5cdFx0LyogY3JlYXRlIHRoZSBjbGFzcyAqL1xuXHRcdHZhciBUaHJlZURNb2RlbCA9IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ1RocmVlRE1vZGVsJywgZnVuY3Rpb24gVGhyZWVETW9kZWwoe3Jvb3RUaHJlZURNb2RlbCwgdmlzaWJsZSwgZmlsZSwgcGFydHN9KSB7XG5cblxuXHRcdFx0Lyogd2hhdCBpcyB0aGUgJ3Jvb3QnIDNEIG1vZGVsPyAqL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQocm9vdFRocmVlRE1vZGVsKSkgeyByb290VGhyZWVETW9kZWwgPSB0aGlzIH1cblx0XHRcdHRoaXMucm9vdFRocmVlRE1vZGVsID0gcm9vdFRocmVlRE1vZGVsO1xuXG5cblx0XHRcdC8qIHRoZSAndmlzaWJsZScgYW5kICdoaWRkZW4nIHByb3BlcnRpZXMgKi9cblx0XHRcdHRoaXMubmV3UHJvcGVydHkoJ3Zpc2libGUnLCB7IGluaXRpYWw6IHZpc2libGUgfSk7XG5cdFx0XHR0aGlzLm5ld1Byb3BlcnR5KCdoaWRkZW4nKS5wbHVnKHRoaXMucCgndmlzaWJsZScpLm5vdCgpKTtcblx0XHRcdHRoaXMucCgndmlzaWJsZScpLnBsdWcodGhpcy5wKCdoaWRkZW4nKS5ub3QoKSk7XG5cblxuXHRcdFx0LyogY3JlYXRlIGFueSBUaHJlZURNb2RlbHMgcGFydHMgKHdpdGhvdXQgKHlldCkgbG9hZGluZyB0aGVpciBvYmplY3QzRCkgKi9cblx0XHRcdE9iamVjdC5rZXlzKHBhcnRzfHwge30pLm1hcCgoaWQpID0+IHtcblxuXHRcdFx0XHQvKiBkZWZpbmUgdGhlIG9wdGlvbnMgd2Ugd2FudCB0byBwYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNoaWxkIGFydGVmYWN0ICovXG5cdFx0XHRcdHZhciBuZXdDaGlsZE9wdGlvbnMgPSBVLmV4dGVuZCh7fSwgcGFydHNbaWRdLCB7XG5cdFx0XHRcdFx0aWQ6ICAgICAgICAgICAgICBpZCxcblx0XHRcdFx0XHRwYXJlbnQ6ICAgICAgICAgIHRoaXMsXG5cdFx0XHRcdFx0dmlzaWJsZTogICAgICAgICB2aXNpYmxlLFxuXHRcdFx0XHRcdHJvb3RUaHJlZURNb2RlbDogdGhpcy5yb290VGhyZWVETW9kZWxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFsnY29sb3InLCAnYW5pbWF0aW9uJywgJ2Nsb2NrJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG5ld0NoaWxkT3B0aW9uc1twcm9wXSkpIHtcblx0XHRcdFx0XHRcdG5ld0NoaWxkT3B0aW9uc1twcm9wXSA9IHRoaXMub3B0aW9uc1twcm9wXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGNvbnN0cnVjdCB0aGUgY2hpbGQgVGhyZWVETW9kZWwgKi8vLyBqc2hpbnQgLVcwMzFcblx0XHRcdFx0bmV3IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsKG5ld0NoaWxkT3B0aW9ucyk7XG5cblx0XHRcdH0pO1xuXG5cblx0XHRcdC8qIG1hbmlmZXN0IHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgbW9kZWwgb24gdGhlIG9iamVjdDNEICovXG5cdFx0XHR0aGlzLm9iamVjdDNELnRoZW4oKG9iamVjdDNEKSA9PiB7XG5cdFx0XHRcdHRoaXMucCgndmlzaWJsZScpLm1lcmdlKHRoaXMub24oJ2Rlc3Ryb3knKS5tYXBUbyhmYWxzZSkpXG5cdFx0XHRcdFx0Lm9uVmFsdWUoKHZpc2libGUpID0+IHsgb2JqZWN0M0QudmlzaWJsZSA9IHZpc2libGUgfSk7XG5cdFx0XHR9KTtcblxuXG5cdFx0fSwge1xuXG5cdFx0XHRnZXQgZ2VvbWV0cnkzRCgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9nZW9tZXRyeTNEKSB7XG5cdFx0XHRcdFx0dGhpcy5fZ2VvbWV0cnkzRCA9IG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMuZmlsZSkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5yb290VGhyZWVETW9kZWwucCgndmlzaWJsZScpLnZhbHVlKHRydWUpLnRha2UoMSkub25WYWx1ZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHQvKiByZXNvbHZlIHRoaXMgcHJvbWlzZSBieSBsb2FkaW5nIHRoZSBwcm9wZXIgZmlsZSwgd2hlbiB0aGUgcm9vdCBtb2RlbCBmaXJzdCBiZWNvbWVzIHZpc2libGUgKi9cblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2FkR2VvbWV0cnlGcm9tRmlsZSgpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8qIHRoaXMgVGhyZWVETW9kZWwgaGFzIG5vIGdlb21ldHJ5ICovXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUobnVsbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5M0Q7XG5cdFx0XHR9LFxuXG5cblx0XHRcdGdldCBvcmlnaW5hbEJvdW5kaW5nQm94KCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX29yaWdpbmFsQm91bmRpbmdCb3gpIHtcblx0XHRcdFx0XHR0aGlzLl9vcmlnaW5hbEJvdW5kaW5nQm94ID0gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3B0aW9ucy5maWxlKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdlb21ldHJ5M0QudGhlbigoZ2VvbWV0cnkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgYm94RnJvbUZpbGUgPSBuZXcgVEhSRUUuQm94MygpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIFRIUkVFLkJ1ZmZlckdlb21ldHJ5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJveEZyb21GaWxlLmV4cGFuZEJ5UG9pbnQoZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJveEZyb21GaWxlLmV4cGFuZEJ5UG9pbnQoZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0KGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cyB8fCBbXSkuY29uY2F0KFtnZW9tZXRyeV0pLmZvckVhY2goKHt2ZXJ0aWNlc30pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdCh2ZXJ0aWNlcyB8fCBbXSkuZm9yRWFjaCgocG9pbnQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ym94RnJvbUZpbGUuZXhwYW5kQnlQb2ludChwb2ludCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYm94RnJvbUZpbGU7XG5cdFx0XHRcdFx0XHRcdH0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoVS5pc0RlZmluZWQodGhpcy5vcHRpb25zLnBhcnRzKSkge1xuXHRcdFx0XHRcdFx0XHRQLmFsbCh0aGlzLmNoaWxkcmVuKS5tYXAocGFydCA9PiBwYXJ0Lm9yaWdpbmFsQm91bmRpbmdCb3gpLnJlZHVjZSgocmVzdWx0LCBiYm94KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdC5leHBhbmRCeVBvaW50KGJib3gubWluKS5leHBhbmRCeVBvaW50KGJib3gubWF4KTtcblx0XHRcdFx0XHRcdFx0fSwgbmV3IFRIUkVFLkJveDMoKSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vcmlnaW5hbEJvdW5kaW5nQm94O1xuXHRcdFx0fSxcblxuXG5cdFx0XHRnZXQgb2JqZWN0M0QoKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fb2JqZWN0M0QpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3QzRCA9IHRoaXMuZ2VvbWV0cnkzRC50aGVuKChnZW9tZXRyeTNEKSA9PiB7XG5cblx0XHRcdFx0XHRcdGlmIChnZW9tZXRyeTNEKSB7IC8vIHdlIGhhdmUgbG9hZGVkIGEgZmlsZVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnJvb3RUaHJlZURNb2RlbC5vcmlnaW5hbEJvdW5kaW5nQm94LnRoZW4oKG9yaWdpbmFsQm91bmRpbmdCb3gpID0+IHtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGNlbnRlciB0aGUgZ2VvbWV0cnkgYmFzZWQgb24gdGhlIHJvb3QgbW9kZWwncyBib3VuZGluZyBib3ggKi9cblx0XHRcdFx0XHRcdFx0XHR2YXIgY29ycmVjdGlvbiA9IG9yaWdpbmFsQm91bmRpbmdCb3guY2VudGVyKCkubmVnYXRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNvcnJlY3Rpb25NYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpLnNldFBvc2l0aW9uKGNvcnJlY3Rpb24pO1xuXHRcdFx0XHRcdFx0XHRcdChnZW9tZXRyeTNELm1vcnBoVGFyZ2V0cyB8fCBbXSkuZm9yRWFjaCgoe3ZlcnRpY2VzfSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmVydGljZXMuZm9yRWFjaCgocG9pbnQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cG9pbnQuYXBwbHlNYXRyaXg0KGNvcnJlY3Rpb25NYXRyaXgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0Z2VvbWV0cnkzRC5hcHBseU1hdHJpeChjb3JyZWN0aW9uTWF0cml4KTtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGNyZWF0ZSBtYXRlcmlhbCAqL1xuXHRcdFx0XHRcdFx0XHRcdHZhciB7YW5pbWF0aW9uLCBjb2xvcn0gPSB0aGlzLm9wdGlvbnM7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogY29sb3IgfHwgJ3doaXRlJyB9KTtcblx0XHRcdFx0XHRcdFx0XHRtYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcblxuXHRcdFx0XHRcdFx0XHRcdC8qIGNyZWF0ZSB0aGUgb2JqZWN0M0QsIGVpdGhlciBhbmltYXRlZCBvciBub3QgKi9cblx0XHRcdFx0XHRcdFx0XHR2YXIgb2JqZWN0O1xuXHRcdFx0XHRcdFx0XHRcdGlmIChhbmltYXRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8qIGNyZWF0ZSBhIG1lc2ggdGhhdCBjYW4gYmUgYW5pbWF0ZWQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdG9iamVjdCA9IG5ldyBUSFJFRS5Nb3JwaEFuaW1NZXNoKGdlb21ldHJ5M0QsIG1hdGVyaWFsKTtcblx0XHRcdFx0XHRcdFx0XHRcdG9iamVjdC5kdXJhdGlvbiA9IGFuaW1hdGlvbi5kdXJhdGlvbjtcblx0XHRcdFx0XHRcdFx0XHRcdG1hdGVyaWFsLm1vcnBoVGFyZ2V0cyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRnZW9tZXRyeTNELmNvbXB1dGVNb3JwaE5vcm1hbHMoKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Lyogc3Vic2NyaWJlIHRvIHRoZSBjbG9jayAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHtjbG9ja30gPSB0aGlzLm9wdGlvbnM7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xvY2sudGFrZVVudGlsQnkodGhpcy5ldmVudCgnZGVzdHJveScpKS5vblZhbHVlKCh0aW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9iamVjdC51cGRhdGVBbmltYXRpb24oMTAwMCAqICh0aW1lIC0gbGFzdFRpbWUpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGFzdFRpbWUgPSB0aW1lO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8qIHNpbXBsZSwgc3RhdGljIG1lc2ggKi9cblx0XHRcdFx0XHRcdFx0XHRcdG9iamVjdCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5M0QsIG1hdGVyaWFsKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9iamVjdDtcblxuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLy8gdGhpcyBpcyBhIGdyb3VwIHdpdGggcGFydHNcblxuXHRcdFx0XHRcdFx0XHQvKiBjcmVhdGUgYmFzZSBvYmplY3QzRCBmb3IgbW9kZWwgcGFydHMgKi9cblx0XHRcdFx0XHRcdFx0dmFyIG9iamVjdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuXG5cdFx0XHRcdFx0XHRcdC8qIHdoZW5ldmVyIGVhY2ggcGFydCBpcyBsb2FkZWQsIGFkZCB0aGVtIGFzIGEgY2hpbGQgb2YgdGhlIGJhc2Ugb2JqZWN0ICovXG5cdFx0XHRcdFx0XHRcdHRoaXMuY2hpbGRyZW4ubWFwKChwYXJ0KSA9PiBwYXJ0Lm9iamVjdDNEKS5mb3JFYWNoKChwYXJ0T2JqZWN0UCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHBhcnRPYmplY3RQLnRoZW4oKHBhcnRPYmplY3QpID0+IHsgb2JqZWN0LmFkZChwYXJ0T2JqZWN0KSB9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0LyogcmVzb2x2ZSB0aGlzIHByb21pc2Ugd2l0aCB0aGUgYmFzZSBvYmplY3QgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFAuYWxsKHRoaXMuY2hpbGRyZW4ubWFwKChwYXJ0KSA9PiBwYXJ0Lm9iamVjdDNEKSkuZWFjaCgoc3ViT2JqZWN0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0b2JqZWN0LmFkZChzdWJPYmplY3QpO1xuXHRcdFx0XHRcdFx0XHR9KS5yZXR1cm4ob2JqZWN0KTtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXMuX29iamVjdDNEO1xuXHRcdFx0fSxcblxuXG5cdFx0XHRhZGFwdFRvU3VyZmFjZUFyZWEoc2l6ZSkge1xuXG5cdFx0XHRcdFUuYXNzZXJ0KHRoaXMucm9vdFRocmVlRE1vZGVsID09PSB0aGlzLFxuXHRcdFx0XHRcdGBUaGUgJ2FkYXB0VG9TdXJmYWNlQXJlYScgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHJvb3QgVGhyZWVETW9kZWwuYCk7XG5cblx0XHRcdFx0UC5hbGwoW3RoaXMub2JqZWN0M0QsIHRoaXMub3JpZ2luYWxCb3VuZGluZ0JveF0pLnNwcmVhZCgob2JqLCBib3VuZGluZ0JveCkgPT4ge1xuXHRcdFx0XHRcdC8qIGFiYnJldmlhdGUgM0Qtb2JqZWN0IHdpZHRoIGFuZCBoZWlnaHQgKi9cblx0XHRcdFx0XHR2YXIgb2JqV2lkdGggPSBib3VuZGluZ0JveC5zaXplKCkueDtcblx0XHRcdFx0XHR2YXIgb2JqSGVpZ2h0ID0gYm91bmRpbmdCb3guc2l6ZSgpLnk7XG5cblx0XHRcdFx0XHQvKiByb3RhdGUgOTDCsCBvbiB0aGUgei1heGlzIGlmIHRoaXMgZ2l2ZXMgYSBiZXR0ZXIgZml0ICovXG5cdFx0XHRcdFx0aWYgKChzaXplLndpZHRoIDwgc2l6ZS5oZWlnaHQpICE9PSAob2JqV2lkdGggPCBvYmpIZWlnaHQpKSB7XG5cdFx0XHRcdFx0XHRvYmoucm90YXRpb24ueiA9IDAuNSAqIE1hdGguUEk7XG5cdFx0XHRcdFx0XHRbb2JqV2lkdGgsIG9iakhlaWdodF0gPSBbb2JqSGVpZ2h0LCBvYmpXaWR0aF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG9iai5yb3RhdGlvbi56ID0gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvKiBkZXRlcm1pbmUgdGhlIHNjYWxlIHJhdGlvICovXG5cdFx0XHRcdFx0dmFyIHJhdGlvID0gMC44ICogTWF0aC5taW4oc2l6ZS53aWR0aCAvIG9ialdpZHRoLCBzaXplLmhlaWdodCAvIG9iakhlaWdodCk7XG5cblx0XHRcdFx0XHQvKiBhZGp1c3Qgc2l6ZSAqL1xuXHRcdFx0XHRcdG9iai5zY2FsZS5zZXQocmF0aW8sIHJhdGlvLCByYXRpbyk7XG5cblx0XHRcdFx0XHQvKiBhbnkgY3VzdG9tICdlbGV2YXRpb24nICovXG5cdFx0XHRcdFx0dmFyIGVsZXZhdGlvbiA9IFUuZGVmT3IodGhpcy5vcHRpb25zLmVsZXZhdGlvbiwgTWF0aC5taW4oc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpIC8gNCk7XG5cdFx0XHRcdFx0b2JqLnBvc2l0aW9uLnogPSAwLjUgKiByYXRpbyAqIGJvdW5kaW5nQm94LnNpemUoKS56ICsgZWxldmF0aW9uO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSxcblxuXG5cdFx0XHRfbG9hZEdlb21ldHJ5RnJvbUZpbGUoKSB7XG5cblx0XHRcdFx0Lyogc2VsZWN0IHRoZSBsb25nZXN0IGV4dGVuc2lvbiB0aGF0IGZpdHMgdGhlIGZpbGVuYW1lICovXG5cdFx0XHRcdC8vIGUuZy4sIFwicG9pbnRzLmpzb25cIiBoYXMgcHJpb3JpdHkgb3ZlciBcImpzb25cIlxuXHRcdFx0XHR2YXIge2ZpbGV9ID0gdGhpcy5vcHRpb25zO1xuXHRcdFx0XHR2YXIgZXh0ID0gJyc7XG5cdFx0XHRcdE9iamVjdC5rZXlzKCQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycykuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGV4dGVuc2lvbi5sZW5ndGggPiBleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRpZiAoZW5kc1dpdGgoZmlsZSwgYC4ke2V4dGVuc2lvbn1gKSkge1xuXHRcdFx0XHRcdFx0XHRleHQgPSBleHRlbnNpb247XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiB3YXMgYW4gZXh0ZW5zaW9uIGZvdW5kPyAqL1xuXHRcdFx0XHRVLmFzc2VydChleHQubGVuZ3RoID4gMCwgYFRoZSBmaWxlICcke2ZpbGV9JyBpcyBub3QgcmVjb2duaXplZCBhcyBhIDNEIG1vZGVsLmApO1xuXG5cdFx0XHRcdC8qIGZldGNoIHRoZSBsb2FkZXIgZm9yIHRoYXQgZmlsZSBleHRlbnNpb24gKi9cblx0XHRcdFx0dmFyIExvYWRlciA9ICQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVyc1tleHRdO1xuXG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayAqL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChMb2FkZXIpLCBgU29tZXRoaW5nIHdlbnQgd3JvbmcgcmV0cmlldmluZyB0aGUgM0QgbW9kZWwgbG9hZGVyLmApO1xuXG5cdFx0XHRcdC8qIHJldHVybiBhIHByb21pc2UgdG8gdGhlIDNEIG9iamVjdCAqL1xuXHRcdFx0XHRyZXR1cm4gVS5wcm9taXNpZnkobmV3IExvYWRlcigpLCAnbG9hZCcpKGZpbGUpLnRoZW4oKGdlb21ldHJ5KSA9PiB7XG5cblx0XHRcdFx0XHQvKiBmb3Igbm93LCB3ZSBvbmx5IGFjY2VwdCBHZW9tZXRyeSdzIGFuZCBPYmplY3QzRCdzIGZyb20gYSBsb2FkZXIgKi9cblx0XHRcdFx0XHRVLmFzc2VydChpc0dlb21ldHJ5KGdlb21ldHJ5KSB8fCBpc09iamVjdDNEKGdlb21ldHJ5KSxcblx0XHRcdFx0XHRcdGBUaGUgM0QgbW9kZWwgbG9hZGVyIGZvciB0aGUgJyR7ZXh0fScgZXh0ZW5zaW9uIHJldHVybmVkIGFuIHVuc3VwcG9ydGVkIHZhbHVlLmApO1xuXG5cdFx0XHRcdFx0LyogaWYgYW4gT2JqZWN0M0QgaXMgcmV0dXJuZWQsIHRha2Ugb25seSBpdHMgZ2VvbWV0cnkgKi9cblx0XHRcdFx0XHRpZiAoIWlzR2VvbWV0cnkoZ2VvbWV0cnkpKSB7IGdlb21ldHJ5ID0gZ2VvbWV0cnkuZ2VvbWV0cnkgfHwgZ2VvbWV0cnkuY2hpbGRyZW5bMF0uZ2VvbWV0cnkgfVxuXG5cdFx0XHRcdFx0LyogcmV0dXJuIHRoZSBvYmplY3QgKi9cblx0XHRcdFx0XHRyZXR1cm4gZ2VvbWV0cnk7XG5cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cblx0XHRcdC8vIFVOQ09NTUVOVCBUSElTIEZPUiBIRUxQIERFQlVHR0lORyBPQkpFQ1QgUExBQ0VNRU5UXG5cdFx0XHQvL19zaG93VmlzaWJsZUJvdW5kaW5nQm94KCkge1xuXHRcdFx0Ly9cdGlmICh0aGlzLnJvb3RUaHJlZURNb2RlbCA9PT0gdGhpcykge1xuXHRcdFx0Ly9cdFx0dmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEsIDEsIDEpO1xuXHRcdFx0Ly9cdFx0dmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDBmZjAwLCB3aXJlZnJhbWU6IHRydWUgfSk7XG5cdFx0XHQvL1x0XHR2YXIgYm94ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcblx0XHRcdC8vXHRcdHRoaXMub2JqZWN0M0QudGhlbigob2JqZWN0M0QpID0+IHsgb2JqZWN0M0QuYWRkKGJveCkgfSk7XG5cdFx0XHQvL1x0XHR0aGlzLm9yaWdpbmFsQm91bmRpbmdCb3gudGhlbigoYmIpID0+IHtcblx0XHRcdC8vXHRcdFx0aWYgKGJiLmVtcHR5KCkpIHsgcmV0dXJuIH1cblx0XHRcdC8vXHRcdFx0Ym94LnBvc2l0aW9uLnggPSAwLjUgKiAoYmIubWF4LnggKyBiYi5taW4ueCk7XG5cdFx0XHQvL1x0XHRcdGJveC5wb3NpdGlvbi55ID0gMC41ICogKGJiLm1heC55ICsgYmIubWluLnkpO1xuXHRcdFx0Ly9cdFx0XHRib3gucG9zaXRpb24ueiA9IDAuNSAqIChiYi5tYXgueiArIGJiLm1pbi56KTtcblx0XHRcdC8vXHRcdFx0Ym94LnNjYWxlLnggPSAoYmIubWF4LnggLSBiYi5taW4ueCk7XG5cdFx0XHQvL1x0XHRcdGJveC5zY2FsZS55ID0gKGJiLm1heC55IC0gYmIubWluLnkpO1xuXHRcdFx0Ly9cdFx0XHRib3guc2NhbGUueiA9IChiYi5tYXgueiAtIGJiLm1pbi56KTtcblx0XHRcdC8vXHRcdH0pO1xuXHRcdFx0Ly9cdH1cblx0XHRcdC8vfSxcblxuXG5cdFx0fSwge1xuXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXG5cdFx0fSk7XG5cblxuXHRcdC8qIHN0YXRpYyBsb2NhdGlvbiB0byBjb2xsZWN0IHRocmVlLmpzIGxvYWRlcnMgZm9yIGRpZmZlcmVudCBmaWxlIGZvcm1hdHMgKi9cblx0XHQvLyBUT0RPOiB0cmFuc2ZlciB0aGlzIHRhc2sgZnJvbSBDaXJjdWl0Ym9hcmQgdG8gaGVyZSwgZXZlcnl3aGVyZSBpbiB0aGUgY29kZVxuXHRcdHdpbmRvdy5fYW15X1RocmVlRE1vZGVsLmxvYWRlcnMgPSB7fTtcblxuXG5cdFx0cmV0dXJuIHdpbmRvdy5fYW15X1RocmVlRE1vZGVsO1xuXG5cblx0fSkudGFwKChjKSA9PiB7ICQuY2lyY3VpdGJvYXJkLlRocmVlRE1vZGVsID0gYyB9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RocmVlRE1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImtlZmlyLWpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanMnLFxuXHQnLi91dGlsL3VuaXF1ZS1pZC5qcycsXG5cdCcuL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcycsXG5cdCcuL3V0aWwvcGx1Z2luLmpzJyxcblx0Jy4vdXRpbC9kZWZlci5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBVLCBLZWZpclNpZ25hbEhhbmRsZXIsIHVuaXF1ZUlELCBkbSwgcGx1Z2luLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gcGx1Z2luLnNlbGVjdGVkLnRoZW4oKCkgPT4ge1xuXG5cblx0XHQvKiBob3dldmVyIChvZnRlbikgdGhpcyBpcyBsb2FkZWQsIGNyZWF0ZSB0aGUgY2xhc3Mgb25seSBvbmNlICovXG5cdFx0aWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X0FydGVmYWN0KSkgeyByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3QgfVxuXG5cblx0XHQvKioge0BleHBvcnQgQGNsYXNzIEFydGVmYWN0IEBleHRlbmRzIEtlZmlyU2lnbmFsSGFuZGxlcn1cblx0XHQgKiBVc2UgdGhpcyBhcyBhIHN1YmNsYXNzIChvciBqdXN0IG1peCBpdCBpbikgdG8gcHJvdmlkZSBzdXBwb3J0IGZvclxuXHRcdCAqIGV2ZW50cyBhbmQgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIHRocm91Z2ggS2VmaXIuanMuXG5cdFx0ICpcblx0XHQgKiBVc2VycyBjYW4gcGFzcyBhIHByb21pc2UgdGhyb3VnaCB0aGUgJ2JlZm9yZUNvbnN0cnVjdGlvbicgb3B0aW9uLiBJZiBkb25lLCB0aGVcblx0XHQgKiBhcnRlZmFjdCB3YWl0cyBvbiB0aGF0IHByb21pc2UgYmVmb3JlIGNhbGxpbmcgaXRzICdjb25zdHJ1Y3QnIG1ldGhvZC5cblx0XHQgKiBTaW1pbGFybHksIHVzZXJzIG9mIGluc3RhbmNlcyBvZiB0aGlzIGNsYXNzIHNob3VsZCB0ZXN0IHRoZSAnY29uc3RydWN0ZWQnIHByb3BlcnR5LlxuXHRcdCAqIElmIGl0IGlzIGRlZmluZWQsIGl0IGlzIGEgcHJvbWlzZSB0aGF0IGhhcyB0byBiZSB3YWl0ZWQgZm9yLlxuXHRcdCAqIElmIG5vdCwgdGhlIG9iamVjdCBpbnN0YW5jZSBjYW4gYmUgdXNlZCBzeW5jaHJvbm91c2x5IGFmdGVyIGNvbnN0cnVjdGlvbi5cblx0XHQgKi9cblx0XHR3aW5kb3cuX2FteV9BcnRlZmFjdCA9IGRtLnZwKCdBcnRlZmFjdCcsIFUubmV3U3ViY2xhc3MoS2VmaXJTaWduYWxIYW5kbGVyLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXJ0ZWZhY3Qob3B0aW9ucykge1xuXHRcdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblx0XHRcdHZhciB7aWQsIHR5cGUsIHBhcmVudCwgYmVmb3JlQ29uc3RydWN0aW9ufSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIHNldCBoaWVyYXJjaHkgc3R1ZmYgKi9cblx0XHRcdHRoaXMuX2lkID0gaWQgfHwgdW5pcXVlSUQodHlwZSk7XG5cdFx0XHR0aGlzLl90eXBlID0gdHlwZTtcblx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdFx0XHRpZiAocGFyZW50KSB7IFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBldmVudHMgKi9cblx0XHRcdHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcblxuXHRcdFx0LyogcG9zc2libHkgd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/ICovXG5cdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbihiZWZvcmVDb25zdHJ1Y3Rpb24pO1xuXG5cdFx0XHQvKiBnaXZlIHRoZSByb290IGFydGVmYWN0IGEgd2F5IHRvIHJlZ2lzdGVyIG90aGVyIGFydGVmYWN0cyBieSBJRCAqL1xuXHRcdFx0aWYgKHRoaXMucm9vdCA9PT0gdGhpcykge1xuXHRcdFx0XHR0aGlzLl9hcnRlZmFjdHNCeUlEID0ge307XG5cdFx0XHRcdHRoaXMuX3JlZ2lzdGVyQXJ0ZWZhY3QgPSBmdW5jdGlvbiAoYXJ0ZWZhY3QpIHtcblx0XHRcdFx0XHRVLmdldERlZih0aGlzLl9hcnRlZmFjdHNCeUlELCBhcnRlZmFjdC5pZCwgZGVmZXIpLnJlc29sdmUoYXJ0ZWZhY3QpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0fSwgLyoqIEBsZW5kcyBBcnRlZmFjdC5wcm90b3R5cGUgKi8ge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBBbGxvdyBhIHByb21pc2UgdG8gYmUgaW5zZXJ0ZWQgb24gd2hpY2ggdGhlIHJlc3Qgb2YgY29uc3RydWN0aW9uIHNob3VsZCB3YWl0LlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBwb3NzaWJsZVByb21pc2Ugeyp9ICAtIGEgdmFsdWUgdGhhdCBtaWdodCBiZSBhIHByb21pc2Vcblx0XHRcdCAqL1xuXHRcdFx0YmVmb3JlQ29uc3RydWN0aW9uKHBvc3NpYmxlUHJvbWlzZSkge1xuXG5cdFx0XHRcdC8qIGlmIG5vIHByb21pc2UgaXMgcGFzc2VkIGluLCBpZ25vcmUsIHRvIGtlZXAgY29uc3RydWN0aW9uIHN5bmNocm9ub3VzICovXG5cdFx0XHRcdGlmICghcG9zc2libGVQcm9taXNlIHx8ICEkLmlzRnVuY3Rpb24ocG9zc2libGVQcm9taXNlLnRoZW4pKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogaWYgdGhpcyBpcyB0aGUgZmlyc3QgcHJvbWlzZSBwYXNzZWQgaW4sIGluaXRpYWxpemUgJ3RoaXMuY29uc3RydWN0ZWQnICovXG5cdFx0XHRcdGlmICghdGhpcy5jb25zdHJ1Y3RlZCkgeyB0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKHRoaXMpIH1cblxuXHRcdFx0XHQvKiBpbnNlcnQgdGhlIG5ldyBwcm9taXNlIGludG8gdGhlIGNoYWluIGZvciAndGhpcy5jb25zdHJ1Y3RlZCcgcmVzb2x1dGlvbiAqL1xuXHRcdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50YXAoKCkgPT4gUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSkpO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IC0gdGhlIG9wdGlvbnMgcHJvdmlkZWQgdGhyb3VnaCB0aGUgY29uc3RydWN0b3Jcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IG9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge1N0cmluZ30gLSB0aGUgdW5pcXVlIGlkZW50aWZpZXIgYmVsb25naW5nIHRvIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB0eXBlIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHRcdCAqL1xuXHRcdFx0Z2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm4ge0FydGVmYWN0fHVuZGVmaW5lZH0gLSB0aGUgcGFyZW50IG9mIHRoaXMgYXJ0ZWZhY3QsIHVubGVzcyB0aGlzIGlzIHRoZSByb290XG5cdFx0XHQgKi9cblx0XHRcdGdldCBwYXJlbnQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7W0FydGVmYWN0XX0gLSB0aGUgY2hpbGRyZW4gb2YgdGhpcyBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHRnZXQgY2hpbGRyZW4oKSB7IHJldHVybiB0aGlzLl9jaGlsZHJlbiB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtBcnRlZmFjdH0gLSB0aGUgcm9vdCBvZiB0aGUgYXJ0ZWZhY3QgaGllcmFyY2h5XG5cdFx0XHQgKi9cblx0XHRcdGdldCByb290KCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX3Jvb3QpIHsgdGhpcy5fcm9vdCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQucm9vdCA6IHRoaXMgfVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBHZXQgYSBwcm9taXNlIHRvIGFuIGFydGVmYWN0IGdpdmVuIGl0cyBJRC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gIGlkIHtTdHJpbmd9ICAgLSB0aGUgaWQgb2YgdGhlIHJlcXVpcmVkIGFydGVmYWN0XG5cdFx0XHQgKiBAcmV0dXJuIHtQPEFydGVmYWN0Pn0gLSB0aGUgcHJvbWlzZSB0byB0aGUgYXJ0ZWZhY3QgdGhhdCBoYXMgdGhlIGdpdmVuIGlkXG5cdFx0XHQgKi9cblx0XHRcdGFydGVmYWN0QnlJZChpZCkge1xuXHRcdFx0XHRyZXR1cm4gVS5nZXREZWYodGhpcy5yb290Ll9hcnRlZmFjdHNCeUlELCBpZCwgZGVmZXIpLnByb21pc2U7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogVHJhdmVyc2UgdGhlIEFydGVmYWN0IGhpZXJhcmNoeSB3aXRoIHRoaXMgYXMgcm9vdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gZm4geyhBcnRlZmFjdCkgPT4gQm9vbGVhbn0gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGFydGVmYWN0XG5cdFx0XHQgKi9cblx0XHRcdHRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0dmFyIHtvcmRlcn0gPSBvcHRpb25zO1xuXHRcdFx0XHRpZiAoIW9yZGVyKSB7IG9yZGVyID0gJ3ByZWZpeCcgfVxuXG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3ByZWZpeCcpIHsgZm4odGhpcykgfVxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0Y2hpbGQudHJhdmVyc2VBcnRlZmFjdHMoZm4sIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKG9yZGVyID09PSAncG9zdGZpeCcpIHsgZm4odGhpcykgfVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIFRyYXZlcnNlIHRoZSBBcnRlZmFjdCBoaWVyYXJjaHkgd2l0aCB0aGlzIGFzIHJvb3QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIGZuIHsoQXJ0ZWZhY3QpID0+IEJvb2xlYW59IC0gdGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBhcnRlZmFjdFxuXHRcdFx0ICovXG5cdFx0XHR0cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSh0eXBlLCBmbiwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciB7b3JkZXJ9ID0gb3B0aW9ucztcblx0XHRcdFx0aWYgKCFvcmRlcikgeyBvcmRlciA9ICdwcmVmaXgnIH1cblxuXHRcdFx0XHRpZiAob3JkZXIgPT09ICdwcmVmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkgeyBmbih0aGlzKSB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmJlZm9yZUdvaW5nSW4pIHsgb3B0aW9ucy5iZWZvcmVHb2luZ0luKHRoaXMpIH1cblx0XHRcdFx0dGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkuZm9yRWFjaCgoZGVzY2VuZGVudCkgPT4ge1xuXHRcdFx0XHRcdGRlc2NlbmRlbnQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKG9wdGlvbnMuYmVmb3JlR29pbmdPdXQpIHsgb3B0aW9ucy5iZWZvcmVHb2luZ091dCh0aGlzKSB9XG5cdFx0XHRcdGlmIChvcmRlciA9PT0gJ3Bvc3RmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkgeyBmbih0aGlzKSB9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgKHBhcmVudCwgcGFyZW50J3MgcGFyZW50LCAuLi4pXG5cdFx0XHQgKiBvZiB0aGlzIGFydGVmYWN0IHdpdGggdGhlIGdpdmVuIHR5cGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIHRoZSBnaXZlbiB0eXBlLCB1bmxlc3MgdGhlcmUgaXMgbm9uZVxuXHRcdFx0ICovXG5cdFx0XHRjbG9zZXN0QW5jZXN0b3JCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcztcblx0XHRcdFx0ZG8geyByZXN1bHQgPSByZXN1bHQucGFyZW50IH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgZGVzY2VuZGFudCAoY2hpbGRyZW4sIGNoaWxkcmVuJ3MgY2hpbGRyZW4sIC4uLilcblx0XHRcdCAqIG9mIHRoaXMgYXJ0ZWZhY3Qgd2l0aCB0aGUgZ2l2ZW4gdHlwZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnRzIG9mIHRoZSBnaXZlbiB0eXBlOyBub25lIG9mIHRoZW1cblx0XHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRlc2NlbmRhbnQgZnJvbSBhbnkgb3RoZXJcblx0XHRcdCAqL1xuXHRcdFx0Y2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogSW5kaWNhdGUgdGhhdCB0aGlzIGFydGVmYWN0IHdpbGwgbmV2ZXIgYmUgdXNlZCBhZ2FpbiwgYWxsb3dpbmcgaXRcblx0XHRcdCAqIHRvIGRvIGFueSBuZWNlc3NhcnkgY2xlYW51cC5cblx0XHRcdCAqL1xuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG5cdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHsgY2hpbGQuZGVzdHJveSgpIH0pO1xuXHRcdFx0fVxuXG5cdFx0fSkpO1xuXG5cblx0XHQvKioge0BmdW5jdGlvbiBBcnRlZmFjdC5uZXdTdWJjbGFzc31cblx0XHQgKiBBIHN0YXRpYyBjb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzdWJjbGFzcyBvZiB7QGxpbmsgQXJ0ZWZhY3R9LlxuXHRcdCAqL1xuXHRcdHdpbmRvdy5fYW15X0FydGVmYWN0Lm5ld1N1YmNsYXNzID0gZnVuY3Rpb24gbmV3U3ViQ2xhc3MobmFtZSwgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9LCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cdFx0XHRyZXR1cm4gZG0udnAobmFtZSwgVS5uZXdTdWJjbGFzcyh3aW5kb3cuX2FteV9BcnRlZmFjdCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBwcm9jZXNzIG9wdGlvbnMgKi9cblx0XHRcdFx0dmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQocHJvY2Vzc2VkT3B0aW9uc1trZXldKSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zLnR5cGUgPSBuYW1lO1xuXG5cdFx0XHRcdC8qIGNhbGwgc3VwZXItY29uc3RydWN0b3IgKi9cblx0XHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcblxuXHRcdFx0XHQvKiBjYWxsIHRoaXMgY29uc3RydWN0b3IgKi9cblx0XHRcdFx0Y29uc3RydWN0b3IuY2FsbCh0aGlzLCBwcm9jZXNzZWRPcHRpb25zKTtcblxuXHRcdFx0XHQvKiB0aGVuIHJ1biB0aGUgJ2NvbnN0cnVjdCcgbWV0aG9kICovXG5cdFx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdGVkKSB7IC8vIGNvbnN0cnVjdCBhc3luY2hyb25vdXNseVxuXHRcdFx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZSh0aGlzLmNvbnN0cnVjdChvcHRpb25zKSkucmV0dXJuKHRoaXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuY29uc3RydWN0KSkge1xuXHRcdFx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMuY29uc3RydWN0KG9wdGlvbnMpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHJlZ2lzdGVyIHRoaXMgYXJ0ZWZhY3QgdG8gdGhlIGNpcmN1aXRib2FyZCAqL1xuXHRcdFx0XHQodGhpcy5jb25zdHJ1Y3RlZCB8fCBQLnJlc29sdmUoKSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yb290Ll9yZWdpc3RlckFydGVmYWN0KHRoaXMpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0XHRnZXQgY2lyY3VpdGJvYXJkKCkge1xuXHRcdFx0XHRcdGlmICghdGhpcy5fY2lyY3VpdGJvYXJkKSB7IHRoaXMuX2NpcmN1aXRib2FyZCA9IHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKSB9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcblx0XHRcdFx0fVxuXHRcdFx0fSkpKTtcblx0XHR9O1xuXG5cblx0XHRyZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3Q7XG5cblxuXHR9KS50YXAoKGMpID0+IHsgJC5jaXJjdWl0Ym9hcmQuQXJ0ZWZhY3QgPSBjIH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQXJ0ZWZhY3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnLi9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbiAoJCwgVSwgS2VmaXIpIHtcblxuXG5cdC8qKiB7QGV4cG9ydH17QGNsYXNzIEtlZmlyU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBLZWZpci5qcy5cblx0ICovXG5cdHZhciBLZWZpclNpZ25hbEhhbmRsZXIgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEtlZmlyU2lnbmFsSGFuZGxlcigpIHtcblxuXHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuXG5cdH0sIC8qKiBAbGVuZHMgS2VmaXJTaWduYWxIYW5kbGVyLnByb3RvdHlwZSAqLyB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRGVjbGFyZXMgYSBuZXcgZXZlbnQgc3RyZWFtIGZvciB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgIG5hbWUgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQsIHVzZWQgdG8gdHJpZ2dlciBvciBzdWJzY3JpYmUgdG8gaXRcblx0XHQgKiBAcGFyYW0gIHtLZWZpci5TdHJlYW19IFtzb3VyY2VdIC0gYW5vdGhlciBldmVudCBzdHJlYW0gdG8gYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoaXMgZXZlbnRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLkJ1c30gLSB0aGUgY3JlYXRlZCBldmVudCBzdHJlYW1cblx0XHQgKi9cblx0XHRuZXdFdmVudChuYW1lLCB7c291cmNlfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBldmVudCBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGV2ZW50IHN0cmVhbSAqL1xuXHRcdFx0dmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuXHRcdFx0aWYgKHNvdXJjZSkgeyBidXMucGx1Zyhzb3VyY2UpIH1cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV0gPSBidXM7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0cmlldmUgYW4gZXZlbnQgc3RyZWFtIGJ5IG5hbWUuIElmIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgaXMgZ2l2ZW4sIGEgc3RyZWFtXG5cdFx0ICogYmFzZWQgb24gY2hhbmdlcyB0byB0aGF0IHByb3BlcnR5IGlzIHJldHVybmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5TdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHJldHVybiBpdCAqL1xuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXTtcblxuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhIHByb3BlcnR5IGJ5IG5hbWUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cdFx0LyoqIEBhbGlhcyBwcm9wZXJ0eSAqL1xuXHRcdHAobmFtZSkgeyByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXSB9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgZGVmaW5lcyBhIG5ldyBwcm9wZXJ0eSBvbiB0aGlzIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgIFtzZXR0YWJsZT10cnVlXSAtIHdoZXRoZXIgdGhlIHZhbHVlIGNhbiBiZSBtYW51YWxseSBzZXRcblx0XHQgKiBAcGFyYW0gIHsqfSAgICAgICAgICAgICAgICAgICAgICAgW2luaXRpYWxdICAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9uKCosKik6Qm9vbGVhbn0gICBbaXNFcXVhbF0gICAgICAgLSBhIHByZWRpY2F0ZSBmdW5jdGlvbiBieSB3aGljaCB0byB0ZXN0IGZvciBkdXBsaWNhdGUgdmFsdWVzXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0bmV3UHJvcGVydHkobmFtZSwge3NldHRhYmxlLCBpbml0aWFsLCBpc0VxdWFsfSA9IHt9KSB7XG5cblx0XHRcdC8qIGlzIHRoZSBwcm9wZXJ0eSBuYW1lIGFscmVhZHkgdGFrZW4/ICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblx0XHRcdFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBkZWZhdWx0IHZhbHVlIGZvciAnc2V0dGFibGUnICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChzZXR0YWJsZSkpIHsgc2V0dGFibGUgPSB0cnVlIH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBidXMgd2hpY2ggbWFuYWdlcyB0aGUgcHJvcGVydHkgKi9cblx0XHRcdHZhciBidXMgPSBLZWZpci5idXMoKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBwcm9wZXJ0eSBpdHNlbGYsIGFuZCBnaXZlIGl0IGFkZGl0aW9uYWwgbWV0aG9kcyAqL1xuXHRcdFx0dmFyIHByb3BlcnR5ID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXSA9IGJ1cy50b1Byb3BlcnR5KGluaXRpYWwpLnNraXBEdXBsaWNhdGVzKGlzRXF1YWwpO1xuXHRcdFx0cHJvcGVydHkucGx1ZyAgID0gKG9ic2VydmFibGUpID0+IHsgYnVzLnBsdWcob2JzZXJ2YWJsZSk7ICAgcmV0dXJuIHByb3BlcnR5IH07XG5cdFx0XHRwcm9wZXJ0eS51bnBsdWcgPSAob2JzZXJ2YWJsZSkgPT4geyBidXMudW5wbHVnKG9ic2VydmFibGUpOyByZXR1cm4gcHJvcGVydHkgfTtcblx0XHRcdHByb3BlcnR5LmdldCA9ICgpID0+IHByb3BlcnR5Ll9jdXJyZW50OyAvLyBUT0RPOiBhY2Nlc3NpbmcgcHJpdmF0ZSBmaWVsZCBvZiBLZWZpciBwcm9wZXJ0eTsgZG9uJ3Rcblx0XHRcdGlmIChzZXR0YWJsZSkge1xuXHRcdFx0XHRwcm9wZXJ0eS5zZXQgPSAodmFsdWUpID0+IHsgYnVzLmVtaXQodmFsdWUpOyByZXR1cm4gcHJvcGVydHkgfTtcblx0XHRcdH1cblxuXHRcdFx0LyogYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgb2JqZWN0IGludGVyZmFjZSAqL1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcblx0XHRcdFx0Z2V0OiBwcm9wZXJ0eS5nZXQsXG5cdFx0XHRcdHNldDogc2V0dGFibGUgPyBwcm9wZXJ0eS5zZXQgOiB1bmRlZmluZWRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBtYWtlIHRoZSBwcm9wZXJ0eSBhY3RpdmU7IGl0IGRvZXNuJ3Qgd29yayBpZiB0aGlzIGlzbid0IGRvbmUgKHRoZSBuYXR1cmUgb2YgS2VmaXIuanMpICovXG5cdFx0XHRwcm9wZXJ0eS5ydW4oKTtcblx0XHRcdHRoaXMuZXZlbnQoJ2Rlc3Ryb3knKS5vblZhbHVlKCgpID0+IHsgYnVzLmVuZCgpIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHByb3BlcnR5ICovXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVHJpZ2dlciBhbiBldmVudCBmb3IgYWxsIHN1YnNjcmliZXJzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byB0cmlnZ2VyXG5cdFx0ICogQHZhbHVlIHsqfSAgICAgIHZhbHVlIC0gdGhlIHZhbHVlIHRvIGF0dGFjaCB0byB0aGUgZXZlbnRcblx0XHQgKi9cblx0XHR0cmlnZ2VyKG5hbWUsIHZhbHVlKSB7XG5cblx0XHRcdC8qIGRvZXMgdGhlIGV2ZW50IHN0cmVhbSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0uZW1pdCh2YWx1ZSk7XG5cblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2VsZWN0cyBhbiBleGlzdGluZyBzdHJlYW0gb3IgcHJvcGVydHksIGFuZCB0aGVuXG5cdFx0ICogZWl0aGVyIHJldHVybnMgaXQsIG9yIGNyZWF0ZXMgYSBzdWJzY3JpcHRpb24gdG8gaXQsIGRlcGVuZGluZ1xuXHRcdCAqIG9uIHdoZXRoZXIgYSBjYWxsYmFjayBpcyBwcm92aWRlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IG9yIHByb3BlcnR5IHRvIHN1YnNjcmliZSB0b1xuXHRcdCAqIEBwYXJhbSB7Kn0gICAgICAgICAgICAgICAgW2V4cGVjdGVkVmFsdWVdICAgICAgIC0gaWYgcHJvdmlkZWQsIGZpbHRlcnMgdGhlIHN0cmVhbSBieSA9PT0gZXF1YWxpdHkgd2l0aCB0aGlzIHZhbHVlO1xuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAgLSBhIHBsYWluIG9iamVjdCBmb3IgcHJvdmlkaW5nIGFkZGl0aW9uYWwgb3B0aW9uc1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgW29wdGlvbnMub25jZT1mYWxzZV0gIC0gd2hldGhlciB0aGUgc3RyZWFtIGVuZHMgYWZ0ZXIgb25lIGV2ZW50XG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbigqKTp2b2lkfSBbY2FsbGJhY2tdICAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtLZWZpci5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dW5kZWZpbmVkfSAtIGlmIG5vIGBjYWxsYmFja2AgaXMgcHJvdmlkZWQsIHRoZSBzcGVjaWZpZWQgZXZlbnQgc3RyZWFtXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBwcm9wZXJ0eTsgb3RoZXJ3aXNlLCBhIGZ1bmN0aW9uIHRvIHVuc3Vic2NyaWJlIHRvIHNhaWRcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0tlZmlyLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3MgY2FsbGJhY2sgKi9cblx0XHRcdGlmIChjYWxsYmFjaykgeyByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjaykgfVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogUHJvY2VzcyB0aGUgYXJndW1lbnRzIGFjY2VwdGVkIGJ5IHtAbGluayBvbn0uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0X2dhdGhlck9uQXJndW1lbnRzKC4uLmFyZ3MpIHtcblx0XHRcdHZhciByZXN1bHQgPSB7IG5hbWU6IGFyZ3Muc2hpZnQoKSB9O1xuXG5cdFx0XHQvKiB0ZXN0IGZvciBleHBlY3RlZCB2YWx1ZSBhcmd1bWVudCAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmICFVLmlzRnVuY3Rpb24oYXJnc1swXSkgJiYgIVUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuZXhwZWN0ZWRWYWx1ZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGVzdCBmb3IgY2FsbGJhY2sgZnVuY3Rpb24gKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzRnVuY3Rpb24oYXJnc1swXSkpIHtcblx0XHRcdFx0cmVzdWx0LmNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdH0pO1xuXG5cblx0cmV0dXJuIEtlZmlyU2lnbmFsSGFuZGxlcjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanNcbiAqKi8iLCJkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfbmV4dElkID0gMDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG5cdFx0cmV0dXJuIGAke3ByZWZpeHx8XCJ1bmlxdWUtaWRcIn0tJHtfbmV4dElkKyt9YDtcblx0fTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdkZWx0YS1qcycgXSwgZnVuY3Rpb24gKFAsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIGFscmVhZHkgY2FjaGVkPyAqL1xuXHRpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwpIHsgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsIH1cblxuXG5cdC8qIHRlbGwgZGVsdGEuanMgYWJvdXQgYmx1ZWJpcmQgKi9cblx0RE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcblxuXG5cdC8qIHNldCB0aGUgY2FjaGUgKi9cblx0d2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgPSBuZXcgRE0oKTtcblxuXG5cdC8qIHJldHVybiB0aGUgZGVsdGEgbW9kZWwgdGhhdCBtYW5hZ2VzIGFsbCBwbHVnaW5zICg9IGRlbHRhcykgKi9cblx0cmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9tYWluLWRlbHRhLW1vZGVsLmpzXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL21pc2MuanMnLFxuXHQnLi9rZWZpci1zaWduYWwtaGFuZGxlci5qcycsXG5cdCcuL2RlZmVyLmpzJyxcblx0Jy4vbWFpbi1kZWx0YS1tb2RlbC5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBVLCBTaWduYWxIYW5kbGVyLCBkZWZlciwgZG0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0aWYgKCF3aW5kb3cuX2FteVBsdWdpbikge1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luID0gZnVuY3Rpb24gKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG5cdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuXG5cdFx0XHRcdC8qIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlZ2lzdGVyIGEgbmV3IHBsdWdpbiAqL1xuXHRcdFx0XHRyZXR1cm4gbmV3IGRtLkRlbHRhKHBsdWdpbk9yU2VsZWN0aW9uLm5hbWUsIHBsdWdpbk9yU2VsZWN0aW9uKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRVLmFzc2VydCghX3NlbGVjdGVkRGVmZXJyZWQuZG9uZSxcblx0XHRcdFx0XHRcdGBBcGlOQVRPTVkgcGx1Z2lucyBjYW4gb25seSBiZSBzZWxlY3RlZCBvbmNlLCBhZnRlciB3aGljaCB0aGV5IGFyZSBmaXhlZC5gKTtcblx0XHRcdFx0X3NlbGVjdGVkRGVmZXJyZWQuZG9uZSA9IHRydWU7XG5cblx0XHRcdFx0LyogdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2VsZWN0IHBsdWdpbnMgdG8gYmUgYXBwbGllZCAqL1xuXHRcdFx0XHRkbS5zZWxlY3QuYXBwbHkoZG0sIHBsdWdpbk9yU2VsZWN0aW9uKTtcblx0XHRcdFx0X3NlbGVjdGVkRGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcblxuXHRcdFx0XHRyZXR1cm4gd2luZG93Ll9hbXlQbHVnaW4uc2VsZWN0ZWQ7XG5cblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciBfc2VsZWN0ZWREZWZlcnJlZCA9IGRlZmVyKCk7XG5cdFx0d2luZG93Ll9hbXlQbHVnaW4uc2VsZWN0ZWQgPSBfc2VsZWN0ZWREZWZlcnJlZC5wcm9taXNlO1xuXHRcdHdpbmRvdy5fYW15UGx1Z2luLmdyYXBoID0gKCkgPT4gZG0uZ3JhcGgoKTtcblx0XHR3aW5kb3cuX2FteVBsdWdpbi5kbSA9IGRtO1xuXHR9XG5cblxuXHRyZXR1cm4gd2luZG93Ll9hbXlQbHVnaW47XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3BsdWdpbi5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9kZWZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzIn0=