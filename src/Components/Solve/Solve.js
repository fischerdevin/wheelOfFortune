import React from "react";

export default function Solve(props) {
  const { switchScreen, solveFn, rightOrWrongSolve } = props;
  return (
    <div className="solve">
      <h1 id="solve-title">Solve The Phrase</h1>
      <div className="top-right">
        <button onClick={switchScreen}>Lose Turn</button>
      </div>
      <div id="input-solve-container">
        <form>
          <input type="text" onChange={solveFn} />
          <button onClick={rightOrWrongSolve} id="solveBtn">
            Solve Puzzle
          </button>
        </form>
        <h2 className="rule-input-solve">Single Spacing Only</h2>
        <h2 className="rule-input-solve">Spelling Important!</h2>
        <h2 className="rule-input-solve">Case Does Not Matter</h2>
      </div>
    </div>
  );
}
