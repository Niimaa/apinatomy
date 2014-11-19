define([
	'jquery',
	'./util/misc.js',
	'./util/artefact.js',
	'./D3Vertex.scss'
], function ($, U, Artefact) {
	'use strict';


	return Artefact.newSubclass('D3Vertex', function D3Vertex({visible}) {

		/* the coordinate observables */
		this.newObservable('x', { initial: 10 });
		this.newObservable('y', { initial: 10 });

		/* the 'hidden' observable */
		this.newObservable('hidden', {
			initial: !visible,
			validation: (v) => !!v
		});

		/* the 'visible' observable */
		this.newObservable('visible', {
			initial: visible,
			validation: (v) => !!v
		});

		/* the two are continual opposites */
		this.on('hidden', (hidden) => { this.visible = !hidden });
		this.on('visible', (visible) => { this.hidden = !visible });

		/* enact tile hiding on the DOM */
		this.observe('hidden', (hidden) => {
			if (hidden) {
				this.element.addClass('hidden');
			} else {
				this.element.removeClass('hidden');
			}
		});

		/* when the tile is destroyed, it is also hidden */
		this.one('destroy', () => { this.hidden = true });

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
