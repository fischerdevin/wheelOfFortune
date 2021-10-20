import React from "react";

export default function GameBoard(props) {
  let { gameWord } = props;

  const finalWord = gameWord.word;
  const finalType = gameWord.type;

  return (
    <div id="game-board">
      <div>{finalWord}</div>
      <div>{finalType}</div>
    </div>
  );
}
