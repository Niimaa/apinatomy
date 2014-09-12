define(['jquery', './util/amywidget.js', './util/nestedflexgrow.js', './amy-tile.js', './amy-tilemap.scss'], function ($) {

	$.amyWidget('tilemap', 'tilemap', {
		cssClass: "tilemap",
		filter: ()=>true,
		model: null,
		tileSpacing: 0,
		_circuitboard: null
	}, function Tilemap() {

		//
		// make a reference to the circuitboard available in this tilemap object
		//
		Object.defineProperty(this, 'circuitboard', {
			get() { return this.options._circuitboard }
		});

		//
		// how to refresh the content of this tilemap
		//
		$.extend(this, {
			_refreshTiles() {

				//
				// if there's no model, empty out and return
				//
				if (!this.model || !this.model.getChildIds || !this.model.getChild) {
					this.element.empty();
					return;
				}

				//
				// load the models of children that ought be displayed
				//
				var childrenToDisplay = [];
				$.each(this.model.getChildIds(), (index, childId) => {
					var getChild = ()=>{
						if (!this.circuitboard.options.entityCache[childId]) {
							this.circuitboard.options.entityCache[childId] =
								  this.model.getChild(childId);
						}
						return this.circuitboard.options.entityCache[childId];
					};

					if (this.options.filter(childId, getChild)) {
						childrenToDisplay.push(getChild());
					}
				});

				//
				// (re)layout the tiles
				//
				this.element.children().empty(); // TODO: maintain reference to tile elements
				this.element.empty();
				var rowCount = Math.floor(Math.sqrt(childrenToDisplay.length));
				var colCount = Math.ceil(childrenToDisplay.length / rowCount);
				while (rowCount--) {
					var row = $('<div/>').addClass('tilerow').appendTo(this.element);
					for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
						var tile = $('<div/>').tile({
							filter: this.options.filter,
							model: childrenToDisplay.pop(),
							tileSpacing: this.options.tileSpacing,
							_circuitboard: this.options._circuitboard
						}).appendTo(row).nestedFlexGrow(1).tile('instance');
						tile.one('destroy', tile.destroy.bind(tile));
					}
				}
			},
			_refreshTileSpacing() {
				this.element.children().css('margin-bottom', this.options.tileSpacing);
				this.element.children().children().css('margin-right', this.options.tileSpacing);
			}
		});

		//
		// refresh this tilemap now
		//
		this._refreshTiles();
		this._refreshTileSpacing();

	});

});
