import React from "react";
import { logout } from "../Firebase/firebase";

export default function Setting(props) {
  const { setSetting } = props;
  return (
    <div className="setting-page">
      <div className="column settingStyle">
        <h1>Settings</h1>
        <button onClick={logout} id="logoutBtn">
          Logout
        </button>
        <button
          id="backBtn"
          onClick={(e) => {
            e.preventDefault();
            setSetting(true);
          }}
        >
          {" "}
          Back to Game
        </button>
      </div>
    </div>
  );
}
