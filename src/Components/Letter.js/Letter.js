import React from "react";

export default function Letter({ letter, index, visable, punc }) {
  console.log(visable, "Visible");
  console.log(punc, "punc");
  return (
    <div className="tile-border">
      <div
        className={
          visable ? "visable" : "hidden" || punc ? "visable" : "hidden"
        }
        id={`letter${index}`}
      >
        <p className="tile-layout">{letter}</p>
      </div>
    </div>
  );
}
