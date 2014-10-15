(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  $.circuitboard.plugin({
	    name: 'tile-open-active',
	    if: ['tile-open', 'tile-active'],
	    after: ['tile-open', 'tile-active'],
	    'modify tile': {'insert constructor': function() {
	        if (!this.model) {
	          return;
	        }
	        this.on('open', function(open) {
	          if (open) {
	            this.active = true;
	          }
	        });
	        this.on('active', function(active) {
	          if (!active) {
	            this.open = false;
	          }
	        });
	      }}
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  if (!$.circuitboard) {
	    $.circuitboard = {
	      prematurePlugins: [],
	      plugin: function(newPlugin) {
	        $.circuitboard.prematurePlugins.push(newPlugin);
	      }
	    };
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhMmJkYjViM2U1MjJiODE5YzE5NyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10aWxlLW9wZW4tYWN0aXZlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVUsd0JBQXdDLENBQUcsMENBQVUsRUFBRztBQUN6RSxjQUFXLENBQUM7QUFFWixnQkFBYSxPQUFRLENBQUM7QUFDckIsUUFBRyxDQUFHLG1CQUFpQjtBQUN2QixNQUFDLENBQUcsRUFBQyxXQUFVLENBQUcsY0FBWSxDQUFDO0FBQy9CLFNBQUksQ0FBRyxFQUFDLFdBQVUsQ0FBRyxjQUFZLENBQUM7QUFFbEMsaUJBQVksQ0FBRyxFQUNkLG9CQUFtQixDQUFHLFVBQVUsQ0FBRTtBQUVqQyxZQUFJLENBQUMsSUFBRyxNQUFNLENBQUc7QUFBRSxpQkFBTTtTQUFFO0FBSzNCLFlBQUcsR0FBSSxDQUFDLE1BQUssQ0FBRyxVQUFVLElBQUcsQ0FBRztBQUMvQixjQUFJLElBQUcsQ0FBRztBQUFFLGdCQUFHLE9BQU8sRUFBSSxLQUFHO1dBQUU7QUFBQSxTQUNoQyxDQUFDLENBQUM7QUFLRixZQUFHLEdBQUksQ0FBQyxRQUFPLENBQUcsVUFBVSxNQUFLLENBQUc7QUFDbkMsY0FBSSxDQUFDLE1BQUssQ0FBRztBQUFFLGdCQUFHLEtBQUssRUFBSSxNQUFJO1dBQUU7QUFBQSxTQUNsQyxDQUFDLENBQUM7T0FDSCxDQUNEO0FBQUEsR0FDRCxDQUFDLENBQUM7QUFDSCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUM5QkEsZ0Q7Ozs7OztpRUNBQSxpQ0FBUSx1QkFBUSxDQUFHLDBDQUFVLEVBQUc7QUFDL0IsY0FBVyxDQUFDO0FBT1osTUFBSSxDQUFDLGNBQWEsQ0FBRztBQUNwQixrQkFBYSxFQUFJO0FBQ2hCLHNCQUFlLENBQUcsR0FBQztBQUNuQixZQUFLLENBQUcsVUFBVSxTQUFRLENBQUc7QUFDNUIsc0JBQWEsaUJBQWlCLEtBQU0sQ0FBQyxTQUFRLENBQUMsQ0FBQztPQUNoRDtBQUFBLEtBQ0QsQ0FBQztHQUNGO0FBRUQsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGEyYmRiNWIzZTUyMmI4MTljMTk3XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzJ10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aWxlLW9wZW4tYWN0aXZlJyxcblx0XHRpZjogWyd0aWxlLW9wZW4nLCAndGlsZS1hY3RpdmUnXSxcblx0XHRhZnRlcjogWyd0aWxlLW9wZW4nLCAndGlsZS1hY3RpdmUnXSxcblxuXHRcdCdtb2RpZnkgdGlsZSc6IHtcblx0XHRcdCdpbnNlcnQgY29uc3RydWN0b3InOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIG9ubHkgaW50ZXJlc3RpbmcgaWYgdGhlIHRpbGUgaGFzIGEgbW9kZWxcblx0XHRcdFx0aWYgKCF0aGlzLm1vZGVsKSB7IHJldHVybjsgfVxuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHdoZW4gYSB0aWxlIGlzIG9wZW5lZCwgaXQgYmVjb21lcyBhY3RpdmVcblx0XHRcdFx0Ly9cblx0XHRcdFx0dGhpcy5vbignb3BlbicsIGZ1bmN0aW9uIChvcGVuKSB7XG5cdFx0XHRcdFx0aWYgKG9wZW4pIHsgdGhpcy5hY3RpdmUgPSB0cnVlIH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gd2hlbiBhIHRpbGUgaXMgZGUtYWN0aXZhdGVkLCBpdCBiZWNvbWVzIGNsb3NlZFxuXHRcdFx0XHQvL1xuXHRcdFx0XHR0aGlzLm9uKCdhY3RpdmUnLCBmdW5jdGlvbiAoYWN0aXZlKSB7XG5cdFx0XHRcdFx0aWYgKCFhY3RpdmUpIHsgdGhpcy5vcGVuID0gZmFsc2UgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2FteS1wLXRpbGUtb3Blbi1hY3RpdmUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIHRoaXMgY2FuIGJlIGxvYWRlZCBiZWZvcmUgYSBwbHVnaW4gZmlsZSB0byBlbGVnYW50bHkgaGFuZGxlXG5cdC8vIHRoZSBzaXR1YXRpb24gd2hlcmUgdGhlIGNpcmN1aXRib2FyZCBtb2R1bGUgaXMgbm90IHlldCBsb2FkZWRcblx0Ly8gdG8gcmVjZWl2ZSBpdFxuXHQvL1xuXHRpZiAoISQuY2lyY3VpdGJvYXJkKSB7XG5cdFx0JC5jaXJjdWl0Ym9hcmQgPSB7XG5cdFx0XHRwcmVtYXR1cmVQbHVnaW5zOiBbXSxcblx0XHRcdHBsdWdpbjogZnVuY3Rpb24gKG5ld1BsdWdpbikge1xuXHRcdFx0XHQkLmNpcmN1aXRib2FyZC5wcmVtYXR1cmVQbHVnaW5zLnB1c2gobmV3UGx1Z2luKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiYW15LXAtdGlsZS1vcGVuLWFjdGl2ZS5qcyJ9