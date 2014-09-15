define(['jquery', './amy-util/putcssrules.js', './amy-skin.scss'], function ($) {
	return {
		component: 'tile',
		name: 'skin',
		decorator() {

			//
			// create the header and content elements, and reroute the
			// 'dom' property to the new content element
			//
			var origElement = this.dom;
			origElement.addClass('skinned-tile');
			var headerElement = $(`<header/>`).appendTo(origElement);
			this.dom = $(`<section/>`).appendTo(origElement);

			//
			// apply the 'tileSpacing' option as padding in the content element
			//
			this.dom.css('padding', this.circuitboard.options.tileSpacing);

			//
			// put the name of the model in the header element
			//
			this.model.get('name').then((name) => { headerElement.text(name) });

			//
			// take any css rules from the model and apply them to the tile
			//
			this.model.get('css').then((css) => { this.element.putCssRules(css) });

		}
	};
});
