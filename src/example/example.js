/* styling */
require('./example.scss');

/* libraries */
var $ = require('expose?jQuery!jquery');

/* load the circuitboard, model loader and plugins */
var circuitboard = require('../circuitboard.js');
var getFmaModels = require('../fma-model.js');
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
require('../p-three-d-geometric-models-obj.js');
require('../p-three-d-geometric-models-json.js');
require('../p-d3-three-d.js');
require('../p-three-d-manual-controls.js');
require('../p-three-d-auto-controls.js');


/* select plugins to activate them  (note that these must already be *loaded* at this point) */
circuitboard.plugin([
	'tile-skin',
	'tile-click-to-open',
	'tile-grow-when-open',
	'tile-middleclick-to-maximize',
	'tile-spacing',
	'tile-active',
	'three-d',
	'three-d-manual-controls',
	'three-d-auto-controls',
	'three-d-geometric-models',
	'three-d-geometric-models-obj',
	'three-d-geometric-models-json'
]);


/* use the $.fn.circuitboard method to instantiate the circuit-board */
$(document).ready(() => {

	$('#circuitboard').circuitboard({
		model: getFmaModels(['24tile:60000000'])[0],
		tileSpacing: 1,
		tilemapMargin: 0,
		weightWhenOpen: 8,
		threeDCanvasElement: $('#three-d-canvas'),
		threeDModels: {

			'fma:7148': [
				{ file: require('./3d-models/FMA7148_Stomach.obj') }
			],

			'fma:7187': [
				{
					id: 'walking-legs',
					parts: [
						{ file: require('./3d-models/walking-legs/left_femur_1.json') },
						{ file: require('./3d-models/walking-legs/left_fibula_1.json') },
						{ file: require('./3d-models/walking-legs/left_foot_1.json') },
						{ file: require('./3d-models/walking-legs/left_hip_1.json') },
						{ file: require('./3d-models/walking-legs/left_patella_1.json') },
						{ file: require('./3d-models/walking-legs/left_tibia_1.json') },
						{ file: require('./3d-models/walking-legs/muscles_1.json'), color: 0x7F1F1A },
						{ file: require('./3d-models/walking-legs/right_femur_1.json') },
						{ file: require('./3d-models/walking-legs/right_fibula_1.json') },
						{ file: require('./3d-models/walking-legs/right_foot_1.json') },
						{ file: require('./3d-models/walking-legs/right_hip_1.json') },
						{ file: require('./3d-models/walking-legs/right_patella_1.json') },
						{ file: require('./3d-models/walking-legs/right_tibia_1.json') }
					],
					color: 0xE6E6B3,
					animation: { duration: 1500 },
					relativePosition: {
						z: 100
					}
				}
			]

		}
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

		window.setThreeDMode = function (mode) {
			circuitboard.threeDMode = mode;
		};

	});

});
