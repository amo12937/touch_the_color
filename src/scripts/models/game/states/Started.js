"use strict";

import Rand from "models/Rand"
import HintModel from "models/Hint"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import ColorMaster from "models/ColorMaster"
import Pool from "models/Pool"
import wu from "wu"

export default class Started {
  constructor (game) {
    this._game = game;
    this._appeals = {};
  }

  select(cellId) {
    var game = this._game;
    if (game._hintContainer.canUpdate(cellId) && game._tileContainer.trySelect(cellId)) {
      game._update(cellId);
      return true;
    }

    if (!game.timer.add(Date.now(), -1500)) game.timeup();
    return false;
  }

  appeals() { return this._appeals; }
}
