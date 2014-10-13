define([
	'jquery',
	'./util/handle-premature-plugins.js',
	'./p-tile-grow-when-open.scss'
], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-grow-when-open',
		require: ['tile-open', 'tile-weight'],
		after: ['tile-open', 'tile-weight'],

		'modify tile': {

			'add weightWhenOpen': function () { return this.circuitboard.options.weightWhenOpen || 2 },

			'add weightWhenClosed': () => 1,

			'insert construct': function () {
				//
				// react to a tile opening or closing
				// by changing its weight accordingly
				//
				this.on('open', (open) => {
					this.weight = (open ? this.weightWhenOpen() : this.weightWhenClosed());
				});
			}
		}
	});
});
