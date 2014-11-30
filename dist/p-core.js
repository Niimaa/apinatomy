(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("bacon"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "bacon"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("bacon")) : factory(root["jQuery"], root["P"], root["Bacon"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U) {
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
	    this.trigger('tile-created', tile);
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
	    this.on('tile-created', (function(tile) {
	      if (filter(tile)) {
	        fn(tile);
	      }
	    }));
	  }).add('construct', function() {
	    this._p_circuitboardCore_tilesByModelId = {};
	    this.newEvent('tile-created');
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, Bacon) {
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0OWY0Yjk1OGViZTcwMTc1ZGJhZSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLWNvcmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi91dGlsL25lc3RlZC1mbGV4LWdyb3cuanMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvY2xpY2tWc0RyYWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3M/NjRmYSIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFw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RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTJEO0FBQzNELE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImJhY29uXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCIsIFwiYmFjb25cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25cIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkJhY29uXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0OWY0Yjk1OGViZTcwMTc1ZGJhZVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL25lc3RlZC1mbGV4LWdyb3cuanMnLFxuXHQnLi91dGlsL2NsaWNrVnNEcmFnLmpzJyxcblx0Jy4vcC1jb3JlLnNjc3MnXG5dLCBmdW5jdGlvbiAoJCwgUCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAnY29yZScsXG5cdFx0aWY6IHRydWVcblx0fSk7XG5cblxuXHQvKiBDaXJjdWl0Ym9hcmQgKi9cblx0cGx1Z2luLm1vZGlmeSgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZScpXG5cdFx0XHQuYWRkKCdfcmVnaXN0ZXJUaWxlJywgZnVuY3Rpb24gX3JlZ2lzdGVyVGlsZSh0aWxlKSB7IC8vIHVzZWQgYnkgdGlsZXNcblx0XHRcdFx0aWYgKCF0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0pIHtcblx0XHRcdFx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0gPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0ucHVzaCh0aWxlKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCd0aWxlLWNyZWF0ZWQnLCB0aWxlKTtcblx0XHRcdH0pLmFkZCgnb25UaWxlQ3JlYXRlZCcsIGZ1bmN0aW9uIG9uVGlsZUNyZWF0ZWQodGlsZVNlbGVjdG9yLCBmbikge1xuXG5cdFx0XHRcdC8vIGB0aWxlU2VsZWN0b3JgIGlzIG9wdGlvbmFsLCBpLmUuLCBhIHNpbmdsZSBhcmd1bWVudCBpcyBgZm5gXG5cdFx0XHRcdGlmICgkLmlzVW5kZWZpbmVkKGFyZ3VtZW50c1sxXSkpIHtcblx0XHRcdFx0XHRmbiA9IGFyZ3VtZW50c1swXTtcblx0XHRcdFx0XHR0aWxlU2VsZWN0b3IgPSBudWxsO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gYnVpbGQgdGhlIGZpbHRlciBiYXNlZCBvbiB0aGUgc2VsZWN0b3Jcblx0XHRcdFx0dmFyIGZpbHRlciA9IG51bGw7XG5cdFx0XHRcdGlmICghdGlsZVNlbGVjdG9yKSB7IC8vIG5vIHRpbGUgc2VsZWN0b3IgPSBhbGwgdGlsZXNcblx0XHRcdFx0XHRmaWx0ZXIgPSAoKT0+UC5yZXNvbHZlKHRydWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB0aWxlU2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7IC8vIG1vZGVsLmlkXG5cdFx0XHRcdFx0ZmlsdGVyID0gKHRpbGUpID0+ICh0aWxlLm1vZGVsLmlkID09PSB0aWxlU2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gYXBwbHkgdGhlIGNhbGxiYWNrIGZvciBleGlzdGluZyB0aWxlc1xuXHRcdFx0XHQkLmVhY2godGhpcy5fcF9jaXJjdWl0Ym9hcmRDb3JlX3RpbGVzQnlNb2RlbElkLCAobW9kZWxJZCwgdGlsZXMpID0+IHtcblx0XHRcdFx0XHQkLmVhY2godGlsZXMsIChpbmRleCwgdGlsZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGZpbHRlcih0aWxlKSkgeyBmbih0aWxlKSB9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIHNldCB1cCB0aGUgY2FsbGJhY2tzIGZvciBmdXR1cmUgdGlsZXNcblx0XHRcdFx0dGhpcy5vbigndGlsZS1jcmVhdGVkJywgKHRpbGUpID0+IHtcblx0XHRcdFx0XHRpZiAoZmlsdGVyKHRpbGUpKSB7IGZuKHRpbGUpIH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWQgPSB7fTtcblxuXHRcdFx0XHR0aGlzLm5ld0V2ZW50KCd0aWxlLWNyZWF0ZWQnKTtcblxuXHRcdFx0XHQvLyBjcmVhdGUgdGhlIHJvb3QgdGlsZW1hcFxuXHRcdFx0XHQkKCc8ZGl2Lz4nKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXG5cdFx0XHRcdFx0XHQuY3NzKCdmbGV4LWdyb3cnLCAxKVxuXHRcdFx0XHRcdFx0LnRpbGVtYXAoe1xuXHRcdFx0XHRcdFx0XHRtb2RlbDogdGhpcy5vcHRpb25zLm1vZGVsLFxuXHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdFx0XHRcdH0pLnRpbGVtYXAoJ2luc3RhbmNlJyk7XG5cdFx0XHR9KTtcblxuXG5cdC8qIFRpbGVtYXAgKi9cblx0cGx1Z2luLm1vZGlmeSgnVGlsZW1hcC5wcm90b3R5cGUnKVxuXHRcdFx0LmFkZCgncmVmcmVzaFRpbGVzJywgZnVuY3Rpb24gcmVmcmVzaFRpbGVzKCkge1xuXG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayAqL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh0aGlzLm1vZGVsKSxcblx0XHRcdFx0XHRcdGBBbiBBcGlOQVRPTVkgdGlsZW1hcCBzaG91bGQgaGF2ZSBhIG1vZGVsLmApO1xuXG5cdFx0XHRcdC8qIHJlbmRlciB0aGUgbmV3IHRpbGVtYXAgKHRocm91Z2ggYSBwcm9taXNlIGNoYWluLCByZXR1cm5pbmcgdGhlIGZpbmFsIHByb21pc2UpICovXG5cdFx0XHRcdHJldHVybiBQLnJlc29sdmUodGhpcy5tb2RlbClcblx0XHRcdFx0XHQvKiBnZXQgdGhlIGlkJ3Mgb2YgYWxsIGNoaWxkIG1vZGVscyAqL1xuXHRcdFx0XHRcdFx0LmNhbGwoJ2dldENoaWxkSWRzJylcblx0XHRcdFx0XHQvKiBmaWx0ZXIgb3V0IHRoZSBpZHMgb2YgY2hpbGRyZW4gdGhhdCBvdWdodCBub3QgYmUgZGlzcGxheWVkICovXG5cdFx0XHRcdFx0XHQubWFwKChpZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHRoaXMuY2lyY3VpdGJvYXJkLm9wdGlvbnMuZmlsdGVyKGlkLCBVLmJpbmQoUC5yZXNvbHZlKHRoaXMubW9kZWwpLnZhbHVlKCksICdnZXRNb2RlbHMnLCBpZCkpKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oKHNob3cpID0+IHsgcmV0dXJuIHsgaWQ6IGlkLCBzaG93OiBzaG93IH0gfSk7XG5cdFx0XHRcdFx0XHR9KS5maWx0ZXIoVS5maWVsZCgnc2hvdycpKS5tYXAoVS5maWVsZCgnaWQnKSlcblx0XHRcdFx0XHQvKiBnZXQgcHJvbWlzZXMgdG8gYWxsIGNoaWxkIGVudGl0aWVzICovXG5cdFx0XHRcdFx0XHQudGhlbigoaWRzKSA9PiBQLnJlc29sdmUodGhpcy5tb2RlbCkudmFsdWUoKS5nZXRNb2RlbHMoaWRzKSlcblx0XHRcdFx0XHQvKiBjcmVhdGUgYSB0aWxlIGZvciBlYWNoIGNoaWxkIGVudGl0eSAqL1xuXHRcdFx0XHRcdFx0LnRoZW4oKGNoaWxkcmVuVG9EaXNwbGF5KSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8qIHJlbW92ZSBhbGwgb2xkIHRpbGVzICovXG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5jaGlsZHJlbigpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBtYWludGFpbiByZWZlcmVuY2VzLCBzbyB0aGV5IHdvbid0IGhhdmUgdG8gYmUgcmVjcmVhdGVkXG5cblx0XHRcdFx0XHRcdFx0LyogcmVuZGVyIGFuZCBzdG9yZSByZWZlcmVuY2VzIHRvIHRoZSBuZXcgdGlsZXMgKi9cblx0XHRcdFx0XHRcdFx0dGhpcy5fcF90aWxlbWFwQ29yZV90aWxlcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHR2YXIgcm93Q291bnQgPSBNYXRoLmZsb29yKE1hdGguc3FydChjaGlsZHJlblRvRGlzcGxheS5sZW5ndGgpKTtcblx0XHRcdFx0XHRcdFx0dmFyIGNvbENvdW50ID0gTWF0aC5jZWlsKGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCAvIHJvd0NvdW50KTtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKHJvd0NvdW50LS0pIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcm93ID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3RpbGVyb3cnKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGNvbHVtbiA9IDA7IGNvbHVtbiA8IGNvbENvdW50ICYmIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA+IDA7IGNvbHVtbiArPSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCc8ZGl2Lz4nKS50aWxlKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IGNoaWxkcmVuVG9EaXNwbGF5LnNoaWZ0KCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhcmVudDogdGhpc1xuXHRcdFx0XHRcdFx0XHRcdFx0fSkuYXBwZW5kVG8ocm93KS5hbXlOZXN0ZWRGbGV4R3JvdygxKS50aWxlKCdpbnN0YW5jZScpLnRoZW4oKHRpbGUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fcF90aWxlbWFwQ29yZV90aWxlcy5wdXNoKHRpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8qIHNpZ25hbCB0aGF0IHRoZSB0aWxlcyBoYXZlIGJlZW4gKHJlKXJlbmRlcmVkICovXG5cdFx0XHRcdFx0XHQudGhlbigoKT0+IHsgdGhpcy50cmlnZ2VyKCd0aWxlcy1yZWZyZXNoZWQnKSB9KTtcblxuXHRcdFx0fSkuYWRkKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0dGhpcy5uZXdFdmVudCgndGlsZXMtcmVmcmVzaGVkJyk7XG5cblx0XHRcdFx0dGhpcy5fcF90aWxlbWFwQ29yZV90aWxlcyA9IG51bGw7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGlsZXMnLCB7IGdldDogKCkgPT4gdGhpcy5fcF90aWxlbWFwQ29yZV90aWxlcyB9KTtcblx0XHRcdFx0dGhpcy5yZWZyZXNoVGlsZXMoKTtcblxuXHRcdFx0fSk7XG5cblxuXHQvKiBUaWxlICovXG5cdHBsdWdpbi5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJylcblx0XHRcdC5hZGQoJ3BvcHVsYXRlSW5uZXJUaWxlbWFwJywgZnVuY3Rpb24gcG9wdWxhdGVJbm5lclRpbGVtYXAoKSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLl9wX3RpbGVDb3JlX3RpbGVtYXApIHtcblx0XHRcdFx0XHR0aGlzLl9wX3RpbGVDb3JlX3RpbGVtYXAgPSB0aGlzLmRvbS50aWxlbWFwKHtcblx0XHRcdFx0XHRcdG1vZGVsOiB0aGlzLm9wdGlvbnMubW9kZWwsXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHRoaXNcblx0XHRcdFx0XHR9KS50aWxlbWFwKCdpbnN0YW5jZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pLmFkZCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHRoaXMuX3BfdGlsZUNvcmVfdGlsZW1hcCA9IG51bGw7XG5cblx0XHRcdFx0Lyogc3VwcG9ydCBjZXJ0YWluIERPTS1ldmVudCBzdWJzY3JpcHRpb25zIGZyb20gdGhlIHRpbGUgb2JqZWN0IGl0c2VsZiAqL1xuXHRcdFx0XHRbJ2NsaWNrJywgJ21vdXNlb3ZlcicsICdtb3VzZW91dCddLmZvckVhY2goKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5uZXdFdmVudChldmVudCwgeyBldmVudFN0cmVhbTogdGhpcy5lbGVtZW50LmFzRXZlbnRTdHJlYW0oZXZlbnQpLmRvQWN0aW9uKCcuc3RvcFByb3BhZ2F0aW9uJykgfSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddLmZvckVhY2goKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5uZXdFdmVudChldmVudCwgeyBldmVudFN0cmVhbTogdGhpcy5lbGVtZW50LmFzRXZlbnRTdHJlYW0oZXZlbnQpIH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5uZXdFdmVudCgnY2xpY2stbm90LWRyb3AnKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsaWNrTm90RHJvcCgoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NsaWNrLW5vdC1kcm9wJywgZXZlbnQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBhIGZpZWxkIHRvIGhvbGQgdGhlIGlubmVybW9zdCBIVE1MIGNvbnRlbnQgZWxlbWVudCBzdGlsbCBiZWxvbmdpbmcgdG8gdGhpcyB0aWxlICovXG5cdFx0XHRcdHRoaXMuZG9tID0gdGhpcy5lbGVtZW50O1xuXG5cdFx0XHRcdC8qIGFuIGVsZW1lbnQgaWQgZm9yIHF1aWNrIGpRdWVyeSBsb29rdXBzICovXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKCdpZCcsIHRoaXMuaWQpO1xuXG5cdFx0XHRcdC8qIGluZm9ybSBjaXJjdWl0Ym9hcmQgb2YgbmV3IHRpbGUgKi9cblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQuX3JlZ2lzdGVyVGlsZSh0aGlzKTtcblxuXHRcdFx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtY29yZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCcsICdiYWNvbiddLCAoUCwgQmFjb24pID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHR3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHQoKGYpID0+IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkpO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKFN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtTdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5iaW5kKHRoaXMpXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdFxuXHRcdGlzUGxhaW5PYmplY3QodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdCB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb25cblx0XHRpc0Z1bmN0aW9uKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRhbmltYXRpb25GcmFtZXMoKSB7XG5cdFx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHRcdC8qIHNlbGYtY2FsbGluZyBhbmltYXRpb24tZnJhbWUgbG9vcCAqL1xuXHRcdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgaXRlcmF0aW9uRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRzaW5rKCk7XG5cdFx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oaXRlcmF0aW9uRm4pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8qIHN0YXJ0IGl0IG5vdyAqL1xuXHRcdFx0XHRpdGVyYXRpb25GbigpO1xuXG5cdFx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdFx0c2luayhuZXcgQmFjb24uRW5kKCkpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBwb3NpdGlvbiAqL1xuXHRVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodG9wLCBsZWZ0KSB7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy5sZWZ0ID0gbGVmdDtcblx0fSk7XG5cdFUuUG9zaXRpb24uc3VidHJhY3QgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuXHR9O1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEudG9wID09PSBiLnRvcCAmJiBhLmxlZnQgPT09IGIubGVmdDtcblx0fTtcblxuXG5cdC8qIEhUTUwgZWxlbWVudCBzaXplICovXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlNpemUuZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgYS5oZWlnaHQgPT09IGIuaGVpZ2h0ICYmIGEud2lkdGggPT09IGIud2lkdGg7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gVGhpcyBmdW5jdGlvbiBwbGF5cyB3aXRoIHRoZSBgZmxleC1ncm93YCBhbmQgYGRpc3BsYXlgIHByb3BlcnRpZXNcblx0Ly8gb2YgYSBqUXVlcnkgZWxlbWVudCBpbiBzdWNoIGEgd2F5IHRoYXQgQ1NTMyB0cmFuc2l0aW9uIGFuaW1hdGlvbnNcblx0Ly8gYXJlIHByb3Blcmx5IGNhcnJpZWQgb3V0LCBhbmQgc3VjaCB0aGF0IGVsZW1lbnRzIHRoYXQgZ2V0IGFuIGVmZmVjdGl2ZVxuXHQvLyBgZmxleC1ncm93YCBvZiAwIGFyZSBhY3R1YWxseSBoaWRkZW4gZnJvbSB2aWV3LlxuXHQvL1xuXHRmdW5jdGlvbiBzZXREaXNwbGF5KGVsZW1lbnQsIG5ld0dyb3cpIHtcblxuXHRcdHZhciBvbGRHcm93ID0gZWxlbWVudC5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpO1xuXHRcdGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dUYXJnZXQnLCBuZXdHcm93KTtcblxuXHRcdGlmIChvbGRHcm93ID4gMCAmJiBuZXdHcm93ID09PSAwKSB7XG5cblx0XHRcdGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dQcmV2RGlzcGxheScsIGVsZW1lbnQuY3NzKCdkaXNwbGF5JykpO1xuXHRcdFx0ZWxlbWVudC5jc3MoJ2ZsZXhHcm93JywgMWUtNSk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0ZWxlbWVudC5vbmUoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dUYXJnZXQnKSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0ZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LCAwKTtcblxuXHRcdH0gZWxzZSBpZiAob2xkR3JvdyA9PT0gMCAmJiBuZXdHcm93ID4gMCkge1xuXG5cdFx0XHRlbGVtZW50LmNzcygnZGlzcGxheScsIGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dQcmV2RGlzcGxheScpKTtcblx0XHRcdGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dDc3NTY2hlZHVsZWQnLCB0cnVlKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRlbGVtZW50LnJlbW92ZURhdGEoJ2FteUZsZXhHcm93Q3NzU2NoZWR1bGVkJyk7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdmbGV4R3JvdycsIGVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dUYXJnZXQnKSk7XG5cdFx0XHR9LCAwKTtcblxuXHRcdH0gZWxzZSBpZiAoIWVsZW1lbnQuZGF0YSgnYW15RmxleEdyb3dDc3NTY2hlZHVsZWQnKSkge1xuXG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdmbGV4R3JvdycsIG5ld0dyb3cpO1xuXG5cdFx0fVxuXHR9XG5cblx0JC5mbi5leHRlbmQoe1xuXHRcdC8vXG5cdFx0Ly8gc2V0cyB0aGUgY3NzIHByb3BlcnR5ICdmbGV4LWdyb3cnIG9uIHRoZSBjdXJyZW50IGVsZW1lbnQgYW5kXG5cdFx0Ly8gY29ycmVzcG9uZGluZ2x5IGluY3JlYXNlcy9kZWNyZWFzZXMgdGhhdCBvZiBpdHMgZGlyZWN0IHBhcmVudFxuXHRcdC8vXG5cdFx0YW15TmVzdGVkRmxleEdyb3coZ3Jvdykge1xuXHRcdFx0c2V0RGlzcGxheSh0aGlzLCBncm93KTtcblx0XHRcdHZhciBncm93U3VtID0gMDtcblx0XHRcdHRoaXMucGFyZW50KCkuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Z3Jvd1N1bSArPSBwYXJzZUZsb2F0KCQodGhpcykuZGF0YSgnYW15RmxleEdyb3dUYXJnZXQnKSk7XG5cdFx0XHR9KTtcblx0XHRcdHNldERpc3BsYXkodGhpcy5wYXJlbnQoKSwgZ3Jvd1N1bSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL25lc3RlZC1mbGV4LWdyb3cuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG4vLyAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdCQuZm4uZXh0ZW5kKHtcblx0XHRjbGlja05vdERyb3A6IGZ1bmN0aW9uIGNsaWNrTm90RHJvcChmbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQodGhpcykub24oJ21vdXNlZG93bicsICgvKm1vdXNlRG93bkV2ZW50Ki8pID0+IHtcblx0XHRcdFx0XHR2YXIgb25Nb3VzZU1vdmUgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHQkKHdpbmRvdykub2ZmKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHZhciBvbk1vdXNlVXAgPSAobW91c2VVcEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHQkKHdpbmRvdykub2ZmKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG5cdFx0XHRcdFx0XHRtb3VzZVVwRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRmbi5jYWxsKHRoaXMsIG1vdXNlVXBFdmVudCk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQkKHdpbmRvdykub25lKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtb3VzZURyYWdEcm9wOiBmdW5jdGlvbiBtb3VzZURyYWdEcm9wKGRyYWdGbiwgZHJvcEZuKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignbW91c2Vkb3duJywgKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG9uTW91c2VNb3ZlID0gKG1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdtb3VzZURyYWdEcm9wLWRyYWdnaW5nJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRkcmFnRm4uY2FsbCh0aGlzLCBtb3ZlRXZlbnQpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dmFyIG9uTW91c2VVcCA9IChkcm9wRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vZmYoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcblx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ21vdXNlRHJhZ0Ryb3AtZHJhZ2dpbmcnKSkge1xuXHRcdFx0XHRcdFx0XHRkcm9wRm4uY2FsbCh0aGlzLCBkcm9wRXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuXHRcdFx0XHRcdCQod2luZG93KS5vbmUoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXHRcdFx0XHRcdCQodGhpcykuZGF0YSgnbW91c2VEcmFnRHJvcC1kcmFnZ2luZycsIGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8vIFRPRE86IHRoZXNlIGV2ZW50LWhhbmRsZXIgcmVtb3ZlcnMgY2FzdCB3YXkgdG9vIHdpZGUgYSBuZXQ7IG1ha2UgdGhlbSBtb3JlIHNwZWNpZmljXG5cdFx0b2ZmQ2xpY2tOb3REcm9wOiBmdW5jdGlvbiBvZmZDbGlja05vdERyb3AoKSB7XG5cdFx0XHRyZXR1cm4gJCh0aGlzKS5vZmYoJ21vdXNlZG93bicpO1xuXHRcdH0sXG5cdFx0b2ZmTW91c2VEcmFnRHJvcDogZnVuY3Rpb24gb2ZmTW91c2VEcmFnRHJvcCgpIHtcblx0XHRcdHJldHVybiAkKHRoaXMpLm9mZignbW91c2Vkb3duJyk7XG5cdFx0fVxuXHR9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn0pOy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2NsaWNrVnNEcmFnLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkJhY29uXCIsXCJjb21tb25qczJcIjpcImJhY29uXCIsXCJjb21tb25qc1wiOlwiYmFjb25cIixcImFtZFwiOlwiYmFjb25cIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY29yZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNvcmUuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jaXJjdWl0Ym9hcmR7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpzdHJldGNoOy13ZWJraXQtYWxpZ24taXRlbXM6c3RyZXRjaDstbXMtZmxleC1hbGlnbjpzdHJldGNoO2FsaWduLWl0ZW1zOnN0cmV0Y2g7cGFkZGluZzowO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwe2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47LXdlYmtpdC1ib3gtcGFjazpqdXN0aWZ5Oy13ZWJraXQtanVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47LW1zLWZsZXgtcGFjazpqdXN0aWZ5O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50Omhvcml6b250YWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstd2Via2l0LWZsZXgtZGlyZWN0aW9uOnJvdzstbXMtZmxleC1kaXJlY3Rpb246cm93O2ZsZXgtZGlyZWN0aW9uOnJvdzstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjstbXMtZmxleC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47bWFyZ2luOjA7cGFkZGluZzowO2hlaWdodDowO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93Pi50aWxle3dpZHRoOjA7bWFyZ2luOjA7cGFkZGluZzowO30uY2lyY3VpdGJvYXJkIC50aWxlbWFwPi50aWxlcm93Pi50aWxlOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0OjAgIWltcG9ydGFudDt9LmNpcmN1aXRib2FyZCAudGlsZW1hcD4udGlsZXJvdzpsYXN0LWNoaWxke21hcmdpbi1ib3R0b206MCAhaW1wb3J0YW50O31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC1jb3JlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC1jb3JlLmpzIn0=