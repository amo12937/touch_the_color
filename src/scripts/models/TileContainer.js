"use strict";

import wu from "wu"

export default class TileContainer {
  constructor(size, items) {
    this._size = size;
    var [borrowFrom, returnTo] = wu(items).map(([pool, n]) => n >= 0
      ? wu.repeat(pool).take(n)
      : wu.repeat(pool)
    ).flatten().tee();
    this._tiles = Array.from(borrowFrom.take(size).map((b) => b.borrow()));
    this._plans = wu.zip(borrowFrom, returnTo);
  }

  trySelect(i) {
    return 0 <= i && i < this._size;
  }

  select(i) {
    if (!this.trySelect(i)) return false;
    var [borrowFrom, returnTo] = this._plans.next().value;
    var next = borrowFrom.borrow();
    returnTo.returnObject(this._tiles[i]);
    this._tiles[i] = next
    return true
  }

  tiles() {
    return this._tiles
  }
}

