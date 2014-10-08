define([
	'jquery',
	'chroma-js',
	'./util/misc.js',
	'./util/defaults.js',
	'./util/put-css-rules.js',
	'./p-tile-skin.scss',
	'./util/handle-premature-plugins.js'
], function ($, color, U, defaults) {
	'use strict';

	//
	// tile styling defaults generator
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
		after: ['tile-core', 'tile-weight', 'tile-open'],

		'modify tile': {

			'add enableDynamicFontSizing': function () {
				var headerSize = {
					height: 0,
					width: 0
				};
				var setHeaderFontSize = () => {
					//
					// formula gotten experimentally
					//
					this._p_tileSkin_headerElement.css('fontSize',
						Math.min(
								0.2 * Math.pow(headerSize.height, 1.01),
								0.13 * Math.pow(headerSize.width, 1.01)
						)
					);
				};
				var testResize = () => {
					if (!this.open) {
						var newHeaderSize = {
							width : this._p_tileSkin_headerElement.width(),
							height: this._p_tileSkin_headerElement.height()
						};
						if (!U.approx(headerSize.width, newHeaderSize.width) ||
							!U.approx(headerSize.height, newHeaderSize.height)) {
							$.extend(headerSize, newHeaderSize);
							setHeaderFontSize();
						}
					}
				};
				var stopResizeLoop = U.eachAnimationFrame(testResize);
				this.on('open', (open) => {
					if (open) {
						stopResizeLoop();
						stopResizeLoop = null;
					} else if (!stopResizeLoop) {
						stopResizeLoop = U.eachAnimationFrame(testResize);
					}
				});
			},

			'insert constructor': function () {
				//
				// create the header and content elements, and reroute the
				// 'dom' property to the new content element
				//
				var origElement = this.dom;
				origElement.addClass('skinned-tile');
				this._p_tileSkin_headerElement = $(`<header/>`).appendTo(origElement);
				this.dom = $(`<section/>`).appendTo(origElement);

				//
				// put the name of the model in the header element
				//
				this.model.get('name').then((name)=> { this._p_tileSkin_headerElement.text(name) });

				//
				// when the tile is closed, make the font size dynamic
				//
				this.enableDynamicFontSizing();

				//
				// take any css rules from the model and apply them to the tile
				//
				this.model.get('tile').get('normal').get('css').then((css)=> { this.element.amyPutCssRules(applyStyleDefaults(css)) })
					.catch(()=>{}); // it's OK if '.tile.normal.css' is not on the model
			}
		}
	});
});
