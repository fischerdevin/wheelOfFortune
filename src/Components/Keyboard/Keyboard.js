import React from "react";
import "./Keyboard.css";

export default function Keyboard(props) {
  const { guessValue } = props;
  return (
    <>
      <div className="keyboard">
        <button className="keys vowel" value="A" onClick={guessValue}>
          A
        </button>
        <button className="keys" value="B" onClick={guessValue}>
          B
        </button>
        <button className="keys" value="C" onClick={guessValue}>
          C
        </button>
        <button className="keys" value="D" onClick={guessValue}>
          D
        </button>
        <button className="keys vowel" value="E" onClick={guessValue}>
          E
        </button>
        <button className="keys" value="F" onClick={guessValue}>
          F
        </button>
        <button className="keys" value="G" onClick={guessValue}>
          G
        </button>
        <button className="keys" value="H" onClick={guessValue}>
          H
        </button>
        <button className="keys vowel" value="I" onClick={guessValue}>
          I
        </button>
        <button className="keys" value="J" onClick={guessValue}>
          J
        </button>
      </div>
      <div className="keyboard">
        <button className="keys" value="K" onClick={guessValue}>
          K
        </button>
        <button className="keys" value="L" onClick={guessValue}>
          L
        </button>
        <button className="keys" value="M" onClick={guessValue}>
          M
        </button>
        <button className="keys" value="N" onClick={guessValue}>
          N
        </button>
        <button className="keys vowel" value="O" onClick={guessValue}>
          O
        </button>
        <button className="keys" value="P" onClick={guessValue}>
          P
        </button>
        <button className="keys" value="Q" onClick={guessValue}>
          Q
        </button>
        <button className="keys" value="R" onClick={guessValue}>
          R
        </button>
        <button className="keys" value="S" onClick={guessValue}>
          S
        </button>
      </div>
      <div className="keyboard">
        <button className="keys" value="T" onClick={guessValue}>
          T
        </button>
        <button className="keys vowel" value="U" onClick={guessValue}>
          U
        </button>
        <button className="keys" value="V" onClick={guessValue}>
          V
        </button>
        <button className="keys" value="W" onClick={guessValue}>
          W
        </button>
        <button className="keys" value="X" onClick={guessValue}>
          X
        </button>
        <button className="keys" value="Y" onClick={guessValue}>
          Y
        </button>
        <button className="keys" value="Z" onClick={guessValue}>
          Z
        </button>
      </div>
    </>
  );
}
