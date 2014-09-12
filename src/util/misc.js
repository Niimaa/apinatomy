define(['jquery'], function ($) {
	$.extend({
		field(name) { return (obj) => { return obj[name] } }
	});
});
