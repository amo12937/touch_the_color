"use strict";

import Rand from "models/Rand"

import Score from "models/score/Score"
import ScoreTable from "models/score/ScoreTable"
import HintModel from "models/Hint"
import TileContainer from "models/TileContainer"
import TileModel from "models/Tile"
import TimerModel from "models/Timer"
import Color from "models/Color"
import TileMaster from "models/TileMaster"
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
    this.currentNum = 5;

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
          self.currentNum = (self.currentNum + 1) % 3 + 3;
          var num = self.currentNum;
          self.score.reset();
          self.timer.reset();
          self.scoreTable = self._makeScoreTable();
          self._tileUpdationRule = self._makeLevel(num);
          self._hintContainer = self._makeHintContainer(num);
          self._tileContainer = self._makeTileContainer(num, self._tileUpdationRule.shift().pool);
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
      {percent: 10, score: 10},
      {percent: 25, score:  5},
      {percent: 50, score:  3}
    ], {score: 1});
  }

  _makeLevel(num) {
    return TileMaster[num].map((lv) => {
      return {
        num: lv.num,
        level: lv.level,
        score: lv.score,
        pool: new Pool(lv.tiles)
      };
    });
  }

  _makeHintContainer(num) {
    return new HintModel(num * num, 4, Rand.randIterator);
  }

  _makeTileContainer(num, pool) {
    return new TileContainer(num * num, pool);
  }

  retry() { this.state.retry(); }
  timeup(now) { this.state.timeup(now) }

  _update(cellId, now) {
    this.score.count(this.scoreTable.getScore(this.timer.percent(now)));
    this.timer.add(now, 1000);
    if (this._tileUpdationRule.length > 0 && this.score.current.value >= this._tileUpdationRule[0].score) {
      this._tileContainer.updatePool(this._tileUpdationRule.shift().pool);
      this._hintContainer.cleanup();
    }
    this._tileContainer.select(cellId);
    this._hintContainer.update();
  }
  select(cellId, now) { return this.state.select(cellId, now); }

  hints() {
    var tiles = this.tiles();
    return this._hintContainer.hints.map((i) => tiles[i])
  }
  tiles() { return this._tileContainer.tiles(); }

  appeals() { return this.state.appeals(); }
}

