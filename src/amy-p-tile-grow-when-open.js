define(['jquery', './amy-util/handle-premature-plugins.js'], function ($) {
	'use strict';

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
