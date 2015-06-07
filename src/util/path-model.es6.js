define(['jquery', 'bluebird'], ($, P) => {
	'use strict';

	/* to retrieve the path models relating to the given ids from the server and fill the path cache */
	function fetchPathsFor(ids) {
		let s = new Set(ids); s.delete('root'); ids = [...s]; // removing 'root'; TODO: nicer way


		//return P.resolve([]); // TODO: use actual query when server is set up

		return P.resolve($.ajax({
			url: `http://open-physiology.org:5056/connections/?lyphs=${ids.join(',')}`, // 5055, 5056
			dataType: 'jsonp'
		}));



	}

	return fetchPathsFor;

});
