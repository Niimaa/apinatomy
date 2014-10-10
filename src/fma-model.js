define(['jquery', 'bluebird', './util/defer.js'], function ($, P, defer) {
	'use strict';

	var _deferredCache = {};
	function _getDeferred(id) {
		if (!_deferredCache[id]) { _deferredCache[id] = defer() }
		return _deferredCache[id];
	}

	var _modelPrototype = {
		getChildIds()  { return this.sub.map((sub) => sub.entity._id) },
		getModels(ids) { return getFmaModels(ids) },
		get id() { return this._id }
	};

	function removeNullChildren(model) {
		for (var i = model.sub.length - 1; i >= 0; --i) {
			if (model.sub[i].entity === null) {
				model.sub.splice(i);
			}
		}
	}

	function getFmaModels(ids) {
		//
		// filter out the ids that we have not requested from the server before
		//
		var newIds = [];
		ids.forEach((id) => {
			if (!_getDeferred(id).alreadyRequested) {
				_getDeferred(id).alreadyRequested = true;
				newIds.push(id);
			}
		});

		//
		// request and build the model objects belonging to those ids
		//
		P.resolve($.ajax({
			url: `http://www.apinatomy.org:8766/resources/entities/${newIds.join(',')}`,
			dataType: 'jsonp'
		})).then((response) => {
			response.forEach((modelObj) => {
				var newModel = Object.create(_modelPrototype);
				$.extend(newModel, modelObj);
				removeNullChildren(newModel);
				_getDeferred(newModel._id).resolve(newModel);
			});
		});

		//
		// return an array of promises to all requested ids
		//
		return ids.map((id) => _getDeferred(id).promise);
	}

	return getFmaModels;
});
