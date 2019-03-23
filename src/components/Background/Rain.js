import React, { Component } from "react";

import uuid from "uuid";
import Stream from "./Stream";

class Rain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      startPositionX: null
    };
  }

  componentWillMount() {
    this.getNumberOfStreams();
  }

  getNumberOfStreams() {
    const initialWindowWidth = window.innerWidth;
    let x = -20;
    for (let i = 0; i < initialWindowWidth / 20; i++) {
      this.state.streams.push((x += 20));
    }
  }

  render() {
    const { streams } = this.state;

    return (
      <div>
        {streams.map(stream => (
          <Stream key={uuid()} startPositionX={stream} />
        ))}
      </div>
    );
  }
}

export default Rain;
