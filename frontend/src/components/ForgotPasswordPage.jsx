import React, { useState } from "react";
import "../styles/forgotpassword.css";
import { FcKey } from "react-icons/fc";
import icon from "../assets/icons8-forgot-password-96.png";
import postData from "../utils/DataPosting";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validate(value, name);
  };

  const validate = (value, name) => {
    let validationMessage = "";

    if (name === "password" && value.length < 6) {
      validationMessage = "Password must be at least 6 characters long";
    } else if (name === "confirmPassword" && value !== formData.password) {
      validationMessage = "Passwords do not match";
    } else if (name === "password" && value !== formData.confirmPassword) {
      validationMessage = "Passwords do not match";
    } else {
      validationMessage = "";
    }

    setMessage(validationMessage);
  };

  const handleChangePassword = async () => {
    if (!message) {
      const { resData, error } = await postData("/api/reset-password", {
        email: formData.email,
        newPassword: formData.password,
      });

      if (error) {
        console.error("Password reset failed:", error.message);
        setMessage("Password reset failed. Please try again.");
        return;
      }

      if (resData) {
        console.log("Password reset successful:", resData);
        setMessage("Password has been reset successfully!");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword();
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
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-container">
        <i className="fa FaKey icon">
          <FcKey />
        </i>
        <input
          className="input-field"
          type="password"
          placeholder="Type your new password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-container">
        <i className="fa FaKey icon">
          <FcKey />
        </i>
        <input
          className="input-field"
          type="password"
          placeholder="Re-type your new password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <span id="message">{message}</span>
      <button className="btn-2" type="submit">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
