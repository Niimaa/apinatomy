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
	    requires: ['core']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this.newObservable('open', {
	      initial: false,
	      validation: (function(v) {
	        return !!v;
	      })
	    });
	    this.observe('open', (function(open) {
	      if (open) {
	        $__0.populateInnerTilemap();
	      }
	    }));
	    this.observe('open', (function(open) {
	      $__0.element.toggleClass("open", open);
	    }));
	    this.observe('open', (function(open) {
	      if (!open) {
	        $__0.closestDescendantsByType('tile').forEach((function(tile) {
	          tile.open = false;
	        }));
	      }
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3N2E0YjA0NmQxOGFmZThlNDU1OCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtb3Blbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBUSxDQUFHLDBDQUFVO0FBQzVCLGNBQVcsQ0FBQztBQUdSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsWUFBVTtBQUNoQixZQUFPLENBQUcsRUFBQyxNQUFLLENBQUM7QUFBQSxHQUNsQixDQUFDLE9BQVEsQ0FBQyxnQkFBZSxDQUFDLENBQUM7QUFJM0IsUUFBSyxPQUFRLENBQUMsV0FBVSxDQUFHLFVBQVU7O0FBR3BDLFFBQUcsY0FBZSxDQUFDLE1BQUssQ0FBRztBQUMxQixhQUFNLENBQUcsTUFBSTtBQUNiLGdCQUFTLEdBQUcsU0FBQztjQUFNLEVBQUMsQ0FBQztPQUFBO0tBQ3RCLENBQUMsQ0FBQztBQUdGLFFBQUcsUUFBUyxDQUFDLE1BQUssR0FBRyxTQUFDLElBQUcsQ0FBTTtBQUM5QixVQUFJLElBQUcsQ0FBRztBQUFFLGlDQUF5QixFQUFDO09BQUU7QUFBQSxLQUN6QyxFQUFDLENBQUM7QUFHRixRQUFHLFFBQVMsQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQU07QUFBRSxrQkFBVyxZQUFhLENBQUMsTUFBSyxDQUFHLEtBQUcsQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUcxRSxRQUFHLFFBQVMsQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHO0FBQ3hCLFVBQUksQ0FBQyxJQUFHLENBQUc7QUFDVixxQ0FBNkIsQ0FBQyxNQUFLLENBQUMsUUFDMUIsRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUFFLGNBQUcsS0FBSyxFQUFJLE1BQUk7U0FBRSxFQUFDLENBQUM7T0FDNUM7QUFBQSxLQUNELEVBQUMsQ0FBQztHQUVILENBQUMsQ0FBQztBQUNILEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztBQ3JDQSxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3N2E0YjA0NmQxOGFmZThlNDU1OFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1vcGVuJyxcblx0XHRyZXF1aXJlczogWydjb3JlJ11cblx0fSkubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpO1xuXG5cblx0LyogYWxsb3cgYSB0aWxlIHRvIGJlIGBvcGVuYCAob3IgY2xvc2VkKSAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiB0aGUgJ29wZW4nIG9ic2VydmFibGUgKi9cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ29wZW4nLCB7XG5cdFx0XHRpbml0aWFsOiBmYWxzZSxcblx0XHRcdHZhbGlkYXRpb246ICh2KSA9PiAhIXZcblx0XHR9KTtcblxuXHRcdC8qIHdoZW4gdGhlIHRpbGUgb3BlbnMsIHBvcHVsYXRlIHRoZSBpbm5lciB0aWxlbWFwICovXG5cdFx0dGhpcy5vYnNlcnZlKCdvcGVuJywgKG9wZW4pID0+IHtcblx0XHRcdGlmIChvcGVuKSB7IHRoaXMucG9wdWxhdGVJbm5lclRpbGVtYXAoKSB9XG5cdFx0fSk7XG5cblx0XHQvKiBtYW5hZ2UgdGhlIENTUyBjbGFzcyAnb3BlbicgKi9cblx0XHR0aGlzLm9ic2VydmUoJ29wZW4nLCAob3BlbikgPT4geyB0aGlzLmVsZW1lbnQudG9nZ2xlQ2xhc3MoXCJvcGVuXCIsIG9wZW4pIH0pO1xuXG5cdFx0LyogaWYgdGhpcyB0aWxlIGNsb3NlcywgYWxsIGl0cyBjaGlsZHJlbiBjbG9zZSAqL1xuXHRcdHRoaXMub2JzZXJ2ZSgnb3BlbicsIChvcGVuKSA9PiB7XG5cdFx0XHRpZiAoIW9wZW4pIHtcblx0XHRcdFx0dGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUoJ3RpbGUnKVxuXHRcdFx0XHRcdFx0LmZvckVhY2goKHRpbGUpID0+IHsgdGlsZS5vcGVuID0gZmFsc2UgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC10aWxlLW9wZW4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRpbGUtb3Blbi5qcyJ9