"use strict";

import React from "react"
import TweetButton from "components/sns/TweetButton"

export default class SNSContainer extends React.Component {
  render() {
    return (
      <div className="sns-container">
        <TweetButton score={this.props.score} />
      </div>
    );
  }
}

