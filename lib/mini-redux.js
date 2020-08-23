
// A mini redux implementation (by Job Vranish)
// Supports redux-thunk style actions, and actors in the sytle of:
// http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/
export class MiniRedux {
  constructor(reducer, initial_state, actors) {
    this.reducer = reducer;
    this.state = initial_state;
    this.actors = actors;
    this.dispatching = false;
    this.acting = false;
  }
  static start(reducer, initial_state, actors) {
    return new MiniRedux(reducer, initial_state, actors).act(initial_state);
  }
  dispatch(action) {
    if (this.dispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    // these three lines are redux-thunk:
    if (typeof action === 'function') {
      return action((action) => this.dispatch(action), () => this.getState());
    }

    const prev = this.state;
    try {
      this.dispatching = true;
      this.state = this.reducer(this.state, action);
    } finally {
      this.dispatching = false;
    }

    this.act(prev);
    return action;
  }

  getState() {
    if (this.dispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ');
    }
    return this.state;
  }

  act(prev) {
    // Ensure that any action dispatched by actors do not result in a new
    // actor run, allowing actors to dispatch with impunity.
    if (!this.acting) {
      this.acting = true;
      this.actors.forEach((actor) => actor(this.state, prev, (a) => this.dispatch(a)));
      this.acting = false;
    }
  }
}

