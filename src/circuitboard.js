define(['jquery', 'bluebird', './util/widget.js', './util/misc.js', './util/main-delta-model.js' ], function ($, P, amyWidget, U, dm) {
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
		$.circuitboard.Circuitboard = amyWidget('Circuitboard', {
			cssClass: "circuitboard",
			filter: ()=>P.resolve(true)
		});

		$.circuitboard.Tilemap = amyWidget('Tilemap', {
			cssClass: "tilemap"
		});

		$.circuitboard.Tile = amyWidget('Tile', {
			cssClass: 'tile'
		});
	}


	/* for getting the plugin graph */
	$.circuitboard.plugin.graph = () => dm.graph();


	/*  return the static `$.circuitboard` object,         */
	/*  through which plugins can be applied and selected  */
	return $.circuitboard;

});
