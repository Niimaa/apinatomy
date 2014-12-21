define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/misc.js',
	'./util/bacon-and-eggs.js'
], function ($, THREE, P, U, Bacon) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-geometric-models',
		requires: ['three-d', 'tile-hidden']
	});


	/* convenience predicate functions */
	function isGeometry(v) { return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry }
	function isObject3D(v) { return v instanceof THREE.Object3D }
	function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1 }


	/* a function to load a 3D model from a filename and return a promise */
	function loadFile(descriptor) {

		var {file, color, animation} = descriptor;

		/* select the longest extension that fits the filename */
		// e.g., "points.json" has priority over "json"
		var ext = '';
		Object.keys($.circuitboard.Circuitboard.threeJsLoaders).forEach((extension) => {
			if (extension.length > ext.length) {
				if (endsWith(file, `.${extension}`)) {
					ext = extension;
				}
			}
		});

		/* was an extension found? */
		U.assert(ext.length > 0, `The file '${file}' is not recognized as a 3D model.`);

		/* fetch the loader for that file extension */
		var Loader = $.circuitboard.Circuitboard.threeJsLoaders[ext];

		/* sanity check */
		U.assert(U.isDefined(Loader), `Something went wrong loading the 3D model Loader.`);

		/* return a promise to the 3D object */
		return U.promisify(new Loader(), 'load')(file).then((obj) => {

			/* for now, we only accept Geometry's and Object3D's from a loader */
			U.assert(isGeometry(obj) || isObject3D(obj),
					`The 3D Loader for the '${ext}' extension returned an unsupported value.`);

			/* if a Geometry is returned, create an Object3D around it */
			if (isGeometry(obj)) {
				var geometry = obj;
				var material = new THREE.MeshLambertMaterial({ color: color || 'white' });
				material.side = THREE.DoubleSide;
				if (animation) {
					obj = new THREE.MorphAnimMesh(geometry, material);
					obj.duration = animation.duration;
					material.morphTargets = true;
					geometry.computeMorphNormals(obj);
				} else {
					obj = new THREE.Mesh(geometry, material);
				}
			}

			/* return the object */
			return obj;
		});
	}
	function loadParts(descriptor) {
		var INHERITED_PROPS = ['color', 'animation'];
		return P.all(descriptor.parts.map((part) => {
			INHERITED_PROPS.forEach((prop) => {
				if (U.isUndefined(part[prop])) { part[prop] = descriptor[prop] }
			});
			return load(part);
		})).reduce((parent, child) => { parent.add(child); return parent; }, new THREE.Object3D());
	}
	function load(descriptor) {
		var result;
		if (U.isDefined(descriptor.file)) { result = loadFile(descriptor) }
		if (U.isDefined(descriptor.parts)) { result = loadParts(descriptor) }
		return result.tap((obj) => { obj.userData.descriptor = descriptor });
	}


	function traverseGeometries(obj, fn) {
		obj.traverse((subObj) => {
			if (U.isUndefined(subObj.geometry)) { return }
			fn(subObj.geometry);
		});
	}


	/* to calculate overall bounding box of an object3D */
	function calculateBoundingBox(obj) {
		obj.userData.boundingBox = new THREE.Box3();
		traverseGeometries(obj, (geometry) => {
			geometry.morphTargets.concat([geometry]).forEach(({vertices}) => {
				vertices.forEach((point) => {
					obj.userData.boundingBox.expandByPoint(point);
				});
			});
		});
	}


	/* to center all the geometry of an object on its (0, 0, 0) point */
	function centerGeometries(obj) {
		var translation = obj.userData.boundingBox.center().negate();
		traverseGeometries(obj, (geometry) => {
			var matrix = new THREE.Matrix4().setPosition(translation);
			geometry.morphTargets.forEach(({vertices}) => {
				vertices.forEach((point) => {
					point.applyMatrix4(matrix);
				});
			});
			geometry.applyMatrix(matrix);
		});
	}

	/* an object where three.js loaders for different file formats can be plugged in */
	plugin.add('Circuitboard.threeJsLoaders', {});

	/* a method to start animating any 3D object with MorphAnimMeshes objects in it */
	plugin.add('Circuitboard.prototype._startThreeDAnimation', function (obj) {
		var clock = new THREE.Clock();
		var morphObjs = [];
		obj.traverse((subObj) => {
			if (subObj instanceof THREE.MorphAnimMesh) {
				morphObjs.push(subObj);
			}
		});
		Bacon.animationFrames().onValue(() => {
			var dTime = clock.getDelta();
			morphObjs.forEach((morphObj) => {
				morphObj.updateAnimation(1000 * dTime);
			});
		});
	});

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
						.all(threeDModels[model.id])
						.map(load)

					/* put them all in one parent Object3D object */
						.reduce((parent, child) => {
							parent.add(child);
							parent.userData.descriptor = child.userData.descriptor;
							return parent;
						}, new THREE.Object3D())

					/* reposition and resize the resulting object */
						.tap(calculateBoundingBox)
						.tap(centerGeometries)
						.tap((obj) => {
							this.on('size').takeWhile(this.on('visible')).onValue(() => {

								var ratio = Math.min(
									(this.size.width  / obj.userData.boundingBox.size().x),
									(this.size.height / obj.userData.boundingBox.size().y)
								) * 0.7;

								/* adjust size */
								obj.scale.set(ratio, ratio, ratio);

								/* adjust 'altitude' */
								var elevation = U.defOr(obj.userData.descriptor.elevation, Math.min(this.size.width, this.size.height) / 4);
								obj.position.z = 0.5 * ratio * obj.userData.boundingBox.size().z + elevation;
							});
						})

					/* add the object to the scene, centered on this tile */
						.tap((obj) => { this.object3D.add(obj) })
						.tap((obj) => { this.circuitboard._startThreeDAnimation(obj) });

			}
		});
	});


});
