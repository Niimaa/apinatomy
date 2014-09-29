define([
	'jquery',
	'./amy-util/handle-premature-plugins.js',
	'./amy-p-tile-grow-when-open.scss'
], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-grow-when-open',
		after: ['tile-open', 'tile-skin', 'tile-weight'],

		'modify tile': {
			'insert constructor': function () {
				//
				// cache some references
				//
				var sectionElement = this.element.children('section');

				//
				// react to a tile opening or closing
				//
				this.on('open', (open) => {
					sectionElement.css('visible', 'hidden');
					sectionElement.css('opacity', 0);
					if (open) {
						setTimeout(() => {
							sectionElement.css('visible', 'visible');
							sectionElement.css('opacity', 1);
						}, 310);
						this.weight = this.circuitboard.options.weightWhenOpen || 2;
					} else {
						this.weight = 1;
					}
				});
			}
		}
	});
});
