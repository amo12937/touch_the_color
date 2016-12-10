"use strict";

import React from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

import Hint from "components/hint/Hint"

import TileModel from "models/Tile"
import ColorModel from "models/Color"

import Rand from "models/Rand"

export default class HintContainer extends React.Component {
  render() {
    var tiles = Rand.randIterator(256).chunk(6).map(([r, g, b, rb, gb, bb]) =>
      new TileModel(
        new ColorModel(r, g, b),
        new ColorModel(rb, gb, bb)
      )
    );
    var tile = new TileModel(
      new ColorModel(0x3a, 0x30, 0x42)
    );

    var hints = this.props.hints.map((tile, i) =>
      <Hint key={"hint_" + tile.key} hint_order={i} tile={tile} />
    )
    return (
      <div className="hint_container">
        <div className="hint_container_content">
          <ReactCSSTransitionGroup
            transitionName="hint_item"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}>
            {hints}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

