define(['jquery', 'bluebird', './util/defer.js'], function ($, P, defer) {
	'use strict';


	// This module implements an interface to the FMA database on the old prototype
	// server, implementing the interface expected by ApiNATOMY. It creates a linked
	// object structure that preserves the original DAG structure. It does so by
	// maintaining a cache that maps each id to its corresponding object.
	//
	// The implementation of this module assumes that the database returns models
	// with the following structure:
	//
	// ModelType = {
	//     _id: string
	//     sub: [{  entity: { _id: string }  }]
	// }


	/* the prototype for model objects, implementing the expected interface */
	var _modelPrototype = {
		getChildIds()  { return this.sub.map((sub) => sub.entity._id) },
		getModels(ids) { return getFmaModels(ids) },
		get id() { return this._id }
	};
	// models are supposed to have a 'name' property, but that field
	// is already present on the model objects retrieved from the database


	/* storing and retrieving 'deferreds' to models */
	var _getDeferred = (() => {
		var _deferredCache = {};
		return (id) => {
			if (!_deferredCache[id]) { _deferredCache[id] = defer() }
			return _deferredCache[id];
		};
	})();


	/* to retrieve an array of promises to models, given an array of ids */
	function getFmaModels(ids) {

		/* gather the ids that we have not requested from the server before */
		var newIds = [];
		ids.forEach((id) => {
			if (!_getDeferred(id).alreadyRequested) {
				_getDeferred(id).alreadyRequested = true;
				newIds.push(id);
			}
		});

		/* request and build the model objects belonging to those ids */
		P.resolve($.ajax({
			url: `http://www.apinatomy.org:8766/resources/entities/${newIds.join(',')}`,
			dataType: 'jsonp'
		})).each((modelObj) => {

			/*  remove references to children that are not actually   */
			/*  in the database (the FMA database is messy that way)  */
			for (var i = modelObj.sub.length - 1; i >= 0; i -= 1) {
				if (modelObj.sub[i].entity === null) {
					modelObj.sub.splice(i);
				}
			}

			/* create the new model object based on the prototype */
			var newModel = Object.create(_modelPrototype);

			/* assign the retrieved model values to the new model object */
			$.extend(newModel, modelObj);

			/* resolve the corresponding promise */
			_getDeferred(newModel._id).resolve(newModel);

		});

		/* return an array of promises to all requested ids */
		return ids.map((id) => _getDeferred(id).promise);

	}

	return getFmaModels;

});
