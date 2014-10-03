define([
	'jquery',
	'./amy-util/handle-premature-plugins.js',
	'./amy-p-tile-skin-grow-when-open.scss'
], function ($) {
	'use strict';

	$.circuitboard.tileTransitionDelay = 300;

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
					if (open) {
						setTimeout(() => {
							this.element.one('transitionend webkitTransitionEnd', () => {
								sectionElement.css('visibility', 'visible');
								sectionElement.css('opacity', 1);
							});
						}, 10);
					} else {
						sectionElement.css('visibility', 'hidden');
						sectionElement.css('opacity', 0);
					}
				});
			}
		}
	});
});
