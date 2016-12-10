"use strict";

import React from "react"
import Tile from "components/Tile"

export default class Hint extends React.Component {
  render() {
    var className = this.props.current ? "hint_current" : "hint"
    return (
      <div className={className}>
        <Tile tile={this.props.tile} />
      </div>
    );
  }
}
