import React from "react";
import { logout } from "../Firebase/firebase";

export default function Setting(props) {
  const { setSetting } = props;
  return (
    <div>
      <h1>Settings</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          setSetting(true);
        }}
      >
        {" "}
        Back
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
