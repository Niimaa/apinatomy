define(['jquery'], function ($) {
	'use strict';

	//
	// this can be loaded before a plugin file to elegantly handle
	// the situation where the circuitboard module is not yet loaded
	// to receive it
	//
	if (!$.circuitboard) {
		$.circuitboard = {
			prematurePlugins: [],
			plugin: function (newPlugin) {
				$.circuitboard.prematurePlugins.push(newPlugin);
			}
		};
	}

});
