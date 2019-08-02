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
     *  Never return string from `toJSON()`. It should return an object.
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
 *  @returns {Array} - List of event names.
 */
/**
 *  Adds the listener function to the end of the listeners array for the event
 *  named `eventName`. No checks are made to see if the listener has already
 *  been added. Multiple calls passing the same combination of `eventName` and
 *  `listener` will result in the listener being added, and called, multiple
 *  times.
 *  @name TaskTimer#on
 *  @function
 *  @alias TaskTimer#addListener
 *  @chainable
 *
 *  @param {TaskTimer.Event} eventName - The name of the event to be added.
 *  @param {Function} listener - The callback function to be invoked per event.
 *  @param {*} [context=this] - The context to invoke the listener with.
 *
 *  @returns {TaskTimer} - `{@link #TaskTimer|TaskTimer}` instance.
 *
 *  @example
 *  const timer = new TaskTimer(1000);
 *  // add a listener to be invoked when timer has stopped.
 *  timer.on(TaskTimer.Event.STOPPED, () => {
 *      console.log('Timer has stopped!');
 *  });
 *  timer.start();
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
 *  A timer utility for running periodic tasks on the given interval ticks. This
 *  is useful when you want to run or schedule multiple tasks on a single timer
 *  instance.
 *
 *  This class extends `EventEmitter3` which is an `EventEmitter` implementation
 *  for both Node and browser. For detailed information, refer to Node.js
 *  documentation.
 *  @class
 *  @global
 *
 *  @extends EventEmitter
 *
 *  @see
 *  {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}
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
     *  // add a task named 'heartbeat' that runs every 5 ticks and a total of 10 times.
     *  const task1 = {
     *      id: 'heartbeat',
     *      tickDelay: 20,   // ticks (to wait before first run)
     *      tickInterval: 5, // ticks (interval)
     *      totalRuns: 10,   // times to run
     *      callback(task) { // can also be an async function, returning a promise
     *          console.log(task.id + ' task has run ' + task.currentRuns + ' times.');
     *      }
     *  };
     *  timer.add(task1).start();
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
         *  Gets or sets the base timer interval in milliseconds.
         *
         *  Since the tasks run on ticks instead of millisecond intervals; this
         *  value operates as the base resolution for all tasks. If you are running
         *  heavy tasks, lower interval requires higher CPU power. This value can be
         *  updated any time.
         *
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
         *  Gets or sets whether timer precision enabled.
         *
         *  Because of the single-threaded, asynchronous nature of JavaScript, each
         *  execution takes a piece of CPU time, and the time they have to wait will
         *  vary, depending on the load. This creates a latency and cumulative
         *  difference in asynchronous timers; that gradually increase the
         *  inacuraccy. `TaskTimer` overcomes this problem as much as possible:
         *
         *  <li>The delay between each tick is auto-adjusted when it's off
         *  due to task/CPU loads or clock drifts.</li>
         *  <li>In Node.js, `TaskTimer` also makes use of `process.hrtime()`
         *  high-resolution real-time. The time is relative to an arbitrary
         *  time in the past (not related to the time of day) and therefore not
         *  subject to clock drifts.</li>
         *  <li>The timer may hit a synchronous / blocking task; or detect significant
         *  time drift (longer than the base interval) due to JS event queue, which
         *  cannot be recovered by simply adjusting the next delay. In this case, right
         *  from the next tick onward; it will auto-recover as much as possible by
         *  running "immediate" tasks until it reaches the proper time vs tick/run
         *  balance.</li>
         *
         *  <blockquote><i>Note that precision will be as high as possible but it still
         *  can be off by a few milliseconds; depending on the CPU or the load.</i>
         *  </blockquote>
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
            var _a = this._, startTime = _a.startTime, stopTime = _a.stopTime;
            var t = {
                started: startTime,
                stopped: stopTime,
                elapsed: 0
            };
            if (startTime) {
                var current = this.state !== TaskTimer.State.STOPPED ? Date.now() : stopTime;
                t.elapsed = current - startTime;
            }
            return Object.freeze(t);
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
     *  @param {Task|ITaskOptions|TaskCallback|Array} task - Either a
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
     *  required to run a task. See {@link api/#Task|class information}.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrdGltZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Rhc2t0aW1lci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvVGFzay50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvVGFza1RpbWVyLnRzIiwid2VicGFjazovL3Rhc2t0aW1lci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7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LFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FB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QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxLQUFLLGtEQUFrRDtBQUN2RCxDQUFDLDhCQUE4QjtBQUMvQjs7Ozs7Ozs7Ozs7OztBQy8wQmE7QUFDYjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxTQUFTLG1CQUFPLENBQUMsNkJBQVE7QUFDekIsU0FBUyxtQkFBTyxDQUFDLHVDQUFhOzs7Ozs7Ozs7Ozs7O0FDTmpCO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixJQUFJO0FBQ3BCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InRhc2t0aW1lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidGFza3RpbWVyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRhc2t0aW1lclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0YXNrdGltZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImxpYi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF8xID0gcmVxdWlyZShcIi5cIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiAgQHByaXZhdGVcbiAqL1xudmFyIERFRkFVTFRfVEFTS19PUFRJT05TID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICB0aWNrRGVsYXk6IDAsXG4gICAgdGlja0ludGVydmFsOiAxLFxuICAgIHRvdGFsUnVuczogbnVsbCxcbiAgICBzdGFydERhdGU6IG51bGwsXG4gICAgc3RvcERhdGU6IG51bGwsXG4gICAgaW1tZWRpYXRlOiBmYWxzZSxcbiAgICByZW1vdmVPbkNvbXBsZXRlZDogZmFsc2UsXG4gICAgY2FsbGJhY2s6IG51bGxcbn0pO1xuLyoqXG4gKiAgUmVwcmVzZW50cyB0aGUgY2xhc3MgdGhhdCBob2xkcyB0aGUgY29uZmlndXJhdGlvbnMgYW5kIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogIHJlcXVpcmVkIHRvIHJ1biBhIHRhc2suXG4gKiAgQGNsYXNzXG4gKi9cbnZhciBUYXNrID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqICBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiBgVGFza2AgY2xhc3MuXG4gICAgICogIEBjb25zdHJ1Y3RvclxuICAgICAqICBAcGFyYW0ge0lUYXNrT3B0aW9uc30gb3B0aW9ucyBUYXNrIG9wdGlvbnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gVGFzayhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJpZFwiLCB7XG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyBQVUJMSUMgKElOU1RBTkNFKSBNRU1CRVJTXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIHVuaXF1ZSBJRCBvZiB0aGUgdGFzay5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjaWRcbiAgICAgICAgICogIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5pZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImVuYWJsZWRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgdGFzayBpcyBjdXJyZW50bHkgZW5hYmxlZC4gVGhpcyBlc3NlbnRpYWxseSBnaXZlc1xuICAgICAgICAgKiAgeW91IGEgbWFudWFsIGNvbnRyb2wgb3ZlciBleGVjdXRpb24uIFRoZSB0YXNrIHdpbGwgYWx3YXlzIGJ5cGFzcyB0aGVcbiAgICAgICAgICogIGNhbGxiYWNrIHdoaWxlIHRoaXMgaXMgc2V0IHRvIGBmYWxzZWAuXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2VuYWJsZWRcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLmVuYWJsZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8uZW5hYmxlZCA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJ0aWNrRGVsYXlcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB0aGUgbnVtYmVyIG9mIHRpY2tzIHRvIGFsbG93IGJlZm9yZSBydW5uaW5nIHRoZSB0YXNrIGZvclxuICAgICAgICAgKiAgdGhlIGZpcnN0IHRpbWUuXG4gICAgICAgICAqICBAbmFtZSBUYXNrI3RpY2tEZWxheVxuICAgICAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy50aWNrRGVsYXk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8udGlja0RlbGF5ID0gdXRpbHNfMS51dGlscy5nZXROdW1iZXIodmFsdWUsIDAsIERFRkFVTFRfVEFTS19PUFRJT05TLnRpY2tEZWxheSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJ0aWNrSW50ZXJ2YWxcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB0aGUgdGljayBpbnRlcnZhbCB0aGF0IHRoZSB0YXNrIHNob3VsZCBiZSBydW4gb24uIFRoZSB1bml0XG4gICAgICAgICAqICBpcyBcInRpY2tzXCIgKG5vdCBtaWxsaXNlY29uZHMpLiBGb3IgaW5zdGFuY2UsIGlmIHRoZSB0aW1lciBpbnRlcnZhbCBpc1xuICAgICAgICAgKiAgYDEwMDBgIG1pbGxpc2Vjb25kcywgYW5kIHdlIGFkZCBhIHRhc2sgd2l0aCBgNWAgdGljayBpbnRlcnZhbHMuIFRoZSB0YXNrXG4gICAgICAgICAqICB3aWxsIHJ1biBvbiBldmVyeSBgNWAgPGI+c2Vjb25kczwvYj4uXG4gICAgICAgICAqICBAbmFtZSBUYXNrI3RpY2tJbnRlcnZhbFxuICAgICAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy50aWNrSW50ZXJ2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8udGlja0ludGVydmFsID0gdXRpbHNfMS51dGlscy5nZXROdW1iZXIodmFsdWUsIDEsIERFRkFVTFRfVEFTS19PUFRJT05TLnRpY2tJbnRlcnZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJ0b3RhbFJ1bnNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRoZSB0YXNrIHNob3VsZCBiZSBydW4uIGAwYCBvclxuICAgICAgICAgKiAgYG51bGxgIG1lYW5zIHVubGltaXRlZCAodW50aWwgdGhlIHRpbWVyIGhhcyBzdG9wcGVkKS5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjdG90YWxSdW5zXG4gICAgICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnRvdGFsUnVucztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy50b3RhbFJ1bnMgPSB1dGlsc18xLnV0aWxzLmdldE51bWJlcih2YWx1ZSwgMCwgREVGQVVMVF9UQVNLX09QVElPTlMudG90YWxSdW5zKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImltbWVkaWF0ZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU3BlY2lmaWVzIHdoZXRoZXIgdG8gd3JhcCBjYWxsYmFjayBpbiBhIGBzZXRJbW1lZGlhdGUoKWAgY2FsbCBiZWZvcmVcbiAgICAgICAgICogIGV4ZWN1dGluZy4gVGhpcyBjYW4gYmUgdXNlZnVsIGlmIHRoZSB0YXNrIGlzIG5vdCBkb2luZyBhbnkgSS9PIG9yIHVzaW5nXG4gICAgICAgICAqICBhbnkgSlMgdGltZXJzIGJ1dCBzeW5jaHJvbm91c2x5IGJsb2NraW5nIHRoZSBldmVudCBsb29wLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNpbW1lZGlhdGVcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLmltbWVkaWF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5pbW1lZGlhdGUgPSB1dGlsc18xLnV0aWxzLmdldEJvb2wodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImN1cnJlbnRSdW5zXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBudW1iZXIgb2YgdGltZXMsIHRoaXMgdGFzayBoYXMgYmVlbiBydW4uXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2N1cnJlbnRSdW5zXG4gICAgICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uY3VycmVudFJ1bnM7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJ0aW1lXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRpbWUgaW5mb3JtYXRpb24gZm9yIHRoZSBsaWZldGltZSBvZiBhIHRhc2suXG4gICAgICAgICAqICBgI3RpbWUuc3RhcnRlZGAgaW5kaWNhdGVzIHRoZSBmaXJzdCBleGVjdXRpb24gdGltZSBvZiBhIHRhc2suXG4gICAgICAgICAqICBgI3RpbWUuc3RvcHBlZGAgaW5kaWNhdGVzIHRoZSBsYXN0IGV4ZWN1dGlvbiB0aW1lIG9mIGEgdGFzay4gKGAwYCBpZiBzdGlsbCBydW5uaW5nLilcbiAgICAgICAgICogIGAjdGltZS5lbGFwc2VkYCBpbmRpY2F0ZXMgdGhlIHRvdGFsIGxpZmV0aW1lIG9mIGEgdGFzay5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjdGltZVxuICAgICAgICAgKiAgQHR5cGUge0lUaW1lSW5mb31cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRlZCA9IHRoaXMuXy50aW1lT25GaXJzdFJ1biB8fCAwO1xuICAgICAgICAgICAgdmFyIHN0b3BwZWQgPSB0aGlzLl8udGltZU9uTGFzdFJ1biB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgICAgICAgICAgIHN0YXJ0ZWQ6IHN0YXJ0ZWQsXG4gICAgICAgICAgICAgICAgc3RvcHBlZDogc3RvcHBlZCxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiBzdG9wcGVkIC0gc3RhcnRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJjYWxsYmFja1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gZWFjaCBydW4uXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2NhbGxiYWNrXG4gICAgICAgICAqICBAdHlwZSB7VGFza0NhbGxiYWNrfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uY2FsbGJhY2s7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJyZW1vdmVPbkNvbXBsZXRlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gcmVtb3ZlIHRoZSB0YXNrICh0byBmcmVlIHVwIG1lbW9yeSkgd2hlbiB0YXNrXG4gICAgICAgICAqICBoYXMgY29tcGxldGVkIGl0cyBleGVjdXRpb25zIChydW5zKS4gRm9yIHRoaXMgdG8gdGFrZSBhZmZlY3QsIHRoZSB0YXNrXG4gICAgICAgICAqICBzaG91bGQgaGF2ZSBgdG90YWxSdW5zYCBhbmQvb3IgYHN0b3BEYXRlYCBjb25maWd1cmVkLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNyZW1vdmVPbkNvbXBsZXRlZFxuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8ucmVtb3ZlT25Db21wbGV0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8ucmVtb3ZlT25Db21wbGV0ZWQgPSB1dGlsc18xLnV0aWxzLmdldEJvb2wodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImNvbXBsZXRlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHRhc2sgaGFzIGNvbXBsZXRlZCBhbGwgcnVucyAoZXhlY3V0aW9ucykgb3JcbiAgICAgICAgICogIGBzdG9wRGF0ZWAgaXMgcmVhY2hlZC4gTm90ZSB0aGF0IGlmIGJvdGggYHRvdGFsUnVuc2AgYW5kIGBzdG9wRGF0ZWAgYXJlXG4gICAgICAgICAqICBvbWl0dGVkLCB0aGlzIHdpbGwgbmV2ZXIgcmV0dXJuIGB0cnVlYDsgc2luY2UgdGhlIHRhc2sgaGFzIG5vIGV4ZWN1dGlvblxuICAgICAgICAgKiAgbGltaXQgc2V0LlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNjb21wbGV0ZWRcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBmYXN0ZXIgaWYgYWxyZWFkeSBjb21wbGV0ZWRcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXJrZWRDb21wbGV0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbigodGhpcy50b3RhbFJ1bnMgJiYgdGhpcy5jdXJyZW50UnVucyA+PSB0aGlzLnRvdGFsUnVucylcbiAgICAgICAgICAgICAgICB8fCAodGhpcy5fLnN0b3BEYXRlICYmIERhdGUubm93KCkgPj0gdGhpcy5fLnN0b3BEYXRlKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJjYW5SdW5PblRpY2tcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0YXNrIGNhbiBydW4gb24gdGhlIGN1cnJlbnQgdGljayBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBAcHJpdmF0ZVxuICAgICAgICAgKiAgQG5hbWUgVGFzayNjYW5SdW5PblRpY2tcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXJrZWRDb21wbGV0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRpY2tDb3VudCA9IHRoaXMuXy5zdGFydERhdGVcbiAgICAgICAgICAgICAgICA/IE1hdGguY2VpbCgoRGF0ZS5ub3coKSAtIE51bWJlcih0aGlzLl8uc3RhcnREYXRlKSkgLyB0aGlzLl90aW1lci5pbnRlcnZhbClcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3RpbWVyLnRpY2tDb3VudDtcbiAgICAgICAgICAgIHZhciB0aW1lVG9SdW4gPSAhdGhpcy5fLnN0YXJ0RGF0ZSB8fCBEYXRlLm5vdygpID49IHRoaXMuXy5zdGFydERhdGU7XG4gICAgICAgICAgICB2YXIgb25JbnRlcnZhbCA9IHRpY2tDb3VudCA+IHRoaXMudGlja0RlbGF5ICYmICh0aWNrQ291bnQgLSB0aGlzLnRpY2tEZWxheSkgJSB0aGlzLnRpY2tJbnRlcnZhbCA9PT0gMDtcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRpbWVUb1J1biAmJiBvbkludGVydmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogIFJlc2V0cyB0aGUgY3VycmVudCBudW1iZXIgb2YgcnVucy4gVGhpcyB3aWxsIGtlZXAgdGhlIHRhc2sgcnVubmluZyBmb3JcbiAgICAgKiAgdGhlIHNhbWUgYW1vdW50IG9mIGB0aWNrSW50ZXJ2YWxzYCBpbml0aWFsbHkgY29uZmlndXJlZC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEBwYXJhbSB7SVRhc2tCYXNlT3B0aW9uc30gW29wdGlvbnNdIElmIHNldCwgdGhpcyB3aWxsIGFsc28gcmUtY29uZmlndXJlIHRoZSB0YXNrLlxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrfVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fLmN1cnJlbnRSdW5zID0gMDtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IG9wdGlvbnMuaWQ7XG4gICAgICAgICAgICBpZiAoaWQgJiYgaWQgIT09IHRoaXMuaWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2hhbmdlIElEIG9mIGEgdGFzay4nKTtcbiAgICAgICAgICAgIG9wdGlvbnMuaWQgPSB0aGlzLmlkO1xuICAgICAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTZXJpYWxpemF0aW9uIHRvIEpTT04uXG4gICAgICpcbiAgICAgKiAgTmV2ZXIgcmV0dXJuIHN0cmluZyBmcm9tIGB0b0pTT04oKWAuIEl0IHNob3VsZCByZXR1cm4gYW4gb2JqZWN0LlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9iaiA9IF9fYXNzaWduKHt9LCB0aGlzLl8pO1xuICAgICAgICBkZWxldGUgb2JqLmNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFJJVkFURSAoSU5TVEFOQ0UpIE1FTUJFUlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgU2V0IHJlZmVyZW5jZSB0byB0aW1lciBpdHNlbGYuXG4gICAgICogIE9ubHkgY2FsbGVkIGJ5IGBUYXNrVGltZXJgLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFzay5wcm90b3R5cGUuX3NldFRpbWVyID0gZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gdGltZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5fZW1pdCA9IGZ1bmN0aW9uIChuYW1lLCBvYmplY3QpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgICB9O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGV2ZW50LmVycm9yID0gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuZGF0YSA9IG9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lci5lbWl0KG5hbWUsIGV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBgVGFza1RpbWVyYCBzaG91bGQgYmUgaW5mb3JtZWQgaWYgdGhpcyB0YXNrIGlzIGNvbXBsZXRlZC4gQnV0IGV4ZWN1dGlvblxuICAgICAqICBzaG91bGQgYmUgZmluaXNoZWQuIFNvIHdlIGRvIHRoaXMgd2l0aGluIHRoZSBgZG9uZSgpYCBmdW5jdGlvbi5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5fZG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZWRDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fLnRpbWVPbkxhc3RSdW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIuX3Rhc2tDb21wbGV0ZWQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLl9leGVjQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbyA9IHRoaXMuY2FsbGJhY2suYXBwbHkodGhpcywgW3RoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9kb25lKCk7IH1dKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlZCBieSBkb25lKCkgKGNhbGxlZCB3aXRoaW4gdGhlIHRhc2sgY2FsbGJhY2sgYnkgdGhlIHVzZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1dGlsc18xLnV0aWxzLmlzUHJvbWlzZShvKSkge1xuICAgICAgICAgICAgICAgIG8udGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9kb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2VtaXQoXzEuVGFza1RpbWVyLkV2ZW50LlRBU0tfRVJST1IsIGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5fZW1pdChfMS5UYXNrVGltZXIuRXZlbnQuVEFTS19FUlJPUiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIE9ubHkgdXNlZCBieSBgVGFza1RpbWVyYC5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICAvLyBAdHMtaWdub3JlOiBUUzYxMzM6IGRlY2xhcmVkIGJ1dCBuZXZlciByZWFkLlxuICAgIFRhc2sucHJvdG90eXBlLl9ydW4gPSBmdW5jdGlvbiAob25SdW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5fbWFya2VkQ29tcGxldGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UnVucyA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuXy50aW1lT25GaXJzdFJ1biA9IERhdGUubm93KCk7XG4gICAgICAgIC8vIGN1cnJlbnQgcnVucyBzaG91bGQgYmUgc2V0IGJlZm9yZSBleGVjdXRpb24gb3IgaXQgbWlnaHQgZmxvdyBpZiBzb21lXG4gICAgICAgIC8vIGFzeW5jIHJ1bnMgZmluaXNoZXMgZmFzdGVyIGFuZCBzb21lIG90aGVyIHNsb3dlci5cbiAgICAgICAgdGhpcy5fLmN1cnJlbnRSdW5zKys7XG4gICAgICAgIG9uUnVuKCk7XG4gICAgICAgIGlmICh0aGlzLmltbWVkaWF0ZSkge1xuICAgICAgICAgICAgdXRpbHNfMS51dGlscy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX2V4ZWNDYWxsYmFjaygpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWNDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5pZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHVuaXF1ZSB0YXNrIElEIGlzIHJlcXVpcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIHJlcXVpcmVkIGZvciBhIHRhc2sgdG8gcnVuLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydERhdGUgPSBvcHRpb25zLnN0YXJ0RGF0ZSwgc3RvcERhdGUgPSBvcHRpb25zLnN0b3BEYXRlO1xuICAgICAgICBpZiAoc3RhcnREYXRlICYmIHN0b3BEYXRlICYmIHN0YXJ0RGF0ZSA+PSBzdG9wRGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUYXNrIHN0YXJ0IGRhdGUgY2Fubm90IGJlIHRoZSBzYW1lIG9yIGFmdGVyIHN0b3AgZGF0ZS4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXJrZWRDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fID0gX19hc3NpZ24oeyBjdXJyZW50UnVuczogMCB9LCBERUZBVUxUX1RBU0tfT1BUSU9OUyk7XG4gICAgICAgIHRoaXMuXy5pZCA9IFN0cmluZyhvcHRpb25zLmlkKTtcbiAgICAgICAgdGhpcy5fLmNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fLnN0YXJ0RGF0ZSA9IG9wdGlvbnMuc3RhcnREYXRlIHx8IG51bGw7XG4gICAgICAgIHRoaXMuXy5zdG9wRGF0ZSA9IG9wdGlvbnMuc3RvcERhdGUgfHwgbnVsbDtcbiAgICAgICAgLy8gdXNpbmcgc2V0dGVycyBmb3IgdmFsaWRhdGlvbiAmIGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG9wdGlvbnMuZW5hYmxlZDtcbiAgICAgICAgdGhpcy50aWNrRGVsYXkgPSBvcHRpb25zLnRpY2tEZWxheTtcbiAgICAgICAgdGhpcy50aWNrSW50ZXJ2YWwgPSBvcHRpb25zLnRpY2tJbnRlcnZhbDtcbiAgICAgICAgdGhpcy50b3RhbFJ1bnMgPSBvcHRpb25zLnRvdGFsUnVucztcbiAgICAgICAgdGhpcy5pbW1lZGlhdGUgPSBvcHRpb25zLmltbWVkaWF0ZTtcbiAgICAgICAgdGhpcy5yZW1vdmVPbkNvbXBsZXRlZCA9IG9wdGlvbnMucmVtb3ZlT25Db21wbGV0ZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gVGFzaztcbn0oKSk7XG5leHBvcnRzLlRhc2sgPSBUYXNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtZmlsZS1saW5lLWNvdW50ICovXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGRlcCBtb2R1bGVzXG52YXIgZXZlbnRlbWl0dGVyM18xID0gcmVxdWlyZShcImV2ZW50ZW1pdHRlcjNcIik7XG4vLyBvd24gbW9kdWxlc1xudmFyIF8xID0gcmVxdWlyZShcIi5cIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiAgQHByaXZhdGVcbiAqL1xudmFyIERFRkFVTFRfVElNRVJfT1BUSU9OUyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGludGVydmFsOiAxMDAwLFxuICAgIHByZWNpc2lvbjogdHJ1ZSxcbiAgICBzdG9wT25Db21wbGV0ZWQ6IGZhbHNlXG59KTtcbi8qKlxuICogIFRhc2tUaW1lciDigKIgaHR0cHM6Ly9naXRodWIuY29tL29udXJ5L3Rhc2t0aW1lclxuICogIEBsaWNlbnNlIE1JVFxuICogIEBjb3B5cmlnaHQgMjAxOSwgT251ciBZxLFsZMSxcsSxbSA8b251ckBjdXRlcGlsb3QuY29tPlxuICovXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV2ZW50RW1pdHRlciBEb2NzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50IG5hbWUuXG4gKiAgQG5hbWUgVGFza1RpbWVyI2VtaXRcbiAqICBAZnVuY3Rpb25cbiAqXG4gKiAgQHBhcmFtIHtUYXNrVGltZXIuRXZlbnR9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSBlbWl0dGVkLlxuICogIEBwYXJhbSB7YW55fSBbZGF0YV0gLSBEYXRhIHRvIGJlIHBhc3NlZCB0byBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogIEByZXR1cm5zIHtCb29sZWFufSAtIGB0cnVlYCBpZiB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycywgZWxzZSBgZmFsc2VgLlxuICovXG4vKipcbiAqICBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogIGxpc3RlbmVycy5cbiAqICBAbmFtZSBUYXNrVGltZXIjZXZlbnROYW1lc1xuICogIEBmdW5jdGlvblxuICpcbiAqICBAcmV0dXJucyB7QXJyYXl9IC0gTGlzdCBvZiBldmVudCBuYW1lcy5cbiAqL1xuLyoqXG4gKiAgQWRkcyB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIGVuZCBvZiB0aGUgbGlzdGVuZXJzIGFycmF5IGZvciB0aGUgZXZlbnRcbiAqICBuYW1lZCBgZXZlbnROYW1lYC4gTm8gY2hlY2tzIGFyZSBtYWRlIHRvIHNlZSBpZiB0aGUgbGlzdGVuZXIgaGFzIGFscmVhZHlcbiAqICBiZWVuIGFkZGVkLiBNdWx0aXBsZSBjYWxscyBwYXNzaW5nIHRoZSBzYW1lIGNvbWJpbmF0aW9uIG9mIGBldmVudE5hbWVgIGFuZFxuICogIGBsaXN0ZW5lcmAgd2lsbCByZXN1bHQgaW4gdGhlIGxpc3RlbmVyIGJlaW5nIGFkZGVkLCBhbmQgY2FsbGVkLCBtdWx0aXBsZVxuICogIHRpbWVzLlxuICogIEBuYW1lIFRhc2tUaW1lciNvblxuICogIEBmdW5jdGlvblxuICogIEBhbGlhcyBUYXNrVGltZXIjYWRkTGlzdGVuZXJcbiAqICBAY2hhaW5hYmxlXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgYWRkZWQuXG4gKiAgQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBwZXIgZXZlbnQuXG4gKiAgQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSAtIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqXG4gKiAgQHJldHVybnMge1Rhc2tUaW1lcn0gLSBge0BsaW5rICNUYXNrVGltZXJ8VGFza1RpbWVyfWAgaW5zdGFuY2UuXG4gKlxuICogIEBleGFtcGxlXG4gKiAgY29uc3QgdGltZXIgPSBuZXcgVGFza1RpbWVyKDEwMDApO1xuICogIC8vIGFkZCBhIGxpc3RlbmVyIHRvIGJlIGludm9rZWQgd2hlbiB0aW1lciBoYXMgc3RvcHBlZC5cbiAqICB0aW1lci5vbihUYXNrVGltZXIuRXZlbnQuU1RPUFBFRCwgKCkgPT4ge1xuICogICAgICBjb25zb2xlLmxvZygnVGltZXIgaGFzIHN0b3BwZWQhJyk7XG4gKiAgfSk7XG4gKiAgdGltZXIuc3RhcnQoKTtcbiAqL1xuLyoqXG4gKiAgQWRkcyBhIG9uZSB0aW1lIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZXZlbnQgbmFtZWQgYGV2ZW50TmFtZWAuIFRoZSBuZXh0XG4gKiAgdGltZSBgZXZlbnROYW1lYCBpcyB0cmlnZ2VyZWQsIHRoaXMgYGxpc3RlbmVyYCBpcyByZW1vdmVkIGFuZCB0aGVuIGludm9rZWQuXG4gKiAgQG5hbWUgVGFza1RpbWVyI29uY2VcbiAqICBAZnVuY3Rpb25cbiAqICBAY2hhaW5hYmxlXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgYWRkZWQuXG4gKiAgQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBwZXIgZXZlbnQuXG4gKiAgQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSAtIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqXG4gKiAgQHJldHVybnMge1Rhc2tUaW1lcn0gLSBge0BsaW5rICNUYXNrVGltZXJ8VGFza1RpbWVyfWAgaW5zdGFuY2UuXG4gKi9cbi8qKlxuICogIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBgbGlzdGVuZXJgIGZyb20gdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgZXZlbnRcbiAqICBuYW1lZCBgZXZlbnROYW1lYC5cbiAqICBAbmFtZSBUYXNrVGltZXIjb2ZmXG4gKiAgQGZ1bmN0aW9uXG4gKiAgQGFsaWFzIFRhc2tUaW1lciNyZW1vdmVMaXN0ZW5lclxuICogIEBjaGFpbmFibGVcbiAqXG4gKiAgQHBhcmFtIHtUYXNrVGltZXIuRXZlbnR9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSByZW1vdmVkLlxuICogIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgcGVyIGV2ZW50LlxuICogIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gLSBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiAgQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gLSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKlxuICogIEByZXR1cm5zIHtUYXNrVGltZXJ9IC0gYHtAbGluayAjVGFza1RpbWVyfFRhc2tUaW1lcn1gIGluc3RhbmNlLlxuICovXG4vKipcbiAqICBHZXRzIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGxpc3RlbmluZyB0byBhIGdpdmVuIGV2ZW50LlxuICogIEBuYW1lIFRhc2tUaW1lciNsaXN0ZW5lckNvdW50XG4gKiAgQGZ1bmN0aW9uXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gKlxuICogIEByZXR1cm5zIHtOdW1iZXJ9IC0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKi9cbi8qKlxuICogIEdldHMgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICogIEBuYW1lIFRhc2tUaW1lciNsaXN0ZW5lcnNcbiAqICBAZnVuY3Rpb25cbiAqXG4gKiAgQHBhcmFtIHtUYXNrVGltZXIuRXZlbnR9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAqXG4gKiAgQHJldHVybnMge0FycmF5fSAtIFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqL1xuLyoqXG4gKiAgUmVtb3ZlcyBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGBldmVudE5hbWVgLlxuICogIEBuYW1lIFRhc2tUaW1lciNyZW1vdmVBbGxMaXN0ZW5lcnNcbiAqICBAZnVuY3Rpb25cbiAqICBAY2hhaW5hYmxlXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBbZXZlbnROYW1lXSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSByZW1vdmVkLlxuICpcbiAqICBAcmV0dXJucyB7VGFza1RpbWVyfSAtIGB7QGxpbmsgI1Rhc2tUaW1lcnxUYXNrVGltZXJ9YCBpbnN0YW5jZS5cbiAqL1xuLyoqXG4gKiAgQSB0aW1lciB1dGlsaXR5IGZvciBydW5uaW5nIHBlcmlvZGljIHRhc2tzIG9uIHRoZSBnaXZlbiBpbnRlcnZhbCB0aWNrcy4gVGhpc1xuICogIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIHJ1biBvciBzY2hlZHVsZSBtdWx0aXBsZSB0YXNrcyBvbiBhIHNpbmdsZSB0aW1lclxuICogIGluc3RhbmNlLlxuICpcbiAqICBUaGlzIGNsYXNzIGV4dGVuZHMgYEV2ZW50RW1pdHRlcjNgIHdoaWNoIGlzIGFuIGBFdmVudEVtaXR0ZXJgIGltcGxlbWVudGF0aW9uXG4gKiAgZm9yIGJvdGggTm9kZSBhbmQgYnJvd3Nlci4gRm9yIGRldGFpbGVkIGluZm9ybWF0aW9uLCByZWZlciB0byBOb2RlLmpzXG4gKiAgZG9jdW1lbnRhdGlvbi5cbiAqICBAY2xhc3NcbiAqICBAZ2xvYmFsXG4gKlxuICogIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICpcbiAqICBAc2VlXG4gKiAge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2NsYXNzX2V2ZW50ZW1pdHRlcnxFdmVudEVtaXR0ZXJ9XG4gKi9cbnZhciBUYXNrVGltZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhc2tUaW1lciwgX3N1cGVyKTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBDT05TVFJVQ1RPUlxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqICBDb25zdHJ1Y3RzIGEgbmV3IGBUYXNrVGltZXJgIGluc3RhbmNlIHdpdGggdGhlIGdpdmVuIHRpbWUgaW50ZXJ2YWwgKGluXG4gICAgICogIG1pbGxpc2Vjb25kcykuXG4gICAgICogIEBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogIEBwYXJhbSB7SVRhc2tUaW1lck9wdGlvbnN8bnVtYmVyfSBbb3B0aW9uc10gLSBFaXRoZXIgVGFza1RpbWVyIG9wdGlvbnNcbiAgICAgKiAgb3IgYSBiYXNlIGludGVydmFsIChpbiBtaWxsaXNlY29uZHMpLiBTaW5jZSB0aGUgdGFza3MgcnVuIG9uIHRpY2tzXG4gICAgICogIGluc3RlYWQgb2YgbWlsbGlzZWNvbmQgaW50ZXJ2YWxzOyB0aGlzIHZhbHVlIG9wZXJhdGVzIGFzIHRoZSBiYXNlXG4gICAgICogIHJlc29sdXRpb24gZm9yIGFsbCB0YXNrcy4gSWYgeW91IGFyZSBydW5uaW5nIGhlYXZ5IHRhc2tzLCBsb3dlciBpbnRlcnZhbFxuICAgICAqICByZXF1aXJlcyBoaWdoZXIgQ1BVIHBvd2VyLiBUaGlzIHZhbHVlIGNhbiBiZSB1cGRhdGVkIGFueSB0aW1lIGJ5IHNldHRpbmdcbiAgICAgKiAgdGhlIGBpbnRlcnZhbGAgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogIEBleGFtcGxlXG4gICAgICogIGNvbnN0IHRpbWVyID0gbmV3IFRhc2tUaW1lcigxMDAwKTsgLy8gbWlsbGlzZWNvbmRzXG4gICAgICogIC8vIEV4ZWN1dGUgc29tZSBjb2RlIG9uIGVhY2ggdGljay4uLlxuICAgICAqICB0aW1lci5vbigndGljaycsICgpID0+IHtcbiAgICAgKiAgICAgIGNvbnNvbGUubG9nKCd0aWNrIGNvdW50OiAnICsgdGltZXIudGlja0NvdW50KTtcbiAgICAgKiAgICAgIGNvbnNvbGUubG9nKCdlbGFwc2VkIHRpbWU6ICcgKyB0aW1lci50aW1lLmVsYXBzZWQgKyAnIG1zLicpO1xuICAgICAqICB9KTtcbiAgICAgKiAgLy8gYWRkIGEgdGFzayBuYW1lZCAnaGVhcnRiZWF0JyB0aGF0IHJ1bnMgZXZlcnkgNSB0aWNrcyBhbmQgYSB0b3RhbCBvZiAxMCB0aW1lcy5cbiAgICAgKiAgY29uc3QgdGFzazEgPSB7XG4gICAgICogICAgICBpZDogJ2hlYXJ0YmVhdCcsXG4gICAgICogICAgICB0aWNrRGVsYXk6IDIwLCAgIC8vIHRpY2tzICh0byB3YWl0IGJlZm9yZSBmaXJzdCBydW4pXG4gICAgICogICAgICB0aWNrSW50ZXJ2YWw6IDUsIC8vIHRpY2tzIChpbnRlcnZhbClcbiAgICAgKiAgICAgIHRvdGFsUnVuczogMTAsICAgLy8gdGltZXMgdG8gcnVuXG4gICAgICogICAgICBjYWxsYmFjayh0YXNrKSB7IC8vIGNhbiBhbHNvIGJlIGFuIGFzeW5jIGZ1bmN0aW9uLCByZXR1cm5pbmcgYSBwcm9taXNlXG4gICAgICogICAgICAgICAgY29uc29sZS5sb2codGFzay5pZCArICcgdGFzayBoYXMgcnVuICcgKyB0YXNrLmN1cnJlbnRSdW5zICsgJyB0aW1lcy4nKTtcbiAgICAgKiAgICAgIH1cbiAgICAgKiAgfTtcbiAgICAgKiAgdGltZXIuYWRkKHRhc2sxKS5zdGFydCgpO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFRhc2tUaW1lcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl90aW1lb3V0UmVmID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2ltbWVkaWF0ZVJlZiA9IG51bGw7XG4gICAgICAgIF90aGlzLl9ydW5Db3VudCA9IDA7XG4gICAgICAgIF90aGlzLl9yZXNldCgpO1xuICAgICAgICBfdGhpcy5fLm9wdHMgPSB7fTtcbiAgICAgICAgdmFyIG9wdHMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8geyBpbnRlcnZhbDogb3B0aW9ucyB9XG4gICAgICAgICAgICA6IG9wdGlvbnMgfHwge307XG4gICAgICAgIF90aGlzLmludGVydmFsID0gb3B0cy5pbnRlcnZhbDtcbiAgICAgICAgX3RoaXMucHJlY2lzaW9uID0gb3B0cy5wcmVjaXNpb247XG4gICAgICAgIF90aGlzLnN0b3BPbkNvbXBsZXRlZCA9IG9wdHMuc3RvcE9uQ29tcGxldGVkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcImludGVydmFsXCIsIHtcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIFBVQkxJQyAoSU5TVEFOQ0UpIFBST1BFUlRJRVNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSBiYXNlIHRpbWVyIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogIFNpbmNlIHRoZSB0YXNrcyBydW4gb24gdGlja3MgaW5zdGVhZCBvZiBtaWxsaXNlY29uZCBpbnRlcnZhbHM7IHRoaXNcbiAgICAgICAgICogIHZhbHVlIG9wZXJhdGVzIGFzIHRoZSBiYXNlIHJlc29sdXRpb24gZm9yIGFsbCB0YXNrcy4gSWYgeW91IGFyZSBydW5uaW5nXG4gICAgICAgICAqICBoZWF2eSB0YXNrcywgbG93ZXIgaW50ZXJ2YWwgcmVxdWlyZXMgaGlnaGVyIENQVSBwb3dlci4gVGhpcyB2YWx1ZSBjYW4gYmVcbiAgICAgICAgICogIHVwZGF0ZWQgYW55IHRpbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjaW50ZXJ2YWxcbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8ub3B0cy5pbnRlcnZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5vcHRzLmludGVydmFsID0gdXRpbHNfMS51dGlscy5nZXROdW1iZXIodmFsdWUsIDIwLCBERUZBVUxUX1RJTUVSX09QVElPTlMuaW50ZXJ2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJwcmVjaXNpb25cIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRpbWVyIHByZWNpc2lvbiBlbmFibGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiAgQmVjYXVzZSBvZiB0aGUgc2luZ2xlLXRocmVhZGVkLCBhc3luY2hyb25vdXMgbmF0dXJlIG9mIEphdmFTY3JpcHQsIGVhY2hcbiAgICAgICAgICogIGV4ZWN1dGlvbiB0YWtlcyBhIHBpZWNlIG9mIENQVSB0aW1lLCBhbmQgdGhlIHRpbWUgdGhleSBoYXZlIHRvIHdhaXQgd2lsbFxuICAgICAgICAgKiAgdmFyeSwgZGVwZW5kaW5nIG9uIHRoZSBsb2FkLiBUaGlzIGNyZWF0ZXMgYSBsYXRlbmN5IGFuZCBjdW11bGF0aXZlXG4gICAgICAgICAqICBkaWZmZXJlbmNlIGluIGFzeW5jaHJvbm91cyB0aW1lcnM7IHRoYXQgZ3JhZHVhbGx5IGluY3JlYXNlIHRoZVxuICAgICAgICAgKiAgaW5hY3VyYWNjeS4gYFRhc2tUaW1lcmAgb3ZlcmNvbWVzIHRoaXMgcHJvYmxlbSBhcyBtdWNoIGFzIHBvc3NpYmxlOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgPGxpPlRoZSBkZWxheSBiZXR3ZWVuIGVhY2ggdGljayBpcyBhdXRvLWFkanVzdGVkIHdoZW4gaXQncyBvZmZcbiAgICAgICAgICogIGR1ZSB0byB0YXNrL0NQVSBsb2FkcyBvciBjbG9jayBkcmlmdHMuPC9saT5cbiAgICAgICAgICogIDxsaT5JbiBOb2RlLmpzLCBgVGFza1RpbWVyYCBhbHNvIG1ha2VzIHVzZSBvZiBgcHJvY2Vzcy5ocnRpbWUoKWBcbiAgICAgICAgICogIGhpZ2gtcmVzb2x1dGlvbiByZWFsLXRpbWUuIFRoZSB0aW1lIGlzIHJlbGF0aXZlIHRvIGFuIGFyYml0cmFyeVxuICAgICAgICAgKiAgdGltZSBpbiB0aGUgcGFzdCAobm90IHJlbGF0ZWQgdG8gdGhlIHRpbWUgb2YgZGF5KSBhbmQgdGhlcmVmb3JlIG5vdFxuICAgICAgICAgKiAgc3ViamVjdCB0byBjbG9jayBkcmlmdHMuPC9saT5cbiAgICAgICAgICogIDxsaT5UaGUgdGltZXIgbWF5IGhpdCBhIHN5bmNocm9ub3VzIC8gYmxvY2tpbmcgdGFzazsgb3IgZGV0ZWN0IHNpZ25pZmljYW50XG4gICAgICAgICAqICB0aW1lIGRyaWZ0IChsb25nZXIgdGhhbiB0aGUgYmFzZSBpbnRlcnZhbCkgZHVlIHRvIEpTIGV2ZW50IHF1ZXVlLCB3aGljaFxuICAgICAgICAgKiAgY2Fubm90IGJlIHJlY292ZXJlZCBieSBzaW1wbHkgYWRqdXN0aW5nIHRoZSBuZXh0IGRlbGF5LiBJbiB0aGlzIGNhc2UsIHJpZ2h0XG4gICAgICAgICAqICBmcm9tIHRoZSBuZXh0IHRpY2sgb253YXJkOyBpdCB3aWxsIGF1dG8tcmVjb3ZlciBhcyBtdWNoIGFzIHBvc3NpYmxlIGJ5XG4gICAgICAgICAqICBydW5uaW5nIFwiaW1tZWRpYXRlXCIgdGFza3MgdW50aWwgaXQgcmVhY2hlcyB0aGUgcHJvcGVyIHRpbWUgdnMgdGljay9ydW5cbiAgICAgICAgICogIGJhbGFuY2UuPC9saT5cbiAgICAgICAgICpcbiAgICAgICAgICogIDxibG9ja3F1b3RlPjxpPk5vdGUgdGhhdCBwcmVjaXNpb24gd2lsbCBiZSBhcyBoaWdoIGFzIHBvc3NpYmxlIGJ1dCBpdCBzdGlsbFxuICAgICAgICAgKiAgY2FuIGJlIG9mZiBieSBhIGZldyBtaWxsaXNlY29uZHM7IGRlcGVuZGluZyBvbiB0aGUgQ1BVIG9yIHRoZSBsb2FkLjwvaT5cbiAgICAgICAgICogIDwvYmxvY2txdW90ZT5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciNwcmVjaXNpb25cbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLm9wdHMucHJlY2lzaW9uO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLm9wdHMucHJlY2lzaW9uID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBERUZBVUxUX1RJTUVSX09QVElPTlMucHJlY2lzaW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwic3RvcE9uQ29tcGxldGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgdGltZXIgc2hvdWxkIGF1dG9tYXRpY2FsbHkgc3RvcCB3aGVuIGFsbCB0YXNrc1xuICAgICAgICAgKiAgYXJlIGNvbXBsZXRlZC4gRm9yIHRoaXMgdG8gdGFrZSBhZmZlY3QsIGFsbCBhZGRlZCB0YXNrcyBzaG91bGQgaGF2ZVxuICAgICAgICAgKiAgYHRvdGFsUnVuc2AgYW5kL29yIGBzdG9wRGF0ZWAgY29uZmlndXJlZC4gVGhpcyBvcHRpb24gY2FuIGJlIHNldC9jaGFuZ2VkXG4gICAgICAgICAqICBhdCBhbnkgdGltZS5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciNzdG9wT25Db21wbGV0ZWRcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLm9wdHMuc3RvcE9uQ29tcGxldGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLm9wdHMuc3RvcE9uQ29tcGxldGVkID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBERUZBVUxUX1RJTUVSX09QVElPTlMuc3RvcE9uQ29tcGxldGVkKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwic3RhdGVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgRm9yIHBvc3NpYmxlIHZhbHVlcywgc2VlIGBUYXNrVGltZXIuU3RhdGVgIGVudW1lcmF0aW9uLlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI3N0YXRlXG4gICAgICAgICAqICBAdHlwZSB7VGFza1RpbWVyLlN0YXRlfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uc3RhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRpbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGltZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGxhdGVzdCBydW4gb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgYCN0aW1lLnN0YXJ0ZWRgIGluZGljYXRlcyB0aGUgc3RhcnQgdGltZSBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBgI3RpbWUuc3RvcHBlZGAgaW5kaWNhdGVzIHRoZSBzdG9wIHRpbWUgb2YgdGhlIHRpbWVyLiAoYDBgIGlmIHN0aWxsIHJ1bm5pbmcuKVxuICAgICAgICAgKiAgYCN0aW1lLmVsYXBzZWRgIGluZGljYXRlcyB0aGUgZWxhcHNlZCB0aW1lIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciN0aW1lXG4gICAgICAgICAqICBAdHlwZSB7SVRpbWVJbmZvfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuXywgc3RhcnRUaW1lID0gX2Euc3RhcnRUaW1lLCBzdG9wVGltZSA9IF9hLnN0b3BUaW1lO1xuICAgICAgICAgICAgdmFyIHQgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnRlZDogc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgIHN0b3BwZWQ6IHN0b3BUaW1lLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuU1RPUFBFRCA/IERhdGUubm93KCkgOiBzdG9wVGltZTtcbiAgICAgICAgICAgICAgICB0LmVsYXBzZWQgPSBjdXJyZW50IC0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRpY2tDb3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgY3VycmVudCB0aWNrIGNvdW50IGZvciB0aGUgbGF0ZXN0IHJ1biBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBUaGlzIHZhbHVlIHdpbGwgYmUgcmVzZXQgdG8gYDBgIHdoZW4gdGhlIHRpbWVyIGlzIHN0b3BwZWQgb3IgcmVzZXQuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjdGlja0NvdW50XG4gICAgICAgICAqICBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udGlja0NvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJ0YXNrQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIGN1cnJlbnQgdGFzayBjb3VudC4gVGFza3MgcmVtYWluIGV2ZW4gYWZ0ZXIgdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICBzdG9wcGVkLiBCdXQgdGhleSB3aWxsIGJlIHJlbW92ZWQgaWYgdGhlIHRpbWVyIGlzIHJlc2V0LlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI3Rhc2tDb3VudFxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fLnRhc2tzKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRhc2tSdW5Db3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIGFsbCB0YXNrIGV4ZWN1dGlvbnMgKHJ1bnMpLlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI3Rhc2tSdW5Db3VudFxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnRhc2tSdW5Db3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwicnVuQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lciBydW5zLCBpbmNsdWRpbmcgcmVzdW1lZCBydW5zLlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI3J1bkNvdW50XG4gICAgICAgICAqICBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ydW5Db3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVCTElDIChJTlNUQU5DRSkgTUVUSE9EU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqICBHZXRzIHRoZSB0YXNrIHdpdGggdGhlIGdpdmVuIElELlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtTdHJpbmd9IGlkIC0gSUQgb2YgdGhlIHRhc2suXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2t9XG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuXy50YXNrc1tpZF0gfHwgbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBBZGRzIGEgY29sbGVjdGlvbiBvZiBuZXcgdGFza3MgZm9yIHRoZSB0aW1lci5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtUYXNrfElUYXNrT3B0aW9uc3xUYXNrQ2FsbGJhY2t8QXJyYXl9IHRhc2sgLSBFaXRoZXIgYVxuICAgICAqICBzaW5nbGUgdGFzaywgdGFzayBvcHRpb25zIG9iamVjdCBvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb247IG9yIGEgbWl4dHVyZVxuICAgICAqICBvZiB0aGVzZSBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqXG4gICAgICogIEB0aHJvd3Mge0Vycm9yfSAtIElmIGEgdGFzayBjYWxsYmFjayBpcyBub3Qgc2V0IG9yIGEgdGFzayB3aXRoIHRoZSBnaXZlblxuICAgICAqICBuYW1lIGFscmVhZHkgZXhpc3RzLlxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF1dGlsc18xLnV0aWxzLmlzc2V0KHRhc2spKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciBhIHRhc2ssIHRhc2sgb3B0aW9ucyBvciBhIGNhbGxiYWNrIGlzIHJlcXVpcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHV0aWxzXzEudXRpbHMuZW5zdXJlQXJyYXkodGFzaykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMuX2FkZChpdGVtKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlbW92ZXMgdGhlIHRhc2sgYnkgdGhlIGdpdmVuIG5hbWUuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfFRhc2t9IHRhc2sgLSBUYXNrIHRvIGJlIHJlbW92ZWQuIEVpdGhlciBwYXNzIHRoZVxuICAgICAqICBuYW1lIG9yIHRoZSB0YXNrIGl0c2VsZi5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqXG4gICAgICogIEB0aHJvd3Mge0Vycm9yfSAtIElmIGEgdGFzayB3aXRoIHRoZSBnaXZlbiBuYW1lIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdmFyIGlkID0gdHlwZW9mIHRhc2sgPT09ICdzdHJpbmcnID8gdGFzayA6IHRhc2suaWQ7XG4gICAgICAgIHRhc2sgPSB0aGlzLmdldChpZCk7XG4gICAgICAgIGlmICghaWQgfHwgIXRhc2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRhc2tzIGV4aXN0IHdpdGggSUQ6ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmaXJzdCBkZWNyZW1lbnQgY29tcGxldGVkIHRhc2tzIGNvdW50IGlmIHRoaXMgaXMgYSBjb21wbGV0ZWQgdGFzay5cbiAgICAgICAgaWYgKHRhc2suY29tcGxldGVkICYmIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQgPiAwKVxuICAgICAgICAgICAgdGhpcy5fLmNvbXBsZXRlZFRhc2tDb3VudC0tO1xuICAgICAgICB0aGlzLl8udGFza3NbaWRdID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuXy50YXNrc1tpZF07XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlRBU0tfUkVNT1ZFRCwgdGFzayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFN0YXJ0cyB0aGUgdGltZXIgYW5kIHB1dHMgdGhlIHRpbWVyIGluIGBSVU5OSU5HYCBzdGF0ZS4gSWYgaXQncyBhbHJlYWR5XG4gICAgICogIHJ1bm5pbmcsIHRoaXMgd2lsbCByZXNldCB0aGUgc3RhcnQvc3RvcCB0aW1lIGFuZCB0aWNrIGNvdW50LCBidXQgd2lsbCBub3RcbiAgICAgKiAgcmVzZXQgKG9yIHJlbW92ZSkgZXhpc3RpbmcgdGFza3MuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc3RvcCgpO1xuICAgICAgICB0aGlzLl8uc3RhdGUgPSBUYXNrVGltZXIuU3RhdGUuUlVOTklORztcbiAgICAgICAgdGhpcy5fcnVuQ291bnQrKztcbiAgICAgICAgdGhpcy5fLnRpY2tDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuXy50YXNrUnVuQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl8uc3RvcFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9tYXJrVGltZSgpO1xuICAgICAgICB0aGlzLl8uc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuU1RBUlRFRCk7XG4gICAgICAgIHRoaXMuX3J1bigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBQYXVzZXMgdGhlIHRpbWVyLCBwdXRzIHRoZSB0aW1lciBpbiBgUEFVU0VEYCBzdGF0ZSBhbmQgYWxsIHRhc2tzIG9uIGhvbGQuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFRhc2tUaW1lci5TdGF0ZS5SVU5OSU5HKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlBBVVNFRDtcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuUEFVU0VEKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUmVzdW1lcyB0aGUgdGltZXIgYW5kIHB1dHMgdGhlIHRpbWVyIGluIGBSVU5OSU5HYCBzdGF0ZTsgaWYgcHJldml1b3NseVxuICAgICAqICBwYXVzZWQuIEluIHRoaXMgc3RhdGUsIGFsbCBleGlzdGluZyB0YXNrcyBhcmUgcmVzdW1lZC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFRhc2tUaW1lci5TdGF0ZS5JRExFKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gVGFza1RpbWVyLlN0YXRlLlBBVVNFRClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9ydW5Db3VudCsrO1xuICAgICAgICB0aGlzLl9tYXJrVGltZSgpO1xuICAgICAgICB0aGlzLl8uc3RhdGUgPSBUYXNrVGltZXIuU3RhdGUuUlVOTklORztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuUkVTVU1FRCk7XG4gICAgICAgIHRoaXMuX3J1bigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTdG9wcyB0aGUgdGltZXIgYW5kIHB1dHMgdGhlIHRpbWVyIGluIGBTVE9QUEVEYCBzdGF0ZS4gSW4gdGhpcyBzdGF0ZSwgYWxsXG4gICAgICogIGV4aXN0aW5nIHRhc2tzIGFyZSBzdG9wcGVkIGFuZCBubyB2YWx1ZXMgb3IgdGFza3MgYXJlIHJlc2V0IHVudGlsXG4gICAgICogIHJlLXN0YXJ0ZWQgb3IgZXhwbGljaXRseSBjYWxsaW5nIHJlc2V0LlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFRhc2tUaW1lci5TdGF0ZS5SVU5OSU5HKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICAgICAgdGhpcy5fLnN0b3BUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlNUT1BQRUQ7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlNUT1BQRUQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTdG9wcyB0aGUgdGltZXIgYW5kIHB1dHMgdGhlIHRpbWVyIGluIGBJRExFYCBzdGF0ZS5cbiAgICAgKiAgVGhpcyB3aWxsIHJlc2V0IHRoZSB0aWNrcyBhbmQgcmVtb3ZlcyBhbGwgdGFza3Mgc2lsZW50bHk7IG1lYW5pbmcgbm9cbiAgICAgKiAgb3RoZXIgZXZlbnRzIHdpbGwgYmUgZW1pdHRlZCBzdWNoIGFzIGBcInRhc2tSZW1vdmVkXCJgLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlJFU0VUKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQUklWQVRFIChJTlNUQU5DRSkgTUVUSE9EU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX2VtaXQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xuICAgICAgICB2YXIgZXZlbnQgPSB7XG4gICAgICAgICAgICBuYW1lOiB0eXBlLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KHR5cGUsIGV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBBZGRzIGEgbmV3IHRhc2sgZm9yIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge1Rhc2t8SVRhc2tPcHRpb25zfFRhc2tDYWxsYmFja30gb3B0aW9ucyAtIEVpdGhlciBhIHRhc2sgaW5zdGFuY2UsXG4gICAgICogIHRhc2sgb3B0aW9ucyBvYmplY3Qgb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIHRpY2tcbiAgICAgKiAgaW50ZXJ2YWxzLlxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICpcbiAgICAgKiAgQHRocm93cyB7RXJyb3J9IC0gSWYgdGhlIHRhc2sgY2FsbGJhY2sgaXMgbm90IHNldCBvciBhIHRhc2sgd2l0aCB0aGVcbiAgICAgKiAgZ2l2ZW4gbmFtZSBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9hZGQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IG9wdGlvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzXzEudXRpbHMudHlwZShvcHRpb25zKSA9PT0gJ29iamVjdCcgJiYgIW9wdGlvbnMuaWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaWQgPSB0aGlzLl9nZXRVbmlxdWVUYXNrSUQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nZXQob3B0aW9ucy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgdGFzayB3aXRoIGlkICdcIiArIG9wdGlvbnMuaWQgKyBcIicgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0YXNrID0gb3B0aW9ucyBpbnN0YW5jZW9mIF8xLlRhc2sgPyBvcHRpb25zIDogbmV3IF8xLlRhc2sob3B0aW9ucyk7XG4gICAgICAgIHRhc2suX3NldFRpbWVyKHRoaXMpO1xuICAgICAgICB0aGlzLl8udGFza3NbdGFzay5pZF0gPSB0YXNrO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5UQVNLX0FEREVELCB0YXNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU3RvcHMgdGhlIHRpbWVyLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX3N0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnRBZnRlclJlc3VtZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLl90aW1lb3V0UmVmKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dFJlZik7XG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0UmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW1tZWRpYXRlUmVmKSB7XG4gICAgICAgICAgICB1dGlsc18xLnV0aWxzLmNsZWFySW1tZWRpYXRlKHRoaXMuX2ltbWVkaWF0ZVJlZik7XG4gICAgICAgICAgICB0aGlzLl9pbW1lZGlhdGVSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUmVzZXRzIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fID0ge1xuICAgICAgICAgICAgb3B0czogKHRoaXMuXyB8fCB7fSkub3B0cyxcbiAgICAgICAgICAgIHN0YXRlOiBUYXNrVGltZXIuU3RhdGUuSURMRSxcbiAgICAgICAgICAgIHRhc2tzOiB7fSxcbiAgICAgICAgICAgIHRpY2tDb3VudDogMCxcbiAgICAgICAgICAgIHRhc2tSdW5Db3VudDogMCxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogMCxcbiAgICAgICAgICAgIHN0b3BUaW1lOiAwLFxuICAgICAgICAgICAgY29tcGxldGVkVGFza0NvdW50OiAwLFxuICAgICAgICAgICAgcmVzdW1lVGltZTogMCxcbiAgICAgICAgICAgIGhyUmVzdW1lVGltZTogbnVsbCxcbiAgICAgICAgICAgIHRpY2tDb3VudEFmdGVyUmVzdW1lOiAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBDYWxsZWQgKGJ5IFRhc2sgaW5zdGFuY2UpIHdoZW4gaXQgaGFzIGNvbXBsZXRlZCBhbGwgb2YgaXRzIHJ1bnMuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgLy8gQHRzLWlnbm9yZTogVFM2MTMzOiBkZWNsYXJlZCBidXQgbmV2ZXIgcmVhZC5cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl90YXNrQ29tcGxldGVkID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdGhpcy5fLmNvbXBsZXRlZFRhc2tDb3VudCsrO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5UQVNLX0NPTVBMRVRFRCwgdGFzayk7XG4gICAgICAgIGlmICh0aGlzLl8uY29tcGxldGVkVGFza0NvdW50ID09PSB0aGlzLnRhc2tDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuQ09NUExFVEVEKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BPbkNvbXBsZXRlZClcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFzay5yZW1vdmVPbkNvbXBsZXRlZClcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRhc2spO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIEhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX3RpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5SVU5OSU5HO1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHZhciB0YXNrO1xuICAgICAgICB2YXIgdGFza3MgPSB0aGlzLl8udGFza3M7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnQrKztcbiAgICAgICAgdGhpcy5fLnRpY2tDb3VudEFmdGVyUmVzdW1lKys7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlRJQ0spO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpmb3JpblxuICAgICAgICBmb3IgKGlkIGluIHRhc2tzKSB7XG4gICAgICAgICAgICB0YXNrID0gdGFza3NbaWRdO1xuICAgICAgICAgICAgaWYgKCF0YXNrIHx8ICF0YXNrLmNhblJ1bk9uVGljaylcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIGJlbG93IHdpbGwgbm90IGV4ZWN1dGUgaWYgdGFzayBpcyBkaXNhYmxlZCBvciBhbHJlYWR5XG4gICAgICAgICAgICAvLyBjb21wbGV0ZWQuXG4gICAgICAgICAgICB0YXNrLl9ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl8udGFza1J1bkNvdW50Kys7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlRBU0ssIHRhc2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcnVuKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgTWFya3MgdGhlIHJlc3VtZSAob3Igc3RhcnQpIHRpbWUgaW4gbWlsbGlzZWNvbmRzIG9yIGhpZ2gtcmVzb2x1dGlvbiB0aW1lXG4gICAgICogIGlmIGF2YWlsYWJsZS5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9tYXJrVGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh1dGlsc18xLnV0aWxzLkJST1dTRVIpIHsgLy8gdGVzdGVkIHNlcGFyYXRlbHlcbiAgICAgICAgICAgIHRoaXMuXy5yZXN1bWVUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuXy5oclJlc3VtZVRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgR2V0cyB0aGUgdGltZSBkaWZmZXJlbmNlIGluIG1pbGxpc2Vjb25kcyBzaW5jdCB0aGUgbGFzdCByZXN1bWUgb3Igc3RhcnRcbiAgICAgKiAgdGltZS5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9nZXRUaW1lRGlmZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gRGF0ZS5ub3coKSBpcyB+MnggZmFzdGVyIHRoYW4gRGF0ZSNnZXRUaW1lKClcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh1dGlsc18xLnV0aWxzLkJST1dTRVIpXG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuXy5yZXN1bWVUaW1lOyAvLyB0ZXN0ZWQgc2VwYXJhdGVseVxuICAgICAgICB2YXIgaHJEaWZmID0gcHJvY2Vzcy5ocnRpbWUodGhpcy5fLmhyUmVzdW1lVGltZSk7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoKGhyRGlmZlswXSAqIDEwMDApICsgKGhyRGlmZlsxXSAvIDFlNikpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJ1bnMgdGhlIHRpbWVyLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX3J1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFRhc2tUaW1lci5TdGF0ZS5SVU5OSU5HKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSB0aGlzLmludGVydmFsO1xuICAgICAgICAvLyB3ZSdsbCBnZXQgYSBwcmVjaXNlIGludGVydmFsIGJ5IGNoZWNraW5nIGlmIG91ciBjbG9jayBpcyBhbHJlYWR5XG4gICAgICAgIC8vIGRyaWZ0ZWQuXG4gICAgICAgIGlmICh0aGlzLnByZWNpc2lvbikge1xuICAgICAgICAgICAgdmFyIGRpZmYgPSB0aGlzLl9nZXRUaW1lRGlmZigpO1xuICAgICAgICAgICAgLy8gZGlkIHdlIHJlYWNoIHRoaXMgZXhwZWN0ZWQgdGljayBjb3VudCBmb3IgdGhlIGdpdmVuIHRpbWUgcGVyaW9kP1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlZCBjb3VudCBzaG91bGQgbm90IGJlIGdyZWF0ZXIgdGhhbiB0aWNrQ291bnRBZnRlclJlc3VtZVxuICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IoZGlmZiAvIGludGVydmFsKSA+IHRoaXMuXy50aWNrQ291bnRBZnRlclJlc3VtZSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIHJlYWxseSBsYXRlLCBydW4gaW1tZWRpYXRlbHkhXG4gICAgICAgICAgICAgICAgdGhpcy5faW1tZWRpYXRlUmVmID0gdXRpbHNfMS51dGlscy5zZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3RpY2soKTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgd2Ugc3RpbGwgaGF2ZSB0aW1lIGJ1dCBhIGJpdCBvZmYsIHVwZGF0ZSBuZXh0IGludGVydmFsLlxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCAtIChkaWZmICUgaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl90aWNrKCk7IH0sIGludGVydmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBHZXRzIGEgdW5pcXVlIHRhc2sgSUQuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fZ2V0VW5pcXVlVGFza0lEID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbnVtID0gdGhpcy50YXNrQ291bnQ7XG4gICAgICAgIHZhciBpZDtcbiAgICAgICAgd2hpbGUgKCFpZCB8fCB0aGlzLmdldChpZCkpIHtcbiAgICAgICAgICAgIG51bSsrO1xuICAgICAgICAgICAgaWQgPSAndGFzaycgKyBudW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG4gICAgcmV0dXJuIFRhc2tUaW1lcjtcbn0oZXZlbnRlbWl0dGVyM18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5UYXNrVGltZXIgPSBUYXNrVGltZXI7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE5BTUVTUEFDRVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1uYW1lc3BhY2Vcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4vKiogQHByaXZhdGUgKi9cbihmdW5jdGlvbiAoVGFza1RpbWVyKSB7XG4gICAgLyoqXG4gICAgICogIFJlcHJlc2VudHMgdGhlIGNsYXNzIHRoYXQgaG9sZHMgdGhlIGNvbmZpZ3VyYXRpb25zIGFuZCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiAgcmVxdWlyZWQgdG8gcnVuIGEgdGFzay4gU2VlIHtAbGluayBhcGkvI1Rhc2t8Y2xhc3MgaW5mb3JtYXRpb259LlxuICAgICAqICBAbmFtZSBUYXNrVGltZXIuVGFza1xuICAgICAqICBAY2xhc3NcbiAgICAgKi9cbiAgICBUYXNrVGltZXIuVGFzayA9IF8xLlRhc2s7XG4gICAgLyoqXG4gICAgICogIEVudW1lcmF0ZXMgYFRhc2tUaW1lcmAgc3RhdGVzLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBlbnVtIHtTdHJpbmd9XG4gICAgICogIEByZWFkb25seVxuICAgICAqL1xuICAgIHZhciBTdGF0ZTtcbiAgICAoZnVuY3Rpb24gKFN0YXRlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5kaWNhdGVzIHRoYXQgdGhlIHRpbWVyIGlzIGluIGBpZGxlYCBzdGF0ZS5cbiAgICAgICAgICogIFRoaXMgaXMgdGhlIGluaXRpYWwgc3RhdGUgd2hlbiB0aGUgYFRhc2tUaW1lcmAgaW5zdGFuY2UgaXMgZmlyc3QgY3JlYXRlZC5cbiAgICAgICAgICogIEFsc28gd2hlbiBhbiBleGlzdGluZyB0aW1lciBpcyByZXNldCwgaXQgd2lsbCBiZSBgaWRsZWAuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGVbXCJJRExFXCJdID0gXCJpZGxlXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5kaWNhdGVzIHRoYXQgdGhlIHRpbWVyIGlzIGluIGBydW5uaW5nYCBzdGF0ZTsgc3VjaCBhcyB3aGVuIHRoZSB0aW1lciBpc1xuICAgICAgICAgKiAgc3RhcnRlZCBvciByZXN1bWVkLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlW1wiUlVOTklOR1wiXSA9IFwicnVubmluZ1wiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEluZGljYXRlcyB0aGF0IHRoZSB0aW1lciBpcyBpbiBgcGF1c2VkYCBzdGF0ZS5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZVtcIlBBVVNFRFwiXSA9IFwicGF1c2VkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5kaWNhdGVzIHRoYXQgdGhlIHRpbWVyIGlzIGluIGBzdG9wcGVkYCBzdGF0ZS5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZVtcIlNUT1BQRURcIl0gPSBcInN0b3BwZWRcIjtcbiAgICB9KShTdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZSB8fCAoVGFza1RpbWVyLlN0YXRlID0ge30pKTtcbiAgICAvKipcbiAgICAgKiAgRW51bWVyYXRlcyB0aGUgYFRhc2tUaW1lcmAgZXZlbnQgdHlwZXMuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGVudW0ge1N0cmluZ31cbiAgICAgKiAgQHJlYWRvbmx5XG4gICAgICovXG4gICAgdmFyIEV2ZW50O1xuICAgIChmdW5jdGlvbiAoRXZlbnQpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIG9uIGVhY2ggdGljayAoaW50ZXJ2YWwpIG9mIGBUYXNrVGltZXJgLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiVElDS1wiXSA9IFwidGlja1wiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcHV0IGluIGBSVU5OSU5HYCBzdGF0ZTsgc3VjaCBhcyB3aGVuIHRoZSB0aW1lciBpc1xuICAgICAgICAgKiAgc3RhcnRlZC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlNUQVJURURcIl0gPSBcInN0YXJ0ZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gdGhlIHRpbWVyIGlzIHB1dCBpbiBgUlVOTklOR2Agc3RhdGU7IHN1Y2ggYXMgd2hlbiB0aGUgdGltZXIgaXNcbiAgICAgICAgICogIHJlc3VtZWQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJSRVNVTUVEXCJdID0gXCJyZXN1bWVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyBwdXQgaW4gYFBBVVNFRGAgc3RhdGUuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJQQVVTRURcIl0gPSBcInBhdXNlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcHV0IGluIGBTVE9QUEVEYCBzdGF0ZS5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlNUT1BQRURcIl0gPSBcInN0b3BwZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gdGhlIHRpbWVyIGlzIHJlc2V0LlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiUkVTRVRcIl0gPSBcInJlc2V0XCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGEgdGFzayBpcyBleGVjdXRlZC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlRBU0tcIl0gPSBcInRhc2tcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIGlzIGFkZGVkIHRvIGBUYXNrVGltZXJgIGluc3RhbmNlLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiVEFTS19BRERFRFwiXSA9IFwidGFza0FkZGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGEgdGFzayBpcyByZW1vdmVkIGZyb20gYFRhc2tUaW1lcmAgaW5zdGFuY2UuXG4gICAgICAgICAqICBOb3RlIHRoYXQgdGhpcyB3aWxsIG5vdCBiZSBlbWl0dGVkIHdoZW4gYC5yZXNldCgpYCBpcyBjYWxsZWQ7IHdoaWNoXG4gICAgICAgICAqICByZW1vdmVzIGFsbCB0YXNrcyBzaWxlbnRseS5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlRBU0tfUkVNT1ZFRFwiXSA9IFwidGFza1JlbW92ZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIGhhcyBjb21wbGV0ZWQgYWxsIG9mIGl0cyBleGVjdXRpb25zIChydW5zKVxuICAgICAgICAgKiAgb3IgcmVhY2hlZCBpdHMgc3RvcHBpbmcgZGF0ZS90aW1lIChpZiBzZXQpLiBOb3RlIHRoYXQgdGhpcyBldmVudFxuICAgICAgICAgKiAgd2lsbCBvbmx5IGJlIGZpcmVkIGlmIHRoZSB0YXNrcyBoYXMgYSBgdG90YWxSdW5zYCBsaW1pdCBvciBhXG4gICAgICAgICAqICBgc3RvcERhdGVgIHZhbHVlIHNldC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlRBU0tfQ09NUExFVEVEXCJdID0gXCJ0YXNrQ29tcGxldGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGEgdGFzayBwcm9kdWNlcyBhbiBlcnJvciBvbiBpdHMgZXhlY3V0aW9uLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiVEFTS19FUlJPUlwiXSA9IFwidGFza0Vycm9yXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGFsbCB0YXNrcyBoYXZlIGNvbXBsZXRlZCBhbGwgb2YgdGhlaXIgZXhlY3V0aW9ucyAocnVucylcbiAgICAgICAgICogIG9yIHJlYWNoZWQgdGhlaXIgc3RvcHBpbmcgZGF0ZS90aW1lIChpZiBzZXQpLiBOb3RlIHRoYXQgdGhpcyBldmVudFxuICAgICAgICAgKiAgd2lsbCBvbmx5IGJlIGZpcmVkIGlmIGFsbCB0YXNrcyBoYXZlIGEgYHRvdGFsUnVuc2AgbGltaXQgb3IgYVxuICAgICAgICAgKiAgYHN0b3BEYXRlYCB2YWx1ZSBzZXQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJDT01QTEVURURcIl0gPSBcImNvbXBsZXRlZFwiO1xuICAgIH0pKEV2ZW50ID0gVGFza1RpbWVyLkV2ZW50IHx8IChUYXNrVGltZXIuRXZlbnQgPSB7fSkpO1xufSkoVGFza1RpbWVyIHx8IChUYXNrVGltZXIgPSB7fSkpO1xuZXhwb3J0cy5UYXNrVGltZXIgPSBUYXNrVGltZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9UYXNrXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1Rhc2tUaW1lclwiKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBwcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG52YXIgTk9ERSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgcHJvY2Vzcy5ocnRpbWUgPT09ICdmdW5jdGlvbic7XG52YXIgQlJPV1NFUiA9ICFOT0RFO1xuLyoqIEBwcml2YXRlICovXG52YXIgdXRpbHMgPSB7XG4gICAgTk9ERTogTk9ERSxcbiAgICBCUk9XU0VSOiBCUk9XU0VSLFxuICAgIHR5cGU6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBwcm90by50b1N0cmluZy5jYWxsKG8pLm1hdGNoKC9cXHMoXFx3KykvaSlbMV0udG9Mb3dlckNhc2UoKTtcbiAgICB9LFxuICAgIGlzc2V0OiBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gbyAhPT0gbnVsbCAmJiBvICE9PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBlbnN1cmVBcnJheTogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmlzc2V0KG8pXG4gICAgICAgICAgICA/ICFBcnJheS5pc0FycmF5KG8pID8gW29dIDogb1xuICAgICAgICAgICAgOiBbXTtcbiAgICB9LFxuICAgIGdldE51bWJlcjogZnVuY3Rpb24gKHZhbHVlLCBtaW5pbXVtLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gKHZhbHVlIDwgbWluaW11bSA/IG1pbmltdW0gOiB2YWx1ZSlcbiAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIH0sXG4gICAgZ2V0Qm9vbDogZnVuY3Rpb24gKHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICA/IGRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgOiB2YWx1ZTtcbiAgICB9LFxuICAgIHNldEltbWVkaWF0ZTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodXRpbHMuQlJPV1NFUikgeyAvLyB0ZXN0ZWQgc2VwYXJhdGVseVxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoY2IuYXBwbHkobnVsbCwgYXJncyksIDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRJbW1lZGlhdGUuYXBwbHkodm9pZCAwLCBbY2JdLmNvbmNhdChhcmdzKSk7XG4gICAgfSxcbiAgICBjbGVhckltbWVkaWF0ZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmICghaWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodXRpbHMuQlJPV1NFUilcbiAgICAgICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpOyAvLyB0ZXN0ZWQgc2VwYXJhdGVseVxuICAgICAgICBjbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAgQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgcHJvbWlzZS5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKiAgQHBhcmFtIHthbnl9IHZhbHVlIC0gVmFsdWUgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiAgQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1Byb21pc2U6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgICYmIHV0aWxzLnR5cGUodmFsdWUpID09PSAncHJvbWlzZSdcbiAgICAgICAgICAgICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xuICAgIH1cbn07XG5leHBvcnRzLnV0aWxzID0gdXRpbHM7XG4iXSwic291cmNlUm9vdCI6IiJ9