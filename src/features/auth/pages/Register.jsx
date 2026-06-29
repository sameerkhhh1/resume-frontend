import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../validations/auth.register";

const inputStyle = {
  width: "100%",
  padding: "18px 18px",
  borderRadius: "12px",
  border: "1px solid #374151",
  backgroundColor: "#1f2937",
  color: "#ffffff",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

const errorStyle = {
  margin: "0px",
  padding: "0px",
  color: "#f87171",
  fontSize: "12px",
  marginTop: "4px",
  marginLeft: "4px",
};

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
      if (error.inner) {
        const formErrors = {};
        error.inner.forEach((err) => {
          formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      }

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0D131D",
        }}
      >
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0D131D",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          minHeight: "620px",
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#111827",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ width: "50%", position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200"
            alt="Register"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.72))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "38px",
                marginBottom: "16px",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              AI Resume Scorer & Generator
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#d1d5db",
                backgroundColor: "transparent",
                margin: 0,
              }}
            >
              Create your account and unlock AI-powered resume scoring, tailored
              feedback, and instant generation to land your dream job.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "420px" }}>
            <h2
              style={{
                color: "white",
                marginBottom: "6px",
                textAlign: "center",
                fontSize: "26px",
              }}
            >
              Create Account
            </h2>
            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginBottom: "28px",
                fontSize: "18px",
              }}
            >
              Sign up to get started
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.username
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.username && <p style={errorStyle}>{errors.username}</p>}
              </div>

              <div>
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.email
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.password
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.password && <p style={errorStyle}>{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.confirmPassword
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.confirmPassword && (
                  <p style={errorStyle}>{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "20px",
                  height: "50px",
                }}
              >
                Create Account
              </button>
            </form>

            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginTop: "18px",
                fontSize: "18px",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#8b5cf6",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
