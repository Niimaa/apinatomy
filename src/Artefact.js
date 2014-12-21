define([
	'jquery',
	'bluebird',
	'./util/misc.js',
	'./util/bacon-signal-handler.js',
	'./util/unique-id.js',
	'./util/main-delta-model.js',
	'./util/plugin.js'
], function ($, P, U, BaconSignalHandler, uniqueID, dm, plugin) {
	'use strict';


	return plugin.selected.then(() => {

		if (U.isDefined($.circuitboard.Artefact)) { return $.circuitboard.Artefact }

		/** {@export @class Artefact @extends BaconSignalHandler}
		 * Use this as a subclass (or just mix it in) to provide support for
		 * events and observable properties through Bacon.js.
		 *
		 * Users can pass a promise through the 'beforeConstruction' option. If done, the
		 * artefact waits on that promise before calling its 'construct' method.
		 * Similarly, users of instances of this class should test the 'constructed' property.
		 * If it is defined, it is a promise that has to be waited for.
		 * If not, the object instance can be used synchronously after construction.
		 */
		$.circuitboard.Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, (superFn) => function Artefact(options) {
			superFn.apply(this, arguments);

			this._options = options;
			var {id, type, parent, beforeConstruction} = options;

			/* set hierarchy stuff */
			this._id = id || uniqueID(type);
			this._type = type;
			this._parent = parent;
			this._children = [];
			if (parent) { U.array(parent, '_children').push(this) }

			/* create events */
			this.newEvent('destroy');

			/* possibly wait for something before construction (like plugins)? */
			this.beforeConstruction(beforeConstruction);

		}, /** @lends Artefact.prototype */ {

			/** {@public}{@method}
			 * Allow a promise to be inserted on which the rest of construction should wait.
			 *
			 * @param possiblePromise {*}  - a value that might be a promise
			 */
			beforeConstruction(possiblePromise) {

				/* if no promise is passed in, ignore, to keep construction synchronous */
				if (!possiblePromise || !$.isFunction(possiblePromise.then)) { return }

				/* if this is the first promise passed in, initialize 'this.constructed' */
				if (!this.constructed) { this.constructed = P.resolve(this) }

				/* insert the new promise into the chain for 'this.constructed' resolution */
				this.constructed = this.constructed.tap(() => P.resolve(possiblePromise));

			},

			/** {@public}{@property}
			 *
			 * @return {Object} - the options provided through the constructor
			 */
			get options() { return this._options },

			/** {@public}{@property}
			 *
			 * @return {String} - the unique identifier belonging to this artefact
			 */
			get id() { return this._id },

			/** {@public}{@property}
			 *
			 * @return {String} - the type of this artefact
			 */
			get type() { return this._type },

			/** {@public}{@property}
			 *
			 * @return {Artefact|undefined} - the parent of this artefact, unless this is the root
			 */
			get parent() { return this._parent },

			/** {@public}{@property}
			 *
			 * @return {[Artefact]} - the children of this artefact
			 */
			get children() { return this._children },

			/** {@public}{@method}
			 *
			 * Retrieve the closest ancestor (parent, parent's parent, ...)
			 * of this artefact with the given type.
			 *
			 * @return {Artefact|undefined} - the closest ancestor of the given type, unless there is none
			 */
			closestAncestorByType(type) {
				var result = this;
				do { result = result.parent } while (result && result.type && result.type !== type);
				return result;
			},

			/** {@public}{@method}
			 *
			 * Retrieve the closest descendant (children, children's children, ...)
			 * of this artefact with the given type.
			 *
			 * @return {[Artefact]} - the closest descendants of the given type; none of them
			 *                        are descendant from any other
			 */
			closestDescendantsByType(type) {
				var result = [];
				this.children.forEach((child) => {
					if (child.type === type) {
						result.push(child);
					} else {
						result = result.concat(child.closestDescendantsByType(type));
					}
				});
				return result;
			},

			/** {@public}{@method}
			 *
			 * Indicate that this artefact will never be used again, allowing it
			 * to do any necessary cleanup.
			 */
			destroy() {
				this.trigger('destroy');
				this.children.forEach((child) => { child.destroy() });
			}

		}));

		return $.circuitboard.Artefact;

	}).tap((Artefact) => {

		/** {@function Artefact.newSubclass}
		 * A static convenience function for creating a subclass of {@link Artefact}.
		 */
		Artefact.newSubclass = function newSubClass(name, constructor, prototype = {}, optionDefaults = {}) {
			return dm.vp(name, U.newSubclass(Artefact, (superFn) => function (options = {}) {

				/* process options */
				var processedOptions = options;
				Object.keys(optionDefaults).forEach((key) => {
					if (U.isUndefined(processedOptions[key])) {
						processedOptions[key] = optionDefaults[key];
					}
				});
				processedOptions.type = name;

				/* call super-constructor */
				superFn.call(this, U.extend(options, processedOptions));

				/* call this constructor */
				constructor.call(this, processedOptions);

				/* then run the 'construct' method */
				if (this.constructed) { // construct asynchronously
					this.constructed.then(() => {
						if ($.isFunction(this.construct)) {
							this.beforeConstruction(this.construct(options));
						}
					});
				} else if ($.isFunction(this.construct)) {
					this.beforeConstruction(this.construct(options));
				}

			}, U.extend({}, prototype, {
				get circuitboard() {
					if (!this._circuitboard) { this._circuitboard = this.closestAncestorByType('Circuitboard') }
					return this._circuitboard;
				}
			})));
		};

	});


});
