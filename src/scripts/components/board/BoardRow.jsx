"use strict";

import React from "react"
import BoardCell from "components/board/BoardCell"

export default class BoardRow extends React.Component {
  render() {
    return (
      <div className="board_row">
        <BoardCell/>
        <BoardCell/>
        <BoardCell/>
      </div>
    );
  }
}

