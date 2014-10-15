/******/ (function(modules) { // webpackBootstrap
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

	__webpack_require__(1);
	var requireJs = requirejs;
	requireJs.config({
	  paths: {
	    'domReady': '../../bower_components/requirejs-domready/domReady',
	    'jquery': '../../bower_components/jquery/dist/jquery',
	    'js-graph': '../../bower_components/js-graph/dist/js-graph',
	    'bluebird': '../../bower_components/bluebird/js/browser/bluebird',
	    'chroma-js': '../../bower_components/chroma-js/chroma',
	    'd3': '../../bower_components/d3/d3',
	    'three-js': '../../bower_components/three.js/three'
	  },
	  shim: {
	    'jquery': {exports: 'jQuery'},
	    'bluebird': {init: function() {
	        this.longStackTraces();
	      }},
	    'three-js': {exports: 'THREE'}
	  }
	});
	requirejs(['../circuitboard.js'], function(circuitboard) {
	  requirejs(['jquery', '../fma-model.min.js', '../p-circuitboard-core.min.js', '../p-tilemap-core.min.js', '../p-tile-core.min.js', '../p-tile-skin.min.js', '../p-tile-spacing.min.js', '../p-tile-click-to-open.min.js', '../p-tile-weight.min.js', '../p-tile-active.min.js', '../p-tile-open.min.js', '../p-tile-grow-when-open.min.js', '../p-tile-open-active.min.js', '../p-tile-skin-grow-when-open.min.js', '../p-position-tracking.min.js', '../p-transition-position-tracking.min.js', '../p-tile-hidden.min.js', '../p-tile-maximized.min.js', '../p-tile-middleclick-to-maximize.min.js', '../p-d3.min.js', '../p-ppi.min.js', '../p-three-d.min.js', '../p-d3-three-d.min.js', 'domReady!'], function($, getFmaModels) {
	    'use strict';
	    circuitboard.plugin(['tile-skin', 'tile-click-to-open', 'tile-grow-when-open', 'tile-middleclick-to-maximize', 'tile-spacing', 'tile-active', 'ppi', 'three-d']);
	    $('#circuitboard').circuitboard({
	      model: getFmaModels(['24tile:60000000'])[0],
	      tileSpacing: 1,
	      tilemapMargin: 0,
	      weightWhenOpen: 8,
	      threeDCanvasElement: $('#three-d-canvas')
	    }).circuitboard('instance').then(function(circuitboard) {
	      console.info('circuitboard loaded');
	    });
	  });
	});
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/example/example.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/example/example.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, "html,body{position:absolute;width:100%;height:100%;margin:0;padding:0;}body{position:absolute;overflow:hidden;}#circuitboard{position:absolute;top:20px;left:20px;right:20px;bottom:20px;z-index:1;}#three-d-canvas{position:absolute;top:0;left:0;right:0;bottom:0;margin:0;padding:0;z-index:0;}.tile{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;text-align:center;overflow:hidden;border:solid 1px;}.tile>header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-weight:bold;border-width:1px;}.tile.open>header{height:26px;border-style:none none solid none;line-height:26px;font-size:20.8px;white-space:nowrap;overflow:hidden;}.tile:not(.open)>header{border-style:none;}.tile:not(.active){border-style:dotted !important;}.tile>section{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}.tile:not(.open)>section{display:none;}.tile.hidden-header>header{display:none !important;}", ""]);

