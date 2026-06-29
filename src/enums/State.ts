/**
 *  Enumerates the possible states of a {@link TaskTimer}.
 */
enum State {
  /**
   *  Timer is idle. This is the initial state when a `TaskTimer` is first
   *  created, and the state after it is reset.
   */
  IDLE = 'idle',
  /**
   *  Timer is running, e.g. after it is started or resumed.
   */
  RUNNING = 'running',
  /**
   *  Timer is paused.
   */
  PAUSED = 'paused',
  /**
   *  Timer is stopped.
   */
  STOPPED = 'stopped'
}

export { State };
