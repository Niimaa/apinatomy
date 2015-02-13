define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/misc.js',
	'./ThreeDModel.js'
], function ($, THREE, P, U, ThreeDModelP) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-geometric-models',
		requires: ['three-d', 'tile-hidden']
	});


	/* an object where three.js loaders for different file formats can be plugged in */
	plugin.add('Circuitboard.threeJsLoaders', {});


	/* load any 3D models associated with a tile */
	plugin.insert('Tile.prototype.construct', function () {

		if (!this.model) { return }

		var threeDModels = this.circuitboard.options.threeDModels;
		if (threeDModels && threeDModels[this.model.id]) {

			this.threeDModels = {};

			var ThreeDModel = ThreeDModelP.value(); // TODO: Is it certain the promise is resolved at this point?

			Object.keys(threeDModels[this.model.id]).forEach((modelID) => {

				this.threeDModels[modelID] = new ThreeDModel(U.extend({
					id: modelID,
					parent: this,
					visible: false
				}, threeDModels[this.model.id][modelID]));

			});

			this.newProperty('currentThreeDModelID', {
				initial: null
			});

		}

	});


});
