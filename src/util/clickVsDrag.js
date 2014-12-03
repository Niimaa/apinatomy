'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
define(['jquery'], function ($) {
//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	// TODO: Baconize


	$.fn.extend({
		clickNotDrop: function clickNotDrop(fn) {
			return this.each(function () {
				$(this).on('mousedown', (/*mouseDownEvent*/) => {
					var onMouseMove = () => {
						$(window).off('mouseup', onMouseUp);
					};
					var onMouseUp = (mouseUpEvent) => {
						$(window).off('mousemove', onMouseMove);
						mouseUpEvent.stopImmediatePropagation();
						fn.call(this, mouseUpEvent);
					};
					$(window).one('mousemove', onMouseMove);
					$(window).one('mouseup', onMouseUp);
				});
			});
		},
		mouseDragDrop: function mouseDragDrop(dragFn, dropFn) {
			return this.each(function () {
				$(this).on('mousedown', (mouseDownEvent) => {
					var onMouseMove = (moveEvent) => {
						$(this).data('mouseDragDrop-dragging', true);
						dragFn.call(this, moveEvent);
					};
					var onMouseUp = (dropEvent) => {
						$(window).off('mousemove', onMouseMove);
						if ($(this).data('mouseDragDrop-dragging')) {
							dropFn.call(this, dropEvent);
						}
					};
					mouseDownEvent.stopPropagation();
					$(window).one('mousemove', onMouseMove);
					$(window).one('mouseup', onMouseUp);
					$(this).data('mouseDragDrop-dragging', false);
				});
			});
		},
		// TODO: these event-handler removers cast way too wide a net; make them more specific
		offClickNotDrop: function offClickNotDrop() {
			return $(this).off('mousedown');
		},
		offMouseDragDrop: function offMouseDragDrop() {
			return $(this).off('mousedown');
		}
	});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
