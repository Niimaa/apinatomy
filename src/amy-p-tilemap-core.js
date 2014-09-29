define([
	'jquery',
	'bluebird',
	'./amy-util/jquery-static.js',
	'./amy-util/jquery-instance.js',
	'./amy-tilemap.scss',
	'./amy-util/handle-premature-plugins.js'
], function ($, P, U) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tilemap-core',
		if: true,
		'modify tilemap': {
			//
			// populate the tilemap by consulting the model
			//
			'add refreshTiles': function refreshTiles() {
				//
				// sanity check
				//
				U.assert(U.isDefined(this.model),
					`An ApiNATOMY tilemap should have a model.`);

				//
				// render the new tilemap
				// (through a promise chain, returning the final promise)
				//
				return P.resolve(this.model)
					//
					// get the id's of all child models
					//
					.call('getChildIds')
					//
					// filter out the ids of children that ought not be displayed
					//
					.map((id) => {
						return P.resolve(this.circuitboard.options.filter(id, U.bind(P.resolve(this.model).value(), 'getChildren', id)))
							.then((show) => { return { id: id, show: show } });
					}).filter(U.field('show')).map(U.field('id'))
					//
					// get promises to all child entities
					//
					.then((ids) => P.resolve(this.model).value().getChildren(ids))
					//
					// create a tile for each child entity
					//
					.then((childrenToDisplay) => {
						// remove all old tiles
						// TODO: maintain references, so they won't have to be recreated
						this.element.children().empty();
						this.element.empty();

						// render the new tiles
						var rowCount = Math.floor(Math.sqrt(childrenToDisplay.length));
						var colCount = Math.ceil(childrenToDisplay.length / rowCount);
						while (rowCount--) {
							var row = $('<div/>').addClass('tilerow').appendTo(this.element);
							for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
								$('<div/>').tile({
									model: childrenToDisplay.shift(),
									parent: this
								}).appendTo(row).amyNestedFlexGrow(1).tile('instance').then((tile) => {
									this.one('destroy', () => { tile.destroy() });
								});
							}
						}
					})
					//
					// signal that the tiles have been (re)rendered
					//
					.then(()=> { this.trigger('tiles-refreshed') });
			},

			//
			// refresh the tiles initially
			//
			'insert constructor': function () {
				this.refreshTiles();
			}
		}
	});

});
