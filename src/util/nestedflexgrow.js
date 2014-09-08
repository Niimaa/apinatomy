define(['jquery'], function ($) {
	$.fn.extend({
		nestedFlexGrow(grow) {
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
