"use strict";

import wu from "wu"

export default class TileContainer {
  constructor(size, poolList) {
    var cp = 0;

    this.updatePoolPointer = () => {
      cp = Math.min(cp + 1, poolList.length - 1);
    }

    this.resetPoolPointer = () => {
      cp = 0;
    }

    var tiles = ((pool) =>
      Array.from(wu.count().take(size).map(() => pool.borrow()))
    )(poolList[cp]);

    this.trySelect = (i) => 0 <= i && i < size;

    this.select = (i) => {
      if (!this.trySelect(i)) return false;
      var oldItem = tiles[i];
      tiles[i] = poolList[cp].borrow();
      oldItem.backToPool();
      return true;
    }

    this.tiles = () => tiles.map((tile) => tile.item);
  }
}

