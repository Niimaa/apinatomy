define(['jquery', 'bluebird', './amy-util/plugger.js', './amy-util/amywidget.js', './amy-tilemap.js', './amy-circuitboard.scss'], function ($, P, acceptPlugins) {

	//
	// let '$.circuitboard' accept plugins
	//
	//
	$.circuitboard = $.circuitboard || {};
	$.circuitboard._applyPlugins = acceptPlugins($.circuitboard, {
		components: {
			circuitboard: {},
			tilemap: {},
			tile: {}
		}
	});

	//
	// define the circuitboard widget
	//
	$.amyWidget('circuitboard', 'circuitboard', {
		cssClass: "circuitboard",
		filter: ()=>P.resolve(true),
		model: null
	}, function Circuitboard() {

		//
		// keeping track of tiles
		//
		var _tilesByModelId = {};
		$.extend(this, {
			_registerTile(tile) { // used by tiles
				if (!_tilesByModelId[tile.model.id]) {
					_tilesByModelId[tile.model.id] = [];
				}
				_tilesByModelId[tile.model.id].push(tile);
				this.trigger('tilecreated', tile);
			},
			onTileCreated(tileSelector, fn) {
				//// `tileSelector` is optional, i.e., a single argument is `fn`
				if (typeof arguments[1] === 'undefined') {
					fn = arguments[0];
					tileSelector = null;
				}

				//// build the filter based on the selector
				var filter = null;
				if (!tileSelector) { // no tile selector = all tiles
					filter = ()=>true;
				} else if (typeof tileSelector === 'string') { // model.id
					filter = (tile) => (tile.model.id === tileSelector);
				}

				//// apply the callback for existing tiles
				$.each(_tilesByModelId, (modelId, tiles) => {
					$.each(tiles, (index, tile) => {
						if (filter(tile)) { fn(tile) }
					});
				});

				//// set up the callbacks for future tiles
				this.on('tilecreated', (tile) => {
					if (filter(tile)) { fn(tile) }
				});
			}
		});

		//
		// the root tilemap
		//
		var _tilemap = $('<div/>').appendTo(this.element)
			.css('flex-grow', 1)
			.tilemap({
				model: this.options.model,
				_circuitboard: this
			}).tilemap('instance');
		this.one('destroy', ()=> { _tilemap.destroy() });

	});

});
