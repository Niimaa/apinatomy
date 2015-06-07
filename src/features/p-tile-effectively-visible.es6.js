define(['jquery', '../util/kefir-and-eggs.es6.js'], function ($, Kefir) {
	'use strict';

	var plugin = $.circuitboard.plugin.do('tile-hidden', {
		requires: ['tile-open', 'tile-hidden', 'tile-maximized']
	}).modify('Tile.prototype');

	/* allows a tile to be `hidden` */
	plugin.append('construct', function () {

		// TODO

		///* the 'effectively-visible' */
		//this.newProperty('effectively-visible').plug(Kefir.combine([
		//	this.p('visible'),
		//	this.parent.p('open'),
		//	this.parent.p('visible')
		//], (v, po, pv) => v && po && pv));
		//
		//this.p('effectively-visible').onValue((v) => {
		//	console.log(this.model.id, '--', v);
		//});


	});
});
