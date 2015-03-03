(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["P"], root["Kefir"], root["TWEEN"], root["KefirJQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'position-tracking',
	    expects: ['core', 'tile-grow-when-open', 'tile-grow-when-maximized', 'tile-shrink-when-hidden']
	  });
	  plugin.add('Circuitboard.prototype._posTrackingWindow', function(window) {
	    window();
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    this._posTrackingLimiter = Kefir.limiter(Kefir.merge([Kefir.once(), Kefir.interval(100)]), this._posTrackingWindow.bind(this));
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    this.newProperty('animationIdle', {
	      settable: false,
	      initial: true
	    }).plug(Kefir.and([this.p('fullyOpen').or(this.p('fullyClosed')), this.p('fullyHidden').or(this.p('fullyVisible')), this.p('fullyMaximized').or(this.p('fullyNotMaximized'))]));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).plug(Kefir.merge([Kefir.once(), Kefir.interval(1000)]).limitedBy(this._posTrackingLimiter).map((function() {
	      return $__0.element.offset();
	    })));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).plug(Kefir.merge([Kefir.once(), this.parent.p('size').changes(), this.parent.p('offset').changes()]).limitedBy(this.circuitboard._posTrackingLimiter).map((function() {
	      return $__0.element.offset();
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).plug(Kefir.merge([Kefir.once(), this.parent.p('size').changes(), this.parent.p('offset').changes(), this.parent.on('reorganize'), this.p('animationIdle').value(true), Kefir.interval(1000).filterBy(this.p('animationIdle'))]).filter((function() {
	      return !$__0._offsetUpdated;
	    })).limitedBy(this.circuitboard._posTrackingLimiter).map((function() {
	      $__0._offsetUpdated = true;
	      return $__0.element.offset();
	    })));
	    this._offsetUpdated = false;
	    Kefir.interval(100).onValue((function() {
	      $__0._offsetUpdated = false;
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    this.newProperty('position', {
	      settable: false,
	      initial: new U.Position(0, 0)
	    });
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position', {
	      settable: false,
	      isEqual: U.Position.equals
	    }).plug(Kefir.merge([Kefir.once(), this.p('offset').changes(), this.circuitboard.p('offset').changes()]).map((function() {
	      return U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position', {
	      settable: false,
	      isEqual: U.Position.equals
	    }).plug(Kefir.merge([Kefir.once(), this.p('offset').changes(), this.circuitboard.p('offset').changes(), this.p('animationIdle').value(true), Kefir.interval(1000).filterBy(this.p('animationIdle'))]).filter((function() {
	      return !$__0._positionUpdated;
	    })).map((function() {
	      $__0._positionUpdated = true;
	      return U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    })));
	    this._positionUpdated = false;
	    Kefir.interval(100).onValue((function() {
	      $__0._positionUpdated = false;
	    }));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).plug(Kefir.merge([Kefir.once(), this.options.resizeEvent || $(window).asKefirStream('resize')]).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).plug(Kefir.merge([Kefir.once(), this.parent.p('size').changes()]).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).plug(Kefir.merge([Kefir.once(), this.parent.p('size').changes(), this.parent.on('reorganize'), this.p('animationIdle').value(true), Kefir.interval(1000).filterBy(this.p('animationIdle'))]).filter((function() {
	      return !$__0._sizeUpdated;
	    })).map((function() {
	      $__0._sizeUpdated = true;
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	    this._sizeUpdated = false;
	    Kefir.interval(100).onValue((function() {
	      $__0._sizeUpdated = false;
	    }));
	  });
	  plugin.insert('Tilemap.prototype.construct', function() {
	    this.newEvent('reorganize');
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.p('size').onValue((function() {
	      $__0.parent.trigger('reorganize');
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN, KefirJQuery) {
	  KefirJQuery.init(Kefir, $);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYmI4ZTRiYzg4Y2Y3MzJmZDE4OCIsIndlYnBhY2s6Ly8vLi9zcmMvcC1wb3NpdGlvbi10cmFja2luZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpckpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJrZWZpci1qcXVlcnlcIixcImNvbW1vbmpzXCI6XCJrZWZpci1qcXVlcnlcIixcImFtZFwiOlwia2VmaXItanF1ZXJ5XCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQzFIRCxnRDs7Ozs7O2lFQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0Esb0JBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLG9DQUFtQztBQUNuQyxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxvQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0Esc0JBQXFCLG1CQUFtQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQix5QkFBeUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQix5QkFBeUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBLHNCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7Ozs7QUM5UEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQSxrRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxtRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7QUMxTkQsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJLZWZpckpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxYmI4ZTRiYzg4Y2Y3MzJmZDE4OFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL3V0aWwvbWlzYy5qcycsICcuL3V0aWwva2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcbiAgICBuYW1lOiAncG9zaXRpb24tdHJhY2tpbmcnLFxuICAgIGV4cGVjdHM6IFsnY29yZScsICd0aWxlLWdyb3ctd2hlbi1vcGVuJywgJ3RpbGUtZ3Jvdy13aGVuLW1heGltaXplZCcsICd0aWxlLXNocmluay13aGVuLWhpZGRlbiddXG4gIH0pO1xuICBwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLl9wb3NUcmFja2luZ1dpbmRvdycsIGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHdpbmRvdygpO1xuICB9KTtcbiAgcGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wb3NUcmFja2luZ0xpbWl0ZXIgPSBLZWZpci5saW1pdGVyKEtlZmlyLm1lcmdlKFtLZWZpci5vbmNlKCksIEtlZmlyLmludGVydmFsKDEwMCldKSwgdGhpcy5fcG9zVHJhY2tpbmdXaW5kb3cuYmluZCh0aGlzKSk7XG4gIH0pO1xuICBwbHVnaW4uaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm5ld1Byb3BlcnR5KCdhbmltYXRpb25JZGxlJywge1xuICAgICAgc2V0dGFibGU6IGZhbHNlLFxuICAgICAgaW5pdGlhbDogdHJ1ZVxuICAgIH0pLnBsdWcoS2VmaXIuYW5kKFt0aGlzLnAoJ2Z1bGx5T3BlbicpLm9yKHRoaXMucCgnZnVsbHlDbG9zZWQnKSksIHRoaXMucCgnZnVsbHlIaWRkZW4nKS5vcih0aGlzLnAoJ2Z1bGx5VmlzaWJsZScpKSwgdGhpcy5wKCdmdWxseU1heGltaXplZCcpLm9yKHRoaXMucCgnZnVsbHlOb3RNYXhpbWl6ZWQnKSldKSk7XG4gIH0pO1xuICBwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB0aGlzLm5ld1Byb3BlcnR5KCdvZmZzZXQnLCB7XG4gICAgICBzZXR0YWJsZTogZmFsc2UsXG4gICAgICBpc0VxdWFsOiBVLlBvc2l0aW9uLmVxdWFscyxcbiAgICAgIGluaXRpYWw6IHRoaXMuZWxlbWVudC5vZmZzZXQoKVxuICAgIH0pLnBsdWcoS2VmaXIubWVyZ2UoW0tlZmlyLm9uY2UoKSwgS2VmaXIuaW50ZXJ2YWwoMTAwMCldKS5saW1pdGVkQnkodGhpcy5fcG9zVHJhY2tpbmdMaW1pdGVyKS5tYXAoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRfXzAuZWxlbWVudC5vZmZzZXQoKTtcbiAgICB9KSkpO1xuICB9KS5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB0aGlzLm5ld1Byb3BlcnR5KCdvZmZzZXQnLCB7XG4gICAgICBzZXR0YWJsZTogZmFsc2UsXG4gICAgICBpc0VxdWFsOiBVLlBvc2l0aW9uLmVxdWFscyxcbiAgICAgIGluaXRpYWw6IHRoaXMuZWxlbWVudC5vZmZzZXQoKVxuICAgIH0pLnBsdWcoS2VmaXIubWVyZ2UoW0tlZmlyLm9uY2UoKSwgdGhpcy5wYXJlbnQucCgnc2l6ZScpLmNoYW5nZXMoKSwgdGhpcy5wYXJlbnQucCgnb2Zmc2V0JykuY2hhbmdlcygpXSkubGltaXRlZEJ5KHRoaXMuY2lyY3VpdGJvYXJkLl9wb3NUcmFja2luZ0xpbWl0ZXIpLm1hcCgoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJF9fMC5lbGVtZW50Lm9mZnNldCgpO1xuICAgIH0pKSk7XG4gIH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMubmV3UHJvcGVydHkoJ29mZnNldCcsIHtcbiAgICAgIHNldHRhYmxlOiBmYWxzZSxcbiAgICAgIGlzRXF1YWw6IFUuUG9zaXRpb24uZXF1YWxzLFxuICAgICAgaW5pdGlhbDogdGhpcy5lbGVtZW50Lm9mZnNldCgpXG4gICAgfSkucGx1ZyhLZWZpci5tZXJnZShbS2VmaXIub25jZSgpLCB0aGlzLnBhcmVudC5wKCdzaXplJykuY2hhbmdlcygpLCB0aGlzLnBhcmVudC5wKCdvZmZzZXQnKS5jaGFuZ2VzKCksIHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJyksIHRoaXMucCgnYW5pbWF0aW9uSWRsZScpLnZhbHVlKHRydWUpLCBLZWZpci5pbnRlcnZhbCgxMDAwKS5maWx0ZXJCeSh0aGlzLnAoJ2FuaW1hdGlvbklkbGUnKSldKS5maWx0ZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEkX18wLl9vZmZzZXRVcGRhdGVkO1xuICAgIH0pKS5saW1pdGVkQnkodGhpcy5jaXJjdWl0Ym9hcmQuX3Bvc1RyYWNraW5nTGltaXRlcikubWFwKChmdW5jdGlvbigpIHtcbiAgICAgICRfXzAuX29mZnNldFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICRfXzAuZWxlbWVudC5vZmZzZXQoKTtcbiAgICB9KSkpO1xuICAgIHRoaXMuX29mZnNldFVwZGF0ZWQgPSBmYWxzZTtcbiAgICBLZWZpci5pbnRlcnZhbCgxMDApLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5fb2Zmc2V0VXBkYXRlZCA9IGZhbHNlO1xuICAgIH0pKTtcbiAgfSk7XG4gIHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5uZXdQcm9wZXJ0eSgncG9zaXRpb24nLCB7XG4gICAgICBzZXR0YWJsZTogZmFsc2UsXG4gICAgICBpbml0aWFsOiBuZXcgVS5Qb3NpdGlvbigwLCAwKVxuICAgIH0pO1xuICB9KS5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB0aGlzLm5ld1Byb3BlcnR5KCdwb3NpdGlvbicsIHtcbiAgICAgIHNldHRhYmxlOiBmYWxzZSxcbiAgICAgIGlzRXF1YWw6IFUuUG9zaXRpb24uZXF1YWxzXG4gICAgfSkucGx1ZyhLZWZpci5tZXJnZShbS2VmaXIub25jZSgpLCB0aGlzLnAoJ29mZnNldCcpLmNoYW5nZXMoKSwgdGhpcy5jaXJjdWl0Ym9hcmQucCgnb2Zmc2V0JykuY2hhbmdlcygpXSkubWFwKChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBVLlBvc2l0aW9uLnN1YnRyYWN0KCRfXzAub2Zmc2V0LCAkX18wLmNpcmN1aXRib2FyZC5vZmZzZXQpO1xuICAgIH0pKSk7XG4gIH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMubmV3UHJvcGVydHkoJ3Bvc2l0aW9uJywge1xuICAgICAgc2V0dGFibGU6IGZhbHNlLFxuICAgICAgaXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHNcbiAgICB9KS5wbHVnKEtlZmlyLm1lcmdlKFtLZWZpci5vbmNlKCksIHRoaXMucCgnb2Zmc2V0JykuY2hhbmdlcygpLCB0aGlzLmNpcmN1aXRib2FyZC5wKCdvZmZzZXQnKS5jaGFuZ2VzKCksIHRoaXMucCgnYW5pbWF0aW9uSWRsZScpLnZhbHVlKHRydWUpLCBLZWZpci5pbnRlcnZhbCgxMDAwKS5maWx0ZXJCeSh0aGlzLnAoJ2FuaW1hdGlvbklkbGUnKSldKS5maWx0ZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEkX18wLl9wb3NpdGlvblVwZGF0ZWQ7XG4gICAgfSkpLm1hcCgoZnVuY3Rpb24oKSB7XG4gICAgICAkX18wLl9wb3NpdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIFUuUG9zaXRpb24uc3VidHJhY3QoJF9fMC5vZmZzZXQsICRfXzAuY2lyY3VpdGJvYXJkLm9mZnNldCk7XG4gICAgfSkpKTtcbiAgICB0aGlzLl9wb3NpdGlvblVwZGF0ZWQgPSBmYWxzZTtcbiAgICBLZWZpci5pbnRlcnZhbCgxMDApLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5fcG9zaXRpb25VcGRhdGVkID0gZmFsc2U7XG4gICAgfSkpO1xuICB9KTtcbiAgcGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScsIHtcbiAgICAgIHNldHRhYmxlOiBmYWxzZSxcbiAgICAgIGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcbiAgICB9KS5wbHVnKEtlZmlyLm1lcmdlKFtLZWZpci5vbmNlKCksIHRoaXMub3B0aW9ucy5yZXNpemVFdmVudCB8fCAkKHdpbmRvdykuYXNLZWZpclN0cmVhbSgncmVzaXplJyldKS5tYXAoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBVLlNpemUoJF9fMC5lbGVtZW50LmhlaWdodCgpLCAkX18wLmVsZW1lbnQud2lkdGgoKSk7XG4gICAgfSkpKTtcbiAgfSkuaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScsIHtcbiAgICAgIHNldHRhYmxlOiBmYWxzZSxcbiAgICAgIGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcbiAgICB9KS5wbHVnKEtlZmlyLm1lcmdlKFtLZWZpci5vbmNlKCksIHRoaXMucGFyZW50LnAoJ3NpemUnKS5jaGFuZ2VzKCldKS5tYXAoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBVLlNpemUoJF9fMC5lbGVtZW50LmhlaWdodCgpLCAkX18wLmVsZW1lbnQud2lkdGgoKSk7XG4gICAgfSkpKTtcbiAgfSkuaW5zZXJ0KCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScsIHtcbiAgICAgIHNldHRhYmxlOiBmYWxzZSxcbiAgICAgIGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcbiAgICB9KS5wbHVnKEtlZmlyLm1lcmdlKFtLZWZpci5vbmNlKCksIHRoaXMucGFyZW50LnAoJ3NpemUnKS5jaGFuZ2VzKCksIHRoaXMucGFyZW50Lm9uKCdyZW9yZ2FuaXplJyksIHRoaXMucCgnYW5pbWF0aW9uSWRsZScpLnZhbHVlKHRydWUpLCBLZWZpci5pbnRlcnZhbCgxMDAwKS5maWx0ZXJCeSh0aGlzLnAoJ2FuaW1hdGlvbklkbGUnKSldKS5maWx0ZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEkX18wLl9zaXplVXBkYXRlZDtcbiAgICB9KSkubWFwKChmdW5jdGlvbigpIHtcbiAgICAgICRfXzAuX3NpemVVcGRhdGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXcgVS5TaXplKCRfXzAuZWxlbWVudC5oZWlnaHQoKSwgJF9fMC5lbGVtZW50LndpZHRoKCkpO1xuICAgIH0pKSk7XG4gICAgdGhpcy5fc2l6ZVVwZGF0ZWQgPSBmYWxzZTtcbiAgICBLZWZpci5pbnRlcnZhbCgxMDApLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5fc2l6ZVVwZGF0ZWQgPSBmYWxzZTtcbiAgICB9KSk7XG4gIH0pO1xuICBwbHVnaW4uaW5zZXJ0KCdUaWxlbWFwLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm5ld0V2ZW50KCdyZW9yZ2FuaXplJyk7XG4gIH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMucCgnc2l6ZScpLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5wYXJlbnQudHJpZ2dlcigncmVvcmdhbml6ZScpO1xuICAgIH0pKTtcbiAgfSk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcC1wb3NpdGlvbi10cmFja2luZy5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChmdW5jdGlvbihQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIFUgPSB7XG4gICAgbmV3Q2xhc3M6IGZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBuZXdTdWJjbGFzczogZnVuY3Rpb24oc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gICAgICBVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIGV4dGVuZDogZnVuY3Rpb24ob2JqMSkge1xuICAgICAgZm9yICh2YXIgcmVzdCA9IFtdLFxuICAgICAgICAgICRfXzEgPSAxOyAkX18xIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMSsrKVxuICAgICAgICByZXN0WyRfXzEgLSAxXSA9IGFyZ3VtZW50c1skX18xXTtcbiAgICAgIHJlc3QuZm9yRWFjaCgoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBvYmoxO1xuICAgIH0sXG4gICAgZmllbGQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbGw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgJF9fMiA9IDE7ICRfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18yKyspXG4gICAgICAgIGFyZ3NbJF9fMiAtIDFdID0gYXJndW1lbnRzWyRfXzJdO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSxcbiAgICBpZDogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSxcbiAgICBnZXREZWY6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBvYmplY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pO1xuICAgIH0sXG4gICAgYXJyYXk6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pO1xuICAgIH0sXG4gICAgcHVsbDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcbiAgICAgIHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFrZUVtcHR5OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgIHdoaWxlIChhcnIubGVuZ3RoID4gMCkge1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBiaW5kQTogZnVuY3Rpb24oZm4sIGN0eCwgYXJncykge1xuICAgICAgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSk7XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbihvYmosIG0pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18zID0gMjsgJF9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzMrKylcbiAgICAgICAgYXJnc1skX18zIC0gMl0gPSBhcmd1bWVudHNbJF9fM107XG4gICAgICByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncyk7XG4gICAgfSxcbiAgICBhcHBseUNvbnN0cnVjdG9yOiBmdW5jdGlvbihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG4gICAgICB2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuICAgIH0sXG4gICAgYXNzZXJ0OiBmdW5jdGlvbihjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzRGVmaW5lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfSxcbiAgICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9LFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG4gICAgfSxcbiAgICBvYmpWYWx1ZXM6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgbWFrZVBvc2l0aW9uZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWZPcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciB2YWx1ZXMgPSBbXSxcbiAgICAgICAgICAkX180ID0gMDsgJF9fNCA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzQrKylcbiAgICAgICAgdmFsdWVzWyRfXzRdID0gYXJndW1lbnRzWyRfXzRdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgY29udGV4dCkge1xuICAgICAgdmFyIHRpbWVvdXQ7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgdmFyIGxhdGVyRm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8ICRfXzAsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBvbmNlUGVyU3RhY2s6IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICAgIHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICBpZiAobm90UnVuWWV0KSB7XG4gICAgICAgICAgbm90UnVuWWV0ID0gZmFsc2U7XG4gICAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgICAgIH0pLCAwKTtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIGNhY2hlZDogZnVuY3Rpb24oJF9fNikge1xuICAgICAgdmFyICRfXzcgPSAkX182LFxuICAgICAgICAgIHJldHJpZXZlID0gJF9fNy5yZXRyaWV2ZSxcbiAgICAgICAgICBpc0VxdWFsID0gJF9fNy5pc0VxdWFsO1xuICAgICAgaXNFcXVhbCA9IGlzRXF1YWwgfHwgKChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSA9PT0gYik7XG4gICAgICB9KSk7XG4gICAgICB2YXIgY2FjaGU7XG4gICAgICBmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBjYWNoZTtcbiAgICAgICAgaWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgICAgICBjYWNoZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIG9uQ2hhbmdlLmZvckVhY2goKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuICAgICAgdmFyIHJlc3VsdEZuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgICB9KTtcbiAgICAgIHZhciBvbkNoYW5nZSA9IFtdO1xuICAgICAgcmVzdWx0Rm4ub25DaGFuZ2UgPSAoZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgb25DaGFuZ2UucHVzaChjYik7XG4gICAgICAgIHJldHVybiByZXN1bHRGbjtcbiAgICAgIH0pO1xuICAgICAgcmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuICAgICAgfSk7XG4gICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgIH0sXG4gICAgcHJvbWlzaWZ5OiBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICByZXR1cm4gbmV3IFAoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBmaW5kSW5kZXg6IGZ1bmN0aW9uKGFycmF5LCBwcmVkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgbWVtb2l6ZTogZnVuY3Rpb24oZm4pIHtcbiAgICAgIHZhciBrZXlzID0gW107XG4gICAgICB2YXIgY2FjaGUgPSBbXTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBrZXkuZXZlcnkoKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB2ID09PSBhcmdzW2ldO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHJldHVybiBjYWNoZVtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBrZXlzLnB1c2goYXJncyk7XG4gICAgICAgIGNhY2hlLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICB2YXIgRVBTID0gMC4wMDAwMDE7XG4gIHZhciBzb3J0T2ZFcXVhbCA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG4gIH0pO1xuICBVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbih0b3AsIGxlZnQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9KTtcbiAgVS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG4gIH0pO1xuICBVLlBvc2l0aW9uLmVxdWFscyA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuICB9KTtcbiAgVS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbihoZWlnaHQsIHdpZHRoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICB9KTtcbiAgVS5TaXplLmVxdWFscyA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG4gIH0pO1xuICByZXR1cm4gVTtcbn0pKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJywgJ2tlZmlyLWpxdWVyeSddLCBmdW5jdGlvbigkLCBVLCBLZWZpciwgVFdFRU4sIEtlZmlySlF1ZXJ5KSB7XG4gIEtlZmlySlF1ZXJ5LmluaXQoS2VmaXIsICQpO1xuICBLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgb2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9iai5vbihldmVudE5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9KTtcbiAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICgoZnVuY3Rpb24oZikge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gIH0pKTtcbiAgS2VmaXIuYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoKTtcbiAgICAgICAgICBpZiAoc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgaXRlcmF0aW9uRm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBzdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwgJF9fMSkge1xuICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgZHVyYXRpb24gPSAkX18yLmR1cmF0aW9uLFxuICAgICAgICBkZWxheSA9ICRfXzIuZGVsYXksXG4gICAgICAgIGVhc2luZyA9ICRfXzIuZWFzaW5nO1xuICAgIHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG4gICAgdmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBhZGRTdHJlYW0gPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNoYWluZWRTdHJlYW1zID0gMDtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGNoYWluZWRTdHJlYW1zICs9IDE7XG4gICAgICAgIGJ1cy5wbHVnKHN0cmVhbSk7XG4gICAgICAgIHN0cmVhbS5vbkVuZCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2hhaW5lZFN0cmVhbXMgLT0gMTtcbiAgICAgICAgICBpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHtcbiAgICAgICAgICAgIGJ1cy5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0pKSgpO1xuICAgIGFkZFN0cmVhbShLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBpZiAoZWFzaW5nKSB7XG4gICAgICAgIHR3LmVhc2luZyhlYXNpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgIHR3LmRlbGF5KGRlbGF5KTtcbiAgICAgIH1cbiAgICAgIHR3Lm9uVXBkYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQodGhpcyk7XG4gICAgICB9KTtcbiAgICAgIHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuICAgIH0pKSk7XG4gICAgYnVzLnR3ZWVuID0gdHc7XG4gICAgYnVzLnN0YXJ0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdHcuc3RhcnQoKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgYnVzLmNoYWluID0gKGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICBhZGRTdHJlYW0ob3RoZXIpO1xuICAgICAgdHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuICAgICAgcmV0dXJuIGJ1cztcbiAgICB9KTtcbiAgICByZXR1cm4gYnVzO1xuICB9O1xuICBLZWZpci5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleUNvZGUpIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZS5rZXlDb2RlID09PSBrZXlDb2RlO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIub25jZSA9IGZ1bmN0aW9uIG9uY2UodmFsdWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgZW1pdHRlci5lbWl0KHZhbHVlKTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgYXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgZW1pdHRlci5lbmQoKTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZykge1xuICAgIHZhciBoYW5kbGVyID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IFUuY2FsbDtcbiAgICB2YXIgd2FudGVkQnVzID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIG9wZW4gPSBLZWZpci5idXMoKTtcbiAgICB2YXIgY2xvc2UgPSBLZWZpci5idXMoKTtcbiAgICBwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgICBvcGVuLmVtaXQoKTtcbiAgICAgICAgd2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuICAgICAgICBjbG9zZS5lbWl0KCk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBidWZmZXIgPSAoYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9KS5idWZmZXI7XG4gICAgICB3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuICAgICAgcmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjY3VtdWxhdG9yID0gKGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICAgICAgcmV0dXJuIChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuICAgICAgfSkpO1xuICAgIH07XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gJF9fMC5vblZhbHVlKChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICB9KSk7XG4gICAgICB2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICBvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICB1bnN1YnNjcmliZVRvVGhpcygpO1xuICAgICAgICB1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG4gICAgICAgIGJ1ZmZlciA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24odmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBlID09PSB2YWx1ZTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB2YXIgZG9Ob3RoaW5nID0gKGZ1bmN0aW9uKCkge30pO1xuICAgIHRoaXMub25WYWx1ZShkb05vdGhpbmcpO1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAkX18wLm9mZlZhbHVlKGRvTm90aGluZyk7XG4gICAgfSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24obGFiZWwpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICByZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcbiAgICB9KSkubWFwKChmdW5jdGlvbihldmVudCkge1xuICAgICAgVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbihidXR0b25JZCkge1xuICAgIHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKChmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gYiA9PT0gYnV0dG9uSWQ7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIHByZWQoZS53aGljaCk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZygpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gKGFyZ3VtZW50c1swXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMF0gOiB7fSkudGhyZXNob2xkO1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKGZ1bmN0aW9uKG1vdXNlRG93bkV2ZW50KSB7XG4gICAgICB2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgICAgaWYgKGNyb3NzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuICAgICAgICAgIHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG4gICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gY3Jvc3NlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpLm1hcCgoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgbW91c2VEb3duRXZlbnQ6IG1vdXNlRG93bkV2ZW50LFxuICAgICAgICAgIG1vdXNlTW92ZUV2ZW50OiBtb3VzZU1vdmVFdmVudFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH07XG4gICQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWxCeSh1bnRpbFN0cmVhbSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcbiAgfTtcbiAgcmV0dXJuIEtlZmlyO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpckpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJrZWZpci1qcXVlcnlcIixcImNvbW1vbmpzXCI6XCJrZWZpci1qcXVlcnlcIixcImFtZFwiOlwia2VmaXItanF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC1wb3NpdGlvbi10cmFja2luZy5qcyJ9