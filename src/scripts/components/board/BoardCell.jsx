"use strict";

import React from "react"
import Tile from "components/Tile"
import AnimateOnChange from "react-animate-on-change"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import wu from "wu"

export default class BoardCell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.counter = wu.count();
  }

  handleClick() {
    this.props.onClick(this.props.cell_id);
  }

  render() {
    if (window.ontouchstart !== undefined)
      var handleTouchStart = this.handleClick;
    else
      var handleClick = this.handleClick;

    var tile = this.props.tile;

    var classes = ["board_cell"];
    if (this.props.appeal) classes.push("board_cell_appeal");

    return (
      <div className={classes.join(" ")} onTouchStart={handleTouchStart} onClick={handleClick}>
        <ReactCSSTransitionGroup
          transitionName="board_item"
          transitionAppear={true}
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          <AnimateOnChange key={tile.key}
            baseClassName="board_item"
            animationClassName="board_item_failed"
            animate={this.props.failed}>
            <Tile tile={tile} />
          </AnimateOnChange>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

