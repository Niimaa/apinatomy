define([
	'jquery',
	'./util/misc.es6.js',
	'./util/kefir-and-eggs.es6.js',
	'./Artefact.es6.js',
	'./D3Edge.scss'
], function ($, U, Kefir, ArtefactP) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_D3Edge)) { return window._amy_D3Edge }


		window._amy_D3Edge = Artefact.newSubclass('D3Edge', function D3Edge({}) {

			/* when one of the vertices is destroyed, so is this edge */ // TODO: reintroduce this at some point, in some way
			//Kefir.merge([ this.source.on('destroy'), this.target.on('destroy') ]).take(1).onValue(() => { this.destroy() });


		}, {

			/* update whichever visual representation is active (d3 or 3d) */
			updateVisualization() {
				this.element.attr('x1', this.source.x);
				this.element.attr('y1', this.source.y);
				this.element.attr('x2', this.target.x);
				this.element.attr('y2', this.target.y);
				this.object3d.updateTube();
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

			/* 3D representation */
			get object3d() {
				if (!this._object3d) {
					this._object3d = this.circuitboard.newTubeFromVertexToVertex(this, 0xff0000);
					this.on('destroy').take(1).onValue(() => { this.object3d.removeTube() });
				}
				return this._object3d; // TODO: properly delete this 3D object when this edge is destroyed
			}

		}, {
			graphZIndex: 100,
			cssClass: ''
		});


		return window._amy_D3Edge;


	}).tap((c) => { $.circuitboard.D3Edge = c });


});
