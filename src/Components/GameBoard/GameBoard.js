import React from "react";
import Letter from "../Letter.js/Letter";

export default function GameBoard(props) {
  let { gameObject, splitWord, visableArr } = props;

  const finalWord = gameObject.word;
  // const finalWordPunc = splitWord;
  const finalType = gameObject.type;
  let puncRegex = "'";
  console.log(finalWord, "finalWord");
  console.log(visableArr, "visibleArr");
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
              punc={finalWord.includes(puncRegex)}
            />
          );
        })}
        <div>{finalType}</div>
      </div>
    </div>
  );
}
