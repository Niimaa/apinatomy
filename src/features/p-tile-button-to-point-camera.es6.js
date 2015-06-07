define(['jquery', 'chroma-js', '../util/misc.es6.js', '../util/kefir-and-eggs.es6.js'], function ($, color, U, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-button-to-point-camera', {
		requires: ['tile-buttons', 'three-d']
	});


	let blackIcon = require('../util/icons/camera-black.png');
	let whiteIcon = require('../util/icons/camera-white.png');


	plugin.append('Circuitboard.prototype.construct', function () {

		this.newProperty('cameraTargetTile', { initial: null });

		var newTarget = this.p('cameraTargetTile').changes();
		var newTileTarget = newTarget.filter(t => t !== null);


		/* un-target tile when targeted tile is hidden */
		this.p('cameraTargetTile').plug(newTileTarget.flatMapLatest((tile) => {
			return tile.p('hidden').value(true).merge(this.on('destroy'))
				.takeUntilBy(this.p('cameraTargetTile').value(null));
		}).mapTo(null));


		/* when a tile is targeted, consistently point the camera there */
		newTarget.flatMapLatest((tile) => {
			if (!tile) { return Kefir.never() }
			return Kefir.merge([
				Kefir.once(),
				tile.p('size').changes(),
				tile.p('position').changes()
			]).mapTo(tile);
		}).onValue((tile) => {
			this.camera3D.userData.target = this.object3D.localToWorld(tile.object3D.position.clone());
			this.camera3D.userData.semanticTarget = tile;
		});
		newTarget.value(null).onValue(() => {
			delete this.camera3D.userData.semanticTarget;
		});


		/* when a new tile is targeted, change the color of its camera button */
		newTarget.newOld().onValue(([newTarget, oldTarget]) => {
			if (newTarget) {
				let lightBackground = color(newTarget.element.css('backgroundColor')).luminance() > 0.5;
				newTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({
					backgroundImage: `url('${lightBackground ? whiteIcon : blackIcon})`,
					backgroundColor: lightBackground ? 'black' : 'white'
				});
			}
			if (oldTarget) {
				let lightBackground = color(oldTarget.element.css('backgroundColor')).luminance() > 0.5;
				oldTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({
					backgroundImage: `url('${lightBackground ? blackIcon : whiteIcon})`,
					backgroundColor: 'transparent'
				});
			}
		});

	}).append('Tile.prototype.construct', function () {

		this.addButton({ name: 'pointCamera', icon: { white: whiteIcon, black: blackIcon } }).onValue(() => {
			if (this.circuitboard.cameraTargetTile === this) {
				this.circuitboard.cameraTargetTile = null;
			} else {
				this.circuitboard.cameraTargetTile = this;
			}
		});

	});


});
