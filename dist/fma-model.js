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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4OTFjNjI5YTU3NTM1NTY4ZjFiNCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9mbWEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvZGVmZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBWSx3QkFBaUIsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsTUFBSTtBQUNyRSxjQUFXLENBQUM7QUFrQlIscUJBQWMsRUFBSTtBQUNyQixlQUFVLENBQVYsVUFBWTtBQUFLLFlBQU8sS0FBRyxJQUFJLElBQUssRUFBQyxTQUFDLEdBQUU7Y0FBTSxJQUFFLE9BQU8sSUFBSTtPQUFBLEVBQUM7S0FBRTtBQUM5RCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLGFBQVksQ0FBQyxHQUFFLENBQUM7S0FBRTtBQUMxQyxPQUFJLEdBQUMsRUFBSTtBQUFFLFlBQU8sS0FBRyxJQUFJO0tBQUU7QUFBQSxHQUM1QixDQUFDO0FBSUcsa0JBQVcsRUFBSSxHQUFDLFNBQUM7QUFDaEIsc0JBQWEsRUFBSSxHQUFDLENBQUM7QUFDdkIsWUFBTyxTQUFDLEVBQUMsQ0FBTTtBQUNkLFVBQUksQ0FBQyxjQUFhLENBQUUsRUFBQyxDQUFDLENBQUc7QUFBRSxzQkFBYSxDQUFFLEVBQUMsQ0FBQyxFQUFJLE1BQUssRUFBQztPQUFFO0FBQ3hELFlBQU8sZUFBYSxDQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQzFCLEVBQUM7R0FDRixFQUFFLEVBQUMsQ0FBQztBQUlKLFVBQVMsYUFBVyxDQUFFLEdBQUU7QUFHbkIsY0FBSyxFQUFJLEdBQUMsQ0FBQztBQUNmLE9BQUUsUUFBUyxFQUFDLFNBQUMsRUFBQyxDQUFNO0FBQ25CLFVBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDLGlCQUFpQixDQUFHO0FBQ3ZDLG9CQUFZLENBQUMsRUFBQyxDQUFDLGlCQUFpQixFQUFJLEtBQUcsQ0FBQztBQUN4QyxjQUFLLEtBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztPQUNoQjtBQUFBLEtBQ0QsRUFBQyxDQUFDO0FBR0YsYUFBUyxDQUFDLE1BQU0sQ0FBQztBQUNoQixTQUFFLEdBQUcsbURBQW1ELEVBQUMsT0FBSyxLQUFNLENBQUMsR0FBRSxDQUFDLENBQUU7QUFDMUUsY0FBTyxDQUFHLFFBQU07QUFBQSxLQUNqQixDQUFDLENBQUMsS0FBTSxFQUFDLFNBQUMsUUFBTyxDQUFNO0FBSXRCLFdBQVMsT0FBSSxTQUFPLElBQUksT0FBTyxFQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRztBQUNyRCxZQUFJLFFBQU8sSUFBSSxDQUFFLEVBQUMsT0FBTyxJQUFNLEtBQUcsQ0FBRztBQUNwQyxrQkFBTyxJQUFJLE9BQVEsQ0FBQyxFQUFDLENBQUM7U0FDdkI7QUFBQSxPQUNEO0FBR0ksa0JBQU8sRUFBSSxPQUFLLE9BQVEsQ0FBQyxlQUFjLENBQUMsQ0FBQztBQUc3QyxjQUFRLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBRzVCLGtCQUFZLENBQUMsUUFBTyxJQUFJLENBQUMsUUFBUyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0tBRTdDLEVBQUMsQ0FBQztBQUdGLFVBQU8sSUFBRSxJQUFLLEVBQUMsU0FBQyxFQUFDO1lBQU0sYUFBWSxDQUFDLEVBQUMsQ0FBQyxRQUFRO0tBQUEsRUFBQyxDQUFDO0dBRWpEO0FBRUEsUUFBTyxhQUFXLENBQUM7QUFFcEIsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDakZBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O2lFQ0FBLGlDQUFRLHVCQUFVLENBQUcsMENBQVUsRUFBRztBQUNqQyxjQUFXLENBQUM7QUFFWixRQUFPLFNBQVMsTUFBSSxDQUFFLENBQUU7QUFDbkIsZUFBTTtBQUFHLGNBQUssQ0FBQztBQUNmLGVBQU0sRUFBSSxJQUFJLEVBQUMsQ0FBQyxTQUFTLENBQUU7QUFDOUIsYUFBTSxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7QUFDdEIsWUFBSyxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0FBRUYsVUFBTztBQUNOLGFBQU0sQ0FBRyxRQUFNO0FBQ2YsWUFBSyxDQUFHLE9BQUs7QUFDYixhQUFNLENBQUcsUUFBTTtBQUFBLEtBQ2hCLENBQUM7R0FDRixDQUFDO0FBRUYsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODkxYzYyOWE1NzUzNTU2OGYxYjRcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi91dGlsL2RlZmVyLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvLyBUaGlzIG1vZHVsZSBpbXBsZW1lbnRzIGFuIGludGVyZmFjZSB0byB0aGUgRk1BIGRhdGFiYXNlIG9uIHRoZSBvbGQgcHJvdG90eXBlXG5cdC8vIHNlcnZlciwgaW1wbGVtZW50aW5nIHRoZSBpbnRlcmZhY2UgZXhwZWN0ZWQgYnkgQXBpTkFUT01ZLiBJdCBjcmVhdGVzIGEgbGlua2VkXG5cdC8vIG9iamVjdCBzdHJ1Y3R1cmUgdGhhdCBwcmVzZXJ2ZXMgdGhlIG9yaWdpbmFsIERBRyBzdHJ1Y3R1cmUuIEl0IGRvZXMgc28gYnlcblx0Ly8gbWFpbnRhaW5pbmcgYSBjYWNoZSB0aGF0IG1hcHMgZWFjaCBpZCB0byBpdHMgY29ycmVzcG9uZGluZyBvYmplY3QuXG5cdC8vXG5cdC8vIFRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIG1vZHVsZSBhc3N1bWVzIHRoYXQgdGhlIGRhdGFiYXNlIHJldHVybnMgbW9kZWxzXG5cdC8vIHdpdGggdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmU6XG5cdC8vXG5cdC8vIE1vZGVsVHlwZSA9IHtcblx0Ly8gICAgIF9pZDogc3RyaW5nXG5cdC8vICAgICBzdWI6IFt7ICBlbnRpdHk6IHsgX2lkOiBzdHJpbmcgfSAgfV1cblx0Ly8gfVxuXG5cblx0LyogdGhlIHByb3RvdHlwZSBmb3IgbW9kZWwgb2JqZWN0cywgaW1wbGVtZW50aW5nIHRoZSBleHBlY3RlZCBpbnRlcmZhY2UgKi9cblx0dmFyIF9tb2RlbFByb3RvdHlwZSA9IHtcblx0XHRnZXRDaGlsZElkcygpICB7IHJldHVybiB0aGlzLnN1Yi5tYXAoKHN1YikgPT4gc3ViLmVudGl0eS5faWQpIH0sXG5cdFx0Z2V0TW9kZWxzKGlkcykgeyByZXR1cm4gZ2V0Rm1hTW9kZWxzKGlkcykgfSxcblx0XHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZCB9XG5cdH07XG5cblxuXHQvKiBzdG9yaW5nIGFuZCByZXRyaWV2aW5nICdkZWZlcnJlZHMnIHRvIG1vZGVscyAqL1xuXHR2YXIgX2dldERlZmVycmVkID0gKCgpID0+IHtcblx0XHR2YXIgX2RlZmVycmVkQ2FjaGUgPSB7fTtcblx0XHRyZXR1cm4gKGlkKSA9PiB7XG5cdFx0XHRpZiAoIV9kZWZlcnJlZENhY2hlW2lkXSkgeyBfZGVmZXJyZWRDYWNoZVtpZF0gPSBkZWZlcigpIH1cblx0XHRcdHJldHVybiBfZGVmZXJyZWRDYWNoZVtpZF07XG5cdFx0fTtcblx0fSkoKTtcblxuXG5cdC8qIHRvIHJldHJpZXZlIGFuIGFycmF5IG9mIHByb21pc2VzIHRvIG1vZGVscywgZ2l2ZW4gYW4gYXJyYXkgb2YgaWRzICovXG5cdGZ1bmN0aW9uIGdldEZtYU1vZGVscyhpZHMpIHtcblxuXHRcdC8qIGdhdGhlciB0aGUgaWRzIHRoYXQgd2UgaGF2ZSBub3QgcmVxdWVzdGVkIGZyb20gdGhlIHNlcnZlciBiZWZvcmUgKi9cblx0XHR2YXIgbmV3SWRzID0gW107XG5cdFx0aWRzLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRpZiAoIV9nZXREZWZlcnJlZChpZCkuYWxyZWFkeVJlcXVlc3RlZCkge1xuXHRcdFx0XHRfZ2V0RGVmZXJyZWQoaWQpLmFscmVhZHlSZXF1ZXN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRuZXdJZHMucHVzaChpZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiByZXF1ZXN0IGFuZCBidWlsZCB0aGUgbW9kZWwgb2JqZWN0cyBiZWxvbmdpbmcgdG8gdGhvc2UgaWRzICovXG5cdFx0UC5yZXNvbHZlKCQuYWpheCh7XG5cdFx0XHR1cmw6IGBodHRwOi8vd3d3LmFwaW5hdG9teS5vcmc6ODc2Ni9yZXNvdXJjZXMvZW50aXRpZXMvJHtuZXdJZHMuam9pbignLCcpfWAsXG5cdFx0XHRkYXRhVHlwZTogJ2pzb25wJ1xuXHRcdH0pKS5lYWNoKChtb2RlbE9iaikgPT4ge1xuXG5cdFx0XHQvKiAgcmVtb3ZlIHJlZmVyZW5jZXMgdG8gY2hpbGRyZW4gdGhhdCBhcmUgbm90IGFjdHVhbGx5ICAgKi9cblx0XHRcdC8qICBpbiB0aGUgZGF0YWJhc2UgKHRoZSBGTUEgZGF0YWJhc2UgaXMgbWVzc3kgdGhhdCB3YXkpICAqL1xuXHRcdFx0Zm9yICh2YXIgaSA9IG1vZGVsT2JqLnN1Yi5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuXHRcdFx0XHRpZiAobW9kZWxPYmouc3ViW2ldLmVudGl0eSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdG1vZGVsT2JqLnN1Yi5zcGxpY2UoaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogY3JlYXRlIHRoZSBuZXcgbW9kZWwgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm90b3R5cGUgKi9cblx0XHRcdHZhciBuZXdNb2RlbCA9IE9iamVjdC5jcmVhdGUoX21vZGVsUHJvdG90eXBlKTtcblxuXHRcdFx0LyogYXNzaWduIHRoZSByZXRyaWV2ZWQgbW9kZWwgdmFsdWVzIHRvIHRoZSBuZXcgbW9kZWwgb2JqZWN0ICovXG5cdFx0XHQkLmV4dGVuZChuZXdNb2RlbCwgbW9kZWxPYmopO1xuXG5cdFx0XHQvKiByZXNvbHZlIHRoZSBjb3JyZXNwb25kaW5nIHByb21pc2UgKi9cblx0XHRcdF9nZXREZWZlcnJlZChuZXdNb2RlbC5faWQpLnJlc29sdmUobmV3TW9kZWwpO1xuXG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm4gYW4gYXJyYXkgb2YgcHJvbWlzZXMgdG8gYWxsIHJlcXVlc3RlZCBpZHMgKi9cblx0XHRyZXR1cm4gaWRzLm1hcCgoaWQpID0+IF9nZXREZWZlcnJlZChpZCkucHJvbWlzZSk7XG5cblx0fVxuXG5cdHJldHVybiBnZXRGbWFNb2RlbHM7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9mbWEtbW9kZWwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24gKFApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcblx0XHR2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuXHRcdHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0cmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuXHRcdH0pO1xuXHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuXHRcdFx0cmVqZWN0OiByZWplY3QsXG5cdFx0XHRwcm9taXNlOiBwcm9taXNlXG5cdFx0fTtcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlZmVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm1hLW1vZGVsLmpzIn0=