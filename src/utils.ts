/**
 *  Small internal helpers shared across the library.
 *  @internal
 */
const utils = {
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
   *  Returns `value` when it is a finite number `>= minimum`, clamping smaller
   *  numbers to `minimum` and falling back to `defaultValue` for anything that
   *  is not a finite number (non-numbers, `NaN`, `Infinity`). The return type
   *  carries `defaultValue`'s type so a `null` default flows through honestly.
   */
  getNumber<D>(value: number, minimum: number, defaultValue: D): number | D {
    if (!Number.isFinite(value)) return defaultValue;
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
   *  `setImmediate` where available (Node) and a `setTimeout(…, 0)` fallback
   *  elsewhere (browsers).
   */
  setImmediate(cb: (...args: any[]) => void, ...args: any[]): any {
    /* istanbul ignore if -- browser-only fallback, tested separately */
    // Stryker disable next-line all: browser-only fallback, unreachable in the Node test environment.
    if (typeof setImmediate !== 'function') return setTimeout(() => cb(...args), 0);
    return setImmediate(cb, ...args);
  },

  /**
   *  Clears a handle created by {@link utils.setImmediate}.
   */
  clearImmediate(id: any): void {
    /* istanbul ignore if -- browser-only fallback, tested separately */
    // Stryker disable next-line all: browser-only fallback, unreachable in the Node test environment.
    if (typeof clearImmediate !== 'function') return clearTimeout(id);
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
