import $     from 'jquery';
import P     from 'bluebird';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import defer from '../util/defer.es6.js';

import THREE from 'expose?THREE!three-js';
import 'script!../util/Projector.js';
import 'script!threex.domevents';
const THREEx = window.THREEx;

import TWEEN from 'tweenjs';


/* the core plugin for pure-3D circuitboards */
var plugin = $.circuitboard.plugin.do('core-3d');


/* Circuitboard */
plugin.modify('Circuitboard.prototype')
	.add('construct', function () {

		this._p_circuitboardCore_tilesByModelId = {};
		this.newTiles = Kefir.bus();


		// TODO: check browser support for 3D


		this.newProperty('canvasSize').plug(Kefir.merge([
			Kefir.once(),
			( this.options.resizeEvent || $(window).asKefirStream('resize') )
		]).map(() => ({
			height: this.element.height(),
			width:  this.element.width()
		})));

		this.newProperty('size').plug(this.property('canvasSize'));
		// TODO: allow 'size' to differ from 'canvasSize' by specifying margins


		/* the render event that will be emitted at every animation frame */
		this.newEvent('3d-render').plug(Kefir.animationFrames());


		/* scene */
		this.scene3D = new THREE.Scene();

		/* camera */
		this.camera3D = new THREE.PerspectiveCamera(60, this.canvasSize.width / this.canvasSize.height, 1, 10000);
		this.p('canvasSize').onValue((canvasSize) => {
			this.camera3D.aspect = canvasSize.width / canvasSize.height;
			this.camera3D.lookAt(new THREE.Vector3(0, 0, 0));
			if (this.camera3D.position.z === 0) { this.camera3D.position.z = 1 }
			this.camera3D.position.normalize()
				.multiplyScalar(0.5 * canvasSize.height / Math.tan(0.5 * THREE.Math.degToRad(this.camera3D.fov)));
			this.camera3D.updateProjectionMatrix();
		});

		/* lighting */
		this.scene3D.add(new THREE.AmbientLight(0xff0000));

		/* renderer */
		(() => {
			this.renderer3D = new THREE.WebGLRenderer({ alpha: true, antialias: true });
			this.element.append(this.renderer3D.domElement);
			this.renderer3D.sortObjects = false;
			this.renderer3D.shadowMapEnabled = true;
			this.renderer3D.shadowMapSoft = true;
			this.p('canvasSize').onValue(({width, height}) => {
				this.renderer3D.setSize(width, height);
			});
			this.event('3d-render').onValue(() => {
				this.renderer3D.render(this.scene3D, this.camera3D);
			});
		})();

		/* dom event handler */
		this.eventHandler3D = new THREEx.DomEvents(this.camera3D, this.renderer3D.domElement);

		/*  the object containing all 3D things co-located with the circuitboard */
		this.object3D = new THREE.Object3D();
		this.scene3D.add(this.object3D);
		this.p('size').onValue((size) => {
			this.object3D.position.x = -0.5 * size.width;
			this.object3D.position.y = -0.5 * size.height;
		});
		// TODO: synchronize this kind of size-change handler with the '3d-render' signal?


		/* create the root tilemap */
		const div = $('<div/>');
		div.tilemap({ // TODO: tilemaps are not widgets anymore, but they still are artefacts
			model:  this.options.model,
			parent: this,
			tileDepth: 1
		}).tilemap('instance').then((tilemap) => {
			tilemap.p('size').plug(this.p('size'));
			tilemap.position = { x: 0, y: 0 };
			// TODO: allow for margins between circuitboard and tilemap
		});



	}).add('allTiles', function () {

		var tiles = {};
		Object.keys(this._p_circuitboardCore_tilesByModelId).forEach((id) => {
			tiles[id] = this._p_circuitboardCore_tilesByModelId[id].promise;
		});
		return tiles;

	}).add('tile', function (tileSelector) {

		return U.getDef(this._p_circuitboardCore_tilesByModelId, tileSelector, defer).promise;

	}).add('_registerTile', function _registerTile(tile) {

		// called by the Tile constructor

		U.getDef(this._p_circuitboardCore_tilesByModelId, tile.model.id, defer).resolve(tile);

		this.newTiles.emit(tile);

	});


