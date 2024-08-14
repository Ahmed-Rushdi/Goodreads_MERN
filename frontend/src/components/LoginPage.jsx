import React, { useState } from "react";
import "../styles/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Store the tokens in localStorage or cookies if needed
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        window.location.href = "/";
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(" error occured why logging in :", error);
    }
  };

  const handleGmailConnect = () => {
    // Handle Gmail connect logic here
    console.log("Connect with Gmail");
  };

  return (
    <div className="cont-1">
      <form className="form-1 sign-in" onSubmit={handleSubmit}>
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
        <button type="button" className="fb-btn-1" onClick={handleGmailConnect}>
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
    </div>
  );
};

export default LoginPage;
