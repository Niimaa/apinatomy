define([
	'jquery',
	'./util/misc.js',
	'./util/handle-premature-plugins.js'
], function ($, U) {
	'use strict';

	function posSubtract(posA, posB) {
		return {
			top: posA.top - posB.top,
			left: posA.left - posB.left
		};
	}

	function posEqual(posA, posB) {
		return posA && posB && posA.top === posB.top && posA.left === posB.left;
	}

	function sizeEqual(sizeA, sizeB) {
		return sizeA && sizeB && sizeA.width === sizeB.width && sizeA.height === sizeB.height;
	}

	$.circuitboard.plugin({
		name: 'position-tracking',
		after: ['circuitboard-core', 'tilemap-core', 'tile-core'],

		'modify circuitboard': {
			'add _p_tilePosition_offset': null,
			'insert construct': function () {
				this._p_tilePosition_offset = U.cached({
					retrieve: () => this.element.offset()
				});
				var _size = U.cached({
					retrieve: () => ({ width: this.element.width(), height: this.element.height() }),
					isEqual: sizeEqual
				});

				//
				// define 'size' property
				//
				Object.defineProperty(this, 'size', {
					get() { return _size() }
				});

				//
				// define 'position' property
				//
				Object.defineProperty(this, 'position', {
					get() { return { left: 0, top: 0 } }
				});

				//
				// trigger events
				//
				$(window).resize(() => { setTimeout(_size, 0) });
				_size.onChange((newSize) => { this.trigger('size', newSize) });
			}
		},

		'modify tilemap': {
			'insert construct': function () {
				var _offset = U.cached({
					retrieve: () => this.element.offset(),
					isEqual: posEqual
				});
				var _size = U.cached({
					retrieve: () => ({ width: this.element.width(), height: this.element.height() }),
					isEqual: sizeEqual
				});

				//
				// define properties
				//
				Object.defineProperty(this, 'position', {
					get() { return posSubtract(_offset(), this.circuitboard._p_tilePosition_offset()) }
				});
				Object.defineProperty(this, 'size', {
					get() { return _size() }
				});

				//
				// trigger events
				//
				this.parent.on('size', () => { _offset(); _size(); });
				_offset.onChange(() => { this.trigger('position', this.position) });
				_size.onChange((newSize) => { this.trigger('size', newSize) });

			}
		},

		'modify tile': {
			'add _p_positionTracking_offset': null,
			'add _p_positionTracking_size': null,
			'add resetPositioning': function () {
				this._p_positionTracking_offset();
				this._p_positionTracking_size();
			},
			'insert construct': function () {
				var _offset = this._p_positionTracking_offset = U.cached({
					retrieve: () => this.element.offset(),
					isEqual: posEqual
				});
				var _size = this._p_positionTracking_size = U.cached({
					retrieve: () => ({ width: this.element.width(), height: this.element.height() }),
					isEqual: sizeEqual
				});

				//
				// define properties
				//
				Object.defineProperty(this, 'position', {
					get() { return posSubtract(_offset(), this.circuitboard._p_tilePosition_offset()) }
				});
				Object.defineProperty(this, 'size', {
					get() { return _size() }
				});

				//
				// trigger events
				//
				this.parent.on('position', _offset);
				this.parent.on('size', () => { _offset(); _size(); });
				this.parent.on('reorganize', () => { _offset(); _size(); });
				this.on('weight', () => { _offset(); _size(); });
				_offset.onChange(() => { this.trigger('position', this.position) });
				_size.onChange((newSize) => { this.trigger('size', newSize) });

				//
				// if the size of any tile changes, trigger the `reorganize`
				// event on the parent tilemap, so that sibling tiles can react
				//
				this.on('size', () => { this.parent.trigger('reorganize') });
			}
		}
	});
});
