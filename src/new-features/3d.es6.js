/* general imports */
import $     from 'jquery';
import TWEEN from 'tweenjs';
import Kefir from '../util/kefir-and-eggs.es6.js';


/* 3D imports */
import THREE    from 'expose?THREE!three-js';
import detector from '../util/3d-detector.es6.js';
import 'script!../util/fonts/helvetiker_regular.typeface.js';
import 'script!../util/Projector.js';
import 'script!../util/my-threex.domevents.js'; // (modified version)
const THREEx = window.THREEx;


/* the plugin */
var plugin = $.circuitboard.plugin.do('3d', { requires: ['core', 'positioning'], if: true });


/* Circuitboard */
plugin.modify('Circuitboard.prototype')
	.append('construct', function () {

		/* check 3D support */
		detector.assert3DSupport();

		/* the render event that will be emitted at every animation frame */
		this.newEvent('3d-render').plug(Kefir.animationFrames());

		/* update TWEEN on render */
		this.event('3d-render').onValue(TWEEN.update);

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
		this.scene3D.add(new THREE.AmbientLight(0xffffff));

		/* renderer */
		{
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
		}

		/* dom event handling */
		this.eventHandler3D = new THREEx.DomEvents(this.camera3D, this.renderer3D.domElement);

		/*  the object containing all 3D things co-located with the circuitboard */
		this.object3D = new THREE.Object3D();
		this.scene3D.add(this.object3D);
		this.p('size').onValue((size) => {
			this.object3D.position.x = -0.5 * size.width;
			this.object3D.position.y = -0.5 * size.height;
		});

		/* creating a mesh encompassing the circuitboard, for calculating intersections and such */
		{
			this.mesh3D  = new THREE.Mesh(
				new THREE.PlaneBufferGeometry(1, 1),
				new THREE.MeshBasicMaterial({
					transparent: true,
					opacity:     0.0
				})
			);
			this.object3D.add(this.mesh3D);

			/* auto-sizing the rectangle */
			this.p('size').onValue(({width, height}) => {
				this.mesh3D.scale.x    = width;
				this.mesh3D.scale.y    = height;
				this.mesh3D.position.x = 0.5 * width;
				this.mesh3D.position.y = 0.5 * height;
			});
		}


		/* 'shown' property */// TODO: move to other delta
		this.newProperty('shown', { initial: true });
		this.p('shown').onValue((shown) => {
			this.object3D.skipDomEvents = !shown;
			this.scene3D[shown ? 'add' : 'remove'](this.object3D);
		});


	});


/* Tilemap */
plugin.modify('Tilemap.prototype')
	.append('construct', function () {

		this.object3D = new THREE.Object3D();

		this.parent.afterConstruct.then(() => {
			this.parent.object3D.add(this.object3D);
		});


		/* 'shown' property */// TODO: move to other delta
		this.newProperty('shown', { initial: true }); // this is controlled by the 'tile-open' feature
		this.parent.afterConstruct.then(() => {
			this.p('shown').onValue((shown) => {
				this.object3D.skipDomEvents = !shown;
				this.parent.object3D[shown ? 'add' : 'remove'](this.object3D);
			});
		});

	});


