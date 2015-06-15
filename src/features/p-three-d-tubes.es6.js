define(['jquery', '../util/misc.es6.js', 'bluebird', 'three-js', '../util/kefir-and-eggs.es6.js'], ($, U, P, THREE, Kefir) => {
	'use strict';


	var plugin = $.circuitboard.plugin.do('three-d-tubes', {
		requires: ['three-d']
	});

	// TODO: general translation mechanism between d3 and three.js coordinates
	const tY = (cb, y) => (cb.size.height - y - 2); // TODO: magic nr '2' has to do with borders/padding

	/* convenience definitions ****************************************************/
	function bezierMesh(cb, edge, color) {
		let geometry = new THREE.Geometry();
		var result = new THREE.Mesh(
			geometry,
			new THREE.MeshLambertMaterial({ color: color })
		);
		result.receiveShadow = true;
		result.castShadow    = true;

		result._amy_interface = {
			removeTube: () => {
				cb.object3D.remove(result);
			},
			updateTube: () => {

				const v3 = (v) => new THREE.Vector3(v.x, tY(cb, v.y), v.z);

				/* control point distance */ // TODO: optimize for aesthetics (http://stackoverflow.com/q/30424772/681588)
				let cpd = { source: 0.45, target: 0.45 };

				const other = (d) => (d === 'source' ? 'target' : 'source');

				const vForce3 = (direction) => {
					let force = new THREE.Vector3(0, 0, 0);
					if (edge[direction].value.location === 'inter-tile') {
						for (let pred of edge[direction].verticesTo()) {
							let contribution = v3(pred).sub(v3(edge[direction].value.d3Vertex)).normalize();
							if (direction === 'source') { contribution.negate() }
							force.add(contribution);
						}
						for (let succ of edge[direction].verticesFrom()) {
							let contribution = v3(succ).sub(v3(edge[direction].value.d3Vertex)).normalize();
							if (direction === 'target') { contribution.negate() }
							force.add(contribution);
						}
					} else {
						force.setZ(2); // 'straight up' counts twice
						force.add(v3(edge[other(direction)].value.d3Vertex).sub(v3(edge[direction].value.d3Vertex)).normalize());
						//force.add(vec3[(direction)].sub(vec3[other(direction)]).normalize());
					}
					force.normalize();
					force.setLength(cpd[direction] * v3(edge.source.value.d3Vertex).distanceTo(v3(edge.target.value.d3Vertex)));
					return force;
				};

				console.log(edge.source.key, edge.source.value.d3Vertex); // TODO

				var V = [
					v3(edge.source.value.d3Vertex),
					v3(edge.source.value.d3Vertex).add(vForce3('source')),
					v3(edge.target.value.d3Vertex).add(vForce3('target')),
					v3(edge.target.value.d3Vertex)
				];
				result.geometry.dispose();
				let curve = new THREE.CubicBezierCurve3(...V);
				result.geometry = cb._tubeGeometry(curve);

				return { curve };

			}
		};

		return result;
	}


	plugin.add('Circuitboard.prototype._tubeGeometry', function (curve) {
		const TUBE_WIDTH = 2;
		return new THREE.TubeGeometry(
			curve,
			//Math.ceil(V[0].distanceTo(V[3]) / 25),
			25,
			TUBE_WIDTH
		);
	});


	plugin.add('Circuitboard.prototype.newTubeFromVertexToVertex', function (edge, color) {

		var tube = bezierMesh(this, edge, color);
		this.object3D.add(tube);

		return tube._amy_interface;

	});


});
