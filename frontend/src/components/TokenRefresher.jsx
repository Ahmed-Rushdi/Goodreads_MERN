import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { axiosInstance } from "../utils/AxiosInstance";

const TokenRefresher = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (!Cookies.get("tokenExists")) return;

      try {
        await axiosInstance.get("/api/refresh");
      } catch (error) {
        console.error("Failed to refresh token", error);
        Cookies.remove("tokenExists");
        // Redirect to login if token refresh fails
        navigate("/login");
      }
    };

    refreshAccessToken();

    // Refresh the token every 30 seconds
    const intervalId = setInterval(refreshAccessToken, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return <>{children}</>;
};

export default TokenRefresher;
