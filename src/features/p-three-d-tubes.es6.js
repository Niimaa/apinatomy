define(['jquery', '../util/misc.es6.js', 'bluebird', 'three-js', '../util/kefir-and-eggs.es6.js'], ($, U, P, THREE, Kefir) => {
	'use strict';


	var plugin = $.circuitboard.plugin.do('three-d-tubes', {
		requires: ['three-d']
	});


	/* convenience definitions ****************************************************/
	var rotate90 = new THREE.Matrix4().makeRotationX(0.5*Math.PI);
	function cylinder(vstart, vend, thickness) {
		var result = new THREE.CylinderGeometry(thickness, thickness, vstart.distanceTo(vend), 15);
		var position = vend.clone().add(vstart).divideScalar(2);
		result.applyMatrix(rotate90);
		result.applyMatrix(new THREE.Matrix4().lookAt(vstart, vend ,new THREE.Vector3(0, 1, 0)));
		result.applyMatrix(new THREE.Matrix4().setPosition(position));
		return result;
	}
	function sphere(position, radius) {
		var result = new THREE.SphereGeometry(radius, 10, 10);
		result.applyMatrix(new THREE.Matrix4().setPosition(position));
		return result;
	}
	function mesh(geometry, color) {
		var result = new THREE.Mesh(
			geometry,
			new THREE.MeshLambertMaterial({ color: color })
		);
		result.receiveShadow = false;
		result.castShadow    = true;
		return result;
	}


	plugin.add('Circuitboard.prototype._tubeGeometry', function (V) {
		var TUBE_WIDTH = 4;
		return new THREE.TubeGeometry(
			new THREE.CubicBezierCurve3(V[0], V[1], V[2], V[3]),
			Math.ceil(V[0].distanceTo(V[3]) / 25),
			TUBE_WIDTH
		);
	});


	plugin.add('Circuitboard.prototype._newTube', function (color) {

		/* return the mesh */
		return mesh(new THREE.Geometry(), color);

	});


	plugin.add('Circuitboard.prototype.newTubeFromTileToTile', function (id1, id2, color) {
		P.all([this.tile(id1), this.tile(id2)]).then(([tile1, tile2]) => {

			var newGeometry = (c1, c2) => {
				var start = tile1.object3D.position;
				var end   = tile2.object3D.position;
				var dist  = start.distanceTo(end);
				var V = [
					start,
					start.clone().add(new THREE.Vector3(0, 0, c1 * dist)),
					end  .clone().add(new THREE.Vector3(0, 0, c2 * dist)),
					end
				];
				tube.geometry.dispose();
				tube.geometry = this._tubeGeometry(V);
			};

			var tube = this._newTube(color);
			this.object3D.add(tube);

			/* subtly animate the tubes */
			// TODO: at some point, we change this to a more global clock
			var clock = new THREE.Clock();
			var clockStream = Kefir.animationFrames().map(() => clock.getElapsedTime());
			clockStream.takeUntilBy(this.event('destroy')).onValue((time) => {
				var bla = 0.03 * Math.sin(0.8 * time * Math.PI);
				newGeometry(0.45 + bla, 0.45 - bla);
			});

		});
	});


	plugin.append('Circuitboard.prototype.construct', function () {
		this.p('threeDMode').value(true).take(1).onValue(() => {

			this.newTubeFromTileToTile('24tile:60000010', '24tile:60000001', 0xff0000);
			this.newTubeFromTileToTile('24tile:60000012', '24tile:60000010', 0x0000ff);
			this.newTubeFromTileToTile('24tile:60000005', '24tile:60000023', 0xff0000);






		});
	});



});
