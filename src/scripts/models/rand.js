"use strict";

import wu from "wu"

export default ((self = {}) => {
  self.randInt = (n) => Math.floor(Math.random() * n);
  self.randIterator = (n) => wu.repeat(n).map(self.randInt);

  return self;
})();

