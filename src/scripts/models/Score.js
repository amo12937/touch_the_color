"use strict";

import ScoreValue from "models/ScoreValue"

var scoreIcons = {
  table: [
    [20,    "♙"],  // pawn
    [100,   "♘"],  // knight
    [500,   "♗"],  // bishop
    [2500,  "♖"],  // rook
    [12500, "♕"],  // queen
  ],
  last: "♔"        // king
};

var bestIcons = {
  table: [
    [20,    "♟"],  // pawn
    [100,   "♞"],  // knight
    [500,   "♝"],  // bishop
    [2500,  "♜"],  // rook
    [12500, "♛"],  // queen
  ],
  last: "♚"        // king
};

export default class Score {
  constructor(best) {
    this.current = new ScoreValue(0, scoreIcons.table, scoreIcons.last);
    this.best = new ScoreValue(best, bestIcons.table, bestIcons.last);
  }

  reset() {
    this.current.update(0);
  }

  count (n = 1) {
    this.current.update(this.current.value + n);
    if (this.best.value < this.current.value)
      this.best.update(this.current.value);
  }
}

