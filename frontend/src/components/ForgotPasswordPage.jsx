import React, { useState } from "react";
import "../styles/forgotpassword.css";
import { FcKey } from "react-icons/fc";
import icon from "../assets/icons8-forgot-password-96.png";

const ForgotPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle input changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validate();
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validate();
  };

  // Function to validate
  const validate = () => {
    let validationMessage = "";
    if (password.length < 6) {
      validationMessage = "Password must be at least 6 characters long";
    } else if (password !== confirmPassword) {
      validationMessage = "Passwords do not match";
    } else {
      validationMessage = "";
    }

    setMessage(validationMessage);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="form-2"
      onSubmit={handleSubmit}
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <center>
        <img src={icon} alt="icon" />
      </center>

      <center>
        <h2>
          <span className="fa-passwd-reset fa-stack"></span>
          Reset your Password
          <span className="fa-passwd-reset fa-stack"></span>
        </h2>
      </center>

      <div className="input-container">
        <i className="fa FaKey icon">
          <FcKey />
        </i>
        <input
          className="input-field"
          type="password"
          placeholder="Type your new password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <span id="pwd-length-1"></span>

      <div className="input-container">
        <i className="fa FaKey icon">
          <FcKey />
        </i>
        <input
          className="input-field"
          type="password"
          placeholder="Re-type your new password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      <span id="pwd-length-2"></span>

      <span id="message">{message}</span>
      <button className="btn-2" type="submit">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
