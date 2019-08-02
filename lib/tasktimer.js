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
     *      callback(task) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrdGltZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Rhc2t0aW1lci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvVGFzay50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvVGFza1RpbWVyLnRzIiwid2VicGFjazovL3Rhc2t0aW1lci8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7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LFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FB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QTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsS0FBSyxrREFBa0Q7QUFDdkQsQ0FBQyw4QkFBOEI7QUFDL0I7Ozs7Ozs7Ozs7Ozs7QUMvMEJhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsU0FBUyxtQkFBTyxDQUFDLDZCQUFRO0FBQ3pCLFNBQVMsbUJBQU8sQ0FBQyx1Q0FBYTs7Ozs7Ozs7Ozs7OztBQ05qQjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsSUFBSTtBQUNwQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0YXNrdGltZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInRhc2t0aW1lclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0YXNrdGltZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGFza3RpbWVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJsaWIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogIEBwcml2YXRlXG4gKi9cbnZhciBERUZBVUxUX1RBU0tfT1BUSU9OUyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgdGlja0RlbGF5OiAwLFxuICAgIHRpY2tJbnRlcnZhbDogMSxcbiAgICB0b3RhbFJ1bnM6IG51bGwsXG4gICAgc3RhcnREYXRlOiBudWxsLFxuICAgIHN0b3BEYXRlOiBudWxsLFxuICAgIGltbWVkaWF0ZTogZmFsc2UsXG4gICAgcmVtb3ZlT25Db21wbGV0ZWQ6IGZhbHNlLFxuICAgIGNhbGxiYWNrOiBudWxsXG59KTtcbi8qKlxuICogIFJlcHJlc2VudHMgdGhlIGNsYXNzIHRoYXQgaG9sZHMgdGhlIGNvbmZpZ3VyYXRpb25zIGFuZCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqICByZXF1aXJlZCB0byBydW4gYSB0YXNrLlxuICogIEBjbGFzc1xuICovXG52YXIgVGFzayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiAgSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYFRhc2tgIGNsYXNzLlxuICAgICAqICBAY29uc3RydWN0b3JcbiAgICAgKiAgQHBhcmFtIHtJVGFza09wdGlvbnN9IG9wdGlvbnMgVGFzayBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFRhc2sob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiaWRcIiwge1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gUFVCTElDIChJTlNUQU5DRSkgTUVNQkVSU1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSB1bmlxdWUgSUQgb2YgdGhlIHRhc2suXG4gICAgICAgICAqICBAbmFtZSBUYXNrI2lkXG4gICAgICAgICAqICBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uaWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJlbmFibGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0aGlzIHRhc2sgaXMgY3VycmVudGx5IGVuYWJsZWQuIFRoaXMgZXNzZW50aWFsbHkgZ2l2ZXNcbiAgICAgICAgICogIHlvdSBhIG1hbnVhbCBjb250cm9sIG92ZXIgZXhlY3V0aW9uLiBUaGUgdGFzayB3aWxsIGFsd2F5cyBieXBhc3MgdGhlXG4gICAgICAgICAqICBjYWxsYmFjayB3aGlsZSB0aGlzIGlzIHNldCB0byBgZmFsc2VgLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNlbmFibGVkXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5lbmFibGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLmVuYWJsZWQgPSB1dGlsc18xLnV0aWxzLmdldEJvb2wodmFsdWUsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwidGlja0RlbGF5XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgdGhlIG51bWJlciBvZiB0aWNrcyB0byBhbGxvdyBiZWZvcmUgcnVubmluZyB0aGUgdGFzayBmb3JcbiAgICAgICAgICogIHRoZSBmaXJzdCB0aW1lLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayN0aWNrRGVsYXlcbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udGlja0RlbGF5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLnRpY2tEZWxheSA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAwLCBERUZBVUxUX1RBU0tfT1BUSU9OUy50aWNrRGVsYXkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwidGlja0ludGVydmFsXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgdGhlIHRpY2sgaW50ZXJ2YWwgdGhhdCB0aGUgdGFzayBzaG91bGQgYmUgcnVuIG9uLiBUaGUgdW5pdFxuICAgICAgICAgKiAgaXMgXCJ0aWNrc1wiIChub3QgbWlsbGlzZWNvbmRzKS4gRm9yIGluc3RhbmNlLCBpZiB0aGUgdGltZXIgaW50ZXJ2YWwgaXNcbiAgICAgICAgICogIGAxMDAwYCBtaWxsaXNlY29uZHMsIGFuZCB3ZSBhZGQgYSB0YXNrIHdpdGggYDVgIHRpY2sgaW50ZXJ2YWxzLiBUaGUgdGFza1xuICAgICAgICAgKiAgd2lsbCBydW4gb24gZXZlcnkgYDVgIDxiPnNlY29uZHM8L2I+LlxuICAgICAgICAgKiAgQG5hbWUgVGFzayN0aWNrSW50ZXJ2YWxcbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udGlja0ludGVydmFsO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLnRpY2tJbnRlcnZhbCA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAxLCBERUZBVUxUX1RBU0tfT1BUSU9OUy50aWNrSW50ZXJ2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwidG90YWxSdW5zXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0aGUgdGFzayBzaG91bGQgYmUgcnVuLiBgMGAgb3JcbiAgICAgICAgICogIGBudWxsYCBtZWFucyB1bmxpbWl0ZWQgKHVudGlsIHRoZSB0aW1lciBoYXMgc3RvcHBlZCkuXG4gICAgICAgICAqICBAbmFtZSBUYXNrI3RvdGFsUnVuc1xuICAgICAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy50b3RhbFJ1bnM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8udG90YWxSdW5zID0gdXRpbHNfMS51dGlscy5nZXROdW1iZXIodmFsdWUsIDAsIERFRkFVTFRfVEFTS19PUFRJT05TLnRvdGFsUnVucyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJpbW1lZGlhdGVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIFNwZWNpZmllcyB3aGV0aGVyIHRvIHdyYXAgY2FsbGJhY2sgaW4gYSBgc2V0SW1tZWRpYXRlKClgIGNhbGwgYmVmb3JlXG4gICAgICAgICAqICBleGVjdXRpbmcuIFRoaXMgY2FuIGJlIHVzZWZ1bCBpZiB0aGUgdGFzayBpcyBub3QgZG9pbmcgYW55IEkvTyBvciB1c2luZ1xuICAgICAgICAgKiAgYW55IEpTIHRpbWVycyBidXQgc3luY2hyb25vdXNseSBibG9ja2luZyB0aGUgZXZlbnQgbG9vcC5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjaW1tZWRpYXRlXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5pbW1lZGlhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8uaW1tZWRpYXRlID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJjdXJyZW50UnVuc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgbnVtYmVyIG9mIHRpbWVzLCB0aGlzIHRhc2sgaGFzIGJlZW4gcnVuLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNjdXJyZW50UnVuc1xuICAgICAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLmN1cnJlbnRSdW5zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwidGltZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aW1lIGluZm9ybWF0aW9uIGZvciB0aGUgbGlmZXRpbWUgb2YgYSB0YXNrLlxuICAgICAgICAgKiAgYCN0aW1lLnN0YXJ0ZWRgIGluZGljYXRlcyB0aGUgZmlyc3QgZXhlY3V0aW9uIHRpbWUgb2YgYSB0YXNrLlxuICAgICAgICAgKiAgYCN0aW1lLnN0b3BwZWRgIGluZGljYXRlcyB0aGUgbGFzdCBleGVjdXRpb24gdGltZSBvZiBhIHRhc2suIChgMGAgaWYgc3RpbGwgcnVubmluZy4pXG4gICAgICAgICAqICBgI3RpbWUuZWxhcHNlZGAgaW5kaWNhdGVzIHRoZSB0b3RhbCBsaWZldGltZSBvZiBhIHRhc2suXG4gICAgICAgICAqICBAbmFtZSBUYXNrI3RpbWVcbiAgICAgICAgICogIEB0eXBlIHtJVGltZUluZm99XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ZWQgPSB0aGlzLl8udGltZU9uRmlyc3RSdW4gfHwgMDtcbiAgICAgICAgICAgIHZhciBzdG9wcGVkID0gdGhpcy5fLnRpbWVPbkxhc3RSdW4gfHwgMDtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgICAgICBzdGFydGVkOiBzdGFydGVkLFxuICAgICAgICAgICAgICAgIHN0b3BwZWQ6IHN0b3BwZWQsXG4gICAgICAgICAgICAgICAgZWxhcHNlZDogc3RvcHBlZCAtIHN0YXJ0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiY2FsbGJhY2tcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIGVhY2ggcnVuLlxuICAgICAgICAgKiAgQG5hbWUgVGFzayNjYWxsYmFja1xuICAgICAgICAgKiAgQHR5cGUge1Rhc2tDYWxsYmFja31cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLmNhbGxiYWNrO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwicmVtb3ZlT25Db21wbGV0ZWRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHJlbW92ZSB0aGUgdGFzayAodG8gZnJlZSB1cCBtZW1vcnkpIHdoZW4gdGFza1xuICAgICAgICAgKiAgaGFzIGNvbXBsZXRlZCBpdHMgZXhlY3V0aW9ucyAocnVucykuIEZvciB0aGlzIHRvIHRha2UgYWZmZWN0LCB0aGUgdGFza1xuICAgICAgICAgKiAgc2hvdWxkIGhhdmUgYHRvdGFsUnVuc2AgYW5kL29yIGBzdG9wRGF0ZWAgY29uZmlndXJlZC5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjcmVtb3ZlT25Db21wbGV0ZWRcbiAgICAgICAgICogIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnJlbW92ZU9uQ29tcGxldGVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLnJlbW92ZU9uQ29tcGxldGVkID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJjb21wbGV0ZWRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB0YXNrIGhhcyBjb21wbGV0ZWQgYWxsIHJ1bnMgKGV4ZWN1dGlvbnMpIG9yXG4gICAgICAgICAqICBgc3RvcERhdGVgIGlzIHJlYWNoZWQuIE5vdGUgdGhhdCBpZiBib3RoIGB0b3RhbFJ1bnNgIGFuZCBgc3RvcERhdGVgIGFyZVxuICAgICAgICAgKiAgb21pdHRlZCwgdGhpcyB3aWxsIG5ldmVyIHJldHVybiBgdHJ1ZWA7IHNpbmNlIHRoZSB0YXNrIGhhcyBubyBleGVjdXRpb25cbiAgICAgICAgICogIGxpbWl0IHNldC5cbiAgICAgICAgICogIEBuYW1lIFRhc2sjY29tcGxldGVkXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gZmFzdGVyIGlmIGFscmVhZHkgY29tcGxldGVkXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFya2VkQ29tcGxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oKHRoaXMudG90YWxSdW5zICYmIHRoaXMuY3VycmVudFJ1bnMgPj0gdGhpcy50b3RhbFJ1bnMpXG4gICAgICAgICAgICAgICAgfHwgKHRoaXMuXy5zdG9wRGF0ZSAmJiBEYXRlLm5vdygpID49IHRoaXMuXy5zdG9wRGF0ZSkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiY2FuUnVuT25UaWNrXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGFzayBjYW4gcnVuIG9uIHRoZSBjdXJyZW50IHRpY2sgb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgQHByaXZhdGVcbiAgICAgICAgICogIEBuYW1lIFRhc2sjY2FuUnVuT25UaWNrXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWFya2VkQ29tcGxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciB0aWNrQ291bnQgPSB0aGlzLl8uc3RhcnREYXRlXG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoKERhdGUubm93KCkgLSBOdW1iZXIodGhpcy5fLnN0YXJ0RGF0ZSkpIC8gdGhpcy5fdGltZXIuaW50ZXJ2YWwpXG4gICAgICAgICAgICAgICAgOiB0aGlzLl90aW1lci50aWNrQ291bnQ7XG4gICAgICAgICAgICB2YXIgdGltZVRvUnVuID0gIXRoaXMuXy5zdGFydERhdGUgfHwgRGF0ZS5ub3coKSA+PSB0aGlzLl8uc3RhcnREYXRlO1xuICAgICAgICAgICAgdmFyIG9uSW50ZXJ2YWwgPSB0aWNrQ291bnQgPiB0aGlzLnRpY2tEZWxheSAmJiAodGlja0NvdW50IC0gdGhpcy50aWNrRGVsYXkpICUgdGhpcy50aWNrSW50ZXJ2YWwgPT09IDA7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aW1lVG9SdW4gJiYgb25JbnRlcnZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqICBSZXNldHMgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHJ1bnMuIFRoaXMgd2lsbCBrZWVwIHRoZSB0YXNrIHJ1bm5pbmcgZm9yXG4gICAgICogIHRoZSBzYW1lIGFtb3VudCBvZiBgdGlja0ludGVydmFsc2AgaW5pdGlhbGx5IGNvbmZpZ3VyZWQuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge0lUYXNrQmFzZU9wdGlvbnN9IFtvcHRpb25zXSBJZiBzZXQsIHRoaXMgd2lsbCBhbHNvIHJlLWNvbmZpZ3VyZSB0aGUgdGFzay5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza31cbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuXy5jdXJyZW50UnVucyA9IDA7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBvcHRpb25zLmlkO1xuICAgICAgICAgICAgaWYgKGlkICYmIGlkICE9PSB0aGlzLmlkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNoYW5nZSBJRCBvZiBhIHRhc2suJyk7XG4gICAgICAgICAgICBvcHRpb25zLmlkID0gdGhpcy5pZDtcbiAgICAgICAgICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU2VyaWFsaXphdGlvbiB0byBKU09OLlxuICAgICAqXG4gICAgICogIE5ldmVyIHJldHVybiBzdHJpbmcgZnJvbSBgdG9KU09OKClgLiBJdCBzaG91bGQgcmV0dXJuIGFuIG9iamVjdC5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYmogPSBfX2Fzc2lnbih7fSwgdGhpcy5fKTtcbiAgICAgICAgZGVsZXRlIG9iai5jYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBSSVZBVEUgKElOU1RBTkNFKSBNRU1CRVJTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqXG4gICAgICogIFNldCByZWZlcmVuY2UgdG8gdGltZXIgaXRzZWxmLlxuICAgICAqICBPbmx5IGNhbGxlZCBieSBgVGFza1RpbWVyYC5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICAvLyBAdHMtaWdub3JlOiBUUzYxMzM6IGRlY2xhcmVkIGJ1dCBuZXZlciByZWFkLlxuICAgIFRhc2sucHJvdG90eXBlLl9zZXRUaW1lciA9IGZ1bmN0aW9uICh0aW1lcikge1xuICAgICAgICB0aGlzLl90aW1lciA9IHRpbWVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFzay5wcm90b3R5cGUuX2VtaXQgPSBmdW5jdGlvbiAobmFtZSwgb2JqZWN0KSB7XG4gICAgICAgIHZhciBldmVudCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXNcbiAgICAgICAgfTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBldmVudC5lcnJvciA9IG9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmRhdGEgPSBvYmplY3Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGltZXIuZW1pdChuYW1lLCBldmVudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgYFRhc2tUaW1lcmAgc2hvdWxkIGJlIGluZm9ybWVkIGlmIHRoaXMgdGFzayBpcyBjb21wbGV0ZWQuIEJ1dCBleGVjdXRpb25cbiAgICAgKiAgc2hvdWxkIGJlIGZpbmlzaGVkLiBTbyB3ZSBkbyB0aGlzIHdpdGhpbiB0aGUgYGRvbmUoKWAgZnVuY3Rpb24uXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFzay5wcm90b3R5cGUuX2RvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VkQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuXy50aW1lT25MYXN0UnVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyLl90YXNrQ29tcGxldGVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5fZXhlY0NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG8gPSB0aGlzLmNhbGxiYWNrLmFwcGx5KHRoaXMsIFt0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fZG9uZSgpOyB9XSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjay5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsZWQgYnkgZG9uZSgpIChjYWxsZWQgd2l0aGluIHRoZSB0YXNrIGNhbGxiYWNrIGJ5IHRoZSB1c2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodXRpbHNfMS51dGlscy5pc1Byb21pc2UobykpIHtcbiAgICAgICAgICAgICAgICBvLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9lbWl0KF8xLlRhc2tUaW1lci5FdmVudC5UQVNLX0VSUk9SLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoXzEuVGFza1RpbWVyLkV2ZW50LlRBU0tfRVJST1IsIGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBPbmx5IHVzZWQgYnkgYFRhc2tUaW1lcmAuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgLy8gQHRzLWlnbm9yZTogVFM2MTMzOiBkZWNsYXJlZCBidXQgbmV2ZXIgcmVhZC5cbiAgICBUYXNrLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gKG9uUnVuKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkIHx8IHRoaXMuX21hcmtlZENvbXBsZXRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFJ1bnMgPT09IDApXG4gICAgICAgICAgICB0aGlzLl8udGltZU9uRmlyc3RSdW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAvLyBjdXJyZW50IHJ1bnMgc2hvdWxkIGJlIHNldCBiZWZvcmUgZXhlY3V0aW9uIG9yIGl0IG1pZ2h0IGZsb3cgaWYgc29tZVxuICAgICAgICAvLyBhc3luYyBydW5zIGZpbmlzaGVzIGZhc3RlciBhbmQgc29tZSBvdGhlciBzbG93ZXIuXG4gICAgICAgIHRoaXMuXy5jdXJyZW50UnVucysrO1xuICAgICAgICBvblJ1bigpO1xuICAgICAgICBpZiAodGhpcy5pbW1lZGlhdGUpIHtcbiAgICAgICAgICAgIHV0aWxzXzEudXRpbHMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9leGVjQ2FsbGJhY2soKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9leGVjQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFzay5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMuaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSB1bmlxdWUgdGFzayBJRCBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSBjYWxsYmFjayBmdW5jdGlvbiBpcyByZXF1aXJlZCBmb3IgYSB0YXNrIHRvIHJ1bi4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnREYXRlID0gb3B0aW9ucy5zdGFydERhdGUsIHN0b3BEYXRlID0gb3B0aW9ucy5zdG9wRGF0ZTtcbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBzdG9wRGF0ZSAmJiBzdGFydERhdGUgPj0gc3RvcERhdGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGFzayBzdGFydCBkYXRlIGNhbm5vdCBiZSB0aGUgc2FtZSBvciBhZnRlciBzdG9wIGRhdGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFya2VkQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuXyA9IF9fYXNzaWduKHsgY3VycmVudFJ1bnM6IDAgfSwgREVGQVVMVF9UQVNLX09QVElPTlMpO1xuICAgICAgICB0aGlzLl8uaWQgPSBTdHJpbmcob3B0aW9ucy5pZCk7XG4gICAgICAgIHRoaXMuXy5jYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuXy5zdGFydERhdGUgPSBvcHRpb25zLnN0YXJ0RGF0ZSB8fCBudWxsO1xuICAgICAgICB0aGlzLl8uc3RvcERhdGUgPSBvcHRpb25zLnN0b3BEYXRlIHx8IG51bGw7XG4gICAgICAgIC8vIHVzaW5nIHNldHRlcnMgZm9yIHZhbGlkYXRpb24gJiBkZWZhdWx0IHZhbHVlc1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWQ7XG4gICAgICAgIHRoaXMudGlja0RlbGF5ID0gb3B0aW9ucy50aWNrRGVsYXk7XG4gICAgICAgIHRoaXMudGlja0ludGVydmFsID0gb3B0aW9ucy50aWNrSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMudG90YWxSdW5zID0gb3B0aW9ucy50b3RhbFJ1bnM7XG4gICAgICAgIHRoaXMuaW1tZWRpYXRlID0gb3B0aW9ucy5pbW1lZGlhdGU7XG4gICAgICAgIHRoaXMucmVtb3ZlT25Db21wbGV0ZWQgPSBvcHRpb25zLnJlbW92ZU9uQ29tcGxldGVkO1xuICAgIH07XG4gICAgcmV0dXJuIFRhc2s7XG59KCkpO1xuZXhwb3J0cy5UYXNrID0gVGFzaztcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogdHNsaW50OmRpc2FibGU6bWF4LWZpbGUtbGluZS1jb3VudCAqL1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBkZXAgbW9kdWxlc1xudmFyIGV2ZW50ZW1pdHRlcjNfMSA9IHJlcXVpcmUoXCJldmVudGVtaXR0ZXIzXCIpO1xuLy8gb3duIG1vZHVsZXNcbnZhciBfMSA9IHJlcXVpcmUoXCIuXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogIEBwcml2YXRlXG4gKi9cbnZhciBERUZBVUxUX1RJTUVSX09QVElPTlMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBpbnRlcnZhbDogMTAwMCxcbiAgICBwcmVjaXNpb246IHRydWUsXG4gICAgc3RvcE9uQ29tcGxldGVkOiBmYWxzZVxufSk7XG4vKipcbiAqICBUYXNrVGltZXIg4oCiIGh0dHBzOi8vZ2l0aHViLmNvbS9vbnVyeS90YXNrdGltZXJcbiAqICBAbGljZW5zZSBNSVRcbiAqICBAY29weXJpZ2h0IDIwMTksIE9udXIgWcSxbGTEsXLEsW0gPG9udXJAY3V0ZXBpbG90LmNvbT5cbiAqL1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFdmVudEVtaXR0ZXIgRG9jc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqICBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudCBuYW1lLlxuICogIEBuYW1lIFRhc2tUaW1lciNlbWl0XG4gKiAgQGZ1bmN0aW9uXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgZW1pdHRlZC5cbiAqICBAcGFyYW0ge2FueX0gW2RhdGFdIC0gRGF0YSB0byBiZSBwYXNzZWQgdG8gZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqICBAcmV0dXJucyB7Qm9vbGVhbn0gLSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuLyoqXG4gKiAgUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqICBsaXN0ZW5lcnMuXG4gKiAgQG5hbWUgVGFza1RpbWVyI2V2ZW50TmFtZXNcbiAqICBAZnVuY3Rpb25cbiAqXG4gKiAgQHJldHVybnMge0FycmF5fSAtIExpc3Qgb2YgZXZlbnQgbmFtZXMuXG4gKi9cbi8qKlxuICogIEFkZHMgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3RlbmVycyBhcnJheSBmb3IgdGhlIGV2ZW50XG4gKiAgbmFtZWQgYGV2ZW50TmFtZWAuIE5vIGNoZWNrcyBhcmUgbWFkZSB0byBzZWUgaWYgdGhlIGxpc3RlbmVyIGhhcyBhbHJlYWR5XG4gKiAgYmVlbiBhZGRlZC4gTXVsdGlwbGUgY2FsbHMgcGFzc2luZyB0aGUgc2FtZSBjb21iaW5hdGlvbiBvZiBgZXZlbnROYW1lYCBhbmRcbiAqICBgbGlzdGVuZXJgIHdpbGwgcmVzdWx0IGluIHRoZSBsaXN0ZW5lciBiZWluZyBhZGRlZCwgYW5kIGNhbGxlZCwgbXVsdGlwbGVcbiAqICB0aW1lcy5cbiAqICBAbmFtZSBUYXNrVGltZXIjb25cbiAqICBAZnVuY3Rpb25cbiAqICBAYWxpYXMgVGFza1RpbWVyI2FkZExpc3RlbmVyXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGFkZGVkLlxuICogIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgcGVyIGV2ZW50LlxuICogIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gLSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKlxuICogIEByZXR1cm5zIHtUYXNrVGltZXJ9IC0gYHtAbGluayAjVGFza1RpbWVyfFRhc2tUaW1lcn1gIGluc3RhbmNlLlxuICpcbiAqICBAZXhhbXBsZVxuICogIGNvbnN0IHRpbWVyID0gbmV3IFRhc2tUaW1lcigxMDAwKTtcbiAqICAvLyBhZGQgYSBsaXN0ZW5lciB0byBiZSBpbnZva2VkIHdoZW4gdGltZXIgaGFzIHN0b3BwZWQuXG4gKiAgdGltZXIub24oVGFza1RpbWVyLkV2ZW50LlNUT1BQRUQsICgpID0+IHtcbiAqICAgICAgY29uc29sZS5sb2coJ1RpbWVyIGhhcyBzdG9wcGVkIScpO1xuICogIH0pO1xuICogIHRpbWVyLnN0YXJ0KCk7XG4gKi9cbi8qKlxuICogIEFkZHMgYSBvbmUgdGltZSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGV2ZW50IG5hbWVkIGBldmVudE5hbWVgLiBUaGUgbmV4dFxuICogIHRpbWUgYGV2ZW50TmFtZWAgaXMgdHJpZ2dlcmVkLCB0aGlzIGBsaXN0ZW5lcmAgaXMgcmVtb3ZlZCBhbmQgdGhlbiBpbnZva2VkLlxuICogIEBuYW1lIFRhc2tUaW1lciNvbmNlXG4gKiAgQGZ1bmN0aW9uXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJlIGFkZGVkLlxuICogIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgcGVyIGV2ZW50LlxuICogIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gLSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKlxuICogIEByZXR1cm5zIHtUYXNrVGltZXJ9IC0gYHtAbGluayAjVGFza1RpbWVyfFRhc2tUaW1lcn1gIGluc3RhbmNlLlxuICovXG4vKipcbiAqICBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYGxpc3RlbmVyYCBmcm9tIHRoZSBsaXN0ZW5lciBhcnJheSBmb3IgdGhlIGV2ZW50XG4gKiAgbmFtZWQgYGV2ZW50TmFtZWAuXG4gKiAgQG5hbWUgVGFza1RpbWVyI29mZlxuICogIEBmdW5jdGlvblxuICogIEBhbGlhcyBUYXNrVGltZXIjcmVtb3ZlTGlzdGVuZXJcbiAqICBAY2hhaW5hYmxlXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgcmVtb3ZlZC5cbiAqICBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHBlciBldmVudC5cbiAqICBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIC0gT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IGhhdmUgdGhpcyBjb250ZXh0LlxuICogIEBwYXJhbSB7Qm9vbGVhbn0gW29uY2U9ZmFsc2VdIC0gT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICpcbiAqICBAcmV0dXJucyB7VGFza1RpbWVyfSAtIGB7QGxpbmsgI1Rhc2tUaW1lcnxUYXNrVGltZXJ9YCBpbnN0YW5jZS5cbiAqL1xuLyoqXG4gKiAgR2V0cyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqICBAbmFtZSBUYXNrVGltZXIjbGlzdGVuZXJDb3VudFxuICogIEBmdW5jdGlvblxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICpcbiAqICBAcmV0dXJucyB7TnVtYmVyfSAtIFRoZSBudW1iZXIgb2YgbGlzdGVuZXJzLlxuICovXG4vKipcbiAqICBHZXRzIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqICBAbmFtZSBUYXNrVGltZXIjbGlzdGVuZXJzXG4gKiAgQGZ1bmN0aW9uXG4gKlxuICogIEBwYXJhbSB7VGFza1RpbWVyLkV2ZW50fSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gKlxuICogIEByZXR1cm5zIHtBcnJheX0gLSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKi9cbi8qKlxuICogIFJlbW92ZXMgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBgZXZlbnROYW1lYC5cbiAqICBAbmFtZSBUYXNrVGltZXIjcmVtb3ZlQWxsTGlzdGVuZXJzXG4gKiAgQGZ1bmN0aW9uXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1Rhc2tUaW1lci5FdmVudH0gW2V2ZW50TmFtZV0gLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYmUgcmVtb3ZlZC5cbiAqXG4gKiAgQHJldHVybnMge1Rhc2tUaW1lcn0gLSBge0BsaW5rICNUYXNrVGltZXJ8VGFza1RpbWVyfWAgaW5zdGFuY2UuXG4gKi9cbi8qKlxuICogIEEgdGltZXIgdXRpbGl0eSBmb3IgcnVubmluZyBwZXJpb2RpYyB0YXNrcyBvbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgdGlja3MuIFRoaXNcbiAqICBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBydW4gb3Igc2NoZWR1bGUgbXVsdGlwbGUgdGFza3Mgb24gYSBzaW5nbGUgdGltZXJcbiAqICBpbnN0YW5jZS5cbiAqXG4gKiAgVGhpcyBjbGFzcyBleHRlbmRzIGBFdmVudEVtaXR0ZXIzYCB3aGljaCBpcyBhbiBgRXZlbnRFbWl0dGVyYCBpbXBsZW1lbnRhdGlvblxuICogIGZvciBib3RoIE5vZGUgYW5kIGJyb3dzZXIuIEZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbiwgcmVmZXIgdG8gTm9kZS5qc1xuICogIGRvY3VtZW50YXRpb24uXG4gKiAgQGNsYXNzXG4gKiAgQGdsb2JhbFxuICpcbiAqICBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqXG4gKiAgQHNlZVxuICogIHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19jbGFzc19ldmVudGVtaXR0ZXJ8RXZlbnRFbWl0dGVyfVxuICovXG52YXIgVGFza1RpbWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYXNrVGltZXIsIF9zdXBlcik7XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQ09OU1RSVUNUT1JcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgQ29uc3RydWN0cyBhIG5ldyBgVGFza1RpbWVyYCBpbnN0YW5jZSB3aXRoIHRoZSBnaXZlbiB0aW1lIGludGVydmFsIChpblxuICAgICAqICBtaWxsaXNlY29uZHMpLlxuICAgICAqICBAY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge0lUYXNrVGltZXJPcHRpb25zfG51bWJlcn0gW29wdGlvbnNdIC0gRWl0aGVyIFRhc2tUaW1lciBvcHRpb25zXG4gICAgICogIG9yIGEgYmFzZSBpbnRlcnZhbCAoaW4gbWlsbGlzZWNvbmRzKS4gU2luY2UgdGhlIHRhc2tzIHJ1biBvbiB0aWNrc1xuICAgICAqICBpbnN0ZWFkIG9mIG1pbGxpc2Vjb25kIGludGVydmFsczsgdGhpcyB2YWx1ZSBvcGVyYXRlcyBhcyB0aGUgYmFzZVxuICAgICAqICByZXNvbHV0aW9uIGZvciBhbGwgdGFza3MuIElmIHlvdSBhcmUgcnVubmluZyBoZWF2eSB0YXNrcywgbG93ZXIgaW50ZXJ2YWxcbiAgICAgKiAgcmVxdWlyZXMgaGlnaGVyIENQVSBwb3dlci4gVGhpcyB2YWx1ZSBjYW4gYmUgdXBkYXRlZCBhbnkgdGltZSBieSBzZXR0aW5nXG4gICAgICogIHRoZSBgaW50ZXJ2YWxgIHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqICBAZXhhbXBsZVxuICAgICAqICBjb25zdCB0aW1lciA9IG5ldyBUYXNrVGltZXIoMTAwMCk7IC8vIG1pbGxpc2Vjb25kc1xuICAgICAqICAvLyBFeGVjdXRlIHNvbWUgY29kZSBvbiBlYWNoIHRpY2suLi5cbiAgICAgKiAgdGltZXIub24oJ3RpY2snLCAoKSA9PiB7XG4gICAgICogICAgICBjb25zb2xlLmxvZygndGljayBjb3VudDogJyArIHRpbWVyLnRpY2tDb3VudCk7XG4gICAgICogICAgICBjb25zb2xlLmxvZygnZWxhcHNlZCB0aW1lOiAnICsgdGltZXIudGltZS5lbGFwc2VkICsgJyBtcy4nKTtcbiAgICAgKiAgfSk7XG4gICAgICogIC8vIGFkZCBhIHRhc2sgbmFtZWQgJ2hlYXJ0YmVhdCcgdGhhdCBydW5zIGV2ZXJ5IDUgdGlja3MgYW5kIGEgdG90YWwgb2YgMTAgdGltZXMuXG4gICAgICogIGNvbnN0IHRhc2sxID0ge1xuICAgICAqICAgICAgaWQ6ICdoZWFydGJlYXQnLFxuICAgICAqICAgICAgdGlja0RlbGF5OiAyMCwgICAvLyB0aWNrcyAodG8gd2FpdCBiZWZvcmUgZmlyc3QgcnVuKVxuICAgICAqICAgICAgdGlja0ludGVydmFsOiA1LCAvLyB0aWNrcyAoaW50ZXJ2YWwpXG4gICAgICogICAgICB0b3RhbFJ1bnM6IDEwLCAgIC8vIHRpbWVzIHRvIHJ1blxuICAgICAqICAgICAgY2FsbGJhY2sodGFzaykge1xuICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2suaWQgKyAnIHRhc2sgaGFzIHJ1biAnICsgdGFzay5jdXJyZW50UnVucyArICcgdGltZXMuJyk7XG4gICAgICogICAgICB9XG4gICAgICogIH07XG4gICAgICogIHRpbWVyLmFkZCh0YXNrMSkuc3RhcnQoKTtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUYXNrVGltZXIob3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fdGltZW91dFJlZiA9IG51bGw7XG4gICAgICAgIF90aGlzLl9pbW1lZGlhdGVSZWYgPSBudWxsO1xuICAgICAgICBfdGhpcy5fcnVuQ291bnQgPSAwO1xuICAgICAgICBfdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgX3RoaXMuXy5vcHRzID0ge307XG4gICAgICAgIHZhciBvcHRzID0gdHlwZW9mIG9wdGlvbnMgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IHsgaW50ZXJ2YWw6IG9wdGlvbnMgfVxuICAgICAgICAgICAgOiBvcHRpb25zIHx8IHt9O1xuICAgICAgICBfdGhpcy5pbnRlcnZhbCA9IG9wdHMuaW50ZXJ2YWw7XG4gICAgICAgIF90aGlzLnByZWNpc2lvbiA9IG9wdHMucHJlY2lzaW9uO1xuICAgICAgICBfdGhpcy5zdG9wT25Db21wbGV0ZWQgPSBvcHRzLnN0b3BPbkNvbXBsZXRlZDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJpbnRlcnZhbFwiLCB7XG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyBQVUJMSUMgKElOU1RBTkNFKSBQUk9QRVJUSUVTXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB0aGUgYmFzZSB0aW1lciBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqICBTaW5jZSB0aGUgdGFza3MgcnVuIG9uIHRpY2tzIGluc3RlYWQgb2YgbWlsbGlzZWNvbmQgaW50ZXJ2YWxzOyB0aGlzXG4gICAgICAgICAqICB2YWx1ZSBvcGVyYXRlcyBhcyB0aGUgYmFzZSByZXNvbHV0aW9uIGZvciBhbGwgdGFza3MuIElmIHlvdSBhcmUgcnVubmluZ1xuICAgICAgICAgKiAgaGVhdnkgdGFza3MsIGxvd2VyIGludGVydmFsIHJlcXVpcmVzIGhpZ2hlciBDUFUgcG93ZXIuIFRoaXMgdmFsdWUgY2FuIGJlXG4gICAgICAgICAqICB1cGRhdGVkIGFueSB0aW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI2ludGVydmFsXG4gICAgICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLm9wdHMuaW50ZXJ2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8ub3B0cy5pbnRlcnZhbCA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAyMCwgREVGQVVMVF9USU1FUl9PUFRJT05TLmludGVydmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwicHJlY2lzaW9uXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgd2hldGhlciB0aW1lciBwcmVjaXNpb24gZW5hYmxlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogIEJlY2F1c2Ugb2YgdGhlIHNpbmdsZS10aHJlYWRlZCwgYXN5bmNocm9ub3VzIG5hdHVyZSBvZiBKYXZhU2NyaXB0LCBlYWNoXG4gICAgICAgICAqICBleGVjdXRpb24gdGFrZXMgYSBwaWVjZSBvZiBDUFUgdGltZSwgYW5kIHRoZSB0aW1lIHRoZXkgaGF2ZSB0byB3YWl0IHdpbGxcbiAgICAgICAgICogIHZhcnksIGRlcGVuZGluZyBvbiB0aGUgbG9hZC4gVGhpcyBjcmVhdGVzIGEgbGF0ZW5jeSBhbmQgY3VtdWxhdGl2ZVxuICAgICAgICAgKiAgZGlmZmVyZW5jZSBpbiBhc3luY2hyb25vdXMgdGltZXJzOyB0aGF0IGdyYWR1YWxseSBpbmNyZWFzZSB0aGVcbiAgICAgICAgICogIGluYWN1cmFjY3kuIGBUYXNrVGltZXJgIG92ZXJjb21lcyB0aGlzIHByb2JsZW0gYXMgbXVjaCBhcyBwb3NzaWJsZTpcbiAgICAgICAgICpcbiAgICAgICAgICogIDxsaT5UaGUgZGVsYXkgYmV0d2VlbiBlYWNoIHRpY2sgaXMgYXV0by1hZGp1c3RlZCB3aGVuIGl0J3Mgb2ZmXG4gICAgICAgICAqICBkdWUgdG8gdGFzay9DUFUgbG9hZHMgb3IgY2xvY2sgZHJpZnRzLjwvbGk+XG4gICAgICAgICAqICA8bGk+SW4gTm9kZS5qcywgYFRhc2tUaW1lcmAgYWxzbyBtYWtlcyB1c2Ugb2YgYHByb2Nlc3MuaHJ0aW1lKClgXG4gICAgICAgICAqICBoaWdoLXJlc29sdXRpb24gcmVhbC10aW1lLiBUaGUgdGltZSBpcyByZWxhdGl2ZSB0byBhbiBhcmJpdHJhcnlcbiAgICAgICAgICogIHRpbWUgaW4gdGhlIHBhc3QgKG5vdCByZWxhdGVkIHRvIHRoZSB0aW1lIG9mIGRheSkgYW5kIHRoZXJlZm9yZSBub3RcbiAgICAgICAgICogIHN1YmplY3QgdG8gY2xvY2sgZHJpZnRzLjwvbGk+XG4gICAgICAgICAqICA8bGk+VGhlIHRpbWVyIG1heSBoaXQgYSBzeW5jaHJvbm91cyAvIGJsb2NraW5nIHRhc2s7IG9yIGRldGVjdCBzaWduaWZpY2FudFxuICAgICAgICAgKiAgdGltZSBkcmlmdCAobG9uZ2VyIHRoYW4gdGhlIGJhc2UgaW50ZXJ2YWwpIGR1ZSB0byBKUyBldmVudCBxdWV1ZSwgd2hpY2hcbiAgICAgICAgICogIGNhbm5vdCBiZSByZWNvdmVyZWQgYnkgc2ltcGx5IGFkanVzdGluZyB0aGUgbmV4dCBkZWxheS4gSW4gdGhpcyBjYXNlLCByaWdodFxuICAgICAgICAgKiAgZnJvbSB0aGUgbmV4dCB0aWNrIG9ud2FyZDsgaXQgd2lsbCBhdXRvLXJlY292ZXIgYXMgbXVjaCBhcyBwb3NzaWJsZSBieVxuICAgICAgICAgKiAgcnVubmluZyBcImltbWVkaWF0ZVwiIHRhc2tzIHVudGlsIGl0IHJlYWNoZXMgdGhlIHByb3BlciB0aW1lIHZzIHRpY2svcnVuXG4gICAgICAgICAqICBiYWxhbmNlLjwvbGk+XG4gICAgICAgICAqXG4gICAgICAgICAqICA8YmxvY2txdW90ZT48aT5Ob3RlIHRoYXQgcHJlY2lzaW9uIHdpbGwgYmUgYXMgaGlnaCBhcyBwb3NzaWJsZSBidXQgaXQgc3RpbGxcbiAgICAgICAgICogIGNhbiBiZSBvZmYgYnkgYSBmZXcgbWlsbGlzZWNvbmRzOyBkZXBlbmRpbmcgb24gdGhlIENQVSBvciB0aGUgbG9hZC48L2k+XG4gICAgICAgICAqICA8L2Jsb2NrcXVvdGU+XG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjcHJlY2lzaW9uXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5vcHRzLnByZWNpc2lvbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5vcHRzLnByZWNpc2lvbiA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgREVGQVVMVF9USU1FUl9PUFRJT05TLnByZWNpc2lvbik7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInN0b3BPbkNvbXBsZXRlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHdoZXRoZXIgdGhlIHRpbWVyIHNob3VsZCBhdXRvbWF0aWNhbGx5IHN0b3Agd2hlbiBhbGwgdGFza3NcbiAgICAgICAgICogIGFyZSBjb21wbGV0ZWQuIEZvciB0aGlzIHRvIHRha2UgYWZmZWN0LCBhbGwgYWRkZWQgdGFza3Mgc2hvdWxkIGhhdmVcbiAgICAgICAgICogIGB0b3RhbFJ1bnNgIGFuZC9vciBgc3RvcERhdGVgIGNvbmZpZ3VyZWQuIFRoaXMgb3B0aW9uIGNhbiBiZSBzZXQvY2hhbmdlZFxuICAgICAgICAgKiAgYXQgYW55IHRpbWUuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjc3RvcE9uQ29tcGxldGVkXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5vcHRzLnN0b3BPbkNvbXBsZXRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5vcHRzLnN0b3BPbkNvbXBsZXRlZCA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgREVGQVVMVF9USU1FUl9PUFRJT05TLnN0b3BPbkNvbXBsZXRlZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInN0YXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIEZvciBwb3NzaWJsZSB2YWx1ZXMsIHNlZSBgVGFza1RpbWVyLlN0YXRlYCBlbnVtZXJhdGlvbi5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciNzdGF0ZVxuICAgICAgICAgKiAgQHR5cGUge1Rhc2tUaW1lci5TdGF0ZX1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnN0YXRlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJ0aW1lXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRpbWUgaW5mb3JtYXRpb24gZm9yIHRoZSBsYXRlc3QgcnVuIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIGAjdGltZS5zdGFydGVkYCBpbmRpY2F0ZXMgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgYCN0aW1lLnN0b3BwZWRgIGluZGljYXRlcyB0aGUgc3RvcCB0aW1lIG9mIHRoZSB0aW1lci4gKGAwYCBpZiBzdGlsbCBydW5uaW5nLilcbiAgICAgICAgICogIGAjdGltZS5lbGFwc2VkYCBpbmRpY2F0ZXMgdGhlIGVsYXBzZWQgdGltZSBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBAbmFtZSBUYXNrVGltZXIjdGltZVxuICAgICAgICAgKiAgQHR5cGUge0lUaW1lSW5mb31cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLl8sIHN0YXJ0VGltZSA9IF9hLnN0YXJ0VGltZSwgc3RvcFRpbWUgPSBfYS5zdG9wVGltZTtcbiAgICAgICAgICAgIHZhciB0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0ZWQ6IHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICBzdG9wcGVkOiBzdG9wVGltZSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5zdGF0ZSAhPT0gVGFza1RpbWVyLlN0YXRlLlNUT1BQRUQgPyBEYXRlLm5vdygpIDogc3RvcFRpbWU7XG4gICAgICAgICAgICAgICAgdC5lbGFwc2VkID0gY3VycmVudCAtIHN0YXJ0VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHQpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJ0aWNrQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIGN1cnJlbnQgdGljayBjb3VudCBmb3IgdGhlIGxhdGVzdCBydW4gb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgVGhpcyB2YWx1ZSB3aWxsIGJlIHJlc2V0IHRvIGAwYCB3aGVuIHRoZSB0aW1lciBpcyBzdG9wcGVkIG9yIHJlc2V0LlxuICAgICAgICAgKiAgQG5hbWUgVGFza1RpbWVyI3RpY2tDb3VudFxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnRpY2tDb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwidGFza0NvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBjdXJyZW50IHRhc2sgY291bnQuIFRhc2tzIHJlbWFpbiBldmVuIGFmdGVyIHRoZSB0aW1lciBpc1xuICAgICAgICAgKiAgc3RvcHBlZC4gQnV0IHRoZXkgd2lsbCBiZSByZW1vdmVkIGlmIHRoZSB0aW1lciBpcyByZXNldC5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciN0YXNrQ291bnRcbiAgICAgICAgICogIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuXy50YXNrcykubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJ0YXNrUnVuQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIHRvdGFsIG51bWJlciBvZiBhbGwgdGFzayBleGVjdXRpb25zIChydW5zKS5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciN0YXNrUnVuQ291bnRcbiAgICAgICAgICogIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy50YXNrUnVuQ291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInJ1bkNvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXIgcnVucywgaW5jbHVkaW5nIHJlc3VtZWQgcnVucy5cbiAgICAgICAgICogIEBuYW1lIFRhc2tUaW1lciNydW5Db3VudFxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcnVuQ291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVQkxJQyAoSU5TVEFOQ0UpIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgR2V0cyB0aGUgdGFzayB3aXRoIHRoZSBnaXZlbiBJRC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqXG4gICAgICogIEBwYXJhbSB7U3RyaW5nfSBpZCAtIElEIG9mIHRoZSB0YXNrLlxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl8udGFza3NbaWRdIHx8IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQWRkcyBhIGNvbGxlY3Rpb24gb2YgbmV3IHRhc2tzIGZvciB0aGUgdGltZXIuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEBwYXJhbSB7VGFza3xJVGFza09wdGlvbnN8VGFza0NhbGxiYWNrfEFycmF5fSB0YXNrIC0gRWl0aGVyIGFcbiAgICAgKiAgc2luZ2xlIHRhc2ssIHRhc2sgb3B0aW9ucyBvYmplY3Qgb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uOyBvciBhIG1peHR1cmVcbiAgICAgKiAgb2YgdGhlc2UgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKlxuICAgICAqICBAdGhyb3dzIHtFcnJvcn0gLSBJZiBhIHRhc2sgY2FsbGJhY2sgaXMgbm90IHNldCBvciBhIHRhc2sgd2l0aCB0aGUgZ2l2ZW5cbiAgICAgKiAgbmFtZSBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdXRpbHNfMS51dGlscy5pc3NldCh0YXNrKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgYSB0YXNrLCB0YXNrIG9wdGlvbnMgb3IgYSBjYWxsYmFjayBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB1dGlsc18xLnV0aWxzLmVuc3VyZUFycmF5KHRhc2spLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLl9hZGQoaXRlbSk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBSZW1vdmVzIHRoZSB0YXNrIGJ5IHRoZSBnaXZlbiBuYW1lLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge3N0cmluZ3xUYXNrfSB0YXNrIC0gVGFzayB0byBiZSByZW1vdmVkLiBFaXRoZXIgcGFzcyB0aGVcbiAgICAgKiAgbmFtZSBvciB0aGUgdGFzayBpdHNlbGYuXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKlxuICAgICAqICBAdGhyb3dzIHtFcnJvcn0gLSBJZiBhIHRhc2sgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHZhciBpZCA9IHR5cGVvZiB0YXNrID09PSAnc3RyaW5nJyA/IHRhc2sgOiB0YXNrLmlkO1xuICAgICAgICB0YXNrID0gdGhpcy5nZXQoaWQpO1xuICAgICAgICBpZiAoIWlkIHx8ICF0YXNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0YXNrcyBleGlzdCB3aXRoIElEOiAnXCIgKyBpZCArIFwiJy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmlyc3QgZGVjcmVtZW50IGNvbXBsZXRlZCB0YXNrcyBjb3VudCBpZiB0aGlzIGlzIGEgY29tcGxldGVkIHRhc2suXG4gICAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCAmJiB0aGlzLl8uY29tcGxldGVkVGFza0NvdW50ID4gMClcbiAgICAgICAgICAgIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQtLTtcbiAgICAgICAgdGhpcy5fLnRhc2tzW2lkXSA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl8udGFza3NbaWRdO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5UQVNLX1JFTU9WRUQsIHRhc2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTdGFydHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgUlVOTklOR2Agc3RhdGUuIElmIGl0J3MgYWxyZWFkeVxuICAgICAqICBydW5uaW5nLCB0aGlzIHdpbGwgcmVzZXQgdGhlIHN0YXJ0L3N0b3AgdGltZSBhbmQgdGljayBjb3VudCwgYnV0IHdpbGwgbm90XG4gICAgICogIHJlc2V0IChvciByZW1vdmUpIGV4aXN0aW5nIHRhc2tzLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkc7XG4gICAgICAgIHRoaXMuX3J1bkNvdW50Kys7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl8udGFza1J1bkNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fLnN0b3BUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fbWFya1RpbWUoKTtcbiAgICAgICAgdGhpcy5fLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlNUQVJURUQpO1xuICAgICAgICB0aGlzLl9ydW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUGF1c2VzIHRoZSB0aW1lciwgcHV0cyB0aGUgdGltZXIgaW4gYFBBVVNFRGAgc3RhdGUgYW5kIGFsbCB0YXNrcyBvbiBob2xkLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5QQVVTRUQ7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlBBVVNFRCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlc3VtZXMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgUlVOTklOR2Agc3RhdGU7IGlmIHByZXZpdW9zbHlcbiAgICAgKiAgcGF1c2VkLiBJbiB0aGlzIHN0YXRlLCBhbGwgZXhpc3RpbmcgdGFza3MgYXJlIHJlc3VtZWQuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBUYXNrVGltZXIuU3RhdGUuSURMRSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFRhc2tUaW1lci5TdGF0ZS5QQVVTRUQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5fcnVuQ291bnQrKztcbiAgICAgICAgdGhpcy5fbWFya1RpbWUoKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkc7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LlJFU1VNRUQpO1xuICAgICAgICB0aGlzLl9ydW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU3RvcHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgU1RPUFBFRGAgc3RhdGUuIEluIHRoaXMgc3RhdGUsIGFsbFxuICAgICAqICBleGlzdGluZyB0YXNrcyBhcmUgc3RvcHBlZCBhbmQgbm8gdmFsdWVzIG9yIHRhc2tzIGFyZSByZXNldCB1bnRpbFxuICAgICAqICByZS1zdGFydGVkIG9yIGV4cGxpY2l0bHkgY2FsbGluZyByZXNldC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgICAgIHRoaXMuXy5zdG9wVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5TVE9QUEVEO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5TVE9QUEVEKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU3RvcHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgSURMRWAgc3RhdGUuXG4gICAgICogIFRoaXMgd2lsbCByZXNldCB0aGUgdGlja3MgYW5kIHJlbW92ZXMgYWxsIHRhc2tzIHNpbGVudGx5OyBtZWFuaW5nIG5vXG4gICAgICogIG90aGVyIGV2ZW50cyB3aWxsIGJlIGVtaXR0ZWQgc3VjaCBhcyBgXCJ0YXNrUmVtb3ZlZFwiYC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5SRVNFVCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFJJVkFURSAoSU5TVEFOQ0UpIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xuICAgICAgICAgICAgbmFtZTogdHlwZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdCh0eXBlLCBldmVudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQWRkcyBhIG5ldyB0YXNrIGZvciB0aGUgdGltZXIuXG4gICAgICogIEBwcml2YXRlXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtUYXNrfElUYXNrT3B0aW9uc3xUYXNrQ2FsbGJhY2t9IG9wdGlvbnMgLSBFaXRoZXIgYSB0YXNrIGluc3RhbmNlLFxuICAgICAqICB0YXNrIG9wdGlvbnMgb2JqZWN0IG9yIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiB0aWNrXG4gICAgICogIGludGVydmFscy5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqXG4gICAgICogIEB0aHJvd3Mge0Vycm9yfSAtIElmIHRoZSB0YXNrIGNhbGxiYWNrIGlzIG5vdCBzZXQgb3IgYSB0YXNrIHdpdGggdGhlXG4gICAgICogIGdpdmVuIG5hbWUgYWxyZWFkeSBleGlzdHMuXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fYWRkID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBvcHRpb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlsc18xLnV0aWxzLnR5cGUob3B0aW9ucykgPT09ICdvYmplY3QnICYmICFvcHRpb25zLmlkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmlkID0gdGhpcy5fZ2V0VW5pcXVlVGFza0lEKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ2V0KG9wdGlvbnMuaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRhc2sgd2l0aCBpZCAnXCIgKyBvcHRpb25zLmlkICsgXCInIGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFzayA9IG9wdGlvbnMgaW5zdGFuY2VvZiBfMS5UYXNrID8gb3B0aW9ucyA6IG5ldyBfMS5UYXNrKG9wdGlvbnMpO1xuICAgICAgICB0YXNrLl9zZXRUaW1lcih0aGlzKTtcbiAgICAgICAgdGhpcy5fLnRhc2tzW3Rhc2suaWRdID0gdGFzaztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuVEFTS19BRERFRCwgdGFzayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFN0b3BzIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl8udGlja0NvdW50QWZ0ZXJSZXN1bWUgPSAwO1xuICAgICAgICBpZiAodGhpcy5fdGltZW91dFJlZikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRSZWYpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ltbWVkaWF0ZVJlZikge1xuICAgICAgICAgICAgdXRpbHNfMS51dGlscy5jbGVhckltbWVkaWF0ZSh0aGlzLl9pbW1lZGlhdGVSZWYpO1xuICAgICAgICAgICAgdGhpcy5faW1tZWRpYXRlUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlc2V0cyB0aGUgdGltZXIuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuXyA9IHtcbiAgICAgICAgICAgIG9wdHM6ICh0aGlzLl8gfHwge30pLm9wdHMsXG4gICAgICAgICAgICBzdGF0ZTogVGFza1RpbWVyLlN0YXRlLklETEUsXG4gICAgICAgICAgICB0YXNrczoge30sXG4gICAgICAgICAgICB0aWNrQ291bnQ6IDAsXG4gICAgICAgICAgICB0YXNrUnVuQ291bnQ6IDAsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDAsXG4gICAgICAgICAgICBzdG9wVGltZTogMCxcbiAgICAgICAgICAgIGNvbXBsZXRlZFRhc2tDb3VudDogMCxcbiAgICAgICAgICAgIHJlc3VtZVRpbWU6IDAsXG4gICAgICAgICAgICBoclJlc3VtZVRpbWU6IG51bGwsXG4gICAgICAgICAgICB0aWNrQ291bnRBZnRlclJlc3VtZTogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQ2FsbGVkIChieSBUYXNrIGluc3RhbmNlKSB3aGVuIGl0IGhhcyBjb21wbGV0ZWQgYWxsIG9mIGl0cyBydW5zLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fdGFza0NvbXBsZXRlZCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQrKztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnQuVEFTS19DT01QTEVURUQsIHRhc2spO1xuICAgICAgICBpZiAodGhpcy5fLmNvbXBsZXRlZFRhc2tDb3VudCA9PT0gdGhpcy50YXNrQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50LkNPTVBMRVRFRCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wT25Db21wbGV0ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhc2sucmVtb3ZlT25Db21wbGV0ZWQpXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh0YXNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBIYW5kbGVyIHRvIGJlIGV4ZWN1dGVkIG9uIGVhY2ggdGljay5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl8uc3RhdGUgPSBUYXNrVGltZXIuU3RhdGUuUlVOTklORztcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICB2YXIgdGFzaztcbiAgICAgICAgdmFyIHRhc2tzID0gdGhpcy5fLnRhc2tzO1xuICAgICAgICB0aGlzLl8udGlja0NvdW50Kys7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnRBZnRlclJlc3VtZSsrO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5USUNLKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6Zm9yaW5cbiAgICAgICAgZm9yIChpZCBpbiB0YXNrcykge1xuICAgICAgICAgICAgdGFzayA9IHRhc2tzW2lkXTtcbiAgICAgICAgICAgIGlmICghdGFzayB8fCAhdGFzay5jYW5SdW5PblRpY2spXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBiZWxvdyB3aWxsIG5vdCBleGVjdXRlIGlmIHRhc2sgaXMgZGlzYWJsZWQgb3IgYWxyZWFkeVxuICAgICAgICAgICAgLy8gY29tcGxldGVkLlxuICAgICAgICAgICAgdGFzay5fcnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fLnRhc2tSdW5Db3VudCsrO1xuICAgICAgICAgICAgICAgIF90aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudC5UQVNLLCB0YXNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3J1bigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIE1hcmtzIHRoZSByZXN1bWUgKG9yIHN0YXJ0KSB0aW1lIGluIG1pbGxpc2Vjb25kcyBvciBoaWdoLXJlc29sdXRpb24gdGltZVxuICAgICAqICBpZiBhdmFpbGFibGUuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fbWFya1RpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodXRpbHNfMS51dGlscy5CUk9XU0VSKSB7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgICAgICB0aGlzLl8ucmVzdW1lVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl8uaHJSZXN1bWVUaW1lID0gcHJvY2Vzcy5ocnRpbWUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIEdldHMgdGhlIHRpbWUgZGlmZmVyZW5jZSBpbiBtaWxsaXNlY29uZHMgc2luY3QgdGhlIGxhc3QgcmVzdW1lIG9yIHN0YXJ0XG4gICAgICogIHRpbWUuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fZ2V0VGltZURpZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIERhdGUubm93KCkgaXMgfjJ4IGZhc3RlciB0aGFuIERhdGUjZ2V0VGltZSgpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodXRpbHNfMS51dGlscy5CUk9XU0VSKVxuICAgICAgICAgICAgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLl8ucmVzdW1lVGltZTsgLy8gdGVzdGVkIHNlcGFyYXRlbHlcbiAgICAgICAgdmFyIGhyRGlmZiA9IHByb2Nlc3MuaHJ0aW1lKHRoaXMuXy5oclJlc3VtZVRpbWUpO1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKChockRpZmZbMF0gKiAxMDAwKSArIChockRpZmZbMV0gLyAxZTYpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBSdW5zIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGludGVydmFsID0gdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgLy8gd2UnbGwgZ2V0IGEgcHJlY2lzZSBpbnRlcnZhbCBieSBjaGVja2luZyBpZiBvdXIgY2xvY2sgaXMgYWxyZWFkeVxuICAgICAgICAvLyBkcmlmdGVkLlxuICAgICAgICBpZiAodGhpcy5wcmVjaXNpb24pIHtcbiAgICAgICAgICAgIHZhciBkaWZmID0gdGhpcy5fZ2V0VGltZURpZmYoKTtcbiAgICAgICAgICAgIC8vIGRpZCB3ZSByZWFjaCB0aGlzIGV4cGVjdGVkIHRpY2sgY291bnQgZm9yIHRoZSBnaXZlbiB0aW1lIHBlcmlvZD9cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZWQgY291bnQgc2hvdWxkIG5vdCBiZSBncmVhdGVyIHRoYW4gdGlja0NvdW50QWZ0ZXJSZXN1bWVcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKGRpZmYgLyBpbnRlcnZhbCkgPiB0aGlzLl8udGlja0NvdW50QWZ0ZXJSZXN1bWUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSByZWFsbHkgbGF0ZSwgcnVuIGltbWVkaWF0ZWx5IVxuICAgICAgICAgICAgICAgIHRoaXMuX2ltbWVkaWF0ZVJlZiA9IHV0aWxzXzEudXRpbHMuc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl90aWNrKCk7IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgdGltZSBidXQgYSBiaXQgb2ZmLCB1cGRhdGUgbmV4dCBpbnRlcnZhbC5cbiAgICAgICAgICAgIGludGVydmFsID0gaW50ZXJ2YWwgLSAoZGlmZiAlIGludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lb3V0UmVmID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fdGljaygpOyB9LCBpbnRlcnZhbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgR2V0cyBhIHVuaXF1ZSB0YXNrIElELlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX2dldFVuaXF1ZVRhc2tJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG51bSA9IHRoaXMudGFza0NvdW50O1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHdoaWxlICghaWQgfHwgdGhpcy5nZXQoaWQpKSB7XG4gICAgICAgICAgICBudW0rKztcbiAgICAgICAgICAgIGlkID0gJ3Rhc2snICsgbnVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuICAgIHJldHVybiBUYXNrVGltZXI7XG59KGV2ZW50ZW1pdHRlcjNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuVGFza1RpbWVyID0gVGFza1RpbWVyO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBOQU1FU1BBQ0Vcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gdHNsaW50OmRpc2FibGU6bm8tbmFtZXNwYWNlXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyoqIEBwcml2YXRlICovXG4oZnVuY3Rpb24gKFRhc2tUaW1lcikge1xuICAgIC8qKlxuICAgICAqICBSZXByZXNlbnRzIHRoZSBjbGFzcyB0aGF0IGhvbGRzIHRoZSBjb25maWd1cmF0aW9ucyBhbmQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogIHJlcXVpcmVkIHRvIHJ1biBhIHRhc2suIFNlZSB7QGxpbmsgYXBpLyNUYXNrfGNsYXNzIGluZm9ybWF0aW9ufS5cbiAgICAgKiAgQG5hbWUgVGFza1RpbWVyLlRhc2tcbiAgICAgKiAgQGNsYXNzXG4gICAgICovXG4gICAgVGFza1RpbWVyLlRhc2sgPSBfMS5UYXNrO1xuICAgIC8qKlxuICAgICAqICBFbnVtZXJhdGVzIGBUYXNrVGltZXJgIHN0YXRlcy5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAZW51bSB7U3RyaW5nfVxuICAgICAqICBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICB2YXIgU3RhdGU7XG4gICAgKGZ1bmN0aW9uIChTdGF0ZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEluZGljYXRlcyB0aGF0IHRoZSB0aW1lciBpcyBpbiBgaWRsZWAgc3RhdGUuXG4gICAgICAgICAqICBUaGlzIGlzIHRoZSBpbml0aWFsIHN0YXRlIHdoZW4gdGhlIGBUYXNrVGltZXJgIGluc3RhbmNlIGlzIGZpcnN0IGNyZWF0ZWQuXG4gICAgICAgICAqICBBbHNvIHdoZW4gYW4gZXhpc3RpbmcgdGltZXIgaXMgcmVzZXQsIGl0IHdpbGwgYmUgYGlkbGVgLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlW1wiSURMRVwiXSA9IFwiaWRsZVwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEluZGljYXRlcyB0aGF0IHRoZSB0aW1lciBpcyBpbiBgcnVubmluZ2Agc3RhdGU7IHN1Y2ggYXMgd2hlbiB0aGUgdGltZXIgaXNcbiAgICAgICAgICogIHN0YXJ0ZWQgb3IgcmVzdW1lZC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZVtcIlJVTk5JTkdcIl0gPSBcInJ1bm5pbmdcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYHBhdXNlZGAgc3RhdGUuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGVbXCJQQVVTRURcIl0gPSBcInBhdXNlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEluZGljYXRlcyB0aGF0IHRoZSB0aW1lciBpcyBpbiBgc3RvcHBlZGAgc3RhdGUuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGVbXCJTVE9QUEVEXCJdID0gXCJzdG9wcGVkXCI7XG4gICAgfSkoU3RhdGUgPSBUYXNrVGltZXIuU3RhdGUgfHwgKFRhc2tUaW1lci5TdGF0ZSA9IHt9KSk7XG4gICAgLyoqXG4gICAgICogIEVudW1lcmF0ZXMgdGhlIGBUYXNrVGltZXJgIGV2ZW50IHR5cGVzLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBlbnVtIHtTdHJpbmd9XG4gICAgICogIEByZWFkb25seVxuICAgICAqL1xuICAgIHZhciBFdmVudDtcbiAgICAoZnVuY3Rpb24gKEV2ZW50KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCBvbiBlYWNoIHRpY2sgKGludGVydmFsKSBvZiBgVGFza1RpbWVyYC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlRJQ0tcIl0gPSBcInRpY2tcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gdGhlIHRpbWVyIGlzIHB1dCBpbiBgUlVOTklOR2Agc3RhdGU7IHN1Y2ggYXMgd2hlbiB0aGUgdGltZXIgaXNcbiAgICAgICAgICogIHN0YXJ0ZWQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJTVEFSVEVEXCJdID0gXCJzdGFydGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyBwdXQgaW4gYFJVTk5JTkdgIHN0YXRlOyBzdWNoIGFzIHdoZW4gdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICByZXN1bWVkLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiUkVTVU1FRFwiXSA9IFwicmVzdW1lZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcHV0IGluIGBQQVVTRURgIHN0YXRlLlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiUEFVU0VEXCJdID0gXCJwYXVzZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gdGhlIHRpbWVyIGlzIHB1dCBpbiBgU1RPUFBFRGAgc3RhdGUuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJTVE9QUEVEXCJdID0gXCJzdG9wcGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyByZXNldC5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlJFU0VUXCJdID0gXCJyZXNldFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgaXMgZXhlY3V0ZWQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJUQVNLXCJdID0gXCJ0YXNrXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGEgdGFzayBpcyBhZGRlZCB0byBgVGFza1RpbWVyYCBpbnN0YW5jZS5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlRBU0tfQURERURcIl0gPSBcInRhc2tBZGRlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgaXMgcmVtb3ZlZCBmcm9tIGBUYXNrVGltZXJgIGluc3RhbmNlLlxuICAgICAgICAgKiAgTm90ZSB0aGF0IHRoaXMgd2lsbCBub3QgYmUgZW1pdHRlZCB3aGVuIGAucmVzZXQoKWAgaXMgY2FsbGVkOyB3aGljaFxuICAgICAgICAgKiAgcmVtb3ZlcyBhbGwgdGFza3Mgc2lsZW50bHkuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJUQVNLX1JFTU9WRURcIl0gPSBcInRhc2tSZW1vdmVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGEgdGFzayBoYXMgY29tcGxldGVkIGFsbCBvZiBpdHMgZXhlY3V0aW9ucyAocnVucylcbiAgICAgICAgICogIG9yIHJlYWNoZWQgaXRzIHN0b3BwaW5nIGRhdGUvdGltZSAoaWYgc2V0KS4gTm90ZSB0aGF0IHRoaXMgZXZlbnRcbiAgICAgICAgICogIHdpbGwgb25seSBiZSBmaXJlZCBpZiB0aGUgdGFza3MgaGFzIGEgYHRvdGFsUnVuc2AgbGltaXQgb3IgYVxuICAgICAgICAgKiAgYHN0b3BEYXRlYCB2YWx1ZSBzZXQuXG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRbXCJUQVNLX0NPTVBMRVRFRFwiXSA9IFwidGFza0NvbXBsZXRlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgcHJvZHVjZXMgYW4gZXJyb3Igb24gaXRzIGV4ZWN1dGlvbi5cbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFtcIlRBU0tfRVJST1JcIl0gPSBcInRhc2tFcnJvclwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhbGwgdGFza3MgaGF2ZSBjb21wbGV0ZWQgYWxsIG9mIHRoZWlyIGV4ZWN1dGlvbnMgKHJ1bnMpXG4gICAgICAgICAqICBvciByZWFjaGVkIHRoZWlyIHN0b3BwaW5nIGRhdGUvdGltZSAoaWYgc2V0KS4gTm90ZSB0aGF0IHRoaXMgZXZlbnRcbiAgICAgICAgICogIHdpbGwgb25seSBiZSBmaXJlZCBpZiBhbGwgdGFza3MgaGF2ZSBhIGB0b3RhbFJ1bnNgIGxpbWl0IG9yIGFcbiAgICAgICAgICogIGBzdG9wRGF0ZWAgdmFsdWUgc2V0LlxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50W1wiQ09NUExFVEVEXCJdID0gXCJjb21wbGV0ZWRcIjtcbiAgICB9KShFdmVudCA9IFRhc2tUaW1lci5FdmVudCB8fCAoVGFza1RpbWVyLkV2ZW50ID0ge30pKTtcbn0pKFRhc2tUaW1lciB8fCAoVGFza1RpbWVyID0ge30pKTtcbmV4cG9ydHMuVGFza1RpbWVyID0gVGFza1RpbWVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4vVGFza1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9UYXNrVGltZXJcIikpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xudmFyIE5PREUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIHByb2Nlc3MuaHJ0aW1lID09PSAnZnVuY3Rpb24nO1xudmFyIEJST1dTRVIgPSAhTk9ERTtcbi8qKiBAcHJpdmF0ZSAqL1xudmFyIHV0aWxzID0ge1xuICAgIE5PREU6IE5PREUsXG4gICAgQlJPV1NFUjogQlJPV1NFUixcbiAgICB0eXBlOiBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gcHJvdG8udG9TdHJpbmcuY2FsbChvKS5tYXRjaCgvXFxzKFxcdyspL2kpWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgfSxcbiAgICBpc3NldDogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8gIT09IG51bGwgJiYgbyAhPT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgZW5zdXJlQXJyYXk6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5pc3NldChvKVxuICAgICAgICAgICAgPyAhQXJyYXkuaXNBcnJheShvKSA/IFtvXSA6IG9cbiAgICAgICAgICAgIDogW107XG4gICAgfSxcbiAgICBnZXROdW1iZXI6IGZ1bmN0aW9uICh2YWx1ZSwgbWluaW11bSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/ICh2YWx1ZSA8IG1pbmltdW0gPyBtaW5pbXVtIDogdmFsdWUpXG4gICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9LFxuICAgIGdldEJvb2w6IGZ1bmN0aW9uICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJ1xuICAgICAgICAgICAgPyBkZWZhdWx0VmFsdWVcbiAgICAgICAgICAgIDogdmFsdWU7XG4gICAgfSxcbiAgICBzZXRJbW1lZGlhdGU6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHV0aWxzLkJST1dTRVIpIHsgLy8gdGVzdGVkIHNlcGFyYXRlbHlcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNiLmFwcGx5KG51bGwsIGFyZ3MpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0SW1tZWRpYXRlLmFwcGx5KHZvaWQgMCwgW2NiXS5jb25jYXQoYXJncykpO1xuICAgIH0sXG4gICAgY2xlYXJJbW1lZGlhdGU6IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoIWlkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHV0aWxzLkJST1dTRVIpXG4gICAgICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTsgLy8gdGVzdGVkIHNlcGFyYXRlbHlcbiAgICAgICAgY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHByb21pc2UuXG4gICAgICogIEBwcml2YXRlXG4gICAgICogIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFZhbHVlIHRvIGJlIGNoZWNrZWQuXG4gICAgICogIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNQcm9taXNlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICAmJiB1dGlscy50eXBlKHZhbHVlKSA9PT0gJ3Byb21pc2UnXG4gICAgICAgICAgICAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG59O1xuZXhwb3J0cy51dGlscyA9IHV0aWxzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==