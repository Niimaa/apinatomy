(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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

	var BASE = '//localhost:61234/apinatomy-core/dist/example';
	importScripts('//cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.12/bluebird.min.js');
	importScripts((BASE + "/") + __webpack_require__(1));
	addEventListener('message', (function($__0) {
	  var data = $__0.data;
	  if (data.type === 'filenames') {
	    loadGeometryFiles(data.filenames);
	  }
	}));
	function loadGeometryFiles(filenames) {
	  P.all(filenames).map((function(filename) {
	    return new P((function(resolve, reject) {
	      var loader = new THREE.BufferGeometryLoader();
	      loader.load((BASE + "/" + filename), (function(bufferGeometry) {
	        bufferGeometry.computeVertexNormals();
	        bufferGeometry.computeMorphNormals();
	        bufferGeometry.computeBoundingBox();
	        resolve(bufferGeometry);
	      }));
	    }));
	  })).map((function(bufferGeometry) {
	    var correctionVector = bufferGeometry.boundingBox.center().negate();
	    var correctionMatrix = new THREE.Matrix4().copyPosition(correctionVector);
	    bufferGeometry.applyMatrix(correctionMatrix);
	    console.log(bufferGeometry);
	  })).then((function(bufferGeometries) {
	    if (true) {
	      return;
	    }
	    var message = {
	      type: 'geometryBuffers',
	      geometries: [],
	      boundingBox: undefined,
	      center: undefined
	    };
	    var buffers = [];
	    var bbox = message.boundingBox = ((function() {
	      var bbox = {
	        min: [Infinity, Infinity, Infinity],
	        max: [-Infinity, -Infinity, -Infinity]
	      };
	      geometries.forEach((function(geometry) {
	        for (var i = 0; i < geometry.vertices.length; i += 1) {
	          if (geometry.vertices[i] < bbox.min[i % 3]) {
	            bbox.min[i % 3] = geometry.vertices[i];
	          }
	          if (geometry.vertices[i] > bbox.max[i % 3]) {
	            bbox.max[i % 3] = geometry.vertices[i];
	          }
	        }
	        geometry.morphTargets.forEach((function(morphTarget) {
	          for (var i = 0; i < morphTarget.vertices.length; i += 1) {
	            if (morphTarget.vertices[i] < bbox.min[i % 3]) {
	              bbox.min[i % 3] = morphTarget.vertices[i];
	            }
	            if (morphTarget.vertices[i] > bbox.max[i % 3]) {
	              bbox.max[i % 3] = morphTarget.vertices[i];
	            }
	          }
	        }));
	      }));
	      return bbox;
	    }))();
	    var center = message.center = [0.5 * (bbox.min[0] + bbox.max[0]), 0.5 * (bbox.min[1] + bbox.max[1]), 0.5 * (bbox.min[2] + bbox.max[2])];
	    geometries.forEach((function(geometry) {
	      message.geometries.push({file: geometry.file});
	      function addBuffer(type, buffer, index) {
	        message.buffers.push({
	          type: type,
	          index: index,
	          buffer: buffer
	        });
	        buffers.push(buffer);
	      }
	      var vertices = new Float32Array(geometry.vertices.length);
	      for (var j = 0; j < geometry.vertices.length; j += 1) {
	        vertices[j] = geometry.vertices[j] - center[j % 3];
	      }
	      addBuffer('vertices', vertices.buffer);
	      var normals = new Float32Array(geometry.normals);
	      addBuffer('normals', normals.buffer);
	      var faces = new Int32Array(geometry.faces);
	      addBuffer('faces', faces.buffer);
	      geometry.morphTargets.forEach((function(morphTarget, mt) {
	        var vertices = new Float32Array(morphTarget.vertices.length);
	        for (var k = 0; k < morphTarget.vertices.length; k += 1) {
	          vertices[j] = morphTarget.vertices[j] - center[j % 3];
	        }
	        addBuffer('morph-vertices', vertices.buffer, mt);
	      }));
	      geometry.morphNormals.forEach((function(morphNormal, mt) {
	        var normals = new Float32Array(morphNormal.normals);
	        addBuffer('morph-normals', normals.buffer, mt);
	      }));
	    }));
	    postMessage(message, buffers);
	  }));
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "541b54102319b6b1a22c4d5997ff17d7.js"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NTM3NGQ2ZWNmN2NjOTRhODlkZiIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwtd29ya2VyLmpzIiwid2VicGFjazovLy8uL2Jvd2VyX2NvbXBvbmVudHMvdGhyZWUuanMvYnVpbGQvdGhyZWUubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLDhCQUE4QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCLGlDQUFpQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLGdDQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsOEJBQThCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQSxJQUFHO0FBQ0g7Ozs7Ozs7QUNqR0EsK0UiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NTM3NGQ2ZWNmN2NjOTRhODlkZlxuICoqLyIsInZhciBCQVNFID0gJy8vbG9jYWxob3N0OjYxMjM0L2FwaW5hdG9teS1jb3JlL2Rpc3QvZXhhbXBsZSc7XG5pbXBvcnRTY3JpcHRzKCcvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9ibHVlYmlyZC8yLjkuMTIvYmx1ZWJpcmQubWluLmpzJyk7XG5pbXBvcnRTY3JpcHRzKChCQVNFICsgXCIvXCIpICsgcmVxdWlyZSgnZmlsZSEuLi9ib3dlcl9jb21wb25lbnRzL3RocmVlLmpzL2J1aWxkL3RocmVlLm1pbi5qcycpKTtcbmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZnVuY3Rpb24oJF9fMCkge1xuICB2YXIgZGF0YSA9ICRfXzAuZGF0YTtcbiAgaWYgKGRhdGEudHlwZSA9PT0gJ2ZpbGVuYW1lcycpIHtcbiAgICBsb2FkR2VvbWV0cnlGaWxlcyhkYXRhLmZpbGVuYW1lcyk7XG4gIH1cbn0pKTtcbmZ1bmN0aW9uIGxvYWRHZW9tZXRyeUZpbGVzKGZpbGVuYW1lcykge1xuICBQLmFsbChmaWxlbmFtZXMpLm1hcCgoZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFAoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGxvYWRlciA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeUxvYWRlcigpO1xuICAgICAgbG9hZGVyLmxvYWQoKEJBU0UgKyBcIi9cIiArIGZpbGVuYW1lKSwgKGZ1bmN0aW9uKGJ1ZmZlckdlb21ldHJ5KSB7XG4gICAgICAgIGJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG4gICAgICAgIGJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVNb3JwaE5vcm1hbHMoKTtcbiAgICAgICAgYnVmZmVyR2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG4gICAgICAgIHJlc29sdmUoYnVmZmVyR2VvbWV0cnkpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfSkpLm1hcCgoZnVuY3Rpb24oYnVmZmVyR2VvbWV0cnkpIHtcbiAgICB2YXIgY29ycmVjdGlvblZlY3RvciA9IGJ1ZmZlckdlb21ldHJ5LmJvdW5kaW5nQm94LmNlbnRlcigpLm5lZ2F0ZSgpO1xuICAgIHZhciBjb3JyZWN0aW9uTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5jb3B5UG9zaXRpb24oY29ycmVjdGlvblZlY3Rvcik7XG4gICAgYnVmZmVyR2VvbWV0cnkuYXBwbHlNYXRyaXgoY29ycmVjdGlvbk1hdHJpeCk7XG4gICAgY29uc29sZS5sb2coYnVmZmVyR2VvbWV0cnkpO1xuICB9KSkudGhlbigoZnVuY3Rpb24oYnVmZmVyR2VvbWV0cmllcykge1xuICAgIGlmICh0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBtZXNzYWdlID0ge1xuICAgICAgdHlwZTogJ2dlb21ldHJ5QnVmZmVycycsXG4gICAgICBnZW9tZXRyaWVzOiBbXSxcbiAgICAgIGJvdW5kaW5nQm94OiB1bmRlZmluZWQsXG4gICAgICBjZW50ZXI6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgICB2YXIgYmJveCA9IG1lc3NhZ2UuYm91bmRpbmdCb3ggPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJib3ggPSB7XG4gICAgICAgIG1pbjogW0luZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHldLFxuICAgICAgICBtYXg6IFstSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5XVxuICAgICAgfTtcbiAgICAgIGdlb21ldHJpZXMuZm9yRWFjaCgoZnVuY3Rpb24oZ2VvbWV0cnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChnZW9tZXRyeS52ZXJ0aWNlc1tpXSA8IGJib3gubWluW2kgJSAzXSkge1xuICAgICAgICAgICAgYmJveC5taW5baSAlIDNdID0gZ2VvbWV0cnkudmVydGljZXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnZW9tZXRyeS52ZXJ0aWNlc1tpXSA+IGJib3gubWF4W2kgJSAzXSkge1xuICAgICAgICAgICAgYmJveC5tYXhbaSAlIDNdID0gZ2VvbWV0cnkudmVydGljZXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cy5mb3JFYWNoKChmdW5jdGlvbihtb3JwaFRhcmdldCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9ycGhUYXJnZXQudmVydGljZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldC52ZXJ0aWNlc1tpXSA8IGJib3gubWluW2kgJSAzXSkge1xuICAgICAgICAgICAgICBiYm94Lm1pbltpICUgM10gPSBtb3JwaFRhcmdldC52ZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldC52ZXJ0aWNlc1tpXSA+IGJib3gubWF4W2kgJSAzXSkge1xuICAgICAgICAgICAgICBiYm94Lm1heFtpICUgM10gPSBtb3JwaFRhcmdldC52ZXJ0aWNlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBiYm94O1xuICAgIH0pKSgpO1xuICAgIHZhciBjZW50ZXIgPSBtZXNzYWdlLmNlbnRlciA9IFswLjUgKiAoYmJveC5taW5bMF0gKyBiYm94Lm1heFswXSksIDAuNSAqIChiYm94Lm1pblsxXSArIGJib3gubWF4WzFdKSwgMC41ICogKGJib3gubWluWzJdICsgYmJveC5tYXhbMl0pXTtcbiAgICBnZW9tZXRyaWVzLmZvckVhY2goKGZ1bmN0aW9uKGdlb21ldHJ5KSB7XG4gICAgICBtZXNzYWdlLmdlb21ldHJpZXMucHVzaCh7ZmlsZTogZ2VvbWV0cnkuZmlsZX0pO1xuICAgICAgZnVuY3Rpb24gYWRkQnVmZmVyKHR5cGUsIGJ1ZmZlciwgaW5kZXgpIHtcbiAgICAgICAgbWVzc2FnZS5idWZmZXJzLnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIGJ1ZmZlcjogYnVmZmVyXG4gICAgICAgIH0pO1xuICAgICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIHZhciB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoZ2VvbWV0cnkudmVydGljZXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZ2VvbWV0cnkudmVydGljZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgdmVydGljZXNbal0gPSBnZW9tZXRyeS52ZXJ0aWNlc1tqXSAtIGNlbnRlcltqICUgM107XG4gICAgICB9XG4gICAgICBhZGRCdWZmZXIoJ3ZlcnRpY2VzJywgdmVydGljZXMuYnVmZmVyKTtcbiAgICAgIHZhciBub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShnZW9tZXRyeS5ub3JtYWxzKTtcbiAgICAgIGFkZEJ1ZmZlcignbm9ybWFscycsIG5vcm1hbHMuYnVmZmVyKTtcbiAgICAgIHZhciBmYWNlcyA9IG5ldyBJbnQzMkFycmF5KGdlb21ldHJ5LmZhY2VzKTtcbiAgICAgIGFkZEJ1ZmZlcignZmFjZXMnLCBmYWNlcy5idWZmZXIpO1xuICAgICAgZ2VvbWV0cnkubW9ycGhUYXJnZXRzLmZvckVhY2goKGZ1bmN0aW9uKG1vcnBoVGFyZ2V0LCBtdCkge1xuICAgICAgICB2YXIgdmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KG1vcnBoVGFyZ2V0LnZlcnRpY2VzLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbW9ycGhUYXJnZXQudmVydGljZXMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICB2ZXJ0aWNlc1tqXSA9IG1vcnBoVGFyZ2V0LnZlcnRpY2VzW2pdIC0gY2VudGVyW2ogJSAzXTtcbiAgICAgICAgfVxuICAgICAgICBhZGRCdWZmZXIoJ21vcnBoLXZlcnRpY2VzJywgdmVydGljZXMuYnVmZmVyLCBtdCk7XG4gICAgICB9KSk7XG4gICAgICBnZW9tZXRyeS5tb3JwaE5vcm1hbHMuZm9yRWFjaCgoZnVuY3Rpb24obW9ycGhOb3JtYWwsIG10KSB7XG4gICAgICAgIHZhciBub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShtb3JwaE5vcm1hbC5ub3JtYWxzKTtcbiAgICAgICAgYWRkQnVmZmVyKCdtb3JwaC1ub3JtYWxzJywgbm9ybWFscy5idWZmZXIsIG10KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZSwgYnVmZmVycyk7XG4gIH0pKTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvVGhyZWVETW9kZWwtd29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNTQxYjU0MTAyMzE5YjZiMWEyMmM0ZDU5OTdmZjE3ZDcuanNcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZpbGUtbG9hZGVyIS4vYm93ZXJfY29tcG9uZW50cy90aHJlZS5qcy9idWlsZC90aHJlZS5taW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJUaHJlZURNb2RlbC13b3JrZXIuanMifQ==