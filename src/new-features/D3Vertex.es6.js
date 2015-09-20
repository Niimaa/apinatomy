import $     from 'jquery';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import ArtefactP from './Artefact.es6.js';


/* 3D imports */
import THREE    from 'expose?THREE!three-js';
import detector from '../util/3d-detector.es6.js';
import 'script!../util/fonts/helvetiker_regular.typeface.js';
import 'script!../util/Projector.js';
import 'script!../util/my-threex.domevents.js'; // (modified version)
const THREEx = window.THREEx;
const projector = new THREE.Projector();


export default ArtefactP.then((Artefact) => {


	/* however (often) this is loaded, create the class only once */
	if (U.isDefined(window._amy_D3Vertex)) { return window._amy_D3Vertex }


	window._amy_D3Vertex = Artefact.newSubclass('D3Vertex', function D3Vertex({parent}) {

		U.assert(parent.type === 'D3Group',
			"D3Vertex objects need to have a D3Group object as their parent.");

		/* the 3D object representing the vertex */
		this.object3D = new THREE.Object3D();

		/* visibility */
		this.newProperty('shown', { initial: true });
		this.p('shown').onValue((shown) => {
			this.object3D.skipDomEvents = !shown;
			this.circuitboard.object3D[shown ? 'add' : 'remove'](this.object3D); // TODO: remove on destroy
		});

		/* the size of the vertex 'glyph' */
		this.newProperty('size', {
			initial: {
				width:  20,
				height: 20
			},
			isEqual: (a, b) => (a.width === b.width && a.height === b.height)
		});

		/* the global position of the vertex */
		this.newProperty('position', { // relative to circuitboard (0, 0)
			initial: {
				x: Math.random() * this.circuitboard.size.width,
				y: Math.random() * this.circuitboard.size.height
			},
			isEqual: (a, b) => (a.x === b.x && a.y === b.y),

			/* constrain this position to be within the group */
			mapWith: [this.p('size'), parent.p('position'), parent.p('size')],
			map: (pos, size, gPos, gSize) => ({
				x: Math.min(Math.max(
					pos.x,
					gPos.x                + 0.5 * size.width ),
					gPos.x + gSize.width  - 0.5 * size.width ),
				y: Math.min(Math.max(
					pos.y,
					gPos.y                + 0.5 * size.height),
					gPos.y + gSize.height - 0.5 * size.height)
			})
		});

		/* the glyph representing the vertex, and recipient of mouse events */
		{
			/* creating the tile mesh */
			this.mesh3D  = new THREE.Mesh(
				new THREE.PlaneBufferGeometry(1, 1),
				new THREE.MeshBasicMaterial({
					color: U.defOr(this.options.color, 0xff0000),
					polygonOffset: true,
					polygonOffsetUnits: 1,
					polygonOffsetFactor: -this.closestAncestorByType('Tile').options.tileDepth - 2
				})
			);
			this.mesh3D.position.x = -0.5;
			this.mesh3D.position.y = -0.5;
			this.object3D.add(this.mesh3D);

			this.p('size').onValue(({width, height}) => {
				this.mesh3D.scale.x = width;
				this.mesh3D.scale.y = height;
			});

			/* defining dom-like events on this glyph */
			const eventHandler = this.circuitboard.eventHandler3D;
			for (let event of ['click', 'dblclick', 'mouseup', 'mousedown', 'mouseover', 'mouseout', 'contextmenu']) {
				this.newEvent(event).plug(Kefir.fromBinder((emitter) => {
					eventHandler.addEventListener(this.mesh3D, event, emitter.emit);
					return () => {
						eventHandler.removeEventListener(this.mesh3D, event, emitter.emit);
					};
				}));
			}

		}


		this.p('position').onValue(({x, y}) => {
			this.object3D.position.x = x;
			this.object3D.position.y = y;
		});


		parent.addVertex(this);
		this.on('destroy').take(1).onValue(() => {
			parent.removeVertex(this);
		});



		/* implementing vertex-dragging */
		const body = $('body');
		let draggingStream = this.e('mousedown')
			.flatMap((e) => {
				this.fixed = true;
				let mouseupStream = Kefir.fromEvent(body, 'mouseup');
				mouseupStream.onValue(() => { this.fixed = false });
				return Kefir.fromEvent(body, 'mousemove').takeUntilBy(mouseupStream);
			})
			.map((e) => {
				let mouse3D = new THREE.Vector3(
					(e.clientX / window.innerWidth)  * 2 - 1,
					-(e.clientY / window.innerHeight) * 2 + 1,
					0.5
				);
				mouse3D.unproject(this.circuitboard.camera3D);
				mouse3D.sub(this.circuitboard.camera3D.position);
				mouse3D.normalize();
				let rayCaster = new THREE.Raycaster(this.circuitboard.camera3D.position, mouse3D);
				let [intersection] = rayCaster.intersectObject(this.circuitboard.mesh3D);
				if (!intersection) { return null }
				return this.circuitboard.object3D.worldToLocal(intersection.point);
			}).onValue(({x, y}) => {
				this.position = {x, y};
			});


	}, {

		get x()  { return this.position.x },
		set x(x) { this.position = { x, y: this.y } },
		get y()  { return this.position.y },
		set y(y) { this.position = { x: this.x, y } }

	}, {});


	return window._amy_D3Vertex;


}).tap((c) => { $.circuitboard.D3Vertex = c });
