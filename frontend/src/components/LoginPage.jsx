import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import ProvideData from "./ProvideData";
import { GoogleLogin } from "@react-oauth/google";
import { axiosInstance } from "../utils/AxiosInstance";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = ProvideData();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      console.log(response.data);
      setIsLoggedIn(true);
      navigate("/test");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || "Invalid email or password");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };
  //handle google auth

  return (
    <div className="cont-1">
      <form className="form-1 sign-in" onSubmit={handleLogin}>
        <h2>Welcome back,</h2>
        <label className="login-label">
          <span className="login-span">Email</span>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="login-label">
          <span className="login-span">Password</span>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link className="forgot-pass" to="/secretQuestion">
          Forgot password?
        </Link>
        <button type="submit" className="login-button submit-1">
          Sign In
        </button>
        <div className="google-login">
          {/* <GoogleLogin
            // onSuccess={handleGoogleAuth}
            onError={() => setError("Google login failed.")}
          /> */}
        </div>
        <button className="login-button sign-up-1">Sign Up</button>
      </form>
      <div className="sub-cont">
        <div className="img-1">
          <div className="img__text m--up">
            <h1 className="new-here">New here?</h1>
            <h2>Sign up now!</h2>
            <button className="login-button sign-up-btn-1">Sign Up</button>
          </div>
        </div>
      </div>
      {userName && <p>Welcome, {userName}!</p>} {/* Display user's name */}
      {error && <p>{error}</p>} {/* Display any error */}
    </div>
  );
};

export default LoginPage;
