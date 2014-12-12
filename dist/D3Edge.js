(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("bacon"), require("tweenjs"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "bacon", "tweenjs", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("bacon"), require("tweenjs"), require("delta-js")) : factory(root["jQuery"], root["P"], root["Bacon"], root["TWEEN"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_14__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, Artefact) {
	  'use strict';
	  return Artefact.newSubclass('D3Edge', function D3Edge($__0) {
	    var $__1 = $__0,
	        source = $__1.source,
	        target = $__1.target;
	    this._source = source;
	    this._target = target;
	    Bacon.mergeAll(source.on('destroy'), target.on('destroy')).take(1).assign(this, 'destroy');
	  }, {
	    get source() {
	      return this._source;
	    },
	    get target() {
	      return this._target;
	    },
	    get element() {
	      if (!this._element) {
	        this._element = $(("<svg><line class=\"edge " + this.options.cssClass + "\"></line></svg>")).children();
	      }
	      return this._element;
	    },
	    get graphZIndex() {
	      return this.options.graphZIndex;
	    }
	  }, {
	    graphZIndex: 100,
	    cssClass: ''
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(6), !(function webpackMissingModule() { var e = new Error("Cannot find module \"Array.prototype.findIndex\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
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
	  Bacon.animationFrames = U.memoize(function animationFrames() {
	    var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	      return window.setTimeout(f, 1000 / 60);
	    }));
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
	  });
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
	  $.fn.mouseDrag = function mouseDrag($__1) {
	    var threshold = $__1.threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove').takeUntil($(document).asEventStream('mouseup'));
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
	      return stream.map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(2), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm) {
	  'use strict';
	  var Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, function Artefact(superFn, options) {
	    superFn();
	    var $__0 = this._options = options,
	        id = $__0.id,
	        type = $__0.type,
	        parent = $__0.parent;
	    this._id = id || uniqueID(type);
	    this._type = type;
	    this._parent = parent;
	    this._children = [];
	    if (parent) {
	      U.array(parent, '_children').push(this);
	    }
	    this.newEvent('destroy');
	  }, {
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
	  Artefact.newSubclass = function newSubClass(name, constructor) {
	    var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	    var optionDefaults = arguments[3] !== (void 0) ? arguments[3] : {};
	    return dm.vp(name, U.newSubclass(Artefact, function(superFn) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      var processedOptions = options;
	      Object.keys(optionDefaults).forEach((function(key) {
	        if (U.isUndefined(processedOptions[key])) {
	          processedOptions[key] = optionDefaults[key];
	        }
	      }));
	      processedOptions.type = name;
	      superFn(U.extend(options, processedOptions));
	      constructor.call(this, processedOptions);
	    }, U.extend({}, prototype, {get circuitboard() {
	        if (!this._circuitboard) {
	          this._circuitboard = this.closestAncestorByType('Circuitboard');
	        }
	        return this._circuitboard;
	      }})));
	  };
	  return Artefact;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/D3Edge.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/D3Edge.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	exports.push([module.id, "", ""]);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
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
	      if (!this._properties[name]) {
	        this._propertyBusses[name] = new Bacon.Bus();
	        this._properties[name] = this._propertyBusses[name].toProperty().name(name);
	        this._properties[name].appendModifier = function(modifier) {
	          for (var args = [],
	              $__0 = 1; $__0 < arguments.length; $__0++)
	            args[$__0 - 1] = arguments[$__0];
	          this._properties[name] = this._properties[name][modifier].apply(this._properties[name], args);
	        };
	      }
	      return this._properties[name];
	    },
	    newProperty: function(name) {
	      var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
	          source = $__1.source,
	          settable = $__1.settable,
	          initial = $__1.initial,
	          isEqual = $__1.isEqual;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name] || !this._properties[name]._amy_plugged, ("There is already a property '" + name + "' on this object."));
	      this.property(name)._amy_plugged = true;
	      var innerBus = new Bacon.Bus();
	      if (source) {
	        innerBus.plug(source);
	      } else if (settable !== false) {
	        settable = true;
	      }
	      var value;
	      Object.defineProperty(this, name, settable ? {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          innerBus.push(newValue);
	        }
	      } : {get: function() {
	          return value;
	        }});
	      var innerProperty = innerBus.skipDuplicates(isEqual);
	      this._propertyBusses[name].plug(innerProperty);
	      this.property(name).onValue((function(v) {
	        value = v;
	      }));
	      if (U.isDefined(initial)) {
	        innerBus.push(initial);
	      }
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
	


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyOThlOTc1MWI3YjNjNzc5MmE1NCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9EM0VkZ2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9hcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L0QzRWRnZS5zY3NzPzFjODMiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvRDNFZGdlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvYmFjb24tc2lnbmFsLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn0iLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0Esd0JBQ0QsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsTUFBSSxDQUFHLFNBQU87QUFDaEMsY0FBVyxDQUFDO0FBR1osUUFBTyxTQUFPLFlBQWEsQ0FBQyxRQUFPLENBQUcsU0FBUyxPQUFLLENBQUUsSUFBZTs7QUFBZCxjQUFLO0FBQUcsY0FBSztBQUduRSxRQUFHLFFBQVEsRUFBSSxPQUFLLENBQUM7QUFDckIsUUFBRyxRQUFRLEVBQUksT0FBSyxDQUFDO0FBR3JCLFNBQUksU0FBVSxDQUNaLE1BQUssR0FBSSxDQUFDLFNBQVEsQ0FBQyxDQUNuQixPQUFLLEdBQUksQ0FBQyxTQUFRLENBQUMsQ0FD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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkhBLGlEOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCIsIFwiYmFjb25cIiwgXCJ0d2VlbmpzXCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE0X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyOThlOTc1MWI3YjNjNzc5MmE1NFxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL2JhY29uLWFuZC1lZ2dzLmpzJyxcblx0Jy4vdXRpbC9hcnRlZmFjdC5qcycsXG5cdCcuL0QzRWRnZS5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIFUsIEJhY29uLCBBcnRlZmFjdCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHRyZXR1cm4gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ0QzRWRnZScsIGZ1bmN0aW9uIEQzRWRnZSh7c291cmNlLCB0YXJnZXR9KSB7XG5cblx0XHQvKiBzdG9yZSByZWZlcmVuY2VzIHRvIHRoZSB0d28gdmVydGljZXMgKi9cblx0XHR0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG5cdFx0dGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuXG5cdFx0Lyogd2hlbiBvbmUgb2YgdGhlIHZlcnRpY2VzIGlzIGRlc3Ryb3llZCwgc28gaXMgdGhpcyBlZGdlICovXG5cdFx0QmFjb24ubWVyZ2VBbGwoXG5cdFx0XHRcdHNvdXJjZS5vbignZGVzdHJveScpLFxuXHRcdFx0XHR0YXJnZXQub24oJ2Rlc3Ryb3knKVxuXHRcdCkudGFrZSgxKS5hc3NpZ24odGhpcywgJ2Rlc3Ryb3knKTtcblxuXHR9LCB7XG5cblx0XHRnZXQgc291cmNlKCkgeyByZXR1cm4gdGhpcy5fc291cmNlIH0sXG5cblx0XHRnZXQgdGFyZ2V0KCkgeyByZXR1cm4gdGhpcy5fdGFyZ2V0IH0sXG5cblx0XHRnZXQgZWxlbWVudCgpIHtcblx0XHRcdGlmICghdGhpcy5fZWxlbWVudCkge1xuXHRcdFx0XHQvLyBhZGRpbmcgYW5kIGRpc2NhcmRpbmcgYW4gJ3N2ZycgZWxlbWVudCBwcmV2ZW50cyBhIGJ1ZyB3aGVyZSB0aGUgbGluZSB3b3VsZCBub3QgYXBwZWFyXG5cdFx0XHRcdHRoaXMuX2VsZW1lbnQgPSAkKGA8c3ZnPjxsaW5lIGNsYXNzPVwiZWRnZSAke3RoaXMub3B0aW9ucy5jc3NDbGFzc31cIj48L2xpbmU+PC9zdmc+YCkuY2hpbGRyZW4oKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLl9lbGVtZW50O1xuXHRcdH0sXG5cblx0XHRnZXQgZ3JhcGhaSW5kZXgoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMuZ3JhcGhaSW5kZXggfVxuXG5cdH0sIHtcblx0XHRncmFwaFpJbmRleDogMTAwLFxuXHRcdGNzc0NsYXNzOiAnJ1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvRDNFZGdlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnYmFjb24nLCAnQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3MoU3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW1N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmJpbmQodGhpcyldLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgaXRzIGZpcnN0IGFyZ3VtZW50XG5cdFx0aWQodikgeyByZXR1cm4gdiB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGRlZmluZWQsIGdpdmUgaXQgYSBkZWZhdWx0IHZhbHVlIGZpcnN0OyBpZiB0aGUgZ2l2ZW4gdmFsdWVcblx0XHQvLyBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBjYWxsZWQsIGFuZCBpdHMgcmVzdWx0IGlzIHVzZWRcblx0XHRnZXREZWYob2JqLCBuYW1lLCB2YWx1ZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUoKSB9XG5cdFx0XHRcdG9ialtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSkgfSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKSB9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGZpbmRJbmRleChhcnJheSwgcHJlZCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHRpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7IHJldHVybiBpIH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXG5cdFx0Ly8gdGhpcyBgbWVtb2l6ZWAgZnVuY3Rpb24gaXMgU0xPVywgYXMgaXQgdXNlcyBsaW5lYXIgc2VhcmNoXG5cdFx0bWVtb2l6ZShmbikge1xuXHRcdFx0dmFyIGtleXMgPSBbXTtcblx0XHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGNoZWNrIHRoZSBjYWNoZSAqL1xuXHRcdFx0XHR2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoa2V5KSA9PiBrZXkuZXZlcnkoKHYsIGkpID0+IHYgPT09IGFyZ3NbaV0pKTtcblx0XHRcdFx0aWYgKGluZGV4ID49IDApIHsgcmV0dXJuIGNhY2hlW2luZGV4XSB9XG5cblx0XHRcdFx0Lyogbm8gY2FjaGUgaGl0OyBjb21wdXRlIHZhbHVlLCBzdG9yZSBhbmQgcmV0dXJuICovXG5cdFx0XHRcdHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0a2V5cy5wdXNoKGFyZ3MpO1xuXHRcdFx0XHRjYWNoZS5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHR9O1xuXG5cblx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXHR2YXIgc29ydE9mRXF1YWwgPSAoYSwgYikgPT4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcblx0fTtcblxuXG5cdHJldHVybiBVO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2JhY29uJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEJhY29uLCBUV0VFTikge1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgbWV0aG9kIHdvcmtzIHdpdGggZXZlbnRzIHRoYXQgY2FuIGhhdmUgb25seSBvbmUgc3Vic2NyaWJlcixcblx0Ly8gdGhhdCBjYW4gYmUgdW4tc3Vic2NyaWJlZCBieSBzZXR0aW5nIHRoZSBzdWJzY3JpYmVyIHRvIGBudWxsYC5cblx0Ly8gVGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCwgc28gb25seSBvbmUgc3Vic2NyaXB0aW9uIGlzIHRha2VuLFxuXHQvLyBhbmQgdGhlIHNhbWUgc3RyZWFtIGZvciBpdCByZXR1cm5lZCBmb3IgZWFjaCByZXF1ZXN0LlxuXHRCYWNvbi5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0b2JqLm9uKGV2ZW50TmFtZSwgKHYpID0+IHsgc2luayhuZXcgQmFjb24uTmV4dCh2KSkgfSk7XG5cdFx0XHRyZXR1cm4gKCkgPT4geyBvYmoub24oZXZlbnROYW1lLCBudWxsKSB9O1xuXHRcdH0pO1xuXHR9KTtcblxuXG5cdEJhY29uLmFuaW1hdGlvbkZyYW1lcyA9IFUubWVtb2l6ZShmdW5jdGlvbiBhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID1cblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdCgoZikgPT4gd2luZG93LnNldFRpbWVvdXQoZiwgMTAwMCAvIDYwKSk7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0Lyogc2VsZi1jYWxsaW5nIGFuaW1hdGlvbi1mcmFtZSBsb29wICovXG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0dmFyIGl0ZXJhdGlvbkZuID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRzaW5rKCk7XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHN0YXJ0IGl0IG5vdyAqL1xuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblxuXHRcdFx0LyogdW5zdWJzY3JpYmUgZnVuY3Rpb24gKi9cblx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHRzaW5rKG5ldyBCYWNvbi5FbmQoKSk7XG5cdFx0XHR9O1xuXG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0QmFjb24udHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBzaW5rKG5ldyBCYWNvbi5OZXh0KCgpID0+IHRoaXMpKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoKCkgPT4geyBzaW5rKG5ldyBCYWNvbi5FbmQoKSkgfSk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRCYWNvbi5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleWNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzRXZlbnRTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleWNvZGUpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRCYWNvbi5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBvcGVuID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBjbG9zZSA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXIod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKGhhbmRsZXIsICgpID0+IHtcblx0XHRcdG9wZW4ucHVzaCgpO1xuXHRcdFx0d2FudGVkQnVzLnB1c2goZmFsc2UpO1xuXHRcdFx0Y2xvc2UucHVzaCgpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXAodHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIGNsb3NlLnN0YXJ0V2l0aCh0cnVlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsKG9wZW4pLnJlZHVjZShbXSwgYWNjdW11bGF0b3IpLmZsYXRNYXAoQmFjb24uZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaChuZXcgQmFjb24uTmV4dCgoKSA9PiB2YWx1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRzaW5rKG9sZEJ1ZmZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3Vic2NyaWJlKCgpPT57fSk7XG5cdH07XG5cblxuXHQvKiBFdmVudFN0cmVhbSBnZW5lcmF0b3JzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0JC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoe3RocmVzaG9sZH0pIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0V2ZW50U3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChtb3VzZURvd25FdmVudCkgPT4ge1xuXHRcdFx0dmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNlbW92ZScpLnRha2VVbnRpbCgkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZXVwJykpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHRzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChtb3VzZU1vdmVFdmVudCkgPT4geyAvLyBUT0RPOiBkb24ndCB1c2UgJ2ZpbHRlcicsIGJ1dCBzb21ldGhpbmcgbGlrZSAnc2tpcFVudGlsJyBvciAnZmxhdE1hcCdcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyZWFtLm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBCYWNvbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvYmFjb24tYW5kLWVnZ3MuanNcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2JsdWViaXJkJyxcblx0Jy4vbWlzYy5qcycsXG5cdCcuL2JhY29uLXNpZ25hbC1oYW5kbGVyLmpzJyxcblx0Jy4vdW5pcXVlLWlkLmpzJyxcblx0Jy4vbWFpbi1kZWx0YS1tb2RlbC5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBVLCBCYWNvblNpZ25hbEhhbmRsZXIsIHVuaXF1ZUlELCBkbSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKioge0BleHBvcnQgQGNsYXNzIEFydGVmYWN0IEBleHRlbmRzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBCYWNvbi5qcy5cblx0ICovXG5cdHZhciBBcnRlZmFjdCA9IGRtLnZwKCdBcnRlZmFjdCcsIFUubmV3U3ViY2xhc3MoQmFjb25TaWduYWxIYW5kbGVyLCBmdW5jdGlvbiBBcnRlZmFjdChzdXBlckZuLCBvcHRpb25zKSB7XG5cdFx0c3VwZXJGbigpO1xuXG5cdFx0dmFyIHtpZCwgdHlwZSwgcGFyZW50fSA9IHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0Lyogc2V0IGhpZXJhcmNoeSBzdHVmZiAqL1xuXHRcdHRoaXMuX2lkID0gaWQgfHwgdW5pcXVlSUQodHlwZSk7XG5cdFx0dGhpcy5fdHlwZSA9IHR5cGU7XG5cdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdFx0aWYgKHBhcmVudCkgeyBVLmFycmF5KHBhcmVudCwgJ19jaGlsZHJlbicpLnB1c2godGhpcykgfVxuXG5cdFx0LyogY3JlYXRlIGV2ZW50cyAqL1xuXHRcdHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcblxuXHR9LCAvKiogQGxlbmRzIEFydGVmYWN0LnByb3RvdHlwZSAqLyB7XG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gLSB0aGUgb3B0aW9ucyBwcm92aWRlZCB0aHJvdWdoIHRoZSBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdGdldCBvcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9ucyB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gdGhlIHVuaXF1ZSBpZGVudGlmaWVyIGJlbG9uZ2luZyB0byB0aGlzIGFydGVmYWN0XG5cdFx0ICovXG5cdFx0Z2V0IGlkKCkgeyByZXR1cm4gdGhpcy5faWQgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSAtIHRoZSB0eXBlIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHQgKi9cblx0XHRnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGUgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBwYXJlbnQgb2YgdGhpcyBhcnRlZmFjdCwgdW5sZXNzIHRoaXMgaXMgdGhlIHJvb3Rcblx0XHQgKi9cblx0XHRnZXQgcGFyZW50KCkgeyByZXR1cm4gdGhpcy5fcGFyZW50IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1tBcnRlZmFjdF19IC0gdGhlIGNoaWxkcmVuIG9mIHRoaXMgYXJ0ZWZhY3Rcblx0XHQgKi9cblx0XHRnZXQgY2hpbGRyZW4oKSB7IHJldHVybiB0aGlzLl9jaGlsZHJlbiB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgKHBhcmVudCwgcGFyZW50J3MgcGFyZW50LCAuLi4pXG5cdFx0ICogb2YgdGhpcyBhcnRlZmFjdCB3aXRoIHRoZSBnaXZlbiB0eXBlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QXJ0ZWZhY3R8dW5kZWZpbmVkfSAtIHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIHRoZSBnaXZlbiB0eXBlLCB1bmxlc3MgdGhlcmUgaXMgbm9uZVxuXHRcdCAqL1xuXHRcdGNsb3Nlc3RBbmNlc3RvckJ5VHlwZSh0eXBlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gdGhpcztcblx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICogUmV0cmlldmUgdGhlIGNsb3Nlc3QgZGVzY2VuZGFudCAoY2hpbGRyZW4sIGNoaWxkcmVuJ3MgY2hpbGRyZW4sIC4uLilcblx0XHQgKiBvZiB0aGlzIGFydGVmYWN0IHdpdGggdGhlIGdpdmVuIHR5cGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtbQXJ0ZWZhY3RdfSAtIHRoZSBjbG9zZXN0IGRlc2NlbmRhbnRzIG9mIHRoZSBnaXZlbiB0eXBlOyBub25lIG9mIHRoZW1cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkZXNjZW5kYW50IGZyb20gYW55IG90aGVyXG5cdFx0ICovXG5cdFx0Y2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpIHtcblx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcblx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEluZGljYXRlIHRoYXQgdGhpcyBhcnRlZmFjdCB3aWxsIG5ldmVyIGJlIHVzZWQgYWdhaW4sIGFsbG93aW5nIGl0XG5cdFx0ICogdG8gZG8gYW55IG5lY2Vzc2FyeSBjbGVhbnVwLlxuXHRcdCAqL1xuXHRcdGRlc3Ryb3koKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKTtcblx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHsgY2hpbGQuZGVzdHJveSgpIH0pO1xuXHRcdH1cblxuXHR9KSk7XG5cblxuXHQvKioge0BmdW5jdGlvbiBBcnRlZmFjdC5uZXdTdWJjbGFzc31cblx0ICogQSBzdGF0aWMgY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgc3ViY2xhc3Mgb2Yge0BsaW5rIEFydGVmYWN0fS5cblx0ICovXG5cdEFydGVmYWN0Lm5ld1N1YmNsYXNzID0gZnVuY3Rpb24gbmV3U3ViQ2xhc3MobmFtZSwgY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9LCBvcHRpb25EZWZhdWx0cyA9IHt9KSB7XG5cdFx0cmV0dXJuIGRtLnZwKG5hbWUsIFUubmV3U3ViY2xhc3MoQXJ0ZWZhY3QsIGZ1bmN0aW9uIChzdXBlckZuLCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0LyogcHJvY2VzcyBvcHRpb25zICovXG5cdFx0XHR2YXIgcHJvY2Vzc2VkT3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0XHRPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHByb2Nlc3NlZE9wdGlvbnNba2V5XSkpIHtcblx0XHRcdFx0XHRwcm9jZXNzZWRPcHRpb25zW2tleV0gPSBvcHRpb25EZWZhdWx0c1trZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG5cblx0XHRcdC8qIGNhbGwgc3VwZXItY29uc3RydWN0b3IgKi9cblx0XHRcdHN1cGVyRm4oVS5leHRlbmQob3B0aW9ucywgcHJvY2Vzc2VkT3B0aW9ucykpO1xuXG5cdFx0XHQvKiBjYWxsIHRoaXMgY29uc3RydWN0b3IgKi9cblx0XHRcdGNvbnN0cnVjdG9yLmNhbGwodGhpcywgcHJvY2Vzc2VkT3B0aW9ucyk7XG5cblx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRnZXQgY2lyY3VpdGJvYXJkKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX2NpcmN1aXRib2FyZCkgeyB0aGlzLl9jaXJjdWl0Ym9hcmQgPSB0aGlzLmNsb3Nlc3RBbmNlc3RvckJ5VHlwZSgnQ2lyY3VpdGJvYXJkJykgfVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY2lyY3VpdGJvYXJkO1xuXHRcdFx0fVxuXHRcdH0pKSk7XG5cdH07XG5cblxuXHRyZXR1cm4gQXJ0ZWZhY3Q7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2FydGVmYWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvblwiLFwiY29tbW9uanNcIjpcImJhY29uXCIsXCJhbWRcIjpcImJhY29uXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L0QzRWRnZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9EM0VkZ2Uuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9EM0VkZ2Uuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvRDNFZGdlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9EM0VkZ2Uuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdiYWNvbiddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24pIHtcblxuXG5cdC8qKiB7QGV4cG9ydH17QGNsYXNzIEJhY29uU2lnbmFsSGFuZGxlcn1cblx0ICogVXNlIHRoaXMgYXMgYSBzdWJjbGFzcyAob3IganVzdCBtaXggaXQgaW4pIHRvIHByb3ZpZGUgc3VwcG9ydCBmb3Jcblx0ICogZXZlbnRzIGFuZCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgdGhyb3VnaCBCYWNvbi5qcy5cblx0ICovXG5cdHZhciBCYWNvblNpZ25hbEhhbmRsZXIgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEJhY29uU2lnbmFsSGFuZGxlcigpIHtcblxuXHRcdHRoaXMuX2V2ZW50cyA9IHt9O1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcblx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuXG5cdH0sIC8qKiBAbGVuZHMgQmFjb25TaWduYWxIYW5kbGVyLnByb3RvdHlwZSAqLyB7XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEZWNsYXJlcyBhIG5ldyBldmVudCBzdHJlYW0gZm9yIHRoaXMgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICBuYW1lICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50LCB1c2VkIHRvIHRyaWdnZXIgb3Igc3Vic2NyaWJlIHRvIGl0XG5cdFx0ICogQHBhcmFtICB7QmFjb24uRXZlbnRTdHJlYW19IFtzb3VyY2VdIC0gYW5vdGhlciBldmVudCBzdHJlYW0gdG8gYXV0b21hdGljYWxseSB0cmlnZ2VyIHRoaXMgZXZlbnRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLkJ1c30gLSB0aGUgY3JlYXRlZCBldmVudCBzdHJlYW1cblx0XHQgKi9cblx0XHRuZXdFdmVudChuYW1lLCB7c291cmNlfSA9IHt9KSB7XG5cdFx0XHQvKiBpcyB0aGUgZXZlbnQgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICcke25hbWV9JyBvbiB0aGlzIG9iamVjdC5gKTtcblxuXHRcdFx0LyogZGVmaW5lIHRoZSBldmVudCBzdHJlYW0gKi9cblx0XHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRpZiAoc291cmNlKSB7IGJ1cy5wbHVnKHNvdXJjZSkgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cy5uYW1lKG5hbWUpO1xuXHRcdH0sXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXRyaWV2ZSBhbiBldmVudCBzdHJlYW0gYnkgbmFtZS4gSWYgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSBpcyBnaXZlbiwgYSBzdHJlYW1cblx0XHQgKiBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoYXQgcHJvcGVydHkgaXMgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIG5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgc3RyZWFtIHRvIHJldHJpZXZlXG5cdFx0ICogQHJldHVybiB7QmFjb24uRXZlbnRTdHJlYW19IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRldmVudChuYW1lKSB7XG5cdFx0XHQvKiBkb2VzIHRoZSBldmVudCBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgbm8gZXZlbnQgJyR7bmFtZX0nIG9uIHRoaXMgb2JqZWN0LmApO1xuXG5cdFx0XHQvKiByZXR1cm4gaXQgKi9cblx0XHRcdHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGxhemlseSBjcmVhdGVzIGFuZCByZXR1cm5zIHRoaXMgcHJvcGVydHksIHdpdGhcblx0XHQgKiBhbiBlbXB0eSB7QmFjb24uQnVzfSBhdCB0aGUgYmFzZS4gVGhpcyBhbGxvd3MgYSBwcm9wZXJ0eSB0byBiZSByZWZlcmVuY2VkXG5cdFx0ICogYmVmb3JlIGl0IGlzIGRlZmluZWQ6XG5cdFx0ICpcblx0XHQgKiAgICAgICAgICDilZTilZDilZDilZDilZDilZDilZcgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJAgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0XHQgKiAgICDii68g4rip4pSA4pSA4pSA4pWiIEJ1cyDilZ/ilIDilIDilIDilKQgLnRvUHJvcGVydHkoKSDilJzilIDilIDilIDilKQgLm5hbWUoIG5hbWUgKSDilIJcblx0XHQgKiAgICAgICAgICDilZrilZDilZDilZDilZDilZDilZ0gICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJggICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gICAgbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gcmV0cmlldmVcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5Qcm9wZXJ0eX0gLSB0aGUgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBuYW1lXG5cdFx0ICovXG5cdFx0cHJvcGVydHkobmFtZSkge1xuXHRcdFx0LyogaWYgaXQgZG9lc24ndCBleGlzdCAqL1xuXHRcdFx0aWYgKCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdKSB7XG5cdFx0XHRcdC8qIGNyZWF0ZSBpdCBub3cgKi9cblx0XHRcdFx0dGhpcy5fcHJvcGVydHlCdXNzZXNbbmFtZV0gPSBuZXcgQmFjb24uQnVzKCk7XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSB0aGlzLl9wcm9wZXJ0eUJ1c3Nlc1tuYW1lXS50b1Byb3BlcnR5KCkubmFtZShuYW1lKTtcblxuXHRcdFx0XHQvKiBhbGxvdyBtb2RpZmllcnMgdG8gYmUgYWRkZWQgdG8gdGhlIHN0cmVhbSAqLyAvLyBUT0RPOiB0ZXN0XG5cdFx0XHRcdHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0uYXBwZW5kTW9kaWZpZXIgPSBmdW5jdGlvbiAobW9kaWZpZXIsIC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXVttb2RpZmllcl0uYXBwbHkodGhpcy5fcHJvcGVydGllc1tuYW1lXSwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblxuXHRcdFx0LyogcmV0dXJuIGl0ICovXG5cdFx0XHRyZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgYWN0dWFsbHkgZGVmaW5lcyBhIHByb3BlcnR5IGJ5IGJhY2tpbmdcblx0XHQgKiBgcHJvcGVydHkobmFtZSlgIGJ1cyBhYm92ZSB3aXRoIHRoZSBmb2xsb3dpbmcgY29uc3RydWN0aW9uOlxuXHRcdCAqXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVreKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVrlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVreKUiOKUiOKUiOKUpCAucHVzaCggaW5pdGlhbCApIOKUilxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUij8gIOKVsOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVr1xuXHRcdCAqICAg4pWU4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWXICAgICAgICDilZTilZDilZDilafilZDilZDilZcgICAgICAgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHRcdCAqICAg4pWRIG9ic2VydmFibGUg4pWf4pSA4pSA4pSA4pev4rip4pSA4pSA4pSA4pWiIEJ1cyDilZ/ilIDilIDilIDilIDilIDilIDilIDilIDilKQgLnNraXBEdXBsaWNhdGVzKCBpc0VxdWFsICkg4pSc4pSA4pSA4pSA4pevIOKLr1xuXHRcdCAqICAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdICAgICAgICDilZrilZDilZDilaTilZDilZDilZ0gICAgICAgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUiiogIOKVreKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKUiOKVrlxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVsOKUiOKUiOKUiOKUpCAucHVzaCggbmV3VmFsdWUgKSDilIpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWw4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pSI4pWvXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAgIG5hbWUgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHN0cmVhbSB0byByZXRyaWV2ZVxuXHRcdCAqIEBwYXJhbSAge0JhY29uLk9ic2VydmFibGV9ICAgICAgICBbc291cmNlXSAgICAgICAgLSBhIHNvdXJjZSBzdHJlYW0gdG8gYXV0b21hdGljYWxseSBzZXQgdGhpcyBwcm9wZXJ0eVxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59ICAgICAgICAgICAgICAgICBbc2V0dGFibGU9dHJ1ZV0gLSB3aGV0aGVyIHRoZSB2YWx1ZSBjYW4gYmUgbWFudWFsbHkgc2V0IChpZiBgc291cmNlYCBpcyBnaXZlbiwgZGVmYXVsdHMgdG8gZmFsc2UpXG5cdFx0ICogQHBhcmFtICB7Kn0gICAgICAgICAgICAgICAgICAgICAgIFtpbml0aWFsXSAgICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgcHJvcGVydHlcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbigqLCopOkJvb2xlYW59ICAgW2lzRXF1YWxdICAgICAgIC0gYSBwcmVkaWNhdGUgZnVuY3Rpb24gYnkgd2hpY2ggdG8gdGVzdCBmb3IgZHVwbGljYXRlIHZhbHVlc1xuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7QmFjb24uUHJvcGVydHl9IC0gdGhlIGV2ZW50IHN0cmVhbSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIG5hbWVcblx0XHQgKi9cblx0XHRuZXdQcm9wZXJ0eShuYW1lLCB7c291cmNlLCBzZXR0YWJsZSwgaW5pdGlhbCwgaXNFcXVhbH0gPSB7fSkge1xuXG5cdFx0XHQvKiBpcyB0aGUgcHJvcGVydHkgbmFtZSBhbHJlYWR5IHRha2VuPyAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSxcblx0XHRcdFx0XHRgVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHRVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSB8fCAhdGhpcy5fcHJvcGVydGllc1tuYW1lXS5fYW15X3BsdWdnZWQsXG5cdFx0XHRcdFx0YFRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIGluaXRpYWxpemUgdGhlIHB1YmxpYyBwcm9wZXJ0eSBhbmQgb3V0ZXIgYnVzLCBhbmQgbWFyayBpdCBhcyBwbHVnZ2VkICovXG5cdFx0XHR0aGlzLnByb3BlcnR5KG5hbWUpLl9hbXlfcGx1Z2dlZCA9IHRydWU7XG5cblx0XHRcdC8qIGludGVybmFsIGJ1cywgYWN0aW5nIGFzIGEgaHViIGZvciBhbGwgbmV3IHZhbHVlcyAqL1xuXHRcdFx0dmFyIGlubmVyQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG5cdFx0XHQvKiBpZiBhIHNvdXJjZSBpcyBnaXZlbiwgcGx1ZyBpdCBpbjsgaWYgbm90LCB0aGUgcHJvcGVydHkgYmVjb21lcyBtYW51YWxseSBzZXR0YWJsZSBieSBkZWZhdWx0ICovXG5cdFx0XHRpZiAoc291cmNlKSB7XG5cdFx0XHRcdGlubmVyQnVzLnBsdWcoc291cmNlKTtcblx0XHRcdH0gZWxzZSBpZiAoc2V0dGFibGUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdHNldHRhYmxlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0LyogY2FjaGluZyB0aGUgY3VycmVudCB2YWx1ZSAqL1xuXHRcdFx0dmFyIHZhbHVlO1xuXG5cdFx0XHQvKiBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBvYmplY3QgaW50ZXJmYWNlLCB3cml0YWJsZSB0aHJvdWdoIHRoZSBpbnRlcm5hbCBidXMgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBzZXR0YWJsZSA/IHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7IGlubmVyQnVzLnB1c2gobmV3VmFsdWUpIH1cblx0XHRcdH0gOiB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBmaW5pc2ggdXAgdGhlIHByb3BlcnR5IGZvciBwdWJsaWMgY29uc3VtcHRpb24gKi9cblx0XHRcdHZhciBpbm5lclByb3BlcnR5ID0gaW5uZXJCdXMuc2tpcER1cGxpY2F0ZXMoaXNFcXVhbCk7XG5cdFx0XHR0aGlzLl9wcm9wZXJ0eUJ1c3Nlc1tuYW1lXS5wbHVnKGlubmVyUHJvcGVydHkpO1xuXG5cdFx0XHQvKiBrZWVwIG91ciB2YWx1ZSBpbiBzeW5jIHdpdGggdGhlIHN0cmVhbSAqL1xuXHRcdFx0dGhpcy5wcm9wZXJ0eShuYW1lKS5vblZhbHVlKCh2KSA9PiB7IHZhbHVlID0gdiB9KTtcblxuXHRcdFx0LyogaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGluaXRpYWwpKSB7IGlubmVyQnVzLnB1c2goaW5pdGlhbCkgfVxuXG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFsbCBzdWJzY3JpYmVycy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCBzdHJlYW0gdG8gdHJpZ2dlclxuXHRcdCAqIEB2YWx1ZSB7Kn0gICAgICB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBhdHRhY2ggdG8gdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlcihuYW1lLCB2YWx1ZSkge1xuXHRcdFx0LyogZG9lcyB0aGUgZXZlbnQgc3RyZWFtIGV4aXN0PyAqL1xuXHRcdFx0VS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cdFx0XHQvKiBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgc3RyZWFtICovXG5cdFx0XHR0aGlzLl9ldmVudHNbbmFtZV0ucHVzaCh2YWx1ZSk7XG5cdFx0fSxcblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNlbGVjdHMgYW4gZXhpc3Rpbmcgc3RyZWFtIG9yIHByb3BlcnR5LCBhbmQgdGhlblxuXHRcdCAqIGVpdGhlciByZXR1cm5zIGl0LCBvciBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHRvIGl0LCBkZXBlbmRpbmdcblx0XHQgKiBvbiB3aGV0aGVyIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQuXG5cdFx0ICpcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgIG5hbWUgICAgICAgICAgICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgb3IgcHJvcGVydHkgdG8gc3Vic2NyaWJlIHRvXG5cdFx0ICogQHBhcmFtIHsqfSAgICAgICAgICAgICAgICBbZXhwZWN0ZWRWYWx1ZV0gICAgICAtIGlmIHByb3ZpZGVkLCBmaWx0ZXJzIHRoZSBzdHJlYW0gYnkgPT09IGVxdWFsaXR5IHdpdGggdGhpcyB2YWx1ZTtcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBtYXkgbm90IGJlIGEgcGxhaW4gb2JqZWN0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICBbb3B0aW9uc10gICAgICAgICAgICAtIGEgcGxhaW4gb2JqZWN0IGZvciBwcm92aWRpbmcgYWRkaXRpb25hbCBvcHRpb25zXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICBbb3B0aW9ucy5vbmNlPWZhbHNlXSAtIHdoZXRoZXIgdGhlIHN0cmVhbSBlbmRzIGFmdGVyIG9uZSBldmVudFxuXHRcdCAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6dm9pZH0gW2NhbGxiYWNrXSAgICAgICAgICAgLSBpZiBwcm92aWRlZCwgc3Vic2NyaWJlcyB0byB0aGlzIHN0cmVhbSB3aXRoIHRoZSB0aGlzIGNhbGxiYWNrXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtCYWNvbi5PYnNlcnZhYmxlfGZ1bmN0aW9uKCk6dm9pZH0gLSBpZiBubyBgY2FsbGJhY2tgIGlzIHByb3ZpZGVkLCB0aGUgc3BlY2lmaWVkIGV2ZW50IHN0cmVhbVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHByb3BlcnR5OyBvdGhlcndpc2UsIGEgZnVuY3Rpb24gdG8gdW5zdWJzY3JpYmUgdG8gc2FpZFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbSBvciBwcm9wZXJ0eVxuXHRcdCAqL1xuXHRcdG9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaXMgYSBzaG9ydGhhbmQgZm9yIHRoZSB7QGxpbmsgb259IG1ldGhvZCB3aXRoIHRoZSBgb25jZWAgb3B0aW9uIGVuYWJsZWQuXG5cdFx0ICogSW4gb3RoZXIgd29yZHMsIGFueSBzdHJlYW0gcmV0dXJuZWQgd2lsbCBzZW5kIG9ubHkgb25lIGV2ZW50LCBhbmQgYW55IGNhbGxiYWNrXG5cdFx0ICogcHJvdmlkZWQgd2lsbCBvbmx5IGZpcmUgb25jZS5cblx0XHQgKi9cblx0XHRvbmUobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhcmdzT2JqID0gdGhpcy5fZ2F0aGVyT25Bcmd1bWVudHMobmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXHRcdFx0VS5vYmplY3QoYXJnc09iaiwgJ29wdGlvbnMnKS5vbmNlID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGRvZXMgdGhlIG1haW4gd29yayBmb3Ige0BsaW5rIG9ufSBvciB7QGxpbmsgb25lfSwgYnV0IGFjY2VwdHNcblx0XHQgKiB0aGUgcGFyYW1ldGVycyBhcyBvbmUgb2JqZWN0LCBzbyBpdCBkb2Vzbid0IGhhdmUgdG8gZGVhbCB3aXRoIHBhcmFtZXRlciBvcmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0JhY29uLk9ic2VydmFibGV8ZnVuY3Rpb24oKTp2b2lkfVxuXHRcdCAqL1xuXHRcdF9vbih7bmFtZSwgZXhwZWN0ZWRWYWx1ZSwgb3B0aW9ucywgY2FsbGJhY2t9KSB7XG5cdFx0XHQvKiBkb2VzIGFuIGV2ZW50IG9yIHByb3BlcnR5IGJ5IHRoaXMgbmFtZSBleGlzdD8gKi9cblx0XHRcdFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLFxuXHRcdFx0XHRcdGBUaGVyZSBpcyBubyBldmVudCBvciBwcm9wZXJ0eSAnJHtuYW1lfScgb24gdGhpcyBvYmplY3QuYCk7XG5cblx0XHRcdC8qIHByb2Nlc3MgbmFtZSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuXG5cdFx0XHQvKiBwcm9jZXNzIGV4cGVjdGVkVmFsdWUgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkgeyByZXN1bHQgPSByZXN1bHQuZmlsdGVyKCh2KSA9PiB2ID09PSBleHBlY3RlZFZhbHVlKSB9XG5cblx0XHRcdC8qIHByb2Nlc3Mgb3B0aW9ucy5vbmNlICovXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uY2UpIHsgcmVzdWx0ID0gcmVzdWx0LnRha2UoMSkgfVxuXG5cdFx0XHQvKiBwcm9jZXNzIGNhbGxiYWNrICovXG5cdFx0XHRpZiAoY2FsbGJhY2spIHsgcmVzdWx0ID0gcmVzdWx0Lm9uVmFsdWUoY2FsbGJhY2spIH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIFByb2Nlc3MgdGhlIGFyZ3VtZW50cyBhY2NlcHRlZCBieSB7QGxpbmsgb259IGFuZCB7QGxpbmsgb25lfS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfZ2F0aGVyT25Bcmd1bWVudHMoLi4uYXJncykge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHsgbmFtZTogYXJncy5zaGlmdCgpIH07XG5cblx0XHRcdC8qIHRlc3QgZm9yIGV4cGVjdGVkIHZhbHVlIGFyZ3VtZW50ICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgIVUuaXNGdW5jdGlvbihhcmdzWzBdKSAmJiAhVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5leHBlY3RlZFZhbHVlID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBvcHRpb25zICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc1BsYWluT2JqZWN0KGFyZ3NbMF0pKSB7XG5cdFx0XHRcdHJlc3VsdC5vcHRpb25zID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0ZXN0IGZvciBjYWxsYmFjayBmdW5jdGlvbiAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmIFUuaXNGdW5jdGlvbihhcmdzWzBdKSkge1xuXHRcdFx0XHRyZXN1bHQuY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gQmFjb25TaWduYWxIYW5kbGVyO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9iYWNvbi1zaWduYWwtaGFuZGxlci5qc1xuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2RlbHRhLWpzJyBdLCBmdW5jdGlvbiAoUCwgRE0pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogYWxyZWFkeSBjYWNoZWQ/ICovXG5cdGlmICh3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCkgeyByZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgfVxuXG5cblx0LyogdGVsbCBkZWx0YS5qcyBhYm91dCBibHVlYmlyZCAqL1xuXHRETS5yZWdpc3RlclByb21pc2VSZXNvbHZlcihQLnJlc29sdmUpO1xuXG5cblx0Lyogc2V0IHRoZSBjYWNoZSAqL1xuXHR3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YV9tb2RlbCA9IG5ldyBETSgpO1xuXG5cblx0LyogcmV0dXJuIHRoZSBkZWx0YSBtb2RlbCB0aGF0IG1hbmFnZXMgYWxsIHBsdWdpbnMgKD0gZGVsdGFzKSAqL1xuXHRyZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWw7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanNcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE0X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJEZWx0YU1vZGVsXCIsXCJjb21tb25qczJcIjpcImRlbHRhLWpzXCIsXCJjb21tb25qc1wiOlwiZGVsdGEtanNcIixcImFtZFwiOlwiZGVsdGEtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IkQzRWRnZS5qcyJ9