define([
	'jquery',
	'./util/misc.js',
	'./util/handle-premature-plugins.js'
], function ($, U) {
	'use strict';

	//
	// this plugin makes sure that positioning is updated during
	// CSS3 transition animations
	//
	$.circuitboard.plugin({
		name: 'transition-position-tracking',
		if: ['position-tracking', 'tile-grow-when-open'],
		after: ['position-tracking', 'tile-grow-when-open'],

		'modify tile.prototype': {
			'insert construct': function () {

				this.on('weight', () => {
					var stopUpdatingPosition = U.eachAnimationFrame(() => { this.resetPositioning() });
					this.element.one('transitionend', () => {
						stopUpdatingPosition();
					});
				});

			}
		}
	});

});
