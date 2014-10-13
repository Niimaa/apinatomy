define(['jquery', 'bluebird', './misc.js'], function ($, P, U) {
	'use strict';

	//
	// a function to add signal handling methods to an object
	//
	function enableSignalHandling(obj) {
		var _callbacks = {};

		function _signalCallbacks(signal) {
			if (!_callbacks[signal]) {
				_callbacks[signal] = $.Callbacks();
			}
			return _callbacks[signal];
		}

		$.extend(obj, {
			on(signal, fn) { _signalCallbacks(signal).add(fn) },
			off(signal, fn) { _signalCallbacks(signal).remove(fn) },
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
	}

	//
	// a function to implement artefact hierarchy methods
	//
	function defineHierarchyMethods(obj) {
		Object.defineProperty(obj, 'type', {
			set(type) { this._artefactType = type },
			get() { return this._artefactType }
		});
		Object.defineProperty(obj, 'parent', {
			set(parent) {
				this._parent = parent;
				U.array(parent, '_children').push(this);
			},
			get() { return this._parent }
		});
		Object.defineProperty(obj, 'children', {
			get() { return this._children }
		});
		$.extend(obj, {
			closestAncestorByType(type) {
				var result = this;
				do { result = result.parent } while (result && result.type && result.type !== type);
				return result;
			},
			closestDescendantsByType(type) {
				var result = [];
				(this.children || []).forEach((child) => {
					if (child.type === type) {
						result.push(child);
					} else {
						result = result.concat(child.closestDescendantsByType(type));
					}
				});
				return result;
			}
		});
	}

	//
	// a function to make some important references that are part
	// of the options property available in the object itself
	//
	function defineDefaultProperties(obj) {
		Object.defineProperty(obj, 'model', {
			get() { return this.options.model }
		});
	}

	//
	// a function to create an apinatomy component (widget)
	// as a jQuery element plugin; this is returned from the module
	//
	function amyWidget(name, optionDefaults) {
		//
		// the specific widget class
		//
		function Widget({options, element}) {
			$.extend(this, {
				options: options,
				element: element,
				destroy() { this.trigger('destroy') }
			});
			enableSignalHandling(this);

			//// set the element class
			this.element.addClass(this.options.cssClass);
			this.element.one('remove', () => { this.destroy() });

			//// connect to the parent artefact
			if (this.options.parent) { this.parent = this.options.parent }

			//// cache a reference to the circuitboard (it is used often)
			this.circuitboard = this.closestAncestorByType('circuitboard');

			//// if present, run the construct method
			if ($.isFunction(this.construct)) { this.construct.call(this); }
		}
		defineDefaultProperties(Widget.prototype);
		defineHierarchyMethods(Widget.prototype);
		Widget.prototype.type = name;

		//
		// now define the widget creation & retrieval function as a jQuery plugin
		//
		$.fn[name] = function (options) {
			//// if the word 'instance' is passed, return the (already created) widget
			if (options === 'instance') { return this.data(`-amy-${name}`) }

			//// else, create a new widget based on the prototype
			//// and return a promise to it
			this.data(`-amy-${name}`, promisesToWaitFor
					.return(new Widget({
						options: $.extend({}, optionDefaults, options),
						element: this
					})));

			//// return the jQuery element instance, by jQuery convention
			return this;
		};

		//// return the widget artefact class
		return Widget;
	}

	var promisesToWaitFor = P.resolve();
	amyWidget.waitFor = function waitFor(p) {
		promisesToWaitFor = promisesToWaitFor.return(p);
	};

	return amyWidget;

});
