import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, randomGamePhrase } from "../Firebase/firebase";
import Setting from "../Setting/Setting";
import settingIcon from "../Logos/settings-icon.png";
import Keyboard from "../Keyboard/Keyboard";
import Bank from "../Bank/Bank";
import SpinWheel from "../SpinWheel/SpinWheel";
import GameBoard from "../GameBoard/GameBoard";
import Solve from "../Solve/Solve";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [setting, setSetting] = useState(true);
  const [spin, setSpin] = useState(true);
  const [solve, setSolve] = useState(false);
  const [name, setName] = useState("");
  const [visableArr, setVisableArr] = useState([]);
  const [gameObject, setgameObject] = useState({});
  const [splitWord, setsplitWord] = useState([]);
  const [solveValue, setsolveValue] = useState("");
  const [bank, setbank] = useState(0);
  const [spinDeg, setSpinDeg] = useState(0);
  const [spinAmount, setspinAmount] = useState(0);

  const values = [
    -1, 800, 500, 650, 500, 900, 0, 5000, 500, 600, 700, 600, 650, 500, 700,
    500, 600, 550, 500, 600, 0, 650, 1, 700,
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
    // Gets random word from db and resets game
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const resetGame = () => {
    getRandomPhrase();
    setVisableArr([]);
    setbank(0);
  };
  // ==========================================================================================
  // this function runs randomGamePhrase a prop thats from firebase.js

  const getRandomPhrase = async () => {
    const newWord = await randomGamePhrase();
    setgameObject(newWord);
    setsplitWord(newWord.word.split(""));
  };

  // Counts each letter in the gameWord
  let InvolvedLetters = splitWord.reduce((a, e) => {
    a[e] = a[e] ? a[e] + 1 : 1;
    return a;
  }, {});

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
    let noPunc = solveValue.match(/[a-zA-Z ]/g).join("");
    let check = noPunc.toLowerCase();
    check = check.replace(/\s{2,}/g, " ");
    let finalPhrase = gameObject.word;
    finalPhrase = finalPhrase.toLowerCase();

    if (solveValue.length === 0 || check !== finalPhrase) {
      alert("Time to spin again");
      setSolve(false);
      setSpin(true);
    } else {
      setbank(bank + 2000);
      setSpin(true);
      alert("Correct");
    }
  };

  let punc = "'" || "-";
  let beforeCheckKey = [...splitWord].join("").replace(punc, "");
  let checkKey = [...new Set(beforeCheckKey)].sort().join("");
  checkKey = checkKey.replace(" ", "");
  let checkValue = "placeholder";
  checkValue = [...visableArr].sort().join("");

  useEffect(() => {
    if (checkKey === checkValue) {
      alert("Phrase Done");
    } else {
      return;
    }
  }, [checkKey, checkValue]);

  // function to get key value
  const guessValue = async (e) => {
    // e.preventDefault();
    let newGuess = e.target.value;
    let vowels = /[AEIOU]/g;
    let consonant = /[BCDFGHJKLMNPQRSTVWXYZ]/g;
    let letterQuantity = InvolvedLetters[newGuess];

    if (splitWord.includes(newGuess)) {
      if (!visableArr.includes(newGuess)) {
        if (newGuess.match(vowels) && bank >= 250) {
          await setVisableArr([...visableArr, newGuess]);
          let bankSetAmount = -250;
          await setbank(bank + bankSetAmount);
          alert("Letter Revealed");
        } else if (newGuess.match(consonant)) {
          await setVisableArr([...visableArr, newGuess]);
          let bankSetAmount = spinAmount * letterQuantity;
          await setbank(bank + bankSetAmount);
          alert("Letter Revealed");
        } else {
          alert("Not Enough To Buy A Vowel");
        }
      } else {
        alert("Already Chosen");
      }
    } else {
      alert("Letter Not Included");
    }
  };
  const getSpinDeg = () => {
    let spinDeg = Math.floor(Math.random() * 360 + 3600);
    let actual = Math.floor((spinDeg / 180) * Math.PI);
    setSpinDeg(actual);
    let spinIndex = Math.floor((spinDeg - 3600) / 15);
    setspinAmount(values[spinIndex]);
    console.log(values[spinIndex]);
  };
  // =============================================================================================

  return (
    <div>
      <div className="header">
        <div id="title-container">
          <h1 id="title">WHEEL OF FoRTUNE</h1>
        </div>
        {setting ? (
          <button
            id="setting-icon"
            onClick={(e) => {
              e.preventDefault();
              setSetting(false);
            }}
          >
            <img id="settingIcon-img" src={settingIcon} alt="" />
          </button>
        ) : (
          <Setting setSetting={setSetting} />
        )}
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
          <SpinWheel spinDeg={spinDeg} />
          <button
            onClick={(e) => {
              e.preventDefault();
              getSpinDeg();
            }}
          >
            Spin Wheel
          </button>

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
              id="solveBtn-keyboard"
              onClick={(e) => {
                e.preventDefault();
                setSolve(true);
              }}
            >
              SoLVE THE PHRASE
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
      <Bank name={name} bank={bank} />
    </div>
  );
}
export default Dashboard;
