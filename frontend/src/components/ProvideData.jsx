import React, { createContext, useState, useEffect } from "react";

import { UserContext } from "./UserContext";

const ProvideData = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${"token"}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default ProvideData;
