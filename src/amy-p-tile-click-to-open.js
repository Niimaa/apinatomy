define(['jquery', './amy-circuitboard.js'], function ($) {
	'use strict';

	//
	// expect $.circuitboard to be defined
	//
	if (!$.circuitboard) {
		throw Error(
				"Can't access '$.circuitboard'. " +
				"Please load the core circuitboard module before loading any plugins."
		);
	}

	//
	// define the plugin
	//
	$.circuitboard.plugin({
		name: 'tile-click-to-open',
		after: ['tile-open'],

		'modify tile': {
			'insert constructor': function () {
				this.on('click', function () {
					this.open = !this.open;
				});
			}
		}
	});
});
