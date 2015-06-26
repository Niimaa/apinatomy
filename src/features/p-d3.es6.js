define([
	'jquery',
	'../../bower_components/d3/d3',
	'../util/misc.es6.js',
	'../util/kefir-and-eggs.es6.js',
	'../util/jquery-svg-class.es6.js',
	'./p-d3.scss'
], function ($, d3, U, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('d3', {
		requires: ['core', 'position-tracking']
	}).modify('Circuitboard.prototype');


	plugin.append('construct', function () {
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
			.gravity(0)
			.charge(d => -2 * Math.max(d.group.region.width, d.group.region.height)
			                * U.defOr(d.group.chargeFactor, 1)
			                * U.defOr(d.chargeFactor, 1))
			.chargeDistance(200)
			.linkDistance(d => (d.group.region.width + d.group.region.height)
			                   * U.defOr(d.group.linkDistanceFactor, 1)
			                   * U.defOr(d.linkDistanceFactor, 1)
			                   / Math.sqrt(d.group.vertices.length || 1))
			.linkStrength(d => 0.8 * U.defOr(d.group.linkStrengthFactor, 1));


		/* auto-resize the force-layout canvas */
		this.on('size').map(v => [v.width, v.height]).onValue((s) => {
			this.d3Force.size(s);
		});


		/* create corresponding svg elements */
		var svg      = d3.select(svgElement[0]);
		var edges    = svg.selectAll('.edge');
		var vertices = svg.selectAll('.vertex');


		/* visible vertices and edges */
		var visibleVertices, visibleEdges;

		/* keep track of whether the graph is stable; if not, do not fire 'tick' events */
		let graphStable = Kefir.bus();
		graphStable.emit(true);
		this.updateGraph = () => { graphStable.emit(false) };

		/* update the graph to account for new and/or removed vertices and/or edges */
		graphStable.filter(v => !v).debounce(200).onValue(() => {
			// using the d3 general update pattern:
			// http://bl.ocks.org/mbostock/3808218

			/* gather the vertices/edges that ought to be visible */
			visibleVertices = U.objValues(this._p_d3_vertices).filter(v => v.visible);
			visibleEdges    = U.objValues(this._p_d3_edges);

			/* restart the force */
			this.d3Force.nodes(visibleVertices).links(visibleEdges).start();

			/* vertices */
			vertices = svg.selectAll('.vertex').data(visibleVertices, d => d.graphId);
			vertices.enter().append(d => d.element[0])
				.classed('vertex', true).classed('edge', false)
				.call(this.d3Force.drag) // all vertices can be dragged around
				.append('svg:title').text(d => d.options.tooltipText);
			vertices.exit().remove();

			/* edges */
			edges = svg.selectAll('.edge').data(visibleEdges, d => d.graphId);
			edges.enter()
			     .append(d => d.element[0])
			     .classed('edge', true).classed('vertex', false);
			edges.exit().remove();

			/* define a nice visual z-order for the svg elements */
			svg.selectAll('.vertex, .edge').sort(
				(a, b) => (a.graphZIndex < b.graphZIndex) ? -1 : ((a.graphZIndex === b.graphZIndex) ? 0 : 1)
			);

			graphStable.emit(true);

		});


		/* a property for which vertex (if any) is being dragged */
		var currentEventData = () => d3.select(d3.event.sourceEvent.target.parentElement).data()[0];
		this.newProperty('draggingVertex', { initial: null }).plug(Kefir.merge([
			Kefir.fromOnNull(this.d3Force.drag(), 'dragstart').map(currentEventData),
			Kefir.fromOnNull(this.d3Force.drag(), 'dragend').mapTo(null)
		]));


		/* add a 'dragging' css class to a vertex being dragged */
		this.p('draggingVertex').newOld().onValue(([newVertex, oldVertex]) => {
			if (newVertex) { newVertex.element.addSvgClass   ('dragging') }
			if (oldVertex) { oldVertex.element.removeSvgClass('dragging') }
		});


		/* the 'd3-tick' event-stream, and performing animation on a tick */
		this.newEvent('d3-tick', { source: Kefir.fromOnNull(this.d3Force, 'tick') }).filterBy(graphStable).onValue((e) => {
			/* dampening factor */
			var k = 0.1 * e.alpha;

			for (let d of visibleVertices) {
				let x = d.x,
					y = d.y;
				x += k * d.group.gravityFactor * (d.group.region.left + 0.5 * d.group.region.width  - x);
				y += k * d.group.gravityFactor * (d.group.region.top  + 0.5 * d.group.region.height - y);
				x = Math.min(Math.max(x, d.group.region.left), d.group.region.left + d.group.region.width );
				y = Math.min(Math.max(y, d.group.region.top ), d.group.region.top  + d.group.region.height);
				d.x = x;
				d.y = y;
			}

			/* update the visible vertices and edges */
			for (let d of visibleVertices) { d.updateVisualization() }
			for (let d of visibleEdges)    { d.updateVisualization() }
		});


	});


});
