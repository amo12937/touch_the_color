"use strict";

import React from "react"
import Tile from "components/Tile"

export default class BoardCell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.cell_id)
  }

  render() {
    if (window.ontouchstart !== undefined)
      var handleTouchStart = this.handleClick;
    else
      var handleClick = this.handleClick;

    return (
      <div className="board_cell" onTouchStart={handleTouchStart} onClick={handleClick}>
        <Tile tile={this.props.tile} />
      </div>
    );
  }
}

