(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird")) : factory(root["jQuery"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, defer) {
	  'use strict';
	  var _modelPrototype = {
	    getChildIds: function() {
	      return this.sub.map((function(sub) {
	        return sub.entity._id;
	      }));
	    },
	    getModels: function(ids) {
	      return getFmaModels(ids);
	    },
	    get id() {
	      return this._id;
	    }
	  };
	  var _getDeferred = ((function() {
	    var _deferredCache = {};
	    return (function(id) {
	      if (!_deferredCache[id]) {
	        _deferredCache[id] = defer();
	      }
	      return _deferredCache[id];
	    });
	  }))();
	  function getFmaModels(ids) {
	    var newIds = [];
	    ids.forEach((function(id) {
	      if (!_getDeferred(id).alreadyRequested) {
	        _getDeferred(id).alreadyRequested = true;
	        newIds.push(id);
	      }
	    }));
	    P.resolve($.ajax({
	      url: ("http://www.apinatomy.org:8766/resources/entities/" + newIds.join(',')),
	      dataType: 'jsonp'
	    })).each((function(modelObj) {
	      for (var i = modelObj.sub.length - 1; i >= 0; i -= 1) {
	        if (modelObj.sub[i].entity === null) {
	          modelObj.sub.splice(i);
	        }
	      }
	      var newModel = Object.create(_modelPrototype);
	      $.extend(newModel, modelObj);
	      _getDeferred(newModel._id).resolve(newModel);
	    }));
	    return ids.map((function(id) {
	      return _getDeferred(id).promise;
	    }));
	  }
	  return getFmaModels;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  return function defer() {
	    var resolve,
	        reject;
	    var promise = new P(function() {
	      resolve = arguments[0];
	      reject = arguments[1];
	    });
	    return {
	      resolve: resolve,
	      reject: reject,
	      promise: promise
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4OTFjNjI5YTU3NTM1NTY4ZjFiNCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9mbWEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvZGVmZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBWSx3QkFBaUIsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsTUFBSTtBQUNyRSxjQUFXLENBQUM7QUFrQlIscUJBQWMsRUFBSTtBQUNyQixlQUFVLENBQVYsVUFBWTtBQUFLLFlBQU8sS0FBRyxJQUFJLElBQUssRUFBQyxTQUFDLEdBQUU7Y0FBTSxJQUFFLE9BQU8sSUFBSTtPQUFBLEVBQUM7S0FBRTtBQUM5RCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLGFBQVksQ0FBQyxHQUFFLENBQUM7S0FBRTtBQUMxQyxPQUFJLEdBQUMsRUFBSTtBQUFFLFlBQU8sS0FBRyxJQUFJO0tBQUU7QUFBQSxHQUM1QixDQUFDO0FBTUcsa0JBQVcsRUFBSSxHQUFDLFNBQUM7QUFDaEIsc0JBQWEsRUFBSSxHQUFDLENBQUM7QUFDdkIsWUFBTyxTQUFDLEVBQUMsQ0FBTTtBQUNkLFVBQUksQ0FBQyxjQUFhLENBQUUsRUFBQyxDQUFDLENBQUc7QUFBRSxzQkFBYSxDQUFFLEVBQUMsQ0FBQyxFQUFJLE1BQUssRUFBQztPQUFFO0FBQ3hELFlBQU8sZUFBYSxDQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQzFCLEVBQUM7R0FDRixFQUFFLEVBQUMsQ0FBQztBQUlKLFVBQVMsYUFBVyxDQUFFLEdBQUU7QUFHbkIsY0FBSyxFQUFJLEdBQUMsQ0FBQztBQUNmLE9BQUUsUUFBUyxFQUFDLFNBQUMsRUFBQyxDQUFNO0FBQ25CLFVBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDLGlCQUFpQixDQUFHO0FBQ3ZDLG9CQUFZLENBQUMsRUFBQyxDQUFDLGlCQUFpQixFQUFJLEtBQUcsQ0FBQztBQUN4QyxjQUFLLEtBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztPQUNoQjtBQUFBLEtBQ0QsRUFBQyxDQUFDO0FBR0YsYUFBUyxDQUFDLE1BQU0sQ0FBQztBQUNoQixTQUFFLEdBQUcsbURBQW1ELEVBQUMsT0FBSyxLQUFNLENBQUMsR0FBRSxDQUFDLENBQUU7QUFDMUUsY0FBTyxDQUFHLFFBQU07QUFBQSxLQUNqQixDQUFDLENBQUMsS0FBTSxFQUFDLFNBQUMsUUFBTyxDQUFNO0FBSXRCLFdBQVMsT0FBSSxTQUFPLElBQUksT0FBTyxFQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRztBQUNyRCxZQUFJLFFBQU8sSUFBSSxDQUFFLEVBQUMsT0FBTyxJQUFNLEtBQUcsQ0FBRztBQUNwQyxrQkFBTyxJQUFJLE9BQVEsQ0FBQyxFQUFDLENBQUM7U0FDdkI7QUFBQSxPQUNEO0FBR0ksa0JBQU8sRUFBSSxPQUFLLE9BQVEsQ0FBQyxlQUFjLENBQUMsQ0FBQztBQUc3QyxjQUFRLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBRzVCLGtCQUFZLENBQUMsUUFBTyxJQUFJLENBQUMsUUFBUyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0tBRTdDLEVBQUMsQ0FBQztBQUdGLFVBQU8sSUFBRSxJQUFLLEVBQUMsU0FBQyxFQUFDO1lBQU0sYUFBWSxDQUFDLEVBQUMsQ0FBQyxRQUFRO0tBQUEsRUFBQyxDQUFDO0dBRWpEO0FBRUEsUUFBTyxhQUFXLENBQUM7QUFFcEIsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDbkZBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O2lFQ0FBLGlDQUFRLHVCQUFVLENBQUcsMENBQVUsRUFBRztBQUNqQyxjQUFXLENBQUM7QUFFWixRQUFPLFNBQVMsTUFBSSxDQUFFLENBQUU7QUFDbkIsZUFBTTtBQUFHLGNBQUssQ0FBQztBQUNmLGVBQU0sRUFBSSxJQUFJLEVBQUMsQ0FBQyxTQUFTLENBQUU7QUFDOUIsYUFBTSxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7QUFDdEIsWUFBSyxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0FBRUYsVUFBTztBQUNOLGFBQU0sQ0FBRyxRQUFNO0FBQ2YsWUFBSyxDQUFHLE9BQUs7QUFDYixhQUFNLENBQUcsUUFBTTtBQUFBLEtBQ2hCLENBQUM7R0FDRixDQUFDO0FBRUYsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODkxYzYyOWE1NzUzNTU2OGYxYjRcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi91dGlsL2RlZmVyLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvLyBUaGlzIG1vZHVsZSBpbXBsZW1lbnRzIGFuIGludGVyZmFjZSB0byB0aGUgRk1BIGRhdGFiYXNlIG9uIHRoZSBvbGQgcHJvdG90eXBlXG5cdC8vIHNlcnZlciwgaW1wbGVtZW50aW5nIHRoZSBpbnRlcmZhY2UgZXhwZWN0ZWQgYnkgQXBpTkFUT01ZLiBJdCBjcmVhdGVzIGEgbGlua2VkXG5cdC8vIG9iamVjdCBzdHJ1Y3R1cmUgdGhhdCBwcmVzZXJ2ZXMgdGhlIG9yaWdpbmFsIERBRyBzdHJ1Y3R1cmUuIEl0IGRvZXMgc28gYnlcblx0Ly8gbWFpbnRhaW5pbmcgYSBjYWNoZSB0aGF0IG1hcHMgZWFjaCBpZCB0byBpdHMgY29ycmVzcG9uZGluZyBvYmplY3QuXG5cdC8vXG5cdC8vIFRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIG1vZHVsZSBhc3N1bWVzIHRoYXQgdGhlIGRhdGFiYXNlIHJldHVybnMgbW9kZWxzXG5cdC8vIHdpdGggdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XG5cdC8vXG5cdC8vIE1vZGVsVHlwZSA9IHtcblx0Ly8gICAgIF9pZDogc3RyaW5nXG5cdC8vICAgICBzdWI6IFt7ICBlbnRpdHk6IHsgX2lkOiBzdHJpbmcgfSAgfV1cblx0Ly8gfVxuXG5cblx0LyogdGhlIHByb3RvdHlwZSBmb3IgbW9kZWwgb2JqZWN0cywgaW1wbGVtZW50aW5nIHRoZSBleHBlY3RlZCBpbnRlcmZhY2UgKi9cblx0dmFyIF9tb2RlbFByb3RvdHlwZSA9IHtcblx0XHRnZXRDaGlsZElkcygpICB7IHJldHVybiB0aGlzLnN1Yi5tYXAoKHN1YikgPT4gc3ViLmVudGl0eS5faWQpIH0sXG5cdFx0Z2V0TW9kZWxzKGlkcykgeyByZXR1cm4gZ2V0Rm1hTW9kZWxzKGlkcykgfSxcblx0XHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZCB9XG5cdH07XG5cdC8vIG1vZGVscyBhcmUgc3VwcG9zZWQgdG8gaGF2ZSBhICduYW1lJyBwcm9wZXJ0eSwgYnV0IHRoYXQgZmllbGRcblx0Ly8gaXMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBtb2RlbCBvYmplY3RzIHJldHJpZXZlZCBmcm9tIHRoZSBkYXRhYmFzZVxuXG5cblx0Lyogc3RvcmluZyBhbmQgcmV0cmlldmluZyAnZGVmZXJyZWRzJyB0byBtb2RlbHMgKi9cblx0dmFyIF9nZXREZWZlcnJlZCA9ICgoKSA9PiB7XG5cdFx0dmFyIF9kZWZlcnJlZENhY2hlID0ge307XG5cdFx0cmV0dXJuIChpZCkgPT4ge1xuXHRcdFx0aWYgKCFfZGVmZXJyZWRDYWNoZVtpZF0pIHsgX2RlZmVycmVkQ2FjaGVbaWRdID0gZGVmZXIoKSB9XG5cdFx0XHRyZXR1cm4gX2RlZmVycmVkQ2FjaGVbaWRdO1xuXHRcdH07XG5cdH0pKCk7XG5cblxuXHQvKiB0byByZXRyaWV2ZSBhbiBhcnJheSBvZiBwcm9taXNlcyB0byBtb2RlbHMsIGdpdmVuIGFuIGFycmF5IG9mIGlkcyAqL1xuXHRmdW5jdGlvbiBnZXRGbWFNb2RlbHMoaWRzKSB7XG5cblx0XHQvKiBnYXRoZXIgdGhlIGlkcyB0aGF0IHdlIGhhdmUgbm90IHJlcXVlc3RlZCBmcm9tIHRoZSBzZXJ2ZXIgYmVmb3JlICovXG5cdFx0dmFyIG5ld0lkcyA9IFtdO1xuXHRcdGlkcy5mb3JFYWNoKChpZCkgPT4ge1xuXHRcdFx0aWYgKCFfZ2V0RGVmZXJyZWQoaWQpLmFscmVhZHlSZXF1ZXN0ZWQpIHtcblx0XHRcdFx0X2dldERlZmVycmVkKGlkKS5hbHJlYWR5UmVxdWVzdGVkID0gdHJ1ZTtcblx0XHRcdFx0bmV3SWRzLnB1c2goaWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyogcmVxdWVzdCBhbmQgYnVpbGQgdGhlIG1vZGVsIG9iamVjdHMgYmVsb25naW5nIHRvIHRob3NlIGlkcyAqL1xuXHRcdFAucmVzb2x2ZSgkLmFqYXgoe1xuXHRcdFx0dXJsOiBgaHR0cDovL3d3dy5hcGluYXRvbXkub3JnOjg3NjYvcmVzb3VyY2VzL2VudGl0aWVzLyR7bmV3SWRzLmpvaW4oJywnKX1gLFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29ucCdcblx0XHR9KSkuZWFjaCgobW9kZWxPYmopID0+IHtcblxuXHRcdFx0LyogIHJlbW92ZSByZWZlcmVuY2VzIHRvIGNoaWxkcmVuIHRoYXQgYXJlIG5vdCBhY3R1YWxseSAgICovXG5cdFx0XHQvKiAgaW4gdGhlIGRhdGFiYXNlICh0aGUgRk1BIGRhdGFiYXNlIGlzIG1lc3N5IHRoYXQgd2F5KSAgKi9cblx0XHRcdGZvciAodmFyIGkgPSBtb2RlbE9iai5zdWIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcblx0XHRcdFx0aWYgKG1vZGVsT2JqLnN1YltpXS5lbnRpdHkgPT09IG51bGwpIHtcblx0XHRcdFx0XHRtb2RlbE9iai5zdWIuc3BsaWNlKGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IG1vZGVsIG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdG90eXBlICovXG5cdFx0XHR2YXIgbmV3TW9kZWwgPSBPYmplY3QuY3JlYXRlKF9tb2RlbFByb3RvdHlwZSk7XG5cblx0XHRcdC8qIGFzc2lnbiB0aGUgcmV0cmlldmVkIG1vZGVsIHZhbHVlcyB0byB0aGUgbmV3IG1vZGVsIG9iamVjdCAqL1xuXHRcdFx0JC5leHRlbmQobmV3TW9kZWwsIG1vZGVsT2JqKTtcblxuXHRcdFx0LyogcmVzb2x2ZSB0aGUgY29ycmVzcG9uZGluZyBwcm9taXNlICovXG5cdFx0XHRfZ2V0RGVmZXJyZWQobmV3TW9kZWwuX2lkKS5yZXNvbHZlKG5ld01vZGVsKTtcblxuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJuIGFuIGFycmF5IG9mIHByb21pc2VzIHRvIGFsbCByZXF1ZXN0ZWQgaWRzICovXG5cdFx0cmV0dXJuIGlkcy5tYXAoKGlkKSA9PiBfZ2V0RGVmZXJyZWQoaWQpLnByb21pc2UpO1xuXG5cdH1cblxuXHRyZXR1cm4gZ2V0Rm1hTW9kZWxzO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvZm1hLW1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9kZWZlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImZtYS1tb2RlbC5qcyJ9