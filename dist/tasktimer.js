(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TaskTimer", [], factory);
	else if(typeof exports === 'object')
		exports["TaskTimer"] = factory();
	else
		root["TaskTimer"] = factory();
})(this, function() {
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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _tasktimer = __webpack_require__(1);
	
	var _tasktimer2 = _interopRequireDefault(_tasktimer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// export default re;
	// http://stackoverflow.com/a/33683495/112731
	module.exports = _tasktimer2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _eventemitter = __webpack_require__(2);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEFAULT = {
	    INTERVAL: 1000
	};
	
	/**
	 *  TaskTimer • https://github.com/onury/tasktimer
	 *  @license MIT
	 *  @copyright 2016, Onur Yıldırım (onur@cutepilot.com)
	 */
	
	/**
	 *  A timer utility for running periodic tasks on the given interval ticks.
	 *  This is useful when you want to run or schedule multiple tasks on a single
	 *  timer instance.
	 *
	 *  This class extends `EventEmitter3` which is an `EventEmitter` implementation
	 *  for both Node and browser. Only a small set of its methods are documented in
	 *  this documentation. For a complete list, refer to Node.js documentation.
	 *
	 *  @see `{@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}`
	 */
	
	var TaskTimer = function (_EventEmitter) {
	    _inherits(TaskTimer, _EventEmitter);
	
	    // ---------------------------
	    // CONSTRUCTOR
	    // ---------------------------
	
	    /**
	     * Constructs a new `TaskTimer` instance with the given time interval (in milliseconds).
	     * @constructor
	     *
	     * @param {Number} [interval=1000] - Timer interval in milliseconds.
	     * Since the tasks run on ticks instead of millisecond intervals; this value
	     * operates as the base resolution for all tasks. If you are running heavy
	     * tasks, lower interval requires higher CPU power. This value can be
	     * updated any time by setting the `interval` property on the instance.
	     * @returns {Object} - A new instance of `TaskTimer`.
	     *
	     * @example
	     * var timer = new TaskTimer(1000); // milliseconds
	     * // Execute some code on each tick...
	     * timer.on("tick", function () {
	     *     console.log("tick count: " + timer.tickCount);
	     *     console.log("elapsed time: " + timer.time.elapsed + " ms.");
	     * });
	     * // Or add a task named "heartbeat" that runs every 5 ticks and a total of 10 times.
	     * var task = {
	     *     name: "heartbeat",
	     *     tickInterval: 5, // ticks
	     *     totalRuns: 10, // times
	     *     callback: function (task) {
	     *         console.log(task.name + " task has run " + task.currentRuns + " times.");
	     *     }
	     * };
	     * timer.addTask(task).start();
	     */
	    function TaskTimer() {
	        var interval = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT.INTERVAL : arguments[0];
	
	        _classCallCheck(this, TaskTimer);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TaskTimer).call(this));
	
	        _this._ = {};
	        _this._reset();
	        _this._.interval = interval;
	        return _this;
	    }
	
	    // ---------------------------
	    // PUBLIC (INSTANCE) PROPERTIES
	    // ---------------------------
	
	    /**
	     * Gets or sets the interval of the timer, in milliseconds.
	     * Note that this will directly affect each task's execution times.
	     *
	     * @memberof TaskTimer
	     * @type {Number}
	     */
	
	
	    _createClass(TaskTimer, [{
	        key: '_stop',
	
	
	        // ---------------------------
	        // PRIVATE (INSTANCE) METHODS
	        // ---------------------------
	
	        /**
	         * Stops the timer.
	         * @private
	         */
	        value: function _stop() {
	            if (this._.timer) {
	                clearInterval(this._.timer);
	                this._.timer = null;
	            }
	        }
	
	        /**
	         * Resets the timer.
	         * @private
	         */
	
	    }, {
	        key: '_reset',
	        value: function _reset() {
	            this._stop();
	            var interval = this._.interval;
	            this._ = {
	                interval: interval,
	                timer: null,
	                state: TaskTimer.State.IDLE,
	                tasks: {},
	                tickCount: 0,
	                startTime: 0,
	                stopTime: 0
	            };
	        }
	
	        /**
	         * Handler to be executed on each tick.
	         * @private
	         */
	
	    }, {
	        key: '_tick',
	        value: function _tick() {
	            var name = void 0,
	                task = void 0,
	                tasks = this._.tasks;
	
	            this._.tickCount += 1;
	            this.emit(TaskTimer.Event.TICK);
	
	            for (name in this._.tasks) {
	                if (tasks[name]) {
	                    task = tasks[name];
	                    if (this._.tickCount % task.tickInterval === 0) {
	                        if (!task.totalRuns || task.currentRuns < task.totalRuns) {
	                            task.currentRuns += 1;
	                            if (typeof task.callback === 'function') {
	                                task.callback(task);
	                            }
	                            this.emit(TaskTimer.Event.TASK, task);
	                        }
	                    }
	                }
	            }
	        }
	
	        /**
	         * Runs the timer.
	         * @private
	         */
	
	    }, {
	        key: '_run',
	        value: function _run() {
	            var _this2 = this;
	
	            this._.timer = setInterval(function () {
	                // safe to use parent scope `this` in arrow functions.
	                _this2._tick();
	                _this2._.state = TaskTimer.State.RUNNING;
	            }, this._.interval);
	        }
	
	        // ---------------------------
	        // PUBLIC (INSTANCE) METHODS
	        // ---------------------------
	
	        /**
	         * Emits the given event with an optional event object.
	         * @memberof TaskTimer
	         * @alias TaskTimer#fire
	         * @chainable
	         *
	         * @param {String} eventName - The name of the event to be emitted.
	         * @param {Object} [object] - The event object that will be passed to the
	         * listener(s).
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         */
	
	    }, {
	        key: 'emit',
	        value: function emit(eventName, object) {
	            var event = {
	                type: eventName,
	                source: this
	            };
	            switch (eventName) {
	                case TaskTimer.Event.TASK:
	                case TaskTimer.Event.TASK_ADDED:
	                case TaskTimer.Event.TASK_REMOVED:
	                    event.task = object;
	                    break;
	                default:
	                    break;
	            }
	            _get(Object.getPrototypeOf(TaskTimer.prototype), 'emit', this).call(this, eventName, event);
	            return this;
	        }
	        /**
	         *  Alias for `#emit()`
	         *  @private
	         */
	
	    }, {
	        key: 'fire',
	        value: function fire(eventName, object) {
	            return this.emit(eventName, object);
	        }
	
	        /**
	         * Gets the task with the given name.
	         * @memberof TaskTimer
	         *
	         * @param {String} name - Name of the task.
	         *
	         * @returns {Object} - Task.
	         */
	
	    }, {
	        key: 'getTask',
	        value: function getTask(name) {
	            return this._.tasks[name];
	        }
	
	        /**
	         * Adds a new task for the timer.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @todo options.autoRemove
	         *
	         * @param {Object|String} options - Task options. If a `String` is passed,
	         * a task with default options will be created with the given name.
	         *     @param {String} options.name - The unique name of the task.
	         *     @param {Number} [options.tickInterval=1] - Tick interval that the
	         *     task should be run on. The unit is "ticks" not milliseconds. For
	         *     instance, if the timer interval is 1000 milliseconds, and we add a
	         *     task with 5 tick intervals. The task will run on every 5 seconds.
	         *     @param {Number} [options.totalRuns=0] - Total number of times the
	         *     task should be run. `0` or `null` means unlimited (until the timer
	         *     has stopped).
	         *     @param {Function} [options.callback] - The callback function (task)
	         *     to be executed on each run. The task itself is passed to this
	         *     callback, as the single argument.
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         *
	         * @throws {Error} - If the task name is not set or a task with the given
	         * name already exists.
	         */
	
	    }, {
	        key: 'addTask',
	        value: function addTask() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? { tickInterval: 1, totalRuns: 0 } : arguments[0];
	
	            if (typeof options === 'string') {
	                options = {
	                    name: options,
	                    tickInterval: 1,
	                    totalRuns: 0
	                };
	            }
	            if (!options.name) {
	                throw new Error('Task name is required.');
	            }
	            if (this._.tasks[options.name]) {
	                throw new Error('Task with name "' + options.name + '" already exists.');
	            }
	            var task = _defaults(options, {
	                currentRuns: 0
	            });
	            this._.tasks[options.name] = task;
	            this.emit(TaskTimer.Event.TASK_ADDED, this.getTask(options.name));
	            return this;
	        }
	
	        /**
	         * Resets the current runs of the task, by its given name; and re-runs the
	         * task on the next interval tick.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @param {String} name - The name of the task to be removed.
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         *
	         * @throws {Error} - If a task with the given name does not exist.
	         */
	
	    }, {
	        key: 'resetTask',
	        value: function resetTask(name) {
	            if (!name || !this._.tasks[name]) {
	                throw new Error('Task with name "' + name + '" does not exist.');
	            }
	            this._.tasks[name].currentRuns = 0;
	        }
	
	        /**
	         * Removes the task by the given name.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @param {String} name - The name of the task to be removed.
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         *
	         * @throws {Error} - If a task with the given name does not exist.
	         */
	
	    }, {
	        key: 'removeTask',
	        value: function removeTask(name) {
	            if (!name || !this._.tasks[name]) {
	                throw new Error('Task with name "' + name + '" does not exist.');
	            }
	            var removedTask = this._.tasks[name];
	            this._.tasks[name] = null;
	            delete this._.tasks[name];
	            this.emit(TaskTimer.Event.TASK_REMOVED, removedTask);
	            return this;
	        }
	
	        /**
	         * Starts the timer and puts the timer in `RUNNING` state. If it's already
	         * running, this will reset the start/stop time and tick count, but will not
	         * reset (or remove) existing tasks.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         */
	
	    }, {
	        key: 'start',
	        value: function start() {
	            this._stop();
	            this._.startTime = Date.now();
	            this._.stopTime = 0;
	            this._.tickCount = 0;
	            this._run();
	            this._.state = TaskTimer.State.RUNNING;
	            this.emit(TaskTimer.Event.STARTED);
	            return this;
	        }
	
	        /**
	         * Pauses the timer, puts the timer in `PAUSED` state and all tasks on hold.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         */
	
	    }, {
	        key: 'pause',
	        value: function pause() {
	            if (this.state !== TaskTimer.State.RUNNING) return this;
	            this._stop();
	            this._.state = TaskTimer.State.PAUSED;
	            this.emit(TaskTimer.Event.PAUSED);
	            return this;
	        }
	
	        /**
	         * Resumes the timer and puts the timer in `RUNNING` state; if previuosly
	         * paused. In this state, all existing tasks are resumed.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         */
	
	    }, {
	        key: 'resume',
	        value: function resume() {
	            if (this.state !== TaskTimer.State.PAUSED) return this;
	            this._run();
	            this._.state = TaskTimer.State.RUNNING;
	            this.emit(TaskTimer.Event.RESUMED);
	            return this;
	        }
	
	        /**
	         * Stops the timer and puts the timer in `STOPPED` state. In this state, all
	         * existing tasks are stopped and no values or tasks are reset until
	         * re-started or explicitly calling reset.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         */
	
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (this.state !== TaskTimer.State.RUNNING) return this;
	            this._stop();
	            this._.stopTime = Date.now();
	            this._.state = TaskTimer.State.STOPPED;
	            this.emit(TaskTimer.Event.STOPPED);
	            return this;
	        }
	
	        /**
	         * Stops the timer and puts the timer in `IDLE` state.
	         * This will reset the ticks and removes all tasks silently; meaning no
	         * other events will be emitted such as `"taskRemoved"`.
	         * @memberof TaskTimer
	         * @chainable
	         *
	         * @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	         */
	
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this._reset();
	            this.emit(TaskTimer.Event.RESET);
	            return this;
	        }
	
	        /**
	         *  `EventEmitter3` is said to be a drop-in replacement for Node's
	         *  `EventEmitter` but it lacks `listenerCount()` method.
	         *  @private
	         */
	
	    }, {
	        key: 'listenerCount',
	        value: function listenerCount(eventName) {
	            return this.listeners(eventName).length;
	        }
	    }, {
	        key: 'interval',
	        get: function get() {
	            return this._.interval;
	        },
	        set: function set(value) {
	            this._.interval = value || DEFAULT.INTERVAL;
	        }
	
	        /**
	         * Gets the current state of the timer.
	         * For possible values, see `TaskTimer.State` enumeration.
	         *
	         * @memberof TaskTimer
	         * @type {Number}
	         * @readonly
	         */
	
	    }, {
	        key: 'state',
	        get: function get() {
	            return this._.state;
	        }
	
	        /**
	         * Gets time information about the latest run of the timer.
	         * `instance.time.started` gives the start time of the timer.
	         * `instance.time.stopped` gives the stop time of the timer. (`0` if still running.)
	         * `instance.time.elapsed` gives the elapsed time of the timer.
	         *
	         * @memberof TaskTimer
	         * @type {Object}
	         * @readonly
	         */
	
	    }, {
	        key: 'time',
	        get: function get() {
	            var current = this.state !== TaskTimer.State.STOPPED ? Date.now() : this._.stopTime;
	            return Object.freeze({
	                started: this._.startTime,
	                stopped: this._.stopTime,
	                elapsed: current - this._.startTime
	            });
	        }
	
	        /**
	         * Gets the current tick count for the latest run of the timer.
	         * This value will be reset to `0` when the timer is stopped or reset.
	         *
	         * @memberof TaskTimer
	         * @type {Number}
	         * @readonly
	         */
	
	    }, {
	        key: 'tickCount',
	        get: function get() {
	            return this._.tickCount;
	        }
	
	        /**
	         * Gets the current task count. Tasks remain even after the timer is
	         * stopped. But they will be removed if the timer is reset.
	         *
	         * @memberof TaskTimer
	         * @type {Number}
	         * @readonly
	         */
	
	    }, {
	        key: 'taskCount',
	        get: function get() {
	            return Object.keys(this._.tasks).length;
	        }
	    }]);
	
	    return TaskTimer;
	}(_eventemitter2.default);
	
	// ---------------------------
	// PUBLIC (STATIC) PROPERTIES
	// ---------------------------
	
	/**
	 * Enumerates the `TaskTimer` event types.
	 * @enum {String}
	 * @readonly
	 */
	
	
	TaskTimer.Event = Object.freeze({
	    /**
	     * Emitted on each tick (interval) of `TaskTimer`.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    TICK: 'tick',
	    /**
	     * Emitted when the timer is put in `RUNNING` state; such as when the timer is
	     * started.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    STARTED: 'started',
	    /**
	     * Emitted when the timer is put in `RUNNING` state; such as when the timer is
	     * resumed.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    RESUMED: 'resumed',
	    /**
	     * Emitted when the timer is put in `PAUSED` state.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    PAUSED: 'paused',
	    /**
	     * Emitted when the timer is put in `STOPPED` state.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    STOPPED: 'stopped',
	    /**
	     * Emitted when the timer is reset.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    RESET: 'reset',
	    /**
	     * Emitted when a task is executed.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    TASK: 'task',
	    /**
	     * Emitted when a task is added to `TaskTimer` instance.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    TASK_ADDED: 'taskAdded',
	    /**
	     * Emitted when a task is removed from `TaskTimer` instance.
	     * Note that this will not be emitted when `.reset()` is called; which
	     * removes all tasks silently.
	     * @memberof TaskTimer.Event
	     * @type {String}
	     */
	    TASK_REMOVED: 'taskRemoved'
	});
	
	/**
	 * Enumerates the `TaskTimer` states.
	 * @enum {Number}
	 * @readonly
	 */
	TaskTimer.State = Object.freeze({
	    /**
	     * Indicates that the timer is in `IDLE` state.
	     * This is the initial state when the `TaskTimer` instance is first created.
	     * Also when an existing timer is reset, it will be `IDLE`.
	     * @memberof TaskTimer.State
	     * @type {Number}
	     */
	    IDLE: 0,
	    /**
	     * Indicates that the timer is in `RUNNING` state; such as when the timer is
	     * started or resumed.
	     * @memberof TaskTimer.State
	     * @type {Number}
	     */
	    RUNNING: 1,
	    /**
	     * Indicates that the timer is in `PAUSED` state.
	     * @memberof TaskTimer.State
	     * @type {Number}
	     */
	    PAUSED: 2,
	    /**
	     * Indicates that the timer is in `STOPPED` state.
	     * @memberof TaskTimer.State
	     * @type {Number}
	     */
	    STOPPED: 3
	});
	
	// ---------------------------
	// HELPER METHODS
	// ---------------------------
	
	// simple shallow defaults extender.
	function _defaults(object, defaults) {
	    if (!object) return defaults || {};
	    if (!defaults) return object || {};
	    var key;
	    for (key in defaults) {
	        if (defaults.hasOwnProperty(key) && object[key] === undefined) {
	            object[key] = defaults[key];
	        }
	    }
	    return object;
	}
	
	// ---------------------------
	// EXPORT
	// ---------------------------
	
	exports.default = TaskTimer;
	
	// ---------------------------
	// ADDITIONAL DOCUMENTATION
	// ---------------------------
	
	/**
	 *  Adds the listener function to the end of the listeners array for the event
	 *  named `eventName`. No checks are made to see if the listener has already
	 *  been added. Multiple calls passing the same combination of eventName and
	 *  listener will result in the listener being added, and called, multiple times.
	 *  @name TaskTimer#on
	 *  @function
	 *  @alias TaskTimer#addListener
	 *  @chainable
	 *
	 *  @param {String} eventName - The name of the event to be added.
	 *  @param {Function} listener - The callback function to be invoked per event.
	 *
	 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	 */
	
	/**
	 *  Adds a one time listener function for the event named `eventName`. The next
	 *  time eventName is triggered, this listener is removed and then invoked.
	 *  @name TaskTimer#once
	 *  @function
	 *  @chainable
	 *
	 *  @param {String} eventName - The name of the event to be added.
	 *  @param {Function} listener - The callback function to be invoked per event.
	 *
	 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	 */
	
	/**
	 *  Removes the specified `listener` from the listener array for the event
	 *  named `eventName`.
	 *  @name TaskTimer#off
	 *  @function
	 *  @alias TaskTimer#removeListener
	 *  @chainable
	 *
	 *  @param {String} eventName - The name of the event to be removed.
	 *  @param {Function} listener - The callback function to be invoked per event.
	 *
	 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	 */
	
	/**
	 *  Removes all listeners, or those of the specified eventName.
	 *  @name TaskTimer#removeAllListeners
	 *  @function
	 *  @chainable
	 *
	 *  @param {String} eventName - The name of the event to be removed.
	 *  @param {Function} listener - The callback function to be invoked per event.
	 *
	 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
	 */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
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
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=tasktimer.js.map