/* Tile */
plugin.modify('Tile.prototype')
	.append('construct', function () {

		/* prepare the event handler helper */
		const eventHandler = this.circuitboard.eventHandler3D;

		/* the local object3D of the tile */
		this.object3D = new THREE.Object3D();
		this.object3D.name = "Tile#object3D";
		this.p('position').onValue(({x, y}) => {
			this.object3D.position.x = x;
			this.object3D.position.y = y;
		});

		/* 'shown' property */// TODO: move to other delta
		this.newProperty('shown', { initial: (this.circuitboard.options.initialTileVisibility !== false) });//.plug(this.parent.p('shown')); // TODO: is this needed?
		this.parent.afterConstruct.then(() => {
			this.p('shown').onValue((shown) => {
				this.object3D.skipDomEvents = !shown;
				this.parent.object3D[shown ? 'add' : 'remove'](this.object3D);
			});
		});

		/* create the events but do not bind them yet */
		for (let event of ['click', 'dblclick', 'mouseup', 'mousedown', 'mouseover', 'mouseout']) {
			this.newEvent(event);
		}
		this.newEvent('correlation-counter-click');
		this.newProperty('counter', { initial: null });

		/* wait with the rest of this until the tile is first shown */
		Kefir.combine([this.p('shown').value(true), this.p('counter').filter(v=>v !== null)]).take(1).onValue(() => {

			/* the rectangle representing the tile, and recipient of mouse events */
			{
				/* creating the tile mesh */
				this.mesh3D = new THREE.Mesh(
					new THREE.PlaneBufferGeometry(1, 1),
					new THREE.MeshBasicMaterial({
						color: this.options.tileDepth % 2 ? 0xcccccc : 0x777777,
						polygonOffset: true,
						polygonOffsetUnits: 1,
						polygonOffsetFactor: -this.options.tileDepth
					}) // TODO: make configurable / dynamic
				);
				this.mesh3D.name = "Tile#mesh3D";
				this.object3D.add(this.mesh3D);


				/* borders around the tile mesh */
				this.meshBorders3D = new THREE.Line(
					(() => {
						let geo = new THREE.Geometry();
						geo.vertices.push(
							new THREE.Vector3(-0.5, -0.5),
							new THREE.Vector3(0.5, -0.5),
							new THREE.Vector3(0.5, 0.5),
							new THREE.Vector3(-0.5, 0.5),
							new THREE.Vector3(-0.5, -0.5)
						);
						return geo;
					})(),
					new THREE.LineBasicMaterial({
						color: 0x000000, // TODO: customizable border color
						lineWidth: 1,
						polygonOffset: true,
						polygonOffsetUnits: 1,
						polygonOffsetFactor: -this.options.tileDepth
					})
				);
				this.meshBorders3D.name = "Tile#meshBorders3D";
				this.object3D.add(this.meshBorders3D);

				/* auto-sizing the rectangle and borders */
				this.p('size').onValue(({width, height}) => {
					if (width > 0 && height > 0) {
						this.mesh3D.visible = true;
						this.meshBorders3D.visible = true;
						this.mesh3D.scale.x = width;
						this.mesh3D.scale.y = height;
						this.mesh3D.position.x = 0.5 * width;
						this.mesh3D.position.y = 0.5 * height;
						this.meshBorders3D.scale.x = width;
						this.meshBorders3D.scale.y = height;
						this.meshBorders3D.position.x = 0.5 * width;
						this.meshBorders3D.position.y = 0.5 * height;
					} else {
						this.mesh3D.visible = false;
						this.meshBorders3D.visible = false;
					}
				});

				/* defining dom-like events on this tile */
				for (let event of ['click', 'dblclick', 'mouseup', 'mousedown', 'mouseover', 'mouseout']) {
					this.event(event).plug(Kefir.fromBinder((emitter) => {
						eventHandler.addEventListener(this.mesh3D, event, emitter.emit);
						return () => {
							eventHandler.removeEventListener(this.mesh3D, event, emitter.emit);
						};
					}));
				}
			}

			/* separator between header and body */
			{
				let separator = new THREE.Line(
					(() => {
						let geo = new THREE.Geometry();
						geo.vertices.push(
							new THREE.Vector3(0, 0),
							new THREE.Vector3(1, 0)
						);
						return geo;
					})(),
					new THREE.LineBasicMaterial({
						color: 0x000000, // TODO: customizable border color
						lineWidth: 1
					})
				);
				separator.name = "separator";
				this.object3D.add(separator);

				/* auto-positioning the separator */
				Kefir.combine([this.p('size'), this.p('headerTilemapSeparator')]).onValue(([{width, height}, y]) => {
					let hasChildren = (this.model.getChildIds().length > 0); // TODO: this should be about tiles, not children in the model
					if (!hasChildren) { y = 0 }
					let headerHeight = Math.max((1 - y) * height, 24);
					separator.scale.x = width;
					separator.position.x = 0;
					separator.position.y = height - headerHeight;
				});
			}

			/* the header of the tile, printing the name, etc. */
			{
				/* the object representing the tile header */
				this.header3D = new THREE.Object3D();
				this.header3D.name = "Tile#header3D";
				this.object3D.add(this.header3D);
				this.p('headerPosition').onValue(({x, y}) => {
					this.header3D.position.x = x;
					this.header3D.position.y = y;
				});

				/* creating the name geometry */
				let textShapes = THREE.FontUtils.generateShapes(this.model.name, {
					font: 'helvetiker',
					size: 150
				});
				let textGeometry = new THREE.ShapeGeometry(textShapes);

				/* one-time scaling and positioning of text to unit size */
				textGeometry.computeBoundingBox();
				let {min, max} = textGeometry.boundingBox;
				let oWidth = max.x - min.x;
				let oHeight = max.y - min.y;
				let factor1 = oWidth < oHeight ? 1 / oHeight : 1 / oWidth;
				textGeometry.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(-min.x, -min.y, 0)));
				textGeometry.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(factor1, factor1, 1)));

				/* creating the name mesh */
				this.nameMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
					color: this.options.tileDepth % 2 ? 0x777777 : 0xCCCCCC,
					polygonOffset: true,
					polygonOffsetUnits: 1,
					polygonOffsetFactor: -this.options.tileDepth - 1
				}));
				this.nameMesh.name = "Tile#nameMesh";
				this.header3D.add(this.nameMesh);

				/* auto-sizing the text */
				this.p('headerSize').onValue(({width, height}) => {
					let padding = Math.min(width, height) / 20;
					padding = Math.max(padding, 4);
					width -= 2 * padding;
					height -= 2 * padding;
					let factor2 = (width / oWidth < height / oHeight ? width : height * oWidth / oHeight);
					this.nameMesh.scale.x = factor2;
					this.nameMesh.scale.y = factor2;
					this.nameMesh.position.x = 0.5 * (width - oWidth * factor1 * factor2) + padding;
					this.nameMesh.position.y = 0.5 * (height - oHeight * factor1 * factor2) + padding;
				});

			}

			/* correlation counter */ // TODO: this SHOULD NOT BE IN THIS FILE!
			{
				/* the object representing the tile header */
				this.counter3D = new THREE.Object3D();
				this.counter3D.name = "Tile#counter3D";
				//this.object3D.add(this.counter3D);


				/* hide when the tile is open */
				this.p('open').onValue((open) => {
					this.object3D[open ? 'remove' : 'add'](this.counter3D);
				});


				/* creating the name geometry */
				let textShapes = THREE.FontUtils.generateShapes('' + this.counter, {
					font: 'helvetiker',
					size: 12
				});
				let textGeometry = new THREE.ShapeGeometry(textShapes);

				/* getting the counter width / height */
				textGeometry.computeBoundingBox();
				let {min, max} = textGeometry.boundingBox;
				let oWidth  = max.x - min.x;
				let oHeight = max.y - min.y;

				/* creating the name mesh */
				this.counterMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({
					color: this.options.tileDepth % 2 ? 0x777777 : 0xCCCCCC,
					polygonOffset: true,
					polygonOffsetUnits: 1,
					polygonOffsetFactor: -this.options.tileDepth - 99
				}));
				this.counterMesh.name = "Tile#counterMesh";
				this.counter3D.add(this.counterMesh);

				/* positioning the counter */
				this.counterMesh.position.x = 10;
				this.counterMesh.position.y = 10;

				/* borders around the counter */
				let counterBorders = new THREE.Line(
					(() => {
						let geo = new THREE.Geometry();
						geo.vertices.push(
							new THREE.Vector3(-0.5, -0.5),
							new THREE.Vector3(0.5, -0.5),
							new THREE.Vector3(0.5, 0.5),
							new THREE.Vector3(-0.5, 0.5),
							new THREE.Vector3(-0.5, -0.5)
						);
						return geo;
					})(),
					new THREE.LineBasicMaterial({
						color: this.options.tileDepth % 2 ? 0x777777 : 0xCCCCCC,
						lineWidth: 1,
						polygonOffset: true,
						polygonOffsetUnits: 1,
						polygonOffsetFactor: -this.options.tileDepth - 99
					})
				);
				counterBorders.name = "counterBorders";
				this.counter3D.add(counterBorders);
				counterBorders.scale.x = oWidth  + 8;
				counterBorders.scale.y = oHeight + 8;
				counterBorders.position.x = 0.5 * (oWidth  + 8) + 6;
				counterBorders.position.y = 0.5 * (oHeight + 8) + 6;

				this.event('correlation-counter-click').plug(Kefir.fromBinder((emitter) => {
					eventHandler.addEventListener(counterBorders, 'click', emitter.emit);
					return () => {
						eventHandler.removeEventListener(counterBorders, 'click', emitter.emit);
					};
				}));

			}

			/* strange hack to compensate for this block being delayed to the first this.p('shown').value(true) */
			// TODO; figure out why this is needed, then use a more elegant solution
			setTimeout(() => {
				this.parent.shown = false;
				this.parent.shown = true;
			});

		});
	});

//plugin.modify('Circuitboard.prototype')
//	.add('windowToCircuitboard', function (event) {
//		let mouse3D = new THREE.Vector3(
//			() * 2 - 1
//		);
//	});

