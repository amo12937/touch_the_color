"use strict";

/*
 *  waiting    | running                      | finished
 * ------------|------------*-----------------|------------
 *             `startTime   `currentTime      `endTime
 */

export default class Timer {
  constructor(max) {
    this.max = max;
    this.reset();
  }

  start(startTime) {
    if (this.isRunning(startTime)) return;
    this.restart(startTime);
  }

  restart(startTime) {
    this.startTime = startTime;
    this.endTime = startTime + this.max;
  }

  reset() {
    this.restart(Infinity);
  }

  add(currentTime, msec) {
    if (!this.isRunning(currentTime)) return false;
    this.restart(Math.min(this.startTime + msec, currentTime));

    return this.isRunning(currentTime)
  }

  isRunning(currentTime) {
    return this.startTime <= currentTime && currentTime < this.endTime;
  }

  isFinished(currentTime) {
    return this.endTime <= currentTime;
  }

  elapsedTime(currentTime) {
    return Math.min(this.max, Math.max(0, currentTime - this.startTime));
  }

  remain(currentTime) {
    return this.max - this.elapsedTime(currentTime);
  }

  percent(currentTime) {
    return Math.floor(100 * this.elapsedTime(currentTime) / this.max);
  }
}

