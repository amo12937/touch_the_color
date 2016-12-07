"use strict";

import wu from "wu"

export default (rand) => (ys, n, ms = []) => {
  var total = ys.length;
  var xs = ys.splice(0, n);
  var getNext = (r) => {
    var x = xs.shift();
    xs.push(ys[r]);
    ys[r] = x;
    return x;
  };
  var resetter = Array.from(wu.count().take(ys.length));
  var rs = rand(ys.length);

  rs.take(n).forEach(getNext);

  return wu.chain(
    wu(ms).map((m) => m - total).filter((m) => m >= 0).map((m) =>
      [rs.take(m), resetter, rs.take(n)]
    ).flatten(),
    rs
  ).map(getNext);
}