/* Tilemap */
plugin.modify('Tilemap.prototype')
	.add('refreshTiles', function () {

		/* sanity check */
		U.assert(U.isDefined(this.model),
			`An ApiNATOMY tilemap should have a model.`);

		/* render the new tilemap (through a promise chain, returning the final promise) */
		return P.resolve(this.model).then(model => model.getModels(model.getChildIds())).map(a=>a).then((childModels) => {

			const spacing = U.defOr(this.options.tileSpacing, this.circuitboard.options.tileSpacing);

			const tileCount        = childModels.length;
			const rowCount         = Math.floor(Math.sqrt(tileCount));
			const colCount         = Math.ceil(tileCount / rowCount);

			/* gather tiles */
			let tilesP = [];
			for (let i = 0; i < tileCount; ++i) {
				tilesP.push($('<div/>').tile({ // TODO: tiles are not widgets anymore, but they still are artefacts
					model: childModels[i],
					parent: this,
					tileDepth: this.options.tileDepth
				}).tile('instance'));
			}

			/* resize tiles based on tilemap resize */
			P.resolve(tilesP).map(a=>a).tap((tiles) => {
				const weightProps = tiles.map(tile => tile.p('weight'));
				Kefir.combine([this.p('size'), ...weightProps]).onValue(([{width: totalWidth, height: totalHeight}]) => {

					// TODO: much of the following can be moved out of the kefir stream,
					//     : and then modified based on specific weight changes
					let totalWeight = 0;
					let weightPerRow = [];
					let accumulatedWeightBeforeRow = [];
					for (let row = 0, i = 0; row < rowCount; ++row) {
						weightPerRow.push(0);
						for (let col = 0; col < colCount && i < tileCount; ++col, ++i) {
							weightPerRow[row] += tiles[i].weight;
							totalWeight       += tiles[i].weight;
						}
						accumulatedWeightBeforeRow.push(row === 0 ? 0 : (accumulatedWeightBeforeRow[row-1] + weightPerRow[row-1]));
					}

					for (let row = 0, i = 0; row < rowCount; ++row) {
						const rowHeight = (totalHeight - spacing) * weightPerRow[row] / totalWeight - spacing;
						const rowY = totalHeight - ((totalHeight - spacing) * accumulatedWeightBeforeRow[row] / totalWeight + spacing) - rowHeight;
						             // going from top to bottom, reversing the y-axis
						let accumulatedWeightInsideRow = 0;
						for (let col = 0; col < colCount && i < tileCount; ++col, ++i) {
							const tile = tiles[i];
							tile.size = {
								height: rowHeight,
								width:  (totalWidth - spacing)  * tile.weight / weightPerRow[row] - spacing
							};
							tile.position = {
								y: rowY,
								x: (totalWidth - spacing) * (accumulatedWeightInsideRow / weightPerRow[row]) + spacing
							};
							accumulatedWeightInsideRow += tile.weight;
						}
					}


					//for (let i = 0; i < tileCount; ++i) {
					//	const tile = tiles[i];
					//	const row = Math.floor(i / colCount);
					//	const col = i % colCount;
					//	const rowTileCount = (row === rowCount - 1) ? lastRowTileCount : colCount;
					//	const w = width - spacing;
					//	const h = height - spacing;
					//	const weight = tile.weight;
					//
					//	console.log(weight);
					//
					//	tile.size = {
					//		height: h / tileCount * rowTileCount - spacing,
					//		width: w / rowTileCount - spacing
					//	};
					//	tile.position = {
					//		x: w * (col / rowTileCount) + spacing,
					//		y: height - (h * row * colCount / tileCount + spacing) - tile.size.height
					//		// going from top to bottom, reversing the y-axis
					//	};
					//}

				});
			});




		});


	}).add('construct', function () {

		this.newProperty('position', {
			initial: { x: 0, y: 0 },
			isEqual: (a, b) => (a.x === b.x && a.y === b.y)
		});

		this.newProperty('size', {
			initial: { width: 0, height: 0 },
			isEqual: (a, b) => (a.width === b.width && a.height === b.height)
		});

		this.object3D = new THREE.Object3D();
		this.parent.object3D.add(this.object3D);

		this._p_tilemapCore_tiles = null;
		Object.defineProperty(this, 'tiles', { get: () => this._p_tilemapCore_tiles });
		this.refreshTiles();
	});


/* Tile */
plugin.modify('Tile.prototype')
	.add('populateInnerTilemap', function populateInnerTilemap() {

		/* create sub-tilemap */
		if (!this._p_tileCore_tilemap) {
			const div = $('<div/>');
			this._p_tileCore_tilemap = div.tilemap({ // TODO: tilemaps are not widgets anymore, but they still are artefacts
				model:  this.options.model,
				parent: this,
				tileDepth: this.options.tileDepth + 1
			}).tilemap('instance').tap((tilemap) => {
				tilemap.p('size').plug(this.p('size'));
				tilemap.position = { x: 0, y: 0 }; // TODO: maybe remove tilemap positions? They're always (0, 0)?
			});
		}
		return this._p_tileCore_tilemap;

	}).add('construct', function () {

		this._p_tileCore_tilemap = null;


		this.newProperty('position', {
			initial: { x: 0, y: 0 },
			isEqual: (a, b) => (a.x === b.x && a.y === b.y)
		});

		this.newProperty('size', {
			initial: { width: 0, height: 0 },
			isEqual: (a, b) => (a.width === b.width && a.height === b.height)
		});


		/* the local object3D of the tile */
		this.object3D = new THREE.Object3D();
		this.parent.object3D.add(this.object3D);
		this.p('position').onValue(({x, y}) => {
			this.object3D.position.x = x;
			this.object3D.position.y = y;
		});


		/* the rectangle representing the tile */
		(() => {
			let geometry = new THREE.PlaneGeometry(1, 1);
			let material = new THREE.MeshBasicMaterial({
				color: this.options.tileDepth % 2 ? 0xcccccc : 0x777777
			});
			let mesh = new THREE.Mesh(geometry, material);
			mesh.position.z = this.options.tileDepth;
			this.object3D.add(mesh);
			this.p('size').onValue(({width, height}) => {
				mesh.scale.x = width;
				mesh.scale.y = height;
				mesh.position.x = 0.5 * width;
				mesh.position.y = 0.5 * height;
			});

			this.circuitboard.eventHandler3D.addEventListener(mesh, 'click', (e) => {
				console.log(`Tile '${this.model.id}' clicked!`, e);

				new TWEEN.Tween(this)
					.to({ weight: this.weight === 1 ? 8 : 1 }, 500)
					.easing(TWEEN.Easing.Cubic.InOut)
				.start();

				// TODO: move this logic out into another delta

			});

			this.circuitboard.event('3d-render').onValue(() => {
				TWEEN.update();
			});

		})();


		this.circuitboard._registerTile(this);


		// TODO; remove following test:
		if (this.model.id === '161') {
			this.populateInnerTilemap();
		}


		// TODO: move to a different delta
		this.newProperty('weight', { initial: 1 });

	});

