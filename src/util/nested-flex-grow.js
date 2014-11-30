define(['jquery'], function ($) {
	'use strict';

	//
	// This function plays with the `flex-grow` and `display` properties
	// of a jQuery element in such a way that CSS3 transition animations
	// are properly carried out, and such that elements that get an effective
	// `flex-grow` of 0 are actually hidden from view.
	//
	function setDisplay(element, newGrow) {

		var oldGrow = element.data('amyFlexGrowTarget');
		element.data('amyFlexGrowTarget', newGrow);

		if (oldGrow > 0 && newGrow === 0) {

			element.data('amyFlexGrowPrevDisplay', element.css('display'));
			element.css('flexGrow', 1e-5);
			setTimeout(() => {
				element.one('transitionend', () => {
					if (element.data('amyFlexGrowTarget') === 0) {
						element.css('display', 'none');
					}
				});
			}, 0);

		} else if (oldGrow === 0 && newGrow > 0) {

			element.css('display', element.data('amyFlexGrowPrevDisplay'));
			element.data('amyFlexGrowCssScheduled', true);
			setTimeout(() => {
				element.removeData('amyFlexGrowCssScheduled');
				element.css('flexGrow', element.data('amyFlexGrowTarget'));
			}, 0);

		} else if (!element.data('amyFlexGrowCssScheduled')) {

				element.css('flexGrow', newGrow);

		}
	}

	$.fn.extend({
		//
		// sets the css property 'flex-grow' on the current element and
		// correspondingly increases/decreases that of its direct parent
		//
		amyNestedFlexGrow(grow) {
			setDisplay(this, grow);
			var growSum = 0;
			this.parent().children().each(function () {
				growSum += parseFloat($(this).data('amyFlexGrowTarget'));
			});
			setDisplay(this.parent(), growSum);
			return this;
		}
	});
});
