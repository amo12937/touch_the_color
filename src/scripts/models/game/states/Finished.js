"use strict";

export default class Finished {
  constructor () {
    this._appeals = {};
  }
  select() {
    return false;
  }

  appeals() { return this._appeals; }
}
