define(['jquery', 'js-graph', 'bluebird', './traverse-dag.js', './misc.js'], function ($, JsGraph, P, traverse, U) {
	'use strict';

	//
	// Accumulated data for the available delta operation types
	//
	var opTypes = {};    // the name and delta classes
	var composeFns = []; // the case distinctions of delta composition

	//
	// a function to fully define a new delta operation type
	//
	function addOperationType({name, constructor: constructorFn, apply: applyFn, prototype, method}) {
		// define the method for adding the new operation to a Modify delta
		var objectWithMethod = {};
		if (U.isDefined(method)) {
			Object.defineProperty(objectWithMethod, name, {
				value: method
			});
		} else {
			Object.defineProperty(objectWithMethod, name, {
				value(property, ...values) {
					this._addOperation(opTypes[name], property, values);
					return this;
				}
			});
		}

		// define the operation type
		opTypes[name] = {
			name: name,
			Delta: constructorFn,
			method: objectWithMethod[name]
		};

		// define the Delta class
		$.extend(opTypes[name].Delta.prototype, prototype, {
			constructor: constructorFn,
			type: name,
			apply: applyFn,
			compose(property, op2) {
				if (U.isUndefined(op2)) { return this }
				var foundComposeFn;
				composeFns.some(({op1Type, op2Type, composeFn}) => {
					if (this.type === op1Type && op2.type === op2Type) {
						foundComposeFn = composeFn;
						return true;
					}
				});
				if (foundComposeFn) {
					foundComposeFn(this, property, op2);
				} else {
					var err = new Error(
							`You cannot follow a '${this.type}' operation ` +
							`with a '${op2.type}' operation on the same property.`
					);
					err.op1 = this.type;
					err.op2 = op2.type;
					throw err;
				}
			}
		});

		// make the operation method available on the 'modify' delta (assumes that 'modify' is defined first)
		opTypes['modify'].Delta.prototype[name] = opTypes[name].method;
	}
	function addOperationAlias({name, target, transform}) {

		// define the method for adding the new operation to a Modify delta
		var objectWithMethod = {};
		Object.defineProperty(objectWithMethod, name, {
			value(property, ...values) {
				this._addOperation(opTypes[target], property, transform(values));
				return this;
			}
		});

		// define the operation type
		opTypes[name] = {
			name: name,
			method: objectWithMethod[name]
		};

		// make the operation method available on the 'modify' delta (assumes that 'modify' is defined first)
		opTypes['modify'].Delta.prototype[name] = opTypes[name].method;
	}

	//
	// a function to add new valid case distinctions for delta composition
	//
	function addCompositionRule(op1Type, op2Type, composeFn) {
		composeFns.push({ op1Type, op2Type, composeFn });
	}
	var keepFirst = () => {};
	var keepSecond = (d1, p, d2) => { d1[p] = d2 };

	//
	// the modify operation (MUST BE THE FIRST OPERATION TYPE TO BE DEFINED)
	//
	addOperationType({
		name: 'modify',
		constructor: function Modify(deltaDescription, operations) {
			deltaDescription = deltaDescription || {};
			this.operations = operations || {};
			//
			// process possible delta description
			//
			$.each(deltaDescription, (key, value) => {
				var match = key.match(/^(\w+)\s+([\w\.]+)$/);
				if (match) {
					var operation = match[1];
					var property = match[2];
					U.assert(operation in opTypes,
							`I don't know the '${operation}' operation.`);
					this[operation](property, value);
				}
			});
		},
		apply(obj, property) {
			if (U.isDefined(property)) {
				//
				// if the property is passed, apply this delta to `obj[property]`
				//
				U.assert(U.isDefined(obj[property]),
						`The 'modify' operation expects the property to be already defined.`);
				Object.keys(this.operations).forEach((subProperty) => {
					this.operations[subProperty].apply(obj[property], subProperty);
				});
			} else {
				//
				// if the property is not passed, apply this delta to `obj`
				//
				U.assert(U.isDefined(obj),
						`The 'modify' operation expects the property to be already defined.`);
				Object.keys(this.operations).forEach((subProperty) => {
					this.operations[subProperty].apply(obj, subProperty);
				});
			}
		},
		prototype: {
			_addOperation(opType, property, values) {
				var dotIndex = property.indexOf('.');
				if (dotIndex !== -1) {
					//
					// the property is a dot-separated path; recursively create a modify-chain
					//
					var actualProperty = property.slice(0, dotIndex);
					var restOfProperty = property.slice(dotIndex+1);
					var newModifyDelta = this._addOperation(opTypes['modify'], actualProperty);
					return newModifyDelta[opType.name].apply(newModifyDelta, [restOfProperty].concat(values));
				} else {
					//
					// the property is a single name; add the new delta directly
					//
					var newDelta = U.applyConstructor(opType.Delta, values);
					if (this.operations.hasOwnProperty(property) && U.isDefined(this.operations[property])) {
						this.compose(property, newDelta);
					} else {
						this.operations[property] = newDelta;
					}
					return this.operations[property];
				}
			}
		},
		method(property, deltaDescription) {
			return this._addOperation(opTypes['modify'], property, [deltaDescription]);
		}
	});

	//
	// the other standard operation types
	//
	addOperationType({
		name: 'add',
		constructor: function Add(value) { this.value = value },
		apply(obj, property) {
			U.assert(U.isUndefined(obj[property]),
					`The 'add' operation expects the property to first be undefined.`);
			obj[property] = this.value;
		}
	});
	addOperationType({
		name: 'replace',
		constructor: function Replace(value) { this.value = value },
		apply(obj, property) {
			U.assert(U.isDefined(obj[property]),
					`The 'replace' operation expects the property to be already defined.`);
			obj[property] = this.value;
		}
	});
	addOperationType({
		name: 'remove',
		constructor: function Remove() {},
		apply(obj, property) {
			U.assert(U.isDefined(obj[property]),
					`The 'remove' operation expects the property to first be defined.`);
			delete obj[property];
		}
	});
	addOperationType({
		name: 'forbid',
		constructor: function Forbid() {},
		apply(obj, property) {
			U.assert(U.isUndefined(obj[property]),
					`The 'forbid' operation requires the property to be undefined.`);
		}
	});

	//
	// composition of the standard operation types
	//
	addCompositionRule('add', 'replace',     (d1, p, d2) => { d1[p] = new opTypes['add'].Delta(d2.value) });
	addCompositionRule('add', 'modify',      (d1, p, d2) => { d2.apply(d1[p], 'value') });
	addCompositionRule('add', 'remove',      (d1, p)     => { d1[p] = new opTypes['forbid'].Delta() });
	addCompositionRule('replace', 'replace', keepSecond);
	addCompositionRule('replace', 'modify',  (d1, p, d2) => { d2.apply(d1[p], 'value') });
	addCompositionRule('replace', 'remove',  keepSecond);
	addCompositionRule('modify', 'replace',  keepSecond);
	addCompositionRule('modify', 'modify', (d1, p, d2) => {
		Object.keys(d2.operations).forEach((prop) => {
			d1.compose(prop, d2.operations[prop]);
		});
	});
	addCompositionRule('modify', 'remove', keepSecond);
	addCompositionRule('remove', 'add',    (d1, p, d2) => { d1[p] = new opTypes['replace'].Delta(d2.value) });
	addCompositionRule('remove', 'forbid', keepFirst);
	addCompositionRule('forbid', 'add',    keepSecond);
	addCompositionRule('forbid', 'forbid', keepFirst);


	//
	// 'alter' operation type
	//
	addOperationType({
		name: 'alter',
		constructor: function Alter(value) { this.value = value || [] },
		apply(obj, property) {
			U.assert($.isFunction(obj[property]),
					`The operation 'alter' expects the property to be a function.`);
			this.value.forEach((subOp) => {
				var partOne = obj[property];
				var partTwo = subOp.value;
				if (subOp.type === 'prepend') {
					obj[property] = function (...args) {
						partTwo.apply(this, args);
						partOne.apply(this, args);
					};
				} else { // 'append' or 'insert'
					obj[property] = function (...args) {
						partOne.apply(this, args);
						partTwo.apply(this, args);
					};
				}
			});
		}
	});
	addCompositionRule('alter', 'alter', (d1, p, d2) => {
		[].push.apply(d1[p].value, this.value);
	});
	addCompositionRule('alter', 'replace', keepSecond);
	addCompositionRule('alter', 'remove', (d1, p) => { d1[p] = new opTypes['forbid'].Delta() });
	addCompositionRule('add', 'alter', (d1, p, d2) => {
		U.assert($.isFunction(d1[p].value),
				`The operation 'alter' expects the property it acts on to be a function.`);
		d2.apply(d1[p], 'value');
	});
	addCompositionRule('replace', 'alter', (d1, p, d2) => {
		U.assert($.isFunction(d1[p].value),
				`The operation 'alter' expects the property it acts on to be a function.`);
		d2.apply(d1[p], 'value');
	});


	//
	// the 'prepend', 'insert' and 'append' operation types
	//
	['prepend', 'insert', 'append'].forEach((opType) => {
		addOperationAlias({
			name: opType,
			target: 'alter',
			transform: (args) => [[{ type: opType, value: args[0] }]]
		});
	});


	//
	// 'after' operation type
	//
	addOperationType({
		name: 'after',
		constructor: function After(value) { this.value = value },
		apply(obj, property) {
			U.assert($.isFunction(obj[property]),
					`The operation 'after' expects the property to be a function.`);
			var partOne = obj[property];
			var partTwo = this.value;
			obj[property] = function (...args) {
				return P.resolve(partOne.apply(this, args)).then(function () {
					return partTwo.apply(this, args);
				}.bind(this));
			};
		}
	});
	addCompositionRule('after', 'replace', keepSecond);
	addCompositionRule('after', 'remove',  keepSecond);
	addCompositionRule('add', 'after', (d1, p, d2) => {
		U.assert($.isFunction(d1[p].value),
				`The operation 'after' expects the property it acts on to be undefined or a function.`);
		d2.apply(d1[p], 'value');
	});
	addCompositionRule('replace', 'after', (d1, p, d2) => {
		U.assert($.isFunction(d1[p].value),
				`The operation 'after' expects the property it acts on to be undefined or a function.`);
		d2.apply(d1[p], 'value');
	});
	addCompositionRule('insert', 'after', (d1, p, d2) => { d2.apply(d1[p], 'value'); });
	addCompositionRule('after', 'insert', (d1, p, d2) => { d2.apply(d1[p], 'value'); });

	// TODO: the above compositions of 'insert' and 'after' are not actually
	//     : correct; not associative, in fact. Rather than collapsing them
	//     : at this stage, a list of operations should be kept.

	//
	// return the modify delta class
	//
	return opTypes['modify'].Delta;

});
