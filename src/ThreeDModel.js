define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./Artefact.js',
	'bonobo'
], function ($, THREE, U, P, Kefir, ArtefactP, Bonobo) {
	'use strict';


	/* a promise to the new ThreeDModel class */
	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_ThreeDModel)) { return window._amy_ThreeDModel }


		/* create the class */
		var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel({rootThreeDModel, visible, file, parts}) {


			/* what is the 'root' 3D model? */
			if (U.isUndefined(rootThreeDModel)) { rootThreeDModel = this }
			this.rootThreeDModel = rootThreeDModel;


			/* the 'visible' and 'hidden' properties */
			this.newProperty('visible', { initial: visible });
			this.newProperty('hidden').plug(this.p('visible').not());
			this.p('visible').plug(this.p('hidden').not());


			/* create any ThreeDModels parts (without (yet) loading their object3D) */
			Object.keys(parts|| {}).map((id) => {

				/* define the options we want to pass to the corresponding child artefact */
				var newChildOptions = U.extend({}, parts[id], {
					id:              id,
					parent:          this,
					visible:         visible,
					rootThreeDModel: this.rootThreeDModel
				});
				['color', 'animation', 'clock'].forEach((prop) => {
					if (U.isUndefined(newChildOptions[prop])) {
						newChildOptions[prop] = this.options[prop];
					}
				});

				/* construct the child ThreeDModel */// jshint -W031
				new window._amy_ThreeDModel(newChildOptions);

			});


			if (this.rootThreeDModel === this) {
				this.p('visible').value(true).take(1).onValue(() => {
					this._loadWorker.then(() => {
						this._loadWorker.worker.run('allFilesRequested'); // TODO: ARE all files requested?
					});
				});
			}



			/* manifest the visibility of this model on the object3D */
			this.object3D.then((object3D) => {
				this.p('visible').merge(this.on('destroy').mapTo(false))
					.onValue((visible) => { object3D.visible = visible });
			});


		}, {

			get geometry3D() {
				if (!this._geometry3D) {
					this._geometry3D = new P((resolve, reject) => {
						if (U.isDefined(this.options.file)) {
							this.rootThreeDModel.p('visible').value(true).take(1).onValue(() => {

								/* resolve this promise by loading the proper file, when the root model first becomes visible */
								this._loadGeometryFromFile().then(resolve, reject);

							});
						} else {
							/* this ThreeDModel has no geometry */
							resolve(null);
						}
					});
				}
				return this._geometry3D;
			},


			get originalBoundingBox() {
				if (U.isUndefined(this._originalBoundingBox)) {
					this._originalBoundingBox = this._loadWorker.then((worker) => {
						return new P((resolve/*, reject*/) => {
							worker.on('bounding-box', resolve);
						}).then((bbox) => {
							return new THREE.Box3(
								new THREE.Vector3(bbox.min[0], bbox.min[1], bbox.min[2]),
								new THREE.Vector3(bbox.max[0], bbox.max[1], bbox.max[2])
							);
						});
					});
				}
				return this._originalBoundingBox;
			},


			get object3D() {
				if (!this._object3D) {
					this._object3D = new P((resolve, reject) => {
						if (U.isDefined(this.options.file)) { // we have loaded a file

							this.geometry3D.then((geometry3D) => {

								/* create material */
								var {animation, color} = this.options;
								var material = new THREE.MeshLambertMaterial({ color: color || 'white' });
								material.side = THREE.DoubleSide;

								/* create the object3D, either animated or not */
								var object;
								if (animation) {
									/* create a mesh that can be animated */
									object = new THREE.MorphAnimMesh(geometry3D, material);
									object.duration = animation.duration;
									material.morphTargets = true;
									//geometry3D.computeMorphNormals(); // TODO: can this be removed? Can we expect the morph-normals to be part of the geometry already?

									/* subscribe to the clock */
									var {clock} = this.options;
									var lastTime = 0;
									clock.takeUntilBy(this.event('destroy')).onValue((time) => {
										object.updateAnimation(1000 * (time - lastTime));
										lastTime = time;
									});
								} else {
									/* simple, static mesh */
									object = new THREE.Mesh(geometry3D, material);
								}
								return object;

							}).then(resolve, reject);

						} else { // this is a group with parts

							/* create base object3D for model parts */
							var object = new THREE.Object3D();

							/* whenever each part is loaded, add them as a child of the base object */
							this.children.map((part) => part.object3D).forEach((partObjectP) => {
								partObjectP.then((partObject) => { object.add(partObject) });
							});

							/* resolve this promise with the base object */
							P.all(this.children.map((part) => part.object3D)).each((subObject) => {
								object.add(subObject);
							}).return(object).then(resolve, reject);

						}
					});
				}
				return this._object3D;
			},


			adaptToSurfaceArea(size) {

				U.assert(this.rootThreeDModel === this,
					`The 'adaptToSurfaceArea' method should only be called on a root ThreeDModel.`);

				P.all([this.object3D, this.originalBoundingBox]).spread((obj, boundingBox) => {
					/* abbreviate 3D-object width and height */
					var objWidth = boundingBox.size().x;
					var objHeight = boundingBox.size().y;

					/* rotate 90° on the z-axis if this gives a better fit */
					if ((size.width < size.height) !== (objWidth < objHeight)) {
						obj.rotation.z = 0.5 * Math.PI;
						[objWidth, objHeight] = [objHeight, objWidth];
					} else {
						obj.rotation.z = 0;
					}

					/* determine the scale ratio */
					var ratio = 0.8 * Math.min(size.width / objWidth, size.height / objHeight);

					/* adjust size */
					obj.scale.set(ratio, ratio, ratio);

					/* any custom 'elevation' */
					var elevation = U.defOr(this.options.elevation, Math.min(size.width, size.height) / 4);
					obj.position.z = 0.5 * ratio * boundingBox.size().z + elevation;
				});

			},


			_loadGeometryFromFile() {
				return this._loadWorker.then((worker) => { // TODO:
					return new P((resolve) => {

						// TODO: listen to all the signals from the web-worker
						//worker.on(this.options.file, resolve);

						worker.run('loadGeometryFromJSON', { file: this.options.file });
					});
				}).then((geometryObj) => {
					var geometry = (new THREE.JSONLoader()).parse(geometryObj).geometry;
					return geometry;
				});
			},

			get _loadWorker() {
				if (this !== this.rootThreeDModel) {
					return this.rootThreeDModel._loadWorker;
				}
				if (U.isUndefined(this.__loadWorker)) {
					var worker = new Bonobo('three-d-model-loader:'+this.id);
					this.__loadWorker = P.resolve(worker
						.require(require('file!three-js'))
						.require(require('file!bluebird'))
						.hoist(() => {
							// jshint ignore:start

							var geometryPs = {}; // file -> P<geometry>

							// jshint ignore:end
						}).define('loadGeometryFromJSON', function ({file}) {
							// jshint ignore:start

							geometryPs[file] = new P((resolve, reject) => {
								var url = `http://localhost:61234/apinatomy-core/dist/example/${file}`; // TODO: pass this URL in here somehow
								var xhr = new XMLHttpRequest();
								xhr.onreadystatechange = function () {
									if ( xhr.readyState === xhr.DONE ) {
										if ( xhr.status === 200 || xhr.status === 0 ) {
											resolve(JSON.parse(xhr.responseText));
										} else {
											reject(`Couldn't load "${url}" (${xhr.status})`);
										}
									}
								};
								xhr.open( 'GET', url, true );
								xhr.withCredentials = this.withCredentials;
								xhr.send( null );
							});

							// jshint ignore:end
						}).define('allFilesRequested', function () {
							// jshint ignore:start

							/* get model structure */
							P.props(geometryPs).then((geometries) => {
								var structure = {};
								Object.keys(geometries).forEach((file) => {
									structure[file] = {
										morphTargetCount: geometries[file].morphTargets.length
									};
								});
								Bonobo.emit('model-structure', structure);
							});

							// jshint ignore:end
						}).define('createBuffers', function () {
							// jshint ignore:start

							/* initialize the bounding box */
							P.props(geometryPs).then((geometries) => {

								/* create the bounding-box */
								var bbox = {
									min: [ Infinity,  Infinity,  Infinity],
									max: [-Infinity, -Infinity, -Infinity]
								};
								Object.keys(geometries).forEach((file) => {
									for (var i = 0; i < geometries[file].vertices.length; i += 1) {
										if (geometries[file].vertices[i] < bbox.min[i%3]) { bbox.min[i%3] = geometries[file].vertices[i] }
										if (geometries[file].vertices[i] > bbox.max[i%3]) { bbox.max[i%3] = geometries[file].vertices[i] }
									}
									geometries[file].morphTargets.forEach((morphTarget) => {
										for (var i = 0; i < morphTarget.vertices.length; i += 1) {
											if (morphTarget.vertices[i] < bbox.min[i%3]) { bbox.min[i%3] = morphTarget.vertices[i] }
											if (morphTarget.vertices[i] > bbox.max[i%3]) { bbox.max[i%3] = morphTarget.vertices[i] }
										}
									});
								});
								Bonobo.emit('bounding-box', bbox);

								/* calculate the center */
								var center = [
									0.5 * (bbox.min[0] + bbox.max[0]),
									0.5 * (bbox.min[1] + bbox.max[1]),
									0.5 * (bbox.min[2] + bbox.max[2])
								];

								/* create and emit (center-corrected) buffers */
								Object.keys(geometries).forEach((file) => {
									/* vertices buffer */
									var vertices = new Float32Array(geometries[file].vertices.length);
									for (var j = 0; j < geometries[file].vertices.length; j += 1) {
										vertices[j] = geometries[file].vertices[j] - center[j%3];
									}
									Bonobo.emit(`${file}-vertices`, vertices.buffer);

									/* normals buffer */
									var normals = new Float32Array(geometries[file].normals);
									Bonobo.emit(`${file}-normals`, normals.buffer);

									/* morph-target vertices buffers */
									geometries[file].morphTargets.forEach((morphTarget, mt) => {
										var vertices = new Float32Array(morphTarget.vertices.length);
										for (var k = 0; k < morphTarget.vertices.length; k += 1) {
											vertices[j] = morphTarget.vertices[j] - center[j%3];
										}
										Bonobo.emit(`${file}-morph-${mt}-vertices`, vertices.buffer);
									});

									/* morph-target normals buffers */
									geometries[file].morphNormals.forEach((morphNormal, mt) => {
										var normals = new Float32Array(morphNormal.normals);
										Bonobo.emit(`${file}-morph-${mt}-normals`, normals.buffer);
									});
								});

							});

							// jshint ignore:end
						}).compile()).return(worker);

				}
				return this.__loadWorker;
			},


			/* UNCOMMENT THIS FOR HELP DEBUGGING OBJECT PLACEMENT */
			//_showVisibleBoundingBox() {
			//	if (this.rootThreeDModel === this) {
			//		var geometry = new THREE.BoxGeometry(1, 1, 1);
			//		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
			//		var box = new THREE.Mesh(geometry, material);
			//		this.object3D.then((object3D) => { object3D.add(box) });
			//		this.originalBoundingBox.then((bb) => {
			//			if (bb.empty()) { return }
			//			box.position.x = 0.5 * (bb.max.x + bb.min.x);
			//			box.position.y = 0.5 * (bb.max.y + bb.min.y);
			//			box.position.z = 0.5 * (bb.max.z + bb.min.z);
			//			box.scale.x = (bb.max.x - bb.min.x);
			//			box.scale.y = (bb.max.y - bb.min.y);
			//			box.scale.z = (bb.max.z - bb.min.z);
			//		});
			//	}
			//},


		}, {

			visible: false

		});


		/* static location to collect three.js loaders for different file formats */
		// TODO: transfer this task from Circuitboard to here, everywhere in the code
		window._amy_ThreeDModel.loaders = {};


		return window._amy_ThreeDModel;


	}).tap((c) => { $.circuitboard.ThreeDModel = c });


});



///* convenience predicate functions */
//function isGeometry(v) { return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry }
//function isObject3D(v) { return v instanceof THREE.Object3D }
//function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1 }


///* convenience function to visit all geometries in an Object3D */ // TODO: remove or use?
//function traverseGeometries(obj, fn) {
//	obj.traverse((subObj) => {
//		if (U.isUndefined(subObj.geometry)) { return }
//		fn(subObj.geometry);
//	});
//}
//function traverseMeshes(obj, fn) {
//	obj.traverse((subObj) => {
//		if (U.isDefined(subObj.geometry)) { fn(subObj) }
//	});
//}


////////// OLD: Extension-based loader selection; TODO: put back
///* select the longest extension that fits the filename */
//// e.g., "points.json" has priority over "json"
//var {file} = this.options;
//var ext = '';
//Object.keys($.circuitboard.Circuitboard.threeJsLoaders).forEach((extension) => {
//	if (extension.length > ext.length) {
//		if (endsWith(file, `.${extension}`)) {
//			ext = extension;
//		}
//	}
//});
//
///* was an extension found? */
//U.assert(ext.length > 0, `The file '${file}' is not recognized as a 3D model.`);
//
///* fetch the loader for that file extension */
//var Loader = $.circuitboard.Circuitboard.threeJsLoaders[ext];
//
///* sanity check */
//U.assert(U.isDefined(Loader), `Something went wrong retrieving the 3D model loader.`);
//
///* return a promise to the 3D object */
//return U.promisify(new Loader(), 'load')(file).then((geometry) => {
//
//	/* for now, we only accept Geometry's and Object3D's from a loader */
//	U.assert(isGeometry(geometry) || isObject3D(geometry),
//		`The 3D model loader for the '${ext}' extension returned an unsupported value.`);
//
//	/* if an Object3D is returned, take only its geometry */
//	if (!isGeometry(geometry)) { geometry = geometry.geometry || geometry.children[0].geometry }
//
//	/* return the object */
//	return geometry;
//
//});
