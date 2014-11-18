define(['jquery', 'bluebird', './misc.js', './artefact.js'], function ($, P, U, Artefact) {
	'use strict';


	/*  a function to create an apinatomy component (widget)          */
	/*  as a jQuery element plugin; this is returned from the module  */
	function amyWidget(typeName, optionDefaults) {


		/* the specific widget class */
		var Widget = U.newSubclass(Artefact, function Widget(superFn, options) {

			/* process options */
			var processedOptions = options;
			Object.keys(optionDefaults).forEach((key) => {
				if (U.isUndefined(processedOptions[key])) {
					processedOptions[key] = optionDefaults[key];
				}
			});
			processedOptions.type = typeName;

			/* call super-function */
			superFn(processedOptions);

			/* set the element class */
			this.element.addClass(this.options.cssClass);

			/* if the jquery element is removed, destroy the artefact */
			this.element.one('remove', () => { this.destroy() });

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

		}, {

			get model() { return this.options.model },

			get element() { return this.options.element },

			get circuitboard() {
				if (!this._circuitboard) { this._circuitboard = this.closestAncestorByType('Circuitboard') }
				return this._circuitboard;
			},

			beforeConstruction(possiblePromise) {
				this.constructed = this.constructed
						.return(P.resolve(possiblePromise))
						.return(this);
			}

		});


		/* now define the widget creation & retrieval function as a jQuery plugin */
		var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
		$.fn[lowercaseName] = function (options) {

			/* if the word 'instance' is passed, return the (already created) widget promise */
			if (options === 'instance') { return this.data(`-amy-${lowercaseName}`) }

			/* else, create a new widget and set a promise to it */
			var newWidget = new Widget(U.extend(options, { element: this }));
			this.data(`-amy-${lowercaseName}`, newWidget.constructed);

			/* return the jQuery element instance, by jQuery convention */
			return this;

		};


		/* return the widget artefact class */
		return Widget;


	}

	return amyWidget;

});
