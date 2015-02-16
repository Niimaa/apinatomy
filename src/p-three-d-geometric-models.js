define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./util/misc.js',
	'./ThreeDModel.js'
], function ($, THREE, P, Kefir, U, ThreeDModelP) {
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

			this.newProperty('currentThreeDModelID', { initial: null });

			this.threeDModels = {};

			ThreeDModelP.then((ThreeDModel) => {

				Object.keys(threeDModels[this.model.id]).forEach((modelID) => {

					var clock = new THREE.Clock(); // TODO: at some point, we change this to a more global clock

					this.threeDModels[modelID] = new ThreeDModel(U.extend({}, threeDModels[this.model.id][modelID], {
						id: modelID,
						parent: this,
						clock: Kefir.animationFrames().map(() => clock.getElapsedTime())
					}));

					this.threeDModels[modelID].object3D.then((object) => {
						this.object3D.add(object);
						this.p('size').onValue((size) => { this.threeDModels[modelID].adaptToSurfaceArea(size) });
					});

				});

			});

		}

	});


});
