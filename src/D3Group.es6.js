define(['jquery', './util/misc.es6.js', './Artefact.es6.js'], function ($, U, ArtefactP) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_D3Group)) { return window._amy_D3Group }


		window._amy_D3Group = Artefact.newSubclass('D3Group', function D3Group() {

			U.extend(this, {
				vertices: {},
				edges: {}
			});

			this.on('destroy').take(1).onValue(() => {
				this.vertices.forEach((v) => { v.destroy() });
				// edges are destroyed when either of their vertices is destroyed
			});

		}, {

			get gravityFactor() { return this.options.gravityFactor },
			get chargeFactor() { return this.options.chargeFactor },
			get linkDistanceFactor() { return this.options.linkDistanceFactor },

			setRegion(region) {
				this.region = region;
				this.circuitboard.updateGraph();
			},

			addVertex(vertex) {
				vertex.group = this;
				this.vertices[vertex.id] = vertex;
				vertex.graphId = vertex.id;
				this.circuitboard._p_d3_vertices[vertex.graphId] = vertex;
				vertex.p('visible').onValue(() => { this.circuitboard.updateGraph() });
				return vertex;
			},

			removeVertex(vertex) {
				if (vertex) {
					if (typeof vertex === 'string') {
						vertex = this.vertices[vertex];
					}
					vertex.destroy();
					delete this.circuitboard._p_d3_vertices[vertex.graphId];
					delete this.vertices[vertex];
					this.circuitboard.updateGraph();
				}
			},

			addEdge(edge) {
				edge.group = this;
				this.edges[edge.id] = edge;
				edge.graphId = this.id + ':' + edge.id;
				this.circuitboard._p_d3_edges[edge.graphId] = edge;
				edge.p('visible').onValue(() => { this.circuitboard.updateGraph() });
				return edge;
			},

			removeEdge(edge) {
				if (edge) {
					if (typeof edge === 'string') {
						edge = this.edges[edge];
					}
					edge.destroy();
					delete this.circuitboard._p_d3_edges[edge.graphId];
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
			gravityFactor: 1,
			chargeFactor: 1,
			linkDistanceFactor: 1,
			region: { // default to the whole canvas with a small padding
				top: 10,
				left: 10,
				get width() { return this.circuitboard.size.width - 20 },
				get height() { return this.circuitboard.size.height - 20 }
			}
		});


		return window._amy_D3Group;


	}).tap((c) => { $.circuitboard.D3Group = c });


});
