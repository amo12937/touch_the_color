"use strict";

import StateMachine from "javascript-state-machine"
import LevelMaster from "models/master/LevelMaster"

export default class App {
  constructor() {
    this.currentSize = 3;
    this.levelCandidates = LevelMaster[this.currentSize];
    this.currentLevel = this.levelCandidates[0];
    this.currentGame = new Game(self.currentSize, self.currentLevel);

    var self = this;
    this.fsm = StateMachine.create({
      initial: "WaitingToSelectSize",
      events: [
        {name: "selectSize", from: "WaitingToSelectSize", to: "WaitingToSelectLevel"},
        {name: "selectLevel", from: "WaitingToSelectLevel", to: "PlayingGame"},
        {name: "timeup", from: "PlayingGame", to: "Finished"},
        {name: "retry", from: "Finished", to: "WaitingToSelectSize"}
      ],
      callbacks: {
        onbeforeselectSize: (event, from, to, size) => {
          if (!LevelMaster[size]) return false;

          self.currentSize = size;
          self.levelCandidates = LevelMaster[size]
          return true;
        },
        onbeforeselectLevel: (event, from, to, lv) => {
          if (!self.levelCandidates[lv]) return false;
          self.currentLevel = self.levelCandidates[lv];
          return true;
        },
        onPlayingGame: () => {
          self.currentGame = new Game(self.currentSize, self.currentLevel);
        }
      }
    });
  }
}

