define([
	'jquery',
	'./util/misc.js',
	'./util/artefact.js',
	'./D3Vertex.scss'
], function ($, U, Artefact) {
	'use strict';


	return Artefact.newSubclass('D3Vertex', function D3Vertex({visible}) {

		/* the coordinate properties */
		this.newProperty('x', { initial: 10 });
		this.newProperty('y', { initial: 10 });

		/* the 'visible' and 'hidden' properties */
		this.newProperty('visible', { source: this.property('hidden').not(),  initial:  visible, settable: true });
		this.newProperty('hidden',  { source: this.property('visible').not(), initial: !visible, settable: true });

		/* enact vertex hiding on the DOM */
		this.on('hidden').assign(this.element, 'toggleClass', 'hidden');

		/* when the tile is destroyed, it is also hidden */
		this.on('destroy').take(1).onValue(() => { this.hidden = true });

	}, {

		get element() {
			if (!this._element) {
				this._element = $(`
					<svg x="${this.x}" y="${this.y}" class="vertex ${this.options.cssClass}">
						<circle class="core" r="${this.options.radius}"></circle>
					</svg>
				`);
			}
			return this._element;
		},

		get graphZIndex() { return this.options.graphZIndex }

	}, {
		graphZIndex: 200,
		cssClass: '',
		radius: 5,
		visible: true
	});


});
