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
    var now = this.props.now;
    var timer = this.props.timer;
    return (
      <div className="timer_front timer_front-waiting" style={{
        animationDuration: timer.max + "ms",
        animationDelay: "-" + timer.elapsedTime(now) + "ms"
      }}></div>
    );
  }
}

class PauseButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var timer = this.props.timer;
    if (timer.is("Running")) this.props.onPause();
    else if (timer.is("Pausing")) this.props.onResume();
  }

  render() {
    var timer = this.props.timer;
    var classes = ["pause-button"]
    if (timer.is("Running")) classes.push("pause-button-pause");
    else if (timer.is("Pausing")) classes.push("pause-button-resume");
    else classes.push("pause-button-waiting");

    return (
      <div className={classes.join(" ")} onClick={this.handleClick}></div>
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
      : <TimerWaiting now = {now} timer={timer} />

    return (
      <div className="timer">
        <div className="timer_back">
          {child}
        </div>
        <PauseButton timer={timer}
          onPause={this.props.onPause}
          onResume={this.props.onResume}/>
      </div>
    );
  }
}

