import React from "react";
import "./Symbol.css";

const Symbol = ({ positionX, positionY, char }) => (
  <div
    id="symbol"
    style={{
      top: positionY + "px",
      left: positionX + "px",
      position: "absolute"
    }}
  >
    {char}
  </div>
);

export default Symbol;
