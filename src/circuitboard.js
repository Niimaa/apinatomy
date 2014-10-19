define([
	'jquery',
	'bluebird',
	'./util/widget.js',
	'./util/misc.js',
	'delta-js'
], function ($, P, amyWidget, U, DM) {
	'use strict';

	// allow '$.circuitboard' to accept plugins
	var dm = new DM();
	U.extend(U.object($, 'circuitboard'), {
		plugin(pluginOrSelection) {
			if ($.isPlainObject(pluginOrSelection)) {
				//// the function is used to register a new plugin
				return dm.register(pluginOrSelection);
			} else {
				//// the function is used to select plugins to be applied
				dm.select.apply(dm, pluginOrSelection);
				defineWidgetClasses();
			}
		}
	});

	// to define the widget classes after the proper plugins have been selected
	function defineWidgetClasses() {
		dm.vp('Circuitboard', amyWidget('Circuitboard', {
			cssClass: "circuitboard",
			filter: ()=>P.resolve(true),
			model: null
		}));

		dm.vp('Tilemap', amyWidget('Tilemap', {
			cssClass: "tilemap",
			model: null,
			_circuitboard: null
		}));

		dm.vp('Tile', amyWidget('Tile', {
			cssClass: 'tile',
			model: null,
			_circuitboard: null
		}));
	}

	// for getting the plugin graph
	$.circuitboard.plugin.graph = () => dm.graph();

	// return the static `$.circuitboard` object,
	// through which plugins can be applied and selected
	return $.circuitboard;

});
