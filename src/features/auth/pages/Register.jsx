import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../validations/auth.register";
import "./register.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerSchema.validate(
        { username, email, password, confirmPassword },
        { abortEarly: false },
      );

      setErrors({});

      const user = await handleRegister({
        username,
        email,
        password,
        confirmPassword,
      });

      if (user) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        alert("User registered successfully");

        navigate("/");
      }
    } catch (error) {
      // Yup validation errors
      if (error.inner) {
        const formErrors = {};
        error.inner.forEach((err) => {
          formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      }

      // API errors
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  if (loading) return <h1 style={{ color: "white" }}>Loading...</h1>;

  return (
    <div className="register-container">
      <div className="register-child">
        <div className="register-upper">
          <h3 className="register-subtitle">AI Resume Scorer & Generator</h3>
          <h1 className="register-title">Sign Up</h1>
          <p className="register-text">Create your account</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-con">
            <input
              className={`register-input ${errors.username ? "error-input" : ""}`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="error-text">{errors.username}</p>

            <input
              className={`register-input ${errors.email ? "error-input" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="error-text">{errors.email}</p>

            <input
              type="password"
              className={`register-input ${errors.password ? "error-input" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="error-text">{errors.password}</p>

            <input
              type="password"
              className={`register-input ${errors.confirmPassword ? "error-input" : ""}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="error-text">{errors.confirmPassword}</p>
          </div>

          <button className="register-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
