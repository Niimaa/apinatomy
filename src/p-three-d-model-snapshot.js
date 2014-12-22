define(['jquery', './util/misc.js'], function ($, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-model-snapshot',
		resolves: ['three-d-geometric-models', 'snapshot']
	});


	plugin.insert('Snapshot.prototype.take', function () {

		// TODO: this should refer to tiles by artefact id, not by model id (somehow)

		/* remember tiles that are visible */
		if (this.options.threeDModelsVisible) {
			this.object.threeDModelsVisible = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				this.object.threeDModelsVisible[tile.model.id] = tile.currentThreeDModelID;
			});
		}

	}).insert('Snapshot.prototype.restore', function () {

		/* restore tiles that are visible */
		if (this.options.threeDModelsVisible) {
			Object.keys(this.object.threeDModelsVisible).filter((id) => U.isDefined(this.object.threeDModelsVisible[id])).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.showThreeDModel(this.object.threeDModelsVisible[tile.model.id]);
				});
			});
		}

	});


});
