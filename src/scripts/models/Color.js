"use strict";

export default class Color {
  constructor(rgb) {
    this._r = (rgb >> 16) % 0x100;
    this._g = (rgb >>  8) % 0x100;
    this._b = (rgb >>  0) % 0x100;
  }

  toString() {
    var f = (x) => ("0" + x.toString(16)).slice(-2);
    return `#${f(this._r)}${f(this._g)}${f(this._b)}`
  }

  brightness() {
    return 1.0 * (this._r * 299 + this._g * 587 + this._b * 114) / 255000;
  }

  isBright() {
    return this.brightness() > 0.5;
  }

  textColor() {
    return this.isBright()
      ? new Color(0)
      : new Color(0xffffff);
  }

  isWhite() {
    return this._r == 0xff && this._g == 0xff && this._b == 0xff;
  }
}

