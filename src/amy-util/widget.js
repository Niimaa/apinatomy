define(['jquery', 'bluebird', './jquery-static.js'], function ($, P, U) {
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
	return function amyWidget(name, pluginHandle, optionDefaults) {

		//
		// a way to lazily apply the plugins to an empty prototype (ONCE),
		// apply some standard utility properties to it (ONCE),
		// and get the promise of the prototype object back
		//
		var _prototypeP = null;
		function prototypeP() {
			if (!_prototypeP) {
				var objPrototype = {};
				_prototypeP = P
					//
					// await the application of all selected plugins to the prototype
					//
					.all($.circuitboard.plugin._apply(pluginHandle, objPrototype))
					//
					// return the prototype from the promise
					//
					.return(objPrototype)
					//
					// define default properties in the prototype
					//
					.tap(defineDefaultProperties)
					//
					// define methods to manage artefact hierarchy
					//
					.tap(defineHierarchyMethods)
					//
					// register the type
					//
					.tap((obj) => { obj.type = name });
			}
			return _prototypeP;
		}

		//
		// now define the widget creation & retrieval function as a jQuery plugin
		//
		$.fn[name] = function (options) {
			//
			// if the word 'instance' is passed, return the (already created) widget
			//
			if (options === 'instance') { return this.data(`-amy-${name}`) }

			//
			// else, create a new widget based on the prototype
			// and return a promise to it
			//
			this.data(`-amy-${name}`, prototypeP().then((prototype) => {
				//
				// create object representing the tile
				//
				var obj = Object.create(prototype);
				$.extend(obj, {
					options: $.extend({}, optionDefaults, options),
					element: this,
					destroy() { obj.trigger('destroy') }
				});

				//
				// add signal-handling methods to the object
				//
				enableSignalHandling(obj);

				//
				// set the element class
				//
				obj.element.addClass(obj.options.cssClass);
				obj.element.one('remove', () => { obj.destroy() });

				//
				// connect to the parent artefact
				//
				if (obj.options.parent) {
					obj.parent = obj.options.parent;
				}

				//
				// cache a reference to the circuitboard (it is used often)
				//
				obj.circuitboard = obj.closestAncestorByType('circuitboard');

				//
				// if present, run the constructor method
				//
				if ($.isFunction(obj.constructor)) { obj.constructor.call(obj); }

				//
				// return the widget object from the promise
				//
				return obj;
			}));

			return this;
		};
	};

});
