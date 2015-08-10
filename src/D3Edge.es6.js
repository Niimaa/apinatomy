define([
	'jquery',
	'three-js',
	'./util/misc.es6.js',
	'./util/kefir-and-eggs.es6.js',
	'./Artefact.es6.js',
	'./D3Edge.scss'
], function ($, THREE, U, Kefir, ArtefactP) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_D3Edge)) { return window._amy_D3Edge }


		window._amy_D3Edge = Artefact.newSubclass('D3Edge', function D3Edge({source, target, graphEdge, visible}) {

			/* when one of the vertices is destroyed, so is this edge */
			this.source = source;
			this.target = target;
			this.graphEdge = graphEdge;
			Kefir.merge([ this.source.on('destroy'), this.target.on('destroy') ]).take(1).onValue(() => {
				this.destroy();
			});

			/* the 'visible' and 'hidden' properties */
			this.newProperty('visible', { initial: visible });
			this.newProperty('hidden').plug(this.p('visible').not());
			this.p('visible').plug(this.p('hidden').not());

			/* enact vertex hiding on the DOM */
			this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue((h) => {
				this.element.toggleClass('hidden',   h)
				            .toggleClass('visible', !h);
			});

		}, {

			/* update whichever visual representation is active (d3 or 3d) */
			updateVisualization() {
				if (!this.destroyed) {
					this.element.attr('x1', this.source.x);
					this.element.attr('y1', this.source.y);
					this.element.attr('x2', this.target.x);
					this.element.attr('y2', this.target.y);
					//let curve = this.object3d.updateTube().curve;
					//let center = curve.getPoint(0.5);
					//if (this._flag) {
					//	this._flag.position.set(center.x, center.y, center.z);
					//	this._flag.rotation.z = Math.atan2(
					//		curve.getPoint(1).y - curve.getPoint(0).y,
					//		curve.getPoint(1).x - curve.getPoint(0).x
					//	);
					//}
				}
			},

			/* D3 representation*/
			get element() {
				if (!this._element) {
					// adding and discarding an 'svg' element prevents a bug where the line would not appear
					this._element = $(`<svg><line class="edge ${this.options.cssClass}"></line></svg>`).children();
				}
				return this._element;
			},
			get graphZIndex() { return this.options.graphZIndex },

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


});
