define([
	'jquery',
	'bluebird',
	'./util/widget.js',
	'./util/misc.js',
	'./util/main-delta-model.js'
], function ($, P, newWidgetType, U, dm) {
	'use strict';


	/* allow '$.circuitboard' to accept plugins */
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


	/* to define the widget classes after the proper plugins have been selected */
	function defineWidgetClasses() {

		$.circuitboard.Circuitboard =
				newWidgetType('Circuitboard', {
					cssClass: "circuitboard",
					filter: () => P.resolve(true) // don't hide any entities
				});

		$.circuitboard.Tilemap =
				newWidgetType('Tilemap', {
					cssClass: "tilemap"
				});

		$.circuitboard.Tile =
				newWidgetType('Tile', {
					cssClass: 'tile'
				});

	}


	/* for retrieval of certain objects */
	$.circuitboard.plugin.graph = () => dm.graph();
	$.circuitboard.plugin.dm = dm;


	/*  return the static `$.circuitboard` object,         */
	/*  through which plugins can be applied and selected  */
	return $.circuitboard;


});
