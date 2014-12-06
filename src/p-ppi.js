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
	});


	// TODO: implement this properly; this is just for testing purposes
	plugin.insert('Tile.prototype.construct', function () {

		var graphGroup = new D3Group({
			parent: this,
			gravityFactor: 1,
			chargeFactor: 0.1,
			linkDistanceFactor: 0.3
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
			graphGroup.addEdge(new D3Edge({
				parent: graphGroup,
				source: graphGroup.addVertex(new D3Vertex({
					parent: graphGroup,
					cssClass: 'example'
				})),
				target: graphGroup.addVertex(new D3Vertex({
					parent: graphGroup,
					cssClass: 'example'
				})),
				cssClass: 'example'
			}));
		};

		this.on('open').not().and(this.on('visible')).onValue((showProteins) => {
			if (showProteins) {
				constructExampleProteins();
			} else {
				graphGroup.removeAllEdgesAndVertices();
			}
		});

	});


});
