import React, { useState } from "react";
import Login from "../Firebase/Login/Login";
import Register from "../Firebase/Register/Register";
import Reset from "../Firebase/Reset/Reset";

export default function LandingPage() {
  const [login, setlogin] = useState(false);
  const [register, setregister] = useState(false);
  const [reset, setreset] = useState(false);

  return (
    <div id="homepage">
      <h1>Wheel of Fortune</h1>

      {login ? (
        register ? (
          <Register setregister={setregister} />
        ) : reset ? (
          <Reset setreset={setreset} setregister={setregister} />
        ) : (
          <Login setreset={setreset} setregister={setregister} />
        )
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setlogin(true);
          }}
        >
          Start Game
        </button>
      )}
    </div>
  );
}
