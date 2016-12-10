"use strict";

export default class Tile {
  constructor(bgColor, borderColor = bgColor, text = "") {
    this.bgColor = bgColor;
    this.borderColor = borderColor;
    this.text = text;
    this.textColor = bgColor.textColor();
    this.key = "" + bgColor + borderColor + text;
  }
}

