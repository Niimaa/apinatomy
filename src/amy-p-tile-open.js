define(['jquery', './amy-util/jquery-static.js', './amy-circuitboard.js'], function ($) {
	'use strict';

	//
	// expect $.circuitboard to be defined
	//
	if (!$.circuitboard) {
		throw Error(
				"Can't access '$.circuitboard'. " +
				"Please load the core circuitboard module before loading any plugins."
		);
	}

	//
	// define the plugin
	//
	$.circuitboard.plugin({
		name: 'tile-open',
		after: ['tile-core'],

		'modify tile': {
			'after constructor': function () {
				//
				// the 'open' property
				//
				var _open = false;
				Object.defineProperty(this, 'open', {
					get() { return _open },
					set(shouldBeOpen) {
						_open = shouldBeOpen;
						this.trigger('open', _open);
					}
				});

				//
				// when the tile opens, populate the inner tilemap
				//
				this.on('open', (open) => {
					if (!open) { return }
					this.populateInnerTilemap();
				});

				//
				// automatically (un)set the CSS class 'open'
				//
				this.on('open', ()=>{ this.element.toggleClass("open", this.open) });

				//
				// initial 'open' signal
				//
				this.trigger('open', false);
			}
		}
	});
});
