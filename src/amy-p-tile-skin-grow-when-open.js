define([
	'jquery',
	'./amy-util/handle-premature-plugins.js'
], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-skin-grow-when-open',
		if: ['tile-skin', 'tile-grow-when-open'],
		after: ['tile-skin', 'tile-grow-when-open'],

		'modify tile': {
			'insert constructor': function () {
				//
				// react to a tile opening or closing by
				// timely showing/hiding the content section
				// to ensure smooth transition animation
				//
				var sectionElement = this.element.children('section');
				this.on('open', (open) => {
					sectionElement.css('visible', 'hidden');
					sectionElement.css('opacity', 0);
					if (open) {
						setTimeout(() => {
							sectionElement.css('visible', 'visible');
							sectionElement.css('opacity', 1);
						}, 310);
					}
				});
			}
		}
	});
});
