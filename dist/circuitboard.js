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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1NTI3OGM5ZDBmZjVmMDE4M2I4ZSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9jaXJjdWl0Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4uL3V0aWwvd2lkZ2V0LmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vLi4vdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uLi9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi4vdXRpbC9kZWx0YS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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QUNuQyxFQUFDLENBQUM7T0FDSDtBQUlBLFFBQUMsQ0FBRCxVQUFHLE1BQUssQ0FBRyxJQUFFO0FBR1IsZUFBRSxFQUFJLEdBQUMsQ0FBQztBQUNaLFdBQUUsQ0FBRSxNQUFLLENBQUMsRUFBSSxJQUFFLENBQUM7QUFHakIseUJBQWlCLEVBQUMsQ0FBQztBQUNuQixjQUFLLFdBQVksRUFBQyxTQUFDLElBQUcsQ0FBRyxNQUFJO0FBQzVCLGtCQUFRLENBQUMsQ0FBQyxLQUFJLFNBQVMsR0FBSyxNQUFJLE9BQU8sSUFBTSxLQUFHLEdBQUssTUFBSSxPQUFPLE1BQU8sRUFBQyxTQUFDO2tCQUFNLE9BQUssWUFBYSxDQUFDLEVBQUMsU0FBUztXQUFBLEVBQUMsR0FDM0csbUNBQW1DLEVBQUMsTUFBSSxLQUFLLEVBQUMsa0JBQWdCLEVBQUMsQ0FBQztTQUNuRSxFQUFDLENBQUM7QUFHRixjQUFLLGNBQWUsRUFBQyxTQUFDLElBQUcsQ0FBRyxNQUFJLENBQU07QUFDckMsY0FBSSxLQUFJLFNBQVMsQ0FBRztBQUNuQixpQkFBSSxtQkFBb0IsQ0FBQyxHQUFFLENBQUcsT0FBSyxDQUFDLENBQUM7V0FDdEM7QUFBQSxTQUNELEVBQUMsQ0FBQztBQUdGLGNBQU8sSUFBRSxDQUFFLE1BQUssQ0FBQyxDQUFDO09BRW5CO0tBQ0QsQ0FBQyxDQUFDO0dBRUgsQ0FBQyxDQUFDO0FBS0Usb0JBQWEsRUFBSSxLQUFHLENBQUM7QUFFekIsVUFBUSxDQUFDLFVBQVMsQ0FBRyxFQUNwQix1QkFBc0IsQ0FBdEIsVUFBd0IsaUJBQWdCLENBQUc7QUFDMUMsb0JBQWEsRUFBSSxrQkFBZ0IsQ0FBQztLQUNuQyxDQUNELENBQUMsQ0FBQztBQU1GLFFBQU8sV0FBUyxDQUFDO0FBRWxCLEVBQUMsK0lBQUM7QUFDRjs7Ozs7OztBQy9oQkEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCIsIFwianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwianMtZ3JhcGhcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkpzR3JhcGhcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDU1Mjc4YzlkMGZmNWYwMTgzYjhlXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCdibHVlYmlyZCcsXG5cdCcuL3V0aWwvd2lkZ2V0LmpzJyxcblx0Jy4vdXRpbC9taXNjLmpzJyxcblx0Jy4vdXRpbC9kZWx0YS5qcydcbl0sIGZ1bmN0aW9uICgkLCBQLCBhbXlXaWRnZXQsIFUsIERNKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyB0ZWxsIGRlbHRhLmpzIGFib3V0IGJsdWViaXJkXG5cdERNLnJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKFAucmVzb2x2ZSk7XG5cblx0Ly8gYWxsb3cgJyQuY2lyY3VpdGJvYXJkJyB0byBhY2NlcHQgcGx1Z2luc1xuXHR2YXIgZG0gPSBuZXcgRE0oKTtcblx0VS5leHRlbmQoVS5vYmplY3QoJCwgJ2NpcmN1aXRib2FyZCcpLCB7XG5cdFx0cGx1Z2luKHBsdWdpbk9yU2VsZWN0aW9uKSB7XG5cdFx0XHRpZiAoJC5pc1BsYWluT2JqZWN0KHBsdWdpbk9yU2VsZWN0aW9uKSkge1xuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byByZWdpc3RlciBhIG5ldyBwbHVnaW5cblx0XHRcdFx0cmV0dXJuIG5ldyBkbS5EZWx0YShwbHVnaW5PclNlbGVjdGlvbi5uYW1lLCBwbHVnaW5PclNlbGVjdGlvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB0byBzZWxlY3QgcGx1Z2lucyB0byBiZSBhcHBsaWVkXG5cdFx0XHRcdGRtLnNlbGVjdC5hcHBseShkbSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuXHRcdFx0XHRkZWZpbmVXaWRnZXRDbGFzc2VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyB0byBkZWZpbmUgdGhlIHdpZGdldCBjbGFzc2VzIGFmdGVyIHRoZSBwcm9wZXIgcGx1Z2lucyBoYXZlIGJlZW4gc2VsZWN0ZWRcblx0ZnVuY3Rpb24gZGVmaW5lV2lkZ2V0Q2xhc3NlcygpIHtcblx0XHRkbS52cCgnQ2lyY3VpdGJvYXJkJywgYW15V2lkZ2V0KCdDaXJjdWl0Ym9hcmQnLCB7XG5cdFx0XHRjc3NDbGFzczogXCJjaXJjdWl0Ym9hcmRcIixcblx0XHRcdGZpbHRlcjogKCk9PlAucmVzb2x2ZSh0cnVlKSxcblx0XHRcdG1vZGVsOiBudWxsXG5cdFx0fSkpO1xuXG5cdFx0ZG0udnAoJ1RpbGVtYXAnLCBhbXlXaWRnZXQoJ1RpbGVtYXAnLCB7XG5cdFx0XHRjc3NDbGFzczogXCJ0aWxlbWFwXCIsXG5cdFx0XHRtb2RlbDogbnVsbCxcblx0XHRcdF9jaXJjdWl0Ym9hcmQ6IG51bGxcblx0XHR9KSk7XG5cblx0XHRkbS52cCgnVGlsZScsIGFteVdpZGdldCgnVGlsZScsIHtcblx0XHRcdGNzc0NsYXNzOiAndGlsZScsXG5cdFx0XHRtb2RlbDogbnVsbCxcblx0XHRcdF9jaXJjdWl0Ym9hcmQ6IG51bGxcblx0XHR9KSk7XG5cdH1cblxuXHQvLyBmb3IgZ2V0dGluZyB0aGUgcGx1Z2luIGdyYXBoXG5cdCQuY2lyY3VpdGJvYXJkLnBsdWdpbi5ncmFwaCA9ICgpID0+IGRtLmdyYXBoKCk7XG5cblx0Ly8gcmV0dXJuIHRoZSBzdGF0aWMgYCQuY2lyY3VpdGJvYXJkYCBvYmplY3QsXG5cdC8vIHRocm91Z2ggd2hpY2ggcGx1Z2lucyBjYW4gYmUgYXBwbGllZCBhbmQgc2VsZWN0ZWRcblx0cmV0dXJuICQuY2lyY3VpdGJvYXJkO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvY2lyY3VpdGJvYXJkLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKCQsIFAsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vXG5cdC8vIGEgZnVuY3Rpb24gdG8gYWRkIHNpZ25hbCBoYW5kbGluZyBtZXRob2RzIHRvIGFuIG9iamVjdFxuXHQvL1xuXHRmdW5jdGlvbiBlbmFibGVTaWduYWxIYW5kbGluZyhvYmopIHtcblx0XHR2YXIgX2NhbGxiYWNrcyA9IHt9O1xuXG5cdFx0ZnVuY3Rpb24gX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpIHtcblx0XHRcdGlmICghX2NhbGxiYWNrc1tzaWduYWxdKSB7XG5cdFx0XHRcdF9jYWxsYmFja3Nbc2lnbmFsXSA9ICQuQ2FsbGJhY2tzKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX2NhbGxiYWNrc1tzaWduYWxdO1xuXHRcdH1cblxuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0b24oc2lnbmFsLCBmbikgeyBfc2lnbmFsQ2FsbGJhY2tzKHNpZ25hbCkuYWRkKGZuKSB9LFxuXHRcdFx0b2ZmKHNpZ25hbCwgZm4pIHsgX3NpZ25hbENhbGxiYWNrcyhzaWduYWwpLnJlbW92ZShmbikgfSxcblx0XHRcdG9uZShzaWduYWwsIGZuKSB7XG5cdFx0XHRcdHZhciBwYWRkZWRGbiA9ICgpID0+IHtcblx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdFx0XHRcdHRoaXMub2ZmKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLm9uKHNpZ25hbCwgcGFkZGVkRm4pO1xuXHRcdFx0fSxcblx0XHRcdG9uY2Uoc2lnbmFsLCBmbikgeyB0aGlzLm9uZShzaWduYWwsIGZuKSB9LFxuXHRcdFx0dHJpZ2dlcihzaWduYWwsIC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF9jYWxsYmFja3Nbc2lnbmFsXTtcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykgeyBjYWxsYmFja3MuZmlyZVdpdGgodGhpcywgYXJncykgfVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly9cblx0Ly8gYSBmdW5jdGlvbiB0byBpbXBsZW1lbnQgYXJ0ZWZhY3QgaGllcmFyY2h5IG1ldGhvZHNcblx0Ly9cblx0ZnVuY3Rpb24gZGVmaW5lSGllcmFyY2h5TWV0aG9kcyhvYmosIHR5cGUpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAndHlwZScsIHtcblx0XHRcdGdldCgpIHsgcmV0dXJuIHR5cGUgfVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdwYXJlbnQnLCB7XG5cdFx0XHRzZXQocGFyZW50KSB7XG5cdFx0XHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHRcdFx0VS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuXHRcdFx0fSxcblx0XHRcdGdldCgpIHsgcmV0dXJuIHRoaXMuX3BhcmVudCB9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ2NoaWxkcmVuJywge1xuXHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfVxuXHRcdH0pO1xuXHRcdCQuZXh0ZW5kKG9iaiwge1xuXHRcdFx0Y2xvc2VzdEFuY2VzdG9yQnlUeXBlKHR5cGUpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXM7XG5cdFx0XHRcdGRvIHsgcmVzdWx0ID0gcmVzdWx0LnBhcmVudCB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0KHRoaXMuY2hpbGRyZW4gfHwgW10pLmZvckVhY2goKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnR5cGUgPT09IHR5cGUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZC5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvL1xuXHQvLyBhIGZ1bmN0aW9uIHRvIG1ha2Ugc29tZSBpbXBvcnRhbnQgcmVmZXJlbmNlcyB0aGF0IGFyZSBwYXJ0XG5cdC8vIG9mIHRoZSBvcHRpb25zIHByb3BlcnR5IGF2YWlsYWJsZSBpbiB0aGUgb2JqZWN0IGl0c2VsZlxuXHQvL1xuXHRmdW5jdGlvbiBkZWZpbmVEZWZhdWx0UHJvcGVydGllcyhvYmopIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbW9kZWwnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiB0aGlzLm9wdGlvbnMubW9kZWwgfVxuXHRcdH0pO1xuXHR9XG5cblx0Ly8gYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gYXBpbmF0b215IGNvbXBvbmVudCAod2lkZ2V0KVxuXHQvLyBhcyBhIGpRdWVyeSBlbGVtZW50IHBsdWdpbjsgdGhpcyBpcyByZXR1cm5lZCBmcm9tIHRoZSBtb2R1bGVcblx0ZnVuY3Rpb24gYW15V2lkZ2V0KHR5cGVOYW1lLCBvcHRpb25EZWZhdWx0cykge1xuXHRcdC8vIHRoZSBzcGVjaWZpYyB3aWRnZXQgY2xhc3Ncblx0XHRmdW5jdGlvbiBXaWRnZXQoe29wdGlvbnMsIGVsZW1lbnR9KSB7XG5cdFx0XHQkLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHRcdG9wdGlvbnM6ICQuZXh0ZW5kKHt9LCBvcHRpb25EZWZhdWx0cywgb3B0aW9ucyksXG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGRlc3Ryb3koKSB7IHRoaXMudHJpZ2dlcignZGVzdHJveScpIH1cblx0XHRcdH0pO1xuXHRcdFx0ZW5hYmxlU2lnbmFsSGFuZGxpbmcodGhpcyk7XG5cblx0XHRcdC8vIHNldCB0aGUgZWxlbWVudCBjbGFzc1xuXHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKHRoaXMub3B0aW9ucy5jc3NDbGFzcyk7XG5cdFx0XHR0aGlzLmVsZW1lbnQub25lKCdyZW1vdmUnLCAoKSA9PiB7IHRoaXMuZGVzdHJveSgpIH0pO1xuXG5cdFx0XHQvLyBjb25uZWN0IHRvIHRoZSBwYXJlbnQgYXJ0ZWZhY3Rcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7IHRoaXMucGFyZW50ID0gdGhpcy5vcHRpb25zLnBhcmVudCB9XG5cblx0XHRcdC8vIGNhY2hlIGEgcmVmZXJlbmNlIHRvIHRoZSBjaXJjdWl0Ym9hcmQgKGl0IGlzIHVzZWQgb2Z0ZW4pXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NpcmN1aXRib2FyZCcsIHtcblx0XHRcdFx0Z2V0KCkgeyByZXR1cm4gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB3YWl0IGZvciBzb21ldGhpbmcgYmVmb3JlIGNvbnN0cnVjdGlvbiAobGlrZSBwbHVnaW5zKT9cblx0XHRcdHRoaXMuY29uc3RydWN0ZWQgPSBQLnJlc29sdmUoKTtcblx0XHRcdHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMub3B0aW9ucy5iZWZvcmVDb25zdHJ1Y3Rpb24pO1xuXG5cdFx0XHQvLyBpZiBwcmVzZW50LCBydW4gdGhlIGNvbnN0cnVjdCBtZXRob2QgYWZ0ZXJcblx0XHRcdC8vIGB0aGlzLm9wdGlvbnMuYmVmb3JlQ29uc3RydWN0aW9uYCBpcyBmaW5pc2hlZFxuXHRcdFx0Ly8gYW5kIHRoZW4gd2FpdCBvbiBpdFxuXHRcdFx0dGhpcy5jb25zdHJ1Y3RlZC50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcblx0XHRcdFx0XHR0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdCgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0V2lkZ2V0LnByb3RvdHlwZS5iZWZvcmVDb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBiZWZvcmVDb25zdHJ1Y3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG5cdFx0XHR0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdC5yZXR1cm4oUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSkpXG5cdFx0XHRcdFx0LnJldHVybih0aGlzKTtcblx0XHR9O1xuXG5cdFx0ZGVmaW5lRGVmYXVsdFByb3BlcnRpZXMoV2lkZ2V0LnByb3RvdHlwZSk7XG5cdFx0ZGVmaW5lSGllcmFyY2h5TWV0aG9kcyhXaWRnZXQucHJvdG90eXBlLCB0eXBlTmFtZSk7XG5cblx0XHQvLyBub3cgZGVmaW5lIHRoZSB3aWRnZXQgY3JlYXRpb24gJiByZXRyaWV2YWwgZnVuY3Rpb24gYXMgYSBqUXVlcnkgcGx1Z2luXG5cdFx0dmFyIGxvd2VyY2FzZU5hbWUgPSB0eXBlTmFtZVswXS50b0xvd2VyQ2FzZSgpICsgdHlwZU5hbWUuc2xpY2UoMSk7XG5cdFx0JC5mbltsb3dlcmNhc2VOYW1lXSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0XHQvLyBpZiB0aGUgd29yZCAnaW5zdGFuY2UnIGlzIHBhc3NlZCwgcmV0dXJuIHRoZSAoYWxyZWFkeSBjcmVhdGVkKSB3aWRnZXQgcHJvbWlzZVxuXHRcdFx0aWYgKG9wdGlvbnMgPT09ICdpbnN0YW5jZScpIHsgcmV0dXJuIHRoaXMuZGF0YShgLWFteS0ke2xvd2VyY2FzZU5hbWV9YCkgfVxuXG5cdFx0XHQvLyBlbHNlLCBjcmVhdGUgYSBuZXcgd2lkZ2V0IGFuZCBzZXQgYSBwcm9taXNlIHRvIGl0XG5cdFx0XHR2YXIgbmV3V2lkZ2V0ID0gbmV3IFdpZGdldCh7IG9wdGlvbnM6IG9wdGlvbnMsIGVsZW1lbnQ6IHRoaXMgfSk7XG5cdFx0XHR0aGlzLmRhdGEoYC1hbXktJHtsb3dlcmNhc2VOYW1lfWAsIG5ld1dpZGdldC5jb25zdHJ1Y3RlZCk7XG5cblx0XHRcdC8vIHJldHVybiB0aGUgalF1ZXJ5IGVsZW1lbnQgaW5zdGFuY2UsIGJ5IGpRdWVyeSBjb252ZW50aW9uXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0Ly8gcmV0dXJuIHRoZSB3aWRnZXQgYXJ0ZWZhY3QgY2xhc3Ncblx0XHRyZXR1cm4gV2lkZ2V0O1xuXHR9XG5cblx0cmV0dXJuIGFteVdpZGdldDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL3dpZGdldC5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAkX19wbGFjZWhvbGRlcl9fMjtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fNCsrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNVskX19wbGFjZWhvbGRlcl9fNiAtICRfX3BsYWNlaG9sZGVyX183XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fOF07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIFtzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcl0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllc1xuXHRcdC8vIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zXG5cdFx0Ly8gdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Rcblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0b2JqMVtrZXldID0gb2JqW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mXG5cdFx0Ly8gYSBzcGVjaWZpYyBmaWVsZCBmcm9tIGEgZ2l2ZW4gb2JqZWN0XG5cdFx0ZmllbGQobmFtZSkgeyByZXR1cm4gKG9iaikgPT4geyByZXR1cm4gb2JqW25hbWVdIH0gfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0ge30gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gcHVsbCBhIHZhbHVlIGZyb20gYW4gYXJyYXlcblx0XHRwdWxsKGFyciwgdmFsKSB7XG5cdFx0XHR2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG5cdFx0XHRpZiAoaSAhPT0gLTEpIHsgYXJyLnNwbGljZShpKSB9XG5cdFx0fSxcblxuXHRcdC8vIGVtcHR5IG91dCBhbiBhcnJheVxuXHRcdG1ha2VFbXB0eShhcnIpIHtcblx0XHRcdHdoaWxlIChhcnIubGVuZ3RoID4gMCkgeyBhcnIucG9wKCkgfVxuXHRcdH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCB0YWtpbmcgYW4gYXJyYXkgbGlrZSBgRnVuY3Rpb24uYXBwbHlgIGRvZXNcblx0XHRiaW5kQShmbiwgY3R4LCBhcmdzKSB7IHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpIH0sXG5cblx0XHQvLyBgRnVuY3Rpb24uYmluZGAsIGJ1dCBvbmx5IGhhdmluZyB0byBzcGVjaWZ5IHRoZSBjb250ZXh0LW9iamVjdCBvbmNlXG5cdFx0YmluZChvYmosIG0sIC4uLmFyZ3MpIHsgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpIH0sXG5cblx0XHQvLyBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWRcblx0XHQvLyB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuXHRcdH0sXG5cblx0XHQvLyBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhXG5cdFx0Ly8gY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZVxuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gcnVucyBhIGZ1bmN0aW9uIGV2ZXJ5IGFuaW1hdGlvbiBmcmFtZVxuXHRcdC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgbG9vcFxuXHRcdGVhY2hBbmltYXRpb25GcmFtZShmbiwgY29udGV4dCkge1xuXHRcdFx0dmFyIHN0b3AgPSBmYWxzZTtcblx0XHRcdGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuXHRcdFx0XHRmbi5hcHBseShjb250ZXh0KTtcblx0XHRcdFx0aWYgKHN0b3ApIHsgcmV0dXJuIH1cblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGl0ZXJhdGlvbkZuKTtcblx0XHRcdH1cblx0XHRcdGl0ZXJhdGlvbkZuKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gc3RvcEVhY2hBbmltYXRpb25GcmFtZSgpIHtcblx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlcyBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRvIHRoZSBnaXZlbiBvYmplY3Q7XG5cdFx0Ly8gdGhpcyBvYmplY3QgaXMgYXNzdW1lZCB0byBoYXZlIGEgYHRyaWdnZXJgIG1ldGhvZFxuXHRcdC8vXG5cdFx0Ly8gb3B0aW9ucy5uYW1lIChtYW5kYXRvcnkpIC0gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG5cdFx0Ly8gb3B0aW9ucy52YWxpZGF0aW9uIC0gaWYgc3BlY2lmaWVkLCB0aGlzIGZ1bmN0aW9uIGlzIHJ1biBiZWZvcmUgYSBuZXcgdmFsdWUgaXMgYWN0dWFsbHkgc2V0LlxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIEl0IGlzIHBhc3NlZCB0aGUgbmV3IHZhbHVlIGFuZCB0aGUgb2xkIHZhbHVlLCBhbmQgc2hvdWxkIHJldHVybiB0aGUgYWN0dWFsXG5cdFx0Ly8gICAgICAgICAgICAgICAgICAgICAgdmFsdWUgdGhhdCBzaG91bGQgYmUgc2V0LiBUaGlzIGNvdWxkIGJlIHRoZSBuZXcgb3Igb2xkIHZhbHVlIGRpcmVjdGx5LFxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIG9yIGFueSB0cmFuc2Zvcm1hdGlvbi4gSXQgY2FuIGFsc28gdGhyb3cgYW4gZXhjZXB0aW9uLCB3aGljaCB3aWxsIGp1c3QgYmVcblx0XHQvLyAgICAgICAgICAgICAgICAgICAgICBhbGxvd2VkIHRvIHBhc3MgdGhyb3VnaC4gUmV0dXJuaW5nIHRoZSBvbGQgdmFsdWUgcHJldmVudHMgYSBzaWduYWwgZnJvbVxuXHRcdC8vICAgICAgICAgICAgICAgICAgICAgIGJlaW5nIHRyaWdnZXJlZC5cblx0XHRvYnNlcnZhYmxlKG9iaiwge25hbWUsIGluaXRpYWwsIHZhbGlkYXRpb259KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBpbml0aWFsO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuXHRcdFx0XHRnZXQoKSB7IHJldHVybiB2YWx1ZSB9LFxuXHRcdFx0XHRzZXQobmV3VmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRpZiAodmFsaWRhdGlvbikgeyBuZXdWYWx1ZSA9IHZhbGlkYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB9XG5cdFx0XHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihuYW1lLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLlxuXHRcdC8vIEl0IGVuc3VyZXMgdGhhdCB0aGUgcmV0cmlldmFsIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgb25seSBvbmNlIHBlciBzdGFjaywgYW5kIHVzZXMgYSBjYWNoZVxuXHRcdC8vIHRvIHJldHVybiBhIGtub3duIHZhbHVlIGluIGJldHdlZW4uIEl0IGlzIGFsc28gYWJsZSB0byBub3RpZnkgeW91IHdoZW4gdGhlIHZhbHVlXG5cdFx0Ly8gaGFzIGFjdHVhbGx5IGNoYW5nZWQuIEl0IGRvZXMgc28gdXNpbmcgYD09PWAgY29tcGFyaXNvbiwgYnV0IHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93blxuXHRcdC8vIGNvbXBhcmlzb24gZnVuY3Rpb24uXG5cdFx0Y2FjaGVkKG9wdGlvbnMpIHtcblx0XHRcdC8vXG5cdFx0XHQvLyBub3JtYWxpemUgcGFyYW1ldGVyc1xuXHRcdFx0Ly9cblx0XHRcdHZhciByZXRyaWV2ZSA9IG9wdGlvbnMucmV0cmlldmUsXG5cdFx0XHRcdFx0aXNFcXVhbCA9IG9wdGlvbnMuaXNFcXVhbCB8fCAoKGEsIGIpID0+IChhID09PSBiKSk7XG5cblx0XHRcdC8vXG5cdFx0XHQvLyBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZVxuXHRcdFx0Ly9cblx0XHRcdHZhciBjYWNoZTtcblx0XHRcdGZ1bmN0aW9uIHNldFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgb2xkVmFsdWUgPSBjYWNoZTtcblx0XHRcdFx0Y2FjaGUgPSByZXRyaWV2ZSgpO1xuXHRcdFx0XHRpZiAob25DaGFuZ2UgJiYgIWlzRXF1YWwoY2FjaGUsIG9sZFZhbHVlKSkge1xuXHRcdFx0XHRcdG9uQ2hhbmdlKGNhY2hlLCBvbGRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoc2V0VmFsdWUsIDApO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrIGFuZFxuXHRcdFx0Ly8gaW52b2tlIHRoZSBjYWxsYmFjayB3aGVuZXZlciB0aGUgdmFsdWUgaXMgbmV3XG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2soc2V0VmFsdWUpO1xuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBwb3NzaWJseSBwZXJmb3JtcyByZXRyaWV2YWwsXG5cdFx0XHQvLyBhbmQgYWx3YXlzIHJldHVybnMgdGhlIGNhY2hlICh3aGljaCBtYXkgY29udGFpbiB0aGUgbmV3IHZhbHVlKVxuXHRcdFx0Ly9cblx0XHRcdHZhciByZXN1bHRGbiA9ICgpID0+IHtcblx0XHRcdFx0b25jZVBlclN0YWNrU2V0VmFsdWUoKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly9cblx0XHRcdC8vIGFsbG93IHRoZSBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgYWZ0ZXIgY3JlYXRpb247XG5cdFx0XHQvLyBOT1RFOiBvbmx5IG9uZSBjYWxsYmFjayBpcyBzdG9yZWQhXG5cdFx0XHQvL1xuXHRcdFx0dmFyIG9uQ2hhbmdlO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHsgb25DaGFuZ2UgPSBjYjsgcmV0dXJuIHJlc3VsdEZuOyB9O1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fVxuXG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3V0aWwvbWlzYy5qc1xuICoqLyIsIlxuICAgICAgICAgICAgZm9yICh2YXIgJF9fcGxhY2Vob2xkZXJfXzAgPSBbXSwgJF9fcGxhY2Vob2xkZXJfXzEgPSAwO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX18zKyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180WyRfX3BsYWNlaG9sZGVyX181XSA9IGFyZ3VtZW50c1skX19wbGFjZWhvbGRlcl9fNl07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJkZWZpbmUoWydqcy1ncmFwaCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKEpzR3JhcGgsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3dcblx0dmFyIGtlZXBGaXJzdCA9ICgpID0+IHt9O1xuXHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBkMiB9O1xuXHR2YXIgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUgPSAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5VG8oZDFbcF0sICd2YWx1ZScpIH07XG5cblx0ZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydCh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NlcnREZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodmFsKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHR9XG5cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gdGhlIGRlbHRhLW1vZGVsIGNsYXNzLCB3aGljaCBpcyB0aGUgY29udGFpbmVyIG9mIGFsbCBvcGVyYXRpb24gdHlwZXMsXG5cdC8vIGFsbCBkZWx0YXMsIHRoZWlyIG9yZGVyaW5nIGFuZCBydWxlc1xuXHR2YXIgRGVsdGFNb2RlbCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gQWNjdW11bGF0ZWQgZGF0YSBmb3IgdGhlIGF2YWlsYWJsZSBkZWx0YSBvcGVyYXRpb24gdHlwZXNcblx0XHR2YXIgX29wVHlwZXMgPSB7fTtcblx0XHQvKiB0aGUgbmFtZSBhbmQgZGVsdGEgY2xhc3NlcyAqL1xuXHRcdHZhciBfY29tcG9zZUZucyA9IFtdO1xuXHRcdC8qIHRoZSBjYXNlIGRpc3RpbmN0aW9ucyBvZiBkZWx0YSBjb21wb3NpdGlvbiAqL1xuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGZ1bGx5IGRlZmluZSBhIG5ldyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvblR5cGUoe25hbWUsIGNvbnN0cnVjdG9yLCBhcHBseVRvLCBwcm90b3R5cGUsIG1ldGhvZH0pIHtcblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YS5cblx0XHRcdFx0Ly8gSXQgaXMgcHV0IG9uIGEgdGVtcG9yYXJ5IG9iamVjdFxuXHRcdFx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHREZWx0YTogY29uc3RydWN0b3IsXG5cdFx0XHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBzcGVjaWZpYyBEZWx0YSBjbGFzc1xuXHRcdFx0XHRVLmV4dGVuZChfb3BUeXBlc1tuYW1lXS5EZWx0YS5wcm90b3R5cGUsIHByb3RvdHlwZSwge1xuXHRcdFx0XHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHR0eXBlOiBuYW1lLFxuXHRcdFx0XHRcdGFwcGx5VG86IGFwcGx5VG8sXG5cdFx0XHRcdFx0Y29tcG9zZShwcm9wZXJ0eSwgb3AyKSB7XG5cdFx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcDIpKSB7IHJldHVybiB0aGlzIH1cblx0XHRcdFx0XHRcdHZhciBmb3VuZENvbXBvc2VGbjtcblx0XHRcdFx0XHRcdF9jb21wb3NlRm5zLnNvbWUoKHtvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm59KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLnR5cGUgPT09IG9wMVR5cGUgJiYgb3AyLnR5cGUgPT09IG9wMlR5cGUpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbiA9IGNvbXBvc2VGbjtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRpZiAoZm91bmRDb21wb3NlRm4pIHtcblx0XHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4odGhpcywgcHJvcGVydHksIG9wMik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0YFlvdSBjYW5ub3QgZm9sbG93IGEgJyR7dGhpcy50eXBlfScgb3BlcmF0aW9uIGAgK1xuXHRcdFx0XHRcdFx0XHRcdFx0YHdpdGggYSAnJHtvcDIudHlwZX0nIG9wZXJhdGlvbiBvbiB0aGUgc2FtZSBwcm9wZXJ0eS5gXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGVyci5vcDEgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdFx0XHRcdGVyci5vcDIgPSBvcDIudHlwZTtcblx0XHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRcdC8vIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgdGhlIGZpcnN0IGRlbHRhIHR5cGUgdG8gYmUgZGVmaW5lZClcblx0XHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9XG5cdFx0XHRcdFx0XHRVLmlzRGVmaW5lZChtZXRob2QpID8gbWV0aG9kIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiAocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW25hbWVdLCBwcm9wZXJ0eSwgdmFsdWVzKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZ2l2ZSBhIG5ldyBuYW1lIHRvIChhIHZhcmlhdGlvbiBvZikgYW4gZXhpc3RpbmcgZGVsdGEgb3BlcmF0aW9uIHR5cGVcblx0XHRcdF9hZGRPcGVyYXRpb25BbGlhcyh7bmFtZSwgdGFyZ2V0LCB0cmFuc2Zvcm19KSB7XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YVxuXHRcdFx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0V2l0aE1ldGhvZCwgbmFtZSwge1xuXHRcdFx0XHRcdHZhbHVlKHByb3BlcnR5LCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1t0YXJnZXRdLCBwcm9wZXJ0eSwgdHJhbnNmb3JtKHZhbHVlcykpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRcdF9vcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgZGVmaW5lZCBmaXJzdClcblx0XHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9IF9vcFR5cGVzW25hbWVdLm1ldGhvZDtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBhZGQgYSBuZXcgdmFsaWQgY2FzZSBkaXN0aW5jdGlvbiBmb3IgZGVsdGEgY29tcG9zaXRpb25cblx0XHRcdF9hZGRDb21wb3NpdGlvblJ1bGUob3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuKSB7XG5cdFx0XHRcdF9jb21wb3NlRm5zLnB1c2goeyBvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4gfSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBnZXQgYSBuZXcgZGVsdGEgb2YgYSBnaXZlbiB0eXBlLCBjb25zdHJ1Y3RlZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcblx0XHRcdF9uZXdEZWx0YSh0eXBlLCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0cmV0dXJuIFUuYXBwbHlDb25zdHJ1Y3Rvcihfb3BUeXBlc1t0eXBlXS5EZWx0YSwgdmFsdWVzKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIHRoZSBtb2RpZnkgb3BlcmF0aW9uIChNVVNUIEJFIFRIRSBGSVJTVCBPUEVSQVRJT04gVFlQRSBUTyBCRSBERUZJTkVEKVxuXHRcdHZhciB0aGlzRE0gPSB0aGlzO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ21vZGlmeScsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gTW9kaWZ5KGRlbHRhRGVzY3JpcHRpb24sIG9wZXJhdGlvbnMpIHtcblx0XHRcdFx0Ly8gbm9ybWFsaXplIHRoaW5nc1xuXHRcdFx0XHRkZWx0YURlc2NyaXB0aW9uID0gZGVsdGFEZXNjcmlwdGlvbiB8fCB7fTtcblx0XHRcdFx0dGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucyB8fCB7fTtcblxuXHRcdFx0XHQvLyBwcm9jZXNzIHBvc3NpYmxlIGRlbHRhIGRlc2NyaXB0aW9uXG5cdFx0XHRcdE9iamVjdC5rZXlzKGRlbHRhRGVzY3JpcHRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdHZhciBtYXRjaCA9IGtleS5tYXRjaCgvXihcXHcrKVxccysoW1xcd1xcLl0rKSQvKTtcblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdHZhciBvcGVyYXRpb24gPSBtYXRjaFsxXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0VS5hc3NlcnQob3BlcmF0aW9uIGluIF9vcFR5cGVzLFxuXHRcdFx0XHRcdFx0XHRcdGBJIGRvbid0IGtub3cgdGhlICcke29wZXJhdGlvbn0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0XHRcdHRoaXNbb3BlcmF0aW9uXShwcm9wZXJ0eSwgZGVsdGFEZXNjcmlwdGlvbltrZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcGVydHkpKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BlcnR5XWBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmpbcHJvcGVydHldLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRcdHNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcGVydHksIHZhbHVlcykge1xuXHRcdFx0XHRcdHZhciBkb3RJbmRleCA9IHByb3BlcnR5LmluZGV4T2YoJy4nKTtcblx0XHRcdFx0XHRpZiAoZG90SW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBkb3Qtc2VwYXJhdGVkIHBhdGg7IHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIG1vZGlmeS1jaGFpblxuXHRcdFx0XHRcdFx0dmFyIGFjdHVhbFByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoMCwgZG90SW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIHJlc3RPZlByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoZG90SW5kZXggKyAxKTtcblx0XHRcdFx0XHRcdHZhciBuZXdNb2RpZnlEZWx0YSA9IHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIGFjdHVhbFByb3BlcnR5KTtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdNb2RpZnlEZWx0YVtvcFR5cGUubmFtZV0uYXBwbHkobmV3TW9kaWZ5RGVsdGEsIFtyZXN0T2ZQcm9wZXJ0eV0uY29uY2F0KHZhbHVlcykpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBzaW5nbGUgbmFtZTsgYWRkIHRoZSBuZXcgZGVsdGEgZGlyZWN0bHlcblx0XHRcdFx0XHRcdHZhciBfbmV3RGVsdGEgPSB0aGlzRE0uX25ld0RlbHRhLmFwcGx5KHRoaXNETSwgW29wVHlwZS5uYW1lXS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNvbXBvc2UocHJvcGVydHksIF9uZXdEZWx0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldID0gX25ld0RlbHRhO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bWV0aG9kKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbJ21vZGlmeSddLCBwcm9wZXJ0eSwgW2RlbHRhRGVzY3JpcHRpb25dKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZGQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFkZCh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2FkZCcpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZXBsYWNlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZXBsYWNlKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlcGxhY2UnKTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAncmVtb3ZlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZW1vdmUoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdyZW1vdmUnKTtcblx0XHRcdFx0ZGVsZXRlIG9ialtwcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnZm9yYmlkJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBGb3JiaWQoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkgeyBhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2ZvcmJpZCcpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gY29tcG9zaXRpb24gb2YgdGhlIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlcGxhY2UnLCAoZDEsIHAsIGQyKSA9PiB7IGQxW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2FkZCcsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdE9iamVjdC5rZXlzKGQyLm9wZXJhdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5vcGVyYXRpb25zW3Byb3BdKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2FkZCcsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgncmVwbGFjZScsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2FkZCcsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cblxuXHRcdC8vICdhbHRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhbHRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWx0ZXIodmFsdWUsIGFsaWFzKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBbXTtcblx0XHRcdFx0dGhpcy5hbGlhcyA9IGFsaWFzIHx8ICdhbHRlcic7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sIHRoaXMuYWxpYXMpO1xuXHRcdFx0XHR0aGlzLnZhbHVlLmZvckVhY2goKHN1Yk9wKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0XHRcdHZhciBwYXJ0VHdvID0gc3ViT3AudmFsdWU7XG5cdFx0XHRcdFx0aWYgKHN1Yk9wLnR5cGUgPT09ICdwcmVwZW5kJykge1xuXHRcdFx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0gZWxzZSB7IC8qICdhcHBlbmQnIG9yICdpbnNlcnQnICovXG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0W10ucHVzaC5hcHBseShkMVtwXS52YWx1ZSwgZDIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDFbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDFbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cblxuXHRcdC8vIHRoZSAncHJlcGVuZCcsICdpbnNlcnQnIGFuZCAnYXBwZW5kJyBvcGVyYXRpb24gdHlwZSBhbGlhc2VzXG5cdFx0WydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXS5mb3JFYWNoKChvcFR5cGUpID0+IHtcblx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbkFsaWFzKHtcblx0XHRcdFx0bmFtZTogb3BUeXBlLFxuXHRcdFx0XHR0YXJnZXQ6ICdhbHRlcicsXG5cdFx0XHRcdHRyYW5zZm9ybTogKGFyZ3MpID0+IFtbeyB0eXBlOiBvcFR5cGUsIHZhbHVlOiBhcmdzWzBdIH1dLCBvcFR5cGVdXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gJ2FmdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FmdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBZnRlcih2YWx1ZSkge1xuXHRcdFx0XHRVLmFzc2VydCh0eXBlb2YgcmVzb2x2ZVByb21pc2UgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdFx0XHRgQmVmb3JlIGNyZWF0aW5nIGFuICdhZnRlcicgb3BlcmF0aW9uLCB5b3UgbXVzdCByZWdpc3RlciBhIHByb21pc2UgcmVzb2x2ZXIgdG8gZGVsdGEuanMuYCk7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgJ2FmdGVyJyk7XG5cdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0dmFyIHBhcnRUd28gPSB0aGlzLnZhbHVlO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZVByb21pc2UocGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCAnYWZ0ZXInKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdpbnNlcnQnLCAnYWZ0ZXInLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdpbnNlcnQnLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0LyogVE9ETzogdGhlIGFib3ZlIGNvbXBvc2l0aW9ucyBvZiAnaW5zZXJ0JyBhbmQgJ2FmdGVyJyBhcmUgbm90IGFjdHVhbGx5IGNvcnJlY3QgKGUuZy4sIG5vdCBhc3NvY2lhdGl2ZSkuICovXG5cblxuXHRcdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdFx0dmFyIF9ncmFwaCA9IG5ldyBKc0dyYXBoKCk7IC8qIGRlbHRhcyBpbiBhIHN0cmljdCBwYXJ0aWFsIG9yZGVyICovXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gZ2V0IHRoZSBncmFwaCBvZiBkZWx0YXNcblx0XHRcdGdyYXBoKCkgeyByZXR1cm4gX2dyYXBoIH1cblx0XHR9KTtcblxuXHRcdHZhciBfZGVsdGFDb25kaXRpb25zID0ge307IC8qIGFycmF5cyBvZiBhcnJheXM6IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtcyAqL1xuXHRcdHZhciBfc2V0dGxlZERlbHRhQ29uZGl0aW9ucyA9IHt9OyAvKiBCb29sZWFucyAqL1xuXHRcdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0ZnVuY3Rpb24gX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCBkaXNqdW5jdCkge1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdICE9PSB0cnVlKSB7XG5cdFx0XHRcdFUuYXJyYXkoX2RlbHRhQ29uZGl0aW9ucywgZGVsdGFOYW1lKS5wdXNoKGRpc2p1bmN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmIChfY29uZGl0aW9uc1Vuc2V0dGxlZCkge1xuXHRcdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdKSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXS5zb21lKChkaXNqdW5jdCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzanVuY3QuZXZlcnkoKGNvbmp1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbY29uanVuY3RdKSkpIHtcblx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8vIGEgY2xhc3Mgb2YgYSBzdGFuZGFyZCBuYW1lZCBkZWx0YSB3aXRoIG1ldGEtZGF0YSB0aGF0IGlzIHJlZ2lzdGVyZWQgaW50byB0aGUgZGVsdGEgbW9kZWxcblx0XHR0aGlzLkRlbHRhID0gVS5uZXdTdWJjbGFzcyhfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEsIGZ1bmN0aW9uIERlbHRhKHN1cGVyRm4sIGRlbHRhTmFtZSwgb3B0aW9ucykge1xuXHRcdFx0Ly8gY2FsbCB0aGUgY29uc3RydWN0b3Igb2YgdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0VS5hc3NlcnQob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRgQSBkZWx0YSBzaG91bGQgYmUgZ2l2ZW4gYXMgYW4gb2JqZWN0LmApO1xuXHRcdFx0Ly8gVE9ETzogY2hlY2sgdW5pcXVlbmVzcyBvZiBgZGVsdGFOYW1lYFxuXG5cdFx0XHQvLyBtYWtlIHRoaXMgZGVsdGEgYSBNb2RpZnlEZWx0YSwgc28gcnVuIGl0cyBjb25zdHJ1Y3RvclxuXHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLmFwcGx5KHRoaXMsIG9wdGlvbnMpO1xuXG5cdFx0XHQvLyBjcmVhdGUgZGVsdGEgcHJvcGVydGllc1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0XHRuYW1lOiB7IGdldCgpIHsgcmV0dXJuIGRlbHRhTmFtZSB9IH0sXG5cdFx0XHRcdG1hbnVhbGx5U2VsZWN0YWJsZToge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydtYW51YWxseVNlbGVjdGFibGUnXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICEhb3B0aW9uc1snbWFudWFsbHlTZWxlY3RhYmxlJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pICYmIG9wdGlvbnNbJ3Jlc29sdmVzJ10ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdGVkOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0XHRcdHJldHVybiAhIV9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpZjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zWydpZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2lmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ2lmJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNbJ2lmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1sncmVzb2x2ZXMnXSkgeyAvKiBhcnJheSBvZiBuYW1lcyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogZmFsc2UgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0b25seUlmOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ29ubHlJZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ29ubHlJZiddID09PSBmYWxzZSkgeyAvKiBsaXRlcmFsICd0cnVlJyBvciAnZmFsc2UnICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zWydvbmx5SWYnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1snb25seUlmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1snZXhwZWN0cyddIHx8ICBvcHRpb25zWydyZXNvbHZlcyddKSB7IC8qIGFycmF5IG9mIG5hbWVzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydvbmx5SWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogdHJ1ZSAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFmdGVyOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydhZnRlciddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3JlcXVpcmVzJ10gfHwgW11cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWxlY3RzOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydzZWxlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB1cGRhdGUgY29uZGl0aW9uc1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuaWYpKSB7IF9yZWdpc3RlckRpc2p1bmN0KGRlbHRhTmFtZSwgdGhpcy5pZikgfVxuXHRcdFx0dGhpcy5zZWxlY3RzLmZvckVhY2goKG90aGVyRGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdF9yZWdpc3RlckRpc2p1bmN0KG90aGVyRGVsdGFOYW1lLCBbZGVsdGFOYW1lXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gdXBkYXRlIHRoZSBncmFwaFxuXHRcdFx0X2dyYXBoLmFkZFZlcnRleChkZWx0YU5hbWUsIHRoaXMpO1xuXHRcdFx0dGhpcy5hZnRlci5mb3JFYWNoKChvdGhlckRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRfZ3JhcGguY3JlYXRlRWRnZShvdGhlckRlbHRhTmFtZSwgZGVsdGFOYW1lKTtcblx0XHRcdH0pO1xuXHRcdFx0VS5hc3NlcnQoIV9ncmFwaC5oYXNDeWNsZSgpLFxuXHRcdFx0XHRcdGBUaGUgZGVsdGEgJHtkZWx0YU5hbWV9IGludHJvZHVjZWQgYSBjeWNsZSBpbiB0aGUgYXBwbGljYXRpb24gb3JkZXIuYCk7XG5cblx0XHR9KTtcblxuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gc2VsZWN0IGEgbnVtYmVyIG9mIGRlbHRhcyBieSBuYW1lLCBzbyB0aGV5IHdpbGwgYmUgYXBwbGllZCB3aGVuIGFwcGxpY2FibGVcblx0XHRcdHNlbGVjdCguLi5kZWx0YU5hbWVzKSB7XG5cdFx0XHRcdGRlbHRhTmFtZXMuZm9yRWFjaCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyByZWdpc3RlciBhIG5hbWVkIHZhcmlhdGlvbiBwb2ludCBpbiB0aGUgY29kZS1iYXNlXG5cdFx0XHQvLyAoaS5lLiwgYXBwbHkgYWxsIHJlZ2lzdGVyZWQgZGVsdGFzIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyB2YWx1ZSlcblx0XHRcdHZwKHZwTmFtZSwgdmFsKSB7XG5cblx0XHRcdFx0Ly8gYSB0ZW1wb3Jhcnkgb2JqZWN0IHRvIGhvbGQgdGhlIHZhbHVlIHdoaWxlIGl0IGlzIHVuZGVyZ29pbmcgY2hhbmdlXG5cdFx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdFx0b2JqW3ZwTmFtZV0gPSB2YWw7XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgYW55ICdvbmx5SWYnIGNvbmRpdGlvbnMgYXJlIGJlaW5nIHZpb2xhdGVkXG5cdFx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFUuYXNzZXJ0KCFkZWx0YS5zZWxlY3RlZCB8fCBkZWx0YS5vbmx5SWYgPT09IHRydWUgfHwgZGVsdGEub25seUlmLmV2ZXJ5KChkKSA9PiBfZ3JhcGgudmVydGV4VmFsdWUoZCkuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdvbmx5SWYnIGNvbmRpdGlvbiBvZiBkZWx0YSAnJHtkZWx0YS5uYW1lfScgd2FzIHZpb2xhdGVkLmApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBhcHBseSB0aGUgcHJvcGVyIGRlbHRhc1xuXHRcdFx0XHRfZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRpZiAoZGVsdGEuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLnNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHZwTmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyByZXR1cm4gdGhlIHRyYW5zZm9ybWVkIHZhbHVlXG5cdFx0XHRcdHJldHVybiBvYmpbdnBOYW1lXTtcblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHR2YXIgcmVzb2x2ZVByb21pc2UgPSBudWxsO1xuXHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0VS5leHRlbmQoRGVsdGFNb2RlbCwge1xuXHRcdHJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKHByb21pc2VSZXNvbHZlckZuKSB7XG5cdFx0XHRyZXNvbHZlUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlckZuO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdC8vIHJldHVybiB0aGUgbWFpbiBkZWx0YSBtb2RlbCBjbGFzc1xuXHRyZXR1cm4gRGVsdGFNb2RlbDtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi91dGlsL2RlbHRhLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNpcmN1aXRib2FyZC5qcyJ9