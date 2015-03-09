(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs", "kefir-jquery", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_17__) {
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
	    requires: ['three-d', 'three-d-spinner']
	  });
	  plugin.add('Circuitboard.threeJsLoaders', {});
	  plugin.insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    var threeDModels = this.circuitboard.options.threeDModels;
	    if (threeDModels && threeDModels[this.model.id]) {
	      this.threeDModels = {};
	      ThreeDModelP.then((function(ThreeDModel) {
	        Object.keys(threeDModels[$__0.model.id]).forEach((function(modelID) {
	          var clock = new THREE.Clock();
	          var clockStream = Kefir.animationFrames().map((function() {
	            return clock.getElapsedTime();
	          }));
	          var model = $__0.threeDModels[modelID] = new ThreeDModel(U.extend({}, threeDModels[$__0.model.id][modelID], {
	            id: modelID,
	            parent: $__0,
	            clock: clockStream,
	            visible: false
	          }));
	          model.object3D.then((function(object) {
	            $__0.object3D.add(object);
	            $__0.p('size').onValue((function(size) {
	              $__0.threeDModels[modelID].adaptToSurfaceArea(size);
	            }));
	          }));
	          model.p('visible').value(true).take(1).onValue((function() {
	            $__0.loadingIndicator({until: model.object3D});
	          }));
	        }));
	      }));
	    }
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(3), __webpack_require__(4), __webpack_require__(10), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Kefir, ArtefactP, defer) {
	  'use strict';
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
	        var part = new window._amy_ThreeDModel(newChildOptions);
	      }));
	      if (this.rootThreeDModel === this) {
	        this.p('visible').value(true).take(1).onValue((function() {
	          var worker = new Worker(__webpack_require__(12));
	          worker.postMessage({
	            type: 'filenames',
	            filenames: Object.keys($__0._fileNamesToArtefacts())
	          });
	          worker.addEventListener('message', (function($__3) {
	            var $__5 = $__3.data,
	                file = $__5.file,
	                type = $__5.type,
	                buffers = $__5.buffers,
	                boundingBox = $__5.boundingBox,
	                center = $__5.center;
	            var artefact = $__0._fileNamesToArtefacts()[file];
	            if (!artefact._geometry) {
	              artefact._geometry = new THREE.BufferGeometry();
	            }
	            var geometry = artefact._geometry;
	            switch (type) {
	              case 'vertices':
	                {
	                  geometry.morphTargets.push({
	                    name: (file + ":" + type + ":" + geometry.morphTargets.length),
	                    vertices: vertices
	                  });
	                }
	                break;
	              case 'normals':
	                {}
	                break;
	              case 'faces':
	                {}
	                break;
	              case 'morph-vertices':
	                {}
	                break;
	              case 'morph-normals':
	                {}
	                break;
	            }
	            $__0._geometry3DDeferred.resolve(geometry);
	          }));
	        }));
	      }
	      this.object3D.then((function(object3D) {
	        $__0.p('visible').merge($__0.on('destroy').mapTo(false)).onValue((function(visible) {
	          object3D.visible = visible;
	        }));
	      }));
	    }, {
	      _fileNamesToArtefacts: function() {
	        var result = {};
	        if (U.isDefined(this.options.file)) {
	          result[this.options.file] = this;
	        }
	        this.children.forEach((function(child) {
	          U.extend(result, child._fileNamesToArtefacts());
	        }));
	        return result;
	      },
	      get _geometry3DDeferred() {
	        if (!this.__geometry3DDeferred) {
	          this.__geometry3DDeferred = defer();
	        }
	        return this.__geometry3DDeferred;
	      },
	      get geometry3D() {
	        if (!this._geometry3D) {
	          this._geometry3D = this._geometry3DDeferred.promise;
	          if (!U.isDefined(this.options.file)) {
	            this._geometry3DDeferred.resolve(null);
	          }
	        }
	        return this._geometry3D;
	      },
	      get object3D() {
	        var $__0 = this;
	        if (!this._object3D) {
	          this._object3D = new P((function(resolve, reject) {
	            if (U.isDefined($__0.options.file)) {
	              $__0.geometry3D.then((function(geometry3D) {
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
	              })).then(resolve, reject);
	            } else {
	              var object = new THREE.Object3D();
	              $__0.children.map((function(part) {
	                return part.object3D;
	              })).forEach((function(partObjectP) {
	                partObjectP.then((function(partObject) {
	                  object.add(partObject);
	                }));
	              }));
	              P.all($__0.children.map((function(part) {
	                return part.object3D;
	              }))).each((function(subObject) {
	                object.add(subObject);
	              })).return(object).then(resolve, reject);
	            }
	          }));
	        }
	        return this._object3D;
	      },
	      adaptToSurfaceArea: function(surfaceSize) {
	        var $__0 = this;
	        U.assert(this.rootThreeDModel === this, "The 'adaptToSurfaceArea' method should only be called on a root ThreeDModel.");
	        this.object3D.then((function(obj) {
	          var $__1;
	          var boundingBox = obj.userData.boundingBox;
	          var objWidth = boundingBox.size().x;
	          var objHeight = boundingBox.size().y;
	          if ((surfaceSize.width < surfaceSize.height) !== (objWidth < objHeight)) {
	            obj.rotation.z = 0.5 * Math.PI;
	            ($__1 = [objHeight, objWidth], objWidth = $__1[0], objHeight = $__1[1], $__1);
	          } else {
	            obj.rotation.z = 0;
	          }
	          var ratio = 0.8 * Math.min(surfaceSize.width / objWidth, surfaceSize.height / objHeight);
	          obj.scale.set(ratio, ratio, ratio);
	          var elevation = U.defOr($__0.options.elevation, Math.min(surfaceSize.width, surfaceSize.height) / 4);
	          obj.position.z = 0.5 * ratio * boundingBox.size().z + elevation;
	        }));
	      },
	      _loadGeometryFromFile: function() {
	        return new P((function() {}));
	      }
	    }, {visible: false});
	    window._amy_ThreeDModel.loaders = {};
	    return window._amy_ThreeDModel;
	  })).tap((function(c) {
	    $.circuitboard.ThreeDModel = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, dm, plugin, defer) {
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


/***/ },
/* 11 */
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ab0ccc0c7a8b93bf157eda17ca8708d8.js"

/***/ },
/* 13 */
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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(13), __webpack_require__(11), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, SignalHandler, defer, dm) {
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NGRmZWMzZGM5NmIzZDU0Yzc2NSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia2VmaXItanF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FydGVmYWN0LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2RlZmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9UaHJlZURNb2RlbC13b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21haW4tZGVsdGEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvcGx1Z2luLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILCtDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCwrRUFBOEU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0Esb0NBQW1DLHNCQUFzQjtBQUN6RCxZQUFXO0FBQ1gsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSCxFQUFDOzs7Ozs7O0FDckNELGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0Esa0VBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFD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QUNULFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFFBQU8sY0FBYyxjQUFjO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztpRUMzS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDZkQsK0U7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsK0RBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7Ozs7aUVDMUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDTkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ3RCRCxpRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImJsdWViaXJkXCIsIFwia2VmaXJcIiwgXCJ0d2VlbmpzXCIsIFwia2VmaXItanF1ZXJ5XCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIiksIHJlcXVpcmUoXCJkZWx0YS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJLZWZpclwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wia2VmaXItanF1ZXJ5XCJdLCByb290W1wiRGVsdGFNb2RlbFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NGRmZWMzZGM5NmIzZDU0Yzc2NVxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICd0aHJlZS1qcycsICdibHVlYmlyZCcsICcuL3V0aWwva2VmaXItYW5kLWVnZ3MuanMnLCAnLi91dGlsL21pc2MuanMnLCAnLi9UaHJlZURNb2RlbC5qcyddLCBmdW5jdGlvbigkLCBUSFJFRSwgUCwgS2VmaXIsIFUsIFRocmVlRE1vZGVsUCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuICAgIG5hbWU6ICd0aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMnLFxuICAgIHJlcXVpcmVzOiBbJ3RocmVlLWQnLCAndGhyZWUtZC1zcGlubmVyJ11cbiAgfSk7XG4gIHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycycsIHt9KTtcbiAgcGx1Z2luLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHZhciB0aHJlZURNb2RlbHMgPSB0aGlzLmNpcmN1aXRib2FyZC5vcHRpb25zLnRocmVlRE1vZGVscztcbiAgICBpZiAodGhyZWVETW9kZWxzICYmIHRocmVlRE1vZGVsc1t0aGlzLm1vZGVsLmlkXSkge1xuICAgICAgdGhpcy50aHJlZURNb2RlbHMgPSB7fTtcbiAgICAgIFRocmVlRE1vZGVsUC50aGVuKChmdW5jdGlvbihUaHJlZURNb2RlbCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aHJlZURNb2RlbHNbJF9fMC5tb2RlbC5pZF0pLmZvckVhY2goKGZ1bmN0aW9uKG1vZGVsSUQpIHtcbiAgICAgICAgICB2YXIgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICAgICAgICB2YXIgY2xvY2tTdHJlYW0gPSBLZWZpci5hbmltYXRpb25GcmFtZXMoKS5tYXAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHZhciBtb2RlbCA9ICRfXzAudGhyZWVETW9kZWxzW21vZGVsSURdID0gbmV3IFRocmVlRE1vZGVsKFUuZXh0ZW5kKHt9LCB0aHJlZURNb2RlbHNbJF9fMC5tb2RlbC5pZF1bbW9kZWxJRF0sIHtcbiAgICAgICAgICAgIGlkOiBtb2RlbElELFxuICAgICAgICAgICAgcGFyZW50OiAkX18wLFxuICAgICAgICAgICAgY2xvY2s6IGNsb2NrU3RyZWFtLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgbW9kZWwub2JqZWN0M0QudGhlbigoZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICAkX18wLm9iamVjdDNELmFkZChvYmplY3QpO1xuICAgICAgICAgICAgJF9fMC5wKCdzaXplJykub25WYWx1ZSgoZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICAgICAgICAkX18wLnRocmVlRE1vZGVsc1ttb2RlbElEXS5hZGFwdFRvU3VyZmFjZUFyZWEoc2l6ZSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIG1vZGVsLnAoJ3Zpc2libGUnKS52YWx1ZSh0cnVlKS50YWtlKDEpLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJF9fMC5sb2FkaW5nSW5kaWNhdG9yKHt1bnRpbDogbW9kZWwub2JqZWN0M0R9KTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uKCQsIFUsIEtlZmlyLCBUV0VFTikge1xuICByZXF1aXJlKCdrZWZpci1qcXVlcnknKS5pbml0KEtlZmlyLCAkKTtcbiAgS2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvYmoub24oZXZlbnROYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG4gIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAoKGZ1bmN0aW9uKGYpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICB9KSk7XG4gIEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCk7XG4gICAgICAgICAgaWYgKHN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGlvbkZuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsICRfXzEpIHtcbiAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgIGR1cmF0aW9uID0gJF9fMi5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSAkX18yLmRlbGF5LFxuICAgICAgICBlYXNpbmcgPSAkX18yLmVhc2luZztcbiAgICB2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICB2YXIgYWRkU3RyZWFtID0gKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBjaGFpbmVkU3RyZWFtcyArPSAxO1xuICAgICAgICBidXMucGx1ZyhzdHJlYW0pO1xuICAgICAgICBzdHJlYW0ub25FbmQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNoYWluZWRTdHJlYW1zIC09IDE7XG4gICAgICAgICAgaWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7XG4gICAgICAgICAgICBidXMuZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9KSkoKTtcbiAgICBhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgaWYgKGVhc2luZykge1xuICAgICAgICB0dy5lYXNpbmcoZWFzaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWxheSkge1xuICAgICAgICB0dy5kZWxheShkZWxheSk7XG4gICAgICB9XG4gICAgICB0dy5vblVwZGF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG4gICAgICB0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcbiAgICB9KSkpO1xuICAgIGJ1cy50d2VlbiA9IHR3O1xuICAgIGJ1cy5zdGFydCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHR3LnN0YXJ0KCk7XG4gICAgICByZXR1cm4gYnVzO1xuICAgIH0pO1xuICAgIGJ1cy5jaGFpbiA9IChmdW5jdGlvbihvdGhlcikge1xuICAgICAgYWRkU3RyZWFtKG90aGVyKTtcbiAgICAgIHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1cztcbiAgfTtcbiAgS2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG4gICAgcmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICBlbWl0dGVyLmVuZCgpO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcpIHtcbiAgICB2YXIgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBVLmNhbGw7XG4gICAgdmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBvcGVuID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIGNsb3NlID0gS2VmaXIuYnVzKCk7XG4gICAgcGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVyKChmdW5jdGlvbigpIHtcbiAgICAgICAgb3Blbi5lbWl0KCk7XG4gICAgICAgIHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcbiAgICAgICAgY2xvc2UuZW1pdCgpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgYnVmZmVyID0gKGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSkuYnVmZmVyO1xuICAgICAgd2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcbiAgICAgIHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY2N1bXVsYXRvciA9IChmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICAgIHJldHVybiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuICAgIHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgIHZhciB1bnN1YnNjcmliZVRvVGhpcyA9ICRfXzAub25WYWx1ZSgoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgb2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1RoaXMoKTtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1BhY2luZygpO1xuICAgICAgICBidWZmZXIgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSA9PT0gdmFsdWU7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdmFyIGRvTm90aGluZyA9IChmdW5jdGlvbigpIHt9KTtcbiAgICB0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5vZmZWYWx1ZShkb05vdGhpbmcpO1xuICAgIH0pO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChmdW5jdGlvbihldmVudCkge1xuICAgICAgcmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG4gICAgfSkpLm1hcCgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24oYnV0dG9uSWQpIHtcbiAgICB2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6ICgoZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIGIgPT09IGJ1dHRvbklkO1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBwcmVkKGUud2hpY2gpO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICBzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKS5tYXAoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgIG1vdXNlRG93bkV2ZW50OiBtb3VzZURvd25FdmVudCxcbiAgICAgICAgICBtb3VzZU1vdmVFdmVudDogbW91c2VNb3ZlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSAoYXJndW1lbnRzWzBdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1swXSA6IHt9KS50aHJlc2hvbGQ7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgoZnVuY3Rpb24obW91c2VEb3duRXZlbnQpIHtcbiAgICAgIHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICB1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICBpZiAoY3Jvc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG4gICAgICAgICAgdmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjcm9zc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG4gIH07XG4gIHJldHVybiBLZWZpcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKGZ1bmN0aW9uKFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgVSA9IHtcbiAgICBuZXdDbGFzczogZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIG5ld1N1YmNsYXNzOiBmdW5jdGlvbihzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgZXh0ZW5kOiBmdW5jdGlvbihvYmoxKSB7XG4gICAgICBmb3IgKHZhciByZXN0ID0gW10sXG4gICAgICAgICAgJF9fMSA9IDE7ICRfXzEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18xKyspXG4gICAgICAgIHJlc3RbJF9fMSAtIDFdID0gYXJndW1lbnRzWyRfXzFdO1xuICAgICAgcmVzdC5mb3JFYWNoKChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIG9iajE7XG4gICAgfSxcbiAgICBmaWVsZDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FsbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18yID0gMTsgJF9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzIrKylcbiAgICAgICAgYXJnc1skX18yIC0gMV0gPSBhcmd1bWVudHNbJF9fMl07XG4gICAgICByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9LFxuICAgIGlkOiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9LFxuICAgIGdldERlZjogZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSk7XG4gICAgfSxcbiAgICBhcnJheTogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSk7XG4gICAgfSxcbiAgICBwdWxsOiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgdmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWtlRW1wdHk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgd2hpbGUgKGFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRBOiBmdW5jdGlvbihmbiwgY3R4LCBhcmdzKSB7XG4gICAgICByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKG9iaiwgbSkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzMgPSAyOyAkX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMysrKVxuICAgICAgICBhcmdzWyRfXzMgLSAyXSA9IGFyZ3VtZW50c1skX18zXTtcbiAgICAgIHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKTtcbiAgICB9LFxuICAgIGFwcGx5Q29uc3RydWN0b3I6IGZ1bmN0aW9uKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcbiAgICAgIHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG4gICAgfSxcbiAgICBhc3NlcnQ6IGZ1bmN0aW9uKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNEZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH0sXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuICAgIG9ialZhbHVlczogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBtYWtlUG9zaXRpb25lZDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZk9yOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIHZhbHVlcyA9IFtdLFxuICAgICAgICAgICRfXzQgPSAwOyAkX180IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNCsrKVxuICAgICAgICB2YWx1ZXNbJF9fNF0gPSBhcmd1bWVudHNbJF9fNF07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZW91dDtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICB2YXIgbGF0ZXJGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgJF9fMCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG9uY2VQZXJTdGFjazogZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgICAgdmFyIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIGlmIChub3RSdW5ZZXQpIHtcbiAgICAgICAgICBub3RSdW5ZZXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICAgICAgfSksIDApO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbigkX182KSB7XG4gICAgICB2YXIgJF9fNyA9ICRfXzYsXG4gICAgICAgICAgcmV0cmlldmUgPSAkX183LnJldHJpZXZlLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX183LmlzRXF1YWw7XG4gICAgICBpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhID09PSBiKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciBjYWNoZTtcbiAgICAgIGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuICAgICAgICBpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuICAgICAgICAgIGNhY2hlID0gbmV3VmFsdWU7XG4gICAgICAgICAgb25DaGFuZ2UuZm9yRWFjaCgoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG4gICAgICB2YXIgcmVzdWx0Rm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9uQ2hhbmdlID0gW107XG4gICAgICByZXN1bHRGbi5vbkNoYW5nZSA9IChmdW5jdGlvbihjYikge1xuICAgICAgICBvbkNoYW5nZS5wdXNoKGNiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgICAgfSk7XG4gICAgICByZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG4gICAgICB9KTtcbiAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgfSxcbiAgICBwcm9taXNpZnk6IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHJldHVybiBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24oYXJyYXksIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBtZW1vaXplOiBmdW5jdGlvbihmbikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGtleS5ldmVyeSgoZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGFyZ3NbaV07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGtleXMucHVzaChhcmdzKTtcbiAgICAgICAgY2FjaGUucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIHZhciBFUFMgPSAwLjAwMDAwMTtcbiAgdmFyIHNvcnRPZkVxdWFsID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcbiAgfSk7XG4gIFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH0pO1xuICBVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcbiAgfSk7XG4gIFUuUG9zaXRpb24uZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG4gIH0pO1xuICBVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKGhlaWdodCwgd2lkdGgpIHtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH0pO1xuICBVLlNpemUuZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcbiAgfSk7XG4gIHJldHVybiBVO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAndGhyZWUtanMnLCAnLi91dGlsL21pc2MuanMnLCAnYmx1ZWJpcmQnLCAnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJywgJy4vQXJ0ZWZhY3QuanMnLCAnLi91dGlsL2RlZmVyLmpzJ10sIGZ1bmN0aW9uKCQsIFRIUkVFLCBVLCBQLCBLZWZpciwgQXJ0ZWZhY3RQLCBkZWZlcikge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBBcnRlZmFjdFAudGhlbigoZnVuY3Rpb24oQXJ0ZWZhY3QpIHtcbiAgICBpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfVGhyZWVETW9kZWwpKSB7XG4gICAgICByZXR1cm4gd2luZG93Ll9hbXlfVGhyZWVETW9kZWw7XG4gICAgfVxuICAgIHZhciBUaHJlZURNb2RlbCA9IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ1RocmVlRE1vZGVsJywgZnVuY3Rpb24gVGhyZWVETW9kZWwoJF9fMSkge1xuICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgIHJvb3RUaHJlZURNb2RlbCA9ICRfXzIucm9vdFRocmVlRE1vZGVsLFxuICAgICAgICAgIHZpc2libGUgPSAkX18yLnZpc2libGUsXG4gICAgICAgICAgZmlsZSA9ICRfXzIuZmlsZSxcbiAgICAgICAgICBwYXJ0cyA9ICRfXzIucGFydHM7XG4gICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICBpZiAoVS5pc1VuZGVmaW5lZChyb290VGhyZWVETW9kZWwpKSB7XG4gICAgICAgIHJvb3RUaHJlZURNb2RlbCA9IHRoaXM7XG4gICAgICB9XG4gICAgICB0aGlzLnJvb3RUaHJlZURNb2RlbCA9IHJvb3RUaHJlZURNb2RlbDtcbiAgICAgIHRoaXMubmV3UHJvcGVydHkoJ3Zpc2libGUnLCB7aW5pdGlhbDogdmlzaWJsZX0pO1xuICAgICAgdGhpcy5uZXdQcm9wZXJ0eSgnaGlkZGVuJykucGx1Zyh0aGlzLnAoJ3Zpc2libGUnKS5ub3QoKSk7XG4gICAgICB0aGlzLnAoJ3Zpc2libGUnKS5wbHVnKHRoaXMucCgnaGlkZGVuJykubm90KCkpO1xuICAgICAgT2JqZWN0LmtleXMocGFydHMgfHwge30pLm1hcCgoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIG5ld0NoaWxkT3B0aW9ucyA9IFUuZXh0ZW5kKHt9LCBwYXJ0c1tpZF0sIHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgcGFyZW50OiAkX18wLFxuICAgICAgICAgIHZpc2libGU6IHZpc2libGUsXG4gICAgICAgICAgcm9vdFRocmVlRE1vZGVsOiAkX18wLnJvb3RUaHJlZURNb2RlbFxuICAgICAgICB9KTtcbiAgICAgICAgWydjb2xvcicsICdhbmltYXRpb24nLCAnY2xvY2snXS5mb3JFYWNoKChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgaWYgKFUuaXNVbmRlZmluZWQobmV3Q2hpbGRPcHRpb25zW3Byb3BdKSkge1xuICAgICAgICAgICAgbmV3Q2hpbGRPcHRpb25zW3Byb3BdID0gJF9fMC5vcHRpb25zW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICB2YXIgcGFydCA9IG5ldyB3aW5kb3cuX2FteV9UaHJlZURNb2RlbChuZXdDaGlsZE9wdGlvbnMpO1xuICAgICAgfSkpO1xuICAgICAgaWYgKHRoaXMucm9vdFRocmVlRE1vZGVsID09PSB0aGlzKSB7XG4gICAgICAgIHRoaXMucCgndmlzaWJsZScpLnZhbHVlKHRydWUpLnRha2UoMSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIocmVxdWlyZSgnZmlsZSEuL1RocmVlRE1vZGVsLXdvcmtlci5qcycpKTtcbiAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ2ZpbGVuYW1lcycsXG4gICAgICAgICAgICBmaWxlbmFtZXM6IE9iamVjdC5rZXlzKCRfXzAuX2ZpbGVOYW1lc1RvQXJ0ZWZhY3RzKCkpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZnVuY3Rpb24oJF9fMykge1xuICAgICAgICAgICAgdmFyICRfXzUgPSAkX18zLmRhdGEsXG4gICAgICAgICAgICAgICAgZmlsZSA9ICRfXzUuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlID0gJF9fNS50eXBlLFxuICAgICAgICAgICAgICAgIGJ1ZmZlcnMgPSAkX181LmJ1ZmZlcnMsXG4gICAgICAgICAgICAgICAgYm91bmRpbmdCb3ggPSAkX181LmJvdW5kaW5nQm94LFxuICAgICAgICAgICAgICAgIGNlbnRlciA9ICRfXzUuY2VudGVyO1xuICAgICAgICAgICAgdmFyIGFydGVmYWN0ID0gJF9fMC5fZmlsZU5hbWVzVG9BcnRlZmFjdHMoKVtmaWxlXTtcbiAgICAgICAgICAgIGlmICghYXJ0ZWZhY3QuX2dlb21ldHJ5KSB7XG4gICAgICAgICAgICAgIGFydGVmYWN0Ll9nZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGdlb21ldHJ5ID0gYXJ0ZWZhY3QuX2dlb21ldHJ5O1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2VzJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBnZW9tZXRyeS5tb3JwaFRhcmdldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IChmaWxlICsgXCI6XCIgKyB0eXBlICsgXCI6XCIgKyBnZW9tZXRyeS5tb3JwaFRhcmdldHMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ25vcm1hbHMnOlxuICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2ZhY2VzJzpcbiAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtb3JwaC12ZXJ0aWNlcyc6XG4gICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbW9ycGgtbm9ybWFscyc6XG4gICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRfXzAuX2dlb21ldHJ5M0REZWZlcnJlZC5yZXNvbHZlKGdlb21ldHJ5KTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub2JqZWN0M0QudGhlbigoZnVuY3Rpb24ob2JqZWN0M0QpIHtcbiAgICAgICAgJF9fMC5wKCd2aXNpYmxlJykubWVyZ2UoJF9fMC5vbignZGVzdHJveScpLm1hcFRvKGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24odmlzaWJsZSkge1xuICAgICAgICAgIG9iamVjdDNELnZpc2libGUgPSB2aXNpYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9KSk7XG4gICAgfSwge1xuICAgICAgX2ZpbGVOYW1lc1RvQXJ0ZWZhY3RzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICBpZiAoVS5pc0RlZmluZWQodGhpcy5vcHRpb25zLmZpbGUpKSB7XG4gICAgICAgICAgcmVzdWx0W3RoaXMub3B0aW9ucy5maWxlXSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIFUuZXh0ZW5kKHJlc3VsdCwgY2hpbGQuX2ZpbGVOYW1lc1RvQXJ0ZWZhY3RzKCkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgZ2V0IF9nZW9tZXRyeTNERGVmZXJyZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2dlb21ldHJ5M0REZWZlcnJlZCkge1xuICAgICAgICAgIHRoaXMuX19nZW9tZXRyeTNERGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2VvbWV0cnkzRERlZmVycmVkO1xuICAgICAgfSxcbiAgICAgIGdldCBnZW9tZXRyeTNEKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2dlb21ldHJ5M0QpIHtcbiAgICAgICAgICB0aGlzLl9nZW9tZXRyeTNEID0gdGhpcy5fZ2VvbWV0cnkzRERlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgaWYgKCFVLmlzRGVmaW5lZCh0aGlzLm9wdGlvbnMuZmlsZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2dlb21ldHJ5M0REZWZlcnJlZC5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZ2VvbWV0cnkzRDtcbiAgICAgIH0sXG4gICAgICBnZXQgb2JqZWN0M0QoKSB7XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl9vYmplY3QzRCkge1xuICAgICAgICAgIHRoaXMuX29iamVjdDNEID0gbmV3IFAoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKFUuaXNEZWZpbmVkKCRfXzAub3B0aW9ucy5maWxlKSkge1xuICAgICAgICAgICAgICAkX18wLmdlb21ldHJ5M0QudGhlbigoZnVuY3Rpb24oZ2VvbWV0cnkzRCkge1xuICAgICAgICAgICAgICAgIHZhciAkX18xID0gJF9fMC5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24gPSAkX18xLmFuaW1hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSAkX18xLmNvbG9yO1xuICAgICAgICAgICAgICAgIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtjb2xvcjogY29sb3IgfHwgJ3doaXRlJ30pO1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuICAgICAgICAgICAgICAgIHZhciBvYmplY3Q7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgb2JqZWN0ID0gbmV3IFRIUkVFLk1vcnBoQW5pbU1lc2goZ2VvbWV0cnkzRCwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgb2JqZWN0LmR1cmF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubW9ycGhUYXJnZXRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHZhciBjbG9jayA9ICRfXzAub3B0aW9ucy5jbG9jaztcbiAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgICAgICAgICAgICAgICBjbG9jay50YWtlVW50aWxCeSgkX18wLmV2ZW50KCdkZXN0cm95JykpLm9uVmFsdWUoKGZ1bmN0aW9uKHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnVwZGF0ZUFuaW1hdGlvbigxMDAwICogKHRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0VGltZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5M0QsIG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgfSkpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgICAgICAgJF9fMC5jaGlsZHJlbi5tYXAoKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydC5vYmplY3QzRDtcbiAgICAgICAgICAgICAgfSkpLmZvckVhY2goKGZ1bmN0aW9uKHBhcnRPYmplY3RQKSB7XG4gICAgICAgICAgICAgICAgcGFydE9iamVjdFAudGhlbigoZnVuY3Rpb24ocGFydE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgb2JqZWN0LmFkZChwYXJ0T2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgUC5hbGwoJF9fMC5jaGlsZHJlbi5tYXAoKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydC5vYmplY3QzRDtcbiAgICAgICAgICAgICAgfSkpKS5lYWNoKChmdW5jdGlvbihzdWJPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QuYWRkKHN1Yk9iamVjdCk7XG4gICAgICAgICAgICAgIH0pKS5yZXR1cm4ob2JqZWN0KS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3QzRDtcbiAgICAgIH0sXG4gICAgICBhZGFwdFRvU3VyZmFjZUFyZWE6IGZ1bmN0aW9uKHN1cmZhY2VTaXplKSB7XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgVS5hc3NlcnQodGhpcy5yb290VGhyZWVETW9kZWwgPT09IHRoaXMsIFwiVGhlICdhZGFwdFRvU3VyZmFjZUFyZWEnIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSByb290IFRocmVlRE1vZGVsLlwiKTtcbiAgICAgICAgdGhpcy5vYmplY3QzRC50aGVuKChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICB2YXIgJF9fMTtcbiAgICAgICAgICB2YXIgYm91bmRpbmdCb3ggPSBvYmoudXNlckRhdGEuYm91bmRpbmdCb3g7XG4gICAgICAgICAgdmFyIG9ialdpZHRoID0gYm91bmRpbmdCb3guc2l6ZSgpLng7XG4gICAgICAgICAgdmFyIG9iakhlaWdodCA9IGJvdW5kaW5nQm94LnNpemUoKS55O1xuICAgICAgICAgIGlmICgoc3VyZmFjZVNpemUud2lkdGggPCBzdXJmYWNlU2l6ZS5oZWlnaHQpICE9PSAob2JqV2lkdGggPCBvYmpIZWlnaHQpKSB7XG4gICAgICAgICAgICBvYmoucm90YXRpb24ueiA9IDAuNSAqIE1hdGguUEk7XG4gICAgICAgICAgICAoJF9fMSA9IFtvYmpIZWlnaHQsIG9ialdpZHRoXSwgb2JqV2lkdGggPSAkX18xWzBdLCBvYmpIZWlnaHQgPSAkX18xWzFdLCAkX18xKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqLnJvdGF0aW9uLnogPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcmF0aW8gPSAwLjggKiBNYXRoLm1pbihzdXJmYWNlU2l6ZS53aWR0aCAvIG9ialdpZHRoLCBzdXJmYWNlU2l6ZS5oZWlnaHQgLyBvYmpIZWlnaHQpO1xuICAgICAgICAgIG9iai5zY2FsZS5zZXQocmF0aW8sIHJhdGlvLCByYXRpbyk7XG4gICAgICAgICAgdmFyIGVsZXZhdGlvbiA9IFUuZGVmT3IoJF9fMC5vcHRpb25zLmVsZXZhdGlvbiwgTWF0aC5taW4oc3VyZmFjZVNpemUud2lkdGgsIHN1cmZhY2VTaXplLmhlaWdodCkgLyA0KTtcbiAgICAgICAgICBvYmoucG9zaXRpb24ueiA9IDAuNSAqIHJhdGlvICogYm91bmRpbmdCb3guc2l6ZSgpLnogKyBlbGV2YXRpb247XG4gICAgICAgIH0pKTtcbiAgICAgIH0sXG4gICAgICBfbG9hZEdlb21ldHJ5RnJvbUZpbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFAoKGZ1bmN0aW9uKCkge30pKTtcbiAgICAgIH1cbiAgICB9LCB7dmlzaWJsZTogZmFsc2V9KTtcbiAgICB3aW5kb3cuX2FteV9UaHJlZURNb2RlbC5sb2FkZXJzID0ge307XG4gICAgcmV0dXJuIHdpbmRvdy5fYW15X1RocmVlRE1vZGVsO1xuICB9KSkudGFwKChmdW5jdGlvbihjKSB7XG4gICAgJC5jaXJjdWl0Ym9hcmQuVGhyZWVETW9kZWwgPSBjO1xuICB9KSk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvVGhyZWVETW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwia2VmaXItanF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzJywgJy4vdXRpbC91bmlxdWUtaWQuanMnLCAnLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMnLCAnLi91dGlsL3BsdWdpbi5qcycsICcuL3V0aWwvZGVmZXIuanMnXSwgZnVuY3Rpb24oJCwgUCwgVSwgS2VmaXJTaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0sIHBsdWdpbiwgZGVmZXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gcGx1Z2luLnNlbGVjdGVkLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgIGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9BcnRlZmFjdCkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdDtcbiAgICB9XG4gICAgd2luZG93Ll9hbXlfQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEtlZmlyU2lnbmFsSGFuZGxlciwgKGZ1bmN0aW9uKHN1cGVyRm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBBcnRlZmFjdChvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHZhciAkX18xID0gb3B0aW9ucyxcbiAgICAgICAgICAgIGlkID0gJF9fMS5pZCxcbiAgICAgICAgICAgIHR5cGUgPSAkX18xLnR5cGUsXG4gICAgICAgICAgICBwYXJlbnQgPSAkX18xLnBhcmVudCxcbiAgICAgICAgICAgIGJlZm9yZUNvbnN0cnVjdGlvbiA9ICRfXzEuYmVmb3JlQ29uc3RydWN0aW9uO1xuICAgICAgICB0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24oYmVmb3JlQ29uc3RydWN0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMucm9vdCA9PT0gdGhpcykge1xuICAgICAgICAgIHRoaXMuX2FydGVmYWN0c0J5SUQgPSB7fTtcbiAgICAgICAgICB0aGlzLl9yZWdpc3RlckFydGVmYWN0ID0gZnVuY3Rpb24oYXJ0ZWZhY3QpIHtcbiAgICAgICAgICAgIFUuZ2V0RGVmKHRoaXMuX2FydGVmYWN0c0J5SUQsIGFydGVmYWN0LmlkLCBkZWZlcikucmVzb2x2ZShhcnRlZmFjdCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSwge1xuICAgICAgYmVmb3JlQ29uc3RydWN0aW9uOiBmdW5jdGlvbihwb3NzaWJsZVByb21pc2UpIHtcbiAgICAgICAgaWYgKCFwb3NzaWJsZVByb21pc2UgfHwgISQuaXNGdW5jdGlvbihwb3NzaWJsZVByb21pc2UudGhlbikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmNvbnN0cnVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50YXAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBQLnJlc29sdmUocG9zc2libGVQcm9taXNlKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSxcbiAgICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICAgIH0sXG4gICAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICAgIH0sXG4gICAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgICB9LFxuICAgICAgZ2V0IHBhcmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgIH0sXG4gICAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICAgIH0sXG4gICAgICBnZXQgcm9vdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290KSB7XG4gICAgICAgICAgdGhpcy5fcm9vdCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQucm9vdCA6IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgICB9LFxuICAgICAgYXJ0ZWZhY3RCeUlkOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gVS5nZXREZWYodGhpcy5yb290Ll9hcnRlZmFjdHNCeUlELCBpZCwgZGVmZXIpLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgdHJhdmVyc2VBcnRlZmFjdHM6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgICB2YXIgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICAgICAgICBpZiAoIW9yZGVyKSB7XG4gICAgICAgICAgb3JkZXIgPSAncHJlZml4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwcmVmaXgnKSB7XG4gICAgICAgICAgZm4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIGNoaWxkLnRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAob3JkZXIgPT09ICdwb3N0Zml4Jykge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhdmVyc2VBcnRlZmFjdHNCeVR5cGU6IGZ1bmN0aW9uKHR5cGUsIGZuKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgICB2YXIgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICAgICAgICBpZiAoIW9yZGVyKSB7XG4gICAgICAgICAgb3JkZXIgPSAncHJlZml4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwcmVmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZUdvaW5nSW4pIHtcbiAgICAgICAgICBvcHRpb25zLmJlZm9yZUdvaW5nSW4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkuZm9yRWFjaCgoZnVuY3Rpb24oZGVzY2VuZGVudCkge1xuICAgICAgICAgIGRlc2NlbmRlbnQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZUdvaW5nT3V0KSB7XG4gICAgICAgICAgb3B0aW9ucy5iZWZvcmVHb2luZ091dCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwb3N0Zml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICBmbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsb3Nlc3RBbmNlc3RvckJ5VHlwZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQ7XG4gICAgICAgIH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjaGlsZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgd2luZG93Ll9hbXlfQXJ0ZWZhY3QubmV3U3ViY2xhc3MgPSBmdW5jdGlvbiBuZXdTdWJDbGFzcyhuYW1lLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBvcHRpb25EZWZhdWx0cyA9IGFyZ3VtZW50c1szXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbM10gOiB7fTtcbiAgICAgIHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKHdpbmRvdy5fYW15X0FydGVmYWN0LCAoZnVuY3Rpb24oc3VwZXJGbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICAgIHZhciBwcm9jZXNzZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgICAgIHByb2Nlc3NlZE9wdGlvbnNba2V5XSA9IG9wdGlvbkRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG4gICAgICAgICAgc3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcbiAgICAgICAgICBjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50aGVuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbigkX18wLmNvbnN0cnVjdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUC5yZXNvbHZlKCRfXzAuY29uc3RydWN0KG9wdGlvbnMpKS5yZXR1cm4oJF9fMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICRfXzA7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG4gICAgICAgICAgICB0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdChvcHRpb25zKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICh0aGlzLmNvbnN0cnVjdGVkIHx8IFAucmVzb2x2ZSgpKS50aGVuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRfXzAucm9vdC5fcmVnaXN0ZXJBcnRlZmFjdCgkX18wKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICB9KSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge2dldCBjaXJjdWl0Ym9hcmQoKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NpcmN1aXRib2FyZCA9IHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcbiAgICAgICAgfX0pKSk7XG4gICAgfTtcbiAgICByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3Q7XG4gIH0pKS50YXAoKGZ1bmN0aW9uKGMpIHtcbiAgICAkLmNpcmN1aXRib2FyZC5BcnRlZmFjdCA9IGM7XG4gIH0pKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9BcnRlZmFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbihQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuICAgIHZhciByZXNvbHZlLFxuICAgICAgICByZWplY3Q7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcbiAgICAgIHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG4gICAgICByZWplY3QgPSBhcmd1bWVudHNbMV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgIHByb21pc2U6IHByb21pc2VcbiAgICB9O1xuICB9O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvZGVmZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYWIwY2NjMGM3YThiOTNiZjE1N2VkYTE3Y2E4NzA4ZDguanNcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZpbGUtbG9hZGVyIS4vc3JjL1RocmVlRE1vZGVsLXdvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJy4va2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIpIHtcbiAgdmFyIEtlZmlyU2lnbmFsSGFuZGxlciA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gS2VmaXJTaWduYWxIYW5kbGVyKCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuICB9LCB7XG4gICAgbmV3RXZlbnQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBzb3VyY2UgPSAoYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9KS5zb3VyY2U7XG4gICAgICBVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgdmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBidXMucGx1Zyhzb3VyY2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cztcbiAgICB9LFxuICAgIGV2ZW50OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sIChcIlRoZXJlIGlzIG5vIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgfSxcbiAgICBwcm9wZXJ0eTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbbmFtZV07XG4gICAgfSxcbiAgICBwOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICB9LFxuICAgIG5ld1Byb3BlcnR5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgJF9fMSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgICAgICBzZXR0YWJsZSA9ICRfXzEuc2V0dGFibGUsXG4gICAgICAgICAgaW5pdGlhbCA9ICRfXzEuaW5pdGlhbCxcbiAgICAgICAgICBpc0VxdWFsID0gJF9fMS5pc0VxdWFsO1xuICAgICAgVS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSwgKFwiVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnXCIgKyBuYW1lICsgXCInIG9uIHRoaXMgb2JqZWN0LlwiKSk7XG4gICAgICBVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSwgKFwiVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIGlmIChVLmlzVW5kZWZpbmVkKHNldHRhYmxlKSkge1xuICAgICAgICBzZXR0YWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG4gICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gYnVzLnRvUHJvcGVydHkoaW5pdGlhbCkuc2tpcER1cGxpY2F0ZXMoaXNFcXVhbCk7XG4gICAgICBwcm9wZXJ0eS5wbHVnID0gKGZ1bmN0aW9uKG9ic2VydmFibGUpIHtcbiAgICAgICAgYnVzLnBsdWcob2JzZXJ2YWJsZSk7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgIH0pO1xuICAgICAgcHJvcGVydHkudW5wbHVnID0gKGZ1bmN0aW9uKG9ic2VydmFibGUpIHtcbiAgICAgICAgYnVzLnVucGx1ZyhvYnNlcnZhYmxlKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgICAgfSk7XG4gICAgICBwcm9wZXJ0eS5nZXQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eS5fY3VycmVudDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNldHRhYmxlKSB7XG4gICAgICAgIHByb3BlcnR5LnNldCA9IChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGJ1cy5lbWl0KHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gcHJvcGVydHk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcbiAgICAgICAgZ2V0OiBwcm9wZXJ0eS5nZXQsXG4gICAgICAgIHNldDogc2V0dGFibGUgPyBwcm9wZXJ0eS5zZXQgOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuICAgICAgcHJvcGVydHkucnVuKCk7XG4gICAgICB0aGlzLmV2ZW50KCdkZXN0cm95Jykub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1cy5lbmQoKTtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICB9LFxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICBVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sIChcIlRoZXJlIGlzIG5vIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXS5lbWl0KHZhbHVlKTtcbiAgICB9LFxuICAgIG9uOiBmdW5jdGlvbihuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGFyZ3NPYmogPSB0aGlzLl9nYXRoZXJPbkFyZ3VtZW50cyhuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcy5fb24oYXJnc09iaik7XG4gICAgfSxcbiAgICBfb246IGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgICBuYW1lID0gJF9fMi5uYW1lLFxuICAgICAgICAgIGV4cGVjdGVkVmFsdWUgPSAkX18yLmV4cGVjdGVkVmFsdWUsXG4gICAgICAgICAgY2FsbGJhY2sgPSAkX18yLmNhbGxiYWNrO1xuICAgICAgVS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdIHx8IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sIChcIlRoZXJlIGlzIG5vIGV2ZW50IG9yIHByb3BlcnR5ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICAgIGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIHYgPT09IGV4cGVjdGVkVmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgX2dhdGhlck9uQXJndW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18wID0gMDsgJF9fMCA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzArKylcbiAgICAgICAgYXJnc1skX18wXSA9IGFyZ3VtZW50c1skX18wXTtcbiAgICAgIHZhciByZXN1bHQgPSB7bmFtZTogYXJncy5zaGlmdCgpfTtcbiAgICAgIGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiAhVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pICYmICFVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcbiAgICAgICAgcmVzdWx0LmV4cGVjdGVkVmFsdWUgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICBpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pKSB7XG4gICAgICAgIHJlc3VsdC5jYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIEtlZmlyU2lnbmFsSGFuZGxlcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIF9uZXh0SWQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG4gICAgcmV0dXJuICgocHJlZml4IHx8IFwidW5pcXVlLWlkXCIpICsgXCItXCIgKyBfbmV4dElkKyspO1xuICB9O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvdW5pcXVlLWlkLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2RlbHRhLWpzJ10sIGZ1bmN0aW9uKFAsIERNKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xuICB9XG4gIERNLnJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKFAucmVzb2x2ZSk7XG4gIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsID0gbmV3IERNKCk7XG4gIHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbDtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL21haW4tZGVsdGEtbW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vbWlzYy5qcycsICcuL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzJywgJy4vZGVmZXIuanMnLCAnLi9tYWluLWRlbHRhLW1vZGVsLmpzJ10sIGZ1bmN0aW9uKCQsIFAsIFUsIFNpZ25hbEhhbmRsZXIsIGRlZmVyLCBkbSkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICghd2luZG93Ll9hbXlQbHVnaW4pIHtcbiAgICB3aW5kb3cuX2FteVBsdWdpbiA9IGZ1bmN0aW9uKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG4gICAgICBpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gbmV3IGRtLkRlbHRhKHBsdWdpbk9yU2VsZWN0aW9uLm5hbWUsIHBsdWdpbk9yU2VsZWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFUuYXNzZXJ0KCFfc2VsZWN0ZWREZWZlcnJlZC5kb25lLCBcIkFwaU5BVE9NWSBwbHVnaW5zIGNhbiBvbmx5IGJlIHNlbGVjdGVkIG9uY2UsIGFmdGVyIHdoaWNoIHRoZXkgYXJlIGZpeGVkLlwiKTtcbiAgICAgICAgX3NlbGVjdGVkRGVmZXJyZWQuZG9uZSA9IHRydWU7XG4gICAgICAgIGRtLnNlbGVjdC5hcHBseShkbSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuICAgICAgICBfc2VsZWN0ZWREZWZlcnJlZC5yZXNvbHZlKHRoaXMpO1xuICAgICAgICByZXR1cm4gd2luZG93Ll9hbXlQbHVnaW4uc2VsZWN0ZWQ7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgX3NlbGVjdGVkRGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIHdpbmRvdy5fYW15UGx1Z2luLnNlbGVjdGVkID0gX3NlbGVjdGVkRGVmZXJyZWQucHJvbWlzZTtcbiAgICB3aW5kb3cuX2FteVBsdWdpbi5ncmFwaCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkbS5ncmFwaCgpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5fYW15UGx1Z2luLmRtID0gZG07XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5fYW15UGx1Z2luO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvcGx1Z2luLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzIn0=