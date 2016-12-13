"use strict";

import React from "react"

class TimerActive extends React.Component {
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.props.onTimeup();
    }, this.props.timer.remain(this.props.now));
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    var now = this.props.now;
    var timer = this.props.timer;

    return (
      <div className="timer_front timer_front-active" style={{
        width: timer.percent(now) + "%",
        animationDuration: timer.remain(now) + "ms",
      }}></div>
    );
  }
}

class TimerWaiting extends React.Component {
  render() {
    return (
      <div className="timer_front"></div>
    );
  }
}

export default class Timer extends React.Component {
  render() {
    var now = this.props.now;
    var timer = this.props.timer;
    var child = timer.isStopped(now)
      ? <TimerWaiting />
      : <TimerActive
        key={Math.random()}
        now={now} timer={timer}
        onTimeup={this.props.onTimeup} />

    return (
      <div className="timer">
        <div className="timer_back">
        {child}
        </div>
      </div>
    );
  }
}

