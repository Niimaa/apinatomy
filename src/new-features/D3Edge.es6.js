import $     from 'jquery';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import ArtefactP from './Artefact.es6.js';


export default ArtefactP.then((Artefact) => {


	/* however (often) this is loaded, create the class only once */
	if (U.isDefined(window._amy_D3Edge)) { return window._amy_D3Edge }


	window._amy_D3Edge = Artefact.newSubclass('D3Edge', function D3Edge({source, target}) {

		// TODO: create line segment in 3D world to represent edge

		/* when one of the vertices is destroyed, so is this edge */
		this.source = source;
		this.target = target;
		Kefir.merge([this.source.on('destroy'), this.target.on('destroy')]).take(1).onValue(() => { this.destroy() });

		Kefir.combine([this.source.p('position'), this.target.p('position')]).onValue(([sPos, tPos]) => {
			// TODO: update object3D positioning
		});

	}, {

		///* 3D representation */
		//get object3d() {
		//	if (!this._object3d) {
		//
		//		/* create the 3D tube */
		//		this._object3d = this.circuitboard.newTubeFromVertexToVertex(this.graphEdge, 0xff0000);
		//		this.on('destroy').take(1).onValue(() => { this.object3d.removeTube() });
		//
		//
		//		/* create a flag */
		//		const layer = (offset, height, color) => {
		//			const WIDTH = 15;
		//			const DEPTH = 2;
		//			let geometry = new THREE.BoxGeometry(WIDTH, DEPTH, height);
		//			geometry.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(0, 0, -0.5 * height - offset - 1)));
		//			let material = new THREE.MeshPhongMaterial({ color });
		//			return new THREE.Mesh(geometry, material);
		//		};
		//
		//
		//		/* hang the flag off the 3D tube */
		//		let template = this.graphEdge.value.lyphTemplate;
		//		if (template) {
		//			this._flag = new THREE.Object3D();
		//			let currentOffset = 0;
		//			for (let l of template.layers) {
		//				let THICKNESS_FACTOR = 6;
		//				this._flag.add(layer(currentOffset, THICKNESS_FACTOR * l.thickness, THREE.Math.randInt(0x000000, 0xffffff)));
		//				currentOffset += THICKNESS_FACTOR + 0.1;
		//			}
		//			this.circuitboard.object3D.add(this._flag);
		//		}
		//
		//	}
		//
		//
		//	return this._object3d;
		//}

	}, {
		graphZIndex: 100,
		cssClass: ''
	});


	return window._amy_D3Edge;


}).tap((c) => { $.circuitboard.D3Edge = c });
