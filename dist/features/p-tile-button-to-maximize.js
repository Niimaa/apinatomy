(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__) {
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40);


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
		'use strict';
	
		var plugin = $.circuitboard.plugin['do']('tile-button-to-maximize', {
			requires: ['tile-buttons', 'tile-grow-when-maximized', 'tile-shrink-when-hidden']
		}).modify('Tile.prototype');
	
		plugin.append('construct', function () {
			var _this = this;
	
			this.addButton({ name: 'maximize', icon: {
					white: __webpack_require__(102),
					black: __webpack_require__(103)
				} }).onValue(function () {
				_this.hidden = false;
				_this.p('fullyVisible').value(true).onValue(function () {
					_this.maximized = !_this.maximized;
				});
			});
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ccf5e814b6f61f570aa333f4c3524a14.png"

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d69722fe3fc25cacfaece79a7bb90f02.png"

/***/ }

/******/ })
});
;
//# sourceMappingURL=p-tile-button-to-maximize.js.map