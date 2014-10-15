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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, d3, U, uniqueId) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'd3',
	    require: ['position-tracking'],
	    after: ['circuitboard-core', 'tilemap-core', 'tile-core', 'position-tracking']
	  }).modify('Circuitboard.prototype');
	  plugin.insert('construct', function() {
	    var $__0 = this;
	    this._p_d3_vertices = {};
	    this._p_d3_edges = {};
	    var svgElement = $('<svg class="d3">').appendTo(this.element).append('<svg x="1" y="1">').children();
	    U.makePositioned(this.element);
	    this.d3Force = d3.layout.force().nodes(U.objValues(this._p_d3_vertices)).links(U.objValues(this._p_d3_edges)).size([this.width, this.height]).gravity(0).charge(function(d) {
	      return -0.025 * d.group.chargeFactor * d.group.region.width * d.group.region.height * (U.defOr(d.chargeFactor, 1)) / (d.group.vertices.length || 1);
	    }).linkDistance(function(d) {
	      return 0.01 * d.group.linkDistanceFactor * d.group.region.width * d.group.region.height * (U.defOr(d.linkDistanceFactor, 1)) / (d.group.vertices.length || 1);
	    }).linkStrength(0.8);
	    this.on('size', (function(size) {
	      $__0.d3Force.size([size.width, size.height]);
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
	      $__0.d3Force.nodes(visibleVertices).links(visibleEdges).start();
	      vertices = svg.selectAll('.vertex').data(visibleVertices, U.field('graphId'));
	      vertices.enter().append((function(d) {
	        return d.element;
	      })).classed('vertex', true).classed('edge', false).call($__0.d3Force.drag);
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
	    this.d3Force.drag().on('dragstart', (function() {
	      svgElement.addClass('dragging-vertex');
	    })).on('dragend', (function() {
	      svgElement.removeClass('dragging-vertex');
	    }));
	    this.d3Force.on("tick", (function(e) {
	      var k = 0.1 * e.alpha;
	      visibleVertices.forEach(function(d) {
	        d.x += d.group.gravityFactor * (d.group.region.left + 0.5 * d.group.region.width - d.x) * k;
	        d.y += d.group.gravityFactor * (d.group.region.top + 0.5 * d.group.region.height - d.y) * k;
	        d.x = Math.max(d.x, d.group.region.left);
	        d.x = Math.min(d.x, d.group.region.left + d.group.region.width);
	        d.y = Math.max(d.y, d.group.region.top);
	        d.y = Math.min(d.y, d.group.region.top + d.group.region.height);
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
	    $.extend(this, {newGraphGroup: function(options) {
	        options = options || {};
	        var circuitboard = this;
	        var group = {
	          id: uniqueId('group'),
	          vertices: [],
	          edges: [],
	          gravityFactor: U.defOr(options.gravityFactor, 1),
	          chargeFactor: U.defOr(options.chargeFactor, 1),
	          linkDistanceFactor: U.defOr(options.linkDistanceFactor, 1),
	          region: U.defOr(options.region, {
	            top: 10,
	            left: 10,
	            get width() {
	              return circuitboard.size.width - 20;
	            },
	            get height() {
	              return circuitboard.size.height - 20;
	            }
	          })
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
	            circuitboard.updateGraph();
	          },
	          addVertex: function(vertex) {
	            vertex.group = group;
	            vertex.groupVertexIndex = group.vertices.length;
	            group.vertices.push(vertex);
	            vertex.graphId = vertex.id;
	            circuitboard._p_d3_vertices[vertex.graphId] = vertex;
	            circuitboard.updateGraph();
	          },
	          removeVertex: function(vertex) {
	            if (vertex) {
	              delete circuitboard._p_d3_vertices[vertex.graphId];
	              U.pull(group.vertices, vertex);
	              group.vertices.forEach(function(vertex, i) {
	                vertex.groupVertexIndex = i;
	              });
	              circuitboard.updateGraph();
	            }
	          },
	          addEdge: function(edge) {
	            edge.group = group;
	            group.edges.push(edge);
	            edge.graphId = group.id + ':' + edge.id;
	            circuitboard._p_d3_edges[edge.graphId] = edge;
	            circuitboard.updateGraph();
	          },
	          removeEdge: function(edge) {
	            if (edge) {
	              delete circuitboard._p_d3_edges[edge.graphId];
	              U.pull(group.edges, edge);
	              circuitboard.updateGraph();
	            }
	          },
	          removeAllEdgesAndVertices: function() {
	            group.edges.forEach((function(edge) {
	              if (edge) {
	                delete circuitboard._p_d3_edges[edge.graphId];
	              }
	            }));
	            group.vertices.forEach((function(vertex) {
	              if (vertex) {
	                delete circuitboard._p_d3_vertices[vertex.graphId];
	              }
	            }));
	            U.makeEmpty(group.edges);
	            U.makeEmpty(group.vertices);
	            circuitboard.updateGraph();
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
	    eachAnimationFrame: function(fn, context) {
	      var stop = false;
	      function iterationFn() {
	        fn.apply(context);
	        if (stop) {
	          return;
	        }
	        requestAnimationFrame(iterationFn);
	      }
	      iterationFn();
	      return function stopEachAnimationFrame() {
	        stop = true;
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
	    observable: function(obj, options) {
	      var value;
	      Object.defineProperty(obj, options.name, {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          if (newValue !== value) {
	            var oldValue = value;
	            value = newValue;
	            this.trigger(options.name, newValue, oldValue);
	          }
	        }
	      });
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

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-d3.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-d3.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	exports.push([module.id, ".circuitboard>svg.d3{display:block;position:absolute;left:0;top:0;height:100%;width:100%;padding:0;margin:0;pointer-events:none;}.circuitboard>svg.d3 svg.vertex{overflow:visible;cursor:pointer;}.circuitboard>svg.d3.dragging-vertex{pointer-events:all;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing;}", ""]);

/***/ },
/* 7 */
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
/* 8 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZjAxZTJlZGJkNmRjYWZhOTQ2ZSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLWQzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiZDNcIixcImNvbW1vbmpzMlwiOlwiZDNcIixcImNvbW1vbmpzXCI6XCJkM1wiLFwiYW1kXCI6XCJkM1wifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzEiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtZDMuc2Nzcz83YTFlIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtZDMuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImQzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImQzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJkM1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJkM1wiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZjAxZTJlZGJkNmRjYWZhOTQ2ZVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnZDMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL3VuaXF1ZS1pZC5qcycsXG5cdCcuL3AtZDMuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBkMywgVSwgdW5pcXVlSWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICdkMycsXG5cdFx0cmVxdWlyZTogWydwb3NpdGlvbi10cmFja2luZyddLFxuXHRcdGFmdGVyOiBbJ2NpcmN1aXRib2FyZC1jb3JlJywgJ3RpbGVtYXAtY29yZScsICd0aWxlLWNvcmUnLCAncG9zaXRpb24tdHJhY2tpbmcnXVxuXHR9KS5tb2RpZnkoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUnKTtcblxuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5fcF9kM192ZXJ0aWNlcyA9IHt9O1xuXHRcdHRoaXMuX3BfZDNfZWRnZXMgPSB7fTtcblxuXHRcdC8vXG5cdFx0Ly8gc3VwZXJpbXBvc2UgYW4gYHN2Z2AgY2FudmFzIG9uIHRvcCBvZiB0aGUgY2lyY3VpdGJvYXJkXG5cdFx0Ly8gdGhlIGlubmVyIGBzdmdgIHRyYW5zbGF0ZXMgZXZlcnl0aGluZyBvbmUgcGl4ZWwgZG93biBhbmQgdG8gdGhlIHJpZ2h0LFxuXHRcdC8vIHRvIGNvcnJlc3BvbmQgd2l0aCB0aWxlIHBvc2l0aW9uaW5nXG5cdFx0Ly9cblx0XHR2YXIgc3ZnRWxlbWVudCA9ICQoJzxzdmcgY2xhc3M9XCJkM1wiPicpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcblx0XHRcdFx0LmFwcGVuZCgnPHN2ZyB4PVwiMVwiIHk9XCIxXCI+JykuY2hpbGRyZW4oKTtcblxuXHRcdC8vXG5cdFx0Ly8gZW5hYmxlIHRoZSBjaXJjdWl0Ym9hcmQgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3Jcblx0XHQvLyBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0Ly9cblx0XHRVLm1ha2VQb3NpdGlvbmVkKHRoaXMuZWxlbWVudCk7XG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZSB0aGUgZm9yY2UgbGF5b3V0XG5cdFx0Ly9cblx0XHR0aGlzLmQzRm9yY2UgPSBkMy5sYXlvdXQuZm9yY2UoKVxuXHRcdFx0XHQubm9kZXMoVS5vYmpWYWx1ZXModGhpcy5fcF9kM192ZXJ0aWNlcykpXG5cdFx0XHRcdC5saW5rcyhVLm9ialZhbHVlcyh0aGlzLl9wX2QzX2VkZ2VzKSlcblx0XHRcdFx0LnNpemUoW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XSlcblx0XHRcdFx0LmdyYXZpdHkoMClcblx0XHRcdFx0LmNoYXJnZShmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHRcdHJldHVybiAtMC4wMjUgKlxuXHRcdFx0XHRcdFx0XHRkLmdyb3VwLmNoYXJnZUZhY3RvciAqXG5cdFx0XHRcdFx0XHRcdGQuZ3JvdXAucmVnaW9uLndpZHRoICpcblx0XHRcdFx0XHRcdFx0ZC5ncm91cC5yZWdpb24uaGVpZ2h0ICpcblx0XHRcdFx0XHRcdFx0KFUuZGVmT3IoZC5jaGFyZ2VGYWN0b3IsIDEpKSAvXG5cdFx0XHRcdFx0XHRcdChkLmdyb3VwLnZlcnRpY2VzLmxlbmd0aCB8fCAxKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmxpbmtEaXN0YW5jZShmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHRcdHJldHVybiAwLjAxICpcblx0XHRcdFx0XHRcdFx0ZC5ncm91cC5saW5rRGlzdGFuY2VGYWN0b3IgKlxuXHRcdFx0XHRcdFx0XHRkLmdyb3VwLnJlZ2lvbi53aWR0aCAqXG5cdFx0XHRcdFx0XHRcdGQuZ3JvdXAucmVnaW9uLmhlaWdodCAqXG5cdFx0XHRcdFx0XHRcdChVLmRlZk9yKGQubGlua0Rpc3RhbmNlRmFjdG9yLCAxKSkgL1xuXHRcdFx0XHRcdFx0XHQoZC5ncm91cC52ZXJ0aWNlcy5sZW5ndGggfHwgMSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5saW5rU3RyZW5ndGgoMC44KTtcblxuXHRcdC8vXG5cdFx0Ly8gYXV0by1yZXNpemUgdGhlIGZvcmNlLWxheW91dCBjYW52YXNcblx0XHQvL1xuXHRcdHRoaXMub24oJ3NpemUnLCAoc2l6ZSkgPT4geyB0aGlzLmQzRm9yY2Uuc2l6ZShbc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHRdKSB9KTtcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlIGNvcnJlc3BvbmRpbmcgc3ZnIGVsZW1lbnRzXG5cdFx0Ly9cblx0XHR2YXIgc3ZnID0gZDMuc2VsZWN0KHN2Z0VsZW1lbnRbMF0pO1xuXHRcdHZhciBlZGdlcyA9IHN2Zy5zZWxlY3RBbGwoJy5lZGdlJyk7XG5cdFx0dmFyIHZlcnRpY2VzID0gc3ZnLnNlbGVjdEFsbCgnLnZlcnRleCcpO1xuXG5cdFx0Ly9cblx0XHQvLyB2aXNpYmxlIHZlcnRpY2VzIGFuZCBlZGdlc1xuXHRcdC8vXG5cdFx0dmFyIHZpc2libGVWZXJ0aWNlcywgdmlzaWJsZUVkZ2VzO1xuXG5cdFx0Ly9cblx0XHQvLyB1cGRhdGUgdGhlIGdyYXBoIHRvIGFjY291bnQgZm9yIG5ldyBhbmQvb3IgcmVtb3ZlZCB2ZXJ0aWNlcyBhbmQvb3IgZWRnZXNcblx0XHQvL1xuXHRcdHRoaXMudXBkYXRlR3JhcGggPSBVLmRlYm91bmNlKCgpID0+IHtcblxuXHRcdFx0Ly8gdXNpbmcgdGhlIGQzIGdlbmVyYWwgdXBkYXRlIHBhdHRlcm46XG5cdFx0XHQvLyBodHRwOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svMzgwODIxOFxuXG5cdFx0XHR2aXNpYmxlVmVydGljZXMgPSBVLm9ialZhbHVlcyh0aGlzLl9wX2QzX3ZlcnRpY2VzKS5maWx0ZXIoKGFydGVmYWN0KSA9PiBhcnRlZmFjdC5zaG93VmVydGV4KTtcblx0XHRcdHZpc2libGVFZGdlcyA9IFUub2JqVmFsdWVzKHRoaXMuX3BfZDNfZWRnZXMpO1xuXG5cdFx0XHQvLy8vIHJlc3RhcnQgdGhlIGZvcmNlXG5cdFx0XHQvL1xuXHRcdFx0dGhpcy5kM0ZvcmNlLm5vZGVzKHZpc2libGVWZXJ0aWNlcykubGlua3ModmlzaWJsZUVkZ2VzKS5zdGFydCgpO1xuXG5cdFx0XHQvLy8vIHZlcnRpY2VzXG5cdFx0XHQvL1xuXHRcdFx0dmVydGljZXMgPSBzdmcuc2VsZWN0QWxsKCcudmVydGV4JykuZGF0YSh2aXNpYmxlVmVydGljZXMsIFUuZmllbGQoJ2dyYXBoSWQnKSk7XG5cdFx0XHR2ZXJ0aWNlcy5lbnRlcigpLmFwcGVuZCgoZCkgPT4gZC5lbGVtZW50KVxuXHRcdFx0XHRcdC5jbGFzc2VkKCd2ZXJ0ZXgnLCB0cnVlKS5jbGFzc2VkKCdlZGdlJywgZmFsc2UpXG5cdFx0XHRcdFx0LmNhbGwodGhpcy5kM0ZvcmNlLmRyYWcpOyAvLyBhbGwgdmVydGljZXMgY2FuIGJlIGRyYWdnZWQgYXJvdW5kXG5cdFx0XHR2ZXJ0aWNlcy5leGl0KCkucmVtb3ZlKCk7XG5cblx0XHRcdC8vLy8gZWRnZXNcblx0XHRcdC8vXG5cdFx0XHRlZGdlcyA9IHN2Zy5zZWxlY3RBbGwoJy5lZGdlJykuZGF0YSh2aXNpYmxlRWRnZXMsIFUuZmllbGQoJ2dyYXBoSWQnKSk7XG5cdFx0XHRlZGdlcy5lbnRlcigpLmFwcGVuZCgoZCkgPT4gZC5lbGVtZW50KVxuXHRcdFx0XHRcdC5jbGFzc2VkKCdlZGdlJywgdHJ1ZSkuY2xhc3NlZCgndmVydGV4JywgZmFsc2UpO1xuXHRcdFx0ZWRnZXMuZXhpdCgpLnJlbW92ZSgpO1xuXG5cdFx0XHQvLy8vIGRlZmluZSBhIG5pY2UgdmlzdWFsIHotb3JkZXIgZm9yIHRoZSBzdmcgZWxlbWVudHNcblx0XHRcdC8vXG5cdFx0XHRzdmcuc2VsZWN0QWxsKCcudmVydGV4LCAuZWRnZScpLnNvcnQoXG5cdFx0XHRcdFx0KGEsIGIpID0+IChhLmdyYXBoWkluZGV4IDwgYi5ncmFwaFpJbmRleCkgPyAtMSA6ICgoYS5ncmFwaFpJbmRleCA9PT0gYi5ncmFwaFpJbmRleCkgPyAwIDogMSlcblx0XHRcdCk7XG5cblx0XHR9LCAyMDApO1xuXG5cdFx0Ly9cblx0XHQvLyB3aGlsZSBkcmFnZ2luZyBhIHZlcnRleCwgc2V0IHRoZSAnZHJhZ2dpbmctdmVydGV4JyBjbGFzcyBvbiB0aGUgY2lyY3VpdGJvYXJkXG5cdFx0Ly9cblx0XHR0aGlzLmQzRm9yY2UuZHJhZygpLm9uKCdkcmFnc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdmdFbGVtZW50LmFkZENsYXNzKCdkcmFnZ2luZy12ZXJ0ZXgnKTtcblx0XHR9KS5vbignZHJhZ2VuZCcsICgpID0+IHtcblx0XHRcdHN2Z0VsZW1lbnQucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nLXZlcnRleCcpO1xuXHRcdH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBvbiBkMyBhbmltYXRpb24gdGlja1xuXHRcdC8vXG5cdFx0dGhpcy5kM0ZvcmNlLm9uKFwidGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0dmFyIGsgPSAwLjEgKiBlLmFscGhhO1xuXG5cdFx0XHR2aXNpYmxlVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBncmF2aXRhdGUgdG93YXJkcyB0aGUgY2VudGVyIG9mIHRoZSByZWdpb25cblx0XHRcdFx0Ly9cblx0XHRcdFx0ZC54ICs9IGQuZ3JvdXAuZ3Jhdml0eUZhY3RvciAqIChkLmdyb3VwLnJlZ2lvbi5sZWZ0ICsgMC41ICogZC5ncm91cC5yZWdpb24ud2lkdGggLSBkLngpICogaztcblx0XHRcdFx0ZC55ICs9IGQuZ3JvdXAuZ3Jhdml0eUZhY3RvciAqIChkLmdyb3VwLnJlZ2lvbi50b3AgKyAwLjUgKiBkLmdyb3VwLnJlZ2lvbi5oZWlnaHQgLSBkLnkpICogaztcblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBhbmQgYWx3YXlzIHN0YXkgd2l0aGluIHRoZSByZWdpb25cblx0XHRcdFx0Ly9cblx0XHRcdFx0ZC54ID0gTWF0aC5tYXgoZC54LCBkLmdyb3VwLnJlZ2lvbi5sZWZ0KTtcblx0XHRcdFx0ZC54ID0gTWF0aC5taW4oZC54LCBkLmdyb3VwLnJlZ2lvbi5sZWZ0ICsgZC5ncm91cC5yZWdpb24ud2lkdGgpO1xuXHRcdFx0XHRkLnkgPSBNYXRoLm1heChkLnksIGQuZ3JvdXAucmVnaW9uLnRvcCk7XG5cdFx0XHRcdGQueSA9IE1hdGgubWluKGQueSwgZC5ncm91cC5yZWdpb24udG9wICsgZC5ncm91cC5yZWdpb24uaGVpZ2h0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHR2ZXJ0aWNlc1xuXHRcdFx0XHRcdC5hdHRyKCd4JywgKGQpID0+IGQueClcblx0XHRcdFx0XHQuYXR0cigneScsIChkKSA9PiBkLnkpO1xuXHRcdFx0ZWRnZXNcblx0XHRcdFx0XHQuYXR0cihcIngxXCIsIChkKSA9PiBkLnNvdXJjZS54KVxuXHRcdFx0XHRcdC5hdHRyKFwieTFcIiwgKGQpID0+IGQuc291cmNlLnkpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4MlwiLCAoZCkgPT4gZC50YXJnZXQueClcblx0XHRcdFx0XHQuYXR0cihcInkyXCIsIChkKSA9PiBkLnRhcmdldC55KTtcblx0XHR9KTtcblxuXHRcdCQuZXh0ZW5kKHRoaXMsIHtcblx0XHRcdC8vXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBuZXcgaW50ZXJmYWNlcyxcblx0XHRcdC8vIHVzZWQgdG8gY3JlYXRlIHZlcnRpY2VzIGFuZCBlZGdlcyBhbmQgc3VjaDpcblx0XHRcdC8vXG5cdFx0XHRuZXdHcmFwaEdyb3VwKG9wdGlvbnMpIHtcblx0XHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdFx0XHRcdHZhciBjaXJjdWl0Ym9hcmQgPSB0aGlzO1xuXHRcdFx0XHR2YXIgZ3JvdXAgPSB7XG5cdFx0XHRcdFx0aWQ6IHVuaXF1ZUlkKCdncm91cCcpLFxuXHRcdFx0XHRcdHZlcnRpY2VzOiBbXSxcblx0XHRcdFx0XHRlZGdlczogW10sXG5cdFx0XHRcdFx0Z3Jhdml0eUZhY3RvcjogVS5kZWZPcihvcHRpb25zLmdyYXZpdHlGYWN0b3IsIDEpLFxuXHRcdFx0XHRcdGNoYXJnZUZhY3RvcjogVS5kZWZPcihvcHRpb25zLmNoYXJnZUZhY3RvciwgMSksXG5cdFx0XHRcdFx0bGlua0Rpc3RhbmNlRmFjdG9yOiBVLmRlZk9yKG9wdGlvbnMubGlua0Rpc3RhbmNlRmFjdG9yLCAxKSxcblx0XHRcdFx0XHRyZWdpb246IFUuZGVmT3Iob3B0aW9ucy5yZWdpb24sIHsgLy8gYnkgZGVmYXVsdCwgdGhlIHdob2xlIGNhbnZhcyB3aXRoIGEgc21hbGwgcGFkZGluZ1xuXHRcdFx0XHRcdFx0dG9wOiAxMCxcblx0XHRcdFx0XHRcdGxlZnQ6IDEwLFxuXHRcdFx0XHRcdFx0Z2V0IHdpZHRoKCkgeyByZXR1cm4gY2lyY3VpdGJvYXJkLnNpemUud2lkdGggLSAyMCB9LFxuXHRcdFx0XHRcdFx0Z2V0IGhlaWdodCgpIHsgcmV0dXJuIGNpcmN1aXRib2FyZC5zaXplLmhlaWdodCAtIDIwIH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHJlbW92ZSgpIHtcblx0XHRcdFx0XHRcdC8vIGNhbGxlZCB3aGVuIGEgZ3JhcGggZ3JvdXAgaXMgZGlzY2FyZGVkO1xuXHRcdFx0XHRcdFx0Ly8gbWF5IGRvIHN0dWZmIGluIHRoZSBmdXR1cmVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldEdyYXZpdHlGYWN0b3IoZmFjdG9yKSB7XG5cdFx0XHRcdFx0XHRncm91cC5ncmF2aXR5RmFjdG9yID0gZmFjdG9yO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0Q2hhcmdlRmFjdG9yKGZhY3Rvcikge1xuXHRcdFx0XHRcdFx0Z3JvdXAuY2hhcmdlRmFjdG9yID0gZmFjdG9yO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0TGlua0Rpc3RhbmNlRmFjdG9yKGZhY3Rvcikge1xuXHRcdFx0XHRcdFx0Z3JvdXAubGlua0Rpc3RhbmNlRmFjdG9yID0gZmFjdG9yO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0UmVnaW9uKHJlZ2lvbikge1xuXHRcdFx0XHRcdFx0Z3JvdXAucmVnaW9uID0gcmVnaW9uO1xuXHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhZGRWZXJ0ZXgodmVydGV4KSB7XG5cdFx0XHRcdFx0XHR2ZXJ0ZXguZ3JvdXAgPSBncm91cDtcblx0XHRcdFx0XHRcdHZlcnRleC5ncm91cFZlcnRleEluZGV4ID0gZ3JvdXAudmVydGljZXMubGVuZ3RoO1xuXHRcdFx0XHRcdFx0Z3JvdXAudmVydGljZXMucHVzaCh2ZXJ0ZXgpO1xuXHRcdFx0XHRcdFx0dmVydGV4LmdyYXBoSWQgPSB2ZXJ0ZXguaWQ7XG5cdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdID0gdmVydGV4O1xuXHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZW1vdmVWZXJ0ZXgodmVydGV4KSB7XG5cdFx0XHRcdFx0XHRpZiAodmVydGV4KSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBjaXJjdWl0Ym9hcmQuX3BfZDNfdmVydGljZXNbdmVydGV4LmdyYXBoSWRdO1xuXHRcdFx0XHRcdFx0XHRVLnB1bGwoZ3JvdXAudmVydGljZXMsIHZlcnRleCk7XG5cdFx0XHRcdFx0XHRcdGdyb3VwLnZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24gKHZlcnRleCwgaSkge1xuXHRcdFx0XHRcdFx0XHRcdHZlcnRleC5ncm91cFZlcnRleEluZGV4ID0gaTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdGNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YWRkRWRnZShlZGdlKSB7XG5cdFx0XHRcdFx0XHRlZGdlLmdyb3VwID0gZ3JvdXA7XG5cdFx0XHRcdFx0XHRncm91cC5lZGdlcy5wdXNoKGVkZ2UpO1xuXHRcdFx0XHRcdFx0ZWRnZS5ncmFwaElkID0gZ3JvdXAuaWQgKyAnOicgKyBlZGdlLmlkO1xuXHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLl9wX2QzX2VkZ2VzW2VkZ2UuZ3JhcGhJZF0gPSBlZGdlO1xuXHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZW1vdmVFZGdlKGVkZ2UpIHtcblx0XHRcdFx0XHRcdGlmIChlZGdlKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBjaXJjdWl0Ym9hcmQuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXTtcblx0XHRcdFx0XHRcdFx0VS5wdWxsKGdyb3VwLmVkZ2VzLCBlZGdlKTtcblx0XHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZW1vdmVBbGxFZGdlc0FuZFZlcnRpY2VzKCkge1xuXHRcdFx0XHRcdFx0Z3JvdXAuZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoZWRnZSkgeyBkZWxldGUgY2lyY3VpdGJvYXJkLl9wX2QzX2VkZ2VzW2VkZ2UuZ3JhcGhJZF07IH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0Z3JvdXAudmVydGljZXMuZm9yRWFjaCgodmVydGV4KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmICh2ZXJ0ZXgpIHsgZGVsZXRlIGNpcmN1aXRib2FyZC5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF07IH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0VS5tYWtlRW1wdHkoZ3JvdXAuZWRnZXMpO1xuXHRcdFx0XHRcdFx0VS5tYWtlRW1wdHkoZ3JvdXAudmVydGljZXMpO1xuXHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR2ZXJ0ZXhDb3VudCgpIHsgcmV0dXJuIGdyb3VwLnZlcnRpY2VzLmxlbmd0aCB9LFxuXHRcdFx0XHRcdHZlcnRpY2VzKCkgeyByZXR1cm4gZ3JvdXAudmVydGljZXMuc2xpY2UoKSB9LFxuXHRcdFx0XHRcdGVkZ2VzKCkgeyByZXR1cm4gZ3JvdXAudmVydGljZXMuc2xpY2UoKSB9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLWQzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImQzXCIsXCJjb21tb25qczJcIjpcImQzXCIsXCJjb21tb25qc1wiOlwiZDNcIixcImFtZFwiOlwiZDNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXHRcdC8vXG5cdFx0Ly8gdGVzdCBlcXVhbGl0eSB3aXRoIGEgdG9sZXJhbmNlIG9mIGVwc2lsb25cblx0XHQvL1xuXHRcdGFwcHJveDogZnVuY3Rpb24gKHZhbDEsIHZhbDIsIGVwc2lsb24pIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGVwc2lsb24pKSB7IGVwc2lsb24gPSAxZS01IH1cblx0XHRcdHJldHVybiAoTWF0aC5hYnModmFsMSAtIHZhbDIpIDwgZXBzaWxvbik7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdC8vXG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0Ly9cblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoISQuaXNQbGFpbk9iamVjdChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHQvL1xuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzQXJyYXkob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0Ly9cblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0Ly9cblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHQvL1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdC8vXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHQvL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdC8vXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHQvL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHQvL1xuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0Ly9cblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvL1xuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHQvL1xuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHQvL1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHQvL1xuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHQvL1xuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gc3RvcEVhY2hBbmltYXRpb25GcmFtZSgpIHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0Ly9cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gb3B0aW9ucy5uYW1lIChtYW5kYXRvcnkpIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly9cblx0XHRvYnNlcnZhYmxlKG9iaiwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHZhbHVlO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgb3B0aW9ucy5uYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH0sXG5cdFx0XHRcdHNldChuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihvcHRpb25zLm5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdC8vXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vXG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0Ly9cblx0XHRcdHZhciByZXRyaWV2ZSA9IG9wdGlvbnMucmV0cmlldmUsXG5cdFx0XHRcdGlzRXF1YWwgPSBvcHRpb25zLmlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdC8vXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayBhbmRcblx0XHRcdC8vIGludm9rZSB0aGUgY2FsbGJhY2sgd2hlbmV2ZXIgdGhlIHZhbHVlIGlzIG5ld1xuXHRcdFx0Ly9cblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdC8vXG5cdFx0XHR2YXIgcmVzdWx0Rm4gPSAoKSA9PiB7XG5cdFx0XHRcdG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG5cdFx0XHRcdHJldHVybiBjYWNoZTtcblx0XHRcdH07XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0Ly9cblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC1kMy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWQzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC1kMy5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWQzLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jaXJjdWl0Ym9hcmQ+c3ZnLmQze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbjowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS5jaXJjdWl0Ym9hcmQ+c3ZnLmQzIHN2Zy52ZXJ0ZXh7b3ZlcmZsb3c6dmlzaWJsZTtjdXJzb3I6cG9pbnRlcjt9LmNpcmN1aXRib2FyZD5zdmcuZDMuZHJhZ2dpbmctdmVydGV4e3BvaW50ZXItZXZlbnRzOmFsbDtjdXJzb3I6LXdlYmtpdC1ncmFiYmluZztjdXJzb3I6LW1vei1ncmFiYmluZztjdXJzb3I6Z3JhYmJpbmc7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWQzLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLWQzLmpzIn0=