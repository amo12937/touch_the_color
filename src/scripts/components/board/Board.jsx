"use strict";

import React from "react"
import BoardRow from "components/board/BoardRow"

export default class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="board_content">
          <BoardRow bgColor="#eeeeff" />
          <BoardRow bgColor="#ffeeee" />
          <BoardRow bgColor="#eeffee" />
        </div>
      </div>
    );
  }
}

