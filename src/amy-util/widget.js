define(['jquery', 'jquery-ui'], function ($) {
	'use strict';

	$.extend({
		//
		// define a new kind of apinatomy jquery-widget
		//
		amyWidget(name, componentName, options) {
			$.widget(`apinatomy.${name}`, {
				options: options,
				_create() {
					//
					// enable signal handling
					//
					var _callbacks = {};
					function _callback(signal) {
						if (!_callbacks[signal]) {
							_callbacks[signal] = $.Callbacks();
						}
						return _callbacks[signal];
					}
					$.extend(this, {
						on(signal, fn) { _callback(signal).add(fn) },
						off(signal, fn) { _callback(signal).remove(fn) },
						one(signal, fn) {
							var paddedFn = ()=>{
								fn.apply(null, arguments);
								this.off(signal, paddedFn);
							};
							this.on(signal, paddedFn);
						},
						once(signal, fn) { this.one(signal, fn) },
						trigger(signal, ...args) {
							var callbacks = _callbacks[signal];
							if (callbacks) { callbacks.fireWith(this, args) }
						}
					});

					//
					// make the model and circuitboard references available in the object itself
					//
					Object.defineProperty(this, 'model', {
						get() { return this.options.model }
					});
					Object.defineProperty(this, 'circuitboard', {
						get() { return this.options._circuitboard }
					});

					//// set the element class
					this.element.addClass(this.options.cssClass);
					this.one('destroy', function () {
						this.element.removeClass(this.options.cssClass);
					});

					//// call the main constructor and the plugins
					$.circuitboard.plugin._apply(componentName, this);
					if ($.isFunction(this.constructor)) { this.constructor() }
				},
				_destroy() { this.trigger("destroy") }
			});
		}
	});

});
