define([
	'jquery',
	'bluebird',
	'./util/misc.js',
	'./util/unique-id.js',
	'./util/nested-flex-grow.js',
	'./util/clickVsDrag.js',
	'./p-core.scss'
], function ($, P, U, uniqueID) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'core',
		if: true
	});


	/* Circuitboard */
	plugin.modify('Circuitboard.prototype')
			.add('_registerTile', function _registerTile(tile) { // used by tiles
				if (!this._p_circuitboardCore_tilesByModelId[tile.model.id]) {
					this._p_circuitboardCore_tilesByModelId[tile.model.id] = [];
				}
				this._p_circuitboardCore_tilesByModelId[tile.model.id].push(tile);
				this.trigger('tilecreated', tile);
			}).add('onTileCreated', function onTileCreated(tileSelector, fn) {

				// `tileSelector` is optional, i.e., a single argument is `fn`
				if ($.isUndefined(arguments[1])) {
					fn = arguments[0];
					tileSelector = null;
				}

				// build the filter based on the selector
				var filter = null;
				if (!tileSelector) { // no tile selector = all tiles
					filter = ()=>P.resolve(true);
				} else if (typeof tileSelector === 'string') { // model.id
					filter = (tile) => (tile.model.id === tileSelector);
				}

				// apply the callback for existing tiles
				$.each(this._p_circuitboardCore_tilesByModelId, (modelId, tiles) => {
					$.each(tiles, (index, tile) => {
						if (filter(tile)) { fn(tile) }
					});
				});

				// set up the callbacks for future tiles
				this.on('tilecreated', (tile) => {
					if (filter(tile)) { fn(tile) }
				});

			}).add('construct', function () {
				this._p_circuitboardCore_tilesByModelId = {};

				// create the root tilemap
				$('<div/>').appendTo(this.element)
						.css('flex-grow', 1)
						.tilemap({
							model: this.options.model,
							parent: this
						}).tilemap('instance')
						.then((tilemap) => {
							this.one('destroy', ()=> { tilemap.destroy() });
						});
			});


	/* Tilemap */
	plugin.modify('Tilemap.prototype')
			.add('refreshTiles', function refreshTiles() {

				/* sanity check */
				U.assert(U.isDefined(this.model),
						`An ApiNATOMY tilemap should have a model.`);

				/* render the new tilemap (through a promise chain, returning the final promise) */
				return P.resolve(this.model)
					/* get the id's of all child models */
						.call('getChildIds')
					/* filter out the ids of children that ought not be displayed */
						.map((id) => {
							return P.resolve(this.circuitboard.options.filter(id, U.bind(P.resolve(this.model).value(), 'getModels', id)))
									.then((show) => { return { id: id, show: show } });
						}).filter(U.field('show')).map(U.field('id'))
					/* get promises to all child entities */
						.then((ids) => P.resolve(this.model).value().getModels(ids))
					/* create a tile for each child entity */
						.then((childrenToDisplay) => {
							/* remove all old tiles */
							this.element.children().empty();
							this.element.empty();
							// TODO: maintain references, so they won't have to be recreated

							/* render and store references to the new tiles */
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
					/* signal that the tiles have been (re)rendered */
						.then(()=> { this.trigger('tiles-refreshed') });

			}).add('construct', function () {

				this._p_tilemapCore_tiles = null;
				Object.defineProperty(this, 'tiles', { get: () => this._p_tilemapCore_tiles });
				this.refreshTiles();

			});


	/* Tilemap */
	plugin.modify('Tile.prototype')
			.add('populateInnerTilemap', function populateInnerTilemap() {

				if (!this._p_tileCore_tilemap) {
					this._p_tileCore_tilemap = this.dom.tilemap({
						model: this.options.model,
						parent: this
					}).tilemap('instance').then((tilemap) => {
						this.one('destroy', ()=> { tilemap.destroy() });
					});
				}

			}).add('construct', function () {

				this._p_tileCore_tilemap = null;

				/* support certain DOM-event subscriptions from the tile object itself */
				$.each(['click', 'mouseover', 'mouseout'], (index, signal) => {
					this.element.on(signal, (event) => {
						event.stopPropagation();
						this.trigger(signal, event);
					});
				});
				$.each(['mouseenter', 'mouseleave'], (index, signal) => {
					this.element.on(signal, (event) => {
						this.trigger(signal, event);
					});
				});
				this.element.clickNotDrop((event) => {
					event.stopPropagation();
					this.trigger('click-not-drop', event);
				});

				/* a field to hold the innermost HTML content element still belonging to this tile */
				this.dom = this.element;

				/* an element id for quick lookups */
				this.id = uniqueID('tile');
				this.element.attr('id', this.id);

				/* inform circuitboard of new tile */
				this.circuitboard._registerTile(this);

			});



});
