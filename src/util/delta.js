define(['jquery', 'js-graph', 'bluebird', './traverse-dag.js', './misc.js'], function ($, JsGraph, P, traverse, U) {
	'use strict';

	//
	// Accumulated data for the available delta operation types
	// TODO: put this in a single object (which is nicer)
	//
	var Delta = {};            // Delta constructors; one for each operation
	var operationMethods = {}; // methods for the available operation-types in a Delta.Modify
	var composeFns = [];       // the accumulated case distinctions of delta composition

	//
	// a function to fully define a new delta operation type
	//
	function addOperationType({name, className, constructor, apply, prototype, method}) {
		//
		// define the Delta class
		//
		Delta[className] = constructor;
		Delta[className].constructor = constructor;
		$.extend(Delta[className].prototype, prototype, {
			type: name,
			apply: apply,
			compose(op2) {
				if (U.isUndefined(op2)) { return this }
				composeFns.forEach(({op1Type, op2Type, composeFn}) => {
					if (this.type === op1Type && op2.type === op2Type) {
						return composeFn(this, op2);
					}
				});
				var err = new Error(
						`You cannot follow a '${this.type}' operation ` +
						`with a '${op2.type}' operation on the same property.`
				);
				err.op1 = this.type;
				err.op2 = op2.type;
				throw err;
			}
		});
		//
		// define the method for adding the new operation to a Modify delta
		//
		if (U.isDefined(method)) {
			Object.defineProperty(operationMethods, name, {
				value: method
			});
		} else {
			Object.defineProperty(operationMethods, name, {
				value(property, ...values) {
					this._addOperation(property, U.applyConstructor(Delta[className], values));
				}
			});
		}
		Delta.Modify.prototype[name] = operationMethods[name];
	}

	//
	// a function to add new valid case distinctions for delta composition
	//
	function addCompositionRule(op1Type, op2Type, composeFn) {
		composeFns.push({ op1Type, op2Type, composeFn });
	}

	//
	// the modify operation
	//
	addOperationType({
		name: 'modify',
		className: 'Modify',
		constructor: function Modify(deltaDescription, operations) {
			deltaDescription = deltaDescription || {};
			this.operations = operations || {};
			//
			// process possible delta description
			//
			$.each(deltaDescription, (key, value) => {
				var match = key.match(/^(\w+)\s+(\w+)$/);
				if (match) {
					var operation = match[1];
					var property = match[2];
					U.assert(operation in operationMethods,
							`I don't know the '${operation}' operation.`);
					this[operation](property, value);
				}
			});
		},
		apply(value) {
			U.assert(U.isDefined(value),
					`The 'modify' operation expects the property to be already defined.`);
			var newObj = $.extend({}, value);
			Object.keys(this.operations).forEach((property) => {
				newObj[property] = this.operations[property].apply(newObj[property]);
			});
			return newObj;
		},
		prototype: $.extend({
			_addOperation(property, leafDelta) {
				if (this.operations.hasOwnProperty(property)) {
					this.operations[property] = this.operations[property].compose(leafDelta);
				} else {
					this.operations[property] = leafDelta;
				}
			}
		}, operationMethods),
		method(property, deltaDescription) {
			this._addOperation(property, new Delta.Modify(deltaDescription));
			return this.operations[property];
		}
	});

	//
	// the other standard operation types
	//
	addOperationType({
		name: 'add',
		className: 'Add',
		constructor: function Add(value) { this.value = value },
		apply(value) {
			U.assert(U.isUndefined(value),
					`The 'add' operation expects the property to first be undefined.`);
			return this.value;
		}
	});
	addOperationType({
		name: 'replace',
		className: 'Replace',
		constructor: function Replace(value) { this.value = value },
		apply(value) {
			U.assert(U.isDefined(value),
					`The 'replace' operation expects the property to be already defined.`);
			return this.value;
		}
	});
	addOperationType({
		name: 'remove',
		className: 'Remove',
		constructor: function Remove() {},
		apply(value) {
			U.assert(U.isDefined(value),
					`The 'remove' operation expects the property to first be defined.`);
			return undefined;
		}
	});
	addOperationType({
		name: 'forbid',
		className: 'Forbid',
		constructor: function Forbid() {},
		apply(value) {
			U.assert(U.isUndefined(value),
					`The 'forbid' operation requires the property to be undefined.`);
			return value;
		}
	});

	//
	// composition of the standard operation types
	//
	addCompositionRule('add', 'replace',     (d1, d2) => new Delta.Add(d2.value));
	addCompositionRule('add', 'modify',      (d1, d2) => new Delta.Add(d2.apply(d1.value)));
	addCompositionRule('add', 'remove',      (d1, d2) => new Delta.Forbid());
	addCompositionRule('replace', 'replace', (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('replace', 'modify',  (d1, d2) => new Delta.Replace(d2.apply(d1.value)));
	addCompositionRule('replace', 'remove',  (d1, d2) => new Delta.Remove());
	addCompositionRule('modify', 'replace',  (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('modify', 'modify', (d1, d2) => {
		var composedOpMaps = $.extend({}, d1.operations);
		Object.keys(d2.operations).forEach((prop) => {
			composedOpMaps = d1.operations[prop].compose(d2.operations[prop]);
		});
		return new Delta.Modify({}, composedOpMaps);
	});
	addCompositionRule('modify', 'remove', (d1, d2) => new Delta.Remove());
	addCompositionRule('remove', 'add',    (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('remove', 'forbid', (d1, d2) => new Delta.Remove());
	addCompositionRule('forbid', 'add',    (d1, d2) => new Delta.Add(d2.value));
	addCompositionRule('forbid', 'forbid', (d1, d2) => new Delta.Forbid());


	//
	// insert operation type
	//
	addOperationType({
		name: 'insert',
		className: 'Insert',
		constructor: function Insert(value) { this.value = value },
		apply(value) {
			U.assert(U.isUndefined(value) || $.isFunction(value),
					`The operation 'insert' expects the property to be undefined or a function.`);
			var that = this;
			return function (...args) {
				value.apply(this, args);
				that.value.apply(this, args);
			};
		}
	});
	addCompositionRule('insert', 'replace', (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('insert', 'remove', (d1, d2) => new Delta.Forbid());
	addCompositionRule('add', 'insert', (d1, d2) => {
		U.assert($.isUndefined(d1.value) || $.isFunction(d1.value),
				`The operation 'insert' expects the property it acts on to be undefined or a function.`);
		return new Delta.add(d2.apply(d1.value));
	});
	addCompositionRule('remove', 'insert', (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('replace', 'insert', (d1, d2) => {
		U.assert($.isUndefined(d1.value) || $.isFunction(d1.value),
				`The operation 'insert' expects the property it acts on to be undefined or a function.`);
		return new Delta.replace(d2.apply(d1.value));
	});
	addCompositionRule('forbid', 'insert', (d1, d2) => new Delta.Insert(d2.value));


	//
	// insert operation type
	//
	addOperationType({
		name: 'after',
		className: 'After',
		constructor: function After(value) { this.value = value },
		apply(value) {
			U.assert(U.isUndefined(value) || $.isFunction(value),
					`The operation 'after' expects the property to be undefined or a function.`);
			var that = this;
			return function (...args) {
				return P.resolve(value.apply(this, args)).then(function (promiseValue) {
					return that.value.apply(this, [promiseValue].concat(args));
				}.bind(this));
			};
		}
	});
	addCompositionRule('after', 'replace', (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('after', 'remove', (d1, d2) => new Delta.Forbid());
	addCompositionRule('add', 'after', (d1, d2) => {
		U.assert($.isUndefined(d1.value) || $.isFunction(d1.value),
				`The operation 'after' expects the property it acts on to be undefined or a function.`);
		return new Delta.add(d2.apply(d1.value));
	});
	addCompositionRule('remove', 'after', (d1, d2) => new Delta.Replace(d2.value));
	addCompositionRule('replace', 'after', (d1, d2) => {
		U.assert($.isUndefined(d1.value) || $.isFunction(d1.value),
				`The operation 'after' expects the property it acts on to be undefined or a function.`);
		return new Delta.replace(d2.apply(d1.value));
	});
	addCompositionRule('forbid', 'after', (d1, d2) => new Delta.After(d2.value));
	addCompositionRule('insert', 'after', (d1, d2) => new Delta.Insert(d2.value));
	addCompositionRule('after', 'insert', (d1, d2) => new Delta.After(d2.value));

	// TODO: the above compositions of 'insert' and 'after' are not actually
	//     : correct; not associative, in fact. Rather than collapsing them
	//     : at this stage, a list of operations should be kept.

	//
	// return the delta classes
	//
	return Delta;

});
