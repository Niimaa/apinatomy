(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["P"], root["Kefir"], root["TWEEN"], root["kefir-jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	    name: 'tile-button-to-point-camera',
	    requires: ['tile-buttons', 'three-d']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('cameraTargetTile', {initial: null});
	    var newTarget = this.p('cameraTargetTile').changes();
	    var newTileTarget = newTarget.filter((function(t) {
	      return t !== null;
	    }));
	    this.p('cameraTargetTile').plug(newTileTarget.flatMapLatest((function(tile) {
	      return tile.p('hidden').value(true).takeUntil($__0.p('cameraTargetTile').value(null));
	    })).mapTo(null));
	    newTarget.flatMapLatest((function(tile) {
	      if (!tile) {
	        return Kefir.never();
	      }
	      return Kefir.merge([Kefir.once(), tile.p('size').changes(), tile.p('position').changes()]).mapTo(tile);
	    })).onValue((function(tile) {
	      $__0.camera3D.userData.target = $__0.object3D.localToWorld(tile.object3D.position.clone());
	      $__0.camera3D.userData.semanticTarget = tile;
	    }));
	    newTarget.value(null).onValue((function() {
	      delete $__0.camera3D.userData.semanticTarget;
	    }));
	    newTarget.startWith(null).startWith(null).slidingWindow(2).map((function($__1) {
	      var $__2 = $__1,
	          a = $__2[0],
	          b = $__2[1];
	      return [b, a];
	    })).onValue((function($__1) {
	      var $__2 = $__1,
	          newTarget = $__2[0],
	          oldTarget = $__2[1];
	      if (newTarget) {
	        newTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(4) + ")")});
	      }
	      if (oldTarget) {
	        oldTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(5) + ")")});
	      }
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.addButton({
	      name: 'pointCamera',
	      icon: __webpack_require__(5)
	    }).onValue((function() {
	      if ($__0.circuitboard.cameraTargetTile === $__0) {
	        $__0.circuitboard.cameraTargetTile = null;
	      } else {
	        $__0.circuitboard.cameraTargetTile = $__0;
	      }
	    }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gwXAA0sa6hHdgAADSZJREFUeNrtnXuQXVWVh7/V6TwkBkgM5IGQZJQAQkiIogIqloMOExCFiFozoKgoIGVJqYilgpblAwUdRWqoGR8RQUVeOgxIUTLUjGNAUZNAgmIIJGlMOglJd57k2fn5x15duenus8/p7tv3nnt7f1WnupN7+ty19l5nP9daGxKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCLRhFgjCClpLnAOMAc4ChhdQtkF7AbWAIuBX5nZomRig6v4MyQ9LKlD0ouSulR+ulzWDpf9jFST/a/4MZKuk7RL0n41Lvtdh+skjUk1W6zyx0q6Rc3Hv0saW7bybilZ5Y8CPgFc3oS2fQVwleuYBoF9VL4BpwELm7yROwN4zMyUWoCDGQncOAx6uW+6rqkF6NECnF7g7X/Br70lrdyRwBF+xTjdzB5LI76DDeCunEHUIkkXShpRYh1GuIyLcnS5M9X4wQU3WdKeSIGtlHRmA+nzZkmrIvrskTQpjQEOcGlOv/hL4LcNZNP/7zLHuopL06sPdHV1tUh6LvK2rJd0QQO2avNd9iyebW9vt2FvAJLOzekv75f0sgbUa6KkB3J0Oyd1AfBxwkZKX+wGfmtmmxrNAMxso3dbu7NsxHUf1m//TEmbI2/Ik5LmNLB+p7gOWXRKOnY4twAfBg6JfL7IzJY0qgGY2WLC1nAWY70MhuXb3yppReTtWCvpwibQ892S2iN6PiOpdTgawMWStkQK5tGybZwMUM9RrksWWyRdNBy7gIuAcRmf7QAeMrM9jW4ArsNDwIsZt4wDLh4Ob7xJavHfT5XUFnkrnpM0s4l0Py5nraNN0ql+b4vvjNaE1qGoaGBExdUCvBR4JTBL0vHAPwJTMx6xH1hiZsubxQDM7K+SngCmZbS6U4EFkv4HeBpYKmkFsN3Lo6v7qvY2cusgK7sVGFVxjXZlTgRO8p8nEhw5i7IVWNCEjeAC4M3A4X18NqKirCpZAzxVcS2TtNbXFvZ0X2a2b8DG2c8KPwQY79OXicBM4PiK67gqFNQyM5vVpN3gUn8xBstfvaXovpYDG33s1GlmL1a1BZB0KMEl+y1+zQYOHYIy2gv8rImHQncAX2DwDiHH+fWOHi3nE8Ajkh4BFpvZtmpY7SxJ35G0vQaOkxslTW3igfBU13Go2e51NmuwAp8l6fEaes42vaOEpLtrWJ6PSzprQGMAd9H6MfCKIS6TfUA7sBb4pJktHIJCnwAc4wPUiT4QG1vRBe7z/nOz96VrgTYz6xgCWd5A8H2cCkwZiplYD54F3mdmjxY2AElHAg8Ccwm7VtWal24AVgNtPsJt88rv9vV70sz2V6mgTyB4Gc8G/gGYTPDVG++LLz11ErAN6HRZ2oGV3q8+amZPV0muFuBkDvgOTnHjPMp/TgOOrJa9uZ6LgLPN7IWiBvAV4LOD+OIdPjJdCTznP9cCHV7AHcBmM9tR5berFZgPnAu8CpgOTBjkYzuAVcAy4H7gXjPrqrLcY71VmuAGOsFbiBluvDN8xjWYwJKvmtnncg3AfdVWAi8p8ND9PiVZDjzj10pgi1/bgG1VGY3mF+JlwL/46Hio/O3Wua4/MbP/rIFO47y1Ggcc5tcM4Fi/Zrq+RZb0dwIzzGx93pdeXiDe7UeS3ibpREnTJU2SNK4eu1qS5kl6zPfWa0Wnf+c/10HfVi/rSV72J3pd3FogjvKyIl9wX07k6zVliHGTdIikBZI21THeb5OkH/oCWb3LY6ykz+QYwX1FHhTbpPlvSUeXQNnTJP1Z0t4SBH3ulfSUpNeXoFyO8TrKYnXPv+mr75gc+Y6nzOz5Oiv5AeC/gBNqMIUqupr6KuA+SZfUUxAzayPsGWQxuchS8MicgUQ9K/9q4Fqy/Qj6mgZ1L5M+DvwvwUVrBdBuZtsrBluTfGA1FzgTeF3F9xSZBh8B3CRpopnVM8YxVkejihRyjC/Ws/Il7ehHlo4tkn7t/vmjB/B9YzzM69f+rK5+LMNeXcdy+mJMuIY0AEmX5biP9dxPuLua3sTu3XuXpBcKyrBZ0keSAVRHofMkrSlQ6LslLZR09hDK8k/+HbsLyPM3SW9PBjA4ZWZJ+n3B6dhNtcjD413DzZ4EKo/fDXpHbrgagKTDJX2/4Jt2RR3etCslPV9Avu9JOjwZQP+UGOFu43k8L+lddRxwzc9ZN+nmom6H2LIZQFkDEo4Brsm5ZzNwlZnd04/COcLn7NMI28JjCfsVd5jZugHMu++RtB/4AWETJ4tPE+IEV5WtoEtnAD5lu5DeDpI9uaZo5Us6heA+9RqCf8NUDnZpmwV8aICLL7+QNBGIbQ7NAt4l6abSxzrUuwuQdLSkDTlyfKvIgM8zj3xV0tKcefy6Qco8RtI3c2ReJ+nlZesCypYncCRwPvEkS4uBW8xsV86zTgfuBj5F8MTN0rULuH6QS7C7gFsIjhdZTAIucB1TFxCR52M593zDl3Jjlf824PtAXxtXDwEPE9bMO3wMMOi+2cxWSLqBuFfzlS5XWbOc1a8L8NCxM3O+/4G83UjfKexrxe7Hkmb79HL0UIRfefeVlxXkDUMZ+tXIXYD54C/Gz2K7kZKOAn7qI/xu1gDvBS41syfMbLOZ7R6KTJ0u2x05t72HEuVnLJsBnBf5/HFgSWwgBnyZ4AfYzTPAJWb28xqOvpcAf4h8fl4ygL6ZltFnd/ObrL7fm9RTgEsq/rsduNbMHq6xHitc1tgaxzHJAHrzxljXRogYzhr5jwA+X/Hvfd5d/LzmzZjZTp+pxLqYNyUD6M3cyGdP54zUpwDzKv69DPhuHXVZRfCWzuKUZAC9OSHy2WpCXEEWlYkk9wILzWxVHXVpd5kHouuwNYDpkc/WEUK2snhLxe+bgAfqrMtGl3kgug5bA4it/nXmBJdU7rlvI74iV4txwFZCBFQWRyYD6E0s30BewoPKNfY9udEvtSEm87hkAP2TJS8FSuX6ell222Iyj0gG0JtYVHDensV/+M+dhJD2MtA6QF1LI2St2UrfCZQgnk4W4DpCOPtOoCxHscRk3pIMoDcvRAxgvKRxWQNBM9tAiBYqBR5oMj5H19QF9CA2b5/MwRs8ZWci8RC7VckAevPnyGfTyE4sWUamusxZ/CUZQG9iaeGPp0SLJwWYTjxn4uJkAL2J7aAZMKcRDmB2GecQ3/L9TTKA3qwGYqHnZxKid8vOsS5rFm1+JQPo+fIAsQwWpxIyfpWdOS5rFvcR3yoe1gaQlyjyvWXIUBJp/o8muJ/FuDMZQN9zeRFcqZ6J3HYOcEYt8+n3o/KNcDL4vMhty4E/luXk8LK1ABDWz2/Ouedqhj576UB4pcsW42by9zWGrwGY2V7gXkJG0SzmAleUaUYg6SXAR4l7Na0HfuE6JgOIsIGQSzfGJwhnDpWFi4Grcu65McewkwF4K7CHENK1NOfWr0uaX4K3fz7wtZzblgJ3lzEwtIwtQPeawNdz7pkAfLueZwt6boJvk5+P+Poyzf1LbwCeMfx+QhxdjJcD/ybpyjpU/ke98vMifr8HPFCtLOi1UKxMOYJO8jw7eXR43p5DaiDTGEnfLZgj6DFJJ9W4zJouS9jbPQ9QHnu8wIcyS9jZfgro7oLpa1KWsCopdbmkrf3IE3inpJOr+P2z/ZlF8wRulXR5ncqq+QzA5RpIptCHJJ0/wEyhoyVd4M9o2kyhDXNqtZnd4PIXyRXcQnAzf6tfWyX9DniE4HfwLLC+s7Nzx/jx4yEki5riq3mzCbt5p3HAVb3o0vM24Et1zhXcPIPADPkulrRe5WN9PU8BH2gL0NJoBmpmtxE2hZZRjnX1fb7Qc66Z3d5o5dnSiK2Umf2RsOd+OyHPT73oAG4DXmtmf2jEsmxIA3Aj2GVmHyDsCTxKPBav2nQCC4F/NbMP5mUsKzOtNDhm9iDwoJ8kcgnhJK3JQ/R13aeG/cjMmuKE81aaBDNbIOlWwrmB8wgRw9OBlw3y0ZsIfvxLgV8RNnXULOXWNAbgRrAfuAu4S9JMgofOyRxID3skIWLnpRmP2O7N+wZCQopngScJCSeW04S00qR4hS33qdF4wgmc3WcHH0qI3euOKt5LCOfeyoGzg58zs06anFaGAV6Rf/Ir0QyzgER9DECpyEqPBmsAsZOxR6TyLT2xOtpXxAA2RR4wXdJhqYxL+uqHupmRM6XNNYBY6PL5xAMfEvVlHvDOyOd/KWJFny9wKOK1fv5Oohxv/hFeb5tz6u5zvWZIfTxsOrAyFWtTMqNnBtW+uoA2Qs79RHPxE/pwTbeMJmUawXPm8FRuTcFmYI6ZrS66DtAGfBjYlcqu4dkJXEpGYEqfBuC7XfcAHyeepDlRbjZ6Hd6btYOZ6+wo6R2EUzxfDYxKZdoQ7CHse1xvZrGsK8W8Xf3Aw/cTTrqYCRzFwfl5E/VnL+GArOXA/wG3mtmavD/qV6YNSVMIbtMzCPvqIynRAUjDdRnAK7/Tp+9LBnIOciKRSCQSiUQikUgkEolEIpFIJJqWvwMhajRu1kAlvAAAAABJRU5ErkJggg=="

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZDdlMDA3OWE2ZDY5YjVmMGFjMCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtYmxhY2sucG5nIiwid2VicGFjazovLy8uL3NyYy91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8v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QUFJLEVBQUMsRUFBSSxHQUFDLEVBQUksR0FBQyxFQUFJLEdBQUMsRUFBSSxVQUFRLEVBQUksVUFBUSxDQUFHO0FBQUUsa0JBQU8sUUFBTSxFQUFJLEtBQUc7V0FBRTtBQUN2RSxnQkFBTyxNQUFJLENBQUM7U0FDYixFQUFDLENBQUM7T0FDSDtBQUNBLFlBQU8sRUFBQyxDQUFDLFFBQU8sQ0FBQyxjQUFlLENBQUMsU0FBUSxDQUFDLEtBQU0sQ0FBQyxFQUFDLFlBQWEsQ0FBQyxXQUFVLENBQUMsQ0FBQztLQUM3RSxFQUFDLENBQUM7R0FDSCxDQUFDO0FBR0QsTUFBRyxXQUFXLEVBQUksU0FBUyxXQUFTLENBQUUsQ0FBRTtBQUN2QyxVQUFPLEVBQUMsQ0FBQyxJQUFHLENBQUMsY0FBZSxDQUFDLDJCQUEwQixDQUFDLENBQUM7R0FDMUQsQ0FBQztBQUdELFFBQU8sTUFBSSxDQUFDO0FBR2IsRUFBQywrSUFBQztBQUNGOzs7Ozs7OztBQ3BRQSxrQ0FBaUMsb2lNOzs7Ozs7QUNBakMsa0NBQWlDLDRpSjs7Ozs7O0FDQWpDLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJrZWZpclwiLCBcInR3ZWVuanNcIiwgXCJrZWZpci1qcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXItanF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJLZWZpclwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wia2VmaXItanF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGNkN2UwMDc5YTZkNjliNWYwYWMwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbiAoJCwgVSwgS2VmaXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtYnV0dG9uLXRvLXBvaW50LWNhbWVyYScsXG5cdFx0cmVxdWlyZXM6IFsndGlsZS1idXR0b25zJywgJ3RocmVlLWQnXVxuXHR9KTtcblxuXG5cdHBsdWdpbi5pbnNlcnQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5uZXdQcm9wZXJ0eSgnY2FtZXJhVGFyZ2V0VGlsZScsIHsgaW5pdGlhbDogbnVsbCB9KTtcblxuXHRcdHZhciBuZXdUYXJnZXQgPSB0aGlzLnAoJ2NhbWVyYVRhcmdldFRpbGUnKS5jaGFuZ2VzKCk7XG5cdFx0dmFyIG5ld1RpbGVUYXJnZXQgPSBuZXdUYXJnZXQuZmlsdGVyKHQgPT4gdCAhPT0gbnVsbCk7XG5cblxuXHRcdC8qIHVuLXRhcmdldCB0aWxlIHdoZW4gdGFyZ2V0ZWQgdGlsZSBpcyBoaWRkZW4gKi9cblx0XHR0aGlzLnAoJ2NhbWVyYVRhcmdldFRpbGUnKS5wbHVnKG5ld1RpbGVUYXJnZXQuZmxhdE1hcExhdGVzdCgodGlsZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHRpbGUucCgnaGlkZGVuJykudmFsdWUodHJ1ZSkudGFrZVVudGlsKHRoaXMucCgnY2FtZXJhVGFyZ2V0VGlsZScpLnZhbHVlKG51bGwpKTtcblx0XHR9KS5tYXBUbyhudWxsKSk7XG5cblxuXHRcdC8qIHdoZW4gYSB0aWxlIGlzIHRhcmdldGVkLCBjb25zaXN0ZW50bHkgcG9pbnQgdGhlIGNhbWVyYSB0aGVyZSAqL1xuXHRcdG5ld1RhcmdldC5mbGF0TWFwTGF0ZXN0KCh0aWxlKSA9PiB7XG5cdFx0XHRpZiAoIXRpbGUpIHsgcmV0dXJuIEtlZmlyLm5ldmVyKCkgfVxuXHRcdFx0cmV0dXJuIEtlZmlyLm1lcmdlKFtcblx0XHRcdFx0S2VmaXIub25jZSgpLFxuXHRcdFx0XHR0aWxlLnAoJ3NpemUnKS5jaGFuZ2VzKCksXG5cdFx0XHRcdHRpbGUucCgncG9zaXRpb24nKS5jaGFuZ2VzKClcblx0XHRcdF0pLm1hcFRvKHRpbGUpO1xuXHRcdH0pLm9uVmFsdWUoKHRpbGUpID0+IHtcblx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0ID0gdGhpcy5vYmplY3QzRC5sb2NhbFRvV29ybGQodGlsZS5vYmplY3QzRC5wb3NpdGlvbi5jbG9uZSgpKTtcblx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEuc2VtYW50aWNUYXJnZXQgPSB0aWxlO1xuXHRcdH0pO1xuXHRcdG5ld1RhcmdldC52YWx1ZShudWxsKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnNlbWFudGljVGFyZ2V0O1xuXHRcdH0pO1xuXG5cblx0XHQvKiB3aGVuIGEgbmV3IHRpbGUgaXMgdGFyZ2V0ZWQsIGNoYW5nZSB0aGUgY29sb3Igb2YgaXRzIGNhbWVyYSBidXR0b24gKi9cblx0XHRuZXdUYXJnZXQuc3RhcnRXaXRoKG51bGwpLnN0YXJ0V2l0aChudWxsKS5zbGlkaW5nV2luZG93KDIpLm1hcCgoW2EsIGJdKSA9PiBbYiwgYV0pLm9uVmFsdWUoKFtuZXdUYXJnZXQsIG9sZFRhcmdldF0pID0+IHtcblx0XHRcdGlmIChuZXdUYXJnZXQpIHtcblx0XHRcdFx0bmV3VGFyZ2V0LmVsZW1lbnQuZmluZCgnPiAudGlsZS1idXR0b24taG9sZGVyID4gLnRpbGUtYnV0dG9uLnBvaW50Q2FtZXJhJykuY3NzKHtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtyZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS1ibGFjay5wbmcnKX0pYFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChvbGRUYXJnZXQpIHtcblx0XHRcdFx0b2xkVGFyZ2V0LmVsZW1lbnQuZmluZCgnPiAudGlsZS1idXR0b24taG9sZGVyID4gLnRpbGUtYnV0dG9uLnBvaW50Q2FtZXJhJykuY3NzKHtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtyZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmcnKX0pYFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KS5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuYWRkQnV0dG9uKHsgbmFtZTogJ3BvaW50Q2FtZXJhJywgaWNvbjogcmVxdWlyZSgndXJsIS4vdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nJykgfSkub25WYWx1ZSgoKSA9PiB7XG5cblx0XHRcdGlmICh0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmFUYXJnZXRUaWxlID09PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYVRhcmdldFRpbGUgPSBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhVGFyZ2V0VGlsZSA9IHRoaXM7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGlsZS1idXR0b24tdG8tcG9pbnQtY2FtZXJhLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpdHMgZmlyc3QgYXJndW1lbnRcblx0XHRpZCh2KSB7IHJldHVybiB2IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gZGVmaW5lZCwgZ2l2ZSBpdCBhIGRlZmF1bHQgdmFsdWUgZmlyc3Q7IGlmIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdC8vIGlzIGEgZnVuY3Rpb24sIGl0IGlzIGNhbGxlZCwgYW5kIGl0cyByZXN1bHQgaXMgdXNlZFxuXHRcdGdldERlZihvYmosIG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZSgpIH1cblx0XHRcdFx0b2JqW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7IHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pIH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0XG5cdFx0aXNQbGFpbk9iamVjdCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvblxuXHRcdGlzRnVuY3Rpb24odmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0ZmluZEluZGV4KGFycmF5LCBwcmVkKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHsgcmV0dXJuIGkgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHQvLyB0aGlzIGBtZW1vaXplYCBmdW5jdGlvbiBpcyBTTE9XLCBhcyBpdCB1c2VzIGxpbmVhciBzZWFyY2hcblx0XHRtZW1vaXplKGZuKSB7XG5cdFx0XHR2YXIga2V5cyA9IFtdO1xuXHRcdFx0dmFyIGNhY2hlID0gW107XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogY2hlY2sgdGhlIGNhY2hlICovXG5cdFx0XHRcdHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChrZXkpID0+IGtleS5ldmVyeSgodiwgaSkgPT4gdiA9PT0gYXJnc1tpXSkpO1xuXHRcdFx0XHRpZiAoaW5kZXggPj0gMCkgeyByZXR1cm4gY2FjaGVbaW5kZXhdIH1cblxuXHRcdFx0XHQvKiBubyBjYWNoZSBoaXQ7IGNvbXB1dGUgdmFsdWUsIHN0b3JlIGFuZCByZXR1cm4gKi9cblx0XHRcdFx0dmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRrZXlzLnB1c2goYXJncyk7XG5cdFx0XHRcdGNhY2hlLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cdHZhciBzb3J0T2ZFcXVhbCA9IChhLCBiKSA9PiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuXHR9O1xuXG5cblx0LyogSFRNTCBlbGVtZW50IHNpemUgKi9cblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuU2l6ZS5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2tlZmlyJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24gKCQsIFUsIEtlZmlyLCBUV0VFTikge1xuXG5cdC8qIEtlZmlyIGpRdWVyeSBwbHVnaW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0XHRyZXF1aXJlKCdrZWZpci1qcXVlcnknKS5pbml0KEtlZmlyLCAkKTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0Ly8gVGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBldmVudHMgdGhhdCBjYW4gaGF2ZSBvbmx5IG9uZSBzdWJzY3JpYmVyLFxuXHQvLyB0aGF0IGNhbiBiZSB1bi1zdWJzY3JpYmVkIGJ5IHNldHRpbmcgdGhlIHN1YnNjcmliZXIgdG8gYG51bGxgLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9pemVkLCBzbyBvbmx5IG9uZSBzdWJzY3JpcHRpb24gaXMgdGFrZW4sXG5cdC8vIGFuZCB0aGUgc2FtZSBzdHJlYW0gZm9yIGl0IHJldHVybmVkIGZvciBlYWNoIHJlcXVlc3QuXG5cdEtlZmlyLmZyb21Pbk51bGwgPSBVLm1lbW9pemUoZnVuY3Rpb24gZnJvbU9uTnVsbChvYmosIGV2ZW50TmFtZSkge1xuXHRcdHJldHVybiBLZWZpci5mcm9tQmluZGVyKChlbWl0dGVyKSA9PiB7XG5cdFx0XHRvYmoub24oZXZlbnROYW1lLCBlbWl0dGVyLmVtaXQpO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuXHRcdFx0KChmKSA9PiB7IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfSk7XG5cdEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKCkgPT4ge1xuXHRcdFx0XHRcdGVtaXR0ZXIuZW1pdCgpO1xuXHRcdFx0XHRcdGlmIChzdWJzY3JpYmVkKSB7IGl0ZXJhdGlvbkZuKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4geyBzdWJzY3JpYmVkID0gZmFsc2UgfTtcblxuXHRcdH0pO1xuXHR9O1xuXG5cblx0S2VmaXIudHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBLZWZpci5idXMoKTtcblxuXHRcdC8qIGEgbG9jYWwgZnVuY3Rpb24gdG8gcGx1ZyBpbiBvdGhlciBzdHJlYW1zLCBrZWVwaW5nIHRyYWNrIGluIG9yZGVyIHRvICdlbmQnIHRoZSBidXMgKi9cblx0XHR2YXIgYWRkU3RyZWFtID0gKCgpID0+IHtcblx0XHRcdHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG5cdFx0XHRyZXR1cm4gKHN0cmVhbSkgPT4ge1xuXHRcdFx0XHRjaGFpbmVkU3RyZWFtcyArPSAxO1xuXHRcdFx0XHRidXMucGx1ZyhzdHJlYW0pO1xuXHRcdFx0XHRzdHJlYW0ub25FbmQoKCkgPT4ge1xuXHRcdFx0XHRcdGNoYWluZWRTdHJlYW1zIC09IDE7XG5cdFx0XHRcdFx0aWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7IGJ1cy5lbmQoKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9KSgpO1xuXG5cdFx0LyogbWFpbiBzdHJlYW0gKi9cblx0XHRhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0aWYgKGVhc2luZykgeyB0dy5lYXNpbmcoZWFzaW5nKSB9XG5cdFx0XHRpZiAoZGVsYXkpICB7IHR3LmRlbGF5KGRlbGF5KSB9XG5cdFx0XHR0dy5vblVwZGF0ZShmdW5jdGlvbiAoKSB7IGVtaXR0ZXIuZW1pdCh0aGlzKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuXHRcdH0pKTtcblxuXHRcdC8qIGFkZGluZyB0d2Vlbi1zcGVjaWZpYyBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm5lZCBidXMgKi9cblx0XHRidXMudHdlZW4gPSB0dztcblx0XHRidXMuc3RhcnQgPSAoKSA9PiB7XG5cdFx0XHR0dy5zdGFydCgpO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXHRcdGJ1cy5jaGFpbiA9IChvdGhlcikgPT4ge1xuXHRcdFx0YWRkU3RyZWFtKG90aGVyKTtcblx0XHRcdHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcblx0XHRcdHJldHVybiBidXM7XG5cdFx0fTtcblxuXHRcdC8qIHJldHVybmluZyB0aGUgYnVzICovXG5cdFx0cmV0dXJuIGJ1cztcblxuXHR9O1xuXG5cblx0S2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG5cdFx0cmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZSkgPT4gZS5rZXlDb2RlID09PSBrZXlDb2RlKTtcblx0fTtcblxuXG5cdEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGVtaXR0ZXIpID0+IHtcblx0XHRcdGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG5cdFx0XHRlbWl0dGVyLmVuZCgpO1xuXHRcdH0pO1xuXHRcdC8vcmV0dXJuIEtlZmlyLmNvbnN0YW50KHZhbHVlKTsgLy8gVE9ETzogcmVwbGFjZSBhbGwgJ29uY2UnIGNhbGxzIHdpdGggJ2NvbnN0YW50JyBjYWxsczsgdGhlbiByZW1vdmUgJ29uY2UnXG5cdH07XG5cblxuXHRLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0YXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuXHRcdFx0ZW1pdHRlci5lbmQoKTtcblx0XHR9KTtcblx0fTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGNvbnZlcnRlcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIGNyZWF0ZXMgYSAnd2luZG93IG9mIG9wcG9ydHVuaXR5JyB0byBsaW1pdCBvdGhlciBzdHJlYW1zIGJ5LlxuXHQvLyBUaGlzIHdpbmRvdyBpcyBwcm92aWRlZCBieSB0aGUgYHBhY2luZ2Agb2JzZXJ2YWJsZS4gQW4gb3B0aW9uYWwgYGhhbmRsZXJgXG5cdC8vIHBhcmFtZXRlciBjYW4gYmUgZ2l2ZW4gdG8gZG8gc29tZSBzZXR1cCBhbmQgc29tZSBicmVha2Rvd24uIEl0IGlzIHBhc3NlZCBhIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG5cdC8vIHRoYXQgc2hvdWxkIGJlIGNhbGxlZCAqb25jZSogaW4gdGhlIHBsYWNlIHdoZXJlIG90aGVyIHN0cmVhbXMgY2FuIGRvIHRoZWlyXG5cdC8vIHRoaW5nLiBJdCByZXR1cm5zIGEgZnVuY3Rpb24gdXNlZCB0byB3cmFwIG90aGVyIHN0cmVhbXMuIEl0IGRvZXMgbm90XG5cdC8vIHJldHVybiBhIHN0cmVhbS5cblx0S2VmaXIubGltaXRlciA9IGZ1bmN0aW9uIGxpbWl0ZXIocGFjaW5nLCBoYW5kbGVyID0gVS5jYWxsKSB7XG5cdFx0dmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuXHRcdHZhciBvcGVuID0gICAgICBLZWZpci5idXMoKTtcblx0XHR2YXIgY2xvc2UgPSAgICAgS2VmaXIuYnVzKCk7XG5cblx0XHQvKiB0YWtlcyAndGhpcycgc3RyZWFtIGFzIHBhY2luZyBmb3IgYSB3aW5kb3cgb2Ygb3Bwb3J0dW5pdHkgZm9yIG90aGVyIHN0cmVhbXMgKi9cblx0XHRwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdGhhbmRsZXIoKCkgPT4ge1xuXHRcdFx0XHRvcGVuLmVtaXQoKTtcblx0XHRcdFx0d2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuXHRcdFx0XHRjbG9zZS5lbWl0KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybnMgYSBmdW5jdGlvbiB0byB3cmFwIGEgc3RyZWFtIGluIHRoaXMgd3JhcHBlciAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCB7YnVmZmVyfSA9IHt9KSB7XG5cdFx0XHR3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBUaGlzIHJlc3RyaWN0cyBhIGdpdmVuIHN0cmVhbSB0byBhIHdyYXBwZXIgc3RyZWFtIGNyZWF0ZWQgd2l0aCB0aGUgbWV0aG9kIGFib3ZlLlxuXHQvLyBBbGwgaXRzIG9yaWdpbmFsIGV2ZW50cyBhcmUgbm93IGZpcmVkIGluc2lkZSB0aGUgcHJvdmlkZWQgd2luZG93LiBTZXQgYG9wdGlvbnMuYnVmZmVyYFxuXHQvLyB0byBgdHJ1ZWAgaWYgYWxsIGl0cyBldmVudHMgc2hvdWxkIGJlIGJ1ZmZlcmVkIGFuZCByZWxlYXNlZCBpbnNpZGUgdGhlIG5leHQgd2luZG93LlxuXHQvLyBPdGhlcndpc2UsIG9ubHkgdGhlIGxhc3QgZXZlbnQgaXMgcmV0YWluZWQuXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG5cdH07XG5cblxuXHQvLyBUaGlzIGlzIGEgY2hlYXAgdmVyc2lvbiBvZiB0aGUgbGltaXRlciBkZWZpbmVkIGFib3ZlLiBUT0RPOiB1c2UgdGhlIGxpbWl0ZXIgd2hlcmUgdGhpcyBpcyBub3cgdXNlZFxuXHRLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZW1pdHRlcikgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaCh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciB1bnN1YnNjcmliZVRvUGFjaW5nID0gcGFjaW5nLm9uVmFsdWUoKCkgPT4ge1xuXHRcdFx0XHRpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgb2xkQnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0XHRcdGJ1ZmZlciA9IFtdO1xuXHRcdFx0XHRcdG9sZEJ1ZmZlci5mb3JFYWNoKGVtaXR0ZXIuZW1pdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGRvTm90aGluZyA9ICgpPT57fTtcblx0XHR0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcblx0XHRyZXR1cm4gKCkgPT4geyB0aGlzLm9mZlZhbHVlKGRvTm90aGluZykgfTtcblx0fTtcblxuXHQvLyBUaGlzIGlzIGEgJ3NtYXJ0JyAuc3RvcFByb3BhZ2F0aW9uLCBtYXJraW5nIGV2ZW50cyB3aXRoIGEgbGFiZWxcblx0Ly8gYW5kIHNraXBwaW5nIHRob3NlIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgbGFiZWwuXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGxhYmVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChldmVudCkgPT4ge1xuXHRcdFx0cmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG5cdFx0fSkubWFwKChldmVudCkgPT4ge1xuXHRcdFx0VS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBGaWx0ZXIgZXZlbnRzIHRvIG9ubHkgY2VydGFpbiBrZXlzIC8gYnV0dG9ucy4gQ2FuIGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uIG9yIHNpbmdsZSBudW1iZXIuXG5cdEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbiAoYnV0dG9uSWQpIHtcblx0XHR2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6IChiID0+IGIgPT09IGJ1dHRvbklkKTtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoKGUpID0+IHByZWQoZS53aGljaCkpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbVxuXHRcdFx0XHRcdC50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpXG5cdFx0XHRcdFx0Lm1hcCgobW91c2VNb3ZlRXZlbnQpID0+ICh7IG1vdXNlRG93bkV2ZW50LCBtb3VzZU1vdmVFdmVudCB9KSk7XG5cdFx0fSk7XG5cdH07XG5cblx0JC5mbi5tb3VzZUNsaWNrID0gZnVuY3Rpb24gbW91c2VDbGljayh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuXHRcdFx0aWYgKHRocmVzaG9sZCkge1xuXHRcdFx0XHR2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuXHRcdFx0XHR1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHtcblx0XHRcdFx0XHRpZiAoY3Jvc3NlZCkgeyByZXR1cm4gdHJ1ZSB9XG5cdFx0XHRcdFx0dmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcblx0XHRcdFx0XHR2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuXHRcdFx0XHRcdGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkgeyByZXR1cm4gY3Jvc3NlZCA9IHRydWUgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cblx0JC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcblx0XHRyZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG5cdH07XG5cblxuXHRyZXR1cm4gS2VmaXI7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUgzZ3dYQVJzTDAvZ3QvUUFBRWFKSlJFRlVlTnJ0blhsUWsxZS94NzhKQVJSTVNBSUpCbVJUaU11QUVoVmxVenU5akN2akJyaTBycS9hdm81THRXTUhmZTJ0NzFSN1c2Vmp2VE10MUpsV3ZXcXJWZERDS0pheHQ1VTZRcXNkWkhNQlZFaGswMUFpU3dRRWN1NGZ4bHlsUEU4aVc1NkU4NWs1TThBNUpMOXp6dmQ1bnJQOHp1OEJLQlFLaFVLaFVDZ1VDb1ZDb1ZBb0ZBcUZRcUZRS0JRS2hXS0g4R3pFem9rQTVnRUlCZUFOd0ptRHRoTUFiUUNxQU53RWtBa2dqMHFzZDBRQitCbEFQWUNuQURxTkRjM2wxR20wdGQ1b2V4VHR4dGU5bEFnWkF1QWpBSzBBRERiUTZVekpZS3pEUjhZNlVTem9mRmNBS1RiYzZVd3AyVmczQ2t2bk93SDRUenZzL0JkcHQ3R09sRzQ2bndjZzBvNDcvMFdLTk5hVjBzM1Zuek1JQkpETHBic0FsNVFZQ2VBYVd3R1pUQWFaVEFaSFIwZE9pcmk5dlIxYXJSWmFyZGFTdXViU3kvNVZ6ckpkT1NxVmlwdzVjNFowZEhRUXJ0TFIwVUhPbkRsRFZDcVZ1YnZBR2RyZHJ6SWN3RE9tQnZQMzl5ZFhybHdodHNLdnYvNUsvUHo4MkFUd0RJQW5GeHFlenhFQnJBZkFlRjlmdUhBaG9xT2piVWJOMDZaTnc4S0ZDOW1LT0JyclRBVkFDT0VEK0FkVHZsd3V4N1JwMCtEZzRHQXpBbkJ3Y01DMGFkTWdsOHZaaXYyREM3TUJxd3VBeCtQTkJSREFsQjhXRm9ZWk0yYlkzRE50eG93Wm1EeDVNbHVSa2NhNkQvcEh3SHZHNStMZmNIWjJSblIwTk56ZDNXMU9BQjRlSG9pT2pvYXpzelBqemM5WTkwRXRBQ1dBTUticHFGS3B4T3paczIxMlpEdDc5bXdvbFVxMktYZ1lnS0RCTElBTkFGeVlNaWRPbklqUTBGQ2JGWUJLcFlKS3BXSXI0bXBzZzhFbkFFS0lBTUFpcHRHL1FxSEF2SG56Ykg1K08yL2VQQXdmUHB4dE5yREkyQmFEanBVQUdwam15aEVSRWFTdHJZM1lPbTF0YlNRaUlvSnRUYUFCd0lyQitBaFlBVURZN1gzUjFSV3paczJDazVQdGI1dzVPVGxoMXF4WmNIRmhmTklKalJlRGZVTUk0Um5uL0RBT2ZqUk1WMFZBUUFBcEtTa2g5c0xkdTNkSlFFQUEyMTFBWTJ3VEVFTDRBN2srSU9pUGpnYmc4RkxpODNpOFlUd2VMeEJBQ0lBeEFQNERnRmUzdHlRK0g2R2hvV3lqWjV0ajlPalJtREJoQXRScU5Rd0dRM2RGdkFBY0JmQy9QQjd2TG9BaUFQY0lJYzE0N2xYVStTTHhlRHpDcGF0YVFBaHhNUmdNNHZUMGREa0FId0JUOFh4bDd5Q0FMQUNWZUkzdFVyRllUREl5TW9pOWtaNmVUc1JpOGV0dUhWY2EyL0FnZ0hYR3R2VkpUMCtYR3d3R01TSEVwYmNEU041cmRyZ0xqOGVUR0tjdkhzWjUvSmlYMHVqZWlpbzRPQmhGUlVWMitSZ01DUWxCY1hGeFgzeFVDWUM3TDZWU0FIVUE5SVFRSFkvSGU5clhWN29Jd0hRQS93YndHOXZvdlRmSjBkR1JmUExKSjhSZTJiZHZIM0YwZE93dlI1TUdZOS84RzhCMFFvaXd6NFFMNEw4Qk5LT2Z2V1hjM2QxSlZWV1YzUXFncXFxS3VMdTdENFRYVWJPeHowSjYyL2t4QUs1amdOeWxFaElTaUwwVEZ4YzNrTzVuMTQxOTJLTlpRQ1NBcndHTTZ0ZHBpRUFBaFVJQkx5OHZ2UGRlLyt5TjFOZlhRNlBSb0xxNkduVjFkWGp5NUFuMGVqMDZPanBNTnJpNnVrSXNGc1BEd3dOZVhsN3c5ZldGVkNydGMxdTJiZHVHeXNwS1ZGZFhvNmFteG1SRFB4Rm03TU5WZU81dmFka2dNRDA5WGI1Z3dZSkxlSDRraTZDUGZBZmxjam44L1B6ZzYrc0xiMjl2K1ByNlFxRlFtSHo5eG84ZkR6Ni9iOWFtN3R5NWc5emNYQlFVRk9EQmd3ZW9yYTJGVnF1RlRxZERVMU1UQ0hsMU5zWGo4U0FVQ2lHUlNDQ1R5YUJRS0JBUUVJQUpFeVlnTWpJU1k4YU02Uk83REFZRENnc0xUYjZETlRVMTBHZzBxS3FxZ2thamdWcXR4dVBIai90cytHYnN1enlkVGpkYklwRm9MWjBGZkFMZ1h6MzlWbGRYVnlpVlNnUUVCR0RreUpFSUNBaUFsNWNYcEZJcEpCSUpwRklweEdJeFhGMzc5cHhFUjBjSDB0TFNjT0hDQmR5K2ZSc1ZGUldvcjYvdjFXZEtwVkw0Ky9zak9EZ1lzYkd4V0x4NGNaODdwK2oxZWp4NThnVDE5ZlhRNlhTb3I2OUhkWFUxeXN2TDhlREJBNVNYbDZPMHRCUjZ2YjQzWC9OZkFIWmJJZ0JQQU9VQWhwcGRSK2J6TVhyMGFDaVZTZ1FGQlNFb0tBZ0JBUUZ3YzNPRG01c2JoRUtoS2ZVM2h3OGZ4dmZmZjQrU2toSThldlNvWDc1aitQRGhVQ3FWZVB2dHQvSE9PKy8wZTUyYW1wcE1xYUdoQVEwTkRTZ3ZMMGRaV1JuS3lzcFFXbHFLa3BJU3BzV2xyclRndWVPTjJjYjVKOXZBZ3NmamtkV3JWNU9zckN4U1hGeE15c3ZMU1cxdExXbHNiQ1R0N2UwRFBxaTZlUEVpQ1E4UDc4a2lTNCtUV0N3bTRlSGhKRE16YzhEcjI5N2VUaG9iRzBsdGJTMHBMeThueGNYRkpDc3JpNnhhdFlvWVZ3blowcnVXS0NXRDZRUDRmRDc1N0xQUFNITnpzOVZIMDNxOW5xeFpzNFpJcFZLckhmS1FTcVZrN2RxMVJLL1hXNzA5bXB1YnlhZWZmbXBPQkJtV0NJQnhreVkyTnBab05CcXJWelluSjRlTUhUdVdDQVFDcTUvMEVRZ0VaTnk0Y1NRM045ZnE3YUpXcTBsc2JDeWJ2V3BMQk1Eb241K1ltR2oxU2g0NWNvVElaRExPSGZtU3lXVGs2TkdqVm0rZnhNUkVOanZiTEZrSFlQVFBIenAwS0t4SlVsSVM5dTdkaTZhbUpzczJPbmpQeDdnaWtRaFRwa3pCRzIrOEFaVktoY0RBUUNnVUNnd2JOc3cwMkhyMDZCSEt5c3FRbDVlSDdPeHMvUEhISDZidjZUcGw3QTZ0Vm91dFc3ZWlycTRPTzNic3NGb2JtZWtqaXh3c0dCVzBaODhlcXluN3dJRUR4TVhGeGFLcmtjL25FNUZJUkdKaVlraHFhaXBwYlcxOTdlOXJhV2toWjg2Y0lURXhNVVFrRWhFK24yL1JkN3U2dXBJREJ3NVlyWjMyN05sanprYmJFOERYWDM5TlJDS1J4ZnNKY1hGeDVPYk5tMzMyL1hsNWVTUStQcDU0ZUhoWVpJT2JteHM1ZlBnd0ZVQmY3YU43ZVhtWmJYUW5KeWNTR1JsSkxsMjYxRysyL1BUVFR5UXlNcEk0T1RtWnRjZmIyOXNxZmcxMkpZREN3a0l5WmNvVWk2WmpXN1pzSVMwdExmMXVVMHRMQzltMGFST1JTQ1JtN1pvNmRTb3BMQ3lrQXVnSk9wMk9yRnUzenFJckxUazVlY0N2dEMrLy9KS01HREhDckgzcjE2OG5PcDJPQ3VCMXo5a2ZQMzdjYk9PT0dER0NuRDE3MW1vRHJ0VFVWT0xqNDJQV3poTW5UcERPems1T0NvQ1RCeEkwR2czMjc5L1BXa1lzRnVQUW9VT0lpNHV6K0hPMVdpMXUzNzROdFZxTnVybzY2UFY2Q0lWQ0xGdTJqTzN3QmlOeGNYSGc4L2xZdDI0ZGREb2RZN2tEQnc0Z09qb2Evdjcrbkd0cnpnbWdyYTBOWjgrZXhhMWJ0MWpMN2QrLzMrTE92M256SnRMVDAvSG5uMy9pL3YzN3FLNnVSbU5qb3ltL3FLZ0kzMzc3Ylkvc1hiUm9FZXJxNmxnM2g0cUtpcENhbW9xdFc3ZmF4RmtIcXo0Q05CcU4yWlcrN2R1M1d6VGdxNm1wSWJ0MjdTTEJ3Y0dzODNoUFQ4OWVEd3pmZi85OVZwczlQVDNKdzRjUE9mY0k0SE5KZWUzdDdUaC8vanhya0NXVlNvV05HemRpeUJEMndKczVPVG1JajQvSDU1OS9qdUxpWXNZdFV3Y0hCK3pjdWJOWGRnOFpNZ1FiTjI3RXhJa1RHY3M4ZXZRSTU4NmRRM3Q3TzcwRE1QSDA2Vk1TR0JqSXF1QlRwMDRSZzhIQStqbFpXVm1NZzdOWnMyYVJwS1Fra3BtWlNYNy8vWGR5NjlhdFB0dk5PM1hxRkt2dFNxV3kzM2NPYlhZV1lEQVl5SlVyVjFpTm56dDNydG5keUp5Y25HNVg3RmF1WEVueTgvT0pUcWNqcmEydFprWFUwOGZYM0xseldldHc5ZXJWZnZsdW0zOEVFRUp3OXV4WjFqTExseStIajQ4UFkzNVZWUlhlZXVzdDFOWFZtZjdtN2UyTjA2ZFA0NXR2dnNHRUNSTWdGb3ZoN094czJpanFTM3g4ZkxCczJUTFdNai84OElORm0wc0RCYWNFa0pIQjdLOHdaY29VMW1BUnJhMnQrUERERDFGUlVXSDZXMUJRRUk0ZE80YWxTNWNPMk9nN05EUVVZV0Zoek40MkdSbFVBTjJoVnF2eDhPRkR4dnpwMDZjak1EQ1FVVHczYjk3RXNXUEhUSDlUS0JUWXUzY3ZZbUppQnJRZWdZR0JtRDU5T3VzYWgwYWpvUUxveXRXclYxbjM5VU5EUXhsSC9wMmRuZGkzYjkvL0wyNElCRmkrZkRtV0xsMXFsZjE0bFVyRitvajU3YmZmcUFDNmtwZkgvSGFWTVdQR3NLNmkxZFRVSURNejAvUjdjSEF3dG16WllyVzYrUHY3WS9UbzBhd0xVMVFBWGJoejV3NWpucCtmSDd5OHZCanp6NTA3Wi9yWjBkRVJVVkZSVmwxMlZTZ1U4UFB6NjFGZEI2MEFYaDY4ZFdYNDhPSHc4UEJnelAvbGwxOU1QN3U3dTFzOXVKU0hod2ZyM2dKYlhRZXRBTmhXL3lRU0NldmhrcGZqQ1FpRlF0WVZ1WUZBSkJKQklwRXc1dmZoMFMvN0VjRExtek5kWVFtd0JBQ29yS3cwL2V6azVBUlBUK3NING1hejJWS24xa0VsQUxialRRSUIrNmJseSt2clhObHRZN081czdPVEN1QnZockNjQ2paM2hQcmRkOTgxVGNGV3JWckZpZnF3MmR4WEo2RDdSS2hjTVVRa0V1SEpreWZkNWoxOXloN3k1dU9QUDhhY09YTXdkT2hRUkVSRWNLSStiRGE3dWJsUkFYUkZKcE14Q3VERm1YNm1nYUJjTHNlQ0JRczQwNmhOVFUyc0hrSXltWXcrQXJwYlBHR2l0cmIybFEwZXJsTlhWNGZhMnRvZTFYWFFDbURjdUhHTWVXcTFHdFhWMVRZamdPcnFhcWpWek9jd3g0NGRTd1hRRmJhZHZydDM3M0pxOGNRY0ZSVVZLQ2twWWN3M0UwSitjQXFBYlFlTkVJTDgvSHkwdHJaeXZ2TmJXMXVSbjUvUHV1WExWdGRCS3dBL1B6OVdaNC9zN0d5VWxaVnhYZ0JsWldYSXpzNW16UGYxOVlXdnJ5OFZRRmQ0UEI3bXo1L1BtSC9qeGcwVUZCUndYZ0Q1K2ZtNGNlTUdZLzc4K2ZQN3hSdkpMZ1N3Wk1rUzFqS25UNTltZFJxeE5nOGZQc1RwMDZkWnl5eFpzb1FLZ0VrQVlXRmhDQXBpZm9mU3hZc1hjZTNhTlU2NVZMMDhUcmwyN2RvcmZnbGRVU3FWbUR4NU1oVUFFd0tCQUpzM2IyWXRrNVNVaFB2MzczTk9BUGZ1M1VOU1VoSnJtYzJiTjV2ZDF4alVBbkIwZE1UaXhZdFozN2labDVlSGxKUVVUczBJV2xwYWtKeWN6T3JWNU9ucGlVV0xGbkh1emVkOHJsMUpjcm5jYkl5ZGd3Y1A0dVRKazV5eCtjU0pFemgwNkJCcm1SMDdkcGg3bFN3VkFQQjhPemMrUGg0aElleVJ6aE1URTVHV2xtWjFlOVBTMHJCcjF5N1dNaUVoSVlpUGorZmt3VkRPQ2VERm1rQmlZaUpybWZyNmVtemJ0czNzWVpMK0pEVTFGZHUyYlRNYmozam56cDJjbXZ0elhnQjhQaCt4c2JGWXY1NzlEZXVWbFpYWXZuMDd2dnJxcXdHM01UazUyUlQ2blkwTkd6Wmczcng1blBJQk1EdWpBVWRpQkJVVkZaR3BVNmVhamNBaGtVaklwazJiQmlSa2EwdExDOW04ZWJORk1ZTEN3OE5KVVZFUmpSSFVHekl5TW9pM3Q3ZEY3eHNLRHcvdjF5aGhseTVkSWhFUkVSWkZDUnN4WWdTTkV0WlhwS1NrRUtGUWFIR2N3SVNFQkZKUVVOQm4zNStmbjA4U0VoSXNqaE1vRkFwSlNrb0tqUk5vN1VpaE0yZk9KT2ZPbmV0UnBORFcxbGFTbHBaR1pzNmNhZGVSUW0zbXJkVWZmUEFCQUZnVUs5aGdNS0N4c1JHWEwxL0c1Y3VYSVJLSkVCNGVqamZmZkJPaG9hRVlOV29VUEQwOVRXOHMwZXYxcUttcHdiMTc5MUJRVUlEczdHems1dWFhWE5VdFhYb1dDb1g0NktPUHJCb3IySzRHZ2QxeC9QaHhJcGZMT1JjdFhDNlhreE1uVGxpOWZXdzZScEFsckZ5NUVoY3ZYa1J3Y0RBbjF0VUZBZ0ZDUWtKdzRjSUZyRml4d3VhdWRyNHQzcUltVDU2TUd6ZHVZTVdLRmYzeWFqZExrVXFsV0xseUphNWZ2ODRhRklJS29COFlNbVFJamg0OWlwTW5UeUl5TXBMMUxGNWZJNUZJRUJVVmhlKysrdzVIamh3eEc3R015d2hnNDh5Wk13ZHo1c3pCMGFOSGNlellNWlNXbHJLNlpQZUdGMjhOVzdObURkYXVYUXQ3UUFBN1llM2F0Vmk5ZWpYUzB0S1FtWm1Kb3FJaVZGUlU0SysvL3VyVjU3cTd1OFBmM3g4aElTR1lPM2N1NHVQak9lWFFRUVhRWlE4aElTRUJDUWtKS0MwdHhiVnIxMUJZV0dnS0QvdjQ4V1BvZERvME56ZDMrLy9EaGcyRFJDS0JYQzZIbDVjWFJvMGFoZkhqeHlNcUtncEtwUkwyaUFCMmlsS3BOSFdhVHFmRGd3Y1BUTzhPYm14c3hOT25UMDJuaWgwZEhlSGk0Z0tSU0dSNmQvRElrU01IZEZ4QkJkRFBnN1pKa3laaDBxUkpvTmpKTElCaUJRSFkwK0RIWG5uZFB1cE9BSXpoSzdnVTJZTFNvejdxc0VRQWpQT21pb29LTkRRMDBGYm1LQy9lTHM3Q1g1WUlnREdJM2ZuejUxa1BQbENzUzJabUpuNzg4VWUySW4vclc0ZHVDbzBBOEdaMy8vM3MyVFA4L1BQUGFHOXZ4N2h4NDB6YnFSVHJvdFZxOGNVWFgyRDM3dDNtdHNxL0FmQktUTjd1Umd6K0FNcHBzOW9sQVFBcXpEMENOQUMrcDIxbGQzeG43RnVZdXdNQWdCK0FmQUJpMm01MndSTUFvUURVbHE0RGFBQnNBTkJLMjg3bWFRR3d2cnVyMyt5YUFvQjNBR2pCTWZjcm1peE9XdU9GM0tzVnZBVUFjZ0MwMFFhMW1kUm03TFA1NWpyWHdRSUJsQURJQXRCZ1hFbHlBT0JxNGY5U0JvNTJBQThCWEFmd1B3QjJBL2pUa3R2ODY2QUFNTUU0blpBQWNPenQ3WVhTYTRpeDgzWEc2WHMrZ0ZyYUxCUUtoVUtoVUNnVUNvVkNvVkFvRkFxRlFqSHlmNWJ0bG9PcmY5aC9BQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91cmwtbG9hZGVyIS4vc3JjL3V0aWwvaWNvbnMvY2FtZXJhLWJsYWNrLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQVlBQUFERFBtSExBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVIM2d3WEFBMHNhNmhIZGdBQURTWkpSRUZVZU5ydG5YdVFYVldWaDcvVjZUd2tCa2dNNUlHUVpKUUFRa2lJb2dJcWxvTU9FeENGaUZvem9LZ29JR1ZKcVlpbGdwYmxBd1VkUldxb0dSOFJRVVZlT2d4SVVUTFVqR05BVVpOQWdtSUlKR2xNT2dsSmQ1N2syZm41eDE1ZHVlbnVzOC9wN3R2M25udDdmMVdudXBONyt0eTE5bDVuUDlkYUd4S0pSQ0tSU0NRU2lVUWlrVWdrRW9sRUlwRklKQktKUkNMUmhGZ2pDQ2xwTG5BT01BYzRDaGhkUXRrRjdBYldBSXVCWDVuWm9tUmlnNnY0TXlROUxLbEQwb3VTdWxSK3VseldEcGY5akZTVC9hLzRNWkt1azdSTDBuNDFMdnRkaCtza2pVazFXNnp5eDBxNlJjM0h2MHNhVzdieWJpbFo1WThDUGdGYzNvUzJmUVZ3bGV1WUJvRjlWTDRCcHdFTG03eVJPd040ek15VVdvQ0RHUW5jT0F4NnVXKzZycWtGNk5FQ25GN2c3WC9CcjcwbHJkeVJ3QkYreFRqZHpCNUxJNzZERGVDdW5FSFVJa2tYU2hwUlloMUd1SXlMY25TNU05WDR3UVUzV2RLZVNJR3RsSFJtQStuelprbXJJdnJza1RRcGpRRU9jR2xPdi9oTDRMY05aTlAvN3pMSHVvcEwwNnNQZEhWMXRVaDZMdksyckpkMFFRTzJhdk5kOWl5ZWJXOXZ0MkZ2QUpMT3pla3Y3NWYwc2diVWE2S2tCM0owT3lkMUFmQnh3a1pLWCt3R2ZtdG1teHJOQU14c28zZGJ1N05zeEhVZjFtLy9URW1iSTIvSWs1TG1OTEIrcDdnT1dYUktPblk0dHdBZkJnNkpmTDdJekpZMHFnR1kyV0xDMW5BV1k3ME1odVhiM3lwcFJlVHRXQ3Zwd2liUTg5MlMyaU42UGlPcGRUZ2F3TVdTdGtRSzV0R3liWndNVU05UnJrc1dXeVJkTkJ5N2dJdUFjUm1mN1FBZU1yTTlqVzRBcnNORHdJc1p0NHdETGg0T2I3eEphdkhmVDVYVUZua3JucE0wczRsMFB5NW5yYU5OMHFsK2I0dnZqTmFFMXFHb2FHQkV4ZFVDdkJSNEpUQkwwdkhBUHdKVE14NnhIMWhpWnN1YnhRRE03SytTbmdDbVpiUzZVNEVGa3Y0SGVCcFlLbWtGc04zTG82djdxdlkyY3VzZ0s3c1ZHRlZ4alhabFRnUk84cDhuRWh3NWk3SVZXTkNFamVBQzRNM0E0WDE4TnFLaXJDcFpBenhWY1MyVHROYlhGdlowWDJhMmI4REcyYzhLUHdRWTc5T1hpY0JNNFBpSzY3Z3FGTlF5TTV2VnBOM2dVbjh4QnN0ZnZhWG92cFlERzMzczFHbG1MMWExQlpCMEtNRWwreTErelFZT0hZSXkyZ3Y4ckltSFFuY0FYMkR3RGlISCtmV09IaTNuRThBamtoNEJGcHZadG1wWTdTeEozNUcwdlFhT2t4c2xUVzNpZ2ZCVTEzR28yZTUxTm11d0FwOGw2ZkVhZXM0MnZhT0VwTHRyV0o2UFN6cHJRR01BZDlINk1mQ0tJUzZUZlVBN3NCYjRwSmt0SElKQ253QWM0d1BVaVQ0UUcxdlJCZTd6L25Pejk2VnJnVFl6NnhnQ1dkNUE4SDJjQ2t3WmlwbFlENTRGM21kbWp4WTJBRWxIQWc4Q2N3bTdWdFdhbDI0QVZnTnRQc0p0ODhydjl2Vjcwc3oyVjZtZ1R5QjRHYzhHL2dHWVRQRFZHKytMTHoxMUVyQU42SFJaMm9HVjNxOCthbVpQVjBtdUZ1QmtEdmdPVG5IalBNcC9UZ09PckphOXVaNkxnTFBON0lXaUJ2QVY0TE9EK09JZFBqSmRDVHpuUDljQ0hWN0FIY0JtTTl0UjViZXJGWmdQbkF1OENwZ09UQmprWXp1QVZjQXk0SDdnWGpQcnFyTGNZNzFWbXVBR09zRmJpQmx1dkROOHhqV1l3Skt2bXRubmNnM0FmZFZXQWk4cDhORDlQaVZaRGp6ajEwcGdpMS9iZ0cxVkdZM21GK0psd0wvNDZIaW8vTzNXdWE0L01iUC9ySUZPNDd5MUdnY2M1dGNNNEZpL1pycStSWmIwZHdJenpHeDkzcGRlWGlEZTdVZVMzaWJwUkVuVEpVMlNOSzRldTFxUzVrbDZ6UGZXYTBXbmYrYy8xMEhmVmkvclNWNzJKM3BkM0ZvZ2p2S3lJbDl3WDA3azZ6VmxpSEdUZElpa0JaSTIxVEhlYjVPa0gvb0NXYjNMWTZ5a3orUVl3WDFGSGhUYnBQbHZTVWVYUU5uVEpQMVowdDRTQkgzdWxmU1VwTmVYb0Z5TzhUcktZblhQdittcjc1Z2MrWTZuek96NU9pdjVBZUMvZ0JOcU1JVXF1cHI2S3VBK1NaZlVVeEF6YXlQc0dXUXh1Y2hTOE1pY2dVUTlLLzlxNEZxeS9RajZtZ1oxTDVNK0R2d3Z3VVZyQmRCdVp0c3JCbHVUZkdBMUZ6Z1RlRjNGOXhTWkJoOEIzQ1Jwb3BuVk04WXhWa2VqaWhSeWpDL1dzL0lsN2VoSGxvNHRrbjd0L3ZtakIvQjlZenpNNjlmK3JLNStMTU5lWGNkeSttSk11SVkwQUVtWDViaVA5ZHhQdUx1YTNzVHUzWHVYcEJjS3lyQlowa2VTQVZSSG9mTWtyU2xRNkxzbExaUjA5aERLOGsvK0hic0x5UE0zU1c5UEJqQTRaV1pKK24zQjZkaE50Y2pENDEzRHpaNEVLby9mRFhwSGJyZ2FnS1RESlgyLzRKdDJSUjNldENzbFBWOUF2dTlKT2p3WlFQK1VHT0Z1NDNrOEwrbGRkUnh3emM5Wk4rbm1vbTZIMkxJWlFGa0RFbzRCcnNtNVp6TndsWm5kMDQvQ09jTG43Tk1JMjhKakNmc1ZkNWpadWdITXUrK1J0Qi80QVdFVEo0dFBFK0lFVjVXdG9FdG5BRDVsdTVEZURwSTl1YVpvNVVzNmhlQSs5UnFDZjhOVURuWnBtd1Y4YUlDTEw3K1FOQkdJYlE3TkF0NGw2YWJTeHpyVXV3dVFkTFNrRFRseWZLdklnTTh6ajN4VjB0S2NlZnk2UWNvOFJ0STNjMlJlSitubFplc0N5cFluY0NSd1B2RWtTNHVCVzh4c1Y4NnpUZ2Z1Qmo1RjhNVE4wclVMdUg2UVM3QzdnRnNJamhkWlRBSXVjQjFURnhDUjUyTTU5M3pEbDNKamxmODI0UHRBWHh0WER3RVBFOWJNTzN3TU1PaSsyY3hXU0xxQnVGZnpsUzVYV2JPYzFhOEw4TkN4TTNPKy80RzgzVWpmS2V4cnhlN0hrbWI3OUhMMFVJUmZlZmVWbHhYa0RVTVordFhJWFlENTRDL0d6Mks3a1pLT0FuN3FJL3h1MWdEdkJTNDFzeWZNYkxPWjdSNktUSjB1MngwNXQ3MkhFdVZuTEpzQm5CZjUvSEZnU1d3Z0JueVo0QWZZelRQQUpXYjI4eHFPdnBjQWY0aDhmbDR5Z0w2Wmx0Rm5kL09ickw3Zm05UlRnRXNxL3JzZHVOYk1IcTZ4SGl0YzF0Z2F4ekhKQUhyenhsalhSb2dZemhyNWp3QStYL0h2ZmQ1ZC9Mem16WmpaVHArcHhMcVlOeVVENk0zY3lHZFA1NHpVcHdEekt2NjlEUGh1SFhWWlJmQ1d6dUtVWkFDOU9TSHkyV3BDWEVFV2xZa2s5d0lMeld4VkhYVnBkNWtIb3V1d05ZRHBrYy9XRVVLMnNuaEx4ZStiZ0FmcXJNdEdsM2tndWc1YkE0aXQvblhtQkpkVTdybHZJNzRpVjR0eHdGWkNCRlFXUnlZRDZFMHMzMEJld29QS05mWTl1ZEV2dFNFbTg3aGtBUDJUSlM4RlN1WDZlbGwyMjJJeWowZ0cwSnRZVkhEZW5zVi8rTStkaEpEMk10QTZRRjFMSTJTdDJVcmZDWlFnbms0VzREcENPUHRPb0N4SHNjUmszcElNb0RjdlJBeGd2S1J4V1FOQk05dEFpQllxQlI1b01qNUgxOVFGOUNBMmI1L013UnM4WldjaThSQzdWY2tBZXZQbnlHZlR5RTRzV1VhbXVzeFovQ1VaUUc5aWFlR1BwMFNMSndXWVRqeG40dUprQUwySjdhQVpNS2NSRG1CMkdlY1EzL0w5VFRLQTNxd0dZcUhuWnhLaWQ4dk9zUzVyRm0xK0pRUG8rZklBc1F3V3B4SXlmcFdkT1M1ckZ2Y1IzeW9lMWdhUWx5anl2V1hJVUJKcC9vOG11Si9GdURNWlFOOXplUkZjcVo2SjNIWU9jRVl0OCtuM28vS05jREw0dk1odHk0RS9sdVhrOExLMUFCRFd6Mi9PdWVkcWhqNTc2VUI0cGNzVzQyYnk5eldHcndHWTJWN2dYa0pHMFN6bUFsZVVhVVlnNlNYQVI0bDdOYTBIZnVFNkpnT0lzSUdRU3pmR0p3aG5EcFdGaTRHcmN1NjVNY2V3a3dGNEs3Q0hFTksxTk9mV3IwdWFYNEszZno3d3RaemJsZ0ozbHpFd3RJd3RRUGVhd05kejdwa0FmTHVlWnd0NmJvSnZrNStQK1BveXpmMUxid0NlTWZ4K1FoeGRqSmNEL3licHlqcFUva2U5OHZNaWZyOEhQRkN0TE9pMVVLeE1PWUpPOGp3N2VYUjQzcDVEYWlEVEdFbmZMWmdqNkRGSko5VzR6Sm91UzlqYlBROVFIbnU4d0ljeVM5alpmZ3JvN29McGExS1dzQ29wZGJta3JmM0lFM2lucEpPcitQMnovWmxGOHdSdWxYUjVuY3FxK1F6QTVScElwdENISkowL3dFeWhveVZkNE05bzJreWhEWE5xdFpuZDRQSVh5UlhjUW5BemY2dGZXeVg5RG5pRTRIZndMTEMrczdOengvang0eUVraTVyaXEzbXpDYnQ1cDNIQVZiM28wdk0yNEV0MXpoWGNQSVBBRFBrdWxyUmU1V045UFU4QkgyZ0wwTkpvQm1wbXR4RTJoWlpSam5YMWZiN1FjNjZaM2Q1bzVkblNpSzJVbWYyUnNPZCtPeUhQVDczb0FHNERYbXRtZjJqRXNteElBM0FqMkdWbUh5RHNDVHhLUEJhdjJuUUNDNEYvTmJNUDVtVXNLek90TkRobTlpRHdvSjhrY2duaEpLM0pRL1IxM2FlRy9jak1tdUtFODFhYUJETmJJT2xXd3JtQjh3Z1J3OU9CbHczeTBac0lmdnhMZ1Y4Uk5uWFVMT1hXTkFiZ1JyQWZ1QXU0UzlKTWdvZk95UnhJRDNza0lXTG5wUm1QMk83Tit3WkNRb3BuZ1NjSkNTZVcwNFMwMHFSNGhTMzNxZEY0d2dtYzNXY0hIMHFJM2V1T0t0NUxDT2ZleW9Hemc1OHpzMDZhbkZhR0FWNlJmL0lyMFF5emdFUjlERUNweUVxUEJtc0FzWk94UjZUeUxUMnhPdHBYeEFBMlJSNHdYZEpocVl4TCt1cUh1cG1STTZYTk5ZQlk2UEw1eEFNZkV2VmxIdkRPeU9kL0tXSkZueTl3S09LMWZ2NU9vaHh2L2hGZWI1dHo2dTV6dldaSWZUeHNPckF5Rld0VE1xTm5CdFcrdW9BMlFzNzlSSFB4RS9wd1RiZU1KbVVhd1hQbThGUnVUY0ZtWUk2WnJTNjZEdEFHZkJqWWxjcXU0ZGtKWEVwR1lFcWZCdUM3WGZjQUh5ZWVwRGxSYmpaNkhkNmJ0WU9aNit3bzZSMkVVenhmRFl4S1pkb1E3Q0hzZTF4dlpyR3NLOFc4WGYzQXcvY1RUcnFZQ1J6RndmbDVFL1ZuTCtHQXJPWEEvd0czbXRtYXZEL3FWNllOU1ZNSWJ0TXpDUHZxSXluUkFVakRkUm5BSzcvVHArOUxCbklPY2lLUlNDUVNpVVFpa1Vna0VvbEVJcEZJSkpxV3Z3TWhhalJ1MWtBbHZBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91cmwtbG9hZGVyIS4vc3JjL3V0aWwvaWNvbnMvY2FtZXJhLXdoaXRlLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwia2VmaXItanF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRpbGUtYnV0dG9uLXRvLXBvaW50LWNhbWVyYS5qcyJ9