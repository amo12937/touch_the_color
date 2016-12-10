"use strict";

import React from "react"
import Tile from "components/Tile"

export default class Hint extends React.Component {
  render() {
    var classes = [
      "hint",
      "hint-" + this.props.hint_order
    ];
    return (
      <div className={classes.join(" ")}>
        <Tile tile={this.props.tile} />
      </div>
    );
  }
}
