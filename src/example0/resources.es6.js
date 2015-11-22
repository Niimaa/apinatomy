import $ from 'jquery';
import P from 'bluebird';

let modelLists = {};
let models     = {};

function _fetchResources(type, {host, port}) {
	if (!models[type] && !modelLists[type]) {
		return P.resolve($.ajax({
			url: `http://${host}:${port}/${type}`,
			dataType: 'jsonp'
		})).then((responseModels) => {
			modelLists[type] = responseModels;
			models[type] = {};
			for (let model of responseModels) {
				models[type][model.id] = model;
			}
		});
	} else {
		return P.resolve();
	}
}

export function preloadAllResources(options) {
	return P.all([
		_fetchResources('lyphTemplates',   options),
		_fetchResources('publications',    options),
		_fetchResources('clinicalIndices', options),
		_fetchResources('locatedMeasures', options),
		_fetchResources('correlations',    options)
	]);
}

export function getAllResources_sync(type) {
	return modelLists[type];
}

export function getResource_sync(type, ids) {
	if (Array.isArray(ids)) {
		return ids.map(id => models[type][id]);
	} else {
		return models[type][ids];
	}
}

