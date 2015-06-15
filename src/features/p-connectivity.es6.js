define([
	'jquery',
	'bluebird',
	'../util/kefir-and-eggs.es6.js',
	'../util/graph.es6.js',
	'../util/misc.es6.js',
	'../D3Group.es6.js',
	'../D3Vertex.es6.js',
	'../D3Edge.es6.js',
	'../util/path-model.es6.js',
	'three-js',
	'./p-ppi.scss',
	'./p-connectivity.scss'
], function ($, P, Kefir, Graph, U, D3GroupP, D3VertexP, D3EdgeP, fetchPathsFor, THREE) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('connectivity', {
		requires: ['d3', 'three-d-tubes']
	});


	////////////////////////////////////////////////////////////////////////////////////////////////


	plugin.append('Circuitboard.prototype.construct', function () {
		D3GroupP.then((D3Group) => {
			/* create the circuitboard-wide graph-group */
			this._p_connectivity_d3group = new D3Group({
				parent: this,
				gravityFactor: 0,
				chargeFactor: 0.1,
				linkDistanceFactor: 0.01,
				linkStrengthFactor: 0.1,
			});
			Kefir.merge([
				Kefir.once(),
				this.p('size'    ).changes(),
				this.p('position').changes()
			]).onValue(() => {
				var AREA_MARGIN = 5;
				this._p_connectivity_d3group.setRegion({
					top:    this.position.top  +   AREA_MARGIN,
					left:   this.position.left +   AREA_MARGIN,
					height: this.size.height   - 2*AREA_MARGIN,
					width:  this.size.width    - 2*AREA_MARGIN
				});
			});

			/* declare bookkeeping properties */
			this._p_connectivity_activeTiles = {}; // tileId -> tile
			this._p_connectivity_graphs      = {}; // type -> graph
		});
	}).append('Tile.prototype.construct', function () {
		D3GroupP.then((D3Group) => {
			/* create the tile-specific graph group */
			if (!this._p_connectivity_d3group) {
				this._p_connectivity_d3group = new D3Group({
					parent:        this,
					gravityFactor: 3,
					chargeFactor:  1
				});
				Kefir.combine([this.p('headerSize'), this.p('headerPosition')]).onValue(([size, position]) => {
					var AREA_MARGIN = 10;
					this._p_connectivity_d3group.setRegion({
						top:    position.top  +   AREA_MARGIN,
						left:   position.left +   AREA_MARGIN,
						height: size.height   - 2*AREA_MARGIN,
						width:  size.width    - 2*AREA_MARGIN
					});
				});
			}

			/* when the 'active' or 'visible property changes, initiate a graph update */
			Kefir.combine([ this.on('active'), this.on('visible') ], (a, v) => a && v).onValue((active) => {
				if (active) { this.circuitboard._p_connectivity_activeTiles[this.model.id] = this }
				else { delete this.circuitboard._p_connectivity_activeTiles[this.model.id]        }
				this.circuitboard._p_connectivity_fetchPaths();
			});
		});
	}).add('Circuitboard.prototype._p_connectivity_registerType', function (type) {
		return P.all([D3VertexP, D3EdgeP]).then(([D3Vertex, D3Edge]) => {

			/* only proceed if the type has not been registered before */
			if (this._p_connectivity_graphs[type]) { return }

			const tile = id => this._p_connectivity_activeTiles[id];

			/* create a new graph for this type */
			let graph = this._p_connectivity_graphs[type] = new Graph();
			//	VertexSuperclass: D3Vertex,
			//	EdgeSuperclass:   D3Edge,
			//	vertexSuperArguments: (key, value) => {
			//		if (value.location === 'tile') {
			//			//return [{
			//			//	parent:   this._p_connectivity_activeTiles[key],
			//			//	cssClass: `${type} tile`,
			//			//	radius:   10
			//			//}];
			//		} else {
			//			//return [{
			//			//	parent:   this,
			//			//	cssClass: `${type} inter-tile`,
			//			//	radius:   3,
			//			//	z:        150
			//			//}];
			//		}
			//	},
			//	edgeSuperArguments: (from, to) => [{
			//		parent:   this,
			//		cssClass: type
			//	}]
			//});

			graph.on('vertex-added', (vertex) => {
				let vTile = tile(vertex.value.tileId);
				let d3Vertex;
				if (vertex.value.location === 'tile') {
					d3Vertex = vertex.value.d3Vertex = new D3Vertex({
						parent:      this._p_connectivity_activeTiles[vTile],
						cssClass:    `${type} tile`,
						radius:      10,
						graphVertex: vertex
					});
					vTile._p_connectivity_d3group.addVertex(vertex.value.d3Vertex);
				} else {
					d3Vertex = vertex.value.d3Vertex = new D3Vertex({
						parent:   this,
						cssClass: `${type} inter-tile`,
						radius:   3,
						z:        150
					});
					this._p_connectivity_d3group.addVertex(vertex.value.d3Vertex);
				}
				Kefir.fromEvent(graph, 'vertex-removed').filter(key => key === vertex.key).take(1).onValue(() => {
					if (vertex.value.location === 'tile') {
						vTile._p_connectivity_d3group.removeVertex(vertex.value.d3Vertex);
					} else {
						this._p_connectivity_d3group.removeVertex(vertex.value.d3Vertex);
					}
					vertex.value.d3Vertex.destroy();
					delete vertex.value.d3Vertex;
				});
			});
			graph.on('edge-added', (edge) => {
				edge.value.d3Edge = new D3Edge({
					parent:    this,
					cssClass:  type,
					source:    edge.source.value.d3Vertex,
					target:    edge.target.value.d3Vertex,
					graphEdge: edge
				});
				this._p_connectivity_d3group.addEdge(edge.value.d3Edge);
				Kefir.fromEvent(graph, 'edge-removed').filter(([f, t]) => f === edge.from && t === edge.to).take(1).onValue(() => {
					this._p_connectivity_d3group.removeEdge(edge.value.d3Edge);
					edge.value.d3Edge.destroy();
					delete edge.value.d3Edge;
				});
			});

		});
	}).insert('Circuitboard.prototype.construct', function () {

		this._p_connectivity_updateRequests = Kefir.bus();

		this._p_connectivity_updateRequests.debounce(100).onValue(() => {
			fetchPathsFor(Object.keys(this._p_connectivity_activeTiles)).then((paths) => { // get paths (async)
				Object.keys(paths).forEach((type) => { // for all connectivity types
					this._p_connectivity_registerType(type).then(() => {

						/* creating the full connectivity graph */
						var graph = new Graph();
						for (let p of paths[type]) {
							graph.ensureVertex(p.path[0],               { location: 'tile', tileId: p.startlyph });
							graph.ensureVertex(p.path[p.path.length-1], { location: 'tile', tileId: p.endlyph   });
							for (let i = 0; i < p.path.length-1; ++i) {
								graph.ensureVertex(p.path[i+1], { location: 'inter-tile' });
								graph.spanEdge(p.path[i], p.path[i+1], { lyphTemplate: p.edges[i].template }); // TODO: this is lyph-specific stuff (hacked in)
							}
						}

						/* remove inter-tile linear (i.e., unnecessary) vertices */
						graph.contractPaths({
							isNexus: (id, info) => info.location === 'tile'
						}); // TODO: let graph.js accept function for filling edge values
						for (let [key, g] of graph.edges()) {
							graph.setEdge(key, { lyphTemplate: g.edges().next().value.value.lyphTemplate }); // TODO: this is lyph-specific stuff (hacked in)
						}

						/* update the 'actual' graph by making a minimum of changes */
						//this._p_connectivity_graphs[type].set(graph); // TODO: make this method 'not modify' vertices/edges that already exist


						for (let [key, value] of this._p_connectivity_graphs[type].edges()) {
							if (!graph.hasEdge(key)) {
								this._p_connectivity_graphs[type].removeExistingEdge(key);
							}
							//else if (value !== graph.edgeValue(key)) {
							//	this._p_connectivity_graphs[type].setEdge(key, graph.edgeValue(key));
							//}
						}
						for (let [key, value] of this._p_connectivity_graphs[type].vertices()) {
							if (!graph.hasVertex(key)) {
								this._p_connectivity_graphs[type].removeExistingVertex(key);
							}
							//else if (value !== graph.vertexValue(key)) {
							//	this._p_connectivity_graphs[type].setVertex(key, graph.vertexValue(key));
							//}
						}
						for (let [key, value] of graph.vertices()) {
							if (!this._p_connectivity_graphs[type].hasVertex(key)) {
								this._p_connectivity_graphs[type].addNewVertex(key, value);
							}
						}
						for (let [key, value] of graph.edges()) {
							if (!this._p_connectivity_graphs[type].hasEdge(key)) {
								this._p_connectivity_graphs[type].addNewEdge(key, value);
							}
						}

					});
				});
			});
		});

	}).add('Circuitboard.prototype._p_connectivity_fetchPaths', function () {

		this._p_connectivity_updateRequests.emit();

	});


});
