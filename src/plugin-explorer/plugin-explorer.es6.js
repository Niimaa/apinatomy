/* styling */
import './plugin-explorer.scss';


/* libraries */
import $ from 'expose?jQuery!jquery';


/* load the circuitboard, model loader and plugins */
import circuitboard from '../circuitboard.es6.js';
import createDiagram from './delta-diagram.es6.js';
import '../features/p-core.es6.js';
import '../features/p-tile-skin.es6.js';
import '../features/p-tile-spacing.es6.js';
import '../features/p-tile-click-to-open.es6.js';
import '../features/p-tile-weight.es6.js';
import '../features/p-tile-active.es6.js';
import '../features/p-tile-open.es6.js';
import '../features/p-tile-grow-when-open.es6.js';
import '../features/p-tile-shrink-when-hidden.es6.js';
import '../features/p-tile-grow-when-maximized.es6.js';
import '../features/p-tile-open-active.es6.js';
import '../features/p-tile-skin-grow-when-open.es6.js';
import '../features/p-position-tracking.es6.js';
import '../features/p-transition-position-tracking.es6.js';
import '../features/p-tile-hidden.es6.js';
import '../features/p-tile-maximized.es6.js';
import '../features/p-tile-middleclick-to-maximize.es6.js';
import '../features/p-d3.es6.js';
import '../features/p-ppi.es6.js';
import '../features/p-three-d.es6.js';
import '../features/p-three-d-geometric-models.es6.js';
import '../features/p-three-d-geometric-models-stl.es6.js';
import '../features/p-three-d-geometric-models-obj.es6.js';
import '../features/p-three-d-geometric-models-json.es6.js';
import '../features/p-three-d-spinner.es6.js';
import '../features/p-d3-three-d.es6.js';
import '../features/p-three-d-manual-controls.es6.js';
import '../features/p-three-d-auto-controls.es6.js';
import '../features/p-snapshot.es6.js';
import '../features/p-three-d-camera-snapshot.es6.js';
import '../features/p-tile-open-snapshot.es6.js';
import '../features/p-tile-buttons.es6.js';
import '../features/p-tile-visible-snapshot.es6.js';
import '../features/p-tile-maximized-snapshot.es6.js';
import '../features/p-three-d-tubes.es6.js';
import '../features/p-three-d-model-snapshot.es6.js';
import '../features/p-tile-button-to-hide.es6.js';
import '../features/p-tile-button-to-maximize.es6.js';
import '../features/p-tile-button-to-swap-three-d-model.es6.js';
import '../features/p-tile-button-to-point-camera.es6.js';


/* the application itself */
$(document).ready(() => {

	createDiagram(
		$('body > svg'),
		$.circuitboard.plugin.do().delta().graph
	);

});
