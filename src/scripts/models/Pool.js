"use strict";

import Rand from "models/Rand"

class PoolItem {
  constructor(item, backToPool) {
    this.item = item;
    this.backToPool = backToPool(this);
  }
}

export default class Pool {
  constructor(items) {
    var backToPool = (
      (poolItem) => () => this._poolItems.push(poolItem)
    ).bind(this);
    this._poolItems = items.map((item) => new PoolItem(item, backToPool));
  }

  borrow() {
    return this._poolItems.splice(Rand.randInt(this._poolItems.length), 1)[0]
  }
}

