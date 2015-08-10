define(['jquery', 'bluebird'], ($, P) => {
	'use strict';

	/* to retrieve the path models relating to the given ids from the server */
	return ({port}) => function fetchPathsFor(ids) {

		/* removing 'root' */
		let s = new Set(ids); s.delete('root');
		ids = [...s];


		/* if the list of ids is empty, return an empty object */
		if (ids.length === 0) { return P.resolve({}) }


		/* make actual query to server */
		return P.resolve($.ajax({
			url: `http://open-physiology.org:${port}/nifs/?lyphs=${ids.join(',')}`,
			dataType: 'jsonp'
		})).then((arr) => {

			console.log(ids, arr);



			/* check for errors */
			if (arr.Error) { throw arr.Error }

			/* transform the data to correspond to expected format */
			for (let path of arr) {
				let newNiflings = [];
				for (let i = path.niflings.length - 1; i >= 0; --i) {
					if (path.niflings[i].fma1_lyph && path.niflings[i].fma2_lyph) {
						path.niflings[i].path = [
							path.niflings[i].fma1_lyph,
							path.niflings[i].fma2_lyph
						];
						newNiflings.push(path.niflings[i]);
					}
				}
				path.niflings = newNiflings;
				path.path = [
					path.fma1_lyph,
					path.fma2_lyph
				];
			}

			return { nif: arr };
		}).catch((err) => {
			console.error('Something went wrong while fetching NIF connections from the server:', err);
			throw err;
		});

	};

});
