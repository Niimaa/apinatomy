define(['jquery', 'js-graph', 'jquery-ui'], function ($, JsGraph) {

	function signalHandlerMixin() {
		var _callbacks = {};

		function _callback(signal) {
			if (!_callbacks[signal]) {
				_callbacks[signal] = $.Callbacks();
			}
			return _callbacks[signal];
		}

		$.extend(this, {
			on(signal, fn) { _callback(signal).add(fn) },
			off(signal, fn) { _callback(signal).remove(fn) },
			one(signal, fn) {
				var paddedFn = ()=> {
					fn.apply(null, arguments);
					this.off(signal, paddedFn);
				};
				this.on(signal, paddedFn);
			},
			trigger(signal, ...args) {
				var callbacks = _callbacks[signal];
				if (callbacks) { callbacks.fire.apply(callbacks, args) }
			}
		});
		//noinspection JSUnusedGlobalSymbols
		this.once = this.one;
	}

	$.extend({
		amyWidget(name, options, constructor) {

			////////////////////////////
			//// supporting plugins ////
			////////////////////////////

			var _plugins = new JsGraph();
			var _pluginResults = {};
			$[name] = {
				plugin(name, after, fn) {
					//// allow for missing parameters
					if (typeof name === 'function') {
						fn = name;
						name = fn.name;
						after = fn.after || [];
					} else if (typeof after === 'function') {
						fn = after;
						if ($.isArray(name)) {
							after = name;
							name = fn.name;
						} else {
							after = fn.after || [];
						}
					}

					//// sanity checks
					if (typeof name !== 'string' || name === '') {
						throw Error("The given ApiNATOMY plugin does not have a name.");
					}
					if (!$.isArray(after)) {
						throw Error("The given ApiNATOMY plugin has an 'after' clause that is not an array.");
					}

					//// register the plugin
					_plugins.addVertex(name, fn);
					$.each(after, (i, v) => {
						_plugins.ensureVertex(v, ()=>{});
						_plugins.addEdge(v, name);
					});

					//// checking for a cycle
					try {
						_plugins.topologically(()=>{});
					} catch (cycleError) {
						throw new Error("The plugin application order has a cycle: " + cycleError.cycle);
					}
				}
			};
			function applyPlugins(obj) {
				constructor.call(obj, _pluginResults.core);
				$.extend(obj, _pluginResults.core);
				_plugins.topologically((name, fn) => {
					fn.call(obj, _pluginResults[name], _pluginResults);
					$.extend(obj, _pluginResults[name]);
				});
			}

			/////////////////////////////
			//// defining the widget ////
			/////////////////////////////

			$.widget(`apinatomy.${name}`, {
				options: options,
				_create() {
					//// enable signal handling
					signalHandlerMixin.call(this);

					//// make the model available in the object itself
					Object.defineProperty(this, 'model', {
						get() { return this.options.model }
					});

					//// set the element class
					this.element.addClass(this.options.cssClass);
					this.one('destroy', function () {
						this.element.removeClass(this.options.cssClass);
					});

					//// call the main constructor and the plugins
					applyPlugins(this);
				},
				_destroy() { this.trigger("destroy") }
			});
		}
	});

});
