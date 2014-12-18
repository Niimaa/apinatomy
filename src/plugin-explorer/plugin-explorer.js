/* styling */
require('./plugin-explorer.scss');

/* libraries */
var $ = require('expose?jQuery!jquery');
var JsGraph = require('js-graph');

/* load the circuitboard, model loader and plugins */
var circuitboard = require('../circuitboard.js');
var createDiagram = require('./delta-diagram.js');
require('../p-core.js');
require('../p-tile-skin.js');
require('../p-tile-spacing.js');
require('../p-tile-click-to-open.js');
require('../p-tile-weight.js');
require('../p-tile-active.js');
require('../p-tile-open.js');
require('../p-tile-grow-when-open.js');
require('../p-tile-open-active.js');
require('../p-tile-skin-grow-when-open.js');
require('../p-position-tracking.js');
require('../p-transition-position-tracking.js');
require('../p-tile-hidden.js');
require('../p-tile-maximized.js');
require('../p-tile-middleclick-to-maximize.js');
require('../p-d3.js');
require('../p-animation-loop.js'); // TODO: check if we still get an error when this is moved down one line
require('../p-ppi.js');
require('../p-three-d.js');
require('../p-three-d-geometric-models.js');
require('../p-three-d-geometric-models-stl.js');
require('../p-d3-three-d.js');
require('../p-three-d-manual-controls.js');
require('../p-three-d-auto-controls.js');


/* the application itself */
$(document).ready(() => {

	createDiagram(
		$('body > svg'),
		$.circuitboard.plugin.graph()
	);

});
