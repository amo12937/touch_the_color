"use strict";

export default class IteratorWithTryNext {
  constructor(iterable) {
    this._iterable = iterable;
    this._next = iterable.next();
  }

  next() {
    var next = this._next;
    this._next = this._iterable.next();
    return next;
  }

  tryNext() {
    return this._next;
  }
}

