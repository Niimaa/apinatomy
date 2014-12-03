(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("bacon"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "bacon"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("bacon")) : factory(root["jQuery"], root["P"], root["Bacon"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, defer) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'core',
	    if: true
	  });
	  plugin.modify('Circuitboard.prototype').add('_registerTile', function _registerTile(tile) {
	    if (!this._p_circuitboardCore_tilesByModelId[tile.model.id]) {
	      this._p_circuitboardCore_tilesByModelId[tile.model.id] = defer();
	    }
	    this._p_circuitboardCore_tilesByModelId[tile.model.id].resolve(tile);
	  }).add('tile', function(tileSelector) {
	    if (!this._p_circuitboardCore_tilesByModelId[tileSelector]) {
	      this._p_circuitboardCore_tilesByModelId[tileSelector] = defer();
	    }
	    return this._p_circuitboardCore_tilesByModelId[tileSelector].promise;
	  }).add('construct', function() {
	    this._p_circuitboardCore_tilesByModelId = {};
	    $('<div/>').appendTo(this.element).css('flex-grow', 1).tilemap({
	      model: this.options.model,
	      parent: this
	    }).tilemap('instance');
	  });
	  plugin.modify('Tilemap.prototype').add('refreshTiles', function refreshTiles() {
	    var $__0 = this;
	    U.assert(U.isDefined(this.model), "An ApiNATOMY tilemap should have a model.");
	    return P.resolve(this.model).call('getChildIds').map((function(id) {
	      return P.resolve($__0.circuitboard.options.filter(id, U.bind(P.resolve($__0.model).value(), 'getModels', id))).then((function(show) {
	        return {
	          id: id,
	          show: show
	        };
	      }));
	    })).filter(U.field('show')).map(U.field('id')).then((function(ids) {
	      return P.resolve($__0.model).value().getModels(ids);
	    })).then((function(childrenToDisplay) {
	      $__0.element.children().empty();
	      $__0.element.empty();
	      $__0._p_tilemapCore_tiles = [];
	      var rowCount = Math.floor(Math.sqrt(childrenToDisplay.length));
	      var colCount = Math.ceil(childrenToDisplay.length / rowCount);
	      while (rowCount--) {
	        var row = $('<div/>').addClass('tilerow').appendTo($__0.element);
	        for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
	          $('<div/>').tile({
	            model: childrenToDisplay.shift(),
	            parent: $__0
	          }).appendTo(row).amyNestedFlexGrow(1).tile('instance').then((function(tile) {
	            $__0._p_tilemapCore_tiles.push(tile);
	          }));
	        }
	      }
	    })).then((function() {
	      $__0.trigger('tiles-refreshed');
	    }));
	  }).add('construct', function() {
	    var $__0 = this;
	    this.newEvent('tiles-refreshed');
	    this._p_tilemapCore_tiles = null;
	    Object.defineProperty(this, 'tiles', {get: (function() {
	        return $__0._p_tilemapCore_tiles;
	      })});
	    this.refreshTiles();
	  });
	  plugin.modify('Tile.prototype').add('populateInnerTilemap', function populateInnerTilemap() {
	    if (!this._p_tileCore_tilemap) {
	      this._p_tileCore_tilemap = this.dom.tilemap({
	        model: this.options.model,
	        parent: this
	      }).tilemap('instance');
	    }
	  }).add('construct', function() {
	    var $__0 = this;
	    this._p_tileCore_tilemap = null;
	    ['click', 'mouseover', 'mouseout'].forEach((function(event) {
	      $__0.newEvent(event, {eventStream: $__0.element.asEventStream(event).doAction('.stopPropagation')});
	    }));
	    ['mouseenter', 'mouseleave'].forEach((function(event) {
	      $__0.newEvent(event, {eventStream: $__0.element.asEventStream(event)});
	    }));
	    this.newEvent('click-not-drop');
	    this.element.clickNotDrop((function(event) {
	      event.stopPropagation();
	      $__0.trigger('click-not-drop', event);
	    }));
	    this.dom = this.element;
	    this.element.attr('id', this.id);
	    this.circuitboard._registerTile(this);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, Bacon) {
	  'use strict';
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    return window.setTimeout(f, 1000 / 60);
	  }));
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
	    object: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = [];
	      }
	      return obj[name];
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
	    animationFrames: function() {
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
	    }
	  };
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.height === b.height && a.width === b.width;
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  function setDisplay(element, newGrow) {
	    var oldGrow = element.data('amyFlexGrowTarget');
	    element.data('amyFlexGrowTarget', newGrow);
	    if (oldGrow > 0 && newGrow === 0) {
	      element.data('amyFlexGrowPrevDisplay', element.css('display'));
	      element.css('flexGrow', 1e-5);
	      setTimeout((function() {
	        element.one('transitionend', (function() {
	          if (element.data('amyFlexGrowTarget') === 0) {
	            element.css('display', 'none');
	          }
	        }));
	      }), 0);
	    } else if (oldGrow === 0 && newGrow > 0) {
	      element.css('display', element.data('amyFlexGrowPrevDisplay'));
	      element.data('amyFlexGrowCssScheduled', true);
	      setTimeout((function() {
	        element.removeData('amyFlexGrowCssScheduled');
	        element.css('flexGrow', element.data('amyFlexGrowTarget'));
	      }), 0);
	    } else if (!element.data('amyFlexGrowCssScheduled')) {
	      element.css('flexGrow', newGrow);
	    }
	  }
	  $.fn.extend({amyNestedFlexGrow: function(grow) {
	      setDisplay(this, grow);
	      var growSum = 0;
	      this.parent().children().each(function() {
	        growSum += parseFloat($(this).data('amyFlexGrowTarget'));
	      });
	      setDisplay(this.parent(), growSum);
	      return this;
	    }});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  $.fn.extend({
	    clickNotDrop: function clickNotDrop(fn) {
	      return this.each(function() {
	        var $__0 = this;
	        $(this).on('mousedown', (function() {
	          var onMouseMove = (function() {
	            $(window).off('mouseup', onMouseUp);
	          });
	          var onMouseUp = (function(mouseUpEvent) {
	            $(window).off('mousemove', onMouseMove);
	            mouseUpEvent.stopImmediatePropagation();
	            fn.call($__0, mouseUpEvent);
	          });
	          $(window).one('mousemove', onMouseMove);
	          $(window).one('mouseup', onMouseUp);
	        }));
	      });
	    },
	    mouseDragDrop: function mouseDragDrop(dragFn, dropFn) {
	      return this.each(function() {
	        var $__0 = this;
	        $(this).on('mousedown', (function(mouseDownEvent) {
	          var onMouseMove = (function(moveEvent) {
	            $($__0).data('mouseDragDrop-dragging', true);
	            dragFn.call($__0, moveEvent);
	          });
	          var onMouseUp = (function(dropEvent) {
	            $(window).off('mousemove', onMouseMove);
	            if ($($__0).data('mouseDragDrop-dragging')) {
	              dropFn.call($__0, dropEvent);
	            }
	          });
	          mouseDownEvent.stopPropagation();
	          $(window).one('mousemove', onMouseMove);
	          $(window).one('mouseup', onMouseUp);
	          $($__0).data('mouseDragDrop-dragging', false);
	        }));
	      });
	    },
	    offClickNotDrop: function offClickNotDrop() {
	      return $(this).off('mousedown');
	    },
	    offMouseDragDrop: function offMouseDragDrop() {
	      return $(this).off('mousedown');
	    }
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


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
	var update = __webpack_require__(10)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-core.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-core.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	exports.push([module.id, ".circuitboard{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;padding:0;}.circuitboard .tilemap{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.circuitboard .tilemap>.tilerow{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin:0;padding:0;height:0;}.circuitboard .tilemap>.tilerow>.tile{width:0;margin:0;padding:0;}.circuitboard .tilemap>.tilerow>.tile:last-child{margin-right:0 !important;}.circuitboard .tilemap>.tilerow:last-child{margin-bottom:0 !important;}", ""]);

/***/ },
/* 10 */
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
/* 11 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMDY2ZGQ4MmE3YzlhN2E4NWQ4NyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLWNvcmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi91dGlsL2RlZmVyLmpzIiwid2VicGFjazovLy8uLi91dGlsL25lc3RlZC1mbGV4LWdyb3cuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvY2xpY2tWc0RyYWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3M/NjRmYSIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nz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O0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJiYWNvblwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvblwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiQmFjb25cIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDIwNjZkZDgyYTdjOWE3YTg1ZDg3XG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvZGVmZXIuanMnLFxuXHQnLi91dGlsL25lc3RlZC1mbGV4LWdyb3cuanMnLFxuXHQnLi91dGlsL2NsaWNrVnNEcmFnLmpzJyxcblx0Jy4vcC1jb3JlLnNjc3MnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSwgZGVmZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ2NvcmUnLFxuXHRcdGlmOiB0cnVlXG5cdH0pO1xuXG5cblx0LyogQ2lyY3VpdGJvYXJkICovXG5cdHBsdWdpbi5tb2RpZnkoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgnX3JlZ2lzdGVyVGlsZScsIGZ1bmN0aW9uIF9yZWdpc3RlclRpbGUodGlsZSkgeyAvLyB1c2VkIGJ5IHRpbGVzXG5cdFx0XHRcdGlmICghdGhpcy5fcF9jaXJjdWl0Ym9hcmRDb3JlX3RpbGVzQnlNb2RlbElkW3RpbGUubW9kZWwuaWRdKSB7XG5cdFx0XHRcdFx0dGhpcy5fcF9jaXJjdWl0Ym9hcmRDb3JlX3RpbGVzQnlNb2RlbElkW3RpbGUubW9kZWwuaWRdID0gZGVmZXIoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0ucmVzb2x2ZSh0aWxlKTtcblx0XHRcdH0pLmFkZCgndGlsZScsIGZ1bmN0aW9uICh0aWxlU2VsZWN0b3IpIHtcblxuXHRcdFx0XHRpZiAoIXRoaXMuX3BfY2lyY3VpdGJvYXJkQ29yZV90aWxlc0J5TW9kZWxJZFt0aWxlU2VsZWN0b3JdKSB7XG5cdFx0XHRcdFx0dGhpcy5fcF9jaXJjdWl0Ym9hcmRDb3JlX3RpbGVzQnlNb2RlbElkW3RpbGVTZWxlY3Rvcl0gPSBkZWZlcigpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuX3BfY2lyY3VpdGJvYXJkQ29yZV90aWxlc0J5TW9kZWxJZFt0aWxlU2VsZWN0b3JdLnByb21pc2U7XG5cblx0XHRcdH0pXG5cdFx0XHQvLy5hZGQoJ29uVGlsZUNyZWF0ZWQnLCBmdW5jdGlvbiBvblRpbGVDcmVhdGVkKHRpbGVTZWxlY3RvciwgZm4pIHtcblx0XHRcdC8vXG5cdFx0XHQvL1x0Ly8gYHRpbGVTZWxlY3RvcmAgaXMgb3B0aW9uYWwsIGkuZS4sIGEgc2luZ2xlIGFyZ3VtZW50IGlzIGBmbmBcblx0XHRcdC8vXHRpZiAoJC5pc1VuZGVmaW5lZChhcmd1bWVudHNbMV0pKSB7XG5cdFx0XHQvL1x0XHRmbiA9IGFyZ3VtZW50c1swXTtcblx0XHRcdC8vXHRcdHRpbGVTZWxlY3RvciA9IG51bGw7XG5cdFx0XHQvL1x0fVxuXHRcdFx0Ly9cblx0XHRcdC8vXHQvLyBidWlsZCB0aGUgZmlsdGVyIGJhc2VkIG9uIHRoZSBzZWxlY3RvclxuXHRcdFx0Ly9cdHZhciBmaWx0ZXIgPSBudWxsO1xuXHRcdFx0Ly9cdGlmICghdGlsZVNlbGVjdG9yKSB7IC8vIG5vIHRpbGUgc2VsZWN0b3IgPSBhbGwgdGlsZXNcblx0XHRcdC8vXHRcdGZpbHRlciA9ICgpPT5QLnJlc29sdmUodHJ1ZSk7XG5cdFx0XHQvL1x0fSBlbHNlIGlmICh0eXBlb2YgdGlsZVNlbGVjdG9yID09PSAnc3RyaW5nJykgeyAvLyBtb2RlbC5pZFxuXHRcdFx0Ly9cdFx0ZmlsdGVyID0gKHRpbGUpID0+ICh0aWxlLm1vZGVsLmlkID09PSB0aWxlU2VsZWN0b3IpO1xuXHRcdFx0Ly9cdH1cblx0XHRcdC8vXG5cdFx0XHQvL1x0Ly8gYXBwbHkgdGhlIGNhbGxiYWNrIGZvciBleGlzdGluZyB0aWxlc1xuXHRcdFx0Ly9cdCQuZWFjaCh0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWQsIChtb2RlbElkLCB0aWxlcykgPT4ge1xuXHRcdFx0Ly9cdFx0JC5lYWNoKHRpbGVzLCAoaW5kZXgsIHRpbGUpID0+IHtcblx0XHRcdC8vXHRcdFx0aWYgKGZpbHRlcih0aWxlKSkgeyBmbih0aWxlKSB9XG5cdFx0XHQvL1x0XHR9KTtcblx0XHRcdC8vXHR9KTtcblx0XHRcdC8vXG5cdFx0XHQvL1x0Ly8gc2V0IHVwIHRoZSBjYWxsYmFja3MgZm9yIGZ1dHVyZSB0aWxlc1xuXHRcdFx0Ly9cdHRoaXMub24oJ3RpbGUtY3JlYXRlZCcsICh0aWxlKSA9PiB7XG5cdFx0XHQvL1x0XHRpZiAoZmlsdGVyKHRpbGUpKSB7IGZuKHRpbGUpIH1cblx0XHRcdC8vXHR9KTtcblx0XHRcdC8vXG5cdFx0XHQvL30pXG5cdFx0XHQuYWRkKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMuX3BfY2lyY3VpdGJvYXJkQ29yZV90aWxlc0J5TW9kZWxJZCA9IHt9O1xuXG5cdFx0XHRcdC8vdGhpcy5uZXdFdmVudCgndGlsZS1jcmVhdGVkJyk7XG5cblx0XHRcdFx0Ly8gY3JlYXRlIHRoZSByb290IHRpbGVtYXBcblx0XHRcdFx0JCgnPGRpdi8+JykuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxuXHRcdFx0XHRcdFx0LmNzcygnZmxleC1ncm93JywgMSlcblx0XHRcdFx0XHRcdC50aWxlbWFwKHtcblx0XHRcdFx0XHRcdFx0bW9kZWw6IHRoaXMub3B0aW9ucy5tb2RlbCxcblx0XHRcdFx0XHRcdFx0cGFyZW50OiB0aGlzXG5cdFx0XHRcdFx0XHR9KS50aWxlbWFwKCdpbnN0YW5jZScpO1xuXHRcdFx0fSk7XG5cblxuXHQvKiBUaWxlbWFwICovXG5cdHBsdWdpbi5tb2RpZnkoJ1RpbGVtYXAucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ3JlZnJlc2hUaWxlcycsIGZ1bmN0aW9uIHJlZnJlc2hUaWxlcygpIHtcblxuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sgKi9cblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodGhpcy5tb2RlbCksXG5cdFx0XHRcdFx0XHRgQW4gQXBpTkFUT01ZIHRpbGVtYXAgc2hvdWxkIGhhdmUgYSBtb2RlbC5gKTtcblxuXHRcdFx0XHQvKiByZW5kZXIgdGhlIG5ldyB0aWxlbWFwICh0aHJvdWdoIGEgcHJvbWlzZSBjaGFpbiwgcmV0dXJuaW5nIHRoZSBmaW5hbCBwcm9taXNlKSAqL1xuXHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHRoaXMubW9kZWwpXG5cdFx0XHRcdFx0LyogZ2V0IHRoZSBpZCdzIG9mIGFsbCBjaGlsZCBtb2RlbHMgKi9cblx0XHRcdFx0XHRcdC5jYWxsKCdnZXRDaGlsZElkcycpXG5cdFx0XHRcdFx0LyogZmlsdGVyIG91dCB0aGUgaWRzIG9mIGNoaWxkcmVuIHRoYXQgb3VnaHQgbm90IGJlIGRpc3BsYXllZCAqL1xuXHRcdFx0XHRcdFx0Lm1hcCgoaWQpID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZSh0aGlzLmNpcmN1aXRib2FyZC5vcHRpb25zLmZpbHRlcihpZCwgVS5iaW5kKFAucmVzb2x2ZSh0aGlzLm1vZGVsKS52YWx1ZSgpLCAnZ2V0TW9kZWxzJywgaWQpKSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKChzaG93KSA9PiB7IHJldHVybiB7IGlkOiBpZCwgc2hvdzogc2hvdyB9IH0pO1xuXHRcdFx0XHRcdFx0fSkuZmlsdGVyKFUuZmllbGQoJ3Nob3cnKSkubWFwKFUuZmllbGQoJ2lkJykpXG5cdFx0XHRcdFx0LyogZ2V0IHByb21pc2VzIHRvIGFsbCBjaGlsZCBlbnRpdGllcyAqL1xuXHRcdFx0XHRcdFx0LnRoZW4oKGlkcykgPT4gUC5yZXNvbHZlKHRoaXMubW9kZWwpLnZhbHVlKCkuZ2V0TW9kZWxzKGlkcykpXG5cdFx0XHRcdFx0LyogY3JlYXRlIGEgdGlsZSBmb3IgZWFjaCBjaGlsZCBlbnRpdHkgKi9cblx0XHRcdFx0XHRcdC50aGVuKChjaGlsZHJlblRvRGlzcGxheSkgPT4ge1xuXHRcdFx0XHRcdFx0XHQvKiByZW1vdmUgYWxsIG9sZCB0aWxlcyAqL1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hpbGRyZW4oKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZW1wdHkoKTtcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogbWFpbnRhaW4gcmVmZXJlbmNlcywgc28gdGhleSB3b24ndCBoYXZlIHRvIGJlIHJlY3JlYXRlZFxuXG5cdFx0XHRcdFx0XHRcdC8qIHJlbmRlciBhbmQgc3RvcmUgcmVmZXJlbmNlcyB0byB0aGUgbmV3IHRpbGVzICovXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3BfdGlsZW1hcENvcmVfdGlsZXMgPSBbXTtcblx0XHRcdFx0XHRcdFx0dmFyIHJvd0NvdW50ID0gTWF0aC5mbG9vcihNYXRoLnNxcnQoY2hpbGRyZW5Ub0Rpc3BsYXkubGVuZ3RoKSk7XG5cdFx0XHRcdFx0XHRcdHZhciBjb2xDb3VudCA9IE1hdGguY2VpbChjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggLyByb3dDb3VudCk7XG5cdFx0XHRcdFx0XHRcdHdoaWxlIChyb3dDb3VudC0tKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJvdyA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd0aWxlcm93JykuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjb2xDb3VudCAmJiBjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggPiAwOyBjb2x1bW4gKz0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnPGRpdi8+JykudGlsZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiBjaGlsZHJlblRvRGlzcGxheS5zaGlmdCgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmFwcGVuZFRvKHJvdykuYW15TmVzdGVkRmxleEdyb3coMSkudGlsZSgnaW5zdGFuY2UnKS50aGVuKCh0aWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX3BfdGlsZW1hcENvcmVfdGlsZXMucHVzaCh0aWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQvKiBzaWduYWwgdGhhdCB0aGUgdGlsZXMgaGF2ZSBiZWVuIChyZSlyZW5kZXJlZCAqL1xuXHRcdFx0XHRcdFx0LnRoZW4oKCk9PiB7IHRoaXMudHJpZ2dlcigndGlsZXMtcmVmcmVzaGVkJykgfSk7XG5cblx0XHRcdH0pLmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMubmV3RXZlbnQoJ3RpbGVzLXJlZnJlc2hlZCcpO1xuXG5cdFx0XHRcdHRoaXMuX3BfdGlsZW1hcENvcmVfdGlsZXMgPSBudWxsO1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3RpbGVzJywgeyBnZXQ6ICgpID0+IHRoaXMuX3BfdGlsZW1hcENvcmVfdGlsZXMgfSk7XG5cdFx0XHRcdHRoaXMucmVmcmVzaFRpbGVzKCk7XG5cblx0XHRcdH0pO1xuXG5cblx0LyogVGlsZSAqL1xuXHRwbHVnaW4ubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdwb3B1bGF0ZUlubmVyVGlsZW1hcCcsIGZ1bmN0aW9uIHBvcHVsYXRlSW5uZXJUaWxlbWFwKCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy5fcF90aWxlQ29yZV90aWxlbWFwKSB7XG5cdFx0XHRcdFx0dGhpcy5fcF90aWxlQ29yZV90aWxlbWFwID0gdGhpcy5kb20udGlsZW1hcCh7XG5cdFx0XHRcdFx0XHRtb2RlbDogdGhpcy5vcHRpb25zLm1vZGVsLFxuXHRcdFx0XHRcdFx0cGFyZW50OiB0aGlzXG5cdFx0XHRcdFx0fSkudGlsZW1hcCgnaW5zdGFuY2UnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KS5hZGQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLl9wX3RpbGVDb3JlX3RpbGVtYXAgPSBudWxsO1xuXG5cdFx0XHRcdC8qIHN1cHBvcnQgY2VydGFpbiBET00tZXZlbnQgc3Vic2NyaXB0aW9ucyBmcm9tIHRoZSB0aWxlIG9iamVjdCBpdHNlbGYgKi9cblx0XHRcdFx0WydjbGljaycsICdtb3VzZW92ZXInLCAnbW91c2VvdXQnXS5mb3JFYWNoKChldmVudCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubmV3RXZlbnQoZXZlbnQsIHsgZXZlbnRTdHJlYW06IHRoaXMuZWxlbWVudC5hc0V2ZW50U3RyZWFtKGV2ZW50KS5kb0FjdGlvbignLnN0b3BQcm9wYWdhdGlvbicpIH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Wydtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnXS5mb3JFYWNoKChldmVudCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubmV3RXZlbnQoZXZlbnQsIHsgZXZlbnRTdHJlYW06IHRoaXMuZWxlbWVudC5hc0V2ZW50U3RyZWFtKGV2ZW50KSB9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRoaXMubmV3RXZlbnQoJ2NsaWNrLW5vdC1kcm9wJyk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGlja05vdERyb3AoKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjbGljay1ub3QtZHJvcCcsIGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogYSBmaWVsZCB0byBob2xkIHRoZSBpbm5lcm1vc3QgSFRNTCBjb250ZW50IGVsZW1lbnQgc3RpbGwgYmVsb25naW5nIHRvIHRoaXMgdGlsZSAqL1xuXHRcdFx0XHR0aGlzLmRvbSA9IHRoaXMuZWxlbWVudDtcblxuXHRcdFx0XHQvKiBhbiBlbGVtZW50IGlkIGZvciBxdWljayBqUXVlcnkgbG9va3VwcyAqL1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignaWQnLCB0aGlzLmlkKTtcblxuXHRcdFx0XHQvKiBpbmZvcm0gY2lyY3VpdGJvYXJkIG9mIG5ldyB0aWxlICovXG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9yZWdpc3RlclRpbGUodGhpcyk7XG5cblx0XHRcdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLWNvcmUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnYmFjb24nXSwgKFAsIEJhY29uKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0KChmKSA9PiB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApKTtcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhTdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYmluZCh0aGlzKV0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRjYWxsKGZuLCAuLi5hcmdzKSB7IHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpIH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0YW5pbWF0aW9uRnJhbWVzKCkge1xuXHRcdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblxuXHRcdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdFx0dmFyIGl0ZXJhdGlvbkZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0c2luaygpO1xuXHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKGl0ZXJhdGlvbkZuKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvKiBzdGFydCBpdCBub3cgKi9cblx0XHRcdFx0aXRlcmF0aW9uRm4oKTtcblxuXHRcdFx0XHQvKiB1bnN1YnNjcmliZSBmdW5jdGlvbiAqL1xuXHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHRcdHNpbmsobmV3IEJhY29uLkVuZCgpKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0bm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKiAgQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuICAgICovXG5cdFx0LyogIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSAgICAqL1xuXHRcdC8qICBjYWNoZSB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZSAgKi9cblx0XHQvKiAgaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biAgICovXG5cdFx0LyogIGNvbXBhcmlzb24gZnVuY3Rpb24uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGNhY2hlZCh7cmV0cmlldmUsIGlzRXF1YWx9KSB7XG5cblx0XHRcdC8qIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzICovXG5cdFx0XHRpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8qIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlICovXG5cdFx0XHR2YXIgY2FjaGU7XG5cblx0XHRcdC8qIGhvdyB0byByZXRyaWV2ZSBhIG5ldyB2YWx1ZSwgYW5kIHByb2Nlc3MgaXQgaWYgaXQgaXMgbmV3ICovXG5cdFx0XHRmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuXHRcdFx0XHR2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0aWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRjYWNoZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdG9uQ2hhbmdlLmZvckVhY2goKGZuKSA9PiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgKi9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuXG5cdFx0XHQvKiAgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsICAgICAgICAgICAgICovXG5cdFx0XHQvKiAgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSkgICovXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGFuIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCAqL1xuXHRcdFx0dmFyIG9uQ2hhbmdlID0gW107XG5cdFx0XHRyZXN1bHRGbi5vbkNoYW5nZSA9IChjYikgPT4ge1xuXHRcdFx0XHRvbkNoYW5nZS5wdXNoKGNiKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYnJlYWtpbmcgb2YgdGhlIGNhY2hlLCBhbGxvd2luZyBtdWx0aXBsZSBjYWxscyBwZXIgc3RhY2sgKi9cblx0XHRcdHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcblx0XHRcdH07XG5cblx0XHRcdC8qIHJldHJpZXZlIHRoZSBmaXJzdCB2YWx1ZSByaWdodCBub3cgKi9cblx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cblx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHR9LFxuXG5cdFx0cHJvbWlzaWZ5KG9iaiwgbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0b2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbiAoUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHZhciByZXNvbHZlLCByZWplY3Q7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcblx0XHRcdHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRyZWplY3QgPSBhcmd1bWVudHNbMV07XG5cdFx0fSk7XG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG5cdFx0XHRyZWplY3Q6IHJlamVjdCxcblx0XHRcdHByb21pc2U6IHByb21pc2Vcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvZGVmZXIuanNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIFRoaXMgZnVuY3Rpb24gcGxheXMgd2l0aCB0aGUgYGZsZXgtZ3Jvd2AgYW5kIGBkaXNwbGF5YCBwcm9wZXJ0aWVzXG5cdC8vIG9mIGEgalF1ZXJ5IGVsZW1lbnQgaW4gc3VjaCBhIHdheSB0aGF0IENTUzMgdHJhbnNpdGlvbiBhbmltYXRpb25zXG5cdC8vIGFyZSBwcm9wZXJseSBjYXJyaWVkIG91dCwgYW5kIHN1Y2ggdGhhdCBlbGVtZW50cyB0aGF0IGdldCBhbiBlZmZlY3RpdmVcblx0Ly8gYGZsZXgtZ3Jvd2Agb2YgMCBhcmUgYWN0dWFsbHkgaGlkZGVuIGZyb20gdmlldy5cblx0Ly9cblx0ZnVuY3Rpb24gc2V0RGlzcGxheShlbGVtZW50LCBuZXdHcm93KSB7XG5cblx0XHR2YXIgb2xkR3JvdyA9IGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dUYXJnZXQnKTtcblx0XHRlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93VGFyZ2V0JywgbmV3R3Jvdyk7XG5cblx0XHRpZiAob2xkR3JvdyA+IDAgJiYgbmV3R3JvdyA9PT0gMCkge1xuXG5cdFx0XHRlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93UHJldkRpc3BsYXknLCBlbGVtZW50LmNzcygnZGlzcGxheScpKTtcblx0XHRcdGVsZW1lbnQuY3NzKCdmbGV4R3JvdycsIDFlLTUpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGVsZW1lbnQub25lKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93VGFyZ2V0JykgPT09IDApIHtcblx0XHRcdFx0XHRcdGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSwgMCk7XG5cblx0XHR9IGVsc2UgaWYgKG9sZEdyb3cgPT09IDAgJiYgbmV3R3JvdyA+IDApIHtcblxuXHRcdFx0ZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCBlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93UHJldkRpc3BsYXknKSk7XG5cdFx0XHRlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93Q3NzU2NoZWR1bGVkJywgdHJ1ZSk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVEYXRhKCdhbXlGbGV4R3Jvd0Nzc1NjaGVkdWxlZCcpO1xuXHRcdFx0XHRlbGVtZW50LmNzcygnZmxleEdyb3cnLCBlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93VGFyZ2V0JykpO1xuXHRcdFx0fSwgMCk7XG5cblx0XHR9IGVsc2UgaWYgKCFlbGVtZW50LmRhdGEoJ2FteUZsZXhHcm93Q3NzU2NoZWR1bGVkJykpIHtcblxuXHRcdFx0XHRlbGVtZW50LmNzcygnZmxleEdyb3cnLCBuZXdHcm93KTtcblxuXHRcdH1cblx0fVxuXG5cdCQuZm4uZXh0ZW5kKHtcblx0XHQvL1xuXHRcdC8vIHNldHMgdGhlIGNzcyBwcm9wZXJ0eSAnZmxleC1ncm93JyBvbiB0aGUgY3VycmVudCBlbGVtZW50IGFuZFxuXHRcdC8vIGNvcnJlc3BvbmRpbmdseSBpbmNyZWFzZXMvZGVjcmVhc2VzIHRoYXQgb2YgaXRzIGRpcmVjdCBwYXJlbnRcblx0XHQvL1xuXHRcdGFteU5lc3RlZEZsZXhHcm93KGdyb3cpIHtcblx0XHRcdHNldERpc3BsYXkodGhpcywgZ3Jvdyk7XG5cdFx0XHR2YXIgZ3Jvd1N1bSA9IDA7XG5cdFx0XHR0aGlzLnBhcmVudCgpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGdyb3dTdW0gKz0gcGFyc2VGbG9hdCgkKHRoaXMpLmRhdGEoJ2FteUZsZXhHcm93VGFyZ2V0JykpO1xuXHRcdFx0fSk7XG5cdFx0XHRzZXREaXNwbGF5KHRoaXMucGFyZW50KCksIGdyb3dTdW0pO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9uZXN0ZWQtZmxleC1ncm93LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuLy8gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvLyBUT0RPOiBCYWNvbml6ZVxuXG5cblx0JC5mbi5leHRlbmQoe1xuXHRcdGNsaWNrTm90RHJvcDogZnVuY3Rpb24gY2xpY2tOb3REcm9wKGZuKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignbW91c2Vkb3duJywgKC8qbW91c2VEb3duRXZlbnQqLykgPT4ge1xuXHRcdFx0XHRcdHZhciBvbk1vdXNlTW92ZSA9ICgpID0+IHtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vZmYoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dmFyIG9uTW91c2VVcCA9IChtb3VzZVVwRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vZmYoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcblx0XHRcdFx0XHRcdG1vdXNlVXBFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdGZuLmNhbGwodGhpcywgbW91c2VVcEV2ZW50KTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdCQod2luZG93KS5vbmUoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcblx0XHRcdFx0XHQkKHdpbmRvdykub25lKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1vdXNlRHJhZ0Ryb3A6IGZ1bmN0aW9uIG1vdXNlRHJhZ0Ryb3AoZHJhZ0ZuLCBkcm9wRm4pIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLm9uKCdtb3VzZWRvd24nLCAobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdFx0XHR2YXIgb25Nb3VzZU1vdmUgPSAobW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmRhdGEoJ21vdXNlRHJhZ0Ryb3AtZHJhZ2dpbmcnLCB0cnVlKTtcblx0XHRcdFx0XHRcdGRyYWdGbi5jYWxsKHRoaXMsIG1vdmVFdmVudCk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR2YXIgb25Nb3VzZVVwID0gKGRyb3BFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0JCh3aW5kb3cpLm9mZignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuXHRcdFx0XHRcdFx0aWYgKCQodGhpcykuZGF0YSgnbW91c2VEcmFnRHJvcC1kcmFnZ2luZycpKSB7XG5cdFx0XHRcdFx0XHRcdGRyb3BGbi5jYWxsKHRoaXMsIGRyb3BFdmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRtb3VzZURvd25FdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHQkKHdpbmRvdykub25lKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdtb3VzZURyYWdEcm9wLWRyYWdnaW5nJywgZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0Ly8gVE9ETzogdGhlc2UgZXZlbnQtaGFuZGxlciByZW1vdmVycyBjYXN0IHdheSB0b28gd2lkZSBhIG5ldDsgbWFrZSB0aGVtIG1vcmUgc3BlY2lmaWNcblx0XHRvZmZDbGlja05vdERyb3A6IGZ1bmN0aW9uIG9mZkNsaWNrTm90RHJvcCgpIHtcblx0XHRcdHJldHVybiAkKHRoaXMpLm9mZignbW91c2Vkb3duJyk7XG5cdFx0fSxcblx0XHRvZmZNb3VzZURyYWdEcm9wOiBmdW5jdGlvbiBvZmZNb3VzZURyYWdEcm9wKCkge1xuXHRcdFx0cmV0dXJuICQodGhpcykub2ZmKCdtb3VzZWRvd24nKTtcblx0XHR9XG5cdH0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSk7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvY2xpY2tWc0RyYWcuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25cIixcImNvbW1vbmpzXCI6XCJiYWNvblwiLFwiYW1kXCI6XCJiYWNvblwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY29yZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY29yZS5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmNpcmN1aXRib2FyZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LXdlYmtpdC1mbGV4O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOnN0cmV0Y2g7LXdlYmtpdC1hbGlnbi1pdGVtczpzdHJldGNoOy1tcy1mbGV4LWFsaWduOnN0cmV0Y2g7YWxpZ24taXRlbXM6c3RyZXRjaDtwYWRkaW5nOjA7fS5jaXJjdWl0Ym9hcmQgLnRpbGVtYXB7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstd2Via2l0LWZsZXgtZGlyZWN0aW9uOmNvbHVtbjstbXMtZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47fS5jaXJjdWl0Ym9hcmQgLnRpbGVtYXA+LnRpbGVyb3d7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1vcmllbnQ6aG9yaXpvbnRhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsOy13ZWJraXQtZmxleC1kaXJlY3Rpb246cm93Oy1tcy1mbGV4LWRpcmVjdGlvbjpyb3c7ZmxleC1kaXJlY3Rpb246cm93Oy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTstd2Via2l0LWp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOy1tcy1mbGV4LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjttYXJnaW46MDtwYWRkaW5nOjA7aGVpZ2h0OjA7fS5jaXJjdWl0Ym9hcmQgLnRpbGVtYXA+LnRpbGVyb3c+LnRpbGV7d2lkdGg6MDttYXJnaW46MDtwYWRkaW5nOjA7fS5jaXJjdWl0Ym9hcmQgLnRpbGVtYXA+LnRpbGVyb3c+LnRpbGU6bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MCAhaW1wb3J0YW50O30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93Omxhc3QtY2hpbGR7bWFyZ2luLWJvdHRvbTowICFpbXBvcnRhbnQ7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMpO1xyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdC8vIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYS8qLCBzb3VyY2VNYXA6IHNvdXJjZU1hcCovfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaikge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaik7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgLyomJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKi8pXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHQvLyB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0Ly8gTm8gYnJvd3NlciBzdXBwb3J0XHJcblx0Ly8gaWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdC8vIHRyeSB7XHJcblx0XHRcdC8vIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdC8vIH0gY2F0Y2goZSkge31cclxuXHQvLyB9XHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxuXHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC1jb3JlLmpzIn0=