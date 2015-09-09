/* styling */
import './example2.scss';


/* libraries */
import $ from 'expose?jQuery!jquery';
import P from 'bluebird';
import U from '../util/misc.es6.js';
import Kefir from '../util/kefir-and-eggs.es6.js';
import KefirSignalHandler from '../util/kefir-signal-handler.es6.js';
import {button} from '../util/codes.es6.js';


/* load the circuitboard, model loader and plugins */
import circuitboard from '../circuitboard.es6.js';
//import getFmaModels from './fma-model.es6.js';
import {getLyphModels, provideLyphsFromServer} from './lyph-model.es6.js';
import fetchPathsFn  from '../util/path-model.es6.js';
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
import '../features/p-tile-glyphs.es6.js';
import '../features/p-d3.es6.js';

import '../features/p-tile-correlation-count-if-closed.es6.js';
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


/* utility functions */
function decimalToHex(d, padding) {
	var hex = Number(d).toString(16);
	while (hex.length < padding) { hex = "0" + hex }
	return hex;
}


/* fetch query parameters */
const root     = U.getQueryVariable('root') || '161';
const port     = U.getQueryVariable('port') || '5055';
const fmas     = U.getQueryVariable('fmas')     ? U.getQueryVariable('fmas').split(',') : null;
const original = U.getQueryVariable('original') || root;


/* start the brain tile opened up */
circuitboard.plugin.do('start-brain-open', { if: true, after: ['tile-open', 'tile-hidden'] })
	.append('Tile.prototype.construct', function () {
		if (this.model.id === root) {
			this.open = true;
			this.visible = true;
		}
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
	'tile-child-count-if-closed',
	'tile-glyphs',

	//'connectivity',
	'tile-correlation-count-if-closed'
	//'three-d-manual-controls',
	//'three-d-auto-controls',
	//'three-d-geometric-models-obj',
	//'three-d-geometric-models-json',
	//'snapshot',
	//'tile-button-to-swap-three-d-model',
	//'tile-button-to-point-camera',
);



const LYPH_TO_EXPERIMENTS = {
	// filled in from translation of SCAI to FMA, then to Lyph ID
	13:  ['GSE20291'],
	305: ['E-GEOD-4757', 'E-GEOD-5281', 'GSE9770'],
	304: ['E-GEOD-4757', 'E-GEOD-5281', 'GSE9770'],
	280: ['E-GEOD-5281', 'GSE9770', 'E-GEOD-36980', 'E-GEOD-1297'],
	281: ['E-GEOD-5281', 'GSE9770', 'E-GEOD-36980', 'E-GEOD-1297'],
	255: ['E-GEOD-5281', 'GSE9770'],
	166: ['E-GEOD-5281', 'GSE9770'],
	309: ['E-GEOD-5281', 'GSE9770'],
	310: ['E-GEOD-5281', 'GSE9770'],
	230: ['E-GEOD-5281', 'GSE9770'],
	229: ['E-GEOD-5281', 'GSE9770'],
	457: ['E-GEOD-53890', 'E-GEOD-36980'],
	458: ['E-GEOD-53890', 'E-GEOD-36980'],
	459: ['E-GEOD-36980', 'E-MEXP-2280'],
	460: ['E-GEOD-36980', 'E-MEXP-2280'],
	409: ['GSE20146'],
	410: ['GSE20146'],
	461: ['E-GEOD-16759'],
	462: ['E-GEOD-16759'],
	4:   ['GSE20141'],
	5:   ['GSE20141']
};


let experiments = {};


/* start the brain tile opened up */
circuitboard.plugin.do('show-experiment-glyphs', { if: true, after: ['core', 'tile-glyphs'] })
	.append('Tile.prototype.construct', function () {
		let experimentsForThisLyph = LYPH_TO_EXPERIMENTS[this.model.id];
		if (!experimentsForThisLyph) { return }
		for (let exp of experimentsForThisLyph) {

			/* unknown experiment? */
			if (!experiments[exp]) {
				experiments[exp] = {
					color: Math.floor(Math.random() * 0xffffff)
				};
			}

			/* create a glyph for it in this lyph */
			let glyph = this.addGlyph({ tooltipText: `experiment ${exp}`, shape: 'square' });
			glyph.visible = true;

			/* the color of the glyph */
			glyph.element.children()
				.css('fill',   '#' + decimalToHex(experiments[exp].color, 6))
				.css('stroke', '#ffffff');

			/* clicking the glyph */
			glyph.element.click(() => {
				console.log('clicked experiment:', exp);

				// TODO: go to url with this experiment ID
				// http://aetionomy.scai.fraunhofer.de/apinatomy/<E-GEOD-20168>

			});

		}
	});


$(document).ready(() => {
	$('#circuitboard').circuitboard({
		model:          getLyphModels('root', { root, port }),
		fetchPaths:     fetchPathsFn({ port }),
		tileSpacing:    4,
		tilemapMargin:  4,
		weightWhenOpen: 10,
		initialTileVisibility: false
	}).circuitboard('instance').then(function (circuitboard) {


		console.info('circuitboard loaded');


		/* propagating tile visibility and open-ness */
		circuitboard.newTiles.onValue((tile) => {
			setTimeout(() => {
				tile.p('visible').onValue((visible) => {
					if (visible) {
						let parent = tile.closestAncestorByType('Tile');
						if (parent) {
							parent.visible = true;
							parent.open = true;
						}
					} else {
						for (let child of tile.closestDescendantsByType('Tile')) {
							child.visible = false;
						}
					}
				});
			}, 200);
		});


		/* show tiles of lyphs that have experiments */
		P.resolve(getLyphModels(Object.keys(LYPH_TO_EXPERIMENTS), {root, port})).map(({id}) => id)
			// get a hold of their tiles
			.each(({id}) => {
				circuitboard.tile(id).tap((tile) => {
					tile.populateInnerTilemap(); // TODO: this action is too wide, and thus too expensive
				}).then((tile) => {
					tile.visible = true;
				});
			});


		/* get all lyph ids belonging to the given fma ids */
		//let fmas = [50801,61992,72980]; // test fmas
		if (fmas) {
			P.resolve($.ajax({
				url: `http://open-physiology.org:${port}/scaimap/?fmas=${fmas.join(',')}&pipe=yes&root=${original}`,
				dataType: 'jsonp'
			})).then((response) => provideLyphsFromServer(response, {root, port})).map(a => a)
				// get a hold of their tiles
				.each(({id}) => {
					circuitboard.tile(id).tap((tile) => {
						tile.populateInnerTilemap(); // TODO: this action is too wide, and thus too expensive
					}).then((tile) => {
						tile.visible = true;
					});
				});
		}


		// TODO: correlations


	});
});
