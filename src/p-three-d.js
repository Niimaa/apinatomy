define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/CSS3DRenderer.js',
	'./util/TrackballControls.js',
	'./p-three-d.scss'
], function ($, THREE, U) {
	'use strict';

	var DEG_TO_RAD = Math.PI / 180;

	$.circuitboard.plugin({
		name: 'three-d',
		after: ['circuitboard-core', 'tilemap-core', 'tile-core'],

		'modify circuitboard': {

			'add _p_threeD_scene': null,
			'add _p_threeD_init_scene': function () {
				this._p_threeD_scene = new THREE.Scene();
			},

			'add _p_threeD_camera': null,
			'add _p_threeD_init_camera': function () {
				//
				// initialize the camera and maintain the proper aspect ratio
				//
				this._p_threeD_camera =
					new THREE.PerspectiveCamera( 60, this.size.width / this.size.height, 1, 10000);
				this.on('size', (size) => { this._p_threeD_camera.aspect = size.width / size.height });

				//
				// position the camera so that the initial placement of the circuitboard
				// corresponds to its default 2D view
				//
				this._p_threeD_camera.position.z =
					this.size.height / (2 * Math.tan(this._p_threeD_camera.fov * DEG_TO_RAD / 2));
			},

			'add _p_threeD_init_lighting': function () {
				var ambientLight = new THREE.AmbientLight(0x101030);
				this._p_threeD_scene.add(ambientLight);

				var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
				directionalLight1.position.set(1, -1, 1);
				this._p_threeD_scene.add(directionalLight1);

				var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
				directionalLight2.position.set(-1, 1, -1);
				this._p_threeD_scene.add(directionalLight2);
			},

			'add _p_threeD_renderer_webgl': null,
			'add _p_threeD_init_renderer_webgl': function () {
				this._p_threeD_renderer_webgl = new THREE.WebGLRenderer({ alpha: true, antialias: true });
				this._p_threeD_renderer_webgl.sortObjects = false;
				this.on('3d-render', () => {
					this._p_threeD_renderer_webgl.render(this._p_threeD_scene, this._p_threeD_camera);
				});
				this.on('size', (size) => {
					this._p_threeD_renderer_webgl.setSize(size.width, size.height);
				}); // TODO: make sure this happens at least once
			},

			'add _p_threeD_renderer_css': null,
			'add _p_threeD_init_renderer_css': function () {
				this._p_threeD_renderer_css = new THREE.CSS3DRenderer();
				$(this._p_threeD_renderer_css.domElement).append(this._p_threeD_renderer_webgl.domElement);
				this.element.append(this._p_threeD_renderer_css.domElement);
				this.on('3d-render', () => {
					this._p_threeD_renderer_css.render(this._p_threeD_scene, this._p_threeD_camera);
				});
				this.on('size', (size) => {
					this._p_threeD_renderer_css.setSize(size.width, size.height);
				}); // TODO: make sure this happens at least once
			},

			'add _p_threeD_controls': null,
			'add _p_threeD_init_controls': function () {
				this._p_threeD_controls = new THREE.TrackballControls(this._p_threeD_camera, this.element[0]);
				this._p_threeD_controls.rotateSpeed = 1.0;
				this._p_threeD_controls.zoomSpeed = 1.2;
				this._p_threeD_controls.panSpeed = 0.8;
				this._p_threeD_controls.noZoom = false;
				this._p_threeD_controls.noPan = false;
				this._p_threeD_controls.staticMoving = true;
				this._p_threeD_controls.dynamicDampingFactor = 0.3;
				this._p_threeD_controls.keys = [ 65, 83, 68 ];

				this._p_threeD_controls.addEventListener('change', () => { this.trigger('3d-render') });
				this.on('size', () => { this._p_threeD_controls.handleResize() });
				this.on('3d-render', () => { this._p_threeD_controls.update() });
			},

			'insert constructor': function () {

				this._p_threeD_init_scene();
				this._p_threeD_init_camera();
				this._p_threeD_init_lighting();
				this._p_threeD_init_renderer_webgl();
				this._p_threeD_init_renderer_css();

				this.on('size', () => { this.trigger('3d-render') });
				U.eachAnimationFrame(() => { this.trigger('3d-render') });
				

			}

		}
	});

});
