import React, { useState } from "react";
import "../styles/forgotpassword.css";
import icon from "../assets/icons8-forgot-password-96.png";
import postData from "../utils/DataPosting";
import { useNavigate } from "react-router-dom";

const SecretQuestion = () => {
  const [formData, setFormData] = useState({
    email: "",
    secretAnswer: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVerifySecretAnswer = async () => {
    const { resData, error } = await postData("/api/verify-secret-answer", {
      email: formData.email,
      secretAnswer: formData.secretAnswer,
    });

    if (error) {
      console.error("Verification failed:", error.message);
      setMessage("Verification failed. Please try again.");
      return;
    }

    if (resData) {
      setMessage("Answer correct, proceed to reset password");
      navigate("/forgot-password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifySecretAnswer();
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
          Verify Secret Answer
          <span className="fa-passwd-reset fa-stack"></span>
        </h2>
      </center>

      <div className="input-container">
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
        <input
          className="input-field"
          type="text"
          placeholder="Enter your secret answer"
          name="secretAnswer"
          value={formData.secretAnswer}
          onChange={handleChange}
          required
        />
      </div>

      <span id="message">{message}</span>
      <button className="btn-2" type="submit">
        Verify Answer
      </button>
    </form>
  );
};

export default SecretQuestion;
