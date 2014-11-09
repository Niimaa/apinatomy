(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js")) : factory(root["jQuery"], root["THREE"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-geometric-models-stl',
	    requires: ['three-d-geometric-models']
	  });
	  plugin.add('Circuitboard.threeJsLoaders.stl', THREE.STLLoader);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(THREE) {
	  THREE.STLLoader = function() {};
	  THREE.STLLoader.prototype = {constructor: THREE.STLLoader};
	  THREE.STLLoader.prototype.load = function(url, callback) {
	    var scope = this;
	    var xhr = new XMLHttpRequest();
	    function onloaded(event) {
	      if (event.target.status === 200 || event.target.status === 0) {
	        var geometry = scope.parse(event.target.response || event.target.responseText);
	        scope.dispatchEvent({
	          type: 'load',
	          content: geometry
	        });
	        if (callback)
	          callback(geometry);
	      } else {
	        scope.dispatchEvent({
	          type: 'error',
	          message: 'Couldn\'t load URL [' + url + ']',
	          response: event.target.statusText
	        });
	      }
	    }
	    xhr.addEventListener('load', onloaded, false);
	    xhr.addEventListener('progress', function(event) {
	      scope.dispatchEvent({
	        type: 'progress',
	        loaded: event.loaded,
	        total: event.total
	      });
	    }, false);
	    xhr.addEventListener('error', function() {
	      scope.dispatchEvent({
	        type: 'error',
	        message: 'Couldn\'t load URL [' + url + ']'
	      });
	    }, false);
	    if (xhr.overrideMimeType)
	      xhr.overrideMimeType('text/plain; charset=x-user-defined');
	    xhr.open('GET', url, true);
	    xhr.responseType = 'arraybuffer';
	    xhr.send(null);
	  };
	  THREE.STLLoader.prototype.parse = function(data) {
	    var isBinary = function() {
	      var expect,
	          face_size,
	          n_faces,
	          reader;
	      reader = new DataView(binData);
	      face_size = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
	      n_faces = reader.getUint32(80, true);
	      expect = 80 + (32 / 8) + (n_faces * face_size);
	      return expect === reader.byteLength;
	    };
	    var binData = this.ensureBinary(data);
	    return isBinary() ? this.parseBinary(binData) : this.parseASCII(this.ensureString(data));
	  };
	  THREE.STLLoader.prototype.parseBinary = function(data) {
	    var reader = new DataView(data);
	    var faces = reader.getUint32(80, true);
	    var r,
	        g,
	        b,
	        hasColors = false,
	        colors;
	    var defaultR,
	        defaultG,
	        defaultB,
	        alpha;
	    for (var index = 0; index < 80 - 10; index++) {
	      if ((reader.getUint32(index, false) == 0x434F4C4F) && (reader.getUint8(index + 4) == 0x52) && (reader.getUint8(index + 5) == 0x3D)) {
	        hasColors = true;
	        colors = new Float32Array(faces * 3 * 3);
	        defaultR = reader.getUint8(index + 6) / 255;
	        defaultG = reader.getUint8(index + 7) / 255;
	        defaultB = reader.getUint8(index + 8) / 255;
	        alpha = reader.getUint8(index + 9) / 255;
	      }
	    }
	    var dataOffset = 84;
	    var faceLength = 12 * 4 + 2;
	    var offset = 0;
	    var geometry = new THREE.BufferGeometry();
	    var vertices = new Float32Array(faces * 3 * 3);
	    var normals = new Float32Array(faces * 3 * 3);
	    for (var face = 0; face < faces; face++) {
	      var start = dataOffset + face * faceLength;
	      var normalX = reader.getFloat32(start, true);
	      var normalY = reader.getFloat32(start + 4, true);
	      var normalZ = reader.getFloat32(start + 8, true);
	      if (hasColors) {
	        var packedColor = reader.getUint16(start + 48, true);
	        if ((packedColor & 0x8000) === 0) {
	          r = (packedColor & 0x1F) / 31;
	          g = ((packedColor >> 5) & 0x1F) / 31;
	          b = ((packedColor >> 10) & 0x1F) / 31;
	        } else {
	          r = defaultR;
	          g = defaultG;
	          b = defaultB;
	        }
	      }
	      for (var i = 1; i <= 3; i++) {
	        var vertexstart = start + i * 12;
	        vertices[offset] = reader.getFloat32(vertexstart, true);
	        vertices[offset + 1] = reader.getFloat32(vertexstart + 4, true);
	        vertices[offset + 2] = reader.getFloat32(vertexstart + 8, true);
	        normals[offset] = normalX;
	        normals[offset + 1] = normalY;
	        normals[offset + 2] = normalZ;
	        if (hasColors) {
	          colors[offset] = r;
	          colors[offset + 1] = g;
	          colors[offset + 2] = b;
	        }
	        offset += 3;
	      }
	    }
	    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
	    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
	    if (hasColors) {
	      geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
	      geometry.hasColors = true;
	      geometry.alpha = alpha;
	    }
	    return geometry;
	  };
	  THREE.STLLoader.prototype.parseASCII = function(data) {
	    var geometry,
	        length,
	        normal,
	        patternFace,
	        patternNormal,
	        patternVertex,
	        result,
	        text;
	    geometry = new THREE.Geometry();
	    patternFace = /facet([\s\S]*?)endfacet/g;
	    while ((result = patternFace.exec(data)) !== null) {
	      text = result[0];
	      patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
	      while ((result = patternNormal.exec(text)) !== null) {
	        normal = new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5]));
	      }
	      patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
	      while ((result = patternVertex.exec(text)) !== null) {
	        geometry.vertices.push(new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5])));
	      }
	      length = geometry.vertices.length;
	      geometry.faces.push(new THREE.Face3(length - 3, length - 2, length - 1, normal));
	    }
	    geometry.computeBoundingBox();
	    geometry.computeBoundingSphere();
	    return geometry;
	  };
	  THREE.STLLoader.prototype.ensureString = function(buf) {
	    if (typeof buf !== "string") {
	      var array_buffer = new Uint8Array(buf);
	      var str = '';
	      for (var i = 0; i < buf.byteLength; i++) {
	        str += String.fromCharCode(array_buffer[i]);
	      }
	      return str;
	    } else {
	      return buf;
	    }
	  };
	  THREE.STLLoader.prototype.ensureBinary = function(buf) {
	    if (typeof buf === "string") {
	      var array_buffer = new Uint8Array(buf.length);
	      for (var i = 0; i < buf.length; i++) {
	        array_buffer[i] = buf.charCodeAt(i) & 0xff;
	      }
	      return array_buffer.buffer || array_buffer;
	    } else {
	      return buf;
	    }
	  };
	  THREE.EventDispatcher.prototype.apply(THREE.STLLoader.prototype);
	  if (typeof DataView === 'undefined') {
	    DataView = function(buffer, byteOffset, byteLength) {
	      this.buffer = buffer;
	      this.byteOffset = byteOffset || 0;
	      this.byteLength = byteLength || buffer.byteLength || buffer.length;
	      this._isString = typeof buffer === "string";
	    };
	    DataView.prototype = {
	      _getCharCodes: function(buffer, start, length) {
	        start = start || 0;
	        length = length || buffer.length;
	        var end = start + length;
	        var codes = [];
	        for (var i = start; i < end; i++) {
	          codes.push(buffer.charCodeAt(i) & 0xff);
	        }
	        return codes;
	      },
	      _getBytes: function(length, byteOffset, littleEndian) {
	        var result;
	        if (littleEndian === undefined) {
	          littleEndian = this._littleEndian;
	        }
	        if (byteOffset === undefined) {
	          byteOffset = this.byteOffset;
	        } else {
	          byteOffset = this.byteOffset + byteOffset;
	        }
	        if (length === undefined) {
	          length = this.byteLength - byteOffset;
	        }
	        if (typeof byteOffset !== 'number') {
	          throw new TypeError('DataView byteOffset is not a number');
	        }
	        if (length < 0 || byteOffset + length > this.byteLength) {
	          throw new Error('DataView length or (byteOffset+length) value is out of bounds');
	        }
	        if (this.isString) {
	          result = this._getCharCodes(this.buffer, byteOffset, byteOffset + length);
	        } else {
	          result = this.buffer.slice(byteOffset, byteOffset + length);
	        }
	        if (!littleEndian && length > 1) {
	          if (!(result instanceof Array)) {
	            result = Array.prototype.slice.call(result);
	          }
	          result.reverse();
	        }
	        return result;
	      },
	      getFloat64: function(byteOffset, littleEndian) {
	        var b = this._getBytes(8, byteOffset, littleEndian),
	            sign = 1 - (2 * (b[7] >> 7)),
	            exponent = ((((b[7] << 1) & 0xff) << 3) | (b[6] >> 4)) - ((1 << 10) - 1),
	            mantissa = ((b[6] & 0x0f) * Math.pow(2, 48)) + (b[5] * Math.pow(2, 40)) + (b[4] * Math.pow(2, 32)) + (b[3] * Math.pow(2, 24)) + (b[2] * Math.pow(2, 16)) + (b[1] * Math.pow(2, 8)) + b[0];
	        if (exponent === 1024) {
	          if (mantissa !== 0) {
	            return NaN;
	          } else {
	            return sign * Infinity;
	          }
	        }
	        if (exponent === -1023) {
	          return sign * mantissa * Math.pow(2, -1022 - 52);
	        }
	        return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);
	      },
	      getFloat32: function(byteOffset, littleEndian) {
	        var b = this._getBytes(4, byteOffset, littleEndian),
	            sign = 1 - (2 * (b[3] >> 7)),
	            exponent = (((b[3] << 1) & 0xff) | (b[2] >> 7)) - 127,
	            mantissa = ((b[2] & 0x7f) << 16) | (b[1] << 8) | b[0];
	        if (exponent === 128) {
	          if (mantissa !== 0) {
	            return NaN;
	          } else {
	            return sign * Infinity;
	          }
	        }
	        if (exponent === -127) {
	          return sign * mantissa * Math.pow(2, -126 - 23);
	        }
	        return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
	      },
	      getInt32: function(byteOffset, littleEndian) {
	        var b = this._getBytes(4, byteOffset, littleEndian);
	        return (b[3] << 24) | (b[2] << 16) | (b[1] << 8) | b[0];
	      },
	      getUint32: function(byteOffset, littleEndian) {
	        return this.getInt32(byteOffset, littleEndian) >>> 0;
	      },
	      getInt16: function(byteOffset, littleEndian) {
	        return (this.getUint16(byteOffset, littleEndian) << 16) >> 16;
	      },
	      getUint16: function(byteOffset, littleEndian) {
	        var b = this._getBytes(2, byteOffset, littleEndian);
	        return (b[1] << 8) | b[0];
	      },
	      getInt8: function(byteOffset) {
	        return (this.getUint8(byteOffset) << 24) >> 24;
	      },
	      getUint8: function(byteOffset) {
	        return this._getBytes(1, byteOffset)[0];
	      }
	    };
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZGRkNzJiN2ZmYzE2MDViYzM0MyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1zdGwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL1NUTExvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUNDLHVCQUNBLHdCQUNBLHdCQUNELENBQUcsMENBQVUsRUFBRyxNQUFJLENBQUc7QUFDdEIsY0FBVyxDQUFDO0FBSVIsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRywrQkFBNkI7QUFDbkMsWUFBTyxDQUFHLEVBQUMsMEJBQXlCLENBQUM7QUFBQSxHQUN0QyxDQUFDLENBQUM7QUFJRixRQUFLLElBQUssQ0FBQyxpQ0FBZ0Ms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QVcsQ0FBQyxFQUFHLFdBQVMsQ0FBQyxDQUFFLEVBQUMsQ0FBQztPQUN4QztBQUFBLEtBRUQsQ0FBQztHQUVGO0FBR0QsRUFBQywrSUFBQztBQUdGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNkZGQ3MmI3ZmZjMTYwNWJjMzQzXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvU1RMTG9hZGVyLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRoZSBwbHVnaW4gKi9cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1zdGwnLFxuXHRcdHJlcXVpcmVzOiBbJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscyddXG5cdH0pO1xuXG5cblx0LyogdGhlIGxvYWRlciAqL1xuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMuc3RsJywgVEhSRUUuU1RMTG9hZGVyKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBhdXRob3IgYWxlZXBlciAvIGh0dHA6Ly9hZGFtbGVlcGVyLmNvbS9cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIGdlcm8zIC8gaHR0cHM6Ly9naXRodWIuY29tL2dlcm8zXG4gKlxuICogRGVzY3JpcHRpb246IEEgVEhSRUUgbG9hZGVyIGZvciBTVEwgQVNDSUkgZmlsZXMsIGFzIGNyZWF0ZWQgYnkgU29saWR3b3JrcyBhbmQgb3RoZXIgQ0FEIHByb2dyYW1zLlxuICpcbiAqIFN1cHBvcnRzIGJvdGggYmluYXJ5IGFuZCBBU0NJSSBlbmNvZGVkIGZpbGVzLCB3aXRoIGF1dG9tYXRpYyBkZXRlY3Rpb24gb2YgdHlwZS5cbiAqXG4gKiBMaW1pdGF0aW9uczpcbiAqICAgIEJpbmFyeSBkZWNvZGluZyBzdXBwb3J0cyBcIk1hZ2ljc1wiIGNvbG9yIGZvcm1hdCAoaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TVExfKGZpbGVfZm9ybWF0KSNDb2xvcl9pbl9iaW5hcnlfU1RMKS5cbiAqICAgIFRoZXJlIGlzIHBlcmhhcHMgc29tZSBxdWVzdGlvbiBhcyB0byBob3cgdmFsaWQgaXQgaXMgdG8gYWx3YXlzIGFzc3VtZSBsaXR0bGUtZW5kaWFuLW5lc3MuXG4gKiAgICBBU0NJSSBkZWNvZGluZyBhc3N1bWVzIGZpbGUgaXMgVVRGLTguIFNlZW1zIHRvIHdvcmsgZm9yIHRoZSBleGFtcGxlcy4uLlxuICpcbiAqIFVzYWdlOlxuICogICAgdmFyIGxvYWRlciA9IG5ldyBUSFJFRS5TVExMb2FkZXIoKTtcbiAqICAgIGxvYWRlci5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gKlxuICogXHRcdHZhciBnZW9tZXRyeSA9IGV2ZW50LmNvbnRlbnQ7XG4gKiBcdFx0c2NlbmUuYWRkKCBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnkgKSApO1xuICpcbiAqIFx0fSApO1xuICogICAgbG9hZGVyLmxvYWQoICcuL21vZGVscy9zdGwvc2xvdHRlZF9kaXNrLnN0bCcgKTtcbiAqXG4gKiBGb3IgYmluYXJ5IFNUTHMgZ2VvbWV0cnkgbWlnaHQgY29udGFpbiBjb2xvcnMgZm9yIHZlcnRpY2VzLiBUbyB1c2UgaXQ6XG4gKiAgLi4uIC8vIHVzZSB0aGUgc2FtZSBjb2RlIHRvIGxvYWQgU1RMIGFzIGFib3ZlXG4gKiAgdmFyIGdlb21ldHJ5ID0gZXZlbnQuY29udGVudDtcbiAqICBpZiAoZ2VvbWV0cnkuaGFzQ29sb3JzKSB7XG4gKiAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG9wYWNpdHk6IGdlb21ldHJ5LmFscGhhLCB2ZXJ0ZXhDb2xvcnM6IFRIUkVFLlZlcnRleENvbG9ycyB9KTtcbiAqICB9IGVsc2UgeyAuLi4uIH1cbiAqIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuICovXG5cblxuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5kZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblxuXG5cdFRIUkVFLlNUTExvYWRlciA9IGZ1bmN0aW9uICgpIHt9O1xuXG5cdFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUgPSB7XG5cblx0XHRjb25zdHJ1Y3RvcjogVEhSRUUuU1RMTG9hZGVyXG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuXG5cdFx0dmFyIHNjb3BlID0gdGhpcztcblxuXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdGZ1bmN0aW9uIG9ubG9hZGVkKGV2ZW50KSB7XG5cblx0XHRcdGlmIChldmVudC50YXJnZXQuc3RhdHVzID09PSAyMDAgfHwgZXZlbnQudGFyZ2V0LnN0YXR1cyA9PT0gMCkge1xuXG5cdFx0XHRcdHZhciBnZW9tZXRyeSA9IHNjb3BlLnBhcnNlKGV2ZW50LnRhcmdldC5yZXNwb25zZSB8fCBldmVudC50YXJnZXQucmVzcG9uc2VUZXh0KTtcblxuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2xvYWQnLCBjb250ZW50OiBnZW9tZXRyeSB9KTtcblxuXHRcdFx0XHRpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGdlb21ldHJ5KTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KHtcblx0XHRcdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0XHRcdG1lc3NhZ2U6ICdDb3VsZG5cXCd0IGxvYWQgVVJMIFsnICsgdXJsICsgJ10nLFxuXHRcdFx0XHRcdHJlc3BvbnNlOiBldmVudC50YXJnZXQuc3RhdHVzVGV4dFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWRlZCwgZmFsc2UpO1xuXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoeyB0eXBlOiAncHJvZ3Jlc3MnLCBsb2FkZWQ6IGV2ZW50LmxvYWRlZCwgdG90YWw6IGV2ZW50LnRvdGFsIH0pO1xuXG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogJ0NvdWxkblxcJ3QgbG9hZCBVUkwgWycgKyB1cmwgKyAnXScgfSk7XG5cblx0XHR9LCBmYWxzZSk7XG5cblx0XHRpZiAoeGhyLm92ZXJyaWRlTWltZVR5cGUpIHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cdFx0eGhyLnNlbmQobnVsbCk7XG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcblxuXG5cdFx0dmFyIGlzQmluYXJ5ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgZXhwZWN0LCBmYWNlX3NpemUsIG5fZmFjZXMsIHJlYWRlcjtcblx0XHRcdHJlYWRlciA9IG5ldyBEYXRhVmlldyhiaW5EYXRhKTtcblx0XHRcdGZhY2Vfc2l6ZSA9ICgzMiAvIDggKiAzKSArICgoMzIgLyA4ICogMykgKiAzKSArICgxNiAvIDgpO1xuXHRcdFx0bl9mYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xuXHRcdFx0ZXhwZWN0ID0gODAgKyAoMzIgLyA4KSArIChuX2ZhY2VzICogZmFjZV9zaXplKTtcblx0XHRcdHJldHVybiBleHBlY3QgPT09IHJlYWRlci5ieXRlTGVuZ3RoO1xuXG5cdFx0fTtcblxuXHRcdHZhciBiaW5EYXRhID0gdGhpcy5lbnN1cmVCaW5hcnkoZGF0YSk7XG5cblx0XHRyZXR1cm4gaXNCaW5hcnkoKVxuXHRcdFx0XHQ/IHRoaXMucGFyc2VCaW5hcnkoYmluRGF0YSlcblx0XHRcdFx0OiB0aGlzLnBhcnNlQVNDSUkodGhpcy5lbnN1cmVTdHJpbmcoZGF0YSkpO1xuXG5cdH07XG5cblx0VEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5wYXJzZUJpbmFyeSA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cblx0XHR2YXIgcmVhZGVyID0gbmV3IERhdGFWaWV3KGRhdGEpO1xuXHRcdHZhciBmYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xuXG5cdFx0dmFyIHIsIGcsIGIsIGhhc0NvbG9ycyA9IGZhbHNlLCBjb2xvcnM7XG5cdFx0dmFyIGRlZmF1bHRSLCBkZWZhdWx0RywgZGVmYXVsdEIsIGFscGhhO1xuXG5cdFx0Ly8gcHJvY2VzcyBTVEwgaGVhZGVyXG5cdFx0Ly8gY2hlY2sgZm9yIGRlZmF1bHQgY29sb3IgaW4gaGVhZGVyIChcIkNPTE9SPXJnYmFcIiBzZXF1ZW5jZSkuXG5cdFx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IDgwIC0gMTA7IGluZGV4KyspIHtcblxuXHRcdFx0aWYgKChyZWFkZXIuZ2V0VWludDMyKGluZGV4LCBmYWxzZSkgPT0gMHg0MzRGNEM0RiAvKkNPTE8qLykgJiZcblx0XHRcdFx0XHQocmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgNCkgPT0gMHg1MiAvKidSJyovKSAmJlxuXHRcdFx0XHRcdChyZWFkZXIuZ2V0VWludDgoaW5kZXggKyA1KSA9PSAweDNEIC8qJz0nKi8pKSB7XG5cblx0XHRcdFx0aGFzQ29sb3JzID0gdHJ1ZTtcblx0XHRcdFx0Y29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShmYWNlcyAqIDMgKiAzKTtcblxuXHRcdFx0XHRkZWZhdWx0UiA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDYpIC8gMjU1O1xuXHRcdFx0XHRkZWZhdWx0RyA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDcpIC8gMjU1O1xuXHRcdFx0XHRkZWZhdWx0QiA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDgpIC8gMjU1O1xuXHRcdFx0XHRhbHBoYSA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDkpIC8gMjU1O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBkYXRhT2Zmc2V0ID0gODQ7XG5cdFx0dmFyIGZhY2VMZW5ndGggPSAxMiAqIDQgKyAyO1xuXG5cdFx0dmFyIG9mZnNldCA9IDA7XG5cblx0XHR2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdHZhciB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XG5cdFx0dmFyIG5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KGZhY2VzICogMyAqIDMpO1xuXG5cdFx0Zm9yICh2YXIgZmFjZSA9IDA7IGZhY2UgPCBmYWNlczsgZmFjZSsrKSB7XG5cblx0XHRcdHZhciBzdGFydCA9IGRhdGFPZmZzZXQgKyBmYWNlICogZmFjZUxlbmd0aDtcblx0XHRcdHZhciBub3JtYWxYID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQsIHRydWUpO1xuXHRcdFx0dmFyIG5vcm1hbFkgPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCArIDQsIHRydWUpO1xuXHRcdFx0dmFyIG5vcm1hbFogPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCArIDgsIHRydWUpO1xuXG5cdFx0XHRpZiAoaGFzQ29sb3JzKSB7XG5cblx0XHRcdFx0dmFyIHBhY2tlZENvbG9yID0gcmVhZGVyLmdldFVpbnQxNihzdGFydCArIDQ4LCB0cnVlKTtcblxuXHRcdFx0XHRpZiAoKHBhY2tlZENvbG9yICYgMHg4MDAwKSA9PT0gMCkgeyAvLyBmYWNldCBoYXMgaXRzIG93biB1bmlxdWUgY29sb3JcblxuXHRcdFx0XHRcdHIgPSAocGFja2VkQ29sb3IgJiAweDFGKSAvIDMxO1xuXHRcdFx0XHRcdGcgPSAoKHBhY2tlZENvbG9yID4+IDUpICYgMHgxRikgLyAzMTtcblx0XHRcdFx0XHRiID0gKChwYWNrZWRDb2xvciA+PiAxMCkgJiAweDFGKSAvIDMxO1xuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0ciA9IGRlZmF1bHRSO1xuXHRcdFx0XHRcdGcgPSBkZWZhdWx0Rztcblx0XHRcdFx0XHRiID0gZGVmYXVsdEI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIHZlcnRleHN0YXJ0ID0gc3RhcnQgKyBpICogMTI7XG5cblx0XHRcdFx0dmVydGljZXNbb2Zmc2V0XSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0LCB0cnVlKTtcblx0XHRcdFx0dmVydGljZXNbb2Zmc2V0ICsgMV0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDQsIHRydWUpO1xuXHRcdFx0XHR2ZXJ0aWNlc1tvZmZzZXQgKyAyXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgOCwgdHJ1ZSk7XG5cblx0XHRcdFx0bm9ybWFsc1tvZmZzZXRdID0gbm9ybWFsWDtcblx0XHRcdFx0bm9ybWFsc1tvZmZzZXQgKyAxXSA9IG5vcm1hbFk7XG5cdFx0XHRcdG5vcm1hbHNbb2Zmc2V0ICsgMl0gPSBub3JtYWxaO1xuXG5cdFx0XHRcdGlmIChoYXNDb2xvcnMpIHtcblx0XHRcdFx0XHRjb2xvcnNbb2Zmc2V0XSA9IHI7XG5cdFx0XHRcdFx0Y29sb3JzW29mZnNldCArIDFdID0gZztcblx0XHRcdFx0XHRjb2xvcnNbb2Zmc2V0ICsgMl0gPSBiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0b2Zmc2V0ICs9IDM7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlcnRpY2VzLCAzKSk7XG5cdFx0Z2VvbWV0cnkuYWRkQXR0cmlidXRlKCdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5vcm1hbHMsIDMpKTtcblxuXHRcdGlmIChoYXNDb2xvcnMpIHtcblx0XHRcdGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpO1xuXHRcdFx0Z2VvbWV0cnkuaGFzQ29sb3JzID0gdHJ1ZTtcblx0XHRcdGdlb21ldHJ5LmFscGhhID0gYWxwaGE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGdlb21ldHJ5O1xuXG5cdH07XG5cblx0VEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5wYXJzZUFTQ0lJID0gZnVuY3Rpb24gKGRhdGEpIHtcblxuXHRcdHZhciBnZW9tZXRyeSwgbGVuZ3RoLCBub3JtYWwsIHBhdHRlcm5GYWNlLCBwYXR0ZXJuTm9ybWFsLCBwYXR0ZXJuVmVydGV4LCByZXN1bHQsIHRleHQ7XG5cdFx0Z2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcblx0XHRwYXR0ZXJuRmFjZSA9IC9mYWNldChbXFxzXFxTXSo/KWVuZGZhY2V0L2c7XG5cblx0XHR3aGlsZSAoKCByZXN1bHQgPSBwYXR0ZXJuRmFjZS5leGVjKGRhdGEpICkgIT09IG51bGwpIHtcblxuXHRcdFx0dGV4dCA9IHJlc3VsdFswXTtcblx0XHRcdHBhdHRlcm5Ob3JtYWwgPSAvbm9ybWFsW1xcc10rKFtcXC0rXT9bMC05XStcXC4/WzAtOV0qKFtlRV1bXFwtK10/WzAtOV0rKT8pK1tcXHNdKyhbXFwtK10/WzAtOV0qXFwuP1swLTldKyhbZUVdW1xcLStdP1swLTldKyk/KStbXFxzXSsoW1xcLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPykrL2c7XG5cblx0XHRcdHdoaWxlICgoIHJlc3VsdCA9IHBhdHRlcm5Ob3JtYWwuZXhlYyh0ZXh0KSApICE9PSBudWxsKSB7XG5cblx0XHRcdFx0bm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMocGFyc2VGbG9hdChyZXN1bHRbMV0pLCBwYXJzZUZsb2F0KHJlc3VsdFszXSksIHBhcnNlRmxvYXQocmVzdWx0WzVdKSk7XG5cblx0XHRcdH1cblxuXHRcdFx0cGF0dGVyblZlcnRleCA9IC92ZXJ0ZXhbXFxzXSsoW1xcLStdP1swLTldK1xcLj9bMC05XSooW2VFXVtcXC0rXT9bMC05XSspPykrW1xcc10rKFtcXC0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bXFwtK10/WzAtOV0rKT8pK1tcXHNdKyhbXFwtK10/WzAtOV0qXFwuP1swLTldKyhbZUVdW1xcLStdP1swLTldKyk/KSsvZztcblxuXHRcdFx0d2hpbGUgKCggcmVzdWx0ID0gcGF0dGVyblZlcnRleC5leGVjKHRleHQpICkgIT09IG51bGwpIHtcblxuXHRcdFx0XHRnZW9tZXRyeS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHBhcnNlRmxvYXQocmVzdWx0WzFdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pLCBwYXJzZUZsb2F0KHJlc3VsdFs1XSkpKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRsZW5ndGggPSBnZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7XG5cblx0XHRcdGdlb21ldHJ5LmZhY2VzLnB1c2gobmV3IFRIUkVFLkZhY2UzKGxlbmd0aCAtIDMsIGxlbmd0aCAtIDIsIGxlbmd0aCAtIDEsIG5vcm1hbCkpO1xuXG5cdFx0fVxuXG5cdFx0Z2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cdFx0Z2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XG5cblx0XHRyZXR1cm4gZ2VvbWV0cnk7XG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmVuc3VyZVN0cmluZyA9IGZ1bmN0aW9uIChidWYpIHtcblxuXHRcdGlmICh0eXBlb2YgYnVmICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2YXIgYXJyYXlfYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcblx0XHRcdHZhciBzdHIgPSAnJztcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYnVmLmJ5dGVMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJheV9idWZmZXJbaV0pOyAvLyBpbXBsaWNpdGx5IGFzc3VtZXMgbGl0dGxlLWVuZGlhblxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGJ1Zjtcblx0XHR9XG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmVuc3VyZUJpbmFyeSA9IGZ1bmN0aW9uIChidWYpIHtcblxuXHRcdGlmICh0eXBlb2YgYnVmID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2YXIgYXJyYXlfYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmxlbmd0aCk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcnJheV9idWZmZXJbaV0gPSBidWYuY2hhckNvZGVBdChpKSAmIDB4ZmY7IC8vIGltcGxpY2l0bHkgYXNzdW1lcyBsaXR0bGUtZW5kaWFuXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYXJyYXlfYnVmZmVyLmJ1ZmZlciB8fCBhcnJheV9idWZmZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBidWY7XG5cdFx0fVxuXG5cdH07XG5cblx0VEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hcHBseShUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlKTtcblxuXHRpZiAodHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJykge1xuXG5cdFx0RGF0YVZpZXcgPSBmdW5jdGlvbiAoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG5cblx0XHRcdHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0dGhpcy5ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldCB8fCAwO1xuXHRcdFx0dGhpcy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aCB8fCBidWZmZXIubGVuZ3RoO1xuXHRcdFx0dGhpcy5faXNTdHJpbmcgPSB0eXBlb2YgYnVmZmVyID09PSBcInN0cmluZ1wiO1xuXG5cdFx0fVxuXG5cdFx0RGF0YVZpZXcucHJvdG90eXBlID0ge1xuXG5cdFx0XHRfZ2V0Q2hhckNvZGVzOiBmdW5jdGlvbiAoYnVmZmVyLCBzdGFydCwgbGVuZ3RoKSB7XG5cdFx0XHRcdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblx0XHRcdFx0bGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5sZW5ndGg7XG5cdFx0XHRcdHZhciBlbmQgPSBzdGFydCArIGxlbmd0aDtcblx0XHRcdFx0dmFyIGNvZGVzID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29kZXMucHVzaChidWZmZXIuY2hhckNvZGVBdChpKSAmIDB4ZmYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjb2Rlcztcblx0XHRcdH0sXG5cblx0XHRcdF9nZXRCeXRlczogZnVuY3Rpb24gKGxlbmd0aCwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG5cblx0XHRcdFx0dmFyIHJlc3VsdDtcblxuXHRcdFx0XHQvLyBIYW5kbGUgdGhlIGxhY2sgb2YgZW5kaWFubmVzc1xuXHRcdFx0XHRpZiAobGl0dGxlRW5kaWFuID09PSB1bmRlZmluZWQpIHtcblxuXHRcdFx0XHRcdGxpdHRsZUVuZGlhbiA9IHRoaXMuX2xpdHRsZUVuZGlhbjtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBsYWNrIG9mIGJ5dGVPZmZzZXRcblx0XHRcdFx0aWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuXG5cdFx0XHRcdFx0Ynl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ynl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQ7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuXG5cdFx0XHRcdFx0bGVuZ3RoID0gdGhpcy5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRXJyb3IgQ2hlY2tpbmdcblx0XHRcdFx0aWYgKHR5cGVvZiBieXRlT2Zmc2V0ICE9PSAnbnVtYmVyJykge1xuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRGF0YVZpZXcgYnl0ZU9mZnNldCBpcyBub3QgYSBudW1iZXInKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGxlbmd0aCA8IDAgfHwgYnl0ZU9mZnNldCArIGxlbmd0aCA+IHRoaXMuYnl0ZUxlbmd0aCkge1xuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEYXRhVmlldyBsZW5ndGggb3IgKGJ5dGVPZmZzZXQrbGVuZ3RoKSB2YWx1ZSBpcyBvdXQgb2YgYm91bmRzJyk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmlzU3RyaW5nKSB7XG5cblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLl9nZXRDaGFyQ29kZXModGhpcy5idWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBsZW5ndGgpO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLmJ1ZmZlci5zbGljZShieXRlT2Zmc2V0LCBieXRlT2Zmc2V0ICsgbGVuZ3RoKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFsaXR0bGVFbmRpYW4gJiYgbGVuZ3RoID4gMSkge1xuXG5cdFx0XHRcdFx0aWYgKCEocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpKSB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJlc3VsdCk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQucmV2ZXJzZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ29tcGF0aWJpbGl0eSBmdW5jdGlvbnMgb24gYSBTdHJpbmcgQnVmZmVyXG5cblx0XHRcdGdldEZsb2F0NjQ6IGZ1bmN0aW9uIChieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcblxuXHRcdFx0XHR2YXIgYiA9IHRoaXMuX2dldEJ5dGVzKDgsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbiksXG5cblx0XHRcdFx0XHRcdHNpZ24gPSAxIC0gKDIgKiAoYls3XSA+PiA3KSksXG5cdFx0XHRcdFx0XHRleHBvbmVudCA9ICgoKChiWzddIDw8IDEpICYgMHhmZikgPDwgMykgfCAoYls2XSA+PiA0KSkgLSAoKDEgPDwgMTApIC0gMSksXG5cblx0XHRcdFx0Ly8gQmluYXJ5IG9wZXJhdG9ycyBzdWNoIGFzIHwgYW5kIDw8IG9wZXJhdGUgb24gMzIgYml0IHZhbHVlcywgdXNpbmcgKyBhbmQgTWF0aC5wb3coMikgaW5zdGVhZFxuXHRcdFx0XHRcdFx0bWFudGlzc2EgPSAoKGJbNl0gJiAweDBmKSAqIE1hdGgucG93KDIsIDQ4KSkgKyAoYls1XSAqIE1hdGgucG93KDIsIDQwKSkgKyAoYls0XSAqIE1hdGgucG93KDIsIDMyKSkgK1xuXHRcdFx0XHRcdFx0XHRcdChiWzNdICogTWF0aC5wb3coMiwgMjQpKSArIChiWzJdICogTWF0aC5wb3coMiwgMTYpKSArIChiWzFdICogTWF0aC5wb3coMiwgOCkpICsgYlswXTtcblxuXHRcdFx0XHRpZiAoZXhwb25lbnQgPT09IDEwMjQpIHtcblx0XHRcdFx0XHRpZiAobWFudGlzc2EgIT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybiBOYU47XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBzaWduICogSW5maW5pdHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGV4cG9uZW50ID09PSAtMTAyMykgeyAvLyBEZW5vcm1hbGl6ZWRcblx0XHRcdFx0XHRyZXR1cm4gc2lnbiAqIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTEwMjIgLSA1Mik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gc2lnbiAqICgxICsgbWFudGlzc2EgKiBNYXRoLnBvdygyLCAtNTIpKSAqIE1hdGgucG93KDIsIGV4cG9uZW50KTtcblxuXHRcdFx0fSxcblxuXHRcdFx0Z2V0RmxvYXQzMjogZnVuY3Rpb24gKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuXG5cdFx0XHRcdHZhciBiID0gdGhpcy5fZ2V0Qnl0ZXMoNCwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSxcblxuXHRcdFx0XHRcdFx0c2lnbiA9IDEgLSAoMiAqIChiWzNdID4+IDcpKSxcblx0XHRcdFx0XHRcdGV4cG9uZW50ID0gKCgoYlszXSA8PCAxKSAmIDB4ZmYpIHwgKGJbMl0gPj4gNykpIC0gMTI3LFxuXHRcdFx0XHRcdFx0bWFudGlzc2EgPSAoKGJbMl0gJiAweDdmKSA8PCAxNikgfCAoYlsxXSA8PCA4KSB8IGJbMF07XG5cblx0XHRcdFx0aWYgKGV4cG9uZW50ID09PSAxMjgpIHtcblx0XHRcdFx0XHRpZiAobWFudGlzc2EgIT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybiBOYU47XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBzaWduICogSW5maW5pdHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGV4cG9uZW50ID09PSAtMTI3KSB7IC8vIERlbm9ybWFsaXplZFxuXHRcdFx0XHRcdHJldHVybiBzaWduICogbWFudGlzc2EgKiBNYXRoLnBvdygyLCAtMTI2IC0gMjMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHNpZ24gKiAoMSArIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTIzKSkgKiBNYXRoLnBvdygyLCBleHBvbmVudCk7XG5cdFx0XHR9LFxuXG5cdFx0XHRnZXRJbnQzMjogZnVuY3Rpb24gKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuXHRcdFx0XHR2YXIgYiA9IHRoaXMuX2dldEJ5dGVzKDQsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbik7XG5cdFx0XHRcdHJldHVybiAoYlszXSA8PCAyNCkgfCAoYlsyXSA8PCAxNikgfCAoYlsxXSA8PCA4KSB8IGJbMF07XG5cdFx0XHR9LFxuXG5cdFx0XHRnZXRVaW50MzI6IGZ1bmN0aW9uIChieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW50MzIoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSA+Pj4gMDtcblx0XHRcdH0sXG5cblx0XHRcdGdldEludDE2OiBmdW5jdGlvbiAoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG5cdFx0XHRcdHJldHVybiAodGhpcy5nZXRVaW50MTYoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSA8PCAxNikgPj4gMTY7XG5cdFx0XHR9LFxuXG5cdFx0XHRnZXRVaW50MTY6IGZ1bmN0aW9uIChieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcblx0XHRcdFx0dmFyIGIgPSB0aGlzLl9nZXRCeXRlcygyLCBieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pO1xuXHRcdFx0XHRyZXR1cm4gKGJbMV0gPDwgOCkgfCBiWzBdO1xuXHRcdFx0fSxcblxuXHRcdFx0Z2V0SW50ODogZnVuY3Rpb24gKGJ5dGVPZmZzZXQpIHtcblx0XHRcdFx0cmV0dXJuICh0aGlzLmdldFVpbnQ4KGJ5dGVPZmZzZXQpIDw8IDI0KSA+PiAyNDtcblx0XHRcdH0sXG5cblx0XHRcdGdldFVpbnQ4OiBmdW5jdGlvbiAoYnl0ZU9mZnNldCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZ2V0Qnl0ZXMoMSwgYnl0ZU9mZnNldClbMF07XG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdH1cblxuXG59KTtcblxuLyoganNoaW50IGlnbm9yZTplbmQgKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvU1RMTG9hZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzIn0=