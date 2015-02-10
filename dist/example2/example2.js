/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	var $ = __webpack_require__(14);
	var P = __webpack_require__(16);
	var circuitboard = __webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	circuitboard.plugin(['tile-skin', 'tile-click-to-open', 'tile-grow-when-open', 'tile-spacing', 'tile-active']);
	var modelPrototype = {
	  get id() {
	    return this.name;
	  },
	  getChildIds: function() {
	    return this.children || [];
	  },
	  getModels: function(ids) {
	    return getModelsByIds(ids);
	  }
	};
	function bgColor(color) {
	  return {normal: {css: {'&': {
	          backgroundColor: color,
	          borderColor: 'black'
	        }}}};
	}
	var models = {
	  root: {
	    name: 'root',
	    children: ['A', 'B', 'C', 'D', 'E']
	  },
	  A: {
	    name: 'A',
	    children: ['A1', 'A2', 'A3'],
	    tile: bgColor('lightblue')
	  },
	  B: {
	    name: 'B',
	    children: ['B1', 'B2', 'B3'],
	    tile: bgColor('lightgreen')
	  },
	  C: {
	    name: 'C',
	    children: ['C1', 'C2', 'C3']
	  },
	  D: {
	    name: 'D',
	    children: ['D1', 'D2', 'D3']
	  },
	  E: {
	    name: 'E',
	    children: ['E1', 'E2', 'E3']
	  },
	  A1: {
	    name: 'A1',
	    tile: bgColor('orange')
	  },
	  A2: {name: 'A2'},
	  A3: {name: 'A3'},
	  B1: {name: 'B1'},
	  B2: {name: 'B2'},
	  B3: {name: 'B3'},
	  C1: {name: 'C1'},
	  C2: {name: 'C2'},
	  C3: {name: 'C3'},
	  D1: {name: 'D1'},
	  D2: {name: 'D2'},
	  D3: {name: 'D3'},
	  E1: {name: 'E1'},
	  E2: {name: 'E2'},
	  E3: {name: 'E3'}
	};
	function getModelsByIds(ids) {
	  var result = [];
	  ids.forEach(function(id) {
	    var model = Object.create(modelPrototype);
	    Object.keys(models[id]).forEach(function(key) {
	      model[key] = models[id][key];
	    });
	    result.push(P.resolve(model));
	  });
	  return result;
	}
	$(document).ready(function() {
	  $('#circuitboard').circuitboard({
	    model: getModelsByIds(['root'])[0],
	    tileSpacing: 4,
	    tilemapMargin: 4
	  }).circuitboard('instance').then(function(circuitboard) {
	    console.info('circuitboard loaded');
	  });
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(28), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, plugin) {
	  'use strict';
	  $.circuitboard = {plugin: plugin};
	  var CircuitboardP = newWidgetType('Circuitboard', {
	    cssClass: "circuitboard",
	    filter: (function() {
	      return P.resolve(true);
	    })
	  });
	  var TilemapP = newWidgetType('Tilemap', {cssClass: "tilemap"});
	  var TileP = newWidgetType('Tile', {cssClass: "tile"});
	  CircuitboardP.then((function(c) {
	    $.circuitboard.Circuitboard = c;
	  }));
	  TilemapP.then((function(c) {
	    $.circuitboard.Tilemap = c;
	  }));
	  TileP.then((function(c) {
	    $.circuitboard.Tile = c;
	  }));
	  return $.circuitboard;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, defer) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'core',
	    if: true
	  });
	  plugin.modify('Circuitboard.prototype').add('_registerTile', function _registerTile(tile) {
	    U.getDef(this._p_circuitboardCore_tilesByModelId, tile.model.id, defer).resolve(tile);
	  }).add('allTiles', function() {
	    var $__0 = this;
	    var tiles = {};
	    Object.keys(this._p_circuitboardCore_tilesByModelId).forEach((function(id) {
	      tiles[id] = $__0._p_circuitboardCore_tilesByModelId[id].promise;
	    }));
	    return tiles;
	  }).add('tile', function(tileSelector) {
	    return U.getDef(this._p_circuitboardCore_tilesByModelId, tileSelector, defer).promise;
	  }).add('construct', function() {
	    this._p_circuitboardCore_tilesByModelId = {};
	    $('<div/>').appendTo(this.element).css('flex-grow', 1).tilemap({
	      model: this.options.model,
	      parent: this
	    }).tilemap('instance');
	  });
	  plugin.modify('Tilemap.prototype').add('refreshTiles', function() {
	    var $__0 = this;
	    U.assert(U.isDefined(this.model), "An ApiNATOMY tilemap should have a model.");
	    return P.resolve(this.model).call('getChildIds').map((function(id) {
	      return P.resolve($__0.circuitboard.options.filter(id, U.bind(P.resolve($__0.model).value(), 'getModels', id))).then((function(show) {
	        return {
	          id: id,
	          show: show
	        };
	      }));
	    })).filter(U.field('show')).map(U.field('id')).then((function(ids) {
	      return P.resolve($__0.model).value().getModels(ids);
	    })).then((function(childrenToDisplay) {
	      $__0.element.children().empty();
	      $__0.element.empty();
	      $__0._p_tilemapCore_tiles = [];
	      var rowCount = Math.floor(Math.sqrt(childrenToDisplay.length));
	      var colCount = Math.ceil(childrenToDisplay.length / rowCount);
	      while (rowCount--) {
	        var row = $('<div/>').addClass('tilerow').appendTo($__0.element);
	        for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
	          $('<div/>').tile({
	            model: childrenToDisplay.shift(),
	            parent: $__0
	          }).appendTo(row).amyNestedFlexGrow(1);
	        }
	      }
	    })).then((function() {
	      $__0.trigger('tiles-refreshed');
	    }));
	  }).add('construct', function() {
	    var $__0 = this;
	    this.newEvent('tiles-refreshed');
	    this._p_tilemapCore_tiles = null;
	    Object.defineProperty(this, 'tiles', {get: (function() {
	        return $__0._p_tilemapCore_tiles;
	      })});
	    this.refreshTiles();
	  });
	  plugin.modify('Tile.prototype').add('populateInnerTilemap', function populateInnerTilemap() {
	    if (!this._p_tileCore_tilemap) {
	      this._p_tileCore_tilemap = this.dom.tilemap({
	        model: this.options.model,
	        parent: this
	      }).tilemap('instance');
	    }
	  }).add('construct', function() {
	    var $__0 = this;
	    this._p_tileCore_tilemap = null;
	    ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((function(event) {
	      $__0.newEvent(event, {source: $__0.element.asEventStream(event)});
	    }));
	    this.newEvent('click', {source: this.element.mouseClick({threshold: this.circuitboard.options.dragTheshold})});
	    this.dom = this.element;
	    this.element.attr('id', this.id);
	    this.circuitboard._registerTile(this);
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(37), __webpack_require__(30), __webpack_require__(33), __webpack_require__(34), __webpack_require__(35), __webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, color, U, Bacon, defaults) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-skin',
	    requires: ['tile-open', 'position-tracking']
	  }).modify('Tile.prototype');
	  var applyStyleDefaults = defaults({
	    '&': {
	      backgroundColor: " 'white'                                                                ",
	      borderColor: " color(`['&'].backgroundColor`).brighten(20).css()                      ",
	      color: " color(`['&'].backgroundColor`).luminance() > 0.5 && 'black' || 'white' "
	    },
	    '& > header': {borderColor: " `['&'].borderColor` "},
	    '& > icon-btn': {backgroundColor: " `['&'].backgroundColor` "}
	  }, {color: color});
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    var origElement = this.dom;
	    origElement.addClass('skinned-tile');
	    this._p_tileSkin_headerElement = $("<header/>").appendTo(origElement);
	    this.dom = $("<section/>").appendTo(origElement);
	    this.model.get('name').then((function(name) {
	      $__0._p_tileSkin_headerElement.text(name);
	    }));
	    this.model.get('tile').get('normal').get('css').then((function(css) {
	      $__0.element.amyPutCssRules(applyStyleDefaults(css));
	    })).catch((function() {}));
	    this.on('size').filter(this.on('open').not()).onValue((function(size) {
	      $__0._p_tileSkin_headerElement.css('fontSize', Math.min(0.2 * Math.pow(size.height, 1.01), 0.13 * Math.pow(size.width, 1.01)));
	    }));
	    this.newProperty('headerSize', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('size').changes(), this.on('open').changes()]).map((function() {
	      return new U.Size($__0._p_tileSkin_headerElement.height(), $__0.size.width);
	    })));
	    this.newProperty('headerPosition', {settable: false}).addSource(this.on('position'));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-spacing',
	    requires: ['core']
	  }).modify('Tilemap.prototype');
	  plugin.add('refreshTileSpacing', function() {
	    this.element.css('margin', this.circuitboard.options.tilemapMargin);
	    this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
	    this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
	  });
	  plugin.after('refreshTiles', function() {
	    this.refreshTileSpacing();
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(36), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, $__1) {
	  'use strict';
	  var button = $__1.button;
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-click-to-open',
	    requires: ['tile-open']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this.on('click').which(button.LEFT).skipPropagation('tile-left-click').onValue((function() {
	      $__0.open = !$__0.open;
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-weight',
	    requires: ['core']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    this.newProperty('weight', {initial: 1});
	    this.on('weight').assign(this.element, 'amyNestedFlexGrow');
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(30)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-active',
	    requires: ['core']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    if (!this.model) {
	      return;
	    }
	    this.newProperty('active', {initial: false});
	    var _activateProperTile = (function() {
	      var tiles = $__0.model._p_amyActiveTileQueue;
	      if (tiles[1]) {
	        tiles[1].active = false;
	      }
	      if (tiles[0]) {
	        tiles[0].active = true;
	      }
	    });
	    U.array(this.model, '_p_amyActiveTileQueue').push(this);
	    _activateProperTile();
	    this.on('destroy').take(1).onValue((function() {
	      var index = $__0.model._p_amyActiveTileQueue.indexOf($__0);
	      $__0.model._p_amyActiveTileQueue.splice(index, 1);
	      _activateProperTile();
	    }));
	    this.on('active').value(true).onValue((function() {
	      var index = $__0.model._p_amyActiveTileQueue.indexOf($__0);
	      if (index !== 0) {
	        $__0.model._p_amyActiveTileQueue.splice(index, 1);
	        $__0.model._p_amyActiveTileQueue.unshift($__0);
	        _activateProperTile();
	      }
	    }));
	    this.on('active').assign(this.element, 'toggleClass', 'active');
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-open',
	    requires: ['core']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this.newProperty('open', {initial: false});
	    this.on('open').value(true).take(1).assign(this, 'populateInnerTilemap');
	    this.on('open').assign(this.element, 'toggleClass', 'open');
	    this.on('open').value(false).onValue((function() {
	      $__0.closestDescendantsByType('tile').forEach((function(tile) {
	        tile.open = false;
	      }));
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-grow-when-open',
	    requires: ['tile-open', 'tile-weight']
	  }).modify('Tile.prototype');
	  plugin.add('weightWhenOpen', function() {
	    return this.circuitboard.options.weightWhenOpen || 2;
	  });
	  plugin.add('weightWhenClosed', (function() {
	    return 1;
	  }));
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this.on('open').onValue((function(open) {
	      if (open) {
	        $__0.weight = $__0.weightWhenOpen();
	      } else if ($__0.weight !== 0) {
	        $__0.weight = $__0.weightWhenClosed();
	      }
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(30)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-open-active',
	    resolves: ['tile-open', 'tile-active']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    if (U.isUndefined(this.active)) {
	      return;
	    }
	    this.on('open').value(true).onValue((function() {
	      $__0.active = true;
	    }));
	    this.on('active').value(false).onValue((function() {
	      $__0.open = false;
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(33), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, Bacon) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-skin-grow-when-open',
	    resolves: ['tile-skin', 'tile-grow-when-open']
	  }).modify('Tile.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    var sectionElement = this.element.children('section');
	    this.on('open').onValue((function(open) {
	      if (open) {
	        setTimeout((function() {
	          sectionElement.css('opacity', 0);
	          $__0.element.asEventStream('transitionend webkitTransitionEnd').merge(Bacon.later(300)).take(1).onValue((function() {
	            sectionElement.css('visibility', 'visible');
	            sectionElement.css('opacity', 1);
	          }));
	        }));
	      } else {
	        sectionElement.css('visibility', 'hidden');
	        sectionElement.css('opacity', 0);
	      }
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(30), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'position-tracking',
	    expects: ['core', 'tile-weight']
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    this.newEvent('reset-positioning');
	  });
	  plugin.add('Circuitboard.prototype._posTrackingWindow', function(window) {
	    window();
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    this._posTrackingLimiter = Bacon.limiter(Bacon.mergeAll([Bacon.once(), Bacon.interval(100)]), this._posTrackingWindow.bind(this));
	  });
	  function catchUp() {
	    return Bacon.once().concat(Bacon.later(10)).concat(Bacon.later(50)).concat(Bacon.later(100)).concat(Bacon.later(500));
	  }
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).addSource(Bacon.mergeAll([Bacon.once(), Bacon.interval(1000)]).flatMapLatest(catchUp).limitedBy(this._posTrackingLimiter).map((function() {
	      return $__0.element.offset();
	    })));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.parent.on('size').changes(), this.parent.on('offset').changes()]).flatMapLatest(catchUp).limitedBy(this.circuitboard._posTrackingLimiter).map((function() {
	      return $__0.element.offset();
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('offset', {
	      settable: false,
	      isEqual: U.Position.equals,
	      initial: this.element.offset()
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.parent.on('size').changes(), this.parent.on('offset').changes(), this.parent.on('reorganize'), this.on('weight').changes(), this.on('reset-positioning')]).flatMapLatest(catchUp).limitedBy(this.circuitboard._posTrackingLimiter).map((function() {
	      return $__0.element.offset();
	    })));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    this.newProperty('position', {
	      settable: false,
	      initial: new U.Position(0, 0)
	    });
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position', {
	      settable: false,
	      isEqual: U.Position.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('offset').changes(), this.circuitboard.on('offset').changes()]).flatMapLatest(catchUp).map((function() {
	      return U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('position', {
	      settable: false,
	      isEqual: U.Position.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('offset').changes(), this.circuitboard.on('offset').changes()]).flatMapLatest(catchUp).map((function() {
	      return U.Position.subtract($__0.offset, $__0.circuitboard.offset);
	    })));
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.options.resizeEvent || $(window).asEventStream('resize')]).flatMapLatest(catchUp).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  }).insert('Tilemap.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.parent.on('size').changes()]).flatMapLatest(catchUp).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('size', {
	      settable: false,
	      isEqual: U.Size.equals
	    }).addSource(Bacon.mergeAll([Bacon.once(), this.on('weight').changes(), this.parent.on('size').changes(), this.parent.on('reorganize'), this.on('reset-positioning')]).flatMapLatest(catchUp).map((function() {
	      return new U.Size($__0.element.height(), $__0.element.width());
	    })));
	  });
	  plugin.insert('Tilemap.prototype.construct', function() {
	    this.newEvent('reorganize');
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.on('size').onValue((function() {
	      $__0.parent.trigger('reorganize');
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(33), __webpack_require__(30)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, Bacon) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'transition-position-tracking',
	    resolves: ['position-tracking', 'tile-grow-when-open']
	  });
	  plugin.insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.on('weight').changes().flatMapLatest((function() {
	      return Bacon.animationFrames().takeUntil($__0.element.asEventStream('transitionend webkitTransitionEnd').merge(Bacon.later(300)));
	    })).onValue((function() {
	      $__0.trigger('reset-positioning');
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(15);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(global, factory) {
	  if (typeof module === "object" && typeof module.exports === "object") {
	    module.exports = global.document ? factory(global, true) : function(w) {
	      if (!w.document) {
	        throw new Error("jQuery requires a window with a document");
	      }
	      return factory(w);
	    };
	  } else {
	    factory(global);
	  }
	}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	  var arr = [];
	  var slice = arr.slice;
	  var concat = arr.concat;
	  var push = arr.push;
	  var indexOf = arr.indexOf;
	  var class2type = {};
	  var toString = class2type.toString;
	  var hasOwn = class2type.hasOwnProperty;
	  var support = {};
	  var document = window.document,
	      version = "2.1.3",
	      jQuery = function(selector, context) {
	        return new jQuery.fn.init(selector, context);
	      },
	      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      rmsPrefix = /^-ms-/,
	      rdashAlpha = /-([\da-z])/gi,
	      fcamelCase = function(all, letter) {
	        return letter.toUpperCase();
	      };
	  jQuery.fn = jQuery.prototype = {
	    jquery: version,
	    constructor: jQuery,
	    selector: "",
	    length: 0,
	    toArray: function() {
	      return slice.call(this);
	    },
	    get: function(num) {
	      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
	    },
	    pushStack: function(elems) {
	      var ret = jQuery.merge(this.constructor(), elems);
	      ret.prevObject = this;
	      ret.context = this.context;
	      return ret;
	    },
	    each: function(callback, args) {
	      return jQuery.each(this, callback, args);
	    },
	    map: function(callback) {
	      return this.pushStack(jQuery.map(this, function(elem, i) {
	        return callback.call(elem, i, elem);
	      }));
	    },
	    slice: function() {
	      return this.pushStack(slice.apply(this, arguments));
	    },
	    first: function() {
	      return this.eq(0);
	    },
	    last: function() {
	      return this.eq(-1);
	    },
	    eq: function(i) {
	      var len = this.length,
	          j = +i + (i < 0 ? len : 0);
	      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	    },
	    end: function() {
	      return this.prevObject || this.constructor(null);
	    },
	    push: push,
	    sort: arr.sort,
	    splice: arr.splice
	  };
	  jQuery.extend = jQuery.fn.extend = function() {
	    var options,
	        name,
	        src,
	        copy,
	        copyIsArray,
	        clone,
	        target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        deep = false;
	    if (typeof target === "boolean") {
	      deep = target;
	      target = arguments[i] || {};
	      i++;
	    }
	    if (typeof target !== "object" && !jQuery.isFunction(target)) {
	      target = {};
	    }
	    if (i === length) {
	      target = this;
	      i--;
	    }
	    for (; i < length; i++) {
	      if ((options = arguments[i]) != null) {
	        for (name in options) {
	          src = target[name];
	          copy = options[name];
	          if (target === copy) {
	            continue;
	          }
	          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
	            if (copyIsArray) {
	              copyIsArray = false;
	              clone = src && jQuery.isArray(src) ? src : [];
	            } else {
	              clone = src && jQuery.isPlainObject(src) ? src : {};
	            }
	            target[name] = jQuery.extend(deep, clone, copy);
	          } else if (copy !== undefined) {
	            target[name] = copy;
	          }
	        }
	      }
	    }
	    return target;
	  };
	  jQuery.extend({
	    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
	    isReady: true,
	    error: function(msg) {
	      throw new Error(msg);
	    },
	    noop: function() {},
	    isFunction: function(obj) {
	      return jQuery.type(obj) === "function";
	    },
	    isArray: Array.isArray,
	    isWindow: function(obj) {
	      return obj != null && obj === obj.window;
	    },
	    isNumeric: function(obj) {
	      return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
	    },
	    isPlainObject: function(obj) {
	      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
	        return false;
	      }
	      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	        return false;
	      }
	      return true;
	    },
	    isEmptyObject: function(obj) {
	      var name;
	      for (name in obj) {
	        return false;
	      }
	      return true;
	    },
	    type: function(obj) {
	      if (obj == null) {
	        return obj + "";
	      }
	      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	    },
	    globalEval: function(code) {
	      var script,
	          indirect = eval;
	      code = jQuery.trim(code);
	      if (code) {
	        if (code.indexOf("use strict") === 1) {
	          script = document.createElement("script");
	          script.text = code;
	          document.head.appendChild(script).parentNode.removeChild(script);
	        } else {
	          indirect(code);
	        }
	      }
	    },
	    camelCase: function(string) {
	      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	    },
	    nodeName: function(elem, name) {
	      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	    },
	    each: function(obj, callback, args) {
	      var value,
	          i = 0,
	          length = obj.length,
	          isArray = isArraylike(obj);
	      if (args) {
	        if (isArray) {
	          for (; i < length; i++) {
	            value = callback.apply(obj[i], args);
	            if (value === false) {
	              break;
	            }
	          }
	        } else {
	          for (i in obj) {
	            value = callback.apply(obj[i], args);
	            if (value === false) {
	              break;
	            }
	          }
	        }
	      } else {
	        if (isArray) {
	          for (; i < length; i++) {
	            value = callback.call(obj[i], i, obj[i]);
	            if (value === false) {
	              break;
	            }
	          }
	        } else {
	          for (i in obj) {
	            value = callback.call(obj[i], i, obj[i]);
	            if (value === false) {
	              break;
	            }
	          }
	        }
	      }
	      return obj;
	    },
	    trim: function(text) {
	      return text == null ? "" : (text + "").replace(rtrim, "");
	    },
	    makeArray: function(arr, results) {
	      var ret = results || [];
	      if (arr != null) {
	        if (isArraylike(Object(arr))) {
	          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
	        } else {
	          push.call(ret, arr);
	        }
	      }
	      return ret;
	    },
	    inArray: function(elem, arr, i) {
	      return arr == null ? -1 : indexOf.call(arr, elem, i);
	    },
	    merge: function(first, second) {
	      var len = +second.length,
	          j = 0,
	          i = first.length;
	      for (; j < len; j++) {
	        first[i++] = second[j];
	      }
	      first.length = i;
	      return first;
	    },
	    grep: function(elems, callback, invert) {
	      var callbackInverse,
	          matches = [],
	          i = 0,
	          length = elems.length,
	          callbackExpect = !invert;
	      for (; i < length; i++) {
	        callbackInverse = !callback(elems[i], i);
	        if (callbackInverse !== callbackExpect) {
	          matches.push(elems[i]);
	        }
	      }
	      return matches;
	    },
	    map: function(elems, callback, arg) {
	      var value,
	          i = 0,
	          length = elems.length,
	          isArray = isArraylike(elems),
	          ret = [];
	      if (isArray) {
	        for (; i < length; i++) {
	          value = callback(elems[i], i, arg);
	          if (value != null) {
	            ret.push(value);
	          }
	        }
	      } else {
	        for (i in elems) {
	          value = callback(elems[i], i, arg);
	          if (value != null) {
	            ret.push(value);
	          }
	        }
	      }
	      return concat.apply([], ret);
	    },
	    guid: 1,
	    proxy: function(fn, context) {
	      var tmp,
	          args,
	          proxy;
	      if (typeof context === "string") {
	        tmp = fn[context];
	        context = fn;
	        fn = tmp;
	      }
	      if (!jQuery.isFunction(fn)) {
	        return undefined;
	      }
	      args = slice.call(arguments, 2);
	      proxy = function() {
	        return fn.apply(context || this, args.concat(slice.call(arguments)));
	      };
	      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	      return proxy;
	    },
	    now: Date.now,
	    support: support
	  });
	  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type["[object " + name + "]"] = name.toLowerCase();
	  });
	  function isArraylike(obj) {
	    var length = obj.length,
	        type = jQuery.type(obj);
	    if (type === "function" || jQuery.isWindow(obj)) {
	      return false;
	    }
	    if (obj.nodeType === 1 && length) {
	      return true;
	    }
	    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
	  }
	  var Sizzle = (function(window) {
	    var i,
	        support,
	        Expr,
	        getText,
	        isXML,
	        tokenize,
	        compile,
	        select,
	        outermostContext,
	        sortInput,
	        hasDuplicate,
	        setDocument,
	        document,
	        docElem,
	        documentIsHTML,
	        rbuggyQSA,
	        rbuggyMatches,
	        matches,
	        contains,
	        expando = "sizzle" + 1 * new Date(),
	        preferredDoc = window.document,
	        dirruns = 0,
	        done = 0,
	        classCache = createCache(),
	        tokenCache = createCache(),
	        compilerCache = createCache(),
	        sortOrder = function(a, b) {
	          if (a === b) {
	            hasDuplicate = true;
	          }
	          return 0;
	        },
	        MAX_NEGATIVE = 1 << 31,
	        hasOwn = ({}).hasOwnProperty,
	        arr = [],
	        pop = arr.pop,
	        push_native = arr.push,
	        push = arr.push,
	        slice = arr.slice,
	        indexOf = function(list, elem) {
	          var i = 0,
	              len = list.length;
	          for (; i < len; i++) {
	            if (list[i] === elem) {
	              return i;
	            }
	          }
	          return -1;
	        },
	        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	        whitespace = "[\\x20\\t\\r\\n\\f]",
	        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	        identifier = characterEncoding.replace("w", "w#"),
	        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	        pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
	        rwhitespace = new RegExp(whitespace + "+", "g"),
	        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
	        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
	        rpseudo = new RegExp(pseudos),
	        ridentifier = new RegExp("^" + identifier + "$"),
	        matchExpr = {
	          "ID": new RegExp("^#(" + characterEncoding + ")"),
	          "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
	          "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
	          "ATTR": new RegExp("^" + attributes),
	          "PSEUDO": new RegExp("^" + pseudos),
	          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
	          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
	          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	        },
	        rinputs = /^(?:input|select|textarea|button)$/i,
	        rheader = /^h\d$/i,
	        rnative = /^[^{]+\{\s*\[native \w/,
	        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        rsibling = /[+~]/,
	        rescape = /'|\\/g,
	        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
	        funescape = function(_, escaped, escapedWhitespace) {
	          var high = "0x" + escaped - 0x10000;
	          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	        },
	        unloadHandler = function() {
	          setDocument();
	        };
	    try {
	      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
	      arr[preferredDoc.childNodes.length].nodeType;
	    } catch (e) {
	      push = {apply: arr.length ? function(target, els) {
	          push_native.apply(target, slice.call(els));
	        } : function(target, els) {
	          var j = target.length,
	              i = 0;
	          while ((target[j++] = els[i++])) {}
	          target.length = j - 1;
	        }};
	    }
	    function Sizzle(selector, context, results, seed) {
	      var match,
	          elem,
	          m,
	          nodeType,
	          i,
	          groups,
	          old,
	          nid,
	          newContext,
	          newSelector;
	      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
	        setDocument(context);
	      }
	      context = context || document;
	      results = results || [];
	      nodeType = context.nodeType;
	      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
	        return results;
	      }
	      if (!seed && documentIsHTML) {
	        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
	          if ((m = match[1])) {
	            if (nodeType === 9) {
	              elem = context.getElementById(m);
	              if (elem && elem.parentNode) {
	                if (elem.id === m) {
	                  results.push(elem);
	                  return results;
	                }
	              } else {
	                return results;
	              }
	            } else {
	              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
	                results.push(elem);
	                return results;
	              }
	            }
	          } else if (match[2]) {
	            push.apply(results, context.getElementsByTagName(selector));
	            return results;
	          } else if ((m = match[3]) && support.getElementsByClassName) {
	            push.apply(results, context.getElementsByClassName(m));
	            return results;
	          }
	        }
	        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
	          nid = old = expando;
	          newContext = context;
	          newSelector = nodeType !== 1 && selector;
	          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
	            groups = tokenize(selector);
	            if ((old = context.getAttribute("id"))) {
	              nid = old.replace(rescape, "\\$&");
	            } else {
	              context.setAttribute("id", nid);
	            }
	            nid = "[id='" + nid + "'] ";
	            i = groups.length;
	            while (i--) {
	              groups[i] = nid + toSelector(groups[i]);
	            }
	            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
	            newSelector = groups.join(",");
	          }
	          if (newSelector) {
	            try {
	              push.apply(results, newContext.querySelectorAll(newSelector));
	              return results;
	            } catch (qsaError) {} finally {
	              if (!old) {
	                context.removeAttribute("id");
	              }
	            }
	          }
	        }
	      }
	      return select(selector.replace(rtrim, "$1"), context, results, seed);
	    }
	    function createCache() {
	      var keys = [];
	      function cache(key, value) {
	        if (keys.push(key + " ") > Expr.cacheLength) {
	          delete cache[keys.shift()];
	        }
	        return (cache[key + " "] = value);
	      }
	      return cache;
	    }
	    function markFunction(fn) {
	      fn[expando] = true;
	      return fn;
	    }
	    function assert(fn) {
	      var div = document.createElement("div");
	      try {
	        return !!fn(div);
	      } catch (e) {
	        return false;
	      } finally {
	        if (div.parentNode) {
	          div.parentNode.removeChild(div);
	        }
	        div = null;
	      }
	    }
	    function addHandle(attrs, handler) {
	      var arr = attrs.split("|"),
	          i = attrs.length;
	      while (i--) {
	        Expr.attrHandle[arr[i]] = handler;
	      }
	    }
	    function siblingCheck(a, b) {
	      var cur = b && a,
	          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
	      if (diff) {
	        return diff;
	      }
	      if (cur) {
	        while ((cur = cur.nextSibling)) {
	          if (cur === b) {
	            return -1;
	          }
	        }
	      }
	      return a ? 1 : -1;
	    }
	    function createInputPseudo(type) {
	      return function(elem) {
	        var name = elem.nodeName.toLowerCase();
	        return name === "input" && elem.type === type;
	      };
	    }
	    function createButtonPseudo(type) {
	      return function(elem) {
	        var name = elem.nodeName.toLowerCase();
	        return (name === "input" || name === "button") && elem.type === type;
	      };
	    }
	    function createPositionalPseudo(fn) {
	      return markFunction(function(argument) {
	        argument = +argument;
	        return markFunction(function(seed, matches) {
	          var j,
	              matchIndexes = fn([], seed.length, argument),
	              i = matchIndexes.length;
	          while (i--) {
	            if (seed[(j = matchIndexes[i])]) {
	              seed[j] = !(matches[j] = seed[j]);
	            }
	          }
	        });
	      });
	    }
	    function testContext(context) {
	      return context && typeof context.getElementsByTagName !== "undefined" && context;
	    }
	    support = Sizzle.support = {};
	    isXML = Sizzle.isXML = function(elem) {
	      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	      return documentElement ? documentElement.nodeName !== "HTML" : false;
	    };
	    setDocument = Sizzle.setDocument = function(node) {
	      var hasCompare,
	          parent,
	          doc = node ? node.ownerDocument || node : preferredDoc;
	      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
	        return document;
	      }
	      document = doc;
	      docElem = doc.documentElement;
	      parent = doc.defaultView;
	      if (parent && parent !== parent.top) {
	        if (parent.addEventListener) {
	          parent.addEventListener("unload", unloadHandler, false);
	        } else if (parent.attachEvent) {
	          parent.attachEvent("onunload", unloadHandler);
	        }
	      }
	      documentIsHTML = !isXML(doc);
	      support.attributes = assert(function(div) {
	        div.className = "i";
	        return !div.getAttribute("className");
	      });
	      support.getElementsByTagName = assert(function(div) {
	        div.appendChild(doc.createComment(""));
	        return !div.getElementsByTagName("*").length;
	      });
	      support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
	      support.getById = assert(function(div) {
	        docElem.appendChild(div).id = expando;
	        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
	      });
	      if (support.getById) {
	        Expr.find["ID"] = function(id, context) {
	          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
	            var m = context.getElementById(id);
	            return m && m.parentNode ? [m] : [];
	          }
	        };
	        Expr.filter["ID"] = function(id) {
	          var attrId = id.replace(runescape, funescape);
	          return function(elem) {
	            return elem.getAttribute("id") === attrId;
	          };
	        };
	      } else {
	        delete Expr.find["ID"];
	        Expr.filter["ID"] = function(id) {
	          var attrId = id.replace(runescape, funescape);
	          return function(elem) {
	            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
	            return node && node.value === attrId;
	          };
	        };
	      }
	      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
	        if (typeof context.getElementsByTagName !== "undefined") {
	          return context.getElementsByTagName(tag);
	        } else if (support.qsa) {
	          return context.querySelectorAll(tag);
	        }
	      } : function(tag, context) {
	        var elem,
	            tmp = [],
	            i = 0,
	            results = context.getElementsByTagName(tag);
	        if (tag === "*") {
	          while ((elem = results[i++])) {
	            if (elem.nodeType === 1) {
	              tmp.push(elem);
	            }
	          }
	          return tmp;
	        }
	        return results;
	      };
	      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
	        if (documentIsHTML) {
	          return context.getElementsByClassName(className);
	        }
	      };
	      rbuggyMatches = [];
	      rbuggyQSA = [];
	      if ((support.qsa = rnative.test(doc.querySelectorAll))) {
	        assert(function(div) {
	          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
	          if (div.querySelectorAll("[msallowcapture^='']").length) {
	            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
	          }
	          if (!div.querySelectorAll("[selected]").length) {
	            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
	          }
	          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
	            rbuggyQSA.push("~=");
	          }
	          if (!div.querySelectorAll(":checked").length) {
	            rbuggyQSA.push(":checked");
	          }
	          if (!div.querySelectorAll("a#" + expando + "+*").length) {
	            rbuggyQSA.push(".#.+[+~]");
	          }
	        });
	        assert(function(div) {
	          var input = doc.createElement("input");
	          input.setAttribute("type", "hidden");
	          div.appendChild(input).setAttribute("name", "D");
	          if (div.querySelectorAll("[name=d]").length) {
	            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
	          }
	          if (!div.querySelectorAll(":enabled").length) {
	            rbuggyQSA.push(":enabled", ":disabled");
	          }
	          div.querySelectorAll("*,:x");
	          rbuggyQSA.push(",.*:");
	        });
	      }
	      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
	        assert(function(div) {
	          support.disconnectedMatch = matches.call(div, "div");
	          matches.call(div, "[s!='']:x");
	          rbuggyMatches.push("!=", pseudos);
	        });
	      }
	      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
	      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
	      hasCompare = rnative.test(docElem.compareDocumentPosition);
	      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
	        var adown = a.nodeType === 9 ? a.documentElement : a,
	            bup = b && b.parentNode;
	        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	      } : function(a, b) {
	        if (b) {
	          while ((b = b.parentNode)) {
	            if (b === a) {
	              return true;
	            }
	          }
	        }
	        return false;
	      };
	      sortOrder = hasCompare ? function(a, b) {
	        if (a === b) {
	          hasDuplicate = true;
	          return 0;
	        }
	        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	        if (compare) {
	          return compare;
	        }
	        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
	        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
	          if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
	            return -1;
	          }
	          if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
	            return 1;
	          }
	          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
	        }
	        return compare & 4 ? -1 : 1;
	      } : function(a, b) {
	        if (a === b) {
	          hasDuplicate = true;
	          return 0;
	        }
	        var cur,
	            i = 0,
	            aup = a.parentNode,
	            bup = b.parentNode,
	            ap = [a],
	            bp = [b];
	        if (!aup || !bup) {
	          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
	        } else if (aup === bup) {
	          return siblingCheck(a, b);
	        }
	        cur = a;
	        while ((cur = cur.parentNode)) {
	          ap.unshift(cur);
	        }
	        cur = b;
	        while ((cur = cur.parentNode)) {
	          bp.unshift(cur);
	        }
	        while (ap[i] === bp[i]) {
	          i++;
	        }
	        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
	      };
	      return doc;
	    };
	    Sizzle.matches = function(expr, elements) {
	      return Sizzle(expr, null, null, elements);
	    };
	    Sizzle.matchesSelector = function(elem, expr) {
	      if ((elem.ownerDocument || elem) !== document) {
	        setDocument(elem);
	      }
	      expr = expr.replace(rattributeQuotes, "='$1']");
	      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
	        try {
	          var ret = matches.call(elem, expr);
	          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
	            return ret;
	          }
	        } catch (e) {}
	      }
	      return Sizzle(expr, document, null, [elem]).length > 0;
	    };
	    Sizzle.contains = function(context, elem) {
	      if ((context.ownerDocument || context) !== document) {
	        setDocument(context);
	      }
	      return contains(context, elem);
	    };
	    Sizzle.attr = function(elem, name) {
	      if ((elem.ownerDocument || elem) !== document) {
	        setDocument(elem);
	      }
	      var fn = Expr.attrHandle[name.toLowerCase()],
	          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
	      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	    };
	    Sizzle.error = function(msg) {
	      throw new Error("Syntax error, unrecognized expression: " + msg);
	    };
	    Sizzle.uniqueSort = function(results) {
	      var elem,
	          duplicates = [],
	          j = 0,
	          i = 0;
	      hasDuplicate = !support.detectDuplicates;
	      sortInput = !support.sortStable && results.slice(0);
	      results.sort(sortOrder);
	      if (hasDuplicate) {
	        while ((elem = results[i++])) {
	          if (elem === results[i]) {
	            j = duplicates.push(i);
	          }
	        }
	        while (j--) {
	          results.splice(duplicates[j], 1);
	        }
	      }
	      sortInput = null;
	      return results;
	    };
	    getText = Sizzle.getText = function(elem) {
	      var node,
	          ret = "",
	          i = 0,
	          nodeType = elem.nodeType;
	      if (!nodeType) {
	        while ((node = elem[i++])) {
	          ret += getText(node);
	        }
	      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	        if (typeof elem.textContent === "string") {
	          return elem.textContent;
	        } else {
	          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	            ret += getText(elem);
	          }
	        }
	      } else if (nodeType === 3 || nodeType === 4) {
	        return elem.nodeValue;
	      }
	      return ret;
	    };
	    Expr = Sizzle.selectors = {
	      cacheLength: 50,
	      createPseudo: markFunction,
	      match: matchExpr,
	      attrHandle: {},
	      find: {},
	      relative: {
	        ">": {
	          dir: "parentNode",
	          first: true
	        },
	        " ": {dir: "parentNode"},
	        "+": {
	          dir: "previousSibling",
	          first: true
	        },
	        "~": {dir: "previousSibling"}
	      },
	      preFilter: {
	        "ATTR": function(match) {
	          match[1] = match[1].replace(runescape, funescape);
	          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
	          if (match[2] === "~=") {
	            match[3] = " " + match[3] + " ";
	          }
	          return match.slice(0, 4);
	        },
	        "CHILD": function(match) {
	          match[1] = match[1].toLowerCase();
	          if (match[1].slice(0, 3) === "nth") {
	            if (!match[3]) {
	              Sizzle.error(match[0]);
	            }
	            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
	            match[5] = +((match[7] + match[8]) || match[3] === "odd");
	          } else if (match[3]) {
	            Sizzle.error(match[0]);
	          }
	          return match;
	        },
	        "PSEUDO": function(match) {
	          var excess,
	              unquoted = !match[6] && match[2];
	          if (matchExpr["CHILD"].test(match[0])) {
	            return null;
	          }
	          if (match[3]) {
	            match[2] = match[4] || match[5] || "";
	          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
	            match[0] = match[0].slice(0, excess);
	            match[2] = unquoted.slice(0, excess);
	          }
	          return match.slice(0, 3);
	        }
	      },
	      filter: {
	        "TAG": function(nodeNameSelector) {
	          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
	          return nodeNameSelector === "*" ? function() {
	            return true;
	          } : function(elem) {
	            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	          };
	        },
	        "CLASS": function(className) {
	          var pattern = classCache[className + " "];
	          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
	            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
	          });
	        },
	        "ATTR": function(name, operator, check) {
	          return function(elem) {
	            var result = Sizzle.attr(elem, name);
	            if (result == null) {
	              return operator === "!=";
	            }
	            if (!operator) {
	              return true;
	            }
	            result += "";
	            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
	          };
	        },
	        "CHILD": function(type, what, argument, first, last) {
	          var simple = type.slice(0, 3) !== "nth",
	              forward = type.slice(-4) !== "last",
	              ofType = what === "of-type";
	          return first === 1 && last === 0 ? function(elem) {
	            return !!elem.parentNode;
	          } : function(elem, context, xml) {
	            var cache,
	                outerCache,
	                node,
	                diff,
	                nodeIndex,
	                start,
	                dir = simple !== forward ? "nextSibling" : "previousSibling",
	                parent = elem.parentNode,
	                name = ofType && elem.nodeName.toLowerCase(),
	                useCache = !xml && !ofType;
	            if (parent) {
	              if (simple) {
	                while (dir) {
	                  node = elem;
	                  while ((node = node[dir])) {
	                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
	                      return false;
	                    }
	                  }
	                  start = dir = type === "only" && !start && "nextSibling";
	                }
	                return true;
	              }
	              start = [forward ? parent.firstChild : parent.lastChild];
	              if (forward && useCache) {
	                outerCache = parent[expando] || (parent[expando] = {});
	                cache = outerCache[type] || [];
	                nodeIndex = cache[0] === dirruns && cache[1];
	                diff = cache[0] === dirruns && cache[2];
	                node = nodeIndex && parent.childNodes[nodeIndex];
	                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
	                  if (node.nodeType === 1 && ++diff && node === elem) {
	                    outerCache[type] = [dirruns, nodeIndex, diff];
	                    break;
	                  }
	                }
	              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
	                diff = cache[1];
	              } else {
	                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
	                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
	                    if (useCache) {
	                      (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
	                    }
	                    if (node === elem) {
	                      break;
	                    }
	                  }
	                }
	              }
	              diff -= last;
	              return diff === first || (diff % first === 0 && diff / first >= 0);
	            }
	          };
	        },
	        "PSEUDO": function(pseudo, argument) {
	          var args,
	              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
	          if (fn[expando]) {
	            return fn(argument);
	          }
	          if (fn.length > 1) {
	            args = [pseudo, pseudo, "", argument];
	            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
	              var idx,
	                  matched = fn(seed, argument),
	                  i = matched.length;
	              while (i--) {
	                idx = indexOf(seed, matched[i]);
	                seed[idx] = !(matches[idx] = matched[i]);
	              }
	            }) : function(elem) {
	              return fn(elem, 0, args);
	            };
	          }
	          return fn;
	        }
	      },
	      pseudos: {
	        "not": markFunction(function(selector) {
	          var input = [],
	              results = [],
	              matcher = compile(selector.replace(rtrim, "$1"));
	          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
	            var elem,
	                unmatched = matcher(seed, null, xml, []),
	                i = seed.length;
	            while (i--) {
	              if ((elem = unmatched[i])) {
	                seed[i] = !(matches[i] = elem);
	              }
	            }
	          }) : function(elem, context, xml) {
	            input[0] = elem;
	            matcher(input, null, xml, results);
	            input[0] = null;
	            return !results.pop();
	          };
	        }),
	        "has": markFunction(function(selector) {
	          return function(elem) {
	            return Sizzle(selector, elem).length > 0;
	          };
	        }),
	        "contains": markFunction(function(text) {
	          text = text.replace(runescape, funescape);
	          return function(elem) {
	            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
	          };
	        }),
	        "lang": markFunction(function(lang) {
	          if (!ridentifier.test(lang || "")) {
	            Sizzle.error("unsupported lang: " + lang);
	          }
	          lang = lang.replace(runescape, funescape).toLowerCase();
	          return function(elem) {
	            var elemLang;
	            do {
	              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
	                elemLang = elemLang.toLowerCase();
	                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
	              }
	            } while ((elem = elem.parentNode) && elem.nodeType === 1);
	            return false;
	          };
	        }),
	        "target": function(elem) {
	          var hash = window.location && window.location.hash;
	          return hash && hash.slice(1) === elem.id;
	        },
	        "root": function(elem) {
	          return elem === docElem;
	        },
	        "focus": function(elem) {
	          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	        },
	        "enabled": function(elem) {
	          return elem.disabled === false;
	        },
	        "disabled": function(elem) {
	          return elem.disabled === true;
	        },
	        "checked": function(elem) {
	          var nodeName = elem.nodeName.toLowerCase();
	          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
	        },
	        "selected": function(elem) {
	          if (elem.parentNode) {
	            elem.parentNode.selectedIndex;
	          }
	          return elem.selected === true;
	        },
	        "empty": function(elem) {
	          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	            if (elem.nodeType < 6) {
	              return false;
	            }
	          }
	          return true;
	        },
	        "parent": function(elem) {
	          return !Expr.pseudos["empty"](elem);
	        },
	        "header": function(elem) {
	          return rheader.test(elem.nodeName);
	        },
	        "input": function(elem) {
	          return rinputs.test(elem.nodeName);
	        },
	        "button": function(elem) {
	          var name = elem.nodeName.toLowerCase();
	          return name === "input" && elem.type === "button" || name === "button";
	        },
	        "text": function(elem) {
	          var attr;
	          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
	        },
	        "first": createPositionalPseudo(function() {
	          return [0];
	        }),
	        "last": createPositionalPseudo(function(matchIndexes, length) {
	          return [length - 1];
	        }),
	        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
	          return [argument < 0 ? argument + length : argument];
	        }),
	        "even": createPositionalPseudo(function(matchIndexes, length) {
	          var i = 0;
	          for (; i < length; i += 2) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        }),
	        "odd": createPositionalPseudo(function(matchIndexes, length) {
	          var i = 1;
	          for (; i < length; i += 2) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        }),
	        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
	          var i = argument < 0 ? argument + length : argument;
	          for (; --i >= 0; ) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        }),
	        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
	          var i = argument < 0 ? argument + length : argument;
	          for (; ++i < length; ) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        })
	      }
	    };
	    Expr.pseudos["nth"] = Expr.pseudos["eq"];
	    for (i in {
	      radio: true,
	      checkbox: true,
	      file: true,
	      password: true,
	      image: true
	    }) {
	      Expr.pseudos[i] = createInputPseudo(i);
	    }
	    for (i in {
	      submit: true,
	      reset: true
	    }) {
	      Expr.pseudos[i] = createButtonPseudo(i);
	    }
	    function setFilters() {}
	    setFilters.prototype = Expr.filters = Expr.pseudos;
	    Expr.setFilters = new setFilters();
	    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
	      var matched,
	          match,
	          tokens,
	          type,
	          soFar,
	          groups,
	          preFilters,
	          cached = tokenCache[selector + " "];
	      if (cached) {
	        return parseOnly ? 0 : cached.slice(0);
	      }
	      soFar = selector;
	      groups = [];
	      preFilters = Expr.preFilter;
	      while (soFar) {
	        if (!matched || (match = rcomma.exec(soFar))) {
	          if (match) {
	            soFar = soFar.slice(match[0].length) || soFar;
	          }
	          groups.push((tokens = []));
	        }
	        matched = false;
	        if ((match = rcombinators.exec(soFar))) {
	          matched = match.shift();
	          tokens.push({
	            value: matched,
	            type: match[0].replace(rtrim, " ")
	          });
	          soFar = soFar.slice(matched.length);
	        }
	        for (type in Expr.filter) {
	          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
	            matched = match.shift();
	            tokens.push({
	              value: matched,
	              type: type,
	              matches: match
	            });
	            soFar = soFar.slice(matched.length);
	          }
	        }
	        if (!matched) {
	          break;
	        }
	      }
	      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
	    };
	    function toSelector(tokens) {
	      var i = 0,
	          len = tokens.length,
	          selector = "";
	      for (; i < len; i++) {
	        selector += tokens[i].value;
	      }
	      return selector;
	    }
	    function addCombinator(matcher, combinator, base) {
	      var dir = combinator.dir,
	          checkNonElements = base && dir === "parentNode",
	          doneName = done++;
	      return combinator.first ? function(elem, context, xml) {
	        while ((elem = elem[dir])) {
	          if (elem.nodeType === 1 || checkNonElements) {
	            return matcher(elem, context, xml);
	          }
	        }
	      } : function(elem, context, xml) {
	        var oldCache,
	            outerCache,
	            newCache = [dirruns, doneName];
	        if (xml) {
	          while ((elem = elem[dir])) {
	            if (elem.nodeType === 1 || checkNonElements) {
	              if (matcher(elem, context, xml)) {
	                return true;
	              }
	            }
	          }
	        } else {
	          while ((elem = elem[dir])) {
	            if (elem.nodeType === 1 || checkNonElements) {
	              outerCache = elem[expando] || (elem[expando] = {});
	              if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
	                return (newCache[2] = oldCache[2]);
	              } else {
	                outerCache[dir] = newCache;
	                if ((newCache[2] = matcher(elem, context, xml))) {
	                  return true;
	                }
	              }
	            }
	          }
	        }
	      };
	    }
	    function elementMatcher(matchers) {
	      return matchers.length > 1 ? function(elem, context, xml) {
	        var i = matchers.length;
	        while (i--) {
	          if (!matchers[i](elem, context, xml)) {
	            return false;
	          }
	        }
	        return true;
	      } : matchers[0];
	    }
	    function multipleContexts(selector, contexts, results) {
	      var i = 0,
	          len = contexts.length;
	      for (; i < len; i++) {
	        Sizzle(selector, contexts[i], results);
	      }
	      return results;
	    }
	    function condense(unmatched, map, filter, context, xml) {
	      var elem,
	          newUnmatched = [],
	          i = 0,
	          len = unmatched.length,
	          mapped = map != null;
	      for (; i < len; i++) {
	        if ((elem = unmatched[i])) {
	          if (!filter || filter(elem, context, xml)) {
	            newUnmatched.push(elem);
	            if (mapped) {
	              map.push(i);
	            }
	          }
	        }
	      }
	      return newUnmatched;
	    }
	    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	      if (postFilter && !postFilter[expando]) {
	        postFilter = setMatcher(postFilter);
	      }
	      if (postFinder && !postFinder[expando]) {
	        postFinder = setMatcher(postFinder, postSelector);
	      }
	      return markFunction(function(seed, results, context, xml) {
	        var temp,
	            i,
	            elem,
	            preMap = [],
	            postMap = [],
	            preexisting = results.length,
	            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
	            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
	            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
	        if (matcher) {
	          matcher(matcherIn, matcherOut, context, xml);
	        }
	        if (postFilter) {
	          temp = condense(matcherOut, postMap);
	          postFilter(temp, [], context, xml);
	          i = temp.length;
	          while (i--) {
	            if ((elem = temp[i])) {
	              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
	            }
	          }
	        }
	        if (seed) {
	          if (postFinder || preFilter) {
	            if (postFinder) {
	              temp = [];
	              i = matcherOut.length;
	              while (i--) {
	                if ((elem = matcherOut[i])) {
	                  temp.push((matcherIn[i] = elem));
	                }
	              }
	              postFinder(null, (matcherOut = []), temp, xml);
	            }
	            i = matcherOut.length;
	            while (i--) {
	              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
	                seed[temp] = !(results[temp] = elem);
	              }
	            }
	          }
	        } else {
	          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
	          if (postFinder) {
	            postFinder(null, results, matcherOut, xml);
	          } else {
	            push.apply(results, matcherOut);
	          }
	        }
	      });
	    }
	    function matcherFromTokens(tokens) {
	      var checkContext,
	          matcher,
	          j,
	          len = tokens.length,
	          leadingRelative = Expr.relative[tokens[0].type],
	          implicitRelative = leadingRelative || Expr.relative[" "],
	          i = leadingRelative ? 1 : 0,
	          matchContext = addCombinator(function(elem) {
	            return elem === checkContext;
	          }, implicitRelative, true),
	          matchAnyContext = addCombinator(function(elem) {
	            return indexOf(checkContext, elem) > -1;
	          }, implicitRelative, true),
	          matchers = [function(elem, context, xml) {
	            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
	            checkContext = null;
	            return ret;
	          }];
	      for (; i < len; i++) {
	        if ((matcher = Expr.relative[tokens[i].type])) {
	          matchers = [addCombinator(elementMatcher(matchers), matcher)];
	        } else {
	          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
	          if (matcher[expando]) {
	            j = ++i;
	            for (; j < len; j++) {
	              if (Expr.relative[tokens[j].type]) {
	                break;
	              }
	            }
	            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
	          }
	          matchers.push(matcher);
	        }
	      }
	      return elementMatcher(matchers);
	    }
	    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	      var bySet = setMatchers.length > 0,
	          byElement = elementMatchers.length > 0,
	          superMatcher = function(seed, context, xml, results, outermost) {
	            var elem,
	                j,
	                matcher,
	                matchedCount = 0,
	                i = "0",
	                unmatched = seed && [],
	                setMatched = [],
	                contextBackup = outermostContext,
	                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
	                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
	                len = elems.length;
	            if (outermost) {
	              outermostContext = context !== document && context;
	            }
	            for (; i !== len && (elem = elems[i]) != null; i++) {
	              if (byElement && elem) {
	                j = 0;
	                while ((matcher = elementMatchers[j++])) {
	                  if (matcher(elem, context, xml)) {
	                    results.push(elem);
	                    break;
	                  }
	                }
	                if (outermost) {
	                  dirruns = dirrunsUnique;
	                }
	              }
	              if (bySet) {
	                if ((elem = !matcher && elem)) {
	                  matchedCount--;
	                }
	                if (seed) {
	                  unmatched.push(elem);
	                }
	              }
	            }
	            matchedCount += i;
	            if (bySet && i !== matchedCount) {
	              j = 0;
	              while ((matcher = setMatchers[j++])) {
	                matcher(unmatched, setMatched, context, xml);
	              }
	              if (seed) {
	                if (matchedCount > 0) {
	                  while (i--) {
	                    if (!(unmatched[i] || setMatched[i])) {
	                      setMatched[i] = pop.call(results);
	                    }
	                  }
	                }
	                setMatched = condense(setMatched);
	              }
	              push.apply(results, setMatched);
	              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
	                Sizzle.uniqueSort(results);
	              }
	            }
	            if (outermost) {
	              dirruns = dirrunsUnique;
	              outermostContext = contextBackup;
	            }
	            return unmatched;
	          };
	      return bySet ? markFunction(superMatcher) : superMatcher;
	    }
	    compile = Sizzle.compile = function(selector, match) {
	      var i,
	          setMatchers = [],
	          elementMatchers = [],
	          cached = compilerCache[selector + " "];
	      if (!cached) {
	        if (!match) {
	          match = tokenize(selector);
	        }
	        i = match.length;
	        while (i--) {
	          cached = matcherFromTokens(match[i]);
	          if (cached[expando]) {
	            setMatchers.push(cached);
	          } else {
	            elementMatchers.push(cached);
	          }
	        }
	        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
	        cached.selector = selector;
	      }
	      return cached;
	    };
	    select = Sizzle.select = function(selector, context, results, seed) {
	      var i,
	          tokens,
	          token,
	          type,
	          find,
	          compiled = typeof selector === "function" && selector,
	          match = !seed && tokenize((selector = compiled.selector || selector));
	      results = results || [];
	      if (match.length === 1) {
	        tokens = match[0] = match[0].slice(0);
	        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
	          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
	          if (!context) {
	            return results;
	          } else if (compiled) {
	            context = context.parentNode;
	          }
	          selector = selector.slice(tokens.shift().value.length);
	        }
	        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
	        while (i--) {
	          token = tokens[i];
	          if (Expr.relative[(type = token.type)]) {
	            break;
	          }
	          if ((find = Expr.find[type])) {
	            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
	              tokens.splice(i, 1);
	              selector = seed.length && toSelector(tokens);
	              if (!selector) {
	                push.apply(results, seed);
	                return results;
	              }
	              break;
	            }
	          }
	        }
	      }
	      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
	      return results;
	    };
	    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
	    support.detectDuplicates = !!hasDuplicate;
	    setDocument();
	    support.sortDetached = assert(function(div1) {
	      return div1.compareDocumentPosition(document.createElement("div")) & 1;
	    });
	    if (!assert(function(div) {
	      div.innerHTML = "<a href='#'></a>";
	      return div.firstChild.getAttribute("href") === "#";
	    })) {
	      addHandle("type|href|height|width", function(elem, name, isXML) {
	        if (!isXML) {
	          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
	        }
	      });
	    }
	    if (!support.attributes || !assert(function(div) {
	      div.innerHTML = "<input/>";
	      div.firstChild.setAttribute("value", "");
	      return div.firstChild.getAttribute("value") === "";
	    })) {
	      addHandle("value", function(elem, name, isXML) {
	        if (!isXML && elem.nodeName.toLowerCase() === "input") {
	          return elem.defaultValue;
	        }
	      });
	    }
	    if (!assert(function(div) {
	      return div.getAttribute("disabled") == null;
	    })) {
	      addHandle(booleans, function(elem, name, isXML) {
	        var val;
	        if (!isXML) {
	          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	        }
	      });
	    }
	    return Sizzle;
	  })(window);
	  jQuery.find = Sizzle;
	  jQuery.expr = Sizzle.selectors;
	  jQuery.expr[":"] = jQuery.expr.pseudos;
	  jQuery.unique = Sizzle.uniqueSort;
	  jQuery.text = Sizzle.getText;
	  jQuery.isXMLDoc = Sizzle.isXML;
	  jQuery.contains = Sizzle.contains;
	  var rneedsContext = jQuery.expr.match.needsContext;
	  var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	  var risSimple = /^.[^:#\[\.,]*$/;
	  function winnow(elements, qualifier, not) {
	    if (jQuery.isFunction(qualifier)) {
	      return jQuery.grep(elements, function(elem, i) {
	        return !!qualifier.call(elem, i, elem) !== not;
	      });
	    }
	    if (qualifier.nodeType) {
	      return jQuery.grep(elements, function(elem) {
	        return (elem === qualifier) !== not;
	      });
	    }
	    if (typeof qualifier === "string") {
	      if (risSimple.test(qualifier)) {
	        return jQuery.filter(qualifier, elements, not);
	      }
	      qualifier = jQuery.filter(qualifier, elements);
	    }
	    return jQuery.grep(elements, function(elem) {
	      return (indexOf.call(qualifier, elem) >= 0) !== not;
	    });
	  }
	  jQuery.filter = function(expr, elems, not) {
	    var elem = elems[0];
	    if (not) {
	      expr = ":not(" + expr + ")";
	    }
	    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
	      return elem.nodeType === 1;
	    }));
	  };
	  jQuery.fn.extend({
	    find: function(selector) {
	      var i,
	          len = this.length,
	          ret = [],
	          self = this;
	      if (typeof selector !== "string") {
	        return this.pushStack(jQuery(selector).filter(function() {
	          for (i = 0; i < len; i++) {
	            if (jQuery.contains(self[i], this)) {
	              return true;
	            }
	          }
	        }));
	      }
	      for (i = 0; i < len; i++) {
	        jQuery.find(selector, self[i], ret);
	      }
	      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
	      ret.selector = this.selector ? this.selector + " " + selector : selector;
	      return ret;
	    },
	    filter: function(selector) {
	      return this.pushStack(winnow(this, selector || [], false));
	    },
	    not: function(selector) {
	      return this.pushStack(winnow(this, selector || [], true));
	    },
	    is: function(selector) {
	      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
	    }
	  });
	  var rootjQuery,
	      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	      init = jQuery.fn.init = function(selector, context) {
	        var match,
	            elem;
	        if (!selector) {
	          return this;
	        }
	        if (typeof selector === "string") {
	          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
	            match = [null, selector, null];
	          } else {
	            match = rquickExpr.exec(selector);
	          }
	          if (match && (match[1] || !context)) {
	            if (match[1]) {
	              context = context instanceof jQuery ? context[0] : context;
	              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
	              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
	                for (match in context) {
	                  if (jQuery.isFunction(this[match])) {
	                    this[match](context[match]);
	                  } else {
	                    this.attr(match, context[match]);
	                  }
	                }
	              }
	              return this;
	            } else {
	              elem = document.getElementById(match[2]);
	              if (elem && elem.parentNode) {
	                this.length = 1;
	                this[0] = elem;
	              }
	              this.context = document;
	              this.selector = selector;
	              return this;
	            }
	          } else if (!context || context.jquery) {
	            return (context || rootjQuery).find(selector);
	          } else {
	            return this.constructor(context).find(selector);
	          }
	        } else if (selector.nodeType) {
	          this.context = this[0] = selector;
	          this.length = 1;
	          return this;
	        } else if (jQuery.isFunction(selector)) {
	          return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
	        }
	        if (selector.selector !== undefined) {
	          this.selector = selector.selector;
	          this.context = selector.context;
	        }
	        return jQuery.makeArray(selector, this);
	      };
	  init.prototype = jQuery.fn;
	  rootjQuery = jQuery(document);
	  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	      guaranteedUnique = {
	        children: true,
	        contents: true,
	        next: true,
	        prev: true
	      };
	  jQuery.extend({
	    dir: function(elem, dir, until) {
	      var matched = [],
	          truncate = until !== undefined;
	      while ((elem = elem[dir]) && elem.nodeType !== 9) {
	        if (elem.nodeType === 1) {
	          if (truncate && jQuery(elem).is(until)) {
	            break;
	          }
	          matched.push(elem);
	        }
	      }
	      return matched;
	    },
	    sibling: function(n, elem) {
	      var matched = [];
	      for (; n; n = n.nextSibling) {
	        if (n.nodeType === 1 && n !== elem) {
	          matched.push(n);
	        }
	      }
	      return matched;
	    }
	  });
	  jQuery.fn.extend({
	    has: function(target) {
	      var targets = jQuery(target, this),
	          l = targets.length;
	      return this.filter(function() {
	        var i = 0;
	        for (; i < l; i++) {
	          if (jQuery.contains(this, targets[i])) {
	            return true;
	          }
	        }
	      });
	    },
	    closest: function(selectors, context) {
	      var cur,
	          i = 0,
	          l = this.length,
	          matched = [],
	          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
	      for (; i < l; i++) {
	        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
	          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
	            matched.push(cur);
	            break;
	          }
	        }
	      }
	      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
	    },
	    index: function(elem) {
	      if (!elem) {
	        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
	      }
	      if (typeof elem === "string") {
	        return indexOf.call(jQuery(elem), this[0]);
	      }
	      return indexOf.call(this, elem.jquery ? elem[0] : elem);
	    },
	    add: function(selector, context) {
	      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
	    },
	    addBack: function(selector) {
	      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
	    }
	  });
	  function sibling(cur, dir) {
	    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
	    return cur;
	  }
	  jQuery.each({
	    parent: function(elem) {
	      var parent = elem.parentNode;
	      return parent && parent.nodeType !== 11 ? parent : null;
	    },
	    parents: function(elem) {
	      return jQuery.dir(elem, "parentNode");
	    },
	    parentsUntil: function(elem, i, until) {
	      return jQuery.dir(elem, "parentNode", until);
	    },
	    next: function(elem) {
	      return sibling(elem, "nextSibling");
	    },
	    prev: function(elem) {
	      return sibling(elem, "previousSibling");
	    },
	    nextAll: function(elem) {
	      return jQuery.dir(elem, "nextSibling");
	    },
	    prevAll: function(elem) {
	      return jQuery.dir(elem, "previousSibling");
	    },
	    nextUntil: function(elem, i, until) {
	      return jQuery.dir(elem, "nextSibling", until);
	    },
	    prevUntil: function(elem, i, until) {
	      return jQuery.dir(elem, "previousSibling", until);
	    },
	    siblings: function(elem) {
	      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
	    },
	    children: function(elem) {
	      return jQuery.sibling(elem.firstChild);
	    },
	    contents: function(elem) {
	      return elem.contentDocument || jQuery.merge([], elem.childNodes);
	    }
	  }, function(name, fn) {
	    jQuery.fn[name] = function(until, selector) {
	      var matched = jQuery.map(this, fn, until);
	      if (name.slice(-5) !== "Until") {
	        selector = until;
	      }
	      if (selector && typeof selector === "string") {
	        matched = jQuery.filter(selector, matched);
	      }
	      if (this.length > 1) {
	        if (!guaranteedUnique[name]) {
	          jQuery.unique(matched);
	        }
	        if (rparentsprev.test(name)) {
	          matched.reverse();
	        }
	      }
	      return this.pushStack(matched);
	    };
	  });
	  var rnotwhite = (/\S+/g);
	  var optionsCache = {};
	  function createOptions(options) {
	    var object = optionsCache[options] = {};
	    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
	      object[flag] = true;
	    });
	    return object;
	  }
	  jQuery.Callbacks = function(options) {
	    options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
	    var memory,
	        fired,
	        firing,
	        firingStart,
	        firingLength,
	        firingIndex,
	        list = [],
	        stack = !options.once && [],
	        fire = function(data) {
	          memory = options.memory && data;
	          fired = true;
	          firingIndex = firingStart || 0;
	          firingStart = 0;
	          firingLength = list.length;
	          firing = true;
	          for (; list && firingIndex < firingLength; firingIndex++) {
	            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
	              memory = false;
	              break;
	            }
	          }
	          firing = false;
	          if (list) {
	            if (stack) {
	              if (stack.length) {
	                fire(stack.shift());
	              }
	            } else if (memory) {
	              list = [];
	            } else {
	              self.disable();
	            }
	          }
	        },
	        self = {
	          add: function() {
	            if (list) {
	              var start = list.length;
	              (function add(args) {
	                jQuery.each(args, function(_, arg) {
	                  var type = jQuery.type(arg);
	                  if (type === "function") {
	                    if (!options.unique || !self.has(arg)) {
	                      list.push(arg);
	                    }
	                  } else if (arg && arg.length && type !== "string") {
	                    add(arg);
	                  }
	                });
	              })(arguments);
	              if (firing) {
	                firingLength = list.length;
	              } else if (memory) {
	                firingStart = start;
	                fire(memory);
	              }
	            }
	            return this;
	          },
	          remove: function() {
	            if (list) {
	              jQuery.each(arguments, function(_, arg) {
	                var index;
	                while ((index = jQuery.inArray(arg, list, index)) > -1) {
	                  list.splice(index, 1);
	                  if (firing) {
	                    if (index <= firingLength) {
	                      firingLength--;
	                    }
	                    if (index <= firingIndex) {
	                      firingIndex--;
	                    }
	                  }
	                }
	              });
	            }
	            return this;
	          },
	          has: function(fn) {
	            return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
	          },
	          empty: function() {
	            list = [];
	            firingLength = 0;
	            return this;
	          },
	          disable: function() {
	            list = stack = memory = undefined;
	            return this;
	          },
	          disabled: function() {
	            return !list;
	          },
	          lock: function() {
	            stack = undefined;
	            if (!memory) {
	              self.disable();
	            }
	            return this;
	          },
	          locked: function() {
	            return !stack;
	          },
	          fireWith: function(context, args) {
	            if (list && (!fired || stack)) {
	              args = args || [];
	              args = [context, args.slice ? args.slice() : args];
	              if (firing) {
	                stack.push(args);
	              } else {
	                fire(args);
	              }
	            }
	            return this;
	          },
	          fire: function() {
	            self.fireWith(this, arguments);
	            return this;
	          },
	          fired: function() {
	            return !!fired;
	          }
	        };
	    return self;
	  };
	  jQuery.extend({
	    Deferred: function(func) {
	      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
	          state = "pending",
	          promise = {
	            state: function() {
	              return state;
	            },
	            always: function() {
	              deferred.done(arguments).fail(arguments);
	              return this;
	            },
	            then: function() {
	              var fns = arguments;
	              return jQuery.Deferred(function(newDefer) {
	                jQuery.each(tuples, function(i, tuple) {
	                  var fn = jQuery.isFunction(fns[i]) && fns[i];
	                  deferred[tuple[1]](function() {
	                    var returned = fn && fn.apply(this, arguments);
	                    if (returned && jQuery.isFunction(returned.promise)) {
	                      returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
	                    } else {
	                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
	                    }
	                  });
	                });
	                fns = null;
	              }).promise();
	            },
	            promise: function(obj) {
	              return obj != null ? jQuery.extend(obj, promise) : promise;
	            }
	          },
	          deferred = {};
	      promise.pipe = promise.then;
	      jQuery.each(tuples, function(i, tuple) {
	        var list = tuple[2],
	            stateString = tuple[3];
	        promise[tuple[1]] = list.add;
	        if (stateString) {
	          list.add(function() {
	            state = stateString;
	          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
	        }
	        deferred[tuple[0]] = function() {
	          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
	          return this;
	        };
	        deferred[tuple[0] + "With"] = list.fireWith;
	      });
	      promise.promise(deferred);
	      if (func) {
	        func.call(deferred, deferred);
	      }
	      return deferred;
	    },
	    when: function(subordinate) {
	      var i = 0,
	          resolveValues = slice.call(arguments),
	          length = resolveValues.length,
	          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
	          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	          updateFunc = function(i, contexts, values) {
	            return function(value) {
	              contexts[i] = this;
	              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
	              if (values === progressValues) {
	                deferred.notifyWith(contexts, values);
	              } else if (!(--remaining)) {
	                deferred.resolveWith(contexts, values);
	              }
	            };
	          },
	          progressValues,
	          progressContexts,
	          resolveContexts;
	      if (length > 1) {
	        progressValues = new Array(length);
	        progressContexts = new Array(length);
	        resolveContexts = new Array(length);
	        for (; i < length; i++) {
	          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
	            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
	          } else {
	            --remaining;
	          }
	        }
	      }
	      if (!remaining) {
	        deferred.resolveWith(resolveContexts, resolveValues);
	      }
	      return deferred.promise();
	    }
	  });
	  var readyList;
	  jQuery.fn.ready = function(fn) {
	    jQuery.ready.promise().done(fn);
	    return this;
	  };
	  jQuery.extend({
	    isReady: false,
	    readyWait: 1,
	    holdReady: function(hold) {
	      if (hold) {
	        jQuery.readyWait++;
	      } else {
	        jQuery.ready(true);
	      }
	    },
	    ready: function(wait) {
	      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
	        return;
	      }
	      jQuery.isReady = true;
	      if (wait !== true && --jQuery.readyWait > 0) {
	        return;
	      }
	      readyList.resolveWith(document, [jQuery]);
	      if (jQuery.fn.triggerHandler) {
	        jQuery(document).triggerHandler("ready");
	        jQuery(document).off("ready");
	      }
	    }
	  });
	  function completed() {
	    document.removeEventListener("DOMContentLoaded", completed, false);
	    window.removeEventListener("load", completed, false);
	    jQuery.ready();
	  }
	  jQuery.ready.promise = function(obj) {
	    if (!readyList) {
	      readyList = jQuery.Deferred();
	      if (document.readyState === "complete") {
	        setTimeout(jQuery.ready);
	      } else {
	        document.addEventListener("DOMContentLoaded", completed, false);
	        window.addEventListener("load", completed, false);
	      }
	    }
	    return readyList.promise(obj);
	  };
	  jQuery.ready.promise();
	  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
	    var i = 0,
	        len = elems.length,
	        bulk = key == null;
	    if (jQuery.type(key) === "object") {
	      chainable = true;
	      for (i in key) {
	        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
	      }
	    } else if (value !== undefined) {
	      chainable = true;
	      if (!jQuery.isFunction(value)) {
	        raw = true;
	      }
	      if (bulk) {
	        if (raw) {
	          fn.call(elems, value);
	          fn = null;
	        } else {
	          bulk = fn;
	          fn = function(elem, key, value) {
	            return bulk.call(jQuery(elem), value);
	          };
	        }
	      }
	      if (fn) {
	        for (; i < len; i++) {
	          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
	        }
	      }
	    }
	    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
	  };
	  jQuery.acceptData = function(owner) {
	    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
	  };
	  function Data() {
	    Object.defineProperty(this.cache = {}, 0, {get: function() {
	        return {};
	      }});
	    this.expando = jQuery.expando + Data.uid++;
	  }
	  Data.uid = 1;
	  Data.accepts = jQuery.acceptData;
	  Data.prototype = {
	    key: function(owner) {
	      if (!Data.accepts(owner)) {
	        return 0;
	      }
	      var descriptor = {},
	          unlock = owner[this.expando];
	      if (!unlock) {
	        unlock = Data.uid++;
	        try {
	          descriptor[this.expando] = {value: unlock};
	          Object.defineProperties(owner, descriptor);
	        } catch (e) {
	          descriptor[this.expando] = unlock;
	          jQuery.extend(owner, descriptor);
	        }
	      }
	      if (!this.cache[unlock]) {
	        this.cache[unlock] = {};
	      }
	      return unlock;
	    },
	    set: function(owner, data, value) {
	      var prop,
	          unlock = this.key(owner),
	          cache = this.cache[unlock];
	      if (typeof data === "string") {
	        cache[data] = value;
	      } else {
	        if (jQuery.isEmptyObject(cache)) {
	          jQuery.extend(this.cache[unlock], data);
	        } else {
	          for (prop in data) {
	            cache[prop] = data[prop];
	          }
	        }
	      }
	      return cache;
	    },
	    get: function(owner, key) {
	      var cache = this.cache[this.key(owner)];
	      return key === undefined ? cache : cache[key];
	    },
	    access: function(owner, key, value) {
	      var stored;
	      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
	        stored = this.get(owner, key);
	        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
	      }
	      this.set(owner, key, value);
	      return value !== undefined ? value : key;
	    },
	    remove: function(owner, key) {
	      var i,
	          name,
	          camel,
	          unlock = this.key(owner),
	          cache = this.cache[unlock];
	      if (key === undefined) {
	        this.cache[unlock] = {};
	      } else {
	        if (jQuery.isArray(key)) {
	          name = key.concat(key.map(jQuery.camelCase));
	        } else {
	          camel = jQuery.camelCase(key);
	          if (key in cache) {
	            name = [key, camel];
	          } else {
	            name = camel;
	            name = name in cache ? [name] : (name.match(rnotwhite) || []);
	          }
	        }
	        i = name.length;
	        while (i--) {
	          delete cache[name[i]];
	        }
	      }
	    },
	    hasData: function(owner) {
	      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
	    },
	    discard: function(owner) {
	      if (owner[this.expando]) {
	        delete this.cache[owner[this.expando]];
	      }
	    }
	  };
	  var data_priv = new Data();
	  var data_user = new Data();
	  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      rmultiDash = /([A-Z])/g;
	  function dataAttr(elem, key, data) {
	    var name;
	    if (data === undefined && elem.nodeType === 1) {
	      name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
	      data = elem.getAttribute(name);
	      if (typeof data === "string") {
	        try {
	          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
	        } catch (e) {}
	        data_user.set(elem, key, data);
	      } else {
	        data = undefined;
	      }
	    }
	    return data;
	  }
	  jQuery.extend({
	    hasData: function(elem) {
	      return data_user.hasData(elem) || data_priv.hasData(elem);
	    },
	    data: function(elem, name, data) {
	      return data_user.access(elem, name, data);
	    },
	    removeData: function(elem, name) {
	      data_user.remove(elem, name);
	    },
	    _data: function(elem, name, data) {
	      return data_priv.access(elem, name, data);
	    },
	    _removeData: function(elem, name) {
	      data_priv.remove(elem, name);
	    }
	  });
	  jQuery.fn.extend({
	    data: function(key, value) {
	      var i,
	          name,
	          data,
	          elem = this[0],
	          attrs = elem && elem.attributes;
	      if (key === undefined) {
	        if (this.length) {
	          data = data_user.get(elem);
	          if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
	            i = attrs.length;
	            while (i--) {
	              if (attrs[i]) {
	                name = attrs[i].name;
	                if (name.indexOf("data-") === 0) {
	                  name = jQuery.camelCase(name.slice(5));
	                  dataAttr(elem, name, data[name]);
	                }
	              }
	            }
	            data_priv.set(elem, "hasDataAttrs", true);
	          }
	        }
	        return data;
	      }
	      if (typeof key === "object") {
	        return this.each(function() {
	          data_user.set(this, key);
	        });
	      }
	      return access(this, function(value) {
	        var data,
	            camelKey = jQuery.camelCase(key);
	        if (elem && value === undefined) {
	          data = data_user.get(elem, key);
	          if (data !== undefined) {
	            return data;
	          }
	          data = data_user.get(elem, camelKey);
	          if (data !== undefined) {
	            return data;
	          }
	          data = dataAttr(elem, camelKey, undefined);
	          if (data !== undefined) {
	            return data;
	          }
	          return;
	        }
	        this.each(function() {
	          var data = data_user.get(this, camelKey);
	          data_user.set(this, camelKey, value);
	          if (key.indexOf("-") !== -1 && data !== undefined) {
	            data_user.set(this, key, value);
	          }
	        });
	      }, null, value, arguments.length > 1, null, true);
	    },
	    removeData: function(key) {
	      return this.each(function() {
	        data_user.remove(this, key);
	      });
	    }
	  });
	  jQuery.extend({
	    queue: function(elem, type, data) {
	      var queue;
	      if (elem) {
	        type = (type || "fx") + "queue";
	        queue = data_priv.get(elem, type);
	        if (data) {
	          if (!queue || jQuery.isArray(data)) {
	            queue = data_priv.access(elem, type, jQuery.makeArray(data));
	          } else {
	            queue.push(data);
	          }
	        }
	        return queue || [];
	      }
	    },
	    dequeue: function(elem, type) {
	      type = type || "fx";
	      var queue = jQuery.queue(elem, type),
	          startLength = queue.length,
	          fn = queue.shift(),
	          hooks = jQuery._queueHooks(elem, type),
	          next = function() {
	            jQuery.dequeue(elem, type);
	          };
	      if (fn === "inprogress") {
	        fn = queue.shift();
	        startLength--;
	      }
	      if (fn) {
	        if (type === "fx") {
	          queue.unshift("inprogress");
	        }
	        delete hooks.stop;
	        fn.call(elem, next, hooks);
	      }
	      if (!startLength && hooks) {
	        hooks.empty.fire();
	      }
	    },
	    _queueHooks: function(elem, type) {
	      var key = type + "queueHooks";
	      return data_priv.get(elem, key) || data_priv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
	          data_priv.remove(elem, [type + "queue", key]);
	        })});
	    }
	  });
	  jQuery.fn.extend({
	    queue: function(type, data) {
	      var setter = 2;
	      if (typeof type !== "string") {
	        data = type;
	        type = "fx";
	        setter--;
	      }
	      if (arguments.length < setter) {
	        return jQuery.queue(this[0], type);
	      }
	      return data === undefined ? this : this.each(function() {
	        var queue = jQuery.queue(this, type, data);
	        jQuery._queueHooks(this, type);
	        if (type === "fx" && queue[0] !== "inprogress") {
	          jQuery.dequeue(this, type);
	        }
	      });
	    },
	    dequeue: function(type) {
	      return this.each(function() {
	        jQuery.dequeue(this, type);
	      });
	    },
	    clearQueue: function(type) {
	      return this.queue(type || "fx", []);
	    },
	    promise: function(type, obj) {
	      var tmp,
	          count = 1,
	          defer = jQuery.Deferred(),
	          elements = this,
	          i = this.length,
	          resolve = function() {
	            if (!(--count)) {
	              defer.resolveWith(elements, [elements]);
	            }
	          };
	      if (typeof type !== "string") {
	        obj = type;
	        type = undefined;
	      }
	      type = type || "fx";
	      while (i--) {
	        tmp = data_priv.get(elements[i], type + "queueHooks");
	        if (tmp && tmp.empty) {
	          count++;
	          tmp.empty.add(resolve);
	        }
	      }
	      resolve();
	      return defer.promise(obj);
	    }
	  });
	  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	  var cssExpand = ["Top", "Right", "Bottom", "Left"];
	  var isHidden = function(elem, el) {
	    elem = el || elem;
	    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	  };
	  var rcheckableType = (/^(?:checkbox|radio)$/i);
	  (function() {
	    var fragment = document.createDocumentFragment(),
	        div = fragment.appendChild(document.createElement("div")),
	        input = document.createElement("input");
	    input.setAttribute("type", "radio");
	    input.setAttribute("checked", "checked");
	    input.setAttribute("name", "t");
	    div.appendChild(input);
	    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
	    div.innerHTML = "<textarea>x</textarea>";
	    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	  })();
	  var strundefined = typeof undefined;
	  support.focusinBubbles = "onfocusin" in window;
	  var rkeyEvent = /^key/,
	      rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	      rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	      rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	  function returnTrue() {
	    return true;
	  }
	  function returnFalse() {
	    return false;
	  }
	  function safeActiveElement() {
	    try {
	      return document.activeElement;
	    } catch (err) {}
	  }
	  jQuery.event = {
	    global: {},
	    add: function(elem, types, handler, data, selector) {
	      var handleObjIn,
	          eventHandle,
	          tmp,
	          events,
	          t,
	          handleObj,
	          special,
	          handlers,
	          type,
	          namespaces,
	          origType,
	          elemData = data_priv.get(elem);
	      if (!elemData) {
	        return;
	      }
	      if (handler.handler) {
	        handleObjIn = handler;
	        handler = handleObjIn.handler;
	        selector = handleObjIn.selector;
	      }
	      if (!handler.guid) {
	        handler.guid = jQuery.guid++;
	      }
	      if (!(events = elemData.events)) {
	        events = elemData.events = {};
	      }
	      if (!(eventHandle = elemData.handle)) {
	        eventHandle = elemData.handle = function(e) {
	          return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
	        };
	      }
	      types = (types || "").match(rnotwhite) || [""];
	      t = types.length;
	      while (t--) {
	        tmp = rtypenamespace.exec(types[t]) || [];
	        type = origType = tmp[1];
	        namespaces = (tmp[2] || "").split(".").sort();
	        if (!type) {
	          continue;
	        }
	        special = jQuery.event.special[type] || {};
	        type = (selector ? special.delegateType : special.bindType) || type;
	        special = jQuery.event.special[type] || {};
	        handleObj = jQuery.extend({
	          type: type,
	          origType: origType,
	          data: data,
	          handler: handler,
	          guid: handler.guid,
	          selector: selector,
	          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
	          namespace: namespaces.join(".")
	        }, handleObjIn);
	        if (!(handlers = events[type])) {
	          handlers = events[type] = [];
	          handlers.delegateCount = 0;
	          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
	            if (elem.addEventListener) {
	              elem.addEventListener(type, eventHandle, false);
	            }
	          }
	        }
	        if (special.add) {
	          special.add.call(elem, handleObj);
	          if (!handleObj.handler.guid) {
	            handleObj.handler.guid = handler.guid;
	          }
	        }
	        if (selector) {
	          handlers.splice(handlers.delegateCount++, 0, handleObj);
	        } else {
	          handlers.push(handleObj);
	        }
	        jQuery.event.global[type] = true;
	      }
	    },
	    remove: function(elem, types, handler, selector, mappedTypes) {
	      var j,
	          origCount,
	          tmp,
	          events,
	          t,
	          handleObj,
	          special,
	          handlers,
	          type,
	          namespaces,
	          origType,
	          elemData = data_priv.hasData(elem) && data_priv.get(elem);
	      if (!elemData || !(events = elemData.events)) {
	        return;
	      }
	      types = (types || "").match(rnotwhite) || [""];
	      t = types.length;
	      while (t--) {
	        tmp = rtypenamespace.exec(types[t]) || [];
	        type = origType = tmp[1];
	        namespaces = (tmp[2] || "").split(".").sort();
	        if (!type) {
	          for (type in events) {
	            jQuery.event.remove(elem, type + types[t], handler, selector, true);
	          }
	          continue;
	        }
	        special = jQuery.event.special[type] || {};
	        type = (selector ? special.delegateType : special.bindType) || type;
	        handlers = events[type] || [];
	        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
	        origCount = j = handlers.length;
	        while (j--) {
	          handleObj = handlers[j];
	          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
	            handlers.splice(j, 1);
	            if (handleObj.selector) {
	              handlers.delegateCount--;
	            }
	            if (special.remove) {
	              special.remove.call(elem, handleObj);
	            }
	          }
	        }
	        if (origCount && !handlers.length) {
	          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
	            jQuery.removeEvent(elem, type, elemData.handle);
	          }
	          delete events[type];
	        }
	      }
	      if (jQuery.isEmptyObject(events)) {
	        delete elemData.handle;
	        data_priv.remove(elem, "events");
	      }
	    },
	    trigger: function(event, data, elem, onlyHandlers) {
	      var i,
	          cur,
	          tmp,
	          bubbleType,
	          ontype,
	          handle,
	          special,
	          eventPath = [elem || document],
	          type = hasOwn.call(event, "type") ? event.type : event,
	          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
	      cur = tmp = elem = elem || document;
	      if (elem.nodeType === 3 || elem.nodeType === 8) {
	        return;
	      }
	      if (rfocusMorph.test(type + jQuery.event.triggered)) {
	        return;
	      }
	      if (type.indexOf(".") >= 0) {
	        namespaces = type.split(".");
	        type = namespaces.shift();
	        namespaces.sort();
	      }
	      ontype = type.indexOf(":") < 0 && "on" + type;
	      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
	      event.isTrigger = onlyHandlers ? 2 : 3;
	      event.namespace = namespaces.join(".");
	      event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
	      event.result = undefined;
	      if (!event.target) {
	        event.target = elem;
	      }
	      data = data == null ? [event] : jQuery.makeArray(data, [event]);
	      special = jQuery.event.special[type] || {};
	      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
	        return;
	      }
	      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
	        bubbleType = special.delegateType || type;
	        if (!rfocusMorph.test(bubbleType + type)) {
	          cur = cur.parentNode;
	        }
	        for (; cur; cur = cur.parentNode) {
	          eventPath.push(cur);
	          tmp = cur;
	        }
	        if (tmp === (elem.ownerDocument || document)) {
	          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	        }
	      }
	      i = 0;
	      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
	        event.type = i > 1 ? bubbleType : special.bindType || type;
	        handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
	        if (handle) {
	          handle.apply(cur, data);
	        }
	        handle = ontype && cur[ontype];
	        if (handle && handle.apply && jQuery.acceptData(cur)) {
	          event.result = handle.apply(cur, data);
	          if (event.result === false) {
	            event.preventDefault();
	          }
	        }
	      }
	      event.type = type;
	      if (!onlyHandlers && !event.isDefaultPrevented()) {
	        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
	          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
	            tmp = elem[ontype];
	            if (tmp) {
	              elem[ontype] = null;
	            }
	            jQuery.event.triggered = type;
	            elem[type]();
	            jQuery.event.triggered = undefined;
	            if (tmp) {
	              elem[ontype] = tmp;
	            }
	          }
	        }
	      }
	      return event.result;
	    },
	    dispatch: function(event) {
	      event = jQuery.event.fix(event);
	      var i,
	          j,
	          ret,
	          matched,
	          handleObj,
	          handlerQueue = [],
	          args = slice.call(arguments),
	          handlers = (data_priv.get(this, "events") || {})[event.type] || [],
	          special = jQuery.event.special[event.type] || {};
	      args[0] = event;
	      event.delegateTarget = this;
	      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
	        return;
	      }
	      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
	      i = 0;
	      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
	        event.currentTarget = matched.elem;
	        j = 0;
	        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
	          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
	            event.handleObj = handleObj;
	            event.data = handleObj.data;
	            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
	            if (ret !== undefined) {
	              if ((event.result = ret) === false) {
	                event.preventDefault();
	                event.stopPropagation();
	              }
	            }
	          }
	        }
	      }
	      if (special.postDispatch) {
	        special.postDispatch.call(this, event);
	      }
	      return event.result;
	    },
	    handlers: function(event, handlers) {
	      var i,
	          matches,
	          sel,
	          handleObj,
	          handlerQueue = [],
	          delegateCount = handlers.delegateCount,
	          cur = event.target;
	      if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
	        for (; cur !== this; cur = cur.parentNode || this) {
	          if (cur.disabled !== true || event.type !== "click") {
	            matches = [];
	            for (i = 0; i < delegateCount; i++) {
	              handleObj = handlers[i];
	              sel = handleObj.selector + " ";
	              if (matches[sel] === undefined) {
	                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
	              }
	              if (matches[sel]) {
	                matches.push(handleObj);
	              }
	            }
	            if (matches.length) {
	              handlerQueue.push({
	                elem: cur,
	                handlers: matches
	              });
	            }
	          }
	        }
	      }
	      if (delegateCount < handlers.length) {
	        handlerQueue.push({
	          elem: this,
	          handlers: handlers.slice(delegateCount)
	        });
	      }
	      return handlerQueue;
	    },
	    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	    fixHooks: {},
	    keyHooks: {
	      props: "char charCode key keyCode".split(" "),
	      filter: function(event, original) {
	        if (event.which == null) {
	          event.which = original.charCode != null ? original.charCode : original.keyCode;
	        }
	        return event;
	      }
	    },
	    mouseHooks: {
	      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
	      filter: function(event, original) {
	        var eventDoc,
	            doc,
	            body,
	            button = original.button;
	        if (event.pageX == null && original.clientX != null) {
	          eventDoc = event.target.ownerDocument || document;
	          doc = eventDoc.documentElement;
	          body = eventDoc.body;
	          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	        }
	        if (!event.which && button !== undefined) {
	          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
	        }
	        return event;
	      }
	    },
	    fix: function(event) {
	      if (event[jQuery.expando]) {
	        return event;
	      }
	      var i,
	          prop,
	          copy,
	          type = event.type,
	          originalEvent = event,
	          fixHook = this.fixHooks[type];
	      if (!fixHook) {
	        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
	      }
	      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
	      event = new jQuery.Event(originalEvent);
	      i = copy.length;
	      while (i--) {
	        prop = copy[i];
	        event[prop] = originalEvent[prop];
	      }
	      if (!event.target) {
	        event.target = document;
	      }
	      if (event.target.nodeType === 3) {
	        event.target = event.target.parentNode;
	      }
	      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
	    },
	    special: {
	      load: {noBubble: true},
	      focus: {
	        trigger: function() {
	          if (this !== safeActiveElement() && this.focus) {
	            this.focus();
	            return false;
	          }
	        },
	        delegateType: "focusin"
	      },
	      blur: {
	        trigger: function() {
	          if (this === safeActiveElement() && this.blur) {
	            this.blur();
	            return false;
	          }
	        },
	        delegateType: "focusout"
	      },
	      click: {
	        trigger: function() {
	          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
	            this.click();
	            return false;
	          }
	        },
	        _default: function(event) {
	          return jQuery.nodeName(event.target, "a");
	        }
	      },
	      beforeunload: {postDispatch: function(event) {
	          if (event.result !== undefined && event.originalEvent) {
	            event.originalEvent.returnValue = event.result;
	          }
	        }}
	    },
	    simulate: function(type, elem, event, bubble) {
	      var e = jQuery.extend(new jQuery.Event(), event, {
	        type: type,
	        isSimulated: true,
	        originalEvent: {}
	      });
	      if (bubble) {
	        jQuery.event.trigger(e, null, elem);
	      } else {
	        jQuery.event.dispatch.call(elem, e);
	      }
	      if (e.isDefaultPrevented()) {
	        event.preventDefault();
	      }
	    }
	  };
	  jQuery.removeEvent = function(elem, type, handle) {
	    if (elem.removeEventListener) {
	      elem.removeEventListener(type, handle, false);
	    }
	  };
	  jQuery.Event = function(src, props) {
	    if (!(this instanceof jQuery.Event)) {
	      return new jQuery.Event(src, props);
	    }
	    if (src && src.type) {
	      this.originalEvent = src;
	      this.type = src.type;
	      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
	    } else {
	      this.type = src;
	    }
	    if (props) {
	      jQuery.extend(this, props);
	    }
	    this.timeStamp = src && src.timeStamp || jQuery.now();
	    this[jQuery.expando] = true;
	  };
	  jQuery.Event.prototype = {
	    isDefaultPrevented: returnFalse,
	    isPropagationStopped: returnFalse,
	    isImmediatePropagationStopped: returnFalse,
	    preventDefault: function() {
	      var e = this.originalEvent;
	      this.isDefaultPrevented = returnTrue;
	      if (e && e.preventDefault) {
	        e.preventDefault();
	      }
	    },
	    stopPropagation: function() {
	      var e = this.originalEvent;
	      this.isPropagationStopped = returnTrue;
	      if (e && e.stopPropagation) {
	        e.stopPropagation();
	      }
	    },
	    stopImmediatePropagation: function() {
	      var e = this.originalEvent;
	      this.isImmediatePropagationStopped = returnTrue;
	      if (e && e.stopImmediatePropagation) {
	        e.stopImmediatePropagation();
	      }
	      this.stopPropagation();
	    }
	  };
	  jQuery.each({
	    mouseenter: "mouseover",
	    mouseleave: "mouseout",
	    pointerenter: "pointerover",
	    pointerleave: "pointerout"
	  }, function(orig, fix) {
	    jQuery.event.special[orig] = {
	      delegateType: fix,
	      bindType: fix,
	      handle: function(event) {
	        var ret,
	            target = this,
	            related = event.relatedTarget,
	            handleObj = event.handleObj;
	        if (!related || (related !== target && !jQuery.contains(target, related))) {
	          event.type = handleObj.origType;
	          ret = handleObj.handler.apply(this, arguments);
	          event.type = fix;
	        }
	        return ret;
	      }
	    };
	  });
	  if (!support.focusinBubbles) {
	    jQuery.each({
	      focus: "focusin",
	      blur: "focusout"
	    }, function(orig, fix) {
	      var handler = function(event) {
	        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
	      };
	      jQuery.event.special[fix] = {
	        setup: function() {
	          var doc = this.ownerDocument || this,
	              attaches = data_priv.access(doc, fix);
	          if (!attaches) {
	            doc.addEventListener(orig, handler, true);
	          }
	          data_priv.access(doc, fix, (attaches || 0) + 1);
	        },
	        teardown: function() {
	          var doc = this.ownerDocument || this,
	              attaches = data_priv.access(doc, fix) - 1;
	          if (!attaches) {
	            doc.removeEventListener(orig, handler, true);
	            data_priv.remove(doc, fix);
	          } else {
	            data_priv.access(doc, fix, attaches);
	          }
	        }
	      };
	    });
	  }
	  jQuery.fn.extend({
	    on: function(types, selector, data, fn, one) {
	      var origFn,
	          type;
	      if (typeof types === "object") {
	        if (typeof selector !== "string") {
	          data = data || selector;
	          selector = undefined;
	        }
	        for (type in types) {
	          this.on(type, selector, data, types[type], one);
	        }
	        return this;
	      }
	      if (data == null && fn == null) {
	        fn = selector;
	        data = selector = undefined;
	      } else if (fn == null) {
	        if (typeof selector === "string") {
	          fn = data;
	          data = undefined;
	        } else {
	          fn = data;
	          data = selector;
	          selector = undefined;
	        }
	      }
	      if (fn === false) {
	        fn = returnFalse;
	      } else if (!fn) {
	        return this;
	      }
	      if (one === 1) {
	        origFn = fn;
	        fn = function(event) {
	          jQuery().off(event);
	          return origFn.apply(this, arguments);
	        };
	        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
	      }
	      return this.each(function() {
	        jQuery.event.add(this, types, fn, data, selector);
	      });
	    },
	    one: function(types, selector, data, fn) {
	      return this.on(types, selector, data, fn, 1);
	    },
	    off: function(types, selector, fn) {
	      var handleObj,
	          type;
	      if (types && types.preventDefault && types.handleObj) {
	        handleObj = types.handleObj;
	        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
	        return this;
	      }
	      if (typeof types === "object") {
	        for (type in types) {
	          this.off(type, selector, types[type]);
	        }
	        return this;
	      }
	      if (selector === false || typeof selector === "function") {
	        fn = selector;
	        selector = undefined;
	      }
	      if (fn === false) {
	        fn = returnFalse;
	      }
	      return this.each(function() {
	        jQuery.event.remove(this, types, fn, selector);
	      });
	    },
	    trigger: function(type, data) {
	      return this.each(function() {
	        jQuery.event.trigger(type, data, this);
	      });
	    },
	    triggerHandler: function(type, data) {
	      var elem = this[0];
	      if (elem) {
	        return jQuery.event.trigger(type, data, elem, true);
	      }
	    }
	  });
	  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      rtagName = /<([\w:]+)/,
	      rhtml = /<|&#?\w+;/,
	      rnoInnerhtml = /<(?:script|style|link)/i,
	      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      rscriptType = /^$|\/(?:java|ecma)script/i,
	      rscriptTypeMasked = /^true\/(.*)/,
	      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	      wrapMap = {
	        option: [1, "<select multiple='multiple'>", "</select>"],
	        thead: [1, "<table>", "</table>"],
	        col: [2, "<table><colgroup>", "</colgroup></table>"],
	        tr: [2, "<table><tbody>", "</tbody></table>"],
	        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	        _default: [0, "", ""]
	      };
	  wrapMap.optgroup = wrapMap.option;
	  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	  wrapMap.th = wrapMap.td;
	  function manipulationTarget(elem, content) {
	    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	  }
	  function disableScript(elem) {
	    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	    return elem;
	  }
	  function restoreScript(elem) {
	    var match = rscriptTypeMasked.exec(elem.type);
	    if (match) {
	      elem.type = match[1];
	    } else {
	      elem.removeAttribute("type");
	    }
	    return elem;
	  }
	  function setGlobalEval(elems, refElements) {
	    var i = 0,
	        l = elems.length;
	    for (; i < l; i++) {
	      data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
	    }
	  }
	  function cloneCopyEvent(src, dest) {
	    var i,
	        l,
	        type,
	        pdataOld,
	        pdataCur,
	        udataOld,
	        udataCur,
	        events;
	    if (dest.nodeType !== 1) {
	      return;
	    }
	    if (data_priv.hasData(src)) {
	      pdataOld = data_priv.access(src);
	      pdataCur = data_priv.set(dest, pdataOld);
	      events = pdataOld.events;
	      if (events) {
	        delete pdataCur.handle;
	        pdataCur.events = {};
	        for (type in events) {
	          for (i = 0, l = events[type].length; i < l; i++) {
	            jQuery.event.add(dest, type, events[type][i]);
	          }
	        }
	      }
	    }
	    if (data_user.hasData(src)) {
	      udataOld = data_user.access(src);
	      udataCur = jQuery.extend({}, udataOld);
	      data_user.set(dest, udataCur);
	    }
	  }
	  function getAll(context, tag) {
	    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
	    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
	  }
	  function fixInput(src, dest) {
	    var nodeName = dest.nodeName.toLowerCase();
	    if (nodeName === "input" && rcheckableType.test(src.type)) {
	      dest.checked = src.checked;
	    } else if (nodeName === "input" || nodeName === "textarea") {
	      dest.defaultValue = src.defaultValue;
	    }
	  }
	  jQuery.extend({
	    clone: function(elem, dataAndEvents, deepDataAndEvents) {
	      var i,
	          l,
	          srcElements,
	          destElements,
	          clone = elem.cloneNode(true),
	          inPage = jQuery.contains(elem.ownerDocument, elem);
	      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
	        destElements = getAll(clone);
	        srcElements = getAll(elem);
	        for (i = 0, l = srcElements.length; i < l; i++) {
	          fixInput(srcElements[i], destElements[i]);
	        }
	      }
	      if (dataAndEvents) {
	        if (deepDataAndEvents) {
	          srcElements = srcElements || getAll(elem);
	          destElements = destElements || getAll(clone);
	          for (i = 0, l = srcElements.length; i < l; i++) {
	            cloneCopyEvent(srcElements[i], destElements[i]);
	          }
	        } else {
	          cloneCopyEvent(elem, clone);
	        }
	      }
	      destElements = getAll(clone, "script");
	      if (destElements.length > 0) {
	        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
	      }
	      return clone;
	    },
	    buildFragment: function(elems, context, scripts, selection) {
	      var elem,
	          tmp,
	          tag,
	          wrap,
	          contains,
	          j,
	          fragment = context.createDocumentFragment(),
	          nodes = [],
	          i = 0,
	          l = elems.length;
	      for (; i < l; i++) {
	        elem = elems[i];
	        if (elem || elem === 0) {
	          if (jQuery.type(elem) === "object") {
	            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
	          } else if (!rhtml.test(elem)) {
	            nodes.push(context.createTextNode(elem));
	          } else {
	            tmp = tmp || fragment.appendChild(context.createElement("div"));
	            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
	            wrap = wrapMap[tag] || wrapMap._default;
	            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
	            j = wrap[0];
	            while (j--) {
	              tmp = tmp.lastChild;
	            }
	            jQuery.merge(nodes, tmp.childNodes);
	            tmp = fragment.firstChild;
	            tmp.textContent = "";
	          }
	        }
	      }
	      fragment.textContent = "";
	      i = 0;
	      while ((elem = nodes[i++])) {
	        if (selection && jQuery.inArray(elem, selection) !== -1) {
	          continue;
	        }
	        contains = jQuery.contains(elem.ownerDocument, elem);
	        tmp = getAll(fragment.appendChild(elem), "script");
	        if (contains) {
	          setGlobalEval(tmp);
	        }
	        if (scripts) {
	          j = 0;
	          while ((elem = tmp[j++])) {
	            if (rscriptType.test(elem.type || "")) {
	              scripts.push(elem);
	            }
	          }
	        }
	      }
	      return fragment;
	    },
	    cleanData: function(elems) {
	      var data,
	          elem,
	          type,
	          key,
	          special = jQuery.event.special,
	          i = 0;
	      for (; (elem = elems[i]) !== undefined; i++) {
	        if (jQuery.acceptData(elem)) {
	          key = elem[data_priv.expando];
	          if (key && (data = data_priv.cache[key])) {
	            if (data.events) {
	              for (type in data.events) {
	                if (special[type]) {
	                  jQuery.event.remove(elem, type);
	                } else {
	                  jQuery.removeEvent(elem, type, data.handle);
	                }
	              }
	            }
	            if (data_priv.cache[key]) {
	              delete data_priv.cache[key];
	            }
	          }
	        }
	        delete data_user.cache[elem[data_user.expando]];
	      }
	    }
	  });
	  jQuery.fn.extend({
	    text: function(value) {
	      return access(this, function(value) {
	        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
	          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	            this.textContent = value;
	          }
	        });
	      }, null, value, arguments.length);
	    },
	    append: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	          var target = manipulationTarget(this, elem);
	          target.appendChild(elem);
	        }
	      });
	    },
	    prepend: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	          var target = manipulationTarget(this, elem);
	          target.insertBefore(elem, target.firstChild);
	        }
	      });
	    },
	    before: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.parentNode) {
	          this.parentNode.insertBefore(elem, this);
	        }
	      });
	    },
	    after: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.parentNode) {
	          this.parentNode.insertBefore(elem, this.nextSibling);
	        }
	      });
	    },
	    remove: function(selector, keepData) {
	      var elem,
	          elems = selector ? jQuery.filter(selector, this) : this,
	          i = 0;
	      for (; (elem = elems[i]) != null; i++) {
	        if (!keepData && elem.nodeType === 1) {
	          jQuery.cleanData(getAll(elem));
	        }
	        if (elem.parentNode) {
	          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
	            setGlobalEval(getAll(elem, "script"));
	          }
	          elem.parentNode.removeChild(elem);
	        }
	      }
	      return this;
	    },
	    empty: function() {
	      var elem,
	          i = 0;
	      for (; (elem = this[i]) != null; i++) {
	        if (elem.nodeType === 1) {
	          jQuery.cleanData(getAll(elem, false));
	          elem.textContent = "";
	        }
	      }
	      return this;
	    },
	    clone: function(dataAndEvents, deepDataAndEvents) {
	      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	      return this.map(function() {
	        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	      });
	    },
	    html: function(value) {
	      return access(this, function(value) {
	        var elem = this[0] || {},
	            i = 0,
	            l = this.length;
	        if (value === undefined && elem.nodeType === 1) {
	          return elem.innerHTML;
	        }
	        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
	          value = value.replace(rxhtmlTag, "<$1></$2>");
	          try {
	            for (; i < l; i++) {
	              elem = this[i] || {};
	              if (elem.nodeType === 1) {
	                jQuery.cleanData(getAll(elem, false));
	                elem.innerHTML = value;
	              }
	            }
	            elem = 0;
	          } catch (e) {}
	        }
	        if (elem) {
	          this.empty().append(value);
	        }
	      }, null, value, arguments.length);
	    },
	    replaceWith: function() {
	      var arg = arguments[0];
	      this.domManip(arguments, function(elem) {
	        arg = this.parentNode;
	        jQuery.cleanData(getAll(this));
	        if (arg) {
	          arg.replaceChild(elem, this);
	        }
	      });
	      return arg && (arg.length || arg.nodeType) ? this : this.remove();
	    },
	    detach: function(selector) {
	      return this.remove(selector, true);
	    },
	    domManip: function(args, callback) {
	      args = concat.apply([], args);
	      var fragment,
	          first,
	          scripts,
	          hasScripts,
	          node,
	          doc,
	          i = 0,
	          l = this.length,
	          set = this,
	          iNoClone = l - 1,
	          value = args[0],
	          isFunction = jQuery.isFunction(value);
	      if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
	        return this.each(function(index) {
	          var self = set.eq(index);
	          if (isFunction) {
	            args[0] = value.call(this, index, self.html());
	          }
	          self.domManip(args, callback);
	        });
	      }
	      if (l) {
	        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
	        first = fragment.firstChild;
	        if (fragment.childNodes.length === 1) {
	          fragment = first;
	        }
	        if (first) {
	          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
	          hasScripts = scripts.length;
	          for (; i < l; i++) {
	            node = fragment;
	            if (i !== iNoClone) {
	              node = jQuery.clone(node, true, true);
	              if (hasScripts) {
	                jQuery.merge(scripts, getAll(node, "script"));
	              }
	            }
	            callback.call(this[i], node, i);
	          }
	          if (hasScripts) {
	            doc = scripts[scripts.length - 1].ownerDocument;
	            jQuery.map(scripts, restoreScript);
	            for (i = 0; i < hasScripts; i++) {
	              node = scripts[i];
	              if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
	                if (node.src) {
	                  if (jQuery._evalUrl) {
	                    jQuery._evalUrl(node.src);
	                  }
	                } else {
	                  jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
	                }
	              }
	            }
	          }
	        }
	      }
	      return this;
	    }
	  });
	  jQuery.each({
	    appendTo: "append",
	    prependTo: "prepend",
	    insertBefore: "before",
	    insertAfter: "after",
	    replaceAll: "replaceWith"
	  }, function(name, original) {
	    jQuery.fn[name] = function(selector) {
	      var elems,
	          ret = [],
	          insert = jQuery(selector),
	          last = insert.length - 1,
	          i = 0;
	      for (; i <= last; i++) {
	        elems = i === last ? this : this.clone(true);
	        jQuery(insert[i])[original](elems);
	        push.apply(ret, elems.get());
	      }
	      return this.pushStack(ret);
	    };
	  });
	  var iframe,
	      elemdisplay = {};
	  function actualDisplay(name, doc) {
	    var style,
	        elem = jQuery(doc.createElement(name)).appendTo(doc.body),
	        display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
	    elem.detach();
	    return display;
	  }
	  function defaultDisplay(nodeName) {
	    var doc = document,
	        display = elemdisplay[nodeName];
	    if (!display) {
	      display = actualDisplay(nodeName, doc);
	      if (display === "none" || !display) {
	        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
	        doc = iframe[0].contentDocument;
	        doc.write();
	        doc.close();
	        display = actualDisplay(nodeName, doc);
	        iframe.detach();
	      }
	      elemdisplay[nodeName] = display;
	    }
	    return display;
	  }
	  var rmargin = (/^margin/);
	  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	  var getStyles = function(elem) {
	    if (elem.ownerDocument.defaultView.opener) {
	      return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	    }
	    return window.getComputedStyle(elem, null);
	  };
	  function curCSS(elem, name, computed) {
	    var width,
	        minWidth,
	        maxWidth,
	        ret,
	        style = elem.style;
	    computed = computed || getStyles(elem);
	    if (computed) {
	      ret = computed.getPropertyValue(name) || computed[name];
	    }
	    if (computed) {
	      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
	        ret = jQuery.style(elem, name);
	      }
	      if (rnumnonpx.test(ret) && rmargin.test(name)) {
	        width = style.width;
	        minWidth = style.minWidth;
	        maxWidth = style.maxWidth;
	        style.minWidth = style.maxWidth = style.width = ret;
	        ret = computed.width;
	        style.width = width;
	        style.minWidth = minWidth;
	        style.maxWidth = maxWidth;
	      }
	    }
	    return ret !== undefined ? ret + "" : ret;
	  }
	  function addGetHookIf(conditionFn, hookFn) {
	    return {get: function() {
	        if (conditionFn()) {
	          delete this.get;
	          return;
	        }
	        return (this.get = hookFn).apply(this, arguments);
	      }};
	  }
	  (function() {
	    var pixelPositionVal,
	        boxSizingReliableVal,
	        docElem = document.documentElement,
	        container = document.createElement("div"),
	        div = document.createElement("div");
	    if (!div.style) {
	      return;
	    }
	    div.style.backgroundClip = "content-box";
	    div.cloneNode(true).style.backgroundClip = "";
	    support.clearCloneStyle = div.style.backgroundClip === "content-box";
	    container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
	    container.appendChild(div);
	    function computePixelPositionAndBoxSizingReliable() {
	      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
	      div.innerHTML = "";
	      docElem.appendChild(container);
	      var divStyle = window.getComputedStyle(div, null);
	      pixelPositionVal = divStyle.top !== "1%";
	      boxSizingReliableVal = divStyle.width === "4px";
	      docElem.removeChild(container);
	    }
	    if (window.getComputedStyle) {
	      jQuery.extend(support, {
	        pixelPosition: function() {
	          computePixelPositionAndBoxSizingReliable();
	          return pixelPositionVal;
	        },
	        boxSizingReliable: function() {
	          if (boxSizingReliableVal == null) {
	            computePixelPositionAndBoxSizingReliable();
	          }
	          return boxSizingReliableVal;
	        },
	        reliableMarginRight: function() {
	          var ret,
	              marginDiv = div.appendChild(document.createElement("div"));
	          marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
	          marginDiv.style.marginRight = marginDiv.style.width = "0";
	          div.style.width = "1px";
	          docElem.appendChild(container);
	          ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
	          docElem.removeChild(container);
	          div.removeChild(marginDiv);
	          return ret;
	        }
	      });
	    }
	  })();
	  jQuery.swap = function(elem, options, callback, args) {
	    var ret,
	        name,
	        old = {};
	    for (name in options) {
	      old[name] = elem.style[name];
	      elem.style[name] = options[name];
	    }
	    ret = callback.apply(elem, args || []);
	    for (name in options) {
	      elem.style[name] = old[name];
	    }
	    return ret;
	  };
	  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	      rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
	      rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
	      cssShow = {
	        position: "absolute",
	        visibility: "hidden",
	        display: "block"
	      },
	      cssNormalTransform = {
	        letterSpacing: "0",
	        fontWeight: "400"
	      },
	      cssPrefixes = ["Webkit", "O", "Moz", "ms"];
	  function vendorPropName(style, name) {
	    if (name in style) {
	      return name;
	    }
	    var capName = name[0].toUpperCase() + name.slice(1),
	        origName = name,
	        i = cssPrefixes.length;
	    while (i--) {
	      name = cssPrefixes[i] + capName;
	      if (name in style) {
	        return name;
	      }
	    }
	    return origName;
	  }
	  function setPositiveNumber(elem, value, subtract) {
	    var matches = rnumsplit.exec(value);
	    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
	  }
	  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
	    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
	        val = 0;
	    for (; i < 4; i += 2) {
	      if (extra === "margin") {
	        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
	      }
	      if (isBorderBox) {
	        if (extra === "content") {
	          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	        }
	        if (extra !== "margin") {
	          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	        }
	      } else {
	        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	        if (extra !== "padding") {
	          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	        }
	      }
	    }
	    return val;
	  }
	  function getWidthOrHeight(elem, name, extra) {
	    var valueIsBorderBox = true,
	        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
	        styles = getStyles(elem),
	        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
	    if (val <= 0 || val == null) {
	      val = curCSS(elem, name, styles);
	      if (val < 0 || val == null) {
	        val = elem.style[name];
	      }
	      if (rnumnonpx.test(val)) {
	        return val;
	      }
	      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
	      val = parseFloat(val) || 0;
	    }
	    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
	  }
	  function showHide(elements, show) {
	    var display,
	        elem,
	        hidden,
	        values = [],
	        index = 0,
	        length = elements.length;
	    for (; index < length; index++) {
	      elem = elements[index];
	      if (!elem.style) {
	        continue;
	      }
	      values[index] = data_priv.get(elem, "olddisplay");
	      display = elem.style.display;
	      if (show) {
	        if (!values[index] && display === "none") {
	          elem.style.display = "";
	        }
	        if (elem.style.display === "" && isHidden(elem)) {
	          values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
	        }
	      } else {
	        hidden = isHidden(elem);
	        if (display !== "none" || !hidden) {
	          data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
	        }
	      }
	    }
	    for (index = 0; index < length; index++) {
	      elem = elements[index];
	      if (!elem.style) {
	        continue;
	      }
	      if (!show || elem.style.display === "none" || elem.style.display === "") {
	        elem.style.display = show ? values[index] || "" : "none";
	      }
	    }
	    return elements;
	  }
	  jQuery.extend({
	    cssHooks: {opacity: {get: function(elem, computed) {
	          if (computed) {
	            var ret = curCSS(elem, "opacity");
	            return ret === "" ? "1" : ret;
	          }
	        }}},
	    cssNumber: {
	      "columnCount": true,
	      "fillOpacity": true,
	      "flexGrow": true,
	      "flexShrink": true,
	      "fontWeight": true,
	      "lineHeight": true,
	      "opacity": true,
	      "order": true,
	      "orphans": true,
	      "widows": true,
	      "zIndex": true,
	      "zoom": true
	    },
	    cssProps: {"float": "cssFloat"},
	    style: function(elem, name, value, extra) {
	      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	        return;
	      }
	      var ret,
	          type,
	          hooks,
	          origName = jQuery.camelCase(name),
	          style = elem.style;
	      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
	      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
	      if (value !== undefined) {
	        type = typeof value;
	        if (type === "string" && (ret = rrelNum.exec(value))) {
	          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
	          type = "number";
	        }
	        if (value == null || value !== value) {
	          return;
	        }
	        if (type === "number" && !jQuery.cssNumber[origName]) {
	          value += "px";
	        }
	        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
	          style[name] = "inherit";
	        }
	        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
	          style[name] = value;
	        }
	      } else {
	        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
	          return ret;
	        }
	        return style[name];
	      }
	    },
	    css: function(elem, name, extra, styles) {
	      var val,
	          num,
	          hooks,
	          origName = jQuery.camelCase(name);
	      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
	      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
	      if (hooks && "get" in hooks) {
	        val = hooks.get(elem, true, extra);
	      }
	      if (val === undefined) {
	        val = curCSS(elem, name, styles);
	      }
	      if (val === "normal" && name in cssNormalTransform) {
	        val = cssNormalTransform[name];
	      }
	      if (extra === "" || extra) {
	        num = parseFloat(val);
	        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
	      }
	      return val;
	    }
	  });
	  jQuery.each(["height", "width"], function(i, name) {
	    jQuery.cssHooks[name] = {
	      get: function(elem, computed, extra) {
	        if (computed) {
	          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
	            return getWidthOrHeight(elem, name, extra);
	          }) : getWidthOrHeight(elem, name, extra);
	        }
	      },
	      set: function(elem, value, extra) {
	        var styles = extra && getStyles(elem);
	        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
	      }
	    };
	  });
	  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
	    if (computed) {
	      return jQuery.swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
	    }
	  });
	  jQuery.each({
	    margin: "",
	    padding: "",
	    border: "Width"
	  }, function(prefix, suffix) {
	    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
	        var i = 0,
	            expanded = {},
	            parts = typeof value === "string" ? value.split(" ") : [value];
	        for (; i < 4; i++) {
	          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
	        }
	        return expanded;
	      }};
	    if (!rmargin.test(prefix)) {
	      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	    }
	  });
	  jQuery.fn.extend({
	    css: function(name, value) {
	      return access(this, function(elem, name, value) {
	        var styles,
	            len,
	            map = {},
	            i = 0;
	        if (jQuery.isArray(name)) {
	          styles = getStyles(elem);
	          len = name.length;
	          for (; i < len; i++) {
	            map[name[i]] = jQuery.css(elem, name[i], false, styles);
	          }
	          return map;
	        }
	        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
	      }, name, value, arguments.length > 1);
	    },
	    show: function() {
	      return showHide(this, true);
	    },
	    hide: function() {
	      return showHide(this);
	    },
	    toggle: function(state) {
	      if (typeof state === "boolean") {
	        return state ? this.show() : this.hide();
	      }
	      return this.each(function() {
	        if (isHidden(this)) {
	          jQuery(this).show();
	        } else {
	          jQuery(this).hide();
	        }
	      });
	    }
	  });
	  function Tween(elem, options, prop, end, easing) {
	    return new Tween.prototype.init(elem, options, prop, end, easing);
	  }
	  jQuery.Tween = Tween;
	  Tween.prototype = {
	    constructor: Tween,
	    init: function(elem, options, prop, end, easing, unit) {
	      this.elem = elem;
	      this.prop = prop;
	      this.easing = easing || "swing";
	      this.options = options;
	      this.start = this.now = this.cur();
	      this.end = end;
	      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
	    },
	    cur: function() {
	      var hooks = Tween.propHooks[this.prop];
	      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
	    },
	    run: function(percent) {
	      var eased,
	          hooks = Tween.propHooks[this.prop];
	      if (this.options.duration) {
	        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
	      } else {
	        this.pos = eased = percent;
	      }
	      this.now = (this.end - this.start) * eased + this.start;
	      if (this.options.step) {
	        this.options.step.call(this.elem, this.now, this);
	      }
	      if (hooks && hooks.set) {
	        hooks.set(this);
	      } else {
	        Tween.propHooks._default.set(this);
	      }
	      return this;
	    }
	  };
	  Tween.prototype.init.prototype = Tween.prototype;
	  Tween.propHooks = {_default: {
	      get: function(tween) {
	        var result;
	        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
	          return tween.elem[tween.prop];
	        }
	        result = jQuery.css(tween.elem, tween.prop, "");
	        return !result || result === "auto" ? 0 : result;
	      },
	      set: function(tween) {
	        if (jQuery.fx.step[tween.prop]) {
	          jQuery.fx.step[tween.prop](tween);
	        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
	          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
	        } else {
	          tween.elem[tween.prop] = tween.now;
	        }
	      }
	    }};
	  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
	      if (tween.elem.nodeType && tween.elem.parentNode) {
	        tween.elem[tween.prop] = tween.now;
	      }
	    }};
	  jQuery.easing = {
	    linear: function(p) {
	      return p;
	    },
	    swing: function(p) {
	      return 0.5 - Math.cos(p * Math.PI) / 2;
	    }
	  };
	  jQuery.fx = Tween.prototype.init;
	  jQuery.fx.step = {};
	  var fxNow,
	      timerId,
	      rfxtypes = /^(?:toggle|show|hide)$/,
	      rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
	      rrun = /queueHooks$/,
	      animationPrefilters = [defaultPrefilter],
	      tweeners = {"*": [function(prop, value) {
	          var tween = this.createTween(prop, value),
	              target = tween.cur(),
	              parts = rfxnum.exec(value),
	              unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
	              start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
	              scale = 1,
	              maxIterations = 20;
	          if (start && start[3] !== unit) {
	            unit = unit || start[3];
	            parts = parts || [];
	            start = +target || 1;
	            do {
	              scale = scale || ".5";
	              start = start / scale;
	              jQuery.style(tween.elem, prop, start + unit);
	            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
	          }
	          if (parts) {
	            start = tween.start = +start || +target || 0;
	            tween.unit = unit;
	            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
	          }
	          return tween;
	        }]};
	  function createFxNow() {
	    setTimeout(function() {
	      fxNow = undefined;
	    });
	    return (fxNow = jQuery.now());
	  }
	  function genFx(type, includeWidth) {
	    var which,
	        i = 0,
	        attrs = {height: type};
	    includeWidth = includeWidth ? 1 : 0;
	    for (; i < 4; i += 2 - includeWidth) {
	      which = cssExpand[i];
	      attrs["margin" + which] = attrs["padding" + which] = type;
	    }
	    if (includeWidth) {
	      attrs.opacity = attrs.width = type;
	    }
	    return attrs;
	  }
	  function createTween(value, prop, animation) {
	    var tween,
	        collection = (tweeners[prop] || []).concat(tweeners["*"]),
	        index = 0,
	        length = collection.length;
	    for (; index < length; index++) {
	      if ((tween = collection[index].call(animation, prop, value))) {
	        return tween;
	      }
	    }
	  }
	  function defaultPrefilter(elem, props, opts) {
	    var prop,
	        value,
	        toggle,
	        tween,
	        hooks,
	        oldfire,
	        display,
	        checkDisplay,
	        anim = this,
	        orig = {},
	        style = elem.style,
	        hidden = elem.nodeType && isHidden(elem),
	        dataShow = data_priv.get(elem, "fxshow");
	    if (!opts.queue) {
	      hooks = jQuery._queueHooks(elem, "fx");
	      if (hooks.unqueued == null) {
	        hooks.unqueued = 0;
	        oldfire = hooks.empty.fire;
	        hooks.empty.fire = function() {
	          if (!hooks.unqueued) {
	            oldfire();
	          }
	        };
	      }
	      hooks.unqueued++;
	      anim.always(function() {
	        anim.always(function() {
	          hooks.unqueued--;
	          if (!jQuery.queue(elem, "fx").length) {
	            hooks.empty.fire();
	          }
	        });
	      });
	    }
	    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
	      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
	      display = jQuery.css(elem, "display");
	      checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
	      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
	        style.display = "inline-block";
	      }
	    }
	    if (opts.overflow) {
	      style.overflow = "hidden";
	      anim.always(function() {
	        style.overflow = opts.overflow[0];
	        style.overflowX = opts.overflow[1];
	        style.overflowY = opts.overflow[2];
	      });
	    }
	    for (prop in props) {
	      value = props[prop];
	      if (rfxtypes.exec(value)) {
	        delete props[prop];
	        toggle = toggle || value === "toggle";
	        if (value === (hidden ? "hide" : "show")) {
	          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
	            hidden = true;
	          } else {
	            continue;
	          }
	        }
	        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
	      } else {
	        display = undefined;
	      }
	    }
	    if (!jQuery.isEmptyObject(orig)) {
	      if (dataShow) {
	        if ("hidden" in dataShow) {
	          hidden = dataShow.hidden;
	        }
	      } else {
	        dataShow = data_priv.access(elem, "fxshow", {});
	      }
	      if (toggle) {
	        dataShow.hidden = !hidden;
	      }
	      if (hidden) {
	        jQuery(elem).show();
	      } else {
	        anim.done(function() {
	          jQuery(elem).hide();
	        });
	      }
	      anim.done(function() {
	        var prop;
	        data_priv.remove(elem, "fxshow");
	        for (prop in orig) {
	          jQuery.style(elem, prop, orig[prop]);
	        }
	      });
	      for (prop in orig) {
	        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
	        if (!(prop in dataShow)) {
	          dataShow[prop] = tween.start;
	          if (hidden) {
	            tween.end = tween.start;
	            tween.start = prop === "width" || prop === "height" ? 1 : 0;
	          }
	        }
	      }
	    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
	      style.display = display;
	    }
	  }
	  function propFilter(props, specialEasing) {
	    var index,
	        name,
	        easing,
	        value,
	        hooks;
	    for (index in props) {
	      name = jQuery.camelCase(index);
	      easing = specialEasing[name];
	      value = props[index];
	      if (jQuery.isArray(value)) {
	        easing = value[1];
	        value = props[index] = value[0];
	      }
	      if (index !== name) {
	        props[name] = value;
	        delete props[index];
	      }
	      hooks = jQuery.cssHooks[name];
	      if (hooks && "expand" in hooks) {
	        value = hooks.expand(value);
	        delete props[name];
	        for (index in value) {
	          if (!(index in props)) {
	            props[index] = value[index];
	            specialEasing[index] = easing;
	          }
	        }
	      } else {
	        specialEasing[name] = easing;
	      }
	    }
	  }
	  function Animation(elem, properties, options) {
	    var result,
	        stopped,
	        index = 0,
	        length = animationPrefilters.length,
	        deferred = jQuery.Deferred().always(function() {
	          delete tick.elem;
	        }),
	        tick = function() {
	          if (stopped) {
	            return false;
	          }
	          var currentTime = fxNow || createFxNow(),
	              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
	              temp = remaining / animation.duration || 0,
	              percent = 1 - temp,
	              index = 0,
	              length = animation.tweens.length;
	          for (; index < length; index++) {
	            animation.tweens[index].run(percent);
	          }
	          deferred.notifyWith(elem, [animation, percent, remaining]);
	          if (percent < 1 && length) {
	            return remaining;
	          } else {
	            deferred.resolveWith(elem, [animation]);
	            return false;
	          }
	        },
	        animation = deferred.promise({
	          elem: elem,
	          props: jQuery.extend({}, properties),
	          opts: jQuery.extend(true, {specialEasing: {}}, options),
	          originalProperties: properties,
	          originalOptions: options,
	          startTime: fxNow || createFxNow(),
	          duration: options.duration,
	          tweens: [],
	          createTween: function(prop, end) {
	            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
	            animation.tweens.push(tween);
	            return tween;
	          },
	          stop: function(gotoEnd) {
	            var index = 0,
	                length = gotoEnd ? animation.tweens.length : 0;
	            if (stopped) {
	              return this;
	            }
	            stopped = true;
	            for (; index < length; index++) {
	              animation.tweens[index].run(1);
	            }
	            if (gotoEnd) {
	              deferred.resolveWith(elem, [animation, gotoEnd]);
	            } else {
	              deferred.rejectWith(elem, [animation, gotoEnd]);
	            }
	            return this;
	          }
	        }),
	        props = animation.props;
	    propFilter(props, animation.opts.specialEasing);
	    for (; index < length; index++) {
	      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
	      if (result) {
	        return result;
	      }
	    }
	    jQuery.map(props, createTween, animation);
	    if (jQuery.isFunction(animation.opts.start)) {
	      animation.opts.start.call(elem, animation);
	    }
	    jQuery.fx.timer(jQuery.extend(tick, {
	      elem: elem,
	      anim: animation,
	      queue: animation.opts.queue
	    }));
	    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	  }
	  jQuery.Animation = jQuery.extend(Animation, {
	    tweener: function(props, callback) {
	      if (jQuery.isFunction(props)) {
	        callback = props;
	        props = ["*"];
	      } else {
	        props = props.split(" ");
	      }
	      var prop,
	          index = 0,
	          length = props.length;
	      for (; index < length; index++) {
	        prop = props[index];
	        tweeners[prop] = tweeners[prop] || [];
	        tweeners[prop].unshift(callback);
	      }
	    },
	    prefilter: function(callback, prepend) {
	      if (prepend) {
	        animationPrefilters.unshift(callback);
	      } else {
	        animationPrefilters.push(callback);
	      }
	    }
	  });
	  jQuery.speed = function(speed, easing, fn) {
	    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
	      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
	      duration: speed,
	      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
	    };
	    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
	    if (opt.queue == null || opt.queue === true) {
	      opt.queue = "fx";
	    }
	    opt.old = opt.complete;
	    opt.complete = function() {
	      if (jQuery.isFunction(opt.old)) {
	        opt.old.call(this);
	      }
	      if (opt.queue) {
	        jQuery.dequeue(this, opt.queue);
	      }
	    };
	    return opt;
	  };
	  jQuery.fn.extend({
	    fadeTo: function(speed, to, easing, callback) {
	      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
	    },
	    animate: function(prop, speed, easing, callback) {
	      var empty = jQuery.isEmptyObject(prop),
	          optall = jQuery.speed(speed, easing, callback),
	          doAnimation = function() {
	            var anim = Animation(this, jQuery.extend({}, prop), optall);
	            if (empty || data_priv.get(this, "finish")) {
	              anim.stop(true);
	            }
	          };
	      doAnimation.finish = doAnimation;
	      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
	    },
	    stop: function(type, clearQueue, gotoEnd) {
	      var stopQueue = function(hooks) {
	        var stop = hooks.stop;
	        delete hooks.stop;
	        stop(gotoEnd);
	      };
	      if (typeof type !== "string") {
	        gotoEnd = clearQueue;
	        clearQueue = type;
	        type = undefined;
	      }
	      if (clearQueue && type !== false) {
	        this.queue(type || "fx", []);
	      }
	      return this.each(function() {
	        var dequeue = true,
	            index = type != null && type + "queueHooks",
	            timers = jQuery.timers,
	            data = data_priv.get(this);
	        if (index) {
	          if (data[index] && data[index].stop) {
	            stopQueue(data[index]);
	          }
	        } else {
	          for (index in data) {
	            if (data[index] && data[index].stop && rrun.test(index)) {
	              stopQueue(data[index]);
	            }
	          }
	        }
	        for (index = timers.length; index--; ) {
	          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
	            timers[index].anim.stop(gotoEnd);
	            dequeue = false;
	            timers.splice(index, 1);
	          }
	        }
	        if (dequeue || !gotoEnd) {
	          jQuery.dequeue(this, type);
	        }
	      });
	    },
	    finish: function(type) {
	      if (type !== false) {
	        type = type || "fx";
	      }
	      return this.each(function() {
	        var index,
	            data = data_priv.get(this),
	            queue = data[type + "queue"],
	            hooks = data[type + "queueHooks"],
	            timers = jQuery.timers,
	            length = queue ? queue.length : 0;
	        data.finish = true;
	        jQuery.queue(this, type, []);
	        if (hooks && hooks.stop) {
	          hooks.stop.call(this, true);
	        }
	        for (index = timers.length; index--; ) {
	          if (timers[index].elem === this && timers[index].queue === type) {
	            timers[index].anim.stop(true);
	            timers.splice(index, 1);
	          }
	        }
	        for (index = 0; index < length; index++) {
	          if (queue[index] && queue[index].finish) {
	            queue[index].finish.call(this);
	          }
	        }
	        delete data.finish;
	      });
	    }
	  });
	  jQuery.each(["toggle", "show", "hide"], function(i, name) {
	    var cssFn = jQuery.fn[name];
	    jQuery.fn[name] = function(speed, easing, callback) {
	      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
	    };
	  });
	  jQuery.each({
	    slideDown: genFx("show"),
	    slideUp: genFx("hide"),
	    slideToggle: genFx("toggle"),
	    fadeIn: {opacity: "show"},
	    fadeOut: {opacity: "hide"},
	    fadeToggle: {opacity: "toggle"}
	  }, function(name, props) {
	    jQuery.fn[name] = function(speed, easing, callback) {
	      return this.animate(props, speed, easing, callback);
	    };
	  });
	  jQuery.timers = [];
	  jQuery.fx.tick = function() {
	    var timer,
	        i = 0,
	        timers = jQuery.timers;
	    fxNow = jQuery.now();
	    for (; i < timers.length; i++) {
	      timer = timers[i];
	      if (!timer() && timers[i] === timer) {
	        timers.splice(i--, 1);
	      }
	    }
	    if (!timers.length) {
	      jQuery.fx.stop();
	    }
	    fxNow = undefined;
	  };
	  jQuery.fx.timer = function(timer) {
	    jQuery.timers.push(timer);
	    if (timer()) {
	      jQuery.fx.start();
	    } else {
	      jQuery.timers.pop();
	    }
	  };
	  jQuery.fx.interval = 13;
	  jQuery.fx.start = function() {
	    if (!timerId) {
	      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
	    }
	  };
	  jQuery.fx.stop = function() {
	    clearInterval(timerId);
	    timerId = null;
	  };
	  jQuery.fx.speeds = {
	    slow: 600,
	    fast: 200,
	    _default: 400
	  };
	  jQuery.fn.delay = function(time, type) {
	    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	    type = type || "fx";
	    return this.queue(type, function(next, hooks) {
	      var timeout = setTimeout(next, time);
	      hooks.stop = function() {
	        clearTimeout(timeout);
	      };
	    });
	  };
	  (function() {
	    var input = document.createElement("input"),
	        select = document.createElement("select"),
	        opt = select.appendChild(document.createElement("option"));
	    input.type = "checkbox";
	    support.checkOn = input.value !== "";
	    support.optSelected = opt.selected;
	    select.disabled = true;
	    support.optDisabled = !opt.disabled;
	    input = document.createElement("input");
	    input.value = "t";
	    input.type = "radio";
	    support.radioValue = input.value === "t";
	  })();
	  var nodeHook,
	      boolHook,
	      attrHandle = jQuery.expr.attrHandle;
	  jQuery.fn.extend({
	    attr: function(name, value) {
	      return access(this, jQuery.attr, name, value, arguments.length > 1);
	    },
	    removeAttr: function(name) {
	      return this.each(function() {
	        jQuery.removeAttr(this, name);
	      });
	    }
	  });
	  jQuery.extend({
	    attr: function(elem, name, value) {
	      var hooks,
	          ret,
	          nType = elem.nodeType;
	      if (!elem || nType === 3 || nType === 8 || nType === 2) {
	        return;
	      }
	      if (typeof elem.getAttribute === strundefined) {
	        return jQuery.prop(elem, name, value);
	      }
	      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	        name = name.toLowerCase();
	        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
	      }
	      if (value !== undefined) {
	        if (value === null) {
	          jQuery.removeAttr(elem, name);
	        } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	          return ret;
	        } else {
	          elem.setAttribute(name, value + "");
	          return value;
	        }
	      } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	        return ret;
	      } else {
	        ret = jQuery.find.attr(elem, name);
	        return ret == null ? undefined : ret;
	      }
	    },
	    removeAttr: function(elem, value) {
	      var name,
	          propName,
	          i = 0,
	          attrNames = value && value.match(rnotwhite);
	      if (attrNames && elem.nodeType === 1) {
	        while ((name = attrNames[i++])) {
	          propName = jQuery.propFix[name] || name;
	          if (jQuery.expr.match.bool.test(name)) {
	            elem[propName] = false;
	          }
	          elem.removeAttribute(name);
	        }
	      }
	    },
	    attrHooks: {type: {set: function(elem, value) {
	          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
	            var val = elem.value;
	            elem.setAttribute("type", value);
	            if (val) {
	              elem.value = val;
	            }
	            return value;
	          }
	        }}}
	  });
	  boolHook = {set: function(elem, value, name) {
	      if (value === false) {
	        jQuery.removeAttr(elem, name);
	      } else {
	        elem.setAttribute(name, name);
	      }
	      return name;
	    }};
	  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
	    var getter = attrHandle[name] || jQuery.find.attr;
	    attrHandle[name] = function(elem, name, isXML) {
	      var ret,
	          handle;
	      if (!isXML) {
	        handle = attrHandle[name];
	        attrHandle[name] = ret;
	        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
	        attrHandle[name] = handle;
	      }
	      return ret;
	    };
	  });
	  var rfocusable = /^(?:input|select|textarea|button)$/i;
	  jQuery.fn.extend({
	    prop: function(name, value) {
	      return access(this, jQuery.prop, name, value, arguments.length > 1);
	    },
	    removeProp: function(name) {
	      return this.each(function() {
	        delete this[jQuery.propFix[name] || name];
	      });
	    }
	  });
	  jQuery.extend({
	    propFix: {
	      "for": "htmlFor",
	      "class": "className"
	    },
	    prop: function(elem, name, value) {
	      var ret,
	          hooks,
	          notxml,
	          nType = elem.nodeType;
	      if (!elem || nType === 3 || nType === 8 || nType === 2) {
	        return;
	      }
	      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
	      if (notxml) {
	        name = jQuery.propFix[name] || name;
	        hooks = jQuery.propHooks[name];
	      }
	      if (value !== undefined) {
	        return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
	      } else {
	        return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
	      }
	    },
	    propHooks: {tabIndex: {get: function(elem) {
	          return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
	        }}}
	  });
	  if (!support.optSelected) {
	    jQuery.propHooks.selected = {get: function(elem) {
	        var parent = elem.parentNode;
	        if (parent && parent.parentNode) {
	          parent.parentNode.selectedIndex;
	        }
	        return null;
	      }};
	  }
	  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
	    jQuery.propFix[this.toLowerCase()] = this;
	  });
	  var rclass = /[\t\r\n\f]/g;
	  jQuery.fn.extend({
	    addClass: function(value) {
	      var classes,
	          elem,
	          cur,
	          clazz,
	          j,
	          finalValue,
	          proceed = typeof value === "string" && value,
	          i = 0,
	          len = this.length;
	      if (jQuery.isFunction(value)) {
	        return this.each(function(j) {
	          jQuery(this).addClass(value.call(this, j, this.className));
	        });
	      }
	      if (proceed) {
	        classes = (value || "").match(rnotwhite) || [];
	        for (; i < len; i++) {
	          elem = this[i];
	          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
	          if (cur) {
	            j = 0;
	            while ((clazz = classes[j++])) {
	              if (cur.indexOf(" " + clazz + " ") < 0) {
	                cur += clazz + " ";
	              }
	            }
	            finalValue = jQuery.trim(cur);
	            if (elem.className !== finalValue) {
	              elem.className = finalValue;
	            }
	          }
	        }
	      }
	      return this;
	    },
	    removeClass: function(value) {
	      var classes,
	          elem,
	          cur,
	          clazz,
	          j,
	          finalValue,
	          proceed = arguments.length === 0 || typeof value === "string" && value,
	          i = 0,
	          len = this.length;
	      if (jQuery.isFunction(value)) {
	        return this.each(function(j) {
	          jQuery(this).removeClass(value.call(this, j, this.className));
	        });
	      }
	      if (proceed) {
	        classes = (value || "").match(rnotwhite) || [];
	        for (; i < len; i++) {
	          elem = this[i];
	          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
	          if (cur) {
	            j = 0;
	            while ((clazz = classes[j++])) {
	              while (cur.indexOf(" " + clazz + " ") >= 0) {
	                cur = cur.replace(" " + clazz + " ", " ");
	              }
	            }
	            finalValue = value ? jQuery.trim(cur) : "";
	            if (elem.className !== finalValue) {
	              elem.className = finalValue;
	            }
	          }
	        }
	      }
	      return this;
	    },
	    toggleClass: function(value, stateVal) {
	      var type = typeof value;
	      if (typeof stateVal === "boolean" && type === "string") {
	        return stateVal ? this.addClass(value) : this.removeClass(value);
	      }
	      if (jQuery.isFunction(value)) {
	        return this.each(function(i) {
	          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
	        });
	      }
	      return this.each(function() {
	        if (type === "string") {
	          var className,
	              i = 0,
	              self = jQuery(this),
	              classNames = value.match(rnotwhite) || [];
	          while ((className = classNames[i++])) {
	            if (self.hasClass(className)) {
	              self.removeClass(className);
	            } else {
	              self.addClass(className);
	            }
	          }
	        } else if (type === strundefined || type === "boolean") {
	          if (this.className) {
	            data_priv.set(this, "__className__", this.className);
	          }
	          this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
	        }
	      });
	    },
	    hasClass: function(selector) {
	      var className = " " + selector + " ",
	          i = 0,
	          l = this.length;
	      for (; i < l; i++) {
	        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
	          return true;
	        }
	      }
	      return false;
	    }
	  });
	  var rreturn = /\r/g;
	  jQuery.fn.extend({val: function(value) {
	      var hooks,
	          ret,
	          isFunction,
	          elem = this[0];
	      if (!arguments.length) {
	        if (elem) {
	          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
	          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	            return ret;
	          }
	          ret = elem.value;
	          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
	        }
	        return;
	      }
	      isFunction = jQuery.isFunction(value);
	      return this.each(function(i) {
	        var val;
	        if (this.nodeType !== 1) {
	          return;
	        }
	        if (isFunction) {
	          val = value.call(this, i, jQuery(this).val());
	        } else {
	          val = value;
	        }
	        if (val == null) {
	          val = "";
	        } else if (typeof val === "number") {
	          val += "";
	        } else if (jQuery.isArray(val)) {
	          val = jQuery.map(val, function(value) {
	            return value == null ? "" : value + "";
	          });
	        }
	        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
	        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
	          this.value = val;
	        }
	      });
	    }});
	  jQuery.extend({valHooks: {
	      option: {get: function(elem) {
	          var val = jQuery.find.attr(elem, "value");
	          return val != null ? val : jQuery.trim(jQuery.text(elem));
	        }},
	      select: {
	        get: function(elem) {
	          var value,
	              option,
	              options = elem.options,
	              index = elem.selectedIndex,
	              one = elem.type === "select-one" || index < 0,
	              values = one ? null : [],
	              max = one ? index + 1 : options.length,
	              i = index < 0 ? max : one ? index : 0;
	          for (; i < max; i++) {
	            option = options[i];
	            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
	              value = jQuery(option).val();
	              if (one) {
	                return value;
	              }
	              values.push(value);
	            }
	          }
	          return values;
	        },
	        set: function(elem, value) {
	          var optionSet,
	              option,
	              options = elem.options,
	              values = jQuery.makeArray(value),
	              i = options.length;
	          while (i--) {
	            option = options[i];
	            if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
	              optionSet = true;
	            }
	          }
	          if (!optionSet) {
	            elem.selectedIndex = -1;
	          }
	          return values;
	        }
	      }
	    }});
	  jQuery.each(["radio", "checkbox"], function() {
	    jQuery.valHooks[this] = {set: function(elem, value) {
	        if (jQuery.isArray(value)) {
	          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
	        }
	      }};
	    if (!support.checkOn) {
	      jQuery.valHooks[this].get = function(elem) {
	        return elem.getAttribute("value") === null ? "on" : elem.value;
	      };
	    }
	  });
	  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
	    jQuery.fn[name] = function(data, fn) {
	      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
	    };
	  });
	  jQuery.fn.extend({
	    hover: function(fnOver, fnOut) {
	      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	    },
	    bind: function(types, data, fn) {
	      return this.on(types, null, data, fn);
	    },
	    unbind: function(types, fn) {
	      return this.off(types, null, fn);
	    },
	    delegate: function(selector, types, data, fn) {
	      return this.on(types, selector, data, fn);
	    },
	    undelegate: function(selector, types, fn) {
	      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
	    }
	  });
	  var nonce = jQuery.now();
	  var rquery = (/\?/);
	  jQuery.parseJSON = function(data) {
	    return JSON.parse(data + "");
	  };
	  jQuery.parseXML = function(data) {
	    var xml,
	        tmp;
	    if (!data || typeof data !== "string") {
	      return null;
	    }
	    try {
	      tmp = new DOMParser();
	      xml = tmp.parseFromString(data, "text/xml");
	    } catch (e) {
	      xml = undefined;
	    }
	    if (!xml || xml.getElementsByTagName("parsererror").length) {
	      jQuery.error("Invalid XML: " + data);
	    }
	    return xml;
	  };
	  var rhash = /#.*$/,
	      rts = /([?&])_=[^&]*/,
	      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      rnoContent = /^(?:GET|HEAD)$/,
	      rprotocol = /^\/\//,
	      rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	      prefilters = {},
	      transports = {},
	      allTypes = "*/".concat("*"),
	      ajaxLocation = window.location.href,
	      ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
	  function addToPrefiltersOrTransports(structure) {
	    return function(dataTypeExpression, func) {
	      if (typeof dataTypeExpression !== "string") {
	        func = dataTypeExpression;
	        dataTypeExpression = "*";
	      }
	      var dataType,
	          i = 0,
	          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
	      if (jQuery.isFunction(func)) {
	        while ((dataType = dataTypes[i++])) {
	          if (dataType[0] === "+") {
	            dataType = dataType.slice(1) || "*";
	            (structure[dataType] = structure[dataType] || []).unshift(func);
	          } else {
	            (structure[dataType] = structure[dataType] || []).push(func);
	          }
	        }
	      }
	    };
	  }
	  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
	    var inspected = {},
	        seekingTransport = (structure === transports);
	    function inspect(dataType) {
	      var selected;
	      inspected[dataType] = true;
	      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
	        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
	        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
	          options.dataTypes.unshift(dataTypeOrTransport);
	          inspect(dataTypeOrTransport);
	          return false;
	        } else if (seekingTransport) {
	          return !(selected = dataTypeOrTransport);
	        }
	      });
	      return selected;
	    }
	    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	  }
	  function ajaxExtend(target, src) {
	    var key,
	        deep,
	        flatOptions = jQuery.ajaxSettings.flatOptions || {};
	    for (key in src) {
	      if (src[key] !== undefined) {
	        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
	      }
	    }
	    if (deep) {
	      jQuery.extend(true, target, deep);
	    }
	    return target;
	  }
	  function ajaxHandleResponses(s, jqXHR, responses) {
	    var ct,
	        type,
	        finalDataType,
	        firstDataType,
	        contents = s.contents,
	        dataTypes = s.dataTypes;
	    while (dataTypes[0] === "*") {
	      dataTypes.shift();
	      if (ct === undefined) {
	        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
	      }
	    }
	    if (ct) {
	      for (type in contents) {
	        if (contents[type] && contents[type].test(ct)) {
	          dataTypes.unshift(type);
	          break;
	        }
	      }
	    }
	    if (dataTypes[0] in responses) {
	      finalDataType = dataTypes[0];
	    } else {
	      for (type in responses) {
	        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
	          finalDataType = type;
	          break;
	        }
	        if (!firstDataType) {
	          firstDataType = type;
	        }
	      }
	      finalDataType = finalDataType || firstDataType;
	    }
	    if (finalDataType) {
	      if (finalDataType !== dataTypes[0]) {
	        dataTypes.unshift(finalDataType);
	      }
	      return responses[finalDataType];
	    }
	  }
	  function ajaxConvert(s, response, jqXHR, isSuccess) {
	    var conv2,
	        current,
	        conv,
	        tmp,
	        prev,
	        converters = {},
	        dataTypes = s.dataTypes.slice();
	    if (dataTypes[1]) {
	      for (conv in s.converters) {
	        converters[conv.toLowerCase()] = s.converters[conv];
	      }
	    }
	    current = dataTypes.shift();
	    while (current) {
	      if (s.responseFields[current]) {
	        jqXHR[s.responseFields[current]] = response;
	      }
	      if (!prev && isSuccess && s.dataFilter) {
	        response = s.dataFilter(response, s.dataType);
	      }
	      prev = current;
	      current = dataTypes.shift();
	      if (current) {
	        if (current === "*") {
	          current = prev;
	        } else if (prev !== "*" && prev !== current) {
	          conv = converters[prev + " " + current] || converters["* " + current];
	          if (!conv) {
	            for (conv2 in converters) {
	              tmp = conv2.split(" ");
	              if (tmp[1] === current) {
	                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
	                if (conv) {
	                  if (conv === true) {
	                    conv = converters[conv2];
	                  } else if (converters[conv2] !== true) {
	                    current = tmp[0];
	                    dataTypes.unshift(tmp[1]);
	                  }
	                  break;
	                }
	              }
	            }
	          }
	          if (conv !== true) {
	            if (conv && s["throws"]) {
	              response = conv(response);
	            } else {
	              try {
	                response = conv(response);
	              } catch (e) {
	                return {
	                  state: "parsererror",
	                  error: conv ? e : "No conversion from " + prev + " to " + current
	                };
	              }
	            }
	          }
	        }
	      }
	    }
	    return {
	      state: "success",
	      data: response
	    };
	  }
	  jQuery.extend({
	    active: 0,
	    lastModified: {},
	    etag: {},
	    ajaxSettings: {
	      url: ajaxLocation,
	      type: "GET",
	      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
	      global: true,
	      processData: true,
	      async: true,
	      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	      accepts: {
	        "*": allTypes,
	        text: "text/plain",
	        html: "text/html",
	        xml: "application/xml, text/xml",
	        json: "application/json, text/javascript"
	      },
	      contents: {
	        xml: /xml/,
	        html: /html/,
	        json: /json/
	      },
	      responseFields: {
	        xml: "responseXML",
	        text: "responseText",
	        json: "responseJSON"
	      },
	      converters: {
	        "* text": String,
	        "text html": true,
	        "text json": jQuery.parseJSON,
	        "text xml": jQuery.parseXML
	      },
	      flatOptions: {
	        url: true,
	        context: true
	      }
	    },
	    ajaxSetup: function(target, settings) {
	      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
	    },
	    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	    ajaxTransport: addToPrefiltersOrTransports(transports),
	    ajax: function(url, options) {
	      if (typeof url === "object") {
	        options = url;
	        url = undefined;
	      }
	      options = options || {};
	      var transport,
	          cacheURL,
	          responseHeadersString,
	          responseHeaders,
	          timeoutTimer,
	          parts,
	          fireGlobals,
	          i,
	          s = jQuery.ajaxSetup({}, options),
	          callbackContext = s.context || s,
	          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
	          deferred = jQuery.Deferred(),
	          completeDeferred = jQuery.Callbacks("once memory"),
	          statusCode = s.statusCode || {},
	          requestHeaders = {},
	          requestHeadersNames = {},
	          state = 0,
	          strAbort = "canceled",
	          jqXHR = {
	            readyState: 0,
	            getResponseHeader: function(key) {
	              var match;
	              if (state === 2) {
	                if (!responseHeaders) {
	                  responseHeaders = {};
	                  while ((match = rheaders.exec(responseHeadersString))) {
	                    responseHeaders[match[1].toLowerCase()] = match[2];
	                  }
	                }
	                match = responseHeaders[key.toLowerCase()];
	              }
	              return match == null ? null : match;
	            },
	            getAllResponseHeaders: function() {
	              return state === 2 ? responseHeadersString : null;
	            },
	            setRequestHeader: function(name, value) {
	              var lname = name.toLowerCase();
	              if (!state) {
	                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
	                requestHeaders[name] = value;
	              }
	              return this;
	            },
	            overrideMimeType: function(type) {
	              if (!state) {
	                s.mimeType = type;
	              }
	              return this;
	            },
	            statusCode: function(map) {
	              var code;
	              if (map) {
	                if (state < 2) {
	                  for (code in map) {
	                    statusCode[code] = [statusCode[code], map[code]];
	                  }
	                } else {
	                  jqXHR.always(map[jqXHR.status]);
	                }
	              }
	              return this;
	            },
	            abort: function(statusText) {
	              var finalText = statusText || strAbort;
	              if (transport) {
	                transport.abort(finalText);
	              }
	              done(0, finalText);
	              return this;
	            }
	          };
	      deferred.promise(jqXHR).complete = completeDeferred.add;
	      jqXHR.success = jqXHR.done;
	      jqXHR.error = jqXHR.fail;
	      s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
	      s.type = options.method || options.type || s.method || s.type;
	      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
	      if (s.crossDomain == null) {
	        parts = rurl.exec(s.url.toLowerCase());
	        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
	      }
	      if (s.data && s.processData && typeof s.data !== "string") {
	        s.data = jQuery.param(s.data, s.traditional);
	      }
	      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
	      if (state === 2) {
	        return jqXHR;
	      }
	      fireGlobals = jQuery.event && s.global;
	      if (fireGlobals && jQuery.active++ === 0) {
	        jQuery.event.trigger("ajaxStart");
	      }
	      s.type = s.type.toUpperCase();
	      s.hasContent = !rnoContent.test(s.type);
	      cacheURL = s.url;
	      if (!s.hasContent) {
	        if (s.data) {
	          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
	          delete s.data;
	        }
	        if (s.cache === false) {
	          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
	        }
	      }
	      if (s.ifModified) {
	        if (jQuery.lastModified[cacheURL]) {
	          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
	        }
	        if (jQuery.etag[cacheURL]) {
	          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
	        }
	      }
	      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
	        jqXHR.setRequestHeader("Content-Type", s.contentType);
	      }
	      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
	      for (i in s.headers) {
	        jqXHR.setRequestHeader(i, s.headers[i]);
	      }
	      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
	        return jqXHR.abort();
	      }
	      strAbort = "abort";
	      for (i in {
	        success: 1,
	        error: 1,
	        complete: 1
	      }) {
	        jqXHR[i](s[i]);
	      }
	      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
	      if (!transport) {
	        done(-1, "No Transport");
	      } else {
	        jqXHR.readyState = 1;
	        if (fireGlobals) {
	          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
	        }
	        if (s.async && s.timeout > 0) {
	          timeoutTimer = setTimeout(function() {
	            jqXHR.abort("timeout");
	          }, s.timeout);
	        }
	        try {
	          state = 1;
	          transport.send(requestHeaders, done);
	        } catch (e) {
	          if (state < 2) {
	            done(-1, e);
	          } else {
	            throw e;
	          }
	        }
	      }
	      function done(status, nativeStatusText, responses, headers) {
	        var isSuccess,
	            success,
	            error,
	            response,
	            modified,
	            statusText = nativeStatusText;
	        if (state === 2) {
	          return;
	        }
	        state = 2;
	        if (timeoutTimer) {
	          clearTimeout(timeoutTimer);
	        }
	        transport = undefined;
	        responseHeadersString = headers || "";
	        jqXHR.readyState = status > 0 ? 4 : 0;
	        isSuccess = status >= 200 && status < 300 || status === 304;
	        if (responses) {
	          response = ajaxHandleResponses(s, jqXHR, responses);
	        }
	        response = ajaxConvert(s, response, jqXHR, isSuccess);
	        if (isSuccess) {
	          if (s.ifModified) {
	            modified = jqXHR.getResponseHeader("Last-Modified");
	            if (modified) {
	              jQuery.lastModified[cacheURL] = modified;
	            }
	            modified = jqXHR.getResponseHeader("etag");
	            if (modified) {
	              jQuery.etag[cacheURL] = modified;
	            }
	          }
	          if (status === 204 || s.type === "HEAD") {
	            statusText = "nocontent";
	          } else if (status === 304) {
	            statusText = "notmodified";
	          } else {
	            statusText = response.state;
	            success = response.data;
	            error = response.error;
	            isSuccess = !error;
	          }
	        } else {
	          error = statusText;
	          if (status || !statusText) {
	            statusText = "error";
	            if (status < 0) {
	              status = 0;
	            }
	          }
	        }
	        jqXHR.status = status;
	        jqXHR.statusText = (nativeStatusText || statusText) + "";
	        if (isSuccess) {
	          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
	        } else {
	          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
	        }
	        jqXHR.statusCode(statusCode);
	        statusCode = undefined;
	        if (fireGlobals) {
	          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
	        }
	        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
	        if (fireGlobals) {
	          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
	          if (!(--jQuery.active)) {
	            jQuery.event.trigger("ajaxStop");
	          }
	        }
	      }
	      return jqXHR;
	    },
	    getJSON: function(url, data, callback) {
	      return jQuery.get(url, data, callback, "json");
	    },
	    getScript: function(url, callback) {
	      return jQuery.get(url, undefined, callback, "script");
	    }
	  });
	  jQuery.each(["get", "post"], function(i, method) {
	    jQuery[method] = function(url, data, callback, type) {
	      if (jQuery.isFunction(data)) {
	        type = type || callback;
	        callback = data;
	        data = undefined;
	      }
	      return jQuery.ajax({
	        url: url,
	        type: method,
	        dataType: type,
	        data: data,
	        success: callback
	      });
	    };
	  });
	  jQuery._evalUrl = function(url) {
	    return jQuery.ajax({
	      url: url,
	      type: "GET",
	      dataType: "script",
	      async: false,
	      global: false,
	      "throws": true
	    });
	  };
	  jQuery.fn.extend({
	    wrapAll: function(html) {
	      var wrap;
	      if (jQuery.isFunction(html)) {
	        return this.each(function(i) {
	          jQuery(this).wrapAll(html.call(this, i));
	        });
	      }
	      if (this[0]) {
	        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
	        if (this[0].parentNode) {
	          wrap.insertBefore(this[0]);
	        }
	        wrap.map(function() {
	          var elem = this;
	          while (elem.firstElementChild) {
	            elem = elem.firstElementChild;
	          }
	          return elem;
	        }).append(this);
	      }
	      return this;
	    },
	    wrapInner: function(html) {
	      if (jQuery.isFunction(html)) {
	        return this.each(function(i) {
	          jQuery(this).wrapInner(html.call(this, i));
	        });
	      }
	      return this.each(function() {
	        var self = jQuery(this),
	            contents = self.contents();
	        if (contents.length) {
	          contents.wrapAll(html);
	        } else {
	          self.append(html);
	        }
	      });
	    },
	    wrap: function(html) {
	      var isFunction = jQuery.isFunction(html);
	      return this.each(function(i) {
	        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
	      });
	    },
	    unwrap: function() {
	      return this.parent().each(function() {
	        if (!jQuery.nodeName(this, "body")) {
	          jQuery(this).replaceWith(this.childNodes);
	        }
	      }).end();
	    }
	  });
	  jQuery.expr.filters.hidden = function(elem) {
	    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	  };
	  jQuery.expr.filters.visible = function(elem) {
	    return !jQuery.expr.filters.hidden(elem);
	  };
	  var r20 = /%20/g,
	      rbracket = /\[\]$/,
	      rCRLF = /\r?\n/g,
	      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	      rsubmittable = /^(?:input|select|textarea|keygen)/i;
	  function buildParams(prefix, obj, traditional, add) {
	    var name;
	    if (jQuery.isArray(obj)) {
	      jQuery.each(obj, function(i, v) {
	        if (traditional || rbracket.test(prefix)) {
	          add(prefix, v);
	        } else {
	          buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
	        }
	      });
	    } else if (!traditional && jQuery.type(obj) === "object") {
	      for (name in obj) {
	        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
	      }
	    } else {
	      add(prefix, obj);
	    }
	  }
	  jQuery.param = function(a, traditional) {
	    var prefix,
	        s = [],
	        add = function(key, value) {
	          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
	          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	        };
	    if (traditional === undefined) {
	      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	    }
	    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
	      jQuery.each(a, function() {
	        add(this.name, this.value);
	      });
	    } else {
	      for (prefix in a) {
	        buildParams(prefix, a[prefix], traditional, add);
	      }
	    }
	    return s.join("&").replace(r20, "+");
	  };
	  jQuery.fn.extend({
	    serialize: function() {
	      return jQuery.param(this.serializeArray());
	    },
	    serializeArray: function() {
	      return this.map(function() {
	        var elements = jQuery.prop(this, "elements");
	        return elements ? jQuery.makeArray(elements) : this;
	      }).filter(function() {
	        var type = this.type;
	        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
	      }).map(function(i, elem) {
	        var val = jQuery(this).val();
	        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
	          return {
	            name: elem.name,
	            value: val.replace(rCRLF, "\r\n")
	          };
	        }) : {
	          name: elem.name,
	          value: val.replace(rCRLF, "\r\n")
	        };
	      }).get();
	    }
	  });
	  jQuery.ajaxSettings.xhr = function() {
	    try {
	      return new XMLHttpRequest();
	    } catch (e) {}
	  };
	  var xhrId = 0,
	      xhrCallbacks = {},
	      xhrSuccessStatus = {
	        0: 200,
	        1223: 204
	      },
	      xhrSupported = jQuery.ajaxSettings.xhr();
	  if (window.attachEvent) {
	    window.attachEvent("onunload", function() {
	      for (var key in xhrCallbacks) {
	        xhrCallbacks[key]();
	      }
	    });
	  }
	  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
	  support.ajax = xhrSupported = !!xhrSupported;
	  jQuery.ajaxTransport(function(options) {
	    var callback;
	    if (support.cors || xhrSupported && !options.crossDomain) {
	      return {
	        send: function(headers, complete) {
	          var i,
	              xhr = options.xhr(),
	              id = ++xhrId;
	          xhr.open(options.type, options.url, options.async, options.username, options.password);
	          if (options.xhrFields) {
	            for (i in options.xhrFields) {
	              xhr[i] = options.xhrFields[i];
	            }
	          }
	          if (options.mimeType && xhr.overrideMimeType) {
	            xhr.overrideMimeType(options.mimeType);
	          }
	          if (!options.crossDomain && !headers["X-Requested-With"]) {
	            headers["X-Requested-With"] = "XMLHttpRequest";
	          }
	          for (i in headers) {
	            xhr.setRequestHeader(i, headers[i]);
	          }
	          callback = function(type) {
	            return function() {
	              if (callback) {
	                delete xhrCallbacks[id];
	                callback = xhr.onload = xhr.onerror = null;
	                if (type === "abort") {
	                  xhr.abort();
	                } else if (type === "error") {
	                  complete(xhr.status, xhr.statusText);
	                } else {
	                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {text: xhr.responseText} : undefined, xhr.getAllResponseHeaders());
	                }
	              }
	            };
	          };
	          xhr.onload = callback();
	          xhr.onerror = callback("error");
	          callback = xhrCallbacks[id] = callback("abort");
	          try {
	            xhr.send(options.hasContent && options.data || null);
	          } catch (e) {
	            if (callback) {
	              throw e;
	            }
	          }
	        },
	        abort: function() {
	          if (callback) {
	            callback();
	          }
	        }
	      };
	    }
	  });
	  jQuery.ajaxSetup({
	    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
	    contents: {script: /(?:java|ecma)script/},
	    converters: {"text script": function(text) {
	        jQuery.globalEval(text);
	        return text;
	      }}
	  });
	  jQuery.ajaxPrefilter("script", function(s) {
	    if (s.cache === undefined) {
	      s.cache = false;
	    }
	    if (s.crossDomain) {
	      s.type = "GET";
	    }
	  });
	  jQuery.ajaxTransport("script", function(s) {
	    if (s.crossDomain) {
	      var script,
	          callback;
	      return {
	        send: function(_, complete) {
	          script = jQuery("<script>").prop({
	            async: true,
	            charset: s.scriptCharset,
	            src: s.url
	          }).on("load error", callback = function(evt) {
	            script.remove();
	            callback = null;
	            if (evt) {
	              complete(evt.type === "error" ? 404 : 200, evt.type);
	            }
	          });
	          document.head.appendChild(script[0]);
	        },
	        abort: function() {
	          if (callback) {
	            callback();
	          }
	        }
	      };
	    }
	  });
	  var oldCallbacks = [],
	      rjsonp = /(=)\?(?=&|$)|\?\?/;
	  jQuery.ajaxSetup({
	    jsonp: "callback",
	    jsonpCallback: function() {
	      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
	      this[callback] = true;
	      return callback;
	    }
	  });
	  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
	    var callbackName,
	        overwritten,
	        responseContainer,
	        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
	    if (jsonProp || s.dataTypes[0] === "jsonp") {
	      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
	      if (jsonProp) {
	        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
	      } else if (s.jsonp !== false) {
	        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
	      }
	      s.converters["script json"] = function() {
	        if (!responseContainer) {
	          jQuery.error(callbackName + " was not called");
	        }
	        return responseContainer[0];
	      };
	      s.dataTypes[0] = "json";
	      overwritten = window[callbackName];
	      window[callbackName] = function() {
	        responseContainer = arguments;
	      };
	      jqXHR.always(function() {
	        window[callbackName] = overwritten;
	        if (s[callbackName]) {
	          s.jsonpCallback = originalSettings.jsonpCallback;
	          oldCallbacks.push(callbackName);
	        }
	        if (responseContainer && jQuery.isFunction(overwritten)) {
	          overwritten(responseContainer[0]);
	        }
	        responseContainer = overwritten = undefined;
	      });
	      return "script";
	    }
	  });
	  jQuery.parseHTML = function(data, context, keepScripts) {
	    if (!data || typeof data !== "string") {
	      return null;
	    }
	    if (typeof context === "boolean") {
	      keepScripts = context;
	      context = false;
	    }
	    context = context || document;
	    var parsed = rsingleTag.exec(data),
	        scripts = !keepScripts && [];
	    if (parsed) {
	      return [context.createElement(parsed[1])];
	    }
	    parsed = jQuery.buildFragment([data], context, scripts);
	    if (scripts && scripts.length) {
	      jQuery(scripts).remove();
	    }
	    return jQuery.merge([], parsed.childNodes);
	  };
	  var _load = jQuery.fn.load;
	  jQuery.fn.load = function(url, params, callback) {
	    if (typeof url !== "string" && _load) {
	      return _load.apply(this, arguments);
	    }
	    var selector,
	        type,
	        response,
	        self = this,
	        off = url.indexOf(" ");
	    if (off >= 0) {
	      selector = jQuery.trim(url.slice(off));
	      url = url.slice(0, off);
	    }
	    if (jQuery.isFunction(params)) {
	      callback = params;
	      params = undefined;
	    } else if (params && typeof params === "object") {
	      type = "POST";
	    }
	    if (self.length > 0) {
	      jQuery.ajax({
	        url: url,
	        type: type,
	        dataType: "html",
	        data: params
	      }).done(function(responseText) {
	        response = arguments;
	        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
	      }).complete(callback && function(jqXHR, status) {
	        self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
	      });
	    }
	    return this;
	  };
	  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
	    jQuery.fn[type] = function(fn) {
	      return this.on(type, fn);
	    };
	  });
	  jQuery.expr.filters.animated = function(elem) {
	    return jQuery.grep(jQuery.timers, function(fn) {
	      return elem === fn.elem;
	    }).length;
	  };
	  var docElem = window.document.documentElement;
	  function getWindow(elem) {
	    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	  }
	  jQuery.offset = {setOffset: function(elem, options, i) {
	      var curPosition,
	          curLeft,
	          curCSSTop,
	          curTop,
	          curOffset,
	          curCSSLeft,
	          calculatePosition,
	          position = jQuery.css(elem, "position"),
	          curElem = jQuery(elem),
	          props = {};
	      if (position === "static") {
	        elem.style.position = "relative";
	      }
	      curOffset = curElem.offset();
	      curCSSTop = jQuery.css(elem, "top");
	      curCSSLeft = jQuery.css(elem, "left");
	      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
	      if (calculatePosition) {
	        curPosition = curElem.position();
	        curTop = curPosition.top;
	        curLeft = curPosition.left;
	      } else {
	        curTop = parseFloat(curCSSTop) || 0;
	        curLeft = parseFloat(curCSSLeft) || 0;
	      }
	      if (jQuery.isFunction(options)) {
	        options = options.call(elem, i, curOffset);
	      }
	      if (options.top != null) {
	        props.top = (options.top - curOffset.top) + curTop;
	      }
	      if (options.left != null) {
	        props.left = (options.left - curOffset.left) + curLeft;
	      }
	      if ("using" in options) {
	        options.using.call(elem, props);
	      } else {
	        curElem.css(props);
	      }
	    }};
	  jQuery.fn.extend({
	    offset: function(options) {
	      if (arguments.length) {
	        return options === undefined ? this : this.each(function(i) {
	          jQuery.offset.setOffset(this, options, i);
	        });
	      }
	      var docElem,
	          win,
	          elem = this[0],
	          box = {
	            top: 0,
	            left: 0
	          },
	          doc = elem && elem.ownerDocument;
	      if (!doc) {
	        return;
	      }
	      docElem = doc.documentElement;
	      if (!jQuery.contains(docElem, elem)) {
	        return box;
	      }
	      if (typeof elem.getBoundingClientRect !== strundefined) {
	        box = elem.getBoundingClientRect();
	      }
	      win = getWindow(doc);
	      return {
	        top: box.top + win.pageYOffset - docElem.clientTop,
	        left: box.left + win.pageXOffset - docElem.clientLeft
	      };
	    },
	    position: function() {
	      if (!this[0]) {
	        return;
	      }
	      var offsetParent,
	          offset,
	          elem = this[0],
	          parentOffset = {
	            top: 0,
	            left: 0
	          };
	      if (jQuery.css(elem, "position") === "fixed") {
	        offset = elem.getBoundingClientRect();
	      } else {
	        offsetParent = this.offsetParent();
	        offset = this.offset();
	        if (!jQuery.nodeName(offsetParent[0], "html")) {
	          parentOffset = offsetParent.offset();
	        }
	        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
	        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
	      }
	      return {
	        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
	        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
	      };
	    },
	    offsetParent: function() {
	      return this.map(function() {
	        var offsetParent = this.offsetParent || docElem;
	        while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
	          offsetParent = offsetParent.offsetParent;
	        }
	        return offsetParent || docElem;
	      });
	    }
	  });
	  jQuery.each({
	    scrollLeft: "pageXOffset",
	    scrollTop: "pageYOffset"
	  }, function(method, prop) {
	    var top = "pageYOffset" === prop;
	    jQuery.fn[method] = function(val) {
	      return access(this, function(elem, method, val) {
	        var win = getWindow(elem);
	        if (val === undefined) {
	          return win ? win[prop] : elem[method];
	        }
	        if (win) {
	          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
	        } else {
	          elem[method] = val;
	        }
	      }, method, val, arguments.length, null);
	    };
	  });
	  jQuery.each(["top", "left"], function(i, prop) {
	    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
	      if (computed) {
	        computed = curCSS(elem, prop);
	        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
	      }
	    });
	  });
	  jQuery.each({
	    Height: "height",
	    Width: "width"
	  }, function(name, type) {
	    jQuery.each({
	      padding: "inner" + name,
	      content: type,
	      "": "outer" + name
	    }, function(defaultExtra, funcName) {
	      jQuery.fn[funcName] = function(margin, value) {
	        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
	            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
	        return access(this, function(elem, type, value) {
	          var doc;
	          if (jQuery.isWindow(elem)) {
	            return elem.document.documentElement["client" + name];
	          }
	          if (elem.nodeType === 9) {
	            doc = elem.documentElement;
	            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
	          }
	          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
	        }, type, chainable ? margin : undefined, chainable, null);
	      };
	    });
	  });
	  jQuery.fn.size = function() {
	    return this.length;
	  };
	  jQuery.fn.andSelf = jQuery.fn.addBack;
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return jQuery;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  var _jQuery = window.jQuery,
	      _$ = window.$;
	  jQuery.noConflict = function(deep) {
	    if (window.$ === jQuery) {
	      window.$ = _$;
	    }
	    if (deep && window.jQuery === jQuery) {
	      window.jQuery = _jQuery;
	    }
	    return jQuery;
	  };
	  if (typeof noGlobal === strundefined) {
	    window.jQuery = window.$ = jQuery;
	  }
	  return jQuery;
	}));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(process) {!function(e) {
	  if (true)
	    module.exports = e();
	  else if ("function" == typeof define && define.amd)
	    define([], e);
	  else {
	    var f;
	    "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Promise = e();
	  }
	}(function() {
	  var define,
	      module,
	      exports;
	  return (function e(t, n, r) {
	    function s(o, u) {
	      if (!n[o]) {
	        if (!t[o]) {
	          var a = typeof require == "function" && require;
	          if (!u && a)
	            return require(o, !0);
	          if (i)
	            return i(o, !0);
	          throw new Error("Cannot find module '" + o + "'");
	        }
	        var f = n[o] = {exports: {}};
	        t[o][0].call(f.exports, function(e) {
	          var n = t[o][1][e];
	          return s(n ? n : e);
	        }, f, f.exports, e, t, n, r);
	      }
	      return n[o].exports;
	    }
	    var i = typeof require == "function" && require;
	    for (var o = 0; o < r.length; o++)
	      s(r[o]);
	    return s;
	  })({
	    1: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise) {
	        var SomePromiseArray = Promise._SomePromiseArray;
	        function Promise$_Any(promises) {
	          var ret = new SomePromiseArray(promises);
	          var promise = ret.promise();
	          if (promise.isRejected()) {
	            return promise;
	          }
	          ret.setHowMany(1);
	          ret.setUnwrap();
	          ret.init();
	          return promise;
	        }
	        Promise.any = function Promise$Any(promises) {
	          return Promise$_Any(promises);
	        };
	        Promise.prototype.any = function Promise$any() {
	          return Promise$_Any(this);
	        };
	      };
	    }, {}],
	    2: [function(_dereq_, module, exports) {
	      "use strict";
	      var schedule = _dereq_("./schedule.js");
	      var Queue = _dereq_("./queue.js");
	      var errorObj = _dereq_("./util.js").errorObj;
	      var tryCatch1 = _dereq_("./util.js").tryCatch1;
	      var _process = typeof process !== "undefined" ? process : void 0;
	      function Async() {
	        this._isTickUsed = false;
	        this._schedule = schedule;
	        this._length = 0;
	        this._lateBuffer = new Queue(16);
	        this._functionBuffer = new Queue(65536);
	        var self = this;
	        this.consumeFunctionBuffer = function Async$consumeFunctionBuffer() {
	          self._consumeFunctionBuffer();
	        };
	      }
	      Async.prototype.haveItemsQueued = function Async$haveItemsQueued() {
	        return this._length > 0;
	      };
	      Async.prototype.invokeLater = function Async$invokeLater(fn, receiver, arg) {
	        if (_process !== void 0 && _process.domain != null && !fn.domain) {
	          fn = _process.domain.bind(fn);
	        }
	        this._lateBuffer.push(fn, receiver, arg);
	        this._queueTick();
	      };
	      Async.prototype.invoke = function Async$invoke(fn, receiver, arg) {
	        if (_process !== void 0 && _process.domain != null && !fn.domain) {
	          fn = _process.domain.bind(fn);
	        }
	        var functionBuffer = this._functionBuffer;
	        functionBuffer.push(fn, receiver, arg);
	        this._length = functionBuffer.length();
	        this._queueTick();
	      };
	      Async.prototype._consumeFunctionBuffer = function Async$_consumeFunctionBuffer() {
	        var functionBuffer = this._functionBuffer;
	        while (functionBuffer.length() > 0) {
	          var fn = functionBuffer.shift();
	          var receiver = functionBuffer.shift();
	          var arg = functionBuffer.shift();
	          fn.call(receiver, arg);
	        }
	        this._reset();
	        this._consumeLateBuffer();
	      };
	      Async.prototype._consumeLateBuffer = function Async$_consumeLateBuffer() {
	        var buffer = this._lateBuffer;
	        while (buffer.length() > 0) {
	          var fn = buffer.shift();
	          var receiver = buffer.shift();
	          var arg = buffer.shift();
	          var res = tryCatch1(fn, receiver, arg);
	          if (res === errorObj) {
	            this._queueTick();
	            if (fn.domain != null) {
	              fn.domain.emit("error", res.e);
	            } else {
	              throw res.e;
	            }
	          }
	        }
	      };
	      Async.prototype._queueTick = function Async$_queue() {
	        if (!this._isTickUsed) {
	          this._schedule(this.consumeFunctionBuffer);
	          this._isTickUsed = true;
	        }
	      };
	      Async.prototype._reset = function Async$_reset() {
	        this._isTickUsed = false;
	        this._length = 0;
	      };
	      module.exports = new Async();
	    }, {
	      "./queue.js": 25,
	      "./schedule.js": 28,
	      "./util.js": 35
	    }],
	    3: [function(_dereq_, module, exports) {
	      "use strict";
	      var Promise = _dereq_("./promise.js")();
	      module.exports = Promise;
	    }, {"./promise.js": 20}],
	    4: [function(_dereq_, module, exports) {
	      "use strict";
	      var cr = Object.create;
	      if (cr) {
	        var callerCache = cr(null);
	        var getterCache = cr(null);
	        callerCache[" size"] = getterCache[" size"] = 0;
	      }
	      module.exports = function(Promise) {
	        var util = _dereq_("./util.js");
	        var canEvaluate = util.canEvaluate;
	        var isIdentifier = util.isIdentifier;
	        function makeMethodCaller(methodName) {
	          return new Function("obj", "                                             \n\
	        'use strict'                                                         \n\
	        var len = this.length;                                               \n\
	        switch(len) {                                                        \n\
	            case 1: return obj.methodName(this[0]);                          \n\
	            case 2: return obj.methodName(this[0], this[1]);                 \n\
	            case 3: return obj.methodName(this[0], this[1], this[2]);        \n\
	            case 0: return obj.methodName();                                 \n\
	            default: return obj.methodName.apply(obj, this);                 \n\
	        }                                                                    \n\
	        ".replace(/methodName/g, methodName));
	        }
	        function makeGetter(propertyName) {
	          return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	        }
	        function getCompiled(name, compiler, cache) {
	          var ret = cache[name];
	          if (typeof ret !== "function") {
	            if (!isIdentifier(name)) {
	              return null;
	            }
	            ret = compiler(name);
	            cache[name] = ret;
	            cache[" size"]++;
	            if (cache[" size"] > 512) {
	              var keys = Object.keys(cache);
	              for (var i = 0; i < 256; ++i)
	                delete cache[keys[i]];
	              cache[" size"] = keys.length - 256;
	            }
	          }
	          return ret;
	        }
	        function getMethodCaller(name) {
	          return getCompiled(name, makeMethodCaller, callerCache);
	        }
	        function getGetter(name) {
	          return getCompiled(name, makeGetter, getterCache);
	        }
	        function caller(obj) {
	          return obj[this.pop()].apply(obj, this);
	        }
	        Promise.prototype.call = function Promise$call(methodName) {
	          var $_len = arguments.length;
	          var args = new Array($_len - 1);
	          for (var $_i = 1; $_i < $_len; ++$_i) {
	            args[$_i - 1] = arguments[$_i];
	          }
	          if (canEvaluate) {
	            var maybeCaller = getMethodCaller(methodName);
	            if (maybeCaller !== null) {
	              return this._then(maybeCaller, void 0, void 0, args, void 0);
	            }
	          }
	          args.push(methodName);
	          return this._then(caller, void 0, void 0, args, void 0);
	        };
	        function namedGetter(obj) {
	          return obj[this];
	        }
	        function indexedGetter(obj) {
	          return obj[this];
	        }
	        Promise.prototype.get = function Promise$get(propertyName) {
	          var isIndex = (typeof propertyName === "number");
	          var getter;
	          if (!isIndex) {
	            if (canEvaluate) {
	              var maybeGetter = getGetter(propertyName);
	              getter = maybeGetter !== null ? maybeGetter : namedGetter;
	            } else {
	              getter = namedGetter;
	            }
	          } else {
	            getter = indexedGetter;
	          }
	          return this._then(getter, void 0, void 0, propertyName, void 0);
	        };
	      };
	    }, {"./util.js": 35}],
	    5: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL) {
	        var errors = _dereq_("./errors.js");
	        var canAttach = errors.canAttach;
	        var async = _dereq_("./async.js");
	        var CancellationError = errors.CancellationError;
	        Promise.prototype._cancel = function Promise$_cancel(reason) {
	          if (!this.isCancellable())
	            return this;
	          var parent;
	          var promiseToReject = this;
	          while ((parent = promiseToReject._cancellationParent) !== void 0 && parent.isCancellable()) {
	            promiseToReject = parent;
	          }
	          this._unsetCancellable();
	          promiseToReject._attachExtraTrace(reason);
	          promiseToReject._rejectUnchecked(reason);
	        };
	        Promise.prototype.cancel = function Promise$cancel(reason) {
	          if (!this.isCancellable())
	            return this;
	          reason = reason !== void 0 ? (canAttach(reason) ? reason : new Error(reason + "")) : new CancellationError();
	          async.invokeLater(this._cancel, this, reason);
	          return this;
	        };
	        Promise.prototype.cancellable = function Promise$cancellable() {
	          if (this._cancellable())
	            return this;
	          this._setCancellable();
	          this._cancellationParent = void 0;
	          return this;
	        };
	        Promise.prototype.uncancellable = function Promise$uncancellable() {
	          var ret = new Promise(INTERNAL);
	          ret._propagateFrom(this, 2 | 4);
	          ret._follow(this);
	          ret._unsetCancellable();
	          return ret;
	        };
	        Promise.prototype.fork = function Promise$fork(didFulfill, didReject, didProgress) {
	          var ret = this._then(didFulfill, didReject, didProgress, void 0, void 0);
	          ret._setCancellable();
	          ret._cancellationParent = void 0;
	          return ret;
	        };
	      };
	    }, {
	      "./async.js": 2,
	      "./errors.js": 10
	    }],
	    6: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function() {
	        var inherits = _dereq_("./util.js").inherits;
	        var defineProperty = _dereq_("./es5.js").defineProperty;
	        var rignore = new RegExp("\\b(?:[a-zA-Z0-9.]+\\$_\\w+|" + "tryCatch(?:1|2|3|4|Apply)|new \\w*PromiseArray|" + "\\w*PromiseArray\\.\\w*PromiseArray|" + "setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|" + "process._tickCallback|nextTick|Async\\$\\w+)\\b");
	        var rtraceline = null;
	        var formatStack = null;
	        function formatNonError(obj) {
	          var str;
	          if (typeof obj === "function") {
	            str = "[function " + (obj.name || "anonymous") + "]";
	          } else {
	            str = obj.toString();
	            var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	            if (ruselessToString.test(str)) {
	              try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	              } catch (e) {}
	            }
	            if (str.length === 0) {
	              str = "(empty array)";
	            }
	          }
	          return ("(<" + snip(str) + ">, no stack trace)");
	        }
	        function snip(str) {
	          var maxChars = 41;
	          if (str.length < maxChars) {
	            return str;
	          }
	          return str.substr(0, maxChars - 3) + "...";
	        }
	        function CapturedTrace(ignoreUntil, isTopLevel) {
	          this.captureStackTrace(CapturedTrace, isTopLevel);
	        }
	        inherits(CapturedTrace, Error);
	        CapturedTrace.prototype.captureStackTrace = function CapturedTrace$captureStackTrace(ignoreUntil, isTopLevel) {
	          captureStackTrace(this, ignoreUntil, isTopLevel);
	        };
	        CapturedTrace.possiblyUnhandledRejection = function CapturedTrace$PossiblyUnhandledRejection(reason) {
	          if (typeof console === "object") {
	            var message;
	            if (typeof reason === "object" || typeof reason === "function") {
	              var stack = reason.stack;
	              message = "Possibly unhandled " + formatStack(stack, reason);
	            } else {
	              message = "Possibly unhandled " + String(reason);
	            }
	            if (typeof console.error === "function" || typeof console.error === "object") {
	              console.error(message);
	            } else if (typeof console.log === "function" || typeof console.log === "object") {
	              console.log(message);
	            }
	          }
	        };
	        CapturedTrace.combine = function CapturedTrace$Combine(current, prev) {
	          var currentLastIndex = current.length - 1;
	          var currentLastLine = current[currentLastIndex];
	          var commonRootMeetPoint = -1;
	          for (var i = prev.length - 1; i >= 0; --i) {
	            if (prev[i] === currentLastLine) {
	              commonRootMeetPoint = i;
	              break;
	            }
	          }
	          for (var i = commonRootMeetPoint; i >= 0; --i) {
	            var line = prev[i];
	            if (current[currentLastIndex] === line) {
	              current.pop();
	              currentLastIndex--;
	            } else {
	              break;
	            }
	          }
	          current.push("From previous event:");
	          var lines = current.concat(prev);
	          var ret = [];
	          for (var i = 0,
	              len = lines.length; i < len; ++i) {
	            if (((rignore.test(lines[i]) && rtraceline.test(lines[i])) || (i > 0 && !rtraceline.test(lines[i])) && lines[i] !== "From previous event:")) {
	              continue;
	            }
	            ret.push(lines[i]);
	          }
	          return ret;
	        };
	        CapturedTrace.protectErrorMessageNewlines = function(stack) {
	          for (var i = 0; i < stack.length; ++i) {
	            if (rtraceline.test(stack[i])) {
	              break;
	            }
	          }
	          if (i <= 1)
	            return;
	          var errorMessageLines = [];
	          for (var j = 0; j < i; ++j) {
	            errorMessageLines.push(stack.shift());
	          }
	          stack.unshift(errorMessageLines.join("\u0002\u0000\u0001"));
	        };
	        CapturedTrace.isSupported = function CapturedTrace$IsSupported() {
	          return typeof captureStackTrace === "function";
	        };
	        var captureStackTrace = (function stackDetection() {
	          if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
	            rtraceline = /^\s*at\s*/;
	            formatStack = function(stack, error) {
	              if (typeof stack === "string")
	                return stack;
	              if (error.name !== void 0 && error.message !== void 0) {
	                return error.name + ". " + error.message;
	              }
	              return formatNonError(error);
	            };
	            var captureStackTrace = Error.captureStackTrace;
	            return function CapturedTrace$_captureStackTrace(receiver, ignoreUntil) {
	              captureStackTrace(receiver, ignoreUntil);
	            };
	          }
	          var err = new Error();
	          if (typeof err.stack === "string" && typeof"".startsWith === "function" && (err.stack.startsWith("stackDetection@")) && stackDetection.name === "stackDetection") {
	            defineProperty(Error, "stackTraceLimit", {
	              writable: true,
	              enumerable: false,
	              configurable: false,
	              value: 25
	            });
	            rtraceline = /@/;
	            var rline = /[@\n]/;
	            formatStack = function(stack, error) {
	              if (typeof stack === "string") {
	                return (error.name + ". " + error.message + "\n" + stack);
	              }
	              if (error.name !== void 0 && error.message !== void 0) {
	                return error.name + ". " + error.message;
	              }
	              return formatNonError(error);
	            };
	            return function captureStackTrace(o) {
	              var stack = new Error().stack;
	              var split = stack.split(rline);
	              var len = split.length;
	              var ret = "";
	              for (var i = 0; i < len; i += 2) {
	                ret += split[i];
	                ret += "@";
	                ret += split[i + 1];
	                ret += "\n";
	              }
	              o.stack = ret;
	            };
	          } else {
	            formatStack = function(stack, error) {
	              if (typeof stack === "string")
	                return stack;
	              if ((typeof error === "object" || typeof error === "function") && error.name !== void 0 && error.message !== void 0) {
	                return error.name + ". " + error.message;
	              }
	              return formatNonError(error);
	            };
	            return null;
	          }
	        })();
	        return CapturedTrace;
	      };
	    }, {
	      "./es5.js": 12,
	      "./util.js": 35
	    }],
	    7: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(NEXT_FILTER) {
	        var util = _dereq_("./util.js");
	        var errors = _dereq_("./errors.js");
	        var tryCatch1 = util.tryCatch1;
	        var errorObj = util.errorObj;
	        var keys = _dereq_("./es5.js").keys;
	        var TypeError = errors.TypeError;
	        function CatchFilter(instances, callback, promise) {
	          this._instances = instances;
	          this._callback = callback;
	          this._promise = promise;
	        }
	        function CatchFilter$_safePredicate(predicate, e) {
	          var safeObject = {};
	          var retfilter = tryCatch1(predicate, safeObject, e);
	          if (retfilter === errorObj)
	            return retfilter;
	          var safeKeys = keys(safeObject);
	          if (safeKeys.length) {
	            errorObj.e = new TypeError("Catch filter must inherit from Error " + "or be a simple predicate function");
	            return errorObj;
	          }
	          return retfilter;
	        }
	        CatchFilter.prototype.doFilter = function CatchFilter$_doFilter(e) {
	          var cb = this._callback;
	          var promise = this._promise;
	          var boundTo = promise._boundTo;
	          for (var i = 0,
	              len = this._instances.length; i < len; ++i) {
	            var item = this._instances[i];
	            var itemIsErrorType = item === Error || (item != null && item.prototype instanceof Error);
	            if (itemIsErrorType && e instanceof item) {
	              var ret = tryCatch1(cb, boundTo, e);
	              if (ret === errorObj) {
	                NEXT_FILTER.e = ret.e;
	                return NEXT_FILTER;
	              }
	              return ret;
	            } else if (typeof item === "function" && !itemIsErrorType) {
	              var shouldHandle = CatchFilter$_safePredicate(item, e);
	              if (shouldHandle === errorObj) {
	                var trace = errors.canAttach(errorObj.e) ? errorObj.e : new Error(errorObj.e + "");
	                this._promise._attachExtraTrace(trace);
	                e = errorObj.e;
	                break;
	              } else if (shouldHandle) {
	                var ret = tryCatch1(cb, boundTo, e);
	                if (ret === errorObj) {
	                  NEXT_FILTER.e = ret.e;
	                  return NEXT_FILTER;
	                }
	                return ret;
	              }
	            }
	          }
	          NEXT_FILTER.e = e;
	          return NEXT_FILTER;
	        };
	        return CatchFilter;
	      };
	    }, {
	      "./errors.js": 10,
	      "./es5.js": 12,
	      "./util.js": 35
	    }],
	    8: [function(_dereq_, module, exports) {
	      "use strict";
	      var util = _dereq_("./util.js");
	      var isPrimitive = util.isPrimitive;
	      var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
	      module.exports = function(Promise) {
	        var returner = function Promise$_returner() {
	          return this;
	        };
	        var thrower = function Promise$_thrower() {
	          throw this;
	        };
	        var wrapper = function Promise$_wrapper(value, action) {
	          if (action === 1) {
	            return function Promise$_thrower() {
	              throw value;
	            };
	          } else if (action === 2) {
	            return function Promise$_returner() {
	              return value;
	            };
	          }
	        };
	        Promise.prototype["return"] = Promise.prototype.thenReturn = function Promise$thenReturn(value) {
	          if (wrapsPrimitiveReceiver && isPrimitive(value)) {
	            return this._then(wrapper(value, 2), void 0, void 0, void 0, void 0);
	          }
	          return this._then(returner, void 0, void 0, value, void 0);
	        };
	        Promise.prototype["throw"] = Promise.prototype.thenThrow = function Promise$thenThrow(reason) {
	          if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
	            return this._then(wrapper(reason, 1), void 0, void 0, void 0, void 0);
	          }
	          return this._then(thrower, void 0, void 0, reason, void 0);
	        };
	      };
	    }, {"./util.js": 35}],
	    9: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL) {
	        var PromiseReduce = Promise.reduce;
	        Promise.prototype.each = function Promise$each(fn) {
	          return PromiseReduce(this, fn, null, INTERNAL);
	        };
	        Promise.each = function Promise$Each(promises, fn) {
	          return PromiseReduce(promises, fn, null, INTERNAL);
	        };
	      };
	    }, {}],
	    10: [function(_dereq_, module, exports) {
	      "use strict";
	      var Objectfreeze = _dereq_("./es5.js").freeze;
	      var util = _dereq_("./util.js");
	      var inherits = util.inherits;
	      var notEnumerableProp = util.notEnumerableProp;
	      function markAsOriginatingFromRejection(e) {
	        try {
	          notEnumerableProp(e, "isOperational", true);
	        } catch (ignore) {}
	      }
	      function originatesFromRejection(e) {
	        if (e == null)
	          return false;
	        return ((e instanceof OperationalError) || e["isOperational"] === true);
	      }
	      function isError(obj) {
	        return obj instanceof Error;
	      }
	      function canAttach(obj) {
	        return isError(obj);
	      }
	      function subError(nameProperty, defaultMessage) {
	        function SubError(message) {
	          if (!(this instanceof SubError))
	            return new SubError(message);
	          this.message = typeof message === "string" ? message : defaultMessage;
	          this.name = nameProperty;
	          if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	          }
	        }
	        inherits(SubError, Error);
	        return SubError;
	      }
	      var _TypeError,
	          _RangeError;
	      var CancellationError = subError("CancellationError", "cancellation error");
	      var TimeoutError = subError("TimeoutError", "timeout error");
	      var AggregateError = subError("AggregateError", "aggregate error");
	      try {
	        _TypeError = TypeError;
	        _RangeError = RangeError;
	      } catch (e) {
	        _TypeError = subError("TypeError", "type error");
	        _RangeError = subError("RangeError", "range error");
	      }
	      var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
	      for (var i = 0; i < methods.length; ++i) {
	        if (typeof Array.prototype[methods[i]] === "function") {
	          AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	        }
	      }
	      AggregateError.prototype.length = 0;
	      AggregateError.prototype["isOperational"] = true;
	      var level = 0;
	      AggregateError.prototype.toString = function() {
	        var indent = Array(level * 4 + 1).join(" ");
	        var ret = "\n" + indent + "AggregateError of:" + "\n";
	        level++;
	        indent = Array(level * 4 + 1).join(" ");
	        for (var i = 0; i < this.length; ++i) {
	          var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	          var lines = str.split("\n");
	          for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	          }
	          str = lines.join("\n");
	          ret += str + "\n";
	        }
	        level--;
	        return ret;
	      };
	      function OperationalError(message) {
	        this.name = "OperationalError";
	        this.message = message;
	        this.cause = message;
	        this["isOperational"] = true;
	        if (message instanceof Error) {
	          this.message = message.message;
	          this.stack = message.stack;
	        } else if (Error.captureStackTrace) {
	          Error.captureStackTrace(this, this.constructor);
	        }
	      }
	      inherits(OperationalError, Error);
	      var key = "__BluebirdErrorTypes__";
	      var errorTypes = Error[key];
	      if (!errorTypes) {
	        errorTypes = Objectfreeze({
	          CancellationError: CancellationError,
	          TimeoutError: TimeoutError,
	          OperationalError: OperationalError,
	          RejectionError: OperationalError,
	          AggregateError: AggregateError
	        });
	        notEnumerableProp(Error, key, errorTypes);
	      }
	      module.exports = {
	        Error: Error,
	        TypeError: _TypeError,
	        RangeError: _RangeError,
	        CancellationError: errorTypes.CancellationError,
	        OperationalError: errorTypes.OperationalError,
	        TimeoutError: errorTypes.TimeoutError,
	        AggregateError: errorTypes.AggregateError,
	        originatesFromRejection: originatesFromRejection,
	        markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	        canAttach: canAttach
	      };
	    }, {
	      "./es5.js": 12,
	      "./util.js": 35
	    }],
	    11: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise) {
	        var TypeError = _dereq_('./errors.js').TypeError;
	        function apiRejection(msg) {
	          var error = new TypeError(msg);
	          var ret = Promise.rejected(error);
	          var parent = ret._peekContext();
	          if (parent != null) {
	            parent._attachExtraTrace(error);
	          }
	          return ret;
	        }
	        return apiRejection;
	      };
	    }, {"./errors.js": 10}],
	    12: [function(_dereq_, module, exports) {
	      var isES5 = (function() {
	        "use strict";
	        return this === void 0;
	      })();
	      if (isES5) {
	        module.exports = {
	          freeze: Object.freeze,
	          defineProperty: Object.defineProperty,
	          keys: Object.keys,
	          getPrototypeOf: Object.getPrototypeOf,
	          isArray: Array.isArray,
	          isES5: isES5
	        };
	      } else {
	        var has = {}.hasOwnProperty;
	        var str = {}.toString;
	        var proto = {}.constructor.prototype;
	        var ObjectKeys = function ObjectKeys(o) {
	          var ret = [];
	          for (var key in o) {
	            if (has.call(o, key)) {
	              ret.push(key);
	            }
	          }
	          return ret;
	        };
	        var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
	          o[key] = desc.value;
	          return o;
	        };
	        var ObjectFreeze = function ObjectFreeze(obj) {
	          return obj;
	        };
	        var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
	          try {
	            return Object(obj).constructor.prototype;
	          } catch (e) {
	            return proto;
	          }
	        };
	        var ArrayIsArray = function ArrayIsArray(obj) {
	          try {
	            return str.call(obj) === "[object Array]";
	          } catch (e) {
	            return false;
	          }
	        };
	        module.exports = {
	          isArray: ArrayIsArray,
	          keys: ObjectKeys,
	          defineProperty: ObjectDefineProperty,
	          freeze: ObjectFreeze,
	          getPrototypeOf: ObjectGetPrototypeOf,
	          isES5: isES5
	        };
	      }
	    }, {}],
	    13: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL) {
	        var PromiseMap = Promise.map;
	        Promise.prototype.filter = function Promise$filter(fn, options) {
	          return PromiseMap(this, fn, options, INTERNAL);
	        };
	        Promise.filter = function Promise$Filter(promises, fn, options) {
	          return PromiseMap(promises, fn, options, INTERNAL);
	        };
	      };
	    }, {}],
	    14: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, NEXT_FILTER, cast) {
	        var util = _dereq_("./util.js");
	        var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
	        var isPrimitive = util.isPrimitive;
	        var thrower = util.thrower;
	        function returnThis() {
	          return this;
	        }
	        function throwThis() {
	          throw this;
	        }
	        function return$(r) {
	          return function Promise$_returner() {
	            return r;
	          };
	        }
	        function throw$(r) {
	          return function Promise$_thrower() {
	            throw r;
	          };
	        }
	        function promisedFinally(ret, reasonOrValue, isFulfilled) {
	          var then;
	          if (wrapsPrimitiveReceiver && isPrimitive(reasonOrValue)) {
	            then = isFulfilled ? return$(reasonOrValue) : throw$(reasonOrValue);
	          } else {
	            then = isFulfilled ? returnThis : throwThis;
	          }
	          return ret._then(then, thrower, void 0, reasonOrValue, void 0);
	        }
	        function finallyHandler(reasonOrValue) {
	          var promise = this.promise;
	          var handler = this.handler;
	          var ret = promise._isBound() ? handler.call(promise._boundTo) : handler();
	          if (ret !== void 0) {
	            var maybePromise = cast(ret, void 0);
	            if (maybePromise instanceof Promise) {
	              return promisedFinally(maybePromise, reasonOrValue, promise.isFulfilled());
	            }
	          }
	          if (promise.isRejected()) {
	            NEXT_FILTER.e = reasonOrValue;
	            return NEXT_FILTER;
	          } else {
	            return reasonOrValue;
	          }
	        }
	        function tapHandler(value) {
	          var promise = this.promise;
	          var handler = this.handler;
	          var ret = promise._isBound() ? handler.call(promise._boundTo, value) : handler(value);
	          if (ret !== void 0) {
	            var maybePromise = cast(ret, void 0);
	            if (maybePromise instanceof Promise) {
	              return promisedFinally(maybePromise, value, true);
	            }
	          }
	          return value;
	        }
	        Promise.prototype._passThroughHandler = function Promise$_passThroughHandler(handler, isFinally) {
	          if (typeof handler !== "function")
	            return this.then();
	          var promiseAndHandler = {
	            promise: this,
	            handler: handler
	          };
	          return this._then(isFinally ? finallyHandler : tapHandler, isFinally ? finallyHandler : void 0, void 0, promiseAndHandler, void 0);
	        };
	        Promise.prototype.lastly = Promise.prototype["finally"] = function Promise$finally(handler) {
	          return this._passThroughHandler(handler, true);
	        };
	        Promise.prototype.tap = function Promise$tap(handler) {
	          return this._passThroughHandler(handler, false);
	        };
	      };
	    }, {"./util.js": 35}],
	    15: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, apiRejection, INTERNAL, cast) {
	        var errors = _dereq_("./errors.js");
	        var TypeError = errors.TypeError;
	        var deprecated = _dereq_("./util.js").deprecated;
	        var util = _dereq_("./util.js");
	        var errorObj = util.errorObj;
	        var tryCatch1 = util.tryCatch1;
	        var yieldHandlers = [];
	        function promiseFromYieldHandler(value, yieldHandlers) {
	          var _errorObj = errorObj;
	          var _Promise = Promise;
	          var len = yieldHandlers.length;
	          for (var i = 0; i < len; ++i) {
	            var result = tryCatch1(yieldHandlers[i], void 0, value);
	            if (result === _errorObj) {
	              return _Promise.reject(_errorObj.e);
	            }
	            var maybePromise = cast(result, promiseFromYieldHandler);
	            if (maybePromise instanceof _Promise)
	              return maybePromise;
	          }
	          return null;
	        }
	        function PromiseSpawn(generatorFunction, receiver, yieldHandler) {
	          var promise = this._promise = new Promise(INTERNAL);
	          promise._setTrace(void 0);
	          this._generatorFunction = generatorFunction;
	          this._receiver = receiver;
	          this._generator = void 0;
	          this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
	        }
	        PromiseSpawn.prototype.promise = function PromiseSpawn$promise() {
	          return this._promise;
	        };
	        PromiseSpawn.prototype._run = function PromiseSpawn$_run() {
	          this._generator = this._generatorFunction.call(this._receiver);
	          this._receiver = this._generatorFunction = void 0;
	          this._next(void 0);
	        };
	        PromiseSpawn.prototype._continue = function PromiseSpawn$_continue(result) {
	          if (result === errorObj) {
	            this._generator = void 0;
	            var trace = errors.canAttach(result.e) ? result.e : new Error(result.e + "");
	            this._promise._attachExtraTrace(trace);
	            this._promise._reject(result.e, trace);
	            return;
	          }
	          var value = result.value;
	          if (result.done === true) {
	            this._generator = void 0;
	            if (!this._promise._tryFollow(value)) {
	              this._promise._fulfill(value);
	            }
	          } else {
	            var maybePromise = cast(value, void 0);
	            if (!(maybePromise instanceof Promise)) {
	              maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers);
	              if (maybePromise === null) {
	                this._throw(new TypeError("A value was yielded that could not be treated as a promise"));
	                return;
	              }
	            }
	            maybePromise._then(this._next, this._throw, void 0, this, null);
	          }
	        };
	        PromiseSpawn.prototype._throw = function PromiseSpawn$_throw(reason) {
	          if (errors.canAttach(reason))
	            this._promise._attachExtraTrace(reason);
	          this._continue(tryCatch1(this._generator["throw"], this._generator, reason));
	        };
	        PromiseSpawn.prototype._next = function PromiseSpawn$_next(value) {
	          this._continue(tryCatch1(this._generator.next, this._generator, value));
	        };
	        Promise.coroutine = function Promise$Coroutine(generatorFunction, options) {
	          if (typeof generatorFunction !== "function") {
	            throw new TypeError("generatorFunction must be a function");
	          }
	          var yieldHandler = Object(options).yieldHandler;
	          var PromiseSpawn$ = PromiseSpawn;
	          return function() {
	            var generator = generatorFunction.apply(this, arguments);
	            var spawn = new PromiseSpawn$(void 0, void 0, yieldHandler);
	            spawn._generator = generator;
	            spawn._next(void 0);
	            return spawn.promise();
	          };
	        };
	        Promise.coroutine.addYieldHandler = function(fn) {
	          if (typeof fn !== "function")
	            throw new TypeError("fn must be a function");
	          yieldHandlers.push(fn);
	        };
	        Promise.spawn = function Promise$Spawn(generatorFunction) {
	          deprecated("Promise.spawn is deprecated. Use Promise.coroutine instead.");
	          if (typeof generatorFunction !== "function") {
	            return apiRejection("generatorFunction must be a function");
	          }
	          var spawn = new PromiseSpawn(generatorFunction, this);
	          var ret = spawn.promise();
	          spawn._run(Promise.spawn);
	          return ret;
	        };
	      };
	    }, {
	      "./errors.js": 10,
	      "./util.js": 35
	    }],
	    16: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray, cast, INTERNAL) {
	        var util = _dereq_("./util.js");
	        var canEvaluate = util.canEvaluate;
	        var tryCatch1 = util.tryCatch1;
	        var errorObj = util.errorObj;
	        if (canEvaluate) {
	          var thenCallback = function(i) {
	            return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	          };
	          var caller = function(count) {
	            var values = [];
	            for (var i = 1; i <= count; ++i)
	              values.push("holder.p" + i);
	            return new Function("holder", "                                      \n\
	            'use strict';                                                    \n\
	            var callback = holder.fn;                                        \n\
	            return callback(values);                                         \n\
	            ".replace(/values/g, values.join(", ")));
	          };
	          var thenCallbacks = [];
	          var callers = [void 0];
	          for (var i = 1; i <= 5; ++i) {
	            thenCallbacks.push(thenCallback(i));
	            callers.push(caller(i));
	          }
	          var Holder = function(total, fn) {
	            this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = null;
	            this.fn = fn;
	            this.total = total;
	            this.now = 0;
	          };
	          Holder.prototype.callers = callers;
	          Holder.prototype.checkFulfillment = function(promise) {
	            var now = this.now;
	            now++;
	            var total = this.total;
	            if (now >= total) {
	              var handler = this.callers[total];
	              var ret = tryCatch1(handler, void 0, this);
	              if (ret === errorObj) {
	                promise._rejectUnchecked(ret.e);
	              } else if (!promise._tryFollow(ret)) {
	                promise._fulfillUnchecked(ret);
	              }
	            } else {
	              this.now = now;
	            }
	          };
	        }
	        function reject(reason) {
	          this._reject(reason);
	        }
	        Promise.join = function Promise$Join() {
	          var last = arguments.length - 1;
	          var fn;
	          if (last > 0 && typeof arguments[last] === "function") {
	            fn = arguments[last];
	            if (last < 6 && canEvaluate) {
	              var ret = new Promise(INTERNAL);
	              ret._setTrace(void 0);
	              var holder = new Holder(last, fn);
	              var callbacks = thenCallbacks;
	              for (var i = 0; i < last; ++i) {
	                var maybePromise = cast(arguments[i], void 0);
	                if (maybePromise instanceof Promise) {
	                  if (maybePromise.isPending()) {
	                    maybePromise._then(callbacks[i], reject, void 0, ret, holder);
	                  } else if (maybePromise.isFulfilled()) {
	                    callbacks[i].call(ret, maybePromise._settledValue, holder);
	                  } else {
	                    ret._reject(maybePromise._settledValue);
	                    maybePromise._unsetRejectionIsUnhandled();
	                  }
	                } else {
	                  callbacks[i].call(ret, maybePromise, holder);
	                }
	              }
	              return ret;
	            }
	          }
	          var $_len = arguments.length;
	          var args = new Array($_len);
	          for (var $_i = 0; $_i < $_len; ++$_i) {
	            args[$_i] = arguments[$_i];
	          }
	          var ret = new PromiseArray(args).promise();
	          return fn !== void 0 ? ret.spread(fn) : ret;
	        };
	      };
	    }, {"./util.js": 35}],
	    17: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
	        var util = _dereq_("./util.js");
	        var tryCatch3 = util.tryCatch3;
	        var errorObj = util.errorObj;
	        var PENDING = {};
	        var EMPTY_ARRAY = [];
	        function MappingPromiseArray(promises, fn, limit, _filter) {
	          this.constructor$(promises);
	          this._callback = fn;
	          this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
	          this._limit = limit;
	          this._inFlight = 0;
	          this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
	          this._init$(void 0, -2);
	        }
	        util.inherits(MappingPromiseArray, PromiseArray);
	        MappingPromiseArray.prototype._init = function MappingPromiseArray$_init() {};
	        MappingPromiseArray.prototype._promiseFulfilled = function MappingPromiseArray$_promiseFulfilled(value, index) {
	          var values = this._values;
	          if (values === null)
	            return;
	          var length = this.length();
	          var preservedValues = this._preservedValues;
	          var limit = this._limit;
	          if (values[index] === PENDING) {
	            values[index] = value;
	            if (limit >= 1) {
	              this._inFlight--;
	              this._drainQueue();
	              if (this._isResolved())
	                return;
	            }
	          } else {
	            if (limit >= 1 && this._inFlight >= limit) {
	              values[index] = value;
	              this._queue.push(index);
	              return;
	            }
	            if (preservedValues !== null)
	              preservedValues[index] = value;
	            var callback = this._callback;
	            var receiver = this._promise._boundTo;
	            var ret = tryCatch3(callback, receiver, value, index, length);
	            if (ret === errorObj)
	              return this._reject(ret.e);
	            var maybePromise = cast(ret, void 0);
	            if (maybePromise instanceof Promise) {
	              if (maybePromise.isPending()) {
	                if (limit >= 1)
	                  this._inFlight++;
	                values[index] = PENDING;
	                return maybePromise._proxyPromiseArray(this, index);
	              } else if (maybePromise.isFulfilled()) {
	                ret = maybePromise.value();
	              } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise.reason());
	              }
	            }
	            values[index] = ret;
	          }
	          var totalResolved = ++this._totalResolved;
	          if (totalResolved >= length) {
	            if (preservedValues !== null) {
	              this._filter(values, preservedValues);
	            } else {
	              this._resolve(values);
	            }
	          }
	        };
	        MappingPromiseArray.prototype._drainQueue = function MappingPromiseArray$_drainQueue() {
	          var queue = this._queue;
	          var limit = this._limit;
	          var values = this._values;
	          while (queue.length > 0 && this._inFlight < limit) {
	            var index = queue.pop();
	            this._promiseFulfilled(values[index], index);
	          }
	        };
	        MappingPromiseArray.prototype._filter = function MappingPromiseArray$_filter(booleans, values) {
	          var len = values.length;
	          var ret = new Array(len);
	          var j = 0;
	          for (var i = 0; i < len; ++i) {
	            if (booleans[i])
	              ret[j++] = values[i];
	          }
	          ret.length = j;
	          this._resolve(ret);
	        };
	        MappingPromiseArray.prototype.preservedValues = function MappingPromiseArray$preserveValues() {
	          return this._preservedValues;
	        };
	        function map(promises, fn, options, _filter) {
	          var limit = typeof options === "object" && options !== null ? options.concurrency : 0;
	          limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
	          return new MappingPromiseArray(promises, fn, limit, _filter);
	        }
	        Promise.prototype.map = function Promise$map(fn, options) {
	          if (typeof fn !== "function")
	            return apiRejection("fn must be a function");
	          return map(this, fn, options, null).promise();
	        };
	        Promise.map = function Promise$Map(promises, fn, options, _filter) {
	          if (typeof fn !== "function")
	            return apiRejection("fn must be a function");
	          return map(promises, fn, options, _filter).promise();
	        };
	      };
	    }, {"./util.js": 35}],
	    18: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise) {
	        var util = _dereq_("./util.js");
	        var async = _dereq_("./async.js");
	        var tryCatch2 = util.tryCatch2;
	        var tryCatch1 = util.tryCatch1;
	        var errorObj = util.errorObj;
	        function thrower(r) {
	          throw r;
	        }
	        function Promise$_spreadAdapter(val, receiver) {
	          if (!util.isArray(val))
	            return Promise$_successAdapter(val, receiver);
	          var ret = util.tryCatchApply(this, [null].concat(val), receiver);
	          if (ret === errorObj) {
	            async.invokeLater(thrower, void 0, ret.e);
	          }
	        }
	        function Promise$_successAdapter(val, receiver) {
	          var nodeback = this;
	          var ret = val === void 0 ? tryCatch1(nodeback, receiver, null) : tryCatch2(nodeback, receiver, null, val);
	          if (ret === errorObj) {
	            async.invokeLater(thrower, void 0, ret.e);
	          }
	        }
	        function Promise$_errorAdapter(reason, receiver) {
	          var nodeback = this;
	          var ret = tryCatch1(nodeback, receiver, reason);
	          if (ret === errorObj) {
	            async.invokeLater(thrower, void 0, ret.e);
	          }
	        }
	        Promise.prototype.nodeify = function Promise$nodeify(nodeback, options) {
	          if (typeof nodeback == "function") {
	            var adapter = Promise$_successAdapter;
	            if (options !== void 0 && Object(options).spread) {
	              adapter = Promise$_spreadAdapter;
	            }
	            this._then(adapter, Promise$_errorAdapter, void 0, nodeback, this._boundTo);
	          }
	          return this;
	        };
	      };
	    }, {
	      "./async.js": 2,
	      "./util.js": 35
	    }],
	    19: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray) {
	        var util = _dereq_("./util.js");
	        var async = _dereq_("./async.js");
	        var errors = _dereq_("./errors.js");
	        var tryCatch1 = util.tryCatch1;
	        var errorObj = util.errorObj;
	        Promise.prototype.progressed = function Promise$progressed(handler) {
	          return this._then(void 0, void 0, handler, void 0, void 0);
	        };
	        Promise.prototype._progress = function Promise$_progress(progressValue) {
	          if (this._isFollowingOrFulfilledOrRejected())
	            return;
	          this._progressUnchecked(progressValue);
	        };
	        Promise.prototype._clearFirstHandlerData$Base = Promise.prototype._clearFirstHandlerData;
	        Promise.prototype._clearFirstHandlerData = function Promise$_clearFirstHandlerData() {
	          this._clearFirstHandlerData$Base();
	          this._progressHandler0 = void 0;
	        };
	        Promise.prototype._progressHandlerAt = function Promise$_progressHandlerAt(index) {
	          return index === 0 ? this._progressHandler0 : this[(index << 2) + index - 5 + 2];
	        };
	        Promise.prototype._doProgressWith = function Promise$_doProgressWith(progression) {
	          var progressValue = progression.value;
	          var handler = progression.handler;
	          var promise = progression.promise;
	          var receiver = progression.receiver;
	          var ret = tryCatch1(handler, receiver, progressValue);
	          if (ret === errorObj) {
	            if (ret.e != null && ret.e.name !== "StopProgressPropagation") {
	              var trace = errors.canAttach(ret.e) ? ret.e : new Error(ret.e + "");
	              promise._attachExtraTrace(trace);
	              promise._progress(ret.e);
	            }
	          } else if (ret instanceof Promise) {
	            ret._then(promise._progress, null, null, promise, void 0);
	          } else {
	            promise._progress(ret);
	          }
	        };
	        Promise.prototype._progressUnchecked = function Promise$_progressUnchecked(progressValue) {
	          if (!this.isPending())
	            return;
	          var len = this._length();
	          var progress = this._progress;
	          for (var i = 0; i < len; i++) {
	            var handler = this._progressHandlerAt(i);
	            var promise = this._promiseAt(i);
	            if (!(promise instanceof Promise)) {
	              var receiver = this._receiverAt(i);
	              if (typeof handler === "function") {
	                handler.call(receiver, progressValue, promise);
	              } else if (receiver instanceof Promise && receiver._isProxied()) {
	                receiver._progressUnchecked(progressValue);
	              } else if (receiver instanceof PromiseArray) {
	                receiver._promiseProgressed(progressValue, promise);
	              }
	              continue;
	            }
	            if (typeof handler === "function") {
	              async.invoke(this._doProgressWith, this, {
	                handler: handler,
	                promise: promise,
	                receiver: this._receiverAt(i),
	                value: progressValue
	              });
	            } else {
	              async.invoke(progress, promise, progressValue);
	            }
	          }
	        };
	      };
	    }, {
	      "./async.js": 2,
	      "./errors.js": 10,
	      "./util.js": 35
	    }],
	    20: [function(_dereq_, module, exports) {
	      "use strict";
	      var old;
	      if (typeof Promise !== "undefined")
	        old = Promise;
	      function noConflict(bluebird) {
	        try {
	          if (Promise === bluebird)
	            Promise = old;
	        } catch (e) {}
	        return bluebird;
	      }
	      module.exports = function() {
	        var util = _dereq_("./util.js");
	        var async = _dereq_("./async.js");
	        var errors = _dereq_("./errors.js");
	        var INTERNAL = function() {};
	        var APPLY = {};
	        var NEXT_FILTER = {e: null};
	        var cast = _dereq_("./thenables.js")(Promise, INTERNAL);
	        var PromiseArray = _dereq_("./promise_array.js")(Promise, INTERNAL, cast);
	        var CapturedTrace = _dereq_("./captured_trace.js")();
	        var CatchFilter = _dereq_("./catch_filter.js")(NEXT_FILTER);
	        var PromiseResolver = _dereq_("./promise_resolver.js");
	        var isArray = util.isArray;
	        var errorObj = util.errorObj;
	        var tryCatch1 = util.tryCatch1;
	        var tryCatch2 = util.tryCatch2;
	        var tryCatchApply = util.tryCatchApply;
	        var RangeError = errors.RangeError;
	        var TypeError = errors.TypeError;
	        var CancellationError = errors.CancellationError;
	        var TimeoutError = errors.TimeoutError;
	        var OperationalError = errors.OperationalError;
	        var originatesFromRejection = errors.originatesFromRejection;
	        var markAsOriginatingFromRejection = errors.markAsOriginatingFromRejection;
	        var canAttach = errors.canAttach;
	        var thrower = util.thrower;
	        var apiRejection = _dereq_("./errors_api_rejection")(Promise);
	        var makeSelfResolutionError = function Promise$_makeSelfResolutionError() {
	          return new TypeError("circular promise resolution chain");
	        };
	        function Promise(resolver) {
	          if (typeof resolver !== "function") {
	            throw new TypeError("the promise constructor requires a resolver function");
	          }
	          if (this.constructor !== Promise) {
	            throw new TypeError("the promise constructor cannot be invoked directly");
	          }
	          this._bitField = 0;
	          this._fulfillmentHandler0 = void 0;
	          this._rejectionHandler0 = void 0;
	          this._promise0 = void 0;
	          this._receiver0 = void 0;
	          this._settledValue = void 0;
	          this._boundTo = void 0;
	          if (resolver !== INTERNAL)
	            this._resolveFromResolver(resolver);
	        }
	        function returnFirstElement(elements) {
	          return elements[0];
	        }
	        Promise.prototype.bind = function Promise$bind(thisArg) {
	          var maybePromise = cast(thisArg, void 0);
	          var ret = new Promise(INTERNAL);
	          if (maybePromise instanceof Promise) {
	            var binder = maybePromise.then(function(thisArg) {
	              ret._setBoundTo(thisArg);
	            });
	            var p = Promise.all([this, binder]).then(returnFirstElement);
	            ret._follow(p);
	          } else {
	            ret._follow(this);
	            ret._setBoundTo(thisArg);
	          }
	          ret._propagateFrom(this, 2 | 1);
	          return ret;
	        };
	        Promise.prototype.toString = function Promise$toString() {
	          return "[object Promise]";
	        };
	        Promise.prototype.caught = Promise.prototype["catch"] = function Promise$catch(fn) {
	          var len = arguments.length;
	          if (len > 1) {
	            var catchInstances = new Array(len - 1),
	                j = 0,
	                i;
	            for (i = 0; i < len - 1; ++i) {
	              var item = arguments[i];
	              if (typeof item === "function") {
	                catchInstances[j++] = item;
	              } else {
	                var catchFilterTypeError = new TypeError("A catch filter must be an error constructor " + "or a filter function");
	                this._attachExtraTrace(catchFilterTypeError);
	                return Promise.reject(catchFilterTypeError);
	              }
	            }
	            catchInstances.length = j;
	            fn = arguments[i];
	            this._resetTrace();
	            var catchFilter = new CatchFilter(catchInstances, fn, this);
	            return this._then(void 0, catchFilter.doFilter, void 0, catchFilter, void 0);
	          }
	          return this._then(void 0, fn, void 0, void 0, void 0);
	        };
	        function reflect() {
	          return new Promise.PromiseInspection(this);
	        }
	        Promise.prototype.reflect = function Promise$reflect() {
	          return this._then(reflect, reflect, void 0, this, void 0);
	        };
	        Promise.prototype.then = function Promise$then(didFulfill, didReject, didProgress) {
	          return this._then(didFulfill, didReject, didProgress, void 0, void 0);
	        };
	        Promise.prototype.done = function Promise$done(didFulfill, didReject, didProgress) {
	          var promise = this._then(didFulfill, didReject, didProgress, void 0, void 0);
	          promise._setIsFinal();
	        };
	        Promise.prototype.spread = function Promise$spread(didFulfill, didReject) {
	          return this._then(didFulfill, didReject, void 0, APPLY, void 0);
	        };
	        Promise.prototype.isCancellable = function Promise$isCancellable() {
	          return !this.isResolved() && this._cancellable();
	        };
	        Promise.prototype.toJSON = function Promise$toJSON() {
	          var ret = {
	            isFulfilled: false,
	            isRejected: false,
	            fulfillmentValue: void 0,
	            rejectionReason: void 0
	          };
	          if (this.isFulfilled()) {
	            ret.fulfillmentValue = this._settledValue;
	            ret.isFulfilled = true;
	          } else if (this.isRejected()) {
	            ret.rejectionReason = this._settledValue;
	            ret.isRejected = true;
	          }
	          return ret;
	        };
	        Promise.prototype.all = function Promise$all() {
	          return new PromiseArray(this).promise();
	        };
	        Promise.is = function Promise$Is(val) {
	          return val instanceof Promise;
	        };
	        Promise.all = function Promise$All(promises) {
	          return new PromiseArray(promises).promise();
	        };
	        Promise.prototype.error = function Promise$_error(fn) {
	          return this.caught(originatesFromRejection, fn);
	        };
	        Promise.prototype._resolveFromSyncValue = function Promise$_resolveFromSyncValue(value) {
	          if (value === errorObj) {
	            this._cleanValues();
	            this._setRejected();
	            var reason = value.e;
	            this._settledValue = reason;
	            this._tryAttachExtraTrace(reason);
	            this._ensurePossibleRejectionHandled();
	          } else {
	            var maybePromise = cast(value, void 0);
	            if (maybePromise instanceof Promise) {
	              this._follow(maybePromise);
	            } else {
	              this._cleanValues();
	              this._setFulfilled();
	              this._settledValue = value;
	            }
	          }
	        };
	        Promise.method = function Promise$_Method(fn) {
	          if (typeof fn !== "function") {
	            throw new TypeError("fn must be a function");
	          }
	          return function Promise$_method() {
	            var value;
	            switch (arguments.length) {
	              case 0:
	                value = tryCatch1(fn, this, void 0);
	                break;
	              case 1:
	                value = tryCatch1(fn, this, arguments[0]);
	                break;
	              case 2:
	                value = tryCatch2(fn, this, arguments[0], arguments[1]);
	                break;
	              default:
	                var $_len = arguments.length;
	                var args = new Array($_len);
	                for (var $_i = 0; $_i < $_len; ++$_i) {
	                  args[$_i] = arguments[$_i];
	                }
	                value = tryCatchApply(fn, args, this);
	                break;
	            }
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(void 0);
	            ret._resolveFromSyncValue(value);
	            return ret;
	          };
	        };
	        Promise.attempt = Promise["try"] = function Promise$_Try(fn, args, ctx) {
	          if (typeof fn !== "function") {
	            return apiRejection("fn must be a function");
	          }
	          var value = isArray(args) ? tryCatchApply(fn, args, ctx) : tryCatch1(fn, ctx, args);
	          var ret = new Promise(INTERNAL);
	          ret._setTrace(void 0);
	          ret._resolveFromSyncValue(value);
	          return ret;
	        };
	        Promise.defer = Promise.pending = function Promise$Defer() {
	          var promise = new Promise(INTERNAL);
	          promise._setTrace(void 0);
	          return new PromiseResolver(promise);
	        };
	        Promise.bind = function Promise$Bind(thisArg) {
	          var maybePromise = cast(thisArg, void 0);
	          var ret = new Promise(INTERNAL);
	          ret._setTrace(void 0);
	          if (maybePromise instanceof Promise) {
	            var p = maybePromise.then(function(thisArg) {
	              ret._setBoundTo(thisArg);
	            });
	            ret._follow(p);
	          } else {
	            ret._setBoundTo(thisArg);
	            ret._setFulfilled();
	          }
	          return ret;
	        };
	        Promise.cast = function Promise$_Cast(obj) {
	          var ret = cast(obj, void 0);
	          if (!(ret instanceof Promise)) {
	            var val = ret;
	            ret = new Promise(INTERNAL);
	            ret._setTrace(void 0);
	            ret._setFulfilled();
	            ret._cleanValues();
	            ret._settledValue = val;
	          }
	          return ret;
	        };
	        Promise.resolve = Promise.fulfilled = Promise.cast;
	        Promise.reject = Promise.rejected = function Promise$Reject(reason) {
	          var ret = new Promise(INTERNAL);
	          ret._setTrace(void 0);
	          markAsOriginatingFromRejection(reason);
	          ret._cleanValues();
	          ret._setRejected();
	          ret._settledValue = reason;
	          if (!canAttach(reason)) {
	            var trace = new Error(reason + "");
	            ret._setCarriedStackTrace(trace);
	          }
	          ret._ensurePossibleRejectionHandled();
	          return ret;
	        };
	        Promise.onPossiblyUnhandledRejection = function Promise$OnPossiblyUnhandledRejection(fn) {
	          CapturedTrace.possiblyUnhandledRejection = typeof fn === "function" ? fn : void 0;
	        };
	        var unhandledRejectionHandled;
	        Promise.onUnhandledRejectionHandled = function Promise$onUnhandledRejectionHandled(fn) {
	          unhandledRejectionHandled = typeof fn === "function" ? fn : void 0;
	        };
	        var debugging = false || !!(typeof process !== "undefined" && typeof process.execPath === "string" && typeof process.env === "object" && (process.env["BLUEBIRD_DEBUG"] || process.env["NODE_ENV"] === "development"));
	        Promise.longStackTraces = function Promise$LongStackTraces() {
	          if (async.haveItemsQueued() && debugging === false) {
	            throw new Error("cannot enable long stack traces after promises have been created");
	          }
	          debugging = CapturedTrace.isSupported();
	        };
	        Promise.hasLongStackTraces = function Promise$HasLongStackTraces() {
	          return debugging && CapturedTrace.isSupported();
	        };
	        Promise.prototype._then = function Promise$_then(didFulfill, didReject, didProgress, receiver, internalData) {
	          var haveInternalData = internalData !== void 0;
	          var ret = haveInternalData ? internalData : new Promise(INTERNAL);
	          if (!haveInternalData) {
	            if (debugging) {
	              var haveSameContext = this._peekContext() === this._traceParent;
	              ret._traceParent = haveSameContext ? this._traceParent : this;
	            }
	            ret._propagateFrom(this, 7);
	          }
	          var callbackIndex = this._addCallbacks(didFulfill, didReject, didProgress, ret, receiver);
	          if (this.isResolved()) {
	            async.invoke(this._queueSettleAt, this, callbackIndex);
	          }
	          return ret;
	        };
	        Promise.prototype._length = function Promise$_length() {
	          return this._bitField & 262143;
	        };
	        Promise.prototype._isFollowingOrFulfilledOrRejected = function Promise$_isFollowingOrFulfilledOrRejected() {
	          return (this._bitField & 939524096) > 0;
	        };
	        Promise.prototype._isFollowing = function Promise$_isFollowing() {
	          return (this._bitField & 536870912) === 536870912;
	        };
	        Promise.prototype._setLength = function Promise$_setLength(len) {
	          this._bitField = (this._bitField & -262144) | (len & 262143);
	        };
	        Promise.prototype._setFulfilled = function Promise$_setFulfilled() {
	          this._bitField = this._bitField | 268435456;
	        };
	        Promise.prototype._setRejected = function Promise$_setRejected() {
	          this._bitField = this._bitField | 134217728;
	        };
	        Promise.prototype._setFollowing = function Promise$_setFollowing() {
	          this._bitField = this._bitField | 536870912;
	        };
	        Promise.prototype._setIsFinal = function Promise$_setIsFinal() {
	          this._bitField = this._bitField | 33554432;
	        };
	        Promise.prototype._isFinal = function Promise$_isFinal() {
	          return (this._bitField & 33554432) > 0;
	        };
	        Promise.prototype._cancellable = function Promise$_cancellable() {
	          return (this._bitField & 67108864) > 0;
	        };
	        Promise.prototype._setCancellable = function Promise$_setCancellable() {
	          this._bitField = this._bitField | 67108864;
	        };
	        Promise.prototype._unsetCancellable = function Promise$_unsetCancellable() {
	          this._bitField = this._bitField & (~67108864);
	        };
	        Promise.prototype._setRejectionIsUnhandled = function Promise$_setRejectionIsUnhandled() {
	          this._bitField = this._bitField | 2097152;
	        };
	        Promise.prototype._unsetRejectionIsUnhandled = function Promise$_unsetRejectionIsUnhandled() {
	          this._bitField = this._bitField & (~2097152);
	          if (this._isUnhandledRejectionNotified()) {
	            this._unsetUnhandledRejectionIsNotified();
	            this._notifyUnhandledRejectionIsHandled();
	          }
	        };
	        Promise.prototype._isRejectionUnhandled = function Promise$_isRejectionUnhandled() {
	          return (this._bitField & 2097152) > 0;
	        };
	        Promise.prototype._setUnhandledRejectionIsNotified = function Promise$_setUnhandledRejectionIsNotified() {
	          this._bitField = this._bitField | 524288;
	        };
	        Promise.prototype._unsetUnhandledRejectionIsNotified = function Promise$_unsetUnhandledRejectionIsNotified() {
	          this._bitField = this._bitField & (~524288);
	        };
	        Promise.prototype._isUnhandledRejectionNotified = function Promise$_isUnhandledRejectionNotified() {
	          return (this._bitField & 524288) > 0;
	        };
	        Promise.prototype._setCarriedStackTrace = function Promise$_setCarriedStackTrace(capturedTrace) {
	          this._bitField = this._bitField | 1048576;
	          this._fulfillmentHandler0 = capturedTrace;
	        };
	        Promise.prototype._unsetCarriedStackTrace = function Promise$_unsetCarriedStackTrace() {
	          this._bitField = this._bitField & (~1048576);
	          this._fulfillmentHandler0 = void 0;
	        };
	        Promise.prototype._isCarryingStackTrace = function Promise$_isCarryingStackTrace() {
	          return (this._bitField & 1048576) > 0;
	        };
	        Promise.prototype._getCarriedStackTrace = function Promise$_getCarriedStackTrace() {
	          return this._isCarryingStackTrace() ? this._fulfillmentHandler0 : void 0;
	        };
	        Promise.prototype._receiverAt = function Promise$_receiverAt(index) {
	          var ret = index === 0 ? this._receiver0 : this[(index << 2) + index - 5 + 4];
	          if (this._isBound() && ret === void 0) {
	            return this._boundTo;
	          }
	          return ret;
	        };
	        Promise.prototype._promiseAt = function Promise$_promiseAt(index) {
	          return index === 0 ? this._promise0 : this[(index << 2) + index - 5 + 3];
	        };
	        Promise.prototype._fulfillmentHandlerAt = function Promise$_fulfillmentHandlerAt(index) {
	          return index === 0 ? this._fulfillmentHandler0 : this[(index << 2) + index - 5 + 0];
	        };
	        Promise.prototype._rejectionHandlerAt = function Promise$_rejectionHandlerAt(index) {
	          return index === 0 ? this._rejectionHandler0 : this[(index << 2) + index - 5 + 1];
	        };
	        Promise.prototype._addCallbacks = function Promise$_addCallbacks(fulfill, reject, progress, promise, receiver) {
	          var index = this._length();
	          if (index >= 262143 - 5) {
	            index = 0;
	            this._setLength(0);
	          }
	          if (index === 0) {
	            this._promise0 = promise;
	            if (receiver !== void 0)
	              this._receiver0 = receiver;
	            if (typeof fulfill === "function" && !this._isCarryingStackTrace())
	              this._fulfillmentHandler0 = fulfill;
	            if (typeof reject === "function")
	              this._rejectionHandler0 = reject;
	            if (typeof progress === "function")
	              this._progressHandler0 = progress;
	          } else {
	            var base = (index << 2) + index - 5;
	            this[base + 3] = promise;
	            this[base + 4] = receiver;
	            this[base + 0] = typeof fulfill === "function" ? fulfill : void 0;
	            this[base + 1] = typeof reject === "function" ? reject : void 0;
	            this[base + 2] = typeof progress === "function" ? progress : void 0;
	          }
	          this._setLength(index + 1);
	          return index;
	        };
	        Promise.prototype._setProxyHandlers = function Promise$_setProxyHandlers(receiver, promiseSlotValue) {
	          var index = this._length();
	          if (index >= 262143 - 5) {
	            index = 0;
	            this._setLength(0);
	          }
	          if (index === 0) {
	            this._promise0 = promiseSlotValue;
	            this._receiver0 = receiver;
	          } else {
	            var base = (index << 2) + index - 5;
	            this[base + 3] = promiseSlotValue;
	            this[base + 4] = receiver;
	            this[base + 0] = this[base + 1] = this[base + 2] = void 0;
	          }
	          this._setLength(index + 1);
	        };
	        Promise.prototype._proxyPromiseArray = function Promise$_proxyPromiseArray(promiseArray, index) {
	          this._setProxyHandlers(promiseArray, index);
	        };
	        Promise.prototype._proxyPromise = function Promise$_proxyPromise(promise) {
	          promise._setProxied();
	          this._setProxyHandlers(promise, -15);
	        };
	        Promise.prototype._setBoundTo = function Promise$_setBoundTo(obj) {
	          if (obj !== void 0) {
	            this._bitField = this._bitField | 8388608;
	            this._boundTo = obj;
	          } else {
	            this._bitField = this._bitField & (~8388608);
	          }
	        };
	        Promise.prototype._isBound = function Promise$_isBound() {
	          return (this._bitField & 8388608) === 8388608;
	        };
	        Promise.prototype._resolveFromResolver = function Promise$_resolveFromResolver(resolver) {
	          var promise = this;
	          this._setTrace(void 0);
	          this._pushContext();
	          function Promise$_resolver(val) {
	            if (promise._tryFollow(val)) {
	              return;
	            }
	            promise._fulfill(val);
	          }
	          function Promise$_rejecter(val) {
	            var trace = canAttach(val) ? val : new Error(val + "");
	            promise._attachExtraTrace(trace);
	            markAsOriginatingFromRejection(val);
	            promise._reject(val, trace === val ? void 0 : trace);
	          }
	          var r = tryCatch2(resolver, void 0, Promise$_resolver, Promise$_rejecter);
	          this._popContext();
	          if (r !== void 0 && r === errorObj) {
	            var e = r.e;
	            var trace = canAttach(e) ? e : new Error(e + "");
	            promise._reject(e, trace);
	          }
	        };
	        Promise.prototype._spreadSlowCase = function Promise$_spreadSlowCase(targetFn, promise, values, boundTo) {
	          var promiseForAll = new PromiseArray(values).promise();
	          var promise2 = promiseForAll._then(function() {
	            return targetFn.apply(boundTo, arguments);
	          }, void 0, void 0, APPLY, void 0);
	          promise._follow(promise2);
	        };
	        Promise.prototype._callSpread = function Promise$_callSpread(handler, promise, value) {
	          var boundTo = this._boundTo;
	          if (isArray(value)) {
	            for (var i = 0,
	                len = value.length; i < len; ++i) {
	              if (cast(value[i], void 0) instanceof Promise) {
	                this._spreadSlowCase(handler, promise, value, boundTo);
	                return;
	              }
	            }
	          }
	          promise._pushContext();
	          return tryCatchApply(handler, value, boundTo);
	        };
	        Promise.prototype._callHandler = function Promise$_callHandler(handler, receiver, promise, value) {
	          var x;
	          if (receiver === APPLY && !this.isRejected()) {
	            x = this._callSpread(handler, promise, value);
	          } else {
	            promise._pushContext();
	            x = tryCatch1(handler, receiver, value);
	          }
	          promise._popContext();
	          return x;
	        };
	        Promise.prototype._settlePromiseFromHandler = function Promise$_settlePromiseFromHandler(handler, receiver, value, promise) {
	          if (!(promise instanceof Promise)) {
	            handler.call(receiver, value, promise);
	            return;
	          }
	          if (promise.isResolved())
	            return;
	          var x = this._callHandler(handler, receiver, promise, value);
	          if (promise._isFollowing())
	            return;
	          if (x === errorObj || x === promise || x === NEXT_FILTER) {
	            var err = x === promise ? makeSelfResolutionError() : x.e;
	            var trace = canAttach(err) ? err : new Error(err + "");
	            if (x !== NEXT_FILTER)
	              promise._attachExtraTrace(trace);
	            promise._rejectUnchecked(err, trace);
	          } else {
	            var castValue = cast(x, promise);
	            if (castValue instanceof Promise) {
	              if (castValue.isRejected() && !castValue._isCarryingStackTrace() && !canAttach(castValue._settledValue)) {
	                var trace = new Error(castValue._settledValue + "");
	                promise._attachExtraTrace(trace);
	                castValue._setCarriedStackTrace(trace);
	              }
	              promise._follow(castValue);
	              promise._propagateFrom(castValue, 1);
	            } else {
	              promise._fulfillUnchecked(x);
	            }
	          }
	        };
	        Promise.prototype._follow = function Promise$_follow(promise) {
	          this._setFollowing();
	          if (promise.isPending()) {
	            this._propagateFrom(promise, 1);
	            promise._proxyPromise(this);
	          } else if (promise.isFulfilled()) {
	            this._fulfillUnchecked(promise._settledValue);
	          } else {
	            this._rejectUnchecked(promise._settledValue, promise._getCarriedStackTrace());
	          }
	          if (promise._isRejectionUnhandled())
	            promise._unsetRejectionIsUnhandled();
	          if (debugging && promise._traceParent == null) {
	            promise._traceParent = this;
	          }
	        };
	        Promise.prototype._tryFollow = function Promise$_tryFollow(value) {
	          if (this._isFollowingOrFulfilledOrRejected() || value === this) {
	            return false;
	          }
	          var maybePromise = cast(value, void 0);
	          if (!(maybePromise instanceof Promise)) {
	            return false;
	          }
	          this._follow(maybePromise);
	          return true;
	        };
	        Promise.prototype._resetTrace = function Promise$_resetTrace() {
	          if (debugging) {
	            this._trace = new CapturedTrace(this._peekContext() === void 0);
	          }
	        };
	        Promise.prototype._setTrace = function Promise$_setTrace(parent) {
	          if (debugging) {
	            var context = this._peekContext();
	            this._traceParent = context;
	            var isTopLevel = context === void 0;
	            if (parent !== void 0 && parent._traceParent === context) {
	              this._trace = parent._trace;
	            } else {
	              this._trace = new CapturedTrace(isTopLevel);
	            }
	          }
	          return this;
	        };
	        Promise.prototype._tryAttachExtraTrace = function Promise$_tryAttachExtraTrace(error) {
	          if (canAttach(error)) {
	            this._attachExtraTrace(error);
	          }
	        };
	        Promise.prototype._attachExtraTrace = function Promise$_attachExtraTrace(error) {
	          if (debugging) {
	            var promise = this;
	            var stack = error.stack;
	            stack = typeof stack === "string" ? stack.split("\n") : [];
	            CapturedTrace.protectErrorMessageNewlines(stack);
	            var headerLineCount = 1;
	            var combinedTraces = 1;
	            while (promise != null && promise._trace != null) {
	              stack = CapturedTrace.combine(stack, promise._trace.stack.split("\n"));
	              promise = promise._traceParent;
	              combinedTraces++;
	            }
	            var stackTraceLimit = Error.stackTraceLimit || 10;
	            var max = (stackTraceLimit + headerLineCount) * combinedTraces;
	            var len = stack.length;
	            if (len > max) {
	              stack.length = max;
	            }
	            if (len > 0)
	              stack[0] = stack[0].split("\u0002\u0000\u0001").join("\n");
	            if (stack.length <= headerLineCount) {
	              error.stack = "(No stack trace)";
	            } else {
	              error.stack = stack.join("\n");
	            }
	          }
	        };
	        Promise.prototype._cleanValues = function Promise$_cleanValues() {
	          if (this._cancellable()) {
	            this._cancellationParent = void 0;
	          }
	        };
	        Promise.prototype._propagateFrom = function Promise$_propagateFrom(parent, flags) {
	          if ((flags & 1) > 0 && parent._cancellable()) {
	            this._setCancellable();
	            this._cancellationParent = parent;
	          }
	          if ((flags & 4) > 0) {
	            this._setBoundTo(parent._boundTo);
	          }
	          if ((flags & 2) > 0) {
	            this._setTrace(parent);
	          }
	        };
	        Promise.prototype._fulfill = function Promise$_fulfill(value) {
	          if (this._isFollowingOrFulfilledOrRejected())
	            return;
	          this._fulfillUnchecked(value);
	        };
	        Promise.prototype._reject = function Promise$_reject(reason, carriedStackTrace) {
	          if (this._isFollowingOrFulfilledOrRejected())
	            return;
	          this._rejectUnchecked(reason, carriedStackTrace);
	        };
	        Promise.prototype._settlePromiseAt = function Promise$_settlePromiseAt(index) {
	          var handler = this.isFulfilled() ? this._fulfillmentHandlerAt(index) : this._rejectionHandlerAt(index);
	          var value = this._settledValue;
	          var receiver = this._receiverAt(index);
	          var promise = this._promiseAt(index);
	          if (typeof handler === "function") {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	          } else {
	            var done = false;
	            var isFulfilled = this.isFulfilled();
	            if (receiver !== void 0) {
	              if (receiver instanceof Promise && receiver._isProxied()) {
	                receiver._unsetProxied();
	                if (isFulfilled)
	                  receiver._fulfillUnchecked(value);
	                else
	                  receiver._rejectUnchecked(value, this._getCarriedStackTrace());
	                done = true;
	              } else if (receiver instanceof PromiseArray) {
	                if (isFulfilled)
	                  receiver._promiseFulfilled(value, promise);
	                else
	                  receiver._promiseRejected(value, promise);
	                done = true;
	              }
	            }
	            if (!done) {
	              if (isFulfilled)
	                promise._fulfill(value);
	              else
	                promise._reject(value, this._getCarriedStackTrace());
	            }
	          }
	          if (index >= 4) {
	            this._queueGC();
	          }
	        };
	        Promise.prototype._isProxied = function Promise$_isProxied() {
	          return (this._bitField & 4194304) === 4194304;
	        };
	        Promise.prototype._setProxied = function Promise$_setProxied() {
	          this._bitField = this._bitField | 4194304;
	        };
	        Promise.prototype._unsetProxied = function Promise$_unsetProxied() {
	          this._bitField = this._bitField & (~4194304);
	        };
	        Promise.prototype._isGcQueued = function Promise$_isGcQueued() {
	          return (this._bitField & -1073741824) === -1073741824;
	        };
	        Promise.prototype._setGcQueued = function Promise$_setGcQueued() {
	          this._bitField = this._bitField | -1073741824;
	        };
	        Promise.prototype._unsetGcQueued = function Promise$_unsetGcQueued() {
	          this._bitField = this._bitField & (~-1073741824);
	        };
	        Promise.prototype._queueGC = function Promise$_queueGC() {
	          if (this._isGcQueued())
	            return;
	          this._setGcQueued();
	          async.invokeLater(this._gc, this, void 0);
	        };
	        Promise.prototype._gc = function Promise$gc() {
	          var len = this._length() * 5 - 5;
	          for (var i = 0; i < len; i++) {
	            delete this[i];
	          }
	          this._clearFirstHandlerData();
	          this._setLength(0);
	          this._unsetGcQueued();
	        };
	        Promise.prototype._clearFirstHandlerData = function Promise$_clearFirstHandlerData() {
	          this._fulfillmentHandler0 = void 0;
	          this._rejectionHandler0 = void 0;
	          this._promise0 = void 0;
	          this._receiver0 = void 0;
	        };
	        Promise.prototype._queueSettleAt = function Promise$_queueSettleAt(index) {
	          if (this._isRejectionUnhandled())
	            this._unsetRejectionIsUnhandled();
	          async.invoke(this._settlePromiseAt, this, index);
	        };
	        Promise.prototype._fulfillUnchecked = function Promise$_fulfillUnchecked(value) {
	          if (!this.isPending())
	            return;
	          if (value === this) {
	            var err = makeSelfResolutionError();
	            this._attachExtraTrace(err);
	            return this._rejectUnchecked(err, void 0);
	          }
	          this._cleanValues();
	          this._setFulfilled();
	          this._settledValue = value;
	          var len = this._length();
	          if (len > 0) {
	            async.invoke(this._settlePromises, this, len);
	          }
	        };
	        Promise.prototype._rejectUncheckedCheckError = function Promise$_rejectUncheckedCheckError(reason) {
	          var trace = canAttach(reason) ? reason : new Error(reason + "");
	          this._rejectUnchecked(reason, trace === reason ? void 0 : trace);
	        };
	        Promise.prototype._rejectUnchecked = function Promise$_rejectUnchecked(reason, trace) {
	          if (!this.isPending())
	            return;
	          if (reason === this) {
	            var err = makeSelfResolutionError();
	            this._attachExtraTrace(err);
	            return this._rejectUnchecked(err);
	          }
	          this._cleanValues();
	          this._setRejected();
	          this._settledValue = reason;
	          if (this._isFinal()) {
	            async.invokeLater(thrower, void 0, trace === void 0 ? reason : trace);
	            return;
	          }
	          var len = this._length();
	          if (trace !== void 0)
	            this._setCarriedStackTrace(trace);
	          if (len > 0) {
	            async.invoke(this._rejectPromises, this, null);
	          } else {
	            this._ensurePossibleRejectionHandled();
	          }
	        };
	        Promise.prototype._rejectPromises = function Promise$_rejectPromises() {
	          this._settlePromises();
	          this._unsetCarriedStackTrace();
	        };
	        Promise.prototype._settlePromises = function Promise$_settlePromises() {
	          var len = this._length();
	          for (var i = 0; i < len; i++) {
	            this._settlePromiseAt(i);
	          }
	        };
	        Promise.prototype._ensurePossibleRejectionHandled = function Promise$_ensurePossibleRejectionHandled() {
	          this._setRejectionIsUnhandled();
	          if (CapturedTrace.possiblyUnhandledRejection !== void 0) {
	            async.invokeLater(this._notifyUnhandledRejection, this, void 0);
	          }
	        };
	        Promise.prototype._notifyUnhandledRejectionIsHandled = function Promise$_notifyUnhandledRejectionIsHandled() {
	          if (typeof unhandledRejectionHandled === "function") {
	            async.invokeLater(unhandledRejectionHandled, void 0, this);
	          }
	        };
	        Promise.prototype._notifyUnhandledRejection = function Promise$_notifyUnhandledRejection() {
	          if (this._isRejectionUnhandled()) {
	            var reason = this._settledValue;
	            var trace = this._getCarriedStackTrace();
	            this._setUnhandledRejectionIsNotified();
	            if (trace !== void 0) {
	              this._unsetCarriedStackTrace();
	              reason = trace;
	            }
	            if (typeof CapturedTrace.possiblyUnhandledRejection === "function") {
	              CapturedTrace.possiblyUnhandledRejection(reason, this);
	            }
	          }
	        };
	        var contextStack = [];
	        Promise.prototype._peekContext = function Promise$_peekContext() {
	          var lastIndex = contextStack.length - 1;
	          if (lastIndex >= 0) {
	            return contextStack[lastIndex];
	          }
	          return void 0;
	        };
	        Promise.prototype._pushContext = function Promise$_pushContext() {
	          if (!debugging)
	            return;
	          contextStack.push(this);
	        };
	        Promise.prototype._popContext = function Promise$_popContext() {
	          if (!debugging)
	            return;
	          contextStack.pop();
	        };
	        Promise.noConflict = function Promise$NoConflict() {
	          return noConflict(Promise);
	        };
	        Promise.setScheduler = function(fn) {
	          if (typeof fn !== "function")
	            throw new TypeError("fn must be a function");
	          async._schedule = fn;
	        };
	        if (!CapturedTrace.isSupported()) {
	          Promise.longStackTraces = function() {};
	          debugging = false;
	        }
	        Promise._makeSelfResolutionError = makeSelfResolutionError;
	        _dereq_("./finally.js")(Promise, NEXT_FILTER, cast);
	        _dereq_("./direct_resolve.js")(Promise);
	        _dereq_("./synchronous_inspection.js")(Promise);
	        _dereq_("./join.js")(Promise, PromiseArray, cast, INTERNAL);
	        Promise.RangeError = RangeError;
	        Promise.CancellationError = CancellationError;
	        Promise.TimeoutError = TimeoutError;
	        Promise.TypeError = TypeError;
	        Promise.OperationalError = OperationalError;
	        Promise.RejectionError = OperationalError;
	        Promise.AggregateError = errors.AggregateError;
	        util.toFastProperties(Promise);
	        util.toFastProperties(Promise.prototype);
	        Promise.Promise = Promise;
	        _dereq_('./timers.js')(Promise, INTERNAL, cast);
	        _dereq_('./race.js')(Promise, INTERNAL, cast);
	        _dereq_('./call_get.js')(Promise);
	        _dereq_('./generators.js')(Promise, apiRejection, INTERNAL, cast);
	        _dereq_('./map.js')(Promise, PromiseArray, apiRejection, cast, INTERNAL);
	        _dereq_('./nodeify.js')(Promise);
	        _dereq_('./promisify.js')(Promise, INTERNAL);
	        _dereq_('./props.js')(Promise, PromiseArray, cast);
	        _dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, cast, INTERNAL);
	        _dereq_('./settle.js')(Promise, PromiseArray);
	        _dereq_('./some.js')(Promise, PromiseArray, apiRejection);
	        _dereq_('./progress.js')(Promise, PromiseArray);
	        _dereq_('./cancel.js')(Promise, INTERNAL);
	        _dereq_('./filter.js')(Promise, INTERNAL);
	        _dereq_('./any.js')(Promise, PromiseArray);
	        _dereq_('./each.js')(Promise, INTERNAL);
	        _dereq_('./using.js')(Promise, apiRejection, cast);
	        Promise.prototype = Promise.prototype;
	        return Promise;
	      };
	    }, {
	      "./any.js": 1,
	      "./async.js": 2,
	      "./call_get.js": 4,
	      "./cancel.js": 5,
	      "./captured_trace.js": 6,
	      "./catch_filter.js": 7,
	      "./direct_resolve.js": 8,
	      "./each.js": 9,
	      "./errors.js": 10,
	      "./errors_api_rejection": 11,
	      "./filter.js": 13,
	      "./finally.js": 14,
	      "./generators.js": 15,
	      "./join.js": 16,
	      "./map.js": 17,
	      "./nodeify.js": 18,
	      "./progress.js": 19,
	      "./promise_array.js": 21,
	      "./promise_resolver.js": 22,
	      "./promisify.js": 23,
	      "./props.js": 24,
	      "./race.js": 26,
	      "./reduce.js": 27,
	      "./settle.js": 29,
	      "./some.js": 30,
	      "./synchronous_inspection.js": 31,
	      "./thenables.js": 32,
	      "./timers.js": 33,
	      "./using.js": 34,
	      "./util.js": 35
	    }],
	    21: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL, cast) {
	        var canAttach = _dereq_("./errors.js").canAttach;
	        var util = _dereq_("./util.js");
	        var isArray = util.isArray;
	        function toResolutionValue(val) {
	          switch (val) {
	            case -1:
	              return void 0;
	            case -2:
	              return [];
	            case -3:
	              return {};
	          }
	        }
	        function PromiseArray(values) {
	          var promise = this._promise = new Promise(INTERNAL);
	          var parent = void 0;
	          if (values instanceof Promise) {
	            parent = values;
	            promise._propagateFrom(parent, 1 | 4);
	          }
	          promise._setTrace(parent);
	          this._values = values;
	          this._length = 0;
	          this._totalResolved = 0;
	          this._init(void 0, -2);
	        }
	        PromiseArray.prototype.length = function PromiseArray$length() {
	          return this._length;
	        };
	        PromiseArray.prototype.promise = function PromiseArray$promise() {
	          return this._promise;
	        };
	        PromiseArray.prototype._init = function PromiseArray$_init(_, resolveValueIfEmpty) {
	          var values = cast(this._values, void 0);
	          if (values instanceof Promise) {
	            this._values = values;
	            values._setBoundTo(this._promise._boundTo);
	            if (values.isFulfilled()) {
	              values = values._settledValue;
	              if (!isArray(values)) {
	                var err = new Promise.TypeError("expecting an array, a promise or a thenable");
	                this.__hardReject__(err);
	                return;
	              }
	            } else if (values.isPending()) {
	              values._then(PromiseArray$_init, this._reject, void 0, this, resolveValueIfEmpty);
	              return;
	            } else {
	              values._unsetRejectionIsUnhandled();
	              this._reject(values._settledValue);
	              return;
	            }
	          } else if (!isArray(values)) {
	            var err = new Promise.TypeError("expecting an array, a promise or a thenable");
	            this.__hardReject__(err);
	            return;
	          }
	          if (values.length === 0) {
	            if (resolveValueIfEmpty === -5) {
	              this._resolveEmptyArray();
	            } else {
	              this._resolve(toResolutionValue(resolveValueIfEmpty));
	            }
	            return;
	          }
	          var len = this.getActualLength(values.length);
	          var newLen = len;
	          var newValues = this.shouldCopyValues() ? new Array(len) : this._values;
	          var isDirectScanNeeded = false;
	          for (var i = 0; i < len; ++i) {
	            var maybePromise = cast(values[i], void 0);
	            if (maybePromise instanceof Promise) {
	              if (maybePromise.isPending()) {
	                maybePromise._proxyPromiseArray(this, i);
	              } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                isDirectScanNeeded = true;
	              }
	            } else {
	              isDirectScanNeeded = true;
	            }
	            newValues[i] = maybePromise;
	          }
	          this._values = newValues;
	          this._length = newLen;
	          if (isDirectScanNeeded) {
	            this._scanDirectValues(len);
	          }
	        };
	        PromiseArray.prototype._settlePromiseAt = function PromiseArray$_settlePromiseAt(index) {
	          var value = this._values[index];
	          if (!(value instanceof Promise)) {
	            this._promiseFulfilled(value, index);
	          } else if (value.isFulfilled()) {
	            this._promiseFulfilled(value._settledValue, index);
	          } else if (value.isRejected()) {
	            this._promiseRejected(value._settledValue, index);
	          }
	        };
	        PromiseArray.prototype._scanDirectValues = function PromiseArray$_scanDirectValues(len) {
	          for (var i = 0; i < len; ++i) {
	            if (this._isResolved()) {
	              break;
	            }
	            this._settlePromiseAt(i);
	          }
	        };
	        PromiseArray.prototype._isResolved = function PromiseArray$_isResolved() {
	          return this._values === null;
	        };
	        PromiseArray.prototype._resolve = function PromiseArray$_resolve(value) {
	          this._values = null;
	          this._promise._fulfill(value);
	        };
	        PromiseArray.prototype.__hardReject__ = PromiseArray.prototype._reject = function PromiseArray$_reject(reason) {
	          this._values = null;
	          var trace = canAttach(reason) ? reason : new Error(reason + "");
	          this._promise._attachExtraTrace(trace);
	          this._promise._reject(reason, trace);
	        };
	        PromiseArray.prototype._promiseProgressed = function PromiseArray$_promiseProgressed(progressValue, index) {
	          if (this._isResolved())
	            return;
	          this._promise._progress({
	            index: index,
	            value: progressValue
	          });
	        };
	        PromiseArray.prototype._promiseFulfilled = function PromiseArray$_promiseFulfilled(value, index) {
	          if (this._isResolved())
	            return;
	          this._values[index] = value;
	          var totalResolved = ++this._totalResolved;
	          if (totalResolved >= this._length) {
	            this._resolve(this._values);
	          }
	        };
	        PromiseArray.prototype._promiseRejected = function PromiseArray$_promiseRejected(reason, index) {
	          if (this._isResolved())
	            return;
	          this._totalResolved++;
	          this._reject(reason);
	        };
	        PromiseArray.prototype.shouldCopyValues = function PromiseArray$_shouldCopyValues() {
	          return true;
	        };
	        PromiseArray.prototype.getActualLength = function PromiseArray$getActualLength(len) {
	          return len;
	        };
	        return PromiseArray;
	      };
	    }, {
	      "./errors.js": 10,
	      "./util.js": 35
	    }],
	    22: [function(_dereq_, module, exports) {
	      "use strict";
	      var util = _dereq_("./util.js");
	      var maybeWrapAsError = util.maybeWrapAsError;
	      var errors = _dereq_("./errors.js");
	      var TimeoutError = errors.TimeoutError;
	      var OperationalError = errors.OperationalError;
	      var async = _dereq_("./async.js");
	      var haveGetters = util.haveGetters;
	      var es5 = _dereq_("./es5.js");
	      function isUntypedError(obj) {
	        return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
	      }
	      function wrapAsOperationalError(obj) {
	        var ret;
	        if (isUntypedError(obj)) {
	          ret = new OperationalError(obj);
	        } else {
	          ret = obj;
	        }
	        errors.markAsOriginatingFromRejection(ret);
	        return ret;
	      }
	      function nodebackForPromise(promise) {
	        function PromiseResolver$_callback(err, value) {
	          if (promise === null)
	            return;
	          if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	          } else if (arguments.length > 2) {
	            var $_len = arguments.length;
	            var args = new Array($_len - 1);
	            for (var $_i = 1; $_i < $_len; ++$_i) {
	              args[$_i - 1] = arguments[$_i];
	            }
	            promise._fulfill(args);
	          } else {
	            promise._fulfill(value);
	          }
	          promise = null;
	        }
	        return PromiseResolver$_callback;
	      }
	      var PromiseResolver;
	      if (!haveGetters) {
	        PromiseResolver = function PromiseResolver(promise) {
	          this.promise = promise;
	          this.asCallback = nodebackForPromise(promise);
	          this.callback = this.asCallback;
	        };
	      } else {
	        PromiseResolver = function PromiseResolver(promise) {
	          this.promise = promise;
	        };
	      }
	      if (haveGetters) {
	        var prop = {get: function() {
	            return nodebackForPromise(this.promise);
	          }};
	        es5.defineProperty(PromiseResolver.prototype, "asCallback", prop);
	        es5.defineProperty(PromiseResolver.prototype, "callback", prop);
	      }
	      PromiseResolver._nodebackForPromise = nodebackForPromise;
	      PromiseResolver.prototype.toString = function PromiseResolver$toString() {
	        return "[object PromiseResolver]";
	      };
	      PromiseResolver.prototype.resolve = PromiseResolver.prototype.fulfill = function PromiseResolver$resolve(value) {
	        if (!(this instanceof PromiseResolver)) {
	          throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	        }
	        var promise = this.promise;
	        if (promise._tryFollow(value)) {
	          return;
	        }
	        async.invoke(promise._fulfill, promise, value);
	      };
	      PromiseResolver.prototype.reject = function PromiseResolver$reject(reason) {
	        if (!(this instanceof PromiseResolver)) {
	          throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	        }
	        var promise = this.promise;
	        errors.markAsOriginatingFromRejection(reason);
	        var trace = errors.canAttach(reason) ? reason : new Error(reason + "");
	        promise._attachExtraTrace(trace);
	        async.invoke(promise._reject, promise, reason);
	        if (trace !== reason) {
	          async.invoke(this._setCarriedStackTrace, this, trace);
	        }
	      };
	      PromiseResolver.prototype.progress = function PromiseResolver$progress(value) {
	        if (!(this instanceof PromiseResolver)) {
	          throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	        }
	        async.invoke(this.promise._progress, this.promise, value);
	      };
	      PromiseResolver.prototype.cancel = function PromiseResolver$cancel() {
	        async.invoke(this.promise.cancel, this.promise, void 0);
	      };
	      PromiseResolver.prototype.timeout = function PromiseResolver$timeout() {
	        this.reject(new TimeoutError("timeout"));
	      };
	      PromiseResolver.prototype.isResolved = function PromiseResolver$isResolved() {
	        return this.promise.isResolved();
	      };
	      PromiseResolver.prototype.toJSON = function PromiseResolver$toJSON() {
	        return this.promise.toJSON();
	      };
	      PromiseResolver.prototype._setCarriedStackTrace = function PromiseResolver$_setCarriedStackTrace(trace) {
	        if (this.promise.isRejected()) {
	          this.promise._setCarriedStackTrace(trace);
	        }
	      };
	      module.exports = PromiseResolver;
	    }, {
	      "./async.js": 2,
	      "./errors.js": 10,
	      "./es5.js": 12,
	      "./util.js": 35
	    }],
	    23: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL) {
	        var THIS = {};
	        var util = _dereq_("./util.js");
	        var nodebackForPromise = _dereq_("./promise_resolver.js")._nodebackForPromise;
	        var withAppended = util.withAppended;
	        var maybeWrapAsError = util.maybeWrapAsError;
	        var canEvaluate = util.canEvaluate;
	        var TypeError = _dereq_("./errors").TypeError;
	        var defaultSuffix = "Async";
	        var defaultFilter = function(name, func) {
	          return util.isIdentifier(name) && name.charAt(0) !== "_" && !util.isClass(func);
	        };
	        var defaultPromisified = {__isPromisified__: true};
	        function escapeIdentRegex(str) {
	          return str.replace(/([$])/, "\\$");
	        }
	        function isPromisified(fn) {
	          try {
	            return fn.__isPromisified__ === true;
	          } catch (e) {
	            return false;
	          }
	        }
	        function hasPromisified(obj, key, suffix) {
	          var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
	          return val ? isPromisified(val) : false;
	        }
	        function checkValid(ret, suffix, suffixRegexp) {
	          for (var i = 0; i < ret.length; i += 2) {
	            var key = ret[i];
	            if (suffixRegexp.test(key)) {
	              var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	              for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                  throw new TypeError("Cannot promisify an API " + "that has normal methods with '" + suffix + "'-suffix");
	                }
	              }
	            }
	          }
	        }
	        function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	          var keys = util.inheritedDataKeys(obj);
	          var ret = [];
	          for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            var value = obj[key];
	            if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter(key, value, obj)) {
	              ret.push(key, value);
	            }
	          }
	          checkValid(ret, suffix, suffixRegexp);
	          return ret;
	        }
	        function switchCaseArgumentOrder(likelyArgumentCount) {
	          var ret = [likelyArgumentCount];
	          var min = Math.max(0, likelyArgumentCount - 1 - 5);
	          for (var i = likelyArgumentCount - 1; i >= min; --i) {
	            if (i === likelyArgumentCount)
	              continue;
	            ret.push(i);
	          }
	          for (var i = likelyArgumentCount + 1; i <= 5; ++i) {
	            ret.push(i);
	          }
	          return ret;
	        }
	        function argumentSequence(argumentCount) {
	          return util.filledRange(argumentCount, "arguments[", "]");
	        }
	        function parameterDeclaration(parameterCount) {
	          return util.filledRange(parameterCount, "_arg", "");
	        }
	        function parameterCount(fn) {
	          if (typeof fn.length === "number") {
	            return Math.max(Math.min(fn.length, 1023 + 1), 0);
	          }
	          return 0;
	        }
	        function generatePropertyAccess(key) {
	          if (util.isIdentifier(key)) {
	            return "." + key;
	          } else
	            return "['" + key.replace(/(['\\])/g, "\\$1") + "']";
	        }
	        function makeNodePromisifiedEval(callback, receiver, originalName, fn, suffix) {
	          var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	          var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	          var callbackName = (typeof originalName === "string" && util.isIdentifier(originalName) ? originalName + suffix : "promisified");
	          function generateCallForArgumentCount(count) {
	            var args = argumentSequence(count).join(", ");
	            var comma = count > 0 ? ", " : "";
	            var ret;
	            if (typeof callback === "string") {
	              ret = "                                                          \n\
	                this.method({{args}}, fn);                                   \n\
	                break;                                                       \n\
	            ".replace(".method", generatePropertyAccess(callback));
	            } else if (receiver === THIS) {
	              ret = "                                                         \n\
	                callback.call(this, {{args}}, fn);                           \n\
	                break;                                                       \n\
	            ";
	            } else if (receiver !== void 0) {
	              ret = "                                                         \n\
	                callback.call(receiver, {{args}}, fn);                       \n\
	                break;                                                       \n\
	            ";
	            } else {
	              ret = "                                                         \n\
	                callback({{args}}, fn);                                      \n\
	                break;                                                       \n\
	            ";
	            }
	            return ret.replace("{{args}}", args).replace(", ", comma);
	          }
	          function generateArgumentSwitchCase() {
	            var ret = "";
	            for (var i = 0; i < argumentOrder.length; ++i) {
	              ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
	            }
	            var codeForCall;
	            if (typeof callback === "string") {
	              codeForCall = "                                                  \n\
	                this.property.apply(this, args);                             \n\
	            ".replace(".property", generatePropertyAccess(callback));
	            } else if (receiver === THIS) {
	              codeForCall = "                                                  \n\
	                callback.apply(this, args);                                  \n\
	            ";
	            } else {
	              codeForCall = "                                                  \n\
	                callback.apply(receiver, args);                              \n\
	            ";
	            }
	            ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = fn;                                                    \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", codeForCall);
	            return ret;
	          }
	          return new Function("Promise", "callback", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "INTERNAL", "                                         \n\
	        var ret = function FunctionName(Parameters) {                        \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._setTrace(void 0);                                       \n\
	            var fn = nodebackForPromise(promise);                            \n\
	            try {                                                            \n\
	                switch(len) {                                                \n\
	                    [CodeForSwitchCase]                                      \n\
	                }                                                            \n\
	            } catch (e) {                                                    \n\
	                var wrapped = maybeWrapAsError(e);                           \n\
	                promise._attachExtraTrace(wrapped);                          \n\
	                promise._reject(wrapped);                                    \n\
	            }                                                                \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        ret.__isPromisified__ = true;                                        \n\
	        return ret;                                                          \n\
	        ".replace("FunctionName", callbackName).replace("Parameters", parameterDeclaration(newParameterCount)).replace("[CodeForSwitchCase]", generateArgumentSwitchCase()))(Promise, callback, receiver, withAppended, maybeWrapAsError, nodebackForPromise, INTERNAL);
	        }
	        function makeNodePromisifiedClosure(callback, receiver) {
	          function promisified() {
	            var _receiver = receiver;
	            if (receiver === THIS)
	              _receiver = this;
	            if (typeof callback === "string") {
	              callback = _receiver[callback];
	            }
	            var promise = new Promise(INTERNAL);
	            promise._setTrace(void 0);
	            var fn = nodebackForPromise(promise);
	            try {
	              callback.apply(_receiver, withAppended(arguments, fn));
	            } catch (e) {
	              var wrapped = maybeWrapAsError(e);
	              promise._attachExtraTrace(wrapped);
	              promise._reject(wrapped);
	            }
	            return promise;
	          }
	          promisified.__isPromisified__ = true;
	          return promisified;
	        }
	        var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
	        function promisifyAll(obj, suffix, filter, promisifier) {
	          var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	          var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);
	          for (var i = 0,
	              len = methods.length; i < len; i += 2) {
	            var key = methods[i];
	            var fn = methods[i + 1];
	            var promisifiedKey = key + suffix;
	            obj[promisifiedKey] = promisifier === makeNodePromisified ? makeNodePromisified(key, THIS, key, fn, suffix) : promisifier(fn);
	          }
	          util.toFastProperties(obj);
	          return obj;
	        }
	        function promisify(callback, receiver) {
	          return makeNodePromisified(callback, receiver, void 0, callback);
	        }
	        Promise.promisify = function Promise$Promisify(fn, receiver) {
	          if (typeof fn !== "function") {
	            throw new TypeError("fn must be a function");
	          }
	          if (isPromisified(fn)) {
	            return fn;
	          }
	          return promisify(fn, arguments.length < 2 ? THIS : receiver);
	        };
	        Promise.promisifyAll = function Promise$PromisifyAll(target, options) {
	          if (typeof target !== "function" && typeof target !== "object") {
	            throw new TypeError("the target of promisifyAll must be an object or a function");
	          }
	          options = Object(options);
	          var suffix = options.suffix;
	          if (typeof suffix !== "string")
	            suffix = defaultSuffix;
	          var filter = options.filter;
	          if (typeof filter !== "function")
	            filter = defaultFilter;
	          var promisifier = options.promisifier;
	          if (typeof promisifier !== "function")
	            promisifier = makeNodePromisified;
	          if (!util.isIdentifier(suffix)) {
	            throw new RangeError("suffix must be a valid identifier");
	          }
	          var keys = util.inheritedDataKeys(target, {includeHidden: true});
	          for (var i = 0; i < keys.length; ++i) {
	            var value = target[keys[i]];
	            if (keys[i] !== "constructor" && util.isClass(value)) {
	              promisifyAll(value.prototype, suffix, filter, promisifier);
	              promisifyAll(value, suffix, filter, promisifier);
	            }
	          }
	          return promisifyAll(target, suffix, filter, promisifier);
	        };
	      };
	    }, {
	      "./errors": 10,
	      "./promise_resolver.js": 22,
	      "./util.js": 35
	    }],
	    24: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray, cast) {
	        var util = _dereq_("./util.js");
	        var apiRejection = _dereq_("./errors_api_rejection")(Promise);
	        var isObject = util.isObject;
	        var es5 = _dereq_("./es5.js");
	        function PropertiesPromiseArray(obj) {
	          var keys = es5.keys(obj);
	          var len = keys.length;
	          var values = new Array(len * 2);
	          for (var i = 0; i < len; ++i) {
	            var key = keys[i];
	            values[i] = obj[key];
	            values[i + len] = key;
	          }
	          this.constructor$(values);
	        }
	        util.inherits(PropertiesPromiseArray, PromiseArray);
	        PropertiesPromiseArray.prototype._init = function PropertiesPromiseArray$_init() {
	          this._init$(void 0, -3);
	        };
	        PropertiesPromiseArray.prototype._promiseFulfilled = function PropertiesPromiseArray$_promiseFulfilled(value, index) {
	          if (this._isResolved())
	            return;
	          this._values[index] = value;
	          var totalResolved = ++this._totalResolved;
	          if (totalResolved >= this._length) {
	            var val = {};
	            var keyOffset = this.length();
	            for (var i = 0,
	                len = this.length(); i < len; ++i) {
	              val[this._values[i + keyOffset]] = this._values[i];
	            }
	            this._resolve(val);
	          }
	        };
	        PropertiesPromiseArray.prototype._promiseProgressed = function PropertiesPromiseArray$_promiseProgressed(value, index) {
	          if (this._isResolved())
	            return;
	          this._promise._progress({
	            key: this._values[index + this.length()],
	            value: value
	          });
	        };
	        PropertiesPromiseArray.prototype.shouldCopyValues = function PropertiesPromiseArray$_shouldCopyValues() {
	          return false;
	        };
	        PropertiesPromiseArray.prototype.getActualLength = function PropertiesPromiseArray$getActualLength(len) {
	          return len >> 1;
	        };
	        function Promise$_Props(promises) {
	          var ret;
	          var castValue = cast(promises, void 0);
	          if (!isObject(castValue)) {
	            return apiRejection("cannot await properties of a non-object");
	          } else if (castValue instanceof Promise) {
	            ret = castValue._then(Promise.props, void 0, void 0, void 0, void 0);
	          } else {
	            ret = new PropertiesPromiseArray(castValue).promise();
	          }
	          if (castValue instanceof Promise) {
	            ret._propagateFrom(castValue, 4);
	          }
	          return ret;
	        }
	        Promise.prototype.props = function Promise$props() {
	          return Promise$_Props(this);
	        };
	        Promise.props = function Promise$Props(promises) {
	          return Promise$_Props(promises);
	        };
	      };
	    }, {
	      "./errors_api_rejection": 11,
	      "./es5.js": 12,
	      "./util.js": 35
	    }],
	    25: [function(_dereq_, module, exports) {
	      "use strict";
	      function arrayCopy(src, srcIndex, dst, dstIndex, len) {
	        for (var j = 0; j < len; ++j) {
	          dst[j + dstIndex] = src[j + srcIndex];
	        }
	      }
	      function Queue(capacity) {
	        this._capacity = capacity;
	        this._length = 0;
	        this._front = 0;
	        this._makeCapacity();
	      }
	      Queue.prototype._willBeOverCapacity = function Queue$_willBeOverCapacity(size) {
	        return this._capacity < size;
	      };
	      Queue.prototype._pushOne = function Queue$_pushOne(arg) {
	        var length = this.length();
	        this._checkCapacity(length + 1);
	        var i = (this._front + length) & (this._capacity - 1);
	        this[i] = arg;
	        this._length = length + 1;
	      };
	      Queue.prototype.push = function Queue$push(fn, receiver, arg) {
	        var length = this.length() + 3;
	        if (this._willBeOverCapacity(length)) {
	          this._pushOne(fn);
	          this._pushOne(receiver);
	          this._pushOne(arg);
	          return;
	        }
	        var j = this._front + length - 3;
	        this._checkCapacity(length);
	        var wrapMask = this._capacity - 1;
	        this[(j + 0) & wrapMask] = fn;
	        this[(j + 1) & wrapMask] = receiver;
	        this[(j + 2) & wrapMask] = arg;
	        this._length = length;
	      };
	      Queue.prototype.shift = function Queue$shift() {
	        var front = this._front,
	            ret = this[front];
	        this[front] = void 0;
	        this._front = (front + 1) & (this._capacity - 1);
	        this._length--;
	        return ret;
	      };
	      Queue.prototype.length = function Queue$length() {
	        return this._length;
	      };
	      Queue.prototype._makeCapacity = function Queue$_makeCapacity() {
	        var len = this._capacity;
	        for (var i = 0; i < len; ++i) {
	          this[i] = void 0;
	        }
	      };
	      Queue.prototype._checkCapacity = function Queue$_checkCapacity(size) {
	        if (this._capacity < size) {
	          this._resizeTo(this._capacity << 3);
	        }
	      };
	      Queue.prototype._resizeTo = function Queue$_resizeTo(capacity) {
	        var oldFront = this._front;
	        var oldCapacity = this._capacity;
	        var oldQueue = new Array(oldCapacity);
	        var length = this.length();
	        arrayCopy(this, 0, oldQueue, 0, oldCapacity);
	        this._capacity = capacity;
	        this._makeCapacity();
	        this._front = 0;
	        if (oldFront + length <= oldCapacity) {
	          arrayCopy(oldQueue, oldFront, this, 0, length);
	        } else {
	          var lengthBeforeWrapping = length - ((oldFront + length) & (oldCapacity - 1));
	          arrayCopy(oldQueue, oldFront, this, 0, lengthBeforeWrapping);
	          arrayCopy(oldQueue, 0, this, lengthBeforeWrapping, length - lengthBeforeWrapping);
	        }
	      };
	      module.exports = Queue;
	    }, {}],
	    26: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL, cast) {
	        var apiRejection = _dereq_("./errors_api_rejection.js")(Promise);
	        var isArray = _dereq_("./util.js").isArray;
	        var raceLater = function Promise$_raceLater(promise) {
	          return promise.then(function(array) {
	            return Promise$_Race(array, promise);
	          });
	        };
	        var hasOwn = {}.hasOwnProperty;
	        function Promise$_Race(promises, parent) {
	          var maybePromise = cast(promises, void 0);
	          if (maybePromise instanceof Promise) {
	            return raceLater(maybePromise);
	          } else if (!isArray(promises)) {
	            return apiRejection("expecting an array, a promise or a thenable");
	          }
	          var ret = new Promise(INTERNAL);
	          if (parent !== void 0) {
	            ret._propagateFrom(parent, 7);
	          } else {
	            ret._setTrace(void 0);
	          }
	          var fulfill = ret._fulfill;
	          var reject = ret._reject;
	          for (var i = 0,
	              len = promises.length; i < len; ++i) {
	            var val = promises[i];
	            if (val === void 0 && !(hasOwn.call(promises, i))) {
	              continue;
	            }
	            Promise.cast(val)._then(fulfill, reject, void 0, ret, null);
	          }
	          return ret;
	        }
	        Promise.race = function Promise$Race(promises) {
	          return Promise$_Race(promises, void 0);
	        };
	        Promise.prototype.race = function Promise$race() {
	          return Promise$_Race(this, void 0);
	        };
	      };
	    }, {
	      "./errors_api_rejection.js": 11,
	      "./util.js": 35
	    }],
	    27: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
	        var util = _dereq_("./util.js");
	        var tryCatch4 = util.tryCatch4;
	        var tryCatch3 = util.tryCatch3;
	        var errorObj = util.errorObj;
	        function ReductionPromiseArray(promises, fn, accum, _each) {
	          this.constructor$(promises);
	          this._preservedValues = _each === INTERNAL ? [] : null;
	          this._zerothIsAccum = (accum === void 0);
	          this._gotAccum = false;
	          this._reducingIndex = (this._zerothIsAccum ? 1 : 0);
	          this._valuesPhase = undefined;
	          var maybePromise = cast(accum, void 0);
	          var rejected = false;
	          var isPromise = maybePromise instanceof Promise;
	          if (isPromise) {
	            if (maybePromise.isPending()) {
	              maybePromise._proxyPromiseArray(this, -1);
	            } else if (maybePromise.isFulfilled()) {
	              accum = maybePromise.value();
	              this._gotAccum = true;
	            } else {
	              maybePromise._unsetRejectionIsUnhandled();
	              this._reject(maybePromise.reason());
	              rejected = true;
	            }
	          }
	          if (!(isPromise || this._zerothIsAccum))
	            this._gotAccum = true;
	          this._callback = fn;
	          this._accum = accum;
	          if (!rejected)
	            this._init$(void 0, -5);
	        }
	        util.inherits(ReductionPromiseArray, PromiseArray);
	        ReductionPromiseArray.prototype._init = function ReductionPromiseArray$_init() {};
	        ReductionPromiseArray.prototype._resolveEmptyArray = function ReductionPromiseArray$_resolveEmptyArray() {
	          if (this._gotAccum || this._zerothIsAccum) {
	            this._resolve(this._preservedValues !== null ? [] : this._accum);
	          }
	        };
	        ReductionPromiseArray.prototype._promiseFulfilled = function ReductionPromiseArray$_promiseFulfilled(value, index) {
	          var values = this._values;
	          if (values === null)
	            return;
	          var length = this.length();
	          var preservedValues = this._preservedValues;
	          var isEach = preservedValues !== null;
	          var gotAccum = this._gotAccum;
	          var valuesPhase = this._valuesPhase;
	          var valuesPhaseIndex;
	          if (!valuesPhase) {
	            valuesPhase = this._valuesPhase = Array(length);
	            for (valuesPhaseIndex = 0; valuesPhaseIndex < length; ++valuesPhaseIndex) {
	              valuesPhase[valuesPhaseIndex] = 0;
	            }
	          }
	          valuesPhaseIndex = valuesPhase[index];
	          if (index === 0 && this._zerothIsAccum) {
	            if (!gotAccum) {
	              this._accum = value;
	              this._gotAccum = gotAccum = true;
	            }
	            valuesPhase[index] = ((valuesPhaseIndex === 0) ? 1 : 2);
	          } else if (index === -1) {
	            if (!gotAccum) {
	              this._accum = value;
	              this._gotAccum = gotAccum = true;
	            }
	          } else {
	            if (valuesPhaseIndex === 0) {
	              valuesPhase[index] = 1;
	            } else {
	              valuesPhase[index] = 2;
	              if (gotAccum) {
	                this._accum = value;
	              }
	            }
	          }
	          if (!gotAccum)
	            return;
	          var callback = this._callback;
	          var receiver = this._promise._boundTo;
	          var ret;
	          for (var i = this._reducingIndex; i < length; ++i) {
	            valuesPhaseIndex = valuesPhase[i];
	            if (valuesPhaseIndex === 2) {
	              this._reducingIndex = i + 1;
	              continue;
	            }
	            if (valuesPhaseIndex !== 1)
	              return;
	            value = values[i];
	            if (value instanceof Promise) {
	              if (value.isFulfilled()) {
	                value = value._settledValue;
	              } else if (value.isPending()) {
	                return;
	              } else {
	                value._unsetRejectionIsUnhandled();
	                return this._reject(value.reason());
	              }
	            }
	            if (isEach) {
	              preservedValues.push(value);
	              ret = tryCatch3(callback, receiver, value, i, length);
	            } else {
	              ret = tryCatch4(callback, receiver, this._accum, value, i, length);
	            }
	            if (ret === errorObj)
	              return this._reject(ret.e);
	            var maybePromise = cast(ret, void 0);
	            if (maybePromise instanceof Promise) {
	              if (maybePromise.isPending()) {
	                valuesPhase[i] = 4;
	                return maybePromise._proxyPromiseArray(this, i);
	              } else if (maybePromise.isFulfilled()) {
	                ret = maybePromise.value();
	              } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise.reason());
	              }
	            }
	            this._reducingIndex = i + 1;
	            this._accum = ret;
	          }
	          if (this._reducingIndex < length)
	            return;
	          this._resolve(isEach ? preservedValues : this._accum);
	        };
	        function reduce(promises, fn, initialValue, _each) {
	          if (typeof fn !== "function")
	            return apiRejection("fn must be a function");
	          var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	          return array.promise();
	        }
	        Promise.prototype.reduce = function Promise$reduce(fn, initialValue) {
	          return reduce(this, fn, initialValue, null);
	        };
	        Promise.reduce = function Promise$Reduce(promises, fn, initialValue, _each) {
	          return reduce(promises, fn, initialValue, _each);
	        };
	      };
	    }, {"./util.js": 35}],
	    28: [function(_dereq_, module, exports) {
	      "use strict";
	      var schedule;
	      var _MutationObserver;
	      if (typeof process === "object" && typeof process.version === "string") {
	        schedule = function Promise$_Scheduler(fn) {
	          process.nextTick(fn);
	        };
	      } else if ((typeof MutationObserver !== "undefined" && (_MutationObserver = MutationObserver)) || (typeof WebKitMutationObserver !== "undefined" && (_MutationObserver = WebKitMutationObserver))) {
	        schedule = (function() {
	          var div = document.createElement("div");
	          var queuedFn = void 0;
	          var observer = new _MutationObserver(function Promise$_Scheduler() {
	            var fn = queuedFn;
	            queuedFn = void 0;
	            fn();
	          });
	          observer.observe(div, {attributes: true});
	          return function Promise$_Scheduler(fn) {
	            queuedFn = fn;
	            div.classList.toggle("foo");
	          };
	        })();
	      } else if (typeof setTimeout !== "undefined") {
	        schedule = function Promise$_Scheduler(fn) {
	          setTimeout(fn, 0);
	        };
	      } else
	        throw new Error("no async scheduler available");
	      module.exports = schedule;
	    }, {}],
	    29: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray) {
	        var PromiseInspection = Promise.PromiseInspection;
	        var util = _dereq_("./util.js");
	        function SettledPromiseArray(values) {
	          this.constructor$(values);
	        }
	        util.inherits(SettledPromiseArray, PromiseArray);
	        SettledPromiseArray.prototype._promiseResolved = function SettledPromiseArray$_promiseResolved(index, inspection) {
	          this._values[index] = inspection;
	          var totalResolved = ++this._totalResolved;
	          if (totalResolved >= this._length) {
	            this._resolve(this._values);
	          }
	        };
	        SettledPromiseArray.prototype._promiseFulfilled = function SettledPromiseArray$_promiseFulfilled(value, index) {
	          if (this._isResolved())
	            return;
	          var ret = new PromiseInspection();
	          ret._bitField = 268435456;
	          ret._settledValue = value;
	          this._promiseResolved(index, ret);
	        };
	        SettledPromiseArray.prototype._promiseRejected = function SettledPromiseArray$_promiseRejected(reason, index) {
	          if (this._isResolved())
	            return;
	          var ret = new PromiseInspection();
	          ret._bitField = 134217728;
	          ret._settledValue = reason;
	          this._promiseResolved(index, ret);
	        };
	        Promise.settle = function Promise$Settle(promises) {
	          return new SettledPromiseArray(promises).promise();
	        };
	        Promise.prototype.settle = function Promise$settle() {
	          return new SettledPromiseArray(this).promise();
	        };
	      };
	    }, {"./util.js": 35}],
	    30: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, PromiseArray, apiRejection) {
	        var util = _dereq_("./util.js");
	        var RangeError = _dereq_("./errors.js").RangeError;
	        var AggregateError = _dereq_("./errors.js").AggregateError;
	        var isArray = util.isArray;
	        function SomePromiseArray(values) {
	          this.constructor$(values);
	          this._howMany = 0;
	          this._unwrap = false;
	          this._initialized = false;
	        }
	        util.inherits(SomePromiseArray, PromiseArray);
	        SomePromiseArray.prototype._init = function SomePromiseArray$_init() {
	          if (!this._initialized) {
	            return;
	          }
	          if (this._howMany === 0) {
	            this._resolve([]);
	            return;
	          }
	          this._init$(void 0, -5);
	          var isArrayResolved = isArray(this._values);
	          if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
	            this._reject(this._getRangeError(this.length()));
	          }
	        };
	        SomePromiseArray.prototype.init = function SomePromiseArray$init() {
	          this._initialized = true;
	          this._init();
	        };
	        SomePromiseArray.prototype.setUnwrap = function SomePromiseArray$setUnwrap() {
	          this._unwrap = true;
	        };
	        SomePromiseArray.prototype.howMany = function SomePromiseArray$howMany() {
	          return this._howMany;
	        };
	        SomePromiseArray.prototype.setHowMany = function SomePromiseArray$setHowMany(count) {
	          if (this._isResolved())
	            return;
	          this._howMany = count;
	        };
	        SomePromiseArray.prototype._promiseFulfilled = function SomePromiseArray$_promiseFulfilled(value) {
	          if (this._isResolved())
	            return;
	          this._addFulfilled(value);
	          if (this._fulfilled() === this.howMany()) {
	            this._values.length = this.howMany();
	            if (this.howMany() === 1 && this._unwrap) {
	              this._resolve(this._values[0]);
	            } else {
	              this._resolve(this._values);
	            }
	          }
	        };
	        SomePromiseArray.prototype._promiseRejected = function SomePromiseArray$_promiseRejected(reason) {
	          if (this._isResolved())
	            return;
	          this._addRejected(reason);
	          if (this.howMany() > this._canPossiblyFulfill()) {
	            var e = new AggregateError();
	            for (var i = this.length(); i < this._values.length; ++i) {
	              e.push(this._values[i]);
	            }
	            this._reject(e);
	          }
	        };
	        SomePromiseArray.prototype._fulfilled = function SomePromiseArray$_fulfilled() {
	          return this._totalResolved;
	        };
	        SomePromiseArray.prototype._rejected = function SomePromiseArray$_rejected() {
	          return this._values.length - this.length();
	        };
	        SomePromiseArray.prototype._addRejected = function SomePromiseArray$_addRejected(reason) {
	          this._values.push(reason);
	        };
	        SomePromiseArray.prototype._addFulfilled = function SomePromiseArray$_addFulfilled(value) {
	          this._values[this._totalResolved++] = value;
	        };
	        SomePromiseArray.prototype._canPossiblyFulfill = function SomePromiseArray$_canPossiblyFulfill() {
	          return this.length() - this._rejected();
	        };
	        SomePromiseArray.prototype._getRangeError = function SomePromiseArray$_getRangeError(count) {
	          var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
	          return new RangeError(message);
	        };
	        SomePromiseArray.prototype._resolveEmptyArray = function SomePromiseArray$_resolveEmptyArray() {
	          this._reject(this._getRangeError(0));
	        };
	        function Promise$_Some(promises, howMany) {
	          if ((howMany | 0) !== howMany || howMany < 0) {
	            return apiRejection("expecting a positive integer");
	          }
	          var ret = new SomePromiseArray(promises);
	          var promise = ret.promise();
	          if (promise.isRejected()) {
	            return promise;
	          }
	          ret.setHowMany(howMany);
	          ret.init();
	          return promise;
	        }
	        Promise.some = function Promise$Some(promises, howMany) {
	          return Promise$_Some(promises, howMany);
	        };
	        Promise.prototype.some = function Promise$some(howMany) {
	          return Promise$_Some(this, howMany);
	        };
	        Promise._SomePromiseArray = SomePromiseArray;
	      };
	    }, {
	      "./errors.js": 10,
	      "./util.js": 35
	    }],
	    31: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise) {
	        function PromiseInspection(promise) {
	          if (promise !== void 0) {
	            this._bitField = promise._bitField;
	            this._settledValue = promise.isResolved() ? promise._settledValue : void 0;
	          } else {
	            this._bitField = 0;
	            this._settledValue = void 0;
	          }
	        }
	        PromiseInspection.prototype.isFulfilled = Promise.prototype.isFulfilled = function Promise$isFulfilled() {
	          return (this._bitField & 268435456) > 0;
	        };
	        PromiseInspection.prototype.isRejected = Promise.prototype.isRejected = function Promise$isRejected() {
	          return (this._bitField & 134217728) > 0;
	        };
	        PromiseInspection.prototype.isPending = Promise.prototype.isPending = function Promise$isPending() {
	          return (this._bitField & 402653184) === 0;
	        };
	        PromiseInspection.prototype.value = Promise.prototype.value = function Promise$value() {
	          if (!this.isFulfilled()) {
	            throw new TypeError("cannot get fulfillment value of a non-fulfilled promise");
	          }
	          return this._settledValue;
	        };
	        PromiseInspection.prototype.error = PromiseInspection.prototype.reason = Promise.prototype.reason = function Promise$reason() {
	          if (!this.isRejected()) {
	            throw new TypeError("cannot get rejection reason of a non-rejected promise");
	          }
	          return this._settledValue;
	        };
	        PromiseInspection.prototype.isResolved = Promise.prototype.isResolved = function Promise$isResolved() {
	          return (this._bitField & 402653184) > 0;
	        };
	        Promise.PromiseInspection = PromiseInspection;
	      };
	    }, {}],
	    32: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, INTERNAL) {
	        var util = _dereq_("./util.js");
	        var canAttach = _dereq_("./errors.js").canAttach;
	        var errorObj = util.errorObj;
	        var isObject = util.isObject;
	        function getThen(obj) {
	          try {
	            return obj.then;
	          } catch (e) {
	            errorObj.e = e;
	            return errorObj;
	          }
	        }
	        function Promise$_Cast(obj, originalPromise) {
	          if (isObject(obj)) {
	            if (obj instanceof Promise) {
	              return obj;
	            } else if (isAnyBluebirdPromise(obj)) {
	              var ret = new Promise(INTERNAL);
	              ret._setTrace(void 0);
	              obj._then(ret._fulfillUnchecked, ret._rejectUncheckedCheckError, ret._progressUnchecked, ret, null);
	              ret._setFollowing();
	              return ret;
	            }
	            var then = getThen(obj);
	            if (then === errorObj) {
	              if (originalPromise !== void 0 && canAttach(then.e)) {
	                originalPromise._attachExtraTrace(then.e);
	              }
	              return Promise.reject(then.e);
	            } else if (typeof then === "function") {
	              return Promise$_doThenable(obj, then, originalPromise);
	            }
	          }
	          return obj;
	        }
	        var hasProp = {}.hasOwnProperty;
	        function isAnyBluebirdPromise(obj) {
	          return hasProp.call(obj, "_promise0");
	        }
	        function Promise$_doThenable(x, then, originalPromise) {
	          var resolver = Promise.defer();
	          var called = false;
	          try {
	            then.call(x, Promise$_resolveFromThenable, Promise$_rejectFromThenable, Promise$_progressFromThenable);
	          } catch (e) {
	            if (!called) {
	              called = true;
	              var trace = canAttach(e) ? e : new Error(e + "");
	              if (originalPromise !== void 0) {
	                originalPromise._attachExtraTrace(trace);
	              }
	              resolver.promise._reject(e, trace);
	            }
	          }
	          return resolver.promise;
	          function Promise$_resolveFromThenable(y) {
	            if (called)
	              return;
	            called = true;
	            if (x === y) {
	              var e = Promise._makeSelfResolutionError();
	              if (originalPromise !== void 0) {
	                originalPromise._attachExtraTrace(e);
	              }
	              resolver.promise._reject(e, void 0);
	              return;
	            }
	            resolver.resolve(y);
	          }
	          function Promise$_rejectFromThenable(r) {
	            if (called)
	              return;
	            called = true;
	            var trace = canAttach(r) ? r : new Error(r + "");
	            if (originalPromise !== void 0) {
	              originalPromise._attachExtraTrace(trace);
	            }
	            resolver.promise._reject(r, trace);
	          }
	          function Promise$_progressFromThenable(v) {
	            if (called)
	              return;
	            var promise = resolver.promise;
	            if (typeof promise._progress === "function") {
	              promise._progress(v);
	            }
	          }
	        }
	        return Promise$_Cast;
	      };
	    }, {
	      "./errors.js": 10,
	      "./util.js": 35
	    }],
	    33: [function(_dereq_, module, exports) {
	      "use strict";
	      var _setTimeout = function(fn, ms) {
	        var len = arguments.length;
	        var arg0 = arguments[2];
	        var arg1 = arguments[3];
	        var arg2 = len >= 5 ? arguments[4] : void 0;
	        return setTimeout(function() {
	          fn(arg0, arg1, arg2);
	        }, ms | 0);
	      };
	      module.exports = function(Promise, INTERNAL, cast) {
	        var util = _dereq_("./util.js");
	        var errors = _dereq_("./errors.js");
	        var apiRejection = _dereq_("./errors_api_rejection")(Promise);
	        var TimeoutError = Promise.TimeoutError;
	        var afterTimeout = function Promise$_afterTimeout(promise, message, ms) {
	          if (!promise.isPending())
	            return;
	          if (typeof message !== "string") {
	            message = "operation timed out after" + " " + ms + " ms";
	          }
	          var err = new TimeoutError(message);
	          errors.markAsOriginatingFromRejection(err);
	          promise._attachExtraTrace(err);
	          promise._cancel(err);
	        };
	        var afterDelay = function Promise$_afterDelay(value, promise) {
	          promise._fulfill(value);
	        };
	        var delay = Promise.delay = function Promise$Delay(value, ms) {
	          if (ms === void 0) {
	            ms = value;
	            value = void 0;
	          }
	          ms = +ms;
	          var maybePromise = cast(value, void 0);
	          var promise = new Promise(INTERNAL);
	          if (maybePromise instanceof Promise) {
	            promise._propagateFrom(maybePromise, 7);
	            promise._follow(maybePromise);
	            return promise.then(function(value) {
	              return Promise.delay(value, ms);
	            });
	          } else {
	            promise._setTrace(void 0);
	            _setTimeout(afterDelay, ms, value, promise);
	          }
	          return promise;
	        };
	        Promise.prototype.delay = function Promise$delay(ms) {
	          return delay(this, ms);
	        };
	        function successClear(value) {
	          var handle = this;
	          if (handle instanceof Number)
	            handle = +handle;
	          clearTimeout(handle);
	          return value;
	        }
	        function failureClear(reason) {
	          var handle = this;
	          if (handle instanceof Number)
	            handle = +handle;
	          clearTimeout(handle);
	          throw reason;
	        }
	        Promise.prototype.timeout = function Promise$timeout(ms, message) {
	          ms = +ms;
	          var ret = new Promise(INTERNAL);
	          ret._propagateFrom(this, 7);
	          ret._follow(this);
	          var handle = _setTimeout(afterTimeout, ms, ret, message, ms);
	          return ret.cancellable()._then(successClear, failureClear, void 0, handle, void 0);
	        };
	      };
	    }, {
	      "./errors.js": 10,
	      "./errors_api_rejection": 11,
	      "./util.js": 35
	    }],
	    34: [function(_dereq_, module, exports) {
	      "use strict";
	      module.exports = function(Promise, apiRejection, cast) {
	        var TypeError = _dereq_("./errors.js").TypeError;
	        var inherits = _dereq_("./util.js").inherits;
	        var PromiseInspection = Promise.PromiseInspection;
	        function inspectionMapper(inspections) {
	          var len = inspections.length;
	          for (var i = 0; i < len; ++i) {
	            var inspection = inspections[i];
	            if (inspection.isRejected()) {
	              return Promise.reject(inspection.error());
	            }
	            inspections[i] = inspection.value();
	          }
	          return inspections;
	        }
	        function thrower(e) {
	          setTimeout(function() {
	            throw e;
	          }, 0);
	        }
	        function castPreservingDisposable(thenable) {
	          var maybePromise = cast(thenable, void 0);
	          if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	          }
	          return maybePromise;
	        }
	        function dispose(resources, inspection) {
	          var i = 0;
	          var len = resources.length;
	          var ret = Promise.defer();
	          function iterator() {
	            if (i >= len)
	              return ret.resolve();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
	              try {
	                maybePromise = cast(maybePromise._getDisposer().tryDispose(inspection), void 0);
	              } catch (e) {
	                return thrower(e);
	              }
	              if (maybePromise instanceof Promise) {
	                return maybePromise._then(iterator, thrower, null, null, null);
	              }
	            }
	            iterator();
	          }
	          iterator();
	          return ret.promise;
	        }
	        function disposerSuccess(value) {
	          var inspection = new PromiseInspection();
	          inspection._settledValue = value;
	          inspection._bitField = 268435456;
	          return dispose(this, inspection).thenReturn(value);
	        }
	        function disposerFail(reason) {
	          var inspection = new PromiseInspection();
	          inspection._settledValue = reason;
	          inspection._bitField = 134217728;
	          return dispose(this, inspection).thenThrow(reason);
	        }
	        function Disposer(data, promise) {
	          this._data = data;
	          this._promise = promise;
	        }
	        Disposer.prototype.data = function Disposer$data() {
	          return this._data;
	        };
	        Disposer.prototype.promise = function Disposer$promise() {
	          return this._promise;
	        };
	        Disposer.prototype.resource = function Disposer$resource() {
	          if (this.promise().isFulfilled()) {
	            return this.promise().value();
	          }
	          return null;
	        };
	        Disposer.prototype.tryDispose = function(inspection) {
	          var resource = this.resource();
	          var ret = resource !== null ? this.doDispose(resource, inspection) : null;
	          this._promise._unsetDisposable();
	          this._data = this._promise = null;
	          return ret;
	        };
	        Disposer.isDisposer = function Disposer$isDisposer(d) {
	          return (d != null && typeof d.resource === "function" && typeof d.tryDispose === "function");
	        };
	        function FunctionDisposer(fn, promise) {
	          this.constructor$(fn, promise);
	        }
	        inherits(FunctionDisposer, Disposer);
	        FunctionDisposer.prototype.doDispose = function(resource, inspection) {
	          var fn = this.data();
	          return fn.call(resource, resource, inspection);
	        };
	        Promise.using = function Promise$using() {
	          var len = arguments.length;
	          if (len < 2)
	            return apiRejection("you must pass at least 2 arguments to Promise.using");
	          var fn = arguments[len - 1];
	          if (typeof fn !== "function")
	            return apiRejection("fn must be a function");
	          len--;
	          var resources = new Array(len);
	          for (var i = 0; i < len; ++i) {
	            var resource = arguments[i];
	            if (Disposer.isDisposer(resource)) {
	              var disposer = resource;
	              resource = resource.promise();
	              resource._setDisposable(disposer);
	            }
	            resources[i] = resource;
	          }
	          return Promise.settle(resources).then(inspectionMapper).spread(fn)._then(disposerSuccess, disposerFail, void 0, resources, void 0);
	        };
	        Promise.prototype._setDisposable = function Promise$_setDisposable(disposer) {
	          this._bitField = this._bitField | 262144;
	          this._disposer = disposer;
	        };
	        Promise.prototype._isDisposable = function Promise$_isDisposable() {
	          return (this._bitField & 262144) > 0;
	        };
	        Promise.prototype._getDisposer = function Promise$_getDisposer() {
	          return this._disposer;
	        };
	        Promise.prototype._unsetDisposable = function Promise$_unsetDisposable() {
	          this._bitField = this._bitField & (~262144);
	          this._disposer = void 0;
	        };
	        Promise.prototype.disposer = function Promise$disposer(fn) {
	          if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this);
	          }
	          throw new TypeError();
	        };
	      };
	    }, {
	      "./errors.js": 10,
	      "./util.js": 35
	    }],
	    35: [function(_dereq_, module, exports) {
	      "use strict";
	      var es5 = _dereq_("./es5.js");
	      var haveGetters = (function() {
	        try {
	          var o = {};
	          es5.defineProperty(o, "f", {get: function() {
	              return 3;
	            }});
	          return o.f === 3;
	        } catch (e) {
	          return false;
	        }
	      })();
	      var canEvaluate = typeof navigator == "undefined";
	      var errorObj = {e: {}};
	      function tryCatch1(fn, receiver, arg) {
	        try {
	          return fn.call(receiver, arg);
	        } catch (e) {
	          errorObj.e = e;
	          return errorObj;
	        }
	      }
	      function tryCatch2(fn, receiver, arg, arg2) {
	        try {
	          return fn.call(receiver, arg, arg2);
	        } catch (e) {
	          errorObj.e = e;
	          return errorObj;
	        }
	      }
	      function tryCatch3(fn, receiver, arg, arg2, arg3) {
	        try {
	          return fn.call(receiver, arg, arg2, arg3);
	        } catch (e) {
	          errorObj.e = e;
	          return errorObj;
	        }
	      }
	      function tryCatch4(fn, receiver, arg, arg2, arg3, arg4) {
	        try {
	          return fn.call(receiver, arg, arg2, arg3, arg4);
	        } catch (e) {
	          errorObj.e = e;
	          return errorObj;
	        }
	      }
	      function tryCatchApply(fn, args, receiver) {
	        try {
	          return fn.apply(receiver, args);
	        } catch (e) {
	          errorObj.e = e;
	          return errorObj;
	        }
	      }
	      var inherits = function(Child, Parent) {
	        var hasProp = {}.hasOwnProperty;
	        function T() {
	          this.constructor = Child;
	          this.constructor$ = Parent;
	          for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
	              this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	          }
	        }
	        T.prototype = Parent.prototype;
	        Child.prototype = new T();
	        return Child.prototype;
	      };
	      function asString(val) {
	        return typeof val === "string" ? val : ("" + val);
	      }
	      function isPrimitive(val) {
	        return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
	      }
	      function isObject(value) {
	        return !isPrimitive(value);
	      }
	      function maybeWrapAsError(maybeError) {
	        if (!isPrimitive(maybeError))
	          return maybeError;
	        return new Error(asString(maybeError));
	      }
	      function withAppended(target, appendee) {
	        var len = target.length;
	        var ret = new Array(len + 1);
	        var i;
	        for (i = 0; i < len; ++i) {
	          ret[i] = target[i];
	        }
	        ret[i] = appendee;
	        return ret;
	      }
	      function getDataPropertyOrDefault(obj, key, defaultValue) {
	        if (es5.isES5) {
	          var desc = Object.getOwnPropertyDescriptor(obj, key);
	          if (desc != null) {
	            return desc.get == null && desc.set == null ? desc.value : defaultValue;
	          }
	        } else {
	          return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
	        }
	      }
	      function notEnumerableProp(obj, name, value) {
	        if (isPrimitive(obj))
	          return obj;
	        var descriptor = {
	          value: value,
	          configurable: true,
	          enumerable: false,
	          writable: true
	        };
	        es5.defineProperty(obj, name, descriptor);
	        return obj;
	      }
	      var wrapsPrimitiveReceiver = (function() {
	        return this !== "string";
	      }).call("string");
	      function thrower(r) {
	        throw r;
	      }
	      var inheritedDataKeys = (function() {
	        if (es5.isES5) {
	          return function(obj, opts) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            var getKeys = Object(opts).includeHidden ? Object.getOwnPropertyNames : Object.keys;
	            while (obj != null) {
	              var keys;
	              try {
	                keys = getKeys(obj);
	              } catch (e) {
	                return ret;
	              }
	              for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (visitedKeys[key])
	                  continue;
	                visitedKeys[key] = true;
	                var desc = Object.getOwnPropertyDescriptor(obj, key);
	                if (desc != null && desc.get == null && desc.set == null) {
	                  ret.push(key);
	                }
	              }
	              obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	          };
	        } else {
	          return function(obj) {
	            var ret = [];
	            for (var key in obj) {
	              ret.push(key);
	            }
	            return ret;
	          };
	        }
	      })();
	      function isClass(fn) {
	        try {
	          if (typeof fn === "function") {
	            var keys = es5.keys(fn.prototype);
	            return keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
	          }
	          return false;
	        } catch (e) {
	          return false;
	        }
	      }
	      function toFastProperties(obj) {
	        function f() {}
	        f.prototype = obj;
	        return f;
	        eval(obj);
	      }
	      var rident = /^[a-z$_][a-z$_0-9]*$/i;
	      function isIdentifier(str) {
	        return rident.test(str);
	      }
	      function filledRange(count, prefix, suffix) {
	        var ret = new Array(count);
	        for (var i = 0; i < count; ++i) {
	          ret[i] = prefix + i + suffix;
	        }
	        return ret;
	      }
	      var ret = {
	        isClass: isClass,
	        isIdentifier: isIdentifier,
	        inheritedDataKeys: inheritedDataKeys,
	        getDataPropertyOrDefault: getDataPropertyOrDefault,
	        thrower: thrower,
	        isArray: es5.isArray,
	        haveGetters: haveGetters,
	        notEnumerableProp: notEnumerableProp,
	        isPrimitive: isPrimitive,
	        isObject: isObject,
	        canEvaluate: canEvaluate,
	        errorObj: errorObj,
	        tryCatch1: tryCatch1,
	        tryCatch2: tryCatch2,
	        tryCatch3: tryCatch3,
	        tryCatch4: tryCatch4,
	        tryCatchApply: tryCatchApply,
	        inherits: inherits,
	        withAppended: withAppended,
	        asString: asString,
	        maybeWrapAsError: maybeWrapAsError,
	        wrapsPrimitiveReceiver: wrapsPrimitiveReceiver,
	        toFastProperties: toFastProperties,
	        filledRange: filledRange
	      };
	      module.exports = ret;
	    }, {"./es5.js": 12}]
	  }, {}, [3])(3);
	});
	;
	if (typeof window !== 'undefined' && window !== null) {
	  window.P = window.Promise;
	} else if (typeof self !== 'undefined' && self !== null) {
	  self.P = self.Promise;
	}

	//# sourceMappingURL=<compileOutput>
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(27)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/example2/example2.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/example2/example2.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(41)();
	exports.push([module.id, "html,body{position:absolute;width:100%;height:100%;margin:0;padding:0;}body{position:absolute;overflow:hidden;}#circuitboard{position:absolute;top:20px;left:20px;right:20px;bottom:20px;z-index:1;}#three-d-canvas{position:absolute;top:0;left:0;right:0;bottom:0;margin:0;padding:0;z-index:0;}.tile{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;text-align:center;overflow:hidden;border:solid 1px;}.tile>header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-weight:bold;border-width:1px;}.tile.open>header{height:26px;border-style:none none solid none;line-height:26px;font-size:20.8px;white-space:nowrap;overflow:hidden;}.tile:not(.open)>header{border-style:none;}.tile:not(.active){border-style:dotted !important;}.tile>section{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}.tile:not(.open)>section{display:none;}", ""]);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(27)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-core.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-core.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(41)();
	exports.push([module.id, ".circuitboard{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;padding:0;}.circuitboard .tilemap{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.circuitboard .tilemap>.tilerow{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin:0;padding:0;height:0;}.circuitboard .tilemap>.tilerow>.tile{width:0;margin:0;padding:0;}.circuitboard .tilemap>.tilerow>.tile:last-child{margin-right:0 !important;}.circuitboard .tilemap>.tilerow:last-child{margin-bottom:0 !important;}", ""]);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(27)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-skin.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-skin.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(41)();
	exports.push([module.id, ".skinned-tile{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.skinned-tile>header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-weight:bold;border-width:1px;overflow:hidden;}.skinned-tile.open>header{height:26px;border-style:none none solid none;line-height:26px;font-size:19.5px !important;white-space:nowrap;}.skinned-tile:not(.open)>header{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding:0 5px;}.skinned-tile>section{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}.skinned-tile.open>section{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;opacity:1;}.skinned-tile:not(.open)>section{opacity:0;}", ""]);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(27)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-grow-when-open.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-grow-when-open.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(41)();
	exports.push([module.id, ".tilemap .tile,.tilemap .tilerow{-webkit-transition-property:-webkit-box-flex;-webkit-transition-property:-webkit-flex-grow;transition-property:-webkit-box-flex;transition-property:-ms-flex-positive;transition-property:flex-grow;-webkit-transition-duration:0.3s;transition-duration:0.3s;}.tilemap .tile>section{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:0.3s;transition-duration:0.3s;}", ""]);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(27)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-skin-grow-when-open.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-tile-skin-grow-when-open.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(41)();
	exports.push([module.id, ".tilemap .tile>section{opacity:0;visibility:hidden;}", ""]);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(30), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, ArtefactP) {
	  'use strict';
	  function newWidgetType(typeName) {
	    var optionDefaults = arguments[1] !== (void 0) ? arguments[1] : {};
	    var WidgetP = ArtefactP.then((function(Artefact) {
	      return Artefact.newSubclass(typeName, function($__1) {
	        var cssClass = $__1.cssClass;
	        var $__0 = this;
	        if (U.isDefined(cssClass)) {
	          this.element.addClass(cssClass);
	        }
	        this.element.asEventStream('remove').onValue((function() {
	          $__0.destroy();
	        }));
	      }, {
	        get model() {
	          return this.options.model;
	        },
	        get element() {
	          return this.options.element;
	        }
	      }, U.extend({beforeConstruction: P.resolve()}, optionDefaults));
	    }));
	    var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
	    $.fn[lowercaseName] = function(options) {
	      var $__0 = this;
	      if (options === 'instance') {
	        return this.data(("-amy-" + lowercaseName));
	      }
	      this.data(("-amy-" + lowercaseName), WidgetP.then((function(Widget) {
	        return new Widget(U.extend(options, {element: $__0})).constructed;
	      })));
	      return this;
	    };
	    return WidgetP;
	  }
	  return newWidgetType;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(28), __webpack_require__(30), __webpack_require__(39), __webpack_require__(31), __webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, newWidgetType, U, SignalHandler, defer, dm) {
	  'use strict';
	  if (!window._amyPlugin) {
	    window._amyPlugin = function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        U.assert(!_selectedDeferred.done, "ApiNATOMY plugins can only be selected once, after which they are fixed.");
	        _selectedDeferred.done = true;
	        dm.select.apply(dm, pluginOrSelection);
	        _selectedDeferred.resolve(this);
	        return window._amyPlugin.selected;
	      }
	    };
	    var _selectedDeferred = defer();
	    window._amyPlugin.selected = _selectedDeferred.promise;
	    window._amyPlugin.graph = (function() {
	      return dm.graph();
	    });
	    window._amyPlugin.dm = dm;
	  }
	  return window._amyPlugin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  var U = {
	    newClass: function(constructor) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      constructor.prototype = prototype;
	      constructor.prototype.constructor = constructor;
	      return constructor;
	    },
	    newSubclass: function(superClass, constructorMaker) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var constructor = constructorMaker(superClass.prototype.constructor);
	      constructor.prototype = Object.create(superClass.prototype);
	      U.extend(constructor.prototype, prototype);
	      constructor.prototype.constructor = constructor;
	      return constructor;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__1 = 1; $__1 < arguments.length; $__1++)
	        rest[$__1 - 1] = arguments[$__1];
	      rest.forEach((function(obj) {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
	          }
	        }
	      }));
	      return obj1;
	    },
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    call: function(fn) {
	      for (var args = [],
	          $__2 = 1; $__2 < arguments.length; $__2++)
	        args[$__2 - 1] = arguments[$__2];
	      return fn.apply(undefined, args);
	    },
	    id: function(v) {
	      return v;
	    },
	    getDef: function(obj, name, value) {
	      if (U.isUndefined(obj[name])) {
	        if (typeof value === 'function') {
	          value = value();
	        }
	        obj[name] = value;
	      }
	      return obj[name];
	    },
	    object: function(obj, name) {
	      return U.getDef(obj, name, {});
	    },
	    array: function(obj, name) {
	      return U.getDef(obj, name, []);
	    },
	    pull: function(arr, val) {
	      var i = arr.indexOf(val);
	      if (i !== -1) {
	        arr.splice(i);
	      }
	    },
	    makeEmpty: function(arr) {
	      while (arr.length > 0) {
	        arr.pop();
	      }
	    },
	    bindA: function(fn, ctx, args) {
	      return fn.bind.apply(fn, [ctx].concat(args));
	    },
	    bind: function(obj, m) {
	      for (var args = [],
	          $__3 = 2; $__3 < arguments.length; $__3++)
	        args[$__3 - 2] = arguments[$__3];
	      return U.bindA(obj[m], obj, args);
	    },
	    applyConstructor: function(ConstructorFn, args) {
	      var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
	      return new NewConstructorFn();
	    },
	    assert: function(condition, message) {
	      if (!condition) {
	        throw new Error(message || "Assertion failed");
	      }
	    },
	    isUndefined: function(val) {
	      return typeof val === 'undefined';
	    },
	    isDefined: function(val) {
	      return typeof val !== 'undefined';
	    },
	    isPlainObject: function(val) {
	      return typeof val === 'object' && val.constructor === Object;
	    },
	    isFunction: function(val) {
	      return typeof val === 'function';
	    },
	    objValues: function(obj) {
	      return Object.keys(obj).map((function(key) {
	        return obj[key];
	      }));
	    },
	    makePositioned: function(element) {
	      if (element.css('position') === 'static') {
	        element.css('position', 'relative');
	      }
	    },
	    defOr: function() {
	      for (var values = [],
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        values[$__4] = arguments[$__4];
	      for (var i = 0; i < values.length; i += 1) {
	        if (U.isDefined(values[i])) {
	          return values[i];
	        }
	      }
	    },
	    debounce: function(func, wait, context) {
	      var timeout;
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var $__0 = this;
	        var laterFn = (function() {
	          timeout = null;
	          func.apply(context || $__0, args);
	        });
	        clearTimeout(timeout);
	        timeout = setTimeout(laterFn, wait);
	      };
	    },
	    oncePerStack: function(func, context) {
	      var notRunYet = true;
	      var result = function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context || this, args);
	        }
	      };
	      result.allowAdditionalCall = (function() {
	        notRunYet = true;
	      });
	      return result;
	    },
	    cached: function($__6) {
	      var $__7 = $__6,
	          retrieve = $__7.retrieve,
	          isEqual = $__7.isEqual;
	      isEqual = isEqual || ((function(a, b) {
	        return (a === b);
	      }));
	      var cache;
	      function retrieveValue() {
	        var newValue = retrieve();
	        var oldValue = cache;
	        if (!isEqual(newValue, oldValue)) {
	          cache = newValue;
	          onChange.forEach((function(fn) {
	            return fn(newValue, oldValue);
	          }));
	        }
	      }
	      var oncePerStackSetValue = U.oncePerStack(retrieveValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange = [];
	      resultFn.onChange = (function(cb) {
	        onChange.push(cb);
	        return resultFn;
	      });
	      resultFn.allowAdditionalCall = (function() {
	        oncePerStackSetValue.allowAdditionalCall();
	      });
	      oncePerStackSetValue();
	      return resultFn;
	    },
	    promisify: function(obj, method) {
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        return new P((function(resolve, reject) {
	          try {
	            obj[method].apply(obj, args.concat(resolve));
	          } catch (error) {
	            reject(error);
	          }
	        }));
	      };
	    },
	    findIndex: function(array, pred) {
	      for (var i = 0; i < array.length; ++i) {
	        if (pred(array[i], i, array)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    memoize: function(fn) {
	      var keys = [];
	      var cache = [];
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var index = U.findIndex(keys, (function(key) {
	          return key.every((function(v, i) {
	            return v === args[i];
	          }));
	        }));
	        if (index >= 0) {
	          return cache[index];
	        }
	        var result = fn.apply(this, args);
	        keys.push(args);
	        cache.push(result);
	        return result;
	      };
	    }
	  };
	  var EPS = 0.000001;
	  var sortOfEqual = (function(a, b) {
	    return (b - EPS < a && a < b + EPS);
	  });
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.top, b.top) && sortOfEqual(a.left, b.left);
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.height, b.height) && sortOfEqual(a.width, b.width);
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  return function defer() {
	    var resolve,
	        reject;
	    var promise = new P(function() {
	      resolve = arguments[0];
	      reject = arguments[1];
	    });
	    return {
	      resolve: resolve,
	      reject: reject,
	      promise: promise
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, Bacon) {
	  'use strict';
	  function setDisplay(element, newGrow) {
	    var oldGrow = element.data('amyFlexGrowTarget');
	    element.data('amyFlexGrowTarget', newGrow);
	    if (oldGrow > 0 && newGrow === 0) {
	      element.data('amyFlexGrowPrevDisplay', element.css('display'));
	      element.css('flexGrow', 1e-5);
	      setTimeout((function() {
	        element.asEventStream('transitionend webkitTransitionEnd').merge(Bacon.later(300)).take(1).filter((function() {
	          return element.data('amyFlexGrowTarget') === 0;
	        })).onValue((function() {
	          element.css('display', 'none');
	        }));
	      }));
	    } else if (oldGrow === 0 && newGrow > 0) {
	      element.css('display', element.data('amyFlexGrowPrevDisplay'));
	      element.data('amyFlexGrowCssScheduled', true);
	      setTimeout((function() {
	        element.removeData('amyFlexGrowCssScheduled');
	        element.css('flexGrow', element.data('amyFlexGrowTarget'));
	      }));
	    } else if (!element.data('amyFlexGrowCssScheduled')) {
	      element.css('flexGrow', newGrow);
	    }
	  }
	  $.fn.amyNestedFlexGrow = function(grow) {
	    setDisplay(this, grow);
	    var growSum = 0;
	    this.parent().children().each(function() {
	      growSum += parseFloat($(this).data('amyFlexGrowTarget'));
	    });
	    setDisplay(this.parent(), growSum);
	    return this;
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(30), __webpack_require__(47), __webpack_require__(43)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(44);
	  __webpack_require__(45);
	  Bacon.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Bacon.fromBinder((function(sink) {
	      obj.on(eventName, (function(v) {
	        sink(new Bacon.Next(v));
	      }));
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Bacon.animationFrames = function animationFrames() {
	    return Bacon.fromBinder((function(sink) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          if (sink() === Bacon.noMore) {
	            subscribed = false;
	          }
	          if (subscribed) {
	            iterationFn();
	          }
	        }));
	      })();
	      return (function() {
	        subscribed = false;
	      });
	    }));
	  };
	  Bacon.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = new Bacon.Bus();
	    var addStream = ((function() {
	      var chainedStreams = 0;
	      return (function(stream) {
	        chainedStreams += 1;
	        bus.plug(stream);
	        stream.onEnd((function() {
	          chainedStreams -= 1;
	          if (chainedStreams === 0) {
	            bus.end();
	          }
	        }));
	      });
	    }))();
	    addStream(Bacon.fromBinder((function(sink) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        var $__0 = this;
	        sink(new Bacon.Next((function() {
	          return $__0;
	        })));
	      });
	      tw.onComplete((function() {
	        sink(new Bacon.End());
	      }));
	    })));
	    bus.tween = tw;
	    bus.start = (function() {
	      tw.start();
	      return bus;
	    });
	    bus.chain = (function(other) {
	      addStream(other);
	      tw.chain(other.tween);
	      return bus;
	    });
	    return bus;
	  };
	  Bacon.keyPress = function keyPress(keycode) {
	    return $(window).asEventStream('keypress').filter((function(e) {
	      return e.keyCode === keycode;
	    }));
	  };
	  Bacon.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = new Bacon.Bus();
	    var open = new Bacon.Bus();
	    var close = new Bacon.Bus();
	    pacing.filter(wantedBus.toProperty(false)).onValue(handler, (function() {
	      open.push();
	      wantedBus.push(false);
	      close.push();
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.map(true));
	      return close.startWith(true).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntil(open).reduce([], accumulator).flatMap(Bacon.fromArray);
	      }));
	    };
	  };
	  Bacon.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Bacon.EventStream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Bacon.fromBinder((function(sink) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(new Bacon.Next((function() {
	          return value;
	        })));
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          sink(oldBuffer);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Bacon.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Bacon.Observable.prototype.run = function() {
	    return this.subscribe((function() {}));
	  };
	  Bacon.EventStream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Bacon.EventStream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        stream = stream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return stream.takeUntil($(document).asEventStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asEventStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        untilStream = untilStream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return $(document).asEventStream('mouseup').take(1).takeUntil(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asEventStream('mousewheel DOMMouseScroll');
	  };
	  return Bacon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(30)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
	  'use strict';
	  function deepTransform(val, fn) {
	    if ($.isPlainObject(val) || $.isArray(val)) {
	      $.each(val, (function(key, subVal) {
	        var returned = fn(subVal);
	        if (U.isUndefined(returned)) {
	          deepTransform(subVal, fn);
	        } else {
	          val[key] = returned;
	        }
	      }));
	    }
	  }
	  var REF_PATTERN = /`([\[\.].+?)`/g;
	  return function defaults(spec, context) {
	    deepTransform(spec, (function(val) {
	      if (typeof val === 'string') {
	        var refs = (val.match(REF_PATTERN) || []).map((function(ref) {
	          var strippedRef = ref.substring(1, ref.length - 1);
	          return new Function('refs', ("return refs" + strippedRef));
	        }));
	        var expr = val.replace(REF_PATTERN, "(refs$1)");
	        var templateFn = (function(formalParams) {
	          var newFormalParams = formalParams.concat([("return " + expr)]);
	          return U.applyConstructor(Function, newFormalParams);
	        });
	        templateFn.refs = refs;
	        return templateFn;
	      }
	    }));
	    function withDefaultsAux(defSpec, obj, refs, params) {
	      var change = false;
	      Object.keys(defSpec).forEach((function(key) {
	        if (key in obj) {
	          if ($.isPlainObject(defSpec[key]) && $.isPlainObject(obj[key])) {
	            change = withDefaultsAux(defSpec[key], obj[key], refs, params) || change;
	          }
	        } else if ($.isPlainObject(defSpec[key])) {
	          obj[key] = {};
	          change = withDefaultsAux(defSpec[key], obj[key], refs, params) || change;
	        } else if ($.isFunction(defSpec[key])) {
	          if (defSpec[key].refs.every((function(ref) {
	            return !U.isUndefined(ref(refs));
	          }))) {
	            var allparams = $.extend({refs: refs}, context, params);
	            var formalParams = Object.keys(allparams);
	            var actualParams = formalParams.map((function(fpar) {
	              return allparams[fpar];
	            }));
	            var finalFn = defSpec[key](formalParams);
	            obj[key] = finalFn.apply(null, actualParams);
	          }
	        }
	      }));
	      return change;
	    }
	    return function withDefaults(obj, params) {
	      var result = (U.isUndefined(obj) ? {} : $.extend(true, {}, obj));
	      var change = true;
	      while (change) {
	        change = withDefaultsAux(spec, result, result, params || {});
	      }
	      return result;
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  $.fn.extend({amyPutCssRules: function(rules) {
	      var $__0 = this;
	      $.each(rules, (function(selector, css) {
	        var context;
	        if (selector.trim() === '&') {
	          context = $__0;
	        } else if (selector.trim().charAt(0) === '&') {
	          context = $__0.find(selector.trim().substr(1).trim());
	        } else {
	          context = $__0.find(selector);
	        }
	        context.css(css);
	      }));
	    }});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	!(module.exports = {
	  button: {
	    LEFT: 1,
	    MIDDLE: 2,
	    RIGHT: 3
	  },
	  key: {
	    BACKSPACE: 8,
	    TAB: 9,
	    ENTER: 13,
	    SHIFT: 16,
	    CTRL: 17,
	    ALT: 18,
	    PAUSE: 19,
	    CAPS_LOCK: 20,
	    ESCAPE: 27,
	    SPACE: 32,
	    PAGE_UP: 33,
	    PAGE_DOWN: 34,
	    END: 35,
	    HOME: 36,
	    LEFT_ARROW: 37,
	    UP_ARROW: 38,
	    RIGHT_ARROW: 39,
	    DOWN_ARROW: 40,
	    INSERT: 45,
	    DELETE: 46,
	    0: 48,
	    1: 49,
	    2: 50,
	    3: 51,
	    4: 52,
	    5: 53,
	    6: 54,
	    7: 55,
	    8: 56,
	    9: 57,
	    A: 65,
	    B: 66,
	    C: 67,
	    D: 68,
	    E: 69,
	    F: 70,
	    G: 71,
	    H: 72,
	    I: 73,
	    J: 74,
	    K: 75,
	    L: 76,
	    M: 77,
	    N: 78,
	    O: 79,
	    P: 80,
	    Q: 81,
	    R: 82,
	    S: 83,
	    T: 84,
	    U: 85,
	    V: 86,
	    W: 87,
	    X: 88,
	    Y: 89,
	    Z: 90,
	    LEFT_META: 91,
	    RIGHT_META: 92,
	    SELECT: 93,
	    NUMPAD_0: 96,
	    NUMPAD_1: 97,
	    NUMPAD_2: 98,
	    NUMPAD_3: 99,
	    NUMPAD_4: 100,
	    NUMPAD_5: 101,
	    NUMPAD_6: 102,
	    NUMPAD_7: 103,
	    NUMPAD_8: 104,
	    NUMPAD_9: 105,
	    MULTIPLY: 106,
	    ADD: 107,
	    SUBTRACT: 109,
	    DECIMAL: 110,
	    DIVIDE: 111,
	    F1: 112,
	    F2: 113,
	    F3: 114,
	    F4: 115,
	    F5: 116,
	    F6: 117,
	    F7: 118,
	    F8: 119,
	    F9: 120,
	    F10: 121,
	    F11: 122,
	    F12: 123,
	    NUM_LOCK: 144,
	    SCROLL_LOCK: 145,
	    SEMICOLON: 186,
	    EQUALS: 187,
	    COMMA: 188,
	    DASH: 189,
	    PERIOD: 190,
	    FORWARD_SLASH: 191,
	    GRAVE_ACCENT: 192,
	    OPEN_BRACKET: 219,
	    BACK_SLASH: 220,
	    CLOSE_BRACKET: 221,
	    SINGLE_QUOTE: 222
	  }
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
	  var Color,
	      K,
	      PITHIRD,
	      TWOPI,
	      X,
	      Y,
	      Z,
	      bezier,
	      brewer,
	      chroma,
	      clip_rgb,
	      colors,
	      cos,
	      css2rgb,
	      hex2rgb,
	      hsi2rgb,
	      hsl2rgb,
	      hsv2rgb,
	      lab2lch,
	      lab2rgb,
	      lab_xyz,
	      lch2lab,
	      lch2rgb,
	      limit,
	      luminance,
	      luminance_x,
	      rgb2hex,
	      rgb2hsi,
	      rgb2hsl,
	      rgb2hsv,
	      rgb2lab,
	      rgb2lch,
	      rgb_xyz,
	      root,
	      type,
	      unpack,
	      xyz_lab,
	      xyz_rgb,
	      _ref;
	  chroma = function(x, y, z, m) {
	    return new Color(x, y, z, m);
	  };
	  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
	    module.exports = chroma;
	  }
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return chroma;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    root = typeof exports !== "undefined" && exports !== null ? exports : this;
	    root.chroma = chroma;
	  }
	  chroma.color = function(x, y, z, m) {
	    return new Color(x, y, z, m);
	  };
	  chroma.hsl = function(h, s, l, a) {
	    return new Color(h, s, l, a, 'hsl');
	  };
	  chroma.hsv = function(h, s, v, a) {
	    return new Color(h, s, v, a, 'hsv');
	  };
	  chroma.rgb = function(r, g, b, a) {
	    return new Color(r, g, b, a, 'rgb');
	  };
	  chroma.hex = function(x) {
	    return new Color(x);
	  };
	  chroma.css = function(x) {
	    return new Color(x);
	  };
	  chroma.lab = function(l, a, b) {
	    return new Color(l, a, b, 'lab');
	  };
	  chroma.lch = function(l, c, h) {
	    return new Color(l, c, h, 'lch');
	  };
	  chroma.hsi = function(h, s, i) {
	    return new Color(h, s, i, 'hsi');
	  };
	  chroma.gl = function(r, g, b, a) {
	    return new Color(r * 255, g * 255, b * 255, a, 'gl');
	  };
	  chroma.interpolate = function(a, b, f, m) {
	    if ((a == null) || (b == null)) {
	      return '#000';
	    }
	    if (type(a) === 'string') {
	      a = new Color(a);
	    }
	    if (type(b) === 'string') {
	      b = new Color(b);
	    }
	    return a.interpolate(f, b, m);
	  };
	  chroma.mix = chroma.interpolate;
	  chroma.contrast = function(a, b) {
	    var l1,
	        l2;
	    if (type(a) === 'string') {
	      a = new Color(a);
	    }
	    if (type(b) === 'string') {
	      b = new Color(b);
	    }
	    l1 = a.luminance();
	    l2 = b.luminance();
	    if (l1 > l2) {
	      return (l1 + 0.05) / (l2 + 0.05);
	    } else {
	      return (l2 + 0.05) / (l1 + 0.05);
	    }
	  };
	  chroma.luminance = function(color) {
	    return chroma(color).luminance();
	  };
	  chroma._Color = Color;
	  Color = (function() {
	    function Color() {
	      var a,
	          arg,
	          args,
	          m,
	          me,
	          me_rgb,
	          x,
	          y,
	          z,
	          _i,
	          _len,
	          _ref,
	          _ref1,
	          _ref2,
	          _ref3;
	      me = this;
	      args = [];
	      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
	        arg = arguments[_i];
	        if (arg != null) {
	          args.push(arg);
	        }
	      }
	      if (args.length === 0) {
	        _ref = [255, 0, 255, 1, 'rgb'], x = _ref[0], y = _ref[1], z = _ref[2], a = _ref[3], m = _ref[4];
	      } else if (type(args[0]) === "array") {
	        if (args[0].length === 3) {
	          _ref1 = args[0], x = _ref1[0], y = _ref1[1], z = _ref1[2];
	          a = 1;
	        } else if (args[0].length === 4) {
	          _ref2 = args[0], x = _ref2[0], y = _ref2[1], z = _ref2[2], a = _ref2[3];
	        } else {
	          throw 'unknown input argument';
	        }
	        m = args[1];
	      } else if (type(args[0]) === "string") {
	        x = args[0];
	        m = 'hex';
	      } else if (type(args[0]) === "object") {
	        _ref3 = args[0]._rgb, x = _ref3[0], y = _ref3[1], z = _ref3[2], a = _ref3[3];
	        m = 'rgb';
	      } else if (args.length >= 3) {
	        x = args[0];
	        y = args[1];
	        z = args[2];
	      }
	      if (args.length === 3) {
	        m = 'rgb';
	        a = 1;
	      } else if (args.length === 4) {
	        if (type(args[3]) === "string") {
	          m = args[3];
	          a = 1;
	        } else if (type(args[3]) === "number") {
	          m = 'rgb';
	          a = args[3];
	        }
	      } else if (args.length === 5) {
	        a = args[3];
	        m = args[4];
	      }
	      if (a == null) {
	        a = 1;
	      }
	      if (m === 'rgb') {
	        me._rgb = [x, y, z, a];
	      } else if (m === 'gl') {
	        me._rgb = [x * 255, y * 255, z * 255, a];
	      } else if (m === 'hsl') {
	        me._rgb = hsl2rgb(x, y, z);
	        me._rgb[3] = a;
	      } else if (m === 'hsv') {
	        me._rgb = hsv2rgb(x, y, z);
	        me._rgb[3] = a;
	      } else if (m === 'hex') {
	        me._rgb = hex2rgb(x);
	      } else if (m === 'lab') {
	        me._rgb = lab2rgb(x, y, z);
	        me._rgb[3] = a;
	      } else if (m === 'lch') {
	        me._rgb = lch2rgb(x, y, z);
	        me._rgb[3] = a;
	      } else if (m === 'hsi') {
	        me._rgb = hsi2rgb(x, y, z);
	        me._rgb[3] = a;
	      }
	      me_rgb = clip_rgb(me._rgb);
	    }
	    Color.prototype.rgb = function() {
	      return this._rgb.slice(0, 3);
	    };
	    Color.prototype.rgba = function() {
	      return this._rgb;
	    };
	    Color.prototype.hex = function() {
	      return rgb2hex(this._rgb);
	    };
	    Color.prototype.toString = function() {
	      return this.name();
	    };
	    Color.prototype.hsl = function() {
	      return rgb2hsl(this._rgb);
	    };
	    Color.prototype.hsv = function() {
	      return rgb2hsv(this._rgb);
	    };
	    Color.prototype.lab = function() {
	      return rgb2lab(this._rgb);
	    };
	    Color.prototype.lch = function() {
	      return rgb2lch(this._rgb);
	    };
	    Color.prototype.hsi = function() {
	      return rgb2hsi(this._rgb);
	    };
	    Color.prototype.gl = function() {
	      return [this._rgb[0] / 255, this._rgb[1] / 255, this._rgb[2] / 255, this._rgb[3]];
	    };
	    Color.prototype.luminance = function() {
	      return luminance(this._rgb);
	    };
	    Color.prototype.name = function() {
	      var h,
	          k;
	      h = this.hex();
	      for (k in chroma.colors) {
	        if (h === chroma.colors[k]) {
	          return k;
	        }
	      }
	      return h;
	    };
	    Color.prototype.alpha = function(alpha) {
	      if (arguments.length) {
	        this._rgb[3] = alpha;
	        return this;
	      }
	      return this._rgb[3];
	    };
	    Color.prototype.css = function(mode) {
	      var hsl,
	          me,
	          rgb,
	          rnd;
	      if (mode == null) {
	        mode = 'rgb';
	      }
	      me = this;
	      rgb = me._rgb;
	      if (mode.length === 3 && rgb[3] < 1) {
	        mode += 'a';
	      }
	      if (mode === 'rgb') {
	        return mode + '(' + rgb.slice(0, 3).join(',') + ')';
	      } else if (mode === 'rgba') {
	        return mode + '(' + rgb.join(',') + ')';
	      } else if (mode === 'hsl' || mode === 'hsla') {
	        hsl = me.hsl();
	        rnd = function(a) {
	          return Math.round(a * 100) / 100;
	        };
	        hsl[0] = rnd(hsl[0]);
	        hsl[1] = rnd(hsl[1] * 100) + '%';
	        hsl[2] = rnd(hsl[2] * 100) + '%';
	        if (mode.length === 4) {
	          hsl[3] = rgb[3];
	        }
	        return mode + '(' + hsl.join(',') + ')';
	      }
	    };
	    Color.prototype.interpolate = function(f, col, m) {
	      var dh,
	          hue,
	          hue0,
	          hue1,
	          lbv,
	          lbv0,
	          lbv1,
	          me,
	          res,
	          sat,
	          sat0,
	          sat1,
	          xyz0,
	          xyz1;
	      me = this;
	      if (m == null) {
	        m = 'rgb';
	      }
	      if (type(col) === "string") {
	        col = new Color(col);
	      }
	      if (m === 'hsl' || m === 'hsv' || m === 'lch' || m === 'hsi') {
	        if (m === 'hsl') {
	          xyz0 = me.hsl();
	          xyz1 = col.hsl();
	        } else if (m === 'hsv') {
	          xyz0 = me.hsv();
	          xyz1 = col.hsv();
	        } else if (m === 'hsi') {
	          xyz0 = me.hsi();
	          xyz1 = col.hsi();
	        } else if (m === 'lch') {
	          xyz0 = me.lch();
	          xyz1 = col.lch();
	        }
	        if (m.substr(0, 1) === 'h') {
	          hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
	          hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
	        } else {
	          lbv0 = xyz0[0], sat0 = xyz0[1], hue0 = xyz0[2];
	          lbv1 = xyz1[0], sat1 = xyz1[1], hue1 = xyz1[2];
	        }
	        if (!isNaN(hue0) && !isNaN(hue1)) {
	          if (hue1 > hue0 && hue1 - hue0 > 180) {
	            dh = hue1 - (hue0 + 360);
	          } else if (hue1 < hue0 && hue0 - hue1 > 180) {
	            dh = hue1 + 360 - hue0;
	          } else {
	            dh = hue1 - hue0;
	          }
	          hue = hue0 + f * dh;
	        } else if (!isNaN(hue0)) {
	          hue = hue0;
	          if ((lbv1 === 1 || lbv1 === 0) && m !== 'hsv') {
	            sat = sat0;
	          }
	        } else if (!isNaN(hue1)) {
	          hue = hue1;
	          if ((lbv0 === 1 || lbv0 === 0) && m !== 'hsv') {
	            sat = sat1;
	          }
	        } else {
	          hue = Number.NaN;
	        }
	        if (sat == null) {
	          sat = sat0 + f * (sat1 - sat0);
	        }
	        lbv = lbv0 + f * (lbv1 - lbv0);
	        if (m.substr(0, 1) === 'h') {
	          res = new Color(hue, sat, lbv, m);
	        } else {
	          res = new Color(lbv, sat, hue, m);
	        }
	      } else if (m === 'rgb') {
	        xyz0 = me._rgb;
	        xyz1 = col._rgb;
	        res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
	      } else if (m === 'lab') {
	        xyz0 = me.lab();
	        xyz1 = col.lab();
	        res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
	      } else {
	        throw "color mode " + m + " is not supported";
	      }
	      res.alpha(me.alpha() + f * (col.alpha() - me.alpha()));
	      return res;
	    };
	    Color.prototype.premultiply = function() {
	      var a,
	          rgb;
	      rgb = this.rgb();
	      a = this.alpha();
	      return chroma(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
	    };
	    Color.prototype.darken = function(amount) {
	      var lch,
	          me;
	      if (amount == null) {
	        amount = 20;
	      }
	      me = this;
	      lch = me.lch();
	      lch[0] -= amount;
	      return chroma.lch(lch).alpha(me.alpha());
	    };
	    Color.prototype.darker = function(amount) {
	      return this.darken(amount);
	    };
	    Color.prototype.brighten = function(amount) {
	      if (amount == null) {
	        amount = 20;
	      }
	      return this.darken(-amount);
	    };
	    Color.prototype.brighter = function(amount) {
	      return this.brighten(amount);
	    };
	    Color.prototype.saturate = function(amount) {
	      var lch,
	          me;
	      if (amount == null) {
	        amount = 20;
	      }
	      me = this;
	      lch = me.lch();
	      lch[1] += amount;
	      return chroma.lch(lch).alpha(me.alpha());
	    };
	    Color.prototype.desaturate = function(amount) {
	      if (amount == null) {
	        amount = 20;
	      }
	      return this.saturate(-amount);
	    };
	    return Color;
	  })();
	  clip_rgb = function(rgb) {
	    var i;
	    for (i in rgb) {
	      if (i < 3) {
	        if (rgb[i] < 0) {
	          rgb[i] = 0;
	        }
	        if (rgb[i] > 255) {
	          rgb[i] = 255;
	        }
	      } else if (i === 3) {
	        if (rgb[i] < 0) {
	          rgb[i] = 0;
	        }
	        if (rgb[i] > 1) {
	          rgb[i] = 1;
	        }
	      }
	    }
	    return rgb;
	  };
	  css2rgb = function(css) {
	    var hsl,
	        i,
	        m,
	        rgb,
	        _i,
	        _j,
	        _k,
	        _l;
	    css = css.toLowerCase();
	    if ((chroma.colors != null) && chroma.colors[css]) {
	      return hex2rgb(chroma.colors[css]);
	    }
	    if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
	      rgb = m.slice(1, 4);
	      for (i = _i = 0; _i <= 2; i = ++_i) {
	        rgb[i] = +rgb[i];
	      }
	      rgb[3] = 1;
	    } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
	      rgb = m.slice(1, 5);
	      for (i = _j = 0; _j <= 3; i = ++_j) {
	        rgb[i] = +rgb[i];
	      }
	    } else if (m = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
	      rgb = m.slice(1, 4);
	      for (i = _k = 0; _k <= 2; i = ++_k) {
	        rgb[i] = Math.round(rgb[i] * 2.55);
	      }
	      rgb[3] = 1;
	    } else if (m = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
	      rgb = m.slice(1, 5);
	      for (i = _l = 0; _l <= 2; i = ++_l) {
	        rgb[i] = Math.round(rgb[i] * 2.55);
	      }
	      rgb[3] = +rgb[3];
	    } else if (m = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
	      hsl = m.slice(1, 4);
	      hsl[1] *= 0.01;
	      hsl[2] *= 0.01;
	      rgb = hsl2rgb(hsl);
	      rgb[3] = 1;
	    } else if (m = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
	      hsl = m.slice(1, 4);
	      hsl[1] *= 0.01;
	      hsl[2] *= 0.01;
	      rgb = hsl2rgb(hsl);
	      rgb[3] = +m[4];
	    }
	    return rgb;
	  };
	  hex2rgb = function(hex) {
	    var a,
	        b,
	        g,
	        r,
	        rgb,
	        u;
	    if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
	      if (hex.length === 4 || hex.length === 7) {
	        hex = hex.substr(1);
	      }
	      if (hex.length === 3) {
	        hex = hex.split("");
	        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	      }
	      u = parseInt(hex, 16);
	      r = u >> 16;
	      g = u >> 8 & 0xFF;
	      b = u & 0xFF;
	      return [r, g, b, 1];
	    }
	    if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
	      if (hex.length === 9) {
	        hex = hex.substr(1);
	      }
	      u = parseInt(hex, 16);
	      r = u >> 24 & 0xFF;
	      g = u >> 16 & 0xFF;
	      b = u >> 8 & 0xFF;
	      a = u & 0xFF;
	      return [r, g, b, a];
	    }
	    if (rgb = css2rgb(hex)) {
	      return rgb;
	    }
	    throw "unknown color: " + hex;
	  };
	  hsi2rgb = function(h, s, i) {
	    var b,
	        g,
	        r,
	        _ref;
	    _ref = unpack(arguments), h = _ref[0], s = _ref[1], i = _ref[2];
	    h /= 360;
	    if (h < 1 / 3) {
	      b = (1 - s) / 3;
	      r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
	      g = 1 - (b + r);
	    } else if (h < 2 / 3) {
	      h -= 1 / 3;
	      r = (1 - s) / 3;
	      g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
	      b = 1 - (r + g);
	    } else {
	      h -= 2 / 3;
	      g = (1 - s) / 3;
	      b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
	      r = 1 - (g + b);
	    }
	    r = limit(i * r * 3);
	    g = limit(i * g * 3);
	    b = limit(i * b * 3);
	    return [r * 255, g * 255, b * 255];
	  };
	  hsl2rgb = function() {
	    var b,
	        c,
	        g,
	        h,
	        i,
	        l,
	        r,
	        s,
	        t1,
	        t2,
	        t3,
	        _i,
	        _ref,
	        _ref1;
	    _ref = unpack(arguments), h = _ref[0], s = _ref[1], l = _ref[2];
	    if (s === 0) {
	      r = g = b = l * 255;
	    } else {
	      t3 = [0, 0, 0];
	      c = [0, 0, 0];
	      t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      t1 = 2 * l - t2;
	      h /= 360;
	      t3[0] = h + 1 / 3;
	      t3[1] = h;
	      t3[2] = h - 1 / 3;
	      for (i = _i = 0; _i <= 2; i = ++_i) {
	        if (t3[i] < 0) {
	          t3[i] += 1;
	        }
	        if (t3[i] > 1) {
	          t3[i] -= 1;
	        }
	        if (6 * t3[i] < 1) {
	          c[i] = t1 + (t2 - t1) * 6 * t3[i];
	        } else if (2 * t3[i] < 1) {
	          c[i] = t2;
	        } else if (3 * t3[i] < 2) {
	          c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
	        } else {
	          c[i] = t1;
	        }
	      }
	      _ref1 = [Math.round(c[0] * 255), Math.round(c[1] * 255), Math.round(c[2] * 255)], r = _ref1[0], g = _ref1[1], b = _ref1[2];
	    }
	    return [r, g, b];
	  };
	  hsv2rgb = function() {
	    var b,
	        f,
	        g,
	        h,
	        i,
	        p,
	        q,
	        r,
	        s,
	        t,
	        v,
	        _ref,
	        _ref1,
	        _ref2,
	        _ref3,
	        _ref4,
	        _ref5,
	        _ref6;
	    _ref = unpack(arguments), h = _ref[0], s = _ref[1], v = _ref[2];
	    v *= 255;
	    if (s === 0) {
	      r = g = b = v;
	    } else {
	      if (h === 360) {
	        h = 0;
	      }
	      if (h > 360) {
	        h -= 360;
	      }
	      if (h < 0) {
	        h += 360;
	      }
	      h /= 60;
	      i = Math.floor(h);
	      f = h - i;
	      p = v * (1 - s);
	      q = v * (1 - s * f);
	      t = v * (1 - s * (1 - f));
	      switch (i) {
	        case 0:
	          _ref1 = [v, t, p], r = _ref1[0], g = _ref1[1], b = _ref1[2];
	          break;
	        case 1:
	          _ref2 = [q, v, p], r = _ref2[0], g = _ref2[1], b = _ref2[2];
	          break;
	        case 2:
	          _ref3 = [p, v, t], r = _ref3[0], g = _ref3[1], b = _ref3[2];
	          break;
	        case 3:
	          _ref4 = [p, q, v], r = _ref4[0], g = _ref4[1], b = _ref4[2];
	          break;
	        case 4:
	          _ref5 = [t, p, v], r = _ref5[0], g = _ref5[1], b = _ref5[2];
	          break;
	        case 5:
	          _ref6 = [v, p, q], r = _ref6[0], g = _ref6[1], b = _ref6[2];
	      }
	    }
	    r = Math.round(r);
	    g = Math.round(g);
	    b = Math.round(b);
	    return [r, g, b];
	  };
	  K = 18;
	  X = 0.950470;
	  Y = 1;
	  Z = 1.088830;
	  lab2lch = function() {
	    var a,
	        b,
	        c,
	        h,
	        l,
	        _ref;
	    _ref = unpack(arguments), l = _ref[0], a = _ref[1], b = _ref[2];
	    c = Math.sqrt(a * a + b * b);
	    h = Math.atan2(b, a) / Math.PI * 180;
	    return [l, c, h];
	  };
	  lab2rgb = function(l, a, b) {
	    var g,
	        r,
	        x,
	        y,
	        z,
	        _ref,
	        _ref1;
	    if (l !== void 0 && l.length === 3) {
	      _ref = l, l = _ref[0], a = _ref[1], b = _ref[2];
	    }
	    if (l !== void 0 && l.length === 3) {
	      _ref1 = l, l = _ref1[0], a = _ref1[1], b = _ref1[2];
	    }
	    y = (l + 16) / 116;
	    x = y + a / 500;
	    z = y - b / 200;
	    x = lab_xyz(x) * X;
	    y = lab_xyz(y) * Y;
	    z = lab_xyz(z) * Z;
	    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
	    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
	    b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
	    return [limit(r, 0, 255), limit(g, 0, 255), limit(b, 0, 255), 1];
	  };
	  lab_xyz = function(x) {
	    if (x > 0.206893034) {
	      return x * x * x;
	    } else {
	      return (x - 4 / 29) / 7.787037;
	    }
	  };
	  xyz_rgb = function(r) {
	    return Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
	  };
	  lch2lab = function() {
	    var c,
	        h,
	        l,
	        _ref;
	    _ref = unpack(arguments), l = _ref[0], c = _ref[1], h = _ref[2];
	    h = h * Math.PI / 180;
	    return [l, Math.cos(h) * c, Math.sin(h) * c];
	  };
	  lch2rgb = function(l, c, h) {
	    var L,
	        a,
	        b,
	        g,
	        r,
	        _ref,
	        _ref1;
	    _ref = lch2lab(l, c, h), L = _ref[0], a = _ref[1], b = _ref[2];
	    _ref1 = lab2rgb(L, a, b), r = _ref1[0], g = _ref1[1], b = _ref1[2];
	    return [limit(r, 0, 255), limit(g, 0, 255), limit(b, 0, 255)];
	  };
	  luminance = function(r, g, b) {
	    var _ref;
	    _ref = unpack(arguments), r = _ref[0], g = _ref[1], b = _ref[2];
	    r = luminance_x(r);
	    g = luminance_x(g);
	    b = luminance_x(b);
	    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	  };
	  luminance_x = function(x) {
	    x /= 255;
	    if (x <= 0.03928) {
	      return x / 12.92;
	    } else {
	      return Math.pow((x + 0.055) / 1.055, 2.4);
	    }
	  };
	  rgb2hex = function() {
	    var b,
	        g,
	        r,
	        str,
	        u,
	        _ref;
	    _ref = unpack(arguments), r = _ref[0], g = _ref[1], b = _ref[2];
	    u = r << 16 | g << 8 | b;
	    str = "000000" + u.toString(16);
	    return "#" + str.substr(str.length - 6);
	  };
	  rgb2hsi = function() {
	    var TWOPI,
	        b,
	        g,
	        h,
	        i,
	        min,
	        r,
	        s,
	        _ref;
	    _ref = unpack(arguments), r = _ref[0], g = _ref[1], b = _ref[2];
	    TWOPI = Math.PI * 2;
	    r /= 255;
	    g /= 255;
	    b /= 255;
	    min = Math.min(r, g, b);
	    i = (r + g + b) / 3;
	    s = 1 - min / i;
	    if (s === 0) {
	      h = 0;
	    } else {
	      h = ((r - g) + (r - b)) / 2;
	      h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
	      h = Math.acos(h);
	      if (b > g) {
	        h = TWOPI - h;
	      }
	      h /= TWOPI;
	    }
	    return [h * 360, s, i];
	  };
	  rgb2hsl = function(r, g, b) {
	    var h,
	        l,
	        max,
	        min,
	        s,
	        _ref;
	    if (r !== void 0 && r.length >= 3) {
	      _ref = r, r = _ref[0], g = _ref[1], b = _ref[2];
	    }
	    r /= 255;
	    g /= 255;
	    b /= 255;
	    min = Math.min(r, g, b);
	    max = Math.max(r, g, b);
	    l = (max + min) / 2;
	    if (max === min) {
	      s = 0;
	      h = Number.NaN;
	    } else {
	      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
	    }
	    if (r === max) {
	      h = (g - b) / (max - min);
	    } else if (g === max) {
	      h = 2 + (b - r) / (max - min);
	    } else if (b === max) {
	      h = 4 + (r - g) / (max - min);
	    }
	    h *= 60;
	    if (h < 0) {
	      h += 360;
	    }
	    return [h, s, l];
	  };
	  rgb2hsv = function() {
	    var b,
	        delta,
	        g,
	        h,
	        max,
	        min,
	        r,
	        s,
	        v,
	        _ref;
	    _ref = unpack(arguments), r = _ref[0], g = _ref[1], b = _ref[2];
	    min = Math.min(r, g, b);
	    max = Math.max(r, g, b);
	    delta = max - min;
	    v = max / 255.0;
	    if (max === 0) {
	      h = Number.NaN;
	      s = 0;
	    } else {
	      s = delta / max;
	      if (r === max) {
	        h = (g - b) / delta;
	      }
	      if (g === max) {
	        h = 2 + (b - r) / delta;
	      }
	      if (b === max) {
	        h = 4 + (r - g) / delta;
	      }
	      h *= 60;
	      if (h < 0) {
	        h += 360;
	      }
	    }
	    return [h, s, v];
	  };
	  rgb2lab = function() {
	    var b,
	        g,
	        r,
	        x,
	        y,
	        z,
	        _ref;
	    _ref = unpack(arguments), r = _ref[0], g = _ref[1], b = _ref[2];
	    r = rgb_xyz(r);
	    g = rgb_xyz(g);
	    b = rgb_xyz(b);
	    x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / X);
	    y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / Y);
	    z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / Z);
	    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
	  };
	  rgb_xyz = function(r) {
	    if ((r /= 255) <= 0.04045) {
	      return r / 12.92;
	    } else {
	      return Math.pow((r + 0.055) / 1.055, 2.4);
	    }
	  };
	  xyz_lab = function(x) {
	    if (x > 0.008856) {
	      return Math.pow(x, 1 / 3);
	    } else {
	      return 7.787037 * x + 4 / 29;
	    }
	  };
	  rgb2lch = function() {
	    var a,
	        b,
	        g,
	        l,
	        r,
	        _ref,
	        _ref1;
	    _ref = unpack(arguments), r = _ref[0], g = _ref[1], b = _ref[2];
	    _ref1 = rgb2lab(r, g, b), l = _ref1[0], a = _ref1[1], b = _ref1[2];
	    return lab2lch(l, a, b);
	  };
	  chroma.scale = function(colors, positions) {
	    var classifyValue,
	        f,
	        getClass,
	        getColor,
	        resetCache,
	        setColors,
	        setDomain,
	        tmap,
	        _colorCache,
	        _colors,
	        _correctLightness,
	        _domain,
	        _fixed,
	        _max,
	        _min,
	        _mode,
	        _nacol,
	        _numClasses,
	        _out,
	        _pos,
	        _spread;
	    _mode = 'rgb';
	    _nacol = chroma('#ccc');
	    _spread = 0;
	    _fixed = false;
	    _domain = [0, 1];
	    _colors = [];
	    _out = false;
	    _pos = [];
	    _min = 0;
	    _max = 1;
	    _correctLightness = false;
	    _numClasses = 0;
	    _colorCache = {};
	    setColors = function(colors, positions) {
	      var c,
	          col,
	          _i,
	          _j,
	          _ref,
	          _ref1,
	          _ref2;
	      if (colors == null) {
	        colors = ['#ddd', '#222'];
	      }
	      if ((colors != null) && type(colors) === 'string' && (((_ref = chroma.brewer) != null ? _ref[colors] : void 0) != null)) {
	        colors = chroma.brewer[colors];
	      }
	      if (type(colors) === 'array') {
	        colors = colors.slice(0);
	        for (c = _i = 0, _ref1 = colors.length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; c = 0 <= _ref1 ? ++_i : --_i) {
	          col = colors[c];
	          if (type(col) === "string") {
	            colors[c] = chroma(col);
	          }
	        }
	        if (positions != null) {
	          _pos = positions;
	        } else {
	          _pos = [];
	          for (c = _j = 0, _ref2 = colors.length - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; c = 0 <= _ref2 ? ++_j : --_j) {
	            _pos.push(c / (colors.length - 1));
	          }
	        }
	      }
	      resetCache();
	      return _colors = colors;
	    };
	    setDomain = function(domain) {
	      if (domain == null) {
	        domain = [];
	      }
	      _domain = domain;
	      _min = domain[0];
	      _max = domain[domain.length - 1];
	      resetCache();
	      if (domain.length === 2) {
	        return _numClasses = 0;
	      } else {
	        return _numClasses = domain.length - 1;
	      }
	    };
	    getClass = function(value) {
	      var i,
	          n;
	      if (_domain != null) {
	        n = _domain.length - 1;
	        i = 0;
	        while (i < n && value >= _domain[i]) {
	          i++;
	        }
	        return i - 1;
	      }
	      return 0;
	    };
	    tmap = function(t) {
	      return t;
	    };
	    classifyValue = function(value) {
	      var i,
	          maxc,
	          minc,
	          n,
	          val;
	      val = value;
	      if (_domain.length > 2) {
	        n = _domain.length - 1;
	        i = getClass(value);
	        minc = _domain[0] + (_domain[1] - _domain[0]) * (0 + _spread * 0.5);
	        maxc = _domain[n - 1] + (_domain[n] - _domain[n - 1]) * (1 - _spread * 0.5);
	        val = _min + ((_domain[i] + (_domain[i + 1] - _domain[i]) * 0.5 - minc) / (maxc - minc)) * (_max - _min);
	      }
	      return val;
	    };
	    getColor = function(val, bypassMap) {
	      var c,
	          col,
	          f0,
	          i,
	          k,
	          p,
	          t,
	          _i,
	          _ref;
	      if (bypassMap == null) {
	        bypassMap = false;
	      }
	      if (isNaN(val)) {
	        return _nacol;
	      }
	      if (!bypassMap) {
	        if (_domain.length > 2) {
	          c = getClass(val);
	          t = c / (_numClasses - 1);
	        } else {
	          t = f0 = (val - _min) / (_max - _min);
	          t = Math.min(1, Math.max(0, t));
	        }
	      } else {
	        t = val;
	      }
	      if (!bypassMap) {
	        t = tmap(t);
	      }
	      k = Math.floor(t * 10000);
	      if (_colorCache[k]) {
	        col = _colorCache[k];
	      } else {
	        if (type(_colors) === 'array') {
	          for (i = _i = 0, _ref = _pos.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
	            p = _pos[i];
	            if (t <= p) {
	              col = _colors[i];
	              break;
	            }
	            if (t >= p && i === _pos.length - 1) {
	              col = _colors[i];
	              break;
	            }
	            if (t > p && t < _pos[i + 1]) {
	              t = (t - p) / (_pos[i + 1] - p);
	              col = chroma.interpolate(_colors[i], _colors[i + 1], t, _mode);
	              break;
	            }
	          }
	        } else if (type(_colors) === 'function') {
	          col = _colors(t);
	        }
	        _colorCache[k] = col;
	      }
	      return col;
	    };
	    resetCache = function() {
	      return _colorCache = {};
	    };
	    setColors(colors, positions);
	    f = function(v) {
	      var c;
	      c = getColor(v);
	      if (_out && c[_out]) {
	        return c[_out]();
	      } else {
	        return c;
	      }
	    };
	    f.domain = function(domain, classes, mode, key) {
	      var d;
	      if (mode == null) {
	        mode = 'e';
	      }
	      if (!arguments.length) {
	        return _domain;
	      }
	      if (classes != null) {
	        d = chroma.analyze(domain, key);
	        if (classes === 0) {
	          domain = [d.min, d.max];
	        } else {
	          domain = chroma.limits(d, mode, classes);
	        }
	      }
	      setDomain(domain);
	      return f;
	    };
	    f.mode = function(_m) {
	      if (!arguments.length) {
	        return _mode;
	      }
	      _mode = _m;
	      resetCache();
	      return f;
	    };
	    f.range = function(colors, _pos) {
	      setColors(colors, _pos);
	      return f;
	    };
	    f.out = function(_o) {
	      _out = _o;
	      return f;
	    };
	    f.spread = function(val) {
	      if (!arguments.length) {
	        return _spread;
	      }
	      _spread = val;
	      return f;
	    };
	    f.correctLightness = function(v) {
	      if (!arguments.length) {
	        return _correctLightness;
	      }
	      _correctLightness = v;
	      resetCache();
	      if (_correctLightness) {
	        tmap = function(t) {
	          var L0,
	              L1,
	              L_actual,
	              L_diff,
	              L_ideal,
	              max_iter,
	              pol,
	              t0,
	              t1;
	          L0 = getColor(0, true).lab()[0];
	          L1 = getColor(1, true).lab()[0];
	          pol = L0 > L1;
	          L_actual = getColor(t, true).lab()[0];
	          L_ideal = L0 + (L1 - L0) * t;
	          L_diff = L_actual - L_ideal;
	          t0 = 0;
	          t1 = 1;
	          max_iter = 20;
	          while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
	            (function() {
	              if (pol) {
	                L_diff *= -1;
	              }
	              if (L_diff < 0) {
	                t0 = t;
	                t += (t1 - t) * 0.5;
	              } else {
	                t1 = t;
	                t += (t0 - t) * 0.5;
	              }
	              L_actual = getColor(t, true).lab()[0];
	              return L_diff = L_actual - L_ideal;
	            })();
	          }
	          return t;
	        };
	      } else {
	        tmap = function(t) {
	          return t;
	        };
	      }
	      return f;
	    };
	    f.colors = function(out) {
	      var i,
	          samples,
	          _i,
	          _j,
	          _len,
	          _ref;
	      if (out == null) {
	        out = 'hex';
	      }
	      colors = [];
	      samples = [];
	      if (_domain.length > 2) {
	        for (i = _i = 1, _ref = _domain.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
	          samples.push((_domain[i - 1] + _domain[i]) * 0.5);
	        }
	      } else {
	        samples = _domain;
	      }
	      for (_j = 0, _len = samples.length; _j < _len; _j++) {
	        i = samples[_j];
	        colors.push(f(i)[out]());
	      }
	      return colors;
	    };
	    return f;
	  };
	  if ((_ref = chroma.scales) == null) {
	    chroma.scales = {};
	  }
	  chroma.scales.cool = function() {
	    return chroma.scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]);
	  };
	  chroma.scales.hot = function() {
	    return chroma.scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
	  };
	  chroma.analyze = function(data, key, filter) {
	    var add,
	        k,
	        r,
	        val,
	        visit,
	        _i,
	        _len;
	    r = {
	      min: Number.MAX_VALUE,
	      max: Number.MAX_VALUE * -1,
	      sum: 0,
	      values: [],
	      count: 0
	    };
	    if (filter == null) {
	      filter = function() {
	        return true;
	      };
	    }
	    add = function(val) {
	      if ((val != null) && !isNaN(val)) {
	        r.values.push(val);
	        r.sum += val;
	        if (val < r.min) {
	          r.min = val;
	        }
	        if (val > r.max) {
	          r.max = val;
	        }
	        r.count += 1;
	      }
	    };
	    visit = function(val, k) {
	      if (filter(val, k)) {
	        if ((key != null) && type(key) === 'function') {
	          return add(key(val));
	        } else if ((key != null) && type(key) === 'string' || type(key) === 'number') {
	          return add(val[key]);
	        } else {
	          return add(val);
	        }
	      }
	    };
	    if (type(data) === 'array') {
	      for (_i = 0, _len = data.length; _i < _len; _i++) {
	        val = data[_i];
	        visit(val);
	      }
	    } else {
	      for (k in data) {
	        val = data[k];
	        visit(val, k);
	      }
	    }
	    r.domain = [r.min, r.max];
	    r.limits = function(mode, num) {
	      return chroma.limits(r, mode, num);
	    };
	    return r;
	  };
	  chroma.limits = function(data, mode, num) {
	    var assignments,
	        best,
	        centroids,
	        cluster,
	        clusterSizes,
	        dist,
	        i,
	        j,
	        kClusters,
	        limits,
	        max,
	        max_log,
	        min,
	        min_log,
	        mindist,
	        n,
	        nb_iters,
	        newCentroids,
	        p,
	        pb,
	        pr,
	        repeat,
	        sum,
	        tmpKMeansBreaks,
	        value,
	        values,
	        _i,
	        _j,
	        _k,
	        _l,
	        _m,
	        _n,
	        _o,
	        _p,
	        _q,
	        _r,
	        _ref1,
	        _ref10,
	        _ref11,
	        _ref12,
	        _ref13,
	        _ref14,
	        _ref15,
	        _ref2,
	        _ref3,
	        _ref4,
	        _ref5,
	        _ref6,
	        _ref7,
	        _ref8,
	        _ref9,
	        _s,
	        _t,
	        _u,
	        _v,
	        _w;
	    if (mode == null) {
	      mode = 'equal';
	    }
	    if (num == null) {
	      num = 7;
	    }
	    if (data.values == null) {
	      data = chroma.analyze(data);
	    }
	    min = data.min;
	    max = data.max;
	    sum = data.sum;
	    values = data.values.sort(function(a, b) {
	      return a - b;
	    });
	    limits = [];
	    if (mode.substr(0, 1) === 'c') {
	      limits.push(min);
	      limits.push(max);
	    }
	    if (mode.substr(0, 1) === 'e') {
	      limits.push(min);
	      for (i = _i = 1, _ref1 = num - 1; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 1 <= _ref1 ? ++_i : --_i) {
	        limits.push(min + (i / num) * (max - min));
	      }
	      limits.push(max);
	    } else if (mode.substr(0, 1) === 'l') {
	      if (min <= 0) {
	        throw 'Logarithmic scales are only possible for values > 0';
	      }
	      min_log = Math.LOG10E * Math.log(min);
	      max_log = Math.LOG10E * Math.log(max);
	      limits.push(min);
	      for (i = _j = 1, _ref2 = num - 1; 1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = 1 <= _ref2 ? ++_j : --_j) {
	        limits.push(Math.pow(10, min_log + (i / num) * (max_log - min_log)));
	      }
	      limits.push(max);
	    } else if (mode.substr(0, 1) === 'q') {
	      limits.push(min);
	      for (i = _k = 1, _ref3 = num - 1; 1 <= _ref3 ? _k <= _ref3 : _k >= _ref3; i = 1 <= _ref3 ? ++_k : --_k) {
	        p = values.length * i / num;
	        pb = Math.floor(p);
	        if (pb === p) {
	          limits.push(values[pb]);
	        } else {
	          pr = p - pb;
	          limits.push(values[pb] * pr + values[pb + 1] * (1 - pr));
	        }
	      }
	      limits.push(max);
	    } else if (mode.substr(0, 1) === 'k') {
	      n = values.length;
	      assignments = new Array(n);
	      clusterSizes = new Array(num);
	      repeat = true;
	      nb_iters = 0;
	      centroids = null;
	      centroids = [];
	      centroids.push(min);
	      for (i = _l = 1, _ref4 = num - 1; 1 <= _ref4 ? _l <= _ref4 : _l >= _ref4; i = 1 <= _ref4 ? ++_l : --_l) {
	        centroids.push(min + (i / num) * (max - min));
	      }
	      centroids.push(max);
	      while (repeat) {
	        for (j = _m = 0, _ref5 = num - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; j = 0 <= _ref5 ? ++_m : --_m) {
	          clusterSizes[j] = 0;
	        }
	        for (i = _n = 0, _ref6 = n - 1; 0 <= _ref6 ? _n <= _ref6 : _n >= _ref6; i = 0 <= _ref6 ? ++_n : --_n) {
	          value = values[i];
	          mindist = Number.MAX_VALUE;
	          for (j = _o = 0, _ref7 = num - 1; 0 <= _ref7 ? _o <= _ref7 : _o >= _ref7; j = 0 <= _ref7 ? ++_o : --_o) {
	            dist = Math.abs(centroids[j] - value);
	            if (dist < mindist) {
	              mindist = dist;
	              best = j;
	            }
	          }
	          clusterSizes[best]++;
	          assignments[i] = best;
	        }
	        newCentroids = new Array(num);
	        for (j = _p = 0, _ref8 = num - 1; 0 <= _ref8 ? _p <= _ref8 : _p >= _ref8; j = 0 <= _ref8 ? ++_p : --_p) {
	          newCentroids[j] = null;
	        }
	        for (i = _q = 0, _ref9 = n - 1; 0 <= _ref9 ? _q <= _ref9 : _q >= _ref9; i = 0 <= _ref9 ? ++_q : --_q) {
	          cluster = assignments[i];
	          if (newCentroids[cluster] === null) {
	            newCentroids[cluster] = values[i];
	          } else {
	            newCentroids[cluster] += values[i];
	          }
	        }
	        for (j = _r = 0, _ref10 = num - 1; 0 <= _ref10 ? _r <= _ref10 : _r >= _ref10; j = 0 <= _ref10 ? ++_r : --_r) {
	          newCentroids[j] *= 1 / clusterSizes[j];
	        }
	        repeat = false;
	        for (j = _s = 0, _ref11 = num - 1; 0 <= _ref11 ? _s <= _ref11 : _s >= _ref11; j = 0 <= _ref11 ? ++_s : --_s) {
	          if (newCentroids[j] !== centroids[i]) {
	            repeat = true;
	            break;
	          }
	        }
	        centroids = newCentroids;
	        nb_iters++;
	        if (nb_iters > 200) {
	          repeat = false;
	        }
	      }
	      kClusters = {};
	      for (j = _t = 0, _ref12 = num - 1; 0 <= _ref12 ? _t <= _ref12 : _t >= _ref12; j = 0 <= _ref12 ? ++_t : --_t) {
	        kClusters[j] = [];
	      }
	      for (i = _u = 0, _ref13 = n - 1; 0 <= _ref13 ? _u <= _ref13 : _u >= _ref13; i = 0 <= _ref13 ? ++_u : --_u) {
	        cluster = assignments[i];
	        kClusters[cluster].push(values[i]);
	      }
	      tmpKMeansBreaks = [];
	      for (j = _v = 0, _ref14 = num - 1; 0 <= _ref14 ? _v <= _ref14 : _v >= _ref14; j = 0 <= _ref14 ? ++_v : --_v) {
	        tmpKMeansBreaks.push(kClusters[j][0]);
	        tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
	      }
	      tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
	        return a - b;
	      });
	      limits.push(tmpKMeansBreaks[0]);
	      for (i = _w = 1, _ref15 = tmpKMeansBreaks.length - 1; _w <= _ref15; i = _w += 2) {
	        if (!isNaN(tmpKMeansBreaks[i])) {
	          limits.push(tmpKMeansBreaks[i]);
	        }
	      }
	    }
	    return limits;
	  };
	  chroma.brewer = brewer = {
	    OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
	    PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
	    BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
	    Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
	    BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
	    YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
	    YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
	    Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
	    RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
	    Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
	    YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
	    Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
	    GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
	    Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
	    YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
	    PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
	    Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
	    PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
	    Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
	    RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
	    RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
	    PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
	    PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
	    RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
	    BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
	    RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
	    PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
	    Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
	    Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
	    Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
	    Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
	    Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
	    Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
	    Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
	    Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
	  };
	  chroma.colors = colors = {
	    indigo: "#4b0082",
	    gold: "#ffd700",
	    hotpink: "#ff69b4",
	    firebrick: "#b22222",
	    indianred: "#cd5c5c",
	    yellow: "#ffff00",
	    mistyrose: "#ffe4e1",
	    darkolivegreen: "#556b2f",
	    olive: "#808000",
	    darkseagreen: "#8fbc8f",
	    pink: "#ffc0cb",
	    tomato: "#ff6347",
	    lightcoral: "#f08080",
	    orangered: "#ff4500",
	    navajowhite: "#ffdead",
	    lime: "#00ff00",
	    palegreen: "#98fb98",
	    darkslategrey: "#2f4f4f",
	    greenyellow: "#adff2f",
	    burlywood: "#deb887",
	    seashell: "#fff5ee",
	    mediumspringgreen: "#00fa9a",
	    fuchsia: "#ff00ff",
	    papayawhip: "#ffefd5",
	    blanchedalmond: "#ffebcd",
	    chartreuse: "#7fff00",
	    dimgray: "#696969",
	    black: "#000000",
	    peachpuff: "#ffdab9",
	    springgreen: "#00ff7f",
	    aquamarine: "#7fffd4",
	    white: "#ffffff",
	    orange: "#ffa500",
	    lightsalmon: "#ffa07a",
	    darkslategray: "#2f4f4f",
	    brown: "#a52a2a",
	    ivory: "#fffff0",
	    dodgerblue: "#1e90ff",
	    peru: "#cd853f",
	    lawngreen: "#7cfc00",
	    chocolate: "#d2691e",
	    crimson: "#dc143c",
	    forestgreen: "#228b22",
	    darkgrey: "#a9a9a9",
	    lightseagreen: "#20b2aa",
	    cyan: "#00ffff",
	    mintcream: "#f5fffa",
	    silver: "#c0c0c0",
	    antiquewhite: "#faebd7",
	    mediumorchid: "#ba55d3",
	    skyblue: "#87ceeb",
	    gray: "#808080",
	    darkturquoise: "#00ced1",
	    goldenrod: "#daa520",
	    darkgreen: "#006400",
	    floralwhite: "#fffaf0",
	    darkviolet: "#9400d3",
	    darkgray: "#a9a9a9",
	    moccasin: "#ffe4b5",
	    saddlebrown: "#8b4513",
	    grey: "#808080",
	    darkslateblue: "#483d8b",
	    lightskyblue: "#87cefa",
	    lightpink: "#ffb6c1",
	    mediumvioletred: "#c71585",
	    slategrey: "#708090",
	    red: "#ff0000",
	    deeppink: "#ff1493",
	    limegreen: "#32cd32",
	    darkmagenta: "#8b008b",
	    palegoldenrod: "#eee8aa",
	    plum: "#dda0dd",
	    turquoise: "#40e0d0",
	    lightgrey: "#d3d3d3",
	    lightgoldenrodyellow: "#fafad2",
	    darkgoldenrod: "#b8860b",
	    lavender: "#e6e6fa",
	    maroon: "#800000",
	    yellowgreen: "#9acd32",
	    sandybrown: "#f4a460",
	    thistle: "#d8bfd8",
	    violet: "#ee82ee",
	    navy: "#000080",
	    magenta: "#ff00ff",
	    dimgrey: "#696969",
	    tan: "#d2b48c",
	    rosybrown: "#bc8f8f",
	    olivedrab: "#6b8e23",
	    blue: "#0000ff",
	    lightblue: "#add8e6",
	    ghostwhite: "#f8f8ff",
	    honeydew: "#f0fff0",
	    cornflowerblue: "#6495ed",
	    slateblue: "#6a5acd",
	    linen: "#faf0e6",
	    darkblue: "#00008b",
	    powderblue: "#b0e0e6",
	    seagreen: "#2e8b57",
	    darkkhaki: "#bdb76b",
	    snow: "#fffafa",
	    sienna: "#a0522d",
	    mediumblue: "#0000cd",
	    royalblue: "#4169e1",
	    lightcyan: "#e0ffff",
	    green: "#008000",
	    mediumpurple: "#9370db",
	    midnightblue: "#191970",
	    cornsilk: "#fff8dc",
	    paleturquoise: "#afeeee",
	    bisque: "#ffe4c4",
	    slategray: "#708090",
	    darkcyan: "#008b8b",
	    khaki: "#f0e68c",
	    wheat: "#f5deb3",
	    teal: "#008080",
	    darkorchid: "#9932cc",
	    deepskyblue: "#00bfff",
	    salmon: "#fa8072",
	    darkred: "#8b0000",
	    steelblue: "#4682b4",
	    palevioletred: "#db7093",
	    lightslategray: "#778899",
	    aliceblue: "#f0f8ff",
	    lightslategrey: "#778899",
	    lightgreen: "#90ee90",
	    orchid: "#da70d6",
	    gainsboro: "#dcdcdc",
	    mediumseagreen: "#3cb371",
	    lightgray: "#d3d3d3",
	    mediumturquoise: "#48d1cc",
	    lemonchiffon: "#fffacd",
	    cadetblue: "#5f9ea0",
	    lightyellow: "#ffffe0",
	    lavenderblush: "#fff0f5",
	    coral: "#ff7f50",
	    purple: "#800080",
	    aqua: "#00ffff",
	    whitesmoke: "#f5f5f5",
	    mediumslateblue: "#7b68ee",
	    darkorange: "#ff8c00",
	    mediumaquamarine: "#66cdaa",
	    darksalmon: "#e9967a",
	    beige: "#f5f5dc",
	    blueviolet: "#8a2be2",
	    azure: "#f0ffff",
	    lightsteelblue: "#b0c4de",
	    oldlace: "#fdf5e6"
	  };
	  type = (function() {
	    var classToType,
	        name,
	        _i,
	        _len,
	        _ref1;
	    classToType = {};
	    _ref1 = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      name = _ref1[_i];
	      classToType["[object " + name + "]"] = name.toLowerCase();
	    }
	    return function(obj) {
	      var strType;
	      strType = Object.prototype.toString.call(obj);
	      return classToType[strType] || "object";
	    };
	  })();
	  limit = function(x, min, max) {
	    if (min == null) {
	      min = 0;
	    }
	    if (max == null) {
	      max = 1;
	    }
	    if (x < min) {
	      x = min;
	    }
	    if (x > max) {
	      x = max;
	    }
	    return x;
	  };
	  unpack = function(args) {
	    if (args.length >= 3) {
	      return args;
	    } else {
	      return args[0];
	    }
	  };
	  TWOPI = Math.PI * 2;
	  PITHIRD = Math.PI / 3;
	  cos = Math.cos;
	  bezier = function(colors) {
	    var I,
	        I0,
	        I1,
	        c,
	        lab0,
	        lab1,
	        lab2,
	        lab3,
	        _ref1,
	        _ref2,
	        _ref3;
	    colors = (function() {
	      var _i,
	          _len,
	          _results;
	      _results = [];
	      for (_i = 0, _len = colors.length; _i < _len; _i++) {
	        c = colors[_i];
	        _results.push(chroma(c));
	      }
	      return _results;
	    })();
	    if (colors.length === 2) {
	      _ref1 = (function() {
	        var _i,
	            _len,
	            _results;
	        _results = [];
	        for (_i = 0, _len = colors.length; _i < _len; _i++) {
	          c = colors[_i];
	          _results.push(c.lab());
	        }
	        return _results;
	      })(), lab0 = _ref1[0], lab1 = _ref1[1];
	      I = function(t) {
	        var i,
	            lab;
	        lab = (function() {
	          var _i,
	              _results;
	          _results = [];
	          for (i = _i = 0; _i <= 2; i = ++_i) {
	            _results.push(lab0[i] + t * (lab1[i] - lab0[i]));
	          }
	          return _results;
	        })();
	        return chroma.lab.apply(chroma, lab);
	      };
	    } else if (colors.length === 3) {
	      _ref2 = (function() {
	        var _i,
	            _len,
	            _results;
	        _results = [];
	        for (_i = 0, _len = colors.length; _i < _len; _i++) {
	          c = colors[_i];
	          _results.push(c.lab());
	        }
	        return _results;
	      })(), lab0 = _ref2[0], lab1 = _ref2[1], lab2 = _ref2[2];
	      I = function(t) {
	        var i,
	            lab;
	        lab = (function() {
	          var _i,
	              _results;
	          _results = [];
	          for (i = _i = 0; _i <= 2; i = ++_i) {
	            _results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
	          }
	          return _results;
	        })();
	        return chroma.lab.apply(chroma, lab);
	      };
	    } else if (colors.length === 4) {
	      _ref3 = (function() {
	        var _i,
	            _len,
	            _results;
	        _results = [];
	        for (_i = 0, _len = colors.length; _i < _len; _i++) {
	          c = colors[_i];
	          _results.push(c.lab());
	        }
	        return _results;
	      })(), lab0 = _ref3[0], lab1 = _ref3[1], lab2 = _ref3[2], lab3 = _ref3[3];
	      I = function(t) {
	        var i,
	            lab;
	        lab = (function() {
	          var _i,
	              _results;
	          _results = [];
	          for (i = _i = 0; _i <= 2; i = ++_i) {
	            _results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
	          }
	          return _results;
	        })();
	        return chroma.lab.apply(chroma, lab);
	      };
	    } else if (colors.length === 5) {
	      I0 = bezier(colors.slice(0, 3));
	      I1 = bezier(colors.slice(2, 5));
	      I = function(t) {
	        if (t < 0.5) {
	          return I0(t * 2);
	        } else {
	          return I1((t - 0.5) * 2);
	        }
	      };
	    }
	    return I;
	  };
	  chroma.interpolate.bezier = bezier;
	}).call(this);
	
	//# sourceMappingURL=<compileOutput>
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)(module)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(16), __webpack_require__(30), __webpack_require__(39), __webpack_require__(46), __webpack_require__(40), __webpack_require__(29), __webpack_require__(31)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, BaconSignalHandler, uniqueID, dm, plugin, defer) {
	  'use strict';
	  return plugin.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = dm.vp('Artefact', U.newSubclass(BaconSignalHandler, (function(superFn) {
	      return function Artefact(options) {
	        superFn.apply(this, arguments);
	        this._options = options;
	        var $__1 = options,
	            id = $__1.id,
	            type = $__1.type,
	            parent = $__1.parent,
	            beforeConstruction = $__1.beforeConstruction;
	        this._id = id || uniqueID(type);
	        this._type = type;
	        this._parent = parent;
	        this._children = [];
	        if (parent) {
	          U.array(parent, '_children').push(this);
	        }
	        this.newEvent('destroy');
	        this.beforeConstruction(beforeConstruction);
	        if (this.root === this) {
	          this._artefactsByID = {};
	          this._registerArtefact = function(artefact) {
	            U.getDef(this._artefactsByID, artefact.id, defer).resolve(artefact);
	          };
	        }
	      };
	    }), {
	      beforeConstruction: function(possiblePromise) {
	        if (!possiblePromise || !$.isFunction(possiblePromise.then)) {
	          return;
	        }
	        if (!this.constructed) {
	          this.constructed = P.resolve(this);
	        }
	        this.constructed = this.constructed.tap((function() {
	          return P.resolve(possiblePromise);
	        }));
	      },
	      get options() {
	        return this._options;
	      },
	      get id() {
	        return this._id;
	      },
	      get type() {
	        return this._type;
	      },
	      get parent() {
	        return this._parent;
	      },
	      get children() {
	        return this._children;
	      },
	      get root() {
	        if (!this._root) {
	          this._root = this.parent ? this.parent.root : this;
	        }
	        return this._root;
	      },
	      artefactById: function(id) {
	        return U.getDef(this.root._artefactsByID, id, defer).promise;
	      },
	      traverseArtefacts: function(fn) {
	        var options = arguments[1] !== (void 0) ? arguments[1] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix') {
	          fn(this);
	        }
	        this.children.forEach((function(child) {
	          child.traverseArtefacts(fn, options);
	        }));
	        if (order === 'postfix') {
	          fn(this);
	        }
	      },
	      traverseArtefactsByType: function(type, fn) {
	        var options = arguments[2] !== (void 0) ? arguments[2] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix' && this.type === type) {
	          fn(this);
	        }
	        if (options.beforeGoingIn) {
	          options.beforeGoingIn(this);
	        }
	        this.closestDescendantsByType(type).forEach((function(descendent) {
	          descendent.traverseArtefactsByType(type, fn, options);
	        }));
	        if (options.beforeGoingOut) {
	          options.beforeGoingOut(this);
	        }
	        if (order === 'postfix' && this.type === type) {
	          fn(this);
	        }
	      },
	      closestAncestorByType: function(type) {
	        var result = this;
	        do {
	          result = result.parent;
	        } while (result && result.type && result.type !== type);
	        return result;
	      },
	      closestDescendantsByType: function(type) {
	        var result = [];
	        this.children.forEach((function(child) {
	          if (child.type === type) {
	            result.push(child);
	          } else {
	            result = result.concat(child.closestDescendantsByType(type));
	          }
	        }));
	        return result;
	      },
	      destroy: function() {
	        this.trigger('destroy');
	        this.children.forEach((function(child) {
	          child.destroy();
	        }));
	      }
	    }));
	    window._amy_Artefact.newSubclass = function newSubClass(name, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var optionDefaults = arguments[3] !== (void 0) ? arguments[3] : {};
	      return dm.vp(name, U.newSubclass(window._amy_Artefact, (function(superFn) {
	        return function() {
	          var options = arguments[0] !== (void 0) ? arguments[0] : {};
	          var $__0 = this;
	          var processedOptions = options;
	          Object.keys(optionDefaults).forEach((function(key) {
	            if (U.isUndefined(processedOptions[key])) {
	              processedOptions[key] = optionDefaults[key];
	            }
	          }));
	          processedOptions.type = name;
	          superFn.call(this, U.extend(options, processedOptions));
	          constructor.call(this, processedOptions);
	          if (this.constructed) {
	            this.constructed = this.constructed.then((function() {
	              if ($.isFunction($__0.construct)) {
	                return P.resolve($__0.construct(options)).return($__0);
	              }
	              return $__0;
	            }));
	          } else if ($.isFunction(this.construct)) {
	            this.beforeConstruction(this.construct(options));
	          }
	          (this.constructed || P.resolve()).then((function() {
	            $__0.root._registerArtefact($__0);
	          }));
	        };
	      }), U.extend({}, prototype, {get circuitboard() {
	          if (!this._circuitboard) {
	            this._circuitboard = this.closestAncestorByType('Circuitboard');
	          }
	          return this._circuitboard;
	        }})));
	    };
	    return window._amy_Artefact;
	  })).tap((function(c) {
	    $.circuitboard.Artefact = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15), __webpack_require__(30), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon) {
	  var BaconSignalHandler = U.newClass(function BaconSignalHandler() {
	    this._events = {};
	    this._properties = {};
	    this._propertyBusses = {};
	  }, {
	    newEvent: function(name) {
	      var source = (arguments[1] !== (void 0) ? arguments[1] : {}).source;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      var bus = new Bacon.Bus();
	      if (source) {
	        bus.plug(source);
	      }
	      return this._events[name] = bus.name(name);
	    },
	    event: function(name) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      return this._events[name];
	    },
	    property: function(name) {
	      return this._properties[name];
	    },
	    p: function(name) {
	      return this._properties[name];
	    },
	    newProperty: function(name) {
	      var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
	          settable = $__1.settable,
	          initial = $__1.initial,
	          isEqual = $__1.isEqual;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      if (U.isUndefined(settable)) {
	        settable = true;
	      }
	      var property = this._properties[name] = new Bacon.Model(initial, {isEqual: isEqual});
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      return property;
	    },
	    trigger: function(name, value) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      this._events[name].push(value);
	    },
	    on: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      return this._on(argsObj);
	    },
	    one: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      U.object(argsObj, 'options').once = true;
	      return this._on(argsObj);
	    },
	    _on: function($__1) {
	      var $__2 = $__1,
	          name = $__2.name,
	          expectedValue = $__2.expectedValue,
	          options = $__2.options,
	          callback = $__2.callback;
	      U.assert(this._events[name] || this._properties[name], ("There is no event or property '" + name + "' on this object."));
	      var result = this._events[name] || this._properties[name];
	      if (U.isDefined(expectedValue)) {
	        result = result.filter((function(v) {
	          return v === expectedValue;
	        }));
	      }
	      if (options && options.once) {
	        result = result.take(1);
	      }
	      if (callback) {
	        result = result.onValue(callback);
	      }
	      return result;
	    },
	    _gatherOnArguments: function() {
	      for (var args = [],
	          $__0 = 0; $__0 < arguments.length; $__0++)
	        args[$__0] = arguments[$__0];
	      var result = {name: args.shift()};
	      if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
	        result.expectedValue = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isPlainObject(args[0])) {
	        result.options = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isFunction(args[0])) {
	        result.callback = args.shift();
	      }
	      return result;
	    }
	  });
	  return BaconSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(16), __webpack_require__(49)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  var list = [];
	  list.toString = function toString() {
	    var result = [];
	    for (var i = 0; i < this.length; i++) {
	      var item = this[i];
	      if (item[2]) {
	        result.push("@media " + item[2] + "{" + item[1] + "}");
	      } else {
	        result.push(item[1]);
	      }
	    }
	    return result.join("");
	  };
	  return list;
	};
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var process = module.exports = {};
	process.nextTick = (function() {
	  var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	  var canMutationObserver = typeof window !== 'undefined' && window.MutationObserver;
	  var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	  ;
	  if (canSetImmediate) {
	    return function(f) {
	      return window.setImmediate(f);
	    };
	  }
	  var queue = [];
	  if (canMutationObserver) {
	    var hiddenDiv = document.createElement("div");
	    var observer = new MutationObserver(function() {
	      var queueList = queue.slice();
	      queue.length = 0;
	      queueList.forEach(function(fn) {
	        fn();
	      });
	    });
	    observer.observe(hiddenDiv, {attributes: true});
	    return function nextTick(fn) {
	      if (!queue.length) {
	        hiddenDiv.setAttribute('yes', 'no');
	      }
	      queue.push(fn);
	    };
	  }
	  if (canPost) {
	    window.addEventListener('message', function(ev) {
	      var source = ev.source;
	      if ((source === window || source === null) && ev.data === 'process-tick') {
	        ev.stopPropagation();
	        if (queue.length > 0) {
	          var fn = queue.shift();
	          fn();
	        }
	      }
	    }, true);
	    return function nextTick(fn) {
	      queue.push(fn);
	      window.postMessage('process-tick', '*');
	    };
	  }
	  return function nextTick(fn) {
	    setTimeout(fn, 0);
	  };
	})();
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	function noop() {}
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.binding = function(name) {
	  throw new Error('process.binding is not supported');
	};
	process.cwd = function() {
	  return '/';
	};
	process.chdir = function(dir) {
	  throw new Error('process.chdir is not supported');
	};
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	void 0 === Date.now && (Date.now = function() {
	  return (new Date).valueOf();
	});
	var TWEEN = TWEEN || function() {
	  var n = [];
	  return {
	    REVISION: "14",
	    getAll: function() {
	      return n;
	    },
	    removeAll: function() {
	      n = [];
	    },
	    add: function(t) {
	      n.push(t);
	    },
	    remove: function(t) {
	      var r = n.indexOf(t);
	      -1 !== r && n.splice(r, 1);
	    },
	    update: function(t) {
	      if (0 === n.length)
	        return !1;
	      var r = 0;
	      for (t = void 0 !== t ? t : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); r < n.length; )
	        n[r].update(t) ? r++ : n.splice(r, 1);
	      return !0;
	    }
	  };
	}();
	TWEEN.Tween = function(n) {
	  var t = n,
	      r = {},
	      i = {},
	      u = {},
	      o = 1e3,
	      e = 0,
	      a = !1,
	      f = !1,
	      c = !1,
	      s = 0,
	      h = null,
	      l = TWEEN.Easing.Linear.None,
	      p = TWEEN.Interpolation.Linear,
	      E = [],
	      d = null,
	      v = !1,
	      I = null,
	      w = null,
	      M = null;
	  for (var O in n)
	    r[O] = parseFloat(n[O], 10);
	  this.to = function(n, t) {
	    return void 0 !== t && (o = t), i = n, this;
	  }, this.start = function(n) {
	    TWEEN.add(this), f = !0, v = !1, h = void 0 !== n ? n : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), h += s;
	    for (var o in i) {
	      if (i[o] instanceof Array) {
	        if (0 === i[o].length)
	          continue;
	        i[o] = [t[o]].concat(i[o]);
	      }
	      r[o] = t[o], r[o] instanceof Array == !1 && (r[o] *= 1), u[o] = r[o] || 0;
	    }
	    return this;
	  }, this.stop = function() {
	    return f ? (TWEEN.remove(this), f = !1, null !== M && M.call(t), this.stopChainedTweens(), this) : this;
	  }, this.stopChainedTweens = function() {
	    for (var n = 0,
	        t = E.length; t > n; n++)
	      E[n].stop();
	  }, this.delay = function(n) {
	    return s = n, this;
	  }, this.repeat = function(n) {
	    return e = n, this;
	  }, this.yoyo = function(n) {
	    return a = n, this;
	  }, this.easing = function(n) {
	    return l = n, this;
	  }, this.interpolation = function(n) {
	    return p = n, this;
	  }, this.chain = function() {
	    return E = arguments, this;
	  }, this.onStart = function(n) {
	    return d = n, this;
	  }, this.onUpdate = function(n) {
	    return I = n, this;
	  }, this.onComplete = function(n) {
	    return w = n, this;
	  }, this.onStop = function(n) {
	    return M = n, this;
	  }, this.update = function(n) {
	    var f;
	    if (h > n)
	      return !0;
	    v === !1 && (null !== d && d.call(t), v = !0);
	    var M = (n - h) / o;
	    M = M > 1 ? 1 : M;
	    var O = l(M);
	    for (f in i) {
	      var m = r[f] || 0,
	          N = i[f];
	      N instanceof Array ? t[f] = p(N, O) : ("string" == typeof N && (N = m + parseFloat(N, 10)), "number" == typeof N && (t[f] = m + (N - m) * O));
	    }
	    if (null !== I && I.call(t, O), 1 == M) {
	      if (e > 0) {
	        isFinite(e) && e--;
	        for (f in u) {
	          if ("string" == typeof i[f] && (u[f] = u[f] + parseFloat(i[f], 10)), a) {
	            var T = u[f];
	            u[f] = i[f], i[f] = T;
	          }
	          r[f] = u[f];
	        }
	        return a && (c = !c), h = n + s, !0;
	      }
	      null !== w && w.call(t);
	      for (var g = 0,
	          W = E.length; W > g; g++)
	        E[g].start(n);
	      return !1;
	    }
	    return !0;
	  };
	}, TWEEN.Easing = {
	  Linear: {None: function(n) {
	      return n;
	    }},
	  Quadratic: {
	    In: function(n) {
	      return n * n;
	    },
	    Out: function(n) {
	      return n * (2 - n);
	    },
	    InOut: function(n) {
	      return (n *= 2) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1);
	    }
	  },
	  Cubic: {
	    In: function(n) {
	      return n * n * n;
	    },
	    Out: function(n) {
	      return --n * n * n + 1;
	    },
	    InOut: function(n) {
	      return (n *= 2) < 1 ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2);
	    }
	  },
	  Quartic: {
	    In: function(n) {
	      return n * n * n * n;
	    },
	    Out: function(n) {
	      return 1 - --n * n * n * n;
	    },
	    InOut: function(n) {
	      return (n *= 2) < 1 ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2);
	    }
	  },
	  Quintic: {
	    In: function(n) {
	      return n * n * n * n * n;
	    },
	    Out: function(n) {
	      return --n * n * n * n * n + 1;
	    },
	    InOut: function(n) {
	      return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2);
	    }
	  },
	  Sinusoidal: {
	    In: function(n) {
	      return 1 - Math.cos(n * Math.PI / 2);
	    },
	    Out: function(n) {
	      return Math.sin(n * Math.PI / 2);
	    },
	    InOut: function(n) {
	      return .5 * (1 - Math.cos(Math.PI * n));
	    }
	  },
	  Exponential: {
	    In: function(n) {
	      return 0 === n ? 0 : Math.pow(1024, n - 1);
	    },
	    Out: function(n) {
	      return 1 === n ? 1 : 1 - Math.pow(2, -10 * n);
	    },
	    InOut: function(n) {
	      return 0 === n ? 0 : 1 === n ? 1 : (n *= 2) < 1 ? .5 * Math.pow(1024, n - 1) : .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	    }
	  },
	  Circular: {
	    In: function(n) {
	      return 1 - Math.sqrt(1 - n * n);
	    },
	    Out: function(n) {
	      return Math.sqrt(1 - --n * n);
	    },
	    InOut: function(n) {
	      return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	    }
	  },
	  Elastic: {
	    In: function(n) {
	      var t,
	          r = .1,
	          i = .4;
	      return 0 === n ? 0 : 1 === n ? 1 : (!r || 1 > r ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (n -= 1)) * Math.sin(2 * (n - t) * Math.PI / i)));
	    },
	    Out: function(n) {
	      var t,
	          r = .1,
	          i = .4;
	      return 0 === n ? 0 : 1 === n ? 1 : (!r || 1 > r ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * n) * Math.sin(2 * (n - t) * Math.PI / i) + 1);
	    },
	    InOut: function(n) {
	      var t,
	          r = .1,
	          i = .4;
	      return 0 === n ? 0 : 1 === n ? 1 : (!r || 1 > r ? (r = 1, t = i / 4) : t = i * Math.asin(1 / r) / (2 * Math.PI), (n *= 2) < 1 ? -.5 * r * Math.pow(2, 10 * (n -= 1)) * Math.sin(2 * (n - t) * Math.PI / i) : r * Math.pow(2, -10 * (n -= 1)) * Math.sin(2 * (n - t) * Math.PI / i) * .5 + 1);
	    }
	  },
	  Back: {
	    In: function(n) {
	      var t = 1.70158;
	      return n * n * ((t + 1) * n - t);
	    },
	    Out: function(n) {
	      var t = 1.70158;
	      return --n * n * ((t + 1) * n + t) + 1;
	    },
	    InOut: function(n) {
	      var t = 2.5949095;
	      return (n *= 2) < 1 ? .5 * n * n * ((t + 1) * n - t) : .5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
	    }
	  },
	  Bounce: {
	    In: function(n) {
	      return 1 - TWEEN.Easing.Bounce.Out(1 - n);
	    },
	    Out: function(n) {
	      return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
	    },
	    InOut: function(n) {
	      return .5 > n ? .5 * TWEEN.Easing.Bounce.In(2 * n) : .5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + .5;
	    }
	  }
	}, TWEEN.Interpolation = {
	  Linear: function(n, t) {
	    var r = n.length - 1,
	        i = r * t,
	        u = Math.floor(i),
	        o = TWEEN.Interpolation.Utils.Linear;
	    return 0 > t ? o(n[0], n[1], i) : t > 1 ? o(n[r], n[r - 1], r - i) : o(n[u], n[u + 1 > r ? r : u + 1], i - u);
	  },
	  Bezier: function(n, t) {
	    var r,
	        i = 0,
	        u = n.length - 1,
	        o = Math.pow,
	        e = TWEEN.Interpolation.Utils.Bernstein;
	    for (r = 0; u >= r; r++)
	      i += o(1 - t, u - r) * o(t, r) * n[r] * e(u, r);
	    return i;
	  },
	  CatmullRom: function(n, t) {
	    var r = n.length - 1,
	        i = r * t,
	        u = Math.floor(i),
	        o = TWEEN.Interpolation.Utils.CatmullRom;
	    return n[0] === n[r] ? (0 > t && (u = Math.floor(i = r * (1 + t))), o(n[(u - 1 + r) % r], n[u], n[(u + 1) % r], n[(u + 2) % r], i - u)) : 0 > t ? n[0] - (o(n[0], n[0], n[1], n[1], -i) - n[0]) : t > 1 ? n[r] - (o(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r]) : o(n[u ? u - 1 : 0], n[u], n[u + 1 > r ? r : u + 1], n[u + 2 > r ? r : u + 2], i - u);
	  },
	  Utils: {
	    Linear: function(n, t, r) {
	      return (t - n) * r + n;
	    },
	    Bernstein: function(n, t) {
	      var r = TWEEN.Interpolation.Utils.Factorial;
	      return r(n) / r(t) / r(n - t);
	    },
	    Factorial: function() {
	      var n = [1];
	      return function(t) {
	        var r,
	            i = 1;
	        if (n[t])
	          return n[t];
	        for (r = t; r > 1; r--)
	          i *= r;
	        return n[t] = i;
	      };
	    }(),
	    CatmullRom: function(n, t, r, i, u) {
	      var o = .5 * (r - n),
	          e = .5 * (i - t),
	          a = u * u,
	          f = u * a;
	      return (2 * t - 2 * r + o + e) * f + (-3 * t + 3 * r - 2 * o - e) * a + o * u + t;
	    }
	  }
	}, "undefined" != typeof module && module.exports && (module.exports = TWEEN);
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
	  var Bacon,
	      init,
	      __slice = [].slice;
	  init = function(Bacon) {
	    var Lens,
	        Model,
	        defaultEquals,
	        fold,
	        globalModCount,
	        id,
	        idCounter,
	        isModel,
	        nonEmpty,
	        sameValue,
	        shallowCopy,
	        valueLens;
	    id = function(x) {
	      return x;
	    };
	    nonEmpty = function(x) {
	      return x.length > 0;
	    };
	    fold = function(xs, seed, f) {
	      var x,
	          _i,
	          _len;
	      for (_i = 0, _len = xs.length; _i < _len; _i++) {
	        x = xs[_i];
	        seed = f(seed, x);
	      }
	      return seed;
	    };
	    isModel = function(obj) {
	      return obj instanceof Bacon.Property;
	    };
	    globalModCount = 0;
	    idCounter = 1;
	    defaultEquals = function(a, b) {
	      return a === b;
	    };
	    sameValue = function(eq) {
	      return function(a, b) {
	        return !a.initial && eq(a.value, b.value);
	      };
	    };
	    Model = Bacon.Model = function(initValue, options) {
	      var currentValue,
	          eq,
	          model,
	          modificationBus,
	          myId,
	          myModCount,
	          syncBus,
	          valueWithSource;
	      if (options == null) {
	        options = {};
	      }
	      myId = idCounter++;
	      eq = options.isEqual || defaultEquals;
	      myModCount = 0;
	      modificationBus = new Bacon.Bus();
	      syncBus = new Bacon.Bus();
	      currentValue = void 0;
	      valueWithSource = Bacon.update({initial: true}, [modificationBus], (function(_arg, _arg1) {
	        var changed,
	            f,
	            modStack,
	            newValue,
	            source,
	            value;
	        value = _arg.value;
	        source = _arg1.source, f = _arg1.f;
	        newValue = f(value);
	        modStack = [myId];
	        changed = newValue !== value;
	        return {
	          source: source,
	          value: newValue,
	          modStack: modStack,
	          changed: changed
	        };
	      }), [syncBus], (function(_, syncEvent) {
	        return syncEvent;
	      })).skipDuplicates(sameValue(eq)).changes().toProperty();
	      model = valueWithSource.map(".value").skipDuplicates(eq);
	      model.dispatcher.subscribe(function(event) {
	        if (event.hasValue()) {
	          return currentValue = event.value();
	        }
	      });
	      if (!model.id) {
	        model.id = myId;
	      }
	      model.addSyncSource = function(syncEvents) {
	        return syncBus.plug(syncEvents.filter(function(e) {
	          return e.changed && !Bacon._.contains(e.modStack, myId);
	        }).doAction(function() {
	          return Bacon.Model.syncCount++;
	        }).map(function(e) {
	          return shallowCopy(e, "modStack", e.modStack.concat([myId]));
	        }).map(function(e) {
	          return valueLens.set(e, model.syncConverter(valueLens.get(e)));
	        }));
	      };
	      model.apply = function(source) {
	        modificationBus.plug(source.toEventStream().map(function(f) {
	          return {
	            source: source,
	            f: f
	          };
	        }));
	        return valueWithSource.changes().filter(function(change) {
	          return change.source !== source;
	        }).map(function(change) {
	          return change.value;
	        });
	      };
	      model.addSource = function(source) {
	        return model.apply(source.map(function(v) {
	          return function() {
	            return v;
	          };
	        }));
	      };
	      model.modify = function(f) {
	        return model.apply(Bacon.once(f));
	      };
	      model.set = function(value) {
	        return model.modify(function() {
	          return value;
	        });
	      };
	      model.get = function() {
	        return currentValue;
	      };
	      model.syncEvents = function() {
	        return valueWithSource.toEventStream();
	      };
	      model.bind = function(other) {
	        this.addSyncSource(other.syncEvents());
	        return other.addSyncSource(this.syncEvents());
	      };
	      model.lens = function(lens) {
	        var lensed;
	        lens = Lens(lens);
	        lensed = Model();
	        this.addSyncSource(model.sampledBy(lensed.syncEvents(), function(full, lensedSync) {
	          return valueLens.set(lensedSync, lens.set(full, lensedSync.value));
	        }));
	        lensed.addSyncSource(this.syncEvents().map(function(e) {
	          return valueLens.set(e, lens.get(e.value));
	        }));
	        return lensed;
	      };
	      model.syncConverter = id;
	      if (arguments.length === 1 || arguments.length > 1 && typeof arguments[0] !== 'undefined') {
	        model.set(initValue);
	      }
	      return model;
	    };
	    Bacon.Model.syncCount = 0;
	    Model.combine = function(template) {
	      var initValue,
	          key,
	          lens,
	          lensedModel,
	          model,
	          value;
	      if (typeof template !== "object") {
	        return Model(template);
	      } else if (isModel(template)) {
	        return template;
	      } else {
	        initValue = template instanceof Array ? [] : {};
	        model = Model(initValue);
	        for (key in template) {
	          value = template[key];
	          lens = Lens.objectLens(key);
	          lensedModel = model.lens(lens);
	          lensedModel.bind(Model.combine(value));
	        }
	        return model;
	      }
	    };
	    Bacon.Binding = function(_arg) {
	      var events,
	          externalChanges,
	          get,
	          initValue,
	          inputs,
	          model,
	          set;
	      initValue = _arg.initValue, get = _arg.get, events = _arg.events, set = _arg.set;
	      inputs = events.map(get);
	      if (initValue != null) {
	        set(initValue);
	      } else {
	        initValue = get();
	      }
	      model = Bacon.Model(initValue);
	      externalChanges = model.addSource(inputs);
	      externalChanges.assign(set);
	      return model;
	    };
	    Lens = Bacon.Lens = function(lens) {
	      if (typeof lens === "object") {
	        return lens;
	      } else {
	        return Lens.objectLens(lens);
	      }
	    };
	    Lens.id = Lens({
	      get: function(x) {
	        return x;
	      },
	      set: function(context, value) {
	        return value;
	      }
	    });
	    Lens.objectLens = function(path) {
	      var keys,
	          objectKeyLens;
	      objectKeyLens = function(key) {
	        return Lens({
	          get: function(x) {
	            return x != null ? x[key] : void 0;
	          },
	          set: function(context, value) {
	            return shallowCopy(context, key, value);
	          }
	        });
	      };
	      keys = Bacon._.filter(nonEmpty, path.split("."));
	      return Lens.compose.apply(Lens, Bacon._.map(objectKeyLens, keys));
	    };
	    Lens.compose = function() {
	      var args,
	          compose2;
	      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      compose2 = function(outer, inner) {
	        return Lens({
	          get: function(x) {
	            return inner.get(outer.get(x));
	          },
	          set: function(context, value) {
	            var innerContext,
	                newInnerContext;
	            innerContext = outer.get(context);
	            newInnerContext = inner.set(innerContext, value);
	            return outer.set(context, newInnerContext);
	          }
	        });
	      };
	      return fold(args, Lens.id, compose2);
	    };
	    valueLens = Lens.objectLens("value");
	    shallowCopy = function(x, key, value) {
	      var copy,
	          k,
	          v;
	      copy = x instanceof Array ? [] : {};
	      for (k in x) {
	        v = x[k];
	        copy[k] = v;
	      }
	      if (key != null) {
	        copy[key] = value;
	      }
	      return copy;
	    };
	    return Bacon;
	  };
	  if (typeof module !== "undefined" && module !== null) {
	    Bacon = __webpack_require__(47);
	    module.exports = init(Bacon);
	  } else {
	    if (true) {
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(47)], __WEBPACK_AMD_DEFINE_FACTORY__ = (init), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	      init(this.Bacon);
	    }
	  }
	}).call(this);
	
	//# sourceMappingURL=<compileOutput>
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)(module)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
	  var $,
	      Bacon,
	      BaconModel,
	      init,
	      __slice = [].slice;
	  init = function(Bacon, BaconModel, $) {
	    var asJQueryObject,
	        assertArrayOrJQueryObject,
	        e,
	        effectNames,
	        effects,
	        eventNames,
	        events,
	        nonEmpty,
	        _,
	        _fn,
	        _fn1,
	        _i,
	        _j,
	        _len,
	        _len1;
	    nonEmpty = function(x) {
	      return x.length > 0;
	    };
	    assertArrayOrJQueryObject = function(x) {
	      if (!(x instanceof jQuery || x instanceof Array)) {
	        throw new Error('Value must be either a jQuery object or an Array of jQuery objects');
	      }
	    };
	    asJQueryObject = function(x) {
	      var element,
	          obj,
	          _i,
	          _len;
	      if (x instanceof jQuery) {
	        return x;
	      } else {
	        obj = $();
	        for (_i = 0, _len = x.length; _i < _len; _i++) {
	          element = x[_i];
	          if (element instanceof jQuery) {
	            obj = obj.add(element);
	          }
	        }
	        return obj;
	      }
	    };
	    _ = {indexOf: Array.prototype.indexOf ? function(xs, x) {
	        return xs.indexOf(x);
	      } : function(xs, x) {
	        var i,
	            y,
	            _i,
	            _len;
	        for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
	          y = xs[i];
	          if (x === y) {
	            return i;
	          }
	        }
	        return -1;
	      }};
	    Bacon.$.Model = Bacon.Model;
	    Bacon.$.textFieldValue = function(element, initValue) {
	      var autofillPoller,
	          events,
	          get;
	      get = function() {
	        return element.val() || "";
	      };
	      autofillPoller = function() {
	        return Bacon.interval(50).take(10).map(get).filter(nonEmpty).take(1);
	      };
	      events = element.asEventStream("keyup input").merge(element.asEventStream("cut paste").delay(1)).merge(autofillPoller());
	      return Bacon.Binding({
	        initValue: initValue,
	        get: get,
	        events: events,
	        set: function(value) {
	          return element.val(value);
	        }
	      });
	    };
	    Bacon.$.checkBoxValue = function(element, initValue) {
	      return Bacon.Binding({
	        initValue: initValue,
	        get: function() {
	          return element.prop("checked") || false;
	        },
	        events: element.asEventStream("change"),
	        set: function(value) {
	          return element.prop("checked", value);
	        }
	      });
	    };
	    Bacon.$.selectValue = function(element, initValue) {
	      return Bacon.Binding({
	        initValue: initValue,
	        get: function() {
	          return element.val();
	        },
	        events: element.asEventStream("change"),
	        set: function(value) {
	          return element.val(value);
	        }
	      });
	    };
	    Bacon.$.radioGroupValue = function(radios, initValue) {
	      assertArrayOrJQueryObject(radios);
	      radios = asJQueryObject(radios);
	      return Bacon.Binding({
	        initValue: initValue,
	        get: function() {
	          return radios.filter(":checked").first().val();
	        },
	        events: radios.asEventStream("change"),
	        set: function(value) {
	          return radios.each(function(i, elem) {
	            return $(elem).prop("checked", elem.value === value);
	          });
	        }
	      });
	    };
	    Bacon.$.intRadioGroupValue = function(radios, initValue) {
	      var radioGroupValue;
	      radioGroupValue = Bacon.$.radioGroupValue(radios);
	      return Bacon.Binding({
	        initValue: initValue,
	        get: function() {
	          var value;
	          value = radioGroupValue.get();
	          if (value != null) {
	            return parseInt(value);
	          } else {
	            return value;
	          }
	        },
	        events: radioGroupValue.syncEvents(),
	        set: function(value) {
	          var strValue;
	          strValue = value != null ? Number(value).toString() : value;
	          return radioGroupValue.set(strValue);
	        }
	      });
	    };
	    Bacon.$.checkBoxGroupValue = function(checkBoxes, initValue) {
	      assertArrayOrJQueryObject(checkBoxes);
	      checkBoxes = asJQueryObject(checkBoxes);
	      return Bacon.Binding({
	        initValue: initValue,
	        get: function() {
	          return checkBoxes.filter(":checked").map(function(i, elem) {
	            return $(elem).val();
	          }).toArray();
	        },
	        events: checkBoxes.asEventStream("change"),
	        set: function(value) {
	          return checkBoxes.each(function(i, elem) {
	            return $(elem).prop("checked", _.indexOf(value, $(elem).val()) >= 0);
	          });
	        }
	      });
	    };
	    Bacon.$.ajax = function(params, abort) {
	      return Bacon.fromPromise($.ajax(params), abort);
	    };
	    Bacon.$.ajaxGet = function(url, data, dataType, abort) {
	      return Bacon.$.ajax({
	        url: url,
	        dataType: dataType,
	        data: data
	      }, abort);
	    };
	    Bacon.$.ajaxGetJSON = function(url, data, abort) {
	      return Bacon.$.ajax({
	        url: url,
	        dataType: "json",
	        data: data
	      }, abort);
	    };
	    Bacon.$.ajaxPost = function(url, data, dataType, abort) {
	      return Bacon.$.ajax({
	        url: url,
	        dataType: dataType,
	        data: data,
	        type: "POST"
	      }, abort);
	    };
	    Bacon.$.ajaxGetScript = function(url, abort) {
	      return Bacon.$.ajax({
	        url: url,
	        dataType: "script"
	      }, abort);
	    };
	    Bacon.$.lazyAjax = function(params) {
	      return Bacon.once(params).flatMap(Bacon.$.ajax);
	    };
	    Bacon.Observable.prototype.ajax = function() {
	      return this.flatMapLatest(Bacon.$.ajax);
	    };
	    Bacon.Observable.prototype.toDeferred = function() {
	      var dfd,
	          value;
	      value = void 0;
	      dfd = $.Deferred();
	      this.take(1).endOnError().subscribe(function(evt) {
	        if (evt.hasValue()) {
	          value = evt.value();
	          return dfd.notify(value);
	        } else if (evt.isError()) {
	          return dfd.reject(evt.error);
	        } else if (evt.isEnd()) {
	          return dfd.resolve(value);
	        }
	      });
	      return dfd;
	    };
	    eventNames = ["keydown", "keyup", "keypress", "click", "dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "dragstart", "drag", "dragenter", "dragleave", "dragover", "drop", "dragend", "resize", "scroll", "select", "change", "submit", "blur", "focus", "focusin", "focusout", "load", "unload"];
	    events = {};
	    _fn = function(e) {
	      return events[e + 'E'] = function() {
	        var args;
	        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	        return this.asEventStream.apply(this, [e].concat(__slice.call(args)));
	      };
	    };
	    for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
	      e = eventNames[_i];
	      _fn(e);
	    }
	    effectNames = ["animate", "show", "hide", "toggle", "fadeIn", "fadeOut", "fadeTo", "fadeToggle", "slideDown", "slideUp", "slideToggle"];
	    effects = {};
	    _fn1 = function(e) {
	      return effects[e + 'E'] = function() {
	        var args;
	        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	        return Bacon.fromPromise(this[e].apply(this, args).promise());
	      };
	    };
	    for (_j = 0, _len1 = effectNames.length; _j < _len1; _j++) {
	      e = effectNames[_j];
	      _fn1(e);
	    }
	    if ($ != null ? $.fn : void 0) {
	      $.fn.extend(events);
	      $.fn.extend(effects);
	      $.fn.asEventStream = Bacon.$.asEventStream;
	    }
	    return Bacon.$;
	  };
	  if (typeof module !== "undefined" && module !== null) {
	    Bacon = __webpack_require__(47);
	    BaconModel = __webpack_require__(44);
	    $ = __webpack_require__(15);
	    module.exports = init(Bacon, BaconModel, $);
	  } else {
	    if (true) {
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(47), __webpack_require__(44), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (init), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	      init(this.Bacon, this.BaconModel, this.$);
	    }
	  }
	}).call(this);
	
	//# sourceMappingURL=<compileOutput>
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)(module)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {(function() {
	  var Bacon,
	      BufferingSource,
	      Bus,
	      CompositeUnsubscribe,
	      ConsumingSource,
	      Desc,
	      Dispatcher,
	      End,
	      Error,
	      Event,
	      EventStream,
	      Exception,
	      Initial,
	      Next,
	      None,
	      Observable,
	      Property,
	      PropertyDispatcher,
	      Some,
	      Source,
	      UpdateBarrier,
	      addPropertyInitValueToStream,
	      assert,
	      assertArray,
	      assertEventStream,
	      assertFunction,
	      assertNoArguments,
	      assertObservable,
	      assertString,
	      cloneArray,
	      compositeUnsubscribe,
	      constantToFunction,
	      containsDuplicateDeps,
	      convertArgsToFunction,
	      describe,
	      endEvent,
	      eventIdCounter,
	      findDeps,
	      flatMap_,
	      former,
	      idCounter,
	      initialEvent,
	      isArray,
	      isFieldKey,
	      isObservable,
	      latter,
	      liftCallback,
	      makeFunction,
	      makeFunctionArgs,
	      makeFunction_,
	      makeObservable,
	      makeSpawner,
	      nextEvent,
	      nop,
	      partiallyApplied,
	      recursionDepth,
	      registerObs,
	      spys,
	      toCombinator,
	      toEvent,
	      toFieldExtractor,
	      toFieldKey,
	      toOption,
	      toSimpleExtractor,
	      valueAndEnd,
	      withDescription,
	      withMethodCallSupport,
	      _,
	      _ref,
	      __hasProp = {}.hasOwnProperty,
	      __extends = function(child, parent) {
	        for (var key in parent) {
	          if (__hasProp.call(parent, key))
	            child[key] = parent[key];
	        }
	        function ctor() {
	          this.constructor = child;
	        }
	        ctor.prototype = parent.prototype;
	        child.prototype = new ctor();
	        child.__super__ = parent.prototype;
	        return child;
	      },
	      __slice = [].slice,
	      __bind = function(fn, me) {
	        return function() {
	          return fn.apply(me, arguments);
	        };
	      };
	  Bacon = {toString: function() {
	      return "Bacon";
	    }};
	  Bacon.version = '0.7.43';
	  Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;
	  nop = function() {};
	  latter = function(_, x) {
	    return x;
	  };
	  former = function(x, _) {
	    return x;
	  };
	  cloneArray = function(xs) {
	    return xs.slice(0);
	  };
	  assert = function(message, condition) {
	    if (!condition) {
	      throw new Exception(message);
	    }
	  };
	  assertEventStream = function(event) {
	    if (!(event instanceof EventStream)) {
	      throw new Exception("not an EventStream : " + event);
	    }
	  };
	  assertObservable = function(event) {
	    if (!(event instanceof Observable)) {
	      throw new Exception("not an Observable : " + event);
	    }
	  };
	  assertFunction = function(f) {
	    return assert("not a function : " + f, _.isFunction(f));
	  };
	  isArray = function(xs) {
	    return xs instanceof Array;
	  };
	  isObservable = function(x) {
	    return x instanceof Observable;
	  };
	  assertArray = function(xs) {
	    if (!isArray(xs)) {
	      throw new Exception("not an array : " + xs);
	    }
	  };
	  assertNoArguments = function(args) {
	    return assert("no arguments supported", args.length === 0);
	  };
	  assertString = function(x) {
	    if (typeof x !== "string") {
	      throw new Exception("not a string : " + x);
	    }
	  };
	  _ = {
	    indexOf: Array.prototype.indexOf ? function(xs, x) {
	      return xs.indexOf(x);
	    } : function(xs, x) {
	      var i,
	          y,
	          _i,
	          _len;
	      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
	        y = xs[i];
	        if (x === y) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    indexWhere: function(xs, f) {
	      var i,
	          y,
	          _i,
	          _len;
	      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
	        y = xs[i];
	        if (f(y)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    head: function(xs) {
	      return xs[0];
	    },
	    always: function(x) {
	      return function() {
	        return x;
	      };
	    },
	    negate: function(f) {
	      return function(x) {
	        return !f(x);
	      };
	    },
	    empty: function(xs) {
	      return xs.length === 0;
	    },
	    tail: function(xs) {
	      return xs.slice(1, xs.length);
	    },
	    filter: function(f, xs) {
	      var filtered,
	          x,
	          _i,
	          _len;
	      filtered = [];
	      for (_i = 0, _len = xs.length; _i < _len; _i++) {
	        x = xs[_i];
	        if (f(x)) {
	          filtered.push(x);
	        }
	      }
	      return filtered;
	    },
	    map: function(f, xs) {
	      var x,
	          _i,
	          _len,
	          _results;
	      _results = [];
	      for (_i = 0, _len = xs.length; _i < _len; _i++) {
	        x = xs[_i];
	        _results.push(f(x));
	      }
	      return _results;
	    },
	    each: function(xs, f) {
	      var key,
	          value;
	      for (key in xs) {
	        value = xs[key];
	        f(key, value);
	      }
	      return void 0;
	    },
	    toArray: function(xs) {
	      if (isArray(xs)) {
	        return xs;
	      } else {
	        return [xs];
	      }
	    },
	    contains: function(xs, x) {
	      return _.indexOf(xs, x) !== -1;
	    },
	    id: function(x) {
	      return x;
	    },
	    last: function(xs) {
	      return xs[xs.length - 1];
	    },
	    all: function(xs, f) {
	      var x,
	          _i,
	          _len;
	      if (f == null) {
	        f = _.id;
	      }
	      for (_i = 0, _len = xs.length; _i < _len; _i++) {
	        x = xs[_i];
	        if (!f(x)) {
	          return false;
	        }
	      }
	      return true;
	    },
	    any: function(xs, f) {
	      var x,
	          _i,
	          _len;
	      if (f == null) {
	        f = _.id;
	      }
	      for (_i = 0, _len = xs.length; _i < _len; _i++) {
	        x = xs[_i];
	        if (f(x)) {
	          return true;
	        }
	      }
	      return false;
	    },
	    without: function(x, xs) {
	      return _.filter((function(y) {
	        return y !== x;
	      }), xs);
	    },
	    remove: function(x, xs) {
	      var i;
	      i = _.indexOf(xs, x);
	      if (i >= 0) {
	        return xs.splice(i, 1);
	      }
	    },
	    fold: function(xs, seed, f) {
	      var x,
	          _i,
	          _len;
	      for (_i = 0, _len = xs.length; _i < _len; _i++) {
	        x = xs[_i];
	        seed = f(seed, x);
	      }
	      return seed;
	    },
	    flatMap: function(f, xs) {
	      return _.fold(xs, [], (function(ys, x) {
	        return ys.concat(f(x));
	      }));
	    },
	    cached: function(f) {
	      var value;
	      value = None;
	      return function() {
	        if (value === None) {
	          value = f();
	          f = void 0;
	        }
	        return value;
	      };
	    },
	    isFunction: function(f) {
	      return typeof f === "function";
	    },
	    toString: function(obj) {
	      var ex,
	          internals,
	          key,
	          value;
	      try {
	        recursionDepth++;
	        if (obj == null) {
	          return "undefined";
	        } else if (_.isFunction(obj)) {
	          return "function";
	        } else if (isArray(obj)) {
	          if (recursionDepth > 5) {
	            return "[..]";
	          }
	          return "[" + _.map(_.toString, obj).toString() + "]";
	        } else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
	          return obj.toString();
	        } else if (typeof obj === "object") {
	          if (recursionDepth > 5) {
	            return "{..}";
	          }
	          internals = (function() {
	            var _results;
	            _results = [];
	            for (key in obj) {
	              if (!__hasProp.call(obj, key))
	                continue;
	              value = (function() {
	                try {
	                  return obj[key];
	                } catch (_error) {
	                  ex = _error;
	                  return ex;
	                }
	              })();
	              _results.push(_.toString(key) + ":" + _.toString(value));
	            }
	            return _results;
	          })();
	          return "{" + internals + "}";
	        } else {
	          return obj;
	        }
	      } finally {
	        recursionDepth--;
	      }
	    }
	  };
	  recursionDepth = 0;
	  Bacon._ = _;
	  UpdateBarrier = (function() {
	    var afterTransaction,
	        afters,
	        aftersIndex,
	        currentEventId,
	        flush,
	        flushDepsOf,
	        flushWaiters,
	        hasWaiters,
	        inTransaction,
	        rootEvent,
	        waiterObs,
	        waiters,
	        whenDoneWith,
	        wrappedSubscribe;
	    rootEvent = void 0;
	    waiterObs = [];
	    waiters = {};
	    afters = [];
	    aftersIndex = 0;
	    afterTransaction = function(f) {
	      if (rootEvent) {
	        return afters.push(f);
	      } else {
	        return f();
	      }
	    };
	    whenDoneWith = function(obs, f) {
	      var obsWaiters;
	      if (rootEvent) {
	        obsWaiters = waiters[obs.id];
	        if (obsWaiters == null) {
	          obsWaiters = waiters[obs.id] = [f];
	          return waiterObs.push(obs);
	        } else {
	          return obsWaiters.push(f);
	        }
	      } else {
	        return f();
	      }
	    };
	    flush = function() {
	      while (waiterObs.length > 0) {
	        flushWaiters(0);
	      }
	      return void 0;
	    };
	    flushWaiters = function(index) {
	      var f,
	          obs,
	          obsId,
	          obsWaiters,
	          _i,
	          _len;
	      obs = waiterObs[index];
	      obsId = obs.id;
	      obsWaiters = waiters[obsId];
	      waiterObs.splice(index, 1);
	      delete waiters[obsId];
	      flushDepsOf(obs);
	      for (_i = 0, _len = obsWaiters.length; _i < _len; _i++) {
	        f = obsWaiters[_i];
	        f();
	      }
	      return void 0;
	    };
	    flushDepsOf = function(obs) {
	      var dep,
	          deps,
	          index,
	          _i,
	          _len;
	      deps = obs.internalDeps();
	      for (_i = 0, _len = deps.length; _i < _len; _i++) {
	        dep = deps[_i];
	        flushDepsOf(dep);
	        if (waiters[dep.id]) {
	          index = _.indexOf(waiterObs, dep);
	          flushWaiters(index);
	        }
	      }
	      return void 0;
	    };
	    inTransaction = function(event, context, f, args) {
	      var after,
	          result;
	      if (rootEvent) {
	        return f.apply(context, args);
	      } else {
	        rootEvent = event;
	        try {
	          result = f.apply(context, args);
	          flush();
	        } finally {
	          rootEvent = void 0;
	          while (aftersIndex < afters.length) {
	            after = afters[aftersIndex];
	            aftersIndex++;
	            after();
	          }
	          aftersIndex = 0;
	          afters = [];
	        }
	        return result;
	      }
	    };
	    currentEventId = function() {
	      if (rootEvent) {
	        return rootEvent.id;
	      } else {
	        return void 0;
	      }
	    };
	    wrappedSubscribe = function(obs, sink) {
	      var doUnsub,
	          shouldUnsub,
	          unsub,
	          unsubd;
	      unsubd = false;
	      shouldUnsub = false;
	      doUnsub = function() {
	        return shouldUnsub = true;
	      };
	      unsub = function() {
	        unsubd = true;
	        return doUnsub();
	      };
	      doUnsub = obs.dispatcher.subscribe(function(event) {
	        return afterTransaction(function() {
	          var reply;
	          if (!unsubd) {
	            reply = sink(event);
	            if (reply === Bacon.noMore) {
	              return unsub();
	            }
	          }
	        });
	      });
	      if (shouldUnsub) {
	        doUnsub();
	      }
	      return unsub;
	    };
	    hasWaiters = function() {
	      return waiterObs.length > 0;
	    };
	    return {
	      whenDoneWith: whenDoneWith,
	      hasWaiters: hasWaiters,
	      inTransaction: inTransaction,
	      currentEventId: currentEventId,
	      wrappedSubscribe: wrappedSubscribe,
	      afterTransaction: afterTransaction
	    };
	  })();
	  Source = (function() {
	    function Source(obs, sync, lazy) {
	      this.obs = obs;
	      this.sync = sync;
	      this.lazy = lazy != null ? lazy : false;
	      this.queue = [];
	    }
	    Source.prototype.subscribe = function(sink) {
	      return this.obs.dispatcher.subscribe(sink);
	    };
	    Source.prototype.toString = function() {
	      return this.obs.toString();
	    };
	    Source.prototype.markEnded = function() {
	      return this.ended = true;
	    };
	    Source.prototype.consume = function() {
	      if (this.lazy) {
	        return {value: _.always(this.queue[0])};
	      } else {
	        return this.queue[0];
	      }
	    };
	    Source.prototype.push = function(x) {
	      return this.queue = [x];
	    };
	    Source.prototype.mayHave = function() {
	      return true;
	    };
	    Source.prototype.hasAtLeast = function() {
	      return this.queue.length;
	    };
	    Source.prototype.flatten = true;
	    return Source;
	  })();
	  ConsumingSource = (function(_super) {
	    __extends(ConsumingSource, _super);
	    function ConsumingSource() {
	      return ConsumingSource.__super__.constructor.apply(this, arguments);
	    }
	    ConsumingSource.prototype.consume = function() {
	      return this.queue.shift();
	    };
	    ConsumingSource.prototype.push = function(x) {
	      return this.queue.push(x);
	    };
	    ConsumingSource.prototype.mayHave = function(c) {
	      return !this.ended || this.queue.length >= c;
	    };
	    ConsumingSource.prototype.hasAtLeast = function(c) {
	      return this.queue.length >= c;
	    };
	    ConsumingSource.prototype.flatten = false;
	    return ConsumingSource;
	  })(Source);
	  BufferingSource = (function(_super) {
	    __extends(BufferingSource, _super);
	    function BufferingSource(obs) {
	      BufferingSource.__super__.constructor.call(this, obs, true);
	    }
	    BufferingSource.prototype.consume = function() {
	      var values;
	      values = this.queue;
	      this.queue = [];
	      return {value: function() {
	          return values;
	        }};
	    };
	    BufferingSource.prototype.push = function(x) {
	      return this.queue.push(x.value());
	    };
	    BufferingSource.prototype.hasAtLeast = function() {
	      return true;
	    };
	    return BufferingSource;
	  })(Source);
	  Source.isTrigger = function(s) {
	    if (s instanceof Source) {
	      return s.sync;
	    } else {
	      return s instanceof EventStream;
	    }
	  };
	  Source.fromObservable = function(s) {
	    if (s instanceof Source) {
	      return s;
	    } else if (s instanceof Property) {
	      return new Source(s, false);
	    } else {
	      return new ConsumingSource(s, true);
	    }
	  };
	  Desc = (function() {
	    function Desc(context, method, args) {
	      this.context = context;
	      this.method = method;
	      this.args = args;
	      this.cached = void 0;
	    }
	    Desc.prototype.deps = function() {
	      return this.cached || (this.cached = findDeps([this.context].concat(this.args)));
	    };
	    Desc.prototype.apply = function(obs) {
	      obs.desc = this;
	      return obs;
	    };
	    Desc.prototype.toString = function() {
	      return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
	    };
	    return Desc;
	  })();
	  describe = function() {
	    var args,
	        context,
	        method;
	    context = arguments[0], method = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
	    if ((context || method) instanceof Desc) {
	      return context || method;
	    } else {
	      return new Desc(context, method, args);
	    }
	  };
	  withDescription = function() {
	    var desc,
	        obs,
	        _i;
	    desc = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), obs = arguments[_i++];
	    return describe.apply(null, desc).apply(obs);
	  };
	  findDeps = function(x) {
	    if (isArray(x)) {
	      return _.flatMap(findDeps, x);
	    } else if (isObservable(x)) {
	      return [x];
	    } else if (x instanceof Source) {
	      return [x.obs];
	    } else {
	      return [];
	    }
	  };
	  withMethodCallSupport = function(wrapped) {
	    return function() {
	      var args,
	          context,
	          f,
	          methodName;
	      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if (typeof f === "object" && args.length) {
	        context = f;
	        methodName = args[0];
	        f = function() {
	          return context[methodName].apply(context, arguments);
	        };
	        args = args.slice(1);
	      }
	      return wrapped.apply(null, [f].concat(__slice.call(args)));
	    };
	  };
	  makeFunctionArgs = function(args) {
	    args = Array.prototype.slice.call(args);
	    return makeFunction_.apply(null, args);
	  };
	  partiallyApplied = function(f, applied) {
	    return function() {
	      var args;
	      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      return f.apply(null, applied.concat(args));
	    };
	  };
	  toSimpleExtractor = function(args) {
	    return function(key) {
	      return function(value) {
	        var fieldValue;
	        if (value == null) {
	          return void 0;
	        } else {
	          fieldValue = value[key];
	          if (_.isFunction(fieldValue)) {
	            return fieldValue.apply(value, args);
	          } else {
	            return fieldValue;
	          }
	        }
	      };
	    };
	  };
	  toFieldExtractor = function(f, args) {
	    var partFuncs,
	        parts;
	    parts = f.slice(1).split(".");
	    partFuncs = _.map(toSimpleExtractor(args), parts);
	    return function(value) {
	      var _i,
	          _len;
	      for (_i = 0, _len = partFuncs.length; _i < _len; _i++) {
	        f = partFuncs[_i];
	        value = f(value);
	      }
	      return value;
	    };
	  };
	  isFieldKey = function(f) {
	    return (typeof f === "string") && f.length > 1 && f.charAt(0) === ".";
	  };
	  makeFunction_ = withMethodCallSupport(function() {
	    var args,
	        f;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (_.isFunction(f)) {
	      if (args.length) {
	        return partiallyApplied(f, args);
	      } else {
	        return f;
	      }
	    } else if (isFieldKey(f)) {
	      return toFieldExtractor(f, args);
	    } else {
	      return _.always(f);
	    }
	  });
	  makeFunction = function(f, args) {
	    return makeFunction_.apply(null, [f].concat(__slice.call(args)));
	  };
	  convertArgsToFunction = function(obs, f, args, method) {
	    var sampled;
	    if (f instanceof Property) {
	      sampled = f.sampledBy(obs, function(p, s) {
	        return [p, s];
	      });
	      return method.call(sampled, function(_arg) {
	        var p,
	            s;
	        p = _arg[0], s = _arg[1];
	        return p;
	      }).map(function(_arg) {
	        var p,
	            s;
	        p = _arg[0], s = _arg[1];
	        return s;
	      });
	    } else {
	      f = makeFunction(f, args);
	      return method.call(obs, f);
	    }
	  };
	  toCombinator = function(f) {
	    var key;
	    if (_.isFunction(f)) {
	      return f;
	    } else if (isFieldKey(f)) {
	      key = toFieldKey(f);
	      return function(left, right) {
	        return left[key](right);
	      };
	    } else {
	      return assert("not a function or a field key: " + f, false);
	    }
	  };
	  toFieldKey = function(f) {
	    return f.slice(1);
	  };
	  Some = (function() {
	    function Some(value) {
	      this.value = value;
	    }
	    Some.prototype.getOrElse = function() {
	      return this.value;
	    };
	    Some.prototype.get = function() {
	      return this.value;
	    };
	    Some.prototype.filter = function(f) {
	      if (f(this.value)) {
	        return new Some(this.value);
	      } else {
	        return None;
	      }
	    };
	    Some.prototype.map = function(f) {
	      return new Some(f(this.value));
	    };
	    Some.prototype.forEach = function(f) {
	      return f(this.value);
	    };
	    Some.prototype.isDefined = true;
	    Some.prototype.toArray = function() {
	      return [this.value];
	    };
	    Some.prototype.inspect = function() {
	      return "Some(" + this.value + ")";
	    };
	    Some.prototype.toString = function() {
	      return this.inspect();
	    };
	    return Some;
	  })();
	  None = {
	    getOrElse: function(value) {
	      return value;
	    },
	    filter: function() {
	      return None;
	    },
	    map: function() {
	      return None;
	    },
	    forEach: function() {},
	    isDefined: false,
	    toArray: function() {
	      return [];
	    },
	    inspect: function() {
	      return "None";
	    },
	    toString: function() {
	      return this.inspect();
	    }
	  };
	  toOption = function(v) {
	    if (v instanceof Some || v === None) {
	      return v;
	    } else {
	      return new Some(v);
	    }
	  };
	  Bacon.noMore = ["<no-more>"];
	  Bacon.more = ["<more>"];
	  idCounter = 0;
	  registerObs = function() {};
	  Observable = (function() {
	    function Observable(desc) {
	      this.id = ++idCounter;
	      withDescription(desc, this);
	      this.initialDesc = this.desc;
	    }
	    Observable.prototype.subscribe = function(sink) {
	      return UpdateBarrier.wrappedSubscribe(this, sink);
	    };
	    Observable.prototype.subscribeInternal = function(sink) {
	      return this.dispatcher.subscribe(sink);
	    };
	    Observable.prototype.onValue = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.hasValue()) {
	          return f(event.value());
	        }
	      });
	    };
	    Observable.prototype.onValues = function(f) {
	      return this.onValue(function(args) {
	        return f.apply(null, args);
	      });
	    };
	    Observable.prototype.onError = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.isError()) {
	          return f(event.error);
	        }
	      });
	    };
	    Observable.prototype.onEnd = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.isEnd()) {
	          return f();
	        }
	      });
	    };
	    Observable.prototype.errors = function() {
	      return withDescription(this, "errors", this.filter(function() {
	        return false;
	      }));
	    };
	    Observable.prototype.name = function(name) {
	      this._name = name;
	      return this;
	    };
	    Observable.prototype.withDescription = function() {
	      return describe.apply(null, arguments).apply(this);
	    };
	    Observable.prototype.toString = function() {
	      if (this._name) {
	        return this._name;
	      } else {
	        return this.desc.toString();
	      }
	    };
	    Observable.prototype.internalDeps = function() {
	      return this.initialDesc.deps();
	    };
	    return Observable;
	  })();
	  Observable.prototype.assign = Observable.prototype.onValue;
	  Observable.prototype.forEach = Observable.prototype.onValue;
	  Observable.prototype.inspect = Observable.prototype.toString;
	  Bacon.Observable = Observable;
	  compositeUnsubscribe = function() {
	    var ss;
	    ss = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    return new CompositeUnsubscribe(ss).unsubscribe;
	  };
	  CompositeUnsubscribe = (function() {
	    function CompositeUnsubscribe(ss) {
	      var s,
	          _i,
	          _len;
	      if (ss == null) {
	        ss = [];
	      }
	      this.unsubscribe = __bind(this.unsubscribe, this);
	      this.unsubscribed = false;
	      this.subscriptions = [];
	      this.starting = [];
	      for (_i = 0, _len = ss.length; _i < _len; _i++) {
	        s = ss[_i];
	        this.add(s);
	      }
	    }
	    CompositeUnsubscribe.prototype.add = function(subscription) {
	      var ended,
	          unsub,
	          unsubMe;
	      if (this.unsubscribed) {
	        return;
	      }
	      ended = false;
	      unsub = nop;
	      this.starting.push(subscription);
	      unsubMe = (function(_this) {
	        return function() {
	          if (_this.unsubscribed) {
	            return;
	          }
	          ended = true;
	          _this.remove(unsub);
	          return _.remove(subscription, _this.starting);
	        };
	      })(this);
	      unsub = subscription(this.unsubscribe, unsubMe);
	      if (!(this.unsubscribed || ended)) {
	        this.subscriptions.push(unsub);
	      }
	      _.remove(subscription, this.starting);
	      return unsub;
	    };
	    CompositeUnsubscribe.prototype.remove = function(unsub) {
	      if (this.unsubscribed) {
	        return;
	      }
	      if ((_.remove(unsub, this.subscriptions)) !== void 0) {
	        return unsub();
	      }
	    };
	    CompositeUnsubscribe.prototype.unsubscribe = function() {
	      var s,
	          _i,
	          _len,
	          _ref;
	      if (this.unsubscribed) {
	        return;
	      }
	      this.unsubscribed = true;
	      _ref = this.subscriptions;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        s = _ref[_i];
	        s();
	      }
	      this.subscriptions = [];
	      return this.starting = [];
	    };
	    CompositeUnsubscribe.prototype.count = function() {
	      if (this.unsubscribed) {
	        return 0;
	      }
	      return this.subscriptions.length + this.starting.length;
	    };
	    CompositeUnsubscribe.prototype.empty = function() {
	      return this.count() === 0;
	    };
	    return CompositeUnsubscribe;
	  })();
	  Bacon.CompositeUnsubscribe = CompositeUnsubscribe;
	  Bacon.when = function() {
	    var f,
	        i,
	        index,
	        ix,
	        len,
	        needsBarrier,
	        pat,
	        patSources,
	        pats,
	        patterns,
	        resultStream,
	        s,
	        sources,
	        triggerFound,
	        usage,
	        _i,
	        _j,
	        _len,
	        _len1,
	        _ref;
	    if (arguments.length === 0) {
	      return Bacon.never();
	    }
	    len = arguments.length;
	    usage = "when: expecting arguments in the form (Observable+,function)+";
	    assert(usage, len % 2 === 0);
	    sources = [];
	    pats = [];
	    i = 0;
	    patterns = [];
	    while (i < len) {
	      patterns[i] = arguments[i];
	      patterns[i + 1] = arguments[i + 1];
	      patSources = _.toArray(arguments[i]);
	      f = constantToFunction(arguments[i + 1]);
	      pat = {
	        f: f,
	        ixs: []
	      };
	      triggerFound = false;
	      for (_i = 0, _len = patSources.length; _i < _len; _i++) {
	        s = patSources[_i];
	        index = _.indexOf(sources, s);
	        if (!triggerFound) {
	          triggerFound = Source.isTrigger(s);
	        }
	        if (index < 0) {
	          sources.push(s);
	          index = sources.length - 1;
	        }
	        _ref = pat.ixs;
	        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
	          ix = _ref[_j];
	          if (ix.index === index) {
	            ix.count++;
	          }
	        }
	        pat.ixs.push({
	          index: index,
	          count: 1
	        });
	      }
	      assert("At least one EventStream required", triggerFound || (!patSources.length));
	      if (patSources.length > 0) {
	        pats.push(pat);
	      }
	      i = i + 2;
	    }
	    if (!sources.length) {
	      return Bacon.never();
	    }
	    sources = _.map(Source.fromObservable, sources);
	    needsBarrier = (_.any(sources, function(s) {
	      return s.flatten;
	    })) && (containsDuplicateDeps(_.map((function(s) {
	      return s.obs;
	    }), sources)));
	    return resultStream = new EventStream(describe.apply(null, [Bacon, "when"].concat(__slice.call(patterns))), function(sink) {
	      var cannotMatch,
	          cannotSync,
	          ends,
	          match,
	          nonFlattened,
	          part,
	          triggers;
	      triggers = [];
	      ends = false;
	      match = function(p) {
	        var _k,
	            _len2,
	            _ref1;
	        _ref1 = p.ixs;
	        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
	          i = _ref1[_k];
	          if (!sources[i.index].hasAtLeast(i.count)) {
	            return false;
	          }
	        }
	        return true;
	      };
	      cannotSync = function(source) {
	        return !source.sync || source.ended;
	      };
	      cannotMatch = function(p) {
	        var _k,
	            _len2,
	            _ref1;
	        _ref1 = p.ixs;
	        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
	          i = _ref1[_k];
	          if (!sources[i.index].mayHave(i.count)) {
	            return true;
	          }
	        }
	      };
	      nonFlattened = function(trigger) {
	        return !trigger.source.flatten;
	      };
	      part = function(source) {
	        return function(unsubAll) {
	          var flush,
	              flushLater,
	              flushWhileTriggers;
	          flushLater = function() {
	            return UpdateBarrier.whenDoneWith(resultStream, flush);
	          };
	          flushWhileTriggers = function() {
	            var events,
	                p,
	                reply,
	                trigger,
	                _k,
	                _len2;
	            if (triggers.length > 0) {
	              reply = Bacon.more;
	              trigger = triggers.pop();
	              for (_k = 0, _len2 = pats.length; _k < _len2; _k++) {
	                p = pats[_k];
	                if (match(p)) {
	                  events = (function() {
	                    var _l,
	                        _len3,
	                        _ref1,
	                        _results;
	                    _ref1 = p.ixs;
	                    _results = [];
	                    for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
	                      i = _ref1[_l];
	                      _results.push(sources[i.index].consume());
	                    }
	                    return _results;
	                  })();
	                  reply = sink(trigger.e.apply(function() {
	                    var event,
	                        values;
	                    values = (function() {
	                      var _l,
	                          _len3,
	                          _results;
	                      _results = [];
	                      for (_l = 0, _len3 = events.length; _l < _len3; _l++) {
	                        event = events[_l];
	                        _results.push(event.value());
	                      }
	                      return _results;
	                    })();
	                    return p.f.apply(p, values);
	                  }));
	                  if (triggers.length) {
	                    triggers = _.filter(nonFlattened, triggers);
	                  }
	                  if (reply === Bacon.noMore) {
	                    return reply;
	                  } else {
	                    return flushWhileTriggers();
	                  }
	                }
	              }
	            } else {
	              return Bacon.more;
	            }
	          };
	          flush = function() {
	            var reply;
	            reply = flushWhileTriggers();
	            if (ends) {
	              ends = false;
	              if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
	                reply = Bacon.noMore;
	                sink(endEvent());
	              }
	            }
	            if (reply === Bacon.noMore) {
	              unsubAll();
	            }
	            return reply;
	          };
	          return source.subscribe(function(e) {
	            var reply;
	            if (e.isEnd()) {
	              ends = true;
	              source.markEnded();
	              flushLater();
	            } else if (e.isError()) {
	              reply = sink(e);
	            } else {
	              source.push(e);
	              if (source.sync) {
	                triggers.push({
	                  source: source,
	                  e: e
	                });
	                if (needsBarrier || UpdateBarrier.hasWaiters()) {
	                  flushLater();
	                } else {
	                  flush();
	                }
	              }
	            }
	            if (reply === Bacon.noMore) {
	              unsubAll();
	            }
	            return reply || Bacon.more;
	          });
	        };
	      };
	      return compositeUnsubscribe.apply(null, (function() {
	        var _k,
	            _len2,
	            _results;
	        _results = [];
	        for (_k = 0, _len2 = sources.length; _k < _len2; _k++) {
	          s = sources[_k];
	          _results.push(part(s));
	        }
	        return _results;
	      })());
	    });
	  };
	  containsDuplicateDeps = function(observables, state) {
	    var checkObservable;
	    if (state == null) {
	      state = [];
	    }
	    checkObservable = function(obs) {
	      var deps;
	      if (_.contains(state, obs)) {
	        return true;
	      } else {
	        deps = obs.internalDeps();
	        if (deps.length) {
	          state.push(obs);
	          return _.any(deps, checkObservable);
	        } else {
	          state.push(obs);
	          return false;
	        }
	      }
	    };
	    return _.any(observables, checkObservable);
	  };
	  constantToFunction = function(f) {
	    if (_.isFunction(f)) {
	      return f;
	    } else {
	      return _.always(f);
	    }
	  };
	  Bacon.groupSimultaneous = function() {
	    var s,
	        sources,
	        streams;
	    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (streams.length === 1 && isArray(streams[0])) {
	      streams = streams[0];
	    }
	    sources = (function() {
	      var _i,
	          _len,
	          _results;
	      _results = [];
	      for (_i = 0, _len = streams.length; _i < _len; _i++) {
	        s = streams[_i];
	        _results.push(new BufferingSource(s));
	      }
	      return _results;
	    })();
	    return withDescription.apply(null, [Bacon, "groupSimultaneous"].concat(__slice.call(streams), [Bacon.when(sources, (function() {
	      var xs;
	      xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      return xs;
	    }))]));
	  };
	  eventIdCounter = 0;
	  Event = (function() {
	    function Event() {
	      this.id = ++eventIdCounter;
	    }
	    Event.prototype.isEvent = function() {
	      return true;
	    };
	    Event.prototype.isEnd = function() {
	      return false;
	    };
	    Event.prototype.isInitial = function() {
	      return false;
	    };
	    Event.prototype.isNext = function() {
	      return false;
	    };
	    Event.prototype.isError = function() {
	      return false;
	    };
	    Event.prototype.hasValue = function() {
	      return false;
	    };
	    Event.prototype.filter = function() {
	      return true;
	    };
	    Event.prototype.inspect = function() {
	      return this.toString();
	    };
	    Event.prototype.log = function() {
	      return this.toString();
	    };
	    return Event;
	  })();
	  Next = (function(_super) {
	    __extends(Next, _super);
	    function Next(valueF, eager) {
	      Next.__super__.constructor.call(this);
	      if (!eager && _.isFunction(valueF) || valueF instanceof Next) {
	        this.valueF = valueF;
	        this.valueInternal = void 0;
	      } else {
	        this.valueF = void 0;
	        this.valueInternal = valueF;
	      }
	    }
	    Next.prototype.isNext = function() {
	      return true;
	    };
	    Next.prototype.hasValue = function() {
	      return true;
	    };
	    Next.prototype.value = function() {
	      if (this.valueF instanceof Next) {
	        this.valueInternal = this.valueF.value();
	        this.valueF = void 0;
	      } else if (this.valueF) {
	        this.valueInternal = this.valueF();
	        this.valueF = void 0;
	      }
	      return this.valueInternal;
	    };
	    Next.prototype.fmap = function(f) {
	      var event,
	          value;
	      if (this.valueInternal) {
	        value = this.valueInternal;
	        return this.apply(function() {
	          return f(value);
	        });
	      } else {
	        event = this;
	        return this.apply(function() {
	          return f(event.value());
	        });
	      }
	    };
	    Next.prototype.apply = function(value) {
	      return new Next(value);
	    };
	    Next.prototype.filter = function(f) {
	      return f(this.value());
	    };
	    Next.prototype.toString = function() {
	      return _.toString(this.value());
	    };
	    Next.prototype.log = function() {
	      return this.value();
	    };
	    return Next;
	  })(Event);
	  Initial = (function(_super) {
	    __extends(Initial, _super);
	    function Initial() {
	      return Initial.__super__.constructor.apply(this, arguments);
	    }
	    Initial.prototype.isInitial = function() {
	      return true;
	    };
	    Initial.prototype.isNext = function() {
	      return false;
	    };
	    Initial.prototype.apply = function(value) {
	      return new Initial(value);
	    };
	    Initial.prototype.toNext = function() {
	      return new Next(this);
	    };
	    return Initial;
	  })(Next);
	  End = (function(_super) {
	    __extends(End, _super);
	    function End() {
	      return End.__super__.constructor.apply(this, arguments);
	    }
	    End.prototype.isEnd = function() {
	      return true;
	    };
	    End.prototype.fmap = function() {
	      return this;
	    };
	    End.prototype.apply = function() {
	      return this;
	    };
	    End.prototype.toString = function() {
	      return "<end>";
	    };
	    return End;
	  })(Event);
	  Error = (function(_super) {
	    __extends(Error, _super);
	    function Error(error) {
	      this.error = error;
	    }
	    Error.prototype.isError = function() {
	      return true;
	    };
	    Error.prototype.fmap = function() {
	      return this;
	    };
	    Error.prototype.apply = function() {
	      return this;
	    };
	    Error.prototype.toString = function() {
	      return "<error> " + _.toString(this.error);
	    };
	    return Error;
	  })(Event);
	  Bacon.Initial = Initial;
	  Bacon.Next = Next;
	  Bacon.End = End;
	  Bacon.Error = Error;
	  initialEvent = function(value) {
	    return new Initial(value, true);
	  };
	  nextEvent = function(value) {
	    return new Next(value, true);
	  };
	  endEvent = function() {
	    return new End();
	  };
	  toEvent = function(x) {
	    if (x instanceof Event) {
	      return x;
	    } else {
	      return nextEvent(x);
	    }
	  };
	  Dispatcher = (function() {
	    function Dispatcher(_subscribe, _handleEvent) {
	      this._subscribe = _subscribe;
	      this._handleEvent = _handleEvent;
	      this.subscribe = __bind(this.subscribe, this);
	      this.handleEvent = __bind(this.handleEvent, this);
	      this.subscriptions = [];
	      this.queue = [];
	      this.pushing = false;
	      this.ended = false;
	      this.prevError = void 0;
	      this.unsubSrc = void 0;
	    }
	    Dispatcher.prototype.hasSubscribers = function() {
	      return this.subscriptions.length > 0;
	    };
	    Dispatcher.prototype.removeSub = function(subscription) {
	      return this.subscriptions = _.without(subscription, this.subscriptions);
	    };
	    Dispatcher.prototype.push = function(event) {
	      if (event.isEnd()) {
	        this.ended = true;
	      }
	      return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
	    };
	    Dispatcher.prototype.pushToSubscriptions = function(event) {
	      var e,
	          reply,
	          sub,
	          tmp,
	          _i,
	          _len;
	      try {
	        tmp = this.subscriptions;
	        for (_i = 0, _len = tmp.length; _i < _len; _i++) {
	          sub = tmp[_i];
	          reply = sub.sink(event);
	          if (reply === Bacon.noMore || event.isEnd()) {
	            this.removeSub(sub);
	          }
	        }
	        return true;
	      } catch (_error) {
	        e = _error;
	        this.pushing = false;
	        this.queue = [];
	        throw e;
	      }
	    };
	    Dispatcher.prototype.pushIt = function(event) {
	      if (!this.pushing) {
	        if (event === this.prevError) {
	          return;
	        }
	        if (event.isError()) {
	          this.prevError = event;
	        }
	        this.pushing = true;
	        this.pushToSubscriptions(event);
	        this.pushing = false;
	        while (this.queue.length) {
	          event = this.queue.shift();
	          this.push(event);
	        }
	        if (this.hasSubscribers()) {
	          return Bacon.more;
	        } else {
	          this.unsubscribeFromSource();
	          return Bacon.noMore;
	        }
	      } else {
	        this.queue.push(event);
	        return Bacon.more;
	      }
	    };
	    Dispatcher.prototype.handleEvent = function(event) {
	      if (this._handleEvent) {
	        return this._handleEvent(event);
	      } else {
	        return this.push(event);
	      }
	    };
	    Dispatcher.prototype.unsubscribeFromSource = function() {
	      if (this.unsubSrc) {
	        this.unsubSrc();
	      }
	      return this.unsubSrc = void 0;
	    };
	    Dispatcher.prototype.subscribe = function(sink) {
	      var subscription;
	      if (this.ended) {
	        sink(endEvent());
	        return nop;
	      } else {
	        assertFunction(sink);
	        subscription = {sink: sink};
	        this.subscriptions.push(subscription);
	        if (this.subscriptions.length === 1) {
	          this.unsubSrc = this._subscribe(this.handleEvent);
	          assertFunction(this.unsubSrc);
	        }
	        return (function(_this) {
	          return function() {
	            _this.removeSub(subscription);
	            if (!_this.hasSubscribers()) {
	              return _this.unsubscribeFromSource();
	            }
	          };
	        })(this);
	      }
	    };
	    return Dispatcher;
	  })();
	  EventStream = (function(_super) {
	    __extends(EventStream, _super);
	    function EventStream(desc, subscribe, handler) {
	      if (_.isFunction(desc)) {
	        handler = subscribe;
	        subscribe = desc;
	        desc = [];
	      }
	      EventStream.__super__.constructor.call(this, desc);
	      assertFunction(subscribe);
	      this.dispatcher = new Dispatcher(subscribe, handler);
	      registerObs(this);
	    }
	    EventStream.prototype.toProperty = function(initValue_) {
	      var disp,
	          initValue;
	      initValue = arguments.length === 0 ? None : toOption(function() {
	        return initValue_;
	      });
	      disp = this.dispatcher;
	      return new Property(describe(this, "toProperty", initValue_), function(sink) {
	        var initSent,
	            reply,
	            sendInit,
	            unsub;
	        initSent = false;
	        unsub = nop;
	        reply = Bacon.more;
	        sendInit = function() {
	          if (!initSent) {
	            return initValue.forEach(function(value) {
	              initSent = true;
	              reply = sink(new Initial(value));
	              if (reply === Bacon.noMore) {
	                unsub();
	                return unsub = nop;
	              }
	            });
	          }
	        };
	        unsub = disp.subscribe(function(event) {
	          if (event.hasValue()) {
	            if (initSent && event.isInitial()) {
	              return Bacon.more;
	            } else {
	              if (!event.isInitial()) {
	                sendInit();
	              }
	              initSent = true;
	              initValue = new Some(event);
	              return sink(event);
	            }
	          } else {
	            if (event.isEnd()) {
	              reply = sendInit();
	            }
	            if (reply !== Bacon.noMore) {
	              return sink(event);
	            }
	          }
	        });
	        sendInit();
	        return unsub;
	      });
	    };
	    EventStream.prototype.toEventStream = function() {
	      return this;
	    };
	    EventStream.prototype.startWith = function(seed) {
	      return withDescription(this, "startWith", seed, Bacon.once(seed).concat(this));
	    };
	    EventStream.prototype.withHandler = function(handler) {
	      return new EventStream(describe(this, "withHandler", handler), this.dispatcher.subscribe, handler);
	    };
	    return EventStream;
	  })(Observable);
	  Bacon.EventStream = EventStream;
	  PropertyDispatcher = (function(_super) {
	    __extends(PropertyDispatcher, _super);
	    function PropertyDispatcher(property, subscribe, handleEvent) {
	      this.property = property;
	      this.subscribe = __bind(this.subscribe, this);
	      PropertyDispatcher.__super__.constructor.call(this, subscribe, handleEvent);
	      this.current = None;
	      this.currentValueRootId = void 0;
	      this.propertyEnded = false;
	    }
	    PropertyDispatcher.prototype.push = function(event) {
	      if (event.isEnd()) {
	        this.propertyEnded = true;
	      }
	      if (event.hasValue()) {
	        this.current = new Some(event);
	        this.currentValueRootId = UpdateBarrier.currentEventId();
	      }
	      return PropertyDispatcher.__super__.push.call(this, event);
	    };
	    PropertyDispatcher.prototype.maybeSubSource = function(sink, reply) {
	      if (reply === Bacon.noMore) {
	        return nop;
	      } else if (this.propertyEnded) {
	        sink(endEvent());
	        return nop;
	      } else {
	        return Dispatcher.prototype.subscribe.call(this, sink);
	      }
	    };
	    PropertyDispatcher.prototype.subscribe = function(sink) {
	      var dispatchingId,
	          initSent,
	          reply,
	          valId;
	      initSent = false;
	      reply = Bacon.more;
	      if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
	        dispatchingId = UpdateBarrier.currentEventId();
	        valId = this.currentValueRootId;
	        if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
	          UpdateBarrier.whenDoneWith(this.property, (function(_this) {
	            return function() {
	              if (_this.currentValueRootId === valId) {
	                return sink(initialEvent(_this.current.get().value()));
	              }
	            };
	          })(this));
	          return this.maybeSubSource(sink, reply);
	        } else {
	          UpdateBarrier.inTransaction(void 0, this, (function() {
	            return reply = sink(initialEvent(this.current.get().value()));
	          }), []);
	          return this.maybeSubSource(sink, reply);
	        }
	      } else {
	        return this.maybeSubSource(sink, reply);
	      }
	    };
	    return PropertyDispatcher;
	  })(Dispatcher);
	  Property = (function(_super) {
	    __extends(Property, _super);
	    function Property(desc, subscribe, handler) {
	      if (_.isFunction(desc)) {
	        handler = subscribe;
	        subscribe = desc;
	        desc = [];
	      }
	      Property.__super__.constructor.call(this, desc);
	      assertFunction(subscribe);
	      this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
	      registerObs(this);
	    }
	    Property.prototype.changes = function() {
	      return new EventStream(describe(this, "changes"), (function(_this) {
	        return function(sink) {
	          return _this.dispatcher.subscribe(function(event) {
	            if (!event.isInitial()) {
	              return sink(event);
	            }
	          });
	        };
	      })(this));
	    };
	    Property.prototype.withHandler = function(handler) {
	      return new Property(describe(this, "withHandler", handler), this.dispatcher.subscribe, handler);
	    };
	    Property.prototype.toProperty = function() {
	      assertNoArguments(arguments);
	      return this;
	    };
	    Property.prototype.toEventStream = function() {
	      return new EventStream(describe(this, "toEventStream"), (function(_this) {
	        return function(sink) {
	          return _this.dispatcher.subscribe(function(event) {
	            if (event.isInitial()) {
	              event = event.toNext();
	            }
	            return sink(event);
	          });
	        };
	      })(this));
	    };
	    return Property;
	  })(Observable);
	  Bacon.Property = Property;
	  Bacon.fromBinder = function(binder, eventTransformer) {
	    if (eventTransformer == null) {
	      eventTransformer = _.id;
	    }
	    return new EventStream(describe(Bacon, "fromBinder", binder, eventTransformer), function(sink) {
	      var shouldUnbind,
	          unbind,
	          unbinder,
	          unbound;
	      unbound = false;
	      shouldUnbind = false;
	      unbind = function() {
	        if (!unbound) {
	          if (typeof unbinder !== "undefined" && unbinder !== null) {
	            unbinder();
	            return unbound = true;
	          } else {
	            return shouldUnbind = true;
	          }
	        }
	      };
	      unbinder = binder(function() {
	        var args,
	            event,
	            reply,
	            value,
	            _i,
	            _len;
	        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	        value = eventTransformer.apply(this, args);
	        if (!(isArray(value) && _.last(value) instanceof Event)) {
	          value = [value];
	        }
	        reply = Bacon.more;
	        for (_i = 0, _len = value.length; _i < _len; _i++) {
	          event = value[_i];
	          reply = sink(event = toEvent(event));
	          if (reply === Bacon.noMore || event.isEnd()) {
	            unbind();
	            return reply;
	          }
	        }
	        return reply;
	      });
	      if (shouldUnbind) {
	        unbind();
	      }
	      return unbind;
	    });
	  };
	  Bacon.fromEventTarget = function(target, eventName, eventTransformer) {
	    var sub,
	        unsub,
	        _ref,
	        _ref1,
	        _ref2,
	        _ref3,
	        _ref4,
	        _ref5;
	    sub = (_ref = (_ref1 = (_ref2 = target.addEventListener) != null ? _ref2 : target.addListener) != null ? _ref1 : target.bind) != null ? _ref : target.on;
	    unsub = (_ref3 = (_ref4 = (_ref5 = target.removeEventListener) != null ? _ref5 : target.removeListener) != null ? _ref4 : target.unbind) != null ? _ref3 : target.off;
	    return withDescription(Bacon, "fromEventTarget", target, eventName, Bacon.fromBinder(function(handler) {
	      sub.call(target, eventName, handler);
	      return function() {
	        return unsub.call(target, eventName, handler);
	      };
	    }, eventTransformer));
	  };
	  Bacon.fromEvent = Bacon.fromEventTarget;
	  Bacon.constant = function(value) {
	    return new Property(describe(Bacon, "constant", value), function(sink) {
	      sink(initialEvent(value));
	      sink(endEvent());
	      return nop;
	    });
	  };
	  Bacon.never = function() {
	    return new EventStream(describe(Bacon, "never"), function(sink) {
	      sink(endEvent());
	      return nop;
	    });
	  };
	  Bacon.once = function(value) {
	    return new EventStream(describe(Bacon, "once", value), function(sink) {
	      sink(toEvent(value));
	      sink(endEvent());
	      return nop;
	    });
	  };
	  Bacon.fromArray = function(values) {
	    var i;
	    assertArray(values);
	    if (!values.length) {
	      return withDescription(Bacon, "fromArray", values, Bacon.never());
	    } else {
	      i = 0;
	      return new EventStream(describe(Bacon, "fromArray", values), function(sink) {
	        var push,
	            reply,
	            unsubd;
	        unsubd = false;
	        reply = Bacon.more;
	        push = function() {
	          var value;
	          if ((reply !== Bacon.noMore) && !unsubd) {
	            value = values[i++];
	            reply = sink(toEvent(value));
	            if (reply !== Bacon.noMore) {
	              if (i === values.length) {
	                return sink(endEvent());
	              } else {
	                return UpdateBarrier.afterTransaction(push);
	              }
	            }
	          }
	        };
	        push();
	        return function() {
	          return unsubd = true;
	        };
	      });
	    }
	  };
	  Bacon.combineAsArray = function() {
	    var index,
	        s,
	        sources,
	        stream,
	        streams,
	        _i,
	        _len;
	    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (streams.length === 1 && isArray(streams[0])) {
	      streams = streams[0];
	    }
	    for (index = _i = 0, _len = streams.length; _i < _len; index = ++_i) {
	      stream = streams[index];
	      if (!(isObservable(stream))) {
	        streams[index] = Bacon.constant(stream);
	      }
	    }
	    if (streams.length) {
	      sources = (function() {
	        var _j,
	            _len1,
	            _results;
	        _results = [];
	        for (_j = 0, _len1 = streams.length; _j < _len1; _j++) {
	          s = streams[_j];
	          _results.push(new Source(s, true));
	        }
	        return _results;
	      })();
	      return withDescription.apply(null, [Bacon, "combineAsArray"].concat(__slice.call(streams), [Bacon.when(sources, (function() {
	        var xs;
	        xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	        return xs;
	      })).toProperty()]));
	    } else {
	      return Bacon.constant([]);
	    }
	  };
	  Bacon.onValues = function() {
	    var f,
	        streams,
	        _i;
	    streams = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), f = arguments[_i++];
	    return Bacon.combineAsArray(streams).onValues(f);
	  };
	  Bacon.combineWith = function() {
	    var f,
	        streams;
	    f = arguments[0], streams = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return withDescription.apply(null, [Bacon, "combineWith", f].concat(__slice.call(streams), [Bacon.combineAsArray(streams).map(function(values) {
	      return f.apply(null, values);
	    })]));
	  };
	  Bacon.combineTemplate = function(template) {
	    var applyStreamValue,
	        combinator,
	        compile,
	        compileTemplate,
	        constantValue,
	        current,
	        funcs,
	        mkContext,
	        setValue,
	        streams;
	    funcs = [];
	    streams = [];
	    current = function(ctxStack) {
	      return ctxStack[ctxStack.length - 1];
	    };
	    setValue = function(ctxStack, key, value) {
	      return current(ctxStack)[key] = value;
	    };
	    applyStreamValue = function(key, index) {
	      return function(ctxStack, values) {
	        return setValue(ctxStack, key, values[index]);
	      };
	    };
	    constantValue = function(key, value) {
	      return function(ctxStack) {
	        return setValue(ctxStack, key, value);
	      };
	    };
	    mkContext = function(template) {
	      if (isArray(template)) {
	        return [];
	      } else {
	        return {};
	      }
	    };
	    compile = function(key, value) {
	      var popContext,
	          pushContext;
	      if (isObservable(value)) {
	        streams.push(value);
	        return funcs.push(applyStreamValue(key, streams.length - 1));
	      } else if (value === Object(value) && typeof value !== "function" && !(value instanceof RegExp) && !(value instanceof Date)) {
	        pushContext = function(key) {
	          return function(ctxStack) {
	            var newContext;
	            newContext = mkContext(value);
	            setValue(ctxStack, key, newContext);
	            return ctxStack.push(newContext);
	          };
	        };
	        popContext = function(ctxStack) {
	          return ctxStack.pop();
	        };
	        funcs.push(pushContext(key));
	        compileTemplate(value);
	        return funcs.push(popContext);
	      } else {
	        return funcs.push(constantValue(key, value));
	      }
	    };
	    compileTemplate = function(template) {
	      return _.each(template, compile);
	    };
	    compileTemplate(template);
	    combinator = function(values) {
	      var ctxStack,
	          f,
	          rootContext,
	          _i,
	          _len;
	      rootContext = mkContext(template);
	      ctxStack = [rootContext];
	      for (_i = 0, _len = funcs.length; _i < _len; _i++) {
	        f = funcs[_i];
	        f(ctxStack, values);
	      }
	      return rootContext;
	    };
	    return withDescription(Bacon, "combineTemplate", template, Bacon.combineAsArray(streams).map(combinator));
	  };
	  Bacon.Observable.prototype.combine = function(other, f) {
	    var combinator;
	    combinator = toCombinator(f);
	    return withDescription(this, "combine", other, f, Bacon.combineAsArray(this, other).map(function(values) {
	      return combinator(values[0], values[1]);
	    }));
	  };
	  Bacon.Observable.prototype.decode = function(cases) {
	    return withDescription(this, "decode", cases, this.combine(Bacon.combineTemplate(cases), function(key, values) {
	      return values[key];
	    }));
	  };
	  Bacon.Observable.prototype.withStateMachine = function(initState, f) {
	    var state;
	    state = initState;
	    return withDescription(this, "withStateMachine", initState, f, this.withHandler(function(event) {
	      var fromF,
	          newState,
	          output,
	          outputs,
	          reply,
	          _i,
	          _len;
	      fromF = f(state, event);
	      newState = fromF[0], outputs = fromF[1];
	      state = newState;
	      reply = Bacon.more;
	      for (_i = 0, _len = outputs.length; _i < _len; _i++) {
	        output = outputs[_i];
	        reply = this.push(output);
	        if (reply === Bacon.noMore) {
	          return reply;
	        }
	      }
	      return reply;
	    }));
	  };
	  Bacon.Observable.prototype.skipDuplicates = function(isEqual) {
	    if (isEqual == null) {
	      isEqual = function(a, b) {
	        return a === b;
	      };
	    }
	    return withDescription(this, "skipDuplicates", this.withStateMachine(None, function(prev, event) {
	      if (!event.hasValue()) {
	        return [prev, [event]];
	      } else if (event.isInitial() || prev === None || !isEqual(prev.get(), event.value())) {
	        return [new Some(event.value()), [event]];
	      } else {
	        return [prev, []];
	      }
	    }));
	  };
	  Bacon.Observable.prototype.awaiting = function(other) {
	    return withDescription(this, "awaiting", other, Bacon.groupSimultaneous(this, other).map(function(_arg) {
	      var myValues,
	          otherValues;
	      myValues = _arg[0], otherValues = _arg[1];
	      return otherValues.length === 0;
	    }).toProperty(false).skipDuplicates());
	  };
	  Bacon.Observable.prototype.not = function() {
	    return withDescription(this, "not", this.map(function(x) {
	      return !x;
	    }));
	  };
	  Bacon.Property.prototype.and = function(other) {
	    return withDescription(this, "and", other, this.combine(other, function(x, y) {
	      return x && y;
	    }));
	  };
	  Bacon.Property.prototype.or = function(other) {
	    return withDescription(this, "or", other, this.combine(other, function(x, y) {
	      return x || y;
	    }));
	  };
	  Bacon.scheduler = {
	    setTimeout: function(f, d) {
	      return setTimeout(f, d);
	    },
	    setInterval: function(f, i) {
	      return setInterval(f, i);
	    },
	    clearInterval: function(id) {
	      return clearInterval(id);
	    },
	    now: function() {
	      return new Date().getTime();
	    }
	  };
	  Bacon.EventStream.prototype.bufferWithTime = function(delay) {
	    return withDescription(this, "bufferWithTime", delay, this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
	  };
	  Bacon.EventStream.prototype.bufferWithCount = function(count) {
	    return withDescription(this, "bufferWithCount", count, this.bufferWithTimeOrCount(void 0, count));
	  };
	  Bacon.EventStream.prototype.bufferWithTimeOrCount = function(delay, count) {
	    var flushOrSchedule;
	    flushOrSchedule = function(buffer) {
	      if (buffer.values.length === count) {
	        return buffer.flush();
	      } else if (delay !== void 0) {
	        return buffer.schedule();
	      }
	    };
	    return withDescription(this, "bufferWithTimeOrCount", delay, count, this.buffer(delay, flushOrSchedule, flushOrSchedule));
	  };
	  Bacon.EventStream.prototype.buffer = function(delay, onInput, onFlush) {
	    var buffer,
	        delayMs,
	        reply;
	    if (onInput == null) {
	      onInput = nop;
	    }
	    if (onFlush == null) {
	      onFlush = nop;
	    }
	    buffer = {
	      scheduled: false,
	      end: void 0,
	      values: [],
	      flush: function() {
	        var reply;
	        this.scheduled = false;
	        if (this.values.length > 0) {
	          reply = this.push(nextEvent(this.values));
	          this.values = [];
	          if (this.end != null) {
	            return this.push(this.end);
	          } else if (reply !== Bacon.noMore) {
	            return onFlush(this);
	          }
	        } else {
	          if (this.end != null) {
	            return this.push(this.end);
	          }
	        }
	      },
	      schedule: function() {
	        if (!this.scheduled) {
	          this.scheduled = true;
	          return delay((function(_this) {
	            return function() {
	              return _this.flush();
	            };
	          })(this));
	        }
	      }
	    };
	    reply = Bacon.more;
	    if (!_.isFunction(delay)) {
	      delayMs = delay;
	      delay = function(f) {
	        return Bacon.scheduler.setTimeout(f, delayMs);
	      };
	    }
	    return withDescription(this, "buffer", this.withHandler(function(event) {
	      buffer.push = (function(_this) {
	        return function(event) {
	          return _this.push(event);
	        };
	      })(this);
	      if (event.isError()) {
	        reply = this.push(event);
	      } else if (event.isEnd()) {
	        buffer.end = event;
	        if (!buffer.scheduled) {
	          buffer.flush();
	        }
	      } else {
	        buffer.values.push(event.value());
	        onInput(buffer);
	      }
	      return reply;
	    }));
	  };
	  Bacon.Observable.prototype.filter = function() {
	    var args,
	        f;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDescription(this, "filter", f, this.withHandler(function(event) {
	        if (event.filter(f)) {
	          return this.push(event);
	        } else {
	          return Bacon.more;
	        }
	      }));
	    });
	  };
	  Bacon.EventStream.prototype.concat = function(right) {
	    var left;
	    left = this;
	    return new EventStream(describe(left, "concat", right), function(sink) {
	      var unsubLeft,
	          unsubRight;
	      unsubRight = nop;
	      unsubLeft = left.dispatcher.subscribe(function(e) {
	        if (e.isEnd()) {
	          return unsubRight = right.dispatcher.subscribe(sink);
	        } else {
	          return sink(e);
	        }
	      });
	      return function() {
	        unsubLeft();
	        return unsubRight();
	      };
	    });
	  };
	  Bacon.Observable.prototype.flatMap = function() {
	    return flatMap_(this, makeSpawner(arguments));
	  };
	  Bacon.Observable.prototype.flatMapFirst = function() {
	    return flatMap_(this, makeSpawner(arguments), true);
	  };
	  flatMap_ = function(root, f, firstOnly, limit) {
	    var childDeps,
	        result,
	        rootDep;
	    rootDep = [root];
	    childDeps = [];
	    result = new EventStream(describe(root, "flatMap" + (firstOnly ? "First" : ""), f), function(sink) {
	      var checkEnd,
	          checkQueue,
	          composite,
	          queue,
	          spawn;
	      composite = new CompositeUnsubscribe();
	      queue = [];
	      spawn = function(event) {
	        var child;
	        child = makeObservable(f(event.value()));
	        childDeps.push(child);
	        return composite.add(function(unsubAll, unsubMe) {
	          return child.dispatcher.subscribe(function(event) {
	            var reply;
	            if (event.isEnd()) {
	              _.remove(child, childDeps);
	              checkQueue();
	              checkEnd(unsubMe);
	              return Bacon.noMore;
	            } else {
	              if (event instanceof Initial) {
	                event = event.toNext();
	              }
	              reply = sink(event);
	              if (reply === Bacon.noMore) {
	                unsubAll();
	              }
	              return reply;
	            }
	          });
	        });
	      };
	      checkQueue = function() {
	        var event;
	        event = queue.shift();
	        if (event) {
	          return spawn(event);
	        }
	      };
	      checkEnd = function(unsub) {
	        unsub();
	        if (composite.empty()) {
	          return sink(endEvent());
	        }
	      };
	      composite.add(function(__, unsubRoot) {
	        return root.dispatcher.subscribe(function(event) {
	          if (event.isEnd()) {
	            return checkEnd(unsubRoot);
	          } else if (event.isError()) {
	            return sink(event);
	          } else if (firstOnly && composite.count() > 1) {
	            return Bacon.more;
	          } else {
	            if (composite.unsubscribed) {
	              return Bacon.noMore;
	            }
	            if (limit && composite.count() > limit) {
	              return queue.push(event);
	            } else {
	              return spawn(event);
	            }
	          }
	        });
	      });
	      return composite.unsubscribe;
	    });
	    result.internalDeps = function() {
	      if (childDeps.length) {
	        return rootDep.concat(childDeps);
	      } else {
	        return rootDep;
	      }
	    };
	    return result;
	  };
	  makeSpawner = function(args) {
	    if (args.length === 1 && isObservable(args[0])) {
	      return _.always(args[0]);
	    } else {
	      return makeFunctionArgs(args);
	    }
	  };
	  makeObservable = function(x) {
	    if (isObservable(x)) {
	      return x;
	    } else {
	      return Bacon.once(x);
	    }
	  };
	  Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function() {
	    var args,
	        limit;
	    limit = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return withDescription.apply(null, [this, "flatMapWithConcurrencyLimit", limit].concat(__slice.call(args), [flatMap_(this, makeSpawner(args), false, limit)]));
	  };
	  Bacon.Observable.prototype.flatMapConcat = function() {
	    return withDescription.apply(null, [this, "flatMapConcat"].concat(__slice.call(arguments), [this.flatMapWithConcurrencyLimit.apply(this, [1].concat(__slice.call(arguments)))]));
	  };
	  Bacon.Observable.prototype.bufferingThrottle = function(minimumInterval) {
	    return withDescription(this, "bufferingThrottle", minimumInterval, this.flatMapConcat(function(x) {
	      return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
	    }));
	  };
	  Bacon.Property.prototype.bufferingThrottle = function() {
	    return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
	  };
	  Bus = (function(_super) {
	    __extends(Bus, _super);
	    function Bus() {
	      this.guardedSink = __bind(this.guardedSink, this);
	      this.subscribeAll = __bind(this.subscribeAll, this);
	      this.unsubAll = __bind(this.unsubAll, this);
	      this.sink = void 0;
	      this.subscriptions = [];
	      this.ended = false;
	      Bus.__super__.constructor.call(this, describe(Bacon, "Bus"), this.subscribeAll);
	    }
	    Bus.prototype.unsubAll = function() {
	      var sub,
	          _i,
	          _len,
	          _ref;
	      _ref = this.subscriptions;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        sub = _ref[_i];
	        if (typeof sub.unsub === "function") {
	          sub.unsub();
	        }
	      }
	      return void 0;
	    };
	    Bus.prototype.subscribeAll = function(newSink) {
	      var subscription,
	          _i,
	          _len,
	          _ref;
	      this.sink = newSink;
	      _ref = cloneArray(this.subscriptions);
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        subscription = _ref[_i];
	        this.subscribeInput(subscription);
	      }
	      return this.unsubAll;
	    };
	    Bus.prototype.guardedSink = function(input) {
	      return (function(_this) {
	        return function(event) {
	          if (event.isEnd()) {
	            _this.unsubscribeInput(input);
	            return Bacon.noMore;
	          } else {
	            return _this.sink(event);
	          }
	        };
	      })(this);
	    };
	    Bus.prototype.subscribeInput = function(subscription) {
	      return subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
	    };
	    Bus.prototype.unsubscribeInput = function(input) {
	      var i,
	          sub,
	          _i,
	          _len,
	          _ref;
	      _ref = this.subscriptions;
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        sub = _ref[i];
	        if (sub.input === input) {
	          if (typeof sub.unsub === "function") {
	            sub.unsub();
	          }
	          this.subscriptions.splice(i, 1);
	          return;
	        }
	      }
	    };
	    Bus.prototype.plug = function(input) {
	      var sub;
	      assertObservable(input);
	      if (this.ended) {
	        return;
	      }
	      sub = {input: input};
	      this.subscriptions.push(sub);
	      if ((this.sink != null)) {
	        this.subscribeInput(sub);
	      }
	      return (function(_this) {
	        return function() {
	          return _this.unsubscribeInput(input);
	        };
	      })(this);
	    };
	    Bus.prototype.end = function() {
	      this.ended = true;
	      this.unsubAll();
	      return typeof this.sink === "function" ? this.sink(endEvent()) : void 0;
	    };
	    Bus.prototype.push = function(value) {
	      return typeof this.sink === "function" ? this.sink(nextEvent(value)) : void 0;
	    };
	    Bus.prototype.error = function(error) {
	      return typeof this.sink === "function" ? this.sink(new Error(error)) : void 0;
	    };
	    return Bus;
	  })(EventStream);
	  Bacon.Bus = Bus;
	  liftCallback = function(desc, wrapped) {
	    return withMethodCallSupport(function() {
	      var args,
	          f,
	          stream;
	      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      stream = partiallyApplied(wrapped, [function(values, callback) {
	        return f.apply(null, __slice.call(values).concat([callback]));
	      }]);
	      return withDescription.apply(null, [Bacon, desc, f].concat(__slice.call(args), [Bacon.combineAsArray(args).flatMap(stream)]));
	    });
	  };
	  Bacon.fromCallback = liftCallback("fromCallback", function() {
	    var args,
	        f;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return Bacon.fromBinder(function(handler) {
	      makeFunction(f, args)(handler);
	      return nop;
	    }, (function(value) {
	      return [value, endEvent()];
	    }));
	  });
	  Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function() {
	    var args,
	        f;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return Bacon.fromBinder(function(handler) {
	      makeFunction(f, args)(handler);
	      return nop;
	    }, function(error, value) {
	      if (error) {
	        return [new Error(error), endEvent()];
	      }
	      return [value, endEvent()];
	    });
	  });
	  addPropertyInitValueToStream = function(property, stream) {
	    var justInitValue;
	    justInitValue = new EventStream(describe(property, "justInitValue"), function(sink) {
	      var unsub,
	          value;
	      value = void 0;
	      unsub = property.dispatcher.subscribe(function(event) {
	        if (!event.isEnd()) {
	          value = event;
	        }
	        return Bacon.noMore;
	      });
	      UpdateBarrier.whenDoneWith(justInitValue, function() {
	        if (value != null) {
	          sink(value);
	        }
	        return sink(endEvent());
	      });
	      return unsub;
	    });
	    return justInitValue.concat(stream).toProperty();
	  };
	  Bacon.Observable.prototype.mapEnd = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDescription(this, "mapEnd", f, this.withHandler(function(event) {
	      if (event.isEnd()) {
	        this.push(nextEvent(f(event)));
	        this.push(endEvent());
	        return Bacon.noMore;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	  Bacon.Observable.prototype.skipErrors = function() {
	    return withDescription(this, "skipErrors", this.withHandler(function(event) {
	      if (event.isError()) {
	        return Bacon.more;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	  Bacon.EventStream.prototype.takeUntil = function(stopper) {
	    var endMarker;
	    endMarker = {};
	    return withDescription(this, "takeUntil", stopper, Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function(event) {
	      var data,
	          reply,
	          value,
	          _i,
	          _len,
	          _ref;
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else {
	        _ref = event.value(), data = _ref[0], stopper = _ref[1];
	        if (stopper.length) {
	          return this.push(endEvent());
	        } else {
	          reply = Bacon.more;
	          for (_i = 0, _len = data.length; _i < _len; _i++) {
	            value = data[_i];
	            if (value === endMarker) {
	              reply = this.push(endEvent());
	            } else {
	              reply = this.push(nextEvent(value));
	            }
	          }
	          return reply;
	        }
	      }
	    }));
	  };
	  Bacon.Property.prototype.takeUntil = function(stopper) {
	    var changes;
	    changes = this.changes().takeUntil(stopper);
	    return withDescription(this, "takeUntil", stopper, addPropertyInitValueToStream(this, changes));
	  };
	  Bacon.Observable.prototype.flatMapLatest = function() {
	    var f,
	        stream;
	    f = makeSpawner(arguments);
	    stream = this.toEventStream();
	    return withDescription(this, "flatMapLatest", f, stream.flatMap(function(value) {
	      return makeObservable(f(value)).takeUntil(stream);
	    }));
	  };
	  Bacon.fromPoll = function(delay, poll) {
	    return withDescription(Bacon, "fromPoll", delay, poll, Bacon.fromBinder((function(handler) {
	      var id;
	      id = Bacon.scheduler.setInterval(handler, delay);
	      return function() {
	        return Bacon.scheduler.clearInterval(id);
	      };
	    }), poll));
	  };
	  Bacon.later = function(delay, value) {
	    return withDescription(Bacon, "later", delay, value, Bacon.fromPoll(delay, function() {
	      return [value, endEvent()];
	    }));
	  };
	  Bacon.sequentially = function(delay, values) {
	    var index;
	    index = 0;
	    return withDescription(Bacon, "sequentially", delay, values, Bacon.fromPoll(delay, function() {
	      var value;
	      value = values[index++];
	      if (index < values.length) {
	        return value;
	      } else if (index === values.length) {
	        return [value, endEvent()];
	      } else {
	        return endEvent();
	      }
	    }));
	  };
	  Bacon.repeatedly = function(delay, values) {
	    var index;
	    index = 0;
	    return withDescription(Bacon, "repeatedly", delay, values, Bacon.fromPoll(delay, function() {
	      return values[index++ % values.length];
	    }));
	  };
	  Bacon.interval = function(delay, value) {
	    if (value == null) {
	      value = {};
	    }
	    return withDescription(Bacon, "interval", delay, value, Bacon.fromPoll(delay, function() {
	      return nextEvent(value);
	    }));
	  };
	  Bacon.EventStream.prototype.delay = function(delay) {
	    return withDescription(this, "delay", delay, this.flatMap(function(value) {
	      return Bacon.later(delay, value);
	    }));
	  };
	  Bacon.Property.prototype.delay = function(delay) {
	    return this.delayChanges("delay", delay, function(changes) {
	      return changes.delay(delay);
	    });
	  };
	  Bacon.Property.prototype.delayChanges = function() {
	    var desc,
	        f,
	        _i;
	    desc = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), f = arguments[_i++];
	    return withDescription.apply(null, [this].concat(__slice.call(desc), [addPropertyInitValueToStream(this, f(this.changes()))]));
	  };
	  Bacon.EventStream.prototype.debounce = function(delay) {
	    return withDescription(this, "debounce", delay, this.flatMapLatest(function(value) {
	      return Bacon.later(delay, value);
	    }));
	  };
	  Bacon.Property.prototype.debounce = function(delay) {
	    return this.delayChanges("debounce", delay, function(changes) {
	      return changes.debounce(delay);
	    });
	  };
	  Bacon.EventStream.prototype.debounceImmediate = function(delay) {
	    return withDescription(this, "debounceImmediate", delay, this.flatMapFirst(function(value) {
	      return Bacon.once(value).concat(Bacon.later(delay).filter(false));
	    }));
	  };
	  Bacon.Observable.prototype.scan = function(seed, f) {
	    var acc,
	        resultProperty,
	        subscribe;
	    f = toCombinator(f);
	    acc = toOption(seed);
	    subscribe = (function(_this) {
	      return function(sink) {
	        var initSent,
	            reply,
	            sendInit,
	            unsub;
	        initSent = false;
	        unsub = nop;
	        reply = Bacon.more;
	        sendInit = function() {
	          if (!initSent) {
	            return acc.forEach(function(value) {
	              initSent = true;
	              reply = sink(new Initial(function() {
	                return value;
	              }));
	              if (reply === Bacon.noMore) {
	                unsub();
	                return unsub = nop;
	              }
	            });
	          }
	        };
	        unsub = _this.dispatcher.subscribe(function(event) {
	          var next,
	              prev;
	          if (event.hasValue()) {
	            if (initSent && event.isInitial()) {
	              return Bacon.more;
	            } else {
	              if (!event.isInitial()) {
	                sendInit();
	              }
	              initSent = true;
	              prev = acc.getOrElse(void 0);
	              next = f(prev, event.value());
	              acc = new Some(next);
	              return sink(event.apply(function() {
	                return next;
	              }));
	            }
	          } else {
	            if (event.isEnd()) {
	              reply = sendInit();
	            }
	            if (reply !== Bacon.noMore) {
	              return sink(event);
	            }
	          }
	        });
	        UpdateBarrier.whenDoneWith(resultProperty, sendInit);
	        return unsub;
	      };
	    })(this);
	    return resultProperty = new Property(describe(this, "scan", seed, f), subscribe);
	  };
	  Bacon.Observable.prototype.diff = function(start, f) {
	    f = toCombinator(f);
	    return withDescription(this, "diff", start, f, this.scan([start], function(prevTuple, next) {
	      return [next, f(prevTuple[0], next)];
	    }).filter(function(tuple) {
	      return tuple.length === 2;
	    }).map(function(tuple) {
	      return tuple[1];
	    }));
	  };
	  Bacon.Observable.prototype.doAction = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDescription(this, "doAction", f, this.withHandler(function(event) {
	      if (event.hasValue()) {
	        f(event.value());
	      }
	      return this.push(event);
	    }));
	  };
	  Bacon.Observable.prototype.endOnError = function() {
	    var args,
	        f;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (f == null) {
	      f = true;
	    }
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDescription(this, "endOnError", this.withHandler(function(event) {
	        if (event.isError() && f(event.error)) {
	          this.push(event);
	          return this.push(endEvent());
	        } else {
	          return this.push(event);
	        }
	      }));
	    });
	  };
	  valueAndEnd = (function(value) {
	    return [value, endEvent()];
	  });
	  Bacon.fromPromise = function(promise, abort) {
	    return withDescription(Bacon, "fromPromise", promise, Bacon.fromBinder(function(handler) {
	      promise.then(handler, function(e) {
	        return handler(new Error(e));
	      });
	      return function() {
	        if (abort) {
	          return typeof promise.abort === "function" ? promise.abort() : void 0;
	        }
	      };
	    }, valueAndEnd));
	  };
	  Bacon.Observable.prototype.mapError = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDescription(this, "mapError", f, this.withHandler(function(event) {
	      if (event.isError()) {
	        return this.push(nextEvent(f(event.error)));
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	  Bacon.Observable.prototype.flatMapError = function(fn) {
	    return withDescription(this, "flatMapError", fn, this.mapError(function(err) {
	      return new Error(err);
	    }).flatMap(function(x) {
	      if (x instanceof Error) {
	        return fn(x.error);
	      } else {
	        return Bacon.once(x);
	      }
	    }));
	  };
	  Bacon.EventStream.prototype.sampledBy = function(sampler, combinator) {
	    return withDescription(this, "sampledBy", sampler, combinator, this.toProperty().sampledBy(sampler, combinator));
	  };
	  Bacon.Property.prototype.sampledBy = function(sampler, combinator) {
	    var lazy,
	        result,
	        samplerSource,
	        stream,
	        thisSource;
	    if (combinator != null) {
	      combinator = toCombinator(combinator);
	    } else {
	      lazy = true;
	      combinator = function(f) {
	        return f.value();
	      };
	    }
	    thisSource = new Source(this, false, lazy);
	    samplerSource = new Source(sampler, true, lazy);
	    stream = Bacon.when([thisSource, samplerSource], combinator);
	    result = sampler instanceof Property ? stream.toProperty() : stream;
	    return withDescription(this, "sampledBy", sampler, combinator, result);
	  };
	  Bacon.Property.prototype.sample = function(interval) {
	    return withDescription(this, "sample", interval, this.sampledBy(Bacon.interval(interval, {})));
	  };
	  Bacon.Observable.prototype.map = function() {
	    var args,
	        p;
	    p = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (p instanceof Property) {
	      return p.sampledBy(this, former);
	    } else {
	      return convertArgsToFunction(this, p, args, function(f) {
	        return withDescription(this, "map", f, this.withHandler(function(event) {
	          return this.push(event.fmap(f));
	        }));
	      });
	    }
	  };
	  Bacon.Observable.prototype.fold = function(seed, f) {
	    return withDescription(this, "fold", seed, f, this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
	  };
	  Observable.prototype.reduce = Observable.prototype.fold;
	  Bacon.EventStream.prototype.merge = function(right) {
	    var left;
	    assertEventStream(right);
	    left = this;
	    return withDescription(left, "merge", right, Bacon.mergeAll(this, right));
	  };
	  Bacon.mergeAll = function() {
	    var streams;
	    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (isArray(streams[0])) {
	      streams = streams[0];
	    }
	    if (streams.length) {
	      return new EventStream(describe.apply(null, [Bacon, "mergeAll"].concat(__slice.call(streams))), function(sink) {
	        var ends,
	            sinks,
	            smartSink;
	        ends = 0;
	        smartSink = function(obs) {
	          return function(unsubBoth) {
	            return obs.dispatcher.subscribe(function(event) {
	              var reply;
	              if (event.isEnd()) {
	                ends++;
	                if (ends === streams.length) {
	                  return sink(endEvent());
	                } else {
	                  return Bacon.more;
	                }
	              } else {
	                reply = sink(event);
	                if (reply === Bacon.noMore) {
	                  unsubBoth();
	                }
	                return reply;
	              }
	            });
	          };
	        };
	        sinks = _.map(smartSink, streams);
	        return compositeUnsubscribe.apply(null, sinks);
	      });
	    } else {
	      return Bacon.never();
	    }
	  };
	  Bacon.Observable.prototype.take = function(count) {
	    if (count <= 0) {
	      return Bacon.never();
	    }
	    return withDescription(this, "take", count, this.withHandler(function(event) {
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else {
	        count--;
	        if (count > 0) {
	          return this.push(event);
	        } else {
	          if (count === 0) {
	            this.push(event);
	          }
	          this.push(endEvent());
	          return Bacon.noMore;
	        }
	      }
	    }));
	  };
	  Bacon.EventStream.prototype.holdWhen = function(valve) {
	    var putToHold,
	        releaseHold,
	        valve_;
	    valve_ = valve.startWith(false);
	    releaseHold = valve_.filter(function(x) {
	      return !x;
	    });
	    putToHold = valve_.filter(_.id);
	    return withDescription(this, "holdWhen", valve, this.filter(false).merge(valve_.flatMapConcat((function(_this) {
	      return function(shouldHold) {
	        if (!shouldHold) {
	          return _this.takeUntil(putToHold);
	        } else {
	          return _this.scan([], (function(xs, x) {
	            return xs.concat(x);
	          })).sampledBy(releaseHold).take(1).flatMap(Bacon.fromArray);
	        }
	      };
	    })(this))));
	  };
	  Bacon.$ = {};
	  Bacon.$.asEventStream = function(eventName, selector, eventTransformer) {
	    var _ref;
	    if (_.isFunction(selector)) {
	      _ref = [selector, void 0], eventTransformer = _ref[0], selector = _ref[1];
	    }
	    return withDescription(this.selector || this, "asEventStream", eventName, Bacon.fromBinder((function(_this) {
	      return function(handler) {
	        _this.on(eventName, selector, handler);
	        return function() {
	          return _this.off(eventName, selector, handler);
	        };
	      };
	    })(this), eventTransformer));
	  };
	  if ((_ref = typeof jQuery !== "undefined" && jQuery !== null ? jQuery : typeof Zepto !== "undefined" && Zepto !== null ? Zepto : void 0) != null) {
	    _ref.fn.asEventStream = Bacon.$.asEventStream;
	  }
	  Bacon.Observable.prototype.log = function() {
	    var args;
	    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    this.subscribe(function(event) {
	      return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log.apply(console, __slice.call(args).concat([event.log()])) : void 0 : void 0;
	    });
	    return this;
	  };
	  Bacon.retry = function(options) {
	    var delay,
	        isRetryable,
	        maxRetries,
	        retries,
	        retry,
	        source;
	    if (!_.isFunction(options.source)) {
	      throw new Exception("'source' option has to be a function");
	    }
	    source = options.source;
	    retries = options.retries || 0;
	    maxRetries = options.maxRetries || retries;
	    delay = options.delay || function() {
	      return 0;
	    };
	    isRetryable = options.isRetryable || function() {
	      return true;
	    };
	    retry = function(context) {
	      var delayedRetry,
	          nextAttemptOptions;
	      nextAttemptOptions = {
	        source: source,
	        retries: retries - 1,
	        maxRetries: maxRetries,
	        delay: delay,
	        isRetryable: isRetryable
	      };
	      delayedRetry = function() {
	        return Bacon.retry(nextAttemptOptions);
	      };
	      return Bacon.later(delay(context)).filter(false).concat(Bacon.once().flatMap(delayedRetry));
	    };
	    return withDescription(Bacon, "retry", options, source().flatMapError(function(e) {
	      if (isRetryable(e) && retries > 0) {
	        return retry({
	          error: e,
	          retriesDone: maxRetries - retries
	        });
	      } else {
	        return Bacon.once(new Error(e));
	      }
	    }));
	  };
	  Bacon.Observable.prototype.skip = function(count) {
	    return withDescription(this, "skip", count, this.withHandler(function(event) {
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else if (count > 0) {
	        count--;
	        return Bacon.more;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	  Bacon.EventStream.prototype.skipUntil = function(starter) {
	    var started;
	    started = starter.take(1).map(true).toProperty(false);
	    return withDescription(this, "skipUntil", starter, this.filter(started));
	  };
	  Bacon.EventStream.prototype.skipWhile = function() {
	    var args,
	        f,
	        ok;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    ok = false;
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDescription(this, "skipWhile", f, this.withHandler(function(event) {
	        if (ok || !event.hasValue() || !f(event.value())) {
	          if (event.hasValue()) {
	            ok = true;
	          }
	          return this.push(event);
	        } else {
	          return Bacon.more;
	        }
	      }));
	    });
	  };
	  Bacon.Observable.prototype.slidingWindow = function(n, minValues) {
	    if (minValues == null) {
	      minValues = 0;
	    }
	    return withDescription(this, "slidingWindow", n, minValues, this.scan([], (function(window, value) {
	      return window.concat([value]).slice(-n);
	    })).filter((function(values) {
	      return values.length >= minValues;
	    })));
	  };
	  Bacon.spy = function(spy) {
	    return spys.push(spy);
	  };
	  spys = [];
	  registerObs = function(obs) {
	    var spy,
	        _i,
	        _len;
	    if (spys.length) {
	      if (!registerObs.running) {
	        try {
	          registerObs.running = true;
	          for (_i = 0, _len = spys.length; _i < _len; _i++) {
	            spy = spys[_i];
	            spy(obs);
	          }
	        } finally {
	          delete registerObs.running;
	        }
	      }
	    }
	    return void 0;
	  };
	  Bacon.Property.prototype.startWith = function(value) {
	    return withDescription(this, "startWith", value, this.scan(value, function(prev, next) {
	      return next;
	    }));
	  };
	  Bacon.Observable.prototype.takeWhile = function() {
	    var args,
	        f;
	    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDescription(this, "takeWhile", f, this.withHandler(function(event) {
	        if (event.filter(f)) {
	          return this.push(event);
	        } else {
	          this.push(endEvent());
	          return Bacon.noMore;
	        }
	      }));
	    });
	  };
	  Bacon.EventStream.prototype.throttle = function(delay) {
	    return withDescription(this, "throttle", delay, this.bufferWithTime(delay).map(function(values) {
	      return values[values.length - 1];
	    }));
	  };
	  Bacon.Property.prototype.throttle = function(delay) {
	    return this.delayChanges("throttle", delay, function(changes) {
	      return changes.throttle(delay);
	    });
	  };
	  Bacon.update = function() {
	    var i,
	        initial,
	        lateBindFirst,
	        patterns;
	    initial = arguments[0], patterns = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    lateBindFirst = function(f) {
	      return function() {
	        var args;
	        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	        return function(i) {
	          return f.apply(null, [i].concat(args));
	        };
	      };
	    };
	    i = patterns.length - 1;
	    while (i > 0) {
	      if (!(patterns[i] instanceof Function)) {
	        patterns[i] = (function(x) {
	          return function() {
	            return x;
	          };
	        })(patterns[i]);
	      }
	      patterns[i] = lateBindFirst(patterns[i]);
	      i = i - 2;
	    }
	    return withDescription.apply(null, [Bacon, "update", initial].concat(__slice.call(patterns), [Bacon.when.apply(Bacon, patterns).scan(initial, (function(x, f) {
	      return f(x);
	    }))]));
	  };
	  Bacon.zipAsArray = function() {
	    var streams;
	    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    if (isArray(streams[0])) {
	      streams = streams[0];
	    }
	    return withDescription.apply(null, [Bacon, "zipAsArray"].concat(__slice.call(streams), [Bacon.zipWith(streams, function() {
	      var xs;
	      xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	      return xs;
	    })]));
	  };
	  Bacon.zipWith = function() {
	    var f,
	        streams,
	        _ref1;
	    f = arguments[0], streams = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    if (!_.isFunction(f)) {
	      _ref1 = [f, streams[0]], streams = _ref1[0], f = _ref1[1];
	    }
	    streams = _.map((function(s) {
	      return s.toEventStream();
	    }), streams);
	    return withDescription.apply(null, [Bacon, "zipWith", f].concat(__slice.call(streams), [Bacon.when(streams, f)]));
	  };
	  Bacon.Observable.prototype.zip = function(other, f) {
	    if (f == null) {
	      f = Array;
	    }
	    return withDescription(this, "zip", other, Bacon.zipWith([this, other], f));
	  };
	  if (("function" !== "undefined" && __webpack_require__(50) !== null) && (__webpack_require__(51) != null)) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Bacon;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    this.Bacon = Bacon;
	  } else if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
	    module.exports = Bacon;
	    Bacon.Bacon = Bacon;
	  } else {
	    this.Bacon = Bacon;
	  }
	}).call(this);
	
	//# sourceMappingURL=<compileOutput>
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(48)(module)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
	  if (!module.webpackPolyfill) {
	    module.deprecate = function() {};
	    module.paths = [];
	    module.children = [];
	    module.webpackPolyfill = 1;
	  }
	  return module;
	};
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
	  if (true)
	    module.exports = factory(__webpack_require__(52));
	  else if (typeof define === 'function' && define.amd)
	    define(["js-graph"], factory);
	  else if (typeof exports === 'object')
	    exports["DeltaModel"] = factory(require("js-graph"));
	  else
	    root["DeltaModel"] = factory(root["JsGraph"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
	  return (function(modules) {
	    var installedModules = {};
	    function __webpack_require__(moduleId) {
	      if (installedModules[moduleId])
	        return installedModules[moduleId].exports;
	      var module = installedModules[moduleId] = {
	        exports: {},
	        id: moduleId,
	        loaded: false
	      };
	      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	      module.loaded = true;
	      return module.exports;
	    }
	    __webpack_require__.m = modules;
	    __webpack_require__.c = installedModules;
	    __webpack_require__.p = "";
	    return __webpack_require__(0);
	  })([function(module, exports, __webpack_require__) {
	    var __WEBPACK_AMD_DEFINE_ARRAY__,
	        __WEBPACK_AMD_DEFINE_RESULT__;
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(JsGraph, U) {
	      'use strict';
	      var keepFirst = (function() {});
	      var keepSecond = (function(d1, p, d2) {
	        d1.operations[p] = d2;
	      });
	      var applySecondToFirstValue = (function(d1, p, d2) {
	        d2.applyTo(d1.operations[p], 'value');
	      });
	      function assertFunction(val, opType) {
	        U.assert(typeof val === 'function', ("The operation '" + opType + "' expects the property it acts on to be a function."));
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      var DeltaModel = U.newClass(function() {
	        var $__0 = this;
	        var _opTypes = {};
	        var _composeFns = [];
	        U.extend(this, {
	          _addOperationType: function($__4) {
	            var $__5 = $__4,
	                name = $__5.name,
	                constructor = $__5.constructor,
	                applyTo = $__5.applyTo,
	                prototype = $__5.prototype,
	                method = $__5.method;
	            var objectWithMethod = {};
	            _opTypes[name] = {
	              name: name,
	              Delta: constructor,
	              method: objectWithMethod[name]
	            };
	            U.extend(_opTypes[name].Delta.prototype, prototype, {
	              constructor: constructor,
	              type: name,
	              applyTo: applyTo
	            });
	            _opTypes['modify'].Delta.prototype[name] = U.isDefined(method) ? method : function(property) {
	              for (var values = [],
	                  $__1 = 1; $__1 < arguments.length; $__1++)
	                values[$__1 - 1] = arguments[$__1];
	              this._addOperation(_opTypes[name], property, values);
	              return this;
	            };
	          },
	          _addOperationAlias: function($__4) {
	            var $__5 = $__4,
	                name = $__5.name,
	                target = $__5.target,
	                transform = $__5.transform;
	            var objectWithMethod = {};
	            Object.defineProperty(objectWithMethod, name, {value: function(property) {
	                for (var values = [],
	                    $__1 = 1; $__1 < arguments.length; $__1++)
	                  values[$__1 - 1] = arguments[$__1];
	                this._addOperation(_opTypes[target], property, transform(values));
	                return this;
	              }});
	            _opTypes[name] = {
	              name: name,
	              method: objectWithMethod[name]
	            };
	            _opTypes['modify'].Delta.prototype[name] = _opTypes[name].method;
	          },
	          _addCompositionRule: function(op1Type, op2Type, composeFn) {
	            _composeFns.push({
	              op1Type: op1Type,
	              op2Type: op2Type,
	              composeFn: composeFn
	            });
	          },
	          _newDelta: function(type) {
	            for (var values = [],
	                $__1 = 1; $__1 < arguments.length; $__1++)
	              values[$__1 - 1] = arguments[$__1];
	            return U.applyConstructor(_opTypes[type].Delta, values);
	          }
	        });
	        var thisDM = this;
	        this._addOperationType({
	          name: 'modify',
	          constructor: function Modify() {
	            var deltaDescription = arguments[0] !== (void 0) ? arguments[0] : {};
	            var operations = arguments[1] !== (void 0) ? arguments[1] : {};
	            var $__0 = this;
	            this.operations = operations;
	            Object.keys(deltaDescription).forEach((function(key) {
	              var match = key.match(/^(\w+)\s+([\w\.]+)$/);
	              if (match) {
	                var operation = match[1];
	                var property = match[2];
	                U.assert(operation in _opTypes, ("I don't know the '" + operation + "' operation."));
	                $__0[operation](property, deltaDescription[key]);
	              }
	            }));
	          },
	          applyTo: function(obj, property) {
	            var $__0 = this;
	            if (U.isDefined(property)) {
	              U.assert(U.isDefined(obj[property]), "The 'modify' operation expects the property to be already defined.");
	              Object.keys(this.operations).forEach((function(subProperty) {
	                $__0.operations[subProperty].applyTo(obj[property], subProperty);
	              }));
	            } else {
	              U.assert(U.isDefined(obj), "The 'modify' operation expects the property to be already defined.");
	              Object.keys(this.operations).forEach((function(subProperty) {
	                $__0.operations[subProperty].applyTo(obj, subProperty);
	              }));
	            }
	          },
	          prototype: {
	            selectivelyApplyTo: function(obj, subProperty) {
	              U.assert(U.isDefined(obj), "The 'modify' operation expects the property to be already defined.");
	              if (U.isDefined(this.operations[subProperty])) {
	                this.operations[subProperty].applyTo(obj, subProperty);
	              }
	            },
	            compose: function(property, op2) {
	              var $__0 = this;
	              if (U.isUndefined(op2)) {
	                return this;
	              }
	              var foundComposeFn;
	              _composeFns.some((function($__4) {
	                var $__5 = $__4,
	                    op1Type = $__5.op1Type,
	                    op2Type = $__5.op2Type,
	                    composeFn = $__5.composeFn;
	                if ($__0.operations[property].type === op1Type && op2.type === op2Type) {
	                  foundComposeFn = composeFn;
	                  return true;
	                }
	              }));
	              if (foundComposeFn) {
	                foundComposeFn(this, property, op2);
	              } else {
	                var err = new Error(("You cannot follow a '" + this.operations[property].type + "' operation ") + ("with a '" + op2.type + "' operation on the same property."));
	                err.op1 = this.operations[property].type;
	                err.op2 = op2.type;
	                throw err;
	              }
	            },
	            _addOperation: function(opType, property, values) {
	              var dotIndex = property.indexOf('.');
	              if (dotIndex !== -1) {
	                var actualProperty = property.slice(0, dotIndex);
	                var restOfProperty = property.slice(dotIndex + 1);
	                var newModifyDelta = this._addOperation(_opTypes['modify'], actualProperty);
	                return newModifyDelta[opType.name].apply(newModifyDelta, [restOfProperty].concat(values));
	              } else {
	                var _newDelta = thisDM._newDelta.apply(thisDM, [opType.name].concat(values));
	                if (this.operations.hasOwnProperty(property) && U.isDefined(this.operations[property])) {
	                  this.compose(property, _newDelta);
	                } else {
	                  this.operations[property] = _newDelta;
	                }
	                return this.operations[property];
	              }
	            }
	          },
	          method: function(property, deltaDescription) {
	            return this._addOperation(_opTypes['modify'], property, [deltaDescription]);
	          }
	        });
	        this._addOperationType({
	          name: 'add',
	          constructor: function Add(value) {
	            this.value = value;
	          },
	          applyTo: function(obj, property) {
	            assertUndefined(obj[property], 'add');
	            obj[property] = this.value;
	          }
	        });
	        this._addOperationType({
	          name: 'replace',
	          constructor: function Replace(value) {
	            this.value = value;
	          },
	          applyTo: function(obj, property) {
	            assertDefined(obj[property], 'replace');
	            obj[property] = this.value;
	          }
	        });
	        this._addOperationType({
	          name: 'replaceAround',
	          constructor: function ReplaceAround(value) {
	            this.value = value;
	          },
	          applyTo: function(obj, property) {
	            assertDefined(obj[property], 'replaceAround');
	            obj[property] = this.value(obj[property]);
	          }
	        });
	        this._addOperationType({
	          name: 'remove',
	          constructor: function Remove() {},
	          applyTo: function(obj, property) {
	            assertDefined(obj[property], 'remove');
	            delete obj[property];
	          }
	        });
	        this._addOperationType({
	          name: 'forbid',
	          constructor: function Forbid() {},
	          applyTo: function(obj, property) {
	            assertUndefined(obj[property], 'forbid');
	          }
	        });
	        this._addCompositionRule('add', 'replace', (function(d1, p, d2) {
	          d1.operations[p] = DeltaModel._newDelta('add', d2.value);
	        }));
	        this._addCompositionRule('add', 'modify', applySecondToFirstValue);
	        this._addCompositionRule('add', 'remove', (function(d1, p) {
	          d1.operations[p] = DeltaModel._newDelta('forbid');
	        }));
	        this._addCompositionRule('replace', 'replace', keepSecond);
	        this._addCompositionRule('replace', 'modify', applySecondToFirstValue);
	        this._addCompositionRule('replace', 'remove', keepSecond);
	        this._addCompositionRule('modify', 'replace', keepSecond);
	        this._addCompositionRule('modify', 'modify', (function(d1, p, d2) {
	          Object.keys(d2.operations).forEach((function(prop) {
	            d1.compose(prop, d2.operations[prop]);
	          }));
	        }));
	        this._addCompositionRule('modify', 'remove', keepSecond);
	        this._addCompositionRule('remove', 'add', (function(d1, p, d2) {
	          d1.operations[p] = DeltaModel._newDelta('replace', d2.value);
	        }));
	        this._addCompositionRule('remove', 'forbid', keepFirst);
	        this._addCompositionRule('forbid', 'add', keepSecond);
	        this._addCompositionRule('forbid', 'forbid', keepFirst);
	        this._addOperationType({
	          name: 'alter',
	          constructor: function Alter(value, alias) {
	            this.value = value || [];
	            this.alias = alias || 'alter';
	          },
	          applyTo: function(obj, property) {
	            assertFunction(obj[property], this.alias);
	            this.value.forEach((function(subOp) {
	              var partOne = obj[property];
	              var partTwo = subOp.value;
	              if (subOp.type === 'prepend') {
	                obj[property] = function() {
	                  for (var args = [],
	                      $__2 = 0; $__2 < arguments.length; $__2++)
	                    args[$__2] = arguments[$__2];
	                  partTwo.apply(this, args);
	                  partOne.apply(this, args);
	                };
	              } else {
	                obj[property] = function() {
	                  for (var args = [],
	                      $__3 = 0; $__3 < arguments.length; $__3++)
	                    args[$__3] = arguments[$__3];
	                  partOne.apply(this, args);
	                  partTwo.apply(this, args);
	                };
	              }
	            }));
	          }
	        });
	        this._addCompositionRule('alter', 'alter', (function(d1, p, d2) {
	          [].push.apply(d1.operations[p].value, d2.value);
	        }));
	        this._addCompositionRule('alter', 'replace', keepSecond);
	        this._addCompositionRule('alter', 'remove', (function(d1, p) {
	          d1.operations[p] = DeltaModel._newDelta('forbid');
	        }));
	        this._addCompositionRule('add', 'alter', (function(d1, p, d2) {
	          assertFunction(d1.operations[p].value, d2.alias);
	          applySecondToFirstValue(d1, p, d2);
	        }));
	        this._addCompositionRule('replace', 'alter', (function(d1, p, d2) {
	          assertFunction(d1.operations[p].value, d2.alias);
	          applySecondToFirstValue(d1, p, d2);
	        }));
	        ['prepend', 'insert', 'append'].forEach((function(opType) {
	          $__0._addOperationAlias({
	            name: opType,
	            target: 'alter',
	            transform: (function(args) {
	              return [[{
	                type: opType,
	                value: args[0]
	              }], opType];
	            })
	          });
	        }));
	        this._addOperationType({
	          name: 'after',
	          constructor: function After(value) {
	            U.assert(typeof resolvePromise === 'function', "Before creating an 'after' operation, you must register a promise resolver with delta.js.");
	            this.value = value;
	          },
	          applyTo: function(obj, property) {
	            assertFunction(obj[property], 'after');
	            var partOne = obj[property];
	            var partTwo = this.value;
	            obj[property] = function() {
	              for (var args = [],
	                  $__2 = 0; $__2 < arguments.length; $__2++)
	                args[$__2] = arguments[$__2];
	              return resolvePromise(partOne.apply(this, args)).then(function() {
	                return partTwo.apply(this, args);
	              }.bind(this));
	            };
	          }
	        });
	        this._addCompositionRule('after', 'replace', keepSecond);
	        this._addCompositionRule('after', 'remove', keepSecond);
	        this._addCompositionRule('add', 'after', (function(d1, p, d2) {
	          assertFunction(d1.operations[p].value, 'after');
	          applySecondToFirstValue(d1, p, d2);
	        }));
	        this._addCompositionRule('replace', 'after', (function(d1, p, d2) {
	          assertFunction(d1.operations[p].value, 'after');
	          applySecondToFirstValue(d1, p, d2);
	        }));
	        this._addCompositionRule('insert', 'after', applySecondToFirstValue);
	        this._addCompositionRule('after', 'insert', applySecondToFirstValue);
	        var _graph = new JsGraph();
	        U.extend(this, {graph: function() {
	            return _graph;
	          }});
	        var _deltaConditions = {};
	        var _settledDeltaConditions = {};
	        var _conditionsUnsettled = false;
	        function _registerDisjunct(deltaName, disjunct) {
	          _conditionsUnsettled = true;
	          if (disjunct === true) {
	            _settledDeltaConditions[deltaName] = true;
	          } else if (disjunct === false) {} else if (_deltaConditions[deltaName] !== true) {
	            U.array(_deltaConditions, deltaName).push(disjunct);
	          }
	        }
	        function _settleConditions() {
	          if (_conditionsUnsettled) {
	            _conditionsUnsettled = false;
	            var somethingChanged;
	            do {
	              somethingChanged = false;
	              _graph.eachVertex((function(deltaName) {
	                if (_settledDeltaConditions[deltaName]) {
	                  return;
	                }
	                if (U.isUndefined(_deltaConditions[deltaName])) {
	                  return;
	                }
	                if (_deltaConditions[deltaName].some((function(disjunct) {
	                  return disjunct.every((function(conjunct) {
	                    return _settledDeltaConditions[conjunct];
	                  }));
	                }))) {
	                  _settledDeltaConditions[deltaName] = true;
	                  somethingChanged = true;
	                }
	              }));
	            } while (somethingChanged);
	          }
	        }
	        this.Delta = U.newSubclass(_opTypes['modify'].Delta, function Delta(superFn, deltaName) {
	          var options = arguments[2] !== (void 0) ? arguments[2] : {};
	          superFn.call(this, options);
	          U.assert(options instanceof Object, "A delta should be given as an object.");
	          Object.defineProperties(this, {
	            name: {get: function() {
	                return deltaName;
	              }},
	            manuallySelectable: {get: function() {
	                if (U.isDefined(options['manuallySelectable'])) {
	                  return !!options['manuallySelectable'];
	                } else if (U.isDefined(options['resolves']) && options['resolves'].length > 0) {
	                  return false;
	                } else {
	                  return true;
	                }
	              }},
	            selected: {get: function() {
	                _settleConditions();
	                return !!_settledDeltaConditions[deltaName];
	              }},
	            if: {get: function() {
	                if (options['if'] === true || options['if'] === false) {
	                  return options['if'];
	                } else if (options['if'] || options['iff'] || options['resolves']) {
	                  return [].concat(options['if'] || [], options['iff'] || [], options['resolves'] || []);
	                } else {
	                  return false;
	                }
	              }},
	            onlyIf: {get: function() {
	                if (options['onlyIf'] === true || options['onlyIf'] === false) {
	                  return options['onlyIf'];
	                } else if (options['onlyIf'] || options['iff'] || options['expects'] || options['resolves']) {
	                  return [].concat(options['onlyIf'] || [], options['iff'] || [], options['expects'] || [], options['resolves'] || []);
	                } else {
	                  return true;
	                }
	              }},
	            appliedAfter: {get: function() {
	                return [].concat(options['appliedAfter'] || [], options['expects'] || [], options['resolves'] || [], options['requires'] || []);
	              }},
	            selects: {get: function() {
	                return [].concat(options['selects'] || [], options['requires'] || []);
	              }}
	          });
	          _conditionsUnsettled = true;
	          if (U.isDefined(this.if)) {
	            _registerDisjunct(deltaName, this.if);
	          }
	          this.selects.forEach((function(otherDeltaName) {
	            _registerDisjunct(otherDeltaName, [deltaName]);
	          }));
	          _graph.addVertex(deltaName, this);
	          this.appliedAfter.forEach((function(otherDeltaName) {
	            _graph.createEdge(otherDeltaName, deltaName);
	          }));
	          U.assert(!_graph.hasCycle(), ("The delta " + deltaName + " introduced a cycle in the application order."));
	        });
	        U.extend(this, {
	          select: function() {
	            for (var deltaNames = [],
	                $__2 = 0; $__2 < arguments.length; $__2++)
	              deltaNames[$__2] = arguments[$__2];
	            deltaNames.forEach((function(deltaName) {
	              _registerDisjunct(deltaName, true);
	            }));
	          },
	          vp: function(vpName, val) {
	            var obj = {};
	            obj[vpName] = val;
	            _settleConditions();
	            _graph.eachVertex((function(name, delta) {
	              U.assert(!delta.selected || delta.onlyIf === true || delta.onlyIf.every((function(d) {
	                return _graph.vertexValue(d).selected;
	              })), ("The 'onlyIf' condition of delta '" + delta.name + "' was violated."));
	            }));
	            _graph.topologically((function(name, delta) {
	              if (delta.selected) {
	                delta.selectivelyApplyTo(obj, vpName);
	              }
	            }));
	            return obj[vpName];
	          }
	        });
	      });
	      var resolvePromise = null;
	      U.extend(DeltaModel, {registerPromiseResolver: function(promiseResolverFn) {
	          resolvePromise = promiseResolverFn;
	        }});
	      return DeltaModel;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }, function(module, exports, __webpack_require__) {
	    module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
	  }, function(module, exports, __webpack_require__) {
	    var __WEBPACK_AMD_DEFINE_RESULT__;
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      'use strict';
	      var U = {
	        newClass: function(constructor, prototype) {
	          prototype = prototype || {};
	          var cls = function() {
	            for (var args = [],
	                $__0 = 0; $__0 < arguments.length; $__0++)
	              args[$__0] = arguments[$__0];
	            constructor.apply(this, args);
	          };
	          cls.prototype = prototype;
	          cls.prototype.constructor = cls;
	          return cls;
	        },
	        newSubclass: function(superClass, constructor, prototype) {
	          prototype = prototype || {};
	          var cls = function() {
	            for (var args = [],
	                $__0 = 0; $__0 < arguments.length; $__0++)
	              args[$__0] = arguments[$__0];
	            constructor.apply(this, [superClass.prototype.constructor].concat(args));
	          };
	          cls.prototype = Object.create(superClass.prototype, prototype);
	          cls.prototype.constructor = cls;
	          return cls;
	        },
	        extend: function(obj1) {
	          for (var rest = [],
	              $__0 = 1; $__0 < arguments.length; $__0++)
	            rest[$__0 - 1] = arguments[$__0];
	          rest.forEach((function(obj) {
	            for (var key in obj) {
	              if (obj.hasOwnProperty(key)) {
	                obj1[key] = obj[key];
	              }
	            }
	          }));
	          return obj1;
	        },
	        array: function(obj, name) {
	          if (U.isUndefined(obj[name])) {
	            obj[name] = [];
	          }
	          return obj[name];
	        },
	        bindA: function(fn, ctx, args) {
	          return fn.bind.apply(fn, [ctx].concat(args));
	        },
	        bind: function(obj, m) {
	          for (var args = [],
	              $__1 = 2; $__1 < arguments.length; $__1++)
	            args[$__1 - 2] = arguments[$__1];
	          return U.bindA(obj[m], obj, args);
	        },
	        applyConstructor: function(ConstructorFn, args) {
	          var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
	          return new NewConstructorFn();
	        },
	        assert: function(condition, message) {
	          if (!condition) {
	            throw new Error(message || "Assertion failed");
	          }
	        },
	        isUndefined: function(val) {
	          return typeof val === 'undefined';
	        },
	        isDefined: function(val) {
	          return typeof val !== 'undefined';
	        }
	      };
	      return U;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }]);
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	(function(root, name, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root[name] = factory();
	  }
	}(this, 'JsGraph', function() {
	  function JsGraph() {
	    var that = this;
	    var _vertices = {};
	    var _edges = {};
	    var _reverseEdges = {};
	    var _vertexCount = 0;
	    var _edgeCount = 0;
	    var _addVertexCallbacks = new Callbacks();
	    var _removeVertexCallbacks = new Callbacks();
	    that.onAddVertex = _addVertexCallbacks.add;
	    that.onRemoveVertex = _removeVertexCallbacks.add;
	    that.addNewVertex = function(key, value) {
	      if (that.hasVertex(key)) {
	        throw new JsGraph.VertexExistsError(key, _vertices[key]);
	      }
	      _vertices[key] = value;
	      _edges[key] = {};
	      _reverseEdges[key] = {};
	      _vertexCount += 1;
	      _addVertexCallbacks.fire(key, value);
	    };
	    that.setVertex = function(key, value) {
	      if (!that.hasVertex(key)) {
	        throw new JsGraph.VertexNotExistsError(key);
	      }
	      _vertices[key] = value;
	    };
	    that.ensureVertex = function(key, value) {
	      if (!that.hasVertex(key)) {
	        that.addNewVertex(key, value);
	      }
	    };
	    that.addVertex = function(key, value) {
	      if (that.hasVertex(key)) {
	        that.setVertex(key, value);
	      } else {
	        that.addNewVertex(key, value);
	      }
	    };
	    that.removeExistingVertex = function(key) {
	      if (!that.hasVertex(key)) {
	        throw new JsGraph.VertexNotExistsError(key);
	      }
	      if (Object.keys(_edges[key]).length) {
	        throw new JsGraph.HasConnectedEdgesError(key);
	      }
	      if (Object.keys(_reverseEdges[key]).length) {
	        throw new JsGraph.HasConnectedEdgesError(key);
	      }
	      var valueOfRemovedVertex = _vertices[key];
	      delete _vertices[key];
	      _vertexCount -= 1;
	      _removeVertexCallbacks.fire(key, valueOfRemovedVertex);
	    };
	    that.destroyExistingVertex = function(key) {
	      if (!that.hasVertex(key)) {
	        throw new JsGraph.VertexNotExistsError(key);
	      }
	      that.eachVertexFrom(key, function(to) {
	        that.removeEdge(key, to);
	      });
	      that.eachVertexTo(key, function(from) {
	        that.removeEdge(from, key);
	      });
	      that.removeExistingVertex(key);
	    };
	    that.removeVertex = function(key) {
	      if (that.hasVertex(key)) {
	        that.removeExistingVertex(key);
	      }
	    };
	    that.destroyVertex = function(key) {
	      if (that.hasVertex(key)) {
	        that.destroyExistingVertex(key);
	      }
	    };
	    var _addEdgeCallbacks = new Callbacks();
	    var _removeEdgeCallbacks = new Callbacks();
	    that.onAddEdge = _addEdgeCallbacks.add;
	    that.onRemoveEdge = _removeEdgeCallbacks.add;
	    that.addNewEdge = function(from, to, value) {
	      if (that.hasEdge(from, to)) {
	        throw new JsGraph.EdgeExistsError(from, to, that.edgeValue(from, to));
	      }
	      if (!that.hasVertex(from)) {
	        if (that.hasVertex(to)) {
	          throw new JsGraph.VertexNotExistsError(from);
	        } else {
	          throw new JsGraph.VertexNotExistsError(from).v(to);
	        }
	      } else if (!that.hasVertex(to)) {
	        throw new JsGraph.VertexNotExistsError(to);
	      }
	      _edges[from][to] = value;
	      _reverseEdges[to][from] = null;
	      _edgeCount += 1;
	      _addEdgeCallbacks.fire(from, to, value);
	    };
	    that.createNewEdge = function(from, to, value) {
	      if (that.hasEdge(from, to)) {
	        throw new JsGraph.EdgeExistsError(from, to, that.edgeValue(from, to));
	      }
	      that.ensureVertex(from);
	      that.ensureVertex(to);
	      that.addNewEdge(from, to, value);
	    };
	    that.setEdge = function(from, to, value) {
	      if (!that.hasEdge(from, to)) {
	        throw new JsGraph.EdgeNotExistsError(from, to);
	      }
	      _edges[from][to] = value;
	    };
	    that.spanEdge = function(from, to, value) {
	      if (!that.hasVertex(from)) {
	        if (that.hasVertex(to)) {
	          throw new JsGraph.VertexNotExistsError(from);
	        } else {
	          throw new JsGraph.VertexNotExistsError(from).v(to);
	        }
	      } else if (!that.hasVertex(to)) {
	        throw new JsGraph.VertexNotExistsError(to);
	      }
	      if (!that.hasEdge(from, to)) {
	        that.addNewEdge(from, to, value);
	      }
	    };
	    that.addEdge = function(from, to, value) {
	      if (that.hasEdge(from, to)) {
	        that.setEdge(from, to, value);
	      } else {
	        that.addNewEdge(from, to, value);
	      }
	    };
	    that.ensureEdge = function(from, to, value) {
	      if (!that.hasEdge(from, to)) {
	        that.createNewEdge(from, to, value);
	      }
	    };
	    that.createEdge = function(from, to, value) {
	      if (that.hasEdge(from, to)) {
	        that.setEdge(from, to, value);
	      } else {
	        that.createNewEdge(from, to, value);
	      }
	    };
	    that.removeExistingEdge = function(from, to) {
	      if (!that.hasEdge(from, to)) {
	        throw new JsGraph.EdgeNotExistsError(from, to);
	      }
	      var valueOfRemovedEdge = _edges[from][to];
	      delete _edges[from][to];
	      delete _reverseEdges[to][from];
	      _edgeCount -= 1;
	      _removeEdgeCallbacks.fire(from, to, valueOfRemovedEdge);
	    };
	    that.removeEdge = function(from, to) {
	      if (that.hasEdge(from, to)) {
	        that.removeExistingEdge(from, to);
	      }
	    };
	    that.vertexCount = function() {
	      return _vertexCount;
	    };
	    that.hasVertex = function(key) {
	      return key in _vertices;
	    };
	    that.vertexValue = function(key) {
	      return _vertices[key];
	    };
	    that.edgeCount = function() {
	      return _edgeCount;
	    };
	    that.hasEdge = function(from, to) {
	      return that.hasVertex(from) && that.hasVertex(to) && from in _edges && to in _edges[from];
	    };
	    that.edgeValue = function(from, to) {
	      return that.hasEdge(from, to) ? _edges[from][to] : undefined;
	    };
	    that.successors = function(from) {
	      if (!that.hasVertex(from)) {
	        throw new JsGraph.VertexNotExistsError(from);
	      }
	      return Object.keys(_edges[from]);
	    };
	    that.predecessors = function(to) {
	      if (!that.hasVertex(to)) {
	        throw new JsGraph.VertexNotExistsError(to);
	      }
	      return Object.keys(_reverseEdges[to]);
	    };
	    that.eachVertex = function(handler) {
	      Object.keys(_vertices).every(function(key) {
	        var r = handler(key, _vertices[key]);
	        return (r !== false);
	      });
	    };
	    that.eachVertexFrom = function(from, handler) {
	      if (!that.hasVertex(from)) {
	        throw new JsGraph.VertexNotExistsError(from);
	      }
	      Object.keys(_edges[from]).every(function(to) {
	        var r = handler(to, that.vertexValue(to), that.edgeValue(from, to));
	        return (r !== false);
	      });
	    };
	    that.eachVertexTo = function(to, handler) {
	      if (!that.hasVertex(to)) {
	        throw new JsGraph.VertexNotExistsError(to);
	      }
	      Object.keys(_reverseEdges[to]).every(function(from) {
	        var r = handler(from, that.vertexValue(from), that.edgeValue(from, to));
	        return (r !== false);
	      });
	    };
	    that.eachEdge = function(handler) {
	      Object.keys(_edges).every(function(from) {
	        return Object.keys(_edges[from]).every(function(to) {
	          var r = handler(from, to, _edges[from][to]);
	          return (r !== false);
	        });
	      });
	    };
	    that.clearEdges = function() {
	      that.eachEdge(that.removeEdge);
	    };
	    that.clear = function() {
	      that.eachVertex(that.destroyVertex);
	    };
	    that.hasCycle = function() {
	      var visited = {};
	      var handled = {};
	      var cycleFound = false;
	      function visit(a) {
	        if (visited[a]) {
	          cycleFound = true;
	          return;
	        }
	        if (handled[a]) {
	          return;
	        }
	        handled[a] = true;
	        visited[a] = true;
	        that.eachVertexFrom(a, function(b) {
	          visit(b);
	          if (cycleFound) {
	            return false;
	          }
	        });
	        visited[a] = false;
	      }
	      that.eachVertex(function(a) {
	        visit(a);
	        if (cycleFound) {
	          return false;
	        }
	      });
	      return cycleFound;
	    };
	    that.hasPath = function(from, to) {
	      if (!that.hasVertex(from) || !that.hasVertex(to)) {
	        return false;
	      }
	      var visited = {};
	      function hasPathAux(current) {
	        if (that.hasEdge(current, to)) {
	          return true;
	        }
	        visited[current] = true;
	        var found = false;
	        that.eachVertexFrom(current, function(next) {
	          if (!found && !visited[next] && hasPathAux(next)) {
	            found = true;
	          }
	        });
	        delete visited[current];
	        return found;
	      }
	      return hasPathAux(from);
	    };
	    that.topologically = function(handler) {
	      var visited = [];
	      var handled = {};
	      function visit(a) {
	        visited.push(a);
	        var i = visited.indexOf(a);
	        if (i !== visited.length - 1) {
	          var cycle = visited.slice(i + 1).reverse();
	          throw new JsGraph.CycleError(cycle);
	        }
	        if (!handled[a]) {
	          that.eachVertexTo(a, visit);
	          handled[a] = {returned: handler(a, that.vertexValue(a))};
	        }
	        visited.pop();
	      }
	      that.eachVertex(function(a) {
	        if (!handled[a]) {
	          visit(a);
	        }
	      });
	    };
	    that.transitiveReduction = function() {
	      var result = new JsGraph();
	      that.eachVertex(function(key, val) {
	        result.addVertex(key, val);
	      });
	      that.eachEdge(function(from, to, val) {
	        result.addEdge(from, to, val);
	      });
	      result.eachVertex(function(x) {
	        result.eachVertex(function(y) {
	          if (result.hasEdge(x, y)) {
	            result.eachVertex(function(z) {
	              if (result.hasPath(y, z)) {
	                result.removeEdge(x, z);
	              }
	            });
	          }
	        });
	      });
	      return result;
	    };
	  }
	  function set2dObj(A, one, two, val) {
	    if (typeof A[one] === 'undefined') {
	      A[one] = {};
	    }
	    A[one][two] = val;
	  }
	  function Callbacks() {
	    var callbacks = [];
	    this.add = function(fn) {
	      if (callbacks.indexOf(fn) === -1) {
	        callbacks.push(fn);
	      }
	      return function removeCallback() {
	        var index = callbacks.indexOf(fn);
	        if (index !== -1) {
	          callbacks.splice(index, 1);
	        }
	      };
	    };
	    this.fire = function() {
	      var args = arguments;
	      callbacks.forEach(function(fn) {
	        fn.apply(null, args);
	      });
	    };
	  }
	  function newError(name, constructor) {
	    constructor.prototype.__proto__ = Error.prototype;
	    constructor.prototype.constructor = constructor;
	    constructor.prototype.name = name;
	    return constructor;
	  }
	  JsGraph.VertexExistsError = newError("VertexExistsError", function(key, value) {
	    var that = this;
	    function refreshMessage() {
	      that.message = "This graph has " + (that.vertices === 1 ? "a vertex" : "vertices") + " '" + Object.keys(that.vertices).join("', '") + "'";
	    }
	    that.v = function(key, value) {
	      that.vertices[key] = value;
	      refreshMessage();
	      return that;
	    };
	    that.vertices = {};
	    that.v(key, value);
	    refreshMessage();
	  });
	  JsGraph.VertexNotExistsError = newError("VertexNotExistError", function(key) {
	    var that = this;
	    function refreshMessage() {
	      that.message = "This graph does not have " + (that.vertices === 1 ? "a vertex" : "vertices") + " '" + Object.keys(that.vertices).join("', '") + "'";
	    }
	    that.v = function(key) {
	      that.vertices[key] = undefined;
	      refreshMessage();
	      return that;
	    };
	    that.vertices = {};
	    that.v(key);
	    refreshMessage();
	  });
	  JsGraph.EdgeExistsError = newError("EdgeExistsError", function(from, to, value) {
	    var that = this;
	    function refreshMessage() {
	      var edges = [];
	      Object.keys(that.edges).forEach(function(from) {
	        Object.keys(that.edges[from]).forEach(function(to) {
	          edges.push("('" + from + "', '" + to + "')");
	        });
	      });
	      that.message = "This graph has " + (edges.length === 1 ? "an edge " : "edges ") + edges.join(", ");
	    }
	    that.e = function(from, to, value) {
	      set2dObj(that.edges, from, to, value);
	      refreshMessage();
	      return that;
	    };
	    that.edges = {};
	    that.e(from, to, value);
	    refreshMessage();
	  });
	  JsGraph.EdgeNotExistsError = newError("EdgeNotExistError", function(from, to) {
	    var that = this;
	    function refreshMessage() {
	      var edges = [];
	      Object.keys(that.edges).forEach(function(from) {
	        Object.keys(that.edges[from]).forEach(function(to) {
	          edges.push("('" + from + "', '" + to + "')");
	        });
	      });
	      that.message = "This graph does not have " + (edges.length === 1 ? "an edge " : "edges ") + edges.join(", ");
	    }
	    that.e = function(from, to) {
	      set2dObj(that.edges, from, to, undefined);
	      refreshMessage();
	      return that;
	    };
	    that.edges = {};
	    that.e(from, to);
	    refreshMessage();
	  });
	  JsGraph.HasConnectedEdgesError = newError("HasConnectedEdgesError", function(key) {
	    this.message = "The '" + key + "' vertex has connected edges";
	    this.key = key;
	  });
	  JsGraph.CycleError = newError("CycleError", function(cycle) {
	    this.message = "This graph contains a cycle: " + cycle;
	    this.cycle = cycle;
	  });
	  return JsGraph;
	}));
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])