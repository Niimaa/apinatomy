define([
	'jquery',
	'./amy-util/handle-premature-plugins.js',
	'./amy-p-tile-grow-when-open.scss'
], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-grow-when-open',
		after: ['tile-open', 'tile-weight'],

		'modify tile': {

			'add weightWhenOpen': function () {
				return this.circuitboard.options.weightWhenOpen || 2;
			},

			'add weightWhenClosed': function () {
				return 1;
			},

			'insert constructor': function () {
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
