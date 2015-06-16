define([
	'jquery',
	'bluebird',
	'chroma-js',
	'../util/misc.es6.js',
	'./p-tile-child-count-if-closed.scss'
], function ($, P, color, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin.do('tile-child-count-if-closed', {
		requires: ['core', 'tile-open', 'tile-skin']
	});


	plugin.append('Tile.prototype.construct', function () {

		/* create a <div> to hold the child counter */
		U.makePositioned(this.element);
		this._childCounter = $(`<div class="tile-child-counter">`).appendTo(this.element);
		this.model.get('children').get('length').then((childCount)=> {
			this._childCounter.text(childCount);
		});

	});


});
