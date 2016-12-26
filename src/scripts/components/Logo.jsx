"use strict";

import React from "react"

export default class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <div className="logo-inner">
          <img className="logo-image" src="images/logo.svg" />
        </div>
      </div>
    );
  }
}

