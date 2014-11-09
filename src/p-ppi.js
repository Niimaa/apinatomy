define([
	'jquery',
	'./p-ppi.scss'
], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'ppi',
		requires: ['d3']
	}).modify('Tile.prototype');

	//
	// TODO: implement this properly; this is just for testing purposes
	//
	plugin.insert('construct', function () {

		var graphGroup = this.circuitboard.newGraphGroup();
		this.one('destroy', () => { graphGroup.remove() });

		graphGroup.setGravityFactor(1);
		graphGroup.setChargeFactor(0.1);
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
			var protein1 = {
				id: `${this.id}:protein1`,
				showVertex: true,
				graphZIndex: 200,
				get element() {
					return $('<svg x="10" y="10"><circle class="example core" r="5"></circle></svg>')[0];
				}
			};
			var protein2 = {
				id: `${this.id}:protein2`,
				showVertex: true,
				graphZIndex: 200,
				get element() {
					return $('<svg x="10" y="10"><circle class="example core" r="5"></circle></svg>')[0];
				}
			};

			graphGroup.addVertex(protein1);
			graphGroup.addVertex(protein2);
			graphGroup.addEdge({
				get element() {
					return $('<svg><line class="example edge"></line></svg>')
							.children()[0]; // adding and discarding the 'svg' element prevents a bug where the line would not appear
				},
				source: protein1,
				target: protein2,
				graphZIndex: 100
			});
		};

		this.on('open', (open) => {
			if (!open) {
				constructExampleProteins();
			} else {
				graphGroup.removeAllEdgesAndVertices();
			}
		});

		constructExampleProteins();

	});
});
