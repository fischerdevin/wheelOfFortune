import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
// import "./Dashboard.css";
// import "../Keyboard/Keyboard.css";
// import "../SpinWheel/SpinWheel.css";
import { auth, db } from "../Firebase/firebase";
import Setting from "../Setting/Setting";
import settingIcon from "../Logos/settings-icon.png";
import Keyboard from "../Keyboard/Keyboard";
import Bank from "../Bank/Bank";
import SpinWheel from "../SpinWheel/SpinWheel";
import GameBoard from "../GameBoard/GameBoard";
import { randomGamePhrase } from "../Firebase/firebase";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [guess, setGuess] = useState([]);
  const [gameWord, setgameWord] = useState({});

  const [setting, setSetting] = useState(true);
  const [spin, setSpin] = useState(true);

  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName();
    getRandomPhrase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const getRandomPhrase = async () => {
    const newWord = await randomGamePhrase();
    setgameWord(newWord);
  };

  function guessValue(e) {
    e.preventDefault();
    let newGuess = e.target.value;
    setGuess([...guess, newGuess]);
    console.log(newGuess);
  }

  return (
    <div>
      <div className="header">
        <div id="title">
          <h1>Wheel of Fortune</h1>
        </div>

        <div id="setting-area">
          {setting ? (
            <button
              id="setting-icon"
              onClick={(e) => {
                e.preventDefault();
                setSetting(false);
              }}
            >
              <img src={settingIcon} alt="" style={{ width: "25px" }} />
            </button>
          ) : (
            <Setting setSetting={setSetting} />
          )}
        </div>
      </div>
      <div className="gameboard-container">
        <GameBoard gameWord={gameWord} />
      </div>

      {spin ? (
        <div id="spinwheel-container">
          <SpinWheel />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSpin(false);
            }}
          >
            Switch
          </button>
        </div>
      ) : (
        <div id="keyboard-container">
          <Keyboard guessValue={guessValue} />
          <button
            onClick={(e) => {
              e.preventDefault();
              setSpin(true);
            }}
          >
            Switch
          </button>
        </div>
      )}

      <div id="footer">
        <Bank name={name} />
      </div>
    </div>
  );
}
export default Dashboard;
