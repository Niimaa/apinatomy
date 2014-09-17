define(['jquery'], function ($) {
	'use strict';

	$.fn.extend({

		//
		// takes an object mapping 'selector' → 'property' → 'value' and
		// applies it as a set of CSS rules to the descendants of the current element
		//
		putCssRules: function (rules) {
			$.each(rules, (selector, css) => {
				var context;
				if (selector.trim() === '&') {
					context = this;
				} else if (selector.trim().charAt(0) === '&') {
					context = this.find(selector.trim().substr(1).trim());
				} else {
					context = this.find(selector);
				}
				context.css(css);
			});
		},

		//
		// sets the css property 'flex-grow' on the current element and
		// correspondingly increases/decreases that of its direct parent
		//
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
