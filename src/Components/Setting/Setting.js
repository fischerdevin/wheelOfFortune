import React, { useState } from "react";
import { logout } from "../Firebase/firebase";
import Rules from "./Rules/Rules";

export default function Setting(props) {
  const { setSetting } = props;
  const [rule, setRules] = useState(false);

  return (
    <div className="setting-page">
      <div className="column settingStyle">
        <h1>Settings</h1>

        <button onClick={logout} id="logoutBtn">
          Logout
        </button>
        {rule ? (
          <button
            id="logoutBtn"
            onClick={(e) => {
              e.preventDefault();
              setRules(true);
            }}
          >
            Rules{" "}
          </button>
        ) : (
          <Rules setRules={setRules} rule={rule} />
        )}
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
