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
    var self = this;
    this._poolItems = items.map((item) =>
      new PoolItem(item, (poolItem) => () => self._poolItems.push(poolItem))
    );
  }

  borrow() {
    return this._poolItems.splice(Rand.randInt(this._poolItems.length), 1)[0]
  }
}

