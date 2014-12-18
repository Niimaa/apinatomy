define(['jquery', 'bluebird', './misc.js', './artefact.js'], function ($, P, U, Artefact) {
	'use strict';


	/*  a function to create an apinatomy component (widget)          */
	/*  as a jQuery element plugin; this is returned from the module  */
	function newWidgetType(typeName, optionDefaults) {

		/* the specific widget class */
		var Widget = Artefact.newSubclass(typeName, function Widget({cssClass}) {

			/* set the element CSS class */
			if (U.isDefined(cssClass)) { this.element.addClass(cssClass) }

			/* if the jquery element is removed, destroy the artefact */
			this.element.asEventStream('remove').onValue(() => { this.destroy() });

		}, {

			get model() { return this.options.model },

			get element() { return this.options.element }

		}, U.extend({
			beforeConstruction: P.resolve() // guarantee all widget construction to be asynchronous
		}, optionDefaults));

		/* create a lowercase name for this widget type */
		var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);

		/* jQuery plugin: the widget creation & retrieval function  */
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


	/* expose the widget class creator function */
	return newWidgetType;


});
