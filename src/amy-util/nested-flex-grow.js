define(['jquery'], function ($) {
	'use strict';

	$.fn.extend({
		//
		// sets the css property 'flex-grow' on the current element and
		// correspondingly increases/decreases that of its direct parent
		//
		amyNestedFlexGrow(grow) {
			this.css('flexGrow', grow);
			this.data('amyFlexGrowTarget', grow);
			var growSum = 0;
			this.parent().children().each(function () {
				growSum += parseFloat($(this).data('amyFlexGrowTarget'));
			});
			this.parent().css('flexGrow', growSum);
			return this;
		}
	});
});
