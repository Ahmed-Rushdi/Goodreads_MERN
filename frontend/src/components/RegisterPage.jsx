import React, { useState } from "react";
import "../styles/signup.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import postData from "../utils/DataPosting";

// Validation functions
const validatePassword = (pwd) => {
  const upperCasePattern = /[A-Z]/;
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  if (pwd.length < 8) return "Password must be at least 8 characters long.";
  if (!upperCasePattern.test(pwd))
    return "Password must include at least one uppercase letter.";
  if (!specialCharPattern.test(pwd))
    return "Password must include at least one special character.";
  return "";
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email) ? "" : "Please enter a valid email address.";
};

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    secretQuestion: "",
    secretAnswer: "",
  });
  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    secretAnswerError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const validateSecretAnswer = (answer) => {
    return answer.length < 1 ? "Secret answer cannot be empty." : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailError: validateEmail(value),
      }));
    }

    if (name === "password") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: validatePassword(value),
      }));
    }

    if (name === "repeatPassword") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        repeatPasswordError:
          value !== formData.password ? "Passwords do not match." : "",
      }));
    }
    if (name === "secretAnswer") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        secretAnswerError: validateSecretAnswer(value),
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      formErrors.emailError ||
      formErrors.passwordError ||
      formErrors.repeatPasswordError ||
      formErrors.secretAnswerError
    ) {
      console.error("Fix validation errors before submitting.");
      return;
    }

    const { resData, loading, error } = await postData("/api/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      secretQuestion: formData.secretQuestion,
      secretAnswer: formData.secretAnswer,
    });

    if (error) {
      console.error("Sign up failed:", error.message);
      return;
    }

    if (resData) {
      console.log("User registered successfully:", resData);
      navigate("/");
    }
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
      <form className="form sign-up" onSubmit={handleSignUp}>
        <h2 className="h2-4">Time to be a part of the family,</h2>

        <label className="label-4">
          <span className="span-4">Name</span>
          <input
            className="input-4"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-4">
          <span>Email</span>
          <input
            className="input-4"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.emailError && (
            <p className="error-message">{formErrors.emailError}</p>
          )}
        </label>

        <label className="password-field">
          <span className="span-4">Password</span>
          <input
            className="input-4"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
          {formErrors.passwordError && (
            <p className="error-message">{formErrors.passwordError}</p>
          )}
        </label>

        <label className="password-field">
          <span>Repeat Password</span>
          <input
            className="input-4"
            type={showRepeatPassword ? "text" : "password"}
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          >
            {showRepeatPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
          {formErrors.repeatPasswordError && (
            <p className="error-message">{formErrors.repeatPasswordError}</p>
          )}
        </label>
        <label className="label-4">
          <span>Secret Question</span>
          <input
            className="input-4"
            type="text"
            name="secretQuestion"
            value={formData.secretQuestion}
            onChange={handleChange}
            required
          />
        </label>

        <label className="password-field">
          <span>Secret Answer</span>
          <input
            className="input-4"
            type="text"
            name="secretAnswer"
            value={formData.secretAnswer}
            onChange={handleChange}
            required
          />
          {formErrors.secretAnswerError && (
            <p className="error-message">{formErrors.secretAnswerError}</p>
          )}
        </label>
        <div className="bottom-buttons">
          <button type="submit" className="submit-4">
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
