import React from "react";

export default function Rules(props) {
  const { setRules } = props;

  return (
    <div>
      <div id="rules-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            setRules(false);
          }}
        >
          Back To Game{" "}
        </button>
        <h1>Hi</h1>
      </div>
    </div>
  );
}
