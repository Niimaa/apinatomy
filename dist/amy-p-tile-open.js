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
	    name: 'tile-open',
	    after: ['tile-core'],
	    'modify tile': {
	      'add _p_tileOpen_open': false,
	      'insert constructor': function() {
	        var $__0 = this;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwZDE4YWY0MjFkMTFiODlhYzZmMCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10aWxlLW9wZW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBd0MsQ0FBRywwQ0FBVTtBQUN0RSxjQUFXLENBQUM7QUFFWixnQkFBYSxPQUFRLENBQUM7QUFDckIsUUFBRyxDQUFHLFlBQVU7QUFDaEIsU0FBSSxDQUFHLEVBQUMsV0FBVSxDQUFDO0FBRW5CLGlCQUFZLENBQUc7QUFFZCw0QkFBcUIsQ0FBRyxNQUFJO0FBRTVCLDBCQUFtQixDQUFHLFVBQVU7O0FBSS9CLGNBQUssZUFBZ0IsQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFHO0FBQ25DLGFBQUUsQ0FBRixVQUFJLENBQUU7QUFBRSxrQkFBTyxLQUFHLGlCQUFpQjtXQUFFO0FBQ3JDLGFBQUUsQ0FBRixVQUFJLFlBQVcsQ0FBRztBQUNqQix3QkFBVyxFQUFJLEVBQUMsQ0FBQyxZQUFXLENBQUM7QUFDN0IsZ0JBQUksSUFBRyxpQkFBaUIsSUFBTSxhQUFXLENBQUc7QUFDM0Msa0JBQUcsaUJBQWlCLEVBQUksYUFBVyxDQUFDO0FBQ3BDLGtCQUFHLFFBQVMsQ0FBQyxNQUFLLENBQUcsS0FBRyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzVDO0FBQUEsV0FDRDtBQUFBLFNBQ0QsQ0FBQyxDQUFDO0FBS0YsWUFBRyxHQUFJLENBQUMsTUFBSyxHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQ3pCLGNBQUksSUFBRyxDQUFHO0FBQ1QscUNBQXlCLEVBQUMsQ0FBQztXQUM1QjtBQUFBLFNBQ0QsRUFBQyxDQUFDO0FBS0YsWUFBRyxHQUFJLENBQUMsTUFBSyxHQUFHLFNBQUMsSUFBRyxDQUFJO0FBQUUsc0JBQVcsWUFBYSxDQUFDLE1BQUssQ0FBRyxLQUFHLENBQUM7U0FBRSxFQUFDLENBQUM7QUFLbkUsWUFBRyxHQUFJLENBQUMsTUFBSyxHQUFHLFNBQUMsSUFBRztBQUNuQixjQUFJLENBQUMsSUFBRyxDQUFHO0FBQ1YseUNBQTZCLENBQUMsTUFBSyxDQUFDLFFBQzNCLEVBQUMsU0FBQyxJQUFHLENBQU07QUFBRSxrQkFBRyxLQUFLLEVBQUksTUFBSTthQUFFLEVBQUMsQ0FBQztXQUMzQztBQUFBLFNBQ0QsRUFBQyxDQUFDO0FBS0YsWUFBRyxRQUFTLENBQUMsTUFBSyxDQUFHLEtBQUcsaUJBQWlCLENBQUMsQ0FBQztPQUM1QztBQUFBLEtBQ0Q7QUFBQSxHQUNELENBQUMsQ0FBQztBQUNILEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztBQzFEQSxnRDs7Ozs7O2lFQ0FBLGlDQUFRLHVCQUFRLENBQUcsMENBQVUsRUFBRztBQUMvQixjQUFXLENBQUM7QUFPWixNQUFJLENBQUMsY0FBYSxDQUFHO0FBQ3BCLGtCQUFhLEVBQUk7QUFDaEIsc0JBQWUsQ0FBRyxHQUFDO0FBQ25CLFlBQUssQ0FBRyxVQUFVLFNBQVEsQ0FBRztBQUM1QixzQkFBYSxpQkFBaUIsS0FBTSxDQUFDLFNBQVEsQ0FBQyxDQUFDO09BQ2hEO0FBQUEsS0FDRCxDQUFDO0dBQ0Y7QUFFRCxFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGQxOGFmNDIxZDExYjg5YWM2ZjBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanMnXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtb3BlbicsXG5cdFx0YWZ0ZXI6IFsndGlsZS1jb3JlJ10sXG5cblx0XHQnbW9kaWZ5IHRpbGUnOiB7XG5cblx0XHRcdCdhZGQgX3BfdGlsZU9wZW5fb3Blbic6IGZhbHNlLFxuXG5cdFx0XHQnaW5zZXJ0IGNvbnN0cnVjdG9yJzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyB0aGUgJ29wZW4nIHByb3BlcnR5XG5cdFx0XHRcdC8vXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnb3BlbicsIHtcblx0XHRcdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl9wX3RpbGVPcGVuX29wZW4gfSxcblx0XHRcdFx0XHRzZXQoc2hvdWxkQmVPcGVuKSB7XG5cdFx0XHRcdFx0XHRzaG91bGRCZU9wZW4gPSAhIXNob3VsZEJlT3Blbjtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9wX3RpbGVPcGVuX29wZW4gIT09IHNob3VsZEJlT3Blbikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9wX3RpbGVPcGVuX29wZW4gPSBzaG91bGRCZU9wZW47XG5cdFx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcignb3BlbicsIHRoaXMuX3BfdGlsZU9wZW5fb3Blbik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyB3aGVuIHRoZSB0aWxlIG9wZW5zLCBwb3B1bGF0ZSB0aGUgaW5uZXIgdGlsZW1hcFxuXHRcdFx0XHQvL1xuXHRcdFx0XHR0aGlzLm9uKCdvcGVuJywgKG9wZW4pID0+IHtcblx0XHRcdFx0XHRpZiAob3Blbikge1xuXHRcdFx0XHRcdFx0dGhpcy5wb3B1bGF0ZUlubmVyVGlsZW1hcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gYXV0b21hdGljYWxseSAodW4pc2V0IHRoZSBDU1MgY2xhc3MgJ29wZW4nXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMub24oJ29wZW4nLCAob3Blbik9PnsgdGhpcy5lbGVtZW50LnRvZ2dsZUNsYXNzKFwib3BlblwiLCBvcGVuKSB9KTtcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBpZiB5b3UgY2xvc2UsIGFsbCB5b3VyIGNoaWxkcmVuIGNsb3NlXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMub24oJ29wZW4nLCAob3BlbikgPT4ge1xuXHRcdFx0XHRcdGlmICghb3Blbikge1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUoJ3RpbGUnKVxuXHRcdFx0XHRcdFx0XHQuZm9yRWFjaCgodGlsZSkgPT4geyB0aWxlLm9wZW4gPSBmYWxzZSB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGluaXRpYWwgJ29wZW4nIHNpZ25hbFxuXHRcdFx0XHQvL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ29wZW4nLCB0aGlzLl9wX3RpbGVPcGVuX29wZW4pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvYW15LXAtdGlsZS1vcGVuLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyB0aGlzIGNhbiBiZSBsb2FkZWQgYmVmb3JlIGEgcGx1Z2luIGZpbGUgdG8gZWxlZ2FudGx5IGhhbmRsZVxuXHQvLyB0aGUgc2l0dWF0aW9uIHdoZXJlIHRoZSBjaXJjdWl0Ym9hcmQgbW9kdWxlIGlzIG5vdCB5ZXQgbG9hZGVkXG5cdC8vIHRvIHJlY2VpdmUgaXRcblx0Ly9cblx0aWYgKCEkLmNpcmN1aXRib2FyZCkge1xuXHRcdCQuY2lyY3VpdGJvYXJkID0ge1xuXHRcdFx0cHJlbWF0dXJlUGx1Z2luczogW10sXG5cdFx0XHRwbHVnaW46IGZ1bmN0aW9uIChuZXdQbHVnaW4pIHtcblx0XHRcdFx0JC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucy5wdXNoKG5ld1BsdWdpbik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFteS1wLXRpbGUtb3Blbi5qcyJ9