"use strict";

import React from "react"
import BoardCell from "components/board/BoardCell"

export default class BoardRow extends React.Component {
  render() {
    var cells = [];
    for (var i = 0; i < this.props.num_of_cells; i++) {
      var cell_id = this.props.row_id * this.props.num_of_cells + i;
      cells.push(
        <BoardCell
          key={"cell_" + cell_id}
          cell_id={cell_id}
          tile={this.props.tiles[cell_id]}
          appeal={this.props.appeals[cell_id] || false}
          failed={this.props.failed[cell_id] || false}
          onClick={this.props.onClick}
        />
      );
    }

    return (
      <div className="board_row">{cells}</div>
    );
  }
}

