define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./Artefact.js'
], function ($, THREE, U, P, Kefir, ArtefactP) {
	'use strict';


	/* convenience predicate functions */
	function isGeometry(v) { return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry }
	function isObject3D(v) { return v instanceof THREE.Object3D }
	function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1 }

	/* convenience function to visit all geometries in an Object3D */
	function traverseGeometries(obj, fn) {
		obj.traverse((subObj) => {
			if (U.isUndefined(subObj.geometry)) { return }
			fn(subObj.geometry);
		});
	}

	/* convenience function to calculate overall bounding box of an object3D */
	function calculateBoundingBox(obj) {
		obj.userData.boundingBox = new THREE.Box3();
		traverseGeometries(obj, (geometry) => {
			if (geometry instanceof THREE.BufferGeometry) {
				geometry.computeBoundingBox();
				obj.userData.boundingBox.expandByPoint(geometry.boundingBox.min);
				obj.userData.boundingBox.expandByPoint(geometry.boundingBox.max);
			}
			(geometry.morphTargets || []).concat([geometry]).forEach(({vertices}) => {
				(vertices || []).forEach((point) => {
					obj.userData.boundingBox.expandByPoint(point);
				});
			});
		});
	}

	/* convenience function to center all the geometry of an object on its (0, 0, 0) point */
	function startThreeDAnimation(obj) {
		var clock = new THREE.Clock();
		var morphObjs = [];
		obj.traverse((subObj) => {
			if (subObj instanceof THREE.MorphAnimMesh) {
				morphObjs.push(subObj);
			}
		});
		Kefir.animationFrames().onValue(() => {
			var dTime = clock.getDelta();
			morphObjs.forEach((morphObj) => {
				morphObj.updateAnimation(1000 * dTime);
			});
		});
	}


	/* a promise to the new ThreeDModel class */
	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_ThreeDModel)) { return window._amy_ThreeDModel }


		/* create the class */
		var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel({visible, parts}) {

			/* the 'visible' and 'hidden' properties */
			this.newProperty('visible', { initial: visible });
			this.newProperty('hidden').plug(this.p('visible').not());
			this.p('visible').plug(this.p('hidden').not());

			/* create all descendant ThreeDModel's (without necessarily loading their object3D) */
			Object.keys(parts|| {}).map((id) => {

				/* define the options we want to pass to the corresponding child artefact */
				var newChildOptions = U.extend({}, parts[id], {
					id:      id,
					parent:  this,
					visible: visible
				});
				['color', 'animation'].forEach((prop) => {
					if (U.isUndefined(newChildOptions[prop])) {
						newChildOptions[prop] = this.options[prop];
					}
				});

				/* construct the child ThreeDModel */// jshint -W031
				new window._amy_ThreeDModel(newChildOptions);

			});

		}, {


			get object3D() {
				if (!this._object3D) {
					/* create a promise to the Object3D */
					this._object3D = new P((resolve, reject) => {
						if (U.isDefined(this.options.file)) {

							/* resolve this promise by loading the proper file */
							this._loadFile()
								.tap(calculateBoundingBox) // TODO: propagate bounding box
								.tap((obj) => { // TODO: remove
									this._centerGeometries(obj);
								})
								.then(resolve, reject);

							// TODO: maybe, only load when model is first made visible

						} else {

							/* create base object3D for model parts */
							var object = new THREE.Object3D();

							/* whenever each part is loaded, add them as a child of the base object */
							this.children.map((part) => part.object3D).forEach((partObjectP) => {
								partObjectP.then((partObject) => { object.add(partObject) });
							});

							/* resolve this promise with the base object */
							resolve(object);

						}
					}).tap((object3D) => {
						/* manifest the visibility of this model on the object3D */
						this.p('visible').onValue((visible) => { object3D.visible = visible });
					});
				}
				return this._object3D;
			},



			adaptToSurfaceArea(size) {

			},

			adaptToTransformation() {

			},



			_loadFile() {
				var {file, color, animation} = this.options;

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
				U.assert(U.isDefined(Loader), `Something went wrong retrieving the 3D model loader.`);

				/* return a promise to the 3D object */
				return U.promisify(new Loader(), 'load')(file).then((obj) => {

					/* for now, we only accept Geometry's and Object3D's from a loader */
					U.assert(isGeometry(obj) || isObject3D(obj),
						`The 3D model loader for the '${ext}' extension returned an unsupported value.`);

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
			},




			//_load() {
			//
			//	var result = result
			//		/* process the geometries and center them on (0, 0, 0) */
			//		//.tap(calculateBoundingBox)
			//		.tap((obj) => { this._centerGeometries(obj) })
			//		/* resize / rotate the object based on the shape of the tile */
			//		.tap((obj) => {
			//			this.p('visible').value(true).flatMap(() =>
			//				this._tile.p('size').takeWhileBy(this.p('visible'))).onValue((size) => {
			//
			//				/* abbreviate 3D-object width and height */
			//				var objWidth = obj.userData.boundingBox.size().x;
			//				var objHeight = obj.userData.boundingBox.size().y;
			//
			//				/* rotate 90° on the z-axis if this gives a better fit */
			//				if ((size.width < size.height) !== (objWidth < objHeight)) {
			//					obj.rotation.z = 0.5 * Math.PI;
			//					[objWidth, objHeight] = [objHeight, objWidth];
			//				} else {
			//					obj.rotation.z = 0;
			//				}
			//
			//				/* determine the scale ratio */
			//				var ratio = 0.8 * Math.min(size.width / objWidth, size.height / objHeight);
			//
			//				/* adjust size */
			//				obj.scale.set(ratio, ratio, ratio);
			//
			//				/* adjust 'altitude' */
			//				var elevation = U.defOr(this.options.elevation, Math.min(size.width, size.height) / 4);
			//				obj.position.z = 0.5 * ratio * obj.userData.boundingBox.size().z + elevation;
			//
			//				/* any custom 'rotation'? */
			//				if (this.options.rotation) {
			//					U.extend(obj.rotation, this.options.rotation);
			//				}
			//
			//			});
			//		})
			//		/* back-link the artefact to the object3D */
			//		.tap((obj) => { obj.userData.artefact = this })
			//		/* add this object to the scene */
			//		.tap((obj) => {
			//			this._tile.object3D.add(obj);
			//		})
			//		/* start the animation of this object, if applicable */
			//		.tap(startThreeDAnimation);
			//
			//	return result;
			//},


			_centerGeometries(obj) {
				if (!this.geometryCorrection) { this.geometryCorrection = this.options.geometryCorrection }
				if (!this.geometryCorrection) { this.geometryCorrection = obj.userData.boundingBox.center().negate() }
				traverseGeometries(obj, (geometry) => {
					var matrix = new THREE.Matrix4().setPosition(this.geometryCorrection);
					(geometry.morphTargets || []).forEach(({vertices}) => {
						vertices.forEach((point) => {
							point.applyMatrix4(matrix);
						});
					});
					geometry.applyMatrix(matrix);
				});
			},

		}, {

			visible: false

		});


		/* static location to collect three.js loaders for different file formats */
		// TODO: transfer this task from Circuitboard to here, everywhere in the code
		window._amy_ThreeDModel.loaders = {};


		return window._amy_ThreeDModel;


	}).tap((c) => { $.circuitboard.ThreeDModel = c });



	//return ArtefactP.then((Artefact) => {
	//
	//	/* however (often) this is loaded, create the class only once */
	//	if (U.isDefined(window._amy_ThreeDModel)) { return window._amy_ThreeDModel }
	//
	//	var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel({descriptor, visible, surfaceArea, transformation}) {
	//
	//
	//
	//
	//		/* define the basic 3D object */
	//		this.object3D = new THREE.Object3D();
	//
	//
	//		/* the 'visible' and 'hidden' properties */
	//		this.newProperty('visible', { initial: visible });
	//		this.newProperty('hidden').plug(this.p('visible').not());
	//		this.p('visible').plug(this.p('hidden').not());
	//
	//
	//		/* link model visibility to Object3D visibility */
	//		this.p('visible').onValue((visible) => { this.object3D.visible = visible });
	//
	//
	//		/*  */
	//
	//
	//
	//
	//
	//	}, {
	//
	//
	//
	//	});
	//
	//	return window._amy_ThreeDModel;
	//
	//});




});
