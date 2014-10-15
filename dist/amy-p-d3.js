(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("d3")) : factory(root["jQuery"], root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, d3, U, uniqueId) {
	  'use strict';
	  $.circuitboard.plugin({
	    name: 'd3',
	    after: ['circuitboard-core', 'tilemap-core', 'tile-core'],
	    'modify circuitboard': {
	      'add _p_d3_vertices': {},
	      'add _p_d3_edges': {},
	      'insert constructor': function() {
	        var $__0 = this;
	        var svgElement = $('<svg class="d3">').appendTo(this.element);
	        U.makePositioned(this.element);
	        var force = d3.layout.force().nodes(U.objValues(this._p_d3_vertices)).links(U.objValues(this._p_d3_edges)).size([this.width, this.height]).gravity(0).charge(function(d) {
	          return -0.025 * d.group.chargeFactor * d.group.region.width * d.group.region.height * (U.defOr(d.chargeFactor, 1)) / (d.group.vertices.length || 1);
	        }).linkDistance(function(d) {
	          return 0.01 * d.group.linkDistanceFactor * d.group.region.width * d.group.region.height * (U.defOr(d.linkDistanceFactor, 1)) / (d.group.vertices.length || 1);
	        }).linkStrength(0.8);
	        this.on('size', (function(size) {
	          force.size([size.width, size.height]);
	        }));
	        var svg = d3.select(svgElement[0]);
	        var edges = svg.selectAll('.edge');
	        var vertices = svg.selectAll('.vertex');
	        var visibleVertices,
	            visibleEdges;
	        this.updateGraph = U.debounce((function() {
	          visibleVertices = U.objValues($__0._p_d3_vertices).filter((function(artefact) {
	            return artefact.showVertex;
	          }));
	          visibleEdges = U.objValues($__0._p_d3_edges);
	          force.nodes(visibleVertices).links(visibleEdges).start();
	          vertices = svg.selectAll('.vertex').data(visibleVertices, U.field('graphId'));
	          vertices.enter().append((function(d) {
	            return d.element;
	          })).classed('vertex', true).classed('edge', false).call(force.drag);
	          vertices.exit().remove();
	          edges = svg.selectAll('.edge').data(visibleEdges, U.field('graphId'));
	          edges.enter().append((function(d) {
	            return d.element;
	          })).classed('edge', true).classed('vertex', false);
	          edges.exit().remove();
	          svg.selectAll('.vertex, .edge').sort((function(a, b) {
	            return (a.graphZIndex < b.graphZIndex) ? -1 : ((a.graphZIndex === b.graphZIndex) ? 0 : 1);
	          }));
	        }), 200);
	        force.on("tick", (function(e) {
	          var k = 0.1 * e.alpha;
	          visibleVertices.forEach(function(d) {
	            if (d.group.regionType === 'rectangular') {
	              d.x += d.group.gravityFactor * (d.group.region.left + 0.5 * d.group.region.width - d.x) * k;
	              d.y += d.group.gravityFactor * (d.group.region.top + 0.5 * d.group.region.height - d.y) * k;
	              d.x = Math.max(d.x, d.group.region.left);
	              d.x = Math.min(d.x, d.group.region.left + d.group.region.width);
	              d.y = Math.max(d.y, d.group.region.top);
	              d.y = Math.min(d.y, d.group.region.top + d.group.region.height);
	            } else {
	              var pos = (d.groupVertexIndex + 1) / (d.group.vertices.length + 1);
	              d.x = pos * d.group.region.source.x + (1 - pos) * d.group.region.target.x;
	              d.y = pos * d.group.region.source.y + (1 - pos) * d.group.region.target.y;
	            }
	          });
	          vertices.attr('x', (function(d) {
	            return d.x;
	          })).attr('y', (function(d) {
	            return d.y;
	          }));
	          edges.attr("x1", (function(d) {
	            return d.source.x;
	          })).attr("y1", (function(d) {
	            return d.source.y;
	          })).attr("x2", (function(d) {
	            return d.target.x;
	          })).attr("y2", (function(d) {
	            return d.target.y;
	          }));
	        }));
	        $.extend(this, {newGraphGroup: function() {
	            var tile = this;
	            var group = {
	              id: uniqueId('group'),
	              vertices: [],
	              edges: [],
	              gravityFactor: 1,
	              chargeFactor: 1,
	              linkDistanceFactor: 1,
	              region: {
	                top: 10,
	                left: 10,
	                get width() {
	                  return tile.width - 20;
	                },
	                get height() {
	                  return tile.height - 20;
	                }
	              },
	              get regionType() {
	                return (U.isDefined(group.region.source) ? 'linear' : 'rectangular');
	              }
	            };
	            return {
	              remove: function() {},
	              setGravityFactor: function(factor) {
	                group.gravityFactor = factor;
	              },
	              setChargeFactor: function(factor) {
	                group.chargeFactor = factor;
	              },
	              setLinkDistanceFactor: function(factor) {
	                group.linkDistanceFactor = factor;
	              },
	              setRegion: function(region) {
	                group.region = region;
	                tile.updateGraph();
	              },
	              addVertex: function(vertex) {
	                vertex.group = group;
	                vertex.groupVertexIndex = group.vertices.length;
	                group.vertices.push(vertex);
	                vertex.graphId = vertex.id;
	                tile._p_d3_vertices[vertex.graphId] = vertex;
	                tile.updateGraph();
	              },
	              removeVertex: function(vertex) {
	                if (vertex) {
	                  delete tile._p_d3_vertices[vertex.graphId];
	                  U.pull(group.vertices, vertex);
	                  group.vertices.forEach(function(vertex, i) {
	                    vertex.groupVertexIndex = i;
	                  });
	                  tile.updateGraph();
	                }
	              },
	              addEdge: function(edge) {
	                edge.group = group;
	                group.edges.push(edge);
	                edge.graphId = group.id + ':' + edge.id;
	                tile._p_d3_edges[edge.graphId] = edge;
	                tile.updateGraph();
	              },
	              removeEdge: function(edge) {
	                if (edge) {
	                  delete tile._p_d3_edges[edge.graphId];
	                  U.pull(group.edges, edge);
	                  tile.updateGraph();
	                }
	              },
	              removeAllEdgesAndVertices: function() {
	                group.edges.forEach((function(edge) {
	                  if (edge) {
	                    delete tile._p_d3_edges[edge.graphId];
	                  }
	                }));
	                group.vertices.forEach((function(vertex) {
	                  if (vertex) {
	                    delete tile._p_d3_vertices[vertex.graphId];
	                  }
	                }));
	                U.makeEmpty(group.edges);
	                U.makeEmpty(group.vertices);
	                tile.updateGraph();
	              },
	              vertexCount: function() {
	                return group.vertices.length;
	              },
	              vertices: function() {
	                return group.vertices.slice();
	              },
	              edges: function() {
	                return group.vertices.slice();
	              }
	            };
	          }});
	      },
	      'add updateGraph': null,
	      'add newGraphGroup': null
	    },
	    'modify tile': {'insert constructor': function() {
	        var $__0 = this;
	        var graphGroup = this.circuitboard.newGraphGroup();
	        this.on('destroy', (function() {
	          graphGroup.remove();
	        }));
	        var setGraphGroupRegion = (function() {
	          graphGroup.setRegion($.extend({}, $__0.position, $__0.size));
	        });
	        graphGroup.setGravityFactor(1);
	        graphGroup.setChargeFactor(0.1);
	        this.on('size', setGraphGroupRegion);
	        this.on('position', setGraphGroupRegion);
	        var protein1 = {
	          id: this.id + ':' + 'protein1',
	          showVertex: true,
	          graphZIndex: 200,
	          get element() {
	            return $('<svg x="10" y="10"><circle class="example core" r="5"></circle></svg>')[0];
	          }
	        };
	        var protein2 = {
	          id: this.id + ':' + 'protein2',
	          showVertex: true,
	          graphZIndex: 200,
	          get element() {
	            return $('<svg x="10" y="10"><circle class="example core" r="5"></circle></svg>')[0];
	          }
	        };
	        graphGroup.addVertex(protein1);
	        graphGroup.addVertex(protein2);
	        graphGroup.addEdge({
	          get element() {
	            return $('<svg><line class="example edge"></line></svg>').children()[0];
	          },
	          source: protein1,
	          target: protein2,
	          graphZIndex: 100
	        });
	      }}
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var U = {
	    approx: function(val1, val2, epsilon) {
	      if (U.isUndefined(epsilon)) {
	        epsilon = 1e-5;
	      }
	      return (Math.abs(val1 - val2) < epsilon);
	    },
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    object: function(obj, name) {
	      if (!$.isPlainObject(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (!$.isArray(obj[name])) {
	        obj[name] = [];
	      }
	      return obj[name];
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
	          $__0 = 2; $__0 < arguments.length; $__0++)
	        args[$__0 - 2] = arguments[$__0];
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
	          $__1 = 0; $__1 < arguments.length; $__1++)
	        values[$__1] = arguments[$__1];
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
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          args[$__2] = arguments[$__2];
	        var laterFn = (function() {
	          timeout = null;
	          func.apply(context, args);
	        });
	        clearTimeout(timeout);
	        timeout = setTimeout(laterFn, wait);
	      };
	    },
	    oncePerStack: function(func, context) {
	      var notRunYet = true;
	      return function() {
	        for (var args = [],
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          args[$__2] = arguments[$__2];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context, args);
	        }
	      };
	    },
	    cached: function(options) {
	      var retrieve = options.retrieve,
	          isEqual = options.isEqual || ((function(a, b) {
	            return (a === b);
	          }));
	      var cache;
	      function setValue() {
	        var oldValue = cache;
	        cache = retrieve();
	        if (onChange && !isEqual(cache, oldValue)) {
	          onChange(cache, oldValue);
	        }
	      }
	      setTimeout(setValue, 0);
	      var oncePerStackSetValue = U.oncePerStack(setValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange;
	      resultFn.onChange = (function(cb) {
	        onChange = cb;
	        return resultFn;
	      });
	      return resultFn;
	    }
	  };
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  function id(x) {
	    return x;
	  }
	  return function watchMultiple(arr, cbOn, cbOff, pred) {
	    pred = pred || id;
	    var values = new Array(arr.length);
	    var valueIsOn = values.map(pred);
	    arr.forEach((function(regFn, i) {
	      regFn((function(val) {
	        var everythingOnBefore = valueIsOn.every(id);
	        values[i] = val;
	        valueIsOn[i] = pred(val);
	        var everythingOnAfter = valueIsOn.every(id);
	        if (everythingOnAfter) {
	          cbOn(values);
	        } else if (everythingOnBefore) {
	          cbOff(values);
	        }
	      }));
	    }));
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  if (!$.circuitboard) {
	    $.circuitboard = {
	      prematurePlugins: [],
	      plugin: function(newPlugin) {
	        $.circuitboard.prematurePlugins.push(newPlugin);
	      }
	    };
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [module.id, content, ''];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/amy-p-d3.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/amy-p-d3.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	exports.push([module.id, ".circuitboard>svg.d3{position:absolute;left:0;top:0;height:100%;width:100%;padding:0;margin:0;pointer-events:none;}.circuitboard>svg.d3 svg.vertex{overflow:visible;}.circuitboard>svg.d3.dragging{pointer-events:all;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing;}.circuitboard>svg.d3 .vertex>.example.core{pointer-events:visiblePainted;fill:#e600e6;stroke:purple;}.circuitboard>svg.d3 .example.edge{pointer-events:visiblePainted;cursor:pointer;stroke:purple;stroke-width:2px;stroke-linecap:round;}", ""]);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
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
				addStylesToDom(newStyles);
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
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
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
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZDZjOTViZDk1NWM2NGQ3NmJjYSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC1kMy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImQzXCIsXCJjb21tb25qczJcIjpcImQzXCIsXCJjb21tb25qc1wiOlwiZDNcIixcImFtZFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vLy4uL2FteS11dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLi9hbXktdXRpbC93YXRjaC1tdWx0aXBsZS5qcyIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2FteS1wLWQzLnNjc3M/NmE1MCIsIndlYnBhY2s6Ly8vLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9hbXktcC1kMy5zY3NzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImQzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImQzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJkM1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJkM1wiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiZDZjOTViZDk1NWM2NGQ3NmJjYVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnZDMnLFxuXHQnLi9hbXktdXRpbC9taXNjLmpzJyxcblx0Jy4vYW15LXV0aWwvdW5pcXVlLWlkLmpzJyxcblx0Jy4vYW15LXV0aWwvd2F0Y2gtbXVsdGlwbGUuanMnLFxuXHQnLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanMnLFxuXHQnLi9hbXktcC1kMy5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIGQzLCBVLCB1bmlxdWVJZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAnZDMnLFxuXHRcdGFmdGVyOiBbJ2NpcmN1aXRib2FyZC1jb3JlJywgJ3RpbGVtYXAtY29yZScsICd0aWxlLWNvcmUnXSxcblxuXHRcdCdtb2RpZnkgY2lyY3VpdGJvYXJkJzoge1xuXG5cdFx0XHQnYWRkIF9wX2QzX3ZlcnRpY2VzJzoge30sXG5cdFx0XHQnYWRkIF9wX2QzX2VkZ2VzJzoge30sXG5cblx0XHRcdCdpbnNlcnQgY29uc3RydWN0b3InOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHN1cGVyaW1wb3NlIGFuIGBzdmdgIGNhbnZhcyBvbiB0b3Agb2YgdGhlIGNpcmN1aXRib2FyZFxuXHRcdFx0XHQvL1xuXHRcdFx0XHR2YXIgc3ZnRWxlbWVudCA9ICQoJzxzdmcgY2xhc3M9XCJkM1wiPicpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gZW5hYmxlIHRoZSBjaXJjdWl0Ym9hcmQgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3Jcblx0XHRcdFx0Ly8gZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdFx0XHQvL1xuXHRcdFx0XHRVLm1ha2VQb3NpdGlvbmVkKHRoaXMuZWxlbWVudCk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gY3JlYXRlIHRoZSBmb3JjZSBsYXlvdXRcblx0XHRcdFx0Ly9cblx0XHRcdFx0dmFyIGZvcmNlID0gZDMubGF5b3V0LmZvcmNlKClcblx0XHRcdFx0XHQubm9kZXMoVS5vYmpWYWx1ZXModGhpcy5fcF9kM192ZXJ0aWNlcykpXG5cdFx0XHRcdFx0LmxpbmtzKFUub2JqVmFsdWVzKHRoaXMuX3BfZDNfZWRnZXMpKVxuXHRcdFx0XHRcdC5zaXplKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pXG5cdFx0XHRcdFx0LmdyYXZpdHkoMClcblx0XHRcdFx0XHQuY2hhcmdlKGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gLTAuMDI1ICpcblx0XHRcdFx0XHRcdFx0ZC5ncm91cC5jaGFyZ2VGYWN0b3IgKlxuXHRcdFx0XHRcdFx0XHRkLmdyb3VwLnJlZ2lvbi53aWR0aCAqXG5cdFx0XHRcdFx0XHRcdGQuZ3JvdXAucmVnaW9uLmhlaWdodCAqXG5cdFx0XHRcdFx0XHRcdChVLmRlZk9yKGQuY2hhcmdlRmFjdG9yLCAxKSkgL1xuXHRcdFx0XHRcdFx0XHQoZC5ncm91cC52ZXJ0aWNlcy5sZW5ndGggfHwgMSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQubGlua0Rpc3RhbmNlKGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMC4wMSAqXG5cdFx0XHRcdFx0XHRcdGQuZ3JvdXAubGlua0Rpc3RhbmNlRmFjdG9yICpcblx0XHRcdFx0XHRcdFx0ZC5ncm91cC5yZWdpb24ud2lkdGggKlxuXHRcdFx0XHRcdFx0XHRkLmdyb3VwLnJlZ2lvbi5oZWlnaHQgKlxuXHRcdFx0XHRcdFx0XHQoVS5kZWZPcihkLmxpbmtEaXN0YW5jZUZhY3RvciwgMSkpIC9cblx0XHRcdFx0XHRcdFx0KGQuZ3JvdXAudmVydGljZXMubGVuZ3RoIHx8IDEpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmxpbmtTdHJlbmd0aCgwLjgpO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGF1dG8tcmVzaXplIHRoZSBmb3JjZS1sYXlvdXQgY2FudmFzXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMub24oJ3NpemUnLCAoc2l6ZSkgPT4geyBmb3JjZS5zaXplKFtzaXplLndpZHRoLCBzaXplLmhlaWdodF0pIH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGNyZWF0ZSBjb3JyZXNwb25kaW5nIHN2ZyBlbGVtZW50c1xuXHRcdFx0XHQvL1xuXHRcdFx0XHR2YXIgc3ZnID0gZDMuc2VsZWN0KHN2Z0VsZW1lbnRbMF0pO1xuXHRcdFx0XHR2YXIgZWRnZXMgPSBzdmcuc2VsZWN0QWxsKCcuZWRnZScpO1xuXHRcdFx0XHR2YXIgdmVydGljZXMgPSBzdmcuc2VsZWN0QWxsKCcudmVydGV4Jyk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gdmlzaWJsZSB2ZXJ0aWNlcyBhbmQgZWRnZXNcblx0XHRcdFx0Ly9cblx0XHRcdFx0dmFyIHZpc2libGVWZXJ0aWNlcywgdmlzaWJsZUVkZ2VzO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHVwZGF0ZSB0aGUgZ3JhcGggdG8gYWNjb3VudCBmb3IgbmV3IGFuZC9vciByZW1vdmVkIHZlcnRpY2VzIGFuZC9vciBlZGdlc1xuXHRcdFx0XHQvL1xuXHRcdFx0XHR0aGlzLnVwZGF0ZUdyYXBoID0gVS5kZWJvdW5jZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvLyB1c2luZyB0aGUgZDMgZ2VuZXJhbCB1cGRhdGUgcGF0dGVybjpcblx0XHRcdFx0XHQvLyBodHRwOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svMzgwODIxOFxuXG5cdFx0XHRcdFx0dmlzaWJsZVZlcnRpY2VzID0gVS5vYmpWYWx1ZXModGhpcy5fcF9kM192ZXJ0aWNlcykuZmlsdGVyKChhcnRlZmFjdCkgPT4gYXJ0ZWZhY3Quc2hvd1ZlcnRleCk7XG5cdFx0XHRcdFx0dmlzaWJsZUVkZ2VzID0gVS5vYmpWYWx1ZXModGhpcy5fcF9kM19lZGdlcyk7XG5cblx0XHRcdFx0XHQvLy8vIHJlc3RhcnQgdGhlIGZvcmNlXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRmb3JjZS5ub2Rlcyh2aXNpYmxlVmVydGljZXMpLmxpbmtzKHZpc2libGVFZGdlcykuc3RhcnQoKTtcblxuXHRcdFx0XHRcdC8vLy8gdmVydGljZXNcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHZlcnRpY2VzID0gc3ZnLnNlbGVjdEFsbCgnLnZlcnRleCcpLmRhdGEodmlzaWJsZVZlcnRpY2VzLCBVLmZpZWxkKCdncmFwaElkJykpO1xuXHRcdFx0XHRcdHZlcnRpY2VzLmVudGVyKCkuYXBwZW5kKChkKSA9PiBkLmVsZW1lbnQpXG5cdFx0XHRcdFx0XHQuY2xhc3NlZCgndmVydGV4JywgdHJ1ZSkuY2xhc3NlZCgnZWRnZScsIGZhbHNlKVxuXHRcdFx0XHRcdFx0LmNhbGwoZm9yY2UuZHJhZyk7IC8vIGFsbCB2ZXJ0aWNlcyBjYW4gYmUgZHJhZ2dlZCBhcm91bmRcblx0XHRcdFx0XHR2ZXJ0aWNlcy5leGl0KCkucmVtb3ZlKCk7XG5cblx0XHRcdFx0XHQvLy8vIGVkZ2VzXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRlZGdlcyA9IHN2Zy5zZWxlY3RBbGwoJy5lZGdlJykuZGF0YSh2aXNpYmxlRWRnZXMsIFUuZmllbGQoJ2dyYXBoSWQnKSk7XG5cdFx0XHRcdFx0ZWRnZXMuZW50ZXIoKS5hcHBlbmQoKGQpID0+IGQuZWxlbWVudClcblx0XHRcdFx0XHRcdC5jbGFzc2VkKCdlZGdlJywgdHJ1ZSkuY2xhc3NlZCgndmVydGV4JywgZmFsc2UpO1xuXHRcdFx0XHRcdGVkZ2VzLmV4aXQoKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRcdC8vLy8gZGVmaW5lIGEgbmljZSB2aXN1YWwgei1vcmRlciBmb3IgdGhlIHN2ZyBlbGVtZW50c1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0c3ZnLnNlbGVjdEFsbCgnLnZlcnRleCwgLmVkZ2UnKS5zb3J0KFxuXHRcdFx0XHRcdFx0KGEsIGIpID0+IChhLmdyYXBoWkluZGV4IDwgYi5ncmFwaFpJbmRleCkgPyAtMSA6ICgoYS5ncmFwaFpJbmRleCA9PT0gYi5ncmFwaFpJbmRleCkgPyAwIDogMSlcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdH0sIDIwMCk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gb24gZDMgYW5pbWF0aW9uIHRpY2tcblx0XHRcdFx0Ly9cblx0XHRcdFx0Zm9yY2Uub24oXCJ0aWNrXCIsIChlKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGsgPSAwLjEgKiBlLmFscGhhO1xuXG5cdFx0XHRcdFx0dmlzaWJsZVZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcblx0XHRcdFx0XHRcdGlmIChkLmdyb3VwLnJlZ2lvblR5cGUgPT09ICdyZWN0YW5ndWxhcicpIHtcblx0XHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdFx0Ly8gZ3Jhdml0YXRlIHRvd2FyZHMgdGhlIGNlbnRlciBvZiB0aGUgcmVnaW9uXG5cdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRcdGQueCArPSBkLmdyb3VwLmdyYXZpdHlGYWN0b3IgKiAoZC5ncm91cC5yZWdpb24ubGVmdCArIDAuNSAqIGQuZ3JvdXAucmVnaW9uLndpZHRoIC0gZC54KSAqIGs7XG5cdFx0XHRcdFx0XHRcdGQueSArPSBkLmdyb3VwLmdyYXZpdHlGYWN0b3IgKiAoZC5ncm91cC5yZWdpb24udG9wICsgMC41ICogZC5ncm91cC5yZWdpb24uaGVpZ2h0IC0gZC55KSAqIGs7XG5cblx0XHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdFx0Ly8gYW5kIGFsd2F5cyBzdGF5IHdpdGhpbiB0aGUgcmVnaW9uXG5cdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRcdGQueCA9IE1hdGgubWF4KGQueCwgZC5ncm91cC5yZWdpb24ubGVmdCk7XG5cdFx0XHRcdFx0XHRcdGQueCA9IE1hdGgubWluKGQueCwgZC5ncm91cC5yZWdpb24ubGVmdCArIGQuZ3JvdXAucmVnaW9uLndpZHRoKTtcblx0XHRcdFx0XHRcdFx0ZC55ID0gTWF0aC5tYXgoZC55LCBkLmdyb3VwLnJlZ2lvbi50b3ApO1xuXHRcdFx0XHRcdFx0XHRkLnkgPSBNYXRoLm1pbihkLnksIGQuZ3JvdXAucmVnaW9uLnRvcCArIGQuZ3JvdXAucmVnaW9uLmhlaWdodCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvLyBsaW5lYXIgcmVnaW9uXG5cdFx0XHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0XHRcdC8vIHBvc2l0aW9uIGF0IHRoZSBwcm9wZXIgcGxhY2Ugb24gdGhlIGxpbmUgc2VnbWVudFxuXHRcdFx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdFx0XHR2YXIgcG9zID0gKGQuZ3JvdXBWZXJ0ZXhJbmRleCArIDEpIC8gKGQuZ3JvdXAudmVydGljZXMubGVuZ3RoICsgMSk7XG5cdFx0XHRcdFx0XHRcdGQueCA9IHBvcyAqIGQuZ3JvdXAucmVnaW9uLnNvdXJjZS54ICsgKDEgLSBwb3MpICogZC5ncm91cC5yZWdpb24udGFyZ2V0Lng7XG5cdFx0XHRcdFx0XHRcdGQueSA9IHBvcyAqIGQuZ3JvdXAucmVnaW9uLnNvdXJjZS55ICsgKDEgLSBwb3MpICogZC5ncm91cC5yZWdpb24udGFyZ2V0Lnk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR2ZXJ0aWNlc1xuXHRcdFx0XHRcdFx0LmF0dHIoJ3gnLCAoZCkgPT4gZC54KVxuXHRcdFx0XHRcdFx0LmF0dHIoJ3knLCAoZCkgPT4gZC55KTtcblx0XHRcdFx0XHRlZGdlc1xuXHRcdFx0XHRcdFx0LmF0dHIoXCJ4MVwiLCAoZCkgPT4gZC5zb3VyY2UueClcblx0XHRcdFx0XHRcdC5hdHRyKFwieTFcIiwgKGQpID0+IGQuc291cmNlLnkpXG5cdFx0XHRcdFx0XHQuYXR0cihcIngyXCIsIChkKSA9PiBkLnRhcmdldC54KVxuXHRcdFx0XHRcdFx0LmF0dHIoXCJ5MlwiLCAoZCkgPT4gZC50YXJnZXQueSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIEdpdmUgdGhlIGNpcmN1aXRib2FyZCBhIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBuZXcgaW50ZXJmYWNlcyxcblx0XHRcdFx0Ly8gdXNlZCB0byBjcmVhdGUgdmVydGljZXMgYW5kIGVkZ2VzIGFuZCBzdWNoOlxuXHRcdFx0XHQvL1xuXHRcdFx0XHQkLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHRcdFx0bmV3R3JhcGhHcm91cCgpIHtcblx0XHRcdFx0XHRcdHZhciB0aWxlID0gdGhpcztcblx0XHRcdFx0XHRcdHZhciBncm91cCA9IHtcblx0XHRcdFx0XHRcdFx0aWQ6IHVuaXF1ZUlkKCdncm91cCcpLFxuXHRcdFx0XHRcdFx0XHR2ZXJ0aWNlczogW10sXG5cdFx0XHRcdFx0XHRcdGVkZ2VzOiBbXSxcblx0XHRcdFx0XHRcdFx0Z3Jhdml0eUZhY3RvcjogMSxcblx0XHRcdFx0XHRcdFx0Y2hhcmdlRmFjdG9yOiAxLFxuXHRcdFx0XHRcdFx0XHRsaW5rRGlzdGFuY2VGYWN0b3I6IDEsXG5cdFx0XHRcdFx0XHRcdHJlZ2lvbjogeyAvLyBieSBkZWZhdWx0LCB0aGUgd2hvbGUgY2FudmFzIHdpdGggYSBzbWFsbCBwYWRkaW5nXG5cdFx0XHRcdFx0XHRcdFx0dG9wOiAxMCxcblx0XHRcdFx0XHRcdFx0XHRsZWZ0OiAxMCxcblx0XHRcdFx0XHRcdFx0XHRnZXQgd2lkdGgoKSB7IHJldHVybiB0aWxlLndpZHRoIC0gMjAgfSxcblx0XHRcdFx0XHRcdFx0XHRnZXQgaGVpZ2h0KCkgeyByZXR1cm4gdGlsZS5oZWlnaHQgLSAyMCB9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGdldCByZWdpb25UeXBlKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoVS5pc0RlZmluZWQoZ3JvdXAucmVnaW9uLnNvdXJjZSkgPyAnbGluZWFyJyA6ICdyZWN0YW5ndWxhcicpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlKCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGNhbGxlZCB3aGVuIGEgZ3JhcGggZ3JvdXAgaXMgZGlzY2FyZGVkO1xuXHRcdFx0XHRcdFx0XHRcdC8vIG1heSBkbyBzdHVmZiBpbiB0aGUgZnV0dXJlXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHNldEdyYXZpdHlGYWN0b3IoZmFjdG9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0Z3JvdXAuZ3Jhdml0eUZhY3RvciA9IGZhY3Rvcjtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c2V0Q2hhcmdlRmFjdG9yKGZhY3Rvcikge1xuXHRcdFx0XHRcdFx0XHRcdGdyb3VwLmNoYXJnZUZhY3RvciA9IGZhY3Rvcjtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c2V0TGlua0Rpc3RhbmNlRmFjdG9yKGZhY3Rvcikge1xuXHRcdFx0XHRcdFx0XHRcdGdyb3VwLmxpbmtEaXN0YW5jZUZhY3RvciA9IGZhY3Rvcjtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c2V0UmVnaW9uKHJlZ2lvbikge1xuXHRcdFx0XHRcdFx0XHRcdGdyb3VwLnJlZ2lvbiA9IHJlZ2lvbjtcblx0XHRcdFx0XHRcdFx0XHR0aWxlLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGFkZFZlcnRleCh2ZXJ0ZXgpIHtcblx0XHRcdFx0XHRcdFx0XHR2ZXJ0ZXguZ3JvdXAgPSBncm91cDtcblx0XHRcdFx0XHRcdFx0XHR2ZXJ0ZXguZ3JvdXBWZXJ0ZXhJbmRleCA9IGdyb3VwLnZlcnRpY2VzLmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRncm91cC52ZXJ0aWNlcy5wdXNoKHZlcnRleCk7XG5cdFx0XHRcdFx0XHRcdFx0dmVydGV4LmdyYXBoSWQgPSB2ZXJ0ZXguaWQ7XG5cdFx0XHRcdFx0XHRcdFx0dGlsZS5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF0gPSB2ZXJ0ZXg7XG5cdFx0XHRcdFx0XHRcdFx0dGlsZS51cGRhdGVHcmFwaCgpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRyZW1vdmVWZXJ0ZXgodmVydGV4KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHZlcnRleCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHRpbGUuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdO1xuXHRcdFx0XHRcdFx0XHRcdFx0VS5wdWxsKGdyb3VwLnZlcnRpY2VzLCB2ZXJ0ZXgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Z3JvdXAudmVydGljZXMuZm9yRWFjaChmdW5jdGlvbiAodmVydGV4LCBpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZlcnRleC5ncm91cFZlcnRleEluZGV4ID0gaTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGlsZS51cGRhdGVHcmFwaCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0YWRkRWRnZShlZGdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZWRnZS5ncm91cCA9IGdyb3VwO1xuXHRcdFx0XHRcdFx0XHRcdGdyb3VwLmVkZ2VzLnB1c2goZWRnZSk7XG5cdFx0XHRcdFx0XHRcdFx0ZWRnZS5ncmFwaElkID0gZ3JvdXAuaWQgKyAnOicgKyBlZGdlLmlkO1xuXHRcdFx0XHRcdFx0XHRcdHRpbGUuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXSA9IGVkZ2U7XG5cdFx0XHRcdFx0XHRcdFx0dGlsZS51cGRhdGVHcmFwaCgpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRyZW1vdmVFZGdlKGVkZ2UpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZWRnZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHRpbGUuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXTtcblx0XHRcdFx0XHRcdFx0XHRcdFUucHVsbChncm91cC5lZGdlcywgZWRnZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aWxlLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRyZW1vdmVBbGxFZGdlc0FuZFZlcnRpY2VzKCkge1xuXHRcdFx0XHRcdFx0XHRcdGdyb3VwLmVkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlZGdlKSB7IGRlbGV0ZSB0aWxlLl9wX2QzX2VkZ2VzW2VkZ2UuZ3JhcGhJZF07IH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRncm91cC52ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh2ZXJ0ZXgpIHsgZGVsZXRlIHRpbGUuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdOyB9XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0VS5tYWtlRW1wdHkoZ3JvdXAuZWRnZXMpO1xuXHRcdFx0XHRcdFx0XHRcdFUubWFrZUVtcHR5KGdyb3VwLnZlcnRpY2VzKTtcblx0XHRcdFx0XHRcdFx0XHR0aWxlLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHZlcnRleENvdW50KCkgeyByZXR1cm4gZ3JvdXAudmVydGljZXMubGVuZ3RoIH0sXG5cdFx0XHRcdFx0XHRcdHZlcnRpY2VzKCkgeyByZXR1cm4gZ3JvdXAudmVydGljZXMuc2xpY2UoKSB9LFxuXHRcdFx0XHRcdFx0XHRlZGdlcygpIHsgcmV0dXJuIGdyb3VwLnZlcnRpY2VzLnNsaWNlKCkgfVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cblx0XHRcdH0sXG5cblx0XHRcdCdhZGQgdXBkYXRlR3JhcGgnOiBudWxsLCAvLyB0byBzZXQgaW4gdGhlIGNvbnN0cnVjdG9yXG5cdFx0XHQnYWRkIG5ld0dyYXBoR3JvdXAnOiBudWxsICAvLyB0byBzZXQgaW4gdGhlIGNvbnN0cnVjdG9yXG5cdFx0fSxcblxuXG5cdFx0Ly9cblx0XHQvLyBUT0RPIDogcmVtb3ZlIHRoaXMgb3BlcmF0aW9uOyBpdCBpcyBqdXN0IGZvciB0ZXN0aW5nIHB1cnBvc2VzXG5cdFx0Ly9cblx0XHQnbW9kaWZ5IHRpbGUnOiB7XG5cdFx0XHQnaW5zZXJ0IGNvbnN0cnVjdG9yJzogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHZhciBncmFwaEdyb3VwID0gdGhpcy5jaXJjdWl0Ym9hcmQubmV3R3JhcGhHcm91cCgpO1xuXHRcdFx0XHR0aGlzLm9uKCdkZXN0cm95JywgKCkgPT4geyBncmFwaEdyb3VwLnJlbW92ZSgpIH0pO1xuXG5cdFx0XHRcdHZhciBzZXRHcmFwaEdyb3VwUmVnaW9uID0gKCkgPT4ge1xuXHRcdFx0XHRcdGdyYXBoR3JvdXAuc2V0UmVnaW9uKCQuZXh0ZW5kKHt9LCB0aGlzLnBvc2l0aW9uLCB0aGlzLnNpemUpKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRncmFwaEdyb3VwLnNldEdyYXZpdHlGYWN0b3IoMSk7XG5cdFx0XHRcdGdyYXBoR3JvdXAuc2V0Q2hhcmdlRmFjdG9yKDAuMSk7XG5cdFx0XHRcdHRoaXMub24oJ3NpemUnLCBzZXRHcmFwaEdyb3VwUmVnaW9uKTtcblx0XHRcdFx0dGhpcy5vbigncG9zaXRpb24nLCBzZXRHcmFwaEdyb3VwUmVnaW9uKTtcblxuXG5cdFx0XHRcdHZhciBwcm90ZWluMSA9IHtcblx0XHRcdFx0XHRpZDogdGhpcy5pZCArICc6JyArICdwcm90ZWluMScsXG5cdFx0XHRcdFx0c2hvd1ZlcnRleDogdHJ1ZSxcblx0XHRcdFx0XHRncmFwaFpJbmRleDogMjAwLFxuXHRcdFx0XHRcdGdldCBlbGVtZW50KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICQoJzxzdmcgeD1cIjEwXCIgeT1cIjEwXCI+PGNpcmNsZSBjbGFzcz1cImV4YW1wbGUgY29yZVwiIHI9XCI1XCI+PC9jaXJjbGU+PC9zdmc+JylbMF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHR2YXIgcHJvdGVpbjIgPSB7XG5cdFx0XHRcdFx0aWQ6IHRoaXMuaWQgKyAnOicgKyAncHJvdGVpbjInLFxuXHRcdFx0XHRcdHNob3dWZXJ0ZXg6IHRydWUsXG5cdFx0XHRcdFx0Z3JhcGhaSW5kZXg6IDIwMCxcblx0XHRcdFx0XHRnZXQgZWxlbWVudCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAkKCc8c3ZnIHg9XCIxMFwiIHk9XCIxMFwiPjxjaXJjbGUgY2xhc3M9XCJleGFtcGxlIGNvcmVcIiByPVwiNVwiPjwvY2lyY2xlPjwvc3ZnPicpWzBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRncmFwaEdyb3VwLmFkZFZlcnRleChwcm90ZWluMSk7XG5cdFx0XHRcdGdyYXBoR3JvdXAuYWRkVmVydGV4KHByb3RlaW4yKTtcblx0XHRcdFx0Z3JhcGhHcm91cC5hZGRFZGdlKHtcblx0XHRcdFx0XHRnZXQgZWxlbWVudCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAkKCc8c3ZnPjxsaW5lIGNsYXNzPVwiZXhhbXBsZSBlZGdlXCI+PC9saW5lPjwvc3ZnPicpXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbigpWzBdOyAvLyBhZGRpbmcgYW5kIGRpc2NhcmRpbmcgdGhlICdzdmcnIGVsZW1lbnQgcHJldmVudHMgYSBidWcgd2hlcmUgdGhlIGxpbmUgd291bGQgbm90IGFwcGVhclxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c291cmNlOiBwcm90ZWluMSxcblx0XHRcdFx0XHR0YXJnZXQ6IHByb3RlaW4yLFxuXHRcdFx0XHRcdGdyYXBoWkluZGV4OiAxMDBcblx0XHRcdFx0fSk7XG5cblx0XHRcdH1cblx0XHR9XG5cblxuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9hbXktcC1kMy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJkM1wiLFwiY29tbW9uanMyXCI6XCJkM1wiLFwiY29tbW9uanNcIjpcImQzXCIsXCJhbWRcIjpcImQzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblx0XHQvL1xuXHRcdC8vIHRlc3QgZXF1YWxpdHkgd2l0aCBhIHRvbGVyYW5jZSBvZiBlcHNpbG9uXG5cdFx0Ly9cblx0XHRhcHByb3g6IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBlcHNpbG9uKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChlcHNpbG9uKSkgeyBlcHNpbG9uID0gMWUtNSB9XG5cdFx0XHRyZXR1cm4gKE1hdGguYWJzKHZhbDEgLSB2YWwyKSA8IGVwc2lsb24pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHQvL1xuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdC8vXG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzUGxhaW5PYmplY3Qob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0Ly9cblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc0FycmF5KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdC8vXG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdC8vXG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0Ly9cblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHQvL1xuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0Ly9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHQvL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0Ly9cblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0Ly9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdC8vXG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0Ly9cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0Ly9cblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0Ly9cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdC8vXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Ly9cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Ly9cblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0Ly9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC91bmlxdWUtaWQuanNcbiAqKi8iLCJkZWZpbmUoW1xuXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZnVuY3Rpb24gaWQoeCkgeyByZXR1cm4geDsgfVxuXG5cdC8vXG5cdC8vIFRPRE86IGRvY3VtZW50IGFuZCB0ZXN0IHRoaXNcblx0Ly9cblx0cmV0dXJuIGZ1bmN0aW9uIHdhdGNoTXVsdGlwbGUoYXJyLCBjYk9uLCBjYk9mZiwgcHJlZCkge1xuXHRcdHByZWQgPSBwcmVkIHx8IGlkOyAvLyBieSBkZWZhdWx0LCBjaGVjayBmb3IgdHJ1dGhpbmVzc1xuXHRcdHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG5cdFx0dmFyIHZhbHVlSXNPbiA9IHZhbHVlcy5tYXAocHJlZCk7XG5cdFx0YXJyLmZvckVhY2goKHJlZ0ZuLCBpKSA9PiB7XG5cdFx0XHRyZWdGbigodmFsKSA9PiB7XG5cdFx0XHRcdHZhciBldmVyeXRoaW5nT25CZWZvcmUgPSB2YWx1ZUlzT24uZXZlcnkoaWQpO1xuXHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWw7XG5cdFx0XHRcdHZhbHVlSXNPbltpXSA9IHByZWQodmFsKTtcblx0XHRcdFx0dmFyIGV2ZXJ5dGhpbmdPbkFmdGVyID0gdmFsdWVJc09uLmV2ZXJ5KGlkKTtcblx0XHRcdFx0aWYgKGV2ZXJ5dGhpbmdPbkFmdGVyKSB7XG5cdFx0XHRcdFx0Y2JPbih2YWx1ZXMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGV2ZXJ5dGhpbmdPbkJlZm9yZSkge1xuXHRcdFx0XHRcdGNiT2ZmKHZhbHVlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC93YXRjaC1tdWx0aXBsZS5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGhpcyBjYW4gYmUgbG9hZGVkIGJlZm9yZSBhIHBsdWdpbiBmaWxlIHRvIGVsZWdhbnRseSBoYW5kbGVcblx0Ly8gdGhlIHNpdHVhdGlvbiB3aGVyZSB0aGUgY2lyY3VpdGJvYXJkIG1vZHVsZSBpcyBub3QgeWV0IGxvYWRlZFxuXHQvLyB0byByZWNlaXZlIGl0XG5cdC8vXG5cdGlmICghJC5jaXJjdWl0Ym9hcmQpIHtcblx0XHQkLmNpcmN1aXRib2FyZCA9IHtcblx0XHRcdHByZW1hdHVyZVBsdWdpbnM6IFtdLFxuXHRcdFx0cGx1Z2luOiBmdW5jdGlvbiAobmV3UGx1Z2luKSB7XG5cdFx0XHRcdCQuY2lyY3VpdGJvYXJkLnByZW1hdHVyZVBsdWdpbnMucHVzaChuZXdQbHVnaW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9oYW5kbGUtcHJlbWF0dXJlLXBsdWdpbnMuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2FteS1wLWQzLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbbW9kdWxlLmlkLCBjb250ZW50LCAnJ107XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9hbXktcC1kMy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2FteS1wLWQzLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2FteS1wLWQzLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jaXJjdWl0Ym9hcmQ+c3ZnLmQze3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3BhZGRpbmc6MDttYXJnaW46MDtwb2ludGVyLWV2ZW50czpub25lO30uY2lyY3VpdGJvYXJkPnN2Zy5kMyBzdmcudmVydGV4e292ZXJmbG93OnZpc2libGU7fS5jaXJjdWl0Ym9hcmQ+c3ZnLmQzLmRyYWdnaW5ne3BvaW50ZXItZXZlbnRzOmFsbDtjdXJzb3I6LXdlYmtpdC1ncmFiYmluZztjdXJzb3I6LW1vei1ncmFiYmluZztjdXJzb3I6Z3JhYmJpbmc7fS5jaXJjdWl0Ym9hcmQ+c3ZnLmQzIC52ZXJ0ZXg+LmV4YW1wbGUuY29yZXtwb2ludGVyLWV2ZW50czp2aXNpYmxlUGFpbnRlZDtmaWxsOiNlNjAwZTY7c3Ryb2tlOnB1cnBsZTt9LmNpcmN1aXRib2FyZD5zdmcuZDMgLmV4YW1wbGUuZWRnZXtwb2ludGVyLWV2ZW50czp2aXNpYmxlUGFpbnRlZDtjdXJzb3I6cG9pbnRlcjtzdHJva2U6cHVycGxlO3N0cm9rZS13aWR0aDoycHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9hbXktcC1kMy5zY3NzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFteS1wLWQzLmpzIn0=