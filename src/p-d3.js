define([
	'jquery',
	'd3',
	'./util/misc.js',
	'./p-d3.scss'
], function ($, d3, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'd3',
		requires: ['core', 'position-tracking']
	}).modify('Circuitboard.prototype');


	plugin.insert('construct', function () {
		this._p_d3_vertices = {};
		this._p_d3_edges = {};


		/*  superimpose an `svg` canvas on top of the circuitboard                  */
		/*  the inner `svg` translates everything one pixel down and to the right,  */
		/*  to correspond with tile positioning                                     */
		var svgElement = $('<svg class="d3">')
				.appendTo(this.element)
				.append('<svg x="1" y="1">').children();


		/*  enable the circuitboard element to serve as anchor  */
		/*  for absolutely positioned children                  */
		U.makePositioned(this.element);


		/* create the force layout */
		this.d3Force = d3.layout.force()
				.nodes(U.objValues(this._p_d3_vertices))
				.links(U.objValues(this._p_d3_edges))
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


		/* auto-resize the force-layout canvas */
		this.on('size').map((v) => [v.width, v.height]).assign(this.d3Force, 'size');


		/* create corresponding svg elements */
		var svg = d3.select(svgElement[0]);
		var edges = svg.selectAll('.edge');
		var vertices = svg.selectAll('.vertex');


		/* visible vertices and edges */
		var visibleVertices, visibleEdges;


		/* update the graph to account for new and/or removed vertices and/or edges */
		this.updateGraph = U.debounce(() => {

			// using the d3 general update pattern:
			// http://bl.ocks.org/mbostock/3808218

			/* gather the vertices/edges that ought to be visible */
			visibleVertices = U.objValues(this._p_d3_vertices).filter((artefact) => artefact.visible);
			visibleEdges = U.objValues(this._p_d3_edges);

			/* restart the force */
			this.d3Force.nodes(visibleVertices).links(visibleEdges).start();

			/* vertices */
			vertices = svg.selectAll('.vertex').data(visibleVertices, U.field('graphId'));
			vertices.enter().append((d) => d.element[0])
					.classed('vertex', true).classed('edge', false)
					.call(this.d3Force.drag); // all vertices can be dragged around
			vertices.exit().remove();

			/* edges */
			edges = svg.selectAll('.edge').data(visibleEdges, U.field('graphId'));
			edges.enter()
					.append((d) => d.element[0])
					.classed('edge', true).classed('vertex', false);
			edges.exit().remove();

			/* define a nice visual z-order for the svg elements */
			svg.selectAll('.vertex, .edge').sort(
					(a, b) => (a.graphZIndex < b.graphZIndex) ? -1 : ((a.graphZIndex === b.graphZIndex) ? 0 : 1)
			);

		}, 200);


		/* while dragging a vertex, set the 'dragging-vertex' class on the circuitboard */
		this.d3Force.drag().on('dragstart', () => {
			svgElement.addClass('dragging-vertex');
		}).on('dragend', () => {
			svgElement.removeClass('dragging-vertex');
		});


		/* on d3 animation tick */
		this.newEvent('d3-tick');
		this.d3Force.on("tick", (e) => {

			/* make the tick event available to users of the circuitboard */
			this.trigger('d3-tick', e);

			/* dampening factor */
			var k = 0.1 * e.alpha;

			/* gravitate towards the center of the region */
			visibleVertices.forEach((d) => {
				d.x += d.group.gravityFactor * (d.group.region.left + 0.5 * d.group.region.width - d.x) * k;
				d.y += d.group.gravityFactor * (d.group.region.top + 0.5 * d.group.region.height - d.y) * k;
			});

			/* but always stay within the region */
			visibleVertices.forEach((d) => {
				d.x = Math.max(d.x, d.group.region.left);
				d.x = Math.min(d.x, d.group.region.left + d.group.region.width);
				d.y = Math.max(d.y, d.group.region.top);
				d.y = Math.min(d.y, d.group.region.top + d.group.region.height);
			});

			/* update the visible vertices and edges */
			vertices
					.attr('x', (d) => d.x)
					.attr('y', (d) => d.y);
			edges
					.attr("x1", (d) => d.source.x)
					.attr("y1", (d) => d.source.y)
					.attr("x2", (d) => d.target.x)
					.attr("y2", (d) => d.target.y);

		});

	});

});
