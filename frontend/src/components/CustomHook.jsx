import React, { useEffect, useState } from "react";

const CustomHook = () => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let firstRender = true;
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
  }, []);

  return <div>{user && <h1>{user.name}</h1>}</div>;
};

export default CustomHook;
