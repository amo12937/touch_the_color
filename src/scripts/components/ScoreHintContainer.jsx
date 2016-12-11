"use strict";

import React from "react"
import HintContainer from "components/hint/HintContainer"
import ScoreContainer from "components/score/ScoreContainer"

export default class ScoreHintContainer extends React.Component {
  render() {
    return (
      <div className="score_hint_container">
        <ScoreContainer score={this.props.score} />
        <HintContainer hints={this.props.hints} />
      </div>
    );
  }
}

