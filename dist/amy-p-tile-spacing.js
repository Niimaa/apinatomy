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
	    name: 'tile-spacing',
	    after: ['tilemap-core'],
	    'modify tilemap': {
	      'add refreshTileSpacing': function() {
	        this.element.css('margin', this.circuitboard.options.tilemapMargin);
	        this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
	        this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
	      },
	      'after refreshTiles': function() {
	        this.refreshTileSpacing();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxOGRmMmI2MWZhYzJkN2VlMWJkZCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10aWxlLXNwYWNpbmcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBd0MsQ0FBRywwQ0FBVSxFQUFHO0FBQ3pFLGNBQVcsQ0FBQztBQUVaLGdCQUFhLE9BQVEsQ0FBQztBQUNyQixRQUFHLENBQUcsZUFBYTtBQUNuQixTQUFJLENBQUcsRUFBQyxjQUFhLENBQUM7QUFFdEIsb0JBQWUsQ0FBRztBQUlqQiw4QkFBdUIsQ0FBRyxVQUFVLENBQUU7QUFDckMsWUFBRyxRQUFRLElBQUssQ0FBQyxRQUFPLENBQUcsS0FBRyxhQUFhLFFBQVEsY0FBYyxDQUFDLENBQUM7QUFDbkUsWUFBRyxRQUFRLFNBQVUsRUFBQyxJQUFLLENBQUMsZUFBYyxDQUFHLEtBQUcsYUFBYSxRQUFRLFlBQVksQ0FBQyxDQUFDO0FBQ25GLFlBQUcsUUFBUSxTQUFVLEVBQUMsU0FBVSxFQUFDLElBQUssQ0FBQyxjQUFhLENBQUcsS0FBRyxhQUFhLFFBQVEsWUFBWSxDQUFDLENBQUM7T0FDOUY7QUFLQSwwQkFBbUIsQ0FBRyxVQUFVLENBQUU7QUFDakMsWUFBRyxtQkFBb0IsRUFBQyxDQUFDO09BQzFCO0FBQUEsS0FDRDtBQUFBLEdBQ0QsQ0FBQyxDQUFDO0FBQ0gsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDMUJBLGdEOzs7Ozs7aUVDQUEsaUNBQVEsdUJBQVEsQ0FBRywwQ0FBVSxFQUFHO0FBQy9CLGNBQVcsQ0FBQztBQU9aLE1BQUksQ0FBQyxjQUFhLENBQUc7QUFDcEIsa0JBQWEsRUFBSTtBQUNoQixzQkFBZSxDQUFHLEdBQUM7QUFDbkIsWUFBSyxDQUFHLFVBQVUsU0FBUSxDQUFHO0FBQzVCLHNCQUFhLGlCQUFpQixLQUFNLENBQUMsU0FBUSxDQUFDLENBQUM7T0FDaEQ7QUFBQSxLQUNELENBQUM7R0FDRjtBQUVELEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxOGRmMmI2MWZhYzJkN2VlMWJkZFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qcyddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1zcGFjaW5nJyxcblx0XHRhZnRlcjogWyd0aWxlbWFwLWNvcmUnXSxcblxuXHRcdCdtb2RpZnkgdGlsZW1hcCc6IHtcblx0XHRcdC8vXG5cdFx0XHQvLyByZXNldCB0aGUgdGlsZS1zcGFjaW5nIGluIHRoZSBET01cblx0XHRcdC8vXG5cdFx0XHQnYWRkIHJlZnJlc2hUaWxlU3BhY2luZyc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNzcygnbWFyZ2luJywgdGhpcy5jaXJjdWl0Ym9hcmQub3B0aW9ucy50aWxlbWFwTWFyZ2luKTtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNoaWxkcmVuKCkuY3NzKCdtYXJnaW4tYm90dG9tJywgdGhpcy5jaXJjdWl0Ym9hcmQub3B0aW9ucy50aWxlU3BhY2luZyk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jaGlsZHJlbigpLmNoaWxkcmVuKCkuY3NzKCdtYXJnaW4tcmlnaHQnLCB0aGlzLmNpcmN1aXRib2FyZC5vcHRpb25zLnRpbGVTcGFjaW5nKTtcblx0XHRcdH0sXG5cblx0XHRcdC8vXG5cdFx0XHQvLyByZWZyZXNoIHRpbGUtc3BhY2luZyBhZnRlciB0aWxlcyBhcmUgcmVmcmVzaGVkXG5cdFx0XHQvL1xuXHRcdFx0J2FmdGVyIHJlZnJlc2hUaWxlcyc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhpcy5yZWZyZXNoVGlsZVNwYWNpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2FteS1wLXRpbGUtc3BhY2luZy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGhpcyBjYW4gYmUgbG9hZGVkIGJlZm9yZSBhIHBsdWdpbiBmaWxlIHRvIGVsZWdhbnRseSBoYW5kbGVcblx0Ly8gdGhlIHNpdHVhdGlvbiB3aGVyZSB0aGUgY2lyY3VpdGJvYXJkIG1vZHVsZSBpcyBub3QgeWV0IGxvYWRlZFxuXHQvLyB0byByZWNlaXZlIGl0XG5cdC8vXG5cdGlmICghJC5jaXJjdWl0Ym9hcmQpIHtcblx0XHQkLmNpcmN1aXRib2FyZCA9IHtcblx0XHRcdHByZW1hdHVyZVBsdWdpbnM6IFtdLFxuXHRcdFx0cGx1Z2luOiBmdW5jdGlvbiAobmV3UGx1Z2luKSB7XG5cdFx0XHRcdCQuY2lyY3VpdGJvYXJkLnByZW1hdHVyZVBsdWdpbnMucHVzaChuZXdQbHVnaW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhbXktcC10aWxlLXNwYWNpbmcuanMifQ==