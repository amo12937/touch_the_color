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
        animationDuration: timer.max + "ms",
        animationDelay: "-" + timer.elapsedTime(now) + "ms"
      }}></div>
    );
  }
}

class TimerWaiting extends React.Component {
  render() {
    var width = this.props.gameState == this.props.gameStates.INIT ? 0 : 100;
    return (
      <div className="timer_front" style={{width:"" + width + "%"}}></div>
    );
  }
}

export default class Timer extends React.Component {
  render() {
    var now = this.props.now;
    var timer = this.props.timer;
    var child = this.props.gameState == this.props.gameStates.STARTED
      ? <TimerActive
        key={Math.random()}
        now={now} timer={timer}
        onTimeup={this.props.onTimeup} />
      : <TimerWaiting
        gameState={this.props.gameState}
        gameStates={this.props.gameStates} />

    return (
      <div className="timer">
        <div className="timer_back">
          {child}
        </div>
      </div>
    );
  }
}

