import React, { createContext, useState, useContext, useEffect } from "react";
const AuthenticaionContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  const login = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setAuth({ token: data.accessToken, user: data.user });
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const loadFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const value = {
    auth,
    login,
  };

  return (
    <AuthenticaionContext.Provider value={value}>
      {children}
    </AuthenticaionContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticaionContext);
