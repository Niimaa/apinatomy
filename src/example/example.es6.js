/* styling */
import './example.scss';


/* libraries */
import $ from 'expose?jQuery!jquery';
import P from 'bluebird';
import U from '../util/misc.es6.js';
import Kefir from '../util/kefir-and-eggs.es6.js';


/* load the circuitboard, model loader and plugins */
import circuitboard from '../circuitboard.es6.js';
//import getFmaModels from './fma-model.es6.js';
import getLyphModels from './lyph-model.es6.js';
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
import '../features/p-tile-effectively-visible.es6.js';
import '../features/p-tile-maximized.es6.js';
import '../features/p-tile-middleclick-to-maximize.es6.js';
import '../features/p-tile-buttons.es6.js';
import '../features/p-tile-button-to-hide.es6.js';
import '../features/p-tile-button-to-maximize.es6.js';
import '../features/p-tile-button-to-unhide-children.es6.js';
import '../features/p-tile-child-count-if-closed.es6.js';

//import '../features/p-d3.es6.js';
//import '../features/p-connectivity.es6.js';
//import '../features/p-ppi.es6.js';
//import '../features/p-three-d.es6.js';
//import '../features/p-three-d-geometric-models.es6.js';
//import '../features/p-three-d-geometric-models-stl.es6.js';
//import '../features/p-three-d-geometric-models-obj.es6.js';
//import '../features/p-three-d-geometric-models-json.es6.js';
//import '../features/p-three-d-spinner.es6.js';
//import '../features/p-d3-three-d.es6.js';
//import '../features/p-three-d-manual-controls.es6.js';
//import '../features/p-three-d-auto-controls.es6.js';
//import '../features/p-snapshot.es6.js';
//import '../features/p-tile-visible-snapshot.es6.js';
//import '../features/p-tile-maximized-snapshot.es6.js';
//import '../features/p-three-d-camera-snapshot.es6.js';
//import '../features/p-tile-open-snapshot.es6.js';
//import '../features/p-three-d-tubes.es6.js';
//import '../features/p-three-d-model-snapshot.es6.js';
//import '../features/p-tile-button-to-swap-three-d-model.es6.js';
//import '../features/p-tile-button-to-point-camera.es6.js';


/* open up all tiles by default */
circuitboard.plugin.do('start-tiles-open', { resolves: ['tile-open'] }).append('Tile.prototype.construct', function () {
	this.model.then((model) => {
		this.open = model.children.length > 0;
	});
});


/* select plugins to activate them  (note that these must already be *loaded* at this point) */
circuitboard.plugin.select(
	'tile-skin',
	'tile-click-to-open',
	'tile-grow-when-open',
	'tile-shrink-when-hidden',
	'tile-grow-when-maximized',
	'tile-middleclick-to-maximize',
	'tile-spacing',
	'tile-active',
	'tile-button-to-hide',
	'tile-button-to-maximize',
	'tile-button-to-unhide-children',
	'tile-child-count-if-closed'

	//'three-d-manual-controls',
	//'three-d-auto-controls',
	//'three-d-geometric-models-obj',
	//'three-d-geometric-models-json',
	//'snapshot',
	//'tile-button-to-swap-three-d-model',
	//'tile-button-to-point-camera',
	//'connectivity',
);


$(document).ready(() => {

	let root = U.getQueryVariable('root') || '1';
	let port = U.getQueryVariable('port') || '5056';

	$('#circuitboard').circuitboard({
		model: getLyphModels('root', { root, port }),
		tileSpacing: 8,
		tilemapMargin: 8,
		weightWhenOpen: 8,
		threeDCanvasElement: $('#three-d-canvas'),
		threeDModels: {},
		pathServerPort: port
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

	});

});
