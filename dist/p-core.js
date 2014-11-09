(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird")) : factory(root["jQuery"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, uniqueID) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'core',
	    if: true
	  });
	  plugin.modify('Circuitboard.prototype').add('_registerTile', function _registerTile(tile) {
	    if (!this._p_circuitboardCore_tilesByModelId[tile.model.id]) {
	      this._p_circuitboardCore_tilesByModelId[tile.model.id] = [];
	    }
	    this._p_circuitboardCore_tilesByModelId[tile.model.id].push(tile);
	    this.trigger('tilecreated', tile);
	  }).add('onTileCreated', function onTileCreated(tileSelector, fn) {
	    if ($.isUndefined(arguments[1])) {
	      fn = arguments[0];
	      tileSelector = null;
	    }
	    var filter = null;
	    if (!tileSelector) {
	      filter = (function() {
	        return P.resolve(true);
	      });
	    } else if (typeof tileSelector === 'string') {
	      filter = (function(tile) {
	        return (tile.model.id === tileSelector);
	      });
	    }
	    $.each(this._p_circuitboardCore_tilesByModelId, (function(modelId, tiles) {
	      $.each(tiles, (function(index, tile) {
	        if (filter(tile)) {
	          fn(tile);
	        }
	      }));
	    }));
	    this.on('tilecreated', (function(tile) {
	      if (filter(tile)) {
	        fn(tile);
	      }
	    }));
	  }).add('construct', function() {
	    var $__0 = this;
	    this._p_circuitboardCore_tilesByModelId = {};
	    $('<div/>').appendTo(this.element).css('flex-grow', 1).tilemap({
	      model: this.options.model,
	      parent: this
	    }).tilemap('instance').then((function(tilemap) {
	      $__0.one('destroy', (function() {
	        tilemap.destroy();
	      }));
	    }));
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
	            $__0.one('destroy', (function() {
	              tile.destroy();
	            }));
	          }));
	        }
	      }
	    })).then((function() {
	      $__0.trigger('tiles-refreshed');
	    }));
	  }).add('construct', function() {
	    var $__0 = this;
	    this._p_tilemapCore_tiles = null;
	    Object.defineProperty(this, 'tiles', {get: (function() {
	        return $__0._p_tilemapCore_tiles;
	      })});
	    this.refreshTiles();
	  });
	  plugin.modify('Tile.prototype').add('populateInnerTilemap', function populateInnerTilemap() {
	    var $__0 = this;
	    if (!this._p_tileCore_tilemap) {
	      this._p_tileCore_tilemap = this.dom.tilemap({
	        model: this.options.model,
	        parent: this
	      }).tilemap('instance').then((function(tilemap) {
	        $__0.one('destroy', (function() {
	          tilemap.destroy();
	        }));
	      }));
	    }
	  }).add('construct', function() {
	    var $__0 = this;
	    this._p_tileCore_tilemap = null;
	    $.each(['click', 'mouseover', 'mouseout'], (function(index, signal) {
	      $__0.element.on(signal, (function(event) {
	        event.stopPropagation();
	        $__0.trigger(signal, event);
	      }));
	    }));
	    $.each(['mouseenter', 'mouseleave'], (function(index, signal) {
	      $__0.element.on(signal, (function(event) {
	        $__0.trigger(signal, event);
	      }));
	    }));
	    this.element.clickNotDrop((function(event) {
	      event.stopPropagation();
	      $__0.trigger('click-not-drop', event);
	    }));
	    this.dom = this.element;
	    this.id = uniqueID('tile');
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	    newSubclass: function(superClass, constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, [superClass.prototype.constructor].concat(args));
	      };
	      cls.prototype = Object.create(superClass.prototype, prototype);
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
	            obj1[key] = obj[key];
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
	    eachAnimationFrame: function(fn, context) {
	      var stop = false;
	      function iterationFn() {
	        fn.apply(context);
	        if (stop) {
	          return;
	        }
	        requestAnimationFrame(iterationFn);
	      }
	      iterationFn();
	      var unsubscribeFn = (function() {
	        if (unsubscribeFn.stillSubscribed) {
	          unsubscribeFn.stillSubscribed = false;
	          delete unsubscribeFn.unsubscribeOn;
	          stop = true;
	        }
	      });
	      unsubscribeFn.stillSubscribed = true;
	      unsubscribeFn.unsubscribeOn = (function(subscriber) {
	        subscriber(unsubscribeFn);
	        return unsubscribeFn;
	      });
	      return unsubscribeFn;
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
	    optionalCurry: function(fn) {
	      return function() {
	        if (fn.length <= arguments.length) {
	          return fn.apply(this, arguments);
	        } else {
	          return U.bindA(fn, this, arguments);
	        }
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
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
	        element.one('transitionend webkitTransitionEnd', (function() {
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	exports.push([module.id, ".circuitboard{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;padding:0;}.circuitboard .tilemap{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.circuitboard .tilemap>.tilerow{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin:0;padding:0;height:0;}.circuitboard .tilemap>.tilerow>.tile{width:0;margin:0;padding:0;}.circuitboard .tilemap>.tilerow>.tile:last-child{margin-right:0 !important;}.circuitboard .tilemap>.tilerow:last-child{margin-bottom:0 !important;}", ""]);

/***/ },
/* 9 */
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
/* 10 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4OTM2NGViY2U5ZWU1MWNmZjJkZSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLWNvcmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi91dGlsL3VuaXF1ZS1pZC5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9uZXN0ZWQtZmxleC1ncm93LmpzIiwid2VicGFjazovLy8uLi91dGlsL2NsaWNrVnNEcmFnLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY29yZS5zY3NzPzY0ZmEiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUNDLHVCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNBLHdCQUNELENBQUcsMENBQVUsRUFBRyxHQUFHLEdBQUcsU0FBTztBQUM1QixjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLE9BQUs7QUFDWCxNQUFDLENBQUcsS0FBRztBQUFBLEdBQ1IsQ0FBQyxDQUFDO0FBSUYsUUFBSyxPQUFRLENBQUMsd0JBQXVCLENBQUMsSUFDaEMsQ0FBQyxlQUFjLENBQUcsU0FBUyxjQUFZLENBQUUsSUFBRyxDQUFHO0FBQ2xELFFBQUksQ0FBQyxJQUFHLG1DQUFtQyxDQUFFLElBQUcsTUFBTSxHQUFHLENBQUMsQ0FBRztBQUM1RCxVQUFHLG1DQUFtQyxDQUFFLElBQUcsTUFBTSxHQUFHLENBQUMsRUFBSSxHQUFDLENBQUM7S0FDNUQ7QUFDQSxRQUFHLG1DQUFtQyxDQUFFLElBQUcsTUFBTSxHQUFHLENBQUMsS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQ2pFLFFBQUcsUUFBUyxDQUFDLGFBQVksQ0FBRyxLQUFHLENBQUMsQ0FBQztHQUNsQyxDQUFDLElBQUssQ0FBQyxlQUFjLENBQUcsU0FBUyxjQUFZLENBQUUsWUFBVyxDQUFHLEdBQUM7QUFHN0QsUUFBSSxhQUFhLENBQUMsU0FBUSxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQ2hDLFFBQUMsRUFBSSxVQUFRLENBQUUsRUFBQyxDQUFDO0FBQ2pCLGtCQUFXLEVBQUksS0FBRyxDQUFDO0tBQ3BCO0FBR0ksY0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNqQixRQUFJLENBQUMsWUFBVyxDQUFHO0FBQ2xCLFlBQUssSUFBSSxTQUFDO2NBQUcsVUFBUyxDQUFDLElBQUcsQ0FBQztPQUFBLEVBQUM7S0FDN0IsS0FBTyxLQUFJLE1BQU8sYUFBVyxJQUFNLFNBQU8sQ0FBRztBQUM1QyxZQUFLLElBQUksU0FBQyxJQUFHO2NBQU0sRUFBQyxJQUFHLE1BQU0sR0FBRyxJQUFNLGFBQVcsQ0FBQztPQUFBLEVBQUM7S0FDcEQ7QUFHQSxVQUFNLENBQUMsSUFBRyxtQ0FBbUMsR0FBRyxTQUFDLE9BQU0sQ0FBRyxNQUFJO0FBQzdELFlBQU0sQ0FBQyxLQUFJLEdBQUcsU0FBQyxLQUFJLENBQUcsS0FBRyxDQUFNO0FBQzlCLFlBQUksTUFBTSxDQUFDLElBQUcsQ0FBQyxDQUFHO0FBQUUsWUFBRSxDQUFDLElBQUcsQ0FBQztTQUFFO0FBQUEsT0FDOUIsRUFBQyxDQUFDO0tBQ0gsRUFBQyxDQUFDO0FBR0YsUUFBRyxHQUFJLENBQUMsYUFBWSxHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQ2hDLFVBQUksTUFBTSxDQUFDLElBQUcsQ0FBQyxDQUFHO0FBQUUsVUFBRSxDQUFDLElBQUcsQ0FBQztPQUFFO0FBQUEsS0FDOUIsRUFBQyxDQUFDO0dBRUgsQ0FBQyxJQUFLLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBQzdCLFFBQUcsbUNBQW1DLEVBQUksR0FBQyxDQUFDO0FBRzVDLEtBQUMsQ0FBQyxRQUFPLENBQUMsU0FBVSxDQUFDLElBQUcsUUFBUSxDQUFDLElBQzNCLENBQUMsV0FBVSxDQUFHLEdBQUMsUUFDWCxDQUFDO0FBQ1IsV0FBSSxDQUFHLEtBQUcsUUFBUSxNQUFNO0FBQ3hCLFlBQUssQ0FBRyxLQUFHO0FBQUEsS0FDWixDQUFDLFFBQVMsQ0FBQyxVQUFTLENBQUMsS0FDaEIsRUFBQyxTQUFDLE9BQU07QUFDWixjQUFRLENBQUMsU0FBUSxHQUFHLFNBQUMsQ0FBSTtBQUFFLGVBQU0sUUFBUyxFQUFDO09BQUUsRUFBQyxDQUFDO0tBQ2hELEVBQUMsQ0FBQztHQUNMLENBQUMsQ0FBQztBQUlKLFFBQUssT0FBUSxDQUFDLG1CQUFrQixDQUFDLElBQzNCLENBQUMsY0FBYSxDQUFHLFNBQVMsYUFBVyxDQUFFOztBQUcxQyxZQUFRLENBQUMsV0FBVyxDQUFDLElBQUcsTUFBTSxDQUFDLENBQzdCLDRDQUEwQyxDQUFDLENBQUM7QUFHOUMsVUFBTyxVQUFTLENBQUMsSUFBRyxNQUFNLENBQUMsS0FFcEIsQ0FBQyxhQUFZLENBQUMsSUFFZixFQUFDLFNBQUMsRUFBQztBQUNOLFlBQU8sVUFBUyxDQUFDLGlCQUFnQixRQUFRLE9BQVEsQ0FBQyxFQUFDLENBQUcsT0FBTSxDQUFDLFNBQVMsQ0FBQyxVQUFTLENBQUMsTUFBTyxFQUFDLENBQUcsWUFBVSxDQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FDdEcsRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUFFLGNBQU87QUFBRSxZQUFDLENBQUcsR0FBQztBQUFHLGNBQUcsQ0FBRyxLQUFHO0FBQUEsU0FBRTtPQUFFLEVBQUMsQ0FBQztLQUNyRCxFQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsTUFBSyxDQUFDLENBQUMsSUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFHLENBQUMsQ0FBQyxLQUV2QyxFQUFDLFNBQUMsR0FBRTtZQUFNLFVBQVMsQ0FBQyxVQUFTLENBQUMsTUFBTyxFQUFDLFVBQVcsQ0FBQyxHQUFFLENBQUM7S0FBQSxFQUFDLEtBRXRELEVBQUMsU0FBQyxpQkFBZ0I7QUFFdEIsa0JBQVcsU0FBVSxFQUFDLE1BQU8sRUFBQyxDQUFDO0FBQy9CLGtCQUFXLE1BQU8sRUFBQyxDQUFDO0FBSXBCLCtCQUF3QixFQUFJLEdBQUMsQ0FBQztBQUMxQixrQkFBTyxFQUFJLEtBQUcsTUFBTyxDQUFDLElBQUcsS0FBTSxDQUFDLGlCQUFnQixPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzFELGtCQUFPLEVBQUksS0FBRyxLQUFNLENBQUMsaUJBQWdCLE9BQU8sRUFBSSxTQUFPLENBQUMsQ0FBQztBQUM3RCxhQUFPLFFBQU8sRUFBRSxDQUFHO0FBQ2QsZUFBRSxFQUFJLEVBQUMsQ0FBQyxRQUFPLENBQUMsU0FBVSxDQUFDLFNBQVEsQ0FBQyxTQUFVLENBQUMsWUFBVyxDQUFDLENBQUM7QUFDaEUsYUFBUyxVQUFLLEVBQUksR0FBRyxPQUFLLEVBQUksU0FBTyxHQUFLLGtCQUFnQixPQUFPLEVBQUksR0FBRyxPQUFLLEdBQUssR0FBRztBQUNwRixXQUFDLENBQUMsUUFBTyxDQUFDLEtBQU0sQ0FBQztBQUNoQixpQkFBSSxDQUFHLGtCQUFnQixNQUFPLEVBQUM7QUFDL0Isa0JBQUssTUFBTTtXQUNaLENBQUMsU0FBVSxDQUFDLEdBQUUsQ0FBQyxrQkFBbUIsQ0FBQyxFQUFDLEtBQU0sQ0FBQyxVQUFTLENBQUMsS0FBTSxFQUFDLFNBQUMsSUFBRztBQUMvRCxxQ0FBd0IsS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQ3BDLG9CQUFRLENBQUMsU0FBUSxHQUFHLFNBQUMsQ0FBSztBQUFFLGtCQUFHLFFBQVMsRUFBQzthQUFFLEVBQUMsQ0FBQztXQUM5QyxFQUFDLENBQUM7U0FDSDtBQUFBLE9BQ0Q7QUFBQSxLQUNELEVBQUMsS0FFSSxFQUFDLFNBQUMsQ0FBSTtBQUFFLGtCQUFZLENBQUMsaUJBQWdCLENBQUM7S0FBRSxFQUFDLENBQUM7R0FFbEQsQ0FBQyxJQUFLLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBRTdCLFFBQUcscUJBQXFCLEVBQUksS0FBRyxDQUFDO0FBQ2hDLFVBQUssZUFBZ0IsQ0FBQyxJQUFHLENBQUcsUUFBTSxDQUFHLEVBQUUsR0FBRSxHQUFHLFNBQUM7Y0FBSywwQkFBd0I7T0FBQSxFQUFFLENBQUMsQ0FBQztBQUM5RSxRQUFHLGFBQWMsRUFBQyxDQUFDO0dBRXBCLENBQUMsQ0FBQztBQUlKLFFBQUssT0FBUSxDQUFDLGdCQUFlLENBQUMsSUFDeEIsQ0FBQyxzQkFBcUIsQ0FBRyxTQUFTLHFCQUFtQixDQUFFOztBQUUxRCxRQUFJLENBQUMsSUFBRyxvQkFBb0IsQ0FBRztBQUM5QixVQUFHLG9CQUFvQixFQUFJLEtBQUcsSUFBSSxRQUFTLENBQUM7QUFDM0MsYUFBSSxDQUFHLEtBQUcsUUFBUSxNQUFNO0FBQ3hCLGNBQUssQ0FBRyxLQUFHO0FBQUEsT0FDWixDQUFDLFFBQVMsQ0FBQyxVQUFTLENBQUMsS0FBTSxFQUFDLFNBQUMsT0FBTTtBQUNsQyxnQkFBUSxDQUFDLFNBQVEsR0FBRyxTQUFDLENBQUk7QUFBRSxpQkFBTSxRQUFTLEVBQUM7U0FBRSxFQUFDLENBQUM7T0FDaEQsRUFBQyxDQUFDO0tBQ0g7QUFBQSxHQUVELENBQUMsSUFBSyxDQUFDLFdBQVUsQ0FBRyxVQUFVOztBQUU3QixRQUFHLG9CQUFvQixFQUFJLEtBQUcsQ0FBQztBQUcvQixVQUFNLENBQUMsQ0FBQyxPQUFNLENBQUcsWUFBVSxDQUFHLFdBQVMsQ0FBQyxHQUFHLFNBQUMsS0FBSSxDQUFHLE9BQUs7QUFDdkQsa0JBQVcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLEtBQUksQ0FBTTtBQUNsQyxhQUFJLGdCQUFpQixFQUFDLENBQUM7QUFDdkIsb0JBQVksQ0FBQyxNQUFLLENBQUcsTUFBSSxDQUFDLENBQUM7T0FDNUIsRUFBQyxDQUFDO0tBQ0gsRUFBQyxDQUFDO0FBQ0YsVUFBTSxDQUFDLENBQUMsWUFBVyxDQUFHLGFBQVcsQ0FBQyxHQUFHLFNBQUMsS0FBSSxDQUFHLE9BQUs7QUFDakQsa0JBQVcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLEtBQUksQ0FBTTtBQUNsQyxvQkFBWSxDQUFDLE1BQUssQ0FBRyxNQUFJLENBQUMsQ0FBQztPQUM1QixFQUFDLENBQUM7S0FDSCxFQUFDLENBQUM7QUFDRixRQUFHLFFBQVEsYUFBYyxFQUFDLFNBQUMsS0FBSSxDQUFNO0FBQ3BDLFdBQUksZ0JBQWlCLEVBQUMsQ0FBQztBQUN2QixrQkFBWSxDQUFDLGdCQUFlLENBQUcsTUFBSSxDQUFDLENBQUM7S0FDdEMsRUFBQyxDQUFDO0FBR0YsUUFBRyxJQUFJLEVBQUksS0FBRyxRQUFRLENBQUM7QUFHdkIsUUFBRyxHQUFHLEVBQUksU0FBUSxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQzFCLFFBQUcsUUFBUSxLQUFNLENBQUMsSUFBRyxDQUFHLEtBQUcsR0FBRyxDQUFDLENBQUM7QUFHaEMsUUFBRyxhQUFhLGNBQWUsQ0FBQyxJQUFHLENBQUMsQ0FBQztHQUV0QyxDQUFDLENBQUM7QUFJTCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUM5S0EsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7aUVDQUEsaUNBQVEsdUJBQVUsbUNBQUcsUUFBQztBQUNyQixjQUFXLENBQUM7QUFFUixTQUFJO0FBR1AsWUFBTyxDQUFQLFVBQVMsV0FBVSxDQUFHLFVBQVE7QUFDN0IsZUFBUSxFQUFJLFVBQVEsR0FBSyxHQUFDLENBQUM7QUFDdkIsYUFBRSxFQUFJLFVBQWdCLENBQUc7QUNQcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRE03RSxtQkFBVSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQzlCLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDekIsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUdBLGVBQVUsQ0FBVixVQUFZLFVBQVMsQ0FBRyxZQUFVLENBQUcsVUFBUTtBQUM1QyxlQUFRLEVBQUksVUFBUSxHQUFLLEdBQUMsQ0FBQztBQUN2QixhQUFFLEVBQUksVUFBZ0IsQ0FBRztBQ2xCcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRGlCN0UsbUJBQVUsTUFBTyxDQUFDLElBQUcsQ0FBRyxFQUFDLFVBQVMsVUFBVSxZQUFZLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7T0FDekUsQ0FBQztBQUNELFNBQUUsVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFDLFVBQVMsVUFBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQzlELFNBQUUsVUFBVSxZQUFZLEVBQUksSUFBRSxDQUFDO0FBQy9CLFlBQU8sSUFBRSxDQUFDO0tBQ1g7QUFLQSxVQUFLLENBQUwsVUFBTyxJQUFZO0FFN0JULFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FGNEJsRyxVQUFHLFFBQVMsRUFBQyxTQUFDLEdBQUUsQ0FBTTtBQUNyQixhQUFTLE9BQUUsR0FBSyxJQUFFLENBQUc7QUFDcEIsY0FBSSxHQUFFLGVBQWdCLENBQUMsR0FBRSxDQUFDLENBQUc7QUFDNUIsZ0JBQUcsQ0FBRSxHQUFFLENBQUMsRUFBSSxJQUFFLENBQUUsR0FBRSxDQUFDLENBQUM7V0FDckI7QUFBQSxTQUNEO0FBQUEsT0FDRCxFQUFDLENBQUM7QUFDRixZQUFPLEtBQUcsQ0FBQztLQUNaO0FBSUEsU0FBSSxDQUFKLFVBQU0sSUFBRztBQUFLLGNBQU8sU0FBQyxHQUFFLENBQU07QUFBRSxjQUFPLElBQUUsQ0FBRSxJQUFHLENBQUM7T0FBRTtLQUFFO0FBSW5ELFFBQUcsQ0FBSCxVQUFLLEVBQVUsQ0FBRztBRTlDUixXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBRjRDL0UsWUFBTyxHQUFDLE1BQU8sQ0FBQyxTQUFRLENBQUcsS0FBRyxDQUFDO0tBQUU7QUFJckQsVUFBSyxDQUFMLFVBQU8sR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNqQixVQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBRztBQUFFLFdBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxHQUFDO09BQUU7QUFDL0MsWUFBTyxJQUFFLENBQUUsSUFBRyxDQUFDLENBQUM7S0FDakI7QUFJQSxTQUFJLENBQUosVUFBTSxHQUFFLENBQUcsS0FBRyxDQUFHO0FBQ2hCLFVBQUksYUFBYSxDQUFDLEdBQUUsQ0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFHO0FBQUUsV0FBRSxDQUFFLElBQUcsQ0FBQyxFQUFJLEdBQUM7T0FBRTtBQUMvQyxZQUFPLElBQUUsQ0FBRSxJQUFHLENBQUMsQ0FBQztLQUNqQjtBQUdBLFFBQUcsQ0FBSCxVQUFLLEdBQUUsQ0FBRyxJQUFFLENBQUc7QUFDVixhQUFJLElBQUUsUUFBUyxDQUFDLEdBQUUsQ0FBQyxDQUFDO0FBQ3hCLFVBQUksS0FBTSxFQUFDLEVBQUc7QUFBRSxXQUFFLE9BQVEsQ0FBQyxFQUFDO09BQUU7QUFBQSxLQUMvQjtBQUdBLGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUNkLGFBQU8sR0FBRSxPQUFPLEVBQUksR0FBRztBQUFFLFdBQUUsSUFBSyxFQUFDO09BQUU7QUFBQSxLQUNwQztBQUdBLFNBQUksQ0FBSixVQUFNLEVBQUMsQ0FBRyxJQUFFLENBQUcsS0FBRyxDQUFHO0FBQUUsWUFBTyxHQUFDLEtBQUssTUFBTyxDQUFDLEVBQUMsQ0FBRyxFQUFDLEdBQUUsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUM7S0FBRTtBQUdwRSxRQUFHLENBQUgsVUFBSyxHQUFFLENBQUcsRUFBUyxDQUFHO0FFN0VaLFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FGMkUzRSxZQUFPLFFBQU8sQ0FBQyxHQUFFLENBQUUsRUFBQyxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUM7S0FBRTtBQUkxRCxvQkFBZSxDQUFmLFVBQWlCLGFBQVksQ0FBRyxLQUFHLENBQUc7QUFDakMsMEJBQWUsRUFBSSxjQUFZLEtBQUssTUFBTyxDQUFDLGFBQVksQ0FBRyxFQUFDLElBQUcsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztBQUNuRixZQUFPLElBQUksaUJBQWdCLEVBQUMsQ0FBQztLQUM5QjtBQUlBLFVBQUssQ0FBTCxVQUFPLFNBQVEsQ0FBRyxRQUFNLENBQUc7QUFDMUIsVUFBSSxDQUFDLFNBQVEsQ0FBRztBQUFFLGFBQU0sSUFBSSxNQUFLLENBQUMsT0FBTSxHQUFLLG1CQUFpQixDQUFDO09BQUU7QUFBQSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR25ELGFBQVEsQ0FBUixVQUFVLEdBQUU7QUFBSyxZQUFPLE9BQUssS0FBTSxDQUFDLEdBQUUsQ0FBQyxJQUFLLEVBQUMsWUFBRTtjQUFLLElBQUUsQ0FBRSxHQUFFLENBQUM7T0FBQSxFQUFDO0tBQUU7QUFHOUQsa0JBQWEsQ0FBYixVQUFlLE9BQU0sQ0FBRztBQUN2QixVQUFJLE9BQU0sSUFBSyxDQUFDLFVBQVMsQ0FBQyxJQUFNLFNBQU8sQ0FBRztBQUN6QyxlQUFNLElBQUssQ0FBQyxVQUFTLENBQUcsV0FBUyxDQUFDLENBQUM7T0FDcEM7QUFBQSxLQUNEO0FBR0EsU0FBSSxDQUFKLFVBQWMsQ0FBRztBQzdHUCxXQUFTLFlBQW9CLEdBQUM7QUFBRyxnQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FENEc5RSxXQUFTLE9BQUksR0FBRyxJQUFJLE9BQUssT0FBTyxDQUFHLEtBQUssR0FBRztBQUMxQyxZQUFJLFdBQVcsQ0FBQyxNQUFLLENBQUUsRUFBQyxDQUFDLENBQUc7QUFBRSxnQkFBTyxPQUFLLENBQUUsRUFBQztTQUFFO0FBQUEsT0FDaEQ7QUFBQSxLQUNEO0FBS0EsWUFBTyxDQUFQLFVBQVMsSUFBRyxDQUFHLEtBQUcsQ0FBRyxRQUFNO0FBQ3RCLGlCQUFNLENBQUM7QUFDWCxZQUFPLFVBQWdCO0FDeEhkLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQTtBRHVIekUsbUJBQU0sSUFBSSxTQUFDLENBQUs7QUFDbkIsaUJBQU0sRUFBSSxLQUFHLENBQUM7QUFDZCxjQUFHLE1BQU8sQ0FBQyxPQUFNLFFBQVEsQ0FBRyxLQUFHLENBQUMsQ0FBQztTQUNsQyxFQUFDO0FBQ0Qsb0JBQVksQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUNyQixlQUFNLEVBQUksV0FBVSxDQUFDLE9BQU0sQ0FBRyxLQUFHLENBQUMsQ0FBQztPQUNwQyxDQUFDO0tBQ0Y7QUFJQSxzQkFBaUIsQ0FBakIsVUFBbUIsRUFBQyxDQUFHLFFBQU07QUFDeEIsY0FBRyxFQUFJLE1BQUksQ0FBQztBQUVoQixjQUFTLFlBQVUsQ0FBRSxDQUFFO0FBQ3RCLFVBQUMsTUFBTyxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQ2pCLFlBQUksSUFBRyxDQUFHO0FBQUUsaUJBQUs7U0FBRTtBQUNuQiw2QkFBcUIsQ0FBQyxXQUFVLENBQUMsQ0FBQztPQUNuQztBQUVBLGlCQUFXLEVBQUMsQ0FBQztBQUVULHVCQUFZLElBQUksU0FBQyxDQUFLO0FBQ3pCLFlBQUksYUFBWSxnQkFBZ0IsQ0FBRztBQUNsQyx1QkFBWSxnQkFBZ0IsRUFBSSxNQUFJLENBQUM7QUFDckMsZ0JBQU8sY0FBWSxjQUFjLENBQUM7QUFDbEMsY0FBRyxFQUFJLEtBQUcsQ0FBQztTQUNaO0FBQUEsT0FDRCxFQUFDO0FBQ0QsbUJBQVksZ0JBQWdCLEVBQUksS0FBRyxDQUFDO0FBQ3BDLG1CQUFZLGNBQWMsSUFBSSxTQUFDLFVBQVMsQ0FBTTtBQUM3QyxrQkFBVSxDQUFDLGFBQVksQ0FBQyxDQUFDO0FBQ3pCLGNBQU8sY0FBWSxDQUFDO09BQ3JCLEVBQUM7QUFDRCxZQUFPLGNBQVksQ0FBQztLQUNyQjtBQUdBLGdCQUFXLENBQVgsVUFBYSxJQUFHLENBQUcsUUFBTTtBQUNwQixtQkFBUSxFQUFJLEtBQUcsQ0FBQztBQUNoQixnQkFBSyxFQUFJLFVBQWdCO0FDaktwQixhQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsb0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FEZ0s3RSxZQUFJLFNBQVEsQ0FBRztBQUNkLG1CQUFRLEVBQUksTUFBSSxDQUFDO0FBQ2pCLG9CQUFVLEVBQUMsU0FBQyxDQUFLO0FBQUUscUJBQVEsRUFBSSxLQUFHO1dBQUUsRUFBRyxHQUFDLENBQUM7QUFDekMsY0FBRyxNQUFPLENBQUMsT0FBTSxHQUFLLEtBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQztTQUNsQztBQUFBLE9BQ0QsQ0FBQztBQUNELFlBQUssb0JBQW9CLElBQUksU0FBQyxDQUFLO0FBQ2xDLGlCQUFRLEVBQUksS0FBRyxDQUFDO09BQ2pCLEVBQUM7QUFDRCxZQUFPLE9BQUssQ0FBQztLQUNkO0FBT0EsVUFBSyxDQUFMLFVBQU8sSUFBa0I7O0FBQWpCLGtCQUFPO0FBQUcsaUJBQU07QUFHdkIsYUFBTSxFQUFJLFFBQU0sR0FBSyxHQUFDLFNBQUMsRUFBRztjQUFNLEVBQUMsS0FBTSxHQUFDO09BQUEsRUFBQyxDQUFDO0FBR3RDLGVBQUksQ0FBQztBQUdULGNBQVMsY0FBWSxDQUFFO0FBQ2xCLG9CQUFPLEVBQUksU0FBUSxFQUFDLENBQUM7QUFDckIsb0JBQU8sRUFBSSxNQUFJLENBQUM7QUFDcEIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDLENBQUc7QUFDakMsZUFBSSxFQUFJLFNBQU8sQ0FBQztBQUNoQixrQkFBTyxRQUFTLEVBQUMsU0FBQyxFQUFDO2tCQUFNLEdBQUUsQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDO1dBQUEsRUFBQyxDQUFDO1NBQ2pEO0FBQUEsT0FDRDtBQUdJLDhCQUFtQixFQUFJLGVBQWMsQ0FBQyxhQUFZLENBQUMsQ0FBQztBQUlwRCxrQkFBTyxJQUFJLFNBQUMsQ0FBSztBQUNwQiw0QkFBb0IsRUFBQyxDQUFDO0FBQ3RCLGNBQU8sTUFBSSxDQUFDO09BQ2IsRUFBQztBQUdHLGtCQUFPLEVBQUksR0FBQyxDQUFDO0FBQ2pCLGNBQU8sU0FBUyxJQUFJLFNBQUMsRUFBQyxDQUFNO0FBQzNCLGdCQUFPLEtBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUNqQixjQUFPLFNBQU8sQ0FBQztPQUNoQixFQUFDO0FBR0QsY0FBTyxvQkFBb0IsSUFBSSxTQUFDLENBQUs7QUFDcEMsNEJBQW1CLG9CQUFxQixFQUFDLENBQUM7T0FDM0MsRUFBQztBQUdELDBCQUFvQixFQUFDLENBQUM7QUFFdEIsWUFBTyxTQUFPLENBQUM7S0FDaEI7QUFFQSxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUcsT0FBSztBQUNuQixZQUFPLFVBQWdCO0FDbE9kLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QURpTzdFLGNBQU8sSUFBSSxFQUFDLEVBQUMsU0FBQyxPQUFNLENBQUcsT0FBSyxDQUFNO0FBQ2pDLGFBQUk7QUFDSCxlQUFFLENBQUUsTUFBSyxDQUFDLE1BQU8sQ0FBQyxHQUFFLENBQUcsS0FBRyxPQUFRLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQztXQUM3QyxDQUFFLE9BQU8sS0FBSSxDQUFHO0FBQ2Ysa0JBQU0sQ0FBQyxLQUFJLENBQUMsQ0FBQztXQUNkO0FBQUEsU0FDRCxFQUFDLENBQUM7T0FDSCxDQUFDO0tBQ0Y7QUFFQSxpQkFBWSxDQUFaLFVBQWMsRUFBQyxDQUFHO0FBQ2pCLFlBQU8sVUFBVSxDQUFFO0FBQ2xCLFlBQUksRUFBQyxPQUFPLEdBQUssVUFBUSxPQUFPLENBQUc7QUFDbEMsZ0JBQU8sR0FBQyxNQUFPLENBQUMsSUFBRyxDQUFHLFVBQVEsQ0FBQyxDQUFDO1NBQ2pDLEtBQU87QUFDTixnQkFBTyxRQUFPLENBQUMsRUFBQyxDQUFHLEtBQUcsQ0FBRyxVQUFRLENBQUMsQ0FBQztTQUNwQztBQUFBLE9BQ0QsQ0FBQztLQUNGO0FBQUEsR0FFRCxDQUFDO0FBSUQsWUFBUyxFQUFJLFdBQVUsQ0FBQyxTQUFVLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDNUMsUUFBRyxJQUFJLEVBQUksSUFBRSxDQUFDO0FBQ2QsUUFBRyxLQUFLLEVBQUksS0FBRyxDQUFDO0dBQ2pCLENBQUMsQ0FBQztBQUNGLFlBQVMsU0FBUyxJQUFJLFNBQUMsRUFBRyxHQUFNO0FBQy9CLFVBQU8sSUFBSSxXQUFVLENBQUMsS0FBSSxFQUFJLE1BQUksQ0FBRyxPQUFLLEVBQUksT0FBSyxDQUFDLENBQUM7R0FDdEQsRUFBQztBQUNELFlBQVMsT0FBTyxJQUFJLFNBQUMsRUFBRyxHQUFNO0FBQzdCLFVBQU8sWUFBVyxDQUFDLEVBQUMsR0FBSyxZQUFXLENBQUMsRUFBQyxHQUFLLE1BQUksSUFBTSxNQUFJLEdBQUssT0FBSyxJQUFNLE9BQUssQ0FBQztHQUNoRixFQUFDO0FBSUQsUUFBSyxFQUFJLFdBQVUsQ0FBQyxTQUFVLE1BQUssQ0FBRyxNQUFJLENBQUc7QUFDNUMsUUFBRyxPQUFPLEVBQUksT0FBSyxDQUFDO0FBQ3BCLFFBQUcsTUFBTSxFQUFJLE1BQUksQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDRixRQUFLLE9BQU8sSUFBSSxTQUFDLEVBQUcsR0FBTTtBQUN6QixVQUFPLFlBQVcsQ0FBQyxFQUFDLEdBQUssWUFBVyxDQUFDLEVBQUMsR0FBSyxTQUFPLElBQU0sU0FBTyxHQUFLLFFBQU0sSUFBTSxRQUFNLENBQUM7R0FDeEYsRUFBQztBQUdELFFBQU8sR0FBQztBQUVULGlKQUFFO0FBQ0Y7Ozs7Ozs7aUVHclJBLGlDQUFPLENBQUMsQ0FBRywwQ0FBVSxDQUFFO0FBQ3RCLGNBQVcsQ0FBQztBQUVSLGFBQU0sRUFBSSxHQUFDO0FBRWYsUUFBTyxTQUFTLFNBQU8sQ0FBRSxNQUFLLENBQUc7QUFDaEMsYUFBVSxNQUFLLEdBQUcsWUFBVSxHQUFDLElBQUcsRUFBQyxRQUFNLEVBQUUsRUFBRztHQUM3QyxDQUFDO0FBQ0YsRUFBQywrSUFBQztBQUNGOzs7Ozs7O2lFQ1RBLGlDQUFRLHVCQUFRLENBQUcsMENBQVU7QUFDNUIsY0FBVyxDQUFDO0FBUVosVUFBUyxXQUFTLENBQUUsT0FBTSxDQUFHLFFBQU07QUFFOUIsZUFBTSxFQUFJLFFBQU0sS0FBTSxDQUFDLG1CQUFrQixDQUFDLENBQUM7QUFDL0MsV0FBTSxLQUFNLENBQUMsbUJBQWtCLENBQUcsUUFBTSxDQUFDLENBQUM7QUFFMUMsUUFBSSxPQUFNLEVBQUksS0FBSyxRQUFNLElBQU0sR0FBRztBQUVqQyxhQUFNLEtBQU0sQ0FBQyx3QkFBdUIsQ0FBRyxRQUFNLElBQUssQ0FBQyxTQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzlELGFBQU0sSUFBSyxDQUFDLFVBQVMsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUM3QixnQkFBVSxFQUFDLFNBQUM7QUFDWCxlQUFNLElBQUssQ0FBQyxtQ0FBa0MsR0FBRyxTQUFDLENBQUs7QUFDdEQsY0FBSSxPQUFNLEtBQU0sQ0FBQyxtQkFBa0IsQ0FBQyxJQUFNLEdBQUc7QUFDNUMsbUJBQU0sSUFBSyxDQUFDLFNBQVEsQ0FBRyxPQUFLLENBQUMsQ0FBQztXQUMvQjtBQUFBLFNBQ0QsRUFBQyxDQUFDO09BQ0gsRUFBRyxHQUFDLENBQUM7S0FFTixLQUFPLEtBQUksT0FBTSxJQUFNLEtBQUssUUFBTSxFQUFJLEdBQUc7QUFFeEMsYUFBTSxJQUFLLENBQUMsU0FBUSxDQUFHLFFBQU0sS0FBTSxDQUFDLHdCQUF1QixDQUFDLENBQUMsQ0FBQztBQUM5RCxhQUFNLEtBQU0sQ0FBQyx5QkFBd0IsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUM3QyxnQkFBVSxFQUFDLFNBQUMsQ0FBSztBQUNoQixlQUFNLFdBQVksQ0FBQyx5QkFBd0IsQ0FBQyxDQUFDO0FBQzdDLGVBQU0sSUFBSyxDQUFDLFVBQVMsQ0FBRyxRQUFNLEtBQU0sQ0FBQyxtQkFBa0IsQ0FBQyxDQUFDLENBQUM7T0FDM0QsRUFBRyxHQUFDLENBQUM7S0FFTixLQUFPLEtBQUksQ0FBQyxPQUFNLEtBQU0sQ0FBQyx5QkFBd0IsQ0FBQyxDQUFHO0FBRW5ELGFBQU0sSUFBSyxDQUFDLFVBQVMsQ0FBRyxRQUFNLENBQUMsQ0FBQztLQUVsQztBQUFBLEdBQ0Q7QUFFQSxNQUFHLE9BQVEsQ0FBQyxDQUtYLGlCQUFnQixDQUFoQixVQUFrQixJQUFHLENBQUc7QUFDdkIsZ0JBQVUsQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDbEIsaUJBQU0sRUFBSSxHQUFDO0FBQ2YsVUFBRyxPQUFRLEVBQUMsU0FBVSxFQUFDLEtBQU0sQ0FBQyxTQUFVLENBQUU7QUFDekMsZUFBTSxHQUFLLFdBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLEtBQU0sQ0FBQyxtQkFBa0IsQ0FBQyxDQUFDLENBQUM7T0FDekQsQ0FBQyxDQUFDO0FBQ0YsZ0JBQVUsQ0FBQyxJQUFHLE9BQVEsRUFBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQ2xDLFlBQU8sS0FBRyxDQUFDO0tBQ1osQ0FDRCxDQUFDLENBQUM7QUFDSCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUMxREEsNEVBQVcsQ0FBQztBQUdaLGtDQUFRLHVCQUFRLENBQUcsMENBQVU7QUFJNUIsTUFBRyxPQUFRLENBQUM7QUFDWCxnQkFBVyxDQUFHLFNBQVMsYUFBVyxDQUFFLEVBQUM7QUFDcEMsWUFBTyxLQUFHLEtBQU0sQ0FBQyxTQUFVOztBQUMxQixTQUFDLENBQUMsSUFBRyxDQUFDLEdBQUksQ0FBQyxXQUFVLEdBQUcsU0FBbUI7QUFDdEMseUJBQVUsSUFBSSxTQUFDLENBQUs7QUFDdkIsYUFBQyxDQUFDLE1BQUssQ0FBQyxJQUFLLENBQUMsU0FBUSxDQUFHLFVBQVEsQ0FBQyxDQUFDO1dBQ3BDLEVBQUM7QUFDRyx1QkFBUSxJQUFJLFNBQUMsWUFBVyxDQUFNO0FBQ2pDLGFBQUMsQ0FBQyxNQUFLLENBQUMsSUFBSyxDQUFDLFdBQVUsQ0FBRyxZQUFVLENBQUMsQ0FBQztBQUN2Qyx3QkFBVyx5QkFBMEIsRUFBQyxDQUFDO0FBQ3ZDLGNBQUMsS0FBTSxNQUFPLGFBQVcsQ0FBQyxDQUFDO1dBQzVCLEVBQUM7QUFDRCxXQUFDLENBQUMsTUFBSyxDQUFDLElBQUssQ0FBQyxXQUFVLENBQUcsWUFBVSxDQUFDLENBQUM7QUFDdkMsV0FBQyxDQUFDLE1BQUssQ0FBQyxJQUFLLENBQUMsU0FBUSxDQUFHLFVBQVEsQ0FBQyxDQUFDO1NBQ3BDLEVBQUMsQ0FBQztPQUNILENBQUMsQ0FBQztLQUNIO0FBQ0EsaUJBQVksQ0FBRyxTQUFTLGNBQVksQ0FBRSxNQUFLLENBQUcsT0FBSztBQUNsRCxZQUFPLEtBQUcsS0FBTSxDQUFDLFNBQVU7O0FBQzFCLFNBQUMsQ0FBQyxJQUFHLENBQUMsR0FBSSxDQUFDLFdBQVUsR0FBRyxTQUFDLGNBQWE7QUFDakMseUJBQVUsSUFBSSxTQUFDLFNBQVEsQ0FBTTtBQUNoQyxhQUFDLE1BQUssS0FBTSxDQUFDLHdCQUF1QixDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQzVDLGtCQUFLLEtBQU0sTUFBTyxVQUFRLENBQUMsQ0FBQztXQUM3QixFQUFDO0FBQ0csdUJBQVEsSUFBSSxTQUFDLFNBQVEsQ0FBTTtBQUM5QixhQUFDLENBQUMsTUFBSyxDQUFDLElBQUssQ0FBQyxXQUFVLENBQUcsWUFBVSxDQUFDLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxNQUFLLEtBQU0sQ0FBQyx3QkFBdUIsQ0FBQyxDQUFHO0FBQzNDLG9CQUFLLEtBQU0sTUFBTyxVQUFRLENBQUMsQ0FBQzthQUM3QjtBQUFBLFdBQ0QsRUFBQztBQUNELHdCQUFhLGdCQUFpQixFQUFDLENBQUM7QUFDaEMsV0FBQyxDQUFDLE1BQUssQ0FBQyxJQUFLLENBQUMsV0FBVSxDQUFHLFlBQVUsQ0FBQyxDQUFDO0FBQ3ZDLFdBQUMsQ0FBQyxNQUFLLENBQUMsSUFBSyxDQUFDLFNBQVEsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUNuQyxXQUFDLE1BQUssS0FBTSxDQUFDLHdCQUF1QixDQUFHLE1BQUksQ0FBQyxDQUFDO1NBQzlDLEVBQUMsQ0FBQztPQUNILENBQUMsQ0FBQztLQUNIO0FBRUEsbUJBQWMsQ0FBRyxTQUFTLGdCQUFjLENBQUUsQ0FBRTtBQUMzQyxZQUFPLEVBQUMsQ0FBQyxJQUFHLENBQUMsSUFBSyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0tBQ2hDO0FBQ0Esb0JBQWUsQ0FBRyxTQUFTLGlCQUFlLENBQUUsQ0FBRTtBQUM3QyxZQUFPLEVBQUMsQ0FBQyxJQUFHLENBQUMsSUFBSyxDQUFDLFdBQVUsQ0FBQyxDQUFDO0tBQ2hDO0FBQUEsR0FDRCxDQUFDLENBQUM7QUFJSCxFQUFDLCtJQUFDO0FBRUY7Ozs7Ozs7QUN6REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNqQkE7QUFDQSx5Q0FBd0Msb0JBQW9CLHFCQUFxQixvQkFBb0IsYUFBYSwwQkFBMEIsNEJBQTRCLHVCQUF1QixvQkFBb0IsV0FBVyx1QkFBdUIsb0JBQW9CLHFCQUFxQixvQkFBb0IsYUFBYSw0QkFBNEIsNkJBQTZCLDhCQUE4QiwwQkFBMEIsc0JBQXNCLHlCQUF5QixzQ0FBc0Msc0JBQXNCLCtCQUErQixnQ0FBZ0Msb0JBQW9CLHFCQUFxQixvQkFBb0IsYUFBYSw4QkFBOEIsNkJBQTZCLDJCQUEyQix1QkFBdUIsbUJBQW1CLHlCQUF5QixzQ0FBc0Msc0JBQXNCLDhCQUE4QixTQUFTLFVBQVUsVUFBVSxzQ0FBc0MsUUFBUSxTQUFTLFdBQVcsaURBQWlELDJCQUEyQiwyQ0FBMkMsNEJBQTRCLFE7Ozs7OztBQ0R6b0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxtQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTJEO0FBQzNELE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4OTM2NGViY2U5ZWU1MWNmZjJkZVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL3VuaXF1ZS1pZC5qcycsXG5cdCcuL3V0aWwvbmVzdGVkLWZsZXgtZ3Jvdy5qcycsXG5cdCcuL3V0aWwvY2xpY2tWc0RyYWcuanMnLFxuXHQnLi9wLWNvcmUuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBVLCB1bmlxdWVJRCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAnY29yZScsXG5cdFx0aWY6IHRydWVcblx0fSk7XG5cblxuXHQvKiBDaXJjdWl0Ym9hcmQgKi9cblx0cGx1Z2luLm1vZGlmeSgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdfcmVnaXN0ZXJUaWxlJywgZnVuY3Rpb24gX3JlZ2lzdGVyVGlsZSh0aWxlKSB7IC8vIHVzZWQgYnkgdGlsZXNcblx0XHRcdFx0aWYgKCF0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0pIHtcblx0XHRcdFx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0gPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0ucHVzaCh0aWxlKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCd0aWxlY3JlYXRlZCcsIHRpbGUpO1xuXHRcdFx0fSkuYWRkKCdvblRpbGVDcmVhdGVkJywgZnVuY3Rpb24gb25UaWxlQ3JlYXRlZCh0aWxlU2VsZWN0b3IsIGZuKSB7XG5cblx0XHRcdFx0Ly8gYHRpbGVTZWxlY3RvcmAgaXMgb3B0aW9uYWwsIGkuZS4sIGEgc2luZ2xlIGFyZ3VtZW50IGlzIGBmbmBcblx0XHRcdFx0aWYgKCQuaXNVbmRlZmluZWQoYXJndW1lbnRzWzFdKSkge1xuXHRcdFx0XHRcdGZuID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0XHRcdHRpbGVTZWxlY3RvciA9IG51bGw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBidWlsZCB0aGUgZmlsdGVyIGJhc2VkIG9uIHRoZSBzZWxlY3RvclxuXHRcdFx0XHR2YXIgZmlsdGVyID0gbnVsbDtcblx0XHRcdFx0aWYgKCF0aWxlU2VsZWN0b3IpIHsgLy8gbm8gdGlsZSBzZWxlY3RvciA9IGFsbCB0aWxlc1xuXHRcdFx0XHRcdGZpbHRlciA9ICgpPT5QLnJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHRpbGVTZWxlY3RvciA9PT0gJ3N0cmluZycpIHsgLy8gbW9kZWwuaWRcblx0XHRcdFx0XHRmaWx0ZXIgPSAodGlsZSkgPT4gKHRpbGUubW9kZWwuaWQgPT09IHRpbGVTZWxlY3Rvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBhcHBseSB0aGUgY2FsbGJhY2sgZm9yIGV4aXN0aW5nIHRpbGVzXG5cdFx0XHRcdCQuZWFjaCh0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWQsIChtb2RlbElkLCB0aWxlcykgPT4ge1xuXHRcdFx0XHRcdCQuZWFjaCh0aWxlcywgKGluZGV4LCB0aWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsdGVyKHRpbGUpKSB7IGZuKHRpbGUpIH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gc2V0IHVwIHRoZSBjYWxsYmFja3MgZm9yIGZ1dHVyZSB0aWxlc1xuXHRcdFx0XHR0aGlzLm9uKCd0aWxlY3JlYXRlZCcsICh0aWxlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGZpbHRlcih0aWxlKSkgeyBmbih0aWxlKSB9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5hZGQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhpcy5fcF9jaXJjdWl0Ym9hcmRDb3JlX3RpbGVzQnlNb2RlbElkID0ge307XG5cblx0XHRcdFx0Ly8gY3JlYXRlIHRoZSByb290IHRpbGVtYXBcblx0XHRcdFx0JCgnPGRpdi8+JykuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxuXHRcdFx0XHRcdFx0LmNzcygnZmxleC1ncm93JywgMSlcblx0XHRcdFx0XHRcdC50aWxlbWFwKHtcblx0XHRcdFx0XHRcdFx0bW9kZWw6IHRoaXMub3B0aW9ucy5tb2RlbCxcblx0XHRcdFx0XHRcdFx0cGFyZW50OiB0aGlzXG5cdFx0XHRcdFx0XHR9KS50aWxlbWFwKCdpbnN0YW5jZScpXG5cdFx0XHRcdFx0XHQudGhlbigodGlsZW1hcCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9uZSgnZGVzdHJveScsICgpPT4geyB0aWxlbWFwLmRlc3Ryb3koKSB9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblxuXHQvKiBUaWxlbWFwICovXG5cdHBsdWdpbi5tb2RpZnkoJ1RpbGVtYXAucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ3JlZnJlc2hUaWxlcycsIGZ1bmN0aW9uIHJlZnJlc2hUaWxlcygpIHtcblxuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sgKi9cblx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodGhpcy5tb2RlbCksXG5cdFx0XHRcdFx0XHRgQW4gQXBpTkFUT01ZIHRpbGVtYXAgc2hvdWxkIGhhdmUgYSBtb2RlbC5gKTtcblxuXHRcdFx0XHQvKiByZW5kZXIgdGhlIG5ldyB0aWxlbWFwICh0aHJvdWdoIGEgcHJvbWlzZSBjaGFpbiwgcmV0dXJuaW5nIHRoZSBmaW5hbCBwcm9taXNlKSAqL1xuXHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHRoaXMubW9kZWwpXG5cdFx0XHRcdFx0LyogZ2V0IHRoZSBpZCdzIG9mIGFsbCBjaGlsZCBtb2RlbHMgKi9cblx0XHRcdFx0XHRcdC5jYWxsKCdnZXRDaGlsZElkcycpXG5cdFx0XHRcdFx0LyogZmlsdGVyIG91dCB0aGUgaWRzIG9mIGNoaWxkcmVuIHRoYXQgb3VnaHQgbm90IGJlIGRpc3BsYXllZCAqL1xuXHRcdFx0XHRcdFx0Lm1hcCgoaWQpID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFAucmVzb2x2ZSh0aGlzLmNpcmN1aXRib2FyZC5vcHRpb25zLmZpbHRlcihpZCwgVS5iaW5kKFAucmVzb2x2ZSh0aGlzLm1vZGVsKS52YWx1ZSgpLCAnZ2V0TW9kZWxzJywgaWQpKSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKChzaG93KSA9PiB7IHJldHVybiB7IGlkOiBpZCwgc2hvdzogc2hvdyB9IH0pO1xuXHRcdFx0XHRcdFx0fSkuZmlsdGVyKFUuZmllbGQoJ3Nob3cnKSkubWFwKFUuZmllbGQoJ2lkJykpXG5cdFx0XHRcdFx0LyogZ2V0IHByb21pc2VzIHRvIGFsbCBjaGlsZCBlbnRpdGllcyAqL1xuXHRcdFx0XHRcdFx0LnRoZW4oKGlkcykgPT4gUC5yZXNvbHZlKHRoaXMubW9kZWwpLnZhbHVlKCkuZ2V0TW9kZWxzKGlkcykpXG5cdFx0XHRcdFx0LyogY3JlYXRlIGEgdGlsZSBmb3IgZWFjaCBjaGlsZCBlbnRpdHkgKi9cblx0XHRcdFx0XHRcdC50aGVuKChjaGlsZHJlblRvRGlzcGxheSkgPT4ge1xuXHRcdFx0XHRcdFx0XHQvKiByZW1vdmUgYWxsIG9sZCB0aWxlcyAqL1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2hpbGRyZW4oKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZW1wdHkoKTtcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogbWFpbnRhaW4gcmVmZXJlbmNlcywgc28gdGhleSB3b24ndCBoYXZlIHRvIGJlIHJlY3JlYXRlZFxuXG5cdFx0XHRcdFx0XHRcdC8qIHJlbmRlciBhbmQgc3RvcmUgcmVmZXJlbmNlcyB0byB0aGUgbmV3IHRpbGVzICovXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3BfdGlsZW1hcENvcmVfdGlsZXMgPSBbXTtcblx0XHRcdFx0XHRcdFx0dmFyIHJvd0NvdW50ID0gTWF0aC5mbG9vcihNYXRoLnNxcnQoY2hpbGRyZW5Ub0Rpc3BsYXkubGVuZ3RoKSk7XG5cdFx0XHRcdFx0XHRcdHZhciBjb2xDb3VudCA9IE1hdGguY2VpbChjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggLyByb3dDb3VudCk7XG5cdFx0XHRcdFx0XHRcdHdoaWxlIChyb3dDb3VudC0tKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJvdyA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd0aWxlcm93JykuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjb2xDb3VudCAmJiBjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggPiAwOyBjb2x1bW4gKz0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnPGRpdi8+JykudGlsZSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiBjaGlsZHJlblRvRGlzcGxheS5zaGlmdCgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmFwcGVuZFRvKHJvdykuYW15TmVzdGVkRmxleEdyb3coMSkudGlsZSgnaW5zdGFuY2UnKS50aGVuKCh0aWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX3BfdGlsZW1hcENvcmVfdGlsZXMucHVzaCh0aWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5vbmUoJ2Rlc3Ryb3knLCAoKSA9PiB7IHRpbGUuZGVzdHJveSgpIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8qIHNpZ25hbCB0aGF0IHRoZSB0aWxlcyBoYXZlIGJlZW4gKHJlKXJlbmRlcmVkICovXG5cdFx0XHRcdFx0XHQudGhlbigoKT0+IHsgdGhpcy50cmlnZ2VyKCd0aWxlcy1yZWZyZXNoZWQnKSB9KTtcblxuXHRcdFx0fSkuYWRkKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5fcF90aWxlbWFwQ29yZV90aWxlcyA9IG51bGw7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGlsZXMnLCB7IGdldDogKCkgPT4gdGhpcy5fcF90aWxlbWFwQ29yZV90aWxlcyB9KTtcblx0XHRcdFx0dGhpcy5yZWZyZXNoVGlsZXMoKTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiBUaWxlbWFwICovXG5cdHBsdWdpbi5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ3BvcHVsYXRlSW5uZXJUaWxlbWFwJywgZnVuY3Rpb24gcG9wdWxhdGVJbm5lclRpbGVtYXAoKSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLl9wX3RpbGVDb3JlX3RpbGVtYXApIHtcblx0XHRcdFx0XHR0aGlzLl9wX3RpbGVDb3JlX3RpbGVtYXAgPSB0aGlzLmRvbS50aWxlbWFwKHtcblx0XHRcdFx0XHRcdG1vZGVsOiB0aGlzLm9wdGlvbnMubW9kZWwsXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdFx0XHR9KS50aWxlbWFwKCdpbnN0YW5jZScpLnRoZW4oKHRpbGVtYXApID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub25lKCdkZXN0cm95JywgKCk9PiB7IHRpbGVtYXAuZGVzdHJveSgpIH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3BfdGlsZUNvcmVfdGlsZW1hcCA9IG51bGw7XG5cblx0XHRcdFx0Lyogc3VwcG9ydCBjZXJ0YWluIERPTS1ldmVudCBzdWJzY3JpcHRpb25zIGZyb20gdGhlIHRpbGUgb2JqZWN0IGl0c2VsZiAqL1xuXHRcdFx0XHQkLmVhY2goWydjbGljaycsICdtb3VzZW92ZXInLCAnbW91c2VvdXQnXSwgKGluZGV4LCBzaWduYWwpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQub24oc2lnbmFsLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKHNpZ25hbCwgZXZlbnQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JC5lYWNoKFsnbW91c2VlbnRlcicsICdtb3VzZWxlYXZlJ10sIChpbmRleCwgc2lnbmFsKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50Lm9uKHNpZ25hbCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoc2lnbmFsLCBldmVudCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xpY2tOb3REcm9wKChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcignY2xpY2stbm90LWRyb3AnLCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGEgZmllbGQgdG8gaG9sZCB0aGUgaW5uZXJtb3N0IEhUTUwgY29udGVudCBlbGVtZW50IHN0aWxsIGJlbG9uZ2luZyB0byB0aGlzIHRpbGUgKi9cblx0XHRcdFx0dGhpcy5kb20gPSB0aGlzLmVsZW1lbnQ7XG5cblx0XHRcdFx0LyogYW4gZWxlbWVudCBpZCBmb3IgcXVpY2sgbG9va3VwcyAqL1xuXHRcdFx0XHR0aGlzLmlkID0gdW5pcXVlSUQoJ3RpbGUnKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ2lkJywgdGhpcy5pZCk7XG5cblx0XHRcdFx0LyogaW5mb3JtIGNpcmN1aXRib2FyZCBvZiBuZXcgdGlsZSAqL1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC5fcmVnaXN0ZXJUaWxlKHRoaXMpO1xuXG5cdFx0XHR9KTtcblxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLWNvcmUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0Y2FsbChmbiwgLi4uYXJncykgeyByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblxuXHRcdFx0dmFyIHVuc3Vic2NyaWJlRm4gPSAoKSA9PiB7XG5cdFx0XHRcdGlmICh1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCkge1xuXHRcdFx0XHRcdHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkID0gZmFsc2U7XG5cdFx0XHRcdFx0ZGVsZXRlIHVuc3Vic2NyaWJlRm4udW5zdWJzY3JpYmVPbjtcblx0XHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHVuc3Vic2NyaWJlRm4uc3RpbGxTdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdHVuc3Vic2NyaWJlRm4udW5zdWJzY3JpYmVPbiA9IChzdWJzY3JpYmVyKSA9PiB7XG5cdFx0XHRcdHN1YnNjcmliZXIodW5zdWJzY3JpYmVGbik7XG5cdFx0XHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB1bnN1YnNjcmliZUZuO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRvcHRpb25hbEN1cnJ5KGZuKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoZm4ubGVuZ3RoIDw9IGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gVS5iaW5kQShmbiwgdGhpcywgYXJndW1lbnRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEudG9wID09PSBiLnRvcCAmJiBhLmxlZnQgPT09IGIubGVmdDtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gVGhpcyBmdW5jdGlvbiBwbGF5cyB3aXRoIHRoZSBgZmxleC1ncm93YCBhbmQgYGRpc3BsYXlgIHByb3BlcnRpZXNcblx0Ly8gb2YgYSBqUXVlcnkgZWxlbWVudCBpbiBzdWNoIGEgd2F5IHRoYXQgQ1NTMyB0cmFuc2l0aW9uIGFuaW1hdGlvbnNcblx0Ly8gYXJlIHByb3Blcmx5IGNhcnJpZWQgb3V0LCBhbmQgc3VjaCB0aGF0IGVsZW1lbnRzIHRoYXQgZ2V0IGFuIGVmZmVjdGl2ZVxuXHQvLyBgZmxleC1ncm93YCBvZiAwIGFyZSBhY3R1YWxseSBoaWRkZW4gZnJvbSB2aWV3LlxuXHQvL1xuXHRmdW5jdGlvbiBzZXREaXNwbGF5KGVsZW1lbnQsIG5ld0dyb3cpIHtcblxuXHRcdHZhciBvbGRHcm93ID0gZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpO1xuXHRcdGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dUYXJnZXQnLCBuZXdHcm93KTtcblxuXHRcdGlmIChvbGRHcm93ID4gMCAmJiBuZXdHcm93ID09PSAwKSB7XG5cblx0XHRcdGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dQcmV2RGlzcGxheScsIGVsZW1lbnQuY3NzKCdkaXNwbGF5JykpO1xuXHRcdFx0ZWxlbWVudC5jc3MoJ2ZsZXhHcm93JywgMWUtNSk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5vbmUoJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCcsICgpID0+IHtcblx0XHRcdFx0XHRpZiAoZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRlbGVtZW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sIDApO1xuXG5cdFx0fSBlbHNlIGlmIChvbGRHcm93ID09PSAwICYmIG5ld0dyb3cgPiAwKSB7XG5cblx0XHRcdGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1ByZXZEaXNwbGF5JykpO1xuXHRcdFx0ZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd0Nzc1NjaGVkdWxlZCcsIHRydWUpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRGF0YSgnYW15RmxleEdyb3dDc3NTY2hlZHVsZWQnKTtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ2ZsZXhHcm93JywgZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpKTtcblx0XHRcdH0sIDApO1xuXG5cdFx0fSBlbHNlIGlmICghZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd0Nzc1NjaGVkdWxlZCcpKSB7XG5cblx0XHRcdFx0ZWxlbWVudC5jc3MoJ2ZsZXhHcm93JywgbmV3R3Jvdyk7XG5cblx0XHR9XG5cdH1cblxuXHQkLmZuLmV4dGVuZCh7XG5cdFx0Ly9cblx0XHQvLyBzZXRzIHRoZSBjc3MgcHJvcGVydHkgJ2ZsZXgtZ3Jvdycgb24gdGhlIGN1cnJlbnQgZWxlbWVudCBhbmRcblx0XHQvLyBjb3JyZXNwb25kaW5nbHkgaW5jcmVhc2VzL2RlY3JlYXNlcyB0aGF0IG9mIGl0cyBkaXJlY3QgcGFyZW50XG5cdFx0Ly9cblx0XHRhbXlOZXN0ZWRGbGV4R3Jvdyhncm93KSB7XG5cdFx0XHRzZXREaXNwbGF5KHRoaXMsIGdyb3cpO1xuXHRcdFx0dmFyIGdyb3dTdW0gPSAwO1xuXHRcdFx0dGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRncm93U3VtICs9IHBhcnNlRmxvYXQoJCh0aGlzKS5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpKTtcblx0XHRcdH0pO1xuXHRcdFx0c2V0RGlzcGxheSh0aGlzLnBhcmVudCgpLCBncm93U3VtKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbmVzdGVkLWZsZXgtZ3Jvdy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5kZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcbi8vICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0JC5mbi5leHRlbmQoe1xuXHRcdGNsaWNrTm90RHJvcDogZnVuY3Rpb24gY2xpY2tOb3REcm9wKGZuKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignbW91c2Vkb3duJywgKC8qbW91c2VEb3duRXZlbnQqLykgPT4ge1xuXHRcdFx0XHRcdHZhciBvbk1vdXNlTW92ZSA9ICgpID0+IHtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vZmYoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dmFyIG9uTW91c2VVcCA9IChtb3VzZVVwRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vZmYoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcblx0XHRcdFx0XHRcdG1vdXNlVXBFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdGZuLmNhbGwodGhpcywgbW91c2VVcEV2ZW50KTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdCQod2luZG93KS5vbmUoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcblx0XHRcdFx0XHQkKHdpbmRvdykub25lKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1vdXNlRHJhZ0Ryb3A6IGZ1bmN0aW9uIG1vdXNlRHJhZ0Ryb3AoZHJhZ0ZuLCBkcm9wRm4pIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLm9uKCdtb3VzZWRvd24nLCAobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdFx0XHR2YXIgb25Nb3VzZU1vdmUgPSAobW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmRhdGEoJ21vdXNlRHJhZ0Ryb3AtZHJhZ2dpbmcnLCB0cnVlKTtcblx0XHRcdFx0XHRcdGRyYWdGbi5jYWxsKHRoaXMsIG1vdmVFdmVudCk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR2YXIgb25Nb3VzZVVwID0gKGRyb3BFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0JCh3aW5kb3cpLm9mZignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuXHRcdFx0XHRcdFx0aWYgKCQodGhpcykuZGF0YSgnbW91c2VEcmFnRHJvcC1kcmFnZ2luZycpKSB7XG5cdFx0XHRcdFx0XHRcdGRyb3BGbi5jYWxsKHRoaXMsIGRyb3BFdmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRtb3VzZURvd25FdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHQkKHdpbmRvdykub25lKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdtb3VzZURyYWdEcm9wLWRyYWdnaW5nJywgZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0Ly8gVE9ETzogdGhlc2UgZXZlbnQtaGFuZGxlciByZW1vdmVycyBjYXN0IHdheSB0b28gd2lkZSBhIG5ldDsgbWFrZSB0aGVtIG1vcmUgc3BlY2lmaWNcblx0XHRvZmZDbGlja05vdERyb3A6IGZ1bmN0aW9uIG9mZkNsaWNrTm90RHJvcCgpIHtcblx0XHRcdHJldHVybiAkKHRoaXMpLm9mZignbW91c2Vkb3duJyk7XG5cdFx0fSxcblx0XHRvZmZNb3VzZURyYWdEcm9wOiBmdW5jdGlvbiBvZmZNb3VzZURyYWdEcm9wKCkge1xuXHRcdFx0cmV0dXJuICQodGhpcykub2ZmKCdtb3VzZWRvd24nKTtcblx0XHR9XG5cdH0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSk7Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvY2xpY2tWc0RyYWcuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY29yZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jaXJjdWl0Ym9hcmR7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpzdHJldGNoOy13ZWJraXQtYWxpZ24taXRlbXM6c3RyZXRjaDstbXMtZmxleC1hbGlnbjpzdHJldGNoO2FsaWduLWl0ZW1zOnN0cmV0Y2g7cGFkZGluZzowO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwe2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47LXdlYmtpdC1ib3gtcGFjazpqdXN0aWZ5Oy13ZWJraXQtanVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50Omhvcml6b250YWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstd2Via2l0LWZsZXgtZGlyZWN0aW9uOnJvdzstbXMtZmxleC1kaXJlY3Rpb246cm93O2ZsZXgtZGlyZWN0aW9uOnJvdzstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47bWFyZ2luOjA7cGFkZGluZzowO2hlaWdodDowO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93Pi50aWxle3dpZHRoOjA7bWFyZ2luOjA7cGFkZGluZzowO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93Pi50aWxlOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0OjAgIWltcG9ydGFudDt9LmNpcmN1aXRib2FyZCAudGlsZW1hcD4udGlsZXJvdzpsYXN0LWNoaWxke21hcmdpbi1ib3R0b206MCAhaW1wb3J0YW50O31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC1jb3JlLmpzIn0=