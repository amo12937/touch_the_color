"use strict";

import StateMachine from "javascript-state-machine"

/*
 *  waiting    | running                      | finished
 * ------------|------------*-----------------|------------
 *             `startTime   `currentTime      `endTime
 */

export default class Timer {
  constructor(max) {
    this.max = max;
    var startTime, endTime, pauseTime;

    var setSpan = (n) => {
      startTime = n;
      endTime = n + max;
    }

    var fsm = StateMachine.create({
      initial: "Waiting",
      events: [
        {name: "start",  from: "Waiting",  to: "Running"},
        {name: "add",    from: "Running",  to: "Running"},
        {name: "pause",  from: "Running",  to: "Pausing"},
        {name: "resume", from: "Pausing",  to: "Running"},
        {name: "timeup", from: "Running",  to: "Finished"},
        {name: "reset",  from: "Finished", to: "Waiting"}
      ],
      callbacks: {
        onWaiting: () => { setSpan(Infinity); },
        onstart: (ev, f, t, now) => {
          setSpan(now);
        },
        onadd: (ev, f, t, now, msec) => {
          setSpan(Math.min(startTime + msec, now));
        },
        onbeforepause: (ev, f, t, now) => startTime <= now,
        onenterPausing: (ev, f, t, now) => {
          pauseTime = now;
        },
        onleavePausing: (ev, f, t, now) => {
          setSpan(startTime + now - pauseTime);
          pauseTime = null;
        },
        onbeforetimeup: (ev, f, t, now) => endTime <= now
      }
    });

    var elapsedTime = {
      Waiting: () => 0,
      Running: (now) => Math.min(max, Math.max(0, now - startTime)),
      Pausing: (now) => elapsedTime.Running(Math.min(now, pauseTime)),
      Finished: () => max
    }

    this.elapsedTime = (now) => elapsedTime[fsm.current](now);
    this.remain = (now) => max - this.elapsedTime(now);
    this.percent = (now) => Math.floor(100 * this.elapsedTime(now) / max);

    var run = (ev) => function() {
      return fsm.can(ev) && fsm[ev].apply(fsm, arguments);
    }

    this.start = run("start");
    this.add = (now, msec) => {
      this.timeup(now);
      run("add")(now, msec);
      this.timeup(now);
    }
    this.pause = (now) => {
      this.timeup(now);
      return run("pause")(now);
    }
    this.resume = run("resume");
    this.timeup = run("timeup");
    this.reset = run("reset");
    this.currentState = () => fsm.current;
    this.is = (s) => fsm.is(s);
    this.can = (e) => fsm.can(e);
  }
}

