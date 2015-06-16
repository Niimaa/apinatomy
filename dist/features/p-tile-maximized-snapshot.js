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

	module.exports = __webpack_require__(49);


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
		'use strict';
	
		var plugin = $.circuitboard.plugin['do']('tile-maximized-snapshot', {
			resolves: ['tile-maximized', 'snapshot']
		});
	
		plugin.append('Snapshot.prototype.take', function () {
			var _this = this;
	
			// TODO: this should refer to tiles by artefact id, not by model id (somehow)
	
			/* remember tiles that are maximized */
			if (this.options.tilesMaximized) {
				this.object.tilesMaximized = {};
				this.circuitboard.traverseArtefactsByType('Tile', function (tile) {
					if (tile.maximized) {
						_this.object.tilesMaximized[tile.model.id] = true;
					}
				});
			}
	
			/* remember tiles that are not maximized */
			if (this.options.tilesNotMaximized) {
				this.object.tilesNotMaximized = {};
				this.circuitboard.traverseArtefactsByType('Tile', function (tile) {
					if (!tile.maximized) {
						_this.object.tilesNotMaximized[tile.model.id] = true;
					}
				});
			}
		}).append('Snapshot.prototype.restore', function () {
			var _this2 = this;
	
			/* restore tiles that are maximized */
			if (this.options.tilesMaximized) {
				Object.keys(this.object.tilesMaximized).filter(function (id) {
					return _this2.object.tilesMaximized[id];
				}).forEach(function (id) {
					_this2.circuitboard.tile(id).then(function (tile) {
						tile.maximized = true;
					});
				});
			}
	
			/* restore tiles that are not maximized */
			if (this.options.tilesNotMaximized) {
				Object.keys(this.object.tilesNotMaximized).filter(function (id) {
					return _this2.object.tilesNotMaximized[id];
				}).forEach(function (id) {
					_this2.circuitboard.tile(id).then(function (tile) {
						tile.maximized = false;
					});
				});
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ }

/******/ })
});
;
//# sourceMappingURL=p-tile-maximized-snapshot.js.map