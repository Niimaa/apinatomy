define([
	'jquery',
	'./D3Group.js',
	'./D3Vertex.js',
	'./D3Edge.js',
	'./p-ppi.scss'
], function ($, D3Group, D3Vertex, D3Edge) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'ppi',
		requires: ['d3']
	}).modify('Tile.prototype');

	//
	// TODO: implement this properly; this is just for testing purposes
	//
	plugin.insert('construct', function () {

		var graphGroup = new D3Group({
			parent: this,
			gravityFactor: 1,
			chargeFactor: 0.1
		});

		((setGraphGroupRegion) => {
			setGraphGroupRegion();
			this.on('size', setGraphGroupRegion);
			this.on('position', setGraphGroupRegion);
		})(() => {
			var AREA_MARGIN = 5;
			graphGroup.setRegion({
				top: this.position.top + AREA_MARGIN,
				left: this.position.left + AREA_MARGIN,
				height: this.size.height - 2 * AREA_MARGIN,
				width: this.size.width - 2 * AREA_MARGIN
			});
		});

		var constructExampleProteins = () => {
			var protein1 = new D3Vertex({
				parent: graphGroup,
				cssClass: 'example'
			});
			var protein2 = new D3Vertex({
				parent: graphGroup,
				cssClass: 'example'
			});

			graphGroup.addVertex(protein1);
			graphGroup.addVertex(protein2);
			graphGroup.addEdge(new D3Edge({
				parent: graphGroup,
				source: protein1,
				target: protein2,
				cssClass: 'example'
			}));
		};

		this.observe('open', (open) => {
			if (!open) {
				constructExampleProteins();
			} else {
				graphGroup.removeAllEdgesAndVertices();
			}
		});

	});
});
