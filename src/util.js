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

	$.extend({
		CSS: (()=> {
			var stylesheet = $('<style>').appendTo('head')[0].sheet;
			var cssRuleIndex = 0;

			var PREFIXES = [ "", "-moz-", "-webkit-", "-o-", "-ms-" ];
			var prefixedPropCache = {};
			function prefixedProperty(prop) {
				if (!prefixedPropCache[prop]) {
					var vendorProp, div = document.createElement("div");
					for (var i = 0; i < PREFIXES.length; i++) {
						vendorProp = PREFIXES[i] + prop;
						if (vendorProp in div.style) {
							div = null;
							prefixedPropCache[prop] = vendorProp;
							break;
						}
					}
				}

				return prefixedPropCache[prop];
			}

			function formulateRule(selector, key, value, important) {
				return `${selector} { ${prefixedProperty(key)}: ${value} ${important?'!important':''} }`;
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
