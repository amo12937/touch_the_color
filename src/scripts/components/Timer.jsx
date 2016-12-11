"use strict";

import React from "react"

export default class Timer extends React.Component {
  render() {
    return (
      <div className="timer">
        <div className="timer-back">
          <div className="timer-front"></div>
        </div>
      </div>
    );
  }
}

