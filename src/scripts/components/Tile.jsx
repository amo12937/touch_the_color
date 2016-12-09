"use strict";

import React from "react"

export default class Tile extends React.Component {
  render() {
    return (
      <div className="tile" style={{
        backgroundColor: this.props.tile.bgColor,
        borderColor: this.props.tile.borderColor
      }}>
        <div className="tile_content" style={{color: this.props.tile.textColor}}>
          {this.props.tile.text}
        </div>
      </div>
    );
  }
}

