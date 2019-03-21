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
      startPositionX: 20,
      startPositionY: 0,
      speed: 20
    };
  }

  componentWillMount() {
    this.getRandomNumberOfSymbols();
  }

  componentDidMount() {
    this.createSymbols();

    this.interval = setInterval(() => {
      this.updateYposition(this.state.startPositionY);
      this.updateSymbols(this.state.symbols, this.state.startPositionY);
    }, 2000);

    console.log(this.state.symbols);
  }

  getRandomNumberOfSymbols() {
    const ranNuberOfSymbols = Math.round(Math.random() * 20) + 4;

    this.setState({ numOfSym: ranNuberOfSymbols });
  }

  createSymbols() {
    for (let i = 0; i < this.state.numOfSym; i++) {
      let matrixSymbol = {
        positionX: null,
        positionY: null,
        char: ""
      };
      this.state.symbols.push(matrixSymbol);
    }
  }

  updateYposition(posY) {
    const initWindowHeight = window.innerHeight;
    if (posY > initWindowHeight) {
      this.setState({ startPositionY: 0 });
    } else {
      this.setState({
        startPositionY: posY + this.state.speed
      });
    }
  }

  updateSymbols(array, posY) {
    array.forEach(element => {
      let ranChar = CHARS[Math.floor(Math.random() * 32)];
      element.char = ranChar;
      element.positionY = posY += this.state.speed;
    });

    console.log("number of symbols: " + this.state.numOfSym);
    console.log("y start position: " + this.state.startPositionY);
    console.log(this.state.symbols);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { symbols, startPositionX } = this.state;

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
