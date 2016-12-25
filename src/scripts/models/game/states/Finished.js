"use strict";

export default class Finished {
  constructor (game) {
    this._game = game;
    this._appeals = {};
  }
  select() {
    return false;
  }

  appeals() { return this._appeals; }

  retry() {
    this._game._fsm.retry();
  }

  timeup() {}
}
