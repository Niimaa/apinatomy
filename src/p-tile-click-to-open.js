define(['jquery', './util/handle-premature-plugins.js'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-click-to-open',
		require: ['tile-open'],
		after: ['tile-open'],

		'modify tile': {
			'insert construct': function () {
				this.on('click-not-drop', function (event) {
					if (event.which !== 1) { return }
					this.open = !this.open;
				});
			}
		}
	});
});
