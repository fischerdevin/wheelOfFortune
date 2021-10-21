import React from "react";

export default function Letter({ letter, index, visable }) {
  return (
    <div className={visable ? "visable" : "hidden"} id={`letter${index}`}>
      <p className="tile-layout">{letter}</p>
    </div>
  );
}
