"use strict";

import wu from "wu"

export default class Hint {
  constructor(total, hintSize, resetRule = [], randIterator) {
    var hints = Array.from(wu.count().take(hintSize));
    var pool = Array.from(wu.count(hintSize).take(total - hintSize));
    var resetter = Array.from(wu.count().take(total - hintSize));
    var rs = randIterator(pool.length);

    var getNext = (r) => {
      var x = hints.shift();
      hints.push(pool[r]);
      pool[r] = x;
      return x;
    }

    rs.take(hintSize).forEach(getNext);

    this.hints = hints;
    this.update = wu.chain(
      wu(resetRule).map((m) => m - total).filter((m) => m >= 0).map((m) =>
        [rs.take(m), resetter, rs.take(hintSize)]
      ).flatten(),
      rs
    ).map(getNext).next;
  }

  canUpdate(cellId) {
    return cellId === this.hints[0];
  }
}

