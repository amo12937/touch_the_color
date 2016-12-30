"use strict";

import ColorMaster from "models/master/ColorMaster"
import Tile from "models/Tile"
import wu from "wu"

export default class Pausing {
  constructor (game) {
    this._game = game;
    this._appeals = {};
    var gray = ColorMaster.lightGray;
    this._tiles = Array.from(
      wu.count().take(game.size * game.size)
    ).map(() => new Tile(gray));
  }

  select(cellId, now) {
    return false;
  }

  appeals() { return this._appeals; }

  retry() {}

  timeup() {}

  tiles() {
    return this._tiles;
  }

  pause() {}
  resume(now) {
    console.log("Pausing.resume");
    var game = this._game;
    game.timer.resume(now);
    if (game.timer.is("Finished")) game._fsm.timeup();
    if (game.timer.is("Running")) game._fsm.resume();
  }
}

