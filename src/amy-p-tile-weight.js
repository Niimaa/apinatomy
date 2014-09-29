define(['jquery', './amy-util/handle-premature-plugins.js'], function ($) {
	'use strict';

	$.circuitboard.plugin({
		name: 'tile-weight',
		after: ['tile-core'],

		'modify tile': {

			'add _p_tileWeight_weight': 1,

			'insert constructor': function () {
				//
				// the 'weight' property
				//
				Object.defineProperty(this, 'weight', {
					get() { return this._p_tileWeight_weight },
					set(newWeight) {
						// TODO: allow Infinity
						this._p_tileWeight_weight = newWeight;
						this.element.amyNestedFlexGrow(newWeight);
					}
				});
			}
		}
	});
});
