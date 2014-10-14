define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'd3-three-d',
		if: ['d3', 'three-d'],
		after: ['d3', 'three-d']
	}).modify('circuitboard.prototype');

	//
	// while dragging a vertex, lock the 3D camera
	//
	plugin.after('construct', function () {
		this.d3Force.drag().on('dragstart', () => {
			this.threeDControlsEnabled = false;
		}).on('dragend', () => {
			//noinspection JSUnusedGlobalSymbols
			this.threeDControlsEnabled = true;
		});
	});

});
