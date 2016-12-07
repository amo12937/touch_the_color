"use strict";

import React from "react"

export default class SquareBox extends React.Component {
  render() {
    var bgColor = this.props.bgColor;
    return (
      <div className="square_box">
        <div className="square_box_content" style={{backgroundColor: bgColor}}>foo</div>
      </div>
    );
  }
}

