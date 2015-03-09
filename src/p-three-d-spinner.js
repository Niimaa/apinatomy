define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./util/misc.js'
], function ($, THREE, P, Kefir, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-spinner',
		requires: ['three-d']
	}).modify('Tile.prototype');


	/* standard sphere to copy for the spinner */
	var sphere = (() => {
		var geometry = new THREE.SphereGeometry(7, 32, 32);
		var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
		var result = new THREE.Mesh(geometry, material);
		result.receiveShadow = false;
		result.castShadow = true;
		result.position.z = 25;
		return result;
	})();


	/* a method on a tile to display a loading indicator */
	plugin.add('loadingIndicator', function ({ until }) {

		/* only display a loading indicator if the 'until' promise is still pending */
		if (!until.isPending()) { return }

		/* create the base spinner object and put it in the 3D scene */
		var spinner = new THREE.Object3D();
		this.object3D.add(spinner);

		/* create 8 spheres */
		for (var angle = 0; angle < 2*Math.PI; angle += 2*Math.PI / 8) {
			var obj = sphere.clone();
			var tra = new THREE.Matrix4().makeTranslation(0, 24, 40);
			var rot = new THREE.Matrix4().makeRotationZ(-angle);
			obj.applyMatrix(tra);
			obj.applyMatrix(rot);
			spinner.add(obj);
		}

		/* spin the spinner until the given 'until' promise is resolved */
		Kefir.repeatedly(100, [0,1,2,3,4,5,6,7]).takeUntilBy(Kefir.fromPromise(until)).onValue((i) => {
			for (var s = 0; s < 8; s += 1) {
				var sphere = spinner.children[(i+s)%8];
				sphere.scale.x =
				sphere.scale.y =
				sphere.scale.z = s / 8;
			}
		});

		/* remove the spinner when the given 'until' promise is resolved */
		P.resolve(until).then(() => { this.object3D.remove(spinner) });

	});


});
