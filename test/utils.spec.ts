import { describe, expect, it } from 'vitest';

import { utils } from '../src/utils.js';

describe('utils', () => {
  it('isset()', () => {
    expect(utils.isset(null)).toBe(false);
    expect(utils.isset(undefined)).toBe(false);
    expect(utils.isset(false)).toBe(true);
    expect(utils.isset(0)).toBe(true);
  });

  it('ensureArray()', () => {
    expect(Array.isArray(utils.ensureArray(1))).toBe(true);
    expect(utils.ensureArray([])).toEqual([]);
    expect(utils.ensureArray(1)).toEqual([1]);
    expect(utils.ensureArray(null)).toEqual([]);
    expect(utils.ensureArray(undefined)).toEqual([]);
    expect(utils.ensureArray(false)).toEqual([false]);
    const arr = [1, 2];
    expect(utils.ensureArray(arr)).toBe(arr);
  });

  it('getNumber()', () => {
    expect(utils.getNumber(5, 1, 0)).toBe(5);
    expect(utils.getNumber(0, 1, 0)).toBe(1);
    expect(utils.getNumber(1, 1, 0)).toBe(1);
    expect(utils.getNumber(null as any, 1, 3)).toBe(3);
    // non-finite values fall back to the default (NaN/Infinity, not just non-numbers)
    expect(utils.getNumber(Number.NaN, 1, 3)).toBe(3);
    expect(utils.getNumber(Number.POSITIVE_INFINITY, 1, 3)).toBe(3);
    expect(utils.getNumber('5' as any, 1, 3)).toBe(3);
    // the default's type flows through (a null default stays null)
    expect(utils.getNumber(Number.NaN, 0, null)).toBe(null);
  });

  it('getBool()', () => {
    expect(utils.getBool(false, true)).toBe(false);
    expect(utils.getBool(true, false)).toBe(true);
    expect(utils.getBool(null as any, true)).toBe(true);
    expect(utils.getBool(undefined as any, true)).toBe(true);
  });

  it('setImmediate() / clearImmediate()', () =>
    new Promise<void>((resolve) => {
      const ref = utils.setImmediate((value: number) => {
        expect(ref).toBeDefined();
        expect(value).toBe(42);
        utils.clearImmediate(ref);
        resolve();
      }, 42);
    }));

  it('clearImmediate(null) is a no-op', () => {
    expect(() => utils.clearImmediate(null)).not.toThrow();
    expect(() => utils.clearImmediate(0)).not.toThrow();
  });

  it('clearImmediate() prevents the scheduled callback from running', () =>
    new Promise<void>((resolve, reject) => {
      const ref = utils.setImmediate(() => reject(new Error('immediate should have been cleared')));
      utils.clearImmediate(ref);
      setTimeout(resolve, 50);
    }));

  it('isPromise()', () => {
    expect(utils.isPromise(Promise.resolve())).toBe(true);
    // biome-ignore lint/suspicious/noThenProperty: a thenable fixture is the point
    expect(utils.isPromise({ then: () => undefined })).toBe(true);
    expect(utils.isPromise(null)).toBe(false);
    expect(utils.isPromise(undefined)).toBe(false);
    expect(utils.isPromise({})).toBe(false);
    // biome-ignore lint/suspicious/noThenProperty: a non-callable then is the point
    expect(utils.isPromise({ then: 1 })).toBe(false);
  });
});
