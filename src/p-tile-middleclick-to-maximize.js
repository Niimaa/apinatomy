define(['jquery'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-middleclick-to-maximize',
		after: ['tile-maximized'],

		'modify tile': {
			'insert constructor': function () {
				this.on('click', function (event) {
					if (event.which !== 2) { return }
					this.maximized = !this.maximized;
				});
			}
		}
	});
});
