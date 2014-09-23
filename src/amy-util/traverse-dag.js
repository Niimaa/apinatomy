define(['bluebird'], function (P) {
	'use strict';

	function defer() {
		var resolve, reject;
		var promise = new P(function() {
			resolve = arguments[0];
			reject = arguments[1];
		});
		//noinspection JSUnusedAssignment
		return {
			resolve: resolve,
			reject: reject,
			promise: promise
		};
	}

	return function traverseDAG(graph, fn) {
		//
		// keeping track of the deferreds of all nodes
		//
		var nodeDeferreds = {};
		function nodeDeferred(id) {
			if (!nodeDeferreds[id]) { nodeDeferreds[id] = defer() }
			return nodeDeferreds[id];
		}

		//
		// keeping track of the sources and sinks
		//
		var sinkPromises = [];

		//
		// connect all the promises
		//
		graph.eachVertex((key, val) => {
			var preds = graph.predecessors(key);
			var succs = graph.successors(key);

			//
			// test for sink-hood
			//
			if (succs.length === 0) { sinkPromises.push(nodeDeferred(key).promise) }

			//
			// set up promise to resolve when predecessors are done
			//
			P.all(preds.map((pred) => { return nodeDeferred(pred).promise })).then((predResults) => {
				nodeDeferred(key).resolve(fn(key, val, predResults));
			});
		});

		//
		// return promises of the sink node results
		//
		return sinkPromises;
	};

});
