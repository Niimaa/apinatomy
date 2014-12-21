define(['jquery', './util/misc.js', 'bluebird', './util/bacon-and-eggs.js', 'three-js', 'tweenjs'], function ($, U, P, Bacon, THREE, TWEEN) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-auto-controls',
		requires: ['three-d']
	});


	plugin.add('Circuitboard.prototype.animateCameraTo', function (coordinatesOrTileId) {

		return (typeof coordinatesOrTileId === 'string' ? this.tile(coordinatesOrTileId).then((tile) => {
			var pos = tile.position;
			var size = tile.size;
			return {
				x: pos.left + size.width / 2 - this.size.width / 2,
				y: -pos.top - size.height / 2 + this.size.height / 2
			};
		}) : P.resolve(coordinatesOrTileId)).then((coords) => {

			var initialZ = this.camera3D.position.z;

			var tweenXY = Bacon.tween(this.camera3D.position, coords, { duration: 800, easing: TWEEN.Easing.Sinusoidal.Out });
			var tweenZ = Bacon.tween(this.camera3D.position, { z: 1.5 * initialZ }, { duration: 600, easing: TWEEN.Easing.Sinusoidal.Out })
					.chain(Bacon.tween(this.camera3D.position, { z: initialZ }, { duration: 200, easing: TWEEN.Easing.Sinusoidal.In }));

			var animation = Bacon.mergeAll([
				tweenZ.start(),
				tweenXY.start()
			]);

			animation.onValue(({x, y}) => {
				this.camera3D.userData.target.x = x;
				this.camera3D.userData.target.y = y;
				this.camera3D.lookAt(this.camera3D.userData.target);
			});

			return animation;

		});

	}).append('Circuitboard.prototype.construct', function () {
		this.on('threeDMode', true).onValue(() => {

			this.on('3d-render').assign(TWEEN, 'update');

		});
	});


	plugin.insert('Snapshot.prototype.take', function () {

		if (this.options.camera3D) {
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
		}

	}).insert('Snapshot.prototype.restore', function () {

		var easing = { duration: 800, easing: TWEEN.Easing.Sinusoidal.InOut };

		var tweenPosition = Bacon.tween(this.circuitboard.camera3D.position,        this.object.camera3D.position, easing);
		var tweenRotation = Bacon.tween(this.circuitboard.camera3D.rotation,        this.object.camera3D.rotation, easing);
		var tweenUp       = Bacon.tween(this.circuitboard.camera3D.up,              this.object.camera3D.up,       easing);
		var tweenTarget   = Bacon.tween(this.circuitboard.camera3D.userData.target, this.object.camera3D.target,   easing);

		return Bacon.mergeAll([
			tweenPosition.start(),
			tweenRotation.start(),
			tweenUp.start(),
			tweenTarget.start()
		]);

	});


});
