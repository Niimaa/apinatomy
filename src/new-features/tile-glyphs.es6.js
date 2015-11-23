import $     from 'jquery';
import P     from 'bluebird';
import Kefir from '../util/kefir-and-eggs.es6.js';
import U     from '../util/misc.es6.js';
import defer from '../util/defer.es6.js';
import D3GroupP  from './D3Group.es6.js';
import D3VertexP from './D3Vertex.es6.js';
import D3EdgeP   from './D3Edge.es6.js';


var plugin = $.circuitboard.plugin.do('tile-glyphs', {
	requires: ['d3']
});


plugin.modify('Tile.prototype')
	.append('construct', function () {

		const {D3Group} = $.circuitboard;

		this.d3Group = new D3Group({ parent: this });

		this.d3Group.p('size').plug(this.p('headerSize'));
		this.d3Group.p('position').plug(this.p('globalHeaderPosition'));

	})
	.add('addGlyph', function ({color, tooltipText}) {

		const {D3Vertex} = $.circuitboard;

		/* the glyph */
		let glyph = new D3Vertex({
			parent: this.d3Group,
			color: U.defOr(color, 0xFF0000)
		});

		/* defining the mouseMove stream for this glyph */
		let mouseMove = glyph.event('mouseover').flatMap(() =>
			Kefir.fromEvent(this.circuitboard.element, 'mousemove')
				.takeUntilBy(glyph.event('mouseout')));

		/* tooltip */
		if (tooltipText) {
			let tooltip = $('#amy-tooltip');
			if (tooltip.length === 0) {
				tooltip = $(`
					<div id="amy-tooltip" style="
						display:          none;
						position:         absolute;
						pointer-events:   none;
						background-color: #ffffca;
						border:           solid 1px #000023;
						padding:          1px 2px;
						white-space:      nowrap;
						z-index:          99999;
					"></div>
				`).appendTo('body');
			}
			glyph.event('mouseover').onValue(() => {
				tooltip.text(tooltipText);
				tooltip.css({ display: 'block' });
			});
			mouseMove.onValue((origDomEvent) => {
				tooltip.css({
					top:  origDomEvent.pageY,
					left: origDomEvent.pageX + 16
				});
			});
			glyph.event('mouseout').onValue(() => {
				tooltip.css({ display: 'none' });
			});
		}

		return glyph;

	});
