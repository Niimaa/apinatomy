var BASE = '//localhost:61234/apinatomy-core/dist/example'; // TODO: pass this URL in here somehow


importScripts('//cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.12/bluebird.min.js');
importScripts(`${BASE}/three.js`);


/* route incoming messages */
addEventListener('message', ({data:{ filenames }}) => {
	P.all(filenames).map((filename) => new P((resolve/*, reject*/) => {

		var loader = new THREE.JSONLoader();
		loader.load(`${BASE}/${filename}`, (geometry) => {
			geometry.originalFilename = filename;
			resolve(geometry);
		});

	})).tap((geometries) => {

		/* find the bounding box */
		var bbox = new THREE.Box3();
		geometries.forEach((geometry) => {
			geometry.vertices.forEach((v) => { bbox.expandByPoint(v) });
			(geometry.morphTargets || []).forEach(({vertices}) => {
				vertices.forEach((v) => { bbox.expandByPoint(v) });
			});
		});

		/* center the geometries */
		var cv = bbox.center().negate();
		var correctionMatrix = new THREE.Matrix4().makeTranslation(cv.x, cv.y, cv.z);
		geometries.forEach((geometry) => {
			geometry.vertices.forEach((v) => { v.applyMatrix4(correctionMatrix) });
			(geometry.morphTargets || []).forEach(({vertices}) => {
				vertices.forEach((v) => { v.applyMatrix4(correctionMatrix) });
			});
		});

		geometries.bbox = bbox;

	}).map((geometry) => {

		var bufferGeometry = new THREE.BufferGeometry();
		bufferGeometry.fromGeometry(geometry);
		bufferGeometry.originalFilename = geometry.originalFilename;

		geometry.morphTargets.forEach(({name, vertices}) => {
			var resultMorphTarget = { name, vertices: new Float32Array(vertices.length*3) };
			for (var i = 0; i < vertices.length; ++i) {
				resultMorphTarget.vertices[3*i    ] = vertices[i].x;
				resultMorphTarget.vertices[3*i + 1] = vertices[i].y;
				resultMorphTarget.vertices[3*i + 2] = vertices[i].z;
			}
			bufferGeometry.morphTargets.push(resultMorphTarget);
		});
		bufferGeometry.computeMorphNormals();
		return bufferGeometry;

	}).then((geometries) => {

		console.log(geometries.bbox);

		var buffers = [];
		geometries.forEach((geometry) => {
			buffers.push(geometry.attributes.normal.array.buffer);
			buffers.push(geometry.attributes.position.array.buffer);
			(geometry.morphTargets || []).forEach(({vertices}) => {
				buffers.push(vertices.buffer);
			});
			(geometry.morphNormals || []).forEach(({normals}) => {
				buffers.push(normals.buffer);
			});
		});

		/* send the message and buffers to the main thread */
		postMessage({ geometries }, buffers);

	});
});
