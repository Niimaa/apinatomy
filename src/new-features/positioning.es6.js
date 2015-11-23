/* imports */
import $     from 'jquery';
import Kefir from '../util/kefir-and-eggs.es6.js';


/* the plugin */
var plugin = $.circuitboard.plugin.do('positioning', {
	if:       true,
	requires: ['core']
});


/* convenience functions */
const positionEquality = (a, b) => (a.x === b.x && a.y === b.y);
const sizeEquality     = (a, b) => (a.width === b.width && a.height === b.height);


/* plugin implementation */
plugin.modify('Circuitboard.prototype')
	.append('construct', function () {

		this.newProperty('canvasSize', {
			initial: { width: 1, height: 1 },
			isEqual: sizeEquality
		}).plug(Kefir.merge([
			Kefir.once(),
			(this.options.resizeEvent || $(window).asKefirStream('resize').flatMap(() => Kefir.sequentially(500, [0,0,0])))
		]).map(() => ({
			height: this.element.height(),
			width:  this.element.width()
		})));

		this.newProperty('size', {
			initial: { width: 1, height: 1 },
			isEqual: sizeEquality
		}).plug(this.p('canvasSize'));

		// TODO: allow 'size' to differ from 'canvasSize' by specifying margins

	});

plugin.modify('Tilemap.prototype')
	.append('construct', function () {

		this.newProperty('position', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		});

		this.newProperty('size', {
			initial: { width: 1, height: 1 },
			isEqual: sizeEquality
		});

	});

plugin.modify('Tile.prototype')
	.append('construct', function () {

		this.newProperty('position', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		});

		this.newProperty('size', {
			initial: { width: 1, height: 1 },
			isEqual: sizeEquality
		});

		this.newProperty('headerPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		});

		this.newProperty('headerSize', {
			initial: { width: 1, height: 1 },
			isEqual: sizeEquality
		});

		this.newProperty('bodyPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		});

		this.newProperty('bodySize', {
			initial: { width: 1, height: 1 },
			isEqual: sizeEquality
		});

		this.newProperty('headerTilemapSeparator', { initial: 0 });

		Kefir.combine([this.p('size'), this.p('headerTilemapSeparator')]).onValue(([{width, height}, y]) => {
			let hasChildren = (this.model.getChildIds().length > 0); // TODO: this should be about tiles, not children in the model
			if (!hasChildren) { y = 0 }
			let headerHeight = Math.max((1 - y) * height, 24);
			this.headerPosition = { x: 0, y: height - headerHeight };
			this.headerSize     = { width: width, height: headerHeight };
			this.bodyPosition   = { x: 0, y: 0 };
			this.bodySize       = { width: width, height: height - headerHeight };
		});




	});




/* implement global positioning properties */
plugin.modify('Circuitboard.prototype')
	.append('construct', function () {

		this.newProperty('globalPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		});

	});
plugin.modify('Tilemap.prototype')
	.append('construct', function () {

		this.newProperty('globalPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		}).plug(this.parent.p('globalPosition'));

	});
plugin.modify('Tile.prototype')
	.append('construct', function () {

		this.newProperty('globalPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		}).plug(Kefir.combine([this.parent.p('globalPosition'), this.p('position')], (gp, p) => ({
			x: gp.x + p.x,
			y: gp.y + p.y
		})));

		this.newProperty('globalHeaderPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		}).plug(Kefir.combine([this.p('globalPosition'), this.p('headerPosition')], (gp, hp) => ({
			x: gp.x + hp.x,
			y: gp.y + hp.y
		})));

		this.newProperty('globalBodyPosition', {
			initial: { x: 0, y: 0 },
			isEqual: positionEquality
		}).plug(Kefir.combine([this.p('globalPosition'), this.p('bodyPosition')], (gp, bp) => ({
			x: gp.x + bp.x,
			y: gp.y + bp.y
		})));


	});





