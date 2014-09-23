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
		name: 'tile-grow-when-open',
		after: ['tile-open'],

		'modify tile': {
			'insert constructor': function () {
				this.on('open', function (open) {
					this.weight = open ? 2 : 1;
				});
			}
		}
	});
});
