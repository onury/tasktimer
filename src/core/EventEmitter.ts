// own modules
import type { EventListener, EventName } from '../types/index.js';

/**
 *  Internal record for a registered listener.
 *  @internal
 */
interface Handler<TListener extends EventListener> {
  fn: TListener;
  context: unknown;
  once: boolean;
}

/**
 *  Minimal, zero-dependency `EventEmitter` for both Node and browser bundles.
 *
 *  It implements the small, familiar surface (`on` / `once` / `off` / `emit`
 *  …) that {@link TaskTimer} relies on, so the library ships with no runtime
 *  dependencies. The semantics mirror the common Node/`eventemitter3` API:
 *  listeners fire in insertion order, `once` listeners are removed right before
 *  they run, and `emit` returns whether the event had any listeners.
 *
 *  The optional `TListener` type parameter narrows the listener (and, via
 *  `Parameters<TListener>`, the `emit` arguments) for subclasses — e.g.
 *  {@link TaskTimer} types it to an `ITaskTimerEvent` listener. It defaults to
 *  the permissive `EventListener`, so a bare `EventEmitter` is unchanged.
 */
class EventEmitter<TListener extends EventListener = EventListener> {
  /**
   *  Registered handlers, keyed by event name.
   *  @internal
   */
  readonly #events = new Map<EventName, Handler<TListener>[]>();

  /**
   *  Returns the list of event names that currently have listeners.
   */
  eventNames(): EventName[] {
    return [...this.#events.keys()];
  }

  /**
   *  Returns the listener functions registered for the given event.
   *  @param event - Name of the event.
   */
  listeners(event: EventName): TListener[] {
    const handlers = this.#events.get(event);
    return handlers ? handlers.map((h) => h.fn) : [];
  }

  /**
   *  Returns the number of listeners registered for the given event.
   *  @param event - Name of the event.
   */
  listenerCount(event: EventName): number {
    const handlers = this.#events.get(event);
    return handlers ? handlers.length : 0;
  }

  /**
   *  Calls each listener registered for the given event, in insertion order,
   *  passing along any additional arguments.
   *  @param event - Name of the event to emit.
   *  @param args - Arguments forwarded to each listener.
   *  @returns `true` if the event had listeners, otherwise `false`.
   */
  emit(event: EventName, ...args: Parameters<TListener>): boolean {
    const handlers = this.#events.get(event);
    // empty arrays are never stored — an event key always has ≥ 1 handler.
    if (!handlers) return false;
    // iterate a snapshot so listeners added/removed during emit don't affect
    // the current dispatch.
    for (const handler of handlers.slice()) {
      if (handler.once) this.#delete(event, handler);
      handler.fn.apply(handler.context, args);
    }
    return true;
  }

  /**
   *  Adds a listener for the given event.
   *  @param event - Name of the event.
   *  @param fn - Listener to invoke when the event is emitted.
   *  @param context - `this` context for the listener. Defaults to the emitter.
   *  @returns The emitter instance for chaining.
   */
  on(event: EventName, fn: TListener, context: unknown = this): this {
    return this.#add(event, fn, context, false);
  }

  /**
   *  Alias of {@link EventEmitter.on}.
   */
  addListener(event: EventName, fn: TListener, context: unknown = this): this {
    return this.on(event, fn, context);
  }

  /**
   *  Adds a one-time listener that is removed right before it is invoked.
   *  @param event - Name of the event.
   *  @param fn - Listener to invoke once when the event is emitted.
   *  @param context - `this` context for the listener. Defaults to the emitter.
   *  @returns The emitter instance for chaining.
   */
  once(event: EventName, fn: TListener, context: unknown = this): this {
    return this.#add(event, fn, context, true);
  }

  /**
   *  Removes listeners for the given event. With no `fn`, all listeners for the
   *  event are removed.
   *  @param event - Name of the event.
   *  @param fn - The specific listener to remove.
   *  @param context - Only remove listeners bound to this context.
   *  @param once - Only remove one-time listeners.
   *  @returns The emitter instance for chaining.
   */
  off(event: EventName, fn?: TListener, context?: unknown, once?: boolean): this {
    const handlers = this.#events.get(event);
    if (!handlers) return this;
    if (!fn) {
      this.#events.delete(event);
      return this;
    }
    const remaining = handlers.filter(
      (h) =>
        h.fn !== fn ||
        (context !== undefined && h.context !== context) ||
        (once === true && !h.once)
    );
    if (remaining.length > 0) {
      this.#events.set(event, remaining);
    } else {
      this.#events.delete(event);
    }
    return this;
  }

  /**
   *  Alias of {@link EventEmitter.off}.
   */
  removeListener(event: EventName, fn?: TListener, context?: unknown, once?: boolean): this {
    return this.off(event, fn, context, once);
  }

  /**
   *  Removes all listeners, or all listeners for the given event.
   *  @param event - Name of the event. Omit to remove listeners for all events.
   *  @returns The emitter instance for chaining.
   */
  removeAllListeners(event?: EventName): this {
    if (event === undefined) {
      this.#events.clear();
    } else {
      this.#events.delete(event);
    }
    return this;
  }

  /**
   *  @internal
   */
  #add(event: EventName, fn: TListener, context: unknown, once: boolean): this {
    const handler: Handler<TListener> = { fn, context, once };
    const handlers = this.#events.get(event);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.#events.set(event, [handler]);
    }
    return this;
  }

  /**
   *  @internal
   */
  #delete(event: EventName, handler: Handler<TListener>): void {
    // #delete is only ever called for a handler taken from the live array, so
    // the event key is guaranteed to exist.
    const handlers = this.#events.get(event)!;
    handlers.splice(handlers.indexOf(handler), 1);
    if (handlers.length === 0) this.#events.delete(event);
  }
}

export { EventEmitter };
