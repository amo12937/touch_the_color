"use strict";

import Color from "models/Color"

var f = (r, g, b) => new Color(r * 0x10000 + g * 0x100 + b);

export default {
  red:              f(255,  40,   0),
  yellow:           f(250, 245,   0),
  green:            f( 53, 161, 107),
  blue:             f(  0,  65, 255),
  sky:              f(102, 204, 255),
  pink:             f(255, 153, 160),
  orange:           f(255, 153,   0),
  purple:           f(153,   0, 121),
  brown:            f(102,  51,   0),

  lightPink:        f(255, 209, 209),
  cream:            f(255, 255, 153),
  lightYellowGreen: f(203, 242, 102),
  lightSky:         f(180, 235, 250),
  beige:            f(237, 197, 143),
  lightGreen:       f(135, 231, 176),
  lightPurple:      f(199, 178, 222),

  white:            f(255, 255, 255),
  lightGray:        f(200, 200, 203),
  gray:             f(127, 135, 143),
  black:            f(  0,   0,   0),
};

