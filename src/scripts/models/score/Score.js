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

