define([
	'jquery',
	'./amy-util/handle-premature-plugins.js',
	'./amy-p-tile-grow-when-open.scss'
], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-grow-when-open',
		after: ['tile-open', 'tile-skin'],

		'modify tile': {
			'insert constructor': function () {
				var sectionElement = this.element.children('section');
				this.on('open', (open) => {
					if (open) {
						setTimeout(() => {
							sectionElement.css('visible', 'visible');
							sectionElement.css('opacity', 1);
						}, 400);
					} else {
						sectionElement.css('visible', 'hidden');
						sectionElement.css('opacity', 0);
					}
					this.weight = open ? (this.circuitboard.options.weightWhenOpen || 2) : 1;
				});
			}
		}
	});
});
