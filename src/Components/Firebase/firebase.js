import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBt58OULQzlxBGg6XEtNHNpVkVVdzgzLUo",
  authDomain: "capstone-wof.firebaseapp.com",
  projectId: "capstone-wof",
  storageBucket: "capstone-wof.appspot.com",
  messagingSenderId: "67875037461",
  appId: "1:67875037461:web:cc4a7f88482226e789c91c",
  measurementId: "G-M9G1L3P5LL",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        scores: [],
        completedWords: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// ==================================================================================================
// Use for adding words to db

// const len = words.wordArr.length;

// const addwords = async () => {
//   for (let i = 0; i < len; i++) {
//     try {
//       await db.collection("words").doc(words.wordArr[i].gamePhrase).set({
//         word: words.wordArr[i].gamePhrase,
//         type: words.wordArr[i].type,
//         id: i,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// };
// ==================================================================================================

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      scores: [],
      completedWords: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

const randomGamePhrase = async () => {
  try {
    const id = Math.floor(Math.random() * 89);
    let foundWord;
    const query = await db.collection("words").where("id", "==", id).get();

    query.forEach((doc) => {
      foundWord = doc.data();
    });
    return foundWord;
  } catch (err) {
    console.error(err);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  provider,
  storage,
  randomGamePhrase,
};
