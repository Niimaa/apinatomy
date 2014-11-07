define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-weight',
		requires: ['core']
	}).modify('Tile.prototype');


	/*  gives tiles a `weight` which reflects the screen area they take up  */
	/*  in relation to other tiles in the same tilemap                      */
	plugin.insert('construct', function () {

		/* the 'weight' observable */
		this.newObservable('weight', { initial: 1 });

		/* enact 'weight' on the DOM */
		this.observe('weight', (weight) => {
			this.element.amyNestedFlexGrow(weight);
		});

	});

});
