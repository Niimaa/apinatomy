define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/CSS3DRenderer.js',
	'./util/TrackballControls.js',
	'./p-three-d.scss'
], function ($, THREE, U) {
	'use strict';

	//
	// test for browser 3D support
	//
	var _browserSupport;

	function browserSupport() {
		if (U.isUndefined(_browserSupport)) {
			var canvas;
			try {
				canvas = $('<canvas>');
				_browserSupport = !!(canvas[0].getContext('webgl') || canvas[0].getContext('experimental-webgl'));
			} catch (__) {
				_browserSupport = false;
			} finally {
				canvas = undefined;
			}
		}
		return _browserSupport;
	}

	//
	// convenience function for testing equality of size objects
	//
	function sizeEqual(sizeA, sizeB) {
		return sizeA && sizeB && sizeA.width === sizeB.width && sizeA.height === sizeB.height;
	}

	//
	// some useful constants for making intersection checks
	//
	var PLANE = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	var PROJECTOR = new THREE.Projector();

	//
	// the plugin
	//
	var plugin = $.circuitboard.plugin({
		name: 'three-d',
		require: ['position-tracking'],
		after: ['position-tracking']
	});

	plugin.modify('circuitboard.prototype')
		//.add('threeDCanvasElement', null)
		//
		//'add threeDCanvasElement': null,
		//'add threeDMode': null,
		//'add threeDCanvasSize': null,
		//'add threeDControlsEnabled': true,
		//
		//'add _p_threeD_scene': null,
		//'add _p_threeD_camera': null,
		//'add _p_threeD_renderer_webgl': null,
		//'add _p_threeD_renderer_css': null,
		//'add _p_threeD_controls': null,
		//'add _p_threeD_circuitboard': null,

		.insert('construct', function () {

			////////////////////////////////////////////////////////////////
			// test for browser support
			//
			if (!browserSupport()) {
				console.warn("This browser doesn't seem to have WebGL support.");
				return;
			}

			////////////////////////////////////////////////////////////////
			// the 'threeDCanvasElement' property
			//
			U.observable(this, { name: 'threeDCanvasElement' });
			this.on('threeDCanvasElement', (newCanvas, oldCanvas) => {
				if (oldCanvas) { oldCanvas.removeClass('three-d-canvas') }
				if (newCanvas) { newCanvas.addClass('three-d-canvas') }
			});


			////////////////////////////////////////////////////////////////
			// the 'threeDMode' property
			//
			Object.defineProperty(this, 'threeDMode', {
				get() { return !!this.threeDCanvasElement },
				set(newThreeDMode) {
					if (!!newThreeDMode) {
						throw new Error("You cannot turn on 3D mode through the 'threeDMode' property. Do so by setting the 'threeDCanvasElement'.");
					} else {
						this.threeDCanvasElement = null;
					}
				}
			});
			this.on('threeDCanvasElement', (newCanvas, oldCanvas) => {
				if (newCanvas || oldCanvas) {
					this.trigger('threeDMode', !!newCanvas);
				}
			});


			////////////////////////////////////////////////////////////////
			// The 'threeDCanvasSize' property
			//
			var _canvasSize = U.cached({
				retrieve: () => (this.threeDCanvasElement && {
					width: this.threeDCanvasElement.width(),
					height: this.threeDCanvasElement.height()
				}),
				isEqual: sizeEqual
			});
			Object.defineProperty(this, 'threeDCanvasSize', {
				get() { return _canvasSize() }
			});
			_canvasSize.onChange((newSize) => { this.trigger('threeDCanvasSize', newSize) });
			//
			// for now, using window resize to trigger canvas resize
			//
			$(window).resize(_canvasSize);

			////////////////////////////////////////////////////////////////
			// the 'threeDControlsEnabled' property
			//
			U.observable(this, { name: 'threeDControlsEnabled' });

			////////////////////////////////////////////////////////////////
			// Initialize when 3D mode is turned on
			//
			this.on('threeDMode', (mode) => {
				if (mode) { this._p_threeD_initialize() }
			});


			////////////////////////////////////////////////////////////////
			// Was a canvas given through the options?
			//
			this.threeDCanvasElement = this.options.threeDCanvasElement;

		})

	.add('_p_threeD_initialize', function () {

			////////////////////////////////////////////////////////////////
			// Determine initial circuitboard positioning inside the canvas
			//
			this._p_threeD_initialMargin = {};
			this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
			this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
			this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
			this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;


			////////////////////////////////////////////////////////////////
			// Scene
			//
			this._p_threeD_scene = new THREE.Scene();


			////////////////////////////////////////////////////////////////
			// Camera
			//
			this._p_threeD_camera =
					new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
			this.on('threeDCanvasSize', (size) => { this._p_threeD_camera.aspect = size.width / size.height });
			this._p_threeD_camera.position.z = 1;


			////////////////////////////////////////////////////////////////
			// Lighting
			//
			var ambientLight = new THREE.AmbientLight(0x101030);
			this._p_threeD_scene.add(ambientLight);

			var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
			directionalLight1.position.set(1, -1, 1);
			this._p_threeD_scene.add(directionalLight1);

			var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
			directionalLight2.position.set(-1, 1, -1);
			this._p_threeD_scene.add(directionalLight2);


			////////////////////////////////////////////////////////////////
			// Renderer: WebGL
			//
			this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({ alpha: true, antialias: true });
			this._p_threeD_renderer_webgl.sortObjects = false;
			this._p_threeD_renderer_webgl.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
			this.on('3d-render', () => {
				this._p_threeD_renderer_webgl.render(this._p_threeD_scene, this._p_threeD_camera);
			});
			this.on('threeDCanvasSize', (size) => {
				this._p_threeD_renderer_webgl.setSize(size.width, size.height);
			});
			//
			// Renderer: CSS
			//
			this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
			$(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
			this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
			this._p_threeD_renderer_css.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
			this.on('3d-render', () => {
				this._p_threeD_renderer_css.render(this._p_threeD_scene, this._p_threeD_camera);
			});
			this.on('threeDCanvasSize', (size) => {
				this._p_threeD_renderer_css.setSize(size.width, size.height);
			});


			////////////////////////////////////////////////////////////////
			// Render on size-change and every animation frame
			//
			this.on('size', () => { this.trigger('3d-render') });
			U.eachAnimationFrame(() => { this.trigger('3d-render') });


			////////////////////////////////////////////////////////////////
			// Controls
			//
			this._p_threeD_controls = new THREE.TrackballControls(this._p_threeD_camera, this.threeDCanvasElement[0]);
			$.extend(this._p_threeD_controls, {
				rotateSpeed: 1.0,
				zoomSpeed: 1.2,
				panSpeed: 0.8,
				noZoom: false,
				noPan: false,
				staticMoving: true,
				dynamicDampingFactor: 0.3,
				keys: [65, 83, 68]
			});
			this._p_threeD_controls.addEventListener('change', () => { this.trigger('3d-render') });
			this.on('size', () => { this._p_threeD_controls.handleResize() });
			this.on('3d-render', () => { this._p_threeD_controls.update() });
			this.on('threeDControlsEnabled', (enabled) => { this._p_threeD_controls.enabled = enabled });


			////////////////////////////////////////////////////////////////
			// Floating Tilemap
			//
			var flatCircuitBoardElement = this.element;
			this._p_threeD_circuitboard = new THREE.CSS3DObject(flatCircuitBoardElement[0]);
			flatCircuitBoardElement.css({ left: 0, top: 0, bottom: 0, right: 0 }); // TODO: save and restore later
			flatCircuitBoardElement.css('backfaceVisibility', 'hidden');
			this._p_threeD_scene.add(this._p_threeD_circuitboard);
			//
			// Tilemap Backface
			//
			var backfaceElement = $('<div>').css({
				position: 'absolute',
				border: 'solid 1px black',
				backfaceVisibility: 'hidden'
			});
			var backface = new THREE.CSS3DObject(backfaceElement[0]);
			backface.rotation.set(Math.PI, 0, 0);
			this._p_threeD_scene.add(backface);
			//
			// respond to resize
			//
			var onCanvasResize = () => {
				//
				// sizing and positioning of the circuit-board and backface
				//
				var size = {
					width: this.threeDCanvasSize.width - this._p_threeD_initialMargin.left - this._p_threeD_initialMargin.right,
					height: this.threeDCanvasSize.height - this._p_threeD_initialMargin.top - this._p_threeD_initialMargin.bottom
				};
				flatCircuitBoardElement.css(size);
				backfaceElement.css(size);
				backface.position.x = this._p_threeD_circuitboard.position.x = 0.5 * (this._p_threeD_initialMargin.left - this._p_threeD_initialMargin.right);
				backface.position.y = this._p_threeD_circuitboard.position.y = 0.5 * (this._p_threeD_initialMargin.bottom - this._p_threeD_initialMargin.top);
				//
				// set the camera distance to correspond
				//
				this._p_threeD_controls.setCameraDistance(
						this.threeDCanvasSize.height /
						(2 * Math.tan(THREE.Math.degToRad(this._p_threeD_camera.fov) / 2))
				);
			};
			this.on('threeDCanvasSize', onCanvasResize);
			onCanvasResize();

		})
	.add('translatePositionFromCanvasToCircuitboard', function (positionOnCanvas) {

			this._p_threeD_camera.updateMatrixWorld();
			this._p_threeD_camera.updateProjectionMatrix();

			var mouse3D = new THREE.Vector3();
			mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
			mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
			mouse3D.z = 0.5;
			PROJECTOR.unprojectVector(mouse3D, this._p_threeD_camera);
			var ray = new THREE.Ray(this._p_threeD_camera.position, mouse3D.sub(this._p_threeD_camera.position).normalize());
			var intersects = ray.intersectPlane(PLANE);

			//
			// if the tested intersection is out of range, return undefined
			//
			if (!intersects) { return }

			return {
				left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
				top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
			};

		});

});
