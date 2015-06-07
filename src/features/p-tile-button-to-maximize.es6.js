define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-button-to-maximize', {
		requires: ['tile-buttons', 'tile-grow-when-maximized', 'tile-shrink-when-hidden']
	}).modify('Tile.prototype');


	plugin.append('construct', function () {

		this.addButton({ name: 'maximize', icon: {
			white: require('../util/icons/resize-max-white.png'),
			black: require('../util/icons/resize-max-black.png')
		} }).onValue(() => {
			this.hidden = false;
			this.p('fullyVisible').value(true).onValue(() => {
				this.maximized = !this.maximized;
			});
		});

	});


});
