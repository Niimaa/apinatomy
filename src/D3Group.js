define(['./util/misc.js', './util/artefact.js'], function (U, Artefact) {
	'use strict';


	return Artefact.newSubclass('D3Group', function D3Group() {

		U.extend(this, {
			vertices: [],
			edges: []
		});

	}, {

		get gravityFactor()      { return this.options.gravityFactor      },
		get chargeFactor()       { return this.options.chargeFactor       },
		get linkDistanceFactor() { return this.options.linkDistanceFactor },

		setRegion(region) {
			this.region = region;
			this.circuitboard.updateGraph();
		},

		addVertex(vertex) {
			vertex.group = this;
			vertex.groupVertexIndex = this.vertices.length;
			this.vertices.push(vertex);
			vertex.graphId = vertex.id;
			this.circuitboard._p_d3_vertices[vertex.graphId] = vertex;
			this.trigger('vertex-added', vertex);
			this.circuitboard.updateGraph();
		},

		removeVertex(vertex) {
			if (vertex) {
				delete this.circuitboard._p_d3_vertices[vertex.graphId];
				U.pull(this.vertices, vertex);
				this.vertices.forEach(function (vertex, i) {
					vertex.groupVertexIndex = i;
				});
				this.trigger('vertex-removed', vertex);
				this.circuitboard.updateGraph();
			}
		},

		addEdge(edge) {
			edge.group = this;
			this.edges.push(edge);
			edge.graphId = this.id + ':' + edge.id;
			this.circuitboard._p_d3_edges[edge.graphId] = edge;
			this.trigger('edge-added', edge);
			this.circuitboard.updateGraph();
		},

		removeEdge(edge) {
			if (edge) {
				delete this.circuitboard._p_d3_edges[edge.graphId];
				U.pull(this.edges, edge);
				this.trigger('edge-removed', edge);
				this.circuitboard.updateGraph();
			}
		},

		removeAllEdgesAndVertices() {
			this.edges.forEach((edge) => {
				if (edge) { this.removeEdge(edge); }
			});
			this.vertices.forEach((vertex) => {
				if (vertex) { this.removeVertex(vertex); }
			});
			U.makeEmpty(this.edges);
			U.makeEmpty(this.vertices);
			this.circuitboard.updateGraph();
		},

		vertexCount() { return this.vertices.length },

		vertices() { return this.vertices.slice() },

		edges() { return this.vertices.slice() }

	}, {
		gravityFactor: 1,
		chargeFactor: 1,
		linkDistanceFactor: 1,
		region: { // the whole canvas with a small padding
			top: 10,
			left: 10,
			get width() { return this.circuitboard.size.width - 20 },
			get height() { return this.circuitboard.size.height - 20 }
		}
	});


});
