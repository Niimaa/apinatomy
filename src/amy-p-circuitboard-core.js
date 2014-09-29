define([
	'jquery',
	'bluebird',
	'./amy-circuitboard.scss',
	'./amy-util/handle-premature-plugins.js'
], function ($, P) {
	'use strict';

	$.circuitboard.plugin({
		name: 'circuitboard-core',
		if: true,
		'modify circuitboard': {

			'add _tilesByModelId': {},

			'add _registerTile': function _registerTile(tile) { // used by tiles
				if (!this._tilesByModelId[tile.model.id]) {
					this._tilesByModelId[tile.model.id] = [];
				}
				this._tilesByModelId[tile.model.id].push(tile);
				this.trigger('tilecreated', tile);
			},

			'add onTileCreated': function onTileCreated(tileSelector, fn) {
				//
				// `tileSelector` is optional, i.e., a single argument is `fn`
				//
				if ($.isUndefined(arguments[1])) {
					fn = arguments[0];
					tileSelector = null;
				}

				//
				// build the filter based on the selector
				//
				var filter = null;
				if (!tileSelector) { // no tile selector = all tiles
					filter = ()=>P.resolve(true);
				} else if (typeof tileSelector === 'string') { // model.id
					filter = (tile) => (tile.model.id === tileSelector);
				}

				//
				// apply the callback for existing tiles
				//
				$.each(this._tilesByModelId, (modelId, tiles) => {
					$.each(tiles, (index, tile) => {
						if (filter(tile)) { fn(tile) }
					});
				});

				//
				// set up the callbacks for future tiles
				//
				this.on('tilecreated', (tile) => {
					if (filter(tile)) { fn(tile) }
				});
			},

			'insert constructor': function () {
				//
				// create the root tilemap
				//
				$('<div/>').appendTo(this.element)
					.css('flex-grow', 1)
					.tilemap({
						model: this.options.model,
						parent: this
					}).tilemap('instance')
					.then((tilemap) => {
						this.one('destroy', ()=> { tilemap.destroy() });
					});
			}
		}
	});

});
