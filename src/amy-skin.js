define(['jquery', './amy-util/jquery-instance.js', './amy-skin.scss'], function ($) {
	'use strict';

	//
	// define the plugin
	//
	function plugin(/*options = {}*/) {
		return {
			name: 'skin',
			after: ['tile-core'],

			'modify tile': {
				'insert constructor': function () {
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
					this.model.get('name').then((name)=> { headerElement.text(name) });

					//
					// take any css rules from the model and apply them to the tile
					//
					this.model.get('css').then((css)=> { this.element.putCssRules(css) });
				}
			}
		};
	}

	//
	// make the plugin available in the `$.circuitboard.p` object
	//
	if (!$.circuitboard) { $.circuitboard = {} }
	if (!$.circuitboard.p) { $.circuitboard.p = {} }
	$.circuitboard.p[plugin().name] = plugin;

	//
	// return the plugin for use by certain package loaders
	//
	return plugin;
});
