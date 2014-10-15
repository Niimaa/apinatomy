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
	    name: 'tile-weight',
	    after: ['tile-core'],
	    'modify tile': {
	      'add _p_tileWeight_weight': 1,
	      'insert constructor': function() {
	        Object.defineProperty(this, 'weight', {
	          get: function() {
	            return this._p_tileWeight_weight;
	          },
	          set: function(newWeight) {
	            var oldWeight = this._p_tileWeight_weight;
	            this._p_tileWeight_weight = newWeight;
	            this.element.amyNestedFlexGrow(newWeight);
	            if (newWeight !== oldWeight) {
	              this.trigger('weight', newWeight);
	            }
	          }
	        });
	      }
	    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3OGU5MzdjODc3OTVhODNjNGQ5MyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10aWxlLXdlaWdodC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFVLHdCQUF3QyxDQUFHLDBDQUFVO0FBQ3RFLGNBQVcsQ0FBQztBQUVaLGdCQUFhLE9BQVEsQ0FBQztBQUNyQixRQUFHLENBQUcsY0FBWTtBQUNsQixTQUFJLENBQUcsRUFBQyxXQUFVLENBQUM7QUFFbkIsaUJBQVksQ0FBRztBQUVkLGdDQUF5QixDQUFHO0FBRTVCLDBCQUFtQixDQUFHLFVBQVU7QUFJL0IsY0FBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxTQUFPLENBQUc7QUFDckMsYUFBRSxDQUFGLFVBQUksQ0FBRTtBQUFFLGtCQUFPLEtBQUcscUJBQXFCO1dBQUU7QUFDekMsYUFBRSxDQUFGLFVBQUksU0FBUSxDQUFHO0FBRVYseUJBQVEsRUFBSSxLQUFHLHFCQUFxQixDQUFDO0FBQ3pDLGdCQUFHLHFCQUFxQixFQUFJLFVBQVEsQ0FBQztBQUNyQyxnQkFBRyxRQUFRLGtCQUFtQixDQUFDLFNBQVEsQ0FBQyxDQUFDO0FBQ3pDLGdCQUFJLFNBQVEsSUFBTSxVQUFRLENBQUc7QUFDNUIsa0JBQUcsUUFBUyxDQUFDLFFBQU8sQ0FBRyxVQUFRLENBQUMsQ0FBQzthQUNsQztBQUFBLFdBQ0Q7QUFBQSxTQUNELENBQUMsQ0FBQztPQUNIO0FBQUEsS0FDRDtBQUFBLEdBQ0QsQ0FBQyxDQUFDO0FBQ0gsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDL0JBLGdEOzs7Ozs7aUVDQUEsaUNBQVEsdUJBQVEsQ0FBRywwQ0FBVSxFQUFHO0FBQy9CLGNBQVcsQ0FBQztBQU9aLE1BQUksQ0FBQyxjQUFhLENBQUc7QUFDcEIsa0JBQWEsRUFBSTtBQUNoQixzQkFBZSxDQUFHLEdBQUM7QUFDbkIsWUFBSyxDQUFHLFVBQVUsU0FBUSxDQUFHO0FBQzVCLHNCQUFhLGlCQUFpQixLQUFNLENBQUMsU0FBUSxDQUFDLENBQUM7T0FDaEQ7QUFBQSxLQUNELENBQUM7R0FDRjtBQUVELEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3OGU5MzdjODc3OTVhODNjNGQ5M1xuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qcyddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS13ZWlnaHQnLFxuXHRcdGFmdGVyOiBbJ3RpbGUtY29yZSddLFxuXG5cdFx0J21vZGlmeSB0aWxlJzoge1xuXG5cdFx0XHQnYWRkIF9wX3RpbGVXZWlnaHRfd2VpZ2h0JzogMSxcblxuXHRcdFx0J2luc2VydCBjb25zdHJ1Y3Rvcic6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gdGhlICd3ZWlnaHQnIHByb3BlcnR5XG5cdFx0XHRcdC8vXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnd2VpZ2h0Jywge1xuXHRcdFx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3BfdGlsZVdlaWdodF93ZWlnaHQgfSxcblx0XHRcdFx0XHRzZXQobmV3V2VpZ2h0KSB7XG5cdFx0XHRcdFx0XHQvLyBUT0RPOiBhbGxvdyBJbmZpbml0eVxuXHRcdFx0XHRcdFx0dmFyIG9sZFdlaWdodCA9IHRoaXMuX3BfdGlsZVdlaWdodF93ZWlnaHQ7XG5cdFx0XHRcdFx0XHR0aGlzLl9wX3RpbGVXZWlnaHRfd2VpZ2h0ID0gbmV3V2VpZ2h0O1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmFteU5lc3RlZEZsZXhHcm93KG5ld1dlaWdodCk7XG5cdFx0XHRcdFx0XHRpZiAobmV3V2VpZ2h0ICE9PSBvbGRXZWlnaHQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCd3ZWlnaHQnLCBuZXdXZWlnaHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9hbXktcC10aWxlLXdlaWdodC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGhpcyBjYW4gYmUgbG9hZGVkIGJlZm9yZSBhIHBsdWdpbiBmaWxlIHRvIGVsZWdhbnRseSBoYW5kbGVcblx0Ly8gdGhlIHNpdHVhdGlvbiB3aGVyZSB0aGUgY2lyY3VpdGJvYXJkIG1vZHVsZSBpcyBub3QgeWV0IGxvYWRlZFxuXHQvLyB0byByZWNlaXZlIGl0XG5cdC8vXG5cdGlmICghJC5jaXJjdWl0Ym9hcmQpIHtcblx0XHQkLmNpcmN1aXRib2FyZCA9IHtcblx0XHRcdHByZW1hdHVyZVBsdWdpbnM6IFtdLFxuXHRcdFx0cGx1Z2luOiBmdW5jdGlvbiAobmV3UGx1Z2luKSB7XG5cdFx0XHRcdCQuY2lyY3VpdGJvYXJkLnByZW1hdHVyZVBsdWdpbnMucHVzaChuZXdQbHVnaW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhbXktcC10aWxlLXdlaWdodC5qcyJ9