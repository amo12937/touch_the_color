"use strict";

import React from "react"
import BoardCell from "components/board/BoardCell"
import rand from "models/rand"

export default class BoardRow extends React.Component {
  render() {
    var a = rand(1 << 24).map((n) => "#" + n.toString(16));
    var bgColor = this.props.bgColor;
    return (
      <div className="board_row" style={{backgroundColor: bgColor}}>
        <div className="board_row_content">
          <BoardCell bgColor={a.next().value} />
          <BoardCell bgColor={a.next().value} />
          <BoardCell bgColor={a.next().value} />
        </div>
      </div>
    );
  }
}

