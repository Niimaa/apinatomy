define(['jquery'], function ($) {
	'use strict';


	$.circuitboard.plugin({
		name: 'd3-three-d',
		if: ['d3', 'three-d'],
		after: ['d3', 'three-d'],

		'modify circuitboard.prototype': {

			'after construct': function () {

				//
				// while dragging a vertex, lock the 3D camera
				//
				this.d3Force.drag().on('dragstart', () => {
					this.threeDControlsEnabled = false;
				}).on('dragend', () => {
					this.threeDControlsEnabled = true;
				});

			}

		}
	});

});
