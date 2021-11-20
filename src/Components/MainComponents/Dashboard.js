import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, randomGamePhrase } from "../Firebase/firebase";
import Setting from "../SecondaryComponents/Setting/Setting";
import settingIcon from "../Logos/settings-icon.png";
import Keyboard from "../SecondaryComponents/Keyboard/Keyboard";
import Bank from "../SecondaryComponents/Bank";
import SpinWheel from "../Three.js/SpinWheel";
import GameBoard from "./GameBoard";
import Solve from "../Pages/Solve";
import Rules from "../Pages/Rules";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [setting, setSetting] = useState(true);
  const [spin, setSpin] = useState(true);
  const [solvePage, setSolvePage] = useState(false);
  const [rule, setRules] = useState(false);
  const [spinBtn, setspinBtn] = useState(true);
  const [name, setName] = useState("");
  const [solveValue, setsolveValue] = useState("");
  const [message, setmessage] = useState("");
  const [visableArr, setVisableArr] = useState([]);
  const [splitWord, setsplitWord] = useState([]);
  const [bank, setbank] = useState(0);
  const [spinDeg, setSpinDeg] = useState(0);
  const [spinAmount, setspinAmount] = useState(0);
  const [vowelCost, setVowelCost] = useState(-250);
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

  const values = [
    900, 800, 500, 650, 500, 900, -1, 5000, 500, 600, 700, 600, 650, 500, 700,
    500, 600, 550, 500, 600, -1, 650, 500, 700,
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

  const resetGame = useCallback(() => {
    getRandomPhrase();
    setVisableArr([]);
    setbank(0);
    setSpin(true);
    setmessage("");
    setSolvePage(false);
    setClick({
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
  }, []);

  // ==========================================================================================
  const getRandomPhrase = async () => {
    const newWord = await randomGamePhrase();
    setgameObject(newWord);
    setsplitWord(newWord.word.split(""));
  };

  let InvolvedLetters = splitWord.reduce((a, e) => {
    a[e] = a[e] ? a[e] + 1 : 1;
    return a;
  }, {});

  // =============================================================================================
  // Solve Functions
  const switchScreen = () => {
    setSolvePage(!solvePage);
    if (solvePage === true) {
      setSpin(true);
    }
  };
  const solveFn = (e) => {
    setsolveValue(e.target.value);
  };

  const rightOrWrongSolve = (e) => {
    e.preventDefault();
    if (solveValue.length <= 0) {
      setmessage("No Value Entered");
      setTimeout(() => {
        setmessage("");
        setSolvePage(false);
        setSpin(true);
      }, 1500);
    } else {
      let noPunc = solveValue.match(/[a-zA-Z ]/g).join("");
      console.log(noPunc);
      let check = noPunc.toLowerCase();
      console.log(check, "1");
      check = check.replace(/\s{2,}/g, " ");
      console.log(check, "2");
      let phrase = gameObject.word;
      let finalPhrase = phrase.match(/[a-zA-Z ]/g).join("");

      finalPhrase = finalPhrase.toLowerCase();
      console.log(finalPhrase, "final");
      if (solveValue === null || check !== finalPhrase) {
        setmessage("Time to spin again");
        setTimeout(() => {
          setSolvePage(false);
          setSpin(true);
          setmessage("");
        }, 1500);
      } else {
        setbank(bank + 2000);
        setmessage("Correct");
        setTimeout(() => {
          resetGame();
        }, 2500);
      }
    }
  };

  let aword = [...splitWord].join("");
  let beforeCheckKey = aword.replace(/['?!-]/g, "");
  let checkKey = [...new Set(beforeCheckKey)].sort().join("");
  checkKey = checkKey.replace(" ", "");
  let checkValue = "placeholder";
  checkValue = [...visableArr].sort().join("");

  useEffect(() => {
    if (checkKey.length > 0) {
      if (checkKey === checkValue) {
        setmessage("Phrase Done");
        setTimeout(() => {
          resetGame();
        }, 1500);
      }
    }
  }, [checkKey, checkValue, resetGame]);

  const guessValue = async (e) => {
    let newGuess = e.target.value;
    let vowels = /[AEIOU]/g;
    let consonant = /[BCDFGHJKLMNPQRSTVWXYZ]/g;
    let letterQuantity = InvolvedLetters[newGuess];

    if (splitWord.includes(newGuess)) {
      if (!visableArr.includes(newGuess)) {
        if (newGuess.match(vowels) && bank >= 250) {
          await setVisableArr([...visableArr, newGuess]);
          setbank(bank + vowelCost);
          if (letterQuantity === 1) {
            setmessage(`${letterQuantity} ${" "} ${newGuess}  Revealed`);
          } else {
            setmessage(`${letterQuantity} ${" "} ${newGuess}'s  Revealed`);
          }
          setTimeout(() => {
            setmessage("");
          }, 1000);
        } else if (newGuess.match(consonant)) {
          await setVisableArr([...visableArr, newGuess]);
          let bankSetAmount = spinAmount * letterQuantity;
          setbank(bank + bankSetAmount);
          if (letterQuantity === 1) {
            setmessage(`${letterQuantity} ${" "} ${newGuess}  Revealed`);
          } else {
            setmessage(`${letterQuantity} ${" "} ${newGuess}'s  Revealed`);
          }
          setTimeout(() => {
            setmessage("");
          }, 1000);
        } else {
          setmessage("Not Enough To Buy A Vowel");
          setClick({ ...click, newGuess: false });
          setTimeout(() => {
            setmessage("");
            setSpinDeg(0);
            setSpin(true);
          }, 1000);
        }
      } else {
        setmessage("Already Chosen");
        setTimeout(() => {
          setmessage("");
          setspinAmount(0);
          setSpin(true);
        }, 1000);
      }
    } else {
      if (newGuess.match(vowels) && bank >= 250) {
        setmessage("Vowel Not Included");
        setbank(bank + vowelCost);
        setTimeout(() => {
          setmessage("");
          setspinAmount(0);
          setSpin(true);
        }, 1000);
      } else if (newGuess.match(vowels) && bank < 250) {
        setmessage("Not Enough To Buy A Vowel");
        setClick({ ...click, newGuess: false });
        setTimeout(() => {
          setmessage("");
          setSpinDeg(0);
          setSpin(true);
        }, 1000);
      } else {
        setmessage("Letter Not Included");
        setTimeout(() => {
          setmessage("");
          setspinAmount(0);
          setSpin(true);
        }, 1000);
      }
    }
  };

  // ====================================================================================
  // Spin Function
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
        setspinBtn(true);
        setbank(0);
        setSpinDeg(0);
      }, 7500);
    } else if (spinIndex === 22) {
      setTimeout(() => {
        setspinBtn(true);
        setSpin(false);
        setSpinDeg(0);
        setVowelCost(0);
      }, 7500);
    } else {
      setTimeout(() => {
        setspinBtn(true);
        setVowelCost(-250);
        setSpin(false);
        setSpinDeg(0);
      }, 7500);
    }
  };
  // =============================================================================================
  return (
    <>
      {rule ? <Rules setRules={setRules} /> : null}
      <div className="header flex">
        <div id="spacer"></div>
        <div id="title">
          <h1>WHEEL OF FoRTUNE</h1>
        </div>
        <div id="setting-div">
          {setting ? (
            <button
              id="setting-icon"
              onClick={() => {
                setSetting(!setting);
              }}
            >
              <img id="settingIcon-img" src={settingIcon} alt="" />
            </button>
          ) : (
            <Setting setSetting={setSetting} setRules={setRules} rule={rule} />
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
      <div id="spin-spacer"></div>
      {solvePage ? null : (
        <>
          {spin ? (
            <div id="messageHolder"></div>
          ) : (
            <div id="message">{message}</div>
          )}
        </>
      )}

      {rule ? null : (
        <>
          {spin ? (
            <div id="spinwheel-container">
              <SpinWheel spinDeg={spinDeg} />
              <div id="right-div-spin">
                {spinBtn ? (
                  <button
                    className="spinBtn green"
                    onClick={(e) => {
                      e.preventDefault();
                      getSpinDeg();
                      setTimeout(() => {
                        setspinBtn(false);
                      }, 500);
                    }}
                  >
                    Spin Wheel
                  </button>
                ) : null}
                <Bank name={name} bank={bank} />
              </div>
            </div>
          ) : (
            <>
              <div id="keyboard-container">
                <Keyboard
                  guessValue={guessValue}
                  click={click}
                  setClick={setClick}
                />
                <div id="solveBtn-div">
                  {solvePage ? (
                    <div>
                      <Solve
                        switchScreen={switchScreen}
                        solveFn={solveFn}
                        rightOrWrongSolve={rightOrWrongSolve}
                        message={message}
                        name={name}
                        bank={bank}
                      />
                    </div>
                  ) : (
                    <button
                      className="keysBtn"
                      id="solveBtn-keyboard"
                      onClick={(e) => {
                        e.preventDefault();
                        setSolvePage(true);
                      }}
                    >
                      SoLVE THE PHRASE
                    </button>
                  )}
                </div>
              </div>
              {solvePage ? null : (
                <div id="keyboard-solve-bank">
                  <Bank name={name} bank={bank} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
export default Dashboard;
