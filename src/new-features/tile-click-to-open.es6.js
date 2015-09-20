/* imports */
import $ from 'jquery';


/* the 'tile-click-to-open' plugin */
var plugin = $.circuitboard.plugin.do('tile-click-to-open', {
	requires: ['3d', 'tile-open']
}).modify('Tile.prototype');


/* allow a tile to be `open` (or closed) */
plugin.append('construct', function () {

	this.event('click').onValue(() => {
		this.open = !this.open;
	});

});
