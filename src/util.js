define(['jquery', 'jquery-ui'], function ($) {

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.extend($.fn, {
		  nestedFlexGrow(grow) {
			  this.css('flexGrow', grow);
			  var growSum = 0;
			  this.parent().children().each(() => {
				  //noinspection JSPotentiallyInvalidUsageOfThis
				  growSum += parseInt($(this).css('flexGrow'));
			  });
			  this.parent().css('flexGrow', growSum);
			  return this;
		  }
	});

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.extend({
		CSS: (()=>{
			var stylesheet = $('<style>').appendTo('head')[0].sheet;
			var cssRuleIndex = 0;

			function formulateRule(selector, key, value, important) {
				return (selector + '{' + key + ': ' + value + (important ? ' !important' : '') + '}');
			}

			return function CSS(selector) {
				var selectorObj = {
					addRule(key, value, important) {
						stylesheet.insertRule(
							  formulateRule(selector, key, value, important),
							  cssRuleIndex++
						);
						return selectorObj;
					},
					addAndKeepRule(key, value, important) {
						stylesheet.insertRule(
							  formulateRule(selector, key, value, important),
							  cssRuleIndex
						);
						var savedCSSRuleIndex = cssRuleIndex;
						return {
							setValue(newValue, newImportant) {
								stylesheet.deleteRule(savedCSSRuleIndex);
								stylesheet.insertRule(
									  formulateRule(selector, key, newValue, newImportant),
									  savedCSSRuleIndex
								);
							}
						};
					}
				};
				return selectorObj;
			};
		})()
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
				var paddedFn = ()=>{
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
