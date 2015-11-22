/* styling */
import './example3.scss';


/* libraries */
import $                  from 'expose?jQuery!jquery';
import P                  from 'bluebird';
import U                  from '../util/misc.es6.js';
import Kefir              from '../util/kefir-and-eggs.es6.js';
import KefirSignalHandler from '../util/kefir-signal-handler.es6.js';
import {button}           from '../util/codes.es6.js';


/* load the circuitboard, model loader and plugins */
import circuitboard                            from '../circuitboard-widget.es6.js';
import {getLyphModels, provideLyphsFromServer} from './lyph-model.es6.js';
import '../new-features/positioning.es6.js';
import '../new-features/core.es6.js';
import '../new-features/3d.es6.js';
import '../new-features/tile-weight.es6.js';
import '../new-features/tile-open.es6.js';
import '../new-features/tile-click-to-open.es6.js';
import '../new-features/d3.es6.js';
import '../new-features/tile-glyphs.es6.js';


/* utility functions */
function decimalToHex(d, padding) {
	let hex = Number(d).toString(16);
	while (hex.length < padding) { hex = "0" + hex }
	return hex;
}


/* fetch query parameters */
const root     = U.getQueryVariable('root') || '185'; // brain
const host     = 'open-physiology.org'; // alternative: 'open-physiology.org'
const port     = U.getQueryVariable('port') || '8888';
const fmas     = U.getQueryVariable('fmas') ? U.getQueryVariable('fmas').split(',') : null;
const original = U.getQueryVariable('original') || root;


/* select plugins to activate them  (note that these must already be *loaded* at this point) */
circuitboard.plugin.select(
	'tile-open',
	'tile-click-to-open',
	'tile-glyphs'
);


///* lyph ids mapped to experiments */
//const LYPH_OLD_ID_TO_EXPERIMENTS = {
//	// filled in from translation of SCAI to FMA, then to Lyph ID
//	13:  ['GSE20291'],
//	305: ['E-GEOD-4757', 'E-GEOD-5281', 'GSE9770'],
//	304: ['E-GEOD-4757', 'E-GEOD-5281', 'GSE9770'],
//	280: ['E-GEOD-5281', 'GSE9770', 'E-GEOD-36980', 'E-GEOD-1297'],
//	281: ['E-GEOD-5281', 'GSE9770', 'E-GEOD-36980', 'E-GEOD-1297'],
//	255: ['E-GEOD-5281', 'GSE9770'],
//	166: ['E-GEOD-5281', 'GSE9770'],
//	309: ['E-GEOD-5281', 'GSE9770'],
//	310: ['E-GEOD-5281', 'GSE9770'],
//	230: ['E-GEOD-5281', 'GSE9770'],
//	229: ['E-GEOD-5281', 'GSE9770'],
//	457: ['E-GEOD-53890', 'E-GEOD-36980'],
//	458: ['E-GEOD-53890', 'E-GEOD-36980'],
//	459: ['E-GEOD-36980', 'E-MEXP-2280'],
//	460: ['E-GEOD-36980', 'E-MEXP-2280'],
//	409: ['GSE20146'],
//	410: ['GSE20146'],
//	461: ['E-GEOD-16759'],
//	462: ['E-GEOD-16759'],
//	4:   ['GSE20141'],
//	5:   ['GSE20141']
//};



/* lyph ids mapped to experiments */ // NEW INFO FROM CHRISTIAN
const LYPH_OLD_ID_TO_EXPERIMENTS = {
	// filled in from translation of SCAI to FMA, then to Lyph ID
	305: ['E-GEOD-4757', 'E-GEOD-5281'],
	304: ['E-GEOD-4757', 'E-GEOD-5281'],
	280: ['E-GEOD-5281', 'E-GEOD-36980'],
	281: ['E-GEOD-5281', 'E-GEOD-36980'],
	255: ['E-GEOD-5281'],
	166: ['E-GEOD-5281'],
	309: ['E-GEOD-5281'],
	310: ['E-GEOD-5281'],
	230: ['E-GEOD-5281'],
	229: ['E-GEOD-5281'],
	457: ['E-GEOD-36980'],
	458: ['E-GEOD-36980'],
	459: ['E-GEOD-36980', 'E-MEXP-2280'],
	460: ['E-GEOD-36980', 'E-MEXP-2280'],
	4:   ['E-GEOD-20292', 'E-GEOD-20333', 'E-GEOD-20163', 'E-GEOD-20164'],
	5:   ['E-GEOD-20292', 'E-GEOD-20333', 'E-GEOD-20163', 'E-GEOD-20164']
};


