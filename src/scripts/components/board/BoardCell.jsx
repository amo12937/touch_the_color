"use strict";

import React from "react"

export default class BoardCell extends React.Component {
  render() {
    var bgColor = this.props.bgColor;
    return (
      <div className="board_cell" style={{backgroundColor: bgColor}}>
        <div className="board_cell_content"></div>
      </div>
    );
  }
}

