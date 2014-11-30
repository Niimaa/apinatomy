define([
	'jquery',
	'chroma-js',
	'./util/misc.js',
	'./util/defaults.js',
	'./util/put-css-rules.js',
	'./p-tile-skin.scss'
], function ($, color, U, defaults) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-skin',
		requires: ['tile-open', 'position-tracking']
	}).modify('Tile.prototype');


	/* tile styling defaults generator */
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


	/* make tiles look nice, with a header, content section, and CSS styling derived from the model */
	plugin.insert('construct', function () {

		/*  create the header and content elements, and reroute the  */
		/* 'dom' property to the new content element                 */
		var origElement = this.dom;
		origElement.addClass('skinned-tile');
		this._p_tileSkin_headerElement = $(`<header/>`).appendTo(origElement);
		this.dom = $(`<section/>`).appendTo(origElement);

		/* put the name of the model in the header element */
		this.model.get('name').then((name)=> { this._p_tileSkin_headerElement.text(name) });

		/* take any css rules from the model and apply them to the tile */
		this.model.get('tile').get('normal').get('css').then((css)=> { this.element.amyPutCssRules(applyStyleDefaults(css)) })
				.catch(()=>{}); // it's OK if '.tile.normal.css' is not on the model

		/* when the tile is closed, make the font size dynamic */
		this.on('size').takeWhile(this.on('open').not()).onValue((size) => {
			this._p_tileSkin_headerElement.css('fontSize', // formula gotten experimentally
					Math.min(0.2 * Math.pow(size.height, 1.01), 0.13 * Math.pow(size.width, 1.01))
			);
		});

		/* the 'headerSize' observable */
		this.newProperty('headerSize'); // TODO: use Bacon way to update this
		var refreshHeaderSize = () => {
			this.headerSize = new U.Size(this._p_tileSkin_headerElement.height(), this.size.width);
		};
		this.on('size', refreshHeaderSize);
		this.on('open', refreshHeaderSize);

		/* the 'headerPosition' observable */
		this.newProperty('headerPosition'); // TODO: use Bacon way to update this
		this.on('position', (position) => { this.headerPosition = position });

	});
});
