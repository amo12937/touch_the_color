"use strict";

import React from "react"
import BoardRow from "components/board/BoardRow"

export default class Board extends React.Component {
  render() {
    var rows = [];
    for (var i = 0; i < this.props.num_of_rows; i++) {
      rows.push(
        <BoardRow
          key={"row_" + i}
          row_id={i}
          num_of_cells={this.props.num_of_cells}
          tiles={this.props.tiles}
          failed={this.props.failed}
          onClick={this.props.onClick}
        />
      );
    }

    return (
      <div className="board">
        <div className="board_content">
          {rows}
        </div>
      </div>
    );
  }
}

