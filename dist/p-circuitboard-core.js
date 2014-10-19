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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    id: 'circuitboard-core',
	    if: true
	  }).modify('Circuitboard.prototype');
	  plugin.add('_registerTile', function _registerTile(tile) {
	    if (!this._p_circuitboardCore_tilesByModelId[tile.model.id]) {
	      this._p_circuitboardCore_tilesByModelId[tile.model.id] = [];
	    }
	    this._p_circuitboardCore_tilesByModelId[tile.model.id].push(tile);
	    this.trigger('tilecreated', tile);
	  });
	  plugin.add('onTileCreated', function onTileCreated(tileSelector, fn) {
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
	  });
	  plugin.add('construct', function() {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-circuitboard-core.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-circuitboard-core.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	exports.push([module.id, ".circuitboard{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;padding:0;}", ""]);

/***/ },
/* 6 */
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
/* 7 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZTU2Yzk4Mjk5ZDU4ZTk0M2JlMSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLWNpcmN1aXRib2FyZC1jb3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL2NsaWNrVnNEcmFnLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY2lyY3VpdGJvYXJkLWNvcmUuc2Nzcz83YmY3Iiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY2lyY3VpdGJvYXJkLWNvcmUuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0Es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QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0EsU0FBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxpQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0REFBMkQ7QUFDM0QsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNlNTZjOTgyOTlkNThlOTQzYmUxXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3AtY2lyY3VpdGJvYXJkLWNvcmUuc2NzcycsXG5cdCcuL3V0aWwvY2xpY2tWc0RyYWcuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0aWQ6ICdjaXJjdWl0Ym9hcmQtY29yZScsXG5cdFx0aWY6IHRydWVcblx0fSkubW9kaWZ5KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlJyk7XG5cblx0cGx1Z2luLmFkZCgnX3JlZ2lzdGVyVGlsZScsIGZ1bmN0aW9uIF9yZWdpc3RlclRpbGUodGlsZSkgeyAvLyB1c2VkIGJ5IHRpbGVzXG5cdFx0aWYgKCF0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0pIHtcblx0XHRcdHRoaXMuX3BfY2lyY3VpdGJvYXJkQ29yZV90aWxlc0J5TW9kZWxJZFt0aWxlLm1vZGVsLmlkXSA9IFtdO1xuXHRcdH1cblx0XHR0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWRbdGlsZS5tb2RlbC5pZF0ucHVzaCh0aWxlKTtcblx0XHR0aGlzLnRyaWdnZXIoJ3RpbGVjcmVhdGVkJywgdGlsZSk7XG5cdH0pO1xuXG5cdHBsdWdpbi5hZGQoJ29uVGlsZUNyZWF0ZWQnLCBmdW5jdGlvbiBvblRpbGVDcmVhdGVkKHRpbGVTZWxlY3RvciwgZm4pIHtcblxuXHRcdC8vIGB0aWxlU2VsZWN0b3JgIGlzIG9wdGlvbmFsLCBpLmUuLCBhIHNpbmdsZSBhcmd1bWVudCBpcyBgZm5gXG5cdFx0aWYgKCQuaXNVbmRlZmluZWQoYXJndW1lbnRzWzFdKSkge1xuXHRcdFx0Zm4gPSBhcmd1bWVudHNbMF07XG5cdFx0XHR0aWxlU2VsZWN0b3IgPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIGJ1aWxkIHRoZSBmaWx0ZXIgYmFzZWQgb24gdGhlIHNlbGVjdG9yXG5cdFx0dmFyIGZpbHRlciA9IG51bGw7XG5cdFx0aWYgKCF0aWxlU2VsZWN0b3IpIHsgLy8gbm8gdGlsZSBzZWxlY3RvciA9IGFsbCB0aWxlc1xuXHRcdFx0ZmlsdGVyID0gKCk9PlAucmVzb2x2ZSh0cnVlKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB0aWxlU2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7IC8vIG1vZGVsLmlkXG5cdFx0XHRmaWx0ZXIgPSAodGlsZSkgPT4gKHRpbGUubW9kZWwuaWQgPT09IHRpbGVTZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0Ly8gYXBwbHkgdGhlIGNhbGxiYWNrIGZvciBleGlzdGluZyB0aWxlc1xuXHRcdCQuZWFjaCh0aGlzLl9wX2NpcmN1aXRib2FyZENvcmVfdGlsZXNCeU1vZGVsSWQsIChtb2RlbElkLCB0aWxlcykgPT4ge1xuXHRcdFx0JC5lYWNoKHRpbGVzLCAoaW5kZXgsIHRpbGUpID0+IHtcblx0XHRcdFx0aWYgKGZpbHRlcih0aWxlKSkgeyBmbih0aWxlKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIHNldCB1cCB0aGUgY2FsbGJhY2tzIGZvciBmdXR1cmUgdGlsZXNcblx0XHR0aGlzLm9uKCd0aWxlY3JlYXRlZCcsICh0aWxlKSA9PiB7XG5cdFx0XHRpZiAoZmlsdGVyKHRpbGUpKSB7IGZuKHRpbGUpIH1cblx0XHR9KTtcblxuXHR9KTtcblxuXHRwbHVnaW4uYWRkKCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF9jaXJjdWl0Ym9hcmRDb3JlX3RpbGVzQnlNb2RlbElkID0ge307XG5cblx0XHQvLyBjcmVhdGUgdGhlIHJvb3QgdGlsZW1hcFxuXHRcdCQoJzxkaXYvPicpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcblx0XHRcdFx0LmNzcygnZmxleC1ncm93JywgMSlcblx0XHRcdFx0LnRpbGVtYXAoe1xuXHRcdFx0XHRcdG1vZGVsOiB0aGlzLm9wdGlvbnMubW9kZWwsXG5cdFx0XHRcdFx0cGFyZW50OiB0aGlzXG5cdFx0XHRcdH0pLnRpbGVtYXAoJ2luc3RhbmNlJylcblx0XHRcdFx0LnRoZW4oKHRpbGVtYXApID0+IHtcblx0XHRcdFx0XHR0aGlzLm9uZSgnZGVzdHJveScsICgpPT4geyB0aWxlbWFwLmRlc3Ryb3koKSB9KTtcblx0XHRcdFx0fSk7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC1jaXJjdWl0Ym9hcmQtY29yZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG4vLyAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdCQuZm4uZXh0ZW5kKHtcblx0XHRjbGlja05vdERyb3A6IGZ1bmN0aW9uIGNsaWNrTm90RHJvcChmbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCQodGhpcykub24oJ21vdXNlZG93bicsICgvKm1vdXNlRG93bkV2ZW50Ki8pID0+IHtcblx0XHRcdFx0XHR2YXIgb25Nb3VzZU1vdmUgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHQkKHdpbmRvdykub2ZmKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHZhciBvbk1vdXNlVXAgPSAobW91c2VVcEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHQkKHdpbmRvdykub2ZmKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG5cdFx0XHRcdFx0XHRtb3VzZVVwRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRmbi5jYWxsKHRoaXMsIG1vdXNlVXBFdmVudCk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQkKHdpbmRvdykub25lKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtb3VzZURyYWdEcm9wOiBmdW5jdGlvbiBtb3VzZURyYWdEcm9wKGRyYWdGbiwgZHJvcEZuKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignbW91c2Vkb3duJywgKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG9uTW91c2VNb3ZlID0gKG1vdmVFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdtb3VzZURyYWdEcm9wLWRyYWdnaW5nJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRkcmFnRm4uY2FsbCh0aGlzLCBtb3ZlRXZlbnQpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dmFyIG9uTW91c2VVcCA9IChkcm9wRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdCQod2luZG93KS5vZmYoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcblx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ21vdXNlRHJhZ0Ryb3AtZHJhZ2dpbmcnKSkge1xuXHRcdFx0XHRcdFx0XHRkcm9wRm4uY2FsbCh0aGlzLCBkcm9wRXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0bW91c2VEb3duRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uZSgnbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuXHRcdFx0XHRcdCQod2luZG93KS5vbmUoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXHRcdFx0XHRcdCQodGhpcykuZGF0YSgnbW91c2VEcmFnRHJvcC1kcmFnZ2luZycsIGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8vIFRPRE86IHRoZXNlIGV2ZW50LWhhbmRsZXIgcmVtb3ZlcnMgY2FzdCB3YXkgdG9vIHdpZGUgYSBuZXQ7IG1ha2UgdGhlbSBtb3JlIHNwZWNpZmljXG5cdFx0b2ZmQ2xpY2tOb3REcm9wOiBmdW5jdGlvbiBvZmZDbGlja05vdERyb3AoKSB7XG5cdFx0XHRyZXR1cm4gJCh0aGlzKS5vZmYoJ21vdXNlZG93bicpO1xuXHRcdH0sXG5cdFx0b2ZmTW91c2VEcmFnRHJvcDogZnVuY3Rpb24gb2ZmTW91c2VEcmFnRHJvcCgpIHtcblx0XHRcdHJldHVybiAkKHRoaXMpLm9mZignbW91c2Vkb3duJyk7XG5cdFx0fVxuXHR9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn0pOy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2NsaWNrVnNEcmFnLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNpcmN1aXRib2FyZC1jb3JlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY2lyY3VpdGJvYXJkLWNvcmUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNpcmN1aXRib2FyZC1jb3JlLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtY2lyY3VpdGJvYXJkLWNvcmUuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1wiKSgpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmNpcmN1aXRib2FyZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LXdlYmtpdC1mbGV4O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOnN0cmV0Y2g7LXdlYmtpdC1hbGlnbi1pdGVtczpzdHJldGNoOy1tcy1mbGV4LWFsaWduOnN0cmV0Y2g7YWxpZ24taXRlbXM6c3RyZXRjaDtwYWRkaW5nOjA7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWNpcmN1aXRib2FyZC1jb3JlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLWNpcmN1aXRib2FyZC1jb3JlLmpzIn0=