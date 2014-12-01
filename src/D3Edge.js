define([
	'jquery',
	'./util/misc.js',
	'./util/artefact.js',
	'./D3Edge.scss'
], function ($, U, Artefact) {
	'use strict';


	return Artefact.newSubclass('D3Edge', function D3Edge({source, target}) {

		/* store references to the two vertices */
		this._source = source;
		this._target = target;

		/* when one of the vertices is destroyed, so is this edge */
		source.one('destroy', () => { this.destroy() });
		target.one('destroy', () => { this.destroy() });

	}, {

		get source() { return this._source },

		get target() { return this._target },

		get element() {
			if (!this._element) {
				// adding and discarding an 'svg' element prevents a bug where the line would not appear
				this._element = $(`<svg><line class="edge ${this.options.cssClass}"></line></svg>`).children();
			}
			return this._element;
		},

		get graphZIndex() { return this.options.graphZIndex }

	}, {
		graphZIndex: 100,
		cssClass: ''
	});


});
