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
						if (newWeight === this._p_tileWeight_weight) { return }
						this._p_tileWeight_weight = newWeight;
						this.element.amyNestedFlexGrow(newWeight);
						this.trigger('weight', newWeight);
					}
				});
			}
		}
	});
});
