define(['jquery', 'bluebird', '../util/misc.es6.js', '../util/defer.es6.js', '../util/main-deltajs.es6.js'], ($, P, U, defer, dm) => {
	'use strict';


	/* the type of entity we can retrieve with this module */
	const TYPE = 'lyph';


	/* the class of FMA models, implementing the interface expected by ApiNATOMY */
	let LyphModel = dm.vp('LyphModel', class LyphModel {
		constructor(fields) { U.extend(this, fields)  }
		get type()     { return TYPE }
		getChildIds()  { return this.children.map(child => child.child.id) }
		getModels(ids) { return getLyphModels(ids, { port: this._serverPort }) }
	});


	/* storing and retrieving 'deferreds' to models */
	let _getDeferred = (() => {
		let _deferredCache = {};
		return (id) => {
			if (!_deferredCache[id]) { _deferredCache[id] = defer() }
			return _deferredCache[id];
		};
	})();


	/* to retrieve an array of promises to models, given an array of ids */
	function getLyphModels(ids, options = {}) {

		/* accept an array of ids or a single id */
		let returnArray;
		if (typeof ids === 'string') {
			returnArray = false;
			ids = [ids];
		} else {
			returnArray = true;
		}

		/* if nothing is requested, return nothing */
		if (ids.length === 0) { return returnArray ? [] : null }

		/* gather the ids that we have not requested from the server before */
		let newIds = [];
		ids.forEach((id) => {
			if (!_getDeferred(id).alreadyRequested) {
				_getDeferred(id).alreadyRequested = true;

				/* make some info available from the promise itself */
				_getDeferred(id).promise.id = id;
				_getDeferred(id).promise.type = TYPE;

				/* register to be requested from the server */
				newIds.push(id);
			}
		});

		if (options.root && newIds.length === 1 && newIds[0] === 'root') {
			_getDeferred('root').resolve(new LyphModel({
				id: 'root',
				children: [ { child: { id: options.root } } ],
				_serverPort: options.port
			}));
		} else {

			/* request and build the model objects belonging to any new ids */
			if (newIds.length > 0) {
				P.resolve($.ajax({
					url: `http://open-physiology.org:${options.port}/lyph/${newIds.join(',')}?array=yes`,
					dataType: 'jsonp'
				})).each((model) => {
					/* resolve the corresponding promise */
					model._serverPort = options.port;
					_getDeferred(model.id).resolve(new LyphModel(model));
				}).error((err) => {
					console.error("There seems to be something wrong with the server.", err);
				});
			}

		}


		/* return an array of promises to all requested ids */
		if (returnArray) {
			return ids.map(id => _getDeferred(id).promise);
		} else {
			return _getDeferred(ids[0]).promise;
		}

	}

	return getLyphModels;

});
