define(['jquery', '../util/misc.es6.js', 'bluebird', 'three-js', '../util/kefir-and-eggs.es6.js'], ($, U, P, THREE, Kefir) => {
	'use strict';


	var plugin = $.circuitboard.plugin.do('three-d-tubes', {
		requires: ['three-d']
	});


	/* convenience definitions ****************************************************/
	function mesh(geometry, color) {
		var result = new THREE.Mesh(
			geometry,
			new THREE.MeshLambertMaterial({ color: color })
		);
		result.receiveShadow = true;
		result.castShadow    = true;
		return result;
	}


	plugin.add('Circuitboard.prototype._tubeGeometry', function (V) {
		var TUBE_WIDTH = 2;
		return new THREE.TubeGeometry(
			new THREE.CubicBezierCurve3(V[0], V[1], V[2], V[3]),
			Math.ceil(V[0].distanceTo(V[3]) / 25),
			TUBE_WIDTH
		);
	});


	plugin.add('Circuitboard.prototype.newTubeFromVertexToVertex', function (edge, color) {
		// TODO: general translation mechanism between d3 and three.js coordinates
		const tY = (y) => (this.size.height - y - 2); // TODO: magic nr '2' has to do with borders/padding

		var tube = mesh(new THREE.Geometry(), color);
		this.object3D.add(tube);

		return {
			removeTube: () => {
				this.object3D.remove(tube);
			},
			updateTube: () => {
				const v3 = (v) => new THREE.Vector3(v.x, tY(v.y), v.z);

				/* control point distance */ // TODO: optimize for aesthetics (http://stackoverflow.com/q/30424772/681588)
				let cpd = { source: 0.45, target: 0.45 };

				const other = (d) => d === 'source' ? 'target' : 'source';

				const vForce3 = (direction) => {
					let force = new THREE.Vector3(0, 0, 0);
					if (edge[direction].value.location === 'inter-tile') {
						for (let pred of edge[direction].verticesTo()) {
							let contribution = v3(pred).sub(v3(edge[direction])).normalize();
							if (direction === 'source') { contribution.negate() }
							force.add(contribution);
						}
						for (let succ of edge[direction].verticesFrom()) {
							let contribution = v3(succ).sub(v3(edge[direction])).normalize();
							if (direction === 'target') { contribution.negate() }
							force.add(contribution);
						}
					} else {
						force.setZ(2); // 'straight up' counts twice
						force.add(v3(edge[other(direction)]).sub(v3(edge[direction])).normalize());
						//force.add(vec3[(direction)].sub(vec3[other(direction)]).normalize());
					}
					force.normalize();
					force.setLength(cpd[direction] * v3(edge.source).distanceTo(v3(edge.target)));
					return force;
				};

				var V = [
					v3(edge.source),
					v3(edge.source).add(vForce3('source')),
					v3(edge.target).add(vForce3('target')),
					v3(edge.target)
				];
				tube.geometry.dispose();
				tube.geometry = this._tubeGeometry(V);
			}
		};

	});


});
