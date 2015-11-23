/* styling */
import './example0.scss';


/* libraries */
import $ from 'expose?jQuery!jquery';
import P from 'bluebird';
import U from '../util/misc.es6.js';
import Kefir from '../util/kefir-and-eggs.es6.js';
import KefirSignalHandler from '../util/kefir-signal-handler.es6.js';
import {button} from '../util/codes.es6.js';
import {preloadAllResources, getResource_sync, getAllResources_sync} from './resources.es6.js';

import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';


/* load the circuitboard, model loader and plugins */
import circuitboard    from '../circuitboard-widget.es6.js';
import {getLyphModels} from './lyph-model.es6.js';
import '../new-features/positioning.es6.js';
import '../new-features/core.es6.js';
import '../new-features/3d.es6.js';
import '../new-features/tile-weight.es6.js';
import '../new-features/tile-open.es6.js';
import '../new-features/tile-click-to-open.es6.js';
import '../new-features/d3.es6.js';
import '../new-features/tile-glyphs.es6.js';




import './shims.es6.js';


/* fetch query parameters */
const root = U.getQueryVariable('root') ||  185;
const host = U.getQueryVariable('host') || 'open-physiology.org'; // alternative; 'open-physiology.org'
const port = U.getQueryVariable('port') || '8888';



