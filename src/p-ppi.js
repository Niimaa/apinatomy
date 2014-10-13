define([
	'jquery',
	'./util/handle-premature-plugins.js',
	'./p-ppi.scss'
], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'ppi',
		after: ['d3'],
		require: ['d3'],

		//
		// TODO: implement this properly; this is just for testing purposes
		//
		'modify tile': {
			'insert construct': function () {

				var graphGroup = this.circuitboard.newGraphGroup();
				this.on('destroy', () => { graphGroup.remove() });

				var setGraphGroupRegion = () => {
					var AREA_MARGIN = 5;
					graphGroup.setRegion({
						top: this.position.top + AREA_MARGIN,
						left: this.position.left + AREA_MARGIN,
						height: this.size.height - 2 * AREA_MARGIN,
						width: this.size.width - 2 * AREA_MARGIN
					});
				};

				graphGroup.setGravityFactor(1);
				graphGroup.setChargeFactor(0.1);
				this.on('size', setGraphGroupRegion);
				this.on('position', setGraphGroupRegion);

				var constructExampleProteins = () => {
					var protein1 = {
						id: this.id + ':' + 'protein1',
						showVertex: true,
						graphZIndex: 200,
						get element() {
							return $('<svg x="10" y="10"><circle class="example core" r="5"></circle></svg>')[0];
						}
					};
					var protein2 = {
						id: this.id + ':' + 'protein2',
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

			}
		}

	});
});
