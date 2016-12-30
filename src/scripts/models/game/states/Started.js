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

    game.timer.add(now, -1500);
    return false;
  }

  appeals() { return this._appeals; }

  retry() {}

  timeup(now) {
    var game = this._game;
    game.timer.timeup(now);
    if (game.timer.is("Finished")) game._fsm.timeup();
  }

  pause(now) {
    var game = this._game;
    game.timer.pause(now);
    if (game.timer.is("Finished")) game._fsm.timeup();
    if (game.timer.is("Pausing")) game._fsm.pause();
  }
  resume() {}
}
