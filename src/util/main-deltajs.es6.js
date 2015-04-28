define(['bluebird', 'delta-js', './defer.es6.js'], function (P, DeltaJs, defer) {
	'use strict';


	/* already cached? */
	if (window.__apinatomy_core_deltajs) { return window.__apinatomy_core_deltajs }


	/* set the cache */
	var deltaJs = window.__apinatomy_core_deltajs = new DeltaJs();
	var deferred = defer();
	deltaJs.selected = deferred.promise;
	var oldSelect = deltaJs.select;
	deltaJs.select = function (...args) {
		oldSelect.apply(this, args);
		deferred.resolve(args);
	};


	/* return the delta model that manages all plugins (= deltas) */
	return window.__apinatomy_core_deltajs;


});
