importScripts('https://cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.12/bluebird.min.js');
addEventListener('message', (function($__1) {
  var data = $__1.data;
  if (data.type === 'filenames') {
    loadGeometryFiles(data.filenames);
  }
}));
function loadGeometryFiles(filenames) {
  var $__0 = this;
  P.all(filenames).map((function(filename) {
    return new P((function(resolve, reject) {
      var url = ("http://localhost:61234/apinatomy-core/dist/example/" + filename);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200 || xhr.status === 0) {
            var result = JSON.parse(xhr.responseText);
            result.file = filename;
            resolve(result);
          } else {
            reject(("Couldn't load \"" + url + "\" (" + xhr.status + ")"));
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.withCredentials = $__0.withCredentials;
      xhr.send(null);
    }));
  })).then((function(geometries) {
    var message = {
      type: 'geometryBuffers',
      buffers: [],
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
      function addBuffer(type, buffer, index) {
        message.buffers.push({
          file: geometry.file,
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
