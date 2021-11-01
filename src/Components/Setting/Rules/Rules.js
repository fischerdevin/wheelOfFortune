import React from "react";

export default function Rules() {
  const { rules, setRules } = props;

  return (
    <div id="rules">
      <h1>Hi</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          setRules(false);
        }}
      ></button>
    </div>
  );
}
