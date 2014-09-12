define(['jquery', './util/putcssrules.js', './amy-skin.scss'], function ($) {
	return {
		name: 'skin',
		component: 'tile',
		decorator() {

			//
			// create the header and content elements, and reroute the
			// 'dom' property to the new content element
			//
			var origElement = this.dom;
			origElement.addClass('skinned-tile');
			$(`<header>${this.model.name}</header>`).appendTo(origElement);
			this.dom = $(`<section/>`).appendTo(origElement);

			//
			// apply the 'tileSpacing' option as padding in the content element
			//
			this.dom.css('padding', this.options.tileSpacing);

			//
			// take any css rules from the model and apply them to the tile
			//
			this.element.putCssRules(this.model.css);

		}
	};
});
