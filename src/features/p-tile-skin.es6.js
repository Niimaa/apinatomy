define([
	'jquery',
	'chroma-js',
	'../util/misc.es6.js',
	'../util/kefir-and-eggs.es6.js',
	'../util/defaults.es6.js',
	'../util/put-css-rules.es6.js',
	'./p-tile-skin.scss'
], function ($, color, U, Kefir, defaults) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-skin', {
		requires: ['tile-open', 'position-tracking']
	}).modify('Tile.prototype');


	/* tile styling defaults generator */
	var applyStyleDefaults = defaults({
		'&': {
			backgroundColor: " 'white'                                                                                                                                                      ",
			borderColor:     " color(`['&'].backgroundColor`).luminance() > 0.5  &&  color(`['&'].backgroundColor`).darken(30).css()  ||  color(`['&'].backgroundColor`).brighten(30).css() ",
			color:           " color(`['&'].backgroundColor`).luminance() > 0.5  &&  'black'                                          ||  'white'                                           "
		},
		'& > header': {
			borderColor:     " `['&'].borderColor` "
		},
		'& > icon-btn': {
			backgroundColor: " `['&'].backgroundColor` "
		}
	}, { color });


	/* make tiles look nice, with a header, content section, and CSS styling derived from the model */
	plugin.append('construct', function () {

		/*  create the header and content elements, and reroute the  */
		/* 'dom' property to the new content element                 */
		var origElement = this.dom;
		origElement.addClass('skinned-tile');
		this._p_tileSkin_headerElement = $(`<header/>`).appendTo(origElement);
		this.dom = $(`<section/>`).appendTo(origElement);

		/* put the name of the model in the header element */
		//this._p_tileSkin_headerElement.text(this.model.id);
		this.model.get('name').then((name)=> { this._p_tileSkin_headerElement.text(name) });

		/* take any css rules from the model and apply them to the tile */
		this.skinnedElement = this.model.get('tile').get('normal').get('css')
			.catch(() => ({})) // There is no given css object? Then use an empty object.
			.then((css) => { this.element.amyPutCssRules(applyStyleDefaults(css)) })
			.return(this.element);

		/* when the tile is closed, make the font size dynamic */
		this.on('size').filterBy(this.p('open').not()).onValue((size) => {
			this._p_tileSkin_headerElement // formula gotten experimentally
				.css('fontSize', Math.min(0.2 * Math.pow(size.height, 1.01), 0.13 * Math.pow(size.width, 1.01)));
				// We're growing / shrinking the font size in proportion to the (1.01)st power of the tile size.
				// Making the font grow/shrink just a tiny bit faster than the tile prevents an awkward 'flickering'
				// between different line-breaks that would otherwise happen sometimes.
		});

		/* the 'headerSize' observable */
		this.newProperty('headerSize', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.combine([
			this.p('size'),
			this.p('fullyOpen'),
			this.p('fullyClosed')
		]).map(([size]) => new U.Size(this._p_tileSkin_headerElement.height(), size.width)));

		/* the 'headerPosition' observable */
		this.newProperty('headerPosition', {
			settable: false
		}).plug(this.on('position'));

	});
});
