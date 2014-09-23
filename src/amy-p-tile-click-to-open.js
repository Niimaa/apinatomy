define(['jquery', './amy-util/handle-premature-plugins.js'], function ($) {
	'use strict';

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
