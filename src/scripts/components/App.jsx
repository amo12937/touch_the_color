"use strict";

import React from "react"

import Board from "components/board/Board"
import HintContainer from "components/hint/HintContainer"

import Rand from "models/Rand"
import itemCollection from "models/item_collection"
import IteratorWithTryNext from "models/iterator_with_try_next"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import ColorMaster from "models/ColorMaster"
import Pool from "models/Pool"
import wu from "wu"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.hintContainer = itemCollection(Rand.randIterator)([0, 1, 2, 3, 4, 5, 6, 7, 8], 4, [20, 20]);
    this.hint = Array.from(this.hintContainer.take(4));

    this.tileContainer = new TileContainer(9, [
      [new Pool(ColorMaster[0].map((color) => new TileModel(color))), 20],
      [new Pool([].concat.apply([], ColorMaster[1].map((color) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => new TileModel(color, color, i))
      ))), -1]
    ]);
    this.state = {
      hint: this.hint.map((i) => this.tileContainer.tiles()[i]),
      tiles: this.tileContainer.tiles(),
      failed: {}
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(cell_id) {
    //this.tileContainer.select(this.hint.next().value);
    if (this.hint[0] != cell_id) {
      var failed = {}
      failed[cell_id] = true;
      this.setState({failed: failed})
      return;
    }
    this.tileContainer.select(cell_id);
    this.hint.shift();
    var tiles = this.tileContainer.tiles()
    this.hint.push(this.hintContainer.next().value);
    this.setState({
      hint: this.hint.map((i) => this.tileContainer.tiles()[i]),
      tiles: tiles,
      failed: {}
    });
    return true;
  }

  render() {
    var tiles = this.state.tiles;

    return (
      <div className="app">
        <HintContainer hints={this.state.hint} />
        <Board
          num_of_rows={3}
          num_of_cells={3}
          tiles={tiles}
          failed={this.state.failed}
          onClick={this.handleClick}
        />
        {ColorMaster[0].map((color) =>
          <div key={color.toString()} style={{backgroundColor: color, color:color.textColor()}}>
            {color.toString()} {color.brightness()}
          </div>
        )}
      </div>
    );
  }
}

