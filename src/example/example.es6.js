/* styling */
import './example.scss';


/* libraries */
import $ from 'expose?jQuery!jquery';


/* load the circuitboard, model loader and plugins */
import circuitboard from '../circuitboard.es6.js';
import getFmaModels from './fma-model.es6.js';
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
import '../features/p-connectivity.es6.js';
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
	'three-d-manual-controls',
	'three-d-auto-controls',
	'three-d-geometric-models-obj',
	'three-d-geometric-models-json',
	'snapshot',
	'tile-button-to-hide',
	'tile-button-to-maximize',
	'tile-button-to-swap-three-d-model',
	'tile-button-to-point-camera',
	//'three-d-tubes',
	'connectivity'
);

$(document).ready(() => {

	$('#circuitboard').circuitboard({
		model: getFmaModels(['24tile:60000000'])[0],
		tileSpacing: 1,
		tilemapMargin: 0,
		weightWhenOpen: 8,
		threeDCanvasElement: $('#three-d-canvas'),
		threeDModels: {

			'fma:7148': {
				'stomach': {
					file: require('./3d-models/FMA7148_Stomach.obj'),
					color: 0x7F1F1A
				},
			},

			'fma:7187': {
				'walking-legs': {
					parts: {
						'left_femur_1':    { file: require('./3d-models/walking-legs/left_femur_1.json') },
						'left_fibula_1':   { file: require('./3d-models/walking-legs/left_fibula_1.json') },
						'left_foot_1':     { file: require('./3d-models/walking-legs/left_foot_1.json') },
						'left_hip_1':      { file: require('./3d-models/walking-legs/left_hip_1.json') },
						'left_patella_1':  { file: require('./3d-models/walking-legs/left_patella_1.json') },
						'left_tibia_1':    { file: require('./3d-models/walking-legs/left_tibia_1.json') },
						'muscles_1':       { file: require('./3d-models/walking-legs/muscles_1.json'), color: 0x7F1F1A },
						'right_femur_1':   { file: require('./3d-models/walking-legs/right_femur_1.json') },
						'right_fibula_1':  { file: require('./3d-models/walking-legs/right_fibula_1.json') },
						'right_foot_1':    { file: require('./3d-models/walking-legs/right_foot_1.json') },
						'right_hip_1':     { file: require('./3d-models/walking-legs/right_hip_1.json') },
						'right_patella_1': { file: require('./3d-models/walking-legs/right_patella_1.json') },
						'right_tibia_1':   { file: require('./3d-models/walking-legs/right_tibia_1.json') }
					},
					color: 0xE6E6B3,
					animation: { duration: 1500 },
					elevation: 0
				}
			},

		}
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

		/* set up global functions to test with from the JavaScript console */
		window.newSnapshot = (options) => {
			return new circuitboard.Snapshot(options);
		};

	});

});
