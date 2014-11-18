define([
	'jquery',
	'bluebird',
	'./util/widget.js',
	'./util/misc.js',
	'delta-js'
], function ($, P, amyWidget, U, DM) {
	'use strict';

	// tell delta.js about bluebird
	DM.registerPromiseResolver(P.resolve);

	// allow '$.circuitboard' to accept plugins
	var dm = new DM();
	U.extend(U.object($, 'circuitboard'), {
		plugin(pluginOrSelection) {
			if ($.isPlainObject(pluginOrSelection)) {
				// the function is used to register a new plugin
				return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
			} else {
				// the function is used to select plugins to be applied
				dm.select.apply(dm, pluginOrSelection);
				defineWidgetClasses();
			}
		}
	});

	// to define the widget classes after the proper plugins have been selected
	function defineWidgetClasses() {
		$.circuitboard.Circuitboard = dm.vp('Circuitboard', amyWidget('Circuitboard', {
			cssClass: "circuitboard",
			filter: ()=>P.resolve(true)
		}));

		$.circuitboard.Tilemap = dm.vp('Tilemap', amyWidget('Tilemap', {
			cssClass: "tilemap"
		}));

		$.circuitboard.Tile = dm.vp('Tile', amyWidget('Tile', {
			cssClass: 'tile'
		}));
	}

	// for getting the plugin graph
	$.circuitboard.plugin.graph = () => dm.graph();

	// return the static `$.circuitboard` object,
	// through which plugins can be applied and selected
	return $.circuitboard;

});
