(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("chroma-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "chroma-js", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("chroma-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["chroma"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, color, U, Kefir, defaults) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-skin',
	    requires: ['tile-open', 'position-tracking']
	  }).modify('Tile.prototype');
	  var applyStyleDefaults = defaults({
	    '&': {
	      backgroundColor: " 'white'                                                                ",
	      borderColor: " color(`['&'].backgroundColor`).brighten(20).css()                      ",
	      color: " color(`['&'].backgroundColor`).luminance() > 0.5 && 'black' || 'white' "
	    },
	    '& > header': {borderColor: " `['&'].borderColor` "},
	    '& > icon-btn': {backgroundColor: " `['&'].backgroundColor` "}
	  }, {color: color});
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    var origElement = this.dom;
	    origElement.addClass('skinned-tile');
	    this._p_tileSkin_headerElement = $("<header/>").appendTo(origElement);
	    this.dom = $("<section/>").appendTo(origElement);
	    this.model.get('name').then((function(name) {
	      $__0._p_tileSkin_headerElement.text(name);
	    }));
	    this.model.get('tile').get('normal').get('css').then((function(css) {
	      $__0.element.amyPutCssRules(applyStyleDefaults(css));
	    })).catch((function() {}));
	    this.on('size').filterBy(this.p('open').not()).onValue((function(size) {
	      $__0._p_tileSkin_headerElement.css('fontSize', Math.min(0.2 * Math.pow(size.height, 1.01), 0.13 * Math.pow(size.width, 1.01)));
	    }));
	    this.newProperty('headerSize', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).plug(Kefir.merge([Kefir.once(), this.on('size').changes(), this.on('open').changes()]).map((function() {
	      return new U.Size($__0._p_tileSkin_headerElement.height(), $__0.size.width);
	    })));
	    this.newProperty('headerPosition', {settable: false}).plug(this.on('position'));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
	  __webpack_require__(10).init(Kefir, $);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  'use strict';
	  function deepTransform(val, fn) {
	    if ($.isPlainObject(val) || $.isArray(val)) {
	      $.each(val, (function(key, subVal) {
	        var returned = fn(subVal);
	        if (U.isUndefined(returned)) {
	          deepTransform(subVal, fn);
	        } else {
	          val[key] = returned;
	        }
	      }));
	    }
	  }
	  var REF_PATTERN = /`([\[\.].+?)`/g;
	  return function defaults(spec, context) {
	    deepTransform(spec, (function(val) {
	      if (typeof val === 'string') {
	        var refs = (val.match(REF_PATTERN) || []).map((function(ref) {
	          var strippedRef = ref.substring(1, ref.length - 1);
	          return new Function('refs', ("return refs" + strippedRef));
	        }));
	        var expr = val.replace(REF_PATTERN, "(refs$1)");
	        var templateFn = (function(formalParams) {
	          var newFormalParams = formalParams.concat([("return " + expr)]);
	          return U.applyConstructor(Function, newFormalParams);
	        });
	        templateFn.refs = refs;
	        return templateFn;
	      }
	    }));
	    function withDefaultsAux(defSpec, obj, refs, params) {
	      var change = false;
	      Object.keys(defSpec).forEach((function(key) {
	        if (key in obj) {
	          if ($.isPlainObject(defSpec[key]) && $.isPlainObject(obj[key])) {
	            change = withDefaultsAux(defSpec[key], obj[key], refs, params) || change;
	          }
	        } else if ($.isPlainObject(defSpec[key])) {
	          obj[key] = {};
	          change = withDefaultsAux(defSpec[key], obj[key], refs, params) || change;
	        } else if ($.isFunction(defSpec[key])) {
	          if (defSpec[key].refs.every((function(ref) {
	            return !U.isUndefined(ref(refs));
	          }))) {
	            var allparams = $.extend({refs: refs}, context, params);
	            var formalParams = Object.keys(allparams);
	            var actualParams = formalParams.map((function(fpar) {
	              return allparams[fpar];
	            }));
	            var finalFn = defSpec[key](formalParams);
	            obj[key] = finalFn.apply(null, actualParams);
	          }
	        }
	      }));
	      return change;
	    }
	    return function withDefaults(obj, params) {
	      var result = (U.isUndefined(obj) ? {} : $.extend(true, {}, obj));
	      var change = true;
	      while (change) {
	        change = withDefaultsAux(spec, result, result, params || {});
	      }
	      return result;
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  $.fn.extend({amyPutCssRules: function(rules) {
	      var $__0 = this;
	      $.each(rules, (function(selector, css) {
	        var context;
	        if (selector.trim() === '&') {
	          context = $__0;
	        } else if (selector.trim().charAt(0) === '&') {
	          context = $__0.find(selector.trim().substr(1).trim());
	        } else {
	          context = $__0.find(selector);
	        }
	        context.css(css);
	      }));
	    }});
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-skin.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-skin.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	exports.push([module.id, ".skinned-tile{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.skinned-tile>header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-weight:bold;border-width:1px;overflow:hidden;}.skinned-tile.open>header{height:26px;border-style:none none solid none;line-height:26px;font-size:19.5px !important;white-space:nowrap;}.skinned-tile:not(.open)>header{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding:0 5px;}.skinned-tile>section{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}.skinned-tile.open>section{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;opacity:1;}.skinned-tile:not(.open)>section{opacity:0;}", ""]);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
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
				addStylesToDom(newStyles, options);
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
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
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
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  var list = [];
	  list.toString = function toString() {
	    var result = [];
	    for (var i = 0; i < this.length; i++) {
	      var item = this[i];
	      if (item[2]) {
	        result.push("@media " + item[2] + "{" + item[1] + "}");
	      } else {
	        result.push(item[1]);
	      }
	    }
	    return result.join("");
	  };
	  return list;
	};
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNTI3ZTQ0OTQxNjIyZTI3ODUwYSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLXNraW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJjaHJvbWFcIixcImNvbW1vbmpzMlwiOlwiY2hyb21hLWpzXCIsXCJjb21tb25qc1wiOlwiY2hyb21hLWpzXCIsXCJhbWRcIjpcImNocm9tYS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvcHV0LWNzcy1ydWxlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCBcImtlZmlyLWpxdWVyeVwiIiwid2VicGFjazovLy8uL3NyYy9wLXRpbGUtc2tpbi5zY3NzPzMwYWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3AtdGlsZS1za2luLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUNDLHVCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHlCQUNELENBQUcsMENBQVUsRUFBRyxNQUFJLENBQUcsR0FBRyxNQUFJLENBQUcsU0FBTztBQUN2QyxjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLFlBQVU7QUFDaEIsWUFBTyxDQUFHLEVBQUMsV0FBVSxDQUFHLG9CQUFrQixDQUFDO0FBQUEsR0FDNUMsQ0FBQyxPQUFRLENBQUMsZ0JBQWUsQ0FBQyxDQUFDO0FBSXZCLHdCQUFpQixFQUFJLFNBQVEsQ0FBQztBQUNqQyxPQUFFLENBQWM7QUFDZixxQkFBYyxDQUFHLDJFQUF5RTtBQUMxRixpQkFBVSxDQUFPLDJFQUF5RTtBQUMxRixXQUFJLENBQWEsMkVBQXlFO0FBQUEs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O0FBQ2IsTUFBRyxTQUFTLEVBQUksU0FBUyxTQUFPLENBQUUsQ0FBRTtBQUMvQixjQUFLLEVBQUksR0FBQyxDQUFDO0FBQ2YsU0FBUSxPQUFJLEdBQUcsSUFBSSxLQUFHLE9BQU8sQ0FBRyxJQUFFLENBQUc7QUFDaEMsY0FBRyxFQUFJLEtBQUcsQ0FBRSxFQUFDLENBQUM7QUFDbEIsVUFBRyxJQUFHLENBQUUsRUFBQyxDQUFHO0FBQ1gsY0FBSyxLQUFNLENBQUMsU0FBUSxFQUFJLEtBQUcsQ0FBRSxFQUFDLEVBQUksSUFBRSxFQUFJLEtBQUcsQ0FBRSxFQUFDLEVBQUksSUFBRSxDQUFDLENBQUM7T0FDdkQsS0FBTztBQUNOLGNBQUssS0FBTSxDQUFDLElBQUcsQ0FBRSxFQUFDLENBQUMsQ0FBQztPQUNyQjtBQUFBLEtBQ0Q7QUFDQSxVQUFPLE9BQUssS0FBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0dBQ3ZCLENBQUM7QUFDRCxRQUFPLEtBQUcsQ0FBQztBQUNaO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJjaHJvbWEtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJjaHJvbWEtanNcIiwgXCJibHVlYmlyZFwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiY2hyb21hLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiY2hyb21hXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJrZWZpci1qcXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTI3ZTQ0OTQxNjIyZTI3ODUwYVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnY2hyb21hLWpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcycsXG5cdCcuL3V0aWwvZGVmYXVsdHMuanMnLFxuXHQnLi91dGlsL3B1dC1jc3MtcnVsZXMuanMnLFxuXHQnLi9wLXRpbGUtc2tpbi5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIGNvbG9yLCBVLCBLZWZpciwgZGVmYXVsdHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtc2tpbicsXG5cdFx0cmVxdWlyZXM6IFsndGlsZS1vcGVuJywgJ3Bvc2l0aW9uLXRyYWNraW5nJ11cblx0fSkubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpO1xuXG5cblx0LyogdGlsZSBzdHlsaW5nIGRlZmF1bHRzIGdlbmVyYXRvciAqL1xuXHR2YXIgYXBwbHlTdHlsZURlZmF1bHRzID0gZGVmYXVsdHMoe1xuXHRcdCcmJzogICAgICAgICAgICB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiICd3aGl0ZScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXG5cdFx0XHRib3JkZXJDb2xvcjogICAgIFwiIGNvbG9yKGBbJyYnXS5iYWNrZ3JvdW5kQ29sb3JgKS5icmlnaHRlbigyMCkuY3NzKCkgICAgICAgICAgICAgICAgICAgICAgXCIsXG5cdFx0XHRjb2xvcjogICAgICAgICAgIFwiIGNvbG9yKGBbJyYnXS5iYWNrZ3JvdW5kQ29sb3JgKS5sdW1pbmFuY2UoKSA+IDAuNSAmJiAnYmxhY2snIHx8ICd3aGl0ZScgXCJcblx0XHR9LFxuXHRcdCcmID4gaGVhZGVyJzogICB7XG5cdFx0XHRib3JkZXJDb2xvcjogXCIgYFsnJiddLmJvcmRlckNvbG9yYCBcIlxuXHRcdH0sXG5cdFx0JyYgPiBpY29uLWJ0bic6IHtcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIgYFsnJiddLmJhY2tncm91bmRDb2xvcmAgXCJcblx0XHR9XG5cdH0sIHsgY29sb3I6IGNvbG9yIH0pO1xuXG5cblx0LyogbWFrZSB0aWxlcyBsb29rIG5pY2UsIHdpdGggYSBoZWFkZXIsIGNvbnRlbnQgc2VjdGlvbiwgYW5kIENTUyBzdHlsaW5nIGRlcml2ZWQgZnJvbSB0aGUgbW9kZWwgKi9cblx0cGx1Z2luLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogIGNyZWF0ZSB0aGUgaGVhZGVyIGFuZCBjb250ZW50IGVsZW1lbnRzLCBhbmQgcmVyb3V0ZSB0aGUgICovXG5cdFx0LyogJ2RvbScgcHJvcGVydHkgdG8gdGhlIG5ldyBjb250ZW50IGVsZW1lbnQgICAgICAgICAgICAgICAgICovXG5cdFx0dmFyIG9yaWdFbGVtZW50ID0gdGhpcy5kb207XG5cdFx0b3JpZ0VsZW1lbnQuYWRkQ2xhc3MoJ3NraW5uZWQtdGlsZScpO1xuXHRcdHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudCA9ICQoYDxoZWFkZXIvPmApLmFwcGVuZFRvKG9yaWdFbGVtZW50KTtcblx0XHR0aGlzLmRvbSA9ICQoYDxzZWN0aW9uLz5gKS5hcHBlbmRUbyhvcmlnRWxlbWVudCk7XG5cblx0XHQvKiBwdXQgdGhlIG5hbWUgb2YgdGhlIG1vZGVsIGluIHRoZSBoZWFkZXIgZWxlbWVudCAqL1xuXHRcdHRoaXMubW9kZWwuZ2V0KCduYW1lJykudGhlbigobmFtZSk9PiB7IHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudC50ZXh0KG5hbWUpIH0pO1xuXG5cdFx0LyogdGFrZSBhbnkgY3NzIHJ1bGVzIGZyb20gdGhlIG1vZGVsIGFuZCBhcHBseSB0aGVtIHRvIHRoZSB0aWxlICovXG5cdFx0dGhpcy5tb2RlbC5nZXQoJ3RpbGUnKS5nZXQoJ25vcm1hbCcpLmdldCgnY3NzJykudGhlbigoY3NzKT0+IHsgdGhpcy5lbGVtZW50LmFteVB1dENzc1J1bGVzKGFwcGx5U3R5bGVEZWZhdWx0cyhjc3MpKSB9KVxuXHRcdFx0XHQuY2F0Y2goKCk9Pnt9KTsgLy8gaXQncyBPSyBpZiAnLnRpbGUubm9ybWFsLmNzcycgaXMgbm90IG9uIHRoZSBtb2RlbFxuXG5cdFx0Lyogd2hlbiB0aGUgdGlsZSBpcyBjbG9zZWQsIG1ha2UgdGhlIGZvbnQgc2l6ZSBkeW5hbWljICovXG5cdFx0dGhpcy5vbignc2l6ZScpLmZpbHRlckJ5KHRoaXMucCgnb3BlbicpLm5vdCgpKS5vblZhbHVlKChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLl9wX3RpbGVTa2luX2hlYWRlckVsZW1lbnQgLy8gZm9ybXVsYSBnb3R0ZW4gZXhwZXJpbWVudGFsbHlcblx0XHRcdFx0XHQuY3NzKCdmb250U2l6ZScsIE1hdGgubWluKDAuMiAqIE1hdGgucG93KHNpemUuaGVpZ2h0LCAxLjAxKSwgMC4xMyAqIE1hdGgucG93KHNpemUud2lkdGgsIDEuMDEpKSk7XG5cdFx0XHRcdFx0Ly8gV2UncmUgZ3Jvd2luZyAvIHNocmlua2luZyB0aGUgZm9udCBzaXplIGluIHByb3BvcnRpb24gdG8gdGhlICgxLjAxKXN0IHBvd2VyIG9mIHRoZSB0aWxlIHNpemUuXG5cdFx0XHRcdFx0Ly8gTWFraW5nIHRoZSBmb250IGdyb3cvc2hyaW5rIGp1c3QgYSB0aW55IGJpdCBmYXN0ZXIgdGhhbiB0aGUgdGlsZSBwcmV2ZW50cyBhbiBhd2t3YXJkICdmbGlja2VyaW5nJ1xuXHRcdFx0XHRcdC8vIGJldHdlZW4gZGlmZmVyZW50IGxpbmUtYnJlYWtzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGhhcHBlbiBzb21ldGltZXMuXG5cdFx0fSk7XG5cblx0XHQvKiB0aGUgJ2hlYWRlclNpemUnIG9ic2VydmFibGUgKi9cblx0XHR0aGlzLm5ld1Byb3BlcnR5KCdoZWFkZXJTaXplJywge1xuXHRcdFx0c2V0dGFibGU6IGZhbHNlLFxuXHRcdFx0aXNFcXVhbDogVS5TaXplLmVxdWFsc1xuXHRcdH0pLnBsdWcoS2VmaXIubWVyZ2UoW1xuXHRcdFx0S2VmaXIub25jZSgpLFxuXHRcdFx0dGhpcy5vbignc2l6ZScpLmNoYW5nZXMoKSxcblx0XHRcdHRoaXMub24oJ29wZW4nKS5jaGFuZ2VzKClcblx0XHRdKS5tYXAoKCkgPT4gbmV3IFUuU2l6ZSh0aGlzLl9wX3RpbGVTa2luX2hlYWRlckVsZW1lbnQuaGVpZ2h0KCksIHRoaXMuc2l6ZS53aWR0aCkpKTtcblxuXG5cdFx0LyogdGhlICdoZWFkZXJQb3NpdGlvbicgb2JzZXJ2YWJsZSAqL1xuXHRcdHRoaXMubmV3UHJvcGVydHkoJ2hlYWRlclBvc2l0aW9uJywge1xuXHRcdFx0c2V0dGFibGU6IGZhbHNlXG5cdFx0fSkucGx1Zyh0aGlzLm9uKCdwb3NpdGlvbicpKTtcblxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcC10aWxlLXNraW4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiY2hyb21hXCIsXCJjb21tb25qczJcIjpcImNocm9tYS1qc1wiLFwiY29tbW9uanNcIjpcImNocm9tYS1qc1wiLFwiYW1kXCI6XCJjaHJvbWEtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGl0cyBmaXJzdCBhcmd1bWVudFxuXHRcdGlkKHYpIHsgcmV0dXJuIHYgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBkZWZpbmVkLCBnaXZlIGl0IGEgZGVmYXVsdCB2YWx1ZSBmaXJzdDsgaWYgdGhlIGdpdmVuIHZhbHVlXG5cdFx0Ly8gaXMgYSBmdW5jdGlvbiwgaXQgaXMgY2FsbGVkLCBhbmQgaXRzIHJlc3VsdCBpcyB1c2VkXG5cdFx0Z2V0RGVmKG9iaiwgbmFtZSwgdmFsdWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlKCkgfVxuXHRcdFx0XHRvYmpbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pIH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSkgfSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRmaW5kSW5kZXgoYXJyYXksIHByZWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkgeyByZXR1cm4gaSB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblxuXHRcdC8vIHRoaXMgYG1lbW9pemVgIGZ1bmN0aW9uIGlzIFNMT1csIGFzIGl0IHVzZXMgbGluZWFyIHNlYXJjaFxuXHRcdG1lbW9pemUoZm4pIHtcblx0XHRcdHZhciBrZXlzID0gW107XG5cdFx0XHR2YXIgY2FjaGUgPSBbXTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBjaGVjayB0aGUgY2FjaGUgKi9cblx0XHRcdFx0dmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGtleSkgPT4ga2V5LmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcmdzW2ldKSk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7IHJldHVybiBjYWNoZVtpbmRleF0gfVxuXG5cdFx0XHRcdC8qIG5vIGNhY2hlIGhpdDsgY29tcHV0ZSB2YWx1ZSwgc3RvcmUgYW5kIHJldHVybiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGtleXMucHVzaChhcmdzKTtcblx0XHRcdFx0Y2FjaGUucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIHNvcnRPZkVxdWFsID0gKGEsIGIpID0+IChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAna2VmaXInLCAndHdlZW5qcyddLCBmdW5jdGlvbiAoJCwgVSwgS2VmaXIsIFRXRUVOKSB7XG5cblx0LyogS2VmaXIgalF1ZXJ5IHBsdWdpbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHRcdHJlcXVpcmUoJ2tlZmlyLWpxdWVyeScpLmluaXQoS2VmaXIsICQpO1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQvLyBUaGlzIG1ldGhvZCB3b3JrcyB3aXRoIGV2ZW50cyB0aGF0IGNhbiBoYXZlIG9ubHkgb25lIHN1YnNjcmliZXIsXG5cdC8vIHRoYXQgY2FuIGJlIHVuLXN1YnNjcmliZWQgYnkgc2V0dGluZyB0aGUgc3Vic2NyaWJlciB0byBgbnVsbGAuXG5cdC8vIFRoaXMgZnVuY3Rpb24gaXMgbWVtb2l6ZWQsIHNvIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBpcyB0YWtlbixcblx0Ly8gYW5kIHRoZSBzYW1lIHN0cmVhbSBmb3IgaXQgcmV0dXJuZWQgZm9yIGVhY2ggcmVxdWVzdC5cblx0S2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBvYmoub24oZXZlbnROYW1lLCBudWxsKSB9O1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG5cdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG5cdFx0XHR3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG5cdFx0XHQoKGYpID0+IHsgd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSB9KTtcblx0S2VmaXIuYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cblx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0dmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuXHRcdFx0KGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoKSA9PiB7XG5cdFx0XHRcdFx0ZW1pdHRlci5lbWl0KCk7XG5cdFx0XHRcdFx0aWYgKHN1YnNjcmliZWQpIHsgaXRlcmF0aW9uRm4oKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0LyogdW5zdWJzY3JpYmUgZnVuY3Rpb24gKi9cblx0XHRcdHJldHVybiAoKSA9PiB7IHN1YnNjcmliZWQgPSBmYWxzZSB9O1xuXG5cdFx0fSk7XG5cdH07XG5cblxuXHRLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ30pIHtcblxuXHRcdC8qIHRoZSB0d2VlbiAqL1xuXHRcdHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG5cblx0XHQvKiB0aGUgcmV0dXJuZWQgYnVzICovXG5cdFx0dmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuXG5cdFx0LyogYSBsb2NhbCBmdW5jdGlvbiB0byBwbHVnIGluIG90aGVyIHN0cmVhbXMsIGtlZXBpbmcgdHJhY2sgaW4gb3JkZXIgdG8gJ2VuZCcgdGhlIGJ1cyAqL1xuXHRcdHZhciBhZGRTdHJlYW0gPSAoKCkgPT4ge1xuXHRcdFx0dmFyIGNoYWluZWRTdHJlYW1zID0gMDtcblx0XHRcdHJldHVybiAoc3RyZWFtKSA9PiB7XG5cdFx0XHRcdGNoYWluZWRTdHJlYW1zICs9IDE7XG5cdFx0XHRcdGJ1cy5wbHVnKHN0cmVhbSk7XG5cdFx0XHRcdHN0cmVhbS5vbkVuZCgoKSA9PiB7XG5cdFx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgLT0gMTtcblx0XHRcdFx0XHRpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHsgYnVzLmVuZCgpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cblx0XHQvKiBtYWluIHN0cmVhbSAqL1xuXHRcdGFkZFN0cmVhbShLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRpZiAoZWFzaW5nKSB7IHR3LmVhc2luZyhlYXNpbmcpIH1cblx0XHRcdGlmIChkZWxheSkgIHsgdHcuZGVsYXkoZGVsYXkpIH1cblx0XHRcdHR3Lm9uVXBkYXRlKGZ1bmN0aW9uICgpIHsgZW1pdHRlci5lbWl0KHRoaXMpIH0pO1xuXHRcdFx0dHcub25Db21wbGV0ZShlbWl0dGVyLmVuZCk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRLZWZpci5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleUNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleUNvZGUpO1xuXHR9O1xuXG5cblx0S2VmaXIub25jZSA9IGZ1bmN0aW9uIG9uY2UodmFsdWUpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0ZW1pdHRlci5lbWl0KHZhbHVlKTtcblx0XHRcdGVtaXR0ZXIuZW5kKCk7XG5cdFx0fSk7XG5cdFx0Ly9yZXR1cm4gS2VmaXIuY29uc3RhbnQodmFsdWUpOyAvLyBUT0RPOiByZXBsYWNlIGFsbCAnb25jZScgY2FsbHMgd2l0aCAnY29uc3RhbnQnIGNhbGxzOyB0aGVuIHJlbW92ZSAnb25jZSdcblx0fTtcblxuXG5cdEtlZmlyLmZyb21BcnJheSA9IGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRhcnJheS5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRlbWl0dGVyLmVuZCgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gS2VmaXIuYnVzKCk7XG5cdFx0dmFyIG9wZW4gPSAgICAgIEtlZmlyLmJ1cygpO1xuXHRcdHZhciBjbG9zZSA9ICAgICBLZWZpci5idXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXJCeSh3YW50ZWRCdXMudG9Qcm9wZXJ0eShmYWxzZSkpLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0aGFuZGxlcigoKSA9PiB7XG5cdFx0XHRcdG9wZW4uZW1pdCgpO1xuXHRcdFx0XHR3YW50ZWRCdXMuZW1pdChmYWxzZSk7XG5cdFx0XHRcdGNsb3NlLmVtaXQoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXBUbyh0cnVlKSk7XG5cdFx0XHRyZXR1cm4gS2VmaXIuY29uc3RhbnQodHJ1ZSkudGFrZSgxKS5jb25jYXQoY2xvc2UpLmZsYXRNYXBMYXRlc3QoKCkgPT4ge1xuXHRcdFx0XHR2YXIgYWNjdW11bGF0b3IgPSAoYXJyLCB2YWwpID0+IChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcblx0XHRcdFx0cmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeShvcGVuKS5yZWR1Y2UoYWNjdW11bGF0b3IsIFtdKS5mbGF0TWFwKEtlZmlyLmZyb21BcnJheSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoaXMgcmVzdHJpY3RzIGEgZ2l2ZW4gc3RyZWFtIHRvIGEgd3JhcHBlciBzdHJlYW0gY3JlYXRlZCB3aXRoIHRoZSBtZXRob2QgYWJvdmUuXG5cdC8vIEFsbCBpdHMgb3JpZ2luYWwgZXZlbnRzIGFyZSBub3cgZmlyZWQgaW5zaWRlIHRoZSBwcm92aWRlZCB3aW5kb3cuIFNldCBgb3B0aW9ucy5idWZmZXJgXG5cdC8vIHRvIGB0cnVlYCBpZiBhbGwgaXRzIGV2ZW50cyBzaG91bGQgYmUgYnVmZmVyZWQgYW5kIHJlbGVhc2VkIGluc2lkZSB0aGUgbmV4dCB3aW5kb3cuXG5cdC8vIE90aGVyd2lzZSwgb25seSB0aGUgbGFzdCBldmVudCBpcyByZXRhaW5lZC5cblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUubGltaXRlZEJ5ID0gZnVuY3Rpb24gbGltaXRlZEJ5KHdyYXBwZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gd3JhcHBlcih0aGlzLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdC8vIFRoaXMgaXMgYSBjaGVhcCB2ZXJzaW9uIG9mIHRoZSBsaW1pdGVyIGRlZmluZWQgYWJvdmUuIFRPRE86IHVzZSB0aGUgbGltaXRlciB3aGVyZSB0aGlzIGlzIG5vdyB1c2VkXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHR2YXIgYnVmZmVyID0gW107XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1RoaXMgPSB0aGlzLm9uVmFsdWUoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdGJ1ZmZlci5wdXNoKHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoKSA9PiB7XG5cdFx0XHRcdGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG5cdFx0XHRcdFx0YnVmZmVyID0gW107XG5cdFx0XHRcdFx0b2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvVGhpcygpO1xuXHRcdFx0XHR1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG5cdFx0XHRcdGJ1ZmZlciA9IG51bGw7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIFRoaXMgZmlsdGVycyBhbiBvYnNlcnZhYmxlIHRvIG9ubHkgbGV0IHRocm91Z2ggdmFsdWVzIGVxdWFsIHRvIHRoZSBnaXZlbiB2YWx1ZS5cblx0S2VmaXIuT2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGNvbXBhcmF0b3IpIHtcblx0XHRjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGUpID0+IGUgPT09IHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcy5za2lwRHVwbGljYXRlcygpLmZpbHRlcihjb21wYXJhdG9yKTtcblx0fTtcblxuXHQvLyBUaGlzIG1ha2VzIGEgc3Vic2NyaXB0aW9uIHRvIGFuIG9ic2VydmFibGUgdGhhdCBkb2Vzbid0IGRvIGFueXRoaW5nXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZG9Ob3RoaW5nID0gKCk9Pnt9O1xuXHRcdHRoaXMub25WYWx1ZShkb05vdGhpbmcpO1xuXHRcdHJldHVybiAoKSA9PiB7IHRoaXMub2ZmVmFsdWUoZG9Ob3RoaW5nKSB9O1xuXHR9O1xuXG5cdC8vIFRoaXMgaXMgYSAnc21hcnQnIC5zdG9wUHJvcGFnYXRpb24sIG1hcmtpbmcgZXZlbnRzIHdpdGggYSBsYWJlbFxuXHQvLyBhbmQgc2tpcHBpbmcgdGhvc2UgdGhhdCBhbHJlYWR5IGhhdmUgdGhhdCBsYWJlbC5cblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS5za2lwUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAobGFiZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGV2ZW50KSA9PiB7XG5cdFx0XHRyZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcblx0XHR9KS5tYXAoKGV2ZW50KSA9PiB7XG5cdFx0XHRVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF0gPSB0cnVlO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIEZpbHRlciBldmVudHMgdG8gb25seSBjZXJ0YWluIGtleXMgLyBidXR0b25zLiBDYW4gYmUgYSBwcmVkaWNhdGUgZnVuY3Rpb24gb3Igc2luZ2xlIG51bWJlci5cblx0S2VmaXIuU3RyZWFtLnByb3RvdHlwZS53aGljaCA9IGZ1bmN0aW9uIChidXR0b25JZCkge1xuXHRcdHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKGIgPT4gYiA9PT0gYnV0dG9uSWQpO1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigoZSkgPT4gcHJlZChlLndoaWNoKSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdCQuZm4ubW91c2VEcmFnID0gZnVuY3Rpb24gbW91c2VEcmFnKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHRzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4geyAvLyBUT0RPOiBkb24ndCB1c2UgJ2ZpbHRlcicsIGJ1dCBzb21ldGhpbmcgbGlrZSAnc2tpcFVudGlsJyBvciAnZmxhdE1hcCdcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyZWFtXG5cdFx0XHRcdFx0LnRha2VVbnRpbEJ5KCQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNldXAnKSlcblx0XHRcdFx0XHQubWFwKChtb3VzZU1vdmVFdmVudCkgPT4gKHsgbW91c2VEb3duRXZlbnQsIG1vdXNlTW92ZUV2ZW50IH0pKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKHt0aHJlc2hvbGR9ID0ge30pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG5cdFx0XHRpZiAodGhyZXNob2xkKSB7XG5cdFx0XHRcdHZhciBjcm9zc2VkID0gZmFsc2U7XG5cdFx0XHRcdHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjcm9zc2VkKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdFx0XHR2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuXHRcdFx0XHRcdHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG5cdFx0XHRcdFx0aWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7IHJldHVybiBjcm9zc2VkID0gdHJ1ZSB9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWxCeSh1bnRpbFN0cmVhbSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBLZWZpcjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBkZWVwVHJhbnNmb3JtKHZhbCwgZm4pIHtcblx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHZhbCkgfHwgJC5pc0FycmF5KHZhbCkpIHtcblx0XHRcdCQuZWFjaCh2YWwsIChrZXksIHN1YlZhbCkgPT4ge1xuXHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbihzdWJWYWwpO1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChyZXR1cm5lZCkpIHtcblx0XHRcdFx0XHRkZWVwVHJhbnNmb3JtKHN1YlZhbCwgZm4pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbFtrZXldID0gcmV0dXJuZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBSRUZfUEFUVEVSTiA9IC9gKFtcXFtcXC5dLis/KWAvZztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmYXVsdHMoc3BlYywgY29udGV4dCkge1xuXG5cdFx0ZGVlcFRyYW5zZm9ybShzcGVjLCAodmFsKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dmFyIHJlZnMgPSAodmFsLm1hdGNoKFJFRl9QQVRURVJOKSB8fCBbXSkubWFwKChyZWYpID0+IHtcblx0XHRcdFx0XHR2YXIgc3RyaXBwZWRSZWYgPSByZWYuc3Vic3RyaW5nKDEscmVmLmxlbmd0aC0xKTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZWZzJywgYHJldHVybiByZWZzJHtzdHJpcHBlZFJlZn1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHZhciBleHByID0gdmFsLnJlcGxhY2UoUkVGX1BBVFRFUk4sIFwiKHJlZnMkMSlcIik7XG5cdFx0XHRcdHZhciB0ZW1wbGF0ZUZuID0gKGZvcm1hbFBhcmFtcykgPT4ge1xuXHRcdFx0XHRcdHZhciBuZXdGb3JtYWxQYXJhbXMgPSBmb3JtYWxQYXJhbXMuY29uY2F0KFtgcmV0dXJuICR7ZXhwcn1gXSk7XG5cdFx0XHRcdFx0cmV0dXJuIFUuYXBwbHlDb25zdHJ1Y3RvcihGdW5jdGlvbiwgbmV3Rm9ybWFsUGFyYW1zKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGVtcGxhdGVGbi5yZWZzID0gcmVmcztcblx0XHRcdFx0cmV0dXJuIHRlbXBsYXRlRm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8gcmVjdXJzaXZlIGF1eGlsaWFyeSBmdW5jdGlvbjsgcmV0dXJucyB0cnVlIGlmIGEgY2hhbmdlIHRvIG9iaiB3YXMgbWFkZVxuXHRcdGZ1bmN0aW9uIHdpdGhEZWZhdWx0c0F1eChkZWZTcGVjLCBvYmosIHJlZnMsIHBhcmFtcykge1xuXHRcdFx0dmFyIGNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVmU3BlYykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cblx0XHRcdFx0aWYgKGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KGRlZlNwZWNba2V5XSkgJiYgJC5pc1BsYWluT2JqZWN0KG9ialtrZXldKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWNba2V5XSwgb2JqW2tleV0sIHJlZnMsIHBhcmFtcykgfHwgY2hhbmdlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICgkLmlzUGxhaW5PYmplY3QoZGVmU3BlY1trZXldKSkge1xuXHRcdFx0XHRcdG9ialtrZXldID0ge307XG5cdFx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWNba2V5XSwgb2JqW2tleV0sIHJlZnMsIHBhcmFtcykgfHwgY2hhbmdlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbihkZWZTcGVjW2tleV0pKSB7XG5cdFx0XHRcdFx0aWYgKGRlZlNwZWNba2V5XS5yZWZzLmV2ZXJ5KChyZWYpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiAhVS5pc1VuZGVmaW5lZChyZWYocmVmcykpO1xuXHRcdFx0XHRcdH0pKSB7IC8vIGlmIG5vbmUgb2YgdGhlIHJlZmVyZW5jZXMgYXJlIHVuZGVmaW5lZCwgYXNzaWduIHRoaXMgJ2RlZmF1bHQnXG5cdFx0XHRcdFx0XHR2YXIgYWxscGFyYW1zID0gJC5leHRlbmQoeyByZWZzOiByZWZzIH0sIGNvbnRleHQsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHR2YXIgZm9ybWFsUGFyYW1zID0gT2JqZWN0LmtleXMoYWxscGFyYW1zKTtcblx0XHRcdFx0XHRcdHZhciBhY3R1YWxQYXJhbXMgPSBmb3JtYWxQYXJhbXMubWFwKChmcGFyKSA9PiBhbGxwYXJhbXNbZnBhcl0pO1xuXHRcdFx0XHRcdFx0dmFyIGZpbmFsRm4gPSBkZWZTcGVjW2tleV0oZm9ybWFsUGFyYW1zKTtcblx0XHRcdFx0XHRcdG9ialtrZXldID0gZmluYWxGbi5hcHBseShudWxsLCBhY3R1YWxQYXJhbXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBjaGFuZ2U7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gd2l0aERlZmF1bHRzKG9iaiwgcGFyYW1zKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gKFUuaXNVbmRlZmluZWQob2JqKSA/IHt9IDogJC5leHRlbmQodHJ1ZSwge30sIG9iaikpO1xuXG5cdFx0XHR2YXIgY2hhbmdlID0gdHJ1ZTtcblx0XHRcdHdoaWxlIChjaGFuZ2UpIHtcblx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KHNwZWMsIHJlc3VsdCwgcmVzdWx0LCBwYXJhbXMgfHwge30pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9kZWZhdWx0cy5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGFrZXMgYW4gb2JqZWN0IG1hcHBpbmcgJ3NlbGVjdG9yJyDihpIgJ3Byb3BlcnR5JyDihpIgJ3ZhbHVlJyBhbmRcblx0Ly8gYXBwbGllcyBpdCBhcyBhIHNldCBvZiBDU1MgcnVsZXMgdG8gdGhlIGRlc2NlbmRhbnRzIG9mIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0Ly9cblx0JC5mbi5leHRlbmQoe1xuXHRcdGFteVB1dENzc1J1bGVzOiBmdW5jdGlvbiAocnVsZXMpIHtcblx0XHRcdCQuZWFjaChydWxlcywgKHNlbGVjdG9yLCBjc3MpID0+IHtcblx0XHRcdFx0dmFyIGNvbnRleHQ7XG5cdFx0XHRcdGlmIChzZWxlY3Rvci50cmltKCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbGVjdG9yLnRyaW0oKS5jaGFyQXQoMCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IudHJpbSgpLnN1YnN0cigxKS50cmltKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRleHQuY3NzKGNzcyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL3B1dC1jc3MtcnVsZXMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJrZWZpci1qcXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL3NyYy9wLXRpbGUtc2tpbi5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvc3JjL3AtdGlsZS1za2luLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvc3JjL3AtdGlsZS1za2luLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRpbGUtc2tpbi5zY3NzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnNraW5uZWQtdGlsZXtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LXdlYmtpdC1mbGV4O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstd2Via2l0LWZsZXgtZGlyZWN0aW9uOmNvbHVtbjstbXMtZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjt9LnNraW5uZWQtdGlsZT5oZWFkZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LXdlYmtpdC1hbGlnbi1pdGVtczpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmNlbnRlcjstd2Via2l0LWp1c3RpZnktY29udGVudDpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXdlaWdodDpib2xkO2JvcmRlci13aWR0aDoxcHg7b3ZlcmZsb3c6aGlkZGVuO30uc2tpbm5lZC10aWxlLm9wZW4+aGVhZGVye2hlaWdodDoyNnB4O2JvcmRlci1zdHlsZTpub25lIG5vbmUgc29saWQgbm9uZTtsaW5lLWhlaWdodDoyNnB4O2ZvbnQtc2l6ZToxOS41cHggIWltcG9ydGFudDt3aGl0ZS1zcGFjZTpub3dyYXA7fS5za2lubmVkLXRpbGU6bm90KC5vcGVuKT5oZWFkZXJ7LXdlYmtpdC1ib3gtZmxleDoxOy13ZWJraXQtZmxleC1ncm93OjE7LW1zLWZsZXgtcG9zaXRpdmU6MTtmbGV4LWdyb3c6MTtwYWRkaW5nOjAgNXB4O30uc2tpbm5lZC10aWxlPnNlY3Rpb257LXdlYmtpdC11c2VyLXNlbGVjdDp0ZXh0Oy1tb3otdXNlci1zZWxlY3Q6dGV4dDstbXMtdXNlci1zZWxlY3Q6dGV4dDt1c2VyLXNlbGVjdDp0ZXh0O30uc2tpbm5lZC10aWxlLm9wZW4+c2VjdGlvbnstd2Via2l0LWJveC1mbGV4OjE7LXdlYmtpdC1mbGV4LWdyb3c6MTstbXMtZmxleC1wb3NpdGl2ZToxO2ZsZXgtZ3JvdzoxO29wYWNpdHk6MTt9LnNraW5uZWQtdGlsZTpub3QoLm9wZW4pPnNlY3Rpb257b3BhY2l0eTowO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vc3JjL3AtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzSUU5ID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSA5XFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzSUU5KCk7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlVGV4dChzb3VyY2UsIGlkLCByZXBsYWNlbWVudCkge1xyXG5cdHZhciBib3VuZGFyaWVzID0gW1wiLyoqID4+XCIgKyBpZCArIFwiICoqL1wiLCBcIi8qKiBcIiArIGlkICsgXCI8PCAqKi9cIl07XHJcblx0dmFyIHN0YXJ0ID0gc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMF0pO1xyXG5cdHZhciB3cmFwcGVkUmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudFxyXG5cdFx0PyAoYm91bmRhcmllc1swXSArIHJlcGxhY2VtZW50ICsgYm91bmRhcmllc1sxXSlcclxuXHRcdDogXCJcIjtcclxuXHRpZiAoc291cmNlLmxhc3RJbmRleE9mKGJvdW5kYXJpZXNbMF0pID49IDApIHtcclxuXHRcdHZhciBlbmQgPSBzb3VyY2UubGFzdEluZGV4T2YoYm91bmRhcmllc1sxXSkgKyBib3VuZGFyaWVzWzFdLmxlbmd0aDtcclxuXHRcdHJldHVybiBzb3VyY2Uuc2xpY2UoMCwgc3RhcnQpICsgd3JhcHBlZFJlcGxhY2VtZW50ICsgc291cmNlLnNsaWNlKGVuZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBzb3VyY2UgKyB3cmFwcGVkUmVwbGFjZW1lbnQ7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQsIGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdFx0Y3NzID0gXCJAaW1wb3J0IHVybChcXFwiZGF0YTpzdHlsZXNoZWV0L2NzcztiYXNlNjQsXCIgKyBidG9hKGNzcykgKyBcIlxcXCIpXCI7XHJcblx0XHR9IGNhdGNoKGUpIHt9XHJcblx0fVxyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1za2luLmpzIn0=