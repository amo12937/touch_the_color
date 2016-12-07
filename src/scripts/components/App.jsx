"use strict";

import React from "react"

import SquareBox from "components/SquareBox"
import Board from "components/board/Board"

import rand from "models/rand"
import itemCollection from "models/item_collection"
import IteratorWithTryNext from "models/iterator_with_try_next"
import TileContainer from "models/tile_container"
import wu from "wu"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.hint = itemCollection(rand)([0, 1, 2, 3, 4, 5, 6, 7, 8], 4, [20, 20])
    this.tileContainer = new TileContainer(9,
      wu.chain(
        itemCollection(rand)(Array.from("abcdefghijklmnopqr"), 9).take(20),
        itemCollection(rand)(Array.from("ABCDEFGHIJKLMNOPQR"), 9).take(20),
        itemCollection(rand)(Array.from("abcdefghijklmnopqr"), 9)
      )
    );
    this.state = {
      tiles: this.tileContainer.tiles()
    }
  }

  handleClick() {
    console.log(this)
    this.tileContainer.select(this.hint.next().value);
    this.setState({tiles: this.tileContainer.tiles()});
  }

  render() {
    var tiles = this.state.tiles;

    return (
      <div className="app">
        <Board />
        <SquareBox bgColor="#ccffcc" />
        <SquareBox bgColor="#ffffcc" />
      </div>
    );
  }
}

