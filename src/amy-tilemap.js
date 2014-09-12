define(['jquery', 'q', './util/amywidget.js', './util/nestedflexgrow.js', './util/misc.js', './amy-tile.js', './amy-tilemap.scss'], function ($, Q) {

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
				// if there's no model, empty out and bail out
				//
				if (!this.model) {
					this.element.empty();
					return;
				}

				//
				// a (caching) function for getting a child promise
				// TODO: caching should be done in a different code-layer
				//
				var getChildren = (id)=> {
					var cache = this.circuitboard.options.entityCache; // local shorthand
					if (!cache[id]) {
						//// cache the entity
						cache[id] = this.model.invoke('getChildren', id);
						//// put the 'id' directly on the promise, for synchronous retrieval
						cache[id].id = id;
					}
					return cache[id];
				};


				//
				// render the new tilemap (through a promise chain, returning a promise)
				//
				return this.model
					//
					// get the id's of all child models
					//
					.invoke('getChildIds')
					//
					// filter out the ids of children that ought not be displayed
					//
					.invoke('map', (id) => {
						return Q(this.circuitboard.options.filter(id, getChildren.bind(this, id)))
							.then((show) => { return { id: id, show: show } });
					}).all().invoke('filter', $.field('show')).invoke('map', $.field('id'))
					//
					// get promises to all child entities
					//
					.then(getChildren)
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
					.then(() => { this.trigger('tiles-refreshed') });
			}
		});

		//
		// refresh this tilemap now
		//
		this.refreshTiles();

	});

});
