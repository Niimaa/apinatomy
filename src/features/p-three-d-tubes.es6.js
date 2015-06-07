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
				cb.object3D.remove(tube);
			},
			updateTube: () => {
				const v3 = (v) => new THREE.Vector3(v.x, tY(cb, v.y), v.z);

				//function vectorAverage(vectors) {
				//	let result = new THREE.Vector3();
				//	let count = 0;
				//	for (let v of vectors) {
				//		result.add(v);
				//		count += 1;
				//	}
				//	//result.divideScalar(count);
				//	return result;
				//}
				//function catmullRomToBezier(p1, p2, p3, p4) {
				//	return [
				//		p2,
				//		p2.clone().add(p3.clone().sub(p1).divideScalar(6)),
				//		p3.clone().sub(p4.clone().sub(p2).divideScalar(6)),
				//		p3
				//	];
				//}
				//result.geometry.dispose();
				//result.geometry = this._tubeGeometry(catmullRomToBezier(
				//	((vec)=>{
				//		if (edge.source.value.location === 'tile') {
				//			return vec.add(new THREE.Vector3(0, 0, -500)); // TODO: magic nr -500
				//		} else {
				//			return vectorAverage(
				//				[...edge.source.verticesTo()].map(v => v3(v).sub(vec))
				//			).add(vec);
				//		}
				//	})(v3(edge.source)),
				//	v3(edge.source),
				//	v3(edge.target),
				//	((vec)=>{
				//		if (edge.target.value.location === 'tile') {
				//			return vec.add(new THREE.Vector3(0, 0, -500)); // TODO: magic nr -500
				//		} else {
				//			return vectorAverage(
				//				[...edge.target.verticesFrom()].map(v => v3(v).sub(vec))
				//			).add(vec);
				//		}
				//	})(v3(edge.target))
				//));

				/* control point distance */ // TODO: optimize for aesthetics (http://stackoverflow.com/q/30424772/681588)
				let cpd = { source: 0.45, target: 0.45 };

				const other = (d) => (d === 'source' ? 'target' : 'source');

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
