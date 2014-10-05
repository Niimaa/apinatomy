define([
], function () {
	'use strict';

	function id(x) { return x; }

	//
	// TODO: document and test this
	//
	return function watchMultiple(arr, cbOn, cbOff, pred) {
		pred = pred || id; // by default, check for truthiness
		var values = new Array(arr.length);
		var valueIsOn = values.map(pred);
		arr.forEach((regFn, i) => {
			regFn((val) => {
				var everythingOnBefore = valueIsOn.every(id);
				values[i] = val;
				valueIsOn[i] = pred(val);
				var everythingOnAfter = valueIsOn.every(id);
				if (everythingOnAfter) {
					cbOn(values);
				} else if (everythingOnBefore) {
					cbOff(values);
				}
			});
		});
	};
});
