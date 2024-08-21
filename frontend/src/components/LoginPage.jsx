import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import ProvideData from "./ProvideData";

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
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsLoggedIn(true);
        navigate("/test");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="cont-1">
      <form className="form-1 sign-in" onSubmit={handleLogin}>
        <h2>Welcome back,</h2>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <a className="forgot-pass" href="#">
          Forgot password?
        </a>
        <button type="submit" className="submit-1">
          Sign In
        </button>
        <button type="button" className="fb-btn-1">
          Connect with <span>Gmail</span>
        </button>
        <button className="sign-up-1">Sign Up</button>
      </form>
      <div className="sub-cont">
        <div className="img-1">
          <div className="img__text m--up">
            <h1 className="new-here">New here?</h1>
            <h2>Sign up now!</h2>
            <button className="sign-up-btn-1">Sign Up</button>
          </div>
        </div>
      </div>
      {userName && <p>Welcome, {userName}!</p>} {/* Display user's name */}
      {error && <p>{error}</p>} {/* Display any error */}
    </div>
  );
};

export default LoginPage;
