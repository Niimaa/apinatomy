define([
	'jquery',
	'bluebird',
	'./util/misc.js',
	'./util/nested-flex-grow.js',
	'./p-tilemap-core.scss'
], function ($, P, U) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		id: 'tilemap-core',
		if: true
	}).modify('Tilemap.prototype');

	//
	// populate the tilemap by consulting the model
	//
	plugin.add('refreshTiles', function refreshTiles() {
		// sanity check
		U.assert(U.isDefined(this.model),
				`An ApiNATOMY tilemap should have a model.`);

		// render the new tilemap
		// (through a promise chain, returning the final promise)
		return P.resolve(this.model)
				// get the id's of all child models
				.call('getChildIds')
				//
				// filter out the ids of children that ought not be displayed
				.map((id) => {
					return P.resolve(this.circuitboard.options.filter(id, U.bind(P.resolve(this.model).value(), 'getModels', id)))
							.then((show) => { return { id: id, show: show } });
				}).filter(U.field('show')).map(U.field('id'))
				//
				// get promises to all child entities
				.then((ids) => P.resolve(this.model).value().getModels(ids))
				//
				// create a tile for each child entity
				.then((childrenToDisplay) => {
					// remove all old tiles
					// TODO: maintain references, so they won't have to be recreated
					this.element.children().empty();
					this.element.empty();

					// render and store references to the new tiles
					this._p_tilemapCore_tiles = [];
					var rowCount = Math.floor(Math.sqrt(childrenToDisplay.length));
					var colCount = Math.ceil(childrenToDisplay.length / rowCount);
					while (rowCount--) {
						var row = $('<div/>').addClass('tilerow').appendTo(this.element);
						for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
							$('<div/>').tile({
								model: childrenToDisplay.shift(),
								parent: this
							}).appendTo(row).amyNestedFlexGrow(1).tile('instance').then((tile) => {
								this._p_tilemapCore_tiles.push(tile);
								this.one('destroy', () => { tile.destroy() });
							});
						}
					}
				})
				//
				// signal that the tiles have been (re)rendered
				.then(()=> { this.trigger('tiles-refreshed') });
	});

	//
	// refresh the tiles when the tilemap is first constructed
	//
	plugin.add('construct', function () {
		this._p_tilemapCore_tiles = null;

		Object.defineProperty(this, 'tiles', {
			get() { return this._p_tilemapCore_tiles }
		});

		this.refreshTiles();
	});

});
