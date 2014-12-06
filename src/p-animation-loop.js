define([
	'jquery',
	'./util/bacon-and-eggs.js'
], function ($, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'animation-loop',
		requires: ['core']
	});


	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newEvent('animation-frame', { source: Bacon.animationFrames() });

	});


});
