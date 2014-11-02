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
	    requires: ['core', 'position-tracking']
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

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
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
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    object: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = {};
	      }
	      return obj[name];
	    },
	    array: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
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
	          $__2 = 0; $__2 < arguments.length; $__2++)
	        values[$__2] = arguments[$__2];
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
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
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
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context, args);
	        }
	      };
	    },
	    observable: function(obj, $__4) {
	      var $__5 = $__4,
	          name = $__5.name,
	          initial = $__5.initial,
	          validation = $__5.validation;
	      var value = initial;
	      Object.defineProperty(obj, name, {
	        get: function() {
	          return value;
	        },
	        set: function(newValue) {
	          var oldValue = value;
	          if (validation) {
	            newValue = validation(newValue, oldValue);
	          }
	          if (newValue !== oldValue) {
	            value = newValue;
	            this.trigger(name, newValue, oldValue);
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
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return a && b && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Position.equals = (function(a, b) {
	    return a && b && a.height === b.height && a.width === b.width;
	  });
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyMzBmYTIzN2QyMDU1ZTNhYzYwMSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLWQzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiZDNcIixcImNvbW1vbmpzMlwiOlwiZDNcIixcImNvbW1vbmpzXCI6XCJkM1wiLFwiYW1kXCI6XCJkM1wifSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvdW5pcXVlLWlkLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtZDMuc2Nzcz83YTFlIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtZDMuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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dWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImQzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImQzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJkM1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJkM1wiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyMzBmYTIzN2QyMDU1ZTNhYzYwMVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnZDMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL3VuaXF1ZS1pZC5qcycsXG5cdCcuL3AtZDMuc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBkMywgVSwgdW5pcXVlSWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICdkMycsXG5cdFx0cmVxdWlyZXM6IFsnY29yZScsICdwb3NpdGlvbi10cmFja2luZyddXG5cdH0pLm1vZGlmeSgnQ2lyY3VpdGJvYXJkLnByb3RvdHlwZScpO1xuXG5cdHBsdWdpbi5pbnNlcnQoJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9wX2QzX3ZlcnRpY2VzID0ge307XG5cdFx0dGhpcy5fcF9kM19lZGdlcyA9IHt9O1xuXG5cdFx0Ly9cblx0XHQvLyBzdXBlcmltcG9zZSBhbiBgc3ZnYCBjYW52YXMgb24gdG9wIG9mIHRoZSBjaXJjdWl0Ym9hcmRcblx0XHQvLyB0aGUgaW5uZXIgYHN2Z2AgdHJhbnNsYXRlcyBldmVyeXRoaW5nIG9uZSBwaXhlbCBkb3duIGFuZCB0byB0aGUgcmlnaHQsXG5cdFx0Ly8gdG8gY29ycmVzcG9uZCB3aXRoIHRpbGUgcG9zaXRpb25pbmdcblx0XHQvL1xuXHRcdHZhciBzdmdFbGVtZW50ID0gJCgnPHN2ZyBjbGFzcz1cImQzXCI+JykuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxuXHRcdFx0XHQuYXBwZW5kKCc8c3ZnIHg9XCIxXCIgeT1cIjFcIj4nKS5jaGlsZHJlbigpO1xuXG5cdFx0Ly9cblx0XHQvLyBlbmFibGUgdGhlIGNpcmN1aXRib2FyZCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvclxuXHRcdC8vIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHQvL1xuXHRcdFUubWFrZVBvc2l0aW9uZWQodGhpcy5lbGVtZW50KTtcblxuXHRcdC8vXG5cdFx0Ly8gY3JlYXRlIHRoZSBmb3JjZSBsYXlvdXRcblx0XHQvL1xuXHRcdHRoaXMuZDNGb3JjZSA9IGQzLmxheW91dC5mb3JjZSgpXG5cdFx0XHRcdC5ub2RlcyhVLm9ialZhbHVlcyh0aGlzLl9wX2QzX3ZlcnRpY2VzKSlcblx0XHRcdFx0LmxpbmtzKFUub2JqVmFsdWVzKHRoaXMuX3BfZDNfZWRnZXMpKVxuXHRcdFx0XHQuc2l6ZShbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKVxuXHRcdFx0XHQuZ3Jhdml0eSgwKVxuXHRcdFx0XHQuY2hhcmdlKGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIC0wLjAyNSAqXG5cdFx0XHRcdFx0XHRcdGQuZ3JvdXAuY2hhcmdlRmFjdG9yICpcblx0XHRcdFx0XHRcdFx0ZC5ncm91cC5yZWdpb24ud2lkdGggKlxuXHRcdFx0XHRcdFx0XHRkLmdyb3VwLnJlZ2lvbi5oZWlnaHQgKlxuXHRcdFx0XHRcdFx0XHQoVS5kZWZPcihkLmNoYXJnZUZhY3RvciwgMSkpIC9cblx0XHRcdFx0XHRcdFx0KGQuZ3JvdXAudmVydGljZXMubGVuZ3RoIHx8IDEpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQubGlua0Rpc3RhbmNlKGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDAuMDEgKlxuXHRcdFx0XHRcdFx0XHRkLmdyb3VwLmxpbmtEaXN0YW5jZUZhY3RvciAqXG5cdFx0XHRcdFx0XHRcdGQuZ3JvdXAucmVnaW9uLndpZHRoICpcblx0XHRcdFx0XHRcdFx0ZC5ncm91cC5yZWdpb24uaGVpZ2h0ICpcblx0XHRcdFx0XHRcdFx0KFUuZGVmT3IoZC5saW5rRGlzdGFuY2VGYWN0b3IsIDEpKSAvXG5cdFx0XHRcdFx0XHRcdChkLmdyb3VwLnZlcnRpY2VzLmxlbmd0aCB8fCAxKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmxpbmtTdHJlbmd0aCgwLjgpO1xuXG5cdFx0Ly9cblx0XHQvLyBhdXRvLXJlc2l6ZSB0aGUgZm9yY2UtbGF5b3V0IGNhbnZhc1xuXHRcdC8vXG5cdFx0dGhpcy5vbignc2l6ZScsIChzaXplKSA9PiB7IHRoaXMuZDNGb3JjZS5zaXplKFtzaXplLndpZHRoLCBzaXplLmhlaWdodF0pIH0pO1xuXG5cdFx0Ly9cblx0XHQvLyBjcmVhdGUgY29ycmVzcG9uZGluZyBzdmcgZWxlbWVudHNcblx0XHQvL1xuXHRcdHZhciBzdmcgPSBkMy5zZWxlY3Qoc3ZnRWxlbWVudFswXSk7XG5cdFx0dmFyIGVkZ2VzID0gc3ZnLnNlbGVjdEFsbCgnLmVkZ2UnKTtcblx0XHR2YXIgdmVydGljZXMgPSBzdmcuc2VsZWN0QWxsKCcudmVydGV4Jyk7XG5cblx0XHQvL1xuXHRcdC8vIHZpc2libGUgdmVydGljZXMgYW5kIGVkZ2VzXG5cdFx0Ly9cblx0XHR2YXIgdmlzaWJsZVZlcnRpY2VzLCB2aXNpYmxlRWRnZXM7XG5cblx0XHQvL1xuXHRcdC8vIHVwZGF0ZSB0aGUgZ3JhcGggdG8gYWNjb3VudCBmb3IgbmV3IGFuZC9vciByZW1vdmVkIHZlcnRpY2VzIGFuZC9vciBlZGdlc1xuXHRcdC8vXG5cdFx0dGhpcy51cGRhdGVHcmFwaCA9IFUuZGVib3VuY2UoKCkgPT4ge1xuXG5cdFx0XHQvLyB1c2luZyB0aGUgZDMgZ2VuZXJhbCB1cGRhdGUgcGF0dGVybjpcblx0XHRcdC8vIGh0dHA6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay8zODA4MjE4XG5cblx0XHRcdHZpc2libGVWZXJ0aWNlcyA9IFUub2JqVmFsdWVzKHRoaXMuX3BfZDNfdmVydGljZXMpLmZpbHRlcigoYXJ0ZWZhY3QpID0+IGFydGVmYWN0LnNob3dWZXJ0ZXgpO1xuXHRcdFx0dmlzaWJsZUVkZ2VzID0gVS5vYmpWYWx1ZXModGhpcy5fcF9kM19lZGdlcyk7XG5cblx0XHRcdC8vLy8gcmVzdGFydCB0aGUgZm9yY2Vcblx0XHRcdC8vXG5cdFx0XHR0aGlzLmQzRm9yY2Uubm9kZXModmlzaWJsZVZlcnRpY2VzKS5saW5rcyh2aXNpYmxlRWRnZXMpLnN0YXJ0KCk7XG5cblx0XHRcdC8vLy8gdmVydGljZXNcblx0XHRcdC8vXG5cdFx0XHR2ZXJ0aWNlcyA9IHN2Zy5zZWxlY3RBbGwoJy52ZXJ0ZXgnKS5kYXRhKHZpc2libGVWZXJ0aWNlcywgVS5maWVsZCgnZ3JhcGhJZCcpKTtcblx0XHRcdHZlcnRpY2VzLmVudGVyKCkuYXBwZW5kKChkKSA9PiBkLmVsZW1lbnQpXG5cdFx0XHRcdFx0LmNsYXNzZWQoJ3ZlcnRleCcsIHRydWUpLmNsYXNzZWQoJ2VkZ2UnLCBmYWxzZSlcblx0XHRcdFx0XHQuY2FsbCh0aGlzLmQzRm9yY2UuZHJhZyk7IC8vIGFsbCB2ZXJ0aWNlcyBjYW4gYmUgZHJhZ2dlZCBhcm91bmRcblx0XHRcdHZlcnRpY2VzLmV4aXQoKS5yZW1vdmUoKTtcblxuXHRcdFx0Ly8vLyBlZGdlc1xuXHRcdFx0Ly9cblx0XHRcdGVkZ2VzID0gc3ZnLnNlbGVjdEFsbCgnLmVkZ2UnKS5kYXRhKHZpc2libGVFZGdlcywgVS5maWVsZCgnZ3JhcGhJZCcpKTtcblx0XHRcdGVkZ2VzLmVudGVyKCkuYXBwZW5kKChkKSA9PiBkLmVsZW1lbnQpXG5cdFx0XHRcdFx0LmNsYXNzZWQoJ2VkZ2UnLCB0cnVlKS5jbGFzc2VkKCd2ZXJ0ZXgnLCBmYWxzZSk7XG5cdFx0XHRlZGdlcy5leGl0KCkucmVtb3ZlKCk7XG5cblx0XHRcdC8vLy8gZGVmaW5lIGEgbmljZSB2aXN1YWwgei1vcmRlciBmb3IgdGhlIHN2ZyBlbGVtZW50c1xuXHRcdFx0Ly9cblx0XHRcdHN2Zy5zZWxlY3RBbGwoJy52ZXJ0ZXgsIC5lZGdlJykuc29ydChcblx0XHRcdFx0XHQoYSwgYikgPT4gKGEuZ3JhcGhaSW5kZXggPCBiLmdyYXBoWkluZGV4KSA/IC0xIDogKChhLmdyYXBoWkluZGV4ID09PSBiLmdyYXBoWkluZGV4KSA/IDAgOiAxKVxuXHRcdFx0KTtcblxuXHRcdH0sIDIwMCk7XG5cblx0XHQvL1xuXHRcdC8vIHdoaWxlIGRyYWdnaW5nIGEgdmVydGV4LCBzZXQgdGhlICdkcmFnZ2luZy12ZXJ0ZXgnIGNsYXNzIG9uIHRoZSBjaXJjdWl0Ym9hcmRcblx0XHQvL1xuXHRcdHRoaXMuZDNGb3JjZS5kcmFnKCkub24oJ2RyYWdzdGFydCcsICgpID0+IHtcblx0XHRcdHN2Z0VsZW1lbnQuYWRkQ2xhc3MoJ2RyYWdnaW5nLXZlcnRleCcpO1xuXHRcdH0pLm9uKCdkcmFnZW5kJywgKCkgPT4ge1xuXHRcdFx0c3ZnRWxlbWVudC5yZW1vdmVDbGFzcygnZHJhZ2dpbmctdmVydGV4Jyk7XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdC8vIG9uIGQzIGFuaW1hdGlvbiB0aWNrXG5cdFx0Ly9cblx0XHR0aGlzLmQzRm9yY2Uub24oXCJ0aWNrXCIsIChlKSA9PiB7XG5cdFx0XHR2YXIgayA9IDAuMSAqIGUuYWxwaGE7XG5cblx0XHRcdHZpc2libGVWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGdyYXZpdGF0ZSB0b3dhcmRzIHRoZSBjZW50ZXIgb2YgdGhlIHJlZ2lvblxuXHRcdFx0XHQvL1xuXHRcdFx0XHRkLnggKz0gZC5ncm91cC5ncmF2aXR5RmFjdG9yICogKGQuZ3JvdXAucmVnaW9uLmxlZnQgKyAwLjUgKiBkLmdyb3VwLnJlZ2lvbi53aWR0aCAtIGQueCkgKiBrO1xuXHRcdFx0XHRkLnkgKz0gZC5ncm91cC5ncmF2aXR5RmFjdG9yICogKGQuZ3JvdXAucmVnaW9uLnRvcCArIDAuNSAqIGQuZ3JvdXAucmVnaW9uLmhlaWdodCAtIGQueSkgKiBrO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGFuZCBhbHdheXMgc3RheSB3aXRoaW4gdGhlIHJlZ2lvblxuXHRcdFx0XHQvL1xuXHRcdFx0XHRkLnggPSBNYXRoLm1heChkLngsIGQuZ3JvdXAucmVnaW9uLmxlZnQpO1xuXHRcdFx0XHRkLnggPSBNYXRoLm1pbihkLngsIGQuZ3JvdXAucmVnaW9uLmxlZnQgKyBkLmdyb3VwLnJlZ2lvbi53aWR0aCk7XG5cdFx0XHRcdGQueSA9IE1hdGgubWF4KGQueSwgZC5ncm91cC5yZWdpb24udG9wKTtcblx0XHRcdFx0ZC55ID0gTWF0aC5taW4oZC55LCBkLmdyb3VwLnJlZ2lvbi50b3AgKyBkLmdyb3VwLnJlZ2lvbi5oZWlnaHQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZlcnRpY2VzXG5cdFx0XHRcdFx0LmF0dHIoJ3gnLCAoZCkgPT4gZC54KVxuXHRcdFx0XHRcdC5hdHRyKCd5JywgKGQpID0+IGQueSk7XG5cdFx0XHRlZGdlc1xuXHRcdFx0XHRcdC5hdHRyKFwieDFcIiwgKGQpID0+IGQuc291cmNlLngpXG5cdFx0XHRcdFx0LmF0dHIoXCJ5MVwiLCAoZCkgPT4gZC5zb3VyY2UueSlcblx0XHRcdFx0XHQuYXR0cihcIngyXCIsIChkKSA9PiBkLnRhcmdldC54KVxuXHRcdFx0XHRcdC5hdHRyKFwieTJcIiwgKGQpID0+IGQudGFyZ2V0LnkpO1xuXHRcdH0pO1xuXG5cdFx0JC5leHRlbmQodGhpcywge1xuXHRcdFx0Ly9cblx0XHRcdC8vIGEgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIG5ldyBpbnRlcmZhY2VzLFxuXHRcdFx0Ly8gdXNlZCB0byBjcmVhdGUgdmVydGljZXMgYW5kIGVkZ2VzIGFuZCBzdWNoOlxuXHRcdFx0Ly9cblx0XHRcdG5ld0dyYXBoR3JvdXAob3B0aW9ucykge1xuXHRcdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHRcdFx0dmFyIGNpcmN1aXRib2FyZCA9IHRoaXM7XG5cdFx0XHRcdHZhciBncm91cCA9IHtcblx0XHRcdFx0XHRpZDogdW5pcXVlSWQoJ2dyb3VwJyksXG5cdFx0XHRcdFx0dmVydGljZXM6IFtdLFxuXHRcdFx0XHRcdGVkZ2VzOiBbXSxcblx0XHRcdFx0XHRncmF2aXR5RmFjdG9yOiBVLmRlZk9yKG9wdGlvbnMuZ3Jhdml0eUZhY3RvciwgMSksXG5cdFx0XHRcdFx0Y2hhcmdlRmFjdG9yOiBVLmRlZk9yKG9wdGlvbnMuY2hhcmdlRmFjdG9yLCAxKSxcblx0XHRcdFx0XHRsaW5rRGlzdGFuY2VGYWN0b3I6IFUuZGVmT3Iob3B0aW9ucy5saW5rRGlzdGFuY2VGYWN0b3IsIDEpLFxuXHRcdFx0XHRcdHJlZ2lvbjogVS5kZWZPcihvcHRpb25zLnJlZ2lvbiwgeyAvLyBieSBkZWZhdWx0LCB0aGUgd2hvbGUgY2FudmFzIHdpdGggYSBzbWFsbCBwYWRkaW5nXG5cdFx0XHRcdFx0XHR0b3A6IDEwLFxuXHRcdFx0XHRcdFx0bGVmdDogMTAsXG5cdFx0XHRcdFx0XHRnZXQgd2lkdGgoKSB7IHJldHVybiBjaXJjdWl0Ym9hcmQuc2l6ZS53aWR0aCAtIDIwIH0sXG5cdFx0XHRcdFx0XHRnZXQgaGVpZ2h0KCkgeyByZXR1cm4gY2lyY3VpdGJvYXJkLnNpemUuaGVpZ2h0IC0gMjAgfVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0cmVtb3ZlKCkge1xuXHRcdFx0XHRcdFx0Ly8gY2FsbGVkIHdoZW4gYSBncmFwaCBncm91cCBpcyBkaXNjYXJkZWQ7XG5cdFx0XHRcdFx0XHQvLyBtYXkgZG8gc3R1ZmYgaW4gdGhlIGZ1dHVyZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0R3Jhdml0eUZhY3RvcihmYWN0b3IpIHtcblx0XHRcdFx0XHRcdGdyb3VwLmdyYXZpdHlGYWN0b3IgPSBmYWN0b3I7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXRDaGFyZ2VGYWN0b3IoZmFjdG9yKSB7XG5cdFx0XHRcdFx0XHRncm91cC5jaGFyZ2VGYWN0b3IgPSBmYWN0b3I7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXRMaW5rRGlzdGFuY2VGYWN0b3IoZmFjdG9yKSB7XG5cdFx0XHRcdFx0XHRncm91cC5saW5rRGlzdGFuY2VGYWN0b3IgPSBmYWN0b3I7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXRSZWdpb24ocmVnaW9uKSB7XG5cdFx0XHRcdFx0XHRncm91cC5yZWdpb24gPSByZWdpb247XG5cdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFkZFZlcnRleCh2ZXJ0ZXgpIHtcblx0XHRcdFx0XHRcdHZlcnRleC5ncm91cCA9IGdyb3VwO1xuXHRcdFx0XHRcdFx0dmVydGV4Lmdyb3VwVmVydGV4SW5kZXggPSBncm91cC52ZXJ0aWNlcy5sZW5ndGg7XG5cdFx0XHRcdFx0XHRncm91cC52ZXJ0aWNlcy5wdXNoKHZlcnRleCk7XG5cdFx0XHRcdFx0XHR2ZXJ0ZXguZ3JhcGhJZCA9IHZlcnRleC5pZDtcblx0XHRcdFx0XHRcdGNpcmN1aXRib2FyZC5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF0gPSB2ZXJ0ZXg7XG5cdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlbW92ZVZlcnRleCh2ZXJ0ZXgpIHtcblx0XHRcdFx0XHRcdGlmICh2ZXJ0ZXgpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGNpcmN1aXRib2FyZC5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF07XG5cdFx0XHRcdFx0XHRcdFUucHVsbChncm91cC52ZXJ0aWNlcywgdmVydGV4KTtcblx0XHRcdFx0XHRcdFx0Z3JvdXAudmVydGljZXMuZm9yRWFjaChmdW5jdGlvbiAodmVydGV4LCBpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmVydGV4Lmdyb3VwVmVydGV4SW5kZXggPSBpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0Y2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhZGRFZGdlKGVkZ2UpIHtcblx0XHRcdFx0XHRcdGVkZ2UuZ3JvdXAgPSBncm91cDtcblx0XHRcdFx0XHRcdGdyb3VwLmVkZ2VzLnB1c2goZWRnZSk7XG5cdFx0XHRcdFx0XHRlZGdlLmdyYXBoSWQgPSBncm91cC5pZCArICc6JyArIGVkZ2UuaWQ7XG5cdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXSA9IGVkZ2U7XG5cdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlbW92ZUVkZ2UoZWRnZSkge1xuXHRcdFx0XHRcdFx0aWYgKGVkZ2UpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGNpcmN1aXRib2FyZC5fcF9kM19lZGdlc1tlZGdlLmdyYXBoSWRdO1xuXHRcdFx0XHRcdFx0XHRVLnB1bGwoZ3JvdXAuZWRnZXMsIGVkZ2UpO1xuXHRcdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlbW92ZUFsbEVkZ2VzQW5kVmVydGljZXMoKSB7XG5cdFx0XHRcdFx0XHRncm91cC5lZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChlZGdlKSB7IGRlbGV0ZSBjaXJjdWl0Ym9hcmQuX3BfZDNfZWRnZXNbZWRnZS5ncmFwaElkXTsgfVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRncm91cC52ZXJ0aWNlcy5mb3JFYWNoKCh2ZXJ0ZXgpID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHZlcnRleCkgeyBkZWxldGUgY2lyY3VpdGJvYXJkLl9wX2QzX3ZlcnRpY2VzW3ZlcnRleC5ncmFwaElkXTsgfVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRVLm1ha2VFbXB0eShncm91cC5lZGdlcyk7XG5cdFx0XHRcdFx0XHRVLm1ha2VFbXB0eShncm91cC52ZXJ0aWNlcyk7XG5cdFx0XHRcdFx0XHRjaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHZlcnRleENvdW50KCkgeyByZXR1cm4gZ3JvdXAudmVydGljZXMubGVuZ3RoIH0sXG5cdFx0XHRcdFx0dmVydGljZXMoKSB7IHJldHVybiBncm91cC52ZXJ0aWNlcy5zbGljZSgpIH0sXG5cdFx0XHRcdFx0ZWRnZXMoKSB7IHJldHVybiBncm91cC52ZXJ0aWNlcy5zbGljZSgpIH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtZDMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiZDNcIixcImNvbW1vbmpzMlwiOlwiZDNcIixcImNvbW1vbmpzXCI6XCJkM1wiLFwiYW1kXCI6XCJkM1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW3N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBvYmplY3QgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGEgKHBsYWluKSBvYmplY3QsIG1ha2UgaXQgYW4gZW1wdHkgb2JqZWN0IGZpcnN0XG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSBbXSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdHB1bGwoYXJyLCB2YWwpIHtcblx0XHRcdHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcblx0XHRcdGlmIChpICE9PSAtMSkgeyBhcnIuc3BsaWNlKGkpIH1cblx0XHR9LFxuXG5cdFx0Ly8gZW1wdHkgb3V0IGFuIGFycmF5XG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gZXh0cmFjdCBhbiBhcnJheSBvZiB2YWx1ZXMgZnJvbSBhbiBvYmplY3Rcblx0XHRvYmpWYWx1ZXMob2JqKSB7IHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pIH0sXG5cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0bWFrZVBvc2l0aW9uZWQoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHRcdFx0XHRlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdGhhdCBpcyBub3QgJ3VuZGVmaW5lZCdcblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG5cdFx0Ly8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuXHRcdC8vIE4gbWlsbGlzZWNvbmRzLlxuXHRcdGRlYm91bmNlKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcblx0XHRcdHZhciB0aW1lb3V0O1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBsYXRlckZuID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG5cdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQpO1xuXHRcdFx0XHRpZiAoc3RvcCkgeyByZXR1cm4gfVxuXHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaXRlcmF0aW9uRm4pO1xuXHRcdFx0fVxuXHRcdFx0aXRlcmF0aW9uRm4oKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiBzdG9wRWFjaEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIG9uY2UgcGVyIHN5bmNocm9ub3VzICdzdGFjaycuXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGVzIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdG8gdGhlIGdpdmVuIG9iamVjdDtcblx0XHQvLyB0aGlzIG9iamVjdCBpcyBhc3N1bWVkIHRvIGhhdmUgYSBgdHJpZ2dlcmAgbWV0aG9kXG5cdFx0Ly9cblx0XHQvLyBvcHRpb25zLm5hbWUgKG1hbmRhdG9yeSkgLSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcblx0XHQvLyBvcHRpb25zLnZhbGlkYXRpb24gLSBpZiBzcGVjaWZpZWQsIHRoaXMgZnVuY3Rpb24gaXMgcnVuIGJlZm9yZSBhIG5ldyB2YWx1ZSBpcyBhY3R1YWxseSBzZXQuXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgSXQgaXMgcGFzc2VkIHRoZSBuZXcgdmFsdWUgYW5kIHRoZSBvbGQgdmFsdWUsIGFuZCBzaG91bGQgcmV0dXJuIHRoZSBhY3R1YWxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQuIFRoaXMgY291bGQgYmUgdGhlIG5ldyBvciBvbGQgdmFsdWUgZGlyZWN0bHksXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgb3IgYW55IHRyYW5zZm9ybWF0aW9uLiBJdCBjYW4gYWxzbyB0aHJvdyBhbiBleGNlcHRpb24sIHdoaWNoIHdpbGwganVzdCBiZVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWQgdG8gcGFzcyB0aHJvdWdoLiBSZXR1cm5pbmcgdGhlIG9sZCB2YWx1ZSBwcmV2ZW50cyBhIHNpZ25hbCBmcm9tXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYmVpbmcgdHJpZ2dlcmVkLlxuXHRcdG9ic2VydmFibGUob2JqLCB7bmFtZSwgaW5pdGlhbCwgdmFsaWRhdGlvbn0pIHtcblx0XHRcdHZhciB2YWx1ZSA9IGluaXRpYWw7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHZhbHVlIH0sXG5cdFx0XHRcdHNldChuZXdWYWx1ZSkge1xuXHRcdFx0XHRcdHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdGlmICh2YWxpZGF0aW9uKSB7IG5ld1ZhbHVlID0gdmFsaWRhdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIH1cblx0XHRcdFx0XHRpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKG5hbWUsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IGNhY2hlIHRvIG1hbmFnZSBhIHNwZWNpZmljIHZhbHVlIHRoYXQgaXMgY29zdGx5IHRvIGNvbXB1dGUgb3IgcmV0cmlldmUuXG5cdFx0Ly8gSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhIGNhY2hlXG5cdFx0Ly8gdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWVcblx0XHQvLyBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duXG5cdFx0Ly8gY29tcGFyaXNvbiBmdW5jdGlvbi5cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly8gbm9ybWFsaXplIHBhcmFtZXRlcnNcblx0XHRcdHZhciByZXRyaWV2ZSA9IG9wdGlvbnMucmV0cmlldmUsXG5cdFx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vIGtlZXAgYSBjYWNoZSBhbmQgZ2l2ZSBpdCBhbiBpbml0aWFsIHZhbHVlXG5cdFx0XHR2YXIgY2FjaGU7XG5cdFx0XHRmdW5jdGlvbiBzZXRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGNhY2hlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0aWYgKG9uQ2hhbmdlICYmICFpc0VxdWFsKGNhY2hlLCBvbGRWYWx1ZSkpIHtcblx0XHRcdFx0XHRvbkNoYW5nZShjYWNoZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KHNldFZhbHVlLCAwKTtcblxuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhzZXRWYWx1ZSk7XG5cblx0XHRcdC8vIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLFxuXHRcdFx0Ly8gYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBjYWNoZSAod2hpY2ggbWF5IGNvbnRhaW4gdGhlIG5ldyB2YWx1ZSlcblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gYWxsb3cgdGhlIG9uQ2hhbmdlIGNhbGxiYWNrIHRvIGJlIHNldCBhZnRlciBjcmVhdGlvbjtcblx0XHRcdC8vIE5PVEU6IG9ubHkgb25lIGNhbGxiYWNrIGlzIHN0b3JlZCFcblx0XHRcdHZhciBvbkNoYW5nZTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7IG9uQ2hhbmdlID0gY2I7IHJldHVybiByZXN1bHRGbjsgfTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH1cblxuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHBvc2l0aW9uXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gYSAmJiBiICYmIGEudG9wID09PSBiLnRvcCAmJiBhLmxlZnQgPT09IGIubGVmdDtcblx0fTtcblxuXG5cdC8vIEhUTUwgZWxlbWVudCBzaXplXG5cdFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGhlaWdodCwgd2lkdGgpIHtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIGEgJiYgYiAmJiBhLmhlaWdodCA9PT0gYi5oZWlnaHQgJiYgYS53aWR0aCA9PT0gYi53aWR0aDtcblx0fTtcblxuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9uZXh0SWQgPSAwO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcblx0XHRyZXR1cm4gYCR7cHJlZml4fHxcInVuaXF1ZS1pZFwifS0ke19uZXh0SWQrK31gO1xuXHR9O1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3VuaXF1ZS1pZC5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC1kMy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWQzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvcC1kMy5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWQzLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jaXJjdWl0Ym9hcmQ+c3ZnLmQze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbjowO3BvaW50ZXItZXZlbnRzOm5vbmU7fS5jaXJjdWl0Ym9hcmQ+c3ZnLmQzIHN2Zy52ZXJ0ZXh7b3ZlcmZsb3c6dmlzaWJsZTtjdXJzb3I6cG9pbnRlcjt9LmNpcmN1aXRib2FyZD5zdmcuZDMuZHJhZ2dpbmctdmVydGV4e3BvaW50ZXItZXZlbnRzOmFsbDtjdXJzb3I6LXdlYmtpdC1ncmFiYmluZztjdXJzb3I6LW1vei1ncmFiYmluZztjdXJzb3I6Z3JhYmJpbmc7fVwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLWQzLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLWQzLmpzIn0=