"use strict";

export default class PrefixStorage {
  constructor(base, prefix) {
    this._base = base;
    this._prefix = prefix;
  }

  setItem(key, value) {
    return this._base.setItem(this._prefix + key, value);
  }

  getItem(key) {
    return this._base.getItem(this._prefix + key);
  }
}

