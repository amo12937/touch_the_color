"use strict";

export default class Timer {
  constructor(max) {
    this.max = max;
    this.stoppedTime = 0;
  }

  start(currentTime) {
    if (!this.isStopped(currentTime)) return;
    this.stoppedTime = currentTime + this.max;
  }

  add(currentTime, msec) {
    if (this.isStopped(currentTime)) return false;
    this.stoppedTime = Math.min(this.stoppedTime + msec, currentTime + this.max);

    return !this.isStopped(currentTime)
  }

  isStopped(currentTime) {
    return this.stoppedTime < currentTime;
  }

  remain(currentTime) {
    return Math.max(0, this.stoppedTime - currentTime);
  }

  percent(currentTime) {
    return Math.floor(100 * (this.max - this.remain(currentTime)) / this.max);
  }
}

