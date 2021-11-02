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
import Rules from "../Rules/Rules";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [setting, setSetting] = useState(true);
  const [spin, setSpin] = useState(true);
  const [solve, setSolve] = useState(false);
  const [name, setName] = useState("");
  const [solveValue, setsolveValue] = useState("");
  const [visableArr, setVisableArr] = useState([]);
  const [splitWord, setsplitWord] = useState([]);
  const [bank, setbank] = useState(0);
  const [spinDeg, setSpinDeg] = useState(0);
  const [spinAmount, setspinAmount] = useState(0);
  const [gameObject, setgameObject] = useState({});
  const [click, setClick] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    H: true,
    I: true,
    J: true,
    K: true,
    L: true,
    M: true,
    N: true,
    O: true,
    P: true,
    Q: true,
    R: true,
    S: true,
    T: true,
    U: true,
    V: true,
    W: true,
    X: true,
    Y: true,
    Z: true,
  });
  const [rule, setRules] = useState(false);

  const values = [
    900, 800, 500, 650, 500, 900, -1, 5000, 500, 600, 700, 600, 650, 500, 700,
    500, 600, 550, 500, 600, -1, 650, 1, 700,
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
      alert("Correct");
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };

  let punc = "'" || "-";
  let beforeCheckKey = [...splitWord].join("").replace(punc, "");
  let checkKey = [...new Set(beforeCheckKey)].sort().join("");
  checkKey = checkKey.replace(" ", "");
  let checkValue = "placeholder";
  checkValue = [...visableArr].sort().join("");

  useEffect(() => {
    if (checkKey.length > 0) {
      if (checkKey === checkValue) {
        alert("Phrase Done");
      }
    }
  }, [checkKey, checkValue]);

  // function to get key value
  const guessValue = async (e) => {
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
          setClick({ ...click, newGuess: false });
          setTimeout(() => {
            setSpinDeg(0);
            setSpin(true);
          }, 1000);
        }
      } else {
        alert("Already Chosen");
        setTimeout(() => {
          setspinAmount(0);
          setSpin(true);
        }, 1000);
      }
    } else {
      if (newGuess.match(vowels) && bank >= 250) {
        alert("Vowel Not Included");
        setbank(bank - 250);
        setTimeout(() => {
          setspinAmount(0);
          setSpin(true);
        }, 1000);
      } else {
        alert("Letter Not Included");
        setTimeout(() => {
          setspinAmount(0);
          setSpin(true);
        }, 1000);
      }
    }
  };
  let fifthteen = [
    7.5, 22.5, 37.5, 52.5, 67.5, 82.5, 97.5, 112.5, 127.5, 142.5, 157.5, 172.5,
    187.5, 202.5, 217.5, 232.5, 247.5, 262.5, 277.5, 292.5, 307.5, 322.5, 337.5,
    352.5,
  ];
  const getSpinDeg = () => {
    let spinDeg = fifthteen[Math.floor(Math.random() * fifthteen.length)] + 720;
    let actual = (spinDeg / 180) * Math.PI;
    let spinIndex = Math.floor((spinDeg - 720) / 15);
    setSpinDeg(actual);
    setspinAmount(values[spinIndex]);

    if (spinIndex === 6 || spinIndex === 20) {
      setTimeout(() => {
        setbank(0);
        setSpinDeg(0);
      }, 10000);
    } else {
      setTimeout(() => {
        setSpin(false);
        setSpinDeg(0);
      }, 10000);
    }
  };
  // =============================================================================================

  return (
    <div className="page">
      {!rule ? null : <Rules setRules={setRules} />}
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
          <Setting setSetting={setSetting} setRules={setRules} rule={rule} />
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
            id="spinBtn"
            onClick={(e) => {
              e.preventDefault();
              getSpinDeg();
            }}
          >
            Spin Wheel
          </button>
        </div>
      ) : (
        <div id="keyboard-container">
          <Keyboard guessValue={guessValue} click={click} setClick={setClick} />
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
        </div>
      )}
      {rule ? null : <Bank name={name} bank={bank} />}
    </div>
  );
}
export default Dashboard;
