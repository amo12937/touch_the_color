"use strict";

import React from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.update();
  }

  update() {
    var prev = [this.icon, this.value];
    this.icon = this.props.score.icon;
    this.value = this.props.score.value;
    return prev;
  }

  render () {
    var [prevIcon, prevValue] = this.update();

    return (
      <div className="score">
        <div key={this.props.score.icon} className="score_icon">
          <ReactCSSTransitionGroup
            transitionName="score_animation"
            transitionAppear={true}
            transitionAppearTimeout={400}
            transitionEnter={false}
            transitionLeave={false}>
            <div>{this.props.score.icon}</div>
          </ReactCSSTransitionGroup>
        </div>
        <div key={this.props.score.value} className="score_value">
          <ReactCSSTransitionGroup
            transitionName="score_animation"
            transitionAppear={true}
            transitionAppearTimeout={400}
            transitionEnter={false}
            transitionLeave={false}>
            <div>{this.props.score.value}</div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

