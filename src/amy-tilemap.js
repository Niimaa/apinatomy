define(['jquery', 'bluebird', './amy-util/amywidget.js', './amy-util/nestedflexgrow.js', './amy-util/misc.js', './amy-tile.js', './amy-tilemap.scss'], function ($, P) {

	$.amyWidget('tilemap', 'tilemap', {
		cssClass:      "tilemap",
		model:         null,
		_circuitboard: null
	}, function Tilemap() {

		//
		// how to refresh the content of this tilemap
		//
		$.extend(this, {
			refreshTiles() {

				//
				// sanity check
				//
				$.assert($.isDefined(this.model),
					`An ApiNATOMY tilemap should have a model.`);

				//
				// render the new tilemap (through a promise chain, returning a promise)
				//
				return this.model
					//
					// get the id's of all child models
					//
					.call('getChildIds')
					//
					// filter out the ids of children that ought not be displayed
					//
					.map((id) => {
						return P.resolve(this.circuitboard.options.filter(id, $.bind(this.model.value(), 'getChildren', id)))
							.then((show) => { return { id: id, show: show } });
					}).filter($.field('show')).map($.field('id'))
					//
					// get promises to all child entities
					//
					.then(this.model.value().getChildren)
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
								var tile = $('<div/>').tile({
									model:         childrenToDisplay.pop(),
									_circuitboard: this.options._circuitboard
								}).appendTo(row).nestedFlexGrow(1).tile('instance');
								tile.one('destroy', tile.destroy.bind(tile));
							}
						}
					})
					//
					// signal that the tiles have been (re)rendered
					//
					.then(()=>{ this.trigger('tiles-refreshed') });
			}
		});

		//
		// refresh this tilemap now
		//
		this.refreshTiles();

	});

});
