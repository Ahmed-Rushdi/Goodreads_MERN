import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading, error, login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  //handle google auth

  const handleGoogleLogin = async (tokenId) => {
    try {
      const response = await fetch('/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId }),
      });
  
      const data = await response.json();
      console.log(data)
      // Handle response (e.g., store tokens, redirect, etc.)
    } catch (error) {
      console.error("Error during Google login", error);
    }
  };

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
          <button
           className="login-button submit-1"
            onClick={handleGoogleLogin }
          >Login With gmail</button>
        </div>
        <button className="login-button sign-up-1" onClick={() => navigate("/register")}>Sign Up</button>
      </form>
      <div className="sub-cont">
        <div className="img-1">
          <div className="img__text m--up">
            <h1 className="new-here">New here?</h1>
            <h2>Sign up now!</h2>
            <button
              className="login-button sign-up-btn-1"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {userName && <p>Welcome, {userName}!</p>} {/* Display user's name */}
      {error && <p>{error}</p>} {/* Display any error */}
    </div>
  );
};

export default LoginPage;
