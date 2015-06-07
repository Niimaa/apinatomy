define(['jquery'], function ($) {
	'use strict';

	$.fn.extend({
		addSvgClass: function (cls) {
			let classes = new Set(this.attr('class').split(/\s+/));
			classes.add(cls);
			this.attr('class', [...classes].join(' '));
		},
		removeSvgClass: function (cls) {
			let classes = new Set(this.attr('class').split(/\s+/));
			classes.delete(cls);
			this.attr('class', [...classes].join(' '));
		}
	});
});
