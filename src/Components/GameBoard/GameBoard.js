import React from "react";
import Letter from "../Letter.js/Letter";

export default function GameBoard(props) {
  let { gameObject, splitWord, visableArr } = props;

  const finalWord = gameObject.word;
  const finalType = gameObject.type;

  return (
    <div id="game-board">
      <div id="board">
        {splitWord.map((letter, index) => {
          return (
            <Letter
              key={index}
              index={index}
              letter={letter}
              visable={visableArr.includes(letter)}
            />
          );
        })}
        <div>{finalWord}</div>
        <div>{finalType}</div>
      </div>
    </div>
  );
}
