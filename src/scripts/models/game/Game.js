"use strict";

import Rand from "models/Rand"

import Score from "models/Score"
import HintModel from "models/Hint"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import TimerModel from "models/Timer"
import ColorMaster from "models/ColorMaster"
import Pool from "models/Pool"
import wu from "wu"

import StateMachine from "javascript-state-machine"

import StateInit from "models/game/states/Init"
import StateStarted from "models/game/states/Started"
import StateFinished from "models/game/states/Finished"

export default class Game {
  constructor() {
    this.timer = new TimerModel(5000);

    this.score = new Score(0);

    this._scoreTable = this._makeScoreTable();
    this._hintContainer = this._makeHintContainer();
    this._tileContainer = this._makeTileContainer();

    this.states = {
      INIT: new StateInit(this),
      STARTED: new StateStarted(this),
      FINISHED: new StateFinished(this)
    };

    var self = this;

    var fsm = StateMachine.create({
      initial: "Init",
      events: [
        {name: "start", from: "Init", to: "Started"},
        {name: "timeup", from: "Started", to: "Finished"},
        {name: "retry", from: "Finished", to: "Init"}
      ],
      callbacks: {
        onInit: () => self.state = self.states.INIT,
        onStarted: () => {
          self.timer.start(Date.now());
          self.state = self.states.STARTED;
        },
        onFinished: () => self.state = self.states.FINISHED
      }
    });

    this._fsm = fsm;

    this.state = this.states.INIT;
  }

  _makeScoreTable() {
    return [20];
  }

  _makeHintContainer() {
    return new HintModel(9, 4, Rand.randIterator);
  }

  _makeTileContainer() {
    return new TileContainer(9, [
      new Pool(ColorMaster[0].map((color) => new TileModel(color))),
      new Pool([].concat.apply([], ColorMaster[1].map((color) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => new TileModel(color, color, i))
      )))
    ]);
  }

  retry() { this._fsm.retly(); }
  timeup() { this._fsm.timeup(); }

  _update(cellId) {
    this.timer.add(Date.now(), 1000);
    this.score.count();
    if (this._scoreTable.length > 0 && this.score.current.value >= this._scoreTable[0]) {
      this._scoreTable.shift();
      this._tileContainer.updatePoolPointer();
      this._hintContainer.cleanup();
    }
    this._tileContainer.select(cellId);
    this._hintContainer.update();
  }
  select(cellId) { return this.state.select(cellId); }

  hints() {
    var tiles = this.tiles();
    return this._hintContainer.hints.map((i) => tiles[i])
  }
  tiles() { return this._tileContainer.tiles(); }

  appeals() { return this.state.appeals(); }
}

