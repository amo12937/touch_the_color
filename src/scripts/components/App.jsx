"use strict";

import React from "react"

import ScoreHintContainer from "components/ScoreHintContainer"
import Timer from "components/Timer"
import Board from "components/board/Board"

import Game from "models/Game"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new Game();

    this.state = {
      score: this.game.score,
      hints: this.game.hints(),
      tiles: this.game.tiles(),
      failed: {}
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(cellId) {
    if (!this.game.select(cellId)) {
      var failed = {};
      failed[cellId] = true;
      this.setState({failed: failed});
      return
    }

    this.setState({
      score: this.game.score,
      hints: this.game.hints(),
      tiles: this.game.tiles(),
      failed: {}
    });
  }

  render() {
    return (
      <div className="app">
        <div className="app_content">
          <ScoreHintContainer score={this.state.score} hints={this.state.hints} />
          <Timer />
          <Board
            num_of_rows={3}
            num_of_cells={3}
            tiles={this.state.tiles}
            failed={this.state.failed}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

