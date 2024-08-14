import React, { useState } from "react";
import "../styles/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle form submission logic here
    console.log("Sign In:", { email, password });
  };

  const handleGmailConnect = () => {
    // Handle Facebook connect logic here
    console.log("Connect with Gmail");
  };

  return (
    <div className="cont">
      <form className="form sign-in" onSubmit={handleSubmit}>
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
        <button type="submit" className="submit">
          Sign In
        </button>
        <button type="button" className="fb-btn" onClick={handleGmailConnect}>
          Connect with <span>Gmail</span>
        </button>
        <button className="sign-up">Sign Up</button>
      </form>

      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h1 className="new-here">New here?</h1>
            <h2>Sign up now!</h2>
            <button className="sign-up-btn">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
