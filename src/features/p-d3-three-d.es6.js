define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('d3-three-d', {
		resolves: ['d3', 'three-d-manual-controls']
	}).modify('Circuitboard.prototype');


	/* while dragging a vertex, lock the 3D camera */
	plugin.append('construct', function () {

		this.p('draggingVertex').filter(v => v && this.threeDManualControlsEnabled).onValue(() => {
			this.threeDManualControlsEnabled = false;
			setTimeout(() => {
				this.p('draggingVertex').filter(v => v === null).take(1).onValue(() => {
					this.threeDManualControlsEnabled = true;
				});
			});
		});

	});


});
