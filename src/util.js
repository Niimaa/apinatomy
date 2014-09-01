define(['jquery', 'jquery-ui'], function ($) {
	'use strict';

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.fn.nestedFlexGrow = function (grow) {
		this.css('flexGrow', grow);
		var growSum = 0;
		this.parent().children().each(function () {
			//noinspection JSPotentiallyInvalidUsageOfThis
			growSum += parseInt($(this).css('flexGrow'));
		});
		this.parent().css('flexGrow', growSum);
		return this;
	};

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.CSS = (function () {
		var stylesheet = $('<style>').appendTo('head')[0].sheet;
		var cssRuleIndex = 0;

		function formulateRule(selector, key, value, important) {
			return (selector + '{' + key + ': ' + value + (important ? ' !important' : '') + '}');
		}

		return function CSS(selector) {
			var selectorObj = {
				addRule:        function addRule(key, value, important) {
					stylesheet.insertRule(
						formulateRule(selector, key, value, important),
						cssRuleIndex++
					);
					return selectorObj;
				},
				addAndKeepRule: function addAndKeepRule(key, value, important) {
					stylesheet.insertRule(
						formulateRule(selector, key, value, important),
						cssRuleIndex
					);
					var savedCSSRuleIndex = cssRuleIndex;
					return {
						setValue: function (newValue, newImportant) {
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
	}());

	////////////////////////////////////////////////////////////////////////////////////////////////

	function signalHandlerMixin(that) {
		var _callbacks = {};
		that._callback = function (signal) {
			if (!_callbacks[signal]) {
				_callbacks[signal] = $.Callbacks();
			}
			return _callbacks[signal];
		};
		that.on = function (signal, fn) {
			that._callback(signal).add(fn);
		};
		that.one = function (signal, fn) {
			function paddedFn() {
				fn.apply(null, arguments);
				that.off(signal, paddedFn);
			}

			that.on(signal, paddedFn);
		};
		that.once = function (signal, fn) {
			that.one(signal, fn);
		};
		that.off = function (signal, fn) {
			that._callback(signal).remove(fn);
		};
		that.trigger = function (signal) {
			var callbacks = _callbacks[signal];
			if (callbacks) {
				callbacks.fire.apply(callbacks, [].slice.call(arguments, 1));
			}
		};
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.amyWidget = function amyWidget(name, options, createFn) {
		$.widget('apinatomy.' + name, {
			options:  options,
			_create:  function _create() {
				var that = this;

				//// enable signal handling
				signalHandlerMixin.call(that, that);

				//// make the model available in the object itself
				Object.defineProperty(that, 'model', {
					get: function () { return that.options.model }
				});

				//// set the element class
				that.element.addClass(that.options.cssClass);
				that.one('destroy', function () {
					that.element.removeClass(that.options.cssClass);
				});

				//// call the specific constructor
				createFn.call(that, that);
			},
			_destroy: function _destroy() { this.trigger("destroy") }
		});
	};

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.returns = function returns(value) {
		return function () { return value; }
	};

	////////////////////////////////////////////////////////////////////////////////////////////////

});
