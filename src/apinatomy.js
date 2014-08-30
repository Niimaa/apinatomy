'use strict';

jQuery(document).ready(function ($) {

	////////////////////////////////////////////////////////////////////////////////////////////////

	$.fn.nestedFlexGrow = function (grow) {
		this.css('flexGrow', grow);
		var growSum = 0;
		this.parent().children().each(function () {
			//noinspection JSPotentiallyInvalidUsageOfThis
			growSum += parseInt($(this).css('flexGrow'));
		});
		this.parent().css('flexGrow', growSum);
		return this;
	};

	////////////////////////////////////////////////////////////////////////////////////////////////

	var CSS = (function () {
		var stylesheet = $('<style>').appendTo('head')[0].sheet;
		var cssRuleIndex = 0;

		function formulateRule(selector, key, value, important) {
			return (selector + '{' + key + ': ' + value + (important ? ' !important' : '') + '}');
		}

		return function CSS(selector) {
			var selectorObj = {
				addRule: function addRule(key, value, important) {
					stylesheet.insertRule(
						  formulateRule(selector, key, value, important),
						  cssRuleIndex++
					);
					return selectorObj;
				},
				addAndKeepRule: function addAndKeepRule(key, value, important) {
					stylesheet.insertRule(
						  formulateRule(selector, key, value, important),
						  cssRuleIndex
					);
					var savedCSSRuleIndex = cssRuleIndex;
					return {
						setValue: function (newValue, newImportant) {
							stylesheet.deleteRule(savedCSSRuleIndex);
							stylesheet.insertRule(
								  formulateRule(selector, key, newValue, newImportant),
								  savedCSSRuleIndex
							);
						}
					};
				}
			};
			return selectorObj;
		};
	}());

	////////////////////////////////////////////////////////////////////////////////////////////////

	function signalHandlerMixin(that) {
		var _callbacks = {};
		that._callback = function (signal) {
			if (!_callbacks[signal]) {
				_callbacks[signal] = $.Callbacks();
			}
			return _callbacks[signal];
		};
		that.on = function (signal, fn) {
			that._callback(signal).add(fn);
		};
		that.one = function (signal, fn) {
			function paddedFn() {
				fn.apply(null, arguments);
				that.off(signal, paddedFn);
			}

			that.on(signal, paddedFn);
		};
		that.once = function (signal, fn) {
			that.one(signal, fn);
		};
		that.off = function (signal, fn) {
			that._callback(signal).remove(fn);
		};
		that.trigger = function (signal) {
			var callbacks = _callbacks[signal];
			if (callbacks) {
				callbacks.fire.apply(callbacks, [].slice.call(arguments, 1));
			}
		};
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	function amyWidget(name, options, createFn) {
		$.widget('apinatomy.' + name, {
			options: options,
			_create: function _create() {
				signalHandlerMixin.call(this, this);
				createFn.call(this, this);
			},
			_destroy: function _destroy() {
				this.trigger("destroy");
			}
		});
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	function returns(value) {
		return function () {
			return value;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////

	amyWidget('circuitboard', {
		cssClass: "circuitboard",
		filter: returns(true),
		model: null,
		entityCache: {},
		tileSpacing: 0
	}, function Circuitboard(that) {

		//// make model available directly in the Circuitboard object
		that.model = that.options.model;

		//// set the element class
		that.element.addClass(that.options.cssClass);
		that.one('destroy', function () {
			that.element.removeClass(that.options.cssClass);
		});

		//// keeping track of tiles
		var _tilesByModelId = {};
		that._registerTile = function _registerTile(tile) { // used by tiles
			if (!_tilesByModelId[tile.model.id]) {
				_tilesByModelId[tile.model.id] = [];
			}
			_tilesByModelId[tile.model.id].push(tile);
			that.trigger('tilecreated', tile);
		};
		that.onTileCreated = function onTileCreated(tileSelector, fn) {
			//// `tileSelector` is optional, i.e., a single argument is `fn`
			if (typeof arguments[1] === 'undefined') {
				fn = arguments[0];
				tileSelector = null;
			}

			//// build the filter based on the selector
			var filter = null;
			if (!tileSelector) { // no tile selector = all tiles
				filter = returns(true);
			} else if (typeof tileSelector === 'string') { // model.id
				filter = function (tile) {
					return tile.model.id === tileSelector
				};
			}

			//// apply the callback for existing tiles
			$.each(_tilesByModelId, function (modelId, tiles) {
				$.each(tiles, function (index, tile) {
					if (filter(tile)) {
						fn(tile)
					}
				});
			});

			//// set up the callbacks for future tiles
			that.on('tilecreated', function (tile) {
				if (filter(tile)) {
					fn(tile)
				}
			});
		};

		//// the root tilemap
		var _tilemap = that.element.tilemap({
			filter: that.options.filter,
			model: that.options.model,
			tileSpacing: that.options.tileSpacing,
			_cb: that
		}).tilemap('instance');
		that.one('destroy', _tilemap.destroy.bind(_tilemap));

	});


	////////////////////////////////////////////////////////////////////////////////////////////////

	CSS('.circuitboard.tilemap, .circuitboard .tilemap')
		  .addRule('display', 'flex')
		  .addRule('flex-direction', 'column');
	CSS('.circuitboard .tilerow')
		  .addRule('display', 'flex')
		  .addRule('flex-direction', 'row')
		  .addRule('margin', 0)
		  .addRule('padding', 0)
		  .addRule('height', 0);
	CSS('.tilerow:last-child') // to overwrite tile spacing
		  .addRule('margin-bottom', 0, true);

	$.widget("apinatomy.tilemap", {
		options: {
			cssClass: "tilemap",
			filter: returns(true),
			model: null,
			tileSpacing: 0,
			_cb: null
		},

		// // // // // // // // // // // // // // // // // // // // // // // //

		_create: function () {
			var that = this;

			signalHandlerMixin.call(that, that);

			//// flatten the model out of the options object
			that.model = that.options.model;

			//// css class
			that.element.addClass(that.options.cssClass);
			that.one('destroy', function () {
				that.element.removeClass(that.options.cssClass);
			});

			this._refreshTiles();
			this._refreshTileSpacing();
		},
		_destroy: function () {
			this.trigger("destroy");
		},

		// // // // // // // // // // // // // // // // // // // // // // // //

		_tileElements: {},
		_tileRowElements: [],

		// // // // // // // // // // // // // // // // // // // // // // // //

		_refreshTileSpacing: function () {
			var that = this;
			that.element.children().css('margin-bottom', that.options.tileSpacing);
			that.element.children().children().css('margin-right', that.options.tileSpacing);
		},

		// // // // // // // // // // // // // // // // // // // // // // // //

		_refreshTiles: function () {
			var that = this;

			if (!that.options.model || !that.options.model.getChildIds || !that.options.model.getChild) {
				that._tileElements = {};
				that.element.empty();
				return;
			}

			//// load the models of children that ought be displayed
			var childrenToDisplay = [];
			$.each(that.options.model.getChildIds(), function (index, childId) {
				function getChild() {
					if (!that.options._cb.options.entityCache[childId]) {
						that.options._cb.options.entityCache[childId] =
							  that.options.model.getChild(childId);
					}
					return that.options._cb.options.entityCache[childId];
				}

				if (that.options.filter(childId, getChild)) {
					childrenToDisplay.push(getChild());
				}
			});

			//// (re)layout the tiles
			that.element.children().empty(); // TODO: maintain reference to tile elements
			that.element.empty();
			var rows = Math.round(Math.sqrt(childrenToDisplay.length));
			var columns = Math.ceil(childrenToDisplay.length / rows);
			while (rows--) {
				var row = $('<div/>').addClass('tilerow').appendTo(that.element);
				for (var column = 0; column < columns && childrenToDisplay.length > 0; column += 1) {
					var tile = $('<div/>').tile({
						filter: that.options.filter,
						model: childrenToDisplay.pop(),
						tileSpacing: that.options.tileSpacing,
						_cb: that.options._cb
					}).appendTo(row).nestedFlexGrow(1).tile('instance');
					tile.one('destroy', tile.destroy.bind(tile));
				}
			}
		}

		// // // // // // // // // // // // // // // // // // // // // // // //

	});

	////////////////////////////////////////////////////////////////////////////////////////////////

	CSS('.circuitboard .tile')
		  .addRule('margin', 0)
		  .addRule('padding', 0)
		  .addRule('width', 0);
	CSS('.tile:last-child') // to overwrite tile spacing
		  .addRule('margin-right', 0, true);

	$.widget("apinatomy.tile", {
		options: {
			cssClass: "tile",
			filter: returns(true),
			model: null,
			tileSpacing: 0,
			_cb: null
		},

		_tilemap: null,

		// // // // // // // // // // // // // // // // // // // // // // // //

		_create: function () {
			var that = this;

			//// make this object capable of handling signals
			signalHandlerMixin.call(that, that);

			//// make the model available outside the 'options'
			Object.defineProperty(that, 'model', {
				get: function () {
					return that.options.model;
				}
			});

			//// Creates the mouse-related events on this tile object
			$.each(['click', 'mouseover', 'mouseout'], function (index, signal) {
				that.element.on(signal, function (event) {
					event.stopPropagation();
					that.trigger(signal, event);
				});
			});

			//// css
			that.element.addClass(that.options.cssClass);
			that.one('destroy', function () {
				that.element.removeClass(that.options.cssClass);
			});
			that.element.addClass('active');

			//// inform circuitboard of new tile
			that.options._cb._registerTile(that);

			//// create the 'weight' property
			that._weight = 1;
			Object.defineProperty(that, 'weight', {
				get: function () {
					return this._weight;
				},
				set: function (newWeight) {
					this._weight = newWeight;
					this.element.nestedFlexGrow(newWeight);
					// TODO: allow Infinity
				}
			});

			//// create the 'open' property
			that._open = false;
			Object.defineProperty(that, 'open', {
				get: function () {
					return that._open;
				},
				set: function (shouldBeOpen) {
					that._open = shouldBeOpen;
					that.element.toggleClass("open", shouldBeOpen);
					if (shouldBeOpen) {
						that._populateInnerTilemap();
					}
				}
			});

		},
		_destroy: function () {
			this.trigger("destroy");
		},

		// // // // // // // // // // // // // // // // // // // // // // // //

		_populateInnerTilemap: function () {
			if (!this._tilemap) {
				this._tilemap = this.element.tilemap({
					filter: this.options.filter,
					model: this.options.model,
					tileSpacing: this.options.tileSpacing,
					_cb: this.options._cb
				}).tilemap('instance');
				this.one('destroy', this._tilemap.destroy.bind(this._tilemap));
			}
		}

		// // // // // // // // // // // // // // // // // // // // // // // //


	});

	////////////////////////////////////////////////////////////////////////////////////////////////

});


//			//// header and content
//			$('<header>Title</header>').appendTo(that.element).addClass('tile-header');
//			$('<section/>').appendTo(that.element).addClass('tile-content').css('flexGrow', 1);

