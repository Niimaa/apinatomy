(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("chroma-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "chroma-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("chroma-js")) : factory(root["jQuery"], root["chroma"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(7), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, color, U, defaults) {
	  'use strict';
	  var applyStyleDefaults = defaults({
	    '&': {
	      backgroundColor: " 'white'                                                                ",
	      borderColor: " color(`['&'].backgroundColor`).brighten(20).css()                      ",
	      color: " color(`['&'].backgroundColor`).luminance() > 0.5 && 'black' || 'white' "
	    },
	    '& > header': {borderColor: " `['&'].borderColor` "},
	    '& > icon-btn': {backgroundColor: " `['&'].backgroundColor` "}
	  }, {color: color});
	  $.circuitboard.plugin({
	    name: 'tile-skin',
	    after: ['tile-core', 'tile-weight', 'tile-open'],
	    'modify tile': {
	      'add enableDynamicFontSizing': function() {
	        var $__0 = this;
	        this.on('open', (function(open) {
	          if (!open) {
	            requestAnimationFrame(testResize);
	          }
	        }));
	        var headerSize = {
	          height: 0,
	          width: 0
	        };
	        var setHeaderFontSize = (function() {
	          $__0._p_tileSkin_headerElement.css('fontSize', Math.min(0.2 * Math.pow(headerSize.height, 1.01), 0.13 * Math.pow(headerSize.width, 1.01)));
	        });
	        var testResize = (function() {
	          if (!$__0.open) {
	            var newHeaderSize = {
	              width: $__0._p_tileSkin_headerElement.width(),
	              height: $__0._p_tileSkin_headerElement.height()
	            };
	            if (!U.approx(headerSize.width, newHeaderSize.width) || !U.approx(headerSize.height, newHeaderSize.height)) {
	              $.extend(headerSize, newHeaderSize);
	              setHeaderFontSize();
	            }
	            requestAnimationFrame(testResize);
	          }
	        });
	        testResize();
	      },
	      'insert constructor': function() {
	        var $__0 = this;
	        var origElement = this.dom;
	        origElement.addClass('skinned-tile');
	        this._p_tileSkin_headerElement = $("<header/>").appendTo(origElement);
	        this.dom = $("<section/>").appendTo(origElement);
	        this.model.get('name').then((function(name) {
	          $__0._p_tileSkin_headerElement.text(name);
	        }));
	        this.enableDynamicFontSizing();
	        this.model.get('tile').get('normal').get('css').then((function(css) {
	          $__0.element.amyPutCssRules(applyStyleDefaults(css));
	        })).catch((function() {}));
	      }
	    }
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U) {
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
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
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
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/amy-p-tile-skin.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/amy-p-tile-skin.scss");
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
	exports.push([module.id, ".skinned-tile{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.skinned-tile>header{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-weight:bold;border-width:1px;overflow:hidden;}.skinned-tile.open>header{height:26px;border-style:none none solid none;line-height:26px;font-size:19.5px !important;white-space:nowrap;}.skinned-tile:not(.open)>header{-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding:0 5px;}.skinned-tile>section{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}.skinned-tile.open>section{-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;opacity:1;}.skinned-tile:not(.open)>section{opacity:0;}", ""]);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNjg0ZDMwNTAxNTk5ODg1OWU4ZiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9hbXktcC10aWxlLXNraW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJjaHJvbWFcIixcImNvbW1vbmpzMlwiOlwiY2hyb21hLWpzXCIsXCJjb21tb25qc1wiOlwiY2hyb21hLWpzXCIsXCJhbWRcIjpcImNocm9tYS1qc1wifSIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uLi9hbXktdXRpbC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvcHV0LWNzcy1ydWxlcy5qcyIsIndlYnBhY2s6Ly8vLi4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L2FteS1wLXRpbGUtc2tpbi5zY3NzP2JkNzEiLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvYW15LXAtdGlsZS1za2luLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7QUFDQSxTQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0Esa0JBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBLGlDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUEyRDtBQUMzRCxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiY2hyb21hLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImNocm9tYS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiY2hyb21hLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcImNocm9tYVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhNjg0ZDMwNTAxNTk5ODg1OWU4ZlxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnY2hyb21hLWpzJyxcblx0Jy4vYW15LXV0aWwvbWlzYy5qcycsXG5cdCcuL2FteS11dGlsL2RlZmF1bHRzLmpzJyxcblx0Jy4vYW15LXV0aWwvcHV0LWNzcy1ydWxlcy5qcycsXG5cdCcuL2FteS1wLXRpbGUtc2tpbi5zY3NzJyxcblx0Jy4vYW15LXV0aWwvaGFuZGxlLXByZW1hdHVyZS1wbHVnaW5zLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIGNvbG9yLCBVLCBkZWZhdWx0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGlsZSBzdHlsaW5nIGRlZmF1bHRzIGdlbmVyYXRvclxuXHQvL1xuXHR2YXIgYXBwbHlTdHlsZURlZmF1bHRzID0gZGVmYXVsdHMoe1xuXHRcdCcmJzogICAgICAgICAgICB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiICd3aGl0ZScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXG5cdFx0XHRib3JkZXJDb2xvcjogICAgIFwiIGNvbG9yKGBbJyYnXS5iYWNrZ3JvdW5kQ29sb3JgKS5icmlnaHRlbigyMCkuY3NzKCkgICAgICAgICAgICAgICAgICAgICAgXCIsXG5cdFx0XHRjb2xvcjogICAgICAgICAgIFwiIGNvbG9yKGBbJyYnXS5iYWNrZ3JvdW5kQ29sb3JgKS5sdW1pbmFuY2UoKSA+IDAuNSAmJiAnYmxhY2snIHx8ICd3aGl0ZScgXCJcblx0XHR9LFxuXHRcdCcmID4gaGVhZGVyJzogICB7XG5cdFx0XHRib3JkZXJDb2xvcjogXCIgYFsnJiddLmJvcmRlckNvbG9yYCBcIlxuXHRcdH0sXG5cdFx0JyYgPiBpY29uLWJ0bic6IHtcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIgYFsnJiddLmJhY2tncm91bmRDb2xvcmAgXCJcblx0XHR9XG5cdH0sIHsgY29sb3I6IGNvbG9yIH0pO1xuXG5cdC8vXG5cdC8vIHRoZSBwbHVnaW5cblx0Ly9cblx0JC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1za2luJyxcblx0XHRhZnRlcjogWyd0aWxlLWNvcmUnLCAndGlsZS13ZWlnaHQnLCAndGlsZS1vcGVuJ10sXG5cblx0XHQnbW9kaWZ5IHRpbGUnOiB7XG5cblx0XHRcdCdhZGQgZW5hYmxlRHluYW1pY0ZvbnRTaXppbmcnOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMub24oJ29wZW4nLCAob3BlbikgPT4ge1xuXHRcdFx0XHRcdGlmICghb3BlbikgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGVzdFJlc2l6ZSkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dmFyIGhlYWRlclNpemUgPSB7XG5cdFx0XHRcdFx0aGVpZ2h0OiAwLFxuXHRcdFx0XHRcdHdpZHRoOiAwXG5cdFx0XHRcdH07XG5cdFx0XHRcdHZhciBzZXRIZWFkZXJGb250U2l6ZSA9ICgpID0+IHtcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC8vIGZvcm11bGEgZ290dGVuIGV4cGVyaW1lbnRhbGx5XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHR0aGlzLl9wX3RpbGVTa2luX2hlYWRlckVsZW1lbnQuY3NzKCdmb250U2l6ZScsXG5cdFx0XHRcdFx0XHRNYXRoLm1pbihcblx0XHRcdFx0XHRcdFx0XHQwLjIgKiBNYXRoLnBvdyhoZWFkZXJTaXplLmhlaWdodCwgMS4wMSksXG5cdFx0XHRcdFx0XHRcdFx0MC4xMyAqIE1hdGgucG93KGhlYWRlclNpemUud2lkdGgsIDEuMDEpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dmFyIHRlc3RSZXNpemUgPSAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLm9wZW4pIHtcblx0XHRcdFx0XHRcdHZhciBuZXdIZWFkZXJTaXplID0ge1xuXHRcdFx0XHRcdFx0XHR3aWR0aCA6IHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudC53aWR0aCgpLFxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudC5oZWlnaHQoKVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGlmICghVS5hcHByb3goaGVhZGVyU2l6ZS53aWR0aCwgbmV3SGVhZGVyU2l6ZS53aWR0aCkgfHxcblx0XHRcdFx0XHRcdFx0IVUuYXBwcm94KGhlYWRlclNpemUuaGVpZ2h0LCBuZXdIZWFkZXJTaXplLmhlaWdodCkpIHtcblx0XHRcdFx0XHRcdFx0JC5leHRlbmQoaGVhZGVyU2l6ZSwgbmV3SGVhZGVyU2l6ZSk7XG5cdFx0XHRcdFx0XHRcdHNldEhlYWRlckZvbnRTaXplKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGVzdFJlc2l6ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHR0ZXN0UmVzaXplKCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQnaW5zZXJ0IGNvbnN0cnVjdG9yJzogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBjcmVhdGUgdGhlIGhlYWRlciBhbmQgY29udGVudCBlbGVtZW50cywgYW5kIHJlcm91dGUgdGhlXG5cdFx0XHRcdC8vICdkb20nIHByb3BlcnR5IHRvIHRoZSBuZXcgY29udGVudCBlbGVtZW50XG5cdFx0XHRcdC8vXG5cdFx0XHRcdHZhciBvcmlnRWxlbWVudCA9IHRoaXMuZG9tO1xuXHRcdFx0XHRvcmlnRWxlbWVudC5hZGRDbGFzcygnc2tpbm5lZC10aWxlJyk7XG5cdFx0XHRcdHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudCA9ICQoYDxoZWFkZXIvPmApLmFwcGVuZFRvKG9yaWdFbGVtZW50KTtcblx0XHRcdFx0dGhpcy5kb20gPSAkKGA8c2VjdGlvbi8+YCkuYXBwZW5kVG8ob3JpZ0VsZW1lbnQpO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHB1dCB0aGUgbmFtZSBvZiB0aGUgbW9kZWwgaW4gdGhlIGhlYWRlciBlbGVtZW50XG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMubW9kZWwuZ2V0KCduYW1lJykudGhlbigobmFtZSk9PiB7IHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudC50ZXh0KG5hbWUpIH0pO1xuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIHdoZW4gdGhlIHRpbGUgaXMgY2xvc2VkLCBtYWtlIHRoZSBmb250IHNpemUgZHluYW1pY1xuXHRcdFx0XHQvL1xuXHRcdFx0XHR0aGlzLmVuYWJsZUR5bmFtaWNGb250U2l6aW5nKCk7XG5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gdGFrZSBhbnkgY3NzIHJ1bGVzIGZyb20gdGhlIG1vZGVsIGFuZCBhcHBseSB0aGVtIHRvIHRoZSB0aWxlXG5cdFx0XHRcdC8vXG5cdFx0XHRcdHRoaXMubW9kZWwuZ2V0KCd0aWxlJykuZ2V0KCdub3JtYWwnKS5nZXQoJ2NzcycpLnRoZW4oKGNzcyk9PiB7IHRoaXMuZWxlbWVudC5hbXlQdXRDc3NSdWxlcyhhcHBseVN0eWxlRGVmYXVsdHMoY3NzKSkgfSlcblx0XHRcdFx0XHQuY2F0Y2goKCk9Pnt9KTsgLy8gaXQncyBPSyBpZiAnLnRpbGUubm9ybWFsLmNzcycgaXMgbm90IG9uIHRoZSBtb2RlbFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvYW15LXAtdGlsZS1za2luLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImNocm9tYVwiLFwiY29tbW9uanMyXCI6XCJjaHJvbWEtanNcIixcImNvbW1vbmpzXCI6XCJjaHJvbWEtanNcIixcImFtZFwiOlwiY2hyb21hLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblx0XHQvL1xuXHRcdC8vIHRlc3QgZXF1YWxpdHkgd2l0aCBhIHRvbGVyYW5jZSBvZiBlcHNpbG9uXG5cdFx0Ly9cblx0XHRhcHByb3g6IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBlcHNpbG9uKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChlcHNpbG9uKSkgeyBlcHNpbG9uID0gMWUtNSB9XG5cdFx0XHRyZXR1cm4gKE1hdGguYWJzKHZhbDEgLSB2YWwyKSA8IGVwc2lsb24pO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHQvL1xuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdC8vXG5cdFx0b2JqZWN0KG9iaiwgbmFtZSkge1xuXHRcdFx0aWYgKCEkLmlzUGxhaW5PYmplY3Qob2JqW25hbWVdKSkgeyBvYmpbbmFtZV0gPSB7fSB9XG5cdFx0XHRyZXR1cm4gb2JqW25hbWVdO1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0Ly9cblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmICghJC5pc0FycmF5KG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBwdWxsIGEgdmFsdWUgZnJvbSBhbiBhcnJheVxuXHRcdC8vXG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdC8vXG5cdFx0bWFrZUVtcHR5KGFycikge1xuXHRcdFx0d2hpbGUgKGFyci5sZW5ndGggPiAwKSB7IGFyci5wb3AoKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0Ly9cblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvL1xuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHQvL1xuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0Ly9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHQvL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0Ly9cblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvL1xuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0Ly9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly9cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdC8vXG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly9cblx0XHQvLyBlbmFibGUgYW4gSFRNTCBlbGVtZW50IHRvIHNlcnZlIGFzIGFuY2hvciBmb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGNoaWxkcmVuXG5cdFx0Ly9cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0Ly9cblx0XHRkZWZPciguLi52YWx1ZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7IHJldHVybiB2YWx1ZXNbaV0gfVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0Ly9cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly9cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdC8vXG5cdFx0b25jZVBlclN0YWNrKGZ1bmMsIGNvbnRleHQpIHtcblx0XHRcdHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmIChub3RSdW5ZZXQpIHtcblx0XHRcdFx0XHRub3RSdW5ZZXQgPSBmYWxzZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHsgbm90UnVuWWV0ID0gdHJ1ZSB9LCAwKTtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvL1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Ly9cblx0XHRjYWNoZWQob3B0aW9ucykge1xuXHRcdFx0Ly9cblx0XHRcdC8vIG5vcm1hbGl6ZSBwYXJhbWV0ZXJzXG5cdFx0XHQvL1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Ly9cblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0Ly9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL21pc2MuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIGRlZXBUcmFuc2Zvcm0odmFsLCBmbikge1xuXHRcdGlmICgkLmlzUGxhaW5PYmplY3QodmFsKSB8fCAkLmlzQXJyYXkodmFsKSkge1xuXHRcdFx0JC5lYWNoKHZhbCwgKGtleSwgc3ViVmFsKSA9PiB7XG5cdFx0XHRcdHZhciByZXR1cm5lZCA9IGZuKHN1YlZhbCk7XG5cdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHJldHVybmVkKSkge1xuXHRcdFx0XHRcdGRlZXBUcmFuc2Zvcm0oc3ViVmFsLCBmbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsW2tleV0gPSByZXR1cm5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIFJFRl9QQVRURVJOID0gL2AoW1xcW1xcLl0uKz8pYC9nO1xuXG5cdHJldHVybiBmdW5jdGlvbiBkZWZhdWx0cyhzcGVjLCBjb250ZXh0KSB7XG5cblx0XHRkZWVwVHJhbnNmb3JtKHNwZWMsICh2YWwpID0+IHtcblx0XHRcdGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR2YXIgcmVmcyA9ICh2YWwubWF0Y2goUkVGX1BBVFRFUk4pIHx8IFtdKS5tYXAoKHJlZikgPT4ge1xuXHRcdFx0XHRcdHZhciBzdHJpcHBlZFJlZiA9IHJlZi5zdWJzdHJpbmcoMSxyZWYubGVuZ3RoLTEpO1xuXHRcdFx0XHRcdHJldHVybiBuZXcgRnVuY3Rpb24oJ3JlZnMnLCBgcmV0dXJuIHJlZnMke3N0cmlwcGVkUmVmfWApO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dmFyIGV4cHIgPSB2YWwucmVwbGFjZShSRUZfUEFUVEVSTiwgXCIocmVmcyQxKVwiKTtcblx0XHRcdFx0dmFyIHRlbXBsYXRlRm4gPSAoZm9ybWFsUGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0dmFyIG5ld0Zvcm1hbFBhcmFtcyA9IGZvcm1hbFBhcmFtcy5jb25jYXQoW2ByZXR1cm4gJHtleHByfWBdKTtcblx0XHRcdFx0XHRyZXR1cm4gVS5hcHBseUNvbnN0cnVjdG9yKEZ1bmN0aW9uLCBuZXdGb3JtYWxQYXJhbXMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0ZW1wbGF0ZUZuLnJlZnMgPSByZWZzO1xuXHRcdFx0XHRyZXR1cm4gdGVtcGxhdGVGbjtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0Ly8vLyByZWN1cnNpdmUgYXV4aWxpYXJ5IGZ1bmN0aW9uOyByZXR1cm5zIHRydWUgaWYgYSBjaGFuZ2UgdG8gb2JqIHdhcyBtYWRlXG5cdFx0ZnVuY3Rpb24gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWMsIG9iaiwgcmVmcywgcGFyYW1zKSB7XG5cdFx0XHR2YXIgY2hhbmdlID0gZmFsc2U7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWZTcGVjKS5mb3JFYWNoKChrZXkpID0+IHtcblxuXHRcdFx0XHRpZiAoa2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmICgkLmlzUGxhaW5PYmplY3QoZGVmU3BlY1trZXldKSAmJiAkLmlzUGxhaW5PYmplY3Qob2JqW2tleV0pKSB7XG5cdFx0XHRcdFx0XHRjaGFuZ2UgPSB3aXRoRGVmYXVsdHNBdXgoZGVmU3BlY1trZXldLCBvYmpba2V5XSwgcmVmcywgcGFyYW1zKSB8fCBjaGFuZ2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNQbGFpbk9iamVjdChkZWZTcGVjW2tleV0pKSB7XG5cdFx0XHRcdFx0b2JqW2tleV0gPSB7fTtcblx0XHRcdFx0XHRjaGFuZ2UgPSB3aXRoRGVmYXVsdHNBdXgoZGVmU3BlY1trZXldLCBvYmpba2V5XSwgcmVmcywgcGFyYW1zKSB8fCBjaGFuZ2U7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKGRlZlNwZWNba2V5XSkpIHtcblx0XHRcdFx0XHRpZiAoZGVmU3BlY1trZXldLnJlZnMuZXZlcnkoKHJlZikgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuICFVLmlzVW5kZWZpbmVkKHJlZihyZWZzKSk7XG5cdFx0XHRcdFx0fSkpIHsgLy8gaWYgbm9uZSBvZiB0aGUgcmVmZXJlbmNlcyBhcmUgdW5kZWZpbmVkLCBhc3NpZ24gdGhpcyAnZGVmYXVsdCdcblx0XHRcdFx0XHRcdHZhciBhbGxwYXJhbXMgPSAkLmV4dGVuZCh7IHJlZnM6IHJlZnMgfSwgY29udGV4dCwgcGFyYW1zKTtcblx0XHRcdFx0XHRcdHZhciBmb3JtYWxQYXJhbXMgPSBPYmplY3Qua2V5cyhhbGxwYXJhbXMpO1xuXHRcdFx0XHRcdFx0dmFyIGFjdHVhbFBhcmFtcyA9IGZvcm1hbFBhcmFtcy5tYXAoKGZwYXIpID0+IGFsbHBhcmFtc1tmcGFyXSk7XG5cdFx0XHRcdFx0XHR2YXIgZmluYWxGbiA9IGRlZlNwZWNba2V5XShmb3JtYWxQYXJhbXMpO1xuXHRcdFx0XHRcdFx0b2JqW2tleV0gPSBmaW5hbEZuLmFwcGx5KG51bGwsIGFjdHVhbFBhcmFtcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGNoYW5nZTtcblx0XHR9XG5cblxuXHRcdHJldHVybiBmdW5jdGlvbiB3aXRoRGVmYXVsdHMob2JqLCBwYXJhbXMpIHtcblx0XHRcdHZhciByZXN1bHQgPSAoVS5pc1VuZGVmaW5lZChvYmopID8ge30gOiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKSk7XG5cblx0XHRcdHZhciBjaGFuZ2UgPSB0cnVlO1xuXHRcdFx0d2hpbGUgKGNoYW5nZSkge1xuXHRcdFx0XHRjaGFuZ2UgPSB3aXRoRGVmYXVsdHNBdXgoc3BlYywgcmVzdWx0LCByZXN1bHQsIHBhcmFtcyB8fCB7fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblx0fTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9kZWZhdWx0cy5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGFrZXMgYW4gb2JqZWN0IG1hcHBpbmcgJ3NlbGVjdG9yJyDihpIgJ3Byb3BlcnR5JyDihpIgJ3ZhbHVlJyBhbmRcblx0Ly8gYXBwbGllcyBpdCBhcyBhIHNldCBvZiBDU1MgcnVsZXMgdG8gdGhlIGRlc2NlbmRhbnRzIG9mIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0Ly9cblx0JC5mbi5leHRlbmQoe1xuXHRcdGFteVB1dENzc1J1bGVzOiBmdW5jdGlvbiAocnVsZXMpIHtcblx0XHRcdCQuZWFjaChydWxlcywgKHNlbGVjdG9yLCBjc3MpID0+IHtcblx0XHRcdFx0dmFyIGNvbnRleHQ7XG5cdFx0XHRcdGlmIChzZWxlY3Rvci50cmltKCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbGVjdG9yLnRyaW0oKS5jaGFyQXQoMCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IudHJpbSgpLnN1YnN0cigxKS50cmltKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRleHQuY3NzKGNzcyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9hbXktdXRpbC9wdXQtY3NzLXJ1bGVzLmpzXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyB0aGlzIGNhbiBiZSBsb2FkZWQgYmVmb3JlIGEgcGx1Z2luIGZpbGUgdG8gZWxlZ2FudGx5IGhhbmRsZVxuXHQvLyB0aGUgc2l0dWF0aW9uIHdoZXJlIHRoZSBjaXJjdWl0Ym9hcmQgbW9kdWxlIGlzIG5vdCB5ZXQgbG9hZGVkXG5cdC8vIHRvIHJlY2VpdmUgaXRcblx0Ly9cblx0aWYgKCEkLmNpcmN1aXRib2FyZCkge1xuXHRcdCQuY2lyY3VpdGJvYXJkID0ge1xuXHRcdFx0cHJlbWF0dXJlUGx1Z2luczogW10sXG5cdFx0XHRwbHVnaW46IGZ1bmN0aW9uIChuZXdQbHVnaW4pIHtcblx0XHRcdFx0JC5jaXJjdWl0Ym9hcmQucHJlbWF0dXJlUGx1Z2lucy5wdXNoKG5ld1BsdWdpbik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL2FteS11dGlsL2hhbmRsZS1wcmVtYXR1cmUtcGx1Z2lucy5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvLmludGVybWVkaWF0ZS1vdXRwdXQvYW15LXAtdGlsZS1za2luLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbbW9kdWxlLmlkLCBjb250ZW50LCAnJ107XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9hbXktcC10aWxlLXNraW4uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9hbXktcC10aWxlLXNraW4uc2Nzc1wiKTtcblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ107XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vLmludGVybWVkaWF0ZS1vdXRwdXQvYW15LXAtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5za2lubmVkLXRpbGV7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lOy13ZWJraXQtZmxleC1kaXJlY3Rpb246Y29sdW1uOy1tcy1mbGV4LWRpcmVjdGlvbjpjb2x1bW47ZmxleC1kaXJlY3Rpb246Y29sdW1uO30uc2tpbm5lZC10aWxlPmhlYWRlcntkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWFsaWduLWl0ZW1zOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyOy13ZWJraXQtanVzdGlmeS1jb250ZW50OmNlbnRlcjstbXMtZmxleC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtd2VpZ2h0OmJvbGQ7Ym9yZGVyLXdpZHRoOjFweDtvdmVyZmxvdzpoaWRkZW47fS5za2lubmVkLXRpbGUub3Blbj5oZWFkZXJ7aGVpZ2h0OjI2cHg7Ym9yZGVyLXN0eWxlOm5vbmUgbm9uZSBzb2xpZCBub25lO2xpbmUtaGVpZ2h0OjI2cHg7Zm9udC1zaXplOjE5LjVweCAhaW1wb3J0YW50O3doaXRlLXNwYWNlOm5vd3JhcDt9LnNraW5uZWQtdGlsZTpub3QoLm9wZW4pPmhlYWRlcnstd2Via2l0LWZsZXgtZ3JvdzoxOy1tcy1mbGV4LXBvc2l0aXZlOjE7ZmxleC1ncm93OjE7cGFkZGluZzowIDVweDt9LnNraW5uZWQtdGlsZT5zZWN0aW9uey13ZWJraXQtdXNlci1zZWxlY3Q6dGV4dDstbW96LXVzZXItc2VsZWN0OnRleHQ7LW1zLXVzZXItc2VsZWN0OnRleHQ7dXNlci1zZWxlY3Q6dGV4dDt9LnNraW5uZWQtdGlsZS5vcGVuPnNlY3Rpb257LXdlYmtpdC1mbGV4LWdyb3c6MTstbXMtZmxleC1wb3NpdGl2ZToxO2ZsZXgtZ3JvdzoxO29wYWNpdHk6MTt9LnNraW5uZWQtdGlsZTpub3QoLm9wZW4pPnNlY3Rpb257b3BhY2l0eTowO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vLmludGVybWVkaWF0ZS1vdXRwdXQvYW15LXAtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiYW15LXAtdGlsZS1za2luLmpzIn0=