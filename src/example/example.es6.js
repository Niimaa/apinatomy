/* styling */
import './example.scss';


/* libraries */
import $ from 'expose?jQuery!jquery';
import P from 'bluebird';
import U from '../util/misc.es6.js';
import Kefir from '../util/kefir-and-eggs.es6.js';
import KefirSignalHandler from '../util/kefir-signal-handler.es6.js';
import codes from '../util/codes.es6.js';
let button = codes.button;

import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';


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
import '../features/p-tile-correlation-count-if-closed.es6.js';
import '../features/p-tile-glyphs.es6.js';
import '../features/p-d3.es6.js';

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



/* fetch query parameters */
const root = U.getQueryVariable('root') || '1';
const port = U.getQueryVariable('port') || '5056';



/* golden layout */
let goldenLayout = new GoldenLayout({
	settings: {
		showPopoutIcon:   false,
		showMaximiseIcon: false,
		showCloseIcon:    false
	},
	dimensions: {
		borderWidth: 4
	},
	content: [{
		type: 'row',
		content:[{
			type: 'column',
			width: 0.2,
			content:[{
				type: 'component',
				componentName: 'correlations',
				title: 'Correlations',
				height: 0.2
			}, {
				type: 'component',
				componentName: 'lyphs',
				title: 'Lyphs',
				height: 0.4
			}, {
				type: 'component',
				componentName: 'clindices',
				title: 'Clinical Indices',
				height: 0.4
			}]
		}, {
			type: 'component',
			width: 0.8,
			componentName: 'circuitboard',
			title: 'Circuitboard'
		}]
	}]
});
goldenLayout.registerComponent('correlations', (container) => {
	container.getElement().css({
		'overflow-x': 'hidden',
		'overflow-y': 'scroll'
	}).append(`<div id="correlation-info"></div>`);
});
goldenLayout.registerComponent('lyphs', (container) => {
	container.getElement().css({
		'overflow-x': 'hidden',
		'overflow-y': 'scroll'
	}).append(`<div id="lyph-checkboxes"></div>`);
});
goldenLayout.registerComponent('clindices', (container) => {
	container.getElement().css({
		'overflow-x': 'hidden',
		'overflow-y': 'scroll'
	}).append(`<div id="clindex-checkboxes"></div>`);
});
goldenLayout.registerComponent('circuitboard', (container) => {
	container.getElement().css({
		position: 'relative',
		overflow: 'hidden'
	}).append(`<div id="circuitboard"></div>`);
});
goldenLayout.init();



circuitboard.plugin.do('start-brain-open', { if: true, after: ['tile-open', 'tile-hidden'] })
	.append('Tile.prototype.construct', function () {
		if (this.model.id === root) {
			this.open = true;
			this.visible = true;
		}
	});

circuitboard.plugin.do('start-tiles-loaded', { if: true, after: ['core'] })
	.append('Tile.prototype.construct', function () {
		this.populateInnerTilemap();
	});




