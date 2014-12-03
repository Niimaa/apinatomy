define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'bacon',
	'./util/eggs.js',
	'./util/CSS3DRenderer.js',
	'./p-three-d.scss'
], function ($, THREE, U, Bacon) {
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
		requires: ['position-tracking', 'tile-hidden']
	});


	/* the constructor is run once to initialize potential 3D-ness */
	plugin.insert('Circuitboard.prototype.construct', function () {


		/* test for browser support */
		if (!browserSupport()) {
			console.warn("This browser doesn't seem to have WebGL support.");
			return;
		}


		/* the 'threeDCanvasElement' property */
		this.newProperty('threeDCanvasElement');
		this.on('threeDCanvasElement').slidingWindow(2).map('.reverse').onValues((newCanvas, oldCanvas) => {
			if (oldCanvas) { oldCanvas.removeClass('three-d-canvas') }
			if (newCanvas) { newCanvas.addClass('three-d-canvas') }
		});


		/* was a canvas given through the options? */
		this.threeDCanvasElement = this.options.threeDCanvasElement;


		/* the 'threeDMode' property */
		this.newProperty('threeDMode', {
			initial: U.isDefined(this.options.threeDCanvasElement)
		}); // TODO: error if no canvas element is set


		/* the 'threeDCanvasSize' observable */
		this.newProperty('threeDCanvasSize');
		((cache) => {
			this.threeDCanvasSize = cache();
			cache.onChange((newSize) => { this.threeDCanvasSize = newSize });
			( this.options.canvasResizeEvent || $(window).resize.bind($(window)) )(cache);
		})(U.cached({
			retrieve: () => (this.threeDCanvasElement && new U.Size(
					this.threeDCanvasElement.height(),
					this.threeDCanvasElement.width()
			)),
			isEqual: U.Size.equals
		}));


	});

	/* the code to run every time 3D-ness is turned on */
	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newEvent('3d-render');

		this.on('threeDMode', true).onValue(() => {


			// TODO: fix bug: when 3D mode is turned off, then on, tiles no longer respond to clicks


			/* remember the initial margin */
			this._p_threeD_initialMargin = {};
			this._p_threeD_initialMargin.left = this.element.offset().left - this.threeDCanvasElement.offset().left;
			this._p_threeD_initialMargin.top = this.element.offset().top - this.threeDCanvasElement.offset().top;
			this._p_threeD_initialMargin.right = this.threeDCanvasSize.width - this.size.width - this._p_threeD_initialMargin.left;
			this._p_threeD_initialMargin.bottom = this.threeDCanvasSize.height - this.size.height - this._p_threeD_initialMargin.top;

			this.one('threeDMode', false, () => { delete this._p_threeD_initialMargin });


			/* scene */
			this._p_threeD_scene = new THREE.Scene();
			this.one('threeDMode', false, () => { delete this._p_threeD_scene });


			/* camera */
			this.camera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
			this.camera3D.position.z = 1;
			this.one('threeDMode', false, () => { delete this.camera3D });
			this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((size) => {
				this.camera3D.aspect = size.width / size.height;
				this.camera3D.updateProjectionMatrix();
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


			/* renderer: WebGL */
			this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({ alpha: true, antialias: true });
			this._p_threeD_renderer_webgl.sortObjects = false;
			this.on('3d-render').takeWhile(this.on('threeDMode')).onValue(() => {
				this._p_threeD_renderer_webgl.render(this._p_threeD_scene, this.camera3D);
			});

			this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((size) => {
				this._p_threeD_renderer_webgl.setSize(size.width, size.height);
			});
			this.one('threeDMode', false, () => { delete this._p_threeD_renderer_webgl });


			/* renderer: CSS */
			this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
			$(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
			this.threeDCanvasElement.append(this._p_threeD_renderer_css.domElement);
			this.one('threeDMode', false, () => {
				this.threeDCanvasElement.empty();
				delete this._p_threeD_renderer_css;
			});
			this.on('3d-render').takeWhile(this.on('threeDMode')).onValue(() => {
				this._p_threeD_renderer_css.render(this._p_threeD_scene, this.camera3D);
			});
			this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((size) => {
				this._p_threeD_renderer_css.setSize(size.width, size.height);
			});


			/* render on size-change and every animation frame */
			U.animationFrames().merge(this.on('size').changes())
					.takeWhile(this.on('threeDMode'))
					.onValue(() => { this.trigger('3d-render') });


			/*  the circuitboard object has a coordinate system           */
			/*  that corresponds to the html and svg of the circuitboard  */
			this.object3D = new THREE.Object3D();
			this._p_threeD_scene.add(this.object3D);
			this.object3D.scale.y = -1;       // invert y axis
			this.object3D.add = (subObj) => { // and re-invert the y axis of its children
				THREE.Object3D.prototype.add.call(this.object3D, subObj);
				subObj.scale.y = -1;
			};
			this.on('size').takeWhile(this.on('threeDMode')).onValue((size) => {
				this.object3D.position.x = -size.width / 2 + 1;
				this.object3D.position.y = size.height / 2 - 1;
			});


			/* floating tilemap */
			var initialCircuitboardParent = this.element.parent();
			var initialCircuitboardPositioning = {
				left: this.element.css('left'),
				top: this.element.css('top'),
				right: this.element.css('right'),
				bottom: this.element.css('bottom')
			};
			this.one('threeDMode', false, () => {
				this.element.detach().appendTo(initialCircuitboardParent)
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
			this._p_threeD_circuitboard = new THREE.CSS3DObject(this.element[0]);
			this.element.css({ left: 0, top: 0, bottom: 0, right: 0 });
			this._p_threeD_scene.add(this._p_threeD_circuitboard);


			/* tilemap backface */
			var backfaceElement = $('<div>').css({
				position: 'absolute',
				border: 'solid 1px black',
				backfaceVisibility: 'hidden'
			});
			var backface = new THREE.CSS3DObject(backfaceElement[0]);
			backface.rotation.set(Math.PI, 0, 0);
			this._p_threeD_scene.add(backface);


			/* respond to resize */
			this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue(() => {

				/* sizing and positioning of the circuit-board and backface */
				var newCircuitboardSize = {
					width: this.threeDCanvasSize.width - this._p_threeD_initialMargin.left - this._p_threeD_initialMargin.right,
					height: this.threeDCanvasSize.height - this._p_threeD_initialMargin.top - this._p_threeD_initialMargin.bottom
				};
				var newCircuitboardPosition = {
					x: 0.5 * (this._p_threeD_initialMargin.left - this._p_threeD_initialMargin.right),
					y: 0.5 * (this._p_threeD_initialMargin.bottom - this._p_threeD_initialMargin.top)
				};

				this.element.css(newCircuitboardSize);
				U.extend(this._p_threeD_circuitboard.position, newCircuitboardPosition);
				U.extend(this.object3D.position, {
					x: newCircuitboardPosition.x - this.size.width / 2,
					y: newCircuitboardPosition.y + this.size.height / 2
				});

				backfaceElement.css(newCircuitboardSize);
				U.extend(backface.position, newCircuitboardPosition);

				/* set the camera distance to correspond */
				this.camera3D.position.normalize().multiplyScalar(
						this.threeDCanvasSize.height /
						(2 * Math.tan(THREE.Math.degToRad(this.camera3D.fov) / 2))
				);

			});


		});


	});


	/* `translatePositionFromCanvasToCircuitboard` has no side-effects and can be used   */
	/*  from the outside to translate left/top coordinates on the screen to left/top     */
	/*  coordinates of the private coordinate-system of the circuitboard, however it is  */
	/*  oriented in 3D space.                                                            */
	plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function (positionOnCanvas) {

		this.camera3D.updateMatrixWorld();
		this.camera3D.updateProjectionMatrix();

		var mouse3D = new THREE.Vector3();
		mouse3D.x =  positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
		mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
		mouse3D.z = 0.5;
		PROJECTOR.unprojectVector(mouse3D, this.camera3D);
		var ray = new THREE.Ray(this.camera3D.position, mouse3D.sub(this.camera3D.position).normalize());
		var intersects = ray.intersectPlane(PLANE);

		/* if the tested intersection is out of range, return undefined */
		if (!intersects) { return }

		return {
			left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
			top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
		};

	});


	/* artefact-specific object3D objects */
	plugin.insert('Tile.prototype.construct', function () {

		this.circuitboard.on('threeDMode', true).onValue(() => {

			/* create the 3D object for this tile */
			this.object3D = new THREE.Object3D();
			this.circuitboard.object3D.add(this.object3D);

			/* position it always in the center of the tile */
			Bacon.mergeAll(this.on('position'), this.on('size')).onValue(() => {
				this.object3D.position.x = this.position.left + this.size.width / 2;
				this.object3D.position.y = this.position.top + this.size.height / 2;
			});

			/* hide it when the tile is hidden */
			this.on('visible').onValue((visible) => { this.object3D.visible = visible });

		});

	});


});
