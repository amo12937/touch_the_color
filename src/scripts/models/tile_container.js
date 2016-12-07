"use strict";

export default class TileContainer {
  constructor(size, items) {
    this._size = size;
    this._items = items;
    this._tiles = Array.from(items.take(size))
  }

  trySelect(i) {
    return 0 <= i && i < this._size;
  }

  select(i) {
    console.log(i);
    if (!this.trySelect(i)) return false
    this._tiles[i] = this._items.next().value
    return true
  }

  tiles() {
    return this._tiles
  }
}

