"use strict";

import React from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

import Logo from "components/Logo"
import ScoreHintContainer from "components/ScoreHintContainer"
import Timer from "components/Timer"
import Board from "components/board/Board"
import GameOver from "components/GameOver"

import LevelMaster from "models/master/LevelMaster"
import Game from "models/game/Game"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.size = 3;
    var lv = LevelMaster[this.size][0];
    this.game = new Game(this.size, lv);

    this.state = this.getState();

    var self = this;
    ["handleClick", "handleTimeup", "handleRetry", "handlePause", "handleResume"].forEach((key) => {
      self[key] = self[key].bind(self);
    });
  }

  handleClick(cellId) {
    if (!this.game.select(cellId, Date.now())) {
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
    this.game.timeup(Date.now());
    this.setState(this.getState());
  }

  handleRetry() {
    this.game.retry();
    this.setState(this.getState());
  }

  handlePause() {
    this.game.pause();
    this.setState(this.getState());
  }

  handleResume() {
    this.game.resume();
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
      failed: {},
      num: this.size
    };
  }

  render() {
    var gameOver = this.state.gameState == this.state.gameStates.FINISHED &&
      <GameOver onClickRetry={this.handleRetry} score={this.state.score} />;

    return (
      <div className="app">
        <Logo />
        <div className="app_content">
          <ScoreHintContainer score={this.state.score} hints={this.state.hints} />
          <Timer
            gameState={this.state.gameState}
            gameStates={this.state.gameStates}
            now={Date.now()}
            timer={this.state.timer}
            onTimeup={this.handleTimeup}
            onPause={this.handlePause}
            onResume={this.handleResume}
          />
          <Board
            num_of_rows={this.state.num}
            num_of_cells={this.state.num}
            tiles={this.state.tiles}
            appeals={this.state.appeals}
            failed={this.state.failed}
            onClick={this.handleClick}
          />
        </div>
        <ReactCSSTransitionGroup
          transitionName="game-over"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={400}>
          {gameOver}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

