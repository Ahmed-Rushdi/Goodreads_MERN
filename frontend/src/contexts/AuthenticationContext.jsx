import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      setUser(response.data.user);
      setIsLoggedIn(true);
      setError(null);
      navigate("/test");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password");
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/logout", {
        email: user.email,
      });
      setUser(null);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err.message);
    }
  };

  const value = {
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
