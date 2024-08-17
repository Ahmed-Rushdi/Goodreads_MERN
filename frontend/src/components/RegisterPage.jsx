import React, { useState } from "react";
import "../styles/signup.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const validatePassword = (pwd) => {
    const upperCasePattern = /[A-Z]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (pwd.length < 8) return "Must be at least 8 characters long.";
    if (!upperCasePattern.test(pwd)) return "Including one uppercase letter.";
    if (!specialCharPattern.test(pwd))
      return "Including one special character.";
    return "";
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)
      ? ""
      : "Please enter a valid email address.";
  };

  const handleSignUp = () => {
    // Final validation on submit
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setRepeatPasswordError("");

    // Handle sign-up logic here
    console.log("Sign Up:", { name, email, password, repeatPassword });
  };

  return (
    <div className="cont">
      <div className="img">
        <div className="img__text m--in">
          <h2 className="h2-4">An old friend?</h2>
          <p>If you already have an account, just sign in!</p>
        </div>
        <div className="img__btn">
          <span className="span-4 m--in">Sign In</span>
        </div>
      </div>
      <form className="form sign-up" onSubmit={(e) => e.preventDefault()}>
        <h2 className="h2-4">Time to be a part of the family,</h2>

        <label className="label-4">
          <span className="span-4">Name</span>
          <input
            className="input-4"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="label-4">
          <span>Email</span>
          <input
            className="input-4"
            type="email"
            value={email}
            onChange={(e) => {
              const newEmail = e.target.value;
              setEmail(newEmail);
              setEmailError(validateEmail(newEmail));
            }}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </label>
        <label className="password-field">
          <span className="span-4">Password</span>
          <input
            className="input-4"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setPassword(newPassword);
              setPasswordError(validatePassword(newPassword));
            }}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </label>
        <label className="password-field">
          <span>Repeat Password</span>
          <input
            className="input-4"
            type={showRepeatPassword ? "text" : "password"}
            value={repeatPassword}
            onChange={(e) => {
              const newRepeatPassword = e.target.value;
              setRepeatPassword(newRepeatPassword);
              setRepeatPasswordError(
                newRepeatPassword !== password ? "Passwords do not match." : ""
              );
            }}
          />
          <span
            className="eye-icon"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          >
            {showRepeatPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
          {repeatPasswordError && (
            <p className="error-message">{repeatPasswordError}</p>
          )}
        </label>
        <div className="bottom-buttons">
          <button type="button" className="submit-4" onClick={handleSignUp}>
            Sign Up
          </button>
          <button
            type="button"
            className="fb-btn-4"
            onClick={() => console.log("Join with Gmail")}
          >
            Join with <span>Gmail</span>
          </button>
          <button className="sign-up1">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
