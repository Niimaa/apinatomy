(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	module.exports = __webpack_require__(70);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
		'use strict';
	
		var plugin = $.circuitboard.plugin['do']('tile-button-to-swap-three-d-model', {
			requires: ['tile-buttons', 'three-d-geometric-models']
		});
	
		plugin.update('Tile.prototype.loadThreeDModels', function (old) {
			return function () {
				var _this = this;
	
				old.call(this).then(function () {
	
					/* an array containing null, and each 3D model artefact */
					var models = [null].concat(_this.children.filter(function (child) {
						return child.type === 'ThreeDModel';
					}));
	
					if (models.length > 1) {
						_this.addButton({ name: 'swap3dModel', icon: {
								white: __webpack_require__(71),
								black: __webpack_require__(72)
							} }).onValue(function () {
	
							// the button switches between the available 3D models on the top level of the tile
	
							var i = undefined;
							for (i = 1; i < models.length; ++i) {
								if (models[i].visible) {
									models[i].visible = false;
									break;
								}
							}
							i = (i + 1) % models.length;
							if (models[i]) {
								models[i].traverseArtefactsByType('ThreeDModel', function (model) {
									model.visible = true;
								});
							}
						});
					}
				});
			};
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c485da7e639b4d2d69b187420fc2bf78.png"

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2504fe46b9bfc8deef6a0d6354801b29.png"

/***/ }

/******/ })
});
;
//# sourceMappingURL=p-tile-button-to-swap-three-d-model.js.map