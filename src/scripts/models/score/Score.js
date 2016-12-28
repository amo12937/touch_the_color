"use strict";

import ScoreValue from "models/score/ScoreValue"

var scoreIcons = {
  table: [
    [200,    "♙"],  // pawn
    [1000,   "♘"],  // knight
    [5000,   "♗"],  // bishop
    [25000,  "♖"],  // rook
    [125000, "♕"],  // queen
  ],
  last: "♔"        // king
};

var bestIcons = {
  table: [
    [200,    "♟"],  // pawn
    [1000,   "♞"],  // knight
    [5000,   "♝"],  // bishop
    [25000,  "♜"],  // rook
    [125000, "♛"],  // queen
  ],
  last: "♚"        // king
};

export default class Score {
  constructor(num, storage) {
    this._storage = storage;
    this._num = num;
    this.current = new ScoreValue(0, scoreIcons.table, scoreIcons.last);
    this.best = new ScoreValue(0, bestIcons.table, bestIcons.last);
    this.reset(num);
  }

  reset(num) {
    this._num = num;
    this.current.update(0);
    var best = 1 * this._storage.getItem("best-" + num);
    this.best.update(best);
    this._isNewRecord = false;
  }

  count (n = 1) {
    this.current.update(this.current.value + n);
    if (this.best.value < this.current.value) {
      this._isNewRecord = true;
      this.best.update(this.current.value);
      this._storage.setItem("best-" + this._num, this.current.value);
    }
  }

  isNewRecord() {
    return this._isNewRecord;
  }
}

