define(['./util/putcssrules.js', './amy-skin.scss'], function () {
	function skin() {
		var origElement = this.dom;
		origElement.addClass('skinned-tile');
		origElement.append(`<header>${this.model.name}</header><section/>`);
		this.dom = origElement.children('section');
		this.dom.css('padding', this.options.tileSpacing);
		this.element.putCssRules(this.model.css);
	}
	skin.name = 'skin';
	return skin;
});
