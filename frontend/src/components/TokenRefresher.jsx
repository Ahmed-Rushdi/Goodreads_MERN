import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TokenRefresher = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await axios.get("http://localhost:3000/api/refresh", {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Failed to refresh token", error);
        // Redirect to login if token refresh fails
        navigate("/login");
      }
    };

    // Refresh the token every 4.5 minutes
    const intervalId = setInterval(refreshAccessToken, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return <>{children}</>;
};

export default TokenRefresher;
