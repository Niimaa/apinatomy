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
	    name: 'transition-position-tracking',
	    if: ['position-tracking', 'tile-grow-when-open'],
	    after: ['position-tracking', 'tile-grow-when-open'],
	    'modify tile': {'insert constructor': function() {
	        var $__0 = this;
	        this.on('weight', (function() {
	          var insideTransition = true;
	          $__0.element.on('transitionend webkitTransitionEnd', (function() {
	            insideTransition = false;
	          }));
	          var resetPositioning = (function() {
	            $__0.resetPositioning();
	            if (insideTransition) {
	              requestAnimationFrame(resetPositioning);
	            }
	          });
	          resetPositioning();
	        }));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NDBhNGViMGNjMGJjY2NlY2ZmMiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10cmFuc2l0aW9uLXBvc2l0aW9uLXRyYWNraW5nLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQ0MsdUJBQ0Esd0JBQ0QsQ0FBRywwQ0FBVTtBQUNaLGNBQVcsQ0FBQztBQU1aLGdCQUFhLE9BQVEsQ0FBQztBQUNyQixRQUFHLENBQUcsK0JBQTZCO0FBQ25DLE1BQUMsQ0FBRyxFQUFDLG1CQUFrQixDQUFHLHNCQUFvQixDQUFDO0FBQy9DLFNBQUksQ0FBRyxFQUFDLG1CQUFrQixDQUFHLHNCQUFvQixDQUFDO0FBRWxELGlCQUFZLENBQUcsRUFDZCxvQkFBbUIsQ0FBRyxVQUFVOztBQUUvQixZQUFHLEdBQUksQ0FBQyxRQUFPLEdBQUcsU0FBQztBQUNkLDhCQUFlLEVBQUksS0FBRyxDQUFDO0FBQzNCLHNCQUFXLEdBQUksQ0FBQyxtQ0FBa0MsR0FDakQsU0FBQyxDQUFLO0FBQUUsNEJBQWUsRUFBSSxNQUFJO1dBQUUsRUFBQyxDQUFDO0FBQ2hDLDhCQUFlLElBQUksU0FBQyxDQUFLO0FBQzVCLGlDQUFxQixFQUFDLENBQUM7QUFDdkIsZ0JBQUksZ0JBQWUsQ0FBRztBQUFFLG1DQUFxQixDQUFDLGdCQUFlLENBQUM7YUFBRTtBQUFBLFdBQ2pFLEVBQUM7QUFDRCwwQkFBZ0IsRUFBQyxDQUFDO1NBQ25CLEVBQUMsQ0FBQztPQUVILENBQ0Q7QUFBQSxHQUNELENBQUMsQ0FBQztBQUVILEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztBQ2xDQSxnRDs7Ozs7O2lFQ0FBLGlDQUFRLHVCQUFRLENBQUcsMENBQVUsRUFBRztBQUMvQixjQUFXLENBQUM7QUFPWixNQUFJLENBQUMsY0FBYSxDQUFHO0FBQ3BCLGtCQUFhLEVBQUk7QUFDaEIsc0JBQWUsQ0FBRyxHQUFDO0FBQ25CLFlBQUssQ0FBRyxVQUFVLFNBQVEsQ0FBRztBQUM1QixzQkFBYSxpQkFBaUIsS0FBTSxDQUFDLFNBQVEsQ0FBQyxDQUFDO09BQ2hEO0FBQUEsS0FDRCxDQUFDO0dBQ0Y7QUFFRCxFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTQwYTRlYjBjYzBiY2NjZWNmZjJcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0Jy4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzJ1xuXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIHRoaXMgcGx1Z2luIG1ha2VzIHN1cmUgdGhhdCBwb3NpdGlvbmluZyBpcyB1cGRhdGVkIGR1cmluZ1xuXHQvLyBDU1MzIHRyYW5zaXRpb24gYW5pbWF0aW9uc1xuXHQvL1xuXHQkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0cmFuc2l0aW9uLXBvc2l0aW9uLXRyYWNraW5nJyxcblx0XHRpZjogWydwb3NpdGlvbi10cmFja2luZycsICd0aWxlLWdyb3ctd2hlbi1vcGVuJ10sXG5cdFx0YWZ0ZXI6IFsncG9zaXRpb24tdHJhY2tpbmcnLCAndGlsZS1ncm93LXdoZW4tb3BlbiddLFxuXG5cdFx0J21vZGlmeSB0aWxlJzoge1xuXHRcdFx0J2luc2VydCBjb25zdHJ1Y3Rvcic6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHR0aGlzLm9uKCd3ZWlnaHQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGluc2lkZVRyYW5zaXRpb24gPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZWxlbWVudC5vbigndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kJyxcblx0XHRcdFx0XHRcdCgpID0+IHsgaW5zaWRlVHJhbnNpdGlvbiA9IGZhbHNlIH0pO1xuXHRcdFx0XHRcdHZhciByZXNldFBvc2l0aW9uaW5nID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5yZXNldFBvc2l0aW9uaW5nKCk7XG5cdFx0XHRcdFx0XHRpZiAoaW5zaWRlVHJhbnNpdGlvbikgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzZXRQb3NpdGlvbmluZykgfVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmVzZXRQb3NpdGlvbmluZygpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9hbXktcC10cmFuc2l0aW9uLXBvc2l0aW9uLXRyYWNraW5nLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyB0aGlzIGNhbiBiZSBsb2FkZWQgYmVmb3JlIGEgcGx1Z2luIGZpbGUgdG8gZWxlZ2FudGx5IGhhbmRsZVxuXHQvLyB0aGUgc2l0dWF0aW9uIHdoZXJlIHRoZSBjaXJjdWl0Ym9hcmQgbW9kdWxlIGlzIG5vdCB5ZXQgbG9hZGVkXG5cdC8vIHRvIHJlY2VpdmUgaXRcblx0Ly9cblx0aWYgKCEkLmNpcmN1aXRib2FyZCkge1xuXHRcdCQuY2lyY3VpdGJvYXJkID0ge1xuXHRcdFx0cHJlbWF0dXJlUGx1Z2luczogW10sXG5cdFx0XHRwbHVnaW46IGZ1bmN0aW9uIChuZXdQbHVnaW4pIHtcblx0XHRcdFx0JC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucy5wdXNoKG5ld1BsdWdpbik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFteS1wLXRyYW5zaXRpb24tcG9zaXRpb24tdHJhY2tpbmcuanMifQ==