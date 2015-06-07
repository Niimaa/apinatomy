define(['jquery', 'bluebird', '../util/defer.es6.js', '../util/main-deltajs.es6.js'], ($, P, defer, dm) => {
	'use strict';


	/* the type of entity we can retrieve with this module */
	const TYPE = 'lyph';


	/* the class of FMA models, implementing the interface expected by ApiNATOMY */
	let LyphModel = dm.vp('LyphModel', class LyphModel {
		constructor(fields) { Object.assign(this, fields) }
		get type()     { return TYPE }
		getChildIds()  { return this.children.map(child => child.child.id) }
		getModels(ids) { return getLyphModels(ids) }
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
		if (ids.length === 0) { return [] }

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

		if (options.root && ids.length === 1 && ids[0] === 'root') {
			_getDeferred('root').resolve(new LyphModel({
				id: 'root',
				children: [ { child: { id: options.root } } ] // setting the root tile to have one child of id '0'; TODO: make it parametrized
			}));
		} else {


			/* request and build the model objects belonging to any new ids */
			if (newIds.length > 0) {
				P.resolve($.ajax({
					url: `http://open-physiology.org:5056/lyph/${newIds.join(',')}?array=yes`,
					dataType: 'jsonp'
				})).each((model) => {
					/* resolve the corresponding promise */
					_getDeferred(model.id).resolve(new LyphModel(model));
				}).error((err) => {
					console.error("There seems to be something wrong with the server.", err);
				});
			}


			//if (ids[0] === '0') {
			//	_getDeferred('0').resolve(new LyphModel({
			//		id:   '0',
			//		name: 'Lyph 0',
			//		children: [
			//			{ child: { id: '1' } },
			//			{ child: { id: '2' } },
			//			{ child: { id: '3' } },
			//			{ child: { id: '4' } }
			//		]
			//	}));
			//} else {
			//	_getDeferred('1').resolve(new LyphModel({
			//		id:   '1',
			//		name: 'Lyph 1',
			//		children: []
			//	}));
			//	_getDeferred('2').resolve(new LyphModel({
			//		id:   '2',
			//		name: 'Lyph 2',
			//		children: []
			//	}));
			//	_getDeferred('3').resolve(new LyphModel({
			//		id:   '3',
			//		name: 'Lyph 3',
			//		children: []
			//	}));
			//	_getDeferred('4').resolve(new LyphModel({
			//		id:   '4',
			//		name: 'Lyph 4',
			//		children: []
			//	}));
			//}

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
