define(['jquery'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-middleclick-to-maximize',
		require: ['tile-maximized'],
		after: ['tile-maximized'],

		'modify tile': {
			'insert construct': function () {
				this.on('click', function (event) {
					if (event.which !== 2) { return }
					this.maximized = !this.maximized;
				});
			}
		}
	});
});
