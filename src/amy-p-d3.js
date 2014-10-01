define([
	'jquery',
	'd3',
	'./amy-util/misc.js',
	'./amy-util/unique-id.js',
	'./amy-util/watch-multiple.js',
	'./amy-util/handle-premature-plugins.js',
	'./amy-p-d3.scss'
], function ($, d3, U, uniqueId) {
	'use strict';

	$.circuitboard.plugin({
		name: 'd3',
		after: ['circuitboard-core', 'tilemap-core', 'tile-core'],

		'modify circuitboard': {

			'add _p_d3_vertices': {},
			'add _p_d3_edges': {},

			'insert constructor': function () {
				//
				// superimpose an `svg` canvas on top of the circuitboard
				//
				var svgElement = $('<svg class="d3">').appendTo(this.element);

				//
				// enable the circuitboard element to serve as anchor
				// for absolutely positioned children
				//
				U.makePositioned(this.element);

				//
				// create the force layout
				//
				var force = d3.layout.force()
					.nodes(U.objValues(this._p_d3_vertices))
					.links(U.objValues(this._p_d3_edges))
					.size([this.width, this.height])
					.gravity(0)
					.charge(function (d) {
						return -0.025 *
							d.group.chargeFactor *
							d.group.region.width *
							d.group.region.height *
							(U.defOr(d.chargeFactor, 1)) /
							(d.group.vertices.length || 1);
					})
					.linkDistance(function (d) {
						return 0.01 *
							d.group.linkDistanceFactor *
							d.group.region.width *
							d.group.region.height *
							(U.defOr(d.linkDistanceFactor, 1)) /
							(d.group.vertices.length || 1);
					})
					.linkStrength(0.8);

				//
				// auto-resize the force-layout canvas
				//
				this.on('size', (size) => { force.size([size.width, size.height]) });

				//
				// create corresponding svg elements
				//
				var svg = d3.select(svgElement[0]);
				var edges = svg.selectAll('.edge');
				var vertices = svg.selectAll('.vertex');

				//
				// visible vertices and edges
				//
				var visibleVertices, visibleEdges;

				//
				// update the graph to account for new and/or removed vertices and/or edges
				//
				this.updateGraph = U.debounce(() => {

					// using the d3 general update pattern:
					// http://bl.ocks.org/mbostock/3808218

					visibleVertices = U.objValues(this._p_d3_vertices).filter((artefact) => artefact.showVertex);
					visibleEdges = U.objValues(this._p_d3_edges);

					//// restart the force
					//
					force.nodes(visibleVertices).links(visibleEdges).start();

					//// vertices
					//
					vertices = svg.selectAll('.vertex').data(visibleVertices, U.field('graphId'));
					vertices.enter().append((d) => d.element)
						.classed('vertex', true).classed('edge', false)
						.call(force.drag); // all vertices can be dragged around
					vertices.exit().remove();

					//// edges
					//
					edges = svg.selectAll('.edge').data(visibleEdges, U.field('graphId'));
					edges.enter().append((d) => d.element)
						.classed('edge', true).classed('vertex', false);
					edges.exit().remove();

					//// define a nice visual z-order for the svg elements
					//
					svg.selectAll('.vertex, .edge').sort(
						(a, b) => (a.graphZIndex < b.graphZIndex) ? -1 : ((a.graphZIndex === b.graphZIndex) ? 0 : 1)
					);

				}, 200);

				//
				// on d3 animation tick
				//
				force.on("tick", (e) => {
					var k = 0.1 * e.alpha;

					visibleVertices.forEach(function (d) {
						if (d.group.regionType === 'rectangular') {
							//
							// gravitate towards the center of the region
							//
							d.x += d.group.gravityFactor * (d.group.region.left + 0.5 * d.group.region.width - d.x) * k;
							d.y += d.group.gravityFactor * (d.group.region.top + 0.5 * d.group.region.height - d.y) * k;

							//
							// and always stay within the region
							//
							d.x = Math.max(d.x, d.group.region.left);
							d.x = Math.min(d.x, d.group.region.left + d.group.region.width);
							d.y = Math.max(d.y, d.group.region.top);
							d.y = Math.min(d.y, d.group.region.top + d.group.region.height);
						} else { // linear region
							//
							// position at the proper place on the line segment
							//
							var pos = (d.groupVertexIndex + 1) / (d.group.vertices.length + 1);
							d.x = pos * d.group.region.source.x + (1 - pos) * d.group.region.target.x;
							d.y = pos * d.group.region.source.y + (1 - pos) * d.group.region.target.y;
						}
					});

					vertices
						.attr('x', (d) => d.x)
						.attr('y', (d) => d.y);
					edges
						.attr("x1", (d) => d.source.x)
						.attr("y1", (d) => d.source.y)
						.attr("x2", (d) => d.target.x)
						.attr("y2", (d) => d.target.y);
				});

				//
				// Give the circuitboard a function for creating new interfaces,
				// used to create vertices and edges and such:
				//
				$.extend(this, {
					newGraphGroup() {
						var tile = this;
						var group = {
							id: uniqueId('group'),
							vertices: [],
							edges: [],
							gravityFactor: 1,
							chargeFactor: 1,
							linkDistanceFactor: 1,
							region: { // by default, the whole canvas with a small padding
								top: 10,
								left: 10,
								get width() { return tile.width - 20 },
								get height() { return tile.height - 20 }
							},
							get regionType() {
								return (U.isDefined(group.region.source) ? 'linear' : 'rectangular');
							}
						};
						return {
							remove() {
								// called when a graph group is discarded;
								// may do stuff in the future
							},
							setGravityFactor(factor) {
								group.gravityFactor = factor;
							},
							setChargeFactor(factor) {
								group.chargeFactor = factor;
							},
							setLinkDistanceFactor(factor) {
								group.linkDistanceFactor = factor;
							},
							setRegion(region) {
								group.region = region;
								tile.updateGraph();
							},
							addVertex(vertex) {
								vertex.group = group;
								vertex.groupVertexIndex = group.vertices.length;
								group.vertices.push(vertex);
								vertex.graphId = vertex.id;
								tile._p_d3_vertices[vertex.graphId] = vertex;
								tile.updateGraph();
							},
							removeVertex(vertex) {
								if (vertex) {
									delete tile._p_d3_vertices[vertex.graphId];
									U.pull(group.vertices, vertex);
									group.vertices.forEach(function (vertex, i) {
										vertex.groupVertexIndex = i;
									});
									tile.updateGraph();
								}
							},
							addEdge(edge) {
								edge.group = group;
								group.edges.push(edge);
								edge.graphId = group.id + ':' + edge.id;
								tile._p_d3_edges[edge.graphId] = edge;
								tile.updateGraph();
							},
							removeEdge(edge) {
								if (edge) {
									delete tile._p_d3_edges[edge.graphId];
									U.pull(group.edges, edge);
									tile.updateGraph();
								}
							},
							removeAllEdgesAndVertices() {
								group.edges.forEach((edge) => {
									if (edge) { delete tile._p_d3_edges[edge.graphId]; }
								});
								group.vertices.forEach((vertex) => {
									if (vertex) { delete tile._p_d3_vertices[vertex.graphId]; }
								});
								U.makeEmpty(group.edges);
								U.makeEmpty(group.vertices);
								tile.updateGraph();
							},
							vertexCount() { return group.vertices.length },
							vertices() { return group.vertices.slice() },
							edges() { return group.vertices.slice() }
						};
					}
				});


			},

			'add updateGraph': null, // to set in the constructor
			'add newGraphGroup': null  // to set in the constructor
		},


		//
		// TODO : remove this operation; it is just for testing purposes
		//
		'modify tile': {
			'insert constructor': function () {

				var graphGroup = this.circuitboard.newGraphGroup();
				this.on('destroy', () => { graphGroup.remove() });

				var setGraphGroupRegion = () => {
					graphGroup.setRegion($.extend({}, this.position, this.size));
				};

				graphGroup.setGravityFactor(1);
				graphGroup.setChargeFactor(0.1);
				this.on('size', setGraphGroupRegion);
				this.on('position', setGraphGroupRegion);


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

			}
		}


	});
});
