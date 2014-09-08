define(['./amy-skin.scss'], function () {
	return function skin(tile) {
		var origElement = tile.html;
		origElement.addClass('skinned-tile');
		origElement.append(`<header>${tile.model.id}</header><section/>`);
		tile.html = origElement.children('section');
		tile.html.css('padding', tile.options.tileSpacing);
		tile.element.css(tile.model.css);
	}
});
