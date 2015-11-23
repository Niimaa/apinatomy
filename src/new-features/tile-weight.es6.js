/* imports */
import $     from 'jquery';
import P     from 'bluebird';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import defer from '../util/defer.es6.js';
import TWEEN from 'tweenjs';


var plugin = $.circuitboard.plugin.do('tile-weight', {
	requires: ['positioning']
}).modify('Tile.prototype');


/* allow a tile to be `open` (or closed) */
plugin.append('construct', function () {

	/* the 'weight' observable */
	this.newProperty('weight', { initial: 1 });

	// TODO: make a tile as weighty as the sum of its children?

});
