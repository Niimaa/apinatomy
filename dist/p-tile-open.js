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
	    name: 'tile-open',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZTY2YmEyY2Y4YWJhZDI1ZDBkNiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtb3Blbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBUSxDQUFHLDBDQUFVO0FBQzVCLGNBQVcsQ0FBQztBQUVSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsWUFBVTtBQUNoQixZQUFPLENBQUcsRUFBQyxXQUFVLENBQUM7QUFBQSxHQUN2QixDQUFDLE9BQVEsQ0FBQyxnQkFBZSxDQUFDLENBQUM7QUFLM0IsUUFBSyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBQ3BDLFFBQUcsaUJBQWlCLEVBQUksTUFBSSxDQUFDO0FBRzdCLFVBQUssZUFBZ0IsQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFHO0FBQ25DLFNBQUUsQ0FBRixVQUFJLENBQUU7QUFBRSxjQUFPLEtBQUcsaUJBQWlCO09BQUU7QUFDckMsU0FBRSxDQUFGLFVBQUksWUFBVyxDQUFHO0FBQ2pCLG9CQUFXLEVBQUksRUFBQyxDQUFDLFlBQVcsQ0FBQztBQUM3QixZQUFJLElBQUcsaUJBQWlCLElBQU0sYUFBVyxDQUFHO0FBQzNDLGNBQUcsaUJBQWlCLEVBQUksYUFBVyxDQUFDO0FBQ3BDLGNBQUcsUUFBUyxDQUFDLE1BQUssQ0FBRyxLQUFHLGlCQUFpQixDQUFDLENBQUM7U0FDNUM7QUFBQSxPQUNEO0FBQUEsS0FDRCxDQUFDLENBQUM7QUFHRixRQUFHLEdBQUksQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDekIsVUFBSSxJQUFHLENBQUc7QUFDVCxpQ0FBeUIsRUFBQyxDQUFDO09BQzVCO0FBQUEsS0FDRCxFQUFDLENBQUM7QUFHRixRQUFHLEdBQUksQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQUs7QUFBRSxrQkFBVyxZQUFhLENBQUMsTUFBSyxDQUFHLEtBQUcsQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUdwRSxRQUFHLEdBQUksQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHO0FBQ25CLFVBQUksQ0FBQyxJQUFHLENBQUc7QUFDVixxQ0FBNkIsQ0FBQyxNQUFLLENBQUMsUUFDMUIsRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUFFLGNBQUcsS0FBSyxFQUFJLE1BQUk7U0FBRSxFQUFDLENBQUM7T0FDNUM7QUFBQSxLQUNELEVBQUMsQ0FBQztBQUdGLFFBQUcsUUFBUyxDQUFDLE1BQUssQ0FBRyxLQUFHLGlCQUFpQixDQUFDLENBQUM7R0FDNUMsQ0FBQyxDQUFDO0FBQ0gsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDaERBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDdlNjZiYTJjZjhhYmFkMjVkMGQ2XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1vcGVuJyxcblx0XHRyZXF1aXJlczogWyd0aWxlLWNvcmUnXVxuXHR9KS5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJyk7XG5cblx0Ly9cblx0Ly8gYWxsb3cgYSB0aWxlIHRvIGJlIGBvcGVuYCAob3IgY2xvc2VkKVxuXHQvL1xuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF90aWxlT3Blbl9vcGVuID0gZmFsc2U7XG5cblx0XHQvLyB0aGUgJ29wZW4nIHByb3BlcnR5XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdvcGVuJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fcF90aWxlT3Blbl9vcGVuIH0sXG5cdFx0XHRzZXQoc2hvdWxkQmVPcGVuKSB7XG5cdFx0XHRcdHNob3VsZEJlT3BlbiA9ICEhc2hvdWxkQmVPcGVuO1xuXHRcdFx0XHRpZiAodGhpcy5fcF90aWxlT3Blbl9vcGVuICE9PSBzaG91bGRCZU9wZW4pIHtcblx0XHRcdFx0XHR0aGlzLl9wX3RpbGVPcGVuX29wZW4gPSBzaG91bGRCZU9wZW47XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdvcGVuJywgdGhpcy5fcF90aWxlT3Blbl9vcGVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gd2hlbiB0aGUgdGlsZSBvcGVucywgcG9wdWxhdGUgdGhlIGlubmVyIHRpbGVtYXBcblx0XHR0aGlzLm9uKCdvcGVuJywgKG9wZW4pID0+IHtcblx0XHRcdGlmIChvcGVuKSB7XG5cdFx0XHRcdHRoaXMucG9wdWxhdGVJbm5lclRpbGVtYXAoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIGF1dG9tYXRpY2FsbHkgKHVuKXNldCB0aGUgQ1NTIGNsYXNzICdvcGVuJ1xuXHRcdHRoaXMub24oJ29wZW4nLCAob3Blbik9PiB7IHRoaXMuZWxlbWVudC50b2dnbGVDbGFzcyhcIm9wZW5cIiwgb3BlbikgfSk7XG5cblx0XHQvLyBpZiB5b3UgY2xvc2UsIGFsbCB5b3VyIGNoaWxkcmVuIGNsb3NlXG5cdFx0dGhpcy5vbignb3BlbicsIChvcGVuKSA9PiB7XG5cdFx0XHRpZiAoIW9wZW4pIHtcblx0XHRcdFx0dGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUoJ3RpbGUnKVxuXHRcdFx0XHRcdFx0LmZvckVhY2goKHRpbGUpID0+IHsgdGlsZS5vcGVuID0gZmFsc2UgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBpbml0aWFsICdvcGVuJyBzaWduYWxcblx0XHR0aGlzLnRyaWdnZXIoJ29wZW4nLCB0aGlzLl9wX3RpbGVPcGVuX29wZW4pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRpbGUtb3Blbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1vcGVuLmpzIn0=