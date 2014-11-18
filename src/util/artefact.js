define(['jquery', 'bluebird', './misc.js', './signal-handler.js', './unique-id.js'], function ($, P, U, SignalHandler, uniqueID) {
	'use strict';


	var Artefact = U.newClass(function Artefact(options) {
		var {id, type, parent} = this._options = options;

		/* set hierarchy stuff */
		this._id = id || uniqueID(type);
		this._type = type;
		this._parent = parent;
		this._children = [];
		if (parent) { U.array(parent, '_children').push(this) }

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

	});


	U.extend(Artefact.prototype, SignalHandler);


	return Artefact;


});
