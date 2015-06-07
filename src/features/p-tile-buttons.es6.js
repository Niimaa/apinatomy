define([
	'jquery',
	'bluebird',
	'chroma-js',
	'../util/misc.es6.js',
	'../util/codes.es6.js',
	'./p-tile-buttons.scss'
], function ($, P, color, U, {button}) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin.do('tile-buttons', {
		requires: ['core'],
		after:    ['tile-skin']
	});


	plugin.add('Tile.prototype.addButton', function ({name, icon}) {

		/* if it's not there yet, create a <div> that holds all the buttons */
		if (!this._buttonHolder) {
			U.makePositioned(this.element);
			this._buttonHolder = $(`<div class="tile-button-holder">`).appendTo(this.element);
		}

		/* create the button itself */
		var buttonElement = $(`<div class="tile-button ${name}">`).appendTo(this._buttonHolder);

		/* determine the icon coloring based on background color */
		(this.skinnedElement || P.resolve(this.element)).then((element) => {
			if (typeof icon === 'string') {
				buttonElement.css('background-image', `url(${icon})`);
			} else {
				let lightBackground = color(element.css('backgroundColor')).luminance() > 0.5;
				buttonElement.addClass(lightBackground ? 'black' : 'white')
					.css('background-image', `url(${lightBackground ? icon.black : icon.white})`);
			}
		});

		/* create the button-click-event */
		this.newEvent(`tile-button:${name}`, {
			source: buttonElement
				.mouseClick({ threshold: this.circuitboard.options.dragTheshold })
				.which(button.LEFT)
				.skipPropagation('tile-left-click') // only register this event for the inner-most element
		});

		/* return the event-stream for convenient chaining-notation */
		return this.event(`tile-button:${name}`);

	});


});
