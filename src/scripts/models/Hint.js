"use strict";

import wu from "wu"

export default class Hint {
  constructor(tileSize, hintSize, randIterator) {
    var hints = Array.from(wu.count().take(hintSize));
    var poolSize = tileSize - hintSize;
    var pool = Array.from(wu.count(hintSize).take(poolSize));
    var resetter = Array.from(wu.count().take(poolSize));
    var rs = randIterator(poolSize);

    var getNext = (r) => {
      var x = hints.shift();
      hints.push(pool[r]);
      pool[r] = x;
      return x;
    }

    rs.take(hintSize).forEach(getNext);

    this.hints = hints;
    this.cleanup = () => {
      rs = wu.chain(resetter, rs);
    }

    this.update = () => {
      getNext(rs.next().value);
    }
  }

  canUpdate(cellId) {
    return cellId === this.hints[0];
  }
}

