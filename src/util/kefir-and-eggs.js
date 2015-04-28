'use strict';

define(['jquery', './misc.js', 'kefir', 'tweenjs', 'kefir-jquery'], function ($, U, Kefir, TWEEN, KefirJQuery) {

	/* Kefir jQuery plugin ********************************************************************************************/

	KefirJQuery.init(Kefir, $);


	/* EventStream generators *****************************************************************************************/

	// This method works with events that can have only one subscriber,
	// that can be un-subscribed by setting the subscriber to `null`.
	// This function is memoized, so only one subscription is taken,
	// and the same stream for it returned for each request.
	Kefir.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
		return Kefir.fromBinder((emitter) => {
			obj.on(eventName, emitter.emit);
			return () => { obj.on(eventName, null) };
		});
	});


	var requestAnimationFrameFn =
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			((f) => { window.setTimeout(f, 1000 / 60) });
	Kefir.animationFrames = function animationFrames() {
		return Kefir.fromBinder((emitter) => {

			/* self-calling animation-frame loop */
			var subscribed = true;
			(function iterationFn() {
				requestAnimationFrameFn(() => {
					emitter.emit();
					if (subscribed) { iterationFn() }
				});
			})();

			/* unsubscribe function */
			return () => { subscribed = false };

		});
	};


	Kefir.tween = function tween(objStart, objEnd, {duration, delay, easing}) {

		/* the tween */
		var tw = new TWEEN.Tween(objStart).to(objEnd, duration);

		/* the returned bus */
		var bus = Kefir.bus();

		/* a local function to plug in other streams, keeping track in order to 'end' the bus */
		var addStream = (() => {
			var chainedStreams = 0;
			return (stream) => {
				chainedStreams += 1;
				bus.plug(stream);
				stream.onEnd(() => {
					chainedStreams -= 1;
					if (chainedStreams === 0) { bus.end() }
				});
			};
		})();

		/* main stream */
		addStream(Kefir.fromBinder((emitter) => {
			if (easing) { tw.easing(easing) }
			if (delay)  { tw.delay(delay) }
			tw.onUpdate(function () { emitter.emit(this) });
			tw.onComplete(emitter.end);
		}));

		/* adding tween-specific properties to the returned bus */
		bus.tween = tw;
		bus.start = () => {
			tw.start();
			return bus;
		};
		bus.chain = (other) => {
			addStream(other);
			tw.chain(other.tween);
			return bus;
		};

		/* returning the bus */
		return bus;

	};


	Kefir.keyPress = function keyPress(keyCode) {
		return $(window).asKefirStream('keypress').filter((e) => e.keyCode === keyCode);
	};


	Kefir.once = function once(value) {
		return Kefir.fromBinder((emitter) => {
			emitter.emit(value);
			emitter.end();
		});
		//return Kefir.constant(value); // TODO: replace all 'once' calls with 'constant' calls; then remove 'once'
	};


	Kefir.fromArray = function fromArray(array) {
		return Kefir.fromBinder((emitter) => {
			array.forEach(emitter.emit);
			emitter.end();
		});
	};


	/* EventStream converters *****************************************************************************************/


	// This creates a 'window of opportunity' to limit other streams by.
	// This window is provided by the `pacing` observable. An optional `handler`
	// parameter can be given to do some setup and some breakdown. It is passed a function as an argument
	// that should be called *once* in the place where other streams can do their
	// thing. It returns a function used to wrap other streams. It does not
	// return a stream.
	Kefir.limiter = function limiter(pacing, handler = U.call) {
		var wantedBus = Kefir.bus();
		var open =      Kefir.bus();
		var close =     Kefir.bus();

		/* takes 'this' stream as pacing for a window of opportunity for other streams */
		pacing.filterBy(wantedBus.toProperty(false)).onValue(() => {
			handler(() => {
				open.emit();
				wantedBus.emit(false);
				close.emit();
			});
		});

		/* returns a function to wrap a stream in this wrapper */
		return function (stream, {buffer} = {}) {
			wantedBus.plug(stream.mapTo(true));
			return Kefir.constant(true).take(1).concat(close).flatMapLatest(() => {
				var accumulator = (arr, val) => (buffer ? arr.concat([val]) : [val]);
				return stream.takeUntilBy(open).reduce(accumulator, []).flatMap(Kefir.fromArray);
			});
		};
	};

	// This restricts a given stream to a wrapper stream created with the method above.
	// All its original events are now fired inside the provided window. Set `options.buffer`
	// to `true` if all its events should be buffered and released inside the next window.
	// Otherwise, only the last event is retained.
	Kefir.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
		return wrapper(this, options);
	};


	// This is a cheap version of the limiter defined above. TODO: use the limiter where this is now used
	Kefir.Stream.prototype.holdUntil = function holdUntil(pacing) {
		return Kefir.fromBinder((emitter) => {
			var buffer = [];
			var unsubscribeToThis = this.onValue((value) => {
				buffer.push(value);
			});
			var unsubscribeToPacing = pacing.onValue(() => {
				if (buffer.length > 0) {
					var oldBuffer = buffer;
					buffer = [];
					oldBuffer.forEach(emitter.emit);
				}
			});
			return () => {
				unsubscribeToThis();
				unsubscribeToPacing();
				buffer = null;
			};
		});
	};

	// This filters an observable to only let through values equal to the given value.
	Kefir.Observable.prototype.value = function (value, comparator) {
		comparator = comparator || ((e) => e === value);
		return this.skipDuplicates().filter(comparator);
	};

	// This makes a subscription to an observable that doesn't do anything
	Kefir.Observable.prototype.run = function () {
		var doNothing = ()=>{};
		this.onValue(doNothing);
		return () => { this.offValue(doNothing) };
	};

	// This is a 'smart' .stopPropagation, marking events with a label
	// and skipping those that already have that label.
	Kefir.Stream.prototype.skipPropagation = function (label) {
		return this.filter((event) => {
			return !U.array(event.originalEvent, '_onlyOnceFor')[label];
		}).map((event) => {
			U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
		});
	};

	// Filter events to only certain keys / buttons. Can be a predicate function or single number.
	Kefir.Stream.prototype.which = function (buttonId) {
		var pred = (typeof buttonId === 'function') ? (buttonId) : (b => b === buttonId);
		return this.filter((e) => pred(e.which));
	};


	/* EventStream generators *****************************************************************************************/

	$.fn.mouseDrag = function mouseDrag({threshold} = {}) {
		return $(this).asKefirStream('mousedown').flatMap((mouseDownEvent) => {
			var stream = $(document).asKefirStream('mousemove');
			if (threshold) {
				var crossed = false;
				stream = stream.filter((mouseMoveEvent) => { // TODO: don't use 'filter', but something like 'skipUntil' or 'flatMap'
					if (crossed) { return true }
					var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
					var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
					if (dx * dx + dy * dy > threshold * threshold) { return crossed = true }
					return false;
				});
			}
			return stream
					.takeUntilBy($(document).asKefirStream('mouseup'))
					.map((mouseMoveEvent) => ({ mouseDownEvent, mouseMoveEvent }));
		});
	};

	$.fn.mouseClick = function mouseClick({threshold} = {}) {
		return $(this).asKefirStream('mousedown').flatMap((mouseDownEvent) => {
			var untilStream = $(document).asKefirStream('mousemove');
			if (threshold) {
				var crossed = false;
				untilStream = untilStream.filter((mouseMoveEvent) => {
					if (crossed) { return true }
					var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
					var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
					if (dx * dx + dy * dy > threshold * threshold) { return crossed = true }
					return false;
				});
			}
			return $(document).asKefirStream('mouseup').take(1).takeUntilBy(untilStream);
		});
	};


	$.fn.mouseWheel = function mouseWheel() {
		return $(this).asKefirStream('mousewheel DOMMouseScroll');
	};


	return Kefir;


});
