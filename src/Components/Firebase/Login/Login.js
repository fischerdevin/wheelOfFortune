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
    <div className="style">
      <div className="container">
        <div className="login-conatiner">
          <input
            className="login-textBox login-margin "
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            className="login-textBox login-margin "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="loginBtn-style login-margin "
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button
            className="loginBtn-style login-margin "
            onClick={signInWithGoogle}
          >
            Login with {""}
            <span style={{ color: "#3f83ee" }}>G</span>
            <span style={{ color: "#e54233" }}>o</span>
            <span style={{ color: "#fabe06" }}>o</span>
            <span style={{ color: "#3f83ee" }}>G</span>
            <span style={{ color: "#32a351" }}>L</span>
            <span style={{ color: "#e54233" }}>E</span>
          </button>
          <div>
            <button
              className="loginBtn-size  login-margin"
              onClick={(e) => {
                setreset(true);
              }}
            >
              Forgot Password
            </button>
          </div>
          <div id="dhaA">Don't have an account?</div>
          <button
            className="loginBtn-size login-margin"
            onClick={(e) => {
              setregister(true);
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
