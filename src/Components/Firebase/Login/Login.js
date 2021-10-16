import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login(props) {
  const { setregister, setreset } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/wheeloffortune");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <button
            onClick={(e) => {
              setreset(true);
            }}
          >
            Forgot Password
          </button>
        </div>
        <div>Don't have an account?</div>
        <button
          onClick={(e) => {
            setregister(true);
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
export default Login;
