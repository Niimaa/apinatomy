define([
	'jquery',
	'chroma-js',
	'./amy-util/jquery-static.js',
	'./amy-util/defaults.js',
	'./amy-util/jquery-instance.js',
	'./amy-p-tile-skin.scss',
	'./amy-util/handle-premature-plugins.js'
], function ($, color, U, defaults) {
	'use strict';

	//
	// tile styling default generator
	//
	var applyStyleDefaults = defaults({
		'&':            {
			backgroundColor: " 'white'                                                                ",
			borderColor:     " color(`['&'].backgroundColor`).brighten(20).css()                      ",
			color:           " color(`['&'].backgroundColor`).luminance() > 0.5 && 'black' || 'white' "
		},
		'& > header':   {
			borderColor: " `['&'].borderColor` "
		},
		'& > icon-btn': {
			backgroundColor: " `['&'].backgroundColor` "
		}
	}, { color: color });

	//
	// the plugin
	//
	$.circuitboard.plugin({
		name: 'tile-skin',
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
				// when the tile is closed, make the font size dynamic
				//
				(()=>{
					this.on('open', (open) => {
						if (!open) { requestAnimationFrame(testResize) }
					});
					var headerSize = {
						height: 0,
						width: 0
					};
					var setHeaderFontSize = () => {
						headerElement.css('fontSize',
							Math.min(
									0.2 * Math.pow(headerSize.height, 1.01) * 0.95,
									0.13 * Math.pow(headerSize.width, 1.01) * 0.95
							)
						);
					};
					var testResize = () => {
						if (!this.open) {
							var newHeaderSize = {
								width : headerElement.width(),
								height: headerElement.height()
							};
							if (!U.approx(headerSize.width, newHeaderSize.width) ||
								!U.approx(headerSize.height, newHeaderSize.height)) {
								$.extend(headerSize, newHeaderSize);
								setHeaderFontSize();
							}
							requestAnimationFrame(testResize);
						}
					};
					testResize();
				})();


				//
				// take any css rules from the model and apply them to the tile
				//
				this.model.get('tile').get('normal').get('css').then((css)=> { this.element.amyPutCssRules(applyStyleDefaults(css)) })
					.catch(()=>{}); // it's OK if those properties are not on the model
			}
		}
	});
});
