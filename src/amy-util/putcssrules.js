define(['jquery'], function ($) {
	$.fn.extend({
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
		}
	});
});
