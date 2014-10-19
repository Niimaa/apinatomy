define([
	'jquery',
	'./p-tile-grow-when-open.scss'
], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		id: 'tile-grow-when-open',
		requires: ['tile-open', 'tile-weight']
	}).modify('Tile.prototype');

	//
	// default weights for open / closed tiles
	//
	plugin.add('weightWhenOpen', function () { return this.circuitboard.options.weightWhenOpen || 2 });
	plugin.add('weightWhenClosed', () => 1);

	//
	// react to a tile opening or closing
	// by changing its weight accordingly
	//
	plugin.insert('construct', function () {
		this.on('open', (open) => {
			this.weight = (open ? this.weightWhenOpen() : this.weightWhenClosed());
		});
	});
});
