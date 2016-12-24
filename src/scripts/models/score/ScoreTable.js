"use strict";

export default class ScoreTable {
  constructor(table, defaultScore) {
    this.table = table;
    this.defaultScore = defaultScore;
  }

  getScore(percent) {
    return (this.table.find((item) => percent < item.percent) || this.defaultScore).score;
  }
}

