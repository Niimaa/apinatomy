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
	    name: 'tile-button-to-swap-three-d-model',
	    requires: ['tile-buttons', 'three-d-geometric-models']
	  });
	  plugin.append('Tile.prototype.construct', function() {
	    var models = [null].concat(this.children.filter((function(child) {
	      return child.type === 'ThreeDModel';
	    })));
	    if (models.length > 1) {
	      this.addButton({
	        name: 'swap3dModel',
	        icon: __webpack_require__(2)
	      }).onValue((function() {
	        var i;
	        for (i = 1; i < models.length; ++i) {
	          if (models[i].visible) {
	            models[i].visible = false;
	            break;
	          }
	        }
	        i = (i + 1) % models.length;
	        if (models[i]) {
	          models[i].traverseArtefactsByType('ThreeDModel', (function(model) {
	            model.visible = true;
	          }));
	          var indentation = "-- ";
	          var modelHierarchy = "Available parts of this 3D model:\n";
	          models[i].traverseArtefactsByType('ThreeDModel', (function(model) {
	            modelHierarchy += indentation + model.id + '\n';
	          }), {
	            beforeGoingIn: function() {
	              indentation += "-- ";
	            },
	            beforeGoingOut: function() {
	              indentation = indentation.slice(3);
	            }
	          });
	          console.log(modelHierarchy);
	        }
	      }));
	    }
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c485da7e639b4d2d69b187420fc2bf78.png"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYTU4YjhiYTg5MTI5YjdjNDAxMyIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL2ljb25zLzNkLXdoaXRlLnBuZyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFRLENBQUcsMENBQVU7QUFDNUIsY0FBVyxDQUFDO0FBR1IsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxvQ0FBa0M7QUFDeEMsWUFBTyxDQUFHLEVBQUMsY0FBYSxDQUFHLDJCQUF5QixDQUFDO0FBQUEsR0FDdEQsQ0FBQyxDQUFDO0FBR0YsUUFBSyxPQUFRLENBQUMsMEJBQXlCLENBQUcsVUFBVTtBQUcvQyxjQUFLLEVBQUksRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsU0FBUyxPQUFRLEVBQUMsU0FBQyxLQUFJO1lBQU0sTUFBSSxLQUFLLElBQU0sY0FBWTtLQUFBLEVBQUMsQ0FBQyxDQUFDO0FBRXpGLFFBQUksTUFBSyxPQUFPLEVBQUksR0FBRztBQUN0QixVQUFHLFVBQVcsQ0FBQztBQUFFLFlBQUcsQ0FBRyxjQUFZO0FBQUcsWUFBRyxDQUFHLHFCQUFRLEVBQTJCO0FBQUEsT0FBRSxDQUFDLFFBQVMsRUFBQyxTQUFDO0FBSXhGLGNBQUM7QUFDTCxhQUFLLEdBQUksR0FBRyxJQUFJLE9BQUssT0FBTyxDQUFHLEdBQUUsRUFBRztBQUNuQyxjQUFJLE1BQUssQ0FBRSxFQUFDLFFBQVEsQ0FBRztBQUN0QixrQkFBSyxDQUFFLEVBQUMsUUFBUSxFQUFJLE1BQUksQ0FBQztBQUN6QixrQkFBSztXQUNOO0FBQUEsU0FDRDtBQUNBLFdBQUksRUFBQyxHQUFFLEdBQUMsRUFBSSxPQUFLLE9BQU8sQ0FBQztBQUN6QixZQUFJLE1BQUssQ0FBRSxFQUFDLENBQUc7QUFHZCxnQkFBSyxDQUFFLEVBQUMsd0JBQXlCLENBQUMsYUFBWSxHQUFHLFNBQUMsS0FBSSxDQUFNO0FBQUUsaUJBQUksUUFBUSxFQUFJLEtBQUc7V0FBRSxFQUFDLENBQUM7QUFHakYseUJBQVUsRUFBSSxNQUFJLENBQUM7QUFDbkIsNEJBQWEsRUFBSSxzQ0FBb0MsQ0FBQztBQUMxRCxnQkFBSyxDQUFFLEVBQUMsd0JBQXlCLENBQUMsYUFBWSxHQUFHLFNBQUMsS0FBSSxDQUFNO0FBQzNELDBCQUFhLEdBQUssWUFBVSxFQUFJLE1BQUksR0FBRyxFQUFJLEtBQUcsQ0FBQztXQUNoRCxFQUFHO0FBQ0YseUJBQVksQ0FBWixVQUFjLENBQUU7QUFBRSx5QkFBVSxHQUFLLE1BQUk7YUFBRTtBQUN2QywwQkFBYSxDQUFiLFVBQWUsQ0FBRTtBQUFFLHlCQUFVLEVBQUksWUFBVSxNQUFPLENBQUMsRUFBQzthQUFFO0FBQUEsV0FDdkQsQ0FBQyxDQUFDO0FBQ0YsaUJBQU0sSUFBSyxDQUFDLGNBQWEsQ0FBQyxDQUFDO1NBRTVCO0FBQUEsT0FFRCxFQUFDLENBQUM7S0FDSDtBQUFBLEdBRUQsQ0FBQyxDQUFDO0FBR0gsRUFBQywrSUFBQztBQUNGOzs7Ozs7OztBQ3JEQSxnRDs7Ozs7O0FDQUEsZ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmE1OGI4YmE4OTEyOWI3YzQwMTNcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtYnV0dG9uLXRvLXN3YXAtdGhyZWUtZC1tb2RlbCcsXG5cdFx0cmVxdWlyZXM6IFsndGlsZS1idXR0b25zJywgJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscyddXG5cdH0pO1xuXG5cblx0cGx1Z2luLmFwcGVuZCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogYW4gYXJyYXkgY29udGFpbmluZyBudWxsLCBhbmQgZWFjaCAzRCBtb2RlbCBhcnRlZmFjdCAqL1xuXHRcdHZhciBtb2RlbHMgPSBbbnVsbF0uY29uY2F0KHRoaXMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudHlwZSA9PT0gJ1RocmVlRE1vZGVsJykpO1xuXG5cdFx0aWYgKG1vZGVscy5sZW5ndGggPiAxKSB7XG5cdFx0XHR0aGlzLmFkZEJ1dHRvbih7IG5hbWU6ICdzd2FwM2RNb2RlbCcsIGljb246IHJlcXVpcmUoJy4vdXRpbC9pY29ucy8zZC13aGl0ZS5wbmcnKSB9KS5vblZhbHVlKCgpID0+IHtcblxuXHRcdFx0XHQvLyB0aGUgYnV0dG9uIHN3aXRjaGVzIGJldHdlZW4gdGhlIGF2YWlsYWJsZSAzRCBtb2RlbHMgb24gdGhlIHRvcCBsZXZlbCBvZiB0aGUgdGlsZVxuXG5cdFx0XHRcdHZhciBpO1xuXHRcdFx0XHRmb3IgKGkgPSAxOyBpIDwgbW9kZWxzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0aWYgKG1vZGVsc1tpXS52aXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRtb2RlbHNbaV0udmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGkgPSAoaSsxKSAlIG1vZGVscy5sZW5ndGg7XG5cdFx0XHRcdGlmIChtb2RlbHNbaV0pIHtcblxuXHRcdFx0XHRcdC8qIG1ha2UgdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgdmlzaWJsZSwgYXMgd2VsbCBhcyBhbGwgaXRzIGNoaWxkcmVuICovXG5cdFx0XHRcdFx0bW9kZWxzW2ldLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaHJlZURNb2RlbCcsIChtb2RlbCkgPT4geyBtb2RlbC52aXNpYmxlID0gdHJ1ZSB9KTtcblxuXHRcdFx0XHRcdC8qIHRlbXBvcmFyeSBpbmZvcm1hdGlvbiBpbiB0aGUgY29uc29sZSBmb3IgQmVybmFyZCAqLy8vIFRPRE86IHJlbW92ZSB3aGVuIHRoZSBjb3JyZXNwb25kaW5nIGRlbW8gaXMgb3ZlclxuXHRcdFx0XHRcdHZhciBpbmRlbnRhdGlvbiA9IFwiLS0gXCI7XG5cdFx0XHRcdFx0dmFyIG1vZGVsSGllcmFyY2h5ID0gXCJBdmFpbGFibGUgcGFydHMgb2YgdGhpcyAzRCBtb2RlbDpcXG5cIjtcblx0XHRcdFx0XHRtb2RlbHNbaV0udHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RocmVlRE1vZGVsJywgKG1vZGVsKSA9PiB7XG5cdFx0XHRcdFx0XHRtb2RlbEhpZXJhcmNoeSArPSBpbmRlbnRhdGlvbiArIG1vZGVsLmlkICsgJ1xcbic7XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0YmVmb3JlR29pbmdJbigpIHsgaW5kZW50YXRpb24gKz0gXCItLSBcIiB9LFxuXHRcdFx0XHRcdFx0YmVmb3JlR29pbmdPdXQoKSB7IGluZGVudGF0aW9uID0gaW5kZW50YXRpb24uc2xpY2UoMykgfVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKG1vZGVsSGllcmFyY2h5KTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGlsZS1idXR0b24tdG8tc3dhcC10aHJlZS1kLW1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYzQ4NWRhN2U2MzliNGQyZDY5YjE4NzQyMGZjMmJmNzgucG5nXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvaWNvbnMvM2Qtd2hpdGUucG5nXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanMifQ==