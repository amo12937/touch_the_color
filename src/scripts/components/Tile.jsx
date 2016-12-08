"use strict";

import React from "react"

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.bgColor = this.props.tile.bgColor;
    this.borderColor = this.props.tile.borderColor;
    this.text = this.props.tile.text;
    this.textColor = this.props.tile.textColor;
  }

  render() {
    return (
      <div className="tile" style={{
        backgroundColor: this.bgColor,
        borderColor: this.borderColor
      }}>
        <div className="tile_content" style={{color: this.textColor}}>
          {this.text}
        </div>
      </div>
    );
  }
}

