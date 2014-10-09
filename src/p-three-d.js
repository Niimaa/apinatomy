define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/CSS3DRenderer.js',
	'./util/TrackballControls.js',
	'./p-three-d.scss'
], function ($, THREE, U) {
	'use strict';

	function sizeEqual(sizeA, sizeB) {
		return sizeA && sizeB && sizeA.width === sizeB.width && sizeA.height === sizeB.height;
	}

	$.circuitboard.plugin({
		name: 'three-d',
		after: ['circuitboard-core', 'tilemap-core', 'position-tracking'],

		'modify circuitboard': {

			'add threeDCanvasElement': null,
			'add threeDMode': null,
			'add threeDCanvasSize': null,

			'add _p_threeD_scene': null,
			'add _p_threeD_camera': null,
			'add _p_threeD_renderer_webgl': null,
			'add _p_threeD_renderer_css': null,
			'add _p_threeD_controls': null,
			'add _p_threeD_circuitboard': null,

			'insert constructor': function () {


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
				// Initialize when 3D mode is turned on
				//
				this.on('threeDMode', (mode) => {
					if (mode) { this._p_threeD_initialize() }
				});


				////////////////////////////////////////////////////////////////
				// Was a canvas given through the options?
				//
				this.threeDCanvasElement = this.options.threeDCanvasElement;

			},


			'add _p_threeD_initialize': function () {

				////////////////////////////////////////////////////////////////
				// Determine initial circuitboard positioning inside the canvas
				//
				var initialMargin = {};
				initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
				initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
				initialMargin.right = this.threeDCanvasSize.width - this.size.width - initialMargin.left;
				initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - initialMargin.top;


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
				this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({alpha: true, antialias: true});
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


				////////////////////////////////////////////////////////////////
				// Floating Tilemap
				//
				var flatCircuitBoardElement = this.element;
				this._p_threeD_circuitboard = new THREE.CSS3DObject(flatCircuitBoardElement[0]);
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
						width : this.threeDCanvasSize.width  - (initialMargin.left + initialMargin.right),
						height: this.threeDCanvasSize.height - (initialMargin.top + initialMargin.bottom)
					};
					flatCircuitBoardElement.css(size);
					this._p_threeD_circuitboard.position.x = -0.5 * (initialMargin.left + initialMargin.right);
					this._p_threeD_circuitboard.position.y = -0.5 * (initialMargin.top + initialMargin.bottom);
					backfaceElement.css(size);
					backface.position.x = 0.5 * (initialMargin.left - initialMargin.right);
					backface.position.y = 0.5 * (initialMargin.top - initialMargin.bottom);
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

			}

		}
	});

});
