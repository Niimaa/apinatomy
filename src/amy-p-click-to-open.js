define(['jquery'], function ($) {
	'use strict';

	//
	// define the plugin function
	//
	function plugin(options = {}) {
		return {
			name: 'clickToOpen',
			after: ['tile-core'],
			'modify tile': {
				'insert constructor': function () {
					this.on('click', function () {
						this.open = !this.open;
						this.weight = this.open ? (options.weightWhenOpen || 2) : 1;
					});
				}
			}
		};
	}

	//
	// make the plugin available in the `$.circuitboard.p` object
	//
	if (!$.circuitboard) { $.circuitboard = {} }
	if (!$.circuitboard.p) { $.circuitboard.p = {} }
	$.circuitboard.p[plugin().name] = plugin;

	//
	// return the plugin for use by certain package loaders
	//
	return plugin;
});
