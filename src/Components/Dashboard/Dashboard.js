import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../Firebase/firebase";
import Setting from "../Setting/Setting";
import settingIcon from "../Logos/settings-icon.png";
import Keyboard from "../Keyboard/Keyboard";
import Bank from "../Bank/Bank";
import SpinWheel from "../SpinWheel/SpinWheel";
import GameBoard from "../GameBoard/GameBoard";
import Solve from "../Solve/Solve";
import { randomGamePhrase } from "../Firebase/firebase";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [visableArr, setVisableArr] = useState([]);
  const [gameObject, setgameObject] = useState({});
  const [splitWord, setsplitWord] = useState([]);
  const [setting, setSetting] = useState(true);
  const [spin, setSpin] = useState(true);
  const [solve, setSolve] = useState(false);
  const [solveValue, setsolveValue] = useState("");

  const values = [
    "lose",
    800,
    500,
    650,
    500,
    900,
    0,
    5000,
    500,
    600,
    700,
    600,
    650,
    500,
    700,
    500,
    600,
    550,
    500,
    600,
    0,
    650,
    "free",
    700,
  ];

  const history = useHistory();
  // Firebase auth login
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
    // Gets random word from db
    getRandomPhrase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  // ==========================================================================================
  // this function runs randomGamePhrase a prop thats from firebase.js

  const getRandomPhrase = async () => {
    const newWord = await randomGamePhrase();
    setgameObject(newWord);
    setsplitWord(newWord.word.split(""));
  };

  // =============================================================================================
  // solve screen function
  const switchScreen = (e) => {
    e.preventDefault();
    setSolve(false);
  };

  const solveFn = (e) => {
    e.preventDefault();
    setsolveValue(e.target.value);
  };

  const rightOrWrongSolve = (e) => {
    e.preventDefault();
    let sv = solveValue;
    let noPunc = sv.match(/[a-zA-Z ]/g).join("");
    let check = noPunc.toLowerCase();
    check = check.replace(/\s{2,}/g, " ");
    let finalPhrase = gameObject.word;
    finalPhrase = finalPhrase.toLowerCase();

    if (check === finalPhrase) {
      alert("nice coc matt");
    } else {
      alert("dumbass");
      setSolve(false);
      setSpin(true);
    }
  };

  // setGuess([...guess, newGuess]);
  // function to get key value
  const guessValue = (e) => {
    e.preventDefault();
    let newGuess = e.target.value;
    if (splitWord.includes(newGuess)) {
      setVisableArr([...visableArr, newGuess]);
      console.log("guess  included");
    } else {
      console.log("guess not included");
      // setSpin(true);
    }
  };

  // =============================================================================================

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
        <GameBoard
          gameObject={gameObject}
          splitWord={splitWord}
          visableArr={visableArr}
        />
      </div>

      {spin ? (
        <div id="spinwheel-container">
          <SpinWheel values={values} />
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

          {solve ? (
            <div>
              <Solve
                switchScreen={switchScreen}
                solveFn={solveFn}
                rightOrWrongSolve={rightOrWrongSolve}
              />
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSolve(true);
              }}
            >
              Solve
            </button>
          )}

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