/* storing information common to all instances (glyphs) of an experiment */
let experiments = {};


/* show experiments in their tiles */
circuitboard.plugin.do('show-experiment-glyphs', { if: true, after: ['tile-glyphs'] })
	.append('Tile.prototype.construct', function () {

		let experimentsForThisLyph = LYPH_OLD_ID_TO_EXPERIMENTS[this.model.oldID];
		if (!experimentsForThisLyph) { return }
		for (let experimentID of experimentsForThisLyph) {

			/* unknown experiment? */
			if (!experiments[experimentID]) {
				experiments[experimentID] = {
					color: Math.floor(Math.random() * 0xffffff)
				};
			}

			/* create glyph */
			let glyph = this.addGlyph({
				tooltipText: experimentID,
				color: experiments[experimentID].color
			});

			/* click to go to Aetionomy URL */
			glyph.event('click').onValue(() => {
				window.open(`http://aetionomy.scai.fhg.de/project_core/${experimentID}`, '_self');
			});

			glyph.event('contextmenu').onValue(({origDomEvent}) => {
				origDomEvent.preventDefault();
				window.open(`http://aetionomy.scai.fhg.de/project_core/${experimentID}`);
			});

			glyph.event('mouseover').onValue(() => {
				this.circuitboard.element.css({
					cursor: 'pointer'
				});
			});
			glyph.event('mouseout').onValue(() => {
				this.circuitboard.element.css({
					cursor: 'default'
				});
			});

		}
	});


$(document).ready(() => {
	$('#three-d-canvas').circuitboard({
		model:          getLyphModels('root', { host, root, port }),
		tileSpacing:    6,
		weightWhenOpen: 4,
		//filter:         ({id}) => id === root // TODO: re-enable?
	}).circuitboard('instance').then(function (circuitboard) {


		console.info('circuitboard loaded');


		let allowedModels = [];
		circuitboard.options.filter = (model) => (allowedModels.indexOf(model) !== -1);






		/* get all lyph models that have experiments */
		let experimentModelsP = P.resolve($.ajax({
			url: `http://${host}:${port}/lyphTemplatesByOldID/${Object.keys(LYPH_OLD_ID_TO_EXPERIMENTS).join(',')}`,
			dataType: 'jsonp'
		})).filter(a=>a).map(({id}) => id).tap((ids) => { console.log('old ids into new ids:', ids) }).then((ids) => P.resolve($.ajax({
			url: `http://${host}:${port}/lyphTemplatesBetween/${[...ids, original].join(',')}`,
			dataType: 'jsonp'
		}))).map(({id}) => id).tap((ids) => { console.log('with between:', ids) }).then((ids) => getLyphModels(ids, {root, host, port})).map(a=>a);

		/* get all lyph models belonging to the given fma ids */
		let requestedModelsP = P.resolve([]);
		if (fmas) {
			requestedModelsP = P.resolve($.ajax({
				url: `http://${host}:${port}/lyphTemplatesByFmaID/${fmas.join(',')}`,
				dataType: 'jsonp'
			})).filter(a=>a).map(({id}) => id).then((ids) => P.resolve($.ajax({
				url: `http://${host}:${port}/lyphTemplatesBetween/${[...ids, original].join(',')}`,
				dataType: 'jsonp'
			}))).then((response) => provideLyphsFromServer(response, {root, host, port})).map(a=>a);
		}

		/* open up all relevant tiles */
		P.join(experimentModelsP, requestedModelsP, (experimentModels, requestedModels) => [...experimentModels, ...requestedModels]).then((models) => {
			allowedModels.push(...models);
			for (let tileP of models.map(({id}) => circuitboard.tile(id))) {
				tileP.then((tile) => {
					let parentTile = tile.closestAncestorByType('Tile');
					if (parentTile) {
						parentTile.open = true;
						tile.populateInnerTilemap();
					}
				});
			}
			circuitboard.tile(root).then((tile) => {
				tile.populateInnerTilemap();
			});
			if (fmas) {
				P.resolve($.ajax({
					url: `http://${host}:${port}/lyphTemplatesByFmaID/${fmas.join(',')}`,
					dataType: 'jsonp'
				})).filter(a=>a).each(({id}) => {
					//for (let {id} of result) {
						circuitboard.tile(id).then((tile) => {
							tile.textColor = 0x0000FF;
						});
					//}
				});
			}
		});

	});
});
