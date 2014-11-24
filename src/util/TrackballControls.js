/**
 * @author Eberhard Graether     (http://egraether.com)
 * @author Mark Lundin           (http://mark-lundin.com)
 * @author Michiel Helvensteijn  (http://mhelvens.net)
 */

define(['jquery', 'three-js', 'delta-js', './misc.js'], ($, THREE, DeltaModel, U) => {
	'use strict';


	/* constants ******************************************************************************************************/

	var EPS = 0.000001;
	var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
	var CHANGE_EVENT = { type: 'change' };
	var START_EVENT  = { type: 'start' };
	var END_EVENT    = { type: 'end' };


	/* delta model ****************************************************************************************************/

	var dm = new DeltaModel();


	/* core ***********************************************************************************************************/

	new dm.Delta('core', {
		if: true
	}).modify('TrackballControls.prototype')
		/* 'construct' method core */
			.add('construct', function (controlledObject, domElement) {
				this._controlledObject = controlledObject;
				this._domElement = domElement;
			})
		/* API */
			.append('construct', function () {

				this.enabled = true;

			})
		/* private fields */
			.append('construct', function () {

				this._targetCoordinates = new THREE.Vector3();
				this._velocity = new THREE.Vector3();
				this._lastPosition = new THREE.Vector3();
				this._state = STATE.NONE;
				this._eye = new THREE.Vector3();
				this._rotateStart = new THREE.Vector3();
				this._rotateEnd = new THREE.Vector3();
				this._zoomStart = new THREE.Vector2();
				this._zoomEnd = new THREE.Vector2();
				this._touchZoomDistanceStart = 0;
				this._touchZoomDistanceEnd = 0;
				this._panStart = new THREE.Vector2();
				this._panEnd = new THREE.Vector2();
				this._screen = { left: 0, top: 0, width: 0, height: 0 };
				this._targetCoordinates0 = this._targetCoordinates.clone();
				this._position0 = this._controlledObject.position.clone();
				this._up0 = this._controlledObject.up.clone();

			})
		/* public methods */
			.add('reset', function () {

				this._state = STATE.NONE;

				this._targetCoordinates.copy(this._targetCoordinates0);
				this._controlledObject.position.copy(this._position0);
				this._controlledObject.up.copy(this._up0);

				this._velocity.set(0, 0, 0);

				this._eye.subVectors(this._controlledObject.position, this._targetCoordinates);

				this._controlledObject.lookAt(this._targetCoordinates);

				this.dispatchEvent(CHANGE_EVENT);

				this._lastPosition.copy(this._controlledObject.position);

			}).add('update', function () {

				this._eye.subVectors(this._controlledObject.position, this._targetCoordinates);

				this.rotateCamera();
				this.zoomCamera();
				this.panCamera();

				this._controlledObject.position.addVectors(this._targetCoordinates, this._eye);

				this._controlledObject.lookAt(this._targetCoordinates);

				if (this._lastPosition.distanceToSquared(this._controlledObject.position) > EPS) {
					this.dispatchEvent(CHANGE_EVENT);
					this._lastPosition.copy(this._controlledObject.position);
				}

				setTimeout(() => {
					this._controlledObject.position.add(this._velocity);
					this._controlledObject.lookAt(this._targetCoordinates);
					this._lastPosition.copy(this._controlledObject.position);
				});

			}).add('handleResize', function () {

				if (this._domElement === document) {
					this._screen.left = 0;
					this._screen.top = 0;
					this._screen.width = window.innerWidth;
					this._screen.height = window.innerHeight;
				} else {
					var box = this._domElement.getBoundingClientRect();
					// adjustments come from similar code in the jquery offset() function
					var d = this._domElement.ownerDocument.documentElement;
					this._screen.left = box.left + window.pageXOffset - d.clientLeft;
					this._screen.top = box.top + window.pageYOffset - d.clientTop;
					this._screen.width = box.width;
					this._screen.height = box.height;
				}

			});


	/* mouse event method cores ***************************************************************************************/

	new dm.Delta('mouse-events', {
		after: ['core'],
		if: true
	}).modify('TrackballControls.prototype')
			.add('mousedown', function (event) {

				if (!this.enabled) { return }

				if (this._state === STATE.NONE) {
					this._state = {
						0: STATE.ROTATE,
						1: STATE.ZOOM,
						2: STATE.PAN
					}[event.button];
				}

				var mousemove = (e) => { this.mousemove(e) };
				var mouseup = () => {
					if (this.enabled === false) { return }
					this._state = STATE.NONE;
					document.removeEventListener('mousemove', mousemove);
					document.removeEventListener('mouseup', mouseup);
					this.dispatchEvent(END_EVENT);
				};

				document.addEventListener('mousemove', mousemove);
				document.addEventListener('mouseup', mouseup);

				this.dispatchEvent(START_EVENT);

			}).add('mousemove', function () {

				if (this.enabled === false) { return }

			}).add('touchstart', function (event) {

				if (!this.enabled) { return }

				if (event.touches.length < 1 || event.touches.length > 2) {
					this._state = STATE.NONE;
				}

				this.dispatchEvent(START_EVENT);

			}).add('touchmove', function (event) {

				if (!this.enabled) { return }

				if (event.touches.length < 1 || event.touches.length > 2) {
					this._state = STATE.NONE;
				}

			}).add('touchend', function () {

				if (!this.enabled) { return }

				this._state = STATE.NONE;
				this.dispatchEvent(END_EVENT);

			}).insert('construct', function () { // getMouseOnScreen

				var vector = new THREE.Vector2();
				this.getMouseOnScreen = function getMouseOnScreen(pageX, pageY) {
					vector.set(
							(pageX - this._screen.left) / this._screen.width,
							(pageY - this._screen.top) / this._screen.height
					);
					return vector;
				};

			}).insert('construct', function () { // getMouseProjectionOnBall
				var vector = new THREE.Vector3();
				var objectUp = new THREE.Vector3();
				var mouseOnBall = new THREE.Vector3();
				this.getMouseProjectionOnBall = function getMouseProjectionOnBall(pageX, pageY) {

					mouseOnBall.set(
							(pageX - this._screen.width * 0.5 - this._screen.left) / (this._screen.width * 0.5),
							(this._screen.height * 0.5 + this._screen.top - pageY) / (this._screen.height * 0.5),
							0.0
					);

					var length = mouseOnBall.length();

					if (length > 1.0) {
						mouseOnBall.normalize();
					} else {
						mouseOnBall.z = Math.sqrt(1.0 - length * length);
					}

					this._eye.copy(this._controlledObject.position).sub(this._targetCoordinates);

					vector.copy(this._controlledObject.up).setLength(mouseOnBall.y);
					vector.add(objectUp.copy(this._controlledObject.up).cross(this._eye).setLength(mouseOnBall.x));
					vector.add(this._eye.setLength(mouseOnBall.z));

					return vector;

				};
			}).insert('construct', function () {

				this._domElement.addEventListener('contextmenu', (e) => { e.preventDefault() });
				this._domElement.addEventListener('mousedown', (e) => { this.mousedown(e) });
				this._domElement.addEventListener('touchstart', (e) => { this.touchstart(e) });
				this._domElement.addEventListener('touchmove', (e) => { this.touchmove(e) });
				this._domElement.addEventListener('touchend', (e) => { this.touchend(e) });

			});


	/* keyboard event method cores ************************************************************************************/

	new dm.Delta('keyboard-events', {
		after: ['core'],
		if: true
	}).modify('TrackballControls.prototype')
			.add('keyboardVelocity', () => 10)
			.add('keydown', function (event) {

				if (!this.enabled) { return }

				if (this._state !== STATE.NONE) { return }

				console.log('keydown:', event.keyCode);

				var d = this.keyboardVelocity();
				switch (event.keyCode) {
					case 37: { this._velocity.x =  d } break;
					case 38: { this._velocity.y =  d } break;
					case 39: { this._velocity.x = -d } break;
					case 40: { this._velocity.y = -d } break;
				}

			}).add('keyup', function (event) {

				console.log('keyup:', event.keyCode);

				switch (event.keyCode) {
					case 37: { this._velocity.x = 0 } break;
					case 38: { this._velocity.y = 0 } break;
					case 39: { this._velocity.x = 0 } break;
					case 40: { this._velocity.y = 0 } break;
				}

			}).insert('construct', function () {

				window.addEventListener( 'keydown', (e) => { this.keydown(e) });
				window.addEventListener( 'keyup', (e) => { this.keyup(e) });

			});


	/* rotate *********************************************************************************************************/

	new dm.Delta('rotate', {
		after: ['core', 'mouse-events'],
		if: true
	}).modify('TrackballControls.prototype')
		/* mouse events */
			.append('mousedown', function (event) {

				if (this._state === STATE.ROTATE) {
					this._rotateStart.copy(this.getMouseProjectionOnBall(event.pageX, event.pageY));
					this._rotateEnd.copy(this._rotateStart);
				}

			}).append('mousemove', function (event) {

				if (this._state === STATE.ROTATE) {
					this._rotateEnd.copy(this.getMouseProjectionOnBall(event.pageX, event.pageY));
				}

			}).append('touchstart', function (event) {

				if (event.touches.length === 1) {
					this._state = STATE.TOUCH_ROTATE;
					this._rotateStart.copy(this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
					this._rotateEnd.copy(this._rotateStart);
				}

			}).append('touchmove', function (event) {

				if (event.touches.length === 1) {
					this._rotateEnd.copy(this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
				}

			}).append('touchend', function () {

				if (event.touches.length === 1) {
					this._rotateEnd.copy(this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY));
					this._rotateStart.copy(this._rotateEnd);
				}

			})
		/* rotating */
			.insert('construct', function () { // rotateCamera
				var axis = new THREE.Vector3();
				var quaternion = new THREE.Quaternion();
				this.rotateCamera = function rotateCamera() {

					var angle = Math.acos(
							this._rotateStart.dot(this._rotateEnd) /
							this._rotateStart.length() /
							this._rotateEnd.length()
					);
					if (angle) {
						axis.crossVectors(this._rotateStart, this._rotateEnd).normalize();

						angle *= this.rotateSpeed;

						quaternion.setFromAxisAngle(axis, -angle);

						this._eye.applyQuaternion(quaternion);
						this._controlledObject.up.applyQuaternion(quaternion);

						this._rotateEnd.applyQuaternion(quaternion);
						this._rotateStart.copy(this._rotateEnd);
					}

				};
			})
		/* rotating options */
			.insert('construct', function () {

				this.rotateSpeed = 1.0;

			});


	/* zoom ***********************************************************************************************************/

	new dm.Delta('zoom', {
		after: ['mouse-events'],
		if: true
	}).modify('TrackballControls.prototype')
		/* mouse events */
			.append('mousedown', function (event) {

				if (this._state === STATE.ZOOM) {
					this._zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
					this._zoomEnd.copy(this._zoomStart);
				}

			}).append('mousemove', function () {

				if (this._state === STATE.ZOOM) {
					this._zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
				}

			}).add('mousewheel', function (event) {

				if (this.enabled === false) { return }

				event.preventDefault();
				event.stopPropagation();

				var diff = 0;
				if (event.wheelDelta) { // WebKit / Opera / Explorer 9
					diff = event.wheelDelta / 40;
				} else if (event.detail) { // Firefox
					diff = -event.detail / 3;
				}

				this._zoomStart.y += diff * 0.01;
				this.dispatchEvent(START_EVENT);
				this.dispatchEvent(END_EVENT);

			}).insert('construct', function () {

				this._domElement.addEventListener('mousewheel', (e) => { this.mousewheel(e) });
				this._domElement.addEventListener('DOMMouseScroll', (e) => { this.mousewheel(e) }); // firefox

			})
		/* zooming */
			.add('zoomCamera', function () {

				if (this._state === STATE.TOUCH_ZOOM_PAN) {
					this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
					this._eye.multiplyScalar(this._touchZoomDistanceStart / this._touchZoomDistanceEnd);
				} else {
					var factor = 1.0 + ( this._zoomEnd.y - this._zoomStart.y ) * this.zoomSpeed;
					if (factor !== 1.0 && factor > 0.0) {
						this._eye.multiplyScalar(factor);
						this._zoomStart.copy(this._zoomEnd);
					}
				}

			})
		/* zooming options */
			.insert('construct', function () {

				this.zoomSpeed = 1.2;

			});


	/* pan ************************************************************************************************************/

	new dm.Delta('pan', {
		after: ['core', 'mouse-events'],
		if: true
	}).modify('TrackballControls.prototype')
		/* mouse events */
			.append('mousedown', function (event) {

				if (this._state === STATE.PAN) {
					this._panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
					this._panEnd.copy(this._panStart);
				}

			}).append('mousemove', function () {

				if (this._state === STATE.PAN) {
					this._panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
				}

			})
		/* panning */
			.insert('construct', function () { // panCamera
				var mouseChange = new THREE.Vector2();
				var objectUp = new THREE.Vector3();
				var pan = new THREE.Vector3();
				this.panCamera = function panCamera() {

					mouseChange.copy(this._panEnd).sub(this._panStart);
					if (mouseChange.lengthSq()) {
						mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);
						pan.copy(this._eye).cross(this._controlledObject.up).setLength(mouseChange.x);
						pan.add(objectUp.copy(this._controlledObject.up).setLength(mouseChange.y));
						this._controlledObject.position.add(pan);
						this._targetCoordinates.add(pan);
						this._panStart.copy(this._panEnd);
					}

				};
			})
		/* panning options */
			.insert('construct', function () {

				this.panSpeed = 0.3;

			});


	/* zoom + pan *****************************************************************************************************/

	new dm.Delta('zoom+pan', {
		after: ['zoom', 'pan'],
		if: true
	}).modify('TrackballControls.prototype')
		/* mouse events */
			.append('touchstart', function (event) {

				if (event.touches.length === 2) {
					this._state = STATE.TOUCH_ZOOM_PAN;
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					this._touchZoomDistanceEnd = this._touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

					var x = ( event.touches[0].pageX + event.touches[1].pageX ) / 2;
					var y = ( event.touches[0].pageY + event.touches[1].pageY ) / 2;
					this._panStart.copy(this.getMouseOnScreen(x, y));
					this._panEnd.copy(this._panStart);
				}

			}).append('touchmove', function (event) {

				if (event.touches.length === 2) {
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

					var x = ( event.touches[0].pageX + event.touches[1].pageX ) / 2;
					var y = ( event.touches[0].pageY + event.touches[1].pageY ) / 2;
					this._panEnd.copy(this.getMouseOnScreen(x, y));
				}

			}).append('touchend', function () {

				if (event.touches.length === 2) {
					this._touchZoomDistanceStart = this._touchZoomDistanceEnd = 0;

					var x = ( event.touches[0].pageX + event.touches[1].pageX ) / 2;
					var y = ( event.touches[0].pageY + event.touches[1].pageY ) / 2;
					this._panEnd.copy(this.getMouseOnScreen(x, y));
					this._panStart.copy(this._panEnd);
				}

			});


	/* little hack for apinatomy-specific functionality ***************************************************************/

	new dm.Delta('apinatomy-specific', {
		if: true
	}).modify('TrackballControls.prototype')
			.add('setCameraDistance', function setCameraDistance(distance) {

				this._controlledObject.position.normalize().multiplyScalar(distance);

			});


	/* the TrackballControls class (variation point) ******************************************************************/

	THREE.TrackballControls = dm.vp('TrackballControls',
			U.newClass(function TrackballControls(controlledObject, domElement = document) {

				/* apply the construct method populated by deltas */
				this.construct.apply(this, arguments);

				/* explicitly update in the beginning */
				this.handleResize();
				this.update();

			}, Object.create(THREE.EventDispatcher.prototype))
	);


});
