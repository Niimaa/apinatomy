define([
	'jquery',
	'bluebird',
	'../util/kefir-and-eggs.es6.js',
	'graph.js',
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
		requires: ['d3']
	});


	////////////////////////////////////////////////////////////////////////////////////////////////


	plugin.append('Circuitboard.prototype.construct', function () {

		D3GroupP.then((D3Group) => {
			/* create the circuitboard-wide graph-group */
			this._p_connectivity_d3group = new D3Group({
				parent: this,
				chargeFactor: 0.1,
				linkDistanceFactor: 0.04
			});
			Kefir.merge([
				Kefir.once(),
				this.on('size').changes(),
				this.on('position').changes()
			]).onValue(() => {
				var AREA_MARGIN = 5;
				this._p_connectivity_d3group.setRegion({
					top: this.position.top + AREA_MARGIN,
					left: this.position.left + AREA_MARGIN,
					height: this.size.height - 2 * AREA_MARGIN,
					width: this.size.width - 2 * AREA_MARGIN
				});
			});

			/* declare bookkeeping properties */
			this._p_connectivity_activeTiles = {}; // tileId -> tile
			this._p_connectivity_graphs = {}; // type -> graph
		});

	}).append('Tile.prototype.construct', function () {

		D3GroupP.then((D3Group) => {
			/* create the tile-specific graph group */
			if (!this._p_connectivity_d3group) {
				this._p_connectivity_d3group = new D3Group({
					parent: this
				});
				((setGraphGroupRegion) => {
					setGraphGroupRegion();
					this.on('headerSize', setGraphGroupRegion);
					this.on('headerPosition', setGraphGroupRegion);
				})(() => {
					var AREA_MARGIN = 5;
					this._p_connectivity_d3group.setRegion({
						top:    this.headerPosition.top  +     AREA_MARGIN,
						left:   this.headerPosition.left +     AREA_MARGIN,
						height: this.headerSize.height   - 2 * AREA_MARGIN,
						width:  this.headerSize.width    - 2 * AREA_MARGIN
					});
				});
			}

			/* active tiles are eligible to participate in the graph */
			this.on('active').onValue((active) => {
				if (active) { this.circuitboard._p_connectivity_activeTiles[this.model.id] = this }
				else { delete this.circuitboard._p_connectivity_activeTiles[this.model.id]        }
			});

			/* when the 'active' property changes, initiate a graph update */
			this.on('active').onValue(() => { this.circuitboard._p_connectivity_fetchPaths() });
		});

	}).add('Circuitboard.prototype._p_connectivity_registerType', function (type) {

		return P.all([D3VertexP, D3EdgeP]).then(([D3Vertex, D3Edge]) => {

			/* only proceed if the type has not been registered before */
			if (this._p_connectivity_graphs[type]) { return }

			/* create a new graph for this type */
			this._p_connectivity_graphs[type] = new Graph();
			var graph = this._p_connectivity_graphs[type]; // abbreviation

			// The blocks below react to changes to the stored graph,
			// to reflect those changes to the visible (d3) graph.

			/* reflect tile-based vertices */
			graph.onAddVertex((id, info) => { // TODO: these event handlers no longer exist in the Graph class

				console.log(id, info, this._p_connectivity_activeTiles[id]); // TODO: remove debugging code

				if (info.location === 'tile') {
					var tile = this._p_connectivity_activeTiles[id]; // abbreviation
					//console.log(id, tile);
					info.d3Object = new D3Vertex({
						parent: tile,
						radius: 5,
						cssClass: type
					});
					tile._p_connectivity_d3group.addVertex(info.d3Object);
					graph.onRemoveVertex((removedId) => {
						if (removedId !== id) { return }
						tile._p_connectivity_d3group.removeVertex(info.d3Object);
						delete info.d3Object;
					});
				}
			});

			/* reflect inter-tile junctions */
			graph.onAddVertex((id, info) => { // TODO: these event handlers no longer exist in the Graph class
				if (info.location === 'inter-tile') {
					info.d3Object = new D3Vertex({
						parent: this,
						radius: 3,
						cssClass: `${type} inter-tile`
					});
					this._p_connectivity_d3group.addVertex(info.d3Object);
					graph.onRemoveVertex((removedId) => {
						if (removedId !== id) { return }
						this._p_connectivity_d3group.removeVertex(info.d3Object);
						delete info.d3Object;
					});
				}
			});

			/* reflect edges */
			graph.onAddEdge((from, to, info) => { // TODO: these event handlers no longer exist in the Graph class
				info.d3Object = new D3Edge({
					parent: this,
					source: this._p_connectivity_graphs[type].vertexValue(from).d3Object,
					target: this._p_connectivity_graphs[type].vertexValue(to).d3Object,
					cssClass: type // TODO: arterial / venous
				});
				this._p_connectivity_d3group.addEdge(info.d3Object);
				graph.onRemoveEdge((removedFrom, removedTo) => {
					if (removedFrom !== from || removedTo !== to) { return }
					this._p_connectivity_d3group.removeEdge(info.d3Object);
				});
			});

		});

	}).insert('Circuitboard.prototype.construct', function () {
		// TODO: remove?
	}).add('Circuitboard.prototype._p_connectivity_fetchPaths', U.debounce(function () {
		PathModel.fetchPathsFor(Object.keys(this._p_connectivity_activeTiles)).then(() => { // get paths (async)
			Object.keys(PathModel.paths).forEach((type) => { // for all connectivity types
				this._p_connectivity_registerType(type).then(() => {

					/* register the type and abbreviate the graph */
					var graph = this._p_connectivity_graphs[type]; // abbreviation

					/* a convenient way to cycle through the paths */
					var forAllPaths = (cb, options) => {
						options = options || {};
						Object.keys(PathModel.paths[type]).forEach((from) => {
							if (options.skipInactiveTiles && !this._p_connectivity_activeTiles[from]) { return }
							Object.keys(PathModel.paths[type][from]).forEach((to) => {
								if (options.skipInactiveTiles && !this._p_connectivity_activeTiles[to]) { return }
								cb(from, to, PathModel.paths[type][from][to].path);
							});
						});
					};

					/* analyze the inner junctions, so we can hide linear ones */
					var junctionsToTiles = {}; // junction/tile -> tile/junction -> true
					forAllPaths((from, to, pathArray) => {
						U.object(junctionsToTiles, from)[pathArray[1]] = true;
						for (var i = 1; i < pathArray.length - 1; ++i) {
							U.object(junctionsToTiles, pathArray[i])[pathArray[i-1]] = true;
							U.object(junctionsToTiles, pathArray[i])[pathArray[i+1]] = true;
						}
						U.object(junctionsToTiles, pathArray[i])[to] = true;
					}, { skipInactiveTiles: true });

					/* to query the number of connections of a junction */
					function degree(id) { return Object.keys(junctionsToTiles[id]).length }

					/* now (re)build the graph */
					forAllPaths((from, to, pathArray) => {

						/* add or remove 'from' tile */
						if (degree(from) >= 1) {
							// TODO: signal new vertex
							graph.ensureVertex(from, { location: 'tile' });
						}

						var junction1 = from, junction2;

						/* add or remove inter-tile vertices and edges */
						for (var i = 1; i < pathArray.length - 1; ++i) {
							junction2 = pathArray[i];
							if (degree(junction2) >= 3) { // a split/branch; show
								// TODO: signal new vertex
								graph.ensureVertex(junction2, { location: 'inter-tile', cause: {} });
								// TODO: signal new edge
								graph.addEdge(junction1, junction2, {});
								junction1 = junction2;
							}
						}

						/* add or remove 'to' tile */
						if (degree(to) >= 1) {
							// TODO: signal new vertex
							graph.ensureVertex(to, { location: 'tile' });
							// TODO: signal new edge
							graph.addEdge(junction1, to, {});
						}

					});

				});
			});

			//this.trigger('-p-connectivity-new-paths-fetched', this._p_connectivity_graphs);
		});
	}, 50));





	////////////////////////////////////////////////////////////////////////////////////////////////
	//
	//
	//plugin.append('Circuitboard.prototype.construct', function () {
	//
	//
	//	///* create the circuitboard-wide graph-group */
	//	//this._p_connectivity_d3group = new D3Group({
	//	//	parent: this,
	//	//	chargeFactor: 0.1,
	//	//	linkDistanceFactor: 0.04
	//	//});
	//	//((setGraphGroupRegion) => {
	//	//	setGraphGroupRegion();
	//	//	this.on('size', setGraphGroupRegion);
	//	//	this.on('position', setGraphGroupRegion);
	//	//})(() => {
	//	//	var AREA_MARGIN = 5;
	//	//	this._p_connectivity_d3group.setRegion({
	//	//		top: this.position.top + AREA_MARGIN,
	//	//		left: this.position.left + AREA_MARGIN,
	//	//		height: this.size.height - 2 * AREA_MARGIN,
	//	//		width: this.size.width - 2 * AREA_MARGIN
	//	//	});
	//	//});
	//
	//
	//	///* storage of edges and vertices */
	//	//this._p_connectivity_registeredEdges = {};    // type -> id -> otherId -> edge
	//	//this._p_connectivity_registeredVertices = {}; // type -> id -> vertex
	//
	//
	//	/* to add inner junctions and edges */
	//	var createInnerGraph = U.debounce(() => {
	//		Object.keys(this._p_connectivity_graphs).forEach((type) => {
	//			var graph = this._p_connectivity_graphs[type];
	//
	//			/* add the d3 inter-tile junctions */
	//			graph.eachVertex((id, info) => {
	//
	//				/* only handle inter-tile junctions */
	//				if (info.location !== 'inter-tile') { return }
	//
	//				/* do nothing if the d3 junction is already there */
	//				if (this._p_connectivity_registeredVertices[type][id]) { return }
	//
	//				/* create the d3 junction */
	//				var vertex = new D3Vertex({
	//					parent: this,
	//					radius: 3,
	//					cssClass: `${type} inter-tile`
	//				});
	//				this._p_connectivity_d3group.addVertex(vertex);
	//				this.circuitboard._p_connectivity_registerVertex(model.id, type, vertex);
	//
	//				this.oneValue('visible', false, () => {
	//					this.circuitboard._p_connectivity_deregisterVertex(model.id, type, vertex);
	//					this._p_connectivity_d3group.removeVertex(vertex);
	//				});
	//
	//			});
	//
	//
	//
	//			/* add the d3 edges */
	//			graph.eachEdge((from, to) => {
	//
	//				/* do nothing if the d3 edge is already there */
	//				if (this._p_connectivity_registeredEdges[type][from][to]) { return }
	//
	//
	//				/* create the edge */
	//				var edge = new D3Edge({
	//					parent: this,
	//					source: this._p_connectivity_registeredVertices[type][from],
	//					target: this._p_connectivity_registeredVertices[type][to],
	//					cssClass: type // TODO: arterial / venous
	//				});
	//
	//				U.object(this._p_connectivity_registeredEdges[type], from)[to] = edge;
	//				U.object(this._p_connectivity_registeredEdges[type], to)[from] = edge;
	//				this._p_connectivity_d3group.addEdge(edge);
	//
	//
	//			});
	//
	//
	//		});
	//	}, 50);
	//
	//
	//	/* for tiles to register new vertices */
	//	this._p_connectivity_registerVertex = function (id, type, vertex) {
	//
	//		/* register the tile-vertex itself */
	//		U.object(this._p_connectivity_registeredVertices, type)[id] = vertex;
	//
	//
	//		/* then create the inter-tile edges and junctions */
	//		createInnerGraph();
	//
	//
	//
	//		//Object.keys(PathModel.paths[type][id]).forEach((otherId) => {
	//		//	if (this._p_connectivity_registeredVertices[type][otherId]) {
	//		//		var edge = new D3Edge({
	//		//			parent: this,
	//		//			source: this._p_connectivity_registeredVertices[type][id],
	//		//			target: this._p_connectivity_registeredVertices[type][otherId],
	//		//			cssClass: type // TODO: arterial / venous
	//		//		});
	//		//
	//		//		if (!this._p_connectivity_registeredEdges[type][id]) { this._p_connectivity_registeredEdges[type][id] = {} }
	//		//		if (!this._p_connectivity_registeredEdges[type][otherId]) { this._p_connectivity_registeredEdges[type][otherId] = {} }
	//		//		this._p_connectivity_registeredEdges[type][id][otherId] = edge;
	//		//		this._p_connectivity_registeredEdges[type][otherId][id] = edge;
	//		//		graphGroup.addEdge(edge);
	//		//	}
	//		//});
	//	};
	//
	//
	//	/* for tiles to deregister vertices */
	//	this._p_connectivity_deregisterVertex = function (id, type, vertex) {
	//		delete this._p_connectivity_registeredVertices[type][id];
	//
	//		this._p_connectivity_graphs[type].destroyVertex(id);
	//
	//		//Object.keys(PathModel.paths[type][id]).forEach((otherId) => { // TODO: remove proper path-parts
	//		//	if (this._p_connectivity_registeredVertices[type][otherId]) {
	//		//		graphGroup.removeEdge(this._p_connectivity_registeredEdges[type][id][otherId]);
	//		//		delete this._p_connectivity_registeredEdges[type][id][otherId];
	//		//		delete this._p_connectivity_registeredEdges[type][otherId][id];
	//		//	}
	//		//});
	//		createInnerGraph();
	//	};
	//
	//
	//});
	//
	//
	//plugin.append('Tile.prototype.construct', function () {
	//	if (!this.model) { return }
	//
	//	this.circuitboard.on('-p-connectivity-new-paths-fetched', (graphs) => {
	//
	//
	//		/* find the types of connections this tile has */
	//		if (!this._p_connectivity_handledTypes) { this._p_connectivity_handledTypes = {} }
	//		var types = Object.keys(graphs)
	//				.filter((t) => graphs[t].hasVertex(this.model.id))
	//				.filter((t) => !this._p_connectivity_handledTypes[t]);
	//		if (types.length === 0) { return }
	//		types.forEach((type) => { this._p_connectivity_handledTypes[type] = true });
	//
	//
	//		///* create the tile-specific graph group */
	//		//if (!this._p_connectivity_d3group) {
	//		//	this._p_connectivity_d3group = new D3Group({
	//		//		parent: this
	//		//	});
	//		//	((setGraphGroupRegion) => {
	//		//		setGraphGroupRegion();
	//		//		this.on('headerSize', setGraphGroupRegion);
	//		//		this.on('headerPosition', setGraphGroupRegion);
	//		//	})(() => {
	//		//		var AREA_MARGIN = 5;
	//		//		this._p_connectivity_d3group.setRegion({
	//		//			top: this.headerPosition.top + AREA_MARGIN,
	//		//			left: this.headerPosition.left + AREA_MARGIN,
	//		//			height: this.headerSize.height - 2 * AREA_MARGIN,
	//		//			width: this.headerSize.width - 2 * AREA_MARGIN
	//		//		});
	//		//	});
	//		//}
	//
	//
	//		///* when tile becomes visible, add the vertex and notify the circuitboard */
	//		//types.forEach((type) => {
	//		//	this.observeValue('visible', true, () => {
	//		//		var vertex = new D3Vertex({
	//		//			parent: this,
	//		//			cssClass: type
	//		//		});
	//		//		this._p_connectivity_d3group.addVertex(vertex);
	//		//		this.circuitboard._p_connectivity_registerVertex(this.model.id, type, vertex);
	//		//
	//		//		this.oneValue('visible', false, () => {
	//		//			this.circuitboard._p_connectivity_deregisterVertex(this.model.id, type, vertex);
	//		//			this._p_connectivity_d3group.removeVertex(vertex);
	//		//		});
	//		//	});
	//		//});
	//
	//
	//	});
	//});


});
