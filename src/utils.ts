const proto = Object.prototype;

/**
 *  Whether the runtime is Node.js (has `process.hrtime` and `setImmediate`).
 *  @internal
 */
// Stryker disable all: runtime detection — only the Node branch runs under the test environment.
const NODE =
  typeof process === 'object' &&
  typeof process.hrtime === 'function' &&
  typeof setImmediate === 'function';
// Stryker restore all

/**
 *  Whether the runtime is a browser (or any non-Node environment).
 *  @internal
 */
const BROWSER = !NODE;

/**
 *  Small internal helpers shared across the library.
 *  @internal
 */
const utils = {
  NODE,
  BROWSER,

  /**
   *  Gets the lower-cased internal `[[Class]]` of a value, e.g. `'array'`,
   *  `'object'`, `'date'`, `'promise'`.
   */
  type(o: any): string {
    return proto.toString
      .call(o)
      .match(/\s(\w+)/i)![1]
      .toLowerCase();
  },

  /**
   *  Whether the value is neither `null` nor `undefined`.
   */
  isset(o: any): boolean {
    return o !== null && o !== undefined;
  },

  /**
   *  Wraps a value in an array (returning it as-is if already an array, or an
   *  empty array for `null`/`undefined`).
   */
  ensureArray(o: any): any[] {
    if (!utils.isset(o)) return [];
    return Array.isArray(o) ? o : [o];
  },

  /**
   *  Returns `value` when it is a number `>= minimum`, clamping smaller numbers
   *  to `minimum` and falling back to `defaultValue` for non-numbers.
   */
  getNumber(value: number, minimum: number, defaultValue: number): number {
    if (typeof value !== 'number') return defaultValue;
    return Math.max(value, minimum);
  },

  /**
   *  Returns `value` when it is a boolean, otherwise `defaultValue`.
   */
  getBool(value: boolean, defaultValue: boolean): boolean {
    return typeof value === 'boolean' ? value : defaultValue;
  },

  /**
   *  Schedules `cb` to run after the current event-loop turn. Uses
   *  `setImmediate` in Node and a `setTimeout(…, 0)` fallback elsewhere.
   */
  setImmediate(cb: (...args: any[]) => void, ...args: any[]): any {
    /* istanbul ignore if -- browser-only path, tested separately */
    // Stryker disable next-line all: browser-only fallback, unreachable in the Node test environment.
    if (utils.BROWSER) return setTimeout(() => cb(...args), 0);
    return setImmediate(cb, ...args);
  },

  /**
   *  Clears a handle created by {@link utils.setImmediate}.
   */
  clearImmediate(id: any): void {
    /* istanbul ignore if -- browser-only path, tested separately */
    // Stryker disable next-line all: browser-only fallback, unreachable in the Node test environment.
    if (utils.BROWSER) return clearTimeout(id);
    clearImmediate(id);
  },

  /**
   *  Whether the value is a thenable (Promise-like).
   */
  isPromise(value: any): boolean {
    return value != null && typeof value.then === 'function';
  }
};

export { utils };