/* golden layout */
{
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
					componentName: 'selected-correlations',
					title: 'Selected Correlations',
					height: 0.2
				}, {
					type: 'component',
					componentName: 'lyphs',
					title: 'Lyphs',
					height: 0.4
				}, {
					type: 'component',
					componentName: 'correlations',
					title: 'Correlations',
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
	goldenLayout.registerComponent('selected-correlations', (container) => {
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
	goldenLayout.registerComponent('correlations', (container) => {
		container.getElement().css({
			'overflow-x': 'hidden',
			'overflow-y': 'scroll'
		}).append(`<div id="correlations"></div>`);
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
}


/* a promise for all clinical indices */
let allClIndices = P.resolve($.ajax({
	url: `http://${host}:${port}/clinicalIndices`,
	dataType: 'jsonp'
})).get('results').error((err) => {
	console.error("There seems to be something wrong with the server.", err);
});


///* start the brain tile opened up */ // TODO do we want this back?
//circuitboard.plugin.do('start-brain-open', { if: true, after: ['tile-open'] })
//	.append('Tile.prototype.construct', function () {
//		if (this.model.id === root) {
//			this.open = true;
//			this.shown = true;
//		}
//	});


/* load all tiles immediately */ // TODO do we want this back?
// this does it recursively, which implies many server queries;
// TODO: arrange a single command for this
circuitboard.plugin.do('start-tiles-loaded', { if: true, after: ['core'] })
	.append('Tile.prototype.construct', function () {
		this.populateInnerTilemap();
	});


/* utility functions */
function decimalToHex(d, padding) {
	var hex = Number(d).toString(16);
	while (hex.length < padding) { hex = "0" + hex }
	return hex;
}
function sortElements(parentElement, entityList, sortKey, element) {
	let list = [...entityList].sort((a, b) => {
		if (sortKey(a) < sortKey(b)) { return -1 }
		if (sortKey(a) > sortKey(b)) { return  1 }
		return 0;
	});
	parentElement.children().detach();
	for (let v of list) { parentElement.append(element(v)) }
}


/* select plugins to activate them  (note that these must already be *loaded* at this point) */
circuitboard.plugin.select(
	'tile-open',
	'tile-click-to-open',
	'tile-glyphs'
);


$(document).ready(() => {


	let X = {
		correlations:    {},
		clinicalIndices: {},
		locatedMeasures: {},
		lyphTemplates:   {},
		publications:    {}
	};


	preloadAllResources({host, port}).then(() => $('#circuitboard').circuitboard({
		model:          getLyphModels('root', { root, port }),
		//fetchPaths:     fetchPathsFn({ port }),
		tileSpacing:    6,
		tilemapMargin:  8,
		weightWhenOpen: 4,
		initialTileVisibility: false,
		initialVertexVisibility: false
	}).circuitboard('instance')).then(function (circuitboard) {


		console.info('circuitboard loaded');


		/* completely preparing the resources in a synchronous way */
		for (let type of Object.keys(X)) {
			for (let v of getAllResources_sync(type)) {
				let newV = new KefirSignalHandler();
				U.extend(newV, v);
				newV.newProperty('shown', { settable: true, initial: false });
				X[type][v.id] = newV;
			}
		}
		for (let correlation of Object.values(X.correlations)) {
			correlation.publication = X.publications[correlation.publication];
			correlation.locatedMeasures = correlation.locatedMeasures.map(id => X.locatedMeasures[id]);
			correlation.clinicalIndices = correlation.clinicalIndices.map(id => X.clinicalIndices[id]);
			correlation.color = Math.floor(Math.random() * 0xffffff);
			correlation.clIndexVisibleCounter = 0;
		}
		for (let clinicalIndex of Object.values(X.clinicalIndices)) {
			clinicalIndex.correlations = clinicalIndex.correlations.map(id => X.correlations[id]);
		}
		for (let locatedMeasure of Object.values(X.locatedMeasures)) {
			locatedMeasure.lyphTemplate = X.lyphTemplates[locatedMeasure.lyphTemplate];
			locatedMeasure.correlations = locatedMeasure.correlations.map(id => X.correlations[id]);
			locatedMeasure.tile = circuitboard.tile(locatedMeasure.lyphTemplate.id);
			locatedMeasure.correlationVisibleCounter = 0;
		}
		for (let lyphTemplate of Object.values(X.lyphTemplates)) {
			lyphTemplate.locatedMeasures = lyphTemplate.locatedMeasures.map(id => X.locatedMeasures[id]);
			lyphTemplate.parents = lyphTemplate.parents.map(id => X.lyphTemplates[id]);
			lyphTemplate.children = lyphTemplate.children.map(id => X.lyphTemplates[id]);

			/* propagate visibility in the hierarchy */
			if (lyphTemplate.parents.length > 0) {
				lyphTemplate.p('shown').plug(lyphTemplate.parents[0].p('shown').value(false));
				lyphTemplate.parents[0].p('shown').plug(lyphTemplate.p('shown').value(true));
			}

			/* sync lyphTemplate visibility with tile visibility */
			circuitboard.tile(lyphTemplate.id).then((tile) => {
				tile.p('shown').plug(lyphTemplate.p('shown'));
				lyphTemplate.p('shown').plug(tile.p('shown'));
			});
		}
		for (let publication of Object.values(X.publications)) {
			publication.correlations = publication.correlations.map(id => X.correlations[id]);
		}


		const allReachableLyphTemplates = (cb) => {
			const recurse = (lt) => {
				cb(lt);
				for (let child of lt.children) {
					recurse(child);
				}
			};
			recurse(X.lyphTemplates[root]);
		};





		/* the new way of building the page with synchronously loaded resources */
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////


		/* propagating tile visibility to parent-open-ness */
		circuitboard.newTiles.onValue((tile) => {
			setTimeout(() => {
				let parent = tile.closestAncestorByType('Tile');
				if (parent) {
					tile.p('shown').value(true).onValue(() => {
						parent.open = true;
					});
					parent.p('open').value(false).onValue(() => {
						tile.shown = false;
					});
				}
			});
		});

		/* creating a checkbox */
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
			let result = { correlation };

			result.element = $('<div>')
				.addClass('correlation-box')
				.css('borderColor', `#${decimalToHex(correlation.color, 6)}`);

			/* create correlation checkbox */
			let checkbox = createCheckbox();

			/* sync clindex visibility with checkbox checked-ness */
			checkbox.p('checked').plug(correlation.p('shown'));
			correlation.p('shown').plug(checkbox.p('checked'));

			/* add checkbox and header */
			result.element
				.append(checkbox.element)
				.append(`
					<div style="margin-bottom: 5px; font-weight: bold;">
						<a target="_blank" href="${correlation.publication.uri}">${correlation.publication.title}</a>
					</div>
				`);

			/* add located measures */
			for (let locatedMeasure of correlation.locatedMeasures) {
				result.element.append(`
					<div class="checkbox-bullet" title="${locatedMeasure.quality} of ${locatedMeasure.lyphTemplate.name}">
						<span>&#8226;</span>
						<span style="font-style: italic">${locatedMeasure.quality} of ${locatedMeasure.lyphTemplate.name}</span>
					</div>
				`);
			}

			/* add clinical indices */
			for (let clinicalIndex of correlation.clinicalIndices) {
				let clIndexCheckbox = createCheckbox(clinicalIndex.title);
				clIndexCheckbox.p('checked').plug(clinicalIndex.p('shown'));
				clinicalIndex.p('shown').plug(clIndexCheckbox.p('checked'));
				result.element.append(clIndexCheckbox.element);
			}

			return result;
		}

		/* establish relation between located measures and correlations */
		for (let correlation of Object.values(X.correlations)) {
			for (let locatedMeasure of correlation.locatedMeasures) {
				correlation.p('shown').value(true).onValue(() => {
					locatedMeasure.correlationVisibleCounter += 1;
					locatedMeasure.shown = true;
					setTimeout(() => {
						correlation.p('shown').value(false).take(1).onValue(() => {
							locatedMeasure.correlationVisibleCounter -= 1;
							if (locatedMeasure.correlationVisibleCounter === 0) {
								locatedMeasure.shown = false;
							}
						});
					});
				});
				locatedMeasure.p('shown').value(false).onValue(() => {
					correlation.shown = false;
				});
			}
		}

		/* glyphs for located measures */
		for (let locatedMeasure of Object.values(X.locatedMeasures)) {
			locatedMeasure.tile.tap(tile => tile.afterConstruct).then((tile) => {
				/* the glyph */
				let glyph = tile.addGlyph({
					tooltipText: `${locatedMeasure.quality} of ${locatedMeasure.lyphTemplate.name} `
					+ `(correlation ${[...locatedMeasure.correlations].map(c => c.id).join(', ')})`,
					shape: 'square',
					color: locatedMeasure.correlations[0].color
				});

				/* clicking on a glyph populates the info-box */
				glyph.event('click').onValue(() => {
					let infoBox = $('#correlation-info');
					infoBox.empty();
					for (let correlation of locatedMeasure.correlations) {
						infoBox.append(correlationBox(correlation).element);
					}
				});

				/* sync visibility between located measure and glyph */
				glyph.p('shown').plug(locatedMeasure.p('shown'));
				locatedMeasure.p('shown').plug(glyph.p('shown'));

				/* maintain (visible glyph ⇒ visible tile) */
				glyph.p('shown').value(true).onValue(() => {
					tile.shown = true;
				});
				tile.p('shown').value(false).onValue(() => {
					glyph.shown = false;
				});

			});
		}

		/* establish relation between clinical indices and correlations */
		for (let correlation of Object.values(X.correlations)) {
			for (let clinicalIndex of correlation.clinicalIndices) {
				clinicalIndex.p('shown').value(true).onValue(() => {
					correlation.clIndexVisibleCounter += 1;
					correlation.shown = true;
					setTimeout(() => {
						clinicalIndex.p('shown').value(false).take(1).onValue(() => {
							correlation.clIndexVisibleCounter -= 1;
							if (correlation.clIndexVisibleCounter === 0) {
								correlation.shown = false;
							}
						});
					});
				});
				correlation.p('shown').value(false).onValue(() => {
					clinicalIndex.shown = false;
				});
			}
		}

		/* clinical index checkboxes */
		let clIndexCheckboxesElement = $('#clindex-checkboxes');
		let clIndexCheckboxes = new Map();
		for (let clinicalIndex of Object.values(X.clinicalIndices)) {
			/* create and register checkbox */
			let checkbox = createCheckbox(clinicalIndex.title);
			clIndexCheckboxes.set(clinicalIndex.id, checkbox);

			/* sync clindex visibility with checkbox checked-ness */
			checkbox.p('checked').plug(clinicalIndex.p('shown'));
			clinicalIndex.p('shown').plug(checkbox.p('checked'));

			/* hide checkbox if there are no connected correlations */
			if (clinicalIndex.correlations.length > 0) {
				checkbox.input.css('visibility', 'visible');
			} else {
				checkbox.input.css('visibility', 'hidden');
				checkbox.input.prop('disabled', true);
			}

			/* sort the checkbox-list */
			sortElements(clIndexCheckboxesElement, clIndexCheckboxes, cb => cb[1].title, cb => cb[1].element);
		}

		/* lyph checkboxes */
		const giveLyphTemplateCheckbox = (lyphTemplate) => {

			/* create checkbox */
			let checkbox = createCheckbox(lyphTemplate.name);
			checkbox.checked = (lyphTemplate.id === root);

			/* sync lyphTemplate visibility with checkbox checked-ness */
			checkbox.p('checked').plug(lyphTemplate.p('shown'));
			lyphTemplate.p('shown').plug(checkbox.p('checked'));

			/* render the checkbox subtree in HTML */
			lyphTemplate._checkboxTreeElement = $(`
				<div>
					<div class="checkbox-indenter" style="margin-left: 18px"></div>
				</div>
			`).prepend(checkbox.element);
			for (let child of lyphTemplate.children) {
				lyphTemplate._checkboxTreeElement.children('.checkbox-indenter')
					.append(giveLyphTemplateCheckbox(child));
			}

			/* return the HTML subtree */
			return lyphTemplate._checkboxTreeElement;

		};
		$('#lyph-checkboxes').append(giveLyphTemplateCheckbox(X.lyphTemplates[root]));


		/* all correlations */
		let correlationBoxes = [];
		let correlationTab = $('#correlations');
		for (let correlation of Object.values(X.correlations)) {
			correlationBoxes.push(correlationBox(correlation));
			sortElements(correlationTab, correlationBoxes, b => b.correlation.publication.title, b => b.element);
		}

		/* clicking tile correlation counters */
		const recursiveCorrelations = (lyphTemplate) => {
			if (!lyphTemplate.recursiveCorrelations) {
				let result = new Set();
				for (let child of lyphTemplate.children) {
					let childResult = recursiveCorrelations(child);
					for (let corr of childResult) {
						result.add(corr);
					}
				}
				for (let lm of lyphTemplate.locatedMeasures) {
					for (let corr of lm.correlations) {
						result.add(corr);
					}
				}
				lyphTemplate.recursiveCorrelations = result;
			}
			return lyphTemplate.recursiveCorrelations;
		};


		allReachableLyphTemplates((lyphTemplate) => {
			let correlationsToShow = recursiveCorrelations(lyphTemplate);
			circuitboard.tile(lyphTemplate.id).tap(t => t.afterConstruct).then((tile) => {
				tile.counter = correlationsToShow.size;
				tile.event('correlation-counter-click').onValue(() => {

					let infoBox = $('#correlation-info');
					infoBox.empty();
					let boxes = [];
					for (let correlation of correlationsToShow) {
						boxes.push(correlationBox(correlation));
					}
					sortElements(infoBox, boxes, b => b.correlation.publication.title, b => b.element);

				});
			});
		});



		//circuitboard.newTiles.onValue((tile) => {
		//	setTimeout(() => {
		//		tile.event('correlation-counter-click').onValue(() => {
		//
		//			let correlationsToShow = new Map();
		//			tile.traverseArtefactsByType('Tile', (descendant) => {
		//				for (let correlation of X.lyphTemplates[descendant.model.id].correlations) {
		//					if (!correlationsToShow.has(correlation.id)) {
		//						correlationsToShow.set(correlation.id, correlation);
		//					}
		//				}
		//			});
		//
		//			let infoBox = $('#correlation-info');
		//			infoBox.empty();
		//			let boxes = [];
		//			for (let [, correlation] of correlationsToShow) {
		//				boxes.push(correlationBox(correlation));
		//			}
		//			sortElements(infoBox, boxes, b => b.correlation.publication.title, b => b.element);
		//
		//		});
		//	});
		//});





		//////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////














	});

});
