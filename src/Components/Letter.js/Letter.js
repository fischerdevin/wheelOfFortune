import React from "react";

export default function Letter({ letter, index }) {
  return (
    <div className="letter" id={`letter${index}`}>
      <p className="tile-layout">{letter}</p>
    </div>
  );
}
