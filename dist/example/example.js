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
	    'delta-js': '../../bower_components/delta-js/dist/delta',
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
	  requirejs(['jquery', '../fma-model.js', '../p-circuitboard-core.js', '../p-tilemap-core.js', '../p-tile-core.js', '../p-tile-skin.js', '../p-tile-spacing.js', '../p-tile-click-to-open.js', '../p-tile-weight.js', '../p-tile-active.js', '../p-tile-open.js', '../p-tile-grow-when-open.js', '../p-tile-open-active.js', '../p-tile-skin-grow-when-open.js', '../p-position-tracking.js', '../p-transition-position-tracking.js', '../p-tile-hidden.js', '../p-tile-maximized.js', '../p-tile-middleclick-to-maximize.js', '../p-d3.js', '../p-ppi.js', '../p-three-d.js', '../p-d3-three-d.js', 'domReady!'], function($, getFmaModels) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTIxNzc5MGNkMjhhOGI1MDhhNGMiLCJ3ZWJwYWNrOi8vLy4uL2V4YW1wbGUvZXhhbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9leGFtcGxlL2V4YW1wbGUuc2Nzcz8xMjg5Iiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2V4YW1wbGUvZXhhbXBsZS5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUNuQ0Esb0JBQVEsRUFBZ0IsQ0FBQztBQU1yQixhQUFRLEVBQUksVUFBUSxDQUFDO0FBQ3pCLFNBQVEsT0FBUSxDQUFDO0FBQ2hCLE9BQUksQ0FBRztBQUNOLGNBQVMsQ0FBRyxxREFBbUQ7QUFDL0QsWUFBTyxDQUFHLDRDQUEwQztBQUNwRCxjQUFTLENBQUcsZ0RBQThDO0FBQzFELGNBQVMsQ0FBRyw2Q0FBMkM7QUFDdkQsY0FBUyxDQUFHLHNEQUFvRDtBQUNoRSxlQUFVLENBQUcsMENBQXdDO0FBQ3JELFFBQUcsQ0FBRywrQkFBNkI7QUFDbkMsY0FBUyxDQUFHLHdDQUFzQztBQUFBLEdBQ25EO0FBQ0EsTUFBRyxDQUFHO0FBQ0wsWUFBTyxDQUFHLEVBQUUsT0FBTSxDQUFHLFNBQU8sQ0FBRTtBQUM5QixjQUFTLENBQUcsRUFBRSxJQUFHLENBQUcsVUFBVSxDQUFFO0FBQUUsWUFBRyxnQkFBaUIs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QkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTJEO0FBQzNELE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhMjE3NzkwY2QyOGE4YjUwOGE0Y1xuICoqLyIsIi8vXG4vLyB0aGluZ3MgdG8gYmUgbG9hZGVkIGJ5IHdlYnBhY2tcbi8vXG5yZXF1aXJlKCcuL2V4YW1wbGUuc2NzcycpO1xuXG4vL1xuLy8gUmVxdWlyZUpTIENvbmZpZ3VyYXRpb25cbi8vIFVzaW5nIGFuIGV4dHJhIHZhcmlhYmxlIHRvIHN0b3Agd2VicGFjayBmcm9tIG1lc3Npbmcgd2l0aCBpdFxuLy9cbnZhciByZXF1aXJlSnMgPSByZXF1aXJlanM7XG5yZXF1aXJlSnMuY29uZmlnKHtcblx0cGF0aHM6IHtcblx0XHQnZG9tUmVhZHknOiAnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9yZXF1aXJlanMtZG9tcmVhZHkvZG9tUmVhZHknLFxuXHRcdCdqcXVlcnknOiAnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9qcXVlcnkvZGlzdC9qcXVlcnknLFxuXHRcdCdqcy1ncmFwaCc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2pzLWdyYXBoL2Rpc3QvanMtZ3JhcGgnLFxuXHRcdCdkZWx0YS1qcyc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2RlbHRhLWpzL2Rpc3QvZGVsdGEnLFxuXHRcdCdibHVlYmlyZCc6ICcuLi8uLi9ib3dlcl9jb21wb25lbnRzL2JsdWViaXJkL2pzL2Jyb3dzZXIvYmx1ZWJpcmQnLFxuXHRcdCdjaHJvbWEtanMnOiAnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9jaHJvbWEtanMvY2hyb21hJyxcblx0XHQnZDMnOiAnLi4vLi4vYm93ZXJfY29tcG9uZW50cy9kMy9kMycsXG5cdFx0J3RocmVlLWpzJzogJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvdGhyZWUuanMvdGhyZWUnXG5cdH0sXG5cdHNoaW06IHtcblx0XHQnanF1ZXJ5JzogeyBleHBvcnRzOiAnalF1ZXJ5JyB9LFxuXHRcdCdibHVlYmlyZCc6IHsgaW5pdDogZnVuY3Rpb24gKCkgeyB0aGlzLmxvbmdTdGFja1RyYWNlcygpIH0gfSxcblx0XHQndGhyZWUtanMnOiB7IGV4cG9ydHM6ICdUSFJFRScgfVxuXHR9XG59KTtcblxuXG4vL1xuLy8gRXhhbXBsZSBhcHBsaWNhdGlvblxuLy9cbnJlcXVpcmVqcyhbJy4uL2NpcmN1aXRib2FyZC5qcyddLCBmdW5jdGlvbiAoY2lyY3VpdGJvYXJkKSB7IC8vIGNpcmN1aXRib2FyZC5qcyBoYXMgdG8gYmUgbG9hZGVkIGZpcnN0XG5cdHJlcXVpcmVqcyhbXG5cdFx0J2pxdWVyeScsXG5cdFx0Jy4uL2ZtYS1tb2RlbC5qcycsXG5cdFx0Jy4uL3AtY2lyY3VpdGJvYXJkLWNvcmUuanMnLFxuXHRcdCcuLi9wLXRpbGVtYXAtY29yZS5qcycsXG5cdFx0Jy4uL3AtdGlsZS1jb3JlLmpzJyxcblx0XHQnLi4vcC10aWxlLXNraW4uanMnLFxuXHRcdCcuLi9wLXRpbGUtc3BhY2luZy5qcycsXG5cdFx0Jy4uL3AtdGlsZS1jbGljay10by1vcGVuLmpzJyxcblx0XHQnLi4vcC10aWxlLXdlaWdodC5qcycsXG5cdFx0Jy4uL3AtdGlsZS1hY3RpdmUuanMnLFxuXHRcdCcuLi9wLXRpbGUtb3Blbi5qcycsXG5cdFx0Jy4uL3AtdGlsZS1ncm93LXdoZW4tb3Blbi5qcycsXG5cdFx0Jy4uL3AtdGlsZS1vcGVuLWFjdGl2ZS5qcycsXG5cdFx0Jy4uL3AtdGlsZS1za2luLWdyb3ctd2hlbi1vcGVuLmpzJyxcblx0XHQnLi4vcC1wb3NpdGlvbi10cmFja2luZy5qcycsXG5cdFx0Jy4uL3AtdHJhbnNpdGlvbi1wb3NpdGlvbi10cmFja2luZy5qcycsXG5cdFx0Jy4uL3AtdGlsZS1oaWRkZW4uanMnLFxuXHRcdCcuLi9wLXRpbGUtbWF4aW1pemVkLmpzJyxcblx0XHQnLi4vcC10aWxlLW1pZGRsZWNsaWNrLXRvLW1heGltaXplLmpzJyxcblx0XHQnLi4vcC1kMy5qcycsXG5cdFx0Jy4uL3AtcHBpLmpzJyxcblx0XHQnLi4vcC10aHJlZS1kLmpzJyxcblx0XHQnLi4vcC1kMy10aHJlZS1kLmpzJyxcblx0XHQnZG9tUmVhZHkhJ1xuXHRdLCBmdW5jdGlvbiAoJCwgZ2V0Rm1hTW9kZWxzKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0Ly8gU2VsZWN0IHBsdWdpbnMgdG8gYWN0aXZhdGUgdGhlbTtcblx0XHQvLyBOb3RlIHRoYXQgdGhlc2UgbXVzdCBhbHJlYWR5IGJlICpsb2FkZWQqIGF0IHRoaXMgcG9pbnRcblx0XHRjaXJjdWl0Ym9hcmQucGx1Z2luKFtcblx0XHRcdCd0aWxlLXNraW4nLFxuXHRcdFx0J3RpbGUtY2xpY2stdG8tb3BlbicsXG5cdFx0XHQndGlsZS1ncm93LXdoZW4tb3BlbicsXG5cdFx0XHQndGlsZS1taWRkbGVjbGljay10by1tYXhpbWl6ZScsXG5cdFx0XHQndGlsZS1zcGFjaW5nJyxcblx0XHRcdCd0aWxlLWFjdGl2ZScsXG5cdFx0XHQncHBpJyxcblx0XHRcdCd0aHJlZS1kJ1xuXHRcdF0pO1xuXG5cdFx0Ly8gVXNlIHRoZSAkLmZuLmNpcmN1aXRib2FyZCBtZXRob2QgdG8gaW5zdGFudGlhdGUgdGhlIGNpcmN1aXQtYm9hcmRcblx0XHQkKCcjY2lyY3VpdGJvYXJkJykuY2lyY3VpdGJvYXJkKHtcblx0XHRcdG1vZGVsOiBnZXRGbWFNb2RlbHMoWycyNHRpbGU6NjAwMDAwMDAnXSlbMF0sXG5cdFx0XHR0aWxlU3BhY2luZzogMSxcblx0XHRcdHRpbGVtYXBNYXJnaW46IDAsXG5cdFx0XHR3ZWlnaHRXaGVuT3BlbjogOCxcblx0XHRcdHRocmVlRENhbnZhc0VsZW1lbnQ6ICQoJyN0aHJlZS1kLWNhbnZhcycpXG5cdFx0fSkuY2lyY3VpdGJvYXJkKCdpbnN0YW5jZScpLnRoZW4oZnVuY3Rpb24gKGNpcmN1aXRib2FyZCkge1xuXHRcdFx0Y29uc29sZS5pbmZvKCdjaXJjdWl0Ym9hcmQgbG9hZGVkJyk7XG5cblxuXHRcdH0pO1xuXG5cblx0fSk7XG59KTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vZXhhbXBsZS9leGFtcGxlLmpzXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9leGFtcGxlL2V4YW1wbGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvZXhhbXBsZS9leGFtcGxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvZXhhbXBsZS9leGFtcGxlLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2V4YW1wbGUvZXhhbXBsZS5zY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sLGJvZHl7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTttYXJnaW46MDtwYWRkaW5nOjA7fWJvZHl7cG9zaXRpb246YWJzb2x1dGU7b3ZlcmZsb3c6aGlkZGVuO30jY2lyY3VpdGJvYXJke3Bvc2l0aW9uOmFic29sdXRlO3RvcDoyMHB4O2xlZnQ6MjBweDtyaWdodDoyMHB4O2JvdHRvbToyMHB4O3otaW5kZXg6MTt9I3RocmVlLWQtY2FudmFze3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO21hcmdpbjowO3BhZGRpbmc6MDt6LWluZGV4OjA7fS50aWxley13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOnNvbGlkIDFweDt9LnRpbGU+aGVhZGVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy13ZWJraXQtYWxpZ24taXRlbXM6Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC13ZWlnaHQ6Ym9sZDtib3JkZXItd2lkdGg6MXB4O30udGlsZS5vcGVuPmhlYWRlcntoZWlnaHQ6MjZweDtib3JkZXItc3R5bGU6bm9uZSBub25lIHNvbGlkIG5vbmU7bGluZS1oZWlnaHQ6MjZweDtmb250LXNpemU6MjAuOHB4O3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47fS50aWxlOm5vdCgub3Blbik+aGVhZGVye2JvcmRlci1zdHlsZTpub25lO30udGlsZTpub3QoLmFjdGl2ZSl7Ym9yZGVyLXN0eWxlOmRvdHRlZCAhaW1wb3J0YW50O30udGlsZT5zZWN0aW9uey13ZWJraXQtdXNlci1zZWxlY3Q6dGV4dDstbW96LXVzZXItc2VsZWN0OnRleHQ7LW1zLXVzZXItc2VsZWN0OnRleHQ7dXNlci1zZWxlY3Q6dGV4dDt9LnRpbGU6bm90KC5vcGVuKT5zZWN0aW9ue2Rpc3BsYXk6bm9uZTt9LnRpbGUuaGlkZGVuLWhlYWRlcj5oZWFkZXJ7ZGlzcGxheTpub25lICFpbXBvcnRhbnQ7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9leGFtcGxlL2V4YW1wbGUuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMpO1xyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdC8vIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYS8qLCBzb3VyY2VNYXA6IHNvdXJjZU1hcCovfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaikge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaik7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgLyomJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKi8pXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHQvLyB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0Ly8gTm8gYnJvd3NlciBzdXBwb3J0XHJcblx0Ly8gaWYoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdC8vIHRyeSB7XHJcblx0XHRcdC8vIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIgKi9cIjtcclxuXHRcdC8vIH0gY2F0Y2goZSkge31cclxuXHQvLyB9XHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxuXHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImV4YW1wbGUuanMifQ==