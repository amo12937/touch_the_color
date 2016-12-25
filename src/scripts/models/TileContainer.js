"use strict";

import wu from "wu"

export default class TileContainer {
  constructor(size, pool) {
    this.updatePool = (newPool) => {
      pool = newPool;
    }

    var tiles = Array.from(wu.count().take(size).map(() => pool.borrow()));

    this.trySelect = (i) => 0 <= i && i < size;

    this.select = (i) => {
      if (!this.trySelect(i)) return false;
      var oldItem = tiles[i];
      tiles[i] = pool.borrow();
      oldItem.backToPool();
      return true;
    }
    this.tiles = () => tiles.map((tile) => tile.item);
  }
}