/***/ },
/* 3 */
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
/* 4 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjYyOGEyMTVkNmM5YzY4MmM3ZGMiLCJ3ZWJwYWNrOi8vLy4uL2V4YW1wbGUvZXhhbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9leGFtcGxlL2V4YW1wbGUuc2Nzcz8xMjg5Iiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2V4YW1wbGUvZXhhbXBsZS5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUNuQ0Esb0JBQVEsRUFBZ0IsQ0FBQztBQU1yQixhQUFRLEVBQUksVUFBUSxDQUFDO0FBQ3pCLFNBQVEsT0FBUSxDQUFDO0FBQ2hCLE9BQUksQ0FBRztBQUNOLGNBQVMsQ0FBRyxxREFBbUQ7QUFDL0QsWUFBTyxDQUFHLDRDQUEwQztBQUNwRCxjQUFTLENBQUcsZ0RBQThDO0FBQzFELGNBQVMsQ0FBRyxzREFBb0Q7QUFDaEUsZUFBVSxDQUFHLDBDQUF3QztBQUNyRCxRQUFHLENBQUcsK0JBQTZCO0FBQ25DLGNBQVMsQ0FBRyx3Q0FBc0M7QUFBQSxHQUNuRDtBQUNBLE1BQUcsQ0FBRztBQUNMLFlBQU8sQ0FBRyxFQUFFLE9BQU0sQ0FBRyxTQUFPLENBQUU7QUFDOUIsY0FBUyxDQUFHLEVBQUUsSUFBRyxDQUFHLFVBQVUsQ0FBRTtBQUFFLFlBQUcsZ0JBQWlCLEVBQUM7T0FBRSxDQUFFO0FBQzNELGNB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Q0EsU0FBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxpQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0REFBMkQ7QUFDM0QsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY2MjhhMjE1ZDZjOWM2ODJjN2RjXG4gKiovIiwiLy9cbi8vIHRoaW5ncyB0byBiZSBsb2FkZWQgYnkgd2VicGFja1xuLy9cbnJlcXVpcmUoJy4vZXhhbXBsZS5zY3NzJyk7XG5cbi8vXG4vLyBSZXF1aXJlSlMgQ29uZmlndXJhdGlvblxuLy8gVXNpbmcgYW4gZXh0cmEgdmFyaWFibGUgdG8gc3RvcCB3ZWJwYWNrIGZyb20gbWVzc2luZyB3aXRoIGl0XG4vL1xudmFyIHJlcXVpcmVKcyA9IHJlcXVpcmVqcztcbnJlcXVpcmVKcy5jb25maWcoe1xuXHRwYXRoczoge1xuXHRcdCdkb21SZWFkeSc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL3JlcXVpcmVqcy1kb21yZWFkeS9kb21SZWFkeScsXG5cdFx0J2pxdWVyeSc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2pxdWVyeS9kaXN0L2pxdWVyeScsXG5cdFx0J2pzLWdyYXBoJzogJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvanMtZ3JhcGgvZGlzdC9qcy1ncmFwaCcsXG5cdFx0J2JsdWViaXJkJzogJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvYmx1ZWJpcmQvanMvYnJvd3Nlci9ibHVlYmlyZCcsXG5cdFx0J2Nocm9tYS1qcyc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2Nocm9tYS1qcy9jaHJvbWEnLFxuXHRcdCdkMyc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2QzL2QzJyxcblx0XHQndGhyZWUtanMnOiAnLi4vLi4vYm93ZXJfY29tcG9uZW50cy90aHJlZS5qcy90aHJlZSdcblx0fSxcblx0c2hpbToge1xuXHRcdCdqcXVlcnknOiB7IGV4cG9ydHM6ICdqUXVlcnknIH0sXG5cdFx0J2JsdWViaXJkJzogeyBpbml0OiBmdW5jdGlvbiAoKSB7IHRoaXMubG9uZ1N0YWNrVHJhY2VzKCkgfSB9LFxuXHRcdCd0aHJlZS1qcyc6IHsgZXhwb3J0czogJ1RIUkVFJyB9XG5cdH1cbn0pO1xuXG5cbi8vXG4vLyBFeGFtcGxlIGFwcGxpY2F0aW9uXG4vL1xucmVxdWlyZWpzKFsnLi4vY2lyY3VpdGJvYXJkLmpzJ10sIGZ1bmN0aW9uIChjaXJjdWl0Ym9hcmQpIHsgLy8gY2lyY3VpdGJvYXJkLmpzIGhhcyB0byBiZSBsb2FkZWQgZmlyc3Rcblx0cmVxdWlyZWpzKFtcblx0XHQnanF1ZXJ5Jyxcblx0XHQnLi4vZm1hLW1vZGVsLm1pbi5qcycsXG5cdFx0Jy4uL3AtY2lyY3VpdGJvYXJkLWNvcmUubWluLmpzJyxcblx0XHQnLi4vcC10aWxlbWFwLWNvcmUubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLWNvcmUubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLXNraW4ubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLXNwYWNpbmcubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLWNsaWNrLXRvLW9wZW4ubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLXdlaWdodC5taW4uanMnLFxuXHRcdCcuLi9wLXRpbGUtYWN0aXZlLm1pbi5qcycsXG5cdFx0Jy4uL3AtdGlsZS1vcGVuLm1pbi5qcycsXG5cdFx0Jy4uL3AtdGlsZS1ncm93LXdoZW4tb3Blbi5taW4uanMnLFxuXHRcdCcuLi9wLXRpbGUtb3Blbi1hY3RpdmUubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLXNraW4tZ3Jvdy13aGVuLW9wZW4ubWluLmpzJyxcblx0XHQnLi4vcC1wb3NpdGlvbi10cmFja2luZy5taW4uanMnLFxuXHRcdCcuLi9wLXRyYW5zaXRpb24tcG9zaXRpb24tdHJhY2tpbmcubWluLmpzJyxcblx0XHQnLi4vcC10aWxlLWhpZGRlbi5taW4uanMnLFxuXHRcdCcuLi9wLXRpbGUtbWF4aW1pemVkLm1pbi5qcycsXG5cdFx0Jy4uL3AtdGlsZS1taWRkbGVjbGljay10by1tYXhpbWl6ZS5taW4uanMnLFxuXHRcdCcuLi9wLWQzLm1pbi5qcycsXG5cdFx0Jy4uL3AtcHBpLm1pbi5qcycsXG5cdFx0Jy4uL3AtdGhyZWUtZC5taW4uanMnLFxuXHRcdCcuLi9wLWQzLXRocmVlLWQubWluLmpzJyxcblx0XHQnZG9tUmVhZHkhJ1xuXHRdLCBmdW5jdGlvbiAoJCwgZ2V0Rm1hTW9kZWxzKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0Ly9cblx0XHQvLyBTZWxlY3QgcGx1Z2lucyB0byBhY3RpdmF0ZSB0aGVtO1xuXHRcdC8vIE5vdGUgdGhhdCB0aGVzZSBtdXN0IGFscmVhZHkgYmUgKmxvYWRlZCogYXQgdGhpcyBwb2ludFxuXHRcdC8vXG5cdFx0Y2lyY3VpdGJvYXJkLnBsdWdpbihbXG5cdFx0XHQndGlsZS1za2luJyxcblx0XHRcdCd0aWxlLWNsaWNrLXRvLW9wZW4nLFxuXHRcdFx0J3RpbGUtZ3Jvdy13aGVuLW9wZW4nLFxuXHRcdFx0J3RpbGUtbWlkZGxlY2xpY2stdG8tbWF4aW1pemUnLFxuXHRcdFx0J3RpbGUtc3BhY2luZycsXG5cdFx0XHQndGlsZS1hY3RpdmUnLFxuXHRcdFx0J3BwaScsXG5cdFx0XHQndGhyZWUtZCdcblx0XHRdKTtcblxuXHRcdC8vXG5cdFx0Ly8gVXNlIHRoZSAkLmZuLmNpcmN1aXRib2FyZCBtZXRob2QgdG8gaW5zdGFudGlhdGUgdGhlIGNpcmN1aXQtYm9hcmRcblx0XHQvL1xuXHRcdCQoJyNjaXJjdWl0Ym9hcmQnKS5jaXJjdWl0Ym9hcmQoe1xuXHRcdFx0bW9kZWw6IGdldEZtYU1vZGVscyhbJzI0dGlsZTo2MDAwMDAwMCddKVswXSxcblx0XHRcdHRpbGVTcGFjaW5nOiAxLFxuXHRcdFx0dGlsZW1hcE1hcmdpbjogMCxcblx0XHRcdHdlaWdodFdoZW5PcGVuOiA4LFxuXHRcdFx0dGhyZWVEQ2FudmFzRWxlbWVudDogJCgnI3RocmVlLWQtY2FudmFzJylcblx0XHR9KS5jaXJjdWl0Ym9hcmQoJ2luc3RhbmNlJykudGhlbihmdW5jdGlvbiAoY2lyY3VpdGJvYXJkKSB7XG5cdFx0XHRjb25zb2xlLmluZm8oJ2NpcmN1aXRib2FyZCBsb2FkZWQnKTtcblxuXG5cdFx0fSk7XG5cblxuXHR9KTtcbn0pO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9leGFtcGxlL2V4YW1wbGUuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2V4YW1wbGUvZXhhbXBsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9leGFtcGxlL2V4YW1wbGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9leGFtcGxlL2V4YW1wbGUuc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvZXhhbXBsZS9leGFtcGxlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImh0bWwsYm9keXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO21hcmdpbjowO3BhZGRpbmc6MDt9Ym9keXtwb3NpdGlvbjphYnNvbHV0ZTtvdmVyZmxvdzpoaWRkZW47fSNjaXJjdWl0Ym9hcmR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjIwcHg7bGVmdDoyMHB4O3JpZ2h0OjIwcHg7Ym90dG9tOjIwcHg7ei1pbmRleDoxO30jdGhyZWUtZC1jYW52YXN7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7bWFyZ2luOjA7cGFkZGluZzowO3otaW5kZXg6MDt9LnRpbGV7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO292ZXJmbG93OmhpZGRlbjtib3JkZXI6c29saWQgMXB4O30udGlsZT5oZWFkZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LXdlYmtpdC1hbGlnbi1pdGVtczpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmNlbnRlcjstd2Via2l0LWp1c3RpZnktY29udGVudDpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXdlaWdodDpib2xkO2JvcmRlci13aWR0aDoxcHg7fS50aWxlLm9wZW4+aGVhZGVye2hlaWdodDoyNnB4O2JvcmRlci1zdHlsZTpub25lIG5vbmUgc29saWQgbm9uZTtsaW5lLWhlaWdodDoyNnB4O2ZvbnQtc2l6ZToyMC44cHg7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt9LnRpbGU6bm90KC5vcGVuKT5oZWFkZXJ7Ym9yZGVyLXN0eWxlOm5vbmU7fS50aWxlOm5vdCguYWN0aXZlKXtib3JkZXItc3R5bGU6ZG90dGVkICFpbXBvcnRhbnQ7fS50aWxlPnNlY3Rpb257LXdlYmtpdC11c2VyLXNlbGVjdDp0ZXh0Oy1tb3otdXNlci1zZWxlY3Q6dGV4dDstbXMtdXNlci1zZWxlY3Q6dGV4dDt1c2VyLXNlbGVjdDp0ZXh0O30udGlsZTpub3QoLm9wZW4pPnNlY3Rpb257ZGlzcGxheTpub25lO30udGlsZS5oaWRkZW4taGVhZGVyPmhlYWRlcntkaXNwbGF5Om5vbmUgIWltcG9ydGFudDt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2V4YW1wbGUvZXhhbXBsZS5zY3NzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZXhhbXBsZS5qcyJ9