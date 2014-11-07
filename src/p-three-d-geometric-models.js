define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/misc.js',
	'./util/STLLoader.js',
	'./p-three-d.scss'
], function ($, THREE, P, U) {
	'use strict';


	var INS = [
		[82.219498, 242.476196, -885.559998],
		[78.718399, 238.975403, -884.489990],
		[75.103500, 233.620499, -883.099976],
		[68.738403, 224.328293, -883.210022],
		[63.966999, 221.282104, -891.750000],
		[60.839298, 226.131607, -903.799988],
		[60.383801, 226.540802, -915.719971],
		[62.888802, 233.824493, -916.190002],
		[66.775101, 237.305298, -903.809998],
		[70.268303, 239.506699, -892.070007],
		[77.957298, 242.853302, -889.830017]
	];

	var ORI = [
		[154.204803, 253.666000, -805.049988],
		[151.022995, 244.242706, -792.969971],
		[144.466705, 231.028793, -776.880005],
		[135.275406, 225.154297, -759.580017],
		[117.309502, 215.278900, -754.809998],
		[98.797600, 206.572006, -756.719971],
		[89.583099, 200.459396, -760.130005],
		[96.805603, 209.238800, -747.140015],
		[113.046997, 218.312805, -742.419983],
		[130.261505, 227.384903, -738.900024],
		[139.662003, 235.667297, -738.210022],
		[151.663498, 247.396698, -739.460022],
		[158.901199, 255.473297, -744.760010],
		[163.253296, 262.639191, -753.280029],
		[165.305099, 266.495911, -762.469971],
		[163.675003, 265.863312, -775.549988],
		[162.146103, 265.692596, -787.099976],
		[159.199707, 261.318787, -797.280029]
	];


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-geometric-models',
		requires: ['three-d', 'tile-hidden']
	}).modify('Tile.prototype');


	plugin.append('construct', function () {

		if (!this.model) { return }

		this.model.then((model) => {
			if (model.id === 'fma:7187') {

				var stlLoader = new THREE.STLLoader();
				var load = U.promisify(stlLoader, 'load');

				/* load the 3D objects into the scene through a promise chain */
				P
					/* load the femur and iliac models */
						.all([
							load('../../3d-models/S034_CT1A_R_Femur_HR.stl'),
							load('../../3d-models/S034_CT1A_R_Iliac_HR.stl')
						])
					/* turn them into Object3D objects */
						.map((obj) => {
							var geometry = obj;
							var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
							obj = new THREE.Mesh(geometry, material);
							return obj;
						})
					/* add the connection markers */
						.tap((objs) => {
							INS.concat(ORI).forEach((coords) => {
								var geometry = new THREE.SphereGeometry(4, 32, 32);
								geometry.applyMatrix(new THREE.Matrix4()
										.setPosition(U.applyConstructor(THREE.Vector3, coords)));
								var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
								var mesh = new THREE.Mesh(geometry, material);
								objs.push(mesh);
							});
						})
					/* put them all in one parent Object3D object */
						.reduce((parent, child) => {
							parent.add(child);
							return parent;
						}, new THREE.Object3D())
					/* reposition and resize the resulting object */
						.tap((obj) => {

							/* calculate bounding box of object; used for several purposes */
							var boundingBox = null;
							obj.traverse(function (subObj) {
								var geometry = subObj.geometry;
								if (U.isUndefined(geometry)) { return }
								geometry.computeBoundingBox();
								if (boundingBox === null) {
									boundingBox = geometry.boundingBox;
								} else {
									boundingBox.union(geometry.boundingBox);
								}
							});

							/* normalize position */
							var translation = boundingBox.center().negate();
							obj.traverse(function (o) {
								if (o.geometry) {
									o.geometry.applyMatrix(new THREE.Matrix4().setPosition(translation));
								}
							});

							/* scale and elevate the model as the tile resizes */
							var resizeAndPosition = () => {
								/* adjust size */
								var ratio = Math.min(this.size.width / boundingBox.size().x,
												this.size.height / boundingBox.size().y) * 0.7;
								obj.scale.set(ratio, ratio, ratio);

								/* adjust 'altitude' */
								obj.position.z = 0.5 * ratio * boundingBox.size().z + 30;
							};
							var unsubscribe;
							this.observe('hidden', (hidden) => {
								if (hidden) {
									if (unsubscribe) { unsubscribe(); unsubscribe = undefined; }
								} else {
									unsubscribe = this.observe('size', resizeAndPosition);
								}
							});

						})
					/* add the object to the scene, centered on this tile */
						.then((obj) => { this.object3D.add(obj) });

			}
		});

	});


});
