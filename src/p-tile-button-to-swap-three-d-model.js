define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-button-to-swap-three-d-model',
		requires: ['tile-buttons', 'three-d-geometric-models']
	}).modify('Tile.prototype');


	plugin.append('construct', function () {

		if (Object.keys(this.threeDModels).length === 0) { return }

		// an array containing false, and a string for each 3D model id
		var modelIds = [false].concat(Object.keys(this.threeDModels));

		// the current model ID or false
		var current = 0;

		this.addButton({ name: 'swap3dModel', icon: require('./util/icons/3d-white.png') })
			.onValue(() => {
				current = (current + 1) % modelIds.length;
				var id = modelIds[current];
				this.showThreeDModel(id);
			});

	});


});
