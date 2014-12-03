define(['jquery', './util/misc.js', 'bluebird', 'bacon', 'three-js', 'tweenjs'], function ($, U, P, Bacon, THREE, TWEEN) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-auto-controls',
		requires: ['three-d']
	});


	plugin.add('Circuitboard.prototype.animateCameraTo', function (coordinatesOrTileId) {
		this.on('threeDMode', true).onValue(() => {

			var coordinates;
			if (typeof coordinatesOrTileId === 'string') { // tile id
				coordinates = this.tile(coordinatesOrTileId).then((tile) => {
					var pos = tile.position;
					var size = tile.size;
					return {
						x: pos.left + size.width / 2 - this.size.width / 2,
						y: -pos.top - size.height / 2 + this.size.height / 2
					};
				});
			} else {
				coordinates = P.resolve(coordinatesOrTileId);
			}

			coordinates.then((coords) => {

				var tween = (property, to, duration, easing, inout) => {
					return new TWEEN.Tween(this.camera3D[property])
							.to(to, duration * 1000)
							.easing(TWEEN.Easing[easing][inout]);
				};

				var initialZ = this.camera3D.position.z;

				var tweenXY = tween('position', coords, 0.8, 'Sinusoidal', 'Out');

				var tweenZ =   tween('position', { z: 1.5* initialZ }, 0.6,  'Sinusoidal', 'Out')
						.chain(tween('position', { z:      initialZ }, 0.2,  'Sinusoidal', 'In' ));

				tweenXY.start();
				tweenZ.start();

			});



		});
	}).append('Circuitboard.prototype.construct', function () {

		this.on('3d-render').assign(TWEEN, 'update');

		var tiles = [
			'24tile:60000001',
			'24tile:60000003',
			'24tile:60000020',
			'24tile:60000015'
		];
		var cTile = -1;
		function nextTile() {
			cTile = (cTile + 1) % tiles.length;
			return tiles[cTile];
		}


		// temporary test code; TODO: remove
		$(window).asEventStream('keypress').filter((e) => e.keyCode === 13).onValue(() => {
			this.animateCameraTo(nextTile());
		});

	});


});
