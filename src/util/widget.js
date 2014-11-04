define(['jquery', 'bluebird', './misc.js'], function ($, P, U) {
	'use strict';

	/* a function to add signal handling methods to an object */
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

	/* a function to implement artefact hierarchy methods */
	function defineHierarchyMethods(obj, type) {

		Object.defineProperty(obj, 'type', {
			get() { return type }
		});
		Object.defineProperty(obj, 'parent', {
			set(parent) {
				this._parent = parent;
				U.array(parent, '_children').push(this);
			},
			get() { return this._parent }
		});
		Object.defineProperty(obj, 'children', {
			get() { return this._children || [] }
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

	/*  a function to make some important references that are part  */
	/*  of the options property available in the object itself      */
	function defineDefaultProperties(obj) {

		Object.defineProperty(obj, 'model', {
			get() { return this.options.model }
		});

	}

	/*  a function to create an apinatomy component (widget)          */
	/*  as a jQuery element plugin; this is returned from the module  */
	function amyWidget(typeName, optionDefaults) {

		/* the specific widget class */
		function Widget({options, element}) {

			$.extend(this, {
				options: $.extend({}, optionDefaults, options),
				element: element,
				destroy() { this.trigger('destroy') }
			});
			enableSignalHandling(this);

			/* set the element class */
			this.element.addClass(this.options.cssClass);
			this.element.one('remove', () => { this.destroy() });

			/* connect to the parent artefact */
			if (this.options.parent) { this.parent = this.options.parent }

			/* cache a reference to the circuitboard (it is used often) */
			Object.defineProperty(this, 'circuitboard', {
				get() { return this.closestAncestorByType('Circuitboard') }
			});

			/* wait for something before construction (like plugins)? */
			this.constructed = P.resolve();
			this.beforeConstruction(this.options.beforeConstruction);

			/*  if present, run the construct method after    */
			/* `this.options.beforeConstruction` is finished  */
			/*  and then wait on it                           */
			this.constructed.then(() => {
				if ($.isFunction(this.construct)) {
					this.beforeConstruction(this.construct());
				}
			});

		}

		Widget.prototype.beforeConstruction = function beforeConstruction(possiblePromise) {
			this.constructed = this.constructed
					.return(P.resolve(possiblePromise))
					.return(this);
		};

		defineDefaultProperties(Widget.prototype);
		defineHierarchyMethods(Widget.prototype, typeName);

		/* now define the widget creation & retrieval function as a jQuery plugin */
		var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
		$.fn[lowercaseName] = function (options) {
			/* if the word 'instance' is passed, return the (already created) widget promise */
			if (options === 'instance') { return this.data(`-amy-${lowercaseName}`) }

			/* else, create a new widget and set a promise to it */
			var newWidget = new Widget({ options: options, element: this });
			this.data(`-amy-${lowercaseName}`, newWidget.constructed);

			/* return the jQuery element instance, by jQuery convention */
			return this;
		};

		/* return the widget artefact class */
		return Widget;

	}

	return amyWidget;

});
