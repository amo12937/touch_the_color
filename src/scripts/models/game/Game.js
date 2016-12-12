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
    this._hintContainer = this._makeHintContainer();
    this._tileContainer = this._makeTileContainer();

    var stateInit = new StateInit(this);
    var stateStarted = new StateStarted(this);
    var stateFinished = new StateFinished(this);

    var self = this;

    var fsm = StateMachine.create({
      initial: "Init",
      events: [
        {name: "start", from: "Init", to: "Started"},
        {name: "timeup", from: "Started", to: "Finished"},
        {name: "retry", from: "Finished", to: "Init"}
      ],
      callbacks: {
        onInit: () => self._state = stateInit,
        onStarted: () => {
          self.timer.start(Date.now());
          self._state = stateStarted;
        },
        onFinished: () => self._state = stateFinished
      }
    });

    this._fsm = fsm;

    this._state = stateInit;
  }

  _makeHintContainer() {
    return new HintModel(9, 4, [100], Rand.randIterator);
  }

  _makeTileContainer() {
    return new TileContainer(9, [
      [new Pool(ColorMaster[0].map((color) => new TileModel(color))), 100],
      [new Pool([].concat.apply([], ColorMaster[1].map((color) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => new TileModel(color, color, i))
      ))), -1]
    ]);
  }

  retry() { this._fsm.retly(); }
  timeup() { this._fsm.timeup(); }

  _update(cellId) {
    this.timer.add(Date.now(), 1000);
    this.score.count();
    this._tileContainer.select(cellId);
    this._hintContainer.update();
  }
  select(cellId) { return this._state.select(cellId); }

  hints() {
    var tiles = this.tiles();
    return this._hintContainer.hints.map((i) => tiles[i])
  }
  tiles() { return this._tileContainer.tiles(); }

  appeals() { return this._state.appeals(); }
}

