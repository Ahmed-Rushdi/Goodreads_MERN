import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "./UserContext";
import axios from "axios";
axios.defaults.withCredentials = true;
const Test = () => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log("err"));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div>
      {/* Your Navbar content */}
      {user && <h1>{user.name}</h1>}
    </div>
  );
};

export default Test;
