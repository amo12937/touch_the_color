"use strict";

import React from "react"
import Score from "components/score/Score"

export default class ScoreContainer extends React.Component {
  render() {
    return (
      <div className="score_container">
        <Score text="SCORE" score={this.props.score.current} />
        <Score text="BEST" score={this.props.score.best} />
      </div>
    );
  }
}


