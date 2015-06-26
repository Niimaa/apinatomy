define([
	'jquery',
	'bluebird',
	'../util/kefir-and-eggs.es6.js',
	'../util/graph.es6.js',
	'../util/misc.es6.js',
	'../D3Group.es6.js',
	'../D3Vertex.es6.js',
	'./p-tile-glyphs.scss'
], function ($, P, Kefir, Graph, U, D3GroupP, D3VertexP) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-glyphs', {
		requires: ['d3']
	});


	////////////////////////////////////////////////////////////////////////////////////////////////


	plugin.append('Tile.prototype.construct', function () {
		let D3Group  = D3GroupP.value();

		/* create the tile-specific graph group */
		this._p_glyph_d3group = new D3Group({
			parent:        this,
			gravityFactor: 1,
			chargeFactor:  1
		});
		Kefir.combine([this.p('headerSize'), this.p('headerPosition')]).onValue(([size, position]) => {
			var AREA_MARGIN = 9;

			let top  ,
				left ,
				height,
				width;
			if (size.height < 2 * AREA_MARGIN + 1) {
				top    = size.height / 2;
				height = 1;
			} else {
				top    = position.top  +   AREA_MARGIN;
				height = size.height   - 2*AREA_MARGIN;
			}
			if (size.width < 2 * AREA_MARGIN + 1) {
				left  = size.width / 2;
				width = 1;
			} else {
				left  = position.left +   AREA_MARGIN;
				width = size.width    - 2*AREA_MARGIN;
			}

			this._p_glyph_d3group.setRegion({ top, left, height, width });
		});
	}).add('Tile.prototype.addGlyph', function ({ tooltipText, shape }) {
		let D3Vertex = D3VertexP.value();
		let vertex = new D3Vertex({
			parent:   this,
			cssClass: 'glyph',
			radius:   16,
			tooltipText,
			shape
		});
		vertex.visible = false; // initially not visible
		this._p_glyph_d3group.addVertex(vertex);
		return vertex;
	});


});
