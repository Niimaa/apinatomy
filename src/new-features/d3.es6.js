/* imports */
import $     from 'jquery';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import d3    from 'd3';


let plugin = $.circuitboard.plugin.do('d3', {
	requires: ['core', 'positioning']
}).modify('Circuitboard.prototype');


plugin.append('construct', function () {
	this._d3_vertices = {};
	this._d3_edges = {};


	/* create the force layout */
	this.d3Force = d3.layout.force()
		.gravity(0) // gravity is handled per D3Group
		.charge(d => -2 * Math.max(d.group.size.width, d.group.size.height)
		                * U.defOr(d.group.chargeFactor, 1)
		                * U.defOr(d.chargeFactor, 1))
		.chargeDistance(200)
		.linkDistance(d => (d.group.size.width + d.group.size.height)
		                   * U.defOr(d.group.linkDistanceFactor, 1)
		                   * U.defOr(d.linkDistanceFactor, 1)
		                   / Math.sqrt(d.group.vertices.length || 1))
		.linkStrength(d => 0.8 * U.defOr(d.group.linkStrengthFactor, 1));


	/* auto-resize the force-layout area */
	this.p('size').onValue(({width, height}) => { this.d3Force.size([width, height]) });


	/* keep track of whether the graph is stable; if not, do not fire 'tick' events */
	let graphStable = Kefir.bus();
	graphStable.emit(true);
	this.updateGraph = () => { graphStable.emit(false) };


	/* update the graph to account for new and/or removed vertices and/or edges */
	graphStable.filter(v => !v).debounce(200).onValue(() => {

		this.d3Force
			.nodes(U.objValues(this._d3_vertices))
			.links(U.objValues(this._d3_edges))
			.start();

		graphStable.emit(true);

	});


	/* performing animation on a tick */
	// kefir stream version (if needed) is: Kefir.fromOnNull(this.d3Force, 'tick')
	// TODO: make sure there's a 'tick' before every '3d-render'
	this.d3Force.on('tick', (e) => {
		/* dampening factor */
		var k = 0.1 * e.alpha;

		for (let d of U.objValues(this._d3_vertices)) {
			let {x, y} = d.position;
			x += k * d.group.gravityFactor * (d.group.position.x + .5 * d.group.size.width  - x);
			y += k * d.group.gravityFactor * (d.group.position.y + .5 * d.group.size.height - y);
			d.position = {x, y};
		}

	});


});
