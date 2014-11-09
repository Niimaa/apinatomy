(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("chroma-js"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "chroma-js", "bluebird"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("chroma-js"), require("bluebird")) : factory(root["jQuery"], root["chroma"], root["P"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, color, U, defaults) {
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
	    var unsubscribe;
	    this.observe('open', (function(open) {
	      if (open) {
	        if (unsubscribe) {
	          unsubscribe();
	          unsubscribe = undefined;
	        }
	      } else {
	        unsubscribe = $__0.observe('size', (function(size) {
	          $__0._p_tileSkin_headerElement.css('fontSize', Math.min(0.2 * Math.pow(size.height, 1.01), 0.13 * Math.pow(size.width, 1.01)));
	        }));
	      }
	    }));
	    this.newObservable('headerSize');
	    this.observe('size', (function(size) {
	      $__0.headerSize = new U.Size($__0._p_tileSkin_headerElement.height(), size.width);
	    }));
	    this.newObservable('headerPosition');
	    this.observe('position', (function(position) {
	      $__0.headerPosition = position;
	    }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  var U = {
	    newClass: function(constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
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
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, [superClass.prototype.constructor].concat(args));
	      };
	      cls.prototype = Object.create(superClass.prototype, prototype);
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__1 = 1; $__1 < arguments.length; $__1++)
	        rest[$__1 - 1] = arguments[$__1];
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
	    call: function(fn) {
	      for (var args = [],
	          $__2 = 1; $__2 < arguments.length; $__2++)
	        args[$__2 - 1] = arguments[$__2];
	      return fn.apply(undefined, args);
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
	      var unsubscribeFn = (function() {
	        if (unsubscribeFn.stillSubscribed) {
	          unsubscribeFn.stillSubscribed = false;
	          delete unsubscribeFn.unsubscribeOn;
	          stop = true;
	        }
	      });
	      unsubscribeFn.stillSubscribed = true;
	      unsubscribeFn.unsubscribeOn = (function(subscriber) {
	        subscriber(unsubscribeFn);
	        return unsubscribeFn;
	      });
	      return unsubscribeFn;
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
	    optionalCurry: function(fn) {
	      return function() {
	        if (fn.length <= arguments.length) {
	          return fn.apply(this, arguments);
	        } else {
	          return U.bindA(fn, this, arguments);
	        }
	      };
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
	    return U.isDefined(a) && U.isDefined(b) && a.top === b.top && a.left === b.left;
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && a.height === b.height && a.width === b.width;
	  });
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-tile-skin.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/.intermediate-output/p-tile-skin.scss");
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
	exports.push([module.id, ".skinned-tile{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.skinned-tile>header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-weight:bold;border-width:1px;overflow:hidden;}.skinned-tile.open>header{height:26px;border-style:none none solid none;line-height:26px;font-size:19.5px !important;white-space:nowrap;}.skinned-tile:not(.open)>header{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding:0 5px;}.skinned-tile>section{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;}.skinned-tile.open>section{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;opacity:1;}.skinned-tile:not(.open)>section{opacity:0;}", ""]);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MTY4ZTFkMmU1MDRkOTkyOTc0YiIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtc2tpbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImNocm9tYVwiLFwiY29tbW9uanMyXCI6XCJjaHJvbWEtanNcIixcImNvbW1vbmpzXCI6XCJjaHJvbWEtanNcIixcImFtZFwiOlwiY2hyb21hLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9wdXQtY3NzLXJ1bGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aWxlLXNraW4uc2Nzcz9kZTFkIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmlu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QSxFIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiY2hyb21hLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiY2hyb21hLWpzXCIsIFwiYmx1ZWJpcmRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImNocm9tYS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcImNocm9tYVwiXSwgcm9vdFtcIlBcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDgxNjhlMWQyZTUwNGQ5OTI5NzRiXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdjaHJvbWEtanMnLFxuXHQnLi91dGlsL21pc2MuanMnLFxuXHQnLi91dGlsL2RlZmF1bHRzLmpzJyxcblx0Jy4vdXRpbC9wdXQtY3NzLXJ1bGVzLmpzJyxcblx0Jy4vcC10aWxlLXNraW4uc2Nzcydcbl0sIGZ1bmN0aW9uICgkLCBjb2xvciwgVSwgZGVmYXVsdHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtc2tpbicsXG5cdFx0cmVxdWlyZXM6IFsndGlsZS1vcGVuJywgJ3Bvc2l0aW9uLXRyYWNraW5nJ11cblx0fSkubW9kaWZ5KCdUaWxlLnByb3RvdHlwZScpO1xuXG5cblx0LyogdGlsZSBzdHlsaW5nIGRlZmF1bHRzIGdlbmVyYXRvciAqL1xuXHR2YXIgYXBwbHlTdHlsZURlZmF1bHRzID0gZGVmYXVsdHMoe1xuXHRcdCcmJzogICAgICAgICAgICB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiICd3aGl0ZScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsXG5cdFx0XHRib3JkZXJDb2xvcjogICAgIFwiIGNvbG9yKGBbJyYnXS5iYWNrZ3JvdW5kQ29sb3JgKS5icmlnaHRlbigyMCkuY3NzKCkgICAgICAgICAgICAgICAgICAgICAgXCIsXG5cdFx0XHRjb2xvcjogICAgICAgICAgIFwiIGNvbG9yKGBbJyYnXS5iYWNrZ3JvdW5kQ29sb3JgKS5sdW1pbmFuY2UoKSA+IDAuNSAmJiAnYmxhY2snIHx8ICd3aGl0ZScgXCJcblx0XHR9LFxuXHRcdCcmID4gaGVhZGVyJzogICB7XG5cdFx0XHRib3JkZXJDb2xvcjogXCIgYFsnJiddLmJvcmRlckNvbG9yYCBcIlxuXHRcdH0sXG5cdFx0JyYgPiBpY29uLWJ0bic6IHtcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIgYFsnJiddLmJhY2tncm91bmRDb2xvcmAgXCJcblx0XHR9XG5cdH0sIHsgY29sb3I6IGNvbG9yIH0pO1xuXG5cblx0LyogbWFrZSB0aWxlcyBsb29rIG5pY2UsIHdpdGggYSBoZWFkZXIsIGNvbnRlbnQgc2VjdGlvbiwgYW5kIENTUyBzdHlsaW5nIGRlcml2ZWQgZnJvbSB0aGUgbW9kZWwgKi9cblx0cGx1Z2luLmluc2VydCgnY29uc3RydWN0JywgZnVuY3Rpb24gKCkge1xuXG5cdFx0LyogIGNyZWF0ZSB0aGUgaGVhZGVyIGFuZCBjb250ZW50IGVsZW1lbnRzLCBhbmQgcmVyb3V0ZSB0aGUgICovXG5cdFx0LyogJ2RvbScgcHJvcGVydHkgdG8gdGhlIG5ldyBjb250ZW50IGVsZW1lbnQgICAgICAgICAgICAgICAgICovXG5cdFx0dmFyIG9yaWdFbGVtZW50ID0gdGhpcy5kb207XG5cdFx0b3JpZ0VsZW1lbnQuYWRkQ2xhc3MoJ3NraW5uZWQtdGlsZScpO1xuXHRcdHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudCA9ICQoYDxoZWFkZXIvPmApLmFwcGVuZFRvKG9yaWdFbGVtZW50KTtcblx0XHR0aGlzLmRvbSA9ICQoYDxzZWN0aW9uLz5gKS5hcHBlbmRUbyhvcmlnRWxlbWVudCk7XG5cblx0XHQvKiBwdXQgdGhlIG5hbWUgb2YgdGhlIG1vZGVsIGluIHRoZSBoZWFkZXIgZWxlbWVudCAqL1xuXHRcdHRoaXMubW9kZWwuZ2V0KCduYW1lJykudGhlbigobmFtZSk9PiB7IHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudC50ZXh0KG5hbWUpIH0pO1xuXG5cdFx0LyogdGFrZSBhbnkgY3NzIHJ1bGVzIGZyb20gdGhlIG1vZGVsIGFuZCBhcHBseSB0aGVtIHRvIHRoZSB0aWxlICovXG5cdFx0dGhpcy5tb2RlbC5nZXQoJ3RpbGUnKS5nZXQoJ25vcm1hbCcpLmdldCgnY3NzJykudGhlbigoY3NzKT0+IHsgdGhpcy5lbGVtZW50LmFteVB1dENzc1J1bGVzKGFwcGx5U3R5bGVEZWZhdWx0cyhjc3MpKSB9KVxuXHRcdFx0XHQuY2F0Y2goKCk9Pnt9KTsgLy8gaXQncyBPSyBpZiAnLnRpbGUubm9ybWFsLmNzcycgaXMgbm90IG9uIHRoZSBtb2RlbFxuXG5cdFx0Lyogd2hlbiB0aGUgdGlsZSBpcyBjbG9zZWQsIG1ha2UgdGhlIGZvbnQgc2l6ZSBkeW5hbWljICovXG5cdFx0dmFyIHVuc3Vic2NyaWJlO1xuXHRcdHRoaXMub2JzZXJ2ZSgnb3BlbicsIChvcGVuKSA9PiB7XG5cdFx0XHRpZiAob3Blbikge1xuXHRcdFx0XHRpZiAodW5zdWJzY3JpYmUpIHtcblx0XHRcdFx0XHR1bnN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdHVuc3Vic2NyaWJlID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1bnN1YnNjcmliZSA9IHRoaXMub2JzZXJ2ZSgnc2l6ZScsIChzaXplKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fcF90aWxlU2tpbl9oZWFkZXJFbGVtZW50LmNzcygnZm9udFNpemUnLCAvLyBmb3JtdWxhIGdvdHRlbiBleHBlcmltZW50YWxseVxuXHRcdFx0XHRcdFx0XHRNYXRoLm1pbigwLjIgKiBNYXRoLnBvdyhzaXplLmhlaWdodCwgMS4wMSksIDAuMTMgKiBNYXRoLnBvdyhzaXplLndpZHRoLCAxLjAxKSkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHRoZSAnaGVhZGVyU2l6ZScgb2JzZXJ2YWJsZSAqL1xuXHRcdHRoaXMubmV3T2JzZXJ2YWJsZSgnaGVhZGVyU2l6ZScpO1xuXHRcdHRoaXMub2JzZXJ2ZSgnc2l6ZScsIChzaXplKSA9PiB7XG5cdFx0XHR0aGlzLmhlYWRlclNpemUgPSBuZXcgVS5TaXplKHRoaXMuX3BfdGlsZVNraW5faGVhZGVyRWxlbWVudC5oZWlnaHQoKSwgc2l6ZS53aWR0aCk7XG5cdFx0fSk7XG5cblx0XHQvKiB0aGUgJ2hlYWRlclBvc2l0aW9uJyBvYnNlcnZhYmxlICovXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCdoZWFkZXJQb3NpdGlvbicpO1xuXHRcdHRoaXMub2JzZXJ2ZSgncG9zaXRpb24nLCAocG9zaXRpb24pID0+IHsgdGhpcy5oZWFkZXJQb3NpdGlvbiA9IHBvc2l0aW9uIH0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9wLXRpbGUtc2tpbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJjaHJvbWFcIixcImNvbW1vbmpzMlwiOlwiY2hyb21hLWpzXCIsXCJjb21tb25qc1wiOlwiY2hyb21hLWpzXCIsXCJhbWRcIjpcImNocm9tYS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChQKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW3N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cblx0XHRcdHZhciB1bnN1YnNjcmliZUZuID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAodW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQpIHtcblx0XHRcdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGRlbGV0ZSB1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT247XG5cdFx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHR1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT24gPSAoc3Vic2NyaWJlcikgPT4ge1xuXHRcdFx0XHRzdWJzY3JpYmVyKHVuc3Vic2NyaWJlRm4pO1xuXHRcdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0b3B0aW9uYWxDdXJyeShmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKGZuLmxlbmd0aCA8PSBhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIFUuYmluZEEoZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBkZWVwVHJhbnNmb3JtKHZhbCwgZm4pIHtcblx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHZhbCkgfHwgJC5pc0FycmF5KHZhbCkpIHtcblx0XHRcdCQuZWFjaCh2YWwsIChrZXksIHN1YlZhbCkgPT4ge1xuXHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbihzdWJWYWwpO1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChyZXR1cm5lZCkpIHtcblx0XHRcdFx0XHRkZWVwVHJhbnNmb3JtKHN1YlZhbCwgZm4pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbFtrZXldID0gcmV0dXJuZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBSRUZfUEFUVEVSTiA9IC9gKFtcXFtcXC5dLis/KWAvZztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmYXVsdHMoc3BlYywgY29udGV4dCkge1xuXG5cdFx0ZGVlcFRyYW5zZm9ybShzcGVjLCAodmFsKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dmFyIHJlZnMgPSAodmFsLm1hdGNoKFJFRl9QQVRURVJOKSB8fCBbXSkubWFwKChyZWYpID0+IHtcblx0XHRcdFx0XHR2YXIgc3RyaXBwZWRSZWYgPSByZWYuc3Vic3RyaW5nKDEscmVmLmxlbmd0aC0xKTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZWZzJywgYHJldHVybiByZWZzJHtzdHJpcHBlZFJlZn1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHZhciBleHByID0gdmFsLnJlcGxhY2UoUkVGX1BBVFRFUk4sIFwiKHJlZnMkMSlcIik7XG5cdFx0XHRcdHZhciB0ZW1wbGF0ZUZuID0gKGZvcm1hbFBhcmFtcykgPT4ge1xuXHRcdFx0XHRcdHZhciBuZXdGb3JtYWxQYXJhbXMgPSBmb3JtYWxQYXJhbXMuY29uY2F0KFtgcmV0dXJuICR7ZXhwcn1gXSk7XG5cdFx0XHRcdFx0cmV0dXJuIFUuYXBwbHlDb25zdHJ1Y3RvcihGdW5jdGlvbiwgbmV3Rm9ybWFsUGFyYW1zKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGVtcGxhdGVGbi5yZWZzID0gcmVmcztcblx0XHRcdFx0cmV0dXJuIHRlbXBsYXRlRm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8gcmVjdXJzaXZlIGF1eGlsaWFyeSBmdW5jdGlvbjsgcmV0dXJucyB0cnVlIGlmIGEgY2hhbmdlIHRvIG9iaiB3YXMgbWFkZVxuXHRcdGZ1bmN0aW9uIHdpdGhEZWZhdWx0c0F1eChkZWZTcGVjLCBvYmosIHJlZnMsIHBhcmFtcykge1xuXHRcdFx0dmFyIGNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVmU3BlYykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cblx0XHRcdFx0aWYgKGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KGRlZlNwZWNba2V5XSkgJiYgJC5pc1BsYWluT2JqZWN0KG9ialtrZXldKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWNba2V5XSwgb2JqW2tleV0sIHJlZnMsIHBhcmFtcykgfHwgY2hhbmdlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICgkLmlzUGxhaW5PYmplY3QoZGVmU3BlY1trZXldKSkge1xuXHRcdFx0XHRcdG9ialtrZXldID0ge307XG5cdFx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWNba2V5XSwgb2JqW2tleV0sIHJlZnMsIHBhcmFtcykgfHwgY2hhbmdlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbihkZWZTcGVjW2tleV0pKSB7XG5cdFx0XHRcdFx0aWYgKGRlZlNwZWNba2V5XS5yZWZzLmV2ZXJ5KChyZWYpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiAhVS5pc1VuZGVmaW5lZChyZWYocmVmcykpO1xuXHRcdFx0XHRcdH0pKSB7IC8vIGlmIG5vbmUgb2YgdGhlIHJlZmVyZW5jZXMgYXJlIHVuZGVmaW5lZCwgYXNzaWduIHRoaXMgJ2RlZmF1bHQnXG5cdFx0XHRcdFx0XHR2YXIgYWxscGFyYW1zID0gJC5leHRlbmQoeyByZWZzOiByZWZzIH0sIGNvbnRleHQsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHR2YXIgZm9ybWFsUGFyYW1zID0gT2JqZWN0LmtleXMoYWxscGFyYW1zKTtcblx0XHRcdFx0XHRcdHZhciBhY3R1YWxQYXJhbXMgPSBmb3JtYWxQYXJhbXMubWFwKChmcGFyKSA9PiBhbGxwYXJhbXNbZnBhcl0pO1xuXHRcdFx0XHRcdFx0dmFyIGZpbmFsRm4gPSBkZWZTcGVjW2tleV0oZm9ybWFsUGFyYW1zKTtcblx0XHRcdFx0XHRcdG9ialtrZXldID0gZmluYWxGbi5hcHBseShudWxsLCBhY3R1YWxQYXJhbXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBjaGFuZ2U7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gd2l0aERlZmF1bHRzKG9iaiwgcGFyYW1zKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gKFUuaXNVbmRlZmluZWQob2JqKSA/IHt9IDogJC5leHRlbmQodHJ1ZSwge30sIG9iaikpO1xuXG5cdFx0XHR2YXIgY2hhbmdlID0gdHJ1ZTtcblx0XHRcdHdoaWxlIChjaGFuZ2UpIHtcblx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KHNwZWMsIHJlc3VsdCwgcmVzdWx0LCBwYXJhbXMgfHwge30pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9kZWZhdWx0cy5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGFrZXMgYW4gb2JqZWN0IG1hcHBpbmcgJ3NlbGVjdG9yJyDihpIgJ3Byb3BlcnR5JyDihpIgJ3ZhbHVlJyBhbmRcblx0Ly8gYXBwbGllcyBpdCBhcyBhIHNldCBvZiBDU1MgcnVsZXMgdG8gdGhlIGRlc2NlbmRhbnRzIG9mIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0Ly9cblx0JC5mbi5leHRlbmQoe1xuXHRcdGFteVB1dENzc1J1bGVzOiBmdW5jdGlvbiAocnVsZXMpIHtcblx0XHRcdCQuZWFjaChydWxlcywgKHNlbGVjdG9yLCBjc3MpID0+IHtcblx0XHRcdFx0dmFyIGNvbnRleHQ7XG5cdFx0XHRcdGlmIChzZWxlY3Rvci50cmltKCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbGVjdG9yLnRyaW0oKS5jaGFyQXQoMCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IudHJpbSgpLnN1YnN0cigxKS50cmltKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRleHQuY3NzKGNzcyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3B1dC1jc3MtcnVsZXMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRpbGUtc2tpbi5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRpbGUtc2tpbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5za2lubmVkLXRpbGV7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47fS5za2lubmVkLXRpbGU+aGVhZGVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy13ZWJraXQtYWxpZ24taXRlbXM6Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC13ZWlnaHQ6Ym9sZDtib3JkZXItd2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjt9LnNraW5uZWQtdGlsZS5vcGVuPmhlYWRlcntoZWlnaHQ6MjZweDtib3JkZXItc3R5bGU6bm9uZSBub25lIHNvbGlkIG5vbmU7bGluZS1oZWlnaHQ6MjZweDtmb250LXNpemU6MTkuNXB4ICFpbXBvcnRhbnQ7d2hpdGUtc3BhY2U6bm93cmFwO30uc2tpbm5lZC10aWxlOm5vdCgub3Blbik+aGVhZGVyey13ZWJraXQtYm94LWZsZXg6MTstd2Via2l0LWZsZXgtZ3JvdzoxOy1tcy1mbGV4LXBvc2l0aXZlOjE7ZmxleC1ncm93OjE7cGFkZGluZzowIDVweDt9LnNraW5uZWQtdGlsZT5zZWN0aW9uey13ZWJraXQtdXNlci1zZWxlY3Q6dGV4dDstbW96LXVzZXItc2VsZWN0OnRleHQ7LW1zLXVzZXItc2VsZWN0OnRleHQ7dXNlci1zZWxlY3Q6dGV4dDt9LnNraW5uZWQtdGlsZS5vcGVuPnNlY3Rpb257LXdlYmtpdC1ib3gtZmxleDoxOy13ZWJraXQtZmxleC1ncm93OjE7LW1zLWZsZXgtcG9zaXRpdmU6MTtmbGV4LWdyb3c6MTtvcGFjaXR5OjE7fS5za2lubmVkLXRpbGU6bm90KC5vcGVuKT5zZWN0aW9ue29wYWNpdHk6MDt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLXNraW4uanMifQ==