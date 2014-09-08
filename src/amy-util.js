define(['jquery', 'jquery-ui'], function ($) {

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.extend($.fn, {
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

	////////////////////////////////////////////////////////////////////////////////////////////////

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
				var paddedFn = ()=> {
					fn.apply(null, arguments);
					this.off(signal, paddedFn);
				};
				this.on(signal, paddedFn);
			},
			trigger(signal, ...args) {
				var callbacks = _callbacks[signal];
				if (callbacks) { callbacks.fire.apply(callbacks, args) }
			}
		});
		this.once = this.one;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.extend({
		amyWidget(name, options, createFn) {
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

					//// call the specific constructor
					createFn.call(this);
				},
				_destroy() { this.trigger("destroy") }
			});
		}
	});

	////////////////////////////////////////////////////////////////////////////////////////////////

});
