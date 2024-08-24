import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/AxiosInstance";

const useProvideData = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { user, isLoggedIn, setIsLoggedIn, isLoading, error };
};

export default useProvideData;
