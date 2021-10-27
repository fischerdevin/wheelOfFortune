import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, sendPasswordResetEmail } from "../firebase";
import "./Reset.css";

function Reset(props) {
  const { setreset, setregister } = props;
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/wheeloffortune");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className="reset">
      <div className="login__container">
        <div className="conatiner-login">
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <button
            className="reset__btn"
            onClick={() => sendPasswordResetEmail(email)}
          >
            Send password reset email
          </button>
          <div>Don't have an account?</div>
          <button
            onClick={(e) => {
              setreset(false);
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

export default Reset;
