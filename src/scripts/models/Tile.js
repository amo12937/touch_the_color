"use strict";

export default class Tile {
  constructor(bgColor, borderColor = bgColor, text = "", klass = "square", key = Math.random()) {
    this.bgColor = bgColor;
    this.borderColor = borderColor;
    this.text = text;
    this.textColor = bgColor.textColor();
    this.className = klass;
    this.key = key;
  }
}

