(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "js-graph"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("js-graph")) : factory(root["jQuery"], root["P"], root["JsGraph"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, amyWidget, U, DM) {
	  'use strict';
	  DM.registerPromiseResolver(P.resolve);
	  var dm = new DM();
	  U.extend(U.object($, 'circuitboard'), {plugin: function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        dm.select.apply(dm, pluginOrSelection);
	        defineWidgetClasses();
	      }
	    }});
	  function defineWidgetClasses() {
	    dm.vp('Circuitboard', amyWidget('Circuitboard', {
	      cssClass: "circuitboard",
	      filter: (function() {
	        return P.resolve(true);
	      }),
	      model: null
	    }));
	    dm.vp('Tilemap', amyWidget('Tilemap', {
	      cssClass: "tilemap",
	      model: null,
	      _circuitboard: null
	    }));
	    dm.vp('Tile', amyWidget('Tile', {
	      cssClass: 'tile',
	      model: null,
	      _circuitboard: null
	    }));
	  }
	  $.circuitboard.plugin.graph = (function() {
	    return dm.graph();
	  });
	  return $.circuitboard;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U) {
	  'use strict';
	  function enableSignalHandling(obj) {
	    var _callbacks = {};
	    function _signalCallbacks(signal) {
	      if (!_callbacks[signal]) {
	        _callbacks[signal] = $.Callbacks();
	      }
	      return _callbacks[signal];
	    }
	    $.extend(obj, {
	      on: function(signal, fn) {
	        _signalCallbacks(signal).add(fn);
	      },
	      off: function(signal, fn) {
	        _signalCallbacks(signal).remove(fn);
	      },
	      one: function(signal, fn) {
	        var $__0 = arguments,
	            $__1 = this;
	        var paddedFn = (function() {
	          fn.apply(null, $__0);
	          $__1.off(signal, paddedFn);
	        });
	        this.on(signal, paddedFn);
	      },
	      once: function(signal, fn) {
	        this.one(signal, fn);
	      },
	      trigger: function(signal) {
	        for (var args = [],
	            $__2 = 1; $__2 < arguments.length; $__2++)
	          args[$__2 - 1] = arguments[$__2];
	        var callbacks = _callbacks[signal];
	        if (callbacks) {
	          callbacks.fireWith(this, args);
	        }
	      }
	    });
	  }
	  function defineHierarchyMethods(obj, type) {
	    Object.defineProperty(obj, 'type', {get: function() {
	        return type;
	      }});
	    Object.defineProperty(obj, 'parent', {
	      set: function(parent) {
	        this._parent = parent;
	        U.array(parent, '_children').push(this);
	      },
	      get: function() {
	        return this._parent;
	      }
	    });
	    Object.defineProperty(obj, 'children', {get: function() {
	        return this._children;
	      }});
	    $.extend(obj, {
	      closestAncestorByType: function(type) {
	        var result = this;
	        do {
	          result = result.parent;
	        } while (result && result.type && result.type !== type);
	        return result;
	      },
	      closestDescendantsByType: function(type) {
	        var result = [];
	        (this.children || []).forEach((function(child) {
	          if (child.type === type) {
	            result.push(child);
	          } else {
	            result = result.concat(child.closestDescendantsByType(type));
	          }
	        }));
	        return result;
	      }
	    });
	  }
	  function defineDefaultProperties(obj) {
	    Object.defineProperty(obj, 'model', {get: function() {
	        return this.options.model;
	      }});
	  }
	  function amyWidget(typeName, optionDefaults) {
	    function Widget($__3) {
	      var $__4 = $__3,
	          options = $__4.options,
	          element = $__4.element;
	      var $__0 = this;
	      $.extend(this, {
	        options: $.extend({}, optionDefaults, options),
	        element: element,
	        destroy: function() {
	          this.trigger('destroy');
	        }
	      });
	      enableSignalHandling(this);
	      this.element.addClass(this.options.cssClass);
	      this.element.one('remove', (function() {
	        $__0.destroy();
	      }));
	      if (this.options.parent) {
	        this.parent = this.options.parent;
	      }
	      Object.defineProperty(this, 'circuitboard', {get: function() {
	          return this.closestAncestorByType('Circuitboard');
	        }});
	      this.constructed = P.resolve();
	      this.beforeConstruction(this.options.beforeConstruction);
	      this.constructed.then((function() {
	        if ($.isFunction($__0.construct)) {
	          $__0.beforeConstruction($__0.construct());
	        }
	      }));
	    }
	    Widget.prototype.beforeConstruction = function beforeConstruction(possiblePromise) {
	      this.constructed = this.constructed.return(P.resolve(possiblePromise)).return(this);
	    };
	    defineDefaultProperties(Widget.prototype);
	    defineHierarchyMethods(Widget.prototype, typeName);
	    var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);
	    $.fn[lowercaseName] = function(options) {
	      if (options === 'instance') {
	        return this.data(("-amy-" + lowercaseName));
	      }
	      var newWidget = new Widget({
	        options: options,
	        element: this
	      });
	      this.data(("-amy-" + lowercaseName), newWidget.constructed);
	      return this;
	    };
	    return Widget;
	  }
	  return amyWidget;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(JsGraph, U) {
	  'use strict';
	  var keepFirst = (function() {});
	  var keepSecond = (function(d1, p, d2) {
	    d1[p] = d2;
	  });
	  var applySecondToFirstValue = (function(d1, p, d2) {
	    d2.applyTo(d1[p], 'value');
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
	          applyTo: applyTo,
	          compose: function(property, op2) {
	            var $__0 = this;
	            if (U.isUndefined(op2)) {
	              return this;
	            }
	            var foundComposeFn;
	            _composeFns.some((function($__5) {
	              var $__6 = $__5,
	                  op1Type = $__6.op1Type,
	                  op2Type = $__6.op2Type,
	                  composeFn = $__6.composeFn;
	              if ($__0.type === op1Type && op2.type === op2Type) {
	                foundComposeFn = composeFn;
	                return true;
	              }
	            }));
	            if (foundComposeFn) {
	              foundComposeFn(this, property, op2);
	            } else {
	              var err = new Error(("You cannot follow a '" + this.type + "' operation ") + ("with a '" + op2.type + "' operation on the same property."));
	              err.op1 = this.type;
	              err.op2 = op2.type;
	              throw err;
	            }
	          }
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
	      constructor: function Modify(deltaDescription, operations) {
	        var $__0 = this;
	        deltaDescription = deltaDescription || {};
	        this.operations = operations || {};
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
	      d1[p] = DeltaModel._newDelta('add', d2.value);
	    }));
	    this._addCompositionRule('add', 'modify', applySecondToFirstValue);
	    this._addCompositionRule('add', 'remove', (function(d1, p) {
	      d1[p] = DeltaModel._newDelta('forbid');
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
	      d1[p] = DeltaModel._newDelta('replace', d2.value);
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
	      [].push.apply(d1[p].value, d2.value);
	    }));
	    this._addCompositionRule('alter', 'replace', keepSecond);
	    this._addCompositionRule('alter', 'remove', (function(d1, p) {
	      d1[p] = DeltaModel._newDelta('forbid');
	    }));
	    this._addCompositionRule('add', 'alter', (function(d1, p, d2) {
	      assertFunction(d1[p].value, d2.alias);
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'alter', (function(d1, p, d2) {
	      assertFunction(d1[p].value, d2.alias);
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
	        U.assert(typeof resolvePromise === 'function', "Before creating an 'after' operation, you must register a promise resolver to delta.js.");
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
	      assertFunction(d1[p].value, 'after');
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'after', (function(d1, p, d2) {
	      assertFunction(d1[p].value, 'after');
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
	    this.Delta = U.newSubclass(_opTypes['modify'].Delta, function Delta(superFn, deltaName, options) {
	      superFn.call(this, options);
	      U.assert(options instanceof Object, "A delta should be given as an object.");
	      _opTypes['modify'].Delta.apply(this, options);
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
	        after: {get: function() {
	            return [].concat(options['after'] || [], options['expects'] || [], options['resolves'] || [], options['requires'] || []);
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
	      this.after.forEach((function(otherDeltaName) {
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
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2MThkZmFlZDVlNDAzMDg1YTI2OSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWx0YS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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QzNHLG1DQUFtQyxFQUFDLE1BQUksS0FBSyxFQUFDLGtCQUFnQixFQUFDLENBQUM7U0FDbkUsRUFBQyxDQUFDO0FBR0YsY0FBSyxjQUFlLEVBQUMsU0FBQyxJQUFHLENBQUcsTUFBSSxDQUFNO0FBQ3JDLGNBQUksS0FBSSxTQUFTLENBQUc7QUFDbkIsaUJBQUksbUJBQW9CLENBQUMsR0FBRSxDQUFHLE9BQUssQ0FBQyxDQUFDO1dBQ3RDO0FBQUEsU0FDRCxFQUFDLENBQUM7QUFHRixjQUFPLElBQUUsQ0FBRSxNQUFLLENBQUMsQ0FBQztPQUVuQjtLQUNELENBQUMsQ0FBQztHQUVILENBQUMsQ0FBQztBQUtFLG9CQUFhLEVBQUksS0FBRyxDQUFDO0FBRXpCLFVBQVEsQ0FBQyxVQUFTLENBQUcsRUFDcEIsdUJBQXNCLENBQXRCLFVBQXdCLGlCQUFnQixDQUFHO0FBQzFDLG9CQUFhLEVBQUksa0JBQWdCLENBQUM7S0FDbkMsQ0FDRCxDQUFDLENBQUM7QUFNRixRQUFPLFdBQVMsQ0FBQztBQUVsQixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7QUMvaEJBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImpzLWdyYXBoXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJKc0dyYXBoXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2MThkZmFlZDVlNDAzMDg1YTI2OVxuICoqLyIsImRlZmluZShbXG5cdCdqcXVlcnknLFxuXHQnYmx1ZWJpcmQnLFxuXHQnLi91dGlsL3dpZGdldC5qcycsXG5cdCcuL3V0aWwvbWlzYy5qcycsXG5cdCcuL3V0aWwvZGVsdGEuanMnXG5dLCBmdW5jdGlvbiAoJCwgUCwgYW15V2lkZ2V0LCBVLCBETSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gdGVsbCBkZWx0YS5qcyBhYm91dCBibHVlYmlyZFxuXHRETS5yZWdpc3RlclByb21pc2VSZXNvbHZlcihQLnJlc29sdmUpO1xuXG5cdC8vIGFsbG93ICckLmNpcmN1aXRib2FyZCcgdG8gYWNjZXB0IHBsdWdpbnNcblx0dmFyIGRtID0gbmV3IERNKCk7XG5cdFUuZXh0ZW5kKFUub2JqZWN0KCQsICdjaXJjdWl0Ym9hcmQnKSwge1xuXHRcdHBsdWdpbihwbHVnaW5PclNlbGVjdGlvbikge1xuXHRcdFx0aWYgKCQuaXNQbGFpbk9iamVjdChwbHVnaW5PclNlbGVjdGlvbikpIHtcblx0XHRcdFx0Ly8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVnaXN0ZXIgYSBuZXcgcGx1Z2luXG5cdFx0XHRcdHJldHVybiBuZXcgZG0uRGVsdGEocGx1Z2luT3JTZWxlY3Rpb24ubmFtZSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2VsZWN0IHBsdWdpbnMgdG8gYmUgYXBwbGllZFxuXHRcdFx0XHRkbS5zZWxlY3QuYXBwbHkoZG0sIHBsdWdpbk9yU2VsZWN0aW9uKTtcblx0XHRcdFx0ZGVmaW5lV2lkZ2V0Q2xhc3NlcygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gdG8gZGVmaW5lIHRoZSB3aWRnZXQgY2xhc3NlcyBhZnRlciB0aGUgcHJvcGVyIHBsdWdpbnMgaGF2ZSBiZWVuIHNlbGVjdGVkXG5cdGZ1bmN0aW9uIGRlZmluZVdpZGdldENsYXNzZXMoKSB7XG5cdFx0ZG0udnAoJ0NpcmN1aXRib2FyZCcsIGFteVdpZGdldCgnQ2lyY3VpdGJvYXJkJywge1xuXHRcdFx0Y3NzQ2xhc3M6IFwiY2lyY3VpdGJvYXJkXCIsXG5cdFx0XHRmaWx0ZXI6ICgpPT5QLnJlc29sdmUodHJ1ZSksXG5cdFx0XHRtb2RlbDogbnVsbFxuXHRcdH0pKTtcblxuXHRcdGRtLnZwKCdUaWxlbWFwJywgYW15V2lkZ2V0KCdUaWxlbWFwJywge1xuXHRcdFx0Y3NzQ2xhc3M6IFwidGlsZW1hcFwiLFxuXHRcdFx0bW9kZWw6IG51bGwsXG5cdFx0XHRfY2lyY3VpdGJvYXJkOiBudWxsXG5cdFx0fSkpO1xuXG5cdFx0ZG0udnAoJ1RpbGUnLCBhbXlXaWRnZXQoJ1RpbGUnLCB7XG5cdFx0XHRjc3NDbGFzczogJ3RpbGUnLFxuXHRcdFx0bW9kZWw6IG51bGwsXG5cdFx0XHRfY2lyY3VpdGJvYXJkOiBudWxsXG5cdFx0fSkpO1xuXHR9XG5cblx0Ly8gZm9yIGdldHRpbmcgdGhlIHBsdWdpbiBncmFwaFxuXHQkLmNpcmN1aXRib2FyZC5wbHVnaW4uZ3JhcGggPSAoKSA9PiBkbS5ncmFwaCgpO1xuXG5cdC8vIHJldHVybiB0aGUgc3RhdGljIGAkLmNpcmN1aXRib2FyZGAgb2JqZWN0LFxuXHQvLyB0aHJvdWdoIHdoaWNoIHBsdWdpbnMgY2FuIGJlIGFwcGxpZWQgYW5kIHNlbGVjdGVkXG5cdHJldHVybiAkLmNpcmN1aXRib2FyZDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2NpcmN1aXRib2FyZC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uICgkLCBQLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBzaWduYWwgaGFuZGxpbmcgbWV0aG9kcyB0byBhbiBvYmplY3Rcblx0Ly9cblx0ZnVuY3Rpb24gZW5hYmxlU2lnbmFsSGFuZGxpbmcob2JqKSB7XG5cdFx0dmFyIF9jYWxsYmFja3MgPSB7fTtcblxuXHRcdGZ1bmN0aW9uIF9zaWduYWxDYWxsYmFja3Moc2lnbmFsKSB7XG5cdFx0XHRpZiAoIV9jYWxsYmFja3Nbc2lnbmFsXSkge1xuXHRcdFx0XHRfY2FsbGJhY2tzW3NpZ25hbF0gPSAkLkNhbGxiYWNrcygpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9jYWxsYmFja3Nbc2lnbmFsXTtcblx0XHR9XG5cblx0XHQkLmV4dGVuZChvYmosIHtcblx0XHRcdG9uKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLmFkZChmbikgfSxcblx0XHRcdG9mZihzaWduYWwsIGZuKSB7IF9zaWduYWxDYWxsYmFja3Moc2lnbmFsKS5yZW1vdmUoZm4pIH0sXG5cdFx0XHRvbmUoc2lnbmFsLCBmbikge1xuXHRcdFx0XHR2YXIgcGFkZGVkRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0Zm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblx0XHRcdFx0XHR0aGlzLm9mZihzaWduYWwsIHBhZGRlZEZuKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy5vbihzaWduYWwsIHBhZGRlZEZuKTtcblx0XHRcdH0sXG5cdFx0XHRvbmNlKHNpZ25hbCwgZm4pIHsgdGhpcy5vbmUoc2lnbmFsLCBmbikgfSxcblx0XHRcdHRyaWdnZXIoc2lnbmFsLCAuLi5hcmdzKSB7XG5cdFx0XHRcdHZhciBjYWxsYmFja3MgPSBfY2FsbGJhY2tzW3NpZ25hbF07XG5cdFx0XHRcdGlmIChjYWxsYmFja3MpIHsgY2FsbGJhY2tzLmZpcmVXaXRoKHRoaXMsIGFyZ3MpIH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gaW1wbGVtZW50IGFydGVmYWN0IGhpZXJhcmNoeSBtZXRob2RzXG5cdC8vXG5cdGZ1bmN0aW9uIGRlZmluZUhpZXJhcmNoeU1ldGhvZHMob2JqLCB0eXBlKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ3R5cGUnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0eXBlIH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAncGFyZW50Jywge1xuXHRcdFx0c2V0KHBhcmVudCkge1xuXHRcdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHRcdFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKTtcblx0XHRcdH0sXG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLl9wYXJlbnQgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdjaGlsZHJlbicsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX2NoaWxkcmVuIH1cblx0XHR9KTtcblx0XHQkLmV4dGVuZChvYmosIHtcblx0XHRcdGNsb3Nlc3RBbmNlc3RvckJ5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzO1xuXHRcdFx0XHRkbyB7IHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQgfSB3aGlsZSAocmVzdWx0ICYmIHJlc3VsdC50eXBlICYmIHJlc3VsdC50eXBlICE9PSB0eXBlKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRjbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdCh0aGlzLmNoaWxkcmVuIHx8IFtdKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBtYWtlIHNvbWUgaW1wb3J0YW50IHJlZmVyZW5jZXMgdGhhdCBhcmUgcGFydFxuXHQvLyBvZiB0aGUgb3B0aW9ucyBwcm9wZXJ0eSBhdmFpbGFibGUgaW4gdGhlIG9iamVjdCBpdHNlbGZcblx0Ly9cblx0ZnVuY3Rpb24gZGVmaW5lRGVmYXVsdFByb3BlcnRpZXMob2JqKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21vZGVsJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5vcHRpb25zLm1vZGVsIH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGFwaW5hdG9teSBjb21wb25lbnQgKHdpZGdldClcblx0Ly8gYXMgYSBqUXVlcnkgZWxlbWVudCBwbHVnaW47IHRoaXMgaXMgcmV0dXJuZWQgZnJvbSB0aGUgbW9kdWxlXG5cdGZ1bmN0aW9uIGFteVdpZGdldCh0eXBlTmFtZSwgb3B0aW9uRGVmYXVsdHMpIHtcblx0XHQvLyB0aGUgc3BlY2lmaWMgd2lkZ2V0IGNsYXNzXG5cdFx0ZnVuY3Rpb24gV2lkZ2V0KHtvcHRpb25zLCBlbGVtZW50fSkge1xuXHRcdFx0JC5leHRlbmQodGhpcywge1xuXHRcdFx0XHRvcHRpb25zOiAkLmV4dGVuZCh7fSwgb3B0aW9uRGVmYXVsdHMsIG9wdGlvbnMpLFxuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRkZXN0cm95KCkgeyB0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3knKSB9XG5cdFx0XHR9KTtcblx0XHRcdGVuYWJsZVNpZ25hbEhhbmRsaW5nKHRoaXMpO1xuXG5cdFx0XHQvLyBzZXQgdGhlIGVsZW1lbnQgY2xhc3Ncblx0XHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY3NzQ2xhc3MpO1xuXHRcdFx0dGhpcy5lbGVtZW50Lm9uZSgncmVtb3ZlJywgKCkgPT4geyB0aGlzLmRlc3Ryb3koKSB9KTtcblxuXHRcdFx0Ly8gY29ubmVjdCB0byB0aGUgcGFyZW50IGFydGVmYWN0XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnBhcmVudCkgeyB0aGlzLnBhcmVudCA9IHRoaXMub3B0aW9ucy5wYXJlbnQgfVxuXG5cdFx0XHQvLyBjYWNoZSBhIHJlZmVyZW5jZSB0byB0aGUgY2lyY3VpdGJvYXJkIChpdCBpcyB1c2VkIG9mdGVuKVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gd2FpdCBmb3Igc29tZXRoaW5nIGJlZm9yZSBjb25zdHJ1Y3Rpb24gKGxpa2UgcGx1Z2lucyk/XG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gUC5yZXNvbHZlKCk7XG5cdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLm9wdGlvbnMuYmVmb3JlQ29uc3RydWN0aW9uKTtcblxuXHRcdFx0Ly8gaWYgcHJlc2VudCwgcnVuIHRoZSBjb25zdHJ1Y3QgbWV0aG9kIGFmdGVyXG5cdFx0XHQvLyBgdGhpcy5vcHRpb25zLmJlZm9yZUNvbnN0cnVjdGlvbmAgaXMgZmluaXNoZWRcblx0XHRcdC8vIGFuZCB0aGVuIHdhaXQgb24gaXRcblx0XHRcdHRoaXMuY29uc3RydWN0ZWQudGhlbigoKSA9PiB7XG5cdFx0XHRcdGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG5cdFx0XHRcdFx0dGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24odGhpcy5jb25zdHJ1Y3QoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdFdpZGdldC5wcm90b3R5cGUuYmVmb3JlQ29uc3RydWN0aW9uID0gZnVuY3Rpb24gYmVmb3JlQ29uc3RydWN0aW9uKHBvc3NpYmxlUHJvbWlzZSkge1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWRcblx0XHRcdFx0XHQucmV0dXJuKFAucmVzb2x2ZShwb3NzaWJsZVByb21pc2UpKVxuXHRcdFx0XHRcdC5yZXR1cm4odGhpcyk7XG5cdFx0fTtcblxuXHRcdGRlZmluZURlZmF1bHRQcm9wZXJ0aWVzKFdpZGdldC5wcm90b3R5cGUpO1xuXHRcdGRlZmluZUhpZXJhcmNoeU1ldGhvZHMoV2lkZ2V0LnByb3RvdHlwZSwgdHlwZU5hbWUpO1xuXG5cdFx0Ly8gbm93IGRlZmluZSB0aGUgd2lkZ2V0IGNyZWF0aW9uICYgcmV0cmlldmFsIGZ1bmN0aW9uIGFzIGEgalF1ZXJ5IHBsdWdpblxuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gdHlwZU5hbWVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGVOYW1lLnNsaWNlKDEpO1xuXHRcdCQuZm5bbG93ZXJjYXNlTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0Ly8gaWYgdGhlIHdvcmQgJ2luc3RhbmNlJyBpcyBwYXNzZWQsIHJldHVybiB0aGUgKGFscmVhZHkgY3JlYXRlZCkgd2lkZ2V0IHByb21pc2Vcblx0XHRcdGlmIChvcHRpb25zID09PSAnaW5zdGFuY2UnKSB7IHJldHVybiB0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWApIH1cblxuXHRcdFx0Ly8gZWxzZSwgY3JlYXRlIGEgbmV3IHdpZGdldCBhbmQgc2V0IGEgcHJvbWlzZSB0byBpdFxuXHRcdFx0dmFyIG5ld1dpZGdldCA9IG5ldyBXaWRnZXQoeyBvcHRpb25zOiBvcHRpb25zLCBlbGVtZW50OiB0aGlzIH0pO1xuXHRcdFx0dGhpcy5kYXRhKGAtYW15LSR7bG93ZXJjYXNlTmFtZX1gLCBuZXdXaWRnZXQuY29uc3RydWN0ZWQpO1xuXG5cdFx0XHQvLyByZXR1cm4gdGhlIGpRdWVyeSBlbGVtZW50IGluc3RhbmNlLCBieSBqUXVlcnkgY29udmVudGlvblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdC8vIHJldHVybiB0aGUgd2lkZ2V0IGFydGVmYWN0IGNsYXNzXG5cdFx0cmV0dXJuIFdpZGdldDtcblx0fVxuXG5cdHJldHVybiBhbXlXaWRnZXQ7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vdXRpbC93aWRnZXQuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGZpZWxkKG5hbWUpIHsgcmV0dXJuIChvYmopID0+IHsgcmV0dXJuIG9ialtuYW1lXSB9IH0sXG5cblx0XHQvLyBnZXQgdGhlIG9iamVjdCBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYSAocGxhaW4pIG9iamVjdCwgbWFrZSBpdCBhbiBlbXB0eSBvYmplY3QgZmlyc3Rcblx0XHRvYmplY3Qob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IHt9IH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyBleHRyYWN0IGFuIGFycmF5IG9mIHZhbHVlcyBmcm9tIGFuIG9iamVjdFxuXHRcdG9ialZhbHVlcyhvYmopIHsgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSkgfSxcblxuXHRcdC8vIGVuYWJsZSBhbiBIVE1MIGVsZW1lbnQgdG8gc2VydmUgYXMgYW5jaG9yIGZvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgY2hpbGRyZW5cblx0XHRtYWtlUG9zaXRpb25lZChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG5cdFx0XHRcdGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXR1cm4gdGhlIGZpcnN0IHBhcmFtZXRlciB0aGF0IGlzIG5vdCAndW5kZWZpbmVkJ1xuXHRcdGRlZk9yKC4uLnZhbHVlcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHsgcmV0dXJuIHZhbHVlc1tpXSB9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcblx0XHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG5cdFx0Ly8gTiBtaWxsaXNlY29uZHMuXG5cdFx0ZGVib3VuY2UoZnVuYywgd2FpdCwgY29udGV4dCkge1xuXHRcdFx0dmFyIHRpbWVvdXQ7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGxhdGVyRm4gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIHJ1bnMgYSBmdW5jdGlvbiBldmVyeSBhbmltYXRpb24gZnJhbWVcblx0XHQvLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHN0b3AgdGhlIGxvb3Bcblx0XHRlYWNoQW5pbWF0aW9uRnJhbWUoZm4sIGNvbnRleHQpIHtcblx0XHRcdHZhciBzdG9wID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0Zm4uYXBwbHkoY29udGV4dCk7XG5cdFx0XHRcdGlmIChzdG9wKSB7IHJldHVybiB9XG5cdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShpdGVyYXRpb25Gbik7XG5cdFx0XHR9XG5cdFx0XHRpdGVyYXRpb25GbigpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3BFYWNoQW5pbWF0aW9uRnJhbWUoKSB7XG5cdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0IHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgb25jZSBwZXIgc3luY2hyb25vdXMgJ3N0YWNrJy5cblx0XHRvbmNlUGVyU3RhY2soZnVuYywgY29udGV4dCkge1xuXHRcdFx0dmFyIG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0aWYgKG5vdFJ1bllldCkge1xuXHRcdFx0XHRcdG5vdFJ1bllldCA9IGZhbHNlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4geyBub3RSdW5ZZXQgPSB0cnVlIH0sIDApO1xuXHRcdFx0XHRcdGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZXMgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0byB0aGUgZ2l2ZW4gb2JqZWN0O1xuXHRcdC8vIHRoaXMgb2JqZWN0IGlzIGFzc3VtZWQgdG8gaGF2ZSBhIGB0cmlnZ2VyYCBtZXRob2Rcblx0XHQvL1xuXHRcdC8vIG9wdGlvbnMubmFtZSAobWFuZGF0b3J5KSAtIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuXHRcdC8vIG9wdGlvbnMudmFsaWRhdGlvbiAtIGlmIHNwZWNpZmllZCwgdGhpcyBmdW5jdGlvbiBpcyBydW4gYmVmb3JlIGEgbmV3IHZhbHVlIGlzIGFjdHVhbGx5IHNldC5cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBJdCBpcyBwYXNzZWQgdGhlIG5ldyB2YWx1ZSBhbmQgdGhlIG9sZCB2YWx1ZSwgYW5kIHNob3VsZCByZXR1cm4gdGhlIGFjdHVhbFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHNldC4gVGhpcyBjb3VsZCBiZSB0aGUgbmV3IG9yIG9sZCB2YWx1ZSBkaXJlY3RseSxcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBvciBhbnkgdHJhbnNmb3JtYXRpb24uIEl0IGNhbiBhbHNvIHRocm93IGFuIGV4Y2VwdGlvbiwgd2hpY2ggd2lsbCBqdXN0IGJlXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgYWxsb3dlZCB0byBwYXNzIHRocm91Z2guIFJldHVybmluZyB0aGUgb2xkIHZhbHVlIHByZXZlbnRzIGEgc2lnbmFsIGZyb21cblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBiZWluZyB0cmlnZ2VyZWQuXG5cdFx0b2JzZXJ2YWJsZShvYmosIHtuYW1lLCBpbml0aWFsLCB2YWxpZGF0aW9ufSkge1xuXHRcdFx0dmFyIHZhbHVlID0gaW5pdGlhbDtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdmFsdWUgfSxcblx0XHRcdFx0c2V0KG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0dmFyIG9sZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdFx0aWYgKHZhbGlkYXRpb24pIHsgbmV3VmFsdWUgPSB2YWxpZGF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfVxuXHRcdFx0XHRcdGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gbmV3VmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIobmFtZSwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDcmVhdGUgYSBuZXcgY2FjaGUgdG8gbWFuYWdlIGEgc3BlY2lmaWMgdmFsdWUgdGhhdCBpcyBjb3N0bHkgdG8gY29tcHV0ZSBvciByZXRyaWV2ZS5cblx0XHQvLyBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgY2FjaGVcblx0XHQvLyB0byByZXR1cm4gYSBrbm93biB2YWx1ZSBpbiBiZXR3ZWVuLiBJdCBpcyBhbHNvIGFibGUgdG8gbm90aWZ5IHlvdSB3aGVuIHRoZSB2YWx1ZVxuXHRcdC8vIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd25cblx0XHQvLyBjb21wYXJpc29uIGZ1bmN0aW9uLlxuXHRcdGNhY2hlZChvcHRpb25zKSB7XG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0dmFyIHJldHJpZXZlID0gb3B0aW9ucy5yZXRyaWV2ZSxcblx0XHRcdFx0XHRpc0VxdWFsID0gb3B0aW9ucy5pc0VxdWFsIHx8ICgoYSwgYikgPT4gKGEgPT09IGIpKTtcblxuXHRcdFx0Ly8ga2VlcCBhIGNhY2hlIGFuZCBnaXZlIGl0IGFuIGluaXRpYWwgdmFsdWVcblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvLyByZXRyaWV2ZSBhIHZhbHVlIGF0IG1vc3Qgb25jZSBwZXIgc3RhY2sgYW5kXG5cdFx0XHQvLyBpbnZva2UgdGhlIGNhbGxiYWNrIHdoZW5ldmVyIHRoZSB2YWx1ZSBpcyBuZXdcblx0XHRcdHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHNldFZhbHVlKTtcblxuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBhbGxvdyB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgdG8gYmUgc2V0IGFmdGVyIGNyZWF0aW9uO1xuXHRcdFx0Ly8gTk9URTogb25seSBvbmUgY2FsbGJhY2sgaXMgc3RvcmVkIVxuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblxuXHQvLyBIVE1MIGVsZW1lbnQgcG9zaXRpb25cblx0VS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHRvcCwgbGVmdCkge1xuXHRcdHRoaXMudG9wID0gdG9wO1xuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XG5cdH0pO1xuXHRVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcblx0fTtcblx0VS5Qb3NpdGlvbi5lcXVhbHMgPSAoYSwgYikgPT4ge1xuXHRcdHJldHVybiBhICYmIGIgJiYgYS50b3AgPT09IGIudG9wICYmIGEubGVmdCA9PT0gYi5sZWZ0O1xuXHR9O1xuXG5cblx0Ly8gSFRNTCBlbGVtZW50IHNpemVcblx0VS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoaGVpZ2h0LCB3aWR0aCkge1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0fSk7XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gYSAmJiBiICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCAmJiBhLndpZHRoID09PSBiLndpZHRoO1xuXHR9O1xuXG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWydqcy1ncmFwaCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKEpzR3JhcGgsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3dcblx0dmFyIGtlZXBGaXJzdCA9ICgpID0+IHt9O1xuXHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBkMiB9O1xuXHR2YXIgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUgPSAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5VG8oZDFbcF0sICd2YWx1ZScpIH07XG5cblx0ZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydCh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NlcnREZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodmFsKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHR9XG5cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gdGhlIGRlbHRhLW1vZGVsIGNsYXNzLCB3aGljaCBpcyB0aGUgY29udGFpbmVyIG9mIGFsbCBvcGVyYXRpb24gdHlwZXMsXG5cdC8vIGFsbCBkZWx0YXMsIHRoZWlyIG9yZGVyaW5nIGFuZCBydWxlc1xuXHR2YXIgRGVsdGFNb2RlbCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gQWNjdW11bGF0ZWQgZGF0YSBmb3IgdGhlIGF2YWlsYWJsZSBkZWx0YSBvcGVyYXRpb24gdHlwZXNcblx0XHR2YXIgX29wVHlwZXMgPSB7fTtcblx0XHQvKiB0aGUgbmFtZSBhbmQgZGVsdGEgY2xhc3NlcyAqL1xuXHRcdHZhciBfY29tcG9zZUZucyA9IFtdO1xuXHRcdC8qIHRoZSBjYXNlIGRpc3RpbmN0aW9ucyBvZiBkZWx0YSBjb21wb3NpdGlvbiAqL1xuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGZ1bGx5IGRlZmluZSBhIG5ldyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvblR5cGUoe25hbWUsIGNvbnN0cnVjdG9yLCBhcHBseVRvLCBwcm90b3R5cGUsIG1ldGhvZH0pIHtcblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YS5cblx0XHRcdFx0Ly8gSXQgaXMgcHV0IG9uIGEgdGVtcG9yYXJ5IG9iamVjdFxuXHRcdFx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHREZWx0YTogY29uc3RydWN0b3IsXG5cdFx0XHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBzcGVjaWZpYyBEZWx0YSBjbGFzc1xuXHRcdFx0XHRVLmV4dGVuZChfb3BUeXBlc1tuYW1lXS5EZWx0YS5wcm90b3R5cGUsIHByb3RvdHlwZSwge1xuXHRcdFx0XHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHR0eXBlOiBuYW1lLFxuXHRcdFx0XHRcdGFwcGx5VG86IGFwcGx5VG8sXG5cdFx0XHRcdFx0Y29tcG9zZShwcm9wZXJ0eSwgb3AyKSB7XG5cdFx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcDIpKSB7IHJldHVybiB0aGlzIH1cblx0XHRcdFx0XHRcdHZhciBmb3VuZENvbXBvc2VGbjtcblx0XHRcdFx0XHRcdF9jb21wb3NlRm5zLnNvbWUoKHtvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm59KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLnR5cGUgPT09IG9wMVR5cGUgJiYgb3AyLnR5cGUgPT09IG9wMlR5cGUpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbiA9IGNvbXBvc2VGbjtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRpZiAoZm91bmRDb21wb3NlRm4pIHtcblx0XHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4odGhpcywgcHJvcGVydHksIG9wMik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0YFlvdSBjYW5ub3QgZm9sbG93IGEgJyR7dGhpcy50eXBlfScgb3BlcmF0aW9uIGAgK1xuXHRcdFx0XHRcdFx0XHRcdFx0YHdpdGggYSAnJHtvcDIudHlwZX0nIG9wZXJhdGlvbiBvbiB0aGUgc2FtZSBwcm9wZXJ0eS5gXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGVyci5vcDEgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdFx0XHRcdGVyci5vcDIgPSBvcDIudHlwZTtcblx0XHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRcdC8vIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgdGhlIGZpcnN0IGRlbHRhIHR5cGUgdG8gYmUgZGVmaW5lZClcblx0XHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9XG5cdFx0XHRcdFx0XHRVLmlzRGVmaW5lZChtZXRob2QpID8gbWV0aG9kIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiAocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW25hbWVdLCBwcm9wZXJ0eSwgdmFsdWVzKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZ2l2ZSBhIG5ldyBuYW1lIHRvIChhIHZhcmlhdGlvbiBvZikgYW4gZXhpc3RpbmcgZGVsdGEgb3BlcmF0aW9uIHR5cGVcblx0XHRcdF9hZGRPcGVyYXRpb25BbGlhcyh7bmFtZSwgdGFyZ2V0LCB0cmFuc2Zvcm19KSB7XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YVxuXHRcdFx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0V2l0aE1ldGhvZCwgbmFtZSwge1xuXHRcdFx0XHRcdHZhbHVlKHByb3BlcnR5LCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1t0YXJnZXRdLCBwcm9wZXJ0eSwgdHJhbnNmb3JtKHZhbHVlcykpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRcdF9vcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgZGVmaW5lZCBmaXJzdClcblx0XHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9IF9vcFR5cGVzW25hbWVdLm1ldGhvZDtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBhZGQgYSBuZXcgdmFsaWQgY2FzZSBkaXN0aW5jdGlvbiBmb3IgZGVsdGEgY29tcG9zaXRpb25cblx0XHRcdF9hZGRDb21wb3NpdGlvblJ1bGUob3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuKSB7XG5cdFx0XHRcdF9jb21wb3NlRm5zLnB1c2goeyBvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4gfSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBnZXQgYSBuZXcgZGVsdGEgb2YgYSBnaXZlbiB0eXBlLCBjb25zdHJ1Y3RlZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcblx0XHRcdF9uZXdEZWx0YSh0eXBlLCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0cmV0dXJuIFUuYXBwbHlDb25zdHJ1Y3Rvcihfb3BUeXBlc1t0eXBlXS5EZWx0YSwgdmFsdWVzKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIHRoZSBtb2RpZnkgb3BlcmF0aW9uIChNVVNUIEJFIFRIRSBGSVJTVCBPUEVSQVRJT04gVFlQRSBUTyBCRSBERUZJTkVEKVxuXHRcdHZhciB0aGlzRE0gPSB0aGlzO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ21vZGlmeScsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gTW9kaWZ5KGRlbHRhRGVzY3JpcHRpb24sIG9wZXJhdGlvbnMpIHtcblx0XHRcdFx0Ly8gbm9ybWFsaXplIHRoaW5nc1xuXHRcdFx0XHRkZWx0YURlc2NyaXB0aW9uID0gZGVsdGFEZXNjcmlwdGlvbiB8fCB7fTtcblx0XHRcdFx0dGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucyB8fCB7fTtcblxuXHRcdFx0XHQvLyBwcm9jZXNzIHBvc3NpYmxlIGRlbHRhIGRlc2NyaXB0aW9uXG5cdFx0XHRcdE9iamVjdC5rZXlzKGRlbHRhRGVzY3JpcHRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdHZhciBtYXRjaCA9IGtleS5tYXRjaCgvXihcXHcrKVxccysoW1xcd1xcLl0rKSQvKTtcblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdHZhciBvcGVyYXRpb24gPSBtYXRjaFsxXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0VS5hc3NlcnQob3BlcmF0aW9uIGluIF9vcFR5cGVzLFxuXHRcdFx0XHRcdFx0XHRcdGBJIGRvbid0IGtub3cgdGhlICcke29wZXJhdGlvbn0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0XHRcdHRoaXNbb3BlcmF0aW9uXShwcm9wZXJ0eSwgZGVsdGFEZXNjcmlwdGlvbltrZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcGVydHkpKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BlcnR5XWBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmpbcHJvcGVydHldLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRcdHNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcGVydHksIHZhbHVlcykge1xuXHRcdFx0XHRcdHZhciBkb3RJbmRleCA9IHByb3BlcnR5LmluZGV4T2YoJy4nKTtcblx0XHRcdFx0XHRpZiAoZG90SW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBkb3Qtc2VwYXJhdGVkIHBhdGg7IHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIG1vZGlmeS1jaGFpblxuXHRcdFx0XHRcdFx0dmFyIGFjdHVhbFByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoMCwgZG90SW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIHJlc3RPZlByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoZG90SW5kZXggKyAxKTtcblx0XHRcdFx0XHRcdHZhciBuZXdNb2RpZnlEZWx0YSA9IHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIGFjdHVhbFByb3BlcnR5KTtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdNb2RpZnlEZWx0YVtvcFR5cGUubmFtZV0uYXBwbHkobmV3TW9kaWZ5RGVsdGEsIFtyZXN0T2ZQcm9wZXJ0eV0uY29uY2F0KHZhbHVlcykpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBzaW5nbGUgbmFtZTsgYWRkIHRoZSBuZXcgZGVsdGEgZGlyZWN0bHlcblx0XHRcdFx0XHRcdHZhciBfbmV3RGVsdGEgPSB0aGlzRE0uX25ld0RlbHRhLmFwcGx5KHRoaXNETSwgW29wVHlwZS5uYW1lXS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNvbXBvc2UocHJvcGVydHksIF9uZXdEZWx0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldID0gX25ld0RlbHRhO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bWV0aG9kKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbJ21vZGlmeSddLCBwcm9wZXJ0eSwgW2RlbHRhRGVzY3JpcHRpb25dKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZGQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFkZCh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2FkZCcpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZXBsYWNlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZXBsYWNlKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlcGxhY2UnKTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAncmVtb3ZlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZW1vdmUoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdyZW1vdmUnKTtcblx0XHRcdFx0ZGVsZXRlIG9ialtwcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnZm9yYmlkJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBGb3JiaWQoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkgeyBhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2ZvcmJpZCcpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gY29tcG9zaXRpb24gb2YgdGhlIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlcGxhY2UnLCAoZDEsIHAsIGQyKSA9PiB7IGQxW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2FkZCcsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdE9iamVjdC5rZXlzKGQyLm9wZXJhdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5vcGVyYXRpb25zW3Byb3BdKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2FkZCcsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgncmVwbGFjZScsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2FkZCcsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cblxuXHRcdC8vICdhbHRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhbHRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWx0ZXIodmFsdWUsIGFsaWFzKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBbXTtcblx0XHRcdFx0dGhpcy5hbGlhcyA9IGFsaWFzIHx8ICdhbHRlcic7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sIHRoaXMuYWxpYXMpO1xuXHRcdFx0XHR0aGlzLnZhbHVlLmZvckVhY2goKHN1Yk9wKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0XHRcdHZhciBwYXJ0VHdvID0gc3ViT3AudmFsdWU7XG5cdFx0XHRcdFx0aWYgKHN1Yk9wLnR5cGUgPT09ICdwcmVwZW5kJykge1xuXHRcdFx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0gZWxzZSB7IC8qICdhcHBlbmQnIG9yICdpbnNlcnQnICovXG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0W10ucHVzaC5hcHBseShkMVtwXS52YWx1ZSwgZDIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDFbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDFbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cblxuXHRcdC8vIHRoZSAncHJlcGVuZCcsICdpbnNlcnQnIGFuZCAnYXBwZW5kJyBvcGVyYXRpb24gdHlwZSBhbGlhc2VzXG5cdFx0WydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXS5mb3JFYWNoKChvcFR5cGUpID0+IHtcblx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbkFsaWFzKHtcblx0XHRcdFx0bmFtZTogb3BUeXBlLFxuXHRcdFx0XHR0YXJnZXQ6ICdhbHRlcicsXG5cdFx0XHRcdHRyYW5zZm9ybTogKGFyZ3MpID0+IFtbeyB0eXBlOiBvcFR5cGUsIHZhbHVlOiBhcmdzWzBdIH1dLCBvcFR5cGVdXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gJ2FmdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FmdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBZnRlcih2YWx1ZSkge1xuXHRcdFx0XHRVLmFzc2VydCh0eXBlb2YgcmVzb2x2ZVByb21pc2UgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdFx0XHRgQmVmb3JlIGNyZWF0aW5nIGFuICdhZnRlcicgb3BlcmF0aW9uLCB5b3UgbXVzdCByZWdpc3RlciBhIHByb21pc2UgcmVzb2x2ZXIgdG8gZGVsdGEuanMuYCk7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgJ2FmdGVyJyk7XG5cdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0dmFyIHBhcnRUd28gPSB0aGlzLnZhbHVlO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZVByb21pc2UocGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCAnYWZ0ZXInKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdpbnNlcnQnLCAnYWZ0ZXInLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdpbnNlcnQnLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0LyogVE9ETzogdGhlIGFib3ZlIGNvbXBvc2l0aW9ucyBvZiAnaW5zZXJ0JyBhbmQgJ2FmdGVyJyBhcmUgbm90IGFjdHVhbGx5IGNvcnJlY3QgKGUuZy4sIG5vdCBhc3NvY2lhdGl2ZSkuICovXG5cblxuXHRcdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdFx0dmFyIF9ncmFwaCA9IG5ldyBKc0dyYXBoKCk7IC8qIGRlbHRhcyBpbiBhIHN0cmljdCBwYXJ0aWFsIG9yZGVyICovXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gZ2V0IHRoZSBncmFwaCBvZiBkZWx0YXNcblx0XHRcdGdyYXBoKCkgeyByZXR1cm4gX2dyYXBoIH1cblx0XHR9KTtcblxuXHRcdHZhciBfZGVsdGFDb25kaXRpb25zID0ge307IC8qIGFycmF5cyBvZiBhcnJheXM6IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtcyAqL1xuXHRcdHZhciBfc2V0dGxlZERlbHRhQ29uZGl0aW9ucyA9IHt9OyAvKiBCb29sZWFucyAqL1xuXHRcdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0ZnVuY3Rpb24gX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCBkaXNqdW5jdCkge1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdICE9PSB0cnVlKSB7XG5cdFx0XHRcdFUuYXJyYXkoX2RlbHRhQ29uZGl0aW9ucywgZGVsdGFOYW1lKS5wdXNoKGRpc2p1bmN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmIChfY29uZGl0aW9uc1Vuc2V0dGxlZCkge1xuXHRcdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdKSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXS5zb21lKChkaXNqdW5jdCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzanVuY3QuZXZlcnkoKGNvbmp1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbY29uanVuY3RdKSkpIHtcblx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8vIGEgY2xhc3Mgb2YgYSBzdGFuZGFyZCBuYW1lZCBkZWx0YSB3aXRoIG1ldGEtZGF0YSB0aGF0IGlzIHJlZ2lzdGVyZWQgaW50byB0aGUgZGVsdGEgbW9kZWxcblx0XHR0aGlzLkRlbHRhID0gVS5uZXdTdWJjbGFzcyhfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEsIGZ1bmN0aW9uIERlbHRhKHN1cGVyRm4sIGRlbHRhTmFtZSwgb3B0aW9ucykge1xuXHRcdFx0Ly8gY2FsbCB0aGUgY29uc3RydWN0b3Igb2YgdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0VS5hc3NlcnQob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRgQSBkZWx0YSBzaG91bGQgYmUgZ2l2ZW4gYXMgYW4gb2JqZWN0LmApO1xuXHRcdFx0Ly8gVE9ETzogY2hlY2sgdW5pcXVlbmVzcyBvZiBgZGVsdGFOYW1lYFxuXG5cdFx0XHQvLyBtYWtlIHRoaXMgZGVsdGEgYSBNb2RpZnlEZWx0YSwgc28gcnVuIGl0cyBjb25zdHJ1Y3RvclxuXHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLmFwcGx5KHRoaXMsIG9wdGlvbnMpO1xuXG5cdFx0XHQvLyBjcmVhdGUgZGVsdGEgcHJvcGVydGllc1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0XHRuYW1lOiB7IGdldCgpIHsgcmV0dXJuIGRlbHRhTmFtZSB9IH0sXG5cdFx0XHRcdG1hbnVhbGx5U2VsZWN0YWJsZToge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydtYW51YWxseVNlbGVjdGFibGUnXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICEhb3B0aW9uc1snbWFudWFsbHlTZWxlY3RhYmxlJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pICYmIG9wdGlvbnNbJ3Jlc29sdmVzJ10ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdGVkOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0XHRcdHJldHVybiAhIV9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpZjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zWydpZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2lmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ2lmJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNbJ2lmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1sncmVzb2x2ZXMnXSkgeyAvKiBhcnJheSBvZiBuYW1lcyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogZmFsc2UgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0b25seUlmOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ29ubHlJZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ29ubHlJZiddID09PSBmYWxzZSkgeyAvKiBsaXRlcmFsICd0cnVlJyBvciAnZmFsc2UnICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zWydvbmx5SWYnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1snb25seUlmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1snZXhwZWN0cyddIHx8ICBvcHRpb25zWydyZXNvbHZlcyddKSB7IC8qIGFycmF5IG9mIG5hbWVzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydvbmx5SWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogdHJ1ZSAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFmdGVyOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydhZnRlciddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3JlcXVpcmVzJ10gfHwgW11cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWxlY3RzOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydzZWxlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB1cGRhdGUgY29uZGl0aW9uc1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuaWYpKSB7IF9yZWdpc3RlckRpc2p1bmN0KGRlbHRhTmFtZSwgdGhpcy5pZikgfVxuXHRcdFx0dGhpcy5zZWxlY3RzLmZvckVhY2goKG90aGVyRGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdF9yZWdpc3RlckRpc2p1bmN0KG90aGVyRGVsdGFOYW1lLCBbZGVsdGFOYW1lXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gdXBkYXRlIHRoZSBncmFwaFxuXHRcdFx0X2dyYXBoLmFkZFZlcnRleChkZWx0YU5hbWUsIHRoaXMpO1xuXHRcdFx0dGhpcy5hZnRlci5mb3JFYWNoKChvdGhlckRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRfZ3JhcGguY3JlYXRlRWRnZShvdGhlckRlbHRhTmFtZSwgZGVsdGFOYW1lKTtcblx0XHRcdH0pO1xuXHRcdFx0VS5hc3NlcnQoIV9ncmFwaC5oYXNDeWNsZSgpLFxuXHRcdFx0XHRcdGBUaGUgZGVsdGEgJHtkZWx0YU5hbWV9IGludHJvZHVjZWQgYSBjeWNsZSBpbiB0aGUgYXBwbGljYXRpb24gb3JkZXIuYCk7XG5cblx0XHR9KTtcblxuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gc2VsZWN0IGEgbnVtYmVyIG9mIGRlbHRhcyBieSBuYW1lLCBzbyB0aGV5IHdpbGwgYmUgYXBwbGllZCB3aGVuIGFwcGxpY2FibGVcblx0XHRcdHNlbGVjdCguLi5kZWx0YU5hbWVzKSB7XG5cdFx0XHRcdGRlbHRhTmFtZXMuZm9yRWFjaCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyByZWdpc3RlciBhIG5hbWVkIHZhcmlhdGlvbiBwb2ludCBpbiB0aGUgY29kZS1iYXNlXG5cdFx0XHQvLyAoaS5lLiwgYXBwbHkgYWxsIHJlZ2lzdGVyZWQgZGVsdGFzIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyB2YWx1ZSlcblx0XHRcdHZwKHZwTmFtZSwgdmFsKSB7XG5cblx0XHRcdFx0Ly8gYSB0ZW1wb3Jhcnkgb2JqZWN0IHRvIGhvbGQgdGhlIHZhbHVlIHdoaWxlIGl0IGlzIHVuZGVyZ29pbmcgY2hhbmdlXG5cdFx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdFx0b2JqW3ZwTmFtZV0gPSB2YWw7XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgYW55ICdvbmx5SWYnIGNvbmRpdGlvbnMgYXJlIGJlaW5nIHZpb2xhdGVkXG5cdFx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFUuYXNzZXJ0KCFkZWx0YS5zZWxlY3RlZCB8fCBkZWx0YS5vbmx5SWYgPT09IHRydWUgfHwgZGVsdGEub25seUlmLmV2ZXJ5KChkKSA9PiBfZ3JhcGgudmVydGV4VmFsdWUoZCkuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdvbmx5SWYnIGNvbmRpdGlvbiBvZiBkZWx0YSAnJHtkZWx0YS5uYW1lfScgd2FzIHZpb2xhdGVkLmApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBhcHBseSB0aGUgcHJvcGVyIGRlbHRhc1xuXHRcdFx0XHRfZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRpZiAoZGVsdGEuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLnNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHZwTmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyByZXR1cm4gdGhlIHRyYW5zZm9ybWVkIHZhbHVlXG5cdFx0XHRcdHJldHVybiBvYmpbdnBOYW1lXTtcblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgcmVzb2x2ZVByb21pc2UgPSBudWxsO1xuXHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0VS5leHRlbmQoRGVsdGFNb2RlbCwge1xuXHRcdHJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKHByb21pc2VSZXNvbHZlckZuKSB7XG5cdFx0XHRyZXNvbHZlUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlckZuO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdC8vIHJldHVybiB0aGUgbWFpbiBkZWx0YSBtb2RlbCBjbGFzc1xuXHRyZXR1cm4gRGVsdGFNb2RlbDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlbHRhLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNpcmN1aXRib2FyZC5qcyJ9