"use strict";

import React from "react"
import Tile from "components/Tile"
import ColorModel from "models/Color"
import ColorMaster from "models/ColorMaster"
import TileModel from "models/Tile"
import rand from "models/rand"

export default class BoardCell extends React.Component {
  render() {
    var a = rand(ColorMaster.length).map((i) => ColorMaster[i]);
    var f = (x) => x.next().value;
    var bgColor = f(a);
    var tile = new TileModel(
      bgColor,
      f(a),
      bgColor.toString()
    );

    return (
      <div className="board_cell">
        <Tile tile={tile} />
      </div>
    );
  }
}

