define(['jquery', 'bluebird'], ($, P) => {
	'use strict';


	/* storing and retrieving path models */
	var paths = {};
	function _setPath(type, from, to, path) {
		if (!paths[type]) { paths[type] = {} }
		if (!paths[type][from]) { paths[type][from] = {} }
		if (!paths[type][to]) { paths[type][to] = {} }
		if (!paths[type][from][to]) {
			paths[type][from][to] = paths[type][to][from] = path;
		}
	}


	/* to retrieve the path models relating to the given ids from the server and fill the path cache */
	function fetchPathsFor(ids) {

		/* if nothing is requested, return nothing */
		if (ids.length === 0) { return [] }

		// TODO: proper caching to save on network requests?

		/* request and build the model objects belonging to those ids */
		return P.resolve($.ajax({
			url: `http://95.85.58.17:8766/resources/paths/${ids.join(',')}`, // TODO: Oi... when will we be rid of this server?
			dataType: 'jsonp'
		})).each((path) => {

			/* disregard paths that start and end in the same tile */
			if (path.from === path.to) { return }

			/* record the path */
			_setPath(path.type, path.from, path.to, path);

		});

	}


	return { fetchPathsFor, paths };

});
