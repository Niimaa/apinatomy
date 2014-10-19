define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		id: 'd3-three-d',
		resolves: ['d3', 'three-d']
	}).modify('Circuitboard.prototype');

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