function decimalToHex(d, padding) {
	var hex = Number(d).toString(16);
	while (hex.length < padding) { hex = "0" + hex }
	return hex;
}



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
	'tile-correlation-count-if-closed',
	'tile-glyphs'

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

	$('#circuitboard').circuitboard({
		model: getLyphModels('root', { root, port }),
		tileSpacing: 8,
		tilemapMargin: 8,
		weightWhenOpen: 4,
		//threeDCanvasElement: $('#three-d-canvas'),
		//threeDModels: {},
		//pathServerPort: port,
		initialTileVisibility: false
	}).circuitboard('instance').then(function (circuitboard) {


		console.info('circuitboard loaded');


		/* creating a clinical index checkbox */
		function createCheckbox(label) {
			let result = new KefirSignalHandler();
			let element, input;
			if (label) {
				element = $(`
					<label class="checkbox-bullet" title="${label}">
						<span><input type="checkbox"/></span>
						<span>${label}</span>
					</label>
				`);
				input = element.find('input');
			} else {
				element = input = $(`<input type="checkbox"/>`);
			}
			U.extend(result, {
				element, label, input,
				changes: element.asKefirStream('change')
			});
			result.newProperty('checked').plug(input.asKefirProperty('change', () => input.prop('checked')));
			result.p('checked').onValue((c) => { input.prop('checked', c) });
			return result;
		}


		/* creating a box representing a correlation */
		function correlationBox(correlation) {
			let result = $('<div>').css('borderColor', `#${decimalToHex(correlation.color, 6)}`);
			let pubmedId    = correlation.pubmed.id    === 'autogen' ?  24224044  : correlation.pubmed.id;
			let pubmedTitle = correlation.pubmed.title === 'autogen' ? '24224044' : correlation.pubmed.title;

			/* create correlation checkbox */
			let checkbox = createCheckbox();

			/* sync clindex visibility with checkbox checked-ness */
			checkbox.p('checked').plug(correlation.p('visible'));
			correlation.p('visible').plug(checkbox.p('checked'));

			/* add checkbox and header */
			result
				.append(checkbox.element)
				.append(`
					<div style="margin-bottom: 5px; font-weight: bold;">
						Correlation: <a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/${pubmedId}">${pubmedTitle}</a>
					</div>
				`);

			/* add located measures */
			for (let variable of correlation.variables) {
				if (variable.type === 'located measure') {
					result.append(`
						<div class="checkbox-bullet" title="${variable.quality} of ${variable['location name']}">
							<span>&#8226;</span>
							<span style="font-style: italic">${variable.quality} of ${variable['location name']}</span>
						</div>
					`);
				}
			}

			/* add clinical indices */
			for (let variable of correlation.variables) {
				if (variable.type === 'clinical index') {
					let clIndex = clIndices.get(variable.clindex);
					let clIndexCheckbox = createCheckbox(clIndex['clindex label']);
					clIndexCheckbox.p('checked').plug(clIndex.p('visible'));
					clIndex.p('visible').plug(clIndexCheckbox.p('checked'));
					result.append(clIndexCheckbox.element);
				}
			}

			return result;
		}


		/* propagating tile visibility and open-ness */
		circuitboard.newTiles.onValue((tile) => {
			setTimeout(() => {
				tile.p('visible').onValue((visible) => {
					if (visible) {
						let parent = tile.closestAncestorByType('Tile');
						if (parent) {
							parent.open = true;
							parent.visible = true;
						}
					} else {
						for (let child of tile.closestDescendantsByType('Tile')) {
							child.visible = false;
						}
					}
				});
			});
		});


		/* tracking correlations */
		let correlations = new Map();
		let newCorrelations = Kefir.bus();
		circuitboard.newTiles.onValue((tile) => {
			tile.model.then((model) => {
				for (let correlation of model.correlations) {
					if (!correlations.has(correlation.id)) {

						/* signal handling */
						let newCorrelation = new KefirSignalHandler();
						U.extend(newCorrelation, correlation);

						/* visibility */
						newCorrelation.newProperty('visible', { settable: true, initial: false });

						/* random color */
						newCorrelation.color = Math.floor(Math.random() * 0xffffff);

						/* register new correlation*/
						correlations.set(newCorrelation.id, newCorrelation);
						newCorrelations.emit(newCorrelation);

					}
				}
			});
		});


		///* printing the list of all visible correlations to the console */// TODO: comment out this debugging stuff
		//let visibleCorrelations = new Set();
		//let lastVisibleCorrelationCount = -1;
		//newCorrelations.onValue((correlation) => {
		//	correlation.p('visible').onValue((v) => {
		//		if (v) { visibleCorrelations.add(correlation) }
		//		else { visibleCorrelations.delete(correlation) }
		//		if (lastVisibleCorrelationCount !== visibleCorrelations.size) {
		//			console.log([...visibleCorrelations].map(vc => vc.id));
		//			lastVisibleCorrelationCount = visibleCorrelations.size;
		//		}
		//	});
		//});


		/* tracking located measures */
		let locatedMeasures = new Map();
		let newLocatedMeasures = Kefir.bus();
		let newCorrelationLocatedMeasures = Kefir.bus();
		newCorrelations.onValue((correlation) => {
			for (let variable of correlation.variables) {
				if (variable.type === 'located measure') {
					//const varKey = `${variable.quality} -- ${variable.location}`;
					const varKey = `${correlation.id} -- ${variable.quality} -- ${variable.location}`;
					if (!locatedMeasures.has(varKey)) {

						/* signal handling */
						let newLocatedMeasure = new KefirSignalHandler();
						U.extend(newLocatedMeasure, variable);

						/* visibility */
						newLocatedMeasure.newProperty('visible', { settable: true, initial: false });

						/* tile */
						newLocatedMeasure.tile = circuitboard.tile(newLocatedMeasure.location);

						/* correlations */
						// right now, every located measure has only one correlation, but this may change, so we're using a Set
						newLocatedMeasure.correlations = new Set();
						newLocatedMeasure.correlationVisibleCounter = 0;

						/* register new located measure */
						locatedMeasures.set(varKey, newLocatedMeasure);
						newLocatedMeasures.emit(newLocatedMeasure);

					}
					let locatedMeasure = locatedMeasures.get(varKey);
					locatedMeasure.correlations.add(correlation);
					newCorrelationLocatedMeasures.emit({ correlation, locatedMeasure });
				}
			}
		});


		/* establish relation between located measures and correlations */
		newCorrelationLocatedMeasures.onValue(({correlation, locatedMeasure}) => {
			correlation.p('visible').value(true).onValue(() => {
				locatedMeasure.correlationVisibleCounter += 1;
				locatedMeasure.visible = true;
				setTimeout(() => {
					correlation.p('visible').value(false).take(1).onValue(() => {
						locatedMeasure.correlationVisibleCounter -= 1;
						if (locatedMeasure.correlationVisibleCounter === 0) {
							locatedMeasure.visible = false;
						}
					});
				});
			});
			locatedMeasure.p('visible').value(false).onValue(() => {
				correlation.visible = false;
			});
		});


		/* glyphs for locate measures */
		newLocatedMeasures.onValue((locatedMeasure) => {
			locatedMeasure.tile.then((tile) => {

				/* the glyph */
				let glyph = tile.addGlyph({
					tooltipText: `${locatedMeasure.quality} of ${locatedMeasure['location name']} `
					           + `(correlation ${[...locatedMeasure.correlations].map(c => c.id)})`,
					shape: 'square'
				});

				/* the color of the glyph */
				// using the color of only one correlation (there is only one per located measure right now anyway)
				glyph.element.children()
					.css('fill',   '#' + decimalToHex([...locatedMeasure.correlations][0].color, 6))
					.css('stroke', '#' + decimalToHex([...locatedMeasure.correlations][0].color, 6));

				/* clicking on a glyph populates the info-box */
				glyph.element.children().click(() => {
					let infoBox = $('#correlation-info');
					infoBox.empty();
					for (let correlation of locatedMeasure.correlations) {
						infoBox.append(correlationBox(correlation));
					}
				});

				/* sync visibility between located measure and glyph */
				glyph.p('visible').plug(locatedMeasure.p('visible'));
				locatedMeasure.p('visible').plug(glyph.p('visible'));

				/* maintain (visible glyph ⇒ visible tile) */
				glyph.p('visible').value(true).onValue(() => {
					tile.visible = true;
				});
				tile.p('visible').value(false).onValue(() => {
					glyph.visible = false;
				});

			});
		});


		/* clinical indices */
		let clIndices = new Map();
		let newClIndices = Kefir.bus();
		let newCorrelationClIndices = Kefir.bus();
		newCorrelations.onValue((correlation) => {
			for (let variable of correlation.variables) {
				if (variable.type === 'clinical index' && variable.clindex !== "") {
					if (!clIndices.has(variable.clindex)) {

						/* signal handling */
						let newClIndex = new KefirSignalHandler();
						U.extend(newClIndex, variable);

						/* visibility */
						newClIndex.newProperty('visible', { settable: true, initial: false });

						/* correlations */
						newClIndex.correlations = new Set();
						newClIndex.correlationVisibleCounter = 0;

						/* register new clinical index */
						clIndices.set(newClIndex.clindex, newClIndex);
						newClIndices.emit(newClIndex);

					}
					let clIndex = clIndices.get(variable.clindex);
					clIndex.correlations.add(correlation);
					newCorrelationClIndices.emit({ clIndex, correlation });
				}
			}
			correlation.clIndexVisibleCounter = 0;
		});


		/* establish relation between clinical indices and correlations */
		newCorrelationClIndices.onValue(({clIndex, correlation}) => {
			clIndex.p('visible').value(true).onValue(() => {
				correlation.clIndexVisibleCounter += 1;
				correlation.visible = true;
				setTimeout(() => {
					clIndex.p('visible').value(false).take(1).onValue(() => {
						correlation.clIndexVisibleCounter -= 1;
						if (correlation.clIndexVisibleCounter === 0) {
							correlation.visible = false;
						}
					});
				});
			});
			correlation.p('visible').value(false).onValue(() => {
				clIndex.visible = false;
			});
		});


		/* clinical index checkboxes */
		let clIndexCBs = $('#clindex-checkboxes');
		let clIndexCheckboxes = new Map();
		newClIndices.onValue((clIndex) => {

			/* create and register checkbox */
			let checkbox = createCheckbox(clIndex['clindex label']);
			clIndexCheckboxes.set(clIndex.clindex, checkbox);

			/* sync clindex visibility with checkbox checked-ness */
			checkbox.p('checked').plug(clIndex.p('visible'));
			clIndex.p('visible').plug(checkbox.p('checked'));

			/* re-populate the checkbox-list */
			let list = [...clIndexCheckboxes].sort((a, b) => {
				if (a[1].label < b[1].label) { return -1 }
				if (a[1].label > b[1].label) { return  1 }
				return 0;
			});
			clIndexCBs.children().detach();
			for (let v of list) { clIndexCBs.append(v[1].element) }

		});


		/* lyph checkboxes */
		let lyphCBs = $('#lyph-checkboxes');
		circuitboard.newTiles.onValue((tile) => {
			tile.model.then((model) => {

				/* create checkbox */
				let checkbox = createCheckbox(model.name);
				checkbox.checked = (tile.model.id === root);

				/* sync tile visibility with checkbox checked-ness */
				checkbox.p('checked').plug(tile.p('visible'));
				tile.p('visible').plug(checkbox.p('checked'));

				/* render the checkbox subtree in HTML */
				let checkboxSubtree = tile._lyphCheckbox = $(`
					<div>
						<div class="checkbox-indenter" style="margin-left: 18px"></div>
					</div>
				`).prepend(checkbox.element);
				if (model.id === root) { lyphCBs.append(checkboxSubtree) }
				else { tile.closestAncestorByType('Tile')._lyphCheckbox.children('.checkbox-indenter').append(checkboxSubtree) }

			});
		});


		/* clicking tile correlation counters */
		circuitboard.newTiles.onValue((tile) => {
			setTimeout(() => {
				tile.event('correlation-counter-click').onValue(() => {

					let correlationsToShow = new Map();
					tile.traverseArtefactsByType('Tile', (descendant) => {
						for (let correlation of descendant.model.value().correlations) {
							if (!correlationsToShow.has(correlation.id)) {
								correlationsToShow.set(correlation.id, correlations.get(correlation.id));
							}
						}
					});

					let infoBox = $('#correlation-info');
					infoBox.empty();
					for (let [, correlation] of correlationsToShow) {
						infoBox.append(correlationBox(correlation));
					}

				});
			});
		});


	});

});
