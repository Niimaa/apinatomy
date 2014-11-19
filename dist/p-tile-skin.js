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
	    newSubclass: function(SuperClass, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var cls = function() {
	        for (var args = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          args[$__1] = arguments[$__1];
	        constructor.apply(this, [SuperClass.prototype.constructor.bind(this)].concat(args));
	      };
	      cls.prototype = Object.create(SuperClass.prototype);
	      U.extend(cls.prototype, prototype);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1MzRlYzcyMzU5Mjk2Y2ViNDA1NSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9wLXRpbGUtc2tpbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImNocm9tYVwiLFwiY29tbW9uanMyXCI6XCJjaHJvbWEtanNcIixcImNvbW1vbmpzXCI6XCJjaHJvbWEtanNcIixcImFtZFwiOlwiY2hyb21hLWpzXCJ9Iiwid2VicGFjazovLy8uLi91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi4vdXRpbC9wdXQtY3NzLXJ1bGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vLmludGVybWVkaWF0ZS1vdXRwdXQvcC10aWxlLXNraW4uc2Nzcz9kZTFkIiwid2VicGFjazovLy8uLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmlu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QTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJjaHJvbWEtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJjaHJvbWEtanNcIiwgXCJibHVlYmlyZFwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiY2hyb21hLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiY2hyb21hXCJdLCByb290W1wiUFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNTM0ZWM3MjM1OTI5NmNlYjQwNTVcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J2Nocm9tYS1qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvZGVmYXVsdHMuanMnLFxuXHQnLi91dGlsL3B1dC1jc3MtcnVsZXMuanMnLFxuXHQnLi9wLXRpbGUtc2tpbi5zY3NzJ1xuXSwgZnVuY3Rpb24gKCQsIGNvbG9yLCBVLCBkZWZhdWx0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1za2luJyxcblx0XHRyZXF1aXJlczogWyd0aWxlLW9wZW4nLCAncG9zaXRpb24tdHJhY2tpbmcnXVxuXHR9KS5tb2RpZnkoJ1RpbGUucHJvdG90eXBlJyk7XG5cblxuXHQvKiB0aWxlIHN0eWxpbmcgZGVmYXVsdHMgZ2VuZXJhdG9yICovXG5cdHZhciBhcHBseVN0eWxlRGVmYXVsdHMgPSBkZWZhdWx0cyh7XG5cdFx0JyYnOiAgICAgICAgICAgIHtcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIgJ3doaXRlJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIixcblx0XHRcdGJvcmRlckNvbG9yOiAgICAgXCIgY29sb3IoYFsnJiddLmJhY2tncm91bmRDb2xvcmApLmJyaWdodGVuKDIwKS5jc3MoKSAgICAgICAgICAgICAgICAgICAgICBcIixcblx0XHRcdGNvbG9yOiAgICAgICAgICAgXCIgY29sb3IoYFsnJiddLmJhY2tncm91bmRDb2xvcmApLmx1bWluYW5jZSgpID4gMC41ICYmICdibGFjaycgfHwgJ3doaXRlJyBcIlxuXHRcdH0sXG5cdFx0JyYgPiBoZWFkZXInOiAgIHtcblx0XHRcdGJvcmRlckNvbG9yOiBcIiBgWycmJ10uYm9yZGVyQ29sb3JgIFwiXG5cdFx0fSxcblx0XHQnJiA+IGljb24tYnRuJzoge1xuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiBgWycmJ10uYmFja2dyb3VuZENvbG9yYCBcIlxuXHRcdH1cblx0fSwgeyBjb2xvcjogY29sb3IgfSk7XG5cblxuXHQvKiBtYWtlIHRpbGVzIGxvb2sgbmljZSwgd2l0aCBhIGhlYWRlciwgY29udGVudCBzZWN0aW9uLCBhbmQgQ1NTIHN0eWxpbmcgZGVyaXZlZCBmcm9tIHRoZSBtb2RlbCAqL1xuXHRwbHVnaW4uaW5zZXJ0KCdjb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiAgY3JlYXRlIHRoZSBoZWFkZXIgYW5kIGNvbnRlbnQgZWxlbWVudHMsIGFuZCByZXJvdXRlIHRoZSAgKi9cblx0XHQvKiAnZG9tJyBwcm9wZXJ0eSB0byB0aGUgbmV3IGNvbnRlbnQgZWxlbWVudCAgICAgICAgICAgICAgICAgKi9cblx0XHR2YXIgb3JpZ0VsZW1lbnQgPSB0aGlzLmRvbTtcblx0XHRvcmlnRWxlbWVudC5hZGRDbGFzcygnc2tpbm5lZC10aWxlJyk7XG5cdFx0dGhpcy5fcF90aWxlU2tpbl9oZWFkZXJFbGVtZW50ID0gJChgPGhlYWRlci8+YCkuYXBwZW5kVG8ob3JpZ0VsZW1lbnQpO1xuXHRcdHRoaXMuZG9tID0gJChgPHNlY3Rpb24vPmApLmFwcGVuZFRvKG9yaWdFbGVtZW50KTtcblxuXHRcdC8qIHB1dCB0aGUgbmFtZSBvZiB0aGUgbW9kZWwgaW4gdGhlIGhlYWRlciBlbGVtZW50ICovXG5cdFx0dGhpcy5tb2RlbC5nZXQoJ25hbWUnKS50aGVuKChuYW1lKT0+IHsgdGhpcy5fcF90aWxlU2tpbl9oZWFkZXJFbGVtZW50LnRleHQobmFtZSkgfSk7XG5cblx0XHQvKiB0YWtlIGFueSBjc3MgcnVsZXMgZnJvbSB0aGUgbW9kZWwgYW5kIGFwcGx5IHRoZW0gdG8gdGhlIHRpbGUgKi9cblx0XHR0aGlzLm1vZGVsLmdldCgndGlsZScpLmdldCgnbm9ybWFsJykuZ2V0KCdjc3MnKS50aGVuKChjc3MpPT4geyB0aGlzLmVsZW1lbnQuYW15UHV0Q3NzUnVsZXMoYXBwbHlTdHlsZURlZmF1bHRzKGNzcykpIH0pXG5cdFx0XHRcdC5jYXRjaCgoKT0+e30pOyAvLyBpdCdzIE9LIGlmICcudGlsZS5ub3JtYWwuY3NzJyBpcyBub3Qgb24gdGhlIG1vZGVsXG5cblx0XHQvKiB3aGVuIHRoZSB0aWxlIGlzIGNsb3NlZCwgbWFrZSB0aGUgZm9udCBzaXplIGR5bmFtaWMgKi9cblx0XHR2YXIgdW5zdWJzY3JpYmU7XG5cdFx0dGhpcy5vYnNlcnZlKCdvcGVuJywgKG9wZW4pID0+IHtcblx0XHRcdGlmIChvcGVuKSB7XG5cdFx0XHRcdGlmICh1bnN1YnNjcmliZSkge1xuXHRcdFx0XHRcdHVuc3Vic2NyaWJlKCk7XG5cdFx0XHRcdFx0dW5zdWJzY3JpYmUgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHVuc3Vic2NyaWJlID0gdGhpcy5vYnNlcnZlKCdzaXplJywgKHNpemUpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9wX3RpbGVTa2luX2hlYWRlckVsZW1lbnQuY3NzKCdmb250U2l6ZScsIC8vIGZvcm11bGEgZ290dGVuIGV4cGVyaW1lbnRhbGx5XG5cdFx0XHRcdFx0XHRcdE1hdGgubWluKDAuMiAqIE1hdGgucG93KHNpemUuaGVpZ2h0LCAxLjAxKSwgMC4xMyAqIE1hdGgucG93KHNpemUud2lkdGgsIDEuMDEpKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyogdGhlICdoZWFkZXJTaXplJyBvYnNlcnZhYmxlICovXG5cdFx0dGhpcy5uZXdPYnNlcnZhYmxlKCdoZWFkZXJTaXplJyk7XG5cdFx0dGhpcy5vYnNlcnZlKCdzaXplJywgKHNpemUpID0+IHtcblx0XHRcdHRoaXMuaGVhZGVyU2l6ZSA9IG5ldyBVLlNpemUodGhpcy5fcF90aWxlU2tpbl9oZWFkZXJFbGVtZW50LmhlaWdodCgpLCBzaXplLndpZHRoKTtcblx0XHR9KTtcblxuXHRcdC8qIHRoZSAnaGVhZGVyUG9zaXRpb24nIG9ic2VydmFibGUgKi9cblx0XHR0aGlzLm5ld09ic2VydmFibGUoJ2hlYWRlclBvc2l0aW9uJyk7XG5cdFx0dGhpcy5vYnNlcnZlKCdwb3NpdGlvbicsIChwb3NpdGlvbikgPT4geyB0aGlzLmhlYWRlclBvc2l0aW9uID0gcG9zaXRpb24gfSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL3AtdGlsZS1za2luLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImNocm9tYVwiLFwiY29tbW9uanMyXCI6XCJjaHJvbWEtanNcIixcImNvbW1vbmpzXCI6XCJjaHJvbWEtanNcIixcImFtZFwiOlwiY2hyb21hLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKFApID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKFN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtTdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5iaW5kKHRoaXMpXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBydW5zIGEgZnVuY3Rpb24gZXZlcnkgYW5pbWF0aW9uIGZyYW1lXG5cdFx0Ly8gcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBzdG9wIHRoZSBsb29wXG5cdFx0ZWFjaEFuaW1hdGlvbkZyYW1lKGZuLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgc3RvcCA9IGZhbHNlO1xuXG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cblx0XHRcdHZhciB1bnN1YnNjcmliZUZuID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAodW5zdWJzY3JpYmVGbi5zdGlsbFN1YnNjcmliZWQpIHtcblx0XHRcdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGRlbGV0ZSB1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT247XG5cdFx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR1bnN1YnNjcmliZUZuLnN0aWxsU3Vic2NyaWJlZCA9IHRydWU7XG5cdFx0XHR1bnN1YnNjcmliZUZuLnVuc3Vic2NyaWJlT24gPSAoc3Vic2NyaWJlcikgPT4ge1xuXHRcdFx0XHRzdWJzY3JpYmVyKHVuc3Vic2NyaWJlRm4pO1xuXHRcdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdW5zdWJzY3JpYmVGbjtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRub3RSdW5ZZXQgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qICBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS4gICAgKi9cblx0XHQvKiAgSXQgZW5zdXJlcyB0aGF0IHRoZSByZXRyaWV2YWwgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbmx5IG9uY2UgcGVyIHN0YWNrLCBhbmQgdXNlcyBhICAgICovXG5cdFx0LyogIGNhY2hlIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlICAqL1xuXHRcdC8qICBoYXMgYWN0dWFsbHkgY2hhbmdlZC4gSXQgZG9lcyBzbyB1c2luZyBgPT09YCBjb21wYXJpc29uLCBidXQgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duICAgKi9cblx0XHQvKiAgY29tcGFyaXNvbiBmdW5jdGlvbi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0Y2FjaGVkKHtyZXRyaWV2ZSwgaXNFcXVhbH0pIHtcblxuXHRcdFx0Lyogbm9ybWFsaXplIHBhcmFtZXRlcnMgKi9cblx0XHRcdGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Lyoga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWUgKi9cblx0XHRcdHZhciBjYWNoZTtcblxuXHRcdFx0LyogaG93IHRvIHJldHJpZXZlIGEgbmV3IHZhbHVlLCBhbmQgcHJvY2VzcyBpdCBpZiBpdCBpcyBuZXcgKi9cblx0XHRcdGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG5cdFx0XHRcdHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG5cdFx0XHRcdHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuXHRcdFx0XHRpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdGNhY2hlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0b25DaGFuZ2UuZm9yRWFjaCgoZm4pID0+IGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHJpZXZlIGEgdmFsdWUgYXQgbW9zdCBvbmNlIHBlciBzdGFjayAqL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG5cblx0XHRcdC8qICB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uIHBvc3NpYmx5IHBlcmZvcm1zIHJldHJpZXZhbCwgICAgICAgICAgICAgKi9cblx0XHRcdC8qICBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKSAgKi9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogYWxsb3cgYW4gb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0ICovXG5cdFx0XHR2YXIgb25DaGFuZ2UgPSBbXTtcblx0XHRcdHJlc3VsdEZuLm9uQ2hhbmdlID0gKGNiKSA9PiB7XG5cdFx0XHRcdG9uQ2hhbmdlLnB1c2goY2IpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBicmVha2luZyBvZiB0aGUgY2FjaGUsIGFsbG93aW5nIG11bHRpcGxlIGNhbGxzIHBlciBzdGFjayAqL1xuXHRcdFx0cmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyogcmV0cmlldmUgdGhlIGZpcnN0IHZhbHVlIHJpZ2h0IG5vdyAqL1xuXHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdEZuO1xuXHRcdH0sXG5cblx0XHRwcm9taXNpZnkob2JqLCBtZXRob2QpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0b3B0aW9uYWxDdXJyeShmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKGZuLmxlbmd0aCA8PSBhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIFUuYmluZEEoZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgcG9zaXRpb24gKi9cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBhLnRvcCA9PT0gYi50b3AgJiYgYS5sZWZ0ID09PSBiLmxlZnQ7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9taXNjLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBkZWVwVHJhbnNmb3JtKHZhbCwgZm4pIHtcblx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHZhbCkgfHwgJC5pc0FycmF5KHZhbCkpIHtcblx0XHRcdCQuZWFjaCh2YWwsIChrZXksIHN1YlZhbCkgPT4ge1xuXHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbihzdWJWYWwpO1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChyZXR1cm5lZCkpIHtcblx0XHRcdFx0XHRkZWVwVHJhbnNmb3JtKHN1YlZhbCwgZm4pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbFtrZXldID0gcmV0dXJuZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBSRUZfUEFUVEVSTiA9IC9gKFtcXFtcXC5dLis/KWAvZztcblxuXHRyZXR1cm4gZnVuY3Rpb24gZGVmYXVsdHMoc3BlYywgY29udGV4dCkge1xuXG5cdFx0ZGVlcFRyYW5zZm9ybShzcGVjLCAodmFsKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dmFyIHJlZnMgPSAodmFsLm1hdGNoKFJFRl9QQVRURVJOKSB8fCBbXSkubWFwKChyZWYpID0+IHtcblx0XHRcdFx0XHR2YXIgc3RyaXBwZWRSZWYgPSByZWYuc3Vic3RyaW5nKDEscmVmLmxlbmd0aC0xKTtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZWZzJywgYHJldHVybiByZWZzJHtzdHJpcHBlZFJlZn1gKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHZhciBleHByID0gdmFsLnJlcGxhY2UoUkVGX1BBVFRFUk4sIFwiKHJlZnMkMSlcIik7XG5cdFx0XHRcdHZhciB0ZW1wbGF0ZUZuID0gKGZvcm1hbFBhcmFtcykgPT4ge1xuXHRcdFx0XHRcdHZhciBuZXdGb3JtYWxQYXJhbXMgPSBmb3JtYWxQYXJhbXMuY29uY2F0KFtgcmV0dXJuICR7ZXhwcn1gXSk7XG5cdFx0XHRcdFx0cmV0dXJuIFUuYXBwbHlDb25zdHJ1Y3RvcihGdW5jdGlvbiwgbmV3Rm9ybWFsUGFyYW1zKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGVtcGxhdGVGbi5yZWZzID0gcmVmcztcblx0XHRcdFx0cmV0dXJuIHRlbXBsYXRlRm47XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8gcmVjdXJzaXZlIGF1eGlsaWFyeSBmdW5jdGlvbjsgcmV0dXJucyB0cnVlIGlmIGEgY2hhbmdlIHRvIG9iaiB3YXMgbWFkZVxuXHRcdGZ1bmN0aW9uIHdpdGhEZWZhdWx0c0F1eChkZWZTcGVjLCBvYmosIHJlZnMsIHBhcmFtcykge1xuXHRcdFx0dmFyIGNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVmU3BlYykuZm9yRWFjaCgoa2V5KSA9PiB7XG5cblx0XHRcdFx0aWYgKGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KGRlZlNwZWNba2V5XSkgJiYgJC5pc1BsYWluT2JqZWN0KG9ialtrZXldKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWNba2V5XSwgb2JqW2tleV0sIHJlZnMsIHBhcmFtcykgfHwgY2hhbmdlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICgkLmlzUGxhaW5PYmplY3QoZGVmU3BlY1trZXldKSkge1xuXHRcdFx0XHRcdG9ialtrZXldID0ge307XG5cdFx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KGRlZlNwZWNba2V5XSwgb2JqW2tleV0sIHJlZnMsIHBhcmFtcykgfHwgY2hhbmdlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbihkZWZTcGVjW2tleV0pKSB7XG5cdFx0XHRcdFx0aWYgKGRlZlNwZWNba2V5XS5yZWZzLmV2ZXJ5KChyZWYpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiAhVS5pc1VuZGVmaW5lZChyZWYocmVmcykpO1xuXHRcdFx0XHRcdH0pKSB7IC8vIGlmIG5vbmUgb2YgdGhlIHJlZmVyZW5jZXMgYXJlIHVuZGVmaW5lZCwgYXNzaWduIHRoaXMgJ2RlZmF1bHQnXG5cdFx0XHRcdFx0XHR2YXIgYWxscGFyYW1zID0gJC5leHRlbmQoeyByZWZzOiByZWZzIH0sIGNvbnRleHQsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHR2YXIgZm9ybWFsUGFyYW1zID0gT2JqZWN0LmtleXMoYWxscGFyYW1zKTtcblx0XHRcdFx0XHRcdHZhciBhY3R1YWxQYXJhbXMgPSBmb3JtYWxQYXJhbXMubWFwKChmcGFyKSA9PiBhbGxwYXJhbXNbZnBhcl0pO1xuXHRcdFx0XHRcdFx0dmFyIGZpbmFsRm4gPSBkZWZTcGVjW2tleV0oZm9ybWFsUGFyYW1zKTtcblx0XHRcdFx0XHRcdG9ialtrZXldID0gZmluYWxGbi5hcHBseShudWxsLCBhY3R1YWxQYXJhbXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBjaGFuZ2U7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gd2l0aERlZmF1bHRzKG9iaiwgcGFyYW1zKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gKFUuaXNVbmRlZmluZWQob2JqKSA/IHt9IDogJC5leHRlbmQodHJ1ZSwge30sIG9iaikpO1xuXG5cdFx0XHR2YXIgY2hhbmdlID0gdHJ1ZTtcblx0XHRcdHdoaWxlIChjaGFuZ2UpIHtcblx0XHRcdFx0Y2hhbmdlID0gd2l0aERlZmF1bHRzQXV4KHNwZWMsIHJlc3VsdCwgcmVzdWx0LCBwYXJhbXMgfHwge30pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cdH07XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC9kZWZhdWx0cy5qc1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly9cblx0Ly8gdGFrZXMgYW4gb2JqZWN0IG1hcHBpbmcgJ3NlbGVjdG9yJyDihpIgJ3Byb3BlcnR5JyDihpIgJ3ZhbHVlJyBhbmRcblx0Ly8gYXBwbGllcyBpdCBhcyBhIHNldCBvZiBDU1MgcnVsZXMgdG8gdGhlIGRlc2NlbmRhbnRzIG9mIHRoZSBjdXJyZW50IGVsZW1lbnRcblx0Ly9cblx0JC5mbi5leHRlbmQoe1xuXHRcdGFteVB1dENzc1J1bGVzOiBmdW5jdGlvbiAocnVsZXMpIHtcblx0XHRcdCQuZWFjaChydWxlcywgKHNlbGVjdG9yLCBjc3MpID0+IHtcblx0XHRcdFx0dmFyIGNvbnRleHQ7XG5cdFx0XHRcdGlmIChzZWxlY3Rvci50cmltKCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbGVjdG9yLnRyaW0oKS5jaGFyQXQoMCkgPT09ICcmJykge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IudHJpbSgpLnN1YnN0cigxKS50cmltKCkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnRleHQgPSB0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRleHQuY3NzKGNzcyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3B1dC1jc3MtcnVsZXMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRpbGUtc2tpbi5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS8uaW50ZXJtZWRpYXRlLW91dHB1dC9wLXRpbGUtc2tpbi5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5za2lubmVkLXRpbGV7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LXdlYmtpdC1mbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47fS5za2lubmVkLXRpbGU+aGVhZGVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy13ZWJraXQtYWxpZ24taXRlbXM6Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC13ZWlnaHQ6Ym9sZDtib3JkZXItd2lkdGg6MXB4O292ZXJmbG93OmhpZGRlbjt9LnNraW5uZWQtdGlsZS5vcGVuPmhlYWRlcntoZWlnaHQ6MjZweDtib3JkZXItc3R5bGU6bm9uZSBub25lIHNvbGlkIG5vbmU7bGluZS1oZWlnaHQ6MjZweDtmb250LXNpemU6MTkuNXB4ICFpbXBvcnRhbnQ7d2hpdGUtc3BhY2U6bm93cmFwO30uc2tpbm5lZC10aWxlOm5vdCgub3Blbik+aGVhZGVyey13ZWJraXQtYm94LWZsZXg6MTstd2Via2l0LWZsZXgtZ3JvdzoxOy1tcy1mbGV4LXBvc2l0aXZlOjE7ZmxleC1ncm93OjE7cGFkZGluZzowIDVweDt9LnNraW5uZWQtdGlsZT5zZWN0aW9uey13ZWJraXQtdXNlci1zZWxlY3Q6dGV4dDstbW96LXVzZXItc2VsZWN0OnRleHQ7LW1zLXVzZXItc2VsZWN0OnRleHQ7dXNlci1zZWxlY3Q6dGV4dDt9LnNraW5uZWQtdGlsZS5vcGVuPnNlY3Rpb257LXdlYmtpdC1ib3gtZmxleDoxOy13ZWJraXQtZmxleC1ncm93OjE7LW1zLWZsZXgtcG9zaXRpdmU6MTtmbGV4LWdyb3c6MTtvcGFjaXR5OjE7fS5za2lubmVkLXRpbGU6bm90KC5vcGVuKT5zZWN0aW9ue29wYWNpdHk6MDt9XCIsIFwiXCJdKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9hdXRvcHJlZml4ZXItbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuLy5pbnRlcm1lZGlhdGUtb3V0cHV0L3AtdGlsZS1za2luLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHQvLyB2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEvKiwgc291cmNlTWFwOiBzb3VyY2VNYXAqL307XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmopIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopO1xyXG5cdHJldHVybiBmdW5jdGlvbihuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhIC8qJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCovKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0YXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0Ly8gdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdC8vIE5vIGJyb3dzZXIgc3VwcG9ydFxyXG5cdC8vIGlmKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHQvLyB0cnkge1xyXG5cdFx0XHQvLyBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYShKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSArIFwiICovXCI7XHJcblx0XHQvLyB9IGNhdGNoKGUpIHt9XHJcblx0Ly8gfVxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcblxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLXNraW4uanMifQ==