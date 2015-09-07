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
import getLyphModels from './lyph-model.es6.js';
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

//import '../features/p-tile-correlation-count-if-closed.es6.js';
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
	'tile-glyphs'

	//'connectivity',
	//'tile-correlation-count-if-closed',
	//'three-d-manual-controls',
	//'three-d-auto-controls',
	//'three-d-geometric-models-obj',
	//'three-d-geometric-models-json',
	//'snapshot',
	//'tile-button-to-swap-three-d-model',
	//'tile-button-to-point-camera',
);



const LYPH_TO_EXPERIMENTS = {
	50: ['1', '2']

	// TODO: insert manually from Bernard

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
				.css('stroke', '#' + decimalToHex(experiments[exp].color, 6));

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
							console.log('v:', tile.model.id);
						}
					} else {
						for (let child of tile.closestDescendantsByType('Tile')) {
							child.visible = false;
						}
					}
				});
			}, 200);
		});


		/* getting lyph ids from fmas */
		//let fmas = [50801,61992,72980]; // test fmas
		if (fmas) {

			// get all lyph ids belonging to the given fma ids
			P.resolve($.ajax({
				url: `http://open-physiology.org:${port}/scaimap/?fmas=${fmas.join(',')}`,
				dataType: 'jsonp'
			})).get('results').filter(({foundmatch}) => foundmatch === "yes")
				.map(({lyphs}) => lyphs)
				.reduce((end, next) => end.concat(next), [])
				.map(({lyphID}) => lyphID)
				.then(ids => ([...(new Set(ids)).values()])) // dedupe

				// get lyph ids for all lyphs 'inbetween' root and given lyphs
				.then((ids) => P.resolve($.ajax({
					url: `http://open-physiology.org:${port}/between/?root=${original}&ends=${ids.join(',')}`,
					dataType: 'jsonp'
				})))
				.map(({id})=>id)

				// get a hold of their models
				.then(lyphs => P.resolve(getLyphModels(lyphs.concat(Object.keys(LYPH_TO_EXPERIMENTS)), {root, port})))
				//.map(a => a)
				.each(console.log.bind(console, '-'))
				.map(({id}) => id)

				// get a hold of their tiles
				.each((id) => {
					circuitboard.tile(id).then((tile) => {
						console.log(id);
						tile.visible = true;
					});
				})

				// error out if needed
				.error((err) => {
					console.error("There seems to be something wrong with the server.", err);
				});
		}


	});

});
