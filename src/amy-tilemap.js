define(['jquery', './amy-util.js', './amy-tile.js', './amy-tilemap.scss'], function ($) {

	$.amyWidget('tilemap', {
		cssClass: "tilemap",
		filter: ()=>true,
		model: null,
		tileSpacing: 0,
		_cb: null
	}, function Tilemap() {

		$.extend(this, {
			_refreshTiles() {
				//// if there's no model, empty out and return
				if (!this.model || !this.model.getChildIds || !this.model.getChild) {
					this.element.empty();
					return;
				}

				//// load the models of children that ought be displayed
				var childrenToDisplay = [];
				$.each(this.model.getChildIds(), (index, childId) => {
					var getChild = ()=>{
						if (!this.options._cb.options.entityCache[childId]) {
							this.options._cb.options.entityCache[childId] =
								  this.model.getChild(childId);
						}
						return this.options._cb.options.entityCache[childId];
					};

					if (this.options.filter(childId, getChild)) {
						childrenToDisplay.push(getChild());
					}
				});

				//// (re)layout the tiles
				this.element.children().empty(); // TODO: maintain reference to tile elements
				this.element.empty();
				var rowCount = Math.round(Math.sqrt(childrenToDisplay.length));
				var colCount = Math.ceil(childrenToDisplay.length / rowCount);
				while (rowCount--) {
					var row = $('<div/>').addClass('tilerow').appendTo(this.element);
					for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
						var tile = $('<div/>').tile({
							filter: this.options.filter,
							model: childrenToDisplay.pop(),
							tileSpacing: this.options.tileSpacing,
							_cb: this.options._cb
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

		this._refreshTiles();
		this._refreshTileSpacing();

	});

});
