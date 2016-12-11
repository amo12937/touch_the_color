"use strict";

import React from "react"

import Board from "components/board/Board"
import ScoreHintContainer from "components/ScoreHintContainer"

import Rand from "models/Rand"
import ScoreModel from "models/Score"
import HintModel from "models/Hint"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import ColorMaster from "models/ColorMaster"
import Pool from "models/Pool"
import wu from "wu"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.score = new ScoreModel(20);
    this.hintContainer = new HintModel(9, 4, [20], Rand.randIterator);

    this.tileContainer = new TileContainer(9, [
      [new Pool(ColorMaster[0].map((color) => new TileModel(color))), 20],
      [new Pool([].concat.apply([], ColorMaster[1].map((color) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => new TileModel(color, color, i))
      ))), -1]
    ]);
    var tiles = this.tileContainer.tiles();

    this.state = {
      score: this.score,
      hints: this.hintContainer.hints.map((i) => tiles[i]),
      tiles: tiles,
      failed: {}
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(cellId) {
    if (!this.hintContainer.canUpdate(cellId) || !this.tileContainer.trySelect(cellId)) {
      var failed = {};
      failed[cellId] = true;
      this.setState({failed: failed});
      return
    }

    this.score.count();
    this.tileContainer.select(cellId);
    this.hintContainer.update();

    var tiles = this.tileContainer.tiles();
    this.setState({
      score: this.score,
      hints: this.hintContainer.hints.map((i) => tiles[i]),
      tiles: tiles,
      failed: {}
    });
  }

  render() {
    return (
      <div className="app">
        <ScoreHintContainer score={this.state.score} hints={this.state.hints} />
        <Board
          num_of_rows={3}
          num_of_cells={3}
          tiles={this.state.tiles}
          failed={this.state.failed}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

