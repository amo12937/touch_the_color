"use strict";

export default class ScoreValue {
  constructor(value, iconTable, lastIcon) {
    this.value = value;
    this.findIcon = (v) => {
      var res = iconTable.find(([score, icon]) => v < score);
      return res == null ? lastIcon : res[1];
    }
    this.icon = this.findIcon(value);
  }

  update(value) {
    this.value = value;
    this.icon = this.findIcon(value)
  }
}

