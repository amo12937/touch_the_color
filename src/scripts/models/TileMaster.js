"use strict";

import ColorMaster from "models/ColorMaster"
import Color from "models/Color"
import Tile from "models/Tile"
import wu from "wu"

var cm = ColorMaster;

var colors3 = [
  cm.red,
  cm.yellow,
  cm.green,
  cm.blue,
  cm.sky,
  cm.pink,
  cm.orange,
  cm.purple,
  cm.brown,
  cm.lightYellowGreen,
  cm.lightSky,
  cm.beige,
  cm.lightPurple,
  cm.lightGray,
  cm.gray,
  cm.black
];

var colors4 = [
  cm.red,
  cm.yellow,
  cm.green,
  cm.blue,
  cm.sky,
  cm.pink,
  cm.orange,
  cm.purple,
  cm.brown,
  cm.beige,
  cm.lightGray,
  cm.gray,
  cm.black
];

var colors5 = [
  cm.red,
  cm.yellow,
  cm.green,
  cm.blue,
  cm.sky,
  cm.pink,
  cm.orange,
  cm.purple,
  cm.brown,
  cm.lightPink,
  cm.cream,
  cm.lightYellowGreen,
  cm.lightSky,
  cm.beige,
  cm.lightGreen,
  cm.lightPurple,
  cm.white,
  cm.lightGray,
  cm.gray,
  cm.black
];

var nums = "0123456789";
var uni = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var f = (colors, texts, types) => Array.from(wu(colors).map((color) =>
  wu(texts).map((text) =>
    wu(types).map((type) => {
      var borderColor = color.isWhite() ? new Color(0) : color;
      return new Tile(color, borderColor, text, type)
    })
  )
).flatten())

export default {
  3: [
    {num: 3, level: 1, score:    0, tiles: f(colors3, [""], ["square"])},
    {num: 3, level: 2, score: 1000, tiles: f(colors3, nums, ["square"])},
    {num: 3, level: 3, score: 5000, tiles: f(colors3, uni, ["square"])},
  ],
  4: [
    {num: 4, level: 1, score:    0, tiles: f(colors4, [""], ["square", "circle"])},
    {num: 4, level: 2, score: 1000, tiles: f(colors4, nums, ["square", "circle"])},
    {num: 4, level: 3, score: 5000, tiles: f(colors4, uni, ["square", "circle"])},
  ],
  5: [
    {num: 5, level: 1, score:    0, tiles: f(colors5, [""], ["square", "circle"])},
    {num: 5, level: 2, score: 1000, tiles: f(colors5, nums, ["square", "circle"])},
    {num: 5, level: 3, score: 5000, tiles: f(colors5, uni, ["square", "circle"])}
  ]
};

