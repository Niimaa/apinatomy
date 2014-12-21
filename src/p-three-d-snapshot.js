define(['jquery', './util/bacon-and-eggs.js', 'tweenjs'], function ($, Bacon, TWEEN) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-snapshot',
		resolves: ['three-d', 'snapshot'],
		requires: ['three-d-auto-controls']
	});


	plugin.insert('Snapshot.prototype.take', function () {

		if (!this.options.camera3D) { return }

		this.object.camera3D = {
			position: {
				x: this.circuitboard.camera3D.position.x,
				y: this.circuitboard.camera3D.position.y,
				z: this.circuitboard.camera3D.position.z
			},
			rotation: {
				x: this.circuitboard.camera3D.rotation.x,
				y: this.circuitboard.camera3D.rotation.y,
				z: this.circuitboard.camera3D.rotation.z
			},
			up: {
				x: this.circuitboard.camera3D.up.x,
				y: this.circuitboard.camera3D.up.y,
				z: this.circuitboard.camera3D.up.z
			},
			target: {
				x: this.circuitboard.camera3D.userData.target.x,
				y: this.circuitboard.camera3D.userData.target.y,
				z: this.circuitboard.camera3D.userData.target.z
			}
		};

	}).insert('Snapshot.prototype.restore', function () {

		if (!this.options.camera3D) { return }

		var easing = { duration: 800, easing: TWEEN.Easing.Sinusoidal.InOut };

		var from = this.circuitboard.camera3D;
		var to = this.object.camera3D;

		var tweenPosition = Bacon.tween(from.position,        to.position, easing);
		var tweenRotation = Bacon.tween(from.rotation,        to.rotation, easing);
		var tweenUp       = Bacon.tween(from.up,              to.up,       easing);
		var tweenTarget   = Bacon.tween(from.userData.target, to.target,   easing);

		return Bacon.mergeAll([
			tweenPosition.start(),
			tweenRotation.start(),
			tweenUp.start(),
			tweenTarget.start()
		]);

	});


});
