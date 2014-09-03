define(['jquery', './util.js'], function ($) {

	$.CSS('.circuitboard .tile')
		.addRule('margin', 0)
		.addRule('padding', 0)
		.addRule('width', 0);
	$.CSS('.tile:last-child') // to overwrite tile spacing
		.addRule('margin-right', 0, true);

	$.amyWidget('tile', {
		cssClass:    'tile',
		filter:      ()=>true,
		model:       null,
		tileSpacing: 0,
		_cb:         null
	}, function Tile() {

		/////////////////////////////////////////
		//// inform circuitboard of new tile ////
		/////////////////////////////////////////

		this.options._cb._registerTile(this);

		///////////////////////////////
		//// supporting DOM-events ////
		///////////////////////////////

		$.each(['click', 'mouseover', 'mouseout'], (index, signal) => {
			this.element.on(signal, (event) => {
				event.stopPropagation();
				this.trigger(signal, event);
			});
		});

        ///////////////////////////////////////////
        //// public access to the HTML element ////
        ///////////////////////////////////////////

        var _html = this.element;
        Object.defineProperty(this, 'html', {
            get() { return _html },
            set(newHtml) { _html = newHtml }
        });

        // TODO: public access to D3 layer and three.js layer

		///////////////////////////
		//// 'active' property ////
		///////////////////////////

		this.element.addClass('active');
		// TODO: getter, setter

		///////////////////////////
		//// 'weight' property ////
		///////////////////////////

		var _weight = 1;
		Object.defineProperty(this, 'weight', {
			get() { return _weight },
			set(newWeight) {
				// TODO: allow Infinity
				_weight = newWeight;
				this.element.nestedFlexGrow(newWeight);
			}
		});

		/////////////////////////
		//// 'open' property ////
		/////////////////////////

		var _open = false;
		Object.defineProperty(this, 'open', {
			get() { return _open },
			set(shouldBeOpen) {
				_open = shouldBeOpen;
				this.element.toggleClass("open", _open);
				if (_open) { _populateInnerTilemap() }
			}
		});

		///////////////////////
		//// inner tilemap ////
		///////////////////////

		var _tilemap = null;

		var _populateInnerTilemap = ()=>{
			if (!_tilemap) {
				_tilemap = this.element.tilemap({
					filter:      this.options.filter,
					model:       this.options.model,
					tileSpacing: this.options.tileSpacing,
					_cb:         this.options._cb
				}).tilemap('instance');
				this.one('destroy', ()=>{ _tilemap.destroy() });
			}
		};

	});

});
