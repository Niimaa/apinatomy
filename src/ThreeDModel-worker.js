var BASE = '//localhost:61234/apinatomy-core/dist/example'; // TODO: pass this URL in here somehow


importScripts('//cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.12/bluebird.min.js');
importScripts(`${BASE}/${require('../bower_components/three.js/build/three.min.js')}`);


/* route incoming messages */
addEventListener('message', ({ data }) => { // jshint ignore:line
	if (data.type === 'filenames') {
		loadGeometryFiles(data.filenames);
	}
});


/* call to load a geometry file and store a promise to it */
function loadGeometryFiles(filenames) {
	P.all(filenames).map((filename) => new P((resolve, reject) => {

		var loader = new THREE.BufferGeometryLoader();
		loader.load(`${BASE}/${filename}`, (bufferGeometry) => {
			bufferGeometry.computeVertexNormals();
			bufferGeometry.computeMorphNormals();
			resolve(bufferGeometry);
		});

	})).then((bufferGeometries) => {

		// TODO: rewrite based on already having buffergeometries

		var message = {
			type:        'geometryBuffers',
			geometries:  [],
			boundingBox: undefined,
			center:      undefined
		};
		var buffers = [];

		/* create the bounding-box */
		var bbox = message.boundingBox = (() => {
			var bbox = {
				min: [ Infinity,  Infinity,  Infinity],
				max: [-Infinity, -Infinity, -Infinity]
			};
			geometries.forEach((geometry) => {
				for (var i = 0; i < geometry.vertices.length; i += 1) {
					if (geometry.vertices[i] < bbox.min[i%3]) { bbox.min[i%3] = geometry.vertices[i] }
					if (geometry.vertices[i] > bbox.max[i%3]) { bbox.max[i%3] = geometry.vertices[i] }
				}
				geometry.morphTargets.forEach((morphTarget) => {
					for (var i = 0; i < morphTarget.vertices.length; i += 1) {
						if (morphTarget.vertices[i] < bbox.min[i%3]) { bbox.min[i%3] = morphTarget.vertices[i] }
						if (morphTarget.vertices[i] > bbox.max[i%3]) { bbox.max[i%3] = morphTarget.vertices[i] }
					}
				});
			});
			return bbox;
		})();

		/* calculate the center */
		var center = message.center = [
			0.5 * (bbox.min[0] + bbox.max[0]),
			0.5 * (bbox.min[1] + bbox.max[1]),
			0.5 * (bbox.min[2] + bbox.max[2])
		];

		/* create and emit (center-corrected) buffers */
		geometries.forEach((geometry) => {

			message.geometries.push({
				file: geometry.file,

			});

			/* to add a buffer to send to the main thread */
			function addBuffer(type, buffer, index) {
				message.buffers.push({ type, index, buffer });
				buffers.push(buffer);
			}

			/* vertices buffer */
			var vertices = new Float32Array(geometry.vertices.length);
			for (var j = 0; j < geometry.vertices.length; j += 1) {
				vertices[j] = geometry.vertices[j] - center[j%3];
			}
			addBuffer('vertices', vertices.buffer);

			/* normals buffer */
			var normals = new Float32Array(geometry.normals);
			addBuffer('normals', normals.buffer);

			/* faces buffer */
			var faces = new Int32Array(geometry.faces);
			addBuffer('faces', faces.buffer);

			/* morph-target vertices buffers */
			geometry.morphTargets.forEach((morphTarget, mt) => {
				var vertices = new Float32Array(morphTarget.vertices.length);
				for (var k = 0; k < morphTarget.vertices.length; k += 1) {
					vertices[j] = morphTarget.vertices[j] - center[j%3];
				}
				addBuffer('morph-vertices', vertices.buffer, mt);
			});

			/* morph-target normals buffers */
			geometry.morphNormals.forEach((morphNormal, mt) => {
				var normals = new Float32Array(morphNormal.normals);
				addBuffer('morph-normals', normals.buffer, mt);
			});

		});

		/* send the message and buffers to the main thread */
		postMessage(message, buffers);

	});
}
