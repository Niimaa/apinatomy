define([
	'jquery',
	'./util/misc.es6.js',
	'./Artefact.es6.js',
	'./D3Vertex.scss'
], function ($, U, ArtefactP) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_D3Vertex)) { return window._amy_D3Vertex }


		window._amy_D3Vertex = Artefact.newSubclass('D3Vertex', function D3Vertex({ visible, z }) {

			/* the coordinate properties */
			this.newProperty('x', { initial: Math.random() * 10000 });
			this.newProperty('y', { initial: Math.random() * 10000 });
			this.newProperty('z', { initial: z || 0 });

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

			updateVisualization() {
				if (!this.destroyed) {
					this.element.attr('x', this.x);
					this.element.attr('y', this.y);
				}
			},

			get element() {
				if (!this._element) {
					if (this.options.shape === 'square') {
						this._element = $(`
							<svg x="${this.x}" y="${this.y}" class="vertex ${this.options.cssClass}">
								<rect class="core" x="${-this.options.radius/2}" y="${-this.options.radius/2}"
								      width="${this.options.radius}" height="${this.options.radius}"></rect>
							</svg>
						`);
					} else {
						this._element = $(`
							<svg x="${this.x}" y="${this.y}" class="vertex ${this.options.cssClass}">
								<circle class="core" r="${this.options.radius / 2}"></circle>
							</svg>
						`);
					}
				}
				return this._element;
			},

			get graphZIndex() { return this.options.graphZIndex }

		}, {
			graphZIndex: 200,
			cssClass:    '',
			radius:      5,
			visible:     true
		});


		return window._amy_D3Vertex;


	}).tap((c) => { $.circuitboard.D3Vertex = c });


});
