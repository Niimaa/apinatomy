define(['jquery', './amy-util/handle-premature-plugins.js'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-weight',
		after: ['tile-core'],

		'modify tile': {
			'insert constructor': function () {
				//
				// the 'weight' property
				//
				var _weight = 1;
				Object.defineProperty(this, 'weight', {
					get() { return _weight },
					set(newWeight) {
						// TODO: allow Infinity
						_weight = newWeight;
						this.element.amyNestedFlexGrow(newWeight);
					}
				});
			}
		}
	});
});
