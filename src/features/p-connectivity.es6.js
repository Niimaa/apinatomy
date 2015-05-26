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
	'./p-ppi.scss',
	'./p-connectivity.scss'
], function ($, P, Kefir, Graph, U, D3GroupP, D3VertexP, D3EdgeP, PathModel) {
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
				this.on('size').changes(),
				this.on('position').changes()
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
					parent: this,
					gravityFactor: 20,
					chargeFactor: 10
				});
				((setGraphGroupRegion) => {
					setGraphGroupRegion();
					this.on('headerSize', setGraphGroupRegion);
					this.on('headerPosition', setGraphGroupRegion);
				})(() => {
					var AREA_MARGIN = 5;
					this._p_connectivity_d3group.setRegion({
						top:    this.headerPosition.top  +   AREA_MARGIN,
						left:   this.headerPosition.left +   AREA_MARGIN,
						height: this.headerSize.height   - 2*AREA_MARGIN,
						width:  this.headerSize.width    - 2*AREA_MARGIN
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
			this._p_connectivity_graphs[type] = new Graph({
				VertexSuperclass: D3Vertex,
				EdgeSuperclass:   D3Edge,
				vertexSuperArguments: (key, value) => {
					if (value.location === 'tile') {
						return [{
							parent:   this._p_connectivity_activeTiles[key],
							cssClass: `${type} tile`,
							radius:   5
						}];
					} else {
						return [{
							parent:   this,
							cssClass: `${type} inter-tile`,
							radius:   3,
							z:        150
						}];
					}
				},
				edgeSuperArguments: (from, to) => [{
					parent:   this,
					cssClass: type
				}]
			});
			let graph = this._p_connectivity_graphs[type]; // abbreviation

			graph.on('vertex-added', (vertex) => {
				let vTile = tile(vertex.key);
				if (vertex.value.location === 'tile') {
					vTile._p_connectivity_d3group.addVertex(vertex);
				} else {
					this._p_connectivity_d3group.addVertex(vertex);
				}
				Kefir.fromEvent(graph, 'vertex-removed').filter(key => key === vertex.key).take(1).onValue(() => {
					if (vertex.value.location === 'tile') {
						vTile._p_connectivity_d3group.removeVertex(vertex);
					} else {
						this._p_connectivity_d3group.removeVertex(vertex);
					}
					vertex.destroy();
				});
			});
			graph.on('edge-added', (edge) => {
				this._p_connectivity_d3group.addEdge(edge);
				Kefir.fromEvent(graph, 'edge-removed').filter(([f, t]) => f === edge.from && t === edge.to).take(1).onValue(() => {
					this._p_connectivity_d3group.removeEdge(edge);
					edge.destroy();
				});
			});

		});
	}).insert('Circuitboard.prototype.construct', function () {

		this._p_connectivity_updateRequests = Kefir.bus();

		this._p_connectivity_updateRequests.debounce(100).onValue(() => {
			PathModel.fetchPathsFor(Object.keys(this._p_connectivity_activeTiles)).then((paths) => { // get paths (async)
				Object.keys(paths).forEach((type) => { // for all connectivity types
					this._p_connectivity_registerType(type).then(() => {
						/* creating the full connectivity graph */
						var graph = new Graph();
						for (let from of Object.keys(paths[type])) {
							graph.ensureVertex(from, { location: 'tile' });
							for (let to of Object.keys(paths[type][from])) {
								graph.ensureVertex(to, { location: 'tile' });
								let p = paths[type][from][to];
								for (let i = 0; i < p.path.length-1; ++i) {
									graph.ensureVertex(p.path[i+1], { location: 'inter-tile' });
									graph.spanEdge(p.path[i], p.path[i+1]);
								}
							}
						}

						/* remove inter-tile linear (i.e., unnecessary) vertices */
						graph.contractPaths({
							isNexus: (id, info) => info.location === 'tile'
						}); // TODO: let graph.js accept function for filling edge values
						for (let [from, to] of graph.edges()) { graph.setEdge(from, to, {}) }

						/* update the 'actual' graph by making a minimum of changes */
						this._p_connectivity_graphs[type].set(graph);
					});
				});
			});
		});

	}).add('Circuitboard.prototype._p_connectivity_fetchPaths', function () {

		this._p_connectivity_updateRequests.emit();

	});


});