import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db } from "../Firebase/firebase";
import Setting from "../Setting/Setting";
import settingIcon from "../Logos/settings-icon.png";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [setting, setSetting] = useState(true);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div>
      <h1>Wheel of Fortune</h1>
      <div>{name}</div>

      {setting ? (
        <button
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
  );
}
export default Dashboard;
