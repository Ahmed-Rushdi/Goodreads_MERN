import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// call this hook

const useJwtHook = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // get the jwt from cookies and store in in token state

    const jwtToken = Cookies.get("jwt");
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, []);

  // jwt saved in the getAuthHeader so it verifies the user identity and return whatever u want
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return { token, getAuthHeader };
};

export default useJwtHook;
