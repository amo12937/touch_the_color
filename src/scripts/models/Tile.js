"use strict";

export default class Tile {
  constructor(bgColor, borderColor = bgColor, text = "", key = Math.random()) {
    this.bgColor = bgColor;
    this.borderColor = borderColor;
    this.text = text;
    this.textColor = bgColor.textColor();
    this.key = key;
  }
}

