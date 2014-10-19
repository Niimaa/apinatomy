define(['jquery'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		id: 'tile-weight',
		requires: ['tile-core']
	}).modify('Tile.prototype');

	//
	// gives tiles a `weight` which reflects the screen area they take up
	// in relation to other tiles in the same tilemap
	//
	plugin.insert('construct', function () {
		this._p_tileWeight_weight = 1;

		// the 'weight' property
		Object.defineProperty(this, 'weight', {
			get() { return this._p_tileWeight_weight },
			set(newWeight) {
				if (newWeight === this._p_tileWeight_weight) { return }
				this._p_tileWeight_weight = newWeight;
				this.element.amyNestedFlexGrow(newWeight);
				this.trigger('weight', newWeight);
			}
		});
	});
});
