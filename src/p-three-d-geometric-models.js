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

			var ThreeDModel = ThreeDModelP.value(); // TODO: Is it certain the promise is always resolved at this point?

			Object.keys(threeDModels[this.model.id]).forEach((modelID) => {

				this.threeDModels[modelID] = new ThreeDModel(U.extend({}, threeDModels[this.model.id][modelID], {
					id: modelID,
					parent: this,
					visible: true
				}));


				// TODO: keep surfaceArea of models up to date


				// TESTING; TODO: finish code
				this.threeDModels[modelID].object3D.then((object) => {

					this.object3D.add(object);

				});


			});

			this.newProperty('currentThreeDModelID', { // TODO: do we want to keep doing it this way?
				initial: null
			});

		}



	});


});
