// useUserData.js
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const ProvideData = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Use the custom useFetch hook to fetch user data
  const {
    data: user,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/user", {
    credentials: "include",
  });

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return { user, isLoggedIn, setIsLoggedIn, isLoading, error };
};

export default ProvideData;
