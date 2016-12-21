"use strict";

import wu from "wu"

export default class TileContainer {
  constructor(size, poolList) {
    this._size = size;
    this._cp = 0; // currentPool
    this._poolList = poolList;
    var pool = this._currentPool();
    this._tiles = Array.from(wu.repeat(0).take(size).map(() => pool.borrow()));
  }

  updatePoolPointer() {
    this._cp = Math.min(this._cp + 1, this._poolList.length - 1);
  }

  resetPoolPointer() {
    this._cp = 0;
  }

  _currentPool() {
    return this._poolList[this._cp];
  }

  trySelect(i) {
    return 0 <= i && i < this._size;
  }

  select(i) {
    if (!this.trySelect(i)) return false;
    var oldItem = this._tiles[i];
    this._tiles[i] = this._currentPool().borrow();
    oldItem.backToPool();
    return true
  }

  tiles() {
    return this._tiles.map((tile) => tile.item);
  }
}

