define([
	'jquery',
	'./amy-util/handle-premature-plugins.js'
], function ($) {
	'use strict';

	//
	// this plugin makes sure that positioning is updated during
	// CSS3 transition animations
	//
	$.circuitboard.plugin({
		name: 'transition-position-tracking',
		if: ['position-tracking', 'tile-grow-when-open'],
		after: ['position-tracking', 'tile-grow-when-open'],

		'modify tile': {
			'insert constructor': function () {

				this.on('weight', () => {
					var insideTransition = true;
					this.element.on('transitionend webkitTransitionEnd',
						() => { insideTransition = false });
					var resetPositioning = () => {
						this.resetPositioning();
						if (insideTransition) { requestAnimationFrame(resetPositioning) }
					};
					resetPositioning();
				});

			}
		}
	});

});
