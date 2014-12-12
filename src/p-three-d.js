define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/bacon-and-eggs.js',
	'./util/CSS3DRenderer.js',
	'./p-three-d.scss'
], function ($, THREE, U, Bacon) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d',
		requires: ['position-tracking', 'tile-hidden', 'animation-loop']
	});


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


			/* a short notation for the event of 3D-mode being turned off */
			var onThreeDModeOff = this.on('threeDMode').value(false).take(1);


			/* scene */
			this._p_threeD_scene = new THREE.Scene();
			onThreeDModeOff.onValue(() => { delete this._p_threeD_scene });


			/* camera */
			this.camera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
			//this.camera3D.scale.y = -1; // TODO: ????
			this.camera3D.position.z = 1000;
			this.camera3D.userData.target = new THREE.Vector3().copy(this.camera3D.position).setZ(0);
			this.camera3D.lookAt(this.camera3D.userData.target);
			onThreeDModeOff.onValue(() => { delete this.camera3D });
			this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((canvasSize) => {
				this.camera3D.aspect = canvasSize.width / canvasSize.height;
				this.camera3D.position.normalize()
						.multiplyScalar(canvasSize.height / Math.tan(THREE.Math.degToRad(this.camera3D.fov) / 2) / 2);
				this.camera3D.updateProjectionMatrix();
			});


			/* lighting */
			this._p_threeD_scene
					.add(new THREE.AmbientLight(0x101030))
					.add(new THREE.DirectionalLight(0xffeedd).translateX(1).translateY(-1).translateZ(1))
					.add(new THREE.DirectionalLight(0xffeedd).translateX(-1).translateY(1).translateZ(-1));


			/* renderers */
			(()=>{
				/* WebGL renderer */
				var webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
				webglRenderer.sortObjects = false;
				this.on('3d-render').takeWhile(this.on('threeDMode'))
						.onValue(() => { webglRenderer.render(this._p_threeD_scene, this.camera3D) });
				this.on('threeDCanvasSize').takeWhile(this.on('threeDMode'))
						.onValue((canvasSize) => { webglRenderer.setSize(canvasSize.width, canvasSize.height) });

				/* CSS renderer */
				var cssRenderer = new THREE.CSS3DRenderer();
				$(cssRenderer.domElement).append(webglRenderer.domElement);
				this.threeDCanvasElement.append(cssRenderer.domElement);
				onThreeDModeOff.onValue(() => { this.threeDCanvasElement.empty() });
				this.on('3d-render').takeWhile(this.on('threeDMode'))
						.onValue(() => { cssRenderer.render(this._p_threeD_scene, this.camera3D) });
				this.on('threeDCanvasSize').takeWhile(this.on('threeDMode'))
						.onValue((canvasSize) => { cssRenderer.setSize(canvasSize.width, canvasSize.height) });
			})();


			/* render on size-change and every animation frame */
			Bacon.mergeAll(
					this.on('animation-frame'),
					this.on('size').changes()
			).takeWhile(this.on('threeDMode')).assign(this, 'trigger', '3d-render');


			/* the circuitboard floating in 3D space */
			(({parent0, position0, margin0}) => {

				/* the circuitboard itself */
				var threeDCircuitboard = new THREE.CSS3DObject(this.element
						.css({ left: 0, top: 0, bottom: 0, right: 0 })[0]);
				this._p_threeD_scene.add(threeDCircuitboard);
				this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((canvasSize) => {
					$(threeDCircuitboard.element).css({
						width: canvasSize.width - margin0.left - margin0.right,
						height: canvasSize.height - margin0.top - margin0.bottom
					});
					U.extend(threeDCircuitboard.position, {
						x: 0.5 * (margin0.left - margin0.right),
						y: 0.5 * (margin0.bottom - margin0.top)
					});
				});
				onThreeDModeOff.onValue(() => {
					this.element.detach().appendTo(parent0).css(position0).css({
						'width': 'auto',
						'height': 'auto',
						'position': 'absolute',
						'transform': '',
						'-webkit-transform': ''
					});
				});


				/* its backface */
				var threeDBackface = new THREE.CSS3DObject($('<div>').css({
					position: 'absolute',
					border: 'solid 1px black',
					backfaceVisibility: 'hidden',
					left: 0, top: 0, bottom: 0, right: 0
				})[0]);
				threeDBackface.rotation.x = Math.PI; // 180°
				this._p_threeD_scene.add(threeDBackface);
				this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue((canvasSize) => {
					$(threeDBackface.element).css({
						width: canvasSize.width - margin0.left - margin0.right,
						height: canvasSize.height - margin0.top - margin0.bottom
					});
					U.extend(threeDBackface.position, {
						x: 0.5 * (margin0.left - margin0.right),
						y: 0.5 * (margin0.bottom - margin0.top)
					});
				});


				/*  the object containing all 3D things co-located with the circuitboard */
				this.object3D = new THREE.Object3D();
				this._p_threeD_scene.add(this.object3D);
				//this.object3D.rotation.x = Math.PI; // 180° // TODO: does this work?
				this.on('size').takeWhile(this.on('threeDMode')).onValue((size) => {
					this.object3D.position.x = -size.width / 2 + 1;
					this.object3D.position.y = -size.height / 2 + 1;
				});
				this.on('threeDCanvasSize').takeWhile(this.on('threeDMode')).onValue(() => {
					U.extend(this.object3D.position, {
						x: 0.5 * (margin0.left - margin0.right) - this.size.width / 2,
						y: 0.5 * (margin0.bottom - margin0.top) + this.size.height / 2
					});
				});


			})({ // remember some pre-3D DOM state
				parent0: this.element.parent(),
				position0: {
					left: this.element.css('left'),
					top: this.element.css('top'),
					right: this.element.css('right'),
					bottom: this.element.css('bottom')
				},
				margin0: {
					left:   this.offset.left - this.threeDCanvasElement.offset().left,
					top:    this.offset.top  - this.threeDCanvasElement.offset().top,
					right:  this.threeDCanvasSize.width  - this.size.width  - (this.offset.left - this.threeDCanvasElement.offset().left),
					bottom: this.threeDCanvasSize.height - this.size.height - (this.offset.top  - this.threeDCanvasElement.offset().top)
				}
			});




		});
	});


	///* `translatePositionFromCanvasToCircuitboard` has no side-effects and can be used   */
	///*  from the outside to translate left/top coordinates on the screen to left/top     */
	///*  coordinates of the private coordinate-system of the circuitboard, however it is  */
	///*  oriented in 3D space.                                                            */
	//plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function (positionOnCanvas) {
	//
	//	this.camera3D.updateMatrixWorld();
	//	this.camera3D.updateProjectionMatrix();
	//
	//	var mouse3D = new THREE.Vector3();
	//	mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
	//	mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
	//	mouse3D.z = 0.5;
	//	PROJECTOR.unprojectVector(mouse3D, this.camera3D);
	//	var ray = new THREE.Ray(this.camera3D.position, mouse3D.sub(this.camera3D.position).normalize());
	//	var intersects = ray.intersectPlane(PLANE);
	//
	//	/* if the tested intersection is out of range, return undefined */
	//	if (!intersects) { return }
	//
	//	return {
	//		left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
	//		top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
	//	};
	//
	//});


	/* artefact-specific object3D objects */
	plugin.insert('Tile.prototype.construct', function () {
		this.circuitboard.on('threeDMode', true).onValue(() => {

			/* create the 3D object for this tile */
			this.object3D = new THREE.Object3D();
			this.circuitboard.object3D.add(this.object3D);

			/* position it always in the center of the tile */
			Bacon.mergeAll(this.on('position'), this.on('size')).onValue(() => {
				this.object3D.position.x = this.position.left + this.size.width / 2;
				this.object3D.position.y = this.circuitboard.threeDCanvasSize.height -this.position.top - this.size.height / 2;
			});

			/* hide it when the tile is hidden */
			this.on('visible').onValue((visible) => { this.object3D.visible = visible });

		});
	});


});
