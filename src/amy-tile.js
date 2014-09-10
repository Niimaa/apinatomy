define(['jquery', './util/amywidget.js', './util/nestedflexgrow.js'], function ($) {

	$.amyWidget('tile', {
		cssClass:    'tile',
		filter:      ()=>true,
		model:       null,
		tileSpacing: 0,
		_cb:         null
	}, function Tile() {


		///////////////////////////////
		//// supporting DOM-events ////
		///////////////////////////////

        $.each(['click', 'mouseover', 'mouseout'], (index, signal) => {
            this.element.on(signal, (event) => {
                event.stopPropagation();
                this.trigger(signal, event);
            });
        });

        $.each(['mouseenter', 'mouseleave'], (index, signal) => {
            this.element.on(signal, (event) => {
                this.trigger(signal, event);
            });
        });

        ///////////////////////////////////////////
        //// public access to the HTML element ////
        ///////////////////////////////////////////

		var _domContent = this.element;
        Object.defineProperty(this, 'dom', {
            get() { return _domContent },
            set(newDOM) { _domContent = newDOM }
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
				_tilemap = this.dom.tilemap({
					filter:      this.options.filter,
					model:       this.options.model,
					tileSpacing: this.options.tileSpacing,
					_cb:         this.options._cb
				}).tilemap('instance');
				this.one('destroy', ()=>{ _tilemap.destroy() });
			}
		};

        /////////////////////////////////////////
        //// inform circuitboard of new tile ////
        /////////////////////////////////////////

        this.options._cb._registerTile(this);

	});

});
