define(['jquery', 'jquery-ui'], function ($) {

	function signalHandlerMixin() {
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
			trigger(signal, ...args) {
				var callbacks = _callbacks[signal];
				if (callbacks) { callbacks.fireWith(this, args) }
			}
		});
		//noinspection JSUnusedGlobalSymbols
		this.once = this.one;
	}

	$.extend({
		amyWidget(name, componentName, options, constructor) {

			/////////////////////////////
			//// defining the widget ////
			/////////////////////////////

			$.widget(`apinatomy.${name}`, {
				options: options,
				_create() {
					//// enable signal handling
					signalHandlerMixin.call(this);

					//// make the model available in the object itself
					Object.defineProperty(this, 'model', {
						get() { return this.options.model }
					});

					//// set the element class
					this.element.addClass(this.options.cssClass);
					this.one('destroy', function () {
						this.element.removeClass(this.options.cssClass);
					});

					//// call the main constructor and the plugins
					$.circuitboard._applyPlugins(componentName, this, constructor);
				},
				_destroy() { this.trigger("destroy") }
			});
		}
	});

});
