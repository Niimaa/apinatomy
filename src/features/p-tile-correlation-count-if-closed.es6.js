define([
	'jquery',
	'bluebird',
	'chroma-js',
	'../util/misc.es6.js',
	'./p-tile-correlation-count-if-closed.scss'
], function ($, P, color, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin.do('tile-correlation-count-if-closed', {
		requires: ['core', 'tile-open', 'tile-skin']
	});


	plugin.append('Tile.prototype.construct', function () {

		/* create a <div> to hold the child counter */
		U.makePositioned(this.element);
		this.model.get('correlation count').then((correlationCount)=> {
			if (correlationCount > 0) {
				this._correlationCounter = $(`<div class="tile-correlation-counter">`)
					.text(correlationCount)
					.attr('title', `${correlationCount} correlations`)
					.appendTo(this.element);
			}
		});

	});


});
