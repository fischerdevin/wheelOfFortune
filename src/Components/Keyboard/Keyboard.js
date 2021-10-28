import React, { useState } from "react";
import "./Keyboard.css";

export default function Keyboard(props) {
  const { guessValue } = props;
  const [click, setClick] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    H: true,
    I: true,
    J: true,
    K: true,
    L: true,
    M: true,
    N: true,
    O: true,
    P: true,
    Q: true,
    R: true,
    S: true,
    T: true,
    U: true,
    V: true,
    W: true,
    X: true,
    Y: true,
    Z: true,
  });

  return (
    <>
      <div className="keyboard">
        <button
          className={click.A ? "keys vowel" : "displayNone"}
          value="A"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, A: false });
            guessValue(e);
          }}
        >
          A
        </button>
        <button
          className={click.B ? "keys" : "displayNone"}
          value="B"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, B: false });
            guessValue(e);
          }}
        >
          B
        </button>
        <button
          className={click.C ? "keys" : "displayNone"}
          value="C"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, C: false });
            guessValue(e);
          }}
        >
          C
        </button>
        <button
          className={click.D ? "keys" : "displayNone"}
          value="D"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, D: false });
            guessValue(e);
          }}
        >
          D
        </button>
        <button
          className={click.E ? "keys vowel" : "displayNone"}
          value="E"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, E: false });
            guessValue(e);
          }}
        >
          E
        </button>
        <button
          className={click.F ? "keys" : "displayNone"}
          value="F"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, F: false });
            guessValue(e);
          }}
        >
          F
        </button>
        <button
          className={click.G ? "keys" : "displayNone"}
          value="G"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, G: false });
            guessValue(e);
          }}
        >
          G
        </button>
        <button
          className={click.H ? "keys" : "displayNone"}
          value="H"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, H: false });
            guessValue(e);
          }}
        >
          H
        </button>
        <button
          className={click.I ? "keys vowel" : "displayNone"}
          value="I"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, I: false });
            guessValue(e);
          }}
        >
          I
        </button>
        <button
          className={click.J ? "keys" : "displayNone"}
          value="J"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, J: false });
            guessValue(e);
          }}
        >
          J
        </button>
      </div>
      <div className="keyboard">
        <button
          className={click.K ? "keys" : "displayNone"}
          value="K"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, K: false });
            guessValue(e);
          }}
        >
          K
        </button>
        <button
          className={click.L ? "keys" : "displayNone"}
          value="L"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, L: false });
            guessValue(e);
          }}
        >
          L
        </button>
        <button
          className={click.M ? "keys" : "displayNone"}
          value="M"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, M: false });
            guessValue(e);
          }}
        >
          M
        </button>
        <button
          className={click.N ? "keys" : "displayNone"}
          value="N"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, N: false });
            guessValue(e);
          }}
        >
          N
        </button>
        <button
          className={click.O ? "keys vowel" : "displayNone"}
          value="O"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, O: false });
            guessValue(e);
          }}
        >
          o
        </button>
        <button
          className={click.P ? "keys" : "displayNone"}
          value="P"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, P: false });
            guessValue(e);
          }}
        >
          P
        </button>
        <button
          className={click.Q ? "keys" : "displayNone"}
          value="Q"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, Q: false });

            guessValue(e);
          }}
        >
          Q
        </button>
        <button
          className={click.R ? "keys" : "displayNone"}
          value="R"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, R: false });

            guessValue(e);
          }}
        >
          R
        </button>
        <button
          className={click.S ? "keys" : "displayNone"}
          value="S"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, S: false });

            guessValue(e);
          }}
        >
          S
        </button>
      </div>
      <div className="keyboard">
        <button
          className={click.T ? "keys" : "displayNone"}
          value="T"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, T: false });
            guessValue(e);
          }}
        >
          T
        </button>
        <button
          className={click.U ? "keys vowel" : "displayNone"}
          value="U"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, U: false });
            guessValue(e);
          }}
        >
          U
        </button>
        <button
          className={click.V ? "keys" : "displayNone"}
          value="V"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, V: false });
            guessValue(e);
          }}
        >
          V
        </button>
        <button
          className={click.W ? "keys" : "displayNone"}
          value="W"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, W: false });
            guessValue(e);
          }}
        >
          W
        </button>
        <button
          className={click.X ? "keys" : "displayNone"}
          value="X"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, X: false });
            guessValue(e);
          }}
        >
          X
        </button>
        <button
          className={click.Y ? "keys" : "displayNone"}
          value="Y"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, Y: false });
            guessValue(e);
          }}
        >
          Y
        </button>
        <button
          className={click.Z ? "keys" : "displayNone"}
          value="Z"
          onClick={(e) => {
            e.preventDefault();
            setClick({ ...click, Z: false });
            guessValue(e);
          }}
        >
          Z
        </button>
      </div>
    </>
  );
}
