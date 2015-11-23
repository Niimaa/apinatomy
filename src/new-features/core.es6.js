import $     from 'jquery';
import P     from 'bluebird';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import defer from '../util/defer.es6.js';


/* the core plugin for (pure-3D) circuit boards */
var plugin = $.circuitboard.plugin.do('core', {
	if:     true,
	onlyIf: ['positioning', 'tile-weight']
});


/* basic classes */
plugin.modify('Circuitboard.prototype').add('construct', function () {});
plugin.modify('Tilemap.prototype').add('construct', function () {});
plugin.modify('Tile.prototype').add('construct', function () {});


/* Keeping track of (new) tiles */
plugin.modify('Circuitboard.prototype')
	.append('construct', function () {
		this._p_circuitboardCore_tilesByModelId = {};
		this.newTiles = Kefir.bus();
	}).add('allTiles', function () {
		let tiles = {};
		Object.keys(this._p_circuitboardCore_tilesByModelId).forEach((id) => {
			tiles[id] = this._p_circuitboardCore_tilesByModelId[id].promise;
		});
		return tiles;
	}).add('tile', function (tileSelector) {
		return U.getDef(this._p_circuitboardCore_tilesByModelId, tileSelector, defer).promise;
	}).add('_registerTile', function (tile) {
		tile.afterConstruct.then(() => {
			U.getDef(this._p_circuitboardCore_tilesByModelId, tile.model.id, defer).resolve(tile);
			this.newTiles.emit(tile);
		});
	});
plugin.modify('Tile.prototype')
	.append('construct', function () {
		this.circuitboard._registerTile(this);
	});


/* main artefact hierarchy */
plugin.modify('Circuitboard.prototype') // a circuitboard has a tilemap
	.append('construct', function () {

		this.model.then((model) => {
			this.tilemap = new $.circuitboard.Tilemap({
				model: model,
				parent: this,
				tileDepth: 1
			});
			this.tilemap.afterConstruct.then(() => {
				this.tilemap.p('size').plug(this.p('size'));
				this.tilemap.position = { x: 0, y: 0 };
			});
		});

	});
plugin.modify('Tilemap.prototype') // a tilemap has a number of tiles
	.append('construct', function () {

		this._p_tilemapCore_tiles = null;
		Object.defineProperty(this, 'tiles', { get: () => this._p_tilemapCore_tiles });
		this.refreshTiles();

	});
plugin.modify('Tile.prototype') // a tile has a tilemap
	.append('construct', function () {

		this.tilemap = null;

	})
	.add('populateInnerTilemap', function () {

		if (!this.tilemap) {
			let tilemap = this.tilemap = new $.circuitboard.Tilemap({
				model: this.model,
				parent: this,
				tileDepth: this.options.tileDepth + 1
			});
			tilemap.afterConstruct.then(() => {
				tilemap.p('size').plug(this.p('bodySize'));
				tilemap.p('position').plug(this.p('bodyPosition'));
			});
		}
		return this.tilemap;

	});


/* registering tilemap layouts */
plugin.modify('Tile.prototype')
	.add('refreshChildTiles', function () {
		this.afterConstruct.then(() => {
			let tile = this;
			tile.tilemap.refreshTiles();
		});
	});
plugin.modify('Tilemap')
	.add('prototype.refreshTiles', function () {
		if (this._tilesHaveBeenRefreshed) { return P.resolve() }
		this._tilesHaveBeenRefreshed = true;
		return P.resolve(this.model).then(model => model.getModels(model.getChildIds())).map(a=>a).filter(this.circuitboard.options.filter || (()=>true)).then((childModels) => {

			/* gather tiles */
			let tilesP = [];
			for (let i = 0; i < childModels.length; ++i) {
				tilesP.push(new $.circuitboard.Tile({
					model:     childModels[i],
					parent:    this,
					tileDepth: this.options.tileDepth
				}));
			}

			/* resizing and repositioning tiles */
			return P.resolve(tilesP).map(a=>a).tap((tiles) => {
				const spacing = U.defOr(this.options.tileSpacing, this.circuitboard.options.tileSpacing);

				let state = {};
				const cb = ([{width, height}]) => {

					/* only show shown tiles */
					let shownTiles = tiles.filter(t => t.shown);

					/* get tile positioning array, and incorporate spacing */
					// which layout to use (e.g., '.rows') should be customizable at some point
					let positioning = this.constructor.layouts.rows(shownTiles, {
						width:  width  - spacing,
						height: height - spacing
					}, state).map(({size: {width, height}, position: {x, y}}) => ({
						size: {
							width:  width  - spacing,
							height: height - spacing
						},
						position: {
							x: x + spacing,
							y: y + spacing
						}
					}));

					/* set tile positioning */
					for (let i = 0; i < shownTiles.length; ++i) {
						shownTiles[i].size     = positioning[i].size;
						shownTiles[i].position = positioning[i].position;
					}

				};
				if (this._deregisterTilePositionObserver) {
					this._deregisterTilePositionObserver();
				}
				const weightProps = tiles.map(tile => tile.p('weight'));
				const shownProps = tiles.map(tile => tile.p('shown'));
				let obs = Kefir.combine([this.p('size'), ...weightProps, ...shownProps]);
				obs.onValue(cb);
				this._deregisterTilePositionObserver = () => { obs.offValue(cb) };
			});

		});
	})
	.add('layouts', {
		rows(tiles, {width: totalWidth, height: totalHeight}/*, state*/) {

			/* decide nr of rows and columns */
			const tileCount = tiles.length;
			const rowCount = Math.floor(Math.sqrt(tileCount));
			const colCount = Math.ceil(tileCount / rowCount);

			/* compute weight sums */
			let totalWeight = 0;
			let weightPerRow = [];
			let accumulatedWeightBeforeRow = [];
			let accumulatedWeightInsideRow = [];
			for (let row = 0, i = 0; row < rowCount; ++row) {
				weightPerRow.push(0);
				accumulatedWeightInsideRow.push([]);
				for (let col = 0; col < colCount && i < tileCount; ++col, ++i) {
					totalWeight += tiles[i].weight;
					weightPerRow[row] += tiles[i].weight;
					accumulatedWeightInsideRow[row].push(col === 0 ? 0 :
						(accumulatedWeightInsideRow[row][col - 1] + tiles[i - 1].weight));
				}
				accumulatedWeightBeforeRow.push(row === 0 ? 0 : (accumulatedWeightBeforeRow[row - 1] + weightPerRow[row - 1]));
			}

			/* compute the position and size of the tiles, and return that as an array */
			let result = [];
			for (let row = 0, i = 0; row < rowCount; ++row) {
				let rowHeight = totalHeight * weightPerRow[row] / totalWeight;
				let rowY = totalHeight * accumulatedWeightBeforeRow[row] / totalWeight;
				rowY = totalHeight - rowY - rowHeight; // reverse the y-axis
				for (let col = 0; col < colCount && i < tileCount; ++col, ++i) {
					result.push({
						size: {
							width: totalWidth * tiles[i].weight / weightPerRow[row],
							height: rowHeight
						},
						position: {
							x: totalWidth * accumulatedWeightInsideRow[row][col] / weightPerRow[row],
							y: rowY
						}
					});
				}
			}
			return result;

		}
	});
