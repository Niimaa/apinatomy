'use strict';

$(function () {


	function Model(id, children) {
		this.id = id;
		this._children = children;
		this.getChild = function (id) {
			return this._children[id];
		};
		this.getChildIds = function () {
			return Object.keys(this._children);
		};
	}


	var model = new Model('q', {
		a: { id: 'a' },
		b: { id: 'b' },
		c: { id: 'c' },
		d: new Model('d', {
			x: { id: 'x' },
			y: { id: 'y' },
			z: { id: 'z' }
		}),
		e: { id: 'e' }
	});



	var cbe = $('#circuitboard');

	var cb = cbe.circuitboard({
		model: model,
		tileSpacing: 4
	}).circuitboard('instance');

	cb.onTileCreated(function (tile) {
		tile.on('click', function () {
			tile.open = !tile.open;
//			tile.weight = 4 - tile.weight;
		})
	});


//	cbe.find(".tile").each(function () {
//		var instance = $(this).tile('instance');
//		var element = $(this);
//		element.tile('instance').on('click', function (event) {
//			console.log(event);
//			element.css('background', 'green');
//		});
//	});


//	$('#bla').hover(function (event) {
////		console.log('mouseenter', event);
////		event.stopPropagation();
//		$(this).css('background', 'green');
//	}, function (event) {
////		console.log('mouseleave', event);
////		event.stopPropagation();
//		$(this).css('background', 'white');
//	});


});
