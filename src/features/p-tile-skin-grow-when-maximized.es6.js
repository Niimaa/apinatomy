define(['jquery', '../util/kefir-and-eggs.es6.js', './p-tile-skin-grow-when-maximized.scss'], function ($, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-skin-grow-when-maximized', {
		resolves: ['tile-skin', 'tile-grow-when-maximized']
	}).modify('Tile.prototype');


	/*  react to a tile maximizing or un-maximizing by  */
	/*  timely showing/hiding the content section       */
	/*  to ensure smooth transition animation           */
	plugin.append('construct', function () {
		var sectionElement = this.element.children('section');
		this.p('maximized').onValue(() => {
			sectionElement.css('opacity', 0);
		});
		Kefir.merge([
			this.p('fullyMaximized').changes().value(true),
			this.p('fullyNotMaximized').changes().value(true)
		]).onValue(() => {
			if (open) {
				sectionElement.css('visibility', 'visible');
				sectionElement.css('opacity', 1);
			} else {
				sectionElement.css('visibility', 'hidden');
				sectionElement.css('opacity', 0);
			}
		});
	});


});
