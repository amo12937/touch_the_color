"use strict";

import React from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import SNSContainer from "components/sns/SNSContainer"

export default class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickRetry = this.handleClickRetry.bind(this);
  }

  handleClickRetry() {
    this.props.onClickRetry();
  }

  render() {
    return (
      <div className="game-over">
        <div className="game-over-inner">
          <div className="game-over-retry" onClick={this.handleClickRetry}>retry</div>
          <SNSContainer score={this.props.score} />
        </div>
      </div>
    );
  }
}

