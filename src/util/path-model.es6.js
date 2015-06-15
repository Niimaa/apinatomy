define(['jquery', 'bluebird'], ($, P) => {
	'use strict';

	/* to retrieve the path models relating to the given ids from the server */
	return function fetchPathsFor(ids) {

		// TEMPORARY HACK FOR NOT SHOWING ANY EDGES:
		return P.resolve({});


		///* removing 'root' */
		//let s = new Set(ids); s.delete('root');
		//ids = [...s];
        //
		///* if the list of ids is empty, return an empty object */
		//if (ids.length === 0) { return P.resolve({}) }
        //
		///* make actual query to server */
		//return P.resolve($.ajax({
		//	url: `http://open-physiology.org:5056/connections/?lyphs=${ids.join(',')}`, // 5055, 5056
		//	dataType: 'jsonp'
		//})).then((obj) => {
		//	/* check for errors */
		//	if (obj.Error) { throw obj.Error }
		//	return obj;
		//});
	};

});
