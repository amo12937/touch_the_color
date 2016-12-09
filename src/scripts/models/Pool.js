"use strict";

import Rand from "models/Rand"

export default class Pool {
  constructor(objs) {
    this._objs = objs;
  }

  borrow() {
    return this._objs.splice(Rand.randInt(this._objs.length), 1)[0]
  }

  returnObject(obj) {
    this._objs.push(obj);
  }
}

