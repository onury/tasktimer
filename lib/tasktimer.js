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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


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
            var onInterval = tickCount >= this.tickDelay && (tickCount - this.tickDelay) % this.tickInterval === 0;
            return Boolean(timeToRun && onInterval);
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  Resets the current number of runs. This will keep the task running for
     *  the same amount of `tickIntervals` initially configured.
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
    Task.prototype._emit = function (type, object) {
        var event = {
            type: type,
            source: this
        };
        /* istanbul ignore else */
        if (object instanceof Error) {
            event.error = object;
        }
        else {
            event.data = object;
        }
        this._timer.emit(type, event);
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
                    _this._emit(_1.TaskTimer.EventType.TASK_ERROR, err);
                });
            }
            else {
                this._done();
            }
        }
        catch (err) {
            this._emit(_1.TaskTimer.EventType.TASK_ERROR, err);
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
/* WEBPACK VAR INJECTION */(function(process) {
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
 *  @copyright 2018, Onur Yıldırım <onur@cutepilot.com>
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
         *  @memberof TaskTimer
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
        this._emit(TaskTimer.EventType.TASK_REMOVED, task);
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
        this._emit(TaskTimer.EventType.STARTED);
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
        this._emit(TaskTimer.EventType.PAUSED);
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
        this._emit(TaskTimer.EventType.RESUMED);
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
        this._emit(TaskTimer.EventType.STOPPED);
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
        this._emit(TaskTimer.EventType.RESET);
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
            type: type,
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
        this._emit(TaskTimer.EventType.TASK_ADDED, task);
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
        this._emit(TaskTimer.EventType.TASK_COMPLETED, task);
        if (this._.completedTaskCount === this.taskCount) {
            this._emit(TaskTimer.EventType.COMPLETED);
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
        this._emit(TaskTimer.EventType.TICK);
        // tslint:disable:forin
        for (id in tasks) {
            task = tasks[id];
            if (!task || !task.canRunOnTick)
                continue;
            // below will not execute if task is disabled or already
            // completed.
            task._run(function () {
                _this._.taskRunCount++;
                _this._emit(TaskTimer.EventType.TASK, task);
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
(function (TaskTimer) {
    /**
     *  Represents the class that holds the configurations and the callback function
     *  required to run a task.
     *  @class
     */
    TaskTimer.Task = _1.Task;
    /**
     *  Enumerates `TaskTimer` states.
     *  @enum {String}
     *  @readonly
     */
    var State;
    (function (State) {
        /**
         *  Indicates that the timer is in `idle` state.
         *  This is the initial state when the `TaskTimer` instance is first created.
         *  Also when an existing timer is reset, it will be `idle`.
         *  @memberof TaskTimer.State
         *  @type {Number}
         */
        State["IDLE"] = "idle";
        /**
         *  Indicates that the timer is in `running` state; such as when the timer is
         *  started or resumed.
         *  @memberof TaskTimer.State
         *  @type {Number}
         */
        State["RUNNING"] = "running";
        /**
         *  Indicates that the timer is in `paused` state.
         *  @memberof TaskTimer.State
         *  @type {Number}
         */
        State["PAUSED"] = "paused";
        /**
         *  Indicates that the timer is in `stopped` state.
         *  @memberof TaskTimer.State
         *  @type {Number}
         */
        State["STOPPED"] = "stopped";
    })(State = TaskTimer.State || (TaskTimer.State = {}));
    /**
     *  Enumerates the `TaskTimer` event types.
     *  @enum {String}
     *  @readonly
     */
    var EventType;
    (function (EventType) {
        /**
         *  Emitted on each tick (interval) of `TaskTimer`.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["TICK"] = "tick";
        /**
         *  Emitted when the timer is put in `RUNNING` state; such as when the timer is
         *  started.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["STARTED"] = "started";
        /**
         *  Emitted when the timer is put in `RUNNING` state; such as when the timer is
         *  resumed.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["RESUMED"] = "resumed";
        /**
         *  Emitted when the timer is put in `PAUSED` state.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["PAUSED"] = "paused";
        /**
         *  Emitted when the timer is put in `STOPPED` state.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["STOPPED"] = "stopped";
        /**
         *  Emitted when the timer is reset.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["RESET"] = "reset";
        /**
         *  Emitted when a task is executed.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["TASK"] = "task";
        /**
         *  Emitted when a task is added to `TaskTimer` instance.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["TASK_ADDED"] = "taskAdded";
        /**
         *  Emitted when a task is removed from `TaskTimer` instance.
         *  Note that this will not be emitted when `.reset()` is called; which
         *  removes all tasks silently.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["TASK_REMOVED"] = "taskRemoved";
        /**
         *  Emitted when a task has completed all of its executions (runs)
         *  or reached its stopping date/time (if set). Note that this event
         *  will only be fired if the tasks has a `totalRuns` limit or a
         *  `stopDate` value set.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["TASK_COMPLETED"] = "taskCompleted";
        /**
         *  Emitted when a task produces an error on its execution.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["TASK_ERROR"] = "taskError";
        /**
         *  Emitted when all tasks have completed all of their executions (runs)
         *  or reached their stopping date/time (if set). Note that this event
         *  will only be fired if all tasks have a `totalRuns` limit or a
         *  `stopDate` value set.
         *  @memberof TaskTimer.Event
         *  @type {String}
         */
        EventType["COMPLETED"] = "completed";
    })(EventType = TaskTimer.EventType || (TaskTimer.EventType = {}));
})(TaskTimer || (TaskTimer = {}));
exports.TaskTimer = TaskTimer;
// ---------------------------
// ADDITIONAL DOCUMENTATION
// ---------------------------
/**
 *  Adds the listener function to the end of the listeners array for the event
 *  named `eventType`. No checks are made to see if the listener has already
 *  been added. Multiple calls passing the same combination of eventType and
 *  listener will result in the listener being added, and called, multiple times.
 *  @name TaskTimer#on
 *  @function
 *  @alias TaskTimer#addListener
 *  @chainable
 *
 *  @param {String} eventType - The type of the event to be added.
 *  @param {Function} listener - The callback function to be invoked per event.
 *
 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  Adds a one time listener function for the event named `eventType`. The next
 *  time eventType is triggered, this listener is removed and then invoked.
 *  @name TaskTimer#once
 *  @function
 *  @chainable
 *
 *  @param {String} eventType - The type of the event to be added.
 *  @param {Function} listener - The callback function to be invoked per event.
 *
 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  Removes the specified `listener` from the listener array for the event
 *  named `eventType`.
 *  @name TaskTimer#off
 *  @function
 *  @alias TaskTimer#removeListener
 *  @chainable
 *
 *  @param {String} eventType - The type of the event to be removed.
 *  @param {Function} listener - The callback function to be invoked per event.
 *
 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
 */
/**
 *  Removes all listeners, or those of the specified eventType.
 *  @name TaskTimer#removeAllListeners
 *  @function
 *  @chainable
 *
 *  @param {String} eventType - The type of the event to be removed.
 *  @param {Function} listener - The callback function to be invoked per event.
 *
 *  @returns {Object} - `{@link #TaskTimer|TaskTimer}` instance.
 */

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

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
/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
var proto = Object.prototype;
var BROWSER = typeof window !== 'undefined';
var NODE = !BROWSER;
var utils = {
    BROWSER: BROWSER,
    NODE: NODE,
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
        if (BROWSER) { // tested separately
            return setTimeout(cb.apply(null, args), 0);
        }
        return setImmediate.apply(void 0, [cb].concat(args));
    },
    clearImmediate: function (id) {
        /* istanbul ignore next */
        if (!id)
            return;
        /* istanbul ignore if */
        if (BROWSER)
            return clearTimeout(id); // tested separately
        clearImmediate(id);
    },
    /**
     *  Checks whether the given value is a promise.
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").clearImmediate))

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrdGltZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Rhc2t0aW1lci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL3Rhc2t0aW1lci8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL3Rhc2t0aW1lci8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL3Rhc2t0aW1lci8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vdGFza3RpbWVyLy4vc3JjL1Rhc2sudHMiLCJ3ZWJwYWNrOi8vdGFza3RpbWVyLy4vc3JjL1Rhc2tUaW1lci50cyIsIndlYnBhY2s6Ly90YXNrdGltZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGFza3RpbWVyLy4vc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDJEQUEyRCxZQUFZO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0IsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBNkI7QUFDakM7QUFDQTs7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtQkFBTyxDQUFDLGlFQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7QUNuQmE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsU0FBUyxtQkFBTyxDQUFDLHlCQUFHO0FBQ3BCLGNBQWMsbUJBQU8sQ0FBQywrQkFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLHNCQUFzQixFQUFFO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELDhCQUE4QixFQUFFO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDbFlBLCtDQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLDREQUFlO0FBQzdDO0FBQ0EsU0FBUyxtQkFBTyxDQUFDLHlCQUFHO0FBQ3BCLGNBQWMsbUJBQU8sQ0FBQywrQkFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUJBQXlCO0FBQ3pDO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwQ0FBMEM7QUFDMUQsa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSx5QkFBeUIsRUFBRTtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtCQUErQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QSxZQUFZLE9BQU87QUFDbkIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0EsY0FBYyxPQUFPLEtBQUssMkJBQTJCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLFNBQVM7QUFDckI7QUFDQSxjQUFjLE9BQU8sS0FBSywyQkFBMkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0EsY0FBYyxPQUFPLEtBQUssMkJBQTJCO0FBQ3JEOzs7Ozs7Ozs7Ozs7OztBQzF3QmE7QUFDYjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxTQUFTLG1CQUFPLENBQUMsNkJBQVE7QUFDekIsU0FBUyxtQkFBTyxDQUFDLHVDQUFhOzs7Ozs7Ozs7Ozs7O0FDTjlCLG9FQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxnQkFBZ0IsSUFBSTtBQUNwQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0YXNrdGltZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInRhc2t0aW1lclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0YXNrdGltZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGFza3RpbWVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJsaWIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogIEBwcml2YXRlXG4gKi9cbnZhciBERUZBVUxUX1RBU0tfT1BUSU9OUyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgdGlja0RlbGF5OiAwLFxuICAgIHRpY2tJbnRlcnZhbDogMSxcbiAgICB0b3RhbFJ1bnM6IG51bGwsXG4gICAgc3RhcnREYXRlOiBudWxsLFxuICAgIHN0b3BEYXRlOiBudWxsLFxuICAgIGltbWVkaWF0ZTogZmFsc2UsXG4gICAgcmVtb3ZlT25Db21wbGV0ZWQ6IGZhbHNlLFxuICAgIGNhbGxiYWNrOiBudWxsXG59KTtcbi8qKlxuICogIFJlcHJlc2VudHMgdGhlIGNsYXNzIHRoYXQgaG9sZHMgdGhlIGNvbmZpZ3VyYXRpb25zIGFuZCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqICByZXF1aXJlZCB0byBydW4gYSB0YXNrLlxuICovXG52YXIgVGFzayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiAgSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYFRhc2tgIGNsYXNzLlxuICAgICAqICBAY29uc3RydWN0b3JcbiAgICAgKiAgQHBhcmFtIHtJVGFza09wdGlvbnN9IG9wdGlvbnMgVGFzayBvcHRpb25zLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFRhc2sob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiaWRcIiwge1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gUFVCTElDIChJTlNUQU5DRSkgTUVNQkVSU1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSB1bmlxdWUgSUQgb2YgdGhlIHRhc2suXG4gICAgICAgICAqICBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uaWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJlbmFibGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0aGlzIHRhc2sgaXMgY3VycmVudGx5IGVuYWJsZWQuIFRoaXMgZXNzZW50aWFsbHkgZ2l2ZXNcbiAgICAgICAgICogIHlvdSBhIG1hbnVhbCBjb250cm9sIG92ZXIgZXhlY3V0aW9uLiBUaGUgdGFzayB3aWxsIGFsd2F5cyBieXBhc3MgdGhlXG4gICAgICAgICAqICBjYWxsYmFjayB3aGlsZSB0aGlzIGlzIHNldCB0byBgZmFsc2VgLlxuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8uZW5hYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5lbmFibGVkID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInRpY2tEZWxheVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSBudW1iZXIgb2YgdGlja3MgdG8gYWxsb3cgYmVmb3JlIHJ1bm5pbmcgdGhlIHRhc2sgZm9yXG4gICAgICAgICAqICB0aGUgZmlyc3QgdGltZS5cbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udGlja0RlbGF5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLnRpY2tEZWxheSA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAwLCBERUZBVUxUX1RBU0tfT1BUSU9OUy50aWNrRGVsYXkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwidGlja0ludGVydmFsXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgdGhlIHRpY2sgaW50ZXJ2YWwgdGhhdCB0aGUgdGFzayBzaG91bGQgYmUgcnVuIG9uLiBUaGUgdW5pdFxuICAgICAgICAgKiAgaXMgXCJ0aWNrc1wiIChub3QgbWlsbGlzZWNvbmRzKS4gRm9yIGluc3RhbmNlLCBpZiB0aGUgdGltZXIgaW50ZXJ2YWwgaXNcbiAgICAgICAgICogIGAxMDAwYCBtaWxsaXNlY29uZHMsIGFuZCB3ZSBhZGQgYSB0YXNrIHdpdGggYDVgIHRpY2sgaW50ZXJ2YWxzLiBUaGUgdGFza1xuICAgICAgICAgKiAgd2lsbCBydW4gb24gZXZlcnkgYDVgIDxiPnNlY29uZHM8L2I+LlxuICAgICAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy50aWNrSW50ZXJ2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8udGlja0ludGVydmFsID0gdXRpbHNfMS51dGlscy5nZXROdW1iZXIodmFsdWUsIDEsIERFRkFVTFRfVEFTS19PUFRJT05TLnRpY2tJbnRlcnZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJ0b3RhbFJ1bnNcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgb3Igc2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRoZSB0YXNrIHNob3VsZCBiZSBydW4uIGAwYCBvclxuICAgICAgICAgKiAgYG51bGxgIG1lYW5zIHVubGltaXRlZCAodW50aWwgdGhlIHRpbWVyIGhhcyBzdG9wcGVkKS5cbiAgICAgICAgICogIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udG90YWxSdW5zO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fLnRvdGFsUnVucyA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAwLCBERUZBVUxUX1RBU0tfT1BUSU9OUy50b3RhbFJ1bnMpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiaW1tZWRpYXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0byB3cmFwIGNhbGxiYWNrIGluIGEgYHNldEltbWVkaWF0ZSgpYCBjYWxsIGJlZm9yZVxuICAgICAgICAgKiAgZXhlY3V0aW5nLiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgdGhlIHRhc2sgaXMgbm90IGRvaW5nIGFueSBJL08gb3IgdXNpbmdcbiAgICAgICAgICogIGFueSBKUyB0aW1lcnMgYnV0IHN5bmNocm9ub3VzbHkgYmxvY2tpbmcgdGhlIGV2ZW50IGxvb3AuXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5pbW1lZGlhdGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8uaW1tZWRpYXRlID0gdXRpbHNfMS51dGlscy5nZXRCb29sKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrLnByb3RvdHlwZSwgXCJjdXJyZW50UnVuc1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgbnVtYmVyIG9mIHRpbWVzLCB0aGlzIHRhc2sgaGFzIGJlZW4gcnVuLlxuICAgICAgICAgKiAgQHR5cGUge251bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLmN1cnJlbnRSdW5zO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwidGltZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aW1lIGluZm9ybWF0aW9uIGZvciB0aGUgbGlmZXRpbWUgb2YgYSB0YXNrLlxuICAgICAgICAgKiAgYCN0aW1lLnN0YXJ0ZWRgIGluZGljYXRlcyB0aGUgZmlyc3QgZXhlY3V0aW9uIHRpbWUgb2YgYSB0YXNrLlxuICAgICAgICAgKiAgYCN0aW1lLnN0b3BwZWRgIGluZGljYXRlcyB0aGUgbGFzdCBleGVjdXRpb24gdGltZSBvZiBhIHRhc2suIChgMGAgaWYgc3RpbGwgcnVubmluZy4pXG4gICAgICAgICAqICBgI3RpbWUuZWxhcHNlZGAgaW5kaWNhdGVzIHRoZSB0b3RhbCBsaWZldGltZSBvZiBhIHRhc2suXG4gICAgICAgICAqICBAdHlwZSB7SVRpbWVJbmZvfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdGFydGVkID0gdGhpcy5fLnRpbWVPbkZpcnN0UnVuIHx8IDA7XG4gICAgICAgICAgICB2YXIgc3RvcHBlZCA9IHRoaXMuXy50aW1lT25MYXN0UnVuIHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgICAgICAgICAgc3RhcnRlZDogc3RhcnRlZCxcbiAgICAgICAgICAgICAgICBzdG9wcGVkOiBzdG9wcGVkLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IHN0b3BwZWQgLSBzdGFydGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcImNhbGxiYWNrXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiBlYWNoIHJ1bi5cbiAgICAgICAgICogIEB0eXBlIHtUYXNrQ2FsbGJhY2t9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5jYWxsYmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2sucHJvdG90eXBlLCBcInJlbW92ZU9uQ29tcGxldGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgd2hldGhlciB0byByZW1vdmUgdGhlIHRhc2sgKHRvIGZyZWUgdXAgbWVtb3J5KSB3aGVuIHRhc2tcbiAgICAgICAgICogIGhhcyBjb21wbGV0ZWQgaXRzIGV4ZWN1dGlvbnMgKHJ1bnMpLiBGb3IgdGhpcyB0byB0YWtlIGFmZmVjdCwgdGhlIHRhc2tcbiAgICAgICAgICogIHNob3VsZCBoYXZlIGB0b3RhbFJ1bnNgIGFuZC9vciBgc3RvcERhdGVgIGNvbmZpZ3VyZWQuXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5yZW1vdmVPbkNvbXBsZXRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5yZW1vdmVPbkNvbXBsZXRlZCA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiY29tcGxldGVkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGFzayBoYXMgY29tcGxldGVkIGFsbCBydW5zIChleGVjdXRpb25zKSBvclxuICAgICAgICAgKiAgYHN0b3BEYXRlYCBpcyByZWFjaGVkLiBOb3RlIHRoYXQgaWYgYm90aCBgdG90YWxSdW5zYCBhbmQgYHN0b3BEYXRlYCBhcmVcbiAgICAgICAgICogIG9taXR0ZWQsIHRoaXMgd2lsbCBuZXZlciByZXR1cm4gYHRydWVgOyBzaW5jZSB0aGUgdGFzayBoYXMgbm8gZXhlY3V0aW9uXG4gICAgICAgICAqICBsaW1pdCBzZXQuXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gZmFzdGVyIGlmIGFscmVhZHkgY29tcGxldGVkXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFya2VkQ29tcGxldGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oKHRoaXMudG90YWxSdW5zICYmIHRoaXMuY3VycmVudFJ1bnMgPj0gdGhpcy50b3RhbFJ1bnMpXG4gICAgICAgICAgICAgICAgfHwgKHRoaXMuXy5zdG9wRGF0ZSAmJiBEYXRlLm5vdygpID49IHRoaXMuXy5zdG9wRGF0ZSkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFzay5wcm90b3R5cGUsIFwiY2FuUnVuT25UaWNrXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTcGVjaWZpZXMgd2hldGhlciB0aGUgdGFzayBjYW4gcnVuIG9uIHRoZSBjdXJyZW50IHRpY2sgb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hcmtlZENvbXBsZXRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgdGlja0NvdW50ID0gdGhpcy5fLnN0YXJ0RGF0ZVxuICAgICAgICAgICAgICAgID8gTWF0aC5jZWlsKChEYXRlLm5vdygpIC0gTnVtYmVyKHRoaXMuXy5zdGFydERhdGUpKSAvIHRoaXMuX3RpbWVyLmludGVydmFsKVxuICAgICAgICAgICAgICAgIDogdGhpcy5fdGltZXIudGlja0NvdW50O1xuICAgICAgICAgICAgdmFyIHRpbWVUb1J1biA9ICF0aGlzLl8uc3RhcnREYXRlIHx8IERhdGUubm93KCkgPj0gdGhpcy5fLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgIHZhciBvbkludGVydmFsID0gdGlja0NvdW50ID49IHRoaXMudGlja0RlbGF5ICYmICh0aWNrQ291bnQgLSB0aGlzLnRpY2tEZWxheSkgJSB0aGlzLnRpY2tJbnRlcnZhbCA9PT0gMDtcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRpbWVUb1J1biAmJiBvbkludGVydmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogIFJlc2V0cyB0aGUgY3VycmVudCBudW1iZXIgb2YgcnVucy4gVGhpcyB3aWxsIGtlZXAgdGhlIHRhc2sgcnVubmluZyBmb3JcbiAgICAgKiAgdGhlIHNhbWUgYW1vdW50IG9mIGB0aWNrSW50ZXJ2YWxzYCBpbml0aWFsbHkgY29uZmlndXJlZC5cbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEBwYXJhbSB7SVRhc2tCYXNlT3B0aW9uc30gW29wdGlvbnNdIElmIHNldCwgdGhpcyB3aWxsIGFsc28gcmUtY29uZmlndXJlIHRoZSB0YXNrLlxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrfVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fLmN1cnJlbnRSdW5zID0gMDtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IG9wdGlvbnMuaWQ7XG4gICAgICAgICAgICBpZiAoaWQgJiYgaWQgIT09IHRoaXMuaWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2hhbmdlIElEIG9mIGEgdGFzay4nKTtcbiAgICAgICAgICAgIG9wdGlvbnMuaWQgPSB0aGlzLmlkO1xuICAgICAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTZXJpYWxpemF0aW9uIHRvIEpTT04uXG4gICAgICpcbiAgICAgKiAgTmV2ZXIgcmV0dXJuIHN0cmluZyBGcm9tIGB0b0pTT04oKWAuIEl0IHNob3VsZCByZXR1cm4gYW4gb2JqZWN0LlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9iaiA9IF9fYXNzaWduKHt9LCB0aGlzLl8pO1xuICAgICAgICBkZWxldGUgb2JqLmNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFJJVkFURSAoSU5TVEFOQ0UpIE1FTUJFUlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgU2V0IHJlZmVyZW5jZSB0byB0aW1lciBpdHNlbGYuXG4gICAgICogIE9ubHkgY2FsbGVkIGJ5IGBUYXNrVGltZXJgLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFzay5wcm90b3R5cGUuX3NldFRpbWVyID0gZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gdGltZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5fZW1pdCA9IGZ1bmN0aW9uICh0eXBlLCBvYmplY3QpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgICB9O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGV2ZW50LmVycm9yID0gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuZGF0YSA9IG9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lci5lbWl0KHR5cGUsIGV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBgVGFza1RpbWVyYCBzaG91bGQgYmUgaW5mb3JtZWQgaWYgdGhpcyB0YXNrIGlzIGNvbXBsZXRlZC4gQnV0IGV4ZWN1dGlvblxuICAgICAqICBzaG91bGQgYmUgZmluaXNoZWQuIFNvIHdlIGRvIHRoaXMgd2l0aGluIHRoZSBgZG9uZSgpYCBmdW5jdGlvbi5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrLnByb3RvdHlwZS5fZG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZWRDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fLnRpbWVPbkxhc3RSdW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIuX3Rhc2tDb21wbGV0ZWQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLl9leGVjQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbyA9IHRoaXMuY2FsbGJhY2suYXBwbHkodGhpcywgW3RoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9kb25lKCk7IH1dKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlZCBieSBkb25lKCkgKGNhbGxlZCB3aXRoaW4gdGhlIHRhc2sgY2FsbGJhY2sgYnkgdGhlIHVzZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1dGlsc18xLnV0aWxzLmlzUHJvbWlzZShvKSkge1xuICAgICAgICAgICAgICAgIG8udGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9kb25lKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2VtaXQoXzEuVGFza1RpbWVyLkV2ZW50VHlwZS5UQVNLX0VSUk9SLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoXzEuVGFza1RpbWVyLkV2ZW50VHlwZS5UQVNLX0VSUk9SLCBlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgT25seSB1c2VkIGJ5IGBUYXNrVGltZXJgLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFzay5wcm90b3R5cGUuX3J1biA9IGZ1bmN0aW9uIChvblJ1bikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLl9tYXJrZWRDb21wbGV0ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRSdW5zID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fLnRpbWVPbkZpcnN0UnVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgLy8gY3VycmVudCBydW5zIHNob3VsZCBiZSBzZXQgYmVmb3JlIGV4ZWN1dGlvbiBvciBpdCBtaWdodCBmbG93IGlmIHNvbWVcbiAgICAgICAgLy8gYXN5bmMgcnVucyBmaW5pc2hlcyBmYXN0ZXIgYW5kIHNvbWUgb3RoZXIgc2xvd2VyLlxuICAgICAgICB0aGlzLl8uY3VycmVudFJ1bnMrKztcbiAgICAgICAgb25SdW4oKTtcbiAgICAgICAgaWYgKHRoaXMuaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICB1dGlsc18xLnV0aWxzLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fZXhlY0NhbGxiYWNrKCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZXhlY0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2sucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLmlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdW5pcXVlIHRhc2sgSUQgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgY2FsbGJhY2sgZnVuY3Rpb24gaXMgcmVxdWlyZWQgZm9yIGEgdGFzayB0byBydW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IG9wdGlvbnMuc3RhcnREYXRlLCBzdG9wRGF0ZSA9IG9wdGlvbnMuc3RvcERhdGU7XG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgc3RvcERhdGUgJiYgc3RhcnREYXRlID49IHN0b3BEYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rhc2sgc3RhcnQgZGF0ZSBjYW5ub3QgYmUgdGhlIHNhbWUgb3IgYWZ0ZXIgc3RvcCBkYXRlLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcmtlZENvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl8gPSBfX2Fzc2lnbih7IGN1cnJlbnRSdW5zOiAwIH0sIERFRkFVTFRfVEFTS19PUFRJT05TKTtcbiAgICAgICAgdGhpcy5fLmlkID0gU3RyaW5nKG9wdGlvbnMuaWQpO1xuICAgICAgICB0aGlzLl8uY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICAgICAgICB0aGlzLl8uc3RhcnREYXRlID0gb3B0aW9ucy5zdGFydERhdGUgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5fLnN0b3BEYXRlID0gb3B0aW9ucy5zdG9wRGF0ZSB8fCBudWxsO1xuICAgICAgICAvLyB1c2luZyBzZXR0ZXJzIGZvciB2YWxpZGF0aW9uICYgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkO1xuICAgICAgICB0aGlzLnRpY2tEZWxheSA9IG9wdGlvbnMudGlja0RlbGF5O1xuICAgICAgICB0aGlzLnRpY2tJbnRlcnZhbCA9IG9wdGlvbnMudGlja0ludGVydmFsO1xuICAgICAgICB0aGlzLnRvdGFsUnVucyA9IG9wdGlvbnMudG90YWxSdW5zO1xuICAgICAgICB0aGlzLmltbWVkaWF0ZSA9IG9wdGlvbnMuaW1tZWRpYXRlO1xuICAgICAgICB0aGlzLnJlbW92ZU9uQ29tcGxldGVkID0gb3B0aW9ucy5yZW1vdmVPbkNvbXBsZXRlZDtcbiAgICB9O1xuICAgIHJldHVybiBUYXNrO1xufSgpKTtcbmV4cG9ydHMuVGFzayA9IFRhc2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnQgKi9cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gZGVwIG1vZHVsZXNcbnZhciBldmVudGVtaXR0ZXIzXzEgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcbi8vIG93biBtb2R1bGVzXG52YXIgXzEgPSByZXF1aXJlKFwiLlwiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqICBAcHJpdmF0ZVxuICovXG52YXIgREVGQVVMVF9USU1FUl9PUFRJT05TID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgaW50ZXJ2YWw6IDEwMDAsXG4gICAgcHJlY2lzaW9uOiB0cnVlLFxuICAgIHN0b3BPbkNvbXBsZXRlZDogZmFsc2Vcbn0pO1xuLyoqXG4gKiAgVGFza1RpbWVyIOKAoiBodHRwczovL2dpdGh1Yi5jb20vb251cnkvdGFza3RpbWVyXG4gKiAgQGxpY2Vuc2UgTUlUXG4gKiAgQGNvcHlyaWdodCAyMDE4LCBPbnVyIFnEsWxkxLFyxLFtIDxvbnVyQGN1dGVwaWxvdC5jb20+XG4gKi9cbi8qKlxuICogIEEgdGltZXIgdXRpbGl0eSBmb3IgcnVubmluZyBwZXJpb2RpYyB0YXNrcyBvbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgdGlja3MuXG4gKiAgVGhpcyBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBydW4gb3Igc2NoZWR1bGUgbXVsdGlwbGUgdGFza3Mgb24gYSBzaW5nbGVcbiAqICB0aW1lciBpbnN0YW5jZS5cbiAqXG4gKiAgVGhpcyBjbGFzcyBleHRlbmRzIGBFdmVudEVtaXR0ZXIzYCB3aGljaCBpcyBhbiBgRXZlbnRFbWl0dGVyYCBpbXBsZW1lbnRhdGlvblxuICogIGZvciBib3RoIE5vZGUgYW5kIGJyb3dzZXIuIE9ubHkgYSBzbWFsbCBzZXQgb2YgaXRzIG1ldGhvZHMgYXJlIGRvY3VtZW50ZWQgaW5cbiAqICB0aGlzIGRvY3VtZW50YXRpb24uIEZvciBhIGNvbXBsZXRlIGxpc3QsIHJlZmVyIHRvIE5vZGUuanMgZG9jdW1lbnRhdGlvbi5cbiAqXG4gKiAgQHNlZSB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfY2xhc3NfZXZlbnRlbWl0dGVyfEV2ZW50RW1pdHRlcn1cbiAqL1xudmFyIFRhc2tUaW1lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFza1RpbWVyLCBfc3VwZXIpO1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIENPTlNUUlVDVE9SXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLyoqXG4gICAgICogIENvbnN0cnVjdHMgYSBuZXcgYFRhc2tUaW1lcmAgaW5zdGFuY2Ugd2l0aCB0aGUgZ2l2ZW4gdGltZSBpbnRlcnZhbCAoaW5cbiAgICAgKiAgbWlsbGlzZWNvbmRzKS5cbiAgICAgKiAgQGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiAgQHBhcmFtIHtJVGFza1RpbWVyT3B0aW9uc3xudW1iZXJ9IFtvcHRpb25zXSAtIEVpdGhlciBUYXNrVGltZXIgb3B0aW9uc1xuICAgICAqICBvciBhIGJhc2UgaW50ZXJ2YWwgKGluIG1pbGxpc2Vjb25kcykuIFNpbmNlIHRoZSB0YXNrcyBydW4gb24gdGlja3NcbiAgICAgKiAgaW5zdGVhZCBvZiBtaWxsaXNlY29uZCBpbnRlcnZhbHM7IHRoaXMgdmFsdWUgb3BlcmF0ZXMgYXMgdGhlIGJhc2VcbiAgICAgKiAgcmVzb2x1dGlvbiBmb3IgYWxsIHRhc2tzLiBJZiB5b3UgYXJlIHJ1bm5pbmcgaGVhdnkgdGFza3MsIGxvd2VyIGludGVydmFsXG4gICAgICogIHJlcXVpcmVzIGhpZ2hlciBDUFUgcG93ZXIuIFRoaXMgdmFsdWUgY2FuIGJlIHVwZGF0ZWQgYW55IHRpbWUgYnkgc2V0dGluZ1xuICAgICAqICB0aGUgYGludGVydmFsYCBwcm9wZXJ0eSBvbiB0aGUgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiAgQGV4YW1wbGVcbiAgICAgKiAgY29uc3QgdGltZXIgPSBuZXcgVGFza1RpbWVyKDEwMDApOyAvLyBtaWxsaXNlY29uZHNcbiAgICAgKiAgLy8gRXhlY3V0ZSBzb21lIGNvZGUgb24gZWFjaCB0aWNrLi4uXG4gICAgICogIHRpbWVyLm9uKCd0aWNrJywgKCkgPT4ge1xuICAgICAqICAgICAgY29uc29sZS5sb2coJ3RpY2sgY291bnQ6ICcgKyB0aW1lci50aWNrQ291bnQpO1xuICAgICAqICAgICAgY29uc29sZS5sb2coJ2VsYXBzZWQgdGltZTogJyArIHRpbWVyLnRpbWUuZWxhcHNlZCArICcgbXMuJyk7XG4gICAgICogIH0pO1xuICAgICAqICAvLyBPciBhZGQgYSB0YXNrIG5hbWVkICdoZWFydGJlYXQnIHRoYXQgcnVucyBldmVyeSA1IHRpY2tzIGFuZCBhIHRvdGFsIG9mIDEwIHRpbWVzLlxuICAgICAqICBjb25zdCB0YXNrID0ge1xuICAgICAqICAgICAgaWQ6ICdoZWFydGJlYXQnLFxuICAgICAqICAgICAgdGlja0ludGVydmFsOiA1LCAvLyB0aWNrc1xuICAgICAqICAgICAgdG90YWxSdW5zOiAxMCwgICAvLyB0aW1lc1xuICAgICAqICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICogICAgICAgICAgY29uc29sZS5sb2codGFzay5pZCArICcgdGFzayBoYXMgcnVuICcgKyB0YXNrLmN1cnJlbnRSdW5zICsgJyB0aW1lcy4nKTtcbiAgICAgKiAgICAgIH1cbiAgICAgKiAgfTtcbiAgICAgKiAgdGltZXIuYWRkVGFzayh0YXNrKS5zdGFydCgpO1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFRhc2tUaW1lcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl90aW1lb3V0UmVmID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2ltbWVkaWF0ZVJlZiA9IG51bGw7XG4gICAgICAgIF90aGlzLl9ydW5Db3VudCA9IDA7XG4gICAgICAgIF90aGlzLl9yZXNldCgpO1xuICAgICAgICBfdGhpcy5fLm9wdHMgPSB7fTtcbiAgICAgICAgdmFyIG9wdHMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8geyBpbnRlcnZhbDogb3B0aW9ucyB9XG4gICAgICAgICAgICA6IG9wdGlvbnMgfHwge307XG4gICAgICAgIF90aGlzLmludGVydmFsID0gb3B0cy5pbnRlcnZhbDtcbiAgICAgICAgX3RoaXMucHJlY2lzaW9uID0gb3B0cy5wcmVjaXNpb247XG4gICAgICAgIF90aGlzLnN0b3BPbkNvbXBsZXRlZCA9IG9wdHMuc3RvcE9uQ29tcGxldGVkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcImludGVydmFsXCIsIHtcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIFBVQkxJQyAoSU5TVEFOQ0UpIFBST1BFUlRJRVNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHRoZSB0aW1lciBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqICBTaW5jZSB0aGUgdGFza3MgcnVuIG9uIHRpY2tzIGluc3RlYWQgb2YgbWlsbGlzZWNvbmQgaW50ZXJ2YWxzOyB0aGlzXG4gICAgICAgICAqICB2YWx1ZSBvcGVyYXRlcyBhcyB0aGUgYmFzZSByZXNvbHV0aW9uIGZvciBhbGwgdGFza3MuIElmIHlvdSBhcmUgcnVubmluZ1xuICAgICAgICAgKiAgaGVhdnkgdGFza3M7IGxvd2VyIGludGVydmFsIHJlcXVpcmVzIGhpZ2hlciBDUFUgcG93ZXIuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICAgICAqICBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLm9wdHMuaW50ZXJ2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8ub3B0cy5pbnRlcnZhbCA9IHV0aWxzXzEudXRpbHMuZ2V0TnVtYmVyKHZhbHVlLCAyMCwgREVGQVVMVF9USU1FUl9PUFRJT05TLmludGVydmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwicHJlY2lzaW9uXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgdGltZXIgc2hvdWxkIGF1dG8tYWRqdXN0IHRoZSBkZWxheSBiZXR3ZWVuXG4gICAgICAgICAqICB0aWNrcyBpZiBpdCdzIG9mZiBkdWUgdG8gdGFzayBsb2FkLiBOb3RlIHRoYXQgcHJlY2lzaW9uIHdpbGwgYmUgYXMgaGlnaFxuICAgICAgICAgKiAgYXMgcG9zc2libGUgYnV0IGl0IHN0aWxsIGNhbiBiZSBvZmYgYnkgYSBmZXcgbWlsbGlzZWNvbmRzOyBkZXBlbmRpbmcgb25cbiAgICAgICAgICogIHRoZSBDUFUgb3IgdGhlIGxvYWQuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5vcHRzLnByZWNpc2lvbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5vcHRzLnByZWNpc2lvbiA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgREVGQVVMVF9USU1FUl9PUFRJT05TLnByZWNpc2lvbik7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInN0b3BPbkNvbXBsZXRlZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyBvciBzZXRzIHdoZXRoZXIgdGhlIHRpbWVyIHNob3VsZCBhdXRvbWF0aWNhbGx5IHN0b3Agd2hlbiBhbGwgdGFza3NcbiAgICAgICAgICogIGFyZSBjb21wbGV0ZWQuIEZvciB0aGlzIHRvIHRha2UgYWZmZWN0LCBhbGwgYWRkZWQgdGFza3Mgc2hvdWxkIGhhdmVcbiAgICAgICAgICogIGB0b3RhbFJ1bnNgIGFuZC9vciBgc3RvcERhdGVgIGNvbmZpZ3VyZWQuIFRoaXMgb3B0aW9uIGNhbiBiZSBzZXQvY2hhbmdlZFxuICAgICAgICAgKiAgYXQgYW55IHRpbWUuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICAgICAqICBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5vcHRzLnN0b3BPbkNvbXBsZXRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuXy5vcHRzLnN0b3BPbkNvbXBsZXRlZCA9IHV0aWxzXzEudXRpbHMuZ2V0Qm9vbCh2YWx1ZSwgREVGQVVMVF9USU1FUl9PUFRJT05TLnN0b3BPbkNvbXBsZXRlZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInN0YXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBHZXRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIEZvciBwb3NzaWJsZSB2YWx1ZXMsIHNlZSBgVGFza1RpbWVyLlN0YXRlYCBlbnVtZXJhdGlvbi5cbiAgICAgICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgICAgICogIEB0eXBlIHtUYXNrVGltZXIuU3RhdGV9XG4gICAgICAgICAqICBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXy5zdGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwidGltZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aW1lIGluZm9ybWF0aW9uIGZvciB0aGUgbGF0ZXN0IHJ1biBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBgI3RpbWUuc3RhcnRlZGAgaW5kaWNhdGVzIHRoZSBzdGFydCB0aW1lIG9mIHRoZSB0aW1lci5cbiAgICAgICAgICogIGAjdGltZS5zdG9wcGVkYCBpbmRpY2F0ZXMgdGhlIHN0b3AgdGltZSBvZiB0aGUgdGltZXIuIChgMGAgaWYgc3RpbGwgcnVubmluZy4pXG4gICAgICAgICAqICBgI3RpbWUuZWxhcHNlZGAgaW5kaWNhdGVzIHRoZSBlbGFwc2VkIHRpbWUgb2YgdGhlIHRpbWVyLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAgICAgKiAgQHR5cGUge0lUaW1lSW5mb31cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuc3RhdGUgIT09IFRhc2tUaW1lci5TdGF0ZS5TVE9QUEVEID8gRGF0ZS5ub3coKSA6IHRoaXMuXy5zdG9wVGltZTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgICAgICBzdGFydGVkOiB0aGlzLl8uc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgIHN0b3BwZWQ6IHRoaXMuXy5zdG9wVGltZSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiBjdXJyZW50IC0gdGhpcy5fLnN0YXJ0VGltZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRpY2tDb3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgY3VycmVudCB0aWNrIGNvdW50IGZvciB0aGUgbGF0ZXN0IHJ1biBvZiB0aGUgdGltZXIuXG4gICAgICAgICAqICBUaGlzIHZhbHVlIHdpbGwgYmUgcmVzZXQgdG8gYDBgIHdoZW4gdGhlIHRpbWVyIGlzIHN0b3BwZWQgb3IgcmVzZXQuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICAgICAqICBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiAgQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl8udGlja0NvdW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1RpbWVyLnByb3RvdHlwZSwgXCJ0YXNrQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIGN1cnJlbnQgdGFzayBjb3VudC4gVGFza3MgcmVtYWluIGV2ZW4gYWZ0ZXIgdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICBzdG9wcGVkLiBCdXQgdGhleSB3aWxsIGJlIHJlbW92ZWQgaWYgdGhlIHRpbWVyIGlzIHJlc2V0LlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fLnRhc2tzKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrVGltZXIucHJvdG90eXBlLCBcInRhc2tSdW5Db3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgR2V0cyB0aGUgdG90YWwgbnVtYmVyIG9mIGFsbCB0YXNrIGV4ZWN1dGlvbnMgKHJ1bnMpLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fLnRhc2tSdW5Db3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tUaW1lci5wcm90b3R5cGUsIFwicnVuQ291bnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEdldHMgdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lciBydW5zLCBpbmNsdWRpbmcgcmVzdW1lZCBydW5zLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICogIEByZWFkb25seVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcnVuQ291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVQkxJQyAoSU5TVEFOQ0UpIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAgR2V0cyB0aGUgdGFzayB3aXRoIHRoZSBnaXZlbiBJRC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqXG4gICAgICogIEBwYXJhbSB7U3RyaW5nfSBpZCAtIElEIG9mIHRoZSB0YXNrLlxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl8udGFza3NbaWRdIHx8IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQWRkcyBhIGNvbGxlY3Rpb24gb2YgbmV3IHRhc2tzIGZvciB0aGUgdGltZXIuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEBwYXJhbSB7VGFza3xJVGFza09wdGlvbnN8VGFza0NhbGxiYWNrfEFycmF5PGFueT59IHRhc2sgLSBFaXRoZXIgYVxuICAgICAqICBzaW5nbGUgdGFzaywgdGFzayBvcHRpb25zIG9iamVjdCBvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb247IG9yIGEgbWl4dHVyZVxuICAgICAqICBvZiB0aGVzZSBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqXG4gICAgICogIEB0aHJvd3Mge0Vycm9yfSAtIElmIGEgdGFzayBjYWxsYmFjayBpcyBub3Qgc2V0IG9yIGEgdGFzayB3aXRoIHRoZSBnaXZlblxuICAgICAqICBuYW1lIGFscmVhZHkgZXhpc3RzLlxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF1dGlsc18xLnV0aWxzLmlzc2V0KHRhc2spKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VpdGhlciBhIHRhc2ssIHRhc2sgb3B0aW9ucyBvciBhIGNhbGxiYWNrIGlzIHJlcXVpcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHV0aWxzXzEudXRpbHMuZW5zdXJlQXJyYXkodGFzaykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMuX2FkZChpdGVtKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlbW92ZXMgdGhlIHRhc2sgYnkgdGhlIGdpdmVuIG5hbWUuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfFRhc2t9IHRhc2sgLSBUYXNrIHRvIGJlIHJlbW92ZWQuIEVpdGhlciBwYXNzIHRoZVxuICAgICAqICBuYW1lIG9yIHRoZSB0YXNrIGl0c2VsZi5cbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqXG4gICAgICogIEB0aHJvd3Mge0Vycm9yfSAtIElmIGEgdGFzayB3aXRoIHRoZSBnaXZlbiBuYW1lIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdmFyIGlkID0gdHlwZW9mIHRhc2sgPT09ICdzdHJpbmcnID8gdGFzayA6IHRhc2suaWQ7XG4gICAgICAgIHRhc2sgPSB0aGlzLmdldChpZCk7XG4gICAgICAgIGlmICghaWQgfHwgIXRhc2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRhc2tzIGV4aXN0IHdpdGggSUQ6ICdcIiArIGlkICsgXCInLlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmaXJzdCBkZWNyZW1lbnQgY29tcGxldGVkIHRhc2tzIGNvdW50IGlmIHRoaXMgaXMgYSBjb21wbGV0ZWQgdGFzay5cbiAgICAgICAgaWYgKHRhc2suY29tcGxldGVkICYmIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQgPiAwKVxuICAgICAgICAgICAgdGhpcy5fLmNvbXBsZXRlZFRhc2tDb3VudC0tO1xuICAgICAgICB0aGlzLl8udGFza3NbaWRdID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuXy50YXNrc1tpZF07XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50VHlwZS5UQVNLX1JFTU9WRUQsIHRhc2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBTdGFydHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgUlVOTklOR2Agc3RhdGUuIElmIGl0J3MgYWxyZWFkeVxuICAgICAqICBydW5uaW5nLCB0aGlzIHdpbGwgcmVzZXQgdGhlIHN0YXJ0L3N0b3AgdGltZSBhbmQgdGljayBjb3VudCwgYnV0IHdpbGwgbm90XG4gICAgICogIHJlc2V0IChvciByZW1vdmUpIGV4aXN0aW5nIHRhc2tzLlxuICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyXG4gICAgICogIEBjaGFpbmFibGVcbiAgICAgKlxuICAgICAqICBAcmV0dXJucyB7VGFza1RpbWVyfVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0b3AoKTtcbiAgICAgICAgdGhpcy5fLnN0YXRlID0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkc7XG4gICAgICAgIHRoaXMuX3J1bkNvdW50Kys7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl8udGFza1J1bkNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fLnN0b3BUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fbWFya1RpbWUoKTtcbiAgICAgICAgdGhpcy5fLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50VHlwZS5TVEFSVEVEKTtcbiAgICAgICAgdGhpcy5fcnVuKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFBhdXNlcyB0aGUgdGltZXIsIHB1dHMgdGhlIHRpbWVyIGluIGBQQVVTRURgIHN0YXRlIGFuZCBhbGwgdGFza3Mgb24gaG9sZC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkcpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5fc3RvcCgpO1xuICAgICAgICB0aGlzLl8uc3RhdGUgPSBUYXNrVGltZXIuU3RhdGUuUEFVU0VEO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudFR5cGUuUEFVU0VEKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUmVzdW1lcyB0aGUgdGltZXIgYW5kIHB1dHMgdGhlIHRpbWVyIGluIGBSVU5OSU5HYCBzdGF0ZTsgaWYgcHJldml1b3NseVxuICAgICAqICBwYXVzZWQuIEluIHRoaXMgc3RhdGUsIGFsbCBleGlzdGluZyB0YXNrcyBhcmUgcmVzdW1lZC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFRhc2tUaW1lci5TdGF0ZS5JRExFKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gVGFza1RpbWVyLlN0YXRlLlBBVVNFRClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9ydW5Db3VudCsrO1xuICAgICAgICB0aGlzLl9tYXJrVGltZSgpO1xuICAgICAgICB0aGlzLl8uc3RhdGUgPSBUYXNrVGltZXIuU3RhdGUuUlVOTklORztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnRUeXBlLlJFU1VNRUQpO1xuICAgICAgICB0aGlzLl9ydW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgU3RvcHMgdGhlIHRpbWVyIGFuZCBwdXRzIHRoZSB0aW1lciBpbiBgU1RPUFBFRGAgc3RhdGUuIEluIHRoaXMgc3RhdGUsIGFsbFxuICAgICAqICBleGlzdGluZyB0YXNrcyBhcmUgc3RvcHBlZCBhbmQgbm8gdmFsdWVzIG9yIHRhc2tzIGFyZSByZXNldCB1bnRpbFxuICAgICAqICByZS1zdGFydGVkIG9yIGV4cGxpY2l0bHkgY2FsbGluZyByZXNldC5cbiAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lclxuICAgICAqICBAY2hhaW5hYmxlXG4gICAgICpcbiAgICAgKiAgQHJldHVybnMge1Rhc2tUaW1lcn1cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBUYXNrVGltZXIuU3RhdGUuUlVOTklORylcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgICAgIHRoaXMuXy5zdG9wVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5TVE9QUEVEO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudFR5cGUuU1RPUFBFRCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFN0b3BzIHRoZSB0aW1lciBhbmQgcHV0cyB0aGUgdGltZXIgaW4gYElETEVgIHN0YXRlLlxuICAgICAqICBUaGlzIHdpbGwgcmVzZXQgdGhlIHRpY2tzIGFuZCByZW1vdmVzIGFsbCB0YXNrcyBzaWxlbnRseTsgbWVhbmluZyBub1xuICAgICAqICBvdGhlciBldmVudHMgd2lsbCBiZSBlbWl0dGVkIHN1Y2ggYXMgYFwidGFza1JlbW92ZWRcImAuXG4gICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXJcbiAgICAgKiAgQGNoYWluYWJsZVxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnRUeXBlLlJFU0VUKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQUklWQVRFIChJTlNUQU5DRSkgTUVUSE9EU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX2VtaXQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xuICAgICAgICB2YXIgZXZlbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KHR5cGUsIGV2ZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBBZGRzIGEgbmV3IHRhc2sgZm9yIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKlxuICAgICAqICBAcGFyYW0ge1Rhc2t8SVRhc2tPcHRpb25zfFRhc2tDYWxsYmFja30gb3B0aW9ucyAtIEVpdGhlciBhIHRhc2sgaW5zdGFuY2UsXG4gICAgICogIHRhc2sgb3B0aW9ucyBvYmplY3Qgb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uIHRpY2tcbiAgICAgKiAgaW50ZXJ2YWxzLlxuICAgICAqXG4gICAgICogIEByZXR1cm5zIHtUYXNrVGltZXJ9XG4gICAgICpcbiAgICAgKiAgQHRocm93cyB7RXJyb3J9IC0gSWYgdGhlIHRhc2sgY2FsbGJhY2sgaXMgbm90IHNldCBvciBhIHRhc2sgd2l0aCB0aGVcbiAgICAgKiAgZ2l2ZW4gbmFtZSBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9hZGQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IG9wdGlvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzXzEudXRpbHMudHlwZShvcHRpb25zKSA9PT0gJ29iamVjdCcgJiYgIW9wdGlvbnMuaWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaWQgPSB0aGlzLl9nZXRVbmlxdWVUYXNrSUQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nZXQob3B0aW9ucy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgdGFzayB3aXRoIGlkICdcIiArIG9wdGlvbnMuaWQgKyBcIicgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0YXNrID0gb3B0aW9ucyBpbnN0YW5jZW9mIF8xLlRhc2sgPyBvcHRpb25zIDogbmV3IF8xLlRhc2sob3B0aW9ucyk7XG4gICAgICAgIHRhc2suX3NldFRpbWVyKHRoaXMpO1xuICAgICAgICB0aGlzLl8udGFza3NbdGFzay5pZF0gPSB0YXNrO1xuICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudFR5cGUuVEFTS19BRERFRCwgdGFzayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIFN0b3BzIHRoZSB0aW1lci5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl8udGlja0NvdW50QWZ0ZXJSZXN1bWUgPSAwO1xuICAgICAgICBpZiAodGhpcy5fdGltZW91dFJlZikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRSZWYpO1xuICAgICAgICAgICAgdGhpcy5fdGltZW91dFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ltbWVkaWF0ZVJlZikge1xuICAgICAgICAgICAgdXRpbHNfMS51dGlscy5jbGVhckltbWVkaWF0ZSh0aGlzLl9pbW1lZGlhdGVSZWYpO1xuICAgICAgICAgICAgdGhpcy5faW1tZWRpYXRlUmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogIFJlc2V0cyB0aGUgdGltZXIuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuXyA9IHtcbiAgICAgICAgICAgIG9wdHM6ICh0aGlzLl8gfHwge30pLm9wdHMsXG4gICAgICAgICAgICBzdGF0ZTogVGFza1RpbWVyLlN0YXRlLklETEUsXG4gICAgICAgICAgICB0YXNrczoge30sXG4gICAgICAgICAgICB0aWNrQ291bnQ6IDAsXG4gICAgICAgICAgICB0YXNrUnVuQ291bnQ6IDAsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDAsXG4gICAgICAgICAgICBzdG9wVGltZTogMCxcbiAgICAgICAgICAgIGNvbXBsZXRlZFRhc2tDb3VudDogMCxcbiAgICAgICAgICAgIHJlc3VtZVRpbWU6IDAsXG4gICAgICAgICAgICBoclJlc3VtZVRpbWU6IG51bGwsXG4gICAgICAgICAgICB0aWNrQ291bnRBZnRlclJlc3VtZTogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdG9wKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgQ2FsbGVkIChieSBUYXNrIGluc3RhbmNlKSB3aGVuIGl0IGhhcyBjb21wbGV0ZWQgYWxsIG9mIGl0cyBydW5zLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IFRTNjEzMzogZGVjbGFyZWQgYnV0IG5ldmVyIHJlYWQuXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fdGFza0NvbXBsZXRlZCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQrKztcbiAgICAgICAgdGhpcy5fZW1pdChUYXNrVGltZXIuRXZlbnRUeXBlLlRBU0tfQ09NUExFVEVELCB0YXNrKTtcbiAgICAgICAgaWYgKHRoaXMuXy5jb21wbGV0ZWRUYXNrQ291bnQgPT09IHRoaXMudGFza0NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudFR5cGUuQ09NUExFVEVEKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3BPbkNvbXBsZXRlZClcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFzay5yZW1vdmVPbkNvbXBsZXRlZClcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRhc2spO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIEhhbmRsZXIgdG8gYmUgZXhlY3V0ZWQgb24gZWFjaCB0aWNrLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX3RpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuXy5zdGF0ZSA9IFRhc2tUaW1lci5TdGF0ZS5SVU5OSU5HO1xuICAgICAgICB2YXIgaWQ7XG4gICAgICAgIHZhciB0YXNrO1xuICAgICAgICB2YXIgdGFza3MgPSB0aGlzLl8udGFza3M7XG4gICAgICAgIHRoaXMuXy50aWNrQ291bnQrKztcbiAgICAgICAgdGhpcy5fLnRpY2tDb3VudEFmdGVyUmVzdW1lKys7XG4gICAgICAgIHRoaXMuX2VtaXQoVGFza1RpbWVyLkV2ZW50VHlwZS5USUNLKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6Zm9yaW5cbiAgICAgICAgZm9yIChpZCBpbiB0YXNrcykge1xuICAgICAgICAgICAgdGFzayA9IHRhc2tzW2lkXTtcbiAgICAgICAgICAgIGlmICghdGFzayB8fCAhdGFzay5jYW5SdW5PblRpY2spXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBiZWxvdyB3aWxsIG5vdCBleGVjdXRlIGlmIHRhc2sgaXMgZGlzYWJsZWQgb3IgYWxyZWFkeVxuICAgICAgICAgICAgLy8gY29tcGxldGVkLlxuICAgICAgICAgICAgdGFzay5fcnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fLnRhc2tSdW5Db3VudCsrO1xuICAgICAgICAgICAgICAgIF90aGlzLl9lbWl0KFRhc2tUaW1lci5FdmVudFR5cGUuVEFTSywgdGFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ydW4oKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBNYXJrcyB0aGUgcmVzdW1lIChvciBzdGFydCkgdGltZSBpbiBtaWxsaXNlY29uZHMgb3IgaGlnaC1yZXNvbHV0aW9uIHRpbWVcbiAgICAgKiAgaWYgYXZhaWxhYmxlLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX21hcmtUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHV0aWxzXzEudXRpbHMuQlJPV1NFUikgeyAvLyB0ZXN0ZWQgc2VwYXJhdGVseVxuICAgICAgICAgICAgdGhpcy5fLnJlc3VtZVRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fLmhyUmVzdW1lVGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBHZXRzIHRoZSB0aW1lIGRpZmZlcmVuY2UgaW4gbWlsbGlzZWNvbmRzIHNpbmN0IHRoZSBsYXN0IHJlc3VtZSBvciBzdGFydFxuICAgICAqICB0aW1lLlxuICAgICAqICBAcHJpdmF0ZVxuICAgICAqL1xuICAgIFRhc2tUaW1lci5wcm90b3R5cGUuX2dldFRpbWVEaWZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBEYXRlLm5vdygpIGlzIH4yeCBmYXN0ZXIgdGhhbiBEYXRlI2dldFRpbWUoKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHV0aWxzXzEudXRpbHMuQlJPV1NFUilcbiAgICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5fLnJlc3VtZVRpbWU7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgIHZhciBockRpZmYgPSBwcm9jZXNzLmhydGltZSh0aGlzLl8uaHJSZXN1bWVUaW1lKTtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCgoaHJEaWZmWzBdICogMTAwMCkgKyAoaHJEaWZmWzFdIC8gMWU2KSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgUnVucyB0aGUgdGltZXIuXG4gICAgICogIEBwcml2YXRlXG4gICAgICovXG4gICAgVGFza1RpbWVyLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gVGFza1RpbWVyLlN0YXRlLlJVTk5JTkcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IHRoaXMuaW50ZXJ2YWw7XG4gICAgICAgIC8vIHdlJ2xsIGdldCBhIHByZWNpc2UgaW50ZXJ2YWwgYnkgY2hlY2tpbmcgaWYgb3VyIGNsb2NrIGlzIGFscmVhZHlcbiAgICAgICAgLy8gZHJpZnRlZC5cbiAgICAgICAgaWYgKHRoaXMucHJlY2lzaW9uKSB7XG4gICAgICAgICAgICB2YXIgZGlmZiA9IHRoaXMuX2dldFRpbWVEaWZmKCk7XG4gICAgICAgICAgICAvLyBkaWQgd2UgcmVhY2ggdGhpcyBleHBlY3RlZCB0aWNrIGNvdW50IGZvciB0aGUgZ2l2ZW4gdGltZSBwZXJpb2Q/XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGVkIGNvdW50IHNob3VsZCBub3QgYmUgZ3JlYXRlciB0aGFuIHRpY2tDb3VudEFmdGVyUmVzdW1lXG4gICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihkaWZmIC8gaW50ZXJ2YWwpID4gdGhpcy5fLnRpY2tDb3VudEFmdGVyUmVzdW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgcmVhbGx5IGxhdGUsIHJ1biBpbW1lZGlhdGVseSFcbiAgICAgICAgICAgICAgICB0aGlzLl9pbW1lZGlhdGVSZWYgPSB1dGlsc18xLnV0aWxzLnNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fdGljaygpOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIHRpbWUgYnV0IGEgYml0IG9mZiwgdXBkYXRlIG5leHQgaW50ZXJ2YWwuXG4gICAgICAgICAgICBpbnRlcnZhbCA9IGludGVydmFsIC0gKGRpZmYgJSBpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGltZW91dFJlZiA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3RpY2soKTsgfSwgaW50ZXJ2YWwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIEdldHMgYSB1bmlxdWUgdGFzayBJRC5cbiAgICAgKiAgQHByaXZhdGVcbiAgICAgKi9cbiAgICBUYXNrVGltZXIucHJvdG90eXBlLl9nZXRVbmlxdWVUYXNrSUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBudW0gPSB0aGlzLnRhc2tDb3VudDtcbiAgICAgICAgdmFyIGlkO1xuICAgICAgICB3aGlsZSAoIWlkIHx8IHRoaXMuZ2V0KGlkKSkge1xuICAgICAgICAgICAgbnVtKys7XG4gICAgICAgICAgICBpZCA9ICd0YXNrJyArIG51bTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfTtcbiAgICByZXR1cm4gVGFza1RpbWVyO1xufShldmVudGVtaXR0ZXIzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLlRhc2tUaW1lciA9IFRhc2tUaW1lcjtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTkFNRVNQQUNFXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHRzbGludDpkaXNhYmxlOm5vLW5hbWVzcGFjZVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbihmdW5jdGlvbiAoVGFza1RpbWVyKSB7XG4gICAgLyoqXG4gICAgICogIFJlcHJlc2VudHMgdGhlIGNsYXNzIHRoYXQgaG9sZHMgdGhlIGNvbmZpZ3VyYXRpb25zIGFuZCB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiAgcmVxdWlyZWQgdG8gcnVuIGEgdGFzay5cbiAgICAgKiAgQGNsYXNzXG4gICAgICovXG4gICAgVGFza1RpbWVyLlRhc2sgPSBfMS5UYXNrO1xuICAgIC8qKlxuICAgICAqICBFbnVtZXJhdGVzIGBUYXNrVGltZXJgIHN0YXRlcy5cbiAgICAgKiAgQGVudW0ge1N0cmluZ31cbiAgICAgKiAgQHJlYWRvbmx5XG4gICAgICovXG4gICAgdmFyIFN0YXRlO1xuICAgIChmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYGlkbGVgIHN0YXRlLlxuICAgICAgICAgKiAgVGhpcyBpcyB0aGUgaW5pdGlhbCBzdGF0ZSB3aGVuIHRoZSBgVGFza1RpbWVyYCBpbnN0YW5jZSBpcyBmaXJzdCBjcmVhdGVkLlxuICAgICAgICAgKiAgQWxzbyB3aGVuIGFuIGV4aXN0aW5nIHRpbWVyIGlzIHJlc2V0LCBpdCB3aWxsIGJlIGBpZGxlYC5cbiAgICAgICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXIuU3RhdGVcbiAgICAgICAgICogIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZVtcIklETEVcIl0gPSBcImlkbGVcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYHJ1bm5pbmdgIHN0YXRlOyBzdWNoIGFzIHdoZW4gdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICBzdGFydGVkIG9yIHJlc3VtZWQuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyLlN0YXRlXG4gICAgICAgICAqICBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGVbXCJSVU5OSU5HXCJdID0gXCJydW5uaW5nXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5kaWNhdGVzIHRoYXQgdGhlIHRpbWVyIGlzIGluIGBwYXVzZWRgIHN0YXRlLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5TdGF0ZVxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlW1wiUEFVU0VEXCJdID0gXCJwYXVzZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbmRpY2F0ZXMgdGhhdCB0aGUgdGltZXIgaXMgaW4gYHN0b3BwZWRgIHN0YXRlLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5TdGF0ZVxuICAgICAgICAgKiAgQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlW1wiU1RPUFBFRFwiXSA9IFwic3RvcHBlZFwiO1xuICAgIH0pKFN0YXRlID0gVGFza1RpbWVyLlN0YXRlIHx8IChUYXNrVGltZXIuU3RhdGUgPSB7fSkpO1xuICAgIC8qKlxuICAgICAqICBFbnVtZXJhdGVzIHRoZSBgVGFza1RpbWVyYCBldmVudCB0eXBlcy5cbiAgICAgKiAgQGVudW0ge1N0cmluZ31cbiAgICAgKiAgQHJlYWRvbmx5XG4gICAgICovXG4gICAgdmFyIEV2ZW50VHlwZTtcbiAgICAoZnVuY3Rpb24gKEV2ZW50VHlwZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgb24gZWFjaCB0aWNrIChpbnRlcnZhbCkgb2YgYFRhc2tUaW1lcmAuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyLkV2ZW50XG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRUeXBlW1wiVElDS1wiXSA9IFwidGlja1wiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcHV0IGluIGBSVU5OSU5HYCBzdGF0ZTsgc3VjaCBhcyB3aGVuIHRoZSB0aW1lciBpc1xuICAgICAgICAgKiAgc3RhcnRlZC5cbiAgICAgICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXIuRXZlbnRcbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFR5cGVbXCJTVEFSVEVEXCJdID0gXCJzdGFydGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyBwdXQgaW4gYFJVTk5JTkdgIHN0YXRlOyBzdWNoIGFzIHdoZW4gdGhlIHRpbWVyIGlzXG4gICAgICAgICAqICByZXN1bWVkLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5FdmVudFxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50VHlwZVtcIlJFU1VNRURcIl0gPSBcInJlc3VtZWRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gdGhlIHRpbWVyIGlzIHB1dCBpbiBgUEFVU0VEYCBzdGF0ZS5cbiAgICAgICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXIuRXZlbnRcbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFR5cGVbXCJQQVVTRURcIl0gPSBcInBhdXNlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiB0aGUgdGltZXIgaXMgcHV0IGluIGBTVE9QUEVEYCBzdGF0ZS5cbiAgICAgICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXIuRXZlbnRcbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFR5cGVbXCJTVE9QUEVEXCJdID0gXCJzdG9wcGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIHRoZSB0aW1lciBpcyByZXNldC5cbiAgICAgICAgICogIEBtZW1iZXJvZiBUYXNrVGltZXIuRXZlbnRcbiAgICAgICAgICogIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudFR5cGVbXCJSRVNFVFwiXSA9IFwicmVzZXRcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIGlzIGV4ZWN1dGVkLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5FdmVudFxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50VHlwZVtcIlRBU0tcIl0gPSBcInRhc2tcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBFbWl0dGVkIHdoZW4gYSB0YXNrIGlzIGFkZGVkIHRvIGBUYXNrVGltZXJgIGluc3RhbmNlLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5FdmVudFxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50VHlwZVtcIlRBU0tfQURERURcIl0gPSBcInRhc2tBZGRlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgaXMgcmVtb3ZlZCBmcm9tIGBUYXNrVGltZXJgIGluc3RhbmNlLlxuICAgICAgICAgKiAgTm90ZSB0aGF0IHRoaXMgd2lsbCBub3QgYmUgZW1pdHRlZCB3aGVuIGAucmVzZXQoKWAgaXMgY2FsbGVkOyB3aGljaFxuICAgICAgICAgKiAgcmVtb3ZlcyBhbGwgdGFza3Mgc2lsZW50bHkuXG4gICAgICAgICAqICBAbWVtYmVyb2YgVGFza1RpbWVyLkV2ZW50XG4gICAgICAgICAqICBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRUeXBlW1wiVEFTS19SRU1PVkVEXCJdID0gXCJ0YXNrUmVtb3ZlZFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhIHRhc2sgaGFzIGNvbXBsZXRlZCBhbGwgb2YgaXRzIGV4ZWN1dGlvbnMgKHJ1bnMpXG4gICAgICAgICAqICBvciByZWFjaGVkIGl0cyBzdG9wcGluZyBkYXRlL3RpbWUgKGlmIHNldCkuIE5vdGUgdGhhdCB0aGlzIGV2ZW50XG4gICAgICAgICAqICB3aWxsIG9ubHkgYmUgZmlyZWQgaWYgdGhlIHRhc2tzIGhhcyBhIGB0b3RhbFJ1bnNgIGxpbWl0IG9yIGFcbiAgICAgICAgICogIGBzdG9wRGF0ZWAgdmFsdWUgc2V0LlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5FdmVudFxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50VHlwZVtcIlRBU0tfQ09NUExFVEVEXCJdID0gXCJ0YXNrQ29tcGxldGVkXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRW1pdHRlZCB3aGVuIGEgdGFzayBwcm9kdWNlcyBhbiBlcnJvciBvbiBpdHMgZXhlY3V0aW9uLlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5FdmVudFxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50VHlwZVtcIlRBU0tfRVJST1JcIl0gPSBcInRhc2tFcnJvclwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogIEVtaXR0ZWQgd2hlbiBhbGwgdGFza3MgaGF2ZSBjb21wbGV0ZWQgYWxsIG9mIHRoZWlyIGV4ZWN1dGlvbnMgKHJ1bnMpXG4gICAgICAgICAqICBvciByZWFjaGVkIHRoZWlyIHN0b3BwaW5nIGRhdGUvdGltZSAoaWYgc2V0KS4gTm90ZSB0aGF0IHRoaXMgZXZlbnRcbiAgICAgICAgICogIHdpbGwgb25seSBiZSBmaXJlZCBpZiBhbGwgdGFza3MgaGF2ZSBhIGB0b3RhbFJ1bnNgIGxpbWl0IG9yIGFcbiAgICAgICAgICogIGBzdG9wRGF0ZWAgdmFsdWUgc2V0LlxuICAgICAgICAgKiAgQG1lbWJlcm9mIFRhc2tUaW1lci5FdmVudFxuICAgICAgICAgKiAgQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50VHlwZVtcIkNPTVBMRVRFRFwiXSA9IFwiY29tcGxldGVkXCI7XG4gICAgfSkoRXZlbnRUeXBlID0gVGFza1RpbWVyLkV2ZW50VHlwZSB8fCAoVGFza1RpbWVyLkV2ZW50VHlwZSA9IHt9KSk7XG59KShUYXNrVGltZXIgfHwgKFRhc2tUaW1lciA9IHt9KSk7XG5leHBvcnRzLlRhc2tUaW1lciA9IFRhc2tUaW1lcjtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQURESVRJT05BTCBET0NVTUVOVEFUSU9OXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogIEFkZHMgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3RlbmVycyBhcnJheSBmb3IgdGhlIGV2ZW50XG4gKiAgbmFtZWQgYGV2ZW50VHlwZWAuIE5vIGNoZWNrcyBhcmUgbWFkZSB0byBzZWUgaWYgdGhlIGxpc3RlbmVyIGhhcyBhbHJlYWR5XG4gKiAgYmVlbiBhZGRlZC4gTXVsdGlwbGUgY2FsbHMgcGFzc2luZyB0aGUgc2FtZSBjb21iaW5hdGlvbiBvZiBldmVudFR5cGUgYW5kXG4gKiAgbGlzdGVuZXIgd2lsbCByZXN1bHQgaW4gdGhlIGxpc3RlbmVyIGJlaW5nIGFkZGVkLCBhbmQgY2FsbGVkLCBtdWx0aXBsZSB0aW1lcy5cbiAqICBAbmFtZSBUYXNrVGltZXIjb25cbiAqICBAZnVuY3Rpb25cbiAqICBAYWxpYXMgVGFza1RpbWVyI2FkZExpc3RlbmVyXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgdGhlIGV2ZW50IHRvIGJlIGFkZGVkLlxuICogIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgcGVyIGV2ZW50LlxuICpcbiAqICBAcmV0dXJucyB7T2JqZWN0fSAtIGB7QGxpbmsgI1Rhc2tUaW1lcnxUYXNrVGltZXJ9YCBpbnN0YW5jZS5cbiAqL1xuLyoqXG4gKiAgQWRkcyBhIG9uZSB0aW1lIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZXZlbnQgbmFtZWQgYGV2ZW50VHlwZWAuIFRoZSBuZXh0XG4gKiAgdGltZSBldmVudFR5cGUgaXMgdHJpZ2dlcmVkLCB0aGlzIGxpc3RlbmVyIGlzIHJlbW92ZWQgYW5kIHRoZW4gaW52b2tlZC5cbiAqICBAbmFtZSBUYXNrVGltZXIjb25jZVxuICogIEBmdW5jdGlvblxuICogIEBjaGFpbmFibGVcbiAqXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBldmVudCB0byBiZSBhZGRlZC5cbiAqICBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHBlciBldmVudC5cbiAqXG4gKiAgQHJldHVybnMge09iamVjdH0gLSBge0BsaW5rICNUYXNrVGltZXJ8VGFza1RpbWVyfWAgaW5zdGFuY2UuXG4gKi9cbi8qKlxuICogIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBgbGlzdGVuZXJgIGZyb20gdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgZXZlbnRcbiAqICBuYW1lZCBgZXZlbnRUeXBlYC5cbiAqICBAbmFtZSBUYXNrVGltZXIjb2ZmXG4gKiAgQGZ1bmN0aW9uXG4gKiAgQGFsaWFzIFRhc2tUaW1lciNyZW1vdmVMaXN0ZW5lclxuICogIEBjaGFpbmFibGVcbiAqXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBldmVudCB0byBiZSByZW1vdmVkLlxuICogIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgcGVyIGV2ZW50LlxuICpcbiAqICBAcmV0dXJucyB7T2JqZWN0fSAtIGB7QGxpbmsgI1Rhc2tUaW1lcnxUYXNrVGltZXJ9YCBpbnN0YW5jZS5cbiAqL1xuLyoqXG4gKiAgUmVtb3ZlcyBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50VHlwZS5cbiAqICBAbmFtZSBUYXNrVGltZXIjcmVtb3ZlQWxsTGlzdGVuZXJzXG4gKiAgQGZ1bmN0aW9uXG4gKiAgQGNoYWluYWJsZVxuICpcbiAqICBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgdGhlIGV2ZW50IHRvIGJlIHJlbW92ZWQuXG4gKiAgQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBwZXIgZXZlbnQuXG4gKlxuICogIEByZXR1cm5zIHtPYmplY3R9IC0gYHtAbGluayAjVGFza1RpbWVyfFRhc2tUaW1lcn1gIGluc3RhbmNlLlxuICovXG4iLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9UYXNrXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1Rhc2tUaW1lclwiKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBwcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG52YXIgQlJPV1NFUiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xudmFyIE5PREUgPSAhQlJPV1NFUjtcbnZhciB1dGlscyA9IHtcbiAgICBCUk9XU0VSOiBCUk9XU0VSLFxuICAgIE5PREU6IE5PREUsXG4gICAgdHlwZTogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIHByb3RvLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xccyhcXHcrKS9pKVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgIH0sXG4gICAgaXNzZXQ6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvICE9PSBudWxsICYmIG8gIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGVuc3VyZUFycmF5OiBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gdXRpbHMuaXNzZXQobylcbiAgICAgICAgICAgID8gIUFycmF5LmlzQXJyYXkobykgPyBbb10gOiBvXG4gICAgICAgICAgICA6IFtdO1xuICAgIH0sXG4gICAgZ2V0TnVtYmVyOiBmdW5jdGlvbiAodmFsdWUsIG1pbmltdW0sIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgPyAodmFsdWUgPCBtaW5pbXVtID8gbWluaW11bSA6IHZhbHVlKVxuICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWU7XG4gICAgfSxcbiAgICBnZXRCb29sOiBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbidcbiAgICAgICAgICAgID8gZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICA6IHZhbHVlO1xuICAgIH0sXG4gICAgc2V0SW1tZWRpYXRlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChCUk9XU0VSKSB7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChjYi5hcHBseShudWxsLCBhcmdzKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZS5hcHBseSh2b2lkIDAsIFtjYl0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGNsZWFySW1tZWRpYXRlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKCFpZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChCUk9XU0VSKVxuICAgICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7IC8vIHRlc3RlZCBzZXBhcmF0ZWx5XG4gICAgICAgIGNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqICBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwcm9taXNlLlxuICAgICAqICBAcGFyYW0ge2FueX0gdmFsdWUgLSBWYWx1ZSB0byBiZSBjaGVja2VkLlxuICAgICAqICBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzUHJvbWlzZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgJiYgdXRpbHMudHlwZSh2YWx1ZSkgPT09ICdwcm9taXNlJ1xuICAgICAgICAgICAgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gICAgfVxufTtcbmV4cG9ydHMudXRpbHMgPSB1dGlscztcbiJdLCJzb3VyY2VSb290IjoiIn0=