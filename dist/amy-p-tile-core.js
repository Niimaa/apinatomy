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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, uniqueID) {
	  'use strict';
	  $.circuitboard.plugin({
	    name: 'tile-core',
	    if: true,
	    'modify tile': {
	      'add _p_tileCore_tilemap': null,
	      'add populateInnerTilemap': function populateInnerTilemap() {
	        var $__0 = this;
	        if (!this._p_tileCore_tilemap) {
	          this._p_tileCore_tilemap = this.dom.tilemap({
	            model: this.options.model,
	            parent: this
	          }).tilemap('instance').then((function(tilemap) {
	            $__0.one('destroy', (function() {
	              tilemap.destroy();
	            }));
	          }));
	        }
	      },
	      'insert constructor': function() {
	        var $__0 = this;
	        $.each(['click', 'mouseover', 'mouseout'], (function(index, signal) {
	          $__0.element.on(signal, (function(event) {
	            event.stopPropagation();
	            $__0.trigger(signal, event);
	          }));
	        }));
	        $.each(['mouseenter', 'mouseleave'], (function(index, signal) {
	          $__0.element.on(signal, (function(event) {
	            $__0.trigger(signal, event);
	          }));
	        }));
	        var _domContent = this.element;
	        Object.defineProperty(this, 'dom', {
	          get: function() {
	            return _domContent;
	          },
	          set: function(newDOM) {
	            _domContent = newDOM;
	          }
	        });
	        this.id = uniqueID('tile');
	        this.element.attr('id', this.id);
	        this.circuitboard._registerTile(this);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  $.fn.extend({amyNestedFlexGrow: function(grow) {
	      this.css('flexGrow', grow);
	      this.data('amyFlexGrowTarget', grow);
	      var growSum = 0;
	      this.parent().children().each(function() {
	        growSum += parseFloat($(this).data('amyFlexGrowTarget'));
	      });
	      this.parent().css('flexGrow', growSum);
	      return this;
	    }});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkY2Q5OGUwMjkyYmJmYTc0NWM5ZCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10aWxlLWNvcmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uLi9hbXktdXRpbC91bmlxdWUtaWQuanMiLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL25lc3RlZC1mbGV4LWdyb3cuanMiLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUNDLHVCQUNBLHdCQUNBLHdCQUNBLHdCQUNELENBQUcsMENBQVUsRUFBRyxTQUFPO0FBQ3RCLGNBQVcsQ0FBQztBQUVaLGdCQUFhLE9BQVEsQ0FBQztBQUNyQixRQUFHLENBQUcsWUFBVTtBQUNoQixNQUFDLENBQUcsS0FBRztBQUNQLGlCQUFZLENBQUc7QUFFZCwrQkFBd0IsQ0FBRyxLQUFHO0FBRTlCLGdDQUF5QixDQUFHLFNBQVMscUJBQW1CLENBQUU7O0FBQ3pELFlBQUksQ0FBQyxJQUFHLG9CQUFv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aUNBQVEsdUJBQVEsQ0FBRywwQ0FBVSxFQUFHO0FBQy9CLGNBQVcsQ0FBQztBQU9aLE1BQUksQ0FBQyxjQUFhLENBQUc7QUFDcEIsa0JBQWEsRUFBSTtBQUNoQixzQkFBZSxDQUFHLEdBQUM7QUFDbkIsWUFBSyxDQUFHLFVBQVUsU0FBUSxDQUFHO0FBQzVCLHNCQUFhLGlCQUFpQixLQUFNLENBQUMsU0FBUSxDQUFDLENBQUM7T0FDaEQ7QUFBQSxLQUNELENBQUM7R0FDRjtBQUVELEVBQUMsK0lBQUM7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkY2Q5OGUwMjkyYmJmYTc0NWM5ZFxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnLi9hbXktdXRpbC91bmlxdWUtaWQuanMnLFxuXHQnLi9hbXktdXRpbC9uZXN0ZWQtZmxleC1ncm93LmpzJyxcblx0Jy4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIHVuaXF1ZUlEKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aWxlLWNvcmUnLFxuXHRcdGlmOiB0cnVlLFxuXHRcdCdtb2RpZnkgdGlsZSc6IHtcblxuXHRcdFx0J2FkZCBfcF90aWxlQ29yZV90aWxlbWFwJzogbnVsbCxcblxuXHRcdFx0J2FkZCBwb3B1bGF0ZUlubmVyVGlsZW1hcCc6IGZ1bmN0aW9uIHBvcHVsYXRlSW5uZXJUaWxlbWFwKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuX3BfdGlsZUNvcmVfdGlsZW1hcCkge1xuXHRcdFx0XHRcdHRoaXMuX3BfdGlsZUNvcmVfdGlsZW1hcCA9IHRoaXMuZG9tLnRpbGVtYXAoe1xuXHRcdFx0XHRcdFx0bW9kZWw6IHRoaXMub3B0aW9ucy5tb2RlbCxcblx0XHRcdFx0XHRcdHBhcmVudDogdGhpc1xuXHRcdFx0XHRcdH0pLnRpbGVtYXAoJ2luc3RhbmNlJykudGhlbigodGlsZW1hcCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vbmUoJ2Rlc3Ryb3knLCAoKT0+IHsgdGlsZW1hcC5kZXN0cm95KCkgfSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdCdpbnNlcnQgY29uc3RydWN0b3InOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHN1cHBvcnQgY2VydGFpbiBET00tZXZlbnQgc3Vic2NyaXB0aW9ucyBmcm9tIHRoZSB0aWxlIG9iamVjdCBpdHNlbGZcblx0XHRcdFx0Ly9cblx0XHRcdFx0JC5lYWNoKFsnY2xpY2snLCAnbW91c2VvdmVyJywgJ21vdXNlb3V0J10sIChpbmRleCwgc2lnbmFsKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50Lm9uKHNpZ25hbCwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihzaWduYWwsIGV2ZW50KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCQuZWFjaChbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddLCAoaW5kZXgsIHNpZ25hbCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZWxlbWVudC5vbihzaWduYWwsIChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKHNpZ25hbCwgZXZlbnQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBwdWJsaWMgYWNjZXNzIHRvIHRoZSBIVE1MIGVsZW1lbnRcblx0XHRcdFx0Ly9cblx0XHRcdFx0dmFyIF9kb21Db250ZW50ID0gdGhpcy5lbGVtZW50O1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RvbScsIHtcblx0XHRcdFx0XHRnZXQoKSB7IHJldHVybiBfZG9tQ29udGVudCB9LFxuXHRcdFx0XHRcdHNldChuZXdET00pIHsgX2RvbUNvbnRlbnQgPSBuZXdET00gfVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBhbiBlbGVtZW50IGlkIGZvciBxdWljayBsb29rdXBzXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMuaWQgPSB1bmlxdWVJRCgndGlsZScpO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignaWQnLCB0aGlzLmlkKTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBpbmZvcm0gY2lyY3VpdGJvYXJkIG9mIG5ldyB0aWxlXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLl9yZWdpc3RlclRpbGUodGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2FteS1wLXRpbGUtY29yZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdCQuZm4uZXh0ZW5kKHtcblx0XHQvL1xuXHRcdC8vIHNldHMgdGhlIGNzcyBwcm9wZXJ0eSAnZmxleC1ncm93JyBvbiB0aGUgY3VycmVudCBlbGVtZW50IGFuZFxuXHRcdC8vIGNvcnJlc3BvbmRpbmdseSBpbmNyZWFzZXMvZGVjcmVhc2VzIHRoYXQgb2YgaXRzIGRpcmVjdCBwYXJlbnRcblx0XHQvL1xuXHRcdGFteU5lc3RlZEZsZXhHcm93KGdyb3cpIHtcblx0XHRcdHRoaXMuY3NzKCdmbGV4R3JvdycsIGdyb3cpO1xuXHRcdFx0dGhpcy5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcsIGdyb3cpO1xuXHRcdFx0dmFyIGdyb3dTdW0gPSAwO1xuXHRcdFx0dGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRncm93U3VtICs9IHBhcnNlRmxvYXQoJCh0aGlzKS5kYXRhKCdhbXlGbGV4R3Jvd1RhcmdldCcpKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5wYXJlbnQoKS5jc3MoJ2ZsZXhHcm93JywgZ3Jvd1N1bSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9uZXN0ZWQtZmxleC1ncm93LmpzXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyB0aGlzIGNhbiBiZSBsb2FkZWQgYmVmb3JlIGEgcGx1Z2luIGZpbGUgdG8gZWxlZ2FudGx5IGhhbmRsZVxuXHQvLyB0aGUgc2l0dWF0aW9uIHdoZXJlIHRoZSBjaXJjdWl0Ym9hcmQgbW9kdWxlIGlzIG5vdCB5ZXQgbG9hZGVkXG5cdC8vIHRvIHJlY2VpdmUgaXRcblx0Ly9cblx0aWYgKCEkLmNpcmN1aXRib2FyZCkge1xuXHRcdCQuY2lyY3VpdGJvYXJkID0ge1xuXHRcdFx0cHJlbWF0dXJlUGx1Z2luczogW10sXG5cdFx0XHRwbHVnaW46IGZ1bmN0aW9uIChuZXdQbHVnaW4pIHtcblx0XHRcdFx0JC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucy5wdXNoKG5ld1BsdWdpbik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFteS1wLXRpbGUtY29yZS5qcyJ9