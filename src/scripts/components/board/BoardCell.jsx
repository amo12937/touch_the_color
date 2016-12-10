"use strict";

import React from "react"
import Tile from "components/Tile"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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

    var tile = this.props.tile;

    return (
      <div className="board_cell" onTouchStart={handleTouchStart} onClick={handleClick}>
        <ReactCSSTransitionGroup
          transitionName="board_item"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          <Tile key={tile.key} tile={tile} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

