define(['./amy-skin.scss'], function () {
	return function skin(tile) {
		var origElement = tile.dom;
		origElement.addClass('skinned-tile');
		origElement.append(`<header>${tile.model.id}</header><section/>`);
		tile.dom = origElement.children('section');
		tile.dom.css('padding', tile.options.tileSpacing);
		tile.element.css(tile.model.css);
	}
});
