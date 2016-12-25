"use strict";

import React from "react"

import ScoreHintContainer from "components/ScoreHintContainer"
import Timer from "components/Timer"
import Board from "components/board/Board"

import Game from "models/game/Game"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = new Game();

    this.state = this.getState();

    this.handleClick = this.handleClick.bind(this);
    this.handleTimeup = this.handleTimeup.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
  }

  handleClick(cellId) {
    if (!this.game.select(cellId)) {
      var failed = {};
      failed[cellId] = true;
      this.setState({
        gameState: this.game.state,
        timer: this.game.timer,
        failed: failed
      });
      return
    }

    this.setState(this.getState());
  }

  handleTimeup() {
    this.game.timeup();
    this.setState(this.getState());
  }

  handleRetry() {
    this.game.retry();
    this.setState(this.getState());
  }

  getState() {
    return {
      gameState: this.game.state,
      gameStates: this.game.states,
      timer: this.game.timer,
      score: this.game.score,
      hints: this.game.hints(),
      tiles: this.game.tiles(),
      appeals: this.game.appeals(),
      failed: {}
    };
  }

  render() {
    return (
      <div className="app">
        <div className="app_content">
          <ScoreHintContainer score={this.state.score} hints={this.state.hints} />
          <Timer
            gameState={this.state.gameState}
            gameStates={this.state.gameStates}
            now={Date.now()}
            timer={this.state.timer}
            onTimeup={this.handleTimeup}
          />
          <Board
            num_of_rows={3}
            num_of_cells={3}
            tiles={this.state.tiles}
            appeals={this.state.appeals}
            failed={this.state.failed}
            onClick={this.handleClick}
          />
        </div>
        <div onClick={this.handleRetry}>retry</div>
      </div>
    );
  }
}

