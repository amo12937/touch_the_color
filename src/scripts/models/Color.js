"use strict";

export default class Color {
  constructor(r, g, b) {
    this._r = r;
    this._g = g;
    this._b = b
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
      ? new Color(0, 0, 0)
      : new Color(0xff, 0xff, 0xff);
  }
}

