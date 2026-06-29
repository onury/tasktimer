import { describe, expect, it, vi } from 'vitest';

import { EventEmitter } from '../src/core/EventEmitter.js';

describe('EventEmitter', () => {
  it('on() / emit() invokes listeners and returns whether any fired', () => {
    const ee = new EventEmitter();
    const fn = vi.fn();
    expect(ee.on('a', fn)).toBe(ee);
    expect(ee.emit('a', 1, 2)).toBe(true);
    expect(fn).toHaveBeenCalledWith(1, 2);
    expect(ee.emit('missing')).toBe(false);
  });

  it('addListener() is an alias of on()', () => {
    const ee = new EventEmitter();
    const fn = vi.fn();
    ee.addListener('a', fn);
    ee.emit('a');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('listeners(), listenerCount() and eventNames()', () => {
    const ee = new EventEmitter();
    expect(ee.listeners('a')).toEqual([]);
    expect(ee.listenerCount('a')).toBe(0);
    expect(ee.eventNames()).toEqual([]);
    const fn1 = () => undefined;
    const fn2 = () => undefined;
    ee.on('a', fn1).on('a', fn2).on('b', fn1);
    expect(ee.listeners('a')).toEqual([fn1, fn2]);
    expect(ee.listenerCount('a')).toBe(2);
    expect(ee.eventNames()).toEqual(['a', 'b']);
  });

  it('once() fires a listener a single time', () => {
    const ee = new EventEmitter();
    const fn = vi.fn();
    ee.once('a', fn);
    expect(ee.listenerCount('a')).toBe(1);
    ee.emit('a');
    ee.emit('a');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(ee.listenerCount('a')).toBe(0);
    // the event entry is removed entirely once empty
    expect(ee.eventNames()).toEqual([]);
  });

  it('once() removes only the fired listener, keeping the others', () => {
    const ee = new EventEmitter();
    const once = vi.fn();
    const persistent = vi.fn();
    ee.once('a', once).on('a', persistent);
    ee.emit('a');
    ee.emit('a');
    expect(once).toHaveBeenCalledTimes(1);
    expect(persistent).toHaveBeenCalledTimes(2);
    expect(ee.listenerCount('a')).toBe(1);
  });

  it('binds the given context (defaulting to the emitter)', () => {
    const ee = new EventEmitter();
    const ctx = { value: 7 };
    let seen: unknown;
    let seenDefault: unknown;
    ee.on(
      'ctx',
      function (this: typeof ctx) {
        seen = this.value;
      },
      ctx
    );
    ee.on('def', function (this: unknown) {
      seenDefault = this;
    });
    ee.emit('ctx');
    ee.emit('def');
    expect(seen).toBe(7);
    expect(seenDefault).toBe(ee);
  });

  it('off() removes a specific listener', () => {
    const ee = new EventEmitter();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    ee.on('a', fn1).on('a', fn2);
    expect(ee.off('a', fn1)).toBe(ee);
    ee.emit('a');
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(ee.listenerCount('a')).toBe(1);
  });

  it('off() with no fn removes all listeners for the event', () => {
    const ee = new EventEmitter();
    ee.on('a', () => undefined).on('a', () => undefined);
    ee.off('a');
    expect(ee.listenerCount('a')).toBe(0);
    // removing from an unknown event is a no-op
    expect(() => ee.off('unknown')).not.toThrow();
    expect(ee.off('unknown', () => undefined)).toBe(ee);
  });

  it('off() honors the context filter, removing only the matching binding', () => {
    const ee = new EventEmitter();
    const seen: string[] = [];
    const fn = function (this: { id: string }): void {
      seen.push(this.id);
    };
    const ctxA = { id: 'a' };
    const ctxB = { id: 'b' };
    ee.on('e', fn, ctxA).on('e', fn, ctxB);
    ee.off('e', fn, ctxA);
    expect(ee.listenerCount('e')).toBe(1);
    // the ctxB binding must be the survivor
    ee.emit('e');
    expect(seen).toEqual(['b']);
  });

  it('off() honors the once filter, removing only the one-time binding', () => {
    const ee = new EventEmitter();
    const fn = vi.fn();
    // same fn registered both ways: the once filter must discriminate them.
    ee.once('e', fn).on('e', fn);
    ee.off('e', fn, undefined, true);
    expect(ee.listenerCount('e')).toBe(1);
    ee.emit('e');
    expect(fn).toHaveBeenCalledTimes(1);
    // the surviving binding is persistent (not the removed once binding)
    expect(ee.listenerCount('e')).toBe(1);
  });

  it('off() deletes the event entry when nothing remains', () => {
    const ee = new EventEmitter();
    const fn = () => undefined;
    ee.on('a', fn);
    ee.off('a', fn);
    expect(ee.eventNames()).toEqual([]);
  });

  it('removeListener() is an alias of off()', () => {
    const ee = new EventEmitter();
    const fn = vi.fn();
    ee.on('a', fn);
    ee.removeListener('a', fn);
    ee.emit('a');
    expect(fn).not.toHaveBeenCalled();
  });

  it('removeAllListeners() clears one or all events', () => {
    const ee = new EventEmitter();
    ee.on('a', () => undefined).on('b', () => undefined);
    ee.removeAllListeners('a');
    expect(ee.eventNames()).toEqual(['b']);
    ee.removeAllListeners();
    expect(ee.eventNames()).toEqual([]);
  });
});
