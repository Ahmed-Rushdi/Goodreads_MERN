import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";
import queryString from 'query-string';

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
  
  const stringifiedParams = queryString.stringify({
  
    client_id: "110004070634-funr4b1knduc5l2pekfg0et7a748udcv.apps.googleusercontent.com",
    redirect_uri: 'localhost:5173/auth/google',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;


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
          <a href={googleLoginUrl}>Login With Google</a>
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
