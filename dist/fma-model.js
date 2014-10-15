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
	  var _deferredCache = {};
	  function _getDeferred(id) {
	    if (!_deferredCache[id]) {
	      _deferredCache[id] = defer();
	    }
	    return _deferredCache[id];
	  }
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
	  function removeNullChildren(model) {
	    for (var i = model.sub.length - 1; i >= 0; --i) {
	      if (model.sub[i].entity === null) {
	        model.sub.splice(i);
	      }
	    }
	  }
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
	    })).then((function(response) {
	      response.forEach((function(modelObj) {
	        var newModel = Object.create(_modelPrototype);
	        $.extend(newModel, modelObj);
	        removeNullChildren(newModel);
	        _getDeferred(newModel._id).resolve(newModel);
	      }));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMjYyMTJkOTNhNDFiYjU1ZTRmZSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9mbWEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvZGVmZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBVSx3QkFBWSx3QkFBaUIsQ0FBRywwQ0FBVSxFQUFHLEdBQUcsTUFBSTtBQUNyRSxjQUFXLENBQUM7QUFFUixvQkFBYSxFQUFJLEdBQUMsQ0FBQztBQUN2QixVQUFTLGFBQVcsQ0FBRSxFQUFDLENBQUc7QUFDekIsUUFBSSxDQUFDLGNBQWEsQ0FBRSxFQUFDLENBQUMsQ0FBRztBQUFFLG9CQUFhLENBQUUsRUFBQyxDQUFDLEVBQUksTUFBSyxFQUFDO0tBQUU7QUFDeEQsVUFBTyxlQUFhLENBQUUsRUFBQyxDQUFDLENBQUM7R0FDMUI7QUFFSSxxQkFBYyxFQUFJO0FBQ3JCLGVBQVUsQ0FBVixVQUFZO0FBQUssWUFBTyxLQUFHLElBQUksSUFBSyxFQUFDLFNBQUMsR0FBRTtjQUFNLElBQUUsT0FBTyxJQUFJO09BQUEsRUFBQztLQUFFO0FBQzlELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sYUFBWSxDQUFDLEdBQUUsQ0FBQztLQUFFO0FBQzFDLE9BQUksR0FBQyxFQUFJO0FBQUUsWUFBTyxLQUFHLElBQUk7S0FBRTtBQUFBLEdBQzVCLENBQUM7QUFFRCxVQUFTLG1CQUFpQixDQUFFLEtBQUksQ0FBRztBQUNsQyxTQUFTLE9BQUksTUFBSSxJQUFJLE9BQU8sRUFBSSxHQUFHLEtBQUssR0FBRyxHQUFFLEVBQUc7QUFDL0MsVUFBSSxLQUFJLElBQUksQ0FBRSxFQUFDLE9BQU8sSUFBTSxLQUFHLENBQUc7QUFDakMsYUFBSSxJQUFJLE9BQVEsQ0FBQyxFQUFDLENBQUM7T0FDcEI7QUFBQSxLQUNEO0FBQUEsR0FDRDtBQUVBLFVBQVMsYUFBVyxDQUFFLEdBQUU7QUFJbkIsY0FBSyxFQUFJLEdBQUMsQ0FBQztBQUNmLE9BQUUsUUFBUyxFQUFDLFNBQUMsRUFBQyxDQUFNO0FBQ25CLFVBQUksQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDLGlCQUFpQixDQUFHO0FBQ3ZDLG9CQUFZLENBQUMsRUFBQyxDQUFDLGlCQUFpQixFQUFJLEtBQUcsQ0FBQztBQUN4QyxjQUFLLEtBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztPQUNoQjtBQUFBLEtBQ0QsRUFBQyxDQUFDO0FBS0YsYUFBUyxDQUFDLE1BQU0sQ0FBQztBQUNoQixTQUFFLEdBQUcsbURBQW1ELEVBQUMsT0FBSyxLQUFNLENBQUMsR0FBRSxDQUFDLENBQUU7QUFDMUUsY0FBTyxDQUFHLFFBQU07QUFBQSxLQUNqQixDQUFDLENBQUMsS0FBTSxFQUFDLFNBQUMsUUFBTztBQUNoQixjQUFPLFFBQVMsRUFBQyxTQUFDLFFBQU8sQ0FBTTtBQUMxQixvQkFBTyxFQUFJLE9BQUssT0FBUSxDQUFDLGVBQWMsQ0FBQyxDQUFDO0FBQzdDLGdCQUFRLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBQzVCLDBCQUFrQixDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBQzVCLG9CQUFZLENBQUMsUUFBTyxJQUFJLENBQUMsUUFBUyxDQUFDLFFBQU8sQ0FBQyxDQUFDO09BQzdDLEVBQUMsQ0FBQztLQUNILEVBQUMsQ0FBQztBQUtGLFVBQU8sSUFBRSxJQUFLLEVBQUMsU0FBQyxFQUFDO1lBQU0sYUFBWSxDQUFDLEVBQUMsQ0FBQyxRQUFRO0tBQUEsRUFBQyxDQUFDO0dBQ2pEO0FBRUEsUUFBTyxhQUFXLENBQUM7QUFDcEIsRUFBQywrSUFBQztBQUNGOzs7Ozs7O0FDMURBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O2lFQ0FBLGlDQUFRLHVCQUFVLENBQUcsMENBQVUsRUFBRztBQUNqQyxjQUFXLENBQUM7QUFFWixRQUFPLFNBQVMsTUFBSSxDQUFFLENBQUU7QUFDbkIsZUFBTTtBQUFHLGNBQUssQ0FBQztBQUNmLGVBQU0sRUFBSSxJQUFJLEVBQUMsQ0FBQyxTQUFTLENBQUU7QUFDOUIsYUFBTSxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7QUFDdEIsWUFBSyxFQUFJLFVBQVEsQ0FBRSxFQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0FBRUYsVUFBTztBQUNOLGFBQU0sQ0FBRyxRQUFNO0FBQ2YsWUFBSyxDQUFHLE9BQUs7QUFDYixhQUFNLENBQUcsUUFBTTtBQUFBLEtBQ2hCLENBQUM7R0FDRixDQUFDO0FBRUYsRUFBQywrSUFBQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzI2MjEyZDkzYTQxYmI1NWU0ZmVcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi91dGlsL2RlZmVyLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9kZWZlcnJlZENhY2hlID0ge307XG5cdGZ1bmN0aW9uIF9nZXREZWZlcnJlZChpZCkge1xuXHRcdGlmICghX2RlZmVycmVkQ2FjaGVbaWRdKSB7IF9kZWZlcnJlZENhY2hlW2lkXSA9IGRlZmVyKCkgfVxuXHRcdHJldHVybiBfZGVmZXJyZWRDYWNoZVtpZF07XG5cdH1cblxuXHR2YXIgX21vZGVsUHJvdG90eXBlID0ge1xuXHRcdGdldENoaWxkSWRzKCkgIHsgcmV0dXJuIHRoaXMuc3ViLm1hcCgoc3ViKSA9PiBzdWIuZW50aXR5Ll9pZCkgfSxcblx0XHRnZXRNb2RlbHMoaWRzKSB7IHJldHVybiBnZXRGbWFNb2RlbHMoaWRzKSB9LFxuXHRcdGdldCBpZCgpIHsgcmV0dXJuIHRoaXMuX2lkIH1cblx0fTtcblxuXHRmdW5jdGlvbiByZW1vdmVOdWxsQ2hpbGRyZW4obW9kZWwpIHtcblx0XHRmb3IgKHZhciBpID0gbW9kZWwuc3ViLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cdFx0XHRpZiAobW9kZWwuc3ViW2ldLmVudGl0eSA9PT0gbnVsbCkge1xuXHRcdFx0XHRtb2RlbC5zdWIuc3BsaWNlKGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdldEZtYU1vZGVscyhpZHMpIHtcblx0XHQvL1xuXHRcdC8vIGZpbHRlciBvdXQgdGhlIGlkcyB0aGF0IHdlIGhhdmUgbm90IHJlcXVlc3RlZCBmcm9tIHRoZSBzZXJ2ZXIgYmVmb3JlXG5cdFx0Ly9cblx0XHR2YXIgbmV3SWRzID0gW107XG5cdFx0aWRzLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRpZiAoIV9nZXREZWZlcnJlZChpZCkuYWxyZWFkeVJlcXVlc3RlZCkge1xuXHRcdFx0XHRfZ2V0RGVmZXJyZWQoaWQpLmFscmVhZHlSZXF1ZXN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRuZXdJZHMucHVzaChpZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIHJlcXVlc3QgYW5kIGJ1aWxkIHRoZSBtb2RlbCBvYmplY3RzIGJlbG9uZ2luZyB0byB0aG9zZSBpZHNcblx0XHQvL1xuXHRcdFAucmVzb2x2ZSgkLmFqYXgoe1xuXHRcdFx0dXJsOiBgaHR0cDovL3d3dy5hcGluYXRvbXkub3JnOjg3NjYvcmVzb3VyY2VzL2VudGl0aWVzLyR7bmV3SWRzLmpvaW4oJywnKX1gLFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29ucCdcblx0XHR9KSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdHJlc3BvbnNlLmZvckVhY2goKG1vZGVsT2JqKSA9PiB7XG5cdFx0XHRcdHZhciBuZXdNb2RlbCA9IE9iamVjdC5jcmVhdGUoX21vZGVsUHJvdG90eXBlKTtcblx0XHRcdFx0JC5leHRlbmQobmV3TW9kZWwsIG1vZGVsT2JqKTtcblx0XHRcdFx0cmVtb3ZlTnVsbENoaWxkcmVuKG5ld01vZGVsKTtcblx0XHRcdFx0X2dldERlZmVycmVkKG5ld01vZGVsLl9pZCkucmVzb2x2ZShuZXdNb2RlbCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vXG5cdFx0Ly8gcmV0dXJuIGFuIGFycmF5IG9mIHByb21pc2VzIHRvIGFsbCByZXF1ZXN0ZWQgaWRzXG5cdFx0Ly9cblx0XHRyZXR1cm4gaWRzLm1hcCgoaWQpID0+IF9nZXREZWZlcnJlZChpZCkucHJvbWlzZSk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0Rm1hTW9kZWxzO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2ZtYS1tb2RlbC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCBmdW5jdGlvbiAoUCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGRlZmVyKCkge1xuXHRcdHZhciByZXNvbHZlLCByZWplY3Q7XG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUChmdW5jdGlvbigpIHtcblx0XHRcdHJlc29sdmUgPSBhcmd1bWVudHNbMF07XG5cdFx0XHRyZWplY3QgPSBhcmd1bWVudHNbMV07XG5cdFx0fSk7XG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG5cdFx0XHRyZWplY3Q6IHJlamVjdCxcblx0XHRcdHByb21pc2U6IHByb21pc2Vcblx0XHR9O1xuXHR9O1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvZGVmZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmbWEtbW9kZWwuanMifQ==