import $ from 'jquery';
import U from '../util/misc.es6.js';
import ArtefactP from './Artefact.es6.js';


export default ArtefactP.then((Artefact) => {


	/* however (often) this is loaded, create the class only once */
	if (U.isDefined(window._amy_D3Group)) { return window._amy_D3Group }


	window._amy_D3Group = Artefact.newSubclass('D3Group', function D3Group({parent}) {

		this.vertices = {};
		this.edges    = {};

		/* visibility */
		this.newProperty('shown', { initial: true }).plug(parent.p('shown'));

		this.newProperty('position', {
			initial: { x: 0, y: 0 },
			isEqual: (a, b) => (a.x === b.x && a.y === b.y)
		});

		this.newProperty('size', {
			initial: { width: 1, height: 1 },
			isEqual: (a, b) => (a.width === b.width && a.height === b.height)
		});

		this.p('position').onValue(() => { this.circuitboard.updateGraph() });

		this.on('destroy').take(1).onValue(() => {
			this.vertices.forEach((v) => { v.destroy() });
			// edges are destroyed when either of their vertices is destroyed
		});

	}, {

		get gravityFactor()      { return this.options.gravityFactor      },
		get chargeFactor()       { return this.options.chargeFactor       },
		get linkDistanceFactor() { return this.options.linkDistanceFactor },

		addVertex(vertex) {
			vertex.group = this;
			this.vertices[vertex.id] = vertex;
			this.circuitboard._d3_vertices[vertex.id] = vertex;
			//vertex.p('shown').plug(this.p('shown').value(false));
			//this.p('shown').plug(vertex.p('shown').value(true));
			this.circuitboard.updateGraph();
			return vertex;
		},

		removeVertex(vertex) {
			if (vertex) {
				if (typeof vertex === 'string') {
					vertex = this.vertices[vertex];
				}
				//vertex.p('shown').unplug(this.p('shown'));
				//vertex.destroy();
				delete this.circuitboard._d3_vertices[vertex.id];
				delete this.vertices[vertex.id];
				this.circuitboard.updateGraph();
			}
		},

		addEdge(edge) {
			edge.group = this;
			this.edges[edge.id] = edge;
			this.circuitboard._p_d3_edges[edge.id] = edge;
			this.circuitboard.updateGraph();
			edge.p('shown').plug(this.p('shown'));
			return edge;
		},

		removeEdge(edge) {
			if (edge) {
				if (typeof edge === 'string') {
					edge = this.edges[edge];
				}
				edge.p('shown').unplug(this.p('shown'));
				edge.destroy();
				delete this.circuitboard._p_d3_edges[edge.id];
				delete this.edges[edge.id];
				this.circuitboard.updateGraph();
			}
		},

		removeAllEdgesAndVertices() {
			Object.keys(this.edges).forEach((edgeId) => {
				if (this.edges[edgeId]) { this.removeEdge(this.edges[edgeId]); }
			});
			Object.keys(this.vertices).forEach((vertexId) => {
				if (this.vertices[vertexId]) { this.removeVertex(this.vertices[vertexId]); }
			});
			this.circuitboard.updateGraph();
		}

	}, {
		gravityFactor:      1,
		chargeFactor:       1,
		linkDistanceFactor: 1
	});


	return window._amy_D3Group;


}).tap((c) => { $.circuitboard.D3Group = c });
