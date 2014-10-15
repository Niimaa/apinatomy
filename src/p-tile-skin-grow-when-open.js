define([
	'jquery',
	'./p-tile-skin-grow-when-open.scss'
], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-skin-grow-when-open',
		if: ['tile-skin', 'tile-grow-when-open'],
		after: ['tile-skin', 'tile-grow-when-open']
	}).modify('Tile.prototype');

	//
	// react to a tile opening or closing by
	// timely showing/hiding the content section
	// to ensure smooth transition animation
	//
	plugin.insert('construct', function () {
		var sectionElement = this.element.children('section');
		this.on('open', (open) => {
			if (open) {
				setTimeout(() => {
					sectionElement.css('opacity', 0);
					this.element.one('transitionend', () => {
						sectionElement.css('visibility', 'visible');
						sectionElement.css('opacity', 1);
					});
				});
			} else {
				sectionElement.css('visibility', 'hidden');
				sectionElement.css('opacity', 0);
			}
		});
	});
});
