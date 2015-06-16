define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-button-to-unhide-children', {
		requires: ['tile-buttons', 'tile-shrink-when-hidden', 'tile-grow-when-maximized']
	}).modify('Tile.prototype');


	plugin.append('construct', function () {

		this.addButton({ name: 'unhide-children', icon: {
			white: require('../util/icons/unhide-children-white.png'),
			black: require('../util/icons/unhide-children-black.png')
		} }).onValue(() => {
			for (let child of this.closestDescendantsByType('Tile')) {
				child.hidden = false;
			}
		});

		this.p('open').onValue((open) => {
			this._buttonHolder.find('.unhide-children').css('display', open ? 'block' : 'none');
		});

	});


});
