"use strict";

export default class Init {
  constructor (game) {
    this._game = game;
  }

  select(cellId, now) {
    var firstCellId = this._game._hintContainer.hints[0];
    if (cellId != firstCellId) return false;
    this._game._update(cellId, now);
    this._game._fsm.start();
    return true;
  }

  appeals() {
    var appeals = {};
    var firstCellId = this._game._hintContainer.hints[0];
    appeals[firstCellId] = true;

    return appeals;
  }
}

