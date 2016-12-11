"use strict";

import Rand from "models/Rand"

import Score from "models/Score"
import HintModel from "models/Hint"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import ColorMaster from "models/ColorMaster"
import Pool from "models/Pool"
import wu from "wu"

export default class Game {
  constructor() {
    this.score = new Score(0);
    this.hintContainer = this.makeHintContainer();
    this.tileContainer = this.makeTileContainer();
  }

  makeHintContainer() {
    return new HintModel(9, 4, [20], Rand.randIterator);
  }

  makeTileContainer() {
    return new TileContainer(9, [
      [new Pool(ColorMaster[0].map((color) => new TileModel(color))), 20],
      [new Pool([].concat.apply([], ColorMaster[1].map((color) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => new TileModel(color, color, i))
      ))), -1]
    ]);
  }

  reset() {
    this.score.reset();
    this.hintContainer = this.makeHintContainer();
    this.tileContainer = this.makeTileContainer();
  }

  select(cellId) {
    if (!this.hintContainer.canUpdate(cellId) || !this.tileContainer.trySelect(cellId))
      return false;

    this.score.count();
    this.tileContainer.select(cellId);
    this.hintContainer.update();
    return true;
  }

  hints() {
    var tiles = this.tiles();
    return this.hintContainer.hints.map((i) => tiles[i])
  }

  tiles() {
    return this.tileContainer.tiles();
  }
}

