"use strict";

import React from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

import Hint from "components/hint/Hint"

export default class HintContainer extends React.Component {
  render() {
    var hints = this.props.hints.map((tile, i) =>
      <Hint key={"hint_" + tile.key} hint_order={i} tile={tile} />
    )
    return (
      <div className="hint_container">
        <ReactCSSTransitionGroup
          transitionName="hint_item"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {hints}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

