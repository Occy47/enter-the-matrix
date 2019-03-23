import React, { Component } from "react";
import uuid from "uuid";
import { CHARS } from "../../constants/characters";
import Symbol from "./Symbol";

class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfSym: null,
      symbols: [],
      startPositionY: -20,
      speed: 20
    };
  }

  componentWillMount() {
    this.getRandomNumberOfSymbols();
  }

  componentDidMount() {
    this.createSymbols();

    this.interval = setInterval(() => {
      this.updateSymbols(this.state.symbols);
      this.updateYposition(this.state.startPositionY);
    }, 300);
  }

  getRandomNumberOfSymbols() {
    const ranNuberOfSymbols = Math.round(Math.random() * 20) + 4;

    this.setState({ numOfSym: ranNuberOfSymbols });
  }

  createSymbols() {
    let startPosOfSymbol =
      this.state.startPositionY - this.state.numOfSym * this.state.speed;

    for (let i = 0; i < this.state.numOfSym; i++) {
      let matrixSymbol = {
        positionX: null,
        positionY: (startPosOfSymbol += this.state.speed),
        char: ""
      };
      this.state.symbols.push(matrixSymbol);
    }
  }

  updateYposition(posY) {
    this.setState({
      startPositionY: posY + this.state.speed
    });
  }

  updateSymbols(array) {
    array.forEach(element => {
      let ranChar = CHARS[Math.floor(Math.random() * 32)];

      element.char = ranChar;

      if (element.positionY >= window.innerHeight - 40) {
        element.positionY = -20;
      } else {
        element.positionY = element.positionY += this.state.speed;
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { symbols } = this.state;
    const { startPositionX } = this.props;

    return (
      <div>
        {symbols.map(symbol => (
          <Symbol
            key={uuid()}
            positionX={startPositionX}
            positionY={symbol.positionY}
            char={symbol.char}
          />
        ))}
      </div>
    );
  }
}

export default Stream;
