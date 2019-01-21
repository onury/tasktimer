(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tasktimer", [], factory);
	else if(typeof exports === 'object')
		exports["tasktimer"] = factory();
	else
		root["tasktimer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "lib/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./src/Task.ts":
/*!*********************!*\
  !*** ./src/Task.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(/*! . */ "./src/index.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/**
 *  @private
 */
var DEFAULT_TASK_OPTIONS = Object.freeze({
    enabled: true,
    tickDelay: 0,
    tickInterval: 1,
    totalRuns: null,
    startDate: null,
    stopDate: null,
    immediate: false,
    removeOnCompleted: false,
    callback: null
});
/**
 *  Represents the class that holds the configurations and the callback function
 *  required to run a task.
 *  @class
 */
var Task = /** @class */ (function () {
    /**
     *  Initializes a new instance of `Task` class.
     *  @constructor
     *  @param {ITaskOptions} options Task options.
     */
    function Task(options) {
        this._init(options);
    }
    Object.defineProperty(Task.prototype, "id", {
        // ---------------------------
        // PUBLIC (INSTANCE) MEMBERS
        // ---------------------------
        /**
         *  Gets the unique ID of the task.
         *  @name Task#id
         *  @type {string}
         *  @readonly
         */
        get: function () {
            return this._.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "enabled", {
        /**
         *  Specifies whether this task is currently enabled. This essentially gives
         *  you a manual control over execution. The task will always bypass the
         *  callback while this is set to `false`.
         *  @name Task#enabled
         *  @type {boolean}
         */
        get: function () {
            return this._.enabled;
        },
        set: function (value) {
            this._.enabled = utils_1.utils.getBool(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "tickDelay", {
        /**
         *  Gets or sets the number of ticks to allow before running the task for
         *  the first time.
         *  @name Task#tickDelay
         *  @type {number}
         */
        get: function () {
            return this._.tickDelay;
        },
        set: function (value) {
            this._.tickDelay = utils_1.utils.getNumber(value, 0, DEFAULT_TASK_OPTIONS.tickDelay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "tickInterval", {
        /**
         *  Gets or sets the tick interval that the task should be run on. The unit
         *  is "ticks" (not milliseconds). For instance, if the timer interval is
         *  `1000` milliseconds, and we add a task with `5` tick intervals. The task
         *  will run on every `5` <b>seconds</b>.
         *  @name Task#tickInterval
         *  @type {number}
         */
        get: function () {
            return this._.tickInterval;
        },
        set: function (value) {
            this._.tickInterval = utils_1.utils.getNumber(value, 1, DEFAULT_TASK_OPTIONS.tickInterval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "totalRuns", {
        /**
         *  Gets or sets the total number of times the task should be run. `0` or
         *  `null` means unlimited (until the timer has stopped).
         *  @name Task#totalRuns
         *  @type {number}
         */
        get: function () {
            return this._.totalRuns;
        },
        set: function (value) {
            this._.totalRuns = utils_1.utils.getNumber(value, 0, DEFAULT_TASK_OPTIONS.totalRuns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "immediate", {
        /**
         *  Specifies whether to wrap callback in a `setImmediate()` call before
         *  executing. This can be useful if the task is not doing any I/O or using
         *  any JS timers but synchronously blocking the event loop.
         *  @name Task#immediate
         *  @type {boolean}
         */
        get: function () {
            return this._.immediate;
        },
        set: function (value) {
            this._.immediate = utils_1.utils.getBool(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "currentRuns", {
        /**
         *  Gets the number of times, this task has been run.
         *  @name Task#currentRuns
         *  @type {number}
         *  @readonly
         */
        get: function () {
            return this._.currentRuns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "time", {
        /**
         *  Gets time information for the lifetime of a task.
         *  `#time.started` indicates the first execution time of a task.
         *  `#time.stopped` indicates the last execution time of a task. (`0` if still running.)
         *  `#time.elapsed` indicates the total lifetime of a task.
         *  @name Task#time
         *  @type {ITimeInfo}
         *  @readonly
         */
        get: function () {
            var started = this._.timeOnFirstRun || 0;
            var stopped = this._.timeOnLastRun || 0;
            return Object.freeze({
                started: started,
                stopped: stopped,
                elapsed: stopped - started
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "callback", {
        /**
         *  Gets the callback function to be executed on each run.
         *  @name Task#callback
         *  @type {TaskCallback}
         *  @readonly
         */
        get: function () {
            return this._.callback;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "removeOnCompleted", {
        /**
         *  Gets or sets whether to remove the task (to free up memory) when task
         *  has completed its executions (runs). For this to take affect, the task
         *  should have `totalRuns` and/or `stopDate` configured.
         *  @name Task#removeOnCompleted
         *  @type {boolean}
         */
        get: function () {
            return this._.removeOnCompleted;
        },
        set: function (value) {
            this._.removeOnCompleted = utils_1.utils.getBool(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "completed", {
        /**
         *  Specifies whether the task has completed all runs (executions) or
         *  `stopDate` is reached. Note that if both `totalRuns` and `stopDate` are
         *  omitted, this will never return `true`; since the task has no execution
         *  limit set.
         *  @name Task#completed
         *  @type {boolean}
         *  @readonly
         */
        get: function () {
            // return faster if already completed
            if (this._markedCompleted)
                return true;
            return Boolean((this.totalRuns && this.currentRuns >= this.totalRuns)
                || (this._.stopDate && Date.now() >= this._.stopDate));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "canRunOnTick", {
        /**
         *  Specifies whether the task can run on the current tick of the timer.
         *  @private
         *  @name Task#canRunOnTick
         *  @type {boolean}
         *  @readonly
         */
        get: function () {
            if (this._markedCompleted)
                return false;
            var tickCount = this._.startDate
                ? Math.ceil((Date.now() - Number(this._.startDate)) / this._timer.interval)
                : this._timer.tickCount;
            var timeToRun = !this._.startDate || Date.now() >= this._.startDate;
            var onInterval = tickCount > this.tickDelay && (tickCount - this.tickDelay) % this.tickInterval === 0;
            return Boolean(timeToRun && onInterval);
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  Resets the current number of runs. This will keep the task running for
     *  the same amount of `tickIntervals` initially configured.
     *  @memberof Task
     *  @chainable
     *
     *  @param {ITaskBaseOptions} [options] If set, this will also re-configure the task.
     *
     *  @returns {Task}
     */
    Task.prototype.reset = function (options) {
        this._.currentRuns = 0;
        if (options) {
            var id = options.id;
            if (id && id !== this.id)
                throw new Error('Cannot change ID of a task.');
            options.id = this.id;
            this._init(options);
        }
        return this;
    };
    /**
     *  Serialization to JSON.
     *
     *  Never return string From `toJSON()`. It should return an object.
     *  @private
     */
    Task.prototype.toJSON = function () {
        var obj = __assign({}, this._);
        delete obj.callback;
        return obj;
    };
    // ---------------------------
    // PRIVATE (INSTANCE) MEMBERS
    // ---------------------------
    /**
     *  Set reference to timer itself.
     *  Only called by `TaskTimer`.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    Task.prototype._setTimer = function (timer) {
        this._timer = timer;
    };
    /**
     *  @private
     */
    Task.prototype._emit = function (name, object) {
        var event = {
            name: name,
            source: this
        };
        /* istanbul ignore else */
        if (object instanceof Error) {
            event.error = object;
        }
        else {
            event.data = object;
        }
        this._timer.emit(name, event);
    };
    /**
     *  `TaskTimer` should be informed if this task is completed. But execution
     *  should be finished. So we do this within the `done()` function.
     *  @private
     */
    Task.prototype._done = function () {
        if (this.completed) {
            this._markedCompleted = true;
            this._.timeOnLastRun = Date.now();
            this._timer._taskCompleted(this);
        }
    };
    /**
     *  @private
     */
    Task.prototype._execCallback = function () {
        var _this = this;
        try {
            var o = this.callback.apply(this, [this, function () { return _this._done(); }]);
            if (this.callback.length >= 2) {
                // handled by done() (called within the task callback by the user)
            }
            else if (utils_1.utils.isPromise(o)) {
                o.then(function () {
                    _this._done();
                })
                    .catch(function (err) {
                    _this._emit(_1.TaskTimer.Event.TASK_ERROR, err);
                });
            }
            else {
                this._done();
            }
        }
        catch (err) {
            this._emit(_1.TaskTimer.Event.TASK_ERROR, err);
        }
    };
    /**
     *  Only used by `TaskTimer`.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    Task.prototype._run = function (onRun) {
        var _this = this;
        if (!this.enabled || this._markedCompleted)
            return;
        if (this.currentRuns === 0)
            this._.timeOnFirstRun = Date.now();
        // current runs should be set before execution or it might flow if some
        // async runs finishes faster and some other slower.
        this._.currentRuns++;
        onRun();
        if (this.immediate) {
            utils_1.utils.setImmediate(function () { return _this._execCallback(); });
        }
        else {
            this._execCallback();
        }
    };
    /**
     *  @private
     */
    Task.prototype._init = function (options) {
        if (!options || !options.id) {
            throw new Error('A unique task ID is required.');
        }
        if (typeof options.callback !== 'function') {
            throw new Error('A callback function is required for a task to run.');
        }
        var startDate = options.startDate, stopDate = options.stopDate;
        if (startDate && stopDate && startDate >= stopDate) {
            throw new Error('Task start date cannot be the same or after stop date.');
        }
        this._markedCompleted = false;
        this._ = __assign({ currentRuns: 0 }, DEFAULT_TASK_OPTIONS);
        this._.id = String(options.id);
        this._.callback = options.callback;
        this._.startDate = options.startDate || null;
        this._.stopDate = options.stopDate || null;
        // using setters for validation & default values
        this.enabled = options.enabled;
        this.tickDelay = options.tickDelay;
        this.tickInterval = options.tickInterval;
        this.totalRuns = options.totalRuns;
        this.immediate = options.immediate;
        this.removeOnCompleted = options.removeOnCompleted;
    };
    return Task;
}());
exports.Task = Task;


/***/ }),

/***/ "./src/TaskTimer.ts":
/*!**************************!*\
  !*** ./src/TaskTimer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:max-file-line-count */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// dep modules
var eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
// own modules
var _1 = __webpack_require__(/*! . */ "./src/index.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/**
 *  @private
 */
var DEFAULT_TIMER_OPTIONS = Object.freeze({
    interval: 1000,
    precision: true,
    stopOnCompleted: false
});
/**
 *  TaskTimer • https://github.com/onury/tasktimer
 *  @license MIT
 *  @copyright 2019, Onur Yıldırım <onur@cutepilot.com>
 */
// ---------------------------
// EventEmitter Docs
// ---------------------------
/**
 *  Calls each of the listeners registered for a given event name.
 *  @name TaskTimer#emit
 *  @function
 *
 *  @param {TaskTimer.Event} eventName - The name of the event to be emitted.
 *  @param {any} [data] - Data to be passed to event listeners.
 *
 *  @returns {Boolean} - `true` if the event had listeners, else `false`.
 */
/**
 *  Return an array listing the events for which the emitter has registered
 *  listeners.
 *  @name TaskTimer#eventNames
 *  @function
 *
 *  @returns {Array} -
 */
/**
 *  Adds the listener function to the end of the listeners array for the event
 *  named `eventName`. No checks are made to see if the listener has already
 *  been added. Multiple calls passing the same combination of `eventName` and
 *  `listener` will result in the listener being added, and called, multiple
 *  times.
 *  @name TaskTimer#on
 *  @function
 *  @chainable
 *
 *  @param {TaskTimer.Event} eventName - The name of the event to be added.
 *  @param {Function} listener - The callback function to be invoked per event.
 *  @param {*} [context=this] - The context to invoke the listener with.
 *
 *  @returns {TaskTimer} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  Adds a one time listener function for the event named `eventName`. The next
 *  time `eventName` is triggered, this `listener` is removed and then invoked.
 *  @name TaskTimer#once
 *  @function
 *  @chainable
 *
 *  @param {TaskTimer.Event} eventName - The name of the event to be added.
 *  @param {Function} listener - The callback function to be invoked per event.
 *  @param {*} [context=this] - The context to invoke the listener with.
 *
 *  @returns {TaskTimer} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  Removes the specified `listener` from the listener array for the event
 *  named `eventName`.
 *  @name TaskTimer#off
 *  @function
 *  @alias TaskTimer#removeListener
 *  @chainable
 *
 *  @param {TaskTimer.Event} eventName - The name of the event to be removed.
 *  @param {Function} listener - The callback function to be invoked per event.
 *  @param {*} [context=this] - Only remove the listeners that have this context.
 *  @param {Boolean} [once=false] - Only remove one-time listeners.
 *
 *  @returns {TaskTimer} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  Gets the number of listeners listening to a given event.
 *  @name TaskTimer#listenerCount
 *  @function
 *
 *  @param {TaskTimer.Event} eventName - The name of the event.
 *
 *  @returns {Number} - The number of listeners.
 */
/**
 *  Gets the listeners registered for a given event.
 *  @name TaskTimer#listeners
 *  @function
 *
 *  @param {TaskTimer.Event} eventName - The name of the event.
 *
 *  @returns {Array} - The registered listeners.
 */
/**
 *  Removes all listeners, or those of the specified `eventName`.
 *  @name TaskTimer#removeAllListeners
 *  @function
 *  @chainable
 *
 *  @param {TaskTimer.Event} [eventName] - The name of the event to be removed.
 *
 *  @returns {TaskTimer} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  A timer utility for running periodic tasks on the given interval ticks.
 *  This is useful when you want to run or schedule multiple tasks on a single
 *  timer instance.
 *
 *  This class extends `EventEmitter3` which is an `EventEmitter` implementation
 *  for both Node and browser. Only a small set of its methods are documented in
 *  this documentation. For a complete list, refer to Node.js documentation.
 *  @class
 *  @global
 *
 *  @extends EventEmitter
 *
 *  @see {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}
 */
var TaskTimer = /** @class */ (function (_super) {
    __extends(TaskTimer, _super);
    // ---------------------------
    // CONSTRUCTOR
    // ---------------------------
    /**
     *  Constructs a new `TaskTimer` instance with the given time interval (in
     *  milliseconds).
     *  @constructor
     *
     *  @param {ITaskTimerOptions|number} [options] - Either TaskTimer options
     *  or a base interval (in milliseconds). Since the tasks run on ticks
     *  instead of millisecond intervals; this value operates as the base
     *  resolution for all tasks. If you are running heavy tasks, lower interval
     *  requires higher CPU power. This value can be updated any time by setting
     *  the `interval` property on the instance.
     *
     *  @example
     *  const timer = new TaskTimer(1000); // milliseconds
     *  // Execute some code on each tick...
     *  timer.on('tick', () => {
     *      console.log('tick count: ' + timer.tickCount);
     *      console.log('elapsed time: ' + timer.time.elapsed + ' ms.');
     *  });
     *  // Or add a task named 'heartbeat' that runs every 5 ticks and a total of 10 times.
     *  const task = {
     *      id: 'heartbeat',
     *      tickInterval: 5, // ticks
     *      totalRuns: 10,   // times
     *      callback: function (task) {
     *          console.log(task.id + ' task has run ' + task.currentRuns + ' times.');
     *      }
     *  };
     *  timer.addTask(task).start();
     */
    function TaskTimer(options) {
        var _this = _super.call(this) || this;
        _this._timeoutRef = null;
        _this._immediateRef = null;
        _this._runCount = 0;
        _this._reset();
        _this._.opts = {};
        var opts = typeof options === 'number'
            ? { interval: options }
            : options || {};
        _this.interval = opts.interval;
        _this.precision = opts.precision;
        _this.stopOnCompleted = opts.stopOnCompleted;
        return _this;
    }
    Object.defineProperty(TaskTimer.prototype, "interval", {
        // ---------------------------
        // PUBLIC (INSTANCE) PROPERTIES
        // ---------------------------
        /**
         *  Gets or sets the timer interval in milliseconds.
         *
         *  Since the tasks run on ticks instead of millisecond intervals; this
         *  value operates as the base resolution for all tasks. If you are running
         *  heavy tasks; lower interval requires higher CPU power.
         *  @name TaskTimer#interval
         *  @type {number}
         */
        get: function () {
            return this._.opts.interval;
        },
        set: function (value) {
            this._.opts.interval = utils_1.utils.getNumber(value, 20, DEFAULT_TIMER_OPTIONS.interval);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "precision", {
        /**
         *  Gets or sets whether the timer should auto-adjust the delay between
         *  ticks if it's off due to task load. Note that precision will be as high
         *  as possible but it still can be off by a few milliseconds; depending on
         *  the CPU or the load.
         *  @name TaskTimer#precision
         *  @type {boolean}
         */
        get: function () {
            return this._.opts.precision;
        },
        set: function (value) {
            this._.opts.precision = utils_1.utils.getBool(value, DEFAULT_TIMER_OPTIONS.precision);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "stopOnCompleted", {
        /**
         *  Gets or sets whether the timer should automatically stop when all tasks
         *  are completed. For this to take affect, all added tasks should have
         *  `totalRuns` and/or `stopDate` configured. This option can be set/changed
         *  at any time.
         *  @name TaskTimer#stopOnCompleted
         *  @type {boolean}
         */
        get: function () {
            return this._.opts.stopOnCompleted;
        },
        set: function (value) {
            this._.opts.stopOnCompleted = utils_1.utils.getBool(value, DEFAULT_TIMER_OPTIONS.stopOnCompleted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "state", {
        /**
         *  Gets the current state of the timer.
         *  For possible values, see `TaskTimer.State` enumeration.
         *  @name TaskTimer#state
         *  @type {TaskTimer.State}
         *  @readonly
         */
        get: function () {
            return this._.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "time", {
        /**
         *  Gets time information for the latest run of the timer.
         *  `#time.started` indicates the start time of the timer.
         *  `#time.stopped` indicates the stop time of the timer. (`0` if still running.)
         *  `#time.elapsed` indicates the elapsed time of the timer.
         *  @name TaskTimer#time
         *  @type {ITimeInfo}
         *  @readonly
         */
        get: function () {
            var current = this.state !== TaskTimer.State.STOPPED ? Date.now() : this._.stopTime;
            return Object.freeze({
                started: this._.startTime,
                stopped: this._.stopTime,
                elapsed: current - this._.startTime
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "tickCount", {
        /**
         *  Gets the current tick count for the latest run of the timer.
         *  This value will be reset to `0` when the timer is stopped or reset.
         *  @name TaskTimer#tickCount
         *  @type {Number}
         *  @readonly
         */
        get: function () {
            return this._.tickCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "taskCount", {
        /**
         *  Gets the current task count. Tasks remain even after the timer is
         *  stopped. But they will be removed if the timer is reset.
         *  @name TaskTimer#taskCount
         *  @type {Number}
         *  @readonly
         */
        get: function () {
            return Object.keys(this._.tasks).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "taskRunCount", {
        /**
         *  Gets the total number of all task executions (runs).
         *  @name TaskTimer#taskRunCount
         *  @type {Number}
         *  @readonly
         */
        get: function () {
            return this._.taskRunCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskTimer.prototype, "runCount", {
        /**
         *  Gets the total number of timer runs, including resumed runs.
         *  @name TaskTimer#runCount
         *  @type {Number}
         *  @readonly
         */
        get: function () {
            return this._runCount;
        },
        enumerable: true,
        configurable: true
    });
    // ---------------------------
    // PUBLIC (INSTANCE) METHODS
    // ---------------------------
    /**
     *  Gets the task with the given ID.
     *  @memberof TaskTimer
     *
     *  @param {String} id - ID of the task.
     *
     *  @returns {Task}
     */
    TaskTimer.prototype.get = function (id) {
        return this._.tasks[id] || null;
    };
    /**
     *  Adds a collection of new tasks for the timer.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @param {Task|ITaskOptions|TaskCallback|Array<any>} task - Either a
     *  single task, task options object or the callback function; or a mixture
     *  of these as an array.
     *
     *  @returns {TaskTimer}
     *
     *  @throws {Error} - If a task callback is not set or a task with the given
     *  name already exists.
     */
    TaskTimer.prototype.add = function (task) {
        var _this = this;
        if (!utils_1.utils.isset(task)) {
            throw new Error('Either a task, task options or a callback is required.');
        }
        utils_1.utils.ensureArray(task).forEach(function (item) { return _this._add(item); });
        return this;
    };
    /**
     *  Removes the task by the given name.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @param {string|Task} task - Task to be removed. Either pass the
     *  name or the task itself.
     *
     *  @returns {TaskTimer}
     *
     *  @throws {Error} - If a task with the given name does not exist.
     */
    TaskTimer.prototype.remove = function (task) {
        var id = typeof task === 'string' ? task : task.id;
        task = this.get(id);
        if (!id || !task) {
            throw new Error("No tasks exist with ID: '" + id + "'.");
        }
        // first decrement completed tasks count if this is a completed task.
        if (task.completed && this._.completedTaskCount > 0)
            this._.completedTaskCount--;
        this._.tasks[id] = null;
        delete this._.tasks[id];
        this._emit(TaskTimer.Event.TASK_REMOVED, task);
        return this;
    };
    /**
     *  Starts the timer and puts the timer in `RUNNING` state. If it's already
     *  running, this will reset the start/stop time and tick count, but will not
     *  reset (or remove) existing tasks.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @returns {TaskTimer}
     */
    TaskTimer.prototype.start = function () {
        this._stop();
        this._.state = TaskTimer.State.RUNNING;
        this._runCount++;
        this._.tickCount = 0;
        this._.taskRunCount = 0;
        this._.stopTime = 0;
        this._markTime();
        this._.startTime = Date.now();
        this._emit(TaskTimer.Event.STARTED);
        this._run();
        return this;
    };
    /**
     *  Pauses the timer, puts the timer in `PAUSED` state and all tasks on hold.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @returns {TaskTimer}
     */
    TaskTimer.prototype.pause = function () {
        if (this.state !== TaskTimer.State.RUNNING)
            return this;
        this._stop();
        this._.state = TaskTimer.State.PAUSED;
        this._emit(TaskTimer.Event.PAUSED);
        return this;
    };
    /**
     *  Resumes the timer and puts the timer in `RUNNING` state; if previuosly
     *  paused. In this state, all existing tasks are resumed.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @returns {TaskTimer}
     */
    TaskTimer.prototype.resume = function () {
        if (this.state === TaskTimer.State.IDLE) {
            this.start();
            return this;
        }
        if (this.state !== TaskTimer.State.PAUSED)
            return this;
        this._runCount++;
        this._markTime();
        this._.state = TaskTimer.State.RUNNING;
        this._emit(TaskTimer.Event.RESUMED);
        this._run();
        return this;
    };
    /**
     *  Stops the timer and puts the timer in `STOPPED` state. In this state, all
     *  existing tasks are stopped and no values or tasks are reset until
     *  re-started or explicitly calling reset.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @returns {TaskTimer}
     */
    TaskTimer.prototype.stop = function () {
        if (this.state !== TaskTimer.State.RUNNING)
            return this;
        this._stop();
        this._.stopTime = Date.now();
        this._.state = TaskTimer.State.STOPPED;
        this._emit(TaskTimer.Event.STOPPED);
        return this;
    };
    /**
     *  Stops the timer and puts the timer in `IDLE` state.
     *  This will reset the ticks and removes all tasks silently; meaning no
     *  other events will be emitted such as `"taskRemoved"`.
     *  @memberof TaskTimer
     *  @chainable
     *
     *  @returns {TaskTimer}
     */
    TaskTimer.prototype.reset = function () {
        this._reset();
        this._emit(TaskTimer.Event.RESET);
        return this;
    };
    // ---------------------------
    // PRIVATE (INSTANCE) METHODS
    // ---------------------------
    /**
     *  @private
     */
    TaskTimer.prototype._emit = function (type, data) {
        var event = {
            name: type,
            source: this,
            data: data
        };
        return this.emit(type, event);
    };
    /**
     *  Adds a new task for the timer.
     *  @private
     *
     *  @param {Task|ITaskOptions|TaskCallback} options - Either a task instance,
     *  task options object or the callback function to be executed on tick
     *  intervals.
     *
     *  @returns {TaskTimer}
     *
     *  @throws {Error} - If the task callback is not set or a task with the
     *  given name already exists.
     */
    TaskTimer.prototype._add = function (options) {
        if (typeof options === 'function') {
            options = {
                callback: options
            };
        }
        if (utils_1.utils.type(options) === 'object' && !options.id) {
            options.id = this._getUniqueTaskID();
        }
        if (this.get(options.id)) {
            throw new Error("A task with id '" + options.id + "' already exists.");
        }
        var task = options instanceof _1.Task ? options : new _1.Task(options);
        task._setTimer(this);
        this._.tasks[task.id] = task;
        this._emit(TaskTimer.Event.TASK_ADDED, task);
        return this;
    };
    /**
     *  Stops the timer.
     *  @private
     */
    TaskTimer.prototype._stop = function () {
        this._.tickCountAfterResume = 0;
        if (this._timeoutRef) {
            clearTimeout(this._timeoutRef);
            this._timeoutRef = null;
        }
        if (this._immediateRef) {
            utils_1.utils.clearImmediate(this._immediateRef);
            this._immediateRef = null;
        }
    };
    /**
     *  Resets the timer.
     *  @private
     */
    TaskTimer.prototype._reset = function () {
        this._ = {
            opts: (this._ || {}).opts,
            state: TaskTimer.State.IDLE,
            tasks: {},
            tickCount: 0,
            taskRunCount: 0,
            startTime: 0,
            stopTime: 0,
            completedTaskCount: 0,
            resumeTime: 0,
            hrResumeTime: null,
            tickCountAfterResume: 0
        };
        this._stop();
    };
    /**
     *  Called (by Task instance) when it has completed all of its runs.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    TaskTimer.prototype._taskCompleted = function (task) {
        this._.completedTaskCount++;
        this._emit(TaskTimer.Event.TASK_COMPLETED, task);
        if (this._.completedTaskCount === this.taskCount) {
            this._emit(TaskTimer.Event.COMPLETED);
            if (this.stopOnCompleted)
                this.stop();
        }
        if (task.removeOnCompleted)
            this.remove(task);
    };
    /**
     *  Handler to be executed on each tick.
     *  @private
     */
    TaskTimer.prototype._tick = function () {
        var _this = this;
        this._.state = TaskTimer.State.RUNNING;
        var id;
        var task;
        var tasks = this._.tasks;
        this._.tickCount++;
        this._.tickCountAfterResume++;
        this._emit(TaskTimer.Event.TICK);
        // tslint:disable:forin
        for (id in tasks) {
            task = tasks[id];
            if (!task || !task.canRunOnTick)
                continue;
            // below will not execute if task is disabled or already
            // completed.
            task._run(function () {
                _this._.taskRunCount++;
                _this._emit(TaskTimer.Event.TASK, task);
            });
        }
        this._run();
    };
    /**
     *  Marks the resume (or start) time in milliseconds or high-resolution time
     *  if available.
     *  @private
     */
    TaskTimer.prototype._markTime = function () {
        /* istanbul ignore if */
        if (utils_1.utils.BROWSER) { // tested separately
            this._.resumeTime = Date.now();
        }
        else {
            this._.hrResumeTime = process.hrtime();
        }
    };
    /**
     *  Gets the time difference in milliseconds sinct the last resume or start
     *  time.
     *  @private
     */
    TaskTimer.prototype._getTimeDiff = function () {
        // Date.now() is ~2x faster than Date#getTime()
        /* istanbul ignore if */
        if (utils_1.utils.BROWSER)
            return Date.now() - this._.resumeTime; // tested separately
        var hrDiff = process.hrtime(this._.hrResumeTime);
        return Math.ceil((hrDiff[0] * 1000) + (hrDiff[1] / 1e6));
    };
    /**
     *  Runs the timer.
     *  @private
     */
    TaskTimer.prototype._run = function () {
        var _this = this;
        if (this.state !== TaskTimer.State.RUNNING)
            return;
        var interval = this.interval;
        // we'll get a precise interval by checking if our clock is already
        // drifted.
        if (this.precision) {
            var diff = this._getTimeDiff();
            // did we reach this expected tick count for the given time period?
            // calculated count should not be greater than tickCountAfterResume
            if (Math.floor(diff / interval) > this._.tickCountAfterResume) {
                // if we're really late, run immediately!
                this._immediateRef = utils_1.utils.setImmediate(function () { return _this._tick(); });
                return;
            }
            // if we still have time but a bit off, update next interval.
            interval = interval - (diff % interval);
        }
        this._timeoutRef = setTimeout(function () { return _this._tick(); }, interval);
    };
    /**
     *  Gets a unique task ID.
     *  @private
     */
    TaskTimer.prototype._getUniqueTaskID = function () {
        var num = this.taskCount;
        var id;
        while (!id || this.get(id)) {
            num++;
            id = 'task' + num;
        }
        return id;
    };
    return TaskTimer;
}(eventemitter3_1.EventEmitter));
exports.TaskTimer = TaskTimer;
// ---------------------------
// NAMESPACE
// ---------------------------
// tslint:disable:no-namespace
/* istanbul ignore next */
/** @private */
(function (TaskTimer) {
    /**
     *  Represents the class that holds the configurations and the callback function
     *  required to run a task.
     *  @name TaskTimer.Task
     *  @class
     */
    TaskTimer.Task = _1.Task;
    /**
     *  Enumerates `TaskTimer` states.
     *  @memberof TaskTimer
     *  @enum {String}
     *  @readonly
     */
    var State;
    (function (State) {
        /**
         *  Indicates that the timer is in `idle` state.
         *  This is the initial state when the `TaskTimer` instance is first created.
         *  Also when an existing timer is reset, it will be `idle`.
         *  @type {String}
         */
        State["IDLE"] = "idle";
        /**
         *  Indicates that the timer is in `running` state; such as when the timer is
         *  started or resumed.
         *  @type {String}
         */
        State["RUNNING"] = "running";
        /**
         *  Indicates that the timer is in `paused` state.
         *  @type {String}
         */
        State["PAUSED"] = "paused";
        /**
         *  Indicates that the timer is in `stopped` state.
         *  @type {String}
         */
        State["STOPPED"] = "stopped";
    })(State = TaskTimer.State || (TaskTimer.State = {}));
    /**
     *  Enumerates the `TaskTimer` event types.
     *  @memberof TaskTimer
     *  @enum {String}
     *  @readonly
     */
    var Event;
    (function (Event) {
        /**
         *  Emitted on each tick (interval) of `TaskTimer`.
         *  @type {String}
         */
        Event["TICK"] = "tick";
        /**
         *  Emitted when the timer is put in `RUNNING` state; such as when the timer is
         *  started.
         *  @type {String}
         */
        Event["STARTED"] = "started";
        /**
         *  Emitted when the timer is put in `RUNNING` state; such as when the timer is
         *  resumed.
         *  @type {String}
         */
        Event["RESUMED"] = "resumed";
        /**
         *  Emitted when the timer is put in `PAUSED` state.
         *  @type {String}
         */
        Event["PAUSED"] = "paused";
        /**
         *  Emitted when the timer is put in `STOPPED` state.
         *  @type {String}
         */
        Event["STOPPED"] = "stopped";
        /**
         *  Emitted when the timer is reset.
         *  @type {String}
         */
        Event["RESET"] = "reset";
        /**
         *  Emitted when a task is executed.
         *  @type {String}
         */
        Event["TASK"] = "task";
        /**
         *  Emitted when a task is added to `TaskTimer` instance.
         *  @type {String}
         */
        Event["TASK_ADDED"] = "taskAdded";
        /**
         *  Emitted when a task is removed from `TaskTimer` instance.
         *  Note that this will not be emitted when `.reset()` is called; which
         *  removes all tasks silently.
         *  @type {String}
         */
        Event["TASK_REMOVED"] = "taskRemoved";
        /**
         *  Emitted when a task has completed all of its executions (runs)
         *  or reached its stopping date/time (if set). Note that this event
         *  will only be fired if the tasks has a `totalRuns` limit or a
         *  `stopDate` value set.
         *  @type {String}
         */
        Event["TASK_COMPLETED"] = "taskCompleted";
        /**
         *  Emitted when a task produces an error on its execution.
         *  @type {String}
         */
        Event["TASK_ERROR"] = "taskError";
        /**
         *  Emitted when all tasks have completed all of their executions (runs)
         *  or reached their stopping date/time (if set). Note that this event
         *  will only be fired if all tasks have a `totalRuns` limit or a
         *  `stopDate` value set.
         *  @type {String}
         */
        Event["COMPLETED"] = "completed";
    })(Event = TaskTimer.Event || (TaskTimer.Event = {}));
})(TaskTimer || (TaskTimer = {}));
exports.TaskTimer = TaskTimer;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Task */ "./src/Task.ts"));
__export(__webpack_require__(/*! ./TaskTimer */ "./src/TaskTimer.ts"));


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var proto = Object.prototype;
var NODE = typeof setImmediate === 'function'
    && typeof process === 'object'
    && typeof process.hrtime === 'function';
var BROWSER = !NODE;
/** @private */
var utils = {
    NODE: NODE,
    BROWSER: BROWSER,
    type: function (o) {
        return proto.toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
    },
    isset: function (o) {
        return o !== null && o !== undefined;
    },
    ensureArray: function (o) {
        return utils.isset(o)
            ? !Array.isArray(o) ? [o] : o
            : [];
    },
    getNumber: function (value, minimum, defaultValue) {
        return typeof value === 'number'
            ? (value < minimum ? minimum : value)
            : defaultValue;
    },
    getBool: function (value, defaultValue) {
        return typeof value !== 'boolean'
            ? defaultValue
            : value;
    },
    setImmediate: function (cb) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        /* istanbul ignore if */
        if (utils.BROWSER) { // tested separately
            return setTimeout(cb.apply(null, args), 0);
        }
        return setImmediate.apply(void 0, [cb].concat(args));
    },
    clearImmediate: function (id) {
        /* istanbul ignore next */
        if (!id)
            return;
        /* istanbul ignore if */
        if (utils.BROWSER)
            return clearTimeout(id); // tested separately
        clearImmediate(id);
    },
    /**
     *  Checks whether the given value is a promise.
     *  @private
     *  @param {any} value - Value to be checked.
     *  @return {boolean}
     */
    isPromise: function (value) {
        return value
            && utils.type(value) === 'promise'
            && typeof value.then === 'function';
    }
};
exports.utils = utils;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrdGltZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Rhc2t0aW1lci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvVGFzay50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvVGFza1RpbWVyLnRzIiwid2VicGFjazovL3Rhc2t0aW1lci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7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LFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FB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O0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtCQUErQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLElBQUk7QUFDcEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGFza3RpbWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0YXNrdGltZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGFza3RpbWVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRhc2t0aW1lclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwibGliL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBwcmVmaXggPSAnfic7XG5cbi8qKlxuICogQ29uc3RydWN0b3IgdG8gY3JlYXRlIGEgc3RvcmFnZSBmb3Igb3VyIGBFRWAgb2JqZWN0cy5cbiAqIEFuIGBFdmVudHNgIGluc3RhbmNlIGlzIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRXZlbnRzKCkge31cblxuLy9cbi8vIFdlIHRyeSB0byBub3QgaW5oZXJpdCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC4gSW4gc29tZSBlbmdpbmVzIGNyZWF0aW5nIGFuXG4vLyBpbnN0YW5jZSBpbiB0aGlzIHdheSBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIGBPYmplY3QuY3JlYXRlKG51bGwpYCBkaXJlY3RseS5cbi8vIElmIGBPYmplY3QuY3JlYXRlKG51bGwpYCBpcyBub3Qgc3VwcG9ydGVkIHdlIHByZWZpeCB0aGUgZXZlbnQgbmFtZXMgd2l0aCBhXG4vLyBjaGFyYWN0ZXIgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGJ1aWx0LWluIG9iamVjdCBwcm9wZXJ0aWVzIGFyZSBub3Rcbi8vIG92ZXJyaWRkZW4gb3IgdXNlZCBhcyBhbiBhdHRhY2sgdmVjdG9yLlxuLy9cbmlmIChPYmplY3QuY3JlYXRlKSB7XG4gIEV2ZW50cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vXG4gIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgYF9fcHJvdG9fX2AgcHJvcGVydHkgaXMgc3RpbGwgaW5oZXJpdGVkIGluXG4gIC8vIHNvbWUgb2xkIGJyb3dzZXJzIGxpa2UgQW5kcm9pZCA0LCBpUGhvbmUgNS4xLCBPcGVyYSAxMSBhbmQgU2FmYXJpIDUuXG4gIC8vXG4gIGlmICghbmV3IEV2ZW50cygpLl9fcHJvdG9fXykgcHJlZml4ID0gZmFsc2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29uY2U9ZmFsc2VdIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IGVtaXR0ZXIsIG9uY2UpXG4gICAgLCBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0pIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gbGlzdGVuZXIsIGVtaXR0ZXIuX2V2ZW50c0NvdW50Kys7XG4gIGVsc2UgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XS5mbikgZW1pdHRlci5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2UgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBbZW1pdHRlci5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXTtcblxuICByZXR1cm4gZW1pdHRlcjtcbn1cblxuLyoqXG4gKiBDbGVhciBldmVudCBieSBuYW1lLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZ0IFRoZSBFdmVudCBuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2xlYXJFdmVudChlbWl0dGVyLCBldnQpIHtcbiAgaWYgKC0tZW1pdHRlci5fZXZlbnRzQ291bnQgPT09IDApIGVtaXR0ZXIuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgZWxzZSBkZWxldGUgZW1pdHRlci5fZXZlbnRzW2V2dF07XG59XG5cbi8qKlxuICogTWluaW1hbCBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkXG4gKiBsaXN0ZW5lcnMuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICB2YXIgbmFtZXMgPSBbXVxuICAgICwgZXZlbnRzXG4gICAgLCBuYW1lO1xuXG4gIGlmICh0aGlzLl9ldmVudHNDb3VudCA9PT0gMCkgcmV0dXJuIG5hbWVzO1xuXG4gIGZvciAobmFtZSBpbiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzKSkge1xuICAgIGlmIChoYXMuY2FsbChldmVudHMsIG5hbWUpKSBuYW1lcy5wdXNoKHByZWZpeCA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lKTtcbiAgfVxuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcmV0dXJuIG5hbWVzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGV2ZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWhhbmRsZXJzKSByZXR1cm4gW107XG4gIGlmIChoYW5kbGVycy5mbikgcmV0dXJuIFtoYW5kbGVycy5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBoYW5kbGVycy5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSBoYW5kbGVyc1tpXS5mbjtcbiAgfVxuXG4gIHJldHVybiBlZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGxpc3RlbmluZyB0byBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbiBsaXN0ZW5lckNvdW50KGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIDA7XG4gIGlmIChsaXN0ZW5lcnMuZm4pIHJldHVybiAxO1xuICByZXR1cm4gbGlzdGVuZXJzLmxlbmd0aDtcbn07XG5cbi8qKlxuICogQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycywgZWxzZSBgZmFsc2VgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgYXJnc1xuICAgICwgaTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExKSwgdHJ1ZTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm4uYXBwbHkobGlzdGVuZXJzLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAsIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgICBjYXNlIDE6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIsIGEzKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiBBZGQgYSBvbmUtdGltZSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbGlzdGVuZXJzIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IG1hdGNoIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IGhhdmUgdGhpcyBjb250ZXh0LlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uZS10aW1lIGxpc3RlbmVycy5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gdGhpcztcbiAgaWYgKCFmbikge1xuICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKFxuICAgICAgbGlzdGVuZXJzLmZuID09PSBmbiAmJlxuICAgICAgKCFvbmNlIHx8IGxpc3RlbmVycy5vbmNlKSAmJlxuICAgICAgKCFjb250ZXh0IHx8IGxpc3RlbmVycy5jb250ZXh0ID09PSBjb250ZXh0KVxuICAgICkge1xuICAgICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgZXZlbnRzID0gW10sIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBsaXN0ZW5lcnNbaV0uZm4gIT09IGZuIHx8XG4gICAgICAgIChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSkgfHxcbiAgICAgICAgKGNvbnRleHQgJiYgbGlzdGVuZXJzW2ldLmNvbnRleHQgIT09IGNvbnRleHQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgICAvL1xuICAgIGlmIChldmVudHMubGVuZ3RoKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gICAgZWxzZSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMsIG9yIHRob3NlIG9mIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IFtldmVudF0gVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQ7XG5cbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcbiAgICBpZiAodGhpcy5fZXZlbnRzW2V2dF0pIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgcHJlZml4LlxuLy9cbkV2ZW50RW1pdHRlci5wcmVmaXhlZCA9IHByZWZpeDtcblxuLy9cbi8vIEFsbG93IGBFdmVudEVtaXR0ZXJgIHRvIGJlIGltcG9ydGVkIGFzIG1vZHVsZSBuYW1lc3BhY2UuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHkgKi9cbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgXzEgPSByZXF1aXJlKFwiLlwiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqICBAcHJpdmF0ZVxuICovXG52YXIgREVGQVVMVF9UQVNLX09QVElPTlMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHRpY2tEZWxheTogMCxcbiAgICB0aWNrSW50ZXJ2YWw6IDEsXG4gICAgdG90YWxSdW5zOiBudWxsLFxuICAgIHN0YXJ0RGF0ZTogbnVsbCxcbiAgICBzdG9wRGF0ZTogbnVsbCxcbiAgICBpbW1lZGlhdGU6IGZhbHNlLFxuICAgIHJlbW92ZU9uQ29tcGxldGVkOiBmYWxzZSxcbiAgICBjYWxsYmFjazogbnVsbFxufSk7XG4vKipcbiAqICBSZXByZXNlbnRzIHRoZSBjbGFzcyB0aGF0IGhvbGRzIHRoZSBjb25maWd1cmF0aW9ucyBhbmQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiAgcmVxdWlyZWQgdG8gcnVuIGEgdGFzay5cbiAqICBAY2xhc3NcbiAqL1xudmFyIFRhc2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIGBUYXNrYCBjbGFzcy5cbiAgICAgKiAgQGNvbnN0cnVjdG9yXG4gICAgICogIEBwYXJhbSB7SVRhc2tPcHRpb25zfSBvcHRpb25zIFRhc2sgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUYXNrKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImlkXCIsIHtcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIFBVQkxJQyAoSU5TVEFOQ0UpIE1FTUJFUlNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgdW5pcXVlIElEIG9mIHRoZSB0YXNrLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNpZFxuICAgICAgICAgKiAgQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLmlkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiZW5hYmxlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyB0YXNrIGlzIGN1cnJlbnRseSBlbmFibGVkLiBUaGlzIGVzc2VudGlhbGx5IGdpdmVzXG4gICAgICAgICAqICB5b3UgYSBtYW51YWwgY29udHJvbCBvdmVyIGV4ZWN1dGlvbi4gVGhlIHRhc2sgd2lsbCBhbHdheXMgYnlwYXNzIHRoZVxuICAgICAgICAgKiAgY2FsbGJhY2sgd2hpbGUgdGhpcyBpcyBzZXQgdG8gYGZhbHNlYC5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjZW5hYmxlZFxuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uZW5hYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5lbmFibGVkID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInRpY2tEZWxheVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSBudW1iZXIgb2YgdGlja3MgdG8gYWxsb3cgYmVmb3JlIHJ1bm5pbmcgdGhlIHRhc2sgZm9yXG4gICAgICAgICAqICB0aGUgZmlyc3QgdGltZS5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjdGlja0RlbGF5XG4gICAgICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnRpY2tEZWxheTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy50aWNrRGVsYXkgPSB1dGlsc18xLnV0aWxzLmdldE51bWJlcih2YWx1ZSwgMCwgREVGQVVMVF9UQVNLX09QVElPTlMudGlja0RlbGF5KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInRpY2tJbnRlcnZhbFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSB0aWNrIGludGVydmFsIHRoYXQgdGhlIHRhc2sgc2hvdWxkIGJlIHJ1biBvbi4gVGhlIHVuaXRcbiAgICAgICAgICogIGlzIFwidGlja3NcIiAobm90IG1pbGxpc2Vjb25kcykuIEZvciBpbnN0YW5jZSwgaWYgdGhlIHRpbWVyIGludGVydmFsIGlzXG4gICAgICAgICAqICBgMTAwMGAgbWlsbGlzZWNvbmRzLCBhbmQgd2UgYWRkIGEgdGFzayB3aXRoIGA1YCB0aWNrIGludGVydmFscy4gVGhlIHRhc2tcbiAgICAgICAgICogIHdpbGwgcnVuIG9uIGV2ZXJ5IGA1YCA8Yj5zZWNvbmRzPC9iPi5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjdGlja0ludGVydmFsXG4gICAgICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnRpY2tJbnRlcnZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy50aWNrSW50ZXJ2YWwgPSB1dGlsc18xLnV0aWxzLmdldE51bWJlcih2YWx1ZSwgMSwgREVGQVVMVF9UQVNLX09QVElPTlMudGlja0ludGVydmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInRvdGFsUnVuc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdGhlIHRhc2sgc2hvdWxkIGJlIHJ1bi4gYDBgIG9yXG4gICAgICAgICAqICBgbnVsbGAgbWVhbnMgdW5saW1pdGVkICh1bnRpbCB0aGUgdGltZXIgaGFzIHN0b3BwZWQpLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayN0b3RhbFJ1bnNcbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udG90YWxSdW5zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLnRvdGFsUnVucyA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAwLCBERUZBVUxUX1RBU0tfT1BUSU9OUy50b3RhbFJ1bnMpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiaW1tZWRpYXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0byB3cmFwIGNhbGxiYWNrIGluIGEgYHNldEltbWVkaWF0ZSgpYCBjYWxsIGJlZm9yZVxuICAgICAgICAgKiAgZXhlY3V0aW5nLiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgdGhlIHRhc2sgaXMgbm90IGRvaW5nIGFueSBJL08gb3IgdXNpbmdcbiAgICAgICAgICogIGFueSBKUyB0aW1lcnMgYnV0IHN5bmNocm9ub3VzbHkgYmxvY2tpbmcgdGhlIGV2ZW50IGxvb3AuXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2ltbWVkaWF0ZVxuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uaW1tZWRpYXRlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLmltbWVkaWF0ZSA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiY3VycmVudFJ1bnNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIG51bWJlciBvZiB0aW1lcywgdGhpcyB0YXNrIGhhcyBiZWVuIHJ1bi5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjY3VycmVudFJ1bnNcbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5jdXJyZW50UnVucztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInRpbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGltZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGxpZmV0aW1lIG9mIGEgdGFzay5cbiAgICAgICAgICogIGAjdGltZS5zdGFydGVkYCBpbmRpY2F0ZXMgdGhlIGZpcnN0IGV4ZWN1dGlvbiB0aW1lIG9mIGEgdGFzay5cbiAgICAgICAgICogIGAjdGltZS5zdG9wcGVkYCBpbmRpY2F0ZXMgdGhlIGxhc3QgZXhlY3V0aW9uIHRpbWUgb2YgYSB0YXNrLiAoYDBgIGlmIHN0aWxsIHJ1bm5pbmcuKVxuICAgICAgICAgKiAgYCN0aW1lLmVsYXBzZWRgIGluZGljYXRlcyB0aGUgdG90YWwgbGlmZXRpbWUgb2YgYSB0YXNrLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayN0aW1lXG4gICAgICAgICAqICBAdHlwZSB7SVRpbWVJbmZvfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdGFydGVkID0gdGhpcy5fLnRpbWVPbkZpcnN0UnVuIHx8IDA7XG4gICAgICAgICAgICB2YXIgc3RvcHBlZCA9IHRoaXMuXy50aW1lT25MYXN0UnVuIHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgICAgICAgICAgc3RhcnRlZDogc3RhcnRlZCxcbiAgICAgICAgICAgICAgICBzdG9wcGVkOiBzdG9wcGVkLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IHN0b3BwZWQgLSBzdGFydGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImNhbGxiYWNrXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBlYWNoIHJ1bi5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjY2FsbGJhY2tcbiAgICAgICAgICogIEB0eXBlIHtUYXNrQ2FsbGJhY2t9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5jYWxsYmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInJlbW92ZU9uQ29tcGxldGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgd2hldGhlciB0byByZW1vdmUgdGhlIHRhc2sgKHRvIGZyZWUgdXAgbWVtb3J5KSB3aGVuIHRhc2tcbiAgICAgICAgICogIGhhcyBjb21wbGV0ZWQgaXRzIGV4ZWN1dGlvbnMgKHJ1bnMpLiBGb3IgdGhpcyB0byB0YWtlIGFmZmVjdCwgdGhlIHRhc2tcbiAgICAgICAgICogIHNob3VsZCBoYXZlIGB0b3RhbFJ1bnNgIGFuZC9vciBgc3RvcERhdGVgIGNvbmZpZ3VyZWQuXG4gICAgICAgICAqICBAbmFtZSBUYXNrI3JlbW92ZU9uQ29tcGxldGVkXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5yZW1vdmVPbkNvbXBsZXRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5yZW1vdmVPbkNvbXBsZXRlZCA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiY29tcGxldGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGFzayBoYXMgY29tcGxldGVkIGFsbCBydW5zIChleGVjdXRpb25zKSBvclxuICAgICAgICAgKiAgYHN0b3BEYXRlYCBpcyByZWFjaGVkLiBOb3RlIHRoYXQgaWYgYm90aCBgdG90YWxSdW5zYCBhbmQgYHN0b3BEYXRlYCBhcmVcbiAgICAgICAgICogIG9taXR0ZWQsIHRoaXMgd2lsbCBuZXZlciByZXR1cm4gYHRydWVgOyBzaW5jZSB0aGUgdGFzayBoYXMgbm8gZXhlY3V0aW9uXG4gICAgICAgICAqICBsaW1pdCBzZXQuXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2NvbXBsZXRlZFxuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcmV0dXJuIGZhc3RlciBpZiBhbHJlYWR5IGNvbXBsZXRlZFxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcmtlZENvbXBsZXRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKCh0aGlzLnRvdGFsUnVucyAmJiB0aGlzLmN1cnJlbnRSdW5zID49IHRoaXMudG90YWxSdW5zKVxuICAgICAgICAgICAgICAgIHx8ICh0aGlzLl8uc3RvcERhdGUgJiYgRGF0ZS5ub3coKSA+PSB0aGlzLl8uc3RvcERhdGUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImNhblJ1bk9uVGlja1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRhc2sgY2FuIHJ1biBvbiB0aGUgY3VycmVudCB0aWNrIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIEBwcml2YXRlXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2NhblJ1bk9uVGlja1xuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hcmtlZENvbXBsZXRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgdGlja0NvdW50ID0gdGhpcy5fLnN0YXJ0RGF0ZVxuICAgICAgICAgICAgICAgID8gTWF0aC5jZWlsKChEYXRlLm5vdygpIC0gTnVtYmVyKHRoaXMuXy5zdGFydERhdGUpKSAvIHRoaXMuX3RpbWVyLmludGVydmFsKVxuICAgICAgICAgICAgICAgIDogdGhpcy5fdGltZXIudGlja0NvdW50O1xuICAgICAgICAgICAgdmFyIHRpbWVUb1J1biA9ICF0aGlzLl8uc3RhcnREYXRlIHx8IERhdGUubm93KCkgPj0gdGhpcy5fLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgIHZhciBvbkludGVydmFsID0gdGlja0NvdW50ID4gdGhpcy50aWNrRGVsYXkgJiYgKHRpY2tDb3VudCAtIHRoaXMudGlja0RlbGF5KSAlIHRoaXMudGlja0ludGVydmFsID09PSAwO1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odGltZVRvUnVuICYmIG9uSW50ZXJ2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiAgUmVzZXRzIHRoZSBjdXJyZW50IG51bWJlciBvZiBydW5zLiBUaGlzIHdpbGwga2VlcCB0aGUgdGFzayBydW5uaW5nIGZvclxuICAgICAqICB0aGUgc2FtZSBhbW91bnQgb2YgYHRpY2tJbnRlcnZhbHNgIGluaXRpYWxseSBjb25maWd1cmVkLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1xuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtJVGFza0Jhc2VPcHRpb25zfSBbb3B0aW9uc10gSWYgc2V0LCB0aGlzIHdpbGwgYWxzbyByZS1jb25maWd1cmUgdGhlIHRhc2suXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2t9XG4gICAgICovXG4gICAgVGFzay5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB0aGlzLl8uY3VycmVudFJ1bnMgPSAwO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGlkID0gb3B0aW9ucy5pZDtcbiAgICAgICAgICAgIGlmIChpZCAmJiBpZCAhPT0gdGhpcy5pZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjaGFuZ2UgSUQgb2YgYSB0YXNrLicpO1xuICAgICAgICAgICAgb3B0aW9ucy5pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFNlcmlhbGl6YXRpb24gdG8gSlNPTi5cbiAgICAgKlxuICAgICAqICBOZXZlciByZXR1cm4gc3RyaW5nIEZyb20gYHRvSlNPTigpYC4gSXQgc2hvdWxkIHJldHVybiBhbiBvYmplY3QuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFzay5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JqID0gX19hc3NpZ24oe30sIHRoaXMuXyk7XG4gICAgICAgIGRlbGV0ZSBvYmouY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQUklWQVRFIChJTlNUQU5DRSkgTUVNQkVSU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqICBTZXQgcmVmZXJlbmNlIHRvIHRpbWVyIGl0c2VsZi5cbiAgICAgKiAgT25seSBjYWxsZWQgYnkgYFRhc2tUaW1lcmAuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgLy8gQHRzLWlnbm9yZTogVFM2MTMzOiBkZWNsYXJlZCBidXQgbmV2ZXIgcmVhZC5cbiAgICBUYXNrLnByb3RvdHlwZS5fc2V0VGltZXIgPSBmdW5jdGlvbiAodGltZXIpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSB0aW1lcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKG5hbWUsIG9iamVjdCkge1xuICAgICAgICB2YXIgZXZlbnQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICAgIH07XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgZXZlbnQuZXJyb3IgPSBvYmplY3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmVudC5kYXRhID0gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RpbWVyLmVtaXQobmFtZSwgZXZlbnQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIGBUYXNrVGltZXJgIHNob3VsZCBiZSBpbmZvcm1lZCBpZiB0aGlzIHRhc2sgaXMgY29tcGxldGVkLiBCdXQgZXhlY3V0aW9uXG4gICAgICogIHNob3VsZCBiZSBmaW5pc2hlZC4gU28gd2UgZG8gdGhpcyB3aXRoaW4gdGhlIGBkb25lKClgIGZ1bmN0aW9uLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLl9kb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlZENvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl8udGltZU9uTGFzdFJ1biA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lci5fdGFza0NvbXBsZXRlZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFzay5wcm90b3R5cGUuX2V4ZWNDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBvID0gdGhpcy5jYWxsYmFjay5hcHBseSh0aGlzLCBbdGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2RvbmUoKTsgfV0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2subGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGVkIGJ5IGRvbmUoKSAoY2FsbGVkIHdpdGhpbiB0aGUgdGFzayBjYWxsYmFjayBieSB0aGUgdXNlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHV0aWxzXzEudXRpbHMuaXNQcm9taXNlKG8pKSB7XG4gICAgICAgICAgICAgICAgby50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2RvbmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZW1pdChfMS5UYXNrVGltZXIuRXZlbnQuVEFTS19FUlJPUiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KF8xLlRhc2tUaW1lci5FdmVudC5UQVNLX0VSUk9SLCBlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgT25seSB1c2VkIGJ5IGBUYXNrVGltZXJgLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFzay5wcm90b3R5cGUuX3J1biA9IGZ1bmN0aW9uIChvblJ1bikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLl9tYXJrZWRDb21wbGV0ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRSdW5zID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fLnRpbWVPbkZpcnN0UnVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgLy8gY3VycmVudCBydW5zIHNob3VsZCBiZSBzZXQgYmVmb3JlIGV4ZWN1dGlvbiBvciBpdCBtaWdodCBmbG93IGlmIHNvbWVcbiAgICAgICAgLy8gYXN5bmMgcnVucyBmaW5pc2hlcyBmYXN0ZXIgYW5kIHNvbWUgb3RoZXIgc2xvd2VyLlxuICAgICAgICB0aGlzLl8uY3VycmVudFJ1bnMrKztcbiAgICAgICAgb25SdW4oKTtcbiAgICAgICAgaWYgKHRoaXMuaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICB1dGlsc18xLnV0aWxzLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fZXhlY0NhbGxiYWNrKCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZXhlY0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLmlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdW5pcXVlIHRhc2sgSUQgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgY2FsbGJhY2sgZnVuY3Rpb24gaXMgcmVxdWlyZWQgZm9yIGEgdGFzayB0byBydW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IG9wdGlvbnMuc3RhcnREYXRlLCBzdG9wRGF0ZSA9IG9wdGlvbnMuc3RvcERhdGU7XG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgc3RvcERhdGUgJiYgc3RhcnREYXRlID49IHN0b3BEYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rhc2sgc3RhcnQgZGF0ZSBjYW5ub3QgYmUgdGhlIHNhbWUgb3IgYWZ0ZXIgc3RvcCBkYXRlLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcmtlZENvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl8gPSBfX2Fzc2lnbih7IGN1cnJlbnRSdW5zOiAwIH0sIERFRkFVTFRfVEFTS19PUFRJT05TKTtcbiAgICAgICAgdGhpcy5fLmlkID0gU3RyaW5nKG9wdGlvbnMuaWQpO1xuICAgICAgICB0aGlzLl8uY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICAgICAgICB0aGlzLl8uc3RhcnREYXRlID0gb3B0aW9ucy5zdGFydERhdGUgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5fLnN0b3BEYXRlID0gb3B0aW9ucy5zdG9wRGF0ZSB8fCBudWxsO1xuICAgICAgICAvLyB1c2luZyBzZXR0ZXJzIGZvciB2YWxpZGF0aW9uICYgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkO1xuICAgICAgICB0aGlzLnRpY2tEZWxheSA9IG9wdGlvbnMudGlja0RlbGF5O1xuICAgICAgICB0aGlzLnRpY2tJbnRlcnZhbCA9IG9wdGlvbnMudGlja0ludGVydmFsO1xuICAgICAgICB0aGlzLnRvdGFsUnVucyA9IG9wdGlvbnMudG90YWxSdW5zO1xuICAgICAgICB0aGlzLmltbWVkaWF0ZSA9IG9wdGlvbnMuaW1tZWRpYXRlO1xuICAgICAgICB0aGlzLnJlbW92ZU9uQ29tcGxldGVkID0gb3B0aW9ucy5yZW1vdmVPbkNvbXBsZXRlZDtcbiAgICB9O1xuICAgIHJldHVybiBUYXNrO1xufSgpKTtcbmV4cG9ydHMuVGFzayA9IFRhc2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnQgKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gZGVwIG1vZHVsZXNcbnZhciBldmVudGVtaXR0ZXIzXzEgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcbi8vIG93biBtb2R1bGVzXG52YXIgXzEgPSByZXF1aXJlKFwiLlwiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqICBAcHJpdmF0ZVxuICovXG52YXIgREVGQVVMVF9USU1FUl9PUFRJT05TID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgaW50ZXJ2YWw6IDEwMDAsXG4gICAgcHJlY2lzaW9uOiB0cnVlLFxuICAgIHN0b3BPbkNvbXBsZXRlZDogZmFsc2Vcbn0pO1xuLyoqXG4gKiAgVGFza1RpbWVyIOKAoiBodHRwczovL2dpdGh1Yi5jb20vb251cnkvdGFza3RpbWVyXG4gKiAgQGxpY2Vuc2UgTUlUXG4gKiAgQGNvcHlyaWdodCAyMDE5LCBPbnVyIFnEsWxkxLFyxLFtIDxvbnVyQGN1dGVwaWxvdC5jb20+XG4gKi9cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXZlbnRFbWl0dGVyIERvY3Ncbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiAgQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQgbmFtZS5cbiAqICBAbmFtZSBUYXNrVGltZXIjZW1pdFxuICogIEBmdW5jdGlvblxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGVtaXR0ZWQuXG4gKiAgQHBhcmFtIHthbnl9IFtkYXRhXSAtIERhdGEgdG8gYmUgcGFzc2VkIHRvIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiAgQHJldHVybnMge0Jvb2xlYW59IC0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbi8qKlxuICogIFJldHVybiBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkXG4gKiAgbGlzdGVuZXJzLlxuICogIEBuYW1lIFRhc2tUaW1lciNldmVudE5hbWVzXG4gKiAgQGZ1bmN0aW9uXG4gKlxuICogIEByZXR1cm5zIHtBcnJheX0gLVxuICovXG4vKipcbiAqICBBZGRzIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0byB0aGUgZW5kIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkgZm9yIHRoZSBldmVudFxuICogIG5hbWVkIGBldmVudE5hbWVgLiBObyBjaGVja3MgYXJlIG1hZGUgdG8gc2VlIGlmIHRoZSBsaXN0ZW5lciBoYXMgYWxyZWFkeVxuICogIGJlZW4gYWRkZWQuIE11bHRpcGxlIGNhbGxzIHBhc3NpbmcgdGhlIHNhbWUgY29tYmluYXRpb24gb2YgYGV2ZW50TmFtZWAgYW5kXG4gKiAgYGxpc3RlbmVyYCB3aWxsIHJlc3VsdCBpbiB0aGUgbGlzdGVuZXIgYmVpbmcgYWRkZWQsIGFuZCBjYWxsZWQsIG11bHRpcGxlXG4gKiAgdGltZXMuXG4gKiAgQG5hbWUgVGFza1RpbWVyI29uXG4gKiAgQGZ1bmN0aW9uXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGFkZGVkLlxuICogIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgcGVyIGV2ZW50LlxuICogIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gLSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKlxuICogIEByZXR1cm5zIHtUYXNrVGltZXJ9IC0gYHtAbGluayAjVGFza1RpbWVyfFRhc2tUaW1lcn1gIGluc3RhbmNlLlxuICovXG4vKipcbiAqICBBZGRzIGEgb25lIHRpbWUgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBldmVudCBuYW1lZCBgZXZlbnROYW1lYC4gVGhlIG5leHRcbiAqICB0aW1lIGBldmVudE5hbWVgIGlzIHRyaWdnZXJlZCwgdGhpcyBgbGlzdGVuZXJgIGlzIHJlbW92ZWQgYW5kIHRoZW4gaW52b2tlZC5cbiAqICBAbmFtZSBUYXNrVGltZXIjb25jZVxuICogIEBmdW5jdGlvblxuICogIEBjaGFpbmFibGVcbiAqXG4gKiAgQHBhcmFtIHtUYXNrVGltZXIuRXZlbnR9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSBhZGRlZC5cbiAqICBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHBlciBldmVudC5cbiAqICBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIC0gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICpcbiAqICBAcmV0dXJucyB7VGFza1RpbWVyfSAtIGB7QGxpbmsgI1Rhc2tUaW1lcnxUYXNrVGltZXJ9YCBpbnN0YW5jZS5cbiAqL1xuLyoqXG4gKiAgUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGBsaXN0ZW5lcmAgZnJvbSB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBldmVudFxuICogIG5hbWVkIGBldmVudE5hbWVgLlxuICogIEBuYW1lIFRhc2tUaW1lciNvZmZcbiAqICBAZnVuY3Rpb25cbiAqICBAYWxpYXMgVGFza1RpbWVyI3JlbW92ZUxpc3RlbmVyXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIHJlbW92ZWQuXG4gKiAgQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBwZXIgZXZlbnQuXG4gKiAgQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSAtIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqICBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSAtIE9ubHkgcmVtb3ZlIG9uZS10aW1lIGxpc3RlbmVycy5cbiAqXG4gKiAgQHJldHVybnMge1Rhc2tUaW1lcn0gLSBge0BsaW5rICNUYXNrVGltZXJ8VGFza1RpbWVyfWAgaW5zdGFuY2UuXG4gKi9cbi8qKlxuICogIEdldHMgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKiAgQG5hbWUgVGFza1RpbWVyI2xpc3RlbmVyQ291bnRcbiAqICBAZnVuY3Rpb25cbiAqXG4gKiAgQHBhcmFtIHtUYXNrVGltZXIuRXZlbnR9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAqXG4gKiAgQHJldHVybnMge051bWJlcn0gLSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqL1xuLyoqXG4gKiAgR2V0cyB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKiAgQG5hbWUgVGFza1RpbWVyI2xpc3RlbmVyc1xuICogIEBmdW5jdGlvblxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICpcbiAqICBAcmV0dXJucyB7QXJyYXl9IC0gVGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxuICovXG4vKipcbiAqICBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMsIG9yIHRob3NlIG9mIHRoZSBzcGVjaWZpZWQgYGV2ZW50TmFtZWAuXG4gKiAgQG5hbWUgVGFza1RpbWVyI3JlbW92ZUFsbExpc3RlbmVyc1xuICogIEBmdW5jdGlvblxuICogIEBjaGFpbmFibGVcbiAqXG4gKiAgQHBhcmFtIHtUYXNrVGltZXIuRXZlbnR9IFtldmVudE5hbWVdIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIHJlbW92ZWQuXG4gKlxuICogIEByZXR1cm5zIHtUYXNrVGltZXJ9IC0gYHtAbGluayAjVGFza1RpbWVyfFRhc2tUaW1lcn1gIGluc3RhbmNlLlxuICovXG4vKipcbiAqICBBIHRpbWVyIHV0aWxpdHkgZm9yIHJ1bm5pbmcgcGVyaW9kaWMgdGFza3Mgb24gdGhlIGdpdmVuIGludGVydmFsIHRpY2tzLlxuICogIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gcnVuIG9yIHNjaGVkdWxlIG11bHRpcGxlIHRhc2tzIG9uIGEgc2luZ2xlXG4gKiAgdGltZXIgaW5zdGFuY2UuXG4gKlxuICogIFRoaXMgY2xhc3MgZXh0ZW5kcyBgRXZlbnRFbWl0dGVyM2Agd2hpY2ggaXMgYW4gYEV2ZW50RW1pdHRlcmAgaW1wbGVtZW50YXRpb25cbiAqICBmb3IgYm90aCBOb2RlIGFuZCBicm93c2VyLiBPbmx5IGEgc21hbGwgc2V0IG9mIGl0cyBtZXRob2RzIGFyZSBkb2N1bWVudGVkIGluXG4gKiAgdGhpcyBkb2N1bWVudGF0aW9uLiBGb3IgYSBjb21wbGV0ZSBsaXN0LCByZWZlciB0byBOb2RlLmpzIGRvY3VtZW50YXRpb24uXG4gKiAgQGNsYXNzXG4gKiAgQGdsb2JhbFxuICpcbiAqICBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqXG4gKiAgQHNlZSB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfY2xhc3NfZXZlbnRlbWl0dGVyfEV2ZW50RW1pdHRlcn1cbiAqL1xudmFyIFRhc2tUaW1lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFza1RpbWVyLCBfc3VwZXIpO1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENPTlNUUlVDVE9SXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqXG4gICAgICogIENvbnN0cnVjdHMgYSBuZXcgYFRhc2tUaW1lcmAgaW5zdGFuY2Ugd2l0aCB0aGUgZ2l2ZW4gdGltZSBpbnRlcnZhbCAoaW5cbiAgICAgKiAgbWlsbGlzZWNvbmRzKS5cbiAgICAgKiAgQGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtJVGFza1RpbWVyT3B0aW9uc3xudW1iZXJ9IFtvcHRpb25zXSAtIEVpdGhlciBUYXNrVGltZXIgb3B0aW9uc1xuICAgICAqICBvciBhIGJhc2UgaW50ZXJ2YWwgKGluIG1pbGxpc2Vjb25kcykuIFNpbmNlIHRoZSB0YXNrcyBydW4gb24gdGlja3NcbiAgICAgKiAgaW5zdGVhZCBvZiBtaWxsaXNlY29uZCBpbnRlcnZhbHM7IHRoaXMgdmFsdWUgb3BlcmF0ZXMgYXMgdGhlIGJhc2VcbiAgICAgKiAgcmVzb2x1dGlvbiBmb3IgYWxsIHRhc2tzLiBJZiB5b3UgYXJlIHJ1bm5pbmcgaGVhdnkgdGFza3MsIGxvd2VyIGludGVydmFsXG4gICAgICogIHJlcXVpcmVzIGhpZ2hlciBDUFUgcG93ZXIuIFRoaXMgdmFsdWUgY2FuIGJlIHVwZGF0ZWQgYW55IHRpbWUgYnkgc2V0dGluZ1xuICAgICAqICB0aGUgYGludGVydmFsYCBwcm9wZXJ0eSBvbiB0aGUgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiAgQGV4YW1wbGVcbiAgICAgKiAgY29uc3QgdGltZXIgPSBuZXcgVGFza1RpbWVyKDEwMDApOyAvLyBtaWxsaXNlY29uZHNcbiAgICAgKiAgLy8gRXhlY3V0ZSBzb21lIGNvZGUgb24gZWFjaCB0aWNrLi4uXG4gICAgICogIHRpbWVyLm9uKCd0aWNrJywgKCkgPT4ge1xuICAgICAqICAgICAgY29uc29sZS5sb2coJ3RpY2sgY291bnQ6ICcgKyB0aW1lci50aWNrQ291bnQpO1xuICAgICAqICAgICAgY29uc29sZS5sb2coJ2VsYXBzZWQgdGltZTogJyArIHRpbWVyLnRpbWUuZWxhcHNlZCArICcgbXMuJyk7XG4gICAgICogIH0pO1xuICAgICAqICAvLyBPciBhZGQgYSB0YXNrIG5hbWVkICdoZWFydGJlYXQnIHRoYXQgcnVucyBldmVyeSA1IHRpY2tzIGFuZCBhIHRvdGFsIG9mIDEwIHRpbWVzLlxuICAgICAqICBjb25zdCB0YXNrID0ge1xuICAgICAqICAgICAgaWQ6ICdoZWFydGJlYXQnLFxuICAgICAqICAgICAgdGlja0ludGVydmFsOiA1LCAvLyB0aWNrc1xuICAgICAqICAgICAgdG90YWxSdW5zOiAxMCwgICAvLyB0aW1lc1xuICAgICAqICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICogICAgICAgICAgY29uc29sZS5sb2codGFzay5pZCArICcgdGFzayBoYXMgcnVuICcgKyB0YXNrLmN1cnJlbnRSdW5zICsgJyB0aW1lcy4nKTtcbiAgICAgKiAgICAgIH1cbiAgICAgKiAgfTtcbiAgICAgKiAgdGltZXIuYWRkVGFzayh0YXNrKS5zdGFydCgpO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFRhc2tUaW1lcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl90aW1lb3V0UmVmID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2ltbWVkaWF0ZVJlZiA9IG51bGw7XG4gICAgICAgIF90aGlzLl9ydW5Db3VudCA9IDA7XG4gICAgICAgIF90aGlzLl9yZXNldCgpO1xuICAgICAgICBfdGhpcy5fLm9wdHMgPSB7fTtcbiAgICAgICAgdmFyIG9wdHMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8geyBpbnRlcnZhbDogb3B0aW9ucyB9XG4gICAgICAgICAgICA6IG9wdGlvbnMgfHwge307XG4gICAgICAgIF90aGlzLmludGVydmFsID0gb3B0cy5pbnRlcnZhbDtcbiAgICAgICAgX3RoaXMucHJlY2lzaW9uID0gb3B0cy5wcmVjaXNpb247XG4gICAgICAgIF90aGlzLnN0b3BPbkNvbXBsZXRlZCA9IG9wdHMuc3RvcE9uQ29tcGxldGVkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcImludGVydmFsXCIsIHtcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIFBVQkxJQyAoSU5TVEFOQ0UpIFBST1BFUlRJRVNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSB0aW1lciBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqICBTaW5jZSB0aGUgdGFza3MgcnVuIG9uIHRpY2tzIGluc3RlYWQgb2YgbWlsbGlzZWNvbmQgaW50ZXJ2YWxzOyB0aGlzXG4gICAgICAgICAqICB2YWx1ZSBvcGVyYXRlcyBhcyB0aGUgYmFzZSByZXNvbHV0aW9uIGZvciBhbGwgdGFza3MuIElmIHlvdSBhcmUgcnVubmluZ1xuICAgICAgICAgKiAgaGVhdnkgdGFza3M7IGxvd2VyIGludGVydmFsIHJlcXVpcmVzIGhpZ2hlciBDUFUgcG93ZXIuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjaW50ZXJ2YWxcbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8ub3B0cy5pbnRlcnZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5vcHRzLmludGVydmFsID0gdXRpbHNfMS51dGlscy5nZXROdW1iZXIodmFsdWUsIDIwLCBERUZBVUxUX1RJTUVSX09QVElPTlMuaW50ZXJ2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJwcmVjaXNpb25cIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoZSB0aW1lciBzaG91bGQgYXV0by1hZGp1c3QgdGhlIGRlbGF5IGJldHdlZW5cbiAgICAgICAgICogIHRpY2tzIGlmIGl0J3Mgb2ZmIGR1ZSB0byB0YXNrIGxvYWQuIE5vdGUgdGhhdCBwcmVjaXNpb24gd2lsbCBiZSBhcyBoaWdoXG4gICAgICAgICAqICBhcyBwb3NzaWJsZSBidXQgaXQgc3RpbGwgY2FuIGJlIG9mZiBieSBhIGZldyBtaWxsaXNlY29uZHM7IGRlcGVuZGluZyBvblxuICAgICAgICAgKiAgdGhlIENQVSBvciB0aGUgbG9hZC5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciNwcmVjaXNpb25cbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLm9wdHMucHJlY2lzaW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLm9wdHMucHJlY2lzaW9uID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBERUZBVUxUX1RJTUVSX09QVElPTlMucHJlY2lzaW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwic3RvcE9uQ29tcGxldGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgdGltZXIgc2hvdWxkIGF1dG9tYXRpY2FsbHkgc3RvcCB3aGVuIGFsbCB0YXNrc1xuICAgICAgICAgKiAgYXJlIGNvbXBsZXRlZC4gRm9yIHRoaXMgdG8gdGFrZSBhZmZlY3QsIGFsbCBhZGRlZCB0YXNrcyBzaG91bGQgaGF2ZVxuICAgICAgICAgKiAgYHRvdGFsUnVuc2AgYW5kL29yIGBzdG9wRGF0ZWAgY29uZmlndXJlZC4gVGhpcyBvcHRpb24gY2FuIGJlIHNldC9jaGFuZ2VkXG4gICAgICAgICAqICBhdCBhbnkgdGltZS5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciNzdG9wT25Db21wbGV0ZWRcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLm9wdHMuc3RvcE9uQ29tcGxldGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLm9wdHMuc3RvcE9uQ29tcGxldGVkID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBERUZBVUxUX1RJTUVSX09QVElPTlMuc3RvcE9uQ29tcGxldGVkKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwic3RhdGVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgRm9yIHBvc3NpYmxlIHZhbHVlcywgc2VlIGBUYXNrVGltZXIuU3RhdGVgIGVudW1lcmF0aW9uLlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI3N0YXRlXG4gICAgICAgICAqICBAdHlwZSB7VGFza1RpbWVyLlN0YXRlfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uc3RhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRpbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGltZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGxhdGVzdCBydW4gb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgYCN0aW1lLnN0YXJ0ZWRgIGluZGljYXRlcyB0aGUgc3RhcnQgdGltZSBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBgI3RpbWUuc3RvcHBlZGAgaW5kaWNhdGVzIHRoZSBzdG9wIHRpbWUgb2YgdGhlIHRpbWVyLiAoYDBgIGlmIHN0aWxsIHJ1bm5pbmcuKVxuICAgICAgICAgKiAgYCN0aW1lLmVsYXBzZWRgIGluZGljYXRlcyB0aGUgZWxhcHNlZCB0aW1lIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciN0aW1lXG4gICAgICAgICAqICBAdHlwZSB7SVRpbWVJbmZvfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5zdGF0ZSAhPT0gVGFza1RpbWVyLlN0YXRlLlNUT1BQRUQgPyBEYXRlLm5vdygpIDogdGhpcy5fLnN0b3BUaW1lO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgICAgICAgICAgIHN0YXJ0ZWQ6IHRoaXMuXy5zdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgc3RvcHBlZDogdGhpcy5fLnN0b3BUaW1lLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IGN1cnJlbnQgLSB0aGlzLl8uc3RhcnRUaW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwidGlja0NvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBjdXJyZW50IHRpY2sgY291bnQgZm9yIHRoZSBsYXRlc3QgcnVuIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIFRoaXMgdmFsdWUgd2lsbCBiZSByZXNldCB0byBgMGAgd2hlbiB0aGUgdGltZXIgaXMgc3RvcHBlZCBvciByZXNldC5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciN0aWNrQ291bnRcbiAgICAgICAgICogIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy50aWNrQ291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRhc2tDb3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgY3VycmVudCB0YXNrIGNvdW50LiBUYXNrcyByZW1haW4gZXZlbiBhZnRlciB0aGUgdGltZXIgaXNcbiAgICAgICAgICogIHN0b3BwZWQuIEJ1dCB0aGV5IHdpbGwgYmUgcmVtb3ZlZCBpZiB0aGUgdGltZXIgaXMgcmVzZXQuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjdGFza0NvdW50XG4gICAgICAgICAqICBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl8udGFza3MpLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwidGFza1J1bkNvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgYWxsIHRhc2sgZXhlY3V0aW9ucyAocnVucykuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjdGFza1J1bkNvdW50XG4gICAgICAgICAqICBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udGFza1J1bkNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJydW5Db3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIHRpbWVyIHJ1bnMsIGluY2x1ZGluZyByZXN1bWVkIHJ1bnMuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjcnVuQ291bnRcbiAgICAgICAgICogIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3J1bkNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVUJMSUMgKElOU1RBTkNFKSBNRVRIT0RTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqXG4gICAgICogIEdldHMgdGhlIHRhc2sgd2l0aCB0aGUgZ2l2ZW4gSUQuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge1N0cmluZ30gaWQgLSBJRCBvZiB0aGUgdGFzay5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza31cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fLnRhc2tzW2lkXSB8fCBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIEFkZHMgYSBjb2xsZWN0aW9uIG9mIG5ldyB0YXNrcyBmb3IgdGhlIHRpbWVyLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge1Rhc2t8SVRhc2tPcHRpb25zfFRhc2tDYWxsYmFja3xBcnJheTxhbnk+fSB0YXNrIC0gRWl0aGVyIGFcbiAgICAgKiAgc2luZ2xlIHRhc2ssIHRhc2sgb3B0aW9ucyBvYmplY3Qgb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uOyBvciBhIG1peHR1cmVcbiAgICAgKiAgb2YgdGhlc2UgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKlxuICAgICAqICBAdGhyb3dzIHtFcnJvcn0gLSBJZiBhIHRhc2sgY2FsbGJhY2sgaXMgbm90IHNldCBvciBhIHRhc2sgd2l0aCB0aGUgZ2l2ZW5cbiAgICAgKiAgbmFtZSBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdXRpbHNfMS51dGlscy5pc3NldCh0YXNrKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgYSB0YXNrLCB0YXNrIG9wdGlvbnMgb3IgYSBjYWxsYmFjayBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB1dGlsc18xLnV0aWxzLmVuc3VyZUFycmF5KHRhc2spLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLl9hZGQoaXRlbSk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBSZW1vdmVzIHRoZSB0YXNrIGJ5IHRoZSBnaXZlbiBuYW1lLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge3N0cmluZ3xUYXNrfSB0YXNrIC0gVGFzayB0byBiZSByZW1vdmVkLiBFaXRoZXIgcGFzcyB0aGVcbiAgICAgKiAgbmFtZSBvciB0aGUgdGFzayBpdHNlbGYuXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKlxuICAgICAqICBAdGhyb3dzIHtFcnJvcn0gLSBJZiBhIHRhc2sgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHZhciBpZCA9IHR5cGVvZiB0YXNrID09PSAnc3RyaW5nJyA/IHRhc2sgOiB0YXNrLmlkO1xuICAgICAgICB0YXNrID0gdGhpcy5nZXQoaWQpO1xuICAgICAgICBpZiAoIWlkIHx8ICF0YXNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0YXNrcyBleGlzdCB3aXRoIElEOiAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmlyc3QgZGVjcmVtZW50IGNvbXBsZXRlZCB0YXNrcyBjb3VudCBpZiB0aGlzIGlzIGEgY29tcGxldGVkIHRhc2suXG4gICAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCAmJiB0aGlzLl8uY29tcGxldGVkVGFza0NvdW50ID4gMClcbiAgICAgICAgICAgIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQtLTtcbiAgICAgICAgdGhpcy5fLnRhc2tzW2lkXSA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl8udGFza3NbaWRdO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5UQVNLX1JFTU9WRUQsIHRhc2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTdGFydHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgUlVOTklOR2Agc3RhdGUuIElmIGl0J3MgYWxyZWFkeVxuICAgICAqICBydW5uaW5nLCB0aGlzIHdpbGwgcmVzZXQgdGhlIHN0YXJ0L3N0b3AgdGltZSBhbmQgdGljayBjb3VudCwgYnV0IHdpbGwgbm90XG4gICAgICogIHJlc2V0IChvciByZW1vdmUpIGV4aXN0aW5nIHRhc2tzLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkc7XG4gICAgICAgIHRoaXMuX3J1bkNvdW50Kys7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl8udGFza1J1bkNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fLnN0b3BUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fbWFya1RpbWUoKTtcbiAgICAgICAgdGhpcy5fLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlNUQVJURUQpO1xuICAgICAgICB0aGlzLl9ydW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUGF1c2VzIHRoZSB0aW1lciwgcHV0cyB0aGUgdGltZXIgaW4gYFBBVVNFRGAgc3RhdGUgYW5kIGFsbCB0YXNrcyBvbiBob2xkLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5QQVVTRUQ7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlBBVVNFRCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlc3VtZXMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgUlVOTklOR2Agc3RhdGU7IGlmIHByZXZpdW9zbHlcbiAgICAgKiAgcGF1c2VkLiBJbiB0aGlzIHN0YXRlLCBhbGwgZXhpc3RpbmcgdGFza3MgYXJlIHJlc3VtZWQuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBUYXNrVGltZXIuU3RhdGUuSURMRSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFRhc2tUaW1lci5TdGF0ZS5QQVVTRUQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5fcnVuQ291bnQrKztcbiAgICAgICAgdGhpcy5fbWFya1RpbWUoKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkc7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlJFU1VNRUQpO1xuICAgICAgICB0aGlzLl9ydW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU3RvcHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgU1RPUFBFRGAgc3RhdGUuIEluIHRoaXMgc3RhdGUsIGFsbFxuICAgICAqICBleGlzdGluZyB0YXNrcyBhcmUgc3RvcHBlZCBhbmQgbm8gdmFsdWVzIG9yIHRhc2tzIGFyZSByZXNldCB1bnRpbFxuICAgICAqICByZS1zdGFydGVkIG9yIGV4cGxpY2l0bHkgY2FsbGluZyByZXNldC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgICAgIHRoaXMuXy5zdG9wVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5TVE9QUEVEO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5TVE9QUEVEKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU3RvcHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgSURMRWAgc3RhdGUuXG4gICAgICogIFRoaXMgd2lsbCByZXNldCB0aGUgdGlja3MgYW5kIHJlbW92ZXMgYWxsIHRhc2tzIHNpbGVudGx5OyBtZWFuaW5nIG5vXG4gICAgICogIG90aGVyIGV2ZW50cyB3aWxsIGJlIGVtaXR0ZWQgc3VjaCBhcyBgXCJ0YXNrUmVtb3ZlZFwiYC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5SRVNFVCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFJJVkFURSAoSU5TVEFOQ0UpIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xuICAgICAgICAgICAgbmFtZTogdHlwZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdCh0eXBlLCBldmVudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQWRkcyBhIG5ldyB0YXNrIGZvciB0aGUgdGltZXIuXG4gICAgICogIEBwcml2YXRlXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtUYXNrfElUYXNrT3B0aW9uc3xUYXNrQ2FsbGJhY2t9IG9wdGlvbnMgLSBFaXRoZXIgYSB0YXNrIGluc3RhbmNlLFxuICAgICAqICB0YXNrIG9wdGlvbnMgb2JqZWN0IG9yIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiB0aWNrXG4gICAgICogIGludGVydmFscy5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqXG4gICAgICogIEB0aHJvd3Mge0Vycm9yfSAtIElmIHRoZSB0YXNrIGNhbGxiYWNrIGlzIG5vdCBzZXQgb3IgYSB0YXNrIHdpdGggdGhlXG4gICAgICogIGdpdmVuIG5hbWUgYWxyZWFkeSBleGlzdHMuXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fYWRkID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBvcHRpb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlsc18xLnV0aWxzLnR5cGUob3B0aW9ucykgPT09ICdvYmplY3QnICYmICFvcHRpb25zLmlkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmlkID0gdGhpcy5fZ2V0VW5pcXVlVGFza0lEKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ2V0KG9wdGlvbnMuaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRhc2sgd2l0aCBpZCAnXCIgKyBvcHRpb25zLmlkICsgXCInIGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFzayA9IG9wdGlvbnMgaW5zdGFuY2VvZiBfMS5UYXNrID8gb3B0aW9ucyA6IG5ldyBfMS5UYXNrKG9wdGlvbnMpO1xuICAgICAgICB0YXNrLl9zZXRUaW1lcih0aGlzKTtcbiAgICAgICAgdGhpcy5fLnRhc2tzW3Rhc2suaWRdID0gdGFzaztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuVEFTS19BRERFRCwgdGFzayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFN0b3BzIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl8udGlja0NvdW50QWZ0ZXJSZXN1bWUgPSAwO1xuICAgICAgICBpZiAodGhpcy5fdGltZW91dFJlZikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRSZWYpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ltbWVkaWF0ZVJlZikge1xuICAgICAgICAgICAgdXRpbHNfMS51dGlscy5jbGVhckltbWVkaWF0ZSh0aGlzLl9pbW1lZGlhdGVSZWYpO1xuICAgICAgICAgICAgdGhpcy5faW1tZWRpYXRlUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlc2V0cyB0aGUgdGltZXIuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuXyA9IHtcbiAgICAgICAgICAgIG9wdHM6ICh0aGlzLl8gfHwge30pLm9wdHMsXG4gICAgICAgICAgICBzdGF0ZTogVGFza1RpbWVyLlN0YXRlLklETEUsXG4gICAgICAgICAgICB0YXNrczoge30sXG4gICAgICAgICAgICB0aWNrQ291bnQ6IDAsXG4gICAgICAgICAgICB0YXNrUnVuQ291bnQ6IDAsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDAsXG4gICAgICAgICAgICBzdG9wVGltZTogMCxcbiAgICAgICAgICAgIGNvbXBsZXRlZFRhc2tDb3VudDogMCxcbiAgICAgICAgICAgIHJlc3VtZVRpbWU6IDAsXG4gICAgICAgICAgICBoclJlc3VtZVRpbWU6IG51bGwsXG4gICAgICAgICAgICB0aWNrQ291bnRBZnRlclJlc3VtZTogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQ2FsbGVkIChieSBUYXNrIGluc3RhbmNlKSB3aGVuIGl0IGhhcyBjb21wbGV0ZWQgYWxsIG9mIGl0cyBydW5zLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fdGFza0NvbXBsZXRlZCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQrKztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuVEFTS19DT01QTEVURUQsIHRhc2spO1xuICAgICAgICBpZiAodGhpcy5fLmNvbXBsZXRlZFRhc2tDb3VudCA9PT0gdGhpcy50YXNrQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LkNPTVBMRVRFRCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wT25Db21wbGV0ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhc2sucmVtb3ZlT25Db21wbGV0ZWQpXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh0YXNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBIYW5kbGVyIHRvIGJlIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl8uc3RhdGUgPSBUYXNrVGltZXIuU3RhdGUuUlVOTklORztcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICB2YXIgdGFzaztcbiAgICAgICAgdmFyIHRhc2tzID0gdGhpcy5fLnRhc2tzO1xuICAgICAgICB0aGlzLl8udGlja0NvdW50Kys7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnRBZnRlclJlc3VtZSsrO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5USUNLKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6Zm9yaW5cbiAgICAgICAgZm9yIChpZCBpbiB0YXNrcykge1xuICAgICAgICAgICAgdGFzayA9IHRhc2tzW2lkXTtcbiAgICAgICAgICAgIGlmICghdGFzayB8fCAhdGFzay5jYW5SdW5PblRpY2spXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBiZWxvdyB3aWxsIG5vdCBleGVjdXRlIGlmIHRhc2sgaXMgZGlzYWJsZWQgb3IgYWxyZWFkeVxuICAgICAgICAgICAgLy8gY29tcGxldGVkLlxuICAgICAgICAgICAgdGFzay5fcnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fLnRhc2tSdW5Db3VudCsrO1xuICAgICAgICAgICAgICAgIF90aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5UQVNLLCB0YXNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3J1bigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIE1hcmtzIHRoZSByZXN1bWUgKG9yIHN0YXJ0KSB0aW1lIGluIG1pbGxpc2Vjb25kcyBvciBoaWdoLXJlc29sdXRpb24gdGltZVxuICAgICAqICBpZiBhdmFpbGFibGUuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fbWFya1RpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodXRpbHNfMS51dGlscy5CUk9XU0VSKSB7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgICAgICB0aGlzLl8ucmVzdW1lVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl8uaHJSZXN1bWVUaW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIEdldHMgdGhlIHRpbWUgZGlmZmVyZW5jZSBpbiBtaWxsaXNlY29uZHMgc2luY3QgdGhlIGxhc3QgcmVzdW1lIG9yIHN0YXJ0XG4gICAgICogIHRpbWUuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fZ2V0VGltZURpZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIERhdGUubm93KCkgaXMgfjJ4IGZhc3RlciB0aGFuIERhdGUjZ2V0VGltZSgpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodXRpbHNfMS51dGlscy5CUk9XU0VSKVxuICAgICAgICAgICAgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLl8ucmVzdW1lVGltZTsgLy8gdGVzdGVkIHNlcGFyYXRlbHlcbiAgICAgICAgdmFyIGhyRGlmZiA9IHByb2Nlc3MuaHJ0aW1lKHRoaXMuXy5oclJlc3VtZVRpbWUpO1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKChockRpZmZbMF0gKiAxMDAwKSArIChockRpZmZbMV0gLyAxZTYpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBSdW5zIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGludGVydmFsID0gdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgLy8gd2UnbGwgZ2V0IGEgcHJlY2lzZSBpbnRlcnZhbCBieSBjaGVja2luZyBpZiBvdXIgY2xvY2sgaXMgYWxyZWFkeVxuICAgICAgICAvLyBkcmlmdGVkLlxuICAgICAgICBpZiAodGhpcy5wcmVjaXNpb24pIHtcbiAgICAgICAgICAgIHZhciBkaWZmID0gdGhpcy5fZ2V0VGltZURpZmYoKTtcbiAgICAgICAgICAgIC8vIGRpZCB3ZSByZWFjaCB0aGlzIGV4cGVjdGVkIHRpY2sgY291bnQgZm9yIHRoZSBnaXZlbiB0aW1lIHBlcmlvZD9cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZWQgY291bnQgc2hvdWxkIG5vdCBiZSBncmVhdGVyIHRoYW4gdGlja0NvdW50QWZ0ZXJSZXN1bWVcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKGRpZmYgLyBpbnRlcnZhbCkgPiB0aGlzLl8udGlja0NvdW50QWZ0ZXJSZXN1bWUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSByZWFsbHkgbGF0ZSwgcnVuIGltbWVkaWF0ZWx5IVxuICAgICAgICAgICAgICAgIHRoaXMuX2ltbWVkaWF0ZVJlZiA9IHV0aWxzXzEudXRpbHMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl90aWNrKCk7IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgdGltZSBidXQgYSBiaXQgb2ZmLCB1cGRhdGUgbmV4dCBpbnRlcnZhbC5cbiAgICAgICAgICAgIGludGVydmFsID0gaW50ZXJ2YWwgLSAoZGlmZiAlIGludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lb3V0UmVmID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fdGljaygpOyB9LCBpbnRlcnZhbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgR2V0cyBhIHVuaXF1ZSB0YXNrIElELlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX2dldFVuaXF1ZVRhc2tJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG51bSA9IHRoaXMudGFza0NvdW50O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHdoaWxlICghaWQgfHwgdGhpcy5nZXQoaWQpKSB7XG4gICAgICAgICAgICBudW0rKztcbiAgICAgICAgICAgIGlkID0gJ3Rhc2snICsgbnVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuICAgIHJldHVybiBUYXNrVGltZXI7XG59KGV2ZW50ZW1pdHRlcjNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuVGFza1RpbWVyID0gVGFza1RpbWVyO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBOQU1FU1BBQ0Vcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gdHNsaW50OmRpc2FibGU6bm8tbmFtZXNwYWNlXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyoqIEBwcml2YXRlICovXG4oZnVuY3Rpb24gKFRhc2tUaW1lcikge1xuICAgIC8qKlxuICAgICAqICBSZXByZXNlbnRzIHRoZSBjbGFzcyB0aGF0IGhvbGRzIHRoZSBjb25maWd1cmF0aW9ucyBhbmQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogIHJlcXVpcmVkIHRvIHJ1biBhIHRhc2suXG4gICAgICogIEBuYW1lIFRhc2tUaW1lci5UYXNrXG4gICAgICogIEBjbGFzc1xuICAgICAqL1xuICAgIFRhc2tUaW1lci5UYXNrID0gXzEuVGFzaztcbiAgICAvKipcbiAgICAgKiAgRW51bWVyYXRlcyBgVGFza1RpbWVyYCBzdGF0ZXMuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGVudW0ge1N0cmluZ31cbiAgICAgKiAgQHJlYWRvbmx5XG4gICAgICovXG4gICAgdmFyIFN0YXRlO1xuICAgIChmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYGlkbGVgIHN0YXRlLlxuICAgICAgICAgKiAgVGhpcyBpcyB0aGUgaW5pdGlhbCBzdGF0ZSB3aGVuIHRoZSBgVGFza1RpbWVyYCBpbnN0YW5jZSBpcyBmaXJzdCBjcmVhdGVkLlxuICAgICAgICAgKiAgQWxzbyB3aGVuIGFuIGV4aXN0aW5nIHRpbWVyIGlzIHJlc2V0LCBpdCB3aWxsIGJlIGBpZGxlYC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZVtcIklETEVcIl0gPSBcImlkbGVcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYHJ1bm5pbmdgIHN0YXRlOyBzdWNoIGFzIHdoZW4gdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICBzdGFydGVkIG9yIHJlc3VtZWQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGVbXCJSVU5OSU5HXCJdID0gXCJydW5uaW5nXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5kaWNhdGVzIHRoYXQgdGhlIHRpbWVyIGlzIGluIGBwYXVzZWRgIHN0YXRlLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlW1wiUEFVU0VEXCJdID0gXCJwYXVzZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYHN0b3BwZWRgIHN0YXRlLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlW1wiU1RPUFBFRFwiXSA9IFwic3RvcHBlZFwiO1xuICAgIH0pKFN0YXRlID0gVGFza1RpbWVyLlN0YXRlIHx8IChUYXNrVGltZXIuU3RhdGUgPSB7fSkpO1xuICAgIC8qKlxuICAgICAqICBFbnVtZXJhdGVzIHRoZSBgVGFza1RpbWVyYCBldmVudCB0eXBlcy5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAZW51bSB7U3RyaW5nfVxuICAgICAqICBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICB2YXIgRXZlbnQ7XG4gICAgKGZ1bmN0aW9uIChFdmVudCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgb24gZWFjaCB0aWNrIChpbnRlcnZhbCkgb2YgYFRhc2tUaW1lcmAuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJUSUNLXCJdID0gXCJ0aWNrXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyBwdXQgaW4gYFJVTk5JTkdgIHN0YXRlOyBzdWNoIGFzIHdoZW4gdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICBzdGFydGVkLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiU1RBUlRFRFwiXSA9IFwic3RhcnRlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcHV0IGluIGBSVU5OSU5HYCBzdGF0ZTsgc3VjaCBhcyB3aGVuIHRoZSB0aW1lciBpc1xuICAgICAgICAgKiAgcmVzdW1lZC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlJFU1VNRURcIl0gPSBcInJlc3VtZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gdGhlIHRpbWVyIGlzIHB1dCBpbiBgUEFVU0VEYCBzdGF0ZS5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlBBVVNFRFwiXSA9IFwicGF1c2VkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyBwdXQgaW4gYFNUT1BQRURgIHN0YXRlLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiU1RPUFBFRFwiXSA9IFwic3RvcHBlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcmVzZXQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJSRVNFVFwiXSA9IFwicmVzZXRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIGlzIGV4ZWN1dGVkLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiVEFTS1wiXSA9IFwidGFza1wiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgaXMgYWRkZWQgdG8gYFRhc2tUaW1lcmAgaW5zdGFuY2UuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJUQVNLX0FEREVEXCJdID0gXCJ0YXNrQWRkZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIGlzIHJlbW92ZWQgZnJvbSBgVGFza1RpbWVyYCBpbnN0YW5jZS5cbiAgICAgICAgICogIE5vdGUgdGhhdCB0aGlzIHdpbGwgbm90IGJlIGVtaXR0ZWQgd2hlbiBgLnJlc2V0KClgIGlzIGNhbGxlZDsgd2hpY2hcbiAgICAgICAgICogIHJlbW92ZXMgYWxsIHRhc2tzIHNpbGVudGx5LlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiVEFTS19SRU1PVkVEXCJdID0gXCJ0YXNrUmVtb3ZlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgaGFzIGNvbXBsZXRlZCBhbGwgb2YgaXRzIGV4ZWN1dGlvbnMgKHJ1bnMpXG4gICAgICAgICAqICBvciByZWFjaGVkIGl0cyBzdG9wcGluZyBkYXRlL3RpbWUgKGlmIHNldCkuIE5vdGUgdGhhdCB0aGlzIGV2ZW50XG4gICAgICAgICAqICB3aWxsIG9ubHkgYmUgZmlyZWQgaWYgdGhlIHRhc2tzIGhhcyBhIGB0b3RhbFJ1bnNgIGxpbWl0IG9yIGFcbiAgICAgICAgICogIGBzdG9wRGF0ZWAgdmFsdWUgc2V0LlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiVEFTS19DT01QTEVURURcIl0gPSBcInRhc2tDb21wbGV0ZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIHByb2R1Y2VzIGFuIGVycm9yIG9uIGl0cyBleGVjdXRpb24uXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJUQVNLX0VSUk9SXCJdID0gXCJ0YXNrRXJyb3JcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYWxsIHRhc2tzIGhhdmUgY29tcGxldGVkIGFsbCBvZiB0aGVpciBleGVjdXRpb25zIChydW5zKVxuICAgICAgICAgKiAgb3IgcmVhY2hlZCB0aGVpciBzdG9wcGluZyBkYXRlL3RpbWUgKGlmIHNldCkuIE5vdGUgdGhhdCB0aGlzIGV2ZW50XG4gICAgICAgICAqICB3aWxsIG9ubHkgYmUgZmlyZWQgaWYgYWxsIHRhc2tzIGhhdmUgYSBgdG90YWxSdW5zYCBsaW1pdCBvciBhXG4gICAgICAgICAqICBgc3RvcERhdGVgIHZhbHVlIHNldC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIkNPTVBMRVRFRFwiXSA9IFwiY29tcGxldGVkXCI7XG4gICAgfSkoRXZlbnQgPSBUYXNrVGltZXIuRXZlbnQgfHwgKFRhc2tUaW1lci5FdmVudCA9IHt9KSk7XG59KShUYXNrVGltZXIgfHwgKFRhc2tUaW1lciA9IHt9KSk7XG5leHBvcnRzLlRhc2tUaW1lciA9IFRhc2tUaW1lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1Rhc2tcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vVGFza1RpbWVyXCIpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBOT0RFID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBwcm9jZXNzLmhydGltZSA9PT0gJ2Z1bmN0aW9uJztcbnZhciBCUk9XU0VSID0gIU5PREU7XG4vKiogQHByaXZhdGUgKi9cbnZhciB1dGlscyA9IHtcbiAgICBOT0RFOiBOT0RFLFxuICAgIEJST1dTRVI6IEJST1dTRVIsXG4gICAgdHlwZTogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIHByb3RvLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xccyhcXHcrKS9pKVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgIH0sXG4gICAgaXNzZXQ6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvICE9PSBudWxsICYmIG8gIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGVuc3VyZUFycmF5OiBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gdXRpbHMuaXNzZXQobylcbiAgICAgICAgICAgID8gIUFycmF5LmlzQXJyYXkobykgPyBbb10gOiBvXG4gICAgICAgICAgICA6IFtdO1xuICAgIH0sXG4gICAgZ2V0TnVtYmVyOiBmdW5jdGlvbiAodmFsdWUsIG1pbmltdW0sIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgPyAodmFsdWUgPCBtaW5pbXVtID8gbWluaW11bSA6IHZhbHVlKVxuICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWU7XG4gICAgfSxcbiAgICBnZXRCb29sOiBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbidcbiAgICAgICAgICAgID8gZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICA6IHZhbHVlO1xuICAgIH0sXG4gICAgc2V0SW1tZWRpYXRlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh1dGlscy5CUk9XU0VSKSB7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChjYi5hcHBseShudWxsLCBhcmdzKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZS5hcHBseSh2b2lkIDAsIFtjYl0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGNsZWFySW1tZWRpYXRlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh1dGlscy5CUk9XU0VSKVxuICAgICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgIGNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqICBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwcm9taXNlLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqICBAcGFyYW0ge2FueX0gdmFsdWUgLSBWYWx1ZSB0byBiZSBjaGVja2VkLlxuICAgICAqICBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzUHJvbWlzZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgJiYgdXRpbHMudHlwZSh2YWx1ZSkgPT09ICdwcm9taXNlJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gICAgfVxufTtcbmV4cG9ydHMudXRpbHMgPSB1dGlscztcbiJdLCJzb3VyY2VSb290IjoiIn0=