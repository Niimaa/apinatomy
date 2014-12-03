define(['jquery', './util/misc.js', 'three-js', './util/TrackballControls.js'], function ($, U, THREE) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-manual-controls',
		requires: ['three-d']
	});


	plugin.append('Circuitboard.prototype.construct', function () {
		this.on('threeDMode', true).onValue(() => {

			/* the 'threeDControlsEnabled' property */
			this.newProperty('threeDControlsEnabled', { initial: true });

			/* implementing the controls */
			var controls = new THREE.TrackballControls(this.camera3D, this.threeDCanvasElement[0]);
			U.extend(controls, {
				rotateSpeed: 1.0,
				zoomSpeed: 1.2,
				panSpeed: 0.8
			});
			this.on('3d-render').takeWhile(this.on('threeDMode')).assign(controls, 'update');
			this.on('size').takeWhile(this.on('threeDMode')).assign(controls, 'handleResize');
			this.on('threeDControlsEnabled').takeWhile(this.on('threeDMode')).onValue((enabled) => { controls.enabled = enabled });

		});
	});


});
