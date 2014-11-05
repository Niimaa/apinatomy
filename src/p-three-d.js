define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/CSS3DRenderer.js',
	'./util/TrackballControls.js',
	'./p-three-d.scss'
], function ($, THREE, U) {
	'use strict';


	/* test for browser 3D support */
	function browserSupport() {
		var canvas;
		try {
			canvas = $('<canvas>');
			return !!(canvas[0].getContext('webgl') || canvas[0].getContext('experimental-webgl'));
		} catch (__) {
			return false;
		} finally {
			canvas = undefined;
		}
	}


	/* some useful constants for making intersection checks */
	var PLANE = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	var PROJECTOR = new THREE.Projector();


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d',
		requires: ['position-tracking']
	});


	/* the constructor is run once to initialize potential 3D-ness */
	plugin.insert('Circuitboard.prototype.construct', function () {


		/*  test for browser support */
		if (!browserSupport()) {
			console.warn("This browser doesn't seem to have WebGL support.");
			return;
		}


		/* the 'threeDCanvasElement' property */
		U.observable(this, 'threeDCanvasElement');
		this.on('threeDCanvasElement', (newCanvas, oldCanvas) => {
			if (oldCanvas) { oldCanvas.removeClass('three-d-canvas') }
			if (newCanvas) { newCanvas.addClass('three-d-canvas') }
		});


		/* the 'threeDMode' property */
		U.observable(this, 'threeDMode', {
			initial: false,
			validation: (val) => {
				U.assert(!val || this.options.threeDCanvasElement,
						`You cannot turn on 3D mode  when no 'threeDCanvasElement' has been set.`);
				return !!val;
			}
		});


		/* the 'threeDCanvasSize' property */
		var _canvasSize = U.cached({
			retrieve: () => (this.threeDCanvasElement && new U.Size(
					this.threeDCanvasElement.height(),
					this.threeDCanvasElement.width()
			)),
			isEqual: U.Size.equals
		});
		Object.defineProperty(this, 'threeDCanvasSize', { get() { return _canvasSize() } });
		_canvasSize.onChange((newSize) => { this.trigger('threeDCanvasSize', newSize) });


		/* react to canvas resize */
		( this.options.canvasResizeEvent || $(window).resize.bind($(window)) )(_canvasSize);


		/* the 'threeDControlsEnabled' property */
		U.observable(this, 'threeDControlsEnabled');


		/* initialize when 3D mode is turned on */
		this.on('threeDMode', (mode) => {
			if (mode) { this._p_threeD_initialize() }
		});


		/* was a canvas given through the options? */
		this.threeDCanvasElement = this.options.threeDCanvasElement;
		if (this.threeDCanvasElement) {
			this.threeDMode = true;
		}


	});

	/* `_p_threeD_initialize` is run every time 3D-ness is turned on */
	plugin.add('Circuitboard.prototype._p_threeD_initialize', function () {

		/* an easy way to act on 3D mode being turned off */
		var onThreeDModeOff = (cb) => {
			var auxCb = (mode) => {
				if (!mode) {
					this.off('threeDMode', auxCb);
					cb();
				}
			};
			this.on('threeDMode', auxCb);
		};


		/* remember the initial margin */
		this._p_threeD_initialMargin = {};
		this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
		this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
		this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
		this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;
		onThreeDModeOff(() => {
			delete this._p_threeD_initialMargin;
		});


		/* scene */
		this._p_threeD_scene = new THREE.Scene();
		this.one('threeDMode', (mode) => {
			if (!mode) { delete this._p_threeD_scene }
		});



		/* camera */
		this._p_threeD_camera =
				new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
		var setCameraAspect = (size) => {
			this._p_threeD_camera.aspect = size.width / size.height;
			this._p_threeD_camera.updateProjectionMatrix();
		};
		this.on('threeDCanvasSize', setCameraAspect);
		this._p_threeD_camera.position.z = 1;
		onThreeDModeOff(() => {
			this.off('threeDCanvasSize', setCameraAspect);
			delete this._p_threeD_camera;
		});


		/* lighting */
		var ambientLight = new THREE.AmbientLight(0x101030);
		this._p_threeD_scene.add(ambientLight);
		//
		var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
		directionalLight1.position.set(1, -1, 1);
		this._p_threeD_scene.add(directionalLight1);
		//
		var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
		directionalLight2.position.set(-1, 1, -1);
		this._p_threeD_scene.add(directionalLight2);
		//
		onThreeDModeOff(() => {
			ambientLight = undefined;
			directionalLight1 = undefined;
			directionalLight2 = undefined;
		});


		/* renderer: WebGL */
		this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		this._p_threeD_renderer_webgl.sortObjects = false;
		this._p_threeD_renderer_webgl.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
		var renderWebGL = () => { this._p_threeD_renderer_webgl.render(this._p_threeD_scene, this._p_threeD_camera) };
		var setWebGLCanvasSize = (size) => { this._p_threeD_renderer_webgl.setSize(size.width, size.height) };
		this.on('3d-render', renderWebGL);
		this.on('threeDCanvasSize', setWebGLCanvasSize);
		onThreeDModeOff(() => {
			this.off('3d-render', renderWebGL);
			this.off('threeDCanvasSize', setWebGLCanvasSize);
			delete this._p_threeD_renderer_webgl;
		});


		/* renderer: CSS */
		this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
		$(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
		this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
		this._p_threeD_renderer_css.setSize(this.threeDCanvasElement.width(), this.threeDCanvasElement.height());
		var renderCSS = () => { this._p_threeD_renderer_css.render(this._p_threeD_scene, this._p_threeD_camera) };
		var setWebCSSSize = (size) => { this._p_threeD_renderer_css.setSize(size.width, size.height) };
		this.on('3d-render', renderCSS);
		this.on('threeDCanvasSize', setWebCSSSize);
		onThreeDModeOff(() => {
			this.off('3d-render', renderCSS);
			this.off('threeDCanvasSize', setWebCSSSize);
			this.threeDCanvasElement.empty();
			delete this._p_threeD_renderer_css;
		});


		/* render on size-change and every animation frame */
		var trigger3DRender = () => { this.trigger('3d-render') };
		this.on('size', trigger3DRender);
		var stopTriggering3DRender = U.eachAnimationFrame(() => { this.trigger('3d-render') });
		onThreeDModeOff(() => {
			this.off('size', trigger3DRender);
			stopTriggering3DRender();
		});


		/* controls */
		this._p_threeD_controls = new THREE.TrackballControls(this._p_threeD_camera, this.threeDCanvasElement[0]);
		$.extend(this._p_threeD_controls, {
			rotateSpeed: 1.0,
			zoomSpeed: 1.2,
			panSpeed: 0.8
		});
		this._p_threeD_controls.addEventListener('change', () => { this.trigger('3d-render') });
		var handleResizeForControls = () => { this._p_threeD_controls.handleResize() };
		var updateControls = () => { this._p_threeD_controls.update() };
		var setControlsEnabled = (enabled) => { this._p_threeD_controls.enabled = enabled };
		this.on('size', handleResizeForControls);
		this.on('3d-render', updateControls);
		this.on('threeDControlsEnabled', setControlsEnabled);
		onThreeDModeOff(() => {
			this.off('size', handleResizeForControls);
			this.off('3d-render', updateControls);
			this.off('threeDControlsEnabled', setControlsEnabled);
			delete this._p_threeD_controls;
		});


		/* floating tilemap */
		var initialCircuitboardParent = this.element.parent();
		var initialCircuitboardPositioning = {
			left: this.element.css('left'),
			top: this.element.css('top'),
			right: this.element.css('right'),
			bottom: this.element.css('bottom')
		};
		this._p_threeD_circuitboard = new THREE.CSS3DObject(this.element[0]);
		this.element.css({ left: 0, top: 0, bottom: 0, right: 0 });
		this._p_threeD_scene.add(this._p_threeD_circuitboard);
		onThreeDModeOff(() => {
			this.element.appendTo(initialCircuitboardParent)
					.css({
						'width': 'auto',
						'height': 'auto',
						'position': 'absolute',
						'transform': '',
						'-webkit-transform': ''
					})
					.css(initialCircuitboardPositioning);
			delete this._p_threeD_circuitboard;
		});


		/* tilemap backface */
		var backfaceElement = $('<div>').css({
			position: 'absolute',
			border: 'solid 1px black',
			backfaceVisibility: 'hidden'
		});
		var backface = new THREE.CSS3DObject(backfaceElement[0]);
		backface.rotation.set(Math.PI, 0, 0);
		this._p_threeD_scene.add(backface);


		/* a three.js object with a coordinate system that corresponds to the html and svg of the circuitboard */
		this.object3D = new THREE.Object3D();
		this._p_threeD_scene.add(this.object3D);
		this.object3D.scale.y = -1; // flip y axis
		this.on('size', (size) => {
			this.object3D.position.x = -size.width / 2;
			this.object3D.position.y = size.height / 2;
		});


		/* respond to resize */
		var onCanvasResize = () => {

			/* sizing and positioning of the circuit-board and backface */
			var size = {
				width: this.threeDCanvasSize.width - this._p_threeD_initialMargin.left - this._p_threeD_initialMargin.right,
				height: this.threeDCanvasSize.height - this._p_threeD_initialMargin.top - this._p_threeD_initialMargin.bottom
			};
			this.element.css(size);
			backfaceElement.css(size);
			backface.position.x = this._p_threeD_circuitboard.position.x = 0.5 * (this._p_threeD_initialMargin.left - this._p_threeD_initialMargin.right);
			backface.position.y = this._p_threeD_circuitboard.position.y = 0.5 * (this._p_threeD_initialMargin.bottom - this._p_threeD_initialMargin.top);

			/* set the camera distance to correspond */
			this._p_threeD_controls.setCameraDistance(
					this.threeDCanvasSize.height /
					(2 * Math.tan(THREE.Math.degToRad(this._p_threeD_camera.fov) / 2))
			);

		};
		this.on('threeDCanvasSize', onCanvasResize);
		onCanvasResize();
		onThreeDModeOff(() => {
			this.off('threeDCanvasSize', onCanvasResize);
		});

	});


	/* `translatePositionFromCanvasToCircuitboard` has no side-effects and can be used   */
	/*  from the outside to translate left/top coordinates on the screen to left/top     */
	/*  coordinates of the private coordinate-system of the circuitboard, however it is  */
	/*  oriented in 3D space.                                                            */
	plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function (positionOnCanvas) {

		this._p_threeD_camera.updateMatrixWorld();
		this._p_threeD_camera.updateProjectionMatrix();

		var mouse3D = new THREE.Vector3();
		mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
		mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
		mouse3D.z = 0.5;
		PROJECTOR.unprojectVector(mouse3D, this._p_threeD_camera);
		var ray = new THREE.Ray(this._p_threeD_camera.position, mouse3D.sub(this._p_threeD_camera.position).normalize());
		var intersects = ray.intersectPlane(PLANE);

		/* if the tested intersection is out of range, return undefined */
		if (!intersects) { return }

		return {
			left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
			top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
		};

	});


	plugin.insert('Tile.prototype.construct', function () {

		/* create the 3D object for this tile */
		this.object3D = new THREE.Object3D();
		this.circuitboard.object3D.add(this.object3D);

		/* position it always in the center of the tile */
		((reset) => {
			this.on('position', reset);
			this.on('size', reset);
			reset(this.position);
		})(() => {
			this.object3D.position.x = this.position.left + this.size.width / 2;
			this.object3D.position.y = this.position.top + this.size.height / 2;
		});

	});


});
