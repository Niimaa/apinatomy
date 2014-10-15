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
	    getChildren: function(ids) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlYmI5ZjA1NzVhMWQ0MTAyNzY5ZCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktZm1hLW1vZGVsLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy8uLi9hbXktdXRpbC9kZWZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFVLHdCQUFZLHdCQUFxQixDQUFHLDBDQUFVLEVBQUcsR0FBRyxNQUFJO0FBQ3pFLGNBQVcsQ0FBQztBQUVSLG9CQUFhLEVBQUksR0FBQyxDQUFDO0FBQ3ZCLFVBQVMsYUFBVyxDQUFFLEVBQUMsQ0FBRztBQUN6QixRQUFJLENBQUMsY0FBYSxDQUFFLEVBQUMsQ0FBQyxDQUFHO0FBQUUsb0JBQWEsQ0FBRSxFQUFDLENBQUMsRUFBSSxNQUFLLEVBQUM7S0FBRTtBQUN4RCxVQUFPLGVBQWEsQ0FBRSxFQUFDLENBQUMsQ0FBQztHQUMxQjtBQUVJLHFCQUFjLEVBQUk7QUFDckIsZUFBVSxDQUFWLFVBQVk7QUFBTyxZQUFPLEtBQUcsSUFBSSxJQUFLLEVBQUMsU0FBQyxHQUFFO2NBQU0sSUFBRSxPQUFPLElBQUk7T0FBQSxFQUFDO0tBQUU7QUFDaEUsZUFBVSxDQUFWLFVBQVksR0FBRSxDQUFHO0FBQUUsWUFBTyxhQUFZLENBQUMsR0FBRSxDQUFDO0tBQUU7QUFDNUMsT0FBSSxHQUFDLEVBQUk7QUFBRSxZQUFPLEtBQUcsSUFBSTtLQUFFO0FBQUEsR0FDNUIsQ0FBQztBQUVELFVBQVMsbUJBQWlCLENBQUUsS0FBSSxDQUFHO0FBQ2xDLFNBQVMsT0FBSSxNQUFJLElBQUksT0FBTyxFQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUUsRUFBRztBQUMvQyxVQUFJLEtBQUksSUFBSSxDQUFFLEVBQUMsT0FBTyxJQUFNLEtBQUcsQ0FBRztBQUNqQyxhQUFJLElBQUksT0FBUSxDQUFDLEVBQUMsQ0FBQztPQUNwQjtBQUFBLEtBQ0Q7QUFBQSxHQUNEO0FBRUEsVUFBUyxhQUFXLENBQUUsR0FBRTtBQUluQixjQUFLLEVBQUksR0FBQyxDQUFDO0FBQ2YsT0FBRSxRQUFTLEVBQUMsU0FBQyxFQUFDLENBQU07QUFDbkIsVUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsaUJBQWlCLENBQUc7QUFDdkMsb0JBQVksQ0FBQyxFQUFDLENBQUMsaUJBQWlCLEVBQUksS0FBRyxDQUFDO0FBQ3hDLGNBQUssS0FBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDO09BQ2hCO0FBQUEsS0FDRCxFQUFDLENBQUM7QUFLRixhQUFTLENBQUMsTUFBTSxDQUFDO0FBQ2hCLFNBQUUsR0FBRyxtREFBbUQsRUFBQyxPQUFLLEtBQU0sQ0FBQyxHQUFFLENBQUMsQ0FBRTtBQUMxRSxjQUFPLENBQUcsUUFBTTtBQUFBLEtBQ2pCLENBQUMsQ0FBQyxLQUFNLEVBQUMsU0FBQyxRQUFPO0FBQ2hCLGNBQU8sUUFBUyxFQUFDLFNBQUMsUUFBTyxDQUFNO0FBQzFCLG9CQUFPLEVBQUksT0FBSyxPQUFRLENBQUMsZUFBYyxDQUFDLENBQUM7QUFDN0MsZ0JBQVEsQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDLENBQUM7QUFDNUIsMEJBQWtCLENBQUMsUUFBTyxDQUFDLENBQUM7QUFDNUIsb0JBQVksQ0FBQyxRQUFPLElBQUksQ0FBQyxRQUFTLENBQUMsUUFBTyxDQUFDLENBQUM7T0FDN0MsRUFBQyxDQUFDO0tBQ0gsRUFBQyxDQUFDO0FBS0YsVUFBTyxJQUFFLElBQUssRUFBQyxTQUFDLEVBQUM7WUFBTSxhQUFZLENBQUMsRUFBQyxDQUFDLFFBQVE7S0FBQSxFQUFDLENBQUM7R0FDakQ7QUFFQSxRQUFPLGFBQVcsQ0FBQztBQUNwQixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUMxREEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7aUVDQUEsaUNBQVEsdUJBQVUsQ0FBRywwQ0FBVSxFQUFHO0FBQ2pDLGNBQVcsQ0FBQztBQUVaLFFBQU8sU0FBUyxNQUFJLENBQUUsQ0FBRTtBQUNuQixlQUFNO0FBQUcsY0FBSyxDQUFDO0FBQ2YsZUFBTSxFQUFJLElBQUksRUFBQyxDQUFDLFNBQVMsQ0FBRTtBQUM5QixhQUFNLEVBQUksVUFBUSxDQUFFLEVBQUMsQ0FBQztBQUN0QixZQUFLLEVBQUksVUFBUSxDQUFFLEVBQUMsQ0FBQztLQUN0QixDQUFDLENBQUM7QUFFRixVQUFPO0FBQ04sYUFBTSxDQUFHLFFBQU07QUFDZixZQUFLLENBQUcsT0FBSztBQUNiLGFBQU0sQ0FBRyxRQUFNO0FBQUEsS0FDaEIsQ0FBQztHQUNGLENBQUM7QUFFRixFQUFDLCtJQUFDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlYmI5ZjA1NzVhMWQ0MTAyNzY5ZFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL2FteS11dGlsL2RlZmVyLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBkZWZlcikge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9kZWZlcnJlZENhY2hlID0ge307XG5cdGZ1bmN0aW9uIF9nZXREZWZlcnJlZChpZCkge1xuXHRcdGlmICghX2RlZmVycmVkQ2FjaGVbaWRdKSB7IF9kZWZlcnJlZENhY2hlW2lkXSA9IGRlZmVyKCkgfVxuXHRcdHJldHVybiBfZGVmZXJyZWRDYWNoZVtpZF07XG5cdH1cblxuXHR2YXIgX21vZGVsUHJvdG90eXBlID0ge1xuXHRcdGdldENoaWxkSWRzKCkgICAgeyByZXR1cm4gdGhpcy5zdWIubWFwKChzdWIpID0+IHN1Yi5lbnRpdHkuX2lkKSB9LFxuXHRcdGdldENoaWxkcmVuKGlkcykgeyByZXR1cm4gZ2V0Rm1hTW9kZWxzKGlkcykgfSxcblx0XHRnZXQgaWQoKSB7IHJldHVybiB0aGlzLl9pZCB9XG5cdH07XG5cblx0ZnVuY3Rpb24gcmVtb3ZlTnVsbENoaWxkcmVuKG1vZGVsKSB7XG5cdFx0Zm9yICh2YXIgaSA9IG1vZGVsLnN1Yi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHRcdFx0aWYgKG1vZGVsLnN1YltpXS5lbnRpdHkgPT09IG51bGwpIHtcblx0XHRcdFx0bW9kZWwuc3ViLnNwbGljZShpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRGbWFNb2RlbHMoaWRzKSB7XG5cdFx0Ly9cblx0XHQvLyBmaWx0ZXIgb3V0IHRoZSBpZHMgdGhhdCB3ZSBoYXZlIG5vdCByZXF1ZXN0ZWQgZnJvbSB0aGUgc2VydmVyIGJlZm9yZVxuXHRcdC8vXG5cdFx0dmFyIG5ld0lkcyA9IFtdO1xuXHRcdGlkcy5mb3JFYWNoKChpZCkgPT4ge1xuXHRcdFx0aWYgKCFfZ2V0RGVmZXJyZWQoaWQpLmFscmVhZHlSZXF1ZXN0ZWQpIHtcblx0XHRcdFx0X2dldERlZmVycmVkKGlkKS5hbHJlYWR5UmVxdWVzdGVkID0gdHJ1ZTtcblx0XHRcdFx0bmV3SWRzLnB1c2goaWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyByZXF1ZXN0IGFuZCBidWlsZCB0aGUgbW9kZWwgb2JqZWN0cyBiZWxvbmdpbmcgdG8gdGhvc2UgaWRzXG5cdFx0Ly9cblx0XHRQLnJlc29sdmUoJC5hamF4KHtcblx0XHRcdHVybDogYGh0dHA6Ly93d3cuYXBpbmF0b215Lm9yZzo4NzY2L3Jlc291cmNlcy9lbnRpdGllcy8ke25ld0lkcy5qb2luKCcsJyl9YCxcblx0XHRcdGRhdGFUeXBlOiAnanNvbnAnXG5cdFx0fSkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRyZXNwb25zZS5mb3JFYWNoKChtb2RlbE9iaikgPT4ge1xuXHRcdFx0XHR2YXIgbmV3TW9kZWwgPSBPYmplY3QuY3JlYXRlKF9tb2RlbFByb3RvdHlwZSk7XG5cdFx0XHRcdCQuZXh0ZW5kKG5ld01vZGVsLCBtb2RlbE9iaik7XG5cdFx0XHRcdHJlbW92ZU51bGxDaGlsZHJlbihuZXdNb2RlbCk7XG5cdFx0XHRcdF9nZXREZWZlcnJlZChuZXdNb2RlbC5faWQpLnJlc29sdmUobmV3TW9kZWwpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIHJldHVybiBhbiBhcnJheSBvZiBwcm9taXNlcyB0byBhbGwgcmVxdWVzdGVkIGlkc1xuXHRcdC8vXG5cdFx0cmV0dXJuIGlkcy5tYXAoKGlkKSA9PiBfZ2V0RGVmZXJyZWQoaWQpLnByb21pc2UpO1xuXHR9XG5cblx0cmV0dXJuIGdldEZtYU1vZGVscztcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9hbXktZm1hLW1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uIChQKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG5cdFx0dmFyIHJlc29sdmUsIHJlamVjdDtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcblx0XHRcdHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9KTtcblx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcblx0XHRcdHJlamVjdDogcmVqZWN0LFxuXHRcdFx0cHJvbWlzZTogcHJvbWlzZVxuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vYW15LXV0aWwvZGVmZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhbXktZm1hLW1vZGVsLmpzIn0=