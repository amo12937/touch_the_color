"use strict";

import Rand from "models/Rand"

import Score from "models/score/Score"
import ScoreTable from "models/score/ScoreTable"
import HintModel from "models/Hint"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import TimerModel from "models/Timer"
import Color from "models/Color"
import ColorMaster from "models/ColorMaster"
import Pool from "models/Pool"
import PrefixStorage from "models/PrefixStorage"
import wu from "wu"

import StateMachine from "javascript-state-machine"

import StateInit from "models/game/states/Init"
import StateStarted from "models/game/states/Started"
import StateFinished from "models/game/states/Finished"

export default class Game {
  constructor() {
    this.timer = new TimerModel(5000);

    var storage = new PrefixStorage(localStorage, "touch_the_color/");
    this.score = new Score(storage);

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
        onInit: () => {
          self.score.reset();
          self.scoreTable = self._makeScoreTable();
          self._tileUpdationRule = self._makeTileUpdationRule();
          self._hintContainer = self._makeHintContainer();
          self._tileContainer = self._makeTileContainer();
          self.state = self.states.INIT;
        },
        onStarted: () => {
          self.timer.start(Date.now());
          self.state = self.states.STARTED;
        },
        onFinished: () => self.state = self.states.FINISHED
      }
    });

    this._fsm = fsm;
  }

  _makeScoreTable() {
    return new ScoreTable([
      {percent: 10, score: 10, color: new Color(0x3B, 0xF4, 0x2E)},
      {percent: 25, score:  5, color: new Color(0xFD, 0xE8, 0x4C)},
      {percent: 50, score:  3, color: new Color(0xFE, 0xA3, 0x42)}
    ], {score: 1, color: new Color(0xFF, 0x5F, 0x38)});
  }

  _makeTileUpdationRule() {
    return [1000];
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

  retry() { this._fsm.retry(); }
  timeup() { this._fsm.timeup(); }

  _update(cellId) {
    var now = Date.now();
    this.score.count(this.scoreTable.getScore(this.timer.percent(now)));
    this.timer.add(now, 1000);
    if (this._tileUpdationRule.length > 0 && this.score.current.value >= this._tileUpdationRule[0]) {
      this._tileUpdationRule.shift();
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

