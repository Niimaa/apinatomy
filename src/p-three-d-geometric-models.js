define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/misc.js'
], function ($, THREE, P, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-geometric-models',
		requires: ['three-d', 'tile-hidden']
	});


	/* convenience predicate functions */
	function isGeometry(v) { return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry }
	function isFilename(v) { return typeof v === 'string' }
	function isCoordinates(v) { return Array.isArray(v) && v.length === 3 && v.every((c) => typeof c === 'number') }


	/* a function to load a 3D model from a filename and return a promise */
	function load(file) {
		var i = file.lastIndexOf('.');
		U.assert(i >= 0, `The filename '${file}' does not have a file extension.`);
		var ext = file.substr(i + 1);
		var Loader = $.circuitboard.Circuitboard.threeJsLoaders[ext];
		U.assert(U.isDefined(Loader), `The '${ext}' extension is not recognized as a 3D model.`);
		return U.promisify(new Loader(), 'load')(file).then((obj) => {
			if (isGeometry(obj)) {
				var geometry = obj;
				var material = new THREE.MeshLambertMaterial({ color: 'white' });
				obj = new THREE.Mesh(geometry, material);
			}
			return obj;
		});
	}


	/* to calculate overall bounding box of an object3D */
	function calculateBoundingBox(obj) {
		obj.userData.boundingBox = null;
		obj.traverse(function (subObj) {
			var geometry = subObj.geometry;
			if (U.isUndefined(geometry)) { return }
			geometry.computeBoundingBox();
			if (obj.userData.boundingBox === null) {
				obj.userData.boundingBox = geometry.boundingBox;
			} else {
				obj.userData.boundingBox.union(geometry.boundingBox);
			}
		});
	}


	/* to center all the geometry of an object on its (0, 0, 0) point */
	function centerGeometries(obj) {
		var translation = obj.userData.boundingBox.center().negate();
		obj.traverse(function (o) {
			if (o.geometry) {
				o.geometry.applyMatrix(new THREE.Matrix4().setPosition(translation));
			}
		});
	}


	/* an object where three.js loaders for different file formats can be plugged in */
	plugin.add('Circuitboard.threeJsLoaders', {});


	/* load any 3D models associated with a tile */
	plugin.insert('Tile.prototype.construct', function () {

		if (!this.model) { return }

		var threeDModels = this.circuitboard.options.threeDModels;

		if (!threeDModels) { return }

		this.model.then((model) => {
			if (U.isDefined(threeDModels[model.id])) {

				/* load the 3D objects into the scene through a promise chain */
				P

					/* load any 3D models from files */
						.all(threeDModels[model.id].filter(isFilename).map(load))

					/* add the connection markers */
						.tap((objs) => {
							threeDModels[model.id].filter(isCoordinates).forEach((coords) => {
								var geometry = new THREE.SphereGeometry(4, 32, 32);
								geometry.applyMatrix(new THREE.Matrix4()
										.setPosition(U.applyConstructor(THREE.Vector3, coords)));
								var material = new THREE.MeshLambertMaterial({ color: 'red' });
								var mesh = new THREE.Mesh(geometry, material);
								objs.push(mesh);
							});
						})

					/* put them all in one parent Object3D object */
						.reduce((parent, child) => { parent.add(child); return parent; }, new THREE.Object3D())

					/* reposition and resize the resulting object */
						.tap(calculateBoundingBox)
						.tap(centerGeometries)
						.tap((obj) => {
							this.on('size').takeWhile(this.on('visible')).onValue(() => {
								var ratio = Math.min(this.size.width / obj.userData.boundingBox.size().x,
												this.size.height / obj.userData.boundingBox.size().y) * 0.7;

								/* adjust size */
								obj.scale.set(ratio, ratio, ratio);

								/* adjust 'altitude' */
								obj.position.z = 0.5 * ratio * obj.userData.boundingBox.size().z + 30;
							});
						})

					/* add the object to the scene, centered on this tile */
						.then((obj) => { this.object3D.add(obj) });

			}
		});
	});


});
