define(['jquery', 'bluebird'], function ($, P) {
	'use strict';

	$.extend({
		//
		// define a new kind of apinatomy jquery-widget
		//
		amyWidget(name, componentName, optionDefaults) {

			$.fn[name] = function (options) {
				//
				// if the word 'instance' is passed, return the object
				//
				if (options === 'instance') {
					return $(this).data('-amy-circuitboard');
				}

				//
				// create object representing the tile
				//
				var obj = {
					options: $.extend({}, optionDefaults, options),
					element: $(this),
					destroy() { obj.trigger('destroy') }
				};
				$(this).data('-amy-circuitboard', obj);

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
				$.extend(obj, {
					on(signal, fn) { _callback(signal).add(fn) },
					off(signal, fn) { _callback(signal).remove(fn) },
					one(signal, fn) {
						var paddedFn = () => {
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
				Object.defineProperty(obj, 'model', {
					get() { return this.options.model }
				});
				Object.defineProperty(obj, 'circuitboard', {
					get() { return this.options._circuitboard }
				});

				//// set the element class
				obj.element.addClass(obj.options.cssClass);
				obj.element.one('remove', () => { obj.destroy() });

				//
				// apply the plugins, then call the main constructor
				//
				// TODO: fix bug where plugins are not loaded yet at this point
				P.all($.circuitboard.plugin._apply(componentName, obj)).then(() => {
					if ($.isFunction(obj.constructor)) { obj.constructor() }
				});

				//
				// allow jQuery style chaining
				//
				return $(this);

			};

//			$.widget(`apinatomy.${name}`, {
//				options: optionDefaults,
//				_create() {
//
//				},
//				_destroy() { this.trigger("destroy") }
//			});
		}
	});

});
