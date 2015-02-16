define(['jquery', './util/kefir-and-eggs.js', './p-tile-skin-grow-when-open.scss'], function ($, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-skin-grow-when-open',
		resolves: ['tile-skin', 'tile-grow-when-open']
	}).modify('Tile.prototype');


	/*  react to a tile opening or closing by      */
	/*  timely showing/hiding the content section  */
	/*  to ensure smooth transition animation      */
	plugin.insert('construct', function () {
		var sectionElement = this.element.children('section');
		this.p('open').value(true).onValue(() => {
			sectionElement.css('opacity', 0);
		});
		this.p('fullyOpen').onValue((open) => {
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
