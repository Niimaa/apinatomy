/* imports */
import $     from 'jquery';
import P     from 'bluebird';
import TWEEN from 'tweenjs';


/* the 'tile-open' plugin */
var plugin = $.circuitboard.plugin.do('tile-open', {
	requires: ['core', 'tile-weight', '3d']
});


/* allow a tile to be `open` (or closed) */
plugin.modify('Tile.prototype')
	.append('construct', function () {

		/* the 'open' observable */
		this.newProperty('open', { initial: false });

		/* when the tile opens, populate the inner tilemap */
		this.p('open').onValue((open) => {
			let tilemap = this.closestDescendantByType('Tilemap');
			if (!open) {
				if (tilemap) {
					//this.object3D.remove(tilemap.object3D);
					//tilemap.object3D.skipDomEvents = true;
					tilemap.shown = false;
				}
			}

			let weightChange = new P(resolve => new TWEEN.Tween(this)
				.to({ weight: open ? this.circuitboard.options.weightWhenOpen || 6 : 1 }, 500)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start().onComplete(resolve));

			let headerSeparatorChange = new P(resolve => new TWEEN.Tween(this)
				.to({ headerTilemapSeparator: open ? 1 : 0 }, 500)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start().onComplete(resolve));

			weightChange.then(() => {
				if (open) {
					this.populateInnerTilemap();
					if (tilemap) {
						//this.object3D.add(tilemap.object3D);
						//tilemap.object3D.skipDomEvents = false;
						tilemap.shown = true;
					}
				}
			});
		});

		/* if this tile closes, all its children close */
		this.p('open').value(false).onValue(() => {
			this.closestDescendantsByType('Tile').forEach((tile) => {
				tile.open = false;
			});
		});

	});
