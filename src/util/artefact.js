define([
	'jquery',
	'bluebird',
	'./misc.js',
	'./bacon-signal-handler.js',
	//'./signal-handler.js',
	'./unique-id.js',
	'./main-delta-model.js'
], function ($, P, U, BaconSignalHandler, uniqueID, dm) {
	'use strict';


	var Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, function Artefact(superFn, options) {
		superFn();

		var {id, type, parent} = this._options = options;

		/* set hierarchy stuff */
		this._id = id || uniqueID(type);
		this._type = type;
		this._parent = parent;
		this._children = [];
		if (parent) { U.array(parent, '_children').push(this) }

		/* create events */
		this.newEvent('destroy');

	}, {

		get options() { return this._options },

		get id() { return this._id },

		get type() { return this._type },

		get parent() { return this._parent },

		get children() { return this._children },

		closestAncestorByType(type) {
			var result = this;
			do { result = result.parent } while (result && result.type && result.type !== type);
			return result;
		},

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

		destroy() {
			this.trigger('destroy');
			this.children.forEach((child) => { child.destroy() });
		}

	}));


	//U.extend(Artefact.prototype, SignalHandler);


	Artefact.newSubclass = function newSubClass(name, constructor, prototype = {}, optionDefaults = {}) {
		return dm.vp(name, U.newSubclass(Artefact, function (superFn, options = {}) {

			/* process options */
			var processedOptions = options;
			Object.keys(optionDefaults).forEach((key) => {
				if (U.isUndefined(processedOptions[key])) {
					processedOptions[key] = optionDefaults[key];
				}
			});
			processedOptions.type = name;

			/* call super-constructor */
			superFn(U.extend(options, processedOptions));

			/* call this constructor */
			constructor.call(this, processedOptions);

		}, U.extend({}, prototype, {
			get circuitboard() {
				if (!this._circuitboard) { this._circuitboard = this.closestAncestorByType('Circuitboard') }
				return this._circuitboard;
			}
		})));
	};


	return Artefact;


});
