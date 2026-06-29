/**
 *  Name of an event. A `string` for all {@link TaskTimer} events; `symbol` is
 *  allowed for parity with the common `EventEmitter` API.
 */
type EventName = string | symbol;

/**
 *  Generic event listener invoked by the internal `EventEmitter`.
 *  @param args - Arguments forwarded from the emitted event.
 */
type EventListener = (...args: any[]) => void;

export type { EventListener, EventName };
