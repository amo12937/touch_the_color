"use strict";

export default class Started {
  constructor (game) {
    this._game = game;
    this._appeals = {};
  }

  select(cellId, now) {
    var game = this._game;
    if (game._hintContainer.canUpdate(cellId) && game._tileContainer.trySelect(cellId)) {
      game._update(cellId, now);
      return true;
    }

    if (!game.timer.add(now, -1500)) game.timeup();
    return false;
  }

  appeals() { return this._appeals; }
}
