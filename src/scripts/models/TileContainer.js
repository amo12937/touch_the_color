"use strict";

import wu from "wu"

export default class TileContainer {
  constructor(size, pool) {
    this.updatePool = (newPool) => {
      pool = newPool;
    }

    var tilesSet = new Set();
    var tiles = Array.from(wu.count().take(size).map(() => {
      var poolItem = pool.borrow();
      tilesSet.add(poolItem.item.hash);
      return poolItem;
    }));

    this.trySelect = (i) => 0 <= i && i < size;

    this.select = (i) => {
      if (!this.trySelect(i)) return false;
      var conflicts = [];
      var poolItem = pool.borrow();
      while(tilesSet.has(poolItem.item.hash)) {
        conflicts.push(poolItem);
        poolItem = pool.borrow();
      }

      conflicts.forEach((poolItem) => {
        poolItem.backToPool();
      });

      var oldItem = tiles[i];
      tiles[i] = poolItem;
      tilesSet.delete(oldItem.item.hash);
      tilesSet.add(poolItem.item.hash);

      oldItem.backToPool();
      return true;
    }
    this.tiles = () => tiles.map((tile) => tile.item);
  }
}

