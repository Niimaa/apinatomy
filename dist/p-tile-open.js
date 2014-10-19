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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    id: 'tile-open',
	    requires: ['tile-core']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this._p_tileOpen_open = false;
	    Object.defineProperty(this, 'open', {
	      get: function() {
	        return this._p_tileOpen_open;
	      },
	      set: function(shouldBeOpen) {
	        shouldBeOpen = !!shouldBeOpen;
	        if (this._p_tileOpen_open !== shouldBeOpen) {
	          this._p_tileOpen_open = shouldBeOpen;
	          this.trigger('open', this._p_tileOpen_open);
	        }
	      }
	    });
	    this.on('open', (function(open) {
	      if (open) {
	        $__0.populateInnerTilemap();
	      }
	    }));
	    this.on('open', (function(open) {
	      $__0.element.toggleClass("open", open);
	    }));
	    this.on('open', (function(open) {
	      if (!open) {
	        $__0.closestDescendantsByType('tile').forEach((function(tile) {
	          tile.open = false;
	        }));
	      }
	    }));
	    this.trigger('open', this._p_tileOpen_open);
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjY2I3YWI1OTY0YWM4MDRjYTgzNCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtb3Blbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBUSxDQUFHLDBDQUFVO0FBQzVCLGNBQVcsQ0FBQztBQUVSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxNQUFDLENBQUcsWUFBVTtBQUNkLFlBQU8sQ0FBRyxFQUFDLFdBQVUsQ0FBQztBQUFBLEdBQ3ZCLENBQUMsT0FBUSxDQUFDLGdCQUFlLENBQUMsQ0FBQztBQUszQixRQUFLLE9BQVEsQ0FBQyxXQUFVLENBQUcsVUFBVTs7QUFDcEMsUUFBRyxpQkFBaUIsRUFBSSxNQUFJLENBQUM7QUFHN0IsVUFBSyxlQUFnQixDQUFDLElBQUcsQ0FBRyxPQUFLLENBQUc7QUFDbkMsU0FBRSxDQUFGLFVBQUksQ0FBRTtBQUFFLGNBQU8sS0FBRyxpQkFBaUI7T0FBRTtBQUNyQyxTQUFFLENBQUYsVUFBSSxZQUFXLENBQUc7QUFDakIsb0JBQVcsRUFBSSxFQUFDLENBQUMsWUFBVyxDQUFDO0FBQzdCLFlBQUksSUFBRyxpQkFBaUIsSUFBTSxhQUFXLENBQUc7QUFDM0MsY0FBRyxpQkFBaUIsRUFBSSxhQUFXLENBQUM7QUFDcEMsY0FBRyxRQUFTLENBQUMsTUFBSyxDQUFHLEtBQUcsaUJBQWlCLENBQUMsQ0FBQztTQUM1QztBQUFBLE9BQ0Q7QUFBQSxLQUNELENBQUMsQ0FBQztBQUdGLFFBQUcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLElBQUcsQ0FBTTtBQUN6QixVQUFJLElBQUcsQ0FBRztBQUNULGlDQUF5QixFQUFDLENBQUM7T0FDNUI7QUFBQSxLQUNELEVBQUMsQ0FBQztBQUdGLFFBQUcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLElBQUcsQ0FBSztBQUFFLGtCQUFXLFlBQWEsQ0FBQyxNQUFLLENBQUcsS0FBRyxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBR3BFLFFBQUcsR0FBSSxDQUFDLE1BQUssR0FBRyxTQUFDLElBQUc7QUFDbkIsVUFBSSxDQUFDLElBQUcsQ0FBRztBQUNWLHFDQUE2QixDQUFDLE1BQUssQ0FBQyxRQUMxQixFQUFDLFNBQUMsSUFBRyxDQUFNO0FBQUUsY0FBRyxLQUFLLEVBQUksTUFBSTtTQUFFLEVBQUMsQ0FBQztPQUM1QztBQUFBLEtBQ0QsRUFBQyxDQUFDO0FBR0YsUUFBRyxRQUFTLENBQUMsTUFBSyxDQUFHLEtBQUcsaUJBQWlCLENBQUMsQ0FBQztHQUM1QyxDQUFDLENBQUM7QUFDSCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUNoREEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgY2NiN2FiNTk2NGFjODA0Y2E4MzRcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdGlkOiAndGlsZS1vcGVuJyxcblx0XHRyZXF1aXJlczogWyd0aWxlLWNvcmUnXVxuXHR9KS5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJyk7XG5cblx0Ly9cblx0Ly8gYWxsb3cgYSB0aWxlIHRvIGJlIGBvcGVuYCAob3IgY2xvc2VkKVxuXHQvL1xuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF90aWxlT3Blbl9vcGVuID0gZmFsc2U7XG5cblx0XHQvLyB0aGUgJ29wZW4nIHByb3BlcnR5XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdvcGVuJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fcF90aWxlT3Blbl9vcGVuIH0sXG5cdFx0XHRzZXQoc2hvdWxkQmVPcGVuKSB7XG5cdFx0XHRcdHNob3VsZEJlT3BlbiA9ICEhc2hvdWxkQmVPcGVuO1xuXHRcdFx0XHRpZiAodGhpcy5fcF90aWxlT3Blbl9vcGVuICE9PSBzaG91bGRCZU9wZW4pIHtcblx0XHRcdFx0XHR0aGlzLl9wX3RpbGVPcGVuX29wZW4gPSBzaG91bGRCZU9wZW47XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdvcGVuJywgdGhpcy5fcF90aWxlT3Blbl9vcGVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gd2hlbiB0aGUgdGlsZSBvcGVucywgcG9wdWxhdGUgdGhlIGlubmVyIHRpbGVtYXBcblx0XHR0aGlzLm9uKCdvcGVuJywgKG9wZW4pID0+IHtcblx0XHRcdGlmIChvcGVuKSB7XG5cdFx0XHRcdHRoaXMucG9wdWxhdGVJbm5lclRpbGVtYXAoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIGF1dG9tYXRpY2FsbHkgKHVuKXNldCB0aGUgQ1NTIGNsYXNzICdvcGVuJ1xuXHRcdHRoaXMub24oJ29wZW4nLCAob3Blbik9PiB7IHRoaXMuZWxlbWVudC50b2dnbGVDbGFzcyhcIm9wZW5cIiwgb3BlbikgfSk7XG5cblx0XHQvLyBpZiB5b3UgY2xvc2UsIGFsbCB5b3VyIGNoaWxkcmVuIGNsb3NlXG5cdFx0dGhpcy5vbignb3BlbicsIChvcGVuKSA9PiB7XG5cdFx0XHRpZiAoIW9wZW4pIHtcblx0XHRcdFx0dGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUoJ3RpbGUnKVxuXHRcdFx0XHRcdFx0LmZvckVhY2goKHRpbGUpID0+IHsgdGlsZS5vcGVuID0gZmFsc2UgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBpbml0aWFsICdvcGVuJyBzaWduYWxcblx0XHR0aGlzLnRyaWdnZXIoJ29wZW4nLCB0aGlzLl9wX3RpbGVPcGVuX29wZW4pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRpbGUtb3Blbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1vcGVuLmpzIn0=