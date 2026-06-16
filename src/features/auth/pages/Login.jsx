import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { loginSchema } from "../validations/auth.login";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });

      setErrors({});

      const user = await handleLogin({
        email,
        password,
      });

      if (user) {
        setEmail("");
        setPassword("");
        alert("User logged in successfully");
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
          <h1 className="register-title">Sign In</h1>
          {/* <p className="register-text">Create your account</p> */}
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-con">
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
          </div>

          <button className="register-button" type="submit">
            Login
          </button>
        </form>

        <p className="register-login-link">
          Does not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
