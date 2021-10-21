import React from "react";

export default function Solve(props) {
  const { switchScreen, solveFn, rightOrWrongSolve } = props;
  return (
    <div className="solve">
      <h1>Solve The Phrase</h1>
      <div className="top-right">
        <button onClick={switchScreen}>Lose Turn</button>
      </div>
      <form action="">
        <input type="text" onChange={solveFn} />
        <button onClick={rightOrWrongSolve}>Solve Puzzel</button>
      </form>
    </div>
  );
}
