define(['jquery'], function ($) {
	$.extend({
		field(name) { return (obj) => { return obj[name] } },
		bindA(fn, ctx, args) { return fn.bind.apply(fn, [ctx].concat(args)) },
		bind(obj, m, ...args) { return $.bindA(obj[m], obj, args) }
	});
});
