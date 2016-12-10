"use strict";

import React from "react"

export default class Tile extends React.Component {
  render() {
    var tile = this.props.tile;
    return (
      <div className="tile" style={{backgroundColor: tile.borderColor}}>
        <div className="tile_content" style={{
          backgroundColor: tile.bgColor,
          color: tile.textColor
        }}>
          {tile.text}
        </div>
      </div>
    );
  }
}

