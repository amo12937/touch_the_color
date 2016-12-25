"use strict";

export default class Init {
  constructor (game) {
    this._game = game;
    this._firstCellId = game._hintContainer.hints[0];
    this._appeals = {};
    this._appeals[this._firstCellId] = true;
  }

  select(cellId) {
    if (cellId != this._firstCellId) return false;
    this._game._update(cellId);
    this._game._fsm.start();
    return true;
  }

  appeals() { return this._appeals; }
}

