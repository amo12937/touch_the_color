"use strict";

import React from "react"

export default class TweetButton extends React.Component {
  componentDidMount() {
    console.log(this.refs.tweetButton);
    twttr.widgets.load(this.refs.tweetButton);
  }

  makeText(score) {
    var prefix = score.isNewRecord() ? "[New Record] " : "";
    return `${prefix}I scored ${score.current.value} pt at #touch_the_color !`;
  }

  render() {
    var text = this.makeText(this.props.score);

    return (
      <a ref="tweetButton"
        href="https://twitter.com/share"
        className="twitter-share-button"
        data-size="large"
        data-text={text}
        data-show-count="false">Tweet</a>
    );
  }
}

