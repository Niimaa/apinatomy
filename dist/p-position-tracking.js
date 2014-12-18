(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "baconjs", "tweenjs", "bacon.model", "bacon.jquery", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"), require("bluebird")) : factory(root["jQuery"], root["Bacon"], root["TWEEN"], root["bacon.model"], root["bacon.jquery"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'position-tracking',
	    expects: ['core', 'tile-weight']
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    this.newEvent('reset-positioning');
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this._p_posTracking_limiter = Bacon.limiter(Bacon.mergeAll([Bacon.once(), Bacon.interval(100)]), (function(window) {
	      var transform0 = $__0.element.css('transform');
	      var parentTransform0 = $__0.element.parent().css('transform');
	      $__0.element.css('transform', '');
	      $__0.element.parent().css('transform', '');
	      window();
	      $__0.element.css('transform', transform0);
	      $__0.element.parent().css('transform', parentTransform0);
	    }));
	  });
	  function catchUp() {
	    return Bacon.once().concat(Bacon.later(10)).concat(Bacon.later(50)).concat(Bacon.later(100)).concat(Bacon.later(500)).concat(Bacon.later(1000));
	  }
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).addSource(Bacon.mergeAll([Bacon.once(), Bacon.interval(1000)]).flatMapLatest(catchUp).limitedBy(this._p_posTracking_limiter).map((function() {
	      return $__0.element.offset();
	    })));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.parent.on('size').changes(), this.parent.on('offset').changes()]).flatMapLatest(catchUp).limitedBy(this.circuitboard._p_posTracking_limiter).map((function() {
	      return $__0.element.offset();
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.parent.on('size').changes(), this.parent.on('offset').changes(), this.parent.on('reorganize'), this.on('weight').changes(), this.on('reset-positioning')]).flatMapLatest(catchUp).limitedBy(this.circuitboard._p_posTracking_limiter).map((function() {
	      return $__0.element.offset();
	    })));
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
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('offset').changes(), this.circuitboard.on('offset').changes()]).flatMapLatest(catchUp).map((function() {
	      return U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position', {
	      settable: false,
	      isEqual: U.Position.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('offset').changes(), this.circuitboard.on('offset').changes()]).flatMapLatest(catchUp).map((function() {
	      return U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    })));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.options.resizeEvent || $(window).asEventStream('resize')]).flatMapLatest(catchUp).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.parent.on('size').changes()]).flatMapLatest(catchUp).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('weight').changes(), this.parent.on('size').changes(), this.parent.on('reorganize'), this.on('reset-positioning')]).flatMapLatest(catchUp).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  });
	  plugin.insert('Tilemap.prototype.construct', function() {
	    this.newEvent('reorganize');
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.on('size').onValue((function() {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(6);
	  __webpack_require__(7);
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2YjNmNmVhNjQwMDg5NDZlMDgxYyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uanNcIixcImNvbW1vbmpzXCI6XCJiYWNvbmpzXCIsXCJhbWRcIjpcImJhY29uanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFjb24ubW9kZWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNvbi5qcXVlcnlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FB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QUFDLENBQUM7S0FDM0UsRUFBQyxDQUFDO0dBQ0gsQ0FBQztBQUdELE1BQUcsV0FBVyxFQUFJLFNBQVMsV0FBUyxDQUFFLENBQUU7QUFDdkMsVUFBTyxFQUFDLENBQUMsSUFBRyxDQUFDLGNBQWUsQ0FBQywyQkFBMEIsQ0FBQyxDQUFDO0dBQzFELENBQUM7QUFHRCxRQUFPLE1BQUksQ0FBQztBQUdiLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztBQy9PQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmFjb25qc1wiLCBcInR3ZWVuanNcIiwgXCJiYWNvbi5tb2RlbFwiLCBcImJhY29uLmpxdWVyeVwiLCBcImJsdWViaXJkXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiQmFjb25cIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcImJhY29uLm1vZGVsXCJdLCByb290W1wiYmFjb24uanF1ZXJ5XCJdLCByb290W1wiUFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmIzZjZlYTY0MDA4OTQ2ZTA4MWNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL2JhY29uLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAncG9zaXRpb24tdHJhY2tpbmcnLFxuXHRcdGV4cGVjdHM6IFsnY29yZScsICd0aWxlLXdlaWdodCddXG5cdH0pO1xuXG5cblx0LyogYSB0aWxlIG1ldGhvZCB0byBwcm9ncmFtbWF0aWNhbGx5IHRyaWdnZXIgcG9zaXRpb24vc2l6ZSByZWNoZWNrICovXG5cdHBsdWdpbi5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3RXZlbnQoJ3Jlc2V0LXBvc2l0aW9uaW5nJyk7XG5cblx0fSk7XG5cblxuXHQvKiBhIHN0cmVhbSBsaW1pdGVyLCBzZXR0aW5nIHVwIGEgd2luZG93IGZvciBjYWxjdWxhdGluZyBlbGVtZW50IG9mZnNldHMgKi9cblx0cGx1Z2luLmluc2VydCgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF9wb3NUcmFja2luZ19saW1pdGVyID0gQmFjb24ubGltaXRlcihCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRCYWNvbi5vbmNlKCksXG5cdFx0XHRCYWNvbi5pbnRlcnZhbCgxMDApXG5cdFx0XSksICh3aW5kb3cpID0+IHtcblxuXHRcdFx0Lyogc2V0dXA6IHRlbXBvcmFyaWx5IHVuZG9lcyBhbGwgKDNEKSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNpcmN1aXRib2FyZCAqL1xuXHRcdFx0dmFyIHRyYW5zZm9ybTAgPSB0aGlzLmVsZW1lbnQuY3NzKCd0cmFuc2Zvcm0nKTtcblx0XHRcdHZhciBwYXJlbnRUcmFuc2Zvcm0wID0gdGhpcy5lbGVtZW50LnBhcmVudCgpLmNzcygndHJhbnNmb3JtJyk7XG5cdFx0XHR0aGlzLmVsZW1lbnQuY3NzKCd0cmFuc2Zvcm0nLCAnJyk7XG5cdFx0XHR0aGlzLmVsZW1lbnQucGFyZW50KCkuY3NzKCd0cmFuc2Zvcm0nLCAnJyk7XG5cblx0XHRcdC8qIHRoZSB3aW5kb3cgZm9yIGNvbXB1dGluZyBhbnkgdGlsZSdzIG9mZnNldCAqL1xuXHRcdFx0d2luZG93KCk7XG5cblx0XHRcdC8qIGJyZWFrZG93bjogcmVzdG9yZSB0aGUgKDNEKSB0cmFuc2Zvcm1hdGlvbnMgKi9cblx0XHRcdHRoaXMuZWxlbWVudC5jc3MoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybTApO1xuXHRcdFx0dGhpcy5lbGVtZW50LnBhcmVudCgpLmNzcygndHJhbnNmb3JtJywgcGFyZW50VHJhbnNmb3JtMCk7XG5cblx0XHR9KTtcblx0fSk7XG5cblxuXG5cblx0LyogdGhlICdvZmZzZXQnIG9ic2VydmFibGUgKi9cblx0ZnVuY3Rpb24gY2F0Y2hVcCgpIHtcblx0XHRyZXR1cm4gQmFjb24ub25jZSgpXG5cdFx0XHRcdC5jb25jYXQoQmFjb24ubGF0ZXIoMTApKVxuXHRcdFx0XHQuY29uY2F0KEJhY29uLmxhdGVyKDUwKSlcblx0XHRcdFx0LmNvbmNhdChCYWNvbi5sYXRlcigxMDApKVxuXHRcdFx0XHQuY29uY2F0KEJhY29uLmxhdGVyKDUwMCkpXG5cdFx0XHRcdC5jb25jYXQoQmFjb24ubGF0ZXIoMTAwMCkpO1xuXHR9XG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnb2Zmc2V0Jywge1xuXHRcdFx0c2V0dGFibGU6IGZhbHNlLFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHMsXG5cdFx0XHRpbml0aWFsOiB0aGlzLmVsZW1lbnQub2Zmc2V0KClcblx0XHR9KS5hZGRTb3VyY2UoQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0QmFjb24uaW50ZXJ2YWwoMTAwMClcblx0XHRcdC8vIFRPRE86IGFsbG93IG91dHNpZGUgc3RyZWFtIHRvIHRyaWdnZXIgdGhpc1xuXHRcdF0pLmZsYXRNYXBMYXRlc3QoY2F0Y2hVcCkubGltaXRlZEJ5KHRoaXMuX3BfcG9zVHJhY2tpbmdfbGltaXRlcikubWFwKCgpID0+IHRoaXMuZWxlbWVudC5vZmZzZXQoKSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZW1hcC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnb2Zmc2V0Jywge1xuXHRcdFx0c2V0dGFibGU6IGZhbHNlLFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHMsXG5cdFx0XHRpbml0aWFsOiB0aGlzLmVsZW1lbnQub2Zmc2V0KClcblx0XHR9KS5hZGRTb3VyY2UoQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnKS5jaGFuZ2VzKCksXG5cdFx0XHR0aGlzLnBhcmVudC5vbignb2Zmc2V0JykuY2hhbmdlcygpXG5cdFx0XSkuZmxhdE1hcExhdGVzdChjYXRjaFVwKS5saW1pdGVkQnkodGhpcy5jaXJjdWl0Ym9hcmQuX3BfcG9zVHJhY2tpbmdfbGltaXRlcikubWFwKCgpID0+IHRoaXMuZWxlbWVudC5vZmZzZXQoKSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnb2Zmc2V0Jywge1xuXHRcdFx0c2V0dGFibGU6IGZhbHNlLFxuXHRcdFx0aXNFcXVhbDogVS5Qb3NpdGlvbi5lcXVhbHMsXG5cdFx0XHRpbml0aWFsOiB0aGlzLmVsZW1lbnQub2Zmc2V0KClcblx0XHR9KS5hZGRTb3VyY2UoQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnKS5jaGFuZ2VzKCksXG5cdFx0XHR0aGlzLnBhcmVudC5vbignb2Zmc2V0JykuY2hhbmdlcygpLFxuXHRcdFx0dGhpcy5wYXJlbnQub24oJ3Jlb3JnYW5pemUnKSxcblx0XHRcdHRoaXMub24oJ3dlaWdodCcpLmNoYW5nZXMoKSxcblx0XHRcdHRoaXMub24oJ3Jlc2V0LXBvc2l0aW9uaW5nJylcblx0XHRdKS5mbGF0TWFwTGF0ZXN0KGNhdGNoVXApLmxpbWl0ZWRCeSh0aGlzLmNpcmN1aXRib2FyZC5fcF9wb3NUcmFja2luZ19saW1pdGVyKS5tYXAoKCkgPT4gdGhpcy5lbGVtZW50Lm9mZnNldCgpKSk7XG5cblx0fSk7XG5cblxuXHQvKiB0aGUgJ3Bvc2l0aW9uJyBvYnNlcnZhYmxlICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogZm9yIGNvbXBsZXRlbmVzcyBzYWtlOyBpdCdzICgwLCAwKSBieSBkZWZpbml0aW9uICovXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgncG9zaXRpb24nLCB7XG5cdFx0XHRzZXR0YWJsZTogZmFsc2UsXG5cdFx0XHRpbml0aWFsOiBuZXcgVS5Qb3NpdGlvbigwLCAwKVxuXHRcdH0pO1xuXG5cdH0pLmluc2VydCgnVGlsZW1hcC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgncG9zaXRpb24nLCB7XG5cdFx0XHRzZXR0YWJsZTogZmFsc2UsXG5cdFx0XHRpc0VxdWFsOiBVLlBvc2l0aW9uLmVxdWFsc1xuXHRcdH0pLmFkZFNvdXJjZShCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRCYWNvbi5vbmNlKCksXG5cdFx0XHR0aGlzLm9uKCdvZmZzZXQnKS5jaGFuZ2VzKCksXG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5vbignb2Zmc2V0JykuY2hhbmdlcygpXG5cdFx0XSkuZmxhdE1hcExhdGVzdChjYXRjaFVwKS5tYXAoKCkgPT4gVS5Qb3NpdGlvbi5zdWJ0cmFjdCh0aGlzLm9mZnNldCwgdGhpcy5jaXJjdWl0Ym9hcmQub2Zmc2V0KSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgncG9zaXRpb24nLCB7XG5cdFx0XHRzZXR0YWJsZTogZmFsc2UsXG5cdFx0XHRpc0VxdWFsOiBVLlBvc2l0aW9uLmVxdWFsc1xuXHRcdH0pLmFkZFNvdXJjZShCYWNvbi5tZXJnZUFsbChbXG5cdFx0XHRCYWNvbi5vbmNlKCksXG5cdFx0XHR0aGlzLm9uKCdvZmZzZXQnKS5jaGFuZ2VzKCksXG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5vbignb2Zmc2V0JykuY2hhbmdlcygpXG5cdFx0XSkuZmxhdE1hcExhdGVzdChjYXRjaFVwKS5tYXAoKCkgPT4gVS5Qb3NpdGlvbi5zdWJ0cmFjdCh0aGlzLm9mZnNldCwgdGhpcy5jaXJjdWl0Ym9hcmQub2Zmc2V0KSkpO1xuXG5cdH0pO1xuXG5cblx0LyogdGhlICdzaXplJyBvYnNlcnZhYmxlICovXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScsIHtcblx0XHRcdHNldHRhYmxlOiBmYWxzZSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KS5hZGRTb3VyY2UoQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0dGhpcy5vcHRpb25zLnJlc2l6ZUV2ZW50IHx8ICQod2luZG93KS5hc0V2ZW50U3RyZWFtKCdyZXNpemUnKVxuXHRcdF0pLmZsYXRNYXBMYXRlc3QoY2F0Y2hVcCkubWFwKCgpID0+IG5ldyBVLlNpemUodGhpcy5lbGVtZW50LmhlaWdodCgpLCB0aGlzLmVsZW1lbnQud2lkdGgoKSkpKTtcblxuXHR9KS5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3UHJvcGVydHkoJ3NpemUnLCB7XG5cdFx0XHRzZXR0YWJsZTogZmFsc2UsXG5cdFx0XHRpc0VxdWFsOiBVLlNpemUuZXF1YWxzXG5cdFx0fSkuYWRkU291cmNlKEJhY29uLm1lcmdlQWxsKFtcblx0XHRcdEJhY29uLm9uY2UoKSxcblx0XHRcdHRoaXMucGFyZW50Lm9uKCdzaXplJykuY2hhbmdlcygpXG5cdFx0XSkuZmxhdE1hcExhdGVzdChjYXRjaFVwKS5tYXAoKCkgPT4gbmV3IFUuU2l6ZSh0aGlzLmVsZW1lbnQuaGVpZ2h0KCksIHRoaXMuZWxlbWVudC53aWR0aCgpKSkpO1xuXG5cdH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnc2l6ZScsIHtcblx0XHRcdHNldHRhYmxlOiBmYWxzZSxcblx0XHRcdGlzRXF1YWw6IFUuU2l6ZS5lcXVhbHNcblx0XHR9KS5hZGRTb3VyY2UoQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0QmFjb24ub25jZSgpLFxuXHRcdFx0dGhpcy5vbignd2VpZ2h0JykuY2hhbmdlcygpLFxuXHRcdFx0dGhpcy5wYXJlbnQub24oJ3NpemUnKS5jaGFuZ2VzKCksXG5cdFx0XHR0aGlzLnBhcmVudC5vbigncmVvcmdhbml6ZScpLFxuXHRcdFx0dGhpcy5vbigncmVzZXQtcG9zaXRpb25pbmcnKVxuXHRcdF0pLmZsYXRNYXBMYXRlc3QoY2F0Y2hVcCkubWFwKCgpID0+IG5ldyBVLlNpemUodGhpcy5lbGVtZW50LmhlaWdodCgpLCB0aGlzLmVsZW1lbnQud2lkdGgoKSkpKTtcblxuXHR9KTtcblxuXG5cdC8qICBpZiB0aGUgc2l6ZSBvZiBhbnkgdGlsZSBjaGFuZ2VzLCB0cmlnZ2VyIHRoZSAncmVvcmdhbml6ZScgICAgICovXG5cdC8qICBldmVudCBvbiB0aGUgcGFyZW50IHRpbGVtYXAsIHNvIHRoYXQgc2libGluZyB0aWxlcyBjYW4gcmVhY3QgICovXG5cdHBsdWdpbi5pbnNlcnQoJ1RpbGVtYXAucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3RXZlbnQoJ3Jlb3JnYW5pemUnKTtcblxuXHR9KS5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMub24oJ3NpemUnKS5vblZhbHVlKCgpID0+IHsgdGhpcy5wYXJlbnQudHJpZ2dlcigncmVvcmdhbml6ZScpIH0pO1xuXG5cdH0pO1xuXG59KTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXBvc2l0aW9uLXRyYWNraW5nLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnYmFjb25qcycsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbiwgVFdFRU4pIHtcblxuXHRyZXF1aXJlKCdiYWNvbi5tb2RlbCcpO1xuXHRyZXF1aXJlKCdiYWNvbi5qcXVlcnknKTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIG1ldGhvZCB3b3JrcyB3aXRoIGV2ZW50cyB0aGF0IGNhbiBoYXZlIG9ubHkgb25lIHN1YnNjcmliZXIsXG5cdC8vIHRoYXQgY2FuIGJlIHVuLXN1YnNjcmliZWQgYnkgc2V0dGluZyB0aGUgc3Vic2NyaWJlciB0byBgbnVsbGAuXG5cdC8vIFRoaXMgZnVuY3Rpb24gaXMgbWVtb2l6ZWQsIHNvIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBpcyB0YWtlbixcblx0Ly8gYW5kIHRoZSBzYW1lIHN0cmVhbSBmb3IgaXQgcmV0dXJuZWQgZm9yIGVhY2ggcmVxdWVzdC5cblx0QmFjb24uZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdG9iai5vbihldmVudE5hbWUsICh2KSA9PiB7IHNpbmsobmV3IEJhY29uLk5leHQodikpIH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuXHRcdFx0KChmKSA9PiB7IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfSk7XG5cdEJhY29uLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChzaW5rKCkgPT09IEJhY29uLm5vTW9yZSkgeyBzdWJzY3JpYmVkID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmIChzdWJzY3JpYmVkKSB7IGl0ZXJhdGlvbkZuKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4geyBzdWJzY3JpYmVkID0gZmFsc2UgfTtcblxuXHRcdH0pO1xuXHR9O1xuXG5cblx0QmFjb24udHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBzaW5rKG5ldyBCYWNvbi5OZXh0KCgpID0+IHRoaXMpKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoKCkgPT4geyBzaW5rKG5ldyBCYWNvbi5FbmQoKSkgfSk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRCYWNvbi5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleWNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzRXZlbnRTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleWNvZGUpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRCYWNvbi5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBvcGVuID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBjbG9zZSA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXIod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKGhhbmRsZXIsICgpID0+IHtcblx0XHRcdG9wZW4ucHVzaCgpO1xuXHRcdFx0d2FudGVkQnVzLnB1c2goZmFsc2UpO1xuXHRcdFx0Y2xvc2UucHVzaCgpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXAodHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIGNsb3NlLnN0YXJ0V2l0aCh0cnVlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsKG9wZW4pLnJlZHVjZShbXSwgYWNjdW11bGF0b3IpLmZsYXRNYXAoQmFjb24uZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaChuZXcgQmFjb24uTmV4dCgoKSA9PiB2YWx1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRzaW5rKG9sZEJ1ZmZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3Vic2NyaWJlKCgpPT57fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGxhYmVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChldmVudCkgPT4ge1xuXHRcdFx0cmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG5cdFx0fSkubWFwKChldmVudCkgPT4ge1xuXHRcdFx0VS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBGaWx0ZXIgZXZlbnRzIHRvIG9ubHkgY2VydGFpbiBrZXlzIC8gYnV0dG9ucy4gQ2FuIGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uIG9yIHNpbmdsZSBudW1iZXIuXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS53aGljaCA9IGZ1bmN0aW9uIChidXR0b25JZCkge1xuXHRcdHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKGIgPT4gYiA9PT0gYnV0dG9uSWQpO1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcihlID0+IHByZWQoZS53aGljaCkpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbVxuXHRcdFx0XHRcdC50YWtlVW50aWwoJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbCh1bnRpbFN0cmVhbSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBCYWNvbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvYmFjb24tYW5kLWVnZ3MuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifVxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24ubW9kZWxcIlxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhY29uLmpxdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtcG9zaXRpb24tdHJhY2tpbmcuanMifQ